/*
 * ControlTower — CEO-friendly executive dashboard
 * Design: Extremely simple, clean, at-a-glance metrics
 * Includes: AI Transformation Dashboard, 3 pilot project tracking, 1-3-6-9 timeline, L2/L3 targets
 * CEO只看 Control Tower，必须非常简单
 */
import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";
import {
  Gauge, TrendingUp, BookOpen, Lightbulb, Trophy, GitBranch, BarChart3,
  ArrowUpRight, Users, Layers, Target, Award, Megaphone, Palette, Calendar,
  CheckCircle2, Clock, ArrowRight,
} from "lucide-react";
import { controlTowerMetrics, departmentCenters } from "@/lib/data";
import { aiTransformationDashboard, departmentMaturityMap, maturityLevels, enhancedCases, type MaturityLevel } from "@/lib/caseData";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from "recharts";

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.08 } } };
const item = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } };

// 1-3-6-9 Timeline data
const timelinePhases = [
  {
    id: "month1",
    monthZh: "3月",
    monthEn: "Mar",
    titleZh: "启动",
    titleEn: "Launch",
    statusZh: "进行中",
    statusEn: "In Progress",
    status: "current" as const,
    progress: 60,
    milestonesZh: ["启动会已开", "PM已任命", "项目规划中"],
    milestonesEn: ["Kickoff done", "PM appointed", "Planning"],
  },
  {
    id: "month3",
    monthZh: "4-6月",
    monthEn: "Apr-Jun",
    titleZh: "试点验证",
    titleEn: "Pilot",
    statusZh: "待启动",
    statusEn: "Upcoming",
    status: "upcoming" as const,
    progress: 0,
    milestonesZh: ["平台搭建→试运行", "试点Phase 1", "全员→L1+"],
    milestonesEn: ["Platform build→trial", "Pilot Phase 1", "All→L1+"],
  },
  {
    id: "month6",
    monthZh: "7-9月",
    monthEn: "Jul-Sep",
    titleZh: "深化推广",
    titleEn: "Expand",
    statusZh: "待启动",
    statusEn: "Upcoming",
    status: "upcoming" as const,
    progress: 0,
    milestonesZh: ["试点Phase 2", "开放申请试点", "全员→L2"],
    milestonesEn: ["Pilot Phase 2", "Open pilot apps", "All→L2"],
  },
  {
    id: "month9",
    monthZh: "10-12月",
    monthEn: "Oct-Dec",
    titleZh: "沉淀收官",
    titleEn: "Settle",
    statusZh: "待启动",
    statusEn: "Upcoming",
    status: "upcoming" as const,
    progress: 0,
    milestonesZh: ["SOP固化", "全中心L2/试点L3", "年度表彰"],
    milestonesEn: ["SOP finalized", "All L2/Pilot L3", "Annual awards"],
  },
];

// Three pilot projects
const pilotProjects = [
  {
    nameZh: "效果营销AI化",
    nameEn: "Performance Marketing AI",
    icon: Megaphone,
    color: "text-coral",
    bg: "bg-coral/10",
    phaseZh: "Phase 1 · 试点验证",
    phaseEn: "Phase 1 · Validation",
    progress: 35,
    flowsEmbedded: "1/2",
    cases: 3,
    efficiency: "+15%",
    targetL: "L3",
  },
  {
    nameZh: "创意AI化",
    nameEn: "Creative AI",
    icon: Palette,
    color: "text-teal",
    bg: "bg-teal/10",
    phaseZh: "Phase 1 · 试点验证",
    phaseEn: "Phase 1 · Validation",
    progress: 30,
    flowsEmbedded: "1/2",
    cases: 2,
    efficiency: "+20%",
    targetL: "L3",
  },
  {
    nameZh: "数据分析AI化",
    nameEn: "Data Analytics AI",
    icon: BarChart3,
    color: "text-ocean-light",
    bg: "bg-ocean-light/10",
    phaseZh: "Phase 1 · 试点验证",
    phaseEn: "Phase 1 · Validation",
    progress: 25,
    flowsEmbedded: "0/2",
    cases: 2,
    efficiency: "+12%",
    targetL: "L3",
  },
];

