import MobileBloodDrawTheVillagesPage from '@/components/MobileBloodDrawTheVillagesPage';

export const metadata = {
  title: 'Mobile Blood Draw The Villages FL | Home Blood Draw Bushnell & Sumter County',
  description:
    'Mobile blood draw service in The Villages, Bushnell & Sumter County. Experienced phlebotomist comes to your home. Routine labs, TRT, DNA testing. Book online or call (727) 233-5223.',
  keywords: [
    'mobile blood draw The Villages FL',
    'home blood draw The Villages',
    'mobile phlebotomy The Villages',
    'home blood draw Bushnell FL',
    'blood draw at home Sumter County',
    'mobile blood draw for seniors The Villages',
    'mobile lab service near The Villages',
  ],
  openGraph: {
    title: 'Mobile Blood Draw The Villages FL | Home Blood Draw Bushnell & Sumter County | Sunshine Clinical Lab',
    description:
      'Mobile blood draw service in The Villages, Bushnell & Sumter County. Experienced phlebotomist comes to your home. Routine labs, TRT, DNA testing. Book online or call (727) 233-5223.',
    url: 'https://www.sunshinelabus.com/mobile-blood-draw-the-villages',
    siteName: 'Sunshine Clinical Lab',
    locale: 'en_US',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.sunshinelabus.com/mobile-blood-draw-the-villages',
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
    'The Villages, FL',
    'Bushnell, FL',
    'Wildwood, FL',
    'Coleman, FL',
    'Webster, FL',
    'Sumter County, FL',
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
    "Sunshine Clinical Lab's mobile blood draw service sends an experienced phlebotomist directly to your home, assisted living facility, or care community throughout The Villages, Bushnell, Wildwood, and surrounding Sumter County communities. Services include routine blood panels (CBC, CMP, lipid, A1C, thyroid), TRT/hormone monitoring, DNA testing, and fasting blood work.",
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
    name: 'Sumter County, FL',
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
      name: 'How do I schedule a mobile blood draw in The Villages?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Call Sunshine Clinical Lab at (727) 233-5223 or book online through our website. We'll confirm your address, the tests needed, any preparation requirements, and your preferred appointment time.",
      },
    },
    {
      '@type': 'Question',
      name: 'How early can I get a fasting blood draw at home?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Our phlebotomist is available starting as early as 3:00 AM for fasting blood work. Get your labs done before breakfast without leaving your home.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do you accept insurance for mobile blood draws?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, we accept most major insurance plans. We also offer competitive self-pay pricing for patients without insurance or who prefer to pay out of pocket. Call (727) 233-5223 to verify your coverage.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do you serve assisted living facilities in The Villages area?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. We provide on-site blood draws at assisted living facilities, memory care communities, and nursing homes. No patient transport needed. Contact us to discuss a partnership for your facility.',
      },
    },
    {
      '@type': 'Question',
      name: 'How fast will I get my results?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'For many routine blood tests, results are available the next business day. Turnaround varies by test type. Our team will provide a timeline when you schedule.',
      },
    },
    {
      '@type': 'Question',
      name: 'What if I have difficult veins?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Our phlebotomists have over 35 years of combined experience and specialize in difficult veins, thin skin, and patients who've had painful draws in the past. Being in your own home also helps you relax, which makes the draw easier.",
      },
    },
    {
      '@type': 'Question',
      name: 'What areas do you cover near The Villages?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'We serve The Villages, Bushnell, Wildwood, Coleman, Webster, and surrounding Sumter County communities. Call (727) 233-5223 to confirm availability in your specific location.',
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
      <MobileBloodDrawTheVillagesPage />
    </>
  );
}
