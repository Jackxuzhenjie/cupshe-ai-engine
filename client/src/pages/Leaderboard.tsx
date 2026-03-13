/*
 * Leaderboard — Individual and department rankings with gamification
 * Design: Table-style rankings with badges and level indicators
 */
import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";
import { Medal, Trophy, Award, Crown, Star, Users, Zap } from "lucide-react";
import { individualLeaderboard, departmentLeaderboard, badges as badgeList } from "@/lib/data";

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.06 } } };
const item = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } };

const rankIcons = [
  <Crown size={18} className="text-yellow-500" />,
  <Medal size={18} className="text-gray-400" />,
  <Medal size={18} className="text-amber-600" />,
];

const levelColors: Record<string, string> = {
  "AI Explorer": "bg-muted text-muted-foreground",
  "AI Practitioner": "bg-teal/10 text-teal",
  "AI Builder": "bg-ocean-light/10 text-ocean-light",
  "AI Architect": "bg-coral/10 text-coral",
};

export default function Leaderboard() {
  const { t } = useLanguage();

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6 max-w-[1400px] mx-auto">
      {/* Header */}
      <motion.div variants={item}>
        <h1 className="text-2xl font-extrabold text-foreground">{t("排行榜", "Leaderboard")}</h1>
        <p className="text-sm text-muted-foreground mt-1">
          {t("AI转型积分排名与荣誉展示", "AI transformation points ranking and honors")}
        </p>
      </motion.div>

      {/* Badges showcase */}
      <motion.div variants={item}>
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Award size={16} className="text-coral" /> {t("徽章体系", "Badge System")}
            </CardTitle>
          </CardHeader>
          <CardContent className="pb-4">
            <div className="grid grid-cols-3 lg:grid-cols-6 gap-3">
              {badgeList.map((badge) => (
                <div key={badge.id} className="text-center p-3 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors">
                  <div className="text-2xl mb-1">{badge.icon}</div>
                  <div className="text-xs font-semibold text-foreground">{badge.nameZh}</div>
                  <div className="text-[10px] text-muted-foreground mt-0.5 line-clamp-1">{badge.requirement}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Tabs for Individual / Department */}
      <motion.div variants={item}>
        <Tabs defaultValue="individual">
          <TabsList className="bg-muted/50">
            <TabsTrigger value="individual" className="text-sm">
              <Users size={14} className="mr-1" /> {t("个人排行", "Individual")}
            </TabsTrigger>
            <TabsTrigger value="department" className="text-sm">
              <Zap size={14} className="mr-1" /> {t("部门排行", "Department")}
            </TabsTrigger>
          </TabsList>

          {/* Individual Leaderboard */}
          <TabsContent value="individual" className="mt-4">
            <Card className="border-0 shadow-sm">
              <CardContent className="p-0">
                {/* Top 3 podium */}
                <div className="grid grid-cols-3 gap-3 p-5 pb-4 border-b border-border/50">
                  {individualLeaderboard.slice(0, 3).map((entry, i) => (
                    <div key={entry.rank} className={`text-center p-4 rounded-xl ${i === 0 ? "bg-yellow-50 border border-yellow-200" : "bg-muted/30"}`}>
                      <div className="mb-2">{rankIcons[i]}</div>
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-2 text-sm font-bold text-primary">
                        {entry.name[0]}
                      </div>
                      <div className="text-sm font-bold text-foreground">{entry.name}</div>
                      <div className="text-xs text-muted-foreground mb-1">{entry.department}</div>
                      <div className="text-lg font-extrabold font-mono text-primary">{entry.points.toLocaleString()}</div>
                      <Badge className={`${levelColors[entry.level] || "bg-muted"} border-0 text-[10px] mt-1`}>
                        {entry.level}
                      </Badge>
                    </div>
                  ))}
                </div>

                {/* Rest of the list */}
                <div className="divide-y divide-border/50">
                  {individualLeaderboard.slice(3).map((entry) => (
                    <div key={entry.rank} className="flex items-center gap-4 px-5 py-3 hover:bg-muted/20 transition-colors">
                      <span className="w-6 text-center text-sm font-bold text-muted-foreground font-mono">
                        {entry.rank}
                      </span>
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary shrink-0">
                        {entry.name[0]}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-semibold text-foreground">{entry.name}</div>
                        <div className="text-xs text-muted-foreground">{entry.department}</div>
                      </div>
                      <Badge className={`${levelColors[entry.level] || "bg-muted"} border-0 text-[10px] hidden sm:inline-flex`}>
                        {entry.level}
                      </Badge>
                      <div className="text-right shrink-0">
                        <div className="text-sm font-bold font-mono text-foreground">{entry.points.toLocaleString()}</div>
                        <div className="text-[10px] text-muted-foreground">{entry.badges} {t("徽章", "badges")} · {entry.cases} {t("案例", "cases")}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Department Leaderboard */}
          <TabsContent value="department" className="mt-4">
            <Card className="border-0 shadow-sm">
              <CardContent className="p-0 divide-y divide-border/50">
                {departmentLeaderboard.map((dept) => (
                  <div key={dept.rank} className="px-5 py-4 hover:bg-muted/20 transition-colors">
                    <div className="flex items-center gap-4 mb-2">
                      <span className="w-6 text-center text-sm font-bold text-muted-foreground font-mono">
                        {dept.rank}
                      </span>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-bold text-foreground">
                          {t(dept.departmentZh, dept.departmentEn)}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {dept.members} {t("人", "members")} · {dept.cases} {t("案例", "cases")}
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <div className="text-sm font-bold font-mono text-foreground">{dept.totalPoints.toLocaleString()}</div>
                        <div className="text-[10px] text-muted-foreground">{t("人均", "Avg")} {dept.avgPoints}</div>
                      </div>
                    </div>
                    <div className="ml-10">
                      <div className="flex items-center justify-between text-[10px] text-muted-foreground mb-1">
                        <span>{t("AI渗透率", "AI Penetration")}</span>
                        <span>{dept.penetration}%</span>
                      </div>
                      <Progress value={dept.penetration} className="h-1.5" />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>
    </motion.div>
  );
}
