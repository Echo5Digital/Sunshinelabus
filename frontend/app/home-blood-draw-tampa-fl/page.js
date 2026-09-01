import HomeBloodDrawTampaPage from '@/components/HomeBloodDrawTampaPage';

export const metadata = {
  title: {
    absolute: 'Home Blood Draw Tampa FL | Mobile Phlebotomy Service',
  },
  description:
    'Sunshine Clinical Labs sends a phlebotomist to your home in Tampa for scheduled blood collection. Ideal for seniors, homebound patients, and TRT monitoring.',
  keywords: [
    'home blood draw Tampa FL',
    'at home blood draw Tampa',
    'in-home blood draw Tampa',
    'mobile phlebotomy Tampa',
    'mobile phlebotomist Tampa',
    'phlebotomist to your home Tampa',
    'blood test at home Tampa',
    'home phlebotomy Tampa',
    'mobile blood draw Hillsborough County',
    'home blood draw Hillsborough County',
  ],
  openGraph: {
    title: 'Home Blood Draw Tampa FL | Mobile Phlebotomy Service',
    description:
      'Sunshine Clinical Labs sends a phlebotomist to your home in Tampa for scheduled blood collection. Ideal for seniors, homebound patients, and TRT monitoring.',
    url: 'https://www.sunshinelabus.com/home-blood-draw-tampa-fl',
    siteName: 'Sunshine Clinical Lab',
    locale: 'en_US',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.sunshinelabus.com/home-blood-draw-tampa-fl',
  },
};

const PAGE_URL = 'https://www.sunshinelabus.com/home-blood-draw-tampa-fl';

// Canonical entity for Sunshine Clinical Labs' Trinity laboratory. Referenced by @id
// so this page does not create a second LocalBusiness/DiagnosticLab entity for Tampa.
const diagnosticLabSchema = {
  '@context': 'https://schema.org',
  '@type': 'DiagnosticLab',
  '@id': 'https://www.sunshinelabus.com/#diagnosticlab',
  name: 'Sunshine Clinical Labs',
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
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    opens: '08:00',
    closes: '14:00',
  },
};

const webPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': `${PAGE_URL}#webpage`,
  url: PAGE_URL,
  name: 'Home Blood Draw Tampa FL | Mobile Phlebotomy Service',
  description:
    'Sunshine Clinical Labs sends a phlebotomist to your home in Tampa for scheduled blood collection. Ideal for seniors, homebound patients, and TRT monitoring.',
  isPartOf: {
    '@type': 'WebSite',
    url: 'https://www.sunshinelabus.com',
    name: 'Sunshine Clinical Lab',
  },
  about: {
    '@id': 'https://www.sunshinelabus.com/#diagnosticlab',
  },
};

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Home Blood Draw',
  serviceType: 'Blood Specimen Collection',
  description:
    'Sunshine Clinical Labs sends a phlebotomist to a patient’s home for scheduled blood collection in Tampa, FL and select Hillsborough County areas. Services include routine blood panels (CBC, CMP, lipid, A1C), thyroid, liver and kidney function testing, and TRT/hormone monitoring.',
  provider: {
    '@id': 'https://www.sunshinelabus.com/#diagnosticlab',
  },
  areaServed: [
    {
      '@type': 'City',
      name: 'Tampa, FL',
    },
    {
      '@type': 'AdministrativeArea',
      name: 'Hillsborough County, FL',
    },
  ],
  availableChannel: {
    '@type': 'ServiceChannel',
    servicePhone: {
      '@type': 'ContactPoint',
      telephone: '(727) 233-5223',
      contactType: 'customer service',
    },
  },
};

// Middle crumb points at the Mobile Blood Draw hub for now — swap to the dedicated
// Service Areas Hub URL once that page's structure is finalized.
const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: 'https://www.sunshinelabus.com',
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Service Areas',
      item: 'https://www.sunshinelabus.com/mobile-blood-draw-pasco-county',
    },
    {
      '@type': 'ListItem',
      position: 3,
      name: 'Home Blood Draw (Tampa)',
      item: PAGE_URL,
    },
  ],
};

// Mirrors the FAQ_ITEMS rendered in HomeBloodDrawTampaPage.jsx — keep in sync with that file.
const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Can someone come to my home in Tampa to draw blood?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Sunshine Clinical Labs offers scheduled home blood draws in Tampa and select Hillsborough County areas.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I schedule an at-home blood draw?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Call (727) 233-5223 or use the scheduling option on this page to arrange a home visit.',
      },
    },
    {
      '@type': 'Question',
      name: 'Who can use home phlebotomy?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Home draws are available to patients who need or prefer blood work collected outside of a lab setting, including seniors, homebound patients, and those with limited mobility.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can you draw blood at home for an elderly parent?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. A caregiver or adult child can schedule the visit on behalf of a parent or family member.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can a phlebotomist come to an assisted living community?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, this can be arranged. Contact our team to discuss scheduling for a facility or community.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I have TRT blood work drawn at home?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, TRT and hormone-monitoring panels can typically be drawn at home. Contact our team to confirm any markers that require special handling or cannot be drawn outside a lab setting.',
      },
    },
    {
      '@type': 'Question',
      name: 'What blood tests can be collected at home?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Many routine and specialty tests can be collected at home, including CBC, metabolic panels, lipid panels, and TRT monitoring. Contact our team to confirm your specific test.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does insurance cover home blood draws?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Coverage varies by plan and test. Contact our team to confirm whether a separate home-draw fee applies and how it is billed.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does Sunshine Clinical Labs have a walk-in lab in Tampa?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. Sunshine Clinical Labs does not operate a walk-in laboratory in Tampa. The walk-in location is in Trinity, FL. Home draws are how Sunshine Clinical Labs serves Tampa-area patients.',
      },
    },
  ],
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(diagnosticLabSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <HomeBloodDrawTampaPage />
    </>
  );
}
