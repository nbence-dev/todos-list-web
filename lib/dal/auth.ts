"use server";

import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { getUserId } from "../session";

export async function getUserByEmail(email: string) {
  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1);
  return user;
}

export async function createUser(email: string, password: string) {
  const [user] = await db
    .insert(users)
    .values({
      email,
      password,
    })
    .returning();
  return user;
}

export async function getUserFromSession() {
  const userId = await getUserId();

  if (!userId) return null;

  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.id, userId))
    .limit(1);

  return user;
}
