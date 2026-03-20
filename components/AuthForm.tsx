import { useState } from "react";
import Link from "next/link";
import { Mail, Lock, Loader2, ArrowRight } from "lucide-react";

interface AuthFormProps {
  mode: "login" | "register";
  actionProp: (formData: FormData) => Promise<{ error?: string } | void>;
}

export function AuthForm({ mode, actionProp }: AuthFormProps) {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleAction(formData: FormData) {
    setLoading(true);
    setError(null);

    // Logic for confirm password check (Client-side only)
    if (mode === "register") {
      if (formData.get("password") !== formData.get("confirmPassword")) {
        setError("Passwords do not match");
        setLoading(false);
        return;
      }
    }

    const result = await actionProp(formData);
    if (result?.error) {
      setError(result.error);
      setLoading(false);
    }
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 w-full">
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
          <p className="text-xs text-slate-500">Minimum 8 characters</p>
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

        <button
          disabled={loading}
          className="w-full bg-slate-900 hover:bg-slate-800 text-white font-semibold py-3 rounded-lg transition-all flex items-center justify-center gap-2"
        >
          {loading ? (
            <Loader2 className="animate-spin" size={20} />
          ) : (
            <>
              {mode === "login" ? "Sign In" : "Get Started"}
              <ArrowRight size={18} />
            </>
          )}
        </button>
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
