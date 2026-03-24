'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Zap, Award, Truck, FlaskConical, DollarSign, Heart, Phone } from 'lucide-react';
import { ShimmerButton } from '@/registry/magicui/shimmer-button';
import MagicCard from '@/components/ui/MagicCard';

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

// Each card enters from a different direction based on its grid position:
// row 1: left, top, right  |  row 2: left, bottom, right
const CARD_DIRS = [
  { x: -60, y: 0 },
  { x: 0,   y: -60 },
  { x: 60,  y: 0 },
  { x: -60, y: 0 },
  { x: 0,   y: 60 },
  { x: 60,  y: 0 },
];

const cardVariants = {
  hidden: (i) => {
    const { x, y } = CARD_DIRS[i] ?? { x: 0, y: 28 };
    return { opacity: 0, x, y, scale: 0.97 };
  },
  visible: { opacity: 1, x: 0, y: 0, scale: 1, transition: { duration: 0.5, ease: 'easeOut' } },
};

const reasons = [
  {
    Icon: Zap,
    title: 'Faster Than the Chains — Period',
    desc: 'Most patients are in and out in minutes, not hours. We don\'t overbook. We don\'t make you wait. For many of our most-requested tests, results are available the next business day.',
  },
  {
    Icon: Award,
    title: '35+ Years of Combined Phlebotomy Experience',
    desc: 'Our team isn\'t fresh out of a weekend training course. We\'ve drawn blood on difficult veins, pediatric patients, elderly patients, and everyone in between — thousands of times over.',
  },
  {
    Icon: Truck,
    title: 'We Come to You — Mobile Blood Draws Across Pasco County',
    desc: 'Homebound? Post-surgery? Elderly? Busy parent? Our mobile phlebotomy service brings the lab to your door in Trinity, New Port Richey, Land O\' Lakes, Tarpon Springs, and surrounding communities.',
  },
  {
    Icon: FlaskConical,
    title: 'Specialty Testing Most Labs Don\'t Prioritize',
    desc: 'TRT monitoring panels, hormone testing, legal DNA, immigration DNA, Peekaboo gender reveal blood tests, PSA, estradiol, SHBG — we don\'t just offer these services. We specialize in them.',
  },
  {
    Icon: DollarSign,
    title: 'Affordable, Transparent Pricing',
    desc: 'No surprise bills. No inflated corporate pricing. Contact our team for current pricing on any test — we\'re often significantly more affordable than the large national chains.',
  },
  {
    Icon: Heart,
    title: 'Real People, Real Care — Locally Owned in Trinity, FL',
    desc: 'We\'re locally owned and operated. We live in this community. When you call, a real person answers. When you walk in, we greet you — not hand you a buzzer.',
  },
];

export default function WhyChooseUs() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section className="py-20 bg-[#EBF5FB] overflow-hidden" aria-labelledby="why-choose-us-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          ref={ref}
        >
          <div className="flex justify-center mb-4" aria-hidden="true">
            <div className="w-14 h-14 rounded-2xl bg-sunshine-blue flex items-center justify-center shadow-lg">
              <Zap className="w-7 h-7 text-white" />
            </div>
          </div>
          <span className="text-sunshine-blue text-xs font-bold uppercase tracking-widest mb-3 block">
            Why Choose Us
          </span>
          <h2
            id="why-choose-us-heading"
            className="text-3xl sm:text-4xl font-extrabold text-sunshine-dark"
          >
            Why Choose Sunshine Clinical Lab in Trinity, FL
          </h2>
          <p className="text-gray-500 mt-4 max-w-2xl mx-auto text-base">
            Everything the big chains offer — and the personal touch they never will.
          </p>
        </motion.div>

        {/* 6-card grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {reasons.map((reason, i) => (
            <motion.div key={reason.title} custom={i} variants={cardVariants} className="h-full">
              <MagicCard
                gradientColor="#CCE9F740"
                borderGlowColor="#6BB6E8"
                className="shadow-md hover:shadow-xl h-full"
              >
                <div className="p-7 flex flex-col gap-4 h-full">
                  <div className="w-12 h-12 rounded-2xl bg-sunshine-soft flex items-center justify-center flex-shrink-0">
                    <reason.Icon className="w-6 h-6 text-sunshine-blue" aria-hidden="true" />
                  </div>
                  <h3 className="text-lg font-bold text-sunshine-dark">{reason.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{reason.desc}</p>
                </div>
              </MagicCard>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA strip */}
        <motion.div
          className="bg-white rounded-2xl p-6 mt-10 text-center shadow-sm"
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <a href="tel:7272335223" aria-label="Call Sunshine Clinical Lab">
            <ShimmerButton className="bg-sunshine-blue text-white px-8 py-3.5 rounded-full font-bold shadow-lg gap-2">
              <Phone className="w-5 h-5" aria-hidden="true" />
              Call Us: (727) 233-5223
            </ShimmerButton>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
