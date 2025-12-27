ALTER TABLE "products" RENAME COLUMN "product_default_uom" TO "product_default_uom_id";--> statement-breakpoint
ALTER TABLE "products" DROP CONSTRAINT "products_product_default_uom_uom_id_fk";
--> statement-breakpoint
ALTER TABLE "product_variant_prices" ADD COLUMN "product_variant_type_id" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "product_variant_prices" ADD CONSTRAINT "product_variant_prices_product_variant_type_id_tax_types_tax_id_fk" FOREIGN KEY ("product_variant_type_id") REFERENCES "public"."tax_types"("tax_type_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "products" ADD CONSTRAINT "products_product_default_uom_id_uom_id_fk" FOREIGN KEY ("product_default_uom_id") REFERENCES "public"."uom"("id") ON DELETE no action ON UPDATE no action;
