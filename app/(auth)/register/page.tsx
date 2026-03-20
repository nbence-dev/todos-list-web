"use client";

import { AuthForm } from "@/components/AuthForm";
import { registerUser } from "@/actions/auth";

export default function Register() {
  // Developer Note:
  // Next.js 16 uses Server Actions for registration.
  // The 'actionProp' is passed to the AuthForm, which handles
  // the transition states (loading) and displays the error
  // returned by your backend logic.

  return (
    <main className="min-h-screen flex items-center justify-center px-4 py-12 bg-slate-50">
      <div className="w-full max-w-md">
        <AuthForm mode="register" actionProp={registerUser} />
      </div>
    </main>
  );
}
