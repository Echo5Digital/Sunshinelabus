import MobileBloodDrawPage from '@/components/MobileBloodDrawPage';

export const metadata = {
  title:
    'Mobile Blood Draw Pasco County & Trinity FL | Home Phlebotomy | Sunshine Clinical Lab',
  description:
    "Professional mobile blood draw service in Trinity, New Port Richey, Land O' Lakes & Pasco County. Experienced phlebotomists come to your home. Call (727) 233-5223.",
  keywords: [
    'mobile blood draw Pasco County',
    'mobile blood draw near me Trinity FL',
    'home phlebotomy New Port Richey',
    'mobile blood draw Land O Lakes',
    'mobile blood draw Tarpon Springs',
    'home blood draw service near me',
    'mobile phlebotomy Pasco County',
    'at home blood draw Trinity FL',
  ],
  openGraph: {
    title:
      'Mobile Blood Draw Pasco County & Trinity FL | Home Phlebotomy | Sunshine Clinical Lab',
    description:
      "Professional mobile blood draw service in Trinity, New Port Richey, Land O' Lakes & Pasco County. Call (727) 233-5223.",
    url: 'https://sunshineclinicallab.com/mobile-blood-draw-pasco-county',
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
  name: 'Mobile Blood Draw',
  serviceType: 'Mobile Phlebotomy',
  description:
    "Sunshine Clinical Lab's mobile blood draw service sends experienced phlebotomists directly to your home, office, or care facility throughout Pasco County, FL. Available for routine blood work, TRT monitoring, hormone panels, and most physician-ordered tests.",
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
      name: 'How do I schedule a mobile blood draw near Trinity, FL?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Call Sunshine Clinical Lab at (727) 233-5223. Our team will confirm your location, discuss the tests needed, any fasting requirements, and schedule a convenient appointment time.',
      },
    },
    {
      '@type': 'Question',
      name: 'How much does a mobile blood draw cost?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Pricing depends on the tests ordered and your insurance coverage. Contact our team for current pricing details. We accept most major insurance plans and offer competitive self-pay rates.',
      },
    },
    {
      '@type': 'Question',
      name: "Do I need a doctor's order for a mobile blood draw?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Many tests require a physician's order. If you have one, have it ready when you call. If you're unsure what you need, our team can guide you through the process.",
      },
    },
    {
      '@type': 'Question',
      name: 'What areas do you cover for mobile blood draws in Pasco County?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "We serve Trinity, New Port Richey, Land O' Lakes, Tarpon Springs, Holiday, Hudson, Port Richey, Odessa, East Lake, and surrounding communities. Call to confirm availability in your specific area.",
      },
    },
    {
      '@type': 'Question',
      name: 'Is mobile phlebotomy covered by insurance?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Coverage varies by plan and test type. We accept most major insurance plans and will help you verify coverage when you call to schedule.',
      },
    },
    {
      '@type': 'Question',
      name: 'How long does a mobile blood draw appointment take?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Most mobile appointments take 15 to 30 minutes, depending on the number of tests. Our phlebotomists are efficient and professional — no unnecessary delays.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I get TRT blood work done through a mobile blood draw?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Our mobile phlebotomy service supports full TRT monitoring panels including testosterone, estradiol, hematocrit, CBC, CMP, and more — all drawn at your home with the same fast turnaround.',
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
      <MobileBloodDrawPage />
    </>
  );
}
