import Image from 'next/image';
import ContactForm from '@/components/contact/ContactForm';
import ContactInfo from '@/components/contact/ContactInfo';
import ContactCTA from '@/components/contact/ContactCTA';

export const metadata = {
  title: 'Contact Us | Sunshine Clinical Laboratory',
  description:
    'Get in touch with Sunshine Clinical Laboratory. Contact us by phone, email, or visit us at our Houston location.',
};

export default function ContactPage() {
  return (
    <div>
      {/* Banner */}
      <section className="relative w-full h-[90vh] overflow-hidden bg-sunshine-dark">
        <Image
          src="/cnt-bnr.jpg"
          alt="Contact Sunshine Clinical Laboratory"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/45 to-black/70" />

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold text-white tracking-tight leading-tight drop-shadow-lg mb-4">
            Contact <span className="text-sunshine-sky">Us</span>
          </h1>
          <div className="w-12 h-0.5 bg-sunshine-sky mx-auto mb-5 rounded-full opacity-80" />
          <p className="text-white/70 text-sm sm:text-base lg:text-lg max-w-lg mx-auto leading-relaxed font-light tracking-wide">
            We&apos;re here to help. Reach out anytime.
          </p>
        </div>

        {/* Wave divider — exits into ContactInfo (#EBF5FB) */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none" aria-hidden="true">
          <svg viewBox="0 0 1440 72" preserveAspectRatio="none" className="w-full h-16 sm:h-20" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,36 C240,72 480,0 720,36 C960,72 1200,0 1440,36 L1440,72 L0,72 Z" fill="#EBF5FB" />
          </svg>
        </div>
      </section>

      {/* Contact Info Cards */}
      <ContactInfo />

      {/* Contact Form */}
      <ContactForm />

      {/* CTA */}
      <ContactCTA />
    </div>
  );
}
