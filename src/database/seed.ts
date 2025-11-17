import { configDotenv } from 'dotenv';
import { drizzle } from 'drizzle-orm/node-postgres';
import * as schema from '@/database/schema';
import { Pool } from 'pg';
import bcrypt from 'bcryptjs';
configDotenv();

const seedData = async () => {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL!,
  });

  const db = drizzle(pool, { schema });

  await db.insert(schema.roles).values([
    {
      role_name: 'Superadmin',
      role_is_active: 'Y',
    },
  ]);

  console.log('✅Roles seeeded....');

  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync('devstocks@0@0', salt);

  await db.insert(schema.users).values([
    {
      username: 'superadmin',
      password: hash,
      role_id: 1,
      email: 'superadmin@devstocks.co.in',
      phone: 1234568970,
    },
  ]);

  console.log('✅Users seeeded....');

  await pool.end();
  console.log('Seeding completed...');
};

seedData();
