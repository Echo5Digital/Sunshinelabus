'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  Droplets,
  FlaskConical,
  Shield,
  Activity,
  TestTube,
  Dna,
  Syringe,
  Microscope,
} from 'lucide-react';
import ServiceCard from './ServiceCard';

const services = [
  { id: 'hematology',      title: 'Hematology',         Icon: Droplets,     href: '/services/hematology' },
  { id: 'chemistry',       title: 'Chemistry',           Icon: FlaskConical, href: '/services/chemistry' },
  { id: 'immunochemistry', title: 'Immunochemistry',     Icon: Shield,       href: '/services/immunochemistry' },
  { id: 'coagulation',     title: 'Coagulation Service', Icon: Activity,     href: '/services/coagulation' },
  { id: 'drug-testing',    title: 'Drug Testing',        Icon: TestTube,     href: '/services/drug-testing' },
  { id: 'molecular',       title: 'Molecular Testing',   Icon: Dna,          href: '/services/molecular' },
  { id: 'phlebotomy',      title: 'Phlebotomy Service',  Icon: Syringe,      href: '/services/phlebotomy' },
  { id: 'dna-testing',     title: 'DNA Testing',         Icon: Microscope,   href: '/services/dna-testing', highlight: true },
];

const cardVariants = {
  hidden:  { opacity: 0, y: 24, scale: 0.97 },
  visible: { opacity: 1, y: 0, scale: 1,
             transition: { duration: 0.45, ease: 'easeOut' } },
};

const hubVariants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    boxShadow: [
      '0 0 0px 0px rgba(43,125,191,0)',
      '0 0 36px 10px rgba(43,125,191,0.35)',
      '0 0 0px 0px rgba(43,125,191,0)',
    ],
    transition: {
      opacity:   { duration: 0.6, ease: 'easeOut' },
      scale:     { duration: 0.6, ease: 'easeOut' },
      boxShadow: { duration: 2.5, ease: 'easeInOut', repeat: Infinity, delay: 0.9 },
    },
  },
};

const svc = (id) => services.find((s) => s.id === id);

/*
  Desktop grid layout (3 cols × 3 rows):
  Row 1: [Hematology]      [Coagulation]     [Immunochemistry]
  Row 2: [DNA Testing]     [★ CENTER HUB ★]  [Drug Testing]
  Row 3: [Phlebotomy]      [Molecular]       [Chemistry]

  ConnectorLines (viewBox 0 0 100 100, preserveAspectRatio none):
  Col centers: C1=16.67  C2=50  C3=83.33
  Row centers: R1=16.67  R2=50  R3=83.33
  Hub edges (with gap): top≈35, bottom≈65, left≈35, right≈65
  Card face edges: row-1 bottom≈22, row-3 top≈78, col-1 right≈22, col-3 left≈78
  Only edge-adjacent cards (top/bottom/left/right of center) get connector lines.
*/
function ConnectorLines() {
  const lineProps = {
    stroke: '#94A3B8',
    strokeWidth: '1.5',
    strokeDasharray: '5 4',
    vectorEffect: 'non-scaling-stroke',
  };
  return (
    <svg
      aria-hidden="true"
      className="absolute inset-0 w-full h-full pointer-events-none"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
    >
      {/* Top: Coagulation (col 2, row 1) → hub top */}
      <line x1="50" y1="22" x2="50" y2="35" {...lineProps} />
      {/* Bottom: Molecular (col 2, row 3) → hub bottom */}
      <line x1="50" y1="78" x2="50" y2="65" {...lineProps} />
      {/* Left: DNA Testing (col 1, row 2) → hub left */}
      <line x1="22" y1="50" x2="35" y2="50" {...lineProps} />
      {/* Right: Drug Testing (col 3, row 2) → hub right */}
      <line x1="78" y1="50" x2="65" y2="50" {...lineProps} />
    </svg>
  );
}

