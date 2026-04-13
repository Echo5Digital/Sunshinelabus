import TRTBloodTestPage from '@/components/TRTBloodTestPage';

export const metadata = {
  title: 'TRT Blood Test Trinity & New Port Richey FL | Affordable Testosterone Lab | Sunshine Clinical Lab',
  description:
    'Affordable TRT blood testing in Trinity, FL & Pasco County. Testosterone, estradiol, hematocrit, PSA & full hormone panels. Next-day results for many tests. Call (727) 233-5223.',
  keywords: [
    'TRT blood test near me',
    'TRT blood test Pasco County',
    'testosterone blood test Trinity FL',
    'TRT lab work New Port Richey',
    'hormone panel near me',
    'testosterone monitoring lab Pasco County',
    'affordable TRT blood test Tampa Bay',
    'TRT monitoring Trinity FL',
    'free testosterone test Pasco County',
    'estradiol testing Trinity FL',
  ],
  openGraph: {
    title:
      'TRT Blood Test Trinity & New Port Richey FL | Affordable Testosterone Lab | Sunshine Clinical Lab',
    description:
      'Affordable TRT blood testing in Trinity, FL & Pasco County. Testosterone, estradiol, hematocrit, PSA & full hormone panels. Next-day results for many tests. Call (727) 233-5223.',
    url: 'https://sunshineclinicallab.com/trt-blood-test-pasco-county',
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
  name: 'TRT Blood Testing',
  serviceType: 'Testosterone Replacement Therapy Lab Testing',
  description:
    "Sunshine Clinical Lab offers comprehensive TRT blood testing panels in Trinity, FL for men on testosterone replacement therapy. Tests include total and free testosterone, estradiol (E2), hematocrit, CBC, CMP, PSA, SHBG, LH, and FSH. Walk-ins welcome. Next-day results for many tests.",
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
      name: 'How much does a TRT blood test cost at Sunshine Clinical Lab?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Pricing varies depending on the specific panel and tests ordered. Contact us at (727) 233-5223 for current self-pay pricing and insurance verification. Our rates are consistently more affordable than large national chain labs.',
      },
    },
    {
      '@type': 'Question',
      name: "Do I need a doctor's order for TRT blood work?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: "In most cases, yes — a physician's order is required for TRT lab work. If your TRT provider has given you a lab requisition, bring it with you or have them send it to our Trinity office.",
      },
    },
    {
      '@type': 'Question',
      name: 'How fast will I get my TRT results?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'For many common TRT-related blood tests, results are available the next business day. Turnaround may vary for certain specialty markers. Our team will give you a timeline at your visit.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do you offer sensitive estradiol (E2) testing for TRT patients?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. We offer estradiol testing as part of our TRT monitoring panels. Discuss your specific assay needs with our team when scheduling.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I walk in for TRT blood work at your Trinity location?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Walk-ins are welcome at our Trinity, FL location for most blood work including TRT panels. For the fastest experience, you can also call ahead at (727) 233-5223.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do you offer TRT blood work through mobile blood draw in Pasco County?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Absolutely. Our mobile phlebotomy service covers all of Pasco County. We bring TRT lab draws to your home, office, or wherever is most convenient.',
      },
    },
    {
      '@type': 'Question',
      name: 'What TRT blood tests should I get regularly?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Most TRT providers recommend regular monitoring of total and free testosterone, estradiol, hematocrit/CBC, CMP, and PSA at minimum. SHBG, LH, and FSH may also be recommended depending on your protocol. Always follow your prescribing physician\'s specific recommendations.',
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
      <TRTBloodTestPage />
    </>
  );
}
