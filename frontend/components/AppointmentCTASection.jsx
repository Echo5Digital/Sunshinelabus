'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { CalendarDays, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const MotionLink = motion(Link);

export default function AppointmentCTASection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="appointment" className="py-20 bg-sunshine-light border-t border-gray-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
        >
          {/* Left — Image */}
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 2.8, ease: 'easeOut', delay: 0.1 }}
          >
            <Image
              src="/main-img.webp"
              alt="Sunshine Clinical Lab"
              width={600}
              height={700}
              quality={100}
              className="w-full h-auto"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </motion.div>

          {/* Right — Text content */}
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 2.8, ease: 'easeOut', delay: 0.2 }}
            className="flex flex-col gap-6 items-end text-right"
          >
            {/* Small label */}
            <span className="text-sm font-semibold tracking-widest text-sunshine-blue uppercase">
              Hello and Welcome to
            </span>

            {/* Main heading */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-sunshine-dark leading-tight">
              Sunshine Clinical Lab LLC
            </h2>

            {/* Paragraphs */}
            <div className="space-y-4">
              <p className="text-gray-600 text-base leading-relaxed">
                At Sunshine Clinical Lab LLC, we understand the importance of accurate testing in
                healthcare decisions. With a compassionate touch, we provide advanced laboratory
                services to empower individuals on their wellness journey.
                From routine screenings to specialized diagnostics, trust us to deliver precise
                results with care and efficiency.
              </p>
              <p className="text-gray-600 text-base leading-relaxed">
                Let Sunshine Clinical Lab LLC’s services and decisions guide you 
                toward a healthier, more tranquil life.
              </p>
            </div>

            {/* CTA Button */}
            <div className="pt-2">
              <MotionLink
                href="/book-appointment"
                whileHover={{
                  y: -2,
                  boxShadow: '0 8px 30px rgba(43,125,191,0.45)',
                }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
                className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-semibold text-white text-base"
                style={{
                  background: 'linear-gradient(135deg, #2B7DBF 0%, #5BB5F0 100%)',
                  boxShadow: '0 4px 15px rgba(43,125,191,0.30)',
                }}
              >
                <CalendarDays className="w-5 h-5 flex-shrink-0" />
                Set an Appointment
                <ArrowRight className="w-4 h-4 flex-shrink-0" />
              </MotionLink>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
