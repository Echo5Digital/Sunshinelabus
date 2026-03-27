'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { MapPin, Clock, Phone, Mail } from 'lucide-react';

export default function ContactMap() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      className="relative py-16 pb-28 bg-[#EBF5FB] overflow-hidden"
      ref={ref}
    >
      {/* Section header */}
      <motion.div
        className="text-center mb-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <span className="text-sunshine-blue text-xs font-bold uppercase tracking-widest mb-3 block">
          Our Location
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-sunshine-dark mb-3">
          Find Our Location
        </h2>
        <div className="w-16 h-1 bg-sunshine-blue mx-auto rounded-full" />
      </motion.div>

      {/* Two-column layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-stretch">

          {/* Map — 3/5 width, slides in from left */}
          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, x: -60 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.1 }}
          >
            <div className="rounded-2xl overflow-hidden shadow-md border border-sunshine-sky/20 h-80 lg:h-full min-h-[420px]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3463.6558376295085!2d-95.3698!3d29.7604!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjnCsDQ1JzM3LjQiTiA5NcKwMjInMTEuMyJX!5e0!3m2!1sen!2sus!4v1600000000000!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Sunshine Clinical Laboratory Location"
              />
            </div>
          </motion.div>

          {/* Info panel — 2/5 width, slides in from right */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, x: 60 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.2 }}
          >
            <div className="bg-white rounded-2xl shadow-sm border border-sunshine-sky/20 p-8 flex flex-col gap-7 h-full">

              {/* Address */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-sunshine-soft flex items-center justify-center flex-shrink-0 mt-0.5">
                  <MapPin className="w-5 h-5 text-sunshine-blue" aria-hidden="true" />
                </div>
                <div>
                  <p className="font-bold text-sunshine-dark mb-1">Address</p>
                  <p className="text-gray-600 text-sm">Sunshine Clinical Laboratory</p>
                  <p className="text-gray-600 text-sm">3600 Galileo Dr, Suite 104</p>
                  <p className="text-gray-600 text-sm mb-2">New Port Richey, FL 34655</p>
                  <a
                    href="https://maps.google.com/?q=3600+Galileo+Dr+Suite+104+New+Port+Richey+FL+34655"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-sunshine-blue hover:underline font-medium"
                  >
                    Get Directions &rarr;
                  </a>
                </div>
              </div>

              <div className="border-t border-gray-100" />

              {/* Hours */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-sunshine-soft flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Clock className="w-5 h-5 text-sunshine-blue" aria-hidden="true" />
                </div>
                <div className="flex-1">
                  <p className="font-bold text-sunshine-dark mb-2">Hours</p>
                  <div className="space-y-1.5 text-sm">
                    <div className="flex justify-between gap-4">
                      <span className="text-gray-500">Monday – Friday</span>
                      <span className="font-medium text-sunshine-dark whitespace-nowrap">8:00 AM – 5:00 PM</span>
                    </div>
                    <div className="flex justify-between gap-4">
                      <span className="text-gray-500">Saturday – Sunday</span>
                      <span className="font-medium text-gray-400">Closed</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-100" />

              {/* Phone */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-sunshine-soft flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Phone className="w-5 h-5 text-sunshine-blue" aria-hidden="true" />
                </div>
                <div>
                  <p className="font-bold text-sunshine-dark mb-1">Phone</p>
                  <a href="tel:7272335223" className="text-sunshine-blue text-sm font-medium hover:underline">
                    (727) 233-5223
                  </a>
                </div>
              </div>

              <div className="border-t border-gray-100" />

              {/* Email */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-sunshine-soft flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Mail className="w-5 h-5 text-sunshine-blue" aria-hidden="true" />
                </div>
                <div>
                  <p className="font-bold text-sunshine-dark mb-1">Email</p>
                  <a
                    href="mailto:info@sunshinelabus.com"
                    className="text-sunshine-blue text-sm font-medium hover:underline break-all"
                  >
                    info@sunshinelabus.com
                  </a>
                </div>
              </div>

            </div>
          </motion.div>

        </div>
      </div>

      {/* Bottom wave: transition to sunshine-dark for CTA */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none" aria-hidden="true">
        <svg viewBox="0 0 1440 72" preserveAspectRatio="none" className="w-full h-16 sm:h-20" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,36 C240,72 480,0 720,36 C960,72 1200,0 1440,36 L1440,72 L0,72 Z" fill="#1E2A38" />
        </svg>
      </div>
    </section>
  );
}
