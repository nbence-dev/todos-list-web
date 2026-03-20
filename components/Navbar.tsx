"use client";

import { LogOut, CheckSquare } from "lucide-react";
import { logoutUser } from "@/actions/auth";

interface NavbarProps {
  userEmail?: string;
}

export function Navbar({ userEmail }: NavbarProps) {
  return (
    <header className="border-b border-slate-200 bg-white shadow-sm">
      <div className="mx-auto max-w-4xl px-4 py-3 flex items-center justify-between">
        {/* Branding */}
        <div className="flex items-center gap-2">
          <div className="bg-blue-600 p-1.5 rounded-lg text-white">
            <CheckSquare size={20} />
          </div>
          <h1 className="font-bold text-slate-900 tracking-tight text-lg">
            TodoApp
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
            onClick={() => logoutUser()}
            className="flex items-center gap-2 px-3 py-2 text-sm font-semibold text-slate-600 
                       hover:text-red-600 hover:bg-red-50 rounded-lg transition-all border border-transparent 
                       hover:border-red-100"
          >
            <LogOut size={16} />
            <span className="hidden xs:block">Logout</span>
          </button>
        </div>
      </div>
    </header>
  );
}
