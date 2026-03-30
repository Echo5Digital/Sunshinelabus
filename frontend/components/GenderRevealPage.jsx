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
  ArrowRight,
  CalendarDays,
  HelpCircle,
  Heart,
  Baby,
  Shield,
  Gift,
  Star,
  Users,
  FlaskConical,
  Sparkles,
} from 'lucide-react';
import { ShimmerButton } from '@/registry/magicui/shimmer-button';
import MagicCard from '@/components/ui/MagicCard';

/* ─── Animation variants (matching homepage / TRTBloodTestPage) ─── */
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
  { x: 60,  y: 0 },
  { x: -60, y: 0 },
  { x: 60,  y: 0 },
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

/* ─── Section wrapper (scroll-triggered) ─────────────────────── */
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

/* ─── Data ────────────────────────────────────────────────────── */
const WHY_ITEMS = [
  {
    Icon: Heart,
    title: "It's Early — Dramatically Early",
    body: "Knowing your baby's gender at 7 weeks gives you months of extra time to plan, shop, dream, and prepare — long before a standard anatomy ultrasound would provide the same information. That's nearly three additional months of knowing.",
  },
  {
    Icon: Gift,
    title: 'It Fuels Unforgettable Moments',
    body: "Many of our patients use their sealed results to plan gender reveal parties for family and friends. Balloon pops, cake cuttings, confetti cannons, fireworks — we've heard about all of them. Some couples choose to open their results together in a quiet, private moment. However you want to experience the news, we're thrilled to be part of making it happen.",
  },
  {
    Icon: CheckCircle,
    title: "It's Simple and Comfortable",
    body: "The test is a straightforward blood draw performed at our Trinity, FL lab by experienced phlebotomists. The whole appointment takes minutes. No fasting required. No special preparation. No stress.",
  },
  {
    Icon: Star,
    title: 'It Satisfies the Curiosity',
    body: "Let's be real — for many parents, the wait until 20 weeks feels like an eternity. The Peekaboo test is the answer to every \"I just need to know\" text you've sent your partner at 2 AM.",
  },
];

const FAQ_ITEMS = [
  {
    q: 'How early can the Peekaboo gender reveal test be done?',
    a: "The Peekaboo test can determine your baby's gender as early as 7 weeks into pregnancy. This is significantly earlier than a traditional anatomy ultrasound, which typically occurs around 18 to 20 weeks.",
  },
  {
    q: 'Is the Peekaboo gender reveal blood test accurate?',
    a: 'The Peekaboo test is a clinically validated, non-invasive blood test that is widely regarded as one of the most reliable early gender determination methods available in the United States.',
  },
  {
    q: 'Is the gender reveal blood test safe for my baby?',
    a: "Yes. The test involves a simple blood draw from the mother's arm — the same type of draw used for routine prenatal blood work. It is completely non-invasive to the baby and carries no additional risk beyond a standard blood draw.",
  },
  {
    q: 'How long does it take to get gender reveal test results?',
    a: 'Results are typically available within a few business days after your blood draw at our Trinity, FL location. Our team will give you an estimated timeline when you schedule your appointment.',
  },
  {
    q: "Do I need a doctor's order for the Peekaboo gender reveal blood test?",
    a: 'Contact our office at (727) 233-5223 for specific requirements and scheduling details. Our team will walk you through everything needed for your appointment.',
  },
  {
    q: 'Can I get my results in a sealed envelope for a gender reveal party?',
    a: "Absolutely. Let us know when you schedule, and we'll seal your results so you can plan the perfect reveal moment — whether that's a party, a private opening, or handing the envelope to your baker or party planner.",
  },
  {
    q: 'How much does the gender reveal blood test cost at Sunshine Clinical Lab?',
    a: 'Contact our team at (727) 233-5223 for current Peekaboo test pricing. The test is competitively priced and is a straightforward out-of-pocket expense for most families. This service is typically not covered by insurance — learn more about our accepted insurance on our insurance page.',
  },
  {
    q: 'Where is Sunshine Clinical Lab located for the gender reveal test?',
    a: "Our lab is located at 3600 Galileo Dr, Trinity, FL 34655 — easily accessible from New Port Richey, Land O' Lakes, Tarpon Springs, and communities across Pasco County and Tampa Bay. Free parking is on site.",
  },
];

/* ─── FAQ accordion item ──────────────────────────────────────── */
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

