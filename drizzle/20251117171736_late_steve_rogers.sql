ALTER TABLE "users" ALTER COLUMN "is_active" SET DEFAULT 'Y';--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "address" varchar;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "city" varchar(100);--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "pincode" varchar(6);