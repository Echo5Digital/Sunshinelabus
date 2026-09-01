import PruebaDeADNInmigracionPage from '@/components/PruebaDeADNInmigracionPage';

export const metadata = {
  title: {
    absolute: 'Prueba de ADN para Inmigración en Florida | USCIS | Sunshine Clinical Lab — Hablamos Español',
  },
  description:
    'Prueba de ADN para inmigración y USCIS en Trinity, FL. Cadena de custodia, laboratorio acreditado AABB, servicio confidencial. Hablamos español. Llame al (727) 233-5223.',
  keywords: [
    'prueba de ADN para inmigración Florida',
    'prueba de ADN USCIS cerca de mí',
    'prueba de paternidad en español',
    'prueba de ADN inmigración Tampa',
    'prueba de ADN legal Florida',
    'laboratorio que habla español cerca de mí',
    'prueba de ADN para visa',
    'prueba de paternidad inmigración USCIS',
  ],
  openGraph: {
    title: 'Prueba de ADN para Inmigración en Florida | USCIS | Sunshine Clinical Lab — Hablamos Español',
    description:
      'Prueba de ADN para inmigración y USCIS en Trinity, FL. Cadena de custodia, laboratorio acreditado AABB, servicio confidencial. Hablamos español. Llame al (727) 233-5223.',
    url: 'https://www.sunshinelabus.com/es/prueba-de-adn-inmigracion',
    siteName: 'Sunshine Clinical Lab',
    locale: 'es_US',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.sunshinelabus.com/es/prueba-de-adn-inmigracion',
    languages: {
      es: 'https://www.sunshinelabus.com/es/prueba-de-adn-inmigracion',
      en: 'https://www.sunshinelabus.com/dna-testing-pasco-county',
    },
  },
};

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Sunshine Clinical Lab',
  telephone: '(727) 233-5223',
  url: 'https://www.sunshinelabus.com',
  inLanguage: 'es',
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
    'Zephyrhills, FL',
    'Dade City, FL',
    'Wesley Chapel, FL',
    'New Port Richey, FL',
    "Land O' Lakes, FL",
    'Pasco County, FL',
    'Tarpon Springs, FL',
    'Pinellas County, FL',
    'Tampa, FL',
    'Hillsborough County, FL',
  ],
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    opens: '08:00',
    closes: '14:00',
  },
};

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Prueba de ADN para Inmigración',
  serviceType: 'Prueba de ADN Legal, de Inmigración y de Paternidad',
  inLanguage: 'es',
  description:
    'Sunshine Clinical Lab ofrece pruebas de ADN para inmigración, paternidad y reunificación familiar con cadena de custodia completa, aceptada por USCIS, tribunales y agencias gubernamentales. Coordinación con laboratorio acreditado por AABB. Nuestro equipo habla español.',
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
  inLanguage: 'es',
  mainEntity: [
    {
      '@type': 'Question',
      name: '¿Cuánto cuesta una prueba de ADN para inmigración?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'El precio varía dependiendo del tipo de prueba y el número de participantes. Llame al (727) 233-5223 para conocer los precios actuales. Le informaremos del costo exacto antes de su cita.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Cuánto tiempo tardan los resultados de la prueba de ADN?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'El tiempo varía según el tipo de prueba y el laboratorio de procesamiento. Nuestro equipo le dará un estimado cuando agende su cita.',
      },
    },
    {
      '@type': 'Question',
      name: '¿USCIS acepta los resultados de Sunshine Clinical Lab?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sí. Nuestras pruebas de ADN para inmigración se realizan bajo protocolos de cadena de custodia y se procesan a través de laboratorios acreditados por AABB. Los resultados son aceptados por USCIS, embajadas y consulados de los Estados Unidos.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Necesito cita para la prueba de ADN?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sí. Las pruebas de ADN requieren cita previa para asegurar que todos los participantes, documentos e identificaciones estén debidamente coordinados. Llame al (727) 233-5223 para agendar.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Qué documentos necesito llevar?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Todos los participantes deben traer una identificación oficial con foto vigente (pasaporte, licencia de conducir, o identificación estatal). Si tiene una carta de USCIS o de la embajada, tráigala también.',
      },
    },
    {
      '@type': 'Question',
      name: '¿La prueba de ADN duele?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. La muestra se recolecta con un hisopo bucal — un pequeño cepillo que se frota suavemente por dentro de la mejilla. No hay agujas ni extracción de sangre para las pruebas de ADN estándar. El proceso es rápido e indoloro.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Hablan español en Sunshine Clinical Lab?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sí. Nuestro equipo habla español. Puede llamar, agendar su cita y completar todo el proceso en español. No necesita traer un traductor.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Puedo hacer la prueba de ADN si la otra persona está en otro país?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sí. En muchos casos de inmigración, una persona se hace la prueba en los Estados Unidos y la otra persona se hace la prueba en su país de origen a través de un laboratorio coordinado. Nuestro equipo puede guiarle sobre cómo funciona este proceso. Llame al (727) 233-5223 para discutir su situación específica.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Sirve una prueba de ADN comprada por internet para inmigración?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. Las pruebas de ADN compradas por internet o realizadas en casa no son aceptadas por USCIS para propósitos de inmigración. La prueba debe realizarse en persona, en un laboratorio autorizado, con protocolos de cadena de custodia. Sunshine Clinical Lab cumple con todos estos requisitos.',
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
      <PruebaDeADNInmigracionPage />
    </>
  );
}
