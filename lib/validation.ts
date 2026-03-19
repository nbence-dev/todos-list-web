import z from "zod";

export const TodoSchema = z.object({
  content: z.string().min(3, "Todo must atleast have 3 characters"),
});
