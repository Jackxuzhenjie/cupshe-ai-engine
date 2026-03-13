/*
 * ControlTower — Executive dashboard for CEO/CTO/PMO
 * Design: Data-rich dashboard with charts and department comparison
 */
import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";
import { Gauge, TrendingUp, Target, Lightbulb, Trophy, BookOpen, GitBranch, BarChart3 } from "lucide-react";
import { controlTowerMetrics } from "@/lib/data";
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar,
} from "recharts";

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.06 } } };
const item = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } };

export default function ControlTower() {
  const { t, lang } = useLanguage();
  const m = controlTowerMetrics;

  const topMetrics = [
    { zh: "AI渗透率", en: "AI Penetration", value: `${m.overallPenetration}%`, icon: <Gauge size={20} />, color: "text-teal", bg: "bg-teal/10" },
    { zh: "效率提升", en: "Efficiency Gain", value: `${m.overallEfficiency}%`, icon: <TrendingUp size={20} />, color: "text-coral", bg: "bg-coral/10" },
    { zh: "AI案例", en: "AI Cases", value: m.totalCases.toString(), icon: <BookOpen size={20} />, color: "text-ocean-light", bg: "bg-ocean-light/10" },
    { zh: "许愿解决率", en: "Wish Resolution", value: `${Math.round((m.solvedWishes / m.totalWishes) * 100)}%`, icon: <Lightbulb size={20} />, color: "text-warning", bg: "bg-warning/10" },
    { zh: "活跃挑战", en: "Active Challenges", value: m.activeChallenges.toString(), icon: <Trophy size={20} />, color: "text-success", bg: "bg-success/10" },
    { zh: "技能解锁", en: "Skill Unlocks", value: m.totalSkillUnlocks.toString(), icon: <GitBranch size={20} />, color: "text-primary", bg: "bg-primary/10" },
  ];

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6 max-w-[1400px] mx-auto">
      {/* Hero */}
      <motion.div variants={item} className="relative rounded-2xl overflow-hidden h-[160px] lg:h-[200px]">
        <img
          src="https://d2xsxph8kpxj0f.cloudfront.net/310519663405149767/QM6nYWAxuWeZFy253dxUZB/control-tower-bg-CL2ZViHEqdaEvLNReAsV4q.webp"
          alt="Control Tower"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a1628]/90 via-[#0a1628]/60 to-transparent" />
        <div className="absolute inset-0 flex flex-col justify-center px-6 lg:px-10">
          <div className="flex items-center gap-2 mb-2">
            <BarChart3 size={18} className="text-teal-light" />
            <span className="text-teal-light text-xs font-semibold tracking-wider uppercase">
              Executive Dashboard
            </span>
          </div>
          <h1 className="text-2xl lg:text-3xl font-extrabold text-white mb-1">
            {t("AI 指挥塔", "AI Control Tower")}
          </h1>
          <p className="text-white/70 text-sm max-w-md">
            {t("AI转型全局数据视图，支持部门对比与趋势分析", "Global AI transformation data view with department comparison and trend analysis")}
          </p>
        </div>
      </motion.div>

      {/* Top Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3">
        {topMetrics.map((metric, i) => (
          <motion.div key={i} variants={item}>
            <Card className="border-0 shadow-sm">
              <CardContent className="p-4 text-center">
                <div className={`inline-flex p-2 rounded-xl ${metric.bg} mb-2`}>
                  <span className={metric.color}>{metric.icon}</span>
                </div>
                <div className="text-2xl font-extrabold font-mono text-foreground">{metric.value}</div>
                <div className="text-[11px] text-muted-foreground">{t(metric.zh, metric.en)}</div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Trend Chart */}
        <motion.div variants={item}>
          <Card className="border-0 shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">{t("月度趋势", "Monthly Trend")}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[280px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={m.monthlyTrend}>
                    <defs>
                      <linearGradient id="colorPen" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="colorEff" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#ff6b35" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#ff6b35" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                    <YAxis tick={{ fontSize: 12 }} />
                    <Tooltip
                      contentStyle={{ borderRadius: "12px", border: "none", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
                    />
                    <Legend />
                    <Area
                      type="monotone"
                      dataKey="penetration"
                      name={t("渗透率%", "Penetration%")}
                      stroke="#0ea5e9"
                      fill="url(#colorPen)"
                      strokeWidth={2}
                    />
                    <Area
                      type="monotone"
                      dataKey="efficiency"
                      name={t("效率提升%", "Efficiency%")}
                      stroke="#ff6b35"
                      fill="url(#colorEff)"
                      strokeWidth={2}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Department Comparison Bar */}
        <motion.div variants={item}>
          <Card className="border-0 shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">{t("部门对比", "Department Comparison")}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[280px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={m.departmentComparison} layout="vertical" margin={{ left: 10 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis type="number" tick={{ fontSize: 11 }} />
                    <YAxis
                      dataKey={lang === "zh" ? "dept" : "deptEn"}
                      type="category"
                      tick={{ fontSize: 11 }}
                      width={50}
                    />
                    <Tooltip
                      contentStyle={{ borderRadius: "12px", border: "none", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
                    />
                    <Legend />
                    <Bar dataKey="penetration" name={t("渗透率", "Penetration")} fill="#0ea5e9" radius={[0, 4, 4, 0]} />
                    <Bar dataKey="efficiency" name={t("效率提升", "Efficiency")} fill="#ff6b35" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Department Detail Table */}
      <motion.div variants={item}>
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">{t("部门详细数据", "Department Details")}</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border/50">
                    <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground">{t("部门", "Department")}</th>
                    <th className="text-center px-3 py-3 text-xs font-semibold text-muted-foreground">{t("渗透率", "Penetration")}</th>
                    <th className="text-center px-3 py-3 text-xs font-semibold text-muted-foreground">{t("效率提升", "Efficiency")}</th>
                    <th className="text-center px-3 py-3 text-xs font-semibold text-muted-foreground">{t("案例数", "Cases")}</th>
                    <th className="text-center px-3 py-3 text-xs font-semibold text-muted-foreground hidden sm:table-cell">{t("进度", "Progress")}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/30">
                  {m.departmentComparison.map((dept) => (
                    <tr key={dept.dept} className="hover:bg-muted/20 transition-colors">
                      <td className="px-5 py-3 font-medium">{lang === "zh" ? dept.dept : dept.deptEn}</td>
                      <td className="text-center px-3 py-3 font-mono">{dept.penetration}%</td>
                      <td className="text-center px-3 py-3 font-mono">{dept.efficiency}%</td>
                      <td className="text-center px-3 py-3 font-mono">{dept.cases}</td>
                      <td className="px-3 py-3 hidden sm:table-cell">
                        <Progress value={dept.penetration} className="h-1.5 w-24 mx-auto" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Wishes status */}
      <motion.div variants={item}>
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">{t("许愿池概览", "Wish Pool Overview")}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 rounded-xl bg-muted/30 text-center">
                <div className="text-2xl font-extrabold font-mono text-foreground">{m.totalWishes}</div>
                <div className="text-xs text-muted-foreground">{t("总许愿数", "Total Wishes")}</div>
              </div>
              <div className="p-4 rounded-xl bg-success/5 text-center">
                <div className="text-2xl font-extrabold font-mono text-success">{m.solvedWishes}</div>
                <div className="text-xs text-muted-foreground">{t("已解决", "Solved")}</div>
              </div>
              <div className="p-4 rounded-xl bg-warning/5 text-center">
                <div className="text-2xl font-extrabold font-mono text-warning">{m.totalWishes - m.solvedWishes}</div>
                <div className="text-xs text-muted-foreground">{t("待解决", "Open")}</div>
              </div>
              <div className="p-4 rounded-xl bg-primary/5 text-center">
                <div className="text-2xl font-extrabold font-mono text-primary">{Math.round((m.solvedWishes / m.totalWishes) * 100)}%</div>
                <div className="text-xs text-muted-foreground">{t("解决率", "Resolution Rate")}</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}
