import { eq, desc, asc, and, like, sql, inArray } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, users, departments, caseSubmissions, feishuConfig, weeklyReports, userPoints, userActivities, userSkillProgress, caseLikes, caseFavorites, caseComments } from "../drizzle/schema";
import type { InsertDepartment, InsertCaseSubmission, InsertFeishuConfig, InsertWeeklyReport, InsertUserActivity, InsertUserSkillProgress, InsertCaseComment } from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

// ========== USER QUERIES ==========

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }
  try {
    const values: InsertUser = { openId: user.openId };
    const updateSet: Record<string, unknown> = {};
    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];
    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };
    textFields.forEach(assignNullable);
    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }
    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }
    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }
    await db.insert(users).values(values).onDuplicateKeyUpdate({ set: updateSet });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function listUsers(opts?: { role?: string; departmentId?: number }) {
  const db = await getDb();
  if (!db) return [];
  const conditions = [];
  if (opts?.role) conditions.push(eq(users.engineRole, opts.role as any));
  if (opts?.departmentId) conditions.push(eq(users.departmentId, opts.departmentId));
  const query = conditions.length > 0
    ? db.select().from(users).where(and(...conditions)).orderBy(asc(users.name))
    : db.select().from(users).orderBy(asc(users.name));
  return query;
}

export async function updateUserRole(userId: number, engineRole: "super_admin" | "dept_admin" | "employee") {
  const db = await getDb();
  if (!db) return;
  await db.update(users).set({ engineRole }).where(eq(users.id, userId));
}

export async function updateUserDepartment(userId: number, departmentId: number | null) {
  const db = await getDb();
  if (!db) return;
  await db.update(users).set({ departmentId }).where(eq(users.id, userId));
}

// ========== DEPARTMENT QUERIES ==========

export async function listDepartments() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(departments).orderBy(asc(departments.sortOrder));
}

export async function getDepartment(id: number) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(departments).where(eq(departments.id, id)).limit(1);
  return result[0];
}

export async function createDepartment(dept: InsertDepartment) {
  const db = await getDb();
  if (!db) return;
  await db.insert(departments).values(dept);
}

export async function updateDepartment(id: number, data: Partial<InsertDepartment>) {
  const db = await getDb();
  if (!db) return;
  await db.update(departments).set(data).where(eq(departments.id, id));
}

export async function deleteDepartment(id: number) {
  const db = await getDb();
  if (!db) return;
  await db.delete(departments).where(eq(departments.id, id));
}

// ========== CASE SUBMISSION QUERIES ==========

export async function listCases(opts?: {
  status?: string;
  departmentId?: number;
  maturityLevel?: string;
  businessScenario?: string;
  search?: string;
  limit?: number;
  offset?: number;
}) {
  const db = await getDb();
  if (!db) return { cases: [], total: 0 };
  const conditions = [];
  if (opts?.status) conditions.push(eq(caseSubmissions.status, opts.status as any));
  if (opts?.departmentId) conditions.push(eq(caseSubmissions.departmentId, opts.departmentId));
  if (opts?.maturityLevel) conditions.push(eq(caseSubmissions.maturityLevel, opts.maturityLevel as any));
  if (opts?.businessScenario) conditions.push(eq(caseSubmissions.businessScenario, opts.businessScenario));
  if (opts?.search) conditions.push(like(caseSubmissions.title, `%${opts.search}%`));

  const where = conditions.length > 0 ? and(...conditions) : undefined;
  const limit = opts?.limit ?? 20;
  const offset = opts?.offset ?? 0;

  const [casesResult, countResult] = await Promise.all([
    where
      ? db.select().from(caseSubmissions).where(where).orderBy(desc(caseSubmissions.createdAt)).limit(limit).offset(offset)
      : db.select().from(caseSubmissions).orderBy(desc(caseSubmissions.createdAt)).limit(limit).offset(offset),
    where
      ? db.select({ count: sql<number>`count(*)` }).from(caseSubmissions).where(where)
      : db.select({ count: sql<number>`count(*)` }).from(caseSubmissions),
  ]);

  return { cases: casesResult, total: countResult[0]?.count ?? 0 };
}

export async function getCase(id: number) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(caseSubmissions).where(eq(caseSubmissions.id, id)).limit(1);
  return result[0];
}

