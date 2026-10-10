"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { signUp, signIn } from "@/lib/auth-client";
import { FaGoogle, FaGithub } from "react-icons/fa";

export default function SignUpPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await signUp.email({
        email,
        password,
        name,
      });

      if (error) {
        toast.error(error.message || "Registration failed");
      } else {
        toast.success("Successfully registered!");
        router.push("/signin");
      }
    } catch (err) {
      toast.error("An internal error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = async (provider: "google" | "github") => {
    try {
      await signIn.social({
        provider,
        callbackURL: "/",
      });
    } catch (err) {
      toast.error("Social login failed");
    }
  };

  return (
    <div className="min-h-screen bg-[#f4f7f4] flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full bg-white border border-gray-200/80 rounded-3xl p-8 shadow-xs space-y-6">
        <div className="text-center space-y-2">
          <span className="text-4xl p-3 bg-success/10 rounded-2xl inline-block">🛒</span>
          <h1 className="text-2xl font-extrabold text-gray-900">Sign Up</h1>
          <p className="text-xs text-gray-500">Create a new account</p>
        </div>

        <form onSubmit={handleRegister} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-700">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your Name"
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-success"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-700">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@gmail.com"
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-success"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-success"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-success hover:bg-success/90 text-white font-semibold rounded-xl text-sm transition-all shadow-xs"
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <div className="relative flex py-2 items-center">
          <div className="flex-grow border-t border-gray-200"></div>
          <span className="flex-shrink mx-4 text-xs text-gray-400">Or</span>
          <div className="flex-grow border-t border-gray-200"></div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => handleSocialLogin("google")}
            type="button"
            className="flex items-center justify-center gap-2 py-2.5 border border-gray-200 rounded-xl text-xs font-semibold hover:bg-gray-50 transition-all text-gray-700"
          >
            <FaGoogle className="text-red-500 text-sm" /> Google
          </button>
          <button
            onClick={() => handleSocialLogin("github")}
            type="button"
            className="flex items-center justify-center gap-2 py-2.5 border border-gray-200 rounded-xl text-xs font-semibold hover:bg-gray-50 transition-all text-gray-700"
          >
            <FaGithub className="text-gray-900 text-sm" /> GitHub
          </button>
        </div>

        <p className="text-center text-xs text-gray-500 pt-2">
          Already have an account?{" "}
          <Link href="/signin" className="text-success font-bold hover:underline">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}