'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Phone } from 'lucide-react';
import { ShimmerButton } from '@/registry/magicui/shimmer-button';

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } },
};

export default function IntroSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section className="py-20 bg-[#EBF5FB] overflow-hidden" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-stretch">

          {/* Left: image */}
          <motion.div
            className="relative h-full"
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.65, ease: 'easeOut' }}
          >
            <div className="relative h-full min-h-[280px] sm:min-h-[380px] lg:min-h-[460px] rounded-3xl overflow-hidden shadow-2xl shadow-sunshine-blue/10">
              <video
                src="/main-img2.mp4"
                autoPlay
                muted
                loop
                playsInline
                className="absolute inset-0 w-full h-full object-cover"
                aria-label="Phlebotomist performing blood draw at Sunshine Clinical Lab"
              />
              {/* Gradient overlay for depth + brand tint */}
              <div className="absolute inset-0 bg-gradient-to-br from-sunshine-blue/20 via-transparent to-sunshine-dark/40 pointer-events-none" />
              {/* Subtle brand glow ring */}
              <div className="absolute inset-0 ring-inset ring-2 ring-sunshine-blue/20 rounded-3xl pointer-events-none" />
              {/* Live badge */}
              <div className="absolute bottom-4 left-4 flex items-center gap-2 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1.5 shadow-md pointer-events-none">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" aria-hidden="true" />
                <span className="text-xs font-semibold text-sunshine-dark tracking-wide">Live Lab · Trinity, FL</span>
              </div>
            </div>
          </motion.div>

          {/* Right: copy */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.65, ease: 'easeOut', delay: 0.1 }}
          >
            <motion.h2
              variants={itemVariants}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              className="text-3xl sm:text-4xl font-extrabold text-sunshine-dark leading-tight mb-5"
            >
              Skip the Chain Lab Waiting Room.{' '}
              <span className="text-sunshine-blue">Get Your Results Faster.</span>
            </motion.h2>

            <motion.p
              variants={itemVariants}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              transition={{ delay: 0.1 }}
              className="text-gray-600 leading-relaxed mb-4"
            >
              You shouldn&apos;t have to take a number, sit in a packed waiting room for 45
              minutes, and leave feeling like just another barcode. That&apos;s the chain lab
              experience — and it&apos;s exactly what Sunshine Clinical Lab was built to replace.
            </motion.p>

            <motion.p
              variants={itemVariants}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              transition={{ delay: 0.15 }}
              className="text-gray-600 leading-relaxed mb-4"
            >
              Located at <strong>3600 Galileo Dr, Suite 104, Trinity, FL 34655</strong>, Sunshine Clinical
              Lab is an independent, patient-centered clinical laboratory proudly serving Trinity,
              New Port Richey, and communities across Pasco County and the greater Tampa Bay area.
              Our phlebotomy team brings over 35 years of combined experience to every draw — and
              we deliver the kind of personal attention that large national labs simply aren&apos;t
              set up to provide.
            </motion.p>

            <motion.p
              variants={itemVariants}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              transition={{ delay: 0.2 }}
              className="text-gray-600 leading-relaxed mb-8"
            >
              Whether you need a routine CBC panel, a full testosterone monitoring workup for your
              TRT protocol, a legal DNA test, or a Peekaboo gender reveal blood test for your
              growing family — we handle it all under one roof, with faster turnaround, transparent
              pricing, and a team that actually knows your name. Walk-ins are always welcome. All
              ages are welcome. And if you can&apos;t come to us, we&apos;ll come to you — our
              mobile blood draw service reaches patients across Pasco County.
            </motion.p>

            <motion.div
              variants={itemVariants}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              transition={{ delay: 0.25 }}
            >
              <div className="flex items-center gap-3 flex-wrap">
                <a href="tel:+17272335223" aria-label="Call Sunshine Clinical Lab at (727) 233-5223">
                  <ShimmerButton className="bg-sunshine-blue text-white px-8 py-4 rounded-full font-semibold shadow-lg text-base gap-2">
                    <Phone className="w-5 h-5" aria-hidden="true" />
                    Call (727) 233-5223
                  </ShimmerButton>
                </a>
                <span className="text-gray-500 font-medium">— or Walk In Today</span>
              </div>
              <p className="mt-3 text-sm text-gray-500">
                No Appointment Needed for Many Services
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
