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
  Home,
  Users,
  Activity,
  HeartPulse,
  Stethoscope,
  Repeat,
  ShieldCheck,
  Briefcase,
  Lock,
  HelpCircle,
  CalendarDays,
  Building2,
  ClipboardList,
  Truck,
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
  { x: -60, y: 0 },
  { x: 0, y: -60 },
];
const cardVariants = {
  hidden: (i) => {
    const { x, y } = CARD_DIRS[i % CARD_DIRS.length] ?? { x: 0, y: 28 };
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

/* ─── Data: Who Home Blood Draws Are For ─── */
const WHO_ITEMS = [
  {
    Icon: Users,
    title: 'Seniors',
    body: 'Regular blood work is part of managing most ongoing health conditions. A home visit removes the trip most seniors would rather not make.',
  },
  {
    Icon: Home,
    title: 'Homebound Patients',
    body: "For patients who can't leave home for medical or mobility reasons, a phlebotomist can complete routine or physician-ordered testing on-site.",
  },
  {
    Icon: Activity,
    title: 'Limited Mobility',
    body: 'Wheelchairs, walkers, and difficult transfers make a lab visit harder than it should be. A home draw removes that step entirely.',
  },
  {
    Icon: HeartPulse,
    title: 'Post-Surgical Recovery',
    body: 'Patients recovering from surgery often need follow-up labs without the activity level a lab trip would require.',
  },
  {
    Icon: Users,
    title: 'Caregivers & Family',
    body: 'Adult children and caregivers can schedule a visit on behalf of a parent or family member and be present for the appointment.',
  },
  {
    Icon: Repeat,
    title: 'Recurring Lab Work',
    body: 'Patients who need blood drawn on a set schedule — monthly, quarterly, or otherwise — can arrange recurring home visits instead of repeat lab trips.',
  },
  {
    Icon: ShieldCheck,
    title: 'TRT & Hormone Monitoring',
    body: 'Testosterone therapy typically calls for periodic monitoring, and a home draw keeps that on schedule without extra time away from work.',
  },
  {
    Icon: Briefcase,
    title: 'Busy Professionals',
    body: "A scheduled home visit can happen before work, during a break, or whenever it fits — without a lab's hours setting the terms.",
  },
];

/* ─── Data: How a Home Blood Draw Works ─── */
const STEPS = [
  {
    num: '01',
    title: 'Schedule the Visit',
    body: 'Contact Sunshine Clinical Labs to arrange a home draw in Tampa or a nearby Hillsborough County area.',
  },
  {
    num: '02',
    title: 'We Come to Your Home',
    body: 'A phlebotomist arrives at the scheduled address at the agreed time.',
  },
  {
    num: '03',
    title: 'Your Blood Is Collected',
    body: 'The specimen is collected and handled according to standard specimen protocols.',
  },
  {
    num: '04',
    title: 'Testing and Results',
    body: 'The specimen proceeds to the appropriate laboratory testing.',
  },
];

/* ─── Data: What Blood Tests Can Be Drawn at Home ─── */
const BLOOD_TESTS = [
  'CBC',
  'Comprehensive Metabolic Panel (CMP)',
  'Lipid Panel',
  'A1C / Glucose Testing',
  'Thyroid Testing',
  'Liver Function Testing',
  'Kidney Function Testing',
  'TRT & Hormone Monitoring',
  'Other Eligible Laboratory Testing',
];

const DESKTOP_ROW_COLORS = [
  { bg: '#1E2A38', textColor: '#FFFFFF', iconColor: '#6BB6E8', shadow: '0 4px 12px rgba(30,42,56,0.35)' },
  { bg: '#2B7DBF', textColor: '#FFFFFF', iconColor: '#FFFFFF', shadow: '0 4px 12px rgba(43,125,191,0.35)' },
  { bg: '#6BB6E8', textColor: '#1E2A38', iconColor: '#1E2A38', shadow: '0 2px 8px rgba(107,182,232,0.3)' },
];
const MOBILE_ROW_COLORS = [
  { bg: '#1E2A38', textColor: '#FFFFFF', iconColor: '#6BB6E8', shadow: '0 4px 12px rgba(30,42,56,0.35)' },
  { bg: '#2B7DBF', textColor: '#FFFFFF', iconColor: '#FFFFFF', shadow: '0 3px 10px rgba(43,125,191,0.35)' },
  { bg: '#6BB6E8', textColor: '#1E2A38', iconColor: '#1E2A38', shadow: '0 2px 8px rgba(107,182,232,0.3)' },
  { bg: '#CCE9F7', textColor: '#1E2A38', iconColor: '#2B7DBF', shadow: '0 2px 6px rgba(107,182,232,0.2)' },
];

/* ─── Data: TRT markers ─── */
const TRT_MARKERS = [
  'Total Testosterone',
  'Free Testosterone',
  'Estradiol',
  'Hematocrit',
  'SHBG',
  'LH/FSH',
  'PSA',
  'CBC',
  'CMP',
];

/* ─── Data: Service areas ─── */
const SERVICE_AREAS = [
  'North Tampa',
  'South Tampa',
  'West Tampa',
  'Carrollwood',
  'Citrus Park',
  'Westchase',
  'New Tampa',
  'Brandon',
  'Riverview',
  'Bloomingdale',
  'Apollo Beach',
  'Wesley Chapel',
];

/* ─── Data: FAQ ─── */
const FAQ_ITEMS = [
  {
    q: 'Can someone come to my home in Tampa to draw blood?',
    a: 'Yes. Sunshine Clinical Labs offers scheduled home blood draws in Tampa and select Hillsborough County areas.',
  },
  {
    q: 'How do I schedule an at-home blood draw?',
    a: 'Call (727) 233-5223 or use the scheduling option on this page to arrange a home visit.',
  },
  {
    q: 'Who can use home phlebotomy?',
    a: 'Home draws are available to patients who need or prefer blood work collected outside of a lab setting, including seniors, homebound patients, and those with limited mobility.',
  },
  {
    q: 'Can you draw blood at home for an elderly parent?',
    a: 'Yes. A caregiver or adult child can schedule the visit on behalf of a parent or family member.',
  },
  {
    q: 'Can a phlebotomist come to an assisted living community?',
    a: 'Yes, this can be arranged. Contact our team to discuss scheduling for a facility or community.',
  },
  {
    q: 'Can I have TRT blood work drawn at home?',
    a: 'Yes, TRT and hormone-monitoring panels can typically be drawn at home. Contact our team to confirm any markers that require special handling or cannot be drawn outside a lab setting.',
  },
  {
    q: 'What blood tests can be collected at home?',
    a: 'Many routine and specialty tests can be collected at home, including CBC, metabolic panels, lipid panels, and TRT monitoring. Contact our team to confirm your specific test.',
  },
  {
    q: 'Does insurance cover home blood draws?',
    a: 'Coverage varies by plan and test. Contact our team to confirm whether a separate home-draw fee applies and how it is billed.',
  },
  {
    q: 'Does Sunshine Clinical Labs have a walk-in lab in Tampa?',
    a: 'No. Sunshine Clinical Labs does not operate a walk-in laboratory in Tampa. The walk-in location is in Trinity, FL. Home draws are how Sunshine Clinical Labs serves Tampa-area patients.',
  },
];

/* ─── FAQ accordion item (site-wide pattern) ─── */
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
export default function HomeBloodDrawTampaPage() {
  const [openFaq, setOpenFaq] = useState(null);
  const toggleFaq = (i) => setOpenFaq((prev) => (prev === i ? null : i));

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const col1 = FAQ_ITEMS.slice(0, 5);
  const col2 = FAQ_ITEMS.slice(5);

  return (
    <div className="bg-sunshine-soft min-h-screen">
      {/* ══ HERO ════════════════════════════════════════════════ */}
      <section className="relative w-full min-h-[85vh] flex items-center overflow-hidden">
        <Image
          src="/mbd-banner.jpg"
          alt="Home Blood Draw Services in Tampa, FL"
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
            <motion.p
              variants={heroItemVariants}
              className="text-white/75 text-sm font-semibold tracking-widest mb-4"
            >
              TAMPA, FL
            </motion.p>

            <motion.h1
              variants={heroItemVariants}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6"
            >
              Home Blood Draw Services in Tampa, FL
            </motion.h1>

            <motion.p
              variants={heroItemVariants}
              className="text-white/85 text-lg leading-relaxed mb-4 max-w-xl"
            >
              Sunshine Clinical Labs sends a phlebotomist to your home for scheduled blood
              collection in Tampa and select Hillsborough County areas. No trip to a lab, no
              waiting room — just a visit at the address you choose, at a time you&apos;ve
              scheduled in advance.
            </motion.p>

            <motion.div
              variants={heroItemVariants}
              className="flex flex-col sm:flex-row flex-wrap gap-4 justify-start mb-8 mt-6"
            >
              <a href="tel:+17272335223">
                <ShimmerButton className="w-full sm:w-auto bg-white text-sunshine-dark px-7 py-3.5 rounded-full font-bold shadow-xl text-base gap-2">
                  <Phone className="w-5 h-5" />
                  Call (727) 233-5223
                </ShimmerButton>
              </a>
              <Link href="/book-appointment?service=home-draw&location=tampa">
                <ShimmerButton className="w-full sm:w-auto bg-sunshine-blue text-white px-7 py-3.5 rounded-full font-semibold shadow-lg text-base border border-white/20 gap-2">
                  <CalendarDays className="w-4 h-4" />
                  Schedule a Home Blood Draw
                </ShimmerButton>
              </Link>
            </motion.div>

            <motion.div
              variants={heroItemVariants}
              className="flex flex-wrap gap-2 sm:gap-3 justify-start"
            >
              {[
                { Icon: Home, label: 'Home Visits' },
                { Icon: CalendarDays, label: 'Scheduled Appointments' },
                { Icon: ShieldCheck, label: 'Professional Blood Collection' },
              ].map(({ Icon, label }) => (
                <span
                  key={label}
                  className="inline-flex items-center gap-1.5 bg-white/10 border border-white/20 text-white text-xs font-semibold px-3 py-1.5 rounded-full backdrop-blur-sm"
                >
                  <Icon className="w-3.5 h-3.5 text-[#93C5FD] flex-shrink-0" />
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

      {/* ══ 1. BLOOD WORK WITHOUT LEAVING HOME ═════════════════════ */}
      <section className="py-12 bg-[#EBF5FB]">
        <Section>
          <motion.div variants={itemVariants} className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
              <div className="h-1 w-full bg-gradient-to-r from-sunshine-blue to-sunshine-sky" />
              <div className="p-7 sm:p-9">
                <div className="flex items-center gap-2 mb-5">
                  <span className="inline-flex items-center gap-1.5 bg-sunshine-blue/10 text-sunshine-blue text-xs font-bold tracking-wide px-3 py-1.5 rounded-full">
                    <Home className="w-3.5 h-3.5" />
                    Home Phlebotomy — Tampa, FL
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-sunshine-dark mb-4">
                  Blood Work Without Leaving Home
                </h2>
                <div className="text-gray-700 leading-relaxed text-base space-y-4 mb-7">
                  <p>
                    Getting to a lab isn&apos;t always simple. A car might not be available, a
                    parking lot might not work well with a walker, a work schedule might not
                    leave room for a waiting room, or a family member might be coordinating care
                    for someone who shouldn&apos;t be traveling right now.
                  </p>
                  <p>
                    Sunshine Clinical Labs offers another option: a phlebotomist comes to the
                    home, collects the sample there, and the appointment is finished in a
                    fraction of the time a lab trip usually takes. Call{' '}
                    <a
                      href="tel:+17272335223"
                      className="text-sunshine-blue font-semibold hover:underline"
                    >
                      (727) 233-5223
                    </a>{' '}
                    or schedule online.
                  </p>
                </div>
                <div className="flex flex-wrap gap-2 sm:gap-3">
                  {[
                    { icon: MapPin, label: 'Tampa & Hillsborough County' },
                    { icon: CalendarDays, label: 'Scheduled Appointments' },
                    { icon: ShieldCheck, label: 'Insurance & Self-Pay Accepted' },
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

      {/* ══ 2. WHO HOME BLOOD DRAWS ARE FOR ═════════════════════════ */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Section>
          <motion.div variants={itemVariants} className="text-center mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-sunshine-blue mb-3 block">
              Who We Serve
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-sunshine-dark">
              Who Home Blood Draws Are For
            </h2>
            <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
              Our home blood draw service is designed for Tampa-area patients who need or prefer
              at-home lab work.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {WHO_ITEMS.map(({ Icon, title, body }, i) => (
              <motion.div key={title} variants={cardVariants} custom={i}>
                <MagicCard gradientColor="#93C5FD60" borderGlowColor="#2B7DBF" className="shadow-md hover:shadow-xl h-full">
                  <div className="p-6 flex flex-col gap-3 h-full">
                    <div className="w-11 h-11 rounded-2xl bg-sunshine-soft flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-sunshine-blue" />
                    </div>
                    <h3 className="text-base font-bold text-sunshine-dark">{title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">{body}</p>
                  </div>
                </MagicCard>
              </motion.div>
            ))}
          </div>
        </Section>
      </section>

      {/* ══ 3. HOW A HOME BLOOD DRAW WORKS ═══════════════════════════ */}
      <section className="py-20 bg-white overflow-hidden relative">
        <div className="absolute inset-0">
          <Image
            src="/home-blood-draw-sunshine-clinical-labs.jpg"
            alt=""
            fill
            className="object-cover"
            style={{ opacity: 0.2 }}
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-white/40" />
        </div>
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Section>
            <motion.div variants={itemVariants} className="text-center mb-14">
              <span className="text-xs font-bold uppercase tracking-widest text-sunshine-blue mb-3 block">
                Simple Process
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-sunshine-dark">
                How a Home Blood Draw Works
              </h2>
              <p className="text-gray-500 mt-4 max-w-xl mx-auto">
                Scheduling a home blood draw with Sunshine Clinical Labs is straightforward:
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {STEPS.map((step, i) => (
                <motion.div key={step.num} variants={cardVariants} custom={i}>
                  <MagicCard gradientColor="#93C5FD60" borderGlowColor="#2B7DBF" className="shadow-md hover:shadow-xl h-full">
                    <div className="p-7 flex flex-col gap-4 h-full">
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#6BB6E8] to-[#2B7DBF] text-white flex items-center justify-center font-extrabold text-lg flex-shrink-0">
                        {step.num}
                      </div>
                      <h3 className="text-lg font-bold text-sunshine-dark">
                        {step.title}
                      </h3>
                      <p className="text-gray-500 text-sm leading-relaxed">{step.body}</p>
                    </div>
                  </MagicCard>
                </motion.div>
              ))}
            </div>

            <motion.p variants={itemVariants} className="text-center text-gray-600 text-sm">
              Have questions about your test or appointment? Call{' '}
              <a href="tel:+17272335223" className="text-sunshine-blue font-semibold hover:underline">
                (727) 233-5223
              </a>
              .
            </motion.p>
          </Section>
        </div>
      </section>

      {/* ══ 4. WHAT BLOOD TESTS CAN BE DRAWN AT HOME ═══════════════════ */}
      <section className="py-20 bg-[#EBF5FB] overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Section>
            <motion.div variants={itemVariants} className="mb-10">
              <span className="text-xs font-bold uppercase tracking-widest text-sunshine-blue mb-3 block">
                Tests Available
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-sunshine-dark">
                What Blood Tests Can Be Drawn at Home?
              </h2>
              <p className="text-gray-600 mt-4 max-w-2xl">
                Many routine and specialty blood tests can be collected through a home visit,
                including:
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3 mb-8">
              {BLOOD_TESTS.map((test, index) => {
                const row = isMobile
                  ? MOBILE_ROW_COLORS[Math.floor(index / 2) % MOBILE_ROW_COLORS.length]
                  : DESKTOP_ROW_COLORS[Math.floor(index / 3) % DESKTOP_ROW_COLORS.length];
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
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="flex items-start gap-3 bg-white border-l-4 border-sunshine-blue rounded-r-xl p-5"
            >
              <p className="text-gray-600 text-sm leading-relaxed">
                <strong className="text-sunshine-dark">
                  Not every test is appropriate for home collection.
                </strong>{' '}
                Contact our team to confirm whether your specific test can be collected through a
                home visit. Not every test Sunshine Clinical Labs offers is necessarily eligible
                for home collection.{' '}
                <a href="tel:+17272335223" className="text-sunshine-blue font-semibold hover:underline">
                  Ask About Your Test →
                </a>
              </p>
            </motion.div>
          </Section>
        </div>
      </section>

      {/* ══ 5. HOME BLOOD DRAWS FOR SENIORS & HOMEBOUND PATIENTS ══════ */}
      <section className="py-20 bg-white overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Section>
            <motion.div variants={itemVariants} className="mb-10">
              <span className="text-xs font-bold uppercase tracking-widest text-sunshine-blue mb-3 block">
                Seniors &amp; Homebound Care
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-sunshine-dark">
                Home Blood Draws for Seniors &amp; Homebound Patients
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8 lg:items-stretch">
              <motion.div variants={itemVariants} className="bg-sunshine-soft rounded-2xl shadow-sm overflow-hidden h-full">
                <div className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-5 p-7 sm:p-8 h-full">
                  <div className="w-12 h-12 rounded-2xl bg-sunshine-blue flex items-center justify-center flex-shrink-0 shadow-md">
                    <Stethoscope className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-gray-600 leading-relaxed space-y-3">
                    <p>
                      For seniors and homebound patients, the hardest part of getting blood work
                      done is usually the lab visit itself, not the blood draw. Arranging
                      transportation, navigating a waiting room, and managing a physical transfer
                      in and out of a vehicle can turn a short test into most of a day.
                    </p>
                    <p>
                      A home blood draw removes those steps. The phlebotomist comes to the home,
                      completes the collection at a table or chair the patient is already
                      comfortable in, and the visit is over.
                    </p>
                    <p>
                      For adult children and caregivers coordinating care from a distance,
                      scheduling a home visit means one phone call instead of arranging a ride,
                      taking time off work, or asking facility staff to help with transport.
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div variants={itemVariants} className="relative rounded-2xl shadow-sm overflow-hidden min-h-[280px] lg:min-h-0">
                <Image
                  src="/Phlebotomist performing a draw at a home.webp"
                  alt="Phlebotomist performing a home blood draw for a senior patient"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </motion.div>
            </div>

            <motion.div variants={itemVariants} className="text-center">
              <Link href="/book-appointment?service=home-draw&location=tampa">
                <ShimmerButton className="bg-sunshine-blue text-white px-8 py-3.5 rounded-full font-semibold shadow-lg gap-2">
                  <CalendarDays className="w-5 h-5" />
                  Schedule a Home Visit
                </ShimmerButton>
              </Link>
            </motion.div>
          </Section>
        </div>
      </section>

      {/* ══ 6. TRT & HORMONE BLOOD DRAWS AT HOME ═══════════════════════ */}
      <section className="py-20 bg-[#EBF5FB] overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Section>
            <motion.div variants={itemVariants} className="mb-8">
              <span className="text-xs font-bold uppercase tracking-widest text-sunshine-blue mb-3 block">
                Hormone Monitoring
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-sunshine-dark">
                TRT &amp; Hormone Blood Draws at Home
              </h2>
              <p className="text-gray-600 mt-4 max-w-2xl leading-relaxed">
                Testosterone replacement therapy works best with consistent monitoring, and a
                home draw keeps that monitoring on schedule without an extra trip to a lab.
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="bg-white rounded-2xl shadow-md overflow-hidden mb-6">
              <div className="flex items-center gap-4 px-7 pt-7 pb-4">
                <div className="w-10 h-10 rounded-xl bg-sunshine-blue flex items-center justify-center flex-shrink-0">
                  <ShieldCheck className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-lg font-bold text-sunshine-dark">
                  Markers Commonly Drawn for TRT Monitoring
                </h3>
              </div>
              <div className="px-7 pb-7">
                <div className="flex flex-wrap gap-2">
                  {TRT_MARKERS.map((marker) => (
                    <span
                      key={marker}
                      className="inline-flex items-center gap-1.5 bg-sunshine-soft border border-sunshine-blue/15 text-sunshine-dark text-xs font-semibold px-3 py-1.5 rounded-full"
                    >
                      <CheckCircle className="w-3 h-3 text-sunshine-blue flex-shrink-0" />
                      {marker}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.p variants={itemVariants} className="text-gray-600 text-sm leading-relaxed mb-8">
              Contact our team to confirm which markers apply to your monitoring schedule.
            </motion.p>

            <motion.div variants={itemVariants}>
              <a href="tel:+17272335223">
                <ShimmerButton className="bg-sunshine-blue text-white px-8 py-3.5 rounded-full font-semibold shadow-lg gap-2">
                  <Phone className="w-5 h-5" />
                  Ask About Home TRT Blood Draws
                </ShimmerButton>
              </a>
            </motion.div>
          </Section>
        </div>
      </section>

      {/* ══ 7. TAMPA & HILLSBOROUGH HOME DRAW COVERAGE ═══════════════════ */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/home-blood-draw-tampa-service-areas.webp"
            alt="Map of Sunshine Clinical Labs' home blood draw coverage area in Tampa and Hillsborough County"
            fill
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/60 to-transparent" />
        </div>

        <div className="relative max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12">
          <Section>
            <motion.div variants={itemVariants} className="mb-8">
              <span className="text-xs font-bold uppercase tracking-widest text-sunshine-blue mb-3 block">
                Coverage Area
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-sunshine-dark">
                Tampa &amp; Hillsborough Home Draw Coverage
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:items-stretch max-w-4xl">
              <motion.div variants={itemVariants} className="h-full">
                <div className="bg-sunshine-soft/95 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden h-full flex flex-col">
                  <div className="flex items-center gap-4 px-7 pt-7 pb-4">
                    <div className="w-10 h-10 rounded-xl bg-sunshine-blue flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-sunshine-dark">Areas We Serve</h3>
                  </div>
                  <div className="px-7 pb-7 space-y-4 flex-1">
                    <p className="text-gray-600 leading-relaxed">
                      Sunshine Clinical Labs provides scheduled home blood draw service in Tampa
                      and select Hillsborough County areas.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {SERVICE_AREAS.map((area) => (
                        <span
                          key={area}
                          className="inline-flex items-center gap-1.5 bg-white border border-sunshine-blue/15 text-sunshine-dark text-xs font-semibold px-3 py-1.5 rounded-full"
                        >
                          <MapPin className="w-3 h-3 text-sunshine-blue flex-shrink-0" />
                          {area}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-start gap-3 bg-white border-l-4 border-sunshine-blue rounded-r-xl p-4">
                      <p className="text-gray-600 text-sm leading-relaxed">
                        Not every zip code in the greater Tampa area is currently covered. Our
                        service area may extend beyond the communities listed above — call{' '}
                        <a href="tel:+17272335223" className="text-sunshine-blue font-semibold hover:underline">
                          (727) 233-5223
                        </a>{' '}
                        and we&apos;ll check your address.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div variants={itemVariants} className="h-full">
                <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden h-full flex flex-col border border-sunshine-blue/10">
                  <div className="flex items-center gap-4 px-7 pt-7 pb-4">
                    <div className="w-10 h-10 rounded-xl bg-sunshine-dark flex items-center justify-center flex-shrink-0">
                      <Building2 className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-sunshine-dark">Looking for a Walk-In Laboratory?</h3>
                  </div>
                  <div className="px-7 pb-7 flex-1 flex flex-col">
                    <p className="text-gray-600 leading-relaxed mb-5">
                      Sunshine Clinical Labs does not currently operate a walk-in laboratory in
                      Tampa. Patients who prefer walk-in service can visit the Trinity laboratory.
                    </p>
                    <div className="space-y-3 mb-6">
                      <div className="flex items-start gap-3 bg-sunshine-soft/60 rounded-xl p-3.5">
                        <MapPin className="w-4 h-4 text-sunshine-blue mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-600">
                          Sunshine Clinical Labs LLC — 3600 Galileo Dr, Suite 104, Trinity, FL 34655
                        </span>
                      </div>
                      <div className="flex items-start gap-3 bg-sunshine-soft/60 rounded-xl p-3.5">
                        <Phone className="w-4 h-4 text-sunshine-blue mt-0.5 flex-shrink-0" />
                        <a href="tel:+17272335223" className="text-sm text-gray-600 hover:underline">(727) 233-5223</a>
                      </div>
                      <div className="flex items-start gap-3 bg-sunshine-soft/60 rounded-xl p-3.5">
                        <Clock className="w-4 h-4 text-sunshine-blue mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-600">Monday–Friday, 8:00 AM–2:00 PM</span>
                      </div>
                    </div>
                    <div className="mt-auto pt-2 border-t border-gray-100">
                      <Link
                        href="/clinical-lab-trinity-fl"
                        className="inline-flex items-center gap-1.5 text-sunshine-blue text-sm font-semibold hover:underline mt-4"
                      >
                        Visit the Trinity Laboratory Page →
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </Section>
        </div>
      </section>

      {/* ══ 8. HOME DRAWS FOR CARE FACILITIES & PROVIDERS ═══════════════ */}
      <section className="py-20 bg-[#EBF5FB] overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Section>
            <motion.div variants={itemVariants} className="mb-8">
              <span className="text-xs font-bold uppercase tracking-widest text-sunshine-blue mb-3 block">
                Facilities &amp; Providers
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-sunshine-dark">
                Home Draws for Care Facilities &amp; Providers
              </h2>
            </motion.div>

            <motion.div variants={itemVariants} className="bg-white rounded-2xl shadow-md overflow-hidden mb-8">
              <div className="flex items-center gap-4 px-7 pt-7 pb-4">
                <div className="w-12 h-12 rounded-2xl bg-sunshine-blue flex items-center justify-center flex-shrink-0 shadow-md">
                  <ClipboardList className="w-6 h-6 text-white" />
                </div>
                <p className="text-gray-600 leading-relaxed">
                  Sunshine Clinical Labs can also discuss scheduled blood collection for assisted
                  living communities, memory care, skilled nursing facilities, home health
                  patients, hospice patients, and physician practices arranging testing for their
                  patients.
                </p>
              </div>
              <div className="px-7 pb-7">
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
                  {[
                    'Assisted Living Communities',
                    'Memory Care',
                    'Skilled Nursing Facilities',
                    'Home Health Patients',
                    'Hospice Patients',
                    'Physician Practices',
                  ].map((facility) => (
                    <div
                      key={facility}
                      className="flex items-start gap-2 bg-sunshine-soft/60 border border-sunshine-blue/10 rounded-xl p-3.5"
                    >
                      <CheckCircle className="w-4 h-4 text-sunshine-blue flex-shrink-0 mt-0.5" />
                      <span className="text-sm font-medium text-sunshine-dark leading-snug">
                        {facility}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <a href="tel:+17272335223">
                <ShimmerButton className="bg-sunshine-blue text-white px-8 py-3.5 rounded-full font-semibold shadow-lg gap-2">
                  <Phone className="w-5 h-5" />
                  Ask About Facility Blood Draw Service
                </ShimmerButton>
              </a>
            </motion.div>
          </Section>
        </div>
      </section>

      {/* ══ 9. INSURANCE & SELF-PAY ═══════════════════════════════════ */}
      <section className="py-20 relative overflow-hidden bg-gradient-to-r from-sunshine-blue to-sunshine-sky">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full border border-white/10" />
          <div className="absolute -bottom-16 -left-16 w-72 h-72 rounded-full border border-white/10" />
          <div className="absolute top-1/2 left-1/4 w-40 h-40 rounded-full bg-white/[0.04]" />
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Section>
            <motion.span
              variants={itemVariants}
              className="inline-flex items-center gap-2 bg-white/20 border border-white/30 text-white px-4 py-1.5 rounded-full text-sm font-semibold mb-6"
            >
              Home Blood Draw — Tampa, FL
            </motion.span>
            <motion.div variants={itemVariants} className="flex justify-center mb-6">
              <div className="w-14 h-14 rounded-2xl bg-white/15 border border-white/25 flex items-center justify-center">
                <Lock className="w-7 h-7 text-white" />
              </div>
            </motion.div>
            <motion.h2
              variants={itemVariants}
              className="text-3xl sm:text-4xl font-extrabold text-white leading-tight mb-6"
            >
              Insurance &amp; Self-Pay
            </motion.h2>

            <motion.p variants={itemVariants} className="text-white/85 text-lg leading-relaxed mb-4 max-w-2xl mx-auto">
              Sunshine Clinical Labs accepts insurance and offers self-pay options. Coverage and
              patient responsibility can vary by plan, test, and home-service arrangement.
            </motion.p>

            <motion.p variants={itemVariants} className="text-white/85 leading-relaxed mb-10 max-w-2xl mx-auto">
              Contact our team before scheduling to confirm your coverage and any applicable
              home-draw charge.
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row justify-center gap-4">
              <a href="tel:+17272335223">
                <ShimmerButton className="w-full sm:w-auto bg-white text-sunshine-dark px-9 py-4 rounded-full font-bold shadow-2xl text-lg gap-2">
                  <Phone className="w-6 h-6" />
                  Call (727) 233-5223
                </ShimmerButton>
              </a>
              <Link href="/insurance-accepted">
                <ShimmerButton className="w-full sm:w-auto bg-white/20 backdrop-blur-sm border-2 border-white text-white px-9 py-4 rounded-full font-semibold text-lg gap-2">
                  <ShieldCheck className="w-5 h-5" />
                  View Insurance &amp; Self-Pay Options
                </ShimmerButton>
              </Link>
            </motion.div>
          </Section>
        </div>
      </section>

      {/* ══ 10. FAQ ═════════════════════════════════════════════════ */}
      <section className="py-20 relative overflow-hidden bg-[#D6EAF8]">
        <div className="absolute inset-0">
          <Image
            src="/home-blood-draw-tampa-service-fl.jpg"
            alt=""
            fill
            className="object-cover"
            style={{ opacity: 0.3 }}
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-[#D6EAF8]/60" />
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
                Frequently Asked Questions
              </h2>
              <p className="text-sunshine-dark/60 mt-4 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
                Everything you need to know before scheduling your home blood draw in Tampa.
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
                      index={i + 5}
                      isOpen={openFaq === i + 5}
                      onToggle={() => toggleFaq(i + 5)}
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

      {/* ══ EXPLORE MORE / INTERNAL LINKS ═══════════════════════════ */}
      <section className="py-16 bg-white overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Section>
            <motion.div variants={itemVariants} className="text-center mb-10">
              <span className="text-xs font-bold uppercase tracking-widest text-sunshine-blue mb-3 block">
                Explore More
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-sunshine-dark">
                More From Sunshine Clinical Labs
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {[
                {
                  href: '/all-services',
                  title: 'All Our Services',
                  body: 'Browse our full menu of clinical lab testing and services.',
                },
                {
                  href: '/mobile-blood-draw-wesley-chapel',
                  title: 'Other Areas We Serve',
                  body: 'See our mobile and home blood draw coverage in Wesley Chapel and surrounding communities.',
                },
                {
                  href: '/faq',
                  title: 'Frequently Asked Questions',
                  body: 'Answers to common questions about scheduling, testing, and results.',
                },
                {
                  href: '/contact',
                  title: 'Contact Us',
                  body: 'Reach our team with questions about scheduling a home blood draw in Tampa.',
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

      {/* ══ FINAL CTA — NEED BLOOD WORK AT HOME IN TAMPA? ═══════════════ */}
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
              <Truck className="w-4 h-4" />
              Sunshine Clinical Labs — Tampa
            </motion.span>

            <motion.h2
              variants={itemVariants}
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-5"
            >
              Need Blood Work at Home in Tampa?
            </motion.h2>

            <motion.p
              variants={itemVariants}
              className="text-white/85 text-lg leading-relaxed mb-10 max-w-2xl mx-auto"
            >
              Skip the trip to the lab and schedule a home blood draw with Sunshine Clinical
              Labs.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row justify-center gap-4 mb-12"
            >
              <Link href="/book-appointment?service=home-draw&location=tampa">
                <ShimmerButton className="bg-white text-sunshine-dark px-9 py-4 rounded-full font-bold shadow-2xl text-lg gap-2">
                  <CalendarDays className="w-6 h-6" />
                  Schedule a Home Blood Draw
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
                Serving Tampa &amp; Select Hillsborough County Areas
              </span>
              <span className="hidden sm:block text-white/30">|</span>
              <span className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-white flex-shrink-0" />
                Scheduled Appointments — Call to Book Your Visit
              </span>
            </motion.div>
          </Section>
        </div>
      </section>
    </div>
  );
}
