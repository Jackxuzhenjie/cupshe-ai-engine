/*
 * SkillTree — Comprehensive AI skill tree with user-centric navigation
 * Design: Multi-view navigation (Universal / Department / Project / All)
 * Covers CUPSHE full value chain × 14 departments × 3 pilot projects × 4 layers
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
  ChevronRight, Sparkles, Target, Zap, Shield, BookOpen
} from "lucide-react";
import {
  skillNodes, layerConfig, pilotProjectConfig, departmentSkillMap,
  type SkillNode, type SkillLayer, type PilotProject,
} from "@/lib/skillTreeData";

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.05 } } };
const item = { hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } };

type ViewMode = "universal" | "department" | "project" | "all";

const layerIcons: Record<SkillLayer, React.ReactNode> = {
  foundation: <GraduationCap size={14} />,
  department: <Building2 size={14} />,
  scenario: <Target size={14} />,
  system: <Zap size={14} />,
};

export default function SkillTree() {
  const { t } = useLanguage();
  const [viewMode, setViewMode] = useState<ViewMode>("universal");
  const [selectedDept, setSelectedDept] = useState<string | null>(null);
  const [selectedProject, setSelectedProject] = useState<PilotProject | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedLayer, setExpandedLayer] = useState<SkillLayer | null>(null);

  // Compute overall stats
  const stats = useMemo(() => {
    const total = skillNodes.length;
    const avgProgress = Math.round(skillNodes.reduce((a, s) => a + s.progress, 0) / total);
    const completed = skillNodes.filter(s => s.progress >= 100).length;
    const inProgress = skillNodes.filter(s => s.progress > 0 && s.progress < 100).length;
    const notStarted = skillNodes.filter(s => s.progress === 0).length;
    return { total, avgProgress, completed, inProgress, notStarted };
  }, []);

  // Filter skills based on current view
  const filteredSkills = useMemo(() => {
    let result = skillNodes;

    if (viewMode === "universal") {
      result = result.filter(s => s.layer === "foundation");
    } else if (viewMode === "department" && selectedDept) {
      result = result.filter(s =>
        s.departments.includes(selectedDept) || s.departments.includes("all")
      );
    } else if (viewMode === "project" && selectedProject) {
      result = result.filter(s => s.pilotProjects.includes(selectedProject));
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(s =>
        s.titleZh.toLowerCase().includes(q) ||
        s.titleEn.toLowerCase().includes(q) ||
        s.descriptionZh.toLowerCase().includes(q) ||
        s.tags.some(tag => tag.toLowerCase().includes(q)) ||
        s.tools.some(tool => tool.toLowerCase().includes(q))
      );
    }

    return result;
  }, [viewMode, selectedDept, selectedProject, searchQuery]);

  // Group skills by layer
  const groupedByLayer = useMemo(() => {
    const groups: Record<SkillLayer, SkillNode[]> = {
      foundation: [], department: [], scenario: [], system: [],
    };
    filteredSkills.forEach(s => groups[s.layer].push(s));
    return groups;
  }, [filteredSkills]);

  const viewTabs: { key: ViewMode; icon: React.ReactNode; zh: string; en: string }[] = [
    { key: "universal", icon: <GraduationCap size={15} />, zh: "全员必修", en: "Universal" },
    { key: "department", icon: <Building2 size={15} />, zh: "按部门", en: "By Dept" },
    { key: "project", icon: <FolderKanban size={15} />, zh: "按项目", en: "By Project" },
    { key: "all", icon: <Layers size={15} />, zh: "全部技能", en: "All Skills" },
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
              "覆盖14个中心 × 3大试点项目 × 4层技能体系 · 每双周主题技能学习与案例分享 · 以用户为中心的技能导航",
              "14 departments × 3 pilot projects × 4-layer system · Bi-weekly skill learning & case sharing · User-centric navigation"
            )}
          </p>
        </div>
      </motion.div>

      {/* Stats Bar */}
      <motion.div variants={item}>
        <Card className="border-0 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold">{t("技能总览", "Skills Overview")}</span>
              <span className="text-sm font-bold font-mono text-primary">{stats.avgProgress}%</span>
            </div>
            <Progress value={stats.avgProgress} className="h-2 mb-3" />
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
              <div className="bg-muted/40 rounded-lg p-2">
                <div className="text-lg font-bold text-foreground">{stats.total}</div>
                <div className="text-[10px] text-muted-foreground">{t("总技能数", "Total Skills")}</div>
              </div>
              <div className="bg-teal-50 rounded-lg p-2">
                <div className="text-lg font-bold text-teal-600">{stats.completed}</div>
                <div className="text-[10px] text-muted-foreground">{t("已掌握", "Mastered")}</div>
              </div>
              <div className="bg-blue-50 rounded-lg p-2">
                <div className="text-lg font-bold text-blue-600">{stats.inProgress}</div>
                <div className="text-[10px] text-muted-foreground">{t("学习中", "In Progress")}</div>
              </div>
              <div className="bg-gray-50 rounded-lg p-2">
                <div className="text-lg font-bold text-gray-500">{stats.notStarted}</div>
                <div className="text-[10px] text-muted-foreground">{t("未开始", "Not Started")}</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Navigation Tabs + Search */}
      <motion.div variants={item} className="space-y-3">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
          {/* View Mode Tabs */}
          <div className="flex gap-1 bg-muted/50 rounded-lg p-1">
            {viewTabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => {
                  setViewMode(tab.key);
                  setSelectedDept(null);
                  setSelectedProject(null);
                  setExpandedLayer(null);
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                  viewMode === tab.key
                    ? "bg-white text-primary shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab.icon}
                <span className="hidden sm:inline">{t(tab.zh, tab.en)}</span>
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative flex-1 w-full sm:max-w-xs">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder={t("搜索技能、工具、标签...", "Search skills, tools, tags...")}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 h-8 text-xs"
            />
          </div>
        </div>

        {/* Department Selector */}
        {viewMode === "department" && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="overflow-hidden"
          >
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-2">
              {Object.entries(departmentSkillMap).map(([key, dept]) => {
                const deptSkillCount = skillNodes.filter(
                  s => s.departments.includes(key) || s.departments.includes("all")
                ).length;
                return (
                  <button
                    key={key}
                    onClick={() => setSelectedDept(key)}
                    className={`flex flex-col items-center gap-1 p-3 rounded-xl border text-center transition-all ${
                      selectedDept === key
                        ? "border-primary bg-primary/5 shadow-sm"
                        : "border-transparent bg-muted/30 hover:bg-muted/60"
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
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="overflow-hidden"
          >
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {(Object.entries(pilotProjectConfig) as [PilotProject, typeof pilotProjectConfig[PilotProject]][]).map(
                ([key, proj]) => {
                  const projSkillCount = skillNodes.filter(s => s.pilotProjects.includes(key)).length;
                  return (
                    <button
                      key={key}
                      onClick={() => setSelectedProject(key)}
                      className={`flex items-center gap-3 p-4 rounded-xl border transition-all text-left ${
                        selectedProject === key
                          ? `border-current ${proj.color} ${proj.bg} shadow-sm`
                          : "border-transparent bg-muted/30 hover:bg-muted/60"
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
                }
              )}
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
                {/* Layer Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`w-7 h-7 rounded-lg ${config.bg} flex items-center justify-center`}>
                      {layerIcons[layer]}
                    </div>
                    <h2 className="text-base font-bold text-foreground">
                      {t(config.zh, config.en)}
                    </h2>
                    <Badge variant="outline" className="text-[9px]">
                      {layerSkills.length} {t("项", "skills")}
                    </Badge>
                  </div>
                  {layerSkills.length > 6 && !isExpanded && (
                    <button
                      onClick={() => setExpandedLayer(layer)}
                      className="flex items-center gap-1 text-xs text-primary hover:underline"
                    >
                      {t("展开全部", "Show All")} <ChevronRight size={12} />
                    </button>
                  )}
                </div>

                {/* Skill Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
                  {displaySkills.map((skill) => (
                    <SkillCard key={skill.id} skill={skill} />
                  ))}
                </div>

                {layerSkills.length > 6 && isExpanded && expandedLayer === layer && (
                  <button
                    onClick={() => setExpandedLayer(null)}
                    className="text-xs text-muted-foreground hover:text-foreground"
                  >
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

/* ========== Skill Card Component ========== */
function SkillCard({ skill }: { skill: SkillNode }) {
  const { t } = useLanguage();
  const config = layerConfig[skill.layer];

  return (
    <Card className="card-hover border-0 shadow-sm group">
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
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
            {/* Title + Level */}
            <div className="flex items-center gap-1.5 mb-1">
              <h3 className="text-[13px] font-bold text-foreground truncate">
                {t(skill.titleZh, skill.titleEn)}
              </h3>
              <Badge variant="outline" className="text-[8px] shrink-0 px-1">
                L{skill.level}/{skill.maxLevel}
              </Badge>
            </div>

            {/* Description */}
            <p className="text-[11px] text-muted-foreground line-clamp-2 mb-2 leading-relaxed">
              {t(skill.descriptionZh, skill.descriptionEn)}
            </p>

            {/* Tags Row */}
            <div className="flex flex-wrap items-center gap-1">
              {/* Department badges */}
              {skill.departments.filter(d => d !== "all").slice(0, 2).map(dept => (
                <Badge key={dept} variant="secondary" className="text-[8px] px-1.5 py-0">
                  {t(departmentSkillMap[dept]?.zh || dept, departmentSkillMap[dept]?.en || dept)}
                </Badge>
              ))}
              {skill.departments.includes("all") && (
                <Badge variant="secondary" className="text-[8px] px-1.5 py-0 bg-teal-50 text-teal-700">
                  {t("全员", "All")}
                </Badge>
              )}

              {/* Pilot project badges */}
              {skill.pilotProjects.slice(0, 1).map(proj => (
                <Badge key={proj} className={`text-[8px] px-1.5 py-0 ${pilotProjectConfig[proj].bg} ${pilotProjectConfig[proj].color} border-0`}>
                  {t(pilotProjectConfig[proj].zh, pilotProjectConfig[proj].en)}
                </Badge>
              ))}

              {/* Tools (show first 2) */}
              {skill.tools.slice(0, 2).map(tool => (
                <span key={tool} className="text-[8px] text-muted-foreground bg-muted/40 rounded px-1 py-0">
                  {tool}
                </span>
              ))}
              {skill.tools.length > 2 && (
                <span className="text-[8px] text-muted-foreground">+{skill.tools.length - 2}</span>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
