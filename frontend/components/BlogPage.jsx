'use client';

import { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { User, Clock, CalendarDays, ArrowRight } from 'lucide-react';
import { BLOG_POSTS, CATEGORY_COLORS } from '@/lib/blog-data';

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

const heroContainerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
};

const heroItemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

function Section({ children, className = '' }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <motion.div
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function BlogCard({ post }) {
  const colors = CATEGORY_COLORS[post.category] || {
    badge: 'bg-sunshine-blue text-white',
    bg: 'bg-sunshine-soft',
  };

  return (
    <motion.div variants={itemVariants}>
      <Link href={`/blog/${post.slug}`} className="group block h-full">
        <div className="h-full flex flex-col bg-white rounded-2xl shadow-md overflow-hidden transition-all duration-300 group-hover:shadow-xl group-hover:scale-[1.02]">
          {/* Featured Image */}
          <div className="relative h-48 flex-shrink-0 overflow-hidden">
            <Image
              src={post.image}
              alt={post.title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>

          {/* Card Body */}
          <div className="flex flex-col flex-1 p-5">
            {/* Title */}
            <h3 className="text-sunshine-dark font-semibold text-[1.05rem] leading-snug line-clamp-3 mb-3 group-hover:text-sunshine-blue transition-colors duration-200">
              {post.title}
            </h3>

            {/* Excerpt */}
            <p className="text-sunshine-dark/60 text-sm leading-relaxed line-clamp-2 mb-4">
              {post.excerpt}
            </p>

            {/* Meta Row */}
            <div className="flex items-center gap-4 text-xs text-sunshine-dark/50 mb-4">
              <span className="flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 flex-shrink-0" />
                <span className="truncate">{post.author}</span>
              </span>
              <span className="flex items-center gap-1.5 flex-shrink-0">
                <Clock className="w-3.5 h-3.5" />
                {post.readTime}
              </span>
            </div>

            {/* Spacer */}
            <div className="flex-1" />

            {/* Footer */}
            <div className="flex items-center justify-between border-t border-sunshine-sky/20 pt-4 mt-2">
              <span className="flex items-center gap-1.5 text-xs text-sunshine-dark/40">
                <CalendarDays className="w-3.5 h-3.5" />
                {post.date}
              </span>
              <span className="flex items-center gap-1 text-sm font-semibold text-sunshine-blue group-hover:gap-2 transition-all duration-200">
                Read More
                <ArrowRight className="w-4 h-4" />
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default function BlogPage() {
  return (
    <div className="bg-sunshine-light min-h-screen">
      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-sunshine-sky via-sunshine-blue to-[#1a5fa8] pt-36 pb-24 text-white">
        {/* Decorative circles */}
        <span className="pointer-events-none absolute -top-24 -right-24 w-80 h-80 rounded-full bg-white/10 blur-3xl" />
        <span className="pointer-events-none absolute -bottom-16 -left-16 w-64 h-64 rounded-full bg-white/10 blur-2xl" />
        <span className="pointer-events-none absolute top-1/2 left-1/3 w-48 h-48 rounded-full bg-white/5" />

        <motion.div
          className="container-custom relative text-center"
          variants={heroContainerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.p
            variants={heroItemVariants}
            className="text-white/80 font-semibold text-sm uppercase tracking-widest mb-3"
          >
            From Our Team
          </motion.p>
          <motion.h1
            variants={heroItemVariants}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-5 leading-tight"
          >
            Blog &amp; Articles
          </motion.h1>
          <motion.p
            variants={heroItemVariants}
            className="text-white/80 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed"
          >
            Health insights, lab tips, and wellness updates from the Sunshine Clinical Lab team.
          </motion.p>
        </motion.div>

        {/* Wave fade to next section */}
        <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-sunshine-light to-transparent pointer-events-none" />
      </section>

      {/* ── Blog Grid ── */}
      <section className="py-16 bg-[#EBF5FB]">
        <Section className="container-custom">
          <motion.div
            variants={itemVariants}
            className="text-center mb-12"
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-sunshine-dark mb-3">
              Latest Posts
            </h2>
            <p className="text-sunshine-dark/60 max-w-xl mx-auto">
              Stay informed with expert guidance on lab testing, health topics, and what to expect at Sunshine Clinical Lab.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {BLOG_POSTS.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        </Section>
      </section>

      {/* ── CTA Banner ── */}
      <section className="py-16 bg-white">
        <Section className="container-custom">
          <motion.div
            variants={itemVariants}
            className="bg-gradient-to-r from-sunshine-sky to-sunshine-blue rounded-3xl p-10 text-center text-white shadow-xl relative overflow-hidden"
          >
            <span className="pointer-events-none absolute -top-10 -right-10 w-48 h-48 rounded-full bg-white/10" />
            <span className="pointer-events-none absolute -bottom-8 -left-8 w-36 h-36 rounded-full bg-white/10" />
            <p className="text-white/80 font-semibold text-sm uppercase tracking-widest mb-3 relative">
              Ready to Get Tested?
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 relative">
              Visit Sunshine Clinical Lab Today
            </h2>
            <p className="text-white/80 mb-8 max-w-lg mx-auto relative">
              Walk-ins welcome. Fast, affordable lab testing in New Port Richey, FL.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center relative">
              <Link
                href="/book-appointment"
                className="inline-flex items-center justify-center gap-2 bg-white text-sunshine-blue font-semibold px-7 py-3.5 rounded-full shadow hover:shadow-md hover:bg-sunshine-light transition-all duration-200"
              >
                Book Appointment
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 border-2 border-white text-white font-semibold px-7 py-3.5 rounded-full hover:bg-white/10 transition-all duration-200"
              >
                Contact Us
              </Link>
            </div>
          </motion.div>
        </Section>
      </section>
    </div>
  );
}
