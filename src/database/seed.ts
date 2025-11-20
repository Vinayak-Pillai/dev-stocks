import { configDotenv } from 'dotenv';
import { drizzle } from 'drizzle-orm/node-postgres';
import * as schema from '@/database/schema';
import { Pool } from 'pg';
import bcrypt from 'bcryptjs';
configDotenv();

const uomData = [
  {
    uom_code: 'PCS',
    uom_name: 'Pieces',
    uom_multiplier: 1,
    uom_si_unit: 'N',
  },
  {
    uom_code: 'KG',
    uom_name: 'Kilogram',
    uom_multiplier: 1,
    uom_si_unit: 'Y',
  },
  {
    uom_code: 'G',
    uom_name: 'Gram',
    uom_multiplier: 0.001,
    uom_si_unit: 'Y',
  },
  { uom_code: 'L', uom_name: 'Liter', uom_multiplier: 1, uom_si_unit: 'Y' },
  {
    uom_code: 'ML',
    uom_name: 'Milliliter',
    uom_multiplier: 0.001,
    uom_si_unit: 'Y',
  },
  { uom_code: 'M', uom_name: 'Meter', uom_multiplier: 1, uom_si_unit: 'Y' },
  {
    uom_code: 'CM',
    uom_name: 'Centimeter',
    uom_multiplier: 0.01,
    uom_si_unit: 'Y',
  },
  {
    uom_code: 'FT',
    uom_name: 'Feet',
    uom_multiplier: 0.3048,
    uom_si_unit: 'N',
  },
  {
    uom_code: 'BOX',
    uom_name: 'Box',
    uom_multiplier: 1,
    uom_si_unit: 'N',
  },
  {
    uom_code: 'PKT',
    uom_name: 'Packet',
    uom_multiplier: 1,
    uom_si_unit: 'N',
  },
  {
    uom_code: 'SET',
    uom_name: 'Set',
    uom_multiplier: 1,
    uom_si_unit: 'N',
  },
  {
    uom_code: 'PAIR',
    uom_name: 'Pair',
    uom_multiplier: 1,
    uom_si_unit: 'N',
  },
  {
    uom_code: 'DOZ',
    uom_name: 'Dozen',
    uom_multiplier: 12,
    uom_si_unit: 'N',
  },
];

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

  await db.insert(schema.uom).values(
    uomData.map((uom) => {
      return { ...uom, uom_multiplier: String(uom.uom_multiplier) };
    }),
  );
  console.log('✅UOM seeeded....');

  await pool.end();
  console.log('Seeding completed...');
};

seedData();
