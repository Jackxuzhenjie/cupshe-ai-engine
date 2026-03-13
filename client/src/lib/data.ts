// ============================================================
// CUPSHE AI Transformation Engine - Seed Data
// Design: Warm Professional / McKinsey-style consulting aesthetic
// ============================================================

// --- KPI Data ---
export const kpiData = {
  aiPenetration: { value: 67, change: 12, target: 85 },
  efficiencyImprovement: { value: 34, change: 8, target: 50 },
  aiCasesCount: { value: 128, change: 23, target: 200 },
  challengeParticipation: { value: 78, change: 15, target: 90 },
  totalPoints: 45600,
  activeChallenges: 8,
  openWishes: 24,
  skillUnlockRate: 56,
};

// --- Departments ---
export const departments = [
  { id: "marketing", zh: "市场营销中心", en: "Marketing" },
  { id: "creative", zh: "创意设计中心", en: "Creative Design" },
  { id: "merchandising", zh: "商品企划中心", en: "Merchandising" },
  { id: "operations", zh: "运营中心", en: "Operations" },
  { id: "supply-chain", zh: "供应链中心", en: "Supply Chain" },
  { id: "data", zh: "数据中心", en: "Data & Analytics" },
  { id: "it", zh: "IT技术中心", en: "IT & Technology" },
  { id: "hr", zh: "人力资源中心", en: "Human Resources" },
];

// --- Newsletter Issues ---
export interface NewsletterIssue {
  id: string;
  issue: number;
  date: string;
  titleZh: string;
  titleEn: string;
  summaryZh: string;
  summaryEn: string;
  blocks: NewsletterBlock[];
  coverImage?: string;
}

export interface NewsletterBlock {
  type: string;
  titleZh: string;
  titleEn: string;
  contentZh: string;
  contentEn: string;
}

