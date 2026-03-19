// ============================================================
// CUPSHE AI Case Library — Comprehensive Data Model
// Four-layer: Cases / Playbooks / Prompts / Tools
// With: Value Scorecard, Maturity Map, Scoring Model
// ============================================================

// --- Maturity Levels ---
export type MaturityLevel = "L1" | "L2" | "L3" | "L4" | "L5";

export const maturityLevels: Record<MaturityLevel, { zh: string; en: string; color: string; bgColor: string }> = {
  L1: { zh: "个人效率", en: "Personal Efficiency", color: "text-muted-foreground", bgColor: "bg-muted" },
  L2: { zh: "团队效率", en: "Team Efficiency", color: "text-ocean-light", bgColor: "bg-ocean-light/10" },
  L3: { zh: "流程自动化", en: "Process Automation", color: "text-teal", bgColor: "bg-teal/10" },
  L4: { zh: "AI决策", en: "AI Decision Making", color: "text-coral", bgColor: "bg-coral/10" },
  L5: { zh: "AI驱动业务", en: "AI-Driven Business", color: "text-primary", bgColor: "bg-primary/10" },
};

// --- Value Types ---
export type ValueType = "efficiency" | "productivity" | "cost" | "revenue" | "customer";

export const valueTypes: Record<ValueType, { zh: string; en: string; icon: string; color: string }> = {
  efficiency: { zh: "效率", en: "Efficiency", icon: "⚡", color: "text-teal" },
  productivity: { zh: "产出", en: "Productivity", icon: "📈", color: "text-ocean-light" },
  cost: { zh: "成本", en: "Cost", icon: "💰", color: "text-success" },
  revenue: { zh: "收入", en: "Revenue", icon: "🎯", color: "text-coral" },
  customer: { zh: "客户价值", en: "Customer Value", icon: "❤️", color: "text-primary" },
};

// --- Business Scenarios ---
export interface BusinessScenario {
  id: string;
  zh: string;
  en: string;
  icon: string;
  parentZh?: string;
  parentEn?: string;
}

export const businessScenarios: BusinessScenario[] = [
  { id: "merch-analysis", zh: "商品分析", en: "Product Analysis", icon: "📊", parentZh: "商品", parentEn: "Merchandising" },
  { id: "merch-planning", zh: "商品企划", en: "Product Planning", icon: "📋", parentZh: "商品", parentEn: "Merchandising" },
  { id: "merch-sourcing", zh: "选品采购", en: "Sourcing", icon: "🔍", parentZh: "商品", parentEn: "Merchandising" },
  { id: "mktg-creative", zh: "广告创意", en: "Ad Creative", icon: "🎨", parentZh: "营销", parentEn: "Marketing" },
  { id: "mktg-insight", zh: "用户洞察", en: "Consumer Insight", icon: "🧠", parentZh: "营销", parentEn: "Marketing" },
  { id: "mktg-media", zh: "媒体投放", en: "Media Buying", icon: "📡", parentZh: "营销", parentEn: "Marketing" },
  { id: "ops-cs", zh: "客服", en: "Customer Service", icon: "💬", parentZh: "运营", parentEn: "Operations" },
  { id: "ops-content", zh: "内容运营", en: "Content Ops", icon: "✍️", parentZh: "运营", parentEn: "Operations" },
  { id: "ops-listing", zh: "商品上架", en: "Listing Ops", icon: "📦", parentZh: "运营", parentEn: "Operations" },
  { id: "design-concept", zh: "设计概念", en: "Design Concept", icon: "🎭", parentZh: "设计", parentEn: "Design" },
  { id: "design-production", zh: "设计出图", en: "Design Production", icon: "🖼️", parentZh: "设计", parentEn: "Design" },
  { id: "supply-forecast", zh: "需求预测", en: "Demand Forecast", icon: "📉", parentZh: "供应链", parentEn: "Supply Chain" },
  { id: "data-reporting", zh: "数据报表", en: "Data Reporting", icon: "📊", parentZh: "数据", parentEn: "Data" },
  { id: "data-analysis", zh: "数据分析", en: "Data Analysis", icon: "🔬", parentZh: "数据", parentEn: "Data" },
];

// --- AI Value Scorecard ---
export interface ValueScorecard {
  efficiency: { beforeZh: string; beforeEn: string; afterZh: string; afterEn: string; metric: string; };
  productivity: { beforeZh: string; beforeEn: string; afterZh: string; afterEn: string; metric: string; };
  cost: { descZh: string; descEn: string; metric: string; };
  revenue: { descZh: string; descEn: string; metric: string; };
  customer: { descZh: string; descEn: string; metric: string; };
}

// --- Scoring Model ---
export interface CaseScore {
  businessValue: number;   // 40%
  replicability: number;   // 30%
  innovation: number;      // 20%
  virality: number;        // 10%
  total: number;           // weighted sum
}

// --- Enhanced AI Case ---
export interface EnhancedAICase {
  id: string;
  titleZh: string;
  titleEn: string;
  subtitleZh: string;
  subtitleEn: string;
  department: string;
  businessScenario: string;
  businessFunction: string;
  maturityLevel: MaturityLevel;
  primaryValueType: ValueType;
  tools: string[];
  tags: string[];
  author: string;
  team: string;
  date: string;
  featured: boolean;
  caseOfWeek?: boolean;
  caseOfMonth?: boolean;
  // Problem → Approach → Result
  problemZh: string;
  problemEn: string;
  approachZh: string;
  approachEn: string;
  resultZh: string;
  resultEn: string;
  // Value Scorecard
  valueScorecard: ValueScorecard;
  efficiencyGain: string;
  // Scoring
  score: CaseScore;
  // Related
  relatedPlaybookId?: string;
  relatedPromptIds?: string[];
  relatedToolIds?: string[];
  // Visual Card
  impactMetricZh: string;
  impactMetricEn: string;
  oneLinerZh: string;
  oneLinerEn: string;
}

// --- Playbook ---
export interface PlaybookStep {
  stepNumber: number;
  titleZh: string;
  titleEn: string;
  descZh: string;
  descEn: string;
  tools?: string[];
  durationZh?: string;
  durationEn?: string;
}

export interface AIPlaybook {
  id: string;
  titleZh: string;
  titleEn: string;
  descZh: string;
  descEn: string;
  businessScenario: string;
  department: string;
  maturityLevel: MaturityLevel;
  steps: PlaybookStep[];
  relatedCaseIds: string[];
  relatedPromptIds: string[];
  author: string;
  usageCount: number;
  rating: number;
  date: string;
}

