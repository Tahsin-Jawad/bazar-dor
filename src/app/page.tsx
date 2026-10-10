"use client";

import React, { useState, useEffect } from "react";
import ProductCard from "@/components/ProductCard";

interface Product {
  id: string | number;
  name: string;
  price: number;
  unit: string;
  emoji?: string;
  change?: number;
}

export default function Home() {
  const [currentDate, setCurrentDate] = useState<string>("");

  useEffect(() => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    setCurrentDate(new Date().toLocaleDateString("bn-BD", options));
  }, []);

  const [products] = useState<Product[]>([
    { id: 1, name: "পেঁয়াজ", price: 115, unit: "কেজি", emoji: "🧅", change: 3.4 },
    { id: 2, name: "আদা", price: 245, unit: "কেজি", emoji: "🫚", change: 2.0 },
    { id: 3, name: "বেগুন", price: 65, unit: "কেজি", emoji: "🍆", change: -1.5 },
    { id: 4, name: "রুই মাছ", price: 380, unit: "কেজি", emoji: "🐟", change: 4.0 },
    { id: 5, name: "ডিম", price: 148, unit: "ডজন", emoji: "🥚", change: -0.5 },
    { id: 6, name: "মাখন (১০০ গ্রাম)", price: 145, unit: "পিস", emoji: "🧈", change: 1.2 },
    { id: 7, name: "কাঁচা মরিচ", price: 120, unit: "কেজি", emoji: "🌶️", change: -2.5 },
    { id: 8, name: "রসুন", price: 225, unit: "কেজি", emoji: "🧄", change: 1.8 },
    { id: 9, name: "আলু", price: 30, unit: "কেজি", emoji: "🥔", change: -1.0 },
  ]);

  const risers = products.filter((p) => (p.change ?? 0) > 0);
  const fallers = products.filter((p) => (p.change ?? 0) < 0);

  return (
    <div className="min-h-screen bg-[#f4f7f4] text-gray-900 pb-16">
      <div className="max-w-7xl mx-auto px-4 py-6 space-y-10">
        {/* Date & Banner */}
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 bg-[#e2ede2] text-[#00a651] px-3.5 py-1.5 rounded-full text-xs font-bold shadow-2xs">
            <span>📅</span> {currentDate || "শনিবার, ১০ অক্টোবর, ২০২৬"}
          </div>

          <section className="bg-white border border-gray-200/80 rounded-3xl p-6 md:p-10 flex flex-col md:flex-row items-center justify-between gap-8 shadow-xs">
            <div className="space-y-4 max-w-xl">
              <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight">
                আজকের বাজারের দাম এক নজরে
              </h1>
              <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বোচ্চ এবং দামের পরিবর্তন এক জায়গায়।
              </p>
              <div>
                <a
                  href="#sob-ponyo"
                  className="inline-block bg-[#00a651] hover:bg-[#008d44] text-white font-semibold px-6 py-3 rounded-2xl transition-all shadow-xs"
                >
                  সব পণ্য দেখুন
                </a>
              </div>
            </div>

            <div className="p-2 flex items-center justify-center">
              <img
                src="/bazar-hero.png"
                alt="Bazar Hero"
                className="w-48 md:w-56 h-auto object-contain"
              />
            </div>
          </section>
        </div>

        {/* Risers */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <span className="text-[#00a651]">▲</span> আজ দাম বেড়েছে
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
            {risers.map((item) => (
              <ProductCard
                key={item.id}
                id={item.id}
                name={item.name}
                price={item.price}
                unit={item.unit}
                emoji={item.emoji}
                change={item.change}
              />
            ))}
          </div>
        </section>

        {/* Fallers */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <span className="text-red-600">▼</span> আজ দাম কমেছে
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
            {fallers.map((item) => (
              <ProductCard
                key={item.id}
                id={item.id}
                name={item.name}
                price={item.price}
                unit={item.unit}
                emoji={item.emoji}
                change={item.change}
              />
            ))}
          </div>
        </section>

        {/* All Products */}
        <section id="sob-ponyo" className="space-y-4 pt-4">
          <h2 className="text-2xl font-bold text-gray-900">সব পণ্য</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
            {products.map((item) => (
              <ProductCard
                key={item.id}
                id={item.id}
                name={item.name}
                price={item.price}
                unit={item.unit}
                emoji={item.emoji}
                change={item.change}
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}