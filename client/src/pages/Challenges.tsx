/*
 * Challenges — AI challenge cards with lifecycle status
 * Design: Card grid with banner image, status badges, progress
 */
import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { Calendar, Users, FileText, ArrowUpRight, Trophy, Clock, Star } from "lucide-react";
import { challenges, type Challenge } from "@/lib/data";

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.08 } } };
const item = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } };

const statusConfig: Record<Challenge["status"], { zh: string; en: string; color: string }> = {
  draft: { zh: "草稿", en: "Draft", color: "bg-muted text-muted-foreground" },
  open: { zh: "进行中", en: "Open", color: "bg-success/10 text-success" },
  review: { zh: "评审中", en: "Review", color: "bg-warning/10 text-warning" },
  winner: { zh: "已评选", en: "Winner", color: "bg-coral/10 text-coral" },
  published: { zh: "已发布", en: "Published", color: "bg-ocean-light/10 text-ocean-light" },
};

export default function Challenges() {
  const { t } = useLanguage();

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6 max-w-[1400px] mx-auto">
      {/* Hero */}
      <motion.div variants={item} className="relative rounded-2xl overflow-hidden h-[160px] lg:h-[200px]">
        <img
          src="https://d2xsxph8kpxj0f.cloudfront.net/310519663405149767/QM6nYWAxuWeZFy253dxUZB/challenge-banner-BJvoKBL8LnAEDzXfa3aN6Z.webp"
          alt="Challenges"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1e3a5f]/85 via-[#1e3a5f]/50 to-transparent" />
        <div className="absolute inset-0 flex flex-col justify-center px-6 lg:px-10">
          <h1 className="text-2xl lg:text-3xl font-extrabold text-white mb-1">
            {t("AI 挑战赛", "AI Challenges")}
          </h1>
          <p className="text-white/80 text-sm max-w-md">
            {t("参与挑战，展示你的AI技能，赢取积分和徽章", "Join challenges, showcase your AI skills, earn points and badges")}
          </p>
        </div>
      </motion.div>

      {/* Challenge Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {challenges.map((c) => (
          <motion.div key={c.id} variants={item}>
            <Link href={`/challenges/${c.id}`}>
              <Card className="card-hover border-0 shadow-sm cursor-pointer group">
                <CardContent className="p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className={`status-pill ${statusConfig[c.status].color}`}>
                        {t(statusConfig[c.status].zh, statusConfig[c.status].en)}
                      </span>
                      <Badge variant="outline" className="text-[10px]">
                        {c.type === "weekly" ? t("周赛", "Weekly") : t("月赛", "Monthly")}
                      </Badge>
                    </div>
                    <ArrowUpRight size={16} className="text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>

                  <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {t(c.titleZh, c.titleEn)}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                    {t(c.descriptionZh, c.descriptionEn)}
                  </p>

                  <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                    <span className="flex items-center gap-1"><Calendar size={12} /> {c.deadline}</span>
                    <span className="flex items-center gap-1"><Users size={12} /> {c.participants} {t("人参与", "joined")}</span>
                    <span className="flex items-center gap-1"><FileText size={12} /> {c.submissions} {t("份提交", "submissions")}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-xs text-coral font-medium">
                      <Star size={12} /> {t(c.rewardZh, c.rewardEn)}
                    </div>
                  </div>

                  {c.status === "open" && (
                    <div className="mt-3">
                      <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                        <span>{t("提交进度", "Submission Progress")}</span>
                        <span>{c.submissions}/{c.participants}</span>
                      </div>
                      <Progress value={(c.submissions / c.participants) * 100} className="h-1.5" />
                    </div>
                  )}
                </CardContent>
              </Card>
            </Link>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
