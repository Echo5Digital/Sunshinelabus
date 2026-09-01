'use client';

import { useRef, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { ShimmerButton } from '@/registry/magicui/shimmer-button';

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

export default function HomeHero() {
  const videoRef = useRef(null);
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = true;
      videoRef.current.volume = 0;
    }
  }, []);

  return (
    <section
      className="relative w-full min-h-screen flex items-center overflow-hidden"
      aria-label="Hero section"
    >
      {/* Background video with dark gradient overlay */}
      <div className="absolute inset-0">
        <video
          ref={videoRef}
          src="/hm1.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover object-center"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-sunshine-dark/85 via-sunshine-dark/65 to-sunshine-dark/30" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 pt-36">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-2xl"
        >
          {/* Eyebrow text */}
          <motion.div variants={itemVariants}>
            <p className="text-white/80 text-sm font-semibold tracking-wide mb-4">
              TRINITY, FLORIDA
            </p>
          </motion.div>

          {/* H1 — Main visible headline */}
          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-4"
          >
            Walk-In Lab Testing & <span className="text-[#93C5FD]">Mobile Blood Draws</span> in Trinity, FL
          </motion.h1>

          {/* H2 — Subheadline */}
          <motion.h2
            variants={itemVariants}
            className="text-2xl sm:text-3xl font-bold text-white/90 mb-4"
          >
            Lab Testing Made More Convenient
          </motion.h2>

          <motion.p variants={itemVariants} className="text-white/85 text-lg leading-relaxed mb-4 max-w-xl">
            Visit Sunshine Clinical Labs for walk-in lab testing in Trinity, or schedule a mobile
            blood draw and have a phlebotomist come to your home, office, or care facility.
          </motion.p>

          <motion.p variants={itemVariants} className="text-white/85 text-lg leading-relaxed mb-10 max-w-xl">
            From routine blood work and TRT monitoring to DNA testing and gender reveal testing, we
            make it easier to get the testing you need with personal, local service.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row flex-wrap gap-4"
          >
            <Link href="/book-appointment" aria-label="Book an appointment" className="w-full sm:w-auto">
              <ShimmerButton className="w-full sm:w-auto bg-white text-sunshine-dark px-7 py-3.5 rounded-full font-bold shadow-xl text-base gap-2">
                Book an Appointment
              </ShimmerButton>
            </Link>

            <Link href="/mobile-blood-draw-pasco-county" aria-label="Schedule a mobile blood draw" className="w-full sm:w-auto">
              <ShimmerButton className="w-full sm:w-auto bg-sunshine-blue text-white px-7 py-3.5 rounded-full font-semibold shadow-lg text-base border border-white/20 gap-2">
                Schedule a Mobile Blood Draw
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </ShimmerButton>
            </Link>
          </motion.div>

          {/* Walk-in hours */}
          <motion.p variants={itemVariants} className="text-white/70 text-sm font-medium mt-6">
            Walk-Ins Welcome • Monday–Friday, 8:00 AM–2:00 PM
          </motion.p>
        </motion.div>
      </div>

      {/* Wave SVG divider — matches sunshine-light body bg */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none" aria-hidden="true">
        <svg
          viewBox="0 0 1440 72"
          preserveAspectRatio="none"
          className="w-full h-16 sm:h-20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0,36 C240,72 480,0 720,36 C960,72 1200,0 1440,36 L1440,72 L0,72 Z"
            fill="#EBF5FB"
          />
        </svg>
      </div>
    </section>
  );
}
