import Link from 'next/link';
import Image from 'next/image';
import { Phone, Mail, MapPin } from 'lucide-react';

const companyLinks = [
  { label: 'About Us', href: '/about' },
  { label: 'Our Mission', href: '/about#mission' },
  { label: 'Careers', href: '/about#careers' },
];

const quickLinks = [
  { label: 'Services', href: '/#services' },
  { label: 'Referrals', href: '/#contact' },
  { label: 'Schedule', href: '/#appointment' },
  { label: 'Do Not Sell/Share My Personal Information', href: '#' },
];

export default function Footer() {
  return (
    <footer className="bg-sunshine-blue text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

          {/* Column 0: Logo + tagline */}
          <div className="md:col-span-1">
            <Image src="/logo2.webp" alt="Sunshine Clinical Laboratory" height={48} width={160} className="object-contain mb-4" />
            <p className="text-white/70 text-sm leading-relaxed mt-3">
              Accurate, reliable, and timely diagnostic services — bringing sunshine to your health.
            </p>
          </div>

          {/* Column 1: Company */}
          <div>
            <h3 className="text-sunshine-yellow font-semibold mb-5 text-xs uppercase tracking-wider">
              Company
            </h3>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/75 hover:text-sunshine-yellow hover:translate-x-1 transition-all duration-200 inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-sunshine-yellow font-semibold mb-5 text-xs uppercase tracking-wider">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/75 hover:text-sunshine-yellow hover:translate-x-1 transition-all duration-200 inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact */}
          <div>
            <h3 className="text-sunshine-yellow font-semibold mb-5 text-xs uppercase tracking-wider">
              Contact
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-sunshine-yellow mt-0.5 flex-shrink-0" />
                <a href="tel:+15551234567" className="text-sm text-white/75 hover:text-white transition-colors">
                  (555) 123-4567
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-sunshine-yellow mt-0.5 flex-shrink-0" />
                <a
                  href="mailto:info@sunshineclinicallab.com"
                  className="text-sm text-white/75 hover:text-white transition-colors"
                >
                  info@sunshineclinicallab.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-sunshine-yellow mt-0.5 flex-shrink-0" />
                <span className="text-sm text-white/75">
                  123 Medical Drive
                  <br />
                  Houston, TX 77001
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 text-center">
          <p className="text-sm text-white/60">
            &copy; 2026 Sunshine Clinical Laboratory. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
