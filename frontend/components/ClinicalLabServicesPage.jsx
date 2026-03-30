'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import {
  Phone,
  MapPin,
  Clock,
  ChevronDown,
  CalendarDays,
  HelpCircle,
  ShieldCheck,
  CheckCircle2,
  BadgeCheck,
  Activity,
  Droplets,
  HeartPulse,
  Brain,
  Pill,
  Syringe,
  Microscope,
  Stethoscope,
  Users
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
  { x: 60,  y: 0 },
  { x: -60, y: 0 },
  { x: 60,  y: 0 },
  { x: -60, y: 0 },
  { x: 60,  y: 0 },
  { x: -60, y: 0 },
  { x: 60,  y: 0 },
];
const cardVariants = {
  hidden: (i) => {
    const { x, y } = CARD_DIRS[i % CARD_DIRS.length];
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

/* ─── Section wrapper ─────────────────────────────────────────── */
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
const ROUTINE_PANELS = [
  {
    Icon: Droplets,
    title: 'Complete Blood Count (CBC)',
    body: 'One of the most commonly ordered blood tests, a CBC evaluates your red blood cells, white blood cells, hemoglobin, hematocrit, and platelets. It\'s essential for detecting infections, anemia, blood disorders, and overall health monitoring.',
  },
  {
    Icon: Activity,
    title: 'Comprehensive Metabolic Panel (CMP)',
    body: 'This panel measures 14 different substances in your blood, providing critical information about your kidney function, liver function, blood sugar, electrolyte balance, and protein levels.',
  },
  {
    Icon: HeartPulse,
    title: 'Lipid Panel',
    body: 'Measures your cholesterol and triglyceride levels, which are key indicators of cardiovascular health. Typically includes total cholesterol, LDL, HDL, and triglycerides.',
  },
  {
    Icon: Droplets,
    title: 'Hemoglobin A1C',
    body: 'Used to diagnose and monitor diabetes by measuring your average blood sugar levels over the previous two to three months. Essential for diabetic and pre-diabetic patients.',
  },
  {
    Icon: Brain,
    title: 'Thyroid Panel',
    body: 'Evaluates thyroid function through TSH, T3, and T4 measurements. Essential for patients with suspected or diagnosed thyroid disorders.',
  },
  {
    Icon: Pill,
    title: 'Liver Function Panel (LFT)',
    body: 'Measures enzymes and proteins that indicate how well your liver is working. Commonly ordered for patients on medications that affect liver function or those with suspected liver conditions.',
  },
  {
    Icon: Microscope,
    title: 'Kidney Function Panel',
    body: 'Evaluates creatinine, BUN, and GFR to assess kidney health and filtration capacity. Important for patients with hypertension, diabetes, or kidney-related concerns.',
  },
];

const SPECIALTY_PANELS = [
  {
    Icon: Users,
    title: 'Men\'s Health & TRT Monitoring',
    body: 'Testosterone panels (total and free), estradiol (E2) testing, hematocrit monitoring, PSA testing, SHBG, LH, FSH, and comprehensive TRT monitoring panels. Designed for men on testosterone replacement therapy and patients requiring ongoing hormone-level tracking.',
  },
  {
    Icon: Activity,
    title: 'Full Hormone Panels',
    body: 'Comprehensive hormone testing for both men and women, including panels that assess thyroid function, reproductive hormones, adrenal function, and metabolic markers.',
  },
  {
    Icon: Syringe,
    title: 'Specialty Blood Panels',
    body: 'Custom and specialty panels as ordered by your physician, including less common markers that high-volume chain labs often deprioritize or delay.',
  },
];

const FAQ_ITEMS = [
  {
    q: 'Do I need an appointment for blood work at Sunshine Clinical Lab in Trinity?',
    a: 'For most routine blood tests and standard panels, walk-ins are welcome at our Trinity, FL location. No appointment needed for standard services. For specialty tests like DNA or gender reveal, calling ahead is recommended.',
  },
  {
    q: 'What should I bring to my lab appointment?',
    a: 'Bring your physician\'s lab order (if applicable), a valid photo ID, and your insurance card. If fasting is required for your specific test, your doctor\'s office or our team will advise you in advance.',
  },
  {
    q: 'How fast do I get my results from Sunshine Clinical Lab?',
    a: 'Many routine blood tests — including CBC, CMP, and lipid panels — are available the next business day. Turnaround times vary by test type. Our team will provide a timeline during your visit.',
  },
  {
    q: 'Do you accept insurance for lab testing at your Trinity location?',
    a: 'Yes, we accept most major insurance plans. Please contact us at (727) 233-5223 to verify your specific coverage before your visit.',
  },
  {
    q: 'What ages do you serve?',
    a: 'All ages are welcome at Sunshine Clinical Lab — from pediatric patients to seniors. Our experienced phlebotomists are skilled with patients of every age group.',
  },
  {
    q: 'Can my doctor send lab orders directly to Sunshine Clinical Lab?',
    a: 'Yes. Healthcare providers can send lab requisitions directly to our Trinity, FL office. Contact us at (727) 233-5223 for fax or electronic ordering details.',
  },
  {
    q: 'Do you offer blood work on a walk-in basis near New Port Richey?',
    a: 'Yes. Our Trinity, FL location at 3600 Galileo Dr is minutes from New Port Richey and welcomes walk-in patients for most routine blood work during business hours.',
  },
  {
    q: 'What specialty tests does Sunshine Clinical Lab offer beyond routine blood work?',
    a: 'Beyond standard panels, we specialize in TRT monitoring, full hormone panels, testosterone testing, estradiol, PSA, SHBG, LH/FSH, DNA testing (legal, immigration, paternity), and Peekaboo gender reveal blood tests.',
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

/* ─── Main page component ────────────────────────────────────── */
export default function ClinicalLabServicesPage() {
  const [openFaq, setOpenFaq] = useState(null);
  const toggleFaq = (i) => setOpenFaq((prev) => (prev === i ? null : i));

  const col1 = FAQ_ITEMS.slice(0, 4);
  const col2 = FAQ_ITEMS.slice(4);

  return (
    <div className="bg-sunshine-soft min-h-screen">

      {/* ══ HERO ════════════════════════════════════════════════ */}
      <section className="relative w-full min-h-[85vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src="/gt-bnr.jpg"
            alt="Walk-in lab testing at Sunshine Clinical Lab 3600 Galileo Dr Trinity FL"
            fill
            className="object-cover object-top sm:object-center"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-br from-sunshine-dark/85 via-[#1a3a5c]/80 to-sunshine-blue/75" />
        </div>
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full border border-white/5" />
          <div className="absolute bottom-20 -left-20 w-80 h-80 rounded-full border border-white/5" />
          <div className="absolute top-1/3 right-1/4 w-40 h-40 rounded-full bg-white/[0.03]" />
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 pt-36">
          <motion.div
            variants={heroContainerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-2xl text-left"
          >
            <motion.div variants={heroItemVariants}>
              <p className="text-white/75 text-sm font-semibold tracking-widest mb-6 uppercase">
                General Lab Testing / Clinical Services
              </p>
            </motion.div>

            <motion.h1
              variants={heroItemVariants}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-4"
            >
              Clinical Lab Services in Trinity, FL —{' '}
              <span className="text-[#93C5FD]">Walk-In Blood Work, Fast Results, Experienced Care</span>
            </motion.h1>

            <motion.h2
              variants={heroItemVariants}
              className="text-2xl sm:text-3xl font-bold text-white/90 mb-4"
            >
              Every Test. Every Panel. One Trusted Local Lab.
            </motion.h2>

            <motion.p
              variants={heroItemVariants}
              className="text-white/85 text-lg leading-relaxed mb-10 max-w-xl"
            >
              From routine blood work to specialty hormone panels, Sunshine Clinical Lab provides comprehensive clinical laboratory services with fast turnaround, experienced phlebotomists, and the personal care that chain labs don't deliver. Walk-ins welcome at our Trinity, FL location.
            </motion.p>

            <motion.div
              variants={heroItemVariants}
              className="flex flex-col items-start gap-3"
            >
              <a href="tel:+17272335223" className="w-full sm:w-auto">
                <ShimmerButton className="w-full sm:w-auto bg-white text-sunshine-dark px-7 py-3.5 rounded-full font-bold shadow-xl text-lg gap-2">
                  <Phone className="w-6 h-6" />
                  (727) 233-5223
                </ShimmerButton>
              </a>
              <p className="text-white/90 font-semibold text-sm sm:text-base ml-2">Walk In Today</p>
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

      {/* ══ DIRECT ANSWER (AEO/GEO) 1 ════════════════════════════ */}
      <section className="py-12 bg-[#EBF5FB]">
        <Section>
          <motion.div variants={itemVariants} className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
              <div className="h-1 w-full bg-gradient-to-r from-sunshine-blue to-sunshine-sky" />
              <div className="p-7 sm:p-9">
                <div className="flex items-center gap-2 mb-5">
                  <span className="inline-flex items-center gap-1.5 bg-sunshine-blue/10 text-sunshine-blue text-xs font-bold tracking-wide px-3 py-1.5 rounded-full">
                    <MapPin className="w-3.5 h-3.5" />
                    Trinity, FL 34655 — Pasco County
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-sunshine-dark mb-4">
                  What Lab Services Does Sunshine Clinical Lab Offer in Trinity, FL?
                </h2>
                <p className="text-gray-700 leading-relaxed text-base mb-7">
                  Sunshine Clinical Lab at <span className="font-semibold text-sunshine-dark">3600 Galileo Dr, Trinity, FL 34655</span> offers comprehensive clinical laboratory services including CBC, CMP, lipid panels, A1C, thyroid testing, liver and kidney function panels, hormone testing, testosterone panels, TRT monitoring, PSA testing, estradiol, SHBG, LH/FSH, legal and immigration DNA testing, paternity testing, and Peekaboo gender reveal blood tests. Walk-ins are welcome for most routine tests, and results for many services are available the next business day. The lab accepts most major insurance plans and offers competitive self-pay pricing. Call <a href="tel:+17272335223" className="text-sunshine-blue font-semibold hover:underline">(727) 233-5223</a>.
                </p>
                <div className="flex flex-wrap gap-3">
                  {[
                    { icon: CheckCircle2, label: 'Comprehensive Panels' },
                    { icon: Clock, label: 'Next-Day Results' },
                    { icon: BadgeCheck, label: 'Walk-Ins Welcome' },
                    { icon: ShieldCheck, label: 'Insurance Accepted' },
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

      {/* ══ OVERVIEW ═════════════════════════════════════════════ */}
      <section className="py-20 relative overflow-hidden" style={{ backgroundColor: '#0d1b2a' }}>
        <div className="absolute inset-0 overflow-hidden">
          <Image src="/gt-sd.jpg" alt="" fill className="object-cover" style={{ opacity: 0.3 }} aria-hidden="true" />
        </div>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Section>
            <motion.div variants={itemVariants} className="mb-10 text-center">
              <span className="text-xs font-bold uppercase tracking-widest text-sunshine-blue mb-3 block">
                The Sunshine Difference
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
                Complete Lab Testing — Without the Chain Lab Experience
              </h2>
            </motion.div>
            <motion.div
              variants={itemVariants}
              className="bg-transparent rounded-2xl p-8 space-y-4 text-gray-300 leading-relaxed"
            >
              <p>
                When your doctor orders blood work, you have a choice. You can go to a crowded national chain, take a number, wait 30 to 60 minutes in a fluorescent-lit room with strangers, and hope the person drawing your blood has done this more than a few dozen times.
              </p>
              <p>
                Or you can walk into Sunshine Clinical Lab in Trinity, FL.
              </p>
              <p>
                Our laboratory at <strong className="text-white">3600 Galileo Dr, Trinity, FL 34655, USA</strong> offers the full range of clinical lab testing services that physicians, specialists, and patients across Pasco County rely on — processed by experienced professionals with over 35 years of combined phlebotomy expertise, and returned with some of the fastest turnaround times in the area.
              </p>
              <p className="font-bold text-white text-lg pt-4">
                Walk-ins are welcome for most services. All ages are welcome — pediatric through geriatric.
              </p>
              <p>
                And for patients who can't visit our Trinity office, our <Link href="/mobile-blood-draw-pasco-county" className="text-sunshine-blue font-semibold hover:underline">mobile blood draw service</Link> brings the lab to your door anywhere in Pasco County.
              </p>
            </motion.div>
          </Section>
        </div>
      </section>

      {/* ══ ROUTINE BLOOD WORK ═══════════════════════════════════ */}
      <section className="py-20 overflow-hidden" style={{ backgroundColor: '#CCE9F7' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Section>
            <motion.div variants={itemVariants} className="mb-10 text-center max-w-3xl mx-auto">
              <span className="text-xs font-bold uppercase tracking-widest text-sunshine-blue mb-3 block">
                Standard Care
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-sunshine-dark mb-4">
                Routine Blood Work & Panels
              </h2>
              <p className="text-gray-700 leading-relaxed text-center">
                The foundation of preventive healthcare starts with accurate, timely lab work. Sunshine Clinical Lab performs all standard physician-ordered blood tests at our Trinity, FL location, including:
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
              {ROUTINE_PANELS.map(({ Icon, title, body }, i) => (
                <motion.div key={title} variants={cardVariants} custom={i}>
                  <MagicCard gradientColor="#3B82F620" borderGlowColor="#2B7DBF" className="shadow-md hover:shadow-xl h-full">
                    <div className="p-7 flex flex-col gap-4 h-full">
                      <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center flex-shrink-0">
                        <Icon className="w-6 h-6 text-sunshine-blue" />
                      </div>
                      <h3 className="text-lg font-bold text-sunshine-dark">{title}</h3>
                      <p className="text-gray-600 text-sm leading-relaxed">{body}</p>
                    </div>
                  </MagicCard>
                </motion.div>
              ))}
            </div>
          </Section>
        </div>
      </section>

      {/* ══ HORMONE & SPECIALTY TESTING ══════════════════════════ */}
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <Image src="/gt-adv.jpg" alt="" fill className="object-cover" style={{ opacity: 0.3 }} aria-hidden="true" />
        </div>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Section>
            <motion.div variants={itemVariants} className="mb-10">
              <span className="text-xs font-bold uppercase tracking-widest text-sunshine-blue mb-3 block">
                Advanced Services
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-sunshine-dark mb-4">
                Hormone & Specialty Testing in Trinity, FL
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Beyond routine panels, Sunshine Clinical Lab specializes in testing that many large chain labs process but never prioritize. Our hormone and specialty testing services include:
              </p>
            </motion.div>

            <div className="grid grid-cols-1 gap-6 mb-8">
              {SPECIALTY_PANELS.map(({ Icon, title, body }, i) => (
                <motion.div key={title} variants={cardVariants} custom={i}>
                  <div className="bg-sunshine-soft rounded-2xl p-7 shadow-sm border border-sunshine-sky/20 flex flex-col sm:flex-row gap-6">
                    <div className="w-14 h-14 rounded-2xl bg-sunshine-blue/10 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-7 h-7 text-sunshine-blue" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-sunshine-dark mb-2">{title}</h3>
                      <p className="text-gray-600 text-sm leading-relaxed">{body}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div variants={itemVariants} className="mt-8 text-center text-gray-500 text-sm">
               For TRT specifically, see our <Link href="/trt-blood-test-pasco-county" className="text-sunshine-blue hover:underline">TRT Blood Test page</Link>.
            </motion.div>
          </Section>
        </div>
      </section>

      {/* ══ WALK-IN SERVICES & FAST RESULTS ══════════════════════ */}
      <section className="py-20 bg-sunshine-soft overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Section>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <motion.div variants={itemVariants} className="flex flex-col justify-center">
                <span className="text-xs font-bold uppercase tracking-widest text-sunshine-blue mb-3 block">
                  Convenience
                </span>
                <h2 className="text-3xl font-extrabold text-sunshine-dark mb-5">
                  Walk-In Lab Services — No Appointment Needed for Most Tests
                </h2>
                <div className="space-y-4 text-gray-600 leading-relaxed mb-8">
                  <p>
                    One of the most common complaints about large chain labs is the unpredictable wait time. You could walk in and be done in 20 minutes — or you could sit for an hour and a half wondering if they forgot about you.
                  </p>
                  <p>
                    At Sunshine Clinical Lab in Trinity, FL, walk-in patients for routine blood work are typically seen quickly. We manage our patient flow intentionally so nobody's stuck in a waiting room watching the clock. Bring your physician's lab order, your ID, and your insurance card (if applicable), and we'll handle the rest.
                  </p>
                  <p className="text-sm font-semibold">
                    For specialty services like <Link href="/dna-testing-pasco-county" className="text-sunshine-blue hover:underline">DNA testing</Link> or <Link href="/gender-reveal-testing-florida" className="text-sunshine-blue hover:underline">gender reveal blood tests</Link>, we recommend calling ahead to ensure availability and proper coordination.
                  </p>
                </div>
                
                <div className="flex flex-col items-start gap-2">
                  <a href="tel:+17272335223">
                    <ShimmerButton className="bg-sunshine-blue text-white px-7 py-3 rounded-full font-bold shadow-lg text-lg gap-2">
                      <Phone className="w-5 h-5"/>
                      (727) 233-5223
                    </ShimmerButton>
                  </a>
                  <p className="text-sunshine-dark text-sm font-semibold ml-2">
                    Walk In Today at 3600 Galileo Dr, Trinity, FL 34655, USA
                  </p>
                </div>
              </motion.div>

              <motion.div variants={itemVariants} className="flex flex-col justify-center bg-white rounded-3xl p-8 sm:p-10 shadow-sm border border-sunshine-blue/10">
                <div className="w-12 h-12 bg-sunshine-blue/10 rounded-2xl flex items-center justify-center mb-6">
                  <Clock className="w-6 h-6 text-sunshine-blue"/>
                </div>
                <h2 className="text-2xl font-extrabold text-sunshine-dark mb-4">
                  Same-Day Blood Draws, Next-Day Results for Many Tests
                </h2>
                <div className="space-y-4 text-gray-600 leading-relaxed text-sm">
                  <p>
                    Speed matters. Whether you're managing a chronic condition, monitoring medications, or completing pre-surgical lab requirements, waiting days for results creates unnecessary anxiety and delays in care.
                  </p>
                  <p>
                    At Sunshine Clinical Lab, results for many routine blood tests — including CBC, CMP, lipid panels, and A1C — are available the next business day. Turnaround for specialty tests varies by marker, but we consistently outperform the timelines that patients experience at high-volume national chain labs.
                  </p>
                  <p className="font-bold text-sunshine-dark pt-2">
                    We process your blood work with urgency because we understand that behind every test tube is a patient waiting for answers.
                  </p>
                </div>
              </motion.div>
            </div>
          </Section>
        </div>
      </section>

      {/* ══ PHYSICIAN PARTNERSHIPS ═══════════════════════════════ */}
      <section className="py-20 relative overflow-hidden bg-gradient-to-r from-[#0d1b2a] to-[#1a3a5c]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <Section>
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/10 text-white mb-6">
              <Stethoscope className="w-8 h-8"/>
            </div>
            <motion.h2
              variants={itemVariants}
              className="text-3xl sm:text-4xl font-extrabold text-white mb-6"
            >
              Physician & Provider Partnerships
            </motion.h2>
            <motion.p
              variants={itemVariants}
              className="text-white/80 text-lg leading-relaxed mb-6"
            >
              Sunshine Clinical Lab works directly with physicians, specialists, urgent care clinics, and healthcare providers throughout Pasco County and Tampa Bay. If you're a provider looking for a reliable, responsive lab partner that your patients will actually enjoy visiting, we'd welcome the conversation.
            </motion.p>
            <motion.div variants={itemVariants} className="bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8 text-left mb-8">
              <h3 className="text-xl font-bold text-white mb-3">What Providers Can Expect From Us</h3>
              <p className="text-white/70 leading-relaxed text-sm">
                Fast turnaround on results, accurate processing, electronic reporting capabilities, and the kind of patient experience that reflects well on the providers who refer to us. Our Trinity, FL location is centrally positioned to serve practices across Pasco County.
              </p>
            </motion.div>
            <motion.div variants={itemVariants} className="flex flex-col items-center gap-2">
              <a href="tel:+17272335223">
                <ShimmerButton className="bg-white text-sunshine-dark px-8 py-3.5 rounded-full font-bold shadow-xl text-lg gap-2">
                  <Phone className="w-5 h-5"/>
                  (727) 233-5223
                </ShimmerButton>
              </a>
              <p className="text-white text-sm font-semibold">Physicians — Partner With Us</p>
            </motion.div>
          </Section>
        </div>
      </section>

      {/* ══ DIRECT ANSWER (AEO/GEO) 2 ════════════════════════════ */}
      <section className="py-12 bg-[#EBF5FB]">
        <Section>
          <motion.div variants={itemVariants} className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
              <div className="h-1 w-full bg-gradient-to-r from-sunshine-blue to-sunshine-sky" />
              <div className="p-7 sm:p-9">
                <div className="flex items-center gap-2 mb-5">
                  <span className="inline-flex items-center gap-1.5 bg-sunshine-blue/10 text-sunshine-blue text-xs font-bold tracking-wide px-3 py-1.5 rounded-full">
                    <Clock className="w-3.5 h-3.5" />
                    Walk-In Services
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-sunshine-dark mb-4">
                  Is There a Walk-In Lab Near Me in Trinity, FL?
                </h2>
                <p className="text-gray-700 leading-relaxed text-base mb-4">
                  Yes. Sunshine Clinical Lab at <strong className="text-sunshine-dark">3600 Galileo Dr, Trinity, FL 34655, USA</strong> is a walk-in clinical laboratory that accepts patients without appointments for most routine blood work.
                </p>
                <p className="text-gray-700 leading-relaxed text-sm mb-7">
                  The lab offers CBC, CMP, lipid panels, thyroid testing, hormone panels, TRT blood tests, and many other services. Results for many tests are available the next business day. The lab <Link className="text-sunshine-blue hover:underline" href="/insurance-accepted">accepts most major insurance plans</Link> and serves patients of all ages from <Link className="text-sunshine-blue hover:underline" href="/clinical-lab-trinity-fl">Trinity</Link>, <Link className="text-sunshine-blue hover:underline" href="/clinical-lab-new-port-richey">New Port Richey</Link>, <Link className="text-sunshine-blue hover:underline" href="/clinical-lab-land-o-lakes-fl">Land O' Lakes</Link>, <Link className="text-sunshine-blue hover:underline" href="/clinical-lab-tarpon-springs-fl">Tarpon Springs</Link>, and surrounding Pasco County communities.
                </p>
                <div className="flex flex-wrap gap-2 sm:gap-3">
                  <span className="inline-flex items-center gap-1.5 bg-sunshine-soft border border-sunshine-blue/15 text-sunshine-dark text-xs font-semibold px-3 py-1.5 rounded-full">
                    <Clock className="w-3.5 h-3.5 text-sunshine-blue flex-shrink-0" />
                    Walk-Ins Welcome
                  </span>
                  <a href="tel:+17272335223" className="inline-flex items-center gap-1.5 bg-sunshine-soft border border-sunshine-blue/15 text-sunshine-dark text-xs font-semibold px-3 py-1.5 rounded-full hover:border-sunshine-blue transition-colors">
                    <Phone className="w-3.5 h-3.5 text-sunshine-blue flex-shrink-0" />
                    (727) 233-5223
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </Section>
      </section>

      {/* ══ FAQ ═════════════════════════════════════════════════ */}
      <section className="py-20 relative overflow-hidden bg-[#D6EAF8]">
        <div className="absolute inset-0">
          <Image
            src="/dna-faq.jpg"
            alt="Clinical lab services waiting area at Sunshine Clinical Lab Pasco County"
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
                Clinical Lab Services — Frequently Asked Questions
              </h2>
              <p className="text-sunshine-dark/60 mt-4 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
                Everything you need to know before visiting Sunshine Clinical Lab in Pasco County.
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
              className="inline-flex items-center justify-center mx-auto text-white/90 mb-6 bg-white/10 px-5 py-2 rounded-full font-semibold border border-white/20 text-sm shadow-sm"
            >
              Sunshine Clinical Lab
            </motion.span>

            <motion.h2
              variants={itemVariants}
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-5 drop-shadow-sm"
            >
              Your Lab Work. Done Right. Done Fast. <br className="hidden sm:block"/>
              <span className="text-[#93C5FD]">Done Here in Trinity, FL.</span>
            </motion.h2>

            <motion.p
              variants={itemVariants}
              className="text-white/85 text-lg leading-relaxed mt-5 md:mt-6 mb-7 max-w-2xl mx-auto font-medium"
            >
              Sunshine Clinical Lab provides the full range of clinical lab services Pasco County needs — with the speed, accuracy, and personal care that the big chains don't. Locally owned. Over 35 years of combined experience. Walk-ins welcome.
            </motion.p>
            
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row justify-center items-center gap-6 mb-12"
            >
              <div className="flex flex-col items-center">
                <a href="tel:+17272335223" className="w-full sm:w-auto">
                  <ShimmerButton className="w-full sm:w-auto bg-white text-sunshine-dark px-10 py-4 rounded-full font-bold shadow-2xl text-xl gap-2 tracking-wide">
                    <Phone className="w-6 h-6" />
                    (727) 233-5223
                  </ShimmerButton>
                </a>
                <p className="text-white font-semibold mt-3 text-sm">Call Today or Walk In Now</p>
              </div>
              <div className="flex flex-col items-center">
                 <Link href="/mobile-blood-draw-pasco-county">
                    <ShimmerButton className="bg-white/10 border-2 border-white text-white px-8 py-4 rounded-full font-bold shadow-xl text-lg hover:bg-white/20 transition">
                      Mobile Blood Draw
                    </ShimmerButton>
                 </Link>
                 <p className="text-white font-semibold mt-3 text-sm">Request a House Call</p>
              </div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-white/80 text-sm font-medium"
            >
              <span className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-white/90" />
                3600 Galileo Dr, Trinity, FL 34655, USA
              </span>
              <span className="hidden sm:block text-white/30">|</span>
              <span className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-white/90" />
                Mon–Fri 8:00am–5:00pm
              </span>
            </motion.div>
          </Section>
        </div>
      </section>

    </div>
  );
}
