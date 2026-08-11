'use client';

import { usePathname } from 'next/navigation';
import Navbar from './Navbar';
import Footer from './Footer';

const NO_NAVBAR_PREFIXES = [
  '/mobile-blood-draw-the-villages',
  '/mobile-blood-draw-wesley-chapel',
  '/mobile-blood-draw-zephyrhills',
  '/es/prueba-de-adn-inmigracion',
];

export default function ConditionalLayout({ children }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith('/admin');
  const isNavlessLanding = NO_NAVBAR_PREFIXES.some((prefix) => pathname.startsWith(prefix));

  return (
    <>
      {!isAdmin && !isNavlessLanding && <Navbar />}
      <main>{children}</main>
      {!isAdmin && <Footer />}
    </>
  );
}
