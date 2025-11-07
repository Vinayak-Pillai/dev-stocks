import { configDotenv } from 'dotenv';
import { defineConfig } from 'drizzle-kit';
configDotenv();
console.log('DATABASE_URL =', process.env.DATABASE_URL);
export default defineConfig({
  out: './drizzle',
  schema: ['./src/database/schema.ts'],
  dialect: 'postgresql', // or 'sqlite', 'mysql'
  strict: true,
  migrations: {
    prefix: 'timestamp',
    table: '__drizzle_migrations__',
    schema: 'public',
  },
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
