'use client';

import { usePathname } from 'next/navigation';
import Navbar from './Navbar';
import Footer from './Footer';

export default function ConditionalLayout({ children }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith('/admin');
  const isVillagesLanding = pathname.startsWith('/mobile-blood-draw-the-villages');

  return (
    <>
      {!isAdmin && !isVillagesLanding && <Navbar />}
      <main>{children}</main>
      {!isAdmin && <Footer />}
    </>
  );
}
