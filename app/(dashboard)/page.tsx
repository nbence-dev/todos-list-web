import { Navbar } from "@/components/Navbar";
import { Tasks } from "@/components/Tasks";
import { getUserFromSession } from "@/lib/dal/auth";
import { getTodos } from "@/lib/dal/todo";

export default async function TodoPage() {
  const user = await getUserFromSession();
  const todos = await getTodos();

  return (
    <>
      <Navbar userEmail={user?.email} />
      <Tasks todos={todos} />
    </>
  );
}
