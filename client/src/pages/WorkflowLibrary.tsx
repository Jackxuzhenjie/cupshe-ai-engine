/*
 * WorkflowLibrary — AI Workflow repository with visual step flows
 * Design: Card grid with expandable workflow step visualization
 */
import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { motion } from "framer-motion";
import { useState } from "react";
import { Workflow as WorkflowIcon, TrendingUp, Star, Users, ArrowDown, Bot, User, Zap, ChevronRight } from "lucide-react";
import { workflows, type Workflow } from "@/lib/data";
import { toast } from "sonner";

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.06 } } };
const item = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } };

const categoryLabels: Record<string, { zh: string; en: string; color: string }> = {
  marketing: { zh: "营销", en: "Marketing", color: "text-coral" },
  operations: { zh: "运营", en: "Operations", color: "text-teal" },
  merchandising: { zh: "商品", en: "Merchandising", color: "text-ocean-light" },
  design: { zh: "设计", en: "Design", color: "text-primary" },
  data: { zh: "数据", en: "Data", color: "text-success" },
};

const stepTypeConfig = {
  ai: { icon: <Bot size={14} />, zh: "AI自动", en: "AI Auto", color: "bg-teal/10 text-teal border-teal/20" },
  manual: { icon: <User size={14} />, zh: "人工", en: "Manual", color: "bg-coral/10 text-coral border-coral/20" },
  hybrid: { icon: <Zap size={14} />, zh: "人机协作", en: "Hybrid", color: "bg-ocean-light/10 text-ocean-light border-ocean-light/20" },
};

