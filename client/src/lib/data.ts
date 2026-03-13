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


// ============================================================
// NEW MODULES: Prompt Library, Workflow Library, Agent Library
// ============================================================

// --- Prompt Library ---
export interface Prompt {
  id: string;
  titleZh: string;
  titleEn: string;
  category: "marketing" | "design" | "merchandising" | "data" | "operations" | "general";
  descriptionZh: string;
  descriptionEn: string;
  promptText: string;
  author: string;
  department: string;
  usageCount: number;
  rating: number;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  featured: boolean;
}

export const promptCategories = [
  { id: "marketing", zh: "营销Prompt", en: "Marketing Prompts", icon: "📢", color: "text-coral" },
  { id: "design", zh: "设计Prompt", en: "Design Prompts", icon: "🎨", color: "text-ocean-light" },
  { id: "merchandising", zh: "商品分析Prompt", en: "Merchandising Prompts", icon: "📦", color: "text-teal" },
  { id: "data", zh: "数据分析Prompt", en: "Data Analysis Prompts", icon: "📊", color: "text-primary" },
  { id: "operations", zh: "运营Prompt", en: "Operations Prompts", icon: "⚙️", color: "text-warning" },
  { id: "general", zh: "通用Prompt", en: "General Prompts", icon: "💡", color: "text-success" },
];

