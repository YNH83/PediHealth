"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useChild } from "@/providers/child-provider";
import { getLabReportsForChild, type LabReport } from "@/lib/mock/data";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  ReferenceArea,
} from "recharts";
import {
  FlaskConical,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
} from "lucide-react";
import { OwlScientist } from "@/components/illustrations/page-mascots";
import { PageTransition } from "@/components/motion/page-transition";

const categoryLabels: Record<string, { zh: string; color: string }> = {
  hormone: { zh: "荷爾蒙", color: "bg-primary/20 text-primary" },
  thyroid: { zh: "甲狀腺", color: "bg-sky/20 text-sky" },
  metabolic: { zh: "代謝", color: "bg-mint/20 text-mint" },
  lipid: { zh: "血脂", color: "bg-lemon/30 text-yellow-600" },
  liver: { zh: "肝功能", color: "bg-peach/20 text-peach" },
  cbc: { zh: "血液常規", color: "bg-lavender/20 text-lavender" },
};

function TrendChart({
  testName,
  reports,
}: {
  testName: string;
  reports: LabReport[];
}) {
  const points: {
    date: string;
    value: number;
    low: number;
    high: number;
  }[] = [];

  reports.forEach((r) => {
    r.results.forEach((res) => {
      if (res.testName === testName) {
        points.push({
          date: r.reportDate,
          value: res.value,
          low: res.referenceRangeLow,
          high: res.referenceRangeHigh,
        });
      }
    });
  });

  if (points.length < 2) return null;

  const sorted = [...points].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );
  const low = sorted[0]?.low ?? 0;
  const high = sorted[0]?.high ?? 0;

  return (
    <div className="mt-4">
      <h4 className="mb-2 text-sm font-medium">{testName} 趨勢</h4>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={sorted} margin={{ top: 5, right: 20, bottom: 5, left: 10 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0e6ef" />
          <XAxis dataKey="date" fontSize={11} stroke="#999" />
          <YAxis fontSize={11} stroke="#999" />
          <Tooltip
            content={({ active, payload }) => {
              if (!active || !payload?.length) return null;
              const d = payload[0]?.payload;
              return (
                <div className="rounded-xl border border-border/50 bg-white p-2 shadow-md text-xs">
                  <p>{d.date}</p>
                  <p className="font-bold text-primary">{d.value}</p>
                  <p className="text-muted-foreground">
                    正常: {d.low} - {d.high}
                  </p>
                </div>
              );
            }}
          />
          <ReferenceArea
            y1={low}
            y2={high}
            fill="#A8E6CF"
            fillOpacity={0.15}
          />
          <ReferenceLine y={low} stroke="#A8E6CF" strokeDasharray="3 3" />
          <ReferenceLine y={high} stroke="#A8E6CF" strokeDasharray="3 3" />
          <Line
            dataKey="value"
            stroke="#FF6B8A"
            strokeWidth={2}
            dot={{ fill: "#FF6B8A", r: 4, stroke: "#fff", strokeWidth: 2 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default function LabsPage() {
  const t = useTranslations("labs");
  const { selectedChild } = useChild();
  const [tab, setTab] = useState("reports");
  const [selectedTest, setSelectedTest] = useState<string | null>(null);

  if (!selectedChild) return null;

  const reports = getLabReportsForChild(selectedChild.id);

  // Collect all unique test names for trend view
  const allTestNames = new Set<string>();
  reports.forEach((r) => r.results.forEach((res) => allTestNames.add(res.testName)));

  return (
    <PageTransition className="mx-auto max-w-5xl space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <OwlScientist className="hidden sm:block h-16 w-16" />
          <h1 className="font-heading text-2xl font-bold">{t("title")}</h1>
        </div>
        <Badge className="rounded-full bg-primary/10 text-primary text-sm px-3 py-1">
          {selectedChild.name}
        </Badge>
      </div>

      <Tabs value={tab} onValueChange={setTab}>
        <TabsList className="rounded-xl">
          <TabsTrigger value="reports" className="rounded-lg">
            <FlaskConical className="mr-1.5 h-4 w-4" />
            報告列表
          </TabsTrigger>
          <TabsTrigger value="trend" className="rounded-lg">
            <TrendingUp className="mr-1.5 h-4 w-4" />
            {t("trend")}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="reports" className="space-y-4">
          {reports.map((report) => {
            const cat = categoryLabels[report.category];
            return (
              <Card
                key={report.id}
                className="rounded-2xl border-border/50 shadow-sm"
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-mint/20">
                        <FlaskConical className="h-5 w-5 text-mint" />
                      </div>
                      <div>
                        <div className="text-sm font-bold">
                          {report.reportDate}
                        </div>
                      </div>
                    </div>
                    <Badge className={`rounded-full text-xs ${cat?.color}`}>
                      {cat?.zh}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {report.results.map((result) => (
                      <div
                        key={result.id}
                        className={`flex items-center justify-between rounded-xl px-4 py-2.5 ${
                          result.isAbnormal ? "bg-coral/5" : "bg-muted/30"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          {result.isAbnormal ? (
                            <AlertTriangle className="h-4 w-4 text-coral" />
                          ) : (
                            <CheckCircle2 className="h-4 w-4 text-mint" />
                          )}
                          <span className="text-sm font-medium">
                            {result.testName}
                          </span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span
                            className={`text-sm font-bold ${
                              result.isAbnormal ? "text-coral" : "text-foreground"
                            }`}
                          >
                            {result.value} {result.unit}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            ({result.referenceRangeLow} - {result.referenceRangeHigh})
                          </span>
                          {result.isAbnormal && (
                            <Badge className="rounded-full bg-coral/20 text-coral text-xs">
                              {result.flag === "low" ? "偏低" : "偏高"}
                            </Badge>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </TabsContent>

        <TabsContent value="trend">
          <Card className="rounded-2xl border-border/50 shadow-sm">
            <CardHeader>
              <CardTitle className="text-sm">選擇檢驗項目</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {[...allTestNames].map((name) => (
                  <button
                    key={name}
                    onClick={() => setSelectedTest(name)}
                    className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                      selectedTest === name
                        ? "bg-primary text-white"
                        : "bg-muted text-muted-foreground hover:bg-primary/10"
                    }`}
                  >
                    {name}
                  </button>
                ))}
              </div>

              {selectedTest && (
                <TrendChart testName={selectedTest} reports={reports} />
              )}

              {!selectedTest && (
                <p className="mt-4 text-center text-sm text-muted-foreground">
                  請選擇一個檢驗項目查看趨勢
                </p>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </PageTransition>
  );
}
