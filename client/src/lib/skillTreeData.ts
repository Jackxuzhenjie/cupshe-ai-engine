// ============================================================
// CUPSHE AI Skill Tree — Comprehensive Data with Knowledge Deposits
// Mapped to: 14 departments × 3 pilot projects × 4 layers
// Granularity: Each skill → resources, prompts, workflows, tasks, cases
// ============================================================

export type SkillLayer = "foundation" | "department" | "scenario" | "system";
export type PilotProject = "marketing-ai" | "creative-ai" | "data-ai";

export interface LearningResource {
  title: string;
  type: "video" | "article" | "tutorial" | "doc" | "course" | "template";
  url: string;
  duration?: string; // e.g. "15min", "2h"
  source: string;
}

export interface PromptTemplate {
  title: string;
  scenario: string; // when to use
  prompt: string;
  variables?: string[]; // placeholders to fill
  expectedOutput: string;
}

export interface WorkflowStep {
  step: number;
  action: string;
  tool?: string;
  output: string;
  tips?: string;
}

export interface WorkflowSOP {
  title: string;
  scenario: string;
  steps: WorkflowStep[];
  estimatedTime: string;
}

export interface PracticeTask {
  title: string;
  description: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  acceptanceCriteria: string[];
  estimatedTime: string;
  deliverable: string;
}

export interface LinkedCase {
  title: string;
  department: string;
  summary: string;
  impact: string;
}

export interface KnowledgeDeposit {
  resources: LearningResource[];
  prompts: PromptTemplate[];
  workflows: WorkflowSOP[];
  tasks: PracticeTask[];
  cases: LinkedCase[];
  keyTakeaways: string[]; // 3-5 core learnings
}

export interface SkillNode {
  id: string;
  titleZh: string;
  titleEn: string;
  descriptionZh: string;
  descriptionEn: string;
  layer: SkillLayer;
  level: number;
  maxLevel: number;
  departments: string[];
  pilotProjects: PilotProject[];
  progress: number;
  prerequisites: string[];
  tools: string[];
  tags: string[];
  knowledge: KnowledgeDeposit;
}

export const layerConfig: Record<SkillLayer, { zh: string; en: string; color: string; bg: string; icon: string }> = {
  foundation: { zh: "全员基础", en: "Universal Foundation", color: "text-teal-600", bg: "bg-teal-50", icon: "🌱" },
  department: { zh: "部门职能", en: "Department Skills", color: "text-blue-600", bg: "bg-blue-50", icon: "🏢" },
  scenario: { zh: "业务场景", en: "Business Scenarios", color: "text-amber-600", bg: "bg-amber-50", icon: "🎯" },
  system: { zh: "系统进阶", en: "Advanced System", color: "text-purple-600", bg: "bg-purple-50", icon: "🚀" },
};

export const pilotProjectConfig: Record<PilotProject, { zh: string; en: string; color: string; bg: string }> = {
  "marketing-ai": { zh: "效果营销AI化", en: "Performance Marketing AI", color: "text-rose-600", bg: "bg-rose-50" },
  "creative-ai": { zh: "创意AI化", en: "Creative AI", color: "text-violet-600", bg: "bg-violet-50" },
  "data-ai": { zh: "数据分析AI化", en: "Data Analytics AI", color: "text-cyan-600", bg: "bg-cyan-50" },
};

export const departmentSkillMap: Record<string, { zh: string; en: string }> = {
  marketing: { zh: "营销中心", en: "Marketing Center" },
  operations: { zh: "运营中心", en: "Operation Center" },
  "multi-channel": { zh: "多渠道事业部", en: "Multi Channel Business" },
  "channel-dev": { zh: "渠道拓展部", en: "Channel Development" },
  product: { zh: "产品中心", en: "Product Center" },
  creative: { zh: "创意中心", en: "Creative Center" },
  "supply-chain": { zh: "生产供应链中心", en: "Supply Chain Center" },
  logistics: { zh: "仓储物流中心", en: "Warehousing & Logistics" },
  it: { zh: "互联网研发中心", en: "Internet R&D Center" },
  finance: { zh: "财务中心", en: "Finance Center" },
  "gm-office": { zh: "总经办", en: "GM Office" },
  hr: { zh: "人力资源中心", en: "HR Center" },
  audit: { zh: "审计监察部", en: "Audit & Supervision" },
  "board-secretary": { zh: "董秘办", en: "Board Secretary" },
};

