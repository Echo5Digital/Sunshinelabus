const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://www.sunshinelabus.com';

export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/admin/',
          '/manage-booking/',
          '/api/',
        ],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
