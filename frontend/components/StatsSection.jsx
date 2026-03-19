'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';

const stats = [
  { numeric: 15, suffix: '+', label: 'Years Experience' },
  { numeric: 200, suffix: '+', label: 'Lab Tests Offered' },
  { numeric: 500, suffix: '+', label: 'Healthcare Partners' },
  { numeric: 50, suffix: 'K+', label: 'Patients Served' },
];

function AnimatedNumber({ target, suffix, inView }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1800;
    const step = Math.ceil(target / (duration / 16));
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target]);

  return (
    <span>
      {count}
      {suffix}
    </span>
  );
}

export default function StatsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section ref={ref} className="relative py-16 bg-gradient-to-r from-sunshine-blue to-sunshine-sky overflow-hidden">

      {/* ── Decorative SVG background ── */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        {/* Dot grid — white on blue */}
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="stats-dots" x="0" y="0" width="32" height="32" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1.3" fill="#ffffff" fillOpacity="0.10"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#stats-dots)"/>
        </svg>
        {/* Large ring — right */}
        <svg className="absolute -right-20 -top-20 w-80 h-80 opacity-[0.12]" viewBox="0 0 320 320" fill="none">
          <circle cx="320" cy="0" r="200" stroke="white" strokeWidth="1.5" strokeDasharray="8 5"/>
          <circle cx="320" cy="0" r="130" stroke="white" strokeWidth="1" strokeDasharray="4 3"/>
        </svg>
        {/* Large ring — left */}
        <svg className="absolute -left-20 -bottom-20 w-80 h-80 opacity-[0.10]" viewBox="0 0 320 320" fill="none">
          <circle cx="0" cy="320" r="180" stroke="white" strokeWidth="1.5" strokeDasharray="6 4"/>
        </svg>
        {/* Horizontal lines — subtle */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.05]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="stats-lines" x="0" y="0" width="1" height="48" patternUnits="userSpaceOnUse">
              <line x1="0" y1="0" x2="10000" y2="0" stroke="white" strokeWidth="0.8"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#stats-lines)"/>
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center text-white/80 font-semibold text-sm mb-12 tracking-wide uppercase"
        >
          Trusted by Healthcare Professionals
        </motion.p>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="text-4xl sm:text-5xl font-bold text-white mb-2">
                <AnimatedNumber
                  target={stat.numeric}
                  suffix={stat.suffix}
                  inView={isInView}
                />
              </div>
              <div className="text-sm text-white/75 font-medium">{stat.label}</div>
              {/* Decorative underline */}
              <div className="w-8 h-0.5 bg-sunshine-yellow mx-auto mt-2 rounded-full" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