// --- AI Tool (enhanced) ---
export interface AITool {
  id: string;
  name: string;
  categoryZh: string;
  categoryEn: string;
  descZh: string;
  descEn: string;
  statusZh: string;
  statusEn: string;
  website?: string;
  useCasesZh: string[];
  useCasesEn: string[];
  departments: string[];
  usageCount: number;
}

// ============================================================
// SEED DATA
// ============================================================

function calcScore(bv: number, rep: number, inn: number, vir: number): CaseScore {
  return {
    businessValue: bv,
    replicability: rep,
    innovation: inn,
    virality: vir,
    total: Math.round(bv * 0.4 + rep * 0.3 + inn * 0.2 + vir * 0.1),
  };
}

export const enhancedCases: EnhancedAICase[] = [
  {
    id: "case-001",
    titleZh: "AI让商品分析效率提升18倍",
    titleEn: "AI Boosts Product Analysis Efficiency by 18x",
    subtitleZh: "3小时工作 → 10分钟完成",
    subtitleEn: "3-hour task → 10 minutes",
    department: "merchandising",
    businessScenario: "merch-analysis",
    businessFunction: "商品分析",
    maturityLevel: "L2",
    primaryValueType: "efficiency",
    tools: ["ChatGPT", "Python", "Excel"],
    tags: ["商品分析", "数据处理", "效率提升"],
    author: "吴磊",
    team: "商品运营组",
    date: "2026-03-01",
    featured: true,
    caseOfMonth: true,
    problemZh: "每周需要分析200+SKU的销售数据、库存周转、利润率，人工整理Excel需要3小时以上。",
    problemEn: "Weekly analysis of 200+ SKUs covering sales data, inventory turnover, and margins required 3+ hours of manual Excel work.",
    approachZh: "使用ChatGPT编写Python脚本自动化数据清洗和分析，结合Prompt模板生成标准化分析报告。",
    approachEn: "Used ChatGPT to write Python scripts for automated data cleaning and analysis, combined with prompt templates for standardized reports.",
    resultZh: "分析时间从3小时缩短至10分钟，效率提升18倍。报告质量更稳定，发现了3个被忽略的高潜力SKU。",
    resultEn: "Analysis time reduced from 3 hours to 10 minutes, 18x efficiency gain. More consistent report quality, discovered 3 overlooked high-potential SKUs.",
    valueScorecard: {
      efficiency: { beforeZh: "3小时/次", beforeEn: "3 hrs/task", afterZh: "10分钟/次", afterEn: "10 min/task", metric: "18x" },
      productivity: { beforeZh: "3份报告/周", beforeEn: "3 reports/week", afterZh: "20份报告/周", afterEn: "20 reports/week", metric: "6.7x" },
      cost: { descZh: "节省2人/周的分析工作量", descEn: "Saves 2 person/week of analysis workload", metric: "-2人/周" },
      revenue: { descZh: "发现高潜力SKU，预估增收15%", descEn: "Discovered high-potential SKUs, estimated 15% revenue increase", metric: "+15%" },
      customer: { descZh: "更精准的选品提升用户满意度", descEn: "Better product selection improves customer satisfaction", metric: "+NPS" },
    },
    efficiencyGain: "1800%",
    score: calcScore(90, 95, 70, 85),
    relatedPlaybookId: "pb-001",
    relatedPromptIds: ["p-004"],
    relatedToolIds: ["t-001", "t-007"],
    impactMetricZh: "时间减少90%",
    impactMetricEn: "90% time reduction",
    oneLinerZh: "3小时工作 → 10分钟完成",
    oneLinerEn: "3-hour task → 10 minutes",
  },
  {
    id: "case-002",
    titleZh: "AI驱动广告素材A/B测试自动化",
    titleEn: "AI-Driven Ad Creative A/B Testing Automation",
    subtitleZh: "测试周期5天→1天，ROI提升23%",
    subtitleEn: "Testing cycle 5 days→1 day, ROI +23%",
    department: "marketing",
    businessScenario: "mktg-creative",
    businessFunction: "广告创意",
    maturityLevel: "L3",
    primaryValueType: "revenue",
    tools: ["ChatGPT", "Midjourney", "Google Analytics", "Meta Ads"],
    tags: ["广告优化", "A/B测试", "ROI提升", "创意生成"],
    author: "张明",
    team: "广告投放组",
    date: "2026-03-05",
    featured: true,
    caseOfWeek: true,
    problemZh: "广告素材测试周期长（5天），人工分析效率低，无法快速迭代优化。每月广告预算浪费严重。",
    problemEn: "Long ad creative testing cycles (5 days), inefficient manual analysis, unable to iterate quickly. Significant monthly ad budget waste.",
    approachZh: "使用ChatGPT生成多版本广告文案，Midjourney生成配图变体，结合内部数据平台自动分析投放效果，形成闭环优化流程。",
    approachEn: "Used ChatGPT for multi-version ad copy, Midjourney for image variants, combined with internal data platform for automated performance analysis, creating a closed-loop optimization process.",
    resultZh: "测试周期从5天缩短至1天，广告ROI提升23%，月度广告预算节省15%。创意产出量提升5倍。",
    resultEn: "Testing cycle reduced from 5 days to 1 day, ad ROI improved by 23%, monthly ad budget saved by 15%. Creative output increased 5x.",
    valueScorecard: {
      efficiency: { beforeZh: "5天/轮", beforeEn: "5 days/round", afterZh: "1天/轮", afterEn: "1 day/round", metric: "5x" },
      productivity: { beforeZh: "10组创意/周", beforeEn: "10 creatives/week", afterZh: "50组创意/周", afterEn: "50 creatives/week", metric: "5x" },
      cost: { descZh: "月度广告预算节省15%", descEn: "15% monthly ad budget savings", metric: "-15%" },
      revenue: { descZh: "广告ROI提升23%", descEn: "Ad ROI improved by 23%", metric: "+23%" },
      customer: { descZh: "更精准的广告触达目标用户", descEn: "More precise ad targeting reaches ideal customers", metric: "+CTR" },
    },
    efficiencyGain: "80%",
    score: calcScore(95, 80, 85, 90),
    relatedPlaybookId: "pb-002",
    relatedPromptIds: ["p-001"],
    relatedToolIds: ["t-001", "t-002"],
    impactMetricZh: "ROI提升23%",
    impactMetricEn: "ROI +23%",
    oneLinerZh: "测试周期5天→1天，ROI提升23%",
    oneLinerEn: "Testing cycle 5→1 day, ROI +23%",
  },
  {
    id: "case-003",
    titleZh: "智能客服知识库系统",
    titleEn: "Smart Customer Service Knowledge Base",
    subtitleZh: "响应时间45秒→13秒，满意度+15%",
    subtitleEn: "Response 45s→13s, satisfaction +15%",
    department: "operations",
    businessScenario: "ops-cs",
    businessFunction: "客服",
    maturityLevel: "L3",
    primaryValueType: "customer",
    tools: ["OpenAI API", "Pinecone", "Python", "Dify"],
    tags: ["客服", "RAG", "知识库", "自动化"],
    author: "赵丽",
    team: "客服运营组",
    date: "2026-02-20",
    featured: true,
    problemZh: "客服团队每天处理2000+咨询，60%为重复性问题，平均响应时间45秒。人力成本高，体验不一致。",
    problemEn: "CS team handles 2000+ daily inquiries, 60% repetitive, 45s avg response. High labor cost, inconsistent experience.",
    approachZh: "构建基于RAG的智能知识库，将历史FAQ和产品信息向量化，实现语义搜索和自动回复建议。复杂问题自动升级到人工。",
    approachEn: "Built RAG-based smart knowledge base, vectorized historical FAQs and product info for semantic search and auto-reply. Complex issues auto-escalated to humans.",
    resultZh: "客服响应时间缩短70%（45秒→13秒），客户满意度提升15%，重复问题自动解决率达85%。",
    resultEn: "Response time reduced 70% (45s→13s), satisfaction +15%, repetitive issue auto-resolution rate 85%.",
    valueScorecard: {
      efficiency: { beforeZh: "45秒/次", beforeEn: "45s/response", afterZh: "13秒/次", afterEn: "13s/response", metric: "3.5x" },
      productivity: { beforeZh: "200次/人/天", beforeEn: "200/person/day", afterZh: "500次/人/天", afterEn: "500/person/day", metric: "2.5x" },
      cost: { descZh: "减少3名客服人力需求", descEn: "Reduced need for 3 CS agents", metric: "-3人" },
      revenue: { descZh: "更快响应提升转化率", descEn: "Faster response improves conversion", metric: "+8%" },
      customer: { descZh: "客户满意度NPS提升15%", descEn: "Customer NPS improved by 15%", metric: "+15%" },
    },
    efficiencyGain: "70%",
    score: calcScore(88, 75, 80, 70),
    relatedPlaybookId: "pb-003",
    relatedPromptIds: ["p-006"],
    relatedToolIds: ["t-001", "t-006"],
    impactMetricZh: "满意度+15%",
    impactMetricEn: "Satisfaction +15%",
    oneLinerZh: "响应时间45秒→13秒",
    oneLinerEn: "Response 45s→13s",
  },
  {
    id: "case-004",
    titleZh: "AI辅助泳装设计概念生成",
    titleEn: "AI-Assisted Swimwear Design Concept Generation",
    subtitleZh: "设计效率提升200%，概念到初稿3天→4小时",
    subtitleEn: "Design efficiency +200%, concept to draft 3d→4h",
    department: "creative",
    businessScenario: "design-concept",
    businessFunction: "设计概念",
    maturityLevel: "L2",
    primaryValueType: "productivity",
    tools: ["Midjourney", "Stable Diffusion", "CLO 3D", "Adobe Firefly"],
    tags: ["设计", "创意", "虚拟打样", "概念生成"],
    author: "周婷",
    team: "泳装设计组",
    date: "2026-02-28",
    featured: true,
    problemZh: "设计团队每季需要产出100+设计概念，传统手绘+修改流程耗时长，灵感来源有限。",
    problemEn: "Design team needs 100+ concepts per season, traditional hand-drawing + revision is slow, limited inspiration sources.",
    approachZh: "使用Midjourney和Stable Diffusion生成设计灵感图，结合CLO 3D进行虚拟打样，AI辅助配色方案推荐。",
    approachEn: "Used Midjourney and Stable Diffusion for design inspiration, CLO 3D for virtual sampling, AI-assisted color scheme recommendations.",
    resultZh: "设计概念产出效率提升200%，从构思到初稿时间从3天缩短至4小时。设计师可以更多时间专注于创意细化。",
    resultEn: "Design concept output +200%, ideation to first draft from 3 days to 4 hours. Designers can focus more on creative refinement.",
    valueScorecard: {
      efficiency: { beforeZh: "3天/概念", beforeEn: "3 days/concept", afterZh: "4小时/概念", afterEn: "4 hrs/concept", metric: "18x" },
      productivity: { beforeZh: "30概念/季", beforeEn: "30 concepts/season", afterZh: "100概念/季", afterEn: "100 concepts/season", metric: "3.3x" },
      cost: { descZh: "减少外包设计费用40%", descEn: "Reduced outsourced design costs by 40%", metric: "-40%" },
      revenue: { descZh: "更快上新，抢占季节窗口", descEn: "Faster launches, capturing seasonal windows", metric: "+速度" },
      customer: { descZh: "更多样化的产品选择", descEn: "More diversified product selection", metric: "+多样性" },
    },
    efficiencyGain: "200%",
    score: calcScore(82, 70, 92, 88),
    relatedPlaybookId: "pb-004",
    relatedPromptIds: ["p-003"],
    relatedToolIds: ["t-002"],
    impactMetricZh: "效率提升200%",
    impactMetricEn: "200% efficiency gain",
    oneLinerZh: "概念到初稿：3天→4小时",
    oneLinerEn: "Concept to draft: 3 days→4 hours",
  },
  {
    id: "case-005",
    titleZh: "AI评论分析驱动产品改进",
    titleEn: "AI Review Analysis Drives Product Improvement",
    subtitleZh: "自动分析10万+评论，发现5个关键改进点",
    subtitleEn: "Auto-analyzed 100K+ reviews, found 5 key improvements",
    department: "operations",
    businessScenario: "mktg-insight",
    businessFunction: "用户洞察",
    maturityLevel: "L3",
    primaryValueType: "customer",
    tools: ["Python", "ChatGPT", "Scrapy", "NLP"],
    tags: ["评论分析", "用户洞察", "产品改进", "NLP"],
    author: "赵丽",
    team: "用户洞察组",
    date: "2026-02-15",
    featured: false,
    problemZh: "Amazon和社媒上累积10万+用户评论，人工阅读分析不现实，关键洞察被埋没。",
    problemEn: "100K+ user reviews on Amazon and social media, manual reading impractical, key insights buried.",
    approachZh: "使用Python+Scrapy抓取评论数据，NLP进行情感分析和主题提取，ChatGPT生成洞察报告和改进建议。",
    approachEn: "Used Python+Scrapy to scrape reviews, NLP for sentiment analysis and topic extraction, ChatGPT for insight reports and improvement suggestions.",
    resultZh: "2天内完成10万条评论分析（原需2周），发现5个关键产品改进点，其中2个已纳入下季产品规划。",
    resultEn: "Analyzed 100K reviews in 2 days (originally 2 weeks), found 5 key product improvements, 2 already in next season's product plan.",
    valueScorecard: {
      efficiency: { beforeZh: "2周", beforeEn: "2 weeks", afterZh: "2天", afterEn: "2 days", metric: "7x" },
      productivity: { beforeZh: "抽样500条", beforeEn: "Sample 500", afterZh: "全量10万条", afterEn: "Full 100K", metric: "200x" },
      cost: { descZh: "节省外部调研费用", descEn: "Saved external research costs", metric: "-$20K" },
      revenue: { descZh: "产品改进预计提升复购率", descEn: "Product improvements expected to boost repurchase", metric: "+复购" },
      customer: { descZh: "直接回应用户痛点", descEn: "Directly addressing user pain points", metric: "+满意度" },
    },
    efficiencyGain: "700%",
    score: calcScore(85, 80, 75, 65),
    relatedPromptIds: ["p-002"],
    relatedToolIds: ["t-001"],
    impactMetricZh: "分析量200倍提升",
    impactMetricEn: "200x analysis volume",
    oneLinerZh: "10万条评论，2天分析完",
    oneLinerEn: "100K reviews analyzed in 2 days",
  },
  {
    id: "case-006",
    titleZh: "AI自动化数据报表系统",
    titleEn: "AI Automated Data Reporting System",
    subtitleZh: "日报/周报自动生成，节省80%报表时间",
    subtitleEn: "Auto-generated daily/weekly reports, 80% time saved",
    department: "data",
    businessScenario: "data-reporting",
    businessFunction: "数据报表",
    maturityLevel: "L3",
    primaryValueType: "efficiency",
    tools: ["OpenAI API", "Python", "SQL", "Tableau"],
    tags: ["数据报表", "自动化", "BI", "效率"],
    author: "张明",
    team: "数据分析组",
    date: "2026-01-25",
    featured: false,
    problemZh: "每天需要制作5+份数据报表，涉及多个数据源，手工整合耗时2小时以上。",
    problemEn: "5+ daily reports from multiple data sources, manual integration takes 2+ hours.",
    approachZh: "构建AI数据管道，自动连接数据源，使用GPT生成自然语言分析摘要，支持自然语言查询。",
    approachEn: "Built AI data pipeline, auto-connecting data sources, GPT generates natural language analysis summaries, supports NL queries.",
    resultZh: "报表制作时间从2小时缩短至20分钟，支持自然语言查询数据，非技术人员也能自助分析。",
    resultEn: "Report creation from 2 hours to 20 minutes, supports NL data queries, enabling self-service analytics for non-technical staff.",
    valueScorecard: {
      efficiency: { beforeZh: "2小时/天", beforeEn: "2 hrs/day", afterZh: "20分钟/天", afterEn: "20 min/day", metric: "6x" },
      productivity: { beforeZh: "5份/天", beforeEn: "5/day", afterZh: "15份/天", afterEn: "15/day", metric: "3x" },
      cost: { descZh: "节省1名数据分析师工作量", descEn: "Saves 1 data analyst's workload", metric: "-1人" },
      revenue: { descZh: "更快决策支持", descEn: "Faster decision support", metric: "+速度" },
      customer: { descZh: "内部用户自助分析", descEn: "Internal self-service analytics", metric: "+自助" },
    },
    efficiencyGain: "80%",
    score: calcScore(80, 90, 65, 60),
    relatedPromptIds: ["p-005"],
    relatedToolIds: ["t-001"],
    impactMetricZh: "报表时间-80%",
    impactMetricEn: "80% report time saved",
    oneLinerZh: "2小时报表→20分钟自动完成",
    oneLinerEn: "2-hour reports→20 min automated",
  },
  {
    id: "case-007",
    titleZh: "AI趋势预测辅助选品决策",
    titleEn: "AI Trend Prediction for Product Selection",
    subtitleZh: "提前3个月预测爆款，命中率提升40%",
    subtitleEn: "Predict hits 3 months ahead, 40% better accuracy",
    department: "merchandising",
    businessScenario: "merch-sourcing",
    businessFunction: "选品采购",
    maturityLevel: "L4",
    primaryValueType: "revenue",
    tools: ["Python", "ChatGPT", "Google Trends API", "Pinterest API"],
    tags: ["趋势预测", "选品", "数据驱动", "AI决策"],
    author: "吴磊",
    team: "商品企划组",
    date: "2026-02-10",
    featured: true,
    problemZh: "传统选品依赖买手经验，趋势判断滞后，爆款命中率仅30%，库存积压风险高。",
    problemEn: "Traditional selection relies on buyer experience, trend judgment lags, hit rate only 30%, high inventory risk.",
    approachZh: "整合Google Trends、Pinterest、TikTok等多平台趋势数据，AI模型预测未来3个月泳装趋势，辅助选品决策。",
    approachEn: "Integrated Google Trends, Pinterest, TikTok trend data, AI model predicts swimwear trends 3 months ahead, assisting selection decisions.",
    resultZh: "爆款命中率从30%提升至70%，库存周转率提升25%，滞销率下降18%。",
    resultEn: "Hit rate improved from 30% to 70%, inventory turnover +25%, slow-moving rate -18%.",
    valueScorecard: {
      efficiency: { beforeZh: "2周/趋势报告", beforeEn: "2 weeks/trend report", afterZh: "2天/趋势报告", afterEn: "2 days/trend report", metric: "7x" },
      productivity: { beforeZh: "月度趋势报告", beforeEn: "Monthly trend report", afterZh: "实时趋势监控", afterEn: "Real-time trend monitoring", metric: "实时" },
      cost: { descZh: "库存积压减少18%", descEn: "Inventory overstock reduced 18%", metric: "-18%" },
      revenue: { descZh: "爆款命中率提升至70%", descEn: "Hit rate improved to 70%", metric: "+40pp" },
      customer: { descZh: "更符合市场趋势的产品", descEn: "Products better aligned with market trends", metric: "+趋势" },
    },
    efficiencyGain: "133%",
    score: calcScore(95, 65, 90, 75),
    relatedPlaybookId: "pb-005",
    relatedPromptIds: [],
    relatedToolIds: ["t-001"],
    impactMetricZh: "命中率+40pp",
    impactMetricEn: "Hit rate +40pp",
    oneLinerZh: "爆款命中率30%→70%",
    oneLinerEn: "Hit rate 30%→70%",
  },
  {
    id: "case-008",
    titleZh: "AI产品描述SEO优化",
    titleEn: "AI Product Description SEO Optimization",
    subtitleZh: "商品页转化率提升12%",
    subtitleEn: "Product page conversion +12%",
    department: "operations",
    businessScenario: "ops-listing",
    businessFunction: "商品上架",
    maturityLevel: "L2",
    primaryValueType: "revenue",
    tools: ["ChatGPT", "SEMrush", "Python"],
    tags: ["SEO", "产品描述", "转化率", "内容优化"],
    author: "陈小明",
    team: "运营组",
    date: "2026-02-05",
    featured: false,
    problemZh: "500+SKU的产品描述需要针对Amazon和Shopify分别优化，人工撰写效率低且质量不一致。",
    problemEn: "500+ SKU descriptions need optimization for Amazon and Shopify separately, manual writing is slow and inconsistent.",
    approachZh: "使用ChatGPT批量生成SEO优化的产品描述，结合SEMrush关键词数据，A/B测试最佳版本。",
    approachEn: "Used ChatGPT for batch SEO-optimized descriptions, combined with SEMrush keyword data, A/B tested best versions.",
    resultZh: "500个SKU描述3天完成（原需3周），商品页转化率平均提升12%，自然搜索流量增长20%。",
    resultEn: "500 SKU descriptions completed in 3 days (originally 3 weeks), product page conversion +12%, organic search traffic +20%.",
    valueScorecard: {
      efficiency: { beforeZh: "3周/500SKU", beforeEn: "3 weeks/500 SKUs", afterZh: "3天/500SKU", afterEn: "3 days/500 SKUs", metric: "7x" },
      productivity: { beforeZh: "10个/天", beforeEn: "10/day", afterZh: "50个/天", afterEn: "50/day", metric: "5x" },
      cost: { descZh: "减少外包写手费用", descEn: "Reduced freelance writer costs", metric: "-60%" },
      revenue: { descZh: "转化率提升12%", descEn: "Conversion rate +12%", metric: "+12%" },
      customer: { descZh: "更清晰的产品信息", descEn: "Clearer product information", metric: "+清晰度" },
    },
    efficiencyGain: "600%",
    score: calcScore(82, 92, 60, 70),
    relatedPromptIds: ["p-008"],
    relatedToolIds: ["t-001"],
    impactMetricZh: "转化率+12%",
    impactMetricEn: "Conversion +12%",
    oneLinerZh: "500个SKU描述3天搞定",
    oneLinerEn: "500 SKU descriptions in 3 days",
  },
  {
    id: "case-009",
    titleZh: "AI需求预测优化库存管理",
    titleEn: "AI Demand Forecasting for Inventory Optimization",
    subtitleZh: "库存成本降低22%，缺货率下降35%",
    subtitleEn: "Inventory cost -22%, stockout rate -35%",
    department: "supply-chain",
    businessScenario: "supply-forecast",
    businessFunction: "需求预测",
    maturityLevel: "L4",
    primaryValueType: "cost",
    tools: ["Python", "TensorFlow", "ChatGPT", "SAP"],
    tags: ["需求预测", "库存优化", "供应链", "机器学习"],
    author: "刘强",
    team: "供应链管理组",
    date: "2026-01-18",
    featured: false,
    problemZh: "季节性泳装需求波动大，传统预测方法误差率高达30%，导致库存积压或缺货。",
    problemEn: "Seasonal swimwear demand fluctuates greatly, traditional forecasting error rate up to 30%, causing overstock or stockouts.",
    approachZh: "构建基于机器学习的需求预测模型，整合历史销售、天气、搜索趋势等多维数据，AI自动调整预测。",
    approachEn: "Built ML-based demand forecasting model, integrating historical sales, weather, search trends, AI auto-adjusts predictions.",
    resultZh: "预测准确率从70%提升至92%，库存成本降低22%，缺货率下降35%。",
    resultEn: "Forecast accuracy from 70% to 92%, inventory cost -22%, stockout rate -35%.",
    valueScorecard: {
      efficiency: { beforeZh: "月度手动预测", beforeEn: "Monthly manual forecast", afterZh: "实时自动预测", afterEn: "Real-time auto forecast", metric: "实时" },
      productivity: { beforeZh: "1份/月", beforeEn: "1/month", afterZh: "实时更新", afterEn: "Real-time updates", metric: "∞" },
      cost: { descZh: "库存成本降低22%", descEn: "Inventory cost reduced 22%", metric: "-22%" },
      revenue: { descZh: "缺货率下降减少损失", descEn: "Reduced stockout losses", metric: "-35%缺货" },
      customer: { descZh: "热门款式不断货", descEn: "Popular styles always in stock", metric: "+可用性" },
    },
    efficiencyGain: "314%",
    score: calcScore(92, 55, 88, 60),
    relatedToolIds: ["t-001"],
    impactMetricZh: "库存成本-22%",
    impactMetricEn: "Inventory cost -22%",
    oneLinerZh: "预测准确率70%→92%",
    oneLinerEn: "Forecast accuracy 70%→92%",
  },
  {
    id: "case-010",
    titleZh: "AI面料翻译与工艺描述标准化",
    titleEn: "AI Fabric Translation & Craft Description Standardization",
    subtitleZh: "翻译效率提升10倍，错误率降低95%",
    subtitleEn: "Translation efficiency 10x, error rate -95%",
    department: "operations",
    businessScenario: "ops-content",
    businessFunction: "内容运营",
    maturityLevel: "L1",
    primaryValueType: "efficiency",
    tools: ["ChatGPT", "Claude", "内部术语库"],
    tags: ["翻译", "面料", "标准化", "跨境"],
    author: "陈小明",
    team: "内容运营组",
    date: "2026-03-08",
    featured: false,
    problemZh: "中文面料和工艺描述翻译为英文时，专业术语不准确，不同翻译人员用词不一致。",
    problemEn: "Chinese fabric and craft descriptions translated to English with inaccurate terminology, inconsistent across translators.",
    approachZh: "建立面料术语库，结合ChatGPT和Claude进行上下文感知翻译，自动校验术语一致性。",
    approachEn: "Built fabric terminology database, combined ChatGPT and Claude for context-aware translation, auto-verified terminology consistency.",
    resultZh: "翻译效率提升10倍，术语错误率从15%降至0.8%，建立了300+条标准化术语库。",
    resultEn: "Translation efficiency 10x, terminology error rate from 15% to 0.8%, established 300+ standardized terms.",
    valueScorecard: {
      efficiency: { beforeZh: "30分钟/产品", beforeEn: "30 min/product", afterZh: "3分钟/产品", afterEn: "3 min/product", metric: "10x" },
      productivity: { beforeZh: "20产品/天", beforeEn: "20 products/day", afterZh: "200产品/天", afterEn: "200 products/day", metric: "10x" },
      cost: { descZh: "减少翻译外包费用", descEn: "Reduced translation outsourcing costs", metric: "-70%" },
      revenue: { descZh: "更准确的产品信息提升转化", descEn: "Accurate product info improves conversion", metric: "+转化" },
      customer: { descZh: "海外用户更好理解产品", descEn: "Better product understanding for overseas customers", metric: "+理解" },
    },
    efficiencyGain: "900%",
    score: calcScore(70, 95, 55, 65),
    relatedPromptIds: ["p-010"],
    relatedToolIds: ["t-001", "t-004"],
    impactMetricZh: "错误率-95%",
    impactMetricEn: "Error rate -95%",
    oneLinerZh: "翻译效率提升10倍",
    oneLinerEn: "Translation efficiency 10x",
  },
];

