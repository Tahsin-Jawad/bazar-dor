"use client";

import React from "react";
import Link from "next/link";

interface ProductCardProps {
  id?: string | number;
  name?: string;
  price?: number | string;
  unit?: string;
  emoji?: string;
  change?: number | string;
}

export default function ProductCard({
  id = 1,
  name = "পণ্য",
  price = 0,
  unit = "কেজি",
  emoji = "🛒",
  change = 0,
}: ProductCardProps) {
  const numericChange = Number(change) || 0;
  const isUp = numericChange > 0;
  const isDown = numericChange < 0;

  return (
    <Link
      href={`/product/${id}`}
      className="bg-white border border-gray-100 rounded-2xl p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between gap-4 group"
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <span className="text-3xl p-2 bg-gray-50 rounded-xl group-hover:scale-105 transition-transform">
            {emoji}
          </span>
          <div>
            <h3 className="font-bold text-gray-800 text-base group-hover:text-success transition-colors">
              {name}
            </h3>
            <p className="text-xs text-gray-400">প্রতি {unit}</p>
          </div>
        </div>
      </div>

      <div className="flex items-end justify-between pt-2 border-t border-gray-50">
        <div>
          <span className="text-xs text-gray-400 block">আজকের দাম</span>
          <span className="text-xl font-extrabold text-gray-900">
            {price} <span className="text-xs font-normal text-gray-500">টাকা</span>
          </span>
        </div>
        <span
          className={`text-xs font-semibold px-2 py-1 rounded-md flex items-center gap-1 ${
            isUp
              ? "text-success bg-success/10"
              : isDown
              ? "text-error bg-error/10"
              : "text-gray-500 bg-gray-100"
          }`}
        >
          {isUp ? "▲" : isDown ? "▼" : "—"} {Math.abs(numericChange)}%
        </span>
      </div>
    </Link>
  );
}