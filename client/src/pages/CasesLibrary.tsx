/**
 * CasesLibrary — Comprehensive 4-layer AI Case Library
 * Layers: Cases / Playbooks / Prompts / Tools / Leaderboard
 * Features: Business scenario classification, Maturity Map, Value Scorecard,
 *           Weighted scoring, Case of Week/Month, Visual sharing cards,
 *           Like/Favorite/Comment interactions, Leaderboard, Auto-points
 * Design: Warm professional, deep ocean + coral accent
 */
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useMemo, useEffect } from "react";
import {
  Search, TrendingUp, Star, Award, Trophy, BookOpen, Wrench,
  FileText, Zap, ArrowRight, ChevronRight, Copy, Share2,
  BarChart3, Users, Calendar, Layers, Target, Sparkles,
  CheckCircle2, Clock, Shield, Heart, Bookmark, MessageCircle,
  Send, Medal, Crown, ThumbsUp, Eye, Plus, ArrowUpRight
} from "lucide-react";
import { Link } from "wouter";
import {
  enhancedCases, aiPlaybooks, enhancedTools, businessScenarios,
  maturityLevels, valueTypes, departmentMaturityMap,
  aiTransformationDashboard, type EnhancedAICase, type MaturityLevel, type ValueType
} from "@/lib/caseData";
import { prompts } from "@/lib/data";
import { toast } from "sonner";

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.06 } } };
const item = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } };

// --- Sub-components ---

