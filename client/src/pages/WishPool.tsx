/*
 * WishPool — Employee AI wishes / pain points with voting
 * Design: Card list with status pills and vote counts
 */
import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { useState } from "react";
import { Search, ThumbsUp, Plus, ArrowUpDown, Filter, Flame, Clock, CheckCircle2, ArrowRight, Sparkles } from "lucide-react";
import { wishes, type Wish } from "@/lib/data";

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.06 } } };
const item = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } };

const statusConfig: Record<Wish["status"], { zh: string; en: string; color: string }> = {
  submitted: { zh: "已提交", en: "Submitted", color: "bg-muted text-muted-foreground" },
  triaged: { zh: "已分类", en: "Triaged", color: "bg-ocean-light/10 text-ocean-light" },
  "in-progress": { zh: "进行中", en: "In Progress", color: "bg-warning/10 text-warning" },
  solved: { zh: "已解决", en: "Solved", color: "bg-success/10 text-success" },
  converted: { zh: "已转案例", en: "Converted", color: "bg-coral/10 text-coral" },
};

const urgencyConfig: Record<Wish["urgency"], { zh: string; en: string; icon: React.ReactNode }> = {
  high: { zh: "紧急", en: "Urgent", icon: <Flame size={12} /> },
  medium: { zh: "中等", en: "Medium", icon: <Clock size={12} /> },
  low: { zh: "一般", en: "Low", icon: <CheckCircle2 size={12} /> },
};

export default function WishPool() {
  const { t } = useLanguage();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [wishList, setWishList] = useState(wishes);

  const filtered = wishList.filter((w) => {
    const matchSearch = w.titleZh.includes(search) || w.titleEn.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "all" || w.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const handleVote = (id: string) => {
    setWishList((prev) => prev.map((w) => (w.id === id ? { ...w, votes: w.votes + 1 } : w)));
  };

  const statuses = ["all", "submitted", "triaged", "in-progress", "solved", "converted"];

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6 max-w-[1400px] mx-auto">
      {/* Header */}
      <motion.div variants={item} className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-foreground">{t("AI 许愿池", "AI Wish Pool")}</h1>
          <p className="text-sm text-muted-foreground mt-1">
            {t("提交你的AI需求和痛点，投票支持你关心的话题", "Submit your AI needs and pain points, vote for topics you care about")}
          </p>
        </div>
        <Button className="bg-coral hover:bg-coral/90 text-white shrink-0">
          <Plus size={16} className="mr-1" /> {t("提交许愿", "Submit Wish")}
        </Button>
      </motion.div>

      {/* Filters */}
      <motion.div variants={item} className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder={t("搜索许愿...", "Search wishes...")}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 bg-card border-border/50"
          />
        </div>
        <div className="flex gap-1.5 overflow-x-auto pb-1">
          {statuses.map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
                statusFilter === s
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              {s === "all"
                ? t("全部", "All")
                : t(statusConfig[s as Wish["status"]].zh, statusConfig[s as Wish["status"]].en)}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Wish Cards */}
      <div className="space-y-3">
        {filtered.sort((a, b) => b.votes - a.votes).map((wish) => (
          <motion.div key={wish.id} variants={item}>
            <Card className="card-hover border-0 shadow-sm">
              <CardContent className="p-4 lg:p-5">
                <div className="flex gap-4">
                  {/* Vote button */}
                  <button
                    onClick={() => handleVote(wish.id)}
                    className="flex flex-col items-center gap-1 shrink-0 pt-1"
                  >
                    <div className="w-10 h-10 rounded-xl bg-primary/5 hover:bg-primary/10 flex items-center justify-center transition-colors">
                      <ThumbsUp size={16} className="text-primary" />
                    </div>
                    <span className="text-sm font-bold text-primary font-mono">{wish.votes}</span>
                  </button>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1.5">
                      <span className={`status-pill ${statusConfig[wish.status].color}`}>
                        {t(statusConfig[wish.status].zh, statusConfig[wish.status].en)}
                      </span>
                      <span className={`status-pill ${wish.urgency === "high" ? "bg-destructive/10 text-destructive" : "bg-muted text-muted-foreground"}`}>
                        {urgencyConfig[wish.urgency].icon}
                        <span className="ml-1">{t(urgencyConfig[wish.urgency].zh, urgencyConfig[wish.urgency].en)}</span>
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-foreground mb-1">
                      {t(wish.titleZh, wish.titleEn)}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                      {t(wish.descriptionZh, wish.descriptionEn)}
                    </p>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span>{wish.author}</span>
                      <span>·</span>
                      <span>{wish.date}</span>
                      <span>·</span>
                      <span>{t(wish.benefitZh, wish.benefitEn)}</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {wish.tags.map((tag) => (
                        <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Workflow indicator */}
      <motion.div variants={item}>
        <Card className="border-0 shadow-sm bg-muted/30">
          <CardContent className="p-4">
            <p className="text-xs font-semibold text-muted-foreground mb-3">{t("许愿流程", "Wish Workflow")}</p>
            <div className="flex items-center gap-2 overflow-x-auto text-xs">
              {["submitted", "triaged", "in-progress", "solved", "converted"].map((s, i) => (
                <div key={s} className="flex items-center gap-2 shrink-0">
                  <span className={`status-pill ${statusConfig[s as Wish["status"]].color}`}>
                    {t(statusConfig[s as Wish["status"]].zh, statusConfig[s as Wish["status"]].en)}
                  </span>
                  {i < 4 && <ArrowRight size={14} className="text-muted-foreground/50" />}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}
