import DNATestingPage from '@/components/DNATestingPage';

export const metadata = {
  title: 'DNA Testing Trinity FL & Pasco County | Legal, Paternity & Immigration DNA | Sunshine Clinical Lab',
  description:
    'Professional DNA testing in Trinity, FL — legal paternity, immigration DNA (USCIS), and relationship testing. Chain-of-custody protocols. Serving Pasco County. Call (727) 233-5223.',
  keywords: [
    'DNA testing near me Pasco County',
    'DNA testing Trinity FL',
    'paternity test near me',
    'legal DNA test New Port Richey',
    'immigration DNA testing Florida',
    'USCIS DNA test Pasco County',
    'legal paternity testing Trinity FL',
    'relationship DNA testing Pasco County',
    'chain of custody DNA test Florida',
    'AABB accredited DNA testing Tampa Bay',
  ],
  openGraph: {
    title:
      'DNA Testing Trinity FL & Pasco County | Legal, Paternity & Immigration DNA | Sunshine Clinical Lab',
    description:
      'Professional DNA testing in Trinity, FL — legal paternity, immigration DNA (USCIS), and relationship testing. Chain-of-custody protocols. Serving Pasco County. Call (727) 233-5223.',
    url: 'https://sunshineclinicallab.com/dna-testing-pasco-county',
    siteName: 'Sunshine Clinical Lab',
    locale: 'en_US',
    type: 'website',
  },
};

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
  ],
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    opens: '08:00',
    closes: '17:00',
  },
};

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'DNA Testing',
  serviceType: 'Legal, Immigration, and Paternity DNA Testing',
  description:
    'Sunshine Clinical Lab offers professional DNA testing in Trinity, FL for legal, immigration (USCIS), paternity, and relationship purposes. All legal and immigration tests are performed under strict chain-of-custody protocols, ensuring court admissibility and government acceptance. DNA collection is non-invasive (cheek swab). Serving Pasco County and the Tampa Bay region.',
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
      name: 'How much does DNA testing cost at Sunshine Clinical Lab?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Pricing varies depending on the type of test (legal, immigration, informational) and the number of participants. Please contact us at (727) 233-5223 for current pricing.',
      },
    },
    {
      '@type': 'Question',
      name: 'How long do DNA test results take?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Results timelines depend on the test type and the processing laboratory. Our team will provide an estimated turnaround time when you schedule your appointment at our Trinity location.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is your DNA testing legally admissible in court?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. When performed under chain-of-custody protocols at our Trinity, FL facility, our legal and immigration DNA testing produces results that are admissible in court and accepted by government agencies including USCIS.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do I need an appointment for DNA testing?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, we recommend scheduling DNA testing appointments in advance to ensure all participants, documentation, and identification requirements are properly coordinated. Call (727) 233-5223.',
      },
    },
    {
      '@type': 'Question',
      name: 'What do I need to bring to a DNA test appointment?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'All participants must bring valid government-issued photo identification for legal and immigration DNA testing. For informational testing, requirements may vary — our team will advise when you schedule.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I get immigration DNA testing (USCIS) at Sunshine Clinical Lab?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. We handle immigration DNA testing required by USCIS, including full chain-of-custody collection, proper documentation, photographic verification, and coordination with AABB-accredited laboratories. Our Trinity, FL office serves patients from across Pasco County and Tampa Bay.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is DNA testing at Sunshine Clinical Lab confidential?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Absolutely. All DNA testing is handled with complete confidentiality and professionalism. Your results and personal information are protected throughout the entire process.',
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
      <DNATestingPage />
    </>
  );
}
