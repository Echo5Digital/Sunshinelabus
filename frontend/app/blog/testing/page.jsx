export const metadata = {
  title: "testing",
  description: "testing",
  keywords: ["testing"],
  openGraph: {
    title: "testing",
    description: "testing",
    url: "https://www.sunshinelabus.com/blog/testing",
    type: 'article',
    publishedTime: "2026-04-24",
  },
};

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  headline: "testing",
  description: "testing",
  author: { '@type': 'Organization', name: "testing" },
  publisher: { '@type': 'Organization', name: "testing" },
  datePublished: "2026-04-24",
  url: "https://www.sunshinelabus.com/blog/testing",
  mainEntityOfPage: { '@type': 'WebPage', '@id': "https://www.sunshinelabus.com/blog/testing" },
};


export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <article className="max-w-4xl mx-auto px-4 py-10">
        <img src="frontend/public/images/blog/testing/featured.jpg" alt="testing" className="w-full rounded-xl mb-8 object-cover" />
        <header className="mb-8">
          <span className="text-sm font-medium text-blue-600 uppercase tracking-wide">blog</span>
          <h1 className="text-3xl font-bold text-gray-900 mt-2 mb-3">testing</h1>
          <div className="flex items-center gap-3 text-sm text-gray-500">
            <span>testing</span>
            <span>·</span>
            <time dateTime="2026-04-24">April 24, 2026</time>
          </div>
        </header>
        <div
          className="prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: `<div style="max-width: 750px !important; margin: 0 auto !important; font-family: 'Georgia', serif !important; color: #2d3748 !important"><p style="font-size: 18px !important; line-height: 1.9 !important; color: #2d3748 !important; margin-bottom: 18px !important; letter-spacing: 0.01em !important">Testing</p></div>` }}
        />
      </article>
    </>
  );
}