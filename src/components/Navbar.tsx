"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export default function Navbar() {
  const pathname = usePathname();

  // Categories as required by Figma design
  const categories = [
    { name: "চাল", slug: "chal" },
    { name: "ডাল", slug: "dal" },
    { name: "তেল", slug: "tel" },
    { name: "সবজি", slug: "sobji" },
    { name: "মাছ", slug: "mach" },
    { name: "মাংস", slug: "mangsho" },
    { name: "ডিম-দুধ", slug: "dim-dudh" },
    { name: "মসলা", slug: "moshla" },
  ];

  // Bengali Date helper or static formatted date matching figma
  const banglaDate = "শুক্রবার, ৪ অক্টোবর, ২০২৬";

  return (
    <header className="bg-base-100 border-b border-base-200 sticky top-0 z-50 shadow-sm">
      {/* Top Row: Logo & Auth Buttons */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo and Date */}
        <Link href="/" className="flex items-center gap-3">
          <span className="text-2xl">🛒</span>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-success">বাজার দর</h1>
            <p className="text-xs text-gray-500">{banglaDate}</p>
          </div>
        </Link>

        {/* Right Side Auth Buttons */}
        <div className="flex items-center gap-3">
          <Link href="/signin" className="btn btn-sm btn-ghost font-normal">
            সাইন ইন
          </Link>
          <Link href="/signup" className="btn btn-sm btn-success text-white font-normal">
            সাইন আপ
          </Link>
        </div>
      </div>

      {/* Second Row: Category Navigation Links */}
      <div className="border-t border-base-200 bg-base-100/50 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 flex overflow-x-auto py-2 gap-2 scrollbar-none">
          {categories.map((cat) => {
            const isActive = pathname === `/category/${cat.slug}`;
            return (
              <Link
                key={cat.slug}
                href={`/category/${cat.slug}`}
                className={`px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  isActive
                    ? "bg-success text-white"
                    : "bg-base-200 hover:bg-base-300 text-gray-700"
                }`}
              >
                {cat.name}
              </Link>
            );
          })}
        </div>
      </div>
    </header>
  );
}