export async function createCase(data: InsertCaseSubmission) {
  const db = await getDb();
  if (!db) return;
  // Calculate total score
  const totalScore = Math.round(
    (data.businessValueScore ?? 0) * 0.4 +
    (data.replicabilityScore ?? 0) * 0.3 +
    (data.innovationScore ?? 0) * 0.2 +
    (data.viralityScore ?? 0) * 0.1
  );
  await db.insert(caseSubmissions).values({ ...data, totalScore });
}

export async function updateCase(id: number, data: Partial<InsertCaseSubmission>) {
  const db = await getDb();
  if (!db) return;
  if (data.businessValueScore !== undefined || data.replicabilityScore !== undefined ||
      data.innovationScore !== undefined || data.viralityScore !== undefined) {
    const existing = await getCase(id);
    if (existing) {
      const bv = data.businessValueScore ?? existing.businessValueScore ?? 0;
      const rp = data.replicabilityScore ?? existing.replicabilityScore ?? 0;
      const inn = data.innovationScore ?? existing.innovationScore ?? 0;
      const vir = data.viralityScore ?? existing.viralityScore ?? 0;
      data.totalScore = Math.round(bv * 0.4 + rp * 0.3 + inn * 0.2 + vir * 0.1);
    }
  }
  await db.update(caseSubmissions).set(data).where(eq(caseSubmissions.id, id));
}

export async function deleteCase(id: number) {
  const db = await getDb();
  if (!db) return;
  await db.delete(caseSubmissions).where(eq(caseSubmissions.id, id));
}

export async function getCaseStats() {
  const db = await getDb();
  if (!db) return { total: 0, published: 0, pending: 0, weekBest: 0, monthBest: 0 };
  const [total, published, pending, weekBest, monthBest] = await Promise.all([
    db.select({ count: sql<number>`count(*)` }).from(caseSubmissions),
    db.select({ count: sql<number>`count(*)` }).from(caseSubmissions).where(eq(caseSubmissions.status, "published")),
    db.select({ count: sql<number>`count(*)` }).from(caseSubmissions).where(eq(caseSubmissions.status, "pending_review")),
    db.select({ count: sql<number>`count(*)` }).from(caseSubmissions).where(eq(caseSubmissions.isCaseOfWeek, true)),
    db.select({ count: sql<number>`count(*)` }).from(caseSubmissions).where(eq(caseSubmissions.isCaseOfMonth, true)),
  ]);
  return {
    total: total[0]?.count ?? 0,
    published: published[0]?.count ?? 0,
    pending: pending[0]?.count ?? 0,
    weekBest: weekBest[0]?.count ?? 0,
    monthBest: monthBest[0]?.count ?? 0,
  };
}

// ========== FEISHU CONFIG QUERIES ==========

export async function getFeishuConfig() {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(feishuConfig).limit(1);
  return result[0];
}

export async function upsertFeishuConfig(data: Partial<InsertFeishuConfig>) {
  const db = await getDb();
  if (!db) return;
  const existing = await getFeishuConfig();
  if (existing) {
    await db.update(feishuConfig).set(data).where(eq(feishuConfig.id, existing.id));
  } else {
    await db.insert(feishuConfig).values(data as InsertFeishuConfig);
  }
}

// ========== WEEKLY REPORT QUERIES ==========

export async function listWeeklyReports(opts?: {
  weekId?: string;
  centerId?: string;
  status?: string;
  limit?: number;
  offset?: number;
}) {
  const db = await getDb();
  if (!db) return { reports: [], total: 0 };
  const conditions = [];
  if (opts?.weekId) conditions.push(eq(weeklyReports.weekId, opts.weekId));
  if (opts?.centerId) conditions.push(eq(weeklyReports.centerId, opts.centerId));
  if (opts?.status) conditions.push(eq(weeklyReports.status, opts.status as any));

  const where = conditions.length > 0 ? and(...conditions) : undefined;
  const limit = opts?.limit ?? 50;
  const offset = opts?.offset ?? 0;

  const [reportsResult, countResult] = await Promise.all([
    where
      ? db.select().from(weeklyReports).where(where).orderBy(desc(weeklyReports.createdAt)).limit(limit).offset(offset)
      : db.select().from(weeklyReports).orderBy(desc(weeklyReports.createdAt)).limit(limit).offset(offset),
    where
      ? db.select({ count: sql<number>`count(*)` }).from(weeklyReports).where(where)
      : db.select({ count: sql<number>`count(*)` }).from(weeklyReports),
  ]);

  return { reports: reportsResult, total: countResult[0]?.count ?? 0 };
}

