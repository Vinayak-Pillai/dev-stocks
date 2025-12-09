ALTER TABLE "treatment_products" RENAME COLUMN "product_id" TO "product_variant_id";--> statement-breakpoint
ALTER TABLE "treatment_products" DROP CONSTRAINT "treatment_products_product_id_products_product_id_fk";
--> statement-breakpoint
ALTER TABLE "treatment_products" ADD CONSTRAINT "treatment_products_product_variant_id_product_variants_product_variant_id_fk" FOREIGN KEY ("product_variant_id") REFERENCES "public"."product_variants"("product_variant_id") ON DELETE no action ON UPDATE no action;