export const prompts: Prompt[] = [
  {
    id: "p-001",
    titleZh: "广告文案A/B测试生成器",
    titleEn: "Ad Copy A/B Test Generator",
    category: "marketing",
    descriptionZh: "根据产品特点和目标受众，自动生成多组广告文案变体用于A/B测试",
    descriptionEn: "Generate multiple ad copy variants for A/B testing based on product features and target audience",
    promptText: "You are an expert DTC fashion copywriter for CUPSHE swimwear. Given the following product details:\n- Product: {{product_name}}\n- Key features: {{features}}\n- Target audience: {{audience}}\n- Platform: {{platform}}\n\nGenerate 5 ad copy variants with:\n1. A hook headline (under 10 words)\n2. Body copy (under 50 words)\n3. CTA button text\n4. Emotional angle used\n\nEnsure variety in tone: playful, aspirational, urgency-driven, benefit-focused, social-proof.",
    author: "张明",
    department: "市场营销中心",
    usageCount: 342,
    rating: 4.8,
    tags: ["广告", "A/B测试", "文案", "DTC"],
    createdAt: "2026-01-15",
    updatedAt: "2026-03-08",
    featured: true,
  },
  {
    id: "p-002",
    titleZh: "竞品社媒评论分析",
    titleEn: "Competitor Social Media Review Analysis",
    category: "marketing",
    descriptionZh: "分析竞品在社交媒体上的用户评论，提取关键洞察和情感趋势",
    descriptionEn: "Analyze competitor social media reviews to extract key insights and sentiment trends",
    promptText: "Analyze the following customer reviews from {{competitor}} on {{platform}}:\n\n{{reviews}}\n\nProvide:\n1. Top 5 positive themes with frequency\n2. Top 5 negative themes with frequency\n3. Sentiment distribution (positive/neutral/negative %)\n4. Key product features mentioned\n5. Unmet customer needs we can address\n6. Actionable recommendations for CUPSHE\n\nFormat as a structured report with data tables.",
    author: "李芳",
    department: "市场营销中心",
    usageCount: 256,
    rating: 4.7,
    tags: ["竞品分析", "社媒", "评论", "洞察"],
    createdAt: "2026-01-20",
    updatedAt: "2026-03-05",
    featured: true,
  },
  {
    id: "p-003",
    titleZh: "泳装设计概念生成",
    titleEn: "Swimwear Design Concept Generator",
    category: "design",
    descriptionZh: "基于趋势报告和品牌调性，生成泳装设计概念描述和Midjourney提示词",
    descriptionEn: "Generate swimwear design concepts and Midjourney prompts based on trend reports and brand identity",
    promptText: "As a senior swimwear designer for CUPSHE, create design concepts based on:\n- Season: {{season}}\n- Trend theme: {{trend}}\n- Target demographic: {{demo}}\n- Price point: {{price}}\n\nFor each concept provide:\n1. Design name and story\n2. Silhouette description\n3. Color palette (with hex codes)\n4. Fabric suggestions\n5. Key design details\n6. Midjourney prompt for visualization\n7. Mood board keywords\n\nGenerate 3 distinct concepts ranging from safe to bold.",
    author: "周婷",
    department: "创意设计中心",
    usageCount: 189,
    rating: 4.9,
    tags: ["设计", "泳装", "Midjourney", "概念"],
    createdAt: "2026-02-01",
    updatedAt: "2026-03-10",
    featured: true,
  },
  {
    id: "p-004",
    titleZh: "商品选品数据分析",
    titleEn: "Product Selection Data Analysis",
    category: "merchandising",
    descriptionZh: "基于销售数据和市场趋势，辅助商品选品决策分析",
    descriptionEn: "Assist product selection decisions based on sales data and market trends",
    promptText: "Analyze the following product performance data for CUPSHE:\n\n{{data}}\n\nProvide:\n1. Top performers by ROI, sell-through rate, and margin\n2. Underperformers requiring action (markdown/discontinue)\n3. Trend alignment score (1-10) for each category\n4. Recommended buy quantities for next season\n5. Price elasticity insights\n6. Cross-sell opportunity matrix\n\nPresent findings in tables with clear action items.",
    author: "吴磊",
    department: "商品企划中心",
    usageCount: 178,
    rating: 4.6,
    tags: ["选品", "数据分析", "销售", "趋势"],
    createdAt: "2026-02-05",
    updatedAt: "2026-03-07",
    featured: false,
  },
  {
    id: "p-005",
    titleZh: "周报/月报自动生成",
    titleEn: "Weekly/Monthly Report Auto-Generator",
    category: "general",
    descriptionZh: "根据关键数据点和事件，自动生成结构化的工作报告",
    descriptionEn: "Auto-generate structured work reports from key data points and events",
    promptText: "Generate a professional {{report_type}} report for {{department}}:\n\nKey metrics this period:\n{{metrics}}\n\nKey events:\n{{events}}\n\nFormat:\n1. Executive Summary (3 bullets)\n2. Key Metrics Dashboard (table)\n3. Achievements & Highlights\n4. Challenges & Risks\n5. Action Items for Next Period\n6. Resource Needs\n\nTone: Professional, data-driven, concise. Use bullet points and tables.",
    author: "王浩",
    department: "数据中心",
    usageCount: 425,
    rating: 4.5,
    tags: ["报告", "周报", "月报", "自动化"],
    createdAt: "2026-01-10",
    updatedAt: "2026-03-01",
    featured: false,
  },
  {
    id: "p-006",
    titleZh: "客服话术优化",
    titleEn: "Customer Service Script Optimizer",
    category: "operations",
    descriptionZh: "优化客服回复话术，提升客户满意度和解决效率",
    descriptionEn: "Optimize customer service scripts to improve satisfaction and resolution efficiency",
    promptText: "As a customer service expert for CUPSHE (DTC swimwear brand selling on Amazon/Shopify):\n\nCustomer issue: {{issue}}\nCustomer sentiment: {{sentiment}}\nOrder details: {{order}}\n\nGenerate:\n1. Empathetic opening response\n2. Solution options (ranked by customer satisfaction)\n3. Upsell/cross-sell opportunity (if appropriate)\n4. Follow-up template\n5. Internal notes for CRM\n\nTone: Warm, professional, solution-oriented. Max 100 words per response.",
    author: "赵丽",
    department: "运营中心",
    usageCount: 312,
    rating: 4.7,
    tags: ["客服", "话术", "满意度", "运营"],
    createdAt: "2026-01-25",
    updatedAt: "2026-03-06",
    featured: false,
  },
  {
    id: "p-007",
    titleZh: "Google/Meta广告受众分析",
    titleEn: "Google/Meta Ad Audience Analysis",
    category: "marketing",
    descriptionZh: "分析广告平台数据，优化受众定位和投放策略",
    descriptionEn: "Analyze ad platform data to optimize audience targeting and campaign strategy",
    promptText: "Analyze the following ad campaign data from {{platform}}:\n\n{{campaign_data}}\n\nProvide:\n1. Best performing audience segments (by ROAS)\n2. Audience overlap analysis\n3. Recommended budget reallocation\n4. Lookalike audience suggestions\n5. Creative fatigue indicators\n6. Seasonal adjustment recommendations\n\nInclude specific targeting parameters for implementation.",
    author: "张明",
    department: "市场营销中心",
    usageCount: 198,
    rating: 4.6,
    tags: ["广告", "受众", "Google", "Meta"],
    createdAt: "2026-02-10",
    updatedAt: "2026-03-09",
    featured: false,
  },
  {
    id: "p-008",
    titleZh: "产品描述SEO优化",
    titleEn: "Product Description SEO Optimizer",
    category: "operations",
    descriptionZh: "优化产品描述以提升搜索引擎排名和转化率",
    descriptionEn: "Optimize product descriptions for better search rankings and conversion rates",
    promptText: "Optimize the following CUPSHE product listing for {{platform}} (Amazon/Shopify):\n\nCurrent listing:\n{{listing}}\n\nTarget keywords: {{keywords}}\n\nGenerate:\n1. Optimized title (within character limit)\n2. 5 bullet points highlighting key features\n3. Enhanced description with HTML formatting\n4. Backend search terms\n5. A+ Content suggestions\n\nFollow {{platform}} best practices and CUPSHE brand voice.",
    author: "陈小明",
    department: "运营中心",
    usageCount: 267,
    rating: 4.5,
    tags: ["SEO", "产品描述", "Amazon", "转化"],
    createdAt: "2026-02-15",
    updatedAt: "2026-03-04",
    featured: false,
  },
  {
    id: "p-009",
    titleZh: "数据异常检测报告",
    titleEn: "Data Anomaly Detection Report",
    category: "data",
    descriptionZh: "分析数据集中的异常值，生成异常检测报告和建议",
    descriptionEn: "Analyze anomalies in datasets and generate detection reports with recommendations",
    promptText: "Analyze the following dataset for anomalies:\n\n{{data}}\n\nProvide:\n1. Statistical summary (mean, median, std dev, IQR)\n2. Detected anomalies with confidence scores\n3. Potential root causes for each anomaly\n4. Impact assessment (revenue/operations)\n5. Recommended actions\n6. Monitoring thresholds for future alerts\n\nVisualization suggestions for dashboard integration.",
    author: "黄伟",
    department: "数据中心",
    usageCount: 145,
    rating: 4.8,
    tags: ["数据", "异常检测", "分析", "监控"],
    createdAt: "2026-02-20",
    updatedAt: "2026-03-08",
    featured: false,
  },
  {
    id: "p-010",
    titleZh: "面料与工艺描述翻译",
    titleEn: "Fabric & Craft Description Translator",
    category: "design",
    descriptionZh: "将中文面料和工艺描述精准翻译为英文，适配海外市场",
    descriptionEn: "Accurately translate Chinese fabric and craft descriptions to English for overseas markets",
    promptText: "Translate the following Chinese fabric/craft descriptions to professional English for CUPSHE product listings:\n\n{{descriptions}}\n\nRequirements:\n1. Use industry-standard textile terminology\n2. Highlight comfort and quality aspects\n3. Include care instructions\n4. Add marketing-friendly descriptors\n5. Ensure consistency with CUPSHE brand voice\n\nProvide both literal and marketing-optimized versions.",
    author: "周婷",
    department: "创意设计中心",
    usageCount: 156,
    rating: 4.4,
    tags: ["翻译", "面料", "工艺", "跨境"],
    createdAt: "2026-02-08",
    updatedAt: "2026-03-02",
    featured: false,
  },
];

