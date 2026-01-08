"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { sanityClient } from "@/lib/sanity";
import { PortableText } from "@portabletext/react";
import Footer from "@/components/footer";
import BlogHeader from "@/components/BlogHeader";
import { Linkedin, Link as LinkIcon } from "lucide-react";
import { portableTextComponents } from "@/lib/portableTextComponents";



export const dynamic = "force-dynamic";

/* ----------------------------------------
   HELPERS
---------------------------------------- */
function calculateReadTime(content = []) {
  const text = content
    .filter((block) => block._type === "block")
    .flatMap((block) => block.children?.map((child) => child.text) || [])
    .join(" ");

  const words = text.split(/\s+/).length;
  const minutes = Math.max(1, Math.ceil(words / 200));
  return `${minutes} min read`;
}

/* ----------------------------------------
   PAGE
---------------------------------------- */
export default function BlogPostPage() {
  const { slug } = useParams();
  const [linkCopied, setLinkCopied] = useState(false);
  const [post, setPost] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [progress, setProgress] = useState(0);
  const [pageUrl, setPageUrl] = useState("");

  /* ----------------------------------------
     SAFE BROWSER URL
  ---------------------------------------- */
  useEffect(() => {
    if (typeof window !== "undefined") {
      setPageUrl(window.location.href);
    }
  }, []);

  /* ----------------------------------------
     SCROLL PROGRESS
  ---------------------------------------- */
  useEffect(() => {
    const onScroll = () => {
      const total =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;

      setProgress((window.scrollY / total) * 100);
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ----------------------------------------
     FETCH POST + RELATED
  ---------------------------------------- */
  useEffect(() => {
    if (!slug) return;

    async function fetchData() {
      const postData = await sanityClient.fetch(
        `*[_type=="post" && slug.current==$slug][0]{
          _id,
          title,
          excerpt,
          publishedAt,
          mainImage{ asset->{url} },
          categories[]->{_id,title},
          author->{ name, image{asset->{url}} },
          content
        }`,
        { slug }
      );

      setPost(postData);

      if (postData?.categories?.length) {
        const categoryIds = postData.categories.map((c) => c._id);

        const related = await sanityClient.fetch(
          `*[_type=="post" &&
            references($categoryIds) &&
            slug.current != $slug][0...3]{
              _id,
              title,
              "slug": slug.current,
              excerpt,
              mainImage{ asset->{url} },
              categories[]->{title},
              author->{ name, image{asset->{url}} }
            }`,
          { categoryIds, slug }
        );

        setRelatedPosts(related);
      }
    }

    fetchData();
  }, [slug]);

  if (!post) return null;

  const readTime = calculateReadTime(post.content);

  return (
    <>
      <BlogHeader />

      {/* ----------------------------------------
          READING PROGRESS BAR
      ---------------------------------------- */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 z-50">
        <div
          className="h-full bg-blue-600 transition-all"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* ----------------------------------------
    SHARE SIDEBAR
---------------------------------------- */}
{pageUrl && (
  <div className="hidden lg:flex fixed right-6 top-1/3 flex-col gap-3 z-40">
    {/* Copy Link */}
    <button
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(pageUrl);
          setLinkCopied(true);
          setTimeout(() => setLinkCopied(false), 2000);
        } catch (e) {
          console.error("Failed to copy link");
        }
      }}
      className={`w-10 h-10 rounded-full border flex items-center justify-center shadow-sm transition
        ${
          linkCopied
            ? "bg-green-600 text-white border-green-600"
            : "bg-white text-gray-700 hover:bg-gray-100"
        }
      `}
      title="Copy link"
    >
      <LinkIcon size={18} />
    </button>

    {/* LinkedIn Share */}
    <a
      href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
        pageUrl
      )}`}
      target="_blank"
      rel="noopener noreferrer"
      className="w-10 h-10 rounded-full border bg-white flex items-center justify-center hover:bg-gray-100 shadow-sm transition text-[#0A66C2]"
      title="Share on LinkedIn"
    >
      <Linkedin size={18} />
    </a>
  </div>
)}

      {/* ----------------------------------------
          POST CONTENT
      ---------------------------------------- */}
      <main className="max-w-4xl mx-auto px-5 py-16 pt-20">
        {/* Back Button */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm text-blue-600 hover:underline mb-6"
        >
          ← Back to Blog
        </Link>

        {/* Categories */}
        <div className="flex flex-wrap gap-2 mb-4">
          {post.categories?.map((cat) => (
            <span
              key={cat._id}
              className="text-xs font-medium bg-blue-50 text-blue-600 px-3 py-1 rounded-full"
            >
              {cat.title}
            </span>
          ))}
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 mb-6">
          {post.title}
        </h1>

        {/* Meta */}
        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-10">
          {post.author?.image?.asset?.url && (
            <img
              src={post.author.image.asset.url}
              alt={post.author.name}
              className="w-9 h-9 rounded-full object-cover"
            />
          )}
          <span className="font-medium text-gray-700">
            {post.author?.name}
          </span>
          <span>
            {new Date(post.publishedAt).toLocaleDateString("en-IN", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </span>
          <span>{readTime}</span>
        </div>

         {/* Excerpt */}
        {post.excerpt && (
          <p className="text-lg font-medium text-gray-700 leading-relaxed mb-10 border-l-4 border-blue-600 pl-4">
            {post.excerpt}
          </p>
        )}


        {/* Featured Image */}
        {post.mainImage?.asset?.url && (
          <img
            src={post.mainImage.asset.url}
            alt={post.title}
            className="w-full max-h-[420px] object-cover rounded-3xl mb-14"
          />
        )}

        {/* Content */}
        <article
          className="
            prose 
            prose-lg 
            prose-slate 
            max-w-none

            prose-headings:font-bold
            prose-headings:tracking-tight
            prose-headings:text-gray-900

            prose-p:text-gray-700
            prose-p:leading-8

            prose-a:text-blue-600
            hover:prose-a:underline

            prose-strong:text-gray-900
          "
        >
          <PortableText
            value={post.content}
            components={portableTextComponents}
          />
        </article>

        {/* ----------------------------------------
            RELATED POSTS
        ---------------------------------------- */}
       {relatedPosts.length > 0 && (
  <section className="mt-24">
    <h2 className="text-2xl font-bold mb-8">Related articles</h2>

    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {relatedPosts.map((rp) => {
        const relatedReadTime = `${Math.max(
          1,
          Math.ceil((rp.excerpt?.split(/\s+/).length || 100) / 200)
        )} min read`;

        return (
          <Link
            key={rp._id}
            href={`/blog/${rp.slug}`}
            className="group bg-white border rounded-2xl overflow-hidden hover:shadow-lg transition-all flex flex-col"
          >
            {rp.mainImage?.asset?.url && (
              <img
                src={rp.mainImage.asset.url}
                alt={rp.title}
                className="h-48 w-full object-cover group-hover:scale-105 transition-transform"
              />
            )}

            <div className="p-6 flex flex-col flex-1">
              <div className="flex flex-wrap gap-2 mb-3">
                {rp.categories?.slice(0, 2).map((cat) => (
                  <span
                    key={cat.title}
                    className="text-xs bg-blue-50 text-blue-600 px-2.5 py-1 rounded-full"
                  >
                    {cat.title}
                  </span>
                ))}
              </div>

              <h3 className="font-semibold text-lg mb-2 line-clamp-2">
                {rp.title}
              </h3>

              <div className="flex-1" />

              <div className="flex items-center justify-between text-sm text-gray-500 mt-4">
                <div className="flex items-center gap-2">
                  {rp.author?.image?.asset?.url && (
                    <img
                      src={rp.author.image.asset.url}
                      alt={rp.author.name}
                      className="w-6 h-6 rounded-full object-cover"
                    />
                  )}
                  <span>{rp.author?.name}</span>
                </div>

                <span>{relatedReadTime}</span>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  </section>
)}

      </main>

      <Footer />
    </>
  );
}