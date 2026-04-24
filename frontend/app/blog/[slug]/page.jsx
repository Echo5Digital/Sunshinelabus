import { BLOG_POSTS } from '@/lib/blog-data';
import BlogPostPage from '@/components/BlogPostPage';

export async function generateMetadata({ params }) {
  const post = BLOG_POSTS.find((p) => p.slug === params.slug);
  if (!post) {
    return { title: 'Article Not Found | Sunshine Clinical Lab' };
  }
  return {
    title: `${post.title} | Sunshine Clinical Lab`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `https://sunshineclinicallab.com/blog/${post.slug}`,
      siteName: 'Sunshine Clinical Lab',
      locale: 'en_US',
      type: 'article',
    },
  };
}

export default function Page({ params }) {
  return <BlogPostPage slug={params.slug} />;
}
