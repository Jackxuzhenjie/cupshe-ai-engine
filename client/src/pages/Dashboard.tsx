/*
 * Dashboard — Weekly AI transformation snapshot
 * Design: Warm Professional, Bento Grid layout
 * Hero banner with gradient overlay, KPI cards with sparklines, quick links
 */
import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Link } from "wouter";
import { motion } from "framer-motion";
import {
  TrendingUp,
  Zap,
  FileText,
  Users,
  ArrowUpRight,
  Newspaper,
  Lightbulb,
  Trophy,
  Medal,
  BookOpen,
  Sparkles,
  Target,
} from "lucide-react";
import { kpiData, newsletterIssues, wishes, challenges, aiCases } from "@/lib/data";

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06 } },
};
const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

export default function Dashboard() {
  const { t } = useLanguage();

  const kpis = [
    {
      titleZh: "AI渗透率",
      titleEn: "AI Penetration",
      value: `${kpiData.aiPenetration.value}%`,
      change: `+${kpiData.aiPenetration.change}%`,
      target: (kpiData.aiPenetration.value / kpiData.aiPenetration.target) * 100,
      icon: <Zap size={20} />,
      color: "text-teal",
      bg: "bg-teal/10",
    },
    {
      titleZh: "效率提升",
      titleEn: "Efficiency Gain",
      value: `${kpiData.efficiencyImprovement.value}%`,
      change: `+${kpiData.efficiencyImprovement.change}%`,
      target: (kpiData.efficiencyImprovement.value / kpiData.efficiencyImprovement.target) * 100,
      icon: <TrendingUp size={20} />,
      color: "text-coral",
      bg: "bg-coral/10",
    },
    {
      titleZh: "AI案例数",
      titleEn: "AI Cases",
      value: kpiData.aiCasesCount.value.toString(),
      change: `+${kpiData.aiCasesCount.change}`,
      target: (kpiData.aiCasesCount.value / kpiData.aiCasesCount.target) * 100,
      icon: <FileText size={20} />,
      color: "text-ocean-light",
      bg: "bg-ocean-light/10",
    },
    {
      titleZh: "挑战参与率",
      titleEn: "Challenge Rate",
      value: `${kpiData.challengeParticipation.value}%`,
      change: `+${kpiData.challengeParticipation.change}%`,
      target: (kpiData.challengeParticipation.value / kpiData.challengeParticipation.target) * 100,
      icon: <Users size={20} />,
      color: "text-success",
      bg: "bg-success/10",
    },
  ];

  const quickLinks = [
    { href: "/newsletter", icon: <Newspaper size={18} />, zh: "最新周刊", en: "Latest Newsletter", desc: newsletterIssues[0]?.titleZh || "" },
    { href: "/wishes", icon: <Lightbulb size={18} />, zh: `${kpiData.openWishes}个待处理`, en: `${kpiData.openWishes} Open Wishes`, desc: t("查看许愿池", "View Wish Pool") },
    { href: "/challenges", icon: <Trophy size={18} />, zh: `${kpiData.activeChallenges}个进行中`, en: `${kpiData.activeChallenges} Active`, desc: t("查看挑战", "View Challenges") },
    { href: "/leaderboard", icon: <Medal size={18} />, zh: "积分排行", en: "Leaderboard", desc: t("查看排名", "View Rankings") },
    { href: "/cases", icon: <BookOpen size={18} />, zh: "最新案例", en: "Latest Cases", desc: t("查看案例库", "View Cases") },
    { href: "/skills", icon: <Target size={18} />, zh: "技能解锁", en: "Skill Unlock", desc: `${kpiData.skillUnlockRate}% ${t("完成率", "completion")}` },
  ];

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6 max-w-[1400px] mx-auto">
      {/* Hero Banner */}
      <motion.div variants={item} className="relative rounded-2xl overflow-hidden h-[180px] lg:h-[220px]">
        <img
          src="https://d2xsxph8kpxj0f.cloudfront.net/310519663405149767/QM6nYWAxuWeZFy253dxUZB/hero-banner-Z6oikJZ7qQ6tHswxrLteuH.webp"
          alt="AI Transformation"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1e3a5f]/85 via-[#1e3a5f]/60 to-transparent" />
        <div className="absolute inset-0 flex flex-col justify-center px-6 lg:px-10">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles size={16} className="text-coral-light" />
            <span className="text-coral-light text-xs font-semibold tracking-wider uppercase">
              {t("AI转型引擎", "AI Transformation Engine")}
            </span>
          </div>
          <h1 className="text-2xl lg:text-3xl font-extrabold text-white leading-tight mb-2">
            {t("CUPSHE AI 转型周报", "CUPSHE AI Weekly Snapshot")}
          </h1>
          <p className="text-white/80 text-sm lg:text-base max-w-lg">
            {t(
              "第12周 · AI渗透率67% · 本周新增23个案例 · 8个挑战进行中",
              "Week 12 · 67% AI Penetration · 23 New Cases · 8 Active Challenges"
            )}
          </p>
        </div>
      </motion.div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
        {kpis.map((kpi, i) => (
          <motion.div key={i} variants={item}>
            <Card className="card-hover border-0 shadow-sm">
              <CardContent className="p-4 lg:p-5">
                <div className="flex items-start justify-between mb-3">
                  <div className={`p-2 rounded-xl ${kpi.bg}`}>
                    <span className={kpi.color}>{kpi.icon}</span>
                  </div>
                  <Badge variant="secondary" className="text-[10px] font-semibold text-success bg-success/10 border-0">
                    {kpi.change}
                  </Badge>
                </div>
                <div className="text-2xl lg:text-3xl font-extrabold text-foreground mb-1 font-mono tracking-tight">
                  {kpi.value}
                </div>
                <div className="text-xs text-muted-foreground mb-2">
                  {t(kpi.titleZh, kpi.titleEn)}
                </div>
                <Progress value={kpi.target} className="h-1.5" />
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Quick Links + Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Quick Links */}
        <motion.div variants={item} className="lg:col-span-2">
          <Card className="border-0 shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-bold">
                {t("快速入口", "Quick Access")}
              </CardTitle>
            </CardHeader>
            <CardContent className="pb-4">
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-2.5">
                {quickLinks.map((link, i) => (
                  <Link key={i} href={link.href}>
                    <div className="group flex items-start gap-3 p-3 rounded-xl hover:bg-muted/60 transition-all duration-200">
                      <div className="p-2 rounded-lg bg-primary/8 text-primary shrink-0 group-hover:bg-primary/15 transition-colors">
                        {link.icon}
                      </div>
                      <div className="min-w-0">
                        <div className="text-sm font-semibold text-foreground flex items-center gap-1">
                          {t(link.zh, link.en)}
                          <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity text-primary" />
                        </div>
                        <div className="text-xs text-muted-foreground truncate mt-0.5">
                          {link.desc}
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Latest Activity */}
        <motion.div variants={item}>
          <Card className="border-0 shadow-sm h-full">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-bold">
                {t("最新动态", "Recent Activity")}
              </CardTitle>
            </CardHeader>
            <CardContent className="pb-4 space-y-3">
              {[
                { time: "2h", zh: "张明提交了新AI案例「广告ROI优化」", en: "Zhang Ming submitted new case 'Ad ROI Optimization'", type: "case" },
                { time: "4h", zh: "Prompt优化大赛进入评审阶段", en: "Prompt Optimization Contest enters review phase", type: "challenge" },
                { time: "6h", zh: "李芳完成了「AI数据分析」技能解锁", en: "Li Fang unlocked 'AI Data Analysis' skill", type: "skill" },
                { time: "8h", zh: "新许愿：AI辅助面料选择", en: "New wish: AI-assisted Fabric Selection", type: "wish" },
                { time: "1d", zh: "第12期AI周刊已发布", en: "AI Weekly Issue 12 published", type: "newsletter" },
              ].map((activity, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm text-foreground leading-snug">
                      {t(activity.zh, activity.en)}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">{activity.time} {t("前", "ago")}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Featured Cases Preview */}
      <motion.div variants={item}>
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-3 flex flex-row items-center justify-between">
            <CardTitle className="text-base font-bold">
              {t("精选案例", "Featured Cases")}
            </CardTitle>
            <Link href="/cases">
              <span className="text-xs text-primary font-medium hover:underline flex items-center gap-1">
                {t("查看全部", "View All")} <ArrowUpRight size={12} />
              </span>
            </Link>
          </CardHeader>
          <CardContent className="pb-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
              {aiCases.filter(c => c.featured).map((c) => (
                <div key={c.id} className="group p-4 rounded-xl border border-border/50 hover:border-primary/20 hover:shadow-sm transition-all">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="secondary" className="text-[10px]">
                      {t(
                        c.department === "marketing" ? "市场营销" : c.department === "operations" ? "运营" : "创意设计",
                        c.department === "marketing" ? "Marketing" : c.department === "operations" ? "Operations" : "Creative"
                      )}
                    </Badge>
                    <span className="text-xs text-coral font-bold">{c.efficiencyGain} {t("效率提升", "efficiency gain")}</span>
                  </div>
                  <h3 className="text-sm font-bold text-foreground mb-1.5 line-clamp-1">
                    {t(c.titleZh, c.titleEn)}
                  </h3>
                  <p className="text-xs text-muted-foreground line-clamp-2 mb-3">
                    {t(c.resultZh, c.resultEn)}
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {c.tools.slice(0, 3).map((tool) => (
                      <span key={tool} className="text-[10px] px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}
