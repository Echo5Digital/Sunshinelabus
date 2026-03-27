'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { CheckCircle, ArrowRight, Phone } from 'lucide-react';
import { ShimmerButton } from '@/registry/magicui/shimmer-button';

const checklistItems = [
  'In-home blood draws for elderly or homebound patients',
  'Office visits for busy professionals',
  'Assisted living & care facility draws throughout Pasco County',
  'Same-day scheduling available — call to confirm',
  'Same licensed phlebotomist team, same lab standards',
];

export default function MobileBloodDrawSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      className="py-20 bg-sunshine-soft overflow-hidden"
      aria-labelledby="mobile-draw-heading"
      ref={ref}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Left: image with overlay badge */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.65, ease: 'easeOut' }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/3]">
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
            <p className="text-gray-600 leading-relaxed mb-6">
              Our certified phlebotomists bring the lab to your door. Whether you are homebound,
              recovering from surgery, or simply too busy to travel, we make professional blood
              draws convenient and stress-free.
            </p>

            <ul className="space-y-2 mb-8" aria-label="Mobile blood draw benefits">
              {checklistItems.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-3 bg-white rounded-xl px-4 py-3 shadow-sm text-sunshine-dark text-sm font-medium"
                >
                  <CheckCircle className="w-5 h-5 text-sunshine-blue flex-shrink-0" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/mobile-blood-draw-new-port-richey" aria-label="Learn more about mobile blood draws" className="w-full sm:w-auto">
                <ShimmerButton className="w-full sm:w-auto bg-sunshine-blue text-white px-7 py-4 rounded-full font-semibold shadow-lg gap-2">
                  Request a Mobile Blood Draw
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </ShimmerButton>
              </Link>
              <a href="tel:7272335223" aria-label="Call to schedule a mobile blood draw" className="w-full sm:w-auto">
                <ShimmerButton className="w-full sm:w-auto border-2 border-sunshine-blue text-sunshine-blue bg-white px-7 py-4 rounded-full font-semibold gap-2">
                  <Phone className="w-4 h-4" aria-hidden="true" />
                  (727) 233-5223
                </ShimmerButton>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
