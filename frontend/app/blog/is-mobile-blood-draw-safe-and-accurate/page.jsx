import BlogPostMBD from '@/components/BlogPostMBD';

export const metadata = {
  title:
    'Is Mobile Blood Draw Safe and Accurate? | Sunshine Clinical Lab Pasco County',
  description:
    'Wondering if mobile blood draw is safe and accurate? Learn how it works, its reliability, and why Sunshine Clinical Lab offers trusted mobile blood draw services in Pasco County.',
  keywords: [
    'is mobile blood draw safe and accurate',
    'mobile blood draw Pasco County',
    'mobile phlebotomy near me',
    'how does mobile blood draw work',
    'mobile blood draw Trinity FL',
    'home blood draw service',
    'Sunshine Clinical Lab mobile draw',
  ],
  openGraph: {
    title:
      'Is Mobile Blood Draw Safe and Accurate? | Sunshine Clinical Lab Pasco County',
    description:
      'Wondering if mobile blood draw is safe and accurate? Learn how it works, its reliability, and why Sunshine Clinical Lab offers trusted mobile blood draw services in Pasco County.',
    url: 'https://sunshineclinicallab.com/blog/is-mobile-blood-draw-safe-and-accurate',
    siteName: 'Sunshine Clinical Lab',
    locale: 'en_US',
    type: 'article',
    publishedTime: '2025-04-24',
  },
};

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  headline: 'Is Mobile Blood Draw Safe and Accurate?',
  description:
    'Wondering if mobile blood draw is safe and accurate? Learn how it works, its reliability, and why Sunshine Clinical Lab offers trusted mobile blood draw services in Pasco County.',
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
  url: 'https://sunshineclinicallab.com/blog/is-mobile-blood-draw-safe-and-accurate',
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': 'https://sunshineclinicallab.com/blog/is-mobile-blood-draw-safe-and-accurate',
  },
  keywords:
    'mobile blood draw Pasco County, mobile phlebotomy near me, how does mobile blood draw work',
  about: {
    '@type': 'MedicalProcedure',
    name: 'Mobile Blood Draw',
  },
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <BlogPostMBD />
    </>
  );
}
