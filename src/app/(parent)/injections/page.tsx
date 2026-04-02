"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useChild } from "@/providers/child-provider";
import {
  getInjectionsForChild,
  mockGHPrescription,
  type InjectionLog,
} from "@/lib/mock/data";
import {
  Syringe,
  Calendar as CalendarIcon,
  CheckCircle2,
  XCircle,
  BarChart3,
} from "lucide-react";
import { BraveBunny } from "@/components/illustrations/page-mascots";
import { PageTransition } from "@/components/motion/page-transition";

const siteLabels: Record<string, string> = {
  left_thigh: "左大腿",
  right_thigh: "右大腿",
  left_abdomen: "左腹部",
  right_abdomen: "右腹部",
  left_arm: "左手臂",
  right_arm: "右手臂",
  left_buttock: "左臀部",
  right_buttock: "右臀部",
};

const siteColors: Record<string, string> = {
  left_thigh: "#FF6B8A",
  right_thigh: "#5BC0EB",
  left_abdomen: "#A8E6CF",
  right_abdomen: "#D4A5FF",
  left_arm: "#FFD3B6",
  right_arm: "#FFD93D",
};

function InjectionBodyMap({ logs }: { logs: InjectionLog[] }) {
  const siteCounts: Record<string, number> = {};
  logs.forEach((l) => {
    siteCounts[l.injectionSite] = (siteCounts[l.injectionSite] || 0) + 1;
  });

  const maxCount = Math.max(...Object.values(siteCounts), 1);

  const sites = [
    { id: "left_arm", x: 28, y: 38, label: "左臂" },
    { id: "right_arm", x: 72, y: 38, label: "右臂" },
    { id: "left_abdomen", x: 38, y: 55, label: "左腹" },
    { id: "right_abdomen", x: 62, y: 55, label: "右腹" },
    { id: "left_thigh", x: 38, y: 75, label: "左腿" },
    { id: "right_thigh", x: 62, y: 75, label: "右腿" },
  ];

  return (
    <div className="relative mx-auto w-48">
      {/* Simple body outline */}
      <svg viewBox="0 0 100 100" className="w-full">
        {/* Head */}
        <circle cx="50" cy="12" r="8" fill="#FFD3B6" opacity={0.5} />
        {/* Body */}
        <rect x="38" y="22" width="24" height="30" rx="6" fill="#FFD3B6" opacity={0.3} />
        {/* Arms */}
        <rect x="22" y="25" width="14" height="22" rx="5" fill="#FFD3B6" opacity={0.3} />
        <rect x="64" y="25" width="14" height="22" rx="5" fill="#FFD3B6" opacity={0.3} />
        {/* Legs */}
        <rect x="38" y="54" width="10" height="30" rx="4" fill="#FFD3B6" opacity={0.3} />
        <rect x="52" y="54" width="10" height="30" rx="4" fill="#FFD3B6" opacity={0.3} />

        {/* Injection site markers */}
        {sites.map((site) => {
          const count = siteCounts[site.id] || 0;
          const opacity = count > 0 ? 0.4 + (count / maxCount) * 0.6 : 0.15;
          const color = siteColors[site.id] || "#FF6B8A";
          return (
            <g key={site.id}>
              <circle
                cx={site.x}
                cy={site.y}
                r={5 + (count / maxCount) * 3}
                fill={color}
                opacity={opacity}
                stroke={color}
                strokeWidth={count > 0 ? 1.5 : 0}
              />
              {count > 0 && (
                <text
                  x={site.x}
                  y={site.y + 1.5}
                  textAnchor="middle"
                  fontSize="4"
                  fontWeight="bold"
                  fill="#fff"
                >
                  {count}
                </text>
              )}
            </g>
          );
        })}
      </svg>
      {/* Legend */}
      <div className="mt-2 flex flex-wrap justify-center gap-1.5">
        {sites.map((s) => (
          <span key={s.id} className="text-[10px] text-muted-foreground">
            {s.label}: {siteCounts[s.id] || 0}
          </span>
        ))}
      </div>
    </div>
  );
}