export const newsletterIssues: NewsletterIssue[] = [
  {
    id: "nl-001",
    issue: 12,
    date: "2026-03-10",
    titleZh: "CUPSHE AI周刊 · 第12期",
    titleEn: "CUPSHE AI Weekly · Issue 12",
    summaryZh: "本周亮点：AI驱动的商品推荐系统上线，效率提升40%；创意中心完成首个AI辅助设计项目",
    summaryEn: "Highlights: AI-powered product recommendation system launched with 40% efficiency gain; Creative Center completes first AI-assisted design project",
    coverImage: "https://d2xsxph8kpxj0f.cloudfront.net/310519663405149767/QM6nYWAxuWeZFy253dxUZB/newsletter-banner-KBcECZfNbZYfGdKDjUrum3.webp",
    blocks: [
      {
        type: "ai-minute",
        titleZh: "AI时代一分钟",
        titleEn: "AI Minute",
        contentZh: "OpenAI发布GPT-5，多模态能力大幅提升。Google推出Gemini 2.0 Ultra，在代码生成和数据分析领域表现突出。Meta开源Llama 4，推动企业级AI应用普及。",
        contentEn: "OpenAI releases GPT-5 with significantly enhanced multimodal capabilities. Google launches Gemini 2.0 Ultra, excelling in code generation and data analysis. Meta open-sources Llama 4, driving enterprise AI adoption.",
      },
      {
        type: "company-progress",
        titleZh: "公司AI进展",
        titleEn: "Company AI Progress",
        contentZh: "本周AI渗透率提升至67%，较上月增长12个百分点。商品企划中心完成AI选品模型部署，预计Q2实现全品类覆盖。运营中心启动AI客服助手试点项目。",
        contentEn: "AI penetration rate increased to 67% this week, up 12 percentage points from last month. Merchandising Center completed AI product selection model deployment, expected to achieve full category coverage in Q2. Operations Center launched AI customer service assistant pilot.",
      },
      {
        type: "weekly-case",
        titleZh: "本周AI案例",
        titleEn: "Weekly AI Case",
        contentZh: "【市场营销中心】利用AI进行广告素材A/B测试自动化，将测试周期从5天缩短至1天，广告ROI提升23%。团队使用了ChatGPT + Midjourney + 内部数据平台的组合方案。",
        contentEn: "[Marketing Center] Automated ad creative A/B testing using AI, reducing test cycles from 5 days to 1 day, improving ad ROI by 23%. The team used a combination of ChatGPT + Midjourney + internal data platform.",
      },
      {
        type: "skill-unlock",
        titleZh: "AI技能解锁",
        titleEn: "AI Skill Unlock",
        contentZh: "本周新增32人解锁「Prompt Engineering基础」技能，15人完成「AI数据分析」进阶课程。累计技能解锁率达56%。",
        contentEn: "32 new employees unlocked 'Prompt Engineering Basics' this week, 15 completed the 'AI Data Analysis' advanced course. Cumulative skill unlock rate reached 56%.",
      },
      {
        type: "tool-recommendation",
        titleZh: "AI工具推荐",
        titleEn: "AI Tool Recommendation",
        contentZh: "本周推荐：Cursor IDE — 基于AI的代码编辑器，支持自然语言编程，已获IT中心批准使用。适合开发团队提升编码效率。",
        contentEn: "This week's pick: Cursor IDE — AI-powered code editor supporting natural language programming, approved by IT Center. Ideal for development teams to boost coding efficiency.",
      },
      {
        type: "challenge",
        titleZh: "AI Challenge",
        titleEn: "AI Challenge",
        contentZh: "本周挑战：用AI工具在30分钟内完成一份竞品分析报告。已有45人参与，最佳方案将在下期周刊中展示。",
        contentEn: "This week's challenge: Complete a competitor analysis report using AI tools within 30 minutes. 45 participants so far, best solution will be featured in next issue.",
      },
      {
        type: "leaderboard",
        titleZh: "排行榜速览",
        titleEn: "Leaderboard Snapshot",
        contentZh: "本周积分榜TOP3：1. 张明（数据中心）1,280分 2. 李芳（市场营销）1,150分 3. 王强（IT技术）980分",
        contentEn: "Top 3 this week: 1. Zhang Ming (Data Center) 1,280pts 2. Li Fang (Marketing) 1,150pts 3. Wang Qiang (IT) 980pts",
      },
      {
        type: "trend",
        titleZh: "AI趋势观察",
        titleEn: "AI Trend Watch",
        contentZh: "AI Agent正在从概念走向落地。Salesforce、ServiceNow等企业软件巨头纷纷推出AI Agent产品。建议各中心关注如何将重复性工作流程转化为AI Agent自动化。",
        contentEn: "AI Agents are moving from concept to implementation. Enterprise software giants like Salesforce and ServiceNow are launching AI Agent products. Centers should explore converting repetitive workflows into AI Agent automation.",
      },
    ],
  },
  {
    id: "nl-002",
    issue: 11,
    date: "2026-03-03",
    titleZh: "CUPSHE AI周刊 · 第11期",
    titleEn: "CUPSHE AI Weekly · Issue 11",
    summaryZh: "AI赋能供应链优化取得突破性进展，库存周转率提升18%",
    summaryEn: "AI-powered supply chain optimization achieves breakthrough, inventory turnover improved by 18%",
    blocks: [],
  },
  {
    id: "nl-003",
    issue: 10,
    date: "2026-02-24",
    titleZh: "CUPSHE AI周刊 · 第10期",
    titleEn: "CUPSHE AI Weekly · Issue 10",
    summaryZh: "公司AI转型里程碑：AI渗透率突破50%，半数以上员工已使用AI工具",
    summaryEn: "Company AI transformation milestone: AI penetration exceeds 50%, more than half of employees using AI tools",
    blocks: [],
  },
];

// --- Wishes ---
export interface Wish {
  id: string;
  titleZh: string;
  titleEn: string;
  descriptionZh: string;
  descriptionEn: string;
  department: string;
  role: string;
  status: "submitted" | "triaged" | "in-progress" | "solved" | "converted";
  urgency: "high" | "medium" | "low";
  votes: number;
  tags: string[];
  author: string;
  date: string;
  benefitZh: string;
  benefitEn: string;
}

