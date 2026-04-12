"use client";

import { useTranslations } from "next-intl";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useChild } from "@/providers/child-provider";
import {
  getGrowthDataForChild,
  getChildAgeMonths,
} from "@/lib/mock/data";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import {
  TrendingUp,
  Target,
  Ruler,
  Brain,
  ArrowUpRight,
  ArrowDownRight,
  Info,
} from "lucide-react";
import { PredictionOwl } from "@/components/illustrations/page-mascots";
import {
  PageTransition,
  StaggerContainer,
  StaggerItem,
} from "@/components/motion/page-transition";

function getProgressStatus(predicted: number, target: number) {
  const gap = predicted - target;
  if (gap >= -1) return "good";
  if (gap >= -5) return "moderate";
  return "behind";
}

export default function PredictionPage() {
  const t = useTranslations("prediction");
  const { selectedChild } = useChild();

  if (!selectedChild) return null;

  const data = getGrowthDataForChild(selectedChild.id);
  const latest = data[data.length - 1];
  const hasPrediction = latest?.predictedAdultHeightCm != null;

  if (!hasPrediction) {
    return (
      <PageTransition className="mx-auto max-w-5xl space-y-6">
        <h1 className="font-heading text-2xl font-bold">{t("title")}</h1>
        <Card className="rounded-2xl border-border/50 shadow-sm">
          <CardContent className="flex flex-col items-center justify-center py-16 text-center">
            <PredictionOwl className="mb-4 h-24 w-24" />
            <p className="text-muted-foreground">{t("noData")}</p>
          </CardContent>
        </Card>
      </PageTransition>
    );
  }

  const predictedHeight = latest.predictedAdultHeightCm!;
  const targetHeight = selectedChild.targetHeightCm;
  const actualAgeYears = getChildAgeMonths(selectedChild.dateOfBirth) / 12;
  const remainingGrowth = predictedHeight - latest.heightCm;
  const heightGap = predictedHeight - targetHeight;
  const status = getProgressStatus(predictedHeight, targetHeight);

  // Build trend data from historical predictions
  const trendData = data
    .filter((d) => d.predictedAdultHeightCm != null)
    .map((d) => ({
      date: d.measuredAt.slice(0, 7),
      pah: d.predictedAdultHeightCm,
      height: d.heightCm,
    }));

  return (
    <PageTransition className="mx-auto max-w-5xl space-y-6">
      {/* Header */}
      <div className="relative flex items-center justify-between">
        <div className="flex items-center gap-3">
          <PredictionOwl className="hidden sm:block h-16 w-16" />
          <div>
            <h1 className="font-heading text-2xl font-bold">{t("title")}</h1>
            <p className="text-xs text-muted-foreground sm:text-sm">
              {t("subtitle")}
            </p>
          </div>
        </div>
        <Badge className="rounded-full bg-primary/10 text-primary text-sm px-3 py-1">
          {selectedChild.name}
        </Badge>
      </div>

      {/* Main Prediction Card - Hero */}
      <Card className="relative overflow-hidden rounded-2xl border-border/50 shadow-sm">
        <div className="absolute inset-0 bg-gradient-to-br from-lavender/10 via-transparent to-mint/10 pointer-events-none" />
        <CardContent className="relative pt-6">
          <div className="flex flex-col items-center text-center">
            <p className="text-sm text-muted-foreground">
              {t("predictedHeight")}
            </p>
            <div className="mt-1 flex items-baseline gap-1">
              <span className="text-5xl font-bold text-primary sm:text-6xl">
                {predictedHeight}
              </span>
              <span className="text-lg text-muted-foreground">{t("cm")}</span>
            </div>
            <div className="mt-3 flex items-center gap-2">
              <Target className="h-4 w-4 text-lavender" />
              <span className="text-sm text-muted-foreground">
                {t("targetHeight")}: {targetHeight} {t("cm")}
              </span>
            </div>
            <Badge
              className={`mt-3 rounded-full ${
                status === "good"
                  ? "bg-mint/20 text-mint"
                  : status === "moderate"
                    ? "bg-lemon/30 text-yellow-600"
                    : "bg-coral/20 text-coral"
              }`}
            >
              {heightGap >= 0 ? (
                <ArrowUpRight className="mr-1 h-3 w-3" />
              ) : (
                <ArrowDownRight className="mr-1 h-3 w-3" />
              )}
              {heightGap >= 0 ? "+" : ""}
              {heightGap.toFixed(1)} {t("cm")} {t("heightGap")}
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Key Metrics Grid - Mobile 2 cols */}
      <StaggerContainer className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StaggerItem>
          <Card className="rounded-2xl border-border/50 shadow-sm">
            <CardContent className="pt-4 text-center">
              <Ruler className="mx-auto h-5 w-5 text-primary" />
              <div className="mt-1 text-xl font-bold">{latest.heightCm}</div>
              <div className="text-xs text-muted-foreground">
                {t("currentHeight")}
              </div>
              <div className="text-xs text-primary">
                P{latest.heightPercentile}
              </div>
            </CardContent>
          </Card>
        </StaggerItem>
        <StaggerItem>
          <Card className="rounded-2xl border-border/50 shadow-sm">
            <CardContent className="pt-4 text-center">
              <Brain className="mx-auto h-5 w-5 text-lavender" />
              <div className="mt-1 text-xl font-bold">
                {latest.boneAgeYears ?? "--"}
              </div>
              <div className="text-xs text-muted-foreground">
                {t("boneAge")} ({t("years")})
              </div>
              <div className="text-xs text-lavender">
                -{(actualAgeYears - (latest.boneAgeYears ?? actualAgeYears)).toFixed(1)} {t("years")}
              </div>
            </CardContent>
          </Card>
        </StaggerItem>
        <StaggerItem>
          <Card className="rounded-2xl border-border/50 shadow-sm">
            <CardContent className="pt-4 text-center">
              <TrendingUp className="mx-auto h-5 w-5 text-mint" />
              <div className="mt-1 text-xl font-bold">
                {latest.growthVelocityCmYr ?? "--"}
              </div>
              <div className="text-xs text-muted-foreground">
                {t("growthVelocity")}
              </div>
              <div className="text-xs text-mint">{t("cmPerYear")}</div>
            </CardContent>
          </Card>
        </StaggerItem>
        <StaggerItem>
          <Card className="rounded-2xl border-border/50 shadow-sm">
            <CardContent className="pt-4 text-center">
              <ArrowUpRight className="mx-auto h-5 w-5 text-sky" />
              <div className="mt-1 text-xl font-bold">
                {remainingGrowth.toFixed(1)}
              </div>
              <div className="text-xs text-muted-foreground">
                {t("remainingGrowth")}
              </div>
              <div className="text-xs text-sky">{t("cm")}</div>
            </CardContent>
          </Card>
        </StaggerItem>
      </StaggerContainer>

      {/* Prediction Trend Chart */}
      <Card className="rounded-2xl border-border/50 shadow-sm">
        <CardHeader>
          <CardTitle className="text-sm">{t("predictionTrend")}</CardTitle>
          <p className="text-xs text-muted-foreground">
            {t("predictionTrendDesc")}
          </p>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart
              data={trendData}
              margin={{ top: 10, right: 10, bottom: 10, left: -10 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f0e6ef" />
              <XAxis
                dataKey="date"
                fontSize={11}
                stroke="#999"
                tickFormatter={(v) => {
                  const parts = v.split("-");
                  return `${parts[0].slice(2)}/${parts[1]}`;
                }}
              />
              <YAxis
                domain={["auto", "auto"]}
                fontSize={11}
                stroke="#999"
                width={40}
              />
              <Tooltip
                content={({ active, payload }) => {
                  if (!active || !payload?.length) return null;
                  const d = payload[0]?.payload;
                  return (
                    <div className="rounded-xl border border-border/50 bg-white p-3 shadow-lg">
                      <p className="text-xs text-muted-foreground">{d.date}</p>
                      <p className="text-sm font-bold text-primary">
                        PAH: {d.pah} cm
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {t("currentHeight")}: {d.height} cm
                      </p>
                    </div>
                  );
                }}
              />
              <ReferenceLine
                y={targetHeight}
                stroke="#D4A5FF"
                strokeDasharray="6 3"
                label={{
                  value: `${t("targetHeight")} ${targetHeight}`,
                  position: "insideTopRight",
                  fill: "#D4A5FF",
                  fontSize: 11,
                }}
              />
              <Line
                dataKey="pah"
                stroke="#FF6B8A"
                strokeWidth={2.5}
                dot={{ fill: "#FF6B8A", r: 4, strokeWidth: 2, stroke: "#fff" }}
                activeDot={{ r: 6 }}
                name="PAH"
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Genetic Factor + Progress */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {/* Genetic Factor */}
        <Card className="rounded-2xl border-border/50 shadow-sm">
          <CardHeader>
            <CardTitle className="text-sm">{t("geneticFactor")}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">{t("fatherHeight")}</span>
              <span className="font-bold">
                {selectedChild.fatherHeightCm} {t("cm")}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">{t("motherHeight")}</span>
              <span className="font-bold">
                {selectedChild.motherHeightCm} {t("cm")}
              </span>
            </div>
            <div className="border-t border-border/30 pt-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">
                  {t("midParentalHeight")}
                </span>
                <span className="font-bold text-lavender">
                  {((selectedChild.fatherHeightCm + selectedChild.motherHeightCm) / 2 + (selectedChild.sex === "male" ? 6.5 : -6.5)).toFixed(1)}{" "}
                  {t("cm")}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* On-Track Progress */}
        <Card className="rounded-2xl border-border/50 shadow-sm">
          <CardHeader>
            <CardTitle className="text-sm">{t("onTrack")}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Progress bar: predicted vs target */}
            <div>
              <div className="mb-2 flex items-center justify-between text-sm">
                <span className="text-muted-foreground">
                  {t("predictedHeight")}
                </span>
                <span className="font-bold text-primary">
                  {predictedHeight} {t("cm")}
                </span>
              </div>
              <div className="h-4 overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-primary to-mint transition-all"
                  style={{
                    width: `${Math.min((predictedHeight / targetHeight) * 100, 100)}%`,
                  }}
                />
              </div>
            </div>
            <div>
              <div className="mb-2 flex items-center justify-between text-sm">
                <span className="text-muted-foreground">
                  {t("targetHeight")}
                </span>
                <span className="font-bold text-lavender">
                  {targetHeight} {t("cm")}
                </span>
              </div>
              <div className="h-4 overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full rounded-full bg-lavender transition-all"
                  style={{ width: "100%" }}
                />
              </div>
            </div>
            <p
              className={`text-xs ${
                status === "good"
                  ? "text-mint"
                  : status === "moderate"
                    ? "text-yellow-600"
                    : "text-coral"
              }`}
            >
              {t(
                status === "good"
                  ? "progressGood"
                  : status === "moderate"
                    ? "progressModerate"
                    : "progressBehind"
              )}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Bone Age Comparison */}
      {latest.boneAgeYears != null && (
        <Card className="rounded-2xl border-border/50 shadow-sm">
          <CardHeader>
            <CardTitle className="text-sm">
              {t("boneAge")} vs {t("actualAge")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
              <div className="flex-1">
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">
                    {t("actualAge")}
                  </span>
                  <span className="font-bold">
                    {actualAgeYears.toFixed(1)} {t("years")}
                  </span>
                </div>
                <div className="h-4 overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full rounded-full bg-sky"
                    style={{
                      width: `${Math.min((actualAgeYears / 18) * 100, 100)}%`,
                    }}
                  />
                </div>
              </div>
              <div className="flex-1">
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">{t("boneAge")}</span>
                  <span className="font-bold">
                    {latest.boneAgeYears} {t("years")}
                  </span>
                </div>
                <div className="h-4 overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full rounded-full bg-lavender"
                    style={{
                      width: `${Math.min((latest.boneAgeYears / 18) * 100, 100)}%`,
                    }}
                  />
                </div>
              </div>
            </div>
            <p className="mt-3 text-xs text-muted-foreground">
              {t("boneAgeDelay")}{" "}
              <span className="font-bold text-lavender">
                {(actualAgeYears - latest.boneAgeYears).toFixed(1)}
              </span>{" "}
              {t("years")}
            </p>
          </CardContent>
        </Card>
      )}

      {/* Disclaimer */}
      <div className="flex items-start gap-2 rounded-2xl bg-lemon/20 p-4 text-xs text-muted-foreground">
        <Info className="mt-0.5 h-4 w-4 shrink-0 text-yellow-600" />
        <p>{t("disclaimer")}</p>
      </div>
    </PageTransition>
  );
}
