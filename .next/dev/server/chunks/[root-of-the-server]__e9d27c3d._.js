module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/crypto [external] (crypto, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("crypto", () => require("crypto"));

module.exports = mod;
}),
"[project]/lib/sanity.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "sanityClient",
    ()=>sanityClient
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$sanity$2f$client$2f$dist$2f$index$2e$browser$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@sanity/client/dist/index.browser.js [app-route] (ecmascript) <locals>");
;
const sanityClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$sanity$2f$client$2f$dist$2f$index$2e$browser$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createClient"])({
    projectId: 'b98kyfaj',
    dataset: 'production',
    apiVersion: "2024-01-01",
    useCdn: false
});
}),
"[project]/app/sitemap.xml/route.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$sanity$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/sanity.js [app-route] (ecmascript)");
;
async function GET() {
    const baseUrl = "https://cloud101.in";
    /* ----------------------------
     BLOG POSTS (Sanity)
  ----------------------------- */ const posts = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$sanity$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["sanityClient"].fetch(`
    *[_type == "post" && defined(slug.current)]{
      "slug": slug.current,
      publishedAt
    }
  `);
    /* ----------------------------
     STATIC PAGES (MANUAL)
  ----------------------------- */ const staticPages = [
        {
            url: `${baseUrl}/`,
            priority: 1.0,
            changeFreq: "weekly"
        },
        {
            url: `${baseUrl}/blog`,
            priority: 0.9,
            changeFreq: "weekly"
        },
        {
            url: `${baseUrl}/privacy-policy`,
            priority: 0.3,
            changeFreq: "yearly"
        },
        {
            url: `${baseUrl}/terms`,
            priority: 0.3,
            changeFreq: "yearly"
        }
    ];
    /* ----------------------------
     BLOG PAGES
  ----------------------------- */ const blogPages = posts.map((post)=>({
            url: `${baseUrl}/blog/${post.slug}`,
            lastModified: post.publishedAt ? new Date(post.publishedAt).toISOString() : new Date().toISOString(),
            changeFreq: "monthly",
            priority: 0.7
        }));
    const allPages = [
        ...staticPages.map((page)=>({
                ...page,
                lastModified: new Date().toISOString()
            })),
        ...blogPages
    ];
    /* ----------------------------
     XML GENERATION
  ----------------------------- */ const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages.map((page)=>`
  <url>
    <loc>${page.url}</loc>
    <lastmod>${page.lastModified}</lastmod>
    <changefreq>${page.changeFreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>
  `).join("")}
</urlset>`;
    return new Response(sitemap, {
        headers: {
            "Content-Type": "application/xml"
        }
    });
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__e9d27c3d._.js.map