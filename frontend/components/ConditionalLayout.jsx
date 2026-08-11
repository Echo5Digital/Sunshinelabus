'use client';

import { usePathname } from 'next/navigation';
import Navbar from './Navbar';
import Footer from './Footer';

export default function ConditionalLayout({ children }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith('/admin');
  const isVillagesLanding = pathname.startsWith('/mobile-blood-draw-the-villages');
  const isWesleyChapelLanding = pathname.startsWith('/mobile-blood-draw-wesley-chapel');

  return (
    <>
      {!isAdmin && !isVillagesLanding && !isWesleyChapelLanding && <Navbar />}
      <main>{children}</main>
      {!isAdmin && <Footer />}
    </>
  );
}
