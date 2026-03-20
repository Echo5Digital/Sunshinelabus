'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import MagicCard from './ui/MagicCard';

export default function ServiceCard({ title, Icon, href }) {
  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.02 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className="h-full"
    >
      <MagicCard
        gradientColor="#D9D9D955"
        borderGlowColor="#6BB6E8"
        gradientSize={200}
        className="group shadow-md hover:shadow-xl"
      >
        <div className="p-6 flex flex-col items-center text-center h-full">
          {/* Icon */}
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 bg-sunshine-blue/10 text-sunshine-blue"
          >
            <Icon className="w-6 h-6" />
          </div>

          {/* Title */}
          <h3 className="text-base font-semibold text-sunshine-dark mb-4 leading-snug">
            {title}
          </h3>

          {/* Arrow — slides right on hover */}
          <Link
            href={href}
            className="inline-flex items-center text-sunshine-blue group-hover:translate-x-1 transition-transform duration-200"
            aria-label={`Learn more about ${title}`}
          >
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </MagicCard>
    </motion.div>
  );
}
