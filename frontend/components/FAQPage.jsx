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
  CalendarDays,
  HelpCircle,
  Shield,
  Building2,
  Syringe,
  FlaskConical,
  Activity,
  Baby,
  CreditCard,
} from 'lucide-react';
import { ShimmerButton } from '@/registry/magicui/shimmer-button';

/* ─── Animation variants ──────────────────────────────────────── */
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};
const heroContainerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
};
const heroItemVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

/* ─── Section scroll-triggered wrapper ───────────────────────── */
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

/* ─── FaqItem accordion ───────────────────────────────────────── */
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
              <div className="text-sunshine-dark text-sm leading-relaxed">{a}</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─── FAQ Data ────────────────────────────────────────────────── */

/* Section 1 — General (idx 0–5) */
const GENERAL_FAQS = [
  {
    q: 'Where is Sunshine Clinical Lab located?',
    a: (
      <>
        We&apos;re located at 3600 Galileo Dr, Trinity, FL 34655, USA. Our office is easily
        accessible from US-19, the Suncoast Parkway, SR-54, and Little Road, with free parking
        on-site. We serve patients from{' '}
        <Link href="/clinical-lab-trinity-fl" className="text-sunshine-blue font-semibold hover:underline">
          Trinity
        </Link>
        ,{' '}
        <Link href="/clinical-lab-new-port-richey" className="text-sunshine-blue font-semibold hover:underline">
          New Port Richey
        </Link>
        ,{' '}
        <Link href="/clinical-lab-land-o-lakes-fl" className="text-sunshine-blue font-semibold hover:underline">
          Land O&apos; Lakes
        </Link>
        ,{' '}
        <Link href="/clinical-lab-tarpon-springs-fl" className="text-sunshine-blue font-semibold hover:underline">
          Tarpon Springs
        </Link>
        , and communities across Pasco County and Tampa Bay.
      </>
    ),
  },
  {
    q: 'What are your hours of operation?',
    a: (
      <>
        Please call our office at{' '}
        <a href="tel:+17272335223" className="text-sunshine-blue font-semibold hover:underline">
          (727) 233-5223
        </a>{' '}
        or visit sunshinelabus.com for current hours. We recommend calling ahead for the most
        up-to-date schedule, especially around holidays.
      </>
    ),
  },
  {
    q: 'Do I need an appointment for blood work?',
    a: (
      <>
        For most routine blood work and standard lab tests, walk-ins are welcome at our Trinity,
        FL location — no appointment necessary. For specialty services such as{' '}
        <Link href="/dna-testing-pasco-county" className="text-sunshine-blue font-semibold hover:underline">
          DNA testing
        </Link>{' '}
        and{' '}
        <Link href="/gender-reveal-testing-florida" className="text-sunshine-blue font-semibold hover:underline">
          gender reveal blood tests
        </Link>
        , we recommend scheduling in advance by calling{' '}
        <a href="tel:+17272335223" className="text-sunshine-blue font-semibold hover:underline">
          (727) 233-5223
        </a>
        .
      </>
    ),
  },
  {
    q: 'What should I bring to my lab appointment?',
    a: "Bring your physician's lab order (if applicable), a valid government-issued photo ID, and your insurance card. If your test requires fasting, your provider or our team will advise you in advance.",
  },
  {
    q: 'Do you serve patients of all ages?',
    a: 'Yes. Sunshine Clinical Lab welcomes patients of all ages, from pediatric to geriatric. Our experienced phlebotomists are skilled with every age group, including children and patients with difficult veins.',
  },
  {
    q: 'What makes Sunshine Clinical Lab different from chain labs?',
    a: (
      <>
        We&apos;re locally owned and operated in Trinity, FL, with over 35 years of combined
        phlebotomy experience. Our patients experience significantly shorter wait times,
        personalized care, competitive pricing, specialty services like{' '}
        <Link href="/trt-blood-test-pasco-county" className="text-sunshine-blue font-semibold hover:underline">
          TRT monitoring
        </Link>{' '}
        and{' '}
        <Link href="/dna-testing-pasco-county" className="text-sunshine-blue font-semibold hover:underline">
          DNA testing
        </Link>
        , and{' '}
        <Link href="/mobile-blood-draw-pasco-county" className="text-sunshine-blue font-semibold hover:underline">
          mobile blood draw
        </Link>{' '}
        convenience — things that large national chain labs simply aren&apos;t designed to
        prioritize.
      </>
    ),
  },
];

