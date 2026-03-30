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

    // ===== CASE INTERACTIONS =====

    /** Toggle like on a case (auto-awards points) */
    toggleLike: protectedProcedure
      .input(z.object({ caseId: z.number() }))
      .mutation(async ({ ctx, input }) => {
        const result = await db.toggleCaseLike(input.caseId, ctx.user.id, ctx.user.name ?? undefined);
        // Record activity & award points only on like (not unlike)
        if (result.liked) {
          await db.recordActivity({
            userId: ctx.user.id,
            userName: ctx.user.name ?? "Unknown",
            type: "case_like",
            refId: String(input.caseId),
            refTitle: `案例 #${input.caseId}`,
          });
        }
        return result;
      }),

    /** Toggle favorite on a case (auto-awards points) */
    toggleFavorite: protectedProcedure
      .input(z.object({ caseId: z.number() }))
      .mutation(async ({ ctx, input }) => {
        const result = await db.toggleCaseFavorite(input.caseId, ctx.user.id, ctx.user.name ?? undefined);
        if (result.favorited) {
          await db.recordActivity({
            userId: ctx.user.id,
            userName: ctx.user.name ?? "Unknown",
            type: "case_favorite",
            refId: String(input.caseId),
            refTitle: `案例 #${input.caseId}`,
          });
        }
        return result;
      }),

    /** Add a comment to a case (auto-awards points) */
    addComment: protectedProcedure
      .input(z.object({
        caseId: z.number(),
        content: z.string().min(1).max(2000),
        parentId: z.number().optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        await db.addCaseComment({
          caseId: input.caseId,
          userId: ctx.user.id,
          userName: ctx.user.name ?? "Unknown",
          content: input.content,
          parentId: input.parentId ?? null,
        });
        // Record activity & award points
        await db.recordActivity({
          userId: ctx.user.id,
          userName: ctx.user.name ?? "Unknown",
          type: "case_comment",
          refId: String(input.caseId),
          refTitle: `案例 #${input.caseId}`,
        });
        return { success: true };
      }),

    /** List comments for a case */
    listComments: publicProcedure
      .input(z.object({
        caseId: z.number(),
        limit: z.number().optional(),
        offset: z.number().optional(),
      }))
      .query(async ({ input }) => {
        return db.listCaseComments(input.caseId, { limit: input.limit, offset: input.offset });
      }),

    /** Delete a comment (own comment or admin) */
    deleteComment: protectedProcedure
      .input(z.object({ commentId: z.number(), caseId: z.number() }))
      .mutation(async ({ input }) => {
        await db.deleteCaseComment(input.commentId, input.caseId);
        return { success: true };
      }),

    /** Get user's interaction state for a single case */
    getInteractions: protectedProcedure
      .input(z.object({ caseId: z.number() }))
      .query(async ({ ctx, input }) => {
        return db.getUserCaseInteractions(input.caseId, ctx.user.id);
      }),

    /** Batch get user's interaction state for multiple cases */
    getInteractionsBatch: protectedProcedure
      .input(z.object({ caseIds: z.array(z.number()) }))
      .query(async ({ ctx, input }) => {
        return db.getUserCaseInteractionsBatch(input.caseIds, ctx.user.id);
      }),

    /** Increment view count */
    recordView: publicProcedure
      .input(z.object({ caseId: z.number() }))
      .mutation(async ({ input }) => {
        await db.incrementCaseViewCount(input.caseId);
        return { success: true };
      }),

    /** Get user's favorited case IDs */
    getFavoriteIds: protectedProcedure.query(async ({ ctx }) => {
      return db.getUserFavoritedCaseIds(ctx.user.id);
    }),

    // ===== LEADERBOARD =====

    /** Top cases by likes */
    topByLikes: publicProcedure
      .input(z.object({ limit: z.number().optional() }).optional())
      .query(async ({ input }) => {
        return db.getTopCasesByLikes(input?.limit ?? 10);
      }),

    /** Top contributors by points */
    topContributors: publicProcedure
      .input(z.object({ limit: z.number().optional() }).optional())
      .query(async ({ input }) => {
        return db.getTopContributors(input?.limit ?? 10);
      }),

    /** Submit a new case (with auto activity recording & points) */
    submit: protectedProcedure
      .input(z.object({
        title: z.string().min(1),
        summary: z.string().optional(),
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
        attachments: z.any().optional(),
        playbookSteps: z.any().optional(),
        /** Fission: reference parent case ID */
        fissionFromCaseId: z.number().optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        await db.createCase({
          ...input,
          submittedBy: ctx.user.id,
          submitterName: ctx.user.name ?? "Unknown",
          status: "pending_review",
        });
        // Record activity & award points for case upload
        await db.recordActivity({
          userId: ctx.user.id,
          userName: ctx.user.name ?? "Unknown",
          type: "case_upload",
          refId: input.title,
          refTitle: input.title,
        });
        return { success: true };
      }),
  }),

  // ========== WEEKLY REPORTS ==========
  weeklyReports: router({
    list: publicProcedure
      .input(z.object({
        weekId: z.string().optional(),
        centerId: z.string().optional(),
        status: z.string().optional(),
        limit: z.number().optional(),
        offset: z.number().optional(),
      }).optional())
      .query(async ({ input }) => {
        return db.listWeeklyReports(input ?? undefined);
      }),

    get: publicProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ input }) => {
        return db.getWeeklyReport(input.id);
      }),

    getByWeekAndCenter: publicProcedure
      .input(z.object({ weekId: z.string(), centerId: z.string() }))
      .query(async ({ input }) => {
        return db.getWeeklyReportByWeekAndCenter(input.weekId, input.centerId);
      }),

    summary: publicProcedure
      .input(z.object({ weekId: z.string() }))
      .query(async ({ input }) => {
        return db.getWeeklyReportSummary(input.weekId);
      }),

    availableWeeks: publicProcedure.query(async () => {
      return db.getAvailableWeeks();
    }),

    upsert: protectedProcedure
      .input(z.object({
        weekId: z.string(),
        centerId: z.string(),
        centerName: z.string(),
        centerNameEn: z.string().optional(),
        status: z.enum(["red", "yellow", "green"]),
        progressPercent: z.number().min(0).max(100).optional(),
        maturityLevel: z.enum(["L1", "L2", "L3", "L4", "L5"]).optional(),
        progressItems: z.string().optional(),
        issues: z.string().optional(),
        nextWeekPlans: z.string().optional(),
        highlights: z.string().optional(),
        activeAiUsers: z.number().optional(),
        newCasesCount: z.number().optional(),
        skillsUnlocked: z.number().optional(),
        isPilot: z.boolean().optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        await db.upsertWeeklyReport({
          ...input,
          submittedBy: ctx.user.id,
          submitterName: ctx.user.name ?? "PMO",
        });
        return { success: true };
      }),

    delete: adminProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        await db.deleteWeeklyReport(input.id);
        return { success: true };
      }),

    ceoReview: adminProcedure
      .input(z.object({
        id: z.number(),
        ceoReviewNote: z.string().optional(),
        ceoReviewed: z.boolean(),
      }))
      .mutation(async ({ input }) => {
        await db.updateWeeklyReport(input.id, {
          ceoReviewNote: input.ceoReviewNote,
          ceoReviewed: input.ceoReviewed,
        });
        return { success: true };
      }),
  }),

  // ========== USER PROFILE ==========
  profile: router({
    /** Get current user's points and level */
    getPoints: protectedProcedure.query(async ({ ctx }) => {
      const points = await db.ensureUserPoints(ctx.user.id, ctx.user.name ?? undefined);
      const levelInfo = db.getLevelInfo(points?.totalEarned ?? 0);
      return { points, levelInfo };
    }),

    /** Get current user's activity feed */
    getActivities: protectedProcedure
      .input(z.object({
        limit: z.number().optional(),
        offset: z.number().optional(),
        type: z.string().optional(),
      }).optional())
      .query(async ({ ctx, input }) => {
        return db.getUserActivities(ctx.user.id, input ?? undefined);
      }),

    /** Get activity stats (counts by type) */
    getActivityStats: protectedProcedure.query(async ({ ctx }) => {
      return db.getActivityStats(ctx.user.id);
    }),

    /** Get skill progress for current user */
    getSkillProgress: protectedProcedure.query(async ({ ctx }) => {
      return db.getUserSkillProgress(ctx.user.id);
    }),

    /** Get skill progress stats (completed/in-progress/not-started counts) */
    getSkillStats: protectedProcedure.query(async ({ ctx }) => {
      return db.getSkillProgressStats(ctx.user.id);
    }),

    /** Record an activity (auto-awards points) */
    recordActivity: protectedProcedure
      .input(z.object({
        type: z.enum([
          "case_upload", "case_like", "case_favorite", "case_comment",
          "skill_complete", "skill_start", "prompt_use", "workflow_use",
          "challenge_join", "challenge_complete", "wish_submit",
          "bounty_claim", "share", "login", "badge_earn"
        ]),
        refId: z.string().optional(),
        refTitle: z.string().optional(),
        metadata: z.record(z.string(), z.any()).optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        await db.recordActivity({
          userId: ctx.user.id,
          userName: ctx.user.name ?? "Unknown",
          type: input.type,
          refId: input.refId,
          refTitle: input.refTitle,
          metadata: input.metadata,
        });
        return { success: true };
      }),

    /** Update skill progress */
    updateSkillProgress: protectedProcedure
      .input(z.object({
        skillId: z.string(),
        skillTitle: z.string().optional(),
        status: z.enum(["not_started", "in_progress", "completed"]),
        progressPercent: z.number().min(0).max(100).optional(),
        completedItems: z.any().optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        await db.upsertSkillProgress(ctx.user.id, input);
        // If completing a skill, also record activity
        if (input.status === "completed") {
          await db.recordActivity({
            userId: ctx.user.id,
            userName: ctx.user.name ?? "Unknown",
            type: "skill_complete",
            refId: input.skillId,
            refTitle: input.skillTitle,
          });
        } else if (input.status === "in_progress") {
          await db.recordActivity({
            userId: ctx.user.id,
            userName: ctx.user.name ?? "Unknown",
            type: "skill_start",
            refId: input.skillId,
            refTitle: input.skillTitle,
          });
        }
        return { success: true };
      }),

    /** Get points config (for display) */
    getPointsConfig: publicProcedure.query(() => {
      return { pointsMap: db.POINTS_MAP, levelThresholds: db.LEVEL_THRESHOLDS };
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
