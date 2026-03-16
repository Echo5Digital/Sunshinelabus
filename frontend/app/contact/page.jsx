import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import ContactForm from '@/components/ContactForm';

export const metadata = {
  title: 'Contact Us | Sunshine Clinical Laboratory',
  description:
    'Get in touch with Sunshine Clinical Laboratory. Contact us by phone, email, or visit us at our Houston location.',
};

const contactInfo = [
  {
    icon: Phone,
    title: 'Phone',
    primary: '+1 (555) 123-4567',
    secondary: 'Mon–Fri, 7:00 AM – 6:00 PM',
    href: 'tel:+15551234567',
  },
  {
    icon: Mail,
    title: 'Email',
    primary: 'info@sunshineclinicallab.com',
    secondary: 'We reply within 24 hours',
    href: 'mailto:info@sunshineclinicallab.com',
  },
  {
    icon: MapPin,
    title: 'Address',
    primary: '123 Medical Drive',
    secondary: 'Houston, TX 77001',
    href: 'https://maps.google.com',
  },
  {
    icon: Clock,
    title: 'Hours',
    primary: 'Mon–Fri: 7:00 AM – 6:00 PM',
    secondary: 'Sat: 8:00 AM – 2:00 PM',
    href: null,
  },
];

export default function ContactPage() {
  return (
    <div className="pt-16">
      {/* Page Hero */}
      <section className="bg-gradient-to-br from-sunshine-blue to-sunshine-dark py-20 text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="inline-block bg-white/15 text-white text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
            Contact Us
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            We&apos;re Here to Help
          </h1>
          <p className="text-sunshine-sky text-lg">
            Have questions about our services or want to schedule a test? Reach out to our team
            and we&apos;ll get back to you promptly.
          </p>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-16 bg-sunshine-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {contactInfo.map((info) => (
              <div
                key={info.title}
                className="bg-white rounded-2xl p-6 shadow-sm border border-sunshine-sky/20 hover:shadow-md hover:border-sunshine-yellow/40 transition-all"
              >
                <div className="w-11 h-11 bg-sunshine-sky/20 rounded-xl flex items-center justify-center mb-4">
                  <info.icon className="w-5 h-5 text-sunshine-blue" />
                </div>
                <h3 className="font-semibold text-sunshine-dark mb-1">{info.title}</h3>
                {info.href ? (
                  <a
                    href={info.href}
                    className="text-sm text-sunshine-dark/80 hover:text-sunshine-blue transition-colors block"
                  >
                    {info.primary}
                  </a>
                ) : (
                  <p className="text-sm text-sunshine-dark/80">{info.primary}</p>
                )}
                <p className="text-xs text-gray-400 mt-1">{info.secondary}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Map + Form */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Map */}
            <div>
              <h2 className="text-2xl font-bold text-sunshine-dark mb-6">Find Us</h2>
              <div className="rounded-2xl overflow-hidden shadow-md border border-sunshine-sky/20 h-80 lg:h-[420px] bg-sunshine-light flex items-center justify-center">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3463.6558376295085!2d-95.3698!3d29.7604!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjnCsDQ1JzM3LjQiTiA5NcKwMjInMTEuMyJX!5e0!3m2!1sen!2sus!4v1600000000000!5m2!1sen!2sus"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Sunshine Clinical Laboratory Location"
                />
              </div>
              <div className="mt-4 flex items-start gap-3 text-sunshine-dark/70">
                <MapPin className="w-5 h-5 text-sunshine-blue mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-sunshine-dark">Sunshine Clinical Laboratory</p>
                  <p className="text-sm">123 Medical Drive, Houston, TX 77001</p>
                  <a
                    href="https://maps.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-sunshine-blue hover:underline mt-1 inline-block"
                  >
                    Get Directions &rarr;
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <h2 className="text-2xl font-bold text-sunshine-dark mb-2">Send Us a Message</h2>
              <p className="text-gray-500 mb-8">
                Fill out the form below and a member of our team will respond within 24 hours.
              </p>
              <div className="bg-sunshine-light rounded-3xl p-8 border border-sunshine-sky/20">
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
