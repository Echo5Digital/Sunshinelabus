'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X, ChevronDown } from 'lucide-react';
import Image from 'next/image';
import { ShimmerButton } from '@/registry/magicui/shimmer-button';

const servicesItems = [
  { label: 'Mobile Blood Draw', href: '/mobile-blood-draw-pasco-county' },
  { label: 'TRT Blood Testing', href: '/trt-blood-test-pasco-county' },
  { label: 'DNA Testing', href: '/dna-testing-pasco-county', highlight: true },
];

const joinTeamItems = [
  { label: 'Careers', href: '/about#careers' },
  { label: 'Lab Professionals', href: '/about#lab-professionals' },
];

const protocolsItems = [
  { label: 'Resources', href: '#' },
  { label: 'Privacy Policy', href: '#' },
];

const dropdownVariants = {
  hidden: { opacity: 0, y: -8, scale: 0.97 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.18, ease: 'easeOut' } },
  exit: { opacity: 0, y: -8, scale: 0.97, transition: { duration: 0.14, ease: 'easeIn' } },
};

const mobileMenuVariants = {
  hidden: { opacity: 0, height: 0 },
  visible: { opacity: 1, height: 'auto', transition: { duration: 0.3, ease: 'easeOut' } },
  exit: { opacity: 0, height: 0, transition: { duration: 0.2, ease: 'easeIn' } },
};

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileDropdown = (key) => {
    setMobileExpanded((prev) => (prev === key ? null : key));
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || mobileOpen
          ? 'bg-white shadow-md'
          : 'bg-white/50 backdrop-blur-md'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center h-20">
          {/* Logo — far left */}
          <Link href="/" className="flex-shrink-0">
            <Image src="/logo2.webp" alt="Sunshine Clinical Laboratory" height={36} width={120} className="object-contain" />
          </Link>

          {/* Desktop Nav — centered */}
          <div className="hidden lg:flex flex-1 items-center justify-center gap-0.5">
            <NavLink href="/" label="Home" />
            <NavLink href="/about" label="About" />

            <DropdownItem
              label="Services"
              href="#"
              isOpen={activeDropdown === 'services'}
              onEnter={() => setActiveDropdown('services')}
              onLeave={() => setActiveDropdown(null)}
            >
              <div className="py-2">
                {servicesItems.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="flex items-center gap-2 px-4 py-2 text-sm text-sunshine-dark hover:bg-sunshine-light hover:text-sunshine-blue transition-colors"
                    onClick={() => setActiveDropdown(null)}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </DropdownItem>

            <DropdownItem
              label="Join Our Team"
              isOpen={activeDropdown === 'joinTeam'}
              onEnter={() => setActiveDropdown('joinTeam')}
              onLeave={() => setActiveDropdown(null)}
            >
              <div className="py-2">
                {joinTeamItems.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="block px-4 py-2 text-sm text-sunshine-dark hover:bg-sunshine-light hover:text-sunshine-blue transition-colors"
                    onClick={() => setActiveDropdown(null)}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </DropdownItem>

            <NavLink href="/referrals" label="Referrals" />
            <NavLink href="/book-appointment" label="Schedule" />

            <DropdownItem
              label="Protocols"
              isOpen={activeDropdown === 'protocols'}
              onEnter={() => setActiveDropdown('protocols')}
              onLeave={() => setActiveDropdown(null)}
            >
              <div className="py-2">
                {protocolsItems.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="block px-4 py-2 text-sm text-sunshine-dark hover:bg-sunshine-light hover:text-sunshine-blue transition-colors"
                    onClick={() => setActiveDropdown(null)}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </DropdownItem>

            <NavLink href="/contact" label="Contact" />
          </div>

          {/* CTA Button — far right */}
          <div className="hidden lg:flex flex-shrink-0">
            <Link href="/book-appointment">
              <ShimmerButton className="bg-gradient-to-r from-[#6BB6E8] to-[#2B7DBF] text-white text-sm px-5 py-2.5 rounded-full font-semibold whitespace-nowrap shadow-sm">
                <span>Book Appointment</span>
              </ShimmerButton>
            </Link>
          </div>

          {/* Mobile hamburger — far right */}
          <button
            onClick={() => setMobileOpen((prev) => !prev)}
            className="lg:hidden ml-auto p-2 rounded-lg text-sunshine-dark hover:bg-sunshine-light transition-colors"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-menu"
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="lg:hidden bg-white border-t border-gray-100 overflow-hidden"
          >
            <div className="px-4 py-3 space-y-1">
              <MobileNavLink href="/" label="Home" onClick={() => setMobileOpen(false)} />
              <MobileNavLink href="/about" label="About" onClick={() => setMobileOpen(false)} />

              <MobileDropdown
                label="Services"
                isOpen={mobileExpanded === 'services'}
                onToggle={() => toggleMobileDropdown('services')}
              >
                {servicesItems.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="flex items-center gap-2 pl-4 pr-2 py-2 text-sm text-sunshine-dark/80 hover:text-sunshine-blue transition-colors"
                    onClick={() => setMobileOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
              </MobileDropdown>

              <MobileDropdown
                label="Join Our Team"
                isOpen={mobileExpanded === 'joinTeam'}
                onToggle={() => toggleMobileDropdown('joinTeam')}
              >
                {joinTeamItems.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="block pl-4 py-2 text-sm text-sunshine-dark/80 hover:text-sunshine-blue transition-colors"
                    onClick={() => setMobileOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
              </MobileDropdown>

              <MobileNavLink href="/referrals" label="Referrals" onClick={() => setMobileOpen(false)} />
              <MobileNavLink href="/book-appointment" label="Schedule" onClick={() => setMobileOpen(false)} />

              <MobileDropdown
                label="Protocols"
                isOpen={mobileExpanded === 'protocols'}
                onToggle={() => toggleMobileDropdown('protocols')}
              >
                {protocolsItems.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="block pl-4 py-2 text-sm text-sunshine-dark/80 hover:text-sunshine-blue transition-colors"
                    onClick={() => setMobileOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
              </MobileDropdown>

              <MobileNavLink href="/contact" label="Contact" onClick={() => setMobileOpen(false)} />

              <div className="pt-2 pb-1">
                <Link href="/book-appointment" onClick={() => setMobileOpen(false)}>
                  <ShimmerButton className="w-full justify-center bg-gradient-to-r from-[#6BB6E8] to-[#2B7DBF] text-white text-sm px-5 py-3 rounded-full font-semibold shadow-sm">
                    <span>Book Appointment</span>
                  </ShimmerButton>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

function NavLink({ href, label }) {
  return (
    <Link
      href={href}
      className="px-3 py-2 text-sm font-medium text-sunshine-dark hover:text-sunshine-blue hover:bg-sunshine-light rounded-md transition-colors duration-200"
    >
      {label}
    </Link>
  );
}

function DropdownItem({ label, href, isOpen, onEnter, onLeave, children }) {
  return (
    <div className="relative" onMouseEnter={onEnter} onMouseLeave={onLeave}>
      {href ? (
        <Link
          href={href}
          className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-sunshine-dark hover:text-sunshine-blue hover:bg-sunshine-light rounded-md transition-colors duration-200"
        >
          {label}
          <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
        </Link>
      ) : (
        <button className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-sunshine-dark hover:text-sunshine-blue hover:bg-sunshine-light rounded-md transition-colors duration-200">
          {label}
          <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
        </button>
      )}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key={label}
            variants={dropdownVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="absolute top-full left-0 mt-1 w-56 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function MobileNavLink({ href, label, onClick }) {
  return (
    <Link
      href={href}
      className="block px-3 py-2.5 text-sm font-medium text-sunshine-dark hover:text-sunshine-blue hover:bg-sunshine-light rounded-lg transition-colors"
      onClick={onClick}
    >
      {label}
    </Link>
  );
}

function MobileDropdown({ label, isOpen, onToggle, children }) {
  return (
    <div>
      <button
        onClick={onToggle}
        className="flex items-center justify-between w-full px-3 py-2.5 text-sm font-medium text-sunshine-dark hover:text-sunshine-blue hover:bg-sunshine-light rounded-lg transition-colors"
      >
        {label}
        <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden bg-sunshine-light rounded-lg ml-2 mt-1"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
