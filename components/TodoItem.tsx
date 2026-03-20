"use client";
import { Trash2, Check } from "lucide-react";
import { deleteTodo, updateTodo } from "@/actions/todo";

interface TodoProps {
  id: number;
  content: string;
  completed: boolean;
}

export function TodoItem({ id, content, completed }: TodoProps) {
  return (
    <div className="group flex items-center gap-3 p-4 mb-3 border border-slate-100 rounded-xl bg-white transition-all hover:border-slate-300 hover:shadow-md">
      <button
        onClick={() => updateTodo(id, completed)}
        className={`h-6 w-6 rounded-full border flex items-center justify-center transition-all
          ${
            completed
              ? "bg-green-500 border-green-500 text-white"
              : "bg-slate-50 border-slate-300 hover:border-slate-400"
          }`}
      >
        {completed && <Check size={14} strokeWidth={3} />}
      </button>
      <span
        className={`flex-1 text-sm font-medium transition-all
        ${completed ? "text-slate-400 line-through" : "text-slate-700"}
      `}
      >
        {content}
      </span>
      <button
        onClick={() => deleteTodo(id)}
        className="opacity-0 group-hover:opacity-100 p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
      >
        <Trash2 size={18} />
      </button>
    </div>
  );
}