export async function getWeeklyReport(id: number) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(weeklyReports).where(eq(weeklyReports.id, id)).limit(1);
  return result[0];
}

export async function getWeeklyReportByWeekAndCenter(weekId: string, centerId: string) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(weeklyReports)
    .where(and(eq(weeklyReports.weekId, weekId), eq(weeklyReports.centerId, centerId)))
    .limit(1);
  return result[0];
}

export async function createWeeklyReport(data: InsertWeeklyReport) {
  const db = await getDb();
  if (!db) return;
  await db.insert(weeklyReports).values(data);
}

export async function updateWeeklyReport(id: number, data: Partial<InsertWeeklyReport>) {
  const db = await getDb();
  if (!db) return;
  await db.update(weeklyReports).set(data).where(eq(weeklyReports.id, id));
}

export async function upsertWeeklyReport(data: InsertWeeklyReport) {
  const db = await getDb();
  if (!db) return;
  const existing = await getWeeklyReportByWeekAndCenter(data.weekId, data.centerId);
  if (existing) {
    const { weekId, centerId, ...updateData } = data;
    await db.update(weeklyReports).set(updateData).where(eq(weeklyReports.id, existing.id));
  } else {
    await db.insert(weeklyReports).values(data);
  }
}

export async function deleteWeeklyReport(id: number) {
  const db = await getDb();
  if (!db) return;
  await db.delete(weeklyReports).where(eq(weeklyReports.id, id));
}

export async function getWeeklyReportSummary(weekId: string) {
  const db = await getDb();
  if (!db) return { total: 0, green: 0, yellow: 0, red: 0, avgProgress: 0 };
  const reports = await db.select().from(weeklyReports).where(eq(weeklyReports.weekId, weekId));
  const total = reports.length;
  const green = reports.filter(r => r.status === "green").length;
  const yellow = reports.filter(r => r.status === "yellow").length;
  const red = reports.filter(r => r.status === "red").length;
  const avgProgress = total > 0 ? Math.round(reports.reduce((sum, r) => sum + (r.progressPercent ?? 0), 0) / total) : 0;
  return { total, green, yellow, red, avgProgress };
}

export async function getAvailableWeeks() {
  const db = await getDb();
  if (!db) return [];
  const result = await db.selectDistinct({ weekId: weeklyReports.weekId })
    .from(weeklyReports)
    .orderBy(desc(weeklyReports.weekId));
  return result.map(r => r.weekId);
}

// ========== USER POINTS QUERIES ==========

/** Points awarded per activity type */
const POINTS_MAP: Record<string, number> = {
  case_upload: 50,
  case_like: 5,
  case_favorite: 10,
  case_comment: 15,
  skill_complete: 100,
  skill_start: 10,
  prompt_use: 8,
  workflow_use: 8,
  challenge_join: 20,
  challenge_complete: 80,
  wish_submit: 15,
  bounty_claim: 60,
  share: 10,
  login: 2,
  badge_earn: 30,
};

/** Level thresholds */
const LEVEL_THRESHOLDS = [
  { level: 1, min: 0, title: "AI新手" },
  { level: 2, min: 100, title: "AI学徒" },
  { level: 3, min: 300, title: "AI探索者" },
  { level: 4, min: 600, title: "AI实践者" },
  { level: 5, min: 1000, title: "AI能手" },
  { level: 6, min: 1800, title: "AI达人" },
  { level: 7, min: 3000, title: "AI先锋" },
  { level: 8, min: 5000, title: "AI大师" },
  { level: 9, min: 8000, title: "AI导师" },
  { level: 10, min: 12000, title: "AI先知" },
];

function getLevelInfo(totalPoints: number) {
  let result = LEVEL_THRESHOLDS[0];
  for (const t of LEVEL_THRESHOLDS) {
    if (totalPoints >= t.min) result = t;
  }
  const nextLevel = LEVEL_THRESHOLDS.find(t => t.min > totalPoints);
  return { ...result, nextLevelMin: nextLevel?.min ?? result.min, nextLevelTitle: nextLevel?.title ?? result.title };
}

