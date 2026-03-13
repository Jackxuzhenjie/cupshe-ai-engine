/*
 * ChallengeDetail — Single challenge with submission form
 */
import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Link, useParams } from "wouter";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, Users, FileText, Star, Upload, Trophy } from "lucide-react";
import { challenges } from "@/lib/data";
import { toast } from "sonner";

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.06 } } };
const item = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } };

export default function ChallengeDetail() {
  const { t } = useLanguage();
  const params = useParams<{ id: string }>();
  const challenge = challenges.find((c) => c.id === params.id);

  if (!challenge) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <p className="text-muted-foreground">{t("未找到该挑战", "Challenge not found")}</p>
        <Link href="/challenges">
          <Button variant="outline" className="mt-4">
            <ArrowLeft size={16} className="mr-2" /> {t("返回挑战列表", "Back to Challenges")}
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6 max-w-4xl mx-auto">
      <motion.div variants={item}>
        <Link href="/challenges">
          <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground -ml-2">
            <ArrowLeft size={16} className="mr-1" /> {t("返回挑战列表", "Back to Challenges")}
          </Button>
        </Link>
      </motion.div>

      <motion.div variants={item}>
        <div className="flex items-center gap-2 mb-3">
          <Badge variant="outline">{challenge.type === "weekly" ? t("周赛", "Weekly") : t("月赛", "Monthly")}</Badge>
          <Badge className="bg-success/10 text-success border-0">{challenge.status}</Badge>
        </div>
        <h1 className="text-2xl lg:text-3xl font-extrabold text-foreground mb-2">
          {t(challenge.titleZh, challenge.titleEn)}
        </h1>
        <p className="text-base text-muted-foreground">{t(challenge.descriptionZh, challenge.descriptionEn)}</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <motion.div variants={item} className="lg:col-span-2 space-y-4">
          <Card className="border-0 shadow-sm">
            <CardHeader><CardTitle className="text-base">{t("挑战详情", "Challenge Details")}</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 rounded-xl bg-muted/50">
                  <div className="text-xs text-muted-foreground mb-1">{t("截止日期", "Deadline")}</div>
                  <div className="text-sm font-semibold flex items-center gap-1"><Calendar size={14} /> {challenge.deadline}</div>
                </div>
                <div className="p-3 rounded-xl bg-muted/50">
                  <div className="text-xs text-muted-foreground mb-1">{t("参与人数", "Participants")}</div>
                  <div className="text-sm font-semibold flex items-center gap-1"><Users size={14} /> {challenge.participants}</div>
                </div>
                <div className="p-3 rounded-xl bg-muted/50">
                  <div className="text-xs text-muted-foreground mb-1">{t("提交数量", "Submissions")}</div>
                  <div className="text-sm font-semibold flex items-center gap-1"><FileText size={14} /> {challenge.submissions}</div>
                </div>
                <div className="p-3 rounded-xl bg-muted/50">
                  <div className="text-xs text-muted-foreground mb-1">{t("发起部门", "Owner")}</div>
                  <div className="text-sm font-semibold">{challenge.owner}</div>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                  <span>{t("提交进度", "Progress")}</span>
                  <span>{challenge.submissions}/{challenge.participants}</span>
                </div>
                <Progress value={(challenge.submissions / challenge.participants) * 100} className="h-2" />
              </div>
            </CardContent>
          </Card>

          {/* Submit area */}
          <Card className="border-0 shadow-sm">
            <CardHeader><CardTitle className="text-base">{t("提交方案", "Submit Solution")}</CardTitle></CardHeader>
            <CardContent>
              <div className="border-2 border-dashed border-border rounded-xl p-8 text-center">
                <Upload size={32} className="mx-auto text-muted-foreground mb-3" />
                <p className="text-sm text-muted-foreground mb-3">
                  {t("拖拽文件到此处，或点击上传", "Drag files here, or click to upload")}
                </p>
                <Button
                  variant="outline"
                  onClick={() => toast.success(t("功能即将上线", "Feature coming soon"))}
                >
                  {t("选择文件", "Choose Files")}
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={item}>
          <Card className="border-0 shadow-sm">
            <CardHeader><CardTitle className="text-base flex items-center gap-2"><Star size={16} className="text-coral" /> {t("奖励", "Rewards")}</CardTitle></CardHeader>
            <CardContent>
              <p className="text-sm text-foreground">{t(challenge.rewardZh, challenge.rewardEn)}</p>
              <div className="mt-4 p-3 rounded-xl bg-coral/5 border border-coral/10">
                <div className="flex items-center gap-2 text-sm font-semibold text-coral mb-1">
                  <Trophy size={14} /> {t("挑战流程", "Challenge Flow")}
                </div>
                <div className="text-xs text-muted-foreground space-y-1">
                  <p>1. {t("报名参与", "Register")}</p>
                  <p>2. {t("提交方案", "Submit Solution")}</p>
                  <p>3. {t("专家评审", "Expert Review")}</p>
                  <p>4. {t("公布获奖", "Announce Winners")}</p>
                  <p>5. {t("案例发布", "Publish as Case")}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
}
