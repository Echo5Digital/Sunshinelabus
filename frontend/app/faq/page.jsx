import FAQPage from '@/components/FAQPage';

export const metadata = {
  title: 'FAQ | Clinical Lab Trinity FL & Pasco County | Sunshine Clinical Lab',
  description:
    'Frequently asked questions about Sunshine Clinical Lab in Trinity, FL — services, insurance, appointments, mobile blood draws, DNA testing, TRT labs, gender reveal tests & more.',
  keywords: [
    'Sunshine Clinical Lab FAQ',
    'lab testing questions Trinity FL',
    'clinical lab FAQ Pasco County',
    'do I need appointment for blood work near me',
    'how fast are lab results',
    'walk in lab near me questions',
    'blood work Trinity FL questions',
    'clinical lab Trinity FL',
    'Pasco County lab testing FAQ',
    'mobile blood draw questions',
    'TRT blood test questions',
    'DNA testing FAQ Florida',
    'gender reveal blood test questions',
  ],
  openGraph: {
    title: 'FAQ | Clinical Lab Trinity FL & Pasco County | Sunshine Clinical Lab',
    description:
      'Frequently asked questions about Sunshine Clinical Lab in Trinity, FL — services, insurance, appointments, mobile blood draws, DNA testing, TRT labs, gender reveal tests & more.',
    url: 'https://sunshineclinicallab.com/faq',
    siteName: 'Sunshine Clinical Lab',
    locale: 'en_US',
    type: 'website',
  },
};

/* ─── Schema: LocalBusiness ──────────────────────────────────── */
const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'MedicalBusiness',
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

