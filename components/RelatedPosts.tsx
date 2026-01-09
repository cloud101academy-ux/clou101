import Link from "next/link"
import { Calendar, Clock } from "lucide-react"
import { sanityClient } from "@/lib/sanity"


function calculateReadTime(content = []) {
  const text = content
    .filter((block: any) => block._type === "block")
    .flatMap((block: any) => block.children?.map((c: any) => c.text) || [])
    .join(" ")

  return `${Math.max(1, Math.ceil(text.split(/\s+/).length / 200))} min read`
}
interface RelatedPostsProps {
  currentPostId: string
  categories: { _id: string; title: string }[]
}

export async function RelatedPosts({
  currentPostId,
  categories,
}: RelatedPostsProps) {
  if (!categories?.length) return null

  const categoryIds = categories.map((c) => c._id)

  const relatedPosts = await sanityClient.fetch(
    `*[_type=="post" &&
      references($categoryIds) &&
      _id != $currentPostId][0...3]{
        _id,
        title,
        "slug": slug.current,
        excerpt,
        publishedAt,
        content,
        mainImage{ asset->{url} }
      }`,
    { categoryIds, currentPostId }
  )

  if (!relatedPosts?.length) return null

  return (
    <section className="mt-16 sm:mt-24">
      <h2 className="text-xl sm:text-2xl font-bold mb-6 sm:mb-8">
        Related articles
      </h2>

      <div className="grid gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {relatedPosts.map((post: any) => {
          const readTime = calculateReadTime(post.content)

          return (
            <Link
              key={post._id}
              href={`/blog/${post.slug}`}
              className="group bg-white border rounded-2xl overflow-hidden hover:shadow-lg transition-all flex flex-col"
            >
              {post.mainImage?.asset?.url && (
                <img
                  src={post.mainImage.asset.url}
                  alt={post.title}
                  className="h-44 sm:h-48 w-full object-cover group-hover:scale-105 transition-transform"
                />
              )}

              <div className="p-5 flex flex-col flex-1">
                <h3 className="font-semibold text-base sm:text-lg mb-2 line-clamp-2">
                  {post.title}
                </h3>

                {/* Meta */}
                <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
                  <span className="flex items-center gap-1">
                    <Calendar size={12} />
                    {new Date(post.publishedAt).toLocaleDateString("en-IN")}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock size={12} />
                    {readTime}
                  </span>
                </div>

                {post.excerpt && (
                  <p className="text-sm text-gray-600 line-clamp-3">
                    {post.excerpt}
                  </p>
                )}
              </div>
            </Link>
          )
        })}
      </div>
    </section>
  )
}