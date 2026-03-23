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
  ArrowRight,
  CalendarDays,
  HelpCircle,
  ShieldCheck,
  Scale,
  FileText,
  FileCheck,
  Heart,
  Users,
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
  { x: 60,  y: 0 },
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
const DNA_LEGAL_ITEMS = [
  {
    Icon: Users,
    title: 'Family Court Proceedings and Custody Disputes',
    body: 'Courts require legally admissible DNA evidence to establish biological relationships in custody, visitation, and parental rights cases.',
  },
  {
    Icon: FileText,
    title: 'Child Support Establishment or Enforcement',
    body: 'State agencies and courts may require legal paternity testing before establishing or modifying child support orders.',
  },
  {
    Icon: Scale,
    title: 'Estate and Inheritance Claims',
    body: 'Biological relationship verification may be required in probate or inheritance proceedings.',
  },
  {
    Icon: FileCheck,
    title: 'Legal Name Changes Involving Biological Parentage',
    body: 'Certain legal processes require DNA evidence to establish or confirm biological parentage.',
  },
];

const DNA_PATERNITY_ITEMS = [
  {
    Icon: ShieldCheck,
    title: 'Legal Paternity Testing',
    body: 'Follows strict chain-of-custody procedures and produces results that are accepted by courts, government agencies, and other legal entities. Both parents and the child must be present for legal paternity testing.',
  },
  {
    Icon: Heart,
    title: 'Informational (Non-Legal) Paternity Testing',
    body: 'Uses the same accurate methodology but without the formal chain-of-custody documentation, making it suitable for personal peace of mind. Requirements may be more flexible — call our office to discuss your specific situation.',
  },
];

