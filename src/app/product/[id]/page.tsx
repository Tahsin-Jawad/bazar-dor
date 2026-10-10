"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

interface ProductDetail {
  id: string | number;
  name: string;
  price: number;
  unit: string;
  emoji?: string;
  change?: number;
  category?: string;
  markets?: { marketName: string; price: number }[];
  minPrice?: number;
  maxPrice?: number;
  avgPrice?: number;
}

const mockProducts: Record<string, ProductDetail> = {
  "1": { id: 1, name: "পেঁয়াজ", price: 115, unit: "কেজি", emoji: "🧅", change: 3.4, minPrice: 110, maxPrice: 125, avgPrice: 115 },
  "2": { id: 2, name: "আদা", price: 245, unit: "কেজি", emoji: "🫚", change: 2.0, minPrice: 230, maxPrice: 260, avgPrice: 245 },
  "3": { id: 3, name: "বেগুন", price: 65, unit: "কেজি", emoji: "🍆", change: -1.5, minPrice: 60, maxPrice: 75, avgPrice: 65 },
  "4": { id: 4, name: "রুই মাছ", price: 380, unit: "কেজি", emoji: "🐟", change: 4.0, minPrice: 350, maxPrice: 420, avgPrice: 380 },
  "5": { id: 5, name: "ডিম", price: 148, unit: "ডজন", emoji: "🥚", change: -0.5, minPrice: 145, maxPrice: 155, avgPrice: 148 },
  "6": { id: 6, name: "মাখন (১০০ গ্রাম)", price: 145, unit: "পিস", emoji: "🧈", change: 1.2, minPrice: 140, maxPrice: 150, avgPrice: 145 },
  "7": { id: 7, name: "কাঁচা মরিচ", price: 120, unit: "কেজি", emoji: "🌶️", change: -2.5, minPrice: 110, maxPrice: 135, avgPrice: 120 },
  "8": { id: 8, name: "রসুন", price: 225, unit: "কেজি", emoji: "🧄", change: 1.8, minPrice: 210, maxPrice: 240, avgPrice: 225 },
  "9": { id: 9, name: "আলু", price: 30, unit: "কেজি", emoji: "🥔", change: -1.0, minPrice: 28, maxPrice: 35, avgPrice: 30 },
};

function ProductDetailContent() {
  const params = useParams();
  const id = params?.id as string;

  const [product, setProduct] = useState<ProductDetail | null>(null);

  useEffect(() => {
    if (!id) return;
    
    const found = mockProducts[id];
    if (found) {
      setProduct(found);
    } else {
      setProduct({
        id,
        name: "মিনিকেট চাল",
        price: 70,
        unit: "কেজি",
        emoji: "🍚",
        change: 2.1,
        minPrice: 68,
        maxPrice: 72,
        avgPrice: 70,
      });
    }

    async function fetchDetail() {
      try {
        const res = await fetch(`https://api.api-store.workers.dev/api/bazardor/products/${id}`);
        if (res.ok) {
          const data = await res.json();
          if (data && (data.product || data.name)) {
            setProduct(data.product || data);
          }
        }
      } catch (err) {
        console.info("Using offline product detail fallback.");
      }
    }
    fetchDetail();
  }, [id]);

  if (!product) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-4">
        <h2 className="text-2xl font-bold text-gray-800">পণ্যটি পাওয়া যায়নি</h2>
        <Link href="/" className="btn btn-success text-white">হোম পেজে ফিরে যান</Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      <Link href="/" className="text-sm font-medium text-success hover:underline flex items-center gap-1">
        ← হোম পেজে ফিরে যান
      </Link>

      <div className="bg-white border border-base-200 rounded-2xl p-6 md:p-8 shadow-sm flex flex-col md:flex-row items-center gap-6">
        <span className="text-7xl p-4 bg-base-100 rounded-2xl">{product.emoji || "🛒"}</span>
        <div className="space-y-2 flex-grow text-center md:text-left">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{product.name}</h1>
          <p className="text-gray-500 text-sm">প্রতি {product.unit}</p>
          <div className="flex items-center justify-center md:justify-start gap-4 pt-2">
            <span className="text-2xl font-extrabold text-success">{product.price} টাকা</span>
            <span className={`text-sm font-semibold px-2.5 py-1 rounded-md ${
              (product.change || 0) >= 0 ? "bg-success/10 text-success" : "bg-error/10 text-error"
            }`}>
              {(product.change || 0) >= 0 ? "▲ " : "▼ "}
              {Math.abs(product.change || 0)}%
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-xl border border-base-200 shadow-sm text-center">
          <span className="text-xs text-gray-500 block">সর্বনিম্ন দাম</span>
          <span className="text-xl font-bold text-gray-800">{product.minPrice || product.price - 5} টাকা</span>
        </div>
        <div className="bg-white p-5 rounded-xl border border-base-200 shadow-sm text-center">
          <span className="text-xs text-gray-500 block">গড় দাম</span>
          <span className="text-xl font-bold text-success">{product.avgPrice || product.price} টাকা</span>
        </div>
        <div className="bg-white p-5 rounded-xl border border-base-200 shadow-sm text-center">
          <span className="text-xs text-gray-500 block">সর্বোচ্চ দাম</span>
          <span className="text-xl font-bold text-error">{product.maxPrice || product.price + 5} টাকা</span>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-base-200 shadow-sm overflow-hidden p-6 space-y-4">
        <h3 className="font-bold text-gray-800 text-lg">বাজারভিত্তিক দামের তালিকা</h3>
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr className="bg-base-100">
                <th>বাজারের নাম</th>
                <th>দাম (প্রতি {product.unit})</th>
              </tr>
            </thead>
            <tbody>
              {product.markets && product.markets.length > 0 ? (
                product.markets.map((m, idx) => (
                  <tr key={idx} className="hover">
                    <td className="font-medium text-gray-800">{m.marketName}</td>
                    <td className="font-bold text-success">{m.price} টাকা</td>
                  </tr>
                ))
              ) : (
                <>
                  <tr>
                    <td className="font-medium text-gray-800">কারওয়ান বাজার</td>
                    <td className="font-bold text-success">{product.price - 2} টাকা</td>
                  </tr>
                  <tr>
                    <td className="font-medium text-gray-800">নিউ মার্কেট</td>
                    <td className="font-bold text-success">{product.price} টাকা</td>
                  </tr>
                  <tr>
                    <td className="font-medium text-gray-800">মোহাম্মদপুর টাউন হল</td>
                    <td className="font-bold text-success">{product.price + 3} টাকা</td>
                  </tr>
                </>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default function ProductDetailPage() {
  return (
    <Suspense fallback={<div className="text-center py-12">লোড হচ্ছে...</div>}>
      <ProductDetailContent />
    </Suspense>
  );
}