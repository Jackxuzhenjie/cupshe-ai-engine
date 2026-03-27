import { describe, it, expect } from "vitest";
import { POINTS_MAP, LEVEL_THRESHOLDS, getLevelInfo } from "./db";

describe("Profile System", () => {
  describe("Points Configuration", () => {
    it("should have points defined for all activity types", () => {
      const expectedTypes = [
        "case_upload", "case_like", "case_favorite", "case_comment",
        "skill_complete", "skill_start", "prompt_use", "workflow_use",
        "challenge_join", "challenge_complete", "wish_submit",
        "bounty_claim", "share", "login", "badge_earn",
      ];
      for (const type of expectedTypes) {
        expect(POINTS_MAP[type]).toBeDefined();
        expect(POINTS_MAP[type]).toBeGreaterThan(0);
      }
    });

    it("should award correct points for key activities", () => {
      expect(POINTS_MAP.case_upload).toBe(50);
      expect(POINTS_MAP.skill_complete).toBe(100);
      expect(POINTS_MAP.challenge_complete).toBe(80);
      expect(POINTS_MAP.bounty_claim).toBe(60);
      expect(POINTS_MAP.login).toBe(2);
      expect(POINTS_MAP.case_like).toBe(5);
    });

    it("should have higher points for creation than consumption", () => {
      expect(POINTS_MAP.case_upload).toBeGreaterThan(POINTS_MAP.case_like);
      expect(POINTS_MAP.skill_complete).toBeGreaterThan(POINTS_MAP.skill_start);
      expect(POINTS_MAP.challenge_complete).toBeGreaterThan(POINTS_MAP.challenge_join);
    });
  });

  describe("Level Thresholds", () => {
    it("should have 10 levels", () => {
      expect(LEVEL_THRESHOLDS).toHaveLength(10);
    });

    it("should start at level 1 with 0 points", () => {
      expect(LEVEL_THRESHOLDS[0].level).toBe(1);
      expect(LEVEL_THRESHOLDS[0].min).toBe(0);
      expect(LEVEL_THRESHOLDS[0].title).toBe("AI新手");
    });

    it("should have strictly increasing thresholds", () => {
      for (let i = 1; i < LEVEL_THRESHOLDS.length; i++) {
        expect(LEVEL_THRESHOLDS[i].min).toBeGreaterThan(LEVEL_THRESHOLDS[i - 1].min);
        expect(LEVEL_THRESHOLDS[i].level).toBe(LEVEL_THRESHOLDS[i - 1].level + 1);
      }
    });

    it("should have unique titles for each level", () => {
      const titles = LEVEL_THRESHOLDS.map((t) => t.title);
      expect(new Set(titles).size).toBe(titles.length);
    });

    it("should end at level 10 with title AI先知", () => {
      const last = LEVEL_THRESHOLDS[LEVEL_THRESHOLDS.length - 1];
      expect(last.level).toBe(10);
      expect(last.title).toBe("AI先知");
    });
  });

  describe("getLevelInfo", () => {
    it("should return level 1 for 0 points", () => {
      const info = getLevelInfo(0);
      expect(info.level).toBe(1);
      expect(info.title).toBe("AI新手");
      expect(info.nextLevelMin).toBe(100);
      expect(info.nextLevelTitle).toBe("AI学徒");
    });

    it("should return level 2 for 100 points", () => {
      const info = getLevelInfo(100);
      expect(info.level).toBe(2);
      expect(info.title).toBe("AI学徒");
    });

    it("should return level 5 for 1000 points", () => {
      const info = getLevelInfo(1000);
      expect(info.level).toBe(5);
      expect(info.title).toBe("AI能手");
    });

    it("should return level 10 for 12000+ points", () => {
      const info = getLevelInfo(15000);
      expect(info.level).toBe(10);
      expect(info.title).toBe("AI先知");
    });

    it("should return correct next level info for mid-level", () => {
      const info = getLevelInfo(500);
      expect(info.level).toBe(3);
      expect(info.title).toBe("AI探索者");
      expect(info.nextLevelMin).toBe(600);
      expect(info.nextLevelTitle).toBe("AI实践者");
    });

    it("should handle boundary values correctly", () => {
      // Just below level 3 threshold
      const info99 = getLevelInfo(299);
      expect(info99.level).toBe(2);
      // Exactly at level 3 threshold
      const info100 = getLevelInfo(300);
      expect(info100.level).toBe(3);
    });
  });
});