export const wishes: Wish[] = [
  {
    id: "w-001",
    titleZh: "自动生成周报",
    titleEn: "Auto-generate Weekly Reports",
    descriptionZh: "每周需要花费3-4小时整理各渠道数据并撰写周报，希望能有AI工具自动汇总数据并生成初稿。",
    descriptionEn: "Spending 3-4 hours weekly compiling data from various channels and writing reports. Need an AI tool to auto-summarize data and generate drafts.",
    department: "operations",
    role: "运营专员",
    status: "in-progress",
    urgency: "high",
    votes: 56,
    tags: ["效率提升", "数据分析", "自动化"],
    author: "陈小明",
    date: "2026-02-15",
    benefitZh: "预计每周节省3小时，全团队年节省约780小时",
    benefitEn: "Expected to save 3 hours/week, ~780 hours/year for the whole team",
  },
  {
    id: "w-002",
    titleZh: "AI辅助评论分析",
    titleEn: "AI-assisted Review Analysis",
    descriptionZh: "需要分析Amazon、独立站等平台上的用户评论，提取产品改进建议和消费者情感趋势。目前人工分析效率低且容易遗漏关键信息。",
    descriptionEn: "Need to analyze user reviews from Amazon, DTC sites to extract product improvement suggestions and consumer sentiment trends. Manual analysis is inefficient and prone to missing key insights.",
    department: "merchandising",
    role: "商品企划经理",
    status: "triaged",
    urgency: "high",
    votes: 43,
    tags: ["NLP", "用户洞察", "商品优化"],
    author: "李婷",
    date: "2026-02-20",
    benefitZh: "提升产品迭代速度50%，减少差评率",
    benefitEn: "Improve product iteration speed by 50%, reduce negative review rate",
  },
  {
    id: "w-003",
    titleZh: "AI生成社媒内容",
    titleEn: "AI-generated Social Media Content",
    descriptionZh: "社交媒体团队每天需要产出大量内容，包括文案、图片和短视频脚本。希望AI能辅助生成初稿，人工只需审核和微调。",
    descriptionEn: "Social media team needs to produce large volumes of content daily including copy, images, and short video scripts. Want AI to generate drafts for human review and fine-tuning.",
    department: "marketing",
    role: "社媒运营",
    status: "submitted",
    urgency: "medium",
    votes: 38,
    tags: ["内容创作", "社交媒体", "创意"],
    author: "王芳",
    date: "2026-03-01",
    benefitZh: "内容产出效率提升60%，释放创意团队精力",
    benefitEn: "Improve content output efficiency by 60%, free up creative team capacity",
  },
  {
    id: "w-004",
    titleZh: "智能客服知识库",
    titleEn: "Smart Customer Service Knowledge Base",
    descriptionZh: "客服团队面对大量重复性问题，希望建立AI驱动的智能知识库，自动匹配最佳回复方案。",
    descriptionEn: "Customer service team handles many repetitive questions. Want to build an AI-driven smart knowledge base that auto-matches best response solutions.",
    department: "operations",
    role: "客服主管",
    status: "solved",
    urgency: "high",
    votes: 67,
    tags: ["客服", "知识库", "自动化"],
    author: "赵丽",
    date: "2026-01-10",
    benefitZh: "客服响应时间缩短70%，客户满意度提升15%",
    benefitEn: "Reduce response time by 70%, improve customer satisfaction by 15%",
  },
  {
    id: "w-005",
    titleZh: "AI辅助面料选择",
    titleEn: "AI-assisted Fabric Selection",
    descriptionZh: "希望利用AI分析历史销售数据和趋势预测，辅助面料采购决策，减少库存积压。",
    descriptionEn: "Want to use AI to analyze historical sales data and trend forecasts to assist fabric procurement decisions and reduce inventory backlog.",
    department: "supply-chain",
    role: "采购经理",
    status: "triaged",
    urgency: "medium",
    votes: 29,
    tags: ["供应链", "预测", "采购"],
    author: "刘强",
    date: "2026-02-28",
    benefitZh: "降低面料库存积压20%，节省采购成本",
    benefitEn: "Reduce fabric inventory backlog by 20%, save procurement costs",
  },
];

// --- Challenges ---
export interface Challenge {
  id: string;
  titleZh: string;
  titleEn: string;
  descriptionZh: string;
  descriptionEn: string;
  owner: string;
  department: string;
  deadline: string;
  rewardZh: string;
  rewardEn: string;
  status: "draft" | "open" | "review" | "winner" | "published";
  type: "weekly" | "monthly";
  participants: number;
  submissions: number;
}

