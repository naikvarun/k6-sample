DO $$ BEGIN
 CREATE TYPE "waterSize" AS ENUM('green', 'black');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "tealeaf" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"suggested_amount" integer NOT NULL,
	"steeping_time" integer NOT NULL,
	"water_temperature" integer NOT NULL,
	"type" "waterSize" NOT NULL,
	CONSTRAINT "tealeaf_name_unique" UNIQUE("name")
);
