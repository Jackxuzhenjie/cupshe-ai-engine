import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import { useState, useMemo } from "react";
import {
  User, Star, Trophy, Flame, Target, BookOpen, Upload, Heart,
  Bookmark, MessageSquare, Zap, Award, TrendingUp, ChevronRight,
  Clock, CheckCircle2, Circle, Play, Gift, Share2, Bug, Crown,
} from "lucide-react";

// ========== CONSTANTS ==========

const ACTIVITY_CONFIG: Record<string, { label: string; icon: typeof Star; color: string; points: number }> = {
  case_upload: { label: "上传案例", icon: Upload, color: "text-blue-600 bg-blue-50", points: 50 },
  case_like: { label: "点赞案例", icon: Heart, color: "text-pink-500 bg-pink-50", points: 5 },
  case_favorite: { label: "收藏案例", icon: Bookmark, color: "text-amber-500 bg-amber-50", points: 10 },
  case_comment: { label: "评论案例", icon: MessageSquare, color: "text-green-600 bg-green-50", points: 15 },
  skill_complete: { label: "完成技能", icon: CheckCircle2, color: "text-emerald-600 bg-emerald-50", points: 100 },
  skill_start: { label: "开始学习", icon: Play, color: "text-cyan-600 bg-cyan-50", points: 10 },
  prompt_use: { label: "使用Prompt", icon: Zap, color: "text-violet-600 bg-violet-50", points: 8 },
  workflow_use: { label: "使用工作流", icon: Target, color: "text-indigo-600 bg-indigo-50", points: 8 },
  challenge_join: { label: "参加挑战", icon: Trophy, color: "text-orange-600 bg-orange-50", points: 20 },
  challenge_complete: { label: "完成挑战", icon: Award, color: "text-yellow-600 bg-yellow-50", points: 80 },
  wish_submit: { label: "提交心愿", icon: Star, color: "text-purple-600 bg-purple-50", points: 15 },
  bounty_claim: { label: "领取悬赏", icon: Gift, color: "text-red-500 bg-red-50", points: 60 },
  share: { label: "分享内容", icon: Share2, color: "text-teal-600 bg-teal-50", points: 10 },
  login: { label: "每日登录", icon: User, color: "text-gray-600 bg-gray-50", points: 2 },
  badge_earn: { label: "获得徽章", icon: Crown, color: "text-amber-600 bg-amber-50", points: 30 },
};

const BADGE_CONFIG: Record<string, { name: string; description: string; emoji: string }> = {
  first_case: { name: "首案先锋", description: "上传第一个案例", emoji: "🏅" },
  case_master: { name: "案例达人", description: "上传10个案例", emoji: "🏆" },
  skill_learner: { name: "技能学徒", description: "完成5个技能", emoji: "📚" },
  skill_master: { name: "技能大师", description: "完成15个技能", emoji: "🎓" },
  social_star: { name: "社交之星", description: "获得50个点赞", emoji: "⭐" },
  streak_7: { name: "七日连胜", description: "连续7天活跃", emoji: "🔥" },
  streak_30: { name: "月度坚持", description: "连续30天活跃", emoji: "💎" },
  challenger: { name: "挑战者", description: "完成3个挑战", emoji: "⚡" },
  fission_pioneer: { name: "裂变先锋", description: "案例被3人复用", emoji: "🌱" },
};

// ========== SUB-COMPONENTS ==========

function LevelProgressBar({ totalEarned, levelInfo }: { totalEarned: number; levelInfo: any }) {
  const currentMin = levelInfo.min;
  const nextMin = levelInfo.nextLevelMin;
  const range = nextMin - currentMin;
  const progress = range > 0 ? Math.min(((totalEarned - currentMin) / range) * 100, 100) : 100;

  return (
    <div className="mt-3">
      <div className="flex justify-between text-xs text-muted-foreground mb-1">
        <span>Lv.{levelInfo.level} {levelInfo.title}</span>
        {levelInfo.level < 10 && (
          <span>距 Lv.{levelInfo.level + 1} {levelInfo.nextLevelTitle} 还需 {nextMin - totalEarned} 积分</span>
        )}
      </div>
      <div className="h-2.5 bg-sand rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-700"
          style={{
            width: `${progress}%`,
            background: "linear-gradient(90deg, oklch(0.62 0.20 28), oklch(0.55 0.12 220))",
          }}
        />
      </div>
    </div>
  );
}

