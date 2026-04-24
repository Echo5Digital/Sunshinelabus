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
    q: 'Is mobile blood draw safe?',
    a: 'Yes. When performed by trained professionals like those at Sunshine Clinical Lab, it follows the same safety standards as in-lab testing.',
  },
  {
    q: 'Is mobile blood draw accurate?',
    a: 'Yes. Accuracy depends on proper collection and lab analysis — not location.',
  },
  {
    q: 'How does mobile blood draw work?',
    a: 'A certified phlebotomist comes to your location, collects the sample, and sends it to the lab for testing.',
  },
  {
    q: 'Who should use mobile blood draw services?',
    a: 'Anyone seeking convenience, especially busy individuals, seniors, or patients needing frequent testing.',
  },
  {
    q: 'Where can I find a mobile phlebotomy near me in Pasco County?',
    a: 'Sunshine Clinical Lab offers trusted mobile blood draw services throughout Trinity and surrounding areas.',
  },
];

export default function BlogPostMBD() {
  return (
    <div className="bg-white min-h-screen">

      {/* ── Single Hero Banner ── */}
      <div className="relative pt-36 pb-20 sm:pb-28 bg-[#EBF5FB] overflow-hidden">
        {/* Background image at low opacity */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/mbd-faq.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-20"
          />
        </div>

        {/* Subtle gradient overlay */}
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
              Mobile Blood Draw
            </span>
            <span className="flex items-center gap-1.5 text-xs text-sunshine-dark/60">
              <CalendarDays className="w-3.5 h-3.5" />
              April 24, 2025
            </span>
          </div>

          {/* H1 */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-sunshine-dark leading-tight mb-6 max-w-3xl">
            Is Mobile Blood Draw Safe and Accurate?
          </h1>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-5 text-sm text-sunshine-dark/60">
            <span className="flex items-center gap-2">
              <User className="w-4 h-4 text-sunshine-blue" />
              Sunshine Clinical Lab
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-sunshine-blue" />
              6 min read
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
                The idea of getting your blood drawn at home used to sound unusual — almost
                experimental. Today, it's quickly becoming one of the most requested services in
                modern healthcare. But naturally, patients still ask a critical question:
              </p>
              <p className="text-sunshine-dark font-semibold text-[1.1rem] border-l-4 border-sunshine-blue pl-4">
                Is mobile blood draw actually safe and accurate?
              </p>
              <p className="text-sunshine-dark/80 leading-relaxed text-[1.05rem]">
                At{' '}
                <Link
                  href="/clinical-lab-services-trinity-fl"
                  className="text-sunshine-blue hover:underline font-semibold"
                >
                  Sunshine Clinical Lab
                </Link>
                , serving Trinity, FL and the greater Pasco County area, this is something we hear
                almost daily. And it's a fair concern. When you're dealing with medical testing,
                convenience should never come at the cost of reliability.
              </p>
              <p className="text-sunshine-dark/80 leading-relaxed text-[1.05rem]">
                The short answer? Yes, mobile blood draw is both safe and accurate. But the real
                answer is a bit more nuanced, and worth understanding.
              </p>
            </motion.div>

            {/* ─ What Is Mobile Blood Draw ─ */}
            <motion.div variants={itemVariants} className="mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold text-sunshine-dark mb-5">
                What Is Mobile Blood Draw and How Does It Work?
              </h2>
              <p className="text-sunshine-dark/80 leading-relaxed text-[1.05rem] mb-4">
                Before diving into safety and accuracy, it helps to understand how{' '}
                <Link
                  href="/mobile-blood-draw-pasco-county"
                  className="text-sunshine-blue hover:underline font-semibold"
                >
                  mobile blood draw
                </Link>{' '}
                works.
              </p>
              <p className="text-sunshine-dark/80 leading-relaxed text-[1.05rem] mb-5">
                Mobile blood draw — also known as mobile phlebotomy — is a service where a trained
                phlebotomist travels to your home, office, or preferred location to collect your
                blood sample.
              </p>
              <p className="text-sunshine-dark/80 leading-relaxed text-[1.05rem] mb-4">
                At Sunshine Clinical Lab, the process is straightforward:
              </p>

              <div className="bg-[#EBF5FB] rounded-2xl p-6 border border-sunshine-sky/20 mb-5">
                <ol className="space-y-3">
                  {[
                    'Schedule an appointment (or request same-day service when available)',
                    'A certified phlebotomist arrives at your location',
                    'Blood is drawn using sterile, professional-grade equipment',
                    'Samples are transported securely to the lab for analysis',
                  ].map((step, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sunshine-dark/80">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-sunshine-blue text-white text-xs font-bold flex items-center justify-center mt-0.5">
                        {idx + 1}
                      </span>
                      {step}
                    </li>
                  ))}
                </ol>
              </div>

              <p className="text-sunshine-dark/80 leading-relaxed text-[1.05rem]">
                From a technical standpoint, the procedure is identical to what happens inside a
                clinical lab setting. The only difference is the environment.
              </p>
            </motion.div>

            {/* ─ Is Mobile Blood Draw Safe? ─ */}
            <motion.div variants={itemVariants} className="mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold text-sunshine-dark mb-5">
                Is Mobile Blood Draw Safe?
              </h2>
              <p className="text-sunshine-dark/80 leading-relaxed text-[1.05rem] mb-5">
                Safety is the first concern most patients raise — and rightly so.
              </p>
              <p className="text-sunshine-dark/80 leading-relaxed text-[1.05rem] mb-3">
                The safety of mobile blood draw depends on three factors:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-sunshine-dark/80 text-[1.05rem] mb-5">
                <li>Training of the phlebotomist</li>
                <li>Sterility of equipment</li>
                <li>Handling and transport of samples</li>
              </ul>
              <p className="text-sunshine-dark/80 leading-relaxed text-[1.05rem] mb-6">
                At Sunshine Clinical Lab in Pasco County, all mobile blood draws are performed by
                experienced professionals with extensive phlebotomy training. The same standards
                applied inside a lab are followed in the field.
              </p>

              <div className="bg-[#EBF5FB] rounded-2xl p-6 border border-sunshine-sky/20 mb-5">
                <p className="font-semibold text-sunshine-dark mb-4">Key Safety Measures Include:</p>
                <ul className="space-y-3">
                  {[
                    'Single-use, sterile needles and collection tools',
                    'Proper sanitization before and after each procedure',
                    'Secure labeling and handling of samples',
                    'Temperature-controlled transport to maintain sample integrity',
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sunshine-dark/80">
                      <CheckCircle className="w-4 h-4 text-sunshine-blue flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <p className="text-sunshine-dark/80 leading-relaxed text-[1.05rem] mb-4">
                In practice, there is no compromise in safety when these protocols are followed.
              </p>
              <p className="text-sunshine-dark/80 leading-relaxed text-[1.05rem]">
                In fact, for certain individuals — such as seniors or immunocompromised patients —
                mobile blood draw can actually be safer than visiting a crowded lab.
              </p>
            </motion.div>

            {/* ─ Is Mobile Blood Draw Accurate? ─ */}
            <motion.div variants={itemVariants} className="mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold text-sunshine-dark mb-5">
                Is Mobile Blood Draw Accurate?
              </h2>
              <p className="text-sunshine-dark/80 leading-relaxed text-[1.05rem] mb-4">
                Accuracy is where skepticism tends to linger. Patients often wonder whether a sample
                collected outside a lab environment can deliver the same reliable results.
              </p>
              <p className="text-sunshine-dark font-semibold text-[1.05rem] mb-4 border-l-4 border-sunshine-blue pl-4">
                The answer is yes — accuracy is not determined by location, but by process.
              </p>
              <p className="text-sunshine-dark/80 leading-relaxed text-[1.05rem] mb-5">
                Once blood is collected, it is analyzed using the same laboratory equipment and
                procedures as any in-clinic sample. As long as the sample is collected properly and
                transported correctly, results remain consistent.
              </p>
              <p className="text-sunshine-dark/80 leading-relaxed text-[1.05rem] mb-4">
                At Sunshine Clinical Lab, we ensure:
              </p>

              <div className="bg-[#EBF5FB] rounded-2xl p-6 border border-sunshine-sky/20 mb-5">
                <ul className="space-y-3">
                  {[
                    'Proper venipuncture techniques to avoid sample contamination',
                    'Immediate and correct labeling',
                    'Fast transport to reduce degradation',
                    'Processing within optimal time frames',
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sunshine-dark/80">
                      <CheckCircle className="w-4 h-4 text-sunshine-blue flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <p className="text-sunshine-dark/80 leading-relaxed text-[1.05rem]">
                Anecdotally, we've seen patients switch from large chain labs to our{' '}
                <Link
                  href="/mobile-blood-draw-pasco-county"
                  className="text-sunshine-blue hover:underline font-semibold"
                >
                  mobile blood draw service
                </Link>{' '}
                and report faster turnaround times without any difference in result accuracy.
              </p>
            </motion.div>

            {/* ─ Common Misconceptions ─ */}
            <motion.div variants={itemVariants} className="mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold text-sunshine-dark mb-5">
                Common Misconceptions About Mobile Phlebotomy
              </h2>
              <p className="text-sunshine-dark/80 leading-relaxed text-[1.05rem] mb-6">
                Despite its growing popularity, a few misconceptions still persist.
              </p>

              <div className="space-y-5">
                {/* Myth 1 */}
                <div className="bg-[#EBF5FB] rounded-2xl p-6 border border-sunshine-sky/20">
                  <p className="font-semibold text-sunshine-dark mb-2">
                    "It's less sterile than a lab"
                  </p>
                  <p className="text-sunshine-dark/80 leading-relaxed">
                    Not true. Sterility depends on procedure, not location. Mobile phlebotomists
                    carry controlled, sterile kits designed for safe field use.
                  </p>
                </div>

                {/* Myth 2 */}
                <div className="bg-[#EBF5FB] rounded-2xl p-6 border border-sunshine-sky/20">
                  <p className="font-semibold text-sunshine-dark mb-2">
                    "Results might be less reliable"
                  </p>
                  <p className="text-sunshine-dark/80 leading-relaxed">
                    Again, inaccurate. The testing happens in the lab, not at your home. The analysis
                    remains unchanged.
                  </p>
                </div>

                {/* Myth 3 */}
                <div className="bg-[#EBF5FB] rounded-2xl p-6 border border-sunshine-sky/20">
                  <p className="font-semibold text-sunshine-dark mb-3">
                    "It's only for special cases"
                  </p>
                  <p className="text-sunshine-dark/80 leading-relaxed mb-3">
                    While mobile blood draw is ideal for seniors and homebound patients, it's
                    increasingly used by:
                  </p>
                  <ul className="list-disc pl-6 space-y-1.5 text-sunshine-dark/80 mb-3">
                    <li>Busy professionals</li>
                    <li>Parents with tight schedules</li>
                    <li>Patients who prefer privacy</li>
                  </ul>
                  <p className="text-sunshine-dark/80 leading-relaxed">
                    Convenience is driving adoption, not necessity alone.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* ─ Who Should Consider Mobile Blood Draw? ─ */}
            <motion.div variants={itemVariants} className="mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold text-sunshine-dark mb-5">
                Who Should Consider Mobile Blood Draw?
              </h2>
              <p className="text-sunshine-dark/80 leading-relaxed text-[1.05rem] mb-5">
                Mobile blood draw isn't just a luxury — it's a practical solution for many
                situations.
              </p>
              <p className="text-sunshine-dark/80 leading-relaxed text-[1.05rem] mb-3">
                At Sunshine Clinical Lab in Trinity, FL, we often recommend it for:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-sunshine-dark/80 text-[1.05rem] mb-5">
                <li>
                  Patients on regular monitoring (such as{' '}
                  <Link
                    href="/trt-blood-test-pasco-county"
                    className="text-sunshine-blue hover:underline"
                  >
                    TRT
                  </Link>
                  )
                </li>
                <li>Individuals with mobility challenges</li>
                <li>Professionals with limited time</li>
                <li>Families needing multiple tests at once</li>
              </ul>
              <p className="text-sunshine-dark/80 leading-relaxed text-[1.05rem] mb-4">
                One patient, a business owner in New Port Richey, shared how mobile testing saved him
                hours each month. Instead of waiting at a lab, he schedules early morning draws at
                his office and gets back to work immediately.
              </p>
              <p className="text-sunshine-dark/80 leading-relaxed text-[1.05rem]">
                It's a small shift — but it changes the experience entirely.
              </p>
            </motion.div>

            {/* ─ Mobile Blood Draw in Pasco County ─ */}
            <motion.div variants={itemVariants} className="mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold text-sunshine-dark mb-5">
                Mobile Blood Draw in Pasco County: A Growing Demand
              </h2>
              <p className="text-sunshine-dark/80 leading-relaxed text-[1.05rem] mb-4">
                Search trends show a clear increase in queries like:
              </p>
              <div className="bg-[#EBF5FB] rounded-xl px-5 py-4 border border-sunshine-sky/20 mb-5 space-y-2">
                {['"mobile blood draw Pasco County"', '"mobile phlebotomy near me"'].map((term) => (
                  <p key={term} className="text-sunshine-blue font-medium text-sm">
                    🔍 {term}
                  </p>
                ))}
              </div>
              <p className="text-sunshine-dark/80 leading-relaxed text-[1.05rem] mb-4">
                This reflects a broader shift in healthcare expectations. Patients are no longer
                satisfied with long wait times and rigid scheduling.
              </p>
              <p className="text-sunshine-dark/80 leading-relaxed text-[1.05rem] mb-3">
                They want:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-sunshine-dark/80 text-[1.05rem] mb-5">
                <li>Speed</li>
                <li>Convenience</li>
                <li>Personalization</li>
              </ul>
              <p className="text-sunshine-dark/80 leading-relaxed text-[1.05rem]">
                Sunshine Clinical Lab has adapted to this shift by offering reliable{' '}
                <Link
                  href="/mobile-blood-draw-pasco-county"
                  className="text-sunshine-blue hover:underline font-semibold"
                >
                  mobile services across Pasco County
                </Link>
                , including Trinity, New Port Richey, and Land O' Lakes.
              </p>
            </motion.div>

            {/* ─ Are There Any Limitations? ─ */}
            <motion.div variants={itemVariants} className="mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold text-sunshine-dark mb-5">
                Are There Any Limitations?
              </h2>
              <p className="text-sunshine-dark/80 leading-relaxed text-[1.05rem] mb-4">
                While mobile blood draw is highly effective, it's not without minor limitations.
              </p>
              <ul className="list-disc pl-6 space-y-2 text-sunshine-dark/80 text-[1.05rem] mb-5">
                <li>Certain specialized tests may still require in-lab collection</li>
                <li>Immediate processing needs (rare cases) might favor on-site labs</li>
                <li>Availability depends on scheduling and location</li>
              </ul>
              <p className="text-sunshine-dark/80 leading-relaxed text-[1.05rem]">
                However, for the vast majority of routine and advanced blood tests, mobile services
                are fully sufficient.
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
                Healthcare is evolving — and mobile blood draw is a clear example of that evolution
                done right.
              </p>
              <p className="text-sunshine-dark/80 leading-relaxed text-[1.05rem] mb-4">
                It combines clinical precision with real-world convenience, without compromising
                safety or accuracy. For patients in Pasco County, especially those balancing work,
                family, and health, it offers a smarter way to stay on top of routine testing.
              </p>
              <p className="text-sunshine-dark/80 leading-relaxed text-[1.05rem] mb-4">
                At Sunshine Clinical Lab, the goal is simple: make high-quality lab services more
                accessible without cutting corners.
              </p>
              <p className="text-sunshine-dark/80 leading-relaxed text-[1.05rem] font-medium italic">
                Because in the end, accuracy matters. But so does your time.
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
                Need Mobile Blood Draw in Pasco County?
              </h3>
              <p className="text-white/85 mb-7 relative">
                A certified phlebotomist comes to you — no waiting rooms, no hassle.
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
                  Learn More
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