export const challenges: Challenge[] = [
  {
    id: "c-001",
    titleZh: "30分钟AI竞品分析挑战",
    titleEn: "30-Min AI Competitor Analysis Challenge",
    descriptionZh: "使用任意AI工具，在30分钟内完成一份完整的竞品分析报告，包含市场定位、产品对比、价格策略和营销策略分析。",
    descriptionEn: "Using any AI tool, complete a comprehensive competitor analysis report within 30 minutes, including market positioning, product comparison, pricing strategy, and marketing strategy analysis.",
    owner: "市场营销中心",
    department: "marketing",
    deadline: "2026-03-20",
    rewardZh: "500积分 + AI Builder徽章 + 全公司展示",
    rewardEn: "500 points + AI Builder badge + company-wide showcase",
    status: "open",
    type: "weekly",
    participants: 45,
    submissions: 12,
  },
  {
    id: "c-002",
    titleZh: "AI驱动的用户画像构建",
    titleEn: "AI-Driven User Persona Building",
    descriptionZh: "利用AI工具分析用户行为数据，构建精准的用户画像。要求包含数据来源说明、分析方法、画像输出和应用建议。",
    descriptionEn: "Use AI tools to analyze user behavior data and build precise user personas. Must include data source description, analysis methodology, persona output, and application recommendations.",
    owner: "数据中心",
    department: "data",
    deadline: "2026-03-31",
    rewardZh: "1000积分 + AI Architect徽章 + 项目预算支持",
    rewardEn: "1000 points + AI Architect badge + project budget support",
    status: "open",
    type: "monthly",
    participants: 28,
    submissions: 5,
  },
  {
    id: "c-003",
    titleZh: "AI创意设计马拉松",
    titleEn: "AI Creative Design Marathon",
    descriptionZh: "使用AI工具完成一组夏季泳装系列的设计概念，包含5个SKU的设计稿、配色方案和面料建议。",
    descriptionEn: "Use AI tools to complete a summer swimwear collection design concept, including design drafts for 5 SKUs, color schemes, and fabric recommendations.",
    owner: "创意设计中心",
    department: "creative",
    deadline: "2026-04-15",
    rewardZh: "800积分 + 设计之星徽章 + 作品展示",
    rewardEn: "800 points + Design Star badge + work showcase",
    status: "open",
    type: "monthly",
    participants: 18,
    submissions: 3,
  },
  {
    id: "c-004",
    titleZh: "Prompt优化大赛",
    titleEn: "Prompt Optimization Contest",
    descriptionZh: "针对日常工作场景，编写最高效的Prompt模板。评选标准：实用性、通用性、输出质量。",
    descriptionEn: "Write the most efficient Prompt templates for daily work scenarios. Criteria: practicality, universality, output quality.",
    owner: "IT技术中心",
    department: "it",
    deadline: "2026-03-25",
    rewardZh: "300积分 + Prompt Master徽章",
    rewardEn: "300 points + Prompt Master badge",
    status: "review",
    type: "weekly",
    participants: 62,
    submissions: 38,
  },
];

// --- Bounty Tasks ---
export interface BountyTask {
  id: string;
  titleZh: string;
  titleEn: string;
  descriptionZh: string;
  descriptionEn: string;
  department: string;
  rewardType: string;
  rewardZh: string;
  rewardEn: string;
  status: "open" | "claimed" | "review" | "completed";
  difficulty: "easy" | "medium" | "hard";
  deadline: string;
  claimedBy?: string;
}

