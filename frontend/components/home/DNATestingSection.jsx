'use client';

import Link from 'next/link';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Dna, Shield, ArrowRight, Phone } from 'lucide-react';
import { ShimmerButton } from '@/registry/magicui/shimmer-button';
import MagicCard from '@/components/ui/MagicCard';

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.97 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.45, ease: 'easeOut' } },
};

const dnaServices = [
  {
    Icon: Shield,
    title: 'Legal DNA Testing',
    desc: 'Full chain-of-custody documentation for court proceedings, custody disputes, and immigration.',
    highlight: true,
  },
  {
    Icon: Dna,
    title: 'Immigration DNA Testing (USCIS)',
    desc: 'USCIS-compliant DNA testing with proper documentation for immigration proceedings.',
    highlight: true,
  },
  {
    Icon: Dna,
    title: 'Paternity Testing (Legal & Informational)',
    desc: 'Accurate, confidential paternity results. Both legal chain-of-custody and informational options available.',
    highlight: false,
  },
  {
    Icon: Dna,
    title: 'Relationship DNA Testing',
    desc: 'Determine biological relationships between family members with laboratory-grade accuracy.',
    highlight: false,
  },
];

export default function DNATestingSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      className="py-20 bg-sunshine-soft"
      aria-labelledby="dna-testing-heading"
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
              <Dna className="w-7 h-7 text-white" />
            </div>
          </div>
          <span className="text-sunshine-blue text-xs font-bold uppercase tracking-widest mb-3 block">
            DNA Testing Services
          </span>
          <h2
            id="dna-testing-heading"
            className="text-3xl sm:text-4xl font-extrabold text-sunshine-dark"
          >
            DNA Testing — Accurate, Confidential, Legally Admissible
          </h2>
          <p className="text-gray-500 mt-4 max-w-2xl mx-auto text-base">
            When accuracy and legal admissibility matter, Sunshine Clinical Lab provides
            professional DNA testing services in Trinity, FL, serving all of Pasco County. All
            tests are performed under strict chain-of-custody protocols when required.
          </p>
        </motion.div>

        {/* DNA service cards */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-12"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {dnaServices.map((service) => (
            <motion.div key={service.title} variants={cardVariants} className="h-full">
              <MagicCard
                gradientColor={service.highlight ? '#CCE9F755' : '#D9D9D940'}
                borderGlowColor={service.highlight ? '#2B7DBF' : '#6BB6E8'}
                className="shadow-md hover:shadow-xl h-full"
              >
                <div className="p-6 flex flex-col gap-4 h-full">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 ${
                    service.highlight ? 'bg-sunshine-blue text-white' : 'bg-sunshine-soft text-sunshine-blue'
                  }`}>
                    <service.Icon className="w-6 h-6" aria-hidden="true" />
                  </div>
                  <h3 className="text-base font-bold text-sunshine-dark">{service.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed flex-grow">{service.desc}</p>
                </div>
              </MagicCard>
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
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href="tel:7272335223" aria-label="Inquire about DNA testing" className="w-full sm:w-auto">
              <ShimmerButton className="w-full sm:w-auto bg-sunshine-blue text-white px-8 py-4 rounded-full font-semibold shadow-lg gap-2">
                <Phone className="w-4 h-4" aria-hidden="true" />
                Inquire About DNA Testing — (727) 233-5223
              </ShimmerButton>
            </a>
            <Link href="/dna-testing-new-port-richey" aria-label="Full DNA testing details and FAQs" className="w-full sm:w-auto">
              <ShimmerButton className="w-full sm:w-auto border border-sunshine-blue/30 text-sunshine-blue bg-white px-6 py-4 rounded-full font-semibold gap-2">
                Full DNA Testing Details &amp; FAQs
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </ShimmerButton>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
