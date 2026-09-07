import DrugAndToxicologyTestingPage from '@/components/DrugAndToxicologyTestingPage';

export const metadata = {
  title: 'Drug & Toxicology Testing Trinity FL | Workplace & DOT Screening',
  description:
    'Drug and toxicology testing in Trinity, FL & Pasco County. 5 & 10-panel urine screens, hair follicle, oral fluid, and DOT-compliant workplace testing. Call (727) 233-5223.',
  keywords: [
    'drug testing Trinity FL',
    'drug testing Pasco County',
    'workplace drug testing near me',
    'pre-employment drug screening Trinity FL',
    'DOT drug testing Pasco County',
    '10 panel drug test near me',
    'hair follicle drug test Florida',
  ],
  openGraph: {
    title: 'Drug & Toxicology Testing Trinity FL | Sunshine Clinical Lab',
    description:
      'Drug and toxicology testing in Trinity, FL & Pasco County. 5 & 10-panel urine screens, hair follicle, oral fluid, and DOT-compliant workplace testing. Call (727) 233-5223.',
    url: 'https://www.sunshinelabus.com/drug-and-toxicology-testing-fl',
    siteName: 'Sunshine Clinical Lab',
    locale: 'en_US',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.sunshinelabus.com/drug-and-toxicology-testing-fl',
  },
};

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'MedicalBusiness',
  name: 'Sunshine Clinical Lab',
  telephone: '(727) 233-5223',
  url: 'https://www.sunshinelabus.com',
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
    'Holiday, FL',
    'Hudson, FL',
    'Port Richey, FL',
    'Odessa, FL',
    'Lutz, FL',
    'Pasco County, FL',
    'Tarpon Springs, FL',
    'East Lake, FL',
    'Pinellas County, FL',
  ],
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    opens: '08:00',
    closes: '14:00',
  },
};

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Drug & Toxicology Testing',
  serviceType: 'Drug and Toxicology Screening',
  description:
    'Sunshine Clinical Lab offers drug and toxicology testing in Trinity, FL for workplace, legal, and clinical needs, including 5-panel and 10-panel urine screens, hair follicle testing, oral fluid testing, alcohol testing, and DOT-compliant panels.',
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

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What types of drug testing do you offer?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'We offer urine drug screens (5-panel and 10-panel), hair follicle testing, oral fluid (saliva) testing, alcohol testing, prescription drug monitoring, and SAMHSA-5 compliance testing, with confirmatory GC-MS/LC-MS/MS testing available when needed.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do you provide workplace and pre-employment drug testing?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Employers across Pasco County rely on Sunshine Clinical Lab for pre-employment drug screening, random workplace testing, and DOT-compliant panels. Results are delivered promptly to help keep hiring and compliance timelines on track.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do I need an appointment for a drug test?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Many drug screens can be done on a walk-in basis at our Trinity, FL location. For employer-ordered, court-ordered, or chain-of-custody testing, we recommend calling (727) 233-5223 ahead so we can confirm documentation requirements.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is drug testing covered by insurance?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Workplace, legal, and court-ordered drug testing is typically billed directly to the employer or requesting party rather than insurance. Call (727) 233-5223 and our team can confirm billing for your specific situation.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can employers set up an account for ongoing employee testing?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. We work with local employers on pre-employment screening, random testing programs, and DOT-compliant panels. Call (727) 233-5223 to discuss setting up your business for ongoing workplace testing.',
      },
    },
    {
      '@type': 'Question',
      name: 'How is chain-of-custody handled for legal or employer-ordered tests?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Chain-of-custody collections follow standard documentation and identity-verification protocols to keep results defensible for employer, legal, and court-ordered testing. Let our team know when scheduling if your test requires chain-of-custody handling.',
      },
    },
  ],
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
      <DrugAndToxicologyTestingPage />
    </>
  );
}
