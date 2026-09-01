'use client';

import Link from 'next/link';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Heart, ArrowRight, Phone } from 'lucide-react';
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
      id="gender-reveal"
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
            Gender Reveal{' '}
            <span className="bg-gradient-to-r from-sunshine-yellow to-sunshine-blue bg-clip-text text-transparent">
              Blood Testing
            </span>
          </motion.h2>

          <motion.p variants={itemVariants} className="text-gray-600 leading-relaxed mb-4">
            Want to learn your baby&apos;s gender earlier in pregnancy? Sunshine Clinical Labs
            offers the <strong>Peekaboo Early Gender Reveal Blood Test</strong> — a simple,
            non-invasive blood-based gender reveal test for expecting parents right here in
            Trinity, FL. Contact our team to learn when testing can be performed and how to
            schedule your visit.
          </motion.p>

          <motion.p variants={itemVariants} className="text-gray-600 leading-relaxed mb-8">
            It&apos;s one of the most exciting moments for expecting families, and we love being
            part of it. Many of our patients use their results to plan gender reveal parties,
            nursery themes, and those unforgettable family announcements.
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-3">
            <a href="tel:+17272335223" aria-label="Contact us about gender reveal blood testing" className="w-full sm:w-auto">
              <ShimmerButton className="w-full sm:w-auto bg-sunshine-blue text-white px-8 py-4 rounded-full font-bold shadow-xl gap-2">
                <Phone className="w-5 h-5" aria-hidden="true" />
                Call (727) 233-5223
              </ShimmerButton>
            </a>
            <Link href="/gender-reveal-testing-florida" aria-label="Learn about gender reveal testing" className="w-full sm:w-auto">
              <ShimmerButton className="w-full sm:w-auto border border-sunshine-blue/30 text-sunshine-blue bg-white px-6 py-4 rounded-full font-semibold gap-2">
                Learn About Gender Reveal Testing
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </ShimmerButton>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
