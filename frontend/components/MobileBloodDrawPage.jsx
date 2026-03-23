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
  Heart,
  Stethoscope,
  Activity,
  Building2,
  HelpCircle,
  CalendarDays,
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
const WHO_ITEMS = [
  {
    Icon: Home,
    title: 'Homebound and Elderly Patients',
    body: "If mobility is limited, transportation is unreliable, or a trip to the lab creates unnecessary stress, our team eliminates that barrier completely. We serve seniors throughout Trinity, New Port Richey, Land O' Lakes, Tarpon Springs, and surrounding communities.",
  },
  {
    Icon: Heart,
    title: 'Post-Surgical and Recovering Patients',
    body: "Patients under activity restrictions or managing pain after surgery. A mobile draw means you stay in bed, on the couch, or wherever you're most comfortable — no car ride required.",
  },
  {
    Icon: Clock,
    title: 'Busy Parents and Working Professionals',
    body: "You can't carve out two hours in the middle of a workday to sit in a chain lab waiting room. We work around your schedule — early mornings, midday, whatever fits your life.",
  },
  {
    Icon: Stethoscope,
    title: 'Patients With Needle Anxiety or Difficult Veins',
    body: "Being in a familiar environment makes a significant difference for anxious patients. Our phlebotomists are exceptionally skilled at putting nervous patients at ease — and at finding even the most elusive veins.",
  },
  {
    Icon: Activity,
    title: 'TRT and Routine Monitoring Patients',
    body: 'Men on testosterone replacement therapy, patients managing chronic conditions, or anyone requiring regular blood panels. Instead of monthly trips to a lab, we come to you on a consistent schedule.',
  },
  {
    Icon: Building2,
    title: 'Assisted Living and Nursing Facility Residents',
    body: 'Lab work performed on-site without the disruption, risk, or logistical challenge of off-site transport. We work with facilities throughout Pasco County.',
  },
];

const STEPS = [
  {
    num: '01',
    title: 'Call Us',
    body: "Call our office at (727) 233-5223 and let us know what tests you need performed, or have your physician's order ready. Our team will confirm your address and discuss any preparation requirements like fasting.",
  },
  {
    num: '02',
    title: 'We Come to You',
    body: 'On the day of your appointment, our phlebotomist arrives at your location with all necessary supplies. The draw is performed with the same standard of care as an in-office visit — clean, professional, and efficient.',
  },
  {
    num: '03',
    title: 'Fast Results',
    body: "Your samples are transported back to our Trinity laboratory under proper handling protocols. Results are typically available the next business day for many routine tests — the same timeline as an in-office draw.",
  },
];

const FAQ_ITEMS = [
  {
    q: 'How do I schedule a mobile blood draw near Trinity, FL?',
    a: 'Call Sunshine Clinical Lab at (727) 233-5223. Our team will confirm your location, discuss the tests needed, any fasting requirements, and schedule a convenient appointment time.',
  },
  {
    q: 'How much does a mobile blood draw cost?',
    a: 'Pricing depends on the tests ordered and your insurance coverage. Contact our team for current pricing details. We accept most major insurance plans and offer competitive self-pay rates.',
  },
  {
    q: "Do I need a doctor's order for a mobile blood draw?",
    a: "Many tests require a physician's order. If you have one, have it ready when you call. If you're unsure what you need, our team can guide you through the process.",
  },
  {
    q: 'What areas do you cover for mobile blood draws in Pasco County?',
    a: "We serve Trinity, New Port Richey, Land O' Lakes, Tarpon Springs, Holiday, Hudson, Port Richey, Odessa, East Lake, and surrounding communities. Call to confirm availability in your specific area.",
  },
  {
    q: 'Is mobile phlebotomy covered by insurance?',
    a: 'Coverage varies by plan and test type. We accept most major insurance plans and will help you verify coverage when you call to schedule.',
  },
  {
    q: 'How long does a mobile blood draw appointment take?',
    a: 'Most mobile appointments take 15 to 30 minutes, depending on the number of tests. Our phlebotomists are efficient and professional — no unnecessary delays.',
  },
  {
    q: 'Can I get TRT blood work done through a mobile blood draw?',
    a: 'Yes. Our mobile phlebotomy service supports full TRT monitoring panels including testosterone, estradiol, hematocrit, CBC, CMP, and more — all drawn at your home with the same fast turnaround.',
  },
];