export async function getUserPoints(userId: number) {
  const db = await getDb();
  if (!db) return null;
  const result = await db.select().from(userPoints).where(eq(userPoints.userId, userId)).limit(1);
  if (result.length > 0) return result[0];
  return null;
}

export async function ensureUserPoints(userId: number, userName?: string, departmentId?: number, departmentName?: string) {
  const db = await getDb();
  if (!db) return null;
  let existing = await getUserPoints(userId);
  if (!existing) {
    await db.insert(userPoints).values({
      userId,
      userName: userName ?? null,
      balance: 0,
      totalEarned: 0,
      level: 1,
      levelTitle: "AI新手",
      streakDays: 0,
      longestStreak: 0,
      badges: [],
      departmentId: departmentId ?? null,
      departmentName: departmentName ?? null,
    });
    existing = await getUserPoints(userId);
  }
  return existing;
}

export async function addPoints(userId: number, activityType: string, amount?: number) {
  const db = await getDb();
  if (!db) return;
  const pts = amount ?? POINTS_MAP[activityType] ?? 0;
  if (pts <= 0) return;
  const current = await ensureUserPoints(userId);
  if (!current) return;
  const newTotal = current.totalEarned + pts;
  const newBalance = current.balance + pts;
  const levelInfo = getLevelInfo(newTotal);
  await db.update(userPoints).set({
    balance: newBalance,
    totalEarned: newTotal,
    level: levelInfo.level,
    levelTitle: levelInfo.title,
  }).where(eq(userPoints.userId, userId));
}

// ========== USER ACTIVITIES QUERIES ==========

export async function recordActivity(data: InsertUserActivity) {
  const db = await getDb();
  if (!db) return;
  const pts = POINTS_MAP[data.type] ?? 0;
  await db.insert(userActivities).values({ ...data, pointsEarned: pts });
  // Auto-add points
  if (pts > 0) {
    await addPoints(data.userId, data.type, pts);
  }
}

export async function getUserActivities(userId: number, opts?: { limit?: number; offset?: number; type?: string }) {
  const db = await getDb();
  if (!db) return { activities: [], total: 0 };
  const conditions = [eq(userActivities.userId, userId)];
  if (opts?.type) conditions.push(eq(userActivities.type, opts.type as any));
  const where = and(...conditions);
  const limit = opts?.limit ?? 20;
  const offset = opts?.offset ?? 0;

  const [activitiesResult, countResult] = await Promise.all([
    db.select().from(userActivities).where(where).orderBy(desc(userActivities.createdAt)).limit(limit).offset(offset),
    db.select({ count: sql<number>`count(*)` }).from(userActivities).where(where),
  ]);
  return { activities: activitiesResult, total: countResult[0]?.count ?? 0 };
}

export async function getActivityStats(userId: number) {
  const db = await getDb();
  if (!db) return {};
  const activities = await db.select().from(userActivities).where(eq(userActivities.userId, userId));
  const stats: Record<string, number> = {};
  for (const a of activities) {
    stats[a.type] = (stats[a.type] ?? 0) + 1;
  }
  return stats;
}

// ========== USER SKILL PROGRESS QUERIES ==========

export async function getUserSkillProgress(userId: number) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(userSkillProgress).where(eq(userSkillProgress.userId, userId)).orderBy(desc(userSkillProgress.updatedAt));
}

export async function upsertSkillProgress(userId: number, data: { skillId: string; skillTitle?: string; status: "not_started" | "in_progress" | "completed"; progressPercent?: number; completedItems?: any }) {
  const db = await getDb();
  if (!db) return;
  const existing = await db.select().from(userSkillProgress)
    .where(and(eq(userSkillProgress.userId, userId), eq(userSkillProgress.skillId, data.skillId)))
    .limit(1);
  if (existing.length > 0) {
    const updateData: any = { status: data.status, progressPercent: data.progressPercent ?? existing[0].progressPercent };
    if (data.completedItems) updateData.completedItems = data.completedItems;
    if (data.status === "in_progress" && !existing[0].startedAt) updateData.startedAt = new Date();
    if (data.status === "completed") updateData.completedAt = new Date();
    await db.update(userSkillProgress).set(updateData).where(eq(userSkillProgress.id, existing[0].id));
  } else {
    await db.insert(userSkillProgress).values({
      userId,
      skillId: data.skillId,
      skillTitle: data.skillTitle,
      status: data.status,
      progressPercent: data.progressPercent ?? 0,
      completedItems: data.completedItems,
      startedAt: data.status !== "not_started" ? new Date() : undefined,
      completedAt: data.status === "completed" ? new Date() : undefined,
    });
  }
}

