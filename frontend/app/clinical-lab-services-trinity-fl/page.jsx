import ClinicalLabServicesPage from '@/components/ClinicalLabServicesPage';

export const metadata = {
  title: 'Clinical Lab Services Trinity FL | Blood Tests, Walk-In Lab, Fast Results | Sunshine Clinical Lab',
  description:
    'Comprehensive clinical lab services in Trinity, FL — CBC, CMP, lipid panels, thyroid, A1C, hormone testing & more. Walk-ins welcome, next day results for many tests. Call (727) 233-5223.',
  keywords: [
    'clinical lab services Trinity FL',
    'blood test near me Trinity',
    'walk-in lab Trinity FL',
    'clinical lab Pasco County',
    'blood work near me New Port Richey',
    'same day blood test Trinity FL',
    'lab testing near me Pasco County',
    'walk-in blood work Tampa Bay area'
  ],
  openGraph: {
    title:
      'Clinical Lab Services Trinity FL | Blood Tests, Walk-In Lab, Fast Results | Sunshine Clinical Lab',
    description:
      'Comprehensive clinical lab services in Trinity, FL — CBC, CMP, lipid panels, thyroid, A1C, hormone testing & more. Walk-ins welcome, next day results for many tests. Call (727) 233-5223.',
    url: 'https://sunshineclinicallab.com/clinical-lab-services-trinity-fl',
    siteName: 'Sunshine Clinical Lab',
    locale: 'en_US',
    type: 'website',
  },
};

const medicalBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'MedicalBusiness',
  name: 'Sunshine Clinical Lab',
  telephone: '(727) 233-5223',
  url: 'https://sunshineclinicallab.com/clinical-lab-services-trinity-fl',
  image: 'https://sunshineclinicallab.com/main-logo.webp',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '3600 Galileo Dr',
    addressLocality: 'Trinity',
    addressRegion: 'FL',
    postalCode: '34655',
    addressCountry: 'US',
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '08:00',
      closes: '17:00'
    }
  ],
};

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Sunshine Clinical Lab',
  telephone: '(727) 233-5223',
  url: 'https://sunshineclinicallab.com',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '3600 Galileo Dr',
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
    'Tampa Bay, FL',
    'Pasco County, FL'
  ],
};

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Clinical Lab Services & Walk-In Blood Work',
  serviceType: 'Testing and Blood Work',
  description:
    'Comprehensive clinical laboratory services in Trinity, FL including CBC, CMP, lipid panels, A1C, thyroid testing, liver and kidney function panels, and full hormone testing.',
  provider: {
    '@type': 'MedicalBusiness',
    name: 'Sunshine Clinical Lab',
    telephone: '(727) 233-5223',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '3600 Galileo Dr',
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
      name: 'Do I need an appointment for blood work at Sunshine Clinical Lab in Trinity?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'For most routine blood tests and standard panels, walk-ins are welcome at our Trinity, FL location. No appointment needed for standard services. For specialty tests like DNA or gender reveal, calling ahead is recommended.',
      },
    },
    {
      '@type': 'Question',
      name: 'What should I bring to my lab appointment?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Bring your physician\'s lab order (if applicable), a valid photo ID, and your insurance card. If fasting is required for your specific test, your doctor\'s office or our team will advise you in advance.',
      },
    },
    {
      '@type': 'Question',
      name: 'How fast do I get my results from Sunshine Clinical Lab?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Many routine blood tests — including CBC, CMP, and lipid panels — are available the next business day. Turnaround times vary by test type. Our team will provide a timeline during your visit.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do you accept insurance for lab testing at your Trinity location?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, we accept most major insurance plans. Please contact us at (727) 233-5223 to verify your specific coverage before your visit.',
      },
    },
    {
      '@type': 'Question',
      name: 'What ages do you serve?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'All ages are welcome at Sunshine Clinical Lab — from pediatric patients to seniors. Our experienced phlebotomists are skilled with patients of every age group.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can my doctor send lab orders directly to Sunshine Clinical Lab?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Healthcare providers can send lab requisitions directly to our Trinity, FL office. Contact us at (727) 233-5223 for fax or electronic ordering details.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do you offer blood work on a walk-in basis near New Port Richey?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Our Trinity, FL location at 3600 Galileo Dr is minutes from New Port Richey and welcomes walk-in patients for most routine blood work during business hours.',
      },
    },
    {
      '@type': 'Question',
      name: 'What specialty tests does Sunshine Clinical Lab offer beyond routine blood work?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Beyond standard panels, we specialize in TRT monitoring, full hormone panels, testosterone testing, estradiol, PSA, SHBG, LH/FSH, DNA testing (legal, immigration, paternity), and Peekaboo gender reveal blood tests.',
      },
    }
  ]
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(medicalBusinessSchema) }}
      />
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
      <ClinicalLabServicesPage />
    </>
  );
}
