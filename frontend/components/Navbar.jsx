'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X, ChevronDown } from 'lucide-react';
import Image from 'next/image';
import { ShimmerButton } from '@/registry/magicui/shimmer-button';

const servicesItems = [
  { label: 'Mobile Blood Draw', href: '/mobile-blood-draw-pasco-county' },
  { label: 'TRT Blood Testing', href: '/trt-blood-test-pasco-county' },
  { label: 'DNA Testing', href: '/dna-testing-pasco-county', highlight: true },
];

const protocolsItems = [
  { label: 'Resources', href: '#' },
  { label: 'Privacy Policy', href: '#' },
  { label: 'FAQ', href: '/#faq' },
];

const moreItems = [
  { label: 'Careers', href: '/about#careers' },
  { label: 'Lab Professionals', href: '/about#lab-professionals' },
  { label: 'Referrals', href: '/referrals' },
  { label: 'Lab Schedule', href: '/book-appointment' },
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
  const pathname = usePathname();

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
          ? 'bg-white shadow-md border-b border-gray-100'
          : 'bg-white/60 backdrop-blur-md'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center h-20">
          {/* Logo — far left */}
          <Link href="/" className="flex-shrink-0">
            <Image src="/logo2.webp" alt="Sunshine Clinical Laboratory" height={36} width={120} className="object-contain" />
          </Link>

          {/* Desktop Nav — centered */}
          <div className="hidden lg:flex flex-1 items-center justify-center gap-1">
            <NavLink href="/" label="Home" pathname={pathname} />
            <NavLink href="/about" label="About" pathname={pathname} />

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
                    className="flex items-center gap-2 px-4 py-2.5 text-sm text-sunshine-dark hover:bg-sunshine-light hover:text-sunshine-blue hover:pl-5 transition-all duration-150"
                    onClick={() => setActiveDropdown(null)}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-sunshine-sky flex-shrink-0" />
                    {item.label}
                  </Link>
                ))}
              </div>
            </DropdownItem>

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
                    className="flex items-center gap-2 px-4 py-2.5 text-sm text-sunshine-dark hover:bg-sunshine-light hover:text-sunshine-blue hover:pl-5 transition-all duration-150"
                    onClick={() => setActiveDropdown(null)}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-sunshine-sky flex-shrink-0" />
                    {item.label}
                  </Link>
                ))}
              </div>
            </DropdownItem>

            <NavLink href="/contact" label="Contact" pathname={pathname} />

            <DropdownItem
              label="More"
              isOpen={activeDropdown === 'more'}
              onEnter={() => setActiveDropdown('more')}
              onLeave={() => setActiveDropdown(null)}
              isMore
            >
              <div className="py-2">
                {moreItems.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="flex items-center gap-2 px-4 py-2.5 text-sm text-sunshine-dark hover:bg-sunshine-light hover:text-sunshine-blue hover:pl-5 transition-all duration-150"
                    onClick={() => setActiveDropdown(null)}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-sunshine-yellow flex-shrink-0" />
                    {item.label}
                  </Link>
                ))}
              </div>
            </DropdownItem>
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
            <div className="px-4 py-3 space-y-0.5">
              <MobileNavLink href="/" label="Home" onClick={() => setMobileOpen(false)} pathname={pathname} />
              <MobileNavLink href="/about" label="About" onClick={() => setMobileOpen(false)} pathname={pathname} />

              <MobileDropdown
                label="Services"
                isOpen={mobileExpanded === 'services'}
                onToggle={() => toggleMobileDropdown('services')}
              >
                {servicesItems.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="flex items-center gap-2 pl-4 pr-2 py-2.5 text-sm text-sunshine-dark/80 hover:text-sunshine-blue transition-colors"
                    onClick={() => setMobileOpen(false)}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-sunshine-sky flex-shrink-0" />
                    {item.label}
                  </Link>
                ))}
              </MobileDropdown>

              <MobileDropdown
                label="Protocols"
                isOpen={mobileExpanded === 'protocols'}
                onToggle={() => toggleMobileDropdown('protocols')}
              >
                {protocolsItems.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="flex items-center gap-2 pl-4 py-2.5 text-sm text-sunshine-dark/80 hover:text-sunshine-blue transition-colors"
                    onClick={() => setMobileOpen(false)}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-sunshine-sky flex-shrink-0" />
                    {item.label}
                  </Link>
                ))}
              </MobileDropdown>

              <MobileNavLink href="/contact" label="Contact" onClick={() => setMobileOpen(false)} pathname={pathname} />

              <hr className="border-gray-100 my-1" />

              <MobileDropdown
                label="More"
                isOpen={mobileExpanded === 'more'}
                onToggle={() => toggleMobileDropdown('more')}
                isMore
              >
                {moreItems.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="flex items-center gap-2 pl-4 py-2.5 text-sm text-sunshine-dark/80 hover:text-sunshine-blue transition-colors"
                    onClick={() => setMobileOpen(false)}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-sunshine-yellow flex-shrink-0" />
                    {item.label}
                  </Link>
                ))}
              </MobileDropdown>

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

