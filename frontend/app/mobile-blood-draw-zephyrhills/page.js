import MobileBloodDrawZephyrhillsPage from '@/components/MobileBloodDrawZephyrhillsPage';

export const metadata = {
  title: 'Mobile Blood Draw Zephyrhills & Dade City FL | Spanish-Speaking Phlebotomist',
  description:
    'Mobile blood draw in Zephyrhills, Dade City & San Antonio, FL. Routine blood work, TRT, DNA testing at your home. ¡Hablamos español! Early morning draws. Call (727) 233-5223.',
  keywords: [
    'mobile blood draw Zephyrhills FL',
    'home blood draw Zephyrhills',
    'mobile phlebotomy Dade City FL',
    'blood draw at home 33539',
    'home blood draw Dade City FL',
    'mobile blood draw for seniors Zephyrhills',
    'blood work at home San Antonio FL',
    'Spanish speaking lab near me',
  ],
  openGraph: {
    title: 'Mobile Blood Draw Zephyrhills & Dade City FL | Spanish-Speaking Phlebotomist | Sunshine Clinical Lab',
    description:
      'Mobile blood draw in Zephyrhills, Dade City & San Antonio, FL. Routine blood work, TRT, DNA testing at your home. ¡Hablamos español! Early morning draws. Call (727) 233-5223.',
    url: 'https://www.sunshinelabus.com/mobile-blood-draw-zephyrhills',
    siteName: 'Sunshine Clinical Lab',
    locale: 'en_US',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.sunshinelabus.com/mobile-blood-draw-zephyrhills',
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
    'Zephyrhills, FL',
    'Dade City, FL',
    'San Antonio, FL',
    'Eastern Pasco County, FL',
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
    'Sunshine Clinical Lab offers mobile blood draw services in Zephyrhills, Dade City, and San Antonio, Florida. A licensed phlebotomist travels to patient homes, offices, and care facilities to perform blood draws on-site. Services include routine blood panels, TRT monitoring, DNA testing, and fasting blood work. A Spanish-speaking phlebotomist is available.',
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
    name: 'Eastern Pasco County, FL',
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
      name: 'How do I schedule a mobile blood draw in Zephyrhills or Dade City?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Call (727) 233-5223 or book online. Select your zip code area and preferred appointment time. Same-week appointments are often available.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do you have a Spanish-speaking phlebotomist?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Our mobile phlebotomist in this area speaks fluent Spanish. Let us know when booking if you prefer your appointment in Spanish. También puede llamar al (727) 233-5223 y hablar en español.',
      },
    },
    {
      '@type': 'Question',
      name: 'How early can I get my blood drawn at home?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Early morning fasting draws are available starting at 3:00 AM, Monday through Friday. This is ideal for patients who work early shifts and can't take time off for lab visits.",
      },
    },
    {
      '@type': 'Question',
      name: 'Do you serve mobile home parks and retirement communities in Zephyrhills?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Our phlebotomist travels to homes throughout Zephyrhills including mobile home communities, retirement parks, and assisted living facilities.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I get immigration DNA testing through your mobile service?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'DNA testing requires an in-office visit for proper chain-of-custody procedures and identification verification. However, we offer immigration DNA testing at our Trinity, FL lab. Our Spanish-speaking staff can guide you through the entire process. Call (727) 233-5223 to schedule.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do you accept insurance in the Zephyrhills/Dade City area?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, we accept most major insurance plans. Affordable self-pay and cash-pay pricing also available. Call to verify your specific coverage.',
      },
    },
    {
      '@type': 'Question',
      name: 'What should I do to prepare for a fasting blood draw at home?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Follow your doctor's fasting instructions — typically no food or drink (except water) for 8-12 hours before the draw. Our team will confirm preparation requirements when you schedule.",
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
      <MobileBloodDrawZephyrhillsPage />
    </>
  );
}
