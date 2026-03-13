/*
 * PromptLibrary — Searchable, categorized AI prompt repository
 * Design: Card grid with category tabs, search, copy-to-clipboard, and rating
 */
import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { motion } from "framer-motion";
import { useState } from "react";
import { Search, Copy, Star, Users, Clock, Tag, BookOpen, Check, Sparkles } from "lucide-react";
import { prompts, promptCategories, type Prompt } from "@/lib/data";
import { toast } from "sonner";

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.06 } } };
const item = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } };

export default function PromptLibrary() {
  const { t, lang } = useLanguage();
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [selectedPrompt, setSelectedPrompt] = useState<Prompt | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filtered = prompts.filter((p) => {
    const matchSearch =
      p.titleZh.includes(search) ||
      p.titleEn.toLowerCase().includes(search.toLowerCase()) ||
      p.tags.some((tag) => tag.includes(search));
    const matchCategory = categoryFilter === "all" || p.category === categoryFilter;
    return matchSearch && matchCategory;
  });

  const handleCopy = (prompt: Prompt) => {
    navigator.clipboard.writeText(prompt.promptText).then(() => {
      setCopiedId(prompt.id);
      toast.success(t("已复制到剪贴板", "Copied to clipboard"));
      setTimeout(() => setCopiedId(null), 2000);
    });
  };

  const featuredPrompts = prompts.filter((p) => p.featured);

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6 max-w-[1400px] mx-auto">
      {/* Header */}
      <motion.div variants={item} className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Sparkles size={20} className="text-coral" />
            <h1 className="text-2xl font-extrabold text-foreground">{t("AI Prompt 库", "AI Prompt Library")}</h1>
          </div>
          <p className="text-sm text-muted-foreground">
            {t(
              "企业最重要的AI资产之一 · 搜索、复用、改进你的Prompt",
              "One of the most important AI assets · Search, reuse, and improve your prompts"
            )}
          </p>
        </div>
        <div className="relative w-full lg:w-80">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder={t("搜索Prompt、标签...", "Search prompts, tags...")}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 bg-card border-border/50"
          />
        </div>
      </motion.div>

      {/* Stats bar */}
      <motion.div variants={item} className="flex items-center gap-6 text-sm">
        <span className="text-muted-foreground">
          <span className="font-bold text-foreground font-mono">{prompts.length}</span> {t("个Prompt", "Prompts")}
        </span>
        <span className="text-muted-foreground">
          <span className="font-bold text-foreground font-mono">{prompts.reduce((a, p) => a + p.usageCount, 0).toLocaleString()}</span> {t("次使用", "Uses")}
        </span>
        <span className="text-muted-foreground">
          <span className="font-bold text-foreground font-mono">{promptCategories.length}</span> {t("个分类", "Categories")}
        </span>
      </motion.div>

      {/* Category filter */}
      <motion.div variants={item} className="flex gap-1.5 overflow-x-auto pb-1">
        <button
          onClick={() => setCategoryFilter("all")}
          className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
            categoryFilter === "all" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"
          }`}
        >
          {t("全部", "All")}
        </button>
        {promptCategories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setCategoryFilter(cat.id)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors flex items-center gap-1 ${
              categoryFilter === cat.id ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            <span>{cat.icon}</span> {t(cat.zh, cat.en)}
          </button>
        ))}
      </motion.div>

      {/* Featured section */}
      {categoryFilter === "all" && !search && (
        <motion.div variants={item}>
          <h2 className="text-base font-bold text-foreground mb-3 flex items-center gap-2">
            <Star size={16} className="text-coral fill-coral" /> {t("精选Prompt", "Featured Prompts")}
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
            {featuredPrompts.map((p) => (
              <Card
                key={p.id}
                className="card-hover border-0 shadow-sm cursor-pointer border-l-4 border-l-coral/40"
                onClick={() => setSelectedPrompt(p)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-lg">{promptCategories.find((c) => c.id === p.category)?.icon}</span>
                    <h3 className="text-sm font-bold text-foreground truncate">{t(p.titleZh, p.titleEn)}</h3>
                  </div>
                  <p className="text-xs text-muted-foreground line-clamp-2 mb-3">{t(p.descriptionZh, p.descriptionEn)}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span className="flex items-center gap-0.5"><Users size={11} /> {p.usageCount}</span>
                      <span className="flex items-center gap-0.5"><Star size={11} className="text-coral fill-coral" /> {p.rating}</span>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-7 text-xs"
                      onClick={(e) => { e.stopPropagation(); handleCopy(p); }}
                    >
                      {copiedId === p.id ? <Check size={12} className="mr-1" /> : <Copy size={12} className="mr-1" />}
                      {copiedId === p.id ? t("已复制", "Copied") : t("复制", "Copy")}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>
      )}

      {/* All Prompts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-3">
        {filtered.map((p) => (
          <motion.div key={p.id} variants={item}>
            <Card
              className="card-hover border-0 shadow-sm cursor-pointer h-full"
              onClick={() => setSelectedPrompt(p)}
            >
              <CardContent className="p-4 flex flex-col h-full">
                <div className="flex items-center gap-2 mb-2">
                  <span>{promptCategories.find((c) => c.id === p.category)?.icon}</span>
                  <Badge variant="secondary" className="text-[10px]">
                    {t(
                      promptCategories.find((c) => c.id === p.category)?.zh || "",
                      promptCategories.find((c) => c.id === p.category)?.en || ""
                    )}
                  </Badge>
                  {p.featured && (
                    <Badge className="bg-coral/10 text-coral border-0 text-[10px]">
                      <Star size={9} className="mr-0.5 fill-current" /> {t("精选", "Featured")}
                    </Badge>
                  )}
                </div>

                <h3 className="text-sm font-bold text-foreground mb-1">{t(p.titleZh, p.titleEn)}</h3>
                <p className="text-xs text-muted-foreground line-clamp-2 mb-3 flex-1">{t(p.descriptionZh, p.descriptionEn)}</p>

                {/* Prompt preview */}
                <div className="bg-muted/50 rounded-lg p-2.5 mb-3 font-mono text-[10px] text-muted-foreground line-clamp-3 leading-relaxed">
                  {p.promptText.substring(0, 150)}...
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1 mb-3">
                  {p.tags.slice(0, 4).map((tag) => (
                    <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full bg-primary/5 text-primary font-medium">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-2 border-t border-border/50">
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-0.5"><Users size={11} /> {p.usageCount}</span>
                    <span className="flex items-center gap-0.5"><Star size={11} className="text-coral fill-coral" /> {p.rating}</span>
                    <span className="flex items-center gap-0.5"><Clock size={11} /> {p.updatedAt}</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 text-[10px] px-2"
                    onClick={(e) => { e.stopPropagation(); handleCopy(p); }}
                  >
                    {copiedId === p.id ? <Check size={10} /> : <Copy size={10} />}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Detail Dialog */}
      <Dialog open={!!selectedPrompt} onOpenChange={() => setSelectedPrompt(null)}>
        <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
          {selectedPrompt && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xl">{promptCategories.find((c) => c.id === selectedPrompt.category)?.icon}</span>
                  <Badge variant="secondary" className="text-xs">
                    {t(
                      promptCategories.find((c) => c.id === selectedPrompt.category)?.zh || "",
                      promptCategories.find((c) => c.id === selectedPrompt.category)?.en || ""
                    )}
                  </Badge>
                  {selectedPrompt.featured && (
                    <Badge className="bg-coral/10 text-coral border-0 text-xs">
                      <Star size={10} className="mr-0.5 fill-current" /> {t("精选", "Featured")}
                    </Badge>
                  )}
                </div>
                <DialogTitle className="text-xl">{t(selectedPrompt.titleZh, selectedPrompt.titleEn)}</DialogTitle>
                <p className="text-sm text-muted-foreground">{t(selectedPrompt.descriptionZh, selectedPrompt.descriptionEn)}</p>
              </DialogHeader>

              <div className="space-y-4 mt-4">
                {/* Stats */}
                <div className="grid grid-cols-4 gap-3">
                  <div className="p-3 rounded-xl bg-muted/50 text-center">
                    <div className="text-lg font-bold font-mono">{selectedPrompt.usageCount}</div>
                    <div className="text-[10px] text-muted-foreground">{t("使用次数", "Uses")}</div>
                  </div>
                  <div className="p-3 rounded-xl bg-muted/50 text-center">
                    <div className="text-lg font-bold font-mono flex items-center justify-center gap-0.5">
                      <Star size={14} className="text-coral fill-coral" /> {selectedPrompt.rating}
                    </div>
                    <div className="text-[10px] text-muted-foreground">{t("评分", "Rating")}</div>
                  </div>
                  <div className="p-3 rounded-xl bg-muted/50 text-center">
                    <div className="text-sm font-bold">{selectedPrompt.author}</div>
                    <div className="text-[10px] text-muted-foreground">{t("作者", "Author")}</div>
                  </div>
                  <div className="p-3 rounded-xl bg-muted/50 text-center">
                    <div className="text-sm font-bold">{selectedPrompt.department}</div>
                    <div className="text-[10px] text-muted-foreground">{t("部门", "Department")}</div>
                  </div>
                </div>

                {/* Prompt Text */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-bold">{t("Prompt 内容", "Prompt Content")}</h3>
                    <Button size="sm" variant="outline" className="h-7 text-xs" onClick={() => handleCopy(selectedPrompt)}>
                      {copiedId === selectedPrompt.id ? <Check size={12} className="mr-1" /> : <Copy size={12} className="mr-1" />}
                      {copiedId === selectedPrompt.id ? t("已复制", "Copied") : t("复制Prompt", "Copy Prompt")}
                    </Button>
                  </div>
                  <div className="bg-[#1e293b] rounded-xl p-4 font-mono text-xs text-green-300 leading-relaxed whitespace-pre-wrap max-h-[300px] overflow-y-auto">
                    {selectedPrompt.promptText}
                  </div>
                </div>

                {/* Tags */}
                <div>
                  <h3 className="text-sm font-bold mb-2 flex items-center gap-1"><Tag size={14} /> {t("标签", "Tags")}</h3>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedPrompt.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
                    ))}
                  </div>
                </div>

                {/* Meta */}
                <div className="flex items-center gap-4 text-xs text-muted-foreground pt-2 border-t border-border/50">
                  <span>{t("创建", "Created")}: {selectedPrompt.createdAt}</span>
                  <span>{t("更新", "Updated")}: {selectedPrompt.updatedAt}</span>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </motion.div>
  );
}
