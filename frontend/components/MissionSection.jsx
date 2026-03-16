'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import ContactForm from './ContactForm';
import { Heart, Star, Users } from 'lucide-react';

const values = [
  { Icon: Heart, label: 'Patient-Centered Care' },
  { Icon: Star, label: 'Quality & Accuracy' },
  { Icon: Users, label: 'Community Trust' },
];

export default function MissionSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      ref={ref}
      id="contact"
      className="relative py-24 overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #FFF9E6 0%, #ffffff 50%, #EBF5FF 100%)',
      }}
    >
      {/* Wave top */}
      <div className="absolute top-0 left-0 right-0 -translate-y-px">
        <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full" preserveAspectRatio="none">
          <path
            d="M0 0L48 5.3C96 10.7 192 21.3 288 26.7C384 32 480 32 576 26.7C672 21.3 768 10.7 864 10.7C960 10.7 1056 21.3 1152 26.7C1248 32 1344 32 1392 32H1440V0H0Z"
            fill="white"
          />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* Left: Mission Text */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="pt-4"
          >
            <span className="inline-flex items-center gap-2 bg-sunshine-yellow/20 text-sunshine-dark text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4 border border-sunshine-yellow/40">
              <span className="w-1.5 h-1.5 bg-sunshine-yellow rounded-full" />
              Our Mission
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-sunshine-dark leading-tight mb-6">
              Empowering Better Healthcare Through{' '}
              <span className="text-sunshine-blue">Precision Diagnostics</span>
            </h2>
            <p className="text-sunshine-dark/70 text-lg leading-relaxed mb-6">
              Our mission is to provide accurate, reliable, and timely diagnostic testing
              services that empower healthcare providers and patients to make informed
              medical decisions.
            </p>
            <p className="text-sunshine-dark/60 leading-relaxed mb-8">
              We believe every laboratory result is more than data — it&apos;s a critical piece of
              a patient&apos;s health story. That&apos;s why we apply the highest standards of quality
              assurance to every single test we perform.
            </p>

            {/* Core values */}
            <div className="flex flex-wrap gap-3">
              {values.map(({ Icon, label }) => (
                <span
                  key={label}
                  className="inline-flex items-center gap-2 bg-white border border-sunshine-sky/30 text-sunshine-dark text-sm px-4 py-2 rounded-full shadow-sm font-medium"
                >
                  <Icon className="w-4 h-4 text-sunshine-blue" />
                  {label}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Right: Contact Card */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.15 }}
          >
            <div className="bg-white rounded-3xl shadow-xl p-5 sm:p-8 border border-sunshine-sky/20">
              <h3 className="text-xl font-bold text-sunshine-dark mb-2">Contact Us</h3>
              <p className="text-gray-500 text-sm mb-6">We&apos;d love to hear from you. Send us a message and we&apos;ll respond promptly.</p>
              <ContactForm />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Wave bottom */}
      <div className="absolute bottom-0 left-0 right-0 translate-y-px">
        <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full" preserveAspectRatio="none">
          <path
            d="M0 60L48 54.7C96 49.3 192 38.7 288 33.3C384 28 480 28 576 33.3C672 38.7 768 49.3 864 49.3C960 49.3 1056 38.7 1152 33.3C1248 28 1344 28 1392 28H1440V60H0Z"
            fill="#1E2A38"
          />
        </svg>
      </div>
    </section>
  );
}
