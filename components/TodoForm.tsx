"use client";

import { createTodo } from "@/actions/todo";
import { useRef } from "react";
import { Plus } from "lucide-react";

export function TodoForm() {
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <form
      action={async (formData) => {
        await createTodo(formData);
        formRef.current?.reset();
      }}
      className="group relative flex items-center mb-6"
    >
      <div className="absolute left-4 text-slate-400 group-focus-within:text-slate-600 transition-colors">
        <Plus size={20} strokeWidth={2.5} />
      </div>

      {/* 2. The Styled Input */}
      <input
        name="content"
        type="text"
        placeholder="Add a new task and press Enter"
        className="w-full pl-12 pr-4 py-4 bg-slate-100 border-2 border-transparent rounded-xl 
                   text-slate-900 placeholder:text-slate-500 outline-none
                   transition-all duration-200
                   focus:bg-white focus:border-slate-300 focus:shadow-sm"
      />
    </form>
  );
}
