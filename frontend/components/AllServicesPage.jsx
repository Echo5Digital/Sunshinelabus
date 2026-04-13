'use client';

import { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import {
  FlaskConical,
  Car,
  Activity,
  Heart,
  Dna,
  Phone,
  CalendarDays,
  ArrowRight,
  CheckCircle,
  Shield,
  Clock,
  MapPin,
  Stethoscope,
} from 'lucide-react';
import { ShimmerButton } from '@/registry/magicui/shimmer-button';

// ─── Animation variants ───────────────────────────────────────────────────────

const heroContainerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
};

const heroItemVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

// ─── Scroll-triggered section wrapper ────────────────────────────────────────

function Section({ children, className = '' }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <motion.div
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── Service data ─────────────────────────────────────────────────────────────

const allServices = [
  {
    title: 'General Lab Testing',
    description:
      'CBC, comprehensive metabolic panels, lipid panels, thyroid function, A1C/glucose, liver and kidney panels — walk-in or by appointment.',
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
      'Our experienced phlebotomists come directly to your home or office anywhere in Pasco County — no travel required.',
    href: '/mobile-blood-draw-pasco-county',
    Icon: Car,
    iconBg: 'bg-sunshine-mist',
    iconColor: 'text-emerald-700',
    tag: 'Convenience',
    tagColor: 'bg-emerald-50 text-emerald-700',
  },
  {
    title: 'TRT Blood Testing',
    description:
      'Full testosterone replacement therapy monitoring: total & free testosterone, estradiol, hematocrit, SHBG, LH/FSH, and PSA panels.',
    href: '/trt-blood-test-pasco-county',
    Icon: Activity,
    iconBg: 'bg-sunshine-light',
    iconColor: 'text-amber-600',
    tag: "Men's Health",
    tagColor: 'bg-amber-50 text-amber-600',
  },
  {
    title: 'Gender Reveal Testing',
    description:
      'Peekaboo early gender reveal blood test with accurate results as early as 7 weeks into pregnancy — fun and reliable.',
    href: '/gender-reveal-testing-florida',
    Icon: Heart,
    iconBg: 'bg-pink-50',
    iconColor: 'text-pink-600',
    tag: 'Early Detection',
    tagColor: 'bg-pink-50 text-pink-600',
  },
  {
    title: 'DNA Testing',
    description:
      'AABB-accredited legal, immigration (USCIS), paternity and relationship DNA testing with court-admissible certified results.',
    href: '/dna-testing-pasco-county',
    Icon: Dna,
    iconBg: 'bg-purple-50',
    iconColor: 'text-purple-600',
    tag: 'AABB Accredited',
    tagColor: 'bg-purple-50 text-purple-600',
  },
];

const features = [
  { icon: CheckCircle, label: 'Walk-In Welcome' },
  { icon: Shield, label: 'Insurance Accepted' },
  { icon: Stethoscope, label: 'CLIA Certified Lab' },
  { icon: Clock, label: 'Fast Turnaround' },
];

// ─── Main component ───────────────────────────────────────────────────────────

export default function AllServicesPage() {
  return (
    <main className="overflow-x-hidden">
      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section className="relative w-full min-h-[70vh] flex items-center overflow-hidden">
        {/* Background image */}
        <Image
          src="/service-bnr2.jpg"
          alt="Sunshine Clinical Lab services"
          fill
          className="object-cover object-center"
          priority
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-sunshine-dark/95 via-sunshine-dark/80 to-sunshine-blue/60" />

        {/* Decorative rings */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full border border-white/5" />
          <div className="absolute bottom-20 -right-20 w-80 h-80 rounded-full border border-white/5" />
          <div className="absolute top-1/3 left-1/4 w-40 h-40 rounded-full bg-white/[0.03]" />
          <div className="absolute bottom-1/4 right-1/3 w-24 h-24 rounded-full bg-white/[0.04]" />
        </div>

        {/* Content */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 pt-36">
          <motion.div
            variants={heroContainerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-2xl"
          >
            <motion.p
              variants={heroItemVariants}
              className="text-white/75 text-sm font-semibold tracking-widest mb-5 uppercase"
            >
              Sunshine Clinical Lab
            </motion.p>

            <motion.h1
              variants={heroItemVariants}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-4"
            >
              All Our Services{' '}
              <span className="text-[#93C5FD]">in One Place</span>
            </motion.h1>

            <motion.p
              variants={heroItemVariants}
              className="text-white/85 text-lg leading-relaxed mb-10 max-w-xl"
            >
              From routine blood panels and TRT monitoring to DNA testing and mobile
              phlebotomy — Sunshine Clinical Lab offers the full range of diagnostic
              services for Pasco County and surrounding communities.
            </motion.p>

            <motion.div
              variants={heroItemVariants}
              className="flex flex-col sm:flex-row flex-wrap gap-4"
            >
              <Link href="/book-appointment">
                <ShimmerButton className="bg-white text-sunshine-dark px-7 py-3.5 rounded-full font-bold shadow-xl gap-2 w-full sm:w-auto justify-center">
                  <CalendarDays className="w-5 h-5 flex-shrink-0" />
                  Book Appointment
                </ShimmerButton>
              </Link>
              <a href="tel:+17272335223">
                <ShimmerButton className="bg-sunshine-blue border border-white/20 text-white px-7 py-3.5 rounded-full font-semibold gap-2 w-full sm:w-auto justify-center">
                  <Phone className="w-4 h-4 flex-shrink-0" />
                  Call (727) 233-5223
                </ShimmerButton>
              </a>
            </motion.div>
          </motion.div>
        </div>

        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
          <svg
            viewBox="0 0 1440 72"
            preserveAspectRatio="none"
            className="w-full h-14 sm:h-20"
          >
            <path
              d="M0,36 C240,72 480,0 720,36 C960,72 1200,0 1440,36 L1440,72 L0,72 Z"
              fill="#EBF5FB"
            />
          </svg>
        </div>
      </section>

      {/* ── FEATURES STRIP ─────────────────────────────────────────────────── */}
      <section className="bg-[#EBF5FB] pt-4 pb-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Section>
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap justify-center gap-3 sm:gap-4"
            >
              {features.map(({ icon: Icon, label }) => (
                <span
                  key={label}
                  className="inline-flex items-center gap-2 bg-white border border-sunshine-blue/15 text-sunshine-dark text-xs sm:text-sm font-semibold px-4 py-2 rounded-full shadow-sm"
                >
                  <Icon className="w-4 h-4 text-sunshine-blue flex-shrink-0" />
                  {label}
                </span>
              ))}
            </motion.div>
          </Section>
        </div>
      </section>

      {/* ── SERVICES GRID ──────────────────────────────────────────────────── */}
      <section className="bg-[#EBF5FB] py-10 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Section>
            {/* Section header */}
            <motion.div variants={itemVariants} className="text-center mb-12">
              <span className="text-sunshine-blue text-xs font-bold uppercase tracking-widest mb-3 block">
                Our Services
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-sunshine-dark">
                What We Offer
              </h2>
              <p className="text-gray-500 mt-4 max-w-2xl mx-auto text-base leading-relaxed">
                Professional, affordable, and convenient lab services — available
                walk-in or by appointment. Most major insurance plans accepted.
              </p>
            </motion.div>

            {/* Cards grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {allServices.map((service, idx) => (
                <ServiceCard key={service.title} service={service} idx={idx} />
              ))}
            </div>
          </Section>
        </div>
      </section>

      {/* ── MID CTA ────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-r from-sunshine-blue to-sunshine-sky py-20">
        {/* Decorative circles */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full border border-white/10" />
          <div className="absolute -bottom-16 -left-16 w-72 h-72 rounded-full border border-white/10" />
          <div className="absolute top-1/2 left-1/4 w-40 h-40 rounded-full bg-white/[0.04]" />
          <div className="absolute top-1/4 right-1/3 w-24 h-24 rounded-full bg-white/[0.06]" />
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Section>
            <motion.h2
              variants={itemVariants}
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-5"
            >
              Ready to Get Tested?
              <br />
              <span className="text-[#93C5FD]">We Make It Easy.</span>
            </motion.h2>

            <motion.p
              variants={itemVariants}
              className="text-white/80 text-lg leading-relaxed mb-10 max-w-2xl mx-auto"
            >
              Walk in anytime during business hours, book online, or call us to
              schedule. Same-day results available for most tests.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row justify-center gap-4 mb-10"
            >
              <Link href="/book-appointment">
                <ShimmerButton className="bg-white text-sunshine-dark px-8 py-4 rounded-full font-bold shadow-2xl text-base gap-2 w-full sm:w-auto justify-center">
                  <CalendarDays className="w-5 h-5 flex-shrink-0" />
                  Book Appointment
                </ShimmerButton>
              </Link>
              <a href="tel:+17272335223">
                <ShimmerButton className="bg-white/15 border border-white/30 text-white px-8 py-4 rounded-full font-semibold text-base gap-2 w-full sm:w-auto justify-center">
                  <Phone className="w-5 h-5 flex-shrink-0" />
                  Call (727) 233-5223
                </ShimmerButton>
              </a>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-white/75 text-sm"
            >
              <span className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-white flex-shrink-0" />
                3600 Galileo Dr, Suite 104, Trinity, FL 34655
              </span>
              <span className="hidden sm:block text-white/30">|</span>
              <span className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-white flex-shrink-0" />
                Mon–Fri 8:00 am – 5:00 pm
              </span>
            </motion.div>
          </Section>
        </div>
      </section>
    </main>
  );
}

// ─── Service card ─────────────────────────────────────────────────────────────

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
