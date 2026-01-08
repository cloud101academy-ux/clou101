import BlogHeader from "@/components/BlogHeader";
import BlogPageClient from "./BlogPageClient";
import Footer from "@/components/footer";
import { sanityClient } from "@/lib/sanity";
export const dynamic = 'force-dynamic'

export const metadata = {
  title: "Blog | Cloud101 Academy",
  description:
    "Salesforce, AI, and Cloud insights from Cloud101 Academy instructors.",
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
