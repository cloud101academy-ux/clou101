import { notFound } from "next/navigation"
import Link from "next/link"
import { Calendar, Clock } from "lucide-react"
import { sanityClient } from "@/lib/sanity"
import { urlFor } from "@/lib/sanityImage"
import BlogHeader from "@/components/BlogHeader"
import Footer from "@/components/footer"
import BlogShareSidebar from "@/components/BlogShareSidebar"
import { RelatedPosts } from "@/components/RelatedPosts"
import { PortableText } from "@portabletext/react"
import { portableTextComponents } from "@/lib/portableTextComponents"
import ReadingProgressBar from "@/components/ReadingProgressBar"


/* ----------------------------------------
   HELPERS
---------------------------------------- */
function calculateReadTime(content = []) {
  const text = content
    .filter((block: any) => block._type === "block")
    .flatMap((block: any) => block.children?.map((c: any) => c.text) || [])
    .join(" ")

  return `${Math.max(1, Math.ceil(text.split(/\s+/).length / 200))} min read`
}

/* ----------------------------------------
   METADATA
---------------------------------------- */
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  const post = await sanityClient.fetch(
    `*[_type=="post" && slug.current==$slug][0]{ title, excerpt }`,
    { slug }
  )

  if (!post) return { title: "Blog | Cloud101" }

  return {
    title: `${post.title} | Cloud101`,
    description: post.excerpt,
  }
}

/* ----------------------------------------
   PAGE
---------------------------------------- */
export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  const post = await sanityClient.fetch(
    `*[_type=="post" && slug.current==$slug][0]{
      _id,
      title,
      excerpt,
      publishedAt,
      mainImage,
      categories[]->{_id,title},
      author->{ name, image },
      content
    }`,
    { slug }
  )

  if (!post) notFound()

  const readTime = calculateReadTime(post.content)

  return (
    <>
      <BlogHeader />
      <ReadingProgressBar />
      <BlogShareSidebar />

      <main className="max-w-4xl mx-auto px-4 pt-6 pb-20 sm:px-6 sm:pt-16">
        {/* Top Row */}
        <div className="flex items-center justify-between mb-4 sm:mb-8">
          <div className="flex gap-2">
            {post.categories?.map((cat: any) => (
              <span
                key={cat._id}
                className="
  text-[11px]
  sm:text-xs
  bg-blue-50
  text-blue-600
  px-2 py-0.5
  sm:px-3 sm:py-1
  rounded-full"
              >
                {cat.title}
              </span>
            ))}
          </div>

          <Link href="/blog" className="text-sm text-blue-600 hover:underline">
            Back to Blog →
          </Link>
        </div>

        {/* Title */}
       <h1 className="
  text-[32px]
  sm:text-[38px]
  md:text-[46px]
  font-bold
  leading-tight
  tracking-tight
  text-gray-900
  mb-6
">
  {post.title}
</h1>



        {/* Meta */}
        <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500 mb-6">
          {post.author?.image && (
            <img
              src={urlFor(post.author.image).width(40).height(40).url()}
              alt={post.author.name}
              className="w-9 h-9 rounded-full object-cover"
            />
          )}
          <span className="font-medium text-gray-700">{post.author?.name}</span>

          <span className="flex items-center gap-1">
            <Calendar size={14} />
            {new Date(post.publishedAt).toLocaleDateString("en-IN")}
          </span>

          <span className="flex items-center gap-1">
            <Clock size={14} />
            {readTime}
          </span>
        </div>

        {/* Excerpt */}
        {post.excerpt && (
          <p className="text-lg text-gray-700 leading-relaxed mb-8 border-l-4 border-blue-600 pl-4">
            {post.excerpt}
          </p>
        )}

        {/* Featured Image */}
        {post.mainImage && (
  <div className="relative w-full overflow-hidden rounded-3xl mb-14">
    <img
      src={urlFor(post.mainImage).width(1600).url()}
      alt={post.title}
      className="
        w-full
        h-[240px]
        sm:h-[320px]
        md:h-[420px]
        object-cover
      "
    />
  </div>
)}


        {/* Content */}
        <div className=" mx-auto">
  <article className="blog-content">
    <PortableText value={post.content} components={portableTextComponents} />
  </article>
</div>




        <RelatedPosts currentPostId={post._id} categories={post.categories} />
      </main>

      {/* CTA */}
      <section className="bg-gradient-to-r from-blue-50 to-blue-100 py-14">
        <div className="max-w-6xl mx-auto text-center px-6">
          <h2 className="text-3xl font-bold mb-4">Ready to Master Salesforce?</h2>
          <p className="text-gray-600 mb-6">
            Join our next batch and get hands-on training from industry experts.
          </p>
          <a
            href="/#contact"
            className="inline-block px-8 py-3 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700"
          >
            Enroll Now
          </a>
        </div>
      </section>

      <Footer />
    </>
  )
}