import Image from 'next/image';
import Link from 'next/link';
import {
  Phone,
  Heart,
  Award,
  Users,
  FlaskConical,
  Truck,
  Zap,
  CheckCircle,
  ArrowRight,
  Star,
  MapPin,
  Clock,
} from 'lucide-react';
import { ShimmerButton } from '@/registry/magicui/shimmer-button';
import MagicCard from '@/components/ui/MagicCard';

export const metadata = {
  title: 'About Sunshine Clinical Lab | Mobile Blood Draw Pasco County & Trinity FL',
  description:
    'Learn about Sunshine Clinical Lab, a trusted provider of mobile blood draw and home phlebotomy services in Pasco County, Trinity, and New Port Richey.',
  keywords: [
    'mobile blood draw Pasco County',
    'home phlebotomy services',
    'mobile blood draw Trinity FL',
    'blood draw at home',
    'mobile lab services',
  ],
};

const coreValues = [
  {
    Icon: Zap,
    title: 'Speed & Accuracy',
    desc: 'Fast turnaround without compromising precision. Most results available next business day.',
  },
  {
    Icon: Truck,
    title: 'Mobile Blood Draw',
    desc: 'We bring professional blood draw services to your home, office, or care facility across Pasco County.',
  },
  {
    Icon: Heart,
    title: 'Patient-First Care',
    desc: 'Every patient receives personalized, compassionate attention from our certified phlebotomists.',
  },
  {
    Icon: FlaskConical,
    title: 'Lab Excellence',
    desc: 'State-of-the-art equipment and strict chain-of-custody protocols ensure reliable results every time.',
  },
  {
    Icon: Users,
    title: 'Community Focused',
    desc: "Locally owned and operated in Trinity, FL — we're your neighbors and we care about this community.",
  },
  {
    Icon: Award,
    title: 'Trusted Expertise',
    desc: '35+ years of combined experience serving hospitals, nursing facilities, and individual patients.',
  },
];

const mobileDrawItems = [
  'In-home blood draws for elderly or homebound patients',
  'Office visits for busy professionals',
  'Assisted living & care facility draws throughout Pasco County',
  'Same-day scheduling available — call to confirm',
  'Blood draw at home — no travel required',
  'Serving Trinity, New Port Richey & all of Pasco County',
];

const stats = [
  { value: '35+', label: 'Years of Experience' },
  { value: '5★', label: 'Patient Satisfaction' },
  { value: '10+', label: 'Cities Served' },
  { value: '24h', label: 'Fast Results' },
];

