CREATE TYPE "public"."product_status_enum" AS ENUM('Y', 'N', 'A');--> statement-breakpoint
CREATE TABLE "products" (
	"product_id" serial PRIMARY KEY NOT NULL,
	"product_name" varchar(255) NOT NULL,
	"product_code" varchar(50) NOT NULL,
	"product_default_uom" integer NOT NULL,
	"product_description" varchar(255),
	"product_image" varchar(500),
	"product_is_active" "product_status_enum" DEFAULT 'Y' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"created_by" integer NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_by" integer NOT NULL
);
--> statement-breakpoint
ALTER TABLE "products" ADD CONSTRAINT "products_product_default_uom_uom_id_fk" FOREIGN KEY ("product_default_uom") REFERENCES "public"."uom"("id") ON DELETE no action ON UPDATE no action;