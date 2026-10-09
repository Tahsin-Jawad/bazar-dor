"use client";

import React, { useEffect, useState } from "react";

interface Product {
  id?: string | number;
  name: string;
  price: number;
  unit: string;
  emoji?: string;
  change?: number; // positive or negative percentage
}

export default function PriceTicker() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    // Fetching products from API store base URL
    fetch("https://api.api-store.workers.dev/api/bazardor/products")
      .then((res) => res.json())
      .then((data) => {
        // Checking if data is array or wrapped in an object
        const items = Array.isArray(data) ? data : data.products || [];
        setProducts(items);
      })
      .catch((err) => console.error("Error fetching ticker products:", err));
  }, []);

  // Fallback ticker items if API is loading or empty
  const defaultItems = [
    { name: "মিনিকেট চাল", price: 70, unit: "কেজি", emoji: "🍚", change: 2.1 },
    { name: "আলু", price: 30, unit: "কেজি", emoji: "🥔", change: -1.5 },
    { name: "পেঁয়াজ", price: 115, unit: "কেজি", emoji: "🧅", change: 3.4 },
    { name: "ব্রয়লার মুরগি", price: 180, unit: "কেজি", emoji: "🍗", change: -0.8 },
    { name: "ডিম", price: 150, unit: "ডজন", emoji: "🥚", change: 1.2 },
  ];

  const displayList = products.length > 0 ? products : defaultItems;

  return (
    <div className="bg-base-200 border-b border-base-300 overflow-hidden py-2 text-sm">
      <div className="flex animate-ticker whitespace-nowrap">
        {[...displayList, ...displayList].map((item, index) => {
          const changeVal = item.change || 0;
          const isUp = changeVal > 0;
          const isDown = changeVal < 0;
          
          return (
            <div key={index} className="flex items-center mx-6 gap-2">
              <span>{item.emoji || "🛒"}</span>
              <span className="font-medium">{item.name}</span>
              <span className="text-gray-600">·</span>
              <span>{item.price} টাকা/{item.unit}</span>
              <span className={`flex items-center text-xs font-semibold ${isUp ? 'text-success' : isDown ? 'text-error' : 'text-gray-500'}`}>
                {isUp ? '▲ ' : isDown ? '▼ ' : '—'} 
                {Math.abs(changeVal)}%
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}