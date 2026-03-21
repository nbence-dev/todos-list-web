"use client";

import { useRef } from "react";
import { Plus } from "lucide-react";

interface TodoFormProps {
  onAddTodo: (formData: FormData) => Promise<void>;
  isAdding?: boolean;
}

export function TodoForm({ onAddTodo, isAdding = false }: TodoFormProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Prevent multiple submissions
    if (isAdding) return;

    const formData = new FormData(e.currentTarget);
    // Clear input immediately for snappy UX
    if (inputRef.current) {
      inputRef.current.value = "";
    }
    await onAddTodo(formData);
  };

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className="group relative flex items-center mb-6"
    >
      <div className="absolute left-4 text-slate-400 group-focus-within:text-slate-600 transition-colors">
        <Plus size={20} strokeWidth={2.5} />
      </div>

      {/* 2. The Styled Input */}
      <input
        ref={inputRef}
        name="content"
        type="text"
        disabled={isAdding}
        placeholder="Add a new task and press Enter"
        className="w-full pl-12 pr-4 py-4 bg-slate-100 border-2 border-transparent rounded-xl 
                   text-slate-900 placeholder:text-slate-500 outline-none
                   transition-all duration-200
                   focus:bg-white focus:border-slate-300 focus:shadow-sm
                   disabled:opacity-50 disabled:cursor-not-allowed"
      />
    </form>
  );
}
