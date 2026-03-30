
// CUPSHE AI Skill Tree — Comprehensive Data with Knowledge Deposits
// Full Loop: 技能学习 → AI科代表带动实践 → 产出案例(Prompt+上传) → 沉淀知识 → 通晒投票 → 裂变复用 → 价值评估 → 双周分享
// Mapped to: 14 departments × 3 pilot projects × 4 layers
// ============================================================

export type SkillLayer = "foundation" | "department" | "scenario" | "system";
export type PilotProject = "marketing-ai" | "creative-ai" | "data-ai";
export type CaseType = "internal" | "industry" | "general";

export interface LearningResource {
  title: string;
  type: "video" | "article" | "tutorial" | "doc" | "course" | "template";
  url: string;
  duration?: string;
  source: string;
}

export interface PromptTemplate {
  title: string;
  scenario: string;
  prompt: string;
  variables?: string[];
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
  caseId?: string;
  title: string;
  department: string;
  summary: string;
  impact: string;
  type: CaseType;
  url?: string;
  fissionFrom?: string;
}

export interface CaseValueModel {
  originalScore: number;
  fissionCount: number;
  crossDeptReuse: number;
  quantifiedImpact: string;
  votingScore: number;
  totalValue: number;
}

export interface KnowledgeDeposit {
  resources: LearningResource[];
  prompts: PromptTemplate[];
  workflows: WorkflowSOP[];
  tasks: PracticeTask[];
  cases: LinkedCase[];
  keyTakeaways: string[];
  caseSubmissionPrompt?: string;
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

// Case Value Evaluation Model
export const caseValueWeights = {
  originalCreativity: 0.25,   // 原创性和创新度
  businessImpact: 0.25,       // 业务效果量化
  fissionReuse: 0.20,         // 裂变复用价值（被引用次数×跨部门系数）
  knowledgeDeposit: 0.15,     // 知识沉淀质量（Prompt/SOP/文档完整度）
  communityVoting: 0.15,      // 通晒投票热度
};

export function calculateCaseValue(model: CaseValueModel): number {
  const fissionScore = Math.min(100, model.fissionCount * 15 + model.crossDeptReuse * 25);
  return Math.round(
    model.originalScore * caseValueWeights.originalCreativity +
    model.quantifiedImpact.length > 0 ? 80 * caseValueWeights.businessImpact : 0 +
    fissionScore * caseValueWeights.fissionReuse +
    70 * caseValueWeights.knowledgeDeposit +
    model.votingScore * caseValueWeights.communityVoting
  );
}

export const skillNodes: SkillNode[] = [
  // ========== FOUNDATION (全员必修) ==========
  {
    id: "F01",
    titleZh: "AI认知与思维",
    titleEn: "AI Awareness & Mindset",
    descriptionZh: "理解AI基本概念、能力边界与发展趋势，建立AI-first思维模式，识别工作中的AI应用机会",
    descriptionEn: "Understand AI fundamentals, capabilities, limitations and trends. Build AI-first mindset and identify AI opportunities at work",
    layer: "foundation", level: 1, maxLevel: 3, departments: ["all"], pilotProjects: [], progress: 85,
    prerequisites: [], tools: ["ChatGPT", "Claude", "Gemini"], tags: ["必修", "入门"],
    knowledge: {
      caseSubmissionPrompt: "请用以下结构提交你的AI认知实践案例：\n\n【案例编号】自动生成\n【案例标题】一句话描述你的AI认知突破\n【所属部门】你的部门\n【实践场景】你在什么工作场景下产生了AI认知转变\n【具体做法】你做了什么（尝试了哪些AI工具、改变了什么思维方式）\n【效果对比】AI前 vs AI后的效率/质量变化（请量化）\n【关键Prompt】如果有使用的核心Prompt请粘贴\n【可复用性】其他部门/岗位是否可以复用？如何复用？\n【经验教训】踩过的坑和建议",
      resources: [
        { title: "AI基础概念入门（内部培训）", type: "course", url: "#", duration: "2h", source: "CUPSHE内训" },
        { title: "ChatGPT/Claude/Gemini三大模型对比", type: "article", url: "#", duration: "20min", source: "CUPSHE AI知识库" },
        { title: "Generative AI for Everyone - Andrew Ng", type: "course", url: "https://www.coursera.org/learn/generative-ai-for-everyone", duration: "5h", source: "Coursera" },
        { title: "McKinsey: The State of AI in 2025", type: "article", url: "https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-state-of-ai", duration: "30min", source: "McKinsey" },
      ],
      prompts: [
        {
          title: "AI机会识别分析",
          scenario: "分析自己岗位中哪些工作可以用AI提效",
          prompt: "我是CUPSHE {部门}的{岗位}，我的日常工作包括：\n1. {工作内容1}\n2. {工作内容2}\n3. {工作内容3}\n4. {工作内容4}\n5. {工作内容5}\n\n请按以下维度分析每项工作的AI应用潜力：\n- AI可辅助程度（高/中/低）\n- 推荐AI工具\n- 预估节省时间（%）\n- 实施难度（易/中/难）\n- 优先级排序\n\n请用表格形式输出，并给出\"本周就能开始\"的Top 3行动建议。",
          variables: ["部门", "岗位", "工作内容1", "工作内容2", "工作内容3", "工作内容4", "工作内容5"],
          expectedOutput: "按优先级排列的AI应用机会清单表格，含具体工具和预估效率提升"
        },
        {
          title: "AI行业动态追踪",
          scenario: "了解所在领域最新AI应用进展",
          prompt: "请帮我整理{行业领域}在过去一个月内最重要的AI应用进展，要求：\n1. 列出5-8个关键动态\n2. 每个动态说明对{我的岗位}的潜在影响\n3. 标注\"立即可用\"\"近期可用\"\"中长期关注\"三个优先级\n4. 对于\"立即可用\"的，给出具体的上手步骤\n\n输出格式：表格 + 行动建议",
          variables: ["行业领域", "我的岗位"],
          expectedOutput: "分优先级的AI动态清单，含岗位影响分析和行动建议"
        },
        {
          title: "AI能力边界评估",
          scenario: "判断某项任务是否适合用AI完成",
          prompt: "我想用AI来完成以下任务：{任务描述}\n\n请从以下维度评估这个任务的AI适用性：\n1. 任务类型分析（创意型/分析型/执行型/判断型）\n2. AI擅长度评分（1-10分）\n3. 风险评估（数据安全/准确性/合规性）\n4. 推荐方案（纯AI/人机协作/不建议用AI）\n5. 如果推荐使用，给出具体工具和Prompt建议\n6. 如果不推荐，说明原因和替代方案",
          variables: ["任务描述"],
          expectedOutput: "任务AI适用性评估报告，含推荐方案"
        }
      ],
      workflows: [
        {
          title: "个人AI机会评估工作流",
          scenario: "新员工入职或季度AI能力复盘时，由AI科代表带领团队完成",
          steps: [
            { step: 1, action: "列出自己所有日常工作任务（至少10项），按时间占比排序", output: "任务清单", tips: "包含周期性和临时性任务" },
            { step: 2, action: "用ChatGPT分析每项任务的AI应用可能性（使用上方Prompt模板）", tool: "ChatGPT", output: "AI机会矩阵" },
            { step: 3, action: "选择Top 3高价值场景，实际用AI工具完成一次", tool: "ChatGPT/Claude", output: "实操体验记录" },
            { step: 4, action: "记录效率对比（AI前 vs AI后），量化节省时间", output: "效率对比表" },
            { step: 5, action: "将发现整理为案例，使用案例提交Prompt上传到平台", output: "案例提交" },
            { step: 6, action: "在双周分享会上分享发现，接受投票评价", output: "分享PPT/文档" },
          ],
          estimatedTime: "3-5天（分散进行）"
        }
      ],
      tasks: [
        {
          title: "我的AI机会地图",
          description: "AI科代表带领团队成员梳理岗位工作任务，识别AI应用机会，实际尝试并产出案例，上传平台通晒",
          difficulty: "beginner",
          acceptanceCriteria: [
            "完成个人工作任务清单（≥10项）",
            "识别至少5个AI应用机会并说明理由",
            "实际使用AI工具完成1项任务并记录效果对比",
            "使用案例提交Prompt将案例上传到平台",
            "在双周分享会上分享发现，获得团队投票"
          ],
          estimatedTime: "1周",
          deliverable: "《我的AI机会地图》案例文档（含效率对比数据）"
        },
        {
          title: "AI认知案例裂变复用",
          description: "参考平台上其他部门的AI认知案例（通过案例编号引用），结合自己部门业务进行复用实践",
          difficulty: "beginner",
          acceptanceCriteria: [
            "在平台上浏览并选择至少2个其他部门的优秀案例",
            "记录引用的案例编号（如CASE-OP-001）",
            "结合自己部门业务场景进行复用实践",
            "产出裂变案例并上传平台，标注\"裂变自CASE-XX-XXX\"",
            "裂变案例获得至少5票通晒投票"
          ],
          estimatedTime: "3天",
          deliverable: "裂变案例文档（含原始案例引用和新效果数据）"
        }
      ],
      cases: [
        { caseId: "CASE-OP-001", title: "运营中心客服团队AI认知转型", department: "运营中心", type: "internal", summary: "客服团队AI科代表组织全员完成AI机会地图，识别出5个高价值AI应用场景（FAQ自动回复、邮件模板生成、评论分析、工单分类、多语言翻译），并在2周内落地3个场景", impact: "团队AI工具使用率从15%提升至75%，月均节省120人时", url: "#" },
        { caseId: "CASE-IND-001", title: "SHEIN全员AI认知培训体系", department: "行业案例", type: "industry", summary: "SHEIN在2024年推行全员AI认知培训，覆盖设计、供应链、营销等部门，通过\"AI+岗位\"工作坊让每个员工找到至少3个AI应用场景，并建立内部AI案例库", impact: "全公司AI工具渗透率达到85%，设计环节效率提升40%", url: "https://www.businessofapps.com/data/shein-statistics/" },
        { caseId: "CASE-GEN-001", title: "McKinsey AI认知成熟度模型", department: "通用案例", type: "general", summary: "McKinsey提出企业AI认知成熟度五级模型：L1感知→L2理解→L3应用→L4优化→L5创新。建议企业从全员L1-L2培训开始，通过实践案例驱动向L3-L4进阶", impact: "采用该模型的企业AI转型成功率提升60%", url: "https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-state-of-ai" },
      ],
      keyTakeaways: [
        "AI是增强工具而非替代工具，核心是人机协作",
        "每个岗位都有AI应用机会，关键是识别高价值场景并量化效果",
        "完整闭环：学习→实践→案例(Prompt+上传)→沉淀→通晒投票→裂变复用→双周分享",
        "案例裂变是最高效的组织学习方式——引用他人案例编号，结合自己业务复用",
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
    layer: "foundation", level: 1, maxLevel: 3, departments: ["all"], pilotProjects: [], progress: 78,
    prerequisites: ["F01"], tools: ["ChatGPT", "Claude"], tags: ["必修", "核心"],
    knowledge: {
      caseSubmissionPrompt: "请用以下结构提交你的Prompt Engineering实践案例：\n\n【案例编号】自动生成\n【案例标题】一句话描述你的Prompt技巧突破\n【所属部门】你的部门\n【业务场景】你在什么业务场景下使用了Prompt技巧\n【Prompt全文】请粘贴你的完整Prompt（含角色设定、背景、任务、要求）\n【迭代过程】经历了几轮迭代？每轮改了什么？\n【输出质量】最终输出质量评分（1-10）及评分理由\n【效果对比】使用Prompt前后的效率/质量变化\n【可复用性】该Prompt模板是否可供其他部门复用？",
      resources: [
        { title: "Prompt Engineering完全指南（内部版）", type: "course", url: "#", duration: "3h", source: "CUPSHE内训" },
        { title: "CUPSHE Prompt最佳实践手册", type: "doc", url: "#", duration: "30min", source: "CUPSHE AI知识库" },
        { title: "OpenAI Prompt Engineering Guide", type: "tutorial", url: "https://platform.openai.com/docs/guides/prompt-engineering", duration: "45min", source: "OpenAI" },
        { title: "Anthropic Prompt Engineering Interactive Tutorial", type: "course", url: "https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview", duration: "1h", source: "Anthropic" },
      ],
      prompts: [
        {
          title: "结构化角色设定模板",
          scenario: "需要AI扮演特定角色完成任务时",
          prompt: "# 角色\n你是一位{角色描述}，拥有{年限}年{领域}经验，特别擅长{专长}。\n\n# 背景\n{任务背景说明}\n当前面临的挑战：{挑战描述}\n\n# 任务\n请完成以下工作：\n{具体任务描述}\n\n# 要求\n- 输出格式：{格式要求}\n- 语言风格：{风格要求}\n- 字数限制：{字数}\n- 必须包含：{必含要素}\n- 禁止包含：{禁止要素}\n\n# 示例\n输入：{示例输入}\n期望输出：{示例输出}\n\n# 评估标准\n请确保输出满足以下标准：\n1. {标准1}\n2. {标准2}\n3. {标准3}",
          variables: ["角色描述", "年限", "领域", "专长", "任务背景说明", "挑战描述", "具体任务描述", "格式要求", "风格要求", "字数", "必含要素", "禁止要素", "示例输入", "示例输出", "标准1", "标准2", "标准3"],
          expectedOutput: "符合角色定位和格式要求的高质量输出"
        },
        {
          title: "Chain-of-Thought推理模板",
          scenario: "需要AI进行复杂分析或决策时",
          prompt: "请按照以下步骤逐步分析{问题}：\n\nStep 1: 明确问题的核心要素和边界条件\nStep 2: 收集和整理相关信息，列出已知和未知\nStep 3: 分析各要素之间的因果关系\nStep 4: 评估可能的方案（至少3个），列出各方案的优劣\nStep 5: 推荐最优方案并说明理由\nStep 6: 列出执行该方案的关键风险和缓解措施\n\n请在每个步骤后展示你的思考过程，用\"→\"标注推理链。\n最终输出一个结构化的决策建议表。",
          variables: ["问题"],
          expectedOutput: "结构化的逐步分析过程和最终决策建议表"
        },
        {
          title: "迭代优化模板",
          scenario: "对AI输出不满意需要优化时",
          prompt: "上一次的输出存在以下问题：\n{问题描述}\n\n请按以下方向优化：\n1. {优化方向1}\n2. {优化方向2}\n3. {优化方向3}\n\n保留原输出中好的部分：\n{保留内容}\n\n额外补充信息：\n{补充信息}\n\n请重新生成，并在输出末尾标注\"本次优化了哪些方面\"。",
          variables: ["问题描述", "优化方向1", "优化方向2", "优化方向3", "保留内容", "补充信息"],
          expectedOutput: "针对性优化后的改进版输出，含优化说明"
        }
      ],
      workflows: [
        {
          title: "Prompt迭代优化工作流",
          scenario: "AI科代表带领团队成员掌握Prompt迭代技巧",
          steps: [
            { step: 1, action: "明确目标：定义期望输出的格式、风格、内容、质量标准", output: "需求说明", tips: "越具体越好，写出\"好的输出长什么样\"" },
            { step: 2, action: "编写初始Prompt：使用角色+背景+任务+要求+示例结构", tool: "ChatGPT/Claude", output: "初始输出" },
            { step: 3, action: "评估输出：对比期望，用1-10分打分，标记不满意的部分", output: "评估记录" },
            { step: 4, action: "迭代优化：针对不足调整Prompt，添加示例或约束（通常需2-3轮）", tool: "ChatGPT/Claude", output: "优化后输出", tips: "每次只改1-2个变量，方便定位效果" },
            { step: 5, action: "固化模板：将效果好的Prompt保存到公司Prompt库", output: "标准Prompt模板" },
            { step: 6, action: "提交案例到平台通晒，标注Prompt迭代过程", output: "案例通晒" },
          ],
          estimatedTime: "30-60分钟"
        }
      ],
      tasks: [
        {
          title: "Prompt Engineering实战挑战",
          description: "针对自己岗位的3个常见场景，各编写一个高质量Prompt模板，提交到公司Prompt库并在平台通晒",
          difficulty: "beginner",
          acceptanceCriteria: [
            "完成3个不同场景的Prompt模板",
            "每个模板包含角色设定、背景、任务、要求、示例",
            "实际测试每个模板并记录输出质量评分（1-10），至少1个达到8分以上",
            "提交到公司Prompt库，使用案例提交Prompt上传到平台",
            "在平台通晒获得投票，在双周分享会上分享最佳Prompt"
          ],
          estimatedTime: "3天",
          deliverable: "3个标准化Prompt模板 + 测试记录 + 平台案例"
        }
      ],
      cases: [
        { caseId: "CASE-MK-001", title: "营销中心广告文案Prompt标准化", department: "营销中心", type: "internal", summary: "营销中心AI科代表带领团队建立了10个广告文案场景的标准Prompt模板（含Facebook/Instagram/TikTok三平台），每个模板经过3轮迭代优化，输出质量评分均达到8分以上", impact: "文案产出效率提升3倍，质量评分提升40%，模板被创意中心裂变复用", url: "#" },
        { caseId: "CASE-IND-002", title: "Anker Prompt工程化体系", department: "行业案例", type: "industry", summary: "Anker在2024年建立了公司级Prompt工程化体系，将产品描述、客服回复、营销文案等场景的Prompt标准化，并通过内部Prompt库实现跨团队共享和迭代", impact: "内容生产效率提升5倍，Prompt库累计1000+模板，跨团队复用率65%", url: "https://www.anker.com/" },
        { caseId: "CASE-GEN-002", title: "OpenAI Prompt Engineering最佳实践", department: "通用案例", type: "general", summary: "OpenAI官方总结的Prompt Engineering六大策略：写清晰指令、提供参考文本、将复杂任务分解、给模型思考时间、使用外部工具、系统性测试。这套方法论已被全球数万企业采用", impact: "遵循最佳实践的Prompt输出质量提升50-80%", url: "https://platform.openai.com/docs/guides/prompt-engineering" },
      ],
      keyTakeaways: [
        "好的Prompt = 清晰角色 + 具体背景 + 明确任务 + 格式约束 + 示例",
        "Few-shot示例是提升输出质量最有效的方法，建议每个Prompt至少1个示例",
        "迭代优化比一次完美更重要，通常需要2-3轮，每次只改1-2个变量",
        "将好的Prompt固化为模板→上传平台通晒→接受投票→裂变复用到其他部门",
        "不同模型有不同特点：ChatGPT擅长创意，Claude擅长分析长文，按需选择"
      ]
    }
  },
  {
    id: "F03",
    titleZh: "AI办公提效",
    titleEn: "AI Office Productivity",
    descriptionZh: "使用AI提升日常办公效率：文档撰写与润色、邮件处理、会议纪要生成、PPT制作、Excel数据分析",
    descriptionEn: "Boost daily productivity with AI: document writing, email handling, meeting notes, PPT creation, Excel data analysis",
    layer: "foundation", level: 1, maxLevel: 3, departments: ["all"], pilotProjects: [], progress: 72,
    prerequisites: ["F02"], tools: ["ChatGPT", "Copilot", "Gamma", "Claude"], tags: ["必修", "效率"],
    knowledge: {
      caseSubmissionPrompt: "请用以下结构提交你的AI办公提效案例：\n\n【案例编号】自动生成\n【案例标题】一句话描述你的AI办公效率突破\n【所属部门】你的部门\n【办公场景】邮件/文档/PPT/Excel/会议纪要/其他\n【AI前耗时】完成该任务原来需要多长时间\n【AI后耗时】使用AI后需要多长时间\n【节省时间】节省了多少时间（百分比）\n【使用工具】ChatGPT/Claude/Copilot/Gamma/其他\n【核心Prompt】请粘贴你使用的核心Prompt\n【输出质量】AI输出是否需要大量修改？修改比例约多少？\n【可复用性】该方法是否可供其他部门复用？",
      resources: [
        { title: "AI办公提效实战手册", type: "doc", url: "#", duration: "40min", source: "CUPSHE内训" },
        { title: "用AI写邮件/文档/PPT全流程", type: "video", url: "#", duration: "30min", source: "CUPSHE内训" },
        { title: "Microsoft Copilot for Work Tutorial", type: "tutorial", url: "https://support.microsoft.com/en-us/copilot", duration: "45min", source: "Microsoft" },
        { title: "Gamma AI Presentation Guide", type: "tutorial", url: "https://gamma.app/docs", duration: "20min", source: "Gamma" },
      ],
      prompts: [
        {
          title: "专业商务邮件撰写",
          scenario: "需要写英文商务邮件给海外供应商/合作伙伴/客户",
          prompt: "请帮我写一封{邮件类型}邮件：\n\n收件人：{收件人角色}（{公司/部门}）\n目的：{邮件目的}\n关键信息：\n1. {要传达的核心内容1}\n2. {要传达的核心内容2}\n3. {要传达的核心内容3}\n语气：{正式/友好/紧急}\n\n要求：\n- 主题行简洁有力（不超过8个词）\n- 正文不超过{字数}字\n- 包含明确的Call-to-Action和截止日期\n- 符合CUPSHE品牌调性（专业、温暖、国际化）\n- 结尾提供联系方式和下一步行动\n\n请同时提供中文翻译版本供内部存档。",
          variables: ["邮件类型", "收件人角色", "公司/部门", "邮件目的", "要传达的核心内容1", "要传达的核心内容2", "要传达的核心内容3", "正式/友好/紧急", "字数"],
          expectedOutput: "包含主题行和正文的完整英文邮件 + 中文翻译"
        },
        {
          title: "会议纪要智能生成",
          scenario: "会议结束后快速生成结构化纪要",
          prompt: "请根据以下会议内容生成结构化会议纪要：\n\n会议主题：{主题}\n会议时间：{时间}\n参会人：{参会人}\n会议内容要点：\n{要点记录}\n\n输出格式：\n1. 会议概要（2-3句话总结核心结论）\n2. 关键决议（编号列表，每条标注决策人）\n3. 待办事项表格（序号 | 事项 | 负责人 | 截止日期 | 优先级）\n4. 风险/待确认事项\n5. 下次会议安排\n\n语言要求：中文为主，专业术语保留英文",
          variables: ["主题", "时间", "参会人", "要点记录"],
          expectedOutput: "结构化会议纪要，含决议、待办表格和下次安排"
        },
        {
          title: "Excel数据分析报告生成",
          scenario: "需要从Excel数据生成分析报告",
          prompt: "我有一份{数据类型}数据，包含以下字段：{字段列表}\n数据时间范围：{时间范围}\n数据量：约{行数}行\n\n请帮我分析：\n1. 数据概览（关键指标汇总，用表格呈现）\n2. 趋势分析（同比/环比变化，标注异常波动）\n3. Top/Bottom排名（前5和后5）\n4. 异常发现（偏离均值>2个标准差的数据点）\n5. 相关性分析（哪些指标之间有强相关）\n6. 建议行动（基于数据的3-5条具体建议，含优先级）\n\n请用表格和要点形式呈现，关键数字加粗。",
          variables: ["数据类型", "字段列表", "时间范围", "行数"],
          expectedOutput: "结构化数据分析报告，含表格、趋势和行动建议"
        }
      ],
      workflows: [
        {
          title: "AI周报自动化工作流",
          scenario: "每周五撰写工作周报，AI科代表推广到全团队",
          steps: [
            { step: 1, action: "整理本周完成的工作要点（简单罗列即可）", output: "工作要点清单", tips: "不用写完整句子，关键词即可" },
            { step: 2, action: "用ChatGPT润色为结构化周报（使用周报Prompt模板）", tool: "ChatGPT", output: "周报初稿" },
            { step: 3, action: "添加数据支撑（关键指标变化、完成率等）", output: "带数据的周报" },
            { step: 4, action: "生成下周计划和风险预警", tool: "ChatGPT", output: "完整周报" },
            { step: 5, action: "如果发现了好的AI提效方法，整理为案例上传平台", output: "案例提交（可选）" },
          ],
          estimatedTime: "15-20分钟（原来2小时）"
        },
        {
          title: "AI辅助PPT制作工作流",
          scenario: "需要快速制作汇报PPT",
          steps: [
            { step: 1, action: "用ChatGPT生成PPT大纲和每页核心内容", tool: "ChatGPT", output: "PPT大纲", tips: "先明确受众和目的" },
            { step: 2, action: "用Gamma或ChatGPT生成PPT初稿", tool: "Gamma/ChatGPT", output: "PPT初稿" },
            { step: 3, action: "调整视觉风格，确保符合CUPSHE品牌VI", output: "品牌化PPT" },
            { step: 4, action: "用ChatGPT生成演讲稿/备注", tool: "ChatGPT", output: "演讲备注" },
          ],
          estimatedTime: "30-45分钟（原来半天）"
        }
      ],
      tasks: [
        {
          title: "一周AI办公实践",
          description: "在一周内用AI辅助完成至少5项日常办公任务，记录效率对比，产出案例上传平台通晒",
          difficulty: "beginner",
          acceptanceCriteria: [
            "用AI完成至少5项不同类型的办公任务（邮件、文档、PPT、Excel、会议纪要）",
            "记录每项任务的AI前耗时 vs AI后耗时，计算节省百分比",
            "总结最有效的3个AI办公场景和对应Prompt",
            "将最佳实践整理为案例，使用案例提交Prompt上传到平台",
            "在平台通晒获得投票，在双周分享会上分享Top 1案例"
          ],
          estimatedTime: "1周（融入日常工作）",
          deliverable: "《AI办公效率对比报告》+ 平台案例"
        }
      ],
      cases: [
        { caseId: "CASE-GM-001", title: "总经办周报自动化", department: "总经办", type: "internal", summary: "总经办AI科代表推动全部门采用AI周报工作流，将周报撰写从2小时缩短到20分钟。建立了标准化周报Prompt模板，并被5个部门裂变复用", impact: "每周节省1.5小时/人，全公司推广后月均节省500+人时", url: "#" },
        { caseId: "CASE-IND-003", title: "PatPat全员AI办公提效计划", department: "行业案例", type: "industry", summary: "PatPat（母婴跨境电商）在2024年推行全员AI办公提效计划，重点覆盖邮件、文档、数据分析三大场景，通过内部AI工具培训和Prompt库建设，实现办公效率整体提升", impact: "全公司办公效率提升35%，年节省人力成本约200万元", url: "https://www.patpat.com/" },
        { caseId: "CASE-GEN-003", title: "Gartner AI办公效率提升研究", department: "通用案例", type: "general", summary: "Gartner 2025年研究报告指出，AI办公工具在文档撰写、邮件处理、数据分析三个场景的效率提升最为显著，平均提升40-60%。关键成功因素是建立标准化Prompt模板和持续迭代优化", impact: "采用AI办公工具的企业员工满意度提升25%，离职率降低15%", url: "https://www.gartner.com/en/topics/artificial-intelligence" },
      ],
      keyTakeaways: [
        "AI办公提效的核心是将重复性文字工作交给AI，人类专注于判断和决策",
        "邮件、文档、PPT、数据分析是四大高频场景，优先攻克",
        "建立个人Prompt模板库→上传平台通晒→接受投票→裂变复用到其他部门",
        "AI生成内容需要人工审核和微调，不能直接使用，但修改量通常<20%",
        "效率对比数据是案例价值评估的核心指标，务必量化记录"
      ]
    }
  },
  {
    id: "F04",
    titleZh: "AI信息检索与研究",
    titleEn: "AI Research & Intelligence",
    descriptionZh: "利用AI进行高效信息搜索、竞品调研、行业趋势分析、研究报告生成、多源信息整合",
    descriptionEn: "Efficient AI-powered research: information retrieval, competitor analysis, industry trends, report generation, multi-source synthesis",
    layer: "foundation", level: 1, maxLevel: 3, departments: ["all"], pilotProjects: [], progress: 65,
    prerequisites: ["F02"], tools: ["Perplexity", "ChatGPT", "Claude"], tags: ["必修", "研究"],
    knowledge: {
      caseSubmissionPrompt: "请用以下结构提交你的AI研究实践案例：\n\n【案例编号】自动生成\n【案例标题】一句话描述你的AI研究效率突破\n【所属部门】你的部门\n【研究场景】竞品调研/行业趋势/市场分析/用户研究/其他\n【AI前耗时】完成该调研原来需要多长时间\n【AI后耗时】使用AI后需要多长时间\n【使用工具】Perplexity/ChatGPT/Claude/其他\n【核心Prompt】请粘贴你使用的核心Prompt\n【信息质量】AI输出的信息准确率约多少？如何验证的？\n【可复用性】该调研方法是否可供其他部门复用？",
      resources: [
        { title: "AI搜索与研究工具对比", type: "doc", url: "#", duration: "20min", source: "CUPSHE AI知识库" },
        { title: "Perplexity深度搜索技巧", type: "tutorial", url: "https://www.perplexity.ai/hub/getting-started", duration: "30min", source: "Perplexity" },
        { title: "竞品分析AI方法论", type: "article", url: "#", duration: "30min", source: "CUPSHE AI知识库" },
        { title: "How to Use AI for Market Research", type: "article", url: "https://hbr.org/2024/03/how-to-use-gen-ai-for-market-research", duration: "20min", source: "Harvard Business Review" },
      ],
      prompts: [
        {
          title: "竞品快速调研",
          scenario: "需要快速了解竞争对手动态",
          prompt: "请帮我调研{竞品名称}（泳装/度假服饰品牌）的最新动态：\n\n1. 品牌定位与目标客群对比（vs CUPSHE）\n2. 近3个月的重要营销活动和促销策略\n3. 新品发布策略和定价区间（与CUPSHE同品类对比）\n4. 社媒运营策略（Instagram/TikTok粉丝量、互动率、内容风格）\n5. 用户评价中的高频关键词（正面+负面Top 5）\n6. 独立站流量和渠道分布（如有数据）\n7. 与CUPSHE相比的差异化优势和劣势\n\n请用对比表格形式呈现，数据标注来源和时间。",
          variables: ["竞品名称"],
          expectedOutput: "结构化竞品分析报告，含对比表格和数据来源"
        },
        {
          title: "行业趋势深度分析",
          scenario: "需要了解行业最新趋势为决策提供依据",
          prompt: "请分析{行业/领域}在2026年的关键趋势，结合CUPSHE（跨境泳装DTC品牌）的业务：\n\n1. 技术趋势（AI/新技术在该领域的应用）\n2. 消费者行为变化（美国市场为主）\n3. 市场格局变化（新进入者、并购、退出）\n4. 监管政策变化（关税、数据隐私、环保）\n5. 供应链趋势（成本、时效、可持续性）\n6. 对CUPSHE的具体启示和建议（至少5条可行动的）\n\n请引用具体数据和来源，标注信息的可信度（高/中/低）。",
          variables: ["行业/领域"],
          expectedOutput: "含数据支撑的行业趋势分析报告，含CUPSHE行动建议"
        }
      ],
      workflows: [
        {
          title: "AI竞品监控工作流",
          scenario: "定期跟踪竞品动态，AI科代表每月组织一次",
          steps: [
            { step: 1, action: "用Perplexity搜索竞品最新动态（新品、营销、社媒）", tool: "Perplexity", output: "原始信息", tips: "搜索英文关键词效果更好" },
            { step: 2, action: "用ChatGPT整理和结构化信息，生成对比表格", tool: "ChatGPT", output: "结构化报告" },
            { step: 3, action: "对比CUPSHE现状，标注差距和机会点", output: "差距分析" },
            { step: 4, action: "生成行动建议，标注优先级和负责部门", tool: "ChatGPT", output: "建议清单" },
            { step: 5, action: "将调研成果整理为案例上传平台，供其他部门参考", output: "案例通晒" },
          ],
          estimatedTime: "45-60分钟"
        }
      ],
      tasks: [
        {
          title: "竞品AI调研报告",
          description: "选择CUPSHE的2个主要竞品，用AI工具完成一份深度调研报告，上传平台通晒",
          difficulty: "beginner",
          acceptanceCriteria: [
            "覆盖至少2个竞品的全面分析（定位、产品、营销、社媒、用户评价）",
            "包含定量数据（价格区间、社媒数据、评分等）并标注来源",
            "提出至少5条对CUPSHE有参考价值的建议",
            "使用案例提交Prompt将调研报告上传到平台通晒",
            "在双周分享会上分享关键发现"
          ],
          estimatedTime: "2天",
          deliverable: "《竞品AI调研报告》+ 平台案例"
        }
      ],
      cases: [
        { caseId: "CASE-PD-001", title: "产品中心AI趋势调研革新", department: "产品中心", type: "internal", summary: "产品中心AI科代表用Perplexity+ChatGPT将季度趋势调研从2周缩短到3天，覆盖色彩趋势、面料创新、款式演变、竞品新品四个维度，信息源从5个扩展到15+个", impact: "调研效率提升70%，覆盖信息源增加3倍，调研报告被营销和创意中心裂变复用", url: "#" },
        { caseId: "CASE-IND-004", title: "Zaful AI竞品监控体系", department: "行业案例", type: "industry", summary: "Zaful建立了AI驱动的竞品监控体系，每周自动抓取10+竞品的新品、价格、促销、社媒数据，用AI生成结构化竞品周报，分发给产品、营销、运营三个部门", impact: "竞品响应速度从2周缩短到2天，新品跟进效率提升80%", url: "https://www.zaful.com/" },
        { caseId: "CASE-GEN-004", title: "HBR: AI驱动的市场研究方法论", department: "通用案例", type: "general", summary: "Harvard Business Review 2024年文章总结了AI驱动市场研究的四步法：1)用AI搜索广泛收集信息 2)用AI结构化和去重 3)用AI交叉验证 4)人工判断和决策。强调AI研究的核心价值是\"速度×广度\"而非替代人类判断", impact: "采用AI研究方法的企业市场洞察产出速度提升5倍", url: "https://hbr.org/2024/03/how-to-use-gen-ai-for-market-research" },
      ],
      keyTakeaways: [
        "Perplexity适合实时信息搜索（带来源），ChatGPT/Claude适合深度分析和结构化",
        "多源交叉验证是确保信息准确性的关键，AI输出的数据务必核实",
        "建立固定的调研模板→上传平台通晒→裂变复用到其他部门",
        "AI调研结果需要人工判断和补充行业经验，AI提供速度和广度，人提供深度",
        "竞品调研案例是高裂变价值案例——营销、产品、运营都能复用"
      ]
    }
  },
  {
    id: "F05",
    titleZh: "AI安全与合规",
    titleEn: "AI Safety & Compliance",
    descriptionZh: "了解AI使用的数据安全规范、隐私保护要求、版权合规、品牌风险防范、公司AI使用政策",
    descriptionEn: "Understand AI data security, privacy protection, copyright compliance, brand risk prevention, and company AI usage policies",
    layer: "foundation", level: 1, maxLevel: 2, departments: ["all"], pilotProjects: [], progress: 60,
    prerequisites: ["F01"], tools: [], tags: ["必修", "合规"],
    knowledge: {
      caseSubmissionPrompt: "请用以下结构提交你的AI安全合规案例：\n\n【案例编号】自动生成\n【案例标题】一句话描述你的AI合规实践\n【所属部门】你的部门\n【合规场景】数据安全/隐私保护/版权合规/品牌风险/其他\n【风险描述】你发现了什么AI使用风险？\n【处理方式】你是如何规避或解决的？\n【经验教训】其他同事应该注意什么？",
      resources: [
        { title: "CUPSHE AI使用安全政策", type: "doc", url: "#", duration: "20min", source: "CUPSHE合规部" },
        { title: "AI生成内容版权指南", type: "doc", url: "#", duration: "15min", source: "CUPSHE法务" },
        { title: "GDPR and AI: A Guide for DTC Brands", type: "article", url: "https://gdpr.eu/artificial-intelligence/", duration: "25min", source: "GDPR.eu" },
        { title: "US Copyright Office: AI and Copyright", type: "doc", url: "https://www.copyright.gov/ai/", duration: "30min", source: "US Copyright Office" },
      ],
      prompts: [
        {
          title: "AI使用合规自检",
          scenario: "使用AI工具前进行合规检查",
          prompt: "我计划使用{AI工具}来完成{任务描述}。\n\n涉及的数据类型：{数据类型}\n数据来源：{数据来源}\n输出用途：{内部使用/对外发布/商业用途}\n\n请帮我检查以下合规要点：\n1. 数据安全：是否涉及敏感数据（客户PII、财务数据、商业机密）？\n2. 隐私保护：是否涉及个人信息？是否符合GDPR/CCPA？\n3. 版权风险：AI输出是否可能侵权？是否可用于商业用途？\n4. 品牌风险：是否可能产生品牌负面影响或误导性内容？\n5. 合规建议：需要采取哪些风险缓解措施？\n\n请用红/黄/绿三色标注每项风险等级。",
          variables: ["AI工具", "任务描述", "数据类型", "数据来源", "内部使用/对外发布/商业用途"],
          expectedOutput: "合规风险评估报告，含红黄绿标注和缓解建议"
        },
        {
          title: "数据脱敏处理",
          scenario: "需要将含敏感信息的数据输入AI工具前进行脱敏",
          prompt: "请帮我对以下数据进行脱敏处理，确保可以安全输入AI工具：\n\n原始数据：\n{数据内容}\n\n脱敏规则：\n1. 姓名 → 用\"用户A/B/C\"替代\n2. 邮箱 → 用\"user@example.com\"替代\n3. 手机号 → 用\"1XX-XXXX-XXXX\"替代\n4. 地址 → 只保留城市级别\n5. 订单号 → 用\"ORD-XXXX\"替代\n6. 金额 → 保留数量级但模糊具体数字\n\n请输出脱敏后的数据，并标注哪些字段被脱敏了。",
          variables: ["数据内容"],
          expectedOutput: "脱敏后的安全数据，含脱敏字段标注"
        }
      ],
      workflows: [
        {
          title: "AI使用合规检查流程",
          scenario: "使用AI处理敏感数据或对外内容前，AI科代表确保团队遵循",
          steps: [
            { step: 1, action: "确认数据分类：公开/内部/机密/绝密", output: "数据分类结果", tips: "有疑问默认按更高级别处理" },
            { step: 2, action: "检查AI工具的数据处理政策（是否用于训练）", output: "工具合规评估", tips: "ChatGPT Team/Enterprise版不用于训练" },
            { step: 3, action: "脱敏处理：移除个人信息和商业机密", output: "脱敏后数据" },
            { step: 4, action: "使用AI工具完成任务", tool: "ChatGPT/Claude", output: "AI输出" },
            { step: 5, action: "审核输出：检查版权风险、品牌风险、事实准确性", output: "审核通过的内容" },
            { step: 6, action: "如发现合规风险案例，整理上传平台作为警示案例", output: "合规案例（可选）" },
          ],
          estimatedTime: "视任务而定（额外10-15分钟合规检查）"
        }
      ],
      tasks: [
        {
          title: "AI合规知识测验与案例提交",
          description: "完成CUPSHE AI使用安全政策学习，通过测验，并提交一个合规实践案例",
          difficulty: "beginner",
          acceptanceCriteria: [
            "阅读完CUPSHE AI使用安全政策全文",
            "通过在线测验（≥80分）",
            "能正确判断3个AI使用场景的合规性",
            "提交一个AI合规实践案例到平台（正面或警示案例均可）",
            "在双周分享会上分享合规注意事项"
          ],
          estimatedTime: "1小时学习 + 30分钟案例整理",
          deliverable: "测验通过证书 + 合规案例"
        }
      ],
      cases: [
        { caseId: "CASE-AU-001", title: "审计部AI数据脱敏标准建立", department: "审计监察部", type: "internal", summary: "审计部AI科代表发现多个部门在使用ChatGPT时直接输入含客户邮箱和订单号的数据，随即制定了《CUPSHE AI数据脱敏标准》，建立了脱敏Prompt模板和检查清单", impact: "全公司AI数据泄露风险降低90%，脱敏标准被所有部门采用", url: "#" },
        { caseId: "CASE-IND-005", title: "Samsung AI数据泄露事件教训", department: "行业案例", type: "industry", summary: "2023年Samsung员工将公司机密代码输入ChatGPT导致数据泄露，Samsung随后全面禁止使用公共AI工具，后转为部署私有化AI方案。此事件成为全球企业AI合规的标志性案例", impact: "全球500+企业因此建立了AI使用安全政策", url: "https://www.bbc.com/news/technology-65040259" },
        { caseId: "CASE-GEN-005", title: "Gartner AI治理框架", department: "通用案例", type: "general", summary: "Gartner提出企业AI治理四层框架：数据分级→工具评估→使用规范→审计监控。建议企业建立\"AI使用红绿灯\"制度：绿色（可自由使用）、黄色（需脱敏）、红色（禁止使用AI）", impact: "采用该框架的企业AI合规事故率降低75%", url: "https://www.gartner.com/en/topics/ai-governance" },
      ],
      keyTakeaways: [
        "绝不将客户个人信息、财务数据、商业机密输入公共AI工具",
        "AI生成的图片/文案用于商业用途前需确认版权，特别是商品图和广告素材",
        "对外发布的AI生成内容必须经过人工审核，确保事实准确和品牌调性",
        "合规警示案例也是高价值案例——上传平台通晒可以帮助全公司避坑",
        "遵循公司AI使用政策，有疑问先咨询AI BP或审计部"
      ]
    }
  },
  {
    id: "F06",
    titleZh: "AI协作与知识共享",
    titleEn: "AI Collaboration & Knowledge Sharing",
    descriptionZh: "在团队中有效分享AI经验、协同使用AI工具、建立AI工作流、参与案例通晒投票与双周学习",
    descriptionEn: "Share AI experiences in teams, collaborate on AI tools, build AI workflows, participate in case showcase voting and bi-weekly learning",
    layer: "foundation", level: 1, maxLevel: 2, departments: ["all"], pilotProjects: [], progress: 55,
    prerequisites: ["F01"], tools: ["飞书", "CUPSHE AI平台"], tags: ["必修", "协作"],
    knowledge: {
      caseSubmissionPrompt: "请用以下结构提交你的AI协作与知识共享案例：\n\n【案例编号】自动生成\n【案例标题】一句话描述你的AI协作实践\n【所属部门】你的部门\n【协作场景】团队AI工作流/跨部门案例复用/知识库建设/双周分享/其他\n【具体做法】你是如何推动团队AI协作的？\n【参与人数】有多少人参与了这次协作？\n【效果】团队AI能力有什么提升？\n【裂变记录】是否引用了其他案例？编号是什么？",
      resources: [
        { title: "AI经验分享最佳实践", type: "doc", url: "#", duration: "15min", source: "CUPSHE AI知识库" },
        { title: "如何写好一个AI案例分享", type: "template", url: "#", duration: "10min", source: "CUPSHE内训" },
        { title: "CUPSHE案例通晒与投票指南", type: "doc", url: "#", duration: "10min", source: "CUPSHE PMO" },
        { title: "Building a Culture of AI Sharing", type: "article", url: "https://hbr.org/2024/01/how-to-build-an-ai-culture", duration: "20min", source: "Harvard Business Review" },
      ],
      prompts: [
        {
          title: "AI案例通晒模板",
          scenario: "准备案例通晒内容，供全公司投票评价",
          prompt: "请帮我将以下AI实践经验整理为一个结构化的案例通晒文档：\n\n场景：{使用场景}\n使用的AI工具：{工具}\n具体做法：{做法描述}\n效果数据：{效果数据}\n\n请按以下结构输出（适合平台通晒和投票）：\n1. 🎯 背景与痛点（为什么要用AI，痛点有多痛）\n2. 💡 解决方案（怎么用的AI，关键步骤）\n3. 📝 核心Prompt/工作流（可直接复用的部分，请完整粘贴）\n4. 📊 效果对比（数据说话：AI前 vs AI后）\n5. ⚠️ 经验教训（踩过的坑和避坑建议）\n6. 🔄 裂变建议（其他部门如何复用？需要改什么？）\n7. 📎 相关资源（参考链接、工具链接等）",
          variables: ["使用场景", "工具", "做法描述", "效果数据"],
          expectedOutput: "结构化的AI案例通晒文档，适合平台展示和投票"
        },
        {
          title: "案例裂变复用报告",
          scenario: "引用其他部门案例进行复用后，提交裂变报告",
          prompt: "我参考了案例{原始案例编号}（{原始案例标题}），在{我的部门}进行了复用实践：\n\n原始案例核心方法：{原始方法}\n我的业务场景：{我的场景}\n我的调整和改进：{调整内容}\n复用效果：{效果数据}\n\n请帮我整理为裂变案例报告：\n1. 原始案例引用（编号+标题+核心方法）\n2. 我的复用场景和调整\n3. 效果对比（原始案例效果 vs 我的效果）\n4. 进一步优化建议\n5. 可继续裂变的方向（还有哪些部门/场景可以复用）",
          variables: ["原始案例编号", "原始案例标题", "原始方法", "我的部门", "我的场景", "调整内容", "效果数据"],
          expectedOutput: "裂变案例报告，含原始引用、复用效果和继续裂变建议"
        }
      ],
      workflows: [
        {
          title: "双周案例通晒与分享流程",
          scenario: "每双周一次的AI案例通晒投票和分享会",
          steps: [
            { step: 1, action: "回顾过去两周的AI使用经历，选择最有价值的1-2个案例", output: "案例选题", tips: "优先选择有量化数据的案例" },
            { step: 2, action: "用案例通晒Prompt模板整理案例内容", tool: "ChatGPT", output: "案例文档" },
            { step: 3, action: "上传到平台进行通晒，接受全公司投票", output: "平台通晒" },
            { step: 4, action: "投票期结束后，票数Top 3在双周分享会上做详细分享", output: "分享PPT" },
            { step: 5, action: "分享会后收集反馈，将案例沉淀到知识库", output: "知识库更新" },
            { step: 6, action: "鼓励其他部门裂变复用，跟踪裂变效果", output: "裂变追踪" },
          ],
          estimatedTime: "案例整理1-2小时 + 分享15分钟"
        }
      ],
      tasks: [
        {
          title: "我的第一次案例通晒",
          description: "在平台上完成一次AI实践案例通晒，接受全公司投票，并在双周分享会上分享",
          difficulty: "beginner",
          acceptanceCriteria: [
            "选择一个真实的AI应用场景，有可量化的效果数据",
            "使用案例通晒Prompt模板整理案例",
            "上传到平台通晒，获得至少10票投票",
            "提供可复用的Prompt或工作流",
            "在双周分享会上分享（如获得Top 3票数）"
          ],
          estimatedTime: "准备2小时 + 分享15分钟",
          deliverable: "案例通晒文档 + 平台投票记录"
        },
        {
          title: "案例裂变复用实践",
          description: "从平台上选择其他部门的优秀案例，进行裂变复用并提交裂变报告",
          difficulty: "intermediate",
          acceptanceCriteria: [
            "浏览平台案例库，选择1个高票案例进行复用",
            "记录原始案例编号，结合自己部门业务调整",
            "产出裂变案例并上传平台，标注\"裂变自CASE-XX-XXX\"",
            "裂变案例获得至少5票投票",
            "原始案例的价值评估因裂变而提升"
          ],
          estimatedTime: "1-2天",
          deliverable: "裂变案例报告 + 平台通晒"
        }
      ],
      cases: [
        { caseId: "CASE-CR-001", title: "创意中心AI Prompt共享库建设", department: "创意中心", type: "internal", summary: "创意中心AI科代表建立了团队AI Prompt共享库（含50+个商品图、Banner、视频脚本Prompt模板），新人上手时间从2周缩短到3天。该Prompt库被营销中心裂变复用，产生了CASE-MK-012", impact: "团队AI工具使用一致性提升，新人上手时间缩短60%，被3个部门裂变复用", url: "#" },
        { caseId: "CASE-IND-006", title: "Anker内部AI案例通晒机制", department: "行业案例", type: "industry", summary: "Anker建立了月度AI案例通晒机制：每月各部门提交AI实践案例，全公司投票评选Top 10，获奖案例在月度全员会上分享并获得奖金激励。案例库累计500+个，跨部门复用率达40%", impact: "AI案例产出量提升300%，跨部门知识流动效率提升5倍", url: "https://www.anker.com/" },
        { caseId: "CASE-GEN-006", title: "Google 20% Time与知识共享文化", department: "通用案例", type: "general", summary: "Google著名的20% Time政策鼓励员工将20%时间用于创新项目，并通过内部平台分享成果。Gmail、Google News等产品都源于此。这种\"实践→分享→裂变\"的文化是组织创新的核心驱动力", impact: "Google 50%以上的新产品创意来自20% Time项目", url: "https://abc.xyz/" },
      ],
      keyTakeaways: [
        "分享是最好的学习方式，教别人的过程中自己理解更深",
        "案例通晒+投票是激发全公司AI学习热情的最有效机制",
        "案例裂变是最高效的组织学习——引用编号复用，效果倍增",
        "好的案例通晒要有数据、有Prompt、有可复用的工作流、有裂变建议",
        "完整闭环：学习→实践→案例(Prompt+上传)→通晒投票→裂变复用→价值评估→双周分享"
      ]
    }
  },
  // ========== MARKETING CENTER (营销中心) ==========
  {
    id: "MK01",
    titleZh: "AI广告投放优化",
    titleEn: "AI Ad Campaign Optimization",
    descriptionZh: "利用AI优化Facebook/Google/TikTok广告投放：智能出价、受众定向、素材A/B测试、ROAS预测、预算分配",
    descriptionEn: "AI-powered ad optimization: smart bidding, audience targeting, creative A/B testing, ROAS prediction, budget allocation",
    layer: "department", level: 2, maxLevel: 5, departments: ["marketing"], pilotProjects: ["marketing-ai"], progress: 70,
    prerequisites: ["F02", "F04"], tools: ["Meta Ads Manager", "Google Ads", "TikTok Ads", "ChatGPT", "Claude"], tags: ["营销", "广告", "试点"],
    knowledge: {
      caseSubmissionPrompt: "请用以下结构提交你的AI广告投放优化案例：\n\n【案例编号】自动生成\n【案例标题】一句话描述你的AI广告优化突破\n【投放平台】Facebook/Google/TikTok/其他\n【优化维度】出价/受众/素材/预算/其他\n【AI前ROAS】优化前的ROAS数据\n【AI后ROAS】使用AI后的ROAS数据\n【核心方法】你是如何用AI优化的（含Prompt/工具/流程）\n【数据佐证】请提供关键指标对比（CPC/CTR/CVR/ROAS）\n【可复用性】该方法是否可供其他品类/渠道复用？",
      resources: [
        { title: "CUPSHE广告投放AI化实战手册", type: "doc", url: "#", duration: "45min", source: "CUPSHE营销中心" },
        { title: "Meta Advantage+ AI投放指南", type: "tutorial", url: "https://www.facebook.com/business/help/advantage-plus", duration: "30min", source: "Meta" },
        { title: "Google Performance Max最佳实践", type: "tutorial", url: "https://support.google.com/google-ads/answer/10724817", duration: "30min", source: "Google" },
        { title: "TikTok Smart Performance Campaign", type: "tutorial", url: "https://ads.tiktok.com/help/article/smart-performance-campaign", duration: "20min", source: "TikTok" },
      ],
      prompts: [
        {
          title: "广告受众分析与定向建议",
          scenario: "新品上线或季节性推广需要精准受众定向",
          prompt: "我是CUPSHE营销团队，正在为{产品类型}（价格区间{价格}）策划{平台}广告投放。\n\n目标市场：美国\n推广目的：{目的}\n历史数据：\n- 过去30天最佳受众特征：{历史受众}\n- 过去30天CTR：{CTR}%，CVR：{CVR}%，ROAS：{ROAS}\n\n请帮我：\n1. 分析当前受众定向的优化空间\n2. 推荐3组新的受众定向方案（含兴趣标签、行为特征、人口统计）\n3. 每组方案的预估效果和适用场景\n4. Lookalike受众建议（种子人群选择策略）\n5. 排除受众建议（减少无效花费）\n6. 预算分配建议（各受众组的预算比例）\n\n请用表格对比呈现。",
          variables: ["产品类型", "价格", "平台", "目的", "历史受众", "CTR", "CVR", "ROAS"],
          expectedOutput: "3组受众定向方案对比表，含预估效果和预算分配建议"
        },
        {
          title: "广告文案批量生成与A/B测试",
          scenario: "需要快速生成多版广告文案进行A/B测试",
          prompt: "请为CUPSHE {产品名称}生成{数量}组{平台}广告文案：\n\n产品信息：\n- 品类：{品类}\n- 核心卖点：{卖点}\n- 价格：${价格}\n- 目标受众：{受众}\n- 推广节点：{节点}\n\n文案要求：\n- 主标题（不超过{标题字数}字符）\n- 副标题（不超过{副标题字数}字符）\n- 正文（不超过{正文字数}字符）\n- CTA按钮文案\n\n风格变体要求：\n- 2组情感驱动型（强调生活方式/感受）\n- 2组利益驱动型（强调价格/折扣/价值）\n- 2组社交证明型（强调评价/销量/明星同款）\n\n请标注每组文案的预期CTR排名和适用受众。",
          variables: ["产品名称", "数量", "平台", "品类", "卖点", "价格", "受众", "节点", "标题字数", "副标题字数", "正文字数"],
          expectedOutput: "6组风格各异的广告文案，含CTR预期排名"
        },
        {
          title: "广告数据诊断与优化建议",
          scenario: "广告效果下降需要诊断原因并优化",
          prompt: "请帮我诊断以下CUPSHE {平台}广告的效果问题：\n\n广告系列：{广告系列名}\n投放时间：{时间段}\n日预算：${预算}\n\n关键指标变化（本周 vs 上周）：\n- 展示量：{展示量变化}\n- CTR：{CTR变化}\n- CPC：{CPC变化}\n- CVR：{CVR变化}\n- ROAS：{ROAS变化}\n- 频次：{频次}\n\n请分析：\n1. 效果下降的可能原因（按可能性排序）\n2. 每个原因的诊断依据\n3. 对应的优化方案（立即执行 vs 测试验证）\n4. 预期恢复时间和效果\n5. 是否需要调整预算分配\n\n请用\"问题→原因→方案→预期效果\"的结构输出。",
          variables: ["平台", "广告系列名", "时间段", "预算", "展示量变化", "CTR变化", "CPC变化", "CVR变化", "ROAS变化", "频次"],
          expectedOutput: "广告效果诊断报告，含原因分析和优化方案"
        }
      ],
      workflows: [
        {
          title: "AI驱动广告周优化流程",
          scenario: "每周一次的广告效果复盘和优化，AI科代表带领团队执行",
          steps: [
            { step: 1, action: "导出过去7天各广告系列的核心指标数据", tool: "Meta/Google/TikTok Ads Manager", output: "原始数据表" },
            { step: 2, action: "用ChatGPT分析数据趋势，诊断效果异常", tool: "ChatGPT", output: "诊断报告", tips: "数据脱敏后输入" },
            { step: 3, action: "生成优化建议：受众调整、素材更新、出价策略", tool: "ChatGPT", output: "优化方案" },
            { step: 4, action: "用AI批量生成新广告文案/素材描述", tool: "ChatGPT/Claude", output: "新素材文案" },
            { step: 5, action: "执行优化并设置A/B测试", tool: "Ads Manager", output: "测试上线" },
            { step: 6, action: "记录优化效果，如有显著提升则整理为案例上传平台通晒", output: "案例提交" },
          ],
          estimatedTime: "2-3小时"
        }
      ],
      tasks: [
        {
          title: "AI广告优化实战",
          description: "选择一个在投广告系列，用AI进行完整的诊断→优化→验证循环，产出案例",
          difficulty: "intermediate",
          acceptanceCriteria: [
            "选择一个ROAS低于目标的广告系列",
            "用AI完成数据诊断和优化方案制定",
            "执行优化并跟踪至少1周效果",
            "ROAS提升≥15%或CPC降低≥10%",
            "整理为案例上传平台通晒，含完整数据对比"
          ],
          estimatedTime: "1-2周（含跟踪期）",
          deliverable: "《AI广告优化案例》含数据对比 + 平台通晒"
        }
      ],
      cases: [
        { caseId: "CASE-MK-002", title: "Facebook泳装广告ROAS提升35%", department: "营销中心", type: "internal", summary: "营销中心AI科代表用ChatGPT分析30天广告数据，发现受众重叠导致频次过高，AI推荐了3组新受众定向方案并批量生成12组文案进行A/B测试，最终ROAS从2.8提升到3.8", impact: "ROAS提升35%，月度广告ROI增加$15万，方法被多渠道事业部裂变复用", url: "#" },
        { caseId: "CASE-IND-007", title: "SHEIN AI广告投放自动化体系", department: "行业案例", type: "industry", summary: "SHEIN建立了AI驱动的广告投放自动化体系：AI自动生成广告素材→自动选择受众→自动出价→自动优化，覆盖Facebook/Google/TikTok三大平台，日均投放1000+广告组", impact: "广告团队人效提升5倍，整体ROAS提升20%", url: "https://www.businessofapps.com/data/shein-statistics/" },
        { caseId: "CASE-GEN-007", title: "Meta Advantage+ Shopping Campaign最佳实践", department: "通用案例", type: "general", summary: "Meta官方推荐的Advantage+ Shopping Campaign利用AI自动优化受众、版位和创意，DTC品牌平均ROAS提升15-25%。关键是提供足够多的素材变体（建议≥10个）让AI学习", impact: "全球DTC品牌采用后平均ROAS提升20%", url: "https://www.facebook.com/business/help/advantage-plus" },
      ],
      keyTakeaways: [
        "AI广告优化的核心是\"数据驱动决策\"——用AI分析数据、诊断问题、生成方案",
        "批量生成文案+A/B测试是AI在广告领域最直接的价值——速度×数量×迭代",
        "受众定向优化要结合AI建议和人类经验，AI擅长发现数据模式，人擅长理解用户心理",
        "优化案例是高裂变价值案例——同样的方法可以复用到不同平台、不同品类",
        "完整闭环：数据导出→AI诊断→优化执行→效果验证→案例通晒→裂变复用→双周分享"
      ]
    }
  },
  {
    id: "MK02",
    titleZh: "AI用户增长与留存",
    titleEn: "AI User Growth & Retention",
    descriptionZh: "利用AI优化用户获取、激活、留存全链路：用户分群、个性化推荐、邮件营销自动化、流失预警",
    descriptionEn: "AI-powered growth: user segmentation, personalized recommendations, email automation, churn prediction",
    layer: "department", level: 2, maxLevel: 5, departments: ["marketing", "operations"], pilotProjects: ["marketing-ai", "data-ai"], progress: 55,
    prerequisites: ["F02", "MK01"], tools: ["Klaviyo", "ChatGPT", "Claude"], tags: ["营销", "增长"],
    knowledge: {
      caseSubmissionPrompt: "请用以下结构提交你的AI用户增长案例：\n\n【案例编号】自动生成\n【案例标题】一句话描述你的AI增长突破\n【增长环节】获取/激活/留存/变现/推荐\n【AI前指标】优化前的关键指标\n【AI后指标】使用AI后的关键指标\n【核心方法】你是如何用AI优化的\n【数据佐证】关键指标对比\n【可复用性】该方法是否可供其他渠道/市场复用？",
      resources: [
        { title: "CUPSHE用户增长AI化方案", type: "doc", url: "#", duration: "40min", source: "CUPSHE营销中心" },
        { title: "Klaviyo AI Features Guide", type: "tutorial", url: "https://www.klaviyo.com/features/ai", duration: "30min", source: "Klaviyo" },
        { title: "AI-Powered Email Marketing Playbook", type: "article", url: "https://www.klaviyo.com/blog/ai-email-marketing", duration: "25min", source: "Klaviyo" },
        { title: "Reforge: AI Growth Loops", type: "course", url: "https://www.reforge.com/", duration: "2h", source: "Reforge" },
      ],
      prompts: [
        {
          title: "用户分群策略生成",
          scenario: "需要对用户进行精细化分群以实施差异化运营",
          prompt: "请帮我为CUPSHE设计用户分群策略：\n\n用户数据维度：\n- 购买行为：{购买频次/客单价/品类偏好}\n- 浏览行为：{浏览频次/停留时长/收藏行为}\n- 生命周期：{注册时间/首购时间/最近购买时间}\n- 渠道来源：{获客渠道}\n\n请设计：\n1. 基于RFM模型的用户分群（至少6个群组）\n2. 每个群组的特征描述和规模预估\n3. 每个群组的差异化运营策略\n4. 每个群组的关键KPI和目标值\n5. 个性化推荐策略（推什么品类/价格段/促销方式）\n6. 邮件营销策略（频次/内容/主题行）\n\n请用表格对比呈现。",
          variables: ["购买频次/客单价/品类偏好", "浏览频次/停留时长/收藏行为", "注册时间/首购时间/最近购买时间", "获客渠道"],
          expectedOutput: "6+用户分群方案表格，含差异化运营策略"
        },
        {
          title: "个性化邮件文案批量生成",
          scenario: "需要为不同用户群体生成个性化邮件内容",
          prompt: "请为CUPSHE {用户群体}生成{数量}封个性化营销邮件：\n\n用户群体特征：{特征描述}\n营销目的：{目的}\n推荐商品：{商品信息}\n促销信息：{促销详情}\n\n每封邮件包含：\n- 主题行（3个变体，用于A/B测试）\n- 预览文本\n- 正文（不超过200字，含个性化元素）\n- CTA按钮文案\n- PS补充（紧迫感/社交证明）\n\n风格要求：\n- 符合CUPSHE品牌调性（阳光、自信、包容）\n- 适合美国女性消费者\n- 避免过度促销感\n\n请标注每封邮件的预期打开率排名。",
          variables: ["用户群体", "数量", "特征描述", "目的", "商品信息", "促销详情"],
          expectedOutput: "多封个性化邮件，含主题行变体和预期效果排名"
        }
      ],
      workflows: [
        {
          title: "AI邮件营销优化工作流",
          scenario: "每周邮件营销效果复盘和优化",
          steps: [
            { step: 1, action: "导出Klaviyo邮件营销数据（打开率、点击率、转化率、退订率）", tool: "Klaviyo", output: "邮件数据" },
            { step: 2, action: "用ChatGPT分析各邮件系列的效果，找出最佳/最差表现", tool: "ChatGPT", output: "效果分析" },
            { step: 3, action: "AI生成优化建议：主题行优化、发送时间调整、内容改进", tool: "ChatGPT", output: "优化方案" },
            { step: 4, action: "AI批量生成下周邮件文案变体", tool: "ChatGPT/Claude", output: "邮件文案" },
            { step: 5, action: "设置A/B测试并执行", tool: "Klaviyo", output: "测试上线" },
            { step: 6, action: "效果显著则整理为案例上传平台通晒", output: "案例提交" },
          ],
          estimatedTime: "2小时"
        }
      ],
      tasks: [
        {
          title: "AI邮件营销优化实战",
          description: "用AI优化一个邮件营销系列的全流程，产出效果对比案例",
          difficulty: "intermediate",
          acceptanceCriteria: [
            "选择一个邮件营销系列进行AI优化",
            "用AI生成至少3组主题行和内容变体",
            "执行A/B测试并跟踪至少2周",
            "打开率提升≥10%或点击率提升≥15%",
            "整理为案例上传平台通晒"
          ],
          estimatedTime: "2周",
          deliverable: "《AI邮件营销优化案例》+ 平台通晒"
        }
      ],
      cases: [
        { caseId: "CASE-MK-003", title: "AI个性化邮件提升复购率22%", department: "营销中心", type: "internal", summary: "营销中心用ChatGPT为6个用户分群各生成个性化邮件内容，结合Klaviyo自动化流程，实现千人千面的邮件推送。沉睡用户唤醒邮件的打开率从12%提升到28%", impact: "复购率提升22%，邮件渠道月收入增加$8万", url: "#" },
        { caseId: "CASE-IND-008", title: "Glossier AI驱动的用户增长体系", department: "行业案例", type: "industry", summary: "DTC美妆品牌Glossier利用AI进行用户分群和个性化推荐，将用户生命周期价值(LTV)提升了35%。核心是AI驱动的\"浏览→推荐→邮件→复购\"闭环", impact: "用户LTV提升35%，邮件营销ROI提升50%", url: "https://www.glossier.com/" },
        { caseId: "CASE-GEN-008", title: "Klaviyo AI Segmentation最佳实践", department: "通用案例", type: "general", summary: "Klaviyo官方数据显示，使用AI预测性分析进行用户分群的品牌，邮件营销效果平均提升30-50%。关键功能包括：预测性CLV、流失风险评分、最佳发送时间预测", impact: "AI分群品牌的邮件收入平均提升40%", url: "https://www.klaviyo.com/features/ai" },
      ],
      keyTakeaways: [
        "用户增长的核心是\"对的人+对的内容+对的时间\"，AI在三个维度都能优化",
        "RFM分群+AI个性化内容是邮件营销提效的最佳组合",
        "A/B测试是验证AI优化效果的唯一标准，不能只看AI建议不做测试",
        "增长案例的裂变价值高——同样的分群和个性化方法可以复用到不同渠道",
        "数据驱动：每次优化都要量化效果，用数据说话"
      ]
    }
  },
  {
    id: "MK03",
    titleZh: "AI社媒内容运营",
    titleEn: "AI Social Media Content",
    descriptionZh: "利用AI提升社媒内容生产效率：Instagram/TikTok/YouTube内容策划、文案生成、话题追踪、KOL分析",
    descriptionEn: "AI-powered social media: content planning, copywriting, trend tracking, KOL analysis for Instagram/TikTok/YouTube",
    layer: "department", level: 2, maxLevel: 5, departments: ["marketing", "operations"], pilotProjects: ["marketing-ai", "creative-ai"], progress: 60,
    prerequisites: ["F02", "F03"], tools: ["ChatGPT", "Claude", "Canva AI"], tags: ["营销", "社媒"],
    knowledge: {
      caseSubmissionPrompt: "请用以下结构提交你的AI社媒运营案例：\n\n【案例编号】自动生成\n【案例标题】一句话描述你的AI社媒突破\n【平台】Instagram/TikTok/YouTube/其他\n【内容类型】图文/短视频/直播/Story/其他\n【AI前效率】原来产出一条内容需要多长时间\n【AI后效率】使用AI后需要多长时间\n【互动数据】点赞/评论/分享/播放量变化\n【核心方法】你是如何用AI优化社媒内容的\n【可复用性】该方法是否可供其他平台/品类复用？",
      resources: [
        { title: "CUPSHE社媒AI内容策略", type: "doc", url: "#", duration: "30min", source: "CUPSHE营销中心" },
        { title: "TikTok内容AI化实战", type: "video", url: "#", duration: "25min", source: "CUPSHE内训" },
        { title: "Later: AI Social Media Marketing Guide", type: "article", url: "https://later.com/blog/ai-social-media-marketing/", duration: "20min", source: "Later" },
        { title: "Hootsuite: AI Content Creation", type: "tutorial", url: "https://www.hootsuite.com/resources/ai-social-media", duration: "25min", source: "Hootsuite" },
      ],
      prompts: [
        {
          title: "社媒内容日历生成",
          scenario: "需要规划下周/下月的社媒内容日历",
          prompt: "请为CUPSHE {平台}生成{时间段}的内容日历：\n\n品牌定位：美国市场泳装/度假服饰DTC品牌，目标受众18-35岁女性\n当前粉丝量：{粉丝量}\n近期重点：{重点活动/新品/促销}\n内容柱（Content Pillars）：\n1. 产品展示（新品/穿搭/场景）\n2. 用户UGC（真实用户/KOL）\n3. 品牌故事（幕后/可持续/包容性）\n4. 互动内容（投票/问答/挑战）\n5. 促销信息（折扣/限时/会员）\n\n请为每天规划1-2条内容，包含：\n- 日期和发布时间（美东时间）\n- 内容类型（图文/Reels/Story/Carousel）\n- 主题和核心信息\n- 文案（含emoji和hashtag）\n- 视觉方向描述\n- 预期互动目标\n\n请用表格形式输出。",
          variables: ["平台", "时间段", "粉丝量", "重点活动/新品/促销"],
          expectedOutput: "完整的社媒内容日历表格，含文案和视觉方向"
        },
        {
          title: "TikTok短视频脚本生成",
          scenario: "需要快速生成TikTok短视频脚本",
          prompt: "请为CUPSHE生成{数量}个TikTok短视频脚本：\n\n产品/主题：{主题}\n视频时长：{时长}秒\n目标：{目标}\n参考热门趋势：{趋势}\n\n每个脚本包含：\n- 开头钩子（前3秒抓住注意力）\n- 中间内容（展示/故事/教程）\n- 结尾CTA（引导互动/关注/购买）\n- 配乐建议\n- 文字叠加内容\n- 字幕/文案\n- 预期效果评估\n\n风格要求：自然、真实、有趣，避免过度广告感。",
          variables: ["数量", "主题", "时长", "目标", "趋势"],
          expectedOutput: "多个TikTok短视频脚本，含钩子、内容和CTA"
        }
      ],
      workflows: [
        {
          title: "AI社媒内容生产工作流",
          scenario: "日常社媒内容生产，AI科代表带领团队执行",
          steps: [
            { step: 1, action: "用AI分析近期热门趋势和竞品内容表现", tool: "ChatGPT/Perplexity", output: "趋势洞察" },
            { step: 2, action: "用AI生成内容日历和文案初稿", tool: "ChatGPT", output: "内容日历" },
            { step: 3, action: "用AI生成视觉方向描述，交给设计团队", tool: "ChatGPT", output: "视觉Brief" },
            { step: 4, action: "人工审核和调整，确保品牌调性一致", output: "终稿" },
            { step: 5, action: "发布并跟踪数据，AI分析效果", tool: "ChatGPT", output: "效果分析" },
            { step: 6, action: "高互动内容整理为案例上传平台通晒", output: "案例提交" },
          ],
          estimatedTime: "每日1-2小时"
        }
      ],
      tasks: [
        {
          title: "AI社媒内容周挑战",
          description: "用AI辅助完成一周的社媒内容生产，对比效率和互动数据",
          difficulty: "intermediate",
          acceptanceCriteria: [
            "用AI生成一周的内容日历（≥7条内容）",
            "实际发布并跟踪互动数据",
            "内容产出效率提升≥50%",
            "至少1条内容互动率超过平均水平",
            "整理为案例上传平台通晒"
          ],
          estimatedTime: "1周",
          deliverable: "《AI社媒内容周报》+ 效率对比 + 平台案例"
        }
      ],
      cases: [
        { caseId: "CASE-MK-004", title: "TikTok内容AI化月产出翻3倍", department: "营销中心", type: "internal", summary: "营销中心AI科代表用ChatGPT生成TikTok脚本和文案，将月度内容产出从30条提升到90条，同时互动率保持稳定。AI负责初稿，人工负责创意把关和品牌调性", impact: "内容产出效率提升3倍，月度视频播放量增长45%", url: "#" },
        { caseId: "CASE-IND-009", title: "Fashion Nova AI社媒运营", department: "行业案例", type: "industry", summary: "Fashion Nova利用AI工具进行社媒内容规划和文案生成，在Instagram和TikTok上保持日更3-5条的高频输出，AI负责80%的文案初稿和话题追踪", impact: "社媒粉丝增长率提升60%，内容团队人效提升4倍", url: "https://www.fashionnova.com/" },
        { caseId: "CASE-GEN-009", title: "Hootsuite AI社媒管理报告", department: "通用案例", type: "general", summary: "Hootsuite 2025年报告显示，使用AI辅助社媒内容生产的品牌，内容产出效率平均提升3-5倍，互动率提升15-25%。关键是AI负责量和速度，人负责质和创意", impact: "AI社媒品牌的内容ROI平均提升200%", url: "https://www.hootsuite.com/resources/ai-social-media" },
      ],
      keyTakeaways: [
        "AI社媒运营的核心价值是\"量×速度\"——AI负责批量生成，人负责创意把关",
        "内容日历+批量文案生成是最直接的提效场景",
        "TikTok脚本的\"前3秒钩子\"是AI最擅长的——可以快速生成多个变体测试",
        "社媒案例的裂变价值：同样的内容策略可以复用到不同平台和品类",
        "数据驱动迭代：每条内容都要跟踪互动数据，用AI分析什么有效什么无效"
      ]
    }
  },
  // ========== OPERATIONS CENTER (运营中心) ==========
  {
    id: "OP01",
    titleZh: "AI客户服务优化",
    titleEn: "AI Customer Service Optimization",
    descriptionZh: "利用AI提升客服效率：智能FAQ、邮件自动回复、评论情感分析、工单分类、多语言翻译、客诉预警",
    descriptionEn: "AI-powered customer service: smart FAQ, auto-reply, sentiment analysis, ticket classification, multilingual translation, complaint alerts",
    layer: "department", level: 2, maxLevel: 5, departments: ["operations"], pilotProjects: ["data-ai"], progress: 65,
    prerequisites: ["F02", "F03"], tools: ["ChatGPT", "Claude", "Zendesk"], tags: ["运营", "客服"],
    knowledge: {
      caseSubmissionPrompt: "请用以下结构提交你的AI客服优化案例：\n\n【案例编号】自动生成\n【案例标题】一句话描述你的AI客服突破\n【优化环节】FAQ/邮件回复/评论分析/工单分类/翻译/其他\n【AI前效率】原来处理该环节需要多长时间\n【AI后效率】使用AI后需要多长时间\n【客户满意度变化】CSAT/NPS变化\n【核心Prompt/工具】请粘贴核心Prompt或工具配置\n【可复用性】该方法是否可供其他渠道/市场复用？",
      resources: [
        { title: "CUPSHE客服AI化实战手册", type: "doc", url: "#", duration: "40min", source: "CUPSHE运营中心" },
        { title: "Zendesk AI Agent Guide", type: "tutorial", url: "https://www.zendesk.com/service/ai/", duration: "30min", source: "Zendesk" },
        { title: "AI Customer Service Best Practices", type: "article", url: "https://www.intercom.com/blog/ai-customer-service/", duration: "20min", source: "Intercom" },
      ],
      prompts: [
        {
          title: "客服邮件智能回复",
          scenario: "快速生成专业的客服回复邮件",
          prompt: "请帮我回复以下CUPSHE客户邮件：\n\n客户邮件原文：\n{邮件内容}\n\n客户信息：\n- 订单号：{订单号}\n- 订单状态：{状态}\n- 客户历史：{历史记录}\n\n回复要求：\n1. 语气友好专业，体现CUPSHE品牌温度\n2. 先表达理解和歉意（如适用）\n3. 提供明确的解决方案和时间线\n4. 如需补偿，建议合适的补偿方案\n5. 结尾表达感谢和后续支持\n6. 英文回复，不超过150字\n\n请同时标注：\n- 问题分类（物流/质量/尺码/退换/其他）\n- 紧急程度（高/中/低）\n- 是否需要升级处理",
          variables: ["邮件内容", "订单号", "状态", "历史记录"],
          expectedOutput: "专业的客服回复邮件 + 问题分类和紧急程度标注"
        },
        {
          title: "用户评论批量情感分析",
          scenario: "分析Amazon/独立站用户评论，发现产品问题和改进方向",
          prompt: "请分析以下CUPSHE产品评论（{评论数量}条）：\n\n{评论内容}\n\n请输出：\n1. 情感分布（正面/中性/负面比例）\n2. 正面评论Top 5高频关键词和典型评论\n3. 负面评论Top 5问题分类（尺码/质量/物流/颜色/其他）\n4. 每个问题的严重程度和出现频率\n5. 与竞品评论对比的差异化优势\n6. 产品改进建议（按优先级排序）\n7. 可用于营销的好评金句（适合社媒/广告引用）\n\n请用表格和图表描述呈现。",
          variables: ["评论数量", "评论内容"],
          expectedOutput: "评论情感分析报告，含问题分类和改进建议"
        }
      ],
      workflows: [
        {
          title: "AI客服效率提升工作流",
          scenario: "日常客服工作中融入AI辅助，AI科代表推广到全客服团队",
          steps: [
            { step: 1, action: "将常见问题整理为FAQ知识库，用AI生成标准回复模板", tool: "ChatGPT", output: "FAQ模板库", tips: "覆盖Top 20高频问题" },
            { step: 2, action: "收到客户邮件后，用AI快速生成回复初稿", tool: "ChatGPT", output: "回复初稿" },
            { step: 3, action: "人工审核和个性化调整，确保准确性和温度", output: "终稿回复" },
            { step: 4, action: "每周用AI批量分析客户评论，生成洞察报告", tool: "ChatGPT/Claude", output: "评论分析报告" },
            { step: 5, action: "将高效的回复模板和分析方法整理为案例上传平台", output: "案例通晒" },
          ],
          estimatedTime: "每封邮件节省5-10分钟"
        }
      ],
      tasks: [
        {
          title: "AI客服提效实战",
          description: "用AI辅助处理一周的客服工作，记录效率对比和客户满意度变化",
          difficulty: "intermediate",
          acceptanceCriteria: [
            "用AI辅助处理至少50封客服邮件",
            "建立10+个常见问题的AI回复模板",
            "邮件处理效率提升≥40%",
            "客户满意度（CSAT）不降低",
            "整理为案例上传平台通晒"
          ],
          estimatedTime: "1周",
          deliverable: "《AI客服提效案例》+ 回复模板库 + 平台通晒"
        }
      ],
      cases: [
        { caseId: "CASE-OP-002", title: "客服邮件AI辅助回复效率提升60%", department: "运营中心", type: "internal", summary: "运营中心AI科代表建立了20个高频问题的AI回复模板，客服团队使用ChatGPT生成回复初稿再人工微调，邮件处理时间从平均8分钟降到3分钟", impact: "邮件处理效率提升60%，月均节省200+人时，CSAT保持4.5/5.0", url: "#" },
        { caseId: "CASE-IND-010", title: "Zappos AI客服体系", department: "行业案例", type: "industry", summary: "Zappos将AI与人工客服结合，AI负责初步分类和回复建议，人工负责个性化和情感连接。AI处理了60%的常规咨询，人工专注于复杂和高价值客户", impact: "客服效率提升50%，NPS提升10个点", url: "https://www.zappos.com/" },
        { caseId: "CASE-GEN-010", title: "Zendesk AI客服效率报告", department: "通用案例", type: "general", summary: "Zendesk 2025年报告显示，部署AI客服的企业平均首次响应时间缩短70%，工单解决率提升25%，客户满意度提升15%。关键是AI处理简单问题，人工处理复杂问题", impact: "AI客服企业的客服成本平均降低30%", url: "https://www.zendesk.com/service/ai/" },
      ],
      keyTakeaways: [
        "AI客服的核心是\"AI处理量，人处理质\"——简单问题AI秒回，复杂问题人工深度处理",
        "建立FAQ模板库是第一步，覆盖Top 20高频问题可解决60%的咨询",
        "评论情感分析是产品改进的金矿——AI可以快速处理大量评论发现模式",
        "客服案例的裂变价值：回复模板和分析方法可以跨渠道、跨市场复用",
        "务必保持人工审核环节，AI回复需要确保准确性和品牌温度"
      ]
    }
  },
  {
    id: "OP02",
    titleZh: "AI商品运营分析",
    titleEn: "AI Merchandise Operations",
    descriptionZh: "利用AI优化商品运营：销售数据分析、库存预测、定价策略、促销效果评估、品类规划",
    descriptionEn: "AI-powered merchandising: sales analysis, inventory prediction, pricing strategy, promotion evaluation, category planning",
    layer: "department", level: 2, maxLevel: 5, departments: ["operations", "product"], pilotProjects: ["data-ai"], progress: 50,
    prerequisites: ["F02", "F04"], tools: ["ChatGPT", "Claude", "Excel/Sheets"], tags: ["运营", "数据"],
    knowledge: {
      caseSubmissionPrompt: "请用以下结构提交你的AI商品运营案例：\n\n【案例编号】自动生成\n【案例标题】一句话描述你的AI商品运营突破\n【运营环节】销售分析/库存/定价/促销/品类规划/其他\n【AI前决策方式】原来如何做这个决策\n【AI后决策方式】使用AI后如何做决策\n【效果数据】关键指标变化\n【核心方法】你是如何用AI优化的\n【可复用性】该方法是否可供其他品类/渠道复用？",
      resources: [
        { title: "CUPSHE商品运营AI化方案", type: "doc", url: "#", duration: "40min", source: "CUPSHE运营中心" },
        { title: "AI驱动的电商数据分析", type: "course", url: "#", duration: "2h", source: "CUPSHE内训" },
        { title: "McKinsey: AI in Retail Operations", type: "article", url: "https://www.mckinsey.com/industries/retail/our-insights", duration: "25min", source: "McKinsey" },
      ],
      prompts: [
        {
          title: "销售数据周度分析",
          scenario: "每周分析销售数据，发现趋势和异常",
          prompt: "请分析CUPSHE以下销售数据（本周 vs 上周 vs 去年同期）：\n\n{数据表格}\n\n请输出：\n1. 关键指标概览（GMV/订单量/客单价/转化率）同比环比变化\n2. Top 10畅销款和Top 10滞销款分析\n3. 品类结构变化（泳装/度假装/配饰占比变化）\n4. 渠道结构变化（独立站/Amazon/其他占比变化）\n5. 异常波动分析（偏离均值>20%的指标）\n6. 下周预测和建议行动（至少5条）\n\n请用表格和要点形式呈现，关键数字加粗标注趋势箭头。",
          variables: ["数据表格"],
          expectedOutput: "结构化销售周报，含趋势分析和行动建议"
        },
        {
          title: "促销效果评估与优化",
          scenario: "促销活动结束后评估效果并优化下次策略",
          prompt: "请评估CUPSHE {促销活动名称}的效果：\n\n活动信息：\n- 时间：{时间}\n- 折扣力度：{折扣}\n- 覆盖品类：{品类}\n- 推广渠道：{渠道}\n\n效果数据：\n- GMV：{GMV}\n- 订单量：{订单量}\n- 客单价：{客单价}\n- 新客占比：{新客占比}\n- 毛利率：{毛利率}\n- 库存消化率：{库存消化率}\n\n请分析：\n1. 活动ROI和盈亏分析\n2. 各品类/渠道的表现差异\n3. 与历史同类活动的对比\n4. 成功因素和不足之处\n5. 下次活动的优化建议（折扣策略/品类选择/渠道分配）\n\n请用数据说话，给出具体可执行的建议。",
          variables: ["促销活动名称", "时间", "折扣", "品类", "渠道", "GMV", "订单量", "客单价", "新客占比", "毛利率", "库存消化率"],
          expectedOutput: "促销效果评估报告，含ROI分析和优化建议"
        }
      ],
      workflows: [
        {
          title: "AI商品运营周报工作流",
          scenario: "每周一生成商品运营周报",
          steps: [
            { step: 1, action: "导出上周销售数据（按品类/渠道/SKU维度）", output: "原始数据" },
            { step: 2, action: "用ChatGPT分析数据趋势和异常", tool: "ChatGPT", output: "分析报告" },
            { step: 3, action: "AI生成畅销/滞销款分析和库存建议", tool: "ChatGPT", output: "商品建议" },
            { step: 4, action: "AI生成下周运营策略建议", tool: "ChatGPT", output: "策略建议" },
            { step: 5, action: "人工审核并补充行业判断", output: "最终周报" },
            { step: 6, action: "显著发现整理为案例上传平台", output: "案例提交" },
          ],
          estimatedTime: "1-2小时（原来半天）"
        }
      ],
      tasks: [
        {
          title: "AI商品分析实战",
          description: "用AI完成一次完整的商品运营分析，产出数据驱动的决策建议",
          difficulty: "intermediate",
          acceptanceCriteria: [
            "用AI分析至少2周的销售数据",
            "产出含趋势分析和异常发现的报告",
            "提出至少5条可执行的运营建议",
            "至少1条建议被采纳并产生效果",
            "整理为案例上传平台通晒"
          ],
          estimatedTime: "1周",
          deliverable: "《AI商品运营分析报告》+ 平台案例"
        }
      ],
      cases: [
        { caseId: "CASE-OP-003", title: "AI驱动滞销款清仓效率提升", department: "运营中心", type: "internal", summary: "运营中心用ChatGPT分析3个月销售数据，识别出50个滞销SKU并AI生成差异化清仓策略（不同SKU不同折扣力度和渠道），清仓周期从6周缩短到3周", impact: "滞销款清仓效率提升50%，库存周转率提升20%", url: "#" },
        { caseId: "CASE-IND-011", title: "SHEIN AI商品运营体系", department: "行业案例", type: "industry", summary: "SHEIN利用AI进行实时销售数据分析和需求预测，实现\"小单快反\"模式：AI预测爆款→小批量生产→数据验证→快速补货，将新品测试周期缩短到7天", impact: "库存周转率行业领先，滞销率<5%", url: "https://www.businessofapps.com/data/shein-statistics/" },
        { caseId: "CASE-GEN-011", title: "McKinsey AI零售运营报告", department: "通用案例", type: "general", summary: "McKinsey报告指出AI在零售运营中的三大价值场景：需求预测（准确率提升30-50%）、动态定价（利润提升5-15%）、库存优化（库存成本降低20-30%）", impact: "AI零售运营企业的整体利润率提升10-15%", url: "https://www.mckinsey.com/industries/retail/our-insights" },
      ],
      keyTakeaways: [
        "AI商品运营的核心是\"数据→洞察→决策→验证\"的闭环",
        "销售数据分析和异常发现是AI最直接的价值——速度快、覆盖全、不遗漏",
        "促销效果评估要做ROI分析，不能只看GMV不看利润",
        "商品运营案例的裂变价值高——分析方法可以复用到不同品类和渠道",
        "AI提供数据洞察，人提供行业判断和商业直觉，两者结合才是最优决策"
      ]
    }
  },
  // ========== MULTI-CHANNEL (多渠道事业部) ==========
  {
    id: "MC01",
    titleZh: "AI多渠道Listing优化",
    titleEn: "AI Multi-Channel Listing Optimization",
    descriptionZh: "利用AI优化Amazon/Walmart/独立站等多渠道商品Listing：标题、描述、关键词、A+内容、SEO",
    descriptionEn: "AI-powered listing optimization across Amazon/Walmart/DTC: titles, descriptions, keywords, A+ content, SEO",
    layer: "department", level: 2, maxLevel: 5, departments: ["multi-channel", "operations"], pilotProjects: ["marketing-ai"], progress: 58,
    prerequisites: ["F02"], tools: ["ChatGPT", "Claude", "Helium 10"], tags: ["多渠道", "Listing"],
    knowledge: {
      caseSubmissionPrompt: "请用以下结构提交你的AI Listing优化案例：\n\n【案例编号】自动生成\n【案例标题】一句话描述你的AI Listing突破\n【渠道】Amazon/Walmart/独立站/其他\n【优化维度】标题/描述/关键词/A+/图片/其他\n【AI前数据】优化前的搜索排名/转化率/流量\n【AI后数据】优化后的搜索排名/转化率/流量\n【核心Prompt】请粘贴你使用的核心Prompt\n【可复用性】该方法是否可供其他品类/渠道复用？",
      resources: [
        { title: "CUPSHE多渠道Listing AI优化指南", type: "doc", url: "#", duration: "40min", source: "CUPSHE多渠道事业部" },
        { title: "Amazon Listing Optimization with AI", type: "tutorial", url: "https://sell.amazon.com/", duration: "30min", source: "Amazon Seller Central" },
        { title: "Helium 10 AI Tools Guide", type: "tutorial", url: "https://www.helium10.com/", duration: "25min", source: "Helium 10" },
      ],
      prompts: [
        {
          title: "Amazon Listing全面优化",
          scenario: "新品上架或现有Listing优化",
          prompt: "请帮我优化CUPSHE {产品名称}的Amazon Listing：\n\n产品信息：\n- ASIN：{ASIN}\n- 品类：{品类}\n- 核心卖点：{卖点}\n- 目标关键词：{关键词}\n- 价格：${价格}\n- 竞品参考：{竞品ASIN}\n\n请生成：\n1. 标题（不超过200字符，含品牌名+核心关键词+卖点）\n2. 5个Bullet Points（每个不超过500字符，突出差异化卖点）\n3. 产品描述（不超过2000字符，含品牌故事和使用场景）\n4. 后端搜索关键词（250字符以内，不重复标题中的词）\n5. A+内容大纲（5个模块的标题和内容建议）\n\n要求：\n- 自然融入关键词，避免堆砌\n- 突出CUPSHE品牌差异化（包容性、可持续、高性价比）\n- 符合Amazon Listing规范\n- 适合美国女性消费者的语言风格",
          variables: ["产品名称", "ASIN", "品类", "卖点", "关键词", "价格", "竞品ASIN"],
          expectedOutput: "完整的Amazon Listing优化方案（标题+Bullets+描述+关键词+A+大纲）"
        }
      ],
      workflows: [
        {
          title: "AI Listing批量优化工作流",
          scenario: "季度Listing优化或新品批量上架",
          steps: [
            { step: 1, action: "导出需优化的Listing清单和当前数据", output: "Listing清单" },
            { step: 2, action: "用Helium 10分析关键词和竞品Listing", tool: "Helium 10", output: "关键词报告" },
            { step: 3, action: "用ChatGPT批量生成优化后的Listing内容", tool: "ChatGPT", output: "优化内容" },
            { step: 4, action: "人工审核，确保品牌调性和合规性", output: "终稿" },
            { step: 5, action: "上线并跟踪搜索排名和转化率变化", output: "效果数据" },
            { step: 6, action: "效果显著的整理为案例上传平台通晒", output: "案例提交" },
          ],
          estimatedTime: "每个Listing 30分钟（原来2小时）"
        }
      ],
      tasks: [
        {
          title: "AI Listing优化实战",
          description: "用AI优化5个Listing，跟踪2周效果，产出对比案例",
          difficulty: "intermediate",
          acceptanceCriteria: [
            "用AI优化至少5个Listing（标题+Bullets+描述+关键词）",
            "跟踪2周搜索排名和转化率变化",
            "至少3个Listing的搜索排名或转化率有提升",
            "整理为案例上传平台通晒",
            "总结可复用的Listing优化Prompt模板"
          ],
          estimatedTime: "2周",
          deliverable: "《AI Listing优化案例》+ Prompt模板 + 平台通晒"
        }
      ],
      cases: [
        { caseId: "CASE-MC-001", title: "Amazon Listing AI优化转化率提升18%", department: "多渠道事业部", type: "internal", summary: "多渠道事业部AI科代表用ChatGPT批量优化了30个核心SKU的Amazon Listing，重点优化标题关键词布局和Bullet Points的卖点表达，平均转化率从8.5%提升到10%", impact: "转化率提升18%，月度Amazon收入增加$12万", url: "#" },
        { caseId: "CASE-IND-012", title: "Anker Amazon Listing优化体系", department: "行业案例", type: "industry", summary: "Anker建立了AI驱动的Listing优化体系：AI分析竞品Listing→生成优化方案→A/B测试→数据验证→迭代优化，覆盖5000+个SKU", impact: "整体搜索排名提升30%，转化率提升15%", url: "https://www.anker.com/" },
        { caseId: "CASE-GEN-012", title: "Jungle Scout AI Listing优化报告", department: "通用案例", type: "general", summary: "Jungle Scout数据显示，使用AI优化Listing的卖家，平均搜索排名提升20-40%，转化率提升10-25%。关键是AI生成+人工审核的组合，纯AI生成的Listing效果反而不如人机协作", impact: "AI优化Listing的卖家收入平均增长25%", url: "https://www.junglescout.com/" },
      ],
      keyTakeaways: [
        "Listing优化是AI在电商领域最直接的提效场景——文字密集、规则明确、效果可量化",
        "AI生成Listing的核心是\"关键词+卖点+品牌调性\"的平衡",
        "批量优化是AI的优势——30个Listing用AI只需1天，人工需要1周",
        "Listing优化案例的裂变价值极高——同样的Prompt可以复用到不同品类和渠道",
        "A/B测试是验证AI优化效果的唯一标准，不能只看AI建议不做测试"
      ]
    }
  },
  // ========== CHANNEL DEVELOPMENT (渠道拓展部) ==========
  {
    id: "CD01",
    titleZh: "AI渠道拓展与合作",
    titleEn: "AI Channel Development",
    descriptionZh: "利用AI辅助新渠道开拓：市场调研、合作伙伴筛选、商务邮件、谈判准备、合同审查",
    descriptionEn: "AI-powered channel expansion: market research, partner screening, business emails, negotiation prep, contract review",
    layer: "department", level: 2, maxLevel: 4, departments: ["channel-dev"], pilotProjects: [], progress: 45,
    prerequisites: ["F02", "F04"], tools: ["ChatGPT", "Claude", "Perplexity"], tags: ["渠道", "拓展"],
    knowledge: {
      caseSubmissionPrompt: "请用以下结构提交你的AI渠道拓展案例：\n\n【案例编号】自动生成\n【案例标题】一句话描述你的AI渠道拓展突破\n【拓展环节】市场调研/合作伙伴筛选/商务沟通/谈判/其他\n【AI前效率】原来完成该环节需要多长时间\n【AI后效率】使用AI后需要多长时间\n【核心方法】你是如何用AI辅助渠道拓展的\n【可复用性】该方法是否可供其他市场/渠道复用？",
      resources: [
        { title: "AI辅助渠道拓展实战", type: "doc", url: "#", duration: "30min", source: "CUPSHE渠道拓展部" },
        { title: "AI for Business Development", type: "article", url: "https://hbr.org/topic/business-development", duration: "20min", source: "Harvard Business Review" },
      ],
      prompts: [
        {
          title: "新渠道市场调研",
          scenario: "评估是否进入新的销售渠道",
          prompt: "请帮我调研{渠道名称}作为CUPSHE新销售渠道的可行性：\n\n调研维度：\n1. 渠道概况（用户规模、增长趋势、核心品类）\n2. 目标用户画像（与CUPSHE目标客群的重合度）\n3. 竞品入驻情况（哪些泳装/服饰品牌已入驻，表现如何）\n4. 入驻条件和费用（佣金率、保证金、技术要求）\n5. 运营模式（自营/代运营/混合）\n6. 预估投入产出（首年投入和预期收入）\n7. 风险评估和建议（是否建议入驻，优先级）\n\n请用评分表形式呈现（各维度1-10分），并给出综合建议。",
          variables: ["渠道名称"],
          expectedOutput: "渠道可行性评估报告，含评分表和综合建议"
        },
        {
          title: "商务合作邮件生成",
          scenario: "向潜在合作伙伴发送商务合作邮件",
          prompt: "请帮我写一封商务合作邮件给{合作方名称}（{合作方类型}）：\n\n合作目的：{目的}\nCUPSHE介绍要点：{品牌亮点}\n合作方案：{方案概述}\n期望回复：{期望}\n\n要求：\n- 英文，专业但不生硬\n- 突出双赢价值\n- 不超过200字\n- 包含具体的下一步行动建议\n- 附上CUPSHE品牌数据亮点（GMV/用户量/社媒影响力）",
          variables: ["合作方名称", "合作方类型", "目的", "品牌亮点", "方案概述", "期望"],
          expectedOutput: "专业的商务合作邮件"
        }
      ],
      workflows: [
        {
          title: "AI渠道评估工作流",
          scenario: "评估新渠道是否值得拓展",
          steps: [
            { step: 1, action: "用Perplexity搜索渠道基本信息和行业评价", tool: "Perplexity", output: "基础信息" },
            { step: 2, action: "用ChatGPT生成结构化评估报告", tool: "ChatGPT", output: "评估报告" },
            { step: 3, action: "用AI分析竞品在该渠道的表现", tool: "ChatGPT", output: "竞品分析" },
            { step: 4, action: "AI生成商务合作邮件/提案", tool: "ChatGPT", output: "商务文件" },
            { step: 5, action: "人工审核并补充行业关系和判断", output: "最终方案" },
          ],
          estimatedTime: "1-2天（原来1周）"
        }
      ],
      tasks: [
        {
          title: "AI渠道调研实战",
          description: "用AI完成一个新渠道的完整调研和评估",
          difficulty: "intermediate",
          acceptanceCriteria: [
            "选择一个潜在新渠道进行AI调研",
            "产出完整的渠道可行性评估报告",
            "包含竞品分析和投入产出预估",
            "生成商务合作邮件/提案",
            "整理为案例上传平台通晒"
          ],
          estimatedTime: "3天",
          deliverable: "《AI渠道评估报告》+ 商务提案 + 平台案例"
        }
      ],
      cases: [
        { caseId: "CASE-CD-001", title: "AI辅助TikTok Shop渠道评估", department: "渠道拓展部", type: "internal", summary: "渠道拓展部用AI完成了TikTok Shop渠道的完整评估：市场规模、竞品表现、入驻条件、投入产出预估，2天完成了原来需要1周的调研工作", impact: "渠道评估效率提升70%，决策周期缩短5天", url: "#" },
        { caseId: "CASE-IND-013", title: "Halara AI渠道拓展策略", department: "行业案例", type: "industry", summary: "运动服饰品牌Halara利用AI进行多渠道拓展评估和优先级排序，快速进入了TikTok Shop、Temu等新渠道，AI辅助完成了80%的市场调研和商务文件准备", impact: "渠道拓展速度提升3倍，新渠道首年贡献15%收入", url: "https://www.halara.com/" },
        { caseId: "CASE-GEN-013", title: "eMarketer多渠道电商趋势", department: "通用案例", type: "general", summary: "eMarketer数据显示，2025年美国电商市场中，Amazon占39%，但TikTok Shop、Temu等新渠道增速超过100%。DTC品牌的多渠道策略是增长的关键", impact: "多渠道品牌的收入增速比单渠道品牌高40%", url: "https://www.emarketer.com/" },
      ],
      keyTakeaways: [
        "AI渠道调研的核心价值是\"速度×广度\"——快速覆盖多个渠道的基础信息",
        "渠道评估需要AI数据+人类关系判断的结合",
        "商务邮件和提案是AI的强项——批量生成、个性化定制",
        "渠道调研案例可以跨市场裂变复用",
        "完整闭环：AI调研→评估→商务沟通→入驻→效果验证→案例通晒"
      ]
    }
  },
  // ========== PRODUCT CENTER (产品中心) ==========
  {
    id: "PD01",
    titleZh: "AI趋势洞察与选品",
    titleEn: "AI Trend Insights & Product Selection",
    descriptionZh: "利用AI进行时尚趋势分析、消费者需求洞察、竞品产品分析、数据驱动选品、新品企划",
    descriptionEn: "AI-powered trend analysis, consumer insights, competitor product analysis, data-driven selection, new product planning",
    layer: "department", level: 2, maxLevel: 5, departments: ["product"], pilotProjects: ["data-ai", "creative-ai"], progress: 55,
    prerequisites: ["F02", "F04"], tools: ["ChatGPT", "Claude", "Perplexity", "Google Trends"], tags: ["产品", "趋势"],
    knowledge: {
      caseSubmissionPrompt: "请用以下结构提交你的AI选品/趋势洞察案例：\n\n【案例编号】自动生成\n【案例标题】一句话描述你的AI选品突破\n【产品品类】泳装/度假装/配饰/其他\n【AI辅助环节】趋势分析/竞品分析/消费者洞察/选品决策/其他\n【AI前决策方式】原来如何做选品决策\n【AI后决策方式】使用AI后如何做决策\n【效果数据】选品命中率/新品表现等\n【可复用性】该方法是否可供其他品类复用？",
      resources: [
        { title: "CUPSHE AI选品方法论", type: "doc", url: "#", duration: "40min", source: "CUPSHE产品中心" },
        { title: "Google Trends for Fashion", type: "tutorial", url: "https://trends.google.com/", duration: "20min", source: "Google" },
        { title: "WGSN Trend Forecasting", type: "article", url: "https://www.wgsn.com/", duration: "30min", source: "WGSN" },
      ],
      prompts: [
        {
          title: "季度时尚趋势分析",
          scenario: "季度选品前进行趋势调研",
          prompt: "请分析{季节} {年份}美国泳装/度假服饰市场的时尚趋势：\n\n分析维度：\n1. 色彩趋势（主色调、流行色、CUPSHE应关注的色系）\n2. 款式趋势（剪裁、版型、设计元素）\n3. 面料趋势（材质、功能性、可持续性）\n4. 图案趋势（印花、纯色、拼接）\n5. 消费者偏好变化（尺码包容性、功能性、场景多元化）\n6. 社媒热门元素（TikTok/Instagram上的流行元素）\n7. 竞品新品方向（SHEIN/Zaful/Target泳装线的新品特点）\n8. CUPSHE选品建议（按优先级排序的10个选品方向）\n\n请引用具体来源，标注趋势的确定性（高/中/低）。",
          variables: ["季节", "年份"],
          expectedOutput: "季度时尚趋势分析报告，含选品建议"
        }
      ],
      workflows: [
        {
          title: "AI驱动选品工作流",
          scenario: "季度新品企划时使用",
          steps: [
            { step: 1, action: "用AI分析时尚趋势（色彩/款式/面料/图案）", tool: "ChatGPT/Perplexity", output: "趋势报告" },
            { step: 2, action: "用AI分析竞品新品和畅销款", tool: "ChatGPT", output: "竞品分析" },
            { step: 3, action: "用AI分析用户评论中的需求和痛点", tool: "ChatGPT/Claude", output: "用户洞察" },
            { step: 4, action: "用AI生成选品方向建议和优先级排序", tool: "ChatGPT", output: "选品建议" },
            { step: 5, action: "产品团队评审，结合供应链能力确定最终选品", output: "选品清单" },
            { step: 6, action: "新品上市后跟踪表现，验证AI选品准确性", output: "效果验证" },
          ],
          estimatedTime: "3-5天（原来2周）"
        }
      ],
      tasks: [
        {
          title: "AI趋势选品实战",
          description: "用AI完成一次完整的趋势分析和选品建议，跟踪新品表现验证准确性",
          difficulty: "intermediate",
          acceptanceCriteria: [
            "用AI完成趋势分析报告（覆盖色彩/款式/面料/消费者偏好）",
            "提出至少10个选品方向建议",
            "至少3个建议被产品团队采纳",
            "跟踪新品上市后表现",
            "整理为案例上传平台通晒"
          ],
          estimatedTime: "1个月（含跟踪期）",
          deliverable: "《AI趋势选品报告》+ 新品表现追踪 + 平台案例"
        }
      ],
      cases: [
        { caseId: "CASE-PD-002", title: "AI趋势分析命中率提升至75%", department: "产品中心", type: "internal", summary: "产品中心AI科代表用ChatGPT+Perplexity进行季度趋势分析，覆盖色彩、款式、面料、社媒热点四个维度，AI推荐的15个选品方向中11个成为畅销款", impact: "选品命中率从55%提升到75%，新品首月销售额增长30%", url: "#" },
        { caseId: "CASE-IND-014", title: "SHEIN AI选品体系", department: "行业案例", type: "industry", summary: "SHEIN利用AI分析社媒趋势、搜索数据和竞品动态，实现AI驱动的选品决策。AI每天分析10万+社媒帖子和搜索词，预测下一季流行趋势", impact: "新品上市速度提升10倍，畅销率提升40%", url: "https://www.businessofapps.com/data/shein-statistics/" },
        { caseId: "CASE-GEN-014", title: "WGSN AI趋势预测方法论", department: "通用案例", type: "general", summary: "全球领先趋势预测机构WGSN已将AI融入趋势预测流程，AI分析社媒、秀场、街拍、搜索数据等多源信息，将趋势预测准确率提升30%", impact: "采用AI趋势预测的品牌新品成功率提升25%", url: "https://www.wgsn.com/" },
      ],
      keyTakeaways: [
        "AI趋势分析的核心价值是\"速度×广度×多源\"——快速覆盖多个信息源",
        "AI选品需要结合数据洞察和设计师直觉，AI提供方向，人提供审美判断",
        "社媒热点分析是AI的强项——TikTok/Instagram上的流行元素可以快速捕捉",
        "选品案例需要跟踪新品表现来验证AI准确性，有数据支撑的案例价值更高",
        "趋势分析方法可以跨品类裂变复用——泳装的方法也适用于度假装和配饰"
      ]
    }
  },
  // ========== CREATIVE CENTER (创意中心) ==========
  {
    id: "CR01",
    titleZh: "AI视觉内容生成",
    titleEn: "AI Visual Content Generation",
    descriptionZh: "利用AI生成和优化视觉内容：商品图、模特图、Banner、社媒素材、视频脚本、创意概念",
    descriptionEn: "AI-powered visual content: product images, model photos, banners, social media assets, video scripts, creative concepts",
    layer: "department", level: 2, maxLevel: 5, departments: ["creative"], pilotProjects: ["creative-ai"], progress: 62,
    prerequisites: ["F02"], tools: ["Midjourney", "DALL-E", "Stable Diffusion", "Canva AI", "ChatGPT"], tags: ["创意", "视觉", "试点"],
    knowledge: {
      caseSubmissionPrompt: "请用以下结构提交你的AI视觉内容案例：\n\n【案例编号】自动生成\n【案例标题】一句话描述你的AI视觉突破\n【内容类型】商品图/模特图/Banner/社媒素材/视频/其他\n【AI工具】Midjourney/DALL-E/Stable Diffusion/Canva AI/其他\n【AI前效率】原来产出该内容需要多长时间和成本\n【AI后效率】使用AI后需要多长时间和成本\n【质量评估】AI输出质量评分（1-10）及评分理由\n【核心Prompt】请粘贴你使用的核心Prompt\n【版权确认】是否确认AI生成内容的版权合规性\n【可复用性】该Prompt/方法是否可供其他品类/场景复用？",
      resources: [
        { title: "CUPSHE AI视觉创意手册", type: "doc", url: "#", duration: "45min", source: "CUPSHE创意中心" },
        { title: "Midjourney泳装/时尚Prompt指南", type: "doc", url: "#", duration: "30min", source: "CUPSHE创意中心" },
        { title: "Midjourney Official Documentation", type: "tutorial", url: "https://docs.midjourney.com/", duration: "40min", source: "Midjourney" },
        { title: "AI Image Generation for E-commerce", type: "article", url: "https://www.shopify.com/blog/ai-image-generator", duration: "20min", source: "Shopify" },
      ],
      prompts: [
        {
          title: "商品场景图生成",
          scenario: "需要为商品生成不同场景的展示图",
          prompt: "请生成CUPSHE {产品类型}的场景展示图：\n\n产品描述：{产品描述}\n场景：{场景描述}\n风格：{风格}\n色调：{色调}\n构图：{构图}\n\nMidjourney Prompt：\n{product type} by CUPSHE, {scene description}, {style}, {color tone}, {composition}, professional fashion photography, natural lighting, high resolution, editorial quality --ar 4:5 --v 6\n\n请生成3个不同场景的Prompt变体：\n1. 海滩度假场景\n2. 泳池派对场景\n3. 生活方式场景\n\n每个Prompt标注适用的营销渠道（独立站/Amazon/社媒）。",
          variables: ["产品类型", "产品描述", "场景描述", "风格", "色调", "构图"],
          expectedOutput: "3个场景的Midjourney Prompt + 渠道适用建议"
        },
        {
          title: "Banner/广告素材创意生成",
          scenario: "需要快速生成促销Banner或广告素材的创意方向",
          prompt: "请为CUPSHE {活动名称}生成{数量}个Banner创意方案：\n\n活动信息：\n- 主题：{主题}\n- 折扣：{折扣}\n- 目标受众：{受众}\n- 投放渠道：{渠道}\n- 尺寸：{尺寸}\n\n每个方案包含：\n1. 创意概念（一句话）\n2. 视觉描述（构图、色彩、元素）\n3. 文案（主标题+副标题+CTA）\n4. AI生成Prompt（Midjourney/DALL-E格式）\n5. 预期效果评估\n\n风格要求：符合CUPSHE品牌调性（阳光、自信、包容、高品质感）。",
          variables: ["活动名称", "数量", "主题", "折扣", "受众", "渠道", "尺寸"],
          expectedOutput: "多个Banner创意方案，含视觉描述和AI生成Prompt"
        }
      ],
      workflows: [
        {
          title: "AI视觉内容生产工作流",
          scenario: "日常视觉内容生产，AI科代表带领创意团队执行",
          steps: [
            { step: 1, action: "明确需求：内容类型、用途、风格、尺寸", output: "创意Brief" },
            { step: 2, action: "用ChatGPT生成创意方向和AI图像Prompt", tool: "ChatGPT", output: "创意方案+Prompt" },
            { step: 3, action: "用Midjourney/DALL-E生成初稿图像", tool: "Midjourney/DALL-E", output: "AI图像初稿" },
            { step: 4, action: "设计师精修：调整构图、色彩、品牌元素", tool: "Photoshop/Canva", output: "精修图像" },
            { step: 5, action: "品牌审核：确保调性一致和版权合规", output: "终稿" },
            { step: 6, action: "高质量作品整理为案例上传平台通晒", output: "案例提交" },
          ],
          estimatedTime: "每个素材30-60分钟（原来2-4小时）"
        }
      ],
      tasks: [
        {
          title: "AI视觉创意实战",
          description: "用AI生成一组完整的营销视觉素材（Banner+社媒图+商品场景图），产出案例",
          difficulty: "intermediate",
          acceptanceCriteria: [
            "用AI生成至少5个不同类型的视觉素材",
            "素材质量达到可用标准（设计师评分≥7/10）",
            "内容产出效率提升≥50%",
            "确认所有AI生成内容的版权合规性",
            "整理为案例上传平台通晒，含Prompt和迭代过程"
          ],
          estimatedTime: "3天",
          deliverable: "AI视觉素材集 + Prompt库 + 平台案例"
        }
      ],
      cases: [
        { caseId: "CASE-CR-002", title: "AI商品场景图产出效率提升4倍", department: "创意中心", type: "internal", summary: "创意中心AI科代表建立了泳装/度假装的Midjourney Prompt模板库（30+个场景），设计师用AI生成初稿再精修，单张商品场景图从4小时缩短到1小时", impact: "视觉内容产出效率提升4倍，月度素材产量从200张增加到800张", url: "#" },
        { caseId: "CASE-IND-015", title: "Revolve AI视觉内容体系", department: "行业案例", type: "industry", summary: "时尚电商Revolve利用AI生成商品展示图和社媒素材，AI负责80%的初稿生成，设计师负责20%的精修和品牌调性把控。AI生成的素材在A/B测试中与专业摄影素材效果持平", impact: "视觉内容成本降低60%，产出速度提升5倍", url: "https://www.revolve.com/" },
        { caseId: "CASE-GEN-015", title: "Shopify AI电商视觉报告", department: "通用案例", type: "general", summary: "Shopify 2025年报告显示，使用AI生成商品图的电商卖家，平均转化率与专业摄影持平（差异<5%），但成本降低70%、速度提升5倍。关键是AI生成+人工精修的组合", impact: "AI视觉内容的ROI是传统摄影的3-5倍", url: "https://www.shopify.com/blog/ai-image-generator" },
      ],
      keyTakeaways: [
        "AI视觉生成的核心价值是\"速度×成本\"——快速产出大量素材，降低拍摄成本",
        "AI生成+人工精修是最佳组合——AI负责创意初稿，设计师负责品牌调性和细节",
        "建立Prompt模板库是关键——好的Prompt可以稳定产出高质量素材",
        "版权合规是红线——AI生成的商品图用于商业用途前必须确认版权",
        "视觉Prompt模板是高裂变价值案例——营销、运营、产品都能复用"
      ]
    }
  },
  // ========== SUPPLY CHAIN CENTER (供应链中心) ==========
  {
    id: "SC01",
    titleZh: "AI供应商管理",
    titleEn: "AI Supplier Management",
    descriptionZh: "利用AI优化供应商评估、选择、绩效监控：供应商画像、风险预警、交期预测、成本分析",
    descriptionEn: "AI-powered supplier management: profiling, risk alerts, delivery prediction, cost analysis",
    layer: "department", level: 2, maxLevel: 5, departments: ["supply-chain"], pilotProjects: [], progress: 40,
    prerequisites: ["F02", "F04"], tools: ["ChatGPT", "Claude", "Excel"], tags: ["供应链", "供应商"],
    knowledge: {
      caseSubmissionPrompt: "请用以下结构提交你的AI供应商管理案例：\n\n【案例编号】自动生成\n【案例标题】一句话描述你的AI供应商管理突破\n【管理环节】评估/选择/绩效监控/风险预警/成本分析/其他\n【AI前方式】原来如何管理\n【AI后方式】使用AI后如何管理\n【效果数据】效率/成本/质量变化\n【核心方法】你是如何用AI优化的\n【可复用性】该方法是否可供其他品类供应商复用？",
      resources: [
        { title: "CUPSHE供应链AI化方案", type: "doc", url: "#", duration: "40min", source: "CUPSHE供应链中心" },
        { title: "McKinsey: AI in Supply Chain", type: "article", url: "https://www.mckinsey.com/capabilities/operations/our-insights/ai-in-supply-chain", duration: "25min", source: "McKinsey" },
      ],
      prompts: [
        {
          title: "供应商综合评估",
          scenario: "评估新供应商或年度供应商绩效评审",
          prompt: "请帮我评估以下供应商的综合能力：\n\n供应商信息：\n- 名称：{名称}\n- 品类：{品类}\n- 合作年限：{年限}\n\n评估数据：\n- 交期准时率：{准时率}%\n- 质量合格率：{合格率}%\n- 价格竞争力：{价格对比}\n- 产能利用率：{产能}\n- 响应速度：{响应}\n\n请从以下维度评分（1-10）并给出综合建议：\n1. 质量能力\n2. 交付能力\n3. 成本竞争力\n4. 技术能力\n5. 服务响应\n6. 风险等级\n7. 发展潜力\n\n请输出评分雷达图描述和改进建议。",
          variables: ["名称", "品类", "年限", "准时率", "合格率", "价格对比", "产能", "响应"],
          expectedOutput: "供应商综合评估报告，含评分和改进建议"
        }
      ],
      workflows: [
        {
          title: "AI供应商月度评审工作流",
          scenario: "每月供应商绩效评审",
          steps: [
            { step: 1, action: "汇总供应商月度数据（交期/质量/成本）", output: "原始数据" },
            { step: 2, action: "用AI分析各供应商绩效趋势和异常", tool: "ChatGPT", output: "绩效分析" },
            { step: 3, action: "AI生成风险预警和改进建议", tool: "ChatGPT", output: "风险报告" },
            { step: 4, action: "人工审核并制定行动计划", output: "行动计划" },
            { step: 5, action: "显著改善案例整理上传平台通晒", output: "案例提交" },
          ],
          estimatedTime: "2小时（原来半天）"
        }
      ],
      tasks: [
        {
          title: "AI供应商评估实战",
          description: "用AI完成一次完整的供应商评估，产出评估报告和改进建议",
          difficulty: "intermediate",
          acceptanceCriteria: ["用AI评估至少3个供应商", "产出含评分和改进建议的评估报告", "至少1个改进建议被采纳", "整理为案例上传平台通晒"],
          estimatedTime: "1周",
          deliverable: "《AI供应商评估报告》+ 平台案例"
        }
      ],
      cases: [
        { caseId: "CASE-SC-001", title: "AI供应商绩效分析效率提升65%", department: "供应链中心", type: "internal", summary: "供应链中心用ChatGPT分析20家供应商的季度绩效数据，AI自动识别出3家交期恶化的供应商并给出预警，提前2周发现了潜在的供应风险", impact: "供应商评审效率提升65%，供应风险预警提前2周", url: "#" },
        { caseId: "CASE-IND-016", title: "Nike AI供应链管理", department: "行业案例", type: "industry", summary: "Nike利用AI进行供应商绩效监控和风险预警，AI实时分析供应商的交期、质量、产能数据，提前预警潜在风险", impact: "供应链中断减少40%，供应商管理成本降低25%", url: "https://www.nike.com/" },
        { caseId: "CASE-GEN-016", title: "Gartner AI供应链管理报告", department: "通用案例", type: "general", summary: "Gartner报告指出AI在供应链管理中的三大价值：需求预测（准确率提升30%）、供应商风险预警（提前2-4周）、库存优化（成本降低15-25%）", impact: "AI供应链企业的运营成本平均降低15%", url: "https://www.gartner.com/en/supply-chain" },
      ],
      keyTakeaways: [
        "AI供应商管理的核心是\"数据驱动评估+风险预警\"",
        "月度绩效分析是AI最直接的价值——快速处理大量数据发现异常",
        "供应商评估模板可以跨品类裂变复用",
        "AI提供数据洞察，人提供关系判断和谈判策略",
        "完整闭环：数据收集→AI分析→风险预警→行动计划→效果验证→案例通晒"
      ]
    }
  },
  {
    id: "SC02",
    titleZh: "AI采购与成本优化",
    titleEn: "AI Procurement & Cost Optimization",
    descriptionZh: "利用AI优化采购决策：成本结构分析、比价、采购量预测、合同条款优化",
    descriptionEn: "AI-powered procurement: cost structure analysis, price comparison, volume forecasting, contract optimization",
    layer: "department", level: 2, maxLevel: 4, departments: ["supply-chain"], pilotProjects: [], progress: 35,
    prerequisites: ["F02", "SC01"], tools: ["ChatGPT", "Claude", "Excel"], tags: ["供应链", "采购"],
    knowledge: {
      caseSubmissionPrompt: "请用以下结构提交你的AI采购优化案例：\n\n【案例编号】自动生成\n【案例标题】一句话描述你的AI采购突破\n【优化环节】成本分析/比价/量预测/合同/其他\n【AI前成本】优化前的采购成本\n【AI后成本】使用AI后的采购成本\n【核心方法】你是如何用AI优化的\n【可复用性】该方法是否可供其他品类复用？",
      resources: [
        { title: "AI采购优化实战", type: "doc", url: "#", duration: "30min", source: "CUPSHE供应链中心" },
        { title: "Deloitte: AI in Procurement", type: "article", url: "https://www2.deloitte.com/", duration: "25min", source: "Deloitte" },
      ],
      prompts: [
        {
          title: "采购成本结构分析",
          scenario: "分析产品成本结构，寻找降本空间",
          prompt: "请分析CUPSHE {产品类型}的成本结构：\n\n当前成本构成：\n- 面料成本：${面料}\n- 辅料成本：${辅料}\n- 加工费：${加工}\n- 运输费：${运输}\n- 其他：${其他}\n\n请分析：\n1. 各成本项占比和行业对标\n2. 降本空间最大的3个环节\n3. 每个环节的具体降本方案\n4. 降本方案的风险评估\n5. 预计降本幅度和时间线\n\n请用表格呈现，标注优先级和可行性。",
          variables: ["产品类型", "面料", "辅料", "加工", "运输", "其他"],
          expectedOutput: "成本结构分析报告，含降本方案和优先级"
        }
      ],
      workflows: [
        {
          title: "AI采购决策工作流",
          scenario: "季度采购计划制定",
          steps: [
            { step: 1, action: "汇总历史采购数据和市场价格信息", output: "数据汇总" },
            { step: 2, action: "用AI分析成本结构和降本空间", tool: "ChatGPT", output: "成本分析" },
            { step: 3, action: "AI生成采购量预测和预算建议", tool: "ChatGPT", output: "采购计划" },
            { step: 4, action: "人工审核并与供应商谈判", output: "最终方案" },
            { step: 5, action: "降本成功案例整理上传平台", output: "案例提交" },
          ],
          estimatedTime: "1天（原来3天）"
        }
      ],
      tasks: [
        {
          title: "AI采购降本实战",
          description: "用AI分析一个品类的成本结构，提出降本方案并验证效果",
          difficulty: "intermediate",
          acceptanceCriteria: ["选择一个品类进行AI成本分析", "提出至少3个降本方案", "至少1个方案落地并产生效果", "整理为案例上传平台通晒"],
          estimatedTime: "2周",
          deliverable: "《AI采购降本报告》+ 平台案例"
        }
      ],
      cases: [
        { caseId: "CASE-SC-002", title: "AI成本分析发现8%降本空间", department: "供应链中心", type: "internal", summary: "供应链中心用ChatGPT分析泳装品类的成本结构，AI对标行业数据发现面料采购价高于市场均价12%，建议引入竞争性报价机制", impact: "面料采购成本降低8%，年度节省$20万", url: "#" },
        { caseId: "CASE-IND-017", title: "Zara AI采购优化", department: "行业案例", type: "industry", summary: "Zara利用AI进行面料采购量预测和价格谈判准备，AI分析历史数据和市场趋势，为采购团队提供最优采购时机和数量建议", impact: "采购成本降低10%，库存浪费减少15%", url: "https://www.zara.com/" },
      ],
      keyTakeaways: [
        "AI采购优化的核心是\"成本透明化+数据驱动谈判\"",
        "成本结构分析是第一步——知道钱花在哪里才能优化",
        "AI比价和市场分析可以为谈判提供数据支撑",
        "采购降本案例的裂变价值高——方法可以跨品类复用"
      ]
    }
  },
  {
    id: "SC03",
    titleZh: "AI质量管理",
    titleEn: "AI Quality Management",
    descriptionZh: "利用AI优化质量管理：质检标准制定、缺陷分析、质量趋势预测、退货原因分析",
    descriptionEn: "AI-powered quality management: inspection standards, defect analysis, quality trend prediction, return analysis",
    layer: "department", level: 2, maxLevel: 4, departments: ["supply-chain"], pilotProjects: [], progress: 30,
    prerequisites: ["F02", "SC01"], tools: ["ChatGPT", "Claude"], tags: ["供应链", "质量"],
    knowledge: {
      caseSubmissionPrompt: "请用以下结构提交你的AI质量管理案例：\n\n【案例编号】自动生成\n【案例标题】一句话描述你的AI质量管理突破\n【管理环节】质检/缺陷分析/退货分析/其他\n【AI前方式】原来如何管理\n【AI后方式】使用AI后如何管理\n【效果数据】质量指标变化\n【核心方法】你是如何用AI优化的\n【可复用性】该方法是否可供其他品类复用？",
      resources: [
        { title: "CUPSHE AI质量管理方案", type: "doc", url: "#", duration: "30min", source: "CUPSHE供应链中心" },
        { title: "AI Quality Control in Manufacturing", type: "article", url: "https://www.mckinsey.com/", duration: "20min", source: "McKinsey" },
      ],
      prompts: [
        {
          title: "退货原因批量分析",
          scenario: "分析退货数据，发现产品质量问题和改进方向",
          prompt: "请分析CUPSHE以下退货数据（{数量}条）：\n\n{退货数据}\n\n请输出：\n1. 退货原因分布（尺码/质量/颜色/不喜欢/其他）\n2. 各原因的占比和趋势变化\n3. 高退货率SKU Top 10及其共性特征\n4. 质量问题的具体分类和严重程度\n5. 与行业平均退货率的对比\n6. 改进建议（按优先级排序）\n7. 可预防的退货比例估算\n\n请用表格和图表描述呈现。",
          variables: ["数量", "退货数据"],
          expectedOutput: "退货分析报告，含原因分布和改进建议"
        }
      ],
      workflows: [
        {
          title: "AI质量分析月度工作流",
          scenario: "每月质量数据分析和改进",
          steps: [
            { step: 1, action: "汇总月度质检和退货数据", output: "原始数据" },
            { step: 2, action: "用AI分析质量趋势和异常", tool: "ChatGPT", output: "质量分析" },
            { step: 3, action: "AI生成改进建议和预防措施", tool: "ChatGPT", output: "改进方案" },
            { step: 4, action: "与供应商沟通改进计划", output: "行动计划" },
            { step: 5, action: "改善案例整理上传平台", output: "案例提交" },
          ],
          estimatedTime: "2小时"
        }
      ],
      tasks: [
        {
          title: "AI退货分析实战",
          description: "用AI分析退货数据，发现质量问题并提出改进方案",
          difficulty: "intermediate",
          acceptanceCriteria: ["用AI分析至少1个月的退货数据", "识别Top 5退货原因", "提出至少3个改进方案", "整理为案例上传平台通晒"],
          estimatedTime: "1周",
          deliverable: "《AI退货分析报告》+ 改进方案 + 平台案例"
        }
      ],
      cases: [
        { caseId: "CASE-SC-003", title: "AI退货分析降低退货率3个百分点", department: "供应链中心", type: "internal", summary: "供应链中心用ChatGPT分析3个月退货数据，发现尺码问题占退货原因的35%，AI建议优化尺码表描述和增加试穿参考，退货率从15%降到12%", impact: "退货率降低3个百分点，年度节省退货处理成本$30万", url: "#" },
        { caseId: "CASE-GEN-017", title: "AI质量管理最佳实践", department: "通用案例", type: "general", summary: "波士顿咨询报告显示，AI质量管理可以将缺陷检出率提升30-50%，退货率降低15-25%。关键是将AI分析与供应商改进闭环打通", impact: "AI质量管理企业的质量成本降低20%", url: "https://www.bcg.com/" },
      ],
      keyTakeaways: [
        "AI质量管理的核心是\"数据分析→问题发现→改进闭环\"",
        "退货原因分析是AI最直接的价值——批量处理大量退货数据发现模式",
        "质量改善案例需要跟踪改进效果来验证",
        "质量分析方法可以跨品类裂变复用"
      ]
    }
  },
  // ========== LOGISTICS CENTER (物流中心) ==========
  {
    id: "LG01",
    titleZh: "AI物流优化",
    titleEn: "AI Logistics Optimization",
    descriptionZh: "利用AI优化物流全链路：仓储管理、路线规划、时效预测、异常预警、成本分析",
    descriptionEn: "AI-powered logistics: warehouse management, route planning, delivery prediction, anomaly alerts, cost analysis",
    layer: "department", level: 2, maxLevel: 5, departments: ["logistics"], pilotProjects: [], progress: 42,
    prerequisites: ["F02", "F04"], tools: ["ChatGPT", "Claude", "Excel"], tags: ["物流", "仓储"],
    knowledge: {
      caseSubmissionPrompt: "请用以下结构提交你的AI物流优化案例：\n\n【案例编号】自动生成\n【案例标题】一句话描述你的AI物流突破\n【优化环节】仓储/路线/时效/成本/异常处理/其他\n【AI前效率】优化前的物流指标\n【AI后效率】使用AI后的物流指标\n【核心方法】你是如何用AI优化的\n【可复用性】该方法是否可供其他仓库/线路复用？",
      resources: [
        { title: "CUPSHE物流AI化方案", type: "doc", url: "#", duration: "35min", source: "CUPSHE物流中心" },
        { title: "DHL AI Logistics Report", type: "article", url: "https://www.dhl.com/", duration: "25min", source: "DHL" },
      ],
      prompts: [
        {
          title: "物流异常分析与处理",
          scenario: "物流异常（延迟/丢件/损坏）的批量分析和处理",
          prompt: "请分析以下CUPSHE物流异常数据（{数量}条）：\n\n{异常数据}\n\n请输出：\n1. 异常类型分布（延迟/丢件/损坏/地址错误/其他）\n2. 各物流商的异常率对比\n3. 高异常率路线/地区Top 10\n4. 异常原因分析（物流商/天气/海关/地址/其他）\n5. 每种异常的标准处理方案和话术\n6. 预防措施建议\n7. 物流商绩效评估和调整建议\n\n请用表格呈现，标注紧急程度。",
          variables: ["数量", "异常数据"],
          expectedOutput: "物流异常分析报告，含处理方案和预防措施"
        }
      ],
      workflows: [
        {
          title: "AI物流周度分析工作流",
          scenario: "每周物流数据分析和优化",
          steps: [
            { step: 1, action: "导出物流数据（时效/成本/异常）", output: "原始数据" },
            { step: 2, action: "用AI分析物流绩效趋势和异常", tool: "ChatGPT", output: "绩效分析" },
            { step: 3, action: "AI生成优化建议（路线/物流商/包装）", tool: "ChatGPT", output: "优化方案" },
            { step: 4, action: "执行优化并跟踪效果", output: "效果验证" },
            { step: 5, action: "显著改善案例整理上传平台", output: "案例提交" },
          ],
          estimatedTime: "1-2小时"
        }
      ],
      tasks: [
        {
          title: "AI物流分析实战",
          description: "用AI分析物流数据，发现优化空间并验证效果",
          difficulty: "intermediate",
          acceptanceCriteria: ["用AI分析至少2周的物流数据", "识别Top 3优化机会", "至少1个优化方案落地", "整理为案例上传平台通晒"],
          estimatedTime: "2周",
          deliverable: "《AI物流优化报告》+ 平台案例"
        }
      ],
      cases: [
        { caseId: "CASE-LG-001", title: "AI物流异常预警提前3天", department: "物流中心", type: "internal", summary: "物流中心用ChatGPT分析历史物流数据，建立了异常模式识别模型，可以提前3天预警可能的物流延迟，给客服团队预留处理时间", impact: "物流投诉率降低25%，客户满意度提升10%", url: "#" },
        { caseId: "CASE-IND-018", title: "Amazon AI物流体系", department: "行业案例", type: "industry", summary: "Amazon利用AI优化仓储布局、配送路线和需求预测，实现了当日达和次日达的高效物流网络", impact: "物流成本降低20%，配送时效提升40%", url: "https://www.aboutamazon.com/" },
        { caseId: "CASE-GEN-018", title: "DHL AI物流创新报告", department: "通用案例", type: "general", summary: "DHL报告指出AI在物流领域的三大应用：需求预测（准确率提升25%）、路线优化（成本降低15%）、异常预警（提前2-5天）", impact: "AI物流企业的整体物流成本降低15-20%", url: "https://www.dhl.com/" },
      ],
      keyTakeaways: [
        "AI物流优化的核心是\"数据分析→异常预警→路线优化\"",
        "物流异常分析是AI最直接的价值——批量处理异常数据快速定位问题",
        "物流优化案例可以跨仓库、跨线路裂变复用",
        "AI提供数据洞察，人提供物流经验和供应商关系判断"
      ]
    }
  },
  // ========== IT CENTER (信息技术中心) ==========
  {
    id: "IT01",
    titleZh: "AI辅助开发与运维",
    titleEn: "AI-Assisted Development & Operations",
    descriptionZh: "利用AI提升开发效率：代码生成、代码审查、Bug修复、文档生成、自动化测试、运维监控",
    descriptionEn: "AI-powered development: code generation, code review, bug fixing, documentation, automated testing, operations monitoring",
    layer: "department", level: 3, maxLevel: 5, departments: ["it"], pilotProjects: [], progress: 70,
    prerequisites: ["F01", "F02"], tools: ["GitHub Copilot", "Cursor", "ChatGPT", "Claude"], tags: ["IT", "开发"],
    knowledge: {
      caseSubmissionPrompt: "请用以下结构提交你的AI开发/运维案例：\n\n【案例编号】自动生成\n【案例标题】一句话描述你的AI开发突破\n【开发环节】代码生成/审查/Bug修复/文档/测试/运维/其他\n【AI工具】Copilot/Cursor/ChatGPT/Claude/其他\n【AI前效率】原来完成该任务需要多长时间\n【AI后效率】使用AI后需要多长时间\n【代码质量】AI辅助后的代码质量评估\n【核心方法】你是如何用AI优化开发流程的\n【可复用性】该方法是否可供其他项目/团队复用？",
      resources: [
        { title: "CUPSHE IT团队AI开发规范", type: "doc", url: "#", duration: "40min", source: "CUPSHE IT中心" },
        { title: "GitHub Copilot Best Practices", type: "tutorial", url: "https://docs.github.com/en/copilot", duration: "30min", source: "GitHub" },
        { title: "Cursor IDE Documentation", type: "tutorial", url: "https://cursor.sh/docs", duration: "25min", source: "Cursor" },
        { title: "AI-Assisted Software Development", type: "article", url: "https://github.blog/ai-and-ml/", duration: "20min", source: "GitHub Blog" },
      ],
      prompts: [
        {
          title: "代码审查与优化建议",
          scenario: "提交代码前用AI进行审查",
          prompt: "请审查以下代码并提供优化建议：\n\n语言/框架：{语言}\n功能描述：{功能}\n\n```{语言}\n{代码}\n```\n\n请从以下维度审查：\n1. 代码质量（可读性、命名规范、注释）\n2. 性能（时间复杂度、内存使用、N+1查询）\n3. 安全性（SQL注入、XSS、敏感信息泄露）\n4. 可维护性（耦合度、单一职责、错误处理）\n5. 测试覆盖（建议的测试用例）\n\n请按严重程度（Critical/Major/Minor）分类列出问题，并给出修改后的代码。",
          variables: ["语言", "功能", "代码"],
          expectedOutput: "代码审查报告，含问题分类和修改建议"
        },
        {
          title: "技术方案设计",
          scenario: "新功能开发前的技术方案设计",
          prompt: "请帮我设计{功能名称}的技术方案：\n\n需求描述：{需求}\n技术栈：{技术栈}\n性能要求：{性能}\n约束条件：{约束}\n\n请输出：\n1. 整体架构设计（含架构图描述）\n2. 数据库设计（表结构和关系）\n3. API设计（接口列表和参数）\n4. 核心算法/逻辑流程\n5. 技术选型建议和理由\n6. 风险评估和应对方案\n7. 开发工时估算\n\n请用Markdown格式输出。",
          variables: ["功能名称", "需求", "技术栈", "性能", "约束"],
          expectedOutput: "完整的技术方案文档"
        }
      ],
      workflows: [
        {
          title: "AI辅助开发工作流",
          scenario: "日常开发中融入AI辅助",
          steps: [
            { step: 1, action: "用AI辅助需求分析和技术方案设计", tool: "ChatGPT/Claude", output: "技术方案" },
            { step: 2, action: "用Copilot/Cursor辅助编码", tool: "GitHub Copilot/Cursor", output: "代码初稿" },
            { step: 3, action: "用AI进行代码审查和优化", tool: "ChatGPT", output: "审查报告" },
            { step: 4, action: "用AI生成单元测试和文档", tool: "ChatGPT/Copilot", output: "测试+文档" },
            { step: 5, action: "人工最终审核和集成", output: "代码合并" },
            { step: 6, action: "效率提升显著的案例整理上传平台", output: "案例提交" },
          ],
          estimatedTime: "贯穿整个开发周期"
        }
      ],
      tasks: [
        {
          title: "AI辅助开发效率对比",
          description: "选择一个开发任务，对比AI辅助和传统方式的效率差异",
          difficulty: "intermediate",
          acceptanceCriteria: ["选择一个中等复杂度的开发任务", "用AI辅助完成全流程（设计→编码→测试→文档）", "记录各环节的时间对比", "代码质量不低于传统方式", "整理为案例上传平台通晒"],
          estimatedTime: "1周",
          deliverable: "《AI辅助开发效率报告》+ 平台案例"
        }
      ],
      cases: [
        { caseId: "CASE-IT-001", title: "Copilot辅助开发效率提升55%", department: "IT中心", type: "internal", summary: "IT中心全员部署GitHub Copilot，开发效率平均提升55%。AI辅助代码生成、测试编写和文档生成，开发者可以专注于架构设计和业务逻辑", impact: "开发效率提升55%，代码Bug率降低30%", url: "#" },
        { caseId: "CASE-IND-019", title: "Shopify AI开发体系", department: "行业案例", type: "industry", summary: "Shopify全面采用AI辅助开发，包括Copilot编码、AI代码审查、AI测试生成，开发团队效率提升40%，同时代码质量提升", impact: "开发效率提升40%，部署频率提升2倍", url: "https://shopify.engineering/" },
        { caseId: "CASE-GEN-019", title: "GitHub Copilot效率研究", department: "通用案例", type: "general", summary: "GitHub官方研究显示，使用Copilot的开发者完成任务速度提升55%，代码接受率达30%。关键是AI处理重复性编码，人专注于架构和逻辑", impact: "全球100万+开发者使用，平均效率提升55%", url: "https://github.blog/news-insights/research/research-quantifying-github-copilots-impact-on-developer-productivity-and-happiness/" },
      ],
      keyTakeaways: [
        "AI辅助开发的核心是\"AI处理重复，人处理创造\"",
        "Copilot/Cursor是编码阶段的最佳伙伴——代码补全、函数生成、测试编写",
        "AI代码审查可以发现人容易忽略的安全和性能问题",
        "开发效率案例的裂变价值：AI开发方法可以跨项目、跨团队复用",
        "AI生成的代码必须经过人工审核——AI可能引入隐蔽的Bug"
      ]
    }
  },
  // ========== FINANCE CENTER (财务中心) ==========
  {
    id: "FN01",
    titleZh: "AI财务分析与报告",
    titleEn: "AI Financial Analysis & Reporting",
    descriptionZh: "利用AI优化财务分析：报表生成、预算分析、成本核算、现金流预测、财务报告撰写",
    descriptionEn: "AI-powered finance: report generation, budget analysis, cost accounting, cash flow forecasting, financial reporting",
    layer: "department", level: 2, maxLevel: 4, departments: ["finance"], pilotProjects: [], progress: 38,
    prerequisites: ["F02", "F04"], tools: ["ChatGPT", "Claude", "Excel"], tags: ["财务", "分析"],
    knowledge: {
      caseSubmissionPrompt: "请用以下结构提交你的AI财务分析案例：\n\n【案例编号】自动生成\n【案例标题】一句话描述你的AI财务突破\n【分析环节】报表/预算/成本/现金流/报告/其他\n【AI前效率】原来完成该分析需要多长时间\n【AI后效率】使用AI后需要多长时间\n【核心方法】你是如何用AI优化的（注意数据脱敏）\n【可复用性】该方法是否可供其他财务场景复用？",
      resources: [
        { title: "CUPSHE财务AI化方案", type: "doc", url: "#", duration: "30min", source: "CUPSHE财务中心" },
        { title: "AI in Finance: Practical Guide", type: "article", url: "https://www.mckinsey.com/industries/financial-services/our-insights", duration: "25min", source: "McKinsey" },
      ],
      prompts: [
        {
          title: "财务数据分析与洞察",
          scenario: "月度/季度财务数据分析",
          prompt: "请分析CUPSHE以下财务数据（本月 vs 上月 vs 去年同期）：\n\n{财务数据}\n\n请输出：\n1. 关键指标概览（收入/毛利/净利/现金流）同比环比变化\n2. 收入结构分析（按渠道/品类/地区）\n3. 成本结构分析（按类别）\n4. 异常波动分析（偏离预算>10%的项目）\n5. 现金流预测（未来3个月）\n6. 风险提示和建议行动\n\n注意：请确保分析基于提供的数据，不编造数字。\n请用表格和要点形式呈现。",
          variables: ["财务数据"],
          expectedOutput: "结构化财务分析报告"
        }
      ],
      workflows: [
        {
          title: "AI财务月报工作流",
          scenario: "每月财务报告生成",
          steps: [
            { step: 1, action: "导出月度财务数据（脱敏处理）", output: "脱敏数据" },
            { step: 2, action: "用AI分析数据趋势和异常", tool: "ChatGPT", output: "分析报告" },
            { step: 3, action: "AI生成财务报告初稿", tool: "ChatGPT/Claude", output: "报告初稿" },
            { step: 4, action: "人工审核数字准确性和合规性", output: "终稿" },
            { step: 5, action: "效率提升案例整理上传平台", output: "案例提交" },
          ],
          estimatedTime: "2-3小时（原来1天）"
        }
      ],
      tasks: [
        {
          title: "AI财务分析实战",
          description: "用AI辅助完成一次月度财务分析，对比效率和质量",
          difficulty: "intermediate",
          acceptanceCriteria: ["用AI分析月度财务数据（脱敏后）", "产出含趋势分析和异常发现的报告", "报告质量不低于传统方式", "效率提升≥40%", "整理为案例上传平台通晒"],
          estimatedTime: "3天",
          deliverable: "《AI财务分析报告》+ 平台案例"
        }
      ],
      cases: [
        { caseId: "CASE-FN-001", title: "AI财务月报生成效率提升60%", department: "财务中心", type: "internal", summary: "财务中心用ChatGPT辅助月度财务报告生成，AI负责数据分析和报告初稿，人工负责数字审核和合规检查，月报生成时间从1天缩短到3小时", impact: "月报生成效率提升60%，分析维度更全面", url: "#" },
        { caseId: "CASE-GEN-020", title: "Deloitte AI财务分析报告", department: "通用案例", type: "general", summary: "Deloitte报告显示AI在财务领域的三大应用：报告自动化（效率提升50-70%）、异常检测（准确率提升40%）、预测分析（准确率提升25%）", impact: "AI财务企业的财务团队效率提升50%", url: "https://www2.deloitte.com/" },
      ],
      keyTakeaways: [
        "AI财务分析的核心是\"数据分析自动化+报告生成加速\"",
        "数据脱敏是财务AI应用的前提——敏感数据不能直接输入AI",
        "AI生成的财务报告必须经过人工审核——数字准确性是底线",
        "财务分析方法可以跨周期裂变复用——月报方法也适用于季报年报"
      ]
    }
  },
  // ========== LEGAL/COMPLIANCE (法务/合规) ==========
  {
    id: "LE01",
    titleZh: "AI法务与合规",
    titleEn: "AI Legal & Compliance",
    descriptionZh: "利用AI辅助法务工作：合同审查、合规检查、知识产权管理、法律研究、风险评估",
    descriptionEn: "AI-powered legal: contract review, compliance checks, IP management, legal research, risk assessment",
    layer: "department", level: 2, maxLevel: 4, departments: ["legal"], pilotProjects: [], progress: 32,
    prerequisites: ["F02"], tools: ["ChatGPT", "Claude"], tags: ["法务", "合规"],
    knowledge: {
      caseSubmissionPrompt: "请用以下结构提交你的AI法务案例：\n\n【案例编号】自动生成\n【案例标题】一句话描述你的AI法务突破\n【法务环节】合同审查/合规检查/知识产权/法律研究/其他\n【AI前效率】原来完成该工作需要多长时间\n【AI后效率】使用AI后需要多长时间\n【核心方法】你是如何用AI辅助法务工作的\n【风险提示】AI法务辅助的局限性和风险\n【可复用性】该方法是否可供其他法务场景复用？",
      resources: [
        { title: "AI法务应用指南", type: "doc", url: "#", duration: "30min", source: "CUPSHE法务部" },
        { title: "AI in Legal: Thomson Reuters", type: "article", url: "https://legal.thomsonreuters.com/", duration: "25min", source: "Thomson Reuters" },
      ],
      prompts: [
        {
          title: "合同条款审查",
          scenario: "审查供应商合同或合作协议的关键条款",
          prompt: "请审查以下合同的关键条款：\n\n合同类型：{合同类型}\n合同方：{合同方}\n\n{合同内容}\n\n请从以下维度审查：\n1. 权利义务是否对等\n2. 违约条款是否合理\n3. 知识产权归属是否明确\n4. 保密条款是否充分\n5. 争议解决机制是否合适\n6. 是否存在不利条款或陷阱\n7. 建议修改的条款和理由\n\n注意：AI审查仅供参考，最终决策需法律专业人士确认。\n请按风险等级（高/中/低）分类列出问题。",
          variables: ["合同类型", "合同方", "合同内容"],
          expectedOutput: "合同审查报告，含风险评估和修改建议"
        }
      ],
      workflows: [
        {
          title: "AI合同审查工作流",
          scenario: "日常合同审查",
          steps: [
            { step: 1, action: "将合同文本输入AI进行初步审查", tool: "ChatGPT/Claude", output: "初审报告" },
            { step: 2, action: "AI标注风险条款和建议修改", tool: "ChatGPT", output: "风险标注" },
            { step: 3, action: "法务专业人员审核AI建议", output: "专业审核" },
            { step: 4, action: "生成最终审查意见", output: "审查意见" },
            { step: 5, action: "效率提升案例整理上传平台", output: "案例提交" },
          ],
          estimatedTime: "1-2小时（原来半天）"
        }
      ],
      tasks: [
        {
          title: "AI合同审查实战",
          description: "用AI辅助审查一份合同，对比效率和发现问题的全面性",
          difficulty: "intermediate",
          acceptanceCriteria: ["用AI审查至少1份合同", "AI发现的问题与人工审查对比", "效率提升≥50%", "整理为案例上传平台通晒"],
          estimatedTime: "3天",
          deliverable: "《AI合同审查案例》+ 平台案例"
        }
      ],
      cases: [
        { caseId: "CASE-LE-001", title: "AI合同审查效率提升55%", department: "法务部", type: "internal", summary: "法务部用Claude辅助审查供应商合同，AI在5分钟内标注了12个风险条款，人工审查确认其中10个有效，AI审查效率提升55%", impact: "合同审查效率提升55%，风险发现率提升20%", url: "#" },
        { caseId: "CASE-GEN-021", title: "Thomson Reuters AI法务报告", department: "通用案例", type: "general", summary: "Thomson Reuters报告显示AI法务工具可以将合同审查时间缩短60-80%，法律研究时间缩短50%。但AI法务的局限是不能替代法律专业判断", impact: "AI法务企业的法务团队效率提升50%", url: "https://legal.thomsonreuters.com/" },
      ],
      keyTakeaways: [
        "AI法务的核心是\"AI初审+人工终审\"——AI负责速度，人负责判断",
        "合同审查是AI法务最直接的应用场景",
        "数据安全是法务AI应用的红线——敏感合同内容需要脱敏处理",
        "AI法务辅助的局限性：不能替代法律专业判断，仅供参考"
      ]
    }
  },
  // ========== HR CENTER (人力资源中心) ==========
  {
    id: "HR01",
    titleZh: "AI招聘与人才管理",
    titleEn: "AI Recruitment & Talent Management",
    descriptionZh: "利用AI优化招聘全流程：JD生成、简历筛选、面试问题设计、人才画像、薪酬分析",
    descriptionEn: "AI-powered HR: JD generation, resume screening, interview design, talent profiling, compensation analysis",
    layer: "department", level: 2, maxLevel: 5, departments: ["hr"], pilotProjects: [], progress: 48,
    prerequisites: ["F02"], tools: ["ChatGPT", "Claude"], tags: ["人力资源", "招聘"],
    knowledge: {
      caseSubmissionPrompt: "请用以下结构提交你的AI招聘/人才管理案例：\n\n【案例编号】自动生成\n【案例标题】一句话描述你的AI招聘突破\n【HR环节】JD/简历筛选/面试/人才画像/薪酬/其他\n【AI前效率】原来完成该环节需要多长时间\n【AI后效率】使用AI后需要多长时间\n【核心方法】你是如何用AI优化的\n【可复用性】该方法是否可供其他岗位/部门复用？",
      resources: [
        { title: "CUPSHE HR AI化方案", type: "doc", url: "#", duration: "35min", source: "CUPSHE人力资源中心" },
        { title: "LinkedIn AI Recruiting Guide", type: "article", url: "https://business.linkedin.com/talent-solutions", duration: "25min", source: "LinkedIn" },
        { title: "AI in HR: SHRM Guide", type: "article", url: "https://www.shrm.org/", duration: "20min", source: "SHRM" },
      ],
      prompts: [
        {
          title: "JD智能生成",
          scenario: "快速生成专业的岗位描述",
          prompt: "请为CUPSHE生成{岗位名称}的JD：\n\n岗位信息：\n- 部门：{部门}\n- 级别：{级别}\n- 汇报对象：{汇报对象}\n- 工作地点：{地点}\n\n核心职责：{职责概述}\n\n请生成：\n1. 岗位概述（2-3句话，突出吸引力）\n2. 核心职责（6-8条，按重要性排序）\n3. 任职要求（必备条件+加分条件）\n4. 我们提供（福利和发展机会）\n5. CUPSHE品牌介绍（简短有吸引力）\n\n要求：\n- 语言专业但不生硬\n- 突出CUPSHE的品牌文化和发展机会\n- 避免性别/年龄歧视性语言\n- 中英文双语版本",
          variables: ["岗位名称", "部门", "级别", "汇报对象", "地点", "职责概述"],
          expectedOutput: "中英文双语JD"
        },
        {
          title: "面试问题设计",
          scenario: "为特定岗位设计结构化面试问题",
          prompt: "请为CUPSHE {岗位名称}设计结构化面试问题：\n\n岗位要求：{要求}\n面试轮次：{轮次}\n面试时长：{时长}分钟\n\n请设计：\n1. 开场问题（1-2个，破冰+了解动机）\n2. 专业能力问题（3-4个，含STAR追问）\n3. 行为面试问题（2-3个，评估软技能）\n4. 文化匹配问题（1-2个，评估价值观）\n5. 情景模拟问题（1个，评估实战能力）\n6. 候选人提问环节引导\n\n每个问题标注：\n- 评估维度\n- 优秀回答的关键要素\n- 红旗信号（需要警惕的回答）",
          variables: ["岗位名称", "要求", "轮次", "时长"],
          expectedOutput: "结构化面试问题集，含评估标准"
        }
      ],
      workflows: [
        {
          title: "AI招聘全流程工作流",
          scenario: "从JD到面试的AI辅助招聘流程",
          steps: [
            { step: 1, action: "用AI生成JD（中英文双语）", tool: "ChatGPT", output: "JD" },
            { step: 2, action: "用AI设计简历筛选标准和评分模型", tool: "ChatGPT", output: "筛选标准" },
            { step: 3, action: "用AI设计结构化面试问题", tool: "ChatGPT", output: "面试问题" },
            { step: 4, action: "面试后用AI辅助整理面试评估", tool: "ChatGPT", output: "面试评估" },
            { step: 5, action: "人工最终决策", output: "录用决定" },
            { step: 6, action: "招聘效率提升案例整理上传平台", output: "案例提交" },
          ],
          estimatedTime: "每个岗位节省3-5小时"
        }
      ],
      tasks: [
        {
          title: "AI招聘实战",
          description: "用AI辅助完成一个岗位的完整招聘流程",
          difficulty: "intermediate",
          acceptanceCriteria: ["用AI生成JD和面试问题", "用AI辅助简历筛选", "招聘效率提升≥40%", "整理为案例上传平台通晒"],
          estimatedTime: "2周",
          deliverable: "《AI招聘案例》+ JD模板 + 面试题库 + 平台案例"
        }
      ],
      cases: [
        { caseId: "CASE-HR-001", title: "AI招聘效率提升50%", department: "人力资源中心", type: "internal", summary: "HR中心用ChatGPT辅助JD生成和面试问题设计，每个岗位的招聘准备时间从6小时缩短到3小时。AI生成的JD质量评分达到8/10", impact: "招聘准备效率提升50%，JD质量提升", url: "#" },
        { caseId: "CASE-IND-020", title: "Unilever AI招聘体系", department: "行业案例", type: "industry", summary: "联合利华利用AI进行简历筛选和视频面试分析，AI处理了80%的初筛工作，HR专注于终面和决策。招聘周期缩短50%", impact: "招聘周期缩短50%，多样性提升16%", url: "https://www.unilever.com/" },
        { caseId: "CASE-GEN-022", title: "LinkedIn AI招聘趋势报告", department: "通用案例", type: "general", summary: "LinkedIn 2025年报告显示，使用AI辅助招聘的企业，招聘效率提升40-60%，候选人体验提升30%。关键是AI处理重复性工作，HR专注于人的判断", impact: "AI招聘企业的招聘成本降低35%", url: "https://business.linkedin.com/talent-solutions" },
      ],
      keyTakeaways: [
        "AI招聘的核心是\"AI处理重复，HR处理判断\"",
        "JD生成和面试问题设计是AI最直接的提效场景",
        "AI简历筛选需要人工审核——避免算法偏见",
        "招聘模板（JD+面试题）是高裂变价值案例——跨岗位复用",
        "注意AI招聘的公平性和合规性——避免歧视性筛选"
      ]
    }
  },
  {
    id: "HR02",
    titleZh: "AI培训与组织发展",
    titleEn: "AI Training & Organization Development",
    descriptionZh: "利用AI优化培训体系：培训需求分析、课程设计、学习路径规划、效果评估、组织诊断",
    descriptionEn: "AI-powered L&D: training needs analysis, course design, learning path planning, effectiveness evaluation, org diagnosis",
    layer: "department", level: 2, maxLevel: 4, departments: ["hr"], pilotProjects: [], progress: 35,
    prerequisites: ["F02", "HR01"], tools: ["ChatGPT", "Claude"], tags: ["人力资源", "培训"],
    knowledge: {
      caseSubmissionPrompt: "请用以下结构提交你的AI培训/组织发展案例：\n\n【案例编号】自动生成\n【案例标题】一句话描述你的AI培训突破\n【培训环节】需求分析/课程设计/学习路径/效果评估/其他\n【AI前方式】原来如何做\n【AI后方式】使用AI后如何做\n【效果数据】培训效果变化\n【核心方法】你是如何用AI优化的\n【可复用性】该方法是否可供其他培训场景复用？",
      resources: [
        { title: "CUPSHE AI培训体系设计", type: "doc", url: "#", duration: "30min", source: "CUPSHE人力资源中心" },
        { title: "AI in Learning & Development", type: "article", url: "https://www.td.org/", duration: "20min", source: "ATD" },
      ],
      prompts: [
        {
          title: "培训课程设计",
          scenario: "为特定主题设计培训课程",
          prompt: "请为CUPSHE设计{培训主题}的培训课程：\n\n培训对象：{对象}\n培训目标：{目标}\n培训时长：{时长}\n培训形式：{形式}\n\n请设计：\n1. 课程大纲（模块+时间分配）\n2. 每个模块的学习目标和关键内容\n3. 互动环节设计（案例讨论/实操练习/小组活动）\n4. 评估方式（课前测/课后测/实践作业）\n5. 参考资料和延伸阅读\n6. 讲师备注和教学建议\n\n要求：\n- 实战导向，减少纯理论\n- 融入CUPSHE实际业务场景\n- 设计可衡量的学习成果",
          variables: ["培训主题", "对象", "目标", "时长", "形式"],
          expectedOutput: "完整的培训课程设计方案"
        }
      ],
      workflows: [
        {
          title: "AI培训设计工作流",
          scenario: "设计和交付一场培训",
          steps: [
            { step: 1, action: "用AI分析培训需求和目标受众", tool: "ChatGPT", output: "需求分析" },
            { step: 2, action: "用AI设计课程大纲和内容", tool: "ChatGPT/Claude", output: "课程设计" },
            { step: 3, action: "用AI生成培训材料和练习", tool: "ChatGPT", output: "培训材料" },
            { step: 4, action: "人工审核和定制化调整", output: "终稿" },
            { step: 5, action: "培训交付和效果评估", output: "评估报告" },
            { step: 6, action: "优秀培训案例整理上传平台", output: "案例提交" },
          ],
          estimatedTime: "1-2天（原来1周）"
        }
      ],
      tasks: [
        {
          title: "AI培训设计实战",
          description: "用AI设计并交付一场培训，评估效果",
          difficulty: "intermediate",
          acceptanceCriteria: ["用AI设计完整的培训课程", "实际交付培训", "学员满意度≥4/5", "整理为案例上传平台通晒"],
          estimatedTime: "2周",
          deliverable: "《AI培训设计案例》+ 课程材料 + 平台案例"
        }
      ],
      cases: [
        { caseId: "CASE-HR-002", title: "AI培训课程设计效率提升70%", department: "人力资源中心", type: "internal", summary: "HR中心用ChatGPT辅助设计AI技能培训课程，课程设计时间从1周缩短到2天。AI生成课程大纲、练习题和评估方案，HR专注于内容审核和定制化", impact: "培训设计效率提升70%，学员满意度4.6/5.0", url: "#" },
        { caseId: "CASE-GEN-023", title: "ATD AI培训趋势报告", department: "通用案例", type: "general", summary: "ATD报告显示AI在培训领域的三大应用：个性化学习路径（效果提升30%）、课程设计自动化（效率提升60%）、培训效果预测（准确率提升40%）", impact: "AI培训企业的培训ROI提升45%", url: "https://www.td.org/" },
      ],
      keyTakeaways: [
        "AI培训设计的核心是\"AI生成框架，人填充经验\"",
        "课程设计和材料生成是AI最直接的提效场景",
        "培训效果评估需要结合定量（测试分数）和定性（学员反馈）",
        "培训模板是高裂变价值案例——跨主题、跨部门复用"
      ]
    }
  },
  // ========== GM OFFICE (总经办) ==========
  {
    id: "GM01",
    titleZh: "AI行政与会议管理",
    titleEn: "AI Administration & Meeting Management",
    descriptionZh: "利用AI优化行政工作：会议纪要、日程管理、公文撰写、数据汇总、报告生成",
    descriptionEn: "AI-powered admin: meeting minutes, scheduling, document drafting, data aggregation, report generation",
    layer: "department", level: 2, maxLevel: 4, departments: ["gm-office"], pilotProjects: [], progress: 45,
    prerequisites: ["F02", "F03"], tools: ["ChatGPT", "Claude", "飞书"], tags: ["总经办", "行政"],
    knowledge: {
      caseSubmissionPrompt: "请用以下结构提交你的AI行政管理案例：\n\n【案例编号】自动生成\n【案例标题】一句话描述你的AI行政突破\n【行政环节】会议纪要/公文/报告/数据汇总/其他\n【AI前效率】原来完成该工作需要多长时间\n【AI后效率】使用AI后需要多长时间\n【核心方法】你是如何用AI优化的\n【可复用性】该方法是否可供其他行政场景复用？",
      resources: [
        { title: "CUPSHE总经办AI化方案", type: "doc", url: "#", duration: "25min", source: "CUPSHE总经办" },
        { title: "AI Office Productivity Guide", type: "article", url: "https://www.microsoft.com/en-us/microsoft-365/copilot", duration: "20min", source: "Microsoft" },
      ],
      prompts: [
        {
          title: "会议纪要智能生成",
          scenario: "会议结束后快速生成结构化会议纪要",
          prompt: "请根据以下会议录音/笔记生成结构化会议纪要：\n\n会议信息：\n- 主题：{主题}\n- 时间：{时间}\n- 参会人：{参会人}\n\n会议内容：\n{内容}\n\n请生成：\n1. 会议概要（3-5句话总结）\n2. 关键议题和讨论要点\n3. 决议事项（明确责任人和截止日期）\n4. 待办事项清单（按优先级排序）\n5. 下次会议安排\n\n格式要求：\n- 使用表格列出决议和待办\n- 标注每个待办的责任人和截止日期\n- 语言简洁专业",
          variables: ["主题", "时间", "参会人", "内容"],
          expectedOutput: "结构化会议纪要，含决议和待办清单"
        },
        {
          title: "周度/月度汇报生成",
          scenario: "快速生成各类汇报材料",
          prompt: "请根据以下数据和信息生成CUPSHE {报告类型}：\n\n报告周期：{周期}\n汇报对象：{对象}\n\n数据和信息：\n{数据}\n\n请生成：\n1. 摘要（3-5句话核心结论）\n2. 关键指标概览（表格形式）\n3. 重点工作进展\n4. 问题和风险\n5. 下期计划\n6. 需要决策/支持的事项\n\n风格要求：简洁、数据驱动、结论先行。",
          variables: ["报告类型", "周期", "对象", "数据"],
          expectedOutput: "结构化汇报材料"
        }
      ],
      workflows: [
        {
          title: "AI会议管理工作流",
          scenario: "日常会议的AI辅助管理",
          steps: [
            { step: 1, action: "会前用AI准备会议议程和材料", tool: "ChatGPT", output: "会议议程" },
            { step: 2, action: "会中记录关键信息和决议", output: "会议笔记" },
            { step: 3, action: "会后用AI生成结构化会议纪要", tool: "ChatGPT", output: "会议纪要" },
            { step: 4, action: "人工审核并发送给参会人", output: "终稿纪要" },
            { step: 5, action: "跟踪待办事项完成情况", output: "跟踪表" },
          ],
          estimatedTime: "每次会议节省30-60分钟"
        }
      ],
      tasks: [
        {
          title: "AI会议纪要实战",
          description: "用AI辅助生成一周的会议纪要，对比效率和质量",
          difficulty: "beginner",
          acceptanceCriteria: ["用AI生成至少3次会议的纪要", "纪要质量获得参会人认可", "效率提升≥50%", "整理为案例上传平台通晒"],
          estimatedTime: "1周",
          deliverable: "《AI会议纪要案例》+ 纪要模板 + 平台案例"
        }
      ],
      cases: [
        { caseId: "CASE-GM-001", title: "AI会议纪要效率提升65%", department: "总经办", type: "internal", summary: "总经办Claire用ChatGPT辅助生成会议纪要，将纪要生成时间从45分钟缩短到15分钟。AI自动提取决议和待办事项，减少遗漏", impact: "会议纪要效率提升65%，待办跟踪完成率提升20%", url: "#" },
        { caseId: "CASE-GEN-024", title: "Microsoft Copilot会议助手", department: "通用案例", type: "general", summary: "Microsoft Copilot的会议助手功能可以自动生成会议摘要、提取行动项、跟踪待办。使用企业的会议效率平均提升40%", impact: "会议效率提升40%，行动项遗漏减少60%", url: "https://www.microsoft.com/en-us/microsoft-365/copilot" },
      ],
      keyTakeaways: [
        "AI行政管理的核心是\"文字工作自动化\"——会议纪要、公文、报告",
        "会议纪要是最直接的AI提效场景——结构化、模板化、可复用",
        "AI生成的纪要需要人工审核——确保决议和待办的准确性",
        "行政模板是高裂变价值案例——所有部门都能复用"
      ]
    }
  },
  // ========== AUDIT (审计部) ==========
  {
    id: "AU01",
    titleZh: "AI审计与风控",
    titleEn: "AI Audit & Risk Control",
    descriptionZh: "利用AI辅助审计工作：数据审计、流程审计、风险识别、合规检查、审计报告生成",
    descriptionEn: "AI-powered audit: data audit, process audit, risk identification, compliance checks, audit report generation",
    layer: "department", level: 2, maxLevel: 4, departments: ["audit"], pilotProjects: [], progress: 28,
    prerequisites: ["F02", "F04"], tools: ["ChatGPT", "Claude", "Excel"], tags: ["审计", "风控"],
    knowledge: {
      caseSubmissionPrompt: "请用以下结构提交你的AI审计案例：\n\n【案例编号】自动生成\n【案例标题】一句话描述你的AI审计突破\n【审计环节】数据审计/流程审计/风险识别/报告/其他\n【AI前方式】原来如何审计\n【AI后方式】使用AI后如何审计\n【效果数据】审计效率/发现率变化\n【核心方法】你是如何用AI辅助审计的\n【可复用性】该方法是否可供其他审计场景复用？",
      resources: [
        { title: "AI审计应用指南", type: "doc", url: "#", duration: "30min", source: "CUPSHE审计部" },
        { title: "KPMG AI Audit Report", type: "article", url: "https://kpmg.com/", duration: "25min", source: "KPMG" },
      ],
      prompts: [
        {
          title: "数据异常检测分析",
          scenario: "审计过程中发现数据异常",
          prompt: "请分析以下业务数据中的异常情况：\n\n数据类型：{数据类型}\n数据范围：{时间范围}\n\n{数据}\n\n请从以下维度检测异常：\n1. 数值异常（偏离均值>2个标准差）\n2. 趋势异常（突然变化>30%）\n3. 关联异常（相关指标不一致）\n4. 模式异常（与历史模式不符）\n5. 合规异常（违反业务规则）\n\n每个异常标注：\n- 异常类型和严重程度\n- 可能原因分析\n- 建议的审计跟进动作\n\n注意：数据需脱敏处理后输入AI。",
          variables: ["数据类型", "时间范围", "数据"],
          expectedOutput: "数据异常检测报告，含原因分析和跟进建议"
        }
      ],
      workflows: [
        {
          title: "AI审计工作流",
          scenario: "季度内部审计",
          steps: [
            { step: 1, action: "用AI分析业务数据，检测异常", tool: "ChatGPT", output: "异常报告" },
            { step: 2, action: "AI生成审计问题清单和访谈问题", tool: "ChatGPT", output: "审计清单" },
            { step: 3, action: "执行审计访谈和验证", output: "审计证据" },
            { step: 4, action: "用AI生成审计报告初稿", tool: "ChatGPT/Claude", output: "报告初稿" },
            { step: 5, action: "人工审核并出具最终审计意见", output: "审计报告" },
          ],
          estimatedTime: "1-2周（原来3-4周）"
        }
      ],
      tasks: [
        {
          title: "AI审计实战",
          description: "用AI辅助完成一次审计项目",
          difficulty: "advanced",
          acceptanceCriteria: ["用AI辅助数据异常检测", "AI发现的异常与人工审计对比", "审计效率提升≥30%", "整理为案例上传平台通晒"],
          estimatedTime: "2周",
          deliverable: "《AI审计案例》+ 平台案例"
        }
      ],
      cases: [
        { caseId: "CASE-AU-001", title: "AI数据审计发现3个隐藏异常", department: "审计部", type: "internal", summary: "审计部用ChatGPT分析季度费用数据，AI发现了3个人工审计未注意到的异常模式：重复报销、异常时间点的大额支出、关联交易异常", impact: "审计发现率提升40%，审计效率提升35%", url: "#" },
        { caseId: "CASE-GEN-025", title: "KPMG AI审计报告", department: "通用案例", type: "general", summary: "KPMG报告显示AI审计可以将数据分析覆盖率从10%提升到100%，异常检测准确率提升50%。AI审计的核心价值是\"全量分析\"而非\"抽样分析\"", impact: "AI审计企业的审计覆盖率提升10倍", url: "https://kpmg.com/" },
      ],
      keyTakeaways: [
        "AI审计的核心价值是\"全量分析\"——AI可以分析100%的数据，人工只能抽样",
        "数据异常检测是AI审计最直接的应用",
        "AI审计需要严格的数据脱敏——审计数据高度敏感",
        "AI审计辅助发现问题，人工审计确认和判断"
      ]
    }
  },
  // ========== BOARD SECRETARY (董秘/投资者关系) ==========
  {
    id: "BS01",
    titleZh: "AI投资者关系管理",
    titleEn: "AI Investor Relations",
    descriptionZh: "利用AI辅助投资者关系：IR材料准备、行业分析、竞品对标、投资者问答准备、公告撰写",
    descriptionEn: "AI-powered IR: materials preparation, industry analysis, competitor benchmarking, investor Q&A prep, announcement drafting",
    layer: "department", level: 2, maxLevel: 4, departments: ["board-secretary"], pilotProjects: [], progress: 30,
    prerequisites: ["F02", "F04"], tools: ["ChatGPT", "Claude", "Perplexity"], tags: ["董秘", "IR"],
    knowledge: {
      caseSubmissionPrompt: "请用以下结构提交你的AI投资者关系案例：\n\n【案例编号】自动生成\n【案例标题】一句话描述你的AI IR突破\n【IR环节】材料准备/行业分析/竞品对标/Q&A/公告/其他\n【AI前效率】原来完成该工作需要多长时间\n【AI后效率】使用AI后需要多长时间\n【核心方法】你是如何用AI辅助IR工作的\n【可复用性】该方法是否可供其他IR场景复用？",
      resources: [
        { title: "AI辅助IR工作指南", type: "doc", url: "#", duration: "30min", source: "CUPSHE董秘办" },
        { title: "AI in Investor Relations", type: "article", url: "https://www.irmagazine.com/", duration: "20min", source: "IR Magazine" },
      ],
      prompts: [
        {
          title: "投资者Q&A准备",
          scenario: "业绩发布会或投资者路演前准备Q&A",
          prompt: "请帮我准备CUPSHE {场景}的投资者Q&A：\n\n公司近况：\n- 最近季度业绩：{业绩概述}\n- 重要事件：{事件}\n- 行业动态：{行业}\n\n请准备：\n1. 投资者可能问的Top 15问题（按可能性排序）\n2. 每个问题的建议回答（含关键数据点）\n3. 敏感问题的应对策略\n4. 主动传递的关键信息点\n5. 竞品对标数据（用于对比说明）\n\n要求：\n- 回答要数据驱动、正面积极\n- 敏感问题要有防守策略\n- 语言专业、符合上市公司规范",
          variables: ["场景", "业绩概述", "事件", "行业"],
          expectedOutput: "投资者Q&A准备文档，含15个问题和回答策略"
        }
      ],
      workflows: [
        {
          title: "AI IR材料准备工作流",
          scenario: "季度业绩发布前的材料准备",
          steps: [
            { step: 1, action: "用AI分析行业动态和竞品表现", tool: "ChatGPT/Perplexity", output: "行业分析" },
            { step: 2, action: "用AI准备投资者Q&A", tool: "ChatGPT", output: "Q&A文档" },
            { step: 3, action: "用AI辅助撰写业绩公告/新闻稿", tool: "ChatGPT/Claude", output: "公告初稿" },
            { step: 4, action: "法务和管理层审核", output: "终稿" },
          ],
          estimatedTime: "1-2天（原来3-5天）"
        }
      ],
      tasks: [
        {
          title: "AI IR准备实战",
          description: "用AI辅助准备一次投资者沟通材料",
          difficulty: "advanced",
          acceptanceCriteria: ["用AI准备投资者Q&A（≥10个问题）", "用AI辅助撰写行业分析", "材料质量获得管理层认可", "整理为案例上传平台通晒"],
          estimatedTime: "1周",
          deliverable: "《AI IR准备案例》+ 平台案例"
        }
      ],
      cases: [
        { caseId: "CASE-BS-001", title: "AI投资者Q&A准备效率提升60%", department: "董秘办", type: "internal", summary: "董秘办用ChatGPT准备季度业绩发布会的投资者Q&A，AI生成了20个可能问题和回答建议，其中15个在实际发布会中被问到", impact: "Q&A准备效率提升60%，问题覆盖率达75%", url: "#" },
        { caseId: "CASE-GEN-026", title: "IR Magazine AI趋势", department: "通用案例", type: "general", summary: "IR Magazine报告显示AI在投资者关系领域的应用正在快速增长，主要场景包括：Q&A准备（效率提升50%）、行业分析（覆盖面提升3倍）、公告撰写（效率提升40%）", impact: "AI IR企业的投资者沟通效率提升45%", url: "https://www.irmagazine.com/" },
      ],
      keyTakeaways: [
        "AI IR的核心是\"信息收集和材料准备的自动化\"",
        "投资者Q&A准备是AI最直接的价值——快速覆盖可能的问题",
        "IR材料需要严格的合规审核——AI生成内容必须经过法务确认",
        "行业分析和竞品对标是AI的强项——快速收集和结构化信息"
      ]
    }
  },
  // ========== PILOT PROJECTS (试点项目) ==========
  {
    id: "P01",
    titleZh: "营销AI试点项目",
    titleEn: "Marketing AI Pilot",
    descriptionZh: "营销中心AI全链路试点：广告投放AI化、社媒内容AI化、用户增长AI化，打通数据→洞察→执行→验证闭环",
    descriptionEn: "Marketing AI pilot: ad optimization, social media content, user growth - full data-to-action loop",
    layer: "system", level: 3, maxLevel: 5, departments: ["marketing"], pilotProjects: ["marketing-ai"], progress: 65,
    prerequisites: ["MK01", "MK02", "MK03"], tools: ["ChatGPT", "Claude", "Meta Ads", "Google Ads", "Klaviyo"], tags: ["试点", "营销"],
    knowledge: {
      caseSubmissionPrompt: "请用以下结构提交营销AI试点项目案例：\n\n【案例编号】自动生成\n【案例标题】一句话描述试点突破\n【试点模块】广告/社媒/增长/全链路\n【关键指标变化】ROAS/CTR/CVR/内容产出量/复购率等\n【AI科代表】谁在推动这个试点\n【核心方法】试点的核心AI方法和工具\n【可裂变性】该试点经验是否可以推广到其他部门\n【下一步计划】试点的下一阶段目标",
      resources: [
        { title: "CUPSHE营销AI试点方案", type: "doc", url: "#", duration: "45min", source: "CUPSHE CTO办公室" },
        { title: "营销AI试点阶段性报告", type: "doc", url: "#", duration: "30min", source: "CUPSHE营销中心" },
      ],
      prompts: [
        {
          title: "试点效果评估报告生成",
          scenario: "月度/季度试点效果评估",
          prompt: "请生成CUPSHE营销AI试点项目的{周期}效果评估报告：\n\n试点数据：\n{数据}\n\n请输出：\n1. 试点概述（目标、范围、时间线）\n2. 关键指标达成情况（目标 vs 实际）\n3. 各模块进展（广告AI化/社媒AI化/增长AI化）\n4. 成功案例Top 3（含数据佐证）\n5. 问题和挑战\n6. 下阶段计划和目标\n7. 可裂变推广的经验总结\n\n请用表格和数据可视化描述呈现。",
          variables: ["周期", "数据"],
          expectedOutput: "试点效果评估报告"
        }
      ],
      workflows: [
        {
          title: "营销AI试点推进工作流",
          scenario: "试点项目的日常推进和管理",
          steps: [
            { step: 1, action: "AI科代表收集本周各模块进展和数据", output: "周度数据" },
            { step: 2, action: "用AI分析数据趋势和效果变化", tool: "ChatGPT", output: "趋势分析" },
            { step: 3, action: "识别成功案例和待解决问题", output: "案例+问题" },
            { step: 4, action: "成功案例整理上传平台通晒", output: "案例通晒" },
            { step: 5, action: "问题升级或寻求支持", output: "问题跟踪" },
            { step: 6, action: "双周分享会汇报进展", output: "分享汇报" },
          ],
          estimatedTime: "每周2-3小时"
        }
      ],
      tasks: [
        {
          title: "营销AI试点月度复盘",
          description: "完成营销AI试点的月度复盘和效果评估",
          difficulty: "advanced",
          acceptanceCriteria: ["汇总月度各模块数据", "产出效果评估报告", "识别Top 3成功案例上传通晒", "制定下月优化计划"],
          estimatedTime: "2天",
          deliverable: "《营销AI试点月度报告》+ 案例通晒"
        }
      ],
      cases: [
        { caseId: "CASE-P01-001", title: "营销AI试点首月ROAS提升25%", department: "营销中心", type: "internal", summary: "营销AI试点首月，广告投放AI化模块ROAS提升25%，社媒内容AI化模块产出效率提升3倍，用户增长AI化模块邮件打开率提升20%", impact: "综合营销效率提升40%，月度营销ROI增加$25万", url: "#", fissionFrom: "CASE-MK-002" },
        { caseId: "CASE-P01-002", title: "SHEIN营销AI全链路试点经验", department: "行业参考", type: "industry", summary: "SHEIN在2024年推行营销AI全链路试点，覆盖广告投放、社媒运营、用户增长三大模块。试点3个月后ROAS提升35%，社媒内容产出量提升5倍，用户留存率提升15%。关键成功因素：数据驱动的A/B测试体系和AI科代表制度", impact: "营销效率整体提升50%，年度营销预算节省$200万", url: "https://www.marketingdive.com/news/shein-ai-marketing/" },
        { caseId: "CASE-P01-003", title: "McKinsey AI营销试点推进框架", department: "通用参考", type: "general", summary: "McKinsey提出的AI营销试点推进框架：Phase 1(1-2月)选定2-3个高ROI场景快速验证→Phase 2(3-4月)建立数据闭环和效果追踪→Phase 3(5-6月)规模化推广和团队赋能。强调'快速失败、快速学习'的试点文化", impact: "采用该框架的企业AI营销试点成功率提升60%", url: "https://www.mckinsey.com/capabilities/growth-marketing-and-sales/our-insights/ai-powered-marketing" },
      ],
      keyTakeaways: [
        "试点项目的核心是\"快速验证→数据说话→可复制推广\"",
        "AI科代表是试点成功的关键——需要既懂业务又懂AI的人来推动",
        "每个模块都要有明确的KPI和数据跟踪",
        "成功案例要及时通晒，形成正向激励和裂变效应",
        "试点经验的裂变推广是最终目标——从一个部门扩展到全公司"
      ]
    }
  },
  {
    id: "P02",
    titleZh: "创意AI试点项目",
    titleEn: "Creative AI Pilot",
    descriptionZh: "创意中心AI全链路试点：AI视觉生成、AI视频脚本、AI创意概念，打通创意→生产→投放→效果闭环",
    descriptionEn: "Creative AI pilot: visual generation, video scripts, creative concepts - full creative-to-performance loop",
    layer: "system", level: 3, maxLevel: 5, departments: ["creative"], pilotProjects: ["creative-ai"], progress: 55,
    prerequisites: ["CR01"], tools: ["Midjourney", "DALL-E", "ChatGPT", "Canva AI"], tags: ["试点", "创意"],
    knowledge: {
      caseSubmissionPrompt: "请用以下结构提交创意AI试点项目案例：\n\n【案例编号】自动生成\n【案例标题】一句话描述试点突破\n【试点模块】视觉生成/视频脚本/创意概念/全链路\n【关键指标变化】产出量/效率/质量评分/成本\n【AI科代表】谁在推动这个试点\n【核心Prompt/方法】试点的核心AI方法\n【可裂变性】该试点经验是否可以推广到其他部门\n【版权合规】AI生成内容的版权确认",
      resources: [
        { title: "CUPSHE创意AI试点方案", type: "doc", url: "#", duration: "40min", source: "CUPSHE CTO办公室" },
        { title: "创意AI试点Prompt模板库", type: "doc", url: "#", duration: "30min", source: "CUPSHE创意中心" },
      ],
      prompts: [
        {
          title: "创意AI试点效果评估",
          scenario: "月度试点效果评估",
          prompt: "请生成CUPSHE创意AI试点项目的{周期}效果评估报告：\n\n试点数据：\n- AI生成素材数量：{数量}\n- 平均生成时间：{时间}\n- 质量评分（设计师评）：{评分}/10\n- 实际使用率：{使用率}%\n- 成本节省：${成本}\n\n请输出：\n1. 试点概述和目标达成\n2. 各类素材的AI生成效果对比\n3. 质量分析（哪些类型AI做得好/不好）\n4. 成本效益分析\n5. Prompt模板库建设进展\n6. 下阶段计划\n\n请用数据驱动的方式呈现。",
          variables: ["周期", "数量", "时间", "评分", "使用率", "成本"],
          expectedOutput: "创意AI试点效果评估报告"
        }
      ],
      workflows: [
        {
          title: "创意AI试点推进工作流",
          scenario: "试点项目日常推进",
          steps: [
            { step: 1, action: "收集本周AI生成素材数据和设计师反馈", output: "周度数据" },
            { step: 2, action: "优化Prompt模板库（新增/改进）", tool: "Midjourney/ChatGPT", output: "Prompt更新" },
            { step: 3, action: "A/B测试AI素材 vs 传统素材的效果", output: "效果对比" },
            { step: 4, action: "优秀AI作品整理上传平台通晒", output: "案例通晒" },
            { step: 5, action: "双周分享会展示创意AI成果", output: "分享汇报" },
          ],
          estimatedTime: "每周3-4小时"
        }
      ],
      tasks: [
        {
          title: "创意AI试点月度复盘",
          description: "完成创意AI试点的月度复盘",
          difficulty: "advanced",
          acceptanceCriteria: ["汇总月度AI素材产出数据", "产出效果评估报告", "更新Prompt模板库", "Top 3作品上传通晒"],
          estimatedTime: "2天",
          deliverable: "《创意AI试点月度报告》+ Prompt模板库更新 + 案例通晒"
        }
      ],
      cases: [
        { caseId: "CASE-P02-001", title: "创意AI试点月产出800+素材", department: "创意中心", type: "internal", summary: "创意AI试点首月，AI辅助生成800+视觉素材（原来200张），设计师评分平均7.5/10，实际使用率65%。建立了30+个Prompt模板", impact: "素材产出量提升4倍，成本降低60%", url: "#", fissionFrom: "CASE-CR-002" },
        { caseId: "CASE-P02-002", title: "Canva AI创意工厂模式", department: "行业参考", type: "industry", summary: "Canva在2024年推出AI创意工厂模式，设计师使用AI生成初稿再精修，产出效率提升6倍。建立了品牌风格一致性的AI模板系统，确保AI生成内容符合品牌调性。关键：建立'AI生成→人工审核→品牌合规'三道关卡", impact: "设计团队人均产出提升5倍，品牌一致性评分提升30%", url: "https://www.canva.com/designschool/courses/ai-design/" },
        { caseId: "CASE-P02-003", title: "Adobe Firefly企业创意AI试点报告", department: "通用参考", type: "general", summary: "Adobe发布的企业创意AI试点白皮书：成功试点的三要素——1)明确AI与人类设计师的分工边界 2)建立品牌资产的AI训练数据集 3)版权合规的全流程管控。试点企业平均创意产出提升4-8倍，但质量提升需要3-6个月的Prompt优化积累", impact: "试点企业创意效率平均提升400%", url: "https://www.adobe.com/products/firefly/enterprise.html" },
      ],
      keyTakeaways: [
        "创意AI试点的核心是\"AI生成+人工精修\"的协作模式",
        "Prompt模板库是试点的核心资产——持续优化和积累",
        "质量评分和使用率是衡量AI素材价值的关键指标",
        "版权合规是创意AI的红线——所有商用素材需确认版权",
        "创意AI的裂变：Prompt模板可以跨品类、跨部门复用"
      ]
    }
  },
  {
    id: "P03",
    titleZh: "数据AI试点项目",
    titleEn: "Data AI Pilot",
    descriptionZh: "数据驱动AI试点：AI数据分析、智能报表、预测模型、数据驱动决策，打通数据→分析→洞察→行动闭环",
    descriptionEn: "Data AI pilot: AI analytics, smart reporting, predictive models, data-driven decisions - full data-to-action loop",
    layer: "system", level: 3, maxLevel: 5, departments: ["operations", "it"], pilotProjects: ["data-ai"], progress: 50,
    prerequisites: ["F04", "OP02"], tools: ["ChatGPT", "Claude", "Python", "Excel"], tags: ["试点", "数据"],
    knowledge: {
      caseSubmissionPrompt: "请用以下结构提交数据AI试点项目案例：\n\n【案例编号】自动生成\n【案例标题】一句话描述试点突破\n【试点模块】数据分析/智能报表/预测模型/决策支持\n【关键指标变化】分析效率/预测准确率/决策速度\n【AI科代表】谁在推动这个试点\n【核心方法】试点的核心AI分析方法\n【可裂变性】该试点经验是否可以推广到其他部门\n【数据安全】数据脱敏和安全措施",
      resources: [
        { title: "CUPSHE数据AI试点方案", type: "doc", url: "#", duration: "40min", source: "CUPSHE CTO办公室" },
        { title: "AI数据分析最佳实践", type: "doc", url: "#", duration: "30min", source: "CUPSHE IT中心" },
      ],
      prompts: [
        {
          title: "数据AI试点效果评估",
          scenario: "月度试点效果评估",
          prompt: "请生成CUPSHE数据AI试点项目的{周期}效果评估报告：\n\n试点数据：\n- AI分析报告数量：{数量}\n- 平均分析时间：{时间}\n- 洞察采纳率：{采纳率}%\n- 决策加速：{加速}%\n\n请输出：\n1. 试点概述和目标达成\n2. 各分析场景的AI效果对比\n3. AI洞察的质量和采纳情况\n4. 数据安全和脱敏执行情况\n5. 下阶段计划\n\n请用数据驱动的方式呈现。",
          variables: ["周期", "数量", "时间", "采纳率", "加速"],
          expectedOutput: "数据AI试点效果评估报告"
        }
      ],
      workflows: [
        {
          title: "数据AI试点推进工作流",
          scenario: "试点项目日常推进",
          steps: [
            { step: 1, action: "收集本周AI分析需求和完成情况", output: "周度数据" },
            { step: 2, action: "优化数据分析Prompt和模板", tool: "ChatGPT", output: "模板更新" },
            { step: 3, action: "跟踪AI洞察的采纳和效果", output: "效果跟踪" },
            { step: 4, action: "有价值的分析案例上传平台通晒", output: "案例通晒" },
            { step: 5, action: "双周分享会汇报数据AI成果", output: "分享汇报" },
          ],
          estimatedTime: "每周2-3小时"
        }
      ],
      tasks: [
        {
          title: "数据AI试点月度复盘",
          description: "完成数据AI试点的月度复盘",
          difficulty: "advanced",
          acceptanceCriteria: ["汇总月度AI分析数据", "产出效果评估报告", "更新分析Prompt模板", "Top 3洞察案例上传通晒"],
          estimatedTime: "2天",
          deliverable: "《数据AI试点月度报告》+ 分析模板更新 + 案例通晒"
        }
      ],
      cases: [
        { caseId: "CASE-P03-001", title: "数据AI试点分析效率提升3倍", department: "运营中心/IT中心", type: "internal", summary: "数据AI试点首月，AI辅助完成了30+份数据分析报告，平均分析时间从4小时缩短到1.5小时。AI洞察采纳率达60%，其中5个洞察直接影响了业务决策", impact: "数据分析效率提升3倍，决策速度提升50%", url: "#", fissionFrom: "CASE-OP-003" },
        { caseId: "CASE-P03-002", title: "Walmart数据AI驱动决策试点", department: "行业参考", type: "industry", summary: "Walmart在2024年推行数据AI试点，覆盖库存预测、定价优化、促销效果分析三大场景。AI预测准确率达到92%（原人工85%），定价优化带来3%的利润率提升。关键成功因素：建立数据质量管控体系和AI洞察的人工验证机制", impact: "数据驱动决策覆盖率从40%提升到75%，决策周期缩短60%", url: "https://corporate.walmart.com/news/innovation" },
        { caseId: "CASE-P03-003", title: "Gartner数据AI试点成熟度模型", department: "通用参考", type: "general", summary: "Gartner提出的数据AI试点成熟度模型：L1描述性分析→L2诊断性分析→L3预测性分析→L4规范性分析→L5自主决策。建议企业从L1-L2起步，6个月内达到L3。关键：数据治理是基础，AI分析的准确性取决于数据质量", impact: "采用该模型的企业数据AI试点成功率提升55%", url: "https://www.gartner.com/en/information-technology/insights/data-analytics" },
      ],
      keyTakeaways: [
        "数据AI试点的核心是\"AI分析+人类判断\"的决策模式",
        "数据脱敏是数据AI的前提——敏感数据不能直接输入AI",
        "AI洞察的采纳率是衡量价值的关键指标",
        "分析Prompt模板是试点的核心资产——跨部门复用价值高",
        "数据AI的裂变：分析方法可以从运营扩展到财务、供应链等所有数据密集型部门"
      ]
    }
  },
];

// ========== CASE VALUE EVALUATION MODEL (案例价值评估模型) ==========
export const caseValueModel = {
  dimensions: [
    { id: "originality", name: "原创价值", weight: 25, description: "案例的原创性和创新程度", scoring: "L1(1-2): 简单应用已有Prompt | L2(3-4): 优化改进已有方法 | L3(5-6): 创新性应用 | L4(7-8): 突破性方法 | L5(9-10): 行业首创" },
    { id: "impact", name: "效果量化", weight: 25, description: "案例产生的可量化业务效果", scoring: "L1(1-2): 效率提升<10% | L2(3-4): 提升10-30% | L3(5-6): 提升30-50% | L4(7-8): 提升50-100% | L5(9-10): 提升>100%或重大突破" },
    { id: "fission", name: "裂变复用价值", weight: 30, description: "案例被其他部门/场景复用的次数和效果", scoring: "L1(1-2): 仅本人使用 | L2(3-4): 部门内复用 | L3(5-6): 跨部门复用1-2次 | L4(7-8): 跨部门复用3-5次 | L5(9-10): 全公司级复用" },
    { id: "popularity", name: "通晒投票热度", weight: 20, description: "在平台通晒中获得的投票和关注度", scoring: "L1(1-2): <5票 | L2(3-4): 5-15票 | L3(5-6): 15-30票 | L4(7-8): 30-50票 | L5(9-10): >50票" },
  ],
  totalScore: 100,
  levels: [
    { level: "Bronze", range: "0-30", description: "基础案例，鼓励继续探索" },
    { level: "Silver", range: "31-50", description: "优秀案例，值得部门内推广" },
    { level: "Gold", range: "51-70", description: "金牌案例，值得跨部门推广" },
    { level: "Platinum", range: "71-85", description: "白金案例，全公司级标杆" },
    { level: "Diamond", range: "86-100", description: "钻石案例，行业级标杆" },
  ],
  fissionBonus: "当案例被其他部门复用并产生效果时，原案例和复用案例都获得额外加分。复用案例需标注\"基于CASE-XXX裂变\"，原案例的裂变复用价值维度自动+2分/次复用",
};

// ========== BIWEEKLY LEARNING SCHEDULE (双周学习计划) ==========
export type SprintPhase = "foundation" | "pilot-deep" | "department-expand" | "advanced" | "review";
export interface BiweeklySprint {
  sprint: number;
  startDate: string;
  endDate: string;
  skillId: string;
  theme: string;
  phase: SprintPhase;
  targetDepartments: string[];
  aiChampionRole: string; // AI科代表在本Sprint的职责
  caseTarget: number; // 本Sprint案例产出目标数
  sharingTheme: string; // 双周分享会主题
  milestones: string[];
  closedLoop: string; // 闭环机制描述
}

export const sprintPhaseConfig: Record<SprintPhase, { zh: string; en: string; color: string }> = {
  "foundation": { zh: "全员基础", en: "Foundation", color: "bg-blue-100 text-blue-800" },
  "pilot-deep": { zh: "试点深化", en: "Pilot Deep", color: "bg-orange-100 text-orange-800" },
  "department-expand": { zh: "部门扩展", en: "Dept Expand", color: "bg-green-100 text-green-800" },
  "advanced": { zh: "进阶提升", en: "Advanced", color: "bg-purple-100 text-purple-800" },
  "review": { zh: "复盘总结", en: "Review", color: "bg-red-100 text-red-800" },
};

export const biweeklySchedule: BiweeklySprint[] = [
  // ===== Phase 1: 全员基础实战 (Sprint 1-4, 3/30 - 5/22) =====
  {
    sprint: 1, startDate: "2026-03-30", endDate: "2026-04-10", skillId: "F01",
    theme: "用AI写一封让老板满意的邮件", phase: "foundation", targetDepartments: ["all"],
    aiChampionRole: "收集部门内3个高频邮件/汇报场景，带领团队用ChatGPT/Claude逐一实操，对比AI前后效果",
    caseTarget: 14, sharingTheme: "AI写作初体验——谁的邮件/汇报改造最惊艳？",
    milestones: ["全员注册并登录至少1个AI工具(ChatGPT/Claude/Kimi)", "每人用AI完成1封真实业务邮件或1份周报", "每中心提交1个AI写作前后对比案例"],
    closedLoop: "场景：日常邮件/周报/汇报→AI科代表收集部门高频写作场景→全员实操AI改写→截图对比前后效果→上传平台案例(用公司级Prompt)→通晒投票→双周分享会"
  },
  {
    sprint: 2, startDate: "2026-04-13", endDate: "2026-04-24", skillId: "F02",
    theme: "用Prompt让AI变成你的专属助理", phase: "foundation", targetDepartments: ["all"],
    aiChampionRole: "组织部门Prompt实战工作坊：每人带1个真实业务问题，现场用Prompt框架(角色+任务+约束+输出格式)改造",
    caseTarget: 28, sharingTheme: "最佳业务Prompt评选——谁调教AI最有一套？",
    milestones: ["全员掌握CRISPE/CO-STAR Prompt框架", "每人提交3个本岗位高频业务Prompt", "各部门AI科代表正式任命并公示"],
    closedLoop: "场景：岗位高频任务→AI科代表组织Prompt工作坊→每人用框架写3个业务Prompt→互相测试打分→优秀Prompt沉淀到平台Prompt库→通晒投票→双周分享会评选部门最佳Prompt"
  },
  {
    sprint: 3, startDate: "2026-04-27", endDate: "2026-05-08", skillId: "F03",
    theme: "AI帮你做PPT/Excel/会议纪要", phase: "foundation", targetDepartments: ["all"],
    aiChampionRole: "收集部门Top 5重复性办公任务(PPT/Excel/会议纪要/翻译/排期)，逐一用AI工具攻破，录制操作视频",
    caseTarget: 14, sharingTheme: "AI办公提效PK——谁省的时间最多？(附效率计时)",
    milestones: ["全员用AI完成1个真实办公任务(PPT/Excel/会议纪要任选)", "各部门建立AI办公模板库(至少5个模板)", "效率对比数据：AI前耗时 vs AI后耗时"],
    closedLoop: "场景：PPT/Excel/会议纪要→AI科代表收集部门重复任务→逐一用AI攻破并计时→产出效率对比案例(含截图+计时)→上传平台→通晒投票→双周分享会PK"
  },
  {
    sprint: 4, startDate: "2026-05-11", endDate: "2026-05-22", skillId: "F04",
    theme: "用AI做一次真实的业务数据分析", phase: "foundation", targetDepartments: ["all"],
    aiChampionRole: "带领部门用AI分析一份真实业务数据(销售/流量/库存/客诉)，从数据清洗到洞察输出全流程",
    caseTarget: 14, sharingTheme: "AI数据分析实战——从Excel到洞察只需10分钟",
    milestones: ["全员用AI完成1次真实数据分析(脱敏后)", "各部门识别Top 3 AI分析场景并建立模板", "数据安全脱敏规范培训完成"],
    closedLoop: "场景：业务数据分析→AI科代表准备脱敏数据集→全员实操AI分析→产出洞察报告→沉淀分析Prompt模板→通晒投票→双周分享会展示洞察"
  },
  // ===== Phase 2: 三大试点深化 (Sprint 5-8, 5/25 - 7/17) =====
  {
    sprint: 5, startDate: "2026-05-25", endDate: "2026-06-05", skillId: "MK01",
    theme: "AI写广告文案——ROAS提升实战", phase: "pilot-deep", targetDepartments: ["marketing"],
    aiChampionRole: "营销AI科代表选取3个在投广告组，用AI生成5版替代文案，跑A/B测试对比ROAS",
    caseTarget: 5, sharingTheme: "营销AI试点首战——AI文案 vs 人工文案ROAS对决",
    milestones: ["选取3个广告组进行AI文案A/B测试", "产出ROAS对比数据报告", "沉淀广告文案AI生成SOP"],
    closedLoop: "场景：广告文案优化→AI科代表选广告组→AI生成替代文案→投放A/B测试→收集ROAS数据→产出对比案例→全公司通晒→其他部门可裂变复用文案Prompt→双周分享会"
  },
  {
    sprint: 6, startDate: "2026-06-08", endDate: "2026-06-19", skillId: "CR01",
    theme: "AI生成商品主图——从Brief到成图", phase: "pilot-deep", targetDepartments: ["creative"],
    aiChampionRole: "创意AI科代表选取5个SKU，用Midjourney/DALL-E从设计Brief到成图全流程标准化",
    caseTarget: 5, sharingTheme: "创意AI试点——AI主图 vs 摄影主图盲测投票",
    milestones: ["5个SKU完成AI主图生成", "建立品牌视觉一致性检查Checklist", "组织全公司AI图 vs 实拍图盲测投票"],
    closedLoop: "场景：商品主图生成→AI科代表选SKU→AI生成主图→品牌一致性检查→盲测投票→产出AI视觉案例→沉淀视觉Prompt模板→全公司通晒→营销/多渠道可裂变复用→双周分享会"
  },
  {
    sprint: 7, startDate: "2026-06-22", endDate: "2026-07-03", skillId: "OP01",
    theme: "AI客服话术——响应速度翻倍", phase: "pilot-deep", targetDepartments: ["operations"],
    aiChampionRole: "运营AI科代表梳理Top 20高频客诉场景，用AI生成标准回复模板，测试响应时间",
    caseTarget: 5, sharingTheme: "运营AI试点——客服响应从5分钟到30秒",
    milestones: ["梳理Top 20高频客诉场景", "AI生成标准回复模板库", "响应时间对比数据(AI前 vs AI后)"],
    closedLoop: "场景：客服回复→AI科代表梳理高频场景→AI生成回复模板→客服团队实测→收集响应时间数据→产出效率案例→沉淀FAQ模板→全公司通晒→双周分享会"
  },
  {
    sprint: 8, startDate: "2026-07-06", endDate: "2026-07-17", skillId: "OP02",
    theme: "AI商品分析——从Excel到自动化洞察", phase: "pilot-deep", targetDepartments: ["operations", "it"],
    aiChampionRole: "运营+IT AI科代表联合，将1个月度商品分析报告从手工Excel改造为AI自动化流程",
    caseTarget: 4, sharingTheme: "数据AI试点——月度商品分析从3天到3小时",
    milestones: ["选取1份月度商品分析报告进行AI改造", "建立AI分析自动化工作流", "产出效率对比(3天→3小时)"],
    closedLoop: "场景：月度商品分析→AI科代表联合选报告→AI改造分析流程→对比效率→产出案例→沉淀分析模板→全公司通晒→财务/供应链可裂变复用→双周分享会"
  },
  // ===== Phase 3: 部门扩展实战 (Sprint 9-15, 7/20 - 10/23) =====
  {
    sprint: 9, startDate: "2026-07-20", endDate: "2026-07-31", skillId: "MC01",
    theme: "AI优化Amazon/TikTok Listing——转化率提升", phase: "department-expand", targetDepartments: ["multi-channel"],
    aiChampionRole: "多渠道AI科代表选取10个低转化Listing，用AI重写标题/五点/A+，跑A/B测试",
    caseTarget: 3, sharingTheme: "多渠道Listing AI改造——转化率提升实录",
    milestones: ["10个Listing完成AI改写", "A/B测试数据收集(2周)", "产出Listing优化Prompt模板"],
    closedLoop: "场景：Listing优化→AI科代表选低转化Listing→AI重写→A/B测试→收集转化数据→产出案例→沉淀模板→通晒投票→营销/产品可裂变复用→双周分享会"
  },
  {
    sprint: 10, startDate: "2026-08-03", endDate: "2026-08-14", skillId: "PD01",
    theme: "AI选品——用AI发现下一个爆款", phase: "department-expand", targetDepartments: ["product"],
    aiChampionRole: "产品AI科代表用AI分析Google Trends+社媒数据，产出1份AI选品报告，与传统选品结果对比",
    caseTarget: 3, sharingTheme: "产品AI选品——AI推荐 vs 买手直觉谁更准？",
    milestones: ["用AI完成1份完整选品报告", "AI选品 vs 传统选品结果对比", "建立AI趋势分析自动化工作流"],
    closedLoop: "场景：新品选品→AI科代表用AI分析趋势→产出选品报告→与买手判断对比→产出案例→沉淀选品Prompt→通晒投票→营销/供应链可裂变复用→双周分享会"
  },
  {
    sprint: 11, startDate: "2026-08-17", endDate: "2026-08-28", skillId: "SC01",
    theme: "AI供应商评估——从人工打分到智能评级", phase: "department-expand", targetDepartments: ["supply-chain"],
    aiChampionRole: "供应链AI科代表将供应商评估表AI化，用AI自动分析供应商历史数据并生成评级报告",
    caseTarget: 3, sharingTheme: "供应链AI——供应商评估从2天到2小时",
    milestones: ["5家供应商完成AI评估试点", "AI评级 vs 人工评级一致性验证", "建立供应商AI评估模板"],
    closedLoop: "场景：供应商评估→AI科代表准备历史数据→AI生成评级报告→与人工评级对比→产出案例→沉淀评估模板→通晒投票→采购可裂变复用→双周分享会"
  },
  {
    sprint: 12, startDate: "2026-08-31", endDate: "2026-09-11", skillId: "IT01",
    theme: "AI写代码——Copilot/Cursor全员实战", phase: "department-expand", targetDepartments: ["it"],
    aiChampionRole: "IT AI科代表主导Copilot/Cursor全员部署，每人用AI完成1个真实开发任务并记录效率",
    caseTarget: 3, sharingTheme: "IT AI开发——代码效率提升实录(附代码对比)",
    milestones: ["IT全员部署Copilot/Cursor", "每人用AI完成1个真实开发任务", "产出开发效率对比数据"],
    closedLoop: "场景：代码开发→AI科代表部署工具→全员实操→记录效率数据→产出案例(含代码对比)→沉淀AI开发规范→通晒投票→双周分享会"
  },
  {
    sprint: 13, startDate: "2026-09-14", endDate: "2026-09-25", skillId: "FN01",
    theme: "AI做月报——财务分析效率革命", phase: "department-expand", targetDepartments: ["finance"],
    aiChampionRole: "财务AI科代表将1份月度财务分析报告AI化，从数据提取到异常标注到报告生成全流程",
    caseTarget: 3, sharingTheme: "财务AI——月报从3天到3小时的秘密",
    milestones: ["1份月度财务报告完成AI改造", "建立财务分析Prompt模板库", "异常检测准确率验证"],
    closedLoop: "场景：月度财务报告→AI科代表选报告→AI改造全流程→对比效率→产出案例→沉淀财务模板→通晒投票→运营/供应链可裂变复用→双周分享会"
  },
  {
    sprint: 14, startDate: "2026-09-28", endDate: "2026-10-09", skillId: "HR01",
    theme: "AI写JD/筛简历——招聘效率翻倍", phase: "department-expand", targetDepartments: ["hr"],
    aiChampionRole: "HR AI科代表用AI改造3个在招岗位的JD+简历筛选流程，对比招聘效率",
    caseTarget: 3, sharingTheme: "HR AI——从JD到简历筛选的AI全流程",
    milestones: ["3个岗位JD完成AI改写", "AI简历筛选 vs 人工筛选效率对比", "建立JD/面试题AI模板库"],
    closedLoop: "场景：招聘流程→AI科代表选岗位→AI改写JD+筛简历→对比效率→产出案例→沉淀JD/面试模板→通晒投票→各部门招聘可裂变复用→双周分享会"
  },
  {
    sprint: 15, startDate: "2026-10-12", endDate: "2026-10-23", skillId: "LG01",
    theme: "AI物流异常预警——从被动救火到主动预防", phase: "department-expand", targetDepartments: ["logistics"],
    aiChampionRole: "物流AI科代表用AI分析历史物流数据，建立异常预警模型，对比预警准确率",
    caseTarget: 3, sharingTheme: "物流AI——异常预警从0到1的突破",
    milestones: ["历史物流数据AI分析完成", "异常预警模型v1.0建立", "预警准确率验证"],
    closedLoop: "场景：物流异常管理→AI科代表准备历史数据→AI建立预警模型→验证准确率→产出案例→沉淀物流模板→通晒投票→供应链可裂变复用→双周分享会"
  },
  // ===== Phase 4: 进阶提升+安全合规 (Sprint 16-18, 10/26 - 12/04) =====
  {
    sprint: 16, startDate: "2026-10-26", endDate: "2026-11-06", skillId: "F05",
    theme: "AI安全红线——你踩过哪些坑？", phase: "advanced", targetDepartments: ["all"],
    aiChampionRole: "各部门AI科代表收集本部门AI使用中的安全隐患案例(数据泄露/幻觉/版权)，组织安全攻防演练",
    caseTarget: 14, sharingTheme: "AI安全合规——踩过的坑与避坑指南",
    milestones: ["全员完成AI安全培训(含测试)", "各部门提交AI安全隐患案例", "CUPSHE AI使用安全规范v1.0发布"],
    closedLoop: "场景：AI安全合规→AI科代表收集安全隐患→组织攻防演练→产出避坑案例→沉淀安全规范→通晒投票→双周分享会"
  },
  {
    sprint: 17, startDate: "2026-11-09", endDate: "2026-11-20", skillId: "F06",
    theme: "跨部门AI协作——打破信息孤岛", phase: "advanced", targetDepartments: ["all"],
    aiChampionRole: "各部门AI科代表联合发起1个跨部门AI协作项目(如：营销+创意联合AI内容生产线)",
    caseTarget: 7, sharingTheme: "跨部门AI协作——从孤岛到生态的7个故事",
    milestones: ["至少3个跨部门AI协作项目启动", "各项目产出协作流程SOP", "跨部门案例裂变数量统计"],
    closedLoop: "场景：跨部门协作→AI科代表联合发起项目→多部门协同实操→产出协作案例→沉淀协作SOP→通晒投票→双周分享会"
  },
  {
    sprint: 18, startDate: "2026-11-23", endDate: "2026-12-04", skillId: "MK02",
    theme: "AI个性化营销——千人千面实战", phase: "advanced", targetDepartments: ["marketing", "operations", "multi-channel"],
    aiChampionRole: "营销+运营+多渠道AI科代表联合，用AI构建用户分群→个性化内容→自动化触达的完整链路",
    caseTarget: 4, sharingTheme: "AI增长进阶——个性化营销与复购率提升实录",
    milestones: ["完成AI用户分群模型", "个性化内容生成链路跑通", "复购率/转化率对比数据"],
    closedLoop: "场景：个性化营销→AI科代表联合构建链路→实操用户分群+内容生成+触达→收集转化数据→产出案例→沉淀增长模板→全公司通晒→可裂变复用→双周分享会"
  },
  // ===== Phase 5: 年度复盘 (Sprint 19, 12/07 - 12/18) =====
  {
    sprint: 19, startDate: "2026-12-07", endDate: "2026-12-18", skillId: "MK03",
    theme: "年度AI转型成果大会——最佳案例颁奖", phase: "review", targetDepartments: ["all"],
    aiChampionRole: "各部门AI科代表汇总本部门全年AI成果(案例数/积分/裂变数/效率提升数据)，提名年度最佳",
    caseTarget: 14, sharingTheme: "2026 CUPSHE AI转型年度成果大会——颁奖+2027规划",
    milestones: ["各部门AI成果数据汇总", "年度最佳AI案例/最佳AI科代表/最佳裂变案例评选", "2027年AI转型规划v1.0"],
    closedLoop: "全年案例回顾→AI科代表汇总部门成果→评选年度最佳(案例/科代表/裂变)→沉淀年度知识库→全公司通晒投票→年度大会颁奖→制定2027规划"
  },
];
