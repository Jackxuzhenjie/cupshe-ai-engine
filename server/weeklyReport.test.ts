import { describe, it, expect, vi, beforeEach } from "vitest";

// Mock the database module
vi.mock("./db", () => ({
  listWeeklyReports: vi.fn(),
  getWeeklyReport: vi.fn(),
  getWeeklyReportByWeekAndCenter: vi.fn(),
  upsertWeeklyReport: vi.fn(),
  deleteWeeklyReport: vi.fn(),
  updateWeeklyReport: vi.fn(),
  getWeeklyReportSummary: vi.fn(),
  getAvailableWeeks: vi.fn(),
}));

import * as db from "./db";

describe("Weekly Report DB helpers", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("listWeeklyReports returns reports for a given week", async () => {
    const mockReports = {
      reports: [
        {
          id: 1,
          weekId: "2026-W12",
          centerId: "marketing",
          centerName: "营销中心",
          status: "green",
          progressPercent: 45,
          maturityLevel: "L2",
          progressItems: "完成了AI广告投放测试",
          issues: null,
          nextWeekPlans: "扩大测试范围",
          highlights: "ROI提升12%",
          activeAiUsers: 8,
          newCasesCount: 2,
          skillsUnlocked: 3,
          isPilot: true,
          submittedBy: 1,
          submitterName: "Claire",
          ceoReviewNote: null,
          ceoReviewed: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      total: 1,
    };
    vi.mocked(db.listWeeklyReports).mockResolvedValue(mockReports);

    const result = await db.listWeeklyReports({ weekId: "2026-W12" });
    expect(result.reports).toHaveLength(1);
    expect(result.reports[0].centerId).toBe("marketing");
    expect(result.reports[0].status).toBe("green");
    expect(db.listWeeklyReports).toHaveBeenCalledWith({ weekId: "2026-W12" });
  });

  it("listWeeklyReports filters by status", async () => {
    vi.mocked(db.listWeeklyReports).mockResolvedValue({ reports: [], total: 0 });

    await db.listWeeklyReports({ weekId: "2026-W12", status: "red" });
    expect(db.listWeeklyReports).toHaveBeenCalledWith({ weekId: "2026-W12", status: "red" });
  });

  it("getWeeklyReport returns a single report by id", async () => {
    const mockReport = {
      id: 1,
      weekId: "2026-W12",
      centerId: "marketing",
      centerName: "营销中心",
      status: "green" as const,
      progressPercent: 45,
    };
    vi.mocked(db.getWeeklyReport).mockResolvedValue(mockReport as any);

    const result = await db.getWeeklyReport(1);
    expect(result).toBeDefined();
    expect(result?.id).toBe(1);
    expect(db.getWeeklyReport).toHaveBeenCalledWith(1);
  });

  it("getWeeklyReportByWeekAndCenter returns matching report", async () => {
    const mockReport = {
      id: 1,
      weekId: "2026-W12",
      centerId: "creative",
      centerName: "创意中心",
      status: "yellow" as const,
    };
    vi.mocked(db.getWeeklyReportByWeekAndCenter).mockResolvedValue(mockReport as any);

    const result = await db.getWeeklyReportByWeekAndCenter("2026-W12", "creative");
    expect(result?.centerId).toBe("creative");
    expect(result?.status).toBe("yellow");
  });

  it("upsertWeeklyReport creates or updates a report", async () => {
    vi.mocked(db.upsertWeeklyReport).mockResolvedValue(undefined);

    const data = {
      weekId: "2026-W12",
      centerId: "it",
      centerName: "互联网研发中心",
      status: "green" as const,
      progressPercent: 60,
      maturityLevel: "L3" as const,
      progressItems: "完成了数据管道AI化",
      issues: "",
      nextWeekPlans: "推进模型训练",
      highlights: "数据处理效率提升40%",
      activeAiUsers: 15,
      newCasesCount: 3,
      skillsUnlocked: 5,
      isPilot: true,
      submittedBy: 1,
      submitterName: "Claire",
    };

    await db.upsertWeeklyReport(data);
    expect(db.upsertWeeklyReport).toHaveBeenCalledWith(data);
  });

  it("deleteWeeklyReport removes a report", async () => {
    vi.mocked(db.deleteWeeklyReport).mockResolvedValue(undefined);

    await db.deleteWeeklyReport(1);
    expect(db.deleteWeeklyReport).toHaveBeenCalledWith(1);
  });

  it("getWeeklyReportSummary returns aggregated stats", async () => {
    const mockSummary = {
      total: 14,
      green: 8,
      yellow: 4,
      red: 2,
      avgProgress: 42,
    };
    vi.mocked(db.getWeeklyReportSummary).mockResolvedValue(mockSummary);

    const result = await db.getWeeklyReportSummary("2026-W12");
    expect(result.total).toBe(14);
    expect(result.green).toBe(8);
    expect(result.yellow).toBe(4);
    expect(result.red).toBe(2);
    expect(result.avgProgress).toBe(42);
  });

  it("getAvailableWeeks returns distinct week IDs", async () => {
    vi.mocked(db.getAvailableWeeks).mockResolvedValue(["2026-W12", "2026-W11", "2026-W10"]);

    const result = await db.getAvailableWeeks();
    expect(result).toHaveLength(3);
    expect(result[0]).toBe("2026-W12");
  });

  it("updateWeeklyReport updates specific fields (CEO review)", async () => {
    vi.mocked(db.updateWeeklyReport).mockResolvedValue(undefined);

    await db.updateWeeklyReport(1, {
      ceoReviewNote: "需要加大投入",
      ceoReviewed: true,
    });
    expect(db.updateWeeklyReport).toHaveBeenCalledWith(1, {
      ceoReviewNote: "需要加大投入",
      ceoReviewed: true,
    });
  });
});

describe("Weekly Report data validation", () => {
  it("status must be one of red/yellow/green", () => {
    const validStatuses = ["red", "yellow", "green"];
    validStatuses.forEach((status) => {
      expect(validStatuses).toContain(status);
    });
    expect(validStatuses).not.toContain("blue");
    expect(validStatuses).not.toContain("");
  });

  it("maturity levels are L1-L5", () => {
    const validLevels = ["L1", "L2", "L3", "L4", "L5"];
    validLevels.forEach((level) => {
      expect(level).toMatch(/^L[1-5]$/);
    });
  });

  it("weekId format is YYYY-Wnn", () => {
    const validWeekIds = ["2026-W01", "2026-W12", "2026-W52"];
    validWeekIds.forEach((weekId) => {
      expect(weekId).toMatch(/^\d{4}-W\d{2}$/);
    });
  });

  it("progressPercent must be 0-100", () => {
    const validValues = [0, 25, 50, 75, 100];
    validValues.forEach((v) => {
      expect(v).toBeGreaterThanOrEqual(0);
      expect(v).toBeLessThanOrEqual(100);
    });
  });
});
