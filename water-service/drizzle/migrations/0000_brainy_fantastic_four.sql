DO $$ BEGIN
 CREATE TYPE "waterSize" AS ENUM('small', 'medium', 'large');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "water" (
	"id" text PRIMARY KEY NOT NULL,
	"amount" text NOT NULL,
	"size" "waterSize" NOT NULL
);
