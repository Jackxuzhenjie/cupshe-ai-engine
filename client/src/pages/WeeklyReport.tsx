/**
 * WeeklyReport — PMO Claire's weekly R/Y/G status entry form
 * Supports per-center AI progress, issues, and next-week plans
 */
import { useState, useMemo, useCallback, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { trpc } from "@/lib/trpc";
import { departments } from "@/lib/data";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  CircleCheck,
  CircleAlert,
  CircleX,
  Save,
  ChevronLeft,
  ChevronRight,
  CalendarDays,
  Building2,
  TrendingUp,
  AlertTriangle,
  Target,
  Sparkles,
  Users,
  FileText,
  GitBranch,
  CheckCircle2,
  Send,
} from "lucide-react";

// Pilot centers
const PILOT_CENTER_IDS = ["marketing", "creative", "it"];

function getWeekId(date: Date): string {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() + 3 - ((d.getDay() + 6) % 7));
  const week1 = new Date(d.getFullYear(), 0, 4);
  const weekNum = 1 + Math.round(((d.getTime() - week1.getTime()) / 86400000 - 3 + ((week1.getDay() + 6) % 7)) / 7);
  return `${d.getFullYear()}-W${String(weekNum).padStart(2, "0")}`;
}

function getWeekRange(weekId: string): { start: string; end: string } {
  const [yearStr, weekStr] = weekId.split("-W");
  const year = parseInt(yearStr);
  const week = parseInt(weekStr);
  const jan4 = new Date(year, 0, 4);
  const dayOfWeek = jan4.getDay() || 7;
  const monday = new Date(jan4);
  monday.setDate(jan4.getDate() - dayOfWeek + 1 + (week - 1) * 7);
  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);
  const fmt = (d: Date) => `${d.getMonth() + 1}/${d.getDate()}`;
  return { start: fmt(monday), end: fmt(sunday) };
}

interface CenterForm {
  centerId: string;
  centerName: string;
  centerNameEn: string;
  status: "red" | "yellow" | "green";
  progressPercent: number;
  maturityLevel: "L1" | "L2" | "L3" | "L4" | "L5";
  progressItems: string;
  issues: string;
  nextWeekPlans: string;
  highlights: string;
  activeAiUsers: number;
  newCasesCount: number;
  skillsUnlocked: number;
  isPilot: boolean;
  saved: boolean;
}

const statusConfig = {
  green: { label: "绿", labelEn: "Green", icon: CircleCheck, color: "text-emerald-600", bg: "bg-emerald-50 border-emerald-200", ring: "ring-emerald-400" },
  yellow: { label: "黄", labelEn: "Yellow", icon: CircleAlert, color: "text-amber-600", bg: "bg-amber-50 border-amber-200", ring: "ring-amber-400" },
  red: { label: "红", labelEn: "Red", icon: CircleX, color: "text-red-600", bg: "bg-red-50 border-red-200", ring: "ring-red-400" },
};