export default function WorkflowLibrary() {
  const { t } = useLanguage();
  const [selectedWorkflow, setSelectedWorkflow] = useState<Workflow | null>(null);
  const [categoryFilter, setCategoryFilter] = useState("all");

  const categories = Array.from(new Set(workflows.map((w) => w.category)));

  const filtered = workflows.filter((w) => categoryFilter === "all" || w.category === categoryFilter);

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6 max-w-[1400px] mx-auto">
      {/* Header */}
      <motion.div variants={item}>
        <div className="flex items-center gap-2 mb-1">
          <WorkflowIcon size={20} className="text-ocean-light" />
          <h1 className="text-2xl font-extrabold text-foreground">{t("AI 工作流库", "AI Workflow Library")}</h1>
        </div>
        <p className="text-sm text-muted-foreground">
          {t(
            "比Prompt更高级 · 端到端AI工作流程，从输入到产出的完整链路",
            "More advanced than Prompts · End-to-end AI workflows, complete pipelines from input to output"
          )}
        </p>
      </motion.div>

      {/* Stats */}
      <motion.div variants={item} className="flex items-center gap-6 text-sm">
        <span className="text-muted-foreground">
          <span className="font-bold text-foreground font-mono">{workflows.length}</span> {t("个工作流", "Workflows")}
        </span>
        <span className="text-muted-foreground">
          <span className="font-bold text-foreground font-mono">{workflows.reduce((a, w) => a + w.usageCount, 0)}</span> {t("次使用", "Uses")}
        </span>
        <span className="text-muted-foreground">
          {t("平均效率提升", "Avg Efficiency Gain")}:{" "}
          <span className="font-bold text-coral font-mono">
            {Math.round(workflows.reduce((a, w) => a + parseInt(w.efficiencyGain), 0) / workflows.length)}%
          </span>
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
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategoryFilter(cat)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
              categoryFilter === cat ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            {t(categoryLabels[cat]?.zh || cat, categoryLabels[cat]?.en || cat)}
          </button>
        ))}
      </motion.div>

      {/* Workflow Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {filtered.map((w) => (
          <motion.div key={w.id} variants={item}>
            <Card
              className="card-hover border-0 shadow-sm cursor-pointer h-full"
              onClick={() => setSelectedWorkflow(w)}
            >
              <CardContent className="p-5 flex flex-col h-full">
                {/* Header */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="text-[10px]">
                      {t(categoryLabels[w.category]?.zh || w.category, categoryLabels[w.category]?.en || w.category)}
                    </Badge>
                    {w.featured && (
                      <Badge className="bg-coral/10 text-coral border-0 text-[10px]">
                        <Star size={9} className="mr-0.5 fill-current" /> {t("精选", "Featured")}
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-1 text-coral font-bold text-sm">
                    <TrendingUp size={14} /> {w.efficiencyGain}
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-base font-bold text-foreground mb-1">{t(w.titleZh, w.titleEn)}</h3>
                <p className="text-xs text-muted-foreground mb-4">{t(w.descriptionZh, w.descriptionEn)}</p>

                {/* Mini step flow */}
                <div className="flex-1 mb-4">
                  <div className="flex items-center gap-1 flex-wrap">
                    {w.steps.map((step, i) => (
                      <div key={i} className="flex items-center gap-1">
                        <div className={`px-2 py-1 rounded-md text-[10px] font-medium border ${stepTypeConfig[step.type].color}`}>
                          <span className="flex items-center gap-0.5">
                            {stepTypeConfig[step.type].icon}
                            {t(step.titleZh, step.titleEn)}
                          </span>
                        </div>
                        {i < w.steps.length - 1 && <ChevronRight size={12} className="text-muted-foreground shrink-0" />}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tools */}
                <div className="flex flex-wrap gap-1 mb-3">
                  {w.tools.slice(0, 5).map((tool) => (
                    <span key={tool} className="text-[10px] px-2 py-0.5 rounded-full bg-primary/5 text-primary font-medium">
                      {tool}
                    </span>
                  ))}
                  {w.tools.length > 5 && (
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                      +{w.tools.length - 5}
                    </span>
                  )}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-3 border-t border-border/50 text-xs text-muted-foreground">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-0.5"><Users size={11} /> {w.usageCount} {t("次", "uses")}</span>
                    <span className="flex items-center gap-0.5"><Star size={11} className="text-coral fill-coral" /> {w.rating}</span>
                  </div>
                  <span>{w.author} · {w.department}</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Detail Dialog */}
      <Dialog open={!!selectedWorkflow} onOpenChange={() => setSelectedWorkflow(null)}>
        <DialogContent className="max-w-3xl max-h-[85vh] overflow-y-auto">
          {selectedWorkflow && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-2 mb-1">
                  <Badge variant="secondary">
                    {t(categoryLabels[selectedWorkflow.category]?.zh || "", categoryLabels[selectedWorkflow.category]?.en || "")}
                  </Badge>
                  <Badge className="bg-coral/10 text-coral border-0">
                    <TrendingUp size={12} className="mr-1" /> {t("效率提升", "Efficiency")} {selectedWorkflow.efficiencyGain}
                  </Badge>
                </div>
                <DialogTitle className="text-xl">{t(selectedWorkflow.titleZh, selectedWorkflow.titleEn)}</DialogTitle>
                <p className="text-sm text-muted-foreground">{t(selectedWorkflow.descriptionZh, selectedWorkflow.descriptionEn)}</p>
              </DialogHeader>

              <div className="space-y-5 mt-4">
                {/* Stats */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="p-3 rounded-xl bg-muted/50 text-center">
                    <div className="text-lg font-bold font-mono">{selectedWorkflow.steps.length}</div>
                    <div className="text-[10px] text-muted-foreground">{t("步骤", "Steps")}</div>
                  </div>
                  <div className="p-3 rounded-xl bg-muted/50 text-center">
                    <div className="text-lg font-bold font-mono">{selectedWorkflow.usageCount}</div>
                    <div className="text-[10px] text-muted-foreground">{t("使用次数", "Uses")}</div>
                  </div>
                  <div className="p-3 rounded-xl bg-muted/50 text-center">
                    <div className="text-lg font-bold font-mono flex items-center justify-center gap-0.5">
                      <Star size={14} className="text-coral fill-coral" /> {selectedWorkflow.rating}
                    </div>
                    <div className="text-[10px] text-muted-foreground">{t("评分", "Rating")}</div>
                  </div>
                </div>

                {/* Step Flow - Vertical */}
                <div>
                  <h3 className="text-sm font-bold mb-3">{t("工作流步骤", "Workflow Steps")}</h3>
                  <div className="space-y-0">
                    {selectedWorkflow.steps.map((step, i) => (
                      <div key={i}>
                        <div className="flex gap-3">
                          {/* Step number & line */}
                          <div className="flex flex-col items-center">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                              step.type === "ai" ? "bg-teal/15 text-teal" :
                              step.type === "manual" ? "bg-coral/15 text-coral" :
                              "bg-ocean-light/15 text-ocean-light"
                            }`}>
                              {step.order}
                            </div>
                            {i < selectedWorkflow.steps.length - 1 && (
                              <div className="w-0.5 h-6 bg-border/50 my-1" />
                            )}
                          </div>

                          {/* Step content */}
                          <div className="flex-1 pb-2">
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="text-sm font-semibold">{t(step.titleZh, step.titleEn)}</h4>
                              <Badge variant="outline" className={`text-[9px] ${stepTypeConfig[step.type].color}`}>
                                {stepTypeConfig[step.type].icon}
                                <span className="ml-0.5">{t(stepTypeConfig[step.type].zh, stepTypeConfig[step.type].en)}</span>
                              </Badge>
                            </div>
                            <p className="text-xs text-muted-foreground">{t(step.descriptionZh, step.descriptionEn)}</p>
                            <span className="text-[10px] text-primary font-medium">{step.tool}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tools */}
                <div>
                  <h3 className="text-sm font-bold mb-2">{t("使用工具", "Tools Used")}</h3>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedWorkflow.tools.map((tool) => (
                      <Badge key={tool} variant="secondary" className="text-xs">{tool}</Badge>
                    ))}
                  </div>
                </div>

                {/* Legend */}
                <div className="flex items-center gap-4 text-xs text-muted-foreground pt-2 border-t border-border/50">
                  <span className="flex items-center gap-1"><Bot size={12} className="text-teal" /> {t("AI自动", "AI Auto")}</span>
                  <span className="flex items-center gap-1"><User size={12} className="text-coral" /> {t("人工操作", "Manual")}</span>
                  <span className="flex items-center gap-1"><Zap size={12} className="text-ocean-light" /> {t("人机协作", "Hybrid")}</span>
                </div>

                {/* Meta */}
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span>{t("创建者", "Author")}: {selectedWorkflow.author}</span>
                  <span>{selectedWorkflow.department}</span>
                  <span>{selectedWorkflow.createdAt}</span>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </motion.div>
  );
}
