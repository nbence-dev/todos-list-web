"use server";
import { cookies } from "next/headers";

export async function createSession(userId: number) {
  const cookieStore = await cookies();
  cookieStore.set("session", String(userId), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    sameSite: "lax", // Good for security
    maxAge: 60 * 60 * 24 * 7, // 1 week
  });
}

export async function deleteSession() {
  const cookieStore = await cookies();
  cookieStore.delete("session");
}

export async function getUserId() {
  const cookieStore = await cookies();
  const userId = cookieStore.get("session")?.value;
  if (!userId) throw new Error("Unauthorized");
  return Number(userId);
}
