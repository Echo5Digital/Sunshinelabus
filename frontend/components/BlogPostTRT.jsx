'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowLeft, User, Clock, CalendarDays, Phone, CheckCircle } from 'lucide-react';

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

const qaItems = [
  {
    q: 'How often should you get blood work while on TRT?',
    a: 'Most patients need testing every 6–8 weeks initially, then every 3–6 months once stable.',
  },
  {
    q: 'What is the most important test for TRT?',
    a: 'Testosterone levels (total and free) are essential, but hematocrit and estrogen are equally critical for safety.',
  },
  {
    q: 'Can I skip blood tests if I feel fine on TRT?',
    a: "No. Many imbalances don't show symptoms until they become serious.",
  },
  {
    q: 'Where can I get a TRT blood test near me in Trinity, FL?',
    a: 'You can visit Sunshine Clinical Lab, which offers walk-in and mobile blood testing services.',
  },
  {
    q: 'How fast do TRT blood test results come back?',
    a: 'At Sunshine Clinical Lab, many results are available within 24 hours, depending on the panel.',
  },
];

export default function BlogPostTRT() {
  return (
    <div className="bg-white min-h-screen">

      {/* ── Single Hero Banner ── */}
      <div className="relative pt-36 pb-20 sm:pb-28 bg-[#EBF5FB] overflow-hidden">
        {/* Background image at very low opacity */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/trt-blog.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-20"
          />
        </div>

        {/* Subtle gradient overlay so edges fade cleanly */}
        <div className="absolute inset-0 z-[1] bg-gradient-to-r from-[#EBF5FB]/80 via-transparent to-[#EBF5FB]/60 pointer-events-none" />

        <div className="container-custom relative z-10 max-w-4xl">
          {/* Back link */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sunshine-blue hover:text-sunshine-blue/70 text-sm font-medium mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>

          {/* Category + Date */}
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-sunshine-blue text-white">
              TRT
            </span>
            <span className="flex items-center gap-1.5 text-xs text-sunshine-dark/60">
              <CalendarDays className="w-3.5 h-3.5" />
              April 24, 2025
            </span>
          </div>

          {/* H1 */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-sunshine-dark leading-tight mb-6 max-w-3xl">
            How Often Should You Get Blood Work While on TRT?
          </h1>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-5 text-sm text-sunshine-dark/60">
            <span className="flex items-center gap-2">
              <User className="w-4 h-4 text-sunshine-blue" />
              Sunshine Clinical Lab
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-sunshine-blue" />
              5–6 min read
            </span>
          </div>
        </div>
      </div>

      {/* ── Article ── */}
      <div className="bg-white py-14">
        <div className="container-custom">
          <motion.article
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-3xl mx-auto"
          >
            {/* ─ Intro ─ */}
            <motion.div variants={itemVariants} className="space-y-5 mb-12">
              <p className="text-sunshine-dark/80 leading-relaxed text-[1.05rem]">
                Testosterone Replacement Therapy (TRT) isn't a one-time decision, it's an ongoing
                clinical process. And at the center of that process is something many patients
                underestimate: routine blood work.
              </p>
              <p className="text-sunshine-dark/80 leading-relaxed text-[1.05rem]">
                At Sunshine Clinical Lab in Trinity, FL, we regularly see patients who start TRT with
                enthusiasm but lack clarity on monitoring. Some assume once they feel better, testing
                becomes optional. In reality, it's the opposite. The better you feel, the more
                important it is to ensure everything is still balanced behind the scenes.
              </p>
              <p className="text-sunshine-dark/80 leading-relaxed text-[1.05rem]">
                So, how often should you get blood work while on TRT? The answer depends on your
                stage of treatment, your body's response, and how carefully your therapy is being
                managed.
              </p>
            </motion.div>

            {/* ─ Why Blood Work Matters ─ */}
            <motion.div variants={itemVariants} className="mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold text-sunshine-dark mb-5">
                Why Blood Work Matters During TRT
              </h2>
              <p className="text-sunshine-dark/80 leading-relaxed text-[1.05rem] mb-4">
                TRT directly alters hormone levels primarily testosterone, but also related markers
                like estrogen, hematocrit, and cholesterol. Without regular testing, these levels can
                drift outside optimal ranges without obvious symptoms.
              </p>
              <p className="text-sunshine-dark/80 leading-relaxed text-[1.05rem] mb-5">
                We've seen cases at Sunshine Clinical Lab where patients felt "fine," yet their blood
                work told a different story: elevated hematocrit, suppressed natural production, or
                imbalanced estrogen levels.
              </p>
              <p className="text-sunshine-dark/80 leading-relaxed text-[1.05rem] mb-3">
                Blood testing helps:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-sunshine-dark/80 text-[1.05rem] mb-5">
                <li>Ensure testosterone levels stay within a healthy range</li>
                <li>Monitor side effects early</li>
                <li>Adjust dosage safely</li>
                <li>Track long-term health markers</li>
              </ul>
              <p className="text-sunshine-dark/80 leading-relaxed text-[1.05rem] font-medium">
                In short,{' '}
                <Link
                  href="/trt-blood-test-pasco-county"
                  className="text-sunshine-blue hover:underline font-semibold"
                >
                  TRT without blood work
                </Link>{' '}
                is guesswork.
              </p>
            </motion.div>

            {/* ─ TRT Blood Test Frequency ─ */}
            <motion.div variants={itemVariants} className="mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold text-sunshine-dark mb-5">
                TRT Blood Test Frequency: What's the Standard?
              </h2>
              <p className="text-sunshine-dark/80 leading-relaxed text-[1.05rem] mb-6">
                There isn't a one-size-fits-all schedule, but there are well-established clinical
                guidelines most providers follow.
              </p>

              <div className="space-y-5">
                {/* Initial Phase */}
                <div className="bg-[#EBF5FB] rounded-2xl p-6 border border-sunshine-sky/20">
                  <h3 className="text-lg font-semibold text-sunshine-dark mb-3">
                    Initial Phase (First 3–6 Months)
                  </h3>
                  <p className="text-sunshine-dark/80 leading-relaxed mb-4">
                    During the early stage of TRT, your body is adapting. Hormone levels can
                    fluctuate, and dosage adjustments are common.
                  </p>
                  <div className="bg-white rounded-xl px-4 py-3 mb-3 border border-sunshine-sky/30">
                    <p className="text-sm font-semibold text-sunshine-blue mb-1">
                      👉 Recommended testing:
                    </p>
                    <p className="text-sunshine-dark font-semibold">Every 6 to 8 weeks</p>
                  </div>
                  <p className="text-sunshine-dark/70 text-sm leading-relaxed">
                    This allows your provider to fine-tune your treatment based on real data — not
                    assumptions.
                  </p>
                </div>

                {/* Stabilization Phase */}
                <div className="bg-[#EBF5FB] rounded-2xl p-6 border border-sunshine-sky/20">
                  <h3 className="text-lg font-semibold text-sunshine-dark mb-3">
                    Stabilization Phase (6–12 Months)
                  </h3>
                  <p className="text-sunshine-dark/80 leading-relaxed mb-4">
                    Once your levels begin to stabilize and symptoms improve, testing frequency can be
                    reduced slightly.
                  </p>
                  <div className="bg-white rounded-xl px-4 py-3 mb-3 border border-sunshine-sky/30">
                    <p className="text-sm font-semibold text-sunshine-blue mb-1">
                      👉 Recommended testing:
                    </p>
                    <p className="text-sunshine-dark font-semibold">Every 3 to 4 months</p>
                  </div>
                  <p className="text-sunshine-dark/70 text-sm leading-relaxed">
                    At this stage, consistency is key. Even small hormonal shifts can impact energy,
                    mood, and overall health.
                  </p>
                </div>

                {/* Maintenance Phase */}
                <div className="bg-[#EBF5FB] rounded-2xl p-6 border border-sunshine-sky/20">
                  <h3 className="text-lg font-semibold text-sunshine-dark mb-3">
                    Maintenance Phase (Long-Term TRT)
                  </h3>
                  <p className="text-sunshine-dark/80 leading-relaxed mb-4">
                    For patients on long-term TRT with stable results:
                  </p>
                  <div className="bg-white rounded-xl px-4 py-3 mb-3 border border-sunshine-sky/30">
                    <p className="text-sm font-semibold text-sunshine-blue mb-1">
                      👉 Recommended testing:
                    </p>
                    <p className="text-sunshine-dark font-semibold">Every 6 months (minimum)</p>
                  </div>
                  <p className="text-sunshine-dark/70 text-sm leading-relaxed">
                    Some providers recommend quarterly testing for higher-risk patients. At Sunshine
                    Clinical Lab, we often advise sticking closer to the 3–4 month range for optimal
                    monitoring.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* ─ What Blood Tests Are Needed ─ */}
            <motion.div variants={itemVariants} className="mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold text-sunshine-dark mb-5">
                What Blood Tests Are Needed for TRT Monitoring?
              </h2>
              <p className="text-sunshine-dark/80 leading-relaxed text-[1.05rem] mb-4">
                Knowing what blood tests are needed for{' '}
                <Link
                  href="/trt-blood-test-pasco-county"
                  className="text-sunshine-blue hover:underline font-semibold"
                >
                  TRT monitoring
                </Link>{' '}
                is just as important as knowing when to test.
              </p>
              <p className="text-sunshine-dark/80 leading-relaxed text-[1.05rem] mb-6">
                A comprehensive TRT panel typically includes:
              </p>

              <div className="bg-[#EBF5FB] rounded-2xl p-6 border border-sunshine-sky/20 space-y-6">
                <div>
                  <p className="font-semibold text-sunshine-dark mb-3">Core Hormone Tests</p>
                  <ul className="space-y-2">
                    {['Total Testosterone', 'Free Testosterone', 'Estradiol (Estrogen)'].map(
                      (item) => (
                        <li key={item} className="flex items-center gap-2 text-sunshine-dark/80">
                          <CheckCircle className="w-4 h-4 text-sunshine-blue flex-shrink-0" />
                          {item}
                        </li>
                      )
                    )}
                  </ul>
                </div>

                <div className="border-t border-sunshine-sky/30 pt-5">
                  <p className="font-semibold text-sunshine-dark mb-3">Health &amp; Safety Markers</p>
                  <ul className="space-y-2">
                    {[
                      'Complete Blood Count (CBC)',
                      'Hematocrit & Hemoglobin',
                      'Lipid Panel (Cholesterol)',
                      'Liver Function Tests',
                    ].map((item) => (
                      <li key={item} className="flex items-center gap-2 text-sunshine-dark/80">
                        <CheckCircle className="w-4 h-4 text-sunshine-blue flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="border-t border-sunshine-sky/30 pt-5">
                  <p className="font-semibold text-sunshine-dark mb-3">Optional but Valuable</p>
                  <ul className="space-y-2">
                    {[
                      'PSA (Prostate-Specific Antigen)',
                      'SHBG (Sex Hormone Binding Globulin)',
                    ].map((item) => (
                      <li key={item} className="flex items-center gap-2 text-sunshine-dark/80">
                        <CheckCircle className="w-4 h-4 text-sunshine-sky flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <p className="text-sunshine-dark/70 text-sm mt-4 leading-relaxed">
                At{' '}
                <Link
                  href="/clinical-lab-services-trinity-fl"
                  className="text-sunshine-blue hover:underline font-semibold"
                >
                  Sunshine Clinical Lab in Trinity, FL
                </Link>
                , we provide customized TRT panels designed for accurate, fast monitoring — often
                with next-day results.
              </p>
            </motion.div>

            {/* ─ What Happens If You Skip ─ */}
            <motion.div variants={itemVariants} className="mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold text-sunshine-dark mb-5">
                What Happens If You Skip TRT Blood Work?
              </h2>
              <p className="text-sunshine-dark/80 leading-relaxed text-[1.05rem] mb-5">
                This is where things get risky.
              </p>
              <p className="text-sunshine-dark/80 leading-relaxed text-[1.05rem] mb-3">
                Skipping regular testing can lead to:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-sunshine-dark/80 text-[1.05rem] mb-5">
                <li>Elevated red blood cell count (thickened blood)</li>
                <li>Hormonal imbalances (especially estrogen spikes)</li>
                <li>Increased cardiovascular risk</li>
                <li>Ineffective treatment due to improper dosing</li>
              </ul>
              <p className="text-sunshine-dark/80 leading-relaxed text-[1.05rem] mb-5">
                One patient we worked with delayed testing for nearly a year. He felt energetic, but
                his hematocrit levels had risen significantly — something that could have been managed
                early with routine monitoring.
              </p>
              <p className="text-sunshine-dark/80 leading-relaxed text-[1.05rem] font-medium">
                TRT isn't just about feeling better today. It's about staying healthy long-term.
              </p>
            </motion.div>

            {/* ─ Where to Get TRT Blood Testing ─ */}
            <motion.div variants={itemVariants} className="mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold text-sunshine-dark mb-5">
                Where to Get TRT Blood Testing in Trinity, FL
              </h2>
              <p className="text-sunshine-dark/80 leading-relaxed text-[1.05rem] mb-5">
                If you've ever searched for "TRT blood test near me," you've likely come across large
                chain labs. While they're an option, many patients prefer a more personalized
                experience.
              </p>
              <p className="text-sunshine-dark/80 leading-relaxed text-[1.05rem] mb-3">
                <Link
                  href="/clinical-lab-services-trinity-fl"
                  className="text-sunshine-blue hover:underline font-semibold"
                >
                  Sunshine Clinical Lab
                </Link>{' '}
                offers:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-sunshine-dark/80 text-[1.05rem] mb-5">
                <li>Walk-in blood testing (no appointment needed)</li>
                <li>Fast turnaround times</li>
                <li>Affordable TRT panels</li>
                <li>
                  <Link
                    href="/mobile-blood-draw-pasco-county"
                    className="text-sunshine-blue hover:underline"
                  >
                    Mobile blood draw services
                  </Link>{' '}
                  across Pasco County
                </li>
              </ul>
              <p className="text-sunshine-dark/80 leading-relaxed text-[1.05rem]">
                Whether you're in Trinity, New Port Richey, or nearby areas, getting your blood work
                done shouldn't feel like a hassle.
              </p>
            </motion.div>

            {/* ─ Mobile Blood Draw ─ */}
            <motion.div variants={itemVariants} className="mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold text-sunshine-dark mb-5">
                Mobile Blood Draw for TRT Patients
              </h2>
              <p className="text-sunshine-dark/80 leading-relaxed text-[1.05rem] mb-4">
                One of the most convenient options we offer is{' '}
                <Link
                  href="/mobile-blood-draw-pasco-county"
                  className="text-sunshine-blue hover:underline font-semibold"
                >
                  mobile blood draw services
                </Link>
                .
              </p>
              <p className="text-sunshine-dark/80 leading-relaxed text-[1.05rem] mb-3">
                Instead of visiting a lab, a trained phlebotomist comes to your home or office. This
                is especially helpful for:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-sunshine-dark/80 text-[1.05rem] mb-5">
                <li>Busy professionals</li>
                <li>Patients on strict schedules</li>
                <li>Those who prefer privacy</li>
              </ul>
              <p className="text-sunshine-dark/80 leading-relaxed text-[1.05rem]">
                It's a simple shift — but one that significantly improves consistency in TRT
                monitoring.
              </p>
            </motion.div>

            {/* ─ Signs You May Need More Frequent Testing ─ */}
            <motion.div variants={itemVariants} className="mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold text-sunshine-dark mb-5">
                Signs You May Need More Frequent Testing
              </h2>
              <p className="text-sunshine-dark/80 leading-relaxed text-[1.05rem] mb-3">
                Even if you're on a standard schedule, certain symptoms suggest it's time for
                additional blood work:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-sunshine-dark/80 text-[1.05rem] mb-5">
                <li>Sudden fatigue or low energy</li>
                <li>Mood swings or irritability</li>
                <li>Water retention or bloating</li>
                <li>Decreased libido</li>
                <li>Unusual weight changes</li>
              </ul>
              <p className="text-sunshine-dark/80 leading-relaxed text-[1.05rem] mb-4">
                These aren't always obvious signs of imbalance, but they're worth investigating.
              </p>
              <p className="text-sunshine-dark/80 leading-relaxed text-[1.05rem] font-medium italic">
                At Sunshine Clinical Lab, we often encourage patients: If something feels off, test —
                don't guess.
              </p>
            </motion.div>

            {/* ─ Q&A ─ */}
            <motion.div variants={itemVariants} className="mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold text-sunshine-dark mb-6">
                Short Answer Q&amp;A
              </h2>
              <div className="space-y-4">
                {qaItems.map(({ q, a }, idx) => (
                  <div
                    key={idx}
                    className="bg-[#EBF5FB] rounded-2xl p-5 border border-sunshine-sky/20"
                  >
                    <p className="font-semibold text-sunshine-dark mb-2">Q: {q}</p>
                    <p className="text-sunshine-dark/75 leading-relaxed">{a}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* ─ Final Thoughts ─ */}
            <motion.div variants={itemVariants} className="mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold text-sunshine-dark mb-5">
                Final Thoughts
              </h2>
              <p className="text-sunshine-dark/80 leading-relaxed text-[1.05rem] mb-4">
                TRT can be life-changing, but only when managed correctly.
              </p>
              <p className="text-sunshine-dark/80 leading-relaxed text-[1.05rem] mb-4">
                Routine blood work isn't just a recommendation. It's the backbone of safe, effective
                therapy. Whether you're just starting out or have been on TRT for years, staying
                consistent with testing ensures you're not just improving how you feel, but protecting
                your long-term health.
              </p>
              <p className="text-sunshine-dark/80 leading-relaxed text-[1.05rem] mb-4">
                If you're in Trinity, FL or anywhere in Pasco County and need reliable, fast{' '}
                <Link
                  href="/trt-blood-test-pasco-county"
                  className="text-sunshine-blue hover:underline font-semibold"
                >
                  TRT monitoring
                </Link>
                , Sunshine Clinical Lab is built for exactly that purpose.
              </p>
              <p className="text-sunshine-dark/80 leading-relaxed text-[1.05rem] font-medium italic">
                Because when it comes to your health, precision matters.
              </p>
            </motion.div>

            {/* ─ CTA ─ */}
            <motion.div
              variants={itemVariants}
              className="bg-gradient-to-r from-sunshine-sky to-sunshine-blue rounded-3xl p-8 sm:p-10 text-center text-white relative overflow-hidden"
            >
              <span className="pointer-events-none absolute -top-8 -right-8 w-40 h-40 rounded-full bg-white/10" />
              <span className="pointer-events-none absolute -bottom-6 -left-6 w-32 h-32 rounded-full bg-white/10" />
              <h3 className="text-2xl sm:text-3xl font-bold mb-3 relative">
                Need TRT Blood Testing?
              </h3>
              <p className="text-white/85 mb-7 relative">
                Walk in or request a mobile blood draw — fast results, no appointment needed.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center relative">
                <a
                  href="tel:+17272335223"
                  className="inline-flex items-center justify-center gap-2 bg-white text-sunshine-blue font-semibold px-7 py-3.5 rounded-full shadow hover:shadow-md hover:bg-sunshine-light transition-all duration-200"
                >
                  <Phone className="w-4 h-4" />
                  Call (727) 233-5223
                </a>
                <Link
                  href="/mobile-blood-draw-pasco-county"
                  className="inline-flex items-center justify-center gap-2 border-2 border-white text-white font-semibold px-7 py-3.5 rounded-full hover:bg-white/10 transition-all duration-200"
                >
                  Mobile Blood Draw
                </Link>
              </div>
            </motion.div>

            {/* Back link */}
            <motion.div
              variants={itemVariants}
              className="mt-10 pt-8 border-t border-sunshine-sky/30"
            >
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-sunshine-blue hover:text-sunshine-blue/80 font-medium transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to All Articles
              </Link>
            </motion.div>
          </motion.article>
        </div>
      </div>
    </div>
  );
}
