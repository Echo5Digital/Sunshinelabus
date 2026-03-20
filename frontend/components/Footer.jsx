import Link from 'next/link';
import Image from 'next/image';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';

const quickLinks = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about' },
  { label: 'Referrals', href: '/referrals' },
  { label: 'Book Appointment', href: '/book-appointment' },
  { label: 'Contact', href: '/contact' },
];

const serviceLinks = [
  { label: 'Routine Blood Work', href: '/services/hematology' },
  { label: 'TRT Monitoring Panels', href: '/services/chemistry' },
  { label: 'DNA Testing', href: '/services/dna-testing' },
  { label: 'Gender Reveal Test', href: '/services/molecular' },
  { label: 'Mobile Blood Draw', href: '/services/phlebotomy' },
  { label: 'Drug Testing', href: '/services/drug-testing' },
];

export default function Footer() {
  return (
    <footer className="bg-sunshine-dark text-white">
      {/* Accent top strip */}
      <div className="h-1 bg-gradient-to-r from-sunshine-yellow via-sunshine-sky to-sunshine-blue" />

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Column 0: Logo + tagline + CTA pills */}
          <div className="lg:col-span-1">
            <Image
              src="/main-logo.webp"
              alt="Sunshine Clinical Laboratory"
              height={56}
              width={180}
              className="object-contain mb-5"
            />
            <p className="text-white/55 text-sm leading-relaxed mb-6">
              Accurate, reliable, and timely diagnostic services — bringing sunshine to your health journey in New Port Richey&nbsp;&amp;&nbsp;Pasco County.
            </p>
          </div>

          {/* Column 1: Quick Links */}
          <div>
            <h3 className="text-sunshine-yellow font-semibold mb-5 text-xs uppercase tracking-widest">
              Quick Links
            </h3>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="group text-sm text-white/60 hover:text-sunshine-yellow transition-all duration-200 inline-flex items-center gap-2"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-sunshine-blue/50 group-hover:bg-sunshine-yellow transition-colors duration-200 flex-shrink-0" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: Services */}
          <div>
            <h3 className="text-sunshine-yellow font-semibold mb-5 text-xs uppercase tracking-widest">
              Our Services
            </h3>
            <ul className="space-y-2.5">
              {serviceLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="group text-sm text-white/60 hover:text-sunshine-yellow transition-all duration-200 inline-flex items-center gap-2"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-sunshine-blue/50 group-hover:bg-sunshine-yellow transition-colors duration-200 flex-shrink-0" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact + Hours */}
          <div>
            <h3 className="text-sunshine-yellow font-semibold mb-5 text-xs uppercase tracking-widest">
              Contact Us
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-sunshine-yellow mt-0.5 flex-shrink-0" aria-hidden="true" />
                <a href="tel:7272335223" className="text-sm text-white/60 hover:text-white transition-colors">
                  (727) 233-5223
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-sunshine-yellow mt-0.5 flex-shrink-0" aria-hidden="true" />
                <a
                  href="mailto:info@sunshinelabus.com"
                  className="text-sm text-white/60 hover:text-white transition-colors break-all"
                >
                  info@sunshinelabus.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-sunshine-yellow mt-0.5 flex-shrink-0" aria-hidden="true" />
                <a
                  href="https://maps.google.com/?q=3600+Galileo+Dr+Suite+104+New+Port+Richey+FL+34655"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-white/60 hover:text-white transition-colors"
                >
                  3600 Galileo Dr, Suite 104
                  <br />
                  New Port Richey, FL 34655
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-sunshine-yellow mt-0.5 flex-shrink-0" aria-hidden="true" />
                <span className="text-sm text-white/60">
                  Mon–Fri: 8:00 am – 5:00 pm
                  <br />
                  <span className="text-sunshine-sky/80">Walk-Ins Welcome</span>
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-white/40 text-center sm:text-left">
            &copy; 2026 Sunshine Clinical Laboratory LLC. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link href="#" className="text-xs text-white/40 hover:text-white/70 transition-colors">
              Privacy Policy
            </Link>
            <span className="text-white/20 text-xs" aria-hidden="true">|</span>
            <Link href="#" className="text-xs text-white/40 hover:text-white/70 transition-colors">
              Do Not Sell My Info
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
