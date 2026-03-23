'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import {
  Phone,
  MapPin,
  Clock,
  CheckCircle,
  ChevronDown,
  ArrowRight,
  Home,
  HelpCircle,
  CalendarDays,
  FlaskConical,
  Activity,
  ShieldCheck,
  Microscope,
  HeartPulse,
  Dna,
  TestTube2,
} from 'lucide-react';
import { ShimmerButton } from '@/registry/magicui/shimmer-button';
import MagicCard from '@/components/ui/MagicCard';

/* ─── Animation variants (matching homepage) ─────────────────── */
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};
const CARD_DIRS = [
  { x: -60, y: 0 },
  { x: 0,   y: -60 },
  { x: 60,  y: 0 },
  { x: -60, y: 0 },
  { x: 0,   y: 60 },
  { x: 60,  y: 0 },
  { x: 0,   y: 60 },
];
const cardVariants = {
  hidden: (i) => {
    const { x, y } = CARD_DIRS[i] ?? { x: 0, y: 28 };
    return { opacity: 0, x, y, scale: 0.97 };
  },
  visible: { opacity: 1, x: 0, y: 0, scale: 1, transition: { duration: 0.5, ease: 'easeOut' } },
};

const heroContainerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
};
const heroItemVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

/* ─── Section wrapper (scroll-triggered) ────────────────────── */
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

/* ─── Data ───────────────────────────────────────────────────── */
const TRT_PANEL_ITEMS = [
  {
    Icon: FlaskConical,
    title: 'Total Testosterone and Free Testosterone',
    body: 'The foundational markers for assessing whether your TRT dose is dialed in correctly. We test both because total testosterone alone doesn\'t give you the full picture of what\'s bioavailable.',
  },
  {
    Icon: Activity,
    title: 'Estradiol (E2)',
    body: 'Elevated estrogen is one of the most common side effects of TRT, and managing it properly requires regular monitoring. Our E2 assay gives you and your provider the data needed to adjust AI (aromatase inhibitor) protocols if necessary.',
  },
  {
    Icon: HeartPulse,
    title: 'Hematocrit and CBC',
    body: 'Testosterone therapy can elevate red blood cell production, which increases hematocrit levels. This is one of the most important safety markers to monitor on TRT, and we include it in our standard panels.',
  },
  {
    Icon: ShieldCheck,
    title: 'PSA (Prostate-Specific Antigen)',
    body: 'Routine PSA monitoring is recommended for men on TRT, particularly those over 40. This test screens for prostate-related changes that your provider needs to track over time.',
  },
  {
    Icon: Microscope,
    title: 'CMP (Comprehensive Metabolic Panel)',
    body: 'Covers kidney function, liver function, electrolytes, and blood glucose. TRT can influence several of these markers, making regular CMP testing essential for protocol safety.',
  },
  {
    Icon: TestTube2,
    title: 'SHBG (Sex Hormone-Binding Globulin)',
    body: 'SHBG binds to testosterone in your blood, reducing the amount that\'s available for your body to use. Tracking SHBG helps your provider understand your true bioavailable testosterone levels.',
  },
  {
    Icon: Dna,
    title: 'LH (Luteinizing Hormone) and FSH (Follicle-Stimulating Hormone)',
    body: 'These pituitary markers are especially important for men starting TRT or those considering fertility-related decisions while on therapy.',
  },
];

