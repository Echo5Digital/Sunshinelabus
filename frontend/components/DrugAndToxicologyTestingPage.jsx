'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import {
  ShieldAlert,
  CheckCircle,
  ChevronDown,
  Phone,
  MapPin,
  Clock,
  Beaker,
  Fingerprint,
  Wind,
  Pill,
  Wine,
  ClipboardCheck,
  Microscope,
  Building2,
  HelpCircle,
  CalendarDays,
  DollarSign,
  Zap,
} from 'lucide-react';
import { ShimmerButton } from '@/registry/magicui/shimmer-button';
import MagicCard from '@/components/ui/MagicCard';

/* ─── Animation variants ──────────────────────────────────────── */
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

/* ─── Data ─────────────────────────────────────────────────────── */
const TEST_PANEL_ITEMS = [
  {
    Icon: Beaker,
    title: '5-Panel & 10-Panel Urine Drug Screens',
    body: 'Standard workplace and clinical urine screening panels, including SAMHSA-5 compliance testing for federally regulated positions.',
  },
  {
    Icon: Fingerprint,
    title: 'Hair Follicle Drug Testing',
    body: 'Detects drug use over a longer window — typically up to 90 days — useful for pre-employment and extended-history screening needs.',
  },
  {
    Icon: Wind,
    title: 'Oral Fluid (Saliva) Drug Testing',
    body: 'A fast, non-invasive collection method often used for recent-use detection in workplace and clinical settings.',
  },
  {
    Icon: Wine,
    title: 'Alcohol Testing (EtG, EtS)',
    body: 'Ethyl glucuronide and ethyl sulfate testing to detect recent alcohol consumption for clinical, legal, or workplace monitoring.',
  },
  {
    Icon: Pill,
    title: 'Prescription Drug Monitoring',
    body: 'Confirms appropriate use of prescribed medications, supporting pain management and other clinical monitoring programs.',
  },
  {
    Icon: Microscope,
    title: 'Confirmatory GC-MS / LC-MS/MS Testing',
    body: 'Mass spectrometry confirmation testing available for results that require a defensible, laboratory-confirmed outcome.',
  },
];

