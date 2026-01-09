"use client"

import { useEffect, useState } from "react"

export default function ReadingProgressBar() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight

      if (docHeight <= 0) {
        setProgress(0)
        return
      }

      const percent = (scrollTop / docHeight) * 100
      const clamped = Math.min(100, Math.max(0, percent))

      setProgress(clamped)
    }

    handleScroll() // set initial state correctly
    window.addEventListener("scroll", handleScroll, { passive: true })

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="fixed top-0 left-0 w-full h-[3px] bg-transparent z-[60]">
      <div
        className="h-full bg-blue-600 transition-[width] duration-150 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  )
}