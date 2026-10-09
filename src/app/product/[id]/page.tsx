"use client";

import React, { useEffect, useState } from "react";
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

export default function ProductDetailPage() {
  const params = useParams();
  const id = params?.id;

  const [product, setProduct] = useState<ProductDetail | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!id) return;
    fetch(`https://api.api-store.workers.dev/api/bazardor/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data.product || data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching product details:", err);
        // Fallback dummy detail if fetch fails
        setProduct({
          id,
          name: "মিনিকেট চাল",
          price: 70,
          unit: "কেজি",
          emoji: "🍚",
          change: 2.1,
          markets: [
            { marketName: "কারওয়ান বাজার", price: 68 },
            { marketName: "নিউ মার্কেট", price: 70 },
            { marketName: "মোহাম্মদপুর টাউন হল", price: 72 },
          ],
          minPrice: 68,
          maxPrice: 72,
          avgPrice: 70,
        });
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 space-y-6">
        <div className="h-10 w-3/4 bg-gray-200 rounded animate-pulse"></div>
        <div className="h-64 bg-gray-200 rounded-2xl animate-pulse"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-4">
        <h2 className="text-2xl font-bold text-gray-800">পণ্যটি পাওয়া যায়নি</h2>
        <Link href="/" className="btn btn-success text-white">হোম পেজে ফিরে যান</Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      {/* Back Button */}
      <Link href="/" className="text-sm font-medium text-success hover:underline flex items-center gap-1">
        ← হোম পেজে ফিরে যান
      </Link>

      {/* Main Product Overview Card */}
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

      {/* Price Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-xl border border-base-200 shadow-sm text-center">
          <span className="text-xs text-gray-500 block">সর্বনিম্ন দাম</span>
          <span className="text-xl font-bold text-gray-800">{product.minPrice || product.price - 5} টাকা</span>
        </div>
        <div className="bg-white p-5 rounded-xl border border-base-200 shadow-sm text-center">
          <span className="text-xs text-gray-500 block">গড় দাম</span>
          <span className="text-xl font-bold text-success">{product.avgPrice || product.price} টাকা</span>
        </div>
        <div className="bg-white p-5 rounded-xl border border-base-200 shadow-sm text-center">
          <span className="text-xs text-gray-500 block">সর্বোচ্চ দাম</span>
          <span className="text-xl font-bold text-error">{product.maxPrice || product.price + 5} টাকা</span>
        </div>
      </div>

      {/* Market Breakdown Table */}
      <div className="bg-white rounded-2xl border border-base-200 shadow-sm overflow-hidden p-6 space-y-4">
        বাজারভিত্তিক দামের তালিকা
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
                    <td className="font-medium text-gray-800">কারওয়ান বাজার</td>
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