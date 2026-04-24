'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowLeft, User, Clock, CalendarDays, Tag } from 'lucide-react';
import { BLOG_POSTS, CATEGORY_COLORS } from '@/lib/blog-data';

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } },
};

export default function BlogPostPage({ slug }) {
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) {
    return (
      <div className="bg-sunshine-light min-h-screen flex flex-col items-center justify-center px-4 text-center">
        <h1 className="text-3xl font-bold text-sunshine-dark mb-4">Post Not Found</h1>
        <p className="text-sunshine-dark/60 mb-8">
          We couldn't find the article you're looking for.
        </p>
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 bg-sunshine-blue text-white font-semibold px-6 py-3 rounded-full hover:bg-sunshine-blue/90 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Blog
        </Link>
      </div>
    );
  }

  const colors = CATEGORY_COLORS[post.category] || {
    badge: 'bg-sunshine-blue text-white',
  };

  return (
    <div className="bg-sunshine-light min-h-screen">
      {/* ── Hero Image ── */}
      <div className="relative w-full h-64 sm:h-80 lg:h-[420px] overflow-hidden bg-sunshine-soft">
        <Image
          src={post.image}
          alt={post.title}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-sunshine-dark/60 via-transparent to-transparent" />
      </div>

      {/* ── Article ── */}
      <div className="container-custom py-12">
        <motion.article
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-3xl mx-auto"
        >
          {/* Back link */}
          <motion.div variants={itemVariants} className="mb-8">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sunshine-blue hover:text-sunshine-blue/80 font-medium text-sm transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Blog
            </Link>
          </motion.div>

          {/* Category + Date row */}
          <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-3 mb-5">
            <span className={`text-xs font-semibold px-3 py-1 rounded-full ${colors.badge}`}>
              {post.category}
            </span>
            <span className="flex items-center gap-1.5 text-xs text-sunshine-dark/50">
              <CalendarDays className="w-3.5 h-3.5" />
              {post.date}
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            variants={itemVariants}
            className="text-3xl sm:text-4xl font-bold text-sunshine-dark leading-tight mb-6"
          >
            {post.title}
          </motion.h1>

          {/* Author + Read time */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap items-center gap-5 text-sm text-sunshine-dark/60 pb-6 mb-8 border-b border-sunshine-sky/30"
          >
            <span className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-sunshine-blue/10 flex items-center justify-center flex-shrink-0">
                <User className="w-4 h-4 text-sunshine-blue" />
              </span>
              {post.author}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              {post.readTime} read
            </span>
          </motion.div>

          {/* Content paragraphs */}
          <motion.div variants={itemVariants} className="space-y-5">
            {post.content.map((paragraph, idx) => (
              <p
                key={idx}
                className="text-sunshine-dark/80 leading-relaxed text-[1.05rem]"
                dangerouslySetInnerHTML={{
                  __html: paragraph.replace(
                    /\*\*(.*?)\*\*/g,
                    '<strong class="font-semibold text-sunshine-dark">$1</strong>'
                  ),
                }}
              />
            ))}
          </motion.div>

          {/* Bottom nav */}
          <motion.div
            variants={itemVariants}
            className="mt-12 pt-8 border-t border-sunshine-sky/30 flex flex-col sm:flex-row items-center justify-between gap-4"
          >
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sunshine-blue hover:text-sunshine-blue/80 font-medium transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to All Articles
            </Link>
            <Link
              href="/book-appointment"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-sunshine-sky to-sunshine-blue text-white font-semibold px-6 py-3 rounded-full shadow hover:shadow-md transition-all duration-200"
            >
              Book Appointment
            </Link>
          </motion.div>
        </motion.article>
      </div>
    </div>
  );
}
