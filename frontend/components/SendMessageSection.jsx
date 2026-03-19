'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { MessageSquare } from 'lucide-react';
import ContactForm from './ContactForm';

export default function SendMessageSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="contact" className="relative pt-20 pb-0 bg-sunshine-mist overflow-hidden">

      {/* ── Decorative SVG background ── */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        {/* Dot grid */}
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="contact-dots" x="0" y="0" width="26" height="26" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1.1" fill="#2B7DBF" fillOpacity="0.09"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#contact-dots)"/>
        </svg>
        {/* Large ring — top left */}
        <svg className="absolute -top-28 -left-28 w-[420px] h-[420px] opacity-[0.09]" viewBox="0 0 420 420" fill="none">
          <circle cx="0" cy="0" r="260" stroke="#2B7DBF" strokeWidth="1.5" strokeDasharray="8 5"/>
          <circle cx="0" cy="0" r="180" stroke="#6BB6E8" strokeWidth="1" strokeDasharray="4 3"/>
        </svg>
        {/* Ring — top right */}
        <svg className="absolute -top-16 -right-16 w-72 h-72 opacity-[0.08]" viewBox="0 0 300 300" fill="none">
          <circle cx="300" cy="0" r="190" stroke="#2B7DBF" strokeWidth="1.5" strokeDasharray="6 4"/>
        </svg>
        {/* Plus marks */}
        <svg className="absolute top-12 right-[20%] w-6 h-6 opacity-[0.18]" viewBox="0 0 28 28" fill="none">
          <line x1="14" y1="3" x2="14" y2="25" stroke="#2B7DBF" strokeWidth="2.5" strokeLinecap="round"/>
          <line x1="3"  y1="14" x2="25" y2="14" stroke="#2B7DBF" strokeWidth="2.5" strokeLinecap="round"/>
        </svg>
        <svg className="absolute top-24 left-[15%] w-4 h-4 opacity-[0.14]" viewBox="0 0 28 28" fill="none">
          <line x1="14" y1="3" x2="14" y2="25" stroke="#6BB6E8" strokeWidth="2.5" strokeLinecap="round"/>
          <line x1="3"  y1="14" x2="25" y2="14" stroke="#6BB6E8" strokeWidth="2.5" strokeLinecap="round"/>
        </svg>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          {/* Section heading */}
          <div className="text-center mb-10">
            <span className="inline-flex items-center gap-2 text-sunshine-blue text-sm font-semibold uppercase tracking-widest mb-3">
              <MessageSquare className="w-4 h-4" />
              Reach Out to Us
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-sunshine-dark mb-3">
              Send Us a Message
            </h2>
            <p className="text-gray-500 text-base max-w-xl mx-auto">
              Don&apos;t hesitate to connect with us! Drop us a message today to explore how we can assist you on your health journey.
            </p>
          </div>

          {/* Form */}
          <ContactForm />
        </motion.div>
      </div>

      {/* ── Multi-layer Wave Decoration ─────────────────────────────────────── */}
      <div className="relative w-full" style={{ height: '160px' }}>
        <svg
          viewBox="0 0 1440 160"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          className="absolute bottom-0 w-full h-full"
        >
          {/* Layer 1 — lavender/purple */}
          <path
            d="M0,80 C200,140 400,20 600,80 C800,140 1000,20 1200,80 C1300,110 1380,60 1440,80 L1440,160 L0,160 Z"
            fill="#B8A9D9"
            fillOpacity="0.55"
          />
          {/* Layer 2 — sky blue */}
          <path
            d="M0,100 C180,50 360,140 540,100 C720,60 900,150 1080,100 C1200,65 1350,120 1440,100 L1440,160 L0,160 Z"
            fill="#6BB6E8"
            fillOpacity="0.65"
          />
          {/* Layer 3 — lighter blue */}
          <path
            d="M0,120 C240,80 480,150 720,120 C960,90 1200,150 1440,120 L1440,160 L0,160 Z"
            fill="#A8D8F0"
            fillOpacity="0.50"
          />
        </svg>
      </div>
    </section>
  );
}
