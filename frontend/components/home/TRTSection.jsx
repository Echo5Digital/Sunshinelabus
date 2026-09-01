'use client';

import Link from 'next/link';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FlaskConical, ArrowRight, CheckCircle, Phone } from 'lucide-react';
import { ShimmerButton } from '@/registry/magicui/shimmer-button';

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' } },
};

const panelTests = [
  'Total Testosterone',
  'Free Testosterone',
  'Estradiol',
  'Hematocrit',
  'SHBG',
  'LH / FSH',
  'PSA',
  'CBC',
  'CMP',
];

export default function TRTSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      className="py-20 bg-gradient-to-br from-sunshine-dark via-[#1a3a5c] to-sunshine-blue relative overflow-hidden"
      aria-labelledby="trt-heading"
      ref={ref}
    >
      {/* Decorative background circles */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full border border-white/5" />
        <div className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full border border-white/5" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-white/[0.03]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Left: copy + CTA */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
          >
            <motion.span
              variants={itemVariants}
              className="inline-flex items-center gap-2 bg-white/20 border border-white/30 text-white px-4 py-1.5 rounded-full text-sm font-semibold mb-6"
            >
              Specialty Testing
            </motion.span>

            <motion.h2
              variants={itemVariants}
              id="trt-heading"
              className="text-3xl sm:text-4xl font-extrabold text-white leading-tight mb-5"
            >
              TRT &amp; Hormone{' '}
              <span className="text-[#93C5FD]">Blood Testing</span>
            </motion.h2>

            <motion.p variants={itemVariants} className="text-white/75 leading-relaxed mb-6">
              Routine monitoring is an important part of testosterone replacement therapy. Sunshine
              Clinical Labs offers blood testing for commonly requested TRT markers, including:
            </motion.p>

            <motion.p variants={itemVariants} className="text-white font-semibold leading-relaxed mb-6">
              Total Testosterone • Free Testosterone • Estradiol • Hematocrit • SHBG • LH/FSH • PSA
              • CBC • CMP
            </motion.p>

            <motion.ul variants={itemVariants} className="space-y-2.5 mb-8">
              {[
                'Physician-ordered and self-pay options available',
                'Walk-ins welcome — mobile draws available',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-white/80 text-sm">
                  <CheckCircle className="w-5 h-5 text-white flex-shrink-0 mt-0.5" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </motion.ul>

            <motion.p variants={itemVariants} className="text-white/75 leading-relaxed mb-8">
              Visit our Trinity location or contact us about available mobile blood draw options.
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-3">
              <Link href="/trt-blood-test-pasco-county" aria-label="Explore TRT blood testing" className="w-full sm:w-auto">
                <ShimmerButton className="w-full sm:w-auto bg-white text-sunshine-dark px-8 py-4 rounded-full font-bold shadow-xl gap-2">
                  Explore TRT Blood Testing
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </ShimmerButton>
              </Link>
              <a href="tel:+17272335223" aria-label="Call to ask about TRT testing" className="w-full sm:w-auto">
                <ShimmerButton className="w-full sm:w-auto border border-white/30 text-white px-6 py-4 rounded-full font-semibold gap-2">
                  <Phone className="w-4 h-4" aria-hidden="true" />
                  (727) 233-5223
                </ShimmerButton>
              </a>
            </motion.div>
          </motion.div>

          {/* Right: panel test cards */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
          >
            {panelTests.map((test) => (
              <motion.div
                key={test}
                variants={itemVariants}
                className="bg-white/10 backdrop-blur-sm border border-white/15 rounded-2xl p-5 flex items-center gap-3"
              >
                <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                  <FlaskConical className="w-4 h-4 text-white" aria-hidden="true" />
                </div>
                <span className="text-white text-sm font-medium leading-snug">{test}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
