'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Users, UserPlus, CalendarClock } from 'lucide-react';
import { ShimmerButton } from '@/registry/magicui/shimmer-button';

const actionCards = [
  { Icon: Users,         label: 'Lab Professionals',    href: '#' },
  { Icon: UserPlus,      label: 'Send Your Referrals',  href: '/referrals' },
  { Icon: CalendarClock, label: 'Laboratory Schedules', href: '#' },
];

export default function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    /*
      Section has NO vertical padding — columns own their own py.
      Outer flex stretches all children to equal height (default align-items: stretch).
      Image column has NO py so its height = full section height → image-end = section-end.
    */
    <section ref={ref} id="about" className="relative bg-[#0F2A6E] overflow-hidden">

      {/* Background texture at low opacity */}
      <div className="absolute inset-0 opacity-[0.12] pointer-events-none" aria-hidden="true">
        <Image
          src="/abt-bg.jpg"
          alt=""
          fill
          className="object-cover"
          quality={60}
          sizes="100vw"
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Mobile: single column stack. Desktop: 3-part flex row. */}
        <div className="flex flex-col lg:flex-row">

          {/* Column A — Text, vertically centered with py-20 breathing room */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="flex-1 flex items-center py-20 pr-0 lg:pr-10"
          >
            <div>
              <span className="block text-sunshine-sky text-xs font-bold uppercase tracking-widest mb-4">
                We Are Committed
              </span>

              <h2 className="text-4xl sm:text-5xl font-bold text-white leading-tight mb-5">
                Our Mission Statement
              </h2>

              <p className="text-white/70 text-base leading-relaxed mb-8">
                Our mission is to provide innovative, timely, and quality medical laboratory
                services that exceed the expectations of those we serve. Our commitment to
                excellence drives us to continuously improve our processes, ensuring accuracy,
                reliability, and efficiency in every test we perform.
              </p>

              <Link href="/about">
                <ShimmerButton
                  className="border border-white text-white text-sm px-6 py-3 rounded-full font-semibold"
                  shimmerColor="rgba(255,255,255,0.25)"
                >
                  <span>About Us</span>
                  <ArrowRight className="w-4 h-4" />
                </ShimmerButton>
              </Link>
            </div>
          </motion.div>

          {/* Column B — Buttons, vertically centered with py-20 */}
          <div className="flex-1 flex items-center py-16 lg:py-20">
            <div className="flex flex-col gap-5 w-full">
              {actionCards.map(({ Icon, label, href }, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, y: 50 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{
                    type: 'spring',
                    stiffness: 260,
                    damping: 22,
                    delay: 0.25 + i * 0.12,
                  }}
                  whileHover={{ scale: 1.04, y: -3 }}
                  whileTap={{ scale: 0.97 }}
                  className="cursor-pointer"
                >
                  <Link
                    href={href}
                    className="relative flex items-center gap-5 px-6 py-5 rounded-full w-full shadow-lg hover:shadow-xl overflow-hidden transition-shadow duration-300 group"
                    style={{ background: 'linear-gradient(135deg, #1A6BBF 0%, #3B9ED8 100%)' }}
                  >
                    {/* Shimmer sweep */}
                    <motion.span
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0"
                      style={{
                        background: 'linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.35) 50%, transparent 70%)',
                      }}
                      initial={{ x: '-100%' }}
                      animate={{ x: '200%' }}
                      transition={{ repeat: Infinity, repeatDelay: 1.2, duration: 1.4, ease: 'easeInOut' }}
                    />
                    <div className="relative z-10 w-12 h-12 rounded-full bg-[#0F2A6E]/50 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <span className="relative z-10 flex-1 font-bold text-white text-base">{label}</span>
                    <ArrowRight className="relative z-10 w-5 h-5 text-white/70 flex-shrink-0 group-hover:translate-x-1 transition-transform duration-200" />
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Column C — Doctor image, NO py so height = full section height.
              items-end pins the image to the section bottom. */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
            className="hidden lg:flex items-end justify-center flex-shrink-0 w-[260px] xl:w-[320px] ml-8"
          >
            <Image
              src="/btm2-img.webp"
              alt="Medical professional"
              width={320}
              height={480}
              quality={90}
              className="w-full h-auto object-contain object-bottom drop-shadow-2xl"
              sizes="(max-width: 1280px) 260px, 320px"
            />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
