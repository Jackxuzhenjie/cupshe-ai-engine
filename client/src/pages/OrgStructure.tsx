/*
 * OrgStructure — Organization tree, Feishu sync, people selector
 */
import { useState, useMemo } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import {
  Building2, Users, RefreshCw, Plus, Edit3, Trash2, ChevronRight, ChevronDown,
  Check, Search, UserPlus, Shield, ShieldCheck, User as UserIcon, X
} from "lucide-react";

// Seed departments for initial display when DB is empty
const SEED_DEPARTMENTS = [
  { id: 1, name: "营销中心", nameEn: "Marketing Center", parentId: null, memberCount: 45, aiPenetration: 72, sortOrder: 1 },
  { id: 2, name: "运营中心", nameEn: "Operations Center", parentId: null, memberCount: 28, aiPenetration: 55, sortOrder: 2 },
  { id: 3, name: "产品中心", nameEn: "Product Center", parentId: null, memberCount: 38, aiPenetration: 63, sortOrder: 3 },
  { id: 4, name: "创意中心", nameEn: "Creative Center", parentId: null, memberCount: 32, aiPenetration: 81, sortOrder: 4 },
  { id: 5, name: "互联网研发中心", nameEn: "Internet R&D Center", parentId: null, memberCount: 20, aiPenetration: 95, sortOrder: 5 },
  { id: 6, name: "生产供应链中心", nameEn: "Production & Supply Chain Center", parentId: null, memberCount: 22, aiPenetration: 42, sortOrder: 6 },
  { id: 7, name: "仓储物流中心", nameEn: "Warehouse & Logistics Center", parentId: null, memberCount: 18, aiPenetration: 38, sortOrder: 7 },
  { id: 8, name: "财务中心", nameEn: "Finance Center", parentId: null, memberCount: 15, aiPenetration: 52, sortOrder: 8 },
  { id: 9, name: "人力资源中心", nameEn: "HR Center", parentId: null, memberCount: 12, aiPenetration: 48, sortOrder: 9 },
  { id: 10, name: "多渠道事业部", nameEn: "Multi-Channel Business Unit", parentId: null, memberCount: 25, aiPenetration: 58, sortOrder: 10 },
  { id: 11, name: "渠道拓展部", nameEn: "Channel Development Dept", parentId: null, memberCount: 10, aiPenetration: 45, sortOrder: 11 },
  { id: 12, name: "总经办", nameEn: "General Manager Office", parentId: null, memberCount: 8, aiPenetration: 35, sortOrder: 12 },
  { id: 13, name: "审计监察部", nameEn: "Audit & Supervision Dept", parentId: null, memberCount: 6, aiPenetration: 30, sortOrder: 13 },
  { id: 14, name: "董秘办", nameEn: "Board Secretary Office", parentId: null, memberCount: 5, aiPenetration: 25, sortOrder: 14 },
];

// Seed users for display
const SEED_USERS = [
  { id: 1, name: "张明", email: "zhangming@cupshe.com", engineRole: "super_admin", departmentId: null, avatar: null },
  { id: 2, name: "李芳", email: "lifang@cupshe.com", engineRole: "dept_admin", departmentId: 1, avatar: null },
  { id: 3, name: "王强", email: "wangqiang@cupshe.com", engineRole: "dept_admin", departmentId: 2, avatar: null },
  { id: 4, name: "陈静", email: "chenjing@cupshe.com", engineRole: "employee", departmentId: 1, avatar: null },
  { id: 5, name: "刘洋", email: "liuyang@cupshe.com", engineRole: "employee", departmentId: 3, avatar: null },
  { id: 6, name: "赵雪", email: "zhaoxue@cupshe.com", engineRole: "employee", departmentId: 2, avatar: null },
  { id: 7, name: "孙磊", email: "sunlei@cupshe.com", engineRole: "dept_admin", departmentId: 5, avatar: null },
  { id: 8, name: "周婷", email: "zhouting@cupshe.com", engineRole: "employee", departmentId: 4, avatar: null },
];