const TRT_FAQ_ITEMS = [
  {
    q: 'How much does a TRT blood test cost at Sunshine Clinical Lab?',
    a: 'Pricing varies depending on the specific panel and tests ordered. Contact us at (727) 233-5223 for current self-pay pricing and insurance verification. Our rates are consistently more affordable than large national chain labs.',
  },
  {
    q: "Do I need a doctor's order for TRT blood work?",
    a: "In most cases, yes — a physician's order is required for TRT lab work. If your TRT provider has given you a lab requisition, bring it with you or have them send it to our Trinity office.",
  },
  {
    q: 'How fast will I get my TRT results?',
    a: 'For many common TRT-related blood tests, results are available the next business day. Turnaround may vary for certain specialty markers. Our team will give you a timeline at your visit.',
  },
  {
    q: 'Do you offer sensitive estradiol (E2) testing for TRT patients?',
    a: 'Yes. We offer estradiol testing as part of our TRT monitoring panels. Discuss your specific assay needs with our team when scheduling.',
  },
  {
    q: 'Can I walk in for TRT blood work at your Trinity location?',
    a: 'Yes. Walk-ins are welcome at our Trinity, FL location for most blood work including TRT panels. For the fastest experience, you can also call ahead at (727) 233-5223.',
  },
  {
    q: 'Do you offer TRT blood work through mobile blood draw in Pasco County?',
    a: 'Absolutely. Our mobile phlebotomy service covers all of Pasco County. We bring TRT lab draws to your home, office, or wherever is most convenient.',
  },
  {
    q: 'What TRT blood tests should I get regularly?',
    a: 'Most TRT providers recommend regular monitoring of total and free testosterone, estradiol, hematocrit/CBC, CMP, and PSA at minimum. SHBG, LH, and FSH may also be recommended depending on your protocol. Always follow your prescribing physician\'s specific recommendations.',
  },
];

