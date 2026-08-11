'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import {
  Phone,
  MapPin,
  Clock,
  CheckCircle,
  ChevronDown,
  Home,
  Users,
  Accessibility,
  Building2,
  Stethoscope,
  Repeat,
  HelpCircle,
  CalendarDays,
  ShieldCheck,
  Sunrise,
} from 'lucide-react';
import { ShimmerButton } from '@/registry/magicui/shimmer-button';
import MagicCard from '@/components/ui/MagicCard';

/* ─── Animation variants (matching site-wide landing page pattern) ─── */
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
  { x: 0, y: -60 },
  { x: 60, y: 0 },
  { x: -60, y: 0 },
  { x: 0, y: 60 },
  { x: 60, y: 0 },
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

/* ─── Section wrapper (scroll-triggered) ─── */
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

/* ─── Data ─── */
const WHO_ITEMS = [
  {
    Icon: Users,
    title: 'Retirees and Active Adults',
    body: "You're busy living your best life — golf, pickleball, lunch with friends. A mobile draw means lab work doesn't eat into your day. Our phlebotomist works around your schedule, including early morning fasting draws before your first tee time.",
  },
  {
    Icon: Accessibility,
    title: 'Patients With Mobility Challenges',
    body: "If getting in and out of the car is difficult, or driving to a lab creates unnecessary stress, our team comes to you. We're experienced with wheelchairs, walkers, and patients with limited mobility.",
  },
  {
    Icon: Building2,
    title: 'Residents of Assisted Living and Care Communities',
    body: 'We provide on-site blood draws at assisted living facilities, memory care communities, and nursing homes throughout the Bushnell and Villages area. No transport needed, no disruption to the patient\'s routine. Facility managers — call us to discuss a partnership.',
  },
  {
    Icon: Stethoscope,
    title: 'Patients With Difficult Veins',
    body: 'This is where our experience matters most. After 35+ years of combined phlebotomy experience, our team has drawn blood on every type of vein — thin, rolling, deep, scarred. If past lab visits have been painful or taken multiple attempts, you\'ll notice the difference immediately.',
  },
  {
    Icon: Repeat,
    title: 'Patients on Regular Monitoring',
    body: 'If your doctor has you on a quarterly or monthly blood work schedule — diabetes management, medication monitoring, thyroid tracking, TRT hormone panels — a recurring mobile draw saves you a trip to the lab every single time.',
  },
];

const STEPS = [
  {
    num: '01',
    title: 'Book Your Appointment',
    body: "Call (727) 233-5223 or book online. Tell us what tests you need (or have your doctor's order ready), your address, and your preferred time. Early morning and mid-morning slots available Monday through Friday.",
  },
  {
    num: '02',
    title: 'We Come to You',
    body: 'On your appointment day, our experienced phlebotomist arrives at your home with all supplies. The draw takes 10-20 minutes — comfortable, professional, and gentle.',
  },
  {
    num: '03',
    title: 'Fast Results',
    body: 'Your samples are transported to our laboratory under proper handling protocols. Results for many routine tests are available the next business day. Your doctor gets the results just as they would from any in-office lab visit.',
  },
];