/* Section 2 — Results & Turnaround (idx 6–8) */
const RESULTS_FAQS = [
  {
    q: 'How fast will I get my lab results?',
    a: 'For many routine blood tests — including CBC, CMP, lipid panels, and A1C — results are available the next business day. Turnaround times vary for specialty tests and certain markers. Our team will provide an estimated timeline during your visit.',
  },
  {
    q: 'How do I receive my results?',
    a: 'Results are typically sent to your ordering physician. Ask our team about available options for accessing your results directly if needed.',
  },
  {
    q: 'Are results from mobile blood draws slower than in-office draws?',
    a: (
      <>
        No. Samples drawn at your home through our{' '}
        <Link href="/mobile-blood-draw-pasco-county" className="text-sunshine-blue font-semibold hover:underline">
          mobile phlebotomy service
        </Link>{' '}
        are processed through the same pipeline as in-office draws at our Trinity lab. Turnaround
        times are the same.
      </>
    ),
  },
];

/* Section 3 — Insurance & Pricing (idx 9–12) */
const INSURANCE_FAQS = [
  {
    q: 'What insurance plans do you accept?',
    a: (
      <>
        We accept most major insurance plans. Contact us at{' '}
        <a href="tel:+17272335223" className="text-sunshine-blue font-semibold hover:underline">
          (727) 233-5223
        </a>{' '}
        to verify your specific coverage before your visit.{' '}
        <Link href="/insurance-accepted" className="text-sunshine-blue font-semibold hover:underline">
          Learn more about accepted insurance plans
        </Link>
        .
      </>
    ),
  },
  {
    q: "What if I don't have insurance?",
    a: "We offer competitive self-pay rates on all services. As an independent lab in Trinity, FL, our pricing is often more affordable than large chain labs. Call us for specific pricing.",
  },
  {
    q: 'How much does blood work cost without insurance?',
    a: (
      <>
        Pricing varies by test. Call{' '}
        <a href="tel:+17272335223" className="text-sunshine-blue font-semibold hover:underline">
          (727) 233-5223
        </a>{' '}
        for self-pay rates on the specific tests you need. We&apos;re transparent about costs and
        happy to discuss pricing before your visit.
      </>
    ),
  },
  {
    q: 'Are DNA testing and gender reveal tests covered by insurance?',
    a: (
      <>
        <Link href="/dna-testing-pasco-county" className="text-sunshine-blue font-semibold hover:underline">
          DNA testing
        </Link>{' '}
        (legal, immigration, paternity) and the{' '}
        <Link href="/gender-reveal-testing-florida" className="text-sunshine-blue font-semibold hover:underline">
          Peekaboo gender reveal blood test
        </Link>{' '}
        are typically self-pay services not covered by insurance. Contact us for current pricing
        on both.
      </>
    ),
  },
];

