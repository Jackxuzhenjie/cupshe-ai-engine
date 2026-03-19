/**
 * SkillTree — Comprehensive AI skill tree with knowledge deposits at finest granularity
 * Features:
 * - Multi-view navigation (Universal / Department / Project / All)
 * - Expandable skill detail panels with knowledge deposits
 * - Learning resources, Prompt templates, Workflow SOPs, Practice tasks, Cases
 * - Covers CUPSHE full value chain × 14 departments × 3 pilot projects × 4 layers
 */
import { useState, useMemo } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";
import {
  GitBranch, Search, Building2, FolderKanban, Layers, GraduationCap,
  ChevronRight, ChevronDown, Sparkles, Target, Zap,
  BookOpen, FileText, MessageSquare, Workflow, ClipboardCheck,
  ExternalLink, Clock, Copy, CheckCircle2, ArrowRight, Lightbulb, X
} from "lucide-react";
import {
  skillNodes, layerConfig, pilotProjectConfig, departmentSkillMap,
  type SkillNode, type SkillLayer, type PilotProject,
  type LearningResource, type PromptTemplate, type WorkflowSOP, type PracticeTask,
} from "@/lib/skillTreeData";

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.05 } } };
const item = { hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } };

type ViewMode = "universal" | "department" | "project" | "all";
type KnowledgeTab = "resources" | "prompts" | "workflows" | "tasks" | "cases";

const layerIcons: Record<SkillLayer, React.ReactNode> = {
  foundation: <GraduationCap size={14} />,
  department: <Building2 size={14} />,
  scenario: <Target size={14} />,
  system: <Zap size={14} />,
};

const resourceTypeIcons: Record<string, string> = {
  course: "📚", video: "🎬", article: "📄", tutorial: "🔧", doc: "📋", tool: "🛠️",
};

const difficultyConfig: Record<string, { zh: string; en: string; color: string }> = {
  beginner: { zh: "入门", en: "Beginner", color: "text-green-600 bg-green-50" },
  intermediate: { zh: "进阶", en: "Intermediate", color: "text-amber-600 bg-amber-50" },
  advanced: { zh: "高级", en: "Advanced", color: "text-red-600 bg-red-50" },
};