// --- Playbooks ---
export const aiPlaybooks: AIPlaybook[] = [
  {
    id: "pb-001",
    titleZh: "商品分析 Playbook",
    titleEn: "Product Analysis Playbook",
    descZh: "从数据准备到AI分析再到人工判断的完整商品分析方法论",
    descEn: "Complete product analysis methodology from data prep to AI analysis to human judgment",
    businessScenario: "merch-analysis",
    department: "merchandising",
    maturityLevel: "L2",
    steps: [
      { stepNumber: 1, titleZh: "数据准备", titleEn: "Data Preparation", descZh: "从ERP/数据仓库导出销售、库存、利润数据，确保数据完整性", descEn: "Export sales, inventory, margin data from ERP/DW, ensure data integrity", tools: ["Excel", "SQL"], durationZh: "30分钟", durationEn: "30 min" },
      { stepNumber: 2, titleZh: "AI数据清洗", titleEn: "AI Data Cleaning", descZh: "使用AI脚本自动清洗异常值、填充缺失值、标准化格式", descEn: "Use AI scripts to auto-clean outliers, fill missing values, standardize formats", tools: ["Python", "ChatGPT"], durationZh: "5分钟", durationEn: "5 min" },
      { stepNumber: 3, titleZh: "Prompt分析", titleEn: "Prompt Analysis", descZh: "使用标准化Prompt模板，让AI分析数据并生成洞察", descEn: "Use standardized prompt templates for AI data analysis and insight generation", tools: ["ChatGPT"], durationZh: "3分钟", durationEn: "3 min" },
      { stepNumber: 4, titleZh: "AI生成报告", titleEn: "AI Report Generation", descZh: "AI自动生成结构化分析报告，包含图表和建议", descEn: "AI auto-generates structured analysis report with charts and recommendations", tools: ["ChatGPT", "Python"], durationZh: "2分钟", durationEn: "2 min" },
      { stepNumber: 5, titleZh: "人工判断", titleEn: "Human Judgment", descZh: "分析师审核AI报告，结合业务经验做出最终决策", descEn: "Analyst reviews AI report, combines business experience for final decisions", durationZh: "20分钟", durationEn: "20 min" },
    ],
    relatedCaseIds: ["case-001"],
    relatedPromptIds: ["p-004"],
    author: "吴磊",
    usageCount: 156,
    rating: 4.8,
    date: "2026-02-15",
  },
  {
    id: "pb-002",
    titleZh: "广告创意AI全流程 Playbook",
    titleEn: "Ad Creative AI Full-Process Playbook",
    descZh: "从市场洞察到广告素材生成的端到端AI工作流",
    descEn: "End-to-end AI workflow from market insight to ad creative generation",
    businessScenario: "mktg-creative",
    department: "marketing",
    maturityLevel: "L3",
    steps: [
      { stepNumber: 1, titleZh: "市场趋势分析", titleEn: "Market Trend Analysis", descZh: "AI抓取和分析竞品广告数据和市场趋势", descEn: "AI scrapes and analyzes competitor ad data and market trends", tools: ["Python", "ChatGPT"], durationZh: "1小时", durationEn: "1 hour" },
      { stepNumber: 2, titleZh: "受众画像生成", titleEn: "Audience Persona Generation", descZh: "基于数据生成目标受众画像和偏好分析", descEn: "Generate target audience personas and preference analysis from data", tools: ["ChatGPT"], durationZh: "30分钟", durationEn: "30 min" },
      { stepNumber: 3, titleZh: "文案变体生成", titleEn: "Copy Variant Generation", descZh: "AI生成多版本广告文案，覆盖不同情感角度", descEn: "AI generates multi-version ad copy covering different emotional angles", tools: ["ChatGPT"], durationZh: "15分钟", durationEn: "15 min" },
      { stepNumber: 4, titleZh: "视觉素材生成", titleEn: "Visual Asset Generation", descZh: "AI生成配图变体，匹配不同文案风格", descEn: "AI generates image variants matching different copy styles", tools: ["Midjourney", "Adobe Firefly"], durationZh: "30分钟", durationEn: "30 min" },
      { stepNumber: 5, titleZh: "人工审核优化", titleEn: "Human Review & Optimization", descZh: "创意团队审核AI产出，进行品牌合规性检查和微调", descEn: "Creative team reviews AI output, brand compliance check and fine-tuning", durationZh: "1小时", durationEn: "1 hour" },
      { stepNumber: 6, titleZh: "A/B测试部署", titleEn: "A/B Test Deployment", descZh: "将最终素材部署到广告平台进行A/B测试", descEn: "Deploy final assets to ad platforms for A/B testing", tools: ["Meta Ads", "Google Ads"], durationZh: "30分钟", durationEn: "30 min" },
    ],
    relatedCaseIds: ["case-002"],
    relatedPromptIds: ["p-001"],
    author: "张明",
    usageCount: 89,
    rating: 4.9,
    date: "2026-02-20",
  },
  {
    id: "pb-003",
    titleZh: "智能客服知识库构建 Playbook",
    titleEn: "Smart CS Knowledge Base Playbook",
    descZh: "从历史工单到智能客服系统的完整构建方法",
    descEn: "Complete methodology from historical tickets to smart CS system",
    businessScenario: "ops-cs",
    department: "operations",
    maturityLevel: "L3",
    steps: [
      { stepNumber: 1, titleZh: "历史工单导出", titleEn: "Export Historical Tickets", descZh: "从CRM系统导出历史客服工单和FAQ数据", descEn: "Export historical CS tickets and FAQ data from CRM", tools: ["CRM", "Excel"], durationZh: "2小时", durationEn: "2 hours" },
      { stepNumber: 2, titleZh: "问题分类聚类", titleEn: "Issue Classification", descZh: "AI自动对问题进行分类和聚类分析", descEn: "AI auto-classifies and clusters issues", tools: ["Python", "ChatGPT"], durationZh: "1小时", durationEn: "1 hour" },
      { stepNumber: 3, titleZh: "知识条目生成", titleEn: "Knowledge Entry Generation", descZh: "AI生成标准化知识条目和最佳回复模板", descEn: "AI generates standardized knowledge entries and best reply templates", tools: ["ChatGPT"], durationZh: "2小时", durationEn: "2 hours" },
      { stepNumber: 4, titleZh: "向量化存储", titleEn: "Vector Storage", descZh: "将知识条目向量化并存储到向量数据库", descEn: "Vectorize knowledge entries and store in vector database", tools: ["Pinecone", "Python"], durationZh: "1小时", durationEn: "1 hour" },
      { stepNumber: 5, titleZh: "RAG系统部署", titleEn: "RAG System Deployment", descZh: "部署RAG检索增强生成系统，连接客服前端", descEn: "Deploy RAG retrieval-augmented generation system, connect to CS frontend", tools: ["Dify", "OpenAI API"], durationZh: "4小时", durationEn: "4 hours" },
      { stepNumber: 6, titleZh: "持续优化", titleEn: "Continuous Optimization", descZh: "监控回复质量，收集反馈，持续优化知识库", descEn: "Monitor reply quality, collect feedback, continuously optimize knowledge base", durationZh: "持续", durationEn: "Ongoing" },
    ],
    relatedCaseIds: ["case-003"],
    relatedPromptIds: ["p-006"],
    author: "赵丽",
    usageCount: 67,
    rating: 4.7,
    date: "2026-02-25",
  },
  {
    id: "pb-004",
    titleZh: "AI辅助设计出图 Playbook",
    titleEn: "AI-Assisted Design Production Playbook",
    descZh: "从灵感收集到成品输出的AI辅助设计全流程",
    descEn: "Full AI-assisted design process from inspiration to final output",
    businessScenario: "design-concept",
    department: "creative",
    maturityLevel: "L2",
    steps: [
      { stepNumber: 1, titleZh: "灵感收集与分析", titleEn: "Inspiration Collection", descZh: "AI抓取Pinterest、Instagram等平台趋势图片，分析流行元素", descEn: "AI scrapes Pinterest, Instagram trend images, analyzes popular elements", tools: ["Python", "Pinterest API"], durationZh: "30分钟", durationEn: "30 min" },
      { stepNumber: 2, titleZh: "概念生成", titleEn: "Concept Generation", descZh: "使用AI生成多个设计概念方案和配色建议", descEn: "Use AI to generate multiple design concepts and color suggestions", tools: ["Midjourney", "ChatGPT"], durationZh: "1小时", durationEn: "1 hour" },
      { stepNumber: 3, titleZh: "设计细化", titleEn: "Design Refinement", descZh: "设计师选择最佳概念，使用AI工具进行细化和变体生成", descEn: "Designer selects best concept, uses AI tools for refinement and variants", tools: ["Midjourney", "Stable Diffusion"], durationZh: "2小时", durationEn: "2 hours" },
      { stepNumber: 4, titleZh: "效果图渲染", titleEn: "Rendering", descZh: "使用CLO 3D进行虚拟打样和效果图渲染", descEn: "Use CLO 3D for virtual sampling and rendering", tools: ["CLO 3D"], durationZh: "1小时", durationEn: "1 hour" },
      { stepNumber: 5, titleZh: "评审与定稿", titleEn: "Review & Finalize", descZh: "团队评审AI辅助设计成果，确定最终方案", descEn: "Team reviews AI-assisted design output, finalizes the design", durationZh: "30分钟", durationEn: "30 min" },
    ],
    relatedCaseIds: ["case-004"],
    relatedPromptIds: ["p-003"],
    author: "周婷",
    usageCount: 45,
    rating: 4.6,
    date: "2026-03-01",
  },
  {
    id: "pb-005",
    titleZh: "AI趋势研究与选品 Playbook",
    titleEn: "AI Trend Research & Selection Playbook",
    descZh: "从趋势发现到选品决策的AI辅助全流程",
    descEn: "Full AI-assisted process from trend discovery to selection decisions",
    businessScenario: "merch-sourcing",
    department: "merchandising",
    maturityLevel: "L4",
    steps: [
      { stepNumber: 1, titleZh: "趋势数据采集", titleEn: "Trend Data Collection", descZh: "自动抓取Google Trends、Pinterest、TikTok等平台数据", descEn: "Auto-scrape Google Trends, Pinterest, TikTok platform data", tools: ["Python", "API"], durationZh: "自动", durationEn: "Auto" },
      { stepNumber: 2, titleZh: "趋势分析预测", titleEn: "Trend Analysis & Prediction", descZh: "AI模型分析趋势数据，预测未来3个月流行趋势", descEn: "AI model analyzes trend data, predicts trends 3 months ahead", tools: ["Python", "ChatGPT"], durationZh: "1小时", durationEn: "1 hour" },
      { stepNumber: 3, titleZh: "竞品对标分析", titleEn: "Competitor Benchmarking", descZh: "AI分析竞品新品和畅销款，找到差异化机会", descEn: "AI analyzes competitor new arrivals and bestsellers, finds differentiation opportunities", tools: ["ChatGPT", "Python"], durationZh: "30分钟", durationEn: "30 min" },
      { stepNumber: 4, titleZh: "选品方案生成", titleEn: "Selection Plan Generation", descZh: "AI综合趋势、竞品、历史数据生成选品建议方案", descEn: "AI combines trends, competitors, historical data to generate selection recommendations", tools: ["ChatGPT"], durationZh: "15分钟", durationEn: "15 min" },
      { stepNumber: 5, titleZh: "商品企划评审", titleEn: "Merchandising Review", descZh: "商品团队评审AI建议，结合供应链能力做最终决策", descEn: "Merchandising team reviews AI suggestions, combines with supply chain capabilities for final decisions", durationZh: "2小时", durationEn: "2 hours" },
    ],
    relatedCaseIds: ["case-007"],
    relatedPromptIds: [],
    author: "吴磊",
    usageCount: 34,
    rating: 4.5,
    date: "2026-02-28",
  },
];