/* Section 4 — Mobile Blood Draw (idx 13–16) */
const MOBILE_FAQS = [
  {
    q: 'Do you offer mobile blood draws near me?',
    a: (
      <>
        Yes. Our{' '}
        <Link href="/mobile-blood-draw-pasco-county" className="text-sunshine-blue font-semibold hover:underline">
          mobile phlebotomy team
        </Link>{' '}
        provides blood draws at your home, office, or care facility throughout Pasco County,
        including Trinity, New Port Richey, Land O&apos; Lakes, Tarpon Springs, Holiday, Hudson,
        and surrounding communities. Call{' '}
        <a href="tel:+17272335223" className="text-sunshine-blue font-semibold hover:underline">
          (727) 233-5223
        </a>{' '}
        to schedule.
      </>
    ),
  },
  {
    q: 'How do I schedule a mobile blood draw?',
    a: (
      <>
        Call{' '}
        <a href="tel:+17272335223" className="text-sunshine-blue font-semibold hover:underline">
          (727) 233-5223
        </a>{' '}
        to schedule. We&apos;ll confirm your location, the tests needed, any fasting or
        preparation requirements, and a convenient appointment time.
      </>
    ),
  },
  {
    q: 'What areas do you cover for mobile phlebotomy?',
    a: (
      <>
        We serve communities throughout Pasco County and the greater Tampa Bay region, including{' '}
        <Link href="/clinical-lab-trinity-fl" className="text-sunshine-blue font-semibold hover:underline">
          Trinity
        </Link>
        ,{' '}
        <Link href="/clinical-lab-new-port-richey" className="text-sunshine-blue font-semibold hover:underline">
          New Port Richey
        </Link>
        ,{' '}
        <Link href="/clinical-lab-land-o-lakes-fl" className="text-sunshine-blue font-semibold hover:underline">
          Land O&apos; Lakes
        </Link>
        ,{' '}
        <Link href="/clinical-lab-tarpon-springs-fl" className="text-sunshine-blue font-semibold hover:underline">
          Tarpon Springs
        </Link>
        , Holiday, Hudson, Port Richey, Odessa, East Lake, and more. Call to confirm
        availability in your specific area.
      </>
    ),
  },
  {
    q: 'Can I get TRT or hormone blood work done through a mobile draw?',
    a: (
      <>
        Yes. Our{' '}
        <Link href="/mobile-blood-draw-pasco-county" className="text-sunshine-blue font-semibold hover:underline">
          mobile phlebotomy service
        </Link>{' '}
        supports full{' '}
        <Link href="/trt-blood-test-pasco-county" className="text-sunshine-blue font-semibold hover:underline">
          TRT monitoring panels
        </Link>
        , hormone testing, and most physician-ordered blood work — all drawn at your location
        with the same fast turnaround as in-office visits.
      </>
    ),
  },
];

/* Section 5 — TRT & Hormone Testing (idx 17–20) */
const TRT_FAQS = [
  {
    q: 'Do you offer TRT blood testing at Sunshine Clinical Lab?',
    a: (
      <>
        Yes. We provide{' '}
        <Link href="/trt-blood-test-pasco-county" className="text-sunshine-blue font-semibold hover:underline">
          comprehensive TRT monitoring panels
        </Link>{' '}
        including total and free testosterone, estradiol (E2), hematocrit, CBC, CMP, PSA, SHBG,
        LH, and FSH. Results for many TRT-related tests are available the next business day.
        Walk-ins are welcome at our Trinity, FL location.
      </>
    ),
  },
  {
    q: 'How much does TRT blood work cost?',
    a: (
      <>
        Pricing depends on the specific panel and your insurance coverage. Contact us at{' '}
        <a href="tel:+17272335223" className="text-sunshine-blue font-semibold hover:underline">
          (727) 233-5223
        </a>{' '}
        for current self-pay rates and insurance verification. Our{' '}
        <Link href="/trt-blood-test-pasco-county" className="text-sunshine-blue font-semibold hover:underline">
          TRT panel pricing
        </Link>{' '}
        is competitive — often significantly less than chain labs.
      </>
    ),
  },
  {
    q: 'Can I walk in for TRT labs?',
    a: (
      <>
        Yes, walk-ins are welcome for most blood work including{' '}
        <Link href="/trt-blood-test-pasco-county" className="text-sunshine-blue font-semibold hover:underline">
          TRT panels
        </Link>{' '}
        at our Trinity, FL location.
      </>
    ),
  },
  {
    q: 'What TRT tests should I get regularly?',
    a: "Most TRT providers recommend monitoring total and free testosterone, estradiol, hematocrit/CBC, CMP, and PSA at minimum. SHBG, LH, and FSH may also be recommended. Always follow your prescribing physician's specific protocol.",
  },
];

