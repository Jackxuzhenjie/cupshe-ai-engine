/**
 * WeeklyReportSummary — CEO Review one-page view
 * Auto-aggregates all centers' R/Y/G status, trends, and key metrics
 */
import { useState, useMemo } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { trpc } from "@/lib/trpc";
import { departments } from "@/lib/data";
import { Link } from "wouter";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  CircleCheck,
  CircleAlert,
  CircleX,
  ChevronLeft,
  ChevronRight,
  CalendarDays,
  TrendingUp,
  AlertTriangle,
  Sparkles,
  Users,
  FileText,
  GitBranch,
  Eye,
  PenLine,
  BarChart3,
  Target,
  Building2,
  ArrowRight,
} from "lucide-react";

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

const statusConfig = {
  green: { label: "正常", labelEn: "On Track", icon: CircleCheck, color: "text-emerald-600", bg: "bg-emerald-500", bgLight: "bg-emerald-50", borderColor: "border-emerald-200" },
  yellow: { label: "关注", labelEn: "At Risk", icon: CircleAlert, color: "text-amber-600", bg: "bg-amber-500", bgLight: "bg-amber-50", borderColor: "border-amber-200" },
  red: { label: "预警", labelEn: "Critical", icon: CircleX, color: "text-red-600", bg: "bg-red-500", bgLight: "bg-red-50", borderColor: "border-red-200" },
};

