import BlogHeader from "@/components/BlogHeader";
import BlogPageClient from "./BlogPageClient";
import Footer from "@/components/footer";
import { sanityClient } from "@/lib/sanity";
export const dynamic = 'force-dynamic'

export const metadata = {
  title: "Salesforce Blog | Cloud101 Academy",
  description:
    "Salesforce Admin, Developer, AI, and Cloud tutorials by Cloud101 Academy. Practical guides, real-world use cases, and career-focused insights.",
  keywords: [
    "Salesforce blog",
    "Salesforce tutorials",
    "Salesforce Admin",
    "Salesforce Developer",
    "Salesforce career",
    "Cloud computing",
    "AI in Salesforce",
  ],
  alternates: {
    canonical: "https://cloud101.in/blog",
  },
  openGraph: {
    title: "Salesforce Blog | Cloud101 Academy",
    description:
      "Practical Salesforce Admin & Developer blogs, AI insights, and Cloud best practices.",
    url: "https://cloud101.in/blog",
    siteName: "Cloud101 Academy",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Salesforce Blog | Cloud101 Academy",
    description:
      "Practical Salesforce Admin & Developer blogs, AI insights, and Cloud best practices.",
  },
};


const BLOG_LIST_QUERY = `
*[_type == "post"] | order(publishedAt desc){
  _id,
  title,
  "slug": slug.current,
  excerpt,
  publishedAt,
  mainImage{
    asset->{url}
  },
  author->{
    name,
    image{
      asset->{url}
    }
  },
  categories[]->{
    title
  }
}
`;

export default async function BlogPage() {
  const posts = await sanityClient.fetch(BLOG_LIST_QUERY);

  return (
    <>
      <BlogHeader />

      <main>
        <BlogPageClient posts={posts} />
      </main>

      <Footer />
    </>
  );
}
