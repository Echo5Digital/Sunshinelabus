import { Poppins } from 'next/font/google';
import './globals.css';
import ConditionalLayout from '@/components/ConditionalLayout';

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
      <head>
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-QY15PCW73H"></script>
        <script dangerouslySetInnerHTML={{__html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-QY15PCW73H');
        `}} />
      </head>
      <body className="font-sans antialiased">
        <ConditionalLayout>{children}</ConditionalLayout>
      </body>
    </html>
  );
}
