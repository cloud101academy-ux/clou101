import { sanityClient } from "@/lib/sanity";

export async function GET() {
  const baseUrl = "https://cloud101.in";

  /* ----------------------------
     BLOG POSTS (Sanity)
  ----------------------------- */
  const posts = await sanityClient.fetch(`
    *[_type == "post" && defined(slug.current)]{
      "slug": slug.current,
      publishedAt
    }
  `);

  /* ----------------------------
     STATIC PAGES (MANUAL)
  ----------------------------- */
  const staticPages = [
    {
      url: `${baseUrl}/`,
      priority: 1.0,
      changeFreq: "weekly",
    },
    {
      url: `${baseUrl}/blog`,
      priority: 0.9,
      changeFreq: "weekly",
    },
    {
      url: `${baseUrl}/privacy-policy`,
      priority: 0.3,
      changeFreq: "yearly",
    },
    {
      url: `${baseUrl}/terms`,
      priority: 0.3,
      changeFreq: "yearly",
    },
  ];

  /* ----------------------------
     BLOG PAGES
  ----------------------------- */
  const blogPages = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.publishedAt
      ? new Date(post.publishedAt).toISOString()
      : new Date().toISOString(),
    changeFreq: "monthly",
    priority: 0.7,
  }));

  const allPages = [
    ...staticPages.map((page) => ({
      ...page,
      lastModified: new Date().toISOString(),
    })),
    ...blogPages,
  ];

  /* ----------------------------
     XML GENERATION
  ----------------------------- */
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages
  .map(
    (page) => `
  <url>
    <loc>${page.url}</loc>
    <lastmod>${page.lastModified}</lastmod>
    <changefreq>${page.changeFreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>
  `
  )
  .join("")}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