export default function WeeklyReportSummary() {
  const { t } = useLanguage();
  const [currentWeekId, setCurrentWeekId] = useState(() => getWeekId(new Date()));

  const { data: reportsData, isLoading } = trpc.weeklyReports.list.useQuery({
    weekId: currentWeekId,
  });

  const weekRange = useMemo(() => getWeekRange(currentWeekId), [currentWeekId]);

  const reports = reportsData?.reports ?? [];

  // Build a map for quick lookup
  const reportMap = useMemo(() => {
    const map: Record<string, typeof reports[0]> = {};
    reports.forEach((r) => { map[r.centerId] = r; });
    return map;
  }, [reports]);

  // Summary stats
  const stats = useMemo(() => {
    const green = reports.filter((r) => r.status === "green").length;
    const yellow = reports.filter((r) => r.status === "yellow").length;
    const red = reports.filter((r) => r.status === "red").length;
    const notReported = departments.length - reports.length;
    const avgProgress = reports.length > 0
      ? Math.round(reports.reduce((sum, r) => sum + (r.progressPercent ?? 0), 0) / reports.length)
      : 0;
    const totalAiUsers = reports.reduce((sum, r) => sum + (r.activeAiUsers ?? 0), 0);
    const totalCases = reports.reduce((sum, r) => sum + (r.newCasesCount ?? 0), 0);
    const totalSkills = reports.reduce((sum, r) => sum + (r.skillsUnlocked ?? 0), 0);
    return { green, yellow, red, notReported, avgProgress, totalAiUsers, totalCases, totalSkills };
  }, [reports]);

  // Separate pilot and regular centers
  const pilotReports = useMemo(() =>
    departments.filter((d) => PILOT_CENTER_IDS.includes(d.id)).map((d) => ({
      dept: d,
      report: reportMap[d.id],
    })),
    [reportMap]
  );

  const regularReports = useMemo(() =>
    departments.filter((d) => !PILOT_CENTER_IDS.includes(d.id)).map((d) => ({
      dept: d,
      report: reportMap[d.id],
    })),
    [reportMap]
  );

  // Issues needing attention (red + yellow)
  const issueReports = useMemo(() =>
    reports
      .filter((r) => r.status === "red" || r.status === "yellow")
      .sort((a, b) => (a.status === "red" ? -1 : 1)),
    [reports]
  );

  // Highlights
  const highlightReports = useMemo(() =>
    reports.filter((r) => r.highlights && r.highlights.trim().length > 0),
    [reports]
  );

  const navigateWeek = (direction: -1 | 1) => {
    const [yearStr, weekStr] = currentWeekId.split("-W");
    let year = parseInt(yearStr);
    let week = parseInt(weekStr) + direction;
    if (week < 1) { year--; week = 52; }
    if (week > 52) { year++; week = 1; }
    setCurrentWeekId(`${year}-W${String(week).padStart(2, "0")}`);
  };

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            {t("AI转型周报汇总", "AI Transformation Weekly Summary")}
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            {t(
              "CEO Review · 一页纸全局视图 · 红黄绿状态总览",
              "CEO Review · One-Page Overview · R/Y/G Status Dashboard"
            )}
          </p>
        </div>
        <Link href="/weekly-report">
          <Button variant="outline" className="gap-2">
            <PenLine size={16} />
            {t("录入周报", "Enter Reports")}
          </Button>
        </Link>
      </div>

      {/* Week selector */}
      <div className="bg-card border border-border rounded-xl p-4">
        <div className="flex items-center justify-between">
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
          <Badge variant="outline" className="text-sm">
            {reports.length}/{departments.length} {t("已提交", "Reported")}
          </Badge>
        </div>
      </div>

      {/* KPI Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
        {/* Status distribution */}
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 text-center">
          <CircleCheck size={20} className="text-emerald-600 mx-auto mb-1" />
          <div className="text-2xl font-bold text-emerald-700">{stats.green}</div>
          <div className="text-xs text-emerald-600">{t("绿灯", "Green")}</div>
        </div>
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-center">
          <CircleAlert size={20} className="text-amber-600 mx-auto mb-1" />
          <div className="text-2xl font-bold text-amber-700">{stats.yellow}</div>
          <div className="text-xs text-amber-600">{t("黄灯", "Yellow")}</div>
        </div>
        <div className="bg-red-50 border border-red-200 rounded-xl p-3 text-center">
          <CircleX size={20} className="text-red-600 mx-auto mb-1" />
          <div className="text-2xl font-bold text-red-700">{stats.red}</div>
          <div className="text-xs text-red-600">{t("红灯", "Red")}</div>
        </div>
        {/* Key metrics */}
        <div className="bg-card border border-border rounded-xl p-3 text-center">
          <BarChart3 size={20} className="text-ocean mx-auto mb-1" />
          <div className="text-2xl font-bold text-foreground">{stats.avgProgress}%</div>
          <div className="text-xs text-muted-foreground">{t("平均进度", "Avg Progress")}</div>
        </div>
        <div className="bg-card border border-border rounded-xl p-3 text-center">
          <Users size={20} className="text-ocean mx-auto mb-1" />
          <div className="text-2xl font-bold text-foreground">{stats.totalAiUsers}</div>
          <div className="text-xs text-muted-foreground">{t("AI用户", "AI Users")}</div>
        </div>
        <div className="bg-card border border-border rounded-xl p-3 text-center">
          <FileText size={20} className="text-ocean mx-auto mb-1" />
          <div className="text-2xl font-bold text-foreground">{stats.totalCases}</div>
          <div className="text-xs text-muted-foreground">{t("新增案例", "New Cases")}</div>
        </div>
        <div className="bg-card border border-border rounded-xl p-3 text-center">
          <GitBranch size={20} className="text-ocean mx-auto mb-1" />
          <div className="text-2xl font-bold text-foreground">{stats.totalSkills}</div>
          <div className="text-xs text-muted-foreground">{t("技能解锁", "Skills")}</div>
        </div>
      </div>

      {/* Pilot Centers Section */}
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="px-5 py-3 border-b border-border bg-coral/5 flex items-center gap-2">
          <Sparkles size={18} className="text-coral" />
          <h2 className="text-base font-semibold text-foreground">
            {t("三大试点中心", "Three Pilot Centers")}
          </h2>
          <Badge className="bg-coral/10 text-coral border-coral/30 ml-2">
            {t("目标 L3→L4", "Target L3→L4")}
          </Badge>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-border">
          {pilotReports.map(({ dept, report }) => {
            const status = report?.status ?? "green";
            const cfg = statusConfig[status];
            const StatusIcon = cfg.icon;
            return (
              <div key={dept.id} className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <StatusIcon size={20} className={cfg.color} />
                    <span className="font-semibold text-foreground">{t(dept.zh, dept.en)}</span>
                  </div>
                  <Badge variant="outline" className={`${cfg.borderColor} ${cfg.color}`}>
                    {t(cfg.label, cfg.labelEn)}
                  </Badge>
                </div>
                {report ? (
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">{t("进度", "Progress")}</span>
                      <span className="font-medium">{report.progressPercent ?? 0}%</span>
                    </div>
                    <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                      <div className={`h-full ${cfg.bg} rounded-full`} style={{ width: `${report.progressPercent ?? 0}%` }} />
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">{t("成熟度", "Maturity")}</span>
                      <span className="font-medium">{report.maturityLevel ?? "L2"}</span>
                    </div>
                    {report.progressItems && (
                      <div className="pt-1">
                        <div className="text-xs font-medium text-muted-foreground mb-1 flex items-center gap-1">
                          <TrendingUp size={12} /> {t("进展", "Progress")}
                        </div>
                        <p className="text-xs text-foreground/80 line-clamp-3 whitespace-pre-line">{report.progressItems}</p>
                      </div>
                    )}
                    {report.issues && (
                      <div className="pt-1">
                        <div className="text-xs font-medium text-amber-600 mb-1 flex items-center gap-1">
                          <AlertTriangle size={12} /> {t("问题", "Issues")}
                        </div>
                        <p className="text-xs text-foreground/80 line-clamp-2 whitespace-pre-line">{report.issues}</p>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-4 text-sm text-muted-foreground">
                    {t("本周未提交", "Not reported this week")}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* All Centers Grid */}
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="px-5 py-3 border-b border-border flex items-center gap-2">
          <Building2 size={18} className="text-ocean" />
          <h2 className="text-base font-semibold text-foreground">
            {t("全部中心状态一览", "All Centers Status Overview")}
          </h2>
          <Badge variant="outline" className="ml-2">
            {t("普通中心目标 L2→L3", "Regular Target L2→L3")}
          </Badge>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                <th className="text-left px-4 py-2.5 font-medium text-muted-foreground">{t("中心", "Center")}</th>
                <th className="text-center px-3 py-2.5 font-medium text-muted-foreground">{t("状态", "Status")}</th>
                <th className="text-center px-3 py-2.5 font-medium text-muted-foreground">{t("进度", "Progress")}</th>
                <th className="text-center px-3 py-2.5 font-medium text-muted-foreground">{t("成熟度", "Level")}</th>
                <th className="text-center px-3 py-2.5 font-medium text-muted-foreground">{t("AI用户", "Users")}</th>
                <th className="text-center px-3 py-2.5 font-medium text-muted-foreground">{t("案例", "Cases")}</th>
                <th className="text-left px-3 py-2.5 font-medium text-muted-foreground">{t("关键进展", "Key Progress")}</th>
              </tr>
            </thead>
            <tbody>
              {departments.map((dept) => {
                const report = reportMap[dept.id];
                const status = report?.status ?? "green";
                const cfg = statusConfig[status];
                const StatusIcon = cfg.icon;
                const isPilot = PILOT_CENTER_IDS.includes(dept.id);
                return (
                  <tr key={dept.id} className="border-b border-border/50 last:border-0 hover:bg-muted/20 transition-colors">
                    <td className="px-4 py-2.5">
                      <div className="flex items-center gap-1.5">
                        <span className="font-medium text-foreground">{t(dept.zh, dept.en)}</span>
                        {isPilot && (
                          <Badge variant="outline" className="text-[10px] px-1 py-0 border-coral text-coral">
                            {t("试点", "Pilot")}
                          </Badge>
                        )}
                      </div>
                    </td>
                    <td className="text-center px-3 py-2.5">
                      {report ? (
                        <div className="flex items-center justify-center gap-1">
                          <StatusIcon size={16} className={cfg.color} />
                          <span className={`text-xs font-medium ${cfg.color}`}>{t(cfg.label, cfg.labelEn)}</span>
                        </div>
                      ) : (
                        <span className="text-xs text-muted-foreground">—</span>
                      )}
                    </td>
                    <td className="text-center px-3 py-2.5">
                      {report ? (
                        <div className="flex items-center gap-2 justify-center">
                          <div className="w-16 h-1.5 bg-muted rounded-full overflow-hidden">
                            <div className={`h-full ${cfg.bg} rounded-full`} style={{ width: `${report.progressPercent ?? 0}%` }} />
                          </div>
                          <span className="text-xs font-medium">{report.progressPercent ?? 0}%</span>
                        </div>
                      ) : (
                        <span className="text-xs text-muted-foreground">—</span>
                      )}
                    </td>
                    <td className="text-center px-3 py-2.5">
                      <span className="text-xs font-medium">{report?.maturityLevel ?? "—"}</span>
                    </td>
                    <td className="text-center px-3 py-2.5">
                      <span className="text-xs">{report?.activeAiUsers ?? "—"}</span>
                    </td>
                    <td className="text-center px-3 py-2.5">
                      <span className="text-xs">{report?.newCasesCount ?? "—"}</span>
                    </td>
                    <td className="px-3 py-2.5">
                      <p className="text-xs text-foreground/70 line-clamp-1 max-w-[200px]">
                        {report?.progressItems || t("未填写", "Not filled")}
                      </p>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Issues & Highlights side by side */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Issues needing attention */}
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          <div className="px-5 py-3 border-b border-border bg-red-50/50 flex items-center gap-2">
            <AlertTriangle size={18} className="text-red-600" />
            <h2 className="text-base font-semibold text-foreground">
              {t("需关注的问题", "Issues Needing Attention")}
            </h2>
            {issueReports.length > 0 && (
              <Badge variant="destructive" className="ml-2">{issueReports.length}</Badge>
            )}
          </div>
          <div className="divide-y divide-border">
            {issueReports.length === 0 ? (
              <div className="p-6 text-center text-sm text-muted-foreground">
                {t("本周暂无红黄灯问题", "No red/yellow issues this week")}
              </div>
            ) : (
              issueReports.map((report) => {
                const cfg = statusConfig[report.status as "red" | "yellow"];
                const StatusIcon = cfg.icon;
                const dept = departments.find((d) => d.id === report.centerId);
                return (
                  <div key={report.id} className={`p-4 ${cfg.bgLight}`}>
                    <div className="flex items-center gap-2 mb-2">
                      <StatusIcon size={16} className={cfg.color} />
                      <span className="font-medium text-sm">{dept ? t(dept.zh, dept.en) : report.centerName}</span>
                      <Badge variant="outline" className={`${cfg.borderColor} ${cfg.color} text-[10px]`}>
                        {t(cfg.label, cfg.labelEn)}
                      </Badge>
                    </div>
                    <p className="text-xs text-foreground/80 whitespace-pre-line">{report.issues || t("未填写具体问题", "No specific issues provided")}</p>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Highlights */}
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          <div className="px-5 py-3 border-b border-border bg-emerald-50/50 flex items-center gap-2">
            <Sparkles size={18} className="text-emerald-600" />
            <h2 className="text-base font-semibold text-foreground">
              {t("本周亮点", "This Week Highlights")}
            </h2>
            {highlightReports.length > 0 && (
              <Badge className="bg-emerald-100 text-emerald-700 ml-2">{highlightReports.length}</Badge>
            )}
          </div>
          <div className="divide-y divide-border">
            {highlightReports.length === 0 ? (
              <div className="p-6 text-center text-sm text-muted-foreground">
                {t("本周暂无亮点记录", "No highlights recorded this week")}
              </div>
            ) : (
              highlightReports.map((report) => {
                const dept = departments.find((d) => d.id === report.centerId);
                return (
                  <div key={report.id} className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Sparkles size={14} className="text-coral" />
                      <span className="font-medium text-sm">{dept ? t(dept.zh, dept.en) : report.centerName}</span>
                    </div>
                    <p className="text-xs text-foreground/80 whitespace-pre-line">{report.highlights}</p>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>

      {/* Footer note */}
      <div className="text-center text-xs text-muted-foreground py-2">
        {t(
          "CUPSHE AI 转型引擎 · 周报汇总 · PMO Claire王喆 · 呈CEO Mikezhao赵黎明 Review",
          "CUPSHE AI Transformation Engine · Weekly Summary · PMO Claire Wang · For CEO Mikezhao Review"
        )}
      </div>
    </div>
  );
}
