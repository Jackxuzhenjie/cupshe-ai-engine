CREATE TABLE `case_comments` (
	`id` int AUTO_INCREMENT NOT NULL,
	`caseId` int NOT NULL,
	`userId` int NOT NULL,
	`userName` varchar(255),
	`userAvatar` text,
	`content` text NOT NULL,
	`parentId` int,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `case_comments_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `case_favorites` (
	`id` int AUTO_INCREMENT NOT NULL,
	`caseId` int NOT NULL,
	`userId` int NOT NULL,
	`userName` varchar(255),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `case_favorites_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `case_likes` (
	`id` int AUTO_INCREMENT NOT NULL,
	`caseId` int NOT NULL,
	`userId` int NOT NULL,
	`userName` varchar(255),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `case_likes_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `case_submissions` ADD `likeCount` int DEFAULT 0;--> statement-breakpoint
ALTER TABLE `case_submissions` ADD `favoriteCount` int DEFAULT 0;--> statement-breakpoint
ALTER TABLE `case_submissions` ADD `commentCount` int DEFAULT 0;--> statement-breakpoint
ALTER TABLE `case_submissions` ADD `viewCount` int DEFAULT 0;