function StatsCard({ icon: Icon, label, value, sub, color }: {
  icon: typeof Star; label: string; value: string | number; sub?: string; color: string;
}) {
  return (
    <div className="flex items-center gap-3 p-3 rounded-lg bg-warm-white border border-sand">
      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${color}`}>
        <Icon className="w-5 h-5" />
      </div>
      <div>
        <div className="text-xl font-bold text-foreground">{value}</div>
        <div className="text-xs text-muted-foreground">{label}</div>
        {sub && <div className="text-[10px] text-muted-foreground/70">{sub}</div>}
      </div>
    </div>
  );
}

function ActivityItem({ activity }: { activity: any }) {
  const config = ACTIVITY_CONFIG[activity.type] ?? {
    label: activity.type, icon: Circle, color: "text-gray-500 bg-gray-50", points: 0,
  };
  const Icon = config.icon;
  const time = new Date(activity.createdAt).toLocaleString("zh-CN", {
    month: "short", day: "numeric", hour: "2-digit", minute: "2-digit",
  });

  return (
    <div className="flex items-center gap-3 py-2.5 border-b border-sand/50 last:border-0">
      <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${config.color}`}>
        <Icon className="w-4 h-4" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-sm font-medium text-foreground truncate">
          {config.label}
          {activity.refTitle && (
            <span className="text-muted-foreground font-normal"> · {activity.refTitle}</span>
          )}
        </div>
        <div className="text-xs text-muted-foreground">{time}</div>
      </div>
      {(activity.pointsEarned ?? 0) > 0 && (
        <div className="text-xs font-semibold text-coral shrink-0">+{activity.pointsEarned}</div>
      )}
    </div>
  );
}

