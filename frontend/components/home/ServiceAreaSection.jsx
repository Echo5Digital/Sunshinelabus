'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { MapPin } from 'lucide-react';

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: 'easeOut' } },
};

const serviceAreas = [
  { label: 'Trinity', href: '/clinical-lab-trinity-fl' },
  { label: 'New Port Richey', href: '/clinical-lab-new-port-richey' },
  { label: "Land O' Lakes", href: '/clinical-lab-land-o-lakes-fl' },
  { label: 'Tarpon Springs', href: '/clinical-lab-tarpon-springs-fl' },
  { label: 'Holiday', href: '/clinical-lab-services-trinity-fl' },
  { label: 'Hudson', href: '/clinical-lab-services-trinity-fl' },
  { label: 'Port Richey', href: '/clinical-lab-services-trinity-fl' },
  { label: 'Odessa', href: '/clinical-lab-services-trinity-fl' },
  { label: 'Lutz', href: '/clinical-lab-services-trinity-fl' },
  { label: 'Palm Harbor', href: '/clinical-lab-services-trinity-fl' },
  { label: 'East Lake', href: '/clinical-lab-services-trinity-fl' },
  { label: 'Elfers', href: '/clinical-lab-services-trinity-fl' },
];

export default function ServiceAreaSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      className="py-16 relative overflow-hidden bg-[#EBF5FB]"
      aria-labelledby="service-area-heading"
      ref={ref}
    >
      <div className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden="true">
        <Image
          src="/service-bnr.png"
          alt=""
          fill
          className="object-cover opacity-30"
          priority={false}
        />
      </div>
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-[#EBF5FB]/85 via-sunshine-soft/30 to-white/80" aria-hidden="true" />
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <div className="flex justify-center mb-5" aria-hidden="true">
            <div className="w-14 h-14 rounded-2xl bg-sunshine-soft flex items-center justify-center shadow-md">
              <MapPin className="w-7 h-7 text-sunshine-blue" />
            </div>
          </div>

          <span className="text-sunshine-blue text-xs font-bold uppercase tracking-widest mb-3 block">
            Service Area
          </span>

          <h2
            id="service-area-heading"
            className="text-2xl sm:text-3xl font-extrabold text-sunshine-dark mb-3"
          >
            Proudly Serving Trinity, Pasco County &amp; the Greater Tampa Bay Region
          </h2>

          <p className="text-gray-700 mb-8 max-w-2xl mx-auto leading-relaxed">
            Sunshine Clinical Lab is located in Trinity, FL, with easy access from communities
            across Pasco County and the Tampa Bay area. Whether you visit our office or use our
            mobile blood draw service, we&apos;re here for you.
          </p>
        </motion.div>

        {/* H3: Communities We Serve */}
        <motion.h3
          className="text-lg font-bold text-sunshine-dark mb-5"
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          Communities We Serve
        </motion.h3>

        {/* Area link pills */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 mb-10"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          aria-label="Service area locations"
        >
          {serviceAreas.map((area) => (
            <motion.div key={area.label} variants={itemVariants}>
              <Link
                href={area.href}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-sunshine-soft rounded-full text-sunshine-blue font-semibold text-sm hover:bg-sunshine-blue hover:text-white transition-all duration-200 border border-sunshine-sky/30 shadow-sm hover:shadow-lg hover:border-sunshine-blue"
                aria-label={`Lab services in ${area.label}`}
              >
                <MapPin className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
                {area.label}
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* H3: Convenient Access */}
        <motion.div
          className="bg-sunshine-soft rounded-2xl p-6 max-w-2xl mx-auto mb-8 text-left"
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h3 className="text-lg font-bold text-sunshine-dark mb-2">
            Convenient Access From Major Roads
          </h3>
          <p className="text-gray-700 text-sm leading-relaxed">
            Our Galileo Drive location is easily accessible from US-19, the Suncoast Parkway,
            SR-54, and Little Road, with plenty of free parking on-site. Most patients from
            neighboring communities reach us in 10 to 20 minutes.
          </p>
        </motion.div>

        {/* Address reminder */}
        <motion.p
          className="text-sm text-gray-600"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          Main Lab:{' '}
          <a
            href="https://maps.google.com/?q=3600+Galileo+Dr+Trinity+FL+34655"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sunshine-blue hover:underline font-medium"
            aria-label="Get directions to Sunshine Clinical Lab"
          >
            3600 Galileo Dr, Trinity, FL 34655
          </a>
        </motion.p>
      </div>
    </section>
  );
}
