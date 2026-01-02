'use client'

import { Linkedin, Twitter, Facebook, Instagram } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Grid */}
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          
          {/* Logo + About */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <a href="/"><img
                src="/logo.png"
                alt="Cloud101 Academy Logo"
                className="h-16 w-auto object-contain"
              /></a>
            </div>

            <p className="text-gray-400 text-sm mb-6">
              Practical, job-focused Salesforce training for ambitious professionals.
            </p>

            {/* Social Icons */}
            <div className="flex gap-4">
              <a
                href="https://www.linkedin.com/company/cloud-101"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-gray-800 hover:bg-[#0B66FF] rounded-lg transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
              
              <a
                href="https://twitter.com/cloud101academy"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-gray-800 hover:bg-[#0B66FF] rounded-lg transition-colors"
                aria-label="Twitter"
              >
                <Twitter size={20} />
              </a>

              <a
                href="https://www.facebook.com/profile.php?id=61584005145620"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-gray-800 hover:bg-[#0B66FF] rounded-lg transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>

              <a
                href="https://instagram.com/cloud101academy"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-gray-800 hover:bg-[#0B66FF] rounded-lg transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
            </div>
          </div>

          {/* Platform Links */}
          <div>
            <h4 className="font-bold mb-4">Platform</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>
                <a href="/blog" className="hover:text-white transition">
                  Blog
                </a>
              </li>
              <li>
                <a href="/#batches" className="hover:text-white transition">
                  Batches
                </a>
              </li>
              <li>
                <a href="/#about" className="hover:text-white transition">
                  About
                </a>
              </li>
              <li>
                <a href="/#contact" className="hover:text-white transition">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-bold mb-4">Resources</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>
                <a href="/pdfs/lwc-notes.pdf" download className="hover:text-white transition">
                  LWC Notes
                </a>
              </li>
              <li>
                <a href="/pdfs/apex-notes.pdf" download className="hover:text-white transition">
                  Apex Notes
                </a>
              </li>
              <li>
                <a href="/pdfs/salesforce-admin.pdf" download className="hover:text-white transition">
                  Salesforce Admin
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-bold mb-4">Legal</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>
                <a href="/privacy" className="hover:text-white transition">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="/terms" className="hover:text-white transition">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-gray-700 pt-8">
          <p className="text-center text-gray-400 text-sm">
            © 2025 Cloud101 Academy. All rights reserved. | Made with ❤️ for ambitious professionals
          </p>
        </div>
      </div>
    </footer>
  )
}