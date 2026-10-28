import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`pages_blocks_hero_slides\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`tone\` text DEFAULT 'ink',
  	\`image_id\` integer,
  	\`cta_href\` text,
  	\`secondary_href\` text,
  	\`is_brand_headline\` integer,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_hero\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_hero_slides_order_idx\` ON \`pages_blocks_hero_slides\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_hero_slides_parent_id_idx\` ON \`pages_blocks_hero_slides\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_hero_slides_image_idx\` ON \`pages_blocks_hero_slides\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_hero_slides_locales\` (
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
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_hero_slides\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`pages_blocks_hero_slides_locales_locale_parent_id_unique\` ON \`pages_blocks_hero_slides_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_hero\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`style\` text DEFAULT 'framed',
  	\`autoplay_seconds\` numeric DEFAULT 6.5,
  	\`show_booking_box\` integer DEFAULT true,
  	\`video_id\` integer,
  	\`block_name\` text,
  	FOREIGN KEY (\`video_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_hero_order_idx\` ON \`pages_blocks_hero\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_hero_parent_id_idx\` ON \`pages_blocks_hero\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_hero_path_idx\` ON \`pages_blocks_hero\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_hero_video_idx\` ON \`pages_blocks_hero\` (\`video_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_ticker_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`href\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_ticker\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_ticker_items_order_idx\` ON \`pages_blocks_ticker_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_ticker_items_parent_id_idx\` ON \`pages_blocks_ticker_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_ticker_items_locales\` (
  	\`label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_ticker_items\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`pages_blocks_ticker_items_locales_locale_parent_id_unique\` ON \`pages_blocks_ticker_items_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_ticker\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`tone\` text DEFAULT 'yellow',
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_ticker_order_idx\` ON \`pages_blocks_ticker\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_ticker_parent_id_idx\` ON \`pages_blocks_ticker\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_ticker_path_idx\` ON \`pages_blocks_ticker\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_ticket_cards\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`tone\` text DEFAULT 'cream',
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_ticket_cards_order_idx\` ON \`pages_blocks_ticket_cards\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_ticket_cards_parent_id_idx\` ON \`pages_blocks_ticket_cards\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_ticket_cards_path_idx\` ON \`pages_blocks_ticket_cards\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_ticket_cards_locales\` (
  	\`eyebrow\` text,
  	\`heading\` text,
  	\`intro\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_ticket_cards\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`pages_blocks_ticket_cards_locales_locale_parent_id_unique\` ON \`pages_blocks_ticket_cards_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_events_rail\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`tone\` text DEFAULT 'wet',
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_events_rail_order_idx\` ON \`pages_blocks_events_rail\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_events_rail_parent_id_idx\` ON \`pages_blocks_events_rail\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_events_rail_path_idx\` ON \`pages_blocks_events_rail\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_events_rail_locales\` (
  	\`eyebrow\` text,
  	\`heading\` text,
  	\`intro\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_events_rail\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`pages_blocks_events_rail_locales_locale_parent_id_unique\` ON \`pages_blocks_events_rail_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_offer_grid\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`tone\` text DEFAULT 'white',
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_offer_grid_order_idx\` ON \`pages_blocks_offer_grid\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_offer_grid_parent_id_idx\` ON \`pages_blocks_offer_grid\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_offer_grid_path_idx\` ON \`pages_blocks_offer_grid\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_offer_grid_locales\` (
  	\`heading\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_offer_grid\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`pages_blocks_offer_grid_locales_locale_parent_id_unique\` ON \`pages_blocks_offer_grid_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_worlds_grid\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_worlds_grid_order_idx\` ON \`pages_blocks_worlds_grid\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_worlds_grid_parent_id_idx\` ON \`pages_blocks_worlds_grid\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_worlds_grid_path_idx\` ON \`pages_blocks_worlds_grid\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_worlds_grid_locales\` (
  	\`eyebrow\` text,
  	\`heading\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_worlds_grid\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`pages_blocks_worlds_grid_locales_locale_parent_id_unique\` ON \`pages_blocks_worlds_grid_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_stats_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_stats\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_stats_items_order_idx\` ON \`pages_blocks_stats_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_stats_items_parent_id_idx\` ON \`pages_blocks_stats_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_stats_items_locales\` (
  	\`value\` text,
  	\`label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_stats_items\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`pages_blocks_stats_items_locales_locale_parent_id_unique\` ON \`pages_blocks_stats_items_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_stats\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`tone\` text DEFAULT 'dry',
  	\`show_trust\` integer DEFAULT true,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_stats_order_idx\` ON \`pages_blocks_stats\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_stats_parent_id_idx\` ON \`pages_blocks_stats\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_stats_path_idx\` ON \`pages_blocks_stats\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_stats_locales\` (
  	\`heading\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_stats\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`pages_blocks_stats_locales_locale_parent_id_unique\` ON \`pages_blocks_stats_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_crew_planner\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_crew_planner_order_idx\` ON \`pages_blocks_crew_planner\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_crew_planner_parent_id_idx\` ON \`pages_blocks_crew_planner\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_crew_planner_path_idx\` ON \`pages_blocks_crew_planner\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_crew_planner_locales\` (
  	\`heading\` text,
  	\`intro\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_crew_planner\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`pages_blocks_crew_planner_locales_locale_parent_id_unique\` ON \`pages_blocks_crew_planner_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_moments_wall\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`count\` numeric DEFAULT 8,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_moments_wall_order_idx\` ON \`pages_blocks_moments_wall\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_moments_wall_parent_id_idx\` ON \`pages_blocks_moments_wall\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_moments_wall_path_idx\` ON \`pages_blocks_moments_wall\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_moments_wall_locales\` (
  	\`heading\` text,
  	\`intro\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_moments_wall\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`pages_blocks_moments_wall_locales_locale_parent_id_unique\` ON \`pages_blocks_moments_wall_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_journal_teaser\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`tone\` text DEFAULT 'cream',
  	\`count\` numeric DEFAULT 3,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_journal_teaser_order_idx\` ON \`pages_blocks_journal_teaser\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_journal_teaser_parent_id_idx\` ON \`pages_blocks_journal_teaser\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_journal_teaser_path_idx\` ON \`pages_blocks_journal_teaser\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_journal_teaser_locales\` (
  	\`eyebrow\` text,
  	\`heading\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_journal_teaser\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`pages_blocks_journal_teaser_locales_locale_parent_id_unique\` ON \`pages_blocks_journal_teaser_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_today_status\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`show_whatsapp\` integer DEFAULT true,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_today_status_order_idx\` ON \`pages_blocks_today_status\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_today_status_parent_id_idx\` ON \`pages_blocks_today_status\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_today_status_path_idx\` ON \`pages_blocks_today_status\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_today_status_locales\` (
  	\`heading\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_today_status\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`pages_blocks_today_status_locales_locale_parent_id_unique\` ON \`pages_blocks_today_status_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_countdown\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`ends_at\` text,
  	\`tone\` text DEFAULT 'ink',
  	\`cta_href\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_countdown_order_idx\` ON \`pages_blocks_countdown\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_countdown_parent_id_idx\` ON \`pages_blocks_countdown\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_countdown_path_idx\` ON \`pages_blocks_countdown\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_countdown_locales\` (
  	\`heading\` text,
  	\`body\` text,
  	\`cta_label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_countdown\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`pages_blocks_countdown_locales_locale_parent_id_unique\` ON \`pages_blocks_countdown_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_image_text\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`image_id\` integer,
  	\`image_side\` text DEFAULT 'right',
  	\`tone\` text DEFAULT 'white',
  	\`cta_href\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_image_text_order_idx\` ON \`pages_blocks_image_text\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_image_text_parent_id_idx\` ON \`pages_blocks_image_text\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_image_text_path_idx\` ON \`pages_blocks_image_text\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_image_text_image_idx\` ON \`pages_blocks_image_text\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_image_text_locales\` (
  	\`eyebrow\` text,
  	\`heading\` text,
  	\`body\` text,
  	\`cta_label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_image_text\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`pages_blocks_image_text_locales_locale_parent_id_unique\` ON \`pages_blocks_image_text_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_rich_text\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`tone\` text DEFAULT 'white',
  	\`width\` text DEFAULT 'narrow',
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_rich_text_order_idx\` ON \`pages_blocks_rich_text\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_rich_text_parent_id_idx\` ON \`pages_blocks_rich_text\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_rich_text_path_idx\` ON \`pages_blocks_rich_text\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_rich_text_locales\` (
  	\`content\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_rich_text\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`pages_blocks_rich_text_locales_locale_parent_id_unique\` ON \`pages_blocks_rich_text_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_gallery\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_gallery_order_idx\` ON \`pages_blocks_gallery\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_gallery_parent_id_idx\` ON \`pages_blocks_gallery\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_gallery_path_idx\` ON \`pages_blocks_gallery\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_gallery_locales\` (
  	\`heading\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_gallery\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`pages_blocks_gallery_locales_locale_parent_id_unique\` ON \`pages_blocks_gallery_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_faq\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_faq_order_idx\` ON \`pages_blocks_faq\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_faq_parent_id_idx\` ON \`pages_blocks_faq\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_faq_path_idx\` ON \`pages_blocks_faq\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_faq_locales\` (
  	\`heading\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_faq\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`pages_blocks_faq_locales_locale_parent_id_unique\` ON \`pages_blocks_faq_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_lead_form\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`form_type\` text DEFAULT 'offers',
  	\`tone\` text DEFAULT 'yellow',
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_lead_form_order_idx\` ON \`pages_blocks_lead_form\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_lead_form_parent_id_idx\` ON \`pages_blocks_lead_form\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_lead_form_path_idx\` ON \`pages_blocks_lead_form\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_lead_form_locales\` (
  	\`heading\` text,
  	\`body\` text,
  	\`button_label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_lead_form\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`pages_blocks_lead_form_locales_locale_parent_id_unique\` ON \`pages_blocks_lead_form_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_cta_band\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`tone\` text DEFAULT 'coral',
  	\`primary_href\` text,
  	\`secondary_href\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_cta_band_order_idx\` ON \`pages_blocks_cta_band\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_cta_band_parent_id_idx\` ON \`pages_blocks_cta_band\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_cta_band_path_idx\` ON \`pages_blocks_cta_band\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_cta_band_locales\` (
  	\`heading\` text,
  	\`body\` text,
  	\`primary_label\` text,
  	\`secondary_label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_cta_band\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`pages_blocks_cta_band_locales_locale_parent_id_unique\` ON \`pages_blocks_cta_band_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`slug\` text,
  	\`meta_image_id\` integer,
  	\`meta_noindex\` integer,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`_status\` text DEFAULT 'draft',
  	FOREIGN KEY (\`meta_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`pages_slug_idx\` ON \`pages\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`pages_meta_meta_image_idx\` ON \`pages\` (\`meta_image_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_updated_at_idx\` ON \`pages\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`pages_created_at_idx\` ON \`pages\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`pages__status_idx\` ON \`pages\` (\`_status\`);`)
  await db.run(sql`CREATE TABLE \`pages_locales\` (
  	\`title\` text,
  	\`meta_title\` text,
  	\`meta_description\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`pages_locales_locale_parent_id_unique\` ON \`pages_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`media_id\` integer,
  	\`tickets_id\` integer,
  	\`events_id\` integer,
  	\`offers_id\` integer,
  	\`crews_id\` integer,
  	\`faqs_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`tickets_id\`) REFERENCES \`tickets\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`events_id\`) REFERENCES \`events\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`offers_id\`) REFERENCES \`offers\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`crews_id\`) REFERENCES \`crews\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`faqs_id\`) REFERENCES \`faqs\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_rels_order_idx\` ON \`pages_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`pages_rels_parent_idx\` ON \`pages_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_rels_path_idx\` ON \`pages_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`pages_rels_media_id_idx\` ON \`pages_rels\` (\`media_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_rels_tickets_id_idx\` ON \`pages_rels\` (\`tickets_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_rels_events_id_idx\` ON \`pages_rels\` (\`events_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_rels_offers_id_idx\` ON \`pages_rels\` (\`offers_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_rels_crews_id_idx\` ON \`pages_rels\` (\`crews_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_rels_faqs_id_idx\` ON \`pages_rels\` (\`faqs_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_hero_slides\` (
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
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_hero\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_hero_slides_order_idx\` ON \`_pages_v_blocks_hero_slides\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_hero_slides_parent_id_idx\` ON \`_pages_v_blocks_hero_slides\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_hero_slides_image_idx\` ON \`_pages_v_blocks_hero_slides\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_hero_slides_locales\` (
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
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_hero_slides\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_pages_v_blocks_hero_slides_locales_locale_parent_id_unique\` ON \`_pages_v_blocks_hero_slides_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_hero\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`style\` text DEFAULT 'framed',
  	\`autoplay_seconds\` numeric DEFAULT 6.5,
  	\`show_booking_box\` integer DEFAULT true,
  	\`video_id\` integer,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`video_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_hero_order_idx\` ON \`_pages_v_blocks_hero\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_hero_parent_id_idx\` ON \`_pages_v_blocks_hero\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_hero_path_idx\` ON \`_pages_v_blocks_hero\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_hero_video_idx\` ON \`_pages_v_blocks_hero\` (\`video_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_ticker_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`href\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_ticker\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_ticker_items_order_idx\` ON \`_pages_v_blocks_ticker_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_ticker_items_parent_id_idx\` ON \`_pages_v_blocks_ticker_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_ticker_items_locales\` (
  	\`label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_ticker_items\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_pages_v_blocks_ticker_items_locales_locale_parent_id_unique\` ON \`_pages_v_blocks_ticker_items_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_ticker\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`tone\` text DEFAULT 'yellow',
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_ticker_order_idx\` ON \`_pages_v_blocks_ticker\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_ticker_parent_id_idx\` ON \`_pages_v_blocks_ticker\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_ticker_path_idx\` ON \`_pages_v_blocks_ticker\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_ticket_cards\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`tone\` text DEFAULT 'cream',
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_ticket_cards_order_idx\` ON \`_pages_v_blocks_ticket_cards\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_ticket_cards_parent_id_idx\` ON \`_pages_v_blocks_ticket_cards\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_ticket_cards_path_idx\` ON \`_pages_v_blocks_ticket_cards\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_ticket_cards_locales\` (
  	\`eyebrow\` text,
  	\`heading\` text,
  	\`intro\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_ticket_cards\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_pages_v_blocks_ticket_cards_locales_locale_parent_id_unique\` ON \`_pages_v_blocks_ticket_cards_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_events_rail\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`tone\` text DEFAULT 'wet',
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_events_rail_order_idx\` ON \`_pages_v_blocks_events_rail\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_events_rail_parent_id_idx\` ON \`_pages_v_blocks_events_rail\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_events_rail_path_idx\` ON \`_pages_v_blocks_events_rail\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_events_rail_locales\` (
  	\`eyebrow\` text,
  	\`heading\` text,
  	\`intro\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_events_rail\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_pages_v_blocks_events_rail_locales_locale_parent_id_unique\` ON \`_pages_v_blocks_events_rail_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_offer_grid\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`tone\` text DEFAULT 'white',
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_offer_grid_order_idx\` ON \`_pages_v_blocks_offer_grid\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_offer_grid_parent_id_idx\` ON \`_pages_v_blocks_offer_grid\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_offer_grid_path_idx\` ON \`_pages_v_blocks_offer_grid\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_offer_grid_locales\` (
  	\`heading\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_offer_grid\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_pages_v_blocks_offer_grid_locales_locale_parent_id_unique\` ON \`_pages_v_blocks_offer_grid_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_worlds_grid\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_worlds_grid_order_idx\` ON \`_pages_v_blocks_worlds_grid\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_worlds_grid_parent_id_idx\` ON \`_pages_v_blocks_worlds_grid\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_worlds_grid_path_idx\` ON \`_pages_v_blocks_worlds_grid\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_worlds_grid_locales\` (
  	\`eyebrow\` text,
  	\`heading\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_worlds_grid\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_pages_v_blocks_worlds_grid_locales_locale_parent_id_unique\` ON \`_pages_v_blocks_worlds_grid_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_stats_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_stats\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_stats_items_order_idx\` ON \`_pages_v_blocks_stats_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_stats_items_parent_id_idx\` ON \`_pages_v_blocks_stats_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_stats_items_locales\` (
  	\`value\` text,
  	\`label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_stats_items\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_pages_v_blocks_stats_items_locales_locale_parent_id_unique\` ON \`_pages_v_blocks_stats_items_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_stats\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`tone\` text DEFAULT 'dry',
  	\`show_trust\` integer DEFAULT true,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_stats_order_idx\` ON \`_pages_v_blocks_stats\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_stats_parent_id_idx\` ON \`_pages_v_blocks_stats\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_stats_path_idx\` ON \`_pages_v_blocks_stats\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_stats_locales\` (
  	\`heading\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_stats\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_pages_v_blocks_stats_locales_locale_parent_id_unique\` ON \`_pages_v_blocks_stats_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_crew_planner\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_crew_planner_order_idx\` ON \`_pages_v_blocks_crew_planner\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_crew_planner_parent_id_idx\` ON \`_pages_v_blocks_crew_planner\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_crew_planner_path_idx\` ON \`_pages_v_blocks_crew_planner\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_crew_planner_locales\` (
  	\`heading\` text,
  	\`intro\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_crew_planner\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_pages_v_blocks_crew_planner_locales_locale_parent_id_unique\` ON \`_pages_v_blocks_crew_planner_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_moments_wall\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`count\` numeric DEFAULT 8,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_moments_wall_order_idx\` ON \`_pages_v_blocks_moments_wall\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_moments_wall_parent_id_idx\` ON \`_pages_v_blocks_moments_wall\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_moments_wall_path_idx\` ON \`_pages_v_blocks_moments_wall\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_moments_wall_locales\` (
  	\`heading\` text,
  	\`intro\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_moments_wall\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_pages_v_blocks_moments_wall_locales_locale_parent_id_unique\` ON \`_pages_v_blocks_moments_wall_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_journal_teaser\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`tone\` text DEFAULT 'cream',
  	\`count\` numeric DEFAULT 3,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_journal_teaser_order_idx\` ON \`_pages_v_blocks_journal_teaser\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_journal_teaser_parent_id_idx\` ON \`_pages_v_blocks_journal_teaser\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_journal_teaser_path_idx\` ON \`_pages_v_blocks_journal_teaser\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_journal_teaser_locales\` (
  	\`eyebrow\` text,
  	\`heading\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_journal_teaser\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_pages_v_blocks_journal_teaser_locales_locale_parent_id_uniq\` ON \`_pages_v_blocks_journal_teaser_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_today_status\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`show_whatsapp\` integer DEFAULT true,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_today_status_order_idx\` ON \`_pages_v_blocks_today_status\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_today_status_parent_id_idx\` ON \`_pages_v_blocks_today_status\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_today_status_path_idx\` ON \`_pages_v_blocks_today_status\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_today_status_locales\` (
  	\`heading\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_today_status\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_pages_v_blocks_today_status_locales_locale_parent_id_unique\` ON \`_pages_v_blocks_today_status_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_countdown\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`ends_at\` text,
  	\`tone\` text DEFAULT 'ink',
  	\`cta_href\` text,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_countdown_order_idx\` ON \`_pages_v_blocks_countdown\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_countdown_parent_id_idx\` ON \`_pages_v_blocks_countdown\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_countdown_path_idx\` ON \`_pages_v_blocks_countdown\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_countdown_locales\` (
  	\`heading\` text,
  	\`body\` text,
  	\`cta_label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_countdown\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_pages_v_blocks_countdown_locales_locale_parent_id_unique\` ON \`_pages_v_blocks_countdown_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_image_text\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`image_id\` integer,
  	\`image_side\` text DEFAULT 'right',
  	\`tone\` text DEFAULT 'white',
  	\`cta_href\` text,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_image_text_order_idx\` ON \`_pages_v_blocks_image_text\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_image_text_parent_id_idx\` ON \`_pages_v_blocks_image_text\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_image_text_path_idx\` ON \`_pages_v_blocks_image_text\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_image_text_image_idx\` ON \`_pages_v_blocks_image_text\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_image_text_locales\` (
  	\`eyebrow\` text,
  	\`heading\` text,
  	\`body\` text,
  	\`cta_label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_image_text\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_pages_v_blocks_image_text_locales_locale_parent_id_unique\` ON \`_pages_v_blocks_image_text_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_rich_text\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`tone\` text DEFAULT 'white',
  	\`width\` text DEFAULT 'narrow',
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_rich_text_order_idx\` ON \`_pages_v_blocks_rich_text\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_rich_text_parent_id_idx\` ON \`_pages_v_blocks_rich_text\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_rich_text_path_idx\` ON \`_pages_v_blocks_rich_text\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_rich_text_locales\` (
  	\`content\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_rich_text\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_pages_v_blocks_rich_text_locales_locale_parent_id_unique\` ON \`_pages_v_blocks_rich_text_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_gallery\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_gallery_order_idx\` ON \`_pages_v_blocks_gallery\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_gallery_parent_id_idx\` ON \`_pages_v_blocks_gallery\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_gallery_path_idx\` ON \`_pages_v_blocks_gallery\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_gallery_locales\` (
  	\`heading\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_gallery\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_pages_v_blocks_gallery_locales_locale_parent_id_unique\` ON \`_pages_v_blocks_gallery_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_faq\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_faq_order_idx\` ON \`_pages_v_blocks_faq\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_faq_parent_id_idx\` ON \`_pages_v_blocks_faq\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_faq_path_idx\` ON \`_pages_v_blocks_faq\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_faq_locales\` (
  	\`heading\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_faq\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_pages_v_blocks_faq_locales_locale_parent_id_unique\` ON \`_pages_v_blocks_faq_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_lead_form\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`form_type\` text DEFAULT 'offers',
  	\`tone\` text DEFAULT 'yellow',
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_lead_form_order_idx\` ON \`_pages_v_blocks_lead_form\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_lead_form_parent_id_idx\` ON \`_pages_v_blocks_lead_form\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_lead_form_path_idx\` ON \`_pages_v_blocks_lead_form\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_lead_form_locales\` (
  	\`heading\` text,
  	\`body\` text,
  	\`button_label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_lead_form\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_pages_v_blocks_lead_form_locales_locale_parent_id_unique\` ON \`_pages_v_blocks_lead_form_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_cta_band\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`tone\` text DEFAULT 'coral',
  	\`primary_href\` text,
  	\`secondary_href\` text,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_cta_band_order_idx\` ON \`_pages_v_blocks_cta_band\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_cta_band_parent_id_idx\` ON \`_pages_v_blocks_cta_band\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_cta_band_path_idx\` ON \`_pages_v_blocks_cta_band\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_cta_band_locales\` (
  	\`heading\` text,
  	\`body\` text,
  	\`primary_label\` text,
  	\`secondary_label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_cta_band\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_pages_v_blocks_cta_band_locales_locale_parent_id_unique\` ON \`_pages_v_blocks_cta_band_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`parent_id\` integer,
  	\`version_slug\` text,
  	\`version_meta_image_id\` integer,
  	\`version_meta_noindex\` integer,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`version__status\` text DEFAULT 'draft',
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`snapshot\` integer,
  	\`published_locale\` text,
  	\`latest\` integer,
  	\`autosave\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_meta_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_parent_idx\` ON \`_pages_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_version_version_slug_idx\` ON \`_pages_v\` (\`version_slug\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_version_meta_version_meta_image_idx\` ON \`_pages_v\` (\`version_meta_image_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_version_version_updated_at_idx\` ON \`_pages_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_version_version_created_at_idx\` ON \`_pages_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_version_version__status_idx\` ON \`_pages_v\` (\`version__status\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_created_at_idx\` ON \`_pages_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_updated_at_idx\` ON \`_pages_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_snapshot_idx\` ON \`_pages_v\` (\`snapshot\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_published_locale_idx\` ON \`_pages_v\` (\`published_locale\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_latest_idx\` ON \`_pages_v\` (\`latest\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_autosave_idx\` ON \`_pages_v\` (\`autosave\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_locales\` (
  	\`version_title\` text,
  	\`version_meta_title\` text,
  	\`version_meta_description\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_pages_v_locales_locale_parent_id_unique\` ON \`_pages_v_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`media_id\` integer,
  	\`tickets_id\` integer,
  	\`events_id\` integer,
  	\`offers_id\` integer,
  	\`crews_id\` integer,
  	\`faqs_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`tickets_id\`) REFERENCES \`tickets\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`events_id\`) REFERENCES \`events\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`offers_id\`) REFERENCES \`offers\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`crews_id\`) REFERENCES \`crews\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`faqs_id\`) REFERENCES \`faqs\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_rels_order_idx\` ON \`_pages_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_rels_parent_idx\` ON \`_pages_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_rels_path_idx\` ON \`_pages_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_rels_media_id_idx\` ON \`_pages_v_rels\` (\`media_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_rels_tickets_id_idx\` ON \`_pages_v_rels\` (\`tickets_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_rels_events_id_idx\` ON \`_pages_v_rels\` (\`events_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_rels_offers_id_idx\` ON \`_pages_v_rels\` (\`offers_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_rels_crews_id_idx\` ON \`_pages_v_rels\` (\`crews_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_rels_faqs_id_idx\` ON \`_pages_v_rels\` (\`faqs_id\`);`)
  await db.run(sql`CREATE TABLE \`offers_landing_variants\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`key\` text DEFAULT 'a',
  	\`name\` text,
  	\`weight\` numeric DEFAULT 50,
  	\`image_id\` integer,
  	\`tone\` text DEFAULT 'coral',
  	\`cta_href\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`offers\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`offers_landing_variants_order_idx\` ON \`offers_landing_variants\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`offers_landing_variants_parent_id_idx\` ON \`offers_landing_variants\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`offers_landing_variants_image_idx\` ON \`offers_landing_variants\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`offers_landing_variants_locales\` (
  	\`headline\` text,
  	\`subhead\` text,
  	\`cta_label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`offers_landing_variants\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`offers_landing_variants_locales_locale_parent_id_unique\` ON \`offers_landing_variants_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`offers_blocks_hero_slides\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`tone\` text DEFAULT 'ink',
  	\`image_id\` integer,
  	\`cta_href\` text,
  	\`secondary_href\` text,
  	\`is_brand_headline\` integer,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`offers_blocks_hero\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`offers_blocks_hero_slides_order_idx\` ON \`offers_blocks_hero_slides\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`offers_blocks_hero_slides_parent_id_idx\` ON \`offers_blocks_hero_slides\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`offers_blocks_hero_slides_image_idx\` ON \`offers_blocks_hero_slides\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`offers_blocks_hero_slides_locales\` (
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
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`offers_blocks_hero_slides\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`offers_blocks_hero_slides_locales_locale_parent_id_unique\` ON \`offers_blocks_hero_slides_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`offers_blocks_hero\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`style\` text DEFAULT 'framed',
  	\`autoplay_seconds\` numeric DEFAULT 6.5,
  	\`show_booking_box\` integer DEFAULT true,
  	\`video_id\` integer,
  	\`block_name\` text,
  	FOREIGN KEY (\`video_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`offers\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`offers_blocks_hero_order_idx\` ON \`offers_blocks_hero\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`offers_blocks_hero_parent_id_idx\` ON \`offers_blocks_hero\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`offers_blocks_hero_path_idx\` ON \`offers_blocks_hero\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`offers_blocks_hero_video_idx\` ON \`offers_blocks_hero\` (\`video_id\`);`)
  await db.run(sql`CREATE TABLE \`offers_blocks_ticker_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`href\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`offers_blocks_ticker\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`offers_blocks_ticker_items_order_idx\` ON \`offers_blocks_ticker_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`offers_blocks_ticker_items_parent_id_idx\` ON \`offers_blocks_ticker_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`offers_blocks_ticker_items_locales\` (
  	\`label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`offers_blocks_ticker_items\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`offers_blocks_ticker_items_locales_locale_parent_id_unique\` ON \`offers_blocks_ticker_items_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`offers_blocks_ticker\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`tone\` text DEFAULT 'yellow',
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`offers\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`offers_blocks_ticker_order_idx\` ON \`offers_blocks_ticker\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`offers_blocks_ticker_parent_id_idx\` ON \`offers_blocks_ticker\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`offers_blocks_ticker_path_idx\` ON \`offers_blocks_ticker\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`offers_blocks_ticket_cards\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`tone\` text DEFAULT 'cream',
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`offers\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`offers_blocks_ticket_cards_order_idx\` ON \`offers_blocks_ticket_cards\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`offers_blocks_ticket_cards_parent_id_idx\` ON \`offers_blocks_ticket_cards\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`offers_blocks_ticket_cards_path_idx\` ON \`offers_blocks_ticket_cards\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`offers_blocks_ticket_cards_locales\` (
  	\`eyebrow\` text,
  	\`heading\` text,
  	\`intro\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`offers_blocks_ticket_cards\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`offers_blocks_ticket_cards_locales_locale_parent_id_unique\` ON \`offers_blocks_ticket_cards_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`offers_blocks_events_rail\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`tone\` text DEFAULT 'wet',
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`offers\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`offers_blocks_events_rail_order_idx\` ON \`offers_blocks_events_rail\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`offers_blocks_events_rail_parent_id_idx\` ON \`offers_blocks_events_rail\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`offers_blocks_events_rail_path_idx\` ON \`offers_blocks_events_rail\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`offers_blocks_events_rail_locales\` (
  	\`eyebrow\` text,
  	\`heading\` text,
  	\`intro\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`offers_blocks_events_rail\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`offers_blocks_events_rail_locales_locale_parent_id_unique\` ON \`offers_blocks_events_rail_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`offers_blocks_offer_grid\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`tone\` text DEFAULT 'white',
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`offers\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`offers_blocks_offer_grid_order_idx\` ON \`offers_blocks_offer_grid\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`offers_blocks_offer_grid_parent_id_idx\` ON \`offers_blocks_offer_grid\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`offers_blocks_offer_grid_path_idx\` ON \`offers_blocks_offer_grid\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`offers_blocks_offer_grid_locales\` (
  	\`heading\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`offers_blocks_offer_grid\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`offers_blocks_offer_grid_locales_locale_parent_id_unique\` ON \`offers_blocks_offer_grid_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`offers_blocks_worlds_grid\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`offers\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`offers_blocks_worlds_grid_order_idx\` ON \`offers_blocks_worlds_grid\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`offers_blocks_worlds_grid_parent_id_idx\` ON \`offers_blocks_worlds_grid\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`offers_blocks_worlds_grid_path_idx\` ON \`offers_blocks_worlds_grid\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`offers_blocks_worlds_grid_locales\` (
  	\`eyebrow\` text,
  	\`heading\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`offers_blocks_worlds_grid\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`offers_blocks_worlds_grid_locales_locale_parent_id_unique\` ON \`offers_blocks_worlds_grid_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`offers_blocks_stats_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`offers_blocks_stats\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`offers_blocks_stats_items_order_idx\` ON \`offers_blocks_stats_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`offers_blocks_stats_items_parent_id_idx\` ON \`offers_blocks_stats_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`offers_blocks_stats_items_locales\` (
  	\`value\` text,
  	\`label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`offers_blocks_stats_items\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`offers_blocks_stats_items_locales_locale_parent_id_unique\` ON \`offers_blocks_stats_items_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`offers_blocks_stats\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`tone\` text DEFAULT 'dry',
  	\`show_trust\` integer DEFAULT true,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`offers\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`offers_blocks_stats_order_idx\` ON \`offers_blocks_stats\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`offers_blocks_stats_parent_id_idx\` ON \`offers_blocks_stats\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`offers_blocks_stats_path_idx\` ON \`offers_blocks_stats\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`offers_blocks_stats_locales\` (
  	\`heading\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`offers_blocks_stats\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`offers_blocks_stats_locales_locale_parent_id_unique\` ON \`offers_blocks_stats_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`offers_blocks_crew_planner\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`offers\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`offers_blocks_crew_planner_order_idx\` ON \`offers_blocks_crew_planner\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`offers_blocks_crew_planner_parent_id_idx\` ON \`offers_blocks_crew_planner\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`offers_blocks_crew_planner_path_idx\` ON \`offers_blocks_crew_planner\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`offers_blocks_crew_planner_locales\` (
  	\`heading\` text,
  	\`intro\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`offers_blocks_crew_planner\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`offers_blocks_crew_planner_locales_locale_parent_id_unique\` ON \`offers_blocks_crew_planner_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`offers_blocks_moments_wall\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`count\` numeric DEFAULT 8,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`offers\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`offers_blocks_moments_wall_order_idx\` ON \`offers_blocks_moments_wall\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`offers_blocks_moments_wall_parent_id_idx\` ON \`offers_blocks_moments_wall\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`offers_blocks_moments_wall_path_idx\` ON \`offers_blocks_moments_wall\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`offers_blocks_moments_wall_locales\` (
  	\`heading\` text,
  	\`intro\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`offers_blocks_moments_wall\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`offers_blocks_moments_wall_locales_locale_parent_id_unique\` ON \`offers_blocks_moments_wall_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`offers_blocks_journal_teaser\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`tone\` text DEFAULT 'cream',
  	\`count\` numeric DEFAULT 3,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`offers\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`offers_blocks_journal_teaser_order_idx\` ON \`offers_blocks_journal_teaser\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`offers_blocks_journal_teaser_parent_id_idx\` ON \`offers_blocks_journal_teaser\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`offers_blocks_journal_teaser_path_idx\` ON \`offers_blocks_journal_teaser\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`offers_blocks_journal_teaser_locales\` (
  	\`eyebrow\` text,
  	\`heading\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`offers_blocks_journal_teaser\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`offers_blocks_journal_teaser_locales_locale_parent_id_unique\` ON \`offers_blocks_journal_teaser_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`offers_blocks_today_status\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`show_whatsapp\` integer DEFAULT true,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`offers\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`offers_blocks_today_status_order_idx\` ON \`offers_blocks_today_status\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`offers_blocks_today_status_parent_id_idx\` ON \`offers_blocks_today_status\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`offers_blocks_today_status_path_idx\` ON \`offers_blocks_today_status\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`offers_blocks_today_status_locales\` (
  	\`heading\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`offers_blocks_today_status\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`offers_blocks_today_status_locales_locale_parent_id_unique\` ON \`offers_blocks_today_status_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`offers_blocks_countdown\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`ends_at\` text,
  	\`tone\` text DEFAULT 'ink',
  	\`cta_href\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`offers\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`offers_blocks_countdown_order_idx\` ON \`offers_blocks_countdown\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`offers_blocks_countdown_parent_id_idx\` ON \`offers_blocks_countdown\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`offers_blocks_countdown_path_idx\` ON \`offers_blocks_countdown\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`offers_blocks_countdown_locales\` (
  	\`heading\` text,
  	\`body\` text,
  	\`cta_label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`offers_blocks_countdown\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`offers_blocks_countdown_locales_locale_parent_id_unique\` ON \`offers_blocks_countdown_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`offers_blocks_image_text\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`image_id\` integer,
  	\`image_side\` text DEFAULT 'right',
  	\`tone\` text DEFAULT 'white',
  	\`cta_href\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`offers\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`offers_blocks_image_text_order_idx\` ON \`offers_blocks_image_text\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`offers_blocks_image_text_parent_id_idx\` ON \`offers_blocks_image_text\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`offers_blocks_image_text_path_idx\` ON \`offers_blocks_image_text\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`offers_blocks_image_text_image_idx\` ON \`offers_blocks_image_text\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`offers_blocks_image_text_locales\` (
  	\`eyebrow\` text,
  	\`heading\` text,
  	\`body\` text,
  	\`cta_label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`offers_blocks_image_text\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`offers_blocks_image_text_locales_locale_parent_id_unique\` ON \`offers_blocks_image_text_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`offers_blocks_rich_text\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`tone\` text DEFAULT 'white',
  	\`width\` text DEFAULT 'narrow',
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`offers\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`offers_blocks_rich_text_order_idx\` ON \`offers_blocks_rich_text\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`offers_blocks_rich_text_parent_id_idx\` ON \`offers_blocks_rich_text\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`offers_blocks_rich_text_path_idx\` ON \`offers_blocks_rich_text\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`offers_blocks_rich_text_locales\` (
  	\`content\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`offers_blocks_rich_text\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`offers_blocks_rich_text_locales_locale_parent_id_unique\` ON \`offers_blocks_rich_text_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`offers_blocks_gallery\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`offers\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`offers_blocks_gallery_order_idx\` ON \`offers_blocks_gallery\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`offers_blocks_gallery_parent_id_idx\` ON \`offers_blocks_gallery\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`offers_blocks_gallery_path_idx\` ON \`offers_blocks_gallery\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`offers_blocks_gallery_locales\` (
  	\`heading\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`offers_blocks_gallery\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`offers_blocks_gallery_locales_locale_parent_id_unique\` ON \`offers_blocks_gallery_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`offers_blocks_faq\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`offers\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`offers_blocks_faq_order_idx\` ON \`offers_blocks_faq\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`offers_blocks_faq_parent_id_idx\` ON \`offers_blocks_faq\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`offers_blocks_faq_path_idx\` ON \`offers_blocks_faq\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`offers_blocks_faq_locales\` (
  	\`heading\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`offers_blocks_faq\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`offers_blocks_faq_locales_locale_parent_id_unique\` ON \`offers_blocks_faq_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`offers_blocks_lead_form\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`form_type\` text DEFAULT 'offers',
  	\`tone\` text DEFAULT 'yellow',
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`offers\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`offers_blocks_lead_form_order_idx\` ON \`offers_blocks_lead_form\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`offers_blocks_lead_form_parent_id_idx\` ON \`offers_blocks_lead_form\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`offers_blocks_lead_form_path_idx\` ON \`offers_blocks_lead_form\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`offers_blocks_lead_form_locales\` (
  	\`heading\` text,
  	\`body\` text,
  	\`button_label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`offers_blocks_lead_form\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`offers_blocks_lead_form_locales_locale_parent_id_unique\` ON \`offers_blocks_lead_form_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`offers_blocks_cta_band\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`tone\` text DEFAULT 'coral',
  	\`primary_href\` text,
  	\`secondary_href\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`offers\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`offers_blocks_cta_band_order_idx\` ON \`offers_blocks_cta_band\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`offers_blocks_cta_band_parent_id_idx\` ON \`offers_blocks_cta_band\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`offers_blocks_cta_band_path_idx\` ON \`offers_blocks_cta_band\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`offers_blocks_cta_band_locales\` (
  	\`heading\` text,
  	\`body\` text,
  	\`primary_label\` text,
  	\`secondary_label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`offers_blocks_cta_band\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`offers_blocks_cta_band_locales_locale_parent_id_unique\` ON \`offers_blocks_cta_band_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`offers\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`slug\` text,
  	\`category\` text,
  	\`status\` text DEFAULT 'Live',
  	\`valid_from\` text,
  	\`valid_to\` text,
  	\`promo_code\` text,
  	\`theme\` text DEFAULT 'dry',
  	\`image_id\` integer,
  	\`cta_href\` text,
  	\`show_on_home\` integer,
  	\`order\` numeric DEFAULT 0,
  	\`landing_enabled\` integer DEFAULT true,
  	\`landing_goal\` text DEFAULT 'book',
  	\`meta_image_id\` integer,
  	\`meta_noindex\` integer,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`_status\` text DEFAULT 'draft',
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`meta_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`offers_slug_idx\` ON \`offers\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`offers_image_idx\` ON \`offers\` (\`image_id\`);`)
  await db.run(sql`CREATE INDEX \`offers_meta_meta_image_idx\` ON \`offers\` (\`meta_image_id\`);`)
  await db.run(sql`CREATE INDEX \`offers_updated_at_idx\` ON \`offers\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`offers_created_at_idx\` ON \`offers\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`offers__status_idx\` ON \`offers\` (\`_status\`);`)
  await db.run(sql`CREATE TABLE \`offers_locales\` (
  	\`name\` text,
  	\`tag\` text,
  	\`deal\` text,
  	\`terms\` text,
  	\`cta_label\` text,
  	\`meta_title\` text,
  	\`meta_description\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`offers\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`offers_locales_locale_parent_id_unique\` ON \`offers_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`offers_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`media_id\` integer,
  	\`tickets_id\` integer,
  	\`events_id\` integer,
  	\`offers_id\` integer,
  	\`crews_id\` integer,
  	\`faqs_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`offers\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`tickets_id\`) REFERENCES \`tickets\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`events_id\`) REFERENCES \`events\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`offers_id\`) REFERENCES \`offers\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`crews_id\`) REFERENCES \`crews\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`faqs_id\`) REFERENCES \`faqs\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`offers_rels_order_idx\` ON \`offers_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`offers_rels_parent_idx\` ON \`offers_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`offers_rels_path_idx\` ON \`offers_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`offers_rels_media_id_idx\` ON \`offers_rels\` (\`media_id\`);`)
  await db.run(sql`CREATE INDEX \`offers_rels_tickets_id_idx\` ON \`offers_rels\` (\`tickets_id\`);`)
  await db.run(sql`CREATE INDEX \`offers_rels_events_id_idx\` ON \`offers_rels\` (\`events_id\`);`)
  await db.run(sql`CREATE INDEX \`offers_rels_offers_id_idx\` ON \`offers_rels\` (\`offers_id\`);`)
  await db.run(sql`CREATE INDEX \`offers_rels_crews_id_idx\` ON \`offers_rels\` (\`crews_id\`);`)
  await db.run(sql`CREATE INDEX \`offers_rels_faqs_id_idx\` ON \`offers_rels\` (\`faqs_id\`);`)
  await db.run(sql`CREATE TABLE \`_offers_v_version_landing_variants\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`key\` text DEFAULT 'a',
  	\`name\` text,
  	\`weight\` numeric DEFAULT 50,
  	\`image_id\` integer,
  	\`tone\` text DEFAULT 'coral',
  	\`cta_href\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_offers_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_offers_v_version_landing_variants_order_idx\` ON \`_offers_v_version_landing_variants\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_offers_v_version_landing_variants_parent_id_idx\` ON \`_offers_v_version_landing_variants\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_offers_v_version_landing_variants_image_idx\` ON \`_offers_v_version_landing_variants\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`_offers_v_version_landing_variants_locales\` (
  	\`headline\` text,
  	\`subhead\` text,
  	\`cta_label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_offers_v_version_landing_variants\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_offers_v_version_landing_variants_locales_locale_parent_id_\` ON \`_offers_v_version_landing_variants_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_offers_v_blocks_hero_slides\` (
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
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_offers_v_blocks_hero\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_offers_v_blocks_hero_slides_order_idx\` ON \`_offers_v_blocks_hero_slides\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_offers_v_blocks_hero_slides_parent_id_idx\` ON \`_offers_v_blocks_hero_slides\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_offers_v_blocks_hero_slides_image_idx\` ON \`_offers_v_blocks_hero_slides\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`_offers_v_blocks_hero_slides_locales\` (
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
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_offers_v_blocks_hero_slides\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_offers_v_blocks_hero_slides_locales_locale_parent_id_unique\` ON \`_offers_v_blocks_hero_slides_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_offers_v_blocks_hero\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`style\` text DEFAULT 'framed',
  	\`autoplay_seconds\` numeric DEFAULT 6.5,
  	\`show_booking_box\` integer DEFAULT true,
  	\`video_id\` integer,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`video_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_offers_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_offers_v_blocks_hero_order_idx\` ON \`_offers_v_blocks_hero\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_offers_v_blocks_hero_parent_id_idx\` ON \`_offers_v_blocks_hero\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_offers_v_blocks_hero_path_idx\` ON \`_offers_v_blocks_hero\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`_offers_v_blocks_hero_video_idx\` ON \`_offers_v_blocks_hero\` (\`video_id\`);`)
  await db.run(sql`CREATE TABLE \`_offers_v_blocks_ticker_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`href\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_offers_v_blocks_ticker\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_offers_v_blocks_ticker_items_order_idx\` ON \`_offers_v_blocks_ticker_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_offers_v_blocks_ticker_items_parent_id_idx\` ON \`_offers_v_blocks_ticker_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_offers_v_blocks_ticker_items_locales\` (
  	\`label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_offers_v_blocks_ticker_items\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_offers_v_blocks_ticker_items_locales_locale_parent_id_uniqu\` ON \`_offers_v_blocks_ticker_items_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_offers_v_blocks_ticker\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`tone\` text DEFAULT 'yellow',
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_offers_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_offers_v_blocks_ticker_order_idx\` ON \`_offers_v_blocks_ticker\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_offers_v_blocks_ticker_parent_id_idx\` ON \`_offers_v_blocks_ticker\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_offers_v_blocks_ticker_path_idx\` ON \`_offers_v_blocks_ticker\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_offers_v_blocks_ticket_cards\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`tone\` text DEFAULT 'cream',
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_offers_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_offers_v_blocks_ticket_cards_order_idx\` ON \`_offers_v_blocks_ticket_cards\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_offers_v_blocks_ticket_cards_parent_id_idx\` ON \`_offers_v_blocks_ticket_cards\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_offers_v_blocks_ticket_cards_path_idx\` ON \`_offers_v_blocks_ticket_cards\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_offers_v_blocks_ticket_cards_locales\` (
  	\`eyebrow\` text,
  	\`heading\` text,
  	\`intro\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_offers_v_blocks_ticket_cards\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_offers_v_blocks_ticket_cards_locales_locale_parent_id_uniqu\` ON \`_offers_v_blocks_ticket_cards_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_offers_v_blocks_events_rail\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`tone\` text DEFAULT 'wet',
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_offers_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_offers_v_blocks_events_rail_order_idx\` ON \`_offers_v_blocks_events_rail\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_offers_v_blocks_events_rail_parent_id_idx\` ON \`_offers_v_blocks_events_rail\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_offers_v_blocks_events_rail_path_idx\` ON \`_offers_v_blocks_events_rail\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_offers_v_blocks_events_rail_locales\` (
  	\`eyebrow\` text,
  	\`heading\` text,
  	\`intro\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_offers_v_blocks_events_rail\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_offers_v_blocks_events_rail_locales_locale_parent_id_unique\` ON \`_offers_v_blocks_events_rail_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_offers_v_blocks_offer_grid\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`tone\` text DEFAULT 'white',
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_offers_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_offers_v_blocks_offer_grid_order_idx\` ON \`_offers_v_blocks_offer_grid\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_offers_v_blocks_offer_grid_parent_id_idx\` ON \`_offers_v_blocks_offer_grid\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_offers_v_blocks_offer_grid_path_idx\` ON \`_offers_v_blocks_offer_grid\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_offers_v_blocks_offer_grid_locales\` (
  	\`heading\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_offers_v_blocks_offer_grid\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_offers_v_blocks_offer_grid_locales_locale_parent_id_unique\` ON \`_offers_v_blocks_offer_grid_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_offers_v_blocks_worlds_grid\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_offers_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_offers_v_blocks_worlds_grid_order_idx\` ON \`_offers_v_blocks_worlds_grid\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_offers_v_blocks_worlds_grid_parent_id_idx\` ON \`_offers_v_blocks_worlds_grid\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_offers_v_blocks_worlds_grid_path_idx\` ON \`_offers_v_blocks_worlds_grid\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_offers_v_blocks_worlds_grid_locales\` (
  	\`eyebrow\` text,
  	\`heading\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_offers_v_blocks_worlds_grid\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_offers_v_blocks_worlds_grid_locales_locale_parent_id_unique\` ON \`_offers_v_blocks_worlds_grid_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_offers_v_blocks_stats_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_offers_v_blocks_stats\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_offers_v_blocks_stats_items_order_idx\` ON \`_offers_v_blocks_stats_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_offers_v_blocks_stats_items_parent_id_idx\` ON \`_offers_v_blocks_stats_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_offers_v_blocks_stats_items_locales\` (
  	\`value\` text,
  	\`label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_offers_v_blocks_stats_items\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_offers_v_blocks_stats_items_locales_locale_parent_id_unique\` ON \`_offers_v_blocks_stats_items_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_offers_v_blocks_stats\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`tone\` text DEFAULT 'dry',
  	\`show_trust\` integer DEFAULT true,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_offers_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_offers_v_blocks_stats_order_idx\` ON \`_offers_v_blocks_stats\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_offers_v_blocks_stats_parent_id_idx\` ON \`_offers_v_blocks_stats\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_offers_v_blocks_stats_path_idx\` ON \`_offers_v_blocks_stats\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_offers_v_blocks_stats_locales\` (
  	\`heading\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_offers_v_blocks_stats\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_offers_v_blocks_stats_locales_locale_parent_id_unique\` ON \`_offers_v_blocks_stats_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_offers_v_blocks_crew_planner\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_offers_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_offers_v_blocks_crew_planner_order_idx\` ON \`_offers_v_blocks_crew_planner\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_offers_v_blocks_crew_planner_parent_id_idx\` ON \`_offers_v_blocks_crew_planner\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_offers_v_blocks_crew_planner_path_idx\` ON \`_offers_v_blocks_crew_planner\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_offers_v_blocks_crew_planner_locales\` (
  	\`heading\` text,
  	\`intro\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_offers_v_blocks_crew_planner\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_offers_v_blocks_crew_planner_locales_locale_parent_id_uniqu\` ON \`_offers_v_blocks_crew_planner_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_offers_v_blocks_moments_wall\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`count\` numeric DEFAULT 8,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_offers_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_offers_v_blocks_moments_wall_order_idx\` ON \`_offers_v_blocks_moments_wall\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_offers_v_blocks_moments_wall_parent_id_idx\` ON \`_offers_v_blocks_moments_wall\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_offers_v_blocks_moments_wall_path_idx\` ON \`_offers_v_blocks_moments_wall\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_offers_v_blocks_moments_wall_locales\` (
  	\`heading\` text,
  	\`intro\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_offers_v_blocks_moments_wall\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_offers_v_blocks_moments_wall_locales_locale_parent_id_uniqu\` ON \`_offers_v_blocks_moments_wall_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_offers_v_blocks_journal_teaser\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`tone\` text DEFAULT 'cream',
  	\`count\` numeric DEFAULT 3,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_offers_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_offers_v_blocks_journal_teaser_order_idx\` ON \`_offers_v_blocks_journal_teaser\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_offers_v_blocks_journal_teaser_parent_id_idx\` ON \`_offers_v_blocks_journal_teaser\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_offers_v_blocks_journal_teaser_path_idx\` ON \`_offers_v_blocks_journal_teaser\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_offers_v_blocks_journal_teaser_locales\` (
  	\`eyebrow\` text,
  	\`heading\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_offers_v_blocks_journal_teaser\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_offers_v_blocks_journal_teaser_locales_locale_parent_id_uni\` ON \`_offers_v_blocks_journal_teaser_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_offers_v_blocks_today_status\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`show_whatsapp\` integer DEFAULT true,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_offers_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_offers_v_blocks_today_status_order_idx\` ON \`_offers_v_blocks_today_status\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_offers_v_blocks_today_status_parent_id_idx\` ON \`_offers_v_blocks_today_status\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_offers_v_blocks_today_status_path_idx\` ON \`_offers_v_blocks_today_status\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_offers_v_blocks_today_status_locales\` (
  	\`heading\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_offers_v_blocks_today_status\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_offers_v_blocks_today_status_locales_locale_parent_id_uniqu\` ON \`_offers_v_blocks_today_status_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_offers_v_blocks_countdown\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`ends_at\` text,
  	\`tone\` text DEFAULT 'ink',
  	\`cta_href\` text,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_offers_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_offers_v_blocks_countdown_order_idx\` ON \`_offers_v_blocks_countdown\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_offers_v_blocks_countdown_parent_id_idx\` ON \`_offers_v_blocks_countdown\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_offers_v_blocks_countdown_path_idx\` ON \`_offers_v_blocks_countdown\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_offers_v_blocks_countdown_locales\` (
  	\`heading\` text,
  	\`body\` text,
  	\`cta_label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_offers_v_blocks_countdown\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_offers_v_blocks_countdown_locales_locale_parent_id_unique\` ON \`_offers_v_blocks_countdown_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_offers_v_blocks_image_text\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`image_id\` integer,
  	\`image_side\` text DEFAULT 'right',
  	\`tone\` text DEFAULT 'white',
  	\`cta_href\` text,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_offers_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_offers_v_blocks_image_text_order_idx\` ON \`_offers_v_blocks_image_text\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_offers_v_blocks_image_text_parent_id_idx\` ON \`_offers_v_blocks_image_text\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_offers_v_blocks_image_text_path_idx\` ON \`_offers_v_blocks_image_text\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`_offers_v_blocks_image_text_image_idx\` ON \`_offers_v_blocks_image_text\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`_offers_v_blocks_image_text_locales\` (
  	\`eyebrow\` text,
  	\`heading\` text,
  	\`body\` text,
  	\`cta_label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_offers_v_blocks_image_text\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_offers_v_blocks_image_text_locales_locale_parent_id_unique\` ON \`_offers_v_blocks_image_text_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_offers_v_blocks_rich_text\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`tone\` text DEFAULT 'white',
  	\`width\` text DEFAULT 'narrow',
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_offers_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_offers_v_blocks_rich_text_order_idx\` ON \`_offers_v_blocks_rich_text\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_offers_v_blocks_rich_text_parent_id_idx\` ON \`_offers_v_blocks_rich_text\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_offers_v_blocks_rich_text_path_idx\` ON \`_offers_v_blocks_rich_text\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_offers_v_blocks_rich_text_locales\` (
  	\`content\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_offers_v_blocks_rich_text\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_offers_v_blocks_rich_text_locales_locale_parent_id_unique\` ON \`_offers_v_blocks_rich_text_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_offers_v_blocks_gallery\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_offers_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_offers_v_blocks_gallery_order_idx\` ON \`_offers_v_blocks_gallery\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_offers_v_blocks_gallery_parent_id_idx\` ON \`_offers_v_blocks_gallery\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_offers_v_blocks_gallery_path_idx\` ON \`_offers_v_blocks_gallery\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_offers_v_blocks_gallery_locales\` (
  	\`heading\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_offers_v_blocks_gallery\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_offers_v_blocks_gallery_locales_locale_parent_id_unique\` ON \`_offers_v_blocks_gallery_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_offers_v_blocks_faq\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_offers_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_offers_v_blocks_faq_order_idx\` ON \`_offers_v_blocks_faq\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_offers_v_blocks_faq_parent_id_idx\` ON \`_offers_v_blocks_faq\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_offers_v_blocks_faq_path_idx\` ON \`_offers_v_blocks_faq\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_offers_v_blocks_faq_locales\` (
  	\`heading\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_offers_v_blocks_faq\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_offers_v_blocks_faq_locales_locale_parent_id_unique\` ON \`_offers_v_blocks_faq_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_offers_v_blocks_lead_form\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`form_type\` text DEFAULT 'offers',
  	\`tone\` text DEFAULT 'yellow',
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_offers_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_offers_v_blocks_lead_form_order_idx\` ON \`_offers_v_blocks_lead_form\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_offers_v_blocks_lead_form_parent_id_idx\` ON \`_offers_v_blocks_lead_form\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_offers_v_blocks_lead_form_path_idx\` ON \`_offers_v_blocks_lead_form\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_offers_v_blocks_lead_form_locales\` (
  	\`heading\` text,
  	\`body\` text,
  	\`button_label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_offers_v_blocks_lead_form\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_offers_v_blocks_lead_form_locales_locale_parent_id_unique\` ON \`_offers_v_blocks_lead_form_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_offers_v_blocks_cta_band\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`tone\` text DEFAULT 'coral',
  	\`primary_href\` text,
  	\`secondary_href\` text,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_offers_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_offers_v_blocks_cta_band_order_idx\` ON \`_offers_v_blocks_cta_band\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_offers_v_blocks_cta_band_parent_id_idx\` ON \`_offers_v_blocks_cta_band\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_offers_v_blocks_cta_band_path_idx\` ON \`_offers_v_blocks_cta_band\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_offers_v_blocks_cta_band_locales\` (
  	\`heading\` text,
  	\`body\` text,
  	\`primary_label\` text,
  	\`secondary_label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_offers_v_blocks_cta_band\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_offers_v_blocks_cta_band_locales_locale_parent_id_unique\` ON \`_offers_v_blocks_cta_band_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_offers_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`parent_id\` integer,
  	\`version_slug\` text,
  	\`version_category\` text,
  	\`version_status\` text DEFAULT 'Live',
  	\`version_valid_from\` text,
  	\`version_valid_to\` text,
  	\`version_promo_code\` text,
  	\`version_theme\` text DEFAULT 'dry',
  	\`version_image_id\` integer,
  	\`version_cta_href\` text,
  	\`version_show_on_home\` integer,
  	\`version_order\` numeric DEFAULT 0,
  	\`version_landing_enabled\` integer DEFAULT true,
  	\`version_landing_goal\` text DEFAULT 'book',
  	\`version_meta_image_id\` integer,
  	\`version_meta_noindex\` integer,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`version__status\` text DEFAULT 'draft',
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`snapshot\` integer,
  	\`published_locale\` text,
  	\`latest\` integer,
  	\`autosave\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`offers\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_meta_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`_offers_v_parent_idx\` ON \`_offers_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_offers_v_version_version_slug_idx\` ON \`_offers_v\` (\`version_slug\`);`)
  await db.run(sql`CREATE INDEX \`_offers_v_version_version_image_idx\` ON \`_offers_v\` (\`version_image_id\`);`)
  await db.run(sql`CREATE INDEX \`_offers_v_version_meta_version_meta_image_idx\` ON \`_offers_v\` (\`version_meta_image_id\`);`)
  await db.run(sql`CREATE INDEX \`_offers_v_version_version_updated_at_idx\` ON \`_offers_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_offers_v_version_version_created_at_idx\` ON \`_offers_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_offers_v_version_version__status_idx\` ON \`_offers_v\` (\`version__status\`);`)
  await db.run(sql`CREATE INDEX \`_offers_v_created_at_idx\` ON \`_offers_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_offers_v_updated_at_idx\` ON \`_offers_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_offers_v_snapshot_idx\` ON \`_offers_v\` (\`snapshot\`);`)
  await db.run(sql`CREATE INDEX \`_offers_v_published_locale_idx\` ON \`_offers_v\` (\`published_locale\`);`)
  await db.run(sql`CREATE INDEX \`_offers_v_latest_idx\` ON \`_offers_v\` (\`latest\`);`)
  await db.run(sql`CREATE INDEX \`_offers_v_autosave_idx\` ON \`_offers_v\` (\`autosave\`);`)
  await db.run(sql`CREATE TABLE \`_offers_v_locales\` (
  	\`version_name\` text,
  	\`version_tag\` text,
  	\`version_deal\` text,
  	\`version_terms\` text,
  	\`version_cta_label\` text,
  	\`version_meta_title\` text,
  	\`version_meta_description\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_offers_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_offers_v_locales_locale_parent_id_unique\` ON \`_offers_v_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_offers_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`media_id\` integer,
  	\`tickets_id\` integer,
  	\`events_id\` integer,
  	\`offers_id\` integer,
  	\`crews_id\` integer,
  	\`faqs_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_offers_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`tickets_id\`) REFERENCES \`tickets\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`events_id\`) REFERENCES \`events\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`offers_id\`) REFERENCES \`offers\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`crews_id\`) REFERENCES \`crews\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`faqs_id\`) REFERENCES \`faqs\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_offers_v_rels_order_idx\` ON \`_offers_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_offers_v_rels_parent_idx\` ON \`_offers_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_offers_v_rels_path_idx\` ON \`_offers_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_offers_v_rels_media_id_idx\` ON \`_offers_v_rels\` (\`media_id\`);`)
  await db.run(sql`CREATE INDEX \`_offers_v_rels_tickets_id_idx\` ON \`_offers_v_rels\` (\`tickets_id\`);`)
  await db.run(sql`CREATE INDEX \`_offers_v_rels_events_id_idx\` ON \`_offers_v_rels\` (\`events_id\`);`)
  await db.run(sql`CREATE INDEX \`_offers_v_rels_offers_id_idx\` ON \`_offers_v_rels\` (\`offers_id\`);`)
  await db.run(sql`CREATE INDEX \`_offers_v_rels_crews_id_idx\` ON \`_offers_v_rels\` (\`crews_id\`);`)
  await db.run(sql`CREATE INDEX \`_offers_v_rels_faqs_id_idx\` ON \`_offers_v_rels\` (\`faqs_id\`);`)
  await db.run(sql`CREATE TABLE \`events_months\` (
  	\`order\` integer NOT NULL,
  	\`parent_id\` integer NOT NULL,
  	\`value\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`events\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`events_months_order_idx\` ON \`events_months\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`events_months_parent_idx\` ON \`events_months\` (\`parent_id\`);`)
  await db.run(sql`CREATE TABLE \`events_landing_variants\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`key\` text DEFAULT 'a',
  	\`name\` text,
  	\`weight\` numeric DEFAULT 50,
  	\`image_id\` integer,
  	\`tone\` text DEFAULT 'coral',
  	\`cta_href\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`events\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`events_landing_variants_order_idx\` ON \`events_landing_variants\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`events_landing_variants_parent_id_idx\` ON \`events_landing_variants\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`events_landing_variants_image_idx\` ON \`events_landing_variants\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`events_landing_variants_locales\` (
  	\`headline\` text,
  	\`subhead\` text,
  	\`cta_label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`events_landing_variants\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`events_landing_variants_locales_locale_parent_id_unique\` ON \`events_landing_variants_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`events_blocks_hero_slides\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`tone\` text DEFAULT 'ink',
  	\`image_id\` integer,
  	\`cta_href\` text,
  	\`secondary_href\` text,
  	\`is_brand_headline\` integer,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`events_blocks_hero\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`events_blocks_hero_slides_order_idx\` ON \`events_blocks_hero_slides\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`events_blocks_hero_slides_parent_id_idx\` ON \`events_blocks_hero_slides\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`events_blocks_hero_slides_image_idx\` ON \`events_blocks_hero_slides\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`events_blocks_hero_slides_locales\` (
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
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`events_blocks_hero_slides\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`events_blocks_hero_slides_locales_locale_parent_id_unique\` ON \`events_blocks_hero_slides_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`events_blocks_hero\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`style\` text DEFAULT 'framed',
  	\`autoplay_seconds\` numeric DEFAULT 6.5,
  	\`show_booking_box\` integer DEFAULT true,
  	\`video_id\` integer,
  	\`block_name\` text,
  	FOREIGN KEY (\`video_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`events\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`events_blocks_hero_order_idx\` ON \`events_blocks_hero\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`events_blocks_hero_parent_id_idx\` ON \`events_blocks_hero\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`events_blocks_hero_path_idx\` ON \`events_blocks_hero\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`events_blocks_hero_video_idx\` ON \`events_blocks_hero\` (\`video_id\`);`)
  await db.run(sql`CREATE TABLE \`events_blocks_ticker_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`href\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`events_blocks_ticker\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`events_blocks_ticker_items_order_idx\` ON \`events_blocks_ticker_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`events_blocks_ticker_items_parent_id_idx\` ON \`events_blocks_ticker_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`events_blocks_ticker_items_locales\` (
  	\`label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`events_blocks_ticker_items\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`events_blocks_ticker_items_locales_locale_parent_id_unique\` ON \`events_blocks_ticker_items_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`events_blocks_ticker\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`tone\` text DEFAULT 'yellow',
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`events\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`events_blocks_ticker_order_idx\` ON \`events_blocks_ticker\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`events_blocks_ticker_parent_id_idx\` ON \`events_blocks_ticker\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`events_blocks_ticker_path_idx\` ON \`events_blocks_ticker\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`events_blocks_ticket_cards\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`tone\` text DEFAULT 'cream',
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`events\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`events_blocks_ticket_cards_order_idx\` ON \`events_blocks_ticket_cards\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`events_blocks_ticket_cards_parent_id_idx\` ON \`events_blocks_ticket_cards\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`events_blocks_ticket_cards_path_idx\` ON \`events_blocks_ticket_cards\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`events_blocks_ticket_cards_locales\` (
  	\`eyebrow\` text,
  	\`heading\` text,
  	\`intro\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`events_blocks_ticket_cards\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`events_blocks_ticket_cards_locales_locale_parent_id_unique\` ON \`events_blocks_ticket_cards_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`events_blocks_events_rail\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`tone\` text DEFAULT 'wet',
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`events\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`events_blocks_events_rail_order_idx\` ON \`events_blocks_events_rail\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`events_blocks_events_rail_parent_id_idx\` ON \`events_blocks_events_rail\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`events_blocks_events_rail_path_idx\` ON \`events_blocks_events_rail\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`events_blocks_events_rail_locales\` (
  	\`eyebrow\` text,
  	\`heading\` text,
  	\`intro\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`events_blocks_events_rail\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`events_blocks_events_rail_locales_locale_parent_id_unique\` ON \`events_blocks_events_rail_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`events_blocks_offer_grid\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`tone\` text DEFAULT 'white',
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`events\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`events_blocks_offer_grid_order_idx\` ON \`events_blocks_offer_grid\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`events_blocks_offer_grid_parent_id_idx\` ON \`events_blocks_offer_grid\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`events_blocks_offer_grid_path_idx\` ON \`events_blocks_offer_grid\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`events_blocks_offer_grid_locales\` (
  	\`heading\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`events_blocks_offer_grid\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`events_blocks_offer_grid_locales_locale_parent_id_unique\` ON \`events_blocks_offer_grid_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`events_blocks_worlds_grid\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`events\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`events_blocks_worlds_grid_order_idx\` ON \`events_blocks_worlds_grid\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`events_blocks_worlds_grid_parent_id_idx\` ON \`events_blocks_worlds_grid\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`events_blocks_worlds_grid_path_idx\` ON \`events_blocks_worlds_grid\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`events_blocks_worlds_grid_locales\` (
  	\`eyebrow\` text,
  	\`heading\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`events_blocks_worlds_grid\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`events_blocks_worlds_grid_locales_locale_parent_id_unique\` ON \`events_blocks_worlds_grid_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`events_blocks_stats_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`events_blocks_stats\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`events_blocks_stats_items_order_idx\` ON \`events_blocks_stats_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`events_blocks_stats_items_parent_id_idx\` ON \`events_blocks_stats_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`events_blocks_stats_items_locales\` (
  	\`value\` text,
  	\`label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`events_blocks_stats_items\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`events_blocks_stats_items_locales_locale_parent_id_unique\` ON \`events_blocks_stats_items_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`events_blocks_stats\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`tone\` text DEFAULT 'dry',
  	\`show_trust\` integer DEFAULT true,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`events\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`events_blocks_stats_order_idx\` ON \`events_blocks_stats\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`events_blocks_stats_parent_id_idx\` ON \`events_blocks_stats\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`events_blocks_stats_path_idx\` ON \`events_blocks_stats\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`events_blocks_stats_locales\` (
  	\`heading\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`events_blocks_stats\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`events_blocks_stats_locales_locale_parent_id_unique\` ON \`events_blocks_stats_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`events_blocks_crew_planner\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`events\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`events_blocks_crew_planner_order_idx\` ON \`events_blocks_crew_planner\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`events_blocks_crew_planner_parent_id_idx\` ON \`events_blocks_crew_planner\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`events_blocks_crew_planner_path_idx\` ON \`events_blocks_crew_planner\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`events_blocks_crew_planner_locales\` (
  	\`heading\` text,
  	\`intro\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`events_blocks_crew_planner\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`events_blocks_crew_planner_locales_locale_parent_id_unique\` ON \`events_blocks_crew_planner_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`events_blocks_moments_wall\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`count\` numeric DEFAULT 8,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`events\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`events_blocks_moments_wall_order_idx\` ON \`events_blocks_moments_wall\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`events_blocks_moments_wall_parent_id_idx\` ON \`events_blocks_moments_wall\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`events_blocks_moments_wall_path_idx\` ON \`events_blocks_moments_wall\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`events_blocks_moments_wall_locales\` (
  	\`heading\` text,
  	\`intro\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`events_blocks_moments_wall\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`events_blocks_moments_wall_locales_locale_parent_id_unique\` ON \`events_blocks_moments_wall_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`events_blocks_journal_teaser\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`tone\` text DEFAULT 'cream',
  	\`count\` numeric DEFAULT 3,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`events\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`events_blocks_journal_teaser_order_idx\` ON \`events_blocks_journal_teaser\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`events_blocks_journal_teaser_parent_id_idx\` ON \`events_blocks_journal_teaser\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`events_blocks_journal_teaser_path_idx\` ON \`events_blocks_journal_teaser\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`events_blocks_journal_teaser_locales\` (
  	\`eyebrow\` text,
  	\`heading\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`events_blocks_journal_teaser\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`events_blocks_journal_teaser_locales_locale_parent_id_unique\` ON \`events_blocks_journal_teaser_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`events_blocks_today_status\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`show_whatsapp\` integer DEFAULT true,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`events\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`events_blocks_today_status_order_idx\` ON \`events_blocks_today_status\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`events_blocks_today_status_parent_id_idx\` ON \`events_blocks_today_status\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`events_blocks_today_status_path_idx\` ON \`events_blocks_today_status\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`events_blocks_today_status_locales\` (
  	\`heading\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`events_blocks_today_status\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`events_blocks_today_status_locales_locale_parent_id_unique\` ON \`events_blocks_today_status_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`events_blocks_countdown\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`ends_at\` text,
  	\`tone\` text DEFAULT 'ink',
  	\`cta_href\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`events\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`events_blocks_countdown_order_idx\` ON \`events_blocks_countdown\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`events_blocks_countdown_parent_id_idx\` ON \`events_blocks_countdown\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`events_blocks_countdown_path_idx\` ON \`events_blocks_countdown\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`events_blocks_countdown_locales\` (
  	\`heading\` text,
  	\`body\` text,
  	\`cta_label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`events_blocks_countdown\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`events_blocks_countdown_locales_locale_parent_id_unique\` ON \`events_blocks_countdown_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`events_blocks_image_text\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`image_id\` integer,
  	\`image_side\` text DEFAULT 'right',
  	\`tone\` text DEFAULT 'white',
  	\`cta_href\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`events\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`events_blocks_image_text_order_idx\` ON \`events_blocks_image_text\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`events_blocks_image_text_parent_id_idx\` ON \`events_blocks_image_text\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`events_blocks_image_text_path_idx\` ON \`events_blocks_image_text\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`events_blocks_image_text_image_idx\` ON \`events_blocks_image_text\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`events_blocks_image_text_locales\` (
  	\`eyebrow\` text,
  	\`heading\` text,
  	\`body\` text,
  	\`cta_label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`events_blocks_image_text\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`events_blocks_image_text_locales_locale_parent_id_unique\` ON \`events_blocks_image_text_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`events_blocks_rich_text\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`tone\` text DEFAULT 'white',
  	\`width\` text DEFAULT 'narrow',
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`events\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`events_blocks_rich_text_order_idx\` ON \`events_blocks_rich_text\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`events_blocks_rich_text_parent_id_idx\` ON \`events_blocks_rich_text\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`events_blocks_rich_text_path_idx\` ON \`events_blocks_rich_text\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`events_blocks_rich_text_locales\` (
  	\`content\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`events_blocks_rich_text\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`events_blocks_rich_text_locales_locale_parent_id_unique\` ON \`events_blocks_rich_text_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`events_blocks_gallery\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`events\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`events_blocks_gallery_order_idx\` ON \`events_blocks_gallery\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`events_blocks_gallery_parent_id_idx\` ON \`events_blocks_gallery\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`events_blocks_gallery_path_idx\` ON \`events_blocks_gallery\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`events_blocks_gallery_locales\` (
  	\`heading\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`events_blocks_gallery\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`events_blocks_gallery_locales_locale_parent_id_unique\` ON \`events_blocks_gallery_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`events_blocks_faq\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`events\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`events_blocks_faq_order_idx\` ON \`events_blocks_faq\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`events_blocks_faq_parent_id_idx\` ON \`events_blocks_faq\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`events_blocks_faq_path_idx\` ON \`events_blocks_faq\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`events_blocks_faq_locales\` (
  	\`heading\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`events_blocks_faq\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`events_blocks_faq_locales_locale_parent_id_unique\` ON \`events_blocks_faq_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`events_blocks_lead_form\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`form_type\` text DEFAULT 'offers',
  	\`tone\` text DEFAULT 'yellow',
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`events\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`events_blocks_lead_form_order_idx\` ON \`events_blocks_lead_form\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`events_blocks_lead_form_parent_id_idx\` ON \`events_blocks_lead_form\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`events_blocks_lead_form_path_idx\` ON \`events_blocks_lead_form\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`events_blocks_lead_form_locales\` (
  	\`heading\` text,
  	\`body\` text,
  	\`button_label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`events_blocks_lead_form\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`events_blocks_lead_form_locales_locale_parent_id_unique\` ON \`events_blocks_lead_form_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`events_blocks_cta_band\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`tone\` text DEFAULT 'coral',
  	\`primary_href\` text,
  	\`secondary_href\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`events\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`events_blocks_cta_band_order_idx\` ON \`events_blocks_cta_band\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`events_blocks_cta_band_parent_id_idx\` ON \`events_blocks_cta_band\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`events_blocks_cta_band_path_idx\` ON \`events_blocks_cta_band\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`events_blocks_cta_band_locales\` (
  	\`heading\` text,
  	\`body\` text,
  	\`primary_label\` text,
  	\`secondary_label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`events_blocks_cta_band\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`events_blocks_cta_band_locales_locale_parent_id_unique\` ON \`events_blocks_cta_band_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`events\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`slug\` text,
  	\`start_date\` text,
  	\`end_date\` text,
  	\`image_id\` integer,
  	\`tone\` text DEFAULT 'dry',
  	\`kind\` text DEFAULT 'seasonal',
  	\`highlight\` integer,
  	\`cta_href\` text,
  	\`order\` numeric DEFAULT 0,
  	\`landing_enabled\` integer DEFAULT true,
  	\`landing_goal\` text DEFAULT 'book',
  	\`meta_image_id\` integer,
  	\`meta_noindex\` integer,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`_status\` text DEFAULT 'draft',
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`meta_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`events_slug_idx\` ON \`events\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`events_image_idx\` ON \`events\` (\`image_id\`);`)
  await db.run(sql`CREATE INDEX \`events_meta_meta_image_idx\` ON \`events\` (\`meta_image_id\`);`)
  await db.run(sql`CREATE INDEX \`events_updated_at_idx\` ON \`events\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`events_created_at_idx\` ON \`events\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`events__status_idx\` ON \`events\` (\`_status\`);`)
  await db.run(sql`CREATE TABLE \`events_locales\` (
  	\`name\` text,
  	\`when\` text,
  	\`blurb\` text,
  	\`cta_label\` text,
  	\`meta_title\` text,
  	\`meta_description\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`events\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`events_locales_locale_parent_id_unique\` ON \`events_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`events_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`media_id\` integer,
  	\`tickets_id\` integer,
  	\`events_id\` integer,
  	\`offers_id\` integer,
  	\`crews_id\` integer,
  	\`faqs_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`events\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`tickets_id\`) REFERENCES \`tickets\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`events_id\`) REFERENCES \`events\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`offers_id\`) REFERENCES \`offers\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`crews_id\`) REFERENCES \`crews\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`faqs_id\`) REFERENCES \`faqs\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`events_rels_order_idx\` ON \`events_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`events_rels_parent_idx\` ON \`events_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`events_rels_path_idx\` ON \`events_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`events_rels_media_id_idx\` ON \`events_rels\` (\`media_id\`);`)
  await db.run(sql`CREATE INDEX \`events_rels_tickets_id_idx\` ON \`events_rels\` (\`tickets_id\`);`)
  await db.run(sql`CREATE INDEX \`events_rels_events_id_idx\` ON \`events_rels\` (\`events_id\`);`)
  await db.run(sql`CREATE INDEX \`events_rels_offers_id_idx\` ON \`events_rels\` (\`offers_id\`);`)
  await db.run(sql`CREATE INDEX \`events_rels_crews_id_idx\` ON \`events_rels\` (\`crews_id\`);`)
  await db.run(sql`CREATE INDEX \`events_rels_faqs_id_idx\` ON \`events_rels\` (\`faqs_id\`);`)
  await db.run(sql`CREATE TABLE \`_events_v_version_months\` (
  	\`order\` integer NOT NULL,
  	\`parent_id\` integer NOT NULL,
  	\`value\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_events_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_events_v_version_months_order_idx\` ON \`_events_v_version_months\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_events_v_version_months_parent_idx\` ON \`_events_v_version_months\` (\`parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_events_v_version_landing_variants\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`key\` text DEFAULT 'a',
  	\`name\` text,
  	\`weight\` numeric DEFAULT 50,
  	\`image_id\` integer,
  	\`tone\` text DEFAULT 'coral',
  	\`cta_href\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_events_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_events_v_version_landing_variants_order_idx\` ON \`_events_v_version_landing_variants\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_events_v_version_landing_variants_parent_id_idx\` ON \`_events_v_version_landing_variants\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_events_v_version_landing_variants_image_idx\` ON \`_events_v_version_landing_variants\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`_events_v_version_landing_variants_locales\` (
  	\`headline\` text,
  	\`subhead\` text,
  	\`cta_label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_events_v_version_landing_variants\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_events_v_version_landing_variants_locales_locale_parent_id_\` ON \`_events_v_version_landing_variants_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_events_v_blocks_hero_slides\` (
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
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_events_v_blocks_hero\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_events_v_blocks_hero_slides_order_idx\` ON \`_events_v_blocks_hero_slides\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_events_v_blocks_hero_slides_parent_id_idx\` ON \`_events_v_blocks_hero_slides\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_events_v_blocks_hero_slides_image_idx\` ON \`_events_v_blocks_hero_slides\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`_events_v_blocks_hero_slides_locales\` (
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
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_events_v_blocks_hero_slides\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_events_v_blocks_hero_slides_locales_locale_parent_id_unique\` ON \`_events_v_blocks_hero_slides_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_events_v_blocks_hero\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`style\` text DEFAULT 'framed',
  	\`autoplay_seconds\` numeric DEFAULT 6.5,
  	\`show_booking_box\` integer DEFAULT true,
  	\`video_id\` integer,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`video_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_events_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_events_v_blocks_hero_order_idx\` ON \`_events_v_blocks_hero\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_events_v_blocks_hero_parent_id_idx\` ON \`_events_v_blocks_hero\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_events_v_blocks_hero_path_idx\` ON \`_events_v_blocks_hero\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`_events_v_blocks_hero_video_idx\` ON \`_events_v_blocks_hero\` (\`video_id\`);`)
  await db.run(sql`CREATE TABLE \`_events_v_blocks_ticker_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`href\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_events_v_blocks_ticker\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_events_v_blocks_ticker_items_order_idx\` ON \`_events_v_blocks_ticker_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_events_v_blocks_ticker_items_parent_id_idx\` ON \`_events_v_blocks_ticker_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_events_v_blocks_ticker_items_locales\` (
  	\`label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_events_v_blocks_ticker_items\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_events_v_blocks_ticker_items_locales_locale_parent_id_uniqu\` ON \`_events_v_blocks_ticker_items_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_events_v_blocks_ticker\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`tone\` text DEFAULT 'yellow',
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_events_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_events_v_blocks_ticker_order_idx\` ON \`_events_v_blocks_ticker\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_events_v_blocks_ticker_parent_id_idx\` ON \`_events_v_blocks_ticker\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_events_v_blocks_ticker_path_idx\` ON \`_events_v_blocks_ticker\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_events_v_blocks_ticket_cards\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`tone\` text DEFAULT 'cream',
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_events_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_events_v_blocks_ticket_cards_order_idx\` ON \`_events_v_blocks_ticket_cards\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_events_v_blocks_ticket_cards_parent_id_idx\` ON \`_events_v_blocks_ticket_cards\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_events_v_blocks_ticket_cards_path_idx\` ON \`_events_v_blocks_ticket_cards\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_events_v_blocks_ticket_cards_locales\` (
  	\`eyebrow\` text,
  	\`heading\` text,
  	\`intro\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_events_v_blocks_ticket_cards\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_events_v_blocks_ticket_cards_locales_locale_parent_id_uniqu\` ON \`_events_v_blocks_ticket_cards_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_events_v_blocks_events_rail\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`tone\` text DEFAULT 'wet',
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_events_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_events_v_blocks_events_rail_order_idx\` ON \`_events_v_blocks_events_rail\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_events_v_blocks_events_rail_parent_id_idx\` ON \`_events_v_blocks_events_rail\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_events_v_blocks_events_rail_path_idx\` ON \`_events_v_blocks_events_rail\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_events_v_blocks_events_rail_locales\` (
  	\`eyebrow\` text,
  	\`heading\` text,
  	\`intro\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_events_v_blocks_events_rail\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_events_v_blocks_events_rail_locales_locale_parent_id_unique\` ON \`_events_v_blocks_events_rail_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_events_v_blocks_offer_grid\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`tone\` text DEFAULT 'white',
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_events_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_events_v_blocks_offer_grid_order_idx\` ON \`_events_v_blocks_offer_grid\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_events_v_blocks_offer_grid_parent_id_idx\` ON \`_events_v_blocks_offer_grid\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_events_v_blocks_offer_grid_path_idx\` ON \`_events_v_blocks_offer_grid\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_events_v_blocks_offer_grid_locales\` (
  	\`heading\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_events_v_blocks_offer_grid\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_events_v_blocks_offer_grid_locales_locale_parent_id_unique\` ON \`_events_v_blocks_offer_grid_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_events_v_blocks_worlds_grid\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_events_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_events_v_blocks_worlds_grid_order_idx\` ON \`_events_v_blocks_worlds_grid\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_events_v_blocks_worlds_grid_parent_id_idx\` ON \`_events_v_blocks_worlds_grid\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_events_v_blocks_worlds_grid_path_idx\` ON \`_events_v_blocks_worlds_grid\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_events_v_blocks_worlds_grid_locales\` (
  	\`eyebrow\` text,
  	\`heading\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_events_v_blocks_worlds_grid\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_events_v_blocks_worlds_grid_locales_locale_parent_id_unique\` ON \`_events_v_blocks_worlds_grid_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_events_v_blocks_stats_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_events_v_blocks_stats\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_events_v_blocks_stats_items_order_idx\` ON \`_events_v_blocks_stats_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_events_v_blocks_stats_items_parent_id_idx\` ON \`_events_v_blocks_stats_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_events_v_blocks_stats_items_locales\` (
  	\`value\` text,
  	\`label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_events_v_blocks_stats_items\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_events_v_blocks_stats_items_locales_locale_parent_id_unique\` ON \`_events_v_blocks_stats_items_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_events_v_blocks_stats\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`tone\` text DEFAULT 'dry',
  	\`show_trust\` integer DEFAULT true,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_events_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_events_v_blocks_stats_order_idx\` ON \`_events_v_blocks_stats\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_events_v_blocks_stats_parent_id_idx\` ON \`_events_v_blocks_stats\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_events_v_blocks_stats_path_idx\` ON \`_events_v_blocks_stats\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_events_v_blocks_stats_locales\` (
  	\`heading\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_events_v_blocks_stats\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_events_v_blocks_stats_locales_locale_parent_id_unique\` ON \`_events_v_blocks_stats_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_events_v_blocks_crew_planner\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_events_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_events_v_blocks_crew_planner_order_idx\` ON \`_events_v_blocks_crew_planner\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_events_v_blocks_crew_planner_parent_id_idx\` ON \`_events_v_blocks_crew_planner\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_events_v_blocks_crew_planner_path_idx\` ON \`_events_v_blocks_crew_planner\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_events_v_blocks_crew_planner_locales\` (
  	\`heading\` text,
  	\`intro\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_events_v_blocks_crew_planner\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_events_v_blocks_crew_planner_locales_locale_parent_id_uniqu\` ON \`_events_v_blocks_crew_planner_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_events_v_blocks_moments_wall\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`count\` numeric DEFAULT 8,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_events_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_events_v_blocks_moments_wall_order_idx\` ON \`_events_v_blocks_moments_wall\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_events_v_blocks_moments_wall_parent_id_idx\` ON \`_events_v_blocks_moments_wall\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_events_v_blocks_moments_wall_path_idx\` ON \`_events_v_blocks_moments_wall\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_events_v_blocks_moments_wall_locales\` (
  	\`heading\` text,
  	\`intro\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_events_v_blocks_moments_wall\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_events_v_blocks_moments_wall_locales_locale_parent_id_uniqu\` ON \`_events_v_blocks_moments_wall_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_events_v_blocks_journal_teaser\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`tone\` text DEFAULT 'cream',
  	\`count\` numeric DEFAULT 3,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_events_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_events_v_blocks_journal_teaser_order_idx\` ON \`_events_v_blocks_journal_teaser\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_events_v_blocks_journal_teaser_parent_id_idx\` ON \`_events_v_blocks_journal_teaser\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_events_v_blocks_journal_teaser_path_idx\` ON \`_events_v_blocks_journal_teaser\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_events_v_blocks_journal_teaser_locales\` (
  	\`eyebrow\` text,
  	\`heading\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_events_v_blocks_journal_teaser\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_events_v_blocks_journal_teaser_locales_locale_parent_id_uni\` ON \`_events_v_blocks_journal_teaser_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_events_v_blocks_today_status\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`show_whatsapp\` integer DEFAULT true,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_events_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_events_v_blocks_today_status_order_idx\` ON \`_events_v_blocks_today_status\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_events_v_blocks_today_status_parent_id_idx\` ON \`_events_v_blocks_today_status\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_events_v_blocks_today_status_path_idx\` ON \`_events_v_blocks_today_status\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_events_v_blocks_today_status_locales\` (
  	\`heading\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_events_v_blocks_today_status\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_events_v_blocks_today_status_locales_locale_parent_id_uniqu\` ON \`_events_v_blocks_today_status_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_events_v_blocks_countdown\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`ends_at\` text,
  	\`tone\` text DEFAULT 'ink',
  	\`cta_href\` text,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_events_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_events_v_blocks_countdown_order_idx\` ON \`_events_v_blocks_countdown\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_events_v_blocks_countdown_parent_id_idx\` ON \`_events_v_blocks_countdown\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_events_v_blocks_countdown_path_idx\` ON \`_events_v_blocks_countdown\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_events_v_blocks_countdown_locales\` (
  	\`heading\` text,
  	\`body\` text,
  	\`cta_label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_events_v_blocks_countdown\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_events_v_blocks_countdown_locales_locale_parent_id_unique\` ON \`_events_v_blocks_countdown_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_events_v_blocks_image_text\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`image_id\` integer,
  	\`image_side\` text DEFAULT 'right',
  	\`tone\` text DEFAULT 'white',
  	\`cta_href\` text,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_events_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_events_v_blocks_image_text_order_idx\` ON \`_events_v_blocks_image_text\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_events_v_blocks_image_text_parent_id_idx\` ON \`_events_v_blocks_image_text\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_events_v_blocks_image_text_path_idx\` ON \`_events_v_blocks_image_text\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`_events_v_blocks_image_text_image_idx\` ON \`_events_v_blocks_image_text\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`_events_v_blocks_image_text_locales\` (
  	\`eyebrow\` text,
  	\`heading\` text,
  	\`body\` text,
  	\`cta_label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_events_v_blocks_image_text\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_events_v_blocks_image_text_locales_locale_parent_id_unique\` ON \`_events_v_blocks_image_text_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_events_v_blocks_rich_text\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`tone\` text DEFAULT 'white',
  	\`width\` text DEFAULT 'narrow',
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_events_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_events_v_blocks_rich_text_order_idx\` ON \`_events_v_blocks_rich_text\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_events_v_blocks_rich_text_parent_id_idx\` ON \`_events_v_blocks_rich_text\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_events_v_blocks_rich_text_path_idx\` ON \`_events_v_blocks_rich_text\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_events_v_blocks_rich_text_locales\` (
  	\`content\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_events_v_blocks_rich_text\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_events_v_blocks_rich_text_locales_locale_parent_id_unique\` ON \`_events_v_blocks_rich_text_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_events_v_blocks_gallery\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_events_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_events_v_blocks_gallery_order_idx\` ON \`_events_v_blocks_gallery\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_events_v_blocks_gallery_parent_id_idx\` ON \`_events_v_blocks_gallery\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_events_v_blocks_gallery_path_idx\` ON \`_events_v_blocks_gallery\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_events_v_blocks_gallery_locales\` (
  	\`heading\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_events_v_blocks_gallery\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_events_v_blocks_gallery_locales_locale_parent_id_unique\` ON \`_events_v_blocks_gallery_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_events_v_blocks_faq\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_events_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_events_v_blocks_faq_order_idx\` ON \`_events_v_blocks_faq\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_events_v_blocks_faq_parent_id_idx\` ON \`_events_v_blocks_faq\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_events_v_blocks_faq_path_idx\` ON \`_events_v_blocks_faq\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_events_v_blocks_faq_locales\` (
  	\`heading\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_events_v_blocks_faq\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_events_v_blocks_faq_locales_locale_parent_id_unique\` ON \`_events_v_blocks_faq_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_events_v_blocks_lead_form\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`form_type\` text DEFAULT 'offers',
  	\`tone\` text DEFAULT 'yellow',
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_events_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_events_v_blocks_lead_form_order_idx\` ON \`_events_v_blocks_lead_form\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_events_v_blocks_lead_form_parent_id_idx\` ON \`_events_v_blocks_lead_form\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_events_v_blocks_lead_form_path_idx\` ON \`_events_v_blocks_lead_form\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_events_v_blocks_lead_form_locales\` (
  	\`heading\` text,
  	\`body\` text,
  	\`button_label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_events_v_blocks_lead_form\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_events_v_blocks_lead_form_locales_locale_parent_id_unique\` ON \`_events_v_blocks_lead_form_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_events_v_blocks_cta_band\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`tone\` text DEFAULT 'coral',
  	\`primary_href\` text,
  	\`secondary_href\` text,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_events_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_events_v_blocks_cta_band_order_idx\` ON \`_events_v_blocks_cta_band\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_events_v_blocks_cta_band_parent_id_idx\` ON \`_events_v_blocks_cta_band\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_events_v_blocks_cta_band_path_idx\` ON \`_events_v_blocks_cta_band\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_events_v_blocks_cta_band_locales\` (
  	\`heading\` text,
  	\`body\` text,
  	\`primary_label\` text,
  	\`secondary_label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_events_v_blocks_cta_band\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_events_v_blocks_cta_band_locales_locale_parent_id_unique\` ON \`_events_v_blocks_cta_band_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_events_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`parent_id\` integer,
  	\`version_slug\` text,
  	\`version_start_date\` text,
  	\`version_end_date\` text,
  	\`version_image_id\` integer,
  	\`version_tone\` text DEFAULT 'dry',
  	\`version_kind\` text DEFAULT 'seasonal',
  	\`version_highlight\` integer,
  	\`version_cta_href\` text,
  	\`version_order\` numeric DEFAULT 0,
  	\`version_landing_enabled\` integer DEFAULT true,
  	\`version_landing_goal\` text DEFAULT 'book',
  	\`version_meta_image_id\` integer,
  	\`version_meta_noindex\` integer,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`version__status\` text DEFAULT 'draft',
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`snapshot\` integer,
  	\`published_locale\` text,
  	\`latest\` integer,
  	\`autosave\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`events\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_meta_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`_events_v_parent_idx\` ON \`_events_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_events_v_version_version_slug_idx\` ON \`_events_v\` (\`version_slug\`);`)
  await db.run(sql`CREATE INDEX \`_events_v_version_version_image_idx\` ON \`_events_v\` (\`version_image_id\`);`)
  await db.run(sql`CREATE INDEX \`_events_v_version_meta_version_meta_image_idx\` ON \`_events_v\` (\`version_meta_image_id\`);`)
  await db.run(sql`CREATE INDEX \`_events_v_version_version_updated_at_idx\` ON \`_events_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_events_v_version_version_created_at_idx\` ON \`_events_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_events_v_version_version__status_idx\` ON \`_events_v\` (\`version__status\`);`)
  await db.run(sql`CREATE INDEX \`_events_v_created_at_idx\` ON \`_events_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_events_v_updated_at_idx\` ON \`_events_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_events_v_snapshot_idx\` ON \`_events_v\` (\`snapshot\`);`)
  await db.run(sql`CREATE INDEX \`_events_v_published_locale_idx\` ON \`_events_v\` (\`published_locale\`);`)
  await db.run(sql`CREATE INDEX \`_events_v_latest_idx\` ON \`_events_v\` (\`latest\`);`)
  await db.run(sql`CREATE INDEX \`_events_v_autosave_idx\` ON \`_events_v\` (\`autosave\`);`)
  await db.run(sql`CREATE TABLE \`_events_v_locales\` (
  	\`version_name\` text,
  	\`version_when\` text,
  	\`version_blurb\` text,
  	\`version_cta_label\` text,
  	\`version_meta_title\` text,
  	\`version_meta_description\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_events_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_events_v_locales_locale_parent_id_unique\` ON \`_events_v_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_events_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`media_id\` integer,
  	\`tickets_id\` integer,
  	\`events_id\` integer,
  	\`offers_id\` integer,
  	\`crews_id\` integer,
  	\`faqs_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_events_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`tickets_id\`) REFERENCES \`tickets\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`events_id\`) REFERENCES \`events\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`offers_id\`) REFERENCES \`offers\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`crews_id\`) REFERENCES \`crews\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`faqs_id\`) REFERENCES \`faqs\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_events_v_rels_order_idx\` ON \`_events_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_events_v_rels_parent_idx\` ON \`_events_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_events_v_rels_path_idx\` ON \`_events_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_events_v_rels_media_id_idx\` ON \`_events_v_rels\` (\`media_id\`);`)
  await db.run(sql`CREATE INDEX \`_events_v_rels_tickets_id_idx\` ON \`_events_v_rels\` (\`tickets_id\`);`)
  await db.run(sql`CREATE INDEX \`_events_v_rels_events_id_idx\` ON \`_events_v_rels\` (\`events_id\`);`)
  await db.run(sql`CREATE INDEX \`_events_v_rels_offers_id_idx\` ON \`_events_v_rels\` (\`offers_id\`);`)
  await db.run(sql`CREATE INDEX \`_events_v_rels_crews_id_idx\` ON \`_events_v_rels\` (\`crews_id\`);`)
  await db.run(sql`CREATE INDEX \`_events_v_rels_faqs_id_idx\` ON \`_events_v_rels\` (\`faqs_id\`);`)
  await db.run(sql`CREATE TABLE \`posts_blocks_p\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`posts_blocks_p_order_idx\` ON \`posts_blocks_p\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`posts_blocks_p_parent_id_idx\` ON \`posts_blocks_p\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`posts_blocks_p_path_idx\` ON \`posts_blocks_p\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`posts_blocks_p_locales\` (
  	\`text\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`posts_blocks_p\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`posts_blocks_p_locales_locale_parent_id_unique\` ON \`posts_blocks_p_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`posts_blocks_h2\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`posts_blocks_h2_order_idx\` ON \`posts_blocks_h2\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`posts_blocks_h2_parent_id_idx\` ON \`posts_blocks_h2\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`posts_blocks_h2_path_idx\` ON \`posts_blocks_h2\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`posts_blocks_h2_locales\` (
  	\`text\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`posts_blocks_h2\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`posts_blocks_h2_locales_locale_parent_id_unique\` ON \`posts_blocks_h2_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`posts_blocks_list_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`posts_blocks_list\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`posts_blocks_list_items_order_idx\` ON \`posts_blocks_list_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`posts_blocks_list_items_parent_id_idx\` ON \`posts_blocks_list_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`posts_blocks_list_items_locales\` (
  	\`text\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`posts_blocks_list_items\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`posts_blocks_list_items_locales_locale_parent_id_unique\` ON \`posts_blocks_list_items_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`posts_blocks_list\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`posts_blocks_list_order_idx\` ON \`posts_blocks_list\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`posts_blocks_list_parent_id_idx\` ON \`posts_blocks_list\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`posts_blocks_list_path_idx\` ON \`posts_blocks_list\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`posts_blocks_tip\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`posts_blocks_tip_order_idx\` ON \`posts_blocks_tip\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`posts_blocks_tip_parent_id_idx\` ON \`posts_blocks_tip\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`posts_blocks_tip_path_idx\` ON \`posts_blocks_tip\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`posts_blocks_tip_locales\` (
  	\`text\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`posts_blocks_tip\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`posts_blocks_tip_locales_locale_parent_id_unique\` ON \`posts_blocks_tip_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`posts_blocks_cta\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`href\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`posts_blocks_cta_order_idx\` ON \`posts_blocks_cta\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`posts_blocks_cta_parent_id_idx\` ON \`posts_blocks_cta\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`posts_blocks_cta_path_idx\` ON \`posts_blocks_cta\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`posts_blocks_cta_locales\` (
  	\`text\` text,
  	\`label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`posts_blocks_cta\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`posts_blocks_cta_locales_locale_parent_id_unique\` ON \`posts_blocks_cta_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`posts_faqs\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`posts_faqs_order_idx\` ON \`posts_faqs\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`posts_faqs_parent_id_idx\` ON \`posts_faqs\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`posts_faqs_locales\` (
  	\`q\` text,
  	\`a\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`posts_faqs\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`posts_faqs_locales_locale_parent_id_unique\` ON \`posts_faqs_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`posts\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`slug\` text,
  	\`category\` text,
  	\`published\` text,
  	\`read_mins\` numeric DEFAULT 4,
  	\`hero_id\` integer,
  	\`meta_image_id\` integer,
  	\`meta_noindex\` integer,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`_status\` text DEFAULT 'draft',
  	FOREIGN KEY (\`hero_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`meta_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`posts_slug_idx\` ON \`posts\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`posts_hero_idx\` ON \`posts\` (\`hero_id\`);`)
  await db.run(sql`CREATE INDEX \`posts_meta_meta_image_idx\` ON \`posts\` (\`meta_image_id\`);`)
  await db.run(sql`CREATE INDEX \`posts_updated_at_idx\` ON \`posts\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`posts_created_at_idx\` ON \`posts\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`posts__status_idx\` ON \`posts\` (\`_status\`);`)
  await db.run(sql`CREATE TABLE \`posts_locales\` (
  	\`title\` text,
  	\`excerpt\` text,
  	\`meta_title\` text,
  	\`meta_description\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`posts_locales_locale_parent_id_unique\` ON \`posts_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`posts_texts\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer NOT NULL,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`text\` text,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`posts_texts_order_parent\` ON \`posts_texts\` (\`order\`,\`parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_posts_v_blocks_p\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_posts_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_posts_v_blocks_p_order_idx\` ON \`_posts_v_blocks_p\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_blocks_p_parent_id_idx\` ON \`_posts_v_blocks_p\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_blocks_p_path_idx\` ON \`_posts_v_blocks_p\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_posts_v_blocks_p_locales\` (
  	\`text\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_posts_v_blocks_p\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_posts_v_blocks_p_locales_locale_parent_id_unique\` ON \`_posts_v_blocks_p_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_posts_v_blocks_h2\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_posts_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_posts_v_blocks_h2_order_idx\` ON \`_posts_v_blocks_h2\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_blocks_h2_parent_id_idx\` ON \`_posts_v_blocks_h2\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_blocks_h2_path_idx\` ON \`_posts_v_blocks_h2\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_posts_v_blocks_h2_locales\` (
  	\`text\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_posts_v_blocks_h2\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_posts_v_blocks_h2_locales_locale_parent_id_unique\` ON \`_posts_v_blocks_h2_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_posts_v_blocks_list_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_posts_v_blocks_list\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_posts_v_blocks_list_items_order_idx\` ON \`_posts_v_blocks_list_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_blocks_list_items_parent_id_idx\` ON \`_posts_v_blocks_list_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_posts_v_blocks_list_items_locales\` (
  	\`text\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_posts_v_blocks_list_items\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_posts_v_blocks_list_items_locales_locale_parent_id_unique\` ON \`_posts_v_blocks_list_items_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_posts_v_blocks_list\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_posts_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_posts_v_blocks_list_order_idx\` ON \`_posts_v_blocks_list\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_blocks_list_parent_id_idx\` ON \`_posts_v_blocks_list\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_blocks_list_path_idx\` ON \`_posts_v_blocks_list\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_posts_v_blocks_tip\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_posts_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_posts_v_blocks_tip_order_idx\` ON \`_posts_v_blocks_tip\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_blocks_tip_parent_id_idx\` ON \`_posts_v_blocks_tip\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_blocks_tip_path_idx\` ON \`_posts_v_blocks_tip\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_posts_v_blocks_tip_locales\` (
  	\`text\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_posts_v_blocks_tip\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_posts_v_blocks_tip_locales_locale_parent_id_unique\` ON \`_posts_v_blocks_tip_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_posts_v_blocks_cta\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`href\` text,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_posts_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_posts_v_blocks_cta_order_idx\` ON \`_posts_v_blocks_cta\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_blocks_cta_parent_id_idx\` ON \`_posts_v_blocks_cta\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_blocks_cta_path_idx\` ON \`_posts_v_blocks_cta\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_posts_v_blocks_cta_locales\` (
  	\`text\` text,
  	\`label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_posts_v_blocks_cta\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_posts_v_blocks_cta_locales_locale_parent_id_unique\` ON \`_posts_v_blocks_cta_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_posts_v_version_faqs\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_posts_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_posts_v_version_faqs_order_idx\` ON \`_posts_v_version_faqs\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_version_faqs_parent_id_idx\` ON \`_posts_v_version_faqs\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_posts_v_version_faqs_locales\` (
  	\`q\` text,
  	\`a\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_posts_v_version_faqs\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_posts_v_version_faqs_locales_locale_parent_id_unique\` ON \`_posts_v_version_faqs_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_posts_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`parent_id\` integer,
  	\`version_slug\` text,
  	\`version_category\` text,
  	\`version_published\` text,
  	\`version_read_mins\` numeric DEFAULT 4,
  	\`version_hero_id\` integer,
  	\`version_meta_image_id\` integer,
  	\`version_meta_noindex\` integer,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`version__status\` text DEFAULT 'draft',
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`snapshot\` integer,
  	\`published_locale\` text,
  	\`latest\` integer,
  	\`autosave\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_hero_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_meta_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`_posts_v_parent_idx\` ON \`_posts_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_version_version_slug_idx\` ON \`_posts_v\` (\`version_slug\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_version_version_hero_idx\` ON \`_posts_v\` (\`version_hero_id\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_version_meta_version_meta_image_idx\` ON \`_posts_v\` (\`version_meta_image_id\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_version_version_updated_at_idx\` ON \`_posts_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_version_version_created_at_idx\` ON \`_posts_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_version_version__status_idx\` ON \`_posts_v\` (\`version__status\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_created_at_idx\` ON \`_posts_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_updated_at_idx\` ON \`_posts_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_snapshot_idx\` ON \`_posts_v\` (\`snapshot\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_published_locale_idx\` ON \`_posts_v\` (\`published_locale\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_latest_idx\` ON \`_posts_v\` (\`latest\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_autosave_idx\` ON \`_posts_v\` (\`autosave\`);`)
  await db.run(sql`CREATE TABLE \`_posts_v_locales\` (
  	\`version_title\` text,
  	\`version_excerpt\` text,
  	\`version_meta_title\` text,
  	\`version_meta_description\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_posts_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_posts_v_locales_locale_parent_id_unique\` ON \`_posts_v_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_posts_v_texts\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer NOT NULL,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`text\` text,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_posts_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_posts_v_texts_order_parent\` ON \`_posts_v_texts\` (\`order\`,\`parent_id\`);`)
  await db.run(sql`CREATE TABLE \`tickets_includes\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`tickets\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`tickets_includes_order_idx\` ON \`tickets_includes\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`tickets_includes_parent_id_idx\` ON \`tickets_includes\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`tickets_includes_locales\` (
  	\`text\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`tickets_includes\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`tickets_includes_locales_locale_parent_id_unique\` ON \`tickets_includes_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`tickets_excludes\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`tickets\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`tickets_excludes_order_idx\` ON \`tickets_excludes\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`tickets_excludes_parent_id_idx\` ON \`tickets_excludes\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`tickets_excludes_locales\` (
  	\`text\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`tickets_excludes\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`tickets_excludes_locales_locale_parent_id_unique\` ON \`tickets_excludes_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`tickets\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`code\` text NOT NULL,
  	\`semnox_product_id\` text,
  	\`popular\` integer,
  	\`price\` numeric NOT NULL,
  	\`student_price\` numeric,
  	\`fun_fest_price\` numeric,
  	\`order\` numeric DEFAULT 0,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`tickets_code_idx\` ON \`tickets\` (\`code\`);`)
  await db.run(sql`CREATE INDEX \`tickets_updated_at_idx\` ON \`tickets\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`tickets_created_at_idx\` ON \`tickets\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`tickets_locales\` (
  	\`name\` text NOT NULL,
  	\`short_name\` text NOT NULL,
  	\`summary\` text,
  	\`description\` text,
  	\`fast_track\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`tickets\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`tickets_locales_locale_parent_id_unique\` ON \`tickets_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`extras\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`code\` text NOT NULL,
  	\`semnox_product_id\` text,
  	\`price\` numeric NOT NULL,
  	\`image_id\` integer,
  	\`needs_lane_slot\` integer,
  	\`order\` numeric DEFAULT 0,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`extras_code_idx\` ON \`extras\` (\`code\`);`)
  await db.run(sql`CREATE INDEX \`extras_image_idx\` ON \`extras\` (\`image_id\`);`)
  await db.run(sql`CREATE INDEX \`extras_updated_at_idx\` ON \`extras\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`extras_created_at_idx\` ON \`extras\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`extras_locales\` (
  	\`name\` text NOT NULL,
  	\`note\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`extras\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`extras_locales_locale_parent_id_unique\` ON \`extras_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`worlds_facts\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`worlds\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`worlds_facts_order_idx\` ON \`worlds_facts\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`worlds_facts_parent_id_idx\` ON \`worlds_facts\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`worlds_facts_locales\` (
  	\`k\` text,
  	\`v\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`worlds_facts\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`worlds_facts_locales_locale_parent_id_unique\` ON \`worlds_facts_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`worlds_blocks_hero_slides\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`tone\` text DEFAULT 'ink',
  	\`image_id\` integer,
  	\`cta_href\` text NOT NULL,
  	\`secondary_href\` text,
  	\`is_brand_headline\` integer,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`worlds_blocks_hero\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`worlds_blocks_hero_slides_order_idx\` ON \`worlds_blocks_hero_slides\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`worlds_blocks_hero_slides_parent_id_idx\` ON \`worlds_blocks_hero_slides\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`worlds_blocks_hero_slides_image_idx\` ON \`worlds_blocks_hero_slides\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`worlds_blocks_hero_slides_locales\` (
  	\`tab\` text NOT NULL,
  	\`badge\` text,
  	\`eyebrow\` text,
  	\`title\` text NOT NULL,
  	\`body\` text,
  	\`price\` text,
  	\`cta_label\` text NOT NULL,
  	\`secondary_label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`worlds_blocks_hero_slides\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`worlds_blocks_hero_slides_locales_locale_parent_id_unique\` ON \`worlds_blocks_hero_slides_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`worlds_blocks_hero\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`style\` text DEFAULT 'framed' NOT NULL,
  	\`autoplay_seconds\` numeric DEFAULT 6.5,
  	\`show_booking_box\` integer DEFAULT true,
  	\`video_id\` integer,
  	\`block_name\` text,
  	FOREIGN KEY (\`video_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`worlds\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`worlds_blocks_hero_order_idx\` ON \`worlds_blocks_hero\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`worlds_blocks_hero_parent_id_idx\` ON \`worlds_blocks_hero\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`worlds_blocks_hero_path_idx\` ON \`worlds_blocks_hero\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`worlds_blocks_hero_video_idx\` ON \`worlds_blocks_hero\` (\`video_id\`);`)
  await db.run(sql`CREATE TABLE \`worlds_blocks_ticker_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`href\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`worlds_blocks_ticker\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`worlds_blocks_ticker_items_order_idx\` ON \`worlds_blocks_ticker_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`worlds_blocks_ticker_items_parent_id_idx\` ON \`worlds_blocks_ticker_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`worlds_blocks_ticker_items_locales\` (
  	\`label\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`worlds_blocks_ticker_items\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`worlds_blocks_ticker_items_locales_locale_parent_id_unique\` ON \`worlds_blocks_ticker_items_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`worlds_blocks_ticker\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`tone\` text DEFAULT 'yellow',
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`worlds\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`worlds_blocks_ticker_order_idx\` ON \`worlds_blocks_ticker\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`worlds_blocks_ticker_parent_id_idx\` ON \`worlds_blocks_ticker\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`worlds_blocks_ticker_path_idx\` ON \`worlds_blocks_ticker\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`worlds_blocks_ticket_cards\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`tone\` text DEFAULT 'cream',
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`worlds\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`worlds_blocks_ticket_cards_order_idx\` ON \`worlds_blocks_ticket_cards\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`worlds_blocks_ticket_cards_parent_id_idx\` ON \`worlds_blocks_ticket_cards\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`worlds_blocks_ticket_cards_path_idx\` ON \`worlds_blocks_ticket_cards\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`worlds_blocks_ticket_cards_locales\` (
  	\`eyebrow\` text,
  	\`heading\` text,
  	\`intro\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`worlds_blocks_ticket_cards\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`worlds_blocks_ticket_cards_locales_locale_parent_id_unique\` ON \`worlds_blocks_ticket_cards_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`worlds_blocks_events_rail\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`tone\` text DEFAULT 'wet',
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`worlds\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`worlds_blocks_events_rail_order_idx\` ON \`worlds_blocks_events_rail\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`worlds_blocks_events_rail_parent_id_idx\` ON \`worlds_blocks_events_rail\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`worlds_blocks_events_rail_path_idx\` ON \`worlds_blocks_events_rail\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`worlds_blocks_events_rail_locales\` (
  	\`eyebrow\` text,
  	\`heading\` text,
  	\`intro\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`worlds_blocks_events_rail\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`worlds_blocks_events_rail_locales_locale_parent_id_unique\` ON \`worlds_blocks_events_rail_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`worlds_blocks_offer_grid\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`tone\` text DEFAULT 'white',
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`worlds\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`worlds_blocks_offer_grid_order_idx\` ON \`worlds_blocks_offer_grid\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`worlds_blocks_offer_grid_parent_id_idx\` ON \`worlds_blocks_offer_grid\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`worlds_blocks_offer_grid_path_idx\` ON \`worlds_blocks_offer_grid\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`worlds_blocks_offer_grid_locales\` (
  	\`heading\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`worlds_blocks_offer_grid\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`worlds_blocks_offer_grid_locales_locale_parent_id_unique\` ON \`worlds_blocks_offer_grid_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`worlds_blocks_worlds_grid\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`worlds\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`worlds_blocks_worlds_grid_order_idx\` ON \`worlds_blocks_worlds_grid\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`worlds_blocks_worlds_grid_parent_id_idx\` ON \`worlds_blocks_worlds_grid\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`worlds_blocks_worlds_grid_path_idx\` ON \`worlds_blocks_worlds_grid\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`worlds_blocks_worlds_grid_locales\` (
  	\`eyebrow\` text,
  	\`heading\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`worlds_blocks_worlds_grid\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`worlds_blocks_worlds_grid_locales_locale_parent_id_unique\` ON \`worlds_blocks_worlds_grid_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`worlds_blocks_stats_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`worlds_blocks_stats\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`worlds_blocks_stats_items_order_idx\` ON \`worlds_blocks_stats_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`worlds_blocks_stats_items_parent_id_idx\` ON \`worlds_blocks_stats_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`worlds_blocks_stats_items_locales\` (
  	\`value\` text,
  	\`label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`worlds_blocks_stats_items\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`worlds_blocks_stats_items_locales_locale_parent_id_unique\` ON \`worlds_blocks_stats_items_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`worlds_blocks_stats\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`tone\` text DEFAULT 'dry',
  	\`show_trust\` integer DEFAULT true,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`worlds\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`worlds_blocks_stats_order_idx\` ON \`worlds_blocks_stats\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`worlds_blocks_stats_parent_id_idx\` ON \`worlds_blocks_stats\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`worlds_blocks_stats_path_idx\` ON \`worlds_blocks_stats\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`worlds_blocks_stats_locales\` (
  	\`heading\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`worlds_blocks_stats\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`worlds_blocks_stats_locales_locale_parent_id_unique\` ON \`worlds_blocks_stats_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`worlds_blocks_crew_planner\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`worlds\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`worlds_blocks_crew_planner_order_idx\` ON \`worlds_blocks_crew_planner\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`worlds_blocks_crew_planner_parent_id_idx\` ON \`worlds_blocks_crew_planner\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`worlds_blocks_crew_planner_path_idx\` ON \`worlds_blocks_crew_planner\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`worlds_blocks_crew_planner_locales\` (
  	\`heading\` text,
  	\`intro\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`worlds_blocks_crew_planner\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`worlds_blocks_crew_planner_locales_locale_parent_id_unique\` ON \`worlds_blocks_crew_planner_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`worlds_blocks_moments_wall\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`count\` numeric DEFAULT 8,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`worlds\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`worlds_blocks_moments_wall_order_idx\` ON \`worlds_blocks_moments_wall\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`worlds_blocks_moments_wall_parent_id_idx\` ON \`worlds_blocks_moments_wall\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`worlds_blocks_moments_wall_path_idx\` ON \`worlds_blocks_moments_wall\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`worlds_blocks_moments_wall_locales\` (
  	\`heading\` text,
  	\`intro\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`worlds_blocks_moments_wall\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`worlds_blocks_moments_wall_locales_locale_parent_id_unique\` ON \`worlds_blocks_moments_wall_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`worlds_blocks_journal_teaser\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`tone\` text DEFAULT 'cream',
  	\`count\` numeric DEFAULT 3,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`worlds\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`worlds_blocks_journal_teaser_order_idx\` ON \`worlds_blocks_journal_teaser\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`worlds_blocks_journal_teaser_parent_id_idx\` ON \`worlds_blocks_journal_teaser\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`worlds_blocks_journal_teaser_path_idx\` ON \`worlds_blocks_journal_teaser\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`worlds_blocks_journal_teaser_locales\` (
  	\`eyebrow\` text,
  	\`heading\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`worlds_blocks_journal_teaser\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`worlds_blocks_journal_teaser_locales_locale_parent_id_unique\` ON \`worlds_blocks_journal_teaser_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`worlds_blocks_today_status\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`show_whatsapp\` integer DEFAULT true,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`worlds\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`worlds_blocks_today_status_order_idx\` ON \`worlds_blocks_today_status\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`worlds_blocks_today_status_parent_id_idx\` ON \`worlds_blocks_today_status\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`worlds_blocks_today_status_path_idx\` ON \`worlds_blocks_today_status\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`worlds_blocks_today_status_locales\` (
  	\`heading\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`worlds_blocks_today_status\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`worlds_blocks_today_status_locales_locale_parent_id_unique\` ON \`worlds_blocks_today_status_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`worlds_blocks_countdown\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`ends_at\` text NOT NULL,
  	\`tone\` text DEFAULT 'ink',
  	\`cta_href\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`worlds\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`worlds_blocks_countdown_order_idx\` ON \`worlds_blocks_countdown\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`worlds_blocks_countdown_parent_id_idx\` ON \`worlds_blocks_countdown\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`worlds_blocks_countdown_path_idx\` ON \`worlds_blocks_countdown\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`worlds_blocks_countdown_locales\` (
  	\`heading\` text,
  	\`body\` text,
  	\`cta_label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`worlds_blocks_countdown\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`worlds_blocks_countdown_locales_locale_parent_id_unique\` ON \`worlds_blocks_countdown_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`worlds_blocks_image_text\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`image_id\` integer NOT NULL,
  	\`image_side\` text DEFAULT 'right',
  	\`tone\` text DEFAULT 'white',
  	\`cta_href\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`worlds\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`worlds_blocks_image_text_order_idx\` ON \`worlds_blocks_image_text\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`worlds_blocks_image_text_parent_id_idx\` ON \`worlds_blocks_image_text\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`worlds_blocks_image_text_path_idx\` ON \`worlds_blocks_image_text\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`worlds_blocks_image_text_image_idx\` ON \`worlds_blocks_image_text\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`worlds_blocks_image_text_locales\` (
  	\`eyebrow\` text,
  	\`heading\` text,
  	\`body\` text,
  	\`cta_label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`worlds_blocks_image_text\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`worlds_blocks_image_text_locales_locale_parent_id_unique\` ON \`worlds_blocks_image_text_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`worlds_blocks_rich_text\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`tone\` text DEFAULT 'white',
  	\`width\` text DEFAULT 'narrow',
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`worlds\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`worlds_blocks_rich_text_order_idx\` ON \`worlds_blocks_rich_text\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`worlds_blocks_rich_text_parent_id_idx\` ON \`worlds_blocks_rich_text\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`worlds_blocks_rich_text_path_idx\` ON \`worlds_blocks_rich_text\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`worlds_blocks_rich_text_locales\` (
  	\`content\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`worlds_blocks_rich_text\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`worlds_blocks_rich_text_locales_locale_parent_id_unique\` ON \`worlds_blocks_rich_text_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`worlds_blocks_gallery\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`worlds\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`worlds_blocks_gallery_order_idx\` ON \`worlds_blocks_gallery\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`worlds_blocks_gallery_parent_id_idx\` ON \`worlds_blocks_gallery\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`worlds_blocks_gallery_path_idx\` ON \`worlds_blocks_gallery\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`worlds_blocks_gallery_locales\` (
  	\`heading\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`worlds_blocks_gallery\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`worlds_blocks_gallery_locales_locale_parent_id_unique\` ON \`worlds_blocks_gallery_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`worlds_blocks_faq\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`worlds\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`worlds_blocks_faq_order_idx\` ON \`worlds_blocks_faq\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`worlds_blocks_faq_parent_id_idx\` ON \`worlds_blocks_faq\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`worlds_blocks_faq_path_idx\` ON \`worlds_blocks_faq\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`worlds_blocks_faq_locales\` (
  	\`heading\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`worlds_blocks_faq\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`worlds_blocks_faq_locales_locale_parent_id_unique\` ON \`worlds_blocks_faq_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`worlds_blocks_lead_form\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`form_type\` text DEFAULT 'offers',
  	\`tone\` text DEFAULT 'yellow',
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`worlds\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`worlds_blocks_lead_form_order_idx\` ON \`worlds_blocks_lead_form\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`worlds_blocks_lead_form_parent_id_idx\` ON \`worlds_blocks_lead_form\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`worlds_blocks_lead_form_path_idx\` ON \`worlds_blocks_lead_form\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`worlds_blocks_lead_form_locales\` (
  	\`heading\` text,
  	\`body\` text,
  	\`button_label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`worlds_blocks_lead_form\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`worlds_blocks_lead_form_locales_locale_parent_id_unique\` ON \`worlds_blocks_lead_form_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`worlds_blocks_cta_band\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`tone\` text DEFAULT 'coral',
  	\`primary_href\` text NOT NULL,
  	\`secondary_href\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`worlds\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`worlds_blocks_cta_band_order_idx\` ON \`worlds_blocks_cta_band\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`worlds_blocks_cta_band_parent_id_idx\` ON \`worlds_blocks_cta_band\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`worlds_blocks_cta_band_path_idx\` ON \`worlds_blocks_cta_band\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`worlds_blocks_cta_band_locales\` (
  	\`heading\` text,
  	\`body\` text,
  	\`primary_label\` text NOT NULL,
  	\`secondary_label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`worlds_blocks_cta_band\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`worlds_blocks_cta_band_locales_locale_parent_id_unique\` ON \`worlds_blocks_cta_band_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`worlds\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`key\` text NOT NULL,
  	\`coming_soon\` integer,
  	\`slug\` text NOT NULL,
  	\`hero_id\` integer,
  	\`card_image_id\` integer,
  	\`cta_href\` text NOT NULL,
  	\`tab_cta_href\` text,
  	\`order\` numeric DEFAULT 0,
  	\`meta_image_id\` integer,
  	\`meta_noindex\` integer,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`hero_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`card_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`meta_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`worlds_key_idx\` ON \`worlds\` (\`key\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`worlds_slug_idx\` ON \`worlds\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`worlds_hero_idx\` ON \`worlds\` (\`hero_id\`);`)
  await db.run(sql`CREATE INDEX \`worlds_card_card_image_idx\` ON \`worlds\` (\`card_image_id\`);`)
  await db.run(sql`CREATE INDEX \`worlds_meta_meta_image_idx\` ON \`worlds\` (\`meta_image_id\`);`)
  await db.run(sql`CREATE INDEX \`worlds_updated_at_idx\` ON \`worlds\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`worlds_created_at_idx\` ON \`worlds\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`worlds_locales\` (
  	\`name\` text NOT NULL,
  	\`kicker\` text,
  	\`pitch\` text,
  	\`lede\` text,
  	\`card_blurb\` text,
  	\`card_price_line\` text,
  	\`cta_label\` text NOT NULL,
  	\`tab_cta_label\` text,
  	\`tab_cta_sub\` text,
  	\`rides_title\` text,
  	\`meta_title\` text,
  	\`meta_description\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`worlds\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`worlds_locales_locale_parent_id_unique\` ON \`worlds_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`worlds_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`media_id\` integer,
  	\`tickets_id\` integer,
  	\`events_id\` integer,
  	\`offers_id\` integer,
  	\`crews_id\` integer,
  	\`faqs_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`worlds\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`tickets_id\`) REFERENCES \`tickets\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`events_id\`) REFERENCES \`events\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`offers_id\`) REFERENCES \`offers\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`crews_id\`) REFERENCES \`crews\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`faqs_id\`) REFERENCES \`faqs\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`worlds_rels_order_idx\` ON \`worlds_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`worlds_rels_parent_idx\` ON \`worlds_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`worlds_rels_path_idx\` ON \`worlds_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`worlds_rels_media_id_idx\` ON \`worlds_rels\` (\`media_id\`);`)
  await db.run(sql`CREATE INDEX \`worlds_rels_tickets_id_idx\` ON \`worlds_rels\` (\`tickets_id\`);`)
  await db.run(sql`CREATE INDEX \`worlds_rels_events_id_idx\` ON \`worlds_rels\` (\`events_id\`);`)
  await db.run(sql`CREATE INDEX \`worlds_rels_offers_id_idx\` ON \`worlds_rels\` (\`offers_id\`);`)
  await db.run(sql`CREATE INDEX \`worlds_rels_crews_id_idx\` ON \`worlds_rels\` (\`crews_id\`);`)
  await db.run(sql`CREATE INDEX \`worlds_rels_faqs_id_idx\` ON \`worlds_rels\` (\`faqs_id\`);`)
  await db.run(sql`CREATE TABLE \`rides\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`slug\` text NOT NULL,
  	\`world\` text NOT NULL,
  	\`kind\` text NOT NULL,
  	\`access\` text NOT NULL,
  	\`status\` text DEFAULT 'open',
  	\`image_id\` integer,
  	\`order\` numeric DEFAULT 0,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`rides_slug_idx\` ON \`rides\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`rides_image_idx\` ON \`rides\` (\`image_id\`);`)
  await db.run(sql`CREATE INDEX \`rides_updated_at_idx\` ON \`rides\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`rides_created_at_idx\` ON \`rides\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`rides_locales\` (
  	\`name\` text NOT NULL,
  	\`line\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`rides\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`rides_locales_locale_parent_id_unique\` ON \`rides_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`faqs\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` numeric DEFAULT 0,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`faqs_updated_at_idx\` ON \`faqs\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`faqs_created_at_idx\` ON \`faqs\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`faqs_locales\` (
  	\`q\` text NOT NULL,
  	\`a\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`faqs\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`faqs_locales_locale_parent_id_unique\` ON \`faqs_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`crews_steps\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`crews\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`crews_steps_order_idx\` ON \`crews_steps\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`crews_steps_parent_id_idx\` ON \`crews_steps\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`crews_steps_locales\` (
  	\`time\` text,
  	\`what\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`crews_steps\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`crews_steps_locales_locale_parent_id_unique\` ON \`crews_steps_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`crews\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`code\` text NOT NULL,
  	\`image_id\` integer,
  	\`cta_href\` text NOT NULL,
  	\`order\` numeric DEFAULT 0,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`crews_image_idx\` ON \`crews\` (\`image_id\`);`)
  await db.run(sql`CREATE INDEX \`crews_updated_at_idx\` ON \`crews\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`crews_created_at_idx\` ON \`crews\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`crews_locales\` (
  	\`label\` text NOT NULL,
  	\`title\` text,
  	\`ticket\` text,
  	\`cta_label\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`crews\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`crews_locales_locale_parent_id_unique\` ON \`crews_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`moments\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`handle\` text NOT NULL,
  	\`world\` text NOT NULL,
  	\`status\` text DEFAULT 'pending',
  	\`image_id\` integer NOT NULL,
  	\`tall\` integer,
  	\`consent\` integer,
  	\`order\` numeric DEFAULT 0,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`moments_image_idx\` ON \`moments\` (\`image_id\`);`)
  await db.run(sql`CREATE INDEX \`moments_updated_at_idx\` ON \`moments\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`moments_created_at_idx\` ON \`moments\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`moments_locales\` (
  	\`caption\` text,
  	\`ride\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`moments\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`moments_locales_locale_parent_id_unique\` ON \`moments_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`venues\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`image_id\` integer,
  	\`order\` numeric DEFAULT 0,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`venues_image_idx\` ON \`venues\` (\`image_id\`);`)
  await db.run(sql`CREATE INDEX \`venues_updated_at_idx\` ON \`venues\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`venues_created_at_idx\` ON \`venues\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`venues_locales\` (
  	\`name\` text NOT NULL,
  	\`description\` text,
  	\`capacity\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`venues\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`venues_locales_locale_parent_id_unique\` ON \`venues_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`occasions_points\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`occasions\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`occasions_points_order_idx\` ON \`occasions_points\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`occasions_points_parent_id_idx\` ON \`occasions_points\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`occasions_points_locales\` (
  	\`text\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`occasions_points\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`occasions_points_locales_locale_parent_id_unique\` ON \`occasions_points_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`occasions\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`code\` text NOT NULL,
  	\`image_id\` integer,
  	\`order\` numeric DEFAULT 0,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`occasions_image_idx\` ON \`occasions\` (\`image_id\`);`)
  await db.run(sql`CREATE INDEX \`occasions_updated_at_idx\` ON \`occasions\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`occasions_created_at_idx\` ON \`occasions\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`occasions_locales\` (
  	\`label\` text NOT NULL,
  	\`title\` text,
  	\`pitch\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`occasions\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`occasions_locales_locale_parent_id_unique\` ON \`occasions_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`audit_log\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`summary\` text,
  	\`action\` text,
  	\`collection\` text,
  	\`doc_id\` text,
  	\`user_id\` integer,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`audit_log_user_idx\` ON \`audit_log\` (\`user_id\`);`)
  await db.run(sql`CREATE INDEX \`audit_log_updated_at_idx\` ON \`audit_log\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`audit_log_created_at_idx\` ON \`audit_log\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`media\` (
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
  await db.run(sql`CREATE INDEX \`media_updated_at_idx\` ON \`media\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`media_created_at_idx\` ON \`media\` (\`created_at\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`media_filename_idx\` ON \`media\` (\`filename\`);`)
  await db.run(sql`CREATE TABLE \`media_locales\` (
  	\`alt\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`media_locales_locale_parent_id_unique\` ON \`media_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`translations\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`en\` text NOT NULL,
  	\`bn\` text,
  	\`hi\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`translations_en_idx\` ON \`translations\` (\`en\`);`)
  await db.run(sql`CREATE INDEX \`translations_updated_at_idx\` ON \`translations\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`translations_created_at_idx\` ON \`translations\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`users_sessions\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`created_at\` text,
  	\`expires_at\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`users_sessions_order_idx\` ON \`users_sessions\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`users_sessions_parent_id_idx\` ON \`users_sessions\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`users\` (
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
  await db.run(sql`CREATE INDEX \`users_updated_at_idx\` ON \`users\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`users_created_at_idx\` ON \`users\` (\`created_at\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`users_email_idx\` ON \`users\` (\`email\`);`)
  await db.run(sql`CREATE TABLE \`payload_kv\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`key\` text NOT NULL,
  	\`data\` text NOT NULL
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`payload_kv_key_idx\` ON \`payload_kv\` (\`key\`);`)
  await db.run(sql`CREATE TABLE \`payload_jobs_log\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`executed_at\` text NOT NULL,
  	\`completed_at\` text NOT NULL,
  	\`task_slug\` text NOT NULL,
  	\`task_i_d\` text NOT NULL,
  	\`input\` text,
  	\`output\` text,
  	\`state\` text NOT NULL,
  	\`error\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`payload_jobs\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_jobs_log_order_idx\` ON \`payload_jobs_log\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`payload_jobs_log_parent_id_idx\` ON \`payload_jobs_log\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`payload_jobs\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`input\` text,
  	\`completed_at\` text,
  	\`total_tried\` numeric DEFAULT 0,
  	\`has_error\` integer DEFAULT false,
  	\`error\` text,
  	\`task_slug\` text,
  	\`queue\` text DEFAULT 'default',
  	\`wait_until\` text,
  	\`processing\` integer DEFAULT false,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_jobs_completed_at_idx\` ON \`payload_jobs\` (\`completed_at\`);`)
  await db.run(sql`CREATE INDEX \`payload_jobs_total_tried_idx\` ON \`payload_jobs\` (\`total_tried\`);`)
  await db.run(sql`CREATE INDEX \`payload_jobs_has_error_idx\` ON \`payload_jobs\` (\`has_error\`);`)
  await db.run(sql`CREATE INDEX \`payload_jobs_task_slug_idx\` ON \`payload_jobs\` (\`task_slug\`);`)
  await db.run(sql`CREATE INDEX \`payload_jobs_queue_idx\` ON \`payload_jobs\` (\`queue\`);`)
  await db.run(sql`CREATE INDEX \`payload_jobs_wait_until_idx\` ON \`payload_jobs\` (\`wait_until\`);`)
  await db.run(sql`CREATE INDEX \`payload_jobs_processing_idx\` ON \`payload_jobs\` (\`processing\`);`)
  await db.run(sql`CREATE INDEX \`payload_jobs_updated_at_idx\` ON \`payload_jobs\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`payload_jobs_created_at_idx\` ON \`payload_jobs\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`payload_locked_documents\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`global_slug\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_global_slug_idx\` ON \`payload_locked_documents\` (\`global_slug\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_updated_at_idx\` ON \`payload_locked_documents\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_created_at_idx\` ON \`payload_locked_documents\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`payload_locked_documents_rels\` (
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
  await db.run(sql`CREATE TABLE \`payload_preferences\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`key\` text,
  	\`value\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_preferences_key_idx\` ON \`payload_preferences\` (\`key\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_updated_at_idx\` ON \`payload_preferences\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_created_at_idx\` ON \`payload_preferences\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`payload_preferences_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`payload_preferences\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_preferences_rels_order_idx\` ON \`payload_preferences_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_rels_parent_idx\` ON \`payload_preferences_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_rels_path_idx\` ON \`payload_preferences_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_rels_users_id_idx\` ON \`payload_preferences_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`payload_migrations\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text,
  	\`batch\` numeric,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_migrations_updated_at_idx\` ON \`payload_migrations\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`payload_migrations_created_at_idx\` ON \`payload_migrations\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`site_settings_address\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`site_settings\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`site_settings_address_order_idx\` ON \`site_settings_address\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`site_settings_address_parent_id_idx\` ON \`site_settings_address\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`site_settings_address_locales\` (
  	\`line\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`site_settings_address\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`site_settings_address_locales_locale_parent_id_unique\` ON \`site_settings_address_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`site_settings_hours\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`value\` text,
  	\`tone\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`site_settings\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`site_settings_hours_order_idx\` ON \`site_settings_hours\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`site_settings_hours_parent_id_idx\` ON \`site_settings_hours\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`site_settings_hours_locales\` (
  	\`label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`site_settings_hours\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`site_settings_hours_locales_locale_parent_id_unique\` ON \`site_settings_hours_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`site_settings_alerts\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`href\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`site_settings\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`site_settings_alerts_order_idx\` ON \`site_settings_alerts\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`site_settings_alerts_parent_id_idx\` ON \`site_settings_alerts\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`site_settings_alerts_locales\` (
  	\`title\` text,
  	\`detail\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`site_settings_alerts\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`site_settings_alerts_locales_locale_parent_id_unique\` ON \`site_settings_alerts_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`site_settings_stats\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`site_settings\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`site_settings_stats_order_idx\` ON \`site_settings_stats\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`site_settings_stats_parent_id_idx\` ON \`site_settings_stats\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`site_settings_stats_locales\` (
  	\`value\` text,
  	\`label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`site_settings_stats\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`site_settings_stats_locales_locale_parent_id_unique\` ON \`site_settings_stats_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`site_settings_trust\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`icon\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`site_settings\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`site_settings_trust_order_idx\` ON \`site_settings_trust\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`site_settings_trust_parent_id_idx\` ON \`site_settings_trust\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`site_settings_trust_locales\` (
  	\`label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`site_settings_trust\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`site_settings_trust_locales_locale_parent_id_unique\` ON \`site_settings_trust_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`site_settings_socials\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`label\` text,
  	\`href\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`site_settings\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`site_settings_socials_order_idx\` ON \`site_settings_socials\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`site_settings_socials_parent_id_idx\` ON \`site_settings_socials\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`site_settings\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text DEFAULT 'Nicco Park' NOT NULL,
  	\`legal_name\` text,
  	\`phone_display\` text,
  	\`phone_tel\` text,
  	\`whatsapp\` text,
  	\`today_hours\` text DEFAULT '10:30 AM – 6:45 PM',
  	\`default_og_image_id\` integer,
  	\`gtm_id\` text,
  	\`updated_at\` text,
  	\`created_at\` text,
  	FOREIGN KEY (\`default_og_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`site_settings_default_og_image_idx\` ON \`site_settings\` (\`default_og_image_id\`);`)
  await db.run(sql`CREATE TABLE \`site_settings_locales\` (
  	\`tagline\` text,
  	\`official_channels\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`site_settings\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`site_settings_locales_locale_parent_id_unique\` ON \`site_settings_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`header_nav\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`href\` text NOT NULL,
  	\`wide_only\` integer,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`header\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`header_nav_order_idx\` ON \`header_nav\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`header_nav_parent_id_idx\` ON \`header_nav\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`header_nav_locales\` (
  	\`label\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`header_nav\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`header_nav_locales_locale_parent_id_unique\` ON \`header_nav_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`header_more_sheet\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`href\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`header\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`header_more_sheet_order_idx\` ON \`header_more_sheet\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`header_more_sheet_parent_id_idx\` ON \`header_more_sheet\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`header_more_sheet_locales\` (
  	\`label\` text NOT NULL,
  	\`badge\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`header_more_sheet\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`header_more_sheet_locales_locale_parent_id_unique\` ON \`header_more_sheet_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`header\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`buy_href\` text NOT NULL,
  	\`updated_at\` text,
  	\`created_at\` text
  );
  `)
  await db.run(sql`CREATE TABLE \`header_locales\` (
  	\`buy_label\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`header\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`header_locales_locale_parent_id_unique\` ON \`header_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`footer_columns_links\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`href\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`footer_columns\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`footer_columns_links_order_idx\` ON \`footer_columns_links\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`footer_columns_links_parent_id_idx\` ON \`footer_columns_links\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`footer_columns_links_locales\` (
  	\`label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`footer_columns_links\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`footer_columns_links_locales_locale_parent_id_unique\` ON \`footer_columns_links_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`footer_columns\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`footer\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`footer_columns_order_idx\` ON \`footer_columns\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`footer_columns_parent_id_idx\` ON \`footer_columns\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`footer_columns_locales\` (
  	\`heading\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`footer_columns\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`footer_columns_locales_locale_parent_id_unique\` ON \`footer_columns_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`footer_legal\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`href\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`footer\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`footer_legal_order_idx\` ON \`footer_legal\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`footer_legal_parent_id_idx\` ON \`footer_legal\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`footer_legal_locales\` (
  	\`label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`footer_legal\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`footer_legal_locales_locale_parent_id_unique\` ON \`footer_legal_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`footer\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`updated_at\` text,
  	\`created_at\` text
  );
  `)
  await db.run(sql`CREATE TABLE \`footer_locales\` (
  	\`signup_heading\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`footer\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`footer_locales_locale_parent_id_unique\` ON \`footer_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`visit_routes\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`visit\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`visit_routes_order_idx\` ON \`visit_routes\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`visit_routes_parent_id_idx\` ON \`visit_routes\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`visit_routes_locales\` (
  	\`title\` text,
  	\`body\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`visit_routes\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`visit_routes_locales_locale_parent_id_unique\` ON \`visit_routes_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`visit_food\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`tone\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`visit\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`visit_food_order_idx\` ON \`visit_food\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`visit_food_parent_id_idx\` ON \`visit_food\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`visit_food_locales\` (
  	\`name\` text,
  	\`where\` text,
  	\`blurb\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`visit_food\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`visit_food_locales_locale_parent_id_unique\` ON \`visit_food_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`visit_tips\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`visit\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`visit_tips_order_idx\` ON \`visit_tips\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`visit_tips_parent_id_idx\` ON \`visit_tips\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`visit_tips_locales\` (
  	\`title\` text,
  	\`body\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`visit_tips\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`visit_tips_locales_locale_parent_id_unique\` ON \`visit_tips_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`visit\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`map_pdf_id\` integer,
  	\`updated_at\` text,
  	\`created_at\` text,
  	FOREIGN KEY (\`map_pdf_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`visit_map_pdf_idx\` ON \`visit\` (\`map_pdf_id\`);`)
  await db.run(sql`CREATE TABLE \`bowling_rates\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`bowling\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`bowling_rates_order_idx\` ON \`bowling_rates\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`bowling_rates_parent_id_idx\` ON \`bowling_rates\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`bowling_rates_locales\` (
  	\`item\` text,
  	\`price\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`bowling_rates\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`bowling_rates_locales_locale_parent_id_unique\` ON \`bowling_rates_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`bowling_lane_times\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`time\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`bowling\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`bowling_lane_times_order_idx\` ON \`bowling_lane_times\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`bowling_lane_times_parent_id_idx\` ON \`bowling_lane_times\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`bowling\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`updated_at\` text,
  	\`created_at\` text
  );
  `)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`pages_blocks_hero_slides\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_hero_slides_locales\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_hero\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_ticker_items\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_ticker_items_locales\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_ticker\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_ticket_cards\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_ticket_cards_locales\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_events_rail\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_events_rail_locales\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_offer_grid\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_offer_grid_locales\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_worlds_grid\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_worlds_grid_locales\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_stats_items\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_stats_items_locales\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_stats\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_stats_locales\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_crew_planner\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_crew_planner_locales\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_moments_wall\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_moments_wall_locales\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_journal_teaser\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_journal_teaser_locales\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_today_status\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_today_status_locales\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_countdown\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_countdown_locales\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_image_text\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_image_text_locales\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_rich_text\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_rich_text_locales\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_gallery\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_gallery_locales\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_faq\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_faq_locales\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_lead_form\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_lead_form_locales\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_cta_band\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_cta_band_locales\`;`)
  await db.run(sql`DROP TABLE \`pages\`;`)
  await db.run(sql`DROP TABLE \`pages_locales\`;`)
  await db.run(sql`DROP TABLE \`pages_rels\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_hero_slides\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_hero_slides_locales\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_hero\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_ticker_items\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_ticker_items_locales\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_ticker\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_ticket_cards\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_ticket_cards_locales\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_events_rail\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_events_rail_locales\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_offer_grid\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_offer_grid_locales\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_worlds_grid\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_worlds_grid_locales\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_stats_items\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_stats_items_locales\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_stats\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_stats_locales\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_crew_planner\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_crew_planner_locales\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_moments_wall\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_moments_wall_locales\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_journal_teaser\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_journal_teaser_locales\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_today_status\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_today_status_locales\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_countdown\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_countdown_locales\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_image_text\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_image_text_locales\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_rich_text\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_rich_text_locales\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_gallery\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_gallery_locales\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_faq\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_faq_locales\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_lead_form\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_lead_form_locales\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_cta_band\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_cta_band_locales\`;`)
  await db.run(sql`DROP TABLE \`_pages_v\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_locales\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_rels\`;`)
  await db.run(sql`DROP TABLE \`offers_landing_variants\`;`)
  await db.run(sql`DROP TABLE \`offers_landing_variants_locales\`;`)
  await db.run(sql`DROP TABLE \`offers_blocks_hero_slides\`;`)
  await db.run(sql`DROP TABLE \`offers_blocks_hero_slides_locales\`;`)
  await db.run(sql`DROP TABLE \`offers_blocks_hero\`;`)
  await db.run(sql`DROP TABLE \`offers_blocks_ticker_items\`;`)
  await db.run(sql`DROP TABLE \`offers_blocks_ticker_items_locales\`;`)
  await db.run(sql`DROP TABLE \`offers_blocks_ticker\`;`)
  await db.run(sql`DROP TABLE \`offers_blocks_ticket_cards\`;`)
  await db.run(sql`DROP TABLE \`offers_blocks_ticket_cards_locales\`;`)
  await db.run(sql`DROP TABLE \`offers_blocks_events_rail\`;`)
  await db.run(sql`DROP TABLE \`offers_blocks_events_rail_locales\`;`)
  await db.run(sql`DROP TABLE \`offers_blocks_offer_grid\`;`)
  await db.run(sql`DROP TABLE \`offers_blocks_offer_grid_locales\`;`)
  await db.run(sql`DROP TABLE \`offers_blocks_worlds_grid\`;`)
  await db.run(sql`DROP TABLE \`offers_blocks_worlds_grid_locales\`;`)
  await db.run(sql`DROP TABLE \`offers_blocks_stats_items\`;`)
  await db.run(sql`DROP TABLE \`offers_blocks_stats_items_locales\`;`)
  await db.run(sql`DROP TABLE \`offers_blocks_stats\`;`)
  await db.run(sql`DROP TABLE \`offers_blocks_stats_locales\`;`)
  await db.run(sql`DROP TABLE \`offers_blocks_crew_planner\`;`)
  await db.run(sql`DROP TABLE \`offers_blocks_crew_planner_locales\`;`)
  await db.run(sql`DROP TABLE \`offers_blocks_moments_wall\`;`)
  await db.run(sql`DROP TABLE \`offers_blocks_moments_wall_locales\`;`)
  await db.run(sql`DROP TABLE \`offers_blocks_journal_teaser\`;`)
  await db.run(sql`DROP TABLE \`offers_blocks_journal_teaser_locales\`;`)
  await db.run(sql`DROP TABLE \`offers_blocks_today_status\`;`)
  await db.run(sql`DROP TABLE \`offers_blocks_today_status_locales\`;`)
  await db.run(sql`DROP TABLE \`offers_blocks_countdown\`;`)
  await db.run(sql`DROP TABLE \`offers_blocks_countdown_locales\`;`)
  await db.run(sql`DROP TABLE \`offers_blocks_image_text\`;`)
  await db.run(sql`DROP TABLE \`offers_blocks_image_text_locales\`;`)
  await db.run(sql`DROP TABLE \`offers_blocks_rich_text\`;`)
  await db.run(sql`DROP TABLE \`offers_blocks_rich_text_locales\`;`)
  await db.run(sql`DROP TABLE \`offers_blocks_gallery\`;`)
  await db.run(sql`DROP TABLE \`offers_blocks_gallery_locales\`;`)
  await db.run(sql`DROP TABLE \`offers_blocks_faq\`;`)
  await db.run(sql`DROP TABLE \`offers_blocks_faq_locales\`;`)
  await db.run(sql`DROP TABLE \`offers_blocks_lead_form\`;`)
  await db.run(sql`DROP TABLE \`offers_blocks_lead_form_locales\`;`)
  await db.run(sql`DROP TABLE \`offers_blocks_cta_band\`;`)
  await db.run(sql`DROP TABLE \`offers_blocks_cta_band_locales\`;`)
  await db.run(sql`DROP TABLE \`offers\`;`)
  await db.run(sql`DROP TABLE \`offers_locales\`;`)
  await db.run(sql`DROP TABLE \`offers_rels\`;`)
  await db.run(sql`DROP TABLE \`_offers_v_version_landing_variants\`;`)
  await db.run(sql`DROP TABLE \`_offers_v_version_landing_variants_locales\`;`)
  await db.run(sql`DROP TABLE \`_offers_v_blocks_hero_slides\`;`)
  await db.run(sql`DROP TABLE \`_offers_v_blocks_hero_slides_locales\`;`)
  await db.run(sql`DROP TABLE \`_offers_v_blocks_hero\`;`)
  await db.run(sql`DROP TABLE \`_offers_v_blocks_ticker_items\`;`)
  await db.run(sql`DROP TABLE \`_offers_v_blocks_ticker_items_locales\`;`)
  await db.run(sql`DROP TABLE \`_offers_v_blocks_ticker\`;`)
  await db.run(sql`DROP TABLE \`_offers_v_blocks_ticket_cards\`;`)
  await db.run(sql`DROP TABLE \`_offers_v_blocks_ticket_cards_locales\`;`)
  await db.run(sql`DROP TABLE \`_offers_v_blocks_events_rail\`;`)
  await db.run(sql`DROP TABLE \`_offers_v_blocks_events_rail_locales\`;`)
  await db.run(sql`DROP TABLE \`_offers_v_blocks_offer_grid\`;`)
  await db.run(sql`DROP TABLE \`_offers_v_blocks_offer_grid_locales\`;`)
  await db.run(sql`DROP TABLE \`_offers_v_blocks_worlds_grid\`;`)
  await db.run(sql`DROP TABLE \`_offers_v_blocks_worlds_grid_locales\`;`)
  await db.run(sql`DROP TABLE \`_offers_v_blocks_stats_items\`;`)
  await db.run(sql`DROP TABLE \`_offers_v_blocks_stats_items_locales\`;`)
  await db.run(sql`DROP TABLE \`_offers_v_blocks_stats\`;`)
  await db.run(sql`DROP TABLE \`_offers_v_blocks_stats_locales\`;`)
  await db.run(sql`DROP TABLE \`_offers_v_blocks_crew_planner\`;`)
  await db.run(sql`DROP TABLE \`_offers_v_blocks_crew_planner_locales\`;`)
  await db.run(sql`DROP TABLE \`_offers_v_blocks_moments_wall\`;`)
  await db.run(sql`DROP TABLE \`_offers_v_blocks_moments_wall_locales\`;`)
  await db.run(sql`DROP TABLE \`_offers_v_blocks_journal_teaser\`;`)
  await db.run(sql`DROP TABLE \`_offers_v_blocks_journal_teaser_locales\`;`)
  await db.run(sql`DROP TABLE \`_offers_v_blocks_today_status\`;`)
  await db.run(sql`DROP TABLE \`_offers_v_blocks_today_status_locales\`;`)
  await db.run(sql`DROP TABLE \`_offers_v_blocks_countdown\`;`)
  await db.run(sql`DROP TABLE \`_offers_v_blocks_countdown_locales\`;`)
  await db.run(sql`DROP TABLE \`_offers_v_blocks_image_text\`;`)
  await db.run(sql`DROP TABLE \`_offers_v_blocks_image_text_locales\`;`)
  await db.run(sql`DROP TABLE \`_offers_v_blocks_rich_text\`;`)
  await db.run(sql`DROP TABLE \`_offers_v_blocks_rich_text_locales\`;`)
  await db.run(sql`DROP TABLE \`_offers_v_blocks_gallery\`;`)
  await db.run(sql`DROP TABLE \`_offers_v_blocks_gallery_locales\`;`)
  await db.run(sql`DROP TABLE \`_offers_v_blocks_faq\`;`)
  await db.run(sql`DROP TABLE \`_offers_v_blocks_faq_locales\`;`)
  await db.run(sql`DROP TABLE \`_offers_v_blocks_lead_form\`;`)
  await db.run(sql`DROP TABLE \`_offers_v_blocks_lead_form_locales\`;`)
  await db.run(sql`DROP TABLE \`_offers_v_blocks_cta_band\`;`)
  await db.run(sql`DROP TABLE \`_offers_v_blocks_cta_band_locales\`;`)
  await db.run(sql`DROP TABLE \`_offers_v\`;`)
  await db.run(sql`DROP TABLE \`_offers_v_locales\`;`)
  await db.run(sql`DROP TABLE \`_offers_v_rels\`;`)
  await db.run(sql`DROP TABLE \`events_months\`;`)
  await db.run(sql`DROP TABLE \`events_landing_variants\`;`)
  await db.run(sql`DROP TABLE \`events_landing_variants_locales\`;`)
  await db.run(sql`DROP TABLE \`events_blocks_hero_slides\`;`)
  await db.run(sql`DROP TABLE \`events_blocks_hero_slides_locales\`;`)
  await db.run(sql`DROP TABLE \`events_blocks_hero\`;`)
  await db.run(sql`DROP TABLE \`events_blocks_ticker_items\`;`)
  await db.run(sql`DROP TABLE \`events_blocks_ticker_items_locales\`;`)
  await db.run(sql`DROP TABLE \`events_blocks_ticker\`;`)
  await db.run(sql`DROP TABLE \`events_blocks_ticket_cards\`;`)
  await db.run(sql`DROP TABLE \`events_blocks_ticket_cards_locales\`;`)
  await db.run(sql`DROP TABLE \`events_blocks_events_rail\`;`)
  await db.run(sql`DROP TABLE \`events_blocks_events_rail_locales\`;`)
  await db.run(sql`DROP TABLE \`events_blocks_offer_grid\`;`)
  await db.run(sql`DROP TABLE \`events_blocks_offer_grid_locales\`;`)
  await db.run(sql`DROP TABLE \`events_blocks_worlds_grid\`;`)
  await db.run(sql`DROP TABLE \`events_blocks_worlds_grid_locales\`;`)
  await db.run(sql`DROP TABLE \`events_blocks_stats_items\`;`)
  await db.run(sql`DROP TABLE \`events_blocks_stats_items_locales\`;`)
  await db.run(sql`DROP TABLE \`events_blocks_stats\`;`)
  await db.run(sql`DROP TABLE \`events_blocks_stats_locales\`;`)
  await db.run(sql`DROP TABLE \`events_blocks_crew_planner\`;`)
  await db.run(sql`DROP TABLE \`events_blocks_crew_planner_locales\`;`)
  await db.run(sql`DROP TABLE \`events_blocks_moments_wall\`;`)
  await db.run(sql`DROP TABLE \`events_blocks_moments_wall_locales\`;`)
  await db.run(sql`DROP TABLE \`events_blocks_journal_teaser\`;`)
  await db.run(sql`DROP TABLE \`events_blocks_journal_teaser_locales\`;`)
  await db.run(sql`DROP TABLE \`events_blocks_today_status\`;`)
  await db.run(sql`DROP TABLE \`events_blocks_today_status_locales\`;`)
  await db.run(sql`DROP TABLE \`events_blocks_countdown\`;`)
  await db.run(sql`DROP TABLE \`events_blocks_countdown_locales\`;`)
  await db.run(sql`DROP TABLE \`events_blocks_image_text\`;`)
  await db.run(sql`DROP TABLE \`events_blocks_image_text_locales\`;`)
  await db.run(sql`DROP TABLE \`events_blocks_rich_text\`;`)
  await db.run(sql`DROP TABLE \`events_blocks_rich_text_locales\`;`)
  await db.run(sql`DROP TABLE \`events_blocks_gallery\`;`)
  await db.run(sql`DROP TABLE \`events_blocks_gallery_locales\`;`)
  await db.run(sql`DROP TABLE \`events_blocks_faq\`;`)
  await db.run(sql`DROP TABLE \`events_blocks_faq_locales\`;`)
  await db.run(sql`DROP TABLE \`events_blocks_lead_form\`;`)
  await db.run(sql`DROP TABLE \`events_blocks_lead_form_locales\`;`)
  await db.run(sql`DROP TABLE \`events_blocks_cta_band\`;`)
  await db.run(sql`DROP TABLE \`events_blocks_cta_band_locales\`;`)
  await db.run(sql`DROP TABLE \`events\`;`)
  await db.run(sql`DROP TABLE \`events_locales\`;`)
  await db.run(sql`DROP TABLE \`events_rels\`;`)
  await db.run(sql`DROP TABLE \`_events_v_version_months\`;`)
  await db.run(sql`DROP TABLE \`_events_v_version_landing_variants\`;`)
  await db.run(sql`DROP TABLE \`_events_v_version_landing_variants_locales\`;`)
  await db.run(sql`DROP TABLE \`_events_v_blocks_hero_slides\`;`)
  await db.run(sql`DROP TABLE \`_events_v_blocks_hero_slides_locales\`;`)
  await db.run(sql`DROP TABLE \`_events_v_blocks_hero\`;`)
  await db.run(sql`DROP TABLE \`_events_v_blocks_ticker_items\`;`)
  await db.run(sql`DROP TABLE \`_events_v_blocks_ticker_items_locales\`;`)
  await db.run(sql`DROP TABLE \`_events_v_blocks_ticker\`;`)
  await db.run(sql`DROP TABLE \`_events_v_blocks_ticket_cards\`;`)
  await db.run(sql`DROP TABLE \`_events_v_blocks_ticket_cards_locales\`;`)
  await db.run(sql`DROP TABLE \`_events_v_blocks_events_rail\`;`)
  await db.run(sql`DROP TABLE \`_events_v_blocks_events_rail_locales\`;`)
  await db.run(sql`DROP TABLE \`_events_v_blocks_offer_grid\`;`)
  await db.run(sql`DROP TABLE \`_events_v_blocks_offer_grid_locales\`;`)
  await db.run(sql`DROP TABLE \`_events_v_blocks_worlds_grid\`;`)
  await db.run(sql`DROP TABLE \`_events_v_blocks_worlds_grid_locales\`;`)
  await db.run(sql`DROP TABLE \`_events_v_blocks_stats_items\`;`)
  await db.run(sql`DROP TABLE \`_events_v_blocks_stats_items_locales\`;`)
  await db.run(sql`DROP TABLE \`_events_v_blocks_stats\`;`)
  await db.run(sql`DROP TABLE \`_events_v_blocks_stats_locales\`;`)
  await db.run(sql`DROP TABLE \`_events_v_blocks_crew_planner\`;`)
  await db.run(sql`DROP TABLE \`_events_v_blocks_crew_planner_locales\`;`)
  await db.run(sql`DROP TABLE \`_events_v_blocks_moments_wall\`;`)
  await db.run(sql`DROP TABLE \`_events_v_blocks_moments_wall_locales\`;`)
  await db.run(sql`DROP TABLE \`_events_v_blocks_journal_teaser\`;`)
  await db.run(sql`DROP TABLE \`_events_v_blocks_journal_teaser_locales\`;`)
  await db.run(sql`DROP TABLE \`_events_v_blocks_today_status\`;`)
  await db.run(sql`DROP TABLE \`_events_v_blocks_today_status_locales\`;`)
  await db.run(sql`DROP TABLE \`_events_v_blocks_countdown\`;`)
  await db.run(sql`DROP TABLE \`_events_v_blocks_countdown_locales\`;`)
  await db.run(sql`DROP TABLE \`_events_v_blocks_image_text\`;`)
  await db.run(sql`DROP TABLE \`_events_v_blocks_image_text_locales\`;`)
  await db.run(sql`DROP TABLE \`_events_v_blocks_rich_text\`;`)
  await db.run(sql`DROP TABLE \`_events_v_blocks_rich_text_locales\`;`)
  await db.run(sql`DROP TABLE \`_events_v_blocks_gallery\`;`)
  await db.run(sql`DROP TABLE \`_events_v_blocks_gallery_locales\`;`)
  await db.run(sql`DROP TABLE \`_events_v_blocks_faq\`;`)
  await db.run(sql`DROP TABLE \`_events_v_blocks_faq_locales\`;`)
  await db.run(sql`DROP TABLE \`_events_v_blocks_lead_form\`;`)
  await db.run(sql`DROP TABLE \`_events_v_blocks_lead_form_locales\`;`)
  await db.run(sql`DROP TABLE \`_events_v_blocks_cta_band\`;`)
  await db.run(sql`DROP TABLE \`_events_v_blocks_cta_band_locales\`;`)
  await db.run(sql`DROP TABLE \`_events_v\`;`)
  await db.run(sql`DROP TABLE \`_events_v_locales\`;`)
  await db.run(sql`DROP TABLE \`_events_v_rels\`;`)
  await db.run(sql`DROP TABLE \`posts_blocks_p\`;`)
  await db.run(sql`DROP TABLE \`posts_blocks_p_locales\`;`)
  await db.run(sql`DROP TABLE \`posts_blocks_h2\`;`)
  await db.run(sql`DROP TABLE \`posts_blocks_h2_locales\`;`)
  await db.run(sql`DROP TABLE \`posts_blocks_list_items\`;`)
  await db.run(sql`DROP TABLE \`posts_blocks_list_items_locales\`;`)
  await db.run(sql`DROP TABLE \`posts_blocks_list\`;`)
  await db.run(sql`DROP TABLE \`posts_blocks_tip\`;`)
  await db.run(sql`DROP TABLE \`posts_blocks_tip_locales\`;`)
  await db.run(sql`DROP TABLE \`posts_blocks_cta\`;`)
  await db.run(sql`DROP TABLE \`posts_blocks_cta_locales\`;`)
  await db.run(sql`DROP TABLE \`posts_faqs\`;`)
  await db.run(sql`DROP TABLE \`posts_faqs_locales\`;`)
  await db.run(sql`DROP TABLE \`posts\`;`)
  await db.run(sql`DROP TABLE \`posts_locales\`;`)
  await db.run(sql`DROP TABLE \`posts_texts\`;`)
  await db.run(sql`DROP TABLE \`_posts_v_blocks_p\`;`)
  await db.run(sql`DROP TABLE \`_posts_v_blocks_p_locales\`;`)
  await db.run(sql`DROP TABLE \`_posts_v_blocks_h2\`;`)
  await db.run(sql`DROP TABLE \`_posts_v_blocks_h2_locales\`;`)
  await db.run(sql`DROP TABLE \`_posts_v_blocks_list_items\`;`)
  await db.run(sql`DROP TABLE \`_posts_v_blocks_list_items_locales\`;`)
  await db.run(sql`DROP TABLE \`_posts_v_blocks_list\`;`)
  await db.run(sql`DROP TABLE \`_posts_v_blocks_tip\`;`)
  await db.run(sql`DROP TABLE \`_posts_v_blocks_tip_locales\`;`)
  await db.run(sql`DROP TABLE \`_posts_v_blocks_cta\`;`)
  await db.run(sql`DROP TABLE \`_posts_v_blocks_cta_locales\`;`)
  await db.run(sql`DROP TABLE \`_posts_v_version_faqs\`;`)
  await db.run(sql`DROP TABLE \`_posts_v_version_faqs_locales\`;`)
  await db.run(sql`DROP TABLE \`_posts_v\`;`)
  await db.run(sql`DROP TABLE \`_posts_v_locales\`;`)
  await db.run(sql`DROP TABLE \`_posts_v_texts\`;`)
  await db.run(sql`DROP TABLE \`tickets_includes\`;`)
  await db.run(sql`DROP TABLE \`tickets_includes_locales\`;`)
  await db.run(sql`DROP TABLE \`tickets_excludes\`;`)
  await db.run(sql`DROP TABLE \`tickets_excludes_locales\`;`)
  await db.run(sql`DROP TABLE \`tickets\`;`)
  await db.run(sql`DROP TABLE \`tickets_locales\`;`)
  await db.run(sql`DROP TABLE \`extras\`;`)
  await db.run(sql`DROP TABLE \`extras_locales\`;`)
  await db.run(sql`DROP TABLE \`worlds_facts\`;`)
  await db.run(sql`DROP TABLE \`worlds_facts_locales\`;`)
  await db.run(sql`DROP TABLE \`worlds_blocks_hero_slides\`;`)
  await db.run(sql`DROP TABLE \`worlds_blocks_hero_slides_locales\`;`)
  await db.run(sql`DROP TABLE \`worlds_blocks_hero\`;`)
  await db.run(sql`DROP TABLE \`worlds_blocks_ticker_items\`;`)
  await db.run(sql`DROP TABLE \`worlds_blocks_ticker_items_locales\`;`)
  await db.run(sql`DROP TABLE \`worlds_blocks_ticker\`;`)
  await db.run(sql`DROP TABLE \`worlds_blocks_ticket_cards\`;`)
  await db.run(sql`DROP TABLE \`worlds_blocks_ticket_cards_locales\`;`)
  await db.run(sql`DROP TABLE \`worlds_blocks_events_rail\`;`)
  await db.run(sql`DROP TABLE \`worlds_blocks_events_rail_locales\`;`)
  await db.run(sql`DROP TABLE \`worlds_blocks_offer_grid\`;`)
  await db.run(sql`DROP TABLE \`worlds_blocks_offer_grid_locales\`;`)
  await db.run(sql`DROP TABLE \`worlds_blocks_worlds_grid\`;`)
  await db.run(sql`DROP TABLE \`worlds_blocks_worlds_grid_locales\`;`)
  await db.run(sql`DROP TABLE \`worlds_blocks_stats_items\`;`)
  await db.run(sql`DROP TABLE \`worlds_blocks_stats_items_locales\`;`)
  await db.run(sql`DROP TABLE \`worlds_blocks_stats\`;`)
  await db.run(sql`DROP TABLE \`worlds_blocks_stats_locales\`;`)
  await db.run(sql`DROP TABLE \`worlds_blocks_crew_planner\`;`)
  await db.run(sql`DROP TABLE \`worlds_blocks_crew_planner_locales\`;`)
  await db.run(sql`DROP TABLE \`worlds_blocks_moments_wall\`;`)
  await db.run(sql`DROP TABLE \`worlds_blocks_moments_wall_locales\`;`)
  await db.run(sql`DROP TABLE \`worlds_blocks_journal_teaser\`;`)
  await db.run(sql`DROP TABLE \`worlds_blocks_journal_teaser_locales\`;`)
  await db.run(sql`DROP TABLE \`worlds_blocks_today_status\`;`)
  await db.run(sql`DROP TABLE \`worlds_blocks_today_status_locales\`;`)
  await db.run(sql`DROP TABLE \`worlds_blocks_countdown\`;`)
  await db.run(sql`DROP TABLE \`worlds_blocks_countdown_locales\`;`)
  await db.run(sql`DROP TABLE \`worlds_blocks_image_text\`;`)
  await db.run(sql`DROP TABLE \`worlds_blocks_image_text_locales\`;`)
  await db.run(sql`DROP TABLE \`worlds_blocks_rich_text\`;`)
  await db.run(sql`DROP TABLE \`worlds_blocks_rich_text_locales\`;`)
  await db.run(sql`DROP TABLE \`worlds_blocks_gallery\`;`)
  await db.run(sql`DROP TABLE \`worlds_blocks_gallery_locales\`;`)
  await db.run(sql`DROP TABLE \`worlds_blocks_faq\`;`)
  await db.run(sql`DROP TABLE \`worlds_blocks_faq_locales\`;`)
  await db.run(sql`DROP TABLE \`worlds_blocks_lead_form\`;`)
  await db.run(sql`DROP TABLE \`worlds_blocks_lead_form_locales\`;`)
  await db.run(sql`DROP TABLE \`worlds_blocks_cta_band\`;`)
  await db.run(sql`DROP TABLE \`worlds_blocks_cta_band_locales\`;`)
  await db.run(sql`DROP TABLE \`worlds\`;`)
  await db.run(sql`DROP TABLE \`worlds_locales\`;`)
  await db.run(sql`DROP TABLE \`worlds_rels\`;`)
  await db.run(sql`DROP TABLE \`rides\`;`)
  await db.run(sql`DROP TABLE \`rides_locales\`;`)
  await db.run(sql`DROP TABLE \`faqs\`;`)
  await db.run(sql`DROP TABLE \`faqs_locales\`;`)
  await db.run(sql`DROP TABLE \`crews_steps\`;`)
  await db.run(sql`DROP TABLE \`crews_steps_locales\`;`)
  await db.run(sql`DROP TABLE \`crews\`;`)
  await db.run(sql`DROP TABLE \`crews_locales\`;`)
  await db.run(sql`DROP TABLE \`moments\`;`)
  await db.run(sql`DROP TABLE \`moments_locales\`;`)
  await db.run(sql`DROP TABLE \`venues\`;`)
  await db.run(sql`DROP TABLE \`venues_locales\`;`)
  await db.run(sql`DROP TABLE \`occasions_points\`;`)
  await db.run(sql`DROP TABLE \`occasions_points_locales\`;`)
  await db.run(sql`DROP TABLE \`occasions\`;`)
  await db.run(sql`DROP TABLE \`occasions_locales\`;`)
  await db.run(sql`DROP TABLE \`audit_log\`;`)
  await db.run(sql`DROP TABLE \`media\`;`)
  await db.run(sql`DROP TABLE \`media_locales\`;`)
  await db.run(sql`DROP TABLE \`translations\`;`)
  await db.run(sql`DROP TABLE \`users_sessions\`;`)
  await db.run(sql`DROP TABLE \`users\`;`)
  await db.run(sql`DROP TABLE \`payload_kv\`;`)
  await db.run(sql`DROP TABLE \`payload_jobs_log\`;`)
  await db.run(sql`DROP TABLE \`payload_jobs\`;`)
  await db.run(sql`DROP TABLE \`payload_locked_documents\`;`)
  await db.run(sql`DROP TABLE \`payload_locked_documents_rels\`;`)
  await db.run(sql`DROP TABLE \`payload_preferences\`;`)
  await db.run(sql`DROP TABLE \`payload_preferences_rels\`;`)
  await db.run(sql`DROP TABLE \`payload_migrations\`;`)
  await db.run(sql`DROP TABLE \`site_settings_address\`;`)
  await db.run(sql`DROP TABLE \`site_settings_address_locales\`;`)
  await db.run(sql`DROP TABLE \`site_settings_hours\`;`)
  await db.run(sql`DROP TABLE \`site_settings_hours_locales\`;`)
  await db.run(sql`DROP TABLE \`site_settings_alerts\`;`)
  await db.run(sql`DROP TABLE \`site_settings_alerts_locales\`;`)
  await db.run(sql`DROP TABLE \`site_settings_stats\`;`)
  await db.run(sql`DROP TABLE \`site_settings_stats_locales\`;`)
  await db.run(sql`DROP TABLE \`site_settings_trust\`;`)
  await db.run(sql`DROP TABLE \`site_settings_trust_locales\`;`)
  await db.run(sql`DROP TABLE \`site_settings_socials\`;`)
  await db.run(sql`DROP TABLE \`site_settings\`;`)
  await db.run(sql`DROP TABLE \`site_settings_locales\`;`)
  await db.run(sql`DROP TABLE \`header_nav\`;`)
  await db.run(sql`DROP TABLE \`header_nav_locales\`;`)
  await db.run(sql`DROP TABLE \`header_more_sheet\`;`)
  await db.run(sql`DROP TABLE \`header_more_sheet_locales\`;`)
  await db.run(sql`DROP TABLE \`header\`;`)
  await db.run(sql`DROP TABLE \`header_locales\`;`)
  await db.run(sql`DROP TABLE \`footer_columns_links\`;`)
  await db.run(sql`DROP TABLE \`footer_columns_links_locales\`;`)
  await db.run(sql`DROP TABLE \`footer_columns\`;`)
  await db.run(sql`DROP TABLE \`footer_columns_locales\`;`)
  await db.run(sql`DROP TABLE \`footer_legal\`;`)
  await db.run(sql`DROP TABLE \`footer_legal_locales\`;`)
  await db.run(sql`DROP TABLE \`footer\`;`)
  await db.run(sql`DROP TABLE \`footer_locales\`;`)
  await db.run(sql`DROP TABLE \`visit_routes\`;`)
  await db.run(sql`DROP TABLE \`visit_routes_locales\`;`)
  await db.run(sql`DROP TABLE \`visit_food\`;`)
  await db.run(sql`DROP TABLE \`visit_food_locales\`;`)
  await db.run(sql`DROP TABLE \`visit_tips\`;`)
  await db.run(sql`DROP TABLE \`visit_tips_locales\`;`)
  await db.run(sql`DROP TABLE \`visit\`;`)
  await db.run(sql`DROP TABLE \`bowling_rates\`;`)
  await db.run(sql`DROP TABLE \`bowling_rates_locales\`;`)
  await db.run(sql`DROP TABLE \`bowling_lane_times\`;`)
  await db.run(sql`DROP TABLE \`bowling\`;`)
}
