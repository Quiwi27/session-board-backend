import 'dotenv/config';
import * as schema from './schema';
import { drizzle, NodePgDatabase } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL!,
});

export const db: NodePgDatabase<typeof schema> = drizzle(pool, { schema, casing: 'snake_case' });
export type DB = typeof db;
export type TX = typeof db;

export default db;
