/*
 * AppLayout — Main layout with collapsible sidebar (PC) / bottom nav (mobile)
 * Design: Warm Professional / McKinsey-style
 * Colors: Deep ocean blue sidebar, warm white content area
 */
import { useState, type ReactNode } from "react";
import { Link, useLocation } from "wouter";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Newspaper,
  Lightbulb,
  Trophy,
  Target,
  GitBranch,
  BookOpen,
  Medal,
  Gauge,
  Settings,
  ChevronLeft,
  ChevronRight,
  Globe,
  Menu,
  X,
  Sparkles,
  FileText,
  Workflow,
  Bot,
  Building2,
  Users,
  FolderKanban,
  MessageSquare,
  PlusCircle,
  Rss,
  ClipboardList,
  BarChart3,
} from "lucide-react";

interface NavItem {
  path: string;
  iconEl: React.ReactNode;
  zh: string;
  en: string;
}

interface NavGroup {
  labelZh: string;
  labelEn: string;
  items: NavItem[];
}

const navGroups: NavGroup[] = [
  {
    labelZh: "核心",
    labelEn: "Core",
    items: [
      { path: "/", iconEl: <LayoutDashboard size={20} />, zh: "仪表盘", en: "Dashboard" },
      { path: "/newsletter", iconEl: <Newspaper size={20} />, zh: "AI周刊", en: "Newsletter" },
      { path: "/intelligence", iconEl: <Rss size={20} />, zh: "全球AI动态", en: "AI Intelligence" },
    ],
  },
  {
    labelZh: "参与",
    labelEn: "Engage",
    items: [
      { path: "/wishes", iconEl: <Lightbulb size={20} />, zh: "许愿池", en: "Wish Pool" },
      { path: "/challenges", iconEl: <Trophy size={20} />, zh: "AI挑战", en: "Challenges" },
      { path: "/bounty", iconEl: <Target size={20} />, zh: "悬赏榜", en: "Bounty Board" },
    ],
  },
  {
    labelZh: "AI资产",
    labelEn: "AI Assets",
    items: [
      { path: "/prompts", iconEl: <FileText size={20} />, zh: "Prompt库", en: "Prompt Library" },
      { path: "/workflows", iconEl: <Workflow size={20} />, zh: "工作流库", en: "Workflow Library" },
      { path: "/agents", iconEl: <Bot size={20} />, zh: "Agent库", en: "Agent Library" },
    ],
  },
  {
    labelZh: "成长",
    labelEn: "Growth",
    items: [
      { path: "/skills", iconEl: <GitBranch size={20} />, zh: "技能树", en: "Skill Tree" },
      { path: "/biweekly-plan", iconEl: <Sparkles size={20} />, zh: "双周计划", en: "Biweekly Plan" },
      { path: "/cases", iconEl: <BookOpen size={20} />, zh: "案例库", en: "Cases Library" },
      { path: "/leaderboard", iconEl: <Medal size={20} />, zh: "排行榜", en: "Leaderboard" },
    ],
  },
  {
    labelZh: "管理",
    labelEn: "Management",
    items: [
      { path: "/department", iconEl: <Building2 size={20} />, zh: "部门中心", en: "Department" },
      { path: "/projects", iconEl: <FolderKanban size={20} />, zh: "项目中心", en: "Projects" },
      { path: "/org", iconEl: <Users size={20} />, zh: "组织架构", en: "Org Structure" },
      { path: "/weekly-report", iconEl: <ClipboardList size={20} />, zh: "周报录入", en: "Weekly Report" },
      { path: "/weekly-summary", iconEl: <BarChart3 size={20} />, zh: "周报汇总", en: "Report Summary" },
      { path: "/control-tower", iconEl: <Gauge size={20} />, zh: "指挥塔", en: "Control Tower" },
      { path: "/feishu", iconEl: <MessageSquare size={20} />, zh: "飞书集成", en: "Feishu" },
      { path: "/admin", iconEl: <Settings size={20} />, zh: "管理后台", en: "Admin" },
    ],
  },
];

const navItems: NavItem[] = navGroups.flatMap((g) => g.items);

