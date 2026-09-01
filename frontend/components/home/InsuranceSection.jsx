'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Shield, ArrowRight, Phone } from 'lucide-react';
import { ShimmerButton } from '@/registry/magicui/shimmer-button';

const insurancePlans = [
  'Medicare',
  'Medicaid',
  'Blue Cross Blue Shield',
  'Aetna',
  'Cigna',
  'United Healthcare',
  'Humana',
  'Tricare',
  'Oscar Health',
  'Molina Healthcare',
];

export default function InsuranceSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      className="relative overflow-hidden py-16 bg-white border-t border-b border-gray-100"
      aria-labelledby="insurance-heading"
      ref={ref}
    >
      <div className="absolute inset-0" aria-hidden="true">
        <Image
          src="/hm-ins.jpeg"
          alt=""
          fill
          className="object-cover opacity-40"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-white/60" />
      </div>
      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
        >
          <div className="flex justify-center mb-5" aria-hidden="true">
            <div className="w-14 h-14 rounded-2xl bg-sunshine-soft flex items-center justify-center shadow-md">
              <Shield className="w-7 h-7 text-sunshine-blue" />
            </div>
          </div>

          <span className="text-sunshine-blue text-xs font-bold uppercase tracking-widest mb-3 block">
            Insurance &amp; Payment
          </span>

          <h2
            id="insurance-heading"
            className="text-2xl sm:text-3xl font-extrabold text-sunshine-dark mb-4"
          >
            Insurance &amp; Self-Pay
          </h2>

          <p className="text-gray-700 mb-8 max-w-2xl mx-auto leading-relaxed">
            Sunshine Clinical Labs accepts insurance and offers self-pay options. Coverage can
            vary depending on your plan and the testing being performed. Contact our office
            before your visit if you would like us to help verify your coverage.
          </p>

          {/* Insurance plan chips */}
          <div
            className="flex flex-wrap justify-center gap-3 mb-10"
            aria-label="Accepted insurance plans"
          >
            {insurancePlans.map((plan) => (
              <span
                key={plan}
                className="px-4 py-2 bg-sunshine-soft rounded-full text-sm font-semibold text-sunshine-dark border border-sunshine-sky/30 shadow-sm"
              >
                {plan}
              </span>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/insurance-accepted" aria-label="View insurance and payment information">
              <ShimmerButton className="bg-sunshine-blue text-white px-8 py-3.5 rounded-full font-semibold shadow-lg gap-2">
                View Insurance &amp; Payment Information
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </ShimmerButton>
            </Link>
            <a href="tel:+17272335223" aria-label="Call to ask about insurance coverage">
              <ShimmerButton className="border-2 border-sunshine-blue text-sunshine-blue bg-white px-8 py-3.5 rounded-full font-semibold gap-2">
                <Phone className="w-4 h-4" aria-hidden="true" />
                (727) 233-5223
              </ShimmerButton>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
