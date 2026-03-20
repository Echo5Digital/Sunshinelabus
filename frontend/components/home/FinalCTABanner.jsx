'use client';

import Link from 'next/link';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Phone, CalendarDays, MapPin, Clock, ArrowRight } from 'lucide-react';
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
            New Port Richey&apos;s Local Lab
          </motion.span>

          <motion.h2
            variants={itemVariants}
            id="final-cta-heading"
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-5"
          >
            Fast Results. Personal Care.
            <br />
            <span className="text-[#93C5FD]">No Long Waits.</span>
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="text-white/80 text-lg leading-relaxed mb-10 max-w-2xl mx-auto"
          >
            Walk in today or call to schedule. Your neighborhood clinical lab is ready to serve you
            — with the speed and care you deserve.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row justify-center gap-4 mb-12"
          >
            <a href="tel:7272335223" aria-label="Call Sunshine Clinical Lab at (727) 233-5223">
              <ShimmerButton className="bg-white text-sunshine-dark px-9 py-4 rounded-full font-bold shadow-2xl text-lg gap-2">
                <Phone className="w-6 h-6" aria-hidden="true" />
                Call Now: (727) 233-5223
              </ShimmerButton>
            </a>

            <Link href="/book-appointment" aria-label="Book an appointment online">
              <ShimmerButton className="bg-white/20 backdrop-blur-sm border-2 border-white text-white px-9 py-4 rounded-full font-semibold text-lg gap-2">
                <CalendarDays className="w-5 h-5" aria-hidden="true" />
                Book Appointment
              </ShimmerButton>
            </Link>

            <Link href="/mobile-blood-draw-new-port-richey" aria-label="Request a mobile blood draw">
              <ShimmerButton className="bg-white/15 backdrop-blur-sm border border-white/40 text-white px-9 py-4 rounded-full font-semibold text-lg gap-2">
                Request Mobile Draw
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </ShimmerButton>
            </Link>
          </motion.div>

          {/* Address & hours info bar */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-white/75 text-sm"
            aria-label="Location and hours information"
          >
            <a
              href="https://maps.google.com/?q=3600+Galileo+Dr+Suite+104+New+Port+Richey+FL+34655"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-white transition-colors"
              aria-label="Get directions to 3600 Galileo Dr Suite 104 New Port Richey FL"
            >
              <MapPin className="w-5 h-5 text-white flex-shrink-0" aria-hidden="true" />
              3600 Galileo Dr, Suite 104, New Port Richey, FL 34655
            </a>

            <span className="hidden sm:block text-white/30" aria-hidden="true">|</span>

            <span className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-white flex-shrink-0" aria-hidden="true" />
              Mon–Fri 8:00am–5:00pm · Walk-Ins Welcome
            </span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
