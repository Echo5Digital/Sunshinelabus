import { Poppins } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-poppins',
  display: 'swap',
});

export const metadata = {
  title: {
    default: 'Sunshine Clinical Lab | New Port Richey, FL',
    template: '%s | Sunshine Clinical Lab',
  },
  description: 'Sunshine Clinical Lab in New Port Richey, FL — fast, affordable lab testing. Walk-ins welcome. Call (727) 233-5223.',
  keywords: ['clinical laboratory', 'diagnostic testing', 'blood tests', 'DNA testing', 'New Port Richey FL', 'Sunshine Clinical Lab'],
  openGraph: {
    title: 'Sunshine Clinical Lab | New Port Richey, FL',
    description: 'Fast, affordable lab testing in New Port Richey, FL. Walk-ins welcome. Call (727) 233-5223.',
    type: 'website',
    locale: 'en_US',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={poppins.variable}>
      <body className="font-sans antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