// --- Workflow Library ---
export interface Workflow {
  id: string;
  titleZh: string;
  titleEn: string;
  descriptionZh: string;
  descriptionEn: string;
  category: string;
  steps: WorkflowStep[];
  tools: string[];
  efficiencyGain: string;
  department: string;
  author: string;
  usageCount: number;
  rating: number;
  featured: boolean;
  createdAt: string;
}

export interface WorkflowStep {
  order: number;
  titleZh: string;
  titleEn: string;
  descriptionZh: string;
  descriptionEn: string;
  tool: string;
  type: "manual" | "ai" | "hybrid";
}

export const workflows: Workflow[] = [
  {
    id: "wf-001",
    titleZh: "AI广告创意全流程",
    titleEn: "AI Ad Creative Full Pipeline",
    descriptionZh: "从市场洞察到广告素材生成的端到端AI工作流，覆盖文案、视觉、A/B测试全链路",
    descriptionEn: "End-to-end AI workflow from market insights to ad creative generation, covering copy, visuals, and A/B testing",
    category: "marketing",
    steps: [
      { order: 1, titleZh: "市场趋势分析", titleEn: "Market Trend Analysis", descriptionZh: "抓取竞品广告数据和社媒趋势", descriptionEn: "Scrape competitor ad data and social media trends", tool: "ChatGPT + Python", type: "ai" },
      { order: 2, titleZh: "受众画像生成", titleEn: "Audience Persona Generation", descriptionZh: "基于数据生成目标受众画像", descriptionEn: "Generate target audience personas from data", tool: "ChatGPT", type: "ai" },
      { order: 3, titleZh: "文案变体生成", titleEn: "Copy Variant Generation", descriptionZh: "AI生成多组广告文案变体", descriptionEn: "AI generates multiple ad copy variants", tool: "ChatGPT", type: "ai" },
      { order: 4, titleZh: "视觉素材生成", titleEn: "Visual Asset Generation", descriptionZh: "AI生成广告图片和视频脚本", descriptionEn: "AI generates ad images and video scripts", tool: "Midjourney + Runway", type: "ai" },
      { order: 5, titleZh: "人工审核优化", titleEn: "Human Review & Optimize", descriptionZh: "设计师和营销经理审核调整", descriptionEn: "Designers and marketing managers review and adjust", tool: "Figma", type: "manual" },
      { order: 6, titleZh: "A/B测试部署", titleEn: "A/B Test Deployment", descriptionZh: "自动化部署多组素材进行测试", descriptionEn: "Automated deployment of multiple creatives for testing", tool: "Meta Ads + Google Ads", type: "hybrid" },
      { order: 7, titleZh: "效果分析报告", titleEn: "Performance Analysis Report", descriptionZh: "AI自动生成测试结果分析报告", descriptionEn: "AI auto-generates test result analysis report", tool: "ChatGPT + Python", type: "ai" },
    ],
    tools: ["ChatGPT", "Midjourney", "Python", "Meta Ads", "Google Ads", "Figma"],
    efficiencyGain: "80%",
    department: "市场营销中心",
    author: "张明",
    usageCount: 156,
    rating: 4.9,
    featured: true,
    createdAt: "2026-01-20",
  },
  {
    id: "wf-002",
    titleZh: "AI评论分析与洞察流程",
    titleEn: "AI Review Analysis & Insights Pipeline",
    descriptionZh: "自动抓取、分析、生成洞察报告的评论分析全流程",
    descriptionEn: "Full pipeline for automated review scraping, analysis, and insight report generation",
    category: "operations",
    steps: [
      { order: 1, titleZh: "评论数据抓取", titleEn: "Review Data Scraping", descriptionZh: "从Amazon/社媒平台自动抓取评论", descriptionEn: "Auto-scrape reviews from Amazon/social platforms", tool: "Python + Scrapy", type: "ai" },
      { order: 2, titleZh: "数据清洗标注", titleEn: "Data Cleaning & Labeling", descriptionZh: "AI自动清洗和分类标注评论", descriptionEn: "AI auto-cleans and categorizes reviews", tool: "Python + ChatGPT", type: "ai" },
      { order: 3, titleZh: "情感分析", titleEn: "Sentiment Analysis", descriptionZh: "对评论进行情感倾向分析", descriptionEn: "Perform sentiment analysis on reviews", tool: "ChatGPT API", type: "ai" },
      { order: 4, titleZh: "主题提取", titleEn: "Topic Extraction", descriptionZh: "提取高频主题和关键词", descriptionEn: "Extract high-frequency topics and keywords", tool: "ChatGPT + NLP", type: "ai" },
      { order: 5, titleZh: "洞察报告生成", titleEn: "Insight Report Generation", descriptionZh: "AI生成结构化洞察报告", descriptionEn: "AI generates structured insight report", tool: "ChatGPT", type: "ai" },
      { order: 6, titleZh: "行动建议输出", titleEn: "Action Recommendations", descriptionZh: "基于洞察生成产品改进建议", descriptionEn: "Generate product improvement recommendations from insights", tool: "ChatGPT", type: "ai" },
    ],
    tools: ["Python", "ChatGPT", "Scrapy", "NLP"],
    efficiencyGain: "70%",
    department: "运营中心",
    author: "赵丽",
    usageCount: 128,
    rating: 4.8,
    featured: true,
    createdAt: "2026-02-01",
  },
  {
    id: "wf-003",
    titleZh: "AI趋势研究与选品流程",
    titleEn: "AI Trend Research & Product Selection Pipeline",
    descriptionZh: "从趋势发现到选品决策的AI辅助全流程",
    descriptionEn: "AI-assisted full pipeline from trend discovery to product selection decisions",
    category: "merchandising",
    steps: [
      { order: 1, titleZh: "趋势数据采集", titleEn: "Trend Data Collection", descriptionZh: "从Google Trends/Pinterest/TikTok采集趋势数据", descriptionEn: "Collect trend data from Google Trends/Pinterest/TikTok", tool: "Python + API", type: "ai" },
      { order: 2, titleZh: "趋势分析预测", titleEn: "Trend Analysis & Prediction", descriptionZh: "AI分析趋势走向并预测下季热点", descriptionEn: "AI analyzes trends and predicts next season hotspots", tool: "ChatGPT + Python", type: "ai" },
      { order: 3, titleZh: "竞品对标分析", titleEn: "Competitor Benchmarking", descriptionZh: "分析竞品新品和畅销款", descriptionEn: "Analyze competitor new arrivals and bestsellers", tool: "ChatGPT", type: "ai" },
      { order: 4, titleZh: "选品方案生成", titleEn: "Selection Plan Generation", descriptionZh: "AI生成选品建议和买手计划", descriptionEn: "AI generates selection recommendations and buying plan", tool: "ChatGPT + Excel", type: "hybrid" },
      { order: 5, titleZh: "商品企划评审", titleEn: "Merchandising Review", descriptionZh: "商品团队评审AI建议并调整", descriptionEn: "Merchandising team reviews AI suggestions and adjusts", tool: "Notion", type: "manual" },
    ],
    tools: ["Python", "ChatGPT", "Google Trends API", "Pinterest API", "Excel"],
    efficiencyGain: "60%",
    department: "商品企划中心",
    author: "吴磊",
    usageCount: 89,
    rating: 4.7,
    featured: true,
    createdAt: "2026-02-10",
  },
  {
    id: "wf-004",
    titleZh: "AI辅助设计出图流程",
    titleEn: "AI-Assisted Design Production Pipeline",
    descriptionZh: "从灵感收集到成品输出的AI辅助设计全流程",
    descriptionEn: "AI-assisted design pipeline from inspiration collection to final output",
    category: "design",
    steps: [
      { order: 1, titleZh: "灵感收集与分析", titleEn: "Inspiration Collection & Analysis", descriptionZh: "AI辅助收集和分析设计灵感", descriptionEn: "AI-assisted inspiration collection and analysis", tool: "Pinterest + ChatGPT", type: "hybrid" },
      { order: 2, titleZh: "概念生成", titleEn: "Concept Generation", descriptionZh: "AI生成多个设计概念方案", descriptionEn: "AI generates multiple design concept options", tool: "Midjourney + DALL-E", type: "ai" },
      { order: 3, titleZh: "设计细化", titleEn: "Design Refinement", descriptionZh: "设计师基于AI概念进行细化", descriptionEn: "Designers refine based on AI concepts", tool: "Figma + CLO 3D", type: "manual" },
      { order: 4, titleZh: "效果图渲染", titleEn: "Rendering", descriptionZh: "AI辅助生成产品效果图", descriptionEn: "AI-assisted product rendering", tool: "Stable Diffusion", type: "ai" },
      { order: 5, titleZh: "评审与定稿", titleEn: "Review & Finalize", descriptionZh: "团队评审并确定最终方案", descriptionEn: "Team review and finalize design", tool: "Figma", type: "manual" },
    ],
    tools: ["Midjourney", "DALL-E", "Figma", "CLO 3D", "Stable Diffusion", "ChatGPT"],
    efficiencyGain: "200%",
    department: "创意设计中心",
    author: "周婷",
    usageCount: 112,
    rating: 4.8,
    featured: false,
    createdAt: "2026-02-15",
  },
  {
    id: "wf-005",
    titleZh: "智能客服知识库构建流程",
    titleEn: "Intelligent Customer Service Knowledge Base Pipeline",
    descriptionZh: "从历史工单到智能客服系统的知识库构建全流程",
    descriptionEn: "Full pipeline for building knowledge base from historical tickets to intelligent CS system",
    category: "operations",
    steps: [
      { order: 1, titleZh: "历史工单导出", titleEn: "Historical Ticket Export", descriptionZh: "导出过去12个月的客服工单", descriptionEn: "Export past 12 months of customer service tickets", tool: "Zendesk API", type: "hybrid" },
      { order: 2, titleZh: "问题分类聚类", titleEn: "Issue Classification & Clustering", descriptionZh: "AI对工单进行自动分类和聚类", descriptionEn: "AI auto-classifies and clusters tickets", tool: "ChatGPT + Python", type: "ai" },
      { order: 3, titleZh: "知识条目生成", titleEn: "Knowledge Entry Generation", descriptionZh: "AI生成标准化知识库条目", descriptionEn: "AI generates standardized knowledge base entries", tool: "ChatGPT", type: "ai" },
      { order: 4, titleZh: "向量化存储", titleEn: "Vector Storage", descriptionZh: "将知识库向量化存储到Pinecone", descriptionEn: "Vectorize and store knowledge base in Pinecone", tool: "OpenAI + Pinecone", type: "ai" },
      { order: 5, titleZh: "RAG系统部署", titleEn: "RAG System Deployment", descriptionZh: "部署基于RAG的智能客服系统", descriptionEn: "Deploy RAG-based intelligent CS system", tool: "Dify + OpenAI", type: "hybrid" },
      { order: 6, titleZh: "持续优化", titleEn: "Continuous Optimization", descriptionZh: "基于反馈持续优化知识库", descriptionEn: "Continuously optimize knowledge base based on feedback", tool: "Dify", type: "hybrid" },
    ],
    tools: ["ChatGPT", "Python", "Pinecone", "Dify", "OpenAI API", "Zendesk"],
    efficiencyGain: "70%",
    department: "运营中心",
    author: "赵丽",
    usageCount: 67,
    rating: 4.6,
    featured: false,
    createdAt: "2026-02-20",
  },
];

