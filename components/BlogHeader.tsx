"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export default function BlogHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-16">
          {/* Logo (Left) */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center gap-2">
              <img
                src="/logo.png"
                alt="Cloud101 Academy"
                className="h-16 w-auto object-contain"
              />
            </Link>
          </div>

          {/* Center Nav (Desktop) */}
          <div className="hidden md:flex flex-1 justify-center items-center gap-8">
            <Link
              href="/#about"
              className="text-sm font-medium text-gray-600 hover:text-gray-900 transition"
            >
              About
            </Link>
            <Link
              href="/#contact"
              className="text-sm font-medium text-gray-600 hover:text-gray-900 transition"
            >
              Contact
            </Link>
            <Link
              href="/blog"
              className="text-sm font-medium text-gray-600 hover:text-gray-900 transition"
            >
              Blog
            </Link>
          </div>

          {/* CTA (Right – Desktop) */}
          <div className="hidden md:flex flex-shrink-0">
            <Link
              href="/#contact"
              className="inline-flex items-center px-5 py-2 rounded-full bg-[#0B66FF] text-white text-sm font-medium hover:bg-[#0546C8] transition"
            >
              Reserve Seat
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden ml-auto p-2 rounded-md text-gray-600 hover:bg-gray-100"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden border-t border-gray-100 py-4 animate-in fade-in slide-in-from-top-2">
            <nav className="flex flex-col gap-3">
              <Link
                href="/#about"
                onClick={() => setMenuOpen(false)}
                className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                About
              </Link>

              <Link
                href="/#contact"
                onClick={() => setMenuOpen(false)}
                className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Contact
              </Link>

              <Link
                href="/blog"
                onClick={() => setMenuOpen(false)}
                className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Blog
              </Link>

              <Link
                href="/#contact"
                onClick={() => setMenuOpen(false)}
                className="mt-2 text-center px-4 py-2 rounded-full bg-[#0B66FF] text-white text-sm font-medium hover:bg-[#0546C8]"
              >
                Reserve Seat
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}