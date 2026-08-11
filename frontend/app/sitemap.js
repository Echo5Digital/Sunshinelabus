import { BLOG_POSTS } from '@/lib/blog-data';

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://www.sunshinelabus.com';

export default function sitemap() {
  // ── Core Pages ──────────────────────────────────────────────────────────────
  const corePages = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/faq`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/insurance-accepted`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/all-services`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/book-appointment`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/referrals`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
  ];

  // ── Blog ────────────────────────────────────────────────────────────────────
  const blogIndex = {
    url: `${BASE_URL}/blog`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  };

  // Dynamic blog posts — sourced from lib/blog-data.js
  // When migrating to Supabase, replace this with an async fetch of published posts
  const blogPosts = BLOG_POSTS.map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  // ── Service-Specific Landing Pages ──────────────────────────────────────────
  const serviceSlugPages = [
    'mobile-blood-draw-pasco-county',
    'trt-blood-test-pasco-county',
    'dna-testing-pasco-county',
    'gender-reveal-testing-florida',
    'mobile-blood-draw-the-villages',
    'mobile-blood-draw-wesley-chapel',
    'mobile-blood-draw-zephyrhills',
  ].map((slug) => ({
    url: `${BASE_URL}/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.9,
  }));

  // ── Service Category Pages (/services/*) ────────────────────────────────────
  // Note: /services/dna-testing is excluded — it is a 301 redirect to /dna-testing-pasco-county
  const serviceCategoryPages = [
    'chemistry',
    'coagulation',
    'drug-testing',
    'hematology',
    'immunochemistry',
    'molecular',
    'phlebotomy',
  ].map((slug) => ({
    url: `${BASE_URL}/services/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  // ── Location / City Pages ───────────────────────────────────────────────────
  const locationPages = [
    'clinical-lab-trinity-fl',
    'clinical-lab-services-trinity-fl',
    'clinical-lab-new-port-richey',
    'clinical-lab-land-o-lakes-fl',
    'clinical-lab-tarpon-springs-fl',
  ].map((slug) => ({
    url: `${BASE_URL}/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  return [
    ...corePages,
    blogIndex,
    ...blogPosts,
    ...serviceSlugPages,
    ...serviceCategoryPages,
    ...locationPages,
  ];
}
