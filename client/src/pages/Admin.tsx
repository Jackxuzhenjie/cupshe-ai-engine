/*
 * Admin — Governance, tools directory, user management, scoring rules
 * Design: Tabbed admin panel with data tables
 */
import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Settings, Shield, Wrench, Users, Award, FileText, Plus, ExternalLink } from "lucide-react";
import { toolsDirectory, departments, badges } from "@/lib/data";
import { toast } from "sonner";

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.06 } } };
const item = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } };

const roles = [
  { id: "employee", zh: "普通员工", en: "Employee", permissions: "查看、投票、提交" },
  { id: "ai_rep", zh: "AI科代表", en: "AI Representative", permissions: "查看、投票、提交、审核、子项目管理" },
  { id: "ai_bp", zh: "AI BP", en: "AI BP", permissions: "查看、投票、提交、审核、技术支持" },
  { id: "hrbp", zh: "HRBP", en: "HRBP", permissions: "查看、投票、提交、运营推动" },
  { id: "leader", zh: "中心负责人", en: "Center Leader", permissions: "查看、投票、提交、审核、管理本部门" },
  { id: "pmo", zh: "PMO", en: "PMO", permissions: "全部权限（除系统设置）" },
  { id: "admin", zh: "管理员", en: "Admin", permissions: "全部权限" },
  { id: "executive", zh: "高管", en: "Executive", permissions: "查看、指挥塔、全局数据" },
];

const scoringRules = [
  { action: "提交AI案例", actionEn: "Submit AI Case", points: 100 },
  { action: "参与挑战赛", actionEn: "Join Challenge", points: 50 },
  { action: "解决许愿", actionEn: "Solve Wish", points: 80 },
  { action: "解锁技能", actionEn: "Unlock Skill", points: 30 },
  { action: "分享Prompt", actionEn: "Share Prompt", points: 20 },
  { action: "发布最佳实践", actionEn: "Publish Best Practice", points: 120 },
  { action: "完成悬赏任务", actionEn: "Complete Bounty", points: 150 },
  { action: "赢得挑战赛", actionEn: "Win Challenge", points: 200 },
];

