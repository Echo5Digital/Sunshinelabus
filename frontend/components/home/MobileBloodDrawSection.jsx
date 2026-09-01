'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { MapPin, ArrowRight } from 'lucide-react';
import { ShimmerButton } from '@/registry/magicui/shimmer-button';

const serviceAreas = [
  {
    title: 'Pasco County',
    desc: "Mobile blood draw service is available throughout communities including New Port Richey, Land O' Lakes, Wesley Chapel, Holiday, Hudson, Port Richey, Odessa, Elfers and Zephyrhills.",
  },
  {
    title: 'Tampa & Hillsborough County',
    desc: 'Mobile blood draw service is available by appointment in select areas. Sunshine Clinical Labs does not currently operate a walk-in laboratory in Tampa.',
  },
  {
    title: 'Pinellas County',
    desc: 'Mobile service is available in select communities including Tarpon Springs, Palm Harbor and East Lake.',
  },
];

export default function MobileBloodDrawSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      className="py-20 bg-white overflow-hidden"
      aria-labelledby="mobile-draw-heading"
      ref={ref}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-stretch">

          {/* Left: image with overlay badge */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.65, ease: 'easeOut' }}
            className="relative h-full"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl h-full min-h-[380px] lg:min-h-[520px]">
              <Image
                src="/woman-work.jpg"
                alt="Mobile blood draw service van Pasco County Florida"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            {/* Overlay badge */}
            <div className="absolute bottom-5 left-5 bg-sunshine-blue text-white px-5 py-3 rounded-2xl shadow-xl">
              <p className="font-bold text-base leading-none">We Come to You</p>
              <p className="text-white/75 text-sm mt-0.5">Home · Office · Care Facility</p>
            </div>
          </motion.div>

          {/* Right: text */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.65, ease: 'easeOut', delay: 0.1 }}
          >
            <span className="text-sunshine-blue text-xs font-bold uppercase tracking-widest mb-3 block">
              Mobile Blood Draw Service
            </span>
            <h2
              id="mobile-draw-heading"
              className="text-3xl sm:text-4xl font-extrabold text-sunshine-dark leading-tight mb-5"
            >
              Can&apos;t Make It to the Lab?{' '}
              <span className="text-sunshine-blue">We&apos;ll Come to You.</span>
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Sunshine Clinical Labs provides mobile blood draws for patients who prefer to have
              their testing completed at home, at work, or at a care facility.
            </p>

            <p className="text-gray-600 leading-relaxed mb-6">
              Mobile service can be especially helpful for seniors, homebound patients, people with
              limited mobility, patients recovering from surgery, busy professionals, and people who
              need recurring blood work.
            </p>

            <ul className="space-y-3 mb-8" aria-label="Mobile blood draw service areas">
              {serviceAreas.map((area) => (
                <li
                  key={area.title}
                  className="bg-sunshine-soft/40 border border-sunshine-blue/15 rounded-xl px-4 py-3 shadow-sm"
                >
                  <p className="flex items-center gap-2 text-sunshine-dark text-sm font-bold mb-1">
                    <MapPin className="w-4 h-4 text-sunshine-blue flex-shrink-0" aria-hidden="true" />
                    {area.title}
                  </p>
                  <p className="text-gray-600 text-sm leading-relaxed">{area.desc}</p>
                </li>
              ))}
            </ul>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/mobile-blood-draw-new-port-richey" aria-label="Schedule a mobile blood draw" className="w-full sm:w-auto">
                <ShimmerButton className="w-full sm:w-auto bg-sunshine-blue text-white px-7 py-4 rounded-full font-semibold shadow-lg gap-2">
                  Schedule a Mobile Blood Draw
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </ShimmerButton>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
