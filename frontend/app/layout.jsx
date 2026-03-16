import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata = {
  title: 'Sunshine Clinical Lab | Advanced Diagnostic Services',
  description: 'Sunshine Clinical Lab provides accurate, reliable, and timely laboratory testing and healthcare diagnostics to support better medical decisions.',
  keywords: ['clinical laboratory', 'diagnostic testing', 'hematology', 'DNA testing', 'blood tests', 'medical laboratory', 'Houston'],
  openGraph: {
    title: 'Sunshine Clinical Lab | Advanced Diagnostic Services',
    description: 'Providing accurate laboratory testing and healthcare diagnostics to support better medical decisions.',
    type: 'website',
    locale: 'en_US',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
