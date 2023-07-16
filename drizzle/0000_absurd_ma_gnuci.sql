CREATE TABLE IF NOT EXISTS "author" (
	"id" serial PRIMARY KEY NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"name" text NOT NULL,
	"institution_name" text NOT NULL,
	"cover_photo_id" integer,
	"user_id" text,
	"email" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "author_paper_jt" (
	"id" serial PRIMARY KEY NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"author_id" integer NOT NULL,
	"paper_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "cloud_file" (
	"id" serial PRIMARY KEY NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"is_completed" boolean DEFAULT false NOT NULL,
	"is_public" boolean DEFAULT false NOT NULL,
	"file_name" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "paper" (
	"id" serial PRIMARY KEY NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"title" text NOT NULL,
	"abstract" text NOT NULL,
	"downloads" integer DEFAULT 0 NOT NULL,
	"content_id" integer NOT NULL,
	"cover_photo_id" integer
);
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "user_id_index" ON "author" ("user_id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "file_name_index" ON "cloud_file" ("file_name");--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "author" ADD CONSTRAINT "author_cover_photo_id_cloud_file_id_fk" FOREIGN KEY ("cover_photo_id") REFERENCES "cloud_file"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "author_paper_jt" ADD CONSTRAINT "author_paper_jt_author_id_author_id_fk" FOREIGN KEY ("author_id") REFERENCES "author"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "author_paper_jt" ADD CONSTRAINT "author_paper_jt_paper_id_paper_id_fk" FOREIGN KEY ("paper_id") REFERENCES "paper"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "paper" ADD CONSTRAINT "paper_content_id_cloud_file_id_fk" FOREIGN KEY ("content_id") REFERENCES "cloud_file"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "paper" ADD CONSTRAINT "paper_cover_photo_id_cloud_file_id_fk" FOREIGN KEY ("cover_photo_id") REFERENCES "cloud_file"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