export default function ControlTower() {
  const { t, lang } = useLanguage();
  const m = controlTowerMetrics;
  const dash = aiTransformationDashboard;

  // Department data for ranking
  const deptData = departmentCenters.map((d) => ({
    dept: d.zh,
    deptEn: d.en,
    penetration: d.penetration,
    efficiency: d.efficiency,
    cases: d.totalCases,
    isPilot: ["营销中心", "创意中心", "数据中心"].includes(d.zh),
  })).sort((a, b) => b.penetration - a.penetration);

  const caseOfWeek = enhancedCases.find((c) => c.caseOfWeek);
  const caseOfMonth = enhancedCases.find((c) => c.caseOfMonth);

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6 max-w-[1200px] mx-auto">
      {/* Hero */}
      <motion.div variants={item} className="relative rounded-2xl overflow-hidden h-[140px] lg:h-[170px]">
        <img
          src="https://d2xsxph8kpxj0f.cloudfront.net/310519663405149767/QM6nYWAxuWeZFy253dxUZB/control-tower-bg-CL2ZViHEqdaEvLNReAsV4q.webp"
          alt="Control Tower"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a1628]/90 via-[#0a1628]/70 to-[#0a1628]/40" />
        <div className="absolute inset-0 flex flex-col justify-center px-6 lg:px-10">
          <div className="flex items-center gap-2 mb-2">
            <BarChart3 size={16} className="text-teal-light" />
            <span className="text-teal-light text-[10px] font-semibold tracking-wider uppercase">
              AI Transformation Dashboard
            </span>
          </div>
          <h1 className="text-2xl lg:text-3xl font-extrabold text-white">
            {t("AI 指挥塔", "AI Control Tower")}
          </h1>
          <p className="text-white/60 text-xs mt-1">
            {t("管理层AI转型全局视图 · 目标：全中心L2 / 试点L3", "Executive AI overview · Target: All Centers L2 / Pilots L3")}
          </p>
        </div>
      </motion.div>

      {/* 4 Big Numbers */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: { zh: "AI案例数量", en: "AI Cases" }, value: dash.totalCases, sub: `+${dash.monthlyNewCases} ${t("本月", "this month")}`, icon: BookOpen, iconColor: "text-ocean-light", iconBg: "bg-ocean-light/10" },
          { label: { zh: "AI使用人数", en: "Active Users" }, value: dash.activeUsers, sub: `+32 ${t("本月", "this month")}`, icon: Users, iconColor: "text-teal", iconBg: "bg-teal/10" },
          { label: { zh: "效率提升", en: "Efficiency Gain" }, value: `+${dash.efficiencyGain}%`, sub: `+5% ${t("较上月", "vs last month")}`, icon: TrendingUp, iconColor: "text-coral", iconBg: "bg-coral/10" },
          { label: { zh: "AI成熟度", en: "AI Maturity" }, value: dash.avgMaturityLevel, sub: t("目标：全中心L2 / 试点L3", "Target: All L2 / Pilots L3"), icon: Layers, iconColor: "text-primary", iconBg: "bg-primary/10", noArrow: true },
        ].map((metric, i) => (
          <motion.div key={i} variants={item}>
            <Card className="border-0 shadow-sm overflow-hidden">
              <CardContent className="p-5 relative">
                <div className={`absolute top-3 right-3 p-1.5 rounded-lg ${metric.iconBg}`}>
                  <metric.icon size={16} className={metric.iconColor} />
                </div>
                <div className="text-[10px] text-muted-foreground mb-1 uppercase tracking-wider">{t(metric.label.zh, metric.label.en)}</div>
                <div className="text-3xl lg:text-4xl font-extrabold font-mono text-foreground tracking-tight">
                  {metric.value}
                </div>
                <div className={`flex items-center gap-1 mt-1.5 text-[10px] ${metric.noArrow ? "text-muted-foreground" : "text-success"}`}>
                  {!metric.noArrow && <ArrowUpRight size={12} />} {metric.sub}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* 1-3-6-9 Timeline */}
      <motion.div variants={item}>
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-extrabold flex items-center gap-2">
                <Calendar size={16} className="text-primary" />
                {t("1-3-6-9 项目里程碑", "1-3-6-9 Project Milestones")}
              </CardTitle>
              <Badge variant="secondary" className="text-[10px] bg-coral/10 text-coral border-0">
                {t("2026全年", "Full Year 2026")}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {timelinePhases.map((phase, i) => (
                <div
                  key={phase.id}
                  className={`relative p-4 rounded-xl border transition-all ${
                    phase.status === "current"
                      ? "border-primary/40 bg-primary/3 shadow-sm"
                      : "border-border/40 bg-card"
                  }`}
                >
                  {/* Status indicator */}
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                      {t(phase.monthZh, phase.monthEn)}
                    </span>
                    {phase.status === "current" ? (
                      <Badge variant="secondary" className="text-[9px] bg-primary/10 text-primary border-0">
                        <Clock size={9} className="mr-0.5" /> {t(phase.statusZh, phase.statusEn)}
                      </Badge>
                    ) : (
                      <span className="text-[9px] text-muted-foreground">{t(phase.statusZh, phase.statusEn)}</span>
                    )}
                  </div>
                  <h3 className="text-sm font-bold text-foreground mb-2">{t(phase.titleZh, phase.titleEn)}</h3>
                  <Progress value={phase.progress} className="h-1 mb-3" />
                  <div className="space-y-1.5">
                    {(lang === "zh" ? phase.milestonesZh : phase.milestonesEn).map((ms, j) => (
                      <div key={j} className="flex items-center gap-1.5 text-[11px]">
                        {phase.status === "current" && j < 2 ? (
                          <CheckCircle2 size={11} className="text-success shrink-0" />
                        ) : (
                          <div className="w-[11px] h-[11px] rounded-full border border-muted-foreground/30 shrink-0" />
                        )}
                        <span className={phase.status === "current" && j < 2 ? "text-foreground" : "text-muted-foreground"}>
                          {ms}
                        </span>
                      </div>
                    ))}
                  </div>
                  {/* Arrow connector (hidden on last) */}
                  {i < timelinePhases.length - 1 && (
                    <div className="hidden lg:block absolute -right-2.5 top-1/2 -translate-y-1/2 z-10">
                      <ArrowRight size={14} className="text-muted-foreground/30" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Three Pilot Projects */}
      <motion.div variants={item}>
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-extrabold flex items-center gap-2">
                <Target size={16} className="text-coral" />
                {t("三大公司级试点项目", "Three Company-Level Pilots")}
              </CardTitle>
              <span className="text-[10px] text-muted-foreground">
                {t("持续至12月底 · 目标 L3", "Through Dec · Target L3")}
              </span>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {pilotProjects.map((pilot) => (
                <div key={pilot.nameEn} className="p-4 rounded-xl border border-border/40 hover:shadow-sm transition-all">
                  <div className="flex items-center gap-2.5 mb-3">
                    <div className={`p-2 rounded-lg ${pilot.bg} shrink-0`}>
                      <pilot.icon size={16} className={pilot.color} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="text-sm font-bold text-foreground truncate">{t(pilot.nameZh, pilot.nameEn)}</h3>
                      <p className="text-[10px] text-muted-foreground">{t(pilot.phaseZh, pilot.phaseEn)}</p>
                    </div>
                    <Badge variant="secondary" className="text-[9px] bg-primary/10 text-primary border-0 shrink-0">
                      {pilot.targetL}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] text-muted-foreground">{t("进度", "Progress")}</span>
                    <span className="text-[10px] font-bold font-mono">{pilot.progress}%</span>
                  </div>
                  <Progress value={pilot.progress} className="h-1.5 mb-3" />
                  <div className="grid grid-cols-3 gap-2">
                    <div className="text-center p-2 rounded-lg bg-muted/30">
                      <div className="text-sm font-extrabold font-mono">{pilot.flowsEmbedded}</div>
                      <div className="text-[9px] text-muted-foreground">{t("流程嵌入", "Flows")}</div>
                    </div>
                    <div className="text-center p-2 rounded-lg bg-muted/30">
                      <div className="text-sm font-extrabold font-mono">{pilot.cases}</div>
                      <div className="text-[9px] text-muted-foreground">{t("案例", "Cases")}</div>
                    </div>
                    <div className="text-center p-2 rounded-lg bg-muted/30">
                      <div className="text-sm font-extrabold font-mono text-coral">{pilot.efficiency}</div>
                      <div className="text-[9px] text-muted-foreground">{t("效率", "Efficiency")}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Department Ranking + Maturity Map */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        {/* Department Penetration Ranking */}
        <motion.div variants={item} className="lg:col-span-3">
          <Card className="border-0 shadow-sm h-full">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-extrabold flex items-center gap-2">
                <Gauge size={16} className="text-teal" />
                {t("部门 AI 渗透率排名", "Department AI Penetration Ranking")}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {deptData.map((dept, i) => (
                  <div key={dept.dept} className="flex items-center gap-3">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 ${
                      i === 0 ? "bg-coral/15 text-coral" :
                      i === 1 ? "bg-teal/15 text-teal" :
                      i === 2 ? "bg-ocean-light/15 text-ocean-light" :
                      "bg-muted text-muted-foreground"
                    }`}>
                      {i + 1}
                    </div>
                    <div className="w-20 lg:w-28 shrink-0 flex items-center gap-1.5">
                      <div className="text-xs font-semibold truncate">{lang === "zh" ? dept.dept : dept.deptEn}</div>
                      {dept.isPilot && (
                        <Badge variant="secondary" className="text-[7px] px-1 py-0 bg-coral/10 text-coral border-0 shrink-0">
                          {t("试点", "Pilot")}
                        </Badge>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-2.5 bg-muted/50 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${dept.penetration}%` }}
                            transition={{ duration: 0.8, delay: i * 0.08 }}
                            className={`h-full rounded-full ${
                              dept.penetration >= 80 ? "bg-teal" :
                              dept.penetration >= 60 ? "bg-ocean-light" :
                              dept.penetration >= 40 ? "bg-warning" :
                              "bg-muted-foreground"
                            }`}
                          />
                        </div>
                        <span className="text-xs font-bold font-mono w-10 text-right">{dept.penetration}%</span>
                      </div>
                    </div>
                    <div className="hidden lg:flex items-center gap-3 shrink-0">
                      <div className="text-center w-12">
                        <div className="text-xs font-bold font-mono">{dept.cases}</div>
                        <div className="text-[8px] text-muted-foreground">{t("案例", "cases")}</div>
                      </div>
                      <div className="text-center w-12">
                        <div className="text-xs font-bold font-mono text-coral">{dept.efficiency}%</div>
                        <div className="text-[8px] text-muted-foreground">{t("效率", "eff.")}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Maturity Map with L2/L3 targets */}
        <motion.div variants={item} className="lg:col-span-2">
          <Card className="border-0 shadow-sm h-full">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-extrabold flex items-center gap-2">
                <Layers size={16} className="text-primary" />
                {t("AI 成熟度地图", "AI Maturity Map")}
              </CardTitle>
              <p className="text-[10px] text-muted-foreground mt-1">
                {t("全中心目标 L2 · 试点目标 L3", "All Centers → L2 · Pilots → L3")}
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-2.5">
                {departmentMaturityMap.map((dept) => {
                  const levelInfo = maturityLevels[dept.level];
                  const isPilot = ["营销中心", "创意中心", "数据中心"].includes(dept.departmentZh);
                  const targetLevel = isPilot ? "L3" : "L2";
                  return (
                    <div key={dept.departmentEn} className="flex items-center gap-2">
                      <div className="w-20 lg:w-24 shrink-0 flex items-center gap-1">
                        <div className="text-[11px] font-semibold truncate">{t(dept.departmentZh, dept.departmentEn)}</div>
                      </div>
                      <span className={`shrink-0 px-1.5 py-0.5 rounded text-[9px] font-bold ${levelInfo.bgColor} ${levelInfo.color}`}>
                        {dept.level}
                      </span>
                      <div className="flex-1">
                        <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${(dept.score / 5) * 100}%` }}
                            transition={{ duration: 0.8 }}
                            className="h-full rounded-full"
                            style={{
                              background: dept.score >= 3 ? "var(--color-teal)" : dept.score >= 2 ? "var(--color-ocean-light)" : "var(--color-warning)",
                            }}
                          />
                        </div>
                      </div>
                      <span className="text-[9px] font-mono w-6 text-right">{dept.score.toFixed(1)}</span>
                      <span className={`text-[8px] font-bold w-5 ${isPilot ? "text-coral" : "text-muted-foreground"}`}>
                        →{targetLevel}
                      </span>
                    </div>
                  );
                })}
              </div>
              {/* Legend */}
              <div className="mt-4 pt-3 border-t border-border/30">
                <div className="grid grid-cols-5 gap-1">
                  {(Object.entries(maturityLevels) as [MaturityLevel, typeof maturityLevels[MaturityLevel]][]).map(([level, info]) => (
                    <div key={level} className="text-center">
                      <div className={`text-[9px] font-bold ${info.color}`}>{level}</div>
                      <div className="text-[8px] text-muted-foreground leading-tight">{t(info.zh, info.en)}</div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Case of Week / Month */}
      {(caseOfWeek || caseOfMonth) && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {caseOfWeek && (
            <motion.div variants={item}>
              <Card className="border-0 shadow-sm bg-gradient-to-br from-coral/5 to-white">
                <CardContent className="p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <Trophy size={16} className="text-coral" />
                    <span className="text-xs font-bold text-coral">{t("本周最佳案例", "Case of the Week")}</span>
                  </div>
                  <h3 className="text-sm font-bold text-foreground mb-1">{t(caseOfWeek.titleZh, caseOfWeek.titleEn)}</h3>
                  <p className="text-xs text-coral font-medium">{t(caseOfWeek.oneLinerZh, caseOfWeek.oneLinerEn)}</p>
                  <div className="flex items-center gap-2 mt-2 text-[10px] text-muted-foreground">
                    <span>{caseOfWeek.team}</span>
                    <span>·</span>
                    <span>{caseOfWeek.tools[0]}</span>
                    <span>·</span>
                    <span className="font-bold text-coral">{caseOfWeek.efficiencyGain} {t("效率提升", "efficiency gain")}</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
          {caseOfMonth && (
            <motion.div variants={item}>
              <Card className="border-0 shadow-sm bg-gradient-to-br from-primary/5 to-white">
                <CardContent className="p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <Award size={16} className="text-primary" />
                    <span className="text-xs font-bold text-primary">{t("本月最佳案例", "Case of the Month")}</span>
                  </div>
                  <h3 className="text-sm font-bold text-foreground mb-1">{t(caseOfMonth.titleZh, caseOfMonth.titleEn)}</h3>
                  <p className="text-xs text-primary font-medium">{t(caseOfMonth.oneLinerZh, caseOfMonth.oneLinerEn)}</p>
                  <div className="flex items-center gap-2 mt-2 text-[10px] text-muted-foreground">
                    <span>{caseOfMonth.team}</span>
                    <span>·</span>
                    <span>{caseOfMonth.tools[0]}</span>
                    <span>·</span>
                    <span className="font-bold text-primary">{caseOfMonth.efficiencyGain} {t("效率提升", "efficiency gain")}</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </div>
      )}

      {/* Trend Chart */}
      <motion.div variants={item}>
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-extrabold">{t("月度趋势", "Monthly Trend")}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[240px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={m.monthlyTrend}>
                  <defs>
                    <linearGradient id="ctPen" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.25} />
                      <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="ctEff" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ff6b35" stopOpacity={0.25} />
                      <stop offset="95%" stopColor="#ff6b35" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip contentStyle={{ borderRadius: "12px", border: "none", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }} />
                  <Legend />
                  <Area type="monotone" dataKey="penetration" name={t("渗透率%", "Penetration%")} stroke="#0ea5e9" fill="url(#ctPen)" strokeWidth={2.5} />
                  <Area type="monotone" dataKey="efficiency" name={t("效率提升%", "Efficiency%")} stroke="#ff6b35" fill="url(#ctEff)" strokeWidth={2.5} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Quick stats row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { icon: Lightbulb, iconColor: "text-warning", value: m.totalWishes, label: { zh: "许愿总数", en: "Total Wishes" }, sub: `${Math.round((m.solvedWishes / m.totalWishes) * 100)}% ${t("已解决", "resolved")}`, subColor: "text-success" },
          { icon: Trophy, iconColor: "text-coral", value: m.activeChallenges, label: { zh: "活跃挑战", en: "Active Challenges" }, sub: "", subColor: "" },
          { icon: GitBranch, iconColor: "text-primary", value: m.totalSkillUnlocks, label: { zh: "技能解锁", en: "Skill Unlocks" }, sub: t("双周一技能", "Bi-weekly"), subColor: "text-muted-foreground" },
          { icon: Target, iconColor: "text-teal", value: dash.weeklyNewCases, label: { zh: "本周新案例", en: "New Cases This Week" }, sub: "", subColor: "" },
        ].map((stat, i) => (
          <motion.div key={i} variants={item}>
            <Card className="border-0 shadow-sm">
              <CardContent className="p-4 text-center">
                <stat.icon size={16} className={`${stat.iconColor} mx-auto mb-1.5`} />
                <div className="text-lg font-extrabold font-mono">{stat.value}</div>
                <div className="text-[10px] text-muted-foreground">{t(stat.label.zh, stat.label.en)}</div>
                {stat.sub && <div className={`text-[10px] ${stat.subColor} mt-0.5`}>{stat.sub}</div>}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
