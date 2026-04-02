"use client";

import { useTranslations } from "next-intl";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  Syringe,
  TrendingUp,
  FlaskConical,
  Plus,
  Stethoscope,
  BookOpen,
} from "lucide-react";
import { WaveDivider } from "@/components/layout/wave-divider";
import { BearNurse } from "@/components/illustrations/page-mascots";
import { PageTransition, StaggerContainer, StaggerItem, HoverLift } from "@/components/motion/page-transition";
import { useChild } from "@/providers/child-provider";
import {
  formatAge,
  daysUntil,
  getVisitsForChild,
  getGrowthDataForChild,
  getLabReportsForChild,
  getInjectionsForChild,
} from "@/lib/mock/data";
import Link from "next/link";

const diagnosisLabels: Record<string, { zh: string; color: string }> = {
  gh_deficiency: { zh: "生長激素缺乏", color: "bg-sky/20 text-sky" },
  short_stature: { zh: "身材矮小", color: "bg-lavender/20 text-lavender" },
  precocious_puberty: { zh: "性早熟", color: "bg-primary/20 text-primary" },
  obesity: { zh: "兒童肥胖", color: "bg-peach/20 text-peach" },
};

export default function ParentDashboard() {
  const t = useTranslations("dashboard");
  const { children, selectedChild, selectChild } = useChild();

  if (!selectedChild) return null;

  const visits = getVisitsForChild(selectedChild.id);
  const growth = getGrowthDataForChild(selectedChild.id);
  const labs = getLabReportsForChild(selectedChild.id);
  const injections = getInjectionsForChild(selectedChild.id);

  const latestGrowth = growth[growth.length - 1];
  const nextVisit = visits.find((v) => v.nextVisitDate)?.nextVisitDate;
  const latestLab = labs[0];
  const hasGH = selectedChild.diagnosisTags.includes("gh_deficiency");

  // March 2026 compliance
  const marchDays = 31;
  const marchInjections = injections.filter((i) =>
    i.injectionDate.startsWith("2026-03")
  ).length;
  const complianceRate = Math.round((marchInjections / marchDays) * 100);

  return (
    <PageTransition className="mx-auto max-w-5xl space-y-6">
      {/* Welcome + Child Selector */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary/10 via-peach/20 to-lemon/20 p-6">
        <div className="absolute -right-4 -top-4 opacity-80 pointer-events-none hidden sm:block">
          <BearNurse className="h-32 w-32" />
        </div>
        <h1 className="font-heading text-2xl font-bold text-foreground">
          {t("title")} 🌟
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {t("selectChild")}
        </p>

        <div className="mt-4 flex flex-wrap gap-3">
          {children.map((child) => (
            <button
              key={child.id}
              onClick={() => selectChild(child.id)}
              className={`flex items-center gap-3 rounded-2xl border-2 px-5 py-3 shadow-sm transition-all hover:shadow-md ${
                child.id === selectedChild.id
                  ? "border-primary bg-white"
                  : "border-transparent bg-white/60"
              }`}
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-lg">
                {child.avatar}
              </div>
              <div className="text-left">
                <div className="text-sm font-bold">{child.name}</div>
                <div className="text-xs text-muted-foreground">
                  {formatAge(child.dateOfBirth, "zh-TW")}
                </div>
              </div>
            </button>
          ))}
          <button className="flex items-center gap-2 rounded-2xl border-2 border-dashed border-muted-foreground/30 px-5 py-3 text-sm text-muted-foreground transition-colors hover:border-primary hover:text-primary">
            <Plus className="h-5 w-5" />
            {t("addChild")}
          </button>
        </div>

        {/* Diagnosis tags */}
        <div className="mt-3 flex flex-wrap gap-2">
          {selectedChild.diagnosisTags.map((tag) => {
            const info = diagnosisLabels[tag];
            return info ? (
              <Badge key={tag} className={`rounded-full ${info.color}`}>
                {info.zh}
              </Badge>
            ) : null;
          })}
        </div>
      </div>

      <WaveDivider color="var(--color-mint)" />

      {/* Quick Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Next Visit */}
        <Card className="rounded-2xl border-border/50 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {t("nextVisit")}
            </CardTitle>
            <Calendar className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {nextVisit ?? "--"}
            </div>
            {nextVisit && (
              <p className="text-xs text-primary">
                {t("daysLeft", { days: daysUntil(nextVisit) })}
              </p>
            )}
          </CardContent>
        </Card>

        {/* Today's Tasks */}
        <Card className="rounded-2xl border-border/50 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {t("today")}
            </CardTitle>
            <Syringe className="h-5 w-5 text-sky" />
          </CardHeader>
          <CardContent>
            {hasGH ? (
              <>
                <div className="text-2xl font-bold text-foreground">1</div>
                <p className="text-xs text-sky">GH 注射 21:00</p>
              </>
            ) : (
              <>
                <div className="text-2xl font-bold text-foreground">0</div>
                <p className="text-xs text-muted-foreground">無待辦事項</p>
              </>
            )}
          </CardContent>
        </Card>

        {/* Recent Lab */}
        <Card className="rounded-2xl border-border/50 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {t("recentLabs")}
            </CardTitle>
            <FlaskConical className="h-5 w-5 text-mint" />
          </CardHeader>
          <CardContent>
            {latestLab ? (
              <>
                <div className="text-2xl font-bold text-foreground">
                  {latestLab.results[0]?.testName}
                </div>
                <p className="text-xs text-muted-foreground">
                  {latestLab.results[0]?.value} {latestLab.results[0]?.unit}
                  {latestLab.results[0]?.isAbnormal ? (
                    <span className="ml-1 text-coral">異常</span>
                  ) : (
                    <span className="ml-1 text-mint">(正常)</span>
                  )}
                </p>
              </>
            ) : (
              <div className="text-sm text-muted-foreground">無檢驗資料</div>
            )}
          </CardContent>
        </Card>

        {/* Growth Velocity */}
        <Card className="rounded-2xl border-border/50 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              生長速率
            </CardTitle>
            <TrendingUp className="h-5 w-5 text-peach" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {latestGrowth?.growthVelocityCmYr ?? "--"}
            </div>
            <p className="text-xs text-muted-foreground">公分/年</p>
          </CardContent>
        </Card>
      </div>

      {/* GH Compliance (only for GH patients) */}
      {hasGH && (
        <Card className="rounded-2xl border-border/50 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-sm font-medium">
              注射順從性 (2026 年 3 月)
            </CardTitle>
            <Badge className="rounded-full bg-mint/20 text-mint">
              {complianceRate}%
            </Badge>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-3">
              <div className="h-3 flex-1 overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-mint to-sky transition-all"
                  style={{ width: `${complianceRate}%` }}
                />
              </div>
              <span className="text-sm text-muted-foreground">
                {marchInjections}/{marchDays} 天
              </span>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Quick Actions */}
      <div>
        <h2 className="mb-3 font-heading text-lg font-bold">
          {t("quickActions")}
        </h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <Link href="/injections">
            <Button
              variant="outline"
              className="h-auto w-full flex-col gap-2 rounded-2xl border-2 border-border/50 bg-white py-6 shadow-sm hover:border-primary hover:bg-primary/5"
            >
              <Syringe className="h-6 w-6 text-primary" />
              <span className="text-xs font-medium">{t("recordInjection")}</span>
            </Button>
          </Link>
          <Link href="/growth">
            <Button
              variant="outline"
              className="h-auto w-full flex-col gap-2 rounded-2xl border-2 border-border/50 bg-white py-6 shadow-sm hover:border-sky hover:bg-sky/5"
            >
              <TrendingUp className="h-6 w-6 text-sky" />
              <span className="text-xs font-medium">{t("viewGrowth")}</span>
            </Button>
          </Link>
          <Link href="/labs">
            <Button
              variant="outline"
              className="h-auto w-full flex-col gap-2 rounded-2xl border-2 border-border/50 bg-white py-6 shadow-sm hover:border-mint hover:bg-mint/10"
            >
              <FlaskConical className="h-6 w-6 text-mint" />
              <span className="text-xs font-medium">檢驗報告</span>
            </Button>
          </Link>
          <Link href="/visits">
            <Button
              variant="outline"
              className="h-auto w-full flex-col gap-2 rounded-2xl border-2 border-border/50 bg-white py-6 shadow-sm hover:border-lavender hover:bg-lavender/10"
            >
              <Stethoscope className="h-6 w-6 text-lavender" />
              <span className="text-xs font-medium">看診紀錄</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* Recent Visit Summary */}
      {visits[0] && (
        <Card className="rounded-2xl border-border/50 shadow-sm">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium">最近看診</CardTitle>
              <Link
                href="/visits"
                className="text-xs text-primary hover:underline"
              >
                查看全部
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-lavender/20">
                <Stethoscope className="h-5 w-5 text-lavender" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold">{visits[0].visitDate}</span>
                  <Badge
                    variant="outline"
                    className="rounded-full text-xs"
                  >
                    {visits[0].visitType === "follow_up" ? "回診" : "初診"}
                  </Badge>
                </div>
                <p className="mt-1 text-xs text-muted-foreground">
                  {visits[0].doctorName}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-foreground">
                  {visits[0].parentVisibleNotes}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </PageTransition>
  );
}