function SkillProgressItem({ skill }: { skill: any }) {
  const statusConfig = {
    completed: { label: "已完成", color: "text-emerald-600", bg: "bg-emerald-50", icon: CheckCircle2 },
    in_progress: { label: "学习中", color: "text-blue-600", bg: "bg-blue-50", icon: Play },
    not_started: { label: "未开始", color: "text-gray-400", bg: "bg-gray-50", icon: Circle },
  };
  const config = statusConfig[skill.status as keyof typeof statusConfig] ?? statusConfig.not_started;
  const Icon = config.icon;

  return (
    <div className="flex items-center gap-3 py-2.5 border-b border-sand/50 last:border-0">
      <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${config.bg}`}>
        <Icon className={`w-4 h-4 ${config.color}`} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-sm font-medium text-foreground truncate">{skill.skillTitle ?? skill.skillId}</div>
        <div className="flex items-center gap-2 mt-0.5">
          <div className="flex-1 h-1.5 bg-sand rounded-full overflow-hidden max-w-[120px]">
            <div
              className="h-full rounded-full transition-all"
              style={{
                width: `${skill.progressPercent ?? 0}%`,
                background: skill.status === "completed"
                  ? "oklch(0.55 0.15 160)"
                  : "oklch(0.55 0.12 220)",
              }}
            />
          </div>
          <span className="text-xs text-muted-foreground">{skill.progressPercent ?? 0}%</span>
        </div>
      </div>
      <span className={`text-xs px-2 py-0.5 rounded-full ${config.bg} ${config.color}`}>
        {config.label}
      </span>
    </div>
  );
}

// ========== MAIN PAGE ==========

type TabKey = "overview" | "activities" | "skills" | "badges";

export default function Profile() {
  const { user, isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState<TabKey>("overview");
  const [activityFilter, setActivityFilter] = useState<string | undefined>(undefined);

  // Data queries
  const pointsQuery = trpc.profile.getPoints.useQuery(undefined, { enabled: isAuthenticated });
  const activitiesQuery = trpc.profile.getActivities.useQuery(
    activityFilter ? { type: activityFilter, limit: 50 } : { limit: 50 },
    { enabled: isAuthenticated }
  );
  const activityStatsQuery = trpc.profile.getActivityStats.useQuery(undefined, { enabled: isAuthenticated });
  const skillProgressQuery = trpc.profile.getSkillProgress.useQuery(undefined, { enabled: isAuthenticated });
  const skillStatsQuery = trpc.profile.getSkillStats.useQuery(undefined, { enabled: isAuthenticated });

  const points = pointsQuery.data?.points;
  const levelInfo = pointsQuery.data?.levelInfo;
  const activities = activitiesQuery.data?.activities ?? [];
  const activityStats = activityStatsQuery.data ?? {};
  const skillProgress = skillProgressQuery.data ?? [];
  const skillStats = skillStatsQuery.data ?? { total: 0, completed: 0, inProgress: 0, notStarted: 0 };

  // Derived stats
  const totalActivities = useMemo(() => {
    return Object.values(activityStats).reduce((sum: number, v: any) => sum + (v as number), 0);
  }, [activityStats]);

  const badges = useMemo(() => points?.badges ?? [], [points]);

  const tabs: { key: TabKey; label: string; icon: typeof Star }[] = [
    { key: "overview", label: "总览", icon: User },
    { key: "activities", label: "活动记录", icon: Clock },
    { key: "skills", label: "技能进度", icon: BookOpen },
    { key: "badges", label: "徽章成就", icon: Trophy },
  ];

  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <div className="text-center">
          <User className="w-16 h-16 mx-auto text-muted-foreground/30 mb-4" />
          <h2 className="text-xl font-semibold text-foreground mb-2">请先登录</h2>
          <p className="text-muted-foreground">登录后可查看个人主页</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 pt-6 pb-12">
      {/* ===== HEADER: User Card ===== */}
      <div className="rounded-xl border border-sand bg-white p-6 mb-6">
        <div className="flex items-start gap-5">
          {/* Avatar */}
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-coral to-teal flex items-center justify-center text-white text-3xl font-bold shrink-0">
            {(user?.name ?? "U").charAt(0).toUpperCase()}
          </div>
          {/* Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 flex-wrap">
              <h1 className="text-2xl font-bold text-foreground">{user?.name ?? "用户"}</h1>
              {levelInfo && (
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-coral/10 text-coral">
                  Lv.{levelInfo.level} {levelInfo.title}
                </span>
              )}
            </div>
            <p className="text-sm text-muted-foreground mt-1">{user?.email ?? ""}</p>
            {points && levelInfo && (
              <LevelProgressBar totalEarned={points.totalEarned} levelInfo={levelInfo} />
            )}
          </div>
          {/* Points highlight */}
          <div className="text-right shrink-0">
            <div className="text-3xl font-bold text-coral">{points?.balance ?? 0}</div>
            <div className="text-xs text-muted-foreground">可用积分</div>
            <div className="text-xs text-muted-foreground/70 mt-0.5">
              累计 {points?.totalEarned ?? 0}
            </div>
          </div>
        </div>

        {/* Quick Stats Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-5">
          <StatsCard icon={Flame} label="连续活跃" value={`${points?.streakDays ?? 0}天`} sub={`最长 ${points?.longestStreak ?? 0}天`} color="text-orange-600 bg-orange-50" />
          <StatsCard icon={TrendingUp} label="活动总数" value={totalActivities} color="text-blue-600 bg-blue-50" />
          <StatsCard icon={BookOpen} label="技能完成" value={`${skillStats.completed}/${skillStats.total || 30}`} color="text-emerald-600 bg-emerald-50" />
          <StatsCard icon={Trophy} label="徽章获得" value={badges.length} sub={`共 ${Object.keys(BADGE_CONFIG).length} 个`} color="text-amber-600 bg-amber-50" />
        </div>
      </div>

      {/* ===== TABS ===== */}
      <div className="flex gap-1 border-b border-sand mb-6">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium border-b-2 transition-colors ${
                activeTab === tab.key
                  ? "border-coral text-coral"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* ===== TAB CONTENT ===== */}

      {/* --- OVERVIEW --- */}
      {activeTab === "overview" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Activities */}
          <div className="rounded-xl border border-sand bg-white p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-foreground flex items-center gap-2">
                <Clock className="w-4 h-4 text-coral" /> 最近活动
              </h3>
              <button
                onClick={() => setActiveTab("activities")}
                className="text-xs text-coral hover:underline flex items-center gap-0.5"
              >
                查看全部 <ChevronRight className="w-3 h-3" />
              </button>
            </div>
            {activities.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground text-sm">
                暂无活动记录，开始探索AI技能吧！
              </div>
            ) : (
              <div className="space-y-0">
                {activities.slice(0, 8).map((a: any) => (
                  <ActivityItem key={a.id} activity={a} />
                ))}
              </div>
            )}
          </div>

          {/* Skill Progress */}
          <div className="rounded-xl border border-sand bg-white p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-foreground flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-teal" /> 技能进度
              </h3>
              <button
                onClick={() => setActiveTab("skills")}
                className="text-xs text-coral hover:underline flex items-center gap-0.5"
              >
                查看全部 <ChevronRight className="w-3 h-3" />
              </button>
            </div>
            {skillProgress.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground text-sm">
                尚未开始任何技能学习，前往技能树开始吧！
              </div>
            ) : (
              <div className="space-y-0">
                {skillProgress.slice(0, 8).map((s: any) => (
                  <SkillProgressItem key={s.id} skill={s} />
                ))}
              </div>
            )}
          </div>

          {/* Activity Breakdown */}
          <div className="rounded-xl border border-sand bg-white p-5 lg:col-span-2">
            <h3 className="font-semibold text-foreground flex items-center gap-2 mb-4">
              <TrendingUp className="w-4 h-4 text-blue-600" /> 活动分布
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
              {Object.entries(ACTIVITY_CONFIG).map(([key, config]) => {
                const count = (activityStats as any)[key] ?? 0;
                if (count === 0 && !["case_upload", "skill_complete", "prompt_use", "challenge_join", "login"].includes(key)) return null;
                const Icon = config.icon;
                return (
                  <div key={key} className="flex items-center gap-2 p-2 rounded-lg bg-warm-white">
                    <div className={`w-7 h-7 rounded flex items-center justify-center shrink-0 ${config.color}`}>
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold">{count}</div>
                      <div className="text-[10px] text-muted-foreground">{config.label}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* --- ACTIVITIES --- */}
      {activeTab === "activities" && (
        <div className="rounded-xl border border-sand bg-white p-5">
          {/* Filter */}
          <div className="flex flex-wrap gap-2 mb-4">
            <button
              onClick={() => setActivityFilter(undefined)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                !activityFilter ? "bg-coral text-white" : "bg-sand text-muted-foreground hover:bg-sand-dark"
              }`}
            >
              全部
            </button>
            {["case_upload", "case_like", "case_favorite", "skill_complete", "skill_start", "prompt_use", "challenge_join", "login"].map((type) => (
              <button
                key={type}
                onClick={() => setActivityFilter(type)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                  activityFilter === type ? "bg-coral text-white" : "bg-sand text-muted-foreground hover:bg-sand-dark"
                }`}
              >
                {ACTIVITY_CONFIG[type]?.label ?? type}
              </button>
            ))}
          </div>
          {/* List */}
          {activities.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground text-sm">
              {activityFilter ? "该类型暂无活动记录" : "暂无活动记录"}
            </div>
          ) : (
            <div className="space-y-0">
              {activities.map((a: any) => (
                <ActivityItem key={a.id} activity={a} />
              ))}
            </div>
          )}
          {(activitiesQuery.data?.total ?? 0) > activities.length && (
            <div className="text-center mt-4">
              <span className="text-xs text-muted-foreground">
                显示 {activities.length} / {activitiesQuery.data?.total} 条
              </span>
            </div>
          )}
        </div>
      )}

      {/* --- SKILLS --- */}
      {activeTab === "skills" && (
        <div>
          {/* Stats bar */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="rounded-xl border border-sand bg-white p-4 text-center">
              <div className="text-2xl font-bold text-emerald-600">{skillStats.completed}</div>
              <div className="text-xs text-muted-foreground mt-1">已完成</div>
            </div>
            <div className="rounded-xl border border-sand bg-white p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">{skillStats.inProgress}</div>
              <div className="text-xs text-muted-foreground mt-1">学习中</div>
            </div>
            <div className="rounded-xl border border-sand bg-white p-4 text-center">
              <div className="text-2xl font-bold text-gray-400">{30 - skillStats.completed - skillStats.inProgress}</div>
              <div className="text-xs text-muted-foreground mt-1">未开始</div>
            </div>
          </div>
          {/* Progress list */}
          <div className="rounded-xl border border-sand bg-white p-5">
            {skillProgress.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground text-sm">
                尚未开始任何技能学习。前往<a href="/skills" className="text-coral hover:underline">技能树</a>开始你的AI学习之旅！
              </div>
            ) : (
              <div className="space-y-0">
                {skillProgress.map((s: any) => (
                  <SkillProgressItem key={s.id} skill={s} />
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* --- BADGES --- */}
      {activeTab === "badges" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.entries(BADGE_CONFIG).map(([key, badge]) => {
            const earned = badges.includes(key);
            return (
              <div
                key={key}
                className={`rounded-xl border p-5 transition-all ${
                  earned
                    ? "border-coral/30 bg-white shadow-sm"
                    : "border-sand bg-warm-white opacity-50"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="text-3xl">{badge.emoji}</div>
                  <div>
                    <div className={`font-semibold ${earned ? "text-foreground" : "text-muted-foreground"}`}>
                      {badge.name}
                    </div>
                    <div className="text-xs text-muted-foreground">{badge.description}</div>
                  </div>
                </div>
                {earned && (
                  <div className="mt-3 text-xs text-coral font-medium flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> 已获得
                  </div>
                )}
                {!earned && (
                  <div className="mt-3 text-xs text-muted-foreground/70">
                    尚未解锁
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* ===== POINTS RULES ===== */}
      <div className="mt-8 rounded-xl border border-sand bg-white p-5">
        <h3 className="font-semibold text-foreground flex items-center gap-2 mb-4">
          <Star className="w-4 h-4 text-amber-500" /> 积分规则
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
          {Object.entries(ACTIVITY_CONFIG).map(([key, config]) => {
            const Icon = config.icon;
            return (
              <div key={key} className="flex items-center gap-2 p-2 rounded-lg bg-warm-white text-xs">
                <Icon className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                <span className="text-muted-foreground truncate">{config.label}</span>
                <span className="ml-auto font-semibold text-coral shrink-0">+{config.points}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
