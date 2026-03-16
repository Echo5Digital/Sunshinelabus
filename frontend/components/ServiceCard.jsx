'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function ServiceCard({ title, description, Icon, href, highlight = false }) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className={`group relative bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-shadow duration-300 border ${
        highlight
          ? 'border-2 border-sunshine-yellow ring-2 ring-sunshine-yellow/20'
          : 'border-gray-100'
      }`}
    >
      {highlight && (
        <span className="absolute -top-3 right-4 bg-sunshine-yellow text-sunshine-dark text-xs font-bold px-3 py-1 rounded-full shadow-sm">
          ⭐ Featured
        </span>
      )}

      {/* Icon */}
      <div
        className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-colors duration-300 ${
          highlight
            ? 'bg-sunshine-yellow/20 text-sunshine-blue group-hover:bg-sunshine-yellow group-hover:text-sunshine-dark'
            : 'bg-sunshine-sky/20 text-sunshine-blue group-hover:bg-sunshine-blue group-hover:text-white'
        }`}
      >
        <Icon className="w-6 h-6" />
      </div>

      {/* Content */}
      <h3 className="text-base font-semibold text-sunshine-dark mb-2">{title}</h3>
      <p className="text-sm text-gray-500 leading-relaxed mb-4">{description}</p>

      {/* Link */}
      <Link
        href={href}
        className="inline-flex items-center gap-1 text-sm font-medium text-sunshine-blue hover:gap-2 transition-all duration-200"
      >
        Learn More
        <ArrowRight className="w-4 h-4" />
      </Link>
    </motion.div>
  );
}
