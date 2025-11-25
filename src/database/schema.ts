import { numeric, varchar } from 'drizzle-orm/pg-core';
import { integer } from 'drizzle-orm/pg-core';
import { timestamp } from 'drizzle-orm/pg-core';
import { serial } from 'drizzle-orm/pg-core';
import { pgTable } from 'drizzle-orm/pg-core';
import { pgEnum } from 'drizzle-orm/pg-core';

export const isUserActiveEnum = pgEnum('user_is_acitve', ['Y', 'N', 'A']);
export const isRoleActiveEnum = pgEnum('user_is_acitve', ['Y', 'N', 'A']);
export const STATUS_ENUM = pgEnum('status_enum', ['Y', 'N', 'A']);

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
  product_code: varchar('product_code', { length: 50 }).notNull().unique(),
  product_default_uom: integer('product_default_uom')
    .notNull()
    .references(() => uom.id),
  product_description: varchar('product_description', { length: 255 }),
  product_image: varchar('product_image', { length: 500 }),
  product_is_active: productStatusEnum('product_is_active')
    .default('Y')
    .notNull(),
  created_at: timestamp('created_at', { withTimezone: true }).defaultNow(),
  created_by: integer('created_by'),
  updated_at: timestamp('updated_at', { withTimezone: true }).defaultNow(),
  updated_by: integer('updated_by'),
});

export const taxes = pgTable('taxes', {
  tax_id: serial('tax_id').primaryKey(),
  tax_name: varchar('tax_name', { length: 255 }).notNull(),
  tax_code: varchar('tax_code', { length: 50 }).notNull().unique(),
  tax_is_active: STATUS_ENUM('tax_is_active').default('Y').notNull(),
  description: varchar('tax_description'),
  created_at: timestamp('created_at', { withTimezone: true }).defaultNow(),
  created_by: integer('created_by'),
  updated_at: timestamp('updated_at', { withTimezone: true }).defaultNow(),
  updated_by: integer('updated_by'),
});

export const tax_types = pgTable('tax_types', {
  tax_type_id: serial('tax_type_id').primaryKey(),
  tax_id: integer('tax_id')
    .references(() => taxes.tax_id, { onDelete: 'cascade' })
    .notNull(),
  tax_type_name: varchar('tax_type_name', { length: 255 }).notNull(),
  tax_type_percentage: numeric('tax_type_percentage', {
    precision: 10,
    scale: 4,
  }).notNull(),
  tax_type_is_active: STATUS_ENUM('tax_type_is_active').default('Y'),
  priority: integer('priority').default(1).notNull(),
  created_at: timestamp('created_at', { withTimezone: true }).defaultNow(),
  created_by: integer('created_by'),
  updated_at: timestamp('updated_at', { withTimezone: true }).defaultNow(),
  updated_by: integer('updated_by'),
});

export const product_variants = pgTable('product_variants', {
  product_variant_id: serial('product_variant_id').primaryKey(),
  product_id: integer('product_id')
    .references(() => products.product_id)
    .notNull(),
  product_variant_name: varchar('product_variant_name', {
    length: 255,
  }).notNull(),
  product_variant_uom: integer('product_variant_uom')
    .references(() => uom.id)
    .notNull(),
  product_variant_price: numeric('product_variant_price', {
    precision: 10,
    scale: 4,
  }).notNull(),
  product_variant_is_active: STATUS_ENUM('product_variant_is_active').default(
    'Y',
  ),
  product_variant_image: varchar('product_variant_image', { length: 500 }),
  created_at: timestamp('created_at', { withTimezone: true }).defaultNow(),
  created_by: integer('created_by'),
  updated_at: timestamp('updated_at', { withTimezone: true }).defaultNow(),
  updated_by: integer('updated_by'),
});
