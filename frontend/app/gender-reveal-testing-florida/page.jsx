import GenderRevealPage from '@/components/GenderRevealPage';

export const metadata = {
  title: 'Gender Reveal Blood Test Florida | Peekaboo Test as Early as 7 Weeks | Sunshine Clinical Lab Trinity FL',
  description:
    'Find out your baby\'s gender as early as 7 weeks with the Peekaboo gender reveal blood test at Sunshine Clinical Lab in Trinity, FL. Simple, accurate, exciting. Call (727) 233-5223.',
  keywords: [
    'gender reveal blood test Florida',
    'gender reveal blood test near me',
    'Peekaboo gender test Trinity FL',
    'early gender blood test Pasco County',
    'baby gender test near me',
    'gender reveal test Tampa Bay',
    'how early can I find out baby gender blood test Florida',
    'Peekaboo early gender reveal test',
    'gender reveal Trinity FL',
    'gender reveal Pasco County',
  ],
  openGraph: {
    title: 'Gender Reveal Blood Test Florida | Peekaboo Test as Early as 7 Weeks | Sunshine Clinical Lab Trinity FL',
    description:
      'Find out your baby\'s gender as early as 7 weeks with the Peekaboo gender reveal blood test at Sunshine Clinical Lab in Trinity, FL. Simple, accurate, exciting. Call (727) 233-5223.',
    url: 'https://sunshineclinicallab.com/gender-reveal-testing-florida',
    siteName: 'Sunshine Clinical Lab',
    locale: 'en_US',
    type: 'website',
  },
};

/* ─── Schema: LocalBusiness ─────────────────────────────────── */
const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'MedicalBusiness',
  name: 'Sunshine Clinical Lab',
  telephone: '(727) 233-5223',
  url: 'https://sunshineclinicallab.com',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '3600 Galileo Dr, Suite 104',
    addressLocality: 'Trinity',
    addressRegion: 'FL',
    postalCode: '34655',
    addressCountry: 'US',
  },
  areaServed: [
    'Trinity, FL',
    'New Port Richey, FL',
    "Land O' Lakes, FL",
    'Tarpon Springs, FL',
    'Holiday, FL',
    'Hudson, FL',
    'Port Richey, FL',
    'Odessa, FL',
    'Lutz, FL',
    'East Lake, FL',
    'Pasco County, FL',
    'Tampa Bay, FL',
  ],
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    opens: '08:00',
    closes: '17:00',
  },
};

/* ─── Schema: Service ───────────────────────────────────────── */
const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Peekaboo Early Gender Reveal Blood Test',
  serviceType: 'Early Gender Determination Blood Testing',
  description:
    "Sunshine Clinical Lab offers the Peekaboo Early Gender Reveal Blood Test in Trinity, FL — a simple, non-invasive blood draw that determines fetal gender as early as 7 weeks into pregnancy by detecting cell-free fetal DNA in the mother's bloodstream. Results available within a few business days. Sealed results available for gender reveal parties.",
  provider: {
    '@type': 'MedicalBusiness',
    name: 'Sunshine Clinical Lab',
    telephone: '(727) 233-5223',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '3600 Galileo Dr, Suite 104',
      addressLocality: 'Trinity',
      addressRegion: 'FL',
      postalCode: '34655',
      addressCountry: 'US',
    },
  },
  areaServed: {
    '@type': 'AdministrativeArea',
    name: 'Pasco County, FL',
  },
  availableChannel: {
    '@type': 'ServiceChannel',
    servicePhone: {
      '@type': 'ContactPoint',
      telephone: '(727) 233-5223',
      contactType: 'customer service',
    },
  },
};

/* ─── Schema: FAQPage ───────────────────────────────────────── */
const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How early can the Peekaboo gender reveal test be done?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "The Peekaboo test can determine your baby's gender as early as 7 weeks into pregnancy. This is significantly earlier than a traditional anatomy ultrasound, which typically occurs around 18 to 20 weeks.",
      },
    },
    {
      '@type': 'Question',
      name: 'Is the Peekaboo gender reveal blood test accurate?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The Peekaboo test is a clinically validated, non-invasive blood test that is widely regarded as one of the most reliable early gender determination methods available in the United States.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is the gender reveal blood test safe for my baby?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Yes. The test involves a simple blood draw from the mother's arm — the same type of draw used for routine prenatal blood work. It is completely non-invasive to the baby and carries no additional risk beyond a standard blood draw.",
      },
    },
    {
      '@type': 'Question',
      name: 'How long does it take to get gender reveal test results?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Results are typically available within a few business days after your blood draw at our Trinity, FL location. Our team will give you an estimated timeline when you schedule your appointment.',
      },
    },
    {
      '@type': 'Question',
      name: "Do I need a doctor's order for the Peekaboo gender reveal blood test?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Contact our office at (727) 233-5223 for specific requirements and scheduling details. Our team will walk you through everything needed for your appointment.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I get my results in a sealed envelope for a gender reveal party?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Absolutely. Let us know when you schedule, and we'll seal your results so you can plan the perfect reveal moment — whether that's a party, a private opening, or handing the envelope to your baker or party planner.",
      },
    },
    {
      '@type': 'Question',
      name: 'How much does the gender reveal blood test cost at Sunshine Clinical Lab?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Contact our team at (727) 233-5223 for current Peekaboo test pricing. The test is competitively priced and is a straightforward out-of-pocket expense for most families. This service is typically not covered by insurance.',
      },
    },
    {
      '@type': 'Question',
      name: 'Where is Sunshine Clinical Lab located for the gender reveal test?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Our lab is located at 3600 Galileo Dr, Suite 104, Trinity, FL 34655 — easily accessible from New Port Richey, Land O' Lakes, Tarpon Springs, and communities across Pasco County and Tampa Bay. Free parking is on site.",
      },
    },
  ],
};

/* ─── Schema: Product ───────────────────────────────────────── */
const productSchema = {
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: 'Peekaboo Early Gender Reveal Blood Test',
  description:
    "Clinically validated non-invasive blood test to determine baby gender as early as 7 weeks of pregnancy. Detects cell-free fetal DNA in the mother's bloodstream. Available at Sunshine Clinical Lab in Trinity, FL.",
  brand: {
    '@type': 'Brand',
    name: 'Peekaboo',
  },
  seller: {
    '@type': 'MedicalBusiness',
    name: 'Sunshine Clinical Lab',
    telephone: '(727) 233-5223',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '3600 Galileo Dr, Suite 104',
      addressLocality: 'Trinity',
      addressRegion: 'FL',
      postalCode: '34655',
      addressCountry: 'US',
    },
  },
  offers: {
    '@type': 'Offer',
    availability: 'https://schema.org/InStock',
    seller: {
      '@type': 'MedicalBusiness',
      name: 'Sunshine Clinical Lab',
    },
    areaServed: {
      '@type': 'AdministrativeArea',
      name: 'Pasco County, FL',
    },
  },
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <GenderRevealPage />
    </>
  );
}
