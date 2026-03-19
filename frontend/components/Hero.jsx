'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Microscope, FlaskConical, Activity, Shield } from 'lucide-react';
import { ShimmerButton } from '@/registry/magicui/shimmer-button';

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const imageVariants = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: 'easeOut', delay: 0.3 } },
};

const labCards = [
  { Icon: Microscope, label: 'Precision Testing' },
  { Icon: FlaskConical, label: 'Lab Analysis' },
  { Icon: Activity, label: 'Health Monitoring' },
  { Icon: Shield, label: 'Certified Quality' },
  { Icon: Microscope, label: 'DNA Testing' },
  { Icon: FlaskConical, label: 'Hematology' },
];

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-sunshine-blue via-sunshine-sky to-sunshine-light" />
      {/* Sun glow overlay */}
      <div className="absolute top-0 right-0 w-[60%] h-full bg-gradient-to-bl from-sunshine-yellow/20 via-transparent to-transparent" />
      {/* Soft grid */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      {/* Content */}
      <div className="relative flex-1 flex items-center pt-16 lg:pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-16 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

            {/* Left: Text */}
            <motion.div variants={containerVariants} initial="hidden" animate="visible">
              {/* Badge */}
              <motion.div variants={itemVariants} className="mb-6">
                <span className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm border border-white/30 text-white px-4 py-1.5 rounded-full text-sm font-medium">
                  <span className="w-2 h-2 bg-sunshine-yellow rounded-full animate-pulse" />
                  Trusted Diagnostic Services Since 2009
                </span>
              </motion.div>

              {/* Headline */}
              <motion.h1
                variants={itemVariants}
                className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6"
              >
                Bringing{' '}
                <span className="text-sunshine-yellow drop-shadow-sm">Sunshine</span>{' '}
                to Your Health with Trusted{' '}
                <span className="text-white/90">Diagnostic Testing</span>
              </motion.h1>

              {/* Subtext */}
              <motion.p
                variants={itemVariants}
                className="text-white/85 text-lg leading-relaxed mb-10 max-w-xl"
              >
                Accurate and reliable laboratory services supporting healthcare providers,
                clinics, and patients — empowering informed medical decisions with confidence.
              </motion.p>

              {/* CTA Buttons */}
              <motion.div variants={itemVariants} className="flex flex-wrap gap-4">
                <Link href="/#appointment">
                  <ShimmerButton className="bg-gradient-to-r from-[#6BB6E8] to-[#2B7DBF] text-white text-base px-7 py-3.5 rounded-full font-semibold shadow-xl">
                    <span>Book Appointment</span>
                    <ArrowRight className="w-4 h-4" />
                  </ShimmerButton>
                </Link>
                <Link href="/#services">
                  <ShimmerButton
                    className="border border-white/40 bg-white/15 backdrop-blur-sm text-white text-base px-7 py-3.5 rounded-full font-semibold"
                    shimmerColor="rgba(255,255,255,0.25)"
                  >
                    <span>Our Services</span>
                  </ShimmerButton>
                </Link>
              </motion.div>

              {/* Trust indicators */}
              <motion.div
                variants={itemVariants}
                className="flex flex-wrap gap-6 mt-10 text-white/80 text-sm"
              >
                {['CLIA Certified', 'CAP Accredited', 'HIPAA Compliant'].map((label) => (
                  <span key={label} className="flex items-center gap-1.5">
                    <svg className="w-4 h-4 text-sunshine-yellow flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    {label}
                  </span>
                ))}
              </motion.div>
            </motion.div>

            {/* Right: Visual card */}
            <motion.div
              variants={imageVariants}
              initial="hidden"
              animate="visible"
              className="hidden lg:block relative"
            >
              {/* Glow ring */}
              <div className="absolute inset-0 rounded-3xl bg-sunshine-yellow/10 blur-2xl scale-105" />

              {/* Card */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/30">
                <div className="aspect-[4/3] bg-gradient-to-br from-white/30 via-sunshine-sky/40 to-sunshine-blue/60 relative">
                  <div className="absolute inset-0 bg-gradient-to-tr from-sunshine-yellow/10 via-transparent to-white/20" />
                  {/* Lab icon grid */}
                  <div className="relative z-10 grid grid-cols-3 gap-5 p-10 h-full content-center">
                    {labCards.map(({ Icon, label }, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5 + i * 0.08, duration: 0.4 }}
                        className="flex flex-col items-center gap-2 bg-white/20 backdrop-blur-sm rounded-2xl p-4 border border-white/30"
                      >
                        <Icon className="w-7 h-7 text-white" />
                        <span className="text-white/90 text-xs text-center font-medium leading-tight">{label}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Accuracy badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.9, duration: 0.4 }}
                className="absolute -bottom-5 -left-5 bg-white rounded-2xl shadow-xl px-5 py-3 border border-sunshine-sky/20"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-sunshine-yellow rounded-full flex items-center justify-center font-bold text-sunshine-dark text-sm">
                    99%
                  </div>
                  <div>
                    <p className="text-sunshine-dark font-semibold text-sm">Accuracy Rate</p>
                    <p className="text-gray-500 text-xs">ISO 15189 Standard</p>
                  </div>
                </div>
              </motion.div>

              {/* Patients badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.0, duration: 0.4 }}
                className="absolute -top-4 -right-4 bg-sunshine-yellow rounded-2xl shadow-xl px-5 py-3"
              >
                <p className="text-sunshine-dark font-bold text-lg leading-none">50K+</p>
                <p className="text-sunshine-dark/70 text-xs mt-0.5">Patients Served</p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Wave divider */}
      <div className="relative w-full" style={{ height: '80px' }}>
        <svg
          viewBox="0 0 1440 80"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          className="absolute bottom-0 w-full h-full"
        >
          <path
            d="M0,40 C240,80 480,0 720,40 C960,80 1200,0 1440,40 L1440,80 L0,80 Z"
            fill="#FEF5D9"
          />
        </svg>
      </div>
    </section>
  );
}
