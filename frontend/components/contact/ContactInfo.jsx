'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Phone, Mail, MapPin } from 'lucide-react';
import MagicCard from '@/components/ui/MagicCard';

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15, delayChildren: 0.05 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const INFO_CARDS = [
  {
    Icon: Phone,
    title: 'Call Us',
    primary: '(727) 233-5223',
    secondary: 'Mon–Fri 8:00 AM – 5:00 PM · Walk-Ins Welcome',
    href: 'tel:7272335223',
  },
  {
    Icon: Mail,
    title: 'Email Us',
    primary: 'info@sunshinelabus.com',
    secondary: 'We respond within 24 hours',
    href: 'mailto:info@sunshinelabus.com',
  },
  {
    Icon: MapPin,
    title: 'Visit Us',
    primary: '3600 Galileo Dr, Suite 104',
    secondary: 'New Port Richey, FL 34655',
    href: 'https://maps.google.com/?q=3600+Galileo+Dr+Suite+104+New+Port+Richey+FL+34655',
  },
];

export default function ContactInfo() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section className="relative bg-[#EBF5FB] pt-16 pb-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          ref={ref}
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <span className="text-sunshine-blue text-xs font-bold uppercase tracking-widest mb-3 block">
            Get In Touch
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-sunshine-dark mb-3">
            How to Reach Us
          </h2>
          <div className="w-16 h-1 bg-sunshine-blue mx-auto rounded-full" />
        </motion.div>

        {/* Cards grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 sm:grid-cols-3 gap-6"
        >
          {INFO_CARDS.map(({ Icon, title, primary, secondary, href }) => (
            <motion.div key={title} variants={itemVariants} className="h-full">
              <MagicCard
                gradientColor="#CCE9F740"
                borderGlowColor="#2B7DBF"
                gradientSize={260}
                className="shadow-md hover:shadow-xl h-full"
              >
                <a
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="p-8 flex flex-col items-center text-center gap-4 h-full group"
                >
                  <div className="w-14 h-14 rounded-2xl bg-sunshine-blue flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-7 h-7 text-white" aria-hidden="true" />
                  </div>
                  <h3 className="text-lg font-bold text-sunshine-dark">{title}</h3>
                  <p className="text-sunshine-blue font-semibold text-base break-all">{primary}</p>
                  <p className="text-gray-500 text-sm leading-relaxed">{secondary}</p>
                </a>
              </MagicCard>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Bottom wave: transition to bg-white (ContactForm) */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none" aria-hidden="true">
        <svg viewBox="0 0 1440 72" preserveAspectRatio="none" className="w-full h-16 sm:h-20" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,36 C240,72 480,0 720,36 C960,72 1200,0 1440,36 L1440,72 L0,72 Z" fill="#ffffff" />
        </svg>
      </div>
    </section>
  );
}
