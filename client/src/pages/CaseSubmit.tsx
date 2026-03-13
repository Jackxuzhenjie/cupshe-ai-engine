/*
 * CaseSubmit — Case submission portal with multi-source upload
 * Supports: Feishu docs, local files, web URLs, videos, Agent/Prompt links
 */
import { useState, useCallback } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import { useLocation } from "wouter";
import { toast } from "sonner";
import {
  FileText, Link2, Video, Bot, Sparkles, Upload, Plus, X, ChevronRight,
  ChevronDown, Save, Send, ArrowLeft, Paperclip, Globe, FileUp, Zap, GitBranch
} from "lucide-react";

// Business scenarios for classification
const BUSINESS_SCENARIOS = [
  { zh: "商品运营", en: "Product Operations" },
  { zh: "商品分析", en: "Product Analysis" },
  { zh: "商品企划", en: "Product Planning" },
  { zh: "广告创意", en: "Ad Creative" },
  { zh: "广告投放", en: "Ad Placement" },
  { zh: "用户洞察", en: "User Insights" },
  { zh: "内容营销", en: "Content Marketing" },
  { zh: "社媒运营", en: "Social Media" },
  { zh: "客服支持", en: "Customer Support" },
  { zh: "数据分析", en: "Data Analysis" },
  { zh: "供应链", en: "Supply Chain" },
  { zh: "设计创意", en: "Design & Creative" },
];

const AI_TOOLS = ["ChatGPT", "Claude", "Midjourney", "DALL-E", "Stable Diffusion", "Copilot", "Gemini", "DeepSeek", "Kimi", "通义千问", "文心一言", "Custom Agent"];

const VALUE_TYPES = [
  { value: "efficiency", zh: "效率提升", en: "Efficiency" },
  { value: "productivity", zh: "产出提升", en: "Productivity" },
  { value: "cost", zh: "成本节约", en: "Cost Saving" },
  { value: "revenue", zh: "收入增长", en: "Revenue" },
  { value: "customer_value", zh: "客户价值", en: "Customer Value" },
];

const MATURITY_LEVELS = [
  { value: "L1", zh: "L1 个人效率", en: "L1 Personal Efficiency" },
  { value: "L2", zh: "L2 团队效率", en: "L2 Team Efficiency" },
  { value: "L3", zh: "L3 流程自动化", en: "L3 Process Automation" },
  { value: "L4", zh: "L4 AI决策", en: "L4 AI Decision" },
  { value: "L5", zh: "L5 AI驱动业务", en: "L5 AI-Driven Business" },
];

interface Attachment {
  type: "feishu_doc" | "local_file" | "web_url" | "video" | "agent" | "prompt";
  url: string;
  title: string;
  fileKey?: string;
  mimeType?: string;
}

interface PlaybookStep {
  step: number;
  title: string;
  description: string;
  duration?: string;
  tools?: string[];
}

