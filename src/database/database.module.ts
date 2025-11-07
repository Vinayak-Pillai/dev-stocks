import { Pool } from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';
import { configDotenv } from 'dotenv';
import * as schema from '@/database/schema';
import { Global, Module } from '@nestjs/common';
configDotenv();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export const db = drizzle(pool, { schema });
export const DRIZZLE = 'DRIZZLE';
export type TDrizzleDB = typeof db;

@Global()
@Module({
  providers: [
    {
      provide: DRIZZLE,
      useValue: db,
    },
  ],
  exports: [DRIZZLE],
})
export class DatabaseModule {}
