/*
 * GlobalIntelligence — Auto-curated global AI news & insights
 * Focused on three pilot areas: Performance Marketing, Creative, Data Analytics
 * Plus general AI transformation trends for e-commerce/DTC/fashion
 */
import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import { useState, useMemo } from "react";
import {
  Globe, Search, TrendingUp, Megaphone, Palette, BarChart3,
  ExternalLink, Clock, Star, Bookmark, ArrowUpRight, Sparkles,
  Rss, Filter, Building2, Zap, RefreshCw, Tag,
} from "lucide-react";

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.06 } } };
const item = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0, transition: { duration: 0.3 } } };

// --- Types ---
interface NewsItem {
  id: string;
  titleZh: string;
  titleEn: string;
  summaryZh: string;
  summaryEn: string;
  source: string;
  sourceUrl: string;
  date: string;
  category: "marketing" | "creative" | "analytics" | "general";
  tags: string[];
  relevance: "high" | "medium" | "low";
  type: "news" | "case" | "tool" | "research" | "trend";
  region: string;
  starred?: boolean;
}

// --- Seed Data: Real-world AI news focused on three pilot areas ---
const globalNewsItems: NewsItem[] = [
  // === Performance Marketing ===
  {
    id: "n1",
    titleZh: "AI将很快运行整个广告活动 — Agentic AI平台自动化广告供应链",
    titleEn: "AI Will Soon Run An Entire Ad Campaign — Agentic AI Automates Ad Supply Chain",
    summaryZh: "新的Agentic AI平台帮助品牌和代理商自动化从创意生成到投放优化的整个广告流程。企业使用生成式AI已开始自动化整个广告供应链，标志着效果营销进入新时代。",
    summaryEn: "A new agentic AI platform helps brands and agencies automate the entire ad pipeline from creative generation to placement optimization. Companies using generative AI have begun to automate the entire ad supply chain.",
    source: "MediaPost",
    sourceUrl: "https://www.mediapost.com/publications/article/413501/",
    date: "2026-03-16",
    category: "marketing",
    tags: ["Agentic AI", "Ad Automation", "Supply Chain"],
    relevance: "high",
    type: "news",
    region: "US",
  },
  {
    id: "n2",
    titleZh: "衡量AI对营销的影响：理解转型的J曲线",
    titleEn: "Measuring The Impact Of AI On Marketing: Navigating The J-Curve Of Transformation",
    summaryZh: "Forbes分析指出AI营销转型遵循J曲线规律。理解企业在曲线上的位置对于衡量AI对营销的贡献至关重要。初期投入可能导致效率暂时下降，但长期将带来指数级增长。",
    summaryEn: "Forbes analysis shows AI marketing transformation follows a J-curve. Understanding where you are on that curve is essential to measuring AI's contribution to marketing. Initial investment may cause temporary dips before exponential growth.",
    source: "Forbes",
    sourceUrl: "https://www.forbes.com/councils/forbesbusinesscouncil/2026/03/16/",
    date: "2026-03-16",
    category: "marketing",
    tags: ["ROI", "J-Curve", "Transformation"],
    relevance: "high",
    type: "research",
    region: "US",
  },
  {
    id: "n3",
    titleZh: "PMG以AI为核心重新定位，与Freewheel合作试点AI Agent基础设施",
    titleEn: "PMG Eyes Expansion With AI-Focused Repositioning & Freewheel AI Agent Partnership",
    summaryZh: "独立广告代理商PMG正在试点来自Freewheel的AI Agent基础设施，旨在简化高端视频广告交易流程。这标志着广告行业从工具辅助向Agent自动化的关键转变。",
    summaryEn: "Independent agency PMG is piloting an AI agent infrastructure from Freewheel designed to streamline premium video transactions, marking a key shift from tool-assisted to agent-automated advertising.",
    source: "Marketing Dive",
    sourceUrl: "https://www.marketingdive.com/news/pmg-eyes-expansion/",
    date: "2026-03-16",
    category: "marketing",
    tags: ["AI Agent", "Video Ads", "Agency"],
    relevance: "high",
    type: "news",
    region: "US",
  },
  {
    id: "n4",
    titleZh: "DTC电商市场达2130亿美元 — 数据驱动+AI是赢家关键",
    titleEn: "DTC Ecommerce Hits $213B — First-Party Data and AI Drive Success",
    summaryZh: "美国DTC电商市场今年达到2130亿美元。获胜的品牌不是广告投入最多的，而是掌握了第一方数据+AI驱动个性化的品牌。对CUPSHE等DTC品牌具有直接参考价值。",
    summaryEn: "The US DTC ecommerce market hits $213B this year. Winning brands aren't those spending most on ads — they're the ones mastering first-party data + AI-driven personalization. Directly relevant to DTC brands like CUPSHE.",
    source: "LinkedIn / Industry Report",
    sourceUrl: "https://www.linkedin.com/posts/jackpaxton_the-dtc-ecommerce-market/",
    date: "2026-03-03",
    category: "marketing",
    tags: ["DTC", "First-Party Data", "Personalization"],
    relevance: "high",
    type: "trend",
    region: "US",
  },
  {
    id: "n5",
    titleZh: "2026年AI营销调查：AI主导营销议程",
    titleEn: "Marketing Survey 2026: AI Dominates the Marketing Agenda",
    summaryZh: "DMEXCO发布的2026年营销调查显示，AI已成为营销领域的绝对主导议题。超过78%的营销团队已在使用AI工具，从内容生成到广告优化全链路覆盖。",
    summaryEn: "DMEXCO's 2026 marketing survey shows AI dominates the marketing agenda. Over 78% of marketing teams are using AI tools, covering the full pipeline from content generation to ad optimization.",
    source: "DMEXCO",
    sourceUrl: "https://dmexco.com/stories/marketing-survey-2026/",
    date: "2026-03-11",
    category: "marketing",
    tags: ["Survey", "Marketing Trends", "Adoption"],
    relevance: "medium",
    type: "research",
    region: "EU",
  },
  {
    id: "n6",
    titleZh: "9款最佳AI营销优化工具助力ROI提升",
    titleEn: "9 Best AI Marketing Optimization Tools to Boost ROI in 2026",
    summaryZh: "Cometly评测了9款AI营销优化工具，涵盖数据分析、效果预测和自动化推荐。这些工具可帮助营销团队实现投放ROI的显著提升。",
    summaryEn: "Cometly reviewed 9 AI marketing optimization tools covering data analysis, performance prediction, and automated recommendations to significantly boost campaign ROI.",
    source: "Cometly",
    sourceUrl: "https://www.cometly.com/post/ai-marketing-optimization-tools",
    date: "2026-03-16",
    category: "marketing",
    tags: ["Tools", "ROI", "Optimization"],
    relevance: "medium",
    type: "tool",
    region: "US",
  },

  // === Creative ===
  {
    id: "n7",
    titleZh: "11款广告创意人离不开的AI工具",
    titleEn: "11 AI Tools That Ad Creatives Can't Stop Using Now",
    summaryZh: "ADWEEK调查了创意领袖们最常用的AI工具：Notebook、Nano Banana、Clamor、Gemini 3 Flash、LTX Studio、Flow、ChatGPT Image等。这些工具正在重塑广告创意的工作方式。",
    summaryEn: "ADWEEK surveyed creative leaders on their go-to AI tools: Notebook, Nano Banana, Clamor, Gemini 3 Flash, LTX Studio, Flow, ChatGPT Image and more. These tools are reshaping how ad creatives work.",
    source: "ADWEEK",
    sourceUrl: "https://www.adweek.com/creativity/11-ai-tools-that-ad-creatives-cant-stop-using-now/",
    date: "2026-03-11",
    category: "creative",
    tags: ["Creative Tools", "Ad Design", "Generative AI"],
    relevance: "high",
    type: "tool",
    region: "US",
  },
  {
    id: "n8",
    titleZh: "斯坦福学者训练AI更好地增强人类创造力",
    titleEn: "Stanford Scholars Train AI to Better Augment Human Creativity",
    summaryZh: "斯坦福研究团队正在开发开源AI工具，使艺术家能够引导模型输出并增强视觉叙事。这些创新可能改变创意协作的方式，让AI成为创意伙伴而非替代者。",
    summaryEn: "Stanford research team is developing open-source AI tools enabling artists to guide model outputs and enhance visual storytelling. These innovations could transform creative collaboration, making AI a creative partner rather than replacement.",
    source: "Stanford News",
    sourceUrl: "https://news.stanford.edu/stories/2026/03/generative-ai-creative-collaboration/",
    date: "2026-03-11",
    category: "creative",
    tags: ["Research", "Human-AI Collaboration", "Visual Art"],
    relevance: "medium",
    type: "research",
    region: "US",
  },
  {
    id: "n9",
    titleZh: "2026年5大广告制作中的AI趋势",
    titleEn: "5 AI Trends in Advertising Production 2026",
    summaryZh: "APR报告建议从高产量、低复杂度任务（如版本化和本地化）开始试点AI工具，以积累经验和证明ROI，然后再扩展到更复杂的创意工作。这与CUPSHE创意中心的渐进策略高度吻合。",
    summaryEn: "APR report suggests piloting AI tools for high-volume, low-complexity tasks like versioning and localization to build institutional knowledge and prove ROI before scaling to complex creative work. Aligns well with CUPSHE's gradual creative AI strategy.",
    source: "APR",
    sourceUrl: "https://www.aprco.com/resources/5-ai-trends-in-advertising-production-2026",
    date: "2026-02-26",
    category: "creative",
    tags: ["Production", "Versioning", "Localization"],
    relevance: "high",
    type: "trend",
    region: "US",
  },
  {
    id: "n10",
    titleZh: "2026年8大创意自动化工具对比评测",
    titleEn: "Top 8 Creative Automation Tools in 2026 — Features & Comparison",
    summaryZh: "Hunch评测了8款创意自动化平台，Hunch以AI驱动的Creative Studio领先，支持批量生成1000+个性化创意素材。对CUPSHE的广告创意批量生产有直接参考价值。",
    summaryEn: "Hunch reviewed 8 creative automation platforms, with Hunch leading via AI-driven Creative Studio supporting batch generation of 1000+ personalized creatives. Directly relevant to CUPSHE's bulk ad creative production.",
    source: "Hunch",
    sourceUrl: "https://www.hunchads.com/blog/top-creative-automation-tools",
    date: "2026-02-24",
    category: "creative",
    tags: ["Automation", "Batch Creative", "Personalization"],
    relevance: "high",
    type: "tool",
    region: "US",
  },
  {
    id: "n11",
    titleZh: "2026年设计师如何用AI工具放大创造力",
    titleEn: "Amplifying Creativity With AI Tools for Designers in 2026",
    summaryZh: "RGD探讨了设计师如何在2026年使用AI工具进行构思、UX评估、动效和品牌设计，同时保持创意控制和伦理标准。强调AI是增强而非替代设计师的角色。",
    summaryEn: "RGD explores how designers use AI tools in 2026 for ideation, UX evaluation, motion and branding while maintaining creative control and ethical standards. Emphasizes AI as augmentation, not replacement.",
    source: "RGD",
    sourceUrl: "https://rgd.ca/articles/2026-amplifying-creativity-with-ai-tools/",
    date: "2026-03-05",
    category: "creative",
    tags: ["Design", "UX", "Ethics"],
    relevance: "medium",
    type: "trend",
    region: "CA",
  },

  // === Data Analytics ===
  {
    id: "n12",
    titleZh: "NVIDIA AI现状报告：AI如何驱动收入、降低成本并提升效率",
    titleEn: "NVIDIA State of AI 2026: How AI Is Driving Revenue, Cutting Costs and Boosting Efficiency",
    summaryZh: "NVIDIA发布2026年AI现状报告。2025年企业开始试验AI Agent——能够自主推理、规划和执行复杂任务的高级AI系统。报告显示AI在数据分析领域的应用已从辅助分析进入自动化决策阶段。",
    summaryEn: "NVIDIA's State of AI 2026 report shows companies began experimenting with AI agents — advanced systems designed to autonomously reason, plan and execute complex tasks. AI in data analytics has moved from assisted analysis to automated decision-making.",
    source: "NVIDIA Blog",
    sourceUrl: "https://blogs.nvidia.com/blog/state-of-ai-report-2026/",
    date: "2026-03-09",
    category: "analytics",
    tags: ["AI Agent", "Enterprise AI", "Automation"],
    relevance: "high",
    type: "research",
    region: "US",
  },
  {
    id: "n13",
    titleZh: "Agentic AI实现28%更快问题解决率和19%首次解决率提升",
    titleEn: "Agentic AI Achieves 28% Faster Resolution & 19% First-Contact Resolution Increase",
    summaryZh: "部署Agentic AI的组织报告问题解决速度提升28%，首次联系解决率提升19%。团队从战术执行转向战略分析，数据分析效率显著提升。",
    summaryEn: "Organizations deploying agentic AI reported 28% faster issue resolution and 19% increase in first-contact resolution. Teams shifted from tactical execution to strategic analysis, significantly improving data analytics efficiency.",
    source: "CMSWire",
    sourceUrl: "https://www.cmswire.com/digital-marketing/which-2025-marketing-predictions-actually-came-true/",
    date: "2026-03-16",
    category: "analytics",
    tags: ["Agentic AI", "Efficiency", "Resolution Rate"],
    relevance: "high",
    type: "case",
    region: "US",
  },
  {
    id: "n14",
    titleZh: "AI零售趋势：10大AI趋势正在重塑2026年电商",
    titleEn: "AI In Retail: 10 Trends Shaping Ecommerce In 2026",
    summaryZh: "从超个性化和AI购物助手到动态定价和需求预测，10大AI趋势正在改变零售业。数据分析驱动的需求预测和库存优化成为核心竞争力。",
    summaryEn: "From hyper-personalization and AI shopping assistants to dynamic pricing and demand forecasting, 10 AI trends are transforming retail. Data analytics-driven demand forecasting and inventory optimization become core competitive advantages.",
    source: "InsiderOne",
    sourceUrl: "https://insiderone.com/ai-retail-trends/",
    date: "2026-02-23",
    category: "analytics",
    tags: ["Retail", "Demand Forecasting", "Personalization"],
    relevance: "high",
    type: "trend",
    region: "US",
  },
  {
    id: "n15",
    titleZh: "时尚AI：2026年7大关键应用场景",
    titleEn: "Fashion AI: 7 Key Use Cases in 2026",
    summaryZh: "从虚拟试穿、AI摄影到智能个性化，时尚AI正在重塑行业从设计到交付的全链路。AI驱动的趋势预测和数据分析帮助品牌更精准地把握市场需求。",
    summaryEn: "From virtual try-on and AI photography to smart personalization, fashion AI is reshaping the industry from design to delivery. AI-driven trend forecasting and data analytics help brands better capture market demand.",
    source: "Fashn.AI",
    sourceUrl: "https://fashn.ai/blog/fashion-ai-7-key-use-cases-in-2026",
    date: "2026-02-23",
    category: "analytics",
    tags: ["Fashion", "Virtual Try-On", "Trend Forecasting"],
    relevance: "high",
    type: "trend",
    region: "US",
  },
  {
    id: "n16",
    titleZh: "2026年电商AI Agent：Shopify店铺的7大AI Agent对比",
    titleEn: "Top 7 eCommerce AI Agents for Shopify Stores in 2026",
    summaryZh: "Salesmate对比了7款Shopify AI Agent：Skara、Gorgias、Tidio等。这些Agent能提升销售、减少客服工单，并实现智能交接。对电商数据分析和客户服务自动化有直接参考。",
    summaryEn: "Salesmate compared 7 Shopify AI agents: Skara, Gorgias, Tidio and more. These agents boost sales, cut tickets, and hand off smartly. Directly relevant to ecommerce data analytics and customer service automation.",
    source: "Salesmate",
    sourceUrl: "https://www.salesmate.io/blog/ecommerce-ai-agents-for-shopify-stores/",
    date: "2026-02-28",
    category: "analytics",
    tags: ["Shopify", "AI Agent", "Customer Service"],
    relevance: "medium",
    type: "tool",
    region: "US",
  },

  // === General AI Transformation ===
  {
    id: "n17",
    titleZh: "从速度到文化到智能：时尚品牌的未来重塑",
    titleEn: "From Speed to Culture to Intelligence: Reinventing the Future of Fashion Brands",
    summaryZh: "从预测性趋势预测到虚拟试穿，智能系统使品牌能够比以往更高效地设计、生产和分销。AI正在从效率工具演变为品牌战略的核心驱动力。",
    summaryEn: "From predictive trend forecasting to virtual try-ons, intelligent systems enable brands to design, produce, and distribute more efficiently than ever. AI is evolving from efficiency tool to core driver of brand strategy.",
    source: "Peter Fisk",
    sourceUrl: "https://www.peterfisk.com/2026/03/reinventing-the-future-of-fashion/",
    date: "2026-03-16",
    category: "general",
    tags: ["Fashion", "Strategy", "Digital Transformation"],
    relevance: "medium",
    type: "trend",
    region: "EU",
  },
  {
    id: "n18",
    titleZh: "2026年电商产品上线流程：AI驱动的工作流如何提升转化率",
    titleEn: "E-Commerce 2026: How AI-Streamlined Product Launch Workflows Drive Higher Conversion",
    summaryZh: "AI根据产品类型、品类和历史数据自动生成上线计划，分配截止日期并标记风险。这种AI驱动的工作流正在成为电商运营的标准配置。",
    summaryEn: "AI generates launch plans automatically based on product type, category, and historical data, assigning deadlines and flagging risks. AI-driven workflows are becoming standard in ecommerce operations.",
    source: "TechWyse",
    sourceUrl: "https://www.techwyse.com/blog/ecommerce/e-commerce-in-2026/",
    date: "2026-03-04",
    category: "general",
    tags: ["E-Commerce", "Product Launch", "Workflow"],
    relevance: "medium",
    type: "case",
    region: "US",
  },
  {
    id: "n19",
    titleZh: "10家企业2026年AI营销实战案例（含真实数据）",
    titleEn: "10 Companies Using AI for Marketing in 2026 (With Real Results)",
    summaryZh: "Pecan.AI展示了15+个企业AI营销实战案例，涵盖邮件、广告、内容和客户分析。每个案例都包含具体的策略、工具和可衡量的结果数据。",
    summaryEn: "Pecan.AI showcases 15+ real examples of companies using AI for marketing, covering email, ads, content, and customer analytics. Each case includes specific strategies, tools, and measurable results.",
    source: "Pecan.AI",
    sourceUrl: "https://www.pecan.ai/blog/10-companies-using-ai-for-marketing/",
    date: "2026-03-10",
    category: "general",
    tags: ["Case Studies", "Real Results", "Multi-Channel"],
    relevance: "high",
    type: "case",
    region: "US",
  },
  {
    id: "n20",
    titleZh: "Meta签署270亿美元AI基础设施协议，AI军备竞赛持续升温",
    titleEn: "Meta Strikes $27B AI Infrastructure Deal as AI Arms Race Continues",
    summaryZh: "Meta签署270亿美元AI基础设施协议，同时考虑裁员超15,000人以重新配置资源。大型科技公司对AI的投入持续加码，预示着AI能力将进一步普及和降价。",
    summaryEn: "Meta strikes $27B AI infrastructure deal while considering 15,000+ layoffs to reallocate resources. Big tech's continued AI investment signals further democratization and cost reduction of AI capabilities.",
    source: "eMarketer",
    sourceUrl: "https://www.emarketer.com/content/meta-strikes-27-billion-ai-infrastructure-deal/",
    date: "2026-03-16",
    category: "general",
    tags: ["Meta", "Infrastructure", "Industry"],
    relevance: "low",
    type: "news",
    region: "US",
  },
];