// --- Agent Library ---
export interface Agent {
  id: string;
  nameZh: string;
  nameEn: string;
  descriptionZh: string;
  descriptionEn: string;
  category: string;
  capabilities: string[];
  techStack: string[];
  statusZh: string;
  statusEn: string;
  department: string;
  owner: string;
  usageCount: number;
  successRate: number;
  avgResponseTime: string;
  createdAt: string;
  featured: boolean;
  inputsZh: string[];
  inputsEn: string[];
  outputsZh: string[];
  outputsEn: string[];
}

export const agents: Agent[] = [
  {
    id: "ag-001",
    nameZh: "广告分析Agent",
    nameEn: "Ad Analytics Agent",
    descriptionZh: "自动分析Google/Meta广告数据，生成优化建议和预算分配方案。支持多账户、多平台数据聚合分析。",
    descriptionEn: "Automatically analyzes Google/Meta ad data, generates optimization suggestions and budget allocation plans. Supports multi-account, multi-platform data aggregation.",
    category: "marketing",
    capabilities: ["数据抓取", "趋势分析", "预算优化", "报告生成", "异常预警"],
    techStack: ["OpenAI GPT-4", "Python", "Google Ads API", "Meta Marketing API"],
    statusZh: "已上线",
    statusEn: "Live",
    department: "市场营销中心",
    owner: "张明",
    usageCount: 1250,
    successRate: 94,
    avgResponseTime: "< 30s",
    createdAt: "2026-01-15",
    featured: true,
    inputsZh: ["广告账户ID", "时间范围", "分析维度"],
    inputsEn: ["Ad Account ID", "Time Range", "Analysis Dimensions"],
    outputsZh: ["效果分析报告", "优化建议", "预算分配方案"],
    outputsEn: ["Performance Report", "Optimization Suggestions", "Budget Allocation Plan"],
  },
  {
    id: "ag-002",
    nameZh: "评论洞察Agent",
    nameEn: "Review Insights Agent",
    descriptionZh: "自动抓取和分析Amazon/社媒平台评论，提取消费者洞察，生成产品改进建议。",
    descriptionEn: "Automatically scrapes and analyzes Amazon/social media reviews, extracts consumer insights, generates product improvement suggestions.",
    category: "operations",
    capabilities: ["评论抓取", "情感分析", "主题提取", "竞品对比", "趋势追踪"],
    techStack: ["OpenAI GPT-4", "Python", "Scrapy", "Pinecone"],
    statusZh: "已上线",
    statusEn: "Live",
    department: "运营中心",
    owner: "赵丽",
    usageCount: 890,
    successRate: 91,
    avgResponseTime: "< 2min",
    createdAt: "2026-02-01",
    featured: true,
    inputsZh: ["ASIN/产品链接", "竞品列表", "分析周期"],
    inputsEn: ["ASIN/Product URL", "Competitor List", "Analysis Period"],
    outputsZh: ["情感分析报告", "主题洞察", "改进建议"],
    outputsEn: ["Sentiment Report", "Topic Insights", "Improvement Suggestions"],
  },
  {
    id: "ag-003",
    nameZh: "趋势分析Agent",
    nameEn: "Trend Analysis Agent",
    descriptionZh: "监控全球泳装和时尚趋势，自动生成趋势报告和选品建议。覆盖Google Trends、Pinterest、TikTok等多平台。",
    descriptionEn: "Monitors global swimwear and fashion trends, auto-generates trend reports and product selection suggestions. Covers Google Trends, Pinterest, TikTok and more.",
    category: "merchandising",
    capabilities: ["趋势监控", "数据聚合", "预测分析", "选品建议", "竞品追踪"],
    techStack: ["OpenAI GPT-4", "Python", "Google Trends API", "Pinterest API", "TikTok API"],
    statusZh: "已上线",
    statusEn: "Live",
    department: "商品企划中心",
    owner: "吴磊",
    usageCount: 560,
    successRate: 88,
    avgResponseTime: "< 5min",
    createdAt: "2026-02-10",
    featured: true,
    inputsZh: ["品类关键词", "目标市场", "时间范围"],
    inputsEn: ["Category Keywords", "Target Market", "Time Range"],
    outputsZh: ["趋势报告", "热度排名", "选品建议"],
    outputsEn: ["Trend Report", "Popularity Ranking", "Selection Suggestions"],
  },
  {
    id: "ag-004",
    nameZh: "设计灵感Agent",
    nameEn: "Design Inspiration Agent",
    descriptionZh: "基于趋势数据和品牌调性，自动生成设计灵感板和概念方案。",
    descriptionEn: "Auto-generates design mood boards and concept proposals based on trend data and brand identity.",
    category: "design",
    capabilities: ["灵感生成", "风格匹配", "色彩推荐", "概念可视化"],
    techStack: ["Midjourney API", "OpenAI GPT-4", "Stable Diffusion"],
    statusZh: "测试中",
    statusEn: "Beta",
    department: "创意设计中心",
    owner: "周婷",
    usageCount: 320,
    successRate: 85,
    avgResponseTime: "< 1min",
    createdAt: "2026-02-20",
    featured: false,
    inputsZh: ["设计主题", "风格偏好", "季节/场景"],
    inputsEn: ["Design Theme", "Style Preference", "Season/Scene"],
    outputsZh: ["灵感板", "概念图", "色彩方案"],
    outputsEn: ["Mood Board", "Concept Images", "Color Palette"],
  },
  {
    id: "ag-005",
    nameZh: "智能客服Agent",
    nameEn: "Smart CS Agent",
    descriptionZh: "基于RAG技术的智能客服助手，自动回复常见问题，复杂问题自动升级到人工。",
    descriptionEn: "RAG-based intelligent customer service assistant, auto-replies to FAQs, auto-escalates complex issues to human agents.",
    category: "operations",
    capabilities: ["自动回复", "问题分类", "智能升级", "多语言支持"],
    techStack: ["Dify", "OpenAI GPT-4", "Pinecone", "Zendesk API"],
    statusZh: "已上线",
    statusEn: "Live",
    department: "运营中心",
    owner: "赵丽",
    usageCount: 4500,
    successRate: 87,
    avgResponseTime: "< 5s",
    createdAt: "2026-01-25",
    featured: false,
    inputsZh: ["客户问题", "订单信息", "历史记录"],
    inputsEn: ["Customer Query", "Order Info", "History"],
    outputsZh: ["回复建议", "分类标签", "升级建议"],
    outputsEn: ["Reply Suggestion", "Category Tag", "Escalation Suggestion"],
  },
  {
    id: "ag-006",
    nameZh: "数据报表Agent",
    nameEn: "Data Report Agent",
    descriptionZh: "自动连接多个数据源，生成日报/周报/月报，支持自然语言查询数据。",
    descriptionEn: "Auto-connects multiple data sources, generates daily/weekly/monthly reports, supports natural language data queries.",
    category: "data",
    capabilities: ["数据聚合", "报表生成", "自然语言查询", "异常检测"],
    techStack: ["OpenAI GPT-4", "Python", "SQL", "Metabase API"],
    statusZh: "已上线",
    statusEn: "Live",
    department: "数据中心",
    owner: "黄伟",
    usageCount: 2100,
    successRate: 96,
    avgResponseTime: "< 15s",
    createdAt: "2026-01-20",
    featured: false,
    inputsZh: ["报表类型", "时间范围", "数据维度"],
    inputsEn: ["Report Type", "Time Range", "Data Dimensions"],
    outputsZh: ["数据报表", "趋势图表", "异常提醒"],
    outputsEn: ["Data Report", "Trend Charts", "Anomaly Alerts"],
  },
];

