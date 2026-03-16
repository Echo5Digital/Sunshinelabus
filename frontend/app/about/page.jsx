import { Phone } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'About Us | Sunshine Clinical Laboratory',
  description:
    'Learn about Sunshine Clinical Lab LLC — our 35-year legacy, mission, vision, and commitment to quality diagnostic services across Texas, New York, and New Jersey.',
};

export default function AboutPage() {
  return (
    <div className="pt-16">

      {/* Banner */}
      <section className="bg-gradient-to-br from-sunshine-blue to-sunshine-dark py-20 text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="inline-block bg-white/15 text-white text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
            About Us
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 leading-snug">
            Precision. Trust. Care.
          </h1>
          <p className="text-sunshine-sky text-lg">
            Over 35 years of trusted diagnostic excellence across Texas, New York, and New Jersey.
          </p>
        </div>
      </section>

      {/* Who We Are */}
      <section className="bg-white pt-12 pb-10 sm:pt-16 sm:pb-14">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-sunshine-dark mb-6 text-center">
            Discover our legacy of precision healthcare solutions.
          </h2>
          <h3 className="text-xl sm:text-2xl font-bold text-sunshine-dark mb-4">Who We Are</h3>
          <p className="text-sunshine-dark/80 leading-relaxed text-sm sm:text-base">
            <strong className="text-sunshine-blue font-semibold">Sunshine Clinical Lab LLC</strong>{' '}
            is where expertise and dedication intertwine in the realm of healthcare. With a rich
            history spanning over 35 years, we&apos;ve proudly served communities across the vibrant
            landscapes of Texas, New York, and New Jersey. Serving a diverse clientele, including
            hospitals, rehabilitation facilities, adult homes, long-term care services, skilled
            nursing facilities, and doctors&apos; offices, we&apos;re dedicated to delivering precise and
            reliable laboratory services tailored to your needs. Since our inception, we&apos;ve
            remained steadfast in our commitment to excellence, consistently delivering precise and
            reliable laboratory services. As pioneers in our field, we continue to push boundaries,
            leveraging our extensive experience to shape the future of medical diagnostics.
          </p>
        </div>
      </section>

      {/* Mission & Vision Cards */}
      <section id="mission" className="bg-white pb-12 sm:pb-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Mission Card */}
            <div className="rounded-3xl border border-sunshine-sky/40 bg-white p-6 sm:p-8 shadow-md hover:shadow-lg transition-shadow duration-200">
              <h2 className="text-lg sm:text-xl font-bold text-sunshine-dark mb-4">
                Our Mission Statement
              </h2>
              <p className="text-sunshine-dark/70 leading-relaxed text-sm sm:text-base">
                Our mission is to provide innovative, timely, and quality medical laboratory
                services that exceed the expectations of those we serve. Our commitment to
                excellence drives us to continuously improve our processes, ensuring accuracy,
                reliability, and efficiency in every test we perform.
              </p>
            </div>

            {/* Vision Card */}
            <div className="rounded-3xl border border-sunshine-sky/40 bg-white p-6 sm:p-8 shadow-md hover:shadow-lg transition-shadow duration-200">
              <h2 className="text-lg sm:text-xl font-bold text-sunshine-dark mb-4">
                Our Vision Statement
              </h2>
              <p className="text-sunshine-dark/70 leading-relaxed text-sm sm:text-base">
                We envision ourselves as a reliable ally in health and lifestyle empowerment,
                harnessing the power of laboratory expertise to transform lives. Our goal is to
                set new standards in healthcare by providing unparalleled access to advanced
                diagnostic technologies and insights.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Our Core Value */}
      <section className="bg-white pb-10 sm:pb-14 border-t border-sunshine-sky/20 pt-10 sm:pt-14">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl sm:text-2xl font-bold text-sunshine-dark mb-4">Our Core Value</h2>
          <p className="text-sunshine-dark/80 leading-relaxed text-sm sm:text-base">
            We contribute to a safer and healthier community by providing our customers with
            innovative and high-quality laboratory service.
          </p>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="bg-white pb-0">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-0">
          <div className="flex items-start sm:items-center gap-4 rounded-2xl border border-sunshine-sky/30 bg-sunshine-light px-5 sm:px-7 py-5 shadow-sm">
            <div className="flex-shrink-0 w-11 h-11 rounded-full bg-sunshine-dark flex items-center justify-center">
              <Phone className="w-5 h-5 text-white" />
            </div>
            <p className="text-sunshine-dark/80 leading-relaxed text-sm sm:text-base">
              Ready to partner with a trusted name in precision diagnostics?{' '}
              <Link
                href="/contact"
                className="font-bold text-sunshine-dark underline hover:text-sunshine-blue transition-colors"
              >
                Reach out
              </Link>{' '}
              today to learn how our cutting-edge laboratory services can elevate your healthcare
              journey.
            </p>
          </div>
        </div>

        {/* Wave decoration */}
        <div className="relative mt-8 overflow-hidden" style={{ height: '120px' }}>
          <svg
            viewBox="0 0 1440 120"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            className="absolute bottom-0 w-full h-full"
          >
            <path
              d="M0,60 C240,110 480,10 720,60 C960,110 1200,10 1440,60 L1440,120 L0,120 Z"
              fill="#6BB6E8"
              opacity="0.35"
            />
            <path
              d="M0,80 C300,20 600,100 900,50 C1080,20 1260,80 1440,80 L1440,120 L0,120 Z"
              fill="#2B7DBF"
              opacity="0.25"
            />
            <path
              d="M0,100 C360,50 720,100 1080,70 C1260,55 1380,90 1440,100 L1440,120 L0,120 Z"
              fill="#1E2A38"
              opacity="0.1"
            />
          </svg>
        </div>
      </section>

    </div>
  );
}
