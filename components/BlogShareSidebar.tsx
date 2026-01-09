"use client"

import { useEffect, useState } from "react"
import { Linkedin, Link as LinkIcon } from "lucide-react"

export default function BlogShareSidebar() {
  const [url, setUrl] = useState("")
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    setUrl(window.location.href)
  }, [])

  if (!url) return null

  return (
    <div className="hidden lg:flex fixed right-6 top-1/3 flex-col gap-3 z-40">
      <button
        onClick={() => {
          navigator.clipboard.writeText(url)
          setCopied(true)
          setTimeout(() => setCopied(false), 2000)
        }}
        className={`w-10 h-10 rounded-full border flex items-center justify-center shadow-sm transition
          ${
            copied
              ? "bg-green-600 text-white border-green-600"
              : "bg-white text-gray-700 hover:bg-gray-100"
          }
        `}
        title="Copy link"
      >
        <LinkIcon size={18} />
      </button>

      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
          url
        )}`}
        target="_blank"
        rel="noopener noreferrer"
        className="w-10 h-10 rounded-full border bg-white flex items-center justify-center hover:bg-gray-100 shadow-sm transition text-[#0A66C2]"
        title="Share on LinkedIn"
      >
        <Linkedin size={18} />
      </a>
    </div>
  )
}