export default function AppLayout({ children }: { children: ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [location] = useLocation();
  const { lang, toggleLang, t } = useLanguage();

  const isActive = (path: string) => {
    if (path === "/") return location === "/";
    return location.startsWith(path);
  };

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Desktop Sidebar */}
      <aside
        className={`hidden lg:flex flex-col transition-all duration-300 ease-in-out bg-sidebar text-sidebar-foreground ${
          collapsed ? "w-[68px]" : "w-[240px]"
        }`}
      >
        {/* Logo area */}
        <div className="flex items-center gap-3 px-4 h-16 border-b border-sidebar-border shrink-0">
          <img
            src="https://d2xsxph8kpxj0f.cloudfront.net/310519663405149767/QM6nYWAxuWeZFy253dxUZB/cupshe_palm_logo_1cd18f41.png"
            alt="CUPSHE"
            className="h-7 object-contain brightness-0 invert shrink-0"
          />
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="overflow-hidden"
            >
              <p className="text-[11px] font-medium text-sidebar-foreground/70 whitespace-nowrap tracking-wide">
                AI Transformation Engine
              </p>
            </motion.div>
          )}
        </div>

        {/* Nav items - grouped */}
        <nav className="flex-1 py-2 px-2 overflow-y-auto">
          {navGroups.map((group, gi) => (
            <div key={gi} className="mb-1">
              {!collapsed && (
                <div className="px-3 pt-3 pb-1 text-[10px] font-semibold uppercase tracking-wider text-sidebar-foreground/40">
                  {t(group.labelZh, group.labelEn)}
                </div>
              )}
              {collapsed && gi > 0 && <div className="mx-3 my-1.5 border-t border-sidebar-border/30" />}
              <div className="space-y-0.5">
                {group.items.map((item) => (
                  <Link key={item.path} href={item.path}>
                    <div
                      className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 group ${
                        isActive(item.path)
                          ? "bg-sidebar-accent text-sidebar-primary"
                          : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
                      }`}
                    >
                      <span className="shrink-0">{item.iconEl}</span>
                      {!collapsed && (
                        <span className="text-sm font-medium truncate">
                          {t(item.zh, item.en)}
                        </span>
                      )}
                      {isActive(item.path) && (
                        <div className="ml-auto w-1.5 h-1.5 rounded-full bg-sidebar-primary shrink-0" />
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </nav>

        {/* Bottom actions */}
        <div className="border-t border-sidebar-border p-2 space-y-1 shrink-0">
          <button
            onClick={toggleLang}
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground transition-colors w-full"
          >
            <Globe size={20} className="shrink-0" />
            {!collapsed && (
              <span className="text-sm">{lang === "zh" ? "English" : "中文"}</span>
            )}
          </button>
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground transition-colors w-full"
          >
            {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
            {!collapsed && <span className="text-sm">{t("收起", "Collapse")}</span>}
          </button>
        </div>
      </aside>

      {/* Main content area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Mobile header */}
        <header className="lg:hidden flex items-center justify-between px-4 h-14 border-b border-border bg-card shrink-0">
          <div className="flex items-center gap-2">
            <img
              src="https://d2xsxph8kpxj0f.cloudfront.net/310519663405149767/QM6nYWAxuWeZFy253dxUZB/cupshe_palm_logo_1cd18f41.png"
              alt="CUPSHE"
              className="h-6 object-contain"
            />
            <span className="font-bold text-sm text-foreground">CUPSHE AI</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={toggleLang}
              className="p-2 rounded-lg hover:bg-muted transition-colors"
            >
              <Globe size={18} className="text-muted-foreground" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg hover:bg-muted transition-colors"
            >
              {mobileMenuOpen ? (
                <X size={20} className="text-foreground" />
              ) : (
                <Menu size={20} className="text-foreground" />
              )}
            </button>
          </div>
        </header>

        {/* Mobile menu overlay */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="lg:hidden absolute top-14 left-0 right-0 z-50 bg-card border-b border-border shadow-lg max-h-[70vh] overflow-y-auto"
            >
              <nav className="p-3">
                {navGroups.map((group, gi) => (
                  <div key={gi} className="mb-2">
                    <div className="px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                      {t(group.labelZh, group.labelEn)}
                    </div>
                    <div className="grid grid-cols-2 gap-1.5">
                      {group.items.map((item) => (
                        <Link key={item.path} href={item.path}>
                          <div
                            onClick={() => setMobileMenuOpen(false)}
                            className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg transition-colors ${
                              isActive(item.path)
                                ? "bg-primary/10 text-primary"
                                : "text-muted-foreground hover:bg-muted"
                            }`}
                          >
                            {item.iconEl}
                            <span className="text-sm font-medium">{t(item.zh, item.en)}</span>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto">
          <motion.div
            key={location}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="p-4 lg:p-6"
          >
            {children}
          </motion.div>
        </main>

        {/* Mobile bottom nav - quick access to top 5 items */}
        <nav className="lg:hidden flex items-center justify-around border-t border-border bg-card py-1.5 shrink-0 safe-area-bottom">
          {[navItems[0], navItems[2], navItems[7], navItems[8], navItems[11]].filter(Boolean).map((item) => (
            <Link key={item.path} href={item.path}>
              <div
                className={`flex flex-col items-center gap-0.5 px-2 py-1 rounded-lg transition-colors ${
                  isActive(item.path)
                    ? "text-primary"
                    : "text-muted-foreground"
                }`}
              >
                {item.iconEl}
                <span className="text-[10px] font-medium">{t(item.zh, item.en)}</span>
              </div>
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}
