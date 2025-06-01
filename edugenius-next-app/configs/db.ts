import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { BaseEnvironment } from "./BaseEnvironment";

const env = new BaseEnvironment();

// TEMP: Log the value to check if it's available in production
if (!env.DRIZZLE_DATABASE_URL) {
  console.error("DRIZZLE_DATABASE_URL is missing!");
} else {
  console.log("DRIZZLE_DATABASE_URL loaded:", env.DRIZZLE_DATABASE_URL.slice(0, 20) + "...");
}

const sql = neon(env.DRIZZLE_DATABASE_URL!);
export const db = drizzle(sql);
