"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Clock, ChevronRight } from "lucide-react";
import { mockArticles, categoryInfo } from "@/lib/mock/education-data";
import { PageTransition } from "@/components/motion/page-transition";

export default function EducationPage() {
  const [filterCat, setFilterCat] = useState<string | null>(null);

  const filtered = filterCat
    ? mockArticles.filter((a) => a.category === filterCat)
    : mockArticles;

  return (
    <PageTransition className="mx-auto max-w-4xl space-y-6">
      <div className="flex items-center gap-3">
        <BookOpen className="h-6 w-6 text-primary" />
        <h1 className="font-heading text-2xl font-bold">衛教專區</h1>
      </div>

      {/* Category filter */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setFilterCat(null)}
          className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
            filterCat === null
              ? "bg-primary text-white"
              : "bg-muted text-muted-foreground hover:bg-primary/10"
          }`}
        >
          全部
        </button>
        {Object.entries(categoryInfo).map(([key, info]) => (
          <button
            key={key}
            onClick={() => setFilterCat(filterCat === key ? null : key)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
              filterCat === key
                ? "bg-primary text-white"
                : `${info.color} hover:opacity-80`
            }`}
          >
            {info.emoji} {info.zh}
          </button>
        ))}
      </div>

      {/* Articles */}
      <div className="space-y-3">
        {filtered.map((article) => {
          const cat = categoryInfo[article.category];
          return (
            <Link key={article.id} href={`/education/${article.slug}`}>
              <Card className="rounded-2xl border-border/50 shadow-sm transition-all hover:shadow-md hover:border-primary/20 cursor-pointer mb-3">
                <CardContent className="flex items-center gap-4 py-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/5 to-lavender/10 text-2xl shrink-0">
                    {article.coverEmoji}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <Badge className={`rounded-full text-[10px] ${cat?.color}`}>
                        {cat?.emoji} {cat?.zh}
                      </Badge>
                      <span className="flex items-center gap-1 text-[10px] text-muted-foreground">
                        <Clock className="h-3 w-3" /> {article.readTimeMin} 分鐘
                      </span>
                    </div>
                    <h3 className="mt-1 text-sm font-bold leading-snug line-clamp-1">
                      {article.titleZh}
                    </h3>
                    <p className="mt-0.5 text-xs text-muted-foreground line-clamp-2">
                      {article.summary}
                    </p>
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground shrink-0" />
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>
    </PageTransition>
  );
}
