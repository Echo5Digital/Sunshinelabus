'use client';

import { motion } from 'framer-motion';
import { Heart, Star } from 'lucide-react';
import MagicCard from '@/components/ui/MagicCard';

const fadeLeft  = { hidden: { opacity: 0, x: -80 }, show: { opacity: 1, x: 0 } };
const fadeRight = { hidden: { opacity: 0, x:  80 }, show: { opacity: 1, x: 0 } };

const transition = { duration: 0.7, ease: 'easeOut' };
const viewport   = { once: true, amount: 0.25 };

export default function MissionVisionSection() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

      {/* Mission — fades in from the left */}
      <motion.div
        variants={fadeLeft}
        initial="hidden"
        whileInView="show"
        transition={transition}
        viewport={viewport}
        className="h-full"
      >
        <MagicCard
          gradientColor="#CCE9F7C0"
          borderGlowColor="#2B7DBF"
          gradientSize={350}
          className="shadow-md hover:shadow-2xl transition-all duration-300 group h-full"
        >
          <div className="p-8">
            <div className="w-14 h-14 rounded-2xl bg-sunshine-blue flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
              <Heart className="w-7 h-7 text-white" aria-hidden="true" />
            </div>
            <h3 className="text-xl font-bold text-sunshine-dark mb-4">Our Mission</h3>
            <p className="text-gray-600 leading-relaxed">
              Our mission is to provide innovative, timely, and quality medical laboratory
              services that exceed the expectations of those we serve. Our commitment to
              excellence drives us to continuously improve our processes, ensuring accuracy,
              reliability, and efficiency in every test we perform.
            </p>
          </div>
        </MagicCard>
      </motion.div>

      {/* Vision — fades in from the right */}
      <motion.div
        variants={fadeRight}
        initial="hidden"
        whileInView="show"
        transition={transition}
        viewport={viewport}
        className="h-full"
      >
        <MagicCard
          gradientColor="#CCE9F7C0"
          borderGlowColor="#2B7DBF"
          gradientSize={350}
          className="shadow-md hover:shadow-2xl transition-all duration-300 group h-full"
        >
          <div className="p-8">
            <div className="w-14 h-14 rounded-2xl bg-sunshine-sky flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
              <Star className="w-7 h-7 text-white" aria-hidden="true" />
            </div>
            <h3 className="text-xl font-bold text-sunshine-dark mb-4">Our Vision</h3>
            <p className="text-gray-600 leading-relaxed">
              We envision ourselves as a reliable ally in health and lifestyle empowerment,
              harnessing the power of laboratory expertise to transform lives. Our goal is to
              set new standards in healthcare by providing unparalleled access to advanced
              diagnostic technologies and insights.
            </p>
          </div>
        </MagicCard>
      </motion.div>

    </div>
  );
}
