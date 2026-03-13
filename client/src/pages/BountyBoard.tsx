/*
 * BountyBoard — Real-business problem solving board with rewards
 * Design: Card grid with difficulty indicators and reward types
 */
import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Target, Clock, User, Zap, DollarSign, Award, Star } from "lucide-react";
import { bountyTasks, type BountyTask } from "@/lib/data";
import { toast } from "sonner";

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.08 } } };
const item = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } };

const statusConfig: Record<BountyTask["status"], { zh: string; en: string; color: string }> = {
  open: { zh: "待认领", en: "Open", color: "bg-success/10 text-success" },
  claimed: { zh: "已认领", en: "Claimed", color: "bg-warning/10 text-warning" },
  review: { zh: "评审中", en: "Review", color: "bg-ocean-light/10 text-ocean-light" },
  completed: { zh: "已完成", en: "Completed", color: "bg-muted text-muted-foreground" },
};

const difficultyConfig: Record<BountyTask["difficulty"], { zh: string; en: string; color: string; stars: number }> = {
  easy: { zh: "简单", en: "Easy", color: "text-success", stars: 1 },
  medium: { zh: "中等", en: "Medium", color: "text-warning", stars: 2 },
  hard: { zh: "困难", en: "Hard", color: "text-destructive", stars: 3 },
};

export default function BountyBoard() {
  const { t } = useLanguage();

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6 max-w-[1400px] mx-auto">
      {/* Header */}
      <motion.div variants={item}>
        <div className="flex items-center gap-3 mb-1">
          <div className="p-2 rounded-xl bg-coral/10">
            <Target size={24} className="text-coral" />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-foreground">{t("悬赏榜", "Bounty Board")}</h1>
            <p className="text-sm text-muted-foreground">
              {t("真实业务问题，等你来解决", "Real business problems waiting to be solved")}
            </p>
          </div>
        </div>
      </motion.div>

      {/* Stats row */}
      <motion.div variants={item} className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { zh: "待认领", en: "Open", value: bountyTasks.filter(b => b.status === "open").length, icon: <Zap size={16} />, color: "text-success" },
          { zh: "已认领", en: "Claimed", value: bountyTasks.filter(b => b.status === "claimed").length, icon: <User size={16} />, color: "text-warning" },
          { zh: "评审中", en: "In Review", value: bountyTasks.filter(b => b.status === "review").length, icon: <Clock size={16} />, color: "text-ocean-light" },
          { zh: "已完成", en: "Completed", value: bountyTasks.filter(b => b.status === "completed").length, icon: <Award size={16} />, color: "text-muted-foreground" },
        ].map((stat, i) => (
          <Card key={i} className="border-0 shadow-sm">
            <CardContent className="p-4 flex items-center gap-3">
              <span className={stat.color}>{stat.icon}</span>
              <div>
                <div className="text-xl font-extrabold font-mono">{stat.value}</div>
                <div className="text-xs text-muted-foreground">{t(stat.zh, stat.en)}</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </motion.div>

      {/* Bounty Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {bountyTasks.map((bounty) => (
          <motion.div key={bounty.id} variants={item}>
            <Card className="card-hover border-0 shadow-sm">
              <CardContent className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className={`status-pill ${statusConfig[bounty.status].color}`}>
                      {t(statusConfig[bounty.status].zh, statusConfig[bounty.status].en)}
                    </span>
                    <div className="flex items-center gap-0.5">
                      {Array.from({ length: difficultyConfig[bounty.difficulty].stars }).map((_, i) => (
                        <Star key={i} size={10} className={`fill-current ${difficultyConfig[bounty.difficulty].color}`} />
                      ))}
                    </div>
                    <span className={`text-[10px] font-medium ${difficultyConfig[bounty.difficulty].color}`}>
                      {t(difficultyConfig[bounty.difficulty].zh, difficultyConfig[bounty.difficulty].en)}
                    </span>
                  </div>
                </div>

                <h3 className="text-lg font-bold text-foreground mb-2">
                  {t(bounty.titleZh, bounty.titleEn)}
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                  {t(bounty.descriptionZh, bounty.descriptionEn)}
                </p>

                <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
                  <span className="flex items-center gap-1"><Clock size={12} /> {bounty.deadline}</span>
                  {bounty.claimedBy && (
                    <span className="flex items-center gap-1"><User size={12} /> {bounty.claimedBy}</span>
                  )}
                </div>

                <div className="p-3 rounded-xl bg-coral/5 border border-coral/10 mb-3">
                  <div className="flex items-center gap-1 text-xs font-semibold text-coral mb-0.5">
                    <DollarSign size={12} /> {t("奖励", "Reward")}
                  </div>
                  <p className="text-xs text-foreground/80">{t(bounty.rewardZh, bounty.rewardEn)}</p>
                </div>

                {bounty.status === "open" && (
                  <Button
                    className="w-full bg-primary hover:bg-primary/90"
                    onClick={() => toast.success(t("功能即将上线", "Feature coming soon"))}
                  >
                    {t("认领任务", "Claim Task")}
                  </Button>
                )}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
