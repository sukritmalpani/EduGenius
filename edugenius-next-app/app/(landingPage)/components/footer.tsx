"use client";

import { Lightbulb } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="py-12 border-t border-white/10 bg-[#1A1A2E]">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <Lightbulb className="w-8 h-8 text-[#8A2BE2]" />
              <span className="text-[#00FFFF] font-medium text-xl">
                EduGenius
              </span>
            </Link>
            <p className="text-gray-400">
              Transforming education with the power of artificial intelligence.
            </p>
          </div>

          <div>
            <h3 className="text-[#00FFFF] font-semibold mb-4">Platform</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/courses"
                  className="text-gray-400 hover:text-[#007BFF] transition-colors"
                >
                  Courses
                </Link>
              </li>
              <li>
                <Link
                  href="/tutoring"
                  className="text-gray-400 hover:text-[#007BFF] transition-colors"
                >
                  AI Tutoring
                </Link>
              </li>
              <li>
                <Link
                  href="/tools"
                  className="text-gray-400 hover:text-[#007BFF] transition-colors"
                >
                  Learning Tools
                </Link>
              </li>
              <li>
                <Link
                  href="/pricing"
                  className="text-gray-400 hover:text-[#007BFF] transition-colors"
                >
                  Pricing
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-[#00FFFF] font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/about"
                  className="text-gray-400 hover:text-[#007BFF] transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/careers"
                  className="text-gray-400 hover:text-[#007BFF] transition-colors"
                >
                  Careers
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-gray-400 hover:text-[#007BFF] transition-colors"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-400 hover:text-[#007BFF] transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-[#00FFFF] font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/terms"
                  className="text-gray-400 hover:text-[#007BFF] transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-gray-400 hover:text-[#007BFF] transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/cookies"
                  className="text-gray-400 hover:text-[#007BFF] transition-colors"
                >
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 text-center">
          <p className="text-gray-400">
            © {new Date().getFullYear()} EduGenius. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
