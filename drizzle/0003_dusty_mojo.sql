CREATE TABLE `user_activities` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`userName` varchar(255),
	`type` enum('case_upload','case_like','case_favorite','case_comment','skill_complete','skill_start','prompt_use','workflow_use','challenge_join','challenge_complete','wish_submit','bounty_claim','share','login','badge_earn') NOT NULL,
	`pointsEarned` int DEFAULT 0,
	`refId` varchar(128),
	`refTitle` varchar(500),
	`metadata` json,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `user_activities_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `user_points` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`userName` varchar(255),
	`balance` int NOT NULL DEFAULT 0,
	`totalEarned` int NOT NULL DEFAULT 0,
	`level` int NOT NULL DEFAULT 1,
	`levelTitle` varchar(64) DEFAULT 'AI新手',
	`streakDays` int DEFAULT 0,
	`longestStreak` int DEFAULT 0,
	`badges` json,
	`departmentId` int,
	`departmentName` varchar(255),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `user_points_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `user_skill_progress` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`skillId` varchar(64) NOT NULL,
	`skillTitle` varchar(255),
	`status` enum('not_started','in_progress','completed') NOT NULL DEFAULT 'not_started',
	`progressPercent` int DEFAULT 0,
	`completedItems` json,
	`startedAt` timestamp,
	`completedAt` timestamp,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `user_skill_progress_id` PRIMARY KEY(`id`)
);
