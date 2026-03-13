/*
 * DepartmentCenter — Per-department AI dashboard for center leaders
 * Design: Department selector + rich metrics + AI initiatives
 */
import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";
import { useState } from "react";
import {
  Building2, TrendingUp, TrendingDown, Users, BookOpen, Target, Sparkles,
  Bot, Workflow, FileText, Trophy, ArrowUpRight, ArrowDownRight, ChevronRight,
} from "lucide-react";
import { departmentCenters, type DepartmentCenter as DeptCenter } from "@/lib/data";

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.06 } } };
const item = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } };

export default function DepartmentCenter() {
  const { t, lang } = useLanguage();
  const [selectedDeptId, setSelectedDeptId] = useState(departmentCenters[0].id);

  const dept = departmentCenters.find((d) => d.id === selectedDeptId) || departmentCenters[0];

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6 max-w-[1400px] mx-auto">
      {/* Header */}
      <motion.div variants={item}>
        <div className="flex items-center gap-2 mb-1">
          <Building2 size={20} className="text-ocean-light" />
          <h1 className="text-2xl font-extrabold text-foreground">{t("部门中心", "Department Center")}</h1>
        </div>
        <p className="text-sm text-muted-foreground">
          {t("各中心AI使用情况、案例、挑战和效率一览", "Department-level AI usage, cases, challenges, and efficiency overview")}
        </p>
      </motion.div>

      {/* Department Selector */}
      <motion.div variants={item} className="flex gap-1.5 overflow-x-auto pb-1">
        {departmentCenters.map((d) => (
          <button
            key={d.id}
            onClick={() => setSelectedDeptId(d.id)}
            className={`px-4 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
              selectedDeptId === d.id
                ? "bg-primary text-primary-foreground shadow-sm"
                : "bg-card text-muted-foreground hover:bg-muted border border-border/50"
            }`}
          >
            <div className="flex items-center gap-2">
              <span>{t(d.zh, d.en)}</span>
              <span className={`font-mono text-[10px] ${selectedDeptId === d.id ? "text-primary-foreground/80" : "text-muted-foreground"}`}>
                {d.penetration}%
              </span>
            </div>
          </button>
        ))}
      </motion.div>

      {/* Department Header Card */}
      <motion.div variants={item}>
        <Card className="border-0 shadow-sm overflow-hidden">
          <div className="bg-gradient-to-r from-primary/5 via-teal/5 to-coral/5 p-6">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-extrabold text-foreground mb-1">{t(dept.zh, dept.en)}</h2>
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1"><Users size={14} /> {dept.activeMembers}/{dept.totalMembers} {t("活跃成员", "Active Members")}</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                {dept.topTools.map((tool) => (
                  <Badge key={tool} variant="secondary" className="text-xs">{tool}</Badge>
                ))}
              </div>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Core Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <motion.div variants={item}>
          <Card className="border-0 shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-muted-foreground">{t("AI渗透率", "AI Penetration")}</span>
                <div className="p-1.5 rounded-lg bg-teal/10"><Target size={14} className="text-teal" /></div>
              </div>
              <div className="text-2xl font-extrabold font-mono">{dept.penetration}%</div>
              <Progress value={dept.penetration} className="h-1.5 mt-2" />
            </CardContent>
          </Card>
        </motion.div>
        <motion.div variants={item}>
          <Card className="border-0 shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-muted-foreground">{t("效率提升", "Efficiency Gain")}</span>
                <div className="p-1.5 rounded-lg bg-coral/10"><TrendingUp size={14} className="text-coral" /></div>
              </div>
              <div className="text-2xl font-extrabold font-mono">{dept.efficiency}%</div>
              <Progress value={dept.efficiency} className="h-1.5 mt-2" />
            </CardContent>
          </Card>
        </motion.div>
        <motion.div variants={item}>
          <Card className="border-0 shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-muted-foreground">{t("AI案例", "AI Cases")}</span>
                <div className="p-1.5 rounded-lg bg-ocean-light/10"><BookOpen size={14} className="text-ocean-light" /></div>
              </div>
              <div className="text-2xl font-extrabold font-mono">{dept.totalCases}</div>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div variants={item}>
          <Card className="border-0 shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-muted-foreground">{t("活跃挑战", "Challenges")}</span>
                <div className="p-1.5 rounded-lg bg-warning/10"><Trophy size={14} className="text-warning" /></div>
              </div>
              <div className="text-2xl font-extrabold font-mono">{dept.challenges}</div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Key Metrics Detail */}
      <motion.div variants={item}>
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">{t("关键指标", "Key Metrics")}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              {dept.keyMetrics.map((metric, i) => (
                <div key={i} className="p-4 rounded-xl bg-muted/30">
                  <div className="text-xs text-muted-foreground mb-1">{t(metric.labelZh, metric.labelEn)}</div>
                  <div className="flex items-center gap-2">
                    <span className="text-xl font-extrabold font-mono">{metric.value}</span>
                    {metric.trend === "up" ? (
                      <ArrowUpRight size={16} className="text-success" />
                    ) : (
                      <ArrowDownRight size={16} className="text-success" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* AI Initiatives & Assets */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* AI Initiatives */}
        <motion.div variants={item}>
          <Card className="border-0 shadow-sm h-full">
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center gap-2">
                <Sparkles size={16} className="text-coral" /> {t("AI应用方向", "AI Initiatives")}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {(lang === "zh" ? dept.aiInitiativesZh : dept.aiInitiativesEn).map((initiative, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <Sparkles size={14} className="text-primary" />
                    </div>
                    <span className="text-sm font-medium">{initiative}</span>
                    <ChevronRight size={14} className="text-muted-foreground ml-auto" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* AI Assets */}
        <motion.div variants={item}>
          <Card className="border-0 shadow-sm h-full">
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center gap-2">
                <Building2 size={16} className="text-ocean-light" /> {t("AI资产", "AI Assets")}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="p-4 rounded-xl bg-primary/5 border border-primary/10 text-center">
                  <FileText size={20} className="text-primary mx-auto mb-1" />
                  <div className="text-xl font-bold font-mono">{dept.prompts}</div>
                  <div className="text-[10px] text-muted-foreground">Prompts</div>
                </div>
                <div className="p-4 rounded-xl bg-ocean-light/5 border border-ocean-light/10 text-center">
                  <Workflow size={20} className="text-ocean-light mx-auto mb-1" />
                  <div className="text-xl font-bold font-mono">{dept.workflows}</div>
                  <div className="text-[10px] text-muted-foreground">Workflows</div>
                </div>
                <div className="p-4 rounded-xl bg-teal/5 border border-teal/10 text-center">
                  <Bot size={20} className="text-teal mx-auto mb-1" />
                  <div className="text-xl font-bold font-mono">{dept.agents}</div>
                  <div className="text-[10px] text-muted-foreground">Agents</div>
                </div>
                <div className="p-4 rounded-xl bg-coral/5 border border-coral/10 text-center">
                  <BookOpen size={20} className="text-coral mx-auto mb-1" />
                  <div className="text-xl font-bold font-mono">{dept.totalCases}</div>
                  <div className="text-[10px] text-muted-foreground">{t("案例", "Cases")}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Recent Cases */}
      <motion.div variants={item}>
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <BookOpen size={16} className="text-teal" /> {t("最新案例", "Recent Cases")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {(lang === "zh" ? dept.recentCasesZh : dept.recentCasesEn).map((caseName, i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors">
                  <div className="w-6 h-6 rounded-full bg-teal/10 flex items-center justify-center shrink-0 text-[10px] font-bold text-teal">
                    {i + 1}
                  </div>
                  <span className="text-sm">{caseName}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}
