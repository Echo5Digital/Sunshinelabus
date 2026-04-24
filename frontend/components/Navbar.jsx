'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X, ChevronDown } from 'lucide-react';
import Image from 'next/image';
import { ShimmerButton } from '@/registry/magicui/shimmer-button';

const servicesItems = [
  { label: 'All Services', href: '/all-services', isAll: true },
  { label: 'General Testing', href: '/clinical-lab-services-trinity-fl' },
  { label: 'Mobile Blood Draw', href: '/mobile-blood-draw-pasco-county' },
  { label: 'TRT Blood Testing', href: '/trt-blood-test-pasco-county' },
  { label: 'Gender Reveal Testing', href: '/gender-reveal-testing-florida' },
  { label: 'DNA Testing', href: '/dna-testing-pasco-county' },
];

// const moreItems = [
//   { label: 'Careers', href: '/about#careers' },
//   { label: 'Lab Professionals', href: '/about#lab-professionals' },
//   { label: 'Referrals', href: '/referrals' },
//   { label: 'Lab Schedule', href: '/book-appointment' },
// ];

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

  if (pathname.startsWith('/admin')) return null;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-3 px-4 pointer-events-none">
      {/* Glass pill container */}
      <div
        className={`pointer-events-auto w-full max-w-5xl transition-all duration-300 ease-in-out ${
          mobileOpen
            ? 'rounded-[2rem] bg-white/80 backdrop-blur-xl shadow-xl border border-white/40'
            : scrolled
            ? 'rounded-full bg-white/75 backdrop-blur-xl shadow-lg border border-white/50'
            : 'rounded-full bg-white/50 backdrop-blur-md shadow-md border border-white/30'
        }`}
      >
        {/* Header row */}
        <div className="flex items-center h-[68px] lg:h-[88px] px-5 lg:px-8">
          {/* Logo — far left */}
          <Link href="/" className="flex-shrink-0 overflow-hidden">
            <Image src="/logo2.webp" alt="Sunshine Clinical Laboratory" height={48} width={158} className="h-10 lg:h-12 w-auto object-contain [filter:drop-shadow(0_2px_8px_rgba(0,0,0,0.22))_drop-shadow(0_0_6px_rgba(255,255,255,0.5))]" />
          </Link>

          {/* Desktop Nav — centered */}
          <div className="hidden lg:flex flex-1 items-center justify-center gap-0.5">
            <NavLink href="/" label="Home" pathname={pathname} />
            <NavLink href="/about" label="About" pathname={pathname} />

            <DropdownItem
              label="Services"
              isOpen={activeDropdown === 'services'}
              onEnter={() => setActiveDropdown('services')}
              onLeave={() => setActiveDropdown(null)}
            >
              <div className="py-2">
                {servicesItems.map((item, i) => (
                  <div key={item.label}>
                    {item.isAll ? (
                      <>
                        <Link
                          href={item.href}
                          className="flex items-center gap-2 mx-2 my-0.5 px-3 py-2.5 text-sm font-semibold text-sunshine-blue rounded-xl hover:bg-sunshine-blue/10 transition-all duration-150 uppercase tracking-[0.03em]"
                          onClick={() => setActiveDropdown(null)}
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-sunshine-blue flex-shrink-0" />
                          {item.label}
                        </Link>
                        <hr className="mx-3 my-1 border-sunshine-sky/30" />
                      </>
                    ) : (
                      <Link
                        href={item.href}
                        className="flex items-center gap-2 mx-2 my-0.5 px-3 py-2.5 text-sm text-sunshine-dark/80 rounded-xl hover:bg-sunshine-sky/15 hover:text-sunshine-blue transition-all duration-150 uppercase tracking-[0.03em]"
                        onClick={() => setActiveDropdown(null)}
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-sunshine-sky flex-shrink-0" />
                        {item.label}
                      </Link>
                    )}
                  </div>
                ))}
              </div>
            </DropdownItem>

            <NavLink href="/insurance-accepted" label="Insurance" pathname={pathname} />
            <NavLink href="/faq" label="FAQ" pathname={pathname} />
            <NavLink href="/blog" label="Blog" pathname={pathname} />
            <NavLink href="/contact" label="Contact" pathname={pathname} />

            {/* <DropdownItem
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
                    className="flex items-center gap-2 mx-2 my-0.5 px-3 py-2.5 text-sm text-sunshine-dark/80 rounded-xl hover:bg-sunshine-sky/15 hover:text-sunshine-blue transition-all duration-150"
                    onClick={() => setActiveDropdown(null)}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-sunshine-yellow flex-shrink-0" />
                    {item.label}
                  </Link>
                ))}
              </div>
            </DropdownItem> */}
          </div>

          {/* CTA Button — far right */}
          <div className="hidden lg:flex flex-shrink-0">
            <Link href="/book-appointment">
              <ShimmerButton className="bg-gradient-to-r from-[#6BB6E8] to-[#2B7DBF] text-white text-sm px-6 py-3 rounded-full font-semibold whitespace-nowrap shadow-sm uppercase tracking-wider">
                <span>Book Appointment</span>
              </ShimmerButton>
            </Link>
          </div>

          {/* Mobile hamburger — far right */}
          <button
            onClick={() => setMobileOpen((prev) => !prev)}
            className="lg:hidden ml-auto p-2 rounded-full text-sunshine-dark hover:bg-white/60 transition-colors duration-200"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu — inside the pill */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              key="mobile-menu"
              variants={mobileMenuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="lg:hidden overflow-hidden border-t border-white/30"
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
                    <div key={item.label}>
                      {item.isAll ? (
                        <>
                          <Link
                            href={item.href}
                            className="flex items-center gap-2 pl-4 pr-2 py-2.5 text-sm font-semibold text-sunshine-blue hover:bg-white/40 rounded-lg transition-colors uppercase tracking-[0.03em]"
                            onClick={() => setMobileOpen(false)}
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-sunshine-blue flex-shrink-0" />
                            {item.label}
                          </Link>
                          <hr className="mx-3 my-0.5 border-sunshine-sky/30" />
                        </>
                      ) : (
                        <Link
                          href={item.href}
                          className="flex items-center gap-2 pl-4 pr-2 py-2.5 text-sm text-sunshine-dark/80 hover:text-sunshine-blue hover:bg-white/40 rounded-lg transition-colors uppercase tracking-[0.03em]"
                          onClick={() => setMobileOpen(false)}
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-sunshine-sky flex-shrink-0" />
                          {item.label}
                        </Link>
                      )}
                    </div>
                  ))}
                </MobileDropdown>

                <MobileNavLink href="/insurance-accepted" label="Insurance" onClick={() => setMobileOpen(false)} pathname={pathname} />
                <MobileNavLink href="/faq" label="FAQ" onClick={() => setMobileOpen(false)} pathname={pathname} />
                <MobileNavLink href="/blog" label="Blog" onClick={() => setMobileOpen(false)} pathname={pathname} />
                <MobileNavLink href="/contact" label="Contact" onClick={() => setMobileOpen(false)} pathname={pathname} />

                {/* <hr className="border-white/30 my-1" />

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
                      className="flex items-center gap-2 pl-4 py-2.5 text-sm text-sunshine-dark/80 hover:text-sunshine-blue hover:bg-white/40 rounded-lg transition-colors"
                      onClick={() => setMobileOpen(false)}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-sunshine-yellow flex-shrink-0" />
                      {item.label}
                    </Link>
                  ))}
                </MobileDropdown> */}

                <div className="pt-2 pb-1">
                  <Link href="/book-appointment" onClick={() => setMobileOpen(false)}>
                    <ShimmerButton className="w-full justify-center bg-gradient-to-r from-[#6BB6E8] to-[#2B7DBF] text-white text-sm px-5 py-3 rounded-full font-semibold shadow-sm uppercase tracking-wider">
                      <span>Book Appointment</span>
                    </ShimmerButton>
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}

