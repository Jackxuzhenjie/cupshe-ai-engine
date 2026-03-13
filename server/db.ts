import { eq, desc, asc, and, like, sql, inArray } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, users, departments, caseSubmissions, feishuConfig } from "../drizzle/schema";
import type { InsertDepartment, InsertCaseSubmission, InsertFeishuConfig } from "../drizzle/schema";
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
