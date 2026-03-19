'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ShimmerButton } from '@/registry/magicui/shimmer-button';

// ─── Slide Data ───────────────────────────────────────────────────────────────

const SLIDES = [
  { id: 0, image: '/hm1.jpg', alt: 'Sunshine Clinical Laboratory' },
  { id: 1, image: '/hm2.png', alt: 'Advanced Laboratory Testing' },
  { id: 2, image: '/hm3.jpg', alt: 'Reliable Diagnostic Services' },
];

const WIPE_DURATION_MS = 1500;
const HOLD_DURATION_MS = 4000;

// ─── Easing ───────────────────────────────────────────────────────────────────

function easeInOutCubic(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function HeroSlider() {
  // React state — drives which images are rendered
  const [currentSlide, setCurrentSlide] = useState(0);
  const [nextSlide, setNextSlide] = useState(null);

  // Sync-readable ref mirrors (used inside rAF callbacks to avoid stale closures)
  const currentSlideRef = useRef(0);
  const nextSlideRef = useRef(null);
  // Animation state refs
  const rafRef = useRef(null);
  const wipeStartRef = useRef(null);
  const wipePausedAtRef = useRef(0);
  const holdTimerRef = useRef(null);

  // DOM refs for imperative style writes (avoids 60fps React re-renders)
  const topImageClipRef = useRef(null);
  const scanBarRef = useRef(null);

  // Direction: 1 = left-to-right (forward), -1 = right-to-left (backward)
  const wipeDirectionRef = useRef(1);

  // Stored animation functions (refs prevent stale closures in rAF chain)
  const animateWipeRef = useRef(null);
  const scheduleHoldRef = useRef(null);
  const startWipeRef = useRef(null);

  // Keep ref mirrors in sync with React state
  useEffect(() => { currentSlideRef.current = currentSlide; }, [currentSlide]);
  useEffect(() => { nextSlideRef.current = nextSlide; }, [nextSlide]);

  // Bootstrap animation loop once on mount
  useEffect(() => {
    animateWipeRef.current = function animateWipe(timestamp) {
      // Safety: wait for React to mount the top-layer DOM nodes
      if (!topImageClipRef.current || !scanBarRef.current) {
        rafRef.current = requestAnimationFrame(animateWipeRef.current);
        return;
      }

      // On first tick (or after resume), anchor the start time
      if (wipeStartRef.current === null) {
        wipeStartRef.current = timestamp - wipePausedAtRef.current * WIPE_DURATION_MS;
      }

      const progress = Math.min((timestamp - wipeStartRef.current) / WIPE_DURATION_MS, 1);
      wipePausedAtRef.current = progress; // snapshot for pause/resume

      const eased = easeInOutCubic(progress);
      const revealed = eased * 100; // 0 → 100 (percentage revealed)

      // Imperatively update the clip-path and scanning bar (direction-aware)
      const forward = wipeDirectionRef.current >= 0;
      topImageClipRef.current.style.clipPath = forward
        ? `inset(0 ${(100 - revealed).toFixed(4)}% 0 0)`
        : `inset(0 0 0 ${(100 - revealed).toFixed(4)}%)`;
      scanBarRef.current.style.left = forward ? `${revealed}%` : `${(100 - revealed).toFixed(4)}%`;
      scanBarRef.current.style.opacity = progress < 1 ? '1' : '0';

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animateWipeRef.current);
      } else {
        // Wipe complete — settle and start hold phase
        const settled = nextSlideRef.current;
        currentSlideRef.current = settled;
        setCurrentSlide(settled);
        nextSlideRef.current = null;
        setNextSlide(null);
        scheduleHoldRef.current();
      }
    };

    scheduleHoldRef.current = function scheduleHold() {
      holdTimerRef.current = setTimeout(() => {
        const next = (currentSlideRef.current + 1) % SLIDES.length;
        startWipeRef.current(next);
      }, HOLD_DURATION_MS);
    };

    startWipeRef.current = function startWipe(targetIndex) {
      wipeDirectionRef.current = 1; // auto-advance is always forward
      cancelAnimationFrame(rafRef.current);
      clearTimeout(holdTimerRef.current);
      wipePausedAtRef.current = 0;
      wipeStartRef.current = null;
      nextSlideRef.current = targetIndex;
      setNextSlide(targetIndex);
      rafRef.current = requestAnimationFrame(animateWipeRef.current);
    };

    // Kick off the first hold
    scheduleHoldRef.current();

    return () => {
      cancelAnimationFrame(rafRef.current);
      clearTimeout(holdTimerRef.current);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Manual navigation ───────────────────────────────────────────────────────

  const jumpToSlide = useCallback((targetIndex) => {
    if (targetIndex === currentSlideRef.current && nextSlideRef.current === null) return;
    cancelAnimationFrame(rafRef.current);
    clearTimeout(holdTimerRef.current);
    // Reset top layer clip in case a wipe was in progress (direction-aware)
    if (topImageClipRef.current) {
      topImageClipRef.current.style.clipPath = wipeDirectionRef.current >= 0
        ? 'inset(0 100% 0 0)'
        : 'inset(0 0 0 100%)';
    }
    wipePausedAtRef.current = 0;
    wipeStartRef.current = null;
    nextSlideRef.current = targetIndex;
    setNextSlide(targetIndex);
    rafRef.current = requestAnimationFrame(animateWipeRef.current);
  }, []);

  const goToNext = useCallback(() => {
    wipeDirectionRef.current = 1;
    jumpToSlide((currentSlideRef.current + 1) % SLIDES.length);
  }, [jumpToSlide]);

  const goToPrev = useCallback(() => {
    wipeDirectionRef.current = -1;
    jumpToSlide((currentSlideRef.current - 1 + SLIDES.length) % SLIDES.length);
  }, [jumpToSlide]);

  const goToSlide = useCallback((index) => {
    wipeDirectionRef.current = index >= currentSlideRef.current ? 1 : -1;
    jumpToSlide(index);
  }, [jumpToSlide]);

  // ── Render ──────────────────────────────────────────────────────────────────

  return (
    <section
      className="relative w-full h-[95vh] overflow-hidden"
    >
      {/* ── Image Stack ───────────────────────────────────────────────────────── */}
      <div className="absolute inset-0">

        {/* BOTTOM — settled image with parallax zoom */}
        <div className="absolute inset-0">
          <motion.div
            key={`parallax-${currentSlide}`}
            initial={{ scale: 1 }}
            animate={{ scale: 1.05 }}
            transition={{ duration: 5, ease: 'linear' }}
            className="absolute inset-0"
            style={{ willChange: 'transform', backfaceVisibility: 'hidden' }}
          >
            <Image
              src={SLIDES[currentSlide].image}
              alt={SLIDES[currentSlide].alt}
              fill
              priority={currentSlide === 0}
              quality={100}
              className="object-cover"
              sizes="100vw"
              style={{ imageRendering: 'auto', transform: 'translateZ(0)' }}
            />
          </motion.div>
        </div>

        {/* TOP — incoming image, revealed left-to-right via clip-path */}
        {nextSlide !== null && (
          <div
            ref={topImageClipRef}
            className="absolute inset-0"
            style={{ clipPath: 'inset(0 100% 0 0)', willChange: 'clip-path' }}
          >
            <Image
              src={SLIDES[nextSlide].image}
              alt={SLIDES[nextSlide].alt}
              fill
              quality={100}
              className="object-cover"
              sizes="100vw"
              style={{ imageRendering: 'auto', transform: 'translateZ(0)' }}
            />
          </div>
        )}

        {/* SCANNING BAR — thin glowing white line at the clip frontier */}
        {nextSlide !== null && (
          <div
            ref={scanBarRef}
            className="absolute inset-y-0 z-10 pointer-events-none"
            style={{
              width: '3px',
              left: '0%',
              transform: 'translateX(-3px)',
              opacity: 1,
              background: 'rgba(255, 255, 255, 0.90)',
              boxShadow:
                '0 0 8px 3px rgba(255,255,255,0.7), 0 0 20px 6px rgba(255,255,255,0.35), 0 0 40px 10px rgba(255,255,255,0.10)',
              willChange: 'left, opacity',
            }}
          />
        )}

      </div>

      {/* ── Dark Overlay ──────────────────────────────────────────────────────── */}
      <div className="absolute inset-0 z-10 bg-black/40 pointer-events-none" />

      {/* ── Hero Text Content ─────────────────────────────────────────────────── */}
      <div className="absolute inset-0 z-20 flex items-center justify-center px-4 pointer-events-none">
        <div className="text-center max-w-3xl pointer-events-auto">

          {/* Heading — fade + slide up */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight drop-shadow-lg"
          >
            Empowering Wellness Through Advanced Testing Solutions
          </motion.h1>

          {/* Subtext — delay 0.2s */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.2 }}
            className="mt-5 text-base md:text-lg text-white/90 leading-relaxed drop-shadow"
          >
            Incorporating cutting-edge technology, we deliver precise diagnoses and personalized
            treatment plans, ensuring unparalleled accuracy and tailored care for each patient&apos;s
            unique health needs.
          </motion.p>

          {/* CTA Button — delay 0.4s + scale effect */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.4 }}
            className="mt-8"
          >
            <Link href="/about">
              <ShimmerButton className="bg-gradient-to-r from-[#6BB6E8] to-[#2B7DBF] text-white text-base px-8 py-3 rounded-full font-semibold shadow-md">
                <span>Find Out More →</span>
              </ShimmerButton>
            </Link>
          </motion.div>

        </div>
      </div>

      {/* ── Navigation Arrows (bottom-right diamond) ──────────────────────────── */}
      <div className="absolute bottom-16 right-8 z-30 w-36 h-36 flex items-center justify-center">
        {/* Diamond border */}
        <div className="absolute w-[96px] h-[96px] border border-sunshine-yellow/70 rotate-45" />

        {/* Arrows */}
        <div className="relative flex items-center gap-2">
          {/* Prev */}
          <motion.button
            onClick={goToPrev}
            aria-label="Previous slide"
            whileHover={{ x: -3, opacity: 1 }}
            initial={{ opacity: 0.7 }}
            animate={{ opacity: 0.7 }}
            transition={{ duration: 0.3 }}
            className="focus-visible:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#FFC72C"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-7 h-7"
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </motion.button>

          {/* Divider */}
          <span
            className="text-sunshine-yellow/60 select-none text-base leading-none"
            style={{ fontWeight: 100 }}
          >
            /
          </span>

          {/* Next */}
          <motion.button
            onClick={goToNext}
            aria-label="Next slide"
            whileHover={{ x: 3, opacity: 1 }}
            initial={{ opacity: 0.7 }}
            animate={{ opacity: 0.7 }}
            transition={{ duration: 0.3 }}
            className="focus-visible:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#FFC72C"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-7 h-7"
            >
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </motion.button>
        </div>
      </div>

      {/* ── Pagination Dots ────────────────────────────────────────────────────── */}
      <div className="absolute bottom-24 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2">
        {SLIDES.map((s, index) => (
          <button
            key={s.id}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
            className={`transition-all duration-300 rounded-full ${
              index === currentSlide
                ? 'w-8 h-3 bg-sunshine-yellow'
                : 'w-3 h-3 bg-white/60 hover:bg-white/90'
            }`}
          />
        ))}
      </div>

    </section>
  );
}