export default function ServicesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="services" className="relative py-20 bg-slate-50 border-t border-gray-100 overflow-hidden" ref={ref}>

      {/* ── Decorative SVG background ── */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        {/* Dot grid */}
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="svc-dot-grid" x="0" y="0" width="28" height="28" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1.2" fill="#2B7DBF" fillOpacity="0.10"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#svc-dot-grid)"/>
        </svg>
        {/* Faint arcs — top left */}
        <svg className="absolute -top-16 -left-16 w-80 h-80 opacity-[0.07]" viewBox="0 0 320 320" fill="none">
          <circle cx="0" cy="0" r="220" stroke="#2B7DBF" strokeWidth="1.5" strokeDasharray="8 5"/>
          <circle cx="0" cy="0" r="160" stroke="#6BB6E8" strokeWidth="1"/>
        </svg>
        {/* Faint arcs — bottom right */}
        <svg className="absolute -bottom-16 -right-16 w-80 h-80 opacity-[0.07]" viewBox="0 0 320 320" fill="none">
          <circle cx="320" cy="320" r="200" stroke="#2B7DBF" strokeWidth="1.5" strokeDasharray="6 4"/>
          <circle cx="320" cy="320" r="130" stroke="#6BB6E8" strokeWidth="1"/>
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Desktop layout (lg+): 3×3 grid ── */}
        <div className="hidden lg:block relative">
          <ConnectorLines />

          <div className="grid grid-cols-3 gap-6 items-stretch">

            {/* Row 1 — top */}
            <motion.div variants={cardVariants} initial="hidden" animate={isInView ? 'visible' : 'hidden'} transition={{ delay: 0.05 }}>
              <ServiceCard {...svc('hematology')} />
            </motion.div>

            <motion.div variants={cardVariants} initial="hidden" animate={isInView ? 'visible' : 'hidden'} transition={{ delay: 0.10 }}>
              <ServiceCard {...svc('coagulation')} />
            </motion.div>

            <motion.div variants={cardVariants} initial="hidden" animate={isInView ? 'visible' : 'hidden'} transition={{ delay: 0.15 }}>
              <ServiceCard {...svc('immunochemistry')} />
            </motion.div>

            {/* Row 2 — middle */}
            <motion.div variants={cardVariants} initial="hidden" animate={isInView ? 'visible' : 'hidden'} transition={{ delay: 0.20 }}>
              <ServiceCard {...svc('dna-testing')} />
            </motion.div>

            {/* Center hub */}
            <motion.div
              variants={hubVariants}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              className="flex flex-col items-center justify-center text-center
                         px-8 py-10 rounded-3xl
                         bg-gradient-to-br from-[#6BB6E8] to-[#2B7DBF]"
            >
              <p className="text-xs font-semibold uppercase tracking-widest text-white/80 mb-3">
                What We Do
              </p>
              <h2 className="text-2xl xl:text-3xl font-bold text-white mb-4 leading-tight">
                Services We Provide
              </h2>
              <p className="text-white/80 text-sm leading-relaxed max-w-[18ch]">
                Cutting-edge diagnostics tailored to your needs — precise results,
                proactive healthcare decisions.
              </p>
            </motion.div>

            <motion.div variants={cardVariants} initial="hidden" animate={isInView ? 'visible' : 'hidden'} transition={{ delay: 0.25 }}>
              <ServiceCard {...svc('drug-testing')} />
            </motion.div>

            {/* Row 3 — bottom */}
            <motion.div variants={cardVariants} initial="hidden" animate={isInView ? 'visible' : 'hidden'} transition={{ delay: 0.30 }}>
              <ServiceCard {...svc('phlebotomy')} />
            </motion.div>

            <motion.div variants={cardVariants} initial="hidden" animate={isInView ? 'visible' : 'hidden'} transition={{ delay: 0.35 }}>
              <ServiceCard {...svc('molecular')} />
            </motion.div>

            <motion.div variants={cardVariants} initial="hidden" animate={isInView ? 'visible' : 'hidden'} transition={{ delay: 0.40 }}>
              <ServiceCard {...svc('chemistry')} />
            </motion.div>

          </div>
        </div>

        {/* ── Mobile / tablet layout (< lg) ── */}
        <div className="lg:hidden">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="text-center mb-12"
          >
            <p className="text-xs font-semibold uppercase tracking-widest text-sunshine-blue mb-3">
              What We Do
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-sunshine-dark mb-4">
              Services We Provide
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto text-base leading-relaxed">
              A comprehensive suite of cutting-edge diagnostics tailored to your needs — precise results,
              proactive healthcare decisions.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {services.map((service, i) => (
              <motion.div
                key={service.id}
                variants={cardVariants}
                initial="hidden"
                animate={isInView ? 'visible' : 'hidden'}
                transition={{ delay: i * 0.08 }}
              >
                <ServiceCard
                  title={service.title}
                  Icon={service.Icon}
                  href={service.href}
                  highlight={service.highlight}
                />
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
