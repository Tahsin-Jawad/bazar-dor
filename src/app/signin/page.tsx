"use client";

import React, { useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("দয়া করে সব ফিল্ড পূরণ করুন");
      return;
    }
    toast.success("সফলভাবে সাইন ইন হয়েছে!");
  };

  return (
    <div className="min-h-[85vh] bg-[#f4f7f4] flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full bg-white rounded-3xl border border-gray-200/60 shadow-xs p-8 space-y-6">
        <div className="text-center space-y-2">
          <span className="text-4xl inline-block p-3 bg-success/10 rounded-2xl mb-1">🔐</span>
          <h1 className="text-2xl font-extrabold text-gray-900">স্বাগতম</h1>
          <p className="text-sm text-gray-500">আপনার বাজার দর অ্যাকাউন্টে সাইন ইন করুন</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="form-control w-full space-y-1">
            <label className="label">
              <span className="label-text font-semibold text-gray-700 text-xs">ইমেইল ঠিকানা</span>
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@gmail.com"
              className="input input-bordered w-full rounded-xl focus:input-success text-sm"
              required
            />
          </div>

          <div className="form-control w-full space-y-1">
            <label className="label">
              <span className="label-text font-semibold text-gray-700 text-xs">পাসওয়ার্ড</span>
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="input input-bordered w-full rounded-xl focus:input-success text-sm"
              required
            />
          </div>

          <button type="submit" className="btn btn-success text-white w-full rounded-xl font-medium mt-4 shadow-xs">
            সাইন ইন করুন
          </button>
        </form>

        <div className="text-center text-sm text-gray-600 pt-2 border-t border-gray-100">
          কোনো অ্যাকাউন্ট নেই?{" "}
          <Link href="/signup" className="text-success font-semibold hover:underline">
            সাইন আপ করুন
          </Link>
        </div>
      </div>
    </div>
  );
}