function NavLink({ href, label, pathname }) {
  const isActive = pathname === href;
  return (
    <Link
      href={href}
      className={`px-3 py-2 text-[0.85rem] tracking-wide font-medium rounded-md transition-colors duration-200 ${
        isActive
          ? 'text-sunshine-blue bg-sunshine-light font-semibold border-b-2 border-sunshine-blue'
          : 'text-sunshine-dark hover:text-sunshine-blue hover:bg-sunshine-light'
      }`}
    >
      {label}
    </Link>
  );
}

function DropdownItem({ label, href, isOpen, onEnter, onLeave, children, isMore }) {
  return (
    <div className="relative" onMouseEnter={onEnter} onMouseLeave={onLeave}>
      {href ? (
        <Link
          href={href}
          className="flex items-center gap-1 px-3 py-2 text-[0.85rem] tracking-wide font-medium text-sunshine-dark hover:text-sunshine-blue hover:bg-sunshine-light rounded-md transition-colors duration-200"
        >
          {label}
          <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
        </Link>
      ) : (
        <button
          className={`flex items-center gap-1 px-3 py-2 text-[0.85rem] tracking-wide font-medium rounded-md transition-colors duration-200 ${
            isMore
              ? 'text-sunshine-dark bg-sunshine-soft/30 hover:bg-sunshine-soft hover:text-sunshine-blue'
              : 'text-sunshine-dark hover:text-sunshine-blue hover:bg-sunshine-light'
          }`}
        >
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
            className="absolute top-full left-0 mt-1 w-56 bg-white rounded-xl shadow-lg border border-gray-100 border-t-2 border-t-sunshine-blue overflow-hidden"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function MobileNavLink({ href, label, onClick, pathname }) {
  const isActive = pathname === href;
  return (
    <Link
      href={href}
      className={`block px-3 py-2.5 text-sm font-medium rounded-lg transition-colors ${
        isActive
          ? 'text-sunshine-blue bg-sunshine-light font-semibold'
          : 'text-sunshine-dark hover:text-sunshine-blue hover:bg-sunshine-light'
      }`}
      onClick={onClick}
    >
      {label}
    </Link>
  );
}

function MobileDropdown({ label, isOpen, onToggle, children, isMore }) {
  return (
    <div>
      <button
        onClick={onToggle}
        className={`flex items-center justify-between w-full px-3 py-2.5 text-sm font-medium rounded-lg transition-colors ${
          isMore
            ? 'text-sunshine-dark bg-sunshine-soft/20 hover:bg-sunshine-soft/40 hover:text-sunshine-blue'
            : 'text-sunshine-dark hover:text-sunshine-blue hover:bg-sunshine-light'
        }`}
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
            className="overflow-hidden bg-sunshine-light rounded-lg ml-2 mt-1 border-l-2 border-sunshine-blue"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
