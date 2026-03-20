'use client';

import Link from 'next/link';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Heart, CheckCircle, ArrowRight, Phone } from 'lucide-react';
import { ShimmerButton } from '@/registry/magicui/shimmer-button';

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

export default function GenderRevealSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      className="py-20 relative overflow-hidden"
      aria-labelledby="gender-reveal-heading"
      ref={ref}
    >
      {/* Brand gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-sunshine-light via-white to-sunshine-soft" aria-hidden="true" />

      {/* Decorative blur circles */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute -top-20 -left-20 w-80 h-80 rounded-full bg-sunshine-yellow/20 blur-3xl" />
        <div className="absolute -bottom-20 -right-20 w-80 h-80 rounded-full bg-sunshine-sky/25 blur-3xl" />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          <motion.span
            variants={itemVariants}
            className="inline-flex items-center gap-2 bg-sunshine-soft border border-sunshine-sky text-sunshine-blue px-4 py-1.5 rounded-full text-sm font-semibold mb-6"
          >
            <Heart className="w-4 h-4" aria-hidden="true" />
            Gender Reveal Blood Testing
          </motion.span>

          <motion.h2
            variants={itemVariants}
            id="gender-reveal-heading"
            className="text-3xl sm:text-4xl font-extrabold text-sunshine-dark leading-tight mb-5"
          >
            Gender Reveal Blood Test —{' '}
            <span className="bg-gradient-to-r from-sunshine-yellow to-sunshine-blue bg-clip-text text-transparent">
              Find Out as Early as 7 Weeks
            </span>
          </motion.h2>

          <motion.p variants={itemVariants} className="text-gray-600 leading-relaxed mb-4">
            Sunshine Clinical Lab is proud to offer the{' '}
            <strong>Peekaboo Early Gender Reveal Blood Test</strong> right here in Trinity, FL.
            This simple, non-invasive blood draw can reveal whether you&apos;re expecting a boy or
            a girl as early as 7 weeks into pregnancy — long before a traditional ultrasound.
          </motion.p>

          <motion.p variants={itemVariants} className="text-gray-600 leading-relaxed mb-8">
            It&apos;s one of the most exciting moments for expecting families, and we love being
            part of it. Many of our patients use their results to plan gender reveal parties,
            nursery themes, and those unforgettable family announcements. Schedule your Peekaboo
            test today and find out if it&apos;s pink or blue — faster than you ever thought
            possible.
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-3">
            <a href="tel:7272335223" aria-label="Schedule your gender reveal blood test">
              <ShimmerButton className="bg-sunshine-blue text-white px-8 py-4 rounded-full font-bold shadow-xl gap-2">
                <Phone className="w-5 h-5" aria-hidden="true" />
                Schedule Your Gender Reveal Blood Test — (727) 233-5223
              </ShimmerButton>
            </a>
            <Link href="/gender-reveal-testing-florida" aria-label="Learn more about gender reveal testing in Florida">
              <ShimmerButton className="border border-sunshine-blue/30 text-sunshine-blue bg-white px-6 py-4 rounded-full font-semibold gap-2">
                Learn More About Gender Reveal Testing
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </ShimmerButton>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
