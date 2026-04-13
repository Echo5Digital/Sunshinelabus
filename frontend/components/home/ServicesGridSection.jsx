'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import {
  Droplets, Activity, Heart, FlaskConical, Shield, TestTube,
  Microscope, Dna, UserCheck, Truck,
} from 'lucide-react';
import { ShimmerButton } from '@/registry/magicui/shimmer-button';
import ServiceCard from '@/components/ServiceCard';

const TABS = [
  { id: 'routine',     label: 'Routine & Clinical' },
  { id: 'hormone',     label: "Hormone & Men's Health" },
  { id: 'dna',         label: 'DNA Testing' },
  { id: 'specialty',   label: 'Specialty & Lifestyle' },
  { id: 'convenience', label: 'Convenience Services' },
];

const SERVICES = {
  routine: [
    { title: 'Complete Blood Count (CBC)',      Icon: Droplets,    href: '/clinical-lab-services-trinity-fl' },
    { title: 'Comprehensive Metabolic Panel',   Icon: Activity,    href: '/clinical-lab-services-trinity-fl' },
    { title: 'Lipid Panels',                    Icon: Heart,       href: '/clinical-lab-services-trinity-fl' },
    { title: 'A1C / Glucose Testing',           Icon: TestTube,    href: '/clinical-lab-services-trinity-fl' },
    { title: 'Thyroid Panels (TSH, T3, T4)',    Icon: Shield,      href: '/clinical-lab-services-trinity-fl' },
    { title: 'Liver Function Panels',           Icon: FlaskConical, href: '/clinical-lab-services-trinity-fl' },
    { title: 'Kidney Function Panels',          Icon: Microscope,  href: '/clinical-lab-services-trinity-fl' },
  ],
  hormone: [
    { title: 'Testosterone (Total & Free)',     Icon: Activity,    href: '/trt-blood-test-new-port-richey', highlight: true },
    { title: 'TRT Monitoring Blood Tests',      Icon: Shield,      href: '/trt-blood-test-new-port-richey', highlight: true },
    { title: 'Estradiol (E2) Testing',          Icon: FlaskConical, href: '/trt-blood-test-new-port-richey' },
    { title: 'Hematocrit Testing',              Icon: Droplets,    href: '/trt-blood-test-new-port-richey' },
    { title: 'SHBG Testing',                    Icon: Activity,    href: '/trt-blood-test-new-port-richey' },
    { title: 'LH / FSH Testing',               Icon: Microscope,  href: '/trt-blood-test-new-port-richey' },
    { title: 'PSA Testing',                     Icon: Shield,      href: '/trt-blood-test-new-port-richey' },
  ],
  dna: [
    { title: 'Legal DNA Testing',               Icon: Shield,      href: '/dna-testing-new-port-richey', highlight: true },
    { title: 'Immigration DNA Testing (USCIS)', Icon: Dna,         href: '/dna-testing-new-port-richey', highlight: true },
    { title: 'Paternity Testing (Legal & Informational)', Icon: Dna, href: '/dna-testing-new-port-richey' },
    { title: 'Relationship DNA Testing',        Icon: Dna,         href: '/dna-testing-new-port-richey' },
  ],
  specialty: [
    { title: 'Peekaboo Early Gender Reveal Blood Test', Icon: Heart, href: '/gender-reveal-testing-florida', highlight: true },
    { title: 'PSA Screening',                   Icon: Shield,      href: '/clinical-lab-services-trinity-fl' },
    { title: 'Specialty Blood Panels',          Icon: FlaskConical, href: '/clinical-lab-services-trinity-fl' },
    { title: 'Custom Physician-Ordered Panels', Icon: Microscope,  href: '/clinical-lab-services-trinity-fl' },
  ],
  convenience: [
    { title: 'Mobile Blood Draw / Home Phlebotomy', Icon: Truck,   href: '/mobile-blood-draw-pasco-county', highlight: true },
    { title: 'Walk-In Lab Testing (No Appointment)', Icon: UserCheck, href: '/clinical-lab-services-trinity-fl' },
    { title: 'Insurance-Accepted Testing',      Icon: Shield,      href: '/insurance-accepted' },
  ],
};

export default function ServicesGridSection() {
  const [activeTab, setActiveTab] = useState('routine');
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

        {/* Tab buttons — horizontal scroll on mobile */}
        <motion.div
          className="flex gap-2 overflow-x-auto pb-3 justify-start lg:justify-center mb-10 scrollbar-hide"
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.45, delay: 0.15 }}
          role="tablist"
          aria-label="Service categories"
        >
          {TABS.map((tab) => (
            <button
              key={tab.id}
              role="tab"
              aria-selected={activeTab === tab.id}
              aria-controls={`tab-panel-${tab.id}`}
              onClick={() => setActiveTab(tab.id)}
              className={`whitespace-nowrap px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 border flex-shrink-0 ${
                activeTab === tab.id
                  ? 'bg-sunshine-blue text-white border-sunshine-blue shadow-lg'
                  : 'bg-white text-sunshine-dark border-gray-200 hover:border-sunshine-blue/50 hover:text-sunshine-blue'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </motion.div>

        {/* Services grid with animated tab swap */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            id={`tab-panel-${activeTab}`}
            role="tabpanel"
            aria-label={TABS.find((t) => t.id === activeTab)?.label}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -18 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {SERVICES[activeTab].map((service) => (
              <ServiceCard
                key={service.title}
                title={service.title}
                Icon={service.Icon}
                href={service.href}
                highlight={service.highlight || false}
              />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* CTA */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Link href="/all-services" aria-label="See all our lab services">
            <ShimmerButton className="bg-sunshine-blue text-white px-8 py-3.5 rounded-full font-semibold shadow-lg gap-2">
              See All Services →
            </ShimmerButton>
          </Link>
          <p className="mt-3 text-sm text-gray-500">
            Or call <a href="tel:7272335223" className="text-sunshine-blue font-semibold">(727) 233-5223</a>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
