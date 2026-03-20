import Image from 'next/image';
import ContactForm from '@/components/contact/ContactForm';
import ContactMap from '@/components/contact/ContactMap';

export const metadata = {
  title: 'Contact Us | Sunshine Clinical Laboratory',
  description:
    'Get in touch with Sunshine Clinical Laboratory. Contact us by phone, email, or visit us at our Houston location.',
};

export default function ContactPage() {
  return (
    <div className="pt-16">
      {/* Banner */}
      <section className="relative w-full h-[95vh] overflow-hidden">
        <Image
          src="/contact-bnr.jpg"
          alt="Contact Us Banner"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-widest uppercase drop-shadow-lg">
            Contact Us
          </h1>
        </div>
      </section>

      {/* Contact Form */}
      <ContactForm />

      {/* Map */}
      <ContactMap />
    </div>
  );
}
