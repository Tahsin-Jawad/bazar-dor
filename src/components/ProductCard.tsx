"use client";

import Link from "next/link";
import React from "react";

interface ProductCardProps {
  id: string | number;
  name: string;
  price: number;
  unit: string;
  emoji?: string;
  change?: number;
}

export default function ProductCard({ id, name, price, unit, emoji, change = 0 }: ProductCardProps) {
  const isUp = change > 0;
  const isDown = change < 0;

  // Convert English numbers to Bengali digits if needed
  const toBengaliNumber = (num: number) => {
    const bengaliDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
    return num.toString().replace(/\d/g, (d) => bengaliDigits[parseInt(d)]);
  };

  return (
    <Link
      href={`/product/${id}`}
      className="bg-white border border-base-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
    >
      <div className="flex items-start gap-3">
        <span className="text-3xl p-2 bg-base-100 rounded-lg">{emoji || "🛒"}</span>
        <div>
          <h3 className="font-semibold text-gray-800 text-base">{name}</h3>
          <p className="text-xs text-gray-500 mt-0.5">প্রতি {unit}</p>
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-base-100 flex justify-between items-end">
        <div>
          <span className="text-xs text-gray-500 block">আজকের দাম</span>
          <span className="text-lg font-bold text-gray-900">
            {toBengaliNumber(price)} টাকা
          </span>
        </div>
        <span
          className={`text-xs font-semibold px-2 py-1 rounded-md flex items-center gap-1 ${
            isUp
              ? "bg-success/10 text-success"
              : isDown
              ? "bg-error/10 text-error"
              : "bg-gray-100 text-gray-600"
          }`}
        >
          {isUp ? "▲ " : isDown ? "▼ " : "—"}
          {toBengaliNumber(Math.abs(change))}%
        </span>
      </div>
    </Link>
  );
}