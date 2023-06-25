import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const db = new pg.Client({ connectionString: process.env.DATABASE_URL });

await db.connect();

export { db };