function MonthCalendar({
  year,
  month,
  logs,
}: {
  year: number;
  month: number;
  logs: InjectionLog[];
}) {
  const daysInMonth = new Date(year, month, 0).getDate();
  const firstDay = new Date(year, month - 1, 1).getDay();
  const logDates = new Set(
    logs.map((l) => parseInt(l.injectionDate.split("-")[2]))
  );

  const weeks: (number | null)[][] = [];
  let week: (number | null)[] = Array(firstDay).fill(null);
  for (let d = 1; d <= daysInMonth; d++) {
    week.push(d);
    if (week.length === 7) {
      weeks.push(week);
      week = [];
    }
  }
  if (week.length > 0) {
    while (week.length < 7) week.push(null);
    weeks.push(week);
  }

  const today = new Date();
  const isCurrentMonth = today.getFullYear() === year && today.getMonth() + 1 === month;
  const todayDate = isCurrentMonth ? today.getDate() : -1;

  return (
    <div>
      <div className="mb-2 text-center text-sm font-bold">
        {year} 年 {month} 月
      </div>
      <div className="grid grid-cols-7 gap-1 text-center text-xs">
        {["日", "一", "二", "三", "四", "五", "六"].map((d) => (
          <div key={d} className="pb-1 text-muted-foreground font-medium">
            {d}
          </div>
        ))}
        {weeks.flat().map((day, i) => {
          if (day === null)
            return <div key={`e-${i}`} className="h-8" />;

          const done = logDates.has(day);
          const isToday = day === todayDate;
          const isPast = isCurrentMonth
            ? day < todayDate
            : year < today.getFullYear() ||
              (year === today.getFullYear() && month < today.getMonth() + 1);

          return (
            <div
              key={day}
              className={`flex h-8 w-8 items-center justify-center rounded-lg text-xs mx-auto
                ${isToday ? "ring-2 ring-primary ring-offset-1" : ""}
                ${done ? "bg-mint/30 text-mint font-bold" : ""}
                ${!done && isPast ? "bg-coral/10 text-coral/60" : ""}
                ${!done && !isPast ? "text-muted-foreground" : ""}
              `}
            >
              {done ? (
                <CheckCircle2 className="h-4 w-4 text-mint" />
              ) : isPast ? (
                <XCircle className="h-4 w-4 text-coral/40" />
              ) : (
                day
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function InjectionsPage() {
  const t = useTranslations("injection");
  const { selectedChild } = useChild();
  const [tab, setTab] = useState("calendar");

  if (!selectedChild) return null;

  const logs = getInjectionsForChild(selectedChild.id);
  const rx = mockGHPrescription;
  const hasGH = selectedChild.diagnosisTags.includes("gh_deficiency");

  if (!hasGH) {
    return (
      <PageTransition className="mx-auto max-w-4xl">
        <h1 className="mb-4 font-heading text-2xl font-bold">{t("title")}</h1>
        <Card className="rounded-2xl border-border/50 shadow-sm">
          <CardContent className="py-12 text-center text-muted-foreground">
            此患者目前無生長激素注射處方
          </CardContent>
        </Card>
      </PageTransition>
    );
  }

  const marchLogs = logs.filter((l) => l.injectionDate.startsWith("2026-03"));
  const complianceRate = Math.round((marchLogs.length / 31) * 100);

  return (
    <PageTransition className="mx-auto max-w-5xl space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <BraveBunny className="hidden sm:block h-16 w-16" />
          <h1 className="font-heading text-2xl font-bold">{t("title")}</h1>
        </div>
        <Badge className="rounded-full bg-primary/10 text-primary text-sm px-3 py-1">
          {selectedChild.name}
        </Badge>
      </div>

      {/* Prescription Info */}
      <Card className="rounded-2xl border-border/50 bg-gradient-to-r from-sky/5 to-mint/5 shadow-sm">
        <CardContent className="flex flex-wrap items-center gap-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky/20">
              <Syringe className="h-5 w-5 text-sky" />
            </div>
            <div>
              <div className="text-sm font-bold">{rx.medicationName}</div>
              <div className="text-xs text-muted-foreground">
                {rx.doseMg} mg / {rx.frequency}
              </div>
            </div>
          </div>
          <div className="text-xs text-muted-foreground">
            開始日期: {rx.startDate}
          </div>
          <div className="ml-auto flex items-center gap-2">
            <span className="text-sm font-medium">本月順從性</span>
            <Badge
              className={`rounded-full ${
                complianceRate >= 90
                  ? "bg-mint/20 text-mint"
                  : complianceRate >= 70
                    ? "bg-lemon/30 text-yellow-600"
                    : "bg-coral/20 text-coral"
              }`}
            >
              {complianceRate}%
            </Badge>
          </div>
        </CardContent>
      </Card>

      <Tabs value={tab} onValueChange={setTab}>
        <TabsList className="rounded-xl">
          <TabsTrigger value="calendar" className="rounded-lg">
            <CalendarIcon className="mr-1.5 h-4 w-4" />
            月曆
          </TabsTrigger>
          <TabsTrigger value="bodymap" className="rounded-lg">
            <Syringe className="mr-1.5 h-4 w-4" />
            {t("siteRotation")}
          </TabsTrigger>
          <TabsTrigger value="log" className="rounded-lg">
            <BarChart3 className="mr-1.5 h-4 w-4" />
            紀錄列表
          </TabsTrigger>
        </TabsList>

        <TabsContent value="calendar">
          <Card className="rounded-2xl border-border/50 shadow-sm">
            <CardContent className="py-6">
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                <MonthCalendar year={2026} month={3} logs={marchLogs} />
                <div className="space-y-4">
                  <h3 className="font-heading text-sm font-bold">統計</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">
                        已完成
                      </span>
                      <span className="text-sm font-bold text-mint">
                        {marchLogs.length} 天
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">
                        漏打
                      </span>
                      <span className="text-sm font-bold text-coral">
                        {31 - marchLogs.length} 天
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">
                        順從率
                      </span>
                      <span className="text-sm font-bold">{complianceRate}%</span>
                    </div>
                    <div className="h-3 overflow-hidden rounded-full bg-muted">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-mint to-sky"
                        style={{ width: `${complianceRate}%` }}
                      />
                    </div>
                  </div>
                  <div className="mt-4 flex gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <CheckCircle2 className="h-3.5 w-3.5 text-mint" /> 已完成
                    </span>
                    <span className="flex items-center gap-1">
                      <XCircle className="h-3.5 w-3.5 text-coral/40" /> 漏打
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="bodymap">
          <Card className="rounded-2xl border-border/50 shadow-sm">
            <CardHeader>
              <CardTitle className="text-sm">{t("siteRotation")}</CardTitle>
              <p className="text-xs text-muted-foreground">
                各部位注射次數分布 (3 月)
              </p>
            </CardHeader>
            <CardContent>
              <InjectionBodyMap logs={marchLogs} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="log">
          <Card className="rounded-2xl border-border/50 shadow-sm">
            <CardContent className="pt-6">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b text-left text-muted-foreground">
                      <th className="pb-3 pr-4">{t("date")}</th>
                      <th className="pb-3 pr-4">{t("time")}</th>
                      <th className="pb-3 pr-4">{t("dose")}</th>
                      <th className="pb-3 pr-4">{t("site")}</th>
                      <th className="pb-3 pr-4">{t("painLevel")}</th>
                      <th className="pb-3">{t("sideEffects")}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[...marchLogs].reverse().map((log) => (
                      <tr key={log.id} className="border-b border-border/30">
                        <td className="py-2.5 pr-4 font-medium">
                          {log.injectionDate}
                        </td>
                        <td className="py-2.5 pr-4">{log.injectionTime}</td>
                        <td className="py-2.5 pr-4">{log.doseAdministeredMg} mg</td>
                        <td className="py-2.5 pr-4">
                          {siteLabels[log.injectionSite] || log.injectionSite}
                        </td>
                        <td className="py-2.5 pr-4">
                          {"⭐".repeat(log.painLevel) || "無痛"}
                        </td>
                        <td className="py-2.5 text-xs">
                          {log.sideEffects.length > 0
                            ? log.sideEffects.join(", ")
                            : "--"}
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
    </PageTransition>
  );
}