// Category config
const categoryConfig = {
  marketing: { zh: "效果营销", en: "Performance Marketing", icon: Megaphone, color: "text-coral", bg: "bg-coral/10" },
  creative: { zh: "创意设计", en: "Creative Design", icon: Palette, color: "text-teal", bg: "bg-teal/10" },
  analytics: { zh: "数据分析", en: "Data Analytics", icon: BarChart3, color: "text-ocean-light", bg: "bg-ocean-light/10" },
  general: { zh: "行业动态", en: "Industry Trends", icon: Globe, color: "text-primary", bg: "bg-primary/10" },
};

const typeConfig: Record<string, { zh: string; en: string; color: string }> = {
  news: { zh: "新闻", en: "News", color: "bg-blue-100 text-blue-700" },
  case: { zh: "案例", en: "Case Study", color: "bg-green-100 text-green-700" },
  tool: { zh: "工具", en: "Tool", color: "bg-purple-100 text-purple-700" },
  research: { zh: "研究", en: "Research", color: "bg-amber-100 text-amber-700" },
  trend: { zh: "趋势", en: "Trend", color: "bg-rose-100 text-rose-700" },
};

const relevanceConfig: Record<string, { zh: string; en: string; color: string }> = {
  high: { zh: "高相关", en: "High", color: "bg-coral/15 text-coral" },
  medium: { zh: "中相关", en: "Medium", color: "bg-teal/15 text-teal" },
  low: { zh: "低相关", en: "Low", color: "bg-muted text-muted-foreground" },
};

