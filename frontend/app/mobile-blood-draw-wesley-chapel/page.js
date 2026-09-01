import MobileBloodDrawWesleyChapelPage from '@/components/MobileBloodDrawWesleyChapelPage';

export const metadata = {
  title: 'Mobile Blood Draw Wesley Chapel FL | Home Phlebotomy & TRT Labs',
  description:
    'Mobile blood draw in Wesley Chapel, FL. Routine blood work, TRT monitoring & DNA testing at your home or office. Early morning draws available. Call (727) 233-5223 or book online.',
  keywords: [
    'mobile blood draw Wesley Chapel FL',
    'home blood draw Wesley Chapel',
    'mobile phlebotomy Wesley Chapel',
    'TRT blood test Wesley Chapel',
    'blood work at home 33544',
    'home blood draw 33545',
  ],
  openGraph: {
    title: 'Mobile Blood Draw Wesley Chapel FL | Home Phlebotomy & TRT Labs | Sunshine Clinical Lab',
    description:
      'Mobile blood draw in Wesley Chapel, FL. Routine blood work, TRT monitoring & DNA testing at your home or office. Early morning draws available. Call (727) 233-5223 or book online.',
    url: 'https://www.sunshinelabus.com/mobile-blood-draw-wesley-chapel',
    siteName: 'Sunshine Clinical Lab',
    locale: 'en_US',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.sunshinelabus.com/mobile-blood-draw-wesley-chapel',
  },
};

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
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
    'Wesley Chapel, FL',
    'Wiregrass, FL',
    'Seven Oaks, FL',
    'Meadow Pointe, FL',
    'Bexley, FL',
    'Epperson, FL',
    'Chapel Pines, FL',
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
  name: 'Mobile Blood Draw',
  serviceType: 'Mobile Phlebotomy',
  description:
    "Sunshine Clinical Lab provides mobile blood draw services in Wesley Chapel, FL, including the 33544 and 33545 zip codes. A licensed phlebotomist travels to your home or office to perform blood draws. Services include routine blood panels (CBC, CMP, lipid, A1C), TRT/testosterone monitoring, DNA testing, and fasting blood work.",
  provider: {
    '@type': 'LocalBusiness',
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
    name: 'Wesley Chapel, FL',
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
      name: 'How do I book a mobile blood draw in Wesley Chapel?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Call (727) 233-5223 or book online. Select "Wesley Chapel" as your service area and choose your preferred appointment time.',
      },
    },
    {
      '@type': 'Question',
      name: 'How early can I get blood drawn at home in Wesley Chapel?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Our phlebotomist is available starting at 3:00 AM for early morning fasting draws. Morning appointments run from 9:00 AM to 2:30 PM.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do you offer TRT blood work at home in Wesley Chapel?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. We provide complete TRT monitoring panels at your home — total/free testosterone, estradiol, hematocrit, PSA, CBC, CMP, and more, at affordable pricing.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is a Spanish-speaking phlebotomist available in Wesley Chapel?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Yes. Our phlebotomist speaks fluent Spanish. Let us know when booking if you'd prefer your appointment in Spanish.",
      },
    },
    {
      '@type': 'Question',
      name: 'What zip codes do you cover in Wesley Chapel?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'We cover 33544, 33545, and surrounding areas including Wiregrass, Seven Oaks, Meadow Pointe, Bexley, and nearby communities.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do you accept insurance for home blood draws in Wesley Chapel?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, most major insurance plans are accepted. We also offer competitive self-pay pricing. Call (727) 233-5223 to verify your coverage.',
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
      <MobileBloodDrawWesleyChapelPage />
    </>
  );
}
