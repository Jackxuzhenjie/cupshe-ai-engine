/*
 * ControlTower — CEO-friendly executive dashboard
 * Design: Extremely simple, clean, at-a-glance metrics
 * Includes: AI Transformation Dashboard with maturity score, active users, department map
 * CEO只看 Control Tower，必须非常简单
 */
import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";
import { Gauge, TrendingUp, BookOpen, Lightbulb, Trophy, GitBranch, BarChart3, ArrowUpRight, Users, Layers, Target, Award } from "lucide-react";
import { controlTowerMetrics, departmentCenters } from "@/lib/data";
import { aiTransformationDashboard, departmentMaturityMap, maturityLevels, enhancedCases, type MaturityLevel } from "@/lib/caseData";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from "recharts";

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.08 } } };
const item = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } };

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
    members: `${d.activeMembers}/${d.totalMembers}`,
  })).sort((a, b) => b.penetration - a.penetration);

  // Case of week/month
  const caseOfWeek = enhancedCases.find((c) => c.caseOfWeek);
  const caseOfMonth = enhancedCases.find((c) => c.caseOfMonth);

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6 max-w-[1200px] mx-auto">
      {/* Hero - Minimal */}
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
            {t("管理层每月AI转型全局视图", "Monthly AI transformation executive overview")}
          </p>
        </div>
      </motion.div>

      {/* 4 Big Numbers - AI Transformation Dashboard */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <motion.div variants={item}>
          <Card className="border-0 shadow-sm overflow-hidden">
            <CardContent className="p-5 relative">
              <div className="absolute top-3 right-3 p-1.5 rounded-lg bg-ocean-light/10">
                <BookOpen size={16} className="text-ocean-light" />
              </div>
              <div className="text-[10px] text-muted-foreground mb-1 uppercase tracking-wider">{t("AI案例数量", "AI Cases")}</div>
              <div className="text-3xl lg:text-4xl font-extrabold font-mono text-foreground tracking-tight">
                {dash.totalCases}
              </div>
              <div className="flex items-center gap-1 mt-1.5 text-[10px] text-success">
                <ArrowUpRight size={12} /> +{dash.monthlyNewCases} {t("本月", "this month")}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={item}>
          <Card className="border-0 shadow-sm overflow-hidden">
            <CardContent className="p-5 relative">
              <div className="absolute top-3 right-3 p-1.5 rounded-lg bg-teal/10">
                <Users size={16} className="text-teal" />
              </div>
              <div className="text-[10px] text-muted-foreground mb-1 uppercase tracking-wider">{t("AI使用人数", "Active Users")}</div>
              <div className="text-3xl lg:text-4xl font-extrabold font-mono text-foreground tracking-tight">
                {dash.activeUsers}
              </div>
              <div className="flex items-center gap-1 mt-1.5 text-[10px] text-success">
                <ArrowUpRight size={12} /> +32 {t("本月", "this month")}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={item}>
          <Card className="border-0 shadow-sm overflow-hidden">
            <CardContent className="p-5 relative">
              <div className="absolute top-3 right-3 p-1.5 rounded-lg bg-coral/10">
                <TrendingUp size={16} className="text-coral" />
              </div>
              <div className="text-[10px] text-muted-foreground mb-1 uppercase tracking-wider">{t("效率提升", "Efficiency Gain")}</div>
              <div className="text-3xl lg:text-4xl font-extrabold font-mono text-foreground tracking-tight">
                +{dash.efficiencyGain}%
              </div>
              <div className="flex items-center gap-1 mt-1.5 text-[10px] text-success">
                <ArrowUpRight size={12} /> +5% {t("较上月", "vs last month")}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={item}>
          <Card className="border-0 shadow-sm overflow-hidden">
            <CardContent className="p-5 relative">
              <div className="absolute top-3 right-3 p-1.5 rounded-lg bg-primary/10">
                <Layers size={16} className="text-primary" />
              </div>
              <div className="text-[10px] text-muted-foreground mb-1 uppercase tracking-wider">{t("AI成熟度", "AI Maturity")}</div>
              <div className="text-3xl lg:text-4xl font-extrabold font-mono text-foreground tracking-tight">
                {dash.avgMaturityLevel}
              </div>
              <div className="flex items-center gap-1 mt-1.5 text-[10px] text-muted-foreground">
                {t("团队效率阶段", "Team Efficiency Stage")}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* AI Penetration + Department Maturity Map */}
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
                    <div className="w-20 lg:w-28 shrink-0">
                      <div className="text-xs font-semibold truncate">{lang === "zh" ? dept.dept : dept.deptEn}</div>
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

        {/* Department Maturity Map */}
        <motion.div variants={item} className="lg:col-span-2">
          <Card className="border-0 shadow-sm h-full">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-extrabold flex items-center gap-2">
                <Layers size={16} className="text-primary" />
                {t("AI 成熟度地图", "AI Maturity Map")}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2.5">
                {departmentMaturityMap.map((dept) => {
                  const levelInfo = maturityLevels[dept.level];
                  return (
                    <div key={dept.departmentEn} className="flex items-center gap-2">
                      <div className="w-20 lg:w-24 shrink-0">
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
                              background: dept.score >= 3 ? "var(--color-teal)" : dept.score >= 2 ? "var(--color-ocean-light)" : "var(--color-coral)",
                            }}
                          />
                        </div>
                      </div>
                      <span className="text-[10px] font-bold font-mono w-6 text-right">{dept.score.toFixed(1)}</span>
                    </div>
                  );
                })}
              </div>

              {/* Maturity Legend */}
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
        <motion.div variants={item}>
          <Card className="border-0 shadow-sm">
            <CardContent className="p-4 text-center">
              <Lightbulb size={16} className="text-warning mx-auto mb-1.5" />
              <div className="text-lg font-extrabold font-mono">{m.totalWishes}</div>
              <div className="text-[10px] text-muted-foreground">{t("许愿总数", "Total Wishes")}</div>
              <div className="text-[10px] text-success mt-0.5">{Math.round((m.solvedWishes / m.totalWishes) * 100)}% {t("已解决", "resolved")}</div>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div variants={item}>
          <Card className="border-0 shadow-sm">
            <CardContent className="p-4 text-center">
              <Trophy size={16} className="text-coral mx-auto mb-1.5" />
              <div className="text-lg font-extrabold font-mono">{m.activeChallenges}</div>
              <div className="text-[10px] text-muted-foreground">{t("活跃挑战", "Active Challenges")}</div>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div variants={item}>
          <Card className="border-0 shadow-sm">
            <CardContent className="p-4 text-center">
              <GitBranch size={16} className="text-primary mx-auto mb-1.5" />
              <div className="text-lg font-extrabold font-mono">{m.totalSkillUnlocks}</div>
              <div className="text-[10px] text-muted-foreground">{t("技能解锁", "Skill Unlocks")}</div>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div variants={item}>
          <Card className="border-0 shadow-sm">
            <CardContent className="p-4 text-center">
              <Target size={16} className="text-teal mx-auto mb-1.5" />
              <div className="text-lg font-extrabold font-mono">{dash.weeklyNewCases}</div>
              <div className="text-[10px] text-muted-foreground">{t("本周新案例", "New Cases This Week")}</div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
}
