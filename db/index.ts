import { drizzle } from "drizzle-orm/postgres-js"; // or your specific driver
import postgres from "postgres";

const connectionString = process.env.DATABASE_URL!;

// Disable prefetch as it is not supported for "transaction" mode in some edge providers
const client = postgres(connectionString, { prepare: false });
export const db = drizzle(client);
