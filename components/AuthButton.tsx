import { useFormStatus } from "react-dom";
import { Loader2, ArrowRight } from "lucide-react";

export default function SubmitButton({ mode }: { mode: "login" | "register" }) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full bg-slate-900 hover:bg-slate-800 text-white font-semibold py-3 rounded-lg transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
    >
      {pending ? (
        <>
          <Loader2 className="animate-spin" size={20} />
          <span>
            {mode === "login" ? "Signing in..." : "Creating account..."}
          </span>
        </>
      ) : (
        <>
          {mode === "login" ? "Sign In" : "Get Started"}
          <ArrowRight size={18} />
        </>
      )}
    </button>
  );
}
