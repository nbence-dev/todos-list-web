import { db } from "@/db";
import { todos } from "@/db/schema";
import { eq, desc, and } from "drizzle-orm";

export async function createTodoInDb(content: string, userId: number) {
  return await db.insert(todos).values({ content, userId });
}

export async function getTodos(userId: number) {
  return await db
    .select()
    .from(todos)
    .where(eq(todos.userId, userId))
    .orderBy(desc(todos.createdAt));
}

export async function deleteTodo(todoId: number, userId: number) {
  return await db
    .delete(todos)
    .where(and(eq(todos.id, todoId), eq(todos.userId, userId)));
}