export default function CaseSubmit() {
  const { t, lang } = useLanguage();
  const { user } = useAuth();
  const [, navigate] = useLocation();

  // Form state
  const [title, setTitle] = useState("");
  const [titleEn, setTitleEn] = useState("");
  const [summary, setSummary] = useState("");
  const [summaryEn, setSummaryEn] = useState("");
  const [businessScenario, setBusinessScenario] = useState("");
  const [selectedTools, setSelectedTools] = useState<string[]>([]);
  const [aiValueType, setAiValueType] = useState("");
  const [impactMetric, setImpactMetric] = useState("");
  const [efficiencyGain, setEfficiencyGain] = useState("");
  const [maturityLevel, setMaturityLevel] = useState<"L1"|"L2"|"L3"|"L4"|"L5">("L1");
  const [replicability, setReplicability] = useState<"low"|"medium"|"high">("medium");

  // Value Scorecard
  const [effBefore, setEffBefore] = useState("");
  const [effAfter, setEffAfter] = useState("");
  const [effMultiplier, setEffMultiplier] = useState("");
  const [prodBefore, setProdBefore] = useState("");
  const [prodAfter, setProdAfter] = useState("");
  const [prodMultiplier, setProdMultiplier] = useState("");
  const [costDesc, setCostDesc] = useState("");
  const [costSaving, setCostSaving] = useState("");
  const [revDesc, setRevDesc] = useState("");
  const [revImpact, setRevImpact] = useState("");
  const [custDesc, setCustDesc] = useState("");
  const [custImpact, setCustImpact] = useState("");

  // Scoring
  const [businessValueScore, setBusinessValueScore] = useState(70);
  const [replicabilityScore, setReplicabilityScore] = useState(70);
  const [innovationScore, setInnovationScore] = useState(70);
  const [viralityScore, setViralityScore] = useState(70);

  // Attachments
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const [showAttachmentModal, setShowAttachmentModal] = useState(false);
  const [attachmentType, setAttachmentType] = useState<Attachment["type"]>("web_url");
  const [attachmentUrl, setAttachmentUrl] = useState("");
  const [attachmentTitle, setAttachmentTitle] = useState("");

  // Playbook
  const [playbookSteps, setPlaybookSteps] = useState<PlaybookStep[]>([
    { step: 1, title: "", description: "" },
  ]);

  // Sections toggle
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    basic: true,
    value: true,
    scoring: false,
    attachments: true,
    playbook: false,
  });

  const toggleSection = (key: string) => {
    setExpandedSections(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const createCase = trpc.cases.create.useMutation({
    onSuccess: () => {
      toast.success(t("案例提交成功！", "Case submitted successfully!"));
      navigate("/cases");
    },
    onError: (err) => {
      toast.error(t("提交失败: ", "Submit failed: ") + err.message);
    },
  });

  const handleAddAttachment = () => {
    if (!attachmentUrl || !attachmentTitle) return;
    setAttachments(prev => [...prev, {
      type: attachmentType,
      url: attachmentUrl,
      title: attachmentTitle,
    }]);
    setAttachmentUrl("");
    setAttachmentTitle("");
    setShowAttachmentModal(false);
  };

  const handleRemoveAttachment = (index: number) => {
    setAttachments(prev => prev.filter((_, i) => i !== index));
  };

  const addPlaybookStep = () => {
    setPlaybookSteps(prev => [...prev, {
      step: prev.length + 1,
      title: "",
      description: "",
    }]);
  };

  const updatePlaybookStep = (index: number, field: keyof PlaybookStep, value: string) => {
    setPlaybookSteps(prev => prev.map((s, i) => i === index ? { ...s, [field]: value } : s));
  };

  const removePlaybookStep = (index: number) => {
    setPlaybookSteps(prev => prev.filter((_, i) => i !== index).map((s, i) => ({ ...s, step: i + 1 })));
  };

  const handleFileUpload = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    // Convert to base64 for upload
    const reader = new FileReader();
    reader.onload = () => {
      const base64 = (reader.result as string).split(",")[1];
      setAttachments(prev => [...prev, {
        type: "local_file",
        url: "", // Will be filled after upload
        title: file.name,
        mimeType: file.type,
        fileKey: base64, // Temporarily store base64
      }]);
      toast.success(t("文件已添加", "File added"));
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  }, [t]);

  const handleSubmit = (status: "draft" | "pending_review") => {
    if (!title.trim()) {
      toast.error(t("请输入案例标题", "Please enter case title"));
      return;
    }

    const valueScorecard: any = {};
    if (effBefore || effAfter) valueScorecard.efficiency = { before: effBefore, after: effAfter, multiplier: effMultiplier };
    if (prodBefore || prodAfter) valueScorecard.productivity = { before: prodBefore, after: prodAfter, multiplier: prodMultiplier };
    if (costDesc) valueScorecard.cost = { description: costDesc, saving: costSaving };
    if (revDesc) valueScorecard.revenue = { description: revDesc, impact: revImpact };
    if (custDesc) valueScorecard.customerValue = { description: custDesc, impact: custImpact };

    const validSteps = playbookSteps.filter(s => s.title.trim());

    createCase.mutate({
      title,
      titleEn: titleEn || undefined,
      summary,
      summaryEn: summaryEn || undefined,
      businessScenario,
      aiTools: selectedTools,
      aiValueType,
      impactMetric,
      efficiencyGain,
      maturityLevel,
      replicability,
      valueScorecard: Object.keys(valueScorecard).length > 0 ? valueScorecard : undefined,
      businessValueScore,
      replicabilityScore,
      innovationScore,
      viralityScore,
      attachments: attachments.length > 0 ? attachments : undefined,
      playbookSteps: validSteps.length > 0 ? validSteps : undefined,
      status,
    });
  };

  const totalScore = Math.round(
    businessValueScore * 0.4 + replicabilityScore * 0.3 + innovationScore * 0.2 + viralityScore * 0.1
  );

  const attachmentTypeConfig = [
    { type: "feishu_doc" as const, icon: <FileText size={16} />, zh: "飞书云文档", en: "Feishu Doc", placeholder: "https://xxx.feishu.cn/docx/..." },
    { type: "web_url" as const, icon: <Globe size={16} />, zh: "网络链接", en: "Web URL", placeholder: "https://..." },
    { type: "local_file" as const, icon: <FileUp size={16} />, zh: "本地文件", en: "Local File", placeholder: "" },
    { type: "video" as const, icon: <Video size={16} />, zh: "视频链接", en: "Video", placeholder: "https://..." },
    { type: "agent" as const, icon: <Bot size={16} />, zh: "关联Agent", en: "Link Agent", placeholder: "Agent名称或ID" },
    { type: "prompt" as const, icon: <Sparkles size={16} />, zh: "关联Prompt", en: "Link Prompt", placeholder: "Prompt名称或ID" },
  ];

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <button onClick={() => navigate("/cases")} className="p-2 rounded-lg hover:bg-muted transition-colors">
          <ArrowLeft size={20} className="text-muted-foreground" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-foreground">{t("提交AI案例", "Submit AI Case")}</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            {t("分享你的AI应用案例，帮助团队复制成功经验", "Share your AI use case to help the team replicate success")}
          </p>
        </div>
      </div>

      {/* Form Sections */}
      <div className="space-y-4">
        {/* Section: Basic Info */}
        <div className="bg-card rounded-xl border border-border overflow-hidden">
          <button onClick={() => toggleSection("basic")} className="w-full flex items-center justify-between p-4 hover:bg-muted/30 transition-colors">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                <FileText size={16} className="text-primary" />
              </div>
              <span className="font-semibold text-foreground">{t("基本信息", "Basic Information")}</span>
              <span className="text-xs text-red-500">*</span>
            </div>
            {expandedSections.basic ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
          </button>
          {expandedSections.basic && (
            <div className="px-4 pb-4 space-y-4">
              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">{t("案例标题", "Case Title")} <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  placeholder={t("例如：AI让商品分析效率提升18倍", "e.g., AI improves product analysis efficiency by 18x")}
                  className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">{t("英文标题（可选）", "English Title (optional)")}</label>
                <input
                  type="text"
                  value={titleEn}
                  onChange={e => setTitleEn(e.target.value)}
                  placeholder="e.g., AI Boosts Product Analysis Efficiency by 18x"
                  className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                />
              </div>
              {/* Summary */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">{t("案例描述", "Case Description")}</label>
                <textarea
                  value={summary}
                  onChange={e => setSummary(e.target.value)}
                  rows={4}
                  placeholder={t("详细描述AI应用场景、实施过程和效果...", "Describe the AI use case, implementation process and results...")}
                  className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all resize-none"
                />
              </div>
              {/* Classification */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">{t("业务场景", "Business Scenario")}</label>
                  <select
                    value={businessScenario}
                    onChange={e => setBusinessScenario(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-foreground focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                  >
                    <option value="">{t("选择业务场景", "Select scenario")}</option>
                    {BUSINESS_SCENARIOS.map(s => (
                      <option key={s.en} value={s.en}>{t(s.zh, s.en)}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">{t("AI价值类型", "AI Value Type")}</label>
                  <select
                    value={aiValueType}
                    onChange={e => setAiValueType(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-foreground focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                  >
                    <option value="">{t("选择价值类型", "Select value type")}</option>
                    {VALUE_TYPES.map(v => (
                      <option key={v.value} value={v.value}>{t(v.zh, v.en)}</option>
                    ))}
                  </select>
                </div>
              </div>
              {/* AI Tools */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">{t("使用的AI工具", "AI Tools Used")}</label>
                <div className="flex flex-wrap gap-2">
                  {AI_TOOLS.map(tool => (
                    <button
                      key={tool}
                      onClick={() => setSelectedTools(prev =>
                        prev.includes(tool) ? prev.filter(t => t !== tool) : [...prev, tool]
                      )}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                        selectedTools.includes(tool)
                          ? "bg-primary text-white"
                          : "bg-muted text-muted-foreground hover:bg-muted/80"
                      }`}
                    >
                      {tool}
                    </button>
                  ))}
                </div>
              </div>
              {/* Maturity & Replicability */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">{t("成熟度等级", "Maturity Level")}</label>
                  <select
                    value={maturityLevel}
                    onChange={e => setMaturityLevel(e.target.value as any)}
                    className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-foreground focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                  >
                    {MATURITY_LEVELS.map(l => (
                      <option key={l.value} value={l.value}>{t(l.zh, l.en)}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">{t("可复制性", "Replicability")}</label>
                  <select
                    value={replicability}
                    onChange={e => setReplicability(e.target.value as any)}
                    className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-foreground focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                  >
                    <option value="low">{t("低", "Low")}</option>
                    <option value="medium">{t("中", "Medium")}</option>
                    <option value="high">{t("高", "High")}</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">{t("效率提升", "Efficiency Gain")}</label>
                  <input
                    type="text"
                    value={efficiencyGain}
                    onChange={e => setEfficiencyGain(e.target.value)}
                    placeholder={t("例如：18x", "e.g., 18x")}
                    className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">{t("影响指标", "Impact Metric")}</label>
                <input
                  type="text"
                  value={impactMetric}
                  onChange={e => setImpactMetric(e.target.value)}
                  placeholder={t("例如：时间减少90%", "e.g., Time reduced by 90%")}
                  className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                />
              </div>
            </div>
          )}
        </div>

        {/* Section: Value Scorecard */}
        <div className="bg-card rounded-xl border border-border overflow-hidden">
          <button onClick={() => toggleSection("value")} className="w-full flex items-center justify-between p-4 hover:bg-muted/30 transition-colors">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-coral/10 flex items-center justify-center">
                <Zap size={16} className="text-coral" />
              </div>
              <span className="font-semibold text-foreground">{t("AI价值评分卡", "AI Value Scorecard")}</span>
            </div>
            {expandedSections.value ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
          </button>
          {expandedSections.value && (
            <div className="px-4 pb-4 space-y-4">
              {/* Efficiency */}
              <div className="p-3 rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/30">
                <h4 className="text-sm font-semibold text-blue-700 dark:text-blue-300 mb-2">{t("效率 Efficiency", "Efficiency")}</h4>
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="text-xs text-muted-foreground">{t("之前", "Before")}</label>
                    <input type="text" value={effBefore} onChange={e => setEffBefore(e.target.value)} placeholder={t("3小时", "3 hours")} className="w-full mt-1 px-2 py-1.5 rounded border border-border bg-background text-sm" />
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground">{t("之后", "After")}</label>
                    <input type="text" value={effAfter} onChange={e => setEffAfter(e.target.value)} placeholder={t("10分钟", "10 min")} className="w-full mt-1 px-2 py-1.5 rounded border border-border bg-background text-sm" />
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground">{t("倍数", "Multiplier")}</label>
                    <input type="text" value={effMultiplier} onChange={e => setEffMultiplier(e.target.value)} placeholder="18x" className="w-full mt-1 px-2 py-1.5 rounded border border-border bg-background text-sm" />
                  </div>
                </div>
              </div>
              {/* Productivity */}
              <div className="p-3 rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-100 dark:border-green-900/30">
                <h4 className="text-sm font-semibold text-green-700 dark:text-green-300 mb-2">{t("产出 Productivity", "Productivity")}</h4>
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="text-xs text-muted-foreground">{t("之前", "Before")}</label>
                    <input type="text" value={prodBefore} onChange={e => setProdBefore(e.target.value)} placeholder={t("3份/周", "3/week")} className="w-full mt-1 px-2 py-1.5 rounded border border-border bg-background text-sm" />
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground">{t("之后", "After")}</label>
                    <input type="text" value={prodAfter} onChange={e => setProdAfter(e.target.value)} placeholder={t("20份/周", "20/week")} className="w-full mt-1 px-2 py-1.5 rounded border border-border bg-background text-sm" />
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground">{t("倍数", "Multiplier")}</label>
                    <input type="text" value={prodMultiplier} onChange={e => setProdMultiplier(e.target.value)} placeholder="6.7x" className="w-full mt-1 px-2 py-1.5 rounded border border-border bg-background text-sm" />
                  </div>
                </div>
              </div>
              {/* Cost */}
              <div className="p-3 rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-100 dark:border-amber-900/30">
                <h4 className="text-sm font-semibold text-amber-700 dark:text-amber-300 mb-2">{t("成本 Cost", "Cost")}</h4>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-muted-foreground">{t("描述", "Description")}</label>
                    <input type="text" value={costDesc} onChange={e => setCostDesc(e.target.value)} placeholder={t("节省人力", "Save labor")} className="w-full mt-1 px-2 py-1.5 rounded border border-border bg-background text-sm" />
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground">{t("节省量", "Saving")}</label>
                    <input type="text" value={costSaving} onChange={e => setCostSaving(e.target.value)} placeholder={t("2人/周", "2 FTE/week")} className="w-full mt-1 px-2 py-1.5 rounded border border-border bg-background text-sm" />
                  </div>
                </div>
              </div>
              {/* Revenue */}
              <div className="p-3 rounded-lg bg-purple-50 dark:bg-purple-950/20 border border-purple-100 dark:border-purple-900/30">
                <h4 className="text-sm font-semibold text-purple-700 dark:text-purple-300 mb-2">{t("收入 Revenue", "Revenue")}</h4>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-muted-foreground">{t("描述", "Description")}</label>
                    <input type="text" value={revDesc} onChange={e => setRevDesc(e.target.value)} placeholder={t("广告CTR提升", "Ad CTR increase")} className="w-full mt-1 px-2 py-1.5 rounded border border-border bg-background text-sm" />
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground">{t("影响", "Impact")}</label>
                    <input type="text" value={revImpact} onChange={e => setRevImpact(e.target.value)} placeholder="+12%" className="w-full mt-1 px-2 py-1.5 rounded border border-border bg-background text-sm" />
                  </div>
                </div>
              </div>
              {/* Customer Value */}
              <div className="p-3 rounded-lg bg-teal-50 dark:bg-teal-950/20 border border-teal-100 dark:border-teal-900/30">
                <h4 className="text-sm font-semibold text-teal-700 dark:text-teal-300 mb-2">{t("客户价值 Customer Value", "Customer Value")}</h4>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-muted-foreground">{t("描述", "Description")}</label>
                    <input type="text" value={custDesc} onChange={e => setCustDesc(e.target.value)} placeholder={t("更快响应客户", "Faster response")} className="w-full mt-1 px-2 py-1.5 rounded border border-border bg-background text-sm" />
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground">{t("影响", "Impact")}</label>
                    <input type="text" value={custImpact} onChange={e => setCustImpact(e.target.value)} placeholder={t("用户体验更好", "Better UX")} className="w-full mt-1 px-2 py-1.5 rounded border border-border bg-background text-sm" />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Section: Scoring */}
        <div className="bg-card rounded-xl border border-border overflow-hidden">
          <button onClick={() => toggleSection("scoring")} className="w-full flex items-center justify-between p-4 hover:bg-muted/30 transition-colors">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center">
                <Sparkles size={16} className="text-amber-500" />
              </div>
              <span className="font-semibold text-foreground">{t("案例评分", "Case Scoring")}</span>
              <span className="ml-2 px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-bold">{totalScore}</span>
            </div>
            {expandedSections.scoring ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
          </button>
          {expandedSections.scoring && (
            <div className="px-4 pb-4 space-y-4">
              {[
                { label: t("商业价值 (40%)", "Business Value (40%)"), value: businessValueScore, setter: setBusinessValueScore },
                { label: t("可复制性 (30%)", "Replicability (30%)"), value: replicabilityScore, setter: setReplicabilityScore },
                { label: t("创新性 (20%)", "Innovation (20%)"), value: innovationScore, setter: setInnovationScore },
                { label: t("传播性 (10%)", "Virality (10%)"), value: viralityScore, setter: setViralityScore },
              ].map(item => (
                <div key={item.label}>
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-sm font-medium text-foreground">{item.label}</label>
                    <span className="text-sm font-bold text-primary">{item.value}</span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={100}
                    value={item.value}
                    onChange={e => item.setter(Number(e.target.value))}
                    className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Section: Attachments */}
        <div className="bg-card rounded-xl border border-border overflow-hidden">
          <button onClick={() => toggleSection("attachments")} className="w-full flex items-center justify-between p-4 hover:bg-muted/30 transition-colors">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center">
                <Paperclip size={16} className="text-indigo-500" />
              </div>
              <span className="font-semibold text-foreground">{t("附件与关联", "Attachments & Links")}</span>
              {attachments.length > 0 && (
                <span className="px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-600 text-xs font-bold">{attachments.length}</span>
              )}
            </div>
            {expandedSections.attachments ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
          </button>
          {expandedSections.attachments && (
            <div className="px-4 pb-4 space-y-3">
              {/* Attachment type buttons */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {attachmentTypeConfig.map(cfg => (
                  <button
                    key={cfg.type}
                    onClick={() => {
                      if (cfg.type === "local_file") {
                        document.getElementById("file-upload-input")?.click();
                      } else {
                        setAttachmentType(cfg.type);
                        setShowAttachmentModal(true);
                      }
                    }}
                    className="flex items-center gap-2 px-3 py-2.5 rounded-lg border border-dashed border-border hover:border-primary hover:bg-primary/5 transition-all text-sm text-muted-foreground hover:text-primary"
                  >
                    {cfg.icon}
                    <span>{t(cfg.zh, cfg.en)}</span>
                  </button>
                ))}
              </div>
              <input id="file-upload-input" type="file" className="hidden" onChange={handleFileUpload} accept=".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx,.txt,.md,.png,.jpg,.jpeg,.gif,.mp4,.mov" />

              {/* Attachment list */}
              {attachments.length > 0 && (
                <div className="space-y-2 mt-3">
                  {attachments.map((att, i) => {
                    const cfg = attachmentTypeConfig.find(c => c.type === att.type);
                    return (
                      <div key={i} className="flex items-center gap-3 p-2.5 rounded-lg bg-muted/50 border border-border">
                        <div className="w-8 h-8 rounded-lg bg-background flex items-center justify-center shrink-0">
                          {cfg?.icon || <Paperclip size={16} />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-foreground truncate">{att.title}</p>
                          <p className="text-xs text-muted-foreground truncate">{att.url || t("本地文件", "Local file")}</p>
                        </div>
                        <button onClick={() => handleRemoveAttachment(i)} className="p-1 rounded hover:bg-red-100 text-muted-foreground hover:text-red-500 transition-colors">
                          <X size={16} />
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Attachment modal */}
              {showAttachmentModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={() => setShowAttachmentModal(false)}>
                  <div className="bg-card rounded-xl border border-border p-5 w-full max-w-md mx-4" onClick={e => e.stopPropagation()}>
                    <h3 className="text-lg font-semibold text-foreground mb-4">
                      {t("添加", "Add")} {attachmentTypeConfig.find(c => c.type === attachmentType)?.zh || ""}
                    </h3>
                    <div className="space-y-3">
                      <div>
                        <label className="text-sm font-medium text-foreground">{t("标题", "Title")}</label>
                        <input
                          type="text"
                          value={attachmentTitle}
                          onChange={e => setAttachmentTitle(e.target.value)}
                          placeholder={t("输入标题", "Enter title")}
                          className="w-full mt-1 px-3 py-2 rounded-lg border border-border bg-background text-foreground"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-foreground">{t("链接/ID", "URL/ID")}</label>
                        <input
                          type="text"
                          value={attachmentUrl}
                          onChange={e => setAttachmentUrl(e.target.value)}
                          placeholder={attachmentTypeConfig.find(c => c.type === attachmentType)?.placeholder || ""}
                          className="w-full mt-1 px-3 py-2 rounded-lg border border-border bg-background text-foreground"
                        />
                      </div>
                    </div>
                    <div className="flex justify-end gap-2 mt-4">
                      <button onClick={() => setShowAttachmentModal(false)} className="px-4 py-2 rounded-lg text-sm text-muted-foreground hover:bg-muted transition-colors">
                        {t("取消", "Cancel")}
                      </button>
                      <button onClick={handleAddAttachment} className="px-4 py-2 rounded-lg text-sm bg-primary text-white hover:bg-primary/90 transition-colors">
                        {t("添加", "Add")}
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Section: Playbook */}
        <div className="bg-card rounded-xl border border-border overflow-hidden">
          <button onClick={() => toggleSection("playbook")} className="w-full flex items-center justify-between p-4 hover:bg-muted/30 transition-colors">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                <GitBranch size={16} className="text-emerald-500" />
              </div>
              <span className="font-semibold text-foreground">{t("Playbook 步骤", "Playbook Steps")}</span>
              <span className="text-xs text-muted-foreground">{t("（可选，方便他人复制）", "(optional, helps replication)")}</span>
            </div>
            {expandedSections.playbook ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
          </button>
          {expandedSections.playbook && (
            <div className="px-4 pb-4 space-y-3">
              {playbookSteps.map((step, i) => (
                <div key={i} className="flex gap-3 items-start">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-1">
                    <span className="text-xs font-bold text-primary">{step.step}</span>
                  </div>
                  <div className="flex-1 space-y-2">
                    <input
                      type="text"
                      value={step.title}
                      onChange={e => updatePlaybookStep(i, "title", e.target.value)}
                      placeholder={t(`步骤${step.step}标题`, `Step ${step.step} title`)}
                      className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground text-sm"
                    />
                    <textarea
                      value={step.description}
                      onChange={e => updatePlaybookStep(i, "description", e.target.value)}
                      placeholder={t("描述具体操作...", "Describe the action...")}
                      rows={2}
                      className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground text-sm resize-none"
                    />
                  </div>
                  {playbookSteps.length > 1 && (
                    <button onClick={() => removePlaybookStep(i)} className="p-1.5 rounded hover:bg-red-100 text-muted-foreground hover:text-red-500 transition-colors mt-1">
                      <X size={16} />
                    </button>
                  )}
                </div>
              ))}
              <button
                onClick={addPlaybookStep}
                className="flex items-center gap-2 px-3 py-2 rounded-lg border border-dashed border-border hover:border-primary hover:text-primary text-muted-foreground transition-all text-sm w-full justify-center"
              >
                <Plus size={16} />
                {t("添加步骤", "Add Step")}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Submit buttons */}
      <div className="flex items-center justify-between mt-6 pb-8">
        <button
          onClick={() => navigate("/cases")}
          className="px-4 py-2.5 rounded-lg text-sm text-muted-foreground hover:bg-muted transition-colors"
        >
          {t("取消", "Cancel")}
        </button>
        <div className="flex gap-3">
          <button
            onClick={() => handleSubmit("draft")}
            disabled={createCase.isPending}
            className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium border border-border hover:bg-muted transition-colors disabled:opacity-50"
          >
            <Save size={16} />
            {t("保存草稿", "Save Draft")}
          </button>
          <button
            onClick={() => handleSubmit("pending_review")}
            disabled={createCase.isPending}
            className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium bg-primary text-white hover:bg-primary/90 transition-colors disabled:opacity-50"
          >
            <Send size={16} />
            {t("提交审核", "Submit for Review")}
          </button>
        </div>
      </div>
    </div>
  );
}
