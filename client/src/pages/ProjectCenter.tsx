/*
 * ProjectCenter — AI Pilot Project tracking hub
 * Design: Project-centric view (not department-centric)
 * Supports L2/L3/L4 maturity levels for each project
 * Projects are cross-functional and may span multiple departments
 */
import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";
import { useState } from "react";
import {
  Rocket, TrendingUp, Users, Target, Sparkles, Calendar,
  CheckCircle2, Clock, ArrowRight, ArrowUpRight, Layers,
  BarChart3, FileText, Bot, Workflow, ChevronRight, AlertCircle,
  FolderKanban,
} from "lucide-react";

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.06 } } };
const item = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } };

// --- Project data ---
export interface AIProject {
  id: string;
  nameZh: string;
  nameEn: string;
  descriptionZh: string;
  descriptionEn: string;
  maturityLevel: "L2" | "L3" | "L4";
  maturityScore: number;
  targetLevel: "L2" | "L3" | "L4";
  status: "planning" | "in-progress" | "pilot" | "scaling" | "completed";
  statusZh: string;
  statusEn: string;
  progress: number;
  ownerZh: string;
  ownerEn: string;
  departments: { zh: string; en: string }[];
  startDate: string;
  targetDate: string;
  currentQuarter: string;
  quarterGoalZh: string;
  quarterGoalEn: string;
  keyMetrics: { labelZh: string; labelEn: string; value: string; trend: "up" | "down" }[];
  milestonesZh: string[];
  milestonesEn: string[];
  toolsUsed: string[];
  casesCount: number;
  teamSize: number;
  weeklyHighlightZh: string;
  weeklyHighlightEn: string;
}

