"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  TrendingUp,
  Stethoscope,
  Syringe,
  FlaskConical,
  User,
  Ruler,
  Scale,
  Plus,
  AlertTriangle,
  CheckCircle2,
  Pill,
  Calendar,
} from "lucide-react";
import {
  allPatients,
  mockTannerRecords,
} from "@/lib/mock/doctor-data";
import {
  getGrowthDataForChild,
  getVisitsForChild,
  getLabReportsForChild,
  getInjectionsForChild,
  formatAge,
  getChildAgeMonths,
  mockGHPrescription,
} from "@/lib/mock/data";
import { PageTransition } from "@/components/motion/page-transition";

const diagnosisLabels: Record<string, { zh: string; color: string }> = {
  gh_deficiency: { zh: "GH 缺乏", color: "bg-sky/20 text-sky" },
  short_stature: { zh: "矮小", color: "bg-lavender/20 text-lavender" },
  precocious_puberty: { zh: "性早熟", color: "bg-primary/20 text-primary" },
  obesity: { zh: "肥胖", color: "bg-peach/30 text-orange-600" },
};

export default function PatientDetailPage() {
  const params = useParams();
  const childId = params.childId as string;
  const [tab, setTab] = useState("overview");

  const child = allPatients.find((c) => c.id === childId);
  if (!child) {
    return (
      <div className="mx-auto max-w-4xl py-12 text-center text-muted-foreground">
        患者未找到
      </div>
    );
  }

  const growth = getGrowthDataForChild(childId);
  const visits = getVisitsForChild(childId);
  const labs = getLabReportsForChild(childId);
  const injections = getInjectionsForChild(childId);
  const tannerRecords = mockTannerRecords.filter((t) => t.childId === childId);
  const latestGrowth = growth[growth.length - 1];
  const hasGH = child.diagnosisTags.includes("gh_deficiency");
  const hasPP = child.diagnosisTags.includes("precocious_puberty");

  const marchInj = injections.filter((i) =>
    i.injectionDate.startsWith("2026-03")
  ).length;
  const compliance = hasGH ? Math.round((marchInj / 31) * 100) : null;

  return (
    <PageTransition className="mx-auto max-w-5xl space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center gap-4">
        <Link
          href="/doctor/patients"
          className="flex h-10 w-10 items-center justify-center rounded-xl bg-white shadow-sm transition-colors hover:bg-muted"
        >
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div className="flex items-center gap-4 flex-1">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-sky/10 to-lavender/10 text-3xl shadow-sm">
            {child.avatar}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-heading text-2xl font-bold">{child.name}</h1>
              <span className="text-sm text-muted-foreground">
                {child.sex === "male" ? "♂ 男" : "♀ 女"}
              </span>
              <span className="text-sm text-muted-foreground">
                {formatAge(child.dateOfBirth, "zh-TW")}
              </span>
            </div>
            <div className="mt-1 flex flex-wrap gap-1.5">
              {child.diagnosisTags.map((tag) => {
                const info = diagnosisLabels[tag];
                return info ? (
                  <Badge key={tag} className={`rounded-full text-xs ${info.color}`}>
                    {info.zh}
                  </Badge>
                ) : null;
              })}
            </div>
          </div>
        </div>
        <Link href={`/doctor/patients/${childId}/visits/new`}>
          <Button className="rounded-xl bg-sky text-white hover:bg-sky/90">
            <Plus className="mr-1.5 h-4 w-4" />
            新增看診
          </Button>
        </Link>
      </div>

      {/* Quick Stats Row */}
      <div className="grid grid-cols-3 gap-2 sm:grid-cols-5 sm:gap-3">
        <Card className="rounded-xl shadow-sm">
          <CardContent className="py-3 text-center">
            <Ruler className="mx-auto h-4 w-4 text-primary" />
            <div className="mt-1 text-lg font-bold">
              {latestGrowth?.heightCm ?? "--"}
            </div>
            <div className="text-[10px] text-muted-foreground">身高 cm</div>
            {latestGrowth && (
              <div className="text-[10px] text-primary">
                P{latestGrowth.heightPercentile}
              </div>
            )}
          </CardContent>
        </Card>
        <Card className="rounded-xl shadow-sm">
          <CardContent className="py-3 text-center">
            <Scale className="mx-auto h-4 w-4 text-sky" />
            <div className="mt-1 text-lg font-bold">
              {latestGrowth?.weightKg ?? "--"}
            </div>
            <div className="text-[10px] text-muted-foreground">體重 kg</div>
          </CardContent>
        </Card>
        <Card className="rounded-xl shadow-sm">
          <CardContent className="py-3 text-center">
            <TrendingUp className="mx-auto h-4 w-4 text-mint" />
            <div className="mt-1 text-lg font-bold">
              {latestGrowth?.growthVelocityCmYr ?? "--"}
            </div>
            <div className="text-[10px] text-muted-foreground">cm/yr</div>
          </CardContent>
        </Card>
        <Card className="rounded-xl shadow-sm">
          <CardContent className="py-3 text-center">
            <div className="text-sm">🦴</div>
            <div className="mt-1 text-lg font-bold">
              {latestGrowth?.boneAgeYears ?? "--"}
            </div>
            <div className="text-[10px] text-muted-foreground">骨齡</div>
          </CardContent>
        </Card>
        <Card className="rounded-xl shadow-sm">
          <CardContent className="py-3 text-center">
            <div className="text-sm">🎯</div>
            <div className="mt-1 text-lg font-bold">
              {latestGrowth?.predictedAdultHeightCm ?? child.targetHeightCm}
            </div>
            <div className="text-[10px] text-muted-foreground">
              {latestGrowth?.predictedAdultHeightCm ? "PAH" : "目標身高"} cm
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs value={tab} onValueChange={setTab}>
        <TabsList className="rounded-xl flex-wrap h-auto gap-1">
          <TabsTrigger value="overview" className="rounded-lg">
            <User className="mr-1.5 h-4 w-4" /> 總覽
          </TabsTrigger>
          <TabsTrigger value="growth" className="rounded-lg">
            <TrendingUp className="mr-1.5 h-4 w-4" /> 生長
          </TabsTrigger>
          <TabsTrigger value="visits" className="rounded-lg">
            <Stethoscope className="mr-1.5 h-4 w-4" /> 看診
          </TabsTrigger>
          <TabsTrigger value="labs" className="rounded-lg">
            <FlaskConical className="mr-1.5 h-4 w-4" /> 檢驗
          </TabsTrigger>
          {hasGH && (
            <TabsTrigger value="injections" className="rounded-lg">
              <Syringe className="mr-1.5 h-4 w-4" /> 注射
            </TabsTrigger>
          )}
          {hasPP && (
            <TabsTrigger value="tanner" className="rounded-lg">
              📊 Tanner
            </TabsTrigger>
          )}
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {/* Patient Info */}
            <Card className="rounded-2xl shadow-sm">
              <CardHeader>
                <CardTitle className="text-sm">基本資料</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">出生日期</span>
                  <span className="font-medium">{child.dateOfBirth}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">年齡</span>
                  <span className="font-medium">
                    {formatAge(child.dateOfBirth, "zh-TW")}
                    （{getChildAgeMonths(child.dateOfBirth)} 個月）
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">出生週數</span>
                  <span className="font-medium">{child.gestationalAge} 週</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">出生體重</span>
                  <span className="font-medium">{child.birthWeightKg} kg</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">出生身長</span>
                  <span className="font-medium">{child.birthLengthCm} cm</span>
                </div>
              </CardContent>
            </Card>

            {/* Family Info */}
            <Card className="rounded-2xl shadow-sm">
              <CardHeader>
                <CardTitle className="text-sm">家族資料</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">父親身高</span>
                  <span className="font-medium">{child.fatherHeightCm} cm</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">母親身高</span>
                  <span className="font-medium">{child.motherHeightCm} cm</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">目標身高 (MPH)</span>
                  <span className="font-bold text-sky">{child.targetHeightCm} cm</span>
                </div>
              </CardContent>
            </Card>

            {/* Active Prescriptions */}
            <Card className="rounded-2xl shadow-sm md:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-sm">
                  <Pill className="h-4 w-4 text-mint" /> 目前處方
                </CardTitle>
              </CardHeader>
              <CardContent>
                {visits.length > 0 ? (
                  <div className="space-y-2">
                    {visits[0].prescriptions
                      .filter((rx) => rx.isActive)
                      .map((rx) => (
                        <div
                          key={rx.id}
                          className="flex items-center justify-between rounded-xl bg-mint/10 px-4 py-3"
                        >
                          <div>
                            <span className="font-medium">{rx.medicationName}</span>
                            <span className="ml-2 text-sm text-muted-foreground">
                              {rx.dose} / {rx.frequency} / {rx.route}
                            </span>
                          </div>
                          <Badge className="rounded-full bg-mint/20 text-mint text-xs">
                            使用中
                          </Badge>
                        </div>
                      ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">無目前處方</p>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Growth Tab */}
        <TabsContent value="growth">
          <Card className="rounded-2xl shadow-sm">
            <CardHeader>
              <CardTitle className="text-sm">生長測量歷史</CardTitle>
            </CardHeader>
            <CardContent>
              {growth.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b text-left text-muted-foreground">
                        <th className="pb-2 pr-3">日期</th>
                        <th className="pb-2 pr-3">身高</th>
                        <th className="pb-2 pr-3">體重</th>
                        <th className="pb-2 pr-3">BMI</th>
                        <th className="pb-2 pr-3">速率</th>
                        <th className="pb-2 pr-3">骨齡</th>
                        <th className="pb-2">PAH</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[...growth].reverse().map((row) => (
                        <tr key={row.id} className="border-b border-border/30">
                          <td className="py-2 pr-3 font-medium">{row.measuredAt}</td>
                          <td className="py-2 pr-3">
                            {row.heightCm}
                            <span className="ml-1 text-xs text-primary">P{row.heightPercentile}</span>
                          </td>
                          <td className="py-2 pr-3">{row.weightKg}</td>
                          <td className="py-2 pr-3">{row.bmi}</td>
                          <td className="py-2 pr-3">{row.growthVelocityCmYr ?? "--"}</td>
                          <td className="py-2 pr-3">{row.boneAgeYears ?? "--"}</td>
                          <td className="py-2">{row.predictedAdultHeightCm ?? "--"}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-muted-foreground">尚無生長資料</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Visits Tab */}
        <TabsContent value="visits" className="space-y-3">
          {visits.length > 0 ? (
            visits.map((visit) => (
              <Card key={visit.id} className="rounded-2xl shadow-sm">
                <CardContent className="py-4">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="font-bold text-sm">{visit.visitDate}</span>
                    <Badge className="rounded-full text-xs bg-sky/20 text-sky">
                      {visit.visitType === "follow_up" ? "回診" : "初診"}
                    </Badge>
                  </div>
                  <p className="text-sm font-medium mb-1">{visit.chiefComplaint}</p>
                  <div className="rounded-xl bg-muted/50 p-3 text-sm">
                    {visit.parentVisibleNotes}
                  </div>
                  {visit.prescriptions.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-2">
                      {visit.prescriptions.map((rx) => (
                        <Badge key={rx.id} className="rounded-full bg-mint/10 text-mint text-xs">
                          {rx.medicationName} {rx.dose}
                        </Badge>
                      ))}
                    </div>
                  )}
                  {visit.nextVisitDate && (
                    <div className="mt-2 flex items-center gap-1 text-xs text-muted-foreground">
                      <Calendar className="h-3 w-3" /> 下次: {visit.nextVisitDate}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))
          ) : (
            <Card className="rounded-2xl shadow-sm">
              <CardContent className="py-8 text-center text-muted-foreground">
                尚無看診紀錄
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Labs Tab */}
        <TabsContent value="labs" className="space-y-3">
          {labs.length > 0 ? (
            labs.map((report) => (
              <Card key={report.id} className="rounded-2xl shadow-sm">
                <CardContent className="py-4">
                  <div className="flex items-center gap-2 mb-2">
                    <FlaskConical className="h-4 w-4 text-mint" />
                    <span className="font-bold text-sm">{report.reportDate}</span>
                    <Badge className="rounded-full text-[10px] bg-primary/20 text-primary">
                      {report.category}
                    </Badge>
                  </div>
                  <div className="space-y-1.5">
                    {report.results.map((r) => (
                      <div key={r.id} className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2">
                          {r.isAbnormal ? (
                            <AlertTriangle className="h-3.5 w-3.5 text-coral" />
                          ) : (
                            <CheckCircle2 className="h-3.5 w-3.5 text-mint" />
                          )}
                          <span>{r.testName}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`font-bold ${r.isAbnormal ? "text-coral" : ""}`}>
                            {r.value} {r.unit}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            ({r.referenceRangeLow}-{r.referenceRangeHigh})
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <Card className="rounded-2xl shadow-sm">
              <CardContent className="py-8 text-center text-muted-foreground">
                尚無檢驗報告
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Injections Tab */}
        {hasGH && (
          <TabsContent value="injections">
            <Card className="rounded-2xl shadow-sm">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <Syringe className="h-4 w-4 text-sky" />
                    GH 注射追蹤
                  </CardTitle>
                  {compliance !== null && (
                    <Badge
                      className={`rounded-full ${
                        compliance >= 90 ? "bg-mint/20 text-mint" : "bg-coral/20 text-coral"
                      }`}
                    >
                      順從率 {compliance}%
                    </Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="rounded-xl bg-sky/5 p-3 text-sm">
                  <span className="font-medium">{mockGHPrescription.medicationName}</span>
                  <span className="ml-2 text-muted-foreground">
                    {mockGHPrescription.doseMg} mg / {mockGHPrescription.frequency}
                  </span>
                  <span className="ml-2 text-muted-foreground">
                    開始: {mockGHPrescription.startDate}
                  </span>
                </div>
                {compliance !== null && (
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-muted-foreground">3 月順從性</span>
                      <span className="font-bold">{compliance}% ({marchInj}/31天)</span>
                    </div>
                    <div className="h-3 overflow-hidden rounded-full bg-muted">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-mint to-sky"
                        style={{ width: `${compliance}%` }}
                      />
                    </div>
                  </div>
                )}
                <p className="text-xs text-muted-foreground">
                  漏打日期: 2026-03-12, 2026-03-23
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        )}

        {/* Tanner Tab */}
        {hasPP && (
          <TabsContent value="tanner">
            <Card className="rounded-2xl shadow-sm">
              <CardHeader>
                <CardTitle className="text-sm">Tanner Staging 記錄</CardTitle>
              </CardHeader>
              <CardContent>
                {tannerRecords.length > 0 ? (
                  <div className="space-y-4">
                    {tannerRecords.map((rec, idx) => (
                      <div
                        key={rec.id}
                        className={`rounded-xl p-4 ${
                          idx === 0 ? "bg-primary/5 border border-primary/20" : "bg-muted/30"
                        }`}
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <span className="font-bold text-sm">{rec.date}</span>
                          {idx === 0 && (
                            <Badge className="rounded-full bg-primary/20 text-primary text-xs">
                              最新
                            </Badge>
                          )}
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-sm sm:grid-cols-4">
                          {rec.breastStage !== null && (
                            <div>
                              <span className="text-muted-foreground">乳房 (B)</span>
                              <div className="font-bold text-lg">B{rec.breastStage}</div>
                            </div>
                          )}
                          <div>
                            <span className="text-muted-foreground">陰毛 (PH)</span>
                            <div className="font-bold text-lg">PH{rec.pubicHairStage}</div>
                          </div>
                          {rec.genitalStage !== null && (
                            <div>
                              <span className="text-muted-foreground">生殖器 (G)</span>
                              <div className="font-bold text-lg">G{rec.genitalStage}</div>
                            </div>
                          )}
                          {rec.testicularVolumeMlLeft !== null && (
                            <div>
                              <span className="text-muted-foreground">睾丸體積</span>
                              <div className="font-bold">
                                L: {rec.testicularVolumeMlLeft} / R: {rec.testicularVolumeMlRight} mL
                              </div>
                            </div>
                          )}
                        </div>
                        <p className="mt-2 text-xs text-muted-foreground">
                          {rec.notes}
                        </p>
                      </div>
                    ))}

                    {/* Tanner Progression Visual */}
                    <div className="mt-4">
                      <h4 className="text-sm font-medium mb-2">分期變化趨勢</h4>
                      <div className="flex items-end gap-4">
                        {tannerRecords.map((rec, idx) => (
                          <div key={rec.id} className="flex flex-col items-center gap-1">
                            <div
                              className="rounded-lg bg-primary/20 flex items-center justify-center font-bold text-primary"
                              style={{
                                width: 48,
                                height: (rec.breastStage ?? rec.genitalStage ?? 1) * 20 + 20,
                              }}
                            >
                              {rec.breastStage !== null ? `B${rec.breastStage}` : `G${rec.genitalStage}`}
                            </div>
                            <span className="text-[10px] text-muted-foreground">
                              {rec.date.slice(5)}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <p className="text-muted-foreground">尚無 Tanner staging 記錄</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        )}
      </Tabs>
    </PageTransition>
  );
}
