"use client";

import { useState, useMemo } from "react";
import Link from "next/link";

const POSTS_PER_PAGE = 10;

function calculateReadTime(text = "") {
  const words = text.trim().split(/\s+/).length;
  const minutes = Math.max(1, Math.ceil(words / 200));
  return `${minutes} min read`;
}

export default function BlogPageClient({ posts }) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [author, setAuthor] = useState("All");
  const [sortOrder, setSortOrder] = useState("newest");
  const [currentPage, setCurrentPage] = useState(1);

  /* ----------------------------------------
     FILTER OPTIONS
  ---------------------------------------- */
  const categories = useMemo(() => {
    const all = posts.flatMap((p) => p.categories?.map((c) => c.title) || []);
    return ["All", ...new Set(all)];
  }, [posts]);

  const authors = useMemo(() => {
    const all = posts.map((p) => p.author?.name).filter(Boolean);
    return ["All", ...new Set(all)];
  }, [posts]);

  /* ----------------------------------------
     FILTER + SORT
  ---------------------------------------- */
  const filteredBlogs = useMemo(() => {
    return posts
      .filter((post) =>
        post.title.toLowerCase().includes(search.toLowerCase())
      )
      .filter((post) =>
        category === "All"
          ? true
          : post.categories?.some((c) => c.title === category)
      )
      .filter((post) =>
        author === "All" ? true : post.author?.name === author
      )
      .sort((a, b) =>
        sortOrder === "newest"
          ? new Date(b.publishedAt) - new Date(a.publishedAt)
          : new Date(a.publishedAt) - new Date(b.publishedAt)
      );
  }, [posts, search, category, author, sortOrder]);

  /* ----------------------------------------
     PAGINATION
  ---------------------------------------- */
  const totalPages = Math.ceil(filteredBlogs.length / POSTS_PER_PAGE);

  const paginatedBlogs = useMemo(() => {
    const start = (currentPage - 1) * POSTS_PER_PAGE;
    return filteredBlogs.slice(start, start + POSTS_PER_PAGE);
  }, [filteredBlogs, currentPage]);

  // Reset page when filters change
  useMemo(() => {
    setCurrentPage(1);
  }, [search, category, author, sortOrder]);

  /* ----------------------------------------
     RENDER
  ---------------------------------------- */
  return (
    <main className="max-w-7xl mx-auto px-5 py-12">
      {/* HERO */}
      <section className="text-center mb-14">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Cloud101 Blog
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Insights, tutorials, and real-world guidance on Salesforce, AI, and
          cloud technologies.
        </p>
      </section>

      {/* FILTER BAR */}
      <section className="mb-12">
        <div className="flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between bg-gray-50 border rounded-xl p-4">
          <input
            type="text"
            placeholder="Search articles…"
            className="w-full lg:w-1/3 px-4 py-2.5 rounded-lg border focus:ring-2 focus:ring-blue-500 outline-none"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <div className="flex flex-wrap gap-3">
            <select
              className="px-4 py-2.5 rounded-lg border bg-white"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {categories.map((cat) => (
                <option key={cat}>{cat}</option>
              ))}
            </select>

            <select
              className="px-4 py-2.5 rounded-lg border bg-white"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            >
              {authors.map((auth) => (
                <option key={auth}>{auth}</option>
              ))}
            </select>

            <select
              className="px-4 py-2.5 rounded-lg border bg-white"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
            >
              <option value="newest">Newest first</option>
              <option value="oldest">Oldest first</option>
            </select>
          </div>
        </div>
      </section>

      {/* BLOG GRID */}
      <section>
        {paginatedBlogs.length === 0 && (
          <p className="text-center text-gray-500 text-lg">
            No blogs found. Try adjusting filters.
          </p>
        )}

        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {paginatedBlogs.map((post) => (
            <Link
              key={post._id}
              href={`/blog/${post.slug}`}
              className="group bg-white border rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col"
            >
              {/* Image */}
              {post.mainImage?.asset?.url && (
                <img
                  src={post.mainImage.asset.url}
                  alt={post.title}
                  className="h-52 w-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              )}

              {/* Content */}
              <div className="p-6 flex flex-col flex-1">
                {/* Categories + Read time */}
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div className="flex flex-wrap gap-2">
                    {post.categories?.slice(0, 2).map((cat) => (
                      <span
                        key={cat.title}
                        className="text-xs font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full"
                      >
                        {cat.title}
                      </span>
                    ))}

                    {post.categories?.length > 2 && (
                      <span className="text-xs font-medium text-gray-600 bg-gray-100 px-2 py-1 rounded-full">
                        +{post.categories.length - 2}
                      </span>
                    )}
                  </div>

                  <span className="text-xs text-gray-500 whitespace-nowrap">
                    {calculateReadTime(post.excerpt)}
                  </span>
                </div>

                <h2 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2">
                  {post.title}
                </h2>

                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {post.excerpt}
                </p>

                <div className="flex-1" />

                {/* Author */}
                {post.author?.name && (
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    {post.author.image?.asset?.url && (
                      <img
                        src={post.author.image.asset.url}
                        alt={post.author.name}
                        className="w-7 h-7 rounded-full object-cover"
                      />
                    )}
                    <span>By {post.author.name}</span>
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* PAGINATION */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-16">
          {Array.from({ length: totalPages }).map((_, index) => {
            const page = index + 1;
            return (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-4 py-2 rounded-lg border text-sm font-medium transition
                  ${
                    page === currentPage
                      ? "bg-blue-600 text-white border-blue-600"
                      : "bg-white text-gray-700 hover:bg-gray-100"
                  }`}
              >
                {page}
              </button>
            );
          })}
        </div>
      )}
    </main>
  );
}