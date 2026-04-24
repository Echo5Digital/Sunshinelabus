/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['framer-motion'],
  images: {
    formats: ['image/avif', 'image/webp'],
    qualities: [100, 75],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/mobile-blood-draw-new-port-richey',
        destination: '/mobile-blood-draw-pasco-county',
        permanent: true,
      },
      {
        source: '/trt-blood-test-new-port-richey',
        destination: '/trt-blood-test-pasco-county',
        permanent: true,
      },
      {
        source: '/dna-testing-new-port-richey',
        destination: '/dna-testing-pasco-county',
        permanent: true,
      },
      {
        source: '/services/dna-testing',
        destination: '/dna-testing-pasco-county',
        permanent: true,
      },
      {
        source: '/clinical-lab-services-new-port-richey',
        destination: '/clinical-lab-services-trinity-fl',
        permanent: true,
      },
      {
        source: '/medical-laboratory-services-about-us',
        destination: '/about',
        permanent: true,
      },
      {
        source: '/medical-laboratory-services-resources',
        destination: '/',
        permanent: true,
      },
      {
        source: '/medical-laboratory-services-laboratory-schedules',
        destination: '/book-appointment',
        permanent: true,
      },
      {
        source: '/medical-laboratory-services-careers',
        destination: '/',
        permanent: true,
      },
      {
        source: '/medical-laboratory-services-send-your-referrals',
        destination: '/book-appointment',
        permanent: true,
      },
      {
        source: '/medical-laboratory-services-our-services/drug-testing-and-molecular-testing',
        destination: '/mobile-blood-draw-pasco-county',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
