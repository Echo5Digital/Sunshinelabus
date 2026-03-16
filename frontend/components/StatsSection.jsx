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
    <section ref={ref} className="py-16 bg-gradient-to-r from-sunshine-blue to-sunshine-sky">
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
