CREATE TABLE `customers` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`customer_number` text NOT NULL,
	`name` text NOT NULL,
	`notes` text,
	`template` text,
	`invoices` text,
	`email` text,
	`street` text,
	`house_number` text,
	`city` text,
	`zip_code` text,
	`address` text
);
--> statement-breakpoint
CREATE UNIQUE INDEX `customers_customer_number_unique` ON `customers` (`customer_number`);--> statement-breakpoint
CREATE TABLE `products` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`quantity` text,
	`description` text,
	`price` real NOT NULL,
	`brand` text,
	`category` text NOT NULL
);
