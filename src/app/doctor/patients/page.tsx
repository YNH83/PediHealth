"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Search,
  TrendingUp,
  Syringe,
  AlertCircle,
  CheckCircle2,
  ChevronRight,
} from "lucide-react";
import { getPatientSummaries } from "@/lib/mock/doctor-data";
import { formatAge } from "@/lib/mock/data";
import { CatDoctor } from "@/components/illustrations/page-mascots";
import { PageTransition } from "@/components/motion/page-transition";

const diagnosisLabels: Record<string, { zh: string; color: string }> = {
  gh_deficiency: { zh: "GH 缺乏", color: "bg-sky/20 text-sky" },
  short_stature: { zh: "矮小", color: "bg-lavender/20 text-lavender" },
  precocious_puberty: { zh: "性早熟", color: "bg-primary/20 text-primary" },
  obesity: { zh: "肥胖", color: "bg-peach/30 text-orange-600" },
};

const statusConfig: Record<string, { label: string; color: string; icon: typeof CheckCircle2 }> = {
  active: { label: "積極治療", color: "bg-mint/20 text-green-700", icon: TrendingUp },
  stable: { label: "穩定", color: "bg-sky/20 text-sky", icon: CheckCircle2 },
  attention: { label: "需注意", color: "bg-coral/20 text-coral", icon: AlertCircle },
};

export default function PatientsPage() {
  const t = useTranslations("nav");
  const [search, setSearch] = useState("");
  const [filterTag, setFilterTag] = useState<string | null>(null);

  const summaries = getPatientSummaries();

  const filtered = summaries.filter((s) => {
    const matchSearch =
      search === "" ||
      s.child.name.includes(search) ||
      s.child.id.includes(search);
    const matchTag =
      filterTag === null || s.child.diagnosisTags.includes(filterTag);
    return matchSearch && matchTag;
  });

  const allTags = ["gh_deficiency", "short_stature", "precocious_puberty", "obesity"];

  return (
    <PageTransition className="mx-auto max-w-5xl space-y-6">
      <div className="flex items-center gap-3">
        <CatDoctor className="h-14 w-14" />
        <h1 className="font-heading text-2xl font-bold">{t("patients")}</h1>
        <Badge className="ml-2 rounded-full bg-sky/10 text-sky">
          {summaries.length} 位
        </Badge>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="搜尋患者姓名..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="rounded-xl pl-10"
          />
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setFilterTag(null)}
            className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
              filterTag === null
                ? "bg-sky text-white"
                : "bg-muted text-muted-foreground hover:bg-sky/10"
            }`}
          >
            全部
          </button>
          {allTags.map((tag) => {
            const info = diagnosisLabels[tag];
            return (
              <button
                key={tag}
                onClick={() => setFilterTag(filterTag === tag ? null : tag)}
                className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                  filterTag === tag
                    ? "bg-sky text-white"
                    : `${info?.color} hover:opacity-80`
                }`}
              >
                {info?.zh}
              </button>
            );
          })}
        </div>
      </div>

      {/* Patient Cards */}
      <div className="space-y-3">
        {filtered.map((summary) => {
          const { child } = summary;
          const st = statusConfig[summary.status];

          return (
            <Link
              key={child.id}
              href={`/doctor/patients/${child.id}`}
            >
              <Card className="rounded-2xl border-border/50 shadow-sm transition-all hover:shadow-md hover:border-sky/30 cursor-pointer mb-3">
                <CardContent className="flex items-center gap-4 py-4">
                  {/* Avatar */}
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-sky/10 to-lavender/10 text-2xl">
                    {child.avatar}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-base font-bold">{child.name}</span>
                      <span className="text-xs text-muted-foreground">
                        {child.sex === "male" ? "♂" : "♀"}{" "}
                        {formatAge(child.dateOfBirth, "zh-TW")}
                      </span>
                      <Badge className={`rounded-full text-xs ${st.color}`}>
                        <st.icon className="mr-1 h-3 w-3" />
                        {st.label}
                      </Badge>
                    </div>

                    {/* Diagnosis tags */}
                    <div className="mt-1 flex flex-wrap gap-1.5">
                      {child.diagnosisTags.map((tag) => {
                        const info = diagnosisLabels[tag];
                        return info ? (
                          <Badge
                            key={tag}
                            className={`rounded-full text-[10px] ${info.color}`}
                          >
                            {info.zh}
                          </Badge>
                        ) : null;
                      })}
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="hidden sm:flex items-center gap-6 text-center">
                    {summary.latestHeightCm && (
                      <div>
                        <div className="text-sm font-bold">
                          {summary.latestHeightCm}
                        </div>
                        <div className="text-[10px] text-muted-foreground">
                          身高 cm
                        </div>
                      </div>
                    )}
                    {summary.growthVelocity && (
                      <div>
                        <div className="text-sm font-bold text-mint">
                          {summary.growthVelocity}
                        </div>
                        <div className="text-[10px] text-muted-foreground">
                          cm/yr
                        </div>
                      </div>
                    )}
                    {summary.injectionCompliance !== null && (
                      <div>
                        <div
                          className={`text-sm font-bold ${
                            summary.injectionCompliance >= 90
                              ? "text-mint"
                              : "text-coral"
                          }`}
                        >
                          {summary.injectionCompliance}%
                        </div>
                        <div className="text-[10px] text-muted-foreground">
                          <Syringe className="inline h-3 w-3" /> 順從
                        </div>
                      </div>
                    )}
                    {summary.lastVisitDate && (
                      <div>
                        <div className="text-xs font-medium">
                          {summary.lastVisitDate}
                        </div>
                        <div className="text-[10px] text-muted-foreground">
                          最近看診
                        </div>
                      </div>
                    )}
                  </div>

                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>
    </PageTransition>
  );
}
