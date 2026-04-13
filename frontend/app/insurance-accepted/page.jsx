import InsuranceAcceptedPage from '@/components/InsuranceAcceptedPage';

export const metadata = {
  title: 'Insurance Accepted | Clinical Lab Trinity FL & Pasco County | Sunshine Clinical Lab',
  description:
    'Sunshine Clinical Lab in Trinity, FL accepts most major insurance plans for blood work and lab testing. Affordable self-pay options available. Verify coverage — call (727) 233-5223.',
  keywords: [
    'lab testing insurance accepted Trinity FL',
    'clinical lab insurance Pasco County',
    'does Sunshine Clinical Lab accept my insurance',
    'affordable blood work no insurance Pasco County',
    'self-pay lab testing near me Trinity FL',
  ],
  openGraph: {
    title:
      'Insurance Accepted | Clinical Lab Trinity FL & Pasco County | Sunshine Clinical Lab',
    description:
      'Sunshine Clinical Lab in Trinity, FL accepts most major insurance plans for blood work and lab testing. Affordable self-pay options available. Verify coverage — call (727) 233-5223.',
    url: 'https://sunshineclinicallab.com/insurance-accepted',
    siteName: 'Sunshine Clinical Lab',
    locale: 'en_US',
    type: 'website',
  },
};

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
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
    'Pasco County, FL',
  ],
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What insurance plans does Sunshine Clinical Lab accept?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'We accept most major insurance plans. Because network participation can change, we recommend calling our office at (727) 233-5223 to verify your specific coverage before your visit to our Trinity, FL location.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do I need to verify my insurance before coming in for blood work?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'We strongly recommend it. A quick phone call helps ensure your visit goes smoothly, clarifies any copays or deductibles, and prevents billing surprises.',
      },
    },
    {
      '@type': 'Question',
      name: "What if I don't have insurance? Can I still get lab work done?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Absolutely. We offer competitive self-pay pricing on all services. As an independent lab in Trinity, FL, our rates are often meaningfully more affordable than what large chain labs charge. Call us for specific pricing on any test you need.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is DNA testing covered by insurance?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Legal, immigration, and paternity DNA testing is typically a self-pay service and is not covered by most insurance plans. Contact our team for current pricing.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is the Peekaboo gender reveal blood test covered by insurance?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The gender reveal test is generally a self-pay service. Contact us at (727) 233-5223 for current pricing.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do you offer payment plans or financial assistance?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Contact our office to discuss your situation. We're committed to making lab testing accessible and will work with you to find a solution.",
      },
    },
    {
      '@type': 'Question',
      name: 'How do I know if a specific test will be covered by my insurance?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Call us at (727) 233-5223 with your insurance information and the test(s) you need. Our team will verify coverage and explain any potential out-of-pocket costs before your visit.',
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
      <InsuranceAcceptedPage />
    </>
  );
}
