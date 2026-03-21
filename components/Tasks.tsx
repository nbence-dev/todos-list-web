"use client";

import { createTodo, deleteTodo, updateTodo } from "@/actions/todo";
import { useOptimistic, useTransition } from "react";
import { TodoForm } from "./TodoForm";
import TodoList from "./TodoList";

interface Todo {
  id: string;
  content: string;
  userId: string;
  completed: boolean;
}

export function Tasks({ todos: initialTodos }: { todos: Todo[] }) {
  const [isPending, startTransition] = useTransition();

  const [optimisticTodos, addOptimisticTodo] = useOptimistic(
    initialTodos,
    (
      state,
      {
        action,
        id,
        content,
        completed,
      }: {
        action: "add" | "toggle" | "delete";
        id?: string;
        content?: string;
        completed?: boolean;
      },
    ) => {
      if (action === "add" && content) {
        // Optimistic add - generate a temporary ID
        const tempId = `temp-${Date.now()}`;
        return [
          ...state,
          {
            id: tempId,
            content,
            userId: "", // Will be set by server
            completed: false,
          },
        ];
      }

      if (action === "toggle" && id) {
        return state.map((t) =>
          t.id === id ? { ...t, completed: completed! } : t,
        );
      }

      if (action === "delete" && id) {
        return state.filter((t) => t.id !== id);
      }

      return state;
    },
  );

  const handleAddTodo = async (formData: FormData) => {
    const content = formData.get("content") as string;
    if (!content.trim()) return;

    startTransition(() => {
      addOptimisticTodo({ action: "add", content });
    });

    await createTodo(formData);
  };

  const handleToggle = async (id: string, currentStatus: boolean) => {
    startTransition(() => {
      addOptimisticTodo({ action: "toggle", id, completed: !currentStatus });
    });
    await updateTodo(id, currentStatus);
  };

  const handleDelete = async (id: string) => {
    startTransition(() => {
      addOptimisticTodo({ action: "delete", id });
    });
    await deleteTodo(id);
  };

  const activeCount = optimisticTodos.filter((todo) => !todo.completed).length;
  const completedCount = optimisticTodos.length - activeCount;

  const statusLabel =
    optimisticTodos.length > 0
      ? `${activeCount} active, ${completedCount} completed`
      : "No tasks yet. Add one to get started!";

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <header className="mb-8">
          <h1 className="text-2xl font-bold text-slate-900">My Tasks</h1>
          <p className="text-slate-500 text-sm">{statusLabel}</p>
        </header>

        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
          <TodoForm onAddTodo={handleAddTodo} />
          <TodoList
            todos={optimisticTodos}
            onToggle={handleToggle}
            onDelete={handleDelete}
            isPending={isPending}
          />
        </div>
      </div>
    </div>
  );
}
