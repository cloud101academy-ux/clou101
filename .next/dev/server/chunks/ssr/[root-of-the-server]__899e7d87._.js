module.exports = [
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[project]/app/layout.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/app/layout.tsx [app-rsc] (ecmascript)"));
}),
"[externals]/crypto [external] (crypto, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("crypto", () => require("crypto"));

module.exports = mod;
}),
"[project]/lib/sanity.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "sanityClient",
    ()=>sanityClient
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$sanity$2f$client$2f$dist$2f$index$2e$browser$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@sanity/client/dist/index.browser.js [app-rsc] (ecmascript) <locals>");
;
const sanityClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$sanity$2f$client$2f$dist$2f$index$2e$browser$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createClient"])({
    projectId: 'b98kyfaj',
    dataset: 'production',
    apiVersion: "2024-01-01",
    useCdn: false
});
}),
"[project]/app/blog/[slug]/page.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Page,
    "generateMetadata",
    ()=>generateMetadata
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$sanity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/sanity.js [app-rsc] (ecmascript)");
(()=>{
    const e = new Error("Cannot find module './BlogClient'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
;
;
;
async function generateMetadata({ params }) {
    const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug;
    if (!slug) {
        return {
            title: "Blog | Cloud101",
            description: "Salesforce and Cloud learning articles by Cloud101."
        };
    }
    const post = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$sanity$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sanityClient"].fetch(`*[_type=="post" && slug.current==$slug][0]{
      title,
      excerpt
    }`, {
        slug
    });
    if (!post) {
        return {
            title: "Blog | Cloud101",
            description: "Salesforce and Cloud learning articles by Cloud101."
        };
    }
    const title = `${post.title} | Cloud101`;
    const description = post.excerpt?.slice(0, 155) || "Learn Salesforce and cloud technologies with real-world examples at Cloud101.";
    return {
        title,
        description,
        alternates: {
            canonical: `https://cloud101.in/blog/${slug}`
        },
        openGraph: {
            title,
            description,
            type: "article",
            url: `https://cloud101.in/blog/${slug}`
        },
        twitter: {
            card: "summary_large_image",
            title,
            description
        }
    };
}
function Page({ params }) {
    const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(BlogClient, {
        slug: slug
    }, void 0, false, {
        fileName: "[project]/app/blog/[slug]/page.js",
        lineNumber: 61,
        columnNumber: 10
    }, this);
}
}),
"[project]/app/blog/[slug]/page.js [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/app/blog/[slug]/page.js [app-rsc] (ecmascript)"));
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__899e7d87._.js.map