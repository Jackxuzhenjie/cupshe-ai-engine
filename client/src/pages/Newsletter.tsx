/*
 * Newsletter — Archive of all AI weekly newsletter issues
 * Design: Editorial card layout with cover images
 */
import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { Search, Calendar, ArrowUpRight } from "lucide-react";
import { newsletterIssues } from "@/lib/data";
import { useState } from "react";

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.08 } } };
const item = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } };

export default function Newsletter() {
  const { t } = useLanguage();
  const [search, setSearch] = useState("");

  const filtered = newsletterIssues.filter(
    (nl) =>
      nl.titleZh.includes(search) ||
      nl.titleEn.toLowerCase().includes(search.toLowerCase()) ||
      nl.summaryZh.includes(search) ||
      nl.summaryEn.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6 max-w-[1400px] mx-auto">
      {/* Page Header */}
      <motion.div variants={item} className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-foreground">{t("AI 周刊", "AI Newsletter")}</h1>
          <p className="text-sm text-muted-foreground mt-1">
            {t("每周AI转型动态、案例与趋势", "Weekly AI transformation updates, cases & trends")}
          </p>
        </div>
        <div className="relative w-full lg:w-72">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder={t("搜索周刊...", "Search newsletters...")}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 bg-card border-border/50"
          />
        </div>
      </motion.div>

      {/* Newsletter Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {filtered.map((nl, i) => (
          <motion.div key={nl.id} variants={item}>
            <Link href={`/newsletter/${nl.id}`}>
              <Card className="card-hover border-0 shadow-sm overflow-hidden group cursor-pointer">
                {i === 0 && nl.coverImage && (
                  <div className="relative h-48 overflow-hidden">
                    <img src={nl.coverImage} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-3 left-4 right-4">
                      <Badge className="bg-coral text-white border-0 mb-2">
                        {t("最新一期", "Latest Issue")}
                      </Badge>
                    </div>
                  </div>
                )}
                <CardContent className="p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="outline" className="text-[10px] font-mono">
                      #{nl.issue}
                    </Badge>
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Calendar size={12} /> {nl.date}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {t(nl.titleZh, nl.titleEn)}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                    {t(nl.summaryZh, nl.summaryEn)}
                  </p>
                  {nl.blocks.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      {nl.blocks.slice(0, 4).map((block) => (
                        <span key={block.type} className="text-[10px] px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                          {t(block.titleZh, block.titleEn)}
                        </span>
                      ))}
                      {nl.blocks.length > 4 && (
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                          +{nl.blocks.length - 4}
                        </span>
                      )}
                    </div>
                  )}
                  <div className="flex items-center gap-1 mt-3 text-xs text-primary font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                    {t("阅读全文", "Read More")} <ArrowUpRight size={12} />
                  </div>
                </CardContent>
              </Card>
            </Link>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
