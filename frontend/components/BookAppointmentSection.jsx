'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { CalendarDays, ChevronRight, Phone, Truck, TestTube, Dna, FlaskConical } from 'lucide-react';
import { ShimmerButton } from '@/registry/magicui/shimmer-button';

const PREVIEW_SERVICES = [
  { icon: Truck, label: 'Mobile Blood Draw' },
  { icon: Dna, label: 'DNA Testing' },
  { icon: FlaskConical, label: 'TRT Testing' },
  { icon: TestTube, label: 'Hematology Panel' },
];

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
          <div className="text-center mb-8">
            <span className="inline-flex items-center gap-2 bg-sunshine-soft text-sunshine-dark text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4 border border-sunshine-sky/40">
              <CalendarDays className="w-3.5 h-3.5" />
              Schedule a Visit
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-sunshine-dark mb-3">
              Book an Appointment
            </h2>
            <p className="text-gray-500 text-lg">
              Our guided booking wizard takes just 2 minutes. Pick your service, date, and time.
            </p>
          </div>

          {/* CTA card */}
          <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 text-center">
            {/* Service pills */}
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {PREVIEW_SERVICES.map(({ icon: Icon, label }) => (
                <span
                  key={label}
                  className="inline-flex items-center gap-1.5 bg-sunshine-soft text-sunshine-dark text-xs font-medium px-3 py-1.5 rounded-full"
                >
                  <Icon className="w-3 h-3 text-sunshine-blue" />
                  {label}
                </span>
              ))}
              <span className="inline-flex items-center gap-1.5 bg-sunshine-soft text-gray-500 text-xs font-medium px-3 py-1.5 rounded-full">
                + more services
              </span>
            </div>

            <Link href="/book-appointment">
              <ShimmerButton className="bg-gradient-to-r from-sunshine-sky to-sunshine-blue text-white px-10 py-4 rounded-full font-bold text-base shadow-md hover:opacity-90 transition-opacity">
                Start Booking
                <ChevronRight className="w-4 h-4 ml-1" />
              </ShimmerButton>
            </Link>

            <div className="flex items-center justify-center gap-2 mt-5 text-sm text-gray-400">
              <Phone className="w-3.5 h-3.5" />
              <span>Or call us: <a href="tel:7272335223" className="text-sunshine-dark font-medium hover:text-sunshine-blue transition-colors">(727) 233-5223</a></span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
