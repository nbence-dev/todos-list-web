"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, Lock } from "lucide-react";
import SubmitButton from "./AuthButton";

interface AuthFormProps {
  mode: "login" | "register";
  actionProp: (formData: FormData) => Promise<{ error?: string } | void>;
}

// 1. Create a sub-component for the button to use useFormStatus

export function AuthForm({ mode, actionProp }: AuthFormProps) {
  const [error, setError] = useState<string | null>(null);

  // 2. Simplified wrapper
  async function handleAction(formData: FormData) {
    setError(null);

    if (mode === "register") {
      if (formData.get("password") !== formData.get("confirmPassword")) {
        setError("Passwords do not match");
        return;
      }
    }

    const result = await actionProp(formData);
    if (result?.error) {
      setError(result.error);
    }
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 w-full">
      {/* 3. Use the native action prop */}
      <form action={handleAction} className="space-y-5">
        <h2 className="text-2xl font-bold text-slate-900 text-center mb-2">
          {mode === "login" ? "Welcome back" : "Create account"}
        </h2>

        {error && (
          <div className="p-3 text-sm bg-red-50 border border-red-100 text-red-600 rounded-lg animate-in fade-in zoom-in duration-200">
            {error}
          </div>
        )}

        <div className="space-y-1.5">
          <label className="text-sm font-medium text-slate-700">Email</label>
          <div className="relative">
            <Mail
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              size={18}
            />
            <input
              name="email"
              type="email"
              required
              className="w-full text-black pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
              placeholder="you@example.com"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-medium text-slate-700">Password</label>
          <div className="relative">
            <Lock
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              size={18}
            />
            <input
              name="password"
              type="password"
              required
              minLength={8}
              className="w-full text-black pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
              placeholder="••••••••"
            />
          </div>
        </div>

        {mode === "register" && (
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-slate-700">
              Confirm Password
            </label>
            <div className="relative">
              <Lock
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                size={18}
              />
              <input
                name="confirmPassword"
                type="password"
                required
                minLength={8}
                className="w-full text-black pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                placeholder="••••••••"
              />
            </div>
          </div>
        )}

        {/* 4. The new button handles its own loading state natively */}
        <SubmitButton mode={mode} />
      </form>

      <div className="mt-6 text-center text-sm text-slate-500">
        {mode === "login" ? (
          <p>
            New here?{" "}
            <Link
              href="/register"
              className="text-blue-600 font-medium hover:underline"
            >
              Create an account
            </Link>
          </p>
        ) : (
          <p>
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-blue-600 font-medium hover:underline"
            >
              Sign in
            </Link>
          </p>
        )}
      </div>
    </div>
  );
}
