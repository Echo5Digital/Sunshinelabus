'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Phone, ArrowRight } from 'lucide-react';
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
  return (
    <section
      className="relative w-full min-h-screen flex items-center overflow-hidden"
      aria-label="Hero section"
    >
      {/* Background image with dark gradient overlay */}
      <div className="absolute inset-0">
        <Image
          src="/hm1.jpg"
          alt="Sunshine Clinical Lab building exterior at 3600 Galileo Dr Trinity FL 34655"
          fill
          priority
          quality={90}
          className="object-cover object-center"
          sizes="100vw"
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
              Trusted Clinical Lab — Trinity, FL
            </p>
          </motion.div>

          {/* H1 — Main visible headline */}
          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-4"
          >
            Trusted Clinical Lab in Trinity, FL —{' '}
            <span className="text-[#93C5FD]">Fast Results, Walk-Ins Welcome,</span>{' '}
            No Long Waits
          </motion.h1>

          {/* H2 — Subheadline */}
          <motion.h2
            variants={itemVariants}
            className="text-2xl sm:text-3xl font-bold text-white/90 mb-4"
          >
            Your Neighborhood Lab. Not a Number on a Clipboard.
          </motion.h2>

          <motion.p variants={itemVariants} className="text-white/85 text-lg leading-relaxed mb-10 max-w-xl">
            Sunshine Clinical Lab delivers fast, affordable lab testing with next-day results for
            many services — right here in Trinity, FL, serving New Port Richey, Pasco County, and
            the greater Tampa Bay region. Walk in today or book a mobile blood draw from the
            comfort of your home.
          </motion.p>

          {/* 3 CTA buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row flex-wrap gap-4"
          >
            <a href="tel:7272335223" aria-label="Call Sunshine Clinical Lab at (727) 233-5223">
              <ShimmerButton className="bg-white text-sunshine-dark px-7 py-3.5 rounded-full font-bold shadow-xl text-base gap-2">
                <Phone className="w-5 h-5" aria-hidden="true" />
                Schedule Your Visit — (727) 233-5223
              </ShimmerButton>
            </a>

            <Link href="/mobile-blood-draw-pasco-county" aria-label="Request a mobile blood draw">
              <ShimmerButton className="bg-sunshine-blue text-white px-7 py-3.5 rounded-full font-semibold shadow-lg text-base border border-white/20 gap-2">
                Request a Mobile Blood Draw
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </ShimmerButton>
            </Link>

            <Link href="/clinical-lab-services-trinity-fl" aria-label="View all our lab services">
              <ShimmerButton className="border-2 border-white/60 bg-white/10 backdrop-blur-sm text-white px-7 py-3.5 rounded-full font-semibold text-base gap-2">
                View All Services
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </ShimmerButton>
            </Link>
          </motion.div>
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
