import AllServicesPage from '@/components/AllServicesPage';

export const metadata = {
  title: 'All Lab Services | Sunshine Clinical Lab – Trinity, FL',
  description:
    'Browse all services at Sunshine Clinical Lab: general blood testing, mobile blood draw, TRT monitoring, DNA testing, and gender reveal testing in Trinity, FL and Pasco County.',
  keywords: [
    'lab services Trinity FL',
    'blood testing Pasco County',
    'mobile blood draw Trinity FL',
    'TRT blood test Pasco County',
    'DNA testing Florida',
    'gender reveal blood test Florida',
    'clinical lab services near me',
    'walk-in lab testing Trinity FL',
  ],
  openGraph: {
    title: 'All Lab Services | Sunshine Clinical Lab – Trinity, FL',
    description:
      'Browse all services at Sunshine Clinical Lab: general testing, mobile blood draw, TRT monitoring, DNA testing, and gender reveal testing in Pasco County, FL.',
    url: 'https://sunshineclinicallab.com/all-services',
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
  hasMap: 'https://maps.google.com/?q=Sunshine+Clinical+Lab,Trinity,FL',
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    opens: '08:00',
    closes: '17:00',
  },
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <AllServicesPage />
    </>
  );
}
