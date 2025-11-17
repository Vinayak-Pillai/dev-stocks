import { varchar } from 'drizzle-orm/pg-core';
import { integer } from 'drizzle-orm/pg-core';
import { timestamp } from 'drizzle-orm/pg-core';
import { serial } from 'drizzle-orm/pg-core';
import { pgTable } from 'drizzle-orm/pg-core';
import { pgEnum } from 'drizzle-orm/pg-core';

export const isUserActiveEnum = pgEnum('user_is_acitve', ['Y', 'N', 'A']);
export const isRoleActiveEnum = pgEnum('user_is_acitve', ['Y', 'N', 'A']);

export const roles = pgTable('roles', {
  role_id: serial('role_id').primaryKey(),
  role_name: varchar('role_name', { length: 100 }).unique(),
  role_is_active: isRoleActiveEnum('role_is_active'),
  created_at: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updated_at: timestamp('updated_at', { withTimezone: true }),
  created_by: integer('created_by'),
  updated_by: integer('updated_by'),
});

export const users = pgTable('users', {
  user_id: serial('user_id').primaryKey(),
  username: varchar('username', { length: 100 }).unique(),
  password: varchar('password', { length: 100 }).notNull(),
  email: varchar('email', { length: 100 }).notNull(),
  phone: integer('phone').notNull(),
  first_name: varchar('first_name', { length: 100 }),
  last_name: varchar('last_name', { length: 100 }),
  address: varchar('address'),
  city: varchar('city', { length: 100 }),
  pincode: varchar('pincode', { length: 6 }),
  is_active: isUserActiveEnum('is_active').default('Y'),
  role_id: integer('role_id').references(() => roles.role_id),
  created_at: timestamp('created_at', { withTimezone: true }).defaultNow(),
  created_by: integer('created_by'),
  updated_at: timestamp('updated_at', { withTimezone: true }).defaultNow(),
  updated_by: integer('updated_by'),
});
