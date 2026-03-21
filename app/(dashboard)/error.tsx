"use client";

import { useEffect } from "react";
import { AlertCircle, RotateCcw } from "lucide-react";

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an analytics service like Sentry or Logtail
    console.error("Dashboard Crash:", error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] p-6 text-center">
      <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mb-4">
        <AlertCircle size={32} />
      </div>

      <h2 className="text-xl font-bold text-slate-900">Sync Interrupted</h2>
      <p className="text-slate-500 mt-2 mb-8 max-w-xs mx-auto">
        Velocity couldn&apos;t reach the database. This is usually a temporary
        connection blip.
      </p>

      <button
        onClick={() => reset()}
        className="flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-xl font-semibold hover:bg-slate-800 transition-all active:scale-95"
      >
        <RotateCcw size={18} />
        Try Reconnecting
      </button>
    </div>
  );
}