export default function Admin() {
  const { t } = useLanguage();

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6 max-w-[1400px] mx-auto">
      {/* Header */}
      <motion.div variants={item}>
        <div className="flex items-center gap-3 mb-1">
          <div className="p-2 rounded-xl bg-primary/10">
            <Settings size={24} className="text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-foreground">{t("管理后台", "Admin Panel")}</h1>
            <p className="text-sm text-muted-foreground">
              {t("系统管理、权限控制、积分规则与工具目录", "System management, access control, scoring rules & tools directory")}
            </p>
          </div>
        </div>
      </motion.div>

      <motion.div variants={item}>
        <Tabs defaultValue="tools">
          <TabsList className="bg-muted/50 flex-wrap h-auto gap-1">
            <TabsTrigger value="tools" className="text-xs"><Wrench size={12} className="mr-1" /> {t("工具目录", "Tools")}</TabsTrigger>
            <TabsTrigger value="roles" className="text-xs"><Shield size={12} className="mr-1" /> {t("权限管理", "Roles")}</TabsTrigger>
            <TabsTrigger value="scoring" className="text-xs"><Award size={12} className="mr-1" /> {t("积分规则", "Scoring")}</TabsTrigger>
            <TabsTrigger value="departments" className="text-xs"><Users size={12} className="mr-1" /> {t("部门管理", "Departments")}</TabsTrigger>
            <TabsTrigger value="governance" className="text-xs"><FileText size={12} className="mr-1" /> {t("治理公告", "Governance")}</TabsTrigger>
          </TabsList>

          {/* Tools Directory */}
          <TabsContent value="tools" className="mt-4">
            <Card className="border-0 shadow-sm">
              <CardHeader className="pb-2 flex flex-row items-center justify-between">
                <CardTitle className="text-base">{t("企业AI工具目录", "Enterprise AI Tools Directory")}</CardTitle>
                <Button size="sm" variant="outline" onClick={() => toast.success(t("功能即将上线", "Feature coming soon"))}>
                  <Plus size={14} className="mr-1" /> {t("添加工具", "Add Tool")}
                </Button>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border/50">
                        <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground">{t("工具名称", "Tool Name")}</th>
                        <th className="text-left px-3 py-3 text-xs font-semibold text-muted-foreground">{t("分类", "Category")}</th>
                        <th className="text-left px-3 py-3 text-xs font-semibold text-muted-foreground">{t("状态", "Status")}</th>
                        <th className="text-left px-3 py-3 text-xs font-semibold text-muted-foreground hidden lg:table-cell">{t("描述", "Description")}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border/30">
                      {toolsDirectory.map((tool) => (
                        <tr key={tool.id} className="hover:bg-muted/20 transition-colors">
                          <td className="px-5 py-3 font-semibold">{tool.name}</td>
                          <td className="px-3 py-3">
                            <Badge variant="secondary" className="text-[10px]">
                              {t(tool.category, tool.categoryEn)}
                            </Badge>
                          </td>
                          <td className="px-3 py-3">
                            <Badge className={`border-0 text-[10px] ${
                              tool.statusEn === "Approved" ? "bg-success/10 text-success" : "bg-warning/10 text-warning"
                            }`}>
                              {t(tool.statusZh, tool.statusEn)}
                            </Badge>
                          </td>
                          <td className="px-3 py-3 text-xs text-muted-foreground hidden lg:table-cell max-w-xs truncate">
                            {t(tool.descZh, tool.descEn)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Roles */}
          <TabsContent value="roles" className="mt-4">
            <Card className="border-0 shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">{t("角色权限管理", "Role-Based Access Control")}</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border/50">
                        <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground">{t("角色", "Role")}</th>
                        <th className="text-left px-3 py-3 text-xs font-semibold text-muted-foreground">{t("权限", "Permissions")}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border/30">
                      {roles.map((role) => (
                        <tr key={role.id} className="hover:bg-muted/20 transition-colors">
                          <td className="px-5 py-3 font-semibold">{t(role.zh, role.en)}</td>
                          <td className="px-3 py-3 text-xs text-muted-foreground">{role.permissions}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Scoring Rules */}
          <TabsContent value="scoring" className="mt-4">
            <Card className="border-0 shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">{t("积分规则", "Scoring Rules")}</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border/50">
                        <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground">{t("行为", "Action")}</th>
                        <th className="text-right px-5 py-3 text-xs font-semibold text-muted-foreground">{t("积分", "Points")}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border/30">
                      {scoringRules.map((rule) => (
                        <tr key={rule.action} className="hover:bg-muted/20 transition-colors">
                          <td className="px-5 py-3">{t(rule.action, rule.actionEn)}</td>
                          <td className="px-5 py-3 text-right font-bold font-mono text-primary">+{rule.points}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            {/* Level system */}
            <Card className="border-0 shadow-sm mt-4">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">{t("等级体系", "Level System")}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                  {[
                    { name: "AI Explorer", range: "0-499", icon: "🔍", color: "bg-muted" },
                    { name: "AI Practitioner", range: "500-1499", icon: "⚡", color: "bg-teal/10" },
                    { name: "AI Builder", range: "1500-2999", icon: "🏗️", color: "bg-ocean-light/10" },
                    { name: "AI Architect", range: "3000+", icon: "🎯", color: "bg-coral/10" },
                  ].map((level) => (
                    <div key={level.name} className={`p-4 rounded-xl ${level.color} text-center`}>
                      <div className="text-2xl mb-1">{level.icon}</div>
                      <div className="text-sm font-bold text-foreground">{level.name}</div>
                      <div className="text-xs text-muted-foreground mt-0.5">{level.range} {t("积分", "pts")}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Departments */}
          <TabsContent value="departments" className="mt-4">
            <Card className="border-0 shadow-sm">
              <CardHeader className="pb-2 flex flex-row items-center justify-between">
                <CardTitle className="text-base">{t("部门管理", "Department Management")}</CardTitle>
                <Button size="sm" variant="outline" onClick={() => toast.success(t("功能即将上线", "Feature coming soon"))}>
                  <Plus size={14} className="mr-1" /> {t("添加部门", "Add Department")}
                </Button>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                  {departments.map((dept) => (
                    <div key={dept.id} className="p-4 rounded-xl border border-border/50 hover:border-primary/20 transition-colors">
                      <div className="text-sm font-bold text-foreground">{t(dept.zh, dept.en)}</div>
                      <div className="text-xs text-muted-foreground mt-0.5">ID: {dept.id}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Governance */}
          <TabsContent value="governance" className="mt-4">
            <Card className="border-0 shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">{t("治理公告", "Governance Notices")}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 rounded-xl border border-border/50">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge className="bg-primary/10 text-primary border-0 text-[10px]">{t("最新", "Latest")}</Badge>
                    <span className="text-xs text-muted-foreground">2026-03-10</span>
                  </div>
                  <h3 className="text-sm font-bold text-foreground mb-1">
                    {t("关于规范使用AI工具的通知", "Notice on Standardized Use of AI Tools")}
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    {t(
                      "为确保数据安全和合规使用，所有AI工具使用需遵循公司数据安全政策。禁止将客户个人信息、财务数据等敏感信息输入未经批准的AI工具。",
                      "To ensure data security and compliant usage, all AI tool usage must follow company data security policies. It is prohibited to input sensitive information such as customer personal data and financial data into unapproved AI tools."
                    )}
                  </p>
                </div>
                <div className="p-4 rounded-xl border border-border/50">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs text-muted-foreground">2026-02-25</span>
                  </div>
                  <h3 className="text-sm font-bold text-foreground mb-1">
                    {t("AI转型激励政策更新", "AI Transformation Incentive Policy Update")}
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    {t(
                      "自3月起，AI案例提交积分从80分提升至100分，鼓励更多团队分享AI实践经验。季度积分TOP10将获得额外奖励。",
                      "Starting March, AI case submission points increased from 80 to 100, encouraging more teams to share AI practice experiences. Quarterly top 10 scorers will receive additional rewards."
                    )}
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>

      {/* Copyright */}
      <motion.div variants={item} className="text-center py-4 text-xs text-muted-foreground">
        <p>&copy; 2026 CUPSHE AI Transformation Engine. {t("版权所有", "All rights reserved")}.</p>
        <p className="mt-0.5">{t("仅供内部使用 · 数据安全等级：内部机密", "Internal use only · Data classification: Confidential")}</p>
      </motion.div>
    </motion.div>
  );
}
