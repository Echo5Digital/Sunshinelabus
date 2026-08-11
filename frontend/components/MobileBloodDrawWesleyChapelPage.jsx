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
  Activity,
  Fingerprint,
  Sunrise,
  Languages,
  HelpCircle,
  CalendarDays,
  ShieldCheck,
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
const SERVICES = [
  {
    Icon: Activity,
    title: 'Routine Blood Work',
    body: 'CBC, CMP, lipid panels, A1C, thyroid panels, liver and kidney function, and all physician-ordered blood work. Next-day results for many tests.',
  },
  {
    Icon: ShieldCheck,
    title: 'TRT & Testosterone Monitoring',
    body: "Full TRT panels including total and free testosterone, estradiol, hematocrit, PSA, SHBG, LH, FSH, CBC, and CMP. If you're on testosterone replacement therapy, this saves you a trip to the lab every 6-12 weeks. Affordable pricing that beats the chain labs.",
  },
  {
    Icon: Fingerprint,
    title: 'DNA Testing',
    body: 'Legal paternity testing, immigration DNA testing (USCIS), and relationship testing. Chain-of-custody protocols for legal admissibility when required.',
  },
  {
    Icon: Sunrise,
    title: 'Fasting Blood Work — Before Dawn',
    body: 'Early morning draws starting at 3:00 AM for patients who need fasting labs. Get it done before your day begins — no skipping breakfast at the office, no rearranging your morning.',
  },
  {
    Icon: Languages,
    title: 'Spanish-Speaking Phlebotomist Available',
    body: "Nuestro flebotomista habla español. If you or a family member is more comfortable communicating in Spanish, we've got you covered. Just let us know when you book.",
  },
];

const STEPS = [
  {
    num: '01',
    title: 'Book Online or Call',
    body: 'Schedule through our website or call (727) 233-5223. Select "Wesley Chapel" as your area, choose your preferred time slot, and let us know what tests you need.',
  },
  {
    num: '02',
    title: 'We Come to You',
    body: 'Our phlebotomist arrives at your Wesley Chapel home or office with all supplies. Professional, efficient, and done in 10-20 minutes.',
  },
  {
    num: '03',
    title: 'Results — Fast',
    body: 'Samples are transported to our lab and processed with the same speed as in-office draws. Results for many routine tests are available the next business day.',
  },
];

