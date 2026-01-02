module.exports = [
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[project]/app/layout.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/app/layout.tsx [app-rsc] (ecmascript)"));
}),
"[project]/app/blog/[slug]/page.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {

const { jsxDEV: _jsxDEV } = __turbopack_context__.r("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
{}/*#__PURE__*/ _jsxDEV("div", {
    className: "hidden lg:flex fixed right-6 top-1/3 flex-col gap-3 z-40",
    children: [
        /*#__PURE__*/ _jsxDEV("button", {
            onClick: ()=>navigator.clipboard.writeText(window.location.href),
            className: "w-10 h-10 flex items-center justify-center rounded-full border bg-white hover:bg-gray-100 shadow-sm",
            title: "Copy link",
            children: "🔗"
        }, void 0, false, {
            fileName: "[project]/app/blog/[slug]/page.js",
            lineNumber: 4,
            columnNumber: 3
        }, /*TURBOPACK member replacement*/ __turbopack_context__.e),
        /*#__PURE__*/ _jsxDEV("a", {
            href: `https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(post.title)}`,
            target: "_blank",
            className: "w-10 h-10 flex items-center justify-center rounded-full border bg-white hover:bg-gray-100 shadow-sm",
            title: "Share on Twitter",
            children: "🐦"
        }, void 0, false, {
            fileName: "[project]/app/blog/[slug]/page.js",
            lineNumber: 13,
            columnNumber: 3
        }, /*TURBOPACK member replacement*/ __turbopack_context__.e),
        /*#__PURE__*/ _jsxDEV("a", {
            href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`,
            target: "_blank",
            className: "w-10 h-10 flex items-center justify-center rounded-full border bg-white hover:bg-gray-100 shadow-sm",
            title: "Share on LinkedIn",
            children: "💼"
        }, void 0, false, {
            fileName: "[project]/app/blog/[slug]/page.js",
            lineNumber: 25,
            columnNumber: 3
        }, /*TURBOPACK member replacement*/ __turbopack_context__.e)
    ]
}, void 0, true, {
    fileName: "[project]/app/blog/[slug]/page.js",
    lineNumber: 2,
    columnNumber: 1
}, /*TURBOPACK member replacement*/ __turbopack_context__.e);
}),
"[project]/app/blog/[slug]/page.js [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/app/blog/[slug]/page.js [app-rsc] (ecmascript)"));
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__1c43ec6d._.js.map