export const aiProjects: AIProject[] = [
  {
    id: "proj-001",
    nameZh: "AI智能客服系统",
    nameEn: "AI Smart Customer Service",
    descriptionZh: "基于RAG技术构建智能客服系统，实现多语言自动回复、智能工单分类和客户情感分析，目标覆盖80%常见问题自动解决",
    descriptionEn: "Build intelligent CS system with RAG technology, enabling multilingual auto-reply, smart ticket classification and sentiment analysis, targeting 80% auto-resolution",
    maturityLevel: "L3",
    maturityScore: 3.2,
    targetLevel: "L4",
    status: "pilot",
    statusZh: "试点中",
    statusEn: "Piloting",
    progress: 65,
    ownerZh: "赵丽",
    ownerEn: "Zhao Li",
    departments: [
      { zh: "运营中心", en: "Operation Center" },
      { zh: "互联网研发中心", en: "Internet R&D Center" },
    ],
    startDate: "2026-01",
    targetDate: "2026-09",
    currentQuarter: "Q2 2026",
    quarterGoalZh: "完成英语和西班牙语客服Agent部署，自动解决率达60%",
    quarterGoalEn: "Deploy English & Spanish CS Agent, achieve 60% auto-resolution rate",
    keyMetrics: [
      { labelZh: "自动解决率", labelEn: "Auto-Resolution", value: "52%", trend: "up" },
      { labelZh: "响应时间", labelEn: "Response Time", value: "< 5s", trend: "down" },
      { labelZh: "客户满意度", labelEn: "CSAT", value: "91%", trend: "up" },
      { labelZh: "人工工单减少", labelEn: "Ticket Reduction", value: "-38%", trend: "down" },
    ],
    milestonesZh: ["知识库构建完成", "英语Agent上线", "西语Agent测试中", "情感分析模块开发中"],
    milestonesEn: ["Knowledge base built", "English Agent live", "Spanish Agent testing", "Sentiment module in dev"],
    toolsUsed: ["Dify", "OpenAI GPT-4", "Pinecone", "Zendesk API"],
    casesCount: 8,
    teamSize: 12,
    weeklyHighlightZh: "本周英语Agent处理量突破500单/日，准确率提升至89%",
    weeklyHighlightEn: "English Agent exceeded 500 tickets/day this week, accuracy improved to 89%",
  },
  {
    id: "proj-002",
    nameZh: "AI广告创意自动化",
    nameEn: "AI Ad Creative Automation",
    descriptionZh: "利用AI实现广告素材从创意生成、A/B测试到效果分析的全链路自动化，大幅缩短广告迭代周期",
    descriptionEn: "Automate the full ad creative pipeline from generation, A/B testing to performance analysis using AI, significantly reducing iteration cycles",
    maturityLevel: "L3",
    maturityScore: 3.0,
    targetLevel: "L4",
    status: "in-progress",
    statusZh: "推进中",
    statusEn: "In Progress",
    progress: 45,
    ownerZh: "张明",
    ownerEn: "Zhang Ming",
    departments: [
      { zh: "营销中心", en: "Marketing Center" },
      { zh: "创意中心", en: "Creative Center" },
    ],
    startDate: "2026-02",
    targetDate: "2026-12",
    currentQuarter: "Q2 2026",
    quarterGoalZh: "完成Meta/Google双平台AI素材生成流程，测试周期缩短至1天",
    quarterGoalEn: "Complete AI creative generation for Meta/Google, reduce test cycle to 1 day",
    keyMetrics: [
      { labelZh: "素材产出效率", labelEn: "Creative Output", value: "+180%", trend: "up" },
      { labelZh: "测试周期", labelEn: "Test Cycle", value: "1.5天", trend: "down" },
      { labelZh: "广告ROI", labelEn: "Ad ROI", value: "+23%", trend: "up" },
      { labelZh: "人工审核时间", labelEn: "Review Time", value: "-60%", trend: "down" },
    ],
    milestonesZh: ["Meta素材生成上线", "Google素材适配中", "A/B测试自动化完成", "效果分析报告自动化开发中"],
    milestonesEn: ["Meta creative gen live", "Google adaptation WIP", "A/B test automation done", "Performance report automation in dev"],
    toolsUsed: ["ChatGPT", "Midjourney", "Meta Ads API", "Google Ads API"],
    casesCount: 6,
    teamSize: 8,
    weeklyHighlightZh: "Google广告素材适配完成60%，预计下周完成全部适配",
    weeklyHighlightEn: "Google ad creative adaptation 60% complete, expected to finish next week",
  },
  {
    id: "proj-003",
    nameZh: "AI商品选品与趋势预测",
    nameEn: "AI Product Selection & Trend Prediction",
    descriptionZh: "构建AI驱动的选品决策系统，整合全球趋势数据、竞品分析和销售预测，提升选品准确率和库存周转",
    descriptionEn: "Build AI-driven product selection system integrating global trend data, competitor analysis and sales forecasting to improve selection accuracy and inventory turnover",
    maturityLevel: "L2",
    maturityScore: 2.4,
    targetLevel: "L3",
    status: "in-progress",
    statusZh: "推进中",
    statusEn: "In Progress",
    progress: 35,
    ownerZh: "吴磊",
    ownerEn: "Wu Lei",
    departments: [
      { zh: "产品中心", en: "Product Center" },
      { zh: "互联网研发中心", en: "Internet R&D Center" },
    ],
    startDate: "2026-02",
    targetDate: "2026-12",
    currentQuarter: "Q2 2026",
    quarterGoalZh: "完成趋势数据采集平台搭建，选品模型V1上线测试",
    quarterGoalEn: "Complete trend data collection platform, launch selection model V1 for testing",
    keyMetrics: [
      { labelZh: "选品准确率", labelEn: "Selection Accuracy", value: "+25%", trend: "up" },
      { labelZh: "趋势预测准确", labelEn: "Trend Accuracy", value: "72%", trend: "up" },
      { labelZh: "分析时间缩短", labelEn: "Analysis Time", value: "-45%", trend: "down" },
      { labelZh: "库存周转提升", labelEn: "Inventory Turnover", value: "+15%", trend: "up" },
    ],
    milestonesZh: ["趋势数据源接入完成", "竞品监控系统搭建中", "选品模型训练中", "用户界面设计中"],
    milestonesEn: ["Trend data sources connected", "Competitor monitoring WIP", "Selection model training", "UI design in progress"],
    toolsUsed: ["Python", "ChatGPT", "Google Trends API", "TikTok API"],
    casesCount: 4,
    teamSize: 6,
    weeklyHighlightZh: "趋势数据采集平台完成Pinterest和TikTok数据源对接",
    weeklyHighlightEn: "Trend data platform completed Pinterest and TikTok data source integration",
  },
  {
    id: "proj-004",
    nameZh: "AI供应链智能优化",
    nameEn: "AI Supply Chain Optimization",
    descriptionZh: "运用AI技术优化需求预测、供应商评估和物流路线规划，降低库存成本并提升交付效率",
    descriptionEn: "Apply AI to optimize demand forecasting, supplier evaluation and logistics routing, reducing inventory costs and improving delivery efficiency",
    maturityLevel: "L2",
    maturityScore: 1.8,
    targetLevel: "L3",
    status: "planning",
    statusZh: "规划中",
    statusEn: "Planning",
    progress: 15,
    ownerZh: "刘强",
    ownerEn: "Liu Qiang",
    departments: [
      { zh: "生产供应链中心", en: "Production & Supply Chain" },
      { zh: "仓储物流中心", en: "Warehousing & Logistics" },
    ],
    startDate: "2026-04",
    targetDate: "2026-12",
    currentQuarter: "Q2 2026",
    quarterGoalZh: "完成需求预测模型V1开发，启动供应商评估AI试点",
    quarterGoalEn: "Complete demand forecast model V1, launch supplier evaluation AI pilot",
    keyMetrics: [
      { labelZh: "需求预测准确", labelEn: "Forecast Accuracy", value: "68%", trend: "up" },
      { labelZh: "库存成本", labelEn: "Inventory Cost", value: "-8%", trend: "down" },
      { labelZh: "交付准时率", labelEn: "On-Time Delivery", value: "89%", trend: "up" },
      { labelZh: "供应商评估效率", labelEn: "Eval Efficiency", value: "+30%", trend: "up" },
    ],
    milestonesZh: ["需求预测模型设计完成", "历史数据清洗中", "供应商评估指标体系设计中"],
    milestonesEn: ["Forecast model design done", "Historical data cleaning", "Supplier eval criteria design WIP"],
    toolsUsed: ["Python", "ChatGPT", "Excel"],
    casesCount: 2,
    teamSize: 5,
    weeklyHighlightZh: "完成近3年历史销售数据清洗，开始模型训练准备",
    weeklyHighlightEn: "Completed 3-year historical sales data cleaning, starting model training prep",
  },
  {
    id: "proj-005",
    nameZh: "AI数据报表自动化",
    nameEn: "AI Data Report Automation",
    descriptionZh: "构建AI驱动的自动化报表系统，支持自然语言查询、异常检测和智能报告生成，替代80%的手工报表工作",
    descriptionEn: "Build AI-driven automated reporting system with NL queries, anomaly detection and smart report generation, replacing 80% of manual reporting",
    maturityLevel: "L4",
    maturityScore: 3.8,
    targetLevel: "L4",
    status: "scaling",
    statusZh: "推广中",
    statusEn: "Scaling",
    progress: 85,
    ownerZh: "黄伟",
    ownerEn: "Huang Wei",
    departments: [
      { zh: "互联网研发中心", en: "Internet R&D Center" },
      { zh: "财务中心", en: "Finance Center" },
    ],
    startDate: "2025-11",
    targetDate: "2026-06",
    currentQuarter: "Q2 2026",
    quarterGoalZh: "完成全公司推广，覆盖所有一级中心日报/周报自动化",
    quarterGoalEn: "Complete company-wide rollout, cover all centers' daily/weekly report automation",
    keyMetrics: [
      { labelZh: "报表自动化率", labelEn: "Report Automation", value: "78%", trend: "up" },
      { labelZh: "生成效率", labelEn: "Generation Speed", value: "+300%", trend: "up" },
      { labelZh: "异常检测准确", labelEn: "Anomaly Accuracy", value: "94%", trend: "up" },
      { labelZh: "人工分析减少", labelEn: "Manual Reduction", value: "-65%", trend: "down" },
    ],
    milestonesZh: ["核心报表全自动化", "自然语言查询上线", "异常检测系统上线", "全公司推广中"],
    milestonesEn: ["Core reports fully automated", "NL query live", "Anomaly detection live", "Company-wide rollout WIP"],
    toolsUsed: ["Python", "ChatGPT", "SQL", "Metabase", "Dify"],
    casesCount: 15,
    teamSize: 8,
    weeklyHighlightZh: "本周新增财务中心和人力资源中心接入，覆盖率提升至78%",
    weeklyHighlightEn: "Finance and HR centers onboarded this week, coverage increased to 78%",
  },
];