export default function WeeklyReport() {
  const { t } = useLanguage();
  const [currentWeekId, setCurrentWeekId] = useState(() => getWeekId(new Date()));
  const [activeCenterId, setActiveCenterId] = useState(departments[0].id);
  const [forms, setForms] = useState<Record<string, CenterForm>>(() => {
    const initial: Record<string, CenterForm> = {};
    departments.forEach((dept) => {
      initial[dept.id] = {
        centerId: dept.id,
        centerName: dept.zh,
        centerNameEn: dept.en,
        status: "green",
        progressPercent: 0,
        maturityLevel: "L2",
        progressItems: "",
        issues: "",
        nextWeekPlans: "",
        highlights: "",
        activeAiUsers: 0,
        newCasesCount: 0,
        skillsUnlocked: 0,
        isPilot: PILOT_CENTER_IDS.includes(dept.id),
        saved: false,
      };
    });
    return initial;
  });

  // Fetch existing reports for this week
  const { data: existingReports } = trpc.weeklyReports.list.useQuery(
    { weekId: currentWeekId }
  );

  // Sync fetched reports into form state
  useEffect(() => {
    if (existingReports && existingReports.reports.length > 0) {
      setForms((prev) => {
        const updated = { ...prev };
        existingReports.reports.forEach((report) => {
          if (updated[report.centerId]) {
            updated[report.centerId] = {
              ...updated[report.centerId],
              status: report.status as "red" | "yellow" | "green",
              progressPercent: report.progressPercent ?? 0,
              maturityLevel: (report.maturityLevel ?? "L2") as any,
              progressItems: report.progressItems ?? "",
              issues: report.issues ?? "",
              nextWeekPlans: report.nextWeekPlans ?? "",
              highlights: report.highlights ?? "",
              activeAiUsers: report.activeAiUsers ?? 0,
              newCasesCount: report.newCasesCount ?? 0,
              skillsUnlocked: report.skillsUnlocked ?? 0,
              saved: true,
            };
          }
        });
        return updated;
      });
    }
  }, [existingReports]);

  const upsertMutation = trpc.weeklyReports.upsert.useMutation({
    onSuccess: () => {
      setForms((prev) => ({
        ...prev,
        [activeCenterId]: { ...prev[activeCenterId], saved: true },
      }));
      toast.success(t("保存成功", "Saved successfully"));
    },
    onError: (err) => {
      toast.error(t("保存失败: " + err.message, "Save failed: " + err.message));
    },
  });

  const activeForm = forms[activeCenterId];
  const weekRange = useMemo(() => getWeekRange(currentWeekId), [currentWeekId]);

  const updateForm = useCallback(
    (field: keyof CenterForm, value: any) => {
      setForms((prev) => ({
        ...prev,
        [activeCenterId]: { ...prev[activeCenterId], [field]: value, saved: false },
      }));
    },
    [activeCenterId]
  );

  const handleSave = () => {
    const form = forms[activeCenterId];
    upsertMutation.mutate({
      weekId: currentWeekId,
      centerId: form.centerId,
      centerName: form.centerName,
      centerNameEn: form.centerNameEn,
      status: form.status,
      progressPercent: form.progressPercent,
      maturityLevel: form.maturityLevel,
      progressItems: form.progressItems,
      issues: form.issues,
      nextWeekPlans: form.nextWeekPlans,
      highlights: form.highlights,
      activeAiUsers: form.activeAiUsers,
      newCasesCount: form.newCasesCount,
      skillsUnlocked: form.skillsUnlocked,
      isPilot: form.isPilot,
    });
  };

  const handleSubmitAll = () => {
    const unsaved = departments.filter((d) => !forms[d.id].saved);
    if (unsaved.length > 0) {
      toast.warning(
        t(
          `还有 ${unsaved.length} 个中心未保存，请先逐一保存`,
          `${unsaved.length} centers not saved yet. Please save each first.`
        )
      );
      return;
    }
    toast.success(t("本周周报已全部提交", "All weekly reports submitted"));
  };

  const navigateWeek = (direction: -1 | 1) => {
    const [yearStr, weekStr] = currentWeekId.split("-W");
    let year = parseInt(yearStr);
    let week = parseInt(weekStr) + direction;
    if (week < 1) { year--; week = 52; }
    if (week > 52) { year++; week = 1; }
    setCurrentWeekId(`${year}-W${String(week).padStart(2, "0")}`);
  };

  // Summary stats
  const savedCount = departments.filter((d) => forms[d.id].saved).length;
  const greenCount = departments.filter((d) => forms[d.id].status === "green").length;
  const yellowCount = departments.filter((d) => forms[d.id].status === "yellow").length;
  const redCount = departments.filter((d) => forms[d.id].status === "red").length;

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            {t("AI转型周报录入", "AI Transformation Weekly Report")}
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            {t(
              "PMO Claire · 各中心红黄绿状态 + 进展/问题/计划",
              "PMO Claire · R/Y/G Status + Progress/Issues/Plans per Center"
            )}
          </p>
        </div>
        <Button onClick={handleSubmitAll} className="gap-2 bg-ocean hover:bg-ocean-light text-white">
          <Send size={16} />
          {t("提交本周全部", "Submit All")}
          <Badge variant="secondary" className="ml-1 text-xs">
            {savedCount}/{departments.length}
          </Badge>
        </Button>
      </div>

      {/* Week selector + summary */}
      <div className="bg-card border border-border rounded-xl p-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={() => navigateWeek(-1)} className="h-8 w-8">
              <ChevronLeft size={16} />
            </Button>
            <div className="flex items-center gap-2">
              <CalendarDays size={18} className="text-ocean" />
              <span className="font-semibold text-lg">{currentWeekId}</span>
              <span className="text-sm text-muted-foreground">
                ({weekRange.start} - {weekRange.end})
              </span>
            </div>
            <Button variant="ghost" size="icon" onClick={() => navigateWeek(1)} className="h-8 w-8">
              <ChevronRight size={16} />
            </Button>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full bg-emerald-500" />
              <span className="font-medium">{greenCount}</span>
              <span className="text-muted-foreground">{t("绿", "Green")}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full bg-amber-500" />
              <span className="font-medium">{yellowCount}</span>
              <span className="text-muted-foreground">{t("黄", "Yellow")}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <span className="font-medium">{redCount}</span>
              <span className="text-muted-foreground">{t("红", "Red")}</span>
            </div>
            <div className="text-muted-foreground">|</div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 size={14} className="text-ocean" />
              <span className="font-medium">{savedCount}</span>
              <span className="text-muted-foreground">/ {departments.length} {t("已填", "filled")}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main content: center list + form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Center list - left panel */}
        <div className="lg:col-span-3">
          <div className="bg-card border border-border rounded-xl overflow-hidden">
            <div className="px-4 py-3 border-b border-border bg-muted/30">
              <h3 className="text-sm font-semibold text-foreground">
                {t("各中心状态", "Center Status")}
              </h3>
            </div>
            <div className="max-h-[600px] overflow-y-auto">
              {departments.map((dept) => {
                const form = forms[dept.id];
                const StatusIcon = statusConfig[form.status].icon;
                const isActive = dept.id === activeCenterId;
                return (
                  <button
                    key={dept.id}
                    onClick={() => setActiveCenterId(dept.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors border-b border-border/50 last:border-0 ${
                      isActive
                        ? "bg-ocean/5 border-l-3 border-l-ocean"
                        : "hover:bg-muted/50"
                    }`}
                  >
                    <StatusIcon
                      size={18}
                      className={statusConfig[form.status].color}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className={`text-sm font-medium truncate ${isActive ? "text-ocean" : "text-foreground"}`}>
                          {t(dept.zh, dept.en)}
                        </span>
                        {form.isPilot && (
                          <Badge variant="outline" className="text-[10px] px-1 py-0 border-coral text-coral shrink-0">
                            {t("试点", "Pilot")}
                          </Badge>
                        )}
                      </div>
                      <div className="text-[11px] text-muted-foreground mt-0.5">
                        {form.progressPercent}% · {form.maturityLevel}
                      </div>
                    </div>
                    {form.saved && (
                      <CheckCircle2 size={14} className="text-emerald-500 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Entry form - right panel */}
        <div className="lg:col-span-9">
          <div className="bg-card border border-border rounded-xl">
            {/* Form header */}
            <div className="px-5 py-4 border-b border-border flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Building2 size={20} className="text-ocean" />
                <div>
                  <h2 className="text-lg font-semibold text-foreground">
                    {t(activeForm.centerName, activeForm.centerNameEn)}
                  </h2>
                  <p className="text-xs text-muted-foreground">
                    {currentWeekId} · {t("周报录入", "Weekly Report Entry")}
                  </p>
                </div>
                {activeForm.isPilot && (
                  <Badge className="bg-coral/10 text-coral border-coral/30">
                    <Sparkles size={12} className="mr-1" />
                    {t("试点中心", "Pilot Center")}
                  </Badge>
                )}
              </div>
              <Button
                onClick={handleSave}
                disabled={upsertMutation.isPending}
                className="gap-2 bg-ocean hover:bg-ocean-light text-white"
              >
                <Save size={16} />
                {upsertMutation.isPending ? t("保存中...", "Saving...") : t("保存", "Save")}
              </Button>
            </div>

            <div className="p-5 space-y-5">
              {/* Row 1: Status + Progress + Maturity */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Status selector */}
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    {t("本周状态", "This Week Status")}
                  </label>
                  <div className="flex gap-2">
                    {(["green", "yellow", "red"] as const).map((s) => {
                      const cfg = statusConfig[s];
                      const Icon = cfg.icon;
                      const isSelected = activeForm.status === s;
                      return (
                        <button
                          key={s}
                          onClick={() => updateForm("status", s)}
                          className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg border-2 transition-all ${
                            isSelected
                              ? `${cfg.bg} ${cfg.ring} ring-2`
                              : "border-border hover:border-muted-foreground/30"
                          }`}
                        >
                          <Icon size={18} className={isSelected ? cfg.color : "text-muted-foreground"} />
                          <span className={`text-sm font-medium ${isSelected ? cfg.color : "text-muted-foreground"}`}>
                            {t(cfg.label, cfg.labelEn)}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Progress */}
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    {t("AI采纳进度", "AI Adoption Progress")}
                  </label>
                  <div className="flex items-center gap-3">
                    <Input
                      type="number"
                      min={0}
                      max={100}
                      value={activeForm.progressPercent}
                      onChange={(e) => updateForm("progressPercent", parseInt(e.target.value) || 0)}
                      className="w-20"
                    />
                    <span className="text-sm text-muted-foreground">%</span>
                    <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-ocean rounded-full transition-all"
                        style={{ width: `${activeForm.progressPercent}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Maturity Level */}
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    {t("成熟度等级", "Maturity Level")}
                  </label>
                  <Select
                    value={activeForm.maturityLevel}
                    onValueChange={(v) => updateForm("maturityLevel", v)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="L1">L1 - {t("初始", "Initial")}</SelectItem>
                      <SelectItem value="L2">L2 - {t("探索", "Exploring")}</SelectItem>
                      <SelectItem value="L3">L3 - {t("规模化", "Scaling")}</SelectItem>
                      <SelectItem value="L4">L4 - {t("优化", "Optimizing")}</SelectItem>
                      <SelectItem value="L5">L5 - {t("领先", "Leading")}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Row 2: Key metrics */}
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 flex items-center gap-1.5">
                    <Users size={14} className="text-ocean" />
                    {t("活跃AI用户", "Active AI Users")}
                  </label>
                  <Input
                    type="number"
                    min={0}
                    value={activeForm.activeAiUsers}
                    onChange={(e) => updateForm("activeAiUsers", parseInt(e.target.value) || 0)}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 flex items-center gap-1.5">
                    <FileText size={14} className="text-ocean" />
                    {t("新增案例数", "New Cases")}
                  </label>
                  <Input
                    type="number"
                    min={0}
                    value={activeForm.newCasesCount}
                    onChange={(e) => updateForm("newCasesCount", parseInt(e.target.value) || 0)}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 flex items-center gap-1.5">
                    <GitBranch size={14} className="text-ocean" />
                    {t("技能解锁数", "Skills Unlocked")}
                  </label>
                  <Input
                    type="number"
                    min={0}
                    value={activeForm.skillsUnlocked}
                    onChange={(e) => updateForm("skillsUnlocked", parseInt(e.target.value) || 0)}
                  />
                </div>
              </div>

              {/* Row 3: Text areas */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 flex items-center gap-1.5">
                    <TrendingUp size={14} className="text-emerald-600" />
                    {t("本周进展", "This Week Progress")}
                  </label>
                  <Textarea
                    value={activeForm.progressItems}
                    onChange={(e) => updateForm("progressItems", e.target.value)}
                    placeholder={t(
                      "1. 完成了...\n2. 推进了...\n3. 启动了...",
                      "1. Completed...\n2. Advanced...\n3. Initiated..."
                    )}
                    rows={4}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 flex items-center gap-1.5">
                    <AlertTriangle size={14} className="text-amber-600" />
                    {t("问题与阻碍", "Issues & Blockers")}
                  </label>
                  <Textarea
                    value={activeForm.issues}
                    onChange={(e) => updateForm("issues", e.target.value)}
                    placeholder={t(
                      "1. 遇到的问题...\n2. 需要的支持...",
                      "1. Issues encountered...\n2. Support needed..."
                    )}
                    rows={4}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 flex items-center gap-1.5">
                    <Target size={14} className="text-ocean" />
                    {t("下周计划", "Next Week Plans")}
                  </label>
                  <Textarea
                    value={activeForm.nextWeekPlans}
                    onChange={(e) => updateForm("nextWeekPlans", e.target.value)}
                    placeholder={t(
                      "1. 计划推进...\n2. 目标完成...",
                      "1. Plan to advance...\n2. Target to complete..."
                    )}
                    rows={4}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 flex items-center gap-1.5">
                    <Sparkles size={14} className="text-coral" />
                    {t("本周亮点", "Highlights")}
                  </label>
                  <Textarea
                    value={activeForm.highlights}
                    onChange={(e) => updateForm("highlights", e.target.value)}
                    placeholder={t(
                      "值得表彰的成果、突破性进展...",
                      "Notable achievements, breakthroughs..."
                    )}
                    rows={4}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
