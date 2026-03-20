'use client';

import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { ChevronDown, Phone, HelpCircle } from 'lucide-react';
import { ShimmerButton } from '@/registry/magicui/shimmer-button';
import { FAQ_DATA } from '@/lib/faq-data';

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
};

function FAQItem({ faq, index, isOpen, onToggle }) {
  return (
    <motion.div variants={itemVariants}>
      <div
        className={`relative rounded-2xl overflow-hidden transition-all duration-200 ${
          isOpen
            ? 'border border-sunshine-blue/30 shadow-md'
            : 'border border-sunshine-sky/40 shadow-sm hover:border-sunshine-sky hover:shadow-md'
        }`}
      >
        {/* Left accent bar */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              exit={{ scaleY: 0 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="absolute left-0 top-0 bottom-0 w-[3px] bg-sunshine-blue origin-top"
              aria-hidden="true"
            />
          )}
        </AnimatePresence>

        <button
          onClick={() => onToggle(index)}
          aria-expanded={isOpen}
          aria-controls={`faq-answer-${index}`}
          id={`faq-question-${index}`}
          className={`w-full flex items-start justify-between px-4 sm:px-6 py-4 sm:py-5 text-left transition-colors duration-200 ${
            isOpen ? 'bg-sunshine-blue/5' : 'bg-white hover:bg-sunshine-blue/5'
          }`}
        >
          <div className="flex items-start gap-3 flex-1 min-w-0 pr-3">
            <span
              className="flex-shrink-0 mt-0.5 text-xs font-bold tabular-nums w-6 text-right text-sunshine-blue/40"
              aria-hidden="true"
            >
              {String(index + 1).padStart(2, '0')}
            </span>
            <span className="font-semibold text-sunshine-dark text-sm sm:text-base leading-snug min-h-[2.75rem] flex items-start">
              {faq.q}
            </span>
          </div>
          <motion.span
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.22, ease: 'easeInOut' }}
            className="flex-shrink-0 mt-0.5"
            aria-hidden="true"
          >
            <ChevronDown
              className={`w-5 h-5 transition-colors duration-200 ${
                isOpen ? 'text-sunshine-blue' : 'text-sunshine-sky'
              }`}
            />
          </motion.span>
        </button>

        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              key="content"
              id={`faq-answer-${index}`}
              role="region"
              aria-labelledby={`faq-question-${index}`}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
              className="overflow-hidden"
            >
              <div className="px-4 sm:px-6 py-4 sm:py-5 bg-sunshine-blue/5 border-t border-sunshine-sky/30 pl-[52px] sm:pl-[64px]">
                <p className="text-sunshine-dark/70 leading-relaxed text-sm">{faq.a}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  const toggle = (i) => setOpenIndex((prev) => (prev === i ? null : i));

  const half = Math.ceil(FAQ_DATA.length / 2);

  return (
    <section
      className="py-20 relative overflow-hidden"
      style={{ backgroundImage: 'url(/faq-bg.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }}
      aria-labelledby="faq-heading"
      ref={ref}
    >
      {/* Overlay for readability */}
      <div className="absolute inset-0 bg-white/80" aria-hidden="true" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <div className="flex justify-center mb-4" aria-hidden="true">
            <div className="w-14 h-14 rounded-2xl bg-sunshine-blue flex items-center justify-center shadow-lg">
              <HelpCircle className="w-7 h-7 text-white" />
            </div>
          </div>
          <span className="text-sunshine-blue text-xs font-bold uppercase tracking-widest mb-3 block">
            Got Questions?
          </span>
          <h2
            id="faq-heading"
            className="text-3xl sm:text-4xl font-extrabold text-sunshine-dark"
          >
            Frequently Asked Questions
          </h2>
          <p className="text-sunshine-dark/60 mt-4 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            Everything you need to know before your visit to Sunshine Clinical Lab in Trinity, FL.
          </p>
        </motion.div>

        {/* Accordion — staggered, 2-column on lg+ */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-3 lg:gap-4 lg:items-start"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          <div className="space-y-3">
            {FAQ_DATA.slice(0, half).map((faq, i) => (
              <FAQItem
                key={i}
                faq={faq}
                index={i}
                isOpen={openIndex === i}
                onToggle={toggle}
              />
            ))}
          </div>
          <div className="space-y-3">
            {FAQ_DATA.slice(half).map((faq, i) => (
              <FAQItem
                key={i + half}
                faq={faq}
                index={i + half}
                isOpen={openIndex === i + half}
                onToggle={toggle}
              />
            ))}
          </div>
        </motion.div>

        {/* CTA card */}
        <motion.div
          className="mt-12 bg-white rounded-3xl border border-sunshine-sky/30 shadow-sm px-6 py-8 text-center"
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <p className="text-sunshine-dark/60 text-sm mb-5">
            Can&apos;t find what you&apos;re looking for? Our team is happy to help.
          </p>
          <a href="tel:7272335223" aria-label="Call Sunshine Clinical Lab with any questions">
            <ShimmerButton className="bg-sunshine-blue text-white px-8 py-3.5 rounded-full font-semibold shadow-lg gap-2">
              <Phone className="w-5 h-5" aria-hidden="true" />
              Still Have Questions? Call (727) 233-5223
            </ShimmerButton>
          </a>
        </motion.div>

      </div>
    </section>
  );
}
