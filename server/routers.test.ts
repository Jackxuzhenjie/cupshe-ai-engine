import { describe, expect, it } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

type AuthenticatedUser = NonNullable<TrpcContext["user"]>;

function createUserContext(role: "user" | "admin" = "user"): TrpcContext {
  const user: AuthenticatedUser = {
    id: 1,
    openId: "test-user-001",
    email: "test@cupshe.com",
    name: "Test User",
    loginMethod: "manus",
    role,
    createdAt: new Date(),
    updatedAt: new Date(),
    lastSignedIn: new Date(),
  };

  return {
    user,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {
      clearCookie: () => {},
    } as TrpcContext["res"],
  };
}

function createAnonContext(): TrpcContext {
  return {
    user: null,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {
      clearCookie: () => {},
    } as TrpcContext["res"],
  };
}

describe("auth.me", () => {
  it("returns null for unauthenticated users", async () => {
    const ctx = createAnonContext();
    const caller = appRouter.createCaller(ctx);
    const result = await caller.auth.me();
    expect(result).toBeNull();
  });

  it("returns user data for authenticated users", async () => {
    const ctx = createUserContext();
    const caller = appRouter.createCaller(ctx);
    const result = await caller.auth.me();
    expect(result).toBeDefined();
    expect(result?.openId).toBe("test-user-001");
    expect(result?.email).toBe("test@cupshe.com");
    expect(result?.name).toBe("Test User");
  });
});

describe("users.list", () => {
  it("requires authentication", async () => {
    const ctx = createAnonContext();
    const caller = appRouter.createCaller(ctx);
    await expect(caller.users.list()).rejects.toThrow();
  });
});

describe("users.updateRole", () => {
  it("requires admin role", async () => {
    const ctx = createUserContext("user");
    const caller = appRouter.createCaller(ctx);
    await expect(
      caller.users.updateRole({ userId: 2, engineRole: "dept_admin" })
    ).rejects.toThrow();
  });
});

describe("departments.list", () => {
  it("is accessible as a public procedure (no auth required)", async () => {
    const ctx = createAnonContext();
    const caller = appRouter.createCaller(ctx);
    // This should not throw - it's a public procedure
    // It may return empty array or throw DB error, but not auth error
    try {
      await caller.departments.list();
    } catch (e: any) {
      // DB connection errors are expected in test env, but auth errors are not
      expect(e.code).not.toBe("UNAUTHORIZED");
      expect(e.code).not.toBe("FORBIDDEN");
    }
  });
});

describe("departments.create", () => {
  it("requires admin role", async () => {
    const ctx = createUserContext("user");
    const caller = appRouter.createCaller(ctx);
    await expect(
      caller.departments.create({ name: "Test Dept" })
    ).rejects.toThrow();
  });

  it("does not throw auth error for admin", async () => {
    const ctx = createUserContext("admin");
    const caller = appRouter.createCaller(ctx);
    try {
      await caller.departments.create({ name: "Test Dept" });
    } catch (e: any) {
      // DB errors are expected, but should not be auth errors
      expect(e.code).not.toBe("UNAUTHORIZED");
      expect(e.code).not.toBe("FORBIDDEN");
    }
  });
});

describe("departments.delete", () => {
  it("requires admin role", async () => {
    const ctx = createUserContext("user");
    const caller = appRouter.createCaller(ctx);
    await expect(
      caller.departments.delete({ id: 1 })
    ).rejects.toThrow();
  });
});

describe("cases.list", () => {
  it("is accessible as a public procedure", async () => {
    const ctx = createAnonContext();
    const caller = appRouter.createCaller(ctx);
    try {
      await caller.cases.list();
    } catch (e: any) {
      expect(e.code).not.toBe("UNAUTHORIZED");
      expect(e.code).not.toBe("FORBIDDEN");
    }
  });

  it("accepts filter parameters", async () => {
    const ctx = createAnonContext();
    const caller = appRouter.createCaller(ctx);
    try {
      await caller.cases.list({
        status: "published",
        maturityLevel: "L2",
        businessScenario: "商品运营",
        limit: 10,
        offset: 0,
      });
    } catch (e: any) {
      expect(e.code).not.toBe("UNAUTHORIZED");
      expect(e.code).not.toBe("FORBIDDEN");
    }
  });
});

