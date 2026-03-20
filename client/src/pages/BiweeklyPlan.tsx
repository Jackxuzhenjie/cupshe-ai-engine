import { useState, useMemo } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar, Target, Users, ChevronDown, ChevronRight, Sparkles,
  BookOpen, ClipboardCheck, MessageSquare, RefreshCw, ArrowRight,
  Zap, Award, CheckCircle2, Clock, Layers
} from "lucide-react";
import {
  biweeklySchedule, sprintPhaseConfig, skillNodes,
  type BiweeklySprint, type SprintPhase,
} from "@/lib/skillTreeData";

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.04 } } };
const item = { hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } };

export default function BiweeklyPlan() {
  const { t } = useLanguage();
  const [expandedSprint, setExpandedSprint] = useState<number | null>(1);
  const [filterPhase, setFilterPhase] = useState<SprintPhase | "all">("all");

  // Calculate current sprint based on date
  const currentSprint = useMemo(() => {
    const now = new Date();
    for (const s of biweeklySchedule) {
      const start = new Date(s.startDate);
      const end = new Date(s.endDate);
      end.setHours(23, 59, 59);
      if (now >= start && now <= end) return s.sprint;
    }
    // If before first sprint, return 0; if after all, return last
    const firstStart = new Date(biweeklySchedule[0].startDate);
    if (now < firstStart) return 0;
    return biweeklySchedule[biweeklySchedule.length - 1].sprint + 1;
  }, []);

  const filteredSprints = useMemo(() => {
    if (filterPhase === "all") return biweeklySchedule;
    return biweeklySchedule.filter(s => s.phase === filterPhase);
  }, [filterPhase]);

  // Stats
  const totalCases = biweeklySchedule.reduce((sum, s) => sum + s.caseTarget, 0);
  const totalSprints = biweeklySchedule.length;
  const completedSprints = biweeklySchedule.filter(s => {
    const end = new Date(s.endDate);
    return new Date() > end;
  }).length;

  const phaseGroups = useMemo(() => {
    const groups: Record<string, BiweeklySprint[]> = {};
    for (const s of biweeklySchedule) {
      if (!groups[s.phase]) groups[s.phase] = [];
      groups[s.phase].push(s);
    }
    return groups;
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-5xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <Calendar className="text-primary" size={24} />
            <h1 className="text-xl font-bold">{t("双周技能学习计划", "Biweekly Skill Learning Plan")}</h1>
          </div>
          <p className="text-sm text-muted-foreground">
            {t(
              "2026年Q2-Q4 · 19个Sprint · 覆盖全员基础→试点深化→部门扩展→进阶提升→年度复盘",
              "2026 Q2-Q4 · 19 Sprints · Foundation → Pilot Deep → Department Expand → Advanced → Annual Review"
            )}
          </p>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          <div className="bg-card border border-border rounded-lg p-3">
            <div className="flex items-center gap-1.5 mb-1">
              <Layers size={14} className="text-blue-500" />
              <span className="text-[11px] text-muted-foreground">{t("总Sprint数", "Total Sprints")}</span>
            </div>
            <div className="text-xl font-bold">{totalSprints}</div>
            <Progress value={(completedSprints / totalSprints) * 100} className="h-1 mt-1" />
            <span className="text-[10px] text-muted-foreground">{completedSprints}/{totalSprints} {t("已完成", "completed")}</span>
          </div>
          <div className="bg-card border border-border rounded-lg p-3">
            <div className="flex items-center gap-1.5 mb-1">
              <Target size={14} className="text-green-500" />
              <span className="text-[11px] text-muted-foreground">{t("案例产出目标", "Case Target")}</span>
            </div>
            <div className="text-xl font-bold">{totalCases}</div>
            <span className="text-[10px] text-muted-foreground">{t("全年累计案例目标", "Annual cumulative target")}</span>
          </div>
          <div className="bg-card border border-border rounded-lg p-3">
            <div className="flex items-center gap-1.5 mb-1">
              <Users size={14} className="text-orange-500" />
              <span className="text-[11px] text-muted-foreground">{t("覆盖技能", "Skills Covered")}</span>
            </div>
            <div className="text-xl font-bold">{new Set(biweeklySchedule.map(s => s.skillId)).size}</div>
            <span className="text-[10px] text-muted-foreground">{t("关联技能树节点", "Linked skill nodes")}</span>
          </div>
          <div className="bg-card border border-border rounded-lg p-3">
            <div className="flex items-center gap-1.5 mb-1">
              <Sparkles size={14} className="text-purple-500" />
              <span className="text-[11px] text-muted-foreground">{t("当前Sprint", "Current Sprint")}</span>
            </div>
            <div className="text-xl font-bold">
              {currentSprint === 0 ? t("未开始", "Not Started") : currentSprint > totalSprints ? t("已结束", "Ended") : `#${currentSprint}`}
            </div>
            <span className="text-[10px] text-muted-foreground">
              {currentSprint > 0 && currentSprint <= totalSprints
                ? biweeklySchedule[currentSprint - 1].theme
                : t("2026年4月启动", "Starts April 2026")}
            </span>
          </div>
        </div>

        {/* Phase Filter */}
        <div className="flex gap-2 mb-4 overflow-x-auto pb-1">
          <button
            onClick={() => setFilterPhase("all")}
            className={`px-3 py-1.5 rounded-full text-[11px] font-medium whitespace-nowrap transition-all ${
              filterPhase === "all" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            {t("全部阶段", "All Phases")} ({totalSprints})
          </button>
          {(Object.entries(sprintPhaseConfig) as [SprintPhase, typeof sprintPhaseConfig[SprintPhase]][]).map(([key, conf]) => (
            <button
              key={key}
              onClick={() => setFilterPhase(key)}
              className={`px-3 py-1.5 rounded-full text-[11px] font-medium whitespace-nowrap transition-all ${
                filterPhase === key ? `${conf.color} ring-1 ring-current` : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              {t(conf.zh, conf.en)} ({phaseGroups[key]?.length || 0})
            </button>
          ))}
        </div>

        {/* Sprint Timeline */}
        <motion.div variants={container} initial="hidden" animate="show" className="space-y-3">
          {filteredSprints.map((sprint) => {
            const isExpanded = expandedSprint === sprint.sprint;
            const isCurrent = sprint.sprint === currentSprint;
            const isPast = new Date() > new Date(sprint.endDate);
            const isFuture = new Date() < new Date(sprint.startDate);
            const phaseConf = sprintPhaseConfig[sprint.phase];
            const linkedSkill = skillNodes.find(s => s.id === sprint.skillId);

            return (
              <motion.div key={sprint.sprint} variants={item}>
                <div className={`border rounded-lg overflow-hidden transition-all ${
                  isCurrent ? "border-primary ring-1 ring-primary/30 bg-primary/5" :
                  isPast ? "border-border/50 bg-muted/20" : "border-border"
                }`}>
                  {/* Sprint Header */}
                  <button
                    onClick={() => setExpandedSprint(isExpanded ? null : sprint.sprint)}
                    className="w-full text-left p-3 hover:bg-muted/30 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      {/* Sprint Number */}
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 text-sm font-bold ${
                        isCurrent ? "bg-primary text-primary-foreground" :
                        isPast ? "bg-green-100 text-green-700" : "bg-muted text-muted-foreground"
                      }`}>
                        {isPast ? <CheckCircle2 size={16} /> : `S${sprint.sprint}`}
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap mb-0.5">
                          <span className="text-[13px] font-semibold truncate">{sprint.theme}</span>
                          <Badge className={`text-[9px] px-1.5 border-0 ${phaseConf.color}`}>
                            {t(phaseConf.zh, phaseConf.en)}
                          </Badge>
                          {isCurrent && (
                            <Badge className="text-[9px] px-1.5 bg-primary text-primary-foreground border-0 animate-pulse">
                              {t("进行中", "Active")}
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-3 text-[10px] text-muted-foreground">
                          <span className="flex items-center gap-0.5">
                            <Clock size={9} />
                            {sprint.startDate} ~ {sprint.endDate}
                          </span>
                          <span className="flex items-center gap-0.5">
                            <BookOpen size={9} />
                            {sprint.skillId}
                          </span>
                          <span className="flex items-center gap-0.5">
                            <Target size={9} />
                            {sprint.caseTarget} {t("案例", "cases")}
                          </span>
                          <span className="flex items-center gap-0.5">
                            <Users size={9} />
                            {sprint.targetDepartments.includes("all") ? t("全员", "All") : sprint.targetDepartments.length + t("部门", " depts")}
                          </span>
                        </div>
                      </div>

                      {isExpanded ? <ChevronDown size={16} className="text-primary shrink-0" /> : <ChevronRight size={16} className="shrink-0" />}
                    </div>
                  </button>

                  {/* Expanded Content */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="border-t border-border/50 p-4 space-y-4">
                          {/* Linked Skill */}
                          {linkedSkill && (
                            <div className="flex items-center gap-2 p-2.5 bg-muted/30 rounded-lg">
                              <Zap size={14} className="text-amber-500 shrink-0" />
                              <div>
                                <span className="text-[11px] font-medium">{t("关联技能", "Linked Skill")}: </span>
                                <span className="text-[11px] text-primary font-semibold">{linkedSkill.titleZh}</span>
                                <span className="text-[10px] text-muted-foreground ml-2">L{linkedSkill.level}/{linkedSkill.maxLevel}</span>
                              </div>
                            </div>
                          )}

                          {/* AI科代表角色 */}
                          <div className="p-3 bg-orange-50/50 rounded-lg border border-orange-100">
                            <div className="flex items-center gap-1.5 mb-1.5">
                              <Award size={13} className="text-orange-600" />
                              <span className="text-[11px] font-semibold text-orange-800">{t("AI科代表职责", "AI Champion Role")}</span>
                            </div>
                            <p className="text-[11px] text-orange-900/80 leading-relaxed">{sprint.aiChampionRole}</p>
                          </div>

                          {/* Milestones */}
                          <div>
                            <div className="flex items-center gap-1.5 mb-2">
                              <ClipboardCheck size={13} className="text-green-600" />
                              <span className="text-[11px] font-semibold">{t("里程碑", "Milestones")}</span>
                            </div>
                            <div className="space-y-1.5">
                              {sprint.milestones.map((m, i) => (
                                <div key={i} className="flex items-start gap-2 text-[11px]">
                                  <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                                    isPast ? "bg-green-100 text-green-600" : "bg-muted text-muted-foreground"
                                  }`}>
                                    {isPast ? <CheckCircle2 size={10} /> : <span className="text-[9px] font-bold">{i + 1}</span>}
                                  </div>
                                  <span className={isPast ? "text-muted-foreground line-through" : "text-foreground"}>{m}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* 双周分享会主题 */}
                          <div className="p-3 bg-violet-50/50 rounded-lg border border-violet-100">
                            <div className="flex items-center gap-1.5 mb-1.5">
                              <MessageSquare size={13} className="text-violet-600" />
                              <span className="text-[11px] font-semibold text-violet-800">{t("双周分享会主题", "Biweekly Sharing Theme")}</span>
                            </div>
                            <p className="text-[11px] text-violet-900/80">{sprint.sharingTheme}</p>
                          </div>

                          {/* 闭环机制 */}
                          <div className="p-3 bg-blue-50/50 rounded-lg border border-blue-100">
                            <div className="flex items-center gap-1.5 mb-2">
                              <RefreshCw size={13} className="text-blue-600" />
                              <span className="text-[11px] font-semibold text-blue-800">{t("闭环机制", "Closed Loop")}</span>
                            </div>
                            <div className="flex flex-wrap items-center gap-1">
                              {sprint.closedLoop.split("→").map((step, i, arr) => (
                                <span key={i} className="flex items-center gap-1">
                                  <span className="text-[10px] px-2 py-0.5 bg-blue-100/80 text-blue-800 rounded-full whitespace-nowrap">
                                    {step.trim()}
                                  </span>
                                  {i < arr.length - 1 && <ArrowRight size={10} className="text-blue-400 shrink-0" />}
                                </span>
                              ))}
                            </div>
                          </div>

                          {/* Case Target */}
                          <div className="flex items-center justify-between p-2.5 bg-amber-50/30 rounded-lg border border-amber-100/50">
                            <div className="flex items-center gap-1.5">
                              <Target size={13} className="text-amber-600" />
                              <span className="text-[11px] font-semibold text-amber-800">{t("案例产出目标", "Case Output Target")}</span>
                            </div>
                            <span className="text-lg font-bold text-amber-700">{sprint.caseTarget}</span>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Footer */}
        <div className="mt-6 text-center text-[10px] text-muted-foreground">
          <p>{t(
            "CUPSHE AI转型双周学习计划 · PM: Sammer孔秋实 · HR推动: Jack Xu许振杰 & Bran陈光阳 · PMO跟进: Claire王喆",
            "CUPSHE AI Transformation Biweekly Plan · PM: Sammer · HR: Jack Xu & Bran · PMO: Claire"
          )}</p>
        </div>
      </div>
    </div>
  );
}
