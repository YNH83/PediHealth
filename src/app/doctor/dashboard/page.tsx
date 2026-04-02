"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Users,
  Calendar,
  Stethoscope,
  Clock,
  ChevronRight,
  Plus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { getPatientSummaries, todaySchedule } from "@/lib/mock/doctor-data";
import { BearNurse } from "@/components/illustrations/page-mascots";
import { PageTransition } from "@/components/motion/page-transition";

const typeColor: Record<string, string> = {
  follow_up: "bg-sky/20 text-sky",
  initial: "bg-lavender/20 text-lavender",
};

export default function DoctorDashboard() {
  const t = useTranslations("doctor");
  const summaries = getPatientSummaries();
  const attentionCount = summaries.filter((s) => s.status === "attention").length;

  return (
    <PageTransition className="mx-auto max-w-5xl space-y-6">
      {/* Welcome */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-sky/10 via-lavender/10 to-mint/10 p-6">
        <div className="absolute -right-2 -top-2 opacity-80 pointer-events-none hidden sm:block">
          <BearNurse className="h-28 w-28" />
        </div>
        <h1 className="font-heading text-2xl font-bold text-foreground">
          {t("dashboard")}
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          蘇本華 醫師，今天有 {todaySchedule.length} 位門診
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
        <Card className="rounded-2xl shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {t("totalPatients")}
            </CardTitle>
            <Users className="h-5 w-5 text-sky" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{summaries.length}</div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {t("todayClinic")}
            </CardTitle>
            <Calendar className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{todaySchedule.length}</div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              需注意
            </CardTitle>
            <Stethoscope className="h-5 w-5 text-coral" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-coral">{attentionCount}</div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              本週看診
            </CardTitle>
            <Stethoscope className="h-5 w-5 text-mint" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">12</div>
          </CardContent>
        </Card>
      </div>

      {/* Today's Schedule */}
      <Card className="rounded-2xl shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-sky" />
            今日門診時程
          </CardTitle>
          <Badge className="rounded-full bg-sky/10 text-sky">
            {todaySchedule.length} 位
          </Badge>
        </CardHeader>
        <CardContent className="space-y-2">
          {todaySchedule.map((item, idx) => (
            <Link
              key={idx}
              href={`/doctor/patients/${item.childId}`}
              className="flex items-center gap-4 rounded-xl px-4 py-3 transition-colors hover:bg-muted/50"
            >
              <div className="w-14 text-sm font-bold text-sky">{item.time}</div>
              <div className="h-8 w-0.5 bg-sky/20" />
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium">{item.childName}</span>
                  <Badge
                    className={`rounded-full text-[10px] ${
                      typeColor[item.visitType]
                    }`}
                  >
                    {item.visitType === "follow_up" ? "回診" : "初診"}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground">{item.reason}</p>
              </div>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </Link>
          ))}
        </CardContent>
      </Card>

      {/* Quick actions */}
      <div className="flex gap-3">
        <Link href="/doctor/patients" className="flex-1">
          <Button
            variant="outline"
            className="h-auto w-full flex-col gap-2 rounded-2xl border-2 border-border/50 bg-white py-5 shadow-sm hover:border-sky hover:bg-sky/5"
          >
            <Users className="h-6 w-6 text-sky" />
            <span className="text-xs font-medium">患者列表</span>
          </Button>
        </Link>
        <Button
          variant="outline"
          className="h-auto flex-1 flex-col gap-2 rounded-2xl border-2 border-border/50 bg-white py-5 shadow-sm hover:border-mint hover:bg-mint/10"
        >
          <Plus className="h-6 w-6 text-mint" />
          <span className="text-xs font-medium">新增患者</span>
        </Button>
      </div>
    </PageTransition>
  );
}
