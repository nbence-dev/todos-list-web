import { users, todos } from "@/db/schema";

export type User = typeof users.$inferSelect;
export type Todo = typeof todos.$inferSelect;

export type NewUser = typeof users.$inferInsert;
export type NewTodo = typeof todos.$inferInsert;