export const skillNodes: SkillNode[] = [
  // ========== FOUNDATION (全员必修) ==========
  {
    id: "F01",
    titleZh: "AI认知与思维",
    titleEn: "AI Awareness & Mindset",
    descriptionZh: "理解AI基本概念、能力边界与发展趋势，建立AI-first思维模式，识别工作中的AI应用机会",
    descriptionEn: "Understand AI fundamentals, capabilities, limitations and trends. Build AI-first mindset and identify AI opportunities at work",
    layer: "foundation",
    level: 1, maxLevel: 3,
    departments: ["all"],
    pilotProjects: [],
    progress: 85,
    prerequisites: [],
    tools: ["ChatGPT", "Claude", "Gemini"],
    tags: ["必修", "入门"],
    knowledge: {
      resources: [
        { title: "AI基础概念入门（内部培训）", type: "course", url: "#", duration: "2h", source: "CUPSHE内训" },
        { title: "ChatGPT/Claude/Gemini三大模型对比", type: "article", url: "#", duration: "20min", source: "CUPSHE AI知识库" },
        { title: "AI能力边界：什么能做vs什么不能做", type: "doc", url: "#", duration: "15min", source: "CUPSHE AI知识库" },
        { title: "跨境电商AI应用趋势报告2026", type: "article", url: "#", duration: "30min", source: "行业报告" },
      ],
      prompts: [
        {
          title: "AI机会识别分析",
          scenario: "分析自己岗位中哪些工作可以用AI提效",
          prompt: "我是CUPSHE {部门}的{岗位}，我的日常工作包括：\n1. {工作内容1}\n2. {工作内容2}\n3. {工作内容3}\n\n请分析每项工作中AI可以辅助的环节，按照\"效率提升潜力\"从高到低排序，并给出具体的AI工具建议和预估节省时间。",
          variables: ["部门", "岗位", "工作内容1", "工作内容2", "工作内容3"],
          expectedOutput: "按优先级排列的AI应用机会清单，含具体工具和预估效率提升"
        },
        {
          title: "AI行业动态追踪",
          scenario: "了解所在领域最新AI应用进展",
          prompt: "请帮我整理{行业领域}在过去一个月内最重要的AI应用进展，要求：\n1. 列出5-8个关键动态\n2. 每个动态说明对{我的岗位}的潜在影响\n3. 标注\"立即可用\"\"近期可用\"\"中长期关注\"三个优先级",
          variables: ["行业领域", "我的岗位"],
          expectedOutput: "分优先级的AI动态清单，含岗位影响分析"
        }
      ],
      workflows: [
        {
          title: "个人AI机会评估工作流",
          scenario: "新员工入职或季度AI能力复盘",
          steps: [
            { step: 1, action: "列出自己所有日常工作任务（至少10项）", output: "任务清单", tips: "按时间占比排序" },
            { step: 2, action: "用ChatGPT分析每项任务的AI应用可能性", tool: "ChatGPT", output: "AI机会矩阵" },
            { step: 3, action: "选择Top 3高价值场景，尝试用AI工具完成", tool: "ChatGPT/Claude", output: "实操体验记录" },
            { step: 4, action: "记录效率对比（AI前 vs AI后）", output: "效率对比表" },
            { step: 5, action: "在双周分享会上分享发现", output: "分享PPT/文档" },
          ],
          estimatedTime: "3-5天（分散进行）"
        }
      ],
      tasks: [
        {
          title: "我的AI机会地图",
          description: "梳理自己岗位的所有工作任务，识别至少5个AI应用机会，并选择1个实际尝试",
          difficulty: "beginner",
          acceptanceCriteria: [
            "完成个人工作任务清单（≥10项）",
            "识别至少5个AI应用机会并说明理由",
            "实际使用AI工具完成1项任务并记录效果对比",
            "在团队内分享发现"
          ],
          estimatedTime: "1周",
          deliverable: "《我的AI机会地图》文档"
        }
      ],
      cases: [
        { title: "运营中心客服团队AI认知转型", department: "运营中心", summary: "客服团队通过AI认知培训，识别出5个高价值AI应用场景", impact: "团队AI工具使用率从15%提升至75%" },
      ],
      keyTakeaways: [
        "AI是增强工具而非替代工具，核心是人机协作",
        "每个岗位都有AI应用机会，关键是识别高价值场景",
        "AI能力边界：擅长模式识别和内容生成，不擅长精确计算和实时数据",
        "持续关注AI发展，每月至少了解一个新工具或新能力"
      ]
    }
  },
  {
    id: "F02",
    titleZh: "Prompt Engineering基础",
    titleEn: "Prompt Engineering Basics",
    descriptionZh: "掌握与AI大模型有效沟通的技巧：指令设计、角色设定、Few-shot示例、上下文管理、输出格式控制",
    descriptionEn: "Master effective AI communication: instruction design, role setting, few-shot examples, context management, output format control",
    layer: "foundation",
    level: 1, maxLevel: 3,
    departments: ["all"],
    pilotProjects: [],
    progress: 78,
    prerequisites: ["F01"],
    tools: ["ChatGPT", "Claude"],
    tags: ["必修", "核心"],
    knowledge: {
      resources: [
        { title: "Prompt Engineering完全指南（内部版）", type: "course", url: "#", duration: "3h", source: "CUPSHE内训" },
        { title: "CUPSHE Prompt最佳实践手册", type: "doc", url: "#", duration: "30min", source: "CUPSHE AI知识库" },
        { title: "角色设定与Few-shot技巧", type: "tutorial", url: "#", duration: "45min", source: "CUPSHE内训" },
        { title: "输出格式控制实战", type: "video", url: "#", duration: "20min", source: "CUPSHE内训" },
      ],
      prompts: [
        {
          title: "结构化角色设定模板",
          scenario: "需要AI扮演特定角色完成任务时",
          prompt: "# 角色\n你是一位{角色描述}，拥有{年限}年{领域}经验。\n\n# 背景\n{任务背景说明}\n\n# 任务\n请完成以下工作：\n{具体任务描述}\n\n# 要求\n- 输出格式：{格式要求}\n- 语言风格：{风格要求}\n- 字数限制：{字数}\n\n# 示例\n输入：{示例输入}\n输出：{示例输出}",
          variables: ["角色描述", "年限", "领域", "任务背景说明", "具体任务描述", "格式要求", "风格要求", "字数", "示例输入", "示例输出"],
          expectedOutput: "符合角色定位和格式要求的高质量输出"
        },
        {
          title: "Chain-of-Thought推理模板",
          scenario: "需要AI进行复杂分析或决策时",
          prompt: "请按照以下步骤逐步分析{问题}：\n\nStep 1: 明确问题的核心要素\nStep 2: 收集和整理相关信息\nStep 3: 分析各要素之间的关系\nStep 4: 评估可能的方案（至少3个）\nStep 5: 推荐最优方案并说明理由\n\n请在每个步骤后展示你的思考过程。",
          variables: ["问题"],
          expectedOutput: "结构化的逐步分析过程和最终建议"
        },
        {
          title: "迭代优化模板",
          scenario: "对AI输出不满意需要优化时",
          prompt: "上一次的输出存在以下问题：\n{问题描述}\n\n请按以下方向优化：\n1. {优化方向1}\n2. {优化方向2}\n\n保留原输出中好的部分：\n{保留内容}\n\n请重新生成。",
          variables: ["问题描述", "优化方向1", "优化方向2", "保留内容"],
          expectedOutput: "针对性优化后的改进版输出"
        }
      ],
      workflows: [
        {
          title: "Prompt迭代优化工作流",
          scenario: "需要高质量AI输出的任何场景",
          steps: [
            { step: 1, action: "明确目标：定义期望输出的格式、风格、内容", output: "需求说明", tips: "越具体越好" },
            { step: 2, action: "编写初始Prompt：使用角色+背景+任务+要求结构", tool: "ChatGPT/Claude", output: "初始输出" },
            { step: 3, action: "评估输出：对比期望，标记不满意的部分", output: "评估记录" },
            { step: 4, action: "迭代优化：针对不足调整Prompt，添加示例或约束", tool: "ChatGPT/Claude", output: "优化后输出" },
            { step: 5, action: "固化模板：将效果好的Prompt保存到Prompt库", output: "标准Prompt模板" },
          ],
          estimatedTime: "30-60分钟"
        }
      ],
      tasks: [
        {
          title: "Prompt Engineering实战挑战",
          description: "针对自己岗位的3个常见场景，各编写一个高质量Prompt模板",
          difficulty: "beginner",
          acceptanceCriteria: [
            "完成3个不同场景的Prompt模板",
            "每个模板包含角色设定、背景、任务、要求、示例",
            "实际测试每个模板并记录输出质量评分（1-10）",
            "至少1个模板达到8分以上",
            "提交到公司Prompt库"
          ],
          estimatedTime: "3天",
          deliverable: "3个标准化Prompt模板 + 测试记录"
        }
      ],
      cases: [
        { title: "营销中心广告文案Prompt标准化", department: "营销中心", summary: "建立了10个广告文案场景的标准Prompt模板", impact: "文案产出效率提升3倍，质量评分提升40%" },
      ],
      keyTakeaways: [
        "好的Prompt = 清晰角色 + 具体背景 + 明确任务 + 格式约束 + 示例",
        "Few-shot示例是提升输出质量最有效的方法",
        "迭代优化比一次完美更重要，通常需要2-3轮",
        "将好的Prompt固化为模板，团队共享复用",
        "不同模型有不同特点：ChatGPT擅长创意，Claude擅长分析，按需选择"
      ]
    }
  },
  {
    id: "F03",
    titleZh: "AI办公提效",
    titleEn: "AI Office Productivity",
    descriptionZh: "使用AI提升日常办公效率：文档撰写与润色、邮件处理、会议纪要生成、PPT制作、Excel数据分析",
    descriptionEn: "Boost daily productivity with AI: document writing, email handling, meeting notes, PPT creation, Excel data analysis",
    layer: "foundation",
    level: 1, maxLevel: 3,
    departments: ["all"],
    pilotProjects: [],
    progress: 72,
    prerequisites: ["F02"],
    tools: ["ChatGPT", "Copilot", "Gamma", "Claude"],
    tags: ["必修", "效率"],
    knowledge: {
      resources: [
        { title: "AI办公提效实战手册", type: "doc", url: "#", duration: "40min", source: "CUPSHE内训" },
        { title: "用AI写邮件/文档/PPT全流程", type: "video", url: "#", duration: "30min", source: "CUPSHE内训" },
        { title: "Excel + AI数据分析技巧", type: "tutorial", url: "#", duration: "45min", source: "CUPSHE内训" },
        { title: "AI会议纪要自动化方案", type: "doc", url: "#", duration: "15min", source: "CUPSHE AI知识库" },
      ],
      prompts: [
        {
          title: "专业邮件撰写",
          scenario: "需要写英文商务邮件时",
          prompt: "请帮我写一封{邮件类型}邮件：\n\n收件人：{收件人角色}（{公司/部门}）\n目的：{邮件目的}\n关键信息：{要传达的核心内容}\n语气：{正式/友好/紧急}\n\n要求：\n- 主题行简洁有力\n- 正文不超过{字数}字\n- 包含明确的Call-to-Action\n- 符合CUPSHE品牌调性",
          variables: ["邮件类型", "收件人角色", "公司/部门", "邮件目的", "要传达的核心内容", "正式/友好/紧急", "字数"],
          expectedOutput: "包含主题行和正文的完整邮件"
        },
        {
          title: "会议纪要生成",
          scenario: "会议结束后快速生成纪要",
          prompt: "请根据以下会议内容生成结构化会议纪要：\n\n会议主题：{主题}\n参会人：{参会人}\n会议内容要点：\n{要点记录}\n\n输出格式：\n1. 会议概要（2-3句话）\n2. 关键决议（编号列表）\n3. 待办事项（负责人 + 截止日期）\n4. 下次会议安排",
          variables: ["主题", "参会人", "要点记录"],
          expectedOutput: "结构化会议纪要，含决议和待办"
        },
        {
          title: "数据分析报告生成",
          scenario: "需要从Excel数据生成分析报告",
          prompt: "我有一份{数据类型}数据，包含以下字段：{字段列表}\n\n请帮我分析：\n1. 数据概览（关键指标汇总）\n2. 趋势分析（同比/环比变化）\n3. 异常发现（偏离均值的数据点）\n4. 建议行动（基于数据的3-5条建议）\n\n请用表格和要点形式呈现。",
          variables: ["数据类型", "字段列表"],
          expectedOutput: "结构化数据分析报告"
        }
      ],
      workflows: [
        {
          title: "AI周报自动化工作流",
          scenario: "每周五撰写工作周报",
          steps: [
            { step: 1, action: "整理本周完成的工作要点（简单罗列）", output: "工作要点清单" },
            { step: 2, action: "用ChatGPT润色为结构化周报", tool: "ChatGPT", output: "周报初稿" },
            { step: 3, action: "添加数据支撑（关键指标变化）", output: "带数据的周报" },
            { step: 4, action: "生成下周计划", tool: "ChatGPT", output: "完整周报" },
          ],
          estimatedTime: "15-20分钟"
        }
      ],
      tasks: [
        {
          title: "一周AI办公实践",
          description: "在一周内用AI辅助完成至少5项日常办公任务，记录效率对比",
          difficulty: "beginner",
          acceptanceCriteria: [
            "用AI完成至少5项不同类型的办公任务",
            "记录每项任务的AI前耗时 vs AI后耗时",
            "总结最有效的3个AI办公场景",
            "将最佳Prompt保存到个人模板库"
          ],
          estimatedTime: "1周（融入日常工作）",
          deliverable: "《AI办公效率对比报告》"
        }
      ],
      cases: [
        { title: "总经办周报自动化", department: "总经办", summary: "用AI将周报撰写时间从2小时缩短到20分钟", impact: "每周节省1.5小时，周报质量评分提升" },
      ],
      keyTakeaways: [
        "AI办公提效的核心是将重复性文字工作交给AI",
        "邮件、文档、PPT、数据分析是四大高频场景",
        "建立个人Prompt模板库，积累越多效率越高",
        "AI生成内容需要人工审核和微调，不能直接使用"
      ]
    }
  },
  {
    id: "F04",
    titleZh: "AI信息检索与研究",
    titleEn: "AI Research & Intelligence",
    descriptionZh: "利用AI进行高效信息搜索、竞品调研、行业趋势分析、研究报告生成、多源信息整合",
    descriptionEn: "Efficient AI-powered research: information retrieval, competitor analysis, industry trends, report generation, multi-source synthesis",
    layer: "foundation",
    level: 1, maxLevel: 3,
    departments: ["all"],
    pilotProjects: [],
    progress: 65,
    prerequisites: ["F02"],
    tools: ["Perplexity", "ChatGPT", "Claude"],
    tags: ["必修", "研究"],
    knowledge: {
      resources: [
        { title: "AI搜索与研究工具对比", type: "doc", url: "#", duration: "20min", source: "CUPSHE AI知识库" },
        { title: "Perplexity深度搜索技巧", type: "tutorial", url: "#", duration: "25min", source: "CUPSHE内训" },
        { title: "竞品分析AI方法论", type: "article", url: "#", duration: "30min", source: "CUPSHE AI知识库" },
      ],
      prompts: [
        {
          title: "竞品快速调研",
          scenario: "需要快速了解竞争对手动态",
          prompt: "请帮我调研{竞品名称}（泳装/度假服饰品牌）的最新动态：\n\n1. 近3个月的重要营销活动\n2. 新品发布策略和定价区间\n3. 社媒运营策略（Instagram/TikTok粉丝量、互动率）\n4. 用户评价中的高频关键词\n5. 与CUPSHE相比的差异化定位\n\n请用表格形式对比呈现。",
          variables: ["竞品名称"],
          expectedOutput: "结构化竞品分析报告，含对比表格"
        },
        {
          title: "行业趋势分析",
          scenario: "需要了解行业最新趋势",
          prompt: "请分析{行业/领域}在2026年的关键趋势：\n\n1. 技术趋势（AI/新技术应用）\n2. 消费者行为变化\n3. 市场格局变化\n4. 监管政策变化\n5. 对CUPSHE的启示和建议\n\n请引用具体数据和来源。",
          variables: ["行业/领域"],
          expectedOutput: "含数据支撑的行业趋势分析报告"
        }
      ],
      workflows: [
        {
          title: "AI竞品监控工作流",
          scenario: "定期跟踪竞品动态",
          steps: [
            { step: 1, action: "用Perplexity搜索竞品最新动态", tool: "Perplexity", output: "原始信息" },
            { step: 2, action: "用ChatGPT整理和结构化信息", tool: "ChatGPT", output: "结构化报告" },
            { step: 3, action: "对比CUPSHE现状，标注差距和机会", output: "差距分析" },
            { step: 4, action: "生成行动建议", tool: "ChatGPT", output: "建议清单" },
          ],
          estimatedTime: "45-60分钟"
        }
      ],
      tasks: [
        {
          title: "竞品AI调研报告",
          description: "选择CUPSHE的2个主要竞品，用AI工具完成一份深度调研报告",
          difficulty: "beginner",
          acceptanceCriteria: [
            "覆盖至少2个竞品的全面分析",
            "包含定量数据（价格、社媒数据等）",
            "提出至少3条对CUPSHE有参考价值的建议",
            "注明所有信息来源"
          ],
          estimatedTime: "2天",
          deliverable: "《竞品AI调研报告》"
        }
      ],
      cases: [
        { title: "产品中心趋势调研AI化", department: "产品中心", summary: "用AI将季度趋势调研从2周缩短到3天", impact: "调研效率提升70%，覆盖信息源增加3倍" },
      ],
      keyTakeaways: [
        "Perplexity适合实时信息搜索，ChatGPT/Claude适合深度分析",
        "多源交叉验证是确保信息准确性的关键",
        "建立固定的调研模板，提高复用效率",
        "AI调研结果需要人工判断和补充行业经验"
      ]
    }
  },
  {
    id: "F05",
    titleZh: "AI安全与合规",
    titleEn: "AI Safety & Compliance",
    descriptionZh: "了解AI使用的数据安全规范、隐私保护要求、版权合规、品牌风险防范、公司AI使用政策",
    descriptionEn: "Understand AI data security, privacy protection, copyright compliance, brand risk prevention, and company AI usage policies",
    layer: "foundation",
    level: 1, maxLevel: 2,
    departments: ["all"],
    pilotProjects: [],
    progress: 60,
    prerequisites: ["F01"],
    tools: [],
    tags: ["必修", "合规"],
    knowledge: {
      resources: [
        { title: "CUPSHE AI使用安全政策", type: "doc", url: "#", duration: "20min", source: "CUPSHE合规部" },
        { title: "AI生成内容版权指南", type: "doc", url: "#", duration: "15min", source: "CUPSHE法务" },
        { title: "数据隐私与AI：GDPR/CCPA合规要点", type: "article", url: "#", duration: "25min", source: "CUPSHE AI知识库" },
      ],
      prompts: [
        {
          title: "AI使用合规自检",
          scenario: "使用AI工具前进行合规检查",
          prompt: "我计划使用{AI工具}来完成{任务描述}，涉及的数据类型包括{数据类型}。\n\n请帮我检查以下合规要点：\n1. 数据安全：是否涉及敏感数据？\n2. 隐私保护：是否涉及个人信息？\n3. 版权风险：AI输出是否可能侵权？\n4. 品牌风险：是否可能产生品牌负面影响？\n5. 建议的风险缓解措施",
          variables: ["AI工具", "任务描述", "数据类型"],
          expectedOutput: "合规风险评估和缓解建议"
        }
      ],
      workflows: [
        {
          title: "AI使用合规检查流程",
          scenario: "使用AI处理敏感数据或对外内容前",
          steps: [
            { step: 1, action: "确认数据分类：公开/内部/机密/绝密", output: "数据分类结果" },
            { step: 2, action: "检查AI工具的数据处理政策", output: "工具合规评估" },
            { step: 3, action: "脱敏处理：移除个人信息和商业机密", output: "脱敏后数据" },
            { step: 4, action: "使用AI工具完成任务", tool: "ChatGPT/Claude", output: "AI输出" },
            { step: 5, action: "审核输出：检查版权和品牌风险", output: "审核通过的内容" },
          ],
          estimatedTime: "视任务而定"
        }
      ],
      tasks: [
        {
          title: "AI合规知识测验",
          description: "完成CUPSHE AI使用安全政策学习并通过测验",
          difficulty: "beginner",
          acceptanceCriteria: [
            "阅读完CUPSHE AI使用安全政策全文",
            "通过在线测验（≥80分）",
            "能正确判断3个AI使用场景的合规性"
          ],
          estimatedTime: "1小时",
          deliverable: "测验通过证书"
        }
      ],
      cases: [],
      keyTakeaways: [
        "绝不将客户个人信息、财务数据、商业机密输入公共AI工具",
        "AI生成的图片/文案用于商业用途前需确认版权",
        "对外发布的AI生成内容必须经过人工审核",
        "遵循公司AI使用政策，有疑问先咨询AI BP"
      ]
    }
  },
  {
    id: "F06",
    titleZh: "AI协作与知识共享",
    titleEn: "AI Collaboration & Knowledge Sharing",
    descriptionZh: "在团队中有效分享AI经验、协同使用AI工具、建立AI工作流、参与案例分享与双周学习",
    descriptionEn: "Share AI experiences in teams, collaborate on AI tools, build AI workflows, participate in case sharing and bi-weekly learning",
    layer: "foundation",
    level: 1, maxLevel: 2,
    departments: ["all"],
    pilotProjects: [],
    progress: 55,
    prerequisites: ["F01"],
    tools: [],
    tags: ["必修", "协作"],
    knowledge: {
      resources: [
        { title: "AI经验分享最佳实践", type: "doc", url: "#", duration: "15min", source: "CUPSHE AI知识库" },
        { title: "如何写好一个AI案例分享", type: "template", url: "#", duration: "10min", source: "CUPSHE内训" },
        { title: "双周学习会参与指南", type: "doc", url: "#", duration: "10min", source: "CUPSHE PMO" },
      ],
      prompts: [
        {
          title: "AI案例分享模板",
          scenario: "准备双周案例分享内容",
          prompt: "请帮我将以下AI实践经验整理为一个结构化的案例分享：\n\n场景：{使用场景}\n使用的AI工具：{工具}\n具体做法：{做法描述}\n效果：{效果数据}\n\n请按以下结构输出：\n1. 背景与痛点（为什么要用AI）\n2. 解决方案（怎么用的AI）\n3. 关键Prompt/工作流（可复用的部分）\n4. 效果对比（数据说话）\n5. 经验教训（踩过的坑）\n6. 推广建议（其他团队如何复用）",
          variables: ["使用场景", "工具", "做法描述", "效果数据"],
          expectedOutput: "结构化的AI案例分享文档"
        }
      ],
      workflows: [
        {
          title: "双周案例分享准备流程",
          scenario: "每双周一次的AI案例分享会",
          steps: [
            { step: 1, action: "回顾过去两周的AI使用经历，选择最有价值的1-2个", output: "案例选题" },
            { step: 2, action: "用Prompt模板整理案例内容", tool: "ChatGPT", output: "案例文档" },
            { step: 3, action: "准备演示材料（截图、数据对比）", output: "演示PPT" },
            { step: 4, action: "分享并收集反馈", output: "反馈记录" },
            { step: 5, action: "将案例提交到案例库", output: "案例库更新" },
          ],
          estimatedTime: "1-2小时"
        }
      ],
      tasks: [
        {
          title: "我的第一次AI案例分享",
          description: "在双周学习会上完成一次AI实践案例分享",
          difficulty: "beginner",
          acceptanceCriteria: [
            "选择一个真实的AI应用场景",
            "包含可量化的效果数据",
            "提供可复用的Prompt或工作流",
            "获得至少3位同事的正面反馈"
          ],
          estimatedTime: "准备2小时 + 分享15分钟",
          deliverable: "案例分享PPT + 提交到案例库"
        }
      ],
      cases: [
        { title: "创意中心AI工作流共享机制", department: "创意中心", summary: "建立了团队AI Prompt共享库，新人上手时间缩短60%", impact: "团队AI工具使用一致性提升，减少重复探索" },
      ],
      keyTakeaways: [
        "分享是最好的学习方式，教别人的过程中自己理解更深",
        "好的案例分享要有数据、有Prompt、有可复用的工作流",
        "积极参与双周学习会，既是学习也是展示机会",
        "将个人经验沉淀到团队知识库，形成组织能力"
      ]
    }
  },

  // ========== MARKETING CENTER (营销中心) ==========
  {
    id: "MK01",
    titleZh: "AI广告投放优化",
    titleEn: "AI Ad Campaign Optimization",
    descriptionZh: "利用AI进行广告受众分析、出价策略优化、素材A/B自动测试、ROI预测与预算分配，覆盖Google/Meta/TikTok等平台",
    descriptionEn: "AI-powered audience analysis, bidding optimization, creative A/B testing, ROI prediction across Google/Meta/TikTok platforms",
    layer: "department",
    level: 2, maxLevel: 4,
    departments: ["marketing"],
    pilotProjects: ["marketing-ai"],
    progress: 45,
    prerequisites: ["F02", "F04"],
    tools: ["ChatGPT", "Google Ads AI", "Meta Advantage+", "TikTok Smart+"],
    tags: ["广告", "ROI", "投放"],
    knowledge: {
      resources: [
        { title: "Meta Advantage+智能投放实操指南", type: "tutorial", url: "#", duration: "1h", source: "CUPSHE营销" },
        { title: "Google Performance Max最佳实践", type: "doc", url: "#", duration: "45min", source: "CUPSHE营销" },
        { title: "AI驱动的广告预算分配模型", type: "article", url: "#", duration: "30min", source: "CUPSHE AI知识库" },
        { title: "TikTok Smart+广告自动化设置", type: "video", url: "#", duration: "20min", source: "CUPSHE营销" },
      ],
      prompts: [
        {
          title: "广告受众分析",
          scenario: "新广告系列启动前的受众洞察",
          prompt: "我正在为CUPSHE的{产品线}（如泳装/度假装/运动装）策划{平台}广告投放。\n\n目标市场：美国\n预算：{预算}美元/月\n目标：{ROAS目标}\n\n请帮我分析：\n1. 核心受众画像（年龄/兴趣/行为/收入）\n2. 建议的受众分层策略（冷/温/热流量）\n3. 每层受众的出价策略建议\n4. 竞品受众重叠分析\n5. 季节性调整建议（泳装旺季vs淡季）",
          variables: ["产品线", "平台", "预算", "ROAS目标"],
          expectedOutput: "分层受众策略和出价建议"
        },
        {
          title: "广告文案A/B测试方案",
          scenario: "需要批量生成广告文案变体",
          prompt: "为CUPSHE {产品}生成{数量}组广告文案变体，用于A/B测试：\n\n产品卖点：{卖点}\n目标受众：{受众}\n平台：{平台}\n\n每组包含：\n- 主标题（≤40字符）\n- 副标题（≤90字符）\n- CTA按钮文案\n- 变体策略说明（为什么这样写）\n\n变体方向：价格导向/情感导向/功能导向/社交证明/紧迫感",
          variables: ["产品", "数量", "卖点", "受众", "平台"],
          expectedOutput: "多组广告文案变体+策略说明"
        }
      ],
      workflows: [
        {
          title: "AI广告投放优化周循环",
          scenario: "每周广告效果优化",
          steps: [
            { step: 1, action: "导出上周各平台广告数据（花费/展示/点击/转化/ROAS）", output: "原始数据表", tips: "统一口径和时间维度" },
            { step: 2, action: "用ChatGPT分析数据异常和优化机会", tool: "ChatGPT", output: "分析报告" },
            { step: 3, action: "根据分析调整受众/出价/素材", tool: "Google/Meta/TikTok后台", output: "调整记录" },
            { step: 4, action: "用AI生成新一批测试素材文案", tool: "ChatGPT", output: "新素材文案" },
            { step: 5, action: "设置新的A/B测试", output: "测试计划" },
          ],
          estimatedTime: "2-3小时/周"
        }
      ],
      tasks: [
        {
          title: "单平台广告AI优化实战",
          description: "选择一个广告平台，用AI辅助完成一轮完整的投放优化",
          difficulty: "intermediate",
          acceptanceCriteria: [
            "完成受众分析和分层策略",
            "用AI生成至少5组文案变体",
            "设置A/B测试并运行至少1周",
            "产出数据分析报告和优化建议",
            "ROAS较优化前提升≥10%"
          ],
          estimatedTime: "2周",
          deliverable: "《AI广告优化实战报告》含数据对比"
        }
      ],
      cases: [
        { title: "Meta Advantage+泳装广告ROAS提升", department: "营销中心", summary: "通过AI受众扩展和创意自动优化，泳装系列ROAS提升35%", impact: "月度广告ROI从2.8提升至3.8" },
      ],
      keyTakeaways: [
        "AI广告优化的核心是数据驱动的持续迭代",
        "Advantage+/Performance Max等AI功能需要足够数据量才能发挥效果",
        "AI生成的广告文案需要品牌调性审核",
        "跨平台数据整合分析比单平台优化更有价值"
      ]
    }
  },
  {
    id: "MK02",
    titleZh: "AI社媒内容创作",
    titleEn: "AI Social Media Content Creation",
    descriptionZh: "AI辅助生成社交媒体文案(Instagram/TikTok/Facebook/Pinterest)、话题策划、发布时间优化、UGC内容策展",
    descriptionEn: "AI-assisted social media copy for IG/TikTok/FB/Pinterest, topic planning, posting time optimization, UGC curation",
    layer: "department",
    level: 2, maxLevel: 4,
    departments: ["marketing"],
    pilotProjects: ["marketing-ai", "creative-ai"],
    progress: 52,
    prerequisites: ["F02", "F03"],
    tools: ["ChatGPT", "Jasper", "Canva AI", "CapCut"],
    tags: ["社媒", "内容", "创作"],
    knowledge: {
      resources: [
        { title: "CUPSHE社媒内容AI创作手册", type: "doc", url: "#", duration: "40min", source: "CUPSHE营销" },
        { title: "Instagram/TikTok AI文案技巧", type: "tutorial", url: "#", duration: "30min", source: "CUPSHE内训" },
        { title: "UGC内容AI策展方法", type: "article", url: "#", duration: "20min", source: "CUPSHE AI知识库" },
      ],
      prompts: [
        {
          title: "Instagram帖文创作",
          scenario: "为CUPSHE产品创作Instagram帖文",
          prompt: "为CUPSHE {产品名}创作一条Instagram帖文：\n\n产品特点：{特点}\n目标受众：{受众}\n季节/场景：{场景}\n品牌调性：自信、包容、阳光、度假感\n\n要求：\n- Caption 150-200字（英文）\n- 包含品牌故事元素\n- 3-5个相关hashtag\n- 1个互动问题（提升评论）\n- 符合CUPSHE #LiveLifeInColor 调性",
          variables: ["产品名", "特点", "受众", "场景"],
          expectedOutput: "完整Instagram帖文含hashtag和互动元素"
        }
      ],
      workflows: [
        {
          title: "社媒内容周计划AI工作流",
          scenario: "每周社媒内容规划",
          steps: [
            { step: 1, action: "分析上周各平台内容表现数据", output: "表现分析" },
            { step: 2, action: "用AI生成本周内容主题和日历", tool: "ChatGPT", output: "内容日历" },
            { step: 3, action: "批量生成各平台文案", tool: "ChatGPT/Jasper", output: "文案库" },
            { step: 4, action: "配合创意中心准备视觉素材", tool: "Canva AI", output: "素材包" },
            { step: 5, action: "排期发布并设置互动监控", output: "发布计划" },
          ],
          estimatedTime: "3-4小时/周"
        }
      ],
      tasks: [
        {
          title: "一周社媒AI内容实战",
          description: "用AI辅助完成一周的社媒内容创作和发布",
          difficulty: "intermediate",
          acceptanceCriteria: [
            "用AI创作至少10条社媒帖文（覆盖IG/TikTok/FB）",
            "互动率不低于账号平均水平",
            "建立可复用的社媒Prompt模板库",
            "记录AI创作vs人工创作的效率对比"
          ],
          estimatedTime: "1周",
          deliverable: "社媒AI创作效率报告 + Prompt模板"
        }
      ],
      cases: [
        { title: "TikTok内容AI批量创作", department: "营销中心", summary: "用AI将TikTok脚本创作效率提升4倍", impact: "月度内容产出从20条增至80条" },
      ],
      keyTakeaways: [
        "不同平台需要不同风格的AI Prompt",
        "AI文案需要注入CUPSHE品牌调性和真实感",
        "UGC策展比纯AI生成更有真实感和互动性",
        "数据驱动的内容优化比直觉更可靠"
      ]
    }
  },
  {
    id: "MK03",
    titleZh: "AI SEO/SEM优化",
    titleEn: "AI SEO/SEM Optimization",
    descriptionZh: "利用AI进行关键词研究与聚类、搜索广告文案优化、SEO内容策略、竞品搜索份额分析、长尾词挖掘",
    descriptionEn: "AI-powered keyword research, search ad copy optimization, SEO content strategy, competitor search share analysis",
    layer: "department",
    level: 2, maxLevel: 4,
    departments: ["marketing"],
    pilotProjects: ["marketing-ai"],
    progress: 38,
    prerequisites: ["F02", "F04"],
    tools: ["ChatGPT", "Semrush", "Ahrefs", "SurferSEO"],
    tags: ["SEO", "SEM", "搜索"],
    knowledge: {
      resources: [
        { title: "CUPSHE SEO AI优化实战", type: "tutorial", url: "#", duration: "1h", source: "CUPSHE营销" },
        { title: "AI关键词研究方法论", type: "doc", url: "#", duration: "30min", source: "CUPSHE AI知识库" },
      ],
      prompts: [
        {
          title: "SEO关键词聚类",
          scenario: "为新品类页面做关键词规划",
          prompt: "请为CUPSHE的{产品品类}页面做SEO关键词规划：\n\n目标市场：美国\n竞品参考：{竞品URL}\n\n请输出：\n1. 核心关键词（5个，含月搜索量估算）\n2. 长尾关键词聚类（按用户意图分组）\n3. 内容主题建议（每个聚类对应的内容方向）\n4. 标题标签和Meta描述建议\n5. 内部链接策略",
          variables: ["产品品类", "竞品URL"],
          expectedOutput: "结构化关键词策略和内容规划"
        }
      ],
      workflows: [],
      tasks: [
        {
          title: "AI SEO内容优化实战",
          description: "选择一个CUPSHE品类页面，用AI完成SEO优化",
          difficulty: "intermediate",
          acceptanceCriteria: [
            "完成关键词研究和聚类分析",
            "优化页面标题、Meta描述、H标签",
            "用AI生成SEO友好的产品描述",
            "2周后检查排名变化"
          ],
          estimatedTime: "1周",
          deliverable: "SEO优化方案 + 执行记录"
        }
      ],
      cases: [],
      keyTakeaways: [
        "AI关键词研究要结合搜索工具数据验证",
        "SEO内容需要平衡搜索引擎和用户体验",
        "长尾关键词是独立站流量增长的关键"
      ]
    }
  },
  {
    id: "MK04",
    titleZh: "AI邮件营销自动化",
    titleEn: "AI Email Marketing Automation",
    descriptionZh: "AI驱动的邮件个性化内容生成、主题行优化、发送时间预测、用户分群自动化、转化漏斗分析",
    descriptionEn: "AI-driven email personalization, subject line optimization, send time prediction, user segmentation, conversion funnel analysis",
    layer: "department",
    level: 2, maxLevel: 4,
    departments: ["marketing"],
    pilotProjects: ["marketing-ai"],
    progress: 30,
    prerequisites: ["F02"],
    tools: ["Klaviyo AI", "ChatGPT", "Mailchimp AI"],
    tags: ["邮件", "自动化", "个性化"],
    knowledge: {
      resources: [
        { title: "Klaviyo AI个性化邮件设置指南", type: "tutorial", url: "#", duration: "45min", source: "CUPSHE营销" },
        { title: "邮件主题行AI优化技巧", type: "doc", url: "#", duration: "20min", source: "CUPSHE AI知识库" },
      ],
      prompts: [
        {
          title: "邮件主题行A/B测试",
          scenario: "为促销邮件生成多个主题行变体",
          prompt: "为CUPSHE的{活动类型}邮件生成10个主题行变体：\n\n活动内容：{活动描述}\n目标受众：{受众分群}\n\n变体方向：\n- 紧迫感（限时/限量）\n- 好奇心（悬念/问题）\n- 利益驱动（折扣/赠品）\n- 情感连接（故事/场景）\n- 社交证明（畅销/好评）\n\n每个主题行≤50字符，标注预估打开率（高/中/低）",
          variables: ["活动类型", "活动描述", "受众分群"],
          expectedOutput: "10个主题行变体+预估效果"
        }
      ],
      workflows: [],
      tasks: [
        {
          title: "邮件AI个性化实战",
          description: "用AI优化一次邮件营销活动的全流程",
          difficulty: "intermediate",
          acceptanceCriteria: [
            "用AI生成至少5个主题行变体并A/B测试",
            "实现至少3个用户分群的个性化内容",
            "打开率较历史均值提升≥5%",
            "记录AI辅助的效率提升数据"
          ],
          estimatedTime: "1周",
          deliverable: "邮件AI优化报告"
        }
      ],
      cases: [],
      keyTakeaways: [
        "主题行是邮件营销最重要的AI优化点",
        "个性化不仅是插入姓名，而是内容和推荐的个性化",
        "A/B测试是验证AI优化效果的唯一标准"
      ]
    }
  },
  {
    id: "MK05",
    titleZh: "AI KOL/红人营销",
    titleEn: "AI Influencer Marketing",
    descriptionZh: "AI辅助红人筛选与匹配、内容合作策划、效果预测与ROI分析、#CupsheCrew社区运营",
    descriptionEn: "AI-assisted influencer discovery & matching, content collaboration, performance prediction, #CupsheCrew community management",
    layer: "department",
    level: 3, maxLevel: 4,
    departments: ["marketing"],
    pilotProjects: ["marketing-ai"],
    progress: 20,
    prerequisites: ["MK02"],
    tools: ["Modash", "ChatGPT", "CreatorIQ"],
    tags: ["红人", "KOL", "社区"],
    knowledge: {
      resources: [
        { title: "AI红人筛选与匹配方法", type: "doc", url: "#", duration: "30min", source: "CUPSHE营销" },
        { title: "#CupsheCrew社区AI运营手册", type: "doc", url: "#", duration: "25min", source: "CUPSHE营销" },
      ],
      prompts: [
        {
          title: "红人合作方案生成",
          scenario: "为特定产品线策划红人合作",
          prompt: "为CUPSHE {产品线} 策划一次红人营销合作方案：\n\n预算：{预算}\n目标：{目标（品牌曝光/带货/UGC）}\n平台：{Instagram/TikTok}\n\n请输出：\n1. 理想红人画像（粉丝量级/领域/风格）\n2. 合作形式建议（3种）\n3. 内容Brief模板\n4. 预估效果（曝光/互动/转化）\n5. ROI评估框架",
          variables: ["产品线", "预算", "目标", "Instagram/TikTok"],
          expectedOutput: "完整红人合作方案"
        }
      ],
      workflows: [],
      tasks: [
        {
          title: "AI红人筛选实战",
          description: "用AI工具完成一次红人筛选和合作方案制定",
          difficulty: "advanced",
          acceptanceCriteria: [
            "筛选出至少10个匹配的红人候选",
            "完成红人数据分析（粉丝质量/互动率/品牌匹配度）",
            "制定合作方案和内容Brief",
            "预估ROI并设定KPI"
          ],
          estimatedTime: "1周",
          deliverable: "红人合作方案书"
        }
      ],
      cases: [],
      keyTakeaways: [
        "AI筛选红人要看数据质量而非粉丝数量",
        "品牌匹配度比粉丝量更重要",
        "#CupsheCrew社区是长期品牌资产"
      ]
    }
  },
  {
    id: "MK06",
    titleZh: "AI品牌舆情监控",
    titleEn: "AI Brand Sentiment Monitoring",
    descriptionZh: "利用AI实时监控品牌口碑(Trustpilot/社媒/论坛)、竞品动态、消费者情感分析、危机预警与应对",
    descriptionEn: "Real-time brand reputation monitoring across Trustpilot/social/forums, competitor tracking, sentiment analysis, crisis alerts",
    layer: "department",
    level: 2, maxLevel: 3,
    departments: ["marketing"],
    pilotProjects: [],
    progress: 25,
    prerequisites: ["F04"],
    tools: ["Brandwatch", "ChatGPT", "Sprinklr"],
    tags: ["舆情", "品牌", "监控"],
    knowledge: {
      resources: [
        { title: "品牌舆情AI监控体系搭建", type: "doc", url: "#", duration: "30min", source: "CUPSHE营销" },
      ],
      prompts: [
        {
          title: "品牌评价情感分析",
          scenario: "分析一批用户评价的情感倾向",
          prompt: "请分析以下CUPSHE用户评价，提取：\n1. 整体情感倾向（正面/中性/负面比例）\n2. 高频正面关键词Top10\n3. 高频负面关键词Top10\n4. 产品改进建议Top5\n5. 竞品对比提及\n\n评价内容：\n{评价文本}",
          variables: ["评价文本"],
          expectedOutput: "结构化情感分析报告"
        }
      ],
      workflows: [],
      tasks: [
        {
          title: "品牌舆情AI分析报告",
          description: "用AI分析CUPSHE在Trustpilot和社媒上的品牌口碑",
          difficulty: "intermediate",
          acceptanceCriteria: [
            "收集至少100条用户评价",
            "完成情感分析和关键词提取",
            "产出可行动的改进建议"
          ],
          estimatedTime: "3天",
          deliverable: "品牌舆情分析报告"
        }
      ],
      cases: [],
      keyTakeaways: [
        "舆情监控要覆盖多平台多语言",
        "负面评价是产品改进的宝贵信息源",
        "AI情感分析需要人工校准和验证"
      ]
    }
  },

  // ========== OPERATION CENTER (运营中心) ==========
  {
    id: "OP01", titleZh: "AI客服智能应答", titleEn: "AI Smart Customer Service",
    descriptionZh: "构建AI客服知识库(RAG)、自动回复系统、智能工单路由、多语言客服支持、客户情绪识别",
    descriptionEn: "Build AI customer service knowledge base (RAG), auto-reply system, smart ticket routing, multilingual support, emotion detection",
    layer: "department", level: 2, maxLevel: 4, departments: ["operations"], pilotProjects: [],
    progress: 68, prerequisites: ["F02"], tools: ["OpenAI API", "Zendesk AI", "Intercom"],
    tags: ["客服", "RAG", "知识库"],
    knowledge: {
      resources: [
        { title: "AI客服知识库(RAG)搭建指南", type: "tutorial", url: "#", duration: "1.5h", source: "CUPSHE运营" },
        { title: "Zendesk AI自动回复配置", type: "doc", url: "#", duration: "30min", source: "CUPSHE运营" },
      ],
      prompts: [{
        title: "客服FAQ知识库构建", scenario: "梳理高频问题建立AI知识库",
        prompt: "请帮我整理CUPSHE客服的高频问题知识库：\n\n品类：{品类}\n常见问题领域：尺码/物流/退换货/面料/优惠\n\n请为每个问题提供：\n1. 标准问题（中英文）\n2. 标准回答（中英文）\n3. 关键词标签\n4. 升级条件（何时转人工）",
        variables: ["品类"], expectedOutput: "结构化FAQ知识库"
      }],
      workflows: [{
        title: "AI客服知识库更新流程", scenario: "每周更新客服知识库",
        steps: [
          { step: 1, action: "导出本周客服对话中AI无法回答的问题", output: "未解决问题清单" },
          { step: 2, action: "用ChatGPT生成标准问答对", tool: "ChatGPT", output: "新FAQ条目" },
          { step: 3, action: "人工审核并导入知识库", output: "更新后知识库" },
          { step: 4, action: "测试AI回答准确率", output: "准确率报告" },
        ],
        estimatedTime: "2小时/周"
      }],
      tasks: [{
        title: "AI客服知识库搭建", description: "为一个产品品类搭建完整的AI客服知识库",
        difficulty: "intermediate",
        acceptanceCriteria: ["覆盖该品类Top 50高频问题", "AI自动回答准确率≥85%", "支持中英文双语", "设置合理的人工升级规则"],
        estimatedTime: "2周", deliverable: "AI客服知识库 + 准确率测试报告"
      }],
      cases: [{ title: "泳装品类AI客服上线", department: "运营中心", summary: "泳装品类AI客服覆盖80%常见问题", impact: "人工客服工作量减少45%，响应时间从4小时缩短到30秒" }],
      keyTakeaways: ["RAG知识库质量决定AI客服质量", "定期更新知识库是持续优化的关键", "设置合理的人工升级阈值，避免AI硬答"]
    }
  },
  {
    id: "OP02", titleZh: "AI用户评论分析", titleEn: "AI Review & Feedback Analysis",
    descriptionZh: "利用NLP分析用户评论(Amazon/独立站/社媒/Trustpilot)，提取产品洞察、尺码反馈、面料偏好、改进建议",
    descriptionEn: "NLP-powered review analysis across Amazon/DTC/social/Trustpilot for product insights, sizing feedback, fabric preferences",
    layer: "department", level: 2, maxLevel: 4, departments: ["operations", "product"], pilotProjects: ["data-ai"],
    progress: 40, prerequisites: ["F02", "F04"], tools: ["ChatGPT", "Python", "MonkeyLearn"],
    tags: ["评论", "NLP", "洞察"],
    knowledge: {
      resources: [{ title: "用户评论AI分析方法论", type: "doc", url: "#", duration: "30min", source: "CUPSHE运营" }],
      prompts: [{
        title: "用户评论批量分析", scenario: "分析一批产品评论提取洞察",
        prompt: "请分析以下{产品}的用户评论（{数量}条），提取：\n1. 尺码反馈（偏大/偏小/正常比例）\n2. 面料评价（舒适度/质感/耐用性）\n3. 设计评价（款式/颜色/细节）\n4. 物流体验\n5. 改进建议Top5\n\n评论：\n{评论内容}",
        variables: ["产品", "数量", "评论内容"], expectedOutput: "结构化评论洞察报告"
      }],
      workflows: [], tasks: [{
        title: "产品评论AI洞察报告", description: "用AI分析一个SKU的全渠道用户评论",
        difficulty: "intermediate",
        acceptanceCriteria: ["收集至少200条评论（多渠道）", "完成情感分析和主题提取", "产出可行动的产品改进建议"],
        estimatedTime: "3天", deliverable: "产品评论AI洞察报告"
      }],
      cases: [], keyTakeaways: ["多渠道评论交叉分析更全面", "尺码反馈是泳装品类最关键的评论维度", "AI分析结果要与产品团队共同解读"]
    }
  },
  {
    id: "OP03", titleZh: "AI用户生命周期管理", titleEn: "AI Customer Lifecycle Management",
    descriptionZh: "AI驱动的用户分群、RFM分析、流失预警、复购促进、CLV预测、个性化触达策略",
    descriptionEn: "AI-driven user segmentation, RFM analysis, churn prediction, repurchase promotion, CLV prediction, personalized outreach",
    layer: "department", level: 2, maxLevel: 4, departments: ["operations"], pilotProjects: ["data-ai"],
    progress: 35, prerequisites: ["F03"], tools: ["Klaviyo AI", "ChatGPT", "Python"],
    tags: ["用户", "生命周期", "CLV"],
    knowledge: {
      resources: [{ title: "AI用户分群与CLV预测", type: "doc", url: "#", duration: "40min", source: "CUPSHE运营" }],
      prompts: [{
        title: "用户分群策略", scenario: "制定精细化用户运营策略",
        prompt: "基于以下用户数据维度，帮我设计CUPSHE的用户分群策略：\n\n可用数据：{数据维度}\n\n请输出：\n1. 用户分群模型（至少5个群体）\n2. 每个群体的特征描述\n3. 对应的运营策略\n4. 关键指标和目标",
        variables: ["数据维度"], expectedOutput: "用户分群策略方案"
      }],
      workflows: [], tasks: [{
        title: "AI用户分群实战", description: "用AI完成一次用户分群分析和策略制定",
        difficulty: "intermediate",
        acceptanceCriteria: ["完成RFM分析", "识别至少5个用户群体", "为每个群体制定差异化策略"],
        estimatedTime: "1周", deliverable: "用户分群分析报告"
      }],
      cases: [], keyTakeaways: ["用户分群是精细化运营的基础", "CLV预测帮助优化获客成本决策"]
    }
  },
  {
    id: "OP04", titleZh: "AI站内搜索与推荐", titleEn: "AI On-Site Search & Recommendations",
    descriptionZh: "优化独立站AI搜索(语义搜索/拼写纠错/同义词)、个性化商品推荐、\"猜你喜欢\"、搭配推荐",
    descriptionEn: "Optimize DTC AI search (semantic/spell-check/synonyms), personalized product recommendations, outfit suggestions",
    layer: "scenario", level: 3, maxLevel: 4, departments: ["operations", "it"], pilotProjects: ["data-ai"],
    progress: 28, prerequisites: ["OP03"], tools: ["Algolia", "ChatGPT", "AWS Personalize"],
    tags: ["搜索", "推荐", "个性化"],
    knowledge: {
      resources: [{ title: "独立站AI搜索优化指南", type: "doc", url: "#", duration: "30min", source: "CUPSHE运营" }],
      prompts: [{
        title: "搜索词分析", scenario: "分析站内搜索数据优化搜索体验",
        prompt: "请分析以下站内搜索数据：\n{搜索词列表及频次}\n\n请输出：\n1. 搜索词聚类（按用户意图分组）\n2. 零结果搜索词及建议映射\n3. 同义词/拼写变体建议\n4. 搜索结果优化建议",
        variables: ["搜索词列表及频次"], expectedOutput: "搜索优化建议报告"
      }],
      workflows: [], tasks: [{
        title: "站内搜索AI优化", description: "分析站内搜索数据并优化搜索体验",
        difficulty: "advanced",
        acceptanceCriteria: ["分析至少1000条搜索记录", "优化零结果搜索率降低≥30%", "建立同义词和拼写纠错词典"],
        estimatedTime: "2周", deliverable: "搜索优化方案 + 效果数据"
      }],
      cases: [], keyTakeaways: ["零结果搜索是最大的转化损失", "语义搜索比关键词匹配更符合用户习惯"]
    }
  },

  // ========== MULTI-CHANNEL (多渠道事业部) ==========
  {
    id: "MC01", titleZh: "AI Amazon Listing优化", titleEn: "AI Amazon Listing Optimization",
    descriptionZh: "利用AI优化Amazon产品标题、五点描述、A+内容、后台关键词、评论管理，提升搜索排名和转化率",
    descriptionEn: "AI-optimized Amazon product titles, bullet points, A+ content, backend keywords, review management for better ranking & conversion",
    layer: "department", level: 2, maxLevel: 4, departments: ["multi-channel"], pilotProjects: ["marketing-ai"],
    progress: 42, prerequisites: ["F02"], tools: ["ChatGPT", "Helium 10", "Jungle Scout"],
    tags: ["Amazon", "Listing", "转化"],
    knowledge: {
      resources: [
        { title: "Amazon Listing AI优化完全指南", type: "tutorial", url: "#", duration: "1h", source: "CUPSHE多渠道" },
        { title: "A+内容AI创作方法", type: "doc", url: "#", duration: "30min", source: "CUPSHE多渠道" },
      ],
      prompts: [{
        title: "Amazon Listing优化", scenario: "新品上架或Listing优化",
        prompt: "请为CUPSHE的{产品}优化Amazon Listing：\n\n产品特点：{特点}\n目标关键词：{关键词}\n竞品ASIN：{竞品}\n\n请输出：\n1. 优化后标题（≤200字符，含核心关键词）\n2. 五点描述（每点突出一个卖点）\n3. 后台搜索词建议（250字符内）\n4. A+内容文案框架",
        variables: ["产品", "特点", "关键词", "竞品"], expectedOutput: "完整Listing优化方案"
      }],
      workflows: [{
        title: "Amazon Listing AI优化流程", scenario: "新品上架或定期优化",
        steps: [
          { step: 1, action: "用Helium 10分析竞品关键词和排名", tool: "Helium 10", output: "关键词分析" },
          { step: 2, action: "用ChatGPT生成优化后的Listing文案", tool: "ChatGPT", output: "Listing文案" },
          { step: 3, action: "A/B测试标题和主图", output: "测试计划" },
          { step: 4, action: "监控排名和转化率变化", output: "效果报告" },
        ],
        estimatedTime: "3-4小时/SKU"
      }],
      tasks: [{
        title: "Amazon Listing AI优化实战", description: "用AI优化5个CUPSHE Amazon SKU的Listing",
        difficulty: "intermediate",
        acceptanceCriteria: ["完成5个SKU的Listing优化", "关键词覆盖率提升", "2周后检查排名和转化变化"],
        estimatedTime: "1周", deliverable: "Listing优化报告"
      }],
      cases: [{ title: "泳装Top 10 SKU Listing AI优化", department: "多渠道事业部", summary: "AI优化后Top 10 SKU平均排名提升15位", impact: "自然流量增长22%，转化率提升8%" }],
      keyTakeaways: ["标题是Amazon SEO最重要的元素", "AI生成文案需要符合Amazon政策", "持续A/B测试是优化的关键"]
    }
  },
  {
    id: "MC02", titleZh: "AI多平台价格策略", titleEn: "AI Multi-Platform Pricing Strategy",
    descriptionZh: "利用AI进行竞品价格监控、动态定价策略、促销效果预测、跨平台价格一致性管理",
    descriptionEn: "AI-powered competitor price monitoring, dynamic pricing, promotion effect prediction, cross-platform price consistency",
    layer: "department", level: 2, maxLevel: 3, departments: ["multi-channel", "operations"], pilotProjects: ["data-ai"],
    progress: 22, prerequisites: ["F03"], tools: ["ChatGPT", "Python", "Prisync"],
    tags: ["定价", "竞品", "策略"],
    knowledge: {
      resources: [{ title: "AI动态定价方法论", type: "doc", url: "#", duration: "30min", source: "CUPSHE多渠道" }],
      prompts: [{
        title: "竞品价格分析", scenario: "分析竞品定价策略",
        prompt: "请分析以下竞品的定价策略：\n{竞品价格数据}\n\n对比CUPSHE当前定价，输出：\n1. 价格带分析\n2. 促销频率和力度对比\n3. 定价建议\n4. 促销日历建议",
        variables: ["竞品价格数据"], expectedOutput: "定价策略分析报告"
      }],
      workflows: [], tasks: [{
        title: "竞品定价AI分析", description: "用AI分析3个竞品的定价策略并提出建议",
        difficulty: "intermediate",
        acceptanceCriteria: ["覆盖至少3个竞品", "包含价格带分析和促销分析", "提出可行的定价调整建议"],
        estimatedTime: "3天", deliverable: "竞品定价分析报告"
      }],
      cases: [], keyTakeaways: ["定价策略要考虑品牌定位而非单纯价格竞争", "促销效果预测帮助优化促销ROI"]
    }
  },
  {
    id: "MC03", titleZh: "AI跨平台数据整合", titleEn: "AI Cross-Platform Data Integration",
    descriptionZh: "利用AI整合独立站/Amazon/TikTok Shop等多平台数据，统一分析用户行为、产品表现、渠道效率",
    descriptionEn: "AI-powered integration of DTC/Amazon/TikTok Shop data for unified analysis of user behavior, product performance, channel efficiency",
    layer: "scenario", level: 3, maxLevel: 4, departments: ["multi-channel", "it"], pilotProjects: ["data-ai"],
    progress: 15, prerequisites: ["MC01", "MC02"], tools: ["Python", "ChatGPT", "Tableau"],
    tags: ["跨平台", "数据整合", "分析"],
    knowledge: {
      resources: [{ title: "跨平台数据整合AI方案", type: "doc", url: "#", duration: "40min", source: "CUPSHE多渠道" }],
      prompts: [], workflows: [], tasks: [{
        title: "跨平台数据分析报告", description: "整合多平台数据产出统一分析报告",
        difficulty: "advanced",
        acceptanceCriteria: ["整合至少3个平台数据", "统一指标口径", "产出跨平台对比分析"],
        estimatedTime: "2周", deliverable: "跨平台数据分析报告"
      }],
      cases: [], keyTakeaways: ["统一数据口径是跨平台分析的前提", "渠道效率对比帮助优化资源分配"]
    }
  },

  // ========== CHANNEL DEVELOPMENT (渠道拓展部) ==========
  {
    id: "CD01", titleZh: "AI新渠道评估", titleEn: "AI New Channel Assessment",
    descriptionZh: "利用AI评估新销售渠道(Walmart/Target/新兴平台)的市场潜力、竞争格局、进入策略",
    descriptionEn: "AI-powered assessment of new sales channels (Walmart/Target/emerging platforms) for market potential and entry strategy",
    layer: "department", level: 2, maxLevel: 3, departments: ["channel-dev"], pilotProjects: [],
    progress: 18, prerequisites: ["F04"], tools: ["ChatGPT", "Perplexity", "SimilarWeb"],
    tags: ["渠道", "评估", "拓展"],
    knowledge: {
      resources: [{ title: "新渠道AI评估框架", type: "doc", url: "#", duration: "25min", source: "CUPSHE渠道" }],
      prompts: [{
        title: "新渠道市场评估", scenario: "评估是否进入新销售渠道",
        prompt: "请帮我评估CUPSHE进入{渠道名称}的可行性：\n\n1. 该渠道的市场规模和增长趋势\n2. 泳装/度假装品类的竞争格局\n3. 入驻要求和成本\n4. 预估销售潜力\n5. 风险评估\n6. 进入策略建议",
        variables: ["渠道名称"], expectedOutput: "渠道评估报告"
      }],
      workflows: [], tasks: [{
        title: "新渠道AI评估报告", description: "用AI评估一个新销售渠道的进入可行性",
        difficulty: "intermediate",
        acceptanceCriteria: ["完成市场规模和竞争分析", "包含成本收益估算", "提出明确的进入/不进入建议"],
        estimatedTime: "3天", deliverable: "渠道评估报告"
      }],
      cases: [], keyTakeaways: ["渠道评估要结合品牌定位和资源能力", "AI调研结果需要实地验证"]
    }
  },

  // ========== PRODUCT CENTER (产品中心) ==========
  {
    id: "PD01", titleZh: "AI趋势预测与选品", titleEn: "AI Trend Forecasting & Product Selection",
    descriptionZh: "利用AI分析时尚趋势(色彩/面料/款式)、社媒热度、搜索趋势、竞品新品，辅助选品决策",
    descriptionEn: "AI-powered fashion trend analysis (color/fabric/style), social buzz tracking, search trends, competitor new products for selection",
    layer: "department", level: 2, maxLevel: 4, departments: ["product"], pilotProjects: ["data-ai"],
    progress: 35, prerequisites: ["F04"], tools: ["ChatGPT", "Google Trends", "WGSN", "Trendalytics"],
    tags: ["趋势", "选品", "时尚"],
    knowledge: {
      resources: [
        { title: "AI时尚趋势预测方法", type: "doc", url: "#", duration: "40min", source: "CUPSHE产品" },
        { title: "Google Trends + AI选品实战", type: "tutorial", url: "#", duration: "30min", source: "CUPSHE产品" },
      ],
      prompts: [{
        title: "季度趋势分析", scenario: "季度选品前的趋势研究",
        prompt: "请分析{季节}美国泳装/度假装市场的趋势：\n\n1. 色彩趋势Top5（含Pantone色号）\n2. 面料趋势（舒适/环保/功能性）\n3. 款式趋势（剪裁/图案/细节）\n4. 社媒热门元素（Instagram/TikTok/Pinterest）\n5. 竞品新品方向\n6. 对CUPSHE选品的建议",
        variables: ["季节"], expectedOutput: "季度趋势分析报告"
      }],
      workflows: [{
        title: "AI选品决策流程", scenario: "季度新品规划",
        steps: [
          { step: 1, action: "用AI分析趋势数据（社媒/搜索/竞品）", tool: "ChatGPT/Perplexity", output: "趋势报告" },
          { step: 2, action: "结合历史销售数据筛选高潜力方向", tool: "ChatGPT", output: "选品方向" },
          { step: 3, action: "用AI生成产品概念描述和卖点", tool: "ChatGPT", output: "产品Brief" },
          { step: 4, action: "评估市场容量和竞争强度", output: "可行性评估" },
        ],
        estimatedTime: "1-2天"
      }],
      tasks: [{
        title: "AI趋势选品实战", description: "用AI完成一次季度选品趋势分析",
        difficulty: "intermediate",
        acceptanceCriteria: ["覆盖色彩/面料/款式三大维度", "包含数据支撑（搜索量/社媒热度）", "产出至少5个选品方向建议"],
        estimatedTime: "3天", deliverable: "季度趋势选品报告"
      }],
      cases: [{ title: "2026春夏AI选品", department: "产品中心", summary: "AI趋势预测准确率达72%，命中3个爆款方向", impact: "新品首月售罄率提升25%" }],
      keyTakeaways: ["趋势预测要多源交叉验证", "社媒热度是最灵敏的趋势信号", "AI预测+买手经验=最佳选品决策"]
    }
  },
  {
    id: "PD02", titleZh: "AI产品描述与卖点提炼", titleEn: "AI Product Copywriting & USP",
    descriptionZh: "利用AI生成多语言产品描述、提炼差异化卖点、优化产品详情页文案、生成尺码指南",
    descriptionEn: "AI-generated multilingual product descriptions, USP extraction, PDP copy optimization, size guide generation",
    layer: "department", level: 2, maxLevel: 3, departments: ["product", "operations"], pilotProjects: ["creative-ai"],
    progress: 48, prerequisites: ["F02"], tools: ["ChatGPT", "Claude", "Jasper"],
    tags: ["文案", "卖点", "产品"],
    knowledge: {
      resources: [{ title: "CUPSHE产品文案AI写作规范", type: "doc", url: "#", duration: "25min", source: "CUPSHE产品" }],
      prompts: [{
        title: "产品描述生成", scenario: "新品上架需要产品描述",
        prompt: "为CUPSHE {产品名} 生成产品描述：\n\n产品信息：{面料/款式/尺码/颜色}\n目标受众：{受众}\n使用场景：{场景}\n\n请输出：\n1. 产品标题（SEO友好，≤80字符）\n2. 短描述（50字以内，突出核心卖点）\n3. 详细描述（150-200字，含面料/版型/场景）\n4. 3个差异化卖点（Bullet Points）\n5. 尺码建议文案\n\n语言：英文，符合CUPSHE品牌调性（自信、包容、度假感）",
        variables: ["产品名", "面料/款式/尺码/颜色", "受众", "场景"], expectedOutput: "完整产品文案套件"
      }],
      workflows: [], tasks: [{
        title: "产品文案AI批量生成", description: "用AI为10个新品生成完整产品描述",
        difficulty: "beginner",
        acceptanceCriteria: ["完成10个SKU的产品描述", "符合CUPSHE品牌调性", "通过产品经理审核"],
        estimatedTime: "2天", deliverable: "10个SKU产品文案"
      }],
      cases: [], keyTakeaways: ["产品文案要平衡SEO和用户体验", "品牌调性一致性是AI文案的最大挑战"]
    }
  },
  {
    id: "PD03", titleZh: "AI尺码智能推荐", titleEn: "AI Smart Size Recommendation",
    descriptionZh: "利用AI分析用户身材数据、历史购买、退换货原因，构建智能尺码推荐系统，降低退货率",
    descriptionEn: "AI-powered size recommendation using body data, purchase history, return reasons to reduce return rates",
    layer: "scenario", level: 3, maxLevel: 4, departments: ["product", "it"], pilotProjects: ["data-ai"],
    progress: 18, prerequisites: ["PD01", "OP02"], tools: ["Python", "TensorFlow", "ChatGPT"],
    tags: ["尺码", "推荐", "退货"],
    knowledge: {
      resources: [{ title: "AI尺码推荐系统设计", type: "doc", url: "#", duration: "40min", source: "CUPSHE产品" }],
      prompts: [], workflows: [], tasks: [{
        title: "尺码退货数据分析", description: "用AI分析尺码相关退货数据，提出改进建议",
        difficulty: "advanced",
        acceptanceCriteria: ["分析至少1000条退货记录", "识别尺码问题Top SKU", "提出尺码表优化建议"],
        estimatedTime: "1周", deliverable: "尺码退货分析报告"
      }],
      cases: [], keyTakeaways: ["尺码问题是泳装品类退货的首要原因", "AI尺码推荐需要大量用户数据训练"]
    }
  },

  // ========== CREATIVE CENTER (创意中心) ==========
  {
    id: "CR01", titleZh: "AI商品图片生成与编辑", titleEn: "AI Product Image Generation & Editing",
    descriptionZh: "利用AI生成/编辑商品图片：背景替换、模特换装、场景合成、批量调色、尺寸适配各平台",
    descriptionEn: "AI-powered product image generation/editing: background swap, model outfit change, scene composition, batch color grading",
    layer: "department", level: 2, maxLevel: 4, departments: ["creative"], pilotProjects: ["creative-ai"],
    progress: 55, prerequisites: ["F02"], tools: ["Midjourney", "Stable Diffusion", "Adobe Firefly", "Photoshop AI"],
    tags: ["图片", "生成", "编辑"],
    knowledge: {
      resources: [
        { title: "AI商品图片生成实战指南", type: "tutorial", url: "#", duration: "1.5h", source: "CUPSHE创意" },
        { title: "Midjourney泳装场景生成技巧", type: "doc", url: "#", duration: "30min", source: "CUPSHE创意" },
        { title: "AI背景替换与场景合成", type: "video", url: "#", duration: "25min", source: "CUPSHE创意" },
      ],
      prompts: [{
        title: "商品场景图生成", scenario: "为产品生成不同场景的展示图",
        prompt: "生成CUPSHE泳装产品场景图：\n\n产品：{产品描述}\n场景：{海滩/泳池/度假村/城市}\n风格：明亮、自然光、度假感\n模特：{肤色多样/身材包容}\n构图：{全身/半身/特写}\n\n技术要求：\n- 分辨率：2000x2000px\n- 色调：温暖、阳光\n- 背景：{具体背景描述}",
        variables: ["产品描述", "海滩/泳池/度假村/城市", "肤色多样/身材包容", "全身/半身/特写", "具体背景描述"],
        expectedOutput: "符合品牌调性的产品场景图"
      }],
      workflows: [{
        title: "AI商品图片批量生产流程", scenario: "新品上架需要批量产图",
        steps: [
          { step: 1, action: "确定拍摄/生成需求（场景/角度/数量）", output: "需求清单" },
          { step: 2, action: "用Midjourney生成场景图初稿", tool: "Midjourney", output: "初稿图片" },
          { step: 3, action: "用Photoshop AI精修细节", tool: "Photoshop AI", output: "精修图片" },
          { step: 4, action: "批量适配各平台尺寸", tool: "Adobe Firefly", output: "多尺寸图片包" },
          { step: 5, action: "品牌一致性审核", output: "审核通过的图片" },
        ],
        estimatedTime: "2-4小时/SKU"
      }],
      tasks: [{
        title: "AI产品图生成实战", description: "用AI为3个SKU各生成5张不同场景的产品图",
        difficulty: "intermediate",
        acceptanceCriteria: ["每个SKU生成5张不同场景图", "符合CUPSHE品牌视觉标准", "通过创意总监审核", "图片质量达到上架标准"],
        estimatedTime: "3天", deliverable: "15张AI产品图 + 生成Prompt记录"
      }],
      cases: [{ title: "AI产品图替代部分棚拍", department: "创意中心", summary: "AI生成的场景图用于社媒和二级页面", impact: "图片制作成本降低40%，产出速度提升5倍" }],
      keyTakeaways: ["AI生成图适合社媒和辅助展示，主图仍需实拍", "Prompt的精确度决定图片质量", "品牌一致性审核不可省略"]
    }
  },
  {
    id: "CR02", titleZh: "AI视频内容制作", titleEn: "AI Video Content Production",
    descriptionZh: "利用AI辅助视频脚本编写、自动剪辑、字幕生成、音乐匹配、短视频批量生产(TikTok/Reels/Shorts)",
    descriptionEn: "AI-assisted video scripting, auto-editing, subtitle generation, music matching, short-form video batch production",
    layer: "department", level: 2, maxLevel: 4, departments: ["creative"], pilotProjects: ["creative-ai"],
    progress: 38, prerequisites: ["F02"], tools: ["Runway", "CapCut", "ChatGPT", "Sora"],
    tags: ["视频", "短视频", "剪辑"],
    knowledge: {
      resources: [
        { title: "AI短视频批量制作方法", type: "tutorial", url: "#", duration: "1h", source: "CUPSHE创意" },
        { title: "TikTok/Reels AI脚本模板", type: "template", url: "#", duration: "15min", source: "CUPSHE创意" },
      ],
      prompts: [{
        title: "短视频脚本生成", scenario: "为TikTok/Reels创作短视频脚本",
        prompt: "为CUPSHE {产品} 创作一条{时长}秒的{平台}短视频脚本：\n\n目标：{品牌曝光/带货/互动}\n风格：{趣味/教程/种草/vlog}\n\n请输出：\n1. Hook（前3秒吸引注意力）\n2. 分镜脚本（画面+文案+时长）\n3. 音乐/音效建议\n4. 字幕文案\n5. CTA（行动号召）\n6. 推荐hashtag",
        variables: ["产品", "时长", "平台", "品牌曝光/带货/互动", "趣味/教程/种草/vlog"],
        expectedOutput: "完整短视频脚本"
      }],
      workflows: [], tasks: [{
        title: "AI短视频批量制作", description: "用AI辅助完成5条短视频的脚本和制作",
        difficulty: "intermediate",
        acceptanceCriteria: ["完成5条短视频脚本", "至少3条完成制作", "发布后平均播放量不低于账号均值"],
        estimatedTime: "1周", deliverable: "5条短视频 + 脚本文档"
      }],
      cases: [], keyTakeaways: ["前3秒Hook决定短视频生死", "AI脚本需要加入真实感和品牌个性", "批量生产要保持内容多样性"]
    }
  },
  {
    id: "CR03", titleZh: "AI平面设计与Banner制作", titleEn: "AI Graphic Design & Banner Creation",
    descriptionZh: "利用AI快速生成促销Banner、社媒图片、邮件模板、活动海报，支持多尺寸自适应输出",
    descriptionEn: "AI-powered promotional banners, social media graphics, email templates, event posters with multi-size adaptive output",
    layer: "department", level: 2, maxLevel: 3, departments: ["creative"], pilotProjects: ["creative-ai"],
    progress: 50, prerequisites: ["CR01"], tools: ["Canva AI", "Adobe Firefly", "Figma AI"],
    tags: ["平面", "Banner", "模板"],
    knowledge: {
      resources: [{ title: "AI Banner快速制作流程", type: "tutorial", url: "#", duration: "30min", source: "CUPSHE创意" }],
      prompts: [{
        title: "促销Banner文案", scenario: "大促活动Banner设计",
        prompt: "为CUPSHE {活动名称} 设计Banner文案：\n\n活动内容：{折扣/满减/赠品}\n投放位置：{首页/品类页/邮件/社媒}\n尺寸：{尺寸}\n\n请输出：\n1. 主标题（≤8个词，英文）\n2. 副标题（≤15个词）\n3. CTA按钮文案\n4. 视觉元素建议\n5. 色彩建议",
        variables: ["活动名称", "折扣/满减/赠品", "首页/品类页/邮件/社媒", "尺寸"],
        expectedOutput: "Banner文案和视觉建议"
      }],
      workflows: [], tasks: [{
        title: "AI Banner批量制作", description: "用AI为一次促销活动制作全套Banner",
        difficulty: "beginner",
        acceptanceCriteria: ["覆盖至少4个投放位置", "保持视觉一致性", "通过设计审核"],
        estimatedTime: "1天", deliverable: "全套促销Banner"
      }],
      cases: [], keyTakeaways: ["AI Banner适合快速迭代和A/B测试", "品牌视觉一致性是批量制作的挑战"]
    }
  },
  {
    id: "CR04", titleZh: "AI虚拟试穿与3D展示", titleEn: "AI Virtual Try-On & 3D Display",
    descriptionZh: "利用AI和3D技术实现虚拟试穿体验、产品360°展示、虚拟模特生成、AR试衣功能",
    descriptionEn: "AI + 3D technology for virtual try-on, 360° product display, virtual model generation, AR fitting room",
    layer: "scenario", level: 3, maxLevel: 5, departments: ["creative", "it"], pilotProjects: ["creative-ai"],
    progress: 12, prerequisites: ["CR01"], tools: ["CLO 3D", "Stable Diffusion", "Google ARCore"],
    tags: ["3D", "虚拟试穿", "AR"],
    knowledge: {
      resources: [{ title: "AI虚拟试穿技术调研", type: "article", url: "#", duration: "30min", source: "CUPSHE AI知识库" }],
      prompts: [], workflows: [], tasks: [{
        title: "虚拟试穿技术POC", description: "完成一个虚拟试穿功能的概念验证",
        difficulty: "advanced",
        acceptanceCriteria: ["选择1个技术方案", "完成3个SKU的虚拟试穿Demo", "用户测试满意度≥70%"],
        estimatedTime: "4周", deliverable: "虚拟试穿POC Demo"
      }],
      cases: [], keyTakeaways: ["虚拟试穿是泳装品类的差异化体验", "技术成熟度仍在提升中，建议小范围试点"]
    }
  },
  {
    id: "CR05", titleZh: "AI品牌视觉一致性", titleEn: "AI Brand Visual Consistency",
    descriptionZh: "利用AI确保跨渠道(独立站/Amazon/社媒/邮件)视觉一致性、品牌调性检测、风格迁移与统一",
    descriptionEn: "AI-powered cross-channel visual consistency (DTC/Amazon/social/email), brand tone detection, style transfer",
    layer: "scenario", level: 3, maxLevel: 4, departments: ["creative"], pilotProjects: ["creative-ai"],
    progress: 18, prerequisites: ["CR01", "CR03"], tools: ["Adobe Firefly", "Midjourney", "Brand Kit AI"],
    tags: ["品牌", "一致性", "视觉"],
    knowledge: {
      resources: [{ title: "CUPSHE品牌视觉AI规范", type: "doc", url: "#", duration: "30min", source: "CUPSHE创意" }],
      prompts: [], workflows: [], tasks: [{
        title: "跨渠道视觉一致性审计", description: "用AI审计CUPSHE跨渠道视觉一致性",
        difficulty: "advanced",
        acceptanceCriteria: ["审计至少4个渠道的视觉输出", "识别不一致的元素", "提出统一方案"],
        estimatedTime: "1周", deliverable: "视觉一致性审计报告"
      }],
      cases: [], keyTakeaways: ["品牌一致性是消费者信任的基础", "AI可以辅助检测但不能替代品牌判断"]
    }
  },

  // ========== SUPPLY CHAIN (生产供应链中心) ==========
  {
    id: "SC01", titleZh: "AI供应商智能管理", titleEn: "AI Supplier Management",
    descriptionZh: "利用AI进行供应商评估与筛选、交期预测、质量风险预警、供应商绩效分析、成本优化建议",
    descriptionEn: "AI-powered supplier evaluation, delivery prediction, quality risk alerts, performance analysis, cost optimization",
    layer: "department", level: 2, maxLevel: 4, departments: ["supply-chain"], pilotProjects: [],
    progress: 22, prerequisites: ["F02", "F04"], tools: ["ChatGPT", "Python", "Excel AI"],
    tags: ["供应商", "评估", "风险"],
    knowledge: {
      resources: [
        { title: "AI供应商评估模型搭建", type: "doc", url: "#", duration: "40min", source: "CUPSHE供应链" },
        { title: "供应商交期预测方法", type: "tutorial", url: "#", duration: "30min", source: "CUPSHE供应链" },
      ],
      prompts: [{
        title: "供应商综合评估", scenario: "新供应商引入或年度评估",
        prompt: "请帮我设计CUPSHE泳装供应商的综合评估框架：\n\n评估维度：\n1. 产能与交期稳定性\n2. 质量控制能力（面料/做工/尺码一致性）\n3. 成本竞争力\n4. 响应速度与配合度\n5. 环保合规（OEKO-TEX等认证）\n\n供应商数据：{供应商信息}\n\n请输出评分卡和改进建议",
        variables: ["供应商信息"], expectedOutput: "供应商评估评分卡"
      }],
      workflows: [{
        title: "AI供应商月度评估流程", scenario: "每月供应商绩效评估",
        steps: [
          { step: 1, action: "收集供应商本月交期/质量/成本数据", output: "原始数据" },
          { step: 2, action: "用AI分析数据异常和趋势", tool: "ChatGPT", output: "分析报告" },
          { step: 3, action: "生成供应商绩效排名和预警", output: "绩效排名" },
          { step: 4, action: "制定改进计划和沟通要点", tool: "ChatGPT", output: "改进计划" },
        ],
        estimatedTime: "2小时/月"
      }],
      tasks: [{
        title: "供应商AI评估实战", description: "用AI完成一次供应商综合评估",
        difficulty: "intermediate",
        acceptanceCriteria: ["评估至少5家供应商", "建立量化评分模型", "产出排名和改进建议"],
        estimatedTime: "3天", deliverable: "供应商评估报告"
      }],
      cases: [], keyTakeaways: ["数据质量决定AI评估准确性", "AI评估要结合实地考察", "持续跟踪比一次性评估更重要"]
    }
  },
  {
    id: "SC02", titleZh: "AI需求预测与排产", titleEn: "AI Demand Forecasting & Production Planning",
    descriptionZh: "利用AI进行销售需求预测、季节性分析、库存优化建议、生产排期优化、面料采购计划",
    descriptionEn: "AI-powered sales demand forecasting, seasonality analysis, inventory optimization, production scheduling, fabric procurement",
    layer: "department", level: 2, maxLevel: 4, departments: ["supply-chain"], pilotProjects: ["data-ai"],
    progress: 28, prerequisites: ["F03", "F04"], tools: ["Python", "ChatGPT", "Excel AI"],
    tags: ["预测", "排产", "库存"],
    knowledge: {
      resources: [{ title: "泳装季节性需求预测模型", type: "doc", url: "#", duration: "45min", source: "CUPSHE供应链" }],
      prompts: [{
        title: "需求预测分析", scenario: "季度需求预测和排产规划",
        prompt: "基于以下历史销售数据，预测CUPSHE {品类} 未来{时间段}的需求：\n\n历史数据：{数据}\n考虑因素：季节性、促销日历、趋势、新品计划\n\n请输出：\n1. 需求预测（按周/月）\n2. 置信区间\n3. 关键假设\n4. 排产建议\n5. 安全库存建议",
        variables: ["品类", "时间段", "数据"], expectedOutput: "需求预测和排产建议"
      }],
      workflows: [], tasks: [{
        title: "AI需求预测实战", description: "用AI完成一个品类的季度需求预测",
        difficulty: "advanced",
        acceptanceCriteria: ["预测准确率≥75%（MAPE）", "包含季节性和促销因素", "产出排产建议"],
        estimatedTime: "1周", deliverable: "需求预测报告"
      }],
      cases: [], keyTakeaways: ["泳装需求高度季节性，预测要考虑天气和旅游趋势", "AI预测+人工经验调整=最佳结果"]
    }
  },
  {
    id: "SC03", titleZh: "AI质量检测辅助", titleEn: "AI Quality Inspection Assistant",
    descriptionZh: "利用AI图像识别辅助面料质检、色差检测、做工瑕疵识别、尺码一致性验证",
    descriptionEn: "AI image recognition for fabric inspection, color deviation detection, workmanship defect identification, size consistency",
    layer: "scenario", level: 3, maxLevel: 4, departments: ["supply-chain"], pilotProjects: [],
    progress: 10, prerequisites: ["SC01"], tools: ["Computer Vision", "Python", "ChatGPT"],
    tags: ["质检", "图像识别", "质量"],
    knowledge: {
      resources: [{ title: "AI视觉质检技术调研", type: "article", url: "#", duration: "30min", source: "CUPSHE AI知识库" }],
      prompts: [], workflows: [], tasks: [{
        title: "AI质检POC", description: "完成AI辅助质检的概念验证",
        difficulty: "advanced",
        acceptanceCriteria: ["选择1个质检场景", "收集训练数据", "完成POC并评估准确率"],
        estimatedTime: "4周", deliverable: "AI质检POC报告"
      }],
      cases: [], keyTakeaways: ["AI质检适合标准化、重复性的检测场景", "需要大量标注数据训练"]
    }
  },

  // ========== LOGISTICS (仓储物流中心) ==========
  {
    id: "LG01", titleZh: "AI物流路线优化", titleEn: "AI Logistics Route Optimization",
    descriptionZh: "利用AI优化跨境物流路线选择、运费比价、时效预测、清关风险评估、最后一公里配送优化",
    descriptionEn: "AI-optimized cross-border logistics routing, freight comparison, transit time prediction, customs risk assessment",
    layer: "department", level: 2, maxLevel: 4, departments: ["logistics"], pilotProjects: [],
    progress: 20, prerequisites: ["F04"], tools: ["ChatGPT", "Python", "物流平台API"],
    tags: ["物流", "路线", "跨境"],
    knowledge: {
      resources: [{ title: "跨境物流AI优化方案", type: "doc", url: "#", duration: "35min", source: "CUPSHE物流" }],
      prompts: [{
        title: "物流方案比选", scenario: "新市场/新渠道物流方案选择",
        prompt: "请帮我比较以下物流方案：\n\n发货地：{发货地}\n目的地：{目的地}\n产品：泳装/度假装\n日均单量：{单量}\n\n方案对比维度：\n1. 运费成本（每单/每公斤）\n2. 时效（门到门天数）\n3. 清关风险\n4. 退货处理能力\n5. 旺季稳定性\n\n物流商选项：{物流商列表}",
        variables: ["发货地", "目的地", "单量", "物流商列表"], expectedOutput: "物流方案对比分析"
      }],
      workflows: [], tasks: [{
        title: "物流方案AI优化", description: "用AI优化一条物流路线的方案选择",
        difficulty: "intermediate",
        acceptanceCriteria: ["对比至少3个物流方案", "包含成本/时效/风险分析", "提出推荐方案"],
        estimatedTime: "3天", deliverable: "物流优化方案"
      }],
      cases: [], keyTakeaways: ["跨境物流要平衡成本和时效", "旺季物流稳定性是关键考量"]
    }
  },
  {
    id: "LG02", titleZh: "AI库存智能管理", titleEn: "AI Smart Inventory Management",
    descriptionZh: "利用AI进行库存水位预警、滞销品识别、补货建议、仓间调拨优化、库存周转率分析",
    descriptionEn: "AI-powered inventory level alerts, slow-mover identification, replenishment suggestions, warehouse transfer optimization",
    layer: "department", level: 2, maxLevel: 4, departments: ["logistics", "supply-chain"], pilotProjects: ["data-ai"],
    progress: 25, prerequisites: ["F03"], tools: ["Python", "ChatGPT", "WMS"],
    tags: ["库存", "预警", "周转"],
    knowledge: {
      resources: [{ title: "AI库存管理最佳实践", type: "doc", url: "#", duration: "30min", source: "CUPSHE物流" }],
      prompts: [{
        title: "库存健康度分析", scenario: "月度库存健康度检查",
        prompt: "请分析以下库存数据的健康度：\n{库存数据}\n\n请输出：\n1. 库存周转率分析（按品类）\n2. 滞销品清单（>90天无销售）\n3. 缺货风险SKU\n4. 补货建议（品类/数量/时间）\n5. 库存优化建议",
        variables: ["库存数据"], expectedOutput: "库存健康度报告"
      }],
      workflows: [], tasks: [{
        title: "AI库存优化实战", description: "用AI分析库存数据并提出优化建议",
        difficulty: "intermediate",
        acceptanceCriteria: ["完成库存周转率分析", "识别滞销品和缺货风险", "提出可行的优化建议"],
        estimatedTime: "3天", deliverable: "库存优化报告"
      }],
      cases: [], keyTakeaways: ["泳装库存有强季节性，淡旺季策略不同", "滞销品早期识别可减少库存损失"]
    }
  },

  // ========== IT R&D (互联网研发中心) ==========
  {
    id: "IT01", titleZh: "AI辅助编程", titleEn: "AI-Assisted Programming",
    descriptionZh: "利用AI编程助手(Copilot/Cursor)提升开发效率：代码生成、代码审查、Bug修复、单元测试生成、文档编写",
    descriptionEn: "AI coding assistants (Copilot/Cursor) for code generation, review, bug fixing, unit test generation, documentation",
    layer: "department", level: 2, maxLevel: 4, departments: ["it"], pilotProjects: [],
    progress: 62, prerequisites: ["F02"], tools: ["GitHub Copilot", "Cursor", "ChatGPT", "Claude"],
    tags: ["编程", "Copilot", "效率"],
    knowledge: {
      resources: [
        { title: "GitHub Copilot高效使用指南", type: "tutorial", url: "#", duration: "1h", source: "CUPSHE研发" },
        { title: "Cursor IDE实战技巧", type: "video", url: "#", duration: "45min", source: "CUPSHE研发" },
        { title: "AI代码审查最佳实践", type: "doc", url: "#", duration: "20min", source: "CUPSHE研发" },
      ],
      prompts: [{
        title: "代码审查", scenario: "提交前用AI审查代码质量",
        prompt: "请审查以下代码：\n```{语言}\n{代码}\n```\n\n请检查：\n1. 逻辑错误和边界条件\n2. 性能问题\n3. 安全漏洞\n4. 代码规范\n5. 改进建议\n\n项目上下文：{上下文}",
        variables: ["语言", "代码", "上下文"], expectedOutput: "代码审查报告和改进建议"
      }],
      workflows: [{
        title: "AI辅助开发日常流程", scenario: "日常开发工作",
        steps: [
          { step: 1, action: "用AI理解需求并拆解技术方案", tool: "ChatGPT", output: "技术方案" },
          { step: 2, action: "用Copilot/Cursor辅助编码", tool: "GitHub Copilot/Cursor", output: "代码" },
          { step: 3, action: "用AI生成单元测试", tool: "ChatGPT", output: "测试代码" },
          { step: 4, action: "用AI审查代码并优化", tool: "ChatGPT", output: "优化后代码" },
          { step: 5, action: "用AI编写技术文档", tool: "ChatGPT", output: "技术文档" },
        ],
        estimatedTime: "贯穿日常开发"
      }],
      tasks: [{
        title: "AI编程效率提升实战", description: "在一个真实项目中全程使用AI辅助开发",
        difficulty: "intermediate",
        acceptanceCriteria: ["完成一个完整功能的AI辅助开发", "记录AI辅助vs传统开发的效率对比", "建立团队AI编程规范"],
        estimatedTime: "1周", deliverable: "AI编程效率报告 + 团队规范"
      }],
      cases: [{ title: "Copilot提升前端开发效率", department: "互联网研发中心", summary: "全团队使用Copilot后编码效率提升40%", impact: "Sprint交付速度提升30%，代码质量不降反升" }],
      keyTakeaways: ["AI辅助编程不是替代思考，而是加速执行", "代码审查仍需人工判断业务逻辑", "团队统一AI工具和规范很重要"]
    }
  },
  {
    id: "IT02", titleZh: "AI数据分析与BI", titleEn: "AI Data Analytics & BI",
    descriptionZh: "利用AI进行数据查询(Text-to-SQL)、自动化报表生成、异常检测、业务洞察提取、数据可视化",
    descriptionEn: "AI-powered Text-to-SQL, automated reporting, anomaly detection, business insight extraction, data visualization",
    layer: "department", level: 2, maxLevel: 4, departments: ["it"], pilotProjects: ["data-ai"],
    progress: 45, prerequisites: ["F03", "F04"], tools: ["ChatGPT", "Python", "Tableau", "Metabase"],
    tags: ["数据", "BI", "分析"],
    knowledge: {
      resources: [
        { title: "Text-to-SQL实战指南", type: "tutorial", url: "#", duration: "1h", source: "CUPSHE研发" },
        { title: "AI自动化报表搭建", type: "doc", url: "#", duration: "30min", source: "CUPSHE研发" },
      ],
      prompts: [{
        title: "Text-to-SQL查询", scenario: "用自然语言查询业务数据",
        prompt: "数据库表结构：\n{表结构}\n\n请将以下业务问题转换为SQL查询：\n{业务问题}\n\n要求：\n1. 输出可执行的SQL\n2. 解释查询逻辑\n3. 注意性能优化\n4. 标注可能的数据陷阱",
        variables: ["表结构", "业务问题"], expectedOutput: "SQL查询 + 逻辑解释"
      }],
      workflows: [], tasks: [{
        title: "AI数据分析报告", description: "用AI完成一份业务数据分析报告",
        difficulty: "intermediate",
        acceptanceCriteria: ["用Text-to-SQL完成数据提取", "用AI生成数据洞察", "产出可视化报告"],
        estimatedTime: "3天", deliverable: "AI数据分析报告"
      }],
      cases: [], keyTakeaways: ["Text-to-SQL要验证查询结果的准确性", "AI洞察需要业务背景才有价值"]
    }
  },
  {
    id: "IT03", titleZh: "AI产品功能开发", titleEn: "AI Feature Development",
    descriptionZh: "将AI能力集成到CUPSHE产品中：智能搜索、个性化推荐、聊天机器人、图像识别等功能开发",
    descriptionEn: "Integrate AI capabilities into CUPSHE products: smart search, personalized recommendations, chatbots, image recognition",
    layer: "scenario", level: 3, maxLevel: 5, departments: ["it"], pilotProjects: ["data-ai"],
    progress: 20, prerequisites: ["IT01", "IT02"], tools: ["OpenAI API", "AWS SageMaker", "LangChain", "Python"],
    tags: ["AI集成", "产品", "开发"],
    knowledge: {
      resources: [{ title: "CUPSHE AI功能开发规范", type: "doc", url: "#", duration: "40min", source: "CUPSHE研发" }],
      prompts: [], workflows: [], tasks: [{
        title: "AI功能POC开发", description: "完成一个AI功能的概念验证开发",
        difficulty: "advanced",
        acceptanceCriteria: ["完成技术方案设计", "完成POC开发和测试", "产出性能和成本评估"],
        estimatedTime: "3周", deliverable: "AI功能POC + 技术报告"
      }],
      cases: [], keyTakeaways: ["AI功能要考虑延迟和成本", "用户体验比技术复杂度更重要"]
    }
  },

  // ========== FINANCE CENTER (财务中心) ==========
  {
    id: "FN01", titleZh: "AI财务报表分析", titleEn: "AI Financial Statement Analysis",
    descriptionZh: "利用AI进行财务报表自动化分析、异常检测、趋势预测、成本结构优化建议、现金流预测",
    descriptionEn: "AI-powered financial statement analysis, anomaly detection, trend forecasting, cost structure optimization, cash flow prediction",
    layer: "department", level: 2, maxLevel: 3, departments: ["finance"], pilotProjects: ["data-ai"],
    progress: 30, prerequisites: ["F03", "F04"], tools: ["ChatGPT", "Excel AI", "Python"],
    tags: ["财务", "报表", "分析"],
    knowledge: {
      resources: [{ title: "AI财务分析方法论", type: "doc", url: "#", duration: "35min", source: "CUPSHE财务" }],
      prompts: [{
        title: "财务数据异常检测", scenario: "月度财务数据审核",
        prompt: "请分析以下财务数据，检测异常：\n{财务数据}\n\n对比维度：\n1. 环比变化（与上月对比）\n2. 同比变化（与去年同期对比）\n3. 预算偏差\n4. 行业基准对比\n\n请标注异常项并分析可能原因",
        variables: ["财务数据"], expectedOutput: "财务异常检测报告"
      }],
      workflows: [], tasks: [{
        title: "AI财务分析实战", description: "用AI完成一次月度财务分析",
        difficulty: "intermediate",
        acceptanceCriteria: ["完成主要财务指标分析", "识别异常项", "提出优化建议"],
        estimatedTime: "2天", deliverable: "AI财务分析报告"
      }],
      cases: [], keyTakeaways: ["AI财务分析要确保数据安全和保密", "异常检测需要人工验证和判断"]
    }
  },
  {
    id: "FN02", titleZh: "AI预算与成本管控", titleEn: "AI Budget & Cost Control",
    descriptionZh: "利用AI进行预算编制辅助、成本分析与归因、费用异常预警、ROI计算与优化建议",
    descriptionEn: "AI-assisted budgeting, cost analysis & attribution, expense anomaly alerts, ROI calculation & optimization",
    layer: "department", level: 2, maxLevel: 3, departments: ["finance"], pilotProjects: [],
    progress: 22, prerequisites: ["FN01"], tools: ["ChatGPT", "Excel AI", "Python"],
    tags: ["预算", "成本", "管控"],
    knowledge: {
      resources: [{ title: "AI预算编制辅助方法", type: "doc", url: "#", duration: "25min", source: "CUPSHE财务" }],
      prompts: [{
        title: "成本结构分析", scenario: "分析产品或部门成本结构",
        prompt: "请分析以下成本数据的结构：\n{成本数据}\n\n请输出：\n1. 成本构成占比（饼图数据）\n2. 同比/环比变化\n3. 可优化空间分析\n4. 降本建议（按优先级排序）",
        variables: ["成本数据"], expectedOutput: "成本结构分析报告"
      }],
      workflows: [], tasks: [{
        title: "AI成本分析实战", description: "用AI分析一个业务线的成本结构",
        difficulty: "intermediate",
        acceptanceCriteria: ["完成成本构成分析", "识别优化空间", "提出可行的降本建议"],
        estimatedTime: "3天", deliverable: "成本分析报告"
      }],
      cases: [], keyTakeaways: ["成本分析要结合业务背景", "降本不能以牺牲质量为代价"]
    }
  },

  // ========== HR CENTER (人力资源中心) ==========
  {
    id: "HR01", titleZh: "AI招聘与人才筛选", titleEn: "AI Recruitment & Talent Screening",
    descriptionZh: "利用AI优化招聘流程：简历智能筛选、JD自动生成、面试问题推荐、候选人匹配度评估",
    descriptionEn: "AI-optimized recruitment: smart resume screening, JD auto-generation, interview question recommendation, candidate matching",
    layer: "department", level: 2, maxLevel: 3, departments: ["hr"], pilotProjects: [],
    progress: 35, prerequisites: ["F02"], tools: ["ChatGPT", "LinkedIn Recruiter", "Moka AI"],
    tags: ["招聘", "简历", "人才"],
    knowledge: {
      resources: [{ title: "AI招聘流程优化指南", type: "doc", url: "#", duration: "30min", source: "CUPSHE HR" }],
      prompts: [{
        title: "JD智能生成", scenario: "新岗位招聘需要编写JD",
        prompt: "请为CUPSHE生成以下岗位的JD：\n\n岗位：{岗位名称}\n部门：{部门}\n级别：{级别}\n\n请包含：\n1. 岗位职责（5-8条）\n2. 任职要求（必须/优先）\n3. 薪资范围建议\n4. 吸引人才的亮点描述\n5. 面试评估维度建议",
        variables: ["岗位名称", "部门", "级别"], expectedOutput: "完整JD + 面试评估维度"
      }],
      workflows: [], tasks: [{
        title: "AI招聘优化实战", description: "用AI优化一次完整的招聘流程",
        difficulty: "intermediate",
        acceptanceCriteria: ["用AI生成JD", "用AI筛选简历（至少20份）", "用AI生成面试问题", "记录效率提升数据"],
        estimatedTime: "2周", deliverable: "AI招聘优化报告"
      }],
      cases: [], keyTakeaways: ["AI筛选要注意避免偏见", "JD质量直接影响候选人质量", "AI是辅助工具，最终决策需要人工判断"]
    }
  },
  {
    id: "HR02", titleZh: "AI培训与发展", titleEn: "AI Training & Development",
    descriptionZh: "利用AI设计个性化学习路径、培训内容生成、学习效果评估、技能差距分析、IDP制定辅助",
    descriptionEn: "AI-designed personalized learning paths, training content generation, learning assessment, skill gap analysis, IDP assistance",
    layer: "department", level: 2, maxLevel: 3, departments: ["hr"], pilotProjects: [],
    progress: 28, prerequisites: ["F02"], tools: ["ChatGPT", "Claude", "内训平台"],
    tags: ["培训", "学习", "发展"],
    knowledge: {
      resources: [{ title: "AI培训内容设计方法", type: "doc", url: "#", duration: "25min", source: "CUPSHE HR" }],
      prompts: [{
        title: "培训课程设计", scenario: "设计新的培训课程",
        prompt: "请帮我设计一门CUPSHE内部培训课程：\n\n主题：{主题}\n目标学员：{学员}\n时长：{时长}\n\n请输出：\n1. 课程大纲（模块/时间分配）\n2. 每个模块的学习目标\n3. 教学方法建议（讲授/案例/实操）\n4. 评估方式\n5. 课后作业设计",
        variables: ["主题", "学员", "时长"], expectedOutput: "完整课程设计方案"
      }],
      workflows: [], tasks: [{
        title: "AI课程设计实战", description: "用AI设计一门内部培训课程",
        difficulty: "intermediate",
        acceptanceCriteria: ["完成课程大纲设计", "用AI生成至少3个模块的内容", "包含评估方案"],
        estimatedTime: "3天", deliverable: "培训课程设计方案"
      }],
      cases: [], keyTakeaways: ["AI生成的培训内容需要结合公司实际案例", "个性化学习路径提升培训效果"]
    }
  },
  {
    id: "HR03", titleZh: "AI组织效能分析", titleEn: "AI Organizational Effectiveness Analysis",
    descriptionZh: "利用AI分析组织效能：人效分析、离职预测、敬业度分析、薪酬竞争力分析、组织架构优化建议",
    descriptionEn: "AI-powered organizational analysis: productivity metrics, turnover prediction, engagement analysis, compensation benchmarking",
    layer: "department", level: 2, maxLevel: 3, departments: ["hr"], pilotProjects: ["data-ai"],
    progress: 18, prerequisites: ["F03", "F04"], tools: ["ChatGPT", "Python", "Excel AI"],
    tags: ["组织", "效能", "人效"],
    knowledge: {
      resources: [{ title: "AI人效分析框架", type: "doc", url: "#", duration: "30min", source: "CUPSHE HR" }],
      prompts: [{
        title: "人效分析", scenario: "季度人效分析",
        prompt: "请分析以下部门人效数据：\n{人效数据}\n\n请输出：\n1. 人效指标（人均产出/人均利润）\n2. 部门间对比\n3. 同比/环比趋势\n4. 异常分析\n5. 优化建议",
        variables: ["人效数据"], expectedOutput: "人效分析报告"
      }],
      workflows: [], tasks: [{
        title: "AI人效分析实战", description: "用AI完成一次季度人效分析",
        difficulty: "intermediate",
        acceptanceCriteria: ["覆盖主要部门", "包含多维度分析", "提出优化建议"],
        estimatedTime: "3天", deliverable: "人效分析报告"
      }],
      cases: [], keyTakeaways: ["人效分析要考虑业务周期性", "数据隐私是HR数据分析的红线"]
    }
  },

  // ========== GM OFFICE (总经办) ==========
  {
    id: "GM01", titleZh: "AI战略分析与决策支持", titleEn: "AI Strategic Analysis & Decision Support",
    descriptionZh: "利用AI进行行业趋势分析、竞品战略研究、市场机会评估、战略方案模拟与评估",
    descriptionEn: "AI-powered industry trend analysis, competitor strategy research, market opportunity assessment, strategic scenario simulation",
    layer: "department", level: 2, maxLevel: 4, departments: ["gm-office"], pilotProjects: [],
    progress: 30, prerequisites: ["F04"], tools: ["ChatGPT", "Perplexity", "Claude"],
    tags: ["战略", "分析", "决策"],
    knowledge: {
      resources: [{ title: "AI战略分析方法论", type: "doc", url: "#", duration: "40min", source: "CUPSHE总经办" }],
      prompts: [{
        title: "竞品战略分析", scenario: "季度竞品战略研究",
        prompt: "请分析{竞品名称}的最新战略动向：\n\n分析维度：\n1. 产品策略（品类扩展/定价/新品方向）\n2. 渠道策略（DTC/平台/线下）\n3. 营销策略（投放/社媒/红人）\n4. 技术投入（AI/数字化）\n5. 对CUPSHE的启示和应对建议",
        variables: ["竞品名称"], expectedOutput: "竞品战略分析报告"
      }],
      workflows: [], tasks: [{
        title: "AI竞品战略分析", description: "用AI完成一次深度竞品战略分析",
        difficulty: "advanced",
        acceptanceCriteria: ["覆盖至少3个主要竞品", "包含多维度分析", "提出可行的应对策略"],
        estimatedTime: "1周", deliverable: "竞品战略分析报告"
      }],
      cases: [], keyTakeaways: ["AI调研要交叉验证信息源", "战略分析需要结合内部数据和外部洞察"]
    }
  },
  {
    id: "GM02", titleZh: "AI会议与文档效率", titleEn: "AI Meeting & Document Efficiency",
    descriptionZh: "利用AI进行会议纪要自动生成、行动项提取、文档智能摘要、跨部门报告整合、OKR追踪辅助",
    descriptionEn: "AI-powered meeting minutes, action item extraction, document summarization, cross-department report integration, OKR tracking",
    layer: "department", level: 2, maxLevel: 3, departments: ["gm-office", "hr"], pilotProjects: [],
    progress: 45, prerequisites: ["F02"], tools: ["Otter.ai", "ChatGPT", "Notion AI"],
    tags: ["会议", "文档", "效率"],
    knowledge: {
      resources: [{ title: "AI会议效率提升指南", type: "doc", url: "#", duration: "20min", source: "CUPSHE总经办" }],
      prompts: [{
        title: "会议纪要整理", scenario: "会议后整理纪要和行动项",
        prompt: "请整理以下会议记录：\n{会议记录}\n\n请输出：\n1. 会议摘要（3-5句话）\n2. 关键决策\n3. 行动项（负责人/截止日期/具体任务）\n4. 待讨论事项\n5. 下次会议议题建议",
        variables: ["会议记录"], expectedOutput: "结构化会议纪要"
      }],
      workflows: [], tasks: [{
        title: "AI会议效率提升", description: "在一周内用AI辅助所有会议的纪要和跟进",
        difficulty: "beginner",
        acceptanceCriteria: ["所有会议用AI生成纪要", "行动项自动提取和跟踪", "记录效率提升数据"],
        estimatedTime: "1周", deliverable: "会议AI效率报告"
      }],
      cases: [], keyTakeaways: ["AI会议纪要要人工审核关键决策", "行动项跟踪是会议效率的关键"]
    }
  },

  // ========== AUDIT (审计监察部) ==========
  {
    id: "AU01", titleZh: "AI合规与风险检测", titleEn: "AI Compliance & Risk Detection",
    descriptionZh: "利用AI进行合规文档审查、交易异常检测、流程合规性验证、风险预警、审计线索发现",
    descriptionEn: "AI-powered compliance document review, transaction anomaly detection, process compliance verification, risk alerts, audit trail discovery",
    layer: "department", level: 2, maxLevel: 3, departments: ["audit"], pilotProjects: [],
    progress: 15, prerequisites: ["F02", "F04"], tools: ["ChatGPT", "Python", "Excel AI"],
    tags: ["合规", "风险", "审计"],
    knowledge: {
      resources: [{ title: "AI审计辅助方法", type: "doc", url: "#", duration: "30min", source: "CUPSHE审计" }],
      prompts: [{
        title: "合同条款审查", scenario: "审查供应商/合作方合同",
        prompt: "请审查以下合同条款，检查：\n{合同内容}\n\n1. 不利条款识别\n2. 缺失的保护性条款\n3. 合规风险点\n4. 与行业惯例的偏差\n5. 修改建议",
        variables: ["合同内容"], expectedOutput: "合同审查意见"
      }],
      workflows: [], tasks: [{
        title: "AI合同审查实战", description: "用AI辅助审查一批合同",
        difficulty: "intermediate",
        acceptanceCriteria: ["审查至少5份合同", "识别风险条款", "提出修改建议"],
        estimatedTime: "3天", deliverable: "合同审查报告"
      }],
      cases: [], keyTakeaways: ["AI合同审查是辅助工具，法律判断需要专业人员", "标准化审查模板提升效率"]
    }
  },

  // ========== BOARD SECRETARY (董秘办) ==========
  {
    id: "BS01", titleZh: "AI投资者关系与信息披露", titleEn: "AI Investor Relations & Disclosure",
    descriptionZh: "利用AI辅助投资者问答准备、信息披露文档编写、行业对标分析、股东沟通材料准备",
    descriptionEn: "AI-assisted investor Q&A preparation, disclosure document drafting, industry benchmarking, shareholder communication materials",
    layer: "department", level: 2, maxLevel: 3, departments: ["board-secretary"], pilotProjects: [],
    progress: 18, prerequisites: ["F02", "F04"], tools: ["ChatGPT", "Claude", "Perplexity"],
    tags: ["投关", "披露", "合规"],
    knowledge: {
      resources: [{ title: "AI投关材料准备方法", type: "doc", url: "#", duration: "25min", source: "CUPSHE董秘办" }],
      prompts: [{
        title: "投资者问答准备", scenario: "业绩发布会前准备Q&A",
        prompt: "请帮我准备CUPSHE {季度} 业绩发布会的投资者Q&A：\n\n业绩要点：{业绩数据}\n行业背景：{行业情况}\n\n请准备：\n1. 预计投资者会问的Top 10问题\n2. 每个问题的建议回答要点\n3. 敏感问题的应对策略\n4. 正面引导的话术",
        variables: ["季度", "业绩数据", "行业情况"], expectedOutput: "投资者Q&A准备文档"
      }],
      workflows: [], tasks: [{
        title: "AI投关材料准备", description: "用AI准备一次投资者沟通材料",
        difficulty: "advanced",
        acceptanceCriteria: ["完成Q&A准备", "包含行业对标数据", "通过管理层审核"],
        estimatedTime: "3天", deliverable: "投资者沟通材料包"
      }],
      cases: [], keyTakeaways: ["投关材料必须确保数据准确性", "AI辅助准备但最终内容需要法律合规审核"]
    }
  },

  // ========== SYSTEM-LEVEL ADVANCED (系统进阶) ==========
  {
    id: "S01", titleZh: "AI Agent工作流构建", titleEn: "AI Agent Workflow Building",
    descriptionZh: "构建多步骤AI Agent自动化工作流：任务编排、工具调用、条件判断、循环执行、异常处理",
    descriptionEn: "Build multi-step AI Agent automated workflows: task orchestration, tool calling, conditional logic, loop execution, error handling",
    layer: "system", level: 3, maxLevel: 5, departments: ["all"], pilotProjects: ["marketing-ai", "data-ai"],
    progress: 15, prerequisites: ["F02", "F05"], tools: ["Dify", "LangChain", "n8n", "Make"],
    tags: ["Agent", "自动化", "工作流"],
    knowledge: {
      resources: [
        { title: "AI Agent工作流入门", type: "course", url: "#", duration: "2h", source: "CUPSHE AI知识库" },
        { title: "Dify平台实战指南", type: "tutorial", url: "#", duration: "1h", source: "CUPSHE研发" },
        { title: "n8n自动化工作流搭建", type: "video", url: "#", duration: "45min", source: "CUPSHE AI知识库" },
      ],
      prompts: [{
        title: "工作流设计", scenario: "设计一个AI自动化工作流",
        prompt: "请帮我设计一个AI自动化工作流：\n\n业务场景：{场景描述}\n输入：{输入数据}\n期望输出：{输出}\n\n请输出：\n1. 工作流架构图（步骤和连接）\n2. 每个步骤的详细说明\n3. 需要的AI模型/工具\n4. 异常处理策略\n5. 预估开发时间",
        variables: ["场景描述", "输入数据", "输出"], expectedOutput: "工作流设计方案"
      }],
      workflows: [], tasks: [{
        title: "AI Agent工作流实战", description: "搭建一个真实业务场景的AI Agent工作流",
        difficulty: "advanced",
        acceptanceCriteria: ["完成工作流设计", "在Dify/n8n上实现", "端到端测试通过", "记录效率提升数据"],
        estimatedTime: "2周", deliverable: "AI Agent工作流 + 使用文档"
      }],
      cases: [], keyTakeaways: ["工作流设计要从业务需求出发", "异常处理是工作流稳定性的关键", "先手动验证再自动化"]
    }
  },
  {
    id: "S02", titleZh: "AI数据治理与安全", titleEn: "AI Data Governance & Security",
    descriptionZh: "建立AI使用的数据治理框架：数据分级、隐私保护、合规使用、模型安全、输出审核机制",
    descriptionEn: "Establish AI data governance framework: data classification, privacy protection, compliant usage, model security, output review",
    layer: "system", level: 3, maxLevel: 4, departments: ["all"], pilotProjects: [],
    progress: 20, prerequisites: ["F01"], tools: ["ChatGPT", "内部政策文档"],
    tags: ["治理", "安全", "合规"],
    knowledge: {
      resources: [
        { title: "CUPSHE AI使用安全规范", type: "doc", url: "#", duration: "20min", source: "CUPSHE AI知识库" },
        { title: "AI数据分级指南", type: "doc", url: "#", duration: "15min", source: "CUPSHE IT" },
      ],
      prompts: [], workflows: [], tasks: [{
        title: "AI安全规范学习", description: "学习并通过AI安全使用规范考核",
        difficulty: "beginner",
        acceptanceCriteria: ["完成安全规范学习", "通过在线考核（≥80分）", "签署AI使用承诺书"],
        estimatedTime: "2小时", deliverable: "考核通过证明"
      }],
      cases: [], keyTakeaways: ["不要将敏感数据输入公共AI模型", "AI输出需要人工审核", "遵守数据分级使用规范"]
    }
  },
  {
    id: "S03", titleZh: "AI ROI评估与价值量化", titleEn: "AI ROI Assessment & Value Quantification",
    descriptionZh: "建立AI项目的ROI评估框架：效率提升量化、成本节约计算、收入增长归因、AI成熟度评估",
    descriptionEn: "AI project ROI framework: efficiency gains quantification, cost savings calculation, revenue growth attribution, maturity assessment",
    layer: "system", level: 3, maxLevel: 4, departments: ["all"], pilotProjects: ["marketing-ai", "creative-ai", "data-ai"],
    progress: 22, prerequisites: ["F04"], tools: ["ChatGPT", "Excel", "Python"],
    tags: ["ROI", "价值", "评估"],
    knowledge: {
      resources: [{ title: "AI项目ROI评估方法论", type: "doc", url: "#", duration: "30min", source: "CUPSHE AI知识库" }],
      prompts: [{
        title: "AI项目ROI计算", scenario: "评估AI项目的投入产出比",
        prompt: "请帮我计算以下AI项目的ROI：\n\n项目：{项目描述}\n投入：{成本明细}\n产出指标：{效率/成本/收入变化}\n\n请输出：\n1. ROI计算（含公式）\n2. 投资回收期\n3. 定性收益（难以量化的价值）\n4. 风险因素\n5. 持续优化建议",
        variables: ["项目描述", "成本明细", "效率/成本/收入变化"], expectedOutput: "AI项目ROI评估报告"
      }],
      workflows: [], tasks: [{
        title: "AI项目ROI评估实战", description: "完成一个AI项目的完整ROI评估",
        difficulty: "intermediate",
        acceptanceCriteria: ["完成定量ROI计算", "包含定性收益分析", "提出优化建议"],
        estimatedTime: "3天", deliverable: "AI项目ROI评估报告"
      }],
      cases: [], keyTakeaways: ["ROI评估要包含直接和间接收益", "建立基线数据是评估的前提"]
    }
  },
  {
    id: "S04", titleZh: "AI变革管理与组织赋能", titleEn: "AI Change Management & Org Enablement",
    descriptionZh: "推动组织AI变革：变革沟通策略、抵触管理、AI文化建设、标杆打造、知识管理体系",
    descriptionEn: "Drive organizational AI transformation: change communication, resistance management, AI culture building, best practice showcase",
    layer: "system", level: 3, maxLevel: 4, departments: ["all"], pilotProjects: [],
    progress: 25, prerequisites: ["F01"], tools: ["ChatGPT", "内部沟通平台"],
    tags: ["变革", "文化", "组织"],
    knowledge: {
      resources: [{ title: "AI变革管理方法论", type: "doc", url: "#", duration: "35min", source: "CUPSHE AI知识库" }],
      prompts: [{
        title: "变革沟通方案", scenario: "推动新的AI工具或流程变革",
        prompt: "请帮我设计一个AI变革沟通方案：\n\n变革内容：{变革描述}\n影响范围：{部门/人数}\n预期抵触：{可能的抵触点}\n\n请输出：\n1. 沟通策略（分阶段）\n2. 关键信息（为什么变/怎么变/对我有什么好处）\n3. 抵触应对方案\n4. 标杆案例设计\n5. 效果评估方法",
        variables: ["变革描述", "部门/人数", "可能的抵触点"], expectedOutput: "变革沟通方案"
      }],
      workflows: [], tasks: [{
        title: "AI变革推动实战", description: "在一个部门推动一项AI变革",
        difficulty: "advanced",
        acceptanceCriteria: ["完成变革沟通方案", "执行至少2轮沟通", "采纳率≥60%"],
        estimatedTime: "1个月", deliverable: "变革推动报告"
      }],
      cases: [], keyTakeaways: ["变革管理的核心是'对我有什么好处'", "标杆案例是最好的说服工具", "持续沟通比一次性宣贯更有效"]
    }
  },
];