const FAQ_ITEMS = [
  {
    q: 'How do I book a mobile blood draw in Wesley Chapel?',
    a: 'Call (727) 233-5223 or book online. Select "Wesley Chapel" as your service area and choose your preferred appointment time.',
  },
  {
    q: 'How early can I get blood drawn at home in Wesley Chapel?',
    a: 'Our phlebotomist is available starting at 3:00 AM for early morning fasting draws. Morning appointments run from 9:00 AM to 2:30 PM.',
  },
  {
    q: 'Do you offer TRT blood work at home in Wesley Chapel?',
    a: 'Yes. We provide complete TRT monitoring panels at your home — total/free testosterone, estradiol, hematocrit, PSA, CBC, CMP, and more. Next-day results for many tests at affordable pricing.',
  },
  {
    q: 'Is a Spanish-speaking phlebotomist available in Wesley Chapel?',
    a: "Yes. Our phlebotomist speaks fluent Spanish. Let us know when booking if you'd prefer your appointment in Spanish.",
  },
  {
    q: 'What zip codes do you cover in Wesley Chapel?',
    a: 'We cover 33544, 33545, and surrounding areas including Wiregrass, Seven Oaks, Meadow Pointe, Bexley, and nearby communities.',
  },
  {
    q: 'Do you accept insurance for home blood draws in Wesley Chapel?',
    a: 'Yes, most major insurance plans are accepted. We also offer competitive self-pay pricing. Call (727) 233-5223 to verify your coverage.',
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
export default function MobileBloodDrawWesleyChapelPage() {
  const [openFaq, setOpenFaq] = useState(null);
  const toggleFaq = (i) => setOpenFaq((prev) => (prev === i ? null : i));

  const col1 = FAQ_ITEMS.slice(0, 3);
  const col2 = FAQ_ITEMS.slice(3);

  return (
    <div className="bg-sunshine-soft min-h-screen">

      {/* ══ STICKY CONVERSION BAR (only nav element on this landing page) ══ */}
      <div className="fixed top-0 left-0 right-0 z-[60]">
        <div className="relative bg-sunshine-dark shadow-lg">
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute -top-10 right-0 w-72 h-24 bg-sunshine-blue/25 blur-2xl rounded-full" />
          </div>

          <div className="relative max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-14 sm:h-16 flex items-center justify-between gap-2 sm:gap-4">
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

          <div className="h-[3px] w-full bg-gradient-to-r from-sunshine-yellow via-sunshine-sky to-sunshine-blue" />
        </div>
      </div>

      {/* Push page content below the sticky bar */}
      <div className="h-14 sm:h-16" />

      {/* ══ HERO ════════════════════════════════════════════════ */}
      <section className="relative w-full min-h-[85vh] flex items-center overflow-hidden">
        <Image
          src="/mbd-banner.jpg"
          alt="Mobile Blood Draw Service Wesley Chapel FL"
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
              Mobile Blood Draw in Wesley Chapel, FL —{' '}
              <span className="text-[#93C5FD]">Lab Work at Your Door</span>
            </motion.h1>

            <motion.h2
              variants={heroItemVariants}
              className="text-2xl sm:text-3xl font-bold text-white/90 mb-4"
            >
              Before Work. After School Drop-Off. On Your Lunch Break. We Work Around You.
            </motion.h2>

            <motion.p
              variants={heroItemVariants}
              className="text-white/85 text-lg leading-relaxed mb-8 max-w-xl"
            >
              Sunshine Clinical Lab now offers professional mobile blood draws throughout
              Wesley Chapel and surrounding communities. Routine panels, TRT hormone
              monitoring, DNA testing, and fasting blood work — all performed at your home or
              office by an experienced phlebotomist.
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
                '35+ Years Experience',
                'Early Morning Draws (Starting 3 AM)',
                'Most Insurance Accepted',
                'Affordable Self-Pay',
                'Spanish-Speaking Phlebotomist Available',
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
                    Mobile Phlebotomy — Wesley Chapel
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-sunshine-dark mb-4">
                  Can I Get a Mobile Blood Draw in Wesley Chapel, FL?
                </h2>
                <p className="text-gray-700 leading-relaxed text-base mb-7">
                  Yes. Sunshine Clinical Lab provides mobile blood draw services in Wesley
                  Chapel, FL, including the 33544 and 33545 zip codes. A licensed phlebotomist
                  travels to your home or office to perform blood draws. Services include
                  routine blood panels (CBC, CMP, lipid, A1C), TRT/testosterone monitoring, DNA
                  testing, and fasting blood work. Early morning appointments are available
                  starting at 3:00 AM. A Spanish-speaking phlebotomist is available. Most
                  insurance is accepted and affordable self-pay pricing is available. Call{' '}
                  <a
                    href="tel:+17272335223"
                    className="text-sunshine-blue font-semibold hover:underline"
                  >
                    (727) 233-5223
                  </a>{' '}
                  or book online.
                </p>
                <div className="flex flex-wrap gap-2 sm:gap-3">
                  {[
                    { icon: MapPin, label: 'Zip Codes 33544 & 33545' },
                    { icon: Sunrise, label: 'Fasting Draws From 3:00 AM' },
                    { icon: Languages, label: 'Spanish-Speaking Phlebotomist' },
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

      {/* ══ MAIN CONTENT ═════════════════════════════════════════ */}
      <section className="py-20 bg-white overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Section>
            <motion.div variants={itemVariants} className="mb-10">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-sunshine-dark">
                Wesley Chapel&apos;s Fastest-Growing Community Deserves a Faster Lab Experience
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
                    Wesley Chapel moves fast — Wiregrass, The Shops, new developments going up
                    every month, schools at capacity, and a population that values efficiency
                    and convenience above all. You don&apos;t have time to sit in a chain lab
                    for an hour.
                  </p>
                  <p>
                    Sunshine Clinical Lab gets it. Our mobile phlebotomy service brings
                    professional blood draws directly to your home, your office, or wherever
                    you are in Wesley Chapel — on a schedule that fits your life, not the other
                    way around.
                  </p>
                  <p>
                    Need fasting blood work done before your 8 AM meeting? We have appointments
                    starting at 3:00 AM. Need TRT monitoring labs but can&apos;t take time off?
                    We draw at your home office while you answer emails. Need blood work for
                    your kids before school? We handle pediatric draws too.
                  </p>
                </div>
              </div>
            </motion.div>
          </Section>
        </div>
      </section>

      {/* ══ EVERY SERVICE, EVERYWHERE IN WESLEY CHAPEL ═════════════ */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Section>
          <motion.div variants={itemVariants} className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-sunshine-dark">
              Every Service, Everywhere in Wesley Chapel
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {SERVICES.map(({ Icon, title, body }, i) => (
              <motion.div key={title} variants={cardVariants} custom={i}>
                <MagicCard gradientColor="#93C5FD60" borderGlowColor="#2B7DBF" className="shadow-md hover:shadow-xl h-full">
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
            <a href="tel:+17272335223">
              <ShimmerButton className="bg-sunshine-blue text-white px-8 py-3.5 rounded-full font-semibold shadow-lg gap-2">
                <Phone className="w-5 h-5" />
                Book Your Wesley Chapel Home Draw — Call (727) 233-5223
              </ShimmerButton>
            </a>
            <Link href="/book-appointment">
              <ShimmerButton className="bg-white text-sunshine-dark border border-sunshine-blue/20 px-8 py-3.5 rounded-full font-semibold shadow-md gap-2">
                <CalendarDays className="w-5 h-5" />
                Book Online
              </ShimmerButton>
            </Link>
          </motion.div>
        </Section>
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
              <h2 className="text-3xl sm:text-4xl font-extrabold text-sunshine-dark">
                How It Works
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
                        {i + 1}. {step.title}
                      </h3>
                      <p className="text-gray-500 text-sm leading-relaxed">{step.body}</p>
                    </div>
                  </MagicCard>
                </motion.div>
              ))}
            </div>
          </Section>
        </div>
      </section>

      {/* ══ SERVICE AREA ════════════════════════════════════════ */}
      <section className="py-20 bg-[#EBF5FB] overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Section>
            <motion.div variants={itemVariants} className="mb-8">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-sunshine-dark">
                Serving All of Wesley Chapel and Surrounding Areas
              </h2>
            </motion.div>

            <motion.div variants={itemVariants}>
              <div className="bg-white rounded-2xl shadow-md overflow-hidden">
                <div className="flex items-center gap-4 px-7 pt-7 pb-4">
                  <div className="w-10 h-10 rounded-xl bg-sunshine-blue flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-sunshine-dark">Where We Go</h3>
                </div>
                <div className="px-7 pb-7 space-y-4">
                  <p className="text-gray-600 leading-relaxed">
                    Our mobile phlebotomy service covers Wesley Chapel (33544, 33545),
                    Wiregrass, Seven Oaks, Meadow Pointe, Bexley, Epperson, Chapel Pines, and
                    surrounding communities. We also serve nearby Land O&apos; Lakes,
                    Zephyrhills, and New Tampa areas.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {['Wesley Chapel', 'Wiregrass', 'Seven Oaks', 'Meadow Pointe', 'Bexley', 'Epperson', 'Chapel Pines'].map((city) => (
                      <span
                        key={city}
                        className="inline-flex items-center gap-1.5 bg-sunshine-soft border border-sunshine-blue/15 text-sunshine-dark text-xs font-semibold px-3 py-1.5 rounded-full"
                      >
                        <MapPin className="w-3 h-3 text-sunshine-blue flex-shrink-0" />
                        {city}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </Section>
        </div>
      </section>

      {/* ══ INSURANCE ACCEPTED — SELF-PAY WELCOME ══════════════════ */}
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
              Insurance Accepted — Self-Pay Welcome
            </motion.h2>

            <motion.p variants={itemVariants} className="text-white/85 text-lg leading-relaxed mb-10 max-w-2xl mx-auto">
              We accept most major insurance plans. For self-pay patients, our pricing is
              consistently more affordable than chain labs. Call (727) 233-5223 for current
              rates — no surprises, no hidden fees.
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
              <h2 className="text-3xl sm:text-4xl font-extrabold text-sunshine-dark">
                Wesley Chapel Mobile Blood Draw — FAQs
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
                      index={i + 3}
                      isOpen={openFaq === i + 3}
                      onToggle={() => toggleFaq(i + 3)}
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
              Wesley Chapel — Your Lab Work,
              <br />
              <span className="text-[#93C5FD]">Your Way.</span>
            </motion.h2>

            <motion.p
              variants={itemVariants}
              className="text-white/80 text-lg leading-relaxed mb-4 max-w-2xl mx-auto"
            >
              Professional mobile blood draws. Early morning availability. TRT monitoring. DNA
              testing. Spanish-speaking phlebotomist. All at your Wesley Chapel home or office.
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
                Serving Wesley Chapel, Wiregrass, Seven Oaks &amp; Surrounding Communities
              </span>
            </motion.div>
          </Section>
        </div>
      </section>

    </div>
  );
}
