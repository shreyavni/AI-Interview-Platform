import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';

// This forces the app to fail with a clear error if the URL is missing
if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is missing from environment variables");
}

const sql = neon(process.env.DATABASE_URL);
export const db = drizzle(sql);
