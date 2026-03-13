CREATE TABLE `case_submissions` (
	`id` int AUTO_INCREMENT NOT NULL,
	`title` varchar(500) NOT NULL,
	`titleEn` varchar(500),
	`summary` text,
	`summaryEn` text,
	`departmentId` int,
	`departmentName` varchar(255),
	`businessFunction` varchar(255),
	`businessScenario` varchar(255),
	`aiTools` json,
	`aiValueType` varchar(64),
	`impactMetric` varchar(255),
	`efficiencyGain` varchar(64),
	`maturityLevel` enum('L1','L2','L3','L4','L5') DEFAULT 'L1',
	`replicability` enum('low','medium','high') DEFAULT 'medium',
	`valueScorecard` json,
	`businessValueScore` int DEFAULT 0,
	`replicabilityScore` int DEFAULT 0,
	`innovationScore` int DEFAULT 0,
	`viralityScore` int DEFAULT 0,
	`totalScore` int DEFAULT 0,
	`attachments` json,
	`linkedPromptIds` json,
	`linkedAgentIds` json,
	`playbookSteps` json,
	`status` enum('draft','pending_review','approved','rejected','published') NOT NULL DEFAULT 'draft',
	`isCaseOfWeek` boolean DEFAULT false,
	`isCaseOfMonth` boolean DEFAULT false,
	`submittedBy` int,
	`submitterName` varchar(255),
	`reviewedBy` int,
	`reviewNote` text,
	`publishedAt` timestamp,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `case_submissions_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `departments` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`nameEn` varchar(255),
	`parentId` int,
	`feishuDeptId` varchar(128),
	`headUserId` int,
	`memberCount` int DEFAULT 0,
	`aiPenetration` int DEFAULT 0,
	`sortOrder` int DEFAULT 0,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `departments_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `feishu_config` (
	`id` int AUTO_INCREMENT NOT NULL,
	`appId` varchar(255),
	`appSecret` varchar(255),
	`webhookUrl` varchar(500),
	`enableWeeklyPush` boolean DEFAULT false,
	`enableMonthlySummary` boolean DEFAULT false,
	`enableCaseNotification` boolean DEFAULT true,
	`pushGroupIds` json,
	`lastSyncAt` timestamp,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `feishu_config_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `users` ADD `engineRole` enum('super_admin','dept_admin','employee') DEFAULT 'employee' NOT NULL;--> statement-breakpoint
ALTER TABLE `users` ADD `avatar` text;--> statement-breakpoint
ALTER TABLE `users` ADD `feishuUserId` varchar(128);--> statement-breakpoint
ALTER TABLE `users` ADD `feishuUnionId` varchar(128);--> statement-breakpoint
ALTER TABLE `users` ADD `departmentId` int;