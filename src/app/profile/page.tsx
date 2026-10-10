"use client";

import React, { useState, useEffect } from "react";
import { useSession, signOut } from "@/lib/auth-client";
import Link from "next/link"; // Link ইমপোর্ট করা হলো

export default function ProfilePage() {
  const { data: session, isPending } = useSession();

  if (isPending) {
    return (
      <div className="min-h-screen bg-[#f4f7f4] flex items-center justify-center">
        <span className="text-xs text-gray-400">Loading profile...</span>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="min-h-screen bg-[#f4f7f4] flex items-center justify-center">
        <p className="text-xs text-gray-500">প্রোফাইল দেখতে অনুগ্রহ করে সাইন ইন করুন।</p>
      </div>
    );
  }

  const userImage = session.user.image || `https://api.dicebear.com/7.x/adventurer/svg?seed=${session.user.email}`;
  const userName = session.user.name || "ব্যবহারকারী";

  return (
    <div className="min-h-screen bg-[#f4f7f4] py-12 px-4">
      <div className="max-w-2xl mx-auto space-y-8">
        <div className="text-center space-y-1">
          <h1 className="text-2xl font-extrabold text-gray-900">আমার প্রোফাইল</h1>
          <p className="text-xs text-gray-500">আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।</p>
        </div>

        <div className="bg-white border border-gray-200/80 rounded-3xl p-6 flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full overflow-hidden border border-gray-200 relative bg-gray-100 flex items-center justify-center shrink-0">
              {userImage ? (
                <img src={userImage} alt={userName} className="w-full h-full object-cover" />
              ) : (
                <span className="text-xl font-bold text-gray-400">👤</span>
              )}
            </div>
            <div>
              <h2 className="text-base font-bold text-gray-900">{session.user.name}</h2>
              <p className="text-xs text-gray-500">{session.user.email}</p>
            </div>
          </div>

          <button
            onClick={() => signOut()}
            className="flex items-center gap-1.5 text-xs font-semibold text-red-500 border border-red-200 bg-red-50/30 hover:bg-red-50 px-4 py-2.5 rounded-xl transition-all"
          >
            ↵ সাইন আউট
          </button>
        </div>

      
        <div className="bg-white border border-gray-200/80 rounded-3xl p-8 shadow-xs space-y-4 text-center">
          <h3 className="text-sm font-bold text-gray-900">আপনার তথ্য পরিবর্তন করতে চান?</h3>
          <p className="text-xs text-gray-500">নিচের বাটনে ক্লিক করে আপনার অ্যাকাউন্টের নাম আপডেট করুন।</p>
          <Link
            href="/profile/update"
            className="px-4 py-2.5 bg-success text-white font-medium rounded-xl shadow-xs hover:opacity-90 transition-all inline-block text-xs"
          >
            Update Information
          </Link>
        </div>
      </div>
    </div>
  );
}