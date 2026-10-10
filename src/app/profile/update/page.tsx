"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function UpdateProfilePage() {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    await authClient.updateUser({
      name: name,
      fetchOptions: {
        onSuccess: () => {
          setLoading(false);
          alert("প্রোফাইল সফলভাবে আপডেট হয়েছে!");
          router.push("/profile");
        },
        onError: (ctx) => {
          setLoading(false);
          alert(ctx.error.message || "আপডেট করতে সমস্যা হয়েছে।");
        },
      },
    });
  };

  return (
    <div className="max-w-md mx-auto mt-12 p-6 bg-white rounded-2xl shadow-md border border-gray-100">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800">তথ্য আপডেট করুন</h2>
        <Link href="/profile" className="text-sm text-gray-500 hover:text-gray-700">
          ← ফিরে যান
        </Link>
      </div>

      <form onSubmit={handleUpdate} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">নতুন নাম</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="আপনার নতুন নাম লিখুন"
            required
            className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-success text-gray-800"
          />
        </div>
        
        <button
          type="submit"
          disabled={loading}
          className="w-full py-2.5 bg-success text-white font-semibold rounded-xl shadow-xs hover:opacity-90 transition-all cursor-pointer"
        >
          {loading ? "আপডেট হচ্ছে..." : "Update Information"}
        </button>
      </form>
    </div>
  );
}