import z from "zod";

export const TodoSchema = z.object({
  content: z.string().min(3, "Todo must atleast have 3 characters"),
});

export const AuthSchema = z.object({
  email: z.email("Please enter a valid email."),
  password: z.string().min(8, "Password must be at least 8 characters."),
});
