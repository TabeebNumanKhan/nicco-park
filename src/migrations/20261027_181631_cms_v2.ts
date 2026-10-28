import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`pages_blocks_offer_spotlight\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`offer_id\` integer,
  	\`layout\` text DEFAULT 'banner',
  	\`tone\` text DEFAULT 'coral',
  	\`show_ends\` integer DEFAULT true,
  	\`display_hidden\` integer,
  	\`display_show_on\` text DEFAULT 'all',
  	\`display_anchor\` text,
  	\`display_show_from\` text,
  	\`display_show_until\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`offer_id\`) REFERENCES \`offers\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_offer_spotlight_order_idx\` ON \`pages_blocks_offer_spotlight\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_offer_spotlight_parent_id_idx\` ON \`pages_blocks_offer_spotlight\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_offer_spotlight_path_idx\` ON \`pages_blocks_offer_spotlight\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_offer_spotlight_offer_idx\` ON \`pages_blocks_offer_spotlight\` (\`offer_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_offer_spotlight_locales\` (
  	\`heading\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_offer_spotlight\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`pages_blocks_offer_spotlight_locales_locale_parent_id_unique\` ON \`pages_blocks_offer_spotlight_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_rides_list\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`world\` text DEFAULT 'dry',
  	\`display_hidden\` integer,
  	\`display_show_on\` text DEFAULT 'all',
  	\`display_anchor\` text,
  	\`display_show_from\` text,
  	\`display_show_until\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_rides_list_order_idx\` ON \`pages_blocks_rides_list\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_rides_list_parent_id_idx\` ON \`pages_blocks_rides_list\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_rides_list_path_idx\` ON \`pages_blocks_rides_list\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_rides_list_locales\` (
  	\`heading\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_rides_list\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`pages_blocks_rides_list_locales_locale_parent_id_unique\` ON \`pages_blocks_rides_list_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_venues_grid\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`display_hidden\` integer,
  	\`display_show_on\` text DEFAULT 'all',
  	\`display_anchor\` text,
  	\`display_show_from\` text,
  	\`display_show_until\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_venues_grid_order_idx\` ON \`pages_blocks_venues_grid\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_venues_grid_parent_id_idx\` ON \`pages_blocks_venues_grid\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_venues_grid_path_idx\` ON \`pages_blocks_venues_grid\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_venues_grid_locales\` (
  	\`heading\` text,
  	\`intro\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_venues_grid\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`pages_blocks_venues_grid_locales_locale_parent_id_unique\` ON \`pages_blocks_venues_grid_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_map\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`query\` text DEFAULT 'Nicco Park, Jheel Meel, Sector IV, Salt Lake, Kolkata',
  	\`show_routes\` integer DEFAULT true,
  	\`display_hidden\` integer,
  	\`display_show_on\` text DEFAULT 'all',
  	\`display_anchor\` text,
  	\`display_show_from\` text,
  	\`display_show_until\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_map_order_idx\` ON \`pages_blocks_map\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_map_parent_id_idx\` ON \`pages_blocks_map\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_map_path_idx\` ON \`pages_blocks_map\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_map_locales\` (
  	\`heading\` text,
  	\`intro\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_map\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`pages_blocks_map_locales_locale_parent_id_unique\` ON \`pages_blocks_map_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_columns_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`icon\` text,
  	\`image_id\` integer,
  	\`link_href\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_columns\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_columns_items_order_idx\` ON \`pages_blocks_columns_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_columns_items_parent_id_idx\` ON \`pages_blocks_columns_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_columns_items_image_idx\` ON \`pages_blocks_columns_items\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_columns_items_locales\` (
  	\`title\` text,
  	\`text\` text,
  	\`link_label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_columns_items\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`pages_blocks_columns_items_locales_locale_parent_id_unique\` ON \`pages_blocks_columns_items_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_columns\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`tone\` text DEFAULT 'white',
  	\`per_row\` text DEFAULT '3',
  	\`display_hidden\` integer,
  	\`display_show_on\` text DEFAULT 'all',
  	\`display_anchor\` text,
  	\`display_show_from\` text,
  	\`display_show_until\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_columns_order_idx\` ON \`pages_blocks_columns\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_columns_parent_id_idx\` ON \`pages_blocks_columns\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_columns_path_idx\` ON \`pages_blocks_columns\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_columns_locales\` (
  	\`eyebrow\` text,
  	\`heading\` text,
  	\`intro\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_columns\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`pages_blocks_columns_locales_locale_parent_id_unique\` ON \`pages_blocks_columns_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_video\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`source\` text DEFAULT 'upload',
  	\`file_id\` integer,
  	\`url\` text,
  	\`poster_id\` integer,
  	\`layout\` text DEFAULT 'framed',
  	\`autoplay\` integer,
  	\`tone\` text DEFAULT 'ink',
  	\`cta_href\` text,
  	\`display_hidden\` integer,
  	\`display_show_on\` text DEFAULT 'all',
  	\`display_anchor\` text,
  	\`display_show_from\` text,
  	\`display_show_until\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`file_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`poster_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_video_order_idx\` ON \`pages_blocks_video\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_video_parent_id_idx\` ON \`pages_blocks_video\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_video_path_idx\` ON \`pages_blocks_video\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_video_file_idx\` ON \`pages_blocks_video\` (\`file_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_video_poster_idx\` ON \`pages_blocks_video\` (\`poster_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_video_locales\` (
  	\`eyebrow\` text,
  	\`heading\` text,
  	\`body\` text,
  	\`cta_label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_video\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`pages_blocks_video_locales_locale_parent_id_unique\` ON \`pages_blocks_video_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_testimonials_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name\` text,
  	\`source\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_testimonials\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_testimonials_items_order_idx\` ON \`pages_blocks_testimonials_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_testimonials_items_parent_id_idx\` ON \`pages_blocks_testimonials_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_testimonials_items_locales\` (
  	\`quote\` text,
  	\`detail\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_testimonials_items\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`pages_blocks_testimonials_items_locales_locale_parent_id_uni\` ON \`pages_blocks_testimonials_items_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_testimonials\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`tone\` text DEFAULT 'cream',
  	\`display_hidden\` integer,
  	\`display_show_on\` text DEFAULT 'all',
  	\`display_anchor\` text,
  	\`display_show_from\` text,
  	\`display_show_until\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_testimonials_order_idx\` ON \`pages_blocks_testimonials\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_testimonials_parent_id_idx\` ON \`pages_blocks_testimonials\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_testimonials_path_idx\` ON \`pages_blocks_testimonials\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_testimonials_locales\` (
  	\`heading\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_testimonials\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`pages_blocks_testimonials_locales_locale_parent_id_unique\` ON \`pages_blocks_testimonials_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_logo_strip_logos\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name\` text,
  	\`href\` text,
  	\`image_id\` integer,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_logo_strip\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_logo_strip_logos_order_idx\` ON \`pages_blocks_logo_strip_logos\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_logo_strip_logos_parent_id_idx\` ON \`pages_blocks_logo_strip_logos\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_logo_strip_logos_image_idx\` ON \`pages_blocks_logo_strip_logos\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_logo_strip\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`display_hidden\` integer,
  	\`display_show_on\` text DEFAULT 'all',
  	\`display_anchor\` text,
  	\`display_show_from\` text,
  	\`display_show_until\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_logo_strip_order_idx\` ON \`pages_blocks_logo_strip\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_logo_strip_parent_id_idx\` ON \`pages_blocks_logo_strip\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_logo_strip_path_idx\` ON \`pages_blocks_logo_strip\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_logo_strip_locales\` (
  	\`heading\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_logo_strip\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`pages_blocks_logo_strip_locales_locale_parent_id_unique\` ON \`pages_blocks_logo_strip_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_faq_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_faq\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_faq_items_order_idx\` ON \`pages_blocks_faq_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_faq_items_parent_id_idx\` ON \`pages_blocks_faq_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_faq_items_locales\` (
  	\`q\` text,
  	\`a\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_faq_items\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`pages_blocks_faq_items_locales_locale_parent_id_unique\` ON \`pages_blocks_faq_items_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_embed\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`code\` text,
  	\`height\` numeric DEFAULT 480,
  	\`display_hidden\` integer,
  	\`display_show_on\` text DEFAULT 'all',
  	\`display_anchor\` text,
  	\`display_show_from\` text,
  	\`display_show_until\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_embed_order_idx\` ON \`pages_blocks_embed\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_embed_parent_id_idx\` ON \`pages_blocks_embed\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_embed_path_idx\` ON \`pages_blocks_embed\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_embed_locales\` (
  	\`heading\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_embed\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`pages_blocks_embed_locales_locale_parent_id_unique\` ON \`pages_blocks_embed_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_spacer\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`size\` text DEFAULT 'm',
  	\`divider\` integer,
  	\`display_hidden\` integer,
  	\`display_show_on\` text DEFAULT 'all',
  	\`display_anchor\` text,
  	\`display_show_from\` text,
  	\`display_show_until\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_spacer_order_idx\` ON \`pages_blocks_spacer\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_spacer_parent_id_idx\` ON \`pages_blocks_spacer\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_spacer_path_idx\` ON \`pages_blocks_spacer\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_reusable\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`section_id\` integer,
  	\`display_hidden\` integer,
  	\`display_show_on\` text DEFAULT 'all',
  	\`display_anchor\` text,
  	\`display_show_from\` text,
  	\`display_show_until\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`section_id\`) REFERENCES \`sections\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_reusable_order_idx\` ON \`pages_blocks_reusable\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_reusable_parent_id_idx\` ON \`pages_blocks_reusable\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_reusable_path_idx\` ON \`pages_blocks_reusable\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_reusable_section_idx\` ON \`pages_blocks_reusable\` (\`section_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_offer_spotlight\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`offer_id\` integer,
  	\`layout\` text DEFAULT 'banner',
  	\`tone\` text DEFAULT 'coral',
  	\`show_ends\` integer DEFAULT true,
  	\`display_hidden\` integer,
  	\`display_show_on\` text DEFAULT 'all',
  	\`display_anchor\` text,
  	\`display_show_from\` text,
  	\`display_show_until\` text,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`offer_id\`) REFERENCES \`offers\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_offer_spotlight_order_idx\` ON \`_pages_v_blocks_offer_spotlight\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_offer_spotlight_parent_id_idx\` ON \`_pages_v_blocks_offer_spotlight\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_offer_spotlight_path_idx\` ON \`_pages_v_blocks_offer_spotlight\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_offer_spotlight_offer_idx\` ON \`_pages_v_blocks_offer_spotlight\` (\`offer_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_offer_spotlight_locales\` (
  	\`heading\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_offer_spotlight\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_pages_v_blocks_offer_spotlight_locales_locale_parent_id_uni\` ON \`_pages_v_blocks_offer_spotlight_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_rides_list\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`world\` text DEFAULT 'dry',
  	\`display_hidden\` integer,
  	\`display_show_on\` text DEFAULT 'all',
  	\`display_anchor\` text,
  	\`display_show_from\` text,
  	\`display_show_until\` text,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_rides_list_order_idx\` ON \`_pages_v_blocks_rides_list\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_rides_list_parent_id_idx\` ON \`_pages_v_blocks_rides_list\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_rides_list_path_idx\` ON \`_pages_v_blocks_rides_list\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_rides_list_locales\` (
  	\`heading\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_rides_list\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_pages_v_blocks_rides_list_locales_locale_parent_id_unique\` ON \`_pages_v_blocks_rides_list_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_venues_grid\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`display_hidden\` integer,
  	\`display_show_on\` text DEFAULT 'all',
  	\`display_anchor\` text,
  	\`display_show_from\` text,
  	\`display_show_until\` text,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_venues_grid_order_idx\` ON \`_pages_v_blocks_venues_grid\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_venues_grid_parent_id_idx\` ON \`_pages_v_blocks_venues_grid\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_venues_grid_path_idx\` ON \`_pages_v_blocks_venues_grid\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_venues_grid_locales\` (
  	\`heading\` text,
  	\`intro\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_venues_grid\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_pages_v_blocks_venues_grid_locales_locale_parent_id_unique\` ON \`_pages_v_blocks_venues_grid_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_map\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`query\` text DEFAULT 'Nicco Park, Jheel Meel, Sector IV, Salt Lake, Kolkata',
  	\`show_routes\` integer DEFAULT true,
  	\`display_hidden\` integer,
  	\`display_show_on\` text DEFAULT 'all',
  	\`display_anchor\` text,
  	\`display_show_from\` text,
  	\`display_show_until\` text,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_map_order_idx\` ON \`_pages_v_blocks_map\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_map_parent_id_idx\` ON \`_pages_v_blocks_map\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_map_path_idx\` ON \`_pages_v_blocks_map\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_map_locales\` (
  	\`heading\` text,
  	\`intro\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_map\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_pages_v_blocks_map_locales_locale_parent_id_unique\` ON \`_pages_v_blocks_map_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_columns_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`icon\` text,
  	\`image_id\` integer,
  	\`link_href\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_columns\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_columns_items_order_idx\` ON \`_pages_v_blocks_columns_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_columns_items_parent_id_idx\` ON \`_pages_v_blocks_columns_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_columns_items_image_idx\` ON \`_pages_v_blocks_columns_items\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_columns_items_locales\` (
  	\`title\` text,
  	\`text\` text,
  	\`link_label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_columns_items\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_pages_v_blocks_columns_items_locales_locale_parent_id_uniqu\` ON \`_pages_v_blocks_columns_items_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_columns\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`tone\` text DEFAULT 'white',
  	\`per_row\` text DEFAULT '3',
  	\`display_hidden\` integer,
  	\`display_show_on\` text DEFAULT 'all',
  	\`display_anchor\` text,
  	\`display_show_from\` text,
  	\`display_show_until\` text,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_columns_order_idx\` ON \`_pages_v_blocks_columns\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_columns_parent_id_idx\` ON \`_pages_v_blocks_columns\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_columns_path_idx\` ON \`_pages_v_blocks_columns\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_columns_locales\` (
  	\`eyebrow\` text,
  	\`heading\` text,
  	\`intro\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_columns\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_pages_v_blocks_columns_locales_locale_parent_id_unique\` ON \`_pages_v_blocks_columns_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_video\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`source\` text DEFAULT 'upload',
  	\`file_id\` integer,
  	\`url\` text,
  	\`poster_id\` integer,
  	\`layout\` text DEFAULT 'framed',
  	\`autoplay\` integer,
  	\`tone\` text DEFAULT 'ink',
  	\`cta_href\` text,
  	\`display_hidden\` integer,
  	\`display_show_on\` text DEFAULT 'all',
  	\`display_anchor\` text,
  	\`display_show_from\` text,
  	\`display_show_until\` text,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`file_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`poster_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_video_order_idx\` ON \`_pages_v_blocks_video\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_video_parent_id_idx\` ON \`_pages_v_blocks_video\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_video_path_idx\` ON \`_pages_v_blocks_video\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_video_file_idx\` ON \`_pages_v_blocks_video\` (\`file_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_video_poster_idx\` ON \`_pages_v_blocks_video\` (\`poster_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_video_locales\` (
  	\`eyebrow\` text,
  	\`heading\` text,
  	\`body\` text,
  	\`cta_label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_video\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_pages_v_blocks_video_locales_locale_parent_id_unique\` ON \`_pages_v_blocks_video_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_testimonials_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text,
  	\`source\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_testimonials\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_testimonials_items_order_idx\` ON \`_pages_v_blocks_testimonials_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_testimonials_items_parent_id_idx\` ON \`_pages_v_blocks_testimonials_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_testimonials_items_locales\` (
  	\`quote\` text,
  	\`detail\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_testimonials_items\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_pages_v_blocks_testimonials_items_locales_locale_parent_id_\` ON \`_pages_v_blocks_testimonials_items_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_testimonials\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`tone\` text DEFAULT 'cream',
  	\`display_hidden\` integer,
  	\`display_show_on\` text DEFAULT 'all',
  	\`display_anchor\` text,
  	\`display_show_from\` text,
  	\`display_show_until\` text,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_testimonials_order_idx\` ON \`_pages_v_blocks_testimonials\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_testimonials_parent_id_idx\` ON \`_pages_v_blocks_testimonials\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_testimonials_path_idx\` ON \`_pages_v_blocks_testimonials\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_testimonials_locales\` (
  	\`heading\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_testimonials\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_pages_v_blocks_testimonials_locales_locale_parent_id_unique\` ON \`_pages_v_blocks_testimonials_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_logo_strip_logos\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text,
  	\`href\` text,
  	\`image_id\` integer,
  	\`_uuid\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_logo_strip\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_logo_strip_logos_order_idx\` ON \`_pages_v_blocks_logo_strip_logos\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_logo_strip_logos_parent_id_idx\` ON \`_pages_v_blocks_logo_strip_logos\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_logo_strip_logos_image_idx\` ON \`_pages_v_blocks_logo_strip_logos\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_logo_strip\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`display_hidden\` integer,
  	\`display_show_on\` text DEFAULT 'all',
  	\`display_anchor\` text,
  	\`display_show_from\` text,
  	\`display_show_until\` text,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_logo_strip_order_idx\` ON \`_pages_v_blocks_logo_strip\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_logo_strip_parent_id_idx\` ON \`_pages_v_blocks_logo_strip\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_logo_strip_path_idx\` ON \`_pages_v_blocks_logo_strip\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_logo_strip_locales\` (
  	\`heading\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_logo_strip\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_pages_v_blocks_logo_strip_locales_locale_parent_id_unique\` ON \`_pages_v_blocks_logo_strip_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_faq_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_faq\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_faq_items_order_idx\` ON \`_pages_v_blocks_faq_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_faq_items_parent_id_idx\` ON \`_pages_v_blocks_faq_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_faq_items_locales\` (
  	\`q\` text,
  	\`a\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_faq_items\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_pages_v_blocks_faq_items_locales_locale_parent_id_unique\` ON \`_pages_v_blocks_faq_items_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_embed\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`code\` text,
  	\`height\` numeric DEFAULT 480,
  	\`display_hidden\` integer,
  	\`display_show_on\` text DEFAULT 'all',
  	\`display_anchor\` text,
  	\`display_show_from\` text,
  	\`display_show_until\` text,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_embed_order_idx\` ON \`_pages_v_blocks_embed\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_embed_parent_id_idx\` ON \`_pages_v_blocks_embed\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_embed_path_idx\` ON \`_pages_v_blocks_embed\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_embed_locales\` (
  	\`heading\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_embed\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_pages_v_blocks_embed_locales_locale_parent_id_unique\` ON \`_pages_v_blocks_embed_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_spacer\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`size\` text DEFAULT 'm',
  	\`divider\` integer,
  	\`display_hidden\` integer,
  	\`display_show_on\` text DEFAULT 'all',
  	\`display_anchor\` text,
  	\`display_show_from\` text,
  	\`display_show_until\` text,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_spacer_order_idx\` ON \`_pages_v_blocks_spacer\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_spacer_parent_id_idx\` ON \`_pages_v_blocks_spacer\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_spacer_path_idx\` ON \`_pages_v_blocks_spacer\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_reusable\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`section_id\` integer,
  	\`display_hidden\` integer,
  	\`display_show_on\` text DEFAULT 'all',
  	\`display_anchor\` text,
  	\`display_show_from\` text,
  	\`display_show_until\` text,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`section_id\`) REFERENCES \`sections\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_reusable_order_idx\` ON \`_pages_v_blocks_reusable\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_reusable_parent_id_idx\` ON \`_pages_v_blocks_reusable\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_reusable_path_idx\` ON \`_pages_v_blocks_reusable\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_reusable_section_idx\` ON \`_pages_v_blocks_reusable\` (\`section_id\`);`)
  await db.run(sql`CREATE TABLE \`offers_blocks_offer_spotlight\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`offer_id\` integer,
  	\`layout\` text DEFAULT 'banner',
  	\`tone\` text DEFAULT 'coral',
  	\`show_ends\` integer DEFAULT true,
  	\`display_hidden\` integer,
  	\`display_show_on\` text DEFAULT 'all',
  	\`display_anchor\` text,
  	\`display_show_from\` text,
  	\`display_show_until\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`offer_id\`) REFERENCES \`offers\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`offers\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`offers_blocks_offer_spotlight_order_idx\` ON \`offers_blocks_offer_spotlight\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`offers_blocks_offer_spotlight_parent_id_idx\` ON \`offers_blocks_offer_spotlight\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`offers_blocks_offer_spotlight_path_idx\` ON \`offers_blocks_offer_spotlight\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`offers_blocks_offer_spotlight_offer_idx\` ON \`offers_blocks_offer_spotlight\` (\`offer_id\`);`)
  await db.run(sql`CREATE TABLE \`offers_blocks_offer_spotlight_locales\` (
  	\`heading\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`offers_blocks_offer_spotlight\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`offers_blocks_offer_spotlight_locales_locale_parent_id_uniqu\` ON \`offers_blocks_offer_spotlight_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`offers_blocks_rides_list\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`world\` text DEFAULT 'dry',
  	\`display_hidden\` integer,
  	\`display_show_on\` text DEFAULT 'all',
  	\`display_anchor\` text,
  	\`display_show_from\` text,
  	\`display_show_until\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`offers\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`offers_blocks_rides_list_order_idx\` ON \`offers_blocks_rides_list\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`offers_blocks_rides_list_parent_id_idx\` ON \`offers_blocks_rides_list\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`offers_blocks_rides_list_path_idx\` ON \`offers_blocks_rides_list\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`offers_blocks_rides_list_locales\` (
  	\`heading\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`offers_blocks_rides_list\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`offers_blocks_rides_list_locales_locale_parent_id_unique\` ON \`offers_blocks_rides_list_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`offers_blocks_venues_grid\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`display_hidden\` integer,
  	\`display_show_on\` text DEFAULT 'all',
  	\`display_anchor\` text,
  	\`display_show_from\` text,
  	\`display_show_until\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`offers\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`offers_blocks_venues_grid_order_idx\` ON \`offers_blocks_venues_grid\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`offers_blocks_venues_grid_parent_id_idx\` ON \`offers_blocks_venues_grid\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`offers_blocks_venues_grid_path_idx\` ON \`offers_blocks_venues_grid\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`offers_blocks_venues_grid_locales\` (
  	\`heading\` text,
  	\`intro\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`offers_blocks_venues_grid\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`offers_blocks_venues_grid_locales_locale_parent_id_unique\` ON \`offers_blocks_venues_grid_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`offers_blocks_map\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`query\` text DEFAULT 'Nicco Park, Jheel Meel, Sector IV, Salt Lake, Kolkata',
  	\`show_routes\` integer DEFAULT true,
  	\`display_hidden\` integer,
  	\`display_show_on\` text DEFAULT 'all',
  	\`display_anchor\` text,
  	\`display_show_from\` text,
  	\`display_show_until\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`offers\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`offers_blocks_map_order_idx\` ON \`offers_blocks_map\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`offers_blocks_map_parent_id_idx\` ON \`offers_blocks_map\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`offers_blocks_map_path_idx\` ON \`offers_blocks_map\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`offers_blocks_map_locales\` (
  	\`heading\` text,
  	\`intro\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`offers_blocks_map\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`offers_blocks_map_locales_locale_parent_id_unique\` ON \`offers_blocks_map_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`offers_blocks_columns_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`icon\` text,
  	\`image_id\` integer,
  	\`link_href\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`offers_blocks_columns\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`offers_blocks_columns_items_order_idx\` ON \`offers_blocks_columns_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`offers_blocks_columns_items_parent_id_idx\` ON \`offers_blocks_columns_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`offers_blocks_columns_items_image_idx\` ON \`offers_blocks_columns_items\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`offers_blocks_columns_items_locales\` (
  	\`title\` text,
  	\`text\` text,
  	\`link_label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`offers_blocks_columns_items\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`offers_blocks_columns_items_locales_locale_parent_id_unique\` ON \`offers_blocks_columns_items_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`offers_blocks_columns\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`tone\` text DEFAULT 'white',
  	\`per_row\` text DEFAULT '3',
  	\`display_hidden\` integer,
  	\`display_show_on\` text DEFAULT 'all',
  	\`display_anchor\` text,
  	\`display_show_from\` text,
  	\`display_show_until\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`offers\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`offers_blocks_columns_order_idx\` ON \`offers_blocks_columns\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`offers_blocks_columns_parent_id_idx\` ON \`offers_blocks_columns\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`offers_blocks_columns_path_idx\` ON \`offers_blocks_columns\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`offers_blocks_columns_locales\` (
  	\`eyebrow\` text,
  	\`heading\` text,
  	\`intro\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`offers_blocks_columns\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`offers_blocks_columns_locales_locale_parent_id_unique\` ON \`offers_blocks_columns_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`offers_blocks_video\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`source\` text DEFAULT 'upload',
  	\`file_id\` integer,
  	\`url\` text,
  	\`poster_id\` integer,
  	\`layout\` text DEFAULT 'framed',
  	\`autoplay\` integer,
  	\`tone\` text DEFAULT 'ink',
  	\`cta_href\` text,
  	\`display_hidden\` integer,
  	\`display_show_on\` text DEFAULT 'all',
  	\`display_anchor\` text,
  	\`display_show_from\` text,
  	\`display_show_until\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`file_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`poster_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`offers\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`offers_blocks_video_order_idx\` ON \`offers_blocks_video\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`offers_blocks_video_parent_id_idx\` ON \`offers_blocks_video\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`offers_blocks_video_path_idx\` ON \`offers_blocks_video\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`offers_blocks_video_file_idx\` ON \`offers_blocks_video\` (\`file_id\`);`)
  await db.run(sql`CREATE INDEX \`offers_blocks_video_poster_idx\` ON \`offers_blocks_video\` (\`poster_id\`);`)
  await db.run(sql`CREATE TABLE \`offers_blocks_video_locales\` (
  	\`eyebrow\` text,
  	\`heading\` text,
  	\`body\` text,
  	\`cta_label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`offers_blocks_video\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`offers_blocks_video_locales_locale_parent_id_unique\` ON \`offers_blocks_video_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`offers_blocks_testimonials_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name\` text,
  	\`source\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`offers_blocks_testimonials\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`offers_blocks_testimonials_items_order_idx\` ON \`offers_blocks_testimonials_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`offers_blocks_testimonials_items_parent_id_idx\` ON \`offers_blocks_testimonials_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`offers_blocks_testimonials_items_locales\` (
  	\`quote\` text,
  	\`detail\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`offers_blocks_testimonials_items\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`offers_blocks_testimonials_items_locales_locale_parent_id_un\` ON \`offers_blocks_testimonials_items_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`offers_blocks_testimonials\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`tone\` text DEFAULT 'cream',
  	\`display_hidden\` integer,
  	\`display_show_on\` text DEFAULT 'all',
  	\`display_anchor\` text,
  	\`display_show_from\` text,
  	\`display_show_until\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`offers\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`offers_blocks_testimonials_order_idx\` ON \`offers_blocks_testimonials\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`offers_blocks_testimonials_parent_id_idx\` ON \`offers_blocks_testimonials\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`offers_blocks_testimonials_path_idx\` ON \`offers_blocks_testimonials\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`offers_blocks_testimonials_locales\` (
  	\`heading\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`offers_blocks_testimonials\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`offers_blocks_testimonials_locales_locale_parent_id_unique\` ON \`offers_blocks_testimonials_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`offers_blocks_logo_strip_logos\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name\` text,
  	\`href\` text,
  	\`image_id\` integer,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`offers_blocks_logo_strip\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`offers_blocks_logo_strip_logos_order_idx\` ON \`offers_blocks_logo_strip_logos\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`offers_blocks_logo_strip_logos_parent_id_idx\` ON \`offers_blocks_logo_strip_logos\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`offers_blocks_logo_strip_logos_image_idx\` ON \`offers_blocks_logo_strip_logos\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`offers_blocks_logo_strip\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`display_hidden\` integer,
  	\`display_show_on\` text DEFAULT 'all',
  	\`display_anchor\` text,
  	\`display_show_from\` text,
  	\`display_show_until\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`offers\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`offers_blocks_logo_strip_order_idx\` ON \`offers_blocks_logo_strip\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`offers_blocks_logo_strip_parent_id_idx\` ON \`offers_blocks_logo_strip\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`offers_blocks_logo_strip_path_idx\` ON \`offers_blocks_logo_strip\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`offers_blocks_logo_strip_locales\` (
  	\`heading\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`offers_blocks_logo_strip\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`offers_blocks_logo_strip_locales_locale_parent_id_unique\` ON \`offers_blocks_logo_strip_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`offers_blocks_faq_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`offers_blocks_faq\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`offers_blocks_faq_items_order_idx\` ON \`offers_blocks_faq_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`offers_blocks_faq_items_parent_id_idx\` ON \`offers_blocks_faq_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`offers_blocks_faq_items_locales\` (
  	\`q\` text,
  	\`a\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`offers_blocks_faq_items\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`offers_blocks_faq_items_locales_locale_parent_id_unique\` ON \`offers_blocks_faq_items_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`offers_blocks_embed\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`code\` text,
  	\`height\` numeric DEFAULT 480,
  	\`display_hidden\` integer,
  	\`display_show_on\` text DEFAULT 'all',
  	\`display_anchor\` text,
  	\`display_show_from\` text,
  	\`display_show_until\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`offers\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`offers_blocks_embed_order_idx\` ON \`offers_blocks_embed\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`offers_blocks_embed_parent_id_idx\` ON \`offers_blocks_embed\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`offers_blocks_embed_path_idx\` ON \`offers_blocks_embed\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`offers_blocks_embed_locales\` (
  	\`heading\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`offers_blocks_embed\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`offers_blocks_embed_locales_locale_parent_id_unique\` ON \`offers_blocks_embed_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`offers_blocks_spacer\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`size\` text DEFAULT 'm',
  	\`divider\` integer,
  	\`display_hidden\` integer,
  	\`display_show_on\` text DEFAULT 'all',
  	\`display_anchor\` text,
  	\`display_show_from\` text,
  	\`display_show_until\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`offers\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`offers_blocks_spacer_order_idx\` ON \`offers_blocks_spacer\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`offers_blocks_spacer_parent_id_idx\` ON \`offers_blocks_spacer\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`offers_blocks_spacer_path_idx\` ON \`offers_blocks_spacer\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`offers_blocks_reusable\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`section_id\` integer,
  	\`display_hidden\` integer,
  	\`display_show_on\` text DEFAULT 'all',
  	\`display_anchor\` text,
  	\`display_show_from\` text,
  	\`display_show_until\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`section_id\`) REFERENCES \`sections\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`offers\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`offers_blocks_reusable_order_idx\` ON \`offers_blocks_reusable\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`offers_blocks_reusable_parent_id_idx\` ON \`offers_blocks_reusable\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`offers_blocks_reusable_path_idx\` ON \`offers_blocks_reusable\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`offers_blocks_reusable_section_idx\` ON \`offers_blocks_reusable\` (\`section_id\`);`)
  await db.run(sql`CREATE TABLE \`_offers_v_blocks_offer_spotlight\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`offer_id\` integer,
  	\`layout\` text DEFAULT 'banner',
  	\`tone\` text DEFAULT 'coral',
  	\`show_ends\` integer DEFAULT true,
  	\`display_hidden\` integer,
  	\`display_show_on\` text DEFAULT 'all',
  	\`display_anchor\` text,
  	\`display_show_from\` text,
  	\`display_show_until\` text,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`offer_id\`) REFERENCES \`offers\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_offers_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_offers_v_blocks_offer_spotlight_order_idx\` ON \`_offers_v_blocks_offer_spotlight\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_offers_v_blocks_offer_spotlight_parent_id_idx\` ON \`_offers_v_blocks_offer_spotlight\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_offers_v_blocks_offer_spotlight_path_idx\` ON \`_offers_v_blocks_offer_spotlight\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`_offers_v_blocks_offer_spotlight_offer_idx\` ON \`_offers_v_blocks_offer_spotlight\` (\`offer_id\`);`)
  await db.run(sql`CREATE TABLE \`_offers_v_blocks_offer_spotlight_locales\` (
  	\`heading\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_offers_v_blocks_offer_spotlight\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_offers_v_blocks_offer_spotlight_locales_locale_parent_id_un\` ON \`_offers_v_blocks_offer_spotlight_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_offers_v_blocks_rides_list\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`world\` text DEFAULT 'dry',
  	\`display_hidden\` integer,
  	\`display_show_on\` text DEFAULT 'all',
  	\`display_anchor\` text,
  	\`display_show_from\` text,
  	\`display_show_until\` text,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_offers_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_offers_v_blocks_rides_list_order_idx\` ON \`_offers_v_blocks_rides_list\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_offers_v_blocks_rides_list_parent_id_idx\` ON \`_offers_v_blocks_rides_list\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_offers_v_blocks_rides_list_path_idx\` ON \`_offers_v_blocks_rides_list\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_offers_v_blocks_rides_list_locales\` (
  	\`heading\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_offers_v_blocks_rides_list\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_offers_v_blocks_rides_list_locales_locale_parent_id_unique\` ON \`_offers_v_blocks_rides_list_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_offers_v_blocks_venues_grid\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`display_hidden\` integer,
  	\`display_show_on\` text DEFAULT 'all',
  	\`display_anchor\` text,
  	\`display_show_from\` text,
  	\`display_show_until\` text,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_offers_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_offers_v_blocks_venues_grid_order_idx\` ON \`_offers_v_blocks_venues_grid\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_offers_v_blocks_venues_grid_parent_id_idx\` ON \`_offers_v_blocks_venues_grid\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_offers_v_blocks_venues_grid_path_idx\` ON \`_offers_v_blocks_venues_grid\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_offers_v_blocks_venues_grid_locales\` (
  	\`heading\` text,
  	\`intro\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_offers_v_blocks_venues_grid\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_offers_v_blocks_venues_grid_locales_locale_parent_id_unique\` ON \`_offers_v_blocks_venues_grid_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_offers_v_blocks_map\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`query\` text DEFAULT 'Nicco Park, Jheel Meel, Sector IV, Salt Lake, Kolkata',
  	\`show_routes\` integer DEFAULT true,
  	\`display_hidden\` integer,
  	\`display_show_on\` text DEFAULT 'all',
  	\`display_anchor\` text,
  	\`display_show_from\` text,
  	\`display_show_until\` text,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_offers_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_offers_v_blocks_map_order_idx\` ON \`_offers_v_blocks_map\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_offers_v_blocks_map_parent_id_idx\` ON \`_offers_v_blocks_map\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_offers_v_blocks_map_path_idx\` ON \`_offers_v_blocks_map\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_offers_v_blocks_map_locales\` (
  	\`heading\` text,
  	\`intro\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_offers_v_blocks_map\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_offers_v_blocks_map_locales_locale_parent_id_unique\` ON \`_offers_v_blocks_map_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_offers_v_blocks_columns_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`icon\` text,
  	\`image_id\` integer,
  	\`link_href\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_offers_v_blocks_columns\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_offers_v_blocks_columns_items_order_idx\` ON \`_offers_v_blocks_columns_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_offers_v_blocks_columns_items_parent_id_idx\` ON \`_offers_v_blocks_columns_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_offers_v_blocks_columns_items_image_idx\` ON \`_offers_v_blocks_columns_items\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`_offers_v_blocks_columns_items_locales\` (
  	\`title\` text,
  	\`text\` text,
  	\`link_label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_offers_v_blocks_columns_items\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_offers_v_blocks_columns_items_locales_locale_parent_id_uniq\` ON \`_offers_v_blocks_columns_items_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_offers_v_blocks_columns\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`tone\` text DEFAULT 'white',
  	\`per_row\` text DEFAULT '3',
  	\`display_hidden\` integer,
  	\`display_show_on\` text DEFAULT 'all',
  	\`display_anchor\` text,
  	\`display_show_from\` text,
  	\`display_show_until\` text,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_offers_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_offers_v_blocks_columns_order_idx\` ON \`_offers_v_blocks_columns\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_offers_v_blocks_columns_parent_id_idx\` ON \`_offers_v_blocks_columns\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_offers_v_blocks_columns_path_idx\` ON \`_offers_v_blocks_columns\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_offers_v_blocks_columns_locales\` (
  	\`eyebrow\` text,
  	\`heading\` text,
  	\`intro\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_offers_v_blocks_columns\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_offers_v_blocks_columns_locales_locale_parent_id_unique\` ON \`_offers_v_blocks_columns_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_offers_v_blocks_video\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`source\` text DEFAULT 'upload',
  	\`file_id\` integer,
  	\`url\` text,
  	\`poster_id\` integer,
  	\`layout\` text DEFAULT 'framed',
  	\`autoplay\` integer,
  	\`tone\` text DEFAULT 'ink',
  	\`cta_href\` text,
  	\`display_hidden\` integer,
  	\`display_show_on\` text DEFAULT 'all',
  	\`display_anchor\` text,
  	\`display_show_from\` text,
  	\`display_show_until\` text,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`file_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`poster_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_offers_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_offers_v_blocks_video_order_idx\` ON \`_offers_v_blocks_video\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_offers_v_blocks_video_parent_id_idx\` ON \`_offers_v_blocks_video\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_offers_v_blocks_video_path_idx\` ON \`_offers_v_blocks_video\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`_offers_v_blocks_video_file_idx\` ON \`_offers_v_blocks_video\` (\`file_id\`);`)
  await db.run(sql`CREATE INDEX \`_offers_v_blocks_video_poster_idx\` ON \`_offers_v_blocks_video\` (\`poster_id\`);`)
  await db.run(sql`CREATE TABLE \`_offers_v_blocks_video_locales\` (
  	\`eyebrow\` text,
  	\`heading\` text,
  	\`body\` text,
  	\`cta_label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_offers_v_blocks_video\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_offers_v_blocks_video_locales_locale_parent_id_unique\` ON \`_offers_v_blocks_video_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_offers_v_blocks_testimonials_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text,
  	\`source\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_offers_v_blocks_testimonials\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_offers_v_blocks_testimonials_items_order_idx\` ON \`_offers_v_blocks_testimonials_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_offers_v_blocks_testimonials_items_parent_id_idx\` ON \`_offers_v_blocks_testimonials_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_offers_v_blocks_testimonials_items_locales\` (
  	\`quote\` text,
  	\`detail\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_offers_v_blocks_testimonials_items\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_offers_v_blocks_testimonials_items_locales_locale_parent_id\` ON \`_offers_v_blocks_testimonials_items_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_offers_v_blocks_testimonials\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`tone\` text DEFAULT 'cream',
  	\`display_hidden\` integer,
  	\`display_show_on\` text DEFAULT 'all',
  	\`display_anchor\` text,
  	\`display_show_from\` text,
  	\`display_show_until\` text,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_offers_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_offers_v_blocks_testimonials_order_idx\` ON \`_offers_v_blocks_testimonials\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_offers_v_blocks_testimonials_parent_id_idx\` ON \`_offers_v_blocks_testimonials\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_offers_v_blocks_testimonials_path_idx\` ON \`_offers_v_blocks_testimonials\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_offers_v_blocks_testimonials_locales\` (
  	\`heading\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_offers_v_blocks_testimonials\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_offers_v_blocks_testimonials_locales_locale_parent_id_uniqu\` ON \`_offers_v_blocks_testimonials_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_offers_v_blocks_logo_strip_logos\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text,
  	\`href\` text,
  	\`image_id\` integer,
  	\`_uuid\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_offers_v_blocks_logo_strip\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_offers_v_blocks_logo_strip_logos_order_idx\` ON \`_offers_v_blocks_logo_strip_logos\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_offers_v_blocks_logo_strip_logos_parent_id_idx\` ON \`_offers_v_blocks_logo_strip_logos\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_offers_v_blocks_logo_strip_logos_image_idx\` ON \`_offers_v_blocks_logo_strip_logos\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`_offers_v_blocks_logo_strip\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`display_hidden\` integer,
  	\`display_show_on\` text DEFAULT 'all',
  	\`display_anchor\` text,
  	\`display_show_from\` text,
  	\`display_show_until\` text,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_offers_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_offers_v_blocks_logo_strip_order_idx\` ON \`_offers_v_blocks_logo_strip\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_offers_v_blocks_logo_strip_parent_id_idx\` ON \`_offers_v_blocks_logo_strip\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_offers_v_blocks_logo_strip_path_idx\` ON \`_offers_v_blocks_logo_strip\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_offers_v_blocks_logo_strip_locales\` (
  	\`heading\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_offers_v_blocks_logo_strip\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_offers_v_blocks_logo_strip_locales_locale_parent_id_unique\` ON \`_offers_v_blocks_logo_strip_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_offers_v_blocks_faq_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_offers_v_blocks_faq\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_offers_v_blocks_faq_items_order_idx\` ON \`_offers_v_blocks_faq_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_offers_v_blocks_faq_items_parent_id_idx\` ON \`_offers_v_blocks_faq_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_offers_v_blocks_faq_items_locales\` (
  	\`q\` text,
  	\`a\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_offers_v_blocks_faq_items\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_offers_v_blocks_faq_items_locales_locale_parent_id_unique\` ON \`_offers_v_blocks_faq_items_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_offers_v_blocks_embed\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`code\` text,
  	\`height\` numeric DEFAULT 480,
  	\`display_hidden\` integer,
  	\`display_show_on\` text DEFAULT 'all',
  	\`display_anchor\` text,
  	\`display_show_from\` text,
  	\`display_show_until\` text,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_offers_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_offers_v_blocks_embed_order_idx\` ON \`_offers_v_blocks_embed\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_offers_v_blocks_embed_parent_id_idx\` ON \`_offers_v_blocks_embed\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_offers_v_blocks_embed_path_idx\` ON \`_offers_v_blocks_embed\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_offers_v_blocks_embed_locales\` (
  	\`heading\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_offers_v_blocks_embed\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_offers_v_blocks_embed_locales_locale_parent_id_unique\` ON \`_offers_v_blocks_embed_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_offers_v_blocks_spacer\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`size\` text DEFAULT 'm',
  	\`divider\` integer,
  	\`display_hidden\` integer,
  	\`display_show_on\` text DEFAULT 'all',
  	\`display_anchor\` text,
  	\`display_show_from\` text,
  	\`display_show_until\` text,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_offers_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_offers_v_blocks_spacer_order_idx\` ON \`_offers_v_blocks_spacer\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_offers_v_blocks_spacer_parent_id_idx\` ON \`_offers_v_blocks_spacer\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_offers_v_blocks_spacer_path_idx\` ON \`_offers_v_blocks_spacer\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_offers_v_blocks_reusable\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`section_id\` integer,
  	\`display_hidden\` integer,
  	\`display_show_on\` text DEFAULT 'all',
  	\`display_anchor\` text,
  	\`display_show_from\` text,
  	\`display_show_until\` text,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`section_id\`) REFERENCES \`sections\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_offers_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_offers_v_blocks_reusable_order_idx\` ON \`_offers_v_blocks_reusable\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_offers_v_blocks_reusable_parent_id_idx\` ON \`_offers_v_blocks_reusable\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_offers_v_blocks_reusable_path_idx\` ON \`_offers_v_blocks_reusable\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`_offers_v_blocks_reusable_section_idx\` ON \`_offers_v_blocks_reusable\` (\`section_id\`);`)
  await db.run(sql`CREATE TABLE \`events_blocks_offer_spotlight\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`offer_id\` integer,
  	\`layout\` text DEFAULT 'banner',
  	\`tone\` text DEFAULT 'coral',
  	\`show_ends\` integer DEFAULT true,
  	\`display_hidden\` integer,
  	\`display_show_on\` text DEFAULT 'all',
  	\`display_anchor\` text,
  	\`display_show_from\` text,
  	\`display_show_until\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`offer_id\`) REFERENCES \`offers\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`events\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`events_blocks_offer_spotlight_order_idx\` ON \`events_blocks_offer_spotlight\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`events_blocks_offer_spotlight_parent_id_idx\` ON \`events_blocks_offer_spotlight\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`events_blocks_offer_spotlight_path_idx\` ON \`events_blocks_offer_spotlight\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`events_blocks_offer_spotlight_offer_idx\` ON \`events_blocks_offer_spotlight\` (\`offer_id\`);`)
  await db.run(sql`CREATE TABLE \`events_blocks_offer_spotlight_locales\` (
  	\`heading\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`events_blocks_offer_spotlight\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`events_blocks_offer_spotlight_locales_locale_parent_id_uniqu\` ON \`events_blocks_offer_spotlight_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`events_blocks_rides_list\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`world\` text DEFAULT 'dry',
  	\`display_hidden\` integer,
  	\`display_show_on\` text DEFAULT 'all',
  	\`display_anchor\` text,
  	\`display_show_from\` text,
  	\`display_show_until\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`events\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`events_blocks_rides_list_order_idx\` ON \`events_blocks_rides_list\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`events_blocks_rides_list_parent_id_idx\` ON \`events_blocks_rides_list\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`events_blocks_rides_list_path_idx\` ON \`events_blocks_rides_list\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`events_blocks_rides_list_locales\` (
  	\`heading\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`events_blocks_rides_list\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`events_blocks_rides_list_locales_locale_parent_id_unique\` ON \`events_blocks_rides_list_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`events_blocks_venues_grid\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`display_hidden\` integer,
  	\`display_show_on\` text DEFAULT 'all',
  	\`display_anchor\` text,
  	\`display_show_from\` text,
  	\`display_show_until\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`events\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`events_blocks_venues_grid_order_idx\` ON \`events_blocks_venues_grid\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`events_blocks_venues_grid_parent_id_idx\` ON \`events_blocks_venues_grid\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`events_blocks_venues_grid_path_idx\` ON \`events_blocks_venues_grid\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`events_blocks_venues_grid_locales\` (
  	\`heading\` text,
  	\`intro\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`events_blocks_venues_grid\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`events_blocks_venues_grid_locales_locale_parent_id_unique\` ON \`events_blocks_venues_grid_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`events_blocks_map\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`query\` text DEFAULT 'Nicco Park, Jheel Meel, Sector IV, Salt Lake, Kolkata',
  	\`show_routes\` integer DEFAULT true,
  	\`display_hidden\` integer,
  	\`display_show_on\` text DEFAULT 'all',
  	\`display_anchor\` text,
  	\`display_show_from\` text,
  	\`display_show_until\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`events\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`events_blocks_map_order_idx\` ON \`events_blocks_map\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`events_blocks_map_parent_id_idx\` ON \`events_blocks_map\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`events_blocks_map_path_idx\` ON \`events_blocks_map\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`events_blocks_map_locales\` (
  	\`heading\` text,
  	\`intro\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`events_blocks_map\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`events_blocks_map_locales_locale_parent_id_unique\` ON \`events_blocks_map_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`events_blocks_columns_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`icon\` text,
  	\`image_id\` integer,
  	\`link_href\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`events_blocks_columns\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`events_blocks_columns_items_order_idx\` ON \`events_blocks_columns_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`events_blocks_columns_items_parent_id_idx\` ON \`events_blocks_columns_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`events_blocks_columns_items_image_idx\` ON \`events_blocks_columns_items\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`events_blocks_columns_items_locales\` (
  	\`title\` text,
  	\`text\` text,
  	\`link_label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`events_blocks_columns_items\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`events_blocks_columns_items_locales_locale_parent_id_unique\` ON \`events_blocks_columns_items_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`events_blocks_columns\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`tone\` text DEFAULT 'white',
  	\`per_row\` text DEFAULT '3',
  	\`display_hidden\` integer,
  	\`display_show_on\` text DEFAULT 'all',
  	\`display_anchor\` text,
  	\`display_show_from\` text,
  	\`display_show_until\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`events\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`events_blocks_columns_order_idx\` ON \`events_blocks_columns\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`events_blocks_columns_parent_id_idx\` ON \`events_blocks_columns\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`events_blocks_columns_path_idx\` ON \`events_blocks_columns\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`events_blocks_columns_locales\` (
  	\`eyebrow\` text,
  	\`heading\` text,
  	\`intro\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`events_blocks_columns\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`events_blocks_columns_locales_locale_parent_id_unique\` ON \`events_blocks_columns_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`events_blocks_video\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`source\` text DEFAULT 'upload',
  	\`file_id\` integer,
  	\`url\` text,
  	\`poster_id\` integer,
  	\`layout\` text DEFAULT 'framed',
  	\`autoplay\` integer,
  	\`tone\` text DEFAULT 'ink',
  	\`cta_href\` text,
  	\`display_hidden\` integer,
  	\`display_show_on\` text DEFAULT 'all',
  	\`display_anchor\` text,
  	\`display_show_from\` text,
  	\`display_show_until\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`file_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`poster_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`events\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`events_blocks_video_order_idx\` ON \`events_blocks_video\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`events_blocks_video_parent_id_idx\` ON \`events_blocks_video\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`events_blocks_video_path_idx\` ON \`events_blocks_video\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`events_blocks_video_file_idx\` ON \`events_blocks_video\` (\`file_id\`);`)
  await db.run(sql`CREATE INDEX \`events_blocks_video_poster_idx\` ON \`events_blocks_video\` (\`poster_id\`);`)
  await db.run(sql`CREATE TABLE \`events_blocks_video_locales\` (
  	\`eyebrow\` text,
  	\`heading\` text,
  	\`body\` text,
  	\`cta_label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`events_blocks_video\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`events_blocks_video_locales_locale_parent_id_unique\` ON \`events_blocks_video_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`events_blocks_testimonials_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name\` text,
  	\`source\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`events_blocks_testimonials\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`events_blocks_testimonials_items_order_idx\` ON \`events_blocks_testimonials_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`events_blocks_testimonials_items_parent_id_idx\` ON \`events_blocks_testimonials_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`events_blocks_testimonials_items_locales\` (
  	\`quote\` text,
  	\`detail\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`events_blocks_testimonials_items\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`events_blocks_testimonials_items_locales_locale_parent_id_un\` ON \`events_blocks_testimonials_items_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`events_blocks_testimonials\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`tone\` text DEFAULT 'cream',
  	\`display_hidden\` integer,
  	\`display_show_on\` text DEFAULT 'all',
  	\`display_anchor\` text,
  	\`display_show_from\` text,
  	\`display_show_until\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`events\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`events_blocks_testimonials_order_idx\` ON \`events_blocks_testimonials\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`events_blocks_testimonials_parent_id_idx\` ON \`events_blocks_testimonials\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`events_blocks_testimonials_path_idx\` ON \`events_blocks_testimonials\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`events_blocks_testimonials_locales\` (
  	\`heading\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`events_blocks_testimonials\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`events_blocks_testimonials_locales_locale_parent_id_unique\` ON \`events_blocks_testimonials_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`events_blocks_logo_strip_logos\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name\` text,
  	\`href\` text,
  	\`image_id\` integer,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`events_blocks_logo_strip\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`events_blocks_logo_strip_logos_order_idx\` ON \`events_blocks_logo_strip_logos\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`events_blocks_logo_strip_logos_parent_id_idx\` ON \`events_blocks_logo_strip_logos\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`events_blocks_logo_strip_logos_image_idx\` ON \`events_blocks_logo_strip_logos\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`events_blocks_logo_strip\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`display_hidden\` integer,
  	\`display_show_on\` text DEFAULT 'all',
  	\`display_anchor\` text,
  	\`display_show_from\` text,
  	\`display_show_until\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`events\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`events_blocks_logo_strip_order_idx\` ON \`events_blocks_logo_strip\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`events_blocks_logo_strip_parent_id_idx\` ON \`events_blocks_logo_strip\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`events_blocks_logo_strip_path_idx\` ON \`events_blocks_logo_strip\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`events_blocks_logo_strip_locales\` (
  	\`heading\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`events_blocks_logo_strip\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`events_blocks_logo_strip_locales_locale_parent_id_unique\` ON \`events_blocks_logo_strip_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`events_blocks_faq_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`events_blocks_faq\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`events_blocks_faq_items_order_idx\` ON \`events_blocks_faq_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`events_blocks_faq_items_parent_id_idx\` ON \`events_blocks_faq_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`events_blocks_faq_items_locales\` (
  	\`q\` text,
  	\`a\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`events_blocks_faq_items\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`events_blocks_faq_items_locales_locale_parent_id_unique\` ON \`events_blocks_faq_items_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`events_blocks_embed\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`code\` text,
  	\`height\` numeric DEFAULT 480,
  	\`display_hidden\` integer,
  	\`display_show_on\` text DEFAULT 'all',
  	\`display_anchor\` text,
  	\`display_show_from\` text,
  	\`display_show_until\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`events\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`events_blocks_embed_order_idx\` ON \`events_blocks_embed\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`events_blocks_embed_parent_id_idx\` ON \`events_blocks_embed\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`events_blocks_embed_path_idx\` ON \`events_blocks_embed\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`events_blocks_embed_locales\` (
  	\`heading\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`events_blocks_embed\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`events_blocks_embed_locales_locale_parent_id_unique\` ON \`events_blocks_embed_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`events_blocks_spacer\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`size\` text DEFAULT 'm',
  	\`divider\` integer,
  	\`display_hidden\` integer,
  	\`display_show_on\` text DEFAULT 'all',
  	\`display_anchor\` text,
  	\`display_show_from\` text,
  	\`display_show_until\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`events\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`events_blocks_spacer_order_idx\` ON \`events_blocks_spacer\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`events_blocks_spacer_parent_id_idx\` ON \`events_blocks_spacer\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`events_blocks_spacer_path_idx\` ON \`events_blocks_spacer\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`events_blocks_reusable\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`section_id\` integer,
  	\`display_hidden\` integer,
  	\`display_show_on\` text DEFAULT 'all',
  	\`display_anchor\` text,
  	\`display_show_from\` text,
  	\`display_show_until\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`section_id\`) REFERENCES \`sections\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`events\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`events_blocks_reusable_order_idx\` ON \`events_blocks_reusable\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`events_blocks_reusable_parent_id_idx\` ON \`events_blocks_reusable\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`events_blocks_reusable_path_idx\` ON \`events_blocks_reusable\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`events_blocks_reusable_section_idx\` ON \`events_blocks_reusable\` (\`section_id\`);`)
  await db.run(sql`CREATE TABLE \`_events_v_blocks_offer_spotlight\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`offer_id\` integer,
  	\`layout\` text DEFAULT 'banner',
  	\`tone\` text DEFAULT 'coral',
  	\`show_ends\` integer DEFAULT true,
  	\`display_hidden\` integer,
  	\`display_show_on\` text DEFAULT 'all',
  	\`display_anchor\` text,
  	\`display_show_from\` text,
  	\`display_show_until\` text,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`offer_id\`) REFERENCES \`offers\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_events_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_events_v_blocks_offer_spotlight_order_idx\` ON \`_events_v_blocks_offer_spotlight\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_events_v_blocks_offer_spotlight_parent_id_idx\` ON \`_events_v_blocks_offer_spotlight\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_events_v_blocks_offer_spotlight_path_idx\` ON \`_events_v_blocks_offer_spotlight\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`_events_v_blocks_offer_spotlight_offer_idx\` ON \`_events_v_blocks_offer_spotlight\` (\`offer_id\`);`)
  await db.run(sql`CREATE TABLE \`_events_v_blocks_offer_spotlight_locales\` (
  	\`heading\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_events_v_blocks_offer_spotlight\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_events_v_blocks_offer_spotlight_locales_locale_parent_id_un\` ON \`_events_v_blocks_offer_spotlight_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_events_v_blocks_rides_list\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`world\` text DEFAULT 'dry',
  	\`display_hidden\` integer,
  	\`display_show_on\` text DEFAULT 'all',
  	\`display_anchor\` text,
  	\`display_show_from\` text,
  	\`display_show_until\` text,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_events_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_events_v_blocks_rides_list_order_idx\` ON \`_events_v_blocks_rides_list\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_events_v_blocks_rides_list_parent_id_idx\` ON \`_events_v_blocks_rides_list\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_events_v_blocks_rides_list_path_idx\` ON \`_events_v_blocks_rides_list\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_events_v_blocks_rides_list_locales\` (
  	\`heading\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_events_v_blocks_rides_list\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_events_v_blocks_rides_list_locales_locale_parent_id_unique\` ON \`_events_v_blocks_rides_list_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_events_v_blocks_venues_grid\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`display_hidden\` integer,
  	\`display_show_on\` text DEFAULT 'all',
  	\`display_anchor\` text,
  	\`display_show_from\` text,
  	\`display_show_until\` text,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_events_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_events_v_blocks_venues_grid_order_idx\` ON \`_events_v_blocks_venues_grid\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_events_v_blocks_venues_grid_parent_id_idx\` ON \`_events_v_blocks_venues_grid\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_events_v_blocks_venues_grid_path_idx\` ON \`_events_v_blocks_venues_grid\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_events_v_blocks_venues_grid_locales\` (
  	\`heading\` text,
  	\`intro\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_events_v_blocks_venues_grid\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_events_v_blocks_venues_grid_locales_locale_parent_id_unique\` ON \`_events_v_blocks_venues_grid_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_events_v_blocks_map\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`query\` text DEFAULT 'Nicco Park, Jheel Meel, Sector IV, Salt Lake, Kolkata',
  	\`show_routes\` integer DEFAULT true,
  	\`display_hidden\` integer,
  	\`display_show_on\` text DEFAULT 'all',
  	\`display_anchor\` text,
  	\`display_show_from\` text,
  	\`display_show_until\` text,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_events_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_events_v_blocks_map_order_idx\` ON \`_events_v_blocks_map\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_events_v_blocks_map_parent_id_idx\` ON \`_events_v_blocks_map\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_events_v_blocks_map_path_idx\` ON \`_events_v_blocks_map\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_events_v_blocks_map_locales\` (
  	\`heading\` text,
  	\`intro\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_events_v_blocks_map\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_events_v_blocks_map_locales_locale_parent_id_unique\` ON \`_events_v_blocks_map_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_events_v_blocks_columns_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`icon\` text,
  	\`image_id\` integer,
  	\`link_href\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_events_v_blocks_columns\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_events_v_blocks_columns_items_order_idx\` ON \`_events_v_blocks_columns_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_events_v_blocks_columns_items_parent_id_idx\` ON \`_events_v_blocks_columns_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_events_v_blocks_columns_items_image_idx\` ON \`_events_v_blocks_columns_items\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`_events_v_blocks_columns_items_locales\` (
  	\`title\` text,
  	\`text\` text,
  	\`link_label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_events_v_blocks_columns_items\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_events_v_blocks_columns_items_locales_locale_parent_id_uniq\` ON \`_events_v_blocks_columns_items_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_events_v_blocks_columns\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`tone\` text DEFAULT 'white',
  	\`per_row\` text DEFAULT '3',
  	\`display_hidden\` integer,
  	\`display_show_on\` text DEFAULT 'all',
  	\`display_anchor\` text,
  	\`display_show_from\` text,
  	\`display_show_until\` text,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_events_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_events_v_blocks_columns_order_idx\` ON \`_events_v_blocks_columns\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_events_v_blocks_columns_parent_id_idx\` ON \`_events_v_blocks_columns\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_events_v_blocks_columns_path_idx\` ON \`_events_v_blocks_columns\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_events_v_blocks_columns_locales\` (
  	\`eyebrow\` text,
  	\`heading\` text,
  	\`intro\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_events_v_blocks_columns\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_events_v_blocks_columns_locales_locale_parent_id_unique\` ON \`_events_v_blocks_columns_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_events_v_blocks_video\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`source\` text DEFAULT 'upload',
  	\`file_id\` integer,
  	\`url\` text,
  	\`poster_id\` integer,
  	\`layout\` text DEFAULT 'framed',
  	\`autoplay\` integer,
  	\`tone\` text DEFAULT 'ink',
  	\`cta_href\` text,
  	\`display_hidden\` integer,
  	\`display_show_on\` text DEFAULT 'all',
  	\`display_anchor\` text,
  	\`display_show_from\` text,
  	\`display_show_until\` text,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`file_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`poster_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_events_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_events_v_blocks_video_order_idx\` ON \`_events_v_blocks_video\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_events_v_blocks_video_parent_id_idx\` ON \`_events_v_blocks_video\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_events_v_blocks_video_path_idx\` ON \`_events_v_blocks_video\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`_events_v_blocks_video_file_idx\` ON \`_events_v_blocks_video\` (\`file_id\`);`)
  await db.run(sql`CREATE INDEX \`_events_v_blocks_video_poster_idx\` ON \`_events_v_blocks_video\` (\`poster_id\`);`)
  await db.run(sql`CREATE TABLE \`_events_v_blocks_video_locales\` (
  	\`eyebrow\` text,
  	\`heading\` text,
  	\`body\` text,
  	\`cta_label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_events_v_blocks_video\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_events_v_blocks_video_locales_locale_parent_id_unique\` ON \`_events_v_blocks_video_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_events_v_blocks_testimonials_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text,
  	\`source\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_events_v_blocks_testimonials\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_events_v_blocks_testimonials_items_order_idx\` ON \`_events_v_blocks_testimonials_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_events_v_blocks_testimonials_items_parent_id_idx\` ON \`_events_v_blocks_testimonials_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_events_v_blocks_testimonials_items_locales\` (
  	\`quote\` text,
  	\`detail\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_events_v_blocks_testimonials_items\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_events_v_blocks_testimonials_items_locales_locale_parent_id\` ON \`_events_v_blocks_testimonials_items_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_events_v_blocks_testimonials\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`tone\` text DEFAULT 'cream',
  	\`display_hidden\` integer,
  	\`display_show_on\` text DEFAULT 'all',
  	\`display_anchor\` text,
  	\`display_show_from\` text,
  	\`display_show_until\` text,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_events_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_events_v_blocks_testimonials_order_idx\` ON \`_events_v_blocks_testimonials\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_events_v_blocks_testimonials_parent_id_idx\` ON \`_events_v_blocks_testimonials\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_events_v_blocks_testimonials_path_idx\` ON \`_events_v_blocks_testimonials\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_events_v_blocks_testimonials_locales\` (
  	\`heading\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_events_v_blocks_testimonials\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_events_v_blocks_testimonials_locales_locale_parent_id_uniqu\` ON \`_events_v_blocks_testimonials_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_events_v_blocks_logo_strip_logos\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text,
  	\`href\` text,
  	\`image_id\` integer,
  	\`_uuid\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_events_v_blocks_logo_strip\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_events_v_blocks_logo_strip_logos_order_idx\` ON \`_events_v_blocks_logo_strip_logos\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_events_v_blocks_logo_strip_logos_parent_id_idx\` ON \`_events_v_blocks_logo_strip_logos\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_events_v_blocks_logo_strip_logos_image_idx\` ON \`_events_v_blocks_logo_strip_logos\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`_events_v_blocks_logo_strip\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`display_hidden\` integer,
  	\`display_show_on\` text DEFAULT 'all',
  	\`display_anchor\` text,
  	\`display_show_from\` text,
  	\`display_show_until\` text,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_events_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_events_v_blocks_logo_strip_order_idx\` ON \`_events_v_blocks_logo_strip\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_events_v_blocks_logo_strip_parent_id_idx\` ON \`_events_v_blocks_logo_strip\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_events_v_blocks_logo_strip_path_idx\` ON \`_events_v_blocks_logo_strip\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_events_v_blocks_logo_strip_locales\` (
  	\`heading\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_events_v_blocks_logo_strip\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_events_v_blocks_logo_strip_locales_locale_parent_id_unique\` ON \`_events_v_blocks_logo_strip_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_events_v_blocks_faq_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_events_v_blocks_faq\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_events_v_blocks_faq_items_order_idx\` ON \`_events_v_blocks_faq_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_events_v_blocks_faq_items_parent_id_idx\` ON \`_events_v_blocks_faq_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_events_v_blocks_faq_items_locales\` (
  	\`q\` text,
  	\`a\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_events_v_blocks_faq_items\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_events_v_blocks_faq_items_locales_locale_parent_id_unique\` ON \`_events_v_blocks_faq_items_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_events_v_blocks_embed\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`code\` text,
  	\`height\` numeric DEFAULT 480,
  	\`display_hidden\` integer,
  	\`display_show_on\` text DEFAULT 'all',
  	\`display_anchor\` text,
  	\`display_show_from\` text,
  	\`display_show_until\` text,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_events_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_events_v_blocks_embed_order_idx\` ON \`_events_v_blocks_embed\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_events_v_blocks_embed_parent_id_idx\` ON \`_events_v_blocks_embed\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_events_v_blocks_embed_path_idx\` ON \`_events_v_blocks_embed\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_events_v_blocks_embed_locales\` (
  	\`heading\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_events_v_blocks_embed\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_events_v_blocks_embed_locales_locale_parent_id_unique\` ON \`_events_v_blocks_embed_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_events_v_blocks_spacer\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`size\` text DEFAULT 'm',
  	\`divider\` integer,
  	\`display_hidden\` integer,
  	\`display_show_on\` text DEFAULT 'all',
  	\`display_anchor\` text,
  	\`display_show_from\` text,
  	\`display_show_until\` text,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_events_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_events_v_blocks_spacer_order_idx\` ON \`_events_v_blocks_spacer\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_events_v_blocks_spacer_parent_id_idx\` ON \`_events_v_blocks_spacer\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_events_v_blocks_spacer_path_idx\` ON \`_events_v_blocks_spacer\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_events_v_blocks_reusable\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`section_id\` integer,
  	\`display_hidden\` integer,
  	\`display_show_on\` text DEFAULT 'all',
  	\`display_anchor\` text,
  	\`display_show_from\` text,
  	\`display_show_until\` text,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`section_id\`) REFERENCES \`sections\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_events_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_events_v_blocks_reusable_order_idx\` ON \`_events_v_blocks_reusable\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_events_v_blocks_reusable_parent_id_idx\` ON \`_events_v_blocks_reusable\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_events_v_blocks_reusable_path_idx\` ON \`_events_v_blocks_reusable\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`_events_v_blocks_reusable_section_idx\` ON \`_events_v_blocks_reusable\` (\`section_id\`);`)
  await db.run(sql`CREATE TABLE \`worlds_blocks_offer_spotlight\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`offer_id\` integer NOT NULL,
  	\`layout\` text DEFAULT 'banner',
  	\`tone\` text DEFAULT 'coral',
  	\`show_ends\` integer DEFAULT true,
  	\`display_hidden\` integer,
  	\`display_show_on\` text DEFAULT 'all',
  	\`display_anchor\` text,
  	\`display_show_from\` text,
  	\`display_show_until\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`offer_id\`) REFERENCES \`offers\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`worlds\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`worlds_blocks_offer_spotlight_order_idx\` ON \`worlds_blocks_offer_spotlight\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`worlds_blocks_offer_spotlight_parent_id_idx\` ON \`worlds_blocks_offer_spotlight\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`worlds_blocks_offer_spotlight_path_idx\` ON \`worlds_blocks_offer_spotlight\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`worlds_blocks_offer_spotlight_offer_idx\` ON \`worlds_blocks_offer_spotlight\` (\`offer_id\`);`)
  await db.run(sql`CREATE TABLE \`worlds_blocks_offer_spotlight_locales\` (
  	\`heading\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`worlds_blocks_offer_spotlight\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`worlds_blocks_offer_spotlight_locales_locale_parent_id_uniqu\` ON \`worlds_blocks_offer_spotlight_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`worlds_blocks_rides_list\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`world\` text DEFAULT 'dry' NOT NULL,
  	\`display_hidden\` integer,
  	\`display_show_on\` text DEFAULT 'all',
  	\`display_anchor\` text,
  	\`display_show_from\` text,
  	\`display_show_until\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`worlds\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`worlds_blocks_rides_list_order_idx\` ON \`worlds_blocks_rides_list\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`worlds_blocks_rides_list_parent_id_idx\` ON \`worlds_blocks_rides_list\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`worlds_blocks_rides_list_path_idx\` ON \`worlds_blocks_rides_list\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`worlds_blocks_rides_list_locales\` (
  	\`heading\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`worlds_blocks_rides_list\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`worlds_blocks_rides_list_locales_locale_parent_id_unique\` ON \`worlds_blocks_rides_list_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`worlds_blocks_venues_grid\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`display_hidden\` integer,
  	\`display_show_on\` text DEFAULT 'all',
  	\`display_anchor\` text,
  	\`display_show_from\` text,
  	\`display_show_until\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`worlds\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`worlds_blocks_venues_grid_order_idx\` ON \`worlds_blocks_venues_grid\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`worlds_blocks_venues_grid_parent_id_idx\` ON \`worlds_blocks_venues_grid\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`worlds_blocks_venues_grid_path_idx\` ON \`worlds_blocks_venues_grid\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`worlds_blocks_venues_grid_locales\` (
  	\`heading\` text,
  	\`intro\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`worlds_blocks_venues_grid\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`worlds_blocks_venues_grid_locales_locale_parent_id_unique\` ON \`worlds_blocks_venues_grid_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`worlds_blocks_map\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`query\` text DEFAULT 'Nicco Park, Jheel Meel, Sector IV, Salt Lake, Kolkata',
  	\`show_routes\` integer DEFAULT true,
  	\`display_hidden\` integer,
  	\`display_show_on\` text DEFAULT 'all',
  	\`display_anchor\` text,
  	\`display_show_from\` text,
  	\`display_show_until\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`worlds\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`worlds_blocks_map_order_idx\` ON \`worlds_blocks_map\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`worlds_blocks_map_parent_id_idx\` ON \`worlds_blocks_map\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`worlds_blocks_map_path_idx\` ON \`worlds_blocks_map\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`worlds_blocks_map_locales\` (
  	\`heading\` text,
  	\`intro\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`worlds_blocks_map\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`worlds_blocks_map_locales_locale_parent_id_unique\` ON \`worlds_blocks_map_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`worlds_blocks_columns_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`icon\` text,
  	\`image_id\` integer,
  	\`link_href\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`worlds_blocks_columns\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`worlds_blocks_columns_items_order_idx\` ON \`worlds_blocks_columns_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`worlds_blocks_columns_items_parent_id_idx\` ON \`worlds_blocks_columns_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`worlds_blocks_columns_items_image_idx\` ON \`worlds_blocks_columns_items\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`worlds_blocks_columns_items_locales\` (
  	\`title\` text NOT NULL,
  	\`text\` text,
  	\`link_label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`worlds_blocks_columns_items\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`worlds_blocks_columns_items_locales_locale_parent_id_unique\` ON \`worlds_blocks_columns_items_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`worlds_blocks_columns\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`tone\` text DEFAULT 'white',
  	\`per_row\` text DEFAULT '3',
  	\`display_hidden\` integer,
  	\`display_show_on\` text DEFAULT 'all',
  	\`display_anchor\` text,
  	\`display_show_from\` text,
  	\`display_show_until\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`worlds\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`worlds_blocks_columns_order_idx\` ON \`worlds_blocks_columns\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`worlds_blocks_columns_parent_id_idx\` ON \`worlds_blocks_columns\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`worlds_blocks_columns_path_idx\` ON \`worlds_blocks_columns\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`worlds_blocks_columns_locales\` (
  	\`eyebrow\` text,
  	\`heading\` text,
  	\`intro\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`worlds_blocks_columns\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`worlds_blocks_columns_locales_locale_parent_id_unique\` ON \`worlds_blocks_columns_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`worlds_blocks_video\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`source\` text DEFAULT 'upload',
  	\`file_id\` integer,
  	\`url\` text,
  	\`poster_id\` integer,
  	\`layout\` text DEFAULT 'framed',
  	\`autoplay\` integer,
  	\`tone\` text DEFAULT 'ink',
  	\`cta_href\` text,
  	\`display_hidden\` integer,
  	\`display_show_on\` text DEFAULT 'all',
  	\`display_anchor\` text,
  	\`display_show_from\` text,
  	\`display_show_until\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`file_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`poster_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`worlds\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`worlds_blocks_video_order_idx\` ON \`worlds_blocks_video\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`worlds_blocks_video_parent_id_idx\` ON \`worlds_blocks_video\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`worlds_blocks_video_path_idx\` ON \`worlds_blocks_video\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`worlds_blocks_video_file_idx\` ON \`worlds_blocks_video\` (\`file_id\`);`)
  await db.run(sql`CREATE INDEX \`worlds_blocks_video_poster_idx\` ON \`worlds_blocks_video\` (\`poster_id\`);`)
  await db.run(sql`CREATE TABLE \`worlds_blocks_video_locales\` (
  	\`eyebrow\` text,
  	\`heading\` text,
  	\`body\` text,
  	\`cta_label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`worlds_blocks_video\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`worlds_blocks_video_locales_locale_parent_id_unique\` ON \`worlds_blocks_video_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`worlds_blocks_testimonials_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`source\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`worlds_blocks_testimonials\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`worlds_blocks_testimonials_items_order_idx\` ON \`worlds_blocks_testimonials_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`worlds_blocks_testimonials_items_parent_id_idx\` ON \`worlds_blocks_testimonials_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`worlds_blocks_testimonials_items_locales\` (
  	\`quote\` text NOT NULL,
  	\`detail\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`worlds_blocks_testimonials_items\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`worlds_blocks_testimonials_items_locales_locale_parent_id_un\` ON \`worlds_blocks_testimonials_items_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`worlds_blocks_testimonials\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`tone\` text DEFAULT 'cream',
  	\`display_hidden\` integer,
  	\`display_show_on\` text DEFAULT 'all',
  	\`display_anchor\` text,
  	\`display_show_from\` text,
  	\`display_show_until\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`worlds\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`worlds_blocks_testimonials_order_idx\` ON \`worlds_blocks_testimonials\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`worlds_blocks_testimonials_parent_id_idx\` ON \`worlds_blocks_testimonials\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`worlds_blocks_testimonials_path_idx\` ON \`worlds_blocks_testimonials\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`worlds_blocks_testimonials_locales\` (
  	\`heading\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`worlds_blocks_testimonials\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`worlds_blocks_testimonials_locales_locale_parent_id_unique\` ON \`worlds_blocks_testimonials_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`worlds_blocks_logo_strip_logos\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`href\` text,
  	\`image_id\` integer,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`worlds_blocks_logo_strip\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`worlds_blocks_logo_strip_logos_order_idx\` ON \`worlds_blocks_logo_strip_logos\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`worlds_blocks_logo_strip_logos_parent_id_idx\` ON \`worlds_blocks_logo_strip_logos\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`worlds_blocks_logo_strip_logos_image_idx\` ON \`worlds_blocks_logo_strip_logos\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`worlds_blocks_logo_strip\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`display_hidden\` integer,
  	\`display_show_on\` text DEFAULT 'all',
  	\`display_anchor\` text,
  	\`display_show_from\` text,
  	\`display_show_until\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`worlds\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`worlds_blocks_logo_strip_order_idx\` ON \`worlds_blocks_logo_strip\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`worlds_blocks_logo_strip_parent_id_idx\` ON \`worlds_blocks_logo_strip\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`worlds_blocks_logo_strip_path_idx\` ON \`worlds_blocks_logo_strip\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`worlds_blocks_logo_strip_locales\` (
  	\`heading\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`worlds_blocks_logo_strip\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`worlds_blocks_logo_strip_locales_locale_parent_id_unique\` ON \`worlds_blocks_logo_strip_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`worlds_blocks_faq_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`worlds_blocks_faq\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`worlds_blocks_faq_items_order_idx\` ON \`worlds_blocks_faq_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`worlds_blocks_faq_items_parent_id_idx\` ON \`worlds_blocks_faq_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`worlds_blocks_faq_items_locales\` (
  	\`q\` text NOT NULL,
  	\`a\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`worlds_blocks_faq_items\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`worlds_blocks_faq_items_locales_locale_parent_id_unique\` ON \`worlds_blocks_faq_items_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`worlds_blocks_embed\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`code\` text,
  	\`height\` numeric DEFAULT 480,
  	\`display_hidden\` integer,
  	\`display_show_on\` text DEFAULT 'all',
  	\`display_anchor\` text,
  	\`display_show_from\` text,
  	\`display_show_until\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`worlds\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`worlds_blocks_embed_order_idx\` ON \`worlds_blocks_embed\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`worlds_blocks_embed_parent_id_idx\` ON \`worlds_blocks_embed\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`worlds_blocks_embed_path_idx\` ON \`worlds_blocks_embed\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`worlds_blocks_embed_locales\` (
  	\`heading\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`worlds_blocks_embed\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`worlds_blocks_embed_locales_locale_parent_id_unique\` ON \`worlds_blocks_embed_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`worlds_blocks_spacer\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`size\` text DEFAULT 'm',
  	\`divider\` integer,
  	\`display_hidden\` integer,
  	\`display_show_on\` text DEFAULT 'all',
  	\`display_anchor\` text,
  	\`display_show_from\` text,
  	\`display_show_until\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`worlds\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`worlds_blocks_spacer_order_idx\` ON \`worlds_blocks_spacer\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`worlds_blocks_spacer_parent_id_idx\` ON \`worlds_blocks_spacer\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`worlds_blocks_spacer_path_idx\` ON \`worlds_blocks_spacer\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`worlds_blocks_reusable\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`section_id\` integer NOT NULL,
  	\`display_hidden\` integer,
  	\`display_show_on\` text DEFAULT 'all',
  	\`display_anchor\` text,
  	\`display_show_from\` text,
  	\`display_show_until\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`section_id\`) REFERENCES \`sections\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`worlds\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`worlds_blocks_reusable_order_idx\` ON \`worlds_blocks_reusable\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`worlds_blocks_reusable_parent_id_idx\` ON \`worlds_blocks_reusable\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`worlds_blocks_reusable_path_idx\` ON \`worlds_blocks_reusable\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`worlds_blocks_reusable_section_idx\` ON \`worlds_blocks_reusable\` (\`section_id\`);`)
  await db.run(sql`CREATE TABLE \`sections_blocks_hero_slides\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`tone\` text DEFAULT 'ink',
  	\`image_id\` integer,
  	\`cta_href\` text,
  	\`secondary_href\` text,
  	\`is_brand_headline\` integer,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`sections_blocks_hero\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`sections_blocks_hero_slides_order_idx\` ON \`sections_blocks_hero_slides\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`sections_blocks_hero_slides_parent_id_idx\` ON \`sections_blocks_hero_slides\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`sections_blocks_hero_slides_image_idx\` ON \`sections_blocks_hero_slides\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`sections_blocks_hero_slides_locales\` (
  	\`tab\` text,
  	\`badge\` text,
  	\`eyebrow\` text,
  	\`title\` text,
  	\`body\` text,
  	\`price\` text,
  	\`cta_label\` text,
  	\`secondary_label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`sections_blocks_hero_slides\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`sections_blocks_hero_slides_locales_locale_parent_id_unique\` ON \`sections_blocks_hero_slides_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`sections_blocks_hero\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`style\` text DEFAULT 'framed',
  	\`autoplay_seconds\` numeric DEFAULT 6.5,
  	\`show_booking_box\` integer DEFAULT true,
  	\`video_id\` integer,
  	\`display_hidden\` integer,
  	\`display_show_on\` text DEFAULT 'all',
  	\`display_anchor\` text,
  	\`display_show_from\` text,
  	\`display_show_until\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`video_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`sections\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`sections_blocks_hero_order_idx\` ON \`sections_blocks_hero\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`sections_blocks_hero_parent_id_idx\` ON \`sections_blocks_hero\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`sections_blocks_hero_path_idx\` ON \`sections_blocks_hero\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`sections_blocks_hero_video_idx\` ON \`sections_blocks_hero\` (\`video_id\`);`)
  await db.run(sql`CREATE TABLE \`sections_blocks_ticker_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`href\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`sections_blocks_ticker\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`sections_blocks_ticker_items_order_idx\` ON \`sections_blocks_ticker_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`sections_blocks_ticker_items_parent_id_idx\` ON \`sections_blocks_ticker_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`sections_blocks_ticker_items_locales\` (
  	\`label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`sections_blocks_ticker_items\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`sections_blocks_ticker_items_locales_locale_parent_id_unique\` ON \`sections_blocks_ticker_items_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`sections_blocks_ticker\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`tone\` text DEFAULT 'yellow',
  	\`display_hidden\` integer,
  	\`display_show_on\` text DEFAULT 'all',
  	\`display_anchor\` text,
  	\`display_show_from\` text,
  	\`display_show_until\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`sections\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`sections_blocks_ticker_order_idx\` ON \`sections_blocks_ticker\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`sections_blocks_ticker_parent_id_idx\` ON \`sections_blocks_ticker\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`sections_blocks_ticker_path_idx\` ON \`sections_blocks_ticker\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`sections_blocks_offer_spotlight\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`offer_id\` integer,
  	\`layout\` text DEFAULT 'banner',
  	\`tone\` text DEFAULT 'coral',
  	\`show_ends\` integer DEFAULT true,
  	\`display_hidden\` integer,
  	\`display_show_on\` text DEFAULT 'all',
  	\`display_anchor\` text,
  	\`display_show_from\` text,
  	\`display_show_until\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`offer_id\`) REFERENCES \`offers\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`sections\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`sections_blocks_offer_spotlight_order_idx\` ON \`sections_blocks_offer_spotlight\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`sections_blocks_offer_spotlight_parent_id_idx\` ON \`sections_blocks_offer_spotlight\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`sections_blocks_offer_spotlight_path_idx\` ON \`sections_blocks_offer_spotlight\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`sections_blocks_offer_spotlight_offer_idx\` ON \`sections_blocks_offer_spotlight\` (\`offer_id\`);`)
  await db.run(sql`CREATE TABLE \`sections_blocks_offer_spotlight_locales\` (
  	\`heading\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`sections_blocks_offer_spotlight\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`sections_blocks_offer_spotlight_locales_locale_parent_id_uni\` ON \`sections_blocks_offer_spotlight_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`sections_blocks_countdown\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`ends_at\` text,
  	\`tone\` text DEFAULT 'ink',
  	\`cta_href\` text,
  	\`display_hidden\` integer,
  	\`display_show_on\` text DEFAULT 'all',
  	\`display_anchor\` text,
  	\`display_show_from\` text,
  	\`display_show_until\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`sections\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`sections_blocks_countdown_order_idx\` ON \`sections_blocks_countdown\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`sections_blocks_countdown_parent_id_idx\` ON \`sections_blocks_countdown\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`sections_blocks_countdown_path_idx\` ON \`sections_blocks_countdown\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`sections_blocks_countdown_locales\` (
  	\`heading\` text,
  	\`body\` text,
  	\`cta_label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`sections_blocks_countdown\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`sections_blocks_countdown_locales_locale_parent_id_unique\` ON \`sections_blocks_countdown_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`sections_blocks_cta_band\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`tone\` text DEFAULT 'coral',
  	\`primary_href\` text,
  	\`secondary_href\` text,
  	\`display_hidden\` integer,
  	\`display_show_on\` text DEFAULT 'all',
  	\`display_anchor\` text,
  	\`display_show_from\` text,
  	\`display_show_until\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`sections\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`sections_blocks_cta_band_order_idx\` ON \`sections_blocks_cta_band\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`sections_blocks_cta_band_parent_id_idx\` ON \`sections_blocks_cta_band\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`sections_blocks_cta_band_path_idx\` ON \`sections_blocks_cta_band\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`sections_blocks_cta_band_locales\` (
  	\`heading\` text,
  	\`body\` text,
  	\`primary_label\` text,
  	\`secondary_label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`sections_blocks_cta_band\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`sections_blocks_cta_band_locales_locale_parent_id_unique\` ON \`sections_blocks_cta_band_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`sections_blocks_ticket_cards\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`tone\` text DEFAULT 'cream',
  	\`display_hidden\` integer,
  	\`display_show_on\` text DEFAULT 'all',
  	\`display_anchor\` text,
  	\`display_show_from\` text,
  	\`display_show_until\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`sections\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`sections_blocks_ticket_cards_order_idx\` ON \`sections_blocks_ticket_cards\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`sections_blocks_ticket_cards_parent_id_idx\` ON \`sections_blocks_ticket_cards\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`sections_blocks_ticket_cards_path_idx\` ON \`sections_blocks_ticket_cards\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`sections_blocks_ticket_cards_locales\` (
  	\`eyebrow\` text,
  	\`heading\` text,
  	\`intro\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`sections_blocks_ticket_cards\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`sections_blocks_ticket_cards_locales_locale_parent_id_unique\` ON \`sections_blocks_ticket_cards_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`sections_blocks_offer_grid\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`tone\` text DEFAULT 'white',
  	\`display_hidden\` integer,
  	\`display_show_on\` text DEFAULT 'all',
  	\`display_anchor\` text,
  	\`display_show_from\` text,
  	\`display_show_until\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`sections\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`sections_blocks_offer_grid_order_idx\` ON \`sections_blocks_offer_grid\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`sections_blocks_offer_grid_parent_id_idx\` ON \`sections_blocks_offer_grid\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`sections_blocks_offer_grid_path_idx\` ON \`sections_blocks_offer_grid\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`sections_blocks_offer_grid_locales\` (
  	\`heading\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`sections_blocks_offer_grid\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`sections_blocks_offer_grid_locales_locale_parent_id_unique\` ON \`sections_blocks_offer_grid_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`sections_blocks_worlds_grid\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`display_hidden\` integer,
  	\`display_show_on\` text DEFAULT 'all',
  	\`display_anchor\` text,
  	\`display_show_from\` text,
  	\`display_show_until\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`sections\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`sections_blocks_worlds_grid_order_idx\` ON \`sections_blocks_worlds_grid\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`sections_blocks_worlds_grid_parent_id_idx\` ON \`sections_blocks_worlds_grid\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`sections_blocks_worlds_grid_path_idx\` ON \`sections_blocks_worlds_grid\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`sections_blocks_worlds_grid_locales\` (
  	\`eyebrow\` text,
  	\`heading\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`sections_blocks_worlds_grid\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`sections_blocks_worlds_grid_locales_locale_parent_id_unique\` ON \`sections_blocks_worlds_grid_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`sections_blocks_rides_list\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`world\` text DEFAULT 'dry',
  	\`display_hidden\` integer,
  	\`display_show_on\` text DEFAULT 'all',
  	\`display_anchor\` text,
  	\`display_show_from\` text,
  	\`display_show_until\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`sections\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`sections_blocks_rides_list_order_idx\` ON \`sections_blocks_rides_list\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`sections_blocks_rides_list_parent_id_idx\` ON \`sections_blocks_rides_list\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`sections_blocks_rides_list_path_idx\` ON \`sections_blocks_rides_list\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`sections_blocks_rides_list_locales\` (
  	\`heading\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`sections_blocks_rides_list\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`sections_blocks_rides_list_locales_locale_parent_id_unique\` ON \`sections_blocks_rides_list_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`sections_blocks_events_rail\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`tone\` text DEFAULT 'wet',
  	\`display_hidden\` integer,
  	\`display_show_on\` text DEFAULT 'all',
  	\`display_anchor\` text,
  	\`display_show_from\` text,
  	\`display_show_until\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`sections\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`sections_blocks_events_rail_order_idx\` ON \`sections_blocks_events_rail\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`sections_blocks_events_rail_parent_id_idx\` ON \`sections_blocks_events_rail\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`sections_blocks_events_rail_path_idx\` ON \`sections_blocks_events_rail\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`sections_blocks_events_rail_locales\` (
  	\`eyebrow\` text,
  	\`heading\` text,
  	\`intro\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`sections_blocks_events_rail\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`sections_blocks_events_rail_locales_locale_parent_id_unique\` ON \`sections_blocks_events_rail_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`sections_blocks_today_status\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`show_whatsapp\` integer DEFAULT true,
  	\`display_hidden\` integer,
  	\`display_show_on\` text DEFAULT 'all',
  	\`display_anchor\` text,
  	\`display_show_from\` text,
  	\`display_show_until\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`sections\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`sections_blocks_today_status_order_idx\` ON \`sections_blocks_today_status\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`sections_blocks_today_status_parent_id_idx\` ON \`sections_blocks_today_status\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`sections_blocks_today_status_path_idx\` ON \`sections_blocks_today_status\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`sections_blocks_today_status_locales\` (
  	\`heading\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`sections_blocks_today_status\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`sections_blocks_today_status_locales_locale_parent_id_unique\` ON \`sections_blocks_today_status_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`sections_blocks_crew_planner\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`display_hidden\` integer,
  	\`display_show_on\` text DEFAULT 'all',
  	\`display_anchor\` text,
  	\`display_show_from\` text,
  	\`display_show_until\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`sections\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`sections_blocks_crew_planner_order_idx\` ON \`sections_blocks_crew_planner\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`sections_blocks_crew_planner_parent_id_idx\` ON \`sections_blocks_crew_planner\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`sections_blocks_crew_planner_path_idx\` ON \`sections_blocks_crew_planner\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`sections_blocks_crew_planner_locales\` (
  	\`heading\` text,
  	\`intro\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`sections_blocks_crew_planner\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`sections_blocks_crew_planner_locales_locale_parent_id_unique\` ON \`sections_blocks_crew_planner_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`sections_blocks_venues_grid\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`display_hidden\` integer,
  	\`display_show_on\` text DEFAULT 'all',
  	\`display_anchor\` text,
  	\`display_show_from\` text,
  	\`display_show_until\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`sections\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`sections_blocks_venues_grid_order_idx\` ON \`sections_blocks_venues_grid\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`sections_blocks_venues_grid_parent_id_idx\` ON \`sections_blocks_venues_grid\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`sections_blocks_venues_grid_path_idx\` ON \`sections_blocks_venues_grid\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`sections_blocks_venues_grid_locales\` (
  	\`heading\` text,
  	\`intro\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`sections_blocks_venues_grid\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`sections_blocks_venues_grid_locales_locale_parent_id_unique\` ON \`sections_blocks_venues_grid_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`sections_blocks_map\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`query\` text DEFAULT 'Nicco Park, Jheel Meel, Sector IV, Salt Lake, Kolkata',
  	\`show_routes\` integer DEFAULT true,
  	\`display_hidden\` integer,
  	\`display_show_on\` text DEFAULT 'all',
  	\`display_anchor\` text,
  	\`display_show_from\` text,
  	\`display_show_until\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`sections\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`sections_blocks_map_order_idx\` ON \`sections_blocks_map\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`sections_blocks_map_parent_id_idx\` ON \`sections_blocks_map\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`sections_blocks_map_path_idx\` ON \`sections_blocks_map\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`sections_blocks_map_locales\` (
  	\`heading\` text,
  	\`intro\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`sections_blocks_map\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`sections_blocks_map_locales_locale_parent_id_unique\` ON \`sections_blocks_map_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`sections_blocks_stats_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`sections_blocks_stats\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`sections_blocks_stats_items_order_idx\` ON \`sections_blocks_stats_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`sections_blocks_stats_items_parent_id_idx\` ON \`sections_blocks_stats_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`sections_blocks_stats_items_locales\` (
  	\`value\` text,
  	\`label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`sections_blocks_stats_items\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`sections_blocks_stats_items_locales_locale_parent_id_unique\` ON \`sections_blocks_stats_items_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`sections_blocks_stats\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`tone\` text DEFAULT 'dry',
  	\`show_trust\` integer DEFAULT true,
  	\`display_hidden\` integer,
  	\`display_show_on\` text DEFAULT 'all',
  	\`display_anchor\` text,
  	\`display_show_from\` text,
  	\`display_show_until\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`sections\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`sections_blocks_stats_order_idx\` ON \`sections_blocks_stats\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`sections_blocks_stats_parent_id_idx\` ON \`sections_blocks_stats\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`sections_blocks_stats_path_idx\` ON \`sections_blocks_stats\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`sections_blocks_stats_locales\` (
  	\`heading\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`sections_blocks_stats\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`sections_blocks_stats_locales_locale_parent_id_unique\` ON \`sections_blocks_stats_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`sections_blocks_image_text\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`image_id\` integer,
  	\`image_side\` text DEFAULT 'right',
  	\`tone\` text DEFAULT 'white',
  	\`cta_href\` text,
  	\`display_hidden\` integer,
  	\`display_show_on\` text DEFAULT 'all',
  	\`display_anchor\` text,
  	\`display_show_from\` text,
  	\`display_show_until\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`sections\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`sections_blocks_image_text_order_idx\` ON \`sections_blocks_image_text\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`sections_blocks_image_text_parent_id_idx\` ON \`sections_blocks_image_text\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`sections_blocks_image_text_path_idx\` ON \`sections_blocks_image_text\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`sections_blocks_image_text_image_idx\` ON \`sections_blocks_image_text\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`sections_blocks_image_text_locales\` (
  	\`eyebrow\` text,
  	\`heading\` text,
  	\`body\` text,
  	\`cta_label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`sections_blocks_image_text\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`sections_blocks_image_text_locales_locale_parent_id_unique\` ON \`sections_blocks_image_text_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`sections_blocks_columns_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`icon\` text,
  	\`image_id\` integer,
  	\`link_href\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`sections_blocks_columns\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`sections_blocks_columns_items_order_idx\` ON \`sections_blocks_columns_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`sections_blocks_columns_items_parent_id_idx\` ON \`sections_blocks_columns_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`sections_blocks_columns_items_image_idx\` ON \`sections_blocks_columns_items\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`sections_blocks_columns_items_locales\` (
  	\`title\` text,
  	\`text\` text,
  	\`link_label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`sections_blocks_columns_items\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`sections_blocks_columns_items_locales_locale_parent_id_uniqu\` ON \`sections_blocks_columns_items_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`sections_blocks_columns\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`tone\` text DEFAULT 'white',
  	\`per_row\` text DEFAULT '3',
  	\`display_hidden\` integer,
  	\`display_show_on\` text DEFAULT 'all',
  	\`display_anchor\` text,
  	\`display_show_from\` text,
  	\`display_show_until\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`sections\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`sections_blocks_columns_order_idx\` ON \`sections_blocks_columns\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`sections_blocks_columns_parent_id_idx\` ON \`sections_blocks_columns\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`sections_blocks_columns_path_idx\` ON \`sections_blocks_columns\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`sections_blocks_columns_locales\` (
  	\`eyebrow\` text,
  	\`heading\` text,
  	\`intro\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`sections_blocks_columns\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`sections_blocks_columns_locales_locale_parent_id_unique\` ON \`sections_blocks_columns_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`sections_blocks_rich_text\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`tone\` text DEFAULT 'white',
  	\`width\` text DEFAULT 'narrow',
  	\`display_hidden\` integer,
  	\`display_show_on\` text DEFAULT 'all',
  	\`display_anchor\` text,
  	\`display_show_from\` text,
  	\`display_show_until\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`sections\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`sections_blocks_rich_text_order_idx\` ON \`sections_blocks_rich_text\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`sections_blocks_rich_text_parent_id_idx\` ON \`sections_blocks_rich_text\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`sections_blocks_rich_text_path_idx\` ON \`sections_blocks_rich_text\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`sections_blocks_rich_text_locales\` (
  	\`content\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`sections_blocks_rich_text\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`sections_blocks_rich_text_locales_locale_parent_id_unique\` ON \`sections_blocks_rich_text_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`sections_blocks_video\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`source\` text DEFAULT 'upload',
  	\`file_id\` integer,
  	\`url\` text,
  	\`poster_id\` integer,
  	\`layout\` text DEFAULT 'framed',
  	\`autoplay\` integer,
  	\`tone\` text DEFAULT 'ink',
  	\`cta_href\` text,
  	\`display_hidden\` integer,
  	\`display_show_on\` text DEFAULT 'all',
  	\`display_anchor\` text,
  	\`display_show_from\` text,
  	\`display_show_until\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`file_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`poster_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`sections\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`sections_blocks_video_order_idx\` ON \`sections_blocks_video\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`sections_blocks_video_parent_id_idx\` ON \`sections_blocks_video\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`sections_blocks_video_path_idx\` ON \`sections_blocks_video\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`sections_blocks_video_file_idx\` ON \`sections_blocks_video\` (\`file_id\`);`)
  await db.run(sql`CREATE INDEX \`sections_blocks_video_poster_idx\` ON \`sections_blocks_video\` (\`poster_id\`);`)
  await db.run(sql`CREATE TABLE \`sections_blocks_video_locales\` (
  	\`eyebrow\` text,
  	\`heading\` text,
  	\`body\` text,
  	\`cta_label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`sections_blocks_video\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`sections_blocks_video_locales_locale_parent_id_unique\` ON \`sections_blocks_video_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`sections_blocks_gallery\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`display_hidden\` integer,
  	\`display_show_on\` text DEFAULT 'all',
  	\`display_anchor\` text,
  	\`display_show_from\` text,
  	\`display_show_until\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`sections\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`sections_blocks_gallery_order_idx\` ON \`sections_blocks_gallery\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`sections_blocks_gallery_parent_id_idx\` ON \`sections_blocks_gallery\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`sections_blocks_gallery_path_idx\` ON \`sections_blocks_gallery\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`sections_blocks_gallery_locales\` (
  	\`heading\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`sections_blocks_gallery\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`sections_blocks_gallery_locales_locale_parent_id_unique\` ON \`sections_blocks_gallery_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`sections_blocks_testimonials_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name\` text,
  	\`source\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`sections_blocks_testimonials\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`sections_blocks_testimonials_items_order_idx\` ON \`sections_blocks_testimonials_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`sections_blocks_testimonials_items_parent_id_idx\` ON \`sections_blocks_testimonials_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`sections_blocks_testimonials_items_locales\` (
  	\`quote\` text,
  	\`detail\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`sections_blocks_testimonials_items\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`sections_blocks_testimonials_items_locales_locale_parent_id_\` ON \`sections_blocks_testimonials_items_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`sections_blocks_testimonials\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`tone\` text DEFAULT 'cream',
  	\`display_hidden\` integer,
  	\`display_show_on\` text DEFAULT 'all',
  	\`display_anchor\` text,
  	\`display_show_from\` text,
  	\`display_show_until\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`sections\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`sections_blocks_testimonials_order_idx\` ON \`sections_blocks_testimonials\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`sections_blocks_testimonials_parent_id_idx\` ON \`sections_blocks_testimonials\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`sections_blocks_testimonials_path_idx\` ON \`sections_blocks_testimonials\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`sections_blocks_testimonials_locales\` (
  	\`heading\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`sections_blocks_testimonials\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`sections_blocks_testimonials_locales_locale_parent_id_unique\` ON \`sections_blocks_testimonials_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`sections_blocks_logo_strip_logos\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name\` text,
  	\`href\` text,
  	\`image_id\` integer,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`sections_blocks_logo_strip\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`sections_blocks_logo_strip_logos_order_idx\` ON \`sections_blocks_logo_strip_logos\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`sections_blocks_logo_strip_logos_parent_id_idx\` ON \`sections_blocks_logo_strip_logos\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`sections_blocks_logo_strip_logos_image_idx\` ON \`sections_blocks_logo_strip_logos\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`sections_blocks_logo_strip\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`display_hidden\` integer,
  	\`display_show_on\` text DEFAULT 'all',
  	\`display_anchor\` text,
  	\`display_show_from\` text,
  	\`display_show_until\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`sections\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`sections_blocks_logo_strip_order_idx\` ON \`sections_blocks_logo_strip\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`sections_blocks_logo_strip_parent_id_idx\` ON \`sections_blocks_logo_strip\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`sections_blocks_logo_strip_path_idx\` ON \`sections_blocks_logo_strip\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`sections_blocks_logo_strip_locales\` (
  	\`heading\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`sections_blocks_logo_strip\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`sections_blocks_logo_strip_locales_locale_parent_id_unique\` ON \`sections_blocks_logo_strip_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`sections_blocks_faq_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`sections_blocks_faq\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`sections_blocks_faq_items_order_idx\` ON \`sections_blocks_faq_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`sections_blocks_faq_items_parent_id_idx\` ON \`sections_blocks_faq_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`sections_blocks_faq_items_locales\` (
  	\`q\` text,
  	\`a\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`sections_blocks_faq_items\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`sections_blocks_faq_items_locales_locale_parent_id_unique\` ON \`sections_blocks_faq_items_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`sections_blocks_faq\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`display_hidden\` integer,
  	\`display_show_on\` text DEFAULT 'all',
  	\`display_anchor\` text,
  	\`display_show_from\` text,
  	\`display_show_until\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`sections\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`sections_blocks_faq_order_idx\` ON \`sections_blocks_faq\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`sections_blocks_faq_parent_id_idx\` ON \`sections_blocks_faq\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`sections_blocks_faq_path_idx\` ON \`sections_blocks_faq\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`sections_blocks_faq_locales\` (
  	\`heading\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`sections_blocks_faq\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`sections_blocks_faq_locales_locale_parent_id_unique\` ON \`sections_blocks_faq_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`sections_blocks_lead_form\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`form_type\` text DEFAULT 'offers',
  	\`tone\` text DEFAULT 'yellow',
  	\`display_hidden\` integer,
  	\`display_show_on\` text DEFAULT 'all',
  	\`display_anchor\` text,
  	\`display_show_from\` text,
  	\`display_show_until\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`sections\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`sections_blocks_lead_form_order_idx\` ON \`sections_blocks_lead_form\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`sections_blocks_lead_form_parent_id_idx\` ON \`sections_blocks_lead_form\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`sections_blocks_lead_form_path_idx\` ON \`sections_blocks_lead_form\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`sections_blocks_lead_form_locales\` (
  	\`heading\` text,
  	\`body\` text,
  	\`button_label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`sections_blocks_lead_form\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`sections_blocks_lead_form_locales_locale_parent_id_unique\` ON \`sections_blocks_lead_form_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`sections_blocks_moments_wall\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`count\` numeric DEFAULT 8,
  	\`display_hidden\` integer,
  	\`display_show_on\` text DEFAULT 'all',
  	\`display_anchor\` text,
  	\`display_show_from\` text,
  	\`display_show_until\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`sections\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`sections_blocks_moments_wall_order_idx\` ON \`sections_blocks_moments_wall\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`sections_blocks_moments_wall_parent_id_idx\` ON \`sections_blocks_moments_wall\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`sections_blocks_moments_wall_path_idx\` ON \`sections_blocks_moments_wall\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`sections_blocks_moments_wall_locales\` (
  	\`heading\` text,
  	\`intro\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`sections_blocks_moments_wall\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`sections_blocks_moments_wall_locales_locale_parent_id_unique\` ON \`sections_blocks_moments_wall_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`sections_blocks_journal_teaser\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`tone\` text DEFAULT 'cream',
  	\`count\` numeric DEFAULT 3,
  	\`display_hidden\` integer,
  	\`display_show_on\` text DEFAULT 'all',
  	\`display_anchor\` text,
  	\`display_show_from\` text,
  	\`display_show_until\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`sections\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`sections_blocks_journal_teaser_order_idx\` ON \`sections_blocks_journal_teaser\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`sections_blocks_journal_teaser_parent_id_idx\` ON \`sections_blocks_journal_teaser\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`sections_blocks_journal_teaser_path_idx\` ON \`sections_blocks_journal_teaser\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`sections_blocks_journal_teaser_locales\` (
  	\`eyebrow\` text,
  	\`heading\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`sections_blocks_journal_teaser\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`sections_blocks_journal_teaser_locales_locale_parent_id_uniq\` ON \`sections_blocks_journal_teaser_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`sections_blocks_embed\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`code\` text,
  	\`height\` numeric DEFAULT 480,
  	\`display_hidden\` integer,
  	\`display_show_on\` text DEFAULT 'all',
  	\`display_anchor\` text,
  	\`display_show_from\` text,
  	\`display_show_until\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`sections\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`sections_blocks_embed_order_idx\` ON \`sections_blocks_embed\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`sections_blocks_embed_parent_id_idx\` ON \`sections_blocks_embed\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`sections_blocks_embed_path_idx\` ON \`sections_blocks_embed\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`sections_blocks_embed_locales\` (
  	\`heading\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`sections_blocks_embed\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`sections_blocks_embed_locales_locale_parent_id_unique\` ON \`sections_blocks_embed_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`sections_blocks_spacer\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`size\` text DEFAULT 'm',
  	\`divider\` integer,
  	\`display_hidden\` integer,
  	\`display_show_on\` text DEFAULT 'all',
  	\`display_anchor\` text,
  	\`display_show_from\` text,
  	\`display_show_until\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`sections\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`sections_blocks_spacer_order_idx\` ON \`sections_blocks_spacer\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`sections_blocks_spacer_parent_id_idx\` ON \`sections_blocks_spacer\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`sections_blocks_spacer_path_idx\` ON \`sections_blocks_spacer\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`sections\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`_status\` text DEFAULT 'draft'
  );
  `)
  await db.run(sql`CREATE INDEX \`sections_updated_at_idx\` ON \`sections\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`sections_created_at_idx\` ON \`sections\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`sections__status_idx\` ON \`sections\` (\`_status\`);`)
  await db.run(sql`CREATE TABLE \`sections_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`media_id\` integer,
  	\`tickets_id\` integer,
  	\`offers_id\` integer,
  	\`events_id\` integer,
  	\`crews_id\` integer,
  	\`faqs_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`sections\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`tickets_id\`) REFERENCES \`tickets\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`offers_id\`) REFERENCES \`offers\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`events_id\`) REFERENCES \`events\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`crews_id\`) REFERENCES \`crews\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`faqs_id\`) REFERENCES \`faqs\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`sections_rels_order_idx\` ON \`sections_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`sections_rels_parent_idx\` ON \`sections_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`sections_rels_path_idx\` ON \`sections_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`sections_rels_media_id_idx\` ON \`sections_rels\` (\`media_id\`);`)
  await db.run(sql`CREATE INDEX \`sections_rels_tickets_id_idx\` ON \`sections_rels\` (\`tickets_id\`);`)
  await db.run(sql`CREATE INDEX \`sections_rels_offers_id_idx\` ON \`sections_rels\` (\`offers_id\`);`)
  await db.run(sql`CREATE INDEX \`sections_rels_events_id_idx\` ON \`sections_rels\` (\`events_id\`);`)
  await db.run(sql`CREATE INDEX \`sections_rels_crews_id_idx\` ON \`sections_rels\` (\`crews_id\`);`)
  await db.run(sql`CREATE INDEX \`sections_rels_faqs_id_idx\` ON \`sections_rels\` (\`faqs_id\`);`)
  await db.run(sql`CREATE TABLE \`_sections_v_blocks_hero_slides\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`tone\` text DEFAULT 'ink',
  	\`image_id\` integer,
  	\`cta_href\` text,
  	\`secondary_href\` text,
  	\`is_brand_headline\` integer,
  	\`_uuid\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_sections_v_blocks_hero\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_sections_v_blocks_hero_slides_order_idx\` ON \`_sections_v_blocks_hero_slides\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_sections_v_blocks_hero_slides_parent_id_idx\` ON \`_sections_v_blocks_hero_slides\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_sections_v_blocks_hero_slides_image_idx\` ON \`_sections_v_blocks_hero_slides\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`_sections_v_blocks_hero_slides_locales\` (
  	\`tab\` text,
  	\`badge\` text,
  	\`eyebrow\` text,
  	\`title\` text,
  	\`body\` text,
  	\`price\` text,
  	\`cta_label\` text,
  	\`secondary_label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_sections_v_blocks_hero_slides\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_sections_v_blocks_hero_slides_locales_locale_parent_id_uniq\` ON \`_sections_v_blocks_hero_slides_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_sections_v_blocks_hero\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`style\` text DEFAULT 'framed',
  	\`autoplay_seconds\` numeric DEFAULT 6.5,
  	\`show_booking_box\` integer DEFAULT true,
  	\`video_id\` integer,
  	\`display_hidden\` integer,
  	\`display_show_on\` text DEFAULT 'all',
  	\`display_anchor\` text,
  	\`display_show_from\` text,
  	\`display_show_until\` text,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`video_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_sections_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_sections_v_blocks_hero_order_idx\` ON \`_sections_v_blocks_hero\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_sections_v_blocks_hero_parent_id_idx\` ON \`_sections_v_blocks_hero\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_sections_v_blocks_hero_path_idx\` ON \`_sections_v_blocks_hero\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`_sections_v_blocks_hero_video_idx\` ON \`_sections_v_blocks_hero\` (\`video_id\`);`)
  await db.run(sql`CREATE TABLE \`_sections_v_blocks_ticker_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`href\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_sections_v_blocks_ticker\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_sections_v_blocks_ticker_items_order_idx\` ON \`_sections_v_blocks_ticker_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_sections_v_blocks_ticker_items_parent_id_idx\` ON \`_sections_v_blocks_ticker_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_sections_v_blocks_ticker_items_locales\` (
  	\`label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_sections_v_blocks_ticker_items\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_sections_v_blocks_ticker_items_locales_locale_parent_id_uni\` ON \`_sections_v_blocks_ticker_items_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_sections_v_blocks_ticker\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`tone\` text DEFAULT 'yellow',
  	\`display_hidden\` integer,
  	\`display_show_on\` text DEFAULT 'all',
  	\`display_anchor\` text,
  	\`display_show_from\` text,
  	\`display_show_until\` text,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_sections_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_sections_v_blocks_ticker_order_idx\` ON \`_sections_v_blocks_ticker\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_sections_v_blocks_ticker_parent_id_idx\` ON \`_sections_v_blocks_ticker\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_sections_v_blocks_ticker_path_idx\` ON \`_sections_v_blocks_ticker\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_sections_v_blocks_offer_spotlight\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`offer_id\` integer,
  	\`layout\` text DEFAULT 'banner',
  	\`tone\` text DEFAULT 'coral',
  	\`show_ends\` integer DEFAULT true,
  	\`display_hidden\` integer,
  	\`display_show_on\` text DEFAULT 'all',
  	\`display_anchor\` text,
  	\`display_show_from\` text,
  	\`display_show_until\` text,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`offer_id\`) REFERENCES \`offers\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_sections_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_sections_v_blocks_offer_spotlight_order_idx\` ON \`_sections_v_blocks_offer_spotlight\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_sections_v_blocks_offer_spotlight_parent_id_idx\` ON \`_sections_v_blocks_offer_spotlight\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_sections_v_blocks_offer_spotlight_path_idx\` ON \`_sections_v_blocks_offer_spotlight\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`_sections_v_blocks_offer_spotlight_offer_idx\` ON \`_sections_v_blocks_offer_spotlight\` (\`offer_id\`);`)
  await db.run(sql`CREATE TABLE \`_sections_v_blocks_offer_spotlight_locales\` (
  	\`heading\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_sections_v_blocks_offer_spotlight\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_sections_v_blocks_offer_spotlight_locales_locale_parent_id_\` ON \`_sections_v_blocks_offer_spotlight_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_sections_v_blocks_countdown\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`ends_at\` text,
  	\`tone\` text DEFAULT 'ink',
  	\`cta_href\` text,
  	\`display_hidden\` integer,
  	\`display_show_on\` text DEFAULT 'all',
  	\`display_anchor\` text,
  	\`display_show_from\` text,
  	\`display_show_until\` text,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_sections_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_sections_v_blocks_countdown_order_idx\` ON \`_sections_v_blocks_countdown\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_sections_v_blocks_countdown_parent_id_idx\` ON \`_sections_v_blocks_countdown\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_sections_v_blocks_countdown_path_idx\` ON \`_sections_v_blocks_countdown\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_sections_v_blocks_countdown_locales\` (
  	\`heading\` text,
  	\`body\` text,
  	\`cta_label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_sections_v_blocks_countdown\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_sections_v_blocks_countdown_locales_locale_parent_id_unique\` ON \`_sections_v_blocks_countdown_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_sections_v_blocks_cta_band\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`tone\` text DEFAULT 'coral',
  	\`primary_href\` text,
  	\`secondary_href\` text,
  	\`display_hidden\` integer,
  	\`display_show_on\` text DEFAULT 'all',
  	\`display_anchor\` text,
  	\`display_show_from\` text,
  	\`display_show_until\` text,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_sections_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_sections_v_blocks_cta_band_order_idx\` ON \`_sections_v_blocks_cta_band\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_sections_v_blocks_cta_band_parent_id_idx\` ON \`_sections_v_blocks_cta_band\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_sections_v_blocks_cta_band_path_idx\` ON \`_sections_v_blocks_cta_band\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_sections_v_blocks_cta_band_locales\` (
  	\`heading\` text,
  	\`body\` text,
  	\`primary_label\` text,
  	\`secondary_label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_sections_v_blocks_cta_band\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_sections_v_blocks_cta_band_locales_locale_parent_id_unique\` ON \`_sections_v_blocks_cta_band_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_sections_v_blocks_ticket_cards\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`tone\` text DEFAULT 'cream',
  	\`display_hidden\` integer,
  	\`display_show_on\` text DEFAULT 'all',
  	\`display_anchor\` text,
  	\`display_show_from\` text,
  	\`display_show_until\` text,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_sections_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_sections_v_blocks_ticket_cards_order_idx\` ON \`_sections_v_blocks_ticket_cards\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_sections_v_blocks_ticket_cards_parent_id_idx\` ON \`_sections_v_blocks_ticket_cards\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_sections_v_blocks_ticket_cards_path_idx\` ON \`_sections_v_blocks_ticket_cards\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_sections_v_blocks_ticket_cards_locales\` (
  	\`eyebrow\` text,
  	\`heading\` text,
  	\`intro\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_sections_v_blocks_ticket_cards\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_sections_v_blocks_ticket_cards_locales_locale_parent_id_uni\` ON \`_sections_v_blocks_ticket_cards_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_sections_v_blocks_offer_grid\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`tone\` text DEFAULT 'white',
  	\`display_hidden\` integer,
  	\`display_show_on\` text DEFAULT 'all',
  	\`display_anchor\` text,
  	\`display_show_from\` text,
  	\`display_show_until\` text,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_sections_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_sections_v_blocks_offer_grid_order_idx\` ON \`_sections_v_blocks_offer_grid\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_sections_v_blocks_offer_grid_parent_id_idx\` ON \`_sections_v_blocks_offer_grid\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_sections_v_blocks_offer_grid_path_idx\` ON \`_sections_v_blocks_offer_grid\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_sections_v_blocks_offer_grid_locales\` (
  	\`heading\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_sections_v_blocks_offer_grid\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_sections_v_blocks_offer_grid_locales_locale_parent_id_uniqu\` ON \`_sections_v_blocks_offer_grid_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_sections_v_blocks_worlds_grid\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`display_hidden\` integer,
  	\`display_show_on\` text DEFAULT 'all',
  	\`display_anchor\` text,
  	\`display_show_from\` text,
  	\`display_show_until\` text,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_sections_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_sections_v_blocks_worlds_grid_order_idx\` ON \`_sections_v_blocks_worlds_grid\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_sections_v_blocks_worlds_grid_parent_id_idx\` ON \`_sections_v_blocks_worlds_grid\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_sections_v_blocks_worlds_grid_path_idx\` ON \`_sections_v_blocks_worlds_grid\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_sections_v_blocks_worlds_grid_locales\` (
  	\`eyebrow\` text,
  	\`heading\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_sections_v_blocks_worlds_grid\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_sections_v_blocks_worlds_grid_locales_locale_parent_id_uniq\` ON \`_sections_v_blocks_worlds_grid_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_sections_v_blocks_rides_list\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`world\` text DEFAULT 'dry',
  	\`display_hidden\` integer,
  	\`display_show_on\` text DEFAULT 'all',
  	\`display_anchor\` text,
  	\`display_show_from\` text,
  	\`display_show_until\` text,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_sections_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_sections_v_blocks_rides_list_order_idx\` ON \`_sections_v_blocks_rides_list\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_sections_v_blocks_rides_list_parent_id_idx\` ON \`_sections_v_blocks_rides_list\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_sections_v_blocks_rides_list_path_idx\` ON \`_sections_v_blocks_rides_list\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_sections_v_blocks_rides_list_locales\` (
  	\`heading\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_sections_v_blocks_rides_list\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_sections_v_blocks_rides_list_locales_locale_parent_id_uniqu\` ON \`_sections_v_blocks_rides_list_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_sections_v_blocks_events_rail\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`tone\` text DEFAULT 'wet',
  	\`display_hidden\` integer,
  	\`display_show_on\` text DEFAULT 'all',
  	\`display_anchor\` text,
  	\`display_show_from\` text,
  	\`display_show_until\` text,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_sections_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_sections_v_blocks_events_rail_order_idx\` ON \`_sections_v_blocks_events_rail\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_sections_v_blocks_events_rail_parent_id_idx\` ON \`_sections_v_blocks_events_rail\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_sections_v_blocks_events_rail_path_idx\` ON \`_sections_v_blocks_events_rail\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_sections_v_blocks_events_rail_locales\` (
  	\`eyebrow\` text,
  	\`heading\` text,
  	\`intro\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_sections_v_blocks_events_rail\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_sections_v_blocks_events_rail_locales_locale_parent_id_uniq\` ON \`_sections_v_blocks_events_rail_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_sections_v_blocks_today_status\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`show_whatsapp\` integer DEFAULT true,
  	\`display_hidden\` integer,
  	\`display_show_on\` text DEFAULT 'all',
  	\`display_anchor\` text,
  	\`display_show_from\` text,
  	\`display_show_until\` text,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_sections_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_sections_v_blocks_today_status_order_idx\` ON \`_sections_v_blocks_today_status\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_sections_v_blocks_today_status_parent_id_idx\` ON \`_sections_v_blocks_today_status\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_sections_v_blocks_today_status_path_idx\` ON \`_sections_v_blocks_today_status\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_sections_v_blocks_today_status_locales\` (
  	\`heading\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_sections_v_blocks_today_status\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_sections_v_blocks_today_status_locales_locale_parent_id_uni\` ON \`_sections_v_blocks_today_status_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_sections_v_blocks_crew_planner\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`display_hidden\` integer,
  	\`display_show_on\` text DEFAULT 'all',
  	\`display_anchor\` text,
  	\`display_show_from\` text,
  	\`display_show_until\` text,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_sections_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_sections_v_blocks_crew_planner_order_idx\` ON \`_sections_v_blocks_crew_planner\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_sections_v_blocks_crew_planner_parent_id_idx\` ON \`_sections_v_blocks_crew_planner\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_sections_v_blocks_crew_planner_path_idx\` ON \`_sections_v_blocks_crew_planner\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_sections_v_blocks_crew_planner_locales\` (
  	\`heading\` text,
  	\`intro\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_sections_v_blocks_crew_planner\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_sections_v_blocks_crew_planner_locales_locale_parent_id_uni\` ON \`_sections_v_blocks_crew_planner_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_sections_v_blocks_venues_grid\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`display_hidden\` integer,
  	\`display_show_on\` text DEFAULT 'all',
  	\`display_anchor\` text,
  	\`display_show_from\` text,
  	\`display_show_until\` text,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_sections_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_sections_v_blocks_venues_grid_order_idx\` ON \`_sections_v_blocks_venues_grid\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_sections_v_blocks_venues_grid_parent_id_idx\` ON \`_sections_v_blocks_venues_grid\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_sections_v_blocks_venues_grid_path_idx\` ON \`_sections_v_blocks_venues_grid\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_sections_v_blocks_venues_grid_locales\` (
  	\`heading\` text,
  	\`intro\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_sections_v_blocks_venues_grid\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_sections_v_blocks_venues_grid_locales_locale_parent_id_uniq\` ON \`_sections_v_blocks_venues_grid_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_sections_v_blocks_map\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`query\` text DEFAULT 'Nicco Park, Jheel Meel, Sector IV, Salt Lake, Kolkata',
  	\`show_routes\` integer DEFAULT true,
  	\`display_hidden\` integer,
  	\`display_show_on\` text DEFAULT 'all',
  	\`display_anchor\` text,
  	\`display_show_from\` text,
  	\`display_show_until\` text,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_sections_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_sections_v_blocks_map_order_idx\` ON \`_sections_v_blocks_map\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_sections_v_blocks_map_parent_id_idx\` ON \`_sections_v_blocks_map\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_sections_v_blocks_map_path_idx\` ON \`_sections_v_blocks_map\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_sections_v_blocks_map_locales\` (
  	\`heading\` text,
  	\`intro\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_sections_v_blocks_map\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_sections_v_blocks_map_locales_locale_parent_id_unique\` ON \`_sections_v_blocks_map_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_sections_v_blocks_stats_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_sections_v_blocks_stats\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_sections_v_blocks_stats_items_order_idx\` ON \`_sections_v_blocks_stats_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_sections_v_blocks_stats_items_parent_id_idx\` ON \`_sections_v_blocks_stats_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_sections_v_blocks_stats_items_locales\` (
  	\`value\` text,
  	\`label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_sections_v_blocks_stats_items\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_sections_v_blocks_stats_items_locales_locale_parent_id_uniq\` ON \`_sections_v_blocks_stats_items_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_sections_v_blocks_stats\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`tone\` text DEFAULT 'dry',
  	\`show_trust\` integer DEFAULT true,
  	\`display_hidden\` integer,
  	\`display_show_on\` text DEFAULT 'all',
  	\`display_anchor\` text,
  	\`display_show_from\` text,
  	\`display_show_until\` text,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_sections_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_sections_v_blocks_stats_order_idx\` ON \`_sections_v_blocks_stats\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_sections_v_blocks_stats_parent_id_idx\` ON \`_sections_v_blocks_stats\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_sections_v_blocks_stats_path_idx\` ON \`_sections_v_blocks_stats\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_sections_v_blocks_stats_locales\` (
  	\`heading\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_sections_v_blocks_stats\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_sections_v_blocks_stats_locales_locale_parent_id_unique\` ON \`_sections_v_blocks_stats_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_sections_v_blocks_image_text\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`image_id\` integer,
  	\`image_side\` text DEFAULT 'right',
  	\`tone\` text DEFAULT 'white',
  	\`cta_href\` text,
  	\`display_hidden\` integer,
  	\`display_show_on\` text DEFAULT 'all',
  	\`display_anchor\` text,
  	\`display_show_from\` text,
  	\`display_show_until\` text,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_sections_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_sections_v_blocks_image_text_order_idx\` ON \`_sections_v_blocks_image_text\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_sections_v_blocks_image_text_parent_id_idx\` ON \`_sections_v_blocks_image_text\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_sections_v_blocks_image_text_path_idx\` ON \`_sections_v_blocks_image_text\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`_sections_v_blocks_image_text_image_idx\` ON \`_sections_v_blocks_image_text\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`_sections_v_blocks_image_text_locales\` (
  	\`eyebrow\` text,
  	\`heading\` text,
  	\`body\` text,
  	\`cta_label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_sections_v_blocks_image_text\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_sections_v_blocks_image_text_locales_locale_parent_id_uniqu\` ON \`_sections_v_blocks_image_text_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_sections_v_blocks_columns_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`icon\` text,
  	\`image_id\` integer,
  	\`link_href\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_sections_v_blocks_columns\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_sections_v_blocks_columns_items_order_idx\` ON \`_sections_v_blocks_columns_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_sections_v_blocks_columns_items_parent_id_idx\` ON \`_sections_v_blocks_columns_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_sections_v_blocks_columns_items_image_idx\` ON \`_sections_v_blocks_columns_items\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`_sections_v_blocks_columns_items_locales\` (
  	\`title\` text,
  	\`text\` text,
  	\`link_label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_sections_v_blocks_columns_items\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_sections_v_blocks_columns_items_locales_locale_parent_id_un\` ON \`_sections_v_blocks_columns_items_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_sections_v_blocks_columns\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`tone\` text DEFAULT 'white',
  	\`per_row\` text DEFAULT '3',
  	\`display_hidden\` integer,
  	\`display_show_on\` text DEFAULT 'all',
  	\`display_anchor\` text,
  	\`display_show_from\` text,
  	\`display_show_until\` text,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_sections_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_sections_v_blocks_columns_order_idx\` ON \`_sections_v_blocks_columns\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_sections_v_blocks_columns_parent_id_idx\` ON \`_sections_v_blocks_columns\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_sections_v_blocks_columns_path_idx\` ON \`_sections_v_blocks_columns\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_sections_v_blocks_columns_locales\` (
  	\`eyebrow\` text,
  	\`heading\` text,
  	\`intro\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_sections_v_blocks_columns\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_sections_v_blocks_columns_locales_locale_parent_id_unique\` ON \`_sections_v_blocks_columns_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_sections_v_blocks_rich_text\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`tone\` text DEFAULT 'white',
  	\`width\` text DEFAULT 'narrow',
  	\`display_hidden\` integer,
  	\`display_show_on\` text DEFAULT 'all',
  	\`display_anchor\` text,
  	\`display_show_from\` text,
  	\`display_show_until\` text,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_sections_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_sections_v_blocks_rich_text_order_idx\` ON \`_sections_v_blocks_rich_text\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_sections_v_blocks_rich_text_parent_id_idx\` ON \`_sections_v_blocks_rich_text\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_sections_v_blocks_rich_text_path_idx\` ON \`_sections_v_blocks_rich_text\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_sections_v_blocks_rich_text_locales\` (
  	\`content\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_sections_v_blocks_rich_text\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_sections_v_blocks_rich_text_locales_locale_parent_id_unique\` ON \`_sections_v_blocks_rich_text_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_sections_v_blocks_video\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`source\` text DEFAULT 'upload',
  	\`file_id\` integer,
  	\`url\` text,
  	\`poster_id\` integer,
  	\`layout\` text DEFAULT 'framed',
  	\`autoplay\` integer,
  	\`tone\` text DEFAULT 'ink',
  	\`cta_href\` text,
  	\`display_hidden\` integer,
  	\`display_show_on\` text DEFAULT 'all',
  	\`display_anchor\` text,
  	\`display_show_from\` text,
  	\`display_show_until\` text,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`file_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`poster_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_sections_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_sections_v_blocks_video_order_idx\` ON \`_sections_v_blocks_video\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_sections_v_blocks_video_parent_id_idx\` ON \`_sections_v_blocks_video\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_sections_v_blocks_video_path_idx\` ON \`_sections_v_blocks_video\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`_sections_v_blocks_video_file_idx\` ON \`_sections_v_blocks_video\` (\`file_id\`);`)
  await db.run(sql`CREATE INDEX \`_sections_v_blocks_video_poster_idx\` ON \`_sections_v_blocks_video\` (\`poster_id\`);`)
  await db.run(sql`CREATE TABLE \`_sections_v_blocks_video_locales\` (
  	\`eyebrow\` text,
  	\`heading\` text,
  	\`body\` text,
  	\`cta_label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_sections_v_blocks_video\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_sections_v_blocks_video_locales_locale_parent_id_unique\` ON \`_sections_v_blocks_video_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_sections_v_blocks_gallery\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`display_hidden\` integer,
  	\`display_show_on\` text DEFAULT 'all',
  	\`display_anchor\` text,
  	\`display_show_from\` text,
  	\`display_show_until\` text,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_sections_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_sections_v_blocks_gallery_order_idx\` ON \`_sections_v_blocks_gallery\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_sections_v_blocks_gallery_parent_id_idx\` ON \`_sections_v_blocks_gallery\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_sections_v_blocks_gallery_path_idx\` ON \`_sections_v_blocks_gallery\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_sections_v_blocks_gallery_locales\` (
  	\`heading\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_sections_v_blocks_gallery\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_sections_v_blocks_gallery_locales_locale_parent_id_unique\` ON \`_sections_v_blocks_gallery_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_sections_v_blocks_testimonials_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text,
  	\`source\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_sections_v_blocks_testimonials\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_sections_v_blocks_testimonials_items_order_idx\` ON \`_sections_v_blocks_testimonials_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_sections_v_blocks_testimonials_items_parent_id_idx\` ON \`_sections_v_blocks_testimonials_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_sections_v_blocks_testimonials_items_locales\` (
  	\`quote\` text,
  	\`detail\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_sections_v_blocks_testimonials_items\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_sections_v_blocks_testimonials_items_locales_locale_parent_\` ON \`_sections_v_blocks_testimonials_items_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_sections_v_blocks_testimonials\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`tone\` text DEFAULT 'cream',
  	\`display_hidden\` integer,
  	\`display_show_on\` text DEFAULT 'all',
  	\`display_anchor\` text,
  	\`display_show_from\` text,
  	\`display_show_until\` text,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_sections_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_sections_v_blocks_testimonials_order_idx\` ON \`_sections_v_blocks_testimonials\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_sections_v_blocks_testimonials_parent_id_idx\` ON \`_sections_v_blocks_testimonials\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_sections_v_blocks_testimonials_path_idx\` ON \`_sections_v_blocks_testimonials\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_sections_v_blocks_testimonials_locales\` (
  	\`heading\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_sections_v_blocks_testimonials\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_sections_v_blocks_testimonials_locales_locale_parent_id_uni\` ON \`_sections_v_blocks_testimonials_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_sections_v_blocks_logo_strip_logos\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text,
  	\`href\` text,
  	\`image_id\` integer,
  	\`_uuid\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_sections_v_blocks_logo_strip\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_sections_v_blocks_logo_strip_logos_order_idx\` ON \`_sections_v_blocks_logo_strip_logos\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_sections_v_blocks_logo_strip_logos_parent_id_idx\` ON \`_sections_v_blocks_logo_strip_logos\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_sections_v_blocks_logo_strip_logos_image_idx\` ON \`_sections_v_blocks_logo_strip_logos\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`_sections_v_blocks_logo_strip\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`display_hidden\` integer,
  	\`display_show_on\` text DEFAULT 'all',
  	\`display_anchor\` text,
  	\`display_show_from\` text,
  	\`display_show_until\` text,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_sections_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_sections_v_blocks_logo_strip_order_idx\` ON \`_sections_v_blocks_logo_strip\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_sections_v_blocks_logo_strip_parent_id_idx\` ON \`_sections_v_blocks_logo_strip\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_sections_v_blocks_logo_strip_path_idx\` ON \`_sections_v_blocks_logo_strip\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_sections_v_blocks_logo_strip_locales\` (
  	\`heading\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_sections_v_blocks_logo_strip\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_sections_v_blocks_logo_strip_locales_locale_parent_id_uniqu\` ON \`_sections_v_blocks_logo_strip_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_sections_v_blocks_faq_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_sections_v_blocks_faq\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_sections_v_blocks_faq_items_order_idx\` ON \`_sections_v_blocks_faq_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_sections_v_blocks_faq_items_parent_id_idx\` ON \`_sections_v_blocks_faq_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_sections_v_blocks_faq_items_locales\` (
  	\`q\` text,
  	\`a\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_sections_v_blocks_faq_items\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_sections_v_blocks_faq_items_locales_locale_parent_id_unique\` ON \`_sections_v_blocks_faq_items_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_sections_v_blocks_faq\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`display_hidden\` integer,
  	\`display_show_on\` text DEFAULT 'all',
  	\`display_anchor\` text,
  	\`display_show_from\` text,
  	\`display_show_until\` text,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_sections_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_sections_v_blocks_faq_order_idx\` ON \`_sections_v_blocks_faq\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_sections_v_blocks_faq_parent_id_idx\` ON \`_sections_v_blocks_faq\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_sections_v_blocks_faq_path_idx\` ON \`_sections_v_blocks_faq\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_sections_v_blocks_faq_locales\` (
  	\`heading\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_sections_v_blocks_faq\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_sections_v_blocks_faq_locales_locale_parent_id_unique\` ON \`_sections_v_blocks_faq_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_sections_v_blocks_lead_form\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`form_type\` text DEFAULT 'offers',
  	\`tone\` text DEFAULT 'yellow',
  	\`display_hidden\` integer,
  	\`display_show_on\` text DEFAULT 'all',
  	\`display_anchor\` text,
  	\`display_show_from\` text,
  	\`display_show_until\` text,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_sections_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_sections_v_blocks_lead_form_order_idx\` ON \`_sections_v_blocks_lead_form\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_sections_v_blocks_lead_form_parent_id_idx\` ON \`_sections_v_blocks_lead_form\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_sections_v_blocks_lead_form_path_idx\` ON \`_sections_v_blocks_lead_form\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_sections_v_blocks_lead_form_locales\` (
  	\`heading\` text,
  	\`body\` text,
  	\`button_label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_sections_v_blocks_lead_form\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_sections_v_blocks_lead_form_locales_locale_parent_id_unique\` ON \`_sections_v_blocks_lead_form_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_sections_v_blocks_moments_wall\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`count\` numeric DEFAULT 8,
  	\`display_hidden\` integer,
  	\`display_show_on\` text DEFAULT 'all',
  	\`display_anchor\` text,
  	\`display_show_from\` text,
  	\`display_show_until\` text,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_sections_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_sections_v_blocks_moments_wall_order_idx\` ON \`_sections_v_blocks_moments_wall\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_sections_v_blocks_moments_wall_parent_id_idx\` ON \`_sections_v_blocks_moments_wall\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_sections_v_blocks_moments_wall_path_idx\` ON \`_sections_v_blocks_moments_wall\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_sections_v_blocks_moments_wall_locales\` (
  	\`heading\` text,
  	\`intro\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_sections_v_blocks_moments_wall\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_sections_v_blocks_moments_wall_locales_locale_parent_id_uni\` ON \`_sections_v_blocks_moments_wall_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_sections_v_blocks_journal_teaser\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`tone\` text DEFAULT 'cream',
  	\`count\` numeric DEFAULT 3,
  	\`display_hidden\` integer,
  	\`display_show_on\` text DEFAULT 'all',
  	\`display_anchor\` text,
  	\`display_show_from\` text,
  	\`display_show_until\` text,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_sections_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_sections_v_blocks_journal_teaser_order_idx\` ON \`_sections_v_blocks_journal_teaser\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_sections_v_blocks_journal_teaser_parent_id_idx\` ON \`_sections_v_blocks_journal_teaser\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_sections_v_blocks_journal_teaser_path_idx\` ON \`_sections_v_blocks_journal_teaser\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_sections_v_blocks_journal_teaser_locales\` (
  	\`eyebrow\` text,
  	\`heading\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_sections_v_blocks_journal_teaser\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_sections_v_blocks_journal_teaser_locales_locale_parent_id_u\` ON \`_sections_v_blocks_journal_teaser_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_sections_v_blocks_embed\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`code\` text,
  	\`height\` numeric DEFAULT 480,
  	\`display_hidden\` integer,
  	\`display_show_on\` text DEFAULT 'all',
  	\`display_anchor\` text,
  	\`display_show_from\` text,
  	\`display_show_until\` text,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_sections_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_sections_v_blocks_embed_order_idx\` ON \`_sections_v_blocks_embed\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_sections_v_blocks_embed_parent_id_idx\` ON \`_sections_v_blocks_embed\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_sections_v_blocks_embed_path_idx\` ON \`_sections_v_blocks_embed\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_sections_v_blocks_embed_locales\` (
  	\`heading\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_sections_v_blocks_embed\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_sections_v_blocks_embed_locales_locale_parent_id_unique\` ON \`_sections_v_blocks_embed_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_sections_v_blocks_spacer\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`size\` text DEFAULT 'm',
  	\`divider\` integer,
  	\`display_hidden\` integer,
  	\`display_show_on\` text DEFAULT 'all',
  	\`display_anchor\` text,
  	\`display_show_from\` text,
  	\`display_show_until\` text,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_sections_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_sections_v_blocks_spacer_order_idx\` ON \`_sections_v_blocks_spacer\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_sections_v_blocks_spacer_parent_id_idx\` ON \`_sections_v_blocks_spacer\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_sections_v_blocks_spacer_path_idx\` ON \`_sections_v_blocks_spacer\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_sections_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`parent_id\` integer,
  	\`version_name\` text,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`version__status\` text DEFAULT 'draft',
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`snapshot\` integer,
  	\`published_locale\` text,
  	\`latest\` integer,
  	\`autosave\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`sections\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`_sections_v_parent_idx\` ON \`_sections_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_sections_v_version_version_updated_at_idx\` ON \`_sections_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_sections_v_version_version_created_at_idx\` ON \`_sections_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_sections_v_version_version__status_idx\` ON \`_sections_v\` (\`version__status\`);`)
  await db.run(sql`CREATE INDEX \`_sections_v_created_at_idx\` ON \`_sections_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_sections_v_updated_at_idx\` ON \`_sections_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_sections_v_snapshot_idx\` ON \`_sections_v\` (\`snapshot\`);`)
  await db.run(sql`CREATE INDEX \`_sections_v_published_locale_idx\` ON \`_sections_v\` (\`published_locale\`);`)
  await db.run(sql`CREATE INDEX \`_sections_v_latest_idx\` ON \`_sections_v\` (\`latest\`);`)
  await db.run(sql`CREATE INDEX \`_sections_v_autosave_idx\` ON \`_sections_v\` (\`autosave\`);`)
  await db.run(sql`CREATE TABLE \`_sections_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`media_id\` integer,
  	\`tickets_id\` integer,
  	\`offers_id\` integer,
  	\`events_id\` integer,
  	\`crews_id\` integer,
  	\`faqs_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_sections_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`tickets_id\`) REFERENCES \`tickets\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`offers_id\`) REFERENCES \`offers\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`events_id\`) REFERENCES \`events\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`crews_id\`) REFERENCES \`crews\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`faqs_id\`) REFERENCES \`faqs\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_sections_v_rels_order_idx\` ON \`_sections_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_sections_v_rels_parent_idx\` ON \`_sections_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_sections_v_rels_path_idx\` ON \`_sections_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_sections_v_rels_media_id_idx\` ON \`_sections_v_rels\` (\`media_id\`);`)
  await db.run(sql`CREATE INDEX \`_sections_v_rels_tickets_id_idx\` ON \`_sections_v_rels\` (\`tickets_id\`);`)
  await db.run(sql`CREATE INDEX \`_sections_v_rels_offers_id_idx\` ON \`_sections_v_rels\` (\`offers_id\`);`)
  await db.run(sql`CREATE INDEX \`_sections_v_rels_events_id_idx\` ON \`_sections_v_rels\` (\`events_id\`);`)
  await db.run(sql`CREATE INDEX \`_sections_v_rels_crews_id_idx\` ON \`_sections_v_rels\` (\`crews_id\`);`)
  await db.run(sql`CREATE INDEX \`_sections_v_rels_faqs_id_idx\` ON \`_sections_v_rels\` (\`faqs_id\`);`)
  await db.run(sql`CREATE TABLE \`redirects\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`from\` text NOT NULL,
  	\`to\` text NOT NULL,
  	\`type\` text DEFAULT '301',
  	\`note\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`redirects_from_idx\` ON \`redirects\` (\`from\`);`)
  await db.run(sql`CREATE INDEX \`redirects_updated_at_idx\` ON \`redirects\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`redirects_created_at_idx\` ON \`redirects\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`webhooks_events\` (
  	\`order\` integer NOT NULL,
  	\`parent_id\` integer NOT NULL,
  	\`value\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`webhooks\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`webhooks_events_order_idx\` ON \`webhooks_events\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`webhooks_events_parent_idx\` ON \`webhooks_events\` (\`parent_id\`);`)
  await db.run(sql`CREATE TABLE \`webhooks\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`url\` text NOT NULL,
  	\`secret\` text,
  	\`active\` integer DEFAULT true,
  	\`last_status\` text,
  	\`last_called_at\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`webhooks_updated_at_idx\` ON \`webhooks\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`webhooks_created_at_idx\` ON \`webhooks\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`roles\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`description\` text,
  	\`permissions_pages\` text DEFAULT 'none',
  	\`permissions_campaigns\` text DEFAULT 'none',
  	\`permissions_journal\` text DEFAULT 'none',
  	\`permissions_park\` text DEFAULT 'none',
  	\`permissions_moments\` text DEFAULT 'none',
  	\`permissions_products\` text DEFAULT 'none',
  	\`permissions_media\` text DEFAULT 'none',
  	\`permissions_design\` text DEFAULT 'none',
  	\`permissions_settings\` text DEFAULT 'none',
  	\`permissions_text\` text DEFAULT 'none',
  	\`permissions_marketing\` text DEFAULT 'none',
  	\`permissions_leads\` text DEFAULT 'none',
  	\`permissions_ops\` text DEFAULT 'none',
  	\`permissions_integrations\` text DEFAULT 'none',
  	\`permissions_users\` text DEFAULT 'none',
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`roles_updated_at_idx\` ON \`roles\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`roles_created_at_idx\` ON \`roles\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`payload_folders_folder_type\` (
  	\`order\` integer NOT NULL,
  	\`parent_id\` integer NOT NULL,
  	\`value\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`payload_folders\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_folders_folder_type_order_idx\` ON \`payload_folders_folder_type\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`payload_folders_folder_type_parent_idx\` ON \`payload_folders_folder_type\` (\`parent_id\`);`)
  await db.run(sql`CREATE TABLE \`payload_folders\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`folder_id\` integer,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`folder_id\`) REFERENCES \`payload_folders\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_folders_name_idx\` ON \`payload_folders\` (\`name\`);`)
  await db.run(sql`CREATE INDEX \`payload_folders_folder_idx\` ON \`payload_folders\` (\`folder_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_folders_updated_at_idx\` ON \`payload_folders\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`payload_folders_created_at_idx\` ON \`payload_folders\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`site_settings_same_as\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`url\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`site_settings\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`site_settings_same_as_order_idx\` ON \`site_settings_same_as\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`site_settings_same_as_parent_id_idx\` ON \`site_settings_same_as\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`theme\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`logo_id\` integer,
  	\`logo_footer_id\` integer,
  	\`favicon_id\` integer,
  	\`logo_height\` numeric DEFAULT 56,
  	\`yellow\` text DEFAULT '#FFD400',
  	\`ink\` text DEFAULT '#101418',
  	\`coral\` text DEFAULT '#D93A26',
  	\`dry\` text DEFAULT '#0E7C3A',
  	\`wet\` text DEFAULT '#0067C5',
  	\`bowl\` text DEFAULT '#6D28D9',
  	\`cream\` text DEFAULT '#FFF8E6',
  	\`snow\` text DEFAULT '#2F5DCC',
  	\`sea\` text DEFAULT '#007EA0',
  	\`display_font\` text DEFAULT 'bricolage',
  	\`body_font\` text DEFAULT 'instrument',
  	\`display_font_file_id\` integer,
  	\`body_font_file_id\` integer,
  	\`heading_scale\` numeric DEFAULT 100,
  	\`custom_css\` text,
  	\`_status\` text DEFAULT 'draft',
  	\`updated_at\` text,
  	\`created_at\` text,
  	FOREIGN KEY (\`logo_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`logo_footer_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`favicon_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`display_font_file_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`body_font_file_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`theme_logo_idx\` ON \`theme\` (\`logo_id\`);`)
  await db.run(sql`CREATE INDEX \`theme_logo_footer_idx\` ON \`theme\` (\`logo_footer_id\`);`)
  await db.run(sql`CREATE INDEX \`theme_favicon_idx\` ON \`theme\` (\`favicon_id\`);`)
  await db.run(sql`CREATE INDEX \`theme_display_font_file_idx\` ON \`theme\` (\`display_font_file_id\`);`)
  await db.run(sql`CREATE INDEX \`theme_body_font_file_idx\` ON \`theme\` (\`body_font_file_id\`);`)
  await db.run(sql`CREATE INDEX \`theme__status_idx\` ON \`theme\` (\`_status\`);`)
  await db.run(sql`CREATE TABLE \`_theme_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`version_logo_id\` integer,
  	\`version_logo_footer_id\` integer,
  	\`version_favicon_id\` integer,
  	\`version_logo_height\` numeric DEFAULT 56,
  	\`version_yellow\` text DEFAULT '#FFD400',
  	\`version_ink\` text DEFAULT '#101418',
  	\`version_coral\` text DEFAULT '#D93A26',
  	\`version_dry\` text DEFAULT '#0E7C3A',
  	\`version_wet\` text DEFAULT '#0067C5',
  	\`version_bowl\` text DEFAULT '#6D28D9',
  	\`version_cream\` text DEFAULT '#FFF8E6',
  	\`version_snow\` text DEFAULT '#2F5DCC',
  	\`version_sea\` text DEFAULT '#007EA0',
  	\`version_display_font\` text DEFAULT 'bricolage',
  	\`version_body_font\` text DEFAULT 'instrument',
  	\`version_display_font_file_id\` integer,
  	\`version_body_font_file_id\` integer,
  	\`version_heading_scale\` numeric DEFAULT 100,
  	\`version_custom_css\` text,
  	\`version__status\` text DEFAULT 'draft',
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`snapshot\` integer,
  	\`published_locale\` text,
  	\`latest\` integer,
  	FOREIGN KEY (\`version_logo_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_logo_footer_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_favicon_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_display_font_file_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_body_font_file_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`_theme_v_version_version_logo_idx\` ON \`_theme_v\` (\`version_logo_id\`);`)
  await db.run(sql`CREATE INDEX \`_theme_v_version_version_logo_footer_idx\` ON \`_theme_v\` (\`version_logo_footer_id\`);`)
  await db.run(sql`CREATE INDEX \`_theme_v_version_version_favicon_idx\` ON \`_theme_v\` (\`version_favicon_id\`);`)
  await db.run(sql`CREATE INDEX \`_theme_v_version_version_display_font_file_idx\` ON \`_theme_v\` (\`version_display_font_file_id\`);`)
  await db.run(sql`CREATE INDEX \`_theme_v_version_version_body_font_file_idx\` ON \`_theme_v\` (\`version_body_font_file_id\`);`)
  await db.run(sql`CREATE INDEX \`_theme_v_version_version__status_idx\` ON \`_theme_v\` (\`version__status\`);`)
  await db.run(sql`CREATE INDEX \`_theme_v_created_at_idx\` ON \`_theme_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_theme_v_updated_at_idx\` ON \`_theme_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_theme_v_snapshot_idx\` ON \`_theme_v\` (\`snapshot\`);`)
  await db.run(sql`CREATE INDEX \`_theme_v_published_locale_idx\` ON \`_theme_v\` (\`published_locale\`);`)
  await db.run(sql`CREATE INDEX \`_theme_v_latest_idx\` ON \`_theme_v\` (\`latest\`);`)
  await db.run(sql`CREATE TABLE \`header_announcements\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`href\` text,
  	\`tone\` text DEFAULT 'yellow',
  	\`show_from\` text,
  	\`show_until\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`header\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`header_announcements_order_idx\` ON \`header_announcements\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`header_announcements_parent_id_idx\` ON \`header_announcements\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`header_announcements_locales\` (
  	\`text\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`header_announcements\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`header_announcements_locales_locale_parent_id_unique\` ON \`header_announcements_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_header_v_version_nav\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`href\` text,
  	\`wide_only\` integer,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_header_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_header_v_version_nav_order_idx\` ON \`_header_v_version_nav\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_header_v_version_nav_parent_id_idx\` ON \`_header_v_version_nav\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_header_v_version_nav_locales\` (
  	\`label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_header_v_version_nav\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_header_v_version_nav_locales_locale_parent_id_unique\` ON \`_header_v_version_nav_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_header_v_version_more_sheet\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`href\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_header_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_header_v_version_more_sheet_order_idx\` ON \`_header_v_version_more_sheet\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_header_v_version_more_sheet_parent_id_idx\` ON \`_header_v_version_more_sheet\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_header_v_version_more_sheet_locales\` (
  	\`label\` text,
  	\`badge\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_header_v_version_more_sheet\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_header_v_version_more_sheet_locales_locale_parent_id_unique\` ON \`_header_v_version_more_sheet_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_header_v_version_announcements\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`href\` text,
  	\`tone\` text DEFAULT 'yellow',
  	\`show_from\` text,
  	\`show_until\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_header_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_header_v_version_announcements_order_idx\` ON \`_header_v_version_announcements\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_header_v_version_announcements_parent_id_idx\` ON \`_header_v_version_announcements\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_header_v_version_announcements_locales\` (
  	\`text\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_header_v_version_announcements\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_header_v_version_announcements_locales_locale_parent_id_uni\` ON \`_header_v_version_announcements_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_header_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`version_buy_href\` text,
  	\`version__status\` text DEFAULT 'draft',
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`snapshot\` integer,
  	\`published_locale\` text,
  	\`latest\` integer
  );
  `)
  await db.run(sql`CREATE INDEX \`_header_v_version_version__status_idx\` ON \`_header_v\` (\`version__status\`);`)
  await db.run(sql`CREATE INDEX \`_header_v_created_at_idx\` ON \`_header_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_header_v_updated_at_idx\` ON \`_header_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_header_v_snapshot_idx\` ON \`_header_v\` (\`snapshot\`);`)
  await db.run(sql`CREATE INDEX \`_header_v_published_locale_idx\` ON \`_header_v\` (\`published_locale\`);`)
  await db.run(sql`CREATE INDEX \`_header_v_latest_idx\` ON \`_header_v\` (\`latest\`);`)
  await db.run(sql`CREATE TABLE \`_header_v_locales\` (
  	\`version_buy_label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_header_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_header_v_locales_locale_parent_id_unique\` ON \`_header_v_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_footer_v_version_columns_links\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`href\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_footer_v_version_columns\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_footer_v_version_columns_links_order_idx\` ON \`_footer_v_version_columns_links\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_footer_v_version_columns_links_parent_id_idx\` ON \`_footer_v_version_columns_links\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_footer_v_version_columns_links_locales\` (
  	\`label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_footer_v_version_columns_links\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_footer_v_version_columns_links_locales_locale_parent_id_uni\` ON \`_footer_v_version_columns_links_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_footer_v_version_columns\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_footer_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_footer_v_version_columns_order_idx\` ON \`_footer_v_version_columns\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_footer_v_version_columns_parent_id_idx\` ON \`_footer_v_version_columns\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_footer_v_version_columns_locales\` (
  	\`heading\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_footer_v_version_columns\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_footer_v_version_columns_locales_locale_parent_id_unique\` ON \`_footer_v_version_columns_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_footer_v_version_legal\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`href\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_footer_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_footer_v_version_legal_order_idx\` ON \`_footer_v_version_legal\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_footer_v_version_legal_parent_id_idx\` ON \`_footer_v_version_legal\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_footer_v_version_legal_locales\` (
  	\`label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_footer_v_version_legal\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_footer_v_version_legal_locales_locale_parent_id_unique\` ON \`_footer_v_version_legal_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_footer_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`version__status\` text DEFAULT 'draft',
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`snapshot\` integer,
  	\`published_locale\` text,
  	\`latest\` integer
  );
  `)
  await db.run(sql`CREATE INDEX \`_footer_v_version_version__status_idx\` ON \`_footer_v\` (\`version__status\`);`)
  await db.run(sql`CREATE INDEX \`_footer_v_created_at_idx\` ON \`_footer_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_footer_v_updated_at_idx\` ON \`_footer_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_footer_v_snapshot_idx\` ON \`_footer_v\` (\`snapshot\`);`)
  await db.run(sql`CREATE INDEX \`_footer_v_published_locale_idx\` ON \`_footer_v\` (\`published_locale\`);`)
  await db.run(sql`CREATE INDEX \`_footer_v_latest_idx\` ON \`_footer_v\` (\`latest\`);`)
  await db.run(sql`CREATE TABLE \`_footer_v_locales\` (
  	\`version_signup_heading\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_footer_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_footer_v_locales_locale_parent_id_unique\` ON \`_footer_v_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`tracking\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`gtm_id\` text,
  	\`ga4_id\` text,
  	\`meta_pixel_id\` text,
  	\`ads_id\` text,
  	\`ads_purchase_label\` text,
  	\`ads_lead_label\` text,
  	\`server_side\` integer,
  	\`consent_banner\` integer DEFAULT true,
  	\`consent_mode\` text DEFAULT 'basic',
  	\`privacy_url\` text DEFAULT '/privacy',
  	\`ai_crawlers\` text DEFAULT 'all',
  	\`llms_notes\` text,
  	\`google_verification\` text,
  	\`bing_verification\` text,
  	\`meta_verification\` text,
  	\`updated_at\` text,
  	\`created_at\` text
  );
  `)
  await db.run(sql`CREATE TABLE \`integrations\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`ticketing_mode\` text DEFAULT 'demo',
  	\`booking_url\` text DEFAULT 'https://bookings.niccoparks.com',
  	\`booking_window_days\` numeric DEFAULT 90,
  	\`same_day_cutoff\` text DEFAULT '23:59',
  	\`max_per_order\` numeric DEFAULT 20,
  	\`semnox_site_id\` text,
  	\`semnox_channel\` text,
  	\`semnox_environment\` text DEFAULT 'test',
  	\`semnox_notes\` text,
  	\`updated_at\` text,
  	\`created_at\` text
  );
  `)
  await db.run(sql`CREATE TABLE \`email_routes\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`type\` text NOT NULL,
  	\`to\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`email\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`email_routes_order_idx\` ON \`email_routes\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`email_routes_parent_id_idx\` ON \`email_routes\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`email\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`from_name\` text DEFAULT 'Nicco Park',
  	\`from_address\` text DEFAULT 'no-reply@niccoparks.com',
  	\`reply_to\` text,
  	\`daily_digest\` integer DEFAULT true,
  	\`updated_at\` text,
  	\`created_at\` text
  );
  `)
  await db.run(sql`CREATE TABLE \`assistant_suggestions\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`assistant\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`assistant_suggestions_order_idx\` ON \`assistant_suggestions\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`assistant_suggestions_parent_id_idx\` ON \`assistant_suggestions\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`assistant_suggestions_locales\` (
  	\`text\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`assistant_suggestions\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`assistant_suggestions_locales_locale_parent_id_unique\` ON \`assistant_suggestions_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`assistant\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`enabled\` integer DEFAULT true,
  	\`provider\` text DEFAULT 'faq',
  	\`instructions\` text,
  	\`embed_code\` text,
  	\`updated_at\` text,
  	\`created_at\` text
  );
  `)
  await db.run(sql`CREATE TABLE \`assistant_locales\` (
  	\`name\` text DEFAULT 'Nicco Park helper',
  	\`greeting\` text DEFAULT 'Hi! Ask me about tickets, timings, rides or offers.',
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`assistant\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`assistant_locales_locale_parent_id_unique\` ON \`assistant_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`PRAGMA foreign_keys=OFF;`)
  await db.run(sql`CREATE TABLE \`__new_media_locales\` (
  	\`alt\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_media_locales\`("alt", "id", "_locale", "_parent_id") SELECT "alt", "id", "_locale", "_parent_id" FROM \`media_locales\`;`)
  await db.run(sql`DROP TABLE \`media_locales\`;`)
  await db.run(sql`ALTER TABLE \`__new_media_locales\` RENAME TO \`media_locales\`;`)
  await db.run(sql`PRAGMA foreign_keys=ON;`)
  await db.run(sql`CREATE UNIQUE INDEX \`media_locales_locale_parent_id_unique\` ON \`media_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`__new_header_nav\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`href\` text,
  	\`wide_only\` integer,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`header\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_header_nav\`("_order", "_parent_id", "id", "href", "wide_only") SELECT "_order", "_parent_id", "id", "href", "wide_only" FROM \`header_nav\`;`)
  await db.run(sql`DROP TABLE \`header_nav\`;`)
  await db.run(sql`ALTER TABLE \`__new_header_nav\` RENAME TO \`header_nav\`;`)
  await db.run(sql`CREATE INDEX \`header_nav_order_idx\` ON \`header_nav\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`header_nav_parent_id_idx\` ON \`header_nav\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`__new_header_nav_locales\` (
  	\`label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`header_nav\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_header_nav_locales\`("label", "id", "_locale", "_parent_id") SELECT "label", "id", "_locale", "_parent_id" FROM \`header_nav_locales\`;`)
  await db.run(sql`DROP TABLE \`header_nav_locales\`;`)
  await db.run(sql`ALTER TABLE \`__new_header_nav_locales\` RENAME TO \`header_nav_locales\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`header_nav_locales_locale_parent_id_unique\` ON \`header_nav_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`__new_header_more_sheet\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`href\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`header\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_header_more_sheet\`("_order", "_parent_id", "id", "href") SELECT "_order", "_parent_id", "id", "href" FROM \`header_more_sheet\`;`)
  await db.run(sql`DROP TABLE \`header_more_sheet\`;`)
  await db.run(sql`ALTER TABLE \`__new_header_more_sheet\` RENAME TO \`header_more_sheet\`;`)
  await db.run(sql`CREATE INDEX \`header_more_sheet_order_idx\` ON \`header_more_sheet\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`header_more_sheet_parent_id_idx\` ON \`header_more_sheet\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`__new_header_more_sheet_locales\` (
  	\`label\` text,
  	\`badge\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`header_more_sheet\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_header_more_sheet_locales\`("label", "badge", "id", "_locale", "_parent_id") SELECT "label", "badge", "id", "_locale", "_parent_id" FROM \`header_more_sheet_locales\`;`)
  await db.run(sql`DROP TABLE \`header_more_sheet_locales\`;`)
  await db.run(sql`ALTER TABLE \`__new_header_more_sheet_locales\` RENAME TO \`header_more_sheet_locales\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`header_more_sheet_locales_locale_parent_id_unique\` ON \`header_more_sheet_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`__new_header\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`buy_href\` text,
  	\`_status\` text DEFAULT 'draft',
  	\`updated_at\` text,
  	\`created_at\` text
  );
  `)
  await db.run(sql`INSERT INTO \`__new_header\`("id", "buy_href", "updated_at", "created_at") SELECT "id", "buy_href", "updated_at", "created_at" FROM \`header\`;`)
  await db.run(sql`DROP TABLE \`header\`;`)
  await db.run(sql`ALTER TABLE \`__new_header\` RENAME TO \`header\`;`)
  await db.run(sql`CREATE INDEX \`header__status_idx\` ON \`header\` (\`_status\`);`)
  await db.run(sql`CREATE TABLE \`__new_header_locales\` (
  	\`buy_label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`header\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_header_locales\`("buy_label", "id", "_locale", "_parent_id") SELECT "buy_label", "id", "_locale", "_parent_id" FROM \`header_locales\`;`)
  await db.run(sql`DROP TABLE \`header_locales\`;`)
  await db.run(sql`ALTER TABLE \`__new_header_locales\` RENAME TO \`header_locales\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`header_locales_locale_parent_id_unique\` ON \`header_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`ALTER TABLE \`pages_blocks_hero\` ADD \`display_hidden\` integer;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_hero\` ADD \`display_show_on\` text DEFAULT 'all';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_hero\` ADD \`display_anchor\` text;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_hero\` ADD \`display_show_from\` text;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_hero\` ADD \`display_show_until\` text;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_ticker\` ADD \`display_hidden\` integer;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_ticker\` ADD \`display_show_on\` text DEFAULT 'all';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_ticker\` ADD \`display_anchor\` text;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_ticker\` ADD \`display_show_from\` text;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_ticker\` ADD \`display_show_until\` text;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_ticket_cards\` ADD \`display_hidden\` integer;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_ticket_cards\` ADD \`display_show_on\` text DEFAULT 'all';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_ticket_cards\` ADD \`display_anchor\` text;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_ticket_cards\` ADD \`display_show_from\` text;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_ticket_cards\` ADD \`display_show_until\` text;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_events_rail\` ADD \`display_hidden\` integer;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_events_rail\` ADD \`display_show_on\` text DEFAULT 'all';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_events_rail\` ADD \`display_anchor\` text;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_events_rail\` ADD \`display_show_from\` text;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_events_rail\` ADD \`display_show_until\` text;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_offer_grid\` ADD \`display_hidden\` integer;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_offer_grid\` ADD \`display_show_on\` text DEFAULT 'all';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_offer_grid\` ADD \`display_anchor\` text;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_offer_grid\` ADD \`display_show_from\` text;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_offer_grid\` ADD \`display_show_until\` text;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_worlds_grid\` ADD \`display_hidden\` integer;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_worlds_grid\` ADD \`display_show_on\` text DEFAULT 'all';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_worlds_grid\` ADD \`display_anchor\` text;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_worlds_grid\` ADD \`display_show_from\` text;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_worlds_grid\` ADD \`display_show_until\` text;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_stats\` ADD \`display_hidden\` integer;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_stats\` ADD \`display_show_on\` text DEFAULT 'all';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_stats\` ADD \`display_anchor\` text;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_stats\` ADD \`display_show_from\` text;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_stats\` ADD \`display_show_until\` text;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_crew_planner\` ADD \`display_hidden\` integer;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_crew_planner\` ADD \`display_show_on\` text DEFAULT 'all';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_crew_planner\` ADD \`display_anchor\` text;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_crew_planner\` ADD \`display_show_from\` text;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_crew_planner\` ADD \`display_show_until\` text;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_moments_wall\` ADD \`display_hidden\` integer;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_moments_wall\` ADD \`display_show_on\` text DEFAULT 'all';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_moments_wall\` ADD \`display_anchor\` text;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_moments_wall\` ADD \`display_show_from\` text;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_moments_wall\` ADD \`display_show_until\` text;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_journal_teaser\` ADD \`display_hidden\` integer;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_journal_teaser\` ADD \`display_show_on\` text DEFAULT 'all';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_journal_teaser\` ADD \`display_anchor\` text;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_journal_teaser\` ADD \`display_show_from\` text;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_journal_teaser\` ADD \`display_show_until\` text;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_today_status\` ADD \`display_hidden\` integer;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_today_status\` ADD \`display_show_on\` text DEFAULT 'all';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_today_status\` ADD \`display_anchor\` text;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_today_status\` ADD \`display_show_from\` text;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_today_status\` ADD \`display_show_until\` text;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_countdown\` ADD \`display_hidden\` integer;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_countdown\` ADD \`display_show_on\` text DEFAULT 'all';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_countdown\` ADD \`display_anchor\` text;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_countdown\` ADD \`display_show_from\` text;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_countdown\` ADD \`display_show_until\` text;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_image_text\` ADD \`display_hidden\` integer;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_image_text\` ADD \`display_show_on\` text DEFAULT 'all';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_image_text\` ADD \`display_anchor\` text;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_image_text\` ADD \`display_show_from\` text;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_image_text\` ADD \`display_show_until\` text;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_rich_text\` ADD \`display_hidden\` integer;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_rich_text\` ADD \`display_show_on\` text DEFAULT 'all';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_rich_text\` ADD \`display_anchor\` text;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_rich_text\` ADD \`display_show_from\` text;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_rich_text\` ADD \`display_show_until\` text;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_gallery\` ADD \`display_hidden\` integer;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_gallery\` ADD \`display_show_on\` text DEFAULT 'all';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_gallery\` ADD \`display_anchor\` text;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_gallery\` ADD \`display_show_from\` text;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_gallery\` ADD \`display_show_until\` text;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_faq\` ADD \`display_hidden\` integer;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_faq\` ADD \`display_show_on\` text DEFAULT 'all';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_faq\` ADD \`display_anchor\` text;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_faq\` ADD \`display_show_from\` text;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_faq\` ADD \`display_show_until\` text;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_lead_form\` ADD \`display_hidden\` integer;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_lead_form\` ADD \`display_show_on\` text DEFAULT 'all';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_lead_form\` ADD \`display_anchor\` text;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_lead_form\` ADD \`display_show_from\` text;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_lead_form\` ADD \`display_show_until\` text;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_cta_band\` ADD \`display_hidden\` integer;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_cta_band\` ADD \`display_show_on\` text DEFAULT 'all';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_cta_band\` ADD \`display_anchor\` text;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_cta_band\` ADD \`display_show_from\` text;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_cta_band\` ADD \`display_show_until\` text;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_hero\` ADD \`display_hidden\` integer;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_hero\` ADD \`display_show_on\` text DEFAULT 'all';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_hero\` ADD \`display_anchor\` text;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_hero\` ADD \`display_show_from\` text;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_hero\` ADD \`display_show_until\` text;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_ticker\` ADD \`display_hidden\` integer;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_ticker\` ADD \`display_show_on\` text DEFAULT 'all';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_ticker\` ADD \`display_anchor\` text;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_ticker\` ADD \`display_show_from\` text;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_ticker\` ADD \`display_show_until\` text;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_ticket_cards\` ADD \`display_hidden\` integer;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_ticket_cards\` ADD \`display_show_on\` text DEFAULT 'all';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_ticket_cards\` ADD \`display_anchor\` text;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_ticket_cards\` ADD \`display_show_from\` text;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_ticket_cards\` ADD \`display_show_until\` text;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_events_rail\` ADD \`display_hidden\` integer;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_events_rail\` ADD \`display_show_on\` text DEFAULT 'all';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_events_rail\` ADD \`display_anchor\` text;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_events_rail\` ADD \`display_show_from\` text;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_events_rail\` ADD \`display_show_until\` text;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_offer_grid\` ADD \`display_hidden\` integer;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_offer_grid\` ADD \`display_show_on\` text DEFAULT 'all';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_offer_grid\` ADD \`display_anchor\` text;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_offer_grid\` ADD \`display_show_from\` text;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_offer_grid\` ADD \`display_show_until\` text;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_worlds_grid\` ADD \`display_hidden\` integer;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_worlds_grid\` ADD \`display_show_on\` text DEFAULT 'all';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_worlds_grid\` ADD \`display_anchor\` text;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_worlds_grid\` ADD \`display_show_from\` text;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_worlds_grid\` ADD \`display_show_until\` text;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_stats\` ADD \`display_hidden\` integer;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_stats\` ADD \`display_show_on\` text DEFAULT 'all';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_stats\` ADD \`display_anchor\` text;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_stats\` ADD \`display_show_from\` text;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_stats\` ADD \`display_show_until\` text;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_crew_planner\` ADD \`display_hidden\` integer;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_crew_planner\` ADD \`display_show_on\` text DEFAULT 'all';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_crew_planner\` ADD \`display_anchor\` text;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_crew_planner\` ADD \`display_show_from\` text;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_crew_planner\` ADD \`display_show_until\` text;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_moments_wall\` ADD \`display_hidden\` integer;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_moments_wall\` ADD \`display_show_on\` text DEFAULT 'all';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_moments_wall\` ADD \`display_anchor\` text;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_moments_wall\` ADD \`display_show_from\` text;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_moments_wall\` ADD \`display_show_until\` text;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_journal_teaser\` ADD \`display_hidden\` integer;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_journal_teaser\` ADD \`display_show_on\` text DEFAULT 'all';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_journal_teaser\` ADD \`display_anchor\` text;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_journal_teaser\` ADD \`display_show_from\` text;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_journal_teaser\` ADD \`display_show_until\` text;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_today_status\` ADD \`display_hidden\` integer;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_today_status\` ADD \`display_show_on\` text DEFAULT 'all';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_today_status\` ADD \`display_anchor\` text;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_today_status\` ADD \`display_show_from\` text;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_today_status\` ADD \`display_show_until\` text;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_countdown\` ADD \`display_hidden\` integer;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_countdown\` ADD \`display_show_on\` text DEFAULT 'all';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_countdown\` ADD \`display_anchor\` text;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_countdown\` ADD \`display_show_from\` text;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_countdown\` ADD \`display_show_until\` text;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_image_text\` ADD \`display_hidden\` integer;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_image_text\` ADD \`display_show_on\` text DEFAULT 'all';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_image_text\` ADD \`display_anchor\` text;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_image_text\` ADD \`display_show_from\` text;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_image_text\` ADD \`display_show_until\` text;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_rich_text\` ADD \`display_hidden\` integer;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_rich_text\` ADD \`display_show_on\` text DEFAULT 'all';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_rich_text\` ADD \`display_anchor\` text;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_rich_text\` ADD \`display_show_from\` text;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_rich_text\` ADD \`display_show_until\` text;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_gallery\` ADD \`display_hidden\` integer;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_gallery\` ADD \`display_show_on\` text DEFAULT 'all';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_gallery\` ADD \`display_anchor\` text;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_gallery\` ADD \`display_show_from\` text;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_gallery\` ADD \`display_show_until\` text;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_faq\` ADD \`display_hidden\` integer;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_faq\` ADD \`display_show_on\` text DEFAULT 'all';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_faq\` ADD \`display_anchor\` text;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_faq\` ADD \`display_show_from\` text;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_faq\` ADD \`display_show_until\` text;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_lead_form\` ADD \`display_hidden\` integer;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_lead_form\` ADD \`display_show_on\` text DEFAULT 'all';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_lead_form\` ADD \`display_anchor\` text;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_lead_form\` ADD \`display_show_from\` text;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_lead_form\` ADD \`display_show_until\` text;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_cta_band\` ADD \`display_hidden\` integer;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_cta_band\` ADD \`display_show_on\` text DEFAULT 'all';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_cta_band\` ADD \`display_anchor\` text;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_cta_band\` ADD \`display_show_from\` text;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_cta_band\` ADD \`display_show_until\` text;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_hero\` ADD \`display_hidden\` integer;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_hero\` ADD \`display_show_on\` text DEFAULT 'all';`)
  await db.run(sql`ALTER TABLE \`offers_blocks_hero\` ADD \`display_anchor\` text;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_hero\` ADD \`display_show_from\` text;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_hero\` ADD \`display_show_until\` text;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_ticker\` ADD \`display_hidden\` integer;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_ticker\` ADD \`display_show_on\` text DEFAULT 'all';`)
  await db.run(sql`ALTER TABLE \`offers_blocks_ticker\` ADD \`display_anchor\` text;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_ticker\` ADD \`display_show_from\` text;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_ticker\` ADD \`display_show_until\` text;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_ticket_cards\` ADD \`display_hidden\` integer;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_ticket_cards\` ADD \`display_show_on\` text DEFAULT 'all';`)
  await db.run(sql`ALTER TABLE \`offers_blocks_ticket_cards\` ADD \`display_anchor\` text;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_ticket_cards\` ADD \`display_show_from\` text;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_ticket_cards\` ADD \`display_show_until\` text;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_events_rail\` ADD \`display_hidden\` integer;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_events_rail\` ADD \`display_show_on\` text DEFAULT 'all';`)
  await db.run(sql`ALTER TABLE \`offers_blocks_events_rail\` ADD \`display_anchor\` text;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_events_rail\` ADD \`display_show_from\` text;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_events_rail\` ADD \`display_show_until\` text;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_offer_grid\` ADD \`display_hidden\` integer;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_offer_grid\` ADD \`display_show_on\` text DEFAULT 'all';`)
  await db.run(sql`ALTER TABLE \`offers_blocks_offer_grid\` ADD \`display_anchor\` text;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_offer_grid\` ADD \`display_show_from\` text;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_offer_grid\` ADD \`display_show_until\` text;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_worlds_grid\` ADD \`display_hidden\` integer;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_worlds_grid\` ADD \`display_show_on\` text DEFAULT 'all';`)
  await db.run(sql`ALTER TABLE \`offers_blocks_worlds_grid\` ADD \`display_anchor\` text;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_worlds_grid\` ADD \`display_show_from\` text;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_worlds_grid\` ADD \`display_show_until\` text;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_stats\` ADD \`display_hidden\` integer;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_stats\` ADD \`display_show_on\` text DEFAULT 'all';`)
  await db.run(sql`ALTER TABLE \`offers_blocks_stats\` ADD \`display_anchor\` text;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_stats\` ADD \`display_show_from\` text;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_stats\` ADD \`display_show_until\` text;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_crew_planner\` ADD \`display_hidden\` integer;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_crew_planner\` ADD \`display_show_on\` text DEFAULT 'all';`)
  await db.run(sql`ALTER TABLE \`offers_blocks_crew_planner\` ADD \`display_anchor\` text;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_crew_planner\` ADD \`display_show_from\` text;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_crew_planner\` ADD \`display_show_until\` text;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_moments_wall\` ADD \`display_hidden\` integer;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_moments_wall\` ADD \`display_show_on\` text DEFAULT 'all';`)
  await db.run(sql`ALTER TABLE \`offers_blocks_moments_wall\` ADD \`display_anchor\` text;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_moments_wall\` ADD \`display_show_from\` text;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_moments_wall\` ADD \`display_show_until\` text;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_journal_teaser\` ADD \`display_hidden\` integer;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_journal_teaser\` ADD \`display_show_on\` text DEFAULT 'all';`)
  await db.run(sql`ALTER TABLE \`offers_blocks_journal_teaser\` ADD \`display_anchor\` text;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_journal_teaser\` ADD \`display_show_from\` text;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_journal_teaser\` ADD \`display_show_until\` text;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_today_status\` ADD \`display_hidden\` integer;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_today_status\` ADD \`display_show_on\` text DEFAULT 'all';`)
  await db.run(sql`ALTER TABLE \`offers_blocks_today_status\` ADD \`display_anchor\` text;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_today_status\` ADD \`display_show_from\` text;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_today_status\` ADD \`display_show_until\` text;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_countdown\` ADD \`display_hidden\` integer;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_countdown\` ADD \`display_show_on\` text DEFAULT 'all';`)
  await db.run(sql`ALTER TABLE \`offers_blocks_countdown\` ADD \`display_anchor\` text;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_countdown\` ADD \`display_show_from\` text;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_countdown\` ADD \`display_show_until\` text;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_image_text\` ADD \`display_hidden\` integer;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_image_text\` ADD \`display_show_on\` text DEFAULT 'all';`)
  await db.run(sql`ALTER TABLE \`offers_blocks_image_text\` ADD \`display_anchor\` text;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_image_text\` ADD \`display_show_from\` text;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_image_text\` ADD \`display_show_until\` text;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_rich_text\` ADD \`display_hidden\` integer;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_rich_text\` ADD \`display_show_on\` text DEFAULT 'all';`)
  await db.run(sql`ALTER TABLE \`offers_blocks_rich_text\` ADD \`display_anchor\` text;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_rich_text\` ADD \`display_show_from\` text;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_rich_text\` ADD \`display_show_until\` text;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_gallery\` ADD \`display_hidden\` integer;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_gallery\` ADD \`display_show_on\` text DEFAULT 'all';`)
  await db.run(sql`ALTER TABLE \`offers_blocks_gallery\` ADD \`display_anchor\` text;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_gallery\` ADD \`display_show_from\` text;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_gallery\` ADD \`display_show_until\` text;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_faq\` ADD \`display_hidden\` integer;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_faq\` ADD \`display_show_on\` text DEFAULT 'all';`)
  await db.run(sql`ALTER TABLE \`offers_blocks_faq\` ADD \`display_anchor\` text;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_faq\` ADD \`display_show_from\` text;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_faq\` ADD \`display_show_until\` text;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_lead_form\` ADD \`display_hidden\` integer;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_lead_form\` ADD \`display_show_on\` text DEFAULT 'all';`)
  await db.run(sql`ALTER TABLE \`offers_blocks_lead_form\` ADD \`display_anchor\` text;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_lead_form\` ADD \`display_show_from\` text;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_lead_form\` ADD \`display_show_until\` text;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_cta_band\` ADD \`display_hidden\` integer;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_cta_band\` ADD \`display_show_on\` text DEFAULT 'all';`)
  await db.run(sql`ALTER TABLE \`offers_blocks_cta_band\` ADD \`display_anchor\` text;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_cta_band\` ADD \`display_show_from\` text;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_cta_band\` ADD \`display_show_until\` text;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_hero\` ADD \`display_hidden\` integer;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_hero\` ADD \`display_show_on\` text DEFAULT 'all';`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_hero\` ADD \`display_anchor\` text;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_hero\` ADD \`display_show_from\` text;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_hero\` ADD \`display_show_until\` text;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_ticker\` ADD \`display_hidden\` integer;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_ticker\` ADD \`display_show_on\` text DEFAULT 'all';`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_ticker\` ADD \`display_anchor\` text;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_ticker\` ADD \`display_show_from\` text;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_ticker\` ADD \`display_show_until\` text;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_ticket_cards\` ADD \`display_hidden\` integer;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_ticket_cards\` ADD \`display_show_on\` text DEFAULT 'all';`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_ticket_cards\` ADD \`display_anchor\` text;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_ticket_cards\` ADD \`display_show_from\` text;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_ticket_cards\` ADD \`display_show_until\` text;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_events_rail\` ADD \`display_hidden\` integer;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_events_rail\` ADD \`display_show_on\` text DEFAULT 'all';`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_events_rail\` ADD \`display_anchor\` text;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_events_rail\` ADD \`display_show_from\` text;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_events_rail\` ADD \`display_show_until\` text;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_offer_grid\` ADD \`display_hidden\` integer;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_offer_grid\` ADD \`display_show_on\` text DEFAULT 'all';`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_offer_grid\` ADD \`display_anchor\` text;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_offer_grid\` ADD \`display_show_from\` text;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_offer_grid\` ADD \`display_show_until\` text;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_worlds_grid\` ADD \`display_hidden\` integer;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_worlds_grid\` ADD \`display_show_on\` text DEFAULT 'all';`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_worlds_grid\` ADD \`display_anchor\` text;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_worlds_grid\` ADD \`display_show_from\` text;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_worlds_grid\` ADD \`display_show_until\` text;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_stats\` ADD \`display_hidden\` integer;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_stats\` ADD \`display_show_on\` text DEFAULT 'all';`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_stats\` ADD \`display_anchor\` text;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_stats\` ADD \`display_show_from\` text;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_stats\` ADD \`display_show_until\` text;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_crew_planner\` ADD \`display_hidden\` integer;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_crew_planner\` ADD \`display_show_on\` text DEFAULT 'all';`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_crew_planner\` ADD \`display_anchor\` text;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_crew_planner\` ADD \`display_show_from\` text;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_crew_planner\` ADD \`display_show_until\` text;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_moments_wall\` ADD \`display_hidden\` integer;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_moments_wall\` ADD \`display_show_on\` text DEFAULT 'all';`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_moments_wall\` ADD \`display_anchor\` text;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_moments_wall\` ADD \`display_show_from\` text;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_moments_wall\` ADD \`display_show_until\` text;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_journal_teaser\` ADD \`display_hidden\` integer;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_journal_teaser\` ADD \`display_show_on\` text DEFAULT 'all';`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_journal_teaser\` ADD \`display_anchor\` text;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_journal_teaser\` ADD \`display_show_from\` text;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_journal_teaser\` ADD \`display_show_until\` text;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_today_status\` ADD \`display_hidden\` integer;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_today_status\` ADD \`display_show_on\` text DEFAULT 'all';`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_today_status\` ADD \`display_anchor\` text;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_today_status\` ADD \`display_show_from\` text;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_today_status\` ADD \`display_show_until\` text;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_countdown\` ADD \`display_hidden\` integer;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_countdown\` ADD \`display_show_on\` text DEFAULT 'all';`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_countdown\` ADD \`display_anchor\` text;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_countdown\` ADD \`display_show_from\` text;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_countdown\` ADD \`display_show_until\` text;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_image_text\` ADD \`display_hidden\` integer;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_image_text\` ADD \`display_show_on\` text DEFAULT 'all';`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_image_text\` ADD \`display_anchor\` text;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_image_text\` ADD \`display_show_from\` text;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_image_text\` ADD \`display_show_until\` text;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_rich_text\` ADD \`display_hidden\` integer;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_rich_text\` ADD \`display_show_on\` text DEFAULT 'all';`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_rich_text\` ADD \`display_anchor\` text;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_rich_text\` ADD \`display_show_from\` text;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_rich_text\` ADD \`display_show_until\` text;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_gallery\` ADD \`display_hidden\` integer;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_gallery\` ADD \`display_show_on\` text DEFAULT 'all';`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_gallery\` ADD \`display_anchor\` text;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_gallery\` ADD \`display_show_from\` text;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_gallery\` ADD \`display_show_until\` text;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_faq\` ADD \`display_hidden\` integer;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_faq\` ADD \`display_show_on\` text DEFAULT 'all';`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_faq\` ADD \`display_anchor\` text;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_faq\` ADD \`display_show_from\` text;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_faq\` ADD \`display_show_until\` text;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_lead_form\` ADD \`display_hidden\` integer;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_lead_form\` ADD \`display_show_on\` text DEFAULT 'all';`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_lead_form\` ADD \`display_anchor\` text;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_lead_form\` ADD \`display_show_from\` text;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_lead_form\` ADD \`display_show_until\` text;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_cta_band\` ADD \`display_hidden\` integer;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_cta_band\` ADD \`display_show_on\` text DEFAULT 'all';`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_cta_band\` ADD \`display_anchor\` text;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_cta_band\` ADD \`display_show_from\` text;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_cta_band\` ADD \`display_show_until\` text;`)
  await db.run(sql`ALTER TABLE \`events_blocks_hero\` ADD \`display_hidden\` integer;`)
  await db.run(sql`ALTER TABLE \`events_blocks_hero\` ADD \`display_show_on\` text DEFAULT 'all';`)
  await db.run(sql`ALTER TABLE \`events_blocks_hero\` ADD \`display_anchor\` text;`)
  await db.run(sql`ALTER TABLE \`events_blocks_hero\` ADD \`display_show_from\` text;`)
  await db.run(sql`ALTER TABLE \`events_blocks_hero\` ADD \`display_show_until\` text;`)
  await db.run(sql`ALTER TABLE \`events_blocks_ticker\` ADD \`display_hidden\` integer;`)
  await db.run(sql`ALTER TABLE \`events_blocks_ticker\` ADD \`display_show_on\` text DEFAULT 'all';`)
  await db.run(sql`ALTER TABLE \`events_blocks_ticker\` ADD \`display_anchor\` text;`)
  await db.run(sql`ALTER TABLE \`events_blocks_ticker\` ADD \`display_show_from\` text;`)
  await db.run(sql`ALTER TABLE \`events_blocks_ticker\` ADD \`display_show_until\` text;`)
  await db.run(sql`ALTER TABLE \`events_blocks_ticket_cards\` ADD \`display_hidden\` integer;`)
  await db.run(sql`ALTER TABLE \`events_blocks_ticket_cards\` ADD \`display_show_on\` text DEFAULT 'all';`)
  await db.run(sql`ALTER TABLE \`events_blocks_ticket_cards\` ADD \`display_anchor\` text;`)
  await db.run(sql`ALTER TABLE \`events_blocks_ticket_cards\` ADD \`display_show_from\` text;`)
  await db.run(sql`ALTER TABLE \`events_blocks_ticket_cards\` ADD \`display_show_until\` text;`)
  await db.run(sql`ALTER TABLE \`events_blocks_events_rail\` ADD \`display_hidden\` integer;`)
  await db.run(sql`ALTER TABLE \`events_blocks_events_rail\` ADD \`display_show_on\` text DEFAULT 'all';`)
  await db.run(sql`ALTER TABLE \`events_blocks_events_rail\` ADD \`display_anchor\` text;`)
  await db.run(sql`ALTER TABLE \`events_blocks_events_rail\` ADD \`display_show_from\` text;`)
  await db.run(sql`ALTER TABLE \`events_blocks_events_rail\` ADD \`display_show_until\` text;`)
  await db.run(sql`ALTER TABLE \`events_blocks_offer_grid\` ADD \`display_hidden\` integer;`)
  await db.run(sql`ALTER TABLE \`events_blocks_offer_grid\` ADD \`display_show_on\` text DEFAULT 'all';`)
  await db.run(sql`ALTER TABLE \`events_blocks_offer_grid\` ADD \`display_anchor\` text;`)
  await db.run(sql`ALTER TABLE \`events_blocks_offer_grid\` ADD \`display_show_from\` text;`)
  await db.run(sql`ALTER TABLE \`events_blocks_offer_grid\` ADD \`display_show_until\` text;`)
  await db.run(sql`ALTER TABLE \`events_blocks_worlds_grid\` ADD \`display_hidden\` integer;`)
  await db.run(sql`ALTER TABLE \`events_blocks_worlds_grid\` ADD \`display_show_on\` text DEFAULT 'all';`)
  await db.run(sql`ALTER TABLE \`events_blocks_worlds_grid\` ADD \`display_anchor\` text;`)
  await db.run(sql`ALTER TABLE \`events_blocks_worlds_grid\` ADD \`display_show_from\` text;`)
  await db.run(sql`ALTER TABLE \`events_blocks_worlds_grid\` ADD \`display_show_until\` text;`)
  await db.run(sql`ALTER TABLE \`events_blocks_stats\` ADD \`display_hidden\` integer;`)
  await db.run(sql`ALTER TABLE \`events_blocks_stats\` ADD \`display_show_on\` text DEFAULT 'all';`)
  await db.run(sql`ALTER TABLE \`events_blocks_stats\` ADD \`display_anchor\` text;`)
  await db.run(sql`ALTER TABLE \`events_blocks_stats\` ADD \`display_show_from\` text;`)
  await db.run(sql`ALTER TABLE \`events_blocks_stats\` ADD \`display_show_until\` text;`)
  await db.run(sql`ALTER TABLE \`events_blocks_crew_planner\` ADD \`display_hidden\` integer;`)
  await db.run(sql`ALTER TABLE \`events_blocks_crew_planner\` ADD \`display_show_on\` text DEFAULT 'all';`)
  await db.run(sql`ALTER TABLE \`events_blocks_crew_planner\` ADD \`display_anchor\` text;`)
  await db.run(sql`ALTER TABLE \`events_blocks_crew_planner\` ADD \`display_show_from\` text;`)
  await db.run(sql`ALTER TABLE \`events_blocks_crew_planner\` ADD \`display_show_until\` text;`)
  await db.run(sql`ALTER TABLE \`events_blocks_moments_wall\` ADD \`display_hidden\` integer;`)
  await db.run(sql`ALTER TABLE \`events_blocks_moments_wall\` ADD \`display_show_on\` text DEFAULT 'all';`)
  await db.run(sql`ALTER TABLE \`events_blocks_moments_wall\` ADD \`display_anchor\` text;`)
  await db.run(sql`ALTER TABLE \`events_blocks_moments_wall\` ADD \`display_show_from\` text;`)
  await db.run(sql`ALTER TABLE \`events_blocks_moments_wall\` ADD \`display_show_until\` text;`)
  await db.run(sql`ALTER TABLE \`events_blocks_journal_teaser\` ADD \`display_hidden\` integer;`)
  await db.run(sql`ALTER TABLE \`events_blocks_journal_teaser\` ADD \`display_show_on\` text DEFAULT 'all';`)
  await db.run(sql`ALTER TABLE \`events_blocks_journal_teaser\` ADD \`display_anchor\` text;`)
  await db.run(sql`ALTER TABLE \`events_blocks_journal_teaser\` ADD \`display_show_from\` text;`)
  await db.run(sql`ALTER TABLE \`events_blocks_journal_teaser\` ADD \`display_show_until\` text;`)
  await db.run(sql`ALTER TABLE \`events_blocks_today_status\` ADD \`display_hidden\` integer;`)
  await db.run(sql`ALTER TABLE \`events_blocks_today_status\` ADD \`display_show_on\` text DEFAULT 'all';`)
  await db.run(sql`ALTER TABLE \`events_blocks_today_status\` ADD \`display_anchor\` text;`)
  await db.run(sql`ALTER TABLE \`events_blocks_today_status\` ADD \`display_show_from\` text;`)
  await db.run(sql`ALTER TABLE \`events_blocks_today_status\` ADD \`display_show_until\` text;`)
  await db.run(sql`ALTER TABLE \`events_blocks_countdown\` ADD \`display_hidden\` integer;`)
  await db.run(sql`ALTER TABLE \`events_blocks_countdown\` ADD \`display_show_on\` text DEFAULT 'all';`)
  await db.run(sql`ALTER TABLE \`events_blocks_countdown\` ADD \`display_anchor\` text;`)
  await db.run(sql`ALTER TABLE \`events_blocks_countdown\` ADD \`display_show_from\` text;`)
  await db.run(sql`ALTER TABLE \`events_blocks_countdown\` ADD \`display_show_until\` text;`)
  await db.run(sql`ALTER TABLE \`events_blocks_image_text\` ADD \`display_hidden\` integer;`)
  await db.run(sql`ALTER TABLE \`events_blocks_image_text\` ADD \`display_show_on\` text DEFAULT 'all';`)
  await db.run(sql`ALTER TABLE \`events_blocks_image_text\` ADD \`display_anchor\` text;`)
  await db.run(sql`ALTER TABLE \`events_blocks_image_text\` ADD \`display_show_from\` text;`)
  await db.run(sql`ALTER TABLE \`events_blocks_image_text\` ADD \`display_show_until\` text;`)
  await db.run(sql`ALTER TABLE \`events_blocks_rich_text\` ADD \`display_hidden\` integer;`)
  await db.run(sql`ALTER TABLE \`events_blocks_rich_text\` ADD \`display_show_on\` text DEFAULT 'all';`)
  await db.run(sql`ALTER TABLE \`events_blocks_rich_text\` ADD \`display_anchor\` text;`)
  await db.run(sql`ALTER TABLE \`events_blocks_rich_text\` ADD \`display_show_from\` text;`)
  await db.run(sql`ALTER TABLE \`events_blocks_rich_text\` ADD \`display_show_until\` text;`)
  await db.run(sql`ALTER TABLE \`events_blocks_gallery\` ADD \`display_hidden\` integer;`)
  await db.run(sql`ALTER TABLE \`events_blocks_gallery\` ADD \`display_show_on\` text DEFAULT 'all';`)
  await db.run(sql`ALTER TABLE \`events_blocks_gallery\` ADD \`display_anchor\` text;`)
  await db.run(sql`ALTER TABLE \`events_blocks_gallery\` ADD \`display_show_from\` text;`)
  await db.run(sql`ALTER TABLE \`events_blocks_gallery\` ADD \`display_show_until\` text;`)
  await db.run(sql`ALTER TABLE \`events_blocks_faq\` ADD \`display_hidden\` integer;`)
  await db.run(sql`ALTER TABLE \`events_blocks_faq\` ADD \`display_show_on\` text DEFAULT 'all';`)
  await db.run(sql`ALTER TABLE \`events_blocks_faq\` ADD \`display_anchor\` text;`)
  await db.run(sql`ALTER TABLE \`events_blocks_faq\` ADD \`display_show_from\` text;`)
  await db.run(sql`ALTER TABLE \`events_blocks_faq\` ADD \`display_show_until\` text;`)
  await db.run(sql`ALTER TABLE \`events_blocks_lead_form\` ADD \`display_hidden\` integer;`)
  await db.run(sql`ALTER TABLE \`events_blocks_lead_form\` ADD \`display_show_on\` text DEFAULT 'all';`)
  await db.run(sql`ALTER TABLE \`events_blocks_lead_form\` ADD \`display_anchor\` text;`)
  await db.run(sql`ALTER TABLE \`events_blocks_lead_form\` ADD \`display_show_from\` text;`)
  await db.run(sql`ALTER TABLE \`events_blocks_lead_form\` ADD \`display_show_until\` text;`)
  await db.run(sql`ALTER TABLE \`events_blocks_cta_band\` ADD \`display_hidden\` integer;`)
  await db.run(sql`ALTER TABLE \`events_blocks_cta_band\` ADD \`display_show_on\` text DEFAULT 'all';`)
  await db.run(sql`ALTER TABLE \`events_blocks_cta_band\` ADD \`display_anchor\` text;`)
  await db.run(sql`ALTER TABLE \`events_blocks_cta_band\` ADD \`display_show_from\` text;`)
  await db.run(sql`ALTER TABLE \`events_blocks_cta_band\` ADD \`display_show_until\` text;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_hero\` ADD \`display_hidden\` integer;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_hero\` ADD \`display_show_on\` text DEFAULT 'all';`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_hero\` ADD \`display_anchor\` text;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_hero\` ADD \`display_show_from\` text;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_hero\` ADD \`display_show_until\` text;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_ticker\` ADD \`display_hidden\` integer;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_ticker\` ADD \`display_show_on\` text DEFAULT 'all';`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_ticker\` ADD \`display_anchor\` text;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_ticker\` ADD \`display_show_from\` text;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_ticker\` ADD \`display_show_until\` text;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_ticket_cards\` ADD \`display_hidden\` integer;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_ticket_cards\` ADD \`display_show_on\` text DEFAULT 'all';`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_ticket_cards\` ADD \`display_anchor\` text;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_ticket_cards\` ADD \`display_show_from\` text;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_ticket_cards\` ADD \`display_show_until\` text;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_events_rail\` ADD \`display_hidden\` integer;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_events_rail\` ADD \`display_show_on\` text DEFAULT 'all';`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_events_rail\` ADD \`display_anchor\` text;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_events_rail\` ADD \`display_show_from\` text;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_events_rail\` ADD \`display_show_until\` text;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_offer_grid\` ADD \`display_hidden\` integer;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_offer_grid\` ADD \`display_show_on\` text DEFAULT 'all';`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_offer_grid\` ADD \`display_anchor\` text;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_offer_grid\` ADD \`display_show_from\` text;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_offer_grid\` ADD \`display_show_until\` text;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_worlds_grid\` ADD \`display_hidden\` integer;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_worlds_grid\` ADD \`display_show_on\` text DEFAULT 'all';`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_worlds_grid\` ADD \`display_anchor\` text;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_worlds_grid\` ADD \`display_show_from\` text;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_worlds_grid\` ADD \`display_show_until\` text;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_stats\` ADD \`display_hidden\` integer;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_stats\` ADD \`display_show_on\` text DEFAULT 'all';`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_stats\` ADD \`display_anchor\` text;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_stats\` ADD \`display_show_from\` text;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_stats\` ADD \`display_show_until\` text;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_crew_planner\` ADD \`display_hidden\` integer;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_crew_planner\` ADD \`display_show_on\` text DEFAULT 'all';`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_crew_planner\` ADD \`display_anchor\` text;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_crew_planner\` ADD \`display_show_from\` text;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_crew_planner\` ADD \`display_show_until\` text;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_moments_wall\` ADD \`display_hidden\` integer;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_moments_wall\` ADD \`display_show_on\` text DEFAULT 'all';`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_moments_wall\` ADD \`display_anchor\` text;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_moments_wall\` ADD \`display_show_from\` text;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_moments_wall\` ADD \`display_show_until\` text;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_journal_teaser\` ADD \`display_hidden\` integer;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_journal_teaser\` ADD \`display_show_on\` text DEFAULT 'all';`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_journal_teaser\` ADD \`display_anchor\` text;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_journal_teaser\` ADD \`display_show_from\` text;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_journal_teaser\` ADD \`display_show_until\` text;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_today_status\` ADD \`display_hidden\` integer;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_today_status\` ADD \`display_show_on\` text DEFAULT 'all';`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_today_status\` ADD \`display_anchor\` text;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_today_status\` ADD \`display_show_from\` text;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_today_status\` ADD \`display_show_until\` text;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_countdown\` ADD \`display_hidden\` integer;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_countdown\` ADD \`display_show_on\` text DEFAULT 'all';`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_countdown\` ADD \`display_anchor\` text;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_countdown\` ADD \`display_show_from\` text;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_countdown\` ADD \`display_show_until\` text;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_image_text\` ADD \`display_hidden\` integer;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_image_text\` ADD \`display_show_on\` text DEFAULT 'all';`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_image_text\` ADD \`display_anchor\` text;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_image_text\` ADD \`display_show_from\` text;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_image_text\` ADD \`display_show_until\` text;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_rich_text\` ADD \`display_hidden\` integer;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_rich_text\` ADD \`display_show_on\` text DEFAULT 'all';`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_rich_text\` ADD \`display_anchor\` text;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_rich_text\` ADD \`display_show_from\` text;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_rich_text\` ADD \`display_show_until\` text;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_gallery\` ADD \`display_hidden\` integer;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_gallery\` ADD \`display_show_on\` text DEFAULT 'all';`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_gallery\` ADD \`display_anchor\` text;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_gallery\` ADD \`display_show_from\` text;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_gallery\` ADD \`display_show_until\` text;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_faq\` ADD \`display_hidden\` integer;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_faq\` ADD \`display_show_on\` text DEFAULT 'all';`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_faq\` ADD \`display_anchor\` text;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_faq\` ADD \`display_show_from\` text;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_faq\` ADD \`display_show_until\` text;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_lead_form\` ADD \`display_hidden\` integer;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_lead_form\` ADD \`display_show_on\` text DEFAULT 'all';`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_lead_form\` ADD \`display_anchor\` text;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_lead_form\` ADD \`display_show_from\` text;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_lead_form\` ADD \`display_show_until\` text;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_cta_band\` ADD \`display_hidden\` integer;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_cta_band\` ADD \`display_show_on\` text DEFAULT 'all';`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_cta_band\` ADD \`display_anchor\` text;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_cta_band\` ADD \`display_show_from\` text;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_cta_band\` ADD \`display_show_until\` text;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_hero\` ADD \`display_hidden\` integer;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_hero\` ADD \`display_show_on\` text DEFAULT 'all';`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_hero\` ADD \`display_anchor\` text;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_hero\` ADD \`display_show_from\` text;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_hero\` ADD \`display_show_until\` text;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_ticker\` ADD \`display_hidden\` integer;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_ticker\` ADD \`display_show_on\` text DEFAULT 'all';`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_ticker\` ADD \`display_anchor\` text;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_ticker\` ADD \`display_show_from\` text;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_ticker\` ADD \`display_show_until\` text;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_ticket_cards\` ADD \`display_hidden\` integer;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_ticket_cards\` ADD \`display_show_on\` text DEFAULT 'all';`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_ticket_cards\` ADD \`display_anchor\` text;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_ticket_cards\` ADD \`display_show_from\` text;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_ticket_cards\` ADD \`display_show_until\` text;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_events_rail\` ADD \`display_hidden\` integer;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_events_rail\` ADD \`display_show_on\` text DEFAULT 'all';`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_events_rail\` ADD \`display_anchor\` text;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_events_rail\` ADD \`display_show_from\` text;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_events_rail\` ADD \`display_show_until\` text;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_offer_grid\` ADD \`display_hidden\` integer;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_offer_grid\` ADD \`display_show_on\` text DEFAULT 'all';`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_offer_grid\` ADD \`display_anchor\` text;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_offer_grid\` ADD \`display_show_from\` text;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_offer_grid\` ADD \`display_show_until\` text;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_worlds_grid\` ADD \`display_hidden\` integer;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_worlds_grid\` ADD \`display_show_on\` text DEFAULT 'all';`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_worlds_grid\` ADD \`display_anchor\` text;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_worlds_grid\` ADD \`display_show_from\` text;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_worlds_grid\` ADD \`display_show_until\` text;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_stats\` ADD \`display_hidden\` integer;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_stats\` ADD \`display_show_on\` text DEFAULT 'all';`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_stats\` ADD \`display_anchor\` text;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_stats\` ADD \`display_show_from\` text;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_stats\` ADD \`display_show_until\` text;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_crew_planner\` ADD \`display_hidden\` integer;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_crew_planner\` ADD \`display_show_on\` text DEFAULT 'all';`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_crew_planner\` ADD \`display_anchor\` text;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_crew_planner\` ADD \`display_show_from\` text;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_crew_planner\` ADD \`display_show_until\` text;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_moments_wall\` ADD \`display_hidden\` integer;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_moments_wall\` ADD \`display_show_on\` text DEFAULT 'all';`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_moments_wall\` ADD \`display_anchor\` text;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_moments_wall\` ADD \`display_show_from\` text;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_moments_wall\` ADD \`display_show_until\` text;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_journal_teaser\` ADD \`display_hidden\` integer;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_journal_teaser\` ADD \`display_show_on\` text DEFAULT 'all';`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_journal_teaser\` ADD \`display_anchor\` text;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_journal_teaser\` ADD \`display_show_from\` text;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_journal_teaser\` ADD \`display_show_until\` text;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_today_status\` ADD \`display_hidden\` integer;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_today_status\` ADD \`display_show_on\` text DEFAULT 'all';`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_today_status\` ADD \`display_anchor\` text;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_today_status\` ADD \`display_show_from\` text;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_today_status\` ADD \`display_show_until\` text;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_countdown\` ADD \`display_hidden\` integer;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_countdown\` ADD \`display_show_on\` text DEFAULT 'all';`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_countdown\` ADD \`display_anchor\` text;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_countdown\` ADD \`display_show_from\` text;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_countdown\` ADD \`display_show_until\` text;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_image_text\` ADD \`display_hidden\` integer;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_image_text\` ADD \`display_show_on\` text DEFAULT 'all';`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_image_text\` ADD \`display_anchor\` text;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_image_text\` ADD \`display_show_from\` text;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_image_text\` ADD \`display_show_until\` text;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_rich_text\` ADD \`display_hidden\` integer;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_rich_text\` ADD \`display_show_on\` text DEFAULT 'all';`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_rich_text\` ADD \`display_anchor\` text;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_rich_text\` ADD \`display_show_from\` text;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_rich_text\` ADD \`display_show_until\` text;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_gallery\` ADD \`display_hidden\` integer;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_gallery\` ADD \`display_show_on\` text DEFAULT 'all';`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_gallery\` ADD \`display_anchor\` text;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_gallery\` ADD \`display_show_from\` text;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_gallery\` ADD \`display_show_until\` text;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_faq\` ADD \`display_hidden\` integer;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_faq\` ADD \`display_show_on\` text DEFAULT 'all';`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_faq\` ADD \`display_anchor\` text;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_faq\` ADD \`display_show_from\` text;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_faq\` ADD \`display_show_until\` text;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_lead_form\` ADD \`display_hidden\` integer;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_lead_form\` ADD \`display_show_on\` text DEFAULT 'all';`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_lead_form\` ADD \`display_anchor\` text;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_lead_form\` ADD \`display_show_from\` text;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_lead_form\` ADD \`display_show_until\` text;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_cta_band\` ADD \`display_hidden\` integer;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_cta_band\` ADD \`display_show_on\` text DEFAULT 'all';`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_cta_band\` ADD \`display_anchor\` text;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_cta_band\` ADD \`display_show_from\` text;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_cta_band\` ADD \`display_show_until\` text;`)
  await db.run(sql`ALTER TABLE \`media\` ADD \`folder_id\` integer REFERENCES payload_folders(id);`)
  await db.run(sql`ALTER TABLE \`media\` ADD \`sizes_thumbnail_url\` text;`)
  await db.run(sql`ALTER TABLE \`media\` ADD \`sizes_thumbnail_width\` numeric;`)
  await db.run(sql`ALTER TABLE \`media\` ADD \`sizes_thumbnail_height\` numeric;`)
  await db.run(sql`ALTER TABLE \`media\` ADD \`sizes_thumbnail_mime_type\` text;`)
  await db.run(sql`ALTER TABLE \`media\` ADD \`sizes_thumbnail_filesize\` numeric;`)
  await db.run(sql`ALTER TABLE \`media\` ADD \`sizes_thumbnail_filename\` text;`)
  await db.run(sql`CREATE INDEX \`media_folder_idx\` ON \`media\` (\`folder_id\`);`)
  await db.run(sql`CREATE INDEX \`media_sizes_thumbnail_sizes_thumbnail_filename_idx\` ON \`media\` (\`sizes_thumbnail_filename\`);`)
  await db.run(sql`ALTER TABLE \`users\` ADD \`custom_role_id\` integer REFERENCES roles(id);`)
  await db.run(sql`ALTER TABLE \`users\` ADD \`phone\` text;`)
  await db.run(sql`ALTER TABLE \`users\` ADD \`enable_a_p_i_key\` integer;`)
  await db.run(sql`ALTER TABLE \`users\` ADD \`api_key\` text;`)
  await db.run(sql`ALTER TABLE \`users\` ADD \`api_key_index\` text;`)
  await db.run(sql`CREATE INDEX \`users_custom_role_idx\` ON \`users\` (\`custom_role_id\`);`)
  await db.run(sql`ALTER TABLE \`payload_locked_documents_rels\` ADD \`sections_id\` integer REFERENCES sections(id);`)
  await db.run(sql`ALTER TABLE \`payload_locked_documents_rels\` ADD \`redirects_id\` integer REFERENCES redirects(id);`)
  await db.run(sql`ALTER TABLE \`payload_locked_documents_rels\` ADD \`webhooks_id\` integer REFERENCES webhooks(id);`)
  await db.run(sql`ALTER TABLE \`payload_locked_documents_rels\` ADD \`roles_id\` integer REFERENCES roles(id);`)
  await db.run(sql`ALTER TABLE \`payload_locked_documents_rels\` ADD \`payload_folders_id\` integer REFERENCES payload_folders(id);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_sections_id_idx\` ON \`payload_locked_documents_rels\` (\`sections_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_redirects_id_idx\` ON \`payload_locked_documents_rels\` (\`redirects_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_webhooks_id_idx\` ON \`payload_locked_documents_rels\` (\`webhooks_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_roles_id_idx\` ON \`payload_locked_documents_rels\` (\`roles_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_payload_folders_id_idx\` ON \`payload_locked_documents_rels\` (\`payload_folders_id\`);`)
  await db.run(sql`ALTER TABLE \`site_settings\` ADD \`geo_lat\` numeric DEFAULT 22.5714;`)
  await db.run(sql`ALTER TABLE \`site_settings\` ADD \`geo_lng\` numeric DEFAULT 88.4223;`)
  await db.run(sql`ALTER TABLE \`site_settings\` DROP COLUMN \`gtm_id\`;`)
  await db.run(sql`ALTER TABLE \`footer\` ADD \`_status\` text DEFAULT 'draft';`)
  await db.run(sql`CREATE INDEX \`footer__status_idx\` ON \`footer\` (\`_status\`);`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`pages_blocks_offer_spotlight\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_offer_spotlight_locales\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_rides_list\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_rides_list_locales\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_venues_grid\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_venues_grid_locales\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_map\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_map_locales\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_columns_items\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_columns_items_locales\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_columns\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_columns_locales\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_video\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_video_locales\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_testimonials_items\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_testimonials_items_locales\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_testimonials\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_testimonials_locales\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_logo_strip_logos\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_logo_strip\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_logo_strip_locales\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_faq_items\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_faq_items_locales\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_embed\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_embed_locales\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_spacer\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_reusable\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_offer_spotlight\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_offer_spotlight_locales\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_rides_list\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_rides_list_locales\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_venues_grid\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_venues_grid_locales\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_map\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_map_locales\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_columns_items\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_columns_items_locales\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_columns\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_columns_locales\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_video\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_video_locales\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_testimonials_items\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_testimonials_items_locales\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_testimonials\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_testimonials_locales\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_logo_strip_logos\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_logo_strip\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_logo_strip_locales\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_faq_items\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_faq_items_locales\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_embed\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_embed_locales\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_spacer\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_reusable\`;`)
  await db.run(sql`DROP TABLE \`offers_blocks_offer_spotlight\`;`)
  await db.run(sql`DROP TABLE \`offers_blocks_offer_spotlight_locales\`;`)
  await db.run(sql`DROP TABLE \`offers_blocks_rides_list\`;`)
  await db.run(sql`DROP TABLE \`offers_blocks_rides_list_locales\`;`)
  await db.run(sql`DROP TABLE \`offers_blocks_venues_grid\`;`)
  await db.run(sql`DROP TABLE \`offers_blocks_venues_grid_locales\`;`)
  await db.run(sql`DROP TABLE \`offers_blocks_map\`;`)
  await db.run(sql`DROP TABLE \`offers_blocks_map_locales\`;`)
  await db.run(sql`DROP TABLE \`offers_blocks_columns_items\`;`)
  await db.run(sql`DROP TABLE \`offers_blocks_columns_items_locales\`;`)
  await db.run(sql`DROP TABLE \`offers_blocks_columns\`;`)
  await db.run(sql`DROP TABLE \`offers_blocks_columns_locales\`;`)
  await db.run(sql`DROP TABLE \`offers_blocks_video\`;`)
  await db.run(sql`DROP TABLE \`offers_blocks_video_locales\`;`)
  await db.run(sql`DROP TABLE \`offers_blocks_testimonials_items\`;`)
  await db.run(sql`DROP TABLE \`offers_blocks_testimonials_items_locales\`;`)
  await db.run(sql`DROP TABLE \`offers_blocks_testimonials\`;`)
  await db.run(sql`DROP TABLE \`offers_blocks_testimonials_locales\`;`)
  await db.run(sql`DROP TABLE \`offers_blocks_logo_strip_logos\`;`)
  await db.run(sql`DROP TABLE \`offers_blocks_logo_strip\`;`)
  await db.run(sql`DROP TABLE \`offers_blocks_logo_strip_locales\`;`)
  await db.run(sql`DROP TABLE \`offers_blocks_faq_items\`;`)
  await db.run(sql`DROP TABLE \`offers_blocks_faq_items_locales\`;`)
  await db.run(sql`DROP TABLE \`offers_blocks_embed\`;`)
  await db.run(sql`DROP TABLE \`offers_blocks_embed_locales\`;`)
  await db.run(sql`DROP TABLE \`offers_blocks_spacer\`;`)
  await db.run(sql`DROP TABLE \`offers_blocks_reusable\`;`)
  await db.run(sql`DROP TABLE \`_offers_v_blocks_offer_spotlight\`;`)
  await db.run(sql`DROP TABLE \`_offers_v_blocks_offer_spotlight_locales\`;`)
  await db.run(sql`DROP TABLE \`_offers_v_blocks_rides_list\`;`)
  await db.run(sql`DROP TABLE \`_offers_v_blocks_rides_list_locales\`;`)
  await db.run(sql`DROP TABLE \`_offers_v_blocks_venues_grid\`;`)
  await db.run(sql`DROP TABLE \`_offers_v_blocks_venues_grid_locales\`;`)
  await db.run(sql`DROP TABLE \`_offers_v_blocks_map\`;`)
  await db.run(sql`DROP TABLE \`_offers_v_blocks_map_locales\`;`)
  await db.run(sql`DROP TABLE \`_offers_v_blocks_columns_items\`;`)
  await db.run(sql`DROP TABLE \`_offers_v_blocks_columns_items_locales\`;`)
  await db.run(sql`DROP TABLE \`_offers_v_blocks_columns\`;`)
  await db.run(sql`DROP TABLE \`_offers_v_blocks_columns_locales\`;`)
  await db.run(sql`DROP TABLE \`_offers_v_blocks_video\`;`)
  await db.run(sql`DROP TABLE \`_offers_v_blocks_video_locales\`;`)
  await db.run(sql`DROP TABLE \`_offers_v_blocks_testimonials_items\`;`)
  await db.run(sql`DROP TABLE \`_offers_v_blocks_testimonials_items_locales\`;`)
  await db.run(sql`DROP TABLE \`_offers_v_blocks_testimonials\`;`)
  await db.run(sql`DROP TABLE \`_offers_v_blocks_testimonials_locales\`;`)
  await db.run(sql`DROP TABLE \`_offers_v_blocks_logo_strip_logos\`;`)
  await db.run(sql`DROP TABLE \`_offers_v_blocks_logo_strip\`;`)
  await db.run(sql`DROP TABLE \`_offers_v_blocks_logo_strip_locales\`;`)
  await db.run(sql`DROP TABLE \`_offers_v_blocks_faq_items\`;`)
  await db.run(sql`DROP TABLE \`_offers_v_blocks_faq_items_locales\`;`)
  await db.run(sql`DROP TABLE \`_offers_v_blocks_embed\`;`)
  await db.run(sql`DROP TABLE \`_offers_v_blocks_embed_locales\`;`)
  await db.run(sql`DROP TABLE \`_offers_v_blocks_spacer\`;`)
  await db.run(sql`DROP TABLE \`_offers_v_blocks_reusable\`;`)
  await db.run(sql`DROP TABLE \`events_blocks_offer_spotlight\`;`)
  await db.run(sql`DROP TABLE \`events_blocks_offer_spotlight_locales\`;`)
  await db.run(sql`DROP TABLE \`events_blocks_rides_list\`;`)
  await db.run(sql`DROP TABLE \`events_blocks_rides_list_locales\`;`)
  await db.run(sql`DROP TABLE \`events_blocks_venues_grid\`;`)
  await db.run(sql`DROP TABLE \`events_blocks_venues_grid_locales\`;`)
  await db.run(sql`DROP TABLE \`events_blocks_map\`;`)
  await db.run(sql`DROP TABLE \`events_blocks_map_locales\`;`)
  await db.run(sql`DROP TABLE \`events_blocks_columns_items\`;`)
  await db.run(sql`DROP TABLE \`events_blocks_columns_items_locales\`;`)
  await db.run(sql`DROP TABLE \`events_blocks_columns\`;`)
  await db.run(sql`DROP TABLE \`events_blocks_columns_locales\`;`)
  await db.run(sql`DROP TABLE \`events_blocks_video\`;`)
  await db.run(sql`DROP TABLE \`events_blocks_video_locales\`;`)
  await db.run(sql`DROP TABLE \`events_blocks_testimonials_items\`;`)
  await db.run(sql`DROP TABLE \`events_blocks_testimonials_items_locales\`;`)
  await db.run(sql`DROP TABLE \`events_blocks_testimonials\`;`)
  await db.run(sql`DROP TABLE \`events_blocks_testimonials_locales\`;`)
  await db.run(sql`DROP TABLE \`events_blocks_logo_strip_logos\`;`)
  await db.run(sql`DROP TABLE \`events_blocks_logo_strip\`;`)
  await db.run(sql`DROP TABLE \`events_blocks_logo_strip_locales\`;`)
  await db.run(sql`DROP TABLE \`events_blocks_faq_items\`;`)
  await db.run(sql`DROP TABLE \`events_blocks_faq_items_locales\`;`)
  await db.run(sql`DROP TABLE \`events_blocks_embed\`;`)
  await db.run(sql`DROP TABLE \`events_blocks_embed_locales\`;`)
  await db.run(sql`DROP TABLE \`events_blocks_spacer\`;`)
  await db.run(sql`DROP TABLE \`events_blocks_reusable\`;`)
  await db.run(sql`DROP TABLE \`_events_v_blocks_offer_spotlight\`;`)
  await db.run(sql`DROP TABLE \`_events_v_blocks_offer_spotlight_locales\`;`)
  await db.run(sql`DROP TABLE \`_events_v_blocks_rides_list\`;`)
  await db.run(sql`DROP TABLE \`_events_v_blocks_rides_list_locales\`;`)
  await db.run(sql`DROP TABLE \`_events_v_blocks_venues_grid\`;`)
  await db.run(sql`DROP TABLE \`_events_v_blocks_venues_grid_locales\`;`)
  await db.run(sql`DROP TABLE \`_events_v_blocks_map\`;`)
  await db.run(sql`DROP TABLE \`_events_v_blocks_map_locales\`;`)
  await db.run(sql`DROP TABLE \`_events_v_blocks_columns_items\`;`)
  await db.run(sql`DROP TABLE \`_events_v_blocks_columns_items_locales\`;`)
  await db.run(sql`DROP TABLE \`_events_v_blocks_columns\`;`)
  await db.run(sql`DROP TABLE \`_events_v_blocks_columns_locales\`;`)
  await db.run(sql`DROP TABLE \`_events_v_blocks_video\`;`)
  await db.run(sql`DROP TABLE \`_events_v_blocks_video_locales\`;`)
  await db.run(sql`DROP TABLE \`_events_v_blocks_testimonials_items\`;`)
  await db.run(sql`DROP TABLE \`_events_v_blocks_testimonials_items_locales\`;`)
  await db.run(sql`DROP TABLE \`_events_v_blocks_testimonials\`;`)
  await db.run(sql`DROP TABLE \`_events_v_blocks_testimonials_locales\`;`)
  await db.run(sql`DROP TABLE \`_events_v_blocks_logo_strip_logos\`;`)
  await db.run(sql`DROP TABLE \`_events_v_blocks_logo_strip\`;`)
  await db.run(sql`DROP TABLE \`_events_v_blocks_logo_strip_locales\`;`)
  await db.run(sql`DROP TABLE \`_events_v_blocks_faq_items\`;`)
  await db.run(sql`DROP TABLE \`_events_v_blocks_faq_items_locales\`;`)
  await db.run(sql`DROP TABLE \`_events_v_blocks_embed\`;`)
  await db.run(sql`DROP TABLE \`_events_v_blocks_embed_locales\`;`)
  await db.run(sql`DROP TABLE \`_events_v_blocks_spacer\`;`)
  await db.run(sql`DROP TABLE \`_events_v_blocks_reusable\`;`)
  await db.run(sql`DROP TABLE \`worlds_blocks_offer_spotlight\`;`)
  await db.run(sql`DROP TABLE \`worlds_blocks_offer_spotlight_locales\`;`)
  await db.run(sql`DROP TABLE \`worlds_blocks_rides_list\`;`)
  await db.run(sql`DROP TABLE \`worlds_blocks_rides_list_locales\`;`)
  await db.run(sql`DROP TABLE \`worlds_blocks_venues_grid\`;`)
  await db.run(sql`DROP TABLE \`worlds_blocks_venues_grid_locales\`;`)
  await db.run(sql`DROP TABLE \`worlds_blocks_map\`;`)
  await db.run(sql`DROP TABLE \`worlds_blocks_map_locales\`;`)
  await db.run(sql`DROP TABLE \`worlds_blocks_columns_items\`;`)
  await db.run(sql`DROP TABLE \`worlds_blocks_columns_items_locales\`;`)
  await db.run(sql`DROP TABLE \`worlds_blocks_columns\`;`)
  await db.run(sql`DROP TABLE \`worlds_blocks_columns_locales\`;`)
  await db.run(sql`DROP TABLE \`worlds_blocks_video\`;`)
  await db.run(sql`DROP TABLE \`worlds_blocks_video_locales\`;`)
  await db.run(sql`DROP TABLE \`worlds_blocks_testimonials_items\`;`)
  await db.run(sql`DROP TABLE \`worlds_blocks_testimonials_items_locales\`;`)
  await db.run(sql`DROP TABLE \`worlds_blocks_testimonials\`;`)
  await db.run(sql`DROP TABLE \`worlds_blocks_testimonials_locales\`;`)
  await db.run(sql`DROP TABLE \`worlds_blocks_logo_strip_logos\`;`)
  await db.run(sql`DROP TABLE \`worlds_blocks_logo_strip\`;`)
  await db.run(sql`DROP TABLE \`worlds_blocks_logo_strip_locales\`;`)
  await db.run(sql`DROP TABLE \`worlds_blocks_faq_items\`;`)
  await db.run(sql`DROP TABLE \`worlds_blocks_faq_items_locales\`;`)
  await db.run(sql`DROP TABLE \`worlds_blocks_embed\`;`)
  await db.run(sql`DROP TABLE \`worlds_blocks_embed_locales\`;`)
  await db.run(sql`DROP TABLE \`worlds_blocks_spacer\`;`)
  await db.run(sql`DROP TABLE \`worlds_blocks_reusable\`;`)
  await db.run(sql`DROP TABLE \`sections_blocks_hero_slides\`;`)
  await db.run(sql`DROP TABLE \`sections_blocks_hero_slides_locales\`;`)
  await db.run(sql`DROP TABLE \`sections_blocks_hero\`;`)
  await db.run(sql`DROP TABLE \`sections_blocks_ticker_items\`;`)
  await db.run(sql`DROP TABLE \`sections_blocks_ticker_items_locales\`;`)
  await db.run(sql`DROP TABLE \`sections_blocks_ticker\`;`)
  await db.run(sql`DROP TABLE \`sections_blocks_offer_spotlight\`;`)
  await db.run(sql`DROP TABLE \`sections_blocks_offer_spotlight_locales\`;`)
  await db.run(sql`DROP TABLE \`sections_blocks_countdown\`;`)
  await db.run(sql`DROP TABLE \`sections_blocks_countdown_locales\`;`)
  await db.run(sql`DROP TABLE \`sections_blocks_cta_band\`;`)
  await db.run(sql`DROP TABLE \`sections_blocks_cta_band_locales\`;`)
  await db.run(sql`DROP TABLE \`sections_blocks_ticket_cards\`;`)
  await db.run(sql`DROP TABLE \`sections_blocks_ticket_cards_locales\`;`)
  await db.run(sql`DROP TABLE \`sections_blocks_offer_grid\`;`)
  await db.run(sql`DROP TABLE \`sections_blocks_offer_grid_locales\`;`)
  await db.run(sql`DROP TABLE \`sections_blocks_worlds_grid\`;`)
  await db.run(sql`DROP TABLE \`sections_blocks_worlds_grid_locales\`;`)
  await db.run(sql`DROP TABLE \`sections_blocks_rides_list\`;`)
  await db.run(sql`DROP TABLE \`sections_blocks_rides_list_locales\`;`)
  await db.run(sql`DROP TABLE \`sections_blocks_events_rail\`;`)
  await db.run(sql`DROP TABLE \`sections_blocks_events_rail_locales\`;`)
  await db.run(sql`DROP TABLE \`sections_blocks_today_status\`;`)
  await db.run(sql`DROP TABLE \`sections_blocks_today_status_locales\`;`)
  await db.run(sql`DROP TABLE \`sections_blocks_crew_planner\`;`)
  await db.run(sql`DROP TABLE \`sections_blocks_crew_planner_locales\`;`)
  await db.run(sql`DROP TABLE \`sections_blocks_venues_grid\`;`)
  await db.run(sql`DROP TABLE \`sections_blocks_venues_grid_locales\`;`)
  await db.run(sql`DROP TABLE \`sections_blocks_map\`;`)
  await db.run(sql`DROP TABLE \`sections_blocks_map_locales\`;`)
  await db.run(sql`DROP TABLE \`sections_blocks_stats_items\`;`)
  await db.run(sql`DROP TABLE \`sections_blocks_stats_items_locales\`;`)
  await db.run(sql`DROP TABLE \`sections_blocks_stats\`;`)
  await db.run(sql`DROP TABLE \`sections_blocks_stats_locales\`;`)
  await db.run(sql`DROP TABLE \`sections_blocks_image_text\`;`)
  await db.run(sql`DROP TABLE \`sections_blocks_image_text_locales\`;`)
  await db.run(sql`DROP TABLE \`sections_blocks_columns_items\`;`)
  await db.run(sql`DROP TABLE \`sections_blocks_columns_items_locales\`;`)
  await db.run(sql`DROP TABLE \`sections_blocks_columns\`;`)
  await db.run(sql`DROP TABLE \`sections_blocks_columns_locales\`;`)
  await db.run(sql`DROP TABLE \`sections_blocks_rich_text\`;`)
  await db.run(sql`DROP TABLE \`sections_blocks_rich_text_locales\`;`)
  await db.run(sql`DROP TABLE \`sections_blocks_video\`;`)
  await db.run(sql`DROP TABLE \`sections_blocks_video_locales\`;`)
  await db.run(sql`DROP TABLE \`sections_blocks_gallery\`;`)
  await db.run(sql`DROP TABLE \`sections_blocks_gallery_locales\`;`)
  await db.run(sql`DROP TABLE \`sections_blocks_testimonials_items\`;`)
  await db.run(sql`DROP TABLE \`sections_blocks_testimonials_items_locales\`;`)
  await db.run(sql`DROP TABLE \`sections_blocks_testimonials\`;`)
  await db.run(sql`DROP TABLE \`sections_blocks_testimonials_locales\`;`)
  await db.run(sql`DROP TABLE \`sections_blocks_logo_strip_logos\`;`)
  await db.run(sql`DROP TABLE \`sections_blocks_logo_strip\`;`)
  await db.run(sql`DROP TABLE \`sections_blocks_logo_strip_locales\`;`)
  await db.run(sql`DROP TABLE \`sections_blocks_faq_items\`;`)
  await db.run(sql`DROP TABLE \`sections_blocks_faq_items_locales\`;`)
  await db.run(sql`DROP TABLE \`sections_blocks_faq\`;`)
  await db.run(sql`DROP TABLE \`sections_blocks_faq_locales\`;`)
  await db.run(sql`DROP TABLE \`sections_blocks_lead_form\`;`)
  await db.run(sql`DROP TABLE \`sections_blocks_lead_form_locales\`;`)
  await db.run(sql`DROP TABLE \`sections_blocks_moments_wall\`;`)
  await db.run(sql`DROP TABLE \`sections_blocks_moments_wall_locales\`;`)
  await db.run(sql`DROP TABLE \`sections_blocks_journal_teaser\`;`)
  await db.run(sql`DROP TABLE \`sections_blocks_journal_teaser_locales\`;`)
  await db.run(sql`DROP TABLE \`sections_blocks_embed\`;`)
  await db.run(sql`DROP TABLE \`sections_blocks_embed_locales\`;`)
  await db.run(sql`DROP TABLE \`sections_blocks_spacer\`;`)
  await db.run(sql`DROP TABLE \`sections\`;`)
  await db.run(sql`DROP TABLE \`sections_rels\`;`)
  await db.run(sql`DROP TABLE \`_sections_v_blocks_hero_slides\`;`)
  await db.run(sql`DROP TABLE \`_sections_v_blocks_hero_slides_locales\`;`)
  await db.run(sql`DROP TABLE \`_sections_v_blocks_hero\`;`)
  await db.run(sql`DROP TABLE \`_sections_v_blocks_ticker_items\`;`)
  await db.run(sql`DROP TABLE \`_sections_v_blocks_ticker_items_locales\`;`)
  await db.run(sql`DROP TABLE \`_sections_v_blocks_ticker\`;`)
  await db.run(sql`DROP TABLE \`_sections_v_blocks_offer_spotlight\`;`)
  await db.run(sql`DROP TABLE \`_sections_v_blocks_offer_spotlight_locales\`;`)
  await db.run(sql`DROP TABLE \`_sections_v_blocks_countdown\`;`)
  await db.run(sql`DROP TABLE \`_sections_v_blocks_countdown_locales\`;`)
  await db.run(sql`DROP TABLE \`_sections_v_blocks_cta_band\`;`)
  await db.run(sql`DROP TABLE \`_sections_v_blocks_cta_band_locales\`;`)
  await db.run(sql`DROP TABLE \`_sections_v_blocks_ticket_cards\`;`)
  await db.run(sql`DROP TABLE \`_sections_v_blocks_ticket_cards_locales\`;`)
  await db.run(sql`DROP TABLE \`_sections_v_blocks_offer_grid\`;`)
  await db.run(sql`DROP TABLE \`_sections_v_blocks_offer_grid_locales\`;`)
  await db.run(sql`DROP TABLE \`_sections_v_blocks_worlds_grid\`;`)
  await db.run(sql`DROP TABLE \`_sections_v_blocks_worlds_grid_locales\`;`)
  await db.run(sql`DROP TABLE \`_sections_v_blocks_rides_list\`;`)
  await db.run(sql`DROP TABLE \`_sections_v_blocks_rides_list_locales\`;`)
  await db.run(sql`DROP TABLE \`_sections_v_blocks_events_rail\`;`)
  await db.run(sql`DROP TABLE \`_sections_v_blocks_events_rail_locales\`;`)
  await db.run(sql`DROP TABLE \`_sections_v_blocks_today_status\`;`)
  await db.run(sql`DROP TABLE \`_sections_v_blocks_today_status_locales\`;`)
  await db.run(sql`DROP TABLE \`_sections_v_blocks_crew_planner\`;`)
  await db.run(sql`DROP TABLE \`_sections_v_blocks_crew_planner_locales\`;`)
  await db.run(sql`DROP TABLE \`_sections_v_blocks_venues_grid\`;`)
  await db.run(sql`DROP TABLE \`_sections_v_blocks_venues_grid_locales\`;`)
  await db.run(sql`DROP TABLE \`_sections_v_blocks_map\`;`)
  await db.run(sql`DROP TABLE \`_sections_v_blocks_map_locales\`;`)
  await db.run(sql`DROP TABLE \`_sections_v_blocks_stats_items\`;`)
  await db.run(sql`DROP TABLE \`_sections_v_blocks_stats_items_locales\`;`)
  await db.run(sql`DROP TABLE \`_sections_v_blocks_stats\`;`)
  await db.run(sql`DROP TABLE \`_sections_v_blocks_stats_locales\`;`)
  await db.run(sql`DROP TABLE \`_sections_v_blocks_image_text\`;`)
  await db.run(sql`DROP TABLE \`_sections_v_blocks_image_text_locales\`;`)
  await db.run(sql`DROP TABLE \`_sections_v_blocks_columns_items\`;`)
  await db.run(sql`DROP TABLE \`_sections_v_blocks_columns_items_locales\`;`)
  await db.run(sql`DROP TABLE \`_sections_v_blocks_columns\`;`)
  await db.run(sql`DROP TABLE \`_sections_v_blocks_columns_locales\`;`)
  await db.run(sql`DROP TABLE \`_sections_v_blocks_rich_text\`;`)
  await db.run(sql`DROP TABLE \`_sections_v_blocks_rich_text_locales\`;`)
  await db.run(sql`DROP TABLE \`_sections_v_blocks_video\`;`)
  await db.run(sql`DROP TABLE \`_sections_v_blocks_video_locales\`;`)
  await db.run(sql`DROP TABLE \`_sections_v_blocks_gallery\`;`)
  await db.run(sql`DROP TABLE \`_sections_v_blocks_gallery_locales\`;`)
  await db.run(sql`DROP TABLE \`_sections_v_blocks_testimonials_items\`;`)
  await db.run(sql`DROP TABLE \`_sections_v_blocks_testimonials_items_locales\`;`)
  await db.run(sql`DROP TABLE \`_sections_v_blocks_testimonials\`;`)
  await db.run(sql`DROP TABLE \`_sections_v_blocks_testimonials_locales\`;`)
  await db.run(sql`DROP TABLE \`_sections_v_blocks_logo_strip_logos\`;`)
  await db.run(sql`DROP TABLE \`_sections_v_blocks_logo_strip\`;`)
  await db.run(sql`DROP TABLE \`_sections_v_blocks_logo_strip_locales\`;`)
  await db.run(sql`DROP TABLE \`_sections_v_blocks_faq_items\`;`)
  await db.run(sql`DROP TABLE \`_sections_v_blocks_faq_items_locales\`;`)
  await db.run(sql`DROP TABLE \`_sections_v_blocks_faq\`;`)
  await db.run(sql`DROP TABLE \`_sections_v_blocks_faq_locales\`;`)
  await db.run(sql`DROP TABLE \`_sections_v_blocks_lead_form\`;`)
  await db.run(sql`DROP TABLE \`_sections_v_blocks_lead_form_locales\`;`)
  await db.run(sql`DROP TABLE \`_sections_v_blocks_moments_wall\`;`)
  await db.run(sql`DROP TABLE \`_sections_v_blocks_moments_wall_locales\`;`)
  await db.run(sql`DROP TABLE \`_sections_v_blocks_journal_teaser\`;`)
  await db.run(sql`DROP TABLE \`_sections_v_blocks_journal_teaser_locales\`;`)
  await db.run(sql`DROP TABLE \`_sections_v_blocks_embed\`;`)
  await db.run(sql`DROP TABLE \`_sections_v_blocks_embed_locales\`;`)
  await db.run(sql`DROP TABLE \`_sections_v_blocks_spacer\`;`)
  await db.run(sql`DROP TABLE \`_sections_v\`;`)
  await db.run(sql`DROP TABLE \`_sections_v_rels\`;`)
  await db.run(sql`DROP TABLE \`redirects\`;`)
  await db.run(sql`DROP TABLE \`webhooks_events\`;`)
  await db.run(sql`DROP TABLE \`webhooks\`;`)
  await db.run(sql`DROP TABLE \`roles\`;`)
  await db.run(sql`DROP TABLE \`payload_folders_folder_type\`;`)
  await db.run(sql`DROP TABLE \`payload_folders\`;`)
  await db.run(sql`DROP TABLE \`site_settings_same_as\`;`)
  await db.run(sql`DROP TABLE \`theme\`;`)
  await db.run(sql`DROP TABLE \`_theme_v\`;`)
  await db.run(sql`DROP TABLE \`header_announcements\`;`)
  await db.run(sql`DROP TABLE \`header_announcements_locales\`;`)
  await db.run(sql`DROP TABLE \`_header_v_version_nav\`;`)
  await db.run(sql`DROP TABLE \`_header_v_version_nav_locales\`;`)
  await db.run(sql`DROP TABLE \`_header_v_version_more_sheet\`;`)
  await db.run(sql`DROP TABLE \`_header_v_version_more_sheet_locales\`;`)
  await db.run(sql`DROP TABLE \`_header_v_version_announcements\`;`)
  await db.run(sql`DROP TABLE \`_header_v_version_announcements_locales\`;`)
  await db.run(sql`DROP TABLE \`_header_v\`;`)
  await db.run(sql`DROP TABLE \`_header_v_locales\`;`)
  await db.run(sql`DROP TABLE \`_footer_v_version_columns_links\`;`)
  await db.run(sql`DROP TABLE \`_footer_v_version_columns_links_locales\`;`)
  await db.run(sql`DROP TABLE \`_footer_v_version_columns\`;`)
  await db.run(sql`DROP TABLE \`_footer_v_version_columns_locales\`;`)
  await db.run(sql`DROP TABLE \`_footer_v_version_legal\`;`)
  await db.run(sql`DROP TABLE \`_footer_v_version_legal_locales\`;`)
  await db.run(sql`DROP TABLE \`_footer_v\`;`)
  await db.run(sql`DROP TABLE \`_footer_v_locales\`;`)
  await db.run(sql`DROP TABLE \`tracking\`;`)
  await db.run(sql`DROP TABLE \`integrations\`;`)
  await db.run(sql`DROP TABLE \`email_routes\`;`)
  await db.run(sql`DROP TABLE \`email\`;`)
  await db.run(sql`DROP TABLE \`assistant_suggestions\`;`)
  await db.run(sql`DROP TABLE \`assistant_suggestions_locales\`;`)
  await db.run(sql`DROP TABLE \`assistant\`;`)
  await db.run(sql`DROP TABLE \`assistant_locales\`;`)
  await db.run(sql`PRAGMA foreign_keys=OFF;`)
  await db.run(sql`CREATE TABLE \`__new_media\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`credit\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`url\` text,
  	\`thumbnail_u_r_l\` text,
  	\`filename\` text,
  	\`mime_type\` text,
  	\`filesize\` numeric,
  	\`width\` numeric,
  	\`height\` numeric,
  	\`focal_x\` numeric,
  	\`focal_y\` numeric
  );
  `)
  await db.run(sql`INSERT INTO \`__new_media\`("id", "credit", "updated_at", "created_at", "url", "thumbnail_u_r_l", "filename", "mime_type", "filesize", "width", "height", "focal_x", "focal_y") SELECT "id", "credit", "updated_at", "created_at", "url", "thumbnail_u_r_l", "filename", "mime_type", "filesize", "width", "height", "focal_x", "focal_y" FROM \`media\`;`)
  await db.run(sql`DROP TABLE \`media\`;`)
  await db.run(sql`ALTER TABLE \`__new_media\` RENAME TO \`media\`;`)
  await db.run(sql`PRAGMA foreign_keys=ON;`)
  await db.run(sql`CREATE INDEX \`media_updated_at_idx\` ON \`media\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`media_created_at_idx\` ON \`media\` (\`created_at\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`media_filename_idx\` ON \`media\` (\`filename\`);`)
  await db.run(sql`CREATE TABLE \`__new_users\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`role\` text DEFAULT 'editor' NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`email\` text NOT NULL,
  	\`reset_password_token\` text,
  	\`reset_password_expiration\` text,
  	\`salt\` text,
  	\`hash\` text,
  	\`reset_password_requested_at\` text,
  	\`login_attempts\` numeric DEFAULT 0,
  	\`lock_until\` text
  );
  `)
  await db.run(sql`INSERT INTO \`__new_users\`("id", "name", "role", "updated_at", "created_at", "email", "reset_password_token", "reset_password_expiration", "salt", "hash", "reset_password_requested_at", "login_attempts", "lock_until") SELECT "id", "name", "role", "updated_at", "created_at", "email", "reset_password_token", "reset_password_expiration", "salt", "hash", "reset_password_requested_at", "login_attempts", "lock_until" FROM \`users\`;`)
  await db.run(sql`DROP TABLE \`users\`;`)
  await db.run(sql`ALTER TABLE \`__new_users\` RENAME TO \`users\`;`)
  await db.run(sql`CREATE INDEX \`users_updated_at_idx\` ON \`users\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`users_created_at_idx\` ON \`users\` (\`created_at\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`users_email_idx\` ON \`users\` (\`email\`);`)
  await db.run(sql`CREATE TABLE \`__new_payload_locked_documents_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`pages_id\` integer,
  	\`offers_id\` integer,
  	\`events_id\` integer,
  	\`posts_id\` integer,
  	\`tickets_id\` integer,
  	\`extras_id\` integer,
  	\`worlds_id\` integer,
  	\`rides_id\` integer,
  	\`faqs_id\` integer,
  	\`crews_id\` integer,
  	\`moments_id\` integer,
  	\`venues_id\` integer,
  	\`occasions_id\` integer,
  	\`audit_log_id\` integer,
  	\`media_id\` integer,
  	\`translations_id\` integer,
  	\`users_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`payload_locked_documents\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`pages_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`offers_id\`) REFERENCES \`offers\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`events_id\`) REFERENCES \`events\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`posts_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`tickets_id\`) REFERENCES \`tickets\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`extras_id\`) REFERENCES \`extras\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`worlds_id\`) REFERENCES \`worlds\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`rides_id\`) REFERENCES \`rides\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`faqs_id\`) REFERENCES \`faqs\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`crews_id\`) REFERENCES \`crews\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`moments_id\`) REFERENCES \`moments\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`venues_id\`) REFERENCES \`venues\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`occasions_id\`) REFERENCES \`occasions\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`audit_log_id\`) REFERENCES \`audit_log\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`translations_id\`) REFERENCES \`translations\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_payload_locked_documents_rels\`("id", "order", "parent_id", "path", "pages_id", "offers_id", "events_id", "posts_id", "tickets_id", "extras_id", "worlds_id", "rides_id", "faqs_id", "crews_id", "moments_id", "venues_id", "occasions_id", "audit_log_id", "media_id", "translations_id", "users_id") SELECT "id", "order", "parent_id", "path", "pages_id", "offers_id", "events_id", "posts_id", "tickets_id", "extras_id", "worlds_id", "rides_id", "faqs_id", "crews_id", "moments_id", "venues_id", "occasions_id", "audit_log_id", "media_id", "translations_id", "users_id" FROM \`payload_locked_documents_rels\`;`)
  await db.run(sql`DROP TABLE \`payload_locked_documents_rels\`;`)
  await db.run(sql`ALTER TABLE \`__new_payload_locked_documents_rels\` RENAME TO \`payload_locked_documents_rels\`;`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_order_idx\` ON \`payload_locked_documents_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_parent_idx\` ON \`payload_locked_documents_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_path_idx\` ON \`payload_locked_documents_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_pages_id_idx\` ON \`payload_locked_documents_rels\` (\`pages_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_offers_id_idx\` ON \`payload_locked_documents_rels\` (\`offers_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_events_id_idx\` ON \`payload_locked_documents_rels\` (\`events_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_posts_id_idx\` ON \`payload_locked_documents_rels\` (\`posts_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_tickets_id_idx\` ON \`payload_locked_documents_rels\` (\`tickets_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_extras_id_idx\` ON \`payload_locked_documents_rels\` (\`extras_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_worlds_id_idx\` ON \`payload_locked_documents_rels\` (\`worlds_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_rides_id_idx\` ON \`payload_locked_documents_rels\` (\`rides_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_faqs_id_idx\` ON \`payload_locked_documents_rels\` (\`faqs_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_crews_id_idx\` ON \`payload_locked_documents_rels\` (\`crews_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_moments_id_idx\` ON \`payload_locked_documents_rels\` (\`moments_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_venues_id_idx\` ON \`payload_locked_documents_rels\` (\`venues_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_occasions_id_idx\` ON \`payload_locked_documents_rels\` (\`occasions_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_audit_log_id_idx\` ON \`payload_locked_documents_rels\` (\`audit_log_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_media_id_idx\` ON \`payload_locked_documents_rels\` (\`media_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_translations_id_idx\` ON \`payload_locked_documents_rels\` (\`translations_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_users_id_idx\` ON \`payload_locked_documents_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`__new_header\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`buy_href\` text NOT NULL,
  	\`updated_at\` text,
  	\`created_at\` text
  );
  `)
  await db.run(sql`INSERT INTO \`__new_header\`("id", "buy_href", "updated_at", "created_at") SELECT "id", "buy_href", "updated_at", "created_at" FROM \`header\`;`)
  await db.run(sql`DROP TABLE \`header\`;`)
  await db.run(sql`ALTER TABLE \`__new_header\` RENAME TO \`header\`;`)
  await db.run(sql`DROP INDEX \`footer__status_idx\`;`)
  await db.run(sql`ALTER TABLE \`footer\` DROP COLUMN \`_status\`;`)
  await db.run(sql`CREATE TABLE \`__new_media_locales\` (
  	\`alt\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_media_locales\`("alt", "id", "_locale", "_parent_id") SELECT "alt", "id", "_locale", "_parent_id" FROM \`media_locales\`;`)
  await db.run(sql`DROP TABLE \`media_locales\`;`)
  await db.run(sql`ALTER TABLE \`__new_media_locales\` RENAME TO \`media_locales\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`media_locales_locale_parent_id_unique\` ON \`media_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`__new_header_nav\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`href\` text NOT NULL,
  	\`wide_only\` integer,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`header\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_header_nav\`("_order", "_parent_id", "id", "href", "wide_only") SELECT "_order", "_parent_id", "id", "href", "wide_only" FROM \`header_nav\`;`)
  await db.run(sql`DROP TABLE \`header_nav\`;`)
  await db.run(sql`ALTER TABLE \`__new_header_nav\` RENAME TO \`header_nav\`;`)
  await db.run(sql`CREATE INDEX \`header_nav_order_idx\` ON \`header_nav\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`header_nav_parent_id_idx\` ON \`header_nav\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`__new_header_nav_locales\` (
  	\`label\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`header_nav\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_header_nav_locales\`("label", "id", "_locale", "_parent_id") SELECT "label", "id", "_locale", "_parent_id" FROM \`header_nav_locales\`;`)
  await db.run(sql`DROP TABLE \`header_nav_locales\`;`)
  await db.run(sql`ALTER TABLE \`__new_header_nav_locales\` RENAME TO \`header_nav_locales\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`header_nav_locales_locale_parent_id_unique\` ON \`header_nav_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`__new_header_more_sheet\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`href\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`header\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_header_more_sheet\`("_order", "_parent_id", "id", "href") SELECT "_order", "_parent_id", "id", "href" FROM \`header_more_sheet\`;`)
  await db.run(sql`DROP TABLE \`header_more_sheet\`;`)
  await db.run(sql`ALTER TABLE \`__new_header_more_sheet\` RENAME TO \`header_more_sheet\`;`)
  await db.run(sql`CREATE INDEX \`header_more_sheet_order_idx\` ON \`header_more_sheet\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`header_more_sheet_parent_id_idx\` ON \`header_more_sheet\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`__new_header_more_sheet_locales\` (
  	\`label\` text NOT NULL,
  	\`badge\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`header_more_sheet\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_header_more_sheet_locales\`("label", "badge", "id", "_locale", "_parent_id") SELECT "label", "badge", "id", "_locale", "_parent_id" FROM \`header_more_sheet_locales\`;`)
  await db.run(sql`DROP TABLE \`header_more_sheet_locales\`;`)
  await db.run(sql`ALTER TABLE \`__new_header_more_sheet_locales\` RENAME TO \`header_more_sheet_locales\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`header_more_sheet_locales_locale_parent_id_unique\` ON \`header_more_sheet_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`__new_header_locales\` (
  	\`buy_label\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`header\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_header_locales\`("buy_label", "id", "_locale", "_parent_id") SELECT "buy_label", "id", "_locale", "_parent_id" FROM \`header_locales\`;`)
  await db.run(sql`DROP TABLE \`header_locales\`;`)
  await db.run(sql`ALTER TABLE \`__new_header_locales\` RENAME TO \`header_locales\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`header_locales_locale_parent_id_unique\` ON \`header_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`ALTER TABLE \`site_settings\` ADD \`gtm_id\` text;`)
  await db.run(sql`ALTER TABLE \`site_settings\` DROP COLUMN \`geo_lat\`;`)
  await db.run(sql`ALTER TABLE \`site_settings\` DROP COLUMN \`geo_lng\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_hero\` DROP COLUMN \`display_hidden\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_hero\` DROP COLUMN \`display_show_on\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_hero\` DROP COLUMN \`display_anchor\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_hero\` DROP COLUMN \`display_show_from\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_hero\` DROP COLUMN \`display_show_until\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_ticker\` DROP COLUMN \`display_hidden\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_ticker\` DROP COLUMN \`display_show_on\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_ticker\` DROP COLUMN \`display_anchor\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_ticker\` DROP COLUMN \`display_show_from\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_ticker\` DROP COLUMN \`display_show_until\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_countdown\` DROP COLUMN \`display_hidden\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_countdown\` DROP COLUMN \`display_show_on\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_countdown\` DROP COLUMN \`display_anchor\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_countdown\` DROP COLUMN \`display_show_from\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_countdown\` DROP COLUMN \`display_show_until\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_cta_band\` DROP COLUMN \`display_hidden\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_cta_band\` DROP COLUMN \`display_show_on\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_cta_band\` DROP COLUMN \`display_anchor\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_cta_band\` DROP COLUMN \`display_show_from\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_cta_band\` DROP COLUMN \`display_show_until\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_ticket_cards\` DROP COLUMN \`display_hidden\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_ticket_cards\` DROP COLUMN \`display_show_on\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_ticket_cards\` DROP COLUMN \`display_anchor\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_ticket_cards\` DROP COLUMN \`display_show_from\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_ticket_cards\` DROP COLUMN \`display_show_until\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_offer_grid\` DROP COLUMN \`display_hidden\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_offer_grid\` DROP COLUMN \`display_show_on\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_offer_grid\` DROP COLUMN \`display_anchor\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_offer_grid\` DROP COLUMN \`display_show_from\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_offer_grid\` DROP COLUMN \`display_show_until\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_worlds_grid\` DROP COLUMN \`display_hidden\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_worlds_grid\` DROP COLUMN \`display_show_on\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_worlds_grid\` DROP COLUMN \`display_anchor\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_worlds_grid\` DROP COLUMN \`display_show_from\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_worlds_grid\` DROP COLUMN \`display_show_until\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_events_rail\` DROP COLUMN \`display_hidden\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_events_rail\` DROP COLUMN \`display_show_on\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_events_rail\` DROP COLUMN \`display_anchor\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_events_rail\` DROP COLUMN \`display_show_from\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_events_rail\` DROP COLUMN \`display_show_until\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_today_status\` DROP COLUMN \`display_hidden\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_today_status\` DROP COLUMN \`display_show_on\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_today_status\` DROP COLUMN \`display_anchor\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_today_status\` DROP COLUMN \`display_show_from\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_today_status\` DROP COLUMN \`display_show_until\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_crew_planner\` DROP COLUMN \`display_hidden\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_crew_planner\` DROP COLUMN \`display_show_on\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_crew_planner\` DROP COLUMN \`display_anchor\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_crew_planner\` DROP COLUMN \`display_show_from\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_crew_planner\` DROP COLUMN \`display_show_until\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_stats\` DROP COLUMN \`display_hidden\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_stats\` DROP COLUMN \`display_show_on\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_stats\` DROP COLUMN \`display_anchor\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_stats\` DROP COLUMN \`display_show_from\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_stats\` DROP COLUMN \`display_show_until\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_image_text\` DROP COLUMN \`display_hidden\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_image_text\` DROP COLUMN \`display_show_on\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_image_text\` DROP COLUMN \`display_anchor\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_image_text\` DROP COLUMN \`display_show_from\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_image_text\` DROP COLUMN \`display_show_until\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_rich_text\` DROP COLUMN \`display_hidden\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_rich_text\` DROP COLUMN \`display_show_on\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_rich_text\` DROP COLUMN \`display_anchor\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_rich_text\` DROP COLUMN \`display_show_from\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_rich_text\` DROP COLUMN \`display_show_until\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_gallery\` DROP COLUMN \`display_hidden\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_gallery\` DROP COLUMN \`display_show_on\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_gallery\` DROP COLUMN \`display_anchor\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_gallery\` DROP COLUMN \`display_show_from\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_gallery\` DROP COLUMN \`display_show_until\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_faq\` DROP COLUMN \`display_hidden\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_faq\` DROP COLUMN \`display_show_on\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_faq\` DROP COLUMN \`display_anchor\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_faq\` DROP COLUMN \`display_show_from\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_faq\` DROP COLUMN \`display_show_until\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_lead_form\` DROP COLUMN \`display_hidden\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_lead_form\` DROP COLUMN \`display_show_on\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_lead_form\` DROP COLUMN \`display_anchor\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_lead_form\` DROP COLUMN \`display_show_from\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_lead_form\` DROP COLUMN \`display_show_until\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_moments_wall\` DROP COLUMN \`display_hidden\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_moments_wall\` DROP COLUMN \`display_show_on\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_moments_wall\` DROP COLUMN \`display_anchor\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_moments_wall\` DROP COLUMN \`display_show_from\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_moments_wall\` DROP COLUMN \`display_show_until\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_journal_teaser\` DROP COLUMN \`display_hidden\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_journal_teaser\` DROP COLUMN \`display_show_on\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_journal_teaser\` DROP COLUMN \`display_anchor\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_journal_teaser\` DROP COLUMN \`display_show_from\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_journal_teaser\` DROP COLUMN \`display_show_until\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_hero\` DROP COLUMN \`display_hidden\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_hero\` DROP COLUMN \`display_show_on\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_hero\` DROP COLUMN \`display_anchor\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_hero\` DROP COLUMN \`display_show_from\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_hero\` DROP COLUMN \`display_show_until\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_ticker\` DROP COLUMN \`display_hidden\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_ticker\` DROP COLUMN \`display_show_on\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_ticker\` DROP COLUMN \`display_anchor\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_ticker\` DROP COLUMN \`display_show_from\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_ticker\` DROP COLUMN \`display_show_until\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_countdown\` DROP COLUMN \`display_hidden\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_countdown\` DROP COLUMN \`display_show_on\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_countdown\` DROP COLUMN \`display_anchor\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_countdown\` DROP COLUMN \`display_show_from\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_countdown\` DROP COLUMN \`display_show_until\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_cta_band\` DROP COLUMN \`display_hidden\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_cta_band\` DROP COLUMN \`display_show_on\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_cta_band\` DROP COLUMN \`display_anchor\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_cta_band\` DROP COLUMN \`display_show_from\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_cta_band\` DROP COLUMN \`display_show_until\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_ticket_cards\` DROP COLUMN \`display_hidden\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_ticket_cards\` DROP COLUMN \`display_show_on\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_ticket_cards\` DROP COLUMN \`display_anchor\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_ticket_cards\` DROP COLUMN \`display_show_from\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_ticket_cards\` DROP COLUMN \`display_show_until\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_offer_grid\` DROP COLUMN \`display_hidden\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_offer_grid\` DROP COLUMN \`display_show_on\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_offer_grid\` DROP COLUMN \`display_anchor\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_offer_grid\` DROP COLUMN \`display_show_from\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_offer_grid\` DROP COLUMN \`display_show_until\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_worlds_grid\` DROP COLUMN \`display_hidden\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_worlds_grid\` DROP COLUMN \`display_show_on\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_worlds_grid\` DROP COLUMN \`display_anchor\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_worlds_grid\` DROP COLUMN \`display_show_from\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_worlds_grid\` DROP COLUMN \`display_show_until\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_events_rail\` DROP COLUMN \`display_hidden\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_events_rail\` DROP COLUMN \`display_show_on\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_events_rail\` DROP COLUMN \`display_anchor\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_events_rail\` DROP COLUMN \`display_show_from\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_events_rail\` DROP COLUMN \`display_show_until\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_today_status\` DROP COLUMN \`display_hidden\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_today_status\` DROP COLUMN \`display_show_on\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_today_status\` DROP COLUMN \`display_anchor\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_today_status\` DROP COLUMN \`display_show_from\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_today_status\` DROP COLUMN \`display_show_until\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_crew_planner\` DROP COLUMN \`display_hidden\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_crew_planner\` DROP COLUMN \`display_show_on\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_crew_planner\` DROP COLUMN \`display_anchor\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_crew_planner\` DROP COLUMN \`display_show_from\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_crew_planner\` DROP COLUMN \`display_show_until\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_stats\` DROP COLUMN \`display_hidden\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_stats\` DROP COLUMN \`display_show_on\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_stats\` DROP COLUMN \`display_anchor\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_stats\` DROP COLUMN \`display_show_from\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_stats\` DROP COLUMN \`display_show_until\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_image_text\` DROP COLUMN \`display_hidden\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_image_text\` DROP COLUMN \`display_show_on\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_image_text\` DROP COLUMN \`display_anchor\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_image_text\` DROP COLUMN \`display_show_from\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_image_text\` DROP COLUMN \`display_show_until\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_rich_text\` DROP COLUMN \`display_hidden\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_rich_text\` DROP COLUMN \`display_show_on\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_rich_text\` DROP COLUMN \`display_anchor\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_rich_text\` DROP COLUMN \`display_show_from\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_rich_text\` DROP COLUMN \`display_show_until\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_gallery\` DROP COLUMN \`display_hidden\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_gallery\` DROP COLUMN \`display_show_on\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_gallery\` DROP COLUMN \`display_anchor\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_gallery\` DROP COLUMN \`display_show_from\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_gallery\` DROP COLUMN \`display_show_until\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_faq\` DROP COLUMN \`display_hidden\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_faq\` DROP COLUMN \`display_show_on\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_faq\` DROP COLUMN \`display_anchor\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_faq\` DROP COLUMN \`display_show_from\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_faq\` DROP COLUMN \`display_show_until\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_lead_form\` DROP COLUMN \`display_hidden\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_lead_form\` DROP COLUMN \`display_show_on\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_lead_form\` DROP COLUMN \`display_anchor\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_lead_form\` DROP COLUMN \`display_show_from\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_lead_form\` DROP COLUMN \`display_show_until\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_moments_wall\` DROP COLUMN \`display_hidden\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_moments_wall\` DROP COLUMN \`display_show_on\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_moments_wall\` DROP COLUMN \`display_anchor\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_moments_wall\` DROP COLUMN \`display_show_from\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_moments_wall\` DROP COLUMN \`display_show_until\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_journal_teaser\` DROP COLUMN \`display_hidden\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_journal_teaser\` DROP COLUMN \`display_show_on\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_journal_teaser\` DROP COLUMN \`display_anchor\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_journal_teaser\` DROP COLUMN \`display_show_from\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_journal_teaser\` DROP COLUMN \`display_show_until\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_hero\` DROP COLUMN \`display_hidden\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_hero\` DROP COLUMN \`display_show_on\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_hero\` DROP COLUMN \`display_anchor\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_hero\` DROP COLUMN \`display_show_from\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_hero\` DROP COLUMN \`display_show_until\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_ticker\` DROP COLUMN \`display_hidden\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_ticker\` DROP COLUMN \`display_show_on\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_ticker\` DROP COLUMN \`display_anchor\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_ticker\` DROP COLUMN \`display_show_from\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_ticker\` DROP COLUMN \`display_show_until\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_countdown\` DROP COLUMN \`display_hidden\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_countdown\` DROP COLUMN \`display_show_on\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_countdown\` DROP COLUMN \`display_anchor\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_countdown\` DROP COLUMN \`display_show_from\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_countdown\` DROP COLUMN \`display_show_until\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_cta_band\` DROP COLUMN \`display_hidden\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_cta_band\` DROP COLUMN \`display_show_on\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_cta_band\` DROP COLUMN \`display_anchor\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_cta_band\` DROP COLUMN \`display_show_from\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_cta_band\` DROP COLUMN \`display_show_until\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_ticket_cards\` DROP COLUMN \`display_hidden\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_ticket_cards\` DROP COLUMN \`display_show_on\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_ticket_cards\` DROP COLUMN \`display_anchor\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_ticket_cards\` DROP COLUMN \`display_show_from\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_ticket_cards\` DROP COLUMN \`display_show_until\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_offer_grid\` DROP COLUMN \`display_hidden\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_offer_grid\` DROP COLUMN \`display_show_on\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_offer_grid\` DROP COLUMN \`display_anchor\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_offer_grid\` DROP COLUMN \`display_show_from\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_offer_grid\` DROP COLUMN \`display_show_until\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_worlds_grid\` DROP COLUMN \`display_hidden\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_worlds_grid\` DROP COLUMN \`display_show_on\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_worlds_grid\` DROP COLUMN \`display_anchor\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_worlds_grid\` DROP COLUMN \`display_show_from\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_worlds_grid\` DROP COLUMN \`display_show_until\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_events_rail\` DROP COLUMN \`display_hidden\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_events_rail\` DROP COLUMN \`display_show_on\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_events_rail\` DROP COLUMN \`display_anchor\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_events_rail\` DROP COLUMN \`display_show_from\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_events_rail\` DROP COLUMN \`display_show_until\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_today_status\` DROP COLUMN \`display_hidden\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_today_status\` DROP COLUMN \`display_show_on\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_today_status\` DROP COLUMN \`display_anchor\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_today_status\` DROP COLUMN \`display_show_from\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_today_status\` DROP COLUMN \`display_show_until\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_crew_planner\` DROP COLUMN \`display_hidden\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_crew_planner\` DROP COLUMN \`display_show_on\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_crew_planner\` DROP COLUMN \`display_anchor\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_crew_planner\` DROP COLUMN \`display_show_from\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_crew_planner\` DROP COLUMN \`display_show_until\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_stats\` DROP COLUMN \`display_hidden\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_stats\` DROP COLUMN \`display_show_on\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_stats\` DROP COLUMN \`display_anchor\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_stats\` DROP COLUMN \`display_show_from\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_stats\` DROP COLUMN \`display_show_until\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_image_text\` DROP COLUMN \`display_hidden\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_image_text\` DROP COLUMN \`display_show_on\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_image_text\` DROP COLUMN \`display_anchor\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_image_text\` DROP COLUMN \`display_show_from\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_image_text\` DROP COLUMN \`display_show_until\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_rich_text\` DROP COLUMN \`display_hidden\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_rich_text\` DROP COLUMN \`display_show_on\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_rich_text\` DROP COLUMN \`display_anchor\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_rich_text\` DROP COLUMN \`display_show_from\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_rich_text\` DROP COLUMN \`display_show_until\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_gallery\` DROP COLUMN \`display_hidden\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_gallery\` DROP COLUMN \`display_show_on\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_gallery\` DROP COLUMN \`display_anchor\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_gallery\` DROP COLUMN \`display_show_from\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_gallery\` DROP COLUMN \`display_show_until\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_faq\` DROP COLUMN \`display_hidden\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_faq\` DROP COLUMN \`display_show_on\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_faq\` DROP COLUMN \`display_anchor\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_faq\` DROP COLUMN \`display_show_from\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_faq\` DROP COLUMN \`display_show_until\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_lead_form\` DROP COLUMN \`display_hidden\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_lead_form\` DROP COLUMN \`display_show_on\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_lead_form\` DROP COLUMN \`display_anchor\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_lead_form\` DROP COLUMN \`display_show_from\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_lead_form\` DROP COLUMN \`display_show_until\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_moments_wall\` DROP COLUMN \`display_hidden\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_moments_wall\` DROP COLUMN \`display_show_on\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_moments_wall\` DROP COLUMN \`display_anchor\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_moments_wall\` DROP COLUMN \`display_show_from\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_moments_wall\` DROP COLUMN \`display_show_until\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_journal_teaser\` DROP COLUMN \`display_hidden\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_journal_teaser\` DROP COLUMN \`display_show_on\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_journal_teaser\` DROP COLUMN \`display_anchor\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_journal_teaser\` DROP COLUMN \`display_show_from\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_journal_teaser\` DROP COLUMN \`display_show_until\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_hero\` DROP COLUMN \`display_hidden\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_hero\` DROP COLUMN \`display_show_on\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_hero\` DROP COLUMN \`display_anchor\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_hero\` DROP COLUMN \`display_show_from\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_hero\` DROP COLUMN \`display_show_until\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_ticker\` DROP COLUMN \`display_hidden\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_ticker\` DROP COLUMN \`display_show_on\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_ticker\` DROP COLUMN \`display_anchor\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_ticker\` DROP COLUMN \`display_show_from\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_ticker\` DROP COLUMN \`display_show_until\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_countdown\` DROP COLUMN \`display_hidden\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_countdown\` DROP COLUMN \`display_show_on\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_countdown\` DROP COLUMN \`display_anchor\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_countdown\` DROP COLUMN \`display_show_from\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_countdown\` DROP COLUMN \`display_show_until\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_cta_band\` DROP COLUMN \`display_hidden\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_cta_band\` DROP COLUMN \`display_show_on\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_cta_band\` DROP COLUMN \`display_anchor\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_cta_band\` DROP COLUMN \`display_show_from\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_cta_band\` DROP COLUMN \`display_show_until\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_ticket_cards\` DROP COLUMN \`display_hidden\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_ticket_cards\` DROP COLUMN \`display_show_on\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_ticket_cards\` DROP COLUMN \`display_anchor\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_ticket_cards\` DROP COLUMN \`display_show_from\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_ticket_cards\` DROP COLUMN \`display_show_until\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_offer_grid\` DROP COLUMN \`display_hidden\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_offer_grid\` DROP COLUMN \`display_show_on\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_offer_grid\` DROP COLUMN \`display_anchor\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_offer_grid\` DROP COLUMN \`display_show_from\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_offer_grid\` DROP COLUMN \`display_show_until\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_worlds_grid\` DROP COLUMN \`display_hidden\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_worlds_grid\` DROP COLUMN \`display_show_on\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_worlds_grid\` DROP COLUMN \`display_anchor\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_worlds_grid\` DROP COLUMN \`display_show_from\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_worlds_grid\` DROP COLUMN \`display_show_until\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_events_rail\` DROP COLUMN \`display_hidden\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_events_rail\` DROP COLUMN \`display_show_on\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_events_rail\` DROP COLUMN \`display_anchor\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_events_rail\` DROP COLUMN \`display_show_from\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_events_rail\` DROP COLUMN \`display_show_until\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_today_status\` DROP COLUMN \`display_hidden\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_today_status\` DROP COLUMN \`display_show_on\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_today_status\` DROP COLUMN \`display_anchor\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_today_status\` DROP COLUMN \`display_show_from\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_today_status\` DROP COLUMN \`display_show_until\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_crew_planner\` DROP COLUMN \`display_hidden\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_crew_planner\` DROP COLUMN \`display_show_on\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_crew_planner\` DROP COLUMN \`display_anchor\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_crew_planner\` DROP COLUMN \`display_show_from\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_crew_planner\` DROP COLUMN \`display_show_until\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_stats\` DROP COLUMN \`display_hidden\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_stats\` DROP COLUMN \`display_show_on\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_stats\` DROP COLUMN \`display_anchor\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_stats\` DROP COLUMN \`display_show_from\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_stats\` DROP COLUMN \`display_show_until\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_image_text\` DROP COLUMN \`display_hidden\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_image_text\` DROP COLUMN \`display_show_on\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_image_text\` DROP COLUMN \`display_anchor\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_image_text\` DROP COLUMN \`display_show_from\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_image_text\` DROP COLUMN \`display_show_until\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_rich_text\` DROP COLUMN \`display_hidden\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_rich_text\` DROP COLUMN \`display_show_on\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_rich_text\` DROP COLUMN \`display_anchor\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_rich_text\` DROP COLUMN \`display_show_from\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_rich_text\` DROP COLUMN \`display_show_until\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_gallery\` DROP COLUMN \`display_hidden\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_gallery\` DROP COLUMN \`display_show_on\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_gallery\` DROP COLUMN \`display_anchor\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_gallery\` DROP COLUMN \`display_show_from\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_gallery\` DROP COLUMN \`display_show_until\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_faq\` DROP COLUMN \`display_hidden\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_faq\` DROP COLUMN \`display_show_on\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_faq\` DROP COLUMN \`display_anchor\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_faq\` DROP COLUMN \`display_show_from\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_faq\` DROP COLUMN \`display_show_until\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_lead_form\` DROP COLUMN \`display_hidden\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_lead_form\` DROP COLUMN \`display_show_on\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_lead_form\` DROP COLUMN \`display_anchor\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_lead_form\` DROP COLUMN \`display_show_from\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_lead_form\` DROP COLUMN \`display_show_until\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_moments_wall\` DROP COLUMN \`display_hidden\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_moments_wall\` DROP COLUMN \`display_show_on\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_moments_wall\` DROP COLUMN \`display_anchor\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_moments_wall\` DROP COLUMN \`display_show_from\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_moments_wall\` DROP COLUMN \`display_show_until\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_journal_teaser\` DROP COLUMN \`display_hidden\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_journal_teaser\` DROP COLUMN \`display_show_on\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_journal_teaser\` DROP COLUMN \`display_anchor\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_journal_teaser\` DROP COLUMN \`display_show_from\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_journal_teaser\` DROP COLUMN \`display_show_until\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_hero\` DROP COLUMN \`display_hidden\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_hero\` DROP COLUMN \`display_show_on\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_hero\` DROP COLUMN \`display_anchor\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_hero\` DROP COLUMN \`display_show_from\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_hero\` DROP COLUMN \`display_show_until\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_ticker\` DROP COLUMN \`display_hidden\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_ticker\` DROP COLUMN \`display_show_on\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_ticker\` DROP COLUMN \`display_anchor\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_ticker\` DROP COLUMN \`display_show_from\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_ticker\` DROP COLUMN \`display_show_until\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_countdown\` DROP COLUMN \`display_hidden\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_countdown\` DROP COLUMN \`display_show_on\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_countdown\` DROP COLUMN \`display_anchor\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_countdown\` DROP COLUMN \`display_show_from\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_countdown\` DROP COLUMN \`display_show_until\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_cta_band\` DROP COLUMN \`display_hidden\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_cta_band\` DROP COLUMN \`display_show_on\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_cta_band\` DROP COLUMN \`display_anchor\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_cta_band\` DROP COLUMN \`display_show_from\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_cta_band\` DROP COLUMN \`display_show_until\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_ticket_cards\` DROP COLUMN \`display_hidden\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_ticket_cards\` DROP COLUMN \`display_show_on\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_ticket_cards\` DROP COLUMN \`display_anchor\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_ticket_cards\` DROP COLUMN \`display_show_from\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_ticket_cards\` DROP COLUMN \`display_show_until\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_offer_grid\` DROP COLUMN \`display_hidden\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_offer_grid\` DROP COLUMN \`display_show_on\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_offer_grid\` DROP COLUMN \`display_anchor\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_offer_grid\` DROP COLUMN \`display_show_from\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_offer_grid\` DROP COLUMN \`display_show_until\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_worlds_grid\` DROP COLUMN \`display_hidden\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_worlds_grid\` DROP COLUMN \`display_show_on\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_worlds_grid\` DROP COLUMN \`display_anchor\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_worlds_grid\` DROP COLUMN \`display_show_from\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_worlds_grid\` DROP COLUMN \`display_show_until\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_events_rail\` DROP COLUMN \`display_hidden\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_events_rail\` DROP COLUMN \`display_show_on\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_events_rail\` DROP COLUMN \`display_anchor\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_events_rail\` DROP COLUMN \`display_show_from\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_events_rail\` DROP COLUMN \`display_show_until\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_today_status\` DROP COLUMN \`display_hidden\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_today_status\` DROP COLUMN \`display_show_on\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_today_status\` DROP COLUMN \`display_anchor\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_today_status\` DROP COLUMN \`display_show_from\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_today_status\` DROP COLUMN \`display_show_until\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_crew_planner\` DROP COLUMN \`display_hidden\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_crew_planner\` DROP COLUMN \`display_show_on\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_crew_planner\` DROP COLUMN \`display_anchor\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_crew_planner\` DROP COLUMN \`display_show_from\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_crew_planner\` DROP COLUMN \`display_show_until\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_stats\` DROP COLUMN \`display_hidden\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_stats\` DROP COLUMN \`display_show_on\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_stats\` DROP COLUMN \`display_anchor\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_stats\` DROP COLUMN \`display_show_from\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_stats\` DROP COLUMN \`display_show_until\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_image_text\` DROP COLUMN \`display_hidden\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_image_text\` DROP COLUMN \`display_show_on\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_image_text\` DROP COLUMN \`display_anchor\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_image_text\` DROP COLUMN \`display_show_from\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_image_text\` DROP COLUMN \`display_show_until\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_rich_text\` DROP COLUMN \`display_hidden\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_rich_text\` DROP COLUMN \`display_show_on\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_rich_text\` DROP COLUMN \`display_anchor\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_rich_text\` DROP COLUMN \`display_show_from\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_rich_text\` DROP COLUMN \`display_show_until\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_gallery\` DROP COLUMN \`display_hidden\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_gallery\` DROP COLUMN \`display_show_on\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_gallery\` DROP COLUMN \`display_anchor\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_gallery\` DROP COLUMN \`display_show_from\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_gallery\` DROP COLUMN \`display_show_until\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_faq\` DROP COLUMN \`display_hidden\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_faq\` DROP COLUMN \`display_show_on\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_faq\` DROP COLUMN \`display_anchor\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_faq\` DROP COLUMN \`display_show_from\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_faq\` DROP COLUMN \`display_show_until\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_lead_form\` DROP COLUMN \`display_hidden\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_lead_form\` DROP COLUMN \`display_show_on\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_lead_form\` DROP COLUMN \`display_anchor\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_lead_form\` DROP COLUMN \`display_show_from\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_lead_form\` DROP COLUMN \`display_show_until\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_moments_wall\` DROP COLUMN \`display_hidden\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_moments_wall\` DROP COLUMN \`display_show_on\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_moments_wall\` DROP COLUMN \`display_anchor\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_moments_wall\` DROP COLUMN \`display_show_from\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_moments_wall\` DROP COLUMN \`display_show_until\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_journal_teaser\` DROP COLUMN \`display_hidden\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_journal_teaser\` DROP COLUMN \`display_show_on\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_journal_teaser\` DROP COLUMN \`display_anchor\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_journal_teaser\` DROP COLUMN \`display_show_from\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_journal_teaser\` DROP COLUMN \`display_show_until\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_hero\` DROP COLUMN \`display_hidden\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_hero\` DROP COLUMN \`display_show_on\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_hero\` DROP COLUMN \`display_anchor\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_hero\` DROP COLUMN \`display_show_from\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_hero\` DROP COLUMN \`display_show_until\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_ticker\` DROP COLUMN \`display_hidden\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_ticker\` DROP COLUMN \`display_show_on\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_ticker\` DROP COLUMN \`display_anchor\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_ticker\` DROP COLUMN \`display_show_from\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_ticker\` DROP COLUMN \`display_show_until\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_countdown\` DROP COLUMN \`display_hidden\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_countdown\` DROP COLUMN \`display_show_on\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_countdown\` DROP COLUMN \`display_anchor\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_countdown\` DROP COLUMN \`display_show_from\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_countdown\` DROP COLUMN \`display_show_until\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_cta_band\` DROP COLUMN \`display_hidden\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_cta_band\` DROP COLUMN \`display_show_on\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_cta_band\` DROP COLUMN \`display_anchor\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_cta_band\` DROP COLUMN \`display_show_from\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_cta_band\` DROP COLUMN \`display_show_until\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_ticket_cards\` DROP COLUMN \`display_hidden\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_ticket_cards\` DROP COLUMN \`display_show_on\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_ticket_cards\` DROP COLUMN \`display_anchor\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_ticket_cards\` DROP COLUMN \`display_show_from\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_ticket_cards\` DROP COLUMN \`display_show_until\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_offer_grid\` DROP COLUMN \`display_hidden\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_offer_grid\` DROP COLUMN \`display_show_on\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_offer_grid\` DROP COLUMN \`display_anchor\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_offer_grid\` DROP COLUMN \`display_show_from\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_offer_grid\` DROP COLUMN \`display_show_until\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_worlds_grid\` DROP COLUMN \`display_hidden\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_worlds_grid\` DROP COLUMN \`display_show_on\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_worlds_grid\` DROP COLUMN \`display_anchor\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_worlds_grid\` DROP COLUMN \`display_show_from\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_worlds_grid\` DROP COLUMN \`display_show_until\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_events_rail\` DROP COLUMN \`display_hidden\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_events_rail\` DROP COLUMN \`display_show_on\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_events_rail\` DROP COLUMN \`display_anchor\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_events_rail\` DROP COLUMN \`display_show_from\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_events_rail\` DROP COLUMN \`display_show_until\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_today_status\` DROP COLUMN \`display_hidden\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_today_status\` DROP COLUMN \`display_show_on\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_today_status\` DROP COLUMN \`display_anchor\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_today_status\` DROP COLUMN \`display_show_from\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_today_status\` DROP COLUMN \`display_show_until\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_crew_planner\` DROP COLUMN \`display_hidden\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_crew_planner\` DROP COLUMN \`display_show_on\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_crew_planner\` DROP COLUMN \`display_anchor\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_crew_planner\` DROP COLUMN \`display_show_from\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_crew_planner\` DROP COLUMN \`display_show_until\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_stats\` DROP COLUMN \`display_hidden\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_stats\` DROP COLUMN \`display_show_on\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_stats\` DROP COLUMN \`display_anchor\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_stats\` DROP COLUMN \`display_show_from\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_stats\` DROP COLUMN \`display_show_until\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_image_text\` DROP COLUMN \`display_hidden\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_image_text\` DROP COLUMN \`display_show_on\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_image_text\` DROP COLUMN \`display_anchor\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_image_text\` DROP COLUMN \`display_show_from\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_image_text\` DROP COLUMN \`display_show_until\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_rich_text\` DROP COLUMN \`display_hidden\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_rich_text\` DROP COLUMN \`display_show_on\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_rich_text\` DROP COLUMN \`display_anchor\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_rich_text\` DROP COLUMN \`display_show_from\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_rich_text\` DROP COLUMN \`display_show_until\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_gallery\` DROP COLUMN \`display_hidden\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_gallery\` DROP COLUMN \`display_show_on\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_gallery\` DROP COLUMN \`display_anchor\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_gallery\` DROP COLUMN \`display_show_from\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_gallery\` DROP COLUMN \`display_show_until\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_faq\` DROP COLUMN \`display_hidden\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_faq\` DROP COLUMN \`display_show_on\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_faq\` DROP COLUMN \`display_anchor\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_faq\` DROP COLUMN \`display_show_from\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_faq\` DROP COLUMN \`display_show_until\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_lead_form\` DROP COLUMN \`display_hidden\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_lead_form\` DROP COLUMN \`display_show_on\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_lead_form\` DROP COLUMN \`display_anchor\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_lead_form\` DROP COLUMN \`display_show_from\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_lead_form\` DROP COLUMN \`display_show_until\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_moments_wall\` DROP COLUMN \`display_hidden\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_moments_wall\` DROP COLUMN \`display_show_on\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_moments_wall\` DROP COLUMN \`display_anchor\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_moments_wall\` DROP COLUMN \`display_show_from\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_moments_wall\` DROP COLUMN \`display_show_until\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_journal_teaser\` DROP COLUMN \`display_hidden\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_journal_teaser\` DROP COLUMN \`display_show_on\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_journal_teaser\` DROP COLUMN \`display_anchor\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_journal_teaser\` DROP COLUMN \`display_show_from\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_journal_teaser\` DROP COLUMN \`display_show_until\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_hero\` DROP COLUMN \`display_hidden\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_hero\` DROP COLUMN \`display_show_on\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_hero\` DROP COLUMN \`display_anchor\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_hero\` DROP COLUMN \`display_show_from\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_hero\` DROP COLUMN \`display_show_until\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_ticker\` DROP COLUMN \`display_hidden\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_ticker\` DROP COLUMN \`display_show_on\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_ticker\` DROP COLUMN \`display_anchor\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_ticker\` DROP COLUMN \`display_show_from\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_ticker\` DROP COLUMN \`display_show_until\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_countdown\` DROP COLUMN \`display_hidden\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_countdown\` DROP COLUMN \`display_show_on\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_countdown\` DROP COLUMN \`display_anchor\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_countdown\` DROP COLUMN \`display_show_from\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_countdown\` DROP COLUMN \`display_show_until\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_cta_band\` DROP COLUMN \`display_hidden\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_cta_band\` DROP COLUMN \`display_show_on\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_cta_band\` DROP COLUMN \`display_anchor\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_cta_band\` DROP COLUMN \`display_show_from\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_cta_band\` DROP COLUMN \`display_show_until\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_ticket_cards\` DROP COLUMN \`display_hidden\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_ticket_cards\` DROP COLUMN \`display_show_on\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_ticket_cards\` DROP COLUMN \`display_anchor\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_ticket_cards\` DROP COLUMN \`display_show_from\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_ticket_cards\` DROP COLUMN \`display_show_until\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_offer_grid\` DROP COLUMN \`display_hidden\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_offer_grid\` DROP COLUMN \`display_show_on\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_offer_grid\` DROP COLUMN \`display_anchor\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_offer_grid\` DROP COLUMN \`display_show_from\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_offer_grid\` DROP COLUMN \`display_show_until\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_worlds_grid\` DROP COLUMN \`display_hidden\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_worlds_grid\` DROP COLUMN \`display_show_on\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_worlds_grid\` DROP COLUMN \`display_anchor\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_worlds_grid\` DROP COLUMN \`display_show_from\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_worlds_grid\` DROP COLUMN \`display_show_until\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_events_rail\` DROP COLUMN \`display_hidden\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_events_rail\` DROP COLUMN \`display_show_on\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_events_rail\` DROP COLUMN \`display_anchor\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_events_rail\` DROP COLUMN \`display_show_from\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_events_rail\` DROP COLUMN \`display_show_until\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_today_status\` DROP COLUMN \`display_hidden\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_today_status\` DROP COLUMN \`display_show_on\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_today_status\` DROP COLUMN \`display_anchor\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_today_status\` DROP COLUMN \`display_show_from\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_today_status\` DROP COLUMN \`display_show_until\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_crew_planner\` DROP COLUMN \`display_hidden\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_crew_planner\` DROP COLUMN \`display_show_on\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_crew_planner\` DROP COLUMN \`display_anchor\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_crew_planner\` DROP COLUMN \`display_show_from\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_crew_planner\` DROP COLUMN \`display_show_until\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_stats\` DROP COLUMN \`display_hidden\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_stats\` DROP COLUMN \`display_show_on\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_stats\` DROP COLUMN \`display_anchor\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_stats\` DROP COLUMN \`display_show_from\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_stats\` DROP COLUMN \`display_show_until\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_image_text\` DROP COLUMN \`display_hidden\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_image_text\` DROP COLUMN \`display_show_on\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_image_text\` DROP COLUMN \`display_anchor\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_image_text\` DROP COLUMN \`display_show_from\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_image_text\` DROP COLUMN \`display_show_until\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_rich_text\` DROP COLUMN \`display_hidden\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_rich_text\` DROP COLUMN \`display_show_on\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_rich_text\` DROP COLUMN \`display_anchor\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_rich_text\` DROP COLUMN \`display_show_from\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_rich_text\` DROP COLUMN \`display_show_until\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_gallery\` DROP COLUMN \`display_hidden\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_gallery\` DROP COLUMN \`display_show_on\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_gallery\` DROP COLUMN \`display_anchor\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_gallery\` DROP COLUMN \`display_show_from\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_gallery\` DROP COLUMN \`display_show_until\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_faq\` DROP COLUMN \`display_hidden\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_faq\` DROP COLUMN \`display_show_on\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_faq\` DROP COLUMN \`display_anchor\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_faq\` DROP COLUMN \`display_show_from\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_faq\` DROP COLUMN \`display_show_until\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_lead_form\` DROP COLUMN \`display_hidden\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_lead_form\` DROP COLUMN \`display_show_on\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_lead_form\` DROP COLUMN \`display_anchor\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_lead_form\` DROP COLUMN \`display_show_from\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_lead_form\` DROP COLUMN \`display_show_until\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_moments_wall\` DROP COLUMN \`display_hidden\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_moments_wall\` DROP COLUMN \`display_show_on\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_moments_wall\` DROP COLUMN \`display_anchor\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_moments_wall\` DROP COLUMN \`display_show_from\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_moments_wall\` DROP COLUMN \`display_show_until\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_journal_teaser\` DROP COLUMN \`display_hidden\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_journal_teaser\` DROP COLUMN \`display_show_on\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_journal_teaser\` DROP COLUMN \`display_anchor\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_journal_teaser\` DROP COLUMN \`display_show_from\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_journal_teaser\` DROP COLUMN \`display_show_until\`;`)
}
