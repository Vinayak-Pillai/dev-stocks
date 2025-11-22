CREATE TYPE "public"."status_enum" AS ENUM('Y', 'N', 'A');--> statement-breakpoint
CREATE TABLE "taxes" (
	"tax_id" serial PRIMARY KEY NOT NULL,
	"tax_name" varchar(255) NOT NULL,
	"tax_code" varchar(50) NOT NULL,
	"tax_is_active" "status_enum" DEFAULT 'Y' NOT NULL,
	"tax_description" varchar,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"created_by" integer NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_by" integer NOT NULL,
	CONSTRAINT "taxes_tax_code_unique" UNIQUE("tax_code")
);
