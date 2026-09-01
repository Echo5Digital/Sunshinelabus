'use client';

import Link from 'next/link';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  Building2, ArrowRight, Phone, Home, Brain, Stethoscope, HeartHandshake,
  Briefcase, Sparkles, Activity, Building,
} from 'lucide-react';
import { ShimmerButton } from '@/registry/magicui/shimmer-button';

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' } },
};

const partnerTypes = [
  { Icon: Home, label: 'Assisted living communities' },
  { Icon: Brain, label: 'Memory care facilities' },
  { Icon: Stethoscope, label: 'Skilled nursing facilities' },
  { Icon: HeartHandshake, label: 'Home health and hospice organizations' },
  { Icon: Briefcase, label: 'Physician offices' },
  { Icon: Sparkles, label: 'Concierge and functional medicine practices' },
  { Icon: Activity, label: "Men's health and TRT clinics" },
  { Icon: Building, label: 'Other healthcare organizations' },
];

export default function FacilityPartnershipsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      className="py-20 bg-white"
      aria-labelledby="facility-partnerships-heading"
      ref={ref}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <div className="flex justify-center mb-4" aria-hidden="true">
            <div className="w-14 h-14 rounded-2xl bg-sunshine-blue flex items-center justify-center shadow-lg">
              <Building2 className="w-7 h-7 text-white" />
            </div>
          </div>
          <span className="text-sunshine-blue text-xs font-bold uppercase tracking-widest mb-3 block">
            Facility &amp; Provider Partnerships
          </span>
          <h2
            id="facility-partnerships-heading"
            className="text-3xl sm:text-4xl font-extrabold text-sunshine-dark"
          >
            Lab Services for Healthcare Facilities &amp; Providers
          </h2>
          <p className="text-gray-700 mt-4 max-w-2xl mx-auto text-base leading-relaxed">
            Need a reliable partner for on-site blood draws? Sunshine Clinical Labs provides
            mobile phlebotomy services for healthcare organizations and care facilities throughout
            our service area.
          </p>
        </motion.div>

        {/* Partner type cards */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-12"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {partnerTypes.map(({ Icon, label }) => (
            <motion.div
              key={label}
              variants={itemVariants}
              className="flex items-center gap-3 bg-sunshine-soft/40 rounded-2xl px-5 py-4 shadow-sm border border-sunshine-blue/15"
            >
              <div className="w-10 h-10 rounded-xl bg-sunshine-soft flex items-center justify-center flex-shrink-0">
                <Icon className="w-5 h-5 text-sunshine-blue" aria-hidden="true" />
              </div>
              <span className="text-sunshine-dark text-sm font-semibold leading-snug">{label}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <p className="text-gray-700 mb-6 max-w-2xl mx-auto leading-relaxed">
            Need occasional draws or recurring service? Talk with our team about what your
            organization needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/contact" aria-label="Discuss a facility partnership" className="w-full sm:w-auto">
              <ShimmerButton className="w-full sm:w-auto bg-sunshine-blue text-white px-8 py-4 rounded-full font-semibold shadow-lg gap-2">
                Discuss a Facility Partnership
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </ShimmerButton>
            </Link>
            <a href="tel:+17272335223" aria-label="Call to discuss a facility partnership" className="w-full sm:w-auto">
              <ShimmerButton className="w-full sm:w-auto border border-sunshine-blue/30 text-sunshine-blue bg-white px-6 py-4 rounded-full font-semibold gap-2">
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