/* ─── Main page component ─────────────────────────────────────── */
export default function GenderRevealPage() {
  const [openFaq, setOpenFaq] = useState(null);
  const toggleFaq = (i) => setOpenFaq((prev) => (prev === i ? null : i));

  const col1 = FAQ_ITEMS.slice(0, 4);
  const col2 = FAQ_ITEMS.slice(4);

  return (
    <div className="bg-sunshine-soft min-h-screen">

      {/* ══ HERO ═══════════════════════════════════════════════════ */}
      <section className="relative w-full min-h-[65vh] flex items-center overflow-hidden">
        {/* Banner image with gradient overlay */}
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src="/gender-reveal-bnr.jpg"
            alt="Expecting couple holding gender reveal results at Sunshine Clinical Lab Trinity FL"
            fill
            className="object-cover object-center"
            priority
            onError={(e) => { e.currentTarget.style.display = 'none'; }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-sunshine-dark/85 via-[#2d1040]/80 to-[#a21caf]/40" />
        </div>

        {/* Decorative rings */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
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
            className="max-w-2xl mx-auto sm:ml-auto text-center sm:text-right"
          >
            <motion.div variants={heroItemVariants}>
              <p className="text-white/75 text-sm font-semibold tracking-widest mb-6">
                Pasco County Gender Reveal Testing
              </p>
            </motion.div>

            <motion.h1
              variants={heroItemVariants}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-4"
            >
              Gender Reveal Blood Test in Florida —{' '}
              <span className="text-[#f9a8d4]">Find Out Your Baby&apos;s Gender as Early as 7 Weeks</span>
            </motion.h1>

            <motion.h2
              variants={heroItemVariants}
              className="text-2xl sm:text-3xl font-bold text-white/90 mb-4"
            >
              Boy or Girl? Find Out Weeks Before Your Ultrasound.
            </motion.h2>

            <motion.p
              variants={heroItemVariants}
              className="text-white/85 text-lg leading-relaxed mb-10 max-w-xl mx-auto sm:ml-auto"
            >
              Sunshine Clinical Lab in Trinity, FL offers the Peekaboo Early Gender Reveal Blood Test —
              a simple, non-invasive blood draw that can tell you your baby&apos;s gender as early as 7 weeks
              into pregnancy. Schedule today and start planning.
            </motion.p>

            <motion.div
              variants={heroItemVariants}
              className="flex flex-col sm:flex-row flex-wrap gap-4 justify-center sm:justify-end"
            >
              <a href="tel:+17272335223" className="w-full sm:w-auto">
                <ShimmerButton className="w-full sm:w-auto bg-white text-sunshine-dark px-7 py-3.5 rounded-full font-bold shadow-xl text-base gap-2">
                  <Phone className="w-5 h-5" aria-hidden="true" />
                  Schedule Your Gender Reveal Test — (727) 233-5223
                </ShimmerButton>
              </a>
              <Link href="/book-appointment" className="w-full sm:w-auto">
                <ShimmerButton className="w-full sm:w-auto bg-sunshine-blue border border-white/20 text-white px-7 py-3.5 rounded-full font-semibold shadow-lg text-base gap-2">
                  <CalendarDays className="w-4 h-4" aria-hidden="true" />
                  Book Appointment
                </ShimmerButton>
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none" aria-hidden="true">
          <svg viewBox="0 0 1440 72" preserveAspectRatio="none" className="w-full h-16 sm:h-20">
            <path
              d="M0,36 C240,72 480,0 720,36 C960,72 1200,0 1440,36 L1440,72 L0,72 Z"
              fill="#EBF5FB"
            />
          </svg>
        </div>
      </section>

      {/* ══ DIRECT ANSWER BLOCK 1 (AEO/GEO) ══════════════════════ */}
      <section className="py-12 bg-[#EBF5FB]">
        <Section>
          <motion.div variants={itemVariants} className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
              {/* Top accent bar */}
              <div className="h-1 w-full bg-gradient-to-r from-sunshine-blue to-sunshine-sky" />
              <div className="p-7 sm:p-9">
                {/* Badge */}
                <div className="flex items-center gap-2 mb-5">
                  <span className="inline-flex items-center gap-1.5 bg-sunshine-blue/10 text-sunshine-blue text-xs font-bold tracking-wide px-3 py-1.5 rounded-full">
                    <Baby className="w-3.5 h-3.5" aria-hidden="true" />
                    Gender Reveal Blood Test — Trinity, FL
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-sunshine-dark mb-4">
                  Can I Find Out My Baby&apos;s Gender at 7 Weeks With a Blood Test?
                </h2>
                <p className="text-gray-700 leading-relaxed text-base mb-7">
                  Yes. The <strong>Peekaboo Early Gender Reveal Blood Test</strong> can determine fetal gender as early as{' '}
                  <strong>7 weeks</strong> into pregnancy through a simple, non-invasive blood draw from the mother&apos;s arm.
                  The test detects cell-free fetal DNA circulating in the mother&apos;s bloodstream and identifies the presence
                  or absence of Y-chromosome markers. Sunshine Clinical Lab at{' '}
                  <strong>3600 Galileo Dr, Trinity, FL 34655</strong> offers this test to expecting families throughout
                  Pasco County and the Tampa Bay region. Results are typically available within a few business days.{' '}
                  <a href="tel:+17272335223" className="text-sunshine-blue font-semibold hover:underline">
                    Call (727) 233-5223
                  </a>{' '}
                  to schedule. Learn more about our{' '}
                  <Link href="/clinical-lab-services-trinity-fl" className="text-sunshine-blue font-semibold hover:underline">
                    clinical lab services
                  </Link>
                  .
                </p>
                {/* Quick stats strip */}
                <div className="flex flex-wrap gap-2 sm:gap-3">
                  {[
                    { icon: CheckCircle, label: 'Results in Days' },
                    { icon: Shield, label: 'Clinically Validated' },
                    { icon: Heart, label: 'Non-Invasive' },
                  ].map(({ icon: Icon, label }) => (
                    <span
                      key={label}
                      className="inline-flex items-center gap-1.5 bg-sunshine-soft border border-sunshine-blue/15 text-sunshine-dark text-xs font-semibold px-3 py-1.5 rounded-full"
                    >
                      <Icon className="w-3.5 h-3.5 text-sunshine-blue flex-shrink-0" aria-hidden="true" />
                      {label}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </Section>
      </section>

      {/* ══ THE MOMENT YOU'VE BEEN WAITING FOR ════════════════════ */}
      <section className="py-20 bg-white overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Section>
            <motion.div variants={itemVariants} className="mb-10">
              <span className="text-xs font-bold uppercase tracking-widest text-sunshine-blue mb-3 block">
                The Sunshine Difference
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-sunshine-dark">
                The Moment You&apos;ve Been Waiting For — Earlier Than You Thought Possible
              </h2>
            </motion.div>
            <motion.div
              variants={itemVariants}
              className="bg-sunshine-soft rounded-2xl shadow-sm overflow-hidden"
            >
              <div className="flex items-start gap-5 p-7 sm:p-8">
                <div className="w-12 h-12 rounded-2xl bg-sunshine-blue flex items-center justify-center flex-shrink-0 shadow-md">
                  <Heart className="w-6 h-6 text-white" aria-hidden="true" />
                </div>
                <div className="text-gray-600 leading-relaxed space-y-3 min-w-0">
                  <p>
                    There&apos;s a particular kind of excitement that comes with finding out whether your little one
                    is a boy or a girl. It&apos;s the moment that launches nursery planning, name debates, family
                    group chat explosions, and the kind of happy tears that make everyone in the room reach
                    for their phones.
                  </p>
                  <p>
                    Traditionally, most parents wait until the anatomy scan around 18 to 20 weeks to learn their
                    baby&apos;s gender. But the <strong>Peekaboo Early Gender Reveal Blood Test</strong> — available right
                    here at Sunshine Clinical Lab in Trinity, FL — can deliver that answer as early as{' '}
                    <strong>7 weeks</strong> into your pregnancy.
                  </p>
                  <p>
                    That&apos;s not a typo. <strong>Seven weeks.</strong> While you&apos;re still keeping the news between
                    you and your partner (or maybe just you and your best friend), you can already know whether
                    it&apos;s pink or blue.
                  </p>
                  {/* Chip row */}
                  <div className="flex flex-wrap gap-2 pt-2">
                    {[
                      { icon: Baby, label: 'As Early as 7 Weeks' },
                      { icon: Sparkles, label: 'Earlier Than Ultrasound' },
                      { icon: Heart, label: 'Non-Invasive' },
                    ].map(({ icon: Icon, label }) => (
                      <span
                        key={label}
                        className="inline-flex items-center gap-1.5 bg-sunshine-blue text-white text-xs font-bold px-3 py-1.5 rounded-full"
                      >
                        <Icon className="w-3.5 h-3.5 flex-shrink-0" aria-hidden="true" />
                        {label}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </Section>
        </div>
      </section>

      {/* ══ HOW IT WORKS ══════════════════════════════════════════ */}
      <section className="py-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <Section>
          <motion.div variants={itemVariants} className="mb-10">
            <span className="text-xs font-bold uppercase tracking-widest text-sunshine-blue mb-3 block">
              The Science
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-sunshine-dark">
              How the Peekaboo Gender Reveal Blood Test Works
            </h2>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="bg-white rounded-2xl shadow-sm overflow-hidden mb-8"
          >
            <div className="flex items-start gap-5 p-7 sm:p-8">
              <div className="w-12 h-12 rounded-2xl bg-sunshine-blue flex items-center justify-center flex-shrink-0 shadow-md">
                <FlaskConical className="w-6 h-6 text-white" aria-hidden="true" />
              </div>
              <div className="text-gray-600 leading-relaxed space-y-3 min-w-0">
                <p>
                  The Peekaboo test is a <strong>simple, non-invasive blood draw from the mother&apos;s arm</strong> — the
                  same kind of blood draw you&apos;d have for routine prenatal lab work. There are no needles near
                  the baby, no ultrasound required, and no discomfort beyond a standard blood draw.
                </p>
                <p>
                  Here&apos;s the science: as early as 7 weeks into pregnancy, small fragments of your baby&apos;s DNA
                  (called <strong>cell-free fetal DNA</strong>) circulate in the mother&apos;s bloodstream. The Peekaboo test
                  analyzes your blood sample for the presence or absence of <strong>Y-chromosome markers</strong>. If Y-chromosome
                  DNA is detected, you&apos;re having a boy. If it&apos;s absent, you&apos;re having a girl.
                </p>
                <p>
                  The test is <strong>clinically validated</strong> and is one of the most trusted early gender determination
                  methods available in the United States. It&apos;s performed at our Trinity, FL laboratory by the same
                  experienced phlebotomists who handle all of our clinical blood work — professionals with over{' '}
                  <strong>35 years of combined experience</strong>.
                </p>
                {/* Chip row */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {[
                    { icon: FlaskConical, label: 'Cell-Free Fetal DNA' },
                    { icon: CheckCircle, label: 'Y-Chromosome Detection' },
                    { icon: Shield, label: '35 Years Experience' },
                  ].map(({ icon: Icon, label }) => (
                    <span
                      key={label}
                      className="inline-flex items-center gap-1.5 bg-sunshine-blue text-white text-xs font-bold px-3 py-1.5 rounded-full"
                    >
                      <Icon className="w-3.5 h-3.5 flex-shrink-0" aria-hidden="true" />
                      {label}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* 3-step icon row */}
          <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              {
                Icon: FlaskConical,
                step: '01',
                title: 'Blood Draw',
                desc: 'Quick, comfortable draw from the mother\'s arm at our Trinity, FL lab.',
                alt: 'Phlebotomist drawing blood for gender reveal test at clinical lab Trinity FL',
              },
              {
                Icon: Baby,
                step: '02',
                title: 'DNA Analysis',
                desc: 'Fetal DNA is detected in the mother\'s bloodstream and analyzed for Y-chromosome markers.',
                alt: 'Peekaboo early gender reveal blood test available at Sunshine Clinical Lab Florida',
              },
              {
                Icon: Heart,
                step: '03',
                title: 'Your Results',
                desc: 'Results delivered within a few business days — sealed envelope available upon request.',
                alt: 'Sealed gender reveal results envelope from Sunshine Clinical Lab Pasco County',
              },
            ].map(({ Icon, step, title, desc }) => (
              <div
                key={title}
                className="bg-white rounded-2xl p-6 text-center shadow-sm border border-sunshine-blue/10 flex flex-col items-center gap-3"
              >
                <span className="text-xs font-bold tabular-nums text-sunshine-blue/40">{step}</span>
                <div className="w-12 h-12 rounded-2xl bg-sunshine-soft flex items-center justify-center">
                  <Icon className="w-6 h-6 text-sunshine-blue" aria-hidden="true" />
                </div>
                <h3 className="text-base font-bold text-sunshine-dark">{title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </motion.div>
        </Section>
      </section>

      {/* ══ WHY FAMILIES LOVE THIS TEST ═══════════════════════════ */}
      <section className="py-20 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Section>
            <motion.div variants={itemVariants} className="text-center mb-14">
              <span className="text-xs font-bold uppercase tracking-widest text-sunshine-blue mb-3 block">
                Why Pasco County Families Choose Us
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-sunshine-dark mb-4">
                Why Expecting Families in Pasco County Love This Test
              </h2>
              <p className="text-gray-500 max-w-2xl mx-auto leading-relaxed">
                Our gender reveal blood test patients are some of our happiest visitors — and we love that energy
                in our office. Here&apos;s why expecting parents throughout{' '}
                <Link href="/clinical-lab-trinity-fl" className="text-sunshine-blue font-semibold hover:underline">Trinity</Link>,{' '}
                <Link href="/clinical-lab-new-port-richey" className="text-sunshine-blue font-semibold hover:underline">New Port Richey</Link>,{' '}
                <Link href="/clinical-lab-land-o-lakes-fl" className="text-sunshine-blue font-semibold hover:underline">Land O&apos; Lakes</Link>,{' '}
                <Link href="/clinical-lab-tarpon-springs-fl" className="text-sunshine-blue font-semibold hover:underline">Tarpon Springs</Link>,{' '}
                and the wider Tampa Bay region are choosing the Peekaboo test at Sunshine Clinical Lab:
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {WHY_ITEMS.map(({ Icon, title, body }, i) => (
                <motion.div key={title} variants={cardVariants} custom={i}>
                  <MagicCard gradientColor="#93C5FD60" borderGlowColor="#2B7DBF" className="shadow-md hover:shadow-xl h-full">
                    <div className="p-7 flex flex-col gap-4 h-full">
                      <div className="w-12 h-12 rounded-2xl bg-sunshine-soft flex items-center justify-center flex-shrink-0">
                        <Icon className="w-6 h-6 text-sunshine-blue" aria-hidden="true" />
                      </div>
                      <h3 className="text-lg font-bold text-sunshine-dark">{title}</h3>
                      <p className="text-gray-500 text-sm leading-relaxed">{body}</p>
                    </div>
                  </MagicCard>
                </motion.div>
              ))}
            </div>
          </Section>
        </div>
      </section>

      {/* ══ APPOINTMENT EXPERIENCE + SEALED RESULTS ═══════════════ */}
      <section className="py-20 bg-[#EBF5FB] overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Section>
            <motion.div variants={itemVariants} className="mb-10">
              <span className="text-xs font-bold uppercase tracking-widest text-sunshine-blue mb-3 block">
                Your Appointment
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-sunshine-dark">
                What to Expect at Your Gender Reveal Appointment in Trinity, FL
              </h2>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="bg-white rounded-2xl shadow-sm overflow-hidden mb-6"
            >
              <div className="flex items-start gap-5 p-7 sm:p-8">
                <div className="w-12 h-12 rounded-2xl bg-sunshine-blue flex items-center justify-center flex-shrink-0 shadow-md">
                  <CalendarDays className="w-6 h-6 text-white" aria-hidden="true" />
                </div>
                <div className="text-gray-600 leading-relaxed space-y-3 min-w-0">
                  <p>
                    When you arrive at Sunshine Clinical Lab at <strong>3600 Galileo Dr, Trinity, FL 34655</strong>,
                    our team will confirm your information, answer any questions, and perform a quick, comfortable
                    blood draw. The entire visit is typically completed in <strong>under 20 minutes</strong>.
                  </p>
                  <p>
                    After your draw, your sample is sent for analysis. Results are typically available within a few
                    business days, depending on the processing timeline. Our team will provide a clear estimate
                    when you schedule.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Stat row */}
            <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              {[
                { Icon: Clock, stat: 'Under 20 Minutes', desc: 'Typical appointment time' },
                { Icon: CalendarDays, stat: 'Results in Days', desc: 'Typical turnaround' },
                { Icon: Shield, stat: 'No Fasting Required', desc: 'No special prep needed' },
              ].map(({ Icon, stat, desc }) => (
                <div
                  key={stat}
                  className="bg-white rounded-2xl p-5 text-center border border-sunshine-blue/10 shadow-sm"
                >
                  <div className="w-10 h-10 rounded-xl bg-sunshine-soft flex items-center justify-center mx-auto mb-3">
                    <Icon className="w-5 h-5 text-sunshine-blue" aria-hidden="true" />
                  </div>
                  <p className="font-bold text-sunshine-dark text-sm">{stat}</p>
                  <p className="text-gray-500 text-xs mt-1">{desc}</p>
                </div>
              ))}
            </motion.div>

            {/* Sealed Results card */}
            <motion.div
              variants={itemVariants}
              className="bg-sunshine-yellow/10 border border-sunshine-yellow/30 rounded-2xl p-7 flex items-start gap-4"
              aria-label="Sealed gender reveal results"
            >
              <div className="w-12 h-12 rounded-2xl bg-sunshine-yellow flex items-center justify-center flex-shrink-0 shadow-md">
                <Shield className="w-6 h-6 text-white" aria-hidden="true" />
              </div>
              <div className="min-w-0">
                <h3 className="text-lg font-bold text-sunshine-dark mb-2">Sealed Results for Your Reveal</h3>
                <p className="text-gray-600 leading-relaxed text-sm">
                  You&apos;ll receive your results in a{' '}
                  <strong>sealed envelope</strong>{' '}
                  or through a secure method — so if you&apos;re planning a reveal party or a surprise announcement,
                  nothing gets spoiled ahead of time. Just let us know when you schedule, and we&apos;ll make sure
                  your results stay sealed until you&apos;re ready for the big moment.
                </p>
              </div>
            </motion.div>
          </Section>
        </div>
      </section>

      {/* ══ PARTY / EMOTIONAL SECTION ══════════════════════════════ */}
      <section className="py-20 relative overflow-hidden">
        {/* Brand gradient background matching GenderRevealSection.jsx */}
        <div className="absolute inset-0 bg-gradient-to-br from-sunshine-light via-white to-sunshine-soft" aria-hidden="true" />
        {/* Decorative blur circles */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
          <div className="absolute -top-20 -left-20 w-80 h-80 rounded-full bg-sunshine-yellow/20 blur-3xl" />
          <div className="absolute -bottom-20 -right-20 w-80 h-80 rounded-full bg-sunshine-sky/25 blur-3xl" />
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Section>
            <motion.div variants={itemVariants}>
              <span className="inline-flex items-center gap-2 bg-sunshine-soft border border-sunshine-sky text-sunshine-blue px-4 py-1.5 rounded-full text-sm font-semibold mb-6">
                <Gift className="w-4 h-4" aria-hidden="true" />
                Gender Reveal Party Planning
              </span>
            </motion.div>

            <motion.h2
              variants={itemVariants}
              className="text-3xl sm:text-4xl font-extrabold text-sunshine-dark mb-6 leading-tight"
            >
              Planning a Gender Reveal Party? We&apos;ll Help You Keep the Secret.
            </motion.h2>

            <motion.div variants={itemVariants} className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                Many of our patients use their Peekaboo results to plan gender reveal celebrations — and we are
                absolutely here for it. Whether it&apos;s a backyard bash with 50 people or a FaceTime call with the
                grandparents, knowing weeks earlier gives you time to plan something truly special.
              </p>
              <p>
                If you&apos;d like your results sealed so you can share them with a party planner, baker, or event
                coordinator without seeing them yourself first, let our team know. We&apos;re happy to accommodate
                however you want to experience the moment.
              </p>
              <p>
                Some of our Pasco County families have even brought their party planners to the appointment to pick
                up the sealed results directly. Whatever works for your celebration, we&apos;ll make it happen.
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="mt-8">
              <a href="tel:+17272335223" className="w-full sm:w-auto inline-block">
                <ShimmerButton className="w-full sm:w-auto bg-sunshine-blue text-white px-8 py-4 rounded-full font-bold shadow-xl gap-2">
                  <Phone className="w-5 h-5" aria-hidden="true" />
                  Call to Schedule — (727) 233-5223
                </ShimmerButton>
              </a>
            </motion.div>
          </Section>
        </div>
      </section>

      {/* ══ FAMILY / WHOLE CREW SECTION ════════════════════════════ */}
      <section className="py-20 overflow-hidden" style={{ backgroundColor: '#CCE9F7' }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Section>
            <motion.div variants={itemVariants} className="mb-8 text-center">
              <span className="text-xs font-bold uppercase tracking-widest text-sunshine-blue mb-3 block">
                Everyone&apos;s Welcome
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-sunshine-dark">
                A Note for Dad, Grandma, and the Whole Crew
              </h2>
              <p className="mt-4 text-gray-600 max-w-2xl mx-auto leading-relaxed">
                Partners, grandparents, siblings, besties, and the entire cheer squad — you&apos;re welcome at
                the appointment. Sunshine Clinical Lab is a warm, welcoming environment, and we love seeing the
                whole family involved in this milestone. Our Trinity, FL office has a comfortable, uncrowded space
                where your family can be part of the experience.
              </p>
            </motion.div>

            {/* Welcome card */}
            <motion.div variants={itemVariants} className="max-w-2xl mx-auto mb-8">
              <div
                className="bg-white rounded-2xl p-7 shadow-sm flex flex-col gap-4 border border-sunshine-blue/10"
                aria-label="Happy family celebrating gender reveal at Sunshine Clinical Lab Trinity Florida"
              >
                <div className="w-12 h-12 rounded-2xl bg-sunshine-blue/10 flex items-center justify-center flex-shrink-0">
                  <Users className="w-6 h-6 text-sunshine-blue" aria-hidden="true" />
                </div>
                <h3 className="text-lg font-bold text-sunshine-dark">The Whole Family is Welcome</h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  Just keep in mind that the blood draw itself is performed on the expectant mother only.
                  Everyone else is there for moral support and to capture the excited faces on camera.
                </p>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="text-center">
              <a href="tel:+17272335223" className="w-full sm:w-auto inline-block">
                <ShimmerButton className="w-full sm:w-auto bg-sunshine-blue text-white px-9 py-4 rounded-full font-bold shadow-xl text-lg gap-2">
                  <Phone className="w-5 h-5" aria-hidden="true" />
                  Schedule Your Gender Reveal Test — (727) 233-5223
                </ShimmerButton>
              </a>
            </motion.div>
          </Section>
        </div>
      </section>

      {/* ══ DIRECT ANSWER BLOCK 2 (AEO/GEO) ══════════════════════ */}
      <section className="py-12 bg-[#EBF5FB]">
        <Section>
          <motion.div variants={itemVariants} className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
              {/* Top accent bar */}
              <div className="h-1 w-full bg-gradient-to-r from-sunshine-blue to-sunshine-sky" />
              <div className="p-7 sm:p-9">
                {/* Badge */}
                <div className="flex items-center gap-2 mb-5">
                  <span className="inline-flex items-center gap-1.5 bg-sunshine-blue/10 text-sunshine-blue text-xs font-bold tracking-wide px-3 py-1.5 rounded-full">
                    <MapPin className="w-3.5 h-3.5" aria-hidden="true" />
                    Serving Pasco County &amp; Tampa Bay
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-sunshine-dark mb-4">
                  Where Can I Get a Gender Reveal Blood Test Near Me in Pasco County?
                </h2>
                <p className="text-gray-700 leading-relaxed text-base mb-7">
                  Sunshine Clinical Lab at <strong>3600 Galileo Dr, Trinity, FL 34655</strong> offers the{' '}
                  <strong>Peekaboo Early Gender Reveal Blood Test</strong> to expecting families throughout Pasco County
                  and the Tampa Bay area. The test can determine baby gender as early as <strong>7 weeks</strong> of
                  pregnancy through a non-invasive blood draw. Results are available within a few business days and
                  can be provided in a <strong>sealed envelope</strong> for gender reveal parties. The lab serves patients
                  from{' '}
                  <Link href="/clinical-lab-trinity-fl" className="text-sunshine-blue font-semibold hover:underline">Trinity</Link>,{' '}
                  <Link href="/clinical-lab-new-port-richey" className="text-sunshine-blue font-semibold hover:underline">New Port Richey</Link>,{' '}
                  <Link href="/clinical-lab-land-o-lakes-fl" className="text-sunshine-blue font-semibold hover:underline">Land O&apos; Lakes</Link>,{' '}
                  <Link href="/clinical-lab-tarpon-springs-fl" className="text-sunshine-blue font-semibold hover:underline">Tarpon Springs</Link>,{' '}
                  and surrounding communities.{' '}
                  <a href="tel:+17272335223" className="text-sunshine-blue font-semibold hover:underline">
                    Call (727) 233-5223
                  </a>{' '}
                  to schedule.
                </p>
                {/* CTA link row */}
                <div className="flex flex-wrap gap-3">
                  <a href="tel:+17272335223">
                    <ShimmerButton className="bg-sunshine-blue text-white px-5 py-2.5 rounded-full font-semibold text-sm gap-2">
                      <Phone className="w-4 h-4" aria-hidden="true" />
                      (727) 233-5223
                    </ShimmerButton>
                  </a>
                  <Link href="/mobile-blood-draw-pasco-county">
                    <ShimmerButton className="bg-sunshine-soft border border-sunshine-blue/20 text-sunshine-dark px-5 py-2.5 rounded-full font-semibold text-sm gap-2">
                      Mobile Blood Draw Available
                      <ArrowRight className="w-4 h-4" aria-hidden="true" />
                    </ShimmerButton>
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </Section>
      </section>

      {/* ══ FAQ SECTION ════════════════════════════════════════════ */}
      <section className="py-20 relative overflow-hidden bg-[#D6EAF8]">
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Section>
            <motion.div variants={itemVariants} className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-sunshine-blue shadow-lg mb-5">
                <HelpCircle className="w-7 h-7 text-white" aria-hidden="true" />
              </div>
              <span className="text-xs font-bold uppercase tracking-widest text-sunshine-blue mb-3 block">
                Got Questions?
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-sunshine-dark">
                Gender Reveal Blood Test — Frequently Asked Questions
              </h2>
              <p className="text-sunshine-dark/60 mt-4 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
                Everything you need to know before scheduling your gender reveal test in Trinity, FL.
              </p>
              <div className="mt-3">
                <Link href="/faq" className="text-sunshine-blue font-semibold hover:underline text-sm">
                  View our full FAQ →
                </Link>
              </div>
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
                  <Phone className="w-5 h-5" aria-hidden="true" />
                  Still Have Questions? Call (727) 233-5223
                </ShimmerButton>
              </a>
            </motion.div>
          </Section>
        </div>
      </section>

      {/* ══ FINAL CTA ══════════════════════════════════════════════ */}
      <section className="py-20 relative overflow-hidden bg-gradient-to-r from-sunshine-blue to-sunshine-sky">
        {/* Decorative circles */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
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
              <Heart className="w-4 h-4" aria-hidden="true" />
              Sunshine Clinical Lab — Trinity, FL
            </motion.span>

            <motion.h2
              variants={itemVariants}
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-5"
            >
              Pink or Blue?
              <br />
              <span className="text-[#f9a8d4]">Let&apos;s Find Out Together.</span>
            </motion.h2>

            <motion.p
              variants={itemVariants}
              className="text-white/80 text-lg leading-relaxed mb-4 max-w-2xl mx-auto"
            >
              Sunshine Clinical Lab makes one of pregnancy&apos;s most exciting moments happen sooner.
              Schedule your Peekaboo gender reveal blood test at our Trinity, FL location and find out
              whether you&apos;re expecting a son or daughter — as early as 7 weeks.
            </motion.p>

            <motion.p variants={itemVariants} className="text-white font-semibold text-lg mb-10">
              Call (727) 233-5223 to book your appointment today.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row justify-center gap-4 mb-12"
            >
              <Link href="/book-appointment" className="w-full sm:w-auto">
                <ShimmerButton className="w-full sm:w-auto bg-white text-sunshine-dark px-9 py-4 rounded-full font-bold shadow-2xl text-lg gap-2">
                  <CalendarDays className="w-5 h-5" aria-hidden="true" />
                  Schedule Now
                </ShimmerButton>
              </Link>
              <a href="tel:+17272335223" className="w-full sm:w-auto">
                <ShimmerButton className="w-full sm:w-auto bg-white/20 backdrop-blur-sm border-2 border-white text-white px-9 py-4 rounded-full font-semibold text-lg gap-2">
                  <Phone className="w-5 h-5" aria-hidden="true" />
                  Call (727) 233-5223
                </ShimmerButton>
              </a>
              <a
                href="https://maps.google.com/?q=3600+Galileo+Dr+Trinity+FL+34655"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto"
              >
                <ShimmerButton className="w-full sm:w-auto bg-white/20 backdrop-blur-sm border-2 border-white text-white px-9 py-4 rounded-full font-semibold text-lg gap-2">
                  <MapPin className="w-5 h-5" aria-hidden="true" />
                  Get Directions
                </ShimmerButton>
              </a>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-white/75 text-sm"
            >
              <span className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-white flex-shrink-0" aria-hidden="true" />
                3600 Galileo Dr, Trinity, FL 34655, USA
              </span>
              <span className="hidden sm:block text-white/30">|</span>
              <span className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-white flex-shrink-0" aria-hidden="true" />
                Mon–Fri 8:00am–5:00pm
              </span>
            </motion.div>
          </Section>
        </div>
      </section>

    </div>
  );
}