export default function AboutPage() {
  return (
    <div className="bg-white">

      {/* ── Banner ─────────────────────────────────────────────────────────────── */}
      <section className="relative w-full h-[90vh] overflow-hidden bg-sunshine-dark">
        <Image
          src="/abt-bnr.jpeg"
          alt="About Sunshine Clinical Lab — Mobile Blood Draw Pasco County FL"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/45 to-black/70" />

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold text-white tracking-tight leading-tight drop-shadow-lg mb-4">
            About <span className="text-sunshine-sky">Us</span>
          </h1>
          <div className="w-12 h-0.5 bg-sunshine-sky mx-auto mb-5 rounded-full opacity-80" />
          <p className="text-white/70 text-sm sm:text-base lg:text-lg max-w-lg mx-auto leading-relaxed font-light tracking-wide">
            Discover our legacy of precision healthcare solutions.
          </p>
        </div>

        {/* Wave divider → Who We Are */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none" aria-hidden="true">
          <svg viewBox="0 0 1440 72" preserveAspectRatio="none" className="w-full h-16 sm:h-20" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,36 C240,72 480,0 720,36 C960,72 1200,0 1440,36 L1440,72 L0,72 Z" fill="#ffffff" />
          </svg>
        </div>
      </section>

      {/* ── Who We Are ─────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden py-20 pb-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-sunshine-blue text-xs font-bold uppercase tracking-widest mb-3 block">
              Our Story
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-sunshine-dark mb-4">
              Who We Are
            </h2>
            <div className="w-16 h-1 bg-sunshine-blue mx-auto rounded-full" />
          </div>

          {/* Text */}
          <div className="max-w-3xl mx-auto text-center mb-12">
            <p className="text-gray-600 leading-relaxed text-lg mb-6">
              <strong className="text-sunshine-blue font-semibold">Sunshine Clinical Lab LLC</strong>{' '}
              is where expertise and dedication intertwine in the realm of healthcare. With a rich
              history spanning over 35 years, we&apos;ve proudly served communities across the
              vibrant landscapes of Texas, New York, and New Jersey — serving a diverse clientele
              including hospitals, rehabilitation facilities, adult homes, long-term care services,
              skilled nursing facilities, and doctors&apos; offices.
            </p>
            <p className="text-gray-600 leading-relaxed text-lg">
              Since our inception, we&apos;ve remained steadfast in our commitment to excellence,
              consistently delivering precise and reliable laboratory services. As pioneers in our
              field, we continue to push boundaries, leveraging our extensive experience to shape
              the future of{' '}
              <strong className="text-sunshine-dark">medical diagnostics</strong>.
            </p>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {stats.map(({ value, label }) => (
              <MagicCard
                key={label}
                gradientColor="#CCE9F7C0"
                borderGlowColor="#2B7DBF"
                gradientSize={300}
                className="shadow-sm hover:shadow-xl transition-shadow"
              >
                <div className="p-7 text-center">
                  <p className="text-4xl font-extrabold text-sunshine-blue mb-1">{value}</p>
                  <p className="text-sunshine-dark/70 text-sm font-semibold">{label}</p>
                </div>
              </MagicCard>
            ))}
          </div>
        </div>

        {/* Wave divider → Mission & Vision */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none" aria-hidden="true">
          <svg viewBox="0 0 1440 72" preserveAspectRatio="none" className="w-full h-16 sm:h-20" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,36 C240,72 480,0 720,36 C960,72 1200,0 1440,36 L1440,72 L0,72 Z" fill="#EBF5FB" />
          </svg>
        </div>
      </section>

      {/* ── Mission & Vision ───────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden py-20 pb-24 bg-[#EBF5FB]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-sunshine-blue text-xs font-bold uppercase tracking-widest mb-3 block">
              Our Purpose
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-sunshine-dark">
              Mission &amp; Vision
            </h2>
            <div className="w-16 h-1 bg-sunshine-blue mx-auto rounded-full mt-4" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Mission */}
            <MagicCard
              gradientColor="#CCE9F7C0"
              borderGlowColor="#2B7DBF"
              gradientSize={350}
              className="shadow-md hover:shadow-2xl transition-all duration-300 group"
            >
              <div className="p-8">
                <div className="w-14 h-14 rounded-2xl bg-sunshine-blue flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Heart className="w-7 h-7 text-white" aria-hidden="true" />
                </div>
                <h3 className="text-xl font-bold text-sunshine-dark mb-4">Our Mission</h3>
                <p className="text-gray-600 leading-relaxed">
                  Our mission is to provide innovative, timely, and quality medical laboratory
                  services that exceed the expectations of those we serve. Our commitment to
                  excellence drives us to continuously improve our processes, ensuring accuracy,
                  reliability, and efficiency in every test we perform.
                </p>
              </div>
            </MagicCard>

            {/* Vision */}
            <MagicCard
              gradientColor="#CCE9F7C0"
              borderGlowColor="#2B7DBF"
              gradientSize={350}
              className="shadow-md hover:shadow-2xl transition-all duration-300 group"
            >
              <div className="p-8">
                <div className="w-14 h-14 rounded-2xl bg-sunshine-sky flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Star className="w-7 h-7 text-white" aria-hidden="true" />
                </div>
                <h3 className="text-xl font-bold text-sunshine-dark mb-4">Our Vision</h3>
                <p className="text-gray-600 leading-relaxed">
                  We envision ourselves as a reliable ally in health and lifestyle empowerment,
                  harnessing the power of laboratory expertise to transform lives. Our goal is to
                  set new standards in healthcare by providing unparalleled access to advanced
                  diagnostic technologies and insights.
                </p>
              </div>
            </MagicCard>
          </div>
        </div>

        {/* Wave divider → Core Values */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none" aria-hidden="true">
          <svg viewBox="0 0 1440 72" preserveAspectRatio="none" className="w-full h-16 sm:h-20" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,36 C240,72 480,0 720,36 C960,72 1200,0 1440,36 L1440,72 L0,72 Z" fill="#ffffff" />
          </svg>
        </div>
      </section>

      {/* ── Core Values ───────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden py-20 pb-24 sm:pb-28 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-sunshine-blue text-xs font-bold uppercase tracking-widest mb-3 block">
              What Drives Us
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-sunshine-dark mb-4">
              Our Core Values
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed font-medium">
              Everything we do is driven by a commitment to{' '}
              <span className="text-sunshine-blue font-semibold">quality, compassion, and convenience</span>,
              delivering innovative laboratory services that support a safer, healthier community—especially
              for those who depend on our{' '}
              <span className="text-sunshine-dark font-semibold">mobile blood draw services</span>.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {coreValues.map(({ Icon, title, desc }) => (
              <MagicCard
                key={title}
                gradientColor="#CCE9F7C0"
                borderGlowColor="#2B7DBF"
                gradientSize={280}
                className="hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
              >
                <div className="p-6">
                  <div className="w-12 h-12 rounded-xl bg-sunshine-blue flex items-center justify-center mb-4 shadow-sm group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-6 h-6 text-white" aria-hidden="true" />
                  </div>
                  <h3 className="text-lg font-bold text-sunshine-dark mb-2">{title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{desc}</p>
                </div>
              </MagicCard>
            ))}
          </div>
        </div>

        {/* Wave divider → Mobile CTA */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none" aria-hidden="true">
          <svg viewBox="0 0 1440 72" preserveAspectRatio="none" className="w-full h-16 sm:h-20" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,36 C240,72 480,0 720,36 C960,72 1200,0 1440,36 L1440,72 L0,72 Z" fill="#2B7DBF" />
          </svg>
        </div>
      </section>

      {/* ── Mobile Blood Draw CTA ─────────────────────────────────────────────── */}
      <section className="py-20 bg-gradient-to-r from-sunshine-blue to-sunshine-sky relative overflow-hidden">
        {/* Decorative circles */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
          <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full border border-white/10" />
          <div className="absolute -bottom-16 -left-16 w-72 h-72 rounded-full border border-white/10" />
          <div className="absolute top-1/2 left-1/4 w-40 h-40 rounded-full bg-white/[0.04]" />
          <div className="absolute top-1/4 right-1/3 w-24 h-24 rounded-full bg-white/[0.06]" />
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-flex items-center gap-2 bg-white/20 border border-white/30 text-white px-4 py-1.5 rounded-full text-sm font-semibold mb-6">
            Mobile Blood Draw · Pasco County &amp; Trinity FL
          </span>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-5">
            Can&apos;t Make It to the Lab?
            <br />
            <span className="text-[#93C5FD]">We Come to You.</span>
          </h2>

          <p className="text-white/80 text-lg leading-relaxed mb-8 max-w-2xl mx-auto">
            Our mobile blood draw service brings professional phlebotomy directly to your home,
            office, or care facility throughout Pasco County, Trinity, and New Port Richey, FL.
          </p>

          <ul
            className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-2xl mx-auto mb-10 text-left"
            aria-label="Mobile blood draw services"
          >
            {mobileDrawItems.map((item) => (
              <li
                key={item}
                className="flex items-center gap-3 bg-white/15 backdrop-blur-sm rounded-xl px-4 py-3 text-white text-sm font-medium"
              >
                <CheckCircle className="w-5 h-5 text-[#93C5FD] flex-shrink-0" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>

          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
            <a href="tel:7272335223" aria-label="Call Sunshine Clinical Lab">
              <ShimmerButton className="bg-white text-sunshine-dark px-9 py-4 rounded-full font-bold shadow-2xl text-lg gap-2">
                <Phone className="w-6 h-6" aria-hidden="true" />
                Call Now: (727) 233-5223
              </ShimmerButton>
            </a>
            <Link href="/book-appointment" aria-label="Book an appointment online">
              <ShimmerButton className="bg-white/20 backdrop-blur-sm border-2 border-white text-white px-9 py-4 rounded-full font-semibold text-lg gap-2">
                <ArrowRight className="w-5 h-5" aria-hidden="true" />
                Book Appointment
              </ShimmerButton>
            </Link>
          </div>

          {/* Address & hours */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-white/75 text-sm">
            <a
              href="https://maps.google.com/?q=3600+Galileo+Dr+Suite+104+New+Port+Richey+FL+34655"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-white transition-colors"
              aria-label="Get directions to Sunshine Clinical Lab"
            >
              <MapPin className="w-5 h-5 text-white flex-shrink-0" aria-hidden="true" />
              3600 Galileo Dr, Suite 104, New Port Richey, FL 34655
            </a>
            <span className="hidden sm:block text-white/30" aria-hidden="true">|</span>
            <span className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-white flex-shrink-0" aria-hidden="true" />
              Mon–Fri 8:00am–5:00pm · Walk-Ins Welcome
            </span>
          </div>
        </div>
      </section>

    </div>
  );
}