const FAQ_ITEMS = [
  {
    q: 'How do I schedule a mobile blood draw in The Villages?',
    a: "Call Sunshine Clinical Lab at (727) 233-5223 or book online through our website. We'll confirm your address, the tests needed, any preparation requirements, and your preferred appointment time.",
  },
  {
    q: 'How early can I get a fasting blood draw at home?',
    a: 'Our phlebotomist is available starting as early as 3:00 AM for fasting blood work. Get your labs done before breakfast without leaving your home.',
  },
  {
    q: 'Do you accept insurance for mobile blood draws?',
    a: 'Yes, we accept most major insurance plans. We also offer competitive self-pay pricing for patients without insurance or who prefer to pay out of pocket. Call (727) 233-5223 to verify your coverage.',
  },
  {
    q: 'Do you serve assisted living facilities in The Villages area?',
    a: 'Yes. We provide on-site blood draws at assisted living facilities, memory care communities, and nursing homes. No patient transport needed. Contact us to discuss a partnership for your facility.',
  },
  {
    q: 'How fast will I get my results?',
    a: 'For many routine blood tests, results are available the next business day. Turnaround varies by test type. Our team will provide a timeline when you schedule.',
  },
  {
    q: 'What if I have difficult veins?',
    a: "Our phlebotomists have over 35 years of combined experience and specialize in difficult veins, thin skin, and patients who've had painful draws in the past. Being in your own home also helps you relax, which makes the draw easier.",
  },
  {
    q: 'What areas do you cover near The Villages?',
    a: 'We serve The Villages, Bushnell, Wildwood, Coleman, Webster, and surrounding Sumter County communities. Call (727) 233-5223 to confirm availability in your specific location.',
  },
];

/* ─── FAQ accordion item ─── */
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

