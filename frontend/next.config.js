/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['framer-motion'],
  images: {
    formats: ['image/avif', 'image/webp'],
    qualities: [100, 75],
    remotePatterns: [],
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
    ];
  },
};

module.exports = nextConfig;
