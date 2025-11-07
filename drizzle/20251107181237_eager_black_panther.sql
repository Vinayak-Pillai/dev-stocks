CREATE TABLE "roles" (
	"role_id" serial PRIMARY KEY NOT NULL,
	"role_name" varchar(100),
	"role_is_active" "user_is_acitve",
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone,
	"created_by" integer,
	"updated_by" integer,
	CONSTRAINT "roles_role_name_unique" UNIQUE("role_name")
);
--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "role_id" integer;--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_role_id_roles_role_id_fk" FOREIGN KEY ("role_id") REFERENCES "public"."roles"("role_id") ON DELETE no action ON UPDATE no action;