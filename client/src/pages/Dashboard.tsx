/*
 * Dashboard — Weekly AI transformation snapshot
 * Design: Warm Professional, Bento Grid layout
 * Hero banner, KPI cards, 3 pilot projects, global AI intel, quick links
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
  Megaphone,
  Palette,
  BarChart3,
  Rss,
  Globe,
  ExternalLink,
  Calendar,
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

// Three pilot projects data
const pilotProjects = [
  {
    id: "marketing",
    nameZh: "效果营销AI化",
    nameEn: "Performance Marketing AI",
    icon: Megaphone,
    color: "text-coral",
    bg: "bg-coral/10",
    borderColor: "border-coral/30",
    phase: { zh: "Phase 1 · 试点验证", en: "Phase 1 · Pilot Validation" },
    statusZh: "进行中",
    statusEn: "In Progress",
    progressPercent: 35,
    ownerZh: "营销中心",
    ownerEn: "Marketing Center",
    targetZh: "广告投放ROI优化、受众智能分析、创意A/B测试自动化",
    targetEn: "Ad ROI optimization, audience analysis, creative A/B test automation",
    kpis: [
      { zh: "AI嵌入流程", en: "AI Processes", value: "1/2" },
      { zh: "案例产出", en: "Cases", value: "3" },
      { zh: "效率提升", en: "Efficiency", value: "+15%" },
    ],
  },
  {
    id: "creative",
    nameZh: "创意AI化",
    nameEn: "Creative AI",
    icon: Palette,
    color: "text-teal",
    bg: "bg-teal/10",
    borderColor: "border-teal/30",
    phase: { zh: "Phase 1 · 试点验证", en: "Phase 1 · Pilot Validation" },
    statusZh: "进行中",
    statusEn: "In Progress",
    progressPercent: 30,
    ownerZh: "创意中心",
    ownerEn: "Creative Center",
    targetZh: "AI辅助广告素材生成、版本化与本地化、视觉创意批量生产",
    targetEn: "AI-assisted ad creative generation, versioning & localization, batch visual production",
    kpis: [
      { zh: "AI嵌入流程", en: "AI Processes", value: "1/2" },
      { zh: "案例产出", en: "Cases", value: "2" },
      { zh: "效率提升", en: "Efficiency", value: "+20%" },
    ],
  },
  {
    id: "analytics",
    nameZh: "数据分析AI化",
    nameEn: "Data Analytics AI",
    icon: BarChart3,
    color: "text-ocean-light",
    bg: "bg-ocean-light/10",
    borderColor: "border-ocean-light/30",
    phase: { zh: "Phase 1 · 试点验证", en: "Phase 1 · Pilot Validation" },
    statusZh: "进行中",
    statusEn: "In Progress",
    progressPercent: 25,
    ownerZh: "数据中心",
    ownerEn: "Data Center",
    targetZh: "AI驱动商品分析、用户行为洞察、财务/业务数据打通与自动化报告",
    targetEn: "AI-driven product analysis, user behavior insights, financial/business data integration & auto-reporting",
    kpis: [
      { zh: "AI嵌入流程", en: "AI Processes", value: "0/2" },
      { zh: "案例产出", en: "Cases", value: "2" },
      { zh: "效率提升", en: "Efficiency", value: "+12%" },
    ],
  },
];

// Latest global AI intelligence highlights
const latestIntel = [
  {
    zh: "AI将很快运行整个广告活动 — Agentic AI自动化广告供应链",
    en: "AI Will Soon Run Entire Ad Campaigns — Agentic AI Automates Supply Chain",
    category: "marketing",
    source: "MediaPost",
    date: "03-16",
  },
  {
    zh: "11款广告创意人离不开的AI工具",
    en: "11 AI Tools That Ad Creatives Can't Stop Using",
    category: "creative",
    source: "ADWEEK",
    date: "03-11",
  },
  {
    zh: "NVIDIA AI现状报告：AI如何驱动收入、降低成本",
    en: "NVIDIA State of AI 2026: Driving Revenue & Cutting Costs",
    category: "analytics",
    source: "NVIDIA",
    date: "03-09",
  },
];

const catColors: Record<string, string> = {
  marketing: "bg-coral/10 text-coral",
  creative: "bg-teal/10 text-teal",
  analytics: "bg-ocean-light/10 text-ocean-light",
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
              "2026年3月 · 项目启动月 · 三大试点推进中 · 每周周报+双周技能学习",
              "March 2026 · Launch Month · 3 Pilots In Progress · Weekly Report + Bi-weekly Skills"
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

      {/* Three Pilot Projects */}
      <motion.div variants={item}>
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-3 flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-base font-bold">
                {t("三大公司级试点项目", "Three Company-Level Pilot Projects")}
              </CardTitle>
              <p className="text-xs text-muted-foreground mt-1">
                {t("持续至12月底 · 试点目标L3-L4 · 普通目标L2-L3 · 每季度滚动迭代", "Through Dec · Pilots L3-L4 · Regular L2-L3 · Quarterly Rolling")}
              </p>
            </div>
            <Badge variant="secondary" className="text-[10px] bg-coral/10 text-coral border-0">
              <Calendar size={10} className="mr-1" />
              {t("2026全年", "Full Year 2026")}
            </Badge>
          </CardHeader>
          <CardContent className="pb-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {pilotProjects.map((pilot) => (
                <div
                  key={pilot.id}
                  className={`p-4 rounded-xl border ${pilot.borderColor} bg-card hover:shadow-sm transition-all`}
                >
                  {/* Header */}
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`p-2 rounded-lg ${pilot.bg} shrink-0`}>
                      <pilot.icon size={18} className={pilot.color} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="text-sm font-bold text-foreground truncate">
                        {t(pilot.nameZh, pilot.nameEn)}
                      </h3>
                      <p className="text-[10px] text-muted-foreground">
                        {t(pilot.phase.zh, pilot.phase.en)}
                      </p>
                    </div>
                    <Badge variant="secondary" className="text-[10px] bg-success/10 text-success border-0 shrink-0">
                      {t(pilot.statusZh, pilot.statusEn)}
                    </Badge>
                  </div>

                  {/* Progress */}
                  <div className="mb-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] text-muted-foreground">{t("总体进度", "Overall Progress")}</span>
                      <span className="text-[10px] font-bold font-mono">{pilot.progressPercent}%</span>
                    </div>
                    <Progress value={pilot.progressPercent} className="h-1.5" />
                  </div>

                  {/* Target */}
                  <p className="text-[11px] text-muted-foreground mb-3 line-clamp-2 leading-relaxed">
                    {t(pilot.targetZh, pilot.targetEn)}
                  </p>

                  {/* KPIs */}
                  <div className="grid grid-cols-3 gap-2">
                    {pilot.kpis.map((kpi, i) => (
                      <div key={i} className="text-center p-2 rounded-lg bg-muted/30">
                        <div className="text-sm font-extrabold font-mono text-foreground">{kpi.value}</div>
                        <div className="text-[9px] text-muted-foreground">{t(kpi.zh, kpi.en)}</div>
                      </div>
                    ))}
                  </div>

                  {/* Owner */}
                  <div className="mt-3 pt-2 border-t border-border/30 flex items-center justify-between">
                    <span className="text-[10px] text-muted-foreground">
                      {t("负责", "Owner")}: {t(pilot.ownerZh, pilot.ownerEn)}
                    </span>
                    <Link href="/department">
                      <span className="text-[10px] text-primary flex items-center gap-0.5 hover:underline">
                        {t("详情", "Details")} <ArrowUpRight size={10} />
                      </span>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Quick Links + Global AI Intel + Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Quick Links */}
        <motion.div variants={item} className="lg:col-span-1">
          <Card className="border-0 shadow-sm h-full">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-bold">
                {t("快速入口", "Quick Access")}
              </CardTitle>
            </CardHeader>
            <CardContent className="pb-4">
              <div className="grid grid-cols-1 gap-1.5">
                {quickLinks.map((link, i) => (
                  <Link key={i} href={link.href}>
                    <div className="group flex items-center gap-3 p-2.5 rounded-xl hover:bg-muted/60 transition-all duration-200">
                      <div className="p-1.5 rounded-lg bg-primary/8 text-primary shrink-0 group-hover:bg-primary/15 transition-colors">
                        {link.icon}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="text-xs font-semibold text-foreground flex items-center gap-1">
                          {t(link.zh, link.en)}
                          <ArrowUpRight size={10} className="opacity-0 group-hover:opacity-100 transition-opacity text-primary" />
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Global AI Intelligence Highlights */}
        <motion.div variants={item} className="lg:col-span-1">
          <Card className="border-0 shadow-sm h-full">
            <CardHeader className="pb-3 flex flex-row items-center justify-between">
              <CardTitle className="text-base font-bold flex items-center gap-2">
                <Rss size={16} className="text-teal" />
                {t("全球AI动态", "AI Intelligence")}
              </CardTitle>
              <Link href="/intelligence">
                <span className="text-xs text-primary font-medium hover:underline flex items-center gap-1">
                  {t("全部", "All")} <ArrowUpRight size={12} />
                </span>
              </Link>
            </CardHeader>
            <CardContent className="pb-4 space-y-3">
              {latestIntel.map((intel, i) => (
                <div key={i} className="group">
                  <div className="flex items-start gap-2.5">
                    <Badge variant="secondary" className={`text-[9px] ${catColors[intel.category]} border-0 shrink-0 mt-0.5`}>
                      {intel.category === "marketing" ? t("营销", "Mkt") : intel.category === "creative" ? t("创意", "Cre") : t("数据", "Data")}
                    </Badge>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-medium text-foreground leading-snug line-clamp-2">
                        {t(intel.zh, intel.en)}
                      </p>
                      <p className="text-[10px] text-muted-foreground mt-1">
                        {intel.source} · {intel.date}
                      </p>
                    </div>
                  </div>
                  {i < latestIntel.length - 1 && <div className="border-b border-border/30 mt-3" />}
                </div>
              ))}
              <Link href="/intelligence">
                <div className="flex items-center justify-center gap-1.5 p-2 rounded-lg bg-teal/5 text-teal text-xs font-medium hover:bg-teal/10 transition-colors mt-2">
                  <Globe size={14} />
                  {t("查看20+条全球AI情报", "View 20+ Global AI Intelligence")}
                </div>
              </Link>
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
                    <p className="text-xs text-foreground leading-snug">
                      {t(activity.zh, activity.en)}
                    </p>
                    <p className="text-[10px] text-muted-foreground mt-0.5">{activity.time} {t("前", "ago")}</p>
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
