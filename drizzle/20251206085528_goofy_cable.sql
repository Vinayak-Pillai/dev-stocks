CREATE TABLE "treatment_products" (
	"treatment_product_id" serial PRIMARY KEY NOT NULL,
	"treatment_id" integer NOT NULL,
	"product_id" integer NOT NULL,
	"quantity_to_use" integer DEFAULT 1 NOT NULL,
	"treatment_product_is_active" "status_enum" DEFAULT 'Y',
	"created_at" timestamp with time zone DEFAULT now(),
	"created_by" integer,
	"updated_at" timestamp with time zone DEFAULT now(),
	"updated_by" integer
);
--> statement-breakpoint
CREATE TABLE "treatments" (
	"treatment_id" serial PRIMARY KEY NOT NULL,
	"treatment_name" varchar(500),
	"treatment_description" varchar(500),
	"treatment_cost" numeric(10, 4) NOT NULL,
	"treatment_is_active" "status_enum" DEFAULT 'Y',
	"created_at" timestamp with time zone DEFAULT now(),
	"created_by" integer,
	"updated_at" timestamp with time zone DEFAULT now(),
	"updated_by" integer
);
--> statement-breakpoint
ALTER TABLE "treatment_products" ADD CONSTRAINT "treatment_products_treatment_id_treatments_treatment_id_fk" FOREIGN KEY ("treatment_id") REFERENCES "public"."treatments"("treatment_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "treatment_products" ADD CONSTRAINT "treatment_products_product_id_products_product_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("product_id") ON DELETE no action ON UPDATE no action;