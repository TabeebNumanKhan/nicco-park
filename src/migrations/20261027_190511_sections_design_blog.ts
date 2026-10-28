import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`pages_blocks_sub_heading\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`size\` text DEFAULT 'm',
  	\`span\` text DEFAULT '1',
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_sub_heading_order_idx\` ON \`pages_blocks_sub_heading\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_sub_heading_parent_id_idx\` ON \`pages_blocks_sub_heading\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_sub_heading_path_idx\` ON \`pages_blocks_sub_heading\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_sub_heading_locales\` (
  	\`text\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_sub_heading\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`pages_blocks_sub_heading_locales_locale_parent_id_unique\` ON \`pages_blocks_sub_heading_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_sub_text\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`span\` text DEFAULT '1',
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_sub_text_order_idx\` ON \`pages_blocks_sub_text\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_sub_text_parent_id_idx\` ON \`pages_blocks_sub_text\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_sub_text_path_idx\` ON \`pages_blocks_sub_text\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_sub_text_locales\` (
  	\`text\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_sub_text\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`pages_blocks_sub_text_locales_locale_parent_id_unique\` ON \`pages_blocks_sub_text_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_sub_image\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`image_id\` integer,
  	\`ratio\` text DEFAULT '4/3',
  	\`href\` text,
  	\`span\` text DEFAULT '1',
  	\`block_name\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_sub_image_order_idx\` ON \`pages_blocks_sub_image\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_sub_image_parent_id_idx\` ON \`pages_blocks_sub_image\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_sub_image_path_idx\` ON \`pages_blocks_sub_image\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_sub_image_image_idx\` ON \`pages_blocks_sub_image\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_sub_image_locales\` (
  	\`caption\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_sub_image\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`pages_blocks_sub_image_locales_locale_parent_id_unique\` ON \`pages_blocks_sub_image_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_sub_card\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`image_id\` integer,
  	\`link_href\` text,
  	\`span\` text DEFAULT '1',
  	\`block_name\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_sub_card_order_idx\` ON \`pages_blocks_sub_card\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_sub_card_parent_id_idx\` ON \`pages_blocks_sub_card\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_sub_card_path_idx\` ON \`pages_blocks_sub_card\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_sub_card_image_idx\` ON \`pages_blocks_sub_card\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_sub_card_locales\` (
  	\`title\` text,
  	\`text\` text,
  	\`link_label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_sub_card\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`pages_blocks_sub_card_locales_locale_parent_id_unique\` ON \`pages_blocks_sub_card_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_sub_button\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`href\` text,
  	\`style\` text DEFAULT 'primary',
  	\`span\` text DEFAULT '1',
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_sub_button_order_idx\` ON \`pages_blocks_sub_button\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_sub_button_parent_id_idx\` ON \`pages_blocks_sub_button\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_sub_button_path_idx\` ON \`pages_blocks_sub_button\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_sub_button_locales\` (
  	\`label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_sub_button\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`pages_blocks_sub_button_locales_locale_parent_id_unique\` ON \`pages_blocks_sub_button_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_sub_video\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`source\` text DEFAULT 'upload',
  	\`file_id\` integer,
  	\`url\` text,
  	\`poster_id\` integer,
  	\`autoplay\` integer,
  	\`span\` text DEFAULT '1',
  	\`block_name\` text,
  	FOREIGN KEY (\`file_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`poster_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_sub_video_order_idx\` ON \`pages_blocks_sub_video\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_sub_video_parent_id_idx\` ON \`pages_blocks_sub_video\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_sub_video_path_idx\` ON \`pages_blocks_sub_video\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_sub_video_file_idx\` ON \`pages_blocks_sub_video\` (\`file_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_sub_video_poster_idx\` ON \`pages_blocks_sub_video\` (\`poster_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_sub_quote\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name\` text,
  	\`span\` text DEFAULT '1',
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_sub_quote_order_idx\` ON \`pages_blocks_sub_quote\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_sub_quote_parent_id_idx\` ON \`pages_blocks_sub_quote\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_sub_quote_path_idx\` ON \`pages_blocks_sub_quote\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_sub_quote_locales\` (
  	\`quote\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_sub_quote\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`pages_blocks_sub_quote_locales_locale_parent_id_unique\` ON \`pages_blocks_sub_quote_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_sub_list_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_sub_list\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_sub_list_items_order_idx\` ON \`pages_blocks_sub_list_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_sub_list_items_parent_id_idx\` ON \`pages_blocks_sub_list_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_sub_list_items_locales\` (
  	\`text\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_sub_list_items\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`pages_blocks_sub_list_items_locales_locale_parent_id_unique\` ON \`pages_blocks_sub_list_items_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_sub_list\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`span\` text DEFAULT '1',
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_sub_list_order_idx\` ON \`pages_blocks_sub_list\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_sub_list_parent_id_idx\` ON \`pages_blocks_sub_list\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_sub_list_path_idx\` ON \`pages_blocks_sub_list\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_sub_gap\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`size\` text DEFAULT 'm',
  	\`span\` text DEFAULT '1',
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_sub_gap_order_idx\` ON \`pages_blocks_sub_gap\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_sub_gap_parent_id_idx\` ON \`pages_blocks_sub_gap\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_sub_gap_path_idx\` ON \`pages_blocks_sub_gap\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_custom\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`tone\` text DEFAULT 'white',
  	\`columns\` text DEFAULT '2',
  	\`vertical_align\` text DEFAULT 'start',
  	\`design_heading_size\` text DEFAULT 'auto',
  	\`design_heading_font\` text DEFAULT 'auto',
  	\`design_text_size\` text DEFAULT 'auto',
  	\`design_align\` text DEFAULT 'auto',
  	\`design_background\` text,
  	\`design_frame\` text DEFAULT 'none',
  	\`design_padding_top\` text DEFAULT 'auto',
  	\`design_padding_bottom\` text DEFAULT 'auto',
  	\`design_margin_bottom\` text DEFAULT 'auto',
  	\`design_width\` text DEFAULT 'auto',
  	\`display_hidden\` integer,
  	\`display_show_on\` text DEFAULT 'all',
  	\`display_anchor\` text,
  	\`display_show_from\` text,
  	\`display_show_until\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_custom_order_idx\` ON \`pages_blocks_custom\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_custom_parent_id_idx\` ON \`pages_blocks_custom\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_custom_path_idx\` ON \`pages_blocks_custom\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_custom_locales\` (
  	\`eyebrow\` text,
  	\`heading\` text,
  	\`intro\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_custom\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`pages_blocks_custom_locales_locale_parent_id_unique\` ON \`pages_blocks_custom_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_slideshow_slides\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`image_id\` integer,
  	\`link_href\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_slideshow\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_slideshow_slides_order_idx\` ON \`pages_blocks_slideshow_slides\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_slideshow_slides_parent_id_idx\` ON \`pages_blocks_slideshow_slides\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_slideshow_slides_image_idx\` ON \`pages_blocks_slideshow_slides\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_slideshow_slides_locales\` (
  	\`heading\` text,
  	\`text\` text,
  	\`link_label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_slideshow_slides\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`pages_blocks_slideshow_slides_locales_locale_parent_id_uniqu\` ON \`pages_blocks_slideshow_slides_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_slideshow\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`style\` text DEFAULT 'framed',
  	\`autoplay_seconds\` numeric DEFAULT 5,
  	\`tone\` text DEFAULT 'cream',
  	\`design_heading_size\` text DEFAULT 'auto',
  	\`design_heading_font\` text DEFAULT 'auto',
  	\`design_text_size\` text DEFAULT 'auto',
  	\`design_align\` text DEFAULT 'auto',
  	\`design_background\` text,
  	\`design_frame\` text DEFAULT 'none',
  	\`design_padding_top\` text DEFAULT 'auto',
  	\`design_padding_bottom\` text DEFAULT 'auto',
  	\`design_margin_bottom\` text DEFAULT 'auto',
  	\`design_width\` text DEFAULT 'auto',
  	\`display_hidden\` integer,
  	\`display_show_on\` text DEFAULT 'all',
  	\`display_anchor\` text,
  	\`display_show_from\` text,
  	\`display_show_until\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_slideshow_order_idx\` ON \`pages_blocks_slideshow\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_slideshow_parent_id_idx\` ON \`pages_blocks_slideshow\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_slideshow_path_idx\` ON \`pages_blocks_slideshow\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_slideshow_locales\` (
  	\`heading\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_slideshow\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`pages_blocks_slideshow_locales_locale_parent_id_unique\` ON \`pages_blocks_slideshow_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_sub_heading\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`size\` text DEFAULT 'm',
  	\`span\` text DEFAULT '1',
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_sub_heading_order_idx\` ON \`_pages_v_blocks_sub_heading\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_sub_heading_parent_id_idx\` ON \`_pages_v_blocks_sub_heading\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_sub_heading_path_idx\` ON \`_pages_v_blocks_sub_heading\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_sub_heading_locales\` (
  	\`text\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_sub_heading\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_pages_v_blocks_sub_heading_locales_locale_parent_id_unique\` ON \`_pages_v_blocks_sub_heading_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_sub_text\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`span\` text DEFAULT '1',
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_sub_text_order_idx\` ON \`_pages_v_blocks_sub_text\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_sub_text_parent_id_idx\` ON \`_pages_v_blocks_sub_text\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_sub_text_path_idx\` ON \`_pages_v_blocks_sub_text\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_sub_text_locales\` (
  	\`text\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_sub_text\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_pages_v_blocks_sub_text_locales_locale_parent_id_unique\` ON \`_pages_v_blocks_sub_text_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_sub_image\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`image_id\` integer,
  	\`ratio\` text DEFAULT '4/3',
  	\`href\` text,
  	\`span\` text DEFAULT '1',
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_sub_image_order_idx\` ON \`_pages_v_blocks_sub_image\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_sub_image_parent_id_idx\` ON \`_pages_v_blocks_sub_image\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_sub_image_path_idx\` ON \`_pages_v_blocks_sub_image\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_sub_image_image_idx\` ON \`_pages_v_blocks_sub_image\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_sub_image_locales\` (
  	\`caption\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_sub_image\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_pages_v_blocks_sub_image_locales_locale_parent_id_unique\` ON \`_pages_v_blocks_sub_image_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_sub_card\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`image_id\` integer,
  	\`link_href\` text,
  	\`span\` text DEFAULT '1',
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_sub_card_order_idx\` ON \`_pages_v_blocks_sub_card\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_sub_card_parent_id_idx\` ON \`_pages_v_blocks_sub_card\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_sub_card_path_idx\` ON \`_pages_v_blocks_sub_card\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_sub_card_image_idx\` ON \`_pages_v_blocks_sub_card\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_sub_card_locales\` (
  	\`title\` text,
  	\`text\` text,
  	\`link_label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_sub_card\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_pages_v_blocks_sub_card_locales_locale_parent_id_unique\` ON \`_pages_v_blocks_sub_card_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_sub_button\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`href\` text,
  	\`style\` text DEFAULT 'primary',
  	\`span\` text DEFAULT '1',
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_sub_button_order_idx\` ON \`_pages_v_blocks_sub_button\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_sub_button_parent_id_idx\` ON \`_pages_v_blocks_sub_button\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_sub_button_path_idx\` ON \`_pages_v_blocks_sub_button\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_sub_button_locales\` (
  	\`label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_sub_button\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_pages_v_blocks_sub_button_locales_locale_parent_id_unique\` ON \`_pages_v_blocks_sub_button_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_sub_video\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`source\` text DEFAULT 'upload',
  	\`file_id\` integer,
  	\`url\` text,
  	\`poster_id\` integer,
  	\`autoplay\` integer,
  	\`span\` text DEFAULT '1',
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`file_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`poster_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_sub_video_order_idx\` ON \`_pages_v_blocks_sub_video\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_sub_video_parent_id_idx\` ON \`_pages_v_blocks_sub_video\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_sub_video_path_idx\` ON \`_pages_v_blocks_sub_video\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_sub_video_file_idx\` ON \`_pages_v_blocks_sub_video\` (\`file_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_sub_video_poster_idx\` ON \`_pages_v_blocks_sub_video\` (\`poster_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_sub_quote\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text,
  	\`span\` text DEFAULT '1',
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_sub_quote_order_idx\` ON \`_pages_v_blocks_sub_quote\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_sub_quote_parent_id_idx\` ON \`_pages_v_blocks_sub_quote\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_sub_quote_path_idx\` ON \`_pages_v_blocks_sub_quote\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_sub_quote_locales\` (
  	\`quote\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_sub_quote\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_pages_v_blocks_sub_quote_locales_locale_parent_id_unique\` ON \`_pages_v_blocks_sub_quote_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_sub_list_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_sub_list\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_sub_list_items_order_idx\` ON \`_pages_v_blocks_sub_list_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_sub_list_items_parent_id_idx\` ON \`_pages_v_blocks_sub_list_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_sub_list_items_locales\` (
  	\`text\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_sub_list_items\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_pages_v_blocks_sub_list_items_locales_locale_parent_id_uniq\` ON \`_pages_v_blocks_sub_list_items_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_sub_list\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`span\` text DEFAULT '1',
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_sub_list_order_idx\` ON \`_pages_v_blocks_sub_list\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_sub_list_parent_id_idx\` ON \`_pages_v_blocks_sub_list\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_sub_list_path_idx\` ON \`_pages_v_blocks_sub_list\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_sub_gap\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`size\` text DEFAULT 'm',
  	\`span\` text DEFAULT '1',
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_sub_gap_order_idx\` ON \`_pages_v_blocks_sub_gap\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_sub_gap_parent_id_idx\` ON \`_pages_v_blocks_sub_gap\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_sub_gap_path_idx\` ON \`_pages_v_blocks_sub_gap\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_custom\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`tone\` text DEFAULT 'white',
  	\`columns\` text DEFAULT '2',
  	\`vertical_align\` text DEFAULT 'start',
  	\`design_heading_size\` text DEFAULT 'auto',
  	\`design_heading_font\` text DEFAULT 'auto',
  	\`design_text_size\` text DEFAULT 'auto',
  	\`design_align\` text DEFAULT 'auto',
  	\`design_background\` text,
  	\`design_frame\` text DEFAULT 'none',
  	\`design_padding_top\` text DEFAULT 'auto',
  	\`design_padding_bottom\` text DEFAULT 'auto',
  	\`design_margin_bottom\` text DEFAULT 'auto',
  	\`design_width\` text DEFAULT 'auto',
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
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_custom_order_idx\` ON \`_pages_v_blocks_custom\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_custom_parent_id_idx\` ON \`_pages_v_blocks_custom\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_custom_path_idx\` ON \`_pages_v_blocks_custom\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_custom_locales\` (
  	\`eyebrow\` text,
  	\`heading\` text,
  	\`intro\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_custom\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_pages_v_blocks_custom_locales_locale_parent_id_unique\` ON \`_pages_v_blocks_custom_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_slideshow_slides\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`image_id\` integer,
  	\`link_href\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_slideshow\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_slideshow_slides_order_idx\` ON \`_pages_v_blocks_slideshow_slides\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_slideshow_slides_parent_id_idx\` ON \`_pages_v_blocks_slideshow_slides\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_slideshow_slides_image_idx\` ON \`_pages_v_blocks_slideshow_slides\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_slideshow_slides_locales\` (
  	\`heading\` text,
  	\`text\` text,
  	\`link_label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_slideshow_slides\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_pages_v_blocks_slideshow_slides_locales_locale_parent_id_un\` ON \`_pages_v_blocks_slideshow_slides_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_slideshow\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`style\` text DEFAULT 'framed',
  	\`autoplay_seconds\` numeric DEFAULT 5,
  	\`tone\` text DEFAULT 'cream',
  	\`design_heading_size\` text DEFAULT 'auto',
  	\`design_heading_font\` text DEFAULT 'auto',
  	\`design_text_size\` text DEFAULT 'auto',
  	\`design_align\` text DEFAULT 'auto',
  	\`design_background\` text,
  	\`design_frame\` text DEFAULT 'none',
  	\`design_padding_top\` text DEFAULT 'auto',
  	\`design_padding_bottom\` text DEFAULT 'auto',
  	\`design_margin_bottom\` text DEFAULT 'auto',
  	\`design_width\` text DEFAULT 'auto',
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
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_slideshow_order_idx\` ON \`_pages_v_blocks_slideshow\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_slideshow_parent_id_idx\` ON \`_pages_v_blocks_slideshow\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_slideshow_path_idx\` ON \`_pages_v_blocks_slideshow\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_slideshow_locales\` (
  	\`heading\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_slideshow\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_pages_v_blocks_slideshow_locales_locale_parent_id_unique\` ON \`_pages_v_blocks_slideshow_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`offers_blocks_sub_heading\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`size\` text DEFAULT 'm',
  	\`span\` text DEFAULT '1',
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`offers\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`offers_blocks_sub_heading_order_idx\` ON \`offers_blocks_sub_heading\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`offers_blocks_sub_heading_parent_id_idx\` ON \`offers_blocks_sub_heading\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`offers_blocks_sub_heading_path_idx\` ON \`offers_blocks_sub_heading\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`offers_blocks_sub_heading_locales\` (
  	\`text\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`offers_blocks_sub_heading\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`offers_blocks_sub_heading_locales_locale_parent_id_unique\` ON \`offers_blocks_sub_heading_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`offers_blocks_sub_text\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`span\` text DEFAULT '1',
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`offers\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`offers_blocks_sub_text_order_idx\` ON \`offers_blocks_sub_text\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`offers_blocks_sub_text_parent_id_idx\` ON \`offers_blocks_sub_text\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`offers_blocks_sub_text_path_idx\` ON \`offers_blocks_sub_text\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`offers_blocks_sub_text_locales\` (
  	\`text\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`offers_blocks_sub_text\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`offers_blocks_sub_text_locales_locale_parent_id_unique\` ON \`offers_blocks_sub_text_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`offers_blocks_sub_image\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`image_id\` integer,
  	\`ratio\` text DEFAULT '4/3',
  	\`href\` text,
  	\`span\` text DEFAULT '1',
  	\`block_name\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`offers\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`offers_blocks_sub_image_order_idx\` ON \`offers_blocks_sub_image\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`offers_blocks_sub_image_parent_id_idx\` ON \`offers_blocks_sub_image\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`offers_blocks_sub_image_path_idx\` ON \`offers_blocks_sub_image\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`offers_blocks_sub_image_image_idx\` ON \`offers_blocks_sub_image\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`offers_blocks_sub_image_locales\` (
  	\`caption\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`offers_blocks_sub_image\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`offers_blocks_sub_image_locales_locale_parent_id_unique\` ON \`offers_blocks_sub_image_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`offers_blocks_sub_card\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`image_id\` integer,
  	\`link_href\` text,
  	\`span\` text DEFAULT '1',
  	\`block_name\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`offers\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`offers_blocks_sub_card_order_idx\` ON \`offers_blocks_sub_card\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`offers_blocks_sub_card_parent_id_idx\` ON \`offers_blocks_sub_card\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`offers_blocks_sub_card_path_idx\` ON \`offers_blocks_sub_card\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`offers_blocks_sub_card_image_idx\` ON \`offers_blocks_sub_card\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`offers_blocks_sub_card_locales\` (
  	\`title\` text,
  	\`text\` text,
  	\`link_label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`offers_blocks_sub_card\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`offers_blocks_sub_card_locales_locale_parent_id_unique\` ON \`offers_blocks_sub_card_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`offers_blocks_sub_button\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`href\` text,
  	\`style\` text DEFAULT 'primary',
  	\`span\` text DEFAULT '1',
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`offers\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`offers_blocks_sub_button_order_idx\` ON \`offers_blocks_sub_button\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`offers_blocks_sub_button_parent_id_idx\` ON \`offers_blocks_sub_button\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`offers_blocks_sub_button_path_idx\` ON \`offers_blocks_sub_button\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`offers_blocks_sub_button_locales\` (
  	\`label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`offers_blocks_sub_button\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`offers_blocks_sub_button_locales_locale_parent_id_unique\` ON \`offers_blocks_sub_button_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`offers_blocks_sub_video\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`source\` text DEFAULT 'upload',
  	\`file_id\` integer,
  	\`url\` text,
  	\`poster_id\` integer,
  	\`autoplay\` integer,
  	\`span\` text DEFAULT '1',
  	\`block_name\` text,
  	FOREIGN KEY (\`file_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`poster_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`offers\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`offers_blocks_sub_video_order_idx\` ON \`offers_blocks_sub_video\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`offers_blocks_sub_video_parent_id_idx\` ON \`offers_blocks_sub_video\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`offers_blocks_sub_video_path_idx\` ON \`offers_blocks_sub_video\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`offers_blocks_sub_video_file_idx\` ON \`offers_blocks_sub_video\` (\`file_id\`);`)
  await db.run(sql`CREATE INDEX \`offers_blocks_sub_video_poster_idx\` ON \`offers_blocks_sub_video\` (\`poster_id\`);`)
  await db.run(sql`CREATE TABLE \`offers_blocks_sub_quote\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name\` text,
  	\`span\` text DEFAULT '1',
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`offers\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`offers_blocks_sub_quote_order_idx\` ON \`offers_blocks_sub_quote\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`offers_blocks_sub_quote_parent_id_idx\` ON \`offers_blocks_sub_quote\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`offers_blocks_sub_quote_path_idx\` ON \`offers_blocks_sub_quote\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`offers_blocks_sub_quote_locales\` (
  	\`quote\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`offers_blocks_sub_quote\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`offers_blocks_sub_quote_locales_locale_parent_id_unique\` ON \`offers_blocks_sub_quote_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`offers_blocks_sub_list_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`offers_blocks_sub_list\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`offers_blocks_sub_list_items_order_idx\` ON \`offers_blocks_sub_list_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`offers_blocks_sub_list_items_parent_id_idx\` ON \`offers_blocks_sub_list_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`offers_blocks_sub_list_items_locales\` (
  	\`text\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`offers_blocks_sub_list_items\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`offers_blocks_sub_list_items_locales_locale_parent_id_unique\` ON \`offers_blocks_sub_list_items_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`offers_blocks_sub_list\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`span\` text DEFAULT '1',
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`offers\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`offers_blocks_sub_list_order_idx\` ON \`offers_blocks_sub_list\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`offers_blocks_sub_list_parent_id_idx\` ON \`offers_blocks_sub_list\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`offers_blocks_sub_list_path_idx\` ON \`offers_blocks_sub_list\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`offers_blocks_sub_gap\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`size\` text DEFAULT 'm',
  	\`span\` text DEFAULT '1',
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`offers\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`offers_blocks_sub_gap_order_idx\` ON \`offers_blocks_sub_gap\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`offers_blocks_sub_gap_parent_id_idx\` ON \`offers_blocks_sub_gap\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`offers_blocks_sub_gap_path_idx\` ON \`offers_blocks_sub_gap\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`offers_blocks_custom\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`tone\` text DEFAULT 'white',
  	\`columns\` text DEFAULT '2',
  	\`vertical_align\` text DEFAULT 'start',
  	\`design_heading_size\` text DEFAULT 'auto',
  	\`design_heading_font\` text DEFAULT 'auto',
  	\`design_text_size\` text DEFAULT 'auto',
  	\`design_align\` text DEFAULT 'auto',
  	\`design_background\` text,
  	\`design_frame\` text DEFAULT 'none',
  	\`design_padding_top\` text DEFAULT 'auto',
  	\`design_padding_bottom\` text DEFAULT 'auto',
  	\`design_margin_bottom\` text DEFAULT 'auto',
  	\`design_width\` text DEFAULT 'auto',
  	\`display_hidden\` integer,
  	\`display_show_on\` text DEFAULT 'all',
  	\`display_anchor\` text,
  	\`display_show_from\` text,
  	\`display_show_until\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`offers\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`offers_blocks_custom_order_idx\` ON \`offers_blocks_custom\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`offers_blocks_custom_parent_id_idx\` ON \`offers_blocks_custom\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`offers_blocks_custom_path_idx\` ON \`offers_blocks_custom\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`offers_blocks_custom_locales\` (
  	\`eyebrow\` text,
  	\`heading\` text,
  	\`intro\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`offers_blocks_custom\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`offers_blocks_custom_locales_locale_parent_id_unique\` ON \`offers_blocks_custom_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`offers_blocks_slideshow_slides\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`image_id\` integer,
  	\`link_href\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`offers_blocks_slideshow\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`offers_blocks_slideshow_slides_order_idx\` ON \`offers_blocks_slideshow_slides\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`offers_blocks_slideshow_slides_parent_id_idx\` ON \`offers_blocks_slideshow_slides\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`offers_blocks_slideshow_slides_image_idx\` ON \`offers_blocks_slideshow_slides\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`offers_blocks_slideshow_slides_locales\` (
  	\`heading\` text,
  	\`text\` text,
  	\`link_label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`offers_blocks_slideshow_slides\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`offers_blocks_slideshow_slides_locales_locale_parent_id_uniq\` ON \`offers_blocks_slideshow_slides_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`offers_blocks_slideshow\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`style\` text DEFAULT 'framed',
  	\`autoplay_seconds\` numeric DEFAULT 5,
  	\`tone\` text DEFAULT 'cream',
  	\`design_heading_size\` text DEFAULT 'auto',
  	\`design_heading_font\` text DEFAULT 'auto',
  	\`design_text_size\` text DEFAULT 'auto',
  	\`design_align\` text DEFAULT 'auto',
  	\`design_background\` text,
  	\`design_frame\` text DEFAULT 'none',
  	\`design_padding_top\` text DEFAULT 'auto',
  	\`design_padding_bottom\` text DEFAULT 'auto',
  	\`design_margin_bottom\` text DEFAULT 'auto',
  	\`design_width\` text DEFAULT 'auto',
  	\`display_hidden\` integer,
  	\`display_show_on\` text DEFAULT 'all',
  	\`display_anchor\` text,
  	\`display_show_from\` text,
  	\`display_show_until\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`offers\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`offers_blocks_slideshow_order_idx\` ON \`offers_blocks_slideshow\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`offers_blocks_slideshow_parent_id_idx\` ON \`offers_blocks_slideshow\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`offers_blocks_slideshow_path_idx\` ON \`offers_blocks_slideshow\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`offers_blocks_slideshow_locales\` (
  	\`heading\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`offers_blocks_slideshow\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`offers_blocks_slideshow_locales_locale_parent_id_unique\` ON \`offers_blocks_slideshow_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_offers_v_blocks_sub_heading\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`size\` text DEFAULT 'm',
  	\`span\` text DEFAULT '1',
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_offers_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_offers_v_blocks_sub_heading_order_idx\` ON \`_offers_v_blocks_sub_heading\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_offers_v_blocks_sub_heading_parent_id_idx\` ON \`_offers_v_blocks_sub_heading\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_offers_v_blocks_sub_heading_path_idx\` ON \`_offers_v_blocks_sub_heading\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_offers_v_blocks_sub_heading_locales\` (
  	\`text\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_offers_v_blocks_sub_heading\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_offers_v_blocks_sub_heading_locales_locale_parent_id_unique\` ON \`_offers_v_blocks_sub_heading_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_offers_v_blocks_sub_text\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`span\` text DEFAULT '1',
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_offers_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_offers_v_blocks_sub_text_order_idx\` ON \`_offers_v_blocks_sub_text\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_offers_v_blocks_sub_text_parent_id_idx\` ON \`_offers_v_blocks_sub_text\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_offers_v_blocks_sub_text_path_idx\` ON \`_offers_v_blocks_sub_text\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_offers_v_blocks_sub_text_locales\` (
  	\`text\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_offers_v_blocks_sub_text\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_offers_v_blocks_sub_text_locales_locale_parent_id_unique\` ON \`_offers_v_blocks_sub_text_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_offers_v_blocks_sub_image\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`image_id\` integer,
  	\`ratio\` text DEFAULT '4/3',
  	\`href\` text,
  	\`span\` text DEFAULT '1',
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_offers_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_offers_v_blocks_sub_image_order_idx\` ON \`_offers_v_blocks_sub_image\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_offers_v_blocks_sub_image_parent_id_idx\` ON \`_offers_v_blocks_sub_image\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_offers_v_blocks_sub_image_path_idx\` ON \`_offers_v_blocks_sub_image\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`_offers_v_blocks_sub_image_image_idx\` ON \`_offers_v_blocks_sub_image\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`_offers_v_blocks_sub_image_locales\` (
  	\`caption\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_offers_v_blocks_sub_image\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_offers_v_blocks_sub_image_locales_locale_parent_id_unique\` ON \`_offers_v_blocks_sub_image_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_offers_v_blocks_sub_card\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`image_id\` integer,
  	\`link_href\` text,
  	\`span\` text DEFAULT '1',
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_offers_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_offers_v_blocks_sub_card_order_idx\` ON \`_offers_v_blocks_sub_card\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_offers_v_blocks_sub_card_parent_id_idx\` ON \`_offers_v_blocks_sub_card\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_offers_v_blocks_sub_card_path_idx\` ON \`_offers_v_blocks_sub_card\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`_offers_v_blocks_sub_card_image_idx\` ON \`_offers_v_blocks_sub_card\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`_offers_v_blocks_sub_card_locales\` (
  	\`title\` text,
  	\`text\` text,
  	\`link_label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_offers_v_blocks_sub_card\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_offers_v_blocks_sub_card_locales_locale_parent_id_unique\` ON \`_offers_v_blocks_sub_card_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_offers_v_blocks_sub_button\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`href\` text,
  	\`style\` text DEFAULT 'primary',
  	\`span\` text DEFAULT '1',
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_offers_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_offers_v_blocks_sub_button_order_idx\` ON \`_offers_v_blocks_sub_button\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_offers_v_blocks_sub_button_parent_id_idx\` ON \`_offers_v_blocks_sub_button\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_offers_v_blocks_sub_button_path_idx\` ON \`_offers_v_blocks_sub_button\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_offers_v_blocks_sub_button_locales\` (
  	\`label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_offers_v_blocks_sub_button\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_offers_v_blocks_sub_button_locales_locale_parent_id_unique\` ON \`_offers_v_blocks_sub_button_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_offers_v_blocks_sub_video\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`source\` text DEFAULT 'upload',
  	\`file_id\` integer,
  	\`url\` text,
  	\`poster_id\` integer,
  	\`autoplay\` integer,
  	\`span\` text DEFAULT '1',
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`file_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`poster_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_offers_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_offers_v_blocks_sub_video_order_idx\` ON \`_offers_v_blocks_sub_video\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_offers_v_blocks_sub_video_parent_id_idx\` ON \`_offers_v_blocks_sub_video\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_offers_v_blocks_sub_video_path_idx\` ON \`_offers_v_blocks_sub_video\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`_offers_v_blocks_sub_video_file_idx\` ON \`_offers_v_blocks_sub_video\` (\`file_id\`);`)
  await db.run(sql`CREATE INDEX \`_offers_v_blocks_sub_video_poster_idx\` ON \`_offers_v_blocks_sub_video\` (\`poster_id\`);`)
  await db.run(sql`CREATE TABLE \`_offers_v_blocks_sub_quote\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text,
  	\`span\` text DEFAULT '1',
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_offers_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_offers_v_blocks_sub_quote_order_idx\` ON \`_offers_v_blocks_sub_quote\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_offers_v_blocks_sub_quote_parent_id_idx\` ON \`_offers_v_blocks_sub_quote\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_offers_v_blocks_sub_quote_path_idx\` ON \`_offers_v_blocks_sub_quote\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_offers_v_blocks_sub_quote_locales\` (
  	\`quote\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_offers_v_blocks_sub_quote\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_offers_v_blocks_sub_quote_locales_locale_parent_id_unique\` ON \`_offers_v_blocks_sub_quote_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_offers_v_blocks_sub_list_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_offers_v_blocks_sub_list\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_offers_v_blocks_sub_list_items_order_idx\` ON \`_offers_v_blocks_sub_list_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_offers_v_blocks_sub_list_items_parent_id_idx\` ON \`_offers_v_blocks_sub_list_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_offers_v_blocks_sub_list_items_locales\` (
  	\`text\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_offers_v_blocks_sub_list_items\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_offers_v_blocks_sub_list_items_locales_locale_parent_id_uni\` ON \`_offers_v_blocks_sub_list_items_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_offers_v_blocks_sub_list\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`span\` text DEFAULT '1',
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_offers_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_offers_v_blocks_sub_list_order_idx\` ON \`_offers_v_blocks_sub_list\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_offers_v_blocks_sub_list_parent_id_idx\` ON \`_offers_v_blocks_sub_list\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_offers_v_blocks_sub_list_path_idx\` ON \`_offers_v_blocks_sub_list\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_offers_v_blocks_sub_gap\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`size\` text DEFAULT 'm',
  	\`span\` text DEFAULT '1',
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_offers_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_offers_v_blocks_sub_gap_order_idx\` ON \`_offers_v_blocks_sub_gap\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_offers_v_blocks_sub_gap_parent_id_idx\` ON \`_offers_v_blocks_sub_gap\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_offers_v_blocks_sub_gap_path_idx\` ON \`_offers_v_blocks_sub_gap\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_offers_v_blocks_custom\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`tone\` text DEFAULT 'white',
  	\`columns\` text DEFAULT '2',
  	\`vertical_align\` text DEFAULT 'start',
  	\`design_heading_size\` text DEFAULT 'auto',
  	\`design_heading_font\` text DEFAULT 'auto',
  	\`design_text_size\` text DEFAULT 'auto',
  	\`design_align\` text DEFAULT 'auto',
  	\`design_background\` text,
  	\`design_frame\` text DEFAULT 'none',
  	\`design_padding_top\` text DEFAULT 'auto',
  	\`design_padding_bottom\` text DEFAULT 'auto',
  	\`design_margin_bottom\` text DEFAULT 'auto',
  	\`design_width\` text DEFAULT 'auto',
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
  await db.run(sql`CREATE INDEX \`_offers_v_blocks_custom_order_idx\` ON \`_offers_v_blocks_custom\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_offers_v_blocks_custom_parent_id_idx\` ON \`_offers_v_blocks_custom\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_offers_v_blocks_custom_path_idx\` ON \`_offers_v_blocks_custom\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_offers_v_blocks_custom_locales\` (
  	\`eyebrow\` text,
  	\`heading\` text,
  	\`intro\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_offers_v_blocks_custom\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_offers_v_blocks_custom_locales_locale_parent_id_unique\` ON \`_offers_v_blocks_custom_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_offers_v_blocks_slideshow_slides\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`image_id\` integer,
  	\`link_href\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_offers_v_blocks_slideshow\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_offers_v_blocks_slideshow_slides_order_idx\` ON \`_offers_v_blocks_slideshow_slides\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_offers_v_blocks_slideshow_slides_parent_id_idx\` ON \`_offers_v_blocks_slideshow_slides\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_offers_v_blocks_slideshow_slides_image_idx\` ON \`_offers_v_blocks_slideshow_slides\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`_offers_v_blocks_slideshow_slides_locales\` (
  	\`heading\` text,
  	\`text\` text,
  	\`link_label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_offers_v_blocks_slideshow_slides\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_offers_v_blocks_slideshow_slides_locales_locale_parent_id_u\` ON \`_offers_v_blocks_slideshow_slides_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_offers_v_blocks_slideshow\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`style\` text DEFAULT 'framed',
  	\`autoplay_seconds\` numeric DEFAULT 5,
  	\`tone\` text DEFAULT 'cream',
  	\`design_heading_size\` text DEFAULT 'auto',
  	\`design_heading_font\` text DEFAULT 'auto',
  	\`design_text_size\` text DEFAULT 'auto',
  	\`design_align\` text DEFAULT 'auto',
  	\`design_background\` text,
  	\`design_frame\` text DEFAULT 'none',
  	\`design_padding_top\` text DEFAULT 'auto',
  	\`design_padding_bottom\` text DEFAULT 'auto',
  	\`design_margin_bottom\` text DEFAULT 'auto',
  	\`design_width\` text DEFAULT 'auto',
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
  await db.run(sql`CREATE INDEX \`_offers_v_blocks_slideshow_order_idx\` ON \`_offers_v_blocks_slideshow\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_offers_v_blocks_slideshow_parent_id_idx\` ON \`_offers_v_blocks_slideshow\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_offers_v_blocks_slideshow_path_idx\` ON \`_offers_v_blocks_slideshow\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_offers_v_blocks_slideshow_locales\` (
  	\`heading\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_offers_v_blocks_slideshow\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_offers_v_blocks_slideshow_locales_locale_parent_id_unique\` ON \`_offers_v_blocks_slideshow_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`events_blocks_sub_heading\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`size\` text DEFAULT 'm',
  	\`span\` text DEFAULT '1',
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`events\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`events_blocks_sub_heading_order_idx\` ON \`events_blocks_sub_heading\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`events_blocks_sub_heading_parent_id_idx\` ON \`events_blocks_sub_heading\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`events_blocks_sub_heading_path_idx\` ON \`events_blocks_sub_heading\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`events_blocks_sub_heading_locales\` (
  	\`text\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`events_blocks_sub_heading\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`events_blocks_sub_heading_locales_locale_parent_id_unique\` ON \`events_blocks_sub_heading_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`events_blocks_sub_text\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`span\` text DEFAULT '1',
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`events\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`events_blocks_sub_text_order_idx\` ON \`events_blocks_sub_text\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`events_blocks_sub_text_parent_id_idx\` ON \`events_blocks_sub_text\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`events_blocks_sub_text_path_idx\` ON \`events_blocks_sub_text\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`events_blocks_sub_text_locales\` (
  	\`text\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`events_blocks_sub_text\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`events_blocks_sub_text_locales_locale_parent_id_unique\` ON \`events_blocks_sub_text_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`events_blocks_sub_image\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`image_id\` integer,
  	\`ratio\` text DEFAULT '4/3',
  	\`href\` text,
  	\`span\` text DEFAULT '1',
  	\`block_name\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`events\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`events_blocks_sub_image_order_idx\` ON \`events_blocks_sub_image\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`events_blocks_sub_image_parent_id_idx\` ON \`events_blocks_sub_image\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`events_blocks_sub_image_path_idx\` ON \`events_blocks_sub_image\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`events_blocks_sub_image_image_idx\` ON \`events_blocks_sub_image\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`events_blocks_sub_image_locales\` (
  	\`caption\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`events_blocks_sub_image\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`events_blocks_sub_image_locales_locale_parent_id_unique\` ON \`events_blocks_sub_image_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`events_blocks_sub_card\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`image_id\` integer,
  	\`link_href\` text,
  	\`span\` text DEFAULT '1',
  	\`block_name\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`events\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`events_blocks_sub_card_order_idx\` ON \`events_blocks_sub_card\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`events_blocks_sub_card_parent_id_idx\` ON \`events_blocks_sub_card\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`events_blocks_sub_card_path_idx\` ON \`events_blocks_sub_card\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`events_blocks_sub_card_image_idx\` ON \`events_blocks_sub_card\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`events_blocks_sub_card_locales\` (
  	\`title\` text,
  	\`text\` text,
  	\`link_label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`events_blocks_sub_card\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`events_blocks_sub_card_locales_locale_parent_id_unique\` ON \`events_blocks_sub_card_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`events_blocks_sub_button\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`href\` text,
  	\`style\` text DEFAULT 'primary',
  	\`span\` text DEFAULT '1',
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`events\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`events_blocks_sub_button_order_idx\` ON \`events_blocks_sub_button\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`events_blocks_sub_button_parent_id_idx\` ON \`events_blocks_sub_button\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`events_blocks_sub_button_path_idx\` ON \`events_blocks_sub_button\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`events_blocks_sub_button_locales\` (
  	\`label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`events_blocks_sub_button\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`events_blocks_sub_button_locales_locale_parent_id_unique\` ON \`events_blocks_sub_button_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`events_blocks_sub_video\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`source\` text DEFAULT 'upload',
  	\`file_id\` integer,
  	\`url\` text,
  	\`poster_id\` integer,
  	\`autoplay\` integer,
  	\`span\` text DEFAULT '1',
  	\`block_name\` text,
  	FOREIGN KEY (\`file_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`poster_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`events\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`events_blocks_sub_video_order_idx\` ON \`events_blocks_sub_video\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`events_blocks_sub_video_parent_id_idx\` ON \`events_blocks_sub_video\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`events_blocks_sub_video_path_idx\` ON \`events_blocks_sub_video\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`events_blocks_sub_video_file_idx\` ON \`events_blocks_sub_video\` (\`file_id\`);`)
  await db.run(sql`CREATE INDEX \`events_blocks_sub_video_poster_idx\` ON \`events_blocks_sub_video\` (\`poster_id\`);`)
  await db.run(sql`CREATE TABLE \`events_blocks_sub_quote\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name\` text,
  	\`span\` text DEFAULT '1',
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`events\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`events_blocks_sub_quote_order_idx\` ON \`events_blocks_sub_quote\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`events_blocks_sub_quote_parent_id_idx\` ON \`events_blocks_sub_quote\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`events_blocks_sub_quote_path_idx\` ON \`events_blocks_sub_quote\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`events_blocks_sub_quote_locales\` (
  	\`quote\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`events_blocks_sub_quote\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`events_blocks_sub_quote_locales_locale_parent_id_unique\` ON \`events_blocks_sub_quote_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`events_blocks_sub_list_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`events_blocks_sub_list\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`events_blocks_sub_list_items_order_idx\` ON \`events_blocks_sub_list_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`events_blocks_sub_list_items_parent_id_idx\` ON \`events_blocks_sub_list_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`events_blocks_sub_list_items_locales\` (
  	\`text\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`events_blocks_sub_list_items\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`events_blocks_sub_list_items_locales_locale_parent_id_unique\` ON \`events_blocks_sub_list_items_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`events_blocks_sub_list\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`span\` text DEFAULT '1',
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`events\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`events_blocks_sub_list_order_idx\` ON \`events_blocks_sub_list\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`events_blocks_sub_list_parent_id_idx\` ON \`events_blocks_sub_list\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`events_blocks_sub_list_path_idx\` ON \`events_blocks_sub_list\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`events_blocks_sub_gap\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`size\` text DEFAULT 'm',
  	\`span\` text DEFAULT '1',
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`events\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`events_blocks_sub_gap_order_idx\` ON \`events_blocks_sub_gap\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`events_blocks_sub_gap_parent_id_idx\` ON \`events_blocks_sub_gap\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`events_blocks_sub_gap_path_idx\` ON \`events_blocks_sub_gap\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`events_blocks_custom\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`tone\` text DEFAULT 'white',
  	\`columns\` text DEFAULT '2',
  	\`vertical_align\` text DEFAULT 'start',
  	\`design_heading_size\` text DEFAULT 'auto',
  	\`design_heading_font\` text DEFAULT 'auto',
  	\`design_text_size\` text DEFAULT 'auto',
  	\`design_align\` text DEFAULT 'auto',
  	\`design_background\` text,
  	\`design_frame\` text DEFAULT 'none',
  	\`design_padding_top\` text DEFAULT 'auto',
  	\`design_padding_bottom\` text DEFAULT 'auto',
  	\`design_margin_bottom\` text DEFAULT 'auto',
  	\`design_width\` text DEFAULT 'auto',
  	\`display_hidden\` integer,
  	\`display_show_on\` text DEFAULT 'all',
  	\`display_anchor\` text,
  	\`display_show_from\` text,
  	\`display_show_until\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`events\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`events_blocks_custom_order_idx\` ON \`events_blocks_custom\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`events_blocks_custom_parent_id_idx\` ON \`events_blocks_custom\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`events_blocks_custom_path_idx\` ON \`events_blocks_custom\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`events_blocks_custom_locales\` (
  	\`eyebrow\` text,
  	\`heading\` text,
  	\`intro\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`events_blocks_custom\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`events_blocks_custom_locales_locale_parent_id_unique\` ON \`events_blocks_custom_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`events_blocks_slideshow_slides\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`image_id\` integer,
  	\`link_href\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`events_blocks_slideshow\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`events_blocks_slideshow_slides_order_idx\` ON \`events_blocks_slideshow_slides\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`events_blocks_slideshow_slides_parent_id_idx\` ON \`events_blocks_slideshow_slides\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`events_blocks_slideshow_slides_image_idx\` ON \`events_blocks_slideshow_slides\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`events_blocks_slideshow_slides_locales\` (
  	\`heading\` text,
  	\`text\` text,
  	\`link_label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`events_blocks_slideshow_slides\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`events_blocks_slideshow_slides_locales_locale_parent_id_uniq\` ON \`events_blocks_slideshow_slides_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`events_blocks_slideshow\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`style\` text DEFAULT 'framed',
  	\`autoplay_seconds\` numeric DEFAULT 5,
  	\`tone\` text DEFAULT 'cream',
  	\`design_heading_size\` text DEFAULT 'auto',
  	\`design_heading_font\` text DEFAULT 'auto',
  	\`design_text_size\` text DEFAULT 'auto',
  	\`design_align\` text DEFAULT 'auto',
  	\`design_background\` text,
  	\`design_frame\` text DEFAULT 'none',
  	\`design_padding_top\` text DEFAULT 'auto',
  	\`design_padding_bottom\` text DEFAULT 'auto',
  	\`design_margin_bottom\` text DEFAULT 'auto',
  	\`design_width\` text DEFAULT 'auto',
  	\`display_hidden\` integer,
  	\`display_show_on\` text DEFAULT 'all',
  	\`display_anchor\` text,
  	\`display_show_from\` text,
  	\`display_show_until\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`events\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`events_blocks_slideshow_order_idx\` ON \`events_blocks_slideshow\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`events_blocks_slideshow_parent_id_idx\` ON \`events_blocks_slideshow\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`events_blocks_slideshow_path_idx\` ON \`events_blocks_slideshow\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`events_blocks_slideshow_locales\` (
  	\`heading\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`events_blocks_slideshow\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`events_blocks_slideshow_locales_locale_parent_id_unique\` ON \`events_blocks_slideshow_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_events_v_blocks_sub_heading\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`size\` text DEFAULT 'm',
  	\`span\` text DEFAULT '1',
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_events_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_events_v_blocks_sub_heading_order_idx\` ON \`_events_v_blocks_sub_heading\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_events_v_blocks_sub_heading_parent_id_idx\` ON \`_events_v_blocks_sub_heading\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_events_v_blocks_sub_heading_path_idx\` ON \`_events_v_blocks_sub_heading\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_events_v_blocks_sub_heading_locales\` (
  	\`text\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_events_v_blocks_sub_heading\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_events_v_blocks_sub_heading_locales_locale_parent_id_unique\` ON \`_events_v_blocks_sub_heading_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_events_v_blocks_sub_text\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`span\` text DEFAULT '1',
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_events_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_events_v_blocks_sub_text_order_idx\` ON \`_events_v_blocks_sub_text\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_events_v_blocks_sub_text_parent_id_idx\` ON \`_events_v_blocks_sub_text\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_events_v_blocks_sub_text_path_idx\` ON \`_events_v_blocks_sub_text\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_events_v_blocks_sub_text_locales\` (
  	\`text\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_events_v_blocks_sub_text\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_events_v_blocks_sub_text_locales_locale_parent_id_unique\` ON \`_events_v_blocks_sub_text_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_events_v_blocks_sub_image\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`image_id\` integer,
  	\`ratio\` text DEFAULT '4/3',
  	\`href\` text,
  	\`span\` text DEFAULT '1',
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_events_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_events_v_blocks_sub_image_order_idx\` ON \`_events_v_blocks_sub_image\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_events_v_blocks_sub_image_parent_id_idx\` ON \`_events_v_blocks_sub_image\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_events_v_blocks_sub_image_path_idx\` ON \`_events_v_blocks_sub_image\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`_events_v_blocks_sub_image_image_idx\` ON \`_events_v_blocks_sub_image\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`_events_v_blocks_sub_image_locales\` (
  	\`caption\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_events_v_blocks_sub_image\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_events_v_blocks_sub_image_locales_locale_parent_id_unique\` ON \`_events_v_blocks_sub_image_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_events_v_blocks_sub_card\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`image_id\` integer,
  	\`link_href\` text,
  	\`span\` text DEFAULT '1',
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_events_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_events_v_blocks_sub_card_order_idx\` ON \`_events_v_blocks_sub_card\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_events_v_blocks_sub_card_parent_id_idx\` ON \`_events_v_blocks_sub_card\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_events_v_blocks_sub_card_path_idx\` ON \`_events_v_blocks_sub_card\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`_events_v_blocks_sub_card_image_idx\` ON \`_events_v_blocks_sub_card\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`_events_v_blocks_sub_card_locales\` (
  	\`title\` text,
  	\`text\` text,
  	\`link_label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_events_v_blocks_sub_card\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_events_v_blocks_sub_card_locales_locale_parent_id_unique\` ON \`_events_v_blocks_sub_card_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_events_v_blocks_sub_button\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`href\` text,
  	\`style\` text DEFAULT 'primary',
  	\`span\` text DEFAULT '1',
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_events_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_events_v_blocks_sub_button_order_idx\` ON \`_events_v_blocks_sub_button\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_events_v_blocks_sub_button_parent_id_idx\` ON \`_events_v_blocks_sub_button\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_events_v_blocks_sub_button_path_idx\` ON \`_events_v_blocks_sub_button\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_events_v_blocks_sub_button_locales\` (
  	\`label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_events_v_blocks_sub_button\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_events_v_blocks_sub_button_locales_locale_parent_id_unique\` ON \`_events_v_blocks_sub_button_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_events_v_blocks_sub_video\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`source\` text DEFAULT 'upload',
  	\`file_id\` integer,
  	\`url\` text,
  	\`poster_id\` integer,
  	\`autoplay\` integer,
  	\`span\` text DEFAULT '1',
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`file_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`poster_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_events_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_events_v_blocks_sub_video_order_idx\` ON \`_events_v_blocks_sub_video\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_events_v_blocks_sub_video_parent_id_idx\` ON \`_events_v_blocks_sub_video\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_events_v_blocks_sub_video_path_idx\` ON \`_events_v_blocks_sub_video\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`_events_v_blocks_sub_video_file_idx\` ON \`_events_v_blocks_sub_video\` (\`file_id\`);`)
  await db.run(sql`CREATE INDEX \`_events_v_blocks_sub_video_poster_idx\` ON \`_events_v_blocks_sub_video\` (\`poster_id\`);`)
  await db.run(sql`CREATE TABLE \`_events_v_blocks_sub_quote\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text,
  	\`span\` text DEFAULT '1',
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_events_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_events_v_blocks_sub_quote_order_idx\` ON \`_events_v_blocks_sub_quote\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_events_v_blocks_sub_quote_parent_id_idx\` ON \`_events_v_blocks_sub_quote\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_events_v_blocks_sub_quote_path_idx\` ON \`_events_v_blocks_sub_quote\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_events_v_blocks_sub_quote_locales\` (
  	\`quote\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_events_v_blocks_sub_quote\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_events_v_blocks_sub_quote_locales_locale_parent_id_unique\` ON \`_events_v_blocks_sub_quote_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_events_v_blocks_sub_list_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_events_v_blocks_sub_list\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_events_v_blocks_sub_list_items_order_idx\` ON \`_events_v_blocks_sub_list_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_events_v_blocks_sub_list_items_parent_id_idx\` ON \`_events_v_blocks_sub_list_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_events_v_blocks_sub_list_items_locales\` (
  	\`text\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_events_v_blocks_sub_list_items\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_events_v_blocks_sub_list_items_locales_locale_parent_id_uni\` ON \`_events_v_blocks_sub_list_items_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_events_v_blocks_sub_list\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`span\` text DEFAULT '1',
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_events_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_events_v_blocks_sub_list_order_idx\` ON \`_events_v_blocks_sub_list\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_events_v_blocks_sub_list_parent_id_idx\` ON \`_events_v_blocks_sub_list\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_events_v_blocks_sub_list_path_idx\` ON \`_events_v_blocks_sub_list\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_events_v_blocks_sub_gap\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`size\` text DEFAULT 'm',
  	\`span\` text DEFAULT '1',
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_events_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_events_v_blocks_sub_gap_order_idx\` ON \`_events_v_blocks_sub_gap\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_events_v_blocks_sub_gap_parent_id_idx\` ON \`_events_v_blocks_sub_gap\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_events_v_blocks_sub_gap_path_idx\` ON \`_events_v_blocks_sub_gap\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_events_v_blocks_custom\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`tone\` text DEFAULT 'white',
  	\`columns\` text DEFAULT '2',
  	\`vertical_align\` text DEFAULT 'start',
  	\`design_heading_size\` text DEFAULT 'auto',
  	\`design_heading_font\` text DEFAULT 'auto',
  	\`design_text_size\` text DEFAULT 'auto',
  	\`design_align\` text DEFAULT 'auto',
  	\`design_background\` text,
  	\`design_frame\` text DEFAULT 'none',
  	\`design_padding_top\` text DEFAULT 'auto',
  	\`design_padding_bottom\` text DEFAULT 'auto',
  	\`design_margin_bottom\` text DEFAULT 'auto',
  	\`design_width\` text DEFAULT 'auto',
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
  await db.run(sql`CREATE INDEX \`_events_v_blocks_custom_order_idx\` ON \`_events_v_blocks_custom\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_events_v_blocks_custom_parent_id_idx\` ON \`_events_v_blocks_custom\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_events_v_blocks_custom_path_idx\` ON \`_events_v_blocks_custom\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_events_v_blocks_custom_locales\` (
  	\`eyebrow\` text,
  	\`heading\` text,
  	\`intro\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_events_v_blocks_custom\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_events_v_blocks_custom_locales_locale_parent_id_unique\` ON \`_events_v_blocks_custom_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_events_v_blocks_slideshow_slides\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`image_id\` integer,
  	\`link_href\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_events_v_blocks_slideshow\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_events_v_blocks_slideshow_slides_order_idx\` ON \`_events_v_blocks_slideshow_slides\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_events_v_blocks_slideshow_slides_parent_id_idx\` ON \`_events_v_blocks_slideshow_slides\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_events_v_blocks_slideshow_slides_image_idx\` ON \`_events_v_blocks_slideshow_slides\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`_events_v_blocks_slideshow_slides_locales\` (
  	\`heading\` text,
  	\`text\` text,
  	\`link_label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_events_v_blocks_slideshow_slides\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_events_v_blocks_slideshow_slides_locales_locale_parent_id_u\` ON \`_events_v_blocks_slideshow_slides_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_events_v_blocks_slideshow\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`style\` text DEFAULT 'framed',
  	\`autoplay_seconds\` numeric DEFAULT 5,
  	\`tone\` text DEFAULT 'cream',
  	\`design_heading_size\` text DEFAULT 'auto',
  	\`design_heading_font\` text DEFAULT 'auto',
  	\`design_text_size\` text DEFAULT 'auto',
  	\`design_align\` text DEFAULT 'auto',
  	\`design_background\` text,
  	\`design_frame\` text DEFAULT 'none',
  	\`design_padding_top\` text DEFAULT 'auto',
  	\`design_padding_bottom\` text DEFAULT 'auto',
  	\`design_margin_bottom\` text DEFAULT 'auto',
  	\`design_width\` text DEFAULT 'auto',
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
  await db.run(sql`CREATE INDEX \`_events_v_blocks_slideshow_order_idx\` ON \`_events_v_blocks_slideshow\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_events_v_blocks_slideshow_parent_id_idx\` ON \`_events_v_blocks_slideshow\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_events_v_blocks_slideshow_path_idx\` ON \`_events_v_blocks_slideshow\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_events_v_blocks_slideshow_locales\` (
  	\`heading\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_events_v_blocks_slideshow\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_events_v_blocks_slideshow_locales_locale_parent_id_unique\` ON \`_events_v_blocks_slideshow_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`posts_blocks_h3\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`posts_blocks_h3_order_idx\` ON \`posts_blocks_h3\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`posts_blocks_h3_parent_id_idx\` ON \`posts_blocks_h3\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`posts_blocks_h3_path_idx\` ON \`posts_blocks_h3\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`posts_blocks_h3_locales\` (
  	\`text\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`posts_blocks_h3\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`posts_blocks_h3_locales_locale_parent_id_unique\` ON \`posts_blocks_h3_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`posts_blocks_image\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`image_id\` integer,
  	\`size\` text DEFAULT 'column',
  	\`block_name\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`posts_blocks_image_order_idx\` ON \`posts_blocks_image\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`posts_blocks_image_parent_id_idx\` ON \`posts_blocks_image\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`posts_blocks_image_path_idx\` ON \`posts_blocks_image\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`posts_blocks_image_image_idx\` ON \`posts_blocks_image\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`posts_blocks_image_locales\` (
  	\`caption\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`posts_blocks_image\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`posts_blocks_image_locales_locale_parent_id_unique\` ON \`posts_blocks_image_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`posts_blocks_gallery\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`style\` text DEFAULT 'grid',
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`posts_blocks_gallery_order_idx\` ON \`posts_blocks_gallery\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`posts_blocks_gallery_parent_id_idx\` ON \`posts_blocks_gallery\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`posts_blocks_gallery_path_idx\` ON \`posts_blocks_gallery\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`posts_blocks_gallery_locales\` (
  	\`caption\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`posts_blocks_gallery\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`posts_blocks_gallery_locales_locale_parent_id_unique\` ON \`posts_blocks_gallery_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`posts_blocks_video\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`source\` text DEFAULT 'youtube',
  	\`url\` text,
  	\`file_id\` integer,
  	\`poster_id\` integer,
  	\`block_name\` text,
  	FOREIGN KEY (\`file_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`poster_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`posts_blocks_video_order_idx\` ON \`posts_blocks_video\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`posts_blocks_video_parent_id_idx\` ON \`posts_blocks_video\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`posts_blocks_video_path_idx\` ON \`posts_blocks_video\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`posts_blocks_video_file_idx\` ON \`posts_blocks_video\` (\`file_id\`);`)
  await db.run(sql`CREATE INDEX \`posts_blocks_video_poster_idx\` ON \`posts_blocks_video\` (\`poster_id\`);`)
  await db.run(sql`CREATE TABLE \`posts_blocks_video_locales\` (
  	\`caption\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`posts_blocks_video\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`posts_blocks_video_locales_locale_parent_id_unique\` ON \`posts_blocks_video_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`posts_blocks_image_text\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`image_id\` integer,
  	\`side\` text DEFAULT 'left',
  	\`block_name\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`posts_blocks_image_text_order_idx\` ON \`posts_blocks_image_text\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`posts_blocks_image_text_parent_id_idx\` ON \`posts_blocks_image_text\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`posts_blocks_image_text_path_idx\` ON \`posts_blocks_image_text\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`posts_blocks_image_text_image_idx\` ON \`posts_blocks_image_text\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`posts_blocks_image_text_locales\` (
  	\`heading\` text,
  	\`text\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`posts_blocks_image_text\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`posts_blocks_image_text_locales_locale_parent_id_unique\` ON \`posts_blocks_image_text_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`posts_blocks_quote\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`posts_blocks_quote_order_idx\` ON \`posts_blocks_quote\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`posts_blocks_quote_parent_id_idx\` ON \`posts_blocks_quote\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`posts_blocks_quote_path_idx\` ON \`posts_blocks_quote\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`posts_blocks_quote_locales\` (
  	\`text\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`posts_blocks_quote\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`posts_blocks_quote_locales_locale_parent_id_unique\` ON \`posts_blocks_quote_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`posts_blocks_offer\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`offer_id\` integer,
  	\`block_name\` text,
  	FOREIGN KEY (\`offer_id\`) REFERENCES \`offers\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`posts_blocks_offer_order_idx\` ON \`posts_blocks_offer\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`posts_blocks_offer_parent_id_idx\` ON \`posts_blocks_offer\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`posts_blocks_offer_path_idx\` ON \`posts_blocks_offer\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`posts_blocks_offer_offer_idx\` ON \`posts_blocks_offer\` (\`offer_id\`);`)
  await db.run(sql`CREATE TABLE \`posts_blocks_divider\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`note\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`posts_blocks_divider_order_idx\` ON \`posts_blocks_divider\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`posts_blocks_divider_parent_id_idx\` ON \`posts_blocks_divider\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`posts_blocks_divider_path_idx\` ON \`posts_blocks_divider\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`posts_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`media_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`posts_rels_order_idx\` ON \`posts_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`posts_rels_parent_idx\` ON \`posts_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`posts_rels_path_idx\` ON \`posts_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`posts_rels_media_id_idx\` ON \`posts_rels\` (\`media_id\`);`)
  await db.run(sql`CREATE TABLE \`_posts_v_blocks_h3\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_posts_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_posts_v_blocks_h3_order_idx\` ON \`_posts_v_blocks_h3\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_blocks_h3_parent_id_idx\` ON \`_posts_v_blocks_h3\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_blocks_h3_path_idx\` ON \`_posts_v_blocks_h3\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_posts_v_blocks_h3_locales\` (
  	\`text\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_posts_v_blocks_h3\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_posts_v_blocks_h3_locales_locale_parent_id_unique\` ON \`_posts_v_blocks_h3_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_posts_v_blocks_image\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`image_id\` integer,
  	\`size\` text DEFAULT 'column',
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_posts_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_posts_v_blocks_image_order_idx\` ON \`_posts_v_blocks_image\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_blocks_image_parent_id_idx\` ON \`_posts_v_blocks_image\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_blocks_image_path_idx\` ON \`_posts_v_blocks_image\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_blocks_image_image_idx\` ON \`_posts_v_blocks_image\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`_posts_v_blocks_image_locales\` (
  	\`caption\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_posts_v_blocks_image\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_posts_v_blocks_image_locales_locale_parent_id_unique\` ON \`_posts_v_blocks_image_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_posts_v_blocks_gallery\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`style\` text DEFAULT 'grid',
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_posts_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_posts_v_blocks_gallery_order_idx\` ON \`_posts_v_blocks_gallery\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_blocks_gallery_parent_id_idx\` ON \`_posts_v_blocks_gallery\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_blocks_gallery_path_idx\` ON \`_posts_v_blocks_gallery\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_posts_v_blocks_gallery_locales\` (
  	\`caption\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_posts_v_blocks_gallery\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_posts_v_blocks_gallery_locales_locale_parent_id_unique\` ON \`_posts_v_blocks_gallery_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_posts_v_blocks_video\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`source\` text DEFAULT 'youtube',
  	\`url\` text,
  	\`file_id\` integer,
  	\`poster_id\` integer,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`file_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`poster_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_posts_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_posts_v_blocks_video_order_idx\` ON \`_posts_v_blocks_video\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_blocks_video_parent_id_idx\` ON \`_posts_v_blocks_video\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_blocks_video_path_idx\` ON \`_posts_v_blocks_video\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_blocks_video_file_idx\` ON \`_posts_v_blocks_video\` (\`file_id\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_blocks_video_poster_idx\` ON \`_posts_v_blocks_video\` (\`poster_id\`);`)
  await db.run(sql`CREATE TABLE \`_posts_v_blocks_video_locales\` (
  	\`caption\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_posts_v_blocks_video\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_posts_v_blocks_video_locales_locale_parent_id_unique\` ON \`_posts_v_blocks_video_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_posts_v_blocks_image_text\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`image_id\` integer,
  	\`side\` text DEFAULT 'left',
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_posts_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_posts_v_blocks_image_text_order_idx\` ON \`_posts_v_blocks_image_text\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_blocks_image_text_parent_id_idx\` ON \`_posts_v_blocks_image_text\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_blocks_image_text_path_idx\` ON \`_posts_v_blocks_image_text\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_blocks_image_text_image_idx\` ON \`_posts_v_blocks_image_text\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`_posts_v_blocks_image_text_locales\` (
  	\`heading\` text,
  	\`text\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_posts_v_blocks_image_text\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_posts_v_blocks_image_text_locales_locale_parent_id_unique\` ON \`_posts_v_blocks_image_text_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_posts_v_blocks_quote\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_posts_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_posts_v_blocks_quote_order_idx\` ON \`_posts_v_blocks_quote\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_blocks_quote_parent_id_idx\` ON \`_posts_v_blocks_quote\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_blocks_quote_path_idx\` ON \`_posts_v_blocks_quote\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_posts_v_blocks_quote_locales\` (
  	\`text\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_posts_v_blocks_quote\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_posts_v_blocks_quote_locales_locale_parent_id_unique\` ON \`_posts_v_blocks_quote_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_posts_v_blocks_offer\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`offer_id\` integer,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`offer_id\`) REFERENCES \`offers\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_posts_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_posts_v_blocks_offer_order_idx\` ON \`_posts_v_blocks_offer\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_blocks_offer_parent_id_idx\` ON \`_posts_v_blocks_offer\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_blocks_offer_path_idx\` ON \`_posts_v_blocks_offer\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_blocks_offer_offer_idx\` ON \`_posts_v_blocks_offer\` (\`offer_id\`);`)
  await db.run(sql`CREATE TABLE \`_posts_v_blocks_divider\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`note\` text,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_posts_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_posts_v_blocks_divider_order_idx\` ON \`_posts_v_blocks_divider\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_blocks_divider_parent_id_idx\` ON \`_posts_v_blocks_divider\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_blocks_divider_path_idx\` ON \`_posts_v_blocks_divider\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_posts_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`media_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_posts_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_posts_v_rels_order_idx\` ON \`_posts_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_rels_parent_idx\` ON \`_posts_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_rels_path_idx\` ON \`_posts_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_rels_media_id_idx\` ON \`_posts_v_rels\` (\`media_id\`);`)
  await db.run(sql`CREATE TABLE \`worlds_blocks_sub_heading\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`size\` text DEFAULT 'm',
  	\`span\` text DEFAULT '1',
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`worlds\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`worlds_blocks_sub_heading_order_idx\` ON \`worlds_blocks_sub_heading\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`worlds_blocks_sub_heading_parent_id_idx\` ON \`worlds_blocks_sub_heading\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`worlds_blocks_sub_heading_path_idx\` ON \`worlds_blocks_sub_heading\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`worlds_blocks_sub_heading_locales\` (
  	\`text\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`worlds_blocks_sub_heading\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`worlds_blocks_sub_heading_locales_locale_parent_id_unique\` ON \`worlds_blocks_sub_heading_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`worlds_blocks_sub_text\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`span\` text DEFAULT '1',
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`worlds\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`worlds_blocks_sub_text_order_idx\` ON \`worlds_blocks_sub_text\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`worlds_blocks_sub_text_parent_id_idx\` ON \`worlds_blocks_sub_text\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`worlds_blocks_sub_text_path_idx\` ON \`worlds_blocks_sub_text\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`worlds_blocks_sub_text_locales\` (
  	\`text\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`worlds_blocks_sub_text\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`worlds_blocks_sub_text_locales_locale_parent_id_unique\` ON \`worlds_blocks_sub_text_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`worlds_blocks_sub_image\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`image_id\` integer NOT NULL,
  	\`ratio\` text DEFAULT '4/3',
  	\`href\` text,
  	\`span\` text DEFAULT '1',
  	\`block_name\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`worlds\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`worlds_blocks_sub_image_order_idx\` ON \`worlds_blocks_sub_image\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`worlds_blocks_sub_image_parent_id_idx\` ON \`worlds_blocks_sub_image\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`worlds_blocks_sub_image_path_idx\` ON \`worlds_blocks_sub_image\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`worlds_blocks_sub_image_image_idx\` ON \`worlds_blocks_sub_image\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`worlds_blocks_sub_image_locales\` (
  	\`caption\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`worlds_blocks_sub_image\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`worlds_blocks_sub_image_locales_locale_parent_id_unique\` ON \`worlds_blocks_sub_image_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`worlds_blocks_sub_card\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`image_id\` integer,
  	\`link_href\` text,
  	\`span\` text DEFAULT '1',
  	\`block_name\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`worlds\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`worlds_blocks_sub_card_order_idx\` ON \`worlds_blocks_sub_card\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`worlds_blocks_sub_card_parent_id_idx\` ON \`worlds_blocks_sub_card\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`worlds_blocks_sub_card_path_idx\` ON \`worlds_blocks_sub_card\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`worlds_blocks_sub_card_image_idx\` ON \`worlds_blocks_sub_card\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`worlds_blocks_sub_card_locales\` (
  	\`title\` text NOT NULL,
  	\`text\` text,
  	\`link_label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`worlds_blocks_sub_card\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`worlds_blocks_sub_card_locales_locale_parent_id_unique\` ON \`worlds_blocks_sub_card_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`worlds_blocks_sub_button\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`href\` text NOT NULL,
  	\`style\` text DEFAULT 'primary',
  	\`span\` text DEFAULT '1',
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`worlds\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`worlds_blocks_sub_button_order_idx\` ON \`worlds_blocks_sub_button\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`worlds_blocks_sub_button_parent_id_idx\` ON \`worlds_blocks_sub_button\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`worlds_blocks_sub_button_path_idx\` ON \`worlds_blocks_sub_button\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`worlds_blocks_sub_button_locales\` (
  	\`label\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`worlds_blocks_sub_button\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`worlds_blocks_sub_button_locales_locale_parent_id_unique\` ON \`worlds_blocks_sub_button_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`worlds_blocks_sub_video\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`source\` text DEFAULT 'upload',
  	\`file_id\` integer,
  	\`url\` text,
  	\`poster_id\` integer,
  	\`autoplay\` integer,
  	\`span\` text DEFAULT '1',
  	\`block_name\` text,
  	FOREIGN KEY (\`file_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`poster_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`worlds\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`worlds_blocks_sub_video_order_idx\` ON \`worlds_blocks_sub_video\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`worlds_blocks_sub_video_parent_id_idx\` ON \`worlds_blocks_sub_video\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`worlds_blocks_sub_video_path_idx\` ON \`worlds_blocks_sub_video\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`worlds_blocks_sub_video_file_idx\` ON \`worlds_blocks_sub_video\` (\`file_id\`);`)
  await db.run(sql`CREATE INDEX \`worlds_blocks_sub_video_poster_idx\` ON \`worlds_blocks_sub_video\` (\`poster_id\`);`)
  await db.run(sql`CREATE TABLE \`worlds_blocks_sub_quote\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name\` text,
  	\`span\` text DEFAULT '1',
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`worlds\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`worlds_blocks_sub_quote_order_idx\` ON \`worlds_blocks_sub_quote\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`worlds_blocks_sub_quote_parent_id_idx\` ON \`worlds_blocks_sub_quote\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`worlds_blocks_sub_quote_path_idx\` ON \`worlds_blocks_sub_quote\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`worlds_blocks_sub_quote_locales\` (
  	\`quote\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`worlds_blocks_sub_quote\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`worlds_blocks_sub_quote_locales_locale_parent_id_unique\` ON \`worlds_blocks_sub_quote_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`worlds_blocks_sub_list_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`worlds_blocks_sub_list\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`worlds_blocks_sub_list_items_order_idx\` ON \`worlds_blocks_sub_list_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`worlds_blocks_sub_list_items_parent_id_idx\` ON \`worlds_blocks_sub_list_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`worlds_blocks_sub_list_items_locales\` (
  	\`text\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`worlds_blocks_sub_list_items\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`worlds_blocks_sub_list_items_locales_locale_parent_id_unique\` ON \`worlds_blocks_sub_list_items_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`worlds_blocks_sub_list\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`span\` text DEFAULT '1',
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`worlds\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`worlds_blocks_sub_list_order_idx\` ON \`worlds_blocks_sub_list\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`worlds_blocks_sub_list_parent_id_idx\` ON \`worlds_blocks_sub_list\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`worlds_blocks_sub_list_path_idx\` ON \`worlds_blocks_sub_list\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`worlds_blocks_sub_gap\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`size\` text DEFAULT 'm',
  	\`span\` text DEFAULT '1',
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`worlds\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`worlds_blocks_sub_gap_order_idx\` ON \`worlds_blocks_sub_gap\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`worlds_blocks_sub_gap_parent_id_idx\` ON \`worlds_blocks_sub_gap\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`worlds_blocks_sub_gap_path_idx\` ON \`worlds_blocks_sub_gap\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`worlds_blocks_custom\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`tone\` text DEFAULT 'white',
  	\`columns\` text DEFAULT '2',
  	\`vertical_align\` text DEFAULT 'start',
  	\`design_heading_size\` text DEFAULT 'auto',
  	\`design_heading_font\` text DEFAULT 'auto',
  	\`design_text_size\` text DEFAULT 'auto',
  	\`design_align\` text DEFAULT 'auto',
  	\`design_background\` text,
  	\`design_frame\` text DEFAULT 'none',
  	\`design_padding_top\` text DEFAULT 'auto',
  	\`design_padding_bottom\` text DEFAULT 'auto',
  	\`design_margin_bottom\` text DEFAULT 'auto',
  	\`design_width\` text DEFAULT 'auto',
  	\`display_hidden\` integer,
  	\`display_show_on\` text DEFAULT 'all',
  	\`display_anchor\` text,
  	\`display_show_from\` text,
  	\`display_show_until\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`worlds\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`worlds_blocks_custom_order_idx\` ON \`worlds_blocks_custom\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`worlds_blocks_custom_parent_id_idx\` ON \`worlds_blocks_custom\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`worlds_blocks_custom_path_idx\` ON \`worlds_blocks_custom\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`worlds_blocks_custom_locales\` (
  	\`eyebrow\` text,
  	\`heading\` text,
  	\`intro\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`worlds_blocks_custom\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`worlds_blocks_custom_locales_locale_parent_id_unique\` ON \`worlds_blocks_custom_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`worlds_blocks_slideshow_slides\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`image_id\` integer NOT NULL,
  	\`link_href\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`worlds_blocks_slideshow\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`worlds_blocks_slideshow_slides_order_idx\` ON \`worlds_blocks_slideshow_slides\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`worlds_blocks_slideshow_slides_parent_id_idx\` ON \`worlds_blocks_slideshow_slides\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`worlds_blocks_slideshow_slides_image_idx\` ON \`worlds_blocks_slideshow_slides\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`worlds_blocks_slideshow_slides_locales\` (
  	\`heading\` text,
  	\`text\` text,
  	\`link_label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`worlds_blocks_slideshow_slides\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`worlds_blocks_slideshow_slides_locales_locale_parent_id_uniq\` ON \`worlds_blocks_slideshow_slides_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`worlds_blocks_slideshow\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`style\` text DEFAULT 'framed',
  	\`autoplay_seconds\` numeric DEFAULT 5,
  	\`tone\` text DEFAULT 'cream',
  	\`design_heading_size\` text DEFAULT 'auto',
  	\`design_heading_font\` text DEFAULT 'auto',
  	\`design_text_size\` text DEFAULT 'auto',
  	\`design_align\` text DEFAULT 'auto',
  	\`design_background\` text,
  	\`design_frame\` text DEFAULT 'none',
  	\`design_padding_top\` text DEFAULT 'auto',
  	\`design_padding_bottom\` text DEFAULT 'auto',
  	\`design_margin_bottom\` text DEFAULT 'auto',
  	\`design_width\` text DEFAULT 'auto',
  	\`display_hidden\` integer,
  	\`display_show_on\` text DEFAULT 'all',
  	\`display_anchor\` text,
  	\`display_show_from\` text,
  	\`display_show_until\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`worlds\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`worlds_blocks_slideshow_order_idx\` ON \`worlds_blocks_slideshow\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`worlds_blocks_slideshow_parent_id_idx\` ON \`worlds_blocks_slideshow\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`worlds_blocks_slideshow_path_idx\` ON \`worlds_blocks_slideshow\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`worlds_blocks_slideshow_locales\` (
  	\`heading\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`worlds_blocks_slideshow\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`worlds_blocks_slideshow_locales_locale_parent_id_unique\` ON \`worlds_blocks_slideshow_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`sections_blocks_sub_heading\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`size\` text DEFAULT 'm',
  	\`span\` text DEFAULT '1',
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`sections\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`sections_blocks_sub_heading_order_idx\` ON \`sections_blocks_sub_heading\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`sections_blocks_sub_heading_parent_id_idx\` ON \`sections_blocks_sub_heading\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`sections_blocks_sub_heading_path_idx\` ON \`sections_blocks_sub_heading\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`sections_blocks_sub_heading_locales\` (
  	\`text\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`sections_blocks_sub_heading\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`sections_blocks_sub_heading_locales_locale_parent_id_unique\` ON \`sections_blocks_sub_heading_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`sections_blocks_sub_text\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`span\` text DEFAULT '1',
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`sections\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`sections_blocks_sub_text_order_idx\` ON \`sections_blocks_sub_text\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`sections_blocks_sub_text_parent_id_idx\` ON \`sections_blocks_sub_text\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`sections_blocks_sub_text_path_idx\` ON \`sections_blocks_sub_text\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`sections_blocks_sub_text_locales\` (
  	\`text\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`sections_blocks_sub_text\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`sections_blocks_sub_text_locales_locale_parent_id_unique\` ON \`sections_blocks_sub_text_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`sections_blocks_sub_image\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`image_id\` integer,
  	\`ratio\` text DEFAULT '4/3',
  	\`href\` text,
  	\`span\` text DEFAULT '1',
  	\`block_name\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`sections\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`sections_blocks_sub_image_order_idx\` ON \`sections_blocks_sub_image\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`sections_blocks_sub_image_parent_id_idx\` ON \`sections_blocks_sub_image\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`sections_blocks_sub_image_path_idx\` ON \`sections_blocks_sub_image\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`sections_blocks_sub_image_image_idx\` ON \`sections_blocks_sub_image\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`sections_blocks_sub_image_locales\` (
  	\`caption\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`sections_blocks_sub_image\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`sections_blocks_sub_image_locales_locale_parent_id_unique\` ON \`sections_blocks_sub_image_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`sections_blocks_sub_card\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`image_id\` integer,
  	\`link_href\` text,
  	\`span\` text DEFAULT '1',
  	\`block_name\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`sections\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`sections_blocks_sub_card_order_idx\` ON \`sections_blocks_sub_card\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`sections_blocks_sub_card_parent_id_idx\` ON \`sections_blocks_sub_card\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`sections_blocks_sub_card_path_idx\` ON \`sections_blocks_sub_card\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`sections_blocks_sub_card_image_idx\` ON \`sections_blocks_sub_card\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`sections_blocks_sub_card_locales\` (
  	\`title\` text,
  	\`text\` text,
  	\`link_label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`sections_blocks_sub_card\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`sections_blocks_sub_card_locales_locale_parent_id_unique\` ON \`sections_blocks_sub_card_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`sections_blocks_sub_button\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`href\` text,
  	\`style\` text DEFAULT 'primary',
  	\`span\` text DEFAULT '1',
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`sections\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`sections_blocks_sub_button_order_idx\` ON \`sections_blocks_sub_button\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`sections_blocks_sub_button_parent_id_idx\` ON \`sections_blocks_sub_button\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`sections_blocks_sub_button_path_idx\` ON \`sections_blocks_sub_button\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`sections_blocks_sub_button_locales\` (
  	\`label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`sections_blocks_sub_button\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`sections_blocks_sub_button_locales_locale_parent_id_unique\` ON \`sections_blocks_sub_button_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`sections_blocks_sub_video\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`source\` text DEFAULT 'upload',
  	\`file_id\` integer,
  	\`url\` text,
  	\`poster_id\` integer,
  	\`autoplay\` integer,
  	\`span\` text DEFAULT '1',
  	\`block_name\` text,
  	FOREIGN KEY (\`file_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`poster_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`sections\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`sections_blocks_sub_video_order_idx\` ON \`sections_blocks_sub_video\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`sections_blocks_sub_video_parent_id_idx\` ON \`sections_blocks_sub_video\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`sections_blocks_sub_video_path_idx\` ON \`sections_blocks_sub_video\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`sections_blocks_sub_video_file_idx\` ON \`sections_blocks_sub_video\` (\`file_id\`);`)
  await db.run(sql`CREATE INDEX \`sections_blocks_sub_video_poster_idx\` ON \`sections_blocks_sub_video\` (\`poster_id\`);`)
  await db.run(sql`CREATE TABLE \`sections_blocks_sub_quote\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name\` text,
  	\`span\` text DEFAULT '1',
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`sections\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`sections_blocks_sub_quote_order_idx\` ON \`sections_blocks_sub_quote\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`sections_blocks_sub_quote_parent_id_idx\` ON \`sections_blocks_sub_quote\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`sections_blocks_sub_quote_path_idx\` ON \`sections_blocks_sub_quote\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`sections_blocks_sub_quote_locales\` (
  	\`quote\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`sections_blocks_sub_quote\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`sections_blocks_sub_quote_locales_locale_parent_id_unique\` ON \`sections_blocks_sub_quote_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`sections_blocks_sub_list_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`sections_blocks_sub_list\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`sections_blocks_sub_list_items_order_idx\` ON \`sections_blocks_sub_list_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`sections_blocks_sub_list_items_parent_id_idx\` ON \`sections_blocks_sub_list_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`sections_blocks_sub_list_items_locales\` (
  	\`text\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`sections_blocks_sub_list_items\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`sections_blocks_sub_list_items_locales_locale_parent_id_uniq\` ON \`sections_blocks_sub_list_items_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`sections_blocks_sub_list\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`span\` text DEFAULT '1',
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`sections\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`sections_blocks_sub_list_order_idx\` ON \`sections_blocks_sub_list\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`sections_blocks_sub_list_parent_id_idx\` ON \`sections_blocks_sub_list\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`sections_blocks_sub_list_path_idx\` ON \`sections_blocks_sub_list\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`sections_blocks_sub_gap\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`size\` text DEFAULT 'm',
  	\`span\` text DEFAULT '1',
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`sections\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`sections_blocks_sub_gap_order_idx\` ON \`sections_blocks_sub_gap\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`sections_blocks_sub_gap_parent_id_idx\` ON \`sections_blocks_sub_gap\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`sections_blocks_sub_gap_path_idx\` ON \`sections_blocks_sub_gap\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`sections_blocks_custom\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`tone\` text DEFAULT 'white',
  	\`columns\` text DEFAULT '2',
  	\`vertical_align\` text DEFAULT 'start',
  	\`design_heading_size\` text DEFAULT 'auto',
  	\`design_heading_font\` text DEFAULT 'auto',
  	\`design_text_size\` text DEFAULT 'auto',
  	\`design_align\` text DEFAULT 'auto',
  	\`design_background\` text,
  	\`design_frame\` text DEFAULT 'none',
  	\`design_padding_top\` text DEFAULT 'auto',
  	\`design_padding_bottom\` text DEFAULT 'auto',
  	\`design_margin_bottom\` text DEFAULT 'auto',
  	\`design_width\` text DEFAULT 'auto',
  	\`display_hidden\` integer,
  	\`display_show_on\` text DEFAULT 'all',
  	\`display_anchor\` text,
  	\`display_show_from\` text,
  	\`display_show_until\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`sections\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`sections_blocks_custom_order_idx\` ON \`sections_blocks_custom\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`sections_blocks_custom_parent_id_idx\` ON \`sections_blocks_custom\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`sections_blocks_custom_path_idx\` ON \`sections_blocks_custom\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`sections_blocks_custom_locales\` (
  	\`eyebrow\` text,
  	\`heading\` text,
  	\`intro\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`sections_blocks_custom\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`sections_blocks_custom_locales_locale_parent_id_unique\` ON \`sections_blocks_custom_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`sections_blocks_slideshow_slides\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`image_id\` integer,
  	\`link_href\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`sections_blocks_slideshow\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`sections_blocks_slideshow_slides_order_idx\` ON \`sections_blocks_slideshow_slides\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`sections_blocks_slideshow_slides_parent_id_idx\` ON \`sections_blocks_slideshow_slides\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`sections_blocks_slideshow_slides_image_idx\` ON \`sections_blocks_slideshow_slides\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`sections_blocks_slideshow_slides_locales\` (
  	\`heading\` text,
  	\`text\` text,
  	\`link_label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`sections_blocks_slideshow_slides\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`sections_blocks_slideshow_slides_locales_locale_parent_id_un\` ON \`sections_blocks_slideshow_slides_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`sections_blocks_slideshow\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`style\` text DEFAULT 'framed',
  	\`autoplay_seconds\` numeric DEFAULT 5,
  	\`tone\` text DEFAULT 'cream',
  	\`design_heading_size\` text DEFAULT 'auto',
  	\`design_heading_font\` text DEFAULT 'auto',
  	\`design_text_size\` text DEFAULT 'auto',
  	\`design_align\` text DEFAULT 'auto',
  	\`design_background\` text,
  	\`design_frame\` text DEFAULT 'none',
  	\`design_padding_top\` text DEFAULT 'auto',
  	\`design_padding_bottom\` text DEFAULT 'auto',
  	\`design_margin_bottom\` text DEFAULT 'auto',
  	\`design_width\` text DEFAULT 'auto',
  	\`display_hidden\` integer,
  	\`display_show_on\` text DEFAULT 'all',
  	\`display_anchor\` text,
  	\`display_show_from\` text,
  	\`display_show_until\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`sections\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`sections_blocks_slideshow_order_idx\` ON \`sections_blocks_slideshow\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`sections_blocks_slideshow_parent_id_idx\` ON \`sections_blocks_slideshow\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`sections_blocks_slideshow_path_idx\` ON \`sections_blocks_slideshow\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`sections_blocks_slideshow_locales\` (
  	\`heading\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`sections_blocks_slideshow\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`sections_blocks_slideshow_locales_locale_parent_id_unique\` ON \`sections_blocks_slideshow_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_sections_v_blocks_sub_heading\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`size\` text DEFAULT 'm',
  	\`span\` text DEFAULT '1',
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_sections_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_sections_v_blocks_sub_heading_order_idx\` ON \`_sections_v_blocks_sub_heading\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_sections_v_blocks_sub_heading_parent_id_idx\` ON \`_sections_v_blocks_sub_heading\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_sections_v_blocks_sub_heading_path_idx\` ON \`_sections_v_blocks_sub_heading\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_sections_v_blocks_sub_heading_locales\` (
  	\`text\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_sections_v_blocks_sub_heading\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_sections_v_blocks_sub_heading_locales_locale_parent_id_uniq\` ON \`_sections_v_blocks_sub_heading_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_sections_v_blocks_sub_text\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`span\` text DEFAULT '1',
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_sections_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_sections_v_blocks_sub_text_order_idx\` ON \`_sections_v_blocks_sub_text\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_sections_v_blocks_sub_text_parent_id_idx\` ON \`_sections_v_blocks_sub_text\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_sections_v_blocks_sub_text_path_idx\` ON \`_sections_v_blocks_sub_text\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_sections_v_blocks_sub_text_locales\` (
  	\`text\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_sections_v_blocks_sub_text\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_sections_v_blocks_sub_text_locales_locale_parent_id_unique\` ON \`_sections_v_blocks_sub_text_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_sections_v_blocks_sub_image\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`image_id\` integer,
  	\`ratio\` text DEFAULT '4/3',
  	\`href\` text,
  	\`span\` text DEFAULT '1',
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_sections_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_sections_v_blocks_sub_image_order_idx\` ON \`_sections_v_blocks_sub_image\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_sections_v_blocks_sub_image_parent_id_idx\` ON \`_sections_v_blocks_sub_image\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_sections_v_blocks_sub_image_path_idx\` ON \`_sections_v_blocks_sub_image\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`_sections_v_blocks_sub_image_image_idx\` ON \`_sections_v_blocks_sub_image\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`_sections_v_blocks_sub_image_locales\` (
  	\`caption\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_sections_v_blocks_sub_image\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_sections_v_blocks_sub_image_locales_locale_parent_id_unique\` ON \`_sections_v_blocks_sub_image_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_sections_v_blocks_sub_card\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`image_id\` integer,
  	\`link_href\` text,
  	\`span\` text DEFAULT '1',
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_sections_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_sections_v_blocks_sub_card_order_idx\` ON \`_sections_v_blocks_sub_card\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_sections_v_blocks_sub_card_parent_id_idx\` ON \`_sections_v_blocks_sub_card\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_sections_v_blocks_sub_card_path_idx\` ON \`_sections_v_blocks_sub_card\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`_sections_v_blocks_sub_card_image_idx\` ON \`_sections_v_blocks_sub_card\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`_sections_v_blocks_sub_card_locales\` (
  	\`title\` text,
  	\`text\` text,
  	\`link_label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_sections_v_blocks_sub_card\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_sections_v_blocks_sub_card_locales_locale_parent_id_unique\` ON \`_sections_v_blocks_sub_card_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_sections_v_blocks_sub_button\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`href\` text,
  	\`style\` text DEFAULT 'primary',
  	\`span\` text DEFAULT '1',
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_sections_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_sections_v_blocks_sub_button_order_idx\` ON \`_sections_v_blocks_sub_button\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_sections_v_blocks_sub_button_parent_id_idx\` ON \`_sections_v_blocks_sub_button\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_sections_v_blocks_sub_button_path_idx\` ON \`_sections_v_blocks_sub_button\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_sections_v_blocks_sub_button_locales\` (
  	\`label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_sections_v_blocks_sub_button\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_sections_v_blocks_sub_button_locales_locale_parent_id_uniqu\` ON \`_sections_v_blocks_sub_button_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_sections_v_blocks_sub_video\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`source\` text DEFAULT 'upload',
  	\`file_id\` integer,
  	\`url\` text,
  	\`poster_id\` integer,
  	\`autoplay\` integer,
  	\`span\` text DEFAULT '1',
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`file_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`poster_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_sections_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_sections_v_blocks_sub_video_order_idx\` ON \`_sections_v_blocks_sub_video\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_sections_v_blocks_sub_video_parent_id_idx\` ON \`_sections_v_blocks_sub_video\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_sections_v_blocks_sub_video_path_idx\` ON \`_sections_v_blocks_sub_video\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`_sections_v_blocks_sub_video_file_idx\` ON \`_sections_v_blocks_sub_video\` (\`file_id\`);`)
  await db.run(sql`CREATE INDEX \`_sections_v_blocks_sub_video_poster_idx\` ON \`_sections_v_blocks_sub_video\` (\`poster_id\`);`)
  await db.run(sql`CREATE TABLE \`_sections_v_blocks_sub_quote\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text,
  	\`span\` text DEFAULT '1',
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_sections_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_sections_v_blocks_sub_quote_order_idx\` ON \`_sections_v_blocks_sub_quote\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_sections_v_blocks_sub_quote_parent_id_idx\` ON \`_sections_v_blocks_sub_quote\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_sections_v_blocks_sub_quote_path_idx\` ON \`_sections_v_blocks_sub_quote\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_sections_v_blocks_sub_quote_locales\` (
  	\`quote\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_sections_v_blocks_sub_quote\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_sections_v_blocks_sub_quote_locales_locale_parent_id_unique\` ON \`_sections_v_blocks_sub_quote_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_sections_v_blocks_sub_list_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_sections_v_blocks_sub_list\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_sections_v_blocks_sub_list_items_order_idx\` ON \`_sections_v_blocks_sub_list_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_sections_v_blocks_sub_list_items_parent_id_idx\` ON \`_sections_v_blocks_sub_list_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_sections_v_blocks_sub_list_items_locales\` (
  	\`text\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_sections_v_blocks_sub_list_items\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_sections_v_blocks_sub_list_items_locales_locale_parent_id_u\` ON \`_sections_v_blocks_sub_list_items_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_sections_v_blocks_sub_list\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`span\` text DEFAULT '1',
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_sections_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_sections_v_blocks_sub_list_order_idx\` ON \`_sections_v_blocks_sub_list\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_sections_v_blocks_sub_list_parent_id_idx\` ON \`_sections_v_blocks_sub_list\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_sections_v_blocks_sub_list_path_idx\` ON \`_sections_v_blocks_sub_list\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_sections_v_blocks_sub_gap\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`size\` text DEFAULT 'm',
  	\`span\` text DEFAULT '1',
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_sections_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_sections_v_blocks_sub_gap_order_idx\` ON \`_sections_v_blocks_sub_gap\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_sections_v_blocks_sub_gap_parent_id_idx\` ON \`_sections_v_blocks_sub_gap\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_sections_v_blocks_sub_gap_path_idx\` ON \`_sections_v_blocks_sub_gap\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_sections_v_blocks_custom\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`tone\` text DEFAULT 'white',
  	\`columns\` text DEFAULT '2',
  	\`vertical_align\` text DEFAULT 'start',
  	\`design_heading_size\` text DEFAULT 'auto',
  	\`design_heading_font\` text DEFAULT 'auto',
  	\`design_text_size\` text DEFAULT 'auto',
  	\`design_align\` text DEFAULT 'auto',
  	\`design_background\` text,
  	\`design_frame\` text DEFAULT 'none',
  	\`design_padding_top\` text DEFAULT 'auto',
  	\`design_padding_bottom\` text DEFAULT 'auto',
  	\`design_margin_bottom\` text DEFAULT 'auto',
  	\`design_width\` text DEFAULT 'auto',
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
  await db.run(sql`CREATE INDEX \`_sections_v_blocks_custom_order_idx\` ON \`_sections_v_blocks_custom\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_sections_v_blocks_custom_parent_id_idx\` ON \`_sections_v_blocks_custom\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_sections_v_blocks_custom_path_idx\` ON \`_sections_v_blocks_custom\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_sections_v_blocks_custom_locales\` (
  	\`eyebrow\` text,
  	\`heading\` text,
  	\`intro\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_sections_v_blocks_custom\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_sections_v_blocks_custom_locales_locale_parent_id_unique\` ON \`_sections_v_blocks_custom_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_sections_v_blocks_slideshow_slides\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`image_id\` integer,
  	\`link_href\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_sections_v_blocks_slideshow\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_sections_v_blocks_slideshow_slides_order_idx\` ON \`_sections_v_blocks_slideshow_slides\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_sections_v_blocks_slideshow_slides_parent_id_idx\` ON \`_sections_v_blocks_slideshow_slides\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_sections_v_blocks_slideshow_slides_image_idx\` ON \`_sections_v_blocks_slideshow_slides\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`_sections_v_blocks_slideshow_slides_locales\` (
  	\`heading\` text,
  	\`text\` text,
  	\`link_label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_sections_v_blocks_slideshow_slides\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_sections_v_blocks_slideshow_slides_locales_locale_parent_id\` ON \`_sections_v_blocks_slideshow_slides_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_sections_v_blocks_slideshow\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`style\` text DEFAULT 'framed',
  	\`autoplay_seconds\` numeric DEFAULT 5,
  	\`tone\` text DEFAULT 'cream',
  	\`design_heading_size\` text DEFAULT 'auto',
  	\`design_heading_font\` text DEFAULT 'auto',
  	\`design_text_size\` text DEFAULT 'auto',
  	\`design_align\` text DEFAULT 'auto',
  	\`design_background\` text,
  	\`design_frame\` text DEFAULT 'none',
  	\`design_padding_top\` text DEFAULT 'auto',
  	\`design_padding_bottom\` text DEFAULT 'auto',
  	\`design_margin_bottom\` text DEFAULT 'auto',
  	\`design_width\` text DEFAULT 'auto',
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
  await db.run(sql`CREATE INDEX \`_sections_v_blocks_slideshow_order_idx\` ON \`_sections_v_blocks_slideshow\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_sections_v_blocks_slideshow_parent_id_idx\` ON \`_sections_v_blocks_slideshow\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_sections_v_blocks_slideshow_path_idx\` ON \`_sections_v_blocks_slideshow\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_sections_v_blocks_slideshow_locales\` (
  	\`heading\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_sections_v_blocks_slideshow\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_sections_v_blocks_slideshow_locales_locale_parent_id_unique\` ON \`_sections_v_blocks_slideshow_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`payload_jobs_stats\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`stats\` text,
  	\`updated_at\` text,
  	\`created_at\` text
  );
  `)
  await db.run(sql`PRAGMA foreign_keys=OFF;`)
  await db.run(sql`CREATE TABLE \`__new_worlds_blocks_image_text\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`media\` text DEFAULT 'image',
  	\`image_id\` integer,
  	\`video_id\` integer,
  	\`video_url\` text,
  	\`autoplay\` integer,
  	\`image_side\` text DEFAULT 'right',
  	\`split\` text DEFAULT '50',
  	\`image_style\` text DEFAULT 'framed',
  	\`tone\` text DEFAULT 'white',
  	\`cta_href\` text,
  	\`secondary_href\` text,
  	\`design_heading_size\` text DEFAULT 'auto',
  	\`design_heading_font\` text DEFAULT 'auto',
  	\`design_text_size\` text DEFAULT 'auto',
  	\`design_align\` text DEFAULT 'auto',
  	\`design_background\` text,
  	\`design_frame\` text DEFAULT 'none',
  	\`design_padding_top\` text DEFAULT 'auto',
  	\`design_padding_bottom\` text DEFAULT 'auto',
  	\`design_margin_bottom\` text DEFAULT 'auto',
  	\`design_width\` text DEFAULT 'auto',
  	\`display_hidden\` integer,
  	\`display_show_on\` text DEFAULT 'all',
  	\`display_anchor\` text,
  	\`display_show_from\` text,
  	\`display_show_until\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`video_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`worlds\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_worlds_blocks_image_text\`("_order", "_parent_id", "_path", "id", "image_id", "image_side", "tone", "cta_href", "display_hidden", "display_show_on", "display_anchor", "display_show_from", "display_show_until", "block_name") SELECT "_order", "_parent_id", "_path", "id", "image_id", "image_side", "tone", "cta_href", "display_hidden", "display_show_on", "display_anchor", "display_show_from", "display_show_until", "block_name" FROM \`worlds_blocks_image_text\`;`)
  await db.run(sql`DROP TABLE \`worlds_blocks_image_text\`;`)
  await db.run(sql`ALTER TABLE \`__new_worlds_blocks_image_text\` RENAME TO \`worlds_blocks_image_text\`;`)
  await db.run(sql`PRAGMA foreign_keys=ON;`)
  await db.run(sql`CREATE INDEX \`worlds_blocks_image_text_order_idx\` ON \`worlds_blocks_image_text\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`worlds_blocks_image_text_parent_id_idx\` ON \`worlds_blocks_image_text\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`worlds_blocks_image_text_path_idx\` ON \`worlds_blocks_image_text\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`worlds_blocks_image_text_image_idx\` ON \`worlds_blocks_image_text\` (\`image_id\`);`)
  await db.run(sql`CREATE INDEX \`worlds_blocks_image_text_video_idx\` ON \`worlds_blocks_image_text\` (\`video_id\`);`)
  await db.run(sql`ALTER TABLE \`pages_blocks_hero\` ADD \`design_heading_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_hero\` ADD \`design_heading_font\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_hero\` ADD \`design_text_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_hero\` ADD \`design_background\` text;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_hero\` ADD \`design_frame\` text DEFAULT 'none';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_hero\` ADD \`design_padding_top\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_hero\` ADD \`design_padding_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_hero\` ADD \`design_margin_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_hero\` ADD \`design_width\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_ticker\` ADD \`design_heading_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_ticker\` ADD \`design_heading_font\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_ticker\` ADD \`design_text_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_ticker\` ADD \`design_background\` text;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_ticker\` ADD \`design_frame\` text DEFAULT 'none';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_ticker\` ADD \`design_padding_top\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_ticker\` ADD \`design_padding_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_ticker\` ADD \`design_margin_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_ticker\` ADD \`design_width\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_offer_spotlight\` ADD \`design_heading_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_offer_spotlight\` ADD \`design_heading_font\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_offer_spotlight\` ADD \`design_text_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_offer_spotlight\` ADD \`design_align\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_offer_spotlight\` ADD \`design_background\` text;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_offer_spotlight\` ADD \`design_frame\` text DEFAULT 'none';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_offer_spotlight\` ADD \`design_padding_top\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_offer_spotlight\` ADD \`design_padding_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_offer_spotlight\` ADD \`design_margin_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_offer_spotlight\` ADD \`design_width\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_countdown\` ADD \`design_heading_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_countdown\` ADD \`design_heading_font\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_countdown\` ADD \`design_text_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_countdown\` ADD \`design_align\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_countdown\` ADD \`design_background\` text;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_countdown\` ADD \`design_frame\` text DEFAULT 'none';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_countdown\` ADD \`design_padding_top\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_countdown\` ADD \`design_padding_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_countdown\` ADD \`design_margin_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_countdown\` ADD \`design_width\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_cta_band\` ADD \`design_heading_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_cta_band\` ADD \`design_heading_font\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_cta_band\` ADD \`design_text_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_cta_band\` ADD \`design_align\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_cta_band\` ADD \`design_background\` text;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_cta_band\` ADD \`design_frame\` text DEFAULT 'none';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_cta_band\` ADD \`design_padding_top\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_cta_band\` ADD \`design_padding_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_cta_band\` ADD \`design_margin_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_cta_band\` ADD \`design_width\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_ticket_cards\` ADD \`design_heading_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_ticket_cards\` ADD \`design_heading_font\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_ticket_cards\` ADD \`design_text_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_ticket_cards\` ADD \`design_background\` text;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_ticket_cards\` ADD \`design_frame\` text DEFAULT 'none';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_ticket_cards\` ADD \`design_padding_top\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_ticket_cards\` ADD \`design_padding_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_ticket_cards\` ADD \`design_margin_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_ticket_cards\` ADD \`design_width\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_offer_grid\` ADD \`design_heading_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_offer_grid\` ADD \`design_heading_font\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_offer_grid\` ADD \`design_text_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_offer_grid\` ADD \`design_background\` text;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_offer_grid\` ADD \`design_frame\` text DEFAULT 'none';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_offer_grid\` ADD \`design_padding_top\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_offer_grid\` ADD \`design_padding_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_offer_grid\` ADD \`design_margin_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_offer_grid\` ADD \`design_width\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_worlds_grid\` ADD \`design_heading_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_worlds_grid\` ADD \`design_heading_font\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_worlds_grid\` ADD \`design_text_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_worlds_grid\` ADD \`design_background\` text;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_worlds_grid\` ADD \`design_frame\` text DEFAULT 'none';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_worlds_grid\` ADD \`design_padding_top\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_worlds_grid\` ADD \`design_padding_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_worlds_grid\` ADD \`design_margin_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_worlds_grid\` ADD \`design_width\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_rides_list\` ADD \`design_heading_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_rides_list\` ADD \`design_heading_font\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_rides_list\` ADD \`design_text_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_rides_list\` ADD \`design_background\` text;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_rides_list\` ADD \`design_frame\` text DEFAULT 'none';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_rides_list\` ADD \`design_padding_top\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_rides_list\` ADD \`design_padding_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_rides_list\` ADD \`design_margin_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_rides_list\` ADD \`design_width\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_events_rail\` ADD \`design_heading_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_events_rail\` ADD \`design_heading_font\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_events_rail\` ADD \`design_text_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_events_rail\` ADD \`design_background\` text;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_events_rail\` ADD \`design_frame\` text DEFAULT 'none';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_events_rail\` ADD \`design_padding_top\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_events_rail\` ADD \`design_padding_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_events_rail\` ADD \`design_margin_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_events_rail\` ADD \`design_width\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_today_status\` ADD \`design_heading_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_today_status\` ADD \`design_heading_font\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_today_status\` ADD \`design_text_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_today_status\` ADD \`design_background\` text;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_today_status\` ADD \`design_frame\` text DEFAULT 'none';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_today_status\` ADD \`design_padding_top\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_today_status\` ADD \`design_padding_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_today_status\` ADD \`design_margin_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_today_status\` ADD \`design_width\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_crew_planner\` ADD \`design_heading_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_crew_planner\` ADD \`design_heading_font\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_crew_planner\` ADD \`design_text_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_crew_planner\` ADD \`design_background\` text;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_crew_planner\` ADD \`design_frame\` text DEFAULT 'none';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_crew_planner\` ADD \`design_padding_top\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_crew_planner\` ADD \`design_padding_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_crew_planner\` ADD \`design_margin_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_crew_planner\` ADD \`design_width\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_venues_grid\` ADD \`design_heading_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_venues_grid\` ADD \`design_heading_font\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_venues_grid\` ADD \`design_text_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_venues_grid\` ADD \`design_background\` text;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_venues_grid\` ADD \`design_frame\` text DEFAULT 'none';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_venues_grid\` ADD \`design_padding_top\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_venues_grid\` ADD \`design_padding_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_venues_grid\` ADD \`design_margin_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_venues_grid\` ADD \`design_width\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_map\` ADD \`design_heading_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_map\` ADD \`design_heading_font\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_map\` ADD \`design_text_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_map\` ADD \`design_align\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_map\` ADD \`design_background\` text;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_map\` ADD \`design_frame\` text DEFAULT 'none';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_map\` ADD \`design_padding_top\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_map\` ADD \`design_padding_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_map\` ADD \`design_margin_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_map\` ADD \`design_width\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_stats\` ADD \`design_heading_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_stats\` ADD \`design_heading_font\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_stats\` ADD \`design_text_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_stats\` ADD \`design_align\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_stats\` ADD \`design_background\` text;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_stats\` ADD \`design_frame\` text DEFAULT 'none';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_stats\` ADD \`design_padding_top\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_stats\` ADD \`design_padding_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_stats\` ADD \`design_margin_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_stats\` ADD \`design_width\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_image_text\` ADD \`media\` text DEFAULT 'image';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_image_text\` ADD \`video_id\` integer REFERENCES media(id);`)
  await db.run(sql`ALTER TABLE \`pages_blocks_image_text\` ADD \`video_url\` text;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_image_text\` ADD \`autoplay\` integer;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_image_text\` ADD \`split\` text DEFAULT '50';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_image_text\` ADD \`image_style\` text DEFAULT 'framed';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_image_text\` ADD \`secondary_href\` text;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_image_text\` ADD \`design_heading_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_image_text\` ADD \`design_heading_font\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_image_text\` ADD \`design_text_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_image_text\` ADD \`design_align\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_image_text\` ADD \`design_background\` text;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_image_text\` ADD \`design_frame\` text DEFAULT 'none';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_image_text\` ADD \`design_padding_top\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_image_text\` ADD \`design_padding_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_image_text\` ADD \`design_margin_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_image_text\` ADD \`design_width\` text DEFAULT 'auto';`)
  await db.run(sql`CREATE INDEX \`pages_blocks_image_text_video_idx\` ON \`pages_blocks_image_text\` (\`video_id\`);`)
  await db.run(sql`ALTER TABLE \`pages_blocks_image_text_locales\` ADD \`secondary_label\` text;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_columns\` ADD \`design_heading_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_columns\` ADD \`design_heading_font\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_columns\` ADD \`design_text_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_columns\` ADD \`design_align\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_columns\` ADD \`design_background\` text;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_columns\` ADD \`design_frame\` text DEFAULT 'none';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_columns\` ADD \`design_padding_top\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_columns\` ADD \`design_padding_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_columns\` ADD \`design_margin_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_columns\` ADD \`design_width\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_rich_text\` ADD \`design_heading_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_rich_text\` ADD \`design_heading_font\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_rich_text\` ADD \`design_text_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_rich_text\` ADD \`design_align\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_rich_text\` ADD \`design_background\` text;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_rich_text\` ADD \`design_frame\` text DEFAULT 'none';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_rich_text\` ADD \`design_padding_top\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_rich_text\` ADD \`design_padding_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_rich_text\` ADD \`design_margin_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_rich_text\` ADD \`design_width\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_video\` ADD \`design_heading_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_video\` ADD \`design_heading_font\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_video\` ADD \`design_text_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_video\` ADD \`design_align\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_video\` ADD \`design_background\` text;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_video\` ADD \`design_frame\` text DEFAULT 'none';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_video\` ADD \`design_padding_top\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_video\` ADD \`design_padding_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_video\` ADD \`design_margin_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_video\` ADD \`design_width\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_gallery\` ADD \`columns\` text DEFAULT '3';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_gallery\` ADD \`design_heading_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_gallery\` ADD \`design_heading_font\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_gallery\` ADD \`design_text_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_gallery\` ADD \`design_align\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_gallery\` ADD \`design_background\` text;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_gallery\` ADD \`design_frame\` text DEFAULT 'none';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_gallery\` ADD \`design_padding_top\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_gallery\` ADD \`design_padding_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_gallery\` ADD \`design_margin_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_gallery\` ADD \`design_width\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_testimonials\` ADD \`design_heading_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_testimonials\` ADD \`design_heading_font\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_testimonials\` ADD \`design_text_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_testimonials\` ADD \`design_align\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_testimonials\` ADD \`design_background\` text;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_testimonials\` ADD \`design_frame\` text DEFAULT 'none';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_testimonials\` ADD \`design_padding_top\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_testimonials\` ADD \`design_padding_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_testimonials\` ADD \`design_margin_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_testimonials\` ADD \`design_width\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_logo_strip\` ADD \`design_heading_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_logo_strip\` ADD \`design_heading_font\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_logo_strip\` ADD \`design_text_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_logo_strip\` ADD \`design_align\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_logo_strip\` ADD \`design_background\` text;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_logo_strip\` ADD \`design_frame\` text DEFAULT 'none';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_logo_strip\` ADD \`design_padding_top\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_logo_strip\` ADD \`design_padding_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_logo_strip\` ADD \`design_margin_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_logo_strip\` ADD \`design_width\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_faq\` ADD \`design_heading_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_faq\` ADD \`design_heading_font\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_faq\` ADD \`design_text_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_faq\` ADD \`design_align\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_faq\` ADD \`design_background\` text;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_faq\` ADD \`design_frame\` text DEFAULT 'none';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_faq\` ADD \`design_padding_top\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_faq\` ADD \`design_padding_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_faq\` ADD \`design_margin_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_faq\` ADD \`design_width\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_lead_form\` ADD \`design_heading_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_lead_form\` ADD \`design_heading_font\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_lead_form\` ADD \`design_text_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_lead_form\` ADD \`design_align\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_lead_form\` ADD \`design_background\` text;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_lead_form\` ADD \`design_frame\` text DEFAULT 'none';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_lead_form\` ADD \`design_padding_top\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_lead_form\` ADD \`design_padding_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_lead_form\` ADD \`design_margin_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_lead_form\` ADD \`design_width\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_moments_wall\` ADD \`design_heading_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_moments_wall\` ADD \`design_heading_font\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_moments_wall\` ADD \`design_text_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_moments_wall\` ADD \`design_background\` text;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_moments_wall\` ADD \`design_frame\` text DEFAULT 'none';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_moments_wall\` ADD \`design_padding_top\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_moments_wall\` ADD \`design_padding_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_moments_wall\` ADD \`design_margin_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_moments_wall\` ADD \`design_width\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_journal_teaser\` ADD \`design_heading_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_journal_teaser\` ADD \`design_heading_font\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_journal_teaser\` ADD \`design_text_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_journal_teaser\` ADD \`design_align\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_journal_teaser\` ADD \`design_background\` text;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_journal_teaser\` ADD \`design_frame\` text DEFAULT 'none';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_journal_teaser\` ADD \`design_padding_top\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_journal_teaser\` ADD \`design_padding_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_journal_teaser\` ADD \`design_margin_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_journal_teaser\` ADD \`design_width\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_embed\` ADD \`design_heading_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_embed\` ADD \`design_heading_font\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_embed\` ADD \`design_text_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_embed\` ADD \`design_background\` text;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_embed\` ADD \`design_frame\` text DEFAULT 'none';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_embed\` ADD \`design_padding_top\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_embed\` ADD \`design_padding_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_embed\` ADD \`design_margin_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_embed\` ADD \`design_width\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_spacer\` ADD \`design_heading_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_spacer\` ADD \`design_heading_font\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_spacer\` ADD \`design_text_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_spacer\` ADD \`design_background\` text;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_spacer\` ADD \`design_frame\` text DEFAULT 'none';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_spacer\` ADD \`design_padding_top\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_spacer\` ADD \`design_padding_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_spacer\` ADD \`design_margin_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_spacer\` ADD \`design_width\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_reusable\` ADD \`design_heading_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_reusable\` ADD \`design_heading_font\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_reusable\` ADD \`design_text_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_reusable\` ADD \`design_background\` text;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_reusable\` ADD \`design_frame\` text DEFAULT 'none';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_reusable\` ADD \`design_padding_top\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_reusable\` ADD \`design_padding_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_reusable\` ADD \`design_margin_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_reusable\` ADD \`design_width\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_hero\` ADD \`design_heading_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_hero\` ADD \`design_heading_font\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_hero\` ADD \`design_text_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_hero\` ADD \`design_background\` text;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_hero\` ADD \`design_frame\` text DEFAULT 'none';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_hero\` ADD \`design_padding_top\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_hero\` ADD \`design_padding_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_hero\` ADD \`design_margin_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_hero\` ADD \`design_width\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_ticker\` ADD \`design_heading_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_ticker\` ADD \`design_heading_font\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_ticker\` ADD \`design_text_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_ticker\` ADD \`design_background\` text;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_ticker\` ADD \`design_frame\` text DEFAULT 'none';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_ticker\` ADD \`design_padding_top\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_ticker\` ADD \`design_padding_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_ticker\` ADD \`design_margin_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_ticker\` ADD \`design_width\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_offer_spotlight\` ADD \`design_heading_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_offer_spotlight\` ADD \`design_heading_font\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_offer_spotlight\` ADD \`design_text_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_offer_spotlight\` ADD \`design_align\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_offer_spotlight\` ADD \`design_background\` text;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_offer_spotlight\` ADD \`design_frame\` text DEFAULT 'none';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_offer_spotlight\` ADD \`design_padding_top\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_offer_spotlight\` ADD \`design_padding_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_offer_spotlight\` ADD \`design_margin_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_offer_spotlight\` ADD \`design_width\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_countdown\` ADD \`design_heading_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_countdown\` ADD \`design_heading_font\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_countdown\` ADD \`design_text_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_countdown\` ADD \`design_align\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_countdown\` ADD \`design_background\` text;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_countdown\` ADD \`design_frame\` text DEFAULT 'none';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_countdown\` ADD \`design_padding_top\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_countdown\` ADD \`design_padding_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_countdown\` ADD \`design_margin_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_countdown\` ADD \`design_width\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_cta_band\` ADD \`design_heading_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_cta_band\` ADD \`design_heading_font\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_cta_band\` ADD \`design_text_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_cta_band\` ADD \`design_align\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_cta_band\` ADD \`design_background\` text;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_cta_band\` ADD \`design_frame\` text DEFAULT 'none';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_cta_band\` ADD \`design_padding_top\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_cta_band\` ADD \`design_padding_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_cta_band\` ADD \`design_margin_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_cta_band\` ADD \`design_width\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_ticket_cards\` ADD \`design_heading_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_ticket_cards\` ADD \`design_heading_font\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_ticket_cards\` ADD \`design_text_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_ticket_cards\` ADD \`design_background\` text;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_ticket_cards\` ADD \`design_frame\` text DEFAULT 'none';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_ticket_cards\` ADD \`design_padding_top\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_ticket_cards\` ADD \`design_padding_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_ticket_cards\` ADD \`design_margin_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_ticket_cards\` ADD \`design_width\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_offer_grid\` ADD \`design_heading_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_offer_grid\` ADD \`design_heading_font\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_offer_grid\` ADD \`design_text_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_offer_grid\` ADD \`design_background\` text;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_offer_grid\` ADD \`design_frame\` text DEFAULT 'none';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_offer_grid\` ADD \`design_padding_top\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_offer_grid\` ADD \`design_padding_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_offer_grid\` ADD \`design_margin_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_offer_grid\` ADD \`design_width\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_worlds_grid\` ADD \`design_heading_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_worlds_grid\` ADD \`design_heading_font\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_worlds_grid\` ADD \`design_text_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_worlds_grid\` ADD \`design_background\` text;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_worlds_grid\` ADD \`design_frame\` text DEFAULT 'none';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_worlds_grid\` ADD \`design_padding_top\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_worlds_grid\` ADD \`design_padding_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_worlds_grid\` ADD \`design_margin_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_worlds_grid\` ADD \`design_width\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_rides_list\` ADD \`design_heading_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_rides_list\` ADD \`design_heading_font\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_rides_list\` ADD \`design_text_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_rides_list\` ADD \`design_background\` text;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_rides_list\` ADD \`design_frame\` text DEFAULT 'none';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_rides_list\` ADD \`design_padding_top\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_rides_list\` ADD \`design_padding_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_rides_list\` ADD \`design_margin_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_rides_list\` ADD \`design_width\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_events_rail\` ADD \`design_heading_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_events_rail\` ADD \`design_heading_font\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_events_rail\` ADD \`design_text_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_events_rail\` ADD \`design_background\` text;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_events_rail\` ADD \`design_frame\` text DEFAULT 'none';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_events_rail\` ADD \`design_padding_top\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_events_rail\` ADD \`design_padding_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_events_rail\` ADD \`design_margin_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_events_rail\` ADD \`design_width\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_today_status\` ADD \`design_heading_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_today_status\` ADD \`design_heading_font\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_today_status\` ADD \`design_text_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_today_status\` ADD \`design_background\` text;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_today_status\` ADD \`design_frame\` text DEFAULT 'none';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_today_status\` ADD \`design_padding_top\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_today_status\` ADD \`design_padding_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_today_status\` ADD \`design_margin_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_today_status\` ADD \`design_width\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_crew_planner\` ADD \`design_heading_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_crew_planner\` ADD \`design_heading_font\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_crew_planner\` ADD \`design_text_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_crew_planner\` ADD \`design_background\` text;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_crew_planner\` ADD \`design_frame\` text DEFAULT 'none';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_crew_planner\` ADD \`design_padding_top\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_crew_planner\` ADD \`design_padding_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_crew_planner\` ADD \`design_margin_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_crew_planner\` ADD \`design_width\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_venues_grid\` ADD \`design_heading_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_venues_grid\` ADD \`design_heading_font\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_venues_grid\` ADD \`design_text_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_venues_grid\` ADD \`design_background\` text;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_venues_grid\` ADD \`design_frame\` text DEFAULT 'none';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_venues_grid\` ADD \`design_padding_top\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_venues_grid\` ADD \`design_padding_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_venues_grid\` ADD \`design_margin_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_venues_grid\` ADD \`design_width\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_map\` ADD \`design_heading_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_map\` ADD \`design_heading_font\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_map\` ADD \`design_text_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_map\` ADD \`design_align\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_map\` ADD \`design_background\` text;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_map\` ADD \`design_frame\` text DEFAULT 'none';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_map\` ADD \`design_padding_top\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_map\` ADD \`design_padding_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_map\` ADD \`design_margin_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_map\` ADD \`design_width\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_stats\` ADD \`design_heading_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_stats\` ADD \`design_heading_font\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_stats\` ADD \`design_text_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_stats\` ADD \`design_align\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_stats\` ADD \`design_background\` text;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_stats\` ADD \`design_frame\` text DEFAULT 'none';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_stats\` ADD \`design_padding_top\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_stats\` ADD \`design_padding_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_stats\` ADD \`design_margin_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_stats\` ADD \`design_width\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_image_text\` ADD \`media\` text DEFAULT 'image';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_image_text\` ADD \`video_id\` integer REFERENCES media(id);`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_image_text\` ADD \`video_url\` text;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_image_text\` ADD \`autoplay\` integer;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_image_text\` ADD \`split\` text DEFAULT '50';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_image_text\` ADD \`image_style\` text DEFAULT 'framed';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_image_text\` ADD \`secondary_href\` text;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_image_text\` ADD \`design_heading_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_image_text\` ADD \`design_heading_font\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_image_text\` ADD \`design_text_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_image_text\` ADD \`design_align\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_image_text\` ADD \`design_background\` text;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_image_text\` ADD \`design_frame\` text DEFAULT 'none';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_image_text\` ADD \`design_padding_top\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_image_text\` ADD \`design_padding_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_image_text\` ADD \`design_margin_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_image_text\` ADD \`design_width\` text DEFAULT 'auto';`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_image_text_video_idx\` ON \`_pages_v_blocks_image_text\` (\`video_id\`);`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_image_text_locales\` ADD \`secondary_label\` text;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_columns\` ADD \`design_heading_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_columns\` ADD \`design_heading_font\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_columns\` ADD \`design_text_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_columns\` ADD \`design_align\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_columns\` ADD \`design_background\` text;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_columns\` ADD \`design_frame\` text DEFAULT 'none';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_columns\` ADD \`design_padding_top\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_columns\` ADD \`design_padding_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_columns\` ADD \`design_margin_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_columns\` ADD \`design_width\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_rich_text\` ADD \`design_heading_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_rich_text\` ADD \`design_heading_font\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_rich_text\` ADD \`design_text_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_rich_text\` ADD \`design_align\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_rich_text\` ADD \`design_background\` text;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_rich_text\` ADD \`design_frame\` text DEFAULT 'none';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_rich_text\` ADD \`design_padding_top\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_rich_text\` ADD \`design_padding_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_rich_text\` ADD \`design_margin_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_rich_text\` ADD \`design_width\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_video\` ADD \`design_heading_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_video\` ADD \`design_heading_font\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_video\` ADD \`design_text_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_video\` ADD \`design_align\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_video\` ADD \`design_background\` text;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_video\` ADD \`design_frame\` text DEFAULT 'none';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_video\` ADD \`design_padding_top\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_video\` ADD \`design_padding_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_video\` ADD \`design_margin_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_video\` ADD \`design_width\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_gallery\` ADD \`columns\` text DEFAULT '3';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_gallery\` ADD \`design_heading_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_gallery\` ADD \`design_heading_font\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_gallery\` ADD \`design_text_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_gallery\` ADD \`design_align\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_gallery\` ADD \`design_background\` text;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_gallery\` ADD \`design_frame\` text DEFAULT 'none';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_gallery\` ADD \`design_padding_top\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_gallery\` ADD \`design_padding_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_gallery\` ADD \`design_margin_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_gallery\` ADD \`design_width\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_testimonials\` ADD \`design_heading_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_testimonials\` ADD \`design_heading_font\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_testimonials\` ADD \`design_text_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_testimonials\` ADD \`design_align\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_testimonials\` ADD \`design_background\` text;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_testimonials\` ADD \`design_frame\` text DEFAULT 'none';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_testimonials\` ADD \`design_padding_top\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_testimonials\` ADD \`design_padding_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_testimonials\` ADD \`design_margin_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_testimonials\` ADD \`design_width\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_logo_strip\` ADD \`design_heading_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_logo_strip\` ADD \`design_heading_font\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_logo_strip\` ADD \`design_text_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_logo_strip\` ADD \`design_align\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_logo_strip\` ADD \`design_background\` text;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_logo_strip\` ADD \`design_frame\` text DEFAULT 'none';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_logo_strip\` ADD \`design_padding_top\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_logo_strip\` ADD \`design_padding_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_logo_strip\` ADD \`design_margin_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_logo_strip\` ADD \`design_width\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_faq\` ADD \`design_heading_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_faq\` ADD \`design_heading_font\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_faq\` ADD \`design_text_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_faq\` ADD \`design_align\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_faq\` ADD \`design_background\` text;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_faq\` ADD \`design_frame\` text DEFAULT 'none';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_faq\` ADD \`design_padding_top\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_faq\` ADD \`design_padding_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_faq\` ADD \`design_margin_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_faq\` ADD \`design_width\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_lead_form\` ADD \`design_heading_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_lead_form\` ADD \`design_heading_font\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_lead_form\` ADD \`design_text_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_lead_form\` ADD \`design_align\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_lead_form\` ADD \`design_background\` text;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_lead_form\` ADD \`design_frame\` text DEFAULT 'none';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_lead_form\` ADD \`design_padding_top\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_lead_form\` ADD \`design_padding_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_lead_form\` ADD \`design_margin_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_lead_form\` ADD \`design_width\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_moments_wall\` ADD \`design_heading_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_moments_wall\` ADD \`design_heading_font\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_moments_wall\` ADD \`design_text_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_moments_wall\` ADD \`design_background\` text;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_moments_wall\` ADD \`design_frame\` text DEFAULT 'none';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_moments_wall\` ADD \`design_padding_top\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_moments_wall\` ADD \`design_padding_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_moments_wall\` ADD \`design_margin_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_moments_wall\` ADD \`design_width\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_journal_teaser\` ADD \`design_heading_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_journal_teaser\` ADD \`design_heading_font\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_journal_teaser\` ADD \`design_text_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_journal_teaser\` ADD \`design_align\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_journal_teaser\` ADD \`design_background\` text;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_journal_teaser\` ADD \`design_frame\` text DEFAULT 'none';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_journal_teaser\` ADD \`design_padding_top\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_journal_teaser\` ADD \`design_padding_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_journal_teaser\` ADD \`design_margin_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_journal_teaser\` ADD \`design_width\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_embed\` ADD \`design_heading_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_embed\` ADD \`design_heading_font\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_embed\` ADD \`design_text_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_embed\` ADD \`design_background\` text;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_embed\` ADD \`design_frame\` text DEFAULT 'none';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_embed\` ADD \`design_padding_top\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_embed\` ADD \`design_padding_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_embed\` ADD \`design_margin_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_embed\` ADD \`design_width\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_spacer\` ADD \`design_heading_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_spacer\` ADD \`design_heading_font\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_spacer\` ADD \`design_text_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_spacer\` ADD \`design_background\` text;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_spacer\` ADD \`design_frame\` text DEFAULT 'none';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_spacer\` ADD \`design_padding_top\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_spacer\` ADD \`design_padding_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_spacer\` ADD \`design_margin_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_spacer\` ADD \`design_width\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_reusable\` ADD \`design_heading_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_reusable\` ADD \`design_heading_font\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_reusable\` ADD \`design_text_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_reusable\` ADD \`design_background\` text;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_reusable\` ADD \`design_frame\` text DEFAULT 'none';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_reusable\` ADD \`design_padding_top\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_reusable\` ADD \`design_padding_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_reusable\` ADD \`design_margin_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_reusable\` ADD \`design_width\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`offers_blocks_hero\` ADD \`design_heading_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`offers_blocks_hero\` ADD \`design_heading_font\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`offers_blocks_hero\` ADD \`design_text_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`offers_blocks_hero\` ADD \`design_background\` text;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_hero\` ADD \`design_frame\` text DEFAULT 'none';`)
  await db.run(sql`ALTER TABLE \`offers_blocks_hero\` ADD \`design_padding_top\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`offers_blocks_hero\` ADD \`design_padding_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`offers_blocks_hero\` ADD \`design_margin_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`offers_blocks_hero\` ADD \`design_width\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`offers_blocks_ticker\` ADD \`design_heading_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`offers_blocks_ticker\` ADD \`design_heading_font\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`offers_blocks_ticker\` ADD \`design_text_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`offers_blocks_ticker\` ADD \`design_background\` text;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_ticker\` ADD \`design_frame\` text DEFAULT 'none';`)
  await db.run(sql`ALTER TABLE \`offers_blocks_ticker\` ADD \`design_padding_top\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`offers_blocks_ticker\` ADD \`design_padding_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`offers_blocks_ticker\` ADD \`design_margin_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`offers_blocks_ticker\` ADD \`design_width\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`offers_blocks_offer_spotlight\` ADD \`design_heading_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`offers_blocks_offer_spotlight\` ADD \`design_heading_font\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`offers_blocks_offer_spotlight\` ADD \`design_text_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`offers_blocks_offer_spotlight\` ADD \`design_align\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`offers_blocks_offer_spotlight\` ADD \`design_background\` text;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_offer_spotlight\` ADD \`design_frame\` text DEFAULT 'none';`)
  await db.run(sql`ALTER TABLE \`offers_blocks_offer_spotlight\` ADD \`design_padding_top\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`offers_blocks_offer_spotlight\` ADD \`design_padding_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`offers_blocks_offer_spotlight\` ADD \`design_margin_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`offers_blocks_offer_spotlight\` ADD \`design_width\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`offers_blocks_countdown\` ADD \`design_heading_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`offers_blocks_countdown\` ADD \`design_heading_font\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`offers_blocks_countdown\` ADD \`design_text_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`offers_blocks_countdown\` ADD \`design_align\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`offers_blocks_countdown\` ADD \`design_background\` text;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_countdown\` ADD \`design_frame\` text DEFAULT 'none';`)
  await db.run(sql`ALTER TABLE \`offers_blocks_countdown\` ADD \`design_padding_top\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`offers_blocks_countdown\` ADD \`design_padding_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`offers_blocks_countdown\` ADD \`design_margin_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`offers_blocks_countdown\` ADD \`design_width\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`offers_blocks_cta_band\` ADD \`design_heading_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`offers_blocks_cta_band\` ADD \`design_heading_font\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`offers_blocks_cta_band\` ADD \`design_text_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`offers_blocks_cta_band\` ADD \`design_align\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`offers_blocks_cta_band\` ADD \`design_background\` text;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_cta_band\` ADD \`design_frame\` text DEFAULT 'none';`)
  await db.run(sql`ALTER TABLE \`offers_blocks_cta_band\` ADD \`design_padding_top\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`offers_blocks_cta_band\` ADD \`design_padding_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`offers_blocks_cta_band\` ADD \`design_margin_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`offers_blocks_cta_band\` ADD \`design_width\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`offers_blocks_ticket_cards\` ADD \`design_heading_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`offers_blocks_ticket_cards\` ADD \`design_heading_font\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`offers_blocks_ticket_cards\` ADD \`design_text_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`offers_blocks_ticket_cards\` ADD \`design_background\` text;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_ticket_cards\` ADD \`design_frame\` text DEFAULT 'none';`)
  await db.run(sql`ALTER TABLE \`offers_blocks_ticket_cards\` ADD \`design_padding_top\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`offers_blocks_ticket_cards\` ADD \`design_padding_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`offers_blocks_ticket_cards\` ADD \`design_margin_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`offers_blocks_ticket_cards\` ADD \`design_width\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`offers_blocks_offer_grid\` ADD \`design_heading_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`offers_blocks_offer_grid\` ADD \`design_heading_font\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`offers_blocks_offer_grid\` ADD \`design_text_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`offers_blocks_offer_grid\` ADD \`design_background\` text;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_offer_grid\` ADD \`design_frame\` text DEFAULT 'none';`)
  await db.run(sql`ALTER TABLE \`offers_blocks_offer_grid\` ADD \`design_padding_top\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`offers_blocks_offer_grid\` ADD \`design_padding_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`offers_blocks_offer_grid\` ADD \`design_margin_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`offers_blocks_offer_grid\` ADD \`design_width\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`offers_blocks_worlds_grid\` ADD \`design_heading_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`offers_blocks_worlds_grid\` ADD \`design_heading_font\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`offers_blocks_worlds_grid\` ADD \`design_text_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`offers_blocks_worlds_grid\` ADD \`design_background\` text;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_worlds_grid\` ADD \`design_frame\` text DEFAULT 'none';`)
  await db.run(sql`ALTER TABLE \`offers_blocks_worlds_grid\` ADD \`design_padding_top\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`offers_blocks_worlds_grid\` ADD \`design_padding_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`offers_blocks_worlds_grid\` ADD \`design_margin_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`offers_blocks_worlds_grid\` ADD \`design_width\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`offers_blocks_rides_list\` ADD \`design_heading_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`offers_blocks_rides_list\` ADD \`design_heading_font\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`offers_blocks_rides_list\` ADD \`design_text_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`offers_blocks_rides_list\` ADD \`design_background\` text;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_rides_list\` ADD \`design_frame\` text DEFAULT 'none';`)
  await db.run(sql`ALTER TABLE \`offers_blocks_rides_list\` ADD \`design_padding_top\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`offers_blocks_rides_list\` ADD \`design_padding_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`offers_blocks_rides_list\` ADD \`design_margin_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`offers_blocks_rides_list\` ADD \`design_width\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`offers_blocks_events_rail\` ADD \`design_heading_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`offers_blocks_events_rail\` ADD \`design_heading_font\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`offers_blocks_events_rail\` ADD \`design_text_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`offers_blocks_events_rail\` ADD \`design_background\` text;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_events_rail\` ADD \`design_frame\` text DEFAULT 'none';`)
  await db.run(sql`ALTER TABLE \`offers_blocks_events_rail\` ADD \`design_padding_top\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`offers_blocks_events_rail\` ADD \`design_padding_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`offers_blocks_events_rail\` ADD \`design_margin_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`offers_blocks_events_rail\` ADD \`design_width\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`offers_blocks_today_status\` ADD \`design_heading_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`offers_blocks_today_status\` ADD \`design_heading_font\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`offers_blocks_today_status\` ADD \`design_text_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`offers_blocks_today_status\` ADD \`design_background\` text;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_today_status\` ADD \`design_frame\` text DEFAULT 'none';`)
  await db.run(sql`ALTER TABLE \`offers_blocks_today_status\` ADD \`design_padding_top\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`offers_blocks_today_status\` ADD \`design_padding_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`offers_blocks_today_status\` ADD \`design_margin_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`offers_blocks_today_status\` ADD \`design_width\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`offers_blocks_crew_planner\` ADD \`design_heading_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`offers_blocks_crew_planner\` ADD \`design_heading_font\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`offers_blocks_crew_planner\` ADD \`design_text_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`offers_blocks_crew_planner\` ADD \`design_background\` text;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_crew_planner\` ADD \`design_frame\` text DEFAULT 'none';`)
  await db.run(sql`ALTER TABLE \`offers_blocks_crew_planner\` ADD \`design_padding_top\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`offers_blocks_crew_planner\` ADD \`design_padding_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`offers_blocks_crew_planner\` ADD \`design_margin_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`offers_blocks_crew_planner\` ADD \`design_width\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`offers_blocks_venues_grid\` ADD \`design_heading_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`offers_blocks_venues_grid\` ADD \`design_heading_font\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`offers_blocks_venues_grid\` ADD \`design_text_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`offers_blocks_venues_grid\` ADD \`design_background\` text;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_venues_grid\` ADD \`design_frame\` text DEFAULT 'none';`)
  await db.run(sql`ALTER TABLE \`offers_blocks_venues_grid\` ADD \`design_padding_top\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`offers_blocks_venues_grid\` ADD \`design_padding_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`offers_blocks_venues_grid\` ADD \`design_margin_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`offers_blocks_venues_grid\` ADD \`design_width\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`offers_blocks_map\` ADD \`design_heading_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`offers_blocks_map\` ADD \`design_heading_font\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`offers_blocks_map\` ADD \`design_text_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`offers_blocks_map\` ADD \`design_align\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`offers_blocks_map\` ADD \`design_background\` text;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_map\` ADD \`design_frame\` text DEFAULT 'none';`)
  await db.run(sql`ALTER TABLE \`offers_blocks_map\` ADD \`design_padding_top\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`offers_blocks_map\` ADD \`design_padding_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`offers_blocks_map\` ADD \`design_margin_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`offers_blocks_map\` ADD \`design_width\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`offers_blocks_stats\` ADD \`design_heading_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`offers_blocks_stats\` ADD \`design_heading_font\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`offers_blocks_stats\` ADD \`design_text_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`offers_blocks_stats\` ADD \`design_align\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`offers_blocks_stats\` ADD \`design_background\` text;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_stats\` ADD \`design_frame\` text DEFAULT 'none';`)
  await db.run(sql`ALTER TABLE \`offers_blocks_stats\` ADD \`design_padding_top\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`offers_blocks_stats\` ADD \`design_padding_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`offers_blocks_stats\` ADD \`design_margin_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`offers_blocks_stats\` ADD \`design_width\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`offers_blocks_image_text\` ADD \`media\` text DEFAULT 'image';`)
  await db.run(sql`ALTER TABLE \`offers_blocks_image_text\` ADD \`video_id\` integer REFERENCES media(id);`)
  await db.run(sql`ALTER TABLE \`offers_blocks_image_text\` ADD \`video_url\` text;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_image_text\` ADD \`autoplay\` integer;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_image_text\` ADD \`split\` text DEFAULT '50';`)
  await db.run(sql`ALTER TABLE \`offers_blocks_image_text\` ADD \`image_style\` text DEFAULT 'framed';`)
  await db.run(sql`ALTER TABLE \`offers_blocks_image_text\` ADD \`secondary_href\` text;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_image_text\` ADD \`design_heading_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`offers_blocks_image_text\` ADD \`design_heading_font\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`offers_blocks_image_text\` ADD \`design_text_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`offers_blocks_image_text\` ADD \`design_align\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`offers_blocks_image_text\` ADD \`design_background\` text;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_image_text\` ADD \`design_frame\` text DEFAULT 'none';`)
  await db.run(sql`ALTER TABLE \`offers_blocks_image_text\` ADD \`design_padding_top\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`offers_blocks_image_text\` ADD \`design_padding_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`offers_blocks_image_text\` ADD \`design_margin_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`offers_blocks_image_text\` ADD \`design_width\` text DEFAULT 'auto';`)
  await db.run(sql`CREATE INDEX \`offers_blocks_image_text_video_idx\` ON \`offers_blocks_image_text\` (\`video_id\`);`)
  await db.run(sql`ALTER TABLE \`offers_blocks_image_text_locales\` ADD \`secondary_label\` text;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_columns\` ADD \`design_heading_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`offers_blocks_columns\` ADD \`design_heading_font\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`offers_blocks_columns\` ADD \`design_text_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`offers_blocks_columns\` ADD \`design_align\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`offers_blocks_columns\` ADD \`design_background\` text;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_columns\` ADD \`design_frame\` text DEFAULT 'none';`)
  await db.run(sql`ALTER TABLE \`offers_blocks_columns\` ADD \`design_padding_top\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`offers_blocks_columns\` ADD \`design_padding_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`offers_blocks_columns\` ADD \`design_margin_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`offers_blocks_columns\` ADD \`design_width\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`offers_blocks_rich_text\` ADD \`design_heading_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`offers_blocks_rich_text\` ADD \`design_heading_font\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`offers_blocks_rich_text\` ADD \`design_text_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`offers_blocks_rich_text\` ADD \`design_align\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`offers_blocks_rich_text\` ADD \`design_background\` text;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_rich_text\` ADD \`design_frame\` text DEFAULT 'none';`)
  await db.run(sql`ALTER TABLE \`offers_blocks_rich_text\` ADD \`design_padding_top\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`offers_blocks_rich_text\` ADD \`design_padding_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`offers_blocks_rich_text\` ADD \`design_margin_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`offers_blocks_rich_text\` ADD \`design_width\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`offers_blocks_video\` ADD \`design_heading_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`offers_blocks_video\` ADD \`design_heading_font\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`offers_blocks_video\` ADD \`design_text_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`offers_blocks_video\` ADD \`design_align\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`offers_blocks_video\` ADD \`design_background\` text;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_video\` ADD \`design_frame\` text DEFAULT 'none';`)
  await db.run(sql`ALTER TABLE \`offers_blocks_video\` ADD \`design_padding_top\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`offers_blocks_video\` ADD \`design_padding_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`offers_blocks_video\` ADD \`design_margin_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`offers_blocks_video\` ADD \`design_width\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`offers_blocks_gallery\` ADD \`columns\` text DEFAULT '3';`)
  await db.run(sql`ALTER TABLE \`offers_blocks_gallery\` ADD \`design_heading_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`offers_blocks_gallery\` ADD \`design_heading_font\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`offers_blocks_gallery\` ADD \`design_text_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`offers_blocks_gallery\` ADD \`design_align\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`offers_blocks_gallery\` ADD \`design_background\` text;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_gallery\` ADD \`design_frame\` text DEFAULT 'none';`)
  await db.run(sql`ALTER TABLE \`offers_blocks_gallery\` ADD \`design_padding_top\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`offers_blocks_gallery\` ADD \`design_padding_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`offers_blocks_gallery\` ADD \`design_margin_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`offers_blocks_gallery\` ADD \`design_width\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`offers_blocks_testimonials\` ADD \`design_heading_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`offers_blocks_testimonials\` ADD \`design_heading_font\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`offers_blocks_testimonials\` ADD \`design_text_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`offers_blocks_testimonials\` ADD \`design_align\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`offers_blocks_testimonials\` ADD \`design_background\` text;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_testimonials\` ADD \`design_frame\` text DEFAULT 'none';`)
  await db.run(sql`ALTER TABLE \`offers_blocks_testimonials\` ADD \`design_padding_top\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`offers_blocks_testimonials\` ADD \`design_padding_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`offers_blocks_testimonials\` ADD \`design_margin_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`offers_blocks_testimonials\` ADD \`design_width\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`offers_blocks_logo_strip\` ADD \`design_heading_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`offers_blocks_logo_strip\` ADD \`design_heading_font\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`offers_blocks_logo_strip\` ADD \`design_text_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`offers_blocks_logo_strip\` ADD \`design_align\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`offers_blocks_logo_strip\` ADD \`design_background\` text;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_logo_strip\` ADD \`design_frame\` text DEFAULT 'none';`)
  await db.run(sql`ALTER TABLE \`offers_blocks_logo_strip\` ADD \`design_padding_top\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`offers_blocks_logo_strip\` ADD \`design_padding_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`offers_blocks_logo_strip\` ADD \`design_margin_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`offers_blocks_logo_strip\` ADD \`design_width\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`offers_blocks_faq\` ADD \`design_heading_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`offers_blocks_faq\` ADD \`design_heading_font\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`offers_blocks_faq\` ADD \`design_text_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`offers_blocks_faq\` ADD \`design_align\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`offers_blocks_faq\` ADD \`design_background\` text;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_faq\` ADD \`design_frame\` text DEFAULT 'none';`)
  await db.run(sql`ALTER TABLE \`offers_blocks_faq\` ADD \`design_padding_top\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`offers_blocks_faq\` ADD \`design_padding_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`offers_blocks_faq\` ADD \`design_margin_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`offers_blocks_faq\` ADD \`design_width\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`offers_blocks_lead_form\` ADD \`design_heading_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`offers_blocks_lead_form\` ADD \`design_heading_font\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`offers_blocks_lead_form\` ADD \`design_text_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`offers_blocks_lead_form\` ADD \`design_align\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`offers_blocks_lead_form\` ADD \`design_background\` text;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_lead_form\` ADD \`design_frame\` text DEFAULT 'none';`)
  await db.run(sql`ALTER TABLE \`offers_blocks_lead_form\` ADD \`design_padding_top\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`offers_blocks_lead_form\` ADD \`design_padding_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`offers_blocks_lead_form\` ADD \`design_margin_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`offers_blocks_lead_form\` ADD \`design_width\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`offers_blocks_moments_wall\` ADD \`design_heading_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`offers_blocks_moments_wall\` ADD \`design_heading_font\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`offers_blocks_moments_wall\` ADD \`design_text_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`offers_blocks_moments_wall\` ADD \`design_background\` text;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_moments_wall\` ADD \`design_frame\` text DEFAULT 'none';`)
  await db.run(sql`ALTER TABLE \`offers_blocks_moments_wall\` ADD \`design_padding_top\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`offers_blocks_moments_wall\` ADD \`design_padding_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`offers_blocks_moments_wall\` ADD \`design_margin_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`offers_blocks_moments_wall\` ADD \`design_width\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`offers_blocks_journal_teaser\` ADD \`design_heading_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`offers_blocks_journal_teaser\` ADD \`design_heading_font\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`offers_blocks_journal_teaser\` ADD \`design_text_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`offers_blocks_journal_teaser\` ADD \`design_align\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`offers_blocks_journal_teaser\` ADD \`design_background\` text;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_journal_teaser\` ADD \`design_frame\` text DEFAULT 'none';`)
  await db.run(sql`ALTER TABLE \`offers_blocks_journal_teaser\` ADD \`design_padding_top\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`offers_blocks_journal_teaser\` ADD \`design_padding_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`offers_blocks_journal_teaser\` ADD \`design_margin_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`offers_blocks_journal_teaser\` ADD \`design_width\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`offers_blocks_embed\` ADD \`design_heading_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`offers_blocks_embed\` ADD \`design_heading_font\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`offers_blocks_embed\` ADD \`design_text_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`offers_blocks_embed\` ADD \`design_background\` text;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_embed\` ADD \`design_frame\` text DEFAULT 'none';`)
  await db.run(sql`ALTER TABLE \`offers_blocks_embed\` ADD \`design_padding_top\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`offers_blocks_embed\` ADD \`design_padding_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`offers_blocks_embed\` ADD \`design_margin_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`offers_blocks_embed\` ADD \`design_width\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`offers_blocks_spacer\` ADD \`design_heading_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`offers_blocks_spacer\` ADD \`design_heading_font\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`offers_blocks_spacer\` ADD \`design_text_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`offers_blocks_spacer\` ADD \`design_background\` text;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_spacer\` ADD \`design_frame\` text DEFAULT 'none';`)
  await db.run(sql`ALTER TABLE \`offers_blocks_spacer\` ADD \`design_padding_top\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`offers_blocks_spacer\` ADD \`design_padding_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`offers_blocks_spacer\` ADD \`design_margin_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`offers_blocks_spacer\` ADD \`design_width\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`offers_blocks_reusable\` ADD \`design_heading_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`offers_blocks_reusable\` ADD \`design_heading_font\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`offers_blocks_reusable\` ADD \`design_text_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`offers_blocks_reusable\` ADD \`design_background\` text;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_reusable\` ADD \`design_frame\` text DEFAULT 'none';`)
  await db.run(sql`ALTER TABLE \`offers_blocks_reusable\` ADD \`design_padding_top\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`offers_blocks_reusable\` ADD \`design_padding_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`offers_blocks_reusable\` ADD \`design_margin_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`offers_blocks_reusable\` ADD \`design_width\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_hero\` ADD \`design_heading_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_hero\` ADD \`design_heading_font\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_hero\` ADD \`design_text_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_hero\` ADD \`design_background\` text;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_hero\` ADD \`design_frame\` text DEFAULT 'none';`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_hero\` ADD \`design_padding_top\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_hero\` ADD \`design_padding_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_hero\` ADD \`design_margin_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_hero\` ADD \`design_width\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_ticker\` ADD \`design_heading_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_ticker\` ADD \`design_heading_font\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_ticker\` ADD \`design_text_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_ticker\` ADD \`design_background\` text;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_ticker\` ADD \`design_frame\` text DEFAULT 'none';`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_ticker\` ADD \`design_padding_top\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_ticker\` ADD \`design_padding_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_ticker\` ADD \`design_margin_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_ticker\` ADD \`design_width\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_offer_spotlight\` ADD \`design_heading_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_offer_spotlight\` ADD \`design_heading_font\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_offer_spotlight\` ADD \`design_text_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_offer_spotlight\` ADD \`design_align\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_offer_spotlight\` ADD \`design_background\` text;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_offer_spotlight\` ADD \`design_frame\` text DEFAULT 'none';`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_offer_spotlight\` ADD \`design_padding_top\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_offer_spotlight\` ADD \`design_padding_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_offer_spotlight\` ADD \`design_margin_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_offer_spotlight\` ADD \`design_width\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_countdown\` ADD \`design_heading_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_countdown\` ADD \`design_heading_font\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_countdown\` ADD \`design_text_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_countdown\` ADD \`design_align\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_countdown\` ADD \`design_background\` text;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_countdown\` ADD \`design_frame\` text DEFAULT 'none';`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_countdown\` ADD \`design_padding_top\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_countdown\` ADD \`design_padding_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_countdown\` ADD \`design_margin_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_countdown\` ADD \`design_width\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_cta_band\` ADD \`design_heading_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_cta_band\` ADD \`design_heading_font\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_cta_band\` ADD \`design_text_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_cta_band\` ADD \`design_align\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_cta_band\` ADD \`design_background\` text;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_cta_band\` ADD \`design_frame\` text DEFAULT 'none';`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_cta_band\` ADD \`design_padding_top\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_cta_band\` ADD \`design_padding_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_cta_band\` ADD \`design_margin_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_cta_band\` ADD \`design_width\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_ticket_cards\` ADD \`design_heading_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_ticket_cards\` ADD \`design_heading_font\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_ticket_cards\` ADD \`design_text_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_ticket_cards\` ADD \`design_background\` text;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_ticket_cards\` ADD \`design_frame\` text DEFAULT 'none';`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_ticket_cards\` ADD \`design_padding_top\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_ticket_cards\` ADD \`design_padding_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_ticket_cards\` ADD \`design_margin_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_ticket_cards\` ADD \`design_width\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_offer_grid\` ADD \`design_heading_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_offer_grid\` ADD \`design_heading_font\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_offer_grid\` ADD \`design_text_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_offer_grid\` ADD \`design_background\` text;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_offer_grid\` ADD \`design_frame\` text DEFAULT 'none';`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_offer_grid\` ADD \`design_padding_top\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_offer_grid\` ADD \`design_padding_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_offer_grid\` ADD \`design_margin_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_offer_grid\` ADD \`design_width\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_worlds_grid\` ADD \`design_heading_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_worlds_grid\` ADD \`design_heading_font\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_worlds_grid\` ADD \`design_text_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_worlds_grid\` ADD \`design_background\` text;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_worlds_grid\` ADD \`design_frame\` text DEFAULT 'none';`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_worlds_grid\` ADD \`design_padding_top\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_worlds_grid\` ADD \`design_padding_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_worlds_grid\` ADD \`design_margin_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_worlds_grid\` ADD \`design_width\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_rides_list\` ADD \`design_heading_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_rides_list\` ADD \`design_heading_font\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_rides_list\` ADD \`design_text_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_rides_list\` ADD \`design_background\` text;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_rides_list\` ADD \`design_frame\` text DEFAULT 'none';`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_rides_list\` ADD \`design_padding_top\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_rides_list\` ADD \`design_padding_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_rides_list\` ADD \`design_margin_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_rides_list\` ADD \`design_width\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_events_rail\` ADD \`design_heading_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_events_rail\` ADD \`design_heading_font\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_events_rail\` ADD \`design_text_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_events_rail\` ADD \`design_background\` text;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_events_rail\` ADD \`design_frame\` text DEFAULT 'none';`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_events_rail\` ADD \`design_padding_top\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_events_rail\` ADD \`design_padding_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_events_rail\` ADD \`design_margin_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_events_rail\` ADD \`design_width\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_today_status\` ADD \`design_heading_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_today_status\` ADD \`design_heading_font\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_today_status\` ADD \`design_text_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_today_status\` ADD \`design_background\` text;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_today_status\` ADD \`design_frame\` text DEFAULT 'none';`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_today_status\` ADD \`design_padding_top\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_today_status\` ADD \`design_padding_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_today_status\` ADD \`design_margin_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_today_status\` ADD \`design_width\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_crew_planner\` ADD \`design_heading_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_crew_planner\` ADD \`design_heading_font\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_crew_planner\` ADD \`design_text_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_crew_planner\` ADD \`design_background\` text;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_crew_planner\` ADD \`design_frame\` text DEFAULT 'none';`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_crew_planner\` ADD \`design_padding_top\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_crew_planner\` ADD \`design_padding_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_crew_planner\` ADD \`design_margin_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_crew_planner\` ADD \`design_width\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_venues_grid\` ADD \`design_heading_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_venues_grid\` ADD \`design_heading_font\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_venues_grid\` ADD \`design_text_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_venues_grid\` ADD \`design_background\` text;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_venues_grid\` ADD \`design_frame\` text DEFAULT 'none';`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_venues_grid\` ADD \`design_padding_top\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_venues_grid\` ADD \`design_padding_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_venues_grid\` ADD \`design_margin_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_venues_grid\` ADD \`design_width\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_map\` ADD \`design_heading_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_map\` ADD \`design_heading_font\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_map\` ADD \`design_text_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_map\` ADD \`design_align\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_map\` ADD \`design_background\` text;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_map\` ADD \`design_frame\` text DEFAULT 'none';`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_map\` ADD \`design_padding_top\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_map\` ADD \`design_padding_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_map\` ADD \`design_margin_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_map\` ADD \`design_width\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_stats\` ADD \`design_heading_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_stats\` ADD \`design_heading_font\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_stats\` ADD \`design_text_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_stats\` ADD \`design_align\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_stats\` ADD \`design_background\` text;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_stats\` ADD \`design_frame\` text DEFAULT 'none';`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_stats\` ADD \`design_padding_top\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_stats\` ADD \`design_padding_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_stats\` ADD \`design_margin_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_stats\` ADD \`design_width\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_image_text\` ADD \`media\` text DEFAULT 'image';`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_image_text\` ADD \`video_id\` integer REFERENCES media(id);`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_image_text\` ADD \`video_url\` text;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_image_text\` ADD \`autoplay\` integer;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_image_text\` ADD \`split\` text DEFAULT '50';`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_image_text\` ADD \`image_style\` text DEFAULT 'framed';`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_image_text\` ADD \`secondary_href\` text;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_image_text\` ADD \`design_heading_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_image_text\` ADD \`design_heading_font\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_image_text\` ADD \`design_text_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_image_text\` ADD \`design_align\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_image_text\` ADD \`design_background\` text;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_image_text\` ADD \`design_frame\` text DEFAULT 'none';`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_image_text\` ADD \`design_padding_top\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_image_text\` ADD \`design_padding_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_image_text\` ADD \`design_margin_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_image_text\` ADD \`design_width\` text DEFAULT 'auto';`)
  await db.run(sql`CREATE INDEX \`_offers_v_blocks_image_text_video_idx\` ON \`_offers_v_blocks_image_text\` (\`video_id\`);`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_image_text_locales\` ADD \`secondary_label\` text;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_columns\` ADD \`design_heading_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_columns\` ADD \`design_heading_font\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_columns\` ADD \`design_text_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_columns\` ADD \`design_align\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_columns\` ADD \`design_background\` text;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_columns\` ADD \`design_frame\` text DEFAULT 'none';`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_columns\` ADD \`design_padding_top\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_columns\` ADD \`design_padding_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_columns\` ADD \`design_margin_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_columns\` ADD \`design_width\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_rich_text\` ADD \`design_heading_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_rich_text\` ADD \`design_heading_font\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_rich_text\` ADD \`design_text_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_rich_text\` ADD \`design_align\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_rich_text\` ADD \`design_background\` text;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_rich_text\` ADD \`design_frame\` text DEFAULT 'none';`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_rich_text\` ADD \`design_padding_top\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_rich_text\` ADD \`design_padding_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_rich_text\` ADD \`design_margin_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_rich_text\` ADD \`design_width\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_video\` ADD \`design_heading_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_video\` ADD \`design_heading_font\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_video\` ADD \`design_text_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_video\` ADD \`design_align\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_video\` ADD \`design_background\` text;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_video\` ADD \`design_frame\` text DEFAULT 'none';`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_video\` ADD \`design_padding_top\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_video\` ADD \`design_padding_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_video\` ADD \`design_margin_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_video\` ADD \`design_width\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_gallery\` ADD \`columns\` text DEFAULT '3';`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_gallery\` ADD \`design_heading_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_gallery\` ADD \`design_heading_font\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_gallery\` ADD \`design_text_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_gallery\` ADD \`design_align\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_gallery\` ADD \`design_background\` text;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_gallery\` ADD \`design_frame\` text DEFAULT 'none';`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_gallery\` ADD \`design_padding_top\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_gallery\` ADD \`design_padding_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_gallery\` ADD \`design_margin_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_gallery\` ADD \`design_width\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_testimonials\` ADD \`design_heading_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_testimonials\` ADD \`design_heading_font\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_testimonials\` ADD \`design_text_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_testimonials\` ADD \`design_align\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_testimonials\` ADD \`design_background\` text;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_testimonials\` ADD \`design_frame\` text DEFAULT 'none';`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_testimonials\` ADD \`design_padding_top\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_testimonials\` ADD \`design_padding_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_testimonials\` ADD \`design_margin_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_testimonials\` ADD \`design_width\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_logo_strip\` ADD \`design_heading_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_logo_strip\` ADD \`design_heading_font\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_logo_strip\` ADD \`design_text_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_logo_strip\` ADD \`design_align\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_logo_strip\` ADD \`design_background\` text;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_logo_strip\` ADD \`design_frame\` text DEFAULT 'none';`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_logo_strip\` ADD \`design_padding_top\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_logo_strip\` ADD \`design_padding_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_logo_strip\` ADD \`design_margin_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_logo_strip\` ADD \`design_width\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_faq\` ADD \`design_heading_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_faq\` ADD \`design_heading_font\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_faq\` ADD \`design_text_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_faq\` ADD \`design_align\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_faq\` ADD \`design_background\` text;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_faq\` ADD \`design_frame\` text DEFAULT 'none';`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_faq\` ADD \`design_padding_top\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_faq\` ADD \`design_padding_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_faq\` ADD \`design_margin_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_faq\` ADD \`design_width\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_lead_form\` ADD \`design_heading_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_lead_form\` ADD \`design_heading_font\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_lead_form\` ADD \`design_text_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_lead_form\` ADD \`design_align\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_lead_form\` ADD \`design_background\` text;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_lead_form\` ADD \`design_frame\` text DEFAULT 'none';`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_lead_form\` ADD \`design_padding_top\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_lead_form\` ADD \`design_padding_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_lead_form\` ADD \`design_margin_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_lead_form\` ADD \`design_width\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_moments_wall\` ADD \`design_heading_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_moments_wall\` ADD \`design_heading_font\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_moments_wall\` ADD \`design_text_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_moments_wall\` ADD \`design_background\` text;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_moments_wall\` ADD \`design_frame\` text DEFAULT 'none';`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_moments_wall\` ADD \`design_padding_top\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_moments_wall\` ADD \`design_padding_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_moments_wall\` ADD \`design_margin_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_moments_wall\` ADD \`design_width\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_journal_teaser\` ADD \`design_heading_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_journal_teaser\` ADD \`design_heading_font\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_journal_teaser\` ADD \`design_text_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_journal_teaser\` ADD \`design_align\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_journal_teaser\` ADD \`design_background\` text;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_journal_teaser\` ADD \`design_frame\` text DEFAULT 'none';`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_journal_teaser\` ADD \`design_padding_top\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_journal_teaser\` ADD \`design_padding_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_journal_teaser\` ADD \`design_margin_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_journal_teaser\` ADD \`design_width\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_embed\` ADD \`design_heading_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_embed\` ADD \`design_heading_font\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_embed\` ADD \`design_text_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_embed\` ADD \`design_background\` text;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_embed\` ADD \`design_frame\` text DEFAULT 'none';`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_embed\` ADD \`design_padding_top\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_embed\` ADD \`design_padding_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_embed\` ADD \`design_margin_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_embed\` ADD \`design_width\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_spacer\` ADD \`design_heading_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_spacer\` ADD \`design_heading_font\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_spacer\` ADD \`design_text_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_spacer\` ADD \`design_background\` text;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_spacer\` ADD \`design_frame\` text DEFAULT 'none';`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_spacer\` ADD \`design_padding_top\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_spacer\` ADD \`design_padding_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_spacer\` ADD \`design_margin_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_spacer\` ADD \`design_width\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_reusable\` ADD \`design_heading_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_reusable\` ADD \`design_heading_font\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_reusable\` ADD \`design_text_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_reusable\` ADD \`design_background\` text;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_reusable\` ADD \`design_frame\` text DEFAULT 'none';`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_reusable\` ADD \`design_padding_top\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_reusable\` ADD \`design_padding_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_reusable\` ADD \`design_margin_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_reusable\` ADD \`design_width\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`events_blocks_hero\` ADD \`design_heading_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`events_blocks_hero\` ADD \`design_heading_font\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`events_blocks_hero\` ADD \`design_text_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`events_blocks_hero\` ADD \`design_background\` text;`)
  await db.run(sql`ALTER TABLE \`events_blocks_hero\` ADD \`design_frame\` text DEFAULT 'none';`)
  await db.run(sql`ALTER TABLE \`events_blocks_hero\` ADD \`design_padding_top\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`events_blocks_hero\` ADD \`design_padding_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`events_blocks_hero\` ADD \`design_margin_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`events_blocks_hero\` ADD \`design_width\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`events_blocks_ticker\` ADD \`design_heading_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`events_blocks_ticker\` ADD \`design_heading_font\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`events_blocks_ticker\` ADD \`design_text_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`events_blocks_ticker\` ADD \`design_background\` text;`)
  await db.run(sql`ALTER TABLE \`events_blocks_ticker\` ADD \`design_frame\` text DEFAULT 'none';`)
  await db.run(sql`ALTER TABLE \`events_blocks_ticker\` ADD \`design_padding_top\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`events_blocks_ticker\` ADD \`design_padding_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`events_blocks_ticker\` ADD \`design_margin_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`events_blocks_ticker\` ADD \`design_width\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`events_blocks_offer_spotlight\` ADD \`design_heading_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`events_blocks_offer_spotlight\` ADD \`design_heading_font\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`events_blocks_offer_spotlight\` ADD \`design_text_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`events_blocks_offer_spotlight\` ADD \`design_align\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`events_blocks_offer_spotlight\` ADD \`design_background\` text;`)
  await db.run(sql`ALTER TABLE \`events_blocks_offer_spotlight\` ADD \`design_frame\` text DEFAULT 'none';`)
  await db.run(sql`ALTER TABLE \`events_blocks_offer_spotlight\` ADD \`design_padding_top\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`events_blocks_offer_spotlight\` ADD \`design_padding_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`events_blocks_offer_spotlight\` ADD \`design_margin_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`events_blocks_offer_spotlight\` ADD \`design_width\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`events_blocks_countdown\` ADD \`design_heading_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`events_blocks_countdown\` ADD \`design_heading_font\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`events_blocks_countdown\` ADD \`design_text_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`events_blocks_countdown\` ADD \`design_align\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`events_blocks_countdown\` ADD \`design_background\` text;`)
  await db.run(sql`ALTER TABLE \`events_blocks_countdown\` ADD \`design_frame\` text DEFAULT 'none';`)
  await db.run(sql`ALTER TABLE \`events_blocks_countdown\` ADD \`design_padding_top\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`events_blocks_countdown\` ADD \`design_padding_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`events_blocks_countdown\` ADD \`design_margin_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`events_blocks_countdown\` ADD \`design_width\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`events_blocks_cta_band\` ADD \`design_heading_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`events_blocks_cta_band\` ADD \`design_heading_font\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`events_blocks_cta_band\` ADD \`design_text_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`events_blocks_cta_band\` ADD \`design_align\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`events_blocks_cta_band\` ADD \`design_background\` text;`)
  await db.run(sql`ALTER TABLE \`events_blocks_cta_band\` ADD \`design_frame\` text DEFAULT 'none';`)
  await db.run(sql`ALTER TABLE \`events_blocks_cta_band\` ADD \`design_padding_top\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`events_blocks_cta_band\` ADD \`design_padding_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`events_blocks_cta_band\` ADD \`design_margin_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`events_blocks_cta_band\` ADD \`design_width\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`events_blocks_ticket_cards\` ADD \`design_heading_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`events_blocks_ticket_cards\` ADD \`design_heading_font\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`events_blocks_ticket_cards\` ADD \`design_text_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`events_blocks_ticket_cards\` ADD \`design_background\` text;`)
  await db.run(sql`ALTER TABLE \`events_blocks_ticket_cards\` ADD \`design_frame\` text DEFAULT 'none';`)
  await db.run(sql`ALTER TABLE \`events_blocks_ticket_cards\` ADD \`design_padding_top\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`events_blocks_ticket_cards\` ADD \`design_padding_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`events_blocks_ticket_cards\` ADD \`design_margin_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`events_blocks_ticket_cards\` ADD \`design_width\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`events_blocks_offer_grid\` ADD \`design_heading_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`events_blocks_offer_grid\` ADD \`design_heading_font\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`events_blocks_offer_grid\` ADD \`design_text_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`events_blocks_offer_grid\` ADD \`design_background\` text;`)
  await db.run(sql`ALTER TABLE \`events_blocks_offer_grid\` ADD \`design_frame\` text DEFAULT 'none';`)
  await db.run(sql`ALTER TABLE \`events_blocks_offer_grid\` ADD \`design_padding_top\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`events_blocks_offer_grid\` ADD \`design_padding_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`events_blocks_offer_grid\` ADD \`design_margin_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`events_blocks_offer_grid\` ADD \`design_width\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`events_blocks_worlds_grid\` ADD \`design_heading_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`events_blocks_worlds_grid\` ADD \`design_heading_font\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`events_blocks_worlds_grid\` ADD \`design_text_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`events_blocks_worlds_grid\` ADD \`design_background\` text;`)
  await db.run(sql`ALTER TABLE \`events_blocks_worlds_grid\` ADD \`design_frame\` text DEFAULT 'none';`)
  await db.run(sql`ALTER TABLE \`events_blocks_worlds_grid\` ADD \`design_padding_top\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`events_blocks_worlds_grid\` ADD \`design_padding_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`events_blocks_worlds_grid\` ADD \`design_margin_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`events_blocks_worlds_grid\` ADD \`design_width\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`events_blocks_rides_list\` ADD \`design_heading_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`events_blocks_rides_list\` ADD \`design_heading_font\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`events_blocks_rides_list\` ADD \`design_text_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`events_blocks_rides_list\` ADD \`design_background\` text;`)
  await db.run(sql`ALTER TABLE \`events_blocks_rides_list\` ADD \`design_frame\` text DEFAULT 'none';`)
  await db.run(sql`ALTER TABLE \`events_blocks_rides_list\` ADD \`design_padding_top\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`events_blocks_rides_list\` ADD \`design_padding_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`events_blocks_rides_list\` ADD \`design_margin_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`events_blocks_rides_list\` ADD \`design_width\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`events_blocks_events_rail\` ADD \`design_heading_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`events_blocks_events_rail\` ADD \`design_heading_font\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`events_blocks_events_rail\` ADD \`design_text_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`events_blocks_events_rail\` ADD \`design_background\` text;`)
  await db.run(sql`ALTER TABLE \`events_blocks_events_rail\` ADD \`design_frame\` text DEFAULT 'none';`)
  await db.run(sql`ALTER TABLE \`events_blocks_events_rail\` ADD \`design_padding_top\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`events_blocks_events_rail\` ADD \`design_padding_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`events_blocks_events_rail\` ADD \`design_margin_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`events_blocks_events_rail\` ADD \`design_width\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`events_blocks_today_status\` ADD \`design_heading_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`events_blocks_today_status\` ADD \`design_heading_font\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`events_blocks_today_status\` ADD \`design_text_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`events_blocks_today_status\` ADD \`design_background\` text;`)
  await db.run(sql`ALTER TABLE \`events_blocks_today_status\` ADD \`design_frame\` text DEFAULT 'none';`)
  await db.run(sql`ALTER TABLE \`events_blocks_today_status\` ADD \`design_padding_top\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`events_blocks_today_status\` ADD \`design_padding_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`events_blocks_today_status\` ADD \`design_margin_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`events_blocks_today_status\` ADD \`design_width\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`events_blocks_crew_planner\` ADD \`design_heading_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`events_blocks_crew_planner\` ADD \`design_heading_font\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`events_blocks_crew_planner\` ADD \`design_text_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`events_blocks_crew_planner\` ADD \`design_background\` text;`)
  await db.run(sql`ALTER TABLE \`events_blocks_crew_planner\` ADD \`design_frame\` text DEFAULT 'none';`)
  await db.run(sql`ALTER TABLE \`events_blocks_crew_planner\` ADD \`design_padding_top\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`events_blocks_crew_planner\` ADD \`design_padding_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`events_blocks_crew_planner\` ADD \`design_margin_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`events_blocks_crew_planner\` ADD \`design_width\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`events_blocks_venues_grid\` ADD \`design_heading_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`events_blocks_venues_grid\` ADD \`design_heading_font\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`events_blocks_venues_grid\` ADD \`design_text_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`events_blocks_venues_grid\` ADD \`design_background\` text;`)
  await db.run(sql`ALTER TABLE \`events_blocks_venues_grid\` ADD \`design_frame\` text DEFAULT 'none';`)
  await db.run(sql`ALTER TABLE \`events_blocks_venues_grid\` ADD \`design_padding_top\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`events_blocks_venues_grid\` ADD \`design_padding_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`events_blocks_venues_grid\` ADD \`design_margin_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`events_blocks_venues_grid\` ADD \`design_width\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`events_blocks_map\` ADD \`design_heading_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`events_blocks_map\` ADD \`design_heading_font\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`events_blocks_map\` ADD \`design_text_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`events_blocks_map\` ADD \`design_align\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`events_blocks_map\` ADD \`design_background\` text;`)
  await db.run(sql`ALTER TABLE \`events_blocks_map\` ADD \`design_frame\` text DEFAULT 'none';`)
  await db.run(sql`ALTER TABLE \`events_blocks_map\` ADD \`design_padding_top\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`events_blocks_map\` ADD \`design_padding_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`events_blocks_map\` ADD \`design_margin_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`events_blocks_map\` ADD \`design_width\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`events_blocks_stats\` ADD \`design_heading_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`events_blocks_stats\` ADD \`design_heading_font\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`events_blocks_stats\` ADD \`design_text_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`events_blocks_stats\` ADD \`design_align\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`events_blocks_stats\` ADD \`design_background\` text;`)
  await db.run(sql`ALTER TABLE \`events_blocks_stats\` ADD \`design_frame\` text DEFAULT 'none';`)
  await db.run(sql`ALTER TABLE \`events_blocks_stats\` ADD \`design_padding_top\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`events_blocks_stats\` ADD \`design_padding_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`events_blocks_stats\` ADD \`design_margin_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`events_blocks_stats\` ADD \`design_width\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`events_blocks_image_text\` ADD \`media\` text DEFAULT 'image';`)
  await db.run(sql`ALTER TABLE \`events_blocks_image_text\` ADD \`video_id\` integer REFERENCES media(id);`)
  await db.run(sql`ALTER TABLE \`events_blocks_image_text\` ADD \`video_url\` text;`)
  await db.run(sql`ALTER TABLE \`events_blocks_image_text\` ADD \`autoplay\` integer;`)
  await db.run(sql`ALTER TABLE \`events_blocks_image_text\` ADD \`split\` text DEFAULT '50';`)
  await db.run(sql`ALTER TABLE \`events_blocks_image_text\` ADD \`image_style\` text DEFAULT 'framed';`)
  await db.run(sql`ALTER TABLE \`events_blocks_image_text\` ADD \`secondary_href\` text;`)
  await db.run(sql`ALTER TABLE \`events_blocks_image_text\` ADD \`design_heading_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`events_blocks_image_text\` ADD \`design_heading_font\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`events_blocks_image_text\` ADD \`design_text_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`events_blocks_image_text\` ADD \`design_align\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`events_blocks_image_text\` ADD \`design_background\` text;`)
  await db.run(sql`ALTER TABLE \`events_blocks_image_text\` ADD \`design_frame\` text DEFAULT 'none';`)
  await db.run(sql`ALTER TABLE \`events_blocks_image_text\` ADD \`design_padding_top\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`events_blocks_image_text\` ADD \`design_padding_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`events_blocks_image_text\` ADD \`design_margin_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`events_blocks_image_text\` ADD \`design_width\` text DEFAULT 'auto';`)
  await db.run(sql`CREATE INDEX \`events_blocks_image_text_video_idx\` ON \`events_blocks_image_text\` (\`video_id\`);`)
  await db.run(sql`ALTER TABLE \`events_blocks_image_text_locales\` ADD \`secondary_label\` text;`)
  await db.run(sql`ALTER TABLE \`events_blocks_columns\` ADD \`design_heading_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`events_blocks_columns\` ADD \`design_heading_font\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`events_blocks_columns\` ADD \`design_text_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`events_blocks_columns\` ADD \`design_align\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`events_blocks_columns\` ADD \`design_background\` text;`)
  await db.run(sql`ALTER TABLE \`events_blocks_columns\` ADD \`design_frame\` text DEFAULT 'none';`)
  await db.run(sql`ALTER TABLE \`events_blocks_columns\` ADD \`design_padding_top\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`events_blocks_columns\` ADD \`design_padding_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`events_blocks_columns\` ADD \`design_margin_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`events_blocks_columns\` ADD \`design_width\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`events_blocks_rich_text\` ADD \`design_heading_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`events_blocks_rich_text\` ADD \`design_heading_font\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`events_blocks_rich_text\` ADD \`design_text_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`events_blocks_rich_text\` ADD \`design_align\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`events_blocks_rich_text\` ADD \`design_background\` text;`)
  await db.run(sql`ALTER TABLE \`events_blocks_rich_text\` ADD \`design_frame\` text DEFAULT 'none';`)
  await db.run(sql`ALTER TABLE \`events_blocks_rich_text\` ADD \`design_padding_top\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`events_blocks_rich_text\` ADD \`design_padding_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`events_blocks_rich_text\` ADD \`design_margin_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`events_blocks_rich_text\` ADD \`design_width\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`events_blocks_video\` ADD \`design_heading_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`events_blocks_video\` ADD \`design_heading_font\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`events_blocks_video\` ADD \`design_text_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`events_blocks_video\` ADD \`design_align\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`events_blocks_video\` ADD \`design_background\` text;`)
  await db.run(sql`ALTER TABLE \`events_blocks_video\` ADD \`design_frame\` text DEFAULT 'none';`)
  await db.run(sql`ALTER TABLE \`events_blocks_video\` ADD \`design_padding_top\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`events_blocks_video\` ADD \`design_padding_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`events_blocks_video\` ADD \`design_margin_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`events_blocks_video\` ADD \`design_width\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`events_blocks_gallery\` ADD \`columns\` text DEFAULT '3';`)
  await db.run(sql`ALTER TABLE \`events_blocks_gallery\` ADD \`design_heading_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`events_blocks_gallery\` ADD \`design_heading_font\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`events_blocks_gallery\` ADD \`design_text_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`events_blocks_gallery\` ADD \`design_align\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`events_blocks_gallery\` ADD \`design_background\` text;`)
  await db.run(sql`ALTER TABLE \`events_blocks_gallery\` ADD \`design_frame\` text DEFAULT 'none';`)
  await db.run(sql`ALTER TABLE \`events_blocks_gallery\` ADD \`design_padding_top\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`events_blocks_gallery\` ADD \`design_padding_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`events_blocks_gallery\` ADD \`design_margin_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`events_blocks_gallery\` ADD \`design_width\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`events_blocks_testimonials\` ADD \`design_heading_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`events_blocks_testimonials\` ADD \`design_heading_font\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`events_blocks_testimonials\` ADD \`design_text_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`events_blocks_testimonials\` ADD \`design_align\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`events_blocks_testimonials\` ADD \`design_background\` text;`)
  await db.run(sql`ALTER TABLE \`events_blocks_testimonials\` ADD \`design_frame\` text DEFAULT 'none';`)
  await db.run(sql`ALTER TABLE \`events_blocks_testimonials\` ADD \`design_padding_top\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`events_blocks_testimonials\` ADD \`design_padding_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`events_blocks_testimonials\` ADD \`design_margin_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`events_blocks_testimonials\` ADD \`design_width\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`events_blocks_logo_strip\` ADD \`design_heading_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`events_blocks_logo_strip\` ADD \`design_heading_font\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`events_blocks_logo_strip\` ADD \`design_text_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`events_blocks_logo_strip\` ADD \`design_align\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`events_blocks_logo_strip\` ADD \`design_background\` text;`)
  await db.run(sql`ALTER TABLE \`events_blocks_logo_strip\` ADD \`design_frame\` text DEFAULT 'none';`)
  await db.run(sql`ALTER TABLE \`events_blocks_logo_strip\` ADD \`design_padding_top\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`events_blocks_logo_strip\` ADD \`design_padding_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`events_blocks_logo_strip\` ADD \`design_margin_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`events_blocks_logo_strip\` ADD \`design_width\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`events_blocks_faq\` ADD \`design_heading_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`events_blocks_faq\` ADD \`design_heading_font\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`events_blocks_faq\` ADD \`design_text_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`events_blocks_faq\` ADD \`design_align\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`events_blocks_faq\` ADD \`design_background\` text;`)
  await db.run(sql`ALTER TABLE \`events_blocks_faq\` ADD \`design_frame\` text DEFAULT 'none';`)
  await db.run(sql`ALTER TABLE \`events_blocks_faq\` ADD \`design_padding_top\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`events_blocks_faq\` ADD \`design_padding_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`events_blocks_faq\` ADD \`design_margin_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`events_blocks_faq\` ADD \`design_width\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`events_blocks_lead_form\` ADD \`design_heading_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`events_blocks_lead_form\` ADD \`design_heading_font\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`events_blocks_lead_form\` ADD \`design_text_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`events_blocks_lead_form\` ADD \`design_align\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`events_blocks_lead_form\` ADD \`design_background\` text;`)
  await db.run(sql`ALTER TABLE \`events_blocks_lead_form\` ADD \`design_frame\` text DEFAULT 'none';`)
  await db.run(sql`ALTER TABLE \`events_blocks_lead_form\` ADD \`design_padding_top\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`events_blocks_lead_form\` ADD \`design_padding_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`events_blocks_lead_form\` ADD \`design_margin_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`events_blocks_lead_form\` ADD \`design_width\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`events_blocks_moments_wall\` ADD \`design_heading_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`events_blocks_moments_wall\` ADD \`design_heading_font\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`events_blocks_moments_wall\` ADD \`design_text_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`events_blocks_moments_wall\` ADD \`design_background\` text;`)
  await db.run(sql`ALTER TABLE \`events_blocks_moments_wall\` ADD \`design_frame\` text DEFAULT 'none';`)
  await db.run(sql`ALTER TABLE \`events_blocks_moments_wall\` ADD \`design_padding_top\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`events_blocks_moments_wall\` ADD \`design_padding_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`events_blocks_moments_wall\` ADD \`design_margin_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`events_blocks_moments_wall\` ADD \`design_width\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`events_blocks_journal_teaser\` ADD \`design_heading_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`events_blocks_journal_teaser\` ADD \`design_heading_font\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`events_blocks_journal_teaser\` ADD \`design_text_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`events_blocks_journal_teaser\` ADD \`design_align\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`events_blocks_journal_teaser\` ADD \`design_background\` text;`)
  await db.run(sql`ALTER TABLE \`events_blocks_journal_teaser\` ADD \`design_frame\` text DEFAULT 'none';`)
  await db.run(sql`ALTER TABLE \`events_blocks_journal_teaser\` ADD \`design_padding_top\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`events_blocks_journal_teaser\` ADD \`design_padding_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`events_blocks_journal_teaser\` ADD \`design_margin_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`events_blocks_journal_teaser\` ADD \`design_width\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`events_blocks_embed\` ADD \`design_heading_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`events_blocks_embed\` ADD \`design_heading_font\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`events_blocks_embed\` ADD \`design_text_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`events_blocks_embed\` ADD \`design_background\` text;`)
  await db.run(sql`ALTER TABLE \`events_blocks_embed\` ADD \`design_frame\` text DEFAULT 'none';`)
  await db.run(sql`ALTER TABLE \`events_blocks_embed\` ADD \`design_padding_top\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`events_blocks_embed\` ADD \`design_padding_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`events_blocks_embed\` ADD \`design_margin_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`events_blocks_embed\` ADD \`design_width\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`events_blocks_spacer\` ADD \`design_heading_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`events_blocks_spacer\` ADD \`design_heading_font\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`events_blocks_spacer\` ADD \`design_text_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`events_blocks_spacer\` ADD \`design_background\` text;`)
  await db.run(sql`ALTER TABLE \`events_blocks_spacer\` ADD \`design_frame\` text DEFAULT 'none';`)
  await db.run(sql`ALTER TABLE \`events_blocks_spacer\` ADD \`design_padding_top\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`events_blocks_spacer\` ADD \`design_padding_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`events_blocks_spacer\` ADD \`design_margin_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`events_blocks_spacer\` ADD \`design_width\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`events_blocks_reusable\` ADD \`design_heading_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`events_blocks_reusable\` ADD \`design_heading_font\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`events_blocks_reusable\` ADD \`design_text_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`events_blocks_reusable\` ADD \`design_background\` text;`)
  await db.run(sql`ALTER TABLE \`events_blocks_reusable\` ADD \`design_frame\` text DEFAULT 'none';`)
  await db.run(sql`ALTER TABLE \`events_blocks_reusable\` ADD \`design_padding_top\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`events_blocks_reusable\` ADD \`design_padding_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`events_blocks_reusable\` ADD \`design_margin_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`events_blocks_reusable\` ADD \`design_width\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_hero\` ADD \`design_heading_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_hero\` ADD \`design_heading_font\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_hero\` ADD \`design_text_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_hero\` ADD \`design_background\` text;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_hero\` ADD \`design_frame\` text DEFAULT 'none';`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_hero\` ADD \`design_padding_top\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_hero\` ADD \`design_padding_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_hero\` ADD \`design_margin_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_hero\` ADD \`design_width\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_ticker\` ADD \`design_heading_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_ticker\` ADD \`design_heading_font\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_ticker\` ADD \`design_text_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_ticker\` ADD \`design_background\` text;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_ticker\` ADD \`design_frame\` text DEFAULT 'none';`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_ticker\` ADD \`design_padding_top\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_ticker\` ADD \`design_padding_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_ticker\` ADD \`design_margin_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_ticker\` ADD \`design_width\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_offer_spotlight\` ADD \`design_heading_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_offer_spotlight\` ADD \`design_heading_font\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_offer_spotlight\` ADD \`design_text_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_offer_spotlight\` ADD \`design_align\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_offer_spotlight\` ADD \`design_background\` text;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_offer_spotlight\` ADD \`design_frame\` text DEFAULT 'none';`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_offer_spotlight\` ADD \`design_padding_top\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_offer_spotlight\` ADD \`design_padding_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_offer_spotlight\` ADD \`design_margin_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_offer_spotlight\` ADD \`design_width\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_countdown\` ADD \`design_heading_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_countdown\` ADD \`design_heading_font\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_countdown\` ADD \`design_text_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_countdown\` ADD \`design_align\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_countdown\` ADD \`design_background\` text;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_countdown\` ADD \`design_frame\` text DEFAULT 'none';`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_countdown\` ADD \`design_padding_top\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_countdown\` ADD \`design_padding_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_countdown\` ADD \`design_margin_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_countdown\` ADD \`design_width\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_cta_band\` ADD \`design_heading_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_cta_band\` ADD \`design_heading_font\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_cta_band\` ADD \`design_text_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_cta_band\` ADD \`design_align\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_cta_band\` ADD \`design_background\` text;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_cta_band\` ADD \`design_frame\` text DEFAULT 'none';`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_cta_band\` ADD \`design_padding_top\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_cta_band\` ADD \`design_padding_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_cta_band\` ADD \`design_margin_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_cta_band\` ADD \`design_width\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_ticket_cards\` ADD \`design_heading_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_ticket_cards\` ADD \`design_heading_font\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_ticket_cards\` ADD \`design_text_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_ticket_cards\` ADD \`design_background\` text;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_ticket_cards\` ADD \`design_frame\` text DEFAULT 'none';`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_ticket_cards\` ADD \`design_padding_top\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_ticket_cards\` ADD \`design_padding_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_ticket_cards\` ADD \`design_margin_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_ticket_cards\` ADD \`design_width\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_offer_grid\` ADD \`design_heading_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_offer_grid\` ADD \`design_heading_font\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_offer_grid\` ADD \`design_text_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_offer_grid\` ADD \`design_background\` text;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_offer_grid\` ADD \`design_frame\` text DEFAULT 'none';`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_offer_grid\` ADD \`design_padding_top\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_offer_grid\` ADD \`design_padding_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_offer_grid\` ADD \`design_margin_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_offer_grid\` ADD \`design_width\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_worlds_grid\` ADD \`design_heading_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_worlds_grid\` ADD \`design_heading_font\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_worlds_grid\` ADD \`design_text_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_worlds_grid\` ADD \`design_background\` text;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_worlds_grid\` ADD \`design_frame\` text DEFAULT 'none';`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_worlds_grid\` ADD \`design_padding_top\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_worlds_grid\` ADD \`design_padding_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_worlds_grid\` ADD \`design_margin_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_worlds_grid\` ADD \`design_width\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_rides_list\` ADD \`design_heading_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_rides_list\` ADD \`design_heading_font\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_rides_list\` ADD \`design_text_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_rides_list\` ADD \`design_background\` text;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_rides_list\` ADD \`design_frame\` text DEFAULT 'none';`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_rides_list\` ADD \`design_padding_top\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_rides_list\` ADD \`design_padding_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_rides_list\` ADD \`design_margin_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_rides_list\` ADD \`design_width\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_events_rail\` ADD \`design_heading_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_events_rail\` ADD \`design_heading_font\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_events_rail\` ADD \`design_text_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_events_rail\` ADD \`design_background\` text;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_events_rail\` ADD \`design_frame\` text DEFAULT 'none';`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_events_rail\` ADD \`design_padding_top\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_events_rail\` ADD \`design_padding_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_events_rail\` ADD \`design_margin_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_events_rail\` ADD \`design_width\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_today_status\` ADD \`design_heading_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_today_status\` ADD \`design_heading_font\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_today_status\` ADD \`design_text_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_today_status\` ADD \`design_background\` text;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_today_status\` ADD \`design_frame\` text DEFAULT 'none';`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_today_status\` ADD \`design_padding_top\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_today_status\` ADD \`design_padding_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_today_status\` ADD \`design_margin_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_today_status\` ADD \`design_width\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_crew_planner\` ADD \`design_heading_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_crew_planner\` ADD \`design_heading_font\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_crew_planner\` ADD \`design_text_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_crew_planner\` ADD \`design_background\` text;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_crew_planner\` ADD \`design_frame\` text DEFAULT 'none';`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_crew_planner\` ADD \`design_padding_top\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_crew_planner\` ADD \`design_padding_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_crew_planner\` ADD \`design_margin_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_crew_planner\` ADD \`design_width\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_venues_grid\` ADD \`design_heading_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_venues_grid\` ADD \`design_heading_font\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_venues_grid\` ADD \`design_text_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_venues_grid\` ADD \`design_background\` text;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_venues_grid\` ADD \`design_frame\` text DEFAULT 'none';`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_venues_grid\` ADD \`design_padding_top\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_venues_grid\` ADD \`design_padding_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_venues_grid\` ADD \`design_margin_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_venues_grid\` ADD \`design_width\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_map\` ADD \`design_heading_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_map\` ADD \`design_heading_font\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_map\` ADD \`design_text_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_map\` ADD \`design_align\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_map\` ADD \`design_background\` text;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_map\` ADD \`design_frame\` text DEFAULT 'none';`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_map\` ADD \`design_padding_top\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_map\` ADD \`design_padding_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_map\` ADD \`design_margin_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_map\` ADD \`design_width\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_stats\` ADD \`design_heading_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_stats\` ADD \`design_heading_font\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_stats\` ADD \`design_text_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_stats\` ADD \`design_align\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_stats\` ADD \`design_background\` text;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_stats\` ADD \`design_frame\` text DEFAULT 'none';`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_stats\` ADD \`design_padding_top\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_stats\` ADD \`design_padding_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_stats\` ADD \`design_margin_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_stats\` ADD \`design_width\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_image_text\` ADD \`media\` text DEFAULT 'image';`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_image_text\` ADD \`video_id\` integer REFERENCES media(id);`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_image_text\` ADD \`video_url\` text;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_image_text\` ADD \`autoplay\` integer;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_image_text\` ADD \`split\` text DEFAULT '50';`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_image_text\` ADD \`image_style\` text DEFAULT 'framed';`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_image_text\` ADD \`secondary_href\` text;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_image_text\` ADD \`design_heading_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_image_text\` ADD \`design_heading_font\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_image_text\` ADD \`design_text_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_image_text\` ADD \`design_align\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_image_text\` ADD \`design_background\` text;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_image_text\` ADD \`design_frame\` text DEFAULT 'none';`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_image_text\` ADD \`design_padding_top\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_image_text\` ADD \`design_padding_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_image_text\` ADD \`design_margin_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_image_text\` ADD \`design_width\` text DEFAULT 'auto';`)
  await db.run(sql`CREATE INDEX \`_events_v_blocks_image_text_video_idx\` ON \`_events_v_blocks_image_text\` (\`video_id\`);`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_image_text_locales\` ADD \`secondary_label\` text;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_columns\` ADD \`design_heading_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_columns\` ADD \`design_heading_font\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_columns\` ADD \`design_text_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_columns\` ADD \`design_align\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_columns\` ADD \`design_background\` text;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_columns\` ADD \`design_frame\` text DEFAULT 'none';`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_columns\` ADD \`design_padding_top\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_columns\` ADD \`design_padding_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_columns\` ADD \`design_margin_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_columns\` ADD \`design_width\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_rich_text\` ADD \`design_heading_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_rich_text\` ADD \`design_heading_font\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_rich_text\` ADD \`design_text_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_rich_text\` ADD \`design_align\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_rich_text\` ADD \`design_background\` text;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_rich_text\` ADD \`design_frame\` text DEFAULT 'none';`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_rich_text\` ADD \`design_padding_top\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_rich_text\` ADD \`design_padding_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_rich_text\` ADD \`design_margin_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_rich_text\` ADD \`design_width\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_video\` ADD \`design_heading_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_video\` ADD \`design_heading_font\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_video\` ADD \`design_text_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_video\` ADD \`design_align\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_video\` ADD \`design_background\` text;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_video\` ADD \`design_frame\` text DEFAULT 'none';`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_video\` ADD \`design_padding_top\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_video\` ADD \`design_padding_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_video\` ADD \`design_margin_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_video\` ADD \`design_width\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_gallery\` ADD \`columns\` text DEFAULT '3';`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_gallery\` ADD \`design_heading_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_gallery\` ADD \`design_heading_font\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_gallery\` ADD \`design_text_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_gallery\` ADD \`design_align\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_gallery\` ADD \`design_background\` text;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_gallery\` ADD \`design_frame\` text DEFAULT 'none';`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_gallery\` ADD \`design_padding_top\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_gallery\` ADD \`design_padding_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_gallery\` ADD \`design_margin_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_gallery\` ADD \`design_width\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_testimonials\` ADD \`design_heading_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_testimonials\` ADD \`design_heading_font\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_testimonials\` ADD \`design_text_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_testimonials\` ADD \`design_align\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_testimonials\` ADD \`design_background\` text;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_testimonials\` ADD \`design_frame\` text DEFAULT 'none';`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_testimonials\` ADD \`design_padding_top\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_testimonials\` ADD \`design_padding_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_testimonials\` ADD \`design_margin_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_testimonials\` ADD \`design_width\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_logo_strip\` ADD \`design_heading_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_logo_strip\` ADD \`design_heading_font\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_logo_strip\` ADD \`design_text_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_logo_strip\` ADD \`design_align\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_logo_strip\` ADD \`design_background\` text;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_logo_strip\` ADD \`design_frame\` text DEFAULT 'none';`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_logo_strip\` ADD \`design_padding_top\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_logo_strip\` ADD \`design_padding_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_logo_strip\` ADD \`design_margin_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_logo_strip\` ADD \`design_width\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_faq\` ADD \`design_heading_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_faq\` ADD \`design_heading_font\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_faq\` ADD \`design_text_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_faq\` ADD \`design_align\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_faq\` ADD \`design_background\` text;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_faq\` ADD \`design_frame\` text DEFAULT 'none';`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_faq\` ADD \`design_padding_top\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_faq\` ADD \`design_padding_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_faq\` ADD \`design_margin_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_faq\` ADD \`design_width\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_lead_form\` ADD \`design_heading_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_lead_form\` ADD \`design_heading_font\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_lead_form\` ADD \`design_text_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_lead_form\` ADD \`design_align\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_lead_form\` ADD \`design_background\` text;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_lead_form\` ADD \`design_frame\` text DEFAULT 'none';`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_lead_form\` ADD \`design_padding_top\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_lead_form\` ADD \`design_padding_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_lead_form\` ADD \`design_margin_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_lead_form\` ADD \`design_width\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_moments_wall\` ADD \`design_heading_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_moments_wall\` ADD \`design_heading_font\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_moments_wall\` ADD \`design_text_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_moments_wall\` ADD \`design_background\` text;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_moments_wall\` ADD \`design_frame\` text DEFAULT 'none';`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_moments_wall\` ADD \`design_padding_top\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_moments_wall\` ADD \`design_padding_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_moments_wall\` ADD \`design_margin_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_moments_wall\` ADD \`design_width\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_journal_teaser\` ADD \`design_heading_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_journal_teaser\` ADD \`design_heading_font\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_journal_teaser\` ADD \`design_text_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_journal_teaser\` ADD \`design_align\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_journal_teaser\` ADD \`design_background\` text;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_journal_teaser\` ADD \`design_frame\` text DEFAULT 'none';`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_journal_teaser\` ADD \`design_padding_top\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_journal_teaser\` ADD \`design_padding_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_journal_teaser\` ADD \`design_margin_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_journal_teaser\` ADD \`design_width\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_embed\` ADD \`design_heading_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_embed\` ADD \`design_heading_font\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_embed\` ADD \`design_text_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_embed\` ADD \`design_background\` text;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_embed\` ADD \`design_frame\` text DEFAULT 'none';`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_embed\` ADD \`design_padding_top\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_embed\` ADD \`design_padding_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_embed\` ADD \`design_margin_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_embed\` ADD \`design_width\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_spacer\` ADD \`design_heading_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_spacer\` ADD \`design_heading_font\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_spacer\` ADD \`design_text_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_spacer\` ADD \`design_background\` text;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_spacer\` ADD \`design_frame\` text DEFAULT 'none';`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_spacer\` ADD \`design_padding_top\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_spacer\` ADD \`design_padding_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_spacer\` ADD \`design_margin_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_spacer\` ADD \`design_width\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_reusable\` ADD \`design_heading_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_reusable\` ADD \`design_heading_font\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_reusable\` ADD \`design_text_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_reusable\` ADD \`design_background\` text;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_reusable\` ADD \`design_frame\` text DEFAULT 'none';`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_reusable\` ADD \`design_padding_top\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_reusable\` ADD \`design_padding_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_reusable\` ADD \`design_margin_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_reusable\` ADD \`design_width\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`posts_blocks_h2\` ADD \`anchor\` text;`)
  await db.run(sql`ALTER TABLE \`posts_blocks_list\` ADD \`style\` text DEFAULT 'tick';`)
  await db.run(sql`ALTER TABLE \`_posts_v_blocks_h2\` ADD \`anchor\` text;`)
  await db.run(sql`ALTER TABLE \`_posts_v_blocks_list\` ADD \`style\` text DEFAULT 'tick';`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_hero\` ADD \`design_heading_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_hero\` ADD \`design_heading_font\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_hero\` ADD \`design_text_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_hero\` ADD \`design_background\` text;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_hero\` ADD \`design_frame\` text DEFAULT 'none';`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_hero\` ADD \`design_padding_top\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_hero\` ADD \`design_padding_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_hero\` ADD \`design_margin_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_hero\` ADD \`design_width\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_ticker\` ADD \`design_heading_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_ticker\` ADD \`design_heading_font\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_ticker\` ADD \`design_text_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_ticker\` ADD \`design_background\` text;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_ticker\` ADD \`design_frame\` text DEFAULT 'none';`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_ticker\` ADD \`design_padding_top\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_ticker\` ADD \`design_padding_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_ticker\` ADD \`design_margin_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_ticker\` ADD \`design_width\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_offer_spotlight\` ADD \`design_heading_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_offer_spotlight\` ADD \`design_heading_font\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_offer_spotlight\` ADD \`design_text_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_offer_spotlight\` ADD \`design_align\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_offer_spotlight\` ADD \`design_background\` text;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_offer_spotlight\` ADD \`design_frame\` text DEFAULT 'none';`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_offer_spotlight\` ADD \`design_padding_top\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_offer_spotlight\` ADD \`design_padding_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_offer_spotlight\` ADD \`design_margin_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_offer_spotlight\` ADD \`design_width\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_countdown\` ADD \`design_heading_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_countdown\` ADD \`design_heading_font\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_countdown\` ADD \`design_text_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_countdown\` ADD \`design_align\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_countdown\` ADD \`design_background\` text;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_countdown\` ADD \`design_frame\` text DEFAULT 'none';`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_countdown\` ADD \`design_padding_top\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_countdown\` ADD \`design_padding_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_countdown\` ADD \`design_margin_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_countdown\` ADD \`design_width\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_cta_band\` ADD \`design_heading_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_cta_band\` ADD \`design_heading_font\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_cta_band\` ADD \`design_text_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_cta_band\` ADD \`design_align\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_cta_band\` ADD \`design_background\` text;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_cta_band\` ADD \`design_frame\` text DEFAULT 'none';`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_cta_band\` ADD \`design_padding_top\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_cta_band\` ADD \`design_padding_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_cta_band\` ADD \`design_margin_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_cta_band\` ADD \`design_width\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_ticket_cards\` ADD \`design_heading_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_ticket_cards\` ADD \`design_heading_font\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_ticket_cards\` ADD \`design_text_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_ticket_cards\` ADD \`design_background\` text;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_ticket_cards\` ADD \`design_frame\` text DEFAULT 'none';`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_ticket_cards\` ADD \`design_padding_top\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_ticket_cards\` ADD \`design_padding_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_ticket_cards\` ADD \`design_margin_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_ticket_cards\` ADD \`design_width\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_offer_grid\` ADD \`design_heading_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_offer_grid\` ADD \`design_heading_font\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_offer_grid\` ADD \`design_text_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_offer_grid\` ADD \`design_background\` text;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_offer_grid\` ADD \`design_frame\` text DEFAULT 'none';`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_offer_grid\` ADD \`design_padding_top\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_offer_grid\` ADD \`design_padding_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_offer_grid\` ADD \`design_margin_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_offer_grid\` ADD \`design_width\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_worlds_grid\` ADD \`design_heading_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_worlds_grid\` ADD \`design_heading_font\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_worlds_grid\` ADD \`design_text_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_worlds_grid\` ADD \`design_background\` text;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_worlds_grid\` ADD \`design_frame\` text DEFAULT 'none';`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_worlds_grid\` ADD \`design_padding_top\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_worlds_grid\` ADD \`design_padding_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_worlds_grid\` ADD \`design_margin_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_worlds_grid\` ADD \`design_width\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_rides_list\` ADD \`design_heading_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_rides_list\` ADD \`design_heading_font\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_rides_list\` ADD \`design_text_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_rides_list\` ADD \`design_background\` text;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_rides_list\` ADD \`design_frame\` text DEFAULT 'none';`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_rides_list\` ADD \`design_padding_top\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_rides_list\` ADD \`design_padding_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_rides_list\` ADD \`design_margin_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_rides_list\` ADD \`design_width\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_events_rail\` ADD \`design_heading_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_events_rail\` ADD \`design_heading_font\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_events_rail\` ADD \`design_text_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_events_rail\` ADD \`design_background\` text;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_events_rail\` ADD \`design_frame\` text DEFAULT 'none';`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_events_rail\` ADD \`design_padding_top\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_events_rail\` ADD \`design_padding_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_events_rail\` ADD \`design_margin_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_events_rail\` ADD \`design_width\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_today_status\` ADD \`design_heading_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_today_status\` ADD \`design_heading_font\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_today_status\` ADD \`design_text_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_today_status\` ADD \`design_background\` text;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_today_status\` ADD \`design_frame\` text DEFAULT 'none';`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_today_status\` ADD \`design_padding_top\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_today_status\` ADD \`design_padding_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_today_status\` ADD \`design_margin_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_today_status\` ADD \`design_width\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_crew_planner\` ADD \`design_heading_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_crew_planner\` ADD \`design_heading_font\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_crew_planner\` ADD \`design_text_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_crew_planner\` ADD \`design_background\` text;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_crew_planner\` ADD \`design_frame\` text DEFAULT 'none';`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_crew_planner\` ADD \`design_padding_top\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_crew_planner\` ADD \`design_padding_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_crew_planner\` ADD \`design_margin_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_crew_planner\` ADD \`design_width\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_venues_grid\` ADD \`design_heading_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_venues_grid\` ADD \`design_heading_font\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_venues_grid\` ADD \`design_text_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_venues_grid\` ADD \`design_background\` text;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_venues_grid\` ADD \`design_frame\` text DEFAULT 'none';`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_venues_grid\` ADD \`design_padding_top\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_venues_grid\` ADD \`design_padding_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_venues_grid\` ADD \`design_margin_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_venues_grid\` ADD \`design_width\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_map\` ADD \`design_heading_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_map\` ADD \`design_heading_font\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_map\` ADD \`design_text_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_map\` ADD \`design_align\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_map\` ADD \`design_background\` text;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_map\` ADD \`design_frame\` text DEFAULT 'none';`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_map\` ADD \`design_padding_top\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_map\` ADD \`design_padding_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_map\` ADD \`design_margin_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_map\` ADD \`design_width\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_stats\` ADD \`design_heading_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_stats\` ADD \`design_heading_font\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_stats\` ADD \`design_text_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_stats\` ADD \`design_align\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_stats\` ADD \`design_background\` text;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_stats\` ADD \`design_frame\` text DEFAULT 'none';`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_stats\` ADD \`design_padding_top\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_stats\` ADD \`design_padding_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_stats\` ADD \`design_margin_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_stats\` ADD \`design_width\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_image_text_locales\` ADD \`secondary_label\` text;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_columns\` ADD \`design_heading_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_columns\` ADD \`design_heading_font\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_columns\` ADD \`design_text_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_columns\` ADD \`design_align\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_columns\` ADD \`design_background\` text;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_columns\` ADD \`design_frame\` text DEFAULT 'none';`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_columns\` ADD \`design_padding_top\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_columns\` ADD \`design_padding_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_columns\` ADD \`design_margin_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_columns\` ADD \`design_width\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_rich_text\` ADD \`design_heading_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_rich_text\` ADD \`design_heading_font\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_rich_text\` ADD \`design_text_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_rich_text\` ADD \`design_align\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_rich_text\` ADD \`design_background\` text;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_rich_text\` ADD \`design_frame\` text DEFAULT 'none';`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_rich_text\` ADD \`design_padding_top\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_rich_text\` ADD \`design_padding_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_rich_text\` ADD \`design_margin_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_rich_text\` ADD \`design_width\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_video\` ADD \`design_heading_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_video\` ADD \`design_heading_font\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_video\` ADD \`design_text_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_video\` ADD \`design_align\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_video\` ADD \`design_background\` text;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_video\` ADD \`design_frame\` text DEFAULT 'none';`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_video\` ADD \`design_padding_top\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_video\` ADD \`design_padding_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_video\` ADD \`design_margin_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_video\` ADD \`design_width\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_gallery\` ADD \`columns\` text DEFAULT '3';`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_gallery\` ADD \`design_heading_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_gallery\` ADD \`design_heading_font\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_gallery\` ADD \`design_text_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_gallery\` ADD \`design_align\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_gallery\` ADD \`design_background\` text;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_gallery\` ADD \`design_frame\` text DEFAULT 'none';`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_gallery\` ADD \`design_padding_top\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_gallery\` ADD \`design_padding_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_gallery\` ADD \`design_margin_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_gallery\` ADD \`design_width\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_testimonials\` ADD \`design_heading_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_testimonials\` ADD \`design_heading_font\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_testimonials\` ADD \`design_text_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_testimonials\` ADD \`design_align\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_testimonials\` ADD \`design_background\` text;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_testimonials\` ADD \`design_frame\` text DEFAULT 'none';`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_testimonials\` ADD \`design_padding_top\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_testimonials\` ADD \`design_padding_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_testimonials\` ADD \`design_margin_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_testimonials\` ADD \`design_width\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_logo_strip\` ADD \`design_heading_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_logo_strip\` ADD \`design_heading_font\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_logo_strip\` ADD \`design_text_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_logo_strip\` ADD \`design_align\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_logo_strip\` ADD \`design_background\` text;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_logo_strip\` ADD \`design_frame\` text DEFAULT 'none';`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_logo_strip\` ADD \`design_padding_top\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_logo_strip\` ADD \`design_padding_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_logo_strip\` ADD \`design_margin_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_logo_strip\` ADD \`design_width\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_faq\` ADD \`design_heading_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_faq\` ADD \`design_heading_font\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_faq\` ADD \`design_text_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_faq\` ADD \`design_align\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_faq\` ADD \`design_background\` text;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_faq\` ADD \`design_frame\` text DEFAULT 'none';`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_faq\` ADD \`design_padding_top\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_faq\` ADD \`design_padding_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_faq\` ADD \`design_margin_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_faq\` ADD \`design_width\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_lead_form\` ADD \`design_heading_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_lead_form\` ADD \`design_heading_font\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_lead_form\` ADD \`design_text_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_lead_form\` ADD \`design_align\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_lead_form\` ADD \`design_background\` text;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_lead_form\` ADD \`design_frame\` text DEFAULT 'none';`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_lead_form\` ADD \`design_padding_top\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_lead_form\` ADD \`design_padding_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_lead_form\` ADD \`design_margin_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_lead_form\` ADD \`design_width\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_moments_wall\` ADD \`design_heading_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_moments_wall\` ADD \`design_heading_font\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_moments_wall\` ADD \`design_text_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_moments_wall\` ADD \`design_background\` text;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_moments_wall\` ADD \`design_frame\` text DEFAULT 'none';`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_moments_wall\` ADD \`design_padding_top\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_moments_wall\` ADD \`design_padding_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_moments_wall\` ADD \`design_margin_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_moments_wall\` ADD \`design_width\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_journal_teaser\` ADD \`design_heading_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_journal_teaser\` ADD \`design_heading_font\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_journal_teaser\` ADD \`design_text_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_journal_teaser\` ADD \`design_align\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_journal_teaser\` ADD \`design_background\` text;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_journal_teaser\` ADD \`design_frame\` text DEFAULT 'none';`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_journal_teaser\` ADD \`design_padding_top\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_journal_teaser\` ADD \`design_padding_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_journal_teaser\` ADD \`design_margin_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_journal_teaser\` ADD \`design_width\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_embed\` ADD \`design_heading_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_embed\` ADD \`design_heading_font\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_embed\` ADD \`design_text_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_embed\` ADD \`design_background\` text;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_embed\` ADD \`design_frame\` text DEFAULT 'none';`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_embed\` ADD \`design_padding_top\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_embed\` ADD \`design_padding_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_embed\` ADD \`design_margin_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_embed\` ADD \`design_width\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_spacer\` ADD \`design_heading_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_spacer\` ADD \`design_heading_font\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_spacer\` ADD \`design_text_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_spacer\` ADD \`design_background\` text;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_spacer\` ADD \`design_frame\` text DEFAULT 'none';`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_spacer\` ADD \`design_padding_top\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_spacer\` ADD \`design_padding_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_spacer\` ADD \`design_margin_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_spacer\` ADD \`design_width\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_reusable\` ADD \`design_heading_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_reusable\` ADD \`design_heading_font\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_reusable\` ADD \`design_text_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_reusable\` ADD \`design_background\` text;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_reusable\` ADD \`design_frame\` text DEFAULT 'none';`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_reusable\` ADD \`design_padding_top\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_reusable\` ADD \`design_padding_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_reusable\` ADD \`design_margin_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_reusable\` ADD \`design_width\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`sections_blocks_hero\` ADD \`design_heading_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`sections_blocks_hero\` ADD \`design_heading_font\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`sections_blocks_hero\` ADD \`design_text_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`sections_blocks_hero\` ADD \`design_background\` text;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_hero\` ADD \`design_frame\` text DEFAULT 'none';`)
  await db.run(sql`ALTER TABLE \`sections_blocks_hero\` ADD \`design_padding_top\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`sections_blocks_hero\` ADD \`design_padding_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`sections_blocks_hero\` ADD \`design_margin_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`sections_blocks_hero\` ADD \`design_width\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`sections_blocks_ticker\` ADD \`design_heading_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`sections_blocks_ticker\` ADD \`design_heading_font\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`sections_blocks_ticker\` ADD \`design_text_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`sections_blocks_ticker\` ADD \`design_background\` text;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_ticker\` ADD \`design_frame\` text DEFAULT 'none';`)
  await db.run(sql`ALTER TABLE \`sections_blocks_ticker\` ADD \`design_padding_top\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`sections_blocks_ticker\` ADD \`design_padding_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`sections_blocks_ticker\` ADD \`design_margin_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`sections_blocks_ticker\` ADD \`design_width\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`sections_blocks_offer_spotlight\` ADD \`design_heading_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`sections_blocks_offer_spotlight\` ADD \`design_heading_font\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`sections_blocks_offer_spotlight\` ADD \`design_text_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`sections_blocks_offer_spotlight\` ADD \`design_align\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`sections_blocks_offer_spotlight\` ADD \`design_background\` text;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_offer_spotlight\` ADD \`design_frame\` text DEFAULT 'none';`)
  await db.run(sql`ALTER TABLE \`sections_blocks_offer_spotlight\` ADD \`design_padding_top\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`sections_blocks_offer_spotlight\` ADD \`design_padding_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`sections_blocks_offer_spotlight\` ADD \`design_margin_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`sections_blocks_offer_spotlight\` ADD \`design_width\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`sections_blocks_countdown\` ADD \`design_heading_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`sections_blocks_countdown\` ADD \`design_heading_font\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`sections_blocks_countdown\` ADD \`design_text_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`sections_blocks_countdown\` ADD \`design_align\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`sections_blocks_countdown\` ADD \`design_background\` text;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_countdown\` ADD \`design_frame\` text DEFAULT 'none';`)
  await db.run(sql`ALTER TABLE \`sections_blocks_countdown\` ADD \`design_padding_top\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`sections_blocks_countdown\` ADD \`design_padding_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`sections_blocks_countdown\` ADD \`design_margin_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`sections_blocks_countdown\` ADD \`design_width\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`sections_blocks_cta_band\` ADD \`design_heading_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`sections_blocks_cta_band\` ADD \`design_heading_font\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`sections_blocks_cta_band\` ADD \`design_text_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`sections_blocks_cta_band\` ADD \`design_align\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`sections_blocks_cta_band\` ADD \`design_background\` text;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_cta_band\` ADD \`design_frame\` text DEFAULT 'none';`)
  await db.run(sql`ALTER TABLE \`sections_blocks_cta_band\` ADD \`design_padding_top\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`sections_blocks_cta_band\` ADD \`design_padding_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`sections_blocks_cta_band\` ADD \`design_margin_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`sections_blocks_cta_band\` ADD \`design_width\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`sections_blocks_ticket_cards\` ADD \`design_heading_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`sections_blocks_ticket_cards\` ADD \`design_heading_font\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`sections_blocks_ticket_cards\` ADD \`design_text_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`sections_blocks_ticket_cards\` ADD \`design_background\` text;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_ticket_cards\` ADD \`design_frame\` text DEFAULT 'none';`)
  await db.run(sql`ALTER TABLE \`sections_blocks_ticket_cards\` ADD \`design_padding_top\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`sections_blocks_ticket_cards\` ADD \`design_padding_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`sections_blocks_ticket_cards\` ADD \`design_margin_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`sections_blocks_ticket_cards\` ADD \`design_width\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`sections_blocks_offer_grid\` ADD \`design_heading_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`sections_blocks_offer_grid\` ADD \`design_heading_font\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`sections_blocks_offer_grid\` ADD \`design_text_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`sections_blocks_offer_grid\` ADD \`design_background\` text;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_offer_grid\` ADD \`design_frame\` text DEFAULT 'none';`)
  await db.run(sql`ALTER TABLE \`sections_blocks_offer_grid\` ADD \`design_padding_top\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`sections_blocks_offer_grid\` ADD \`design_padding_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`sections_blocks_offer_grid\` ADD \`design_margin_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`sections_blocks_offer_grid\` ADD \`design_width\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`sections_blocks_worlds_grid\` ADD \`design_heading_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`sections_blocks_worlds_grid\` ADD \`design_heading_font\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`sections_blocks_worlds_grid\` ADD \`design_text_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`sections_blocks_worlds_grid\` ADD \`design_background\` text;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_worlds_grid\` ADD \`design_frame\` text DEFAULT 'none';`)
  await db.run(sql`ALTER TABLE \`sections_blocks_worlds_grid\` ADD \`design_padding_top\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`sections_blocks_worlds_grid\` ADD \`design_padding_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`sections_blocks_worlds_grid\` ADD \`design_margin_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`sections_blocks_worlds_grid\` ADD \`design_width\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`sections_blocks_rides_list\` ADD \`design_heading_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`sections_blocks_rides_list\` ADD \`design_heading_font\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`sections_blocks_rides_list\` ADD \`design_text_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`sections_blocks_rides_list\` ADD \`design_background\` text;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_rides_list\` ADD \`design_frame\` text DEFAULT 'none';`)
  await db.run(sql`ALTER TABLE \`sections_blocks_rides_list\` ADD \`design_padding_top\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`sections_blocks_rides_list\` ADD \`design_padding_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`sections_blocks_rides_list\` ADD \`design_margin_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`sections_blocks_rides_list\` ADD \`design_width\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`sections_blocks_events_rail\` ADD \`design_heading_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`sections_blocks_events_rail\` ADD \`design_heading_font\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`sections_blocks_events_rail\` ADD \`design_text_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`sections_blocks_events_rail\` ADD \`design_background\` text;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_events_rail\` ADD \`design_frame\` text DEFAULT 'none';`)
  await db.run(sql`ALTER TABLE \`sections_blocks_events_rail\` ADD \`design_padding_top\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`sections_blocks_events_rail\` ADD \`design_padding_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`sections_blocks_events_rail\` ADD \`design_margin_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`sections_blocks_events_rail\` ADD \`design_width\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`sections_blocks_today_status\` ADD \`design_heading_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`sections_blocks_today_status\` ADD \`design_heading_font\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`sections_blocks_today_status\` ADD \`design_text_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`sections_blocks_today_status\` ADD \`design_background\` text;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_today_status\` ADD \`design_frame\` text DEFAULT 'none';`)
  await db.run(sql`ALTER TABLE \`sections_blocks_today_status\` ADD \`design_padding_top\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`sections_blocks_today_status\` ADD \`design_padding_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`sections_blocks_today_status\` ADD \`design_margin_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`sections_blocks_today_status\` ADD \`design_width\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`sections_blocks_crew_planner\` ADD \`design_heading_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`sections_blocks_crew_planner\` ADD \`design_heading_font\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`sections_blocks_crew_planner\` ADD \`design_text_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`sections_blocks_crew_planner\` ADD \`design_background\` text;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_crew_planner\` ADD \`design_frame\` text DEFAULT 'none';`)
  await db.run(sql`ALTER TABLE \`sections_blocks_crew_planner\` ADD \`design_padding_top\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`sections_blocks_crew_planner\` ADD \`design_padding_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`sections_blocks_crew_planner\` ADD \`design_margin_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`sections_blocks_crew_planner\` ADD \`design_width\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`sections_blocks_venues_grid\` ADD \`design_heading_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`sections_blocks_venues_grid\` ADD \`design_heading_font\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`sections_blocks_venues_grid\` ADD \`design_text_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`sections_blocks_venues_grid\` ADD \`design_background\` text;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_venues_grid\` ADD \`design_frame\` text DEFAULT 'none';`)
  await db.run(sql`ALTER TABLE \`sections_blocks_venues_grid\` ADD \`design_padding_top\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`sections_blocks_venues_grid\` ADD \`design_padding_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`sections_blocks_venues_grid\` ADD \`design_margin_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`sections_blocks_venues_grid\` ADD \`design_width\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`sections_blocks_map\` ADD \`design_heading_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`sections_blocks_map\` ADD \`design_heading_font\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`sections_blocks_map\` ADD \`design_text_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`sections_blocks_map\` ADD \`design_align\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`sections_blocks_map\` ADD \`design_background\` text;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_map\` ADD \`design_frame\` text DEFAULT 'none';`)
  await db.run(sql`ALTER TABLE \`sections_blocks_map\` ADD \`design_padding_top\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`sections_blocks_map\` ADD \`design_padding_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`sections_blocks_map\` ADD \`design_margin_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`sections_blocks_map\` ADD \`design_width\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`sections_blocks_stats\` ADD \`design_heading_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`sections_blocks_stats\` ADD \`design_heading_font\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`sections_blocks_stats\` ADD \`design_text_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`sections_blocks_stats\` ADD \`design_align\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`sections_blocks_stats\` ADD \`design_background\` text;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_stats\` ADD \`design_frame\` text DEFAULT 'none';`)
  await db.run(sql`ALTER TABLE \`sections_blocks_stats\` ADD \`design_padding_top\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`sections_blocks_stats\` ADD \`design_padding_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`sections_blocks_stats\` ADD \`design_margin_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`sections_blocks_stats\` ADD \`design_width\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`sections_blocks_image_text\` ADD \`media\` text DEFAULT 'image';`)
  await db.run(sql`ALTER TABLE \`sections_blocks_image_text\` ADD \`video_id\` integer REFERENCES media(id);`)
  await db.run(sql`ALTER TABLE \`sections_blocks_image_text\` ADD \`video_url\` text;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_image_text\` ADD \`autoplay\` integer;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_image_text\` ADD \`split\` text DEFAULT '50';`)
  await db.run(sql`ALTER TABLE \`sections_blocks_image_text\` ADD \`image_style\` text DEFAULT 'framed';`)
  await db.run(sql`ALTER TABLE \`sections_blocks_image_text\` ADD \`secondary_href\` text;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_image_text\` ADD \`design_heading_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`sections_blocks_image_text\` ADD \`design_heading_font\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`sections_blocks_image_text\` ADD \`design_text_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`sections_blocks_image_text\` ADD \`design_align\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`sections_blocks_image_text\` ADD \`design_background\` text;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_image_text\` ADD \`design_frame\` text DEFAULT 'none';`)
  await db.run(sql`ALTER TABLE \`sections_blocks_image_text\` ADD \`design_padding_top\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`sections_blocks_image_text\` ADD \`design_padding_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`sections_blocks_image_text\` ADD \`design_margin_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`sections_blocks_image_text\` ADD \`design_width\` text DEFAULT 'auto';`)
  await db.run(sql`CREATE INDEX \`sections_blocks_image_text_video_idx\` ON \`sections_blocks_image_text\` (\`video_id\`);`)
  await db.run(sql`ALTER TABLE \`sections_blocks_image_text_locales\` ADD \`secondary_label\` text;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_columns\` ADD \`design_heading_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`sections_blocks_columns\` ADD \`design_heading_font\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`sections_blocks_columns\` ADD \`design_text_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`sections_blocks_columns\` ADD \`design_align\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`sections_blocks_columns\` ADD \`design_background\` text;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_columns\` ADD \`design_frame\` text DEFAULT 'none';`)
  await db.run(sql`ALTER TABLE \`sections_blocks_columns\` ADD \`design_padding_top\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`sections_blocks_columns\` ADD \`design_padding_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`sections_blocks_columns\` ADD \`design_margin_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`sections_blocks_columns\` ADD \`design_width\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`sections_blocks_rich_text\` ADD \`design_heading_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`sections_blocks_rich_text\` ADD \`design_heading_font\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`sections_blocks_rich_text\` ADD \`design_text_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`sections_blocks_rich_text\` ADD \`design_align\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`sections_blocks_rich_text\` ADD \`design_background\` text;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_rich_text\` ADD \`design_frame\` text DEFAULT 'none';`)
  await db.run(sql`ALTER TABLE \`sections_blocks_rich_text\` ADD \`design_padding_top\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`sections_blocks_rich_text\` ADD \`design_padding_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`sections_blocks_rich_text\` ADD \`design_margin_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`sections_blocks_rich_text\` ADD \`design_width\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`sections_blocks_video\` ADD \`design_heading_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`sections_blocks_video\` ADD \`design_heading_font\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`sections_blocks_video\` ADD \`design_text_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`sections_blocks_video\` ADD \`design_align\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`sections_blocks_video\` ADD \`design_background\` text;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_video\` ADD \`design_frame\` text DEFAULT 'none';`)
  await db.run(sql`ALTER TABLE \`sections_blocks_video\` ADD \`design_padding_top\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`sections_blocks_video\` ADD \`design_padding_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`sections_blocks_video\` ADD \`design_margin_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`sections_blocks_video\` ADD \`design_width\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`sections_blocks_gallery\` ADD \`columns\` text DEFAULT '3';`)
  await db.run(sql`ALTER TABLE \`sections_blocks_gallery\` ADD \`design_heading_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`sections_blocks_gallery\` ADD \`design_heading_font\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`sections_blocks_gallery\` ADD \`design_text_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`sections_blocks_gallery\` ADD \`design_align\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`sections_blocks_gallery\` ADD \`design_background\` text;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_gallery\` ADD \`design_frame\` text DEFAULT 'none';`)
  await db.run(sql`ALTER TABLE \`sections_blocks_gallery\` ADD \`design_padding_top\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`sections_blocks_gallery\` ADD \`design_padding_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`sections_blocks_gallery\` ADD \`design_margin_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`sections_blocks_gallery\` ADD \`design_width\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`sections_blocks_testimonials\` ADD \`design_heading_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`sections_blocks_testimonials\` ADD \`design_heading_font\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`sections_blocks_testimonials\` ADD \`design_text_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`sections_blocks_testimonials\` ADD \`design_align\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`sections_blocks_testimonials\` ADD \`design_background\` text;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_testimonials\` ADD \`design_frame\` text DEFAULT 'none';`)
  await db.run(sql`ALTER TABLE \`sections_blocks_testimonials\` ADD \`design_padding_top\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`sections_blocks_testimonials\` ADD \`design_padding_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`sections_blocks_testimonials\` ADD \`design_margin_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`sections_blocks_testimonials\` ADD \`design_width\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`sections_blocks_logo_strip\` ADD \`design_heading_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`sections_blocks_logo_strip\` ADD \`design_heading_font\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`sections_blocks_logo_strip\` ADD \`design_text_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`sections_blocks_logo_strip\` ADD \`design_align\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`sections_blocks_logo_strip\` ADD \`design_background\` text;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_logo_strip\` ADD \`design_frame\` text DEFAULT 'none';`)
  await db.run(sql`ALTER TABLE \`sections_blocks_logo_strip\` ADD \`design_padding_top\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`sections_blocks_logo_strip\` ADD \`design_padding_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`sections_blocks_logo_strip\` ADD \`design_margin_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`sections_blocks_logo_strip\` ADD \`design_width\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`sections_blocks_faq\` ADD \`design_heading_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`sections_blocks_faq\` ADD \`design_heading_font\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`sections_blocks_faq\` ADD \`design_text_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`sections_blocks_faq\` ADD \`design_align\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`sections_blocks_faq\` ADD \`design_background\` text;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_faq\` ADD \`design_frame\` text DEFAULT 'none';`)
  await db.run(sql`ALTER TABLE \`sections_blocks_faq\` ADD \`design_padding_top\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`sections_blocks_faq\` ADD \`design_padding_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`sections_blocks_faq\` ADD \`design_margin_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`sections_blocks_faq\` ADD \`design_width\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`sections_blocks_lead_form\` ADD \`design_heading_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`sections_blocks_lead_form\` ADD \`design_heading_font\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`sections_blocks_lead_form\` ADD \`design_text_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`sections_blocks_lead_form\` ADD \`design_align\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`sections_blocks_lead_form\` ADD \`design_background\` text;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_lead_form\` ADD \`design_frame\` text DEFAULT 'none';`)
  await db.run(sql`ALTER TABLE \`sections_blocks_lead_form\` ADD \`design_padding_top\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`sections_blocks_lead_form\` ADD \`design_padding_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`sections_blocks_lead_form\` ADD \`design_margin_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`sections_blocks_lead_form\` ADD \`design_width\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`sections_blocks_moments_wall\` ADD \`design_heading_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`sections_blocks_moments_wall\` ADD \`design_heading_font\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`sections_blocks_moments_wall\` ADD \`design_text_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`sections_blocks_moments_wall\` ADD \`design_background\` text;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_moments_wall\` ADD \`design_frame\` text DEFAULT 'none';`)
  await db.run(sql`ALTER TABLE \`sections_blocks_moments_wall\` ADD \`design_padding_top\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`sections_blocks_moments_wall\` ADD \`design_padding_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`sections_blocks_moments_wall\` ADD \`design_margin_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`sections_blocks_moments_wall\` ADD \`design_width\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`sections_blocks_journal_teaser\` ADD \`design_heading_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`sections_blocks_journal_teaser\` ADD \`design_heading_font\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`sections_blocks_journal_teaser\` ADD \`design_text_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`sections_blocks_journal_teaser\` ADD \`design_align\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`sections_blocks_journal_teaser\` ADD \`design_background\` text;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_journal_teaser\` ADD \`design_frame\` text DEFAULT 'none';`)
  await db.run(sql`ALTER TABLE \`sections_blocks_journal_teaser\` ADD \`design_padding_top\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`sections_blocks_journal_teaser\` ADD \`design_padding_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`sections_blocks_journal_teaser\` ADD \`design_margin_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`sections_blocks_journal_teaser\` ADD \`design_width\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`sections_blocks_embed\` ADD \`design_heading_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`sections_blocks_embed\` ADD \`design_heading_font\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`sections_blocks_embed\` ADD \`design_text_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`sections_blocks_embed\` ADD \`design_background\` text;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_embed\` ADD \`design_frame\` text DEFAULT 'none';`)
  await db.run(sql`ALTER TABLE \`sections_blocks_embed\` ADD \`design_padding_top\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`sections_blocks_embed\` ADD \`design_padding_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`sections_blocks_embed\` ADD \`design_margin_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`sections_blocks_embed\` ADD \`design_width\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`sections_blocks_spacer\` ADD \`design_heading_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`sections_blocks_spacer\` ADD \`design_heading_font\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`sections_blocks_spacer\` ADD \`design_text_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`sections_blocks_spacer\` ADD \`design_background\` text;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_spacer\` ADD \`design_frame\` text DEFAULT 'none';`)
  await db.run(sql`ALTER TABLE \`sections_blocks_spacer\` ADD \`design_padding_top\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`sections_blocks_spacer\` ADD \`design_padding_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`sections_blocks_spacer\` ADD \`design_margin_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`sections_blocks_spacer\` ADD \`design_width\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_hero\` ADD \`design_heading_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_hero\` ADD \`design_heading_font\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_hero\` ADD \`design_text_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_hero\` ADD \`design_background\` text;`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_hero\` ADD \`design_frame\` text DEFAULT 'none';`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_hero\` ADD \`design_padding_top\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_hero\` ADD \`design_padding_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_hero\` ADD \`design_margin_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_hero\` ADD \`design_width\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_ticker\` ADD \`design_heading_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_ticker\` ADD \`design_heading_font\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_ticker\` ADD \`design_text_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_ticker\` ADD \`design_background\` text;`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_ticker\` ADD \`design_frame\` text DEFAULT 'none';`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_ticker\` ADD \`design_padding_top\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_ticker\` ADD \`design_padding_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_ticker\` ADD \`design_margin_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_ticker\` ADD \`design_width\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_offer_spotlight\` ADD \`design_heading_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_offer_spotlight\` ADD \`design_heading_font\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_offer_spotlight\` ADD \`design_text_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_offer_spotlight\` ADD \`design_align\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_offer_spotlight\` ADD \`design_background\` text;`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_offer_spotlight\` ADD \`design_frame\` text DEFAULT 'none';`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_offer_spotlight\` ADD \`design_padding_top\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_offer_spotlight\` ADD \`design_padding_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_offer_spotlight\` ADD \`design_margin_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_offer_spotlight\` ADD \`design_width\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_countdown\` ADD \`design_heading_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_countdown\` ADD \`design_heading_font\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_countdown\` ADD \`design_text_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_countdown\` ADD \`design_align\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_countdown\` ADD \`design_background\` text;`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_countdown\` ADD \`design_frame\` text DEFAULT 'none';`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_countdown\` ADD \`design_padding_top\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_countdown\` ADD \`design_padding_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_countdown\` ADD \`design_margin_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_countdown\` ADD \`design_width\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_cta_band\` ADD \`design_heading_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_cta_band\` ADD \`design_heading_font\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_cta_band\` ADD \`design_text_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_cta_band\` ADD \`design_align\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_cta_band\` ADD \`design_background\` text;`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_cta_band\` ADD \`design_frame\` text DEFAULT 'none';`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_cta_band\` ADD \`design_padding_top\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_cta_band\` ADD \`design_padding_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_cta_band\` ADD \`design_margin_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_cta_band\` ADD \`design_width\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_ticket_cards\` ADD \`design_heading_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_ticket_cards\` ADD \`design_heading_font\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_ticket_cards\` ADD \`design_text_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_ticket_cards\` ADD \`design_background\` text;`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_ticket_cards\` ADD \`design_frame\` text DEFAULT 'none';`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_ticket_cards\` ADD \`design_padding_top\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_ticket_cards\` ADD \`design_padding_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_ticket_cards\` ADD \`design_margin_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_ticket_cards\` ADD \`design_width\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_offer_grid\` ADD \`design_heading_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_offer_grid\` ADD \`design_heading_font\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_offer_grid\` ADD \`design_text_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_offer_grid\` ADD \`design_background\` text;`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_offer_grid\` ADD \`design_frame\` text DEFAULT 'none';`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_offer_grid\` ADD \`design_padding_top\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_offer_grid\` ADD \`design_padding_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_offer_grid\` ADD \`design_margin_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_offer_grid\` ADD \`design_width\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_worlds_grid\` ADD \`design_heading_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_worlds_grid\` ADD \`design_heading_font\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_worlds_grid\` ADD \`design_text_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_worlds_grid\` ADD \`design_background\` text;`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_worlds_grid\` ADD \`design_frame\` text DEFAULT 'none';`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_worlds_grid\` ADD \`design_padding_top\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_worlds_grid\` ADD \`design_padding_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_worlds_grid\` ADD \`design_margin_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_worlds_grid\` ADD \`design_width\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_rides_list\` ADD \`design_heading_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_rides_list\` ADD \`design_heading_font\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_rides_list\` ADD \`design_text_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_rides_list\` ADD \`design_background\` text;`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_rides_list\` ADD \`design_frame\` text DEFAULT 'none';`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_rides_list\` ADD \`design_padding_top\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_rides_list\` ADD \`design_padding_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_rides_list\` ADD \`design_margin_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_rides_list\` ADD \`design_width\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_events_rail\` ADD \`design_heading_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_events_rail\` ADD \`design_heading_font\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_events_rail\` ADD \`design_text_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_events_rail\` ADD \`design_background\` text;`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_events_rail\` ADD \`design_frame\` text DEFAULT 'none';`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_events_rail\` ADD \`design_padding_top\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_events_rail\` ADD \`design_padding_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_events_rail\` ADD \`design_margin_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_events_rail\` ADD \`design_width\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_today_status\` ADD \`design_heading_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_today_status\` ADD \`design_heading_font\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_today_status\` ADD \`design_text_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_today_status\` ADD \`design_background\` text;`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_today_status\` ADD \`design_frame\` text DEFAULT 'none';`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_today_status\` ADD \`design_padding_top\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_today_status\` ADD \`design_padding_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_today_status\` ADD \`design_margin_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_today_status\` ADD \`design_width\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_crew_planner\` ADD \`design_heading_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_crew_planner\` ADD \`design_heading_font\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_crew_planner\` ADD \`design_text_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_crew_planner\` ADD \`design_background\` text;`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_crew_planner\` ADD \`design_frame\` text DEFAULT 'none';`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_crew_planner\` ADD \`design_padding_top\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_crew_planner\` ADD \`design_padding_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_crew_planner\` ADD \`design_margin_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_crew_planner\` ADD \`design_width\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_venues_grid\` ADD \`design_heading_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_venues_grid\` ADD \`design_heading_font\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_venues_grid\` ADD \`design_text_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_venues_grid\` ADD \`design_background\` text;`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_venues_grid\` ADD \`design_frame\` text DEFAULT 'none';`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_venues_grid\` ADD \`design_padding_top\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_venues_grid\` ADD \`design_padding_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_venues_grid\` ADD \`design_margin_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_venues_grid\` ADD \`design_width\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_map\` ADD \`design_heading_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_map\` ADD \`design_heading_font\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_map\` ADD \`design_text_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_map\` ADD \`design_align\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_map\` ADD \`design_background\` text;`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_map\` ADD \`design_frame\` text DEFAULT 'none';`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_map\` ADD \`design_padding_top\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_map\` ADD \`design_padding_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_map\` ADD \`design_margin_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_map\` ADD \`design_width\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_stats\` ADD \`design_heading_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_stats\` ADD \`design_heading_font\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_stats\` ADD \`design_text_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_stats\` ADD \`design_align\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_stats\` ADD \`design_background\` text;`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_stats\` ADD \`design_frame\` text DEFAULT 'none';`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_stats\` ADD \`design_padding_top\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_stats\` ADD \`design_padding_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_stats\` ADD \`design_margin_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_stats\` ADD \`design_width\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_image_text\` ADD \`media\` text DEFAULT 'image';`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_image_text\` ADD \`video_id\` integer REFERENCES media(id);`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_image_text\` ADD \`video_url\` text;`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_image_text\` ADD \`autoplay\` integer;`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_image_text\` ADD \`split\` text DEFAULT '50';`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_image_text\` ADD \`image_style\` text DEFAULT 'framed';`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_image_text\` ADD \`secondary_href\` text;`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_image_text\` ADD \`design_heading_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_image_text\` ADD \`design_heading_font\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_image_text\` ADD \`design_text_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_image_text\` ADD \`design_align\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_image_text\` ADD \`design_background\` text;`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_image_text\` ADD \`design_frame\` text DEFAULT 'none';`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_image_text\` ADD \`design_padding_top\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_image_text\` ADD \`design_padding_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_image_text\` ADD \`design_margin_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_image_text\` ADD \`design_width\` text DEFAULT 'auto';`)
  await db.run(sql`CREATE INDEX \`_sections_v_blocks_image_text_video_idx\` ON \`_sections_v_blocks_image_text\` (\`video_id\`);`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_image_text_locales\` ADD \`secondary_label\` text;`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_columns\` ADD \`design_heading_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_columns\` ADD \`design_heading_font\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_columns\` ADD \`design_text_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_columns\` ADD \`design_align\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_columns\` ADD \`design_background\` text;`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_columns\` ADD \`design_frame\` text DEFAULT 'none';`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_columns\` ADD \`design_padding_top\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_columns\` ADD \`design_padding_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_columns\` ADD \`design_margin_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_columns\` ADD \`design_width\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_rich_text\` ADD \`design_heading_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_rich_text\` ADD \`design_heading_font\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_rich_text\` ADD \`design_text_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_rich_text\` ADD \`design_align\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_rich_text\` ADD \`design_background\` text;`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_rich_text\` ADD \`design_frame\` text DEFAULT 'none';`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_rich_text\` ADD \`design_padding_top\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_rich_text\` ADD \`design_padding_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_rich_text\` ADD \`design_margin_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_rich_text\` ADD \`design_width\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_video\` ADD \`design_heading_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_video\` ADD \`design_heading_font\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_video\` ADD \`design_text_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_video\` ADD \`design_align\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_video\` ADD \`design_background\` text;`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_video\` ADD \`design_frame\` text DEFAULT 'none';`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_video\` ADD \`design_padding_top\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_video\` ADD \`design_padding_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_video\` ADD \`design_margin_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_video\` ADD \`design_width\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_gallery\` ADD \`columns\` text DEFAULT '3';`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_gallery\` ADD \`design_heading_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_gallery\` ADD \`design_heading_font\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_gallery\` ADD \`design_text_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_gallery\` ADD \`design_align\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_gallery\` ADD \`design_background\` text;`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_gallery\` ADD \`design_frame\` text DEFAULT 'none';`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_gallery\` ADD \`design_padding_top\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_gallery\` ADD \`design_padding_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_gallery\` ADD \`design_margin_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_gallery\` ADD \`design_width\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_testimonials\` ADD \`design_heading_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_testimonials\` ADD \`design_heading_font\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_testimonials\` ADD \`design_text_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_testimonials\` ADD \`design_align\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_testimonials\` ADD \`design_background\` text;`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_testimonials\` ADD \`design_frame\` text DEFAULT 'none';`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_testimonials\` ADD \`design_padding_top\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_testimonials\` ADD \`design_padding_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_testimonials\` ADD \`design_margin_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_testimonials\` ADD \`design_width\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_logo_strip\` ADD \`design_heading_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_logo_strip\` ADD \`design_heading_font\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_logo_strip\` ADD \`design_text_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_logo_strip\` ADD \`design_align\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_logo_strip\` ADD \`design_background\` text;`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_logo_strip\` ADD \`design_frame\` text DEFAULT 'none';`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_logo_strip\` ADD \`design_padding_top\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_logo_strip\` ADD \`design_padding_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_logo_strip\` ADD \`design_margin_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_logo_strip\` ADD \`design_width\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_faq\` ADD \`design_heading_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_faq\` ADD \`design_heading_font\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_faq\` ADD \`design_text_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_faq\` ADD \`design_align\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_faq\` ADD \`design_background\` text;`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_faq\` ADD \`design_frame\` text DEFAULT 'none';`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_faq\` ADD \`design_padding_top\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_faq\` ADD \`design_padding_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_faq\` ADD \`design_margin_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_faq\` ADD \`design_width\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_lead_form\` ADD \`design_heading_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_lead_form\` ADD \`design_heading_font\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_lead_form\` ADD \`design_text_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_lead_form\` ADD \`design_align\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_lead_form\` ADD \`design_background\` text;`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_lead_form\` ADD \`design_frame\` text DEFAULT 'none';`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_lead_form\` ADD \`design_padding_top\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_lead_form\` ADD \`design_padding_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_lead_form\` ADD \`design_margin_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_lead_form\` ADD \`design_width\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_moments_wall\` ADD \`design_heading_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_moments_wall\` ADD \`design_heading_font\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_moments_wall\` ADD \`design_text_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_moments_wall\` ADD \`design_background\` text;`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_moments_wall\` ADD \`design_frame\` text DEFAULT 'none';`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_moments_wall\` ADD \`design_padding_top\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_moments_wall\` ADD \`design_padding_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_moments_wall\` ADD \`design_margin_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_moments_wall\` ADD \`design_width\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_journal_teaser\` ADD \`design_heading_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_journal_teaser\` ADD \`design_heading_font\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_journal_teaser\` ADD \`design_text_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_journal_teaser\` ADD \`design_align\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_journal_teaser\` ADD \`design_background\` text;`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_journal_teaser\` ADD \`design_frame\` text DEFAULT 'none';`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_journal_teaser\` ADD \`design_padding_top\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_journal_teaser\` ADD \`design_padding_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_journal_teaser\` ADD \`design_margin_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_journal_teaser\` ADD \`design_width\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_embed\` ADD \`design_heading_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_embed\` ADD \`design_heading_font\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_embed\` ADD \`design_text_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_embed\` ADD \`design_background\` text;`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_embed\` ADD \`design_frame\` text DEFAULT 'none';`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_embed\` ADD \`design_padding_top\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_embed\` ADD \`design_padding_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_embed\` ADD \`design_margin_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_embed\` ADD \`design_width\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_spacer\` ADD \`design_heading_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_spacer\` ADD \`design_heading_font\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_spacer\` ADD \`design_text_size\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_spacer\` ADD \`design_background\` text;`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_spacer\` ADD \`design_frame\` text DEFAULT 'none';`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_spacer\` ADD \`design_padding_top\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_spacer\` ADD \`design_padding_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_spacer\` ADD \`design_margin_bottom\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_spacer\` ADD \`design_width\` text DEFAULT 'auto';`)
  await db.run(sql`ALTER TABLE \`payload_jobs\` ADD \`meta\` text;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`pages_blocks_sub_heading\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_sub_heading_locales\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_sub_text\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_sub_text_locales\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_sub_image\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_sub_image_locales\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_sub_card\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_sub_card_locales\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_sub_button\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_sub_button_locales\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_sub_video\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_sub_quote\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_sub_quote_locales\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_sub_list_items\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_sub_list_items_locales\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_sub_list\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_sub_gap\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_custom\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_custom_locales\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_slideshow_slides\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_slideshow_slides_locales\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_slideshow\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_slideshow_locales\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_sub_heading\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_sub_heading_locales\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_sub_text\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_sub_text_locales\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_sub_image\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_sub_image_locales\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_sub_card\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_sub_card_locales\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_sub_button\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_sub_button_locales\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_sub_video\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_sub_quote\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_sub_quote_locales\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_sub_list_items\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_sub_list_items_locales\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_sub_list\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_sub_gap\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_custom\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_custom_locales\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_slideshow_slides\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_slideshow_slides_locales\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_slideshow\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_slideshow_locales\`;`)
  await db.run(sql`DROP TABLE \`offers_blocks_sub_heading\`;`)
  await db.run(sql`DROP TABLE \`offers_blocks_sub_heading_locales\`;`)
  await db.run(sql`DROP TABLE \`offers_blocks_sub_text\`;`)
  await db.run(sql`DROP TABLE \`offers_blocks_sub_text_locales\`;`)
  await db.run(sql`DROP TABLE \`offers_blocks_sub_image\`;`)
  await db.run(sql`DROP TABLE \`offers_blocks_sub_image_locales\`;`)
  await db.run(sql`DROP TABLE \`offers_blocks_sub_card\`;`)
  await db.run(sql`DROP TABLE \`offers_blocks_sub_card_locales\`;`)
  await db.run(sql`DROP TABLE \`offers_blocks_sub_button\`;`)
  await db.run(sql`DROP TABLE \`offers_blocks_sub_button_locales\`;`)
  await db.run(sql`DROP TABLE \`offers_blocks_sub_video\`;`)
  await db.run(sql`DROP TABLE \`offers_blocks_sub_quote\`;`)
  await db.run(sql`DROP TABLE \`offers_blocks_sub_quote_locales\`;`)
  await db.run(sql`DROP TABLE \`offers_blocks_sub_list_items\`;`)
  await db.run(sql`DROP TABLE \`offers_blocks_sub_list_items_locales\`;`)
  await db.run(sql`DROP TABLE \`offers_blocks_sub_list\`;`)
  await db.run(sql`DROP TABLE \`offers_blocks_sub_gap\`;`)
  await db.run(sql`DROP TABLE \`offers_blocks_custom\`;`)
  await db.run(sql`DROP TABLE \`offers_blocks_custom_locales\`;`)
  await db.run(sql`DROP TABLE \`offers_blocks_slideshow_slides\`;`)
  await db.run(sql`DROP TABLE \`offers_blocks_slideshow_slides_locales\`;`)
  await db.run(sql`DROP TABLE \`offers_blocks_slideshow\`;`)
  await db.run(sql`DROP TABLE \`offers_blocks_slideshow_locales\`;`)
  await db.run(sql`DROP TABLE \`_offers_v_blocks_sub_heading\`;`)
  await db.run(sql`DROP TABLE \`_offers_v_blocks_sub_heading_locales\`;`)
  await db.run(sql`DROP TABLE \`_offers_v_blocks_sub_text\`;`)
  await db.run(sql`DROP TABLE \`_offers_v_blocks_sub_text_locales\`;`)
  await db.run(sql`DROP TABLE \`_offers_v_blocks_sub_image\`;`)
  await db.run(sql`DROP TABLE \`_offers_v_blocks_sub_image_locales\`;`)
  await db.run(sql`DROP TABLE \`_offers_v_blocks_sub_card\`;`)
  await db.run(sql`DROP TABLE \`_offers_v_blocks_sub_card_locales\`;`)
  await db.run(sql`DROP TABLE \`_offers_v_blocks_sub_button\`;`)
  await db.run(sql`DROP TABLE \`_offers_v_blocks_sub_button_locales\`;`)
  await db.run(sql`DROP TABLE \`_offers_v_blocks_sub_video\`;`)
  await db.run(sql`DROP TABLE \`_offers_v_blocks_sub_quote\`;`)
  await db.run(sql`DROP TABLE \`_offers_v_blocks_sub_quote_locales\`;`)
  await db.run(sql`DROP TABLE \`_offers_v_blocks_sub_list_items\`;`)
  await db.run(sql`DROP TABLE \`_offers_v_blocks_sub_list_items_locales\`;`)
  await db.run(sql`DROP TABLE \`_offers_v_blocks_sub_list\`;`)
  await db.run(sql`DROP TABLE \`_offers_v_blocks_sub_gap\`;`)
  await db.run(sql`DROP TABLE \`_offers_v_blocks_custom\`;`)
  await db.run(sql`DROP TABLE \`_offers_v_blocks_custom_locales\`;`)
  await db.run(sql`DROP TABLE \`_offers_v_blocks_slideshow_slides\`;`)
  await db.run(sql`DROP TABLE \`_offers_v_blocks_slideshow_slides_locales\`;`)
  await db.run(sql`DROP TABLE \`_offers_v_blocks_slideshow\`;`)
  await db.run(sql`DROP TABLE \`_offers_v_blocks_slideshow_locales\`;`)
  await db.run(sql`DROP TABLE \`events_blocks_sub_heading\`;`)
  await db.run(sql`DROP TABLE \`events_blocks_sub_heading_locales\`;`)
  await db.run(sql`DROP TABLE \`events_blocks_sub_text\`;`)
  await db.run(sql`DROP TABLE \`events_blocks_sub_text_locales\`;`)
  await db.run(sql`DROP TABLE \`events_blocks_sub_image\`;`)
  await db.run(sql`DROP TABLE \`events_blocks_sub_image_locales\`;`)
  await db.run(sql`DROP TABLE \`events_blocks_sub_card\`;`)
  await db.run(sql`DROP TABLE \`events_blocks_sub_card_locales\`;`)
  await db.run(sql`DROP TABLE \`events_blocks_sub_button\`;`)
  await db.run(sql`DROP TABLE \`events_blocks_sub_button_locales\`;`)
  await db.run(sql`DROP TABLE \`events_blocks_sub_video\`;`)
  await db.run(sql`DROP TABLE \`events_blocks_sub_quote\`;`)
  await db.run(sql`DROP TABLE \`events_blocks_sub_quote_locales\`;`)
  await db.run(sql`DROP TABLE \`events_blocks_sub_list_items\`;`)
  await db.run(sql`DROP TABLE \`events_blocks_sub_list_items_locales\`;`)
  await db.run(sql`DROP TABLE \`events_blocks_sub_list\`;`)
  await db.run(sql`DROP TABLE \`events_blocks_sub_gap\`;`)
  await db.run(sql`DROP TABLE \`events_blocks_custom\`;`)
  await db.run(sql`DROP TABLE \`events_blocks_custom_locales\`;`)
  await db.run(sql`DROP TABLE \`events_blocks_slideshow_slides\`;`)
  await db.run(sql`DROP TABLE \`events_blocks_slideshow_slides_locales\`;`)
  await db.run(sql`DROP TABLE \`events_blocks_slideshow\`;`)
  await db.run(sql`DROP TABLE \`events_blocks_slideshow_locales\`;`)
  await db.run(sql`DROP TABLE \`_events_v_blocks_sub_heading\`;`)
  await db.run(sql`DROP TABLE \`_events_v_blocks_sub_heading_locales\`;`)
  await db.run(sql`DROP TABLE \`_events_v_blocks_sub_text\`;`)
  await db.run(sql`DROP TABLE \`_events_v_blocks_sub_text_locales\`;`)
  await db.run(sql`DROP TABLE \`_events_v_blocks_sub_image\`;`)
  await db.run(sql`DROP TABLE \`_events_v_blocks_sub_image_locales\`;`)
  await db.run(sql`DROP TABLE \`_events_v_blocks_sub_card\`;`)
  await db.run(sql`DROP TABLE \`_events_v_blocks_sub_card_locales\`;`)
  await db.run(sql`DROP TABLE \`_events_v_blocks_sub_button\`;`)
  await db.run(sql`DROP TABLE \`_events_v_blocks_sub_button_locales\`;`)
  await db.run(sql`DROP TABLE \`_events_v_blocks_sub_video\`;`)
  await db.run(sql`DROP TABLE \`_events_v_blocks_sub_quote\`;`)
  await db.run(sql`DROP TABLE \`_events_v_blocks_sub_quote_locales\`;`)
  await db.run(sql`DROP TABLE \`_events_v_blocks_sub_list_items\`;`)
  await db.run(sql`DROP TABLE \`_events_v_blocks_sub_list_items_locales\`;`)
  await db.run(sql`DROP TABLE \`_events_v_blocks_sub_list\`;`)
  await db.run(sql`DROP TABLE \`_events_v_blocks_sub_gap\`;`)
  await db.run(sql`DROP TABLE \`_events_v_blocks_custom\`;`)
  await db.run(sql`DROP TABLE \`_events_v_blocks_custom_locales\`;`)
  await db.run(sql`DROP TABLE \`_events_v_blocks_slideshow_slides\`;`)
  await db.run(sql`DROP TABLE \`_events_v_blocks_slideshow_slides_locales\`;`)
  await db.run(sql`DROP TABLE \`_events_v_blocks_slideshow\`;`)
  await db.run(sql`DROP TABLE \`_events_v_blocks_slideshow_locales\`;`)
  await db.run(sql`DROP TABLE \`posts_blocks_h3\`;`)
  await db.run(sql`DROP TABLE \`posts_blocks_h3_locales\`;`)
  await db.run(sql`DROP TABLE \`posts_blocks_image\`;`)
  await db.run(sql`DROP TABLE \`posts_blocks_image_locales\`;`)
  await db.run(sql`DROP TABLE \`posts_blocks_gallery\`;`)
  await db.run(sql`DROP TABLE \`posts_blocks_gallery_locales\`;`)
  await db.run(sql`DROP TABLE \`posts_blocks_video\`;`)
  await db.run(sql`DROP TABLE \`posts_blocks_video_locales\`;`)
  await db.run(sql`DROP TABLE \`posts_blocks_image_text\`;`)
  await db.run(sql`DROP TABLE \`posts_blocks_image_text_locales\`;`)
  await db.run(sql`DROP TABLE \`posts_blocks_quote\`;`)
  await db.run(sql`DROP TABLE \`posts_blocks_quote_locales\`;`)
  await db.run(sql`DROP TABLE \`posts_blocks_offer\`;`)
  await db.run(sql`DROP TABLE \`posts_blocks_divider\`;`)
  await db.run(sql`DROP TABLE \`posts_rels\`;`)
  await db.run(sql`DROP TABLE \`_posts_v_blocks_h3\`;`)
  await db.run(sql`DROP TABLE \`_posts_v_blocks_h3_locales\`;`)
  await db.run(sql`DROP TABLE \`_posts_v_blocks_image\`;`)
  await db.run(sql`DROP TABLE \`_posts_v_blocks_image_locales\`;`)
  await db.run(sql`DROP TABLE \`_posts_v_blocks_gallery\`;`)
  await db.run(sql`DROP TABLE \`_posts_v_blocks_gallery_locales\`;`)
  await db.run(sql`DROP TABLE \`_posts_v_blocks_video\`;`)
  await db.run(sql`DROP TABLE \`_posts_v_blocks_video_locales\`;`)
  await db.run(sql`DROP TABLE \`_posts_v_blocks_image_text\`;`)
  await db.run(sql`DROP TABLE \`_posts_v_blocks_image_text_locales\`;`)
  await db.run(sql`DROP TABLE \`_posts_v_blocks_quote\`;`)
  await db.run(sql`DROP TABLE \`_posts_v_blocks_quote_locales\`;`)
  await db.run(sql`DROP TABLE \`_posts_v_blocks_offer\`;`)
  await db.run(sql`DROP TABLE \`_posts_v_blocks_divider\`;`)
  await db.run(sql`DROP TABLE \`_posts_v_rels\`;`)
  await db.run(sql`DROP TABLE \`worlds_blocks_sub_heading\`;`)
  await db.run(sql`DROP TABLE \`worlds_blocks_sub_heading_locales\`;`)
  await db.run(sql`DROP TABLE \`worlds_blocks_sub_text\`;`)
  await db.run(sql`DROP TABLE \`worlds_blocks_sub_text_locales\`;`)
  await db.run(sql`DROP TABLE \`worlds_blocks_sub_image\`;`)
  await db.run(sql`DROP TABLE \`worlds_blocks_sub_image_locales\`;`)
  await db.run(sql`DROP TABLE \`worlds_blocks_sub_card\`;`)
  await db.run(sql`DROP TABLE \`worlds_blocks_sub_card_locales\`;`)
  await db.run(sql`DROP TABLE \`worlds_blocks_sub_button\`;`)
  await db.run(sql`DROP TABLE \`worlds_blocks_sub_button_locales\`;`)
  await db.run(sql`DROP TABLE \`worlds_blocks_sub_video\`;`)
  await db.run(sql`DROP TABLE \`worlds_blocks_sub_quote\`;`)
  await db.run(sql`DROP TABLE \`worlds_blocks_sub_quote_locales\`;`)
  await db.run(sql`DROP TABLE \`worlds_blocks_sub_list_items\`;`)
  await db.run(sql`DROP TABLE \`worlds_blocks_sub_list_items_locales\`;`)
  await db.run(sql`DROP TABLE \`worlds_blocks_sub_list\`;`)
  await db.run(sql`DROP TABLE \`worlds_blocks_sub_gap\`;`)
  await db.run(sql`DROP TABLE \`worlds_blocks_custom\`;`)
  await db.run(sql`DROP TABLE \`worlds_blocks_custom_locales\`;`)
  await db.run(sql`DROP TABLE \`worlds_blocks_slideshow_slides\`;`)
  await db.run(sql`DROP TABLE \`worlds_blocks_slideshow_slides_locales\`;`)
  await db.run(sql`DROP TABLE \`worlds_blocks_slideshow\`;`)
  await db.run(sql`DROP TABLE \`worlds_blocks_slideshow_locales\`;`)
  await db.run(sql`DROP TABLE \`sections_blocks_sub_heading\`;`)
  await db.run(sql`DROP TABLE \`sections_blocks_sub_heading_locales\`;`)
  await db.run(sql`DROP TABLE \`sections_blocks_sub_text\`;`)
  await db.run(sql`DROP TABLE \`sections_blocks_sub_text_locales\`;`)
  await db.run(sql`DROP TABLE \`sections_blocks_sub_image\`;`)
  await db.run(sql`DROP TABLE \`sections_blocks_sub_image_locales\`;`)
  await db.run(sql`DROP TABLE \`sections_blocks_sub_card\`;`)
  await db.run(sql`DROP TABLE \`sections_blocks_sub_card_locales\`;`)
  await db.run(sql`DROP TABLE \`sections_blocks_sub_button\`;`)
  await db.run(sql`DROP TABLE \`sections_blocks_sub_button_locales\`;`)
  await db.run(sql`DROP TABLE \`sections_blocks_sub_video\`;`)
  await db.run(sql`DROP TABLE \`sections_blocks_sub_quote\`;`)
  await db.run(sql`DROP TABLE \`sections_blocks_sub_quote_locales\`;`)
  await db.run(sql`DROP TABLE \`sections_blocks_sub_list_items\`;`)
  await db.run(sql`DROP TABLE \`sections_blocks_sub_list_items_locales\`;`)
  await db.run(sql`DROP TABLE \`sections_blocks_sub_list\`;`)
  await db.run(sql`DROP TABLE \`sections_blocks_sub_gap\`;`)
  await db.run(sql`DROP TABLE \`sections_blocks_custom\`;`)
  await db.run(sql`DROP TABLE \`sections_blocks_custom_locales\`;`)
  await db.run(sql`DROP TABLE \`sections_blocks_slideshow_slides\`;`)
  await db.run(sql`DROP TABLE \`sections_blocks_slideshow_slides_locales\`;`)
  await db.run(sql`DROP TABLE \`sections_blocks_slideshow\`;`)
  await db.run(sql`DROP TABLE \`sections_blocks_slideshow_locales\`;`)
  await db.run(sql`DROP TABLE \`_sections_v_blocks_sub_heading\`;`)
  await db.run(sql`DROP TABLE \`_sections_v_blocks_sub_heading_locales\`;`)
  await db.run(sql`DROP TABLE \`_sections_v_blocks_sub_text\`;`)
  await db.run(sql`DROP TABLE \`_sections_v_blocks_sub_text_locales\`;`)
  await db.run(sql`DROP TABLE \`_sections_v_blocks_sub_image\`;`)
  await db.run(sql`DROP TABLE \`_sections_v_blocks_sub_image_locales\`;`)
  await db.run(sql`DROP TABLE \`_sections_v_blocks_sub_card\`;`)
  await db.run(sql`DROP TABLE \`_sections_v_blocks_sub_card_locales\`;`)
  await db.run(sql`DROP TABLE \`_sections_v_blocks_sub_button\`;`)
  await db.run(sql`DROP TABLE \`_sections_v_blocks_sub_button_locales\`;`)
  await db.run(sql`DROP TABLE \`_sections_v_blocks_sub_video\`;`)
  await db.run(sql`DROP TABLE \`_sections_v_blocks_sub_quote\`;`)
  await db.run(sql`DROP TABLE \`_sections_v_blocks_sub_quote_locales\`;`)
  await db.run(sql`DROP TABLE \`_sections_v_blocks_sub_list_items\`;`)
  await db.run(sql`DROP TABLE \`_sections_v_blocks_sub_list_items_locales\`;`)
  await db.run(sql`DROP TABLE \`_sections_v_blocks_sub_list\`;`)
  await db.run(sql`DROP TABLE \`_sections_v_blocks_sub_gap\`;`)
  await db.run(sql`DROP TABLE \`_sections_v_blocks_custom\`;`)
  await db.run(sql`DROP TABLE \`_sections_v_blocks_custom_locales\`;`)
  await db.run(sql`DROP TABLE \`_sections_v_blocks_slideshow_slides\`;`)
  await db.run(sql`DROP TABLE \`_sections_v_blocks_slideshow_slides_locales\`;`)
  await db.run(sql`DROP TABLE \`_sections_v_blocks_slideshow\`;`)
  await db.run(sql`DROP TABLE \`_sections_v_blocks_slideshow_locales\`;`)
  await db.run(sql`DROP TABLE \`payload_jobs_stats\`;`)
  await db.run(sql`PRAGMA foreign_keys=OFF;`)
  await db.run(sql`CREATE TABLE \`__new_pages_blocks_image_text\` (
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
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_pages_blocks_image_text\`("_order", "_parent_id", "_path", "id", "image_id", "image_side", "tone", "cta_href", "display_hidden", "display_show_on", "display_anchor", "display_show_from", "display_show_until", "block_name") SELECT "_order", "_parent_id", "_path", "id", "image_id", "image_side", "tone", "cta_href", "display_hidden", "display_show_on", "display_anchor", "display_show_from", "display_show_until", "block_name" FROM \`pages_blocks_image_text\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_image_text\`;`)
  await db.run(sql`ALTER TABLE \`__new_pages_blocks_image_text\` RENAME TO \`pages_blocks_image_text\`;`)
  await db.run(sql`PRAGMA foreign_keys=ON;`)
  await db.run(sql`CREATE INDEX \`pages_blocks_image_text_order_idx\` ON \`pages_blocks_image_text\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_image_text_parent_id_idx\` ON \`pages_blocks_image_text\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_image_text_path_idx\` ON \`pages_blocks_image_text\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_image_text_image_idx\` ON \`pages_blocks_image_text\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`__new__pages_v_blocks_image_text\` (
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
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new__pages_v_blocks_image_text\`("_order", "_parent_id", "_path", "id", "image_id", "image_side", "tone", "cta_href", "display_hidden", "display_show_on", "display_anchor", "display_show_from", "display_show_until", "_uuid", "block_name") SELECT "_order", "_parent_id", "_path", "id", "image_id", "image_side", "tone", "cta_href", "display_hidden", "display_show_on", "display_anchor", "display_show_from", "display_show_until", "_uuid", "block_name" FROM \`_pages_v_blocks_image_text\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_image_text\`;`)
  await db.run(sql`ALTER TABLE \`__new__pages_v_blocks_image_text\` RENAME TO \`_pages_v_blocks_image_text\`;`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_image_text_order_idx\` ON \`_pages_v_blocks_image_text\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_image_text_parent_id_idx\` ON \`_pages_v_blocks_image_text\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_image_text_path_idx\` ON \`_pages_v_blocks_image_text\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_image_text_image_idx\` ON \`_pages_v_blocks_image_text\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`__new_offers_blocks_image_text\` (
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
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`offers\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_offers_blocks_image_text\`("_order", "_parent_id", "_path", "id", "image_id", "image_side", "tone", "cta_href", "display_hidden", "display_show_on", "display_anchor", "display_show_from", "display_show_until", "block_name") SELECT "_order", "_parent_id", "_path", "id", "image_id", "image_side", "tone", "cta_href", "display_hidden", "display_show_on", "display_anchor", "display_show_from", "display_show_until", "block_name" FROM \`offers_blocks_image_text\`;`)
  await db.run(sql`DROP TABLE \`offers_blocks_image_text\`;`)
  await db.run(sql`ALTER TABLE \`__new_offers_blocks_image_text\` RENAME TO \`offers_blocks_image_text\`;`)
  await db.run(sql`CREATE INDEX \`offers_blocks_image_text_order_idx\` ON \`offers_blocks_image_text\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`offers_blocks_image_text_parent_id_idx\` ON \`offers_blocks_image_text\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`offers_blocks_image_text_path_idx\` ON \`offers_blocks_image_text\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`offers_blocks_image_text_image_idx\` ON \`offers_blocks_image_text\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`__new__offers_v_blocks_image_text\` (
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
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_offers_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new__offers_v_blocks_image_text\`("_order", "_parent_id", "_path", "id", "image_id", "image_side", "tone", "cta_href", "display_hidden", "display_show_on", "display_anchor", "display_show_from", "display_show_until", "_uuid", "block_name") SELECT "_order", "_parent_id", "_path", "id", "image_id", "image_side", "tone", "cta_href", "display_hidden", "display_show_on", "display_anchor", "display_show_from", "display_show_until", "_uuid", "block_name" FROM \`_offers_v_blocks_image_text\`;`)
  await db.run(sql`DROP TABLE \`_offers_v_blocks_image_text\`;`)
  await db.run(sql`ALTER TABLE \`__new__offers_v_blocks_image_text\` RENAME TO \`_offers_v_blocks_image_text\`;`)
  await db.run(sql`CREATE INDEX \`_offers_v_blocks_image_text_order_idx\` ON \`_offers_v_blocks_image_text\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_offers_v_blocks_image_text_parent_id_idx\` ON \`_offers_v_blocks_image_text\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_offers_v_blocks_image_text_path_idx\` ON \`_offers_v_blocks_image_text\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`_offers_v_blocks_image_text_image_idx\` ON \`_offers_v_blocks_image_text\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`__new_events_blocks_image_text\` (
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
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`events\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_events_blocks_image_text\`("_order", "_parent_id", "_path", "id", "image_id", "image_side", "tone", "cta_href", "display_hidden", "display_show_on", "display_anchor", "display_show_from", "display_show_until", "block_name") SELECT "_order", "_parent_id", "_path", "id", "image_id", "image_side", "tone", "cta_href", "display_hidden", "display_show_on", "display_anchor", "display_show_from", "display_show_until", "block_name" FROM \`events_blocks_image_text\`;`)
  await db.run(sql`DROP TABLE \`events_blocks_image_text\`;`)
  await db.run(sql`ALTER TABLE \`__new_events_blocks_image_text\` RENAME TO \`events_blocks_image_text\`;`)
  await db.run(sql`CREATE INDEX \`events_blocks_image_text_order_idx\` ON \`events_blocks_image_text\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`events_blocks_image_text_parent_id_idx\` ON \`events_blocks_image_text\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`events_blocks_image_text_path_idx\` ON \`events_blocks_image_text\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`events_blocks_image_text_image_idx\` ON \`events_blocks_image_text\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`__new__events_v_blocks_image_text\` (
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
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_events_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new__events_v_blocks_image_text\`("_order", "_parent_id", "_path", "id", "image_id", "image_side", "tone", "cta_href", "display_hidden", "display_show_on", "display_anchor", "display_show_from", "display_show_until", "_uuid", "block_name") SELECT "_order", "_parent_id", "_path", "id", "image_id", "image_side", "tone", "cta_href", "display_hidden", "display_show_on", "display_anchor", "display_show_from", "display_show_until", "_uuid", "block_name" FROM \`_events_v_blocks_image_text\`;`)
  await db.run(sql`DROP TABLE \`_events_v_blocks_image_text\`;`)
  await db.run(sql`ALTER TABLE \`__new__events_v_blocks_image_text\` RENAME TO \`_events_v_blocks_image_text\`;`)
  await db.run(sql`CREATE INDEX \`_events_v_blocks_image_text_order_idx\` ON \`_events_v_blocks_image_text\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_events_v_blocks_image_text_parent_id_idx\` ON \`_events_v_blocks_image_text\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_events_v_blocks_image_text_path_idx\` ON \`_events_v_blocks_image_text\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`_events_v_blocks_image_text_image_idx\` ON \`_events_v_blocks_image_text\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`__new_worlds_blocks_image_text\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`image_id\` integer NOT NULL,
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
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`worlds\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_worlds_blocks_image_text\`("_order", "_parent_id", "_path", "id", "image_id", "image_side", "tone", "cta_href", "display_hidden", "display_show_on", "display_anchor", "display_show_from", "display_show_until", "block_name") SELECT "_order", "_parent_id", "_path", "id", "image_id", "image_side", "tone", "cta_href", "display_hidden", "display_show_on", "display_anchor", "display_show_from", "display_show_until", "block_name" FROM \`worlds_blocks_image_text\`;`)
  await db.run(sql`DROP TABLE \`worlds_blocks_image_text\`;`)
  await db.run(sql`ALTER TABLE \`__new_worlds_blocks_image_text\` RENAME TO \`worlds_blocks_image_text\`;`)
  await db.run(sql`CREATE INDEX \`worlds_blocks_image_text_order_idx\` ON \`worlds_blocks_image_text\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`worlds_blocks_image_text_parent_id_idx\` ON \`worlds_blocks_image_text\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`worlds_blocks_image_text_path_idx\` ON \`worlds_blocks_image_text\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`worlds_blocks_image_text_image_idx\` ON \`worlds_blocks_image_text\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`__new_sections_blocks_image_text\` (
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
  await db.run(sql`INSERT INTO \`__new_sections_blocks_image_text\`("_order", "_parent_id", "_path", "id", "image_id", "image_side", "tone", "cta_href", "display_hidden", "display_show_on", "display_anchor", "display_show_from", "display_show_until", "block_name") SELECT "_order", "_parent_id", "_path", "id", "image_id", "image_side", "tone", "cta_href", "display_hidden", "display_show_on", "display_anchor", "display_show_from", "display_show_until", "block_name" FROM \`sections_blocks_image_text\`;`)
  await db.run(sql`DROP TABLE \`sections_blocks_image_text\`;`)
  await db.run(sql`ALTER TABLE \`__new_sections_blocks_image_text\` RENAME TO \`sections_blocks_image_text\`;`)
  await db.run(sql`CREATE INDEX \`sections_blocks_image_text_order_idx\` ON \`sections_blocks_image_text\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`sections_blocks_image_text_parent_id_idx\` ON \`sections_blocks_image_text\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`sections_blocks_image_text_path_idx\` ON \`sections_blocks_image_text\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`sections_blocks_image_text_image_idx\` ON \`sections_blocks_image_text\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`__new__sections_v_blocks_image_text\` (
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
  await db.run(sql`INSERT INTO \`__new__sections_v_blocks_image_text\`("_order", "_parent_id", "_path", "id", "image_id", "image_side", "tone", "cta_href", "display_hidden", "display_show_on", "display_anchor", "display_show_from", "display_show_until", "_uuid", "block_name") SELECT "_order", "_parent_id", "_path", "id", "image_id", "image_side", "tone", "cta_href", "display_hidden", "display_show_on", "display_anchor", "display_show_from", "display_show_until", "_uuid", "block_name" FROM \`_sections_v_blocks_image_text\`;`)
  await db.run(sql`DROP TABLE \`_sections_v_blocks_image_text\`;`)
  await db.run(sql`ALTER TABLE \`__new__sections_v_blocks_image_text\` RENAME TO \`_sections_v_blocks_image_text\`;`)
  await db.run(sql`CREATE INDEX \`_sections_v_blocks_image_text_order_idx\` ON \`_sections_v_blocks_image_text\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_sections_v_blocks_image_text_parent_id_idx\` ON \`_sections_v_blocks_image_text\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_sections_v_blocks_image_text_path_idx\` ON \`_sections_v_blocks_image_text\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`_sections_v_blocks_image_text_image_idx\` ON \`_sections_v_blocks_image_text\` (\`image_id\`);`)
  await db.run(sql`ALTER TABLE \`pages_blocks_hero\` DROP COLUMN \`design_heading_size\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_hero\` DROP COLUMN \`design_heading_font\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_hero\` DROP COLUMN \`design_text_size\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_hero\` DROP COLUMN \`design_background\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_hero\` DROP COLUMN \`design_frame\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_hero\` DROP COLUMN \`design_padding_top\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_hero\` DROP COLUMN \`design_padding_bottom\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_hero\` DROP COLUMN \`design_margin_bottom\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_hero\` DROP COLUMN \`design_width\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_ticker\` DROP COLUMN \`design_heading_size\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_ticker\` DROP COLUMN \`design_heading_font\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_ticker\` DROP COLUMN \`design_text_size\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_ticker\` DROP COLUMN \`design_background\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_ticker\` DROP COLUMN \`design_frame\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_ticker\` DROP COLUMN \`design_padding_top\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_ticker\` DROP COLUMN \`design_padding_bottom\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_ticker\` DROP COLUMN \`design_margin_bottom\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_ticker\` DROP COLUMN \`design_width\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_offer_spotlight\` DROP COLUMN \`design_heading_size\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_offer_spotlight\` DROP COLUMN \`design_heading_font\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_offer_spotlight\` DROP COLUMN \`design_text_size\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_offer_spotlight\` DROP COLUMN \`design_align\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_offer_spotlight\` DROP COLUMN \`design_background\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_offer_spotlight\` DROP COLUMN \`design_frame\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_offer_spotlight\` DROP COLUMN \`design_padding_top\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_offer_spotlight\` DROP COLUMN \`design_padding_bottom\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_offer_spotlight\` DROP COLUMN \`design_margin_bottom\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_offer_spotlight\` DROP COLUMN \`design_width\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_countdown\` DROP COLUMN \`design_heading_size\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_countdown\` DROP COLUMN \`design_heading_font\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_countdown\` DROP COLUMN \`design_text_size\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_countdown\` DROP COLUMN \`design_align\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_countdown\` DROP COLUMN \`design_background\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_countdown\` DROP COLUMN \`design_frame\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_countdown\` DROP COLUMN \`design_padding_top\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_countdown\` DROP COLUMN \`design_padding_bottom\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_countdown\` DROP COLUMN \`design_margin_bottom\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_countdown\` DROP COLUMN \`design_width\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_cta_band\` DROP COLUMN \`design_heading_size\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_cta_band\` DROP COLUMN \`design_heading_font\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_cta_band\` DROP COLUMN \`design_text_size\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_cta_band\` DROP COLUMN \`design_align\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_cta_band\` DROP COLUMN \`design_background\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_cta_band\` DROP COLUMN \`design_frame\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_cta_band\` DROP COLUMN \`design_padding_top\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_cta_band\` DROP COLUMN \`design_padding_bottom\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_cta_band\` DROP COLUMN \`design_margin_bottom\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_cta_band\` DROP COLUMN \`design_width\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_ticket_cards\` DROP COLUMN \`design_heading_size\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_ticket_cards\` DROP COLUMN \`design_heading_font\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_ticket_cards\` DROP COLUMN \`design_text_size\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_ticket_cards\` DROP COLUMN \`design_background\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_ticket_cards\` DROP COLUMN \`design_frame\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_ticket_cards\` DROP COLUMN \`design_padding_top\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_ticket_cards\` DROP COLUMN \`design_padding_bottom\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_ticket_cards\` DROP COLUMN \`design_margin_bottom\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_ticket_cards\` DROP COLUMN \`design_width\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_offer_grid\` DROP COLUMN \`design_heading_size\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_offer_grid\` DROP COLUMN \`design_heading_font\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_offer_grid\` DROP COLUMN \`design_text_size\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_offer_grid\` DROP COLUMN \`design_background\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_offer_grid\` DROP COLUMN \`design_frame\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_offer_grid\` DROP COLUMN \`design_padding_top\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_offer_grid\` DROP COLUMN \`design_padding_bottom\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_offer_grid\` DROP COLUMN \`design_margin_bottom\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_offer_grid\` DROP COLUMN \`design_width\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_worlds_grid\` DROP COLUMN \`design_heading_size\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_worlds_grid\` DROP COLUMN \`design_heading_font\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_worlds_grid\` DROP COLUMN \`design_text_size\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_worlds_grid\` DROP COLUMN \`design_background\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_worlds_grid\` DROP COLUMN \`design_frame\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_worlds_grid\` DROP COLUMN \`design_padding_top\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_worlds_grid\` DROP COLUMN \`design_padding_bottom\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_worlds_grid\` DROP COLUMN \`design_margin_bottom\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_worlds_grid\` DROP COLUMN \`design_width\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_rides_list\` DROP COLUMN \`design_heading_size\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_rides_list\` DROP COLUMN \`design_heading_font\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_rides_list\` DROP COLUMN \`design_text_size\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_rides_list\` DROP COLUMN \`design_background\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_rides_list\` DROP COLUMN \`design_frame\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_rides_list\` DROP COLUMN \`design_padding_top\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_rides_list\` DROP COLUMN \`design_padding_bottom\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_rides_list\` DROP COLUMN \`design_margin_bottom\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_rides_list\` DROP COLUMN \`design_width\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_events_rail\` DROP COLUMN \`design_heading_size\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_events_rail\` DROP COLUMN \`design_heading_font\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_events_rail\` DROP COLUMN \`design_text_size\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_events_rail\` DROP COLUMN \`design_background\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_events_rail\` DROP COLUMN \`design_frame\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_events_rail\` DROP COLUMN \`design_padding_top\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_events_rail\` DROP COLUMN \`design_padding_bottom\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_events_rail\` DROP COLUMN \`design_margin_bottom\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_events_rail\` DROP COLUMN \`design_width\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_today_status\` DROP COLUMN \`design_heading_size\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_today_status\` DROP COLUMN \`design_heading_font\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_today_status\` DROP COLUMN \`design_text_size\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_today_status\` DROP COLUMN \`design_background\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_today_status\` DROP COLUMN \`design_frame\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_today_status\` DROP COLUMN \`design_padding_top\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_today_status\` DROP COLUMN \`design_padding_bottom\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_today_status\` DROP COLUMN \`design_margin_bottom\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_today_status\` DROP COLUMN \`design_width\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_crew_planner\` DROP COLUMN \`design_heading_size\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_crew_planner\` DROP COLUMN \`design_heading_font\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_crew_planner\` DROP COLUMN \`design_text_size\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_crew_planner\` DROP COLUMN \`design_background\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_crew_planner\` DROP COLUMN \`design_frame\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_crew_planner\` DROP COLUMN \`design_padding_top\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_crew_planner\` DROP COLUMN \`design_padding_bottom\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_crew_planner\` DROP COLUMN \`design_margin_bottom\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_crew_planner\` DROP COLUMN \`design_width\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_venues_grid\` DROP COLUMN \`design_heading_size\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_venues_grid\` DROP COLUMN \`design_heading_font\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_venues_grid\` DROP COLUMN \`design_text_size\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_venues_grid\` DROP COLUMN \`design_background\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_venues_grid\` DROP COLUMN \`design_frame\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_venues_grid\` DROP COLUMN \`design_padding_top\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_venues_grid\` DROP COLUMN \`design_padding_bottom\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_venues_grid\` DROP COLUMN \`design_margin_bottom\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_venues_grid\` DROP COLUMN \`design_width\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_map\` DROP COLUMN \`design_heading_size\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_map\` DROP COLUMN \`design_heading_font\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_map\` DROP COLUMN \`design_text_size\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_map\` DROP COLUMN \`design_align\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_map\` DROP COLUMN \`design_background\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_map\` DROP COLUMN \`design_frame\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_map\` DROP COLUMN \`design_padding_top\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_map\` DROP COLUMN \`design_padding_bottom\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_map\` DROP COLUMN \`design_margin_bottom\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_map\` DROP COLUMN \`design_width\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_stats\` DROP COLUMN \`design_heading_size\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_stats\` DROP COLUMN \`design_heading_font\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_stats\` DROP COLUMN \`design_text_size\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_stats\` DROP COLUMN \`design_align\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_stats\` DROP COLUMN \`design_background\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_stats\` DROP COLUMN \`design_frame\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_stats\` DROP COLUMN \`design_padding_top\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_stats\` DROP COLUMN \`design_padding_bottom\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_stats\` DROP COLUMN \`design_margin_bottom\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_stats\` DROP COLUMN \`design_width\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_image_text_locales\` DROP COLUMN \`secondary_label\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_columns\` DROP COLUMN \`design_heading_size\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_columns\` DROP COLUMN \`design_heading_font\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_columns\` DROP COLUMN \`design_text_size\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_columns\` DROP COLUMN \`design_align\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_columns\` DROP COLUMN \`design_background\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_columns\` DROP COLUMN \`design_frame\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_columns\` DROP COLUMN \`design_padding_top\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_columns\` DROP COLUMN \`design_padding_bottom\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_columns\` DROP COLUMN \`design_margin_bottom\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_columns\` DROP COLUMN \`design_width\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_rich_text\` DROP COLUMN \`design_heading_size\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_rich_text\` DROP COLUMN \`design_heading_font\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_rich_text\` DROP COLUMN \`design_text_size\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_rich_text\` DROP COLUMN \`design_align\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_rich_text\` DROP COLUMN \`design_background\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_rich_text\` DROP COLUMN \`design_frame\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_rich_text\` DROP COLUMN \`design_padding_top\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_rich_text\` DROP COLUMN \`design_padding_bottom\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_rich_text\` DROP COLUMN \`design_margin_bottom\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_rich_text\` DROP COLUMN \`design_width\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_video\` DROP COLUMN \`design_heading_size\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_video\` DROP COLUMN \`design_heading_font\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_video\` DROP COLUMN \`design_text_size\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_video\` DROP COLUMN \`design_align\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_video\` DROP COLUMN \`design_background\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_video\` DROP COLUMN \`design_frame\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_video\` DROP COLUMN \`design_padding_top\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_video\` DROP COLUMN \`design_padding_bottom\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_video\` DROP COLUMN \`design_margin_bottom\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_video\` DROP COLUMN \`design_width\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_gallery\` DROP COLUMN \`columns\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_gallery\` DROP COLUMN \`design_heading_size\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_gallery\` DROP COLUMN \`design_heading_font\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_gallery\` DROP COLUMN \`design_text_size\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_gallery\` DROP COLUMN \`design_align\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_gallery\` DROP COLUMN \`design_background\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_gallery\` DROP COLUMN \`design_frame\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_gallery\` DROP COLUMN \`design_padding_top\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_gallery\` DROP COLUMN \`design_padding_bottom\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_gallery\` DROP COLUMN \`design_margin_bottom\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_gallery\` DROP COLUMN \`design_width\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_testimonials\` DROP COLUMN \`design_heading_size\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_testimonials\` DROP COLUMN \`design_heading_font\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_testimonials\` DROP COLUMN \`design_text_size\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_testimonials\` DROP COLUMN \`design_align\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_testimonials\` DROP COLUMN \`design_background\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_testimonials\` DROP COLUMN \`design_frame\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_testimonials\` DROP COLUMN \`design_padding_top\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_testimonials\` DROP COLUMN \`design_padding_bottom\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_testimonials\` DROP COLUMN \`design_margin_bottom\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_testimonials\` DROP COLUMN \`design_width\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_logo_strip\` DROP COLUMN \`design_heading_size\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_logo_strip\` DROP COLUMN \`design_heading_font\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_logo_strip\` DROP COLUMN \`design_text_size\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_logo_strip\` DROP COLUMN \`design_align\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_logo_strip\` DROP COLUMN \`design_background\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_logo_strip\` DROP COLUMN \`design_frame\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_logo_strip\` DROP COLUMN \`design_padding_top\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_logo_strip\` DROP COLUMN \`design_padding_bottom\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_logo_strip\` DROP COLUMN \`design_margin_bottom\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_logo_strip\` DROP COLUMN \`design_width\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_faq\` DROP COLUMN \`design_heading_size\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_faq\` DROP COLUMN \`design_heading_font\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_faq\` DROP COLUMN \`design_text_size\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_faq\` DROP COLUMN \`design_align\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_faq\` DROP COLUMN \`design_background\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_faq\` DROP COLUMN \`design_frame\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_faq\` DROP COLUMN \`design_padding_top\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_faq\` DROP COLUMN \`design_padding_bottom\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_faq\` DROP COLUMN \`design_margin_bottom\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_faq\` DROP COLUMN \`design_width\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_lead_form\` DROP COLUMN \`design_heading_size\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_lead_form\` DROP COLUMN \`design_heading_font\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_lead_form\` DROP COLUMN \`design_text_size\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_lead_form\` DROP COLUMN \`design_align\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_lead_form\` DROP COLUMN \`design_background\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_lead_form\` DROP COLUMN \`design_frame\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_lead_form\` DROP COLUMN \`design_padding_top\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_lead_form\` DROP COLUMN \`design_padding_bottom\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_lead_form\` DROP COLUMN \`design_margin_bottom\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_lead_form\` DROP COLUMN \`design_width\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_moments_wall\` DROP COLUMN \`design_heading_size\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_moments_wall\` DROP COLUMN \`design_heading_font\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_moments_wall\` DROP COLUMN \`design_text_size\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_moments_wall\` DROP COLUMN \`design_background\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_moments_wall\` DROP COLUMN \`design_frame\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_moments_wall\` DROP COLUMN \`design_padding_top\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_moments_wall\` DROP COLUMN \`design_padding_bottom\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_moments_wall\` DROP COLUMN \`design_margin_bottom\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_moments_wall\` DROP COLUMN \`design_width\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_journal_teaser\` DROP COLUMN \`design_heading_size\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_journal_teaser\` DROP COLUMN \`design_heading_font\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_journal_teaser\` DROP COLUMN \`design_text_size\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_journal_teaser\` DROP COLUMN \`design_align\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_journal_teaser\` DROP COLUMN \`design_background\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_journal_teaser\` DROP COLUMN \`design_frame\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_journal_teaser\` DROP COLUMN \`design_padding_top\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_journal_teaser\` DROP COLUMN \`design_padding_bottom\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_journal_teaser\` DROP COLUMN \`design_margin_bottom\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_journal_teaser\` DROP COLUMN \`design_width\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_embed\` DROP COLUMN \`design_heading_size\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_embed\` DROP COLUMN \`design_heading_font\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_embed\` DROP COLUMN \`design_text_size\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_embed\` DROP COLUMN \`design_background\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_embed\` DROP COLUMN \`design_frame\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_embed\` DROP COLUMN \`design_padding_top\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_embed\` DROP COLUMN \`design_padding_bottom\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_embed\` DROP COLUMN \`design_margin_bottom\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_embed\` DROP COLUMN \`design_width\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_spacer\` DROP COLUMN \`design_heading_size\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_spacer\` DROP COLUMN \`design_heading_font\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_spacer\` DROP COLUMN \`design_text_size\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_spacer\` DROP COLUMN \`design_background\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_spacer\` DROP COLUMN \`design_frame\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_spacer\` DROP COLUMN \`design_padding_top\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_spacer\` DROP COLUMN \`design_padding_bottom\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_spacer\` DROP COLUMN \`design_margin_bottom\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_spacer\` DROP COLUMN \`design_width\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_reusable\` DROP COLUMN \`design_heading_size\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_reusable\` DROP COLUMN \`design_heading_font\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_reusable\` DROP COLUMN \`design_text_size\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_reusable\` DROP COLUMN \`design_background\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_reusable\` DROP COLUMN \`design_frame\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_reusable\` DROP COLUMN \`design_padding_top\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_reusable\` DROP COLUMN \`design_padding_bottom\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_reusable\` DROP COLUMN \`design_margin_bottom\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_reusable\` DROP COLUMN \`design_width\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_hero\` DROP COLUMN \`design_heading_size\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_hero\` DROP COLUMN \`design_heading_font\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_hero\` DROP COLUMN \`design_text_size\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_hero\` DROP COLUMN \`design_background\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_hero\` DROP COLUMN \`design_frame\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_hero\` DROP COLUMN \`design_padding_top\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_hero\` DROP COLUMN \`design_padding_bottom\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_hero\` DROP COLUMN \`design_margin_bottom\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_hero\` DROP COLUMN \`design_width\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_ticker\` DROP COLUMN \`design_heading_size\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_ticker\` DROP COLUMN \`design_heading_font\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_ticker\` DROP COLUMN \`design_text_size\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_ticker\` DROP COLUMN \`design_background\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_ticker\` DROP COLUMN \`design_frame\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_ticker\` DROP COLUMN \`design_padding_top\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_ticker\` DROP COLUMN \`design_padding_bottom\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_ticker\` DROP COLUMN \`design_margin_bottom\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_ticker\` DROP COLUMN \`design_width\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_offer_spotlight\` DROP COLUMN \`design_heading_size\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_offer_spotlight\` DROP COLUMN \`design_heading_font\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_offer_spotlight\` DROP COLUMN \`design_text_size\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_offer_spotlight\` DROP COLUMN \`design_align\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_offer_spotlight\` DROP COLUMN \`design_background\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_offer_spotlight\` DROP COLUMN \`design_frame\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_offer_spotlight\` DROP COLUMN \`design_padding_top\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_offer_spotlight\` DROP COLUMN \`design_padding_bottom\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_offer_spotlight\` DROP COLUMN \`design_margin_bottom\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_offer_spotlight\` DROP COLUMN \`design_width\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_countdown\` DROP COLUMN \`design_heading_size\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_countdown\` DROP COLUMN \`design_heading_font\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_countdown\` DROP COLUMN \`design_text_size\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_countdown\` DROP COLUMN \`design_align\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_countdown\` DROP COLUMN \`design_background\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_countdown\` DROP COLUMN \`design_frame\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_countdown\` DROP COLUMN \`design_padding_top\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_countdown\` DROP COLUMN \`design_padding_bottom\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_countdown\` DROP COLUMN \`design_margin_bottom\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_countdown\` DROP COLUMN \`design_width\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_cta_band\` DROP COLUMN \`design_heading_size\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_cta_band\` DROP COLUMN \`design_heading_font\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_cta_band\` DROP COLUMN \`design_text_size\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_cta_band\` DROP COLUMN \`design_align\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_cta_band\` DROP COLUMN \`design_background\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_cta_band\` DROP COLUMN \`design_frame\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_cta_band\` DROP COLUMN \`design_padding_top\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_cta_band\` DROP COLUMN \`design_padding_bottom\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_cta_band\` DROP COLUMN \`design_margin_bottom\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_cta_band\` DROP COLUMN \`design_width\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_ticket_cards\` DROP COLUMN \`design_heading_size\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_ticket_cards\` DROP COLUMN \`design_heading_font\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_ticket_cards\` DROP COLUMN \`design_text_size\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_ticket_cards\` DROP COLUMN \`design_background\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_ticket_cards\` DROP COLUMN \`design_frame\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_ticket_cards\` DROP COLUMN \`design_padding_top\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_ticket_cards\` DROP COLUMN \`design_padding_bottom\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_ticket_cards\` DROP COLUMN \`design_margin_bottom\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_ticket_cards\` DROP COLUMN \`design_width\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_offer_grid\` DROP COLUMN \`design_heading_size\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_offer_grid\` DROP COLUMN \`design_heading_font\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_offer_grid\` DROP COLUMN \`design_text_size\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_offer_grid\` DROP COLUMN \`design_background\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_offer_grid\` DROP COLUMN \`design_frame\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_offer_grid\` DROP COLUMN \`design_padding_top\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_offer_grid\` DROP COLUMN \`design_padding_bottom\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_offer_grid\` DROP COLUMN \`design_margin_bottom\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_offer_grid\` DROP COLUMN \`design_width\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_worlds_grid\` DROP COLUMN \`design_heading_size\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_worlds_grid\` DROP COLUMN \`design_heading_font\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_worlds_grid\` DROP COLUMN \`design_text_size\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_worlds_grid\` DROP COLUMN \`design_background\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_worlds_grid\` DROP COLUMN \`design_frame\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_worlds_grid\` DROP COLUMN \`design_padding_top\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_worlds_grid\` DROP COLUMN \`design_padding_bottom\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_worlds_grid\` DROP COLUMN \`design_margin_bottom\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_worlds_grid\` DROP COLUMN \`design_width\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_rides_list\` DROP COLUMN \`design_heading_size\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_rides_list\` DROP COLUMN \`design_heading_font\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_rides_list\` DROP COLUMN \`design_text_size\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_rides_list\` DROP COLUMN \`design_background\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_rides_list\` DROP COLUMN \`design_frame\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_rides_list\` DROP COLUMN \`design_padding_top\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_rides_list\` DROP COLUMN \`design_padding_bottom\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_rides_list\` DROP COLUMN \`design_margin_bottom\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_rides_list\` DROP COLUMN \`design_width\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_events_rail\` DROP COLUMN \`design_heading_size\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_events_rail\` DROP COLUMN \`design_heading_font\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_events_rail\` DROP COLUMN \`design_text_size\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_events_rail\` DROP COLUMN \`design_background\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_events_rail\` DROP COLUMN \`design_frame\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_events_rail\` DROP COLUMN \`design_padding_top\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_events_rail\` DROP COLUMN \`design_padding_bottom\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_events_rail\` DROP COLUMN \`design_margin_bottom\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_events_rail\` DROP COLUMN \`design_width\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_today_status\` DROP COLUMN \`design_heading_size\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_today_status\` DROP COLUMN \`design_heading_font\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_today_status\` DROP COLUMN \`design_text_size\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_today_status\` DROP COLUMN \`design_background\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_today_status\` DROP COLUMN \`design_frame\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_today_status\` DROP COLUMN \`design_padding_top\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_today_status\` DROP COLUMN \`design_padding_bottom\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_today_status\` DROP COLUMN \`design_margin_bottom\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_today_status\` DROP COLUMN \`design_width\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_crew_planner\` DROP COLUMN \`design_heading_size\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_crew_planner\` DROP COLUMN \`design_heading_font\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_crew_planner\` DROP COLUMN \`design_text_size\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_crew_planner\` DROP COLUMN \`design_background\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_crew_planner\` DROP COLUMN \`design_frame\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_crew_planner\` DROP COLUMN \`design_padding_top\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_crew_planner\` DROP COLUMN \`design_padding_bottom\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_crew_planner\` DROP COLUMN \`design_margin_bottom\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_crew_planner\` DROP COLUMN \`design_width\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_venues_grid\` DROP COLUMN \`design_heading_size\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_venues_grid\` DROP COLUMN \`design_heading_font\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_venues_grid\` DROP COLUMN \`design_text_size\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_venues_grid\` DROP COLUMN \`design_background\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_venues_grid\` DROP COLUMN \`design_frame\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_venues_grid\` DROP COLUMN \`design_padding_top\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_venues_grid\` DROP COLUMN \`design_padding_bottom\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_venues_grid\` DROP COLUMN \`design_margin_bottom\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_venues_grid\` DROP COLUMN \`design_width\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_map\` DROP COLUMN \`design_heading_size\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_map\` DROP COLUMN \`design_heading_font\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_map\` DROP COLUMN \`design_text_size\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_map\` DROP COLUMN \`design_align\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_map\` DROP COLUMN \`design_background\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_map\` DROP COLUMN \`design_frame\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_map\` DROP COLUMN \`design_padding_top\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_map\` DROP COLUMN \`design_padding_bottom\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_map\` DROP COLUMN \`design_margin_bottom\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_map\` DROP COLUMN \`design_width\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_stats\` DROP COLUMN \`design_heading_size\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_stats\` DROP COLUMN \`design_heading_font\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_stats\` DROP COLUMN \`design_text_size\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_stats\` DROP COLUMN \`design_align\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_stats\` DROP COLUMN \`design_background\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_stats\` DROP COLUMN \`design_frame\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_stats\` DROP COLUMN \`design_padding_top\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_stats\` DROP COLUMN \`design_padding_bottom\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_stats\` DROP COLUMN \`design_margin_bottom\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_stats\` DROP COLUMN \`design_width\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_image_text_locales\` DROP COLUMN \`secondary_label\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_columns\` DROP COLUMN \`design_heading_size\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_columns\` DROP COLUMN \`design_heading_font\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_columns\` DROP COLUMN \`design_text_size\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_columns\` DROP COLUMN \`design_align\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_columns\` DROP COLUMN \`design_background\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_columns\` DROP COLUMN \`design_frame\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_columns\` DROP COLUMN \`design_padding_top\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_columns\` DROP COLUMN \`design_padding_bottom\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_columns\` DROP COLUMN \`design_margin_bottom\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_columns\` DROP COLUMN \`design_width\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_rich_text\` DROP COLUMN \`design_heading_size\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_rich_text\` DROP COLUMN \`design_heading_font\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_rich_text\` DROP COLUMN \`design_text_size\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_rich_text\` DROP COLUMN \`design_align\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_rich_text\` DROP COLUMN \`design_background\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_rich_text\` DROP COLUMN \`design_frame\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_rich_text\` DROP COLUMN \`design_padding_top\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_rich_text\` DROP COLUMN \`design_padding_bottom\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_rich_text\` DROP COLUMN \`design_margin_bottom\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_rich_text\` DROP COLUMN \`design_width\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_video\` DROP COLUMN \`design_heading_size\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_video\` DROP COLUMN \`design_heading_font\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_video\` DROP COLUMN \`design_text_size\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_video\` DROP COLUMN \`design_align\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_video\` DROP COLUMN \`design_background\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_video\` DROP COLUMN \`design_frame\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_video\` DROP COLUMN \`design_padding_top\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_video\` DROP COLUMN \`design_padding_bottom\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_video\` DROP COLUMN \`design_margin_bottom\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_video\` DROP COLUMN \`design_width\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_gallery\` DROP COLUMN \`columns\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_gallery\` DROP COLUMN \`design_heading_size\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_gallery\` DROP COLUMN \`design_heading_font\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_gallery\` DROP COLUMN \`design_text_size\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_gallery\` DROP COLUMN \`design_align\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_gallery\` DROP COLUMN \`design_background\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_gallery\` DROP COLUMN \`design_frame\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_gallery\` DROP COLUMN \`design_padding_top\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_gallery\` DROP COLUMN \`design_padding_bottom\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_gallery\` DROP COLUMN \`design_margin_bottom\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_gallery\` DROP COLUMN \`design_width\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_testimonials\` DROP COLUMN \`design_heading_size\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_testimonials\` DROP COLUMN \`design_heading_font\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_testimonials\` DROP COLUMN \`design_text_size\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_testimonials\` DROP COLUMN \`design_align\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_testimonials\` DROP COLUMN \`design_background\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_testimonials\` DROP COLUMN \`design_frame\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_testimonials\` DROP COLUMN \`design_padding_top\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_testimonials\` DROP COLUMN \`design_padding_bottom\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_testimonials\` DROP COLUMN \`design_margin_bottom\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_testimonials\` DROP COLUMN \`design_width\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_logo_strip\` DROP COLUMN \`design_heading_size\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_logo_strip\` DROP COLUMN \`design_heading_font\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_logo_strip\` DROP COLUMN \`design_text_size\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_logo_strip\` DROP COLUMN \`design_align\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_logo_strip\` DROP COLUMN \`design_background\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_logo_strip\` DROP COLUMN \`design_frame\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_logo_strip\` DROP COLUMN \`design_padding_top\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_logo_strip\` DROP COLUMN \`design_padding_bottom\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_logo_strip\` DROP COLUMN \`design_margin_bottom\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_logo_strip\` DROP COLUMN \`design_width\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_faq\` DROP COLUMN \`design_heading_size\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_faq\` DROP COLUMN \`design_heading_font\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_faq\` DROP COLUMN \`design_text_size\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_faq\` DROP COLUMN \`design_align\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_faq\` DROP COLUMN \`design_background\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_faq\` DROP COLUMN \`design_frame\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_faq\` DROP COLUMN \`design_padding_top\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_faq\` DROP COLUMN \`design_padding_bottom\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_faq\` DROP COLUMN \`design_margin_bottom\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_faq\` DROP COLUMN \`design_width\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_lead_form\` DROP COLUMN \`design_heading_size\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_lead_form\` DROP COLUMN \`design_heading_font\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_lead_form\` DROP COLUMN \`design_text_size\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_lead_form\` DROP COLUMN \`design_align\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_lead_form\` DROP COLUMN \`design_background\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_lead_form\` DROP COLUMN \`design_frame\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_lead_form\` DROP COLUMN \`design_padding_top\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_lead_form\` DROP COLUMN \`design_padding_bottom\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_lead_form\` DROP COLUMN \`design_margin_bottom\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_lead_form\` DROP COLUMN \`design_width\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_moments_wall\` DROP COLUMN \`design_heading_size\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_moments_wall\` DROP COLUMN \`design_heading_font\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_moments_wall\` DROP COLUMN \`design_text_size\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_moments_wall\` DROP COLUMN \`design_background\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_moments_wall\` DROP COLUMN \`design_frame\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_moments_wall\` DROP COLUMN \`design_padding_top\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_moments_wall\` DROP COLUMN \`design_padding_bottom\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_moments_wall\` DROP COLUMN \`design_margin_bottom\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_moments_wall\` DROP COLUMN \`design_width\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_journal_teaser\` DROP COLUMN \`design_heading_size\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_journal_teaser\` DROP COLUMN \`design_heading_font\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_journal_teaser\` DROP COLUMN \`design_text_size\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_journal_teaser\` DROP COLUMN \`design_align\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_journal_teaser\` DROP COLUMN \`design_background\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_journal_teaser\` DROP COLUMN \`design_frame\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_journal_teaser\` DROP COLUMN \`design_padding_top\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_journal_teaser\` DROP COLUMN \`design_padding_bottom\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_journal_teaser\` DROP COLUMN \`design_margin_bottom\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_journal_teaser\` DROP COLUMN \`design_width\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_embed\` DROP COLUMN \`design_heading_size\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_embed\` DROP COLUMN \`design_heading_font\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_embed\` DROP COLUMN \`design_text_size\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_embed\` DROP COLUMN \`design_background\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_embed\` DROP COLUMN \`design_frame\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_embed\` DROP COLUMN \`design_padding_top\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_embed\` DROP COLUMN \`design_padding_bottom\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_embed\` DROP COLUMN \`design_margin_bottom\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_embed\` DROP COLUMN \`design_width\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_spacer\` DROP COLUMN \`design_heading_size\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_spacer\` DROP COLUMN \`design_heading_font\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_spacer\` DROP COLUMN \`design_text_size\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_spacer\` DROP COLUMN \`design_background\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_spacer\` DROP COLUMN \`design_frame\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_spacer\` DROP COLUMN \`design_padding_top\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_spacer\` DROP COLUMN \`design_padding_bottom\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_spacer\` DROP COLUMN \`design_margin_bottom\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_spacer\` DROP COLUMN \`design_width\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_reusable\` DROP COLUMN \`design_heading_size\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_reusable\` DROP COLUMN \`design_heading_font\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_reusable\` DROP COLUMN \`design_text_size\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_reusable\` DROP COLUMN \`design_background\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_reusable\` DROP COLUMN \`design_frame\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_reusable\` DROP COLUMN \`design_padding_top\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_reusable\` DROP COLUMN \`design_padding_bottom\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_reusable\` DROP COLUMN \`design_margin_bottom\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_blocks_reusable\` DROP COLUMN \`design_width\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_hero\` DROP COLUMN \`design_heading_size\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_hero\` DROP COLUMN \`design_heading_font\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_hero\` DROP COLUMN \`design_text_size\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_hero\` DROP COLUMN \`design_background\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_hero\` DROP COLUMN \`design_frame\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_hero\` DROP COLUMN \`design_padding_top\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_hero\` DROP COLUMN \`design_padding_bottom\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_hero\` DROP COLUMN \`design_margin_bottom\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_hero\` DROP COLUMN \`design_width\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_ticker\` DROP COLUMN \`design_heading_size\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_ticker\` DROP COLUMN \`design_heading_font\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_ticker\` DROP COLUMN \`design_text_size\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_ticker\` DROP COLUMN \`design_background\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_ticker\` DROP COLUMN \`design_frame\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_ticker\` DROP COLUMN \`design_padding_top\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_ticker\` DROP COLUMN \`design_padding_bottom\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_ticker\` DROP COLUMN \`design_margin_bottom\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_ticker\` DROP COLUMN \`design_width\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_offer_spotlight\` DROP COLUMN \`design_heading_size\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_offer_spotlight\` DROP COLUMN \`design_heading_font\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_offer_spotlight\` DROP COLUMN \`design_text_size\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_offer_spotlight\` DROP COLUMN \`design_align\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_offer_spotlight\` DROP COLUMN \`design_background\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_offer_spotlight\` DROP COLUMN \`design_frame\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_offer_spotlight\` DROP COLUMN \`design_padding_top\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_offer_spotlight\` DROP COLUMN \`design_padding_bottom\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_offer_spotlight\` DROP COLUMN \`design_margin_bottom\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_offer_spotlight\` DROP COLUMN \`design_width\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_countdown\` DROP COLUMN \`design_heading_size\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_countdown\` DROP COLUMN \`design_heading_font\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_countdown\` DROP COLUMN \`design_text_size\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_countdown\` DROP COLUMN \`design_align\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_countdown\` DROP COLUMN \`design_background\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_countdown\` DROP COLUMN \`design_frame\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_countdown\` DROP COLUMN \`design_padding_top\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_countdown\` DROP COLUMN \`design_padding_bottom\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_countdown\` DROP COLUMN \`design_margin_bottom\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_countdown\` DROP COLUMN \`design_width\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_cta_band\` DROP COLUMN \`design_heading_size\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_cta_band\` DROP COLUMN \`design_heading_font\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_cta_band\` DROP COLUMN \`design_text_size\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_cta_band\` DROP COLUMN \`design_align\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_cta_band\` DROP COLUMN \`design_background\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_cta_band\` DROP COLUMN \`design_frame\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_cta_band\` DROP COLUMN \`design_padding_top\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_cta_band\` DROP COLUMN \`design_padding_bottom\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_cta_band\` DROP COLUMN \`design_margin_bottom\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_cta_band\` DROP COLUMN \`design_width\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_ticket_cards\` DROP COLUMN \`design_heading_size\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_ticket_cards\` DROP COLUMN \`design_heading_font\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_ticket_cards\` DROP COLUMN \`design_text_size\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_ticket_cards\` DROP COLUMN \`design_background\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_ticket_cards\` DROP COLUMN \`design_frame\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_ticket_cards\` DROP COLUMN \`design_padding_top\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_ticket_cards\` DROP COLUMN \`design_padding_bottom\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_ticket_cards\` DROP COLUMN \`design_margin_bottom\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_ticket_cards\` DROP COLUMN \`design_width\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_offer_grid\` DROP COLUMN \`design_heading_size\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_offer_grid\` DROP COLUMN \`design_heading_font\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_offer_grid\` DROP COLUMN \`design_text_size\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_offer_grid\` DROP COLUMN \`design_background\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_offer_grid\` DROP COLUMN \`design_frame\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_offer_grid\` DROP COLUMN \`design_padding_top\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_offer_grid\` DROP COLUMN \`design_padding_bottom\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_offer_grid\` DROP COLUMN \`design_margin_bottom\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_offer_grid\` DROP COLUMN \`design_width\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_worlds_grid\` DROP COLUMN \`design_heading_size\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_worlds_grid\` DROP COLUMN \`design_heading_font\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_worlds_grid\` DROP COLUMN \`design_text_size\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_worlds_grid\` DROP COLUMN \`design_background\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_worlds_grid\` DROP COLUMN \`design_frame\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_worlds_grid\` DROP COLUMN \`design_padding_top\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_worlds_grid\` DROP COLUMN \`design_padding_bottom\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_worlds_grid\` DROP COLUMN \`design_margin_bottom\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_worlds_grid\` DROP COLUMN \`design_width\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_rides_list\` DROP COLUMN \`design_heading_size\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_rides_list\` DROP COLUMN \`design_heading_font\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_rides_list\` DROP COLUMN \`design_text_size\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_rides_list\` DROP COLUMN \`design_background\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_rides_list\` DROP COLUMN \`design_frame\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_rides_list\` DROP COLUMN \`design_padding_top\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_rides_list\` DROP COLUMN \`design_padding_bottom\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_rides_list\` DROP COLUMN \`design_margin_bottom\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_rides_list\` DROP COLUMN \`design_width\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_events_rail\` DROP COLUMN \`design_heading_size\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_events_rail\` DROP COLUMN \`design_heading_font\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_events_rail\` DROP COLUMN \`design_text_size\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_events_rail\` DROP COLUMN \`design_background\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_events_rail\` DROP COLUMN \`design_frame\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_events_rail\` DROP COLUMN \`design_padding_top\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_events_rail\` DROP COLUMN \`design_padding_bottom\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_events_rail\` DROP COLUMN \`design_margin_bottom\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_events_rail\` DROP COLUMN \`design_width\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_today_status\` DROP COLUMN \`design_heading_size\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_today_status\` DROP COLUMN \`design_heading_font\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_today_status\` DROP COLUMN \`design_text_size\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_today_status\` DROP COLUMN \`design_background\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_today_status\` DROP COLUMN \`design_frame\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_today_status\` DROP COLUMN \`design_padding_top\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_today_status\` DROP COLUMN \`design_padding_bottom\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_today_status\` DROP COLUMN \`design_margin_bottom\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_today_status\` DROP COLUMN \`design_width\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_crew_planner\` DROP COLUMN \`design_heading_size\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_crew_planner\` DROP COLUMN \`design_heading_font\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_crew_planner\` DROP COLUMN \`design_text_size\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_crew_planner\` DROP COLUMN \`design_background\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_crew_planner\` DROP COLUMN \`design_frame\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_crew_planner\` DROP COLUMN \`design_padding_top\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_crew_planner\` DROP COLUMN \`design_padding_bottom\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_crew_planner\` DROP COLUMN \`design_margin_bottom\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_crew_planner\` DROP COLUMN \`design_width\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_venues_grid\` DROP COLUMN \`design_heading_size\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_venues_grid\` DROP COLUMN \`design_heading_font\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_venues_grid\` DROP COLUMN \`design_text_size\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_venues_grid\` DROP COLUMN \`design_background\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_venues_grid\` DROP COLUMN \`design_frame\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_venues_grid\` DROP COLUMN \`design_padding_top\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_venues_grid\` DROP COLUMN \`design_padding_bottom\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_venues_grid\` DROP COLUMN \`design_margin_bottom\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_venues_grid\` DROP COLUMN \`design_width\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_map\` DROP COLUMN \`design_heading_size\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_map\` DROP COLUMN \`design_heading_font\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_map\` DROP COLUMN \`design_text_size\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_map\` DROP COLUMN \`design_align\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_map\` DROP COLUMN \`design_background\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_map\` DROP COLUMN \`design_frame\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_map\` DROP COLUMN \`design_padding_top\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_map\` DROP COLUMN \`design_padding_bottom\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_map\` DROP COLUMN \`design_margin_bottom\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_map\` DROP COLUMN \`design_width\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_stats\` DROP COLUMN \`design_heading_size\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_stats\` DROP COLUMN \`design_heading_font\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_stats\` DROP COLUMN \`design_text_size\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_stats\` DROP COLUMN \`design_align\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_stats\` DROP COLUMN \`design_background\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_stats\` DROP COLUMN \`design_frame\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_stats\` DROP COLUMN \`design_padding_top\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_stats\` DROP COLUMN \`design_padding_bottom\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_stats\` DROP COLUMN \`design_margin_bottom\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_stats\` DROP COLUMN \`design_width\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_image_text_locales\` DROP COLUMN \`secondary_label\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_columns\` DROP COLUMN \`design_heading_size\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_columns\` DROP COLUMN \`design_heading_font\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_columns\` DROP COLUMN \`design_text_size\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_columns\` DROP COLUMN \`design_align\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_columns\` DROP COLUMN \`design_background\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_columns\` DROP COLUMN \`design_frame\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_columns\` DROP COLUMN \`design_padding_top\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_columns\` DROP COLUMN \`design_padding_bottom\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_columns\` DROP COLUMN \`design_margin_bottom\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_columns\` DROP COLUMN \`design_width\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_rich_text\` DROP COLUMN \`design_heading_size\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_rich_text\` DROP COLUMN \`design_heading_font\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_rich_text\` DROP COLUMN \`design_text_size\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_rich_text\` DROP COLUMN \`design_align\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_rich_text\` DROP COLUMN \`design_background\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_rich_text\` DROP COLUMN \`design_frame\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_rich_text\` DROP COLUMN \`design_padding_top\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_rich_text\` DROP COLUMN \`design_padding_bottom\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_rich_text\` DROP COLUMN \`design_margin_bottom\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_rich_text\` DROP COLUMN \`design_width\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_video\` DROP COLUMN \`design_heading_size\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_video\` DROP COLUMN \`design_heading_font\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_video\` DROP COLUMN \`design_text_size\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_video\` DROP COLUMN \`design_align\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_video\` DROP COLUMN \`design_background\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_video\` DROP COLUMN \`design_frame\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_video\` DROP COLUMN \`design_padding_top\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_video\` DROP COLUMN \`design_padding_bottom\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_video\` DROP COLUMN \`design_margin_bottom\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_video\` DROP COLUMN \`design_width\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_gallery\` DROP COLUMN \`columns\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_gallery\` DROP COLUMN \`design_heading_size\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_gallery\` DROP COLUMN \`design_heading_font\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_gallery\` DROP COLUMN \`design_text_size\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_gallery\` DROP COLUMN \`design_align\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_gallery\` DROP COLUMN \`design_background\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_gallery\` DROP COLUMN \`design_frame\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_gallery\` DROP COLUMN \`design_padding_top\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_gallery\` DROP COLUMN \`design_padding_bottom\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_gallery\` DROP COLUMN \`design_margin_bottom\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_gallery\` DROP COLUMN \`design_width\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_testimonials\` DROP COLUMN \`design_heading_size\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_testimonials\` DROP COLUMN \`design_heading_font\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_testimonials\` DROP COLUMN \`design_text_size\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_testimonials\` DROP COLUMN \`design_align\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_testimonials\` DROP COLUMN \`design_background\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_testimonials\` DROP COLUMN \`design_frame\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_testimonials\` DROP COLUMN \`design_padding_top\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_testimonials\` DROP COLUMN \`design_padding_bottom\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_testimonials\` DROP COLUMN \`design_margin_bottom\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_testimonials\` DROP COLUMN \`design_width\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_logo_strip\` DROP COLUMN \`design_heading_size\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_logo_strip\` DROP COLUMN \`design_heading_font\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_logo_strip\` DROP COLUMN \`design_text_size\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_logo_strip\` DROP COLUMN \`design_align\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_logo_strip\` DROP COLUMN \`design_background\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_logo_strip\` DROP COLUMN \`design_frame\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_logo_strip\` DROP COLUMN \`design_padding_top\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_logo_strip\` DROP COLUMN \`design_padding_bottom\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_logo_strip\` DROP COLUMN \`design_margin_bottom\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_logo_strip\` DROP COLUMN \`design_width\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_faq\` DROP COLUMN \`design_heading_size\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_faq\` DROP COLUMN \`design_heading_font\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_faq\` DROP COLUMN \`design_text_size\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_faq\` DROP COLUMN \`design_align\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_faq\` DROP COLUMN \`design_background\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_faq\` DROP COLUMN \`design_frame\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_faq\` DROP COLUMN \`design_padding_top\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_faq\` DROP COLUMN \`design_padding_bottom\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_faq\` DROP COLUMN \`design_margin_bottom\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_faq\` DROP COLUMN \`design_width\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_lead_form\` DROP COLUMN \`design_heading_size\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_lead_form\` DROP COLUMN \`design_heading_font\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_lead_form\` DROP COLUMN \`design_text_size\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_lead_form\` DROP COLUMN \`design_align\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_lead_form\` DROP COLUMN \`design_background\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_lead_form\` DROP COLUMN \`design_frame\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_lead_form\` DROP COLUMN \`design_padding_top\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_lead_form\` DROP COLUMN \`design_padding_bottom\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_lead_form\` DROP COLUMN \`design_margin_bottom\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_lead_form\` DROP COLUMN \`design_width\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_moments_wall\` DROP COLUMN \`design_heading_size\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_moments_wall\` DROP COLUMN \`design_heading_font\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_moments_wall\` DROP COLUMN \`design_text_size\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_moments_wall\` DROP COLUMN \`design_background\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_moments_wall\` DROP COLUMN \`design_frame\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_moments_wall\` DROP COLUMN \`design_padding_top\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_moments_wall\` DROP COLUMN \`design_padding_bottom\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_moments_wall\` DROP COLUMN \`design_margin_bottom\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_moments_wall\` DROP COLUMN \`design_width\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_journal_teaser\` DROP COLUMN \`design_heading_size\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_journal_teaser\` DROP COLUMN \`design_heading_font\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_journal_teaser\` DROP COLUMN \`design_text_size\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_journal_teaser\` DROP COLUMN \`design_align\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_journal_teaser\` DROP COLUMN \`design_background\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_journal_teaser\` DROP COLUMN \`design_frame\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_journal_teaser\` DROP COLUMN \`design_padding_top\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_journal_teaser\` DROP COLUMN \`design_padding_bottom\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_journal_teaser\` DROP COLUMN \`design_margin_bottom\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_journal_teaser\` DROP COLUMN \`design_width\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_embed\` DROP COLUMN \`design_heading_size\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_embed\` DROP COLUMN \`design_heading_font\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_embed\` DROP COLUMN \`design_text_size\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_embed\` DROP COLUMN \`design_background\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_embed\` DROP COLUMN \`design_frame\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_embed\` DROP COLUMN \`design_padding_top\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_embed\` DROP COLUMN \`design_padding_bottom\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_embed\` DROP COLUMN \`design_margin_bottom\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_embed\` DROP COLUMN \`design_width\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_spacer\` DROP COLUMN \`design_heading_size\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_spacer\` DROP COLUMN \`design_heading_font\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_spacer\` DROP COLUMN \`design_text_size\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_spacer\` DROP COLUMN \`design_background\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_spacer\` DROP COLUMN \`design_frame\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_spacer\` DROP COLUMN \`design_padding_top\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_spacer\` DROP COLUMN \`design_padding_bottom\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_spacer\` DROP COLUMN \`design_margin_bottom\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_spacer\` DROP COLUMN \`design_width\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_reusable\` DROP COLUMN \`design_heading_size\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_reusable\` DROP COLUMN \`design_heading_font\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_reusable\` DROP COLUMN \`design_text_size\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_reusable\` DROP COLUMN \`design_background\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_reusable\` DROP COLUMN \`design_frame\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_reusable\` DROP COLUMN \`design_padding_top\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_reusable\` DROP COLUMN \`design_padding_bottom\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_reusable\` DROP COLUMN \`design_margin_bottom\`;`)
  await db.run(sql`ALTER TABLE \`offers_blocks_reusable\` DROP COLUMN \`design_width\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_hero\` DROP COLUMN \`design_heading_size\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_hero\` DROP COLUMN \`design_heading_font\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_hero\` DROP COLUMN \`design_text_size\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_hero\` DROP COLUMN \`design_background\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_hero\` DROP COLUMN \`design_frame\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_hero\` DROP COLUMN \`design_padding_top\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_hero\` DROP COLUMN \`design_padding_bottom\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_hero\` DROP COLUMN \`design_margin_bottom\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_hero\` DROP COLUMN \`design_width\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_ticker\` DROP COLUMN \`design_heading_size\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_ticker\` DROP COLUMN \`design_heading_font\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_ticker\` DROP COLUMN \`design_text_size\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_ticker\` DROP COLUMN \`design_background\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_ticker\` DROP COLUMN \`design_frame\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_ticker\` DROP COLUMN \`design_padding_top\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_ticker\` DROP COLUMN \`design_padding_bottom\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_ticker\` DROP COLUMN \`design_margin_bottom\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_ticker\` DROP COLUMN \`design_width\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_offer_spotlight\` DROP COLUMN \`design_heading_size\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_offer_spotlight\` DROP COLUMN \`design_heading_font\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_offer_spotlight\` DROP COLUMN \`design_text_size\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_offer_spotlight\` DROP COLUMN \`design_align\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_offer_spotlight\` DROP COLUMN \`design_background\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_offer_spotlight\` DROP COLUMN \`design_frame\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_offer_spotlight\` DROP COLUMN \`design_padding_top\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_offer_spotlight\` DROP COLUMN \`design_padding_bottom\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_offer_spotlight\` DROP COLUMN \`design_margin_bottom\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_offer_spotlight\` DROP COLUMN \`design_width\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_countdown\` DROP COLUMN \`design_heading_size\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_countdown\` DROP COLUMN \`design_heading_font\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_countdown\` DROP COLUMN \`design_text_size\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_countdown\` DROP COLUMN \`design_align\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_countdown\` DROP COLUMN \`design_background\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_countdown\` DROP COLUMN \`design_frame\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_countdown\` DROP COLUMN \`design_padding_top\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_countdown\` DROP COLUMN \`design_padding_bottom\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_countdown\` DROP COLUMN \`design_margin_bottom\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_countdown\` DROP COLUMN \`design_width\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_cta_band\` DROP COLUMN \`design_heading_size\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_cta_band\` DROP COLUMN \`design_heading_font\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_cta_band\` DROP COLUMN \`design_text_size\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_cta_band\` DROP COLUMN \`design_align\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_cta_band\` DROP COLUMN \`design_background\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_cta_band\` DROP COLUMN \`design_frame\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_cta_band\` DROP COLUMN \`design_padding_top\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_cta_band\` DROP COLUMN \`design_padding_bottom\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_cta_band\` DROP COLUMN \`design_margin_bottom\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_cta_band\` DROP COLUMN \`design_width\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_ticket_cards\` DROP COLUMN \`design_heading_size\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_ticket_cards\` DROP COLUMN \`design_heading_font\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_ticket_cards\` DROP COLUMN \`design_text_size\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_ticket_cards\` DROP COLUMN \`design_background\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_ticket_cards\` DROP COLUMN \`design_frame\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_ticket_cards\` DROP COLUMN \`design_padding_top\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_ticket_cards\` DROP COLUMN \`design_padding_bottom\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_ticket_cards\` DROP COLUMN \`design_margin_bottom\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_ticket_cards\` DROP COLUMN \`design_width\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_offer_grid\` DROP COLUMN \`design_heading_size\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_offer_grid\` DROP COLUMN \`design_heading_font\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_offer_grid\` DROP COLUMN \`design_text_size\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_offer_grid\` DROP COLUMN \`design_background\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_offer_grid\` DROP COLUMN \`design_frame\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_offer_grid\` DROP COLUMN \`design_padding_top\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_offer_grid\` DROP COLUMN \`design_padding_bottom\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_offer_grid\` DROP COLUMN \`design_margin_bottom\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_offer_grid\` DROP COLUMN \`design_width\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_worlds_grid\` DROP COLUMN \`design_heading_size\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_worlds_grid\` DROP COLUMN \`design_heading_font\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_worlds_grid\` DROP COLUMN \`design_text_size\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_worlds_grid\` DROP COLUMN \`design_background\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_worlds_grid\` DROP COLUMN \`design_frame\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_worlds_grid\` DROP COLUMN \`design_padding_top\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_worlds_grid\` DROP COLUMN \`design_padding_bottom\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_worlds_grid\` DROP COLUMN \`design_margin_bottom\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_worlds_grid\` DROP COLUMN \`design_width\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_rides_list\` DROP COLUMN \`design_heading_size\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_rides_list\` DROP COLUMN \`design_heading_font\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_rides_list\` DROP COLUMN \`design_text_size\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_rides_list\` DROP COLUMN \`design_background\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_rides_list\` DROP COLUMN \`design_frame\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_rides_list\` DROP COLUMN \`design_padding_top\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_rides_list\` DROP COLUMN \`design_padding_bottom\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_rides_list\` DROP COLUMN \`design_margin_bottom\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_rides_list\` DROP COLUMN \`design_width\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_events_rail\` DROP COLUMN \`design_heading_size\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_events_rail\` DROP COLUMN \`design_heading_font\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_events_rail\` DROP COLUMN \`design_text_size\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_events_rail\` DROP COLUMN \`design_background\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_events_rail\` DROP COLUMN \`design_frame\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_events_rail\` DROP COLUMN \`design_padding_top\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_events_rail\` DROP COLUMN \`design_padding_bottom\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_events_rail\` DROP COLUMN \`design_margin_bottom\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_events_rail\` DROP COLUMN \`design_width\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_today_status\` DROP COLUMN \`design_heading_size\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_today_status\` DROP COLUMN \`design_heading_font\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_today_status\` DROP COLUMN \`design_text_size\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_today_status\` DROP COLUMN \`design_background\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_today_status\` DROP COLUMN \`design_frame\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_today_status\` DROP COLUMN \`design_padding_top\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_today_status\` DROP COLUMN \`design_padding_bottom\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_today_status\` DROP COLUMN \`design_margin_bottom\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_today_status\` DROP COLUMN \`design_width\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_crew_planner\` DROP COLUMN \`design_heading_size\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_crew_planner\` DROP COLUMN \`design_heading_font\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_crew_planner\` DROP COLUMN \`design_text_size\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_crew_planner\` DROP COLUMN \`design_background\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_crew_planner\` DROP COLUMN \`design_frame\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_crew_planner\` DROP COLUMN \`design_padding_top\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_crew_planner\` DROP COLUMN \`design_padding_bottom\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_crew_planner\` DROP COLUMN \`design_margin_bottom\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_crew_planner\` DROP COLUMN \`design_width\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_venues_grid\` DROP COLUMN \`design_heading_size\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_venues_grid\` DROP COLUMN \`design_heading_font\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_venues_grid\` DROP COLUMN \`design_text_size\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_venues_grid\` DROP COLUMN \`design_background\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_venues_grid\` DROP COLUMN \`design_frame\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_venues_grid\` DROP COLUMN \`design_padding_top\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_venues_grid\` DROP COLUMN \`design_padding_bottom\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_venues_grid\` DROP COLUMN \`design_margin_bottom\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_venues_grid\` DROP COLUMN \`design_width\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_map\` DROP COLUMN \`design_heading_size\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_map\` DROP COLUMN \`design_heading_font\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_map\` DROP COLUMN \`design_text_size\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_map\` DROP COLUMN \`design_align\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_map\` DROP COLUMN \`design_background\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_map\` DROP COLUMN \`design_frame\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_map\` DROP COLUMN \`design_padding_top\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_map\` DROP COLUMN \`design_padding_bottom\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_map\` DROP COLUMN \`design_margin_bottom\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_map\` DROP COLUMN \`design_width\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_stats\` DROP COLUMN \`design_heading_size\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_stats\` DROP COLUMN \`design_heading_font\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_stats\` DROP COLUMN \`design_text_size\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_stats\` DROP COLUMN \`design_align\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_stats\` DROP COLUMN \`design_background\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_stats\` DROP COLUMN \`design_frame\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_stats\` DROP COLUMN \`design_padding_top\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_stats\` DROP COLUMN \`design_padding_bottom\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_stats\` DROP COLUMN \`design_margin_bottom\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_stats\` DROP COLUMN \`design_width\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_image_text_locales\` DROP COLUMN \`secondary_label\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_columns\` DROP COLUMN \`design_heading_size\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_columns\` DROP COLUMN \`design_heading_font\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_columns\` DROP COLUMN \`design_text_size\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_columns\` DROP COLUMN \`design_align\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_columns\` DROP COLUMN \`design_background\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_columns\` DROP COLUMN \`design_frame\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_columns\` DROP COLUMN \`design_padding_top\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_columns\` DROP COLUMN \`design_padding_bottom\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_columns\` DROP COLUMN \`design_margin_bottom\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_columns\` DROP COLUMN \`design_width\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_rich_text\` DROP COLUMN \`design_heading_size\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_rich_text\` DROP COLUMN \`design_heading_font\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_rich_text\` DROP COLUMN \`design_text_size\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_rich_text\` DROP COLUMN \`design_align\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_rich_text\` DROP COLUMN \`design_background\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_rich_text\` DROP COLUMN \`design_frame\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_rich_text\` DROP COLUMN \`design_padding_top\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_rich_text\` DROP COLUMN \`design_padding_bottom\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_rich_text\` DROP COLUMN \`design_margin_bottom\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_rich_text\` DROP COLUMN \`design_width\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_video\` DROP COLUMN \`design_heading_size\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_video\` DROP COLUMN \`design_heading_font\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_video\` DROP COLUMN \`design_text_size\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_video\` DROP COLUMN \`design_align\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_video\` DROP COLUMN \`design_background\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_video\` DROP COLUMN \`design_frame\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_video\` DROP COLUMN \`design_padding_top\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_video\` DROP COLUMN \`design_padding_bottom\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_video\` DROP COLUMN \`design_margin_bottom\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_video\` DROP COLUMN \`design_width\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_gallery\` DROP COLUMN \`columns\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_gallery\` DROP COLUMN \`design_heading_size\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_gallery\` DROP COLUMN \`design_heading_font\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_gallery\` DROP COLUMN \`design_text_size\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_gallery\` DROP COLUMN \`design_align\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_gallery\` DROP COLUMN \`design_background\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_gallery\` DROP COLUMN \`design_frame\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_gallery\` DROP COLUMN \`design_padding_top\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_gallery\` DROP COLUMN \`design_padding_bottom\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_gallery\` DROP COLUMN \`design_margin_bottom\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_gallery\` DROP COLUMN \`design_width\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_testimonials\` DROP COLUMN \`design_heading_size\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_testimonials\` DROP COLUMN \`design_heading_font\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_testimonials\` DROP COLUMN \`design_text_size\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_testimonials\` DROP COLUMN \`design_align\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_testimonials\` DROP COLUMN \`design_background\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_testimonials\` DROP COLUMN \`design_frame\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_testimonials\` DROP COLUMN \`design_padding_top\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_testimonials\` DROP COLUMN \`design_padding_bottom\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_testimonials\` DROP COLUMN \`design_margin_bottom\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_testimonials\` DROP COLUMN \`design_width\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_logo_strip\` DROP COLUMN \`design_heading_size\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_logo_strip\` DROP COLUMN \`design_heading_font\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_logo_strip\` DROP COLUMN \`design_text_size\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_logo_strip\` DROP COLUMN \`design_align\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_logo_strip\` DROP COLUMN \`design_background\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_logo_strip\` DROP COLUMN \`design_frame\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_logo_strip\` DROP COLUMN \`design_padding_top\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_logo_strip\` DROP COLUMN \`design_padding_bottom\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_logo_strip\` DROP COLUMN \`design_margin_bottom\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_logo_strip\` DROP COLUMN \`design_width\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_faq\` DROP COLUMN \`design_heading_size\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_faq\` DROP COLUMN \`design_heading_font\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_faq\` DROP COLUMN \`design_text_size\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_faq\` DROP COLUMN \`design_align\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_faq\` DROP COLUMN \`design_background\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_faq\` DROP COLUMN \`design_frame\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_faq\` DROP COLUMN \`design_padding_top\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_faq\` DROP COLUMN \`design_padding_bottom\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_faq\` DROP COLUMN \`design_margin_bottom\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_faq\` DROP COLUMN \`design_width\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_lead_form\` DROP COLUMN \`design_heading_size\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_lead_form\` DROP COLUMN \`design_heading_font\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_lead_form\` DROP COLUMN \`design_text_size\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_lead_form\` DROP COLUMN \`design_align\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_lead_form\` DROP COLUMN \`design_background\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_lead_form\` DROP COLUMN \`design_frame\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_lead_form\` DROP COLUMN \`design_padding_top\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_lead_form\` DROP COLUMN \`design_padding_bottom\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_lead_form\` DROP COLUMN \`design_margin_bottom\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_lead_form\` DROP COLUMN \`design_width\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_moments_wall\` DROP COLUMN \`design_heading_size\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_moments_wall\` DROP COLUMN \`design_heading_font\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_moments_wall\` DROP COLUMN \`design_text_size\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_moments_wall\` DROP COLUMN \`design_background\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_moments_wall\` DROP COLUMN \`design_frame\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_moments_wall\` DROP COLUMN \`design_padding_top\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_moments_wall\` DROP COLUMN \`design_padding_bottom\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_moments_wall\` DROP COLUMN \`design_margin_bottom\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_moments_wall\` DROP COLUMN \`design_width\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_journal_teaser\` DROP COLUMN \`design_heading_size\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_journal_teaser\` DROP COLUMN \`design_heading_font\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_journal_teaser\` DROP COLUMN \`design_text_size\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_journal_teaser\` DROP COLUMN \`design_align\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_journal_teaser\` DROP COLUMN \`design_background\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_journal_teaser\` DROP COLUMN \`design_frame\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_journal_teaser\` DROP COLUMN \`design_padding_top\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_journal_teaser\` DROP COLUMN \`design_padding_bottom\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_journal_teaser\` DROP COLUMN \`design_margin_bottom\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_journal_teaser\` DROP COLUMN \`design_width\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_embed\` DROP COLUMN \`design_heading_size\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_embed\` DROP COLUMN \`design_heading_font\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_embed\` DROP COLUMN \`design_text_size\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_embed\` DROP COLUMN \`design_background\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_embed\` DROP COLUMN \`design_frame\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_embed\` DROP COLUMN \`design_padding_top\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_embed\` DROP COLUMN \`design_padding_bottom\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_embed\` DROP COLUMN \`design_margin_bottom\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_embed\` DROP COLUMN \`design_width\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_spacer\` DROP COLUMN \`design_heading_size\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_spacer\` DROP COLUMN \`design_heading_font\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_spacer\` DROP COLUMN \`design_text_size\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_spacer\` DROP COLUMN \`design_background\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_spacer\` DROP COLUMN \`design_frame\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_spacer\` DROP COLUMN \`design_padding_top\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_spacer\` DROP COLUMN \`design_padding_bottom\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_spacer\` DROP COLUMN \`design_margin_bottom\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_spacer\` DROP COLUMN \`design_width\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_reusable\` DROP COLUMN \`design_heading_size\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_reusable\` DROP COLUMN \`design_heading_font\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_reusable\` DROP COLUMN \`design_text_size\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_reusable\` DROP COLUMN \`design_background\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_reusable\` DROP COLUMN \`design_frame\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_reusable\` DROP COLUMN \`design_padding_top\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_reusable\` DROP COLUMN \`design_padding_bottom\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_reusable\` DROP COLUMN \`design_margin_bottom\`;`)
  await db.run(sql`ALTER TABLE \`_offers_v_blocks_reusable\` DROP COLUMN \`design_width\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_hero\` DROP COLUMN \`design_heading_size\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_hero\` DROP COLUMN \`design_heading_font\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_hero\` DROP COLUMN \`design_text_size\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_hero\` DROP COLUMN \`design_background\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_hero\` DROP COLUMN \`design_frame\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_hero\` DROP COLUMN \`design_padding_top\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_hero\` DROP COLUMN \`design_padding_bottom\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_hero\` DROP COLUMN \`design_margin_bottom\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_hero\` DROP COLUMN \`design_width\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_ticker\` DROP COLUMN \`design_heading_size\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_ticker\` DROP COLUMN \`design_heading_font\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_ticker\` DROP COLUMN \`design_text_size\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_ticker\` DROP COLUMN \`design_background\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_ticker\` DROP COLUMN \`design_frame\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_ticker\` DROP COLUMN \`design_padding_top\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_ticker\` DROP COLUMN \`design_padding_bottom\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_ticker\` DROP COLUMN \`design_margin_bottom\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_ticker\` DROP COLUMN \`design_width\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_offer_spotlight\` DROP COLUMN \`design_heading_size\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_offer_spotlight\` DROP COLUMN \`design_heading_font\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_offer_spotlight\` DROP COLUMN \`design_text_size\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_offer_spotlight\` DROP COLUMN \`design_align\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_offer_spotlight\` DROP COLUMN \`design_background\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_offer_spotlight\` DROP COLUMN \`design_frame\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_offer_spotlight\` DROP COLUMN \`design_padding_top\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_offer_spotlight\` DROP COLUMN \`design_padding_bottom\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_offer_spotlight\` DROP COLUMN \`design_margin_bottom\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_offer_spotlight\` DROP COLUMN \`design_width\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_countdown\` DROP COLUMN \`design_heading_size\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_countdown\` DROP COLUMN \`design_heading_font\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_countdown\` DROP COLUMN \`design_text_size\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_countdown\` DROP COLUMN \`design_align\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_countdown\` DROP COLUMN \`design_background\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_countdown\` DROP COLUMN \`design_frame\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_countdown\` DROP COLUMN \`design_padding_top\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_countdown\` DROP COLUMN \`design_padding_bottom\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_countdown\` DROP COLUMN \`design_margin_bottom\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_countdown\` DROP COLUMN \`design_width\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_cta_band\` DROP COLUMN \`design_heading_size\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_cta_band\` DROP COLUMN \`design_heading_font\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_cta_band\` DROP COLUMN \`design_text_size\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_cta_band\` DROP COLUMN \`design_align\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_cta_band\` DROP COLUMN \`design_background\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_cta_band\` DROP COLUMN \`design_frame\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_cta_band\` DROP COLUMN \`design_padding_top\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_cta_band\` DROP COLUMN \`design_padding_bottom\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_cta_band\` DROP COLUMN \`design_margin_bottom\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_cta_band\` DROP COLUMN \`design_width\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_ticket_cards\` DROP COLUMN \`design_heading_size\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_ticket_cards\` DROP COLUMN \`design_heading_font\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_ticket_cards\` DROP COLUMN \`design_text_size\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_ticket_cards\` DROP COLUMN \`design_background\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_ticket_cards\` DROP COLUMN \`design_frame\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_ticket_cards\` DROP COLUMN \`design_padding_top\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_ticket_cards\` DROP COLUMN \`design_padding_bottom\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_ticket_cards\` DROP COLUMN \`design_margin_bottom\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_ticket_cards\` DROP COLUMN \`design_width\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_offer_grid\` DROP COLUMN \`design_heading_size\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_offer_grid\` DROP COLUMN \`design_heading_font\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_offer_grid\` DROP COLUMN \`design_text_size\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_offer_grid\` DROP COLUMN \`design_background\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_offer_grid\` DROP COLUMN \`design_frame\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_offer_grid\` DROP COLUMN \`design_padding_top\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_offer_grid\` DROP COLUMN \`design_padding_bottom\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_offer_grid\` DROP COLUMN \`design_margin_bottom\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_offer_grid\` DROP COLUMN \`design_width\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_worlds_grid\` DROP COLUMN \`design_heading_size\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_worlds_grid\` DROP COLUMN \`design_heading_font\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_worlds_grid\` DROP COLUMN \`design_text_size\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_worlds_grid\` DROP COLUMN \`design_background\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_worlds_grid\` DROP COLUMN \`design_frame\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_worlds_grid\` DROP COLUMN \`design_padding_top\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_worlds_grid\` DROP COLUMN \`design_padding_bottom\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_worlds_grid\` DROP COLUMN \`design_margin_bottom\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_worlds_grid\` DROP COLUMN \`design_width\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_rides_list\` DROP COLUMN \`design_heading_size\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_rides_list\` DROP COLUMN \`design_heading_font\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_rides_list\` DROP COLUMN \`design_text_size\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_rides_list\` DROP COLUMN \`design_background\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_rides_list\` DROP COLUMN \`design_frame\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_rides_list\` DROP COLUMN \`design_padding_top\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_rides_list\` DROP COLUMN \`design_padding_bottom\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_rides_list\` DROP COLUMN \`design_margin_bottom\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_rides_list\` DROP COLUMN \`design_width\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_events_rail\` DROP COLUMN \`design_heading_size\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_events_rail\` DROP COLUMN \`design_heading_font\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_events_rail\` DROP COLUMN \`design_text_size\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_events_rail\` DROP COLUMN \`design_background\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_events_rail\` DROP COLUMN \`design_frame\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_events_rail\` DROP COLUMN \`design_padding_top\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_events_rail\` DROP COLUMN \`design_padding_bottom\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_events_rail\` DROP COLUMN \`design_margin_bottom\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_events_rail\` DROP COLUMN \`design_width\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_today_status\` DROP COLUMN \`design_heading_size\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_today_status\` DROP COLUMN \`design_heading_font\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_today_status\` DROP COLUMN \`design_text_size\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_today_status\` DROP COLUMN \`design_background\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_today_status\` DROP COLUMN \`design_frame\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_today_status\` DROP COLUMN \`design_padding_top\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_today_status\` DROP COLUMN \`design_padding_bottom\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_today_status\` DROP COLUMN \`design_margin_bottom\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_today_status\` DROP COLUMN \`design_width\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_crew_planner\` DROP COLUMN \`design_heading_size\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_crew_planner\` DROP COLUMN \`design_heading_font\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_crew_planner\` DROP COLUMN \`design_text_size\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_crew_planner\` DROP COLUMN \`design_background\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_crew_planner\` DROP COLUMN \`design_frame\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_crew_planner\` DROP COLUMN \`design_padding_top\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_crew_planner\` DROP COLUMN \`design_padding_bottom\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_crew_planner\` DROP COLUMN \`design_margin_bottom\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_crew_planner\` DROP COLUMN \`design_width\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_venues_grid\` DROP COLUMN \`design_heading_size\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_venues_grid\` DROP COLUMN \`design_heading_font\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_venues_grid\` DROP COLUMN \`design_text_size\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_venues_grid\` DROP COLUMN \`design_background\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_venues_grid\` DROP COLUMN \`design_frame\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_venues_grid\` DROP COLUMN \`design_padding_top\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_venues_grid\` DROP COLUMN \`design_padding_bottom\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_venues_grid\` DROP COLUMN \`design_margin_bottom\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_venues_grid\` DROP COLUMN \`design_width\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_map\` DROP COLUMN \`design_heading_size\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_map\` DROP COLUMN \`design_heading_font\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_map\` DROP COLUMN \`design_text_size\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_map\` DROP COLUMN \`design_align\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_map\` DROP COLUMN \`design_background\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_map\` DROP COLUMN \`design_frame\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_map\` DROP COLUMN \`design_padding_top\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_map\` DROP COLUMN \`design_padding_bottom\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_map\` DROP COLUMN \`design_margin_bottom\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_map\` DROP COLUMN \`design_width\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_stats\` DROP COLUMN \`design_heading_size\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_stats\` DROP COLUMN \`design_heading_font\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_stats\` DROP COLUMN \`design_text_size\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_stats\` DROP COLUMN \`design_align\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_stats\` DROP COLUMN \`design_background\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_stats\` DROP COLUMN \`design_frame\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_stats\` DROP COLUMN \`design_padding_top\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_stats\` DROP COLUMN \`design_padding_bottom\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_stats\` DROP COLUMN \`design_margin_bottom\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_stats\` DROP COLUMN \`design_width\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_image_text_locales\` DROP COLUMN \`secondary_label\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_columns\` DROP COLUMN \`design_heading_size\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_columns\` DROP COLUMN \`design_heading_font\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_columns\` DROP COLUMN \`design_text_size\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_columns\` DROP COLUMN \`design_align\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_columns\` DROP COLUMN \`design_background\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_columns\` DROP COLUMN \`design_frame\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_columns\` DROP COLUMN \`design_padding_top\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_columns\` DROP COLUMN \`design_padding_bottom\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_columns\` DROP COLUMN \`design_margin_bottom\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_columns\` DROP COLUMN \`design_width\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_rich_text\` DROP COLUMN \`design_heading_size\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_rich_text\` DROP COLUMN \`design_heading_font\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_rich_text\` DROP COLUMN \`design_text_size\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_rich_text\` DROP COLUMN \`design_align\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_rich_text\` DROP COLUMN \`design_background\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_rich_text\` DROP COLUMN \`design_frame\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_rich_text\` DROP COLUMN \`design_padding_top\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_rich_text\` DROP COLUMN \`design_padding_bottom\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_rich_text\` DROP COLUMN \`design_margin_bottom\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_rich_text\` DROP COLUMN \`design_width\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_video\` DROP COLUMN \`design_heading_size\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_video\` DROP COLUMN \`design_heading_font\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_video\` DROP COLUMN \`design_text_size\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_video\` DROP COLUMN \`design_align\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_video\` DROP COLUMN \`design_background\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_video\` DROP COLUMN \`design_frame\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_video\` DROP COLUMN \`design_padding_top\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_video\` DROP COLUMN \`design_padding_bottom\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_video\` DROP COLUMN \`design_margin_bottom\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_video\` DROP COLUMN \`design_width\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_gallery\` DROP COLUMN \`columns\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_gallery\` DROP COLUMN \`design_heading_size\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_gallery\` DROP COLUMN \`design_heading_font\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_gallery\` DROP COLUMN \`design_text_size\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_gallery\` DROP COLUMN \`design_align\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_gallery\` DROP COLUMN \`design_background\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_gallery\` DROP COLUMN \`design_frame\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_gallery\` DROP COLUMN \`design_padding_top\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_gallery\` DROP COLUMN \`design_padding_bottom\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_gallery\` DROP COLUMN \`design_margin_bottom\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_gallery\` DROP COLUMN \`design_width\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_testimonials\` DROP COLUMN \`design_heading_size\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_testimonials\` DROP COLUMN \`design_heading_font\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_testimonials\` DROP COLUMN \`design_text_size\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_testimonials\` DROP COLUMN \`design_align\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_testimonials\` DROP COLUMN \`design_background\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_testimonials\` DROP COLUMN \`design_frame\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_testimonials\` DROP COLUMN \`design_padding_top\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_testimonials\` DROP COLUMN \`design_padding_bottom\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_testimonials\` DROP COLUMN \`design_margin_bottom\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_testimonials\` DROP COLUMN \`design_width\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_logo_strip\` DROP COLUMN \`design_heading_size\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_logo_strip\` DROP COLUMN \`design_heading_font\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_logo_strip\` DROP COLUMN \`design_text_size\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_logo_strip\` DROP COLUMN \`design_align\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_logo_strip\` DROP COLUMN \`design_background\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_logo_strip\` DROP COLUMN \`design_frame\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_logo_strip\` DROP COLUMN \`design_padding_top\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_logo_strip\` DROP COLUMN \`design_padding_bottom\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_logo_strip\` DROP COLUMN \`design_margin_bottom\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_logo_strip\` DROP COLUMN \`design_width\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_faq\` DROP COLUMN \`design_heading_size\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_faq\` DROP COLUMN \`design_heading_font\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_faq\` DROP COLUMN \`design_text_size\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_faq\` DROP COLUMN \`design_align\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_faq\` DROP COLUMN \`design_background\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_faq\` DROP COLUMN \`design_frame\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_faq\` DROP COLUMN \`design_padding_top\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_faq\` DROP COLUMN \`design_padding_bottom\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_faq\` DROP COLUMN \`design_margin_bottom\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_faq\` DROP COLUMN \`design_width\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_lead_form\` DROP COLUMN \`design_heading_size\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_lead_form\` DROP COLUMN \`design_heading_font\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_lead_form\` DROP COLUMN \`design_text_size\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_lead_form\` DROP COLUMN \`design_align\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_lead_form\` DROP COLUMN \`design_background\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_lead_form\` DROP COLUMN \`design_frame\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_lead_form\` DROP COLUMN \`design_padding_top\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_lead_form\` DROP COLUMN \`design_padding_bottom\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_lead_form\` DROP COLUMN \`design_margin_bottom\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_lead_form\` DROP COLUMN \`design_width\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_moments_wall\` DROP COLUMN \`design_heading_size\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_moments_wall\` DROP COLUMN \`design_heading_font\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_moments_wall\` DROP COLUMN \`design_text_size\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_moments_wall\` DROP COLUMN \`design_background\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_moments_wall\` DROP COLUMN \`design_frame\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_moments_wall\` DROP COLUMN \`design_padding_top\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_moments_wall\` DROP COLUMN \`design_padding_bottom\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_moments_wall\` DROP COLUMN \`design_margin_bottom\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_moments_wall\` DROP COLUMN \`design_width\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_journal_teaser\` DROP COLUMN \`design_heading_size\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_journal_teaser\` DROP COLUMN \`design_heading_font\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_journal_teaser\` DROP COLUMN \`design_text_size\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_journal_teaser\` DROP COLUMN \`design_align\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_journal_teaser\` DROP COLUMN \`design_background\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_journal_teaser\` DROP COLUMN \`design_frame\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_journal_teaser\` DROP COLUMN \`design_padding_top\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_journal_teaser\` DROP COLUMN \`design_padding_bottom\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_journal_teaser\` DROP COLUMN \`design_margin_bottom\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_journal_teaser\` DROP COLUMN \`design_width\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_embed\` DROP COLUMN \`design_heading_size\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_embed\` DROP COLUMN \`design_heading_font\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_embed\` DROP COLUMN \`design_text_size\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_embed\` DROP COLUMN \`design_background\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_embed\` DROP COLUMN \`design_frame\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_embed\` DROP COLUMN \`design_padding_top\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_embed\` DROP COLUMN \`design_padding_bottom\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_embed\` DROP COLUMN \`design_margin_bottom\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_embed\` DROP COLUMN \`design_width\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_spacer\` DROP COLUMN \`design_heading_size\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_spacer\` DROP COLUMN \`design_heading_font\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_spacer\` DROP COLUMN \`design_text_size\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_spacer\` DROP COLUMN \`design_background\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_spacer\` DROP COLUMN \`design_frame\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_spacer\` DROP COLUMN \`design_padding_top\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_spacer\` DROP COLUMN \`design_padding_bottom\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_spacer\` DROP COLUMN \`design_margin_bottom\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_spacer\` DROP COLUMN \`design_width\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_reusable\` DROP COLUMN \`design_heading_size\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_reusable\` DROP COLUMN \`design_heading_font\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_reusable\` DROP COLUMN \`design_text_size\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_reusable\` DROP COLUMN \`design_background\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_reusable\` DROP COLUMN \`design_frame\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_reusable\` DROP COLUMN \`design_padding_top\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_reusable\` DROP COLUMN \`design_padding_bottom\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_reusable\` DROP COLUMN \`design_margin_bottom\`;`)
  await db.run(sql`ALTER TABLE \`events_blocks_reusable\` DROP COLUMN \`design_width\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_hero\` DROP COLUMN \`design_heading_size\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_hero\` DROP COLUMN \`design_heading_font\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_hero\` DROP COLUMN \`design_text_size\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_hero\` DROP COLUMN \`design_background\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_hero\` DROP COLUMN \`design_frame\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_hero\` DROP COLUMN \`design_padding_top\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_hero\` DROP COLUMN \`design_padding_bottom\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_hero\` DROP COLUMN \`design_margin_bottom\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_hero\` DROP COLUMN \`design_width\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_ticker\` DROP COLUMN \`design_heading_size\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_ticker\` DROP COLUMN \`design_heading_font\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_ticker\` DROP COLUMN \`design_text_size\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_ticker\` DROP COLUMN \`design_background\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_ticker\` DROP COLUMN \`design_frame\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_ticker\` DROP COLUMN \`design_padding_top\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_ticker\` DROP COLUMN \`design_padding_bottom\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_ticker\` DROP COLUMN \`design_margin_bottom\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_ticker\` DROP COLUMN \`design_width\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_offer_spotlight\` DROP COLUMN \`design_heading_size\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_offer_spotlight\` DROP COLUMN \`design_heading_font\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_offer_spotlight\` DROP COLUMN \`design_text_size\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_offer_spotlight\` DROP COLUMN \`design_align\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_offer_spotlight\` DROP COLUMN \`design_background\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_offer_spotlight\` DROP COLUMN \`design_frame\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_offer_spotlight\` DROP COLUMN \`design_padding_top\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_offer_spotlight\` DROP COLUMN \`design_padding_bottom\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_offer_spotlight\` DROP COLUMN \`design_margin_bottom\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_offer_spotlight\` DROP COLUMN \`design_width\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_countdown\` DROP COLUMN \`design_heading_size\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_countdown\` DROP COLUMN \`design_heading_font\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_countdown\` DROP COLUMN \`design_text_size\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_countdown\` DROP COLUMN \`design_align\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_countdown\` DROP COLUMN \`design_background\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_countdown\` DROP COLUMN \`design_frame\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_countdown\` DROP COLUMN \`design_padding_top\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_countdown\` DROP COLUMN \`design_padding_bottom\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_countdown\` DROP COLUMN \`design_margin_bottom\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_countdown\` DROP COLUMN \`design_width\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_cta_band\` DROP COLUMN \`design_heading_size\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_cta_band\` DROP COLUMN \`design_heading_font\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_cta_band\` DROP COLUMN \`design_text_size\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_cta_band\` DROP COLUMN \`design_align\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_cta_band\` DROP COLUMN \`design_background\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_cta_band\` DROP COLUMN \`design_frame\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_cta_band\` DROP COLUMN \`design_padding_top\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_cta_band\` DROP COLUMN \`design_padding_bottom\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_cta_band\` DROP COLUMN \`design_margin_bottom\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_cta_band\` DROP COLUMN \`design_width\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_ticket_cards\` DROP COLUMN \`design_heading_size\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_ticket_cards\` DROP COLUMN \`design_heading_font\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_ticket_cards\` DROP COLUMN \`design_text_size\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_ticket_cards\` DROP COLUMN \`design_background\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_ticket_cards\` DROP COLUMN \`design_frame\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_ticket_cards\` DROP COLUMN \`design_padding_top\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_ticket_cards\` DROP COLUMN \`design_padding_bottom\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_ticket_cards\` DROP COLUMN \`design_margin_bottom\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_ticket_cards\` DROP COLUMN \`design_width\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_offer_grid\` DROP COLUMN \`design_heading_size\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_offer_grid\` DROP COLUMN \`design_heading_font\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_offer_grid\` DROP COLUMN \`design_text_size\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_offer_grid\` DROP COLUMN \`design_background\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_offer_grid\` DROP COLUMN \`design_frame\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_offer_grid\` DROP COLUMN \`design_padding_top\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_offer_grid\` DROP COLUMN \`design_padding_bottom\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_offer_grid\` DROP COLUMN \`design_margin_bottom\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_offer_grid\` DROP COLUMN \`design_width\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_worlds_grid\` DROP COLUMN \`design_heading_size\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_worlds_grid\` DROP COLUMN \`design_heading_font\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_worlds_grid\` DROP COLUMN \`design_text_size\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_worlds_grid\` DROP COLUMN \`design_background\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_worlds_grid\` DROP COLUMN \`design_frame\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_worlds_grid\` DROP COLUMN \`design_padding_top\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_worlds_grid\` DROP COLUMN \`design_padding_bottom\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_worlds_grid\` DROP COLUMN \`design_margin_bottom\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_worlds_grid\` DROP COLUMN \`design_width\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_rides_list\` DROP COLUMN \`design_heading_size\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_rides_list\` DROP COLUMN \`design_heading_font\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_rides_list\` DROP COLUMN \`design_text_size\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_rides_list\` DROP COLUMN \`design_background\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_rides_list\` DROP COLUMN \`design_frame\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_rides_list\` DROP COLUMN \`design_padding_top\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_rides_list\` DROP COLUMN \`design_padding_bottom\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_rides_list\` DROP COLUMN \`design_margin_bottom\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_rides_list\` DROP COLUMN \`design_width\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_events_rail\` DROP COLUMN \`design_heading_size\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_events_rail\` DROP COLUMN \`design_heading_font\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_events_rail\` DROP COLUMN \`design_text_size\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_events_rail\` DROP COLUMN \`design_background\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_events_rail\` DROP COLUMN \`design_frame\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_events_rail\` DROP COLUMN \`design_padding_top\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_events_rail\` DROP COLUMN \`design_padding_bottom\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_events_rail\` DROP COLUMN \`design_margin_bottom\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_events_rail\` DROP COLUMN \`design_width\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_today_status\` DROP COLUMN \`design_heading_size\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_today_status\` DROP COLUMN \`design_heading_font\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_today_status\` DROP COLUMN \`design_text_size\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_today_status\` DROP COLUMN \`design_background\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_today_status\` DROP COLUMN \`design_frame\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_today_status\` DROP COLUMN \`design_padding_top\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_today_status\` DROP COLUMN \`design_padding_bottom\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_today_status\` DROP COLUMN \`design_margin_bottom\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_today_status\` DROP COLUMN \`design_width\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_crew_planner\` DROP COLUMN \`design_heading_size\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_crew_planner\` DROP COLUMN \`design_heading_font\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_crew_planner\` DROP COLUMN \`design_text_size\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_crew_planner\` DROP COLUMN \`design_background\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_crew_planner\` DROP COLUMN \`design_frame\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_crew_planner\` DROP COLUMN \`design_padding_top\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_crew_planner\` DROP COLUMN \`design_padding_bottom\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_crew_planner\` DROP COLUMN \`design_margin_bottom\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_crew_planner\` DROP COLUMN \`design_width\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_venues_grid\` DROP COLUMN \`design_heading_size\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_venues_grid\` DROP COLUMN \`design_heading_font\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_venues_grid\` DROP COLUMN \`design_text_size\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_venues_grid\` DROP COLUMN \`design_background\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_venues_grid\` DROP COLUMN \`design_frame\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_venues_grid\` DROP COLUMN \`design_padding_top\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_venues_grid\` DROP COLUMN \`design_padding_bottom\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_venues_grid\` DROP COLUMN \`design_margin_bottom\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_venues_grid\` DROP COLUMN \`design_width\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_map\` DROP COLUMN \`design_heading_size\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_map\` DROP COLUMN \`design_heading_font\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_map\` DROP COLUMN \`design_text_size\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_map\` DROP COLUMN \`design_align\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_map\` DROP COLUMN \`design_background\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_map\` DROP COLUMN \`design_frame\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_map\` DROP COLUMN \`design_padding_top\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_map\` DROP COLUMN \`design_padding_bottom\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_map\` DROP COLUMN \`design_margin_bottom\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_map\` DROP COLUMN \`design_width\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_stats\` DROP COLUMN \`design_heading_size\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_stats\` DROP COLUMN \`design_heading_font\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_stats\` DROP COLUMN \`design_text_size\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_stats\` DROP COLUMN \`design_align\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_stats\` DROP COLUMN \`design_background\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_stats\` DROP COLUMN \`design_frame\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_stats\` DROP COLUMN \`design_padding_top\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_stats\` DROP COLUMN \`design_padding_bottom\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_stats\` DROP COLUMN \`design_margin_bottom\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_stats\` DROP COLUMN \`design_width\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_image_text_locales\` DROP COLUMN \`secondary_label\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_columns\` DROP COLUMN \`design_heading_size\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_columns\` DROP COLUMN \`design_heading_font\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_columns\` DROP COLUMN \`design_text_size\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_columns\` DROP COLUMN \`design_align\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_columns\` DROP COLUMN \`design_background\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_columns\` DROP COLUMN \`design_frame\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_columns\` DROP COLUMN \`design_padding_top\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_columns\` DROP COLUMN \`design_padding_bottom\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_columns\` DROP COLUMN \`design_margin_bottom\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_columns\` DROP COLUMN \`design_width\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_rich_text\` DROP COLUMN \`design_heading_size\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_rich_text\` DROP COLUMN \`design_heading_font\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_rich_text\` DROP COLUMN \`design_text_size\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_rich_text\` DROP COLUMN \`design_align\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_rich_text\` DROP COLUMN \`design_background\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_rich_text\` DROP COLUMN \`design_frame\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_rich_text\` DROP COLUMN \`design_padding_top\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_rich_text\` DROP COLUMN \`design_padding_bottom\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_rich_text\` DROP COLUMN \`design_margin_bottom\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_rich_text\` DROP COLUMN \`design_width\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_video\` DROP COLUMN \`design_heading_size\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_video\` DROP COLUMN \`design_heading_font\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_video\` DROP COLUMN \`design_text_size\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_video\` DROP COLUMN \`design_align\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_video\` DROP COLUMN \`design_background\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_video\` DROP COLUMN \`design_frame\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_video\` DROP COLUMN \`design_padding_top\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_video\` DROP COLUMN \`design_padding_bottom\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_video\` DROP COLUMN \`design_margin_bottom\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_video\` DROP COLUMN \`design_width\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_gallery\` DROP COLUMN \`columns\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_gallery\` DROP COLUMN \`design_heading_size\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_gallery\` DROP COLUMN \`design_heading_font\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_gallery\` DROP COLUMN \`design_text_size\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_gallery\` DROP COLUMN \`design_align\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_gallery\` DROP COLUMN \`design_background\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_gallery\` DROP COLUMN \`design_frame\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_gallery\` DROP COLUMN \`design_padding_top\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_gallery\` DROP COLUMN \`design_padding_bottom\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_gallery\` DROP COLUMN \`design_margin_bottom\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_gallery\` DROP COLUMN \`design_width\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_testimonials\` DROP COLUMN \`design_heading_size\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_testimonials\` DROP COLUMN \`design_heading_font\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_testimonials\` DROP COLUMN \`design_text_size\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_testimonials\` DROP COLUMN \`design_align\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_testimonials\` DROP COLUMN \`design_background\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_testimonials\` DROP COLUMN \`design_frame\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_testimonials\` DROP COLUMN \`design_padding_top\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_testimonials\` DROP COLUMN \`design_padding_bottom\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_testimonials\` DROP COLUMN \`design_margin_bottom\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_testimonials\` DROP COLUMN \`design_width\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_logo_strip\` DROP COLUMN \`design_heading_size\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_logo_strip\` DROP COLUMN \`design_heading_font\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_logo_strip\` DROP COLUMN \`design_text_size\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_logo_strip\` DROP COLUMN \`design_align\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_logo_strip\` DROP COLUMN \`design_background\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_logo_strip\` DROP COLUMN \`design_frame\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_logo_strip\` DROP COLUMN \`design_padding_top\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_logo_strip\` DROP COLUMN \`design_padding_bottom\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_logo_strip\` DROP COLUMN \`design_margin_bottom\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_logo_strip\` DROP COLUMN \`design_width\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_faq\` DROP COLUMN \`design_heading_size\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_faq\` DROP COLUMN \`design_heading_font\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_faq\` DROP COLUMN \`design_text_size\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_faq\` DROP COLUMN \`design_align\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_faq\` DROP COLUMN \`design_background\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_faq\` DROP COLUMN \`design_frame\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_faq\` DROP COLUMN \`design_padding_top\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_faq\` DROP COLUMN \`design_padding_bottom\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_faq\` DROP COLUMN \`design_margin_bottom\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_faq\` DROP COLUMN \`design_width\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_lead_form\` DROP COLUMN \`design_heading_size\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_lead_form\` DROP COLUMN \`design_heading_font\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_lead_form\` DROP COLUMN \`design_text_size\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_lead_form\` DROP COLUMN \`design_align\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_lead_form\` DROP COLUMN \`design_background\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_lead_form\` DROP COLUMN \`design_frame\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_lead_form\` DROP COLUMN \`design_padding_top\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_lead_form\` DROP COLUMN \`design_padding_bottom\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_lead_form\` DROP COLUMN \`design_margin_bottom\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_lead_form\` DROP COLUMN \`design_width\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_moments_wall\` DROP COLUMN \`design_heading_size\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_moments_wall\` DROP COLUMN \`design_heading_font\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_moments_wall\` DROP COLUMN \`design_text_size\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_moments_wall\` DROP COLUMN \`design_background\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_moments_wall\` DROP COLUMN \`design_frame\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_moments_wall\` DROP COLUMN \`design_padding_top\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_moments_wall\` DROP COLUMN \`design_padding_bottom\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_moments_wall\` DROP COLUMN \`design_margin_bottom\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_moments_wall\` DROP COLUMN \`design_width\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_journal_teaser\` DROP COLUMN \`design_heading_size\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_journal_teaser\` DROP COLUMN \`design_heading_font\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_journal_teaser\` DROP COLUMN \`design_text_size\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_journal_teaser\` DROP COLUMN \`design_align\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_journal_teaser\` DROP COLUMN \`design_background\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_journal_teaser\` DROP COLUMN \`design_frame\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_journal_teaser\` DROP COLUMN \`design_padding_top\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_journal_teaser\` DROP COLUMN \`design_padding_bottom\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_journal_teaser\` DROP COLUMN \`design_margin_bottom\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_journal_teaser\` DROP COLUMN \`design_width\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_embed\` DROP COLUMN \`design_heading_size\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_embed\` DROP COLUMN \`design_heading_font\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_embed\` DROP COLUMN \`design_text_size\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_embed\` DROP COLUMN \`design_background\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_embed\` DROP COLUMN \`design_frame\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_embed\` DROP COLUMN \`design_padding_top\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_embed\` DROP COLUMN \`design_padding_bottom\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_embed\` DROP COLUMN \`design_margin_bottom\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_embed\` DROP COLUMN \`design_width\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_spacer\` DROP COLUMN \`design_heading_size\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_spacer\` DROP COLUMN \`design_heading_font\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_spacer\` DROP COLUMN \`design_text_size\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_spacer\` DROP COLUMN \`design_background\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_spacer\` DROP COLUMN \`design_frame\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_spacer\` DROP COLUMN \`design_padding_top\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_spacer\` DROP COLUMN \`design_padding_bottom\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_spacer\` DROP COLUMN \`design_margin_bottom\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_spacer\` DROP COLUMN \`design_width\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_reusable\` DROP COLUMN \`design_heading_size\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_reusable\` DROP COLUMN \`design_heading_font\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_reusable\` DROP COLUMN \`design_text_size\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_reusable\` DROP COLUMN \`design_background\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_reusable\` DROP COLUMN \`design_frame\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_reusable\` DROP COLUMN \`design_padding_top\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_reusable\` DROP COLUMN \`design_padding_bottom\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_reusable\` DROP COLUMN \`design_margin_bottom\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_blocks_reusable\` DROP COLUMN \`design_width\`;`)
  await db.run(sql`ALTER TABLE \`posts_blocks_h2\` DROP COLUMN \`anchor\`;`)
  await db.run(sql`ALTER TABLE \`posts_blocks_list\` DROP COLUMN \`style\`;`)
  await db.run(sql`ALTER TABLE \`_posts_v_blocks_h2\` DROP COLUMN \`anchor\`;`)
  await db.run(sql`ALTER TABLE \`_posts_v_blocks_list\` DROP COLUMN \`style\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_hero\` DROP COLUMN \`design_heading_size\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_hero\` DROP COLUMN \`design_heading_font\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_hero\` DROP COLUMN \`design_text_size\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_hero\` DROP COLUMN \`design_background\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_hero\` DROP COLUMN \`design_frame\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_hero\` DROP COLUMN \`design_padding_top\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_hero\` DROP COLUMN \`design_padding_bottom\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_hero\` DROP COLUMN \`design_margin_bottom\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_hero\` DROP COLUMN \`design_width\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_ticker\` DROP COLUMN \`design_heading_size\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_ticker\` DROP COLUMN \`design_heading_font\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_ticker\` DROP COLUMN \`design_text_size\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_ticker\` DROP COLUMN \`design_background\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_ticker\` DROP COLUMN \`design_frame\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_ticker\` DROP COLUMN \`design_padding_top\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_ticker\` DROP COLUMN \`design_padding_bottom\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_ticker\` DROP COLUMN \`design_margin_bottom\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_ticker\` DROP COLUMN \`design_width\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_offer_spotlight\` DROP COLUMN \`design_heading_size\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_offer_spotlight\` DROP COLUMN \`design_heading_font\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_offer_spotlight\` DROP COLUMN \`design_text_size\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_offer_spotlight\` DROP COLUMN \`design_align\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_offer_spotlight\` DROP COLUMN \`design_background\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_offer_spotlight\` DROP COLUMN \`design_frame\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_offer_spotlight\` DROP COLUMN \`design_padding_top\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_offer_spotlight\` DROP COLUMN \`design_padding_bottom\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_offer_spotlight\` DROP COLUMN \`design_margin_bottom\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_offer_spotlight\` DROP COLUMN \`design_width\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_countdown\` DROP COLUMN \`design_heading_size\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_countdown\` DROP COLUMN \`design_heading_font\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_countdown\` DROP COLUMN \`design_text_size\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_countdown\` DROP COLUMN \`design_align\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_countdown\` DROP COLUMN \`design_background\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_countdown\` DROP COLUMN \`design_frame\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_countdown\` DROP COLUMN \`design_padding_top\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_countdown\` DROP COLUMN \`design_padding_bottom\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_countdown\` DROP COLUMN \`design_margin_bottom\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_countdown\` DROP COLUMN \`design_width\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_cta_band\` DROP COLUMN \`design_heading_size\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_cta_band\` DROP COLUMN \`design_heading_font\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_cta_band\` DROP COLUMN \`design_text_size\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_cta_band\` DROP COLUMN \`design_align\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_cta_band\` DROP COLUMN \`design_background\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_cta_band\` DROP COLUMN \`design_frame\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_cta_band\` DROP COLUMN \`design_padding_top\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_cta_band\` DROP COLUMN \`design_padding_bottom\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_cta_band\` DROP COLUMN \`design_margin_bottom\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_cta_band\` DROP COLUMN \`design_width\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_ticket_cards\` DROP COLUMN \`design_heading_size\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_ticket_cards\` DROP COLUMN \`design_heading_font\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_ticket_cards\` DROP COLUMN \`design_text_size\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_ticket_cards\` DROP COLUMN \`design_background\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_ticket_cards\` DROP COLUMN \`design_frame\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_ticket_cards\` DROP COLUMN \`design_padding_top\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_ticket_cards\` DROP COLUMN \`design_padding_bottom\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_ticket_cards\` DROP COLUMN \`design_margin_bottom\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_ticket_cards\` DROP COLUMN \`design_width\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_offer_grid\` DROP COLUMN \`design_heading_size\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_offer_grid\` DROP COLUMN \`design_heading_font\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_offer_grid\` DROP COLUMN \`design_text_size\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_offer_grid\` DROP COLUMN \`design_background\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_offer_grid\` DROP COLUMN \`design_frame\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_offer_grid\` DROP COLUMN \`design_padding_top\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_offer_grid\` DROP COLUMN \`design_padding_bottom\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_offer_grid\` DROP COLUMN \`design_margin_bottom\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_offer_grid\` DROP COLUMN \`design_width\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_worlds_grid\` DROP COLUMN \`design_heading_size\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_worlds_grid\` DROP COLUMN \`design_heading_font\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_worlds_grid\` DROP COLUMN \`design_text_size\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_worlds_grid\` DROP COLUMN \`design_background\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_worlds_grid\` DROP COLUMN \`design_frame\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_worlds_grid\` DROP COLUMN \`design_padding_top\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_worlds_grid\` DROP COLUMN \`design_padding_bottom\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_worlds_grid\` DROP COLUMN \`design_margin_bottom\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_worlds_grid\` DROP COLUMN \`design_width\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_rides_list\` DROP COLUMN \`design_heading_size\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_rides_list\` DROP COLUMN \`design_heading_font\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_rides_list\` DROP COLUMN \`design_text_size\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_rides_list\` DROP COLUMN \`design_background\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_rides_list\` DROP COLUMN \`design_frame\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_rides_list\` DROP COLUMN \`design_padding_top\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_rides_list\` DROP COLUMN \`design_padding_bottom\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_rides_list\` DROP COLUMN \`design_margin_bottom\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_rides_list\` DROP COLUMN \`design_width\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_events_rail\` DROP COLUMN \`design_heading_size\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_events_rail\` DROP COLUMN \`design_heading_font\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_events_rail\` DROP COLUMN \`design_text_size\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_events_rail\` DROP COLUMN \`design_background\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_events_rail\` DROP COLUMN \`design_frame\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_events_rail\` DROP COLUMN \`design_padding_top\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_events_rail\` DROP COLUMN \`design_padding_bottom\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_events_rail\` DROP COLUMN \`design_margin_bottom\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_events_rail\` DROP COLUMN \`design_width\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_today_status\` DROP COLUMN \`design_heading_size\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_today_status\` DROP COLUMN \`design_heading_font\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_today_status\` DROP COLUMN \`design_text_size\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_today_status\` DROP COLUMN \`design_background\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_today_status\` DROP COLUMN \`design_frame\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_today_status\` DROP COLUMN \`design_padding_top\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_today_status\` DROP COLUMN \`design_padding_bottom\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_today_status\` DROP COLUMN \`design_margin_bottom\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_today_status\` DROP COLUMN \`design_width\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_crew_planner\` DROP COLUMN \`design_heading_size\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_crew_planner\` DROP COLUMN \`design_heading_font\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_crew_planner\` DROP COLUMN \`design_text_size\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_crew_planner\` DROP COLUMN \`design_background\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_crew_planner\` DROP COLUMN \`design_frame\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_crew_planner\` DROP COLUMN \`design_padding_top\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_crew_planner\` DROP COLUMN \`design_padding_bottom\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_crew_planner\` DROP COLUMN \`design_margin_bottom\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_crew_planner\` DROP COLUMN \`design_width\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_venues_grid\` DROP COLUMN \`design_heading_size\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_venues_grid\` DROP COLUMN \`design_heading_font\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_venues_grid\` DROP COLUMN \`design_text_size\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_venues_grid\` DROP COLUMN \`design_background\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_venues_grid\` DROP COLUMN \`design_frame\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_venues_grid\` DROP COLUMN \`design_padding_top\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_venues_grid\` DROP COLUMN \`design_padding_bottom\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_venues_grid\` DROP COLUMN \`design_margin_bottom\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_venues_grid\` DROP COLUMN \`design_width\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_map\` DROP COLUMN \`design_heading_size\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_map\` DROP COLUMN \`design_heading_font\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_map\` DROP COLUMN \`design_text_size\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_map\` DROP COLUMN \`design_align\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_map\` DROP COLUMN \`design_background\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_map\` DROP COLUMN \`design_frame\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_map\` DROP COLUMN \`design_padding_top\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_map\` DROP COLUMN \`design_padding_bottom\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_map\` DROP COLUMN \`design_margin_bottom\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_map\` DROP COLUMN \`design_width\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_stats\` DROP COLUMN \`design_heading_size\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_stats\` DROP COLUMN \`design_heading_font\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_stats\` DROP COLUMN \`design_text_size\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_stats\` DROP COLUMN \`design_align\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_stats\` DROP COLUMN \`design_background\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_stats\` DROP COLUMN \`design_frame\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_stats\` DROP COLUMN \`design_padding_top\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_stats\` DROP COLUMN \`design_padding_bottom\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_stats\` DROP COLUMN \`design_margin_bottom\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_stats\` DROP COLUMN \`design_width\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_image_text_locales\` DROP COLUMN \`secondary_label\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_columns\` DROP COLUMN \`design_heading_size\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_columns\` DROP COLUMN \`design_heading_font\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_columns\` DROP COLUMN \`design_text_size\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_columns\` DROP COLUMN \`design_align\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_columns\` DROP COLUMN \`design_background\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_columns\` DROP COLUMN \`design_frame\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_columns\` DROP COLUMN \`design_padding_top\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_columns\` DROP COLUMN \`design_padding_bottom\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_columns\` DROP COLUMN \`design_margin_bottom\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_columns\` DROP COLUMN \`design_width\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_rich_text\` DROP COLUMN \`design_heading_size\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_rich_text\` DROP COLUMN \`design_heading_font\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_rich_text\` DROP COLUMN \`design_text_size\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_rich_text\` DROP COLUMN \`design_align\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_rich_text\` DROP COLUMN \`design_background\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_rich_text\` DROP COLUMN \`design_frame\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_rich_text\` DROP COLUMN \`design_padding_top\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_rich_text\` DROP COLUMN \`design_padding_bottom\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_rich_text\` DROP COLUMN \`design_margin_bottom\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_rich_text\` DROP COLUMN \`design_width\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_video\` DROP COLUMN \`design_heading_size\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_video\` DROP COLUMN \`design_heading_font\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_video\` DROP COLUMN \`design_text_size\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_video\` DROP COLUMN \`design_align\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_video\` DROP COLUMN \`design_background\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_video\` DROP COLUMN \`design_frame\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_video\` DROP COLUMN \`design_padding_top\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_video\` DROP COLUMN \`design_padding_bottom\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_video\` DROP COLUMN \`design_margin_bottom\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_video\` DROP COLUMN \`design_width\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_gallery\` DROP COLUMN \`columns\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_gallery\` DROP COLUMN \`design_heading_size\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_gallery\` DROP COLUMN \`design_heading_font\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_gallery\` DROP COLUMN \`design_text_size\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_gallery\` DROP COLUMN \`design_align\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_gallery\` DROP COLUMN \`design_background\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_gallery\` DROP COLUMN \`design_frame\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_gallery\` DROP COLUMN \`design_padding_top\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_gallery\` DROP COLUMN \`design_padding_bottom\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_gallery\` DROP COLUMN \`design_margin_bottom\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_gallery\` DROP COLUMN \`design_width\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_testimonials\` DROP COLUMN \`design_heading_size\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_testimonials\` DROP COLUMN \`design_heading_font\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_testimonials\` DROP COLUMN \`design_text_size\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_testimonials\` DROP COLUMN \`design_align\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_testimonials\` DROP COLUMN \`design_background\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_testimonials\` DROP COLUMN \`design_frame\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_testimonials\` DROP COLUMN \`design_padding_top\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_testimonials\` DROP COLUMN \`design_padding_bottom\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_testimonials\` DROP COLUMN \`design_margin_bottom\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_testimonials\` DROP COLUMN \`design_width\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_logo_strip\` DROP COLUMN \`design_heading_size\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_logo_strip\` DROP COLUMN \`design_heading_font\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_logo_strip\` DROP COLUMN \`design_text_size\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_logo_strip\` DROP COLUMN \`design_align\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_logo_strip\` DROP COLUMN \`design_background\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_logo_strip\` DROP COLUMN \`design_frame\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_logo_strip\` DROP COLUMN \`design_padding_top\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_logo_strip\` DROP COLUMN \`design_padding_bottom\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_logo_strip\` DROP COLUMN \`design_margin_bottom\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_logo_strip\` DROP COLUMN \`design_width\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_faq\` DROP COLUMN \`design_heading_size\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_faq\` DROP COLUMN \`design_heading_font\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_faq\` DROP COLUMN \`design_text_size\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_faq\` DROP COLUMN \`design_align\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_faq\` DROP COLUMN \`design_background\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_faq\` DROP COLUMN \`design_frame\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_faq\` DROP COLUMN \`design_padding_top\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_faq\` DROP COLUMN \`design_padding_bottom\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_faq\` DROP COLUMN \`design_margin_bottom\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_faq\` DROP COLUMN \`design_width\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_lead_form\` DROP COLUMN \`design_heading_size\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_lead_form\` DROP COLUMN \`design_heading_font\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_lead_form\` DROP COLUMN \`design_text_size\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_lead_form\` DROP COLUMN \`design_align\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_lead_form\` DROP COLUMN \`design_background\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_lead_form\` DROP COLUMN \`design_frame\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_lead_form\` DROP COLUMN \`design_padding_top\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_lead_form\` DROP COLUMN \`design_padding_bottom\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_lead_form\` DROP COLUMN \`design_margin_bottom\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_lead_form\` DROP COLUMN \`design_width\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_moments_wall\` DROP COLUMN \`design_heading_size\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_moments_wall\` DROP COLUMN \`design_heading_font\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_moments_wall\` DROP COLUMN \`design_text_size\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_moments_wall\` DROP COLUMN \`design_background\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_moments_wall\` DROP COLUMN \`design_frame\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_moments_wall\` DROP COLUMN \`design_padding_top\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_moments_wall\` DROP COLUMN \`design_padding_bottom\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_moments_wall\` DROP COLUMN \`design_margin_bottom\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_moments_wall\` DROP COLUMN \`design_width\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_journal_teaser\` DROP COLUMN \`design_heading_size\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_journal_teaser\` DROP COLUMN \`design_heading_font\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_journal_teaser\` DROP COLUMN \`design_text_size\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_journal_teaser\` DROP COLUMN \`design_align\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_journal_teaser\` DROP COLUMN \`design_background\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_journal_teaser\` DROP COLUMN \`design_frame\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_journal_teaser\` DROP COLUMN \`design_padding_top\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_journal_teaser\` DROP COLUMN \`design_padding_bottom\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_journal_teaser\` DROP COLUMN \`design_margin_bottom\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_journal_teaser\` DROP COLUMN \`design_width\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_embed\` DROP COLUMN \`design_heading_size\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_embed\` DROP COLUMN \`design_heading_font\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_embed\` DROP COLUMN \`design_text_size\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_embed\` DROP COLUMN \`design_background\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_embed\` DROP COLUMN \`design_frame\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_embed\` DROP COLUMN \`design_padding_top\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_embed\` DROP COLUMN \`design_padding_bottom\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_embed\` DROP COLUMN \`design_margin_bottom\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_embed\` DROP COLUMN \`design_width\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_spacer\` DROP COLUMN \`design_heading_size\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_spacer\` DROP COLUMN \`design_heading_font\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_spacer\` DROP COLUMN \`design_text_size\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_spacer\` DROP COLUMN \`design_background\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_spacer\` DROP COLUMN \`design_frame\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_spacer\` DROP COLUMN \`design_padding_top\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_spacer\` DROP COLUMN \`design_padding_bottom\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_spacer\` DROP COLUMN \`design_margin_bottom\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_spacer\` DROP COLUMN \`design_width\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_reusable\` DROP COLUMN \`design_heading_size\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_reusable\` DROP COLUMN \`design_heading_font\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_reusable\` DROP COLUMN \`design_text_size\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_reusable\` DROP COLUMN \`design_background\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_reusable\` DROP COLUMN \`design_frame\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_reusable\` DROP COLUMN \`design_padding_top\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_reusable\` DROP COLUMN \`design_padding_bottom\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_reusable\` DROP COLUMN \`design_margin_bottom\`;`)
  await db.run(sql`ALTER TABLE \`worlds_blocks_reusable\` DROP COLUMN \`design_width\`;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_hero\` DROP COLUMN \`design_heading_size\`;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_hero\` DROP COLUMN \`design_heading_font\`;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_hero\` DROP COLUMN \`design_text_size\`;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_hero\` DROP COLUMN \`design_background\`;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_hero\` DROP COLUMN \`design_frame\`;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_hero\` DROP COLUMN \`design_padding_top\`;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_hero\` DROP COLUMN \`design_padding_bottom\`;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_hero\` DROP COLUMN \`design_margin_bottom\`;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_hero\` DROP COLUMN \`design_width\`;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_ticker\` DROP COLUMN \`design_heading_size\`;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_ticker\` DROP COLUMN \`design_heading_font\`;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_ticker\` DROP COLUMN \`design_text_size\`;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_ticker\` DROP COLUMN \`design_background\`;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_ticker\` DROP COLUMN \`design_frame\`;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_ticker\` DROP COLUMN \`design_padding_top\`;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_ticker\` DROP COLUMN \`design_padding_bottom\`;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_ticker\` DROP COLUMN \`design_margin_bottom\`;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_ticker\` DROP COLUMN \`design_width\`;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_offer_spotlight\` DROP COLUMN \`design_heading_size\`;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_offer_spotlight\` DROP COLUMN \`design_heading_font\`;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_offer_spotlight\` DROP COLUMN \`design_text_size\`;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_offer_spotlight\` DROP COLUMN \`design_align\`;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_offer_spotlight\` DROP COLUMN \`design_background\`;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_offer_spotlight\` DROP COLUMN \`design_frame\`;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_offer_spotlight\` DROP COLUMN \`design_padding_top\`;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_offer_spotlight\` DROP COLUMN \`design_padding_bottom\`;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_offer_spotlight\` DROP COLUMN \`design_margin_bottom\`;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_offer_spotlight\` DROP COLUMN \`design_width\`;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_countdown\` DROP COLUMN \`design_heading_size\`;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_countdown\` DROP COLUMN \`design_heading_font\`;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_countdown\` DROP COLUMN \`design_text_size\`;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_countdown\` DROP COLUMN \`design_align\`;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_countdown\` DROP COLUMN \`design_background\`;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_countdown\` DROP COLUMN \`design_frame\`;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_countdown\` DROP COLUMN \`design_padding_top\`;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_countdown\` DROP COLUMN \`design_padding_bottom\`;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_countdown\` DROP COLUMN \`design_margin_bottom\`;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_countdown\` DROP COLUMN \`design_width\`;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_cta_band\` DROP COLUMN \`design_heading_size\`;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_cta_band\` DROP COLUMN \`design_heading_font\`;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_cta_band\` DROP COLUMN \`design_text_size\`;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_cta_band\` DROP COLUMN \`design_align\`;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_cta_band\` DROP COLUMN \`design_background\`;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_cta_band\` DROP COLUMN \`design_frame\`;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_cta_band\` DROP COLUMN \`design_padding_top\`;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_cta_band\` DROP COLUMN \`design_padding_bottom\`;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_cta_band\` DROP COLUMN \`design_margin_bottom\`;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_cta_band\` DROP COLUMN \`design_width\`;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_ticket_cards\` DROP COLUMN \`design_heading_size\`;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_ticket_cards\` DROP COLUMN \`design_heading_font\`;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_ticket_cards\` DROP COLUMN \`design_text_size\`;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_ticket_cards\` DROP COLUMN \`design_background\`;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_ticket_cards\` DROP COLUMN \`design_frame\`;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_ticket_cards\` DROP COLUMN \`design_padding_top\`;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_ticket_cards\` DROP COLUMN \`design_padding_bottom\`;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_ticket_cards\` DROP COLUMN \`design_margin_bottom\`;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_ticket_cards\` DROP COLUMN \`design_width\`;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_offer_grid\` DROP COLUMN \`design_heading_size\`;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_offer_grid\` DROP COLUMN \`design_heading_font\`;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_offer_grid\` DROP COLUMN \`design_text_size\`;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_offer_grid\` DROP COLUMN \`design_background\`;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_offer_grid\` DROP COLUMN \`design_frame\`;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_offer_grid\` DROP COLUMN \`design_padding_top\`;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_offer_grid\` DROP COLUMN \`design_padding_bottom\`;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_offer_grid\` DROP COLUMN \`design_margin_bottom\`;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_offer_grid\` DROP COLUMN \`design_width\`;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_worlds_grid\` DROP COLUMN \`design_heading_size\`;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_worlds_grid\` DROP COLUMN \`design_heading_font\`;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_worlds_grid\` DROP COLUMN \`design_text_size\`;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_worlds_grid\` DROP COLUMN \`design_background\`;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_worlds_grid\` DROP COLUMN \`design_frame\`;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_worlds_grid\` DROP COLUMN \`design_padding_top\`;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_worlds_grid\` DROP COLUMN \`design_padding_bottom\`;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_worlds_grid\` DROP COLUMN \`design_margin_bottom\`;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_worlds_grid\` DROP COLUMN \`design_width\`;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_rides_list\` DROP COLUMN \`design_heading_size\`;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_rides_list\` DROP COLUMN \`design_heading_font\`;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_rides_list\` DROP COLUMN \`design_text_size\`;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_rides_list\` DROP COLUMN \`design_background\`;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_rides_list\` DROP COLUMN \`design_frame\`;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_rides_list\` DROP COLUMN \`design_padding_top\`;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_rides_list\` DROP COLUMN \`design_padding_bottom\`;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_rides_list\` DROP COLUMN \`design_margin_bottom\`;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_rides_list\` DROP COLUMN \`design_width\`;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_events_rail\` DROP COLUMN \`design_heading_size\`;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_events_rail\` DROP COLUMN \`design_heading_font\`;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_events_rail\` DROP COLUMN \`design_text_size\`;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_events_rail\` DROP COLUMN \`design_background\`;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_events_rail\` DROP COLUMN \`design_frame\`;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_events_rail\` DROP COLUMN \`design_padding_top\`;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_events_rail\` DROP COLUMN \`design_padding_bottom\`;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_events_rail\` DROP COLUMN \`design_margin_bottom\`;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_events_rail\` DROP COLUMN \`design_width\`;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_today_status\` DROP COLUMN \`design_heading_size\`;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_today_status\` DROP COLUMN \`design_heading_font\`;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_today_status\` DROP COLUMN \`design_text_size\`;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_today_status\` DROP COLUMN \`design_background\`;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_today_status\` DROP COLUMN \`design_frame\`;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_today_status\` DROP COLUMN \`design_padding_top\`;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_today_status\` DROP COLUMN \`design_padding_bottom\`;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_today_status\` DROP COLUMN \`design_margin_bottom\`;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_today_status\` DROP COLUMN \`design_width\`;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_crew_planner\` DROP COLUMN \`design_heading_size\`;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_crew_planner\` DROP COLUMN \`design_heading_font\`;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_crew_planner\` DROP COLUMN \`design_text_size\`;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_crew_planner\` DROP COLUMN \`design_background\`;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_crew_planner\` DROP COLUMN \`design_frame\`;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_crew_planner\` DROP COLUMN \`design_padding_top\`;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_crew_planner\` DROP COLUMN \`design_padding_bottom\`;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_crew_planner\` DROP COLUMN \`design_margin_bottom\`;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_crew_planner\` DROP COLUMN \`design_width\`;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_venues_grid\` DROP COLUMN \`design_heading_size\`;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_venues_grid\` DROP COLUMN \`design_heading_font\`;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_venues_grid\` DROP COLUMN \`design_text_size\`;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_venues_grid\` DROP COLUMN \`design_background\`;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_venues_grid\` DROP COLUMN \`design_frame\`;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_venues_grid\` DROP COLUMN \`design_padding_top\`;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_venues_grid\` DROP COLUMN \`design_padding_bottom\`;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_venues_grid\` DROP COLUMN \`design_margin_bottom\`;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_venues_grid\` DROP COLUMN \`design_width\`;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_map\` DROP COLUMN \`design_heading_size\`;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_map\` DROP COLUMN \`design_heading_font\`;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_map\` DROP COLUMN \`design_text_size\`;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_map\` DROP COLUMN \`design_align\`;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_map\` DROP COLUMN \`design_background\`;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_map\` DROP COLUMN \`design_frame\`;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_map\` DROP COLUMN \`design_padding_top\`;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_map\` DROP COLUMN \`design_padding_bottom\`;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_map\` DROP COLUMN \`design_margin_bottom\`;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_map\` DROP COLUMN \`design_width\`;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_stats\` DROP COLUMN \`design_heading_size\`;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_stats\` DROP COLUMN \`design_heading_font\`;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_stats\` DROP COLUMN \`design_text_size\`;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_stats\` DROP COLUMN \`design_align\`;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_stats\` DROP COLUMN \`design_background\`;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_stats\` DROP COLUMN \`design_frame\`;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_stats\` DROP COLUMN \`design_padding_top\`;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_stats\` DROP COLUMN \`design_padding_bottom\`;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_stats\` DROP COLUMN \`design_margin_bottom\`;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_stats\` DROP COLUMN \`design_width\`;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_image_text_locales\` DROP COLUMN \`secondary_label\`;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_columns\` DROP COLUMN \`design_heading_size\`;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_columns\` DROP COLUMN \`design_heading_font\`;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_columns\` DROP COLUMN \`design_text_size\`;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_columns\` DROP COLUMN \`design_align\`;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_columns\` DROP COLUMN \`design_background\`;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_columns\` DROP COLUMN \`design_frame\`;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_columns\` DROP COLUMN \`design_padding_top\`;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_columns\` DROP COLUMN \`design_padding_bottom\`;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_columns\` DROP COLUMN \`design_margin_bottom\`;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_columns\` DROP COLUMN \`design_width\`;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_rich_text\` DROP COLUMN \`design_heading_size\`;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_rich_text\` DROP COLUMN \`design_heading_font\`;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_rich_text\` DROP COLUMN \`design_text_size\`;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_rich_text\` DROP COLUMN \`design_align\`;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_rich_text\` DROP COLUMN \`design_background\`;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_rich_text\` DROP COLUMN \`design_frame\`;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_rich_text\` DROP COLUMN \`design_padding_top\`;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_rich_text\` DROP COLUMN \`design_padding_bottom\`;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_rich_text\` DROP COLUMN \`design_margin_bottom\`;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_rich_text\` DROP COLUMN \`design_width\`;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_video\` DROP COLUMN \`design_heading_size\`;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_video\` DROP COLUMN \`design_heading_font\`;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_video\` DROP COLUMN \`design_text_size\`;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_video\` DROP COLUMN \`design_align\`;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_video\` DROP COLUMN \`design_background\`;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_video\` DROP COLUMN \`design_frame\`;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_video\` DROP COLUMN \`design_padding_top\`;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_video\` DROP COLUMN \`design_padding_bottom\`;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_video\` DROP COLUMN \`design_margin_bottom\`;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_video\` DROP COLUMN \`design_width\`;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_gallery\` DROP COLUMN \`columns\`;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_gallery\` DROP COLUMN \`design_heading_size\`;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_gallery\` DROP COLUMN \`design_heading_font\`;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_gallery\` DROP COLUMN \`design_text_size\`;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_gallery\` DROP COLUMN \`design_align\`;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_gallery\` DROP COLUMN \`design_background\`;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_gallery\` DROP COLUMN \`design_frame\`;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_gallery\` DROP COLUMN \`design_padding_top\`;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_gallery\` DROP COLUMN \`design_padding_bottom\`;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_gallery\` DROP COLUMN \`design_margin_bottom\`;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_gallery\` DROP COLUMN \`design_width\`;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_testimonials\` DROP COLUMN \`design_heading_size\`;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_testimonials\` DROP COLUMN \`design_heading_font\`;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_testimonials\` DROP COLUMN \`design_text_size\`;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_testimonials\` DROP COLUMN \`design_align\`;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_testimonials\` DROP COLUMN \`design_background\`;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_testimonials\` DROP COLUMN \`design_frame\`;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_testimonials\` DROP COLUMN \`design_padding_top\`;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_testimonials\` DROP COLUMN \`design_padding_bottom\`;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_testimonials\` DROP COLUMN \`design_margin_bottom\`;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_testimonials\` DROP COLUMN \`design_width\`;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_logo_strip\` DROP COLUMN \`design_heading_size\`;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_logo_strip\` DROP COLUMN \`design_heading_font\`;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_logo_strip\` DROP COLUMN \`design_text_size\`;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_logo_strip\` DROP COLUMN \`design_align\`;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_logo_strip\` DROP COLUMN \`design_background\`;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_logo_strip\` DROP COLUMN \`design_frame\`;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_logo_strip\` DROP COLUMN \`design_padding_top\`;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_logo_strip\` DROP COLUMN \`design_padding_bottom\`;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_logo_strip\` DROP COLUMN \`design_margin_bottom\`;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_logo_strip\` DROP COLUMN \`design_width\`;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_faq\` DROP COLUMN \`design_heading_size\`;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_faq\` DROP COLUMN \`design_heading_font\`;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_faq\` DROP COLUMN \`design_text_size\`;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_faq\` DROP COLUMN \`design_align\`;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_faq\` DROP COLUMN \`design_background\`;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_faq\` DROP COLUMN \`design_frame\`;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_faq\` DROP COLUMN \`design_padding_top\`;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_faq\` DROP COLUMN \`design_padding_bottom\`;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_faq\` DROP COLUMN \`design_margin_bottom\`;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_faq\` DROP COLUMN \`design_width\`;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_lead_form\` DROP COLUMN \`design_heading_size\`;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_lead_form\` DROP COLUMN \`design_heading_font\`;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_lead_form\` DROP COLUMN \`design_text_size\`;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_lead_form\` DROP COLUMN \`design_align\`;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_lead_form\` DROP COLUMN \`design_background\`;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_lead_form\` DROP COLUMN \`design_frame\`;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_lead_form\` DROP COLUMN \`design_padding_top\`;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_lead_form\` DROP COLUMN \`design_padding_bottom\`;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_lead_form\` DROP COLUMN \`design_margin_bottom\`;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_lead_form\` DROP COLUMN \`design_width\`;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_moments_wall\` DROP COLUMN \`design_heading_size\`;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_moments_wall\` DROP COLUMN \`design_heading_font\`;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_moments_wall\` DROP COLUMN \`design_text_size\`;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_moments_wall\` DROP COLUMN \`design_background\`;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_moments_wall\` DROP COLUMN \`design_frame\`;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_moments_wall\` DROP COLUMN \`design_padding_top\`;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_moments_wall\` DROP COLUMN \`design_padding_bottom\`;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_moments_wall\` DROP COLUMN \`design_margin_bottom\`;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_moments_wall\` DROP COLUMN \`design_width\`;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_journal_teaser\` DROP COLUMN \`design_heading_size\`;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_journal_teaser\` DROP COLUMN \`design_heading_font\`;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_journal_teaser\` DROP COLUMN \`design_text_size\`;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_journal_teaser\` DROP COLUMN \`design_align\`;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_journal_teaser\` DROP COLUMN \`design_background\`;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_journal_teaser\` DROP COLUMN \`design_frame\`;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_journal_teaser\` DROP COLUMN \`design_padding_top\`;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_journal_teaser\` DROP COLUMN \`design_padding_bottom\`;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_journal_teaser\` DROP COLUMN \`design_margin_bottom\`;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_journal_teaser\` DROP COLUMN \`design_width\`;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_embed\` DROP COLUMN \`design_heading_size\`;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_embed\` DROP COLUMN \`design_heading_font\`;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_embed\` DROP COLUMN \`design_text_size\`;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_embed\` DROP COLUMN \`design_background\`;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_embed\` DROP COLUMN \`design_frame\`;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_embed\` DROP COLUMN \`design_padding_top\`;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_embed\` DROP COLUMN \`design_padding_bottom\`;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_embed\` DROP COLUMN \`design_margin_bottom\`;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_embed\` DROP COLUMN \`design_width\`;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_spacer\` DROP COLUMN \`design_heading_size\`;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_spacer\` DROP COLUMN \`design_heading_font\`;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_spacer\` DROP COLUMN \`design_text_size\`;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_spacer\` DROP COLUMN \`design_background\`;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_spacer\` DROP COLUMN \`design_frame\`;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_spacer\` DROP COLUMN \`design_padding_top\`;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_spacer\` DROP COLUMN \`design_padding_bottom\`;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_spacer\` DROP COLUMN \`design_margin_bottom\`;`)
  await db.run(sql`ALTER TABLE \`sections_blocks_spacer\` DROP COLUMN \`design_width\`;`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_hero\` DROP COLUMN \`design_heading_size\`;`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_hero\` DROP COLUMN \`design_heading_font\`;`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_hero\` DROP COLUMN \`design_text_size\`;`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_hero\` DROP COLUMN \`design_background\`;`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_hero\` DROP COLUMN \`design_frame\`;`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_hero\` DROP COLUMN \`design_padding_top\`;`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_hero\` DROP COLUMN \`design_padding_bottom\`;`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_hero\` DROP COLUMN \`design_margin_bottom\`;`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_hero\` DROP COLUMN \`design_width\`;`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_ticker\` DROP COLUMN \`design_heading_size\`;`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_ticker\` DROP COLUMN \`design_heading_font\`;`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_ticker\` DROP COLUMN \`design_text_size\`;`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_ticker\` DROP COLUMN \`design_background\`;`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_ticker\` DROP COLUMN \`design_frame\`;`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_ticker\` DROP COLUMN \`design_padding_top\`;`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_ticker\` DROP COLUMN \`design_padding_bottom\`;`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_ticker\` DROP COLUMN \`design_margin_bottom\`;`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_ticker\` DROP COLUMN \`design_width\`;`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_offer_spotlight\` DROP COLUMN \`design_heading_size\`;`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_offer_spotlight\` DROP COLUMN \`design_heading_font\`;`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_offer_spotlight\` DROP COLUMN \`design_text_size\`;`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_offer_spotlight\` DROP COLUMN \`design_align\`;`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_offer_spotlight\` DROP COLUMN \`design_background\`;`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_offer_spotlight\` DROP COLUMN \`design_frame\`;`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_offer_spotlight\` DROP COLUMN \`design_padding_top\`;`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_offer_spotlight\` DROP COLUMN \`design_padding_bottom\`;`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_offer_spotlight\` DROP COLUMN \`design_margin_bottom\`;`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_offer_spotlight\` DROP COLUMN \`design_width\`;`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_countdown\` DROP COLUMN \`design_heading_size\`;`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_countdown\` DROP COLUMN \`design_heading_font\`;`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_countdown\` DROP COLUMN \`design_text_size\`;`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_countdown\` DROP COLUMN \`design_align\`;`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_countdown\` DROP COLUMN \`design_background\`;`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_countdown\` DROP COLUMN \`design_frame\`;`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_countdown\` DROP COLUMN \`design_padding_top\`;`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_countdown\` DROP COLUMN \`design_padding_bottom\`;`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_countdown\` DROP COLUMN \`design_margin_bottom\`;`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_countdown\` DROP COLUMN \`design_width\`;`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_cta_band\` DROP COLUMN \`design_heading_size\`;`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_cta_band\` DROP COLUMN \`design_heading_font\`;`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_cta_band\` DROP COLUMN \`design_text_size\`;`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_cta_band\` DROP COLUMN \`design_align\`;`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_cta_band\` DROP COLUMN \`design_background\`;`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_cta_band\` DROP COLUMN \`design_frame\`;`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_cta_band\` DROP COLUMN \`design_padding_top\`;`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_cta_band\` DROP COLUMN \`design_padding_bottom\`;`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_cta_band\` DROP COLUMN \`design_margin_bottom\`;`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_cta_band\` DROP COLUMN \`design_width\`;`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_ticket_cards\` DROP COLUMN \`design_heading_size\`;`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_ticket_cards\` DROP COLUMN \`design_heading_font\`;`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_ticket_cards\` DROP COLUMN \`design_text_size\`;`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_ticket_cards\` DROP COLUMN \`design_background\`;`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_ticket_cards\` DROP COLUMN \`design_frame\`;`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_ticket_cards\` DROP COLUMN \`design_padding_top\`;`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_ticket_cards\` DROP COLUMN \`design_padding_bottom\`;`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_ticket_cards\` DROP COLUMN \`design_margin_bottom\`;`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_ticket_cards\` DROP COLUMN \`design_width\`;`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_offer_grid\` DROP COLUMN \`design_heading_size\`;`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_offer_grid\` DROP COLUMN \`design_heading_font\`;`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_offer_grid\` DROP COLUMN \`design_text_size\`;`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_offer_grid\` DROP COLUMN \`design_background\`;`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_offer_grid\` DROP COLUMN \`design_frame\`;`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_offer_grid\` DROP COLUMN \`design_padding_top\`;`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_offer_grid\` DROP COLUMN \`design_padding_bottom\`;`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_offer_grid\` DROP COLUMN \`design_margin_bottom\`;`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_offer_grid\` DROP COLUMN \`design_width\`;`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_worlds_grid\` DROP COLUMN \`design_heading_size\`;`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_worlds_grid\` DROP COLUMN \`design_heading_font\`;`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_worlds_grid\` DROP COLUMN \`design_text_size\`;`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_worlds_grid\` DROP COLUMN \`design_background\`;`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_worlds_grid\` DROP COLUMN \`design_frame\`;`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_worlds_grid\` DROP COLUMN \`design_padding_top\`;`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_worlds_grid\` DROP COLUMN \`design_padding_bottom\`;`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_worlds_grid\` DROP COLUMN \`design_margin_bottom\`;`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_worlds_grid\` DROP COLUMN \`design_width\`;`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_rides_list\` DROP COLUMN \`design_heading_size\`;`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_rides_list\` DROP COLUMN \`design_heading_font\`;`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_rides_list\` DROP COLUMN \`design_text_size\`;`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_rides_list\` DROP COLUMN \`design_background\`;`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_rides_list\` DROP COLUMN \`design_frame\`;`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_rides_list\` DROP COLUMN \`design_padding_top\`;`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_rides_list\` DROP COLUMN \`design_padding_bottom\`;`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_rides_list\` DROP COLUMN \`design_margin_bottom\`;`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_rides_list\` DROP COLUMN \`design_width\`;`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_events_rail\` DROP COLUMN \`design_heading_size\`;`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_events_rail\` DROP COLUMN \`design_heading_font\`;`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_events_rail\` DROP COLUMN \`design_text_size\`;`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_events_rail\` DROP COLUMN \`design_background\`;`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_events_rail\` DROP COLUMN \`design_frame\`;`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_events_rail\` DROP COLUMN \`design_padding_top\`;`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_events_rail\` DROP COLUMN \`design_padding_bottom\`;`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_events_rail\` DROP COLUMN \`design_margin_bottom\`;`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_events_rail\` DROP COLUMN \`design_width\`;`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_today_status\` DROP COLUMN \`design_heading_size\`;`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_today_status\` DROP COLUMN \`design_heading_font\`;`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_today_status\` DROP COLUMN \`design_text_size\`;`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_today_status\` DROP COLUMN \`design_background\`;`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_today_status\` DROP COLUMN \`design_frame\`;`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_today_status\` DROP COLUMN \`design_padding_top\`;`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_today_status\` DROP COLUMN \`design_padding_bottom\`;`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_today_status\` DROP COLUMN \`design_margin_bottom\`;`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_today_status\` DROP COLUMN \`design_width\`;`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_crew_planner\` DROP COLUMN \`design_heading_size\`;`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_crew_planner\` DROP COLUMN \`design_heading_font\`;`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_crew_planner\` DROP COLUMN \`design_text_size\`;`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_crew_planner\` DROP COLUMN \`design_background\`;`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_crew_planner\` DROP COLUMN \`design_frame\`;`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_crew_planner\` DROP COLUMN \`design_padding_top\`;`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_crew_planner\` DROP COLUMN \`design_padding_bottom\`;`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_crew_planner\` DROP COLUMN \`design_margin_bottom\`;`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_crew_planner\` DROP COLUMN \`design_width\`;`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_venues_grid\` DROP COLUMN \`design_heading_size\`;`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_venues_grid\` DROP COLUMN \`design_heading_font\`;`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_venues_grid\` DROP COLUMN \`design_text_size\`;`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_venues_grid\` DROP COLUMN \`design_background\`;`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_venues_grid\` DROP COLUMN \`design_frame\`;`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_venues_grid\` DROP COLUMN \`design_padding_top\`;`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_venues_grid\` DROP COLUMN \`design_padding_bottom\`;`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_venues_grid\` DROP COLUMN \`design_margin_bottom\`;`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_venues_grid\` DROP COLUMN \`design_width\`;`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_map\` DROP COLUMN \`design_heading_size\`;`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_map\` DROP COLUMN \`design_heading_font\`;`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_map\` DROP COLUMN \`design_text_size\`;`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_map\` DROP COLUMN \`design_align\`;`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_map\` DROP COLUMN \`design_background\`;`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_map\` DROP COLUMN \`design_frame\`;`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_map\` DROP COLUMN \`design_padding_top\`;`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_map\` DROP COLUMN \`design_padding_bottom\`;`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_map\` DROP COLUMN \`design_margin_bottom\`;`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_map\` DROP COLUMN \`design_width\`;`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_stats\` DROP COLUMN \`design_heading_size\`;`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_stats\` DROP COLUMN \`design_heading_font\`;`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_stats\` DROP COLUMN \`design_text_size\`;`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_stats\` DROP COLUMN \`design_align\`;`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_stats\` DROP COLUMN \`design_background\`;`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_stats\` DROP COLUMN \`design_frame\`;`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_stats\` DROP COLUMN \`design_padding_top\`;`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_stats\` DROP COLUMN \`design_padding_bottom\`;`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_stats\` DROP COLUMN \`design_margin_bottom\`;`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_stats\` DROP COLUMN \`design_width\`;`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_image_text_locales\` DROP COLUMN \`secondary_label\`;`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_columns\` DROP COLUMN \`design_heading_size\`;`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_columns\` DROP COLUMN \`design_heading_font\`;`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_columns\` DROP COLUMN \`design_text_size\`;`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_columns\` DROP COLUMN \`design_align\`;`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_columns\` DROP COLUMN \`design_background\`;`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_columns\` DROP COLUMN \`design_frame\`;`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_columns\` DROP COLUMN \`design_padding_top\`;`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_columns\` DROP COLUMN \`design_padding_bottom\`;`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_columns\` DROP COLUMN \`design_margin_bottom\`;`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_columns\` DROP COLUMN \`design_width\`;`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_rich_text\` DROP COLUMN \`design_heading_size\`;`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_rich_text\` DROP COLUMN \`design_heading_font\`;`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_rich_text\` DROP COLUMN \`design_text_size\`;`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_rich_text\` DROP COLUMN \`design_align\`;`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_rich_text\` DROP COLUMN \`design_background\`;`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_rich_text\` DROP COLUMN \`design_frame\`;`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_rich_text\` DROP COLUMN \`design_padding_top\`;`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_rich_text\` DROP COLUMN \`design_padding_bottom\`;`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_rich_text\` DROP COLUMN \`design_margin_bottom\`;`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_rich_text\` DROP COLUMN \`design_width\`;`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_video\` DROP COLUMN \`design_heading_size\`;`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_video\` DROP COLUMN \`design_heading_font\`;`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_video\` DROP COLUMN \`design_text_size\`;`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_video\` DROP COLUMN \`design_align\`;`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_video\` DROP COLUMN \`design_background\`;`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_video\` DROP COLUMN \`design_frame\`;`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_video\` DROP COLUMN \`design_padding_top\`;`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_video\` DROP COLUMN \`design_padding_bottom\`;`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_video\` DROP COLUMN \`design_margin_bottom\`;`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_video\` DROP COLUMN \`design_width\`;`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_gallery\` DROP COLUMN \`columns\`;`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_gallery\` DROP COLUMN \`design_heading_size\`;`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_gallery\` DROP COLUMN \`design_heading_font\`;`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_gallery\` DROP COLUMN \`design_text_size\`;`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_gallery\` DROP COLUMN \`design_align\`;`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_gallery\` DROP COLUMN \`design_background\`;`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_gallery\` DROP COLUMN \`design_frame\`;`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_gallery\` DROP COLUMN \`design_padding_top\`;`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_gallery\` DROP COLUMN \`design_padding_bottom\`;`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_gallery\` DROP COLUMN \`design_margin_bottom\`;`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_gallery\` DROP COLUMN \`design_width\`;`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_testimonials\` DROP COLUMN \`design_heading_size\`;`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_testimonials\` DROP COLUMN \`design_heading_font\`;`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_testimonials\` DROP COLUMN \`design_text_size\`;`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_testimonials\` DROP COLUMN \`design_align\`;`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_testimonials\` DROP COLUMN \`design_background\`;`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_testimonials\` DROP COLUMN \`design_frame\`;`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_testimonials\` DROP COLUMN \`design_padding_top\`;`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_testimonials\` DROP COLUMN \`design_padding_bottom\`;`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_testimonials\` DROP COLUMN \`design_margin_bottom\`;`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_testimonials\` DROP COLUMN \`design_width\`;`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_logo_strip\` DROP COLUMN \`design_heading_size\`;`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_logo_strip\` DROP COLUMN \`design_heading_font\`;`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_logo_strip\` DROP COLUMN \`design_text_size\`;`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_logo_strip\` DROP COLUMN \`design_align\`;`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_logo_strip\` DROP COLUMN \`design_background\`;`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_logo_strip\` DROP COLUMN \`design_frame\`;`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_logo_strip\` DROP COLUMN \`design_padding_top\`;`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_logo_strip\` DROP COLUMN \`design_padding_bottom\`;`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_logo_strip\` DROP COLUMN \`design_margin_bottom\`;`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_logo_strip\` DROP COLUMN \`design_width\`;`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_faq\` DROP COLUMN \`design_heading_size\`;`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_faq\` DROP COLUMN \`design_heading_font\`;`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_faq\` DROP COLUMN \`design_text_size\`;`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_faq\` DROP COLUMN \`design_align\`;`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_faq\` DROP COLUMN \`design_background\`;`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_faq\` DROP COLUMN \`design_frame\`;`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_faq\` DROP COLUMN \`design_padding_top\`;`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_faq\` DROP COLUMN \`design_padding_bottom\`;`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_faq\` DROP COLUMN \`design_margin_bottom\`;`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_faq\` DROP COLUMN \`design_width\`;`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_lead_form\` DROP COLUMN \`design_heading_size\`;`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_lead_form\` DROP COLUMN \`design_heading_font\`;`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_lead_form\` DROP COLUMN \`design_text_size\`;`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_lead_form\` DROP COLUMN \`design_align\`;`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_lead_form\` DROP COLUMN \`design_background\`;`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_lead_form\` DROP COLUMN \`design_frame\`;`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_lead_form\` DROP COLUMN \`design_padding_top\`;`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_lead_form\` DROP COLUMN \`design_padding_bottom\`;`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_lead_form\` DROP COLUMN \`design_margin_bottom\`;`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_lead_form\` DROP COLUMN \`design_width\`;`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_moments_wall\` DROP COLUMN \`design_heading_size\`;`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_moments_wall\` DROP COLUMN \`design_heading_font\`;`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_moments_wall\` DROP COLUMN \`design_text_size\`;`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_moments_wall\` DROP COLUMN \`design_background\`;`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_moments_wall\` DROP COLUMN \`design_frame\`;`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_moments_wall\` DROP COLUMN \`design_padding_top\`;`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_moments_wall\` DROP COLUMN \`design_padding_bottom\`;`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_moments_wall\` DROP COLUMN \`design_margin_bottom\`;`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_moments_wall\` DROP COLUMN \`design_width\`;`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_journal_teaser\` DROP COLUMN \`design_heading_size\`;`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_journal_teaser\` DROP COLUMN \`design_heading_font\`;`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_journal_teaser\` DROP COLUMN \`design_text_size\`;`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_journal_teaser\` DROP COLUMN \`design_align\`;`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_journal_teaser\` DROP COLUMN \`design_background\`;`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_journal_teaser\` DROP COLUMN \`design_frame\`;`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_journal_teaser\` DROP COLUMN \`design_padding_top\`;`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_journal_teaser\` DROP COLUMN \`design_padding_bottom\`;`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_journal_teaser\` DROP COLUMN \`design_margin_bottom\`;`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_journal_teaser\` DROP COLUMN \`design_width\`;`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_embed\` DROP COLUMN \`design_heading_size\`;`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_embed\` DROP COLUMN \`design_heading_font\`;`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_embed\` DROP COLUMN \`design_text_size\`;`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_embed\` DROP COLUMN \`design_background\`;`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_embed\` DROP COLUMN \`design_frame\`;`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_embed\` DROP COLUMN \`design_padding_top\`;`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_embed\` DROP COLUMN \`design_padding_bottom\`;`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_embed\` DROP COLUMN \`design_margin_bottom\`;`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_embed\` DROP COLUMN \`design_width\`;`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_spacer\` DROP COLUMN \`design_heading_size\`;`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_spacer\` DROP COLUMN \`design_heading_font\`;`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_spacer\` DROP COLUMN \`design_text_size\`;`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_spacer\` DROP COLUMN \`design_background\`;`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_spacer\` DROP COLUMN \`design_frame\`;`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_spacer\` DROP COLUMN \`design_padding_top\`;`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_spacer\` DROP COLUMN \`design_padding_bottom\`;`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_spacer\` DROP COLUMN \`design_margin_bottom\`;`)
  await db.run(sql`ALTER TABLE \`_sections_v_blocks_spacer\` DROP COLUMN \`design_width\`;`)
  await db.run(sql`ALTER TABLE \`payload_jobs\` DROP COLUMN \`meta\`;`)
}
