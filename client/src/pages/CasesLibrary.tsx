/*
 * CasesLibrary — Rich AI case repository with filters and featured cases
 * Design: Card grid with efficiency gain highlights
 */
import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { useState } from "react";
import { Search, TrendingUp, Tag, Calendar, Users, Wrench, Star } from "lucide-react";
import { aiCases, departments } from "@/lib/data";

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.08 } } };
const item = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } };

export default function CasesLibrary() {
  const { t } = useLanguage();
  const [search, setSearch] = useState("");
  const [deptFilter, setDeptFilter] = useState("all");

  const filtered = aiCases.filter((c) => {
    const matchSearch = c.titleZh.includes(search) || c.titleEn.toLowerCase().includes(search.toLowerCase());
    const matchDept = deptFilter === "all" || c.department === deptFilter;
    return matchSearch && matchDept;
  });

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6 max-w-[1400px] mx-auto">
      {/* Header */}
      <motion.div variants={item} className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-foreground">{t("AI 案例库", "AI Cases Library")}</h1>
          <p className="text-sm text-muted-foreground mt-1">
            {t("探索AI最佳实践，学习成功经验", "Explore AI best practices, learn from success stories")}
          </p>
        </div>
        <div className="relative w-full lg:w-72">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder={t("搜索案例...", "Search cases...")}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 bg-card border-border/50"
          />
        </div>
      </motion.div>

      {/* Department filter */}
      <motion.div variants={item} className="flex gap-1.5 overflow-x-auto pb-1">
        <button
          onClick={() => setDeptFilter("all")}
          className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
            deptFilter === "all" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"
          }`}
        >
          {t("全部", "All")}
        </button>
        {departments.map((dept) => (
          <button
            key={dept.id}
            onClick={() => setDeptFilter(dept.id)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
              deptFilter === dept.id ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            {t(dept.zh, dept.en)}
          </button>
        ))}
      </motion.div>

      {/* Case Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map((c) => (
          <motion.div key={c.id} variants={item}>
            <Card className="card-hover border-0 shadow-sm h-full">
              <CardContent className="p-5 flex flex-col h-full">
                {/* Header */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    {c.featured && (
                      <Badge className="bg-coral/10 text-coral border-0 text-[10px]">
                        <Star size={10} className="mr-0.5 fill-current" /> {t("精选", "Featured")}
                      </Badge>
                    )}
                    <Badge variant="secondary" className="text-[10px]">
                      {t(
                        departments.find(d => d.id === c.department)?.zh || c.department,
                        departments.find(d => d.id === c.department)?.en || c.department
                      )}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-1 text-coral font-bold text-sm">
                    <TrendingUp size={14} /> {c.efficiencyGain}
                  </div>
                </div>

                {/* Title & Content */}
                <h3 className="text-base font-bold text-foreground mb-2">
                  {t(c.titleZh, c.titleEn)}
                </h3>

                <div className="space-y-2 mb-4 flex-1">
                  <div>
                    <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
                      {t("问题", "Problem")}
                    </span>
                    <p className="text-xs text-foreground/80 line-clamp-2">{t(c.problemZh, c.problemEn)}</p>
                  </div>
                  <div>
                    <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
                      {t("方案", "Approach")}
                    </span>
                    <p className="text-xs text-foreground/80 line-clamp-2">{t(c.approachZh, c.approachEn)}</p>
                  </div>
                  <div>
                    <span className="text-[10px] font-semibold text-success uppercase tracking-wider font-semibold">
                      {t("成果", "Result")}
                    </span>
                    <p className="text-xs text-foreground/80 line-clamp-2">{t(c.resultZh, c.resultEn)}</p>
                  </div>
                </div>

                {/* Footer */}
                <div className="pt-3 border-t border-border/50">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                    <span className="flex items-center gap-1"><Users size={11} /> {c.team}</span>
                    <span>·</span>
                    <span className="flex items-center gap-1"><Calendar size={11} /> {c.date}</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {c.tools.map((tool) => (
                      <span key={tool} className="text-[10px] px-2 py-0.5 rounded-full bg-primary/5 text-primary font-medium">
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