// --- Enhanced AI Tools ---
export const enhancedTools: AITool[] = [
  { id: "t-001", name: "ChatGPT", categoryZh: "通用AI", categoryEn: "General AI", descZh: "OpenAI通用对话AI，支持文本生成、分析、编程", descEn: "OpenAI general-purpose AI for text, analysis, coding", statusZh: "已批准", statusEn: "Approved", useCasesZh: ["文案生成", "数据分析", "代码编写", "报告生成"], useCasesEn: ["Copywriting", "Data analysis", "Coding", "Report generation"], departments: ["all"], usageCount: 4200 },
  { id: "t-002", name: "Midjourney", categoryZh: "AI设计", categoryEn: "AI Design", descZh: "AI图像生成工具，适用于设计灵感和素材创作", descEn: "AI image generation for design inspiration and asset creation", statusZh: "已批准", statusEn: "Approved", useCasesZh: ["设计概念", "广告素材", "产品渲染"], useCasesEn: ["Design concepts", "Ad creatives", "Product rendering"], departments: ["creative", "marketing"], usageCount: 1800 },
  { id: "t-003", name: "Cursor", categoryZh: "AI编程", categoryEn: "AI Coding", descZh: "AI驱动的代码编辑器，支持自然语言编程", descEn: "AI-powered code editor with natural language programming", statusZh: "已批准", statusEn: "Approved", useCasesZh: ["代码开发", "脚本编写", "自动化"], useCasesEn: ["Development", "Scripting", "Automation"], departments: ["it", "data"], usageCount: 950 },
  { id: "t-004", name: "Claude", categoryZh: "通用AI", categoryEn: "General AI", descZh: "Anthropic长文本AI助手，擅长分析和写作", descEn: "Anthropic long-context AI, excels at analysis and writing", statusZh: "已批准", statusEn: "Approved", useCasesZh: ["长文档分析", "策略报告", "翻译"], useCasesEn: ["Long doc analysis", "Strategy reports", "Translation"], departments: ["all"], usageCount: 2100 },
  { id: "t-005", name: "Dify", categoryZh: "AI平台", categoryEn: "AI Platform", descZh: "开源AI应用开发平台，支持RAG和Agent构建", descEn: "Open-source AI app platform for RAG and Agent building", statusZh: "已批准", statusEn: "Approved", useCasesZh: ["知识库构建", "Agent开发", "工作流编排"], useCasesEn: ["Knowledge base", "Agent development", "Workflow orchestration"], departments: ["it", "operations"], usageCount: 680 },
  { id: "t-006", name: "Stable Diffusion", categoryZh: "AI设计", categoryEn: "AI Design", descZh: "开源图像生成模型，支持本地部署和定制化", descEn: "Open-source image generation model, supports local deployment", statusZh: "已批准", statusEn: "Approved", useCasesZh: ["设计出图", "产品渲染", "风格迁移"], useCasesEn: ["Design production", "Product rendering", "Style transfer"], departments: ["creative"], usageCount: 520 },
  { id: "t-007", name: "Python + Pandas", categoryZh: "数据工具", categoryEn: "Data Tools", descZh: "数据处理和分析编程环境", descEn: "Data processing and analysis programming environment", statusZh: "已批准", statusEn: "Approved", useCasesZh: ["数据清洗", "统计分析", "自动化脚本"], useCasesEn: ["Data cleaning", "Statistical analysis", "Automation scripts"], departments: ["data", "it", "merchandising"], usageCount: 3100 },
  { id: "t-008", name: "CLO 3D", categoryZh: "设计工具", categoryEn: "Design Tools", descZh: "3D虚拟打样软件，支持AI辅助设计", descEn: "3D virtual sampling software with AI-assisted design", statusZh: "已批准", statusEn: "Approved", useCasesZh: ["虚拟打样", "3D渲染", "面料模拟"], useCasesEn: ["Virtual sampling", "3D rendering", "Fabric simulation"], departments: ["creative"], usageCount: 340 },
];

