'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Star, ExternalLink } from 'lucide-react';
import { ShimmerButton } from '@/registry/magicui/shimmer-button';

export default function TestimonialsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      className="py-20 bg-sunshine-soft"
      aria-labelledby="testimonials-heading"
      ref={ref}
    >
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          {/* 5-star row */}
          <div className="flex justify-center gap-1 mb-5" aria-label="5-star rating">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-6 h-6 text-sunshine-yellow fill-sunshine-yellow" aria-hidden="true" />
            ))}
          </div>

          <h2
            id="testimonials-heading"
            className="text-3xl sm:text-4xl font-extrabold text-sunshine-dark mb-4"
          >
            Our Patients Are Talking — And We&apos;re Grateful
          </h2>
          <p className="text-gray-600 leading-relaxed mb-8 text-base">
            We&apos;re proud to serve the Pasco County community. If you&apos;ve had a great
            experience at Sunshine Clinical Lab, we&apos;d love for you to share it.
          </p>
        </motion.div>

        {/*
          TODO: Real Google rating, review count, and 3-4 recent patient review excerpts
          need to be added here once sourced directly from the Google Business Profile
          dashboard (not fabricated or scraped). Do not replace with generic marketing
          testimonials — real patient reviews only.
        */}

        {/* Google Review CTA */}
        <motion.div
          className="mb-6"
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <a
            href="https://g.page/r/sunshine-clinical-lab/review"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Leave a Google review for Sunshine Clinical Lab (opens in new tab)"
          >
            <ShimmerButton className="bg-white border-2 border-sunshine-blue text-sunshine-dark px-8 py-4 rounded-full font-bold shadow-lg gap-2 hover:bg-sunshine-blue/10">
              <Star className="w-5 h-5 text-sunshine-yellow fill-sunshine-yellow" aria-hidden="true" />
              Leave Us a Google Review
              <ExternalLink className="w-4 h-4 text-gray-400" aria-hidden="true" />
            </ShimmerButton>
          </a>
        </motion.div>

        <motion.p
          className="text-gray-500 text-sm leading-relaxed"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.35 }}
        >
          Your feedback helps other patients in our community find a better, faster, more personal
          lab experience — and it means the world to our locally owned team.
        </motion.p>
      </div>
    </section>
  );
}
