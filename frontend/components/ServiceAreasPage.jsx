'use client';

import Link from 'next/link';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { MapPin, Phone } from 'lucide-react';
import { ShimmerButton } from '@/registry/magicui/shimmer-button';

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

const pillContainerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};
const pillItemVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: 'easeOut' } },
};

/* ─── Section wrapper (scroll-triggered) ─────────────────────── */
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
  { label: 'The Villages', href: '/mobile-blood-draw-the-villages' },
  { label: 'Wesley Chapel', href: '/mobile-blood-draw-wesley-chapel' },
  { label: 'Zephyrhills', href: '/mobile-blood-draw-zephyrhills' },
];

export default function ServiceAreasPage() {
  return (
    <div className="bg-sunshine-soft min-h-screen">

      {/* ══ HERO ═════════════════════════════════════════════════ */}
      <section className="relative w-full h-[90vh] flex items-center overflow-hidden bg-gradient-to-br from-sunshine-dark via-[#1a3a5c] to-sunshine-blue">
        {/* Decorative rings */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
          <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full border border-white/5" />
          <div className="absolute bottom-20 -left-20 w-80 h-80 rounded-full border border-white/5" />
          <div className="absolute top-1/3 right-1/4 w-40 h-40 rounded-full bg-white/[0.03]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full border border-white/[0.03]" />
        </div>

        <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-28 pt-36 text-center">
          <motion.div
            variants={heroContainerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.p
              variants={heroItemVariants}
              className="text-white/75 text-sm font-semibold tracking-widest mb-6"
            >
              Sunshine Clinical Lab — Trinity, FL &amp; Pasco County
            </motion.p>

            <motion.h1
              variants={heroItemVariants}
              className="text-3xl sm:text-5xl font-extrabold text-white leading-tight mb-5"
            >
              Proudly Serving Trinity, Pasco County &amp; the Greater Tampa Bay Region
            </motion.h1>

            <motion.p
              variants={heroItemVariants}
              className="text-white/85 text-lg leading-relaxed max-w-2xl mx-auto"
            >
              Sunshine Clinical Lab is located in Trinity, FL, with easy access from communities
              across Pasco County, as well as select communities in Pinellas County and the Tampa
              Bay area. Whether you visit our office or use our mobile blood draw service,
              we&apos;re here for you.
            </motion.p>
          </motion.div>
        </div>

        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
          <svg viewBox="0 0 1440 72" preserveAspectRatio="none" className="w-full h-16 sm:h-20">
            <path d="M0,36 C240,72 480,0 720,36 C960,72 1200,0 1440,36 L1440,72 L0,72 Z" fill="#EBF5FB" />
          </svg>
        </div>
      </section>

      {/* ══ COMMUNITIES WE SERVE ════════════════════════════════ */}
      <section className="py-16 sm:py-20 bg-[#EBF5FB]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Section>
            <motion.div variants={itemVariants} className="flex justify-center mb-5" aria-hidden="true">
              <div className="w-14 h-14 rounded-2xl bg-sunshine-soft flex items-center justify-center shadow-md">
                <MapPin className="w-7 h-7 text-sunshine-blue" />
              </div>
            </motion.div>

            <motion.h2
              variants={itemVariants}
              className="text-lg font-bold text-sunshine-dark mb-6"
            >
              Communities We Serve
            </motion.h2>

            {/* Area link pills */}
            <motion.div
              className="flex flex-wrap justify-center gap-3 mb-10"
              variants={pillContainerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              aria-label="Service area locations"
            >
              {serviceAreas.map((area) => (
                <motion.div key={area.label} variants={pillItemVariants}>
                  <Link
                    href={area.href}
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-white rounded-full text-sunshine-blue font-semibold text-sm hover:bg-sunshine-blue hover:text-white transition-all duration-200 border border-sunshine-sky/30 shadow-sm hover:shadow-lg hover:border-sunshine-blue"
                    aria-label={`Lab services in ${area.label}`}
                  >
                    <MapPin className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
                    {area.label}
                  </Link>
                </motion.div>
              ))}
            </motion.div>

            {/* Convenient Access */}
            <motion.div
              variants={itemVariants}
              className="bg-white rounded-2xl p-6 max-w-2xl mx-auto mb-8 text-left shadow-sm"
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
            <motion.p variants={itemVariants} className="text-sm text-gray-600">
              Main Lab:{' '}
              <a
                href="https://maps.google.com/?q=3600+Galileo+Dr+Suite+104+Trinity+FL+34655"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sunshine-blue hover:underline font-medium"
                aria-label="Get directions to Sunshine Clinical Lab"
              >
                3600 Galileo Dr, Suite 104, Trinity, FL 34655
              </a>
            </motion.p>
          </Section>
        </div>
      </section>

      {/* ══ FINAL CTA ═══════════════════════════════════════════ */}
      <section className="py-20 relative overflow-hidden bg-gradient-to-r from-sunshine-blue to-sunshine-sky">
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
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
              Ready to Schedule Your Visit?
            </motion.h2>

            <motion.p
              variants={itemVariants}
              className="text-white/85 text-lg leading-relaxed mb-10 max-w-2xl mx-auto"
            >
              Whether you&apos;re in Trinity, across Pasco County, or anywhere in the greater
              Tampa Bay region, book an appointment at our Trinity, FL lab or ask about our
              mobile blood draw service.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-10 flex-wrap"
            >
              <Link href="/book-appointment" className="w-full sm:w-auto">
                <ShimmerButton className="w-full sm:w-auto justify-center bg-white text-sunshine-dark px-8 py-3.5 rounded-full font-bold shadow-xl text-base">
                  Book Appointment
                </ShimmerButton>
              </Link>
              <a href="tel:+17272335223" className="w-full sm:w-auto">
                <ShimmerButton className="w-full sm:w-auto justify-center bg-white/20 backdrop-blur-sm border-2 border-white text-white px-8 py-3.5 rounded-full font-semibold text-base gap-2">
                  <Phone className="w-5 h-5" />
                  (727) 233-5223
                </ShimmerButton>
              </a>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="flex items-center justify-center gap-2 text-white/75 text-sm font-medium"
            >
              <MapPin className="w-5 h-5 text-white/90 flex-shrink-0" />
              <span>3600 Galileo Dr, Suite 104, Trinity, FL 34655, USA</span>
            </motion.div>
          </Section>
        </div>
      </section>

    </div>
  );
}