// --- Department Maturity Map ---
export interface DeptMaturity {
  departmentZh: string;
  departmentEn: string;
  level: MaturityLevel;
  score: number; // 1.0 - 5.0
  cases: number;
  topScenarioZh: string;
  topScenarioEn: string;
}

export const departmentMaturityMap: DeptMaturity[] = [
  { departmentZh: "互联网研发中心", departmentEn: "Internet R&D Center", level: "L4", score: 3.8, cases: 42, topScenarioZh: "数据报表/自动化开发", topScenarioEn: "Data Reporting / Automation Dev" },
  { departmentZh: "营销中心", departmentEn: "Marketing Center", level: "L3", score: 3.2, cases: 18, topScenarioZh: "广告创意", topScenarioEn: "Ad Creative" },
  { departmentZh: "运营中心", departmentEn: "Operation Center", level: "L3", score: 3.0, cases: 15, topScenarioZh: "客服", topScenarioEn: "Customer Service" },
  { departmentZh: "创意中心", departmentEn: "Creative Center", level: "L2", score: 2.6, cases: 12, topScenarioZh: "设计概念", topScenarioEn: "Design Concept" },
  { departmentZh: "产品中心", departmentEn: "Product Center", level: "L2", score: 2.4, cases: 9, topScenarioZh: "商品分析", topScenarioEn: "Product Analysis" },
  { departmentZh: "生产供应链中心", departmentEn: "Production & Supply Chain", level: "L1", score: 1.8, cases: 6, topScenarioZh: "需求预测", topScenarioEn: "Demand Forecast" },
  { departmentZh: "人力资源中心", departmentEn: "Human Resource Center", level: "L1", score: 1.4, cases: 4, topScenarioZh: "招聘筛选", topScenarioEn: "Recruitment Screening" },
  { departmentZh: "财务中心", departmentEn: "Finance Center", level: "L1", score: 1.2, cases: 2, topScenarioZh: "财务报表", topScenarioEn: "Financial Reporting" },
  { departmentZh: "仓储物流中心", departmentEn: "Warehousing & Logistics", level: "L1", score: 1.1, cases: 2, topScenarioZh: "路线优化", topScenarioEn: "Route Optimization" },
  { departmentZh: "多渠道事业部", departmentEn: "Multi Channel Business", level: "L2", score: 2.0, cases: 5, topScenarioZh: "渠道分析", topScenarioEn: "Channel Analysis" },
];

// --- AI Transformation Dashboard (for CEO) ---
export const aiTransformationDashboard = {
  totalCases: 86,
  activeUsers: 420,
  efficiencyGain: 32,
  avgMaturityScore: 2.4,
  avgMaturityLevel: "L2.4" as string,
  caseOfWeekId: "case-002",
  caseOfMonthId: "case-001",
  weeklyNewCases: 5,
  monthlyNewCases: 18,
  topDepartmentZh: "互联网研发中心",
  topDepartmentEn: "Internet R&D Center",
};
