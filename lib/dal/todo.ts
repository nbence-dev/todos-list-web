"use server";

import { db } from "@/db";
import { todos } from "@/db/schema";
import { eq, desc, and } from "drizzle-orm";
import { getUserId } from "../session";

export async function createTodoInDb(content: string, userId: number) {
  return await db.insert(todos).values({ content, userId });
}

export async function getTodos() {
  const userId = await getUserId();
  return await db
    .select()
    .from(todos)
    .where(eq(todos.userId, userId))
    .orderBy(desc(todos.createdAt));
}

export async function deleteTodoInDb(todoId: number, userId: number) {
  return await db
    .delete(todos)
    .where(and(eq(todos.id, todoId), eq(todos.userId, userId)));
}

export async function updateTodoInDb(
  todoId: number,
  completed: boolean,
  userId: number,
) {
  return await db
    .update(todos)
    .set({ completed })
    .where(and(eq(todos.id, todoId), eq(todos.userId, userId)));
}
