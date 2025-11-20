ALTER TABLE "uom" ALTER COLUMN "uom_multiplier" SET DATA TYPE numeric(10, 4);--> statement-breakpoint
ALTER TABLE "uom" ALTER COLUMN "uom_multiplier" SET DEFAULT '1.0000';