const FAQ_ITEMS = [
  {
    q: 'What types of drug testing do you offer?',
    a: 'We offer urine drug screens (5-panel and 10-panel), hair follicle testing, oral fluid (saliva) testing, alcohol testing, prescription drug monitoring, and SAMHSA-5 compliance testing, with confirmatory GC-MS/LC-MS/MS testing available when needed.',
  },
  {
    q: 'Do you provide workplace and pre-employment drug testing?',
    a: 'Yes. Employers across Pasco County rely on Sunshine Clinical Lab for pre-employment drug screening, random workplace testing, and DOT-compliant panels. Results are delivered promptly to help keep hiring and compliance timelines on track.',
  },
  {
    q: 'Do I need an appointment for a drug test?',
    a: 'Many drug screens can be done on a walk-in basis at our Trinity, FL location. For employer-ordered, court-ordered, or chain-of-custody testing, we recommend calling (727) 233-5223 ahead so we can confirm documentation requirements.',
  },
  {
    q: 'Is drug testing covered by insurance?',
    a: 'Workplace, legal, and court-ordered drug testing is typically billed directly to the employer or requesting party rather than insurance. Call (727) 233-5223 and our team can confirm billing for your specific situation.',
  },
  {
    q: 'Can employers set up an account for ongoing employee testing?',
    a: 'Yes. We work with local employers on pre-employment screening, random testing programs, and DOT-compliant panels. Call (727) 233-5223 to discuss setting up your business for ongoing workplace testing.',
  },
  {
    q: 'How is chain-of-custody handled for legal or employer-ordered tests?',
    a: 'Chain-of-custody collections follow standard documentation and identity-verification protocols to keep results defensible for employer, legal, and court-ordered testing. Let our team know when scheduling if your test requires chain-of-custody handling.',
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

export default function DrugAndToxicologyTestingPage() {
  const [openFaq, setOpenFaq] = useState(null);
  const toggleFaq = (i) => setOpenFaq((prev) => (prev === i ? null : i));

  const col1 = FAQ_ITEMS.slice(0, 3);
  const col2 = FAQ_ITEMS.slice(3);

  return (
    <div className="bg-sunshine-soft min-h-screen">

      {/* ══ HERO ═════════════════════════════════════════════════ */}
      <section className="relative w-full h-[90vh] flex items-center overflow-hidden">
        {/* Banner image with gradient overlay */}
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src="/drug-testing-bnr.webp"
            alt="Drug and Toxicology Testing at Sunshine Clinical Lab in Trinity, FL"
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-sunshine-dark/95 via-sunshine-dark/85 to-sunshine-blue/70" />
        </div>

        {/* Decorative rings */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
          <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full border border-white/5" />
          <div className="absolute bottom-20 -left-20 w-80 h-80 rounded-full border border-white/5" />
          <div className="absolute top-1/3 right-1/4 w-40 h-40 rounded-full bg-white/[0.03]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full border border-white/[0.03]" />
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28 pt-36">
          <motion.div
            variants={heroContainerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-2xl text-left"
          >
            <motion.p
              variants={heroItemVariants}
              className="text-white/75 text-sm font-semibold tracking-widest mb-6"
            >
              Sunshine Clinical Lab — Trinity, FL &amp; Pasco County
            </motion.p>

            <motion.h1
              variants={heroItemVariants}
              className="text-3xl sm:text-5xl font-extrabold text-white leading-tight mb-5"
            >
              Drug &amp; Toxicology Testing in Trinity, FL
            </motion.h1>

            <motion.h2
              variants={heroItemVariants}
              className="text-xl sm:text-2xl font-bold text-white/90 mb-6"
            >
              Confidential, Defensible Results for Workplace, Legal &amp; Clinical Needs
            </motion.h2>

            <motion.p
              variants={heroItemVariants}
              className="text-white/85 text-lg leading-relaxed max-w-xl mb-10"
            >
              Reliable drug screening for workplace compliance, clinical monitoring, and
              legal needs — with confidential, defensible results from a certified lab in
              Trinity, FL, serving employers and patients across Pasco County.
            </motion.p>

            <motion.div
              variants={heroItemVariants}
              className="flex flex-col sm:flex-row flex-wrap gap-4"
            >
              <a href="tel:+17272335223" className="w-full sm:w-auto">
                <ShimmerButton className="w-full sm:w-auto justify-center bg-white text-sunshine-dark px-7 py-3.5 rounded-full font-bold shadow-xl text-base gap-2">
                  <Phone className="w-5 h-5" />
                  Call (727) 233-5223
                </ShimmerButton>
              </a>
              <Link href="/book-appointment" className="w-full sm:w-auto">
                <ShimmerButton className="w-full sm:w-auto justify-center bg-sunshine-blue border border-white/20 text-white px-7 py-3.5 rounded-full font-semibold shadow-lg text-base gap-2">
                  <CalendarDays className="w-4 h-4" />
                  Book Appointment
                </ShimmerButton>
              </Link>
            </motion.div>
          </motion.div>
        </div>

        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
          <svg viewBox="0 0 1440 72" preserveAspectRatio="none" className="w-full h-16 sm:h-20">
            <path d="M0,36 C240,72 480,0 720,36 C960,72 1200,0 1440,36 L1440,72 L0,72 Z" fill="#EBF5FB" />
          </svg>
        </div>
      </section>

      {/* ══ DIRECT ANSWER (AEO/GEO) ══════════════════════════════ */}
      <section className="py-12 bg-[#EBF5FB]">
        <Section>
          <motion.div variants={itemVariants} className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
              <div className="h-1 w-full bg-gradient-to-r from-sunshine-blue to-sunshine-sky" />
              <div className="p-7 sm:p-9">
                <div className="flex items-center gap-2 mb-5">
                  <span className="inline-flex items-center gap-1.5 bg-sunshine-blue/10 text-sunshine-blue text-xs font-bold tracking-wide px-3 py-1.5 rounded-full">
                    <ShieldAlert className="w-3.5 h-3.5" />
                    Drug &amp; Toxicology Testing — Trinity, FL
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-sunshine-dark mb-4">
                  Where Can I Get Drug Testing Done in Pasco County?
                </h2>
                <p className="text-gray-700 leading-relaxed text-base mb-7">
                  Sunshine Clinical Lab at 3600 Galileo Dr, Suite 104, Trinity, FL 34655 offers a
                  full spectrum of drug and toxicology testing for workplace, legal, and clinical
                  needs, including 5-panel and 10-panel urine screens, hair follicle testing, oral
                  fluid testing, alcohol testing, and DOT-compliant panels. Many screens are
                  available on a walk-in basis, and confirmatory GC-MS/LC-MS/MS testing is
                  available when a defensible, laboratory-confirmed result is required. Call{' '}
                  <a
                    href="tel:+17272335223"
                    className="text-sunshine-blue font-semibold hover:underline"
                  >
                    (727) 233-5223
                  </a>{' '}
                  to schedule or ask about employer testing programs.
                </p>
                <div className="flex flex-wrap gap-2 sm:gap-3">
                  {[
                    { icon: CheckCircle, label: 'Walk-Ins Welcome' },
                    { icon: ClipboardCheck, label: 'DOT-Compliant Panels' },
                    { icon: Building2, label: 'Employer Testing Programs' },
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

      {/* ══ THE SUNSHINE DIFFERENCE ═══════════════════════════════ */}
      <section className="py-20 bg-white overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Section>
            <motion.div variants={itemVariants} className="mb-10">
              <span className="text-xs font-bold uppercase tracking-widest text-sunshine-blue mb-3 block">
                The Sunshine Difference
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-sunshine-dark">
                A Certified Lab Employers &amp; Patients Rely On
              </h2>
            </motion.div>
            <motion.div
              variants={itemVariants}
              className="bg-sunshine-soft rounded-2xl shadow-sm overflow-hidden mb-4"
            >
              <div className="flex items-start gap-5 p-7 sm:p-8">
                <div className="w-12 h-12 rounded-2xl bg-sunshine-blue flex items-center justify-center flex-shrink-0 shadow-md">
                  <ShieldAlert className="w-6 h-6 text-white" />
                </div>
                <div className="text-gray-600 leading-relaxed space-y-3">
                  <p>
                    Sunshine Clinical Lab offers a full spectrum of drug testing services to meet
                    workplace, legal, and clinical requirements. Our certified laboratory performs
                    immunoassay screening with confirmatory mass spectrometry available for
                    accuracy and chain-of-custody compliance.
                  </p>
                  <p>
                    Employers across Pasco County rely on us for pre-employment drug screening,
                    random workplace testing, and DOT-compliant panels, with a process that keeps
                    hiring and compliance timelines on track. Whether you need a single screen or
                    an ongoing workplace testing program, our team ensures confidential, defensible
                    results.
                  </p>
                  <div className="flex flex-wrap gap-2 pt-2">
                    {[
                      { icon: ShieldAlert, label: 'Confidential' },
                      { icon: Microscope, label: 'Lab-Confirmed' },
                      { icon: ClipboardCheck, label: 'Compliant' },
                    ].map(({ icon: Icon, label }) => (
                      <span
                        key={label}
                        className="inline-flex items-center gap-1.5 bg-sunshine-blue text-white text-xs font-bold px-3 py-1.5 rounded-full"
                      >
                        <Icon className="w-3.5 h-3.5 flex-shrink-0" />
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

      {/* ══ TESTS OFFERED ═══════════════════════════════════════ */}
      <section className="py-20 bg-[#EBF5FB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Section>
          <motion.div variants={itemVariants} className="text-center mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-sunshine-blue mb-3 block">
              Testing Options
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-sunshine-dark">
              Drug &amp; Toxicology Tests We Offer
            </h2>
            <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
              From routine workplace screens to specialized panels, our lab covers the full range
              of drug and toxicology testing needs.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {TEST_PANEL_ITEMS.map(({ Icon, title, body }, i) => (
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
            Need a specific panel for a court order or employer requirement? Bring in the
            documentation and our team will confirm we can accommodate it.
          </motion.p>
        </Section>
        </div>
      </section>

      {/* ══ WALK-IN OR WORKPLACE PROGRAM ══════════════════════════ */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <Section>
          <motion.div variants={itemVariants} className="text-center mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-sunshine-blue mb-3 block">
              Your Situation
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-sunshine-dark">
              Individual Screening or Employer Program — We Handle Both
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
                    Walk-In Testing at Our Trinity Location
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    Many drug screens are available on a walk-in basis at{' '}
                    <span className="font-semibold text-sunshine-dark">
                      3600 Galileo Dr, Suite 104, Trinity, FL 34655
                    </span>
                    . For chain-of-custody, court-ordered, or employer-directed testing, call ahead
                    so we can confirm documentation requirements.
                  </p>
                </div>
              </MagicCard>
            </motion.div>

            <motion.div variants={cardVariants} custom={2}>
              <MagicCard gradientColor="#93C5FD60" borderGlowColor="#2B7DBF" className="shadow-md hover:shadow-xl">
                <div className="p-7 flex flex-col gap-4 h-full">
                  <div className="w-12 h-12 rounded-2xl bg-sunshine-soft flex items-center justify-center flex-shrink-0">
                    <Building2 className="w-6 h-6 text-sunshine-blue" />
                  </div>
                  <h3 className="text-lg font-bold text-sunshine-dark">
                    Employer &amp; Workplace Testing Programs
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    We work with employers across Pasco County on pre-employment screening,
                    random workplace testing, and DOT-compliant panels — with results delivered
                    promptly to help keep hiring and compliance timelines on track.
                  </p>
                </div>
              </MagicCard>
            </motion.div>
          </div>

          <motion.div variants={itemVariants} className="flex justify-center">
            <a href="tel:+17272335223">
              <ShimmerButton className="bg-sunshine-blue text-white px-9 py-4 rounded-full font-bold shadow-xl text-lg gap-2">
                <Phone className="w-5 h-5" />
                Schedule Your Drug Test — (727) 233-5223
              </ShimmerButton>
            </a>
          </motion.div>
        </Section>
        </div>
      </section>

      {/* ══ MID-PAGE CTA ═══════════════════════════════════════════ */}
      <section className="py-20 relative overflow-hidden bg-gradient-to-r from-sunshine-blue to-sunshine-sky">
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
              Drug Testing — Trinity, FL
            </motion.span>

            <motion.h2
              variants={itemVariants}
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-5"
            >
              Confidential Results.
              <br />
              <span className="text-[#93C5FD]">Compliant Every Step.</span>
            </motion.h2>

            <motion.p
              variants={itemVariants}
              className="text-white/80 text-lg leading-relaxed mb-10 max-w-2xl mx-auto"
            >
              Walk-ins welcome for most screens. Employer testing programs available. Right here
              in Trinity, FL.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row justify-center gap-4 mb-12"
            >
              <a href="tel:+17272335223">
                <ShimmerButton className="bg-white text-sunshine-dark px-9 py-4 rounded-full font-bold shadow-2xl text-lg gap-2">
                  <Phone className="w-6 h-6" />
                  Call (727) 233-5223
                </ShimmerButton>
              </a>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-white/75 text-sm"
            >
              <span className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-white flex-shrink-0" />
                3600 Galileo Dr, Suite 104, Trinity, FL 34655
              </span>
              <span className="hidden sm:block text-white/30">|</span>
              <span className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-white flex-shrink-0" />
                Mon–Fri 8:00am–2:00pm
              </span>
            </motion.div>
          </Section>
        </div>
      </section>

      {/* ══ BUILT FOR EMPLOYERS & INDIVIDUALS ═════════════════════ */}
      <section className="py-20 overflow-hidden" style={{ backgroundColor: '#CCE9F7' }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Section>
            <motion.div variants={itemVariants} className="mb-8 text-center">
              <span className="text-xs font-bold uppercase tracking-widest text-sunshine-blue mb-3 block">
                Screening
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-sunshine-dark">
                Built for Employers, Providers &amp; Individuals
              </h2>
              <p className="mt-4 text-gray-600 max-w-2xl mx-auto leading-relaxed">
                Sunshine Clinical Lab supports drug and toxicology testing needs across Pasco
                County — from employers running compliance programs to individuals who need a
                single screen for personal or clinical reasons.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
              {[
                {
                  icon: Zap,
                  title: 'Prompt Results',
                  body: 'Results are delivered promptly to help keep hiring, compliance, and clinical timelines on track.',
                },
                {
                  icon: Microscope,
                  title: 'Lab-Confirmed Accuracy',
                  body: 'Immunoassay screening with confirmatory mass spectrometry available for defensible, accurate results.',
                },
                {
                  icon: DollarSign,
                  title: 'Straightforward Billing',
                  body: 'Employer, legal, and self-pay billing options — call our team to confirm the right setup for your situation.',
                },
              ].map(({ icon: Icon, title, body }, i) => (
                <motion.div key={title} variants={cardVariants} custom={i}>
                  <div className="bg-white rounded-2xl p-7 shadow-sm flex flex-col gap-4 h-full border border-sunshine-blue/10">
                    <div className="w-12 h-12 rounded-2xl bg-sunshine-blue/10 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-6 h-6 text-sunshine-blue" />
                    </div>
                    <h3 className="text-lg font-bold text-sunshine-dark">{title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">{body}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div variants={itemVariants} className="text-center text-gray-600 text-sm leading-relaxed">
              That&apos;s the Sunshine Clinical Lab difference for drug and toxicology testing in
              Pasco County.{' '}
              <a href="tel:+17272335223" className="text-sunshine-blue font-semibold hover:underline">
                Call (727) 233-5223
              </a>{' '}
              to schedule or ask about employer testing programs.
            </motion.div>
          </Section>
        </div>
      </section>

      {/* ══ FAQ ══════════════════════════════════════════════════ */}
      <section className="py-20 relative overflow-hidden bg-[#D6EAF8]">
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
                Frequently Asked Questions
              </h2>
              <p className="text-sunshine-dark/60 mt-4 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
                Everything you need to know before scheduling a drug or toxicology test in Pasco
                County.
              </p>
              <div className="mt-3">
                <Link href="/faq" className="text-sunshine-blue font-semibold hover:underline text-sm">
                  View our full FAQ →
                </Link>
              </div>
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

      {/* ══ FINAL CTA ════════════════════════════════════════════ */}
      <section className="py-20 relative overflow-hidden bg-gradient-to-r from-sunshine-blue to-sunshine-sky">
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
              Sunshine Clinical Lab — Trinity, FL
            </motion.span>

            <motion.h2
              variants={itemVariants}
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-5"
            >
              Ready to Get Tested?
            </motion.h2>

            <motion.p
              variants={itemVariants}
              className="text-white/85 text-lg leading-relaxed mb-10 max-w-2xl mx-auto"
            >
              Book an appointment and receive your drug or toxicology test results with
              precision and care from our Trinity, FL lab.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-10 flex-wrap"
            >
              <Link href="/book-appointment" className="w-full sm:w-auto">
                <ShimmerButton className="w-full sm:w-auto justify-center bg-white text-sunshine-dark px-8 py-3.5 rounded-full font-bold shadow-xl text-base">
                  Book Appointment
                </ShimmerButton>
              </Link>
              <a href="tel:+17272335223" className="w-full sm:w-auto">
                <ShimmerButton className="w-full sm:w-auto justify-center bg-white/20 backdrop-blur-sm border-2 border-white text-white px-8 py-3.5 rounded-full font-semibold text-base gap-2">
                  <Phone className="w-5 h-5" />
                  (727) 233-5223
                </ShimmerButton>
              </a>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 text-white/75 text-sm"
            >
              <span className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-white/90 flex-shrink-0" />
                3600 Galileo Dr, Suite 104, Trinity, FL 34655
              </span>
              <span className="hidden sm:block text-white/30">|</span>
              <span className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-white/90 flex-shrink-0" />
                Mon–Fri 8:00 am – 2:00 pm
              </span>
            </motion.div>
          </Section>
        </div>
      </section>

    </div>
  );
}