/* Section 6 — DNA Testing (idx 21–24) */
const DNA_FAQS = [
  {
    q: 'What types of DNA testing do you offer?',
    a: (
      <>
        We offer{' '}
        <Link href="/dna-testing-pasco-county" className="text-sunshine-blue font-semibold hover:underline">
          legal DNA testing
        </Link>
        , immigration DNA testing (USCIS), paternity testing (legal and informational), and
        relationship DNA testing — all performed under proper chain-of-custody protocols when
        legal admissibility is required.
      </>
    ),
  },
  {
    q: 'Is your DNA testing legally admissible in court?',
    a: (
      <>
        Yes. When performed under chain-of-custody protocols at our Trinity, FL facility, our{' '}
        <Link href="/dna-testing-pasco-county" className="text-sunshine-blue font-semibold hover:underline">
          DNA testing
        </Link>{' '}
        results are legally admissible and accepted by courts and government agencies including
        USCIS.
      </>
    ),
  },
  {
    q: 'Do I need an appointment for DNA testing?',
    a: (
      <>
        Yes,{' '}
        <Link href="/dna-testing-pasco-county" className="text-sunshine-blue font-semibold hover:underline">
          DNA testing
        </Link>{' '}
        appointments should be scheduled in advance to ensure all participants, documentation,
        and identification requirements are properly coordinated. Call{' '}
        <a href="tel:+17272335223" className="text-sunshine-blue font-semibold hover:underline">
          (727) 233-5223
        </a>{' '}
        to schedule.
      </>
    ),
  },
  {
    q: 'Can I get immigration DNA testing at Sunshine Clinical Lab?',
    a: (
      <>
        Yes. We handle immigration{' '}
        <Link href="/dna-testing-pasco-county" className="text-sunshine-blue font-semibold hover:underline">
          DNA testing
        </Link>{' '}
        required by USCIS, including chain-of-custody collection, identity verification,
        photographic documentation, and coordination with AABB-accredited laboratories.
      </>
    ),
  },
];

/* Section 7 — Gender Reveal Testing (idx 25–28) */
const GENDER_FAQS = [
  {
    q: "How early can I find out my baby's gender with a blood test?",
    a: (
      <>
        The{' '}
        <Link href="/gender-reveal-testing-florida" className="text-sunshine-blue font-semibold hover:underline">
          Peekaboo Early Gender Reveal Blood Test
        </Link>{' '}
        can determine fetal gender as early as 7 weeks into pregnancy through a simple,
        non-invasive blood draw from the mother&apos;s arm. Available at our Trinity, FL location.
      </>
    ),
  },
  {
    q: 'Is the Peekaboo gender reveal test safe?',
    a: "Yes. It's a standard blood draw from the mother's arm — the same type of draw used for routine prenatal testing. It is completely non-invasive to the baby.",
  },
  {
    q: 'Can I get my gender reveal results in a sealed envelope?',
    a: (
      <>
        Absolutely. Let us know when scheduling, and we&apos;ll seal your results for your{' '}
        <Link href="/gender-reveal-testing-florida" className="text-sunshine-blue font-semibold hover:underline">
          gender reveal party
        </Link>
        , private opening, or handoff to your event planner.
      </>
    ),
  },
  {
    q: 'How much does the gender reveal blood test cost?',
    a: (
      <>
        Contact us at{' '}
        <a href="tel:+17272335223" className="text-sunshine-blue font-semibold hover:underline">
          (727) 233-5223
        </a>{' '}
        for current Peekaboo test pricing. This service is typically self-pay and not covered by
        insurance.{' '}
        <Link href="/insurance-accepted" className="text-sunshine-blue font-semibold hover:underline">
          Learn more about our accepted insurance plans
        </Link>
        .
      </>
    ),
  },
];

