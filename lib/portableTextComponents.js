"use client";

import { useState } from "react";

/* ----------------------------------------
   CODE BLOCK (Filename + Copy + Feedback)
---------------------------------------- */
function CodeBlock({ value }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value.code || "");
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Copy failed:", err);
    }
  };

  return (
    <div className="relative my-10 rounded-2xl overflow-hidden border border-gray-800 bg-gray-900 group">
      {/* Filename bar */}
      {value.filename && (
        <div className="flex items-center justify-between px-4 py-2 text-xs font-mono text-gray-300 bg-gray-950 border-b border-gray-800">
          <span>{value.filename}</span>
        </div>
      )}

      {/* Copy Button */}
      <button
        onClick={handleCopy}
        className="absolute top-3 right-3 text-xs px-3 py-1.5 rounded-md
          bg-gray-800 text-gray-200 hover:bg-gray-700
          opacity-100 sm:opacity-0 sm:group-hover:opacity-100
          transition"
        aria-label="Copy code"
      >
        {copied ? "Copied ✓" : "Copy"}
      </button>

      {/* Code */}
      <pre className="p-5 overflow-x-auto text-sm leading-relaxed text-gray-100">
        <code>{value.code}</code>
      </pre>
    </div>
  );
}

/* ----------------------------------------
   IMAGE
---------------------------------------- */
function ImageBlock({ value }) {
  if (!value?.asset?.url) return null;

  return (
    <figure className="my-10">
      <img
        src={value.asset.url}
        alt={value.alt || ""}
        className="rounded-2xl mx-auto max-h-[460px] object-contain"
        loading="lazy"
      />
      {value.alt && (
        <figcaption className="mt-3 text-center text-sm text-gray-500">
          {value.alt}
        </figcaption>
      )}
    </figure>
  );
}

/* ----------------------------------------
   LINK MARK
---------------------------------------- */
function LinkMark({ value, children }) {
  const isExternal = value?.href?.startsWith("http");

  return (
    <a
      href={value?.href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      className="text-[#0B66FF] underline underline-offset-4 hover:text-[#0546C8]"
    >
      {children}
    </a>
  );
}

/* ----------------------------------------
   PORTABLE TEXT COMPONENTS
---------------------------------------- */
export const portableTextComponents = {
  types: {
    code: CodeBlock,
    image: ImageBlock,
  },

  marks: {
    link: LinkMark,
    strong: ({ children }) => (
      <strong className="font-semibold text-gray-900">{children}</strong>
    ),
    em: ({ children }) => (
      <em className="italic text-gray-700">{children}</em>
    ),
  },

  list: {
    bullet: ({ children }) => (
      <ul className="my-6 ml-6 list-disc space-y-2 text-gray-800">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="my-6 ml-6 list-decimal space-y-2 text-gray-800">
        {children}
      </ol>
    ),
  },

  listItem: {
    bullet: ({ children }) => <li className="leading-relaxed">{children}</li>,
    number: ({ children }) => <li className="leading-relaxed">{children}</li>,
  },

  block: {
    h2: ({ children }) => (
      <h2 className="text-3xl font-bold mt-16 mb-6 text-gray-900">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-2xl font-semibold mt-12 mb-4 text-gray-900">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-xl font-semibold mt-10 mb-3 text-gray-900">
        {children}
      </h4>
    ),
    normal: ({ children }) => (
      <p className="my-6 text-lg leading-relaxed text-gray-800">
        {children}
      </p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-[#0B66FF] pl-6 my-8 italic text-gray-700">
        {children}
      </blockquote>
    ),
  },
};