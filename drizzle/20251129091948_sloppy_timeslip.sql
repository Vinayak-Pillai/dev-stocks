CREATE TABLE "product_variant_prices" (
	"product_variant_price_id" serial PRIMARY KEY NOT NULL,
	"product_variant_id" integer NOT NULL,
	"product_variant_price" numeric(10, 4) NOT NULL,
	"product_variant_price_is_active" "status_enum" DEFAULT 'Y',
	"created_at" timestamp with time zone DEFAULT now(),
	"created_by" integer,
	"updated_at" timestamp with time zone DEFAULT now(),
	"updated_by" integer
);
--> statement-breakpoint
ALTER TABLE "product_variants" RENAME COLUMN "product_variant_uom" TO "product_variant_uom_id";--> statement-breakpoint
ALTER TABLE "product_variants" DROP CONSTRAINT "product_variants_product_variant_uom_uom_id_fk";
--> statement-breakpoint
ALTER TABLE "product_variant_prices" ADD CONSTRAINT "product_variant_prices_product_variant_id_product_variants_product_variant_id_fk" FOREIGN KEY ("product_variant_id") REFERENCES "public"."product_variants"("product_variant_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "product_variants" ADD CONSTRAINT "product_variants_product_variant_uom_id_uom_id_fk" FOREIGN KEY ("product_variant_uom_id") REFERENCES "public"."uom"("id") ON DELETE no action ON UPDATE no action;