export default function SkillTree() {
  const { t } = useLanguage();
  const [viewMode, setViewMode] = useState<ViewMode>("universal");
  const [selectedDept, setSelectedDept] = useState<string | null>(null);
  const [selectedProject, setSelectedProject] = useState<PilotProject | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedLayer, setExpandedLayer] = useState<SkillLayer | null>(null);
  const [expandedSkill, setExpandedSkill] = useState<string | null>(null);
  const [activeKnowledgeTab, setActiveKnowledgeTab] = useState<KnowledgeTab>("resources");
  const [copiedPrompt, setCopiedPrompt] = useState<string | null>(null);

  const stats = useMemo(() => {
    const total = skillNodes.length;
    const avgProgress = Math.round(skillNodes.reduce((a, s) => a + s.progress, 0) / total);
    const completed = skillNodes.filter(s => s.progress >= 100).length;
    const inProgress = skillNodes.filter(s => s.progress > 0 && s.progress < 100).length;
    const notStarted = skillNodes.filter(s => s.progress === 0).length;
    const totalResources = skillNodes.reduce((a, s) => a + s.knowledge.resources.length, 0);
    const totalPrompts = skillNodes.reduce((a, s) => a + s.knowledge.prompts.length, 0);
    const totalWorkflows = skillNodes.reduce((a, s) => a + s.knowledge.workflows.length, 0);
    return { total, avgProgress, completed, inProgress, notStarted, totalResources, totalPrompts, totalWorkflows };
  }, []);

  const filteredSkills = useMemo(() => {
    let result = skillNodes;
    if (viewMode === "universal") {
      result = result.filter(s => s.layer === "foundation");
    } else if (viewMode === "department" && selectedDept) {
      result = result.filter(s => s.departments.includes(selectedDept) || s.departments.includes("all"));
    } else if (viewMode === "project" && selectedProject) {
      result = result.filter(s => s.pilotProjects.includes(selectedProject));
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(s =>
        s.titleZh.toLowerCase().includes(q) || s.titleEn.toLowerCase().includes(q) ||
        s.descriptionZh.toLowerCase().includes(q) ||
        s.tags.some(tag => tag.toLowerCase().includes(q)) ||
        s.tools.some(tool => tool.toLowerCase().includes(q)) ||
        s.knowledge.prompts.some(p => p.title.toLowerCase().includes(q)) ||
        s.knowledge.resources.some(r => r.title.toLowerCase().includes(q))
      );
    }
    return result;
  }, [viewMode, selectedDept, selectedProject, searchQuery]);

  const groupedByLayer = useMemo(() => {
    const groups: Record<SkillLayer, SkillNode[]> = { foundation: [], department: [], scenario: [], system: [] };
    filteredSkills.forEach(s => groups[s.layer].push(s));
    return groups;
  }, [filteredSkills]);

  const viewTabs: { key: ViewMode; icon: React.ReactNode; zh: string; en: string }[] = [
    { key: "universal", icon: <GraduationCap size={15} />, zh: "全员必修", en: "Universal" },
    { key: "department", icon: <Building2 size={15} />, zh: "按部门", en: "By Dept" },
    { key: "project", icon: <FolderKanban size={15} />, zh: "按项目", en: "By Project" },
    { key: "all", icon: <Layers size={15} />, zh: "全部技能", en: "All Skills" },
  ];

  const handleCopyPrompt = (prompt: string, id: string) => {
    navigator.clipboard.writeText(prompt);
    setCopiedPrompt(id);
    setTimeout(() => setCopiedPrompt(null), 2000);
  };

  const handleSkillExpand = (skillId: string) => {
    if (expandedSkill === skillId) {
      setExpandedSkill(null);
    } else {
      setExpandedSkill(skillId);
      setActiveKnowledgeTab("resources");
    }
  };

  const knowledgeTabs: { key: KnowledgeTab; icon: React.ReactNode; zh: string; en: string }[] = [
    { key: "resources", icon: <BookOpen size={13} />, zh: "学习资源", en: "Resources" },
    { key: "prompts", icon: <MessageSquare size={13} />, zh: "Prompt模板", en: "Prompts" },
    { key: "workflows", icon: <Workflow size={13} />, zh: "工作流SOP", en: "Workflows" },
    { key: "tasks", icon: <ClipboardCheck size={13} />, zh: "实操任务", en: "Tasks" },
    { key: "cases", icon: <Lightbulb size={13} />, zh: "案例", en: "Cases" },
  ];

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-5 max-w-[1400px] mx-auto">
      {/* Hero Header */}
      <motion.div variants={item} className="relative rounded-2xl overflow-hidden h-[150px] lg:h-[170px]">
        <img
          src="https://d2xsxph8kpxj0f.cloudfront.net/310519663405149767/QM6nYWAxuWeZFy253dxUZB/skill-tree-bg-RxRCaJAd9s3ssxpaPA5PBZ.webp"
          alt="Skill Tree"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/70 to-white/40" />
        <div className="absolute inset-0 flex flex-col justify-center px-6 lg:px-10">
          <div className="flex items-center gap-2 mb-2">
            <GitBranch size={20} className="text-primary" />
            <h1 className="text-2xl font-extrabold text-foreground">{t("AI 技能树", "AI Skill Tree")}</h1>
          </div>
          <p className="text-sm text-muted-foreground max-w-xl">
            {t(
              "覆盖14个中心 × 3大试点项目 × 4层技能体系 · 每项技能配套学习资源、Prompt模板、工作流SOP与实操任务",
              "14 depts × 3 pilots × 4 layers · Each skill includes resources, prompts, workflows & practice tasks"
            )}
          </p>
        </div>
      </motion.div>

      {/* Stats Bar */}
      <motion.div variants={item}>
        <Card className="border-0 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold">{t("知识沉淀总览", "Knowledge Base Overview")}</span>
              <span className="text-sm font-bold font-mono text-primary">{stats.avgProgress}%</span>
            </div>
            <Progress value={stats.avgProgress} className="h-2 mb-3" />
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 text-center">
              <div className="bg-muted/40 rounded-lg p-2">
                <div className="text-lg font-bold text-foreground">{stats.total}</div>
                <div className="text-[10px] text-muted-foreground">{t("技能数", "Skills")}</div>
              </div>
              <div className="bg-teal-50 rounded-lg p-2">
                <div className="text-lg font-bold text-teal-600">{stats.totalResources}</div>
                <div className="text-[10px] text-muted-foreground">{t("学习资源", "Resources")}</div>
              </div>
              <div className="bg-violet-50 rounded-lg p-2">
                <div className="text-lg font-bold text-violet-600">{stats.totalPrompts}</div>
                <div className="text-[10px] text-muted-foreground">{t("Prompt模板", "Prompts")}</div>
              </div>
              <div className="bg-blue-50 rounded-lg p-2">
                <div className="text-lg font-bold text-blue-600">{stats.totalWorkflows}</div>
                <div className="text-[10px] text-muted-foreground">{t("工作流", "Workflows")}</div>
              </div>
              <div className="bg-amber-50 rounded-lg p-2">
                <div className="text-lg font-bold text-amber-600">{stats.inProgress}</div>
                <div className="text-[10px] text-muted-foreground">{t("学习中", "Learning")}</div>
              </div>
              <div className="bg-green-50 rounded-lg p-2">
                <div className="text-lg font-bold text-green-600">{stats.completed}</div>
                <div className="text-[10px] text-muted-foreground">{t("已掌握", "Mastered")}</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Navigation Tabs + Search */}
      <motion.div variants={item} className="space-y-3">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
          <div className="flex gap-1 bg-muted/50 rounded-lg p-1">
            {viewTabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => {
                  setViewMode(tab.key);
                  setSelectedDept(null);
                  setSelectedProject(null);
                  setExpandedLayer(null);
                  setExpandedSkill(null);
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                  viewMode === tab.key ? "bg-white text-primary shadow-sm" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab.icon}
                <span className="hidden sm:inline">{t(tab.zh, tab.en)}</span>
              </button>
            ))}
          </div>
          <div className="relative flex-1 w-full sm:max-w-xs">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder={t("搜索技能、工具、Prompt...", "Search skills, tools, prompts...")}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 h-8 text-xs"
            />
          </div>
        </div>

        {/* Department Selector */}
        {viewMode === "department" && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="overflow-hidden">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-2">
              {Object.entries(departmentSkillMap).map(([key, dept]) => {
                const deptSkillCount = skillNodes.filter(s => s.departments.includes(key) || s.departments.includes("all")).length;
                return (
                  <button
                    key={key}
                    onClick={() => { setSelectedDept(key); setExpandedSkill(null); }}
                    className={`flex flex-col items-center gap-1 p-3 rounded-xl border text-center transition-all ${
                      selectedDept === key ? "border-primary bg-primary/5 shadow-sm" : "border-transparent bg-muted/30 hover:bg-muted/60"
                    }`}
                  >
                    <Building2 size={16} className={selectedDept === key ? "text-primary" : "text-muted-foreground"} />
                    <span className="text-[11px] font-medium leading-tight">{t(dept.zh, dept.en)}</span>
                    <span className="text-[9px] text-muted-foreground">{deptSkillCount} {t("项", "skills")}</span>
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* Project Selector */}
        {viewMode === "project" && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="overflow-hidden">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {(Object.entries(pilotProjectConfig) as [PilotProject, typeof pilotProjectConfig[PilotProject]][]).map(([key, proj]) => {
                const projSkillCount = skillNodes.filter(s => s.pilotProjects.includes(key)).length;
                return (
                  <button
                    key={key}
                    onClick={() => { setSelectedProject(key); setExpandedSkill(null); }}
                    className={`flex items-center gap-3 p-4 rounded-xl border transition-all text-left ${
                      selectedProject === key ? `border-current ${proj.color} ${proj.bg} shadow-sm` : "border-transparent bg-muted/30 hover:bg-muted/60"
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-lg ${proj.bg} flex items-center justify-center shrink-0`}>
                      <Sparkles size={18} className={proj.color} />
                    </div>
                    <div>
                      <div className="text-sm font-semibold">{t(proj.zh, proj.en)}</div>
                      <div className="text-[10px] text-muted-foreground">{projSkillCount} {t("项关联技能", "related skills")}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* Skill Cards — Grouped by Layer */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`${viewMode}-${selectedDept}-${selectedProject}-${searchQuery}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="space-y-5"
        >
          {(["foundation", "department", "scenario", "system"] as SkillLayer[]).map((layer) => {
            const layerSkills = groupedByLayer[layer];
            if (layerSkills.length === 0) return null;
            const config = layerConfig[layer];
            const isExpanded = expandedLayer === layer || layerSkills.length <= 6 || viewMode === "all" || viewMode === "universal";
            const displaySkills = isExpanded ? layerSkills : layerSkills.slice(0, 6);

            return (
              <motion.div key={layer} variants={item} className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`w-7 h-7 rounded-lg ${config.bg} flex items-center justify-center`}>
                      {layerIcons[layer]}
                    </div>
                    <h2 className="text-base font-bold text-foreground">{t(config.zh, config.en)}</h2>
                    <Badge variant="outline" className="text-[9px]">{layerSkills.length} {t("项", "skills")}</Badge>
                  </div>
                  {layerSkills.length > 6 && !isExpanded && (
                    <button onClick={() => setExpandedLayer(layer)} className="flex items-center gap-1 text-xs text-primary hover:underline">
                      {t("展开全部", "Show All")} <ChevronRight size={12} />
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 gap-3">
                  {displaySkills.map((skill) => (
                    <SkillCardWithKnowledge
                      key={skill.id}
                      skill={skill}
                      isExpanded={expandedSkill === skill.id}
                      onToggle={() => handleSkillExpand(skill.id)}
                      activeTab={activeKnowledgeTab}
                      onTabChange={setActiveKnowledgeTab}
                      knowledgeTabs={knowledgeTabs}
                      copiedPrompt={copiedPrompt}
                      onCopyPrompt={handleCopyPrompt}
                    />
                  ))}
                </div>

                {layerSkills.length > 6 && isExpanded && expandedLayer === layer && (
                  <button onClick={() => setExpandedLayer(null)} className="text-xs text-muted-foreground hover:text-foreground">
                    {t("收起", "Collapse")}
                  </button>
                )}
              </motion.div>
            );
          })}

          {filteredSkills.length === 0 && (
            <div className="text-center py-16">
              <Search size={40} className="mx-auto text-muted-foreground/30 mb-3" />
              <p className="text-sm text-muted-foreground">
                {viewMode === "department" && !selectedDept
                  ? t("请选择一个部门查看对应技能", "Please select a department to view skills")
                  : viewMode === "project" && !selectedProject
                  ? t("请选择一个试点项目查看关联技能", "Please select a pilot project to view skills")
                  : t("未找到匹配的技能", "No matching skills found")}
              </p>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}

/* ========== Skill Card with Knowledge Deposits ========== */
function SkillCardWithKnowledge({
  skill, isExpanded, onToggle, activeTab, onTabChange, knowledgeTabs, copiedPrompt, onCopyPrompt,
}: {
  skill: SkillNode;
  isExpanded: boolean;
  onToggle: () => void;
  activeTab: KnowledgeTab;
  onTabChange: (tab: KnowledgeTab) => void;
  knowledgeTabs: { key: KnowledgeTab; icon: React.ReactNode; zh: string; en: string }[];
  copiedPrompt: string | null;
  onCopyPrompt: (prompt: string, id: string) => void;
}) {
  const { t } = useLanguage();
  const config = layerConfig[skill.layer];
  const k = skill.knowledge;

  const knowledgeCounts: Record<KnowledgeTab, number> = {
    resources: k.resources.length,
    prompts: k.prompts.length,
    workflows: k.workflows.length,
    tasks: k.tasks.length,
    cases: k.cases.length,
  };

  return (
    <Card className={`border-0 shadow-sm transition-all ${isExpanded ? "ring-1 ring-primary/20" : ""}`}>
      <CardContent className="p-0">
        {/* Collapsed Card Header */}
        <button onClick={onToggle} className="w-full p-4 flex items-start gap-3 text-left hover:bg-muted/20 transition-colors rounded-xl">
          {/* Progress Ring */}
          <div className="relative w-11 h-11 shrink-0">
            <svg className="w-11 h-11 -rotate-90" viewBox="0 0 44 44">
              <circle cx="22" cy="22" r="18" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-muted/20" />
              <circle
                cx="22" cy="22" r="18" fill="none" stroke="currentColor" strokeWidth="2.5"
                className={config.color}
                strokeDasharray={`${(skill.progress / 100) * 113} 113`}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-[9px] font-bold font-mono">{skill.progress}%</span>
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5 mb-1">
              <h3 className="text-[13px] font-bold text-foreground truncate">{t(skill.titleZh, skill.titleEn)}</h3>
              <Badge variant="outline" className="text-[8px] shrink-0 px-1">L{skill.level}/{skill.maxLevel}</Badge>
            </div>
            <p className="text-[11px] text-muted-foreground line-clamp-2 mb-2 leading-relaxed">
              {t(skill.descriptionZh, skill.descriptionEn)}
            </p>
            <div className="flex flex-wrap items-center gap-1">
              {skill.departments.filter(d => d !== "all").slice(0, 2).map(dept => (
                <Badge key={dept} variant="secondary" className="text-[8px] px-1.5 py-0">
                  {t(departmentSkillMap[dept]?.zh || dept, departmentSkillMap[dept]?.en || dept)}
                </Badge>
              ))}
              {skill.departments.includes("all") && (
                <Badge variant="secondary" className="text-[8px] px-1.5 py-0 bg-teal-50 text-teal-700">{t("全员", "All")}</Badge>
              )}
              {skill.pilotProjects.slice(0, 1).map(proj => (
                <Badge key={proj} className={`text-[8px] px-1.5 py-0 ${pilotProjectConfig[proj].bg} ${pilotProjectConfig[proj].color} border-0`}>
                  {t(pilotProjectConfig[proj].zh, pilotProjectConfig[proj].en)}
                </Badge>
              ))}
              {skill.tools.slice(0, 2).map(tool => (
                <span key={tool} className="text-[8px] text-muted-foreground bg-muted/40 rounded px-1 py-0">{tool}</span>
              ))}
              {skill.tools.length > 2 && <span className="text-[8px] text-muted-foreground">+{skill.tools.length - 2}</span>}

              {/* Knowledge deposit indicators */}
              <span className="ml-auto flex items-center gap-2 text-[9px] text-muted-foreground">
                {k.resources.length > 0 && <span className="flex items-center gap-0.5"><BookOpen size={10} />{k.resources.length}</span>}
                {k.prompts.length > 0 && <span className="flex items-center gap-0.5"><MessageSquare size={10} />{k.prompts.length}</span>}
                {k.workflows.length > 0 && <span className="flex items-center gap-0.5"><Workflow size={10} />{k.workflows.length}</span>}
                {isExpanded ? <ChevronDown size={14} className="text-primary" /> : <ChevronRight size={14} />}
              </span>
            </div>
          </div>
        </button>

        {/* Expanded Knowledge Panel */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="border-t border-border/50 px-4 pt-3 pb-4">
                {/* Key Takeaways */}
                {k.keyTakeaways.length > 0 && (
                  <div className="mb-4 p-3 bg-amber-50/50 rounded-lg border border-amber-100">
                    <div className="flex items-center gap-1.5 mb-2">
                      <Lightbulb size={13} className="text-amber-600" />
                      <span className="text-[11px] font-semibold text-amber-800">{t("核心要点", "Key Takeaways")}</span>
                    </div>
                    <ul className="space-y-1">
                      {k.keyTakeaways.map((takeaway, i) => (
                        <li key={i} className="text-[11px] text-amber-900/80 flex items-start gap-1.5">
                          <span className="text-amber-500 mt-0.5 shrink-0">•</span>
                          {takeaway}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Knowledge Tabs */}
                <div className="flex gap-1 mb-3 overflow-x-auto pb-1">
                  {knowledgeTabs.map((tab) => {
                    const count = knowledgeCounts[tab.key];
                    return (
                      <button
                        key={tab.key}
                        onClick={() => onTabChange(tab.key)}
                        className={`flex items-center gap-1 px-2.5 py-1.5 rounded-md text-[11px] font-medium whitespace-nowrap transition-all ${
                          activeTab === tab.key
                            ? "bg-primary/10 text-primary"
                            : count > 0
                            ? "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                            : "text-muted-foreground/40 cursor-not-allowed"
                        }`}
                        disabled={count === 0}
                      >
                        {tab.icon}
                        {t(tab.zh, tab.en)}
                        {count > 0 && (
                          <span className={`text-[9px] px-1 rounded-full ${
                            activeTab === tab.key ? "bg-primary/20" : "bg-muted"
                          }`}>{count}</span>
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Tab Content */}
                <div className="min-h-[100px]">
                  {/* Resources Tab */}
                  {activeTab === "resources" && (
                    <div className="space-y-2">
                      {k.resources.length === 0 ? (
                        <EmptyState text={t("暂无学习资源", "No resources yet")} />
                      ) : (
                        k.resources.map((res, i) => (
                          <ResourceCard key={i} resource={res} />
                        ))
                      )}
                    </div>
                  )}

                  {/* Prompts Tab */}
                  {activeTab === "prompts" && (
                    <div className="space-y-3">
                      {k.prompts.length === 0 ? (
                        <EmptyState text={t("暂无Prompt模板", "No prompt templates yet")} />
                      ) : (
                        k.prompts.map((prompt, i) => (
                          <PromptCard
                            key={i}
                            prompt={prompt}
                            skillId={skill.id}
                            index={i}
                            copiedPrompt={copiedPrompt}
                            onCopy={onCopyPrompt}
                          />
                        ))
                      )}
                    </div>
                  )}

                  {/* Workflows Tab */}
                  {activeTab === "workflows" && (
                    <div className="space-y-3">
                      {k.workflows.length === 0 ? (
                        <EmptyState text={t("暂无工作流SOP", "No workflow SOPs yet")} />
                      ) : (
                        k.workflows.map((wf, i) => (
                          <WorkflowCard key={i} workflow={wf} />
                        ))
                      )}
                    </div>
                  )}

                  {/* Tasks Tab */}
                  {activeTab === "tasks" && (
                    <div className="space-y-3">
                      {k.tasks.length === 0 ? (
                        <EmptyState text={t("暂无实操任务", "No practice tasks yet")} />
                      ) : (
                        k.tasks.map((task, i) => (
                          <TaskCard key={i} task={task} />
                        ))
                      )}
                    </div>
                  )}

                  {/* Cases Tab */}
                  {activeTab === "cases" && (
                    <div className="space-y-2">
                      {k.cases.length === 0 ? (
                        <EmptyState text={t("暂无关联案例，持续沉淀中", "No cases yet, accumulating...")} />
                      ) : (
                        k.cases.map((c, i) => (
                          <div key={i} className="p-3 bg-muted/30 rounded-lg">
                            <div className="flex items-center gap-2 mb-1">
                              <Lightbulb size={12} className="text-amber-500" />
                              <span className="text-[12px] font-semibold">{c.title}</span>
                              <Badge variant="secondary" className="text-[8px]">{c.department}</Badge>
                            </div>
                            <p className="text-[11px] text-muted-foreground mb-1">{c.summary}</p>
                            <p className="text-[10px] text-green-600 font-medium">{t("影响", "Impact")}: {c.impact}</p>
                          </div>
                        ))
                      )}
                    </div>
                  )}
                </div>

                {/* Prerequisites */}
                {skill.prerequisites.length > 0 && (
                  <div className="mt-3 pt-3 border-t border-border/30">
                    <span className="text-[10px] text-muted-foreground">{t("前置技能", "Prerequisites")}:</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {skill.prerequisites.map(preId => {
                        const preskill = skillNodes.find(s => s.id === preId);
                        return preskill ? (
                          <Badge key={preId} variant="outline" className="text-[9px] px-1.5">
                            <ArrowRight size={8} className="mr-0.5" />
                            {t(preskill.titleZh, preskill.titleEn)}
                          </Badge>
                        ) : null;
                      })}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  );
}

/* ========== Sub-components ========== */

function EmptyState({ text }: { text: string }) {
  return (
    <div className="text-center py-6 text-muted-foreground/50">
      <FileText size={24} className="mx-auto mb-2" />
      <p className="text-[11px]">{text}</p>
    </div>
  );
}

function ResourceCard({ resource }: { resource: LearningResource }) {
  const { t } = useLanguage();
  return (
    <div className="flex items-center gap-3 p-2.5 bg-muted/20 rounded-lg hover:bg-muted/40 transition-colors group">
      <span className="text-lg shrink-0">{resourceTypeIcons[resource.type] || "📄"}</span>
      <div className="flex-1 min-w-0">
        <div className="text-[12px] font-medium text-foreground truncate">{resource.title}</div>
        <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
          <span className="flex items-center gap-0.5"><Clock size={9} />{resource.duration}</span>
          <span>·</span>
          <span>{resource.source}</span>
        </div>
      </div>
      {resource.url !== "#" && (
        <ExternalLink size={12} className="text-muted-foreground group-hover:text-primary shrink-0" />
      )}
    </div>
  );
}

function PromptCard({
  prompt, skillId, index, copiedPrompt, onCopy,
}: {
  prompt: PromptTemplate;
  skillId: string;
  index: number;
  copiedPrompt: string | null;
  onCopy: (text: string, id: string) => void;
}) {
  const { t } = useLanguage();
  const promptId = `${skillId}-${index}`;
  const isCopied = copiedPrompt === promptId;

  return (
    <div className="border border-border/40 rounded-lg overflow-hidden">
      <div className="p-3 bg-muted/20">
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-1.5">
            <MessageSquare size={12} className="text-violet-500" />
            <span className="text-[12px] font-semibold">{prompt.title}</span>
          </div>
          <button
            onClick={() => onCopy(prompt.prompt, promptId)}
            className={`flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-medium transition-all ${
              isCopied ? "bg-green-100 text-green-700" : "bg-muted hover:bg-muted/80 text-muted-foreground"
            }`}
          >
            {isCopied ? <CheckCircle2 size={10} /> : <Copy size={10} />}
            {isCopied ? t("已复制", "Copied") : t("复制", "Copy")}
          </button>
        </div>
        <p className="text-[10px] text-muted-foreground mb-2">
          {t("场景", "Scenario")}: {prompt.scenario}
        </p>
      </div>
      <div className="p-3 bg-gray-50/80">
        <pre className="text-[10px] text-foreground/80 whitespace-pre-wrap font-mono leading-relaxed max-h-[200px] overflow-y-auto">
          {prompt.prompt}
        </pre>
      </div>
      <div className="px-3 py-2 bg-muted/10 flex items-center gap-3 text-[9px] text-muted-foreground">
        {prompt.variables && prompt.variables.length > 0 && (
          <span>{t("变量", "Variables")}: {prompt.variables.map(v => `{${v}}`).join(", ")}</span>
        )}
        <span className="ml-auto">{t("预期输出", "Output")}: {prompt.expectedOutput}</span>
      </div>
    </div>
  );
}

function WorkflowCard({ workflow }: { workflow: WorkflowSOP }) {
  const { t } = useLanguage();
  return (
    <div className="border border-border/40 rounded-lg p-3">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-1.5">
          <Workflow size={12} className="text-blue-500" />
          <span className="text-[12px] font-semibold">{workflow.title}</span>
        </div>
        <span className="text-[9px] text-muted-foreground flex items-center gap-0.5">
          <Clock size={9} />{workflow.estimatedTime}
        </span>
      </div>
      <p className="text-[10px] text-muted-foreground mb-3">{t("场景", "Scenario")}: {workflow.scenario}</p>
      <div className="space-y-2">
        {workflow.steps.map((step) => (
          <div key={step.step} className="flex items-start gap-2">
            <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
              <span className="text-[9px] font-bold text-primary">{step.step}</span>
            </div>
            <div className="flex-1">
              <div className="text-[11px] text-foreground">{step.action}</div>
              <div className="flex items-center gap-2 text-[9px] text-muted-foreground mt-0.5">
                {step.tool && <Badge variant="outline" className="text-[8px] px-1">{step.tool}</Badge>}
                <span className="flex items-center gap-0.5"><ArrowRight size={8} />{step.output}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function TaskCard({ task }: { task: PracticeTask }) {
  const { t } = useLanguage();
  const dc = difficultyConfig[task.difficulty] || difficultyConfig.intermediate;

  return (
    <div className="border border-border/40 rounded-lg p-3">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-1.5">
          <ClipboardCheck size={12} className="text-green-500" />
          <span className="text-[12px] font-semibold">{task.title}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Badge className={`text-[8px] px-1.5 border-0 ${dc.color}`}>{t(dc.zh, dc.en)}</Badge>
          <span className="text-[9px] text-muted-foreground flex items-center gap-0.5">
            <Clock size={9} />{task.estimatedTime}
          </span>
        </div>
      </div>
      <p className="text-[11px] text-muted-foreground mb-3">{task.description}</p>

      <div className="mb-2">
        <span className="text-[10px] font-medium text-foreground">{t("验收标准", "Acceptance Criteria")}:</span>
        <ul className="mt-1 space-y-1">
          {task.acceptanceCriteria.map((criteria, i) => (
            <li key={i} className="flex items-start gap-1.5 text-[10px] text-muted-foreground">
              <CheckCircle2 size={10} className="text-green-400 mt-0.5 shrink-0" />
              {criteria}
            </li>
          ))}
        </ul>
      </div>

      <div className="flex items-center gap-1.5 text-[10px] text-primary font-medium pt-2 border-t border-border/30">
        <FileText size={10} />
        {t("交付物", "Deliverable")}: {task.deliverable}
      </div>
    </div>
  );
}