export const bountyTasks: BountyTask[] = [
  {
    id: "b-001",
    titleZh: "广告ROI智能优化方案",
    titleEn: "Ad ROI Smart Optimization Solution",
    descriptionZh: "设计一套基于AI的广告投放ROI优化方案，需要能自动调整出价策略和受众定向。要求提供完整的技术方案和POC演示。",
    descriptionEn: "Design an AI-based ad placement ROI optimization solution that can automatically adjust bidding strategies and audience targeting. Must provide complete technical proposal and POC demo.",
    department: "marketing",
    rewardType: "budget",
    rewardZh: "5000元项目预算 + 1500积分 + 全公司展示",
    rewardEn: "$700 project budget + 1500 points + company-wide showcase",
    status: "open",
    difficulty: "hard",
    deadline: "2026-04-30",
  },
  {
    id: "b-002",
    titleZh: "用户评论情感分析工具",
    titleEn: "User Review Sentiment Analysis Tool",
    descriptionZh: "开发一个能自动分析多平台用户评论的情感分析工具，支持中英文，输出情感趋势报告和关键词云。",
    descriptionEn: "Develop a sentiment analysis tool that automatically analyzes user reviews across multiple platforms, supporting Chinese and English, outputting sentiment trend reports and keyword clouds.",
    department: "merchandising",
    rewardType: "recognition",
    rewardZh: "1000积分 + AI Pioneer徽章 + 内部技术分享机会",
    rewardEn: "1000 points + AI Pioneer badge + internal tech sharing opportunity",
    status: "claimed",
    difficulty: "medium",
    deadline: "2026-04-15",
    claimedBy: "张明",
  },
  {
    id: "b-003",
    titleZh: "自动化周报生成器",
    titleEn: "Automated Weekly Report Generator",
    descriptionZh: "构建一个能自动从各数据源抓取数据并生成格式化周报的工具。需支持自定义模板和多部门适配。",
    descriptionEn: "Build a tool that automatically fetches data from various sources and generates formatted weekly reports. Must support custom templates and multi-department adaptation.",
    department: "operations",
    rewardType: "points",
    rewardZh: "800积分 + Automation Hero徽章",
    rewardEn: "800 points + Automation Hero badge",
    status: "review",
    difficulty: "medium",
    deadline: "2026-03-31",
    claimedBy: "李芳",
  },
  {
    id: "b-004",
    titleZh: "AI面料趋势预测模型",
    titleEn: "AI Fabric Trend Prediction Model",
    descriptionZh: "利用历史销售数据和时尚趋势数据，构建面料流行趋势预测模型，辅助下季度采购决策。",
    descriptionEn: "Using historical sales data and fashion trend data, build a fabric trend prediction model to assist next quarter's procurement decisions.",
    department: "supply-chain",
    rewardType: "budget",
    rewardZh: "3000元项目预算 + 1200积分",
    rewardEn: "$420 project budget + 1200 points",
    status: "open",
    difficulty: "hard",
    deadline: "2026-05-15",
  },
];

// --- Skills ---
export interface Skill {
  id: string;
  titleZh: string;
  titleEn: string;
  descriptionZh: string;
  descriptionEn: string;
  layer: "foundation" | "role" | "process" | "system";
  level: number;
  maxLevel: number;
  unlockCriteria: string;
  track: string;
  progress: number;
}

export const skills: Skill[] = [
  {
    id: "s-001",
    titleZh: "Prompt Engineering基础",
    titleEn: "Prompt Engineering Basics",
    descriptionZh: "掌握与AI大模型有效沟通的基本技巧，包括指令设计、上下文管理和输出格式控制。",
    descriptionEn: "Master basic techniques for effective communication with AI models, including instruction design, context management, and output format control.",
    layer: "foundation",
    level: 1,
    maxLevel: 3,
    unlockCriteria: "完成在线课程 + 提交3个Prompt案例",
    track: "all",
    progress: 78,
  },
  {
    id: "s-002",
    titleZh: "AI数据分析",
    titleEn: "AI Data Analysis",
    descriptionZh: "使用AI工具进行数据清洗、分析和可视化，能够从数据中提取商业洞察。",
    descriptionEn: "Use AI tools for data cleaning, analysis, and visualization, extracting business insights from data.",
    layer: "role",
    level: 2,
    maxLevel: 4,
    unlockCriteria: "完成数据分析项目 + 通过技能评估",
    track: "data",
    progress: 45,
  },
  {
    id: "s-003",
    titleZh: "AI辅助设计",
    titleEn: "AI-Assisted Design",
    descriptionZh: "掌握Midjourney、DALL-E等AI设计工具，能够快速生成设计概念和素材。",
    descriptionEn: "Master AI design tools like Midjourney and DALL-E, quickly generating design concepts and assets.",
    layer: "role",
    level: 2,
    maxLevel: 4,
    unlockCriteria: "完成AI设计作品集 + 参与设计挑战",
    track: "creative",
    progress: 62,
  },
  {
    id: "s-004",
    titleZh: "AI营销自动化",
    titleEn: "AI Marketing Automation",
    descriptionZh: "利用AI实现营销流程自动化，包括内容生成、受众分析、广告优化和效果追踪。",
    descriptionEn: "Leverage AI for marketing automation, including content generation, audience analysis, ad optimization, and performance tracking.",
    layer: "process",
    level: 3,
    maxLevel: 4,
    unlockCriteria: "完成营销自动化项目 + 提交效果报告",
    track: "marketing",
    progress: 30,
  },
  {
    id: "s-005",
    titleZh: "AI工具集成与部署",
    titleEn: "AI Tool Integration & Deployment",
    descriptionZh: "具备将AI工具集成到现有业务系统的能力，包括API对接、工作流设计和系统部署。",
    descriptionEn: "Ability to integrate AI tools into existing business systems, including API integration, workflow design, and system deployment.",
    layer: "system",
    level: 4,
    maxLevel: 5,
    unlockCriteria: "完成系统集成项目 + 通过技术评审",
    track: "it",
    progress: 15,
  },
  {
    id: "s-006",
    titleZh: "AI商品选品",
    titleEn: "AI Product Selection",
    descriptionZh: "使用AI分析市场趋势和消费者偏好，辅助商品选品和品类规划决策。",
    descriptionEn: "Use AI to analyze market trends and consumer preferences, assisting product selection and category planning decisions.",
    layer: "role",
    level: 2,
    maxLevel: 4,
    unlockCriteria: "完成选品分析项目 + 准确率达标",
    track: "merchandising",
    progress: 52,
  },
];

