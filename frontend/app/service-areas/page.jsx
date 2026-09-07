import ServiceAreasPage from '@/components/ServiceAreasPage';

export const metadata = {
  title: 'Service Areas | Clinical Lab Trinity FL & Pasco County',
  description:
    'Sunshine Clinical Lab proudly serves Trinity, New Port Richey, Land O\' Lakes, Tarpon Springs, and communities across Pasco County, Pinellas County, and the greater Tampa Bay region.',
  keywords: [
    'clinical lab service areas Pasco County',
    'blood work near me Trinity FL',
    'lab testing Pasco County communities',
    'mobile blood draw service area Florida',
  ],
  openGraph: {
    title: 'Service Areas | Clinical Lab Trinity FL & Pasco County | Sunshine Clinical Lab',
    description:
      'Sunshine Clinical Lab proudly serves Trinity, New Port Richey, Land O\' Lakes, Tarpon Springs, and communities across Pasco County, Pinellas County, and the greater Tampa Bay region.',
    url: 'https://www.sunshinelabus.com/service-areas',
    siteName: 'Sunshine Clinical Lab',
    locale: 'en_US',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.sunshinelabus.com/service-areas',
  },
};

export default function Page() {
  return <ServiceAreasPage />;
}
