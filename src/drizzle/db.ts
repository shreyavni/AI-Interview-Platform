import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

// Use the ! to tell TypeScript the variable will definitely exist
const sql = neon(process.env.DATABASE_URL!);

// The { schema } part allows you to use the power of relational queries later
export const db = drizzle(sql, { schema });