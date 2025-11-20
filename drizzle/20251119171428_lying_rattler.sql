CREATE TYPE "public"."uom_is_active" AS ENUM('Y', 'N', 'A');--> statement-breakpoint
CREATE TYPE "public"."user_is_si" AS ENUM('Y', 'N');--> statement-breakpoint
CREATE TABLE "uom" (
	"id" serial PRIMARY KEY NOT NULL,
	"uom_code" varchar(10) NOT NULL,
	"uom_name" varchar(100) NOT NULL,
	"uom_multiplier" integer DEFAULT 1 NOT NULL,
	"uom_is_active" "uom_is_active" DEFAULT 'Y',
	"uom_is_si_unit" "user_is_si" DEFAULT 'Y'
);