export default function GlobalIntelligence() {
  const { t, lang } = useLanguage();
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [typeFilter, setTypeFilter] = useState<string | null>(null);
  const [bookmarked, setBookmarked] = useState<Set<string>>(new Set());

  const toggleBookmark = (id: string) => {
    setBookmarked((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const filtered = useMemo(() => {
    let items = globalNewsItems;
    if (activeTab !== "all") {
      items = items.filter((n) => n.category === activeTab);
    }
    if (typeFilter) {
      items = items.filter((n) => n.type === typeFilter);
    }
    if (search) {
      const s = search.toLowerCase();
      items = items.filter(
        (n) =>
          n.titleZh.toLowerCase().includes(s) ||
          n.titleEn.toLowerCase().includes(s) ||
          n.summaryZh.toLowerCase().includes(s) ||
          n.summaryEn.toLowerCase().includes(s) ||
          n.tags.some((tag) => tag.toLowerCase().includes(s))
      );
    }
    return items;
  }, [activeTab, typeFilter, search]);

  // Stats
  const stats = useMemo(() => ({
    total: globalNewsItems.length,
    marketing: globalNewsItems.filter((n) => n.category === "marketing").length,
    creative: globalNewsItems.filter((n) => n.category === "creative").length,
    analytics: globalNewsItems.filter((n) => n.category === "analytics").length,
    highRelevance: globalNewsItems.filter((n) => n.relevance === "high").length,
  }), []);

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6 max-w-[1400px] mx-auto">
      {/* Hero */}
      <motion.div variants={item} className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-[#0a1628] via-[#1e3a5f] to-[#0d4f8b] h-[160px] lg:h-[180px]">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 20% 50%, rgba(255,255,255,0.15) 0%, transparent 50%), radial-gradient(circle at 80% 50%, rgba(14,165,233,0.2) 0%, transparent 50%)" }} />
        <div className="absolute inset-0 flex flex-col justify-center px-6 lg:px-10">
          <div className="flex items-center gap-2 mb-2">
            <Rss size={16} className="text-teal-light" />
            <span className="text-teal-light text-[10px] font-semibold tracking-wider uppercase">
              Global AI Intelligence Feed
            </span>
          </div>
          <h1 className="text-2xl lg:text-3xl font-extrabold text-white mb-1">
            {t("全球 AI 动态情报", "Global AI Intelligence")}
          </h1>
          <p className="text-white/60 text-xs lg:text-sm max-w-xl">
            {t(
              "持续追踪效果营销、创意设计、数据分析三大试点领域的全球最新AI技术、实践和商业化动态",
              "Continuously tracking global AI technology, practices and commercial trends across three pilot areas: Performance Marketing, Creative Design, Data Analytics"
            )}
          </p>
        </div>
      </motion.div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
        {[
          { zh: "情报总数", en: "Total Intel", value: stats.total, icon: Globe, color: "text-primary", bg: "bg-primary/10" },
          { zh: "效果营销", en: "Marketing", value: stats.marketing, icon: Megaphone, color: "text-coral", bg: "bg-coral/10" },
          { zh: "创意设计", en: "Creative", value: stats.creative, icon: Palette, color: "text-teal", bg: "bg-teal/10" },
          { zh: "数据分析", en: "Analytics", value: stats.analytics, icon: BarChart3, color: "text-ocean-light", bg: "bg-ocean-light/10" },
          { zh: "高相关度", en: "High Relevance", value: stats.highRelevance, icon: Star, color: "text-warning", bg: "bg-warning/10" },
        ].map((s, i) => (
          <motion.div key={i} variants={item}>
            <Card className="border-0 shadow-sm">
              <CardContent className="p-3 lg:p-4 flex items-center gap-3">
                <div className={`p-2 rounded-lg ${s.bg} shrink-0`}>
                  <s.icon size={16} className={s.color} />
                </div>
                <div>
                  <div className="text-xl font-extrabold font-mono">{s.value}</div>
                  <div className="text-[10px] text-muted-foreground">{t(s.zh, s.en)}</div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Search + Filters */}
      <motion.div variants={item} className="flex flex-col lg:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder={t("搜索AI动态、工具、趋势...", "Search AI news, tools, trends...")}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 h-10"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {Object.entries(typeConfig).map(([key, cfg]) => (
            <button
              key={key}
              onClick={() => setTypeFilter(typeFilter === key ? null : key)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                typeFilter === key ? cfg.color : "bg-muted/50 text-muted-foreground hover:bg-muted"
              }`}
            >
              {t(cfg.zh, cfg.en)}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Tabs + Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="bg-muted/30 p-1">
          <TabsTrigger value="all" className="text-xs">
            {t("全部", "All")} ({globalNewsItems.length})
          </TabsTrigger>
          {Object.entries(categoryConfig).map(([key, cfg]) => (
            <TabsTrigger key={key} value={key} className="text-xs gap-1">
              <cfg.icon size={14} />
              {t(cfg.zh, cfg.en)}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value={activeTab} className="mt-4">
          {filtered.length === 0 ? (
            <Card className="border-0 shadow-sm">
              <CardContent className="p-12 text-center">
                <Search size={32} className="text-muted-foreground mx-auto mb-3" />
                <p className="text-sm text-muted-foreground">{t("暂无匹配的情报", "No matching intelligence found")}</p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-3">
              {filtered.map((newsItem) => {
                const catCfg = categoryConfig[newsItem.category];
                const typeCfg = typeConfig[newsItem.type];
                const relCfg = relevanceConfig[newsItem.relevance];
                const isBookmarked = bookmarked.has(newsItem.id);

                return (
                  <motion.div key={newsItem.id} variants={item}>
                    <Card className={`border-0 shadow-sm hover:shadow-md transition-all ${newsItem.relevance === "high" ? "border-l-4 border-l-coral" : ""}`}>
                      <CardContent className="p-4 lg:p-5">
                        <div className="flex items-start gap-4">
                          {/* Category Icon */}
                          <div className={`hidden lg:flex p-2.5 rounded-xl ${catCfg.bg} shrink-0 mt-0.5`}>
                            <catCfg.icon size={20} className={catCfg.color} />
                          </div>

                          {/* Content */}
                          <div className="flex-1 min-w-0">
                            {/* Badges Row */}
                            <div className="flex flex-wrap items-center gap-1.5 mb-2">
                              <Badge variant="secondary" className={`text-[10px] ${typeCfg.color} border-0`}>
                                {t(typeCfg.zh, typeCfg.en)}
                              </Badge>
                              <Badge variant="secondary" className={`text-[10px] ${catCfg.bg} ${catCfg.color} border-0 lg:hidden`}>
                                {t(catCfg.zh, catCfg.en)}
                              </Badge>
                              <Badge variant="secondary" className={`text-[10px] ${relCfg.color} border-0`}>
                                <Star size={8} className="mr-0.5" />
                                {t(relCfg.zh, relCfg.en)}
                              </Badge>
                              <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                                <Clock size={10} /> {newsItem.date}
                              </span>
                              <span className="text-[10px] text-muted-foreground">
                                {newsItem.region}
                              </span>
                            </div>

                            {/* Title */}
                            <h3 className="text-sm lg:text-base font-bold text-foreground mb-1.5 leading-snug">
                              {t(newsItem.titleZh, newsItem.titleEn)}
                            </h3>

                            {/* Summary */}
                            <p className="text-xs text-muted-foreground leading-relaxed mb-3 line-clamp-2 lg:line-clamp-3">
                              {t(newsItem.summaryZh, newsItem.summaryEn)}
                            </p>

                            {/* Tags + Source */}
                            <div className="flex flex-wrap items-center gap-2">
                              {newsItem.tags.map((tag) => (
                                <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full bg-muted/50 text-muted-foreground flex items-center gap-0.5">
                                  <Tag size={8} /> {tag}
                                </span>
                              ))}
                              <span className="text-[10px] text-muted-foreground ml-auto flex items-center gap-1">
                                {t("来源", "Source")}: {newsItem.source}
                              </span>
                            </div>
                          </div>

                          {/* Actions */}
                          <div className="flex flex-col gap-2 shrink-0">
                            <button
                              onClick={() => toggleBookmark(newsItem.id)}
                              className={`p-1.5 rounded-lg transition-colors ${
                                isBookmarked ? "bg-warning/15 text-warning" : "hover:bg-muted text-muted-foreground"
                              }`}
                              title={t("收藏", "Bookmark")}
                            >
                              <Bookmark size={14} fill={isBookmarked ? "currentColor" : "none"} />
                            </button>
                            <a
                              href={newsItem.sourceUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-1.5 rounded-lg hover:bg-primary/10 text-primary transition-colors"
                              title={t("查看原文", "View Source")}
                            >
                              <ExternalLink size={14} />
                            </a>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Auto-refresh notice */}
      <motion.div variants={item}>
        <Card className="border-0 shadow-sm bg-muted/20">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="p-2 rounded-lg bg-teal/10 shrink-0">
              <RefreshCw size={16} className="text-teal" />
            </div>
            <div>
              <p className="text-xs font-semibold text-foreground">
                {t("自动情报抓取", "Auto Intelligence Feed")}
              </p>
              <p className="text-[10px] text-muted-foreground">
                {t(
                  "系统每日自动抓取三大试点领域（效果营销、创意设计、数据分析）的全球AI动态，并按相关度、类型和地区进行分类标注。高相关度内容将自动推送至AI周刊和飞书群。",
                  "The system auto-curates global AI intelligence daily across three pilot areas (Performance Marketing, Creative Design, Data Analytics), tagged by relevance, type and region. High-relevance content is auto-pushed to AI Newsletter and Feishu groups."
                )}
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}
