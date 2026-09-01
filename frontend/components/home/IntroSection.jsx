'use client';

import { useRef, useEffect } from 'react';
import Link from 'next/link';
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
  const videoRef = useRef(null);
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = true;
      videoRef.current.volume = 0;
    }
  }, []);

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
                ref={videoRef}
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
              A Local Lab That Makes{' '}
              <span className="text-sunshine-blue">Testing Feel a Little Easier</span>
            </motion.h2>

            <motion.p
              variants={itemVariants}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              transition={{ delay: 0.1 }}
              className="text-gray-600 leading-relaxed mb-4"
            >
              Getting blood work shouldn&apos;t have to feel complicated.
            </motion.p>

            <motion.p
              variants={itemVariants}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              transition={{ delay: 0.15 }}
              className="text-gray-600 leading-relaxed mb-4"
            >
              Sunshine Clinical Labs is a locally operated clinical laboratory serving Trinity, New
              Port Richey, and surrounding communities. Patients can visit our Trinity location for
              available walk-in testing or schedule a mobile blood draw when coming to the lab
              isn&apos;t convenient.
            </motion.p>

            <motion.p
              variants={itemVariants}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              transition={{ delay: 0.2 }}
              className="text-gray-600 leading-relaxed mb-4"
            >
              We provide routine blood testing along with specialized services including TRT and
              hormone monitoring, DNA testing, gender reveal testing, and drug and toxicology
              testing.
            </motion.p>

            <motion.p
              variants={itemVariants}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              transition={{ delay: 0.25 }}
              className="text-gray-600 leading-relaxed mb-8"
            >
              Our focus is simple: convenient access, professional blood collection, clear
              communication, and personal service.
            </motion.p>

            <motion.div
              variants={itemVariants}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              transition={{ delay: 0.3 }}
            >
              <p className="text-gray-600 font-medium mb-4">
                Monday–Friday: 8:00 AM–2:00 PM
              </p>
              <div className="flex items-center gap-3 flex-wrap">
                <Link href="/book-appointment" aria-label="Book an appointment">
                  <ShimmerButton className="bg-sunshine-blue text-white px-8 py-4 rounded-full font-semibold shadow-lg text-base gap-2">
                    Book an Appointment
                  </ShimmerButton>
                </Link>
                <a href="tel:+17272335223" aria-label="Call Sunshine Clinical Lab at (727) 233-5223">
                  <ShimmerButton className="bg-white text-sunshine-dark border-2 border-sunshine-blue/30 px-8 py-4 rounded-full font-semibold shadow-lg text-base gap-2">
                    <Phone className="w-5 h-5" aria-hidden="true" />
                    Call (727) 233-5223
                  </ShimmerButton>
                </a>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