export async function getSkillProgressStats(userId: number) {
  const db = await getDb();
  if (!db) return { total: 0, completed: 0, inProgress: 0, notStarted: 0 };
  const progress = await getUserSkillProgress(userId);
  return {
    total: progress.length,
    completed: progress.filter(p => p.status === "completed").length,
    inProgress: progress.filter(p => p.status === "in_progress").length,
    notStarted: progress.filter(p => p.status === "not_started").length,
  };
}

// ========== CASE INTERACTION QUERIES ==========

/** Toggle like on a case. Returns new like state and count. */
export async function toggleCaseLike(caseId: number, userId: number, userName?: string) {
  const db = await getDb();
  if (!db) return { liked: false, likeCount: 0 };
  const existing = await db.select().from(caseLikes)
    .where(and(eq(caseLikes.caseId, caseId), eq(caseLikes.userId, userId)))
    .limit(1);
  if (existing.length > 0) {
    // Unlike
    await db.delete(caseLikes).where(eq(caseLikes.id, existing[0].id));
    await db.update(caseSubmissions).set({ likeCount: sql`GREATEST(COALESCE(likeCount, 0) - 1, 0)` }).where(eq(caseSubmissions.id, caseId));
    const updated = await getCase(caseId);
    return { liked: false, likeCount: updated?.likeCount ?? 0 };
  } else {
    // Like
    await db.insert(caseLikes).values({ caseId, userId, userName: userName ?? null });
    await db.update(caseSubmissions).set({ likeCount: sql`COALESCE(likeCount, 0) + 1` }).where(eq(caseSubmissions.id, caseId));
    const updated = await getCase(caseId);
    return { liked: true, likeCount: updated?.likeCount ?? 0 };
  }
}

/** Toggle favorite on a case. Returns new favorite state and count. */
export async function toggleCaseFavorite(caseId: number, userId: number, userName?: string) {
  const db = await getDb();
  if (!db) return { favorited: false, favoriteCount: 0 };
  const existing = await db.select().from(caseFavorites)
    .where(and(eq(caseFavorites.caseId, caseId), eq(caseFavorites.userId, userId)))
    .limit(1);
  if (existing.length > 0) {
    await db.delete(caseFavorites).where(eq(caseFavorites.id, existing[0].id));
    await db.update(caseSubmissions).set({ favoriteCount: sql`GREATEST(COALESCE(favoriteCount, 0) - 1, 0)` }).where(eq(caseSubmissions.id, caseId));
    const updated = await getCase(caseId);
    return { favorited: false, favoriteCount: updated?.favoriteCount ?? 0 };
  } else {
    await db.insert(caseFavorites).values({ caseId, userId, userName: userName ?? null });
    await db.update(caseSubmissions).set({ favoriteCount: sql`COALESCE(favoriteCount, 0) + 1` }).where(eq(caseSubmissions.id, caseId));
    const updated = await getCase(caseId);
    return { favorited: true, favoriteCount: updated?.favoriteCount ?? 0 };
  }
}

/** Add a comment to a case */
export async function addCaseComment(data: InsertCaseComment) {
  const db = await getDb();
  if (!db) return;
  await db.insert(caseComments).values(data);
  await db.update(caseSubmissions).set({ commentCount: sql`COALESCE(commentCount, 0) + 1` }).where(eq(caseSubmissions.id, data.caseId));
}

/** List comments for a case */
export async function listCaseComments(caseId: number, opts?: { limit?: number; offset?: number }) {
  const db = await getDb();
  if (!db) return { comments: [], total: 0 };
  const limit = opts?.limit ?? 50;
  const offset = opts?.offset ?? 0;
  const [commentsResult, countResult] = await Promise.all([
    db.select().from(caseComments).where(eq(caseComments.caseId, caseId)).orderBy(desc(caseComments.createdAt)).limit(limit).offset(offset),
    db.select({ count: sql<number>`count(*)` }).from(caseComments).where(eq(caseComments.caseId, caseId)),
  ]);
  return { comments: commentsResult, total: countResult[0]?.count ?? 0 };
}

