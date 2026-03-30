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
  HelpCircle,
  ShieldCheck,
  DollarSign,
  Activity,
  Dna,
  TestTube2,
  AlertCircle,
  Stethoscope,
  Baby,
  Truck,
  FileSearch,
} from 'lucide-react';
import { ShimmerButton } from '@/registry/magicui/shimmer-button';
import MagicCard from '@/components/ui/MagicCard';

/* ─── Animation variants ─────────────────────────────────────── */
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 28, scale: 0.97 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: 'easeOut' } },
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

const COVERAGE_ITEMS = [
  {
    Icon: ShieldCheck,
    title: 'Routine Blood Work',
    body: 'Most major insurance plans cover standard physician-ordered blood work such as CBC, CMP, lipid panels, A1C, thyroid testing, and liver and kidney function panels. Coverage depends on your specific plan and whether the test is considered medically necessary by your provider.',
  },
  {
    Icon: Activity,
    title: 'Specialty & Hormone Testing',
    body: 'Coverage for specialty tests — including testosterone panels, full hormone panels, TRT monitoring blood work, estradiol, SHBG, and PSA — varies by plan. Some plans cover these fully; others may apply them to your deductible or require pre-authorization. We recommend verifying before your visit.',
  },
  {
    Icon: TestTube2,
    title: 'TRT Blood Testing',
    body: "Insurance coverage for TRT monitoring labs depends on your plan and your provider's orders. Many patients on TRT choose our self-pay option because of our competitive pricing. Contact us for current TRT panel rates.",
  },
  {
    Icon: Dna,
    title: 'DNA Testing',
    body: 'Legal, immigration, and paternity DNA testing is typically not covered by insurance and is handled as a self-pay service at Sunshine Clinical Lab. Contact us at (727) 233-5223 for current DNA testing pricing.',
  },
  {
    Icon: Baby,
    title: 'Gender Reveal Blood Testing',
    body: "The Peekaboo gender reveal blood test is a self-pay service and is not typically covered by insurance plans. Contact us for current pricing — it's a straightforward, competitively priced out-of-pocket expense.",
  },
  {
    Icon: Truck,
    title: 'Mobile Blood Draw Service',
    body: 'Insurance coverage for mobile phlebotomy varies by plan. The lab tests themselves may be covered while the mobile service component may be separate. Our team will clarify costs when you schedule your mobile draw.',
  },
];

const FAQ_ITEMS = [
  {
    q: 'What insurance plans does Sunshine Clinical Lab accept?',
    a: 'We accept most major insurance plans. Because network participation can change, we recommend calling our office at (727) 233-5223 to verify your specific coverage before your visit to our Trinity, FL location.',
  },
  {
    q: 'Do I need to verify my insurance before coming in for blood work?',
    a: 'We strongly recommend it. A quick phone call helps ensure your visit goes smoothly, clarifies any copays or deductibles, and prevents billing surprises.',
  },
  {
    q: "What if I don't have insurance? Can I still get lab work done?",
    a: 'Absolutely. We offer competitive self-pay pricing on all services. As an independent lab in Trinity, FL, our rates are often meaningfully more affordable than what large chain labs charge. Call us for specific pricing on any test you need.',
  },
  {
    q: 'Is DNA testing covered by insurance?',
    a: 'Legal, immigration, and paternity DNA testing is typically a self-pay service and is not covered by most insurance plans. Contact our team for current pricing.',
  },
  {
    q: 'Is the Peekaboo gender reveal blood test covered by insurance?',
    a: 'The gender reveal test is generally a self-pay service. Contact us at (727) 233-5223 for current pricing.',
  },
  {
    q: 'Do you offer payment plans or financial assistance?',
    a: "Contact our office to discuss your situation. We're committed to making lab testing accessible and will work with you to find a solution.",
  },
  {
    q: 'How do I know if a specific test will be covered by my insurance?',
    a: 'Call us at (727) 233-5223 with your insurance information and the test(s) you need. Our team will verify coverage and explain any potential out-of-pocket costs before your visit.',
  },
];

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

