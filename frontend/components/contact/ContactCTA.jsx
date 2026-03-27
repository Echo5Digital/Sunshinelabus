'use client';

import Link from 'next/link';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Phone, CalendarDays, ArrowRight } from 'lucide-react';
import { ShimmerButton } from '@/registry/magicui/shimmer-button';

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

export default function ContactCTA() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      className="py-20 bg-sunshine-dark relative overflow-hidden"
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
          {/* Badge */}
          <motion.span
            variants={itemVariants}
            className="inline-flex items-center gap-2 bg-white/15 border border-white/25 text-white px-4 py-1.5 rounded-full text-sm font-semibold mb-6"
          >
            Ready to Get Started?
          </motion.span>

          <motion.h2
            variants={itemVariants}
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-5"
          >
            Your Health Questions
            <br />
            <span className="text-sunshine-sky">Deserve Clear Answers.</span>
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="text-white/75 text-lg leading-relaxed mb-10 max-w-2xl mx-auto"
          >
            Call us, send a message, or walk in — our team is ready to help you get
            the testing you need quickly and with care.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row justify-center items-center gap-4"
          >
            <a href="tel:7272335223">
              <ShimmerButton className="bg-white text-sunshine-dark px-8 py-4 rounded-full font-bold shadow-2xl text-base gap-2">
                <Phone className="w-5 h-5" aria-hidden="true" />
                Call Now: (727) 233-5223
              </ShimmerButton>
            </a>

            <Link href="/book-appointment">
              <ShimmerButton className="bg-sunshine-blue border border-sunshine-sky/50 text-white px-8 py-4 rounded-full font-semibold text-base gap-2">
                <CalendarDays className="w-5 h-5" aria-hidden="true" />
                Book Appointment
              </ShimmerButton>
            </Link>

            <Link href="/services">
              <ShimmerButton className="bg-white/10 backdrop-blur-sm border border-white/30 text-white px-8 py-4 rounded-full font-semibold text-base gap-2">
                Browse Services
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </ShimmerButton>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