const DNA_FAQ_ITEMS = [
  {
    q: 'How much does DNA testing cost at Sunshine Clinical Lab?',
    a: 'Pricing varies depending on the type of test (legal, immigration, informational) and the number of participants. Please contact us at (727) 233-5223 for current pricing.',
  },
  {
    q: 'How long do DNA test results take?',
    a: 'Results timelines depend on the test type and the processing laboratory. Our team will provide an estimated turnaround time when you schedule your appointment at our Trinity location.',
  },
  {
    q: 'Is your DNA testing legally admissible in court?',
    a: 'Yes. When performed under chain-of-custody protocols at our Trinity, FL facility, our legal and immigration DNA testing produces results that are admissible in court and accepted by government agencies including USCIS.',
  },
  {
    q: 'Do I need an appointment for DNA testing?',
    a: 'Yes, we recommend scheduling DNA testing appointments in advance to ensure all participants, documentation, and identification requirements are properly coordinated. Call (727) 233-5223.',
  },
  {
    q: 'What do I need to bring to a DNA test appointment?',
    a: 'All participants must bring valid government-issued photo identification for legal and immigration DNA testing. For informational testing, requirements may vary — our team will advise when you schedule.',
  },
  {
    q: 'Can I get immigration DNA testing (USCIS) at Sunshine Clinical Lab?',
    a: 'Yes. We handle immigration DNA testing required by USCIS, including full chain-of-custody collection, proper documentation, photographic verification, and coordination with AABB-accredited laboratories. Our Trinity, FL office serves patients from across Pasco County and Tampa Bay.',
  },
  {
    q: 'Is DNA testing at Sunshine Clinical Lab confidential?',
    a: 'Absolutely. All DNA testing is handled with complete confidentiality and professionalism. Your results and personal information are protected throughout the entire process.',
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
export default function DNATestingPage() {
  const [openFaq, setOpenFaq] = useState(null);
  const toggleFaq = (i) => setOpenFaq((prev) => (prev === i ? null : i));

  // Split FAQ into 2 columns (4 + 3)
  const col1 = DNA_FAQ_ITEMS.slice(0, 4);
  const col2 = DNA_FAQ_ITEMS.slice(4);

  return (
    <div className="bg-sunshine-soft min-h-screen">

      {/* ══ HERO ════════════════════════════════════════════════ */}
      <section className="relative w-full min-h-[65vh] flex items-center overflow-hidden">
        {/* Banner image with gradient overlay */}
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src="/dna-bnr.jpg"
            alt="DNA Testing at Sunshine Clinical Lab in Trinity, FL"
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-br from-sunshine-dark/85 via-[#1a3a5c]/80 to-sunshine-blue/75" />
        </div>
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
            className="max-w-2xl text-left"
          >
            <motion.div variants={heroItemVariants}>
              <p className="text-white/75 text-sm font-semibold tracking-widest mb-6">
                Pasco County DNA Testing
              </p>
            </motion.div>

            <motion.h1
              variants={heroItemVariants}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-4"
            >
              DNA Testing in Trinity, FL —{' '}
              <span className="text-[#93C5FD]">Legal, Immigration &amp; Paternity Services for Pasco County</span>
            </motion.h1>

            <motion.h2
              variants={heroItemVariants}
              className="text-2xl sm:text-3xl font-bold text-white/90 mb-4"
            >
              Accurate DNA Testing. Legally Admissible. Handled With Discretion.
            </motion.h2>

            <motion.p
              variants={heroItemVariants}
              className="text-white/85 text-lg leading-relaxed mb-10 max-w-xl"
            >
              Sunshine Clinical Lab provides professional DNA testing for paternity, immigration, and
              legal purposes — with strict chain-of-custody protocols and compassionate, confidential
              service. Located in Trinity, FL.
            </motion.p>

            <motion.div
              variants={heroItemVariants}
              className="flex flex-col sm:flex-row flex-wrap gap-4"
            >
              <a href="tel:+17272335223">
                <ShimmerButton className="bg-white text-sunshine-dark px-7 py-3.5 rounded-full font-bold shadow-xl text-base gap-2">
                  <Phone className="w-5 h-5" />
                  Schedule DNA Testing — (727) 233-5223
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
                Where Can I Get Legal DNA Testing in Pasco County, Florida?
              </h2>
              <p className="text-gray-700 leading-relaxed text-base">
                Sunshine Clinical Lab at 3600 Galileo Dr, Trinity, FL 34655 provides legal DNA testing,
                immigration DNA testing (USCIS), paternity testing, and relationship DNA testing. All
                legal and immigration tests are conducted under chain-of-custody protocols for court
                admissibility and government acceptance. DNA collection is non-invasive (cheek swab) and
                typically takes 15 to 30 minutes. Appointments are recommended. Call{' '}
                <a
                  href="tel:+17272335223"
                  className="text-sunshine-blue font-semibold hover:underline"
                >
                  (727) 233-5223
                </a>{' '}
                to schedule.
              </p>
            </div>
          </motion.div>
        </Section>
      </section>

      {/* ══ PROFESSIONAL DNA TESTING SERVICES ════════════════════ */}
      <section className="py-20 relative overflow-hidden" style={{ backgroundColor: '#0d1b2a' }}>
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          style={{ opacity: 0.2 }}
        >
          <source src="/dna1.mp4" type="video/mp4" />
        </video>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Section>
            <motion.div variants={itemVariants} className="mb-10">
              <span className="text-xs font-bold uppercase tracking-widest text-sunshine-blue mb-3 block">
                Comprehensive DNA Services
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
                Professional DNA Testing Services in Trinity, FL &amp; Pasco County
              </h2>
            </motion.div>
            <motion.div
              variants={itemVariants}
              className="bg-transparent rounded-2xl p-8 space-y-4 text-gray-300 leading-relaxed"
            >
              <p>
                DNA testing is rarely casual. Whether you&apos;re establishing paternity for family
                court, fulfilling a USCIS requirement for immigration, or confirming a biological
                relationship for deeply personal reasons — accuracy, legal admissibility, and
                confidentiality are everything.
              </p>
              <p>
                Sunshine Clinical Lab provides comprehensive DNA testing services from our Trinity, FL
                location, serving families, individuals, and legal professionals across Pasco County and
                the Tampa Bay region. Our testing is performed under rigorous chain-of-custody protocols
                when legal admissibility is required, ensuring that your results hold up in court,
                immigration proceedings, and official government processes.
              </p>
              <p className="font-bold text-white text-lg">
                We understand the sensitivity involved. Every DNA test we process is handled with
                complete professionalism and discretion.
              </p>
            </motion.div>
          </Section>
        </div>
      </section>

      {/* ══ LEGAL DNA TESTING ════════════════════════════════════ */}
      <section className="py-20 overflow-hidden" style={{ backgroundColor: '#CCE9F7' }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Section>
            <motion.div variants={itemVariants} className="mb-10">
              <span className="text-xs font-bold uppercase tracking-widest text-sunshine-blue mb-3 block">
                Court-Admissible Results
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-sunshine-dark">
                Legal DNA Testing
              </h2>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="bg-white rounded-2xl p-8 mb-10 text-gray-600 leading-relaxed space-y-4 shadow-sm"
            >
              <p>
                Legal DNA testing requires strict sample collection protocols, verified identification,
                proper documentation, and chain-of-custody procedures that ensure the results are
                admissible in court. This isn&apos;t something you can reliably accomplish with an
                at-home kit from the internet.
              </p>
              <p>
                At Sunshine Clinical Lab in Trinity, FL, our legal DNA collections are performed by
                trained professionals who follow all required procedures. Legal DNA testing is commonly
                needed for:
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
              {DNA_LEGAL_ITEMS.map(({ Icon, title, body }, i) => (
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

            <motion.div
              variants={itemVariants}
              className="bg-white rounded-2xl p-6 border border-sunshine-sky/30 shadow-sm"
            >
              <p className="text-gray-600 leading-relaxed">
                If your attorney or the court has ordered a DNA test, contact our office. We&apos;ll
                coordinate the collection to meet all legal requirements.
              </p>
            </motion.div>
          </Section>
        </div>
      </section>

      {/* ══ IMMIGRATION DNA TESTING ══════════════════════════════ */}
      <section className="py-20 bg-white overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Section>
            <motion.div variants={itemVariants} className="mb-10">
              <span className="text-xs font-bold uppercase tracking-widest text-sunshine-blue mb-3 block">
                USCIS Compliant
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-sunshine-dark">
                Immigration DNA Testing (USCIS)
              </h2>
            </motion.div>
            <motion.div
              variants={itemVariants}
              className="bg-sunshine-soft rounded-2xl p-8 space-y-4 text-gray-600 leading-relaxed"
            >
              <p>
                Immigration DNA testing is often required by USCIS (U.S. Citizenship and Immigration
                Services) to verify a biological relationship as part of a visa or immigration petition.
                This is one of the most procedurally demanding forms of DNA testing — the sample
                collection, documentation, and laboratory processing must meet strict federal
                requirements.
              </p>
              <p>
                Sunshine Clinical Lab is experienced in immigration DNA testing and understands the
                urgency and complexity involved. We handle the entire process with care, including proper
                identification verification, photographic documentation, chain-of-custody packaging, and
                coordination with AABB-accredited laboratories for processing.
              </p>
              <p className="font-bold text-sunshine-dark">
                If you&apos;ve been instructed by USCIS or the U.S. Embassy to complete a DNA test, our
                team at our Trinity, FL location can guide you through every step — from scheduling to
                sample collection to results.
              </p>
            </motion.div>
          </Section>
        </div>
      </section>

      {/* ══ PATERNITY TESTING ════════════════════════════════════ */}
      <section className="py-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <Section>
          <motion.div variants={itemVariants} className="mb-10">
            <span className="text-xs font-bold uppercase tracking-widest text-sunshine-blue mb-3 block">
              Paternity &amp; Relationship
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-sunshine-dark">
              Paternity Testing
            </h2>
          </motion.div>

          <motion.div variants={itemVariants} className="mb-10 text-gray-600 leading-relaxed">
            <p>
              Paternity testing determines whether a specific individual is the biological father of a
              child. At Sunshine Clinical Lab, we offer both options:
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
            {DNA_PATERNITY_ITEMS.map(({ Icon, title, body }, i) => (
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
        </Section>
      </section>

      {/* ══ RELATIONSHIP DNA TESTING ═════════════════════════════ */}
      <section className="py-20 bg-white overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Section>
            <motion.div variants={itemVariants} className="mb-10">
              <span className="text-xs font-bold uppercase tracking-widest text-sunshine-blue mb-3 block">
                Beyond Paternity
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-sunshine-dark">
                Relationship DNA Testing
              </h2>
            </motion.div>
            <motion.div
              variants={itemVariants}
              className="bg-sunshine-soft rounded-2xl p-8 text-gray-600 leading-relaxed"
            >
              <p>
                Beyond paternity, Sunshine Clinical Lab also accommodates relationship DNA testing,
                which can determine biological connections such as siblings, grandparents, aunts, uncles,
                and other family relationships. These tests are often used in conjunction with
                immigration or legal proceedings where paternity testing alone is not sufficient to
                establish the required biological connection.
              </p>
            </motion.div>
          </Section>
        </div>
      </section>

      {/* ══ WHAT TO EXPECT ═══════════════════════════════════════ */}
      <section className="py-20 bg-white overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Section>
            <motion.div variants={itemVariants} className="mb-8">
              <span className="text-xs font-bold uppercase tracking-widest text-sunshine-blue mb-3 block">
                Your Appointment
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-sunshine-dark">
                What to Expect During Your DNA Test Appointment
              </h2>
            </motion.div>

            <motion.div variants={itemVariants}>
              <MagicCard className="shadow-md hover:shadow-lg">
                <div className="p-7 text-gray-600 leading-relaxed space-y-4">
                  <p>
                    DNA sample collection is non-invasive and painless. In most cases, samples are
                    collected using a simple buccal (cheek) swab — there&apos;s no blood draw involved
                    for standard DNA testing.
                  </p>
                  <p>
                    For legal and immigration DNA tests, all participants must bring valid
                    government-issued photo identification. Our staff will verify identities, take
                    required photographs, and complete all chain-of-custody documentation during the
                    appointment. The process is straightforward, typically taking 15 to 30 minutes at
                    our Trinity, FL office.
                  </p>
                  <p>
                    Results timelines vary depending on the type of test and the processing laboratory,
                    but our team will provide a clear estimated turnaround when you schedule.
                  </p>
                </div>
              </MagicCard>
            </motion.div>

            <motion.div variants={itemVariants} className="flex justify-center mt-10">
              <a href="tel:+17272335223">
                <ShimmerButton className="bg-sunshine-blue text-white px-9 py-4 rounded-full font-bold shadow-xl text-lg gap-2">
                  <Phone className="w-5 h-5" />
                  Schedule Your DNA Test — (727) 233-5223
                </ShimmerButton>
              </a>
            </motion.div>
          </Section>
        </div>
      </section>

      {/* ══ CONFIDENTIAL, COMPASSIONATE ══════════════════════════ */}
      <section className="py-20 overflow-hidden" style={{ backgroundColor: '#CCE9F7' }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Section>
            <motion.div variants={itemVariants} className="mb-10">
              <span className="text-xs font-bold uppercase tracking-widest text-sunshine-blue mb-3 block">
                Our Commitment
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-sunshine-dark">
                Confidential, Compassionate, Professional
              </h2>
            </motion.div>
            <motion.div
              variants={itemVariants}
              className="bg-white rounded-2xl p-8 space-y-4 text-gray-600 leading-relaxed shadow-md"
            >
              <p>
                We recognize that DNA testing often happens during some of the most emotional and
                consequential moments in a person&apos;s life. Our team treats every patient and every
                family with the respect, empathy, and professionalism these situations demand.
              </p>
              <p>
                Your results and personal information are handled with complete confidentiality at our
                Trinity, FL facility. If you have questions about the process, costs, or what to expect,
                call us. We&apos;re here to help you navigate this as smoothly as possible.
              </p>
            </motion.div>
          </Section>
        </div>
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
              DNA Testing — Trinity, FL
            </motion.span>

            <motion.h2
              variants={itemVariants}
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-5"
            >
              Trusted DNA Testing.
              <br />
              <span className="text-[#93C5FD]">Right Here in Trinity, FL.</span>
            </motion.h2>

            <motion.p
              variants={itemVariants}
              className="text-white/80 text-lg leading-relaxed mb-10 max-w-2xl mx-auto"
            >
              Legal, immigration, and paternity DNA testing with strict chain-of-custody protocols
              and complete confidentiality. Serving all of Pasco County.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row justify-center gap-4 mb-12"
            >
              <a href="tel:+17272335223">
                <ShimmerButton className="bg-white text-sunshine-dark px-9 py-4 rounded-full font-bold shadow-2xl text-lg gap-2">
                  <Phone className="w-6 h-6" />
                  Call (727) 233-5223 to Schedule
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

      {/* ══ FAQ ═════════════════════════════════════════════════ */}
      <section className="py-20 relative overflow-hidden bg-[#D6EAF8]">
        {/* Background image */}
        <div className="absolute inset-0">
          <Image
            src="/dna-faq.jpg"
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
                DNA Testing — Frequently Asked Questions
              </h2>
              <p className="text-sunshine-dark/60 mt-4 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
                Everything you need to know before scheduling your DNA test in Pasco County.
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
              Trusted DNA Testing —
              <br />
              <span className="text-[#93C5FD]">Right Here in Trinity, FL</span>
            </motion.h2>

            <motion.p
              variants={itemVariants}
              className="text-white/80 text-lg leading-relaxed mb-4 max-w-2xl mx-auto"
            >
              Whether you need legal, immigration, or paternity DNA testing, Sunshine Clinical Lab
              provides accurate, confidential service with the professionalism your situation requires.
              Serving all of Pasco County from our Trinity location.
            </motion.p>

            <motion.p variants={itemVariants} className="text-white font-semibold text-lg mb-10">
              Call (727) 233-5223 to schedule.
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
                Mon–Fri 8:00am–5:00pm
              </span>
            </motion.div>
          </Section>
        </div>
      </section>

    </div>
  );
}
