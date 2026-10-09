"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";

interface Product {
  id: string | number;
  name: string;
  price: number;
  unit: string;
  emoji?: string;
  change?: number;
  category?: string;
}

export default function CategoryPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [sortOption, setSortOption] = useState<string>("default");

  // Category name mapping
  const categoryNames: { [key: string]: { name: string; icon: string } } = {
    chal: { name: "চাল", icon: "🍚" },
    dal: { name: "ডাল", icon: "🫘" },
    tel: { name: "তেল", icon: "🫙" },
    sobji: { name: "সবজি", icon: "🥔" },
    mach: { name: "মাছ", icon: "🐟" },
    mangsho: { name: "মাংস", icon: "🍗" },
    "dim-dudh": { name: "ডিম ও দুধ", icon: "🥚" },
    moshla: { name: "মসলা", icon: "🧄" },
  };

  const currentCategory = categoryNames[slug] || { name: slug, icon: "🛒" };

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    fetch(`https://api.api-store.workers.dev/api/bazardor/products?category=${slug}`)
      .then((res) => res.json())
      .then((data) => {
        const items = Array.isArray(data) ? data : data.products || [];
        setProducts(items);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching category products:", err);
        setLoading(false);
      });
  }, [slug]);

  // Sorting logic (C1 requirement)
  const sortedProducts = [...products].sort((a, b) => {
    if (sortOption === "low-to-high") {
      return a.price - b.price;
    } else if (sortOption === "high-to-low") {
      return b.price - a.price;
    }
    return 0; // Default order
  });

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">
        <div className="h-8 w-48 bg-gray-200 rounded animate-pulse"></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="h-44 bg-gray-200 rounded-xl animate-pulse"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      {/* Category Header & Sort Control */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-2xl border border-base-200 shadow-sm">
        <div className="flex items-center gap-3">
          <span className="text-4xl p-3 bg-base-100 rounded-xl">{currentCategory.icon}</span>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{currentCategory.name}</h1>
            <p className="text-sm text-gray-500">মোট {products.length}টি পণ্য পাওয়া গেছে</p>
          </div>
        </div>

        {/* Sort Control Dropdown */}
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-600">সাজান:</span>
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="select select-bordered select-sm rounded-lg"
          >
            <option value="default">ডিফল্ট</option>
            <option value="low-to-high">দাম: কম থেকে বেশি</option>
            <option value="high-to-low">দাম: বেশি থেকে কম</option>
          </select>
        </div>
      </div>

      {/* Product List or Empty State */}
      {sortedProducts.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-base-200 p-8 space-y-4">
          <span className="text-6xl">📭</span>
          <h2 className="text-xl font-bold text-gray-800">এই ক্যাটাগরিতে কোনো পণ্য পাওয়া যায়নি</h2>
          <p className="text-gray-500 text-sm">দয়া করে অন্য ক্যাটাগরি ব্রাউজ করুন অথবা হোম পেজে ফিরে যান।</p>
          <div className="pt-2">
            <Link href="/" className="btn btn-success text-white px-6 rounded-xl">
              হোম পেজে ফিরে যান
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {sortedProducts.map((item) => (
            <ProductCard key={item.id} {...item} />
          ))}
        </div>
      )}
    </div>
  );
}