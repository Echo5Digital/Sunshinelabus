'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function ServiceCard({ title, Icon, href, highlight = false }) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className={`group relative bg-white rounded-3xl p-6 shadow-md hover:shadow-xl
        transition-colors duration-300 border ${
        highlight
          ? 'border-2 border-sunshine-yellow ring-2 ring-sunshine-yellow/20 hover:bg-sunshine-yellow hover:border-sunshine-yellow'
          : 'border-gray-100 hover:bg-sunshine-blue hover:border-sunshine-blue'
      }`}
    >
      {highlight && (
        <span className="absolute -top-3 right-4 bg-sunshine-yellow text-sunshine-dark text-xs font-bold px-3 py-1 rounded-full shadow-sm group-hover:bg-sunshine-dark group-hover:text-sunshine-yellow transition-colors duration-300">
          ⭐ Featured
        </span>
      )}

      {/* Icon */}
      <div
        className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-colors duration-300 ${
          highlight
            ? 'bg-sunshine-yellow/20 text-sunshine-blue group-hover:bg-sunshine-dark/20 group-hover:text-sunshine-dark'
            : 'bg-sunshine-sky/20 text-sunshine-blue group-hover:bg-white/20 group-hover:text-white'
        }`}
      >
        <Icon className="w-6 h-6" />
      </div>

      {/* Title */}
      <h3 className={`text-base font-semibold text-sunshine-dark mb-4 transition-colors duration-300 ${highlight ? 'group-hover:text-sunshine-dark' : 'group-hover:text-white'}`}>
        {title}
      </h3>

      {/* Arrow */}
      <Link
        href={href}
        className={`inline-flex text-sunshine-blue hover:translate-x-1 transition-all duration-200 ${highlight ? 'group-hover:text-sunshine-dark' : 'group-hover:text-white'}`}
      >
        <ArrowRight className="w-5 h-5" />
      </Link>
    </motion.div>
  );
}