export default function InsuranceAcceptedPage() {
  const [openFaq, setOpenFaq] = useState(null);
  const toggleFaq = (i) => setOpenFaq((prev) => (prev === i ? null : i));

  return (
    <div className="bg-sunshine-soft min-h-screen">
      {/* ══ HERO ════════════════════════════════════════════════ */}
      <section className="relative w-full min-h-[85vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src="/insurance-bnr.jpg"
            alt="Insurance Accepted at Sunshine Clinical Lab"
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-l from-sunshine-dark/95 via-[#1a3a5c]/80 to-sunshine-blue/65" />
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
            className="max-w-3xl mx-auto sm:ml-auto text-center sm:text-right"
          >
            <motion.h1
              variants={heroItemVariants}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-4"
            >
              Insurance Accepted at Sunshine Clinical Lab — Trinity, FL
            </motion.h1>

            <motion.h2
              variants={heroItemVariants}
              className="text-2xl sm:text-3xl font-bold text-white/90 mb-4"
            >
              Affordable Lab Testing With Insurance Support and Competitive Self-Pay Options
            </motion.h2>

            <motion.p
              variants={heroItemVariants}
              className="text-white/85 text-lg leading-relaxed mb-10 max-w-2xl mx-auto sm:ml-auto"
            >
              We accept most major insurance plans and offer some of the most competitive self-pay
              pricing in Pasco County. Don&apos;t let cost stand between you and the lab work you need.
            </motion.p>

            <motion.div
              variants={heroItemVariants}
              className="flex flex-col sm:flex-row flex-wrap gap-4 justify-center sm:justify-end"
            >
              <a href="tel:+17272335223">
                <ShimmerButton className="bg-white text-sunshine-dark px-7 py-3.5 rounded-full font-bold shadow-xl text-base gap-2">
                  <Phone className="w-5 h-5" />
                  Verify Your Coverage → (727) 233-5223
                </ShimmerButton>
              </a>
            </motion.div>
          </motion.div>
        </div>

        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
          <svg viewBox="0 0 1440 72" preserveAspectRatio="none" className="w-full h-16 sm:h-20">
            <path d="M0,36 C240,72 480,0 720,36 C960,72 1200,0 1440,36 L1440,72 L0,72 Z" fill="#EBF5FB" />
          </svg>
        </div>
      </section>

      {/* ══ DIRECT ANSWER 1 ═════════════════════════════════════ */}
      <section className="py-12 bg-[#EBF5FB]">
        <Section>
          <motion.div variants={itemVariants} className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
              <div className="h-1 w-full bg-gradient-to-r from-sunshine-blue to-sunshine-sky" />
              <div className="p-7 sm:p-9">
                <div className="flex items-center gap-2 mb-5">
                  <span className="inline-flex items-center gap-1.5 bg-sunshine-blue/10 text-sunshine-blue text-xs font-bold tracking-wide px-3 py-1.5 rounded-full">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Insurance Verification
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-sunshine-dark mb-4">
                  Does Sunshine Clinical Lab Accept Insurance?
                </h2>
                <p className="text-gray-700 leading-relaxed text-base mb-7">
                  Yes. Sunshine Clinical Lab at 3600 Galileo Dr, Trinity, FL 34655 accepts most major
                  insurance plans for clinical lab testing. Coverage varies by plan, provider, and test
                  type. Patients are encouraged to call{' '}
                  <a href="tel:+17272335223" className="text-sunshine-blue font-semibold hover:underline">
                    (727) 233-5223
                  </a>{' '}
                  to verify specific coverage before their visit. The lab also offers competitive
                  self-pay pricing for patients without insurance or for services not typically covered
                  by insurance, such as DNA testing and gender reveal blood tests.
                </p>
                <div className="flex flex-wrap gap-2 sm:gap-3">
                  {[
                    { icon: CheckCircle, label: 'Most Major Plans Accepted' },
                    { icon: ShieldCheck, label: 'Easy Verification' },
                    { icon: DollarSign, label: 'Competitive Self-Pay' },
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

      {/* ══ MAIN CONTENT SECTIONS ═══════════════════════════════ */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Section>
            <motion.div variants={itemVariants} className="mb-14">
              <span className="text-xs font-bold uppercase tracking-widest text-sunshine-blue mb-3 block">
                Accessible Care
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-sunshine-dark mb-6">
                Making Lab Testing Affordable for Every Patient
              </h2>
              <div className="text-gray-600 leading-relaxed space-y-4">
                <p>
                  Sunshine Clinical Lab accepts most major insurance plans to help make your blood
                  work and laboratory testing as affordable as possible. We believe that access to
                  quality lab services shouldn&apos;t be complicated or cost-prohibitive — and as an
                  independent, locally owned lab in Trinity, FL, we have the flexibility to keep our
                  pricing fair in ways that large national chains, with their corporate overhead and
                  shareholder obligations, simply can&apos;t.
                </p>
                <p>
                  Whether you&apos;re covered by insurance or paying out of pocket, our goal is the
                  same: deliver fast, accurate lab work at a price that makes sense for your situation.
                </p>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="mb-14">
              <span className="text-xs font-bold uppercase tracking-widest text-sunshine-blue mb-3 block">
                Be Prepared
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-sunshine-dark mb-6">
                Verifying Your Insurance Coverage Before Your Visit
              </h2>
              <div className="text-gray-600 leading-relaxed mb-8">
                <p>
                  Insurance coverage for laboratory services varies by plan, provider, and the specific
                  tests ordered. Before your visit to our Trinity, FL location, we strongly recommend
                  a quick call to our office at (727) 233-5223 to verify your specific coverage.
                </p>
              </div>

              <div className="bg-sunshine-soft rounded-2xl p-7 border border-sunshine-blue/10">
                <div className="flex items-center gap-3 mb-4">
                  <FileSearch className="w-6 h-6 text-sunshine-blue" />
                  <h3 className="text-xl font-bold text-sunshine-dark">What Our Team Will Help You Understand</h3>
                </div>
                <div className="text-gray-600 leading-relaxed space-y-4">
                  <p>
                    When you call, we&apos;ll help you confirm whether your plan is accepted at our facility,
                    identify any potential copays, deductibles, or coinsurance amounts that may apply,
                    determine whether pre-authorization is needed for specific tests, and clarify what
                    your plan covers versus what would be an out-of-pocket expense.
                  </p>
                  <p className="font-medium text-sunshine-dark">
                    This five-minute call can save you significant time and prevent unexpected costs on
                    the day of your visit.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="mb-14">
              <span className="text-xs font-bold uppercase tracking-widest text-sunshine-blue mb-3 block">
                Self-Pay Options
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-sunshine-dark mb-6">
                Self-Pay and Uninsured Patients — You&apos;re Welcome Here
              </h2>
              <div className="text-gray-600 leading-relaxed space-y-4">
                <p>
                  If you don&apos;t have insurance, have a high-deductible plan, or simply prefer to pay
                  out of pocket, Sunshine Clinical Lab offers competitive self-pay pricing on all of
                  our services.
                </p>
                <p>
                  As an independent lab without the corporate overhead of large national chains, we&apos;re
                  often able to provide meaningful savings for self-pay patients — particularly on
                  services like TRT monitoring panels, hormone testing, and routine blood work that
                  many patients need on a recurring basis.
                </p>
                <p className="font-medium text-sunshine-dark bg-yellow-50 p-4 rounded-xl border border-yellow-100">
                  We&apos;re transparent about pricing and happy to discuss costs before your appointment.
                  There are no surprise bills. No hidden fees. No &quot;you&apos;ll find out what it costs after
                  we process it&quot; games. Call (727) 233-5223 and ask.
                </p>
              </div>
            </motion.div>
          </Section>
        </div>
      </section>

      {/* ══ SERVICE COVERAGE SECTION ════════════════════════════ */}
      <section className="py-20 bg-sunshine-soft">
        <Section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div variants={itemVariants} className="text-center mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-sunshine-blue mb-3 block">
              Testing Categories
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-sunshine-dark">
              Insurance and Specific Services
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {COVERAGE_ITEMS.map(({ Icon, title, body }, i) => (
              <motion.div key={title} variants={cardVariants}>
                <MagicCard gradientColor="#93C5FD60" borderGlowColor="#2B7DBF" className="shadow-md hover:shadow-xl bg-white">
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

      {/* ══ MID-PAGE CTA & NETWORK COVERAGE ═════════════════════ */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Section>
            <motion.div variants={itemVariants} className="text-center mb-16">
              <a href="tel:+17272335223">
                <ShimmerButton className="bg-sunshine-blue text-white px-9 py-4 rounded-full font-bold shadow-xl text-lg gap-2 mx-auto">
                  <Phone className="w-5 h-5" />
                  Verify Your Coverage → Call (727) 233-5223
                </ShimmerButton>
              </a>
            </motion.div>

            <motion.div variants={itemVariants} className="bg-sunshine-soft rounded-2xl p-7 border border-sunshine-sky/30">
              <div className="flex items-center gap-3 mb-4">
                <AlertCircle className="w-6 h-6 text-sunshine-blue" />
                <h2 className="text-2xl font-extrabold text-sunshine-dark">A Note on Network Coverage</h2>
              </div>
              <div className="text-gray-600 leading-relaxed space-y-4">
                <p>
                  Insurance networks and participation agreements change regularly. While we accept most
                  major insurance plans, specific network participation can vary. The most reliable way
                  to confirm that Sunshine Clinical Lab is covered under your specific plan is to call
                  our office directly at (727) 233-5223 before your visit.
                </p>
                <p>
                  We&apos;re committed to transparency. If there are any coverage limitations, network issues,
                  or out-of-pocket costs you should know about, we&apos;ll tell you upfront — before you sit
                  down for a blood draw, not after.
                </p>
              </div>
            </motion.div>
          </Section>
        </div>
      </section>

      {/* ══ DIRECT ANSWER 2 ═════════════════════════════════════ */}
      <section className="py-12 bg-[#EBF5FB]">
        <Section>
          <motion.div variants={itemVariants} className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
              <div className="h-1 w-full bg-gradient-to-r from-sunshine-blue to-sunshine-sky" />
              <div className="p-7 sm:p-9">
                <div className="flex items-center gap-2 mb-5">
                  <span className="inline-flex items-center gap-1.5 bg-sunshine-blue/10 text-sunshine-blue text-xs font-bold tracking-wide px-3 py-1.5 rounded-full">
                    <DollarSign className="w-3.5 h-3.5" />
                    Self-Pay Pricing
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-sunshine-dark mb-4">
                  How Much Does Blood Work Cost Without Insurance in Pasco County?
                </h2>
                <p className="text-gray-700 leading-relaxed text-base">
                  Self-pay pricing for blood work at Sunshine Clinical Lab in Trinity, FL varies by test type.
                  As an independent clinical lab, Sunshine Clinical Lab offers competitive self-pay rates that
                  are often more affordable than large national chain labs. For current pricing on specific
                  tests including routine blood panels, TRT monitoring, DNA testing, and gender reveal
                  blood tests, call <a href="tel:+17272335223" className="text-sunshine-blue font-semibold hover:underline">(727) 233-5223</a>. The lab is located at 3600 Galileo Dr, Trinity, FL 34655.
                </p>
              </div>
            </div>
          </motion.div>
        </Section>
      </section>

      {/* ══ FAQ SECTION ═════════════════════════════════════════ */}
      <section className="py-20 relative overflow-hidden bg-[#D6EAF8]">
        <div className="absolute inset-0">
          <Image
            src="/dna-faq.jpg"
            alt="Insurance and billing FAQ at Sunshine Clinical Lab Pasco County"
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
                <HelpCircle className="w-7 h-7 text-white" aria-hidden="true" />
              </div>
              <span className="text-xs font-bold uppercase tracking-widest text-sunshine-blue mb-3 block">
                Got Questions?
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-sunshine-dark">
                Insurance &amp; Billing — Frequently Asked Questions
              </h2>
              <p className="text-sunshine-dark/60 mt-4 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
                Everything you need to know about insurance coverage and billing at Sunshine Clinical Lab.
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
                {FAQ_ITEMS.slice(0, 4).map((item, i) => (
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
                {FAQ_ITEMS.slice(4).map((item, i) => (
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

      {/* ══ RELATED SERVICES ═════════════════════════════════════ */}
      <section className="py-16 bg-white border-t border-gray-100">
        <Section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h3 variants={itemVariants} className="text-xl font-bold text-sunshine-dark mb-6">
            Explore More Services at Sunshine Clinical Lab
          </motion.h3>
          <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-3">
            {[
              { label: 'Clinical Lab Services', href: '/clinical-lab-services-trinity-fl' },
              { label: 'TRT Blood Testing', href: '/trt-blood-test-pasco-county' },
              { label: 'DNA Testing', href: '/dna-testing-pasco-county' },
              { label: 'Gender Reveal Testing', href: '/gender-reveal-testing-florida' },
              { label: 'Mobile Blood Draw', href: '/mobile-blood-draw-pasco-county' },
              { label: 'Return to Homepage', href: '/' },
            ].map((link) => (
              <Link key={link.href} href={link.href}>
                <span className="inline-block px-4 py-2 bg-sunshine-soft hover:bg-sunshine-blue/10 text-sunshine-blue hover:border-sunshine-blue transition-colors duration-200 rounded-full text-sm font-semibold border border-sunshine-sky/40 shadow-sm">
                  {link.label}
                </span>
              </Link>
            ))}
          </motion.div>
        </Section>
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
            <motion.h2
              variants={itemVariants}
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-5"
            >
              Questions About Coverage or Cost?<br/>
              <span className="text-[#93C5FD]">We&apos;ll Help You Figure It Out.</span>
            </motion.h2>

            <motion.p
              variants={itemVariants}
              className="text-white/80 text-lg leading-relaxed mb-10 max-w-2xl mx-auto"
            >
              Don&apos;t guess about your insurance coverage. Don&apos;t let cost uncertainty stop you from getting
              the lab work you need. Call Sunshine Clinical Lab at (727) 233-5223 and we&apos;ll verify your
              plan, explain your costs, and make sure there are no surprises.<br/><br/>
              Call (727) 233-5223 today.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-12 flex-wrap"
            >
              <a href="tel:+17272335223">
                <ShimmerButton className="bg-white text-sunshine-dark px-8 py-3.5 rounded-full font-bold shadow-xl text-base gap-2">
                  <Phone className="w-5 h-5" />
                  Verify Coverage Now — (727) 233-5223
                </ShimmerButton>
              </a>
              <Link href="/book-appointment">
                <ShimmerButton className="bg-white/20 backdrop-blur-sm border-2 border-white text-white px-8 py-3.5 rounded-full font-semibold text-base gap-2">
                  View All Services
                </ShimmerButton>
              </Link>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="flex items-center justify-center gap-2 text-white/75 text-sm font-medium"
            >
              <MapPin className="w-5 h-5 text-white/90 flex-shrink-0" />
              <span>3600 Galileo Dr, Trinity, FL 34655, USA</span>
            </motion.div>
          </Section>
        </div>
      </section>

    </div>
  );
}
