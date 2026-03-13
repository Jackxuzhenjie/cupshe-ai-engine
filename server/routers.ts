import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, adminProcedure, router } from "./_core/trpc";
import { z } from "zod";
import * as db from "./db";
import { storagePut } from "./storage";
import { nanoid } from "nanoid";

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return { success: true } as const;
    }),
  }),

  // ========== USER MANAGEMENT ==========
  users: router({
    list: protectedProcedure
      .input(z.object({
        role: z.string().optional(),
        departmentId: z.number().optional(),
      }).optional())
      .query(async ({ input }) => {
        return db.listUsers(input ?? undefined);
      }),

    updateRole: adminProcedure
      .input(z.object({
        userId: z.number(),
        engineRole: z.enum(["super_admin", "dept_admin", "employee"]),
      }))
      .mutation(async ({ input }) => {
        await db.updateUserRole(input.userId, input.engineRole);
        return { success: true };
      }),

    updateDepartment: adminProcedure
      .input(z.object({
        userId: z.number(),
        departmentId: z.number().nullable(),
      }))
      .mutation(async ({ input }) => {
        await db.updateUserDepartment(input.userId, input.departmentId);
        return { success: true };
      }),
  }),

  // ========== DEPARTMENTS ==========
  departments: router({
    list: publicProcedure.query(async () => {
      return db.listDepartments();
    }),

    get: publicProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ input }) => {
        return db.getDepartment(input.id);
      }),

    create: adminProcedure
      .input(z.object({
        name: z.string(),
        nameEn: z.string().optional(),
        parentId: z.number().optional(),
        feishuDeptId: z.string().optional(),
        sortOrder: z.number().optional(),
      }))
      .mutation(async ({ input }) => {
        await db.createDepartment(input);
        return { success: true };
      }),

    update: adminProcedure
      .input(z.object({
        id: z.number(),
        name: z.string().optional(),
        nameEn: z.string().optional(),
        parentId: z.number().optional(),
        headUserId: z.number().optional(),
        memberCount: z.number().optional(),
        aiPenetration: z.number().optional(),
        sortOrder: z.number().optional(),
      }))
      .mutation(async ({ input }) => {
        const { id, ...data } = input;
        await db.updateDepartment(id, data);
        return { success: true };
      }),

    delete: adminProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        await db.deleteDepartment(input.id);
        return { success: true };
      }),
  }),

  // ========== CASE SUBMISSIONS ==========
  cases: router({
    list: publicProcedure
      .input(z.object({
        status: z.string().optional(),
        departmentId: z.number().optional(),
        maturityLevel: z.string().optional(),
        businessScenario: z.string().optional(),
        search: z.string().optional(),
        limit: z.number().optional(),
        offset: z.number().optional(),
      }).optional())
      .query(async ({ input }) => {
        return db.listCases(input ?? undefined);
      }),

    get: publicProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ input }) => {
        return db.getCase(input.id);
      }),

    stats: publicProcedure.query(async () => {
      return db.getCaseStats();
    }),

    create: protectedProcedure
      .input(z.object({
        title: z.string(),
        titleEn: z.string().optional(),
        summary: z.string().optional(),
        summaryEn: z.string().optional(),
        departmentId: z.number().optional(),
        departmentName: z.string().optional(),
        businessFunction: z.string().optional(),
        businessScenario: z.string().optional(),
        aiTools: z.array(z.string()).optional(),
        aiValueType: z.string().optional(),
        impactMetric: z.string().optional(),
        efficiencyGain: z.string().optional(),
        maturityLevel: z.enum(["L1", "L2", "L3", "L4", "L5"]).optional(),
        replicability: z.enum(["low", "medium", "high"]).optional(),
        valueScorecard: z.any().optional(),
        businessValueScore: z.number().optional(),
        replicabilityScore: z.number().optional(),
        innovationScore: z.number().optional(),
        viralityScore: z.number().optional(),
        attachments: z.any().optional(),
        linkedPromptIds: z.array(z.string()).optional(),
        linkedAgentIds: z.array(z.string()).optional(),
        playbookSteps: z.any().optional(),
        status: z.enum(["draft", "pending_review"]).optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        await db.createCase({
          ...input,
          submittedBy: ctx.user.id,
          submitterName: ctx.user.name ?? "Unknown",
          status: input.status ?? "draft",
        });
        return { success: true };
      }),

    update: protectedProcedure
      .input(z.object({
        id: z.number(),
        title: z.string().optional(),
        titleEn: z.string().optional(),
        summary: z.string().optional(),
        summaryEn: z.string().optional(),
        departmentId: z.number().optional(),
        departmentName: z.string().optional(),
        businessFunction: z.string().optional(),
        businessScenario: z.string().optional(),
        aiTools: z.array(z.string()).optional(),
        aiValueType: z.string().optional(),
        impactMetric: z.string().optional(),
        efficiencyGain: z.string().optional(),
        maturityLevel: z.enum(["L1", "L2", "L3", "L4", "L5"]).optional(),
        replicability: z.enum(["low", "medium", "high"]).optional(),
        valueScorecard: z.any().optional(),
        businessValueScore: z.number().optional(),
        replicabilityScore: z.number().optional(),
        innovationScore: z.number().optional(),
        viralityScore: z.number().optional(),
        attachments: z.any().optional(),
        linkedPromptIds: z.array(z.string()).optional(),
        linkedAgentIds: z.array(z.string()).optional(),
        playbookSteps: z.any().optional(),
        status: z.enum(["draft", "pending_review", "approved", "rejected", "published"]).optional(),
        isCaseOfWeek: z.boolean().optional(),
        isCaseOfMonth: z.boolean().optional(),
        reviewNote: z.string().optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        const { id, ...data } = input;
        // If approving/publishing, record reviewer
        if (data.status === "approved" || data.status === "published") {
          (data as any).reviewedBy = ctx.user.id;
          if (data.status === "published") {
            (data as any).publishedAt = new Date();
          }
        }
        await db.updateCase(id, data);
        return { success: true };
      }),

    delete: adminProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        await db.deleteCase(input.id);
        return { success: true };
      }),

    // File upload endpoint
    uploadFile: protectedProcedure
      .input(z.object({
        fileName: z.string(),
        fileData: z.string(), // base64 encoded
        mimeType: z.string(),
      }))
      .mutation(async ({ ctx, input }) => {
        const buffer = Buffer.from(input.fileData, "base64");
        const fileKey = `cases/${ctx.user.id}/${nanoid()}-${input.fileName}`;
        const { url } = await storagePut(fileKey, buffer, input.mimeType);
        return { url, fileKey };
      }),
  }),

  // ========== FEISHU CONFIG ==========
  feishu: router({
    getConfig: adminProcedure.query(async () => {
      return db.getFeishuConfig();
    }),

    updateConfig: adminProcedure
      .input(z.object({
        appId: z.string().optional(),
        appSecret: z.string().optional(),
        webhookUrl: z.string().optional(),
        enableWeeklyPush: z.boolean().optional(),
        enableMonthlySummary: z.boolean().optional(),
        enableCaseNotification: z.boolean().optional(),
        pushGroupIds: z.array(z.string()).optional(),
      }))
      .mutation(async ({ input }) => {
        await db.upsertFeishuConfig(input);
        return { success: true };
      }),

    // Simulate Feishu org sync
    syncOrg: adminProcedure.mutation(async () => {
      // In production, this would call Feishu API to sync org structure
      // For now, return a simulated success
      return {
        success: true,
        message: "Organization sync completed (simulated)",
        syncedDepartments: 8,
        syncedUsers: 156,
      };
    }),

    // Send test notification
    testWebhook: adminProcedure
      .input(z.object({ webhookUrl: z.string() }))
      .mutation(async ({ input }) => {
        try {
          const response = await fetch(input.webhookUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              msg_type: "interactive",
              card: {
                header: {
                  title: { content: "🤖 CUPSHE AI Engine - 测试通知", tag: "plain_text" },
                  template: "blue",
                },
                elements: [
                  {
                    tag: "div",
                    text: { content: "这是一条来自 CUPSHE AI 转型引擎的测试通知。如果您收到此消息，说明 Webhook 配置正确！", tag: "plain_text" },
                  },
                ],
              },
            }),
          });
          return { success: response.ok, statusCode: response.status };
        } catch (error) {
          return { success: false, error: String(error) };
        }
      }),
  }),
});

export type AppRouter = typeof appRouter;
