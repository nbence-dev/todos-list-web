import { TodoForm } from "@/components/TodoForm";
import TodoList from "@/components/TodoList";
import { getTodos } from "@/lib/dal/todo";

export default async function TodoPage() {
  const todos = await getTodos(1);
  const statusLabel =
    todos.length > 0
      ? `${todos.length} active, 0 completed`
      : "No tasks yet. Add one to get started!";
  return (
    <main className="min-h-screen bg-slate-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <header className="mb-8">
          <h1 className="text-2xl font-bold text-slate-900">My Tasks</h1>
          <p className="text-slate-500 text-sm">{statusLabel}</p>
        </header>

        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
          <TodoForm />
          <TodoList todos={todos} />
        </div>
      </div>
    </main>
  );
}
