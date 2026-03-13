/*
 * NewsletterDetail — Single newsletter issue with all blocks
 * Design: Editorial reading experience with section cards
 */
import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link, useParams } from "wouter";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, Share2, Bookmark, Clock, TrendingUp, Lightbulb, Wrench, Trophy, Medal, Eye } from "lucide-react";
import { newsletterIssues } from "@/lib/data";

const blockIcons: Record<string, React.ReactNode> = {
  "ai-minute": <Clock size={18} />,
  "company-progress": <TrendingUp size={18} />,
  "weekly-case": <Eye size={18} />,
  "skill-unlock": <Lightbulb size={18} />,
  "tool-recommendation": <Wrench size={18} />,
  "challenge": <Trophy size={18} />,
  "leaderboard": <Medal size={18} />,
  "trend": <TrendingUp size={18} />,
};

const blockColors: Record<string, string> = {
  "ai-minute": "bg-teal/10 text-teal",
  "company-progress": "bg-ocean-light/10 text-ocean-light",
  "weekly-case": "bg-coral/10 text-coral",
  "skill-unlock": "bg-warning/10 text-warning",
  "tool-recommendation": "bg-success/10 text-success",
  "challenge": "bg-coral/10 text-coral",
  "leaderboard": "bg-ocean-light/10 text-ocean-light",
  "trend": "bg-teal/10 text-teal",
};

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.06 } } };
const item = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } };

export default function NewsletterDetail() {
  const { t } = useLanguage();
  const params = useParams<{ id: string }>();
  const issue = newsletterIssues.find((nl) => nl.id === params.id);

  if (!issue) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <p className="text-muted-foreground">{t("未找到该期周刊", "Newsletter issue not found")}</p>
        <Link href="/newsletter">
          <Button variant="outline" className="mt-4">
            <ArrowLeft size={16} className="mr-2" /> {t("返回周刊列表", "Back to Newsletter")}
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6 max-w-4xl mx-auto">
      {/* Back nav */}
      <motion.div variants={item}>
        <Link href="/newsletter">
          <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground -ml-2">
            <ArrowLeft size={16} className="mr-1" /> {t("返回周刊列表", "Back to Newsletter")}
          </Button>
        </Link>
      </motion.div>

      {/* Cover */}
      {issue.coverImage && (
        <motion.div variants={item} className="rounded-2xl overflow-hidden">
          <img src={issue.coverImage} alt="" className="w-full h-48 lg:h-64 object-cover" />
        </motion.div>
      )}

      {/* Title area */}
      <motion.div variants={item}>
        <div className="flex items-center gap-2 mb-3">
          <Badge variant="outline" className="font-mono">#{issue.issue}</Badge>
          <span className="text-sm text-muted-foreground flex items-center gap-1">
            <Calendar size={14} /> {issue.date}
          </span>
        </div>
        <h1 className="text-2xl lg:text-3xl font-extrabold text-foreground mb-2">
          {t(issue.titleZh, issue.titleEn)}
        </h1>
        <p className="text-base text-muted-foreground">
          {t(issue.summaryZh, issue.summaryEn)}
        </p>
        <div className="flex items-center gap-2 mt-4">
          <Button variant="outline" size="sm"><Share2 size={14} className="mr-1" /> {t("分享", "Share")}</Button>
          <Button variant="outline" size="sm"><Bookmark size={14} className="mr-1" /> {t("收藏", "Save")}</Button>
        </div>
      </motion.div>

      {/* Content blocks */}
      <div className="space-y-4">
        {issue.blocks.map((block, i) => (
          <motion.div key={i} variants={item}>
            <Card className="border-0 shadow-sm overflow-hidden">
              <CardContent className="p-5 lg:p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className={`p-2 rounded-lg ${blockColors[block.type] || "bg-muted text-muted-foreground"}`}>
                    {blockIcons[block.type] || <Eye size={18} />}
                  </div>
                  <h2 className="text-lg font-bold text-foreground">
                    {t(block.titleZh, block.titleEn)}
                  </h2>
                </div>
                <p className="text-sm text-foreground/80 leading-relaxed whitespace-pre-line">
                  {t(block.contentZh, block.contentEn)}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
