"use client";

import { LogOut, CheckSquare, Loader2 } from "lucide-react";
import { logoutUser } from "@/actions/auth";
import { useTransition } from "react";

interface NavbarProps {
  userEmail?: string;
}

export function Navbar({ userEmail }: NavbarProps) {
  const [isPending, startTransition] = useTransition();

  const handleLogout = () => {
    startTransition(async () => {
      await logoutUser();
    });
  };
  return (
    <header className="border-b border-slate-200 bg-white shadow-sm">
      <div className="mx-auto max-w-4xl px-4 py-3 flex items-center justify-between">
        {/* Branding */}
        <div className="flex items-center gap-2">
          <div className="bg-blue-600 p-1.5 rounded-lg text-white">
            <CheckSquare size={20} />
          </div>
          <h1 className="font-bold text-slate-900 tracking-tight text-lg">
            Velocity
          </h1>
        </div>

        {/* User Info & Logout */}
        <div className="flex items-center gap-4">
          {userEmail && (
            <span className="hidden sm:block text-sm font-medium text-slate-500">
              {userEmail}
            </span>
          )}
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-3 py-2 text-sm font-semibold text-slate-600 
                       hover:text-red-600 hover:bg-red-50 rounded-lg transition-all border border-transparent 
                       hover:border-red-100"
          >
            {isPending ? (
              // Show a loading spinner instead of the LogOut icon
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-slate-400 border-t-transparent" />
            ) : (
              <LogOut size={16} />
            )}

            <span className="hidden xs:block">
              {isPending ? "Logging out..." : "Logout"}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
