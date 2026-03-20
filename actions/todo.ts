"use server";

import { revalidatePath } from "next/cache";
import { createTodoInDb, deleteTodoInDb, updateTodoInDb } from "@/lib/dal/todo";
import { TodoSchema } from "@/lib/validation";
import { getUserId } from "@/lib/session";

export async function createTodo(formData: FormData) {
  try {
    const userId = await getUserId();
    const content = formData.get("content");
    const validated = TodoSchema.parse({ content });

    await createTodoInDb(validated.content, userId);
    revalidatePath("/");
  } catch (error) {
    console.error("Failed to create todo: ", error);
  }
}

export async function deleteTodo(id: number) {
  try {
    const userId = await getUserId();
    await deleteTodoInDb(id, userId);
    revalidatePath("/");
  } catch (error) {
    console.error("Failed to delete todo: ", error);
  }
}

export async function updateTodo(id: number, currentStatus: boolean) {
  try {
    const userId = await getUserId();
    await updateTodoInDb(id, !currentStatus, userId);
    revalidatePath("/");
  } catch (error) {
    console.error("Failed to update todo: ", error);
  }
}
