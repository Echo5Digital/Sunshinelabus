import BlogPostTRT from '@/components/BlogPostTRT';

export const metadata = {
  title: 'How Often Should You Get Blood Work While on TRT? | Sunshine Clinical Lab Trinity FL',
  description:
    'Learn how often you should get blood work while on TRT, what tests are required, and where to get fast, reliable TRT blood testing in Trinity, FL at Sunshine Clinical Lab.',
  keywords: [
    'how often should you get blood work while on TRT',
    'TRT blood test frequency',
    'what blood tests are needed for TRT monitoring',
    'TRT blood test near me',
    'TRT monitoring Trinity FL',
    'testosterone replacement therapy blood work',
    'Sunshine Clinical Lab TRT',
  ],
  openGraph: {
    title: 'How Often Should You Get Blood Work While on TRT? | Sunshine Clinical Lab Trinity FL',
    description:
      'Learn how often you should get blood work while on TRT, what tests are required, and where to get fast, reliable TRT blood testing in Trinity, FL at Sunshine Clinical Lab.',
    url: 'https://sunshineclinicallab.com/blog/how-often-should-you-get-blood-work-while-on-trt',
    siteName: 'Sunshine Clinical Lab',
    locale: 'en_US',
    type: 'article',
    publishedTime: '2025-04-24',
  },
};

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  headline: 'How Often Should You Get Blood Work While on TRT?',
  description:
    'Learn how often you should get blood work while on TRT, what tests are required, and where to get fast, reliable TRT blood testing in Trinity, FL at Sunshine Clinical Lab.',
  author: {
    '@type': 'Organization',
    name: 'Sunshine Clinical Lab',
    url: 'https://sunshineclinicallab.com',
  },
  publisher: {
    '@type': 'Organization',
    name: 'Sunshine Clinical Lab',
    url: 'https://sunshineclinicallab.com',
  },
  datePublished: '2025-04-24',
  url: 'https://sunshineclinicallab.com/blog/how-often-should-you-get-blood-work-while-on-trt',
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': 'https://sunshineclinicallab.com/blog/how-often-should-you-get-blood-work-while-on-trt',
  },
  keywords:
    'TRT blood test frequency, what blood tests are needed for TRT monitoring, TRT blood test near me',
  about: {
    '@type': 'MedicalCondition',
    name: 'Testosterone Replacement Therapy',
  },
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <BlogPostTRT />
    </>
  );
}