/** Delete a comment */
export async function deleteCaseComment(commentId: number, caseId: number) {
  const db = await getDb();
  if (!db) return;
  await db.delete(caseComments).where(eq(caseComments.id, commentId));
  await db.update(caseSubmissions).set({ commentCount: sql`GREATEST(COALESCE(commentCount, 0) - 1, 0)` }).where(eq(caseSubmissions.id, caseId));
}

/** Check if user has liked/favorited a case */
export async function getUserCaseInteractions(caseId: number, userId: number) {
  const db = await getDb();
  if (!db) return { liked: false, favorited: false };
  const [likeResult, favResult] = await Promise.all([
    db.select().from(caseLikes).where(and(eq(caseLikes.caseId, caseId), eq(caseLikes.userId, userId))).limit(1),
    db.select().from(caseFavorites).where(and(eq(caseFavorites.caseId, caseId), eq(caseFavorites.userId, userId))).limit(1),
  ]);
  return { liked: likeResult.length > 0, favorited: favResult.length > 0 };
}

/** Batch check interactions for multiple cases */
export async function getUserCaseInteractionsBatch(caseIds: number[], userId: number) {
  const db = await getDb();
  if (!db || caseIds.length === 0) return {};
  const [likes, favs] = await Promise.all([
    db.select().from(caseLikes).where(and(inArray(caseLikes.caseId, caseIds), eq(caseLikes.userId, userId))),
    db.select().from(caseFavorites).where(and(inArray(caseFavorites.caseId, caseIds), eq(caseFavorites.userId, userId))),
  ]);
  const result: Record<number, { liked: boolean; favorited: boolean }> = {};
  for (const id of caseIds) {
    result[id] = { liked: likes.some(l => l.caseId === id), favorited: favs.some(f => f.caseId === id) };
  }
  return result;
}

/** Increment view count */
export async function incrementCaseViewCount(caseId: number) {
  const db = await getDb();
  if (!db) return;
  await db.update(caseSubmissions).set({ viewCount: sql`COALESCE(viewCount, 0) + 1` }).where(eq(caseSubmissions.id, caseId));
}

/** Get leaderboard: top cases by likes */
export async function getTopCasesByLikes(limit = 10) {
  const db = await getDb();
  if (!db) return [];
  return db.select({
    id: caseSubmissions.id,
    title: caseSubmissions.title,
    departmentName: caseSubmissions.departmentName,
    submitterName: caseSubmissions.submitterName,
    likeCount: caseSubmissions.likeCount,
    favoriteCount: caseSubmissions.favoriteCount,
    commentCount: caseSubmissions.commentCount,
    viewCount: caseSubmissions.viewCount,
    totalScore: caseSubmissions.totalScore,
    maturityLevel: caseSubmissions.maturityLevel,
    createdAt: caseSubmissions.createdAt,
  }).from(caseSubmissions)
    .where(eq(caseSubmissions.status, "published"))
    .orderBy(desc(caseSubmissions.likeCount))
    .limit(limit);
}

/** Get leaderboard: top contributors by total points */
export async function getTopContributors(limit = 10) {
  const db = await getDb();
  if (!db) return [];
  return db.select({
    userId: userPoints.userId,
    userName: userPoints.userName,
    totalEarned: userPoints.totalEarned,
    level: userPoints.level,
    levelTitle: userPoints.levelTitle,
    departmentName: userPoints.departmentName,
  }).from(userPoints)
    .orderBy(desc(userPoints.totalEarned))
    .limit(limit);
}

/** Get user's favorited case IDs */
export async function getUserFavoritedCaseIds(userId: number) {
  const db = await getDb();
  if (!db) return [];
  const result = await db.select({ caseId: caseFavorites.caseId }).from(caseFavorites).where(eq(caseFavorites.userId, userId));
  return result.map(r => r.caseId);
}

export { POINTS_MAP, LEVEL_THRESHOLDS, getLevelInfo };
