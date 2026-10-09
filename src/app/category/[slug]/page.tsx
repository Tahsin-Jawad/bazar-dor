"use client";

import React, { useEffect, useState } from "react";
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
  const fallbackProducts: Product[] = [
    { id: 1, name: "মিনিকেট চাল", price: 70, unit: "কেজি", emoji: "🍚", change: 2.1 },
    { id: 2, name: "পেঁয়াজ", price: 115, unit: "কেজি", emoji: "🧅", change: 3.4 },
    { id: 3, name: "আলু", price: 30, unit: "কেজি", emoji: "🥔", change: -1.5 },
    { id: 4, name: "ব্রয়লার মুরগি", price: 180, unit: "কেজি", emoji: "🍗", change: -0.8 },
    { id: 5, name: "ডিম", price: 150, unit: "ডজন", emoji: "🥚", change: 1.2 },
    { id: 6, name: "রুই মাছ", price: 350, unit: "কেজি", emoji: "🐟", change: 4.0 },
    { id: 7, name: "কাঁচা মরিচ", price: 120, unit: "কেজি", emoji: "🌶️", change: -2.5 },
    { id: 8, name: "মসুর ডাল", price: 130, unit: "কেজি", emoji: "🫘", change: 0.5 },
  ];

  const [products, setProducts] = useState<Product[]>(fallbackProducts);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    async function loadProducts() {
      try {
        const res = await fetch("https://api.api-store.workers.dev/api/bazardor/products");
        if (res.ok) {
          const data = await res.json();
          const items = Array.isArray(data) ? data : data.products || [];
          if (items.length > 0) {
            setProducts(items);
          }
        }
      } catch (err) {
        // Silently catch network/CORS errors to prevent runtime overlay
        console.info("Running with offline fallback data.");
      }
    }

    loadProducts();
  }, []);

  const risers = [...products].sort((a, b) => (b.change || 0) - (a.change || 0)).slice(0, 6);
  const fallers = [...products].sort((a, b) => (a.change || 0) - (b.change || 0)).slice(0, 6);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-12">
      <section className="bg-success/10 rounded-2xl p-6 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="space-y-4 max-w-xl">
          <span className="text-xs font-bold uppercase tracking-wider bg-success text-white px-3 py-1 rounded-full">
            আজকের বাজার
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
            আজকের বাজারের দাম এক নজরে
          </h1>
          <p className="text-gray-600 text-sm md:text-base">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বোচ্চ এবং দামের পরিবর্তন এক জায়গায়।
          </p>
          <div>
            <a
              href="#sob-ponyo"
              className="inline-block bg-success hover:bg-success-focus text-white font-medium px-6 py-3 rounded-xl transition-all shadow-sm"
            >
              সব পণ্য দেখুন
            </a>
          </div>
        </div>
        <div className="text-7xl md:text-9xl bg-white p-6 rounded-2xl shadow-sm">
          🛒
        </div>
      </section>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="h-40 bg-gray-200 rounded-xl animate-pulse"></div>
          ))}
        </div>
      ) : (
        <>
          <section className="space-y-4">
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <span className="text-success">▲</span> আজ দাম বেড়েছে
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {risers.map((item, idx) => (
                <ProductCard key={item.id || idx} {...item} />
              ))}
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <span className="text-error">▼</span> আজ দাম কমেছে
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {fallers.map((item, idx) => (
                <ProductCard key={item.id || idx} {...item} />
              ))}
            </div>
          </section>

          <section id="sob-ponyo" className="space-y-4 pt-6">
            <h2 className="text-2xl font-bold text-gray-900">সব পণ্য</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products.map((item, idx) => (
                <ProductCard key={item.id || idx} {...item} />
              ))}
            </div>
          </section>
        </>
      )}
    </div>
  );
}