/* ─── Main page component ─── */
export default function MobileBloodDrawTheVillagesPage() {
  const [openFaq, setOpenFaq] = useState(null);
  const toggleFaq = (i) => setOpenFaq((prev) => (prev === i ? null : i));

  const col1 = FAQ_ITEMS.slice(0, 4);
  const col2 = FAQ_ITEMS.slice(4);

  return (
    <div className="bg-sunshine-soft min-h-screen">

      {/* ══ STICKY CONVERSION BAR (only nav element on this landing page) ══ */}
      <div className="fixed top-0 left-0 right-0 z-[60]">
        <div className="relative bg-sunshine-dark shadow-lg">
          {/* Ambient brand-color wash, right side */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute -top-10 right-0 w-72 h-24 bg-sunshine-blue/25 blur-2xl rounded-full" />
          </div>

          <div className="relative max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-14 sm:h-16 flex items-center justify-between gap-2 sm:gap-4">
            {/* Logo — links home */}
            <Link href="/" className="flex-shrink-0 flex items-center overflow-hidden rounded-lg bg-white/95 px-2 py-1 sm:px-2.5 sm:py-1.5 shadow-sm">
              <Image
                src="/logo2.webp"
                alt="Sunshine Clinical Lab"
                height={40}
                width={132}
                className="h-6 sm:h-8 w-auto object-contain"
              />
            </Link>

            <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0 ml-auto">
              <a
                href="tel:+17272335223"
                className="group flex items-center gap-1.5 sm:gap-2 rounded-full border border-white/15 bg-white/5 px-2.5 sm:px-4 py-1.5 sm:py-2 font-semibold text-white text-[0.7rem] sm:text-sm whitespace-nowrap transition-colors hover:bg-white/10 hover:border-white/25"
              >
                <span className="flex items-center justify-center w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-sunshine-yellow flex-shrink-0">
                  <Phone className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-sunshine-dark" />
                </span>
                (727) 233-5223
              </a>
              <Link href="/book-appointment">
                <ShimmerButton className="bg-sunshine-blue text-white text-[0.7rem] sm:text-sm px-3 sm:px-5 py-1.5 sm:py-2.5 rounded-full font-semibold whitespace-nowrap shadow-md gap-1.5">
                  <CalendarDays className="w-3.5 h-3.5 sm:w-4 sm:h-4 hidden sm:inline" />
                  <span className="sm:hidden">Book Online</span>
                  <span className="hidden sm:inline">Book Your Home Draw</span>
                </ShimmerButton>
              </Link>
            </div>
          </div>

          {/* Accent underline */}
          <div className="h-[3px] w-full bg-gradient-to-r from-sunshine-yellow via-sunshine-sky to-sunshine-blue" />
        </div>
      </div>

      {/* Push page content below the sticky bar */}
      <div className="h-14 sm:h-16" />

      {/* ══ HERO ════════════════════════════════════════════════ */}
      <section className="relative w-full min-h-[85vh] flex items-center overflow-hidden">
        <Image
          src="/mbd-the-villages.webp"
          alt="Mobile Blood Draw Service The Villages and Bushnell FL"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-sunshine-dark/95 via-sunshine-dark/80 to-sunshine-blue/70" />
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full border border-white/5" />
          <div className="absolute bottom-20 -right-20 w-80 h-80 rounded-full border border-white/5" />
          <div className="absolute top-1/3 left-1/4 w-40 h-40 rounded-full bg-white/[0.03]" />
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28 pt-32">
          <motion.div
            variants={heroContainerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-2xl mr-auto text-left"
          >
            <motion.h1
              variants={heroItemVariants}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-4"
            >
              Mobile Blood Draw in The Villages &amp; Bushnell —{' '}
              <span className="text-[#93C5FD]">We Come to Your Home</span>
            </motion.h1>

            <motion.h2
              variants={heroItemVariants}
              className="text-2xl sm:text-3xl font-bold text-white/90 mb-4"
            >
              No Driving. No Waiting Room. Lab Work at Your Kitchen Table.
            </motion.h2>

            <motion.p
              variants={heroItemVariants}
              className="text-white/85 text-lg leading-relaxed mb-8 max-w-xl"
            >
              Sunshine Clinical Lab&apos;s experienced phlebotomist now serves The Villages,
              Bushnell, Wildwood, and surrounding Sumter County communities. Routine blood
              panels, fasting blood work, hormone testing, and more — all performed at your
              home with next-day results for many tests.
            </motion.p>

            <motion.div
              variants={heroItemVariants}
              className="flex flex-col sm:flex-row flex-wrap gap-4 justify-start mb-8"
            >
              <Link href="/book-appointment">
                <ShimmerButton className="bg-sunshine-blue border border-white/20 text-white px-7 py-3.5 rounded-full font-semibold shadow-lg text-base gap-2">
                  <CalendarDays className="w-4 h-4" />
                  Book Your Home Blood Draw
                </ShimmerButton>
              </Link>
              <a href="tel:+17272335223">
                <ShimmerButton className="bg-white text-sunshine-dark px-7 py-3.5 rounded-full font-bold shadow-xl text-base gap-2">
                  <Phone className="w-5 h-5" />
                  Call (727) 233-5223
                </ShimmerButton>
              </a>
            </motion.div>

            {/* Trust strip */}
            <motion.div
              variants={heroItemVariants}
              className="flex flex-wrap gap-2 sm:gap-3 justify-start"
            >
              {[
                '35+ Years Combined Experience',
                'Most Insurance Accepted',
                'Affordable Self-Pay',
                'Gentle With Difficult Veins',
                'Early Morning Draws Available',
              ].map((label) => (
                <span
                  key={label}
                  className="inline-flex items-center gap-1.5 bg-white/10 border border-white/20 text-white text-xs font-semibold px-3 py-1.5 rounded-full backdrop-blur-sm"
                >
                  <CheckCircle className="w-3.5 h-3.5 text-[#93C5FD] flex-shrink-0" />
                  {label}
                </span>
              ))}
            </motion.div>
          </motion.div>
        </div>

        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
          <svg viewBox="0 0 1440 72" preserveAspectRatio="none" className="w-full h-16 sm:h-20">
            <path
              d="M0,36 C240,72 480,0 720,36 C960,72 1200,0 1440,36 L1440,72 L0,72 Z"
              fill="#EBF5FB"
            />
          </svg>
        </div>
      </section>

      {/* ══ DIRECT ANSWER BLOCK (AEO / GEO) ═════════════════════ */}
      <section className="py-12 bg-[#EBF5FB]">
        <Section>
          <motion.div variants={itemVariants} className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
              <div className="h-1 w-full bg-gradient-to-r from-sunshine-blue to-sunshine-sky" />
              <div className="p-7 sm:p-9">
                <div className="flex items-center gap-2 mb-5">
                  <span className="inline-flex items-center gap-1.5 bg-sunshine-blue/10 text-sunshine-blue text-xs font-bold tracking-wide px-3 py-1.5 rounded-full">
                    <Home className="w-3.5 h-3.5" />
                    Mobile Phlebotomy — The Villages &amp; Sumter County
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-sunshine-dark mb-4">
                  Is There a Mobile Blood Draw Service Near The Villages, FL?
                </h2>
                <p className="text-gray-700 leading-relaxed text-base mb-7">
                  Yes. Sunshine Clinical Lab provides professional mobile blood draw services to
                  patients in The Villages, Bushnell, Wildwood, and surrounding Sumter County
                  areas. A licensed, experienced phlebotomist travels to your home, assisted
                  living facility, or care community to perform blood draws on-site. Services
                  include routine blood panels (CBC, CMP, lipid, A1C, thyroid), TRT/hormone
                  monitoring, DNA testing, and fasting blood work. Early morning appointments are
                  available starting at 3:00 AM for fasting draws. Most insurance is accepted and
                  competitive self-pay pricing is available. Call{' '}
                  <a
                    href="tel:+17272335223"
                    className="text-sunshine-blue font-semibold hover:underline"
                  >
                    (727) 233-5223
                  </a>{' '}
                  or book online to schedule.
                </p>
                <div className="flex flex-wrap gap-2 sm:gap-3">
                  {[
                    { icon: MapPin, label: 'The Villages & Sumter County' },
                    { icon: Sunrise, label: 'Fasting Draws From 3:00 AM' },
                    { icon: CheckCircle, label: 'Next-Day Results' },
                  ].map(({ icon: Icon, label }) => (
                    <span
                      key={label}
                      className="inline-flex items-center gap-1.5 bg-sunshine-soft border border-sunshine-blue/15 text-sunshine-dark text-xs font-semibold px-3 py-1.5 rounded-full"
                    >
                      <Icon className="w-3.5 h-3.5 text-sunshine-blue flex-shrink-0" />
                      {label}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </Section>
      </section>

      {/* ══ WHY VILLAGES & BUSHNELL RESIDENTS ARE CHOOSING HOME BLOOD DRAWS ══ */}
      <section className="py-20 bg-white overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Section>
            <motion.div variants={itemVariants} className="mb-10">
              <span className="text-xs font-bold uppercase tracking-widest text-sunshine-blue mb-3 block">
                Why Villages &amp; Bushnell Residents Are Choosing Home Blood Draws
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-sunshine-dark">
                Lab Work Should Come to You — Not the Other Way Around
              </h2>
            </motion.div>
            <motion.div
              variants={itemVariants}
              className="bg-sunshine-soft rounded-2xl mb-4 shadow-sm overflow-hidden"
            >
              <div className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-5 p-7 sm:p-8">
                <div className="w-12 h-12 rounded-2xl bg-sunshine-blue flex items-center justify-center flex-shrink-0 shadow-md">
                  <Home className="w-6 h-6 text-white" />
                </div>
                <div className="text-gray-600 leading-relaxed space-y-3">
                  <p>
                    You moved to The Villages or Bushnell for a reason — quality of life,
                    convenience, and the freedom to do things on your terms. Your lab work should
                    be no different. Instead of driving to a crowded chain lab, sitting in a
                    waiting room with 20 other patients, and hoping the phlebotomist can find your
                    vein on the first try — Sunshine Clinical Lab brings the lab to your door. Our
                    phlebotomist arrives at your home, your community clubhouse, or your assisted
                    living facility with everything needed to perform your blood draw
                    professionally, comfortably, and efficiently.
                  </p>
                </div>
              </div>
            </motion.div>
            <motion.div
              variants={itemVariants}
              className="bg-sunshine-blue rounded-2xl px-7 py-5 flex items-center gap-4"
            >
              <ShieldCheck className="w-6 h-6 text-white flex-shrink-0" />
              <p className="text-white font-semibold text-base leading-relaxed">
                You stay in your favorite chair. We handle the rest.
              </p>
            </motion.div>
          </Section>
        </div>
      </section>

      {/* ══ WHO OUR MOBILE BLOOD DRAW SERVICE IS FOR ═══════════════ */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Section>
          <motion.div variants={itemVariants} className="text-center mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-sunshine-blue mb-3 block">
              Who We Serve
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-sunshine-dark">
              Who Our Mobile Blood Draw Service Is For
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {WHO_ITEMS.map(({ Icon, title, body }, i) => (
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

          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/book-appointment">
              <ShimmerButton className="bg-sunshine-blue text-white px-8 py-3.5 rounded-full font-semibold shadow-lg gap-2">
                <CalendarDays className="w-5 h-5" />
                Book Your Home Blood Draw
              </ShimmerButton>
            </Link>
            <a href="tel:+17272335223">
              <ShimmerButton className="bg-white text-sunshine-dark border border-sunshine-blue/20 px-8 py-3.5 rounded-full font-semibold shadow-md gap-2">
                <Phone className="w-5 h-5" />
                Call (727) 233-5223 or Book Online
              </ShimmerButton>
            </a>
          </motion.div>
        </Section>
      </section>

      {/* ══ WHAT TESTS CAN BE DONE AT YOUR HOME ═══════════════════ */}
      <section className="py-20 bg-white overflow-hidden relative">
        <div className="absolute inset-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
            style={{ opacity: 0.5 }}
          >
            <source src="/mbd-test.mp4" type="video/mp4" />
          </video>
        </div>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <Section>
            <motion.div variants={itemVariants} className="mb-10">
              <span className="text-xs font-bold uppercase tracking-widest text-sunshine-blue mb-3 block">
                Tests Available
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-sunshine-dark">
                What Tests Can Be Done at Your Home?
              </h2>
            </motion.div>

            <motion.div variants={itemVariants}>
              <div className="bg-sunshine-soft rounded-2xl p-8 mb-6 text-gray-600 leading-relaxed">
                <p>
                  Nearly every test we offer at our Trinity, FL laboratory can be performed at
                  your home in The Villages and Bushnell area, including:
                </p>
              </div>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
              {[
                {
                  title: 'Routine Blood Panels',
                  body: 'Complete Blood Count (CBC), Comprehensive Metabolic Panel (CMP), lipid panels, Hemoglobin A1C, thyroid panels (TSH, T3, T4), liver and kidney function panels, and all standard physician-ordered blood work.',
                },
                {
                  title: 'TRT & Hormone Monitoring',
                  body: 'Total and free testosterone, estradiol (E2), hematocrit, PSA, SHBG, LH, FSH, CBC, and CMP. Complete TRT monitoring panels with next-day results for many tests.',
                },
                {
                  title: 'DNA Testing',
                  body: 'Legal DNA testing, immigration DNA testing (USCIS), paternity testing, and relationship DNA testing. Chain-of-custody protocols available when legal admissibility is required.',
                },
                {
                  title: 'Fasting Blood Work',
                  body: 'Early morning draws starting as early as 3:00 AM — get your fasting labs done before breakfast, without leaving your house.',
                },
              ].map(({ title, body }) => (
                <motion.div key={title} variants={itemVariants}>
                  <MagicCard gradientColor="#93C5FD60" borderGlowColor="#2B7DBF" className="shadow-md hover:shadow-xl h-full">
                    <div className="p-7 flex flex-col gap-3 h-full">
                      <h3 className="text-lg font-bold text-sunshine-dark">{title}</h3>
                      <p className="text-gray-500 text-sm leading-relaxed">{body}</p>
                    </div>
                  </MagicCard>
                </motion.div>
              ))}
            </div>

            <motion.p variants={itemVariants} className="text-center text-gray-700 italic">
              Some tests may require specific preparation such as fasting. When you schedule, our
              team will walk you through everything you need to do before your draw.
            </motion.p>
          </Section>
        </div>
      </section>

      {/* ══ HOW IT WORKS ════════════════════════════════════════ */}
      <section className="py-20 bg-white overflow-hidden relative">
        <div className="absolute inset-0">
          <Image
            src="/mbd-sp.jpg"
            alt=""
            fill
            className="object-cover"
            style={{ opacity: 0.3 }}
            sizes="100vw"
          />
        </div>
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Section>
            <motion.div variants={itemVariants} className="text-center mb-14">
              <span className="text-xs font-bold uppercase tracking-widest text-sunshine-blue mb-3 block">
                Simple Process
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-sunshine-dark">
                How It Works — 3 Simple Steps
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
              {STEPS.map((step, i) => (
                <motion.div key={step.num} variants={cardVariants} custom={i}>
                  <MagicCard gradientColor="#93C5FD60" borderGlowColor="#2B7DBF" className="shadow-md hover:shadow-xl">
                    <div className="p-7 flex flex-col gap-4 h-full">
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#6BB6E8] to-[#2B7DBF] text-white flex items-center justify-center font-extrabold text-lg flex-shrink-0">
                        {step.num}
                      </div>
                      <h3 className="text-lg font-bold text-sunshine-dark">
                        Step {i + 1}: {step.title}
                      </h3>
                      <p className="text-gray-500 text-sm leading-relaxed">{step.body}</p>
                    </div>
                  </MagicCard>
                </motion.div>
              ))}
            </div>

            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/book-appointment">
                <ShimmerButton className="bg-sunshine-blue text-white px-8 py-3.5 rounded-full font-semibold shadow-lg gap-2">
                  <CalendarDays className="w-5 h-5" />
                  Book Now
                </ShimmerButton>
              </Link>
              <a href="tel:+17272335223">
                <ShimmerButton className="bg-white text-sunshine-dark border border-sunshine-blue/20 px-8 py-3.5 rounded-full font-semibold shadow-md gap-2">
                  <Phone className="w-5 h-5" />
                  Or Call (727) 233-5223
                </ShimmerButton>
              </a>
            </motion.div>
          </Section>
        </div>
      </section>

      {/* ══ AFFORDABLE PRICING ══════════════════════════════════ */}
      <section className="py-20 relative overflow-hidden bg-gradient-to-r from-sunshine-blue to-sunshine-sky">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full border border-white/10" />
          <div className="absolute -bottom-16 -left-16 w-72 h-72 rounded-full border border-white/10" />
          <div className="absolute top-1/2 left-1/4 w-40 h-40 rounded-full bg-white/[0.04]" />
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Section>
            <motion.h2
              variants={itemVariants}
              className="text-3xl sm:text-4xl font-extrabold text-white leading-tight mb-6"
            >
              Affordable Pricing — Insurance and Self-Pay Welcome
            </motion.h2>

            <motion.p variants={itemVariants} className="text-white/85 text-lg leading-relaxed mb-4 max-w-2xl mx-auto">
              We accept most major insurance plans. For patients who prefer to pay out of pocket
              or don&apos;t have insurance, we offer competitive self-pay pricing that&apos;s
              often significantly more affordable than chain lab facilities.
            </motion.p>

            <motion.p variants={itemVariants} className="text-white/85 text-lg leading-relaxed mb-10 max-w-2xl mx-auto">
              Contact us at (727) 233-5223 for current pricing on any test. No surprise bills, no
              hidden fees. We&apos;ll tell you what it costs before your appointment.
            </motion.p>

            <motion.div variants={itemVariants}>
              <a href="tel:+17272335223">
                <ShimmerButton className="bg-white text-sunshine-dark px-9 py-4 rounded-full font-bold shadow-2xl text-lg gap-2">
                  <Phone className="w-6 h-6" />
                  Call (727) 233-5223
                </ShimmerButton>
              </a>
            </motion.div>
          </Section>
        </div>
      </section>

      {/* ══ SERVICE AREA ════════════════════════════════════════ */}
      <section className="py-20 bg-[#EBF5FB] overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Section>
            <motion.div variants={itemVariants} className="mb-8">
              <span className="text-xs font-bold uppercase tracking-widest text-sunshine-blue mb-3 block">
                Coverage Area
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-sunshine-dark">
                Serving The Villages, Bushnell &amp; Surrounding Communities
              </h2>
            </motion.div>

            <motion.div variants={itemVariants} className="mb-6">
              <div className="bg-white rounded-2xl shadow-md overflow-hidden">
                <div className="flex items-center gap-4 px-7 pt-7 pb-4">
                  <div className="w-10 h-10 rounded-xl bg-sunshine-blue flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-sunshine-dark">Where We Go</h3>
                </div>
                <div className="px-7 pb-7 space-y-4">
                  <p className="text-gray-600 leading-relaxed">
                    Our mobile phlebotomist covers The Villages, Bushnell, Wildwood, Coleman,
                    Webster, and surrounding Sumter County communities. If you&apos;re within the
                    33515, 32159, 32162, 32163, or surrounding zip codes, we can likely come to
                    you.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {['The Villages', 'Bushnell', 'Wildwood', 'Coleman', 'Webster'].map((city) => (
                      <span
                        key={city}
                        className="inline-flex items-center gap-1.5 bg-sunshine-soft border border-sunshine-blue/15 text-sunshine-dark text-xs font-semibold px-3 py-1.5 rounded-full"
                      >
                        <MapPin className="w-3 h-3 text-sunshine-blue flex-shrink-0" />
                        {city}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-start gap-3 bg-sunshine-blue/5 border-l-4 border-sunshine-blue rounded-r-xl p-4">
                    <p className="text-gray-600 text-sm leading-relaxed">
                      Not sure if we cover your area? Call{' '}
                      <a href="tel:+17272335223" className="text-sunshine-blue font-semibold hover:underline">
                        (727) 233-5223
                      </a>{' '}
                      and we&apos;ll confirm.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <div className="bg-white rounded-2xl shadow-md overflow-hidden">
                <div className="flex items-center gap-4 px-7 pt-7 pb-4">
                  <div className="w-10 h-10 rounded-xl bg-sunshine-blue flex items-center justify-center flex-shrink-0">
                    <Building2 className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-sunshine-dark">
                    Assisted Living &amp; Care Facility Partnerships
                  </h3>
                </div>
                <div className="px-7 pb-7">
                  <p className="text-gray-600 leading-relaxed">
                    If you manage an assisted living facility, memory care community, or nursing
                    home in The Villages or Bushnell area and want to offer on-site blood draws
                    for your residents, we&apos;d welcome the conversation. One call can set up a
                    partnership that makes life easier for your residents and your staff. Call{' '}
                    <a href="tel:+17272335223" className="text-sunshine-blue font-semibold hover:underline">
                      (727) 233-5223
                    </a>
                    .
                  </p>
                </div>
              </div>
            </motion.div>
          </Section>
        </div>
      </section>

      {/* ══ FAQ ═════════════════════════════════════════════════ */}
      <section className="py-20 relative overflow-hidden bg-[#D6EAF8]">
        <div className="absolute inset-0">
          <Image
            src="/mbd-faq.jpg"
            alt=""
            fill
            className="object-cover"
            style={{ opacity: 0.5 }}
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
                Mobile Blood Draw — The Villages Area FAQs
              </h2>
            </motion.div>

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

      {/* ══ EXPLORE MORE / INTERNAL LINKS ═══════════════════════ */}
      <section className="py-16 bg-white overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Section>
            <motion.div variants={itemVariants} className="text-center mb-10">
              <span className="text-xs font-bold uppercase tracking-widest text-sunshine-blue mb-3 block">
                Explore More
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-sunshine-dark">
                More From Sunshine Clinical Lab
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
              {[
                {
                  href: '/mobile-blood-draw-pasco-county',
                  title: 'Mobile Blood Draw — Pasco County',
                  body: 'Our main mobile phlebotomy service page covering Trinity, New Port Richey, and all of Pasco County.',
                },
                {
                  href: '/trt-blood-test-pasco-county',
                  title: 'TRT Blood Testing',
                  body: 'Testosterone, estradiol, hematocrit, and full TRT monitoring panels — available at home or in-office.',
                },
                {
                  href: '/dna-testing-pasco-county',
                  title: 'DNA Testing',
                  body: 'Legal, immigration, and paternity DNA testing with chain-of-custody protocols when required.',
                },
                {
                  href: '/clinical-lab-services-trinity-fl',
                  title: 'All Lab Services',
                  body: 'Browse our full menu of clinical lab testing available at our Trinity, FL laboratory.',
                },
                {
                  href: '/insurance-accepted',
                  title: 'Insurance We Accept',
                  body: 'See the major insurance plans we accept, plus our self-pay pricing options.',
                },
                {
                  href: '/',
                  title: 'Sunshine Clinical Lab Home',
                  body: 'Learn more about Sunshine Clinical Lab and everything we offer across Pasco County.',
                },
              ].map(({ href, title, body }, i) => (
                <motion.div key={href} variants={cardVariants} custom={i}>
                  <Link href={href} className="block h-full">
                    <MagicCard gradientColor="#93C5FD60" borderGlowColor="#2B7DBF" className="shadow-sm hover:shadow-lg h-full">
                      <div className="p-6 flex flex-col gap-2 h-full">
                        <h3 className="text-base font-bold text-sunshine-dark">{title}</h3>
                        <p className="text-gray-500 text-sm leading-relaxed flex-1">{body}</p>
                        <span className="text-sunshine-blue text-sm font-semibold mt-1">Learn more →</span>
                      </div>
                    </MagicCard>
                  </Link>
                </motion.div>
              ))}
            </div>
          </Section>
        </div>
      </section>

      {/* ══ FINAL CTA ═══════════════════════════════════════════ */}
      <section className="py-20 relative overflow-hidden bg-gradient-to-r from-sunshine-blue to-sunshine-sky">
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
              Sunshine Clinical Lab LLC
            </motion.span>

            <motion.h2
              variants={itemVariants}
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-5"
            >
              Your Lab Work. Your Home.
              <br />
              <span className="text-[#93C5FD]">Your Schedule.</span>
            </motion.h2>

            <motion.p
              variants={itemVariants}
              className="text-white/80 text-lg leading-relaxed mb-4 max-w-2xl mx-auto"
            >
              Stop rearranging your day around a lab appointment. Sunshine Clinical Lab brings
              experienced, gentle phlebotomy to your door in The Villages, Bushnell, and
              surrounding communities.
            </motion.p>

            <motion.p variants={itemVariants} className="text-white font-semibold text-lg mb-10">
              Book online now or call (727) 233-5223.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row justify-center gap-4 mb-12"
            >
              <Link href="/book-appointment">
                <ShimmerButton className="bg-white text-sunshine-dark px-9 py-4 rounded-full font-bold shadow-2xl text-lg gap-2">
                  <CalendarDays className="w-6 h-6" />
                  Book Your Home Blood Draw
                </ShimmerButton>
              </Link>
              <a href="tel:+17272335223">
                <ShimmerButton className="bg-white/20 backdrop-blur-sm border-2 border-white text-white px-9 py-4 rounded-full font-semibold text-lg gap-2">
                  <Phone className="w-5 h-5" />
                  Call (727) 233-5223
                </ShimmerButton>
              </a>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-white/75 text-sm"
            >
              <span className="flex items-center gap-2 text-center">
                <MapPin className="w-5 h-5 text-white flex-shrink-0" />
                Sunshine Clinical Lab LLC — 3600 Galileo Dr, Suite 104, Trinity, FL 34655
              </span>
            </motion.div>
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-white/75 text-sm mt-3"
            >
              <span className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-white flex-shrink-0" />
                Serving The Villages, Bushnell, Wildwood &amp; Sumter County
              </span>
            </motion.div>
          </Section>
        </div>
      </section>

    </div>
  );
}
