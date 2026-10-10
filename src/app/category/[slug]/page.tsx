"use client";

import React, { useState, Suspense } from "react";
import { useParams } from "next/navigation";
import ProductCard from "@/components/ProductCard";
import Link from "next/link";

interface Product {
  id: string | number;
  name: string;
  price: number;
  unit: string;
  emoji?: string;
  change?: number;
  category?: string;
}

function CategoryContent() {
  const params = useParams();
  const slug = params?.slug as string;

  const categoryNames: { [key: string]: string } = {
    chal: "চাল",
    dal: "ডাল",
    tel: "তেল",
    sobji: "সবজি",
    mach: "মাছ",
    mangsho: "মাংস",
    "dim-dudh": "ডিম-দুধ",
    moshla: "মসলা",
  };

  const currentCategoryName = categoryNames[slug] || "সকল পণ্য";

  const [products] = useState<Product[]>([
    { id: 1, name: "মিনিকেট চাল", price: 70, unit: "কেজি", emoji: "🍚", change: 2.1, category: "chal" },
    { id: 2, name: "নাজিরশাইল চাল", price: 78, unit: "কেজি", emoji: "🍚", change: 1.5, category: "chal" },
    { id: 3, name: "মসুর ডাল (মোটা)", price: 105, unit: "কেজি", emoji: "🫘", change: 0.5, category: "dal" },
    { id: 4, name: "মসুর ডাল (সরু)", price: 135, unit: "কেজি", emoji: "🫘", change: -0.8, category: "dal" },
    { id: 5, name: "সয়াবিন তেল (৫ লিটার)", price: 830, unit: "লিটার", emoji: "🛢️", change: 3.0, category: "tel" },
    { id: 6, name: "আলু", price: 30, unit: "কেজি", emoji: "🥔", change: -1.0, category: "sobji" },
    { id: 7, name: "পেঁয়াজ", price: 115, unit: "কেজি", emoji: "🧅", change: 3.4, category: "sobji" },
    { id: 8, name: "বেগুন", price: 65, unit: "কেজি", emoji: "🍆", change: -1.5, category: "sobji" },
    { id: 9, name: "রুই মাছ", price: 380, unit: "কেজি", emoji: "🐟", change: 4.0, category: "mach" },
    { id: 10, name: "কাতলা মাছ", price: 400, unit: "কেজি", emoji: "🐟", change: 2.2, category: "mach" },
    { id: 11, name: "ব্রয়লার মুরগি", price: 180, unit: "কেজি", emoji: "🍗", change: -0.8, category: "mangsho" },
    { id: 12, name: "খাসির মাংস", price: 1100, unit: "কেজি", emoji: "🍖", change: 1.0, category: "mangsho" },
    { id: 13, name: "ডিম (হাঁস)", price: 160, unit: "ডজন", emoji: "🥚", change: 1.2, category: "dim-dudh" },
    { id: 14, name: "ডিম (ফার্ম)", price: 148, unit: "ডজন", emoji: "🥚", change: -0.5, category: "dim-dudh" },
    { id: 15, name: "আদা", price: 245, unit: "কেজি", emoji: "🫚", change: 2.0, category: "moshla" },
    { id: 16, name: "রসুন", price: 225, unit: "কেজি", emoji: "🧄", change: 1.8, category: "moshla" },
  ]);

  const [sortOrder, setSortOrder] = useState<string>("default");

  const filteredProducts = products.filter(
    (p) => !slug || p.category === slug
  );

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOrder === "low-high") return a.price - b.price;
    if (sortOrder === "high-low") return b.price - a.price;
    return 0;
  });

  return (
    <div className="min-h-screen bg-[#f4f7f4] text-gray-900 pb-16">
      <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        
        <div className="flex items-center justify-between">
          <Link href="/" className="text-sm font-medium text-success hover:underline flex items-center gap-1">
            ← হোম পেজে ফিরে যান
          </Link>
          <div className="text-xs text-gray-500 font-medium">
            মোট পণ্য: <span className="font-bold text-gray-800">{sortedProducts.length}টি</span>
          </div>
        </div>

        <div className="bg-white border border-gray-200/60 rounded-3xl p-6 md:p-8 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xs">
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900">
              ক্যাটাগরি: {currentCategoryName}
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              এই ক্যাটাগরির বর্তমান বাজার দর এবং বিভিন্ন পণ্যের তালিকা
            </p>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <span className="text-xs font-semibold text-gray-600 whitespace-nowrap">সর্ট করুন:</span>
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="select select-bordered select-sm rounded-xl text-xs w-full sm:w-auto bg-white text-gray-900"
            >
              <option value="default">ডিফল্ট</option>
              <option value="low-high">দাম: কম থেকে বেশি</option>
              <option value="high-low">দাম: বেশি থেকে কম</option>
            </select>
          </div>
        </div>

        {sortedProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {sortedProducts.map((item, idx) => (
              <ProductCard key={item.id || idx} {...item} />
            ))}
          </div>
        ) : (
          <div className="bg-white border border-gray-200 rounded-2xl p-12 text-center space-y-3">
            <span className="text-4xl">🔍</span>
            <h3 className="text-lg font-bold text-gray-800">এই ক্যাটাগরিতে কোনো পণ্য পাওয়া যায়নি</h3>
            <p className="text-sm text-gray-500">অন্য ক্যাটাগরি ব্রাউজ করুন অথবা হোম পেজে ফিরে যান।</p>
          </div>
        )}

      </div>
    </div>
  );
}

export default function CategoryPage() {
  return (
    <Suspense fallback={<div className="text-center py-16">লোড হচ্ছে...</div>}>
      <CategoryContent />
    </Suspense>
  );
}