import { pgTable, text, boolean, timestamp, uuid } from "drizzle-orm/pg-core";

// 1. The User Table
export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// 2. The Updated Todo Table
export const todos = pgTable("todos", {
  id: uuid("id").primaryKey().defaultRandom(),
  content: text("content").notNull(),
  completed: boolean("completed").default(false).notNull(),
  // We link the todo to a user using their ID
  userId: uuid("user_id")
    .references(() => users.id, { onDelete: "cascade" }) // If user is deleted, delete their todos
    .notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