describe("cases.create", () => {
  it("requires authentication", async () => {
    const ctx = createAnonContext();
    const caller = appRouter.createCaller(ctx);
    await expect(
      caller.cases.create({ title: "Test Case" })
    ).rejects.toThrow();
  });

  it("does not throw auth error for authenticated user", async () => {
    const ctx = createUserContext("user");
    const caller = appRouter.createCaller(ctx);
    try {
      await caller.cases.create({
        title: "AI商品分析效率提升18倍",
        titleEn: "AI Boosts Product Analysis 18x",
        businessScenario: "商品分析",
        aiTools: ["ChatGPT", "DeepSeek"],
        maturityLevel: "L2",
        replicability: "high",
      });
    } catch (e: any) {
      expect(e.code).not.toBe("UNAUTHORIZED");
      expect(e.code).not.toBe("FORBIDDEN");
    }
  });
});

describe("cases.update", () => {
  it("requires authentication", async () => {
    const ctx = createAnonContext();
    const caller = appRouter.createCaller(ctx);
    await expect(
      caller.cases.update({ id: 1, title: "Updated" })
    ).rejects.toThrow();
  });
});

describe("cases.delete", () => {
  it("requires admin role", async () => {
    const ctx = createUserContext("user");
    const caller = appRouter.createCaller(ctx);
    await expect(
      caller.cases.delete({ id: 1 })
    ).rejects.toThrow();
  });
});

describe("cases.stats", () => {
  it("is accessible as a public procedure", async () => {
    const ctx = createAnonContext();
    const caller = appRouter.createCaller(ctx);
    try {
      await caller.cases.stats();
    } catch (e: any) {
      expect(e.code).not.toBe("UNAUTHORIZED");
      expect(e.code).not.toBe("FORBIDDEN");
    }
  });
});

describe("cases.uploadFile", () => {
  it("requires authentication", async () => {
    const ctx = createAnonContext();
    const caller = appRouter.createCaller(ctx);
    await expect(
      caller.cases.uploadFile({
        fileName: "test.pdf",
        fileData: "dGVzdA==",
        mimeType: "application/pdf",
      })
    ).rejects.toThrow();
  });
});

describe("feishu.getConfig", () => {
  it("requires admin role", async () => {
    const ctx = createUserContext("user");
    const caller = appRouter.createCaller(ctx);
    await expect(caller.feishu.getConfig()).rejects.toThrow();
  });
});

describe("feishu.updateConfig", () => {
  it("requires admin role", async () => {
    const ctx = createUserContext("user");
    const caller = appRouter.createCaller(ctx);
    await expect(
      caller.feishu.updateConfig({
        appId: "cli_test",
        webhookUrl: "https://example.com/hook",
      })
    ).rejects.toThrow();
  });
});

describe("feishu.syncOrg", () => {
  it("requires admin role for non-admin user", async () => {
    const ctx = createUserContext("user");
    const caller = appRouter.createCaller(ctx);
    await expect(caller.feishu.syncOrg()).rejects.toThrow();
  });

  it("returns sync result for admin", async () => {
    const ctx = createUserContext("admin");
    const caller = appRouter.createCaller(ctx);
    const result = await caller.feishu.syncOrg();
    expect(result).toBeDefined();
    expect(result.success).toBe(true);
    expect(result.syncedDepartments).toBe(8);
    expect(result.syncedUsers).toBe(156);
  });
});

describe("feishu.testWebhook", () => {
  it("requires admin role", async () => {
    const ctx = createUserContext("user");
    const caller = appRouter.createCaller(ctx);
    await expect(
      caller.feishu.testWebhook({ webhookUrl: "https://example.com/hook" })
    ).rejects.toThrow();
  });
});