// --- Cases ---
export interface AICase {
  id: string;
  titleZh: string;
  titleEn: string;
  problemZh: string;
  problemEn: string;
  approachZh: string;
  approachEn: string;
  resultZh: string;
  resultEn: string;
  efficiencyGain: string;
  department: string;
  team: string;
  tools: string[];
  tags: string[];
  date: string;
  featured: boolean;
}

export const aiCases: AICase[] = [
  {
    id: "case-001",
    titleZh: "AI驱动广告素材A/B测试自动化",
    titleEn: "AI-Driven Ad Creative A/B Testing Automation",
    problemZh: "广告素材测试周期长（5天），人工分析效率低，无法快速迭代优化。",
    problemEn: "Long ad creative testing cycles (5 days), inefficient manual analysis, unable to iterate quickly.",
    approachZh: "使用ChatGPT生成多版本广告文案，Midjourney生成配图变体，结合内部数据平台自动分析投放效果。",
    approachEn: "Used ChatGPT to generate multiple ad copy versions, Midjourney for image variants, combined with internal data platform for automated performance analysis.",
    resultZh: "测试周期从5天缩短至1天，广告ROI提升23%，月度广告预算节省15%。",
    resultEn: "Testing cycle reduced from 5 days to 1 day, ad ROI improved by 23%, monthly ad budget saved by 15%.",
    efficiencyGain: "80%",
    department: "marketing",
    team: "广告投放组",
    tools: ["ChatGPT", "Midjourney", "Google Analytics", "内部数据平台"],
    tags: ["广告优化", "A/B测试", "ROI提升"],
    date: "2026-03-05",
    featured: true,
  },
  {
    id: "case-002",
    titleZh: "智能客服知识库系统",
    titleEn: "Smart Customer Service Knowledge Base System",
    problemZh: "客服团队每天处理2000+咨询，60%为重复性问题，平均响应时间45秒。",
    problemEn: "Customer service team handles 2000+ inquiries daily, 60% are repetitive, average response time 45 seconds.",
    approachZh: "构建基于RAG的智能知识库，将历史FAQ和产品信息向量化，实现语义搜索和自动回复建议。",
    approachEn: "Built RAG-based smart knowledge base, vectorized historical FAQs and product information for semantic search and auto-reply suggestions.",
    resultZh: "客服响应时间缩短70%（45秒→13秒），客户满意度提升15%，重复问题自动解决率达85%。",
    resultEn: "Response time reduced by 70% (45s→13s), customer satisfaction improved by 15%, repetitive issue auto-resolution rate reached 85%.",
    efficiencyGain: "70%",
    department: "operations",
    team: "客服运营组",
    tools: ["OpenAI API", "Pinecone", "Python", "内部CRM"],
    tags: ["客服", "RAG", "知识库"],
    date: "2026-02-20",
    featured: true,
  },
  {
    id: "case-003",
    titleZh: "AI辅助泳装设计概念生成",
    titleEn: "AI-Assisted Swimwear Design Concept Generation",
    problemZh: "设计团队每季需要产出100+设计概念，传统手绘+修改流程耗时长。",
    problemEn: "Design team needs to produce 100+ design concepts per season, traditional hand-drawing + revision process is time-consuming.",
    approachZh: "使用Midjourney和Stable Diffusion生成设计灵感图，结合CLO 3D进行虚拟打样，AI辅助配色方案推荐。",
    approachEn: "Used Midjourney and Stable Diffusion for design inspiration, combined with CLO 3D for virtual sampling, AI-assisted color scheme recommendations.",
    resultZh: "设计概念产出效率提升200%，从构思到初稿时间从3天缩短至4小时。",
    resultEn: "Design concept output efficiency improved by 200%, time from ideation to first draft reduced from 3 days to 4 hours.",
    efficiencyGain: "200%",
    department: "creative",
    team: "泳装设计组",
    tools: ["Midjourney", "Stable Diffusion", "CLO 3D", "Adobe Firefly"],
    tags: ["设计", "创意", "虚拟打样"],
    date: "2026-02-28",
    featured: true,
  },
];

