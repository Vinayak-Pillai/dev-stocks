CREATE TYPE "public"."user_is_acitve" AS ENUM('Y', 'N', 'A');--> statement-breakpoint
CREATE TABLE "users" (
	"user_id" serial PRIMARY KEY NOT NULL,
	"username" varchar(100),
	"password" varchar(100) NOT NULL,
	"is_active" "user_is_acitve",
	"created_at" timestamp with time zone DEFAULT now(),
	"created_by" integer,
	"updated_at" timestamp with time zone DEFAULT now(),
	"updated_by" integer,
	CONSTRAINT "users_username_unique" UNIQUE("username")
);
