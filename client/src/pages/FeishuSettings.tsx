/*
 * FeishuSettings — Feishu integration configuration, webhook, and notification settings
 */
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { toast } from "sonner";
import {
  MessageSquare, Bell, Settings, Send, Check, AlertCircle, RefreshCw,
  Globe, Key, Link2, ToggleLeft, ToggleRight, ChevronRight, ExternalLink
} from "lucide-react";

export default function FeishuSettings() {
  const { t } = useLanguage();

  // Config state
  const [appId, setAppId] = useState("");
  const [appSecret, setAppSecret] = useState("");
  const [webhookUrl, setWebhookUrl] = useState("");
  const [enableWeeklyPush, setEnableWeeklyPush] = useState(false);
  const [enableMonthlySummary, setEnableMonthlySummary] = useState(false);
  const [enableCaseNotification, setEnableCaseNotification] = useState(true);
  const [testing, setTesting] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleTestWebhook = async () => {
    if (!webhookUrl) {
      toast.error(t("请先填写Webhook URL", "Please enter Webhook URL first"));
      return;
    }
    setTesting(true);
    try {
      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          msg_type: "interactive",
          card: {
            header: {
              title: { content: "🤖 CUPSHE AI Engine - Test", tag: "plain_text" },
              template: "blue",
            },
            elements: [
              { tag: "div", text: { content: t("这是一条测试通知", "This is a test notification"), tag: "plain_text" } },
            ],
          },
        }),
      });
      if (response.ok) {
        toast.success(t("Webhook测试成功！请检查飞书群是否收到消息", "Webhook test successful! Check your Feishu group"));
      } else {
        toast.error(t("Webhook测试失败，状态码: ", "Webhook test failed, status: ") + response.status);
      }
    } catch (err) {
      toast.error(t("Webhook连接失败，请检查URL", "Webhook connection failed, check URL"));
    }
    setTesting(false);
  };

  const handleSave = async () => {
    setSaving(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setSaving(false);
    toast.success(t("飞书配置已保存", "Feishu settings saved"));
  };

  const ToggleSwitch = ({ enabled, onToggle, label }: { enabled: boolean; onToggle: () => void; label: string }) => (
    <div className="flex items-center justify-between py-3">
      <span className="text-sm text-foreground">{label}</span>
      <button onClick={onToggle} className="relative">
        {enabled ? (
          <ToggleRight size={28} className="text-primary" />
        ) : (
          <ToggleLeft size={28} className="text-muted-foreground" />
        )}
      </button>
    </div>
  );

  const notificationTemplates = [
    {
      zh: "新案例发布通知",
      en: "New Case Published",
      descZh: "当有新案例发布时，自动推送到飞书群",
      descEn: "Auto-push to Feishu group when a new case is published",
      preview: `🎉 新AI案例发布\n\n📌 AI让商品分析效率提升18倍\n👤 张明 · 商品运营\n⚡ 效率提升 18x\n🏷 L2 团队效率\n\n👉 点击查看详情`,
    },
    {
      zh: "每周最佳案例",
      en: "Weekly Best Case",
      descZh: "每周一自动推送本周最佳AI案例",
      descEn: "Auto-push weekly best AI case every Monday",
      preview: `🏆 本周最佳AI案例\n\n📌 AI驱动广告创意自动化\n👤 李芳 · 营销中心\n⚡ 产出提升 5x\n📊 综合评分 92\n\n🔥 本周共新增 12 个案例`,
    },
    {
      zh: "月度AI转型报告",
      en: "Monthly AI Report",
      descZh: "每月1号推送AI转型月度总结",
      descEn: "Monthly AI transformation summary on the 1st",
      preview: `📊 3月AI转型月报\n\n📈 AI渗透率: 67% (+5%)\n📝 新增案例: 23个\n👥 活跃用户: 420人\n🏆 最佳部门: 数据中心 (89%)\n\n💡 本月亮点: AI广告创意流程上线`,
    },
  ];

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground">{t("飞书集成设置", "Feishu Integration")}</h1>
        <p className="text-sm text-muted-foreground mt-1">
          {t("配置飞书应用、Webhook通知和组织架构同步", "Configure Feishu app, webhook notifications, and org sync")}
        </p>
      </div>

      <div className="space-y-4">
        {/* App Configuration */}
        <div className="bg-card rounded-xl border border-border overflow-hidden">
          <div className="flex items-center gap-3 p-4 border-b border-border">
            <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
              <Key size={16} className="text-blue-500" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">{t("飞书应用配置", "Feishu App Config")}</h3>
              <p className="text-xs text-muted-foreground">{t("用于OAuth登录和API调用", "For OAuth login and API calls")}</p>
            </div>
          </div>
          <div className="p-4 space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">App ID</label>
              <input
                type="text"
                value={appId}
                onChange={e => setAppId(e.target.value)}
                placeholder="cli_xxxxxxxxxx"
                className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">App Secret</label>
              <input
                type="password"
                value={appSecret}
                onChange={e => setAppSecret(e.target.value)}
                placeholder="xxxxxxxxxxxxxxxxxxxxxxxx"
                className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
              />
            </div>
            <div className="p-3 rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800">
              <div className="flex items-start gap-2">
                <AlertCircle size={16} className="text-amber-600 mt-0.5 shrink-0" />
                <div className="text-xs text-amber-700 dark:text-amber-300">
                  <p className="font-medium">{t("如何获取飞书应用凭证：", "How to get Feishu app credentials:")}</p>
                  <ol className="mt-1 space-y-0.5 list-decimal list-inside">
                    <li>{t("登录飞书开放平台 open.feishu.cn", "Login to Feishu Open Platform open.feishu.cn")}</li>
                    <li>{t("创建企业自建应用", "Create an enterprise custom app")}</li>
                    <li>{t("在「凭证与基础信息」中获取 App ID 和 App Secret", "Get App ID and App Secret from 'Credentials & Basic Info'")}</li>
                    <li>{t("添加所需权限：通讯录、消息", "Add required permissions: Contacts, Messages")}</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Webhook Configuration */}
        <div className="bg-card rounded-xl border border-border overflow-hidden">
          <div className="flex items-center gap-3 p-4 border-b border-border">
            <div className="w-8 h-8 rounded-lg bg-green-500/10 flex items-center justify-center">
              <Link2 size={16} className="text-green-500" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">{t("Webhook 通知", "Webhook Notifications")}</h3>
              <p className="text-xs text-muted-foreground">{t("配置飞书群机器人Webhook", "Configure Feishu group bot webhook")}</p>
            </div>
          </div>
          <div className="p-4 space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Webhook URL</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={webhookUrl}
                  onChange={e => setWebhookUrl(e.target.value)}
                  placeholder="https://open.feishu.cn/open-apis/bot/v2/hook/xxxxxxxx"
                  className="flex-1 px-3 py-2.5 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                />
                <button
                  onClick={handleTestWebhook}
                  disabled={testing}
                  className="flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-green-600 text-white hover:bg-green-700 transition-colors disabled:opacity-50 text-sm font-medium shrink-0"
                >
                  {testing ? <RefreshCw size={14} className="animate-spin" /> : <Send size={14} />}
                  {t("测试", "Test")}
                </button>
              </div>
            </div>

            <div className="border-t border-border pt-3">
              <ToggleSwitch
                enabled={enableCaseNotification}
                onToggle={() => setEnableCaseNotification(!enableCaseNotification)}
                label={t("新案例发布通知", "New case publish notification")}
              />
              <ToggleSwitch
                enabled={enableWeeklyPush}
                onToggle={() => setEnableWeeklyPush(!enableWeeklyPush)}
                label={t("每周最佳案例推送（周一 9:00）", "Weekly best case push (Monday 9:00)")}
              />
              <ToggleSwitch
                enabled={enableMonthlySummary}
                onToggle={() => setEnableMonthlySummary(!enableMonthlySummary)}
                label={t("月度AI转型报告（每月1号）", "Monthly AI report (1st of month)")}
              />
            </div>
          </div>
        </div>

        {/* Notification Templates */}
        <div className="bg-card rounded-xl border border-border overflow-hidden">
          <div className="flex items-center gap-3 p-4 border-b border-border">
            <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center">
              <Bell size={16} className="text-purple-500" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">{t("通知模板预览", "Notification Templates")}</h3>
              <p className="text-xs text-muted-foreground">{t("以下是飞书群消息的预览效果", "Preview of Feishu group messages")}</p>
            </div>
          </div>
          <div className="p-4 space-y-4">
            {notificationTemplates.map((tpl, i) => (
              <div key={i} className="border border-border rounded-xl overflow-hidden">
                <div className="flex items-center justify-between px-4 py-3 bg-muted/30">
                  <div>
                    <h4 className="text-sm font-semibold text-foreground">{t(tpl.zh, tpl.en)}</h4>
                    <p className="text-xs text-muted-foreground">{t(tpl.descZh, tpl.descEn)}</p>
                  </div>
                </div>
                <div className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20">
                  <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-blue-100 dark:border-blue-900 max-w-sm">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-6 h-6 rounded bg-blue-500 flex items-center justify-center">
                        <MessageSquare size={12} className="text-white" />
                      </div>
                      <span className="text-xs font-medium text-blue-600">CUPSHE AI Engine</span>
                    </div>
                    <pre className="text-xs text-foreground whitespace-pre-wrap font-sans leading-relaxed">{tpl.preview}</pre>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Save button */}
        <div className="flex justify-end pt-2 pb-8">
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 px-6 py-2.5 rounded-lg bg-primary text-white hover:bg-primary/90 transition-colors disabled:opacity-50 text-sm font-medium"
          >
            {saving ? <RefreshCw size={16} className="animate-spin" /> : <Check size={16} />}
            {t("保存配置", "Save Settings")}
          </button>
        </div>
      </div>
    </div>
  );
}
