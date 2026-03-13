/*
 * AgentLibrary — AI Agent repository, the most important future asset
 * Design: Rich cards with capability badges, status indicators, and usage stats
 */
import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { motion } from "framer-motion";
import { useState } from "react";
import { Bot, Zap, CheckCircle2, Clock, Users, Star, ArrowRight, Activity, Shield, Cpu } from "lucide-react";
import { agents, type Agent } from "@/lib/data";

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.06 } } };
const item = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } };

const categoryLabels: Record<string, { zh: string; en: string }> = {
  marketing: { zh: "营销", en: "Marketing" },
  operations: { zh: "运营", en: "Operations" },
  merchandising: { zh: "商品", en: "Merchandising" },
  design: { zh: "设计", en: "Design" },
  data: { zh: "数据", en: "Data" },
};

const statusConfig: Record<string, { color: string; bg: string }> = {
  "已上线": { color: "text-success", bg: "bg-success/10" },
  "Live": { color: "text-success", bg: "bg-success/10" },
  "测试中": { color: "text-warning", bg: "bg-warning/10" },
  "Beta": { color: "text-warning", bg: "bg-warning/10" },
  "开发中": { color: "text-ocean-light", bg: "bg-ocean-light/10" },
  "In Development": { color: "text-ocean-light", bg: "bg-ocean-light/10" },
};

