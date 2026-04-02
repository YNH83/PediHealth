"use client";

import { useTranslations } from "next-intl";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useChild } from "@/providers/child-provider";
import { getVisitsForChild } from "@/lib/mock/data";
import { Stethoscope, Calendar, Pill, ChevronRight } from "lucide-react";
import { CatDoctor } from "@/components/illustrations/page-mascots";
import { PageTransition } from "@/components/motion/page-transition";

const typeLabel: Record<string, { zh: string; color: string }> = {
  initial: { zh: "初診", color: "bg-lavender/20 text-lavender" },
  follow_up: { zh: "回診", color: "bg-sky/20 text-sky" },
  emergency: { zh: "急診", color: "bg-coral/20 text-coral" },
};

export default function VisitsPage() {
  const t = useTranslations("visits");
  const { selectedChild } = useChild();

  if (!selectedChild) return null;

  const visits = getVisitsForChild(selectedChild.id);

  return (
    <PageTransition className="mx-auto max-w-4xl space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <CatDoctor className="hidden sm:block h-16 w-16" />
          <h1 className="font-heading text-2xl font-bold">{t("title")}</h1>
        </div>
        <Badge className="rounded-full bg-primary/10 text-primary text-sm px-3 py-1">
          {selectedChild.name}
        </Badge>
      </div>

      {visits.length === 0 ? (
        <Card className="rounded-2xl border-border/50 shadow-sm">
          <CardContent className="py-12 text-center text-muted-foreground">
            {t("noVisits")}
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {/* Timeline */}
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-5 top-0 h-full w-0.5 bg-gradient-to-b from-primary/30 via-sky/30 to-mint/30" />

            {visits.map((visit, idx) => {
              const type = typeLabel[visit.visitType];
              return (
                <div key={visit.id} className="relative mb-6 pl-14">
                  {/* Dot */}
                  <div className="absolute left-3.5 top-3 h-4 w-4 rounded-full border-2 border-white bg-primary shadow-sm" />

                  <Card className="rounded-2xl border-border/50 shadow-sm transition-shadow hover:shadow-md">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-lavender/20">
                            <Stethoscope className="h-5 w-5 text-lavender" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-bold">
                                {visit.visitDate}
                              </span>
                              <Badge className={`rounded-full text-xs ${type?.color}`}>
                                {type?.zh}
                              </Badge>
                            </div>
                            <p className="text-xs text-muted-foreground">
                              {visit.doctorName}
                            </p>
                          </div>
                        </div>
                        <ChevronRight className="h-4 w-4 text-muted-foreground" />
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {/* Chief complaint */}
                      <div className="text-sm font-medium text-foreground">
                        {visit.chiefComplaint}
                      </div>

                      {/* Doctor notes */}
                      <div className="rounded-xl bg-muted/50 p-3">
                        <p className="text-sm leading-relaxed text-foreground">
                          {visit.parentVisibleNotes}
                        </p>
                      </div>

                      {/* Prescriptions */}
                      {visit.prescriptions.length > 0 && (
                        <div className="space-y-2">
                          <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                            <Pill className="h-3.5 w-3.5" />
                            {t("prescription")}
                          </div>
                          {visit.prescriptions.map((rx) => (
                            <div
                              key={rx.id}
                              className="flex items-center gap-2 rounded-lg bg-mint/10 px-3 py-2 text-sm"
                            >
                              <span className="font-medium">
                                {rx.medicationName}
                              </span>
                              <span className="text-muted-foreground">
                                {rx.dose} / {rx.frequency}
                              </span>
                              {rx.isActive && (
                                <Badge className="ml-auto rounded-full bg-mint/20 text-mint text-xs">
                                  使用中
                                </Badge>
                              )}
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Next visit */}
                      {visit.nextVisitDate && (
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Calendar className="h-3.5 w-3.5" />
                          {t("nextVisit")}: {visit.nextVisitDate}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </PageTransition>
  );
}
