'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { MessageSquare } from 'lucide-react';
import ContactForm from './ContactForm';

export default function SendMessageSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="contact" className="py-20 bg-sunshine-mist border-t border-gray-100">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          {/* Section heading */}
          <div className="text-center mb-10">
            <span className="inline-flex items-center gap-2 bg-sunshine-blue/10 text-sunshine-blue text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4">
              <MessageSquare className="w-3.5 h-3.5" />
              Get In Touch
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-sunshine-dark mb-3">
              Send Us a Message
            </h2>
            <p className="text-gray-500 text-lg">
              Have a question or inquiry? We&apos;d love to hear from you and will respond promptly.
            </p>
          </div>

          {/* Form card */}
          <div className="bg-white rounded-3xl p-8 shadow-xl border border-sunshine-sky/20">
            <ContactForm />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
