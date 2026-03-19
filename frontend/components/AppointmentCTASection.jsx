'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { CalendarDays, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { ShimmerButton } from '@/registry/magicui/shimmer-button';

export default function AppointmentCTASection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="appointment" className="relative py-20 bg-gradient-to-br from-[#9dc8e8] to-[#dbeeff] border-t border-gray-100 overflow-hidden">

      {/* ── Decorative SVG background ── */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        {/* Large dashed circle — top right */}
        <svg className="absolute -top-24 -right-24 w-[480px] h-[480px] opacity-[0.12]" viewBox="0 0 480 480" fill="none">
          <circle cx="240" cy="240" r="220" stroke="#2B7DBF" strokeWidth="1.5" strokeDasharray="9 6"/>
          <circle cx="240" cy="240" r="155" stroke="#6BB6E8" strokeWidth="1" strokeDasharray="5 4"/>
          <circle cx="240" cy="240" r="85"  stroke="#2B7DBF" strokeWidth="1" strokeDasharray="3 3"/>
        </svg>
        {/* Small dashed circle — bottom left */}
        <svg className="absolute -bottom-20 -left-20 w-72 h-72 opacity-[0.10]" viewBox="0 0 300 300" fill="none">
          <circle cx="150" cy="150" r="130" stroke="#2B7DBF" strokeWidth="1.5" strokeDasharray="6 4"/>
          <circle cx="150" cy="150" r="80"  stroke="#6BB6E8" strokeWidth="1"/>
        </svg>
        {/* Scattered cross / plus marks */}
        <svg className="absolute top-10 left-[38%] w-7 h-7 opacity-[0.18]" viewBox="0 0 28 28" fill="none">
          <line x1="14" y1="3" x2="14" y2="25" stroke="#2B7DBF" strokeWidth="2.5" strokeLinecap="round"/>
          <line x1="3"  y1="14" x2="25" y2="14" stroke="#2B7DBF" strokeWidth="2.5" strokeLinecap="round"/>
        </svg>
        <svg className="absolute bottom-14 right-[30%] w-5 h-5 opacity-[0.15]" viewBox="0 0 28 28" fill="none">
          <line x1="14" y1="3" x2="14" y2="25" stroke="#6BB6E8" strokeWidth="2.5" strokeLinecap="round"/>
          <line x1="3"  y1="14" x2="25" y2="14" stroke="#6BB6E8" strokeWidth="2.5" strokeLinecap="round"/>
        </svg>
        <svg className="absolute top-1/2 left-6 w-4 h-4 opacity-[0.12]" viewBox="0 0 28 28" fill="none">
          <line x1="14" y1="3" x2="14" y2="25" stroke="#2B7DBF" strokeWidth="2.5" strokeLinecap="round"/>
          <line x1="3"  y1="14" x2="25" y2="14" stroke="#2B7DBF" strokeWidth="2.5" strokeLinecap="round"/>
        </svg>
        {/* Dot scatter — left side */}
        <svg className="absolute top-1/4 left-3 opacity-[0.14]" width="96" height="180" fill="none">
          {[0,1,2,3,4].map(r => [0,1,2].map(c => (
            <circle key={`${r}-${c}`} cx={c * 32 + 16} cy={r * 38 + 16} r="2.5" fill="#2B7DBF"/>
          )))}
        </svg>
        {/* Dot scatter — right side */}
        <svg className="absolute bottom-1/4 right-4 opacity-[0.10]" width="80" height="120" fill="none">
          {[0,1,2].map(r => [0,1].map(c => (
            <circle key={`${r}-${c}`} cx={c * 36 + 16} cy={r * 44 + 16} r="2" fill="#6BB6E8"/>
          )))}
        </svg>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
        >
          {/* Left — Image */}
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 2.8, ease: 'easeOut', delay: 0.1 }}
          >
            <Image
              src="/main-img.webp"
              alt="Sunshine Clinical Lab"
              width={600}
              height={700}
              quality={100}
              className="w-full h-auto"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </motion.div>

          {/* Right — Text content */}
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 2.8, ease: 'easeOut', delay: 0.2 }}
            className="flex flex-col gap-6 items-end text-right"
          >
            {/* Small label */}
            <span className="text-sm font-semibold tracking-widest text-sunshine-blue uppercase">
              Hello and Welcome to
            </span>

            {/* Main heading */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-sunshine-dark leading-tight">
              Sunshine Clinical Lab LLC
            </h2>

            {/* Paragraphs */}
            <div className="space-y-4">
              <p className="text-gray-600 text-base leading-relaxed">
                At Sunshine Clinical Lab LLC, we understand the importance of accurate testing in
                healthcare decisions. With a compassionate touch, we provide advanced laboratory
                services to empower individuals on their wellness journey.
                From routine screenings to specialized diagnostics, trust us to deliver precise
                results with care and efficiency.
              </p>
              <p className="text-gray-600 text-base leading-relaxed">
                Let Sunshine Clinical Lab LLC’s services and decisions guide you 
                toward a healthier, more tranquil life.
              </p>
            </div>

            {/* CTA Button */}
            <div className="pt-2">
              <Link href="/book-appointment">
                <ShimmerButton className="bg-gradient-to-r from-[#2B7DBF] to-[#5BB5F0] text-white text-base px-8 py-4 rounded-full font-semibold shadow-xl">
                  <CalendarDays className="w-5 h-5 flex-shrink-0" />
                  <span>Set an Appointment</span>
                  <ArrowRight className="w-4 h-4 flex-shrink-0" />
                </ShimmerButton>
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