/* ─── FAQ accordion item (matching homepage FAQSection style) ── */
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
export default function MobileBloodDrawPage() {
  const [openFaq, setOpenFaq] = useState(null);
  const toggleFaq = (i) => setOpenFaq((prev) => (prev === i ? null : i));

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // Split FAQ into 2 columns (matching homepage FAQSection)
  const col1 = FAQ_ITEMS.slice(0, 4);
  const col2 = FAQ_ITEMS.slice(4);

  return (
    <div className="bg-sunshine-soft min-h-screen">

      {/* ══ HERO ════════════════════════════════════════════════ */}
      <section className="relative w-full min-h-[85vh] flex items-center overflow-hidden">
        {/* Background image */}
        <Image
          src="/mbd-banner.jpg"
          alt="Mobile Blood Draw Service Pasco County"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        {/* Background gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-l from-sunshine-dark/95 via-sunshine-dark/80 to-sunshine-blue/70" />
        {/* Decorative rings */}
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
            className="max-w-2xl ml-auto text-right"
          >
            <motion.div variants={heroItemVariants}>
              <p className="text-white/75 text-sm font-semibold tracking-widest mb-6">
                Pasco County Mobile Phlebotomy
              </p>
            </motion.div>

            <motion.h1
              variants={heroItemVariants}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-4"
            >
              Mobile Blood Draw Service in Trinity, FL &amp; Pasco County —{' '}
              <span className="text-[#93C5FD]">Lab Work at Your Front Door</span>
            </motion.h1>

            <motion.h2
              variants={heroItemVariants}
              className="text-2xl sm:text-3xl font-bold text-white/90 mb-4"
            >
              Professional Phlebotomy — Wherever You Are
            </motion.h2>

            <motion.p
              variants={heroItemVariants}
              className="text-white/85 text-lg leading-relaxed mb-10 max-w-xl ml-auto"
            >
              Sunshine Clinical Lab's mobile phlebotomy team brings fast, accurate blood draws
              directly to your home, office, or care facility across Pasco County and the greater
              Tampa Bay region.
            </motion.p>

            <motion.div
              variants={heroItemVariants}
              className="flex flex-col sm:flex-row flex-wrap gap-4 justify-end"
            >
              <Link href="/book-appointment">
                <ShimmerButton className="bg-sunshine-blue border border-white/20 text-white px-7 py-3.5 rounded-full font-semibold shadow-lg text-base gap-2">
                  <CalendarDays className="w-4 h-4" />
                  Book Appointment
                </ShimmerButton>
              </Link>
              <a href="tel:+17272335223">
                <ShimmerButton className="bg-white text-sunshine-dark px-7 py-3.5 rounded-full font-bold shadow-xl text-base gap-2">
                  <Phone className="w-5 h-5" />
                  Schedule Your Mobile Blood Draw
                </ShimmerButton>
              </a>
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

      {/* ══ DIRECT ANSWER #1 ════════════════════════════════════ */}
      <section className="py-12 bg-[#EBF5FB]">
        <Section>
          <motion.div variants={itemVariants} className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="border-l-4 border-sunshine-blue pl-6">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-sunshine-dark mb-4">
                What Is a Mobile Blood Draw Service?
              </h2>
              <p className="text-gray-700 leading-relaxed text-base">
                A mobile blood draw (also called mobile phlebotomy or home blood draw) is a
                service where a licensed, experienced phlebotomist travels to a patient's home,
                office, or care facility to perform blood collection. Sunshine Clinical Lab offers
                mobile blood draw services throughout Pasco County, including Trinity, New Port
                Richey, Land O&apos; Lakes, Tarpon Springs, Holiday, and Hudson. The service is
                available for routine blood work, TRT monitoring, hormone panels, and most
                physician-ordered tests. Call{' '}
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

      {/* ══ WHY CHOOSE MOBILE ═══════════════════════════════════ */}
      <section className="py-20 bg-white overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Section>
            <motion.div variants={itemVariants} className="mb-10">
              <span className="text-xs font-bold uppercase tracking-widest text-sunshine-blue mb-3 block">
                The Sunshine Difference
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-sunshine-dark">
                Why Pasco County Patients Are Choosing Mobile Blood Draws
              </h2>
            </motion.div>
            <motion.div
              variants={itemVariants}
              className="bg-sunshine-soft rounded-2xl p-8 space-y-4 text-gray-600 leading-relaxed"
            >
              <p>
                Not everyone can sit in a waiting room — and honestly, nobody wants to. Sunshine
                Clinical Lab's mobile blood draw service eliminates the drive, the wait, and the
                hassle by sending one of our experienced phlebotomists directly to you.
              </p>
              <p>
                This isn't a third-party courier drawing your blood with a weekend certification.
                Our mobile team consists of the same seasoned professionals who staff our Trinity
                laboratory — phlebotomists with over 35 years of combined experience who
                specialize in difficult veins, pediatric draws, geriatric patients, and
                high-volume clinical blood work.
              </p>
              <p className="font-bold text-sunshine-dark text-lg">
                We bring lab-quality precision to your living room.
              </p>
            </motion.div>
          </Section>
        </div>
      </section>

      {/* ══ WHO IS IT FOR ═══════════════════════════════════════ */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Section>
          <motion.div variants={itemVariants} className="text-center mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-sunshine-blue mb-3 block">
              Who We Serve
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-sunshine-dark">
              Who Is Mobile Phlebotomy For?
            </h2>
            <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
              Our mobile blood draw service is designed for patients across Pasco County who need
              or prefer at-home lab work.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
        </Section>
      </section>

      {/* ══ WHAT TESTS ══════════════════════════════════════════ */}
      <section className="py-20 bg-white overflow-hidden relative">
        {/* Background image */}
        <div className="absolute inset-0">
          <Image
            src="/mbd-test.jpg"
            alt=""
            fill
            className="object-cover"
            style={{ opacity: 0.5 }}
            sizes="100vw"
          />
        </div>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <Section>
            <motion.div variants={itemVariants} className="mb-10">
              <span className="text-xs font-bold uppercase tracking-widest text-sunshine-blue mb-3 block">
                Tests Available
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-sunshine-dark">
                What Tests Can Be Done Through a Mobile Blood Draw?
              </h2>
            </motion.div>

            <motion.div variants={itemVariants}>
              <div className="bg-sunshine-soft rounded-2xl p-8 mb-6 text-gray-600 leading-relaxed space-y-4">
                <p>
                  Nearly everything we offer at our Trinity laboratory can be performed through a
                  mobile visit. This includes routine blood work such as CBC, CMP, lipid panels,
                  A1C, and thyroid panels. Hormone and men's health panels including testosterone,
                  estradiol, hematocrit, SHBG, LH, FSH, and full TRT monitoring panels. PSA
                  testing, liver and kidney function panels, and many specialty blood panels
                  ordered by your physician.
                </p>
                <p>
                  Some tests may require specific preparation (such as fasting) or special sample
                  handling. When you call to schedule, our team will walk you through everything
                  you need to know before your draw.
                </p>
              </div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
                {[
                  'CBC (Complete Blood Count)',
                  'CMP (Comprehensive Metabolic Panel)',
                  'Lipid Panels',
                  'A1C (Hemoglobin A1C)',
                  'Thyroid Panels (TSH, T3, T4)',
                  'Testosterone & Hormone Panels',
                  'Estradiol & SHBG',
                  'LH & FSH',
                  'TRT Monitoring Panels',
                  'PSA Testing',
                  'Liver & Kidney Function',
                  'Specialty Blood Panels',
                ].map((test, index) => {
                  const desktopRowColors = [
                    { bg: '#1E2A38', textColor: '#FFFFFF', iconColor: '#6BB6E8', shadow: '0 4px 12px rgba(30,42,56,0.35)' },
                    { bg: '#2B7DBF', textColor: '#FFFFFF', iconColor: '#FFFFFF', shadow: '0 4px 12px rgba(43,125,191,0.35)' },
                    { bg: '#6BB6E8', textColor: '#1E2A38', iconColor: '#1E2A38', shadow: '0 2px 8px rgba(107,182,232,0.3)' },
                    { bg: '#CCE9F7', textColor: '#1E2A38', iconColor: '#2B7DBF', shadow: '0 2px 6px rgba(107,182,232,0.2)' },
                  ];
                  const mobileRowColors = [
                    { bg: '#1E2A38', textColor: '#FFFFFF', iconColor: '#6BB6E8', shadow: '0 4px 12px rgba(30,42,56,0.35)' },
                    { bg: '#24527A', textColor: '#FFFFFF', iconColor: '#CCE9F7', shadow: '0 4px 12px rgba(36,82,122,0.35)' },
                    { bg: '#2B7DBF', textColor: '#FFFFFF', iconColor: '#FFFFFF', shadow: '0 3px 10px rgba(43,125,191,0.35)' },
                    { bg: '#4DA0D8', textColor: '#FFFFFF', iconColor: '#FFFFFF', shadow: '0 3px 8px rgba(77,160,216,0.3)' },
                    { bg: '#6BB6E8', textColor: '#1E2A38', iconColor: '#1E2A38', shadow: '0 2px 8px rgba(107,182,232,0.3)' },
                    { bg: '#CCE9F7', textColor: '#1E2A38', iconColor: '#2B7DBF', shadow: '0 2px 6px rgba(107,182,232,0.2)' },
                  ];
                  const row = isMobile
                    ? mobileRowColors[Math.floor(index / 2)]
                    : desktopRowColors[Math.floor(index / 3)];
                  return (
                    <div
                      key={test}
                      className="flex items-start gap-2 rounded-xl p-3 sm:p-4 transition-transform hover:scale-[1.02]"
                      style={{ backgroundColor: row.bg, boxShadow: row.shadow }}
                    >
                      <CheckCircle
                        className="w-4 h-4 flex-shrink-0 mt-0.5"
                        style={{ color: row.iconColor }}
                      />
                      <span
                        className="text-xs sm:text-sm font-medium leading-snug"
                        style={{ color: row.textColor }}
                      >
                        {test}
                      </span>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </Section>
        </div>
      </section>

      {/* ══ SERVICE AREA ════════════════════════════════════════ */}
      <section className="py-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <Section>
          <motion.div variants={itemVariants} className="mb-8">
            <span className="text-xs font-bold uppercase tracking-widest text-sunshine-blue mb-3 block">
              Coverage Area
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-sunshine-dark">
              Mobile Blood Draw Service Area — Pasco County &amp; Beyond
            </h2>
          </motion.div>

          <motion.div variants={itemVariants}>
            <div className="bg-white rounded-2xl shadow-md p-7">
              <h3 className="text-lg font-bold text-sunshine-blue mb-4">Where We Go</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                Our mobile phlebotomy team currently serves patients in Trinity, New Port Richey,
                Land O&apos; Lakes, Tarpon Springs, Holiday, Hudson, Port Richey, Odessa, Lutz,
                East Lake, Elfers, and surrounding communities throughout Pasco County and the
                greater Tampa Bay region.
              </p>
              <p className="text-gray-600 leading-relaxed mb-6">
                If you're unsure whether we serve your area, call us at{' '}
                <a
                  href="tel:+17272335223"
                  className="text-sunshine-blue font-semibold hover:underline"
                >
                  (727) 233-5223
                </a>
                . We're constantly expanding to accommodate patients across the region.
              </p>
              <div className="flex flex-wrap gap-x-4 gap-y-2">
                {[
                  'Trinity',
                  'New Port Richey',
                  "Land O' Lakes",
                  'Tarpon Springs',
                  'Holiday',
                  'Hudson',
                  'Port Richey',
                  'Odessa',
                  'Lutz',
                  'East Lake',
                  'Elfers',
                ].map((city) => (
                  <span key={city} className="flex items-center gap-1 text-gray-500 text-sm group">
                    <MapPin className="w-3 h-3 text-sunshine-blue/50 flex-shrink-0 group-hover:text-sunshine-blue transition-colors duration-200" />
                    <span className="group-hover:text-sunshine-dark transition-colors duration-200">{city}</span>
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </Section>
      </section>

      {/* ══ HOW IT WORKS ════════════════════════════════════════ */}
      <section className="py-20 bg-white overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Section>
            <motion.div variants={itemVariants} className="text-center mb-14">
              <span className="text-xs font-bold uppercase tracking-widest text-sunshine-blue mb-3 block">
                Simple Process
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-sunshine-dark">
                How Our Mobile Blood Draw Service Works
              </h2>
              <p className="text-gray-500 mt-4 max-w-xl mx-auto">
                Scheduling a mobile blood draw with Sunshine Clinical Lab is straightforward:
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
              {STEPS.map((step, i) => (
                <motion.div key={step.num} variants={cardVariants} custom={i}>
                  <MagicCard gradientColor="#93C5FD60" borderGlowColor="#2B7DBF" className="shadow-md hover:shadow-xl">
                    <div className="p-7 flex flex-col gap-4 h-full">
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#6BB6E8] to-[#2B7DBF] text-white flex items-center justify-center font-extrabold text-lg flex-shrink-0">
                        {step.num}
                      </div>
                      <h3 className="text-lg font-bold text-sunshine-dark">{step.title}</h3>
                      <p className="text-gray-500 text-sm leading-relaxed">{step.body}</p>
                    </div>
                  </MagicCard>
                </motion.div>
              ))}
            </div>

            <motion.p variants={itemVariants} className="text-center text-gray-500 italic">
              There's no membership, no subscription, and no hidden fees. Just professional,
              convenient lab work done your way.
            </motion.p>
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
              Mobile Lab — Pasco County
            </motion.span>

            <motion.h2
              variants={itemVariants}
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-5"
            >
              Skip the Waiting Room.
              <br />
              <span className="text-[#93C5FD]">We Come to You.</span>
            </motion.h2>

            <motion.p
              variants={itemVariants}
              className="text-white/80 text-lg leading-relaxed mb-10 max-w-2xl mx-auto"
            >
              Same-day and next-day appointments available across Pasco County. Professional,
              accurate, and convenient.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row justify-center gap-4 mb-12"
            >
              <a href="tel:+17272335223">
                <ShimmerButton className="bg-white text-sunshine-dark px-9 py-4 rounded-full font-bold shadow-2xl text-lg gap-2">
                  <Phone className="w-6 h-6" />
                  Call (727) 233-5223 to Schedule Your Mobile Blood Draw
                </ShimmerButton>
              </a>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-white/75 text-sm"
            >
              <span className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-white flex-shrink-0" />
                Serving all of Pasco County &amp; Tampa Bay
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

      {/* ══ FAST TURNAROUND ═════════════════════════════════════ */}
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

        {/* Content */}
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Section>
            <motion.div variants={itemVariants} className="mb-8">
              <span className="text-xs font-bold uppercase tracking-widest text-sunshine-blue mb-3 block">
                Results
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-sunshine-dark">
                Fast Turnaround — Even for Mobile Draws
              </h2>
            </motion.div>

            <motion.div variants={itemVariants}>
              <MagicCard className="shadow-md hover:shadow-lg">
                <div className="p-7 text-gray-600 leading-relaxed">
                  One of the biggest concerns patients have about mobile phlebotomy is whether it
                  slows down results. With Sunshine Clinical Lab, the answer is no. Samples drawn at
                  your home are processed through the same pipeline as in-office draws at our Trinity
                  location. For many routine tests, you'll have your results the next business day.
                  Your provider gets the same fast, accurate data regardless of where the blood was
                  drawn.
                </div>
              </MagicCard>
            </motion.div>
          </Section>
        </div>
      </section>

      {/* ══ DIRECT ANSWER #2 ════════════════════════════════════ */}
      <section className="py-12 bg-[#EBF5FB]">
        <Section>
          <motion.div variants={itemVariants} className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="border-l-4 border-sunshine-blue pl-6">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-sunshine-dark mb-4">
                How Do I Schedule a Mobile Blood Draw Near Me in Pasco County?
              </h2>
              <p className="text-gray-700 leading-relaxed text-base">
                To schedule a mobile blood draw in Pasco County, call Sunshine Clinical Lab at{' '}
                <a
                  href="tel:+17272335223"
                  className="text-sunshine-blue font-semibold hover:underline"
                >
                  (727) 233-5223
                </a>
                . The lab's mobile phlebotomy service covers Trinity, New Port Richey, Land
                O&apos; Lakes, Tarpon Springs, Holiday, Hudson, and surrounding areas. Patients
                need a physician's order for most tests. The phlebotomist will travel to the
                patient's home, office, or care facility. Results for many routine tests are
                available the next business day.
              </p>
            </div>
          </motion.div>
        </Section>
      </section>

      {/* ══ FAQ ═════════════════════════════════════════════════ */}
      <section className="py-20 relative overflow-hidden bg-[#D6EAF8]">
        {/* Background image */}
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
                Mobile Blood Draw — Frequently Asked Questions
              </h2>
              <p className="text-sunshine-dark/60 mt-4 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
                Everything you need to know before scheduling your mobile draw in Pasco County.
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
                Can't find what you're looking for? Our team is happy to help.
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
              Your Lab Work, Your Location,
              <br />
              <span className="text-[#93C5FD]">Your Schedule.</span>
            </motion.h2>

            <motion.p
              variants={itemVariants}
              className="text-white/80 text-lg leading-relaxed mb-4 max-w-2xl mx-auto"
            >
              Stop rearranging your day around a lab appointment. Sunshine Clinical Lab's mobile
              blood draw service puts experienced phlebotomists at your door — with the same fast
              results and personal care we're known for at our Trinity lab.
            </motion.p>

            <motion.p variants={itemVariants} className="text-white font-semibold text-lg mb-10">
              Call (727) 233-5223 to schedule your mobile blood draw today.
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
                Based out of 3600 Galileo Dr, Trinity, FL 34655 — Serving all of Pasco County
                &amp; Tampa Bay
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
                  { href: '/clinical-lab-services-trinity-fl', label: 'View All Lab Services' },
                  { href: '/trt-blood-test-new-port-richey', label: 'TRT Blood Testing' },
                  { href: '/insurance-accepted', label: 'Insurance Accepted' },
                  { href: '/clinical-lab-trinity-fl', label: 'Clinical Lab — Trinity' },
                  { href: '/clinical-lab-new-port-richey', label: 'Clinical Lab — New Port Richey' },
                  { href: '/clinical-lab-land-o-lakes-fl', label: "Clinical Lab — Land O' Lakes" },
                  {
                    href: '/clinical-lab-tarpon-springs-fl',
                    label: 'Clinical Lab — Tarpon Springs',
                  },
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