function MaturityBadge({ level }: { level: MaturityLevel }) {
  const info = maturityLevels[level];
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${info.bgColor} ${info.color}`}>
      {level}
    </span>
  );
}

function ScoreBar({ score, max = 100 }: { score: number; max?: number }) {
  const pct = Math.min((score / max) * 100, 100);
  return (
    <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
      <div
        className="h-full rounded-full bg-gradient-to-r from-teal to-ocean-light transition-all duration-500"
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}

function ValueTypeBadge({ type }: { type: ValueType }) {
  const info = valueTypes[type];
  return (
    <span className={`inline-flex items-center gap-1 text-[10px] font-medium ${info.color}`}>
      {info.icon} {info.zh}
    </span>
  );
}

// --- Interaction Buttons (Like / Favorite / Comment count) ---
function InteractionBar({
  caseId, likeCount, favoriteCount, commentCount, viewCount,
  liked, favorited, onLike, onFavorite, onComment, t
}: {
  caseId: number;
  likeCount: number;
  favoriteCount: number;
  commentCount: number;
  viewCount: number;
  liked: boolean;
  favorited: boolean;
  onLike: () => void;
  onFavorite: () => void;
  onComment: () => void;
  t: (zh: string, en: string) => string;
}) {
  return (
    <div className="flex items-center gap-3 pt-2">
      <button
        onClick={(e) => { e.stopPropagation(); onLike(); }}
        className={`flex items-center gap-1 text-xs transition-colors ${liked ? "text-coral font-bold" : "text-muted-foreground hover:text-coral"}`}
      >
        <Heart size={14} className={liked ? "fill-coral" : ""} /> {likeCount}
      </button>
      <button
        onClick={(e) => { e.stopPropagation(); onFavorite(); }}
        className={`flex items-center gap-1 text-xs transition-colors ${favorited ? "text-warning font-bold" : "text-muted-foreground hover:text-warning"}`}
      >
        <Bookmark size={14} className={favorited ? "fill-warning" : ""} /> {favoriteCount}
      </button>
      <button
        onClick={(e) => { e.stopPropagation(); onComment(); }}
        className="flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors"
      >
        <MessageCircle size={14} /> {commentCount}
      </button>
      <span className="flex items-center gap-1 text-xs text-muted-foreground ml-auto">
        <Eye size={12} /> {viewCount}
      </span>
    </div>
  );
}

// --- Comment Section ---
function CommentSection({ caseId, t }: { caseId: number; t: (zh: string, en: string) => string }) {
  const { user } = useAuth();
  const [newComment, setNewComment] = useState("");
  const utils = trpc.useUtils();

  const { data: comments, isLoading } = trpc.cases.listComments.useQuery({ caseId, limit: 50 });
  const addComment = trpc.cases.addComment.useMutation({
    onSuccess: () => {
      utils.cases.listComments.invalidate({ caseId });
      setNewComment("");
      toast.success(t("评论成功 +5积分", "Comment posted +5 pts"));
    },
  });

  const handleSubmit = () => {
    if (!newComment.trim()) return;
    if (!user) {
      toast.error(t("请先登录", "Please login first"));
      return;
    }
    addComment.mutate({ caseId, content: newComment.trim() });
  };

  return (
    <div className="space-y-3">
      <h4 className="text-sm font-bold text-foreground flex items-center gap-2">
        <MessageCircle size={14} className="text-primary" />
        {t("评论区", "Comments")}
        {comments && <Badge variant="secondary" className="text-[9px]">{comments.comments.length}</Badge>}
      </h4>

      {/* Comment Input */}
      {user ? (
        <div className="flex gap-2">
          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary shrink-0">
            {user.name?.charAt(0) || "U"}
          </div>
          <div className="flex-1 flex gap-2">
            <Input
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder={t("写下你的评论...", "Write a comment...")}
              className="text-sm"
              onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSubmit()}
            />
            <button
              onClick={handleSubmit}
              disabled={!newComment.trim() || addComment.isPending}
              className="px-3 py-2 rounded-lg bg-primary text-primary-foreground text-xs font-medium hover:bg-primary/90 disabled:opacity-50 transition-colors shrink-0"
            >
              <Send size={14} />
            </button>
          </div>
        </div>
      ) : (
        <p className="text-xs text-muted-foreground">{t("登录后可以发表评论", "Login to comment")}</p>
      )}

      {/* Comment List */}
      {isLoading ? (
        <div className="text-xs text-muted-foreground">{t("加载中...", "Loading...")}</div>
      ) : comments && comments.comments.length > 0 ? (
        <div className="space-y-3 max-h-64 overflow-y-auto">
          {comments.comments.map((c: any) => (
            <div key={c.id} className="flex gap-2">
              <div className="w-7 h-7 rounded-full bg-muted flex items-center justify-center text-[10px] font-bold text-muted-foreground shrink-0">
                {c.userName?.charAt(0) || "?"}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-foreground">{c.userName}</span>
                  <span className="text-[10px] text-muted-foreground">
                    {new Date(c.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-xs text-foreground/80 mt-0.5">{c.content}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-xs text-muted-foreground text-center py-4">{t("暂无评论，来抢沙发吧", "No comments yet, be the first!")}</p>
      )}
    </div>
  );
}

// --- Case Visual Card (for sharing) ---
function CaseShareCard({ c, t }: { c: EnhancedAICase; t: (zh: string, en: string) => string }) {
  const handleCopy = () => {
    const text = `${t(c.titleZh, c.titleEn)}\n${t(c.oneLinerZh, c.oneLinerEn)}\n${t("工具", "Tools")}: ${c.tools.join(", ")}\n${t("价值", "Value")}: ${t(c.impactMetricZh, c.impactMetricEn)}\n${t("部门", "Dept")}: ${c.team}`;
    navigator.clipboard.writeText(text).then(() => toast.success(t("已复制到剪贴板", "Copied to clipboard")));
  };

  return (
    <div className="relative bg-gradient-to-br from-ocean/5 via-white to-coral/5 border border-border/50 rounded-xl p-4 space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {c.caseOfWeek && (
            <Badge className="bg-coral/10 text-coral border-0 text-[10px]">
              <Trophy size={10} className="mr-0.5" /> {t("本周最佳", "Case of Week")}
            </Badge>
          )}
          {c.caseOfMonth && (
            <Badge className="bg-primary/10 text-primary border-0 text-[10px]">
              <Award size={10} className="mr-0.5" /> {t("本月最佳", "Case of Month")}
            </Badge>
          )}
        </div>
        <button onClick={handleCopy} className="p-1.5 rounded-lg hover:bg-muted transition-colors" title={t("复制分享", "Copy to share")}>
          <Copy size={14} className="text-muted-foreground" />
        </button>
      </div>
      <h3 className="text-lg font-extrabold text-foreground leading-tight">{t(c.titleZh, c.titleEn)}</h3>
      <p className="text-sm text-coral font-bold">{t(c.oneLinerZh, c.oneLinerEn)}</p>
      <div className="flex items-center gap-3 text-xs text-muted-foreground">
        <span className="flex items-center gap-1"><Wrench size={11} /> {c.tools[0]}</span>
        <span className="flex items-center gap-1"><Target size={11} /> <ValueTypeBadge type={c.primaryValueType} /></span>
        <span className="flex items-center gap-1"><Users size={11} /> {c.team}</span>
      </div>
    </div>
  );
}

// --- Leaderboard Tab ---
function LeaderboardTab({ t }: { t: (zh: string, en: string) => string }) {
  const { data: topCases, isLoading: loadingCases } = trpc.cases.topByLikes.useQuery({ limit: 10 });
  const { data: topContributors, isLoading: loadingContrib } = trpc.cases.topContributors.useQuery({ limit: 10 });

  const rankIcon = (idx: number) => {
    if (idx === 0) return <Crown size={16} className="text-warning" />;
    if (idx === 1) return <Medal size={16} className="text-muted-foreground" />;
    if (idx === 2) return <Medal size={16} className="text-coral-light" />;
    return <span className="text-xs font-bold text-muted-foreground w-4 text-center">{idx + 1}</span>;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Top Cases */}
      <Card className="border-0 shadow-sm">
        <CardContent className="p-5">
          <h3 className="text-sm font-bold text-foreground mb-4 flex items-center gap-2">
            <Trophy size={16} className="text-coral" /> {t("热门案例 TOP 10", "Top 10 Cases")}
          </h3>
          {loadingCases ? (
            <div className="text-xs text-muted-foreground py-8 text-center">{t("加载中...", "Loading...")}</div>
          ) : topCases && topCases.length > 0 ? (
            <div className="space-y-3">
              {topCases.map((c: any, idx: number) => (
                <div key={c.id} className="flex items-center gap-3">
                  <div className="w-6 flex justify-center">{rankIcon(idx)}</div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-bold text-foreground truncate">{c.title}</div>
                    <div className="text-[10px] text-muted-foreground">{c.submitterName} · {c.departmentName || t("未分类", "Uncategorized")}</div>
                  </div>
                  <div className="flex items-center gap-3 text-[10px] text-muted-foreground shrink-0">
                    <span className="flex items-center gap-0.5"><Heart size={10} className="text-coral" /> {c.likeCount}</span>
                    <span className="flex items-center gap-0.5"><Bookmark size={10} className="text-warning" /> {c.favoriteCount}</span>
                    <span className="flex items-center gap-0.5"><MessageCircle size={10} /> {c.commentCount}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-xs text-muted-foreground py-8 text-center">
              {t("暂无数据，上传第一个案例吧！", "No data yet, submit the first case!")}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Top Contributors */}
      <Card className="border-0 shadow-sm">
        <CardContent className="p-5">
          <h3 className="text-sm font-bold text-foreground mb-4 flex items-center gap-2">
            <Star size={16} className="text-warning" /> {t("贡献者排行 TOP 10", "Top 10 Contributors")}
          </h3>
          {loadingContrib ? (
            <div className="text-xs text-muted-foreground py-8 text-center">{t("加载中...", "Loading...")}</div>
          ) : topContributors && topContributors.length > 0 ? (
            <div className="space-y-3">
              {topContributors.map((c: any, idx: number) => (
                <div key={c.userId} className="flex items-center gap-3">
                  <div className="w-6 flex justify-center">{rankIcon(idx)}</div>
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">
                    {c.userName?.charAt(0) || "?"}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-bold text-foreground">{c.userName}</div>
                    <div className="text-[10px] text-muted-foreground">
                      Lv.{c.level} · {c.totalPoints} {t("积分", "pts")}
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="text-sm font-extrabold text-primary">{c.totalPoints}</div>
                    <div className="text-[10px] text-muted-foreground">{t("积分", "Points")}</div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-xs text-muted-foreground py-8 text-center">
              {t("暂无数据，参与互动赚取积分！", "No data yet, interact to earn points!")}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Points Rules */}
      <Card className="border-0 shadow-sm lg:col-span-2">
        <CardContent className="p-5">
          <h3 className="text-sm font-bold text-foreground mb-3 flex items-center gap-2">
            <Zap size={14} className="text-warning" /> {t("积分规则", "Points Rules")}
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
            {[
              { action: t("上传案例", "Upload Case"), pts: "+20", icon: <FileText size={14} /> },
              { action: t("点赞案例", "Like Case"), pts: "+2", icon: <Heart size={14} /> },
              { action: t("收藏案例", "Favorite"), pts: "+3", icon: <Bookmark size={14} /> },
              { action: t("评论案例", "Comment"), pts: "+5", icon: <MessageCircle size={14} /> },
              { action: t("案例被点赞", "Receive Like"), pts: "+1", icon: <ThumbsUp size={14} /> },
              { action: t("裂变复用", "Fission"), pts: "+15", icon: <ArrowUpRight size={14} /> },
            ].map((r) => (
              <div key={r.action} className="bg-muted/30 rounded-lg p-3 text-center">
                <div className="text-muted-foreground mb-1">{r.icon}</div>
                <div className="text-xs font-medium text-foreground">{r.action}</div>
                <div className="text-sm font-extrabold text-primary mt-0.5">{r.pts}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// --- Main Component ---
export default function CasesLibrary() {
  const { t, lang } = useLanguage();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("cases");
  const [search, setSearch] = useState("");
  const [scenarioFilter, setScenarioFilter] = useState("all");
  const [maturityFilter, setMaturityFilter] = useState<string>("all");
  const [valueFilter, setValueFilter] = useState<string>("all");
  const [selectedCase, setSelectedCase] = useState<EnhancedAICase | null>(null);

  // Interaction state for all visible cases (from DB)
  // EnhancedAICase.id is string; tRPC expects number. Use numeric hash for static cases.
  const caseNumericIdMap = useMemo(() => {
    const map: Record<string, number> = {};
    enhancedCases.forEach((c, i) => { map[c.id] = i + 10000; });
    return map;
  }, []);
  const numericCaseIds = useMemo(() => Object.values(caseNumericIdMap), [caseNumericIdMap]);
  const { data: interactionsBatch } = trpc.cases.getInteractionsBatch.useQuery(
    { caseIds: numericCaseIds },
    { enabled: !!user && numericCaseIds.length > 0 }
  );

  // DB cases with real counts
  const { data: dbCases } = trpc.cases.list.useQuery({ limit: 200 });

  // Build a map of DB case interaction counts (keyed by string ID for static cases)
  const dbCaseMap = useMemo(() => {
    const map: Record<string, { likeCount: number; favoriteCount: number; commentCount: number; viewCount: number }> = {};
    if (dbCases && (dbCases as any).cases) {
      ((dbCases as any).cases as any[]).forEach((c: any) => {
        map[String(c.id)] = {
          likeCount: c.likeCount || 0,
          favoriteCount: c.favoriteCount || 0,
          commentCount: c.commentCount || 0,
          viewCount: c.viewCount || 0,
        };
      });
    }
    return map;
  }, [dbCases]);

  // Interaction state map (keyed by string ID)
  const interactionsMap = useMemo(() => {
    const map: Record<string, { liked: boolean; favorited: boolean }> = {};
    if (interactionsBatch) {
      Object.entries(interactionsBatch as Record<string, any>).forEach(([id, state]) => {
        map[String(id)] = state;
      });
    }
    return map;
  }, [interactionsBatch]);

  const utils = trpc.useUtils();
  const toggleLike = trpc.cases.toggleLike.useMutation({
    onSuccess: (data: any) => {
      utils.cases.getInteractionsBatch.invalidate();
      utils.cases.list.invalidate();
      if (data.liked) toast.success(t("点赞成功 +2积分", "Liked +2 pts"));
    },
  });
  const toggleFavorite = trpc.cases.toggleFavorite.useMutation({
    onSuccess: (data: any) => {
      utils.cases.getInteractionsBatch.invalidate();
      utils.cases.list.invalidate();
      if (data.favorited) toast.success(t("收藏成功 +3积分", "Favorited +3 pts"));
    },
  });
  const recordView = trpc.cases.recordView.useMutation();

  // Record view when opening case detail
  const handleSelectCase = (c: EnhancedAICase) => {
    setSelectedCase(c);
    const numId = caseNumericIdMap[c.id] || 0;
    if (numId) recordView.mutate({ caseId: numId });
  };

  // Group scenarios by parent
  const scenarioGroups = useMemo(() => {
    const groups: Record<string, typeof businessScenarios> = {};
    businessScenarios.forEach((s) => {
      const parent = lang === "zh" ? (s.parentZh || "其他") : (s.parentEn || "Other");
      if (!groups[parent]) groups[parent] = [];
      groups[parent].push(s);
    });
    return groups;
  }, [lang]);

  // Filter cases
  const filteredCases = useMemo(() => {
    return enhancedCases
      .filter((c) => {
        const matchSearch = c.titleZh.includes(search) || c.titleEn.toLowerCase().includes(search.toLowerCase());
        const matchScenario = scenarioFilter === "all" || c.businessScenario === scenarioFilter;
        const matchMaturity = maturityFilter === "all" || c.maturityLevel === maturityFilter;
        const matchValue = valueFilter === "all" || c.primaryValueType === valueFilter;
        return matchSearch && matchScenario && matchMaturity && matchValue;
      })
      .sort((a, b) => b.score.total - a.score.total);
  }, [search, scenarioFilter, maturityFilter, valueFilter]);

  // Featured cases
  const caseOfWeek = enhancedCases.find((c) => c.caseOfWeek);
  const caseOfMonth = enhancedCases.find((c) => c.caseOfMonth);

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6 max-w-[1400px] mx-auto">
      {/* Header */}
      <motion.div variants={item} className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-2xl font-extrabold text-foreground">{t("AI 案例库", "AI Case Library")}</h1>
            <Badge variant="secondary" className="text-[10px]">{enhancedCases.length} {t("个案例", "Cases")}</Badge>
          </div>
          <p className="text-sm text-muted-foreground">
            {t("看案例 → 学方法 → 复制Prompt → 应用到业务 → 上传案例 → 通晒投票", "View → Learn → Copy Prompt → Apply → Upload Case → Showcase & Vote")}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/cases/submit">
            <button className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-coral text-white text-sm font-bold hover:bg-coral/90 transition-colors shadow-sm">
              <Plus size={16} /> {t("上传案例", "Submit Case")}
            </button>
          </Link>
          <div className="relative w-full lg:w-72">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder={t("搜索案例、方法、工具...", "Search cases, methods, tools...")}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 bg-card border-border/50"
            />
          </div>
        </div>
      </motion.div>

      {/* 5-Layer Tabs (added Leaderboard) */}
      <motion.div variants={item}>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="bg-muted/50 p-1 h-auto flex-wrap">
            <TabsTrigger value="cases" className="gap-1.5 data-[state=active]:bg-white data-[state=active]:shadow-sm">
              <FileText size={14} /> {t("AI案例", "AI Cases")}
              <Badge variant="secondary" className="text-[9px] ml-1 h-4 px-1">{enhancedCases.length}</Badge>
            </TabsTrigger>
            <TabsTrigger value="playbooks" className="gap-1.5 data-[state=active]:bg-white data-[state=active]:shadow-sm">
              <BookOpen size={14} /> {t("AI方法", "AI Playbooks")}
              <Badge variant="secondary" className="text-[9px] ml-1 h-4 px-1">{aiPlaybooks.length}</Badge>
            </TabsTrigger>
            <TabsTrigger value="prompts" className="gap-1.5 data-[state=active]:bg-white data-[state=active]:shadow-sm">
              <Sparkles size={14} /> {t("AI Prompts", "AI Prompts")}
              <Badge variant="secondary" className="text-[9px] ml-1 h-4 px-1">{prompts.length}</Badge>
            </TabsTrigger>
            <TabsTrigger value="tools" className="gap-1.5 data-[state=active]:bg-white data-[state=active]:shadow-sm">
              <Wrench size={14} /> {t("AI工具", "AI Tools")}
              <Badge variant="secondary" className="text-[9px] ml-1 h-4 px-1">{enhancedTools.length}</Badge>
            </TabsTrigger>
            <TabsTrigger value="maturity" className="gap-1.5 data-[state=active]:bg-white data-[state=active]:shadow-sm">
              <BarChart3 size={14} /> {t("成熟度地图", "Maturity Map")}
            </TabsTrigger>
            <TabsTrigger value="leaderboard" className="gap-1.5 data-[state=active]:bg-white data-[state=active]:shadow-sm">
              <Trophy size={14} /> {t("排行榜", "Leaderboard")}
            </TabsTrigger>
          </TabsList>

          {/* ===== TAB: CASES ===== */}
          <TabsContent value="cases" className="mt-5 space-y-5">
            {/* Featured Cases Banner */}
            {(caseOfWeek || caseOfMonth) && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {caseOfWeek && <CaseShareCard c={caseOfWeek} t={t} />}
                {caseOfMonth && <CaseShareCard c={caseOfMonth} t={t} />}
              </div>
            )}

            {/* Filters Row */}
            <div className="space-y-3">
              {/* Business Scenario Filter */}
              <div className="flex gap-1.5 overflow-x-auto pb-1">
                <button
                  onClick={() => setScenarioFilter("all")}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
                    scenarioFilter === "all" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"
                  }`}
                >
                  {t("全部场景", "All Scenarios")}
                </button>
                {Object.entries(scenarioGroups).map(([group, scenarios]) => (
                  scenarios.map((s) => (
                    <button
                      key={s.id}
                      onClick={() => setScenarioFilter(s.id)}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
                        scenarioFilter === s.id ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"
                      }`}
                    >
                      {s.icon} {t(s.zh, s.en)}
                    </button>
                  ))
                ))}
              </div>

              {/* Maturity & Value Type Filters */}
              <div className="flex flex-wrap gap-2">
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">{t("成熟度", "Maturity")}:</span>
                  {(["all", "L1", "L2", "L3", "L4", "L5"] as const).map((level) => (
                    <button
                      key={level}
                      onClick={() => setMaturityFilter(level)}
                      className={`px-2 py-0.5 rounded text-[10px] font-bold transition-colors ${
                        maturityFilter === level ? "bg-ocean-light/20 text-ocean-light" : "bg-muted/50 text-muted-foreground hover:bg-muted"
                      }`}
                    >
                      {level === "all" ? t("全部", "All") : level}
                    </button>
                  ))}
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">{t("价值", "Value")}:</span>
                  {(["all", "efficiency", "productivity", "cost", "revenue", "customer"] as const).map((vt) => (
                    <button
                      key={vt}
                      onClick={() => setValueFilter(vt)}
                      className={`px-2 py-0.5 rounded text-[10px] font-medium transition-colors ${
                        valueFilter === vt ? "bg-coral/10 text-coral" : "bg-muted/50 text-muted-foreground hover:bg-muted"
                      }`}
                    >
                      {vt === "all" ? t("全部", "All") : valueTypes[vt].icon + " " + t(valueTypes[vt].zh, valueTypes[vt].en)}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Case Cards Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
              <AnimatePresence mode="popLayout">
                {filteredCases.map((c) => {
                  const dbInfo = dbCaseMap[c.id] || { likeCount: 0, favoriteCount: 0, commentCount: 0, viewCount: 0 };
                  const interaction = interactionsMap[c.id] || { liked: false, favorited: false };
                  const numId = caseNumericIdMap[c.id] || 0;
                  return (
                    <motion.div
                      key={c.id}
                      variants={item}
                      layout
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                    >
                      <Card
                        className="border-0 shadow-sm h-full hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
                        onClick={() => handleSelectCase(c)}
                      >
                        <CardContent className="p-5 flex flex-col h-full">
                          {/* Top Row: Badges */}
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-1.5 flex-wrap">
                              <MaturityBadge level={c.maturityLevel} />
                              <ValueTypeBadge type={c.primaryValueType} />
                              {c.caseOfWeek && (
                                <Badge className="bg-coral/10 text-coral border-0 text-[10px]">
                                  <Trophy size={9} className="mr-0.5" /> {t("周最佳", "Weekly")}
                                </Badge>
                              )}
                              {c.caseOfMonth && (
                                <Badge className="bg-primary/10 text-primary border-0 text-[10px]">
                                  <Award size={9} className="mr-0.5" /> {t("月最佳", "Monthly")}
                                </Badge>
                              )}
                            </div>
                            <div className="flex items-center gap-1 text-coral font-extrabold text-sm">
                              <TrendingUp size={14} /> {c.efficiencyGain}
                            </div>
                          </div>

                          {/* Title */}
                          <h3 className="text-base font-bold text-foreground mb-1 leading-snug">
                            {t(c.titleZh, c.titleEn)}
                          </h3>
                          <p className="text-xs text-coral/80 font-medium mb-3">{t(c.oneLinerZh, c.oneLinerEn)}</p>

                          {/* Value Scorecard Mini */}
                          <div className="grid grid-cols-2 gap-2 mb-3">
                            <div className="bg-muted/30 rounded-lg p-2">
                              <div className="text-[10px] text-muted-foreground">{t("效率提升", "Efficiency")}</div>
                              <div className="text-sm font-bold text-teal">{c.valueScorecard.efficiency.metric}</div>
                            </div>
                            <div className="bg-muted/30 rounded-lg p-2">
                              <div className="text-[10px] text-muted-foreground">{t("影响指标", "Impact")}</div>
                              <div className="text-sm font-bold text-ocean-light">{t(c.impactMetricZh, c.impactMetricEn)}</div>
                            </div>
                          </div>

                          {/* Score Bar */}
                          <div className="mb-3">
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-[10px] text-muted-foreground">{t("综合评分", "Overall Score")}</span>
                              <span className="text-xs font-bold text-foreground">{c.score.total}/100</span>
                            </div>
                            <ScoreBar score={c.score.total} />
                          </div>

                          {/* Footer */}
                          <div className="pt-3 border-t border-border/30 mt-auto">
                            <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                              <span className="flex items-center gap-1"><Users size={11} /> {c.team}</span>
                              <span>·</span>
                              <span className="flex items-center gap-1"><Calendar size={11} /> {c.date}</span>
                            </div>
                            <div className="flex flex-wrap gap-1 mb-2">
                              {c.tools.slice(0, 3).map((tool) => (
                                <span key={tool} className="text-[10px] px-2 py-0.5 rounded-full bg-primary/5 text-primary font-medium">
                                  {tool}
                                </span>
                              ))}
                              {c.tools.length > 3 && (
                                <span className="text-[10px] px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                                  +{c.tools.length - 3}
                                </span>
                              )}
                            </div>
                            {/* Interaction Bar */}
                            <InteractionBar
                              caseId={numId}
                              likeCount={dbInfo.likeCount}
                              favoriteCount={dbInfo.favoriteCount}
                              commentCount={dbInfo.commentCount}
                              viewCount={dbInfo.viewCount}
                              liked={interaction.liked}
                              favorited={interaction.favorited}
                              onLike={() => user ? toggleLike.mutate({ caseId: numId }) : toast.error(t("请先登录", "Please login"))}
                              onFavorite={() => user ? toggleFavorite.mutate({ caseId: numId }) : toast.error(t("请先登录", "Please login"))}
                              onComment={() => handleSelectCase(c)}
                              t={t}
                            />
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          </TabsContent>

          {/* ===== TAB: PLAYBOOKS ===== */}
          <TabsContent value="playbooks" className="mt-5 space-y-4">
            <p className="text-sm text-muted-foreground">
              {t("AI Playbook 是可复制的方法论，帮助员工从案例中学习并应用到自己的业务。", "AI Playbooks are replicable methodologies that help employees learn from cases and apply to their own work.")}
            </p>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {aiPlaybooks.map((pb) => (
                <motion.div key={pb.id} variants={item}>
                  <Card className="border-0 shadow-sm hover:shadow-md transition-all duration-200">
                    <CardContent className="p-5">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <MaturityBadge level={pb.maturityLevel} />
                          <Badge variant="secondary" className="text-[10px]">
                            {pb.steps.length} {t("步骤", "Steps")}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1"><Users size={11} /> {pb.usageCount}</span>
                          <span className="flex items-center gap-1">⭐ {pb.rating}</span>
                        </div>
                      </div>

                      <h3 className="text-base font-bold text-foreground mb-1">{t(pb.titleZh, pb.titleEn)}</h3>
                      <p className="text-xs text-muted-foreground mb-4">{t(pb.descZh, pb.descEn)}</p>

                      {/* Steps Flow */}
                      <div className="space-y-2">
                        {pb.steps.map((step, idx) => (
                          <div key={step.stepNumber} className="flex items-start gap-3">
                            <div className="flex flex-col items-center">
                              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold ${
                                idx === 0 ? "bg-teal/10 text-teal" :
                                idx === pb.steps.length - 1 ? "bg-coral/10 text-coral" :
                                "bg-muted text-muted-foreground"
                              }`}>
                                {step.stepNumber}
                              </div>
                              {idx < pb.steps.length - 1 && (
                                <div className="w-px h-4 bg-border/50 my-0.5" />
                              )}
                            </div>
                            <div className="flex-1 pb-1">
                              <div className="flex items-center gap-2">
                                <span className="text-xs font-bold text-foreground">{t(step.titleZh, step.titleEn)}</span>
                                {step.durationZh && (
                                  <span className="text-[10px] text-muted-foreground flex items-center gap-0.5">
                                    <Clock size={9} /> {t(step.durationZh, step.durationEn || step.durationZh)}
                                  </span>
                                )}
                              </div>
                              <p className="text-[11px] text-muted-foreground line-clamp-1">{t(step.descZh, step.descEn)}</p>
                              {step.tools && step.tools.length > 0 && (
                                <div className="flex gap-1 mt-1">
                                  {step.tools.map((tool) => (
                                    <span key={tool} className="text-[9px] px-1.5 py-0.5 rounded bg-primary/5 text-primary">
                                      {tool}
                                    </span>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Related Cases */}
                      {pb.relatedCaseIds.length > 0 && (
                        <div className="mt-4 pt-3 border-t border-border/30">
                          <span className="text-[10px] text-muted-foreground uppercase tracking-wider">{t("相关案例", "Related Cases")}</span>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {pb.relatedCaseIds.map((cid) => {
                              const relCase = enhancedCases.find((c) => c.id === cid);
                              return relCase ? (
                                <button
                                  key={cid}
                                  onClick={() => { setActiveTab("cases"); setSelectedCase(relCase); }}
                                  className="text-[10px] px-2 py-0.5 rounded-full bg-ocean-light/10 text-ocean-light hover:bg-ocean-light/20 transition-colors"
                                >
                                  {t(relCase.titleZh, relCase.titleEn)}
                                </button>
                              ) : null;
                            })}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          {/* ===== TAB: PROMPTS ===== */}
          <TabsContent value="prompts" className="mt-5 space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                {t("可直接复用的AI Prompt模板，点击复制即可使用。", "Ready-to-use AI Prompt templates. Click to copy.")}
              </p>
              <Link href="/prompts" className="text-xs text-primary font-medium flex items-center gap-1 hover:underline">
                {t("查看完整Prompt库", "View Full Prompt Library")} <ArrowRight size={12} />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {prompts.slice(0, 6).map((p) => (
                <motion.div key={p.id} variants={item}>
                  <Card className="border-0 shadow-sm hover:shadow-md transition-all duration-200">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="secondary" className="text-[10px]">{t(
                          p.category === "marketing" ? "营销" :
                          p.category === "design" ? "设计" :
                          p.category === "merchandising" ? "商品" :
                          p.category === "data" ? "数据" :
                          p.category === "operations" ? "运营" : "通用",
                          p.category
                        )}</Badge>
                        <span className="text-[10px] text-muted-foreground">⭐ {p.rating} · {p.usageCount} {t("次使用", "uses")}</span>
                      </div>
                      <h4 className="text-sm font-bold text-foreground mb-1">{t(p.titleZh, p.titleEn)}</h4>
                      <p className="text-[11px] text-muted-foreground line-clamp-2 mb-3">{t(p.descriptionZh, p.descriptionEn)}</p>
                      <div className="bg-muted/30 rounded-lg p-2 mb-2">
                        <code className="text-[10px] text-foreground/70 line-clamp-3 block whitespace-pre-wrap">{p.promptText.slice(0, 150)}...</code>
                      </div>
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(p.promptText).then(() => toast.success(t("Prompt已复制", "Prompt copied")));
                        }}
                        className="w-full flex items-center justify-center gap-1.5 py-1.5 rounded-lg bg-primary/5 text-primary text-xs font-medium hover:bg-primary/10 transition-colors"
                      >
                        <Copy size={12} /> {t("复制Prompt", "Copy Prompt")}
                      </button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          {/* ===== TAB: TOOLS ===== */}
          <TabsContent value="tools" className="mt-5 space-y-4">
            <p className="text-sm text-muted-foreground">
              {t("公司批准使用的AI工具目录，包含使用场景和状态。", "Company-approved AI tools directory with use cases and status.")}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {enhancedTools.map((tool) => (
                <motion.div key={tool.id} variants={item}>
                  <Card className="border-0 shadow-sm hover:shadow-md transition-all duration-200">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                            <Wrench size={16} className="text-primary" />
                          </div>
                          <div>
                            <h4 className="text-sm font-bold text-foreground">{tool.name}</h4>
                            <span className="text-[10px] text-muted-foreground">{t(tool.categoryZh, tool.categoryEn)}</span>
                          </div>
                        </div>
                        <Badge className={`text-[10px] border-0 ${
                          tool.statusEn === "Approved" ? "bg-success/10 text-success" : "bg-warning/10 text-warning"
                        }`}>
                          <CheckCircle2 size={10} className="mr-0.5" /> {t(tool.statusZh, tool.statusEn)}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mb-3">{t(tool.descZh, tool.descEn)}</p>
                      <div className="space-y-1.5">
                        <span className="text-[10px] text-muted-foreground uppercase tracking-wider">{t("使用场景", "Use Cases")}</span>
                        <div className="flex flex-wrap gap-1">
                          {(lang === "zh" ? tool.useCasesZh : tool.useCasesEn).map((uc) => (
                            <span key={uc} className="text-[10px] px-2 py-0.5 rounded-full bg-muted text-muted-foreground">{uc}</span>
                          ))}
                        </div>
                      </div>
                      <div className="mt-3 pt-2 border-t border-border/30 flex items-center justify-between text-[10px] text-muted-foreground">
                        <span>{t("使用次数", "Usage")}: {tool.usageCount.toLocaleString()}</span>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          {/* ===== TAB: MATURITY MAP ===== */}
          <TabsContent value="maturity" className="mt-5 space-y-5">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Maturity Level Legend */}
              <Card className="border-0 shadow-sm lg:w-80 shrink-0">
                <CardContent className="p-5">
                  <h3 className="text-sm font-bold text-foreground mb-3">{t("AI成熟度等级", "AI Maturity Levels")}</h3>
                  <div className="space-y-3">
                    {(Object.entries(maturityLevels) as [MaturityLevel, typeof maturityLevels[MaturityLevel]][]).map(([level, info]) => (
                      <div key={level} className="flex items-center gap-3">
                        <span className={`w-10 text-center py-1 rounded text-xs font-bold ${info.bgColor} ${info.color}`}>{level}</span>
                        <span className="text-xs text-foreground">{t(info.zh, info.en)}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 pt-3 border-t border-border/30">
                    <div className="text-xs text-muted-foreground mb-1">{t("公司平均成熟度", "Company Avg Maturity")}</div>
                    <div className="text-2xl font-extrabold text-primary">{aiTransformationDashboard.avgMaturityLevel}</div>
                  </div>
                </CardContent>
              </Card>

              {/* Department Map */}
              <div className="flex-1 space-y-3">
                <h3 className="text-sm font-bold text-foreground">{t("部门AI成熟度地图", "Department AI Maturity Map")}</h3>
                {departmentMaturityMap.map((dept) => (
                  <Card key={dept.departmentEn} className="border-0 shadow-sm">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <span className="text-sm font-bold text-foreground">{t(dept.departmentZh, dept.departmentEn)}</span>
                          <MaturityBadge level={dept.level} />
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-extrabold text-primary">{dept.score.toFixed(1)}</div>
                          <div className="text-[10px] text-muted-foreground">{dept.cases} {t("个案例", "cases")}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex-1">
                          <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                            <div
                              className="h-full rounded-full transition-all duration-700"
                              style={{
                                width: `${(dept.score / 5) * 100}%`,
                                background: dept.score >= 3 ? "var(--color-teal)" : dept.score >= 2 ? "var(--color-ocean-light)" : "var(--color-coral)",
                              }}
                            />
                          </div>
                        </div>
                        <span className="text-[10px] text-muted-foreground whitespace-nowrap">
                          {t("主要场景", "Top Scenario")}: {t(dept.topScenarioZh, dept.topScenarioEn)}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* ===== TAB: LEADERBOARD ===== */}
          <TabsContent value="leaderboard" className="mt-5">
            <LeaderboardTab t={t} />
          </TabsContent>
        </Tabs>
      </motion.div>

      {/* ===== CASE DETAIL MODAL ===== */}
      <AnimatePresence>
        {selectedCase && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-start justify-center p-4 pt-16 overflow-y-auto"
            onClick={() => setSelectedCase(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.97 }}
              className="bg-card rounded-2xl shadow-2xl max-w-3xl w-full max-h-[85vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <CaseDetailPanel
                c={selectedCase}
                t={t}
                lang={lang}
                onClose={() => setSelectedCase(null)}
                user={user}
                interactionsMap={interactionsMap}
                dbCaseMap={dbCaseMap}
                caseNumericIdMap={caseNumericIdMap}
                onLike={(id: number) => toggleLike.mutate({ caseId: id })}
                onFavorite={(id: number) => toggleFavorite.mutate({ caseId: id })}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// --- Case Detail Panel ---
function CaseDetailPanel({
  c, t, lang, onClose, user, interactionsMap, dbCaseMap, caseNumericIdMap, onLike, onFavorite
}: {
  c: EnhancedAICase;
  t: (zh: string, en: string) => string;
  lang: string;
  onClose: () => void;
  user: any;
  interactionsMap: Record<string, { liked: boolean; favorited: boolean }>;
  dbCaseMap: Record<string, { likeCount: number; favoriteCount: number; commentCount: number; viewCount: number }>;
  onLike: (id: number) => void;
  onFavorite: (id: number) => void;
  caseNumericIdMap: Record<string, number>;
}) {
  const handleCopy = () => {
    const text = `【${t(c.titleZh, c.titleEn)}】\n${t(c.oneLinerZh, c.oneLinerEn)}\n\n${t("问题", "Problem")}: ${t(c.problemZh, c.problemEn)}\n${t("方案", "Approach")}: ${t(c.approachZh, c.approachEn)}\n${t("成果", "Result")}: ${t(c.resultZh, c.resultEn)}\n\n${t("工具", "Tools")}: ${c.tools.join(", ")}\n${t("成熟度", "Maturity")}: ${c.maturityLevel}\n${t("评分", "Score")}: ${c.score.total}/100`;
    navigator.clipboard.writeText(text).then(() => toast.success(t("案例卡片已复制", "Case card copied")));
  };

  const relatedPlaybook = c.relatedPlaybookId ? aiPlaybooks.find((pb) => pb.id === c.relatedPlaybookId) : null;
  const relatedPromptsList = (c.relatedPromptIds || []).map((pid) => prompts.find((p) => p.id === pid)).filter(Boolean);

  const dbInfo = dbCaseMap[c.id] || { likeCount: 0, favoriteCount: 0, commentCount: 0, viewCount: 0 };
  const interaction = interactionsMap[c.id] || { liked: false, favorited: false };
  const numId = caseNumericIdMap[c.id] || 0;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <MaturityBadge level={c.maturityLevel} />
            <ValueTypeBadge type={c.primaryValueType} />
            {c.caseOfWeek && <Badge className="bg-coral/10 text-coral border-0 text-[10px]"><Trophy size={9} className="mr-0.5" /> {t("本周最佳", "Case of Week")}</Badge>}
            {c.caseOfMonth && <Badge className="bg-primary/10 text-primary border-0 text-[10px]"><Award size={9} className="mr-0.5" /> {t("本月最佳", "Case of Month")}</Badge>}
          </div>
          <h2 className="text-xl font-extrabold text-foreground mb-1">{t(c.titleZh, c.titleEn)}</h2>
          <p className="text-sm text-coral font-bold">{t(c.oneLinerZh, c.oneLinerEn)}</p>
          <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
            <span className="flex items-center gap-1"><Users size={11} /> {c.team}</span>
            <span className="flex items-center gap-1"><Calendar size={11} /> {c.date}</span>
            <span className="flex items-center gap-1"><Layers size={11} /> {c.businessFunction}</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={handleCopy} className="p-2 rounded-lg hover:bg-muted transition-colors" title={t("复制分享卡片", "Copy share card")}>
            <Share2 size={16} className="text-muted-foreground" />
          </button>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-muted transition-colors text-muted-foreground text-lg font-bold">×</button>
        </div>
      </div>

      {/* Interaction Bar in Detail */}
      <div className="flex items-center gap-4 py-3 px-4 bg-muted/30 rounded-xl">
        <button
          onClick={() => user ? onLike(numId) : toast.error(t("请先登录", "Please login"))}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm transition-colors ${interaction.liked ? "bg-coral/10 text-coral font-bold" : "hover:bg-muted text-muted-foreground"}`}
        >
          <Heart size={16} className={interaction.liked ? "fill-coral" : ""} /> {dbInfo.likeCount} {t("点赞", "Likes")}
        </button>
        <button
          onClick={() => user ? onFavorite(numId) : toast.error(t("请先登录", "Please login"))}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm transition-colors ${interaction.favorited ? "bg-warning/10 text-warning font-bold" : "hover:bg-muted text-muted-foreground"}`}
        >
          <Bookmark size={16} className={interaction.favorited ? "fill-warning" : ""} /> {dbInfo.favoriteCount} {t("收藏", "Favorites")}
        </button>
        <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
          <MessageCircle size={16} /> {dbInfo.commentCount} {t("评论", "Comments")}
        </span>
        <span className="flex items-center gap-1.5 text-sm text-muted-foreground ml-auto">
          <Eye size={16} /> {dbInfo.viewCount} {t("浏览", "Views")}
        </span>
      </div>

      {/* Problem → Approach → Result */}
      <div className="space-y-3">
        <div className="bg-destructive/5 rounded-xl p-4">
          <span className="text-[10px] font-bold text-destructive uppercase tracking-wider">{t("问题", "Problem")}</span>
          <p className="text-sm text-foreground mt-1">{t(c.problemZh, c.problemEn)}</p>
        </div>
        <div className="bg-ocean-light/5 rounded-xl p-4">
          <span className="text-[10px] font-bold text-ocean-light uppercase tracking-wider">{t("方案", "Approach")}</span>
          <p className="text-sm text-foreground mt-1">{t(c.approachZh, c.approachEn)}</p>
        </div>
        <div className="bg-success/5 rounded-xl p-4">
          <span className="text-[10px] font-bold text-success uppercase tracking-wider">{t("成果", "Result")}</span>
          <p className="text-sm text-foreground mt-1">{t(c.resultZh, c.resultEn)}</p>
        </div>
      </div>

      {/* AI Value Scorecard */}
      <div>
        <h3 className="text-sm font-bold text-foreground mb-3 flex items-center gap-2">
          <BarChart3 size={14} className="text-primary" /> {t("AI 价值评分卡", "AI Value Scorecard")}
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          <div className="bg-teal/5 rounded-xl p-3 border border-teal/10">
            <div className="flex items-center gap-1.5 mb-2">
              <span className="text-sm">⚡</span>
              <span className="text-xs font-bold text-teal">{t("效率", "Efficiency")}</span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <span className="text-muted-foreground line-through">{t(c.valueScorecard.efficiency.beforeZh, c.valueScorecard.efficiency.beforeEn)}</span>
              <ArrowRight size={10} className="text-teal" />
              <span className="font-bold text-foreground">{t(c.valueScorecard.efficiency.afterZh, c.valueScorecard.efficiency.afterEn)}</span>
            </div>
            <div className="text-lg font-extrabold text-teal mt-1">{c.valueScorecard.efficiency.metric}</div>
          </div>
          <div className="bg-ocean-light/5 rounded-xl p-3 border border-ocean-light/10">
            <div className="flex items-center gap-1.5 mb-2">
              <span className="text-sm">📈</span>
              <span className="text-xs font-bold text-ocean-light">{t("产出", "Productivity")}</span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <span className="text-muted-foreground line-through">{t(c.valueScorecard.productivity.beforeZh, c.valueScorecard.productivity.beforeEn)}</span>
              <ArrowRight size={10} className="text-ocean-light" />
              <span className="font-bold text-foreground">{t(c.valueScorecard.productivity.afterZh, c.valueScorecard.productivity.afterEn)}</span>
            </div>
            <div className="text-lg font-extrabold text-ocean-light mt-1">{c.valueScorecard.productivity.metric}</div>
          </div>
          <div className="bg-success/5 rounded-xl p-3 border border-success/10">
            <div className="flex items-center gap-1.5 mb-2">
              <span className="text-sm">💰</span>
              <span className="text-xs font-bold text-success">{t("成本", "Cost")}</span>
            </div>
            <p className="text-xs text-muted-foreground">{t(c.valueScorecard.cost.descZh, c.valueScorecard.cost.descEn)}</p>
            <div className="text-lg font-extrabold text-success mt-1">{c.valueScorecard.cost.metric}</div>
          </div>
          <div className="bg-coral/5 rounded-xl p-3 border border-coral/10">
            <div className="flex items-center gap-1.5 mb-2">
              <span className="text-sm">🎯</span>
              <span className="text-xs font-bold text-coral">{t("收入", "Revenue")}</span>
            </div>
            <p className="text-xs text-muted-foreground">{t(c.valueScorecard.revenue.descZh, c.valueScorecard.revenue.descEn)}</p>
            <div className="text-lg font-extrabold text-coral mt-1">{c.valueScorecard.revenue.metric}</div>
          </div>
          <div className="bg-primary/5 rounded-xl p-3 border border-primary/10">
            <div className="flex items-center gap-1.5 mb-2">
              <span className="text-sm">❤️</span>
              <span className="text-xs font-bold text-primary">{t("客户价值", "Customer Value")}</span>
            </div>
            <p className="text-xs text-muted-foreground">{t(c.valueScorecard.customer.descZh, c.valueScorecard.customer.descEn)}</p>
            <div className="text-lg font-extrabold text-primary mt-1">{c.valueScorecard.customer.metric}</div>
          </div>
        </div>
      </div>

      {/* Scoring Model */}
      <div>
        <h3 className="text-sm font-bold text-foreground mb-3 flex items-center gap-2">
          <Target size={14} className="text-coral" /> {t("案例评分", "Case Scoring")}
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: t("商业价值", "Business Value"), score: c.score.businessValue, weight: "40%", color: "bg-coral" },
            { label: t("可复制性", "Replicability"), score: c.score.replicability, weight: "30%", color: "bg-teal" },
            { label: t("创新性", "Innovation"), score: c.score.innovation, weight: "20%", color: "bg-ocean-light" },
            { label: t("传播性", "Virality"), score: c.score.virality, weight: "10%", color: "bg-primary" },
          ].map((dim) => (
            <div key={dim.label} className="text-center">
              <div className="text-2xl font-extrabold text-foreground">{dim.score}</div>
              <div className="text-[10px] text-muted-foreground">{dim.label} ({dim.weight})</div>
              <div className="w-full h-1.5 bg-muted rounded-full mt-1 overflow-hidden">
                <div className={`h-full rounded-full ${dim.color}`} style={{ width: `${dim.score}%` }} />
              </div>
            </div>
          ))}
        </div>
        <div className="mt-3 text-center">
          <span className="text-xs text-muted-foreground">{t("综合评分", "Overall Score")}: </span>
          <span className="text-xl font-extrabold text-primary">{c.score.total}</span>
          <span className="text-xs text-muted-foreground">/100</span>
        </div>
      </div>

      {/* Related Playbook */}
      {relatedPlaybook && (
        <div>
          <h3 className="text-sm font-bold text-foreground mb-3 flex items-center gap-2">
            <BookOpen size={14} className="text-teal" /> {t("相关 Playbook", "Related Playbook")}
          </h3>
          <Card className="border border-teal/20 shadow-none bg-teal/5">
            <CardContent className="p-4">
              <h4 className="text-sm font-bold text-foreground mb-2">{t(relatedPlaybook.titleZh, relatedPlaybook.titleEn)}</h4>
              <div className="flex items-center gap-4 flex-wrap">
                {relatedPlaybook.steps.map((step, idx) => (
                  <div key={step.stepNumber} className="flex items-center gap-1">
                    <span className="text-[10px] font-bold text-teal bg-teal/10 w-5 h-5 rounded-full flex items-center justify-center">{step.stepNumber}</span>
                    <span className="text-[10px] text-foreground whitespace-nowrap">{t(step.titleZh, step.titleEn)}</span>
                    {idx < relatedPlaybook.steps.length - 1 && <ChevronRight size={10} className="text-muted-foreground" />}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Related Prompts */}
      {relatedPromptsList.length > 0 && (
        <div>
          <h3 className="text-sm font-bold text-foreground mb-3 flex items-center gap-2">
            <Sparkles size={14} className="text-ocean-light" /> {t("相关 Prompts", "Related Prompts")}
          </h3>
          <div className="space-y-2">
            {relatedPromptsList.map((p) => p && (
              <div key={p.id} className="bg-muted/30 rounded-lg p-3 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-foreground">{t(p.titleZh, p.titleEn)}</h4>
                  <p className="text-[10px] text-muted-foreground">{t(p.descriptionZh, p.descriptionEn)}</p>
                </div>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(p.promptText).then(() => toast.success(t("Prompt已复制", "Prompt copied")));
                  }}
                  className="shrink-0 p-2 rounded-lg hover:bg-muted transition-colors"
                >
                  <Copy size={14} className="text-primary" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tools */}
      <div>
        <h3 className="text-sm font-bold text-foreground mb-2 flex items-center gap-2">
          <Wrench size={14} className="text-muted-foreground" /> {t("使用工具", "Tools Used")}
        </h3>
        <div className="flex flex-wrap gap-2">
          {c.tools.map((tool) => (
            <span key={tool} className="text-xs px-3 py-1 rounded-full bg-primary/5 text-primary font-medium">{tool}</span>
          ))}
        </div>
      </div>

      {/* Learning Path */}
      <div className="bg-gradient-to-r from-ocean/5 via-teal/5 to-coral/5 rounded-xl p-4">
        <h3 className="text-sm font-bold text-foreground mb-3">{t("学习路径", "Learning Path")}</h3>
        <div className="flex items-center justify-center gap-2 flex-wrap">
          {[
            { icon: <FileText size={14} />, label: t("看案例", "View Case"), active: true },
            { icon: <BookOpen size={14} />, label: t("学方法", "Learn Method"), active: !!relatedPlaybook },
            { icon: <Sparkles size={14} />, label: t("复制Prompt", "Copy Prompt"), active: relatedPromptsList.length > 0 },
            { icon: <Zap size={14} />, label: t("应用到业务", "Apply to Business"), active: false },
          ].map((step, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium ${
                step.active ? "bg-white shadow-sm text-foreground" : "bg-white/50 text-muted-foreground"
              }`}>
                {step.icon} {step.label}
              </div>
              {idx < 3 && <ArrowRight size={12} className="text-muted-foreground" />}
            </div>
          ))}
        </div>
      </div>

      {/* Comment Section */}
      <CommentSection caseId={numId} t={t} />
    </div>
  );
}