export default function AgentLibrary() {
  const { t } = useLanguage();
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const [categoryFilter, setCategoryFilter] = useState("all");

  const categories = Array.from(new Set(agents.map((a) => a.category)));

  const filtered = agents.filter((a) => categoryFilter === "all" || a.category === categoryFilter);

  const totalUsage = agents.reduce((a, ag) => a + ag.usageCount, 0);
  const avgSuccess = Math.round(agents.reduce((a, ag) => a + ag.successRate, 0) / agents.length);

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6 max-w-[1400px] mx-auto">
      {/* Header */}
      <motion.div variants={item}>
        <div className="flex items-center gap-2 mb-1">
          <Bot size={20} className="text-primary" />
          <h1 className="text-2xl font-extrabold text-foreground">{t("AI Agent 库", "AI Agent Library")}</h1>
          <Badge className="bg-coral/10 text-coral border-0 text-[10px]">
            {t("未来最重要资产", "Most Important Future Asset")}
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground">
          {t(
            "组织能力沉淀 · 从工具到智能体，构建企业AI能力矩阵",
            "Organizational capability crystallization · From tools to agents, building enterprise AI capability matrix"
          )}
        </p>
      </motion.div>

      {/* Stats Overview */}
      <motion.div variants={item} className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <Card className="border-0 shadow-sm">
          <CardContent className="p-4 text-center">
            <div className="inline-flex p-2 rounded-xl bg-primary/10 mb-2">
              <Bot size={18} className="text-primary" />
            </div>
            <div className="text-2xl font-extrabold font-mono">{agents.length}</div>
            <div className="text-[11px] text-muted-foreground">{t("Agent总数", "Total Agents")}</div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm">
          <CardContent className="p-4 text-center">
            <div className="inline-flex p-2 rounded-xl bg-teal/10 mb-2">
              <Activity size={18} className="text-teal" />
            </div>
            <div className="text-2xl font-extrabold font-mono">{totalUsage.toLocaleString()}</div>
            <div className="text-[11px] text-muted-foreground">{t("总调用次数", "Total Invocations")}</div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm">
          <CardContent className="p-4 text-center">
            <div className="inline-flex p-2 rounded-xl bg-success/10 mb-2">
              <CheckCircle2 size={18} className="text-success" />
            </div>
            <div className="text-2xl font-extrabold font-mono">{avgSuccess}%</div>
            <div className="text-[11px] text-muted-foreground">{t("平均成功率", "Avg Success Rate")}</div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm">
          <CardContent className="p-4 text-center">
            <div className="inline-flex p-2 rounded-xl bg-coral/10 mb-2">
              <Zap size={18} className="text-coral" />
            </div>
            <div className="text-2xl font-extrabold font-mono">{agents.filter((a) => a.statusZh === "已上线").length}</div>
            <div className="text-[11px] text-muted-foreground">{t("已上线", "Live")}</div>
          </CardContent>
        </Card>
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

      {/* Agent Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map((agent) => {
          const status = t(agent.statusZh, agent.statusEn);
          const sc = statusConfig[status] || statusConfig["已上线"];
          return (
            <motion.div key={agent.id} variants={item}>
              <Card
                className="card-hover border-0 shadow-sm cursor-pointer h-full"
                onClick={() => setSelectedAgent(agent)}
              >
                <CardContent className="p-5 flex flex-col h-full">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                        <Bot size={20} className="text-primary" />
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-foreground">{t(agent.nameZh, agent.nameEn)}</h3>
                        <span className="text-[10px] text-muted-foreground">
                          {t(categoryLabels[agent.category]?.zh || "", categoryLabels[agent.category]?.en || "")}
                        </span>
                      </div>
                    </div>
                    <Badge className={`${sc.bg} ${sc.color} border-0 text-[10px]`}>
                      {status}
                    </Badge>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-muted-foreground line-clamp-2 mb-3 flex-1">
                    {t(agent.descriptionZh, agent.descriptionEn)}
                  </p>

                  {/* Capabilities */}
                  <div className="flex flex-wrap gap-1 mb-3">
                    {agent.capabilities.slice(0, 4).map((cap) => (
                      <span key={cap} className="text-[10px] px-2 py-0.5 rounded-full bg-muted text-muted-foreground font-medium">
                        {cap}
                      </span>
                    ))}
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-2 mb-3">
                    <div className="text-center p-2 rounded-lg bg-muted/30">
                      <div className="text-xs font-bold font-mono">{agent.usageCount.toLocaleString()}</div>
                      <div className="text-[9px] text-muted-foreground">{t("调用", "Calls")}</div>
                    </div>
                    <div className="text-center p-2 rounded-lg bg-muted/30">
                      <div className="text-xs font-bold font-mono text-success">{agent.successRate}%</div>
                      <div className="text-[9px] text-muted-foreground">{t("成功率", "Success")}</div>
                    </div>
                    <div className="text-center p-2 rounded-lg bg-muted/30">
                      <div className="text-xs font-bold font-mono">{agent.avgResponseTime}</div>
                      <div className="text-[9px] text-muted-foreground">{t("响应", "Response")}</div>
                    </div>
                  </div>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-1 pt-3 border-t border-border/50">
                    {agent.techStack.slice(0, 3).map((tech) => (
                      <span key={tech} className="text-[10px] px-2 py-0.5 rounded-full bg-primary/5 text-primary font-medium">
                        {tech}
                      </span>
                    ))}
                    {agent.techStack.length > 3 && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                        +{agent.techStack.length - 3}
                      </span>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Detail Dialog */}
      <Dialog open={!!selectedAgent} onOpenChange={() => setSelectedAgent(null)}>
        <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
          {selectedAgent && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Bot size={24} className="text-primary" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <DialogTitle className="text-xl">{t(selectedAgent.nameZh, selectedAgent.nameEn)}</DialogTitle>
                      <Badge className={`${statusConfig[t(selectedAgent.statusZh, selectedAgent.statusEn)]?.bg || "bg-success/10"} ${statusConfig[t(selectedAgent.statusZh, selectedAgent.statusEn)]?.color || "text-success"} border-0 text-xs`}>
                        {t(selectedAgent.statusZh, selectedAgent.statusEn)}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {t(categoryLabels[selectedAgent.category]?.zh || "", categoryLabels[selectedAgent.category]?.en || "")} · {selectedAgent.owner} · {selectedAgent.department}
                    </p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">{t(selectedAgent.descriptionZh, selectedAgent.descriptionEn)}</p>
              </DialogHeader>

              <div className="space-y-5 mt-4">
                {/* Stats */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="p-4 rounded-xl bg-muted/50 text-center">
                    <div className="text-2xl font-bold font-mono">{selectedAgent.usageCount.toLocaleString()}</div>
                    <div className="text-[10px] text-muted-foreground">{t("总调用次数", "Total Invocations")}</div>
                  </div>
                  <div className="p-4 rounded-xl bg-success/5 text-center">
                    <div className="text-2xl font-bold font-mono text-success">{selectedAgent.successRate}%</div>
                    <div className="text-[10px] text-muted-foreground">{t("成功率", "Success Rate")}</div>
                    <Progress value={selectedAgent.successRate} className="h-1 mt-2" />
                  </div>
                  <div className="p-4 rounded-xl bg-muted/50 text-center">
                    <div className="text-2xl font-bold font-mono">{selectedAgent.avgResponseTime}</div>
                    <div className="text-[10px] text-muted-foreground">{t("平均响应", "Avg Response")}</div>
                  </div>
                </div>

                {/* Capabilities */}
                <div>
                  <h3 className="text-sm font-bold mb-2 flex items-center gap-1"><Zap size={14} /> {t("能力", "Capabilities")}</h3>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedAgent.capabilities.map((cap) => (
                      <Badge key={cap} variant="secondary" className="text-xs">{cap}</Badge>
                    ))}
                  </div>
                </div>

                {/* Input / Output */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-teal/5 border border-teal/10">
                    <h4 className="text-xs font-bold text-teal mb-2 flex items-center gap-1">
                      <ArrowRight size={12} /> {t("输入", "Inputs")}
                    </h4>
                    <ul className="space-y-1">
                      {t(selectedAgent.inputsZh.join("|||"), selectedAgent.inputsEn.join("|||")).split("|||").map((input, i) => (
                        <li key={i} className="text-xs text-foreground/80 flex items-center gap-1">
                          <div className="w-1 h-1 rounded-full bg-teal shrink-0" /> {input}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="p-4 rounded-xl bg-coral/5 border border-coral/10">
                    <h4 className="text-xs font-bold text-coral mb-2 flex items-center gap-1">
                      <ArrowRight size={12} /> {t("输出", "Outputs")}
                    </h4>
                    <ul className="space-y-1">
                      {t(selectedAgent.outputsZh.join("|||"), selectedAgent.outputsEn.join("|||")).split("|||").map((output, i) => (
                        <li key={i} className="text-xs text-foreground/80 flex items-center gap-1">
                          <div className="w-1 h-1 rounded-full bg-coral shrink-0" /> {output}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Tech Stack */}
                <div>
                  <h3 className="text-sm font-bold mb-2 flex items-center gap-1"><Cpu size={14} /> {t("技术栈", "Tech Stack")}</h3>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedAgent.techStack.map((tech) => (
                      <Badge key={tech} variant="outline" className="text-xs">{tech}</Badge>
                    ))}
                  </div>
                </div>

                {/* Meta */}
                <div className="flex items-center gap-4 text-xs text-muted-foreground pt-2 border-t border-border/50">
                  <span>{t("负责人", "Owner")}: {selectedAgent.owner}</span>
                  <span>{selectedAgent.department}</span>
                  <span>{t("创建", "Created")}: {selectedAgent.createdAt}</span>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </motion.div>
  );
}