/* ─── Schema: FAQPage ────────────────────────────────────────── */
const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    /* General Questions */
    {
      '@type': 'Question',
      name: 'Where is Sunshine Clinical Lab located?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "We're located at 3600 Galileo Dr, Trinity, FL 34655, USA. Our office is easily accessible from US-19, the Suncoast Parkway, SR-54, and Little Road, with free parking on-site. We serve patients from Trinity, New Port Richey, Land O' Lakes, Tarpon Springs, and communities across Pasco County and Tampa Bay.",
      },
    },
    {
      '@type': 'Question',
      name: 'What are your hours of operation?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Please call our office at (727) 233-5223 or visit sunshinelabus.com for current hours. We recommend calling ahead for the most up-to-date schedule, especially around holidays.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do I need an appointment for blood work?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'For most routine blood work and standard lab tests, walk-ins are welcome at our Trinity, FL location — no appointment necessary. For specialty services such as DNA testing and gender reveal blood tests, we recommend scheduling in advance by calling (727) 233-5223.',
      },
    },
    {
      '@type': 'Question',
      name: 'What should I bring to my lab appointment?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Bring your physician's lab order (if applicable), a valid government-issued photo ID, and your insurance card. If your test requires fasting, your provider or our team will advise you in advance.",
      },
    },
    {
      '@type': 'Question',
      name: 'Do you serve patients of all ages?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Sunshine Clinical Lab welcomes patients of all ages, from pediatric to geriatric. Our experienced phlebotomists are skilled with every age group, including children and patients with difficult veins.',
      },
    },
    {
      '@type': 'Question',
      name: 'What makes Sunshine Clinical Lab different from chain labs?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "We're locally owned and operated in Trinity, FL, with over 35 years of combined phlebotomy experience. Our patients experience significantly shorter wait times, personalized care, competitive pricing, specialty services like TRT monitoring and DNA testing, and mobile blood draw convenience — things that large national chain labs simply aren't designed to prioritize.",
      },
    },
    /* Results & Turnaround */
    {
      '@type': 'Question',
      name: 'How fast will I get my lab results?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'For many routine blood tests — including CBC, CMP, lipid panels, and A1C — results are available the next business day. Turnaround times vary for specialty tests and certain markers. Our team will provide an estimated timeline during your visit.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I receive my results?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Results are typically sent to your ordering physician. Ask our team about available options for accessing your results directly if needed.',
      },
    },
    {
      '@type': 'Question',
      name: 'Are results from mobile blood draws slower than in-office draws?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. Samples drawn at your home through our mobile phlebotomy service are processed through the same pipeline as in-office draws at our Trinity lab. Turnaround times are the same.',
      },
    },
    /* Insurance & Pricing */
    {
      '@type': 'Question',
      name: 'What insurance plans do you accept?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'We accept most major insurance plans. Contact us at (727) 233-5223 to verify your specific coverage before your visit.',
      },
    },
    {
      '@type': 'Question',
      name: "What if I don't have insurance?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: "We offer competitive self-pay rates on all services. As an independent lab in Trinity, FL, our pricing is often more affordable than large chain labs. Call us for specific pricing.",
      },
    },
    {
      '@type': 'Question',
      name: 'How much does blood work cost without insurance?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Pricing varies by test. Call (727) 233-5223 for self-pay rates on the specific tests you need. We're transparent about costs and happy to discuss pricing before your visit.",
      },
    },
    {
      '@type': 'Question',
      name: 'Are DNA testing and gender reveal tests covered by insurance?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'DNA testing (legal, immigration, paternity) and the Peekaboo gender reveal blood test are typically self-pay services not covered by insurance. Contact us for current pricing on both.',
      },
    },
    /* Mobile Blood Draw */
    {
      '@type': 'Question',
      name: 'Do you offer mobile blood draws near me?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Yes. Our mobile phlebotomy team provides blood draws at your home, office, or care facility throughout Pasco County, including Trinity, New Port Richey, Land O' Lakes, Tarpon Springs, Holiday, Hudson, and surrounding communities. Call (727) 233-5223 to schedule.",
      },
    },
    {
      '@type': 'Question',
      name: 'How do I schedule a mobile blood draw?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Call (727) 233-5223 to schedule. We'll confirm your location, the tests needed, any fasting or preparation requirements, and a convenient appointment time.",
      },
    },
    {
      '@type': 'Question',
      name: 'What areas do you cover for mobile phlebotomy?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "We serve communities throughout Pasco County and the greater Tampa Bay region, including Trinity, New Port Richey, Land O' Lakes, Tarpon Springs, Holiday, Hudson, Port Richey, Odessa, East Lake, and more. Call to confirm availability in your specific area.",
      },
    },
    {
      '@type': 'Question',
      name: 'Can I get TRT or hormone blood work done through a mobile draw?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Our mobile phlebotomy service supports full TRT monitoring panels, hormone testing, and most physician-ordered blood work — all drawn at your location with the same fast turnaround as in-office visits.',
      },
    },
    /* TRT & Hormone Testing */
    {
      '@type': 'Question',
      name: 'Do you offer TRT blood testing at Sunshine Clinical Lab?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. We provide comprehensive TRT monitoring panels including total and free testosterone, estradiol (E2), hematocrit, CBC, CMP, PSA, SHBG, LH, and FSH. Results for many TRT-related tests are available the next business day. Walk-ins are welcome at our Trinity, FL location.',
      },
    },
    {
      '@type': 'Question',
      name: 'How much does TRT blood work cost?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Pricing depends on the specific panel and your insurance coverage. Contact us at (727) 233-5223 for current self-pay rates and insurance verification. Our TRT panel pricing is competitive — often significantly less than chain labs.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I walk in for TRT labs?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, walk-ins are welcome for most blood work including TRT panels at our Trinity, FL location.',
      },
    },
    {
      '@type': 'Question',
      name: 'What TRT tests should I get regularly?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Most TRT providers recommend monitoring total and free testosterone, estradiol, hematocrit/CBC, CMP, and PSA at minimum. SHBG, LH, and FSH may also be recommended. Always follow your prescribing physician's specific protocol.",
      },
    },
    /* DNA Testing */
    {
      '@type': 'Question',
      name: 'What types of DNA testing do you offer?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'We offer legal DNA testing, immigration DNA testing (USCIS), paternity testing (legal and informational), and relationship DNA testing — all performed under proper chain-of-custody protocols when legal admissibility is required.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is your DNA testing legally admissible in court?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. When performed under chain-of-custody protocols at our Trinity, FL facility, our DNA testing results are legally admissible and accepted by courts and government agencies including USCIS.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do I need an appointment for DNA testing?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, DNA testing appointments should be scheduled in advance to ensure all participants, documentation, and identification requirements are properly coordinated. Call (727) 233-5223 to schedule.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I get immigration DNA testing at Sunshine Clinical Lab?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. We handle immigration DNA testing required by USCIS, including chain-of-custody collection, identity verification, photographic documentation, and coordination with AABB-accredited laboratories.',
      },
    },
    /* Gender Reveal Testing */
    {
      '@type': 'Question',
      name: "How early can I find out my baby's gender with a blood test?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: "The Peekaboo Early Gender Reveal Blood Test can determine fetal gender as early as 7 weeks into pregnancy through a simple, non-invasive blood draw from the mother's arm. Available at our Trinity, FL location.",
      },
    },
    {
      '@type': 'Question',
      name: 'Is the Peekaboo gender reveal test safe?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Yes. It's a standard blood draw from the mother's arm — the same type of draw used for routine prenatal testing. It is completely non-invasive to the baby.",
      },
    },
    {
      '@type': 'Question',
      name: 'Can I get my gender reveal results in a sealed envelope?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Absolutely. Let us know when scheduling, and we'll seal your results for your gender reveal party, private opening, or handoff to your event planner.",
      },
    },
    {
      '@type': 'Question',
      name: 'How much does the gender reveal blood test cost?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Contact us at (727) 233-5223 for current Peekaboo test pricing. This service is typically self-pay and not covered by insurance.',
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <FAQPage />
    </>
  );
}
