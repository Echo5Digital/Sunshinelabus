import BlogPage from '@/components/BlogPage';

export const metadata = {
  title: 'Blog & Articles | Sunshine Clinical Lab',
  description:
    'Health insights, lab tips, and wellness updates from Sunshine Clinical Lab in New Port Richey, FL. Learn about blood draws, CBC results, TRT monitoring, DNA testing, and more.',
  keywords: [
    'lab testing blog',
    'blood draw tips',
    'CBC explained',
    'TRT monitoring',
    'DNA testing Florida',
    'fasting blood test',
    'gender reveal DNA',
    'Sunshine Clinical Lab blog',
    'New Port Richey health tips',
  ],
  openGraph: {
    title: 'Blog & Articles | Sunshine Clinical Lab',
    description:
      'Health insights, lab tips, and wellness updates from Sunshine Clinical Lab in New Port Richey, FL.',
    url: 'https://sunshineclinicallab.com/blog',
    siteName: 'Sunshine Clinical Lab',
    locale: 'en_US',
    type: 'website',
  },
};

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'MedicalBusiness',
  name: 'Sunshine Clinical Lab',
  url: 'https://sunshineclinicallab.com',
  telephone: '+1-727-233-5223',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '7509 State Road 54, Suite 107',
    addressLocality: 'New Port Richey',
    addressRegion: 'FL',
    postalCode: '34655',
    addressCountry: 'US',
  },
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <BlogPage />
    </>
  );
}
