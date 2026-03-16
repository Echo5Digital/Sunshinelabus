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
    description:
      'Complete blood count, differential analysis, and specialized blood disorder testing with high precision.',
    Icon: Droplets,
    href: '#hematology',
  },
  {
    id: 'chemistry',
    title: 'Chemistry',
    description:
      'Comprehensive metabolic panels, liver function, kidney function, and electrolyte testing.',
    Icon: FlaskConical,
    href: '#chemistry',
  },
  {
    id: 'immunochemistry',
    title: 'Immunochemistry',
    description:
      'Hormone panels, tumor markers, allergy testing, and advanced immunoassay diagnostics.',
    Icon: Shield,
    href: '#immunochemistry',
  },
  {
    id: 'coagulation',
    title: 'Coagulation Service',
    description:
      'PT, PTT, INR, fibrinogen, and advanced coagulation factor analysis for bleeding disorders.',
    Icon: Activity,
    href: '#coagulation',
  },
  {
    id: 'drug-testing',
    title: 'Drug Testing',
    description:
      'Urine, hair follicle, and oral fluid drug screening panels for workplace and clinical needs.',
    Icon: TestTube,
    href: '#drug-testing',
  },
  {
    id: 'molecular',
    title: 'Molecular Testing',
    description:
      'PCR-based infectious disease detection and genetic mutation testing with rapid results.',
    Icon: Dna,
    href: '#molecular',
  },
  {
    id: 'phlebotomy',
    title: 'Phlebotomy Service',
    description:
      'Professional blood draw services available at our facility or via mobile phlebotomy visits.',
    Icon: Syringe,
    href: '#phlebotomy',
  },
  {
    id: 'dna-testing',
    title: 'DNA Testing',
    description:
      'Paternity, ancestry, and forensic DNA analysis services using state-of-the-art technology.',
    Icon: Microscope,
    href: '#dna-testing',
    highlight: true,
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

export default function ServicesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="services" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="text-center mb-14"
        >
          {/* Decorative lines + badge */}
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="flex-1 max-w-[60px] h-px bg-sunshine-yellow" />
            <span className="inline-block bg-sunshine-sky/20 text-sunshine-blue text-sm font-semibold px-4 py-1.5 rounded-full">
              Our Services
            </span>
            <span className="flex-1 max-w-[60px] h-px bg-sunshine-yellow" />
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold text-sunshine-dark mb-4">
            Comprehensive Laboratory Testing Services
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-lg">
            We offer a full spectrum of clinical laboratory services with industry-leading
            accuracy and rapid turnaround times.
          </p>
        </motion.div>

        {/* Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {services.map((service) => (
            <motion.div key={service.id} variants={cardVariants}>
              <ServiceCard
                title={service.title}
                description={service.description}
                Icon={service.Icon}
                href={service.href}
                highlight={service.highlight}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
