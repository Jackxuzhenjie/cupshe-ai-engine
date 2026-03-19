import { int, mysqlEnum, mysqlTable, text, timestamp, varchar, boolean, json } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extended with Feishu fields and multi-level roles.
 */
export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  /** Extended role for AI Engine: super_admin / dept_admin / employee */
  engineRole: mysqlEnum("engineRole", ["super_admin", "dept_admin", "employee"]).default("employee").notNull(),
  avatar: text("avatar"),
  feishuUserId: varchar("feishuUserId", { length: 128 }),
  feishuUnionId: varchar("feishuUnionId", { length: 128 }),
  departmentId: int("departmentId"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * Organization departments — synced from Feishu or manually managed
 */
export const departments = mysqlTable("departments", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  nameEn: varchar("nameEn", { length: 255 }),
  parentId: int("parentId"),
  feishuDeptId: varchar("feishuDeptId", { length: 128 }),
  headUserId: int("headUserId"),
  memberCount: int("memberCount").default(0),
  aiPenetration: int("aiPenetration").default(0),
  sortOrder: int("sortOrder").default(0),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Department = typeof departments.$inferSelect;
export type InsertDepartment = typeof departments.$inferInsert;

/**
 * Case submissions — the core of the AI Case Library
 */
export const caseSubmissions = mysqlTable("case_submissions", {
  id: int("id").autoincrement().primaryKey(),
  /** Standard metadata */
  title: varchar("title", { length: 500 }).notNull(),
  titleEn: varchar("titleEn", { length: 500 }),
  summary: text("summary"),
  summaryEn: text("summaryEn"),
  departmentId: int("departmentId"),
  departmentName: varchar("departmentName", { length: 255 }),
  businessFunction: varchar("businessFunction", { length: 255 }),
  businessScenario: varchar("businessScenario", { length: 255 }),
  /** AI tools used (JSON array of strings) */
  aiTools: json("aiTools").$type<string[]>(),
  /** AI value type: efficiency, productivity, cost, revenue, customer_value */
  aiValueType: varchar("aiValueType", { length: 64 }),
  /** Impact metrics */
  impactMetric: varchar("impactMetric", { length: 255 }),
  efficiencyGain: varchar("efficiencyGain", { length: 64 }),
  /** AI Maturity Level */
  maturityLevel: mysqlEnum("maturityLevel", ["L1", "L2", "L3", "L4", "L5"]).default("L1"),
  replicability: mysqlEnum("replicability", ["low", "medium", "high"]).default("medium"),
  /** Value Scorecard (JSON) */
  valueScorecard: json("valueScorecard").$type<{
    efficiency?: { before: string; after: string; multiplier: string };
    productivity?: { before: string; after: string; multiplier: string };
    cost?: { description: string; saving: string };
    revenue?: { description: string; impact: string };
    customerValue?: { description: string; impact: string };
  }>(),
  /** Scoring */
  businessValueScore: int("businessValueScore").default(0),
  replicabilityScore: int("replicabilityScore").default(0),
  innovationScore: int("innovationScore").default(0),
  viralityScore: int("viralityScore").default(0),
  totalScore: int("totalScore").default(0),
  /** Source attachments (JSON array) */
  attachments: json("attachments").$type<{
    type: "feishu_doc" | "local_file" | "web_url" | "video" | "agent" | "prompt";
    url: string;
    title: string;
    fileKey?: string;
    mimeType?: string;
  }[]>(),
  /** Linked Prompt/Agent IDs */
  linkedPromptIds: json("linkedPromptIds").$type<string[]>(),
  linkedAgentIds: json("linkedAgentIds").$type<string[]>(),
  /** Playbook steps (JSON) */
  playbookSteps: json("playbookSteps").$type<{
    step: number;
    title: string;
    description: string;
    duration?: string;
    tools?: string[];
  }[]>(),
  /** Workflow status */
  status: mysqlEnum("status", ["draft", "pending_review", "approved", "rejected", "published"]).default("draft").notNull(),
  /** Awards */
  isCaseOfWeek: boolean("isCaseOfWeek").default(false),
  isCaseOfMonth: boolean("isCaseOfMonth").default(false),
  /** Author */
  submittedBy: int("submittedBy"),
  submitterName: varchar("submitterName", { length: 255 }),
  reviewedBy: int("reviewedBy"),
  reviewNote: text("reviewNote"),
  publishedAt: timestamp("publishedAt"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type CaseSubmission = typeof caseSubmissions.$inferSelect;
export type InsertCaseSubmission = typeof caseSubmissions.$inferInsert;

/**
 * Feishu integration configuration
 */
export const feishuConfig = mysqlTable("feishu_config", {
  id: int("id").autoincrement().primaryKey(),
  appId: varchar("appId", { length: 255 }),
  appSecret: varchar("appSecret", { length: 255 }),
  webhookUrl: varchar("webhookUrl", { length: 500 }),
  /** Notification settings */
  enableWeeklyPush: boolean("enableWeeklyPush").default(false),
  enableMonthlySummary: boolean("enableMonthlySummary").default(false),
  enableCaseNotification: boolean("enableCaseNotification").default(true),
  pushGroupIds: json("pushGroupIds").$type<string[]>(),
  lastSyncAt: timestamp("lastSyncAt"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type FeishuConfig = typeof feishuConfig.$inferSelect;
export type InsertFeishuConfig = typeof feishuConfig.$inferInsert;

/**
 * Weekly Reports — PMO Claire's red/yellow/green status tracking per center
 */
export const weeklyReports = mysqlTable("weekly_reports", {
  id: int("id").autoincrement().primaryKey(),
  /** Week identifier: e.g. "2026-W12" */
  weekId: varchar("weekId", { length: 16 }).notNull(),
  /** Which center/department this report is for */
  centerId: varchar("centerId", { length: 64 }).notNull(),
  centerName: varchar("centerName", { length: 255 }).notNull(),
  centerNameEn: varchar("centerNameEn", { length: 255 }),
  /** Red / Yellow / Green status */
  status: mysqlEnum("status", ["red", "yellow", "green"]).notNull(),
  /** AI adoption progress percentage 0-100 */
  progressPercent: int("progressPercent").default(0),
  /** Current maturity level */
  maturityLevel: mysqlEnum("maturityLevel", ["L1", "L2", "L3", "L4", "L5"]).default("L1"),
  /** Key progress items this week */
  progressItems: text("progressItems"),
  /** Issues and blockers */
  issues: text("issues"),
  /** Plans for next week */
  nextWeekPlans: text("nextWeekPlans"),
  /** Highlights / wins */
  highlights: text("highlights"),
  /** Number of active AI users in this center */
  activeAiUsers: int("activeAiUsers").default(0),
  /** Number of new cases submitted */
  newCasesCount: int("newCasesCount").default(0),
  /** Number of skills unlocked */
  skillsUnlocked: int("skillsUnlocked").default(0),
  /** Is this a pilot center? */
  isPilot: boolean("isPilot").default(false),
  /** Submitted by (PMO user id) */
  submittedBy: int("submittedBy"),
  submitterName: varchar("submitterName", { length: 255 }),
  /** CEO review note */
  ceoReviewNote: text("ceoReviewNote"),
  ceoReviewed: boolean("ceoReviewed").default(false),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type WeeklyReport = typeof weeklyReports.$inferSelect;
export type InsertWeeklyReport = typeof weeklyReports.$inferInsert;
