"use client";

import React from "react";

export default function PriceTicker() {
  const items = [
    { name: "মিনিকেট চাল", price: 70, unit: "কেজি", emoji: "🍚", change: 2.1 },
    { name: "আলু", price: 30, unit: "কেজি", emoji: "🥔", change: -1.5 },
    { name: "পেঁয়াজ", price: 115, unit: "কেজি", emoji: "🧅", change: 3.4 },
    { name: "ব্রয়লার মুরগি", price: 180, unit: "কেজি", emoji: "🍗", change: -0.8 },
    { name: "ডিম", price: 150, unit: "ডজন", emoji: "🥚", change: 1.2 },
    { name: "রুই মাছ", price: 350, unit: "কেজি", emoji: "🐟", change: 4.0 },
  ];

  return (
    <div className="bg-white border-b border-gray-200 overflow-hidden py-2.5 text-sm shadow-xs">
      <div className="flex animate-ticker whitespace-nowrap">
        {[...items, ...items].map((item, index) => {
          const isUp = item.change > 0;
          const isDown = item.change < 0;
          
          return (
            <div key={index} className="flex items-center mx-6 gap-2 text-gray-800 font-medium">
              <span>{item.emoji}</span>
              <span>{item.name}</span>
              <span className="text-gray-400">·</span>
              <span className="font-bold text-gray-900">{item.price} টাকা/{item.unit}</span>
              <span className={`flex items-center text-xs font-semibold px-1.5 py-0.5 rounded ${
                isUp ? 'text-green-600 bg-green-50' : isDown ? 'text-red-600 bg-red-50' : 'text-gray-600 bg-gray-100'
              }`}>
                {isUp ? '▲ ' : isDown ? '▼ ' : '—'} 
                {Math.abs(item.change)}%
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}