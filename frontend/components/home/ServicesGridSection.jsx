'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import {
  FlaskConical, Car, Activity, Dna, Heart, ShieldAlert, ArrowRight,
} from 'lucide-react';
import { ShimmerButton } from '@/registry/magicui/shimmer-button';

const SERVICES = [
  {
    title: 'General Lab Testing',
    description:
      'Routine blood work including CBC, metabolic panels, lipids, A1C, thyroid, liver and kidney testing.',
    href: '/clinical-lab-services-trinity-fl',
    Icon: FlaskConical,
    iconBg: 'bg-sunshine-blue/10',
    iconColor: 'text-sunshine-blue',
    tag: 'Most Popular',
    tagColor: 'bg-sunshine-blue/10 text-sunshine-blue',
  },
  {
    title: 'Mobile Blood Draw',
    description:
      'Have a phlebotomist come to your home, office, or care facility.',
    href: '/mobile-blood-draw-pasco-county',
    Icon: Car,
    iconBg: 'bg-sunshine-mist',
    iconColor: 'text-emerald-700',
    tag: 'Convenience',
    tagColor: 'bg-emerald-50 text-emerald-700',
  },
  {
    title: 'TRT & Hormone Testing',
    description:
      'Blood testing and monitoring for commonly requested TRT and hormone markers.',
    href: '/trt-blood-test-pasco-county',
    Icon: Activity,
    iconBg: 'bg-sunshine-light',
    iconColor: 'text-amber-600',
    tag: "Men's Health",
    tagColor: 'bg-amber-50 text-amber-600',
  },
  {
    title: 'DNA Testing',
    description:
      'Paternity, legal, immigration and relationship DNA testing options.',
    href: '/dna-testing-pasco-county',
    Icon: Dna,
    iconBg: 'bg-purple-50',
    iconColor: 'text-purple-600',
    tag: 'AABB Accredited',
    tagColor: 'bg-purple-50 text-purple-600',
  },
  {
    title: 'Gender Reveal Testing',
    description:
      'Blood-based gender reveal testing for expecting parents.',
    href: '/gender-reveal-testing-florida',
    Icon: Heart,
    iconBg: 'bg-pink-50',
    iconColor: 'text-pink-600',
    tag: 'Early Detection',
    tagColor: 'bg-pink-50 text-pink-600',
  },
  {
    title: 'Drug & Toxicology Testing',
    description:
      'Screening options for workplace, legal and clinical testing needs.',
    href: '/drug-and-toxicology-testing-fl',
    Icon: ShieldAlert,
    iconBg: 'bg-sunshine-soft',
    iconColor: 'text-sunshine-dark',
    tag: 'Screening',
    tagColor: 'bg-gray-100 text-sunshine-dark',
  },
];

function ServiceCard({ service, idx }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease: 'easeOut', delay: idx * 0.08 }}
      whileHover={{ y: -6, scale: 1.02 }}
      className="h-full"
    >
      <Link
        href={service.href}
        className="group flex flex-col h-full bg-white rounded-2xl shadow-sm hover:shadow-xl border border-sunshine-sky/20 hover:border-sunshine-sky/50 transition-all duration-300 overflow-hidden"
      >
        {/* Top accent bar */}
        <div className="h-1 w-full bg-gradient-to-r from-sunshine-blue to-sunshine-sky" />

        <div className="flex flex-col flex-1 p-6">
          {/* Icon + tag row */}
          <div className="flex items-start justify-between mb-5">
            <div
              className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${service.iconBg}`}
            >
              <service.Icon className={`w-6 h-6 ${service.iconColor}`} />
            </div>
            <span
              className={`text-[11px] font-bold tracking-wide px-2.5 py-1 rounded-full ${service.tagColor}`}
            >
              {service.tag}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-lg font-bold text-sunshine-dark mb-3 leading-snug">
            {service.title}
          </h3>

          {/* Description */}
          <p className="text-gray-500 text-sm leading-relaxed flex-1">
            {service.description}
          </p>

          {/* Learn more */}
          <div className="mt-5 flex items-center gap-1.5 text-sunshine-blue font-semibold text-sm group-hover:gap-2.5 transition-all duration-200">
            Learn More
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default function ServicesGridSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      id="services"
      className="py-20 bg-sunshine-soft"
      aria-labelledby="services-section-heading"
      ref={ref}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <span className="text-sunshine-blue text-xs font-bold uppercase tracking-widest mb-3 block">
            Comprehensive Lab Services
          </span>
          <h2
            id="services-section-heading"
            className="text-3xl sm:text-4xl font-extrabold text-sunshine-dark"
          >
            Complete Lab Testing Services in Trinity, FL &amp; Pasco County
          </h2>
          <p className="text-gray-500 mt-4 max-w-2xl mx-auto text-base">
            Sunshine Clinical Lab offers a comprehensive range of clinical laboratory services for
            individuals, families, physicians, and healthcare providers throughout Trinity, New
            Port Richey, Pasco County, and the Tampa Bay region.
          </p>
        </motion.div>

        {/* Services grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((service, idx) => (
            <ServiceCard key={service.title} service={service} idx={idx} />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Link href="/all-services" aria-label="View all our lab services">
            <ShimmerButton className="bg-sunshine-blue text-white px-8 py-3.5 rounded-full font-semibold shadow-lg gap-2">
              View All Lab Services →
            </ShimmerButton>
          </Link>
          <p className="mt-3 text-sm text-gray-500">
            Or call <a href="tel:+17272335223" className="text-sunshine-blue font-semibold">(727) 233-5223</a>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
