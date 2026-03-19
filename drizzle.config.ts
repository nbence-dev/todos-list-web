import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./db/schema.ts", // Path to your schema file
  out: "./drizzle", // Where migrations will be stored
  dialect: "postgresql", // Or "mysql" / "sqlite" depending on your DB
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