// --- Leaderboard ---
export interface LeaderboardEntry {
  rank: number;
  name: string;
  department: string;
  points: number;
  level: string;
  badges: number;
  cases: number;
  avatar?: string;
}

export const individualLeaderboard: LeaderboardEntry[] = [
  { rank: 1, name: "张明", department: "数据中心", points: 3280, level: "AI Architect", badges: 8, cases: 5 },
  { rank: 2, name: "李芳", department: "市场营销中心", points: 2950, level: "AI Builder", badges: 7, cases: 4 },
  { rank: 3, name: "王强", department: "IT技术中心", points: 2680, level: "AI Builder", badges: 6, cases: 4 },
  { rank: 4, name: "赵丽", department: "运营中心", points: 2450, level: "AI Builder", badges: 5, cases: 3 },
  { rank: 5, name: "陈小明", department: "运营中心", points: 2200, level: "AI Practitioner", badges: 5, cases: 3 },
  { rank: 6, name: "刘强", department: "供应链中心", points: 1980, level: "AI Practitioner", badges: 4, cases: 2 },
  { rank: 7, name: "周婷", department: "创意设计中心", points: 1850, level: "AI Practitioner", badges: 4, cases: 2 },
  { rank: 8, name: "吴磊", department: "商品企划中心", points: 1720, level: "AI Practitioner", badges: 3, cases: 2 },
  { rank: 9, name: "孙静", department: "人力资源中心", points: 1580, level: "AI Explorer", badges: 3, cases: 1 },
  { rank: 10, name: "黄伟", department: "数据中心", points: 1450, level: "AI Explorer", badges: 2, cases: 1 },
];

export interface DeptLeaderboard {
  rank: number;
  departmentZh: string;
  departmentEn: string;
  totalPoints: number;
  avgPoints: number;
  members: number;
  cases: number;
  penetration: number;
}

export const departmentLeaderboard: DeptLeaderboard[] = [
  { rank: 1, departmentZh: "数据中心", departmentEn: "Data & Analytics", totalPoints: 12500, avgPoints: 1250, members: 10, cases: 8, penetration: 92 },
  { rank: 2, departmentZh: "IT技术中心", departmentEn: "IT & Technology", totalPoints: 11200, avgPoints: 1120, members: 10, cases: 7, penetration: 88 },
  { rank: 3, departmentZh: "市场营销中心", departmentEn: "Marketing", totalPoints: 9800, avgPoints: 816, members: 12, cases: 6, penetration: 75 },
  { rank: 4, departmentZh: "运营中心", departmentEn: "Operations", totalPoints: 8500, avgPoints: 607, members: 14, cases: 5, penetration: 71 },
  { rank: 5, departmentZh: "创意设计中心", departmentEn: "Creative Design", totalPoints: 7200, avgPoints: 900, members: 8, cases: 4, penetration: 68 },
  { rank: 6, departmentZh: "商品企划中心", departmentEn: "Merchandising", totalPoints: 6800, avgPoints: 755, members: 9, cases: 3, penetration: 62 },
  { rank: 7, departmentZh: "供应链中心", departmentEn: "Supply Chain", totalPoints: 5400, avgPoints: 675, members: 8, cases: 2, penetration: 55 },
  { rank: 8, departmentZh: "人力资源中心", departmentEn: "Human Resources", totalPoints: 4200, avgPoints: 700, members: 6, cases: 1, penetration: 48 },
];

