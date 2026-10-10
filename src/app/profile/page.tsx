"use client";

import React, { useState, useEffect } from "react";
import { useSession, signOut } from "@/lib/auth-client";
import toast from "react-hot-toast";

export default function ProfilePage() {
  const { data: session, isPending } = useSession();
  const [name, setName] = useState("");

  useEffect(() => {
    if (session?.user?.name) {
      setName(session.user.name);
    }
  }, [session]);

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("তথ্য সফলভাবে আপডেট হয়েছে!");
  };

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

        <div className="bg-white border border-gray-200/80 rounded-3xl p-8 shadow-xs space-y-6">
          <h3 className="text-sm font-bold text-gray-900 border-b border-gray-100 pb-3">তথ্য</h3>

          <form onSubmit={handleUpdate} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-700">নাম</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-success bg-gray-50/30"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-success hover:bg-success/90 text-white font-semibold rounded-xl text-xs transition-all shadow-xs"
            >
              আপডেট
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}