/* ─── Section config ──────────────────────────────────────────── */
const FAQ_SECTIONS = [
  {
    id: 'general',
    eyebrow: 'General',
    title: 'General Questions About Sunshine Clinical Lab',
    icon: Building2,
    bg: 'bg-[#EBF5FB]',
    items: GENERAL_FAQS,
    startIdx: 0,
  },
  {
    id: 'results',
    eyebrow: 'Results & Turnaround',
    title: 'Questions About Lab Results & Turnaround Times',
    icon: Clock,
    bg: 'bg-white',
    items: RESULTS_FAQS,
    startIdx: 6,
  },
  {
    id: 'insurance',
    eyebrow: 'Insurance & Pricing',
    title: 'Questions About Insurance & Pricing',
    icon: CreditCard,
    bg: 'bg-[#EBF5FB]',
    items: INSURANCE_FAQS,
    startIdx: 9,
  },
  {
    id: 'mobile',
    eyebrow: 'Mobile Blood Draw',
    title: 'Questions About Mobile Blood Draw Services',
    icon: Syringe,
    bg: 'bg-white',
    items: MOBILE_FAQS,
    startIdx: 13,
  },
  {
    id: 'trt',
    eyebrow: 'TRT & Hormone Testing',
    title: 'Questions About TRT & Hormone Blood Testing',
    icon: Activity,
    bg: 'bg-[#EBF5FB]',
    items: TRT_FAQS,
    startIdx: 17,
  },
  {
    id: 'dna',
    eyebrow: 'DNA Testing',
    title: 'Questions About DNA Testing Services',
    icon: FlaskConical,
    bg: 'bg-white',
    items: DNA_FAQS,
    startIdx: 21,
  },
  {
    id: 'gender',
    eyebrow: 'Gender Reveal Testing',
    title: 'Questions About Gender Reveal Blood Testing',
    icon: Baby,
    bg: 'bg-[#D6EAF8]',
    items: GENDER_FAQS,
    startIdx: 25,
  },
];

