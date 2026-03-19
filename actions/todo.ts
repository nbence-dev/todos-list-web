"use server";

import { revalidatePath } from "next/cache";
import { createTodoInDb } from "@/lib/dal/todo";
import { TodoSchema } from "@/lib/validation";

export async function createTodo(formData: FormData) {
  const content = formData.get("content");

  try {
    const validated = TodoSchema.parse({ content });
    await createTodoInDb(validated.content, 1);
    revalidatePath("/");
  } catch (error) {
    console.error("Failed to create todo: ", error);
  }
}
