/*
 * SkillTree — Four-layer AI skill progression with role-based tracks
 * Design: Visual skill nodes with progress rings and layer grouping
 */
import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";
import { GitBranch, Lock, CheckCircle2, Circle } from "lucide-react";
import { skills, type Skill } from "@/lib/data";

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.08 } } };
const item = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } };

const layerConfig: Record<Skill["layer"], { zh: string; en: string; color: string; bg: string }> = {
  foundation: { zh: "基础技能", en: "Foundation", color: "text-teal", bg: "bg-teal/10" },
  role: { zh: "角色技能", en: "Role Skills", color: "text-ocean-light", bg: "bg-ocean-light/10" },
  process: { zh: "流程技能", en: "Process Skills", color: "text-coral", bg: "bg-coral/10" },
  system: { zh: "系统技能", en: "System Skills", color: "text-primary", bg: "bg-primary/10" },
};

const trackLabels: Record<string, { zh: string; en: string }> = {
  all: { zh: "全员", en: "All" },
  marketing: { zh: "市场营销", en: "Marketing" },
  creative: { zh: "创意设计", en: "Creative" },
  merchandising: { zh: "商品企划", en: "Merchandising" },
  operations: { zh: "运营", en: "Operations" },
  data: { zh: "数据", en: "Data" },
  it: { zh: "IT技术", en: "IT" },
};

export default function SkillTree() {
  const { t } = useLanguage();

  const layers: Skill["layer"][] = ["foundation", "role", "process", "system"];

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6 max-w-[1400px] mx-auto">
      {/* Header with background */}
      <motion.div variants={item} className="relative rounded-2xl overflow-hidden h-[160px] lg:h-[180px]">
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
          <p className="text-sm text-muted-foreground max-w-lg">
            {t(
              "四层技能体系，从基础到系统，解锁你的AI能力图谱",
              "Four-layer skill system, from foundation to system level, unlock your AI capability map"
            )}
          </p>
        </div>
      </motion.div>

      {/* Overall Progress */}
      <motion.div variants={item}>
        <Card className="border-0 shadow-sm">
          <CardContent className="p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-semibold">{t("总体进度", "Overall Progress")}</span>
              <span className="text-sm font-bold font-mono text-primary">
                {Math.round(skills.reduce((acc, s) => acc + s.progress, 0) / skills.length)}%
              </span>
            </div>
            <Progress value={skills.reduce((acc, s) => acc + s.progress, 0) / skills.length} className="h-2" />
            <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground">
              <span>{skills.length} {t("项技能", "skills")}</span>
              <span>{skills.filter(s => s.progress >= 100).length} {t("已解锁", "unlocked")}</span>
              <span>{skills.filter(s => s.progress > 0 && s.progress < 100).length} {t("进行中", "in progress")}</span>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Skill Layers */}
      {layers.map((layer) => {
        const layerSkills = skills.filter((s) => s.layer === layer);
        if (layerSkills.length === 0) return null;
        const config = layerConfig[layer];

        return (
          <motion.div key={layer} variants={item}>
            <div className="flex items-center gap-2 mb-3">
              <div className={`w-3 h-3 rounded-full ${config.bg} border-2 border-current ${config.color}`} />
              <h2 className="text-lg font-bold text-foreground">
                {t(config.zh, config.en)}
              </h2>
              <span className="text-xs text-muted-foreground">
                Layer {layers.indexOf(layer) + 1}
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-3">
              {layerSkills.map((skill) => (
                <Card key={skill.id} className="card-hover border-0 shadow-sm">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      {/* Progress circle */}
                      <div className="relative w-12 h-12 shrink-0">
                        <svg className="w-12 h-12 -rotate-90" viewBox="0 0 48 48">
                          <circle cx="24" cy="24" r="20" fill="none" stroke="currentColor" strokeWidth="3" className="text-muted/30" />
                          <circle
                            cx="24" cy="24" r="20" fill="none" stroke="currentColor" strokeWidth="3"
                            className={config.color}
                            strokeDasharray={`${(skill.progress / 100) * 125.6} 125.6`}
                            strokeLinecap="round"
                          />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-[10px] font-bold font-mono">{skill.progress}%</span>
                        </div>
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-sm font-bold text-foreground truncate">
                            {t(skill.titleZh, skill.titleEn)}
                          </h3>
                          <Badge variant="outline" className="text-[9px] shrink-0">
                            Lv.{skill.level}/{skill.maxLevel}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground line-clamp-2 mb-2">
                          {t(skill.descriptionZh, skill.descriptionEn)}
                        </p>
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary" className="text-[9px]">
                            {t(trackLabels[skill.track]?.zh || skill.track, trackLabels[skill.track]?.en || skill.track)}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
