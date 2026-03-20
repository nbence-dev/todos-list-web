"use server";

import { AuthSchema } from "@/lib/validation";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import { createUser, getUserByEmail } from "@/lib/dal/auth";
import { createSession, deleteSession, getUserId } from "@/lib/session";

export async function registerUser(formData: FormData) {
  const email = formData.get("email");
  const password = formData.get("password");

  const validated = AuthSchema.parse({ email, password });

  const hashedPassword = await bcrypt.hash(validated.password, 10);

  try {
    const newUser = await createUser(validated.email, hashedPassword);

    await createSession(newUser.id);
  } catch (error) {
    return { error: "User already exists or database error" };
  }
  redirect("/");
}

export async function loginUser(formData: FormData) {
  const email = formData.get("email");
  const password = formData.get("password");

  const validated = AuthSchema.parse({ email, password });

  try {
    const user = await getUserByEmail(validated.email);

    if (!user) {
      return { error: "Invalid credentials" };
    }

    const isPasswordValid = await bcrypt.compare(
      validated.password,
      user.password,
    );

    if (!isPasswordValid) {
      return { error: "Invalid credentials" };
    }

    await createSession(user.id);
  } catch (error) {
    return { error: "Database error" };
  }
  redirect("/");
}

export async function logoutUser() {
  try {
    await deleteSession();
  } catch (error) {
    return { error: "Server error" };
  }
  redirect("/login");
}