function NavLink({ href, label, pathname }) {
  const isActive = pathname === href;
  return (
    <Link
      href={href}
      className={`px-4 py-2 text-[0.9rem] tracking-wider font-medium rounded-full transition-all duration-200 uppercase ${
        isActive
          ? 'text-white bg-gradient-to-r from-sunshine-sky to-sunshine-blue font-semibold shadow-md shadow-sunshine-blue/25'
          : 'text-sunshine-dark/80 hover:text-sunshine-blue hover:bg-sunshine-sky/15'
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
          className={`flex items-center gap-1 px-4 py-2 text-[0.9rem] tracking-wider font-medium rounded-full transition-all duration-200 uppercase ${
            isOpen
              ? 'text-sunshine-blue bg-sunshine-sky/15'
              : 'text-sunshine-dark/80 hover:text-sunshine-blue hover:bg-sunshine-sky/15'
          }`}
        >
          {label}
          <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
        </Link>
      ) : (
        <button
          className={`flex items-center gap-1 px-4 py-2 text-[0.9rem] tracking-wider font-medium rounded-full transition-all duration-200 uppercase ${
            isOpen
              ? 'text-sunshine-blue bg-sunshine-sky/15 font-semibold'
              : isMore
              ? 'text-sunshine-dark/80 bg-sunshine-sky/10 hover:bg-sunshine-sky/20 hover:text-sunshine-blue'
              : 'text-sunshine-dark/80 hover:text-sunshine-blue hover:bg-sunshine-sky/15'
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
            className="absolute top-full left-0 mt-2 w-56 bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-white/40 overflow-hidden"
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
      className={`block px-3 py-3 text-[0.9rem] font-medium rounded-xl transition-all duration-200 uppercase tracking-wider ${
        isActive
          ? 'text-white bg-gradient-to-r from-sunshine-sky to-sunshine-blue font-semibold shadow-sm'
          : 'text-sunshine-dark/80 hover:text-sunshine-blue hover:bg-sunshine-sky/15'
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
        className={`flex items-center justify-between w-full px-3 py-3 text-[0.9rem] font-medium rounded-xl transition-all duration-200 uppercase tracking-wider ${
          isOpen
            ? 'text-sunshine-blue bg-sunshine-sky/15 font-semibold'
            : isMore
            ? 'text-sunshine-dark/80 bg-sunshine-sky/10 hover:bg-sunshine-sky/20 hover:text-sunshine-blue'
            : 'text-sunshine-dark/80 hover:text-sunshine-blue hover:bg-sunshine-sky/15'
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
            className="overflow-hidden bg-sunshine-blue/[0.08] rounded-xl ml-2 mt-1 border-l-2 border-sunshine-blue/40"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
