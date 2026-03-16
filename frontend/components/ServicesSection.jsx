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
  {
    id: 'hematology',
    title: 'Hematology',
    Icon: Droplets,
    href: '/services/hematology',
  },
  {
    id: 'chemistry',
    title: 'Chemistry',
    Icon: FlaskConical,
    href: '/services/chemistry',
  },
  {
    id: 'immunochemistry',
    title: 'Immunochemistry',
    Icon: Shield,
    href: '/services/immunochemistry',
  },
  {
    id: 'coagulation',
    title: 'Coagulation Service',
    Icon: Activity,
    href: '/services/coagulation',
  },
  {
    id: 'drug-testing',
    title: 'Drug Testing',
    Icon: TestTube,
    href: '/services/drug-testing',
  },
  {
    id: 'molecular',
    title: 'Molecular Testing',
    Icon: Dna,
    href: '/services/molecular',
  },
  {
    id: 'phlebotomy',
    title: 'Phlebotomy Service',
    Icon: Syringe,
    href: '/services/phlebotomy',
  },
  {
    id: 'dna-testing',
    title: 'DNA Testing',
    Icon: Microscope,
    href: '/services/dna-testing',
    highlight: true,
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

const headerVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: 'easeOut' } },
};

const svc = (id) => services.find((s) => s.id === id);

/*
  Desktop grid layout (4 cols × 4 rows):
  Row 1: [empty]      [Coagulation]  [Molecular]    [empty]
  Row 2: [DNA Testing] [── CENTER ──────────────]  [Drug Testing]
  Row 3: [Phlebotomy]  [── TEXT  ───────────────]  [Hematology]
  Row 4: [empty]      [Immunochem]   [Chemistry]    [empty]

  SVG connector line coordinates (viewBox 0 0 100 100, preserveAspectRatio none):
  Card heights ≈ 172px, gap = 24px, 4 rows → total ≈ 760px
  Row centers:  R1=11.3%, R2=37.1%, R3=62.9%, R4=88.7%
  Col centers:  C1=12.5%, C2=37.5%, C3=62.5%, C4=87.5%
  Center block: top=25.8%, bottom=74.2%, left=25%, right=75%
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
      {/* Top: Coagulation → center */}
      <line x1="37.5" y1="13" x2="37.5" y2="26" {...lineProps} />
      {/* Top: Molecular → center */}
      <line x1="62.5" y1="13" x2="62.5" y2="26" {...lineProps} />
      {/* Left: DNA Testing → center */}
      <line x1="14" y1="37" x2="25" y2="37" {...lineProps} />
      {/* Left: Phlebotomy → center */}
      <line x1="14" y1="63" x2="25" y2="63" {...lineProps} />
      {/* Right: Drug Testing → center */}
      <line x1="86" y1="37" x2="75" y2="37" {...lineProps} />
      {/* Right: Hematology → center */}
      <line x1="86" y1="63" x2="75" y2="63" {...lineProps} />
      {/* Bottom: Immunochemistry → center */}
      <line x1="37.5" y1="87" x2="37.5" y2="74" {...lineProps} />
      {/* Bottom: Chemistry → center */}
      <line x1="62.5" y1="87" x2="62.5" y2="74" {...lineProps} />
    </svg>
  );
}

export default function ServicesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="services" className="py-20 bg-sunshine-light" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Desktop layout (lg+) ── */}
        <div className="hidden lg:block relative">
          <ConnectorLines />
          <div className="grid grid-cols-4 gap-6">

            {/* Row 1: top-center cards */}
            <div className="col-start-2">
              <motion.div variants={cardVariants} initial="hidden" animate={isInView ? 'visible' : 'hidden'} transition={{ delay: 0.10 }}>
                <ServiceCard {...svc('coagulation')} />
              </motion.div>
            </div>
            <div className="col-start-3">
              <motion.div variants={cardVariants} initial="hidden" animate={isInView ? 'visible' : 'hidden'} transition={{ delay: 0.20 }}>
                <ServiceCard {...svc('molecular')} />
              </motion.div>
            </div>

            {/* Row 2: DNA | center text | Drug Testing */}
            <div className="col-start-1 row-start-2">
              <motion.div variants={cardVariants} initial="hidden" animate={isInView ? 'visible' : 'hidden'} transition={{ delay: 0.15 }}>
                <ServiceCard {...svc('dna-testing')} />
              </motion.div>
            </div>

            {/* Center hub — spans cols 2–3, rows 2–3 */}
            <motion.div
              className="col-start-2 col-span-2 row-start-2 row-span-2 flex flex-col items-center justify-center text-center px-8 rounded-3xl bg-white/50 border border-dashed border-slate-300"
              variants={headerVariants}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
            >
              <p className="text-xs font-semibold uppercase tracking-widest text-sunshine-blue mb-3">
                What We Do
              </p>
              <h2 className="text-3xl xl:text-4xl font-bold text-sunshine-dark mb-4">
                Services We Provide
              </h2>
              <p className="text-gray-500 text-base leading-relaxed max-w-xs">
                A comprehensive suite of cutting-edge diagnostics tailored to your needs — precise results,
                proactive healthcare decisions.
              </p>
            </motion.div>

            <div className="col-start-4 row-start-2">
              <motion.div variants={cardVariants} initial="hidden" animate={isInView ? 'visible' : 'hidden'} transition={{ delay: 0.25 }}>
                <ServiceCard {...svc('drug-testing')} />
              </motion.div>
            </div>

            {/* Row 3: Phlebotomy | center text continues | Hematology */}
            <div className="col-start-1 row-start-3">
              <motion.div variants={cardVariants} initial="hidden" animate={isInView ? 'visible' : 'hidden'} transition={{ delay: 0.30 }}>
                <ServiceCard {...svc('phlebotomy')} />
              </motion.div>
            </div>
            <div className="col-start-4 row-start-3">
              <motion.div variants={cardVariants} initial="hidden" animate={isInView ? 'visible' : 'hidden'} transition={{ delay: 0.35 }}>
                <ServiceCard {...svc('hematology')} />
              </motion.div>
            </div>

            {/* Row 4: bottom-center cards */}
            <div className="col-start-2 row-start-4">
              <motion.div variants={cardVariants} initial="hidden" animate={isInView ? 'visible' : 'hidden'} transition={{ delay: 0.40 }}>
                <ServiceCard {...svc('immunochemistry')} />
              </motion.div>
            </div>
            <div className="col-start-3 row-start-4">
              <motion.div variants={cardVariants} initial="hidden" animate={isInView ? 'visible' : 'hidden'} transition={{ delay: 0.45 }}>
                <ServiceCard {...svc('chemistry')} />
              </motion.div>
            </div>
          </div>
        </div>

        {/* ── Mobile / tablet layout (< lg) ── */}
        <div className="lg:hidden">
          <motion.div
            variants={headerVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
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