// Maturity level colors and labels
const maturityConfig: Record<string, { color: string; bg: string; label: string }> = {
  L2: { color: "text-warning", bg: "bg-warning/10", label: "L2 · 场景探索" },
  L3: { color: "text-ocean-light", bg: "bg-ocean-light/10", label: "L3 · 流程嵌入" },
  L4: { color: "text-teal", bg: "bg-teal/10", label: "L4 · 数据驱动" },
};

const statusConfig: Record<string, { color: string; bg: string }> = {
  planning: { color: "text-muted-foreground", bg: "bg-muted" },
  "in-progress": { color: "text-ocean-light", bg: "bg-ocean-light/10" },
  pilot: { color: "text-coral", bg: "bg-coral/10" },
  scaling: { color: "text-teal", bg: "bg-teal/10" },
  completed: { color: "text-success", bg: "bg-success/10" },
};

export default function ProjectCenter() {
  const { t, lang } = useLanguage();
  const [selectedProjectId, setSelectedProjectId] = useState(aiProjects[0].id);
  const [viewMode, setViewMode] = useState<"detail" | "overview">("overview");

  const project = aiProjects.find((p) => p.id === selectedProjectId) || aiProjects[0];

  // Summary stats
  const totalProjects = aiProjects.length;
  const avgProgress = Math.round(aiProjects.reduce((s, p) => s + p.progress, 0) / totalProjects);
  const totalTeam = aiProjects.reduce((s, p) => s + p.teamSize, 0);
  const totalCases = aiProjects.reduce((s, p) => s + p.casesCount, 0);

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6 max-w-[1400px] mx-auto">
      {/* Header */}
      <motion.div variants={item}>
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-2">
            <FolderKanban size={20} className="text-coral" />
            <h1 className="text-2xl font-extrabold text-foreground">{t("项目中心", "Project Center")}</h1>
          </div>
          <div className="flex gap-1.5">
            <button
              onClick={() => setViewMode("overview")}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                viewMode === "overview" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              {t("总览", "Overview")}
            </button>
            <button
              onClick={() => setViewMode("detail")}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                viewMode === "detail" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              {t("详情", "Detail")}
            </button>
          </div>
        </div>
        <p className="text-sm text-muted-foreground">
          {t(
            "AI试点项目进展追踪 · 支持L2/L3/L4成熟度评估 · 每季度滚动迭代",
            "AI pilot project tracking · L2/L3/L4 maturity assessment · Quarterly rolling iteration"
          )}
        </p>
      </motion.div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <motion.div variants={item}>
          <Card className="border-0 shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-muted-foreground">{t("活跃项目", "Active Projects")}</span>
                <div className="p-1.5 rounded-lg bg-coral/10"><Rocket size={14} className="text-coral" /></div>
              </div>
              <div className="text-2xl font-extrabold font-mono">{totalProjects}</div>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div variants={item}>
          <Card className="border-0 shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-muted-foreground">{t("平均进度", "Avg Progress")}</span>
                <div className="p-1.5 rounded-lg bg-ocean-light/10"><BarChart3 size={14} className="text-ocean-light" /></div>
              </div>
              <div className="text-2xl font-extrabold font-mono">{avgProgress}%</div>
              <Progress value={avgProgress} className="h-1.5 mt-2" />
            </CardContent>
          </Card>
        </motion.div>
        <motion.div variants={item}>
          <Card className="border-0 shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-muted-foreground">{t("参与人数", "Team Size")}</span>
                <div className="p-1.5 rounded-lg bg-teal/10"><Users size={14} className="text-teal" /></div>
              </div>
              <div className="text-2xl font-extrabold font-mono">{totalTeam}</div>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div variants={item}>
          <Card className="border-0 shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-muted-foreground">{t("累计案例", "Total Cases")}</span>
                <div className="p-1.5 rounded-lg bg-success/10"><FileText size={14} className="text-success" /></div>
              </div>
              <div className="text-2xl font-extrabold font-mono">{totalCases}</div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {viewMode === "overview" ? (
        /* ===== OVERVIEW MODE ===== */
        <motion.div variants={item} className="space-y-3">
          {aiProjects.map((proj) => {
            const mc = maturityConfig[proj.maturityLevel];
            const sc = statusConfig[proj.status];
            return (
              <Card
                key={proj.id}
                className="border-0 shadow-sm cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => { setSelectedProjectId(proj.id); setViewMode("detail"); }}
              >
                <CardContent className="p-5">
                  <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                    {/* Left: Project info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-base font-bold text-foreground truncate">{t(proj.nameZh, proj.nameEn)}</h3>
                        <Badge className={`${mc.bg} ${mc.color} text-[10px] border-0`}>{mc.label}</Badge>
                        <Badge className={`${sc.bg} ${sc.color} text-[10px] border-0`}>{t(proj.statusZh, proj.statusEn)}</Badge>
                      </div>
                      <p className="text-xs text-muted-foreground line-clamp-1 mb-2">{t(proj.descriptionZh, proj.descriptionEn)}</p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1"><Users size={12} /> {proj.teamSize}</span>
                        <span className="flex items-center gap-1"><FileText size={12} /> {proj.casesCount} {t("案例", "cases")}</span>
                        <span className="flex items-center gap-1"><Calendar size={12} /> {proj.currentQuarter}</span>
                        <span className="flex items-center gap-1">
                          {proj.departments.map((d) => t(d.zh, d.en)).join(" + ")}
                        </span>
                      </div>
                    </div>
                    {/* Right: Progress + target */}
                    <div className="flex items-center gap-4 shrink-0">
                      <div className="text-right">
                        <div className="text-xs text-muted-foreground mb-1">{t("进度", "Progress")}</div>
                        <div className="text-lg font-bold font-mono">{proj.progress}%</div>
                      </div>
                      <div className="w-24">
                        <Progress value={proj.progress} className="h-2" />
                        <div className="flex justify-between mt-1 text-[10px] text-muted-foreground">
                          <span>{proj.maturityLevel}</span>
                          <ArrowRight size={10} />
                          <span>{proj.targetLevel}</span>
                        </div>
                      </div>
                      <ChevronRight size={16} className="text-muted-foreground" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </motion.div>
      ) : (
        /* ===== DETAIL MODE ===== */
        <>
          {/* Project Selector */}
          <motion.div variants={item} className="flex gap-1.5 overflow-x-auto pb-1">
            {aiProjects.map((p) => (
              <button
                key={p.id}
                onClick={() => setSelectedProjectId(p.id)}
                className={`px-4 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
                  selectedProjectId === p.id
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "bg-card text-muted-foreground hover:bg-muted border border-border/50"
                }`}
              >
                <div className="flex items-center gap-2">
                  <span>{t(p.nameZh, p.nameEn)}</span>
                  <span className={`font-mono text-[10px] ${selectedProjectId === p.id ? "text-primary-foreground/80" : "text-muted-foreground"}`}>
                    {p.maturityLevel}
                  </span>
                </div>
              </button>
            ))}
          </motion.div>

          {/* Project Header */}
          <motion.div variants={item}>
            <Card className="border-0 shadow-sm overflow-hidden">
              <div className="bg-gradient-to-r from-coral/5 via-ocean-light/5 to-teal/5 p-6">
                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h2 className="text-xl font-extrabold text-foreground">{t(project.nameZh, project.nameEn)}</h2>
                      <Badge className={`${maturityConfig[project.maturityLevel].bg} ${maturityConfig[project.maturityLevel].color} border-0`}>
                        {maturityConfig[project.maturityLevel].label}
                      </Badge>
                      <Badge className={`${statusConfig[project.status].bg} ${statusConfig[project.status].color} border-0`}>
                        {t(project.statusZh, project.statusEn)}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{t(project.descriptionZh, project.descriptionEn)}</p>
                    <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1"><Users size={12} /> {t("负责人", "Owner")}: {t(project.ownerZh, project.ownerEn)}</span>
                      <span className="flex items-center gap-1"><Layers size={12} /> {project.departments.map((d) => t(d.zh, d.en)).join(" + ")}</span>
                      <span className="flex items-center gap-1"><Calendar size={12} /> {project.startDate} → {project.targetDate}</span>
                      <span className="flex items-center gap-1"><Users size={12} /> {project.teamSize} {t("人", "members")}</span>
                    </div>
                  </div>
                  {/* Maturity Progress */}
                  <div className="shrink-0 text-center p-4 rounded-xl bg-card/60">
                    <div className="text-xs text-muted-foreground mb-1">{t("成熟度进展", "Maturity Progress")}</div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`text-lg font-bold ${maturityConfig[project.maturityLevel].color}`}>{project.maturityLevel}</span>
                      <ArrowRight size={16} className="text-muted-foreground" />
                      <span className={`text-lg font-bold ${maturityConfig[project.targetLevel].color}`}>{project.targetLevel}</span>
                    </div>
                    <Progress value={project.progress} className="h-2 w-32" />
                    <div className="text-xs text-muted-foreground mt-1">{project.progress}%</div>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Quarterly Goal */}
          <motion.div variants={item}>
            <Card className="border-0 shadow-sm border-l-4 border-l-coral">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-1">
                  <Target size={14} className="text-coral" />
                  <span className="text-xs font-semibold text-coral">{project.currentQuarter} {t("季度目标", "Quarter Goal")}</span>
                </div>
                <p className="text-sm font-medium">{t(project.quarterGoalZh, project.quarterGoalEn)}</p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Weekly Highlight */}
          <motion.div variants={item}>
            <Card className="border-0 shadow-sm border-l-4 border-l-ocean-light">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-1">
                  <Sparkles size={14} className="text-ocean-light" />
                  <span className="text-xs font-semibold text-ocean-light">{t("本周亮点", "Weekly Highlight")}</span>
                </div>
                <p className="text-sm">{t(project.weeklyHighlightZh, project.weeklyHighlightEn)}</p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Key Metrics */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {project.keyMetrics.map((metric, i) => (
              <motion.div key={i} variants={item}>
                <Card className="border-0 shadow-sm">
                  <CardContent className="p-4">
                    <div className="text-xs text-muted-foreground mb-1">{t(metric.labelZh, metric.labelEn)}</div>
                    <div className="flex items-center gap-2">
                      <span className="text-xl font-extrabold font-mono">{metric.value}</span>
                      <ArrowUpRight size={14} className={metric.trend === "up" ? "text-success" : "text-success"} />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Milestones & Tools */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <motion.div variants={item}>
              <Card className="border-0 shadow-sm h-full">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-teal" /> {t("里程碑", "Milestones")}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {(lang === "zh" ? project.milestonesZh : project.milestonesEn).map((ms, i) => (
                      <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-muted/30">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${
                          i < 2 ? "bg-teal/10" : "bg-muted"
                        }`}>
                          {i < 2 ? (
                            <CheckCircle2 size={12} className="text-teal" />
                          ) : (
                            <Clock size={12} className="text-muted-foreground" />
                          )}
                        </div>
                        <span className={`text-sm ${i < 2 ? "font-medium" : "text-muted-foreground"}`}>{ms}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={item}>
              <Card className="border-0 shadow-sm h-full">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Sparkles size={16} className="text-coral" /> {t("技术栈 & 工具", "Tech Stack & Tools")}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.toolsUsed.map((tool) => (
                      <Badge key={tool} variant="secondary" className="text-xs">{tool}</Badge>
                    ))}
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-4 rounded-xl bg-coral/5 border border-coral/10 text-center">
                      <FileText size={20} className="text-coral mx-auto mb-1" />
                      <div className="text-xl font-bold font-mono">{project.casesCount}</div>
                      <div className="text-[10px] text-muted-foreground">{t("案例", "Cases")}</div>
                    </div>
                    <div className="p-4 rounded-xl bg-ocean-light/5 border border-ocean-light/10 text-center">
                      <Users size={20} className="text-ocean-light mx-auto mb-1" />
                      <div className="text-xl font-bold font-mono">{project.teamSize}</div>
                      <div className="text-[10px] text-muted-foreground">{t("团队成员", "Team Members")}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </>
      )}

      {/* Maturity Legend */}
      <motion.div variants={item}>
        <Card className="border-0 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <Layers size={14} className="text-muted-foreground" />
              <span className="text-xs font-semibold text-muted-foreground">{t("AI成熟度等级说明", "AI Maturity Level Guide")}</span>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
              <div className="p-3 rounded-xl bg-warning/5 border border-warning/10">
                <div className="flex items-center gap-2 mb-1">
                  <Badge className="bg-warning/10 text-warning border-0 text-[10px]">L2</Badge>
                  <span className="text-sm font-semibold">{t("场景探索", "Scenario Exploration")}</span>
                </div>
                <p className="text-xs text-muted-foreground">{t("已识别AI应用场景，开始POC验证，个别岗位试用AI工具", "AI scenarios identified, POC validation started, individual roles testing AI tools")}</p>
              </div>
              <div className="p-3 rounded-xl bg-ocean-light/5 border border-ocean-light/10">
                <div className="flex items-center gap-2 mb-1">
                  <Badge className="bg-ocean-light/10 text-ocean-light border-0 text-[10px]">L3</Badge>
                  <span className="text-sm font-semibold">{t("流程嵌入", "Process Integration")}</span>
                </div>
                <p className="text-xs text-muted-foreground">{t("AI已嵌入核心工作流程，形成标准化SOP，团队级别采纳", "AI embedded in core workflows, standardized SOPs formed, team-level adoption")}</p>
              </div>
              <div className="p-3 rounded-xl bg-teal/5 border border-teal/10">
                <div className="flex items-center gap-2 mb-1">
                  <Badge className="bg-teal/10 text-teal border-0 text-[10px]">L4</Badge>
                  <span className="text-sm font-semibold">{t("数据驱动", "Data-Driven")}</span>
                </div>
                <p className="text-xs text-muted-foreground">{t("AI深度融入决策链路，数据驱动自动化运营，可量化ROI", "AI deeply integrated in decision chain, data-driven automated operations, quantifiable ROI")}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}