/* ─── Main component ──────────────────────────────────────────── */
export default function FAQPage() {
  const [openFaq, setOpenFaq] = useState(null);
  const toggleFaq = (i) => setOpenFaq((prev) => (prev === i ? null : i));

  return (
    <div className="bg-sunshine-soft min-h-screen">

      {/* ══ HERO ═════════════════════════════════════════════════════ */}
      <section className="relative w-full min-h-[85vh] flex items-center overflow-hidden">
        {/* Banner image */}
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src="/faq-bnr.jpg"
            alt="Sunshine Clinical Lab FAQ — Clinical Lab in Trinity FL serving Pasco County"
            fill
            className="object-cover object-center"
            priority
            onError={(e) => { e.currentTarget.style.display = 'none'; }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-sunshine-dark/90 via-[#1a3a5c]/85 to-sunshine-blue/70" />
        </div>

        {/* Decorative rings */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
          <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full border border-white/5" />
          <div className="absolute bottom-20 -left-20 w-80 h-80 rounded-full border border-white/5" />
          <div className="absolute top-1/3 right-1/4 w-40 h-40 rounded-full bg-white/[0.03]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full border border-white/[0.03]" />
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 pt-36">
          <motion.div
            variants={heroContainerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-2xl ml-auto text-right"
          >
            <motion.div variants={heroItemVariants}>
              <p className="text-white/75 text-sm font-semibold tracking-widest mb-6">
                Sunshine Clinical Lab — Trinity, FL &amp; Pasco County
              </p>
            </motion.div>

            <motion.h1
              variants={heroItemVariants}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-4"
            >
              Frequently Asked Questions —{' '}
              <span className="text-sunshine-sky">
                Sunshine Clinical Lab in Trinity, FL
              </span>
            </motion.h1>

            <motion.h2
              variants={heroItemVariants}
              className="text-2xl sm:text-3xl font-bold leading-snug text-white/90 mb-6"
            >
              Your Questions, Answered — From Appointments to Results to Pricing
            </motion.h2>

            <motion.p
              variants={heroItemVariants}
              className="text-white/85 text-lg leading-relaxed mb-10 max-w-xl ml-auto"
            >
              We know that lab testing comes with a lot of questions — about costs, timing,
              preparation, and what to expect. This page covers the most common questions our
              patients ask. If you don&apos;t find your answer here, call our team at{' '}
              <a
                href="tel:+17272335223"
                className="text-sunshine-sky font-semibold hover:underline"
              >
                (727) 233-5223
              </a>{' '}
              and we&apos;ll be happy to help.
            </motion.p>

            <motion.div
              variants={heroItemVariants}
              className="flex flex-col sm:flex-row flex-wrap gap-4 justify-end"
            >
              <a href="tel:+17272335223" className="w-full sm:w-auto">
                <ShimmerButton className="w-full sm:w-auto bg-white text-sunshine-dark px-7 py-3.5 rounded-full font-bold shadow-xl text-base gap-2">
                  <Phone className="w-5 h-5" aria-hidden="true" />
                  Call (727) 233-5223
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

        {/* Bottom fade — dissolves hero into FAQ sections, no visible divider */}
        <div
          className="absolute bottom-0 left-0 w-full h-28 sm:h-36 pointer-events-none z-10"
          style={{ background: 'linear-gradient(to bottom, transparent, #CCE9F7)' }}
          aria-hidden="true"
        />

      </section>

      {/* ══ FAQ SECTIONS ══════════════════════════════════════════════ */}
      <div className="relative bg-sunshine-soft">
        {/* Video background — loops continuously */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none"
          style={{ opacity: 0.5, zIndex: 0 }}
          aria-hidden="true"
        >
          <source src="/faq-bg2.mp4" type="video/mp4" />
        </video>
        {/* Left blue gradient */}
        <div
          className="absolute inset-y-0 left-0 pointer-events-none w-12 sm:w-20 md:w-28 lg:w-40"
          style={{ background: 'linear-gradient(to right, rgba(204, 233, 247, 0.9), transparent)', zIndex: 1 }}
          aria-hidden="true"
        />
        {/* Right blue gradient */}
        <div
          className="absolute inset-y-0 right-0 pointer-events-none w-12 sm:w-20 md:w-28 lg:w-40"
          style={{ background: 'linear-gradient(to left, rgba(204, 233, 247, 0.9), transparent)', zIndex: 1 }}
          aria-hidden="true"
        />

      {FAQ_SECTIONS.map((section) => {
        const { id, eyebrow, title, icon: Icon, items, startIdx } = section;
        const mid = Math.ceil(items.length / 2);
        const col1 = items.slice(0, mid);
        const col2 = items.slice(mid);

        return (
          <section key={id} id={id} className="py-20 overflow-hidden relative" style={{ zIndex: 2 }}>
            <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
              <Section>
                {/* Section heading */}
                <motion.div
                  variants={itemVariants}
                  className="flex items-center gap-4 mb-10 bg-white/80 rounded-2xl px-4 sm:px-5 py-4 shadow-sm"
                >
                  <div className="w-12 h-12 rounded-2xl bg-sunshine-blue flex items-center justify-center flex-shrink-0 shadow-md">
                    <Icon className="w-6 h-6 text-white" aria-hidden="true" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-xs font-bold uppercase tracking-widest text-sunshine-blue block mb-1">
                      {eyebrow}
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-sunshine-dark leading-tight">
                      {title}
                    </h2>
                  </div>
                </motion.div>

                {/* 2-column accordion grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 lg:gap-4 lg:items-start">
                  <div className="space-y-3">
                    {col1.map((item, i) => (
                      <motion.div key={`${id}-col1-${i}`} variants={itemVariants}>
                        <FaqItem
                          q={item.q}
                          a={item.a}
                          index={startIdx + i}
                          isOpen={openFaq === startIdx + i}
                          onToggle={() => toggleFaq(startIdx + i)}
                        />
                      </motion.div>
                    ))}
                  </div>
                  <div className="space-y-3">
                    {col2.map((item, i) => (
                      <motion.div key={`${id}-col2-${i}`} variants={itemVariants}>
                        <FaqItem
                          q={item.q}
                          a={item.a}
                          index={startIdx + mid + i}
                          isOpen={openFaq === startIdx + mid + i}
                          onToggle={() => toggleFaq(startIdx + mid + i)}
                        />
                      </motion.div>
                    ))}
                  </div>
                </div>
              </Section>
            </div>
          </section>
        );
      })}
      </div>

      {/* ══ DIRECT ANSWER BLOCK (AEO / GEO) ══════════════════════════ */}
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
                    Clinical Lab — Trinity, FL
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-sunshine-dark mb-4">
                  What Should I Know Before Visiting a Clinical Lab in Trinity, FL?
                </h2>
                <p className="text-gray-700 leading-relaxed text-base mb-7">
                  Before visiting Sunshine Clinical Lab at{' '}
                  <strong>3600 Galileo Dr, Trinity, FL 34655</strong>, patients should bring
                  their physician&apos;s lab order (if applicable), a valid photo ID, and their
                  insurance card. Fasting may be required for certain tests — your doctor or the
                  lab team will advise. Walk-ins are welcome for most routine blood work. For{' '}
                  <Link
                    href="/dna-testing-pasco-county"
                    className="text-sunshine-blue font-semibold hover:underline"
                  >
                    DNA testing
                  </Link>{' '}
                  or{' '}
                  <Link
                    href="/gender-reveal-testing-florida"
                    className="text-sunshine-blue font-semibold hover:underline"
                  >
                    gender reveal blood tests
                  </Link>
                  , appointments should be scheduled in advance by calling{' '}
                  <a
                    href="tel:+17272335223"
                    className="text-sunshine-blue font-semibold hover:underline"
                  >
                    (727) 233-5223
                  </a>
                  . The lab accepts most major{' '}
                  <Link
                    href="/insurance-accepted"
                    className="text-sunshine-blue font-semibold hover:underline"
                  >
                    insurance plans
                  </Link>{' '}
                  and offers competitive self-pay pricing.
                </p>
                {/* Quick stats chips */}
                <div className="flex flex-wrap gap-2 sm:gap-3">
                  {[
                    { icon: CheckCircle, label: 'Walk-Ins Welcome' },
                    { icon: Shield, label: 'Most Insurance Accepted' },
                    { icon: HelpCircle, label: '35 Years Experience' },
                  ].map(({ icon: ChipIcon, label }) => (
                    <span
                      key={label}
                      className="inline-flex items-center gap-1.5 bg-sunshine-soft border border-sunshine-blue/15 text-sunshine-dark text-xs font-semibold px-3 py-1.5 rounded-full"
                    >
                      <ChipIcon className="w-3.5 h-3.5 text-sunshine-blue flex-shrink-0" aria-hidden="true" />
                      {label}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </Section>
      </section>

      {/* ══ FINAL CTA ══════════════════════════════════════════════════ */}
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
              <HelpCircle className="w-4 h-4" aria-hidden="true" />
              Sunshine Clinical Lab — Trinity, FL
            </motion.span>

            <motion.h2
              variants={itemVariants}
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-5"
            >
              Still Have Questions?
              <br />
              <span className="text-sunshine-sky">We&apos;re a Phone Call Away.</span>
            </motion.h2>

            <motion.p
              variants={itemVariants}
              className="text-white/80 text-lg leading-relaxed mb-4 max-w-2xl mx-auto"
            >
              Our team at Sunshine Clinical Lab is always happy to help. Whether you need
              information about a specific test, want to verify your insurance, or need to
              schedule an appointment — one call does it all.
            </motion.p>

            <motion.p
              variants={itemVariants}
              className="text-white font-bold text-xl mb-3"
            >
              (727) 233-5223
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 text-white/80 text-sm mb-10"
            >
              <span className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
                3600 Galileo Dr, Trinity, FL 34655, USA
              </span>
              <span className="hidden sm:block text-white/30">|</span>
              <span>sunshinelabus.com</span>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row justify-center gap-4 mb-12"
            >
              <a href="tel:+17272335223" className="w-full sm:w-auto">
                <ShimmerButton className="w-full sm:w-auto bg-white text-sunshine-dark px-9 py-4 rounded-full font-bold shadow-2xl text-lg gap-2">
                  <Phone className="w-5 h-5" aria-hidden="true" />
                  Call Now
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
                  Walk In Today
                </ShimmerButton>
              </a>
              <Link href="/clinical-lab-services-trinity-fl" className="w-full sm:w-auto">
                <ShimmerButton className="w-full sm:w-auto bg-white/20 backdrop-blur-sm border-2 border-white text-white px-9 py-4 rounded-full font-semibold text-lg gap-2">
                  View All Services
                </ShimmerButton>
              </Link>
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
