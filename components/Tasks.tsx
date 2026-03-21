"use client";

import { createTodo, deleteTodo, updateTodo } from "@/actions/todo";
import { useOptimistic, useTransition, useState } from "react";
import { TodoForm } from "./TodoForm";
import TodoList from "./TodoList";

interface Todo {
  id: string;
  content: string;
  userId: string;
  completed: boolean;
}

export function Tasks({ todos: initialTodos }: { todos: Todo[] }) {
  const [, startTransition] = useTransition();
  const [pendingIds, setPendingIds] = useState<Set<string>>(new Set());
  const [isAddingTodo, setIsAddingTodo] = useState(false);

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

  const isItemPending = (id: string) => pendingIds.has(id);

  const handleAddTodo = async (formData: FormData) => {
    const content = formData.get("content") as string;
    if (!content.trim()) return;

    // Throttle: prevent spamming multiple adds (300ms debounce)
    if (isAddingTodo) return;

    setIsAddingTodo(true);
    const tempId = `temp-${Date.now()}`;
    setPendingIds((prev) => new Set(prev).add(tempId));

    startTransition(() => {
      addOptimisticTodo({ action: "add", content });
    });

    try {
      await createTodo(formData);
    } finally {
      setPendingIds((prev) => {
        const next = new Set(prev);
        next.delete(tempId);
        return next;
      });
    }

    // Re-enable form after 300ms
    setTimeout(() => {
      setIsAddingTodo(false);
    }, 300);
  };

  const handleToggle = async (id: string, currentStatus: boolean) => {
    setPendingIds((prev) => new Set(prev).add(id));

    startTransition(() => {
      addOptimisticTodo({ action: "toggle", id, completed: !currentStatus });
    });

    await updateTodo(id, currentStatus);

    setPendingIds((prev) => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
  };

  const handleDelete = async (id: string) => {
    setPendingIds((prev) => new Set(prev).add(id));

    startTransition(() => {
      addOptimisticTodo({ action: "delete", id });
    });

    await deleteTodo(id);

    setPendingIds((prev) => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
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
          <TodoForm onAddTodo={handleAddTodo} isAdding={isAddingTodo} />
          <TodoList
            todos={optimisticTodos}
            onToggle={handleToggle}
            onDelete={handleDelete}
            isItemPending={isItemPending}
          />
        </div>
      </div>
    </div>
  );
}
