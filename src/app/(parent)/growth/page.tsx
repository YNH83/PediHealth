"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useChild } from "@/providers/child-provider";
import {
  getGrowthDataForChild,
  getChildAgeMonths,
  twGrowthStandardsBoyHeight,
  twGrowthStandardsGirlHeight,
} from "@/lib/mock/data";
import {
  ComposedChart,
  Line,
  Area,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { TrendingUp, Ruler, Scale } from "lucide-react";
import { GiraffeRuler } from "@/components/illustrations/page-mascots";
import { PageTransition } from "@/components/motion/page-transition";

function buildChartData(
  sex: "male" | "female",
  measurements: { measuredAt: string; heightCm: number; dob: string }[]
) {
  const standards =
    sex === "male" ? twGrowthStandardsBoyHeight : twGrowthStandardsGirlHeight;

  const chartData = standards.map((s) => ({
    ageMonths: s.ageMonths,
    ageLabel: `${Math.floor(s.ageMonths / 12)}y${s.ageMonths % 12 ? s.ageMonths % 12 + "m" : ""}`,
    p3: s.p3,
    p10: s.p10,
    p25: s.p25,
    p50: s.p50,
    p75: s.p75,
    p90: s.p90,
    p97: s.p97,
    measured: null as number | null,
    date: null as string | null,
  }));

  // Add measurement points
  measurements.forEach((m) => {
    const dob = new Date(m.dob);
    const mDate = new Date(m.measuredAt);
    const ageMo =
      (mDate.getFullYear() - dob.getFullYear()) * 12 +
      (mDate.getMonth() - dob.getMonth());

    // Find closest standard point or insert
    let closest = chartData.reduce((prev, curr) =>
      Math.abs(curr.ageMonths - ageMo) < Math.abs(prev.ageMonths - ageMo)
        ? curr
        : prev
    );
    if (Math.abs(closest.ageMonths - ageMo) <= 3) {
      closest.measured = m.heightCm;
      closest.date = m.measuredAt;
    } else {
      chartData.push({
        ageMonths: ageMo,
        ageLabel: `${Math.floor(ageMo / 12)}y${ageMo % 12 ? ageMo % 12 + "m" : ""}`,
        p3: 0,
        p10: 0,
        p25: 0,
        p50: 0,
        p75: 0,
        p90: 0,
        p97: 0,
        measured: m.heightCm,
        date: m.measuredAt,
      });
    }
  });

  return chartData.sort((a, b) => a.ageMonths - b.ageMonths);
}

function GrowthCurveChart({
  sex,
  measurements,
  dob,
}: {
  sex: "male" | "female";
  measurements: { measuredAt: string; heightCm: number }[];
  dob: string;
}) {
  const data = buildChartData(
    sex,
    measurements.map((m) => ({ ...m, dob }))
  );

  return (
    <ResponsiveContainer width="100%" height={420}>
      <ComposedChart data={data} margin={{ top: 10, right: 20, bottom: 10, left: 10 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f0e6ef" />
        <XAxis
          dataKey="ageMonths"
          tickFormatter={(v) => `${Math.floor(v / 12)}y`}
          label={{ value: "年齡", position: "insideBottom", offset: -5 }}
          stroke="#999"
          fontSize={12}
        />
        <YAxis
          label={{ value: "身高 (cm)", angle: -90, position: "insideLeft" }}
          domain={["auto", "auto"]}
          stroke="#999"
          fontSize={12}
        />
        <Tooltip
          content={({ active, payload }) => {
            if (!active || !payload?.length) return null;
            const d = payload[0]?.payload;
            return (
              <div className="rounded-xl border border-border/50 bg-white p-3 shadow-lg">
                <p className="text-xs text-muted-foreground">{d.ageLabel}</p>
                {d.date && (
                  <p className="text-xs text-muted-foreground">{d.date}</p>
                )}
                {d.measured && (
                  <p className="text-sm font-bold text-primary">
                    實測: {d.measured} cm
                  </p>
                )}
                <div className="mt-1 space-y-0.5 text-xs text-muted-foreground">
                  {d.p97 > 0 && <p>P97: {d.p97}</p>}
                  {d.p50 > 0 && <p>P50: {d.p50}</p>}
                  {d.p3 > 0 && <p>P3: {d.p3}</p>}
                </div>
              </div>
            );
          }}
        />
        <Legend />

        {/* Percentile bands */}
        <Area
          dataKey="p97"
          stroke="none"
          fill="#FFD3B6"
          fillOpacity={0.15}
          name="P97"
          connectNulls={false}
        />
        <Area
          dataKey="p90"
          stroke="none"
          fill="#FFD3B6"
          fillOpacity={0.15}
          name="P90"
        />
        <Area
          dataKey="p75"
          stroke="none"
          fill="#A8E6CF"
          fillOpacity={0.15}
          name="P75"
        />
        <Area
          dataKey="p50"
          stroke="none"
          fill="#A8E6CF"
          fillOpacity={0.2}
          name="P50"
        />
        <Area
          dataKey="p25"
          stroke="none"
          fill="#A8E6CF"
          fillOpacity={0.15}
          name="P25"
        />
        <Area
          dataKey="p10"
          stroke="none"
          fill="#FFD3B6"
          fillOpacity={0.15}
          name="P10"
        />
        <Area
          dataKey="p3"
          stroke="none"
          fill="#FFD3B6"
          fillOpacity={0.15}
          name="P3"
        />

        {/* Percentile lines */}
        <Line dataKey="p97" stroke="#FFD3B6" strokeWidth={1} dot={false} strokeDasharray="4 2" name="P97" />
        <Line dataKey="p50" stroke="#A8E6CF" strokeWidth={2} dot={false} name="P50 (中位數)" />
        <Line dataKey="p3" stroke="#FFD3B6" strokeWidth={1} dot={false} strokeDasharray="4 2" name="P3" />

        {/* Measured points */}
        <Line
          dataKey="measured"
          stroke="#FF6B8A"
          strokeWidth={2.5}
          connectNulls
          name="實測身高"
          dot={{ fill: "#FF6B8A", r: 5, strokeWidth: 2, stroke: "#fff" }}
          activeDot={{ r: 7 }}
        />
      </ComposedChart>
    </ResponsiveContainer>
  );
}

export default function GrowthPage() {
  const t = useTranslations("growth");
  const { selectedChild } = useChild();
  const [tab, setTab] = useState("curve");

  if (!selectedChild) return null;

  const data = getGrowthDataForChild(selectedChild.id);
  const latest = data[data.length - 1];

  return (
    <PageTransition className="mx-auto max-w-5xl space-y-6">
      <div className="relative flex items-center justify-between">
        <div className="flex items-center gap-3">
          <GiraffeRuler className="hidden sm:block h-16 w-16" />
          <h1 className="font-heading text-2xl font-bold">{t("title")}</h1>
        </div>
        <Badge className="rounded-full bg-primary/10 text-primary text-sm px-3 py-1">
          {selectedChild.name}
        </Badge>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Card className="rounded-2xl border-border/50 shadow-sm">
          <CardContent className="pt-4 text-center">
            <Ruler className="mx-auto h-5 w-5 text-primary" />
            <div className="mt-1 text-xl font-bold">{latest?.heightCm ?? "--"}</div>
            <div className="text-xs text-muted-foreground">{t("height")} (cm)</div>
            <div className="text-xs text-primary">P{latest?.heightPercentile}</div>
          </CardContent>
        </Card>
        <Card className="rounded-2xl border-border/50 shadow-sm">
          <CardContent className="pt-4 text-center">
            <Scale className="mx-auto h-5 w-5 text-sky" />
            <div className="mt-1 text-xl font-bold">{latest?.weightKg ?? "--"}</div>
            <div className="text-xs text-muted-foreground">{t("weight")} (kg)</div>
            <div className="text-xs text-sky">P{latest?.weightPercentile}</div>
          </CardContent>
        </Card>
        <Card className="rounded-2xl border-border/50 shadow-sm">
          <CardContent className="pt-4 text-center">
            <TrendingUp className="mx-auto h-5 w-5 text-mint" />
            <div className="mt-1 text-xl font-bold">
              {latest?.growthVelocityCmYr ?? "--"}
            </div>
            <div className="text-xs text-muted-foreground">{t("growthVelocity")}</div>
            <div className="text-xs text-mint">{t("unit.cmPerYear")}</div>
          </CardContent>
        </Card>
        <Card className="rounded-2xl border-border/50 shadow-sm">
          <CardContent className="pt-4 text-center">
            <div className="mx-auto text-lg">🦴</div>
            <div className="mt-1 text-xl font-bold">
              {latest?.boneAgeYears ?? "--"}
            </div>
            <div className="text-xs text-muted-foreground">{t("boneAge")} (年)</div>
            {latest?.predictedAdultHeightCm && (
              <div className="text-xs text-lavender">
                PAH: {latest.predictedAdultHeightCm} cm
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Tabs: Curve / Table */}
      <Tabs value={tab} onValueChange={setTab}>
        <TabsList className="rounded-xl">
          <TabsTrigger value="curve" className="rounded-lg">
            {t("curve")}
          </TabsTrigger>
          <TabsTrigger value="table" className="rounded-lg">
            {t("measurements")}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="curve">
          <Card className="rounded-2xl border-border/50 shadow-sm">
            <CardHeader>
              <CardTitle className="text-sm">
                {t("chartTitle", { name: selectedChild.name })} ({t("height")})
              </CardTitle>
              <p className="text-xs text-muted-foreground">
                台灣兒童生長標準曲線 (P3-P97)
              </p>
            </CardHeader>
            <CardContent>
              <GrowthCurveChart
                sex={selectedChild.sex}
                measurements={data.map((d) => ({
                  measuredAt: d.measuredAt,
                  heightCm: d.heightCm,
                }))}
                dob={selectedChild.dateOfBirth}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="table">
          <Card className="rounded-2xl border-border/50 shadow-sm">
            <CardContent className="pt-6">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b text-left text-muted-foreground">
                      <th className="pb-3 pr-4">日期</th>
                      <th className="pb-3 pr-4">{t("height")} (cm)</th>
                      <th className="pb-3 pr-4">{t("weight")} (kg)</th>
                      <th className="pb-3 pr-4">BMI</th>
                      <th className="pb-3 pr-4">{t("growthVelocity")}</th>
                      <th className="pb-3 pr-4">{t("boneAge")}</th>
                      <th className="pb-3">{t("predictedHeight")}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[...data].reverse().map((row) => (
                      <tr key={row.id} className="border-b border-border/30">
                        <td className="py-3 pr-4 font-medium">
                          {row.measuredAt}
                        </td>
                        <td className="py-3 pr-4">
                          {row.heightCm}
                          <span className="ml-1 text-xs text-primary">
                            P{row.heightPercentile}
                          </span>
                        </td>
                        <td className="py-3 pr-4">
                          {row.weightKg}
                          <span className="ml-1 text-xs text-sky">
                            P{row.weightPercentile}
                          </span>
                        </td>
                        <td className="py-3 pr-4">{row.bmi}</td>
                        <td className="py-3 pr-4">
                          {row.growthVelocityCmYr ?? "--"}
                        </td>
                        <td className="py-3 pr-4">
                          {row.boneAgeYears ?? "--"}
                        </td>
                        <td className="py-3">
                          {row.predictedAdultHeightCm ?? "--"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Bone Age Comparison */}
      {latest?.boneAgeYears && (
        <Card className="rounded-2xl border-border/50 shadow-sm">
          <CardHeader>
            <CardTitle className="text-sm">
              {t("boneAge")} vs {t("actualAge")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-6">
              <div className="flex-1">
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">{t("actualAge")}</span>
                  <span className="font-bold">
                    {(getChildAgeMonths(selectedChild.dateOfBirth) / 12).toFixed(
                      1
                    )}{" "}
                    歲
                  </span>
                </div>
                <div className="h-4 overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full rounded-full bg-sky"
                    style={{
                      width: `${Math.min(
                        (getChildAgeMonths(selectedChild.dateOfBirth) /
                          12 /
                          18) *
                          100,
                        100
                      )}%`,
                    }}
                  />
                </div>
              </div>
              <div className="flex-1">
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">{t("boneAge")}</span>
                  <span className="font-bold">{latest.boneAgeYears} 歲</span>
                </div>
                <div className="h-4 overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full rounded-full bg-lavender"
                    style={{
                      width: `${Math.min(
                        (latest.boneAgeYears / 18) * 100,
                        100
                      )}%`,
                    }}
                  />
                </div>
              </div>
            </div>
            <p className="mt-3 text-xs text-muted-foreground">
              骨齡落後實際年齡約{" "}
              <span className="font-bold text-lavender">
                {(
                  getChildAgeMonths(selectedChild.dateOfBirth) / 12 -
                  latest.boneAgeYears
                ).toFixed(1)}
              </span>{" "}
              年
            </p>
          </CardContent>
        </Card>
      )}
    </PageTransition>
  );
}
