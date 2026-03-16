/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    qualities: [100, 75],
    remotePatterns: [],
  },
};

module.exports = nextConfig;
