'use client';

import Link from 'next/link';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Phone, CalendarDays, MapPin, ArrowRight } from 'lucide-react';
import { ShimmerButton } from '@/registry/magicui/shimmer-button';

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

export default function FinalCTABanner() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      className="py-20 bg-gradient-to-r from-sunshine-blue to-sunshine-sky relative overflow-hidden"
      aria-labelledby="final-cta-heading"
      ref={ref}
    >
      {/* Decorative circles */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full border border-white/10" />
        <div className="absolute -bottom-16 -left-16 w-72 h-72 rounded-full border border-white/10" />
        <div className="absolute top-1/2 left-1/4 w-40 h-40 rounded-full bg-white/[0.04]" />
        <div className="absolute top-1/4 right-1/3 w-24 h-24 rounded-full bg-white/[0.06]" />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {/* Eyebrow */}
          <motion.span
            variants={itemVariants}
            className="inline-flex items-center gap-2 bg-white/20 border border-white/30 text-white px-4 py-1.5 rounded-full text-sm font-semibold mb-6"
          >
            Your Local Lab in Trinity, FL
          </motion.span>

          <motion.h2
            variants={itemVariants}
            id="final-cta-heading"
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-5"
          >
            Need Lab Work?{' '}
            <span className="text-[#93C5FD]">Let&apos;s Make It Simple.</span>
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="text-white/80 text-lg leading-relaxed mb-4 max-w-2xl mx-auto"
          >
            Visit Sunshine Clinical Labs in Trinity for available walk-in testing, schedule an
            appointment, or arrange a mobile blood draw and we&apos;ll come to you.
          </motion.p>

          <motion.p
            variants={itemVariants}
            className="text-white/90 font-semibold mb-10"
          >
            Monday–Friday • 8:00 AM–2:00 PM
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-4 mb-12"
          >
            <Link href="/book-appointment" aria-label="Book an appointment online" className="w-full sm:w-auto">
              <ShimmerButton className="w-full sm:w-auto bg-white text-sunshine-dark px-7 py-3.5 rounded-full font-bold shadow-2xl text-base gap-2 whitespace-nowrap">
                <CalendarDays className="w-5 h-5 flex-shrink-0" aria-hidden="true" />
                Book an Appointment
              </ShimmerButton>
            </Link>

            <Link href="/mobile-blood-draw-new-port-richey" aria-label="Schedule a mobile blood draw" className="w-full sm:w-auto">
              <ShimmerButton className="w-full sm:w-auto bg-white/20 backdrop-blur-sm border-2 border-white text-white px-7 py-3.5 rounded-full font-semibold text-base gap-2 whitespace-nowrap">
                Schedule a Mobile Blood Draw
                <ArrowRight className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
              </ShimmerButton>
            </Link>

            <a href="tel:+17272335223" aria-label="Call Sunshine Clinical Lab at (727) 233-5223" className="w-full sm:w-auto">
              <ShimmerButton className="w-full sm:w-auto bg-white/15 backdrop-blur-sm border border-white/40 text-white px-7 py-3.5 rounded-full font-semibold text-base gap-2 whitespace-nowrap">
                <Phone className="w-5 h-5 flex-shrink-0" aria-hidden="true" />
                Call (727) 233-5223
              </ShimmerButton>
            </a>
          </motion.div>

          {/* Business info block */}
          <motion.div
            variants={itemVariants}
            className="text-white/80 text-sm leading-relaxed"
          >
            <p className="text-white font-bold text-base mb-1">Sunshine Clinical Labs LLC</p>
            <a
              href="https://maps.google.com/?q=3600+Galileo+Dr+Suite+104+Trinity+FL+34655"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 hover:text-white transition-colors"
              aria-label="Get directions to 3600 Galileo Dr Trinity FL"
            >
              <MapPin className="w-4 h-4 text-white flex-shrink-0" aria-hidden="true" />
              3600 Galileo Dr, Suite 104, Trinity, FL 34655
            </a>
            <p className="mt-1">
              <a href="tel:+17272335223" className="hover:text-white transition-colors">
                (727) 233-5223
              </a>
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
