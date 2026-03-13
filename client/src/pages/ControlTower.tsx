/*
 * ControlTower — CEO-friendly executive dashboard
 * Design: Extremely simple, clean, at-a-glance metrics
 * CEO只看 Control Tower，必须非常简单
 */
import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";
import { Gauge, TrendingUp, BookOpen, Lightbulb, Trophy, GitBranch, BarChart3, ArrowUpRight } from "lucide-react";
import { controlTowerMetrics, departmentCenters } from "@/lib/data";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
  AreaChart, Area,
} from "recharts";

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.08 } } };
const item = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } };

export default function ControlTower() {
  const { t, lang } = useLanguage();
  const m = controlTowerMetrics;

  // Use departmentCenters data for richer department view
  const deptData = departmentCenters.map((d) => ({
    dept: d.zh,
    deptEn: d.en,
    penetration: d.penetration,
    efficiency: d.efficiency,
    cases: d.totalCases,
    members: `${d.activeMembers}/${d.totalMembers}`,
  })).sort((a, b) => b.penetration - a.penetration);

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
              CEO Dashboard
            </span>
          </div>
          <h1 className="text-2xl lg:text-3xl font-extrabold text-white">
            {t("AI 指挥塔", "AI Control Tower")}
          </h1>
          <p className="text-white/60 text-xs mt-1">
            {t("一目了然的AI转型全局视图", "At-a-glance AI transformation overview")}
          </p>
        </div>
      </motion.div>

      {/* 3 Big Numbers - The most important metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <motion.div variants={item}>
          <Card className="border-0 shadow-sm overflow-hidden">
            <CardContent className="p-6 relative">
              <div className="absolute top-4 right-4 p-2 rounded-xl bg-teal/10">
                <Gauge size={20} className="text-teal" />
              </div>
              <div className="text-xs text-muted-foreground mb-1">{t("全公司 AI 渗透率", "Company-wide AI Penetration")}</div>
              <div className="text-4xl lg:text-5xl font-extrabold font-mono text-foreground tracking-tight">
                {m.overallPenetration}%
              </div>
              <div className="flex items-center gap-1 mt-2 text-xs text-success">
                <ArrowUpRight size={14} /> +8% {t("较上月", "vs last month")}
              </div>
              <Progress value={m.overallPenetration} className="h-2 mt-3" />
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={item}>
          <Card className="border-0 shadow-sm overflow-hidden">
            <CardContent className="p-6 relative">
              <div className="absolute top-4 right-4 p-2 rounded-xl bg-coral/10">
                <TrendingUp size={20} className="text-coral" />
              </div>
              <div className="text-xs text-muted-foreground mb-1">{t("整体效率提升", "Overall Efficiency Gain")}</div>
              <div className="text-4xl lg:text-5xl font-extrabold font-mono text-foreground tracking-tight">
                {m.overallEfficiency}%
              </div>
              <div className="flex items-center gap-1 mt-2 text-xs text-success">
                <ArrowUpRight size={14} /> +5% {t("较上月", "vs last month")}
              </div>
              <Progress value={m.overallEfficiency} className="h-2 mt-3" />
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={item}>
          <Card className="border-0 shadow-sm overflow-hidden">
            <CardContent className="p-6 relative">
              <div className="absolute top-4 right-4 p-2 rounded-xl bg-ocean-light/10">
                <BookOpen size={20} className="text-ocean-light" />
              </div>
              <div className="text-xs text-muted-foreground mb-1">{t("AI 案例总数", "Total AI Cases")}</div>
              <div className="text-4xl lg:text-5xl font-extrabold font-mono text-foreground tracking-tight">
                {m.totalCases}
              </div>
              <div className="flex items-center gap-1 mt-2 text-xs text-success">
                <ArrowUpRight size={14} /> +12 {t("本月新增", "new this month")}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Department Ranking - The CEO cares most about this */}
      <motion.div variants={item}>
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-extrabold">{t("部门 AI 渗透率排名", "Department AI Penetration Ranking")}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {deptData.map((dept, i) => (
                <div key={dept.dept} className="flex items-center gap-4">
                  {/* Rank */}
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                    i === 0 ? "bg-coral/15 text-coral" :
                    i === 1 ? "bg-teal/15 text-teal" :
                    i === 2 ? "bg-ocean-light/15 text-ocean-light" :
                    "bg-muted text-muted-foreground"
                  }`}>
                    {i + 1}
                  </div>

                  {/* Department name */}
                  <div className="w-28 lg:w-36 shrink-0">
                    <div className="text-sm font-semibold">{lang === "zh" ? dept.dept : dept.deptEn}</div>
                    <div className="text-[10px] text-muted-foreground">{dept.members} {t("活跃", "active")}</div>
                  </div>

                  {/* Progress bar */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <div className="flex-1 h-3 bg-muted/50 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${dept.penetration}%` }}
                          transition={{ duration: 0.8, delay: i * 0.1 }}
                          className={`h-full rounded-full ${
                            dept.penetration >= 80 ? "bg-teal" :
                            dept.penetration >= 60 ? "bg-ocean-light" :
                            dept.penetration >= 40 ? "bg-warning" :
                            "bg-muted-foreground"
                          }`}
                        />
                      </div>
                      <span className="text-sm font-bold font-mono w-12 text-right">{dept.penetration}%</span>
                    </div>
                  </div>

                  {/* Cases */}
                  <div className="hidden lg:block text-center w-16 shrink-0">
                    <div className="text-sm font-bold font-mono">{dept.cases}</div>
                    <div className="text-[9px] text-muted-foreground">{t("案例", "cases")}</div>
                  </div>

                  {/* Efficiency */}
                  <div className="hidden lg:block text-center w-16 shrink-0">
                    <div className="text-sm font-bold font-mono text-coral">{dept.efficiency}%</div>
                    <div className="text-[9px] text-muted-foreground">{t("效率", "efficiency")}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Trend Chart */}
      <motion.div variants={item}>
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">{t("月度趋势", "Monthly Trend")}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[260px]">
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
                  <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
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
              <Lightbulb size={18} className="text-warning mx-auto mb-2" />
              <div className="text-xl font-extrabold font-mono">{m.totalWishes}</div>
              <div className="text-[10px] text-muted-foreground">{t("许愿总数", "Total Wishes")}</div>
              <div className="text-[10px] text-success mt-1">{Math.round((m.solvedWishes / m.totalWishes) * 100)}% {t("已解决", "resolved")}</div>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div variants={item}>
          <Card className="border-0 shadow-sm">
            <CardContent className="p-4 text-center">
              <Trophy size={18} className="text-coral mx-auto mb-2" />
              <div className="text-xl font-extrabold font-mono">{m.activeChallenges}</div>
              <div className="text-[10px] text-muted-foreground">{t("活跃挑战", "Active Challenges")}</div>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div variants={item}>
          <Card className="border-0 shadow-sm">
            <CardContent className="p-4 text-center">
              <GitBranch size={18} className="text-primary mx-auto mb-2" />
              <div className="text-xl font-extrabold font-mono">{m.totalSkillUnlocks}</div>
              <div className="text-[10px] text-muted-foreground">{t("技能解锁", "Skill Unlocks")}</div>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div variants={item}>
          <Card className="border-0 shadow-sm">
            <CardContent className="p-4 text-center">
              <Gauge size={18} className="text-teal mx-auto mb-2" />
              <div className="text-xl font-extrabold font-mono">{departmentCenters.length}</div>
              <div className="text-[10px] text-muted-foreground">{t("参与部门", "Departments")}</div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
}
