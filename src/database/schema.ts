import { numeric, varchar } from 'drizzle-orm/pg-core';
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

export const isUomActiveEnum = pgEnum('uom_is_active', ['Y', 'N', 'A']);
export const isUomSIEnum = pgEnum('user_is_si', ['Y', 'N']);
export const uom = pgTable('uom', {
  id: serial('id').primaryKey(),
  uom_code: varchar('uom_code', { length: 10 }).notNull(),
  uom_name: varchar('uom_name', { length: 100 }).notNull(),
  uom_multiplier: numeric('uom_multiplier', { precision: 10, scale: 4 })
    .default('1.0000')
    .notNull(),
  uom_is_active: isUomActiveEnum('uom_is_active').default('Y'),
  uom_is_si_unit: isUomSIEnum('uom_is_si_unit').default('Y'),
});

export const productStatusEnum = pgEnum('product_status_enum', ['Y', 'N', 'A']);
export const products = pgTable('products', {
  product_id: serial('product_id').primaryKey(),
  product_name: varchar('product_name', { length: 255 }).notNull(),
  product_code: varchar('product_code', { length: 50 }).notNull(),
  product_default_uom: integer('product_default_uom')
    .notNull()
    .references(() => uom.id),
  product_description: varchar('product_description', { length: 255 }),
  product_image: varchar('product_image', { length: 500 }),
  product_is_active: productStatusEnum('product_is_active')
    .default('Y')
    .notNull(),
  created_at: timestamp('created_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
  created_by: integer('created_by').notNull(),
  updated_at: timestamp('updated_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
  updated_by: integer('updated_by').notNull(),
});
