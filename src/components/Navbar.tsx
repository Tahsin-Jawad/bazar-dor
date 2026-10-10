"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState, useRef, useEffect } from "react";
import { useSession, signOut } from "@/lib/auth-client";

export default function Navbar() {
  const { data: session, isPending } = useSession();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  let pathname = "";
  try {
    pathname = usePathname() || "";
  } catch (e) {
    pathname = "";
  }

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const categories = [
    { name: "চাল", slug: "chal", emoji: "🍚" },
    { name: "ডাল", slug: "dal", emoji: "🫘" },
    { name: "তেল", slug: "tel", emoji: "🛢️" },
    { name: "সবজি", slug: "sobji", emoji: "🥦" },
    { name: "মাছ", slug: "mach", emoji: "🐟" },
    { name: "মাংস", slug: "mangsho", emoji: "🍗" },
    { name: "ডিম-দুধ", slug: "dim-dudh", emoji: "🥛" },
    { name: "মসলা", slug: "moshla", emoji: "🌶️" },
  ];

  const tickerItems = [
    { emoji: "🍚", name: "মিনিকেট চাল", price: "৭০", unit: "কেজি", change: "▲ ২.১%", isUp: true },
    { emoji: "🥔", name: "আলু", price: "৩০", unit: "কেজি", change: "▼ ১.৫%", isUp: false },
    { emoji: "🧅", name: "পেঁয়াজ", price: "১১৫", unit: "কেজি", change: "▲ ৩.৪%", isUp: true },
    { emoji: "🍗", name: "ব্রয়লার মুরগি", price: "১৮০", unit: "কেজি", change: "▼ ০.৮%", isUp: false },
    { emoji: "🥚", name: "ডিম", price: "১৫০", unit: "ডজন", change: "▲ ১.২%", isUp: true },
  ];

const userImage = session?.user?.image || `https://api.dicebear.com/7.x/adventurer/svg?seed=${session?.user?.email || 'user'}`;
const userName = session?.user?.name || session?.user?.email?.split('@')[0] || "ব্যবহারকারী";

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-xs text-gray-900">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-3">
          <span className="text-2xl p-2 bg-success/10 rounded-xl">🛒</span>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-success">বাজার দর</h1>
            <p className="text-xs text-gray-500">আজকের বাজারদর</p>
          </div>
        </Link>

        <div className="flex items-center gap-3">
          {isPending ? (
            <div className="text-xs text-gray-400">Loading...</div>
          ) : session ? (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 p-1 rounded-full hover:bg-gray-100 transition-all focus:outline-none"
              >
                <div className="w-9 h-9 rounded-full overflow-hidden border border-gray-200 relative bg-gray-100 flex items-center justify-center">
                  {userImage ? (
                    <img src={userImage} alt={userName} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-xs font-bold text-gray-500">👤</span>
                  )}
                </div>
                <span className="text-sm font-semibold text-gray-800">{userName.split(" ")[0]}</span>
                <span className="text-xs text-gray-500">▾</span>
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-gray-100 py-3 px-4 z-50 text-left space-y-3">
                  <div className="border-b border-gray-100 pb-3">
                    <p className="text-sm font-bold text-gray-900">{session.user.name}</p>
                    <p className="text-xs text-gray-500 truncate">{session.user.email}</p>
                  </div>
                  <div className="space-y-1">
                    <Link
                      href="/profile"
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-2 text-xs font-semibold text-gray-700 p-2 rounded-xl hover:bg-gray-50 transition-all"
                    >
                      👤 আমার প্রোফাইল
                    </Link>
                    <button
                      onClick={() => {
                        setDropdownOpen(false);
                        signOut();
                      }}
                      className="w-full flex items-center gap-2 text-xs font-semibold text-red-500 p-2 rounded-xl hover:bg-red-50 transition-all text-left"
                    >
                      ↵ সাইন আউট
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link href="/signin" className="btn btn-sm btn-ghost font-medium text-gray-700 rounded-xl">
                সাইন ইন
              </Link>
              <Link href="/signup" className="btn btn-sm btn-success text-white font-medium rounded-xl shadow-xs">
                সাইন আপ
              </Link>
            </div>
          )}
        </div>
      </div>

      <div className="bg-base-200/60 border-t border-b border-gray-100 overflow-hidden py-1.5 whitespace-nowrap flex">
        <div className="inline-flex animate-marquee gap-8 items-center text-xs font-medium shrink-0">
          {tickerItems.map((item, index) => (
            <div key={`1-${index}`} className="inline-flex items-center gap-1.5 px-2">
              <span>{item.emoji}</span>
              <span className="font-bold text-gray-800">{item.name}</span>
              <span className="text-gray-600">{item.price} টাকা/{item.unit}</span>
              <span className={item.isUp ? "text-success font-bold" : "text-error font-bold"}>
                {item.change}
              </span>
            </div>
          ))}
        </div>
        <div className="inline-flex animate-marquee gap-8 items-center text-xs font-medium shrink-0 ml-8" aria-hidden="true">
          {tickerItems.map((item, index) => (
            <div key={`2-${index}`} className="inline-flex items-center gap-1.5 px-2">
              <span>{item.emoji}</span>
              <span className="font-bold text-gray-800">{item.name}</span>
              <span className="text-gray-600">{item.price} টাকা/{item.unit}</span>
              <span className={item.isUp ? "text-success font-bold" : "text-error font-bold"}>
                {item.change}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-gray-100 bg-white">
        <div className="max-w-7xl mx-auto px-4 flex overflow-x-auto py-2 gap-2 scrollbar-none">
          {categories.map((cat) => {
            const isActive = pathname === `/category/${cat.slug}`;
            return (
              <Link
                key={cat.slug}
                href={`/category/${cat.slug}`}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                  isActive
                    ? "bg-success text-white shadow-xs"
                    : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                }`}
              >
                <span>{cat.emoji}</span>
                <span>{cat.name}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </header>
  );
}