/* ─── FAQ accordion item ─────────────────────────────────────── */
function FaqItem({ q, a, index, isOpen, onToggle }) {
  const num = String(index + 1).padStart(2, '0');
  return (
    <div
      className={`relative rounded-2xl overflow-hidden transition-all duration-200 cursor-pointer ${
        isOpen
          ? 'border border-sunshine-blue/30 shadow-md'
          : 'border border-sunshine-sky/40 shadow-sm hover:border-sunshine-sky hover:shadow-md'
      }`}
      onClick={onToggle}
    >
      {/* Left accent bar */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="bar"
            className="absolute left-0 top-0 bottom-0 w-[3px] bg-sunshine-blue origin-top"
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            exit={{ scaleY: 0 }}
            transition={{ duration: 0.2 }}
          />
        )}
      </AnimatePresence>

      {/* Question button */}
      <button
        className={`w-full flex items-start justify-between px-4 sm:px-6 py-4 sm:py-5 text-left transition-colors duration-200 ${
          isOpen ? 'bg-sunshine-blue/5' : 'bg-white hover:bg-sunshine-blue/5'
        }`}
        aria-expanded={isOpen}
      >
        <span className="flex items-start gap-3 flex-1 min-w-0">
          <span className="text-xs font-bold tabular-nums w-6 text-right text-sunshine-blue/40 mt-0.5 flex-shrink-0">
            {num}
          </span>
          <span className="font-semibold text-sunshine-dark text-sm sm:text-base leading-snug">
            {q}
          </span>
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.22, ease: 'easeInOut' }}
          className={`flex-shrink-0 mt-0.5 ml-3 transition-colors duration-200 ${
            isOpen ? 'text-sunshine-blue' : 'text-sunshine-sky'
          }`}
        >
          <ChevronDown className="w-5 h-5" />
        </motion.span>
      </button>

      {/* Answer */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="bg-sunshine-blue/5 border-t border-sunshine-sky/30 px-4 sm:px-6 py-4 sm:py-5 pl-[52px] sm:pl-[64px]">
              <p className="text-sunshine-dark/70 text-sm leading-relaxed">{a}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─── Main page component ────────────────────────────────────── */
export default function TRTBloodTestPage() {
  const [openFaq, setOpenFaq] = useState(null);
  const toggleFaq = (i) => setOpenFaq((prev) => (prev === i ? null : i));

  // Split FAQ into 2 columns
  const col1 = TRT_FAQ_ITEMS.slice(0, 4);
  const col2 = TRT_FAQ_ITEMS.slice(4);

  return (
    <div className="bg-sunshine-soft min-h-screen">

      {/* ══ HERO ════════════════════════════════════════════════ */}
      <section className="relative w-full min-h-[65vh] flex items-center overflow-hidden">
        {/* Gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-sunshine-dark via-[#1a3a5c] to-sunshine-blue" />
        {/* Decorative rings */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full border border-white/5" />
          <div className="absolute bottom-20 -left-20 w-80 h-80 rounded-full border border-white/5" />
          <div className="absolute top-1/3 right-1/4 w-40 h-40 rounded-full bg-white/[0.03]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full border border-white/[0.03]" />
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 pt-28">
          <motion.div
            variants={heroContainerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-2xl ml-auto text-right"
          >
            <motion.div variants={heroItemVariants}>
              <p className="text-white/75 text-sm font-semibold tracking-widest mb-6">
                Pasco County TRT Monitoring
              </p>
            </motion.div>

            <motion.h1
              variants={heroItemVariants}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-4"
            >
              TRT Blood Testing in Trinity, FL —{' '}
              <span className="text-[#93C5FD]">Fast, Affordable Testosterone Monitoring for Pasco County</span>
            </motion.h1>

            <motion.h2
              variants={heroItemVariants}
              className="text-2xl sm:text-3xl font-bold text-white/90 mb-4"
            >
              Your TRT Lab Work Shouldn&apos;t Cost a Fortune or Take All Day
            </motion.h2>

            <motion.p
              variants={heroItemVariants}
              className="text-white/85 text-lg leading-relaxed mb-10 max-w-xl ml-auto"
            >
              Sunshine Clinical Lab offers complete testosterone replacement therapy blood panels
              with next-day results for many tests — at prices the chain labs can&apos;t touch.
              Located in Trinity, FL, serving all of Pasco County.
            </motion.p>

            <motion.div
              variants={heroItemVariants}
              className="flex flex-col sm:flex-row flex-wrap gap-4 justify-end"
            >
              <a href="tel:+17272335223">
                <ShimmerButton className="bg-white text-sunshine-dark px-7 py-3.5 rounded-full font-bold shadow-xl text-base gap-2">
                  <Phone className="w-5 h-5" />
                  Book Your TRT Panel — (727) 233-5223
                </ShimmerButton>
              </a>
              <Link href="/book-appointment">
                <ShimmerButton className="bg-sunshine-blue border border-white/20 text-white px-7 py-3.5 rounded-full font-semibold shadow-lg text-base gap-2">
                  <CalendarDays className="w-4 h-4" />
                  Book Appointment
                </ShimmerButton>
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
          <svg viewBox="0 0 1440 72" preserveAspectRatio="none" className="w-full h-16 sm:h-20">
            <path
              d="M0,36 C240,72 480,0 720,36 C960,72 1200,0 1440,36 L1440,72 L0,72 Z"
              fill="#EBF5FB"
            />
          </svg>
        </div>
      </section>

      {/* ══ DIRECT ANSWER (AEO/GEO) ══════════════════════════════ */}
      <section className="py-12 bg-[#EBF5FB]">
        <Section>
          <motion.div variants={itemVariants} className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="border-l-4 border-sunshine-blue pl-6">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-sunshine-dark mb-4">
                Where Can I Get Affordable TRT Blood Work in Pasco County?
              </h2>
              <p className="text-gray-700 leading-relaxed text-base">
                Sunshine Clinical Lab at 3600 Galileo Dr, Trinity, FL 34655 offers affordable TRT
                blood testing with next-day results for many hormone panels. The lab provides total
                and free testosterone, estradiol (E2), hematocrit, CBC, CMP, PSA, SHBG, LH, and
                FSH testing. Walk-ins are welcome, and mobile blood draws are available throughout
                Pasco County. The lab accepts most major insurance plans and offers competitive
                self-pay pricing. Call{' '}
                <a
                  href="tel:+17272335223"
                  className="text-sunshine-blue font-semibold hover:underline"
                >
                  (727) 233-5223
                </a>{' '}
                for current rates.
              </p>
            </div>
          </motion.div>
        </Section>
      </section>

      {/* ══ THE TRT MONITORING LAB ════════════════════════════════ */}
      <section className="py-20 bg-white overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Section>
            <motion.div variants={itemVariants} className="mb-10">
              <span className="text-xs font-bold uppercase tracking-widest text-sunshine-blue mb-3 block">
                The Sunshine Difference
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-sunshine-dark">
                The TRT Monitoring Lab Pasco County Men Actually Trust
              </h2>
            </motion.div>
            <motion.div
              variants={itemVariants}
              className="bg-sunshine-soft rounded-2xl p-8 space-y-4 text-gray-600 leading-relaxed"
            >
              <p>
                If you&apos;re on testosterone replacement therapy, you already know the drill:
                regular blood work is non-negotiable. Your provider needs consistent, accurate labs
                to monitor your levels, adjust your protocol, and make sure your health markers stay
                where they should be.
              </p>
              <p>
                What you probably didn&apos;t sign up for is paying $300+ at a chain lab, waiting
                an hour to get drawn, and then waiting another five days for results. That&apos;s
                the reality for a lot of men on TRT in the Tampa Bay area — and it&apos;s exactly
                why Sunshine Clinical Lab exists.
              </p>
              <p className="font-bold text-sunshine-dark text-lg">
                We built our TRT blood testing program around the three things men on testosterone
                therapy actually care about: speed, accuracy, and cost.
              </p>
              <p>
                Our Trinity, FL location is purpose-built for this — walk in, get drawn by an
                experienced phlebotomist, and have results in hand for many tests by the next
                business day.
              </p>
            </motion.div>
          </Section>
        </div>
      </section>

      {/* ══ TRT PANEL TESTS ══════════════════════════════════════ */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Section>
          <motion.div variants={itemVariants} className="text-center mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-sunshine-blue mb-3 block">
              Complete Panels
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-sunshine-dark">
              What&apos;s Included in Our TRT Monitoring Panels
            </h2>
            <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
              Sunshine Clinical Lab offers comprehensive hormone and health panels designed
              specifically for men on testosterone replacement therapy.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {TRT_PANEL_ITEMS.map(({ Icon, title, body }, i) => (
              <motion.div key={title} variants={cardVariants} custom={i}>
                <MagicCard gradientColor="#93C5FD60" borderGlowColor="#2B7DBF" className="shadow-md hover:shadow-xl">
                  <div className="p-7 flex flex-col gap-4 h-full">
                    <div className="w-12 h-12 rounded-2xl bg-sunshine-soft flex items-center justify-center flex-shrink-0">
                      <Icon className="w-6 h-6 text-sunshine-blue" />
                    </div>
                    <h3 className="text-lg font-bold text-sunshine-dark">{title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">{body}</p>
                  </div>
                </MagicCard>
              </motion.div>
            ))}
          </div>

          <motion.p variants={itemVariants} className="text-center text-gray-500 italic mt-8">
            We also accommodate custom panels. If your provider has a specific test list they want
            run, bring the order in — we&apos;ll handle it.
          </motion.p>
        </Section>
      </section>

      {/* ══ NEXT-DAY RESULTS ══════════════════════════════════════ */}
      <section className="py-20 relative overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0">
          <Image
            src="/res-bg.jpg"
            alt=""
            fill
            className="object-cover"
            style={{ opacity: 0.5, objectPosition: 'center 40%' }}
            sizes="100vw"
            quality={85}
          />
        </div>

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Section>
            <motion.div variants={itemVariants} className="mb-8">
              <span className="text-xs font-bold uppercase tracking-widest text-sunshine-blue mb-3 block">
                Fast Turnaround
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-sunshine-dark">
                Next-Day Results for Many TRT Tests
              </h2>
            </motion.div>

            <motion.div variants={itemVariants}>
              <MagicCard className="shadow-md hover:shadow-lg">
                <div className="p-7 text-gray-600 leading-relaxed space-y-4">
                  <p>
                    Here&apos;s where the chain labs really fall behind. At Sunshine Clinical Lab,
                    results for many of our most common TRT-related blood tests are available the
                    next business day. That means you&apos;re not sitting around for a week
                    wondering if your levels are off — you&apos;re getting actionable data fast so
                    you and your provider can make timely decisions.
                  </p>
                  <p>
                    Turnaround times vary by test type, but for standard panels including
                    testosterone, CBC, CMP, and estradiol, next-day results are the norm at our
                    Trinity lab — not the exception.
                  </p>
                </div>
              </MagicCard>
            </motion.div>
          </Section>
        </div>
      </section>

      {/* ══ AFFORDABLE PRICING ════════════════════════════════════ */}
      <section className="py-20 bg-white overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Section>
            <motion.div variants={itemVariants} className="mb-10">
              <span className="text-xs font-bold uppercase tracking-widest text-sunshine-blue mb-3 block">
                Transparent Pricing
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-sunshine-dark">
                Affordable TRT Blood Work — No Corporate Markup
              </h2>
            </motion.div>
            <motion.div
              variants={itemVariants}
              className="bg-sunshine-soft rounded-2xl p-8 space-y-4 text-gray-600 leading-relaxed"
            >
              <p>
                Large national labs charge premium prices because they can. Corporate overhead,
                massive facilities, and stockholder expectations drive those costs straight to your
                bill — whether you&apos;re paying out of pocket or dealing with insurance copays.
              </p>
              <p className="font-bold text-sunshine-dark">
                Sunshine Clinical Lab operates differently. As an independent, locally owned lab in
                Trinity, FL, our overhead is lower, our pricing is leaner, and we pass that directly
                to you.
              </p>
              <p>
                Contact our team at{' '}
                <a
                  href="tel:+17272335223"
                  className="text-sunshine-blue font-semibold hover:underline"
                >
                  (727) 233-5223
                </a>{' '}
                for current TRT panel pricing. Many of our patients are genuinely surprised at the
                difference compared to what they were paying at chain facilities.
              </p>
              <p>
                We accept most major insurance plans, and for self-pay patients, our rates are
                designed to make regular monitoring sustainable — not something you skip because of
                cost.
              </p>
            </motion.div>
          </Section>
        </div>
      </section>

      {/* ══ WALK-IN OR MOBILE ═════════════════════════════════════ */}
      <section className="py-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <Section>
          <motion.div variants={itemVariants} className="text-center mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-sunshine-blue mb-3 block">
              Your Choice
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-sunshine-dark">
              Walk-In or Mobile — Your Choice
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
            <motion.div variants={cardVariants} custom={0}>
              <MagicCard gradientColor="#93C5FD60" borderGlowColor="#2B7DBF" className="shadow-md hover:shadow-xl">
                <div className="p-7 flex flex-col gap-4 h-full">
                  <div className="w-12 h-12 rounded-2xl bg-sunshine-soft flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-sunshine-blue" />
                  </div>
                  <h3 className="text-lg font-bold text-sunshine-dark">
                    Walk-In TRT Blood Work at Our Trinity Location
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    Need your TRT labs drawn today? Walk in at{' '}
                    <span className="font-semibold text-sunshine-dark">
                      3600 Galileo Dr, Trinity, FL 34655
                    </span>
                    . We welcome walk-ins for most blood work, and many patients are in and out
                    within minutes.
                  </p>
                </div>
              </MagicCard>
            </motion.div>

            <motion.div variants={cardVariants} custom={2}>
              <MagicCard gradientColor="#93C5FD60" borderGlowColor="#2B7DBF" className="shadow-md hover:shadow-xl">
                <div className="p-7 flex flex-col gap-4 h-full">
                  <div className="w-12 h-12 rounded-2xl bg-sunshine-soft flex items-center justify-center flex-shrink-0">
                    <Home className="w-6 h-6 text-sunshine-blue" />
                  </div>
                  <h3 className="text-lg font-bold text-sunshine-dark">
                    Mobile TRT Blood Draws Across Pasco County
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    Prefer a mobile draw? Our phlebotomy team will come to your home or office
                    anywhere in Pasco County — Trinity, New Port Richey, Land O&apos; Lakes, Tarpon
                    Springs, and beyond. Same experienced professionals, same fast turnaround, zero
                    travel on your part.
                  </p>
                </div>
              </MagicCard>
            </motion.div>
          </div>

          <motion.div variants={itemVariants} className="flex justify-center">
            <a href="tel:+17272335223">
              <ShimmerButton className="bg-sunshine-blue text-white px-9 py-4 rounded-full font-bold shadow-xl text-lg gap-2">
                <Phone className="w-5 h-5" />
                Schedule Your TRT Blood Panel — (727) 233-5223
              </ShimmerButton>
            </a>
          </motion.div>
        </Section>
      </section>

      {/* ══ MID-PAGE CTA ════════════════════════════════════════ */}
      <section className="py-20 relative overflow-hidden bg-gradient-to-r from-sunshine-blue to-sunshine-sky">
        {/* Decorative circles */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full border border-white/10" />
          <div className="absolute -bottom-16 -left-16 w-72 h-72 rounded-full border border-white/10" />
          <div className="absolute top-1/2 left-1/4 w-40 h-40 rounded-full bg-white/[0.04]" />
          <div className="absolute top-1/4 right-1/3 w-24 h-24 rounded-full bg-white/[0.06]" />
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Section>
            <motion.span
              variants={itemVariants}
              className="inline-flex items-center gap-2 bg-white/20 border border-white/30 text-white px-4 py-1.5 rounded-full text-sm font-semibold mb-6"
            >
              TRT Testing — Trinity, FL
            </motion.span>

            <motion.h2
              variants={itemVariants}
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-5"
            >
              Stop Overpaying for TRT Labs.
              <br />
              <span className="text-[#93C5FD]">Stop Waiting for Results.</span>
            </motion.h2>

            <motion.p
              variants={itemVariants}
              className="text-white/80 text-lg leading-relaxed mb-10 max-w-2xl mx-auto"
            >
              Next-day results for many tests. Affordable, transparent pricing. Walk-ins welcome.
              Right here in Trinity, FL.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row justify-center gap-4 mb-12"
            >
              <a href="tel:+17272335223">
                <ShimmerButton className="bg-white text-sunshine-dark px-9 py-4 rounded-full font-bold shadow-2xl text-lg gap-2">
                  <Phone className="w-6 h-6" />
                  Call (727) 233-5223 to Book Your TRT Panel
                </ShimmerButton>
              </a>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-white/75 text-sm"
            >
              <span className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-white flex-shrink-0" />
                3600 Galileo Dr, Trinity, FL 34655
              </span>
              <span className="hidden sm:block text-white/30">|</span>
              <span className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-white flex-shrink-0" />
                Mon–Fri 8:00am–5:00pm
              </span>
            </motion.div>
          </Section>
        </div>
      </section>

      {/* ══ BUILT FOR MEN ═════════════════════════════════════════ */}
      <section className="py-20 overflow-hidden" style={{ backgroundColor: '#CCE9F7' }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Section>
            <motion.div variants={itemVariants} className="mb-10">
              <span className="text-xs font-bold uppercase tracking-widest text-sunshine-blue mb-3 block">
                Men&apos;s Health
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-sunshine-dark">
                Built for Men Who Take Their Health Seriously
              </h2>
            </motion.div>
            <motion.div
              variants={itemVariants}
              className="bg-white rounded-2xl p-8 space-y-4 text-gray-600 leading-relaxed shadow-md"
            >
              <p>
                Sunshine Clinical Lab isn&apos;t just a lab that happens to offer TRT blood tests.
                We&apos;ve invested in understanding the TRT community because we serve it daily —
                from guys on their first cycle of prescribed testosterone to veterans who&apos;ve
                been optimizing their protocols for years.
              </p>
              <p>
                We know the difference between a standard testosterone test and the comprehensive
                panel your provider actually needs. We know why sensitive estradiol matters versus
                the standard assay. And we know that when you need labs, you need them done right,
                done fast, and done without draining your bank account.
              </p>
              <p className="font-bold text-sunshine-dark text-lg">
                That&apos;s the Sunshine Clinical Lab difference for men&apos;s health in Pasco
                County.
              </p>
            </motion.div>
          </Section>
        </div>
      </section>

      {/* ══ FAQ ═════════════════════════════════════════════════ */}
      <section className="py-20 relative overflow-hidden bg-[#D6EAF8]">
        {/* Background image */}
        <div className="absolute inset-0">
          <Image
            src="/trt-faq.jpg"
            alt=""
            fill
            className="object-cover"
            style={{ opacity: 0.2 }}
            sizes="100vw"
          />
        </div>

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Section>
            <motion.div variants={itemVariants} className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-sunshine-blue shadow-lg mb-5">
                <HelpCircle className="w-7 h-7 text-white" />
              </div>
              <span className="text-xs font-bold uppercase tracking-widest text-sunshine-blue mb-3 block">
                Got Questions?
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-sunshine-dark">
                TRT Blood Testing — Frequently Asked Questions
              </h2>
              <p className="text-sunshine-dark/60 mt-4 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
                Everything you need to know before scheduling your TRT panel in Pasco County.
              </p>
            </motion.div>

            {/* 2-column accordion grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 lg:gap-4 lg:items-start mb-8">
              <div className="space-y-3">
                {col1.map((item, i) => (
                  <motion.div key={item.q} variants={itemVariants}>
                    <FaqItem
                      q={item.q}
                      a={item.a}
                      index={i}
                      isOpen={openFaq === i}
                      onToggle={() => toggleFaq(i)}
                    />
                  </motion.div>
                ))}
              </div>
              <div className="space-y-3">
                {col2.map((item, i) => (
                  <motion.div key={item.q} variants={itemVariants}>
                    <FaqItem
                      q={item.q}
                      a={item.a}
                      index={i + 4}
                      isOpen={openFaq === i + 4}
                      onToggle={() => toggleFaq(i + 4)}
                    />
                  </motion.div>
                ))}
              </div>
            </div>

            {/* CTA card below FAQ */}
            <motion.div
              variants={itemVariants}
              className="bg-white rounded-3xl border border-sunshine-sky/30 shadow-sm px-6 py-8 text-center"
            >
              <p className="text-sunshine-dark/60 text-sm mb-5">
                Can&apos;t find what you&apos;re looking for? Our team is happy to help.
              </p>
              <a href="tel:+17272335223">
                <ShimmerButton className="bg-sunshine-blue text-white px-8 py-3.5 rounded-full font-semibold shadow-lg gap-2">
                  <Phone className="w-5 h-5" />
                  Still Have Questions? Call (727) 233-5223
                </ShimmerButton>
              </a>
            </motion.div>
          </Section>
        </div>
      </section>

      {/* ══ FINAL CTA ═══════════════════════════════════════════ */}
      <section className="py-20 relative overflow-hidden bg-gradient-to-r from-sunshine-blue to-sunshine-sky">
        {/* Decorative circles */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full border border-white/10" />
          <div className="absolute -bottom-16 -left-16 w-72 h-72 rounded-full border border-white/10" />
          <div className="absolute top-1/2 left-1/4 w-40 h-40 rounded-full bg-white/[0.04]" />
          <div className="absolute top-1/4 right-1/3 w-24 h-24 rounded-full bg-white/[0.06]" />
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Section>
            <motion.span
              variants={itemVariants}
              className="inline-flex items-center gap-2 bg-white/20 border border-white/30 text-white px-4 py-1.5 rounded-full text-sm font-semibold mb-6"
            >
              Sunshine Clinical Lab — Trinity, FL
            </motion.span>

            <motion.h2
              variants={itemVariants}
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-5"
            >
              Stop Overpaying for TRT Labs.
              <br />
              <span className="text-[#93C5FD]">Stop Waiting for Results.</span>
            </motion.h2>

            <motion.p
              variants={itemVariants}
              className="text-white/80 text-lg leading-relaxed mb-4 max-w-2xl mx-auto"
            >
              Sunshine Clinical Lab gives you accurate, affordable TRT blood work with next-day
              results for many tests — without the chain lab wait or the chain lab price tag. Right
              here in Trinity, FL.
            </motion.p>

            <motion.p variants={itemVariants} className="text-white font-semibold text-lg mb-10">
              Call (727) 233-5223 or walk in today.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row justify-center gap-4 mb-12"
            >
              <a href="tel:+17272335223">
                <ShimmerButton className="bg-white text-sunshine-dark px-9 py-4 rounded-full font-bold shadow-2xl text-lg gap-2">
                  <Phone className="w-6 h-6" />
                  Call Now: (727) 233-5223
                </ShimmerButton>
              </a>
              <Link href="/book-appointment">
                <ShimmerButton className="bg-white/20 backdrop-blur-sm border-2 border-white text-white px-9 py-4 rounded-full font-semibold text-lg gap-2">
                  <CalendarDays className="w-5 h-5" />
                  Book Appointment
                </ShimmerButton>
              </Link>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-white/75 text-sm"
            >
              <span className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-white flex-shrink-0" />
                3600 Galileo Dr, Trinity, FL 34655, USA
              </span>
              <span className="hidden sm:block text-white/30">|</span>
              <span className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-white flex-shrink-0" />
                Mon–Fri 8:00am–5:00pm · Walk-Ins Welcome
              </span>
            </motion.div>
          </Section>
        </div>
      </section>

      {/* ══ INTERNAL LINKS ══════════════════════════════════════ */}
      <section className="py-14 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <Section>
          <motion.div variants={itemVariants}>
            <div className="bg-white rounded-2xl shadow-md p-7">
              <span className="text-xs font-bold uppercase tracking-widest text-sunshine-blue mb-4 block">
                Explore More
              </span>
              <div className="flex flex-wrap gap-3">
                {[
                  { href: '/', label: 'Home' },
                  { href: '/mobile-blood-draw-pasco-county', label: 'Mobile Blood Draw' },
                  { href: '/clinical-lab-services-trinity-fl', label: 'View All Lab Services' },
                  { href: '/insurance-accepted', label: 'Insurance Accepted' },
                  { href: '/clinical-lab-trinity-fl', label: 'Clinical Lab — Trinity' },
                  { href: '/clinical-lab-new-port-richey', label: 'Clinical Lab — New Port Richey' },
                  { href: '/clinical-lab-land-o-lakes-fl', label: "Clinical Lab — Land O' Lakes" },
                  { href: '/clinical-lab-tarpon-springs-fl', label: 'Clinical Lab — Tarpon Springs' },
                ].map(({ href, label }) => (
                  <Link
                    key={href}
                    href={href}
                    className="inline-flex items-center gap-1.5 bg-sunshine-soft text-sunshine-dark text-sm font-semibold px-4 py-2 rounded-full border border-sunshine-sky/40 hover:bg-sunshine-sky/40 hover:border-sunshine-blue/40 transition-colors"
                  >
                    {label}
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        </Section>
      </section>

    </div>
  );
}
