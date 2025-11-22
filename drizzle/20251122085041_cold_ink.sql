CREATE TABLE "tax_types" (
	"tax_type_id" serial PRIMARY KEY NOT NULL,
	"tax_id" integer NOT NULL,
	"tax_type_name" varchar(255) NOT NULL,
	"tax_type_percentage" numeric(10, 4) NOT NULL,
	"tax_type_is_active" "status_enum" DEFAULT 'Y',
	"priority" integer DEFAULT 1 NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"created_by" integer NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_by" integer NOT NULL
);
--> statement-breakpoint
ALTER TABLE "tax_types" ADD CONSTRAINT "tax_types_tax_id_taxes_tax_id_fk" FOREIGN KEY ("tax_id") REFERENCES "public"."taxes"("tax_id") ON DELETE cascade ON UPDATE no action;