// --- Department Center Data ---
export interface DepartmentCenter {
  id: string;
  zh: string;
  en: string;
  penetration: number;
  efficiency: number;
  totalCases: number;
  activeMembers: number;
  totalMembers: number;
  topTools: string[];
  recentCasesZh: string[];
  recentCasesEn: string[];
  keyMetrics: { labelZh: string; labelEn: string; value: string; trend: string }[];
  aiInitiativesZh: string[];
  aiInitiativesEn: string[];
  challenges: number;
  prompts: number;
  workflows: number;
  agents: number;
}

export const departmentCenters: DepartmentCenter[] = [
  {
    id: "marketing",
    zh: "市场营销中心",
    en: "Marketing Center",
    penetration: 75,
    efficiency: 38,
    totalCases: 18,
    activeMembers: 9,
    totalMembers: 12,
    topTools: ["ChatGPT", "Midjourney", "Meta Ads", "Google Analytics"],
    recentCasesZh: ["AI驱动广告素材A/B测试自动化", "社媒内容AI批量生成", "竞品广告策略AI分析"],
    recentCasesEn: ["AI-Driven Ad Creative A/B Testing", "Social Media Content AI Batch Generation", "Competitor Ad Strategy AI Analysis"],
    keyMetrics: [
      { labelZh: "广告ROI提升", labelEn: "Ad ROI Improvement", value: "+23%", trend: "up" },
      { labelZh: "内容产出效率", labelEn: "Content Output Efficiency", value: "+80%", trend: "up" },
      { labelZh: "获客成本降低", labelEn: "CAC Reduction", value: "-15%", trend: "down" },
      { labelZh: "素材测试周期", labelEn: "Creative Test Cycle", value: "1天", trend: "down" },
    ],
    aiInitiativesZh: ["AI广告分析", "AI创意生成", "AI投放优化", "AI受众洞察"],
    aiInitiativesEn: ["AI Ad Analysis", "AI Creative Generation", "AI Campaign Optimization", "AI Audience Insights"],
    challenges: 3,
    prompts: 12,
    workflows: 4,
    agents: 2,
  },
  {
    id: "creative",
    zh: "创意设计中心",
    en: "Creative Design Center",
    penetration: 68,
    efficiency: 35,
    totalCases: 12,
    activeMembers: 6,
    totalMembers: 8,
    topTools: ["Midjourney", "Stable Diffusion", "CLO 3D", "Figma"],
    recentCasesZh: ["AI辅助泳装设计概念生成", "AI面料花纹设计", "产品拍摄场景AI生成"],
    recentCasesEn: ["AI-Assisted Swimwear Design Concept", "AI Fabric Pattern Design", "Product Shoot Scene AI Generation"],
    keyMetrics: [
      { labelZh: "设计概念产出", labelEn: "Design Concept Output", value: "+200%", trend: "up" },
      { labelZh: "设计周期缩短", labelEn: "Design Cycle Reduction", value: "-60%", trend: "down" },
      { labelZh: "客户满意度", labelEn: "Client Satisfaction", value: "92%", trend: "up" },
      { labelZh: "返工率降低", labelEn: "Rework Rate Reduction", value: "-40%", trend: "down" },
    ],
    aiInitiativesZh: ["AI概念设计", "AI花纹生成", "AI场景渲染", "AI色彩推荐"],
    aiInitiativesEn: ["AI Concept Design", "AI Pattern Generation", "AI Scene Rendering", "AI Color Recommendation"],
    challenges: 2,
    prompts: 8,
    workflows: 3,
    agents: 1,
  },
  {
    id: "merchandising",
    zh: "商品企划中心",
    en: "Merchandising Center",
    penetration: 62,
    efficiency: 28,
    totalCases: 9,
    activeMembers: 6,
    totalMembers: 9,
    topTools: ["ChatGPT", "Python", "Google Trends", "Excel"],
    recentCasesZh: ["AI选品模型部署", "趋势预测系统搭建", "竞品价格监控自动化"],
    recentCasesEn: ["AI Product Selection Model", "Trend Prediction System", "Competitor Price Monitoring Automation"],
    keyMetrics: [
      { labelZh: "选品准确率", labelEn: "Selection Accuracy", value: "+35%", trend: "up" },
      { labelZh: "库存周转提升", labelEn: "Inventory Turnover", value: "+22%", trend: "up" },
      { labelZh: "趋势预测准确", labelEn: "Trend Prediction Accuracy", value: "78%", trend: "up" },
      { labelZh: "分析时间缩短", labelEn: "Analysis Time Reduction", value: "-50%", trend: "down" },
    ],
    aiInitiativesZh: ["AI选品分析", "AI趋势预测", "AI价格优化", "AI库存管理"],
    aiInitiativesEn: ["AI Product Selection", "AI Trend Prediction", "AI Price Optimization", "AI Inventory Management"],
    challenges: 2,
    prompts: 6,
    workflows: 2,
    agents: 1,
  },
  {
    id: "operations",
    zh: "运营中心",
    en: "Operations Center",
    penetration: 71,
    efficiency: 32,
    totalCases: 15,
    activeMembers: 10,
    totalMembers: 14,
    topTools: ["ChatGPT", "Dify", "Python", "Zendesk"],
    recentCasesZh: ["智能客服知识库系统", "AI评论分析自动化", "产品描述SEO优化"],
    recentCasesEn: ["Intelligent CS Knowledge Base", "AI Review Analysis Automation", "Product Description SEO Optimization"],
    keyMetrics: [
      { labelZh: "客服响应时间", labelEn: "CS Response Time", value: "-70%", trend: "down" },
      { labelZh: "客户满意度", labelEn: "Customer Satisfaction", value: "+15%", trend: "up" },
      { labelZh: "自动解决率", labelEn: "Auto-Resolution Rate", value: "85%", trend: "up" },
      { labelZh: "运营成本降低", labelEn: "Ops Cost Reduction", value: "-25%", trend: "down" },
    ],
    aiInitiativesZh: ["AI客服助手", "AI评论分析", "AI SEO优化", "AI工单分类"],
    aiInitiativesEn: ["AI CS Assistant", "AI Review Analysis", "AI SEO Optimization", "AI Ticket Classification"],
    challenges: 3,
    prompts: 10,
    workflows: 3,
    agents: 2,
  },
  {
    id: "data",
    zh: "数据中心",
    en: "Data & Analytics Center",
    penetration: 92,
    efficiency: 48,
    totalCases: 22,
    activeMembers: 10,
    totalMembers: 10,
    topTools: ["Python", "ChatGPT", "SQL", "Metabase"],
    recentCasesZh: ["AI数据异常检测系统", "自然语言查询数据平台", "自动化报表生成"],
    recentCasesEn: ["AI Data Anomaly Detection", "Natural Language Data Query Platform", "Automated Report Generation"],
    keyMetrics: [
      { labelZh: "报表生成效率", labelEn: "Report Generation Efficiency", value: "+300%", trend: "up" },
      { labelZh: "数据查询速度", labelEn: "Data Query Speed", value: "+500%", trend: "up" },
      { labelZh: "异常检测准确", labelEn: "Anomaly Detection Accuracy", value: "94%", trend: "up" },
      { labelZh: "人工分析减少", labelEn: "Manual Analysis Reduction", value: "-60%", trend: "down" },
    ],
    aiInitiativesZh: ["AI数据分析", "AI异常检测", "AI报表自动化", "AI预测模型"],
    aiInitiativesEn: ["AI Data Analysis", "AI Anomaly Detection", "AI Report Automation", "AI Prediction Models"],
    challenges: 2,
    prompts: 8,
    workflows: 3,
    agents: 2,
  },
  {
    id: "it",
    zh: "IT技术中心",
    en: "IT & Technology Center",
    penetration: 88,
    efficiency: 42,
    totalCases: 20,
    activeMembers: 9,
    totalMembers: 10,
    topTools: ["Cursor", "ChatGPT", "GitHub Copilot", "Dify"],
    recentCasesZh: ["AI代码审查自动化", "AI辅助系统架构设计", "内部AI平台搭建"],
    recentCasesEn: ["AI Code Review Automation", "AI-Assisted System Architecture", "Internal AI Platform Development"],
    keyMetrics: [
      { labelZh: "开发效率提升", labelEn: "Dev Efficiency Improvement", value: "+45%", trend: "up" },
      { labelZh: "Bug检出率", labelEn: "Bug Detection Rate", value: "+60%", trend: "up" },
      { labelZh: "部署频率", labelEn: "Deployment Frequency", value: "+100%", trend: "up" },
      { labelZh: "技术债务减少", labelEn: "Tech Debt Reduction", value: "-30%", trend: "down" },
    ],
    aiInitiativesZh: ["AI代码助手", "AI架构设计", "AI测试自动化", "AI平台建设"],
    aiInitiativesEn: ["AI Code Assistant", "AI Architecture Design", "AI Test Automation", "AI Platform Development"],
    challenges: 2,
    prompts: 6,
    workflows: 2,
    agents: 1,
  },
  {
    id: "supply-chain",
    zh: "供应链中心",
    en: "Supply Chain Center",
    penetration: 55,
    efficiency: 22,
    totalCases: 6,
    activeMembers: 5,
    totalMembers: 8,
    topTools: ["ChatGPT", "Python", "Excel"],
    recentCasesZh: ["AI供应商评估", "AI需求预测", "物流路线AI优化"],
    recentCasesEn: ["AI Supplier Evaluation", "AI Demand Forecasting", "Logistics Route AI Optimization"],
    keyMetrics: [
      { labelZh: "需求预测准确", labelEn: "Demand Forecast Accuracy", value: "+25%", trend: "up" },
      { labelZh: "供应商评估效率", labelEn: "Supplier Evaluation Efficiency", value: "+40%", trend: "up" },
      { labelZh: "物流成本降低", labelEn: "Logistics Cost Reduction", value: "-12%", trend: "down" },
      { labelZh: "交期准时率", labelEn: "On-Time Delivery Rate", value: "91%", trend: "up" },
    ],
    aiInitiativesZh: ["AI需求预测", "AI供应商管理", "AI物流优化"],
    aiInitiativesEn: ["AI Demand Forecasting", "AI Supplier Management", "AI Logistics Optimization"],
    challenges: 1,
    prompts: 4,
    workflows: 1,
    agents: 0,
  },
  {
    id: "hr",
    zh: "人力资源中心",
    en: "Human Resources Center",
    penetration: 48,
    efficiency: 18,
    totalCases: 4,
    activeMembers: 3,
    totalMembers: 6,
    topTools: ["ChatGPT", "Notion AI"],
    recentCasesZh: ["AI简历筛选", "AI培训内容生成", "AI员工满意度分析"],
    recentCasesEn: ["AI Resume Screening", "AI Training Content Generation", "AI Employee Satisfaction Analysis"],
    keyMetrics: [
      { labelZh: "简历筛选效率", labelEn: "Resume Screening Efficiency", value: "+150%", trend: "up" },
      { labelZh: "培训内容产出", labelEn: "Training Content Output", value: "+80%", trend: "up" },
      { labelZh: "招聘周期缩短", labelEn: "Recruitment Cycle Reduction", value: "-20%", trend: "down" },
      { labelZh: "员工满意度", labelEn: "Employee Satisfaction", value: "88%", trend: "up" },
    ],
    aiInitiativesZh: ["AI招聘助手", "AI培训系统", "AI绩效分析"],
    aiInitiativesEn: ["AI Recruitment Assistant", "AI Training System", "AI Performance Analysis"],
    challenges: 1,
    prompts: 3,
    workflows: 1,
    agents: 0,
  },
];
