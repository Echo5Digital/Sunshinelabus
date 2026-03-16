'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { CalendarDays } from 'lucide-react';
import AppointmentForm from './AppointmentForm';

export default function BookAppointmentSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="appointment" className="py-20 bg-white">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          {/* Section heading */}
          <div className="text-center mb-10">
            <span className="inline-flex items-center gap-2 bg-sunshine-yellow/20 text-sunshine-dark text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4 border border-sunshine-yellow/40">
              <CalendarDays className="w-3.5 h-3.5" />
              Schedule a Visit
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-sunshine-dark mb-3">
              Book an Appointment
            </h2>
            <p className="text-gray-500 text-lg">
              Schedule your laboratory visit at your convenience. We&apos;ll confirm within 24 hours.
            </p>
          </div>

          {/* Form card */}
          <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
            <AppointmentForm />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