// --- Control Tower Metrics ---
export const controlTowerMetrics = {
  overallPenetration: 67,
  overallEfficiency: 34,
  totalCases: 128,
  totalWishes: 89,
  solvedWishes: 52,
  activeChallenges: 8,
  totalSkillUnlocks: 456,
  monthlyTrend: [
    { month: "Oct", penetration: 32, efficiency: 12, cases: 45 },
    { month: "Nov", penetration: 38, efficiency: 18, cases: 62 },
    { month: "Dec", penetration: 45, efficiency: 22, cases: 78 },
    { month: "Jan", penetration: 52, efficiency: 26, cases: 95 },
    { month: "Feb", penetration: 60, efficiency: 30, cases: 112 },
    { month: "Mar", penetration: 67, efficiency: 34, cases: 128 },
  ],
  departmentComparison: [
    { dept: "数据", deptEn: "Data", penetration: 92, efficiency: 48, cases: 8 },
    { dept: "IT", deptEn: "IT", penetration: 88, efficiency: 42, cases: 7 },
    { dept: "营销", deptEn: "Mktg", penetration: 75, efficiency: 38, cases: 6 },
    { dept: "运营", deptEn: "Ops", penetration: 71, efficiency: 32, cases: 5 },
    { dept: "创意", deptEn: "Design", penetration: 68, efficiency: 35, cases: 4 },
    { dept: "商品", deptEn: "Merch", penetration: 62, efficiency: 28, cases: 3 },
    { dept: "供应链", deptEn: "Supply", penetration: 55, efficiency: 22, cases: 2 },
    { dept: "HR", deptEn: "HR", penetration: 48, efficiency: 18, cases: 1 },
  ],
};

// --- Badges ---
export const badges = [
  { id: "badge-explorer", nameZh: "AI Explorer", nameEn: "AI Explorer", icon: "🔍", requirement: "首次使用AI工具完成任务" },
  { id: "badge-practitioner", nameZh: "AI Practitioner", nameEn: "AI Practitioner", icon: "⚡", requirement: "完成5个AI相关任务" },
  { id: "badge-builder", nameZh: "AI Builder", nameEn: "AI Builder", icon: "🏗️", requirement: "提交3个AI案例" },
  { id: "badge-architect", nameZh: "AI Architect", nameEn: "AI Architect", icon: "🎯", requirement: "完成系统级AI项目" },
  { id: "badge-prompt", nameZh: "Prompt Master", nameEn: "Prompt Master", icon: "✍️", requirement: "在Prompt大赛中获奖" },
  { id: "badge-pioneer", nameZh: "AI Pioneer", nameEn: "AI Pioneer", icon: "🚀", requirement: "首个完成悬赏任务" },
];

// --- Tools Directory ---
export const toolsDirectory = [
  { id: "t-001", name: "ChatGPT", category: "通用AI", categoryEn: "General AI", statusZh: "已批准", statusEn: "Approved", descZh: "OpenAI通用对话AI，支持文本生成、分析、编程等", descEn: "OpenAI general-purpose conversational AI for text generation, analysis, coding" },
  { id: "t-002", name: "Midjourney", category: "AI设计", categoryEn: "AI Design", statusZh: "已批准", statusEn: "Approved", descZh: "AI图像生成工具，适用于设计灵感和素材创作", descEn: "AI image generation tool for design inspiration and asset creation" },
  { id: "t-003", name: "Cursor", category: "AI编程", categoryEn: "AI Coding", statusZh: "已批准", statusEn: "Approved", descZh: "AI驱动的代码编辑器，支持自然语言编程", descEn: "AI-powered code editor supporting natural language programming" },
  { id: "t-004", name: "Claude", category: "通用AI", categoryEn: "General AI", statusZh: "已批准", statusEn: "Approved", descZh: "Anthropic长文本AI助手，擅长分析和写作", descEn: "Anthropic long-context AI assistant, excels at analysis and writing" },
  { id: "t-005", name: "Notion AI", category: "办公效率", categoryEn: "Productivity", statusZh: "评估中", statusEn: "Under Review", descZh: "集成在Notion中的AI写作和分析助手", descEn: "AI writing and analysis assistant integrated in Notion" },
  { id: "t-006", name: "Dify", category: "AI平台", categoryEn: "AI Platform", statusZh: "已批准", statusEn: "Approved", descZh: "开源AI应用开发平台，支持RAG和Agent构建", descEn: "Open-source AI app development platform supporting RAG and Agent building" },
];
