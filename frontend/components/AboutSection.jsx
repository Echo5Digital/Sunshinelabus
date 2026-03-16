'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, CheckCircle } from 'lucide-react';

const highlights = [
  'State-of-the-art diagnostic equipment',
  'Experienced certified laboratory team',
  'Fast and accurate result turnaround',
  'Serving Houston and surrounding areas',
];

export default function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section ref={ref} id="about" className="py-20 bg-sunshine-light overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left: Text */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            {/* Badge */}
            <span className="inline-flex items-center gap-2 bg-sunshine-yellow/20 text-sunshine-dark text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4 border border-sunshine-yellow/40">
              <span className="w-1.5 h-1.5 bg-sunshine-yellow rounded-full" />
              About Us
            </span>

            <h2 className="text-3xl sm:text-4xl font-bold text-sunshine-dark leading-tight mb-4">
              Your Trusted Partner in{' '}
              <span className="text-sunshine-blue">Clinical Diagnostics</span>
            </h2>

            <p className="text-sunshine-dark/70 text-lg leading-relaxed mb-6">
              Sunshine Clinical Laboratory is committed to delivering accurate and timely
              diagnostic services to healthcare providers and patients. Our state-of-the-art
              facility and experienced team ensure every test meets the highest standards of
              precision and reliability.
            </p>

            {/* Highlights */}
            <ul className="space-y-3 mb-8">
              {highlights.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sunshine-dark/80 text-sm">
                  <CheckCircle className="w-5 h-5 text-sunshine-blue flex-shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>

            <Link
              href="/about"
              className="inline-flex items-center gap-2 bg-sunshine-blue text-white px-6 py-3 rounded-full font-semibold hover:brightness-110 transition-all duration-200 shadow-md"
            >
              Learn More
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>

          {/* Right: Image */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.15 }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=700&q=80&auto=format&fit=crop"
                alt="Clinical laboratory equipment and test tubes"
                className="w-full h-[420px] object-cover"
              />
              {/* Warm overlay */}
              <div className="absolute inset-0 bg-gradient-to-tr from-sunshine-blue/20 to-sunshine-yellow/10" />
            </div>

            {/* Decorative blocks */}
            <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-sunshine-sky/20 rounded-3xl -z-10" />
            <div className="absolute -top-6 -left-6 w-32 h-32 bg-sunshine-yellow/15 rounded-3xl -z-10" />

            {/* Experience badge */}
            <div className="absolute bottom-6 left-6 bg-white rounded-2xl shadow-lg px-4 py-3 flex items-center gap-3 border border-sunshine-sky/20">
              <div className="w-10 h-10 bg-sunshine-yellow rounded-full flex items-center justify-center font-bold text-sunshine-dark text-sm leading-none">
                15+
              </div>
              <div>
                <p className="text-sunshine-dark font-semibold text-sm">Years of Excellence</p>
                <p className="text-gray-500 text-xs">Serving Houston, TX</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
