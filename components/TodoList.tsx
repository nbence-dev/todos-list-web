import { TodoItem } from "./TodoItem";

interface Todo {
  id: number;
  content: string;
  userId: number;
  completed: boolean;
}

export default function TodoList({ todos }: { todos: Todo[] }) {
  if (todos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="flex items-center justify-center w-16 h-16 bg-slate-100 rounded-full mb-4">
          <svg
            className="w-8 h-8 text-slate-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={3}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m4.5 12.75 6 6 9-13.5"
            />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-slate-900">No tasks yet</h3>
        <p className="text-slate-500 text-sm">
          Start by adding your first task above.
        </p>
      </div>
    );
  }
  return (
    <div className="space-y-3 mt-6">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          id={todo.id}
          content={todo.content}
          completed={todo.completed}
        />
      ))}
    </div>
  );
}
