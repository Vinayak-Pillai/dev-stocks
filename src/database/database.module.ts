// import { Pool } from 'pg';
// import { drizzle } from 'drizzle-orm/node-postgres';
import { configDotenv } from 'dotenv';
configDotenv();

import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import * as schema from '@/database/schema';
import { Global, Module } from '@nestjs/common';

export const client = neon(process.env.DATABASE_URL!);
export const db = drizzle(client, { schema });

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
