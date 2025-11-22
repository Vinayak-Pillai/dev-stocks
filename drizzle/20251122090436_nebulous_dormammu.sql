CREATE TABLE "product_variants" (
	"product_variant_id" serial PRIMARY KEY NOT NULL,
	"product_id" integer NOT NULL,
	"product_variant_name" varchar(255) NOT NULL,
	"product_variant_uom" integer NOT NULL,
	"product_variant_price" numeric(10, 4) NOT NULL,
	"product_variant_is_active" "status_enum" DEFAULT 'Y',
	"product_variant_image" varchar(500),
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"created_by" integer NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_by" integer NOT NULL
);
--> statement-breakpoint
ALTER TABLE "product_variants" ADD CONSTRAINT "product_variants_product_id_products_product_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("product_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "product_variants" ADD CONSTRAINT "product_variants_product_variant_uom_uom_id_fk" FOREIGN KEY ("product_variant_uom") REFERENCES "public"."uom"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "products" ADD CONSTRAINT "products_product_code_unique" UNIQUE("product_code");