export default function OrgStructure() {
  const { t, lang } = useLanguage();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<"tree" | "users" | "permissions">("tree");
  const [expandedDepts, setExpandedDepts] = useState<Set<number>>(new Set([1, 2, 3]));
  const [selectedUsers, setSelectedUsers] = useState<Set<number>>(new Set());
  const [searchQuery, setSearchQuery] = useState("");
  const [syncing, setSyncing] = useState(false);
  const [showAddDept, setShowAddDept] = useState(false);
  const [newDeptName, setNewDeptName] = useState("");
  const [newDeptNameEn, setNewDeptNameEn] = useState("");
  const [editingUser, setEditingUser] = useState<number | null>(null);
  const [editRole, setEditRole] = useState("");

  // Use seed data (in production, this would come from tRPC)
  const departments = SEED_DEPARTMENTS;
  const users_list = SEED_USERS;

  const filteredUsers = useMemo(() => {
    if (!searchQuery) return users_list;
    const q = searchQuery.toLowerCase();
    return users_list.filter(u =>
      u.name.toLowerCase().includes(q) ||
      u.email.toLowerCase().includes(q)
    );
  }, [searchQuery, users_list]);

  const handleSync = async () => {
    setSyncing(true);
    // Simulate Feishu sync
    await new Promise(resolve => setTimeout(resolve, 2000));
    setSyncing(false);
    toast.success(t("组织架构同步完成！同步了14个一级组织，304名员工", "Org sync completed! Synced 14 first-level orgs, 304 employees"));
  };

  const toggleDept = (id: number) => {
    setExpandedDepts(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleUser = (id: number) => {
    setSelectedUsers(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const selectAll = () => {
    if (selectedUsers.size === filteredUsers.length) {
      setSelectedUsers(new Set());
    } else {
      setSelectedUsers(new Set(filteredUsers.map(u => u.id)));
    }
  };

  const getRoleBadge = (role: string) => {
    switch (role) {
      case "super_admin":
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-red-100 text-red-700 text-xs font-medium">
            <ShieldCheck size={12} />
            {t("超级管理员", "Super Admin")}
          </span>
        );
      case "dept_admin":
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 text-xs font-medium">
            <Shield size={12} />
            {t("部门管理员", "Dept Admin")}
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-gray-100 text-gray-600 text-xs font-medium">
            <UserIcon size={12} />
            {t("员工", "Employee")}
          </span>
        );
    }
  };

  const getDeptName = (id: number | null) => {
    if (!id) return t("未分配", "Unassigned");
    const dept = departments.find(d => d.id === id);
    return dept ? (lang === "zh" ? dept.name : (dept.nameEn || dept.name)) : t("未知", "Unknown");
  };

  const tabs = [
    { key: "tree" as const, icon: <Building2 size={16} />, zh: "组织架构", en: "Org Tree" },
    { key: "users" as const, icon: <Users size={16} />, zh: "人员管理", en: "People" },
    { key: "permissions" as const, icon: <Shield size={16} />, zh: "权限管理", en: "Permissions" },
  ];

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">{t("组织架构管理", "Organization Management")}</h1>
          <p className="text-sm text-muted-foreground mt-1">
            {t("管理部门结构、人员分配和权限设置，支持飞书同步", "Manage departments, people, and permissions. Supports Feishu sync")}
          </p>
        </div>
        <button
          onClick={handleSync}
          disabled={syncing}
          className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-primary text-white hover:bg-primary/90 transition-colors disabled:opacity-50 text-sm font-medium"
        >
          <RefreshCw size={16} className={syncing ? "animate-spin" : ""} />
          {syncing ? t("同步中...", "Syncing...") : t("飞书同步", "Feishu Sync")}
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 p-1 bg-muted rounded-xl mb-6">
        {tabs.map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
              activeTab === tab.key
                ? "bg-card text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {tab.icon}
            {t(tab.zh, tab.en)}
          </button>
        ))}
      </div>

      {/* Tab: Org Tree */}
      {activeTab === "tree" && (
        <div className="space-y-4">
          {/* Stats bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { zh: "部门总数", en: "Departments", value: departments.length, color: "text-blue-600" },
              { zh: "总人数", en: "Total People", value: departments.reduce((s, d) => s + d.memberCount, 0), color: "text-green-600" },
              { zh: "平均AI渗透率", en: "Avg AI Penetration", value: Math.round(departments.reduce((s, d) => s + d.aiPenetration, 0) / departments.length) + "%", color: "text-purple-600" },
              { zh: "上次同步", en: "Last Sync", value: t("2小时前", "2h ago"), color: "text-amber-600" },
            ].map((stat, i) => (
              <div key={i} className="bg-card rounded-xl border border-border p-4">
                <p className="text-xs text-muted-foreground">{t(stat.zh, stat.en)}</p>
                <p className={`text-xl font-bold mt-1 ${stat.color}`}>{stat.value}</p>
              </div>
            ))}
          </div>

          {/* Department tree */}
          <div className="bg-card rounded-xl border border-border">
            <div className="flex items-center justify-between p-4 border-b border-border">
              <h3 className="font-semibold text-foreground">{t("部门列表", "Department List")}</h3>
              <button
                onClick={() => setShowAddDept(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
              >
                <Plus size={14} />
                {t("添加部门", "Add Dept")}
              </button>
            </div>
            <div className="divide-y divide-border">
              {departments.map(dept => {
                const deptUsers = users_list.filter(u => u.departmentId === dept.id);
                const isExpanded = expandedDepts.has(dept.id);
                return (
                  <div key={dept.id}>
                    <div
                      className="flex items-center gap-3 px-4 py-3 hover:bg-muted/30 transition-colors cursor-pointer"
                      onClick={() => toggleDept(dept.id)}
                    >
                      <button className="p-0.5">
                        {isExpanded ? <ChevronDown size={16} className="text-muted-foreground" /> : <ChevronRight size={16} className="text-muted-foreground" />}
                      </button>
                      <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                        <Building2 size={16} className="text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground">{lang === "zh" ? dept.name : (dept.nameEn || dept.name)}</p>
                        <p className="text-xs text-muted-foreground">{dept.memberCount} {t("人", "people")}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <p className="text-xs text-muted-foreground">{t("AI渗透率", "AI Penetration")}</p>
                          <p className="text-sm font-bold text-primary">{dept.aiPenetration}%</p>
                        </div>
                        <div className="w-16 h-2 rounded-full bg-muted overflow-hidden">
                          <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${dept.aiPenetration}%` }} />
                        </div>
                      </div>
                    </div>
                    {isExpanded && deptUsers.length > 0 && (
                      <div className="pl-14 pr-4 pb-2 space-y-1">
                        {deptUsers.map(u => (
                          <div key={u.id} className="flex items-center gap-3 px-3 py-2 rounded-lg bg-muted/30">
                            <div className="w-7 h-7 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold text-primary">
                              {u.name.charAt(0)}
                            </div>
                            <div className="flex-1">
                              <span className="text-sm text-foreground">{u.name}</span>
                              <span className="text-xs text-muted-foreground ml-2">{u.email}</span>
                            </div>
                            {getRoleBadge(u.engineRole)}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Add department modal */}
          {showAddDept && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={() => setShowAddDept(false)}>
              <div className="bg-card rounded-xl border border-border p-5 w-full max-w-md mx-4" onClick={e => e.stopPropagation()}>
                <h3 className="text-lg font-semibold mb-4">{t("添加部门", "Add Department")}</h3>
                <div className="space-y-3">
                  <div>
                    <label className="text-sm font-medium">{t("中文名称", "Chinese Name")}</label>
                    <input type="text" value={newDeptName} onChange={e => setNewDeptName(e.target.value)} className="w-full mt-1 px-3 py-2 rounded-lg border border-border bg-background" />
                  </div>
                  <div>
                    <label className="text-sm font-medium">{t("英文名称", "English Name")}</label>
                    <input type="text" value={newDeptNameEn} onChange={e => setNewDeptNameEn(e.target.value)} className="w-full mt-1 px-3 py-2 rounded-lg border border-border bg-background" />
                  </div>
                </div>
                <div className="flex justify-end gap-2 mt-4">
                  <button onClick={() => setShowAddDept(false)} className="px-4 py-2 rounded-lg text-sm text-muted-foreground hover:bg-muted">
                    {t("取消", "Cancel")}
                  </button>
                  <button
                    onClick={() => {
                      toast.success(t("部门已添加", "Department added"));
                      setShowAddDept(false);
                      setNewDeptName("");
                      setNewDeptNameEn("");
                    }}
                    className="px-4 py-2 rounded-lg text-sm bg-primary text-white hover:bg-primary/90"
                  >
                    {t("确认", "Confirm")}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Tab: Users */}
      {activeTab === "users" && (
        <div className="space-y-4">
          {/* Search & actions */}
          <div className="flex flex-col md:flex-row gap-3">
            <div className="flex-1 relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder={t("搜索姓名或邮箱...", "Search name or email...")}
                className="w-full pl-9 pr-3 py-2.5 rounded-lg border border-border bg-card text-foreground placeholder:text-muted-foreground"
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={selectAll}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm border border-border hover:bg-muted transition-colors"
              >
                <Check size={14} />
                {selectedUsers.size === filteredUsers.length ? t("取消全选", "Deselect All") : t("全选", "Select All")}
              </button>
              {selectedUsers.size > 0 && (
                <span className="flex items-center px-3 py-2 rounded-lg bg-primary/10 text-primary text-sm font-medium">
                  {t(`已选 ${selectedUsers.size} 人`, `${selectedUsers.size} selected`)}
                </span>
              )}
            </div>
          </div>

          {/* Users list */}
          <div className="bg-card rounded-xl border border-border overflow-hidden">
            <div className="divide-y divide-border">
              {filteredUsers.map(u => (
                <div key={u.id} className="flex items-center gap-3 px-4 py-3 hover:bg-muted/30 transition-colors">
                  <button
                    onClick={() => toggleUser(u.id)}
                    className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                      selectedUsers.has(u.id)
                        ? "bg-primary border-primary"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    {selectedUsers.has(u.id) && <Check size={12} className="text-white" />}
                  </button>
                  <div className="w-9 h-9 rounded-full bg-primary/20 flex items-center justify-center text-sm font-bold text-primary shrink-0">
                    {u.name.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground">{u.name}</p>
                    <p className="text-xs text-muted-foreground">{u.email}</p>
                  </div>
                  <div className="hidden md:block text-sm text-muted-foreground">
                    {getDeptName(u.departmentId)}
                  </div>
                  {getRoleBadge(u.engineRole)}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab: Permissions */}
      {activeTab === "permissions" && (
        <div className="space-y-4">
          {/* Permission levels explanation */}
          <div className="bg-card rounded-xl border border-border p-5">
            <h3 className="font-semibold text-foreground mb-4">{t("权限等级说明", "Permission Levels")}</h3>
            <div className="space-y-3">
              {[
                {
                  role: "super_admin",
                  zh: "超级管理员",
                  en: "Super Admin",
                  descZh: "全平台管理权限，可管理所有部门、用户、案例审核、飞书配置、系统设置",
                  descEn: "Full platform admin. Manage all departments, users, case reviews, Feishu config, system settings",
                  color: "bg-red-100 text-red-700 border-red-200",
                  icon: <ShieldCheck size={20} className="text-red-600" />,
                },
                {
                  role: "dept_admin",
                  zh: "部门管理员",
                  en: "Department Admin",
                  descZh: "管理本部门成员、审核本部门案例、查看本部门数据、管理本部门AI资产",
                  descEn: "Manage department members, review department cases, view department data, manage department AI assets",
                  color: "bg-blue-100 text-blue-700 border-blue-200",
                  icon: <Shield size={20} className="text-blue-600" />,
                },
                {
                  role: "employee",
                  zh: "普通员工",
                  en: "Employee",
                  descZh: "提交案例、使用Prompt/Workflow/Agent库、参与挑战和许愿池、查看排行榜",
                  descEn: "Submit cases, use Prompt/Workflow/Agent libraries, join challenges and wish pool, view leaderboard",
                  color: "bg-gray-100 text-gray-700 border-gray-200",
                  icon: <UserIcon size={20} className="text-gray-600" />,
                },
              ].map(level => (
                <div key={level.role} className={`flex items-start gap-4 p-4 rounded-xl border ${level.color}`}>
                  <div className="shrink-0 mt-0.5">{level.icon}</div>
                  <div>
                    <h4 className="font-semibold text-sm">{t(level.zh, level.en)}</h4>
                    <p className="text-xs mt-1 opacity-80">{t(level.descZh, level.descEn)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Permission matrix */}
          <div className="bg-card rounded-xl border border-border overflow-hidden">
            <div className="p-4 border-b border-border">
              <h3 className="font-semibold text-foreground">{t("权限矩阵", "Permission Matrix")}</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-muted/50">
                    <th className="text-left px-4 py-3 font-medium text-muted-foreground">{t("功能", "Feature")}</th>
                    <th className="text-center px-4 py-3 font-medium text-red-600">{t("超级管理员", "Super Admin")}</th>
                    <th className="text-center px-4 py-3 font-medium text-blue-600">{t("部门管理员", "Dept Admin")}</th>
                    <th className="text-center px-4 py-3 font-medium text-gray-600">{t("员工", "Employee")}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {[
                    { zh: "查看仪表盘", en: "View Dashboard", sa: true, da: true, emp: true },
                    { zh: "提交案例", en: "Submit Cases", sa: true, da: true, emp: true },
                    { zh: "审核案例", en: "Review Cases", sa: true, da: true, emp: false },
                    { zh: "发布案例", en: "Publish Cases", sa: true, da: false, emp: false },
                    { zh: "管理Prompt库", en: "Manage Prompts", sa: true, da: true, emp: false },
                    { zh: "管理Workflow库", en: "Manage Workflows", sa: true, da: true, emp: false },
                    { zh: "管理Agent库", en: "Manage Agents", sa: true, da: false, emp: false },
                    { zh: "查看指挥塔", en: "View Control Tower", sa: true, da: true, emp: false },
                    { zh: "管理用户权限", en: "Manage Permissions", sa: true, da: false, emp: false },
                    { zh: "飞书配置", en: "Feishu Config", sa: true, da: false, emp: false },
                    { zh: "组织架构管理", en: "Org Management", sa: true, da: false, emp: false },
                    { zh: "系统设置", en: "System Settings", sa: true, da: false, emp: false },
                  ].map((row, i) => (
                    <tr key={i} className="hover:bg-muted/20">
                      <td className="px-4 py-2.5 text-foreground">{t(row.zh, row.en)}</td>
                      <td className="text-center px-4 py-2.5">
                        {row.sa ? <Check size={16} className="inline text-green-500" /> : <X size={16} className="inline text-red-300" />}
                      </td>
                      <td className="text-center px-4 py-2.5">
                        {row.da ? <Check size={16} className="inline text-green-500" /> : <X size={16} className="inline text-red-300" />}
                      </td>
                      <td className="text-center px-4 py-2.5">
                        {row.emp ? <Check size={16} className="inline text-green-500" /> : <X size={16} className="inline text-red-300" />}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
