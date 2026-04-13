import { FAQ_DATA } from '@/lib/faq-data';
import HomeHero from '@/components/home/HomeHero';
import IntroSection from '@/components/home/IntroSection';
import DirectAnswerBlock1 from '@/components/home/DirectAnswerBlock1';
import WhyChooseUs from '@/components/home/WhyChooseUs';
import DirectAnswerBlock2 from '@/components/home/DirectAnswerBlock2';
import ServicesGridSection from '@/components/home/ServicesGridSection';
import MobileBloodDrawSection from '@/components/home/MobileBloodDrawSection';
import TRTSection from '@/components/home/TRTSection';
import GenderRevealSection from '@/components/home/GenderRevealSection';
import DNATestingSection from '@/components/home/DNATestingSection';
import InsuranceSection from '@/components/home/InsuranceSection';
import FAQSection from '@/components/home/FAQSection';
import ServiceAreaSection from '@/components/home/ServiceAreaSection';
import DirectAnswerBlock3 from '@/components/home/DirectAnswerBlock3';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import FinalCTABanner from '@/components/home/FinalCTABanner';

// ── SEO Metadata ──────────────────────────────────────────────────────────────
export const metadata = {
  title: 'Clinical Lab Trinity FL | Fast Results, Walk-Ins Welcome | Sunshine Clinical Lab',
  description:
    'Sunshine Clinical Lab in Trinity, FL — fast turnaround, walk-in blood work, mobile blood draws, TRT monitoring, DNA testing & gender reveal tests. Serving Pasco County & Tampa Bay. Call (727) 233-5223.',
  keywords: [
    'clinical lab Trinity FL',
    'blood test Trinity FL',
    'lab near me Trinity Florida',
    'walk-in lab Trinity FL',
    'mobile blood draw Pasco County',
    'TRT monitoring Trinity FL',
    'DNA testing Trinity FL',
    'gender reveal blood test Florida',
    'Sunshine Clinical Lab',
    'clinical lab New Port Richey',
    'Pasco County lab',
  ],
  openGraph: {
    title: 'Sunshine Clinical Lab | Trinity, FL | Fast Lab Results & Walk-In Blood Work',
    description:
      'Pasco County\'s trusted independent clinical lab. Blood work, TRT panels, DNA testing, gender reveal tests, mobile phlebotomy. Walk-ins welcome.',
    url: 'https://www.sunshinelabus.com',
    type: 'website',
    locale: 'en_US',
  },
  alternates: {
    canonical: 'https://www.sunshinelabus.com',
  },
};

// ── JSON-LD Schema Objects ─────────────────────────────────────────────────────

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': ['MedicalBusiness', 'LocalBusiness'],
  name: 'Sunshine Clinical Lab LLC',
  image: 'https://www.sunshinelabus.com/images/sunshine-clinical-lab-trinity-fl.jpg',
  url: 'https://www.sunshinelabus.com',
  telephone: '+17272335223',
  priceRange: '$$',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '3600 Galileo Dr, Suite 104',
    addressLocality: 'Trinity',
    addressRegion: 'FL',
    postalCode: '34655',
    addressCountry: 'US',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 28.1881,
    longitude: -82.6834,
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '08:00',
      closes: '17:00',
    },
  ],
  areaServed: [
    { '@type': 'City', 'name': 'Trinity' },
    { '@type': 'City', 'name': 'New Port Richey' },
    { '@type': 'City', 'name': "Land O' Lakes" },
    { '@type': 'City', 'name': 'Tarpon Springs' },
    { '@type': 'AdministrativeArea', 'name': 'Pasco County' },
  ],
  medicalSpecialty: 'Laboratory',
  description:
    'Independent clinical laboratory in Trinity, FL offering fast blood work, TRT monitoring panels, DNA testing, gender reveal testing, mobile phlebotomy, and more. Walk-ins welcome. Serving Pasco County and Tampa Bay.',
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Clinical Lab Services',
    itemListElement: [
      { '@type': 'Offer', itemOffered: { '@type': 'MedicalTest', name: 'Routine Blood Work' } },
      { '@type': 'Offer', itemOffered: { '@type': 'MedicalTest', name: 'TRT Monitoring Panels' } },
      { '@type': 'Offer', itemOffered: { '@type': 'MedicalTest', name: 'DNA Testing' } },
      { '@type': 'Offer', itemOffered: { '@type': 'MedicalTest', name: 'Gender Reveal Blood Test' } },
      { '@type': 'Offer', itemOffered: { '@type': 'MedicalTest', name: 'Mobile Blood Draw' } },
    ],
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQ_DATA.map((item) => ({
    '@type': 'Question',
    name: item.q,
    acceptedAnswer: {
      '@type': 'Answer',
      text: item.a,
    },
  })),
};

// ── Page ──────────────────────────────────────────────────────────────────────
export default function HomePage() {
  return (
    <>
      {/* JSON-LD Schema — rendered server-side for SEO crawlers */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Section 1 — Hero */}
      <HomeHero />

      {/* Section 2 — Intro / Problem-Agitation */}
      <IntroSection />

      {/* Direct Answer Block 1 — What Is Sunshine Clinical Lab? */}
      <DirectAnswerBlock1 />

      {/* Section 3 — Why Choose Us (6 cards) */}
      <WhyChooseUs />

      {/* Direct Answer Block 2 — Why Do Patients Choose Us? */}
      <DirectAnswerBlock2 />

      {/* Section 4 — Services Grid (tabbed) */}
      <ServicesGridSection />

      {/* Section 5 — Mobile Blood Draw */}
      <MobileBloodDrawSection />

      {/* Section 6 — TRT / Hormone Monitoring */}
      <TRTSection />

      {/* Section 7 — Gender Reveal Testing */}
      <GenderRevealSection />

      {/* Section 8 — DNA Testing */}
      <DNATestingSection />

      {/* Section 9 — Insurance */}
      <InsuranceSection />

      {/* Section 10 — FAQ Accordion */}
      <FAQSection />

      {/* Section 11 — Service Area */}
      <ServiceAreaSection />

      {/* Direct Answer Block 3 — Walk-In Lab Near Me */}
      <DirectAnswerBlock3 />

      {/* Section 12 — Final CTA Banner */}
      <FinalCTABanner />

      {/* Section 13 — Testimonials & Review CTA */}
      <TestimonialsSection />
    </>
  );
}
