"use client"

import { useState } from "react"
import { Copy, Check } from "lucide-react"

export default function CodeBlock({
  code,
  filename,
}: {
  code: string
  filename?: string
}) {
  const [copied, setCopied] = useState(false)

  return (
    <div className="my-10 bg-[#0f172a] rounded-2xl overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2 bg-[#020617] text-sm text-gray-300">
        <span>{filename || "Code"}</span>
        <button
          onClick={() => {
            navigator.clipboard.writeText(code)
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
          }}
          className="flex items-center gap-1 text-xs hover:text-white"
        >
          {copied ? <Check size={14} /> : <Copy size={14} />}
          {copied ? "Copied" : "Copy"}
        </button>
      </div>

      <pre className="p-5 overflow-x-auto text-sm text-gray-100 leading-relaxed">
        <code>{code}</code>
      </pre>
    </div>
  )
}