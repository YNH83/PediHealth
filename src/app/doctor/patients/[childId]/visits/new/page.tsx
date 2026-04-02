"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ArrowLeft,
  Save,
  Ruler,
  Scale,
  Stethoscope,
  Pill,
  FileText,
  Calendar,
  Plus,
  Trash2,
  Eye,
  Lock,
} from "lucide-react";
import { allPatients } from "@/lib/mock/doctor-data";
import { formatAge } from "@/lib/mock/data";
import { toast } from "sonner";
import { PageTransition } from "@/components/motion/page-transition";

interface PrescriptionForm {
  id: string;
  medicationName: string;
  dose: string;
  frequency: string;
  route: string;
}

export default function NewVisitPage() {
  const params = useParams();
  const router = useRouter();
  const childId = params.childId as string;
  const child = allPatients.find((c) => c.id === childId);

  const [visitType, setVisitType] = useState("follow_up");
  const [chiefComplaint, setChiefComplaint] = useState("");
  const [assessment, setAssessment] = useState("");
  const [plan, setPlan] = useState("");
  const [doctorNotes, setDoctorNotes] = useState("");
  const [parentNotes, setParentNotes] = useState("");
  const [nextVisitDate, setNextVisitDate] = useState("");

  // Growth measurement
  const [heightCm, setHeightCm] = useState("");
  const [weightKg, setWeightKg] = useState("");
  const [boneAge, setBoneAge] = useState("");
  const [bpSystolic, setBpSystolic] = useState("");
  const [bpDiastolic, setBpDiastolic] = useState("");
  const [waistCm, setWaistCm] = useState("");

  // Tanner staging (for precocious puberty)
  const [breastStage, setBreastStage] = useState("");
  const [pubicHairStage, setPubicHairStage] = useState("");
  const [genitalStage, setGenitalStage] = useState("");
  const [testicularL, setTesticularL] = useState("");
  const [testicularR, setTesticularR] = useState("");
  const [tannerNotes, setTannerNotes] = useState("");

  // Prescriptions
  const [prescriptions, setPrescriptions] = useState<PrescriptionForm[]>([]);

  const hasPP = child?.diagnosisTags.includes("precocious_puberty");
  const hasObesity = child?.diagnosisTags.includes("obesity");
  const isMale = child?.sex === "male";

  function addPrescription() {
    setPrescriptions((prev) => [
      ...prev,
      {
        id: `rx-new-${Date.now()}`,
        medicationName: "",
        dose: "",
        frequency: "",
        route: "皮下注射",
      },
    ]);
  }

  function removePrescription(id: string) {
    setPrescriptions((prev) => prev.filter((p) => p.id !== id));
  }

  function updatePrescription(
    id: string,
    field: keyof PrescriptionForm,
    value: string
  ) {
    setPrescriptions((prev) =>
      prev.map((p) => (p.id === id ? { ...p, [field]: value } : p))
    );
  }

  function computeBMI(): string {
    const h = parseFloat(heightCm);
    const w = parseFloat(weightKg);
    if (h > 0 && w > 0) return (w / ((h / 100) ** 2)).toFixed(1);
    return "--";
  }

  function handleSubmit() {
    if (!chiefComplaint.trim()) {
      toast.error("請填寫主訴");
      return;
    }
    toast.success("看診紀錄已儲存", {
      description: `${child?.name} - ${new Date().toISOString().split("T")[0]}`,
    });
    setTimeout(() => router.push(`/doctor/patients/${childId}`), 1000);
  }

  if (!child) {
    return (
      <div className="py-12 text-center text-muted-foreground">患者未找到</div>
    );
  }

  return (
    <PageTransition className="mx-auto max-w-4xl space-y-6 pb-12">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link
          href={`/doctor/patients/${childId}`}
          className="flex h-10 w-10 items-center justify-center rounded-xl bg-white shadow-sm hover:bg-muted"
        >
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div className="flex items-center gap-3 flex-1">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-sky/10 to-lavender/10 text-2xl">
            {child.avatar}
          </div>
          <div>
            <h1 className="font-heading text-xl font-bold">新增看診紀錄</h1>
            <p className="text-sm text-muted-foreground">
              {child.name} ({formatAge(child.dateOfBirth, "zh-TW")})
            </p>
          </div>
        </div>
        <Button
          onClick={handleSubmit}
          className="rounded-xl bg-sky text-white hover:bg-sky/90"
        >
          <Save className="mr-1.5 h-4 w-4" />
          儲存紀錄
        </Button>
      </div>

      {/* Visit Info */}
      <Card className="rounded-2xl shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-sm">
            <Stethoscope className="h-4 w-4 text-sky" />
            看診資訊
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="space-y-2">
              <Label>看診日期</Label>
              <Input
                type="date"
                defaultValue={new Date().toISOString().split("T")[0]}
                className="rounded-xl"
              />
            </div>
            <div className="space-y-2">
              <Label>看診類型</Label>
              <Select value={visitType} onValueChange={(v) => v && setVisitType(v)}>
                <SelectTrigger className="rounded-xl">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="initial">初診</SelectItem>
                  <SelectItem value="follow_up">回診</SelectItem>
                  <SelectItem value="emergency">急診</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>下次回診日期</Label>
              <Input
                type="date"
                value={nextVisitDate}
                onChange={(e) => setNextVisitDate(e.target.value)}
                className="rounded-xl"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>
              主訴 <span className="text-coral">*</span>
            </Label>
            <Input
              placeholder="例：生長激素治療追蹤（第 6 個月）"
              value={chiefComplaint}
              onChange={(e) => setChiefComplaint(e.target.value)}
              className="rounded-xl"
            />
          </div>
        </CardContent>
      </Card>

      {/* Growth Measurement */}
      <Card className="rounded-2xl shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-sm">
            <Ruler className="h-4 w-4 text-primary" />
            生長測量
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <div className="space-y-2">
              <Label>身高 (cm)</Label>
              <Input
                type="number"
                step="0.1"
                placeholder="125.3"
                value={heightCm}
                onChange={(e) => setHeightCm(e.target.value)}
                className="rounded-xl"
              />
            </div>
            <div className="space-y-2">
              <Label>體重 (kg)</Label>
              <Input
                type="number"
                step="0.1"
                placeholder="23.6"
                value={weightKg}
                onChange={(e) => setWeightKg(e.target.value)}
                className="rounded-xl"
              />
            </div>
            <div className="space-y-2">
              <Label>BMI</Label>
              <div className="flex h-10 items-center rounded-xl border bg-muted/30 px-3 text-sm font-medium">
                {computeBMI()}
              </div>
            </div>
            <div className="space-y-2">
              <Label>骨齡 (年)</Label>
              <Input
                type="number"
                step="0.1"
                placeholder="6.8"
                value={boneAge}
                onChange={(e) => setBoneAge(e.target.value)}
                className="rounded-xl"
              />
            </div>
          </div>

          {/* Extra for obesity */}
          {(hasObesity || true) && (
            <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3">
              <div className="space-y-2">
                <Label>收縮壓 (mmHg)</Label>
                <Input
                  type="number"
                  placeholder="110"
                  value={bpSystolic}
                  onChange={(e) => setBpSystolic(e.target.value)}
                  className="rounded-xl"
                />
              </div>
              <div className="space-y-2">
                <Label>舒張壓 (mmHg)</Label>
                <Input
                  type="number"
                  placeholder="70"
                  value={bpDiastolic}
                  onChange={(e) => setBpDiastolic(e.target.value)}
                  className="rounded-xl"
                />
              </div>
              <div className="space-y-2">
                <Label>腰圍 (cm)</Label>
                <Input
                  type="number"
                  step="0.1"
                  placeholder="58"
                  value={waistCm}
                  onChange={(e) => setWaistCm(e.target.value)}
                  className="rounded-xl"
                />
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Tanner Staging (only for PP patients) */}
      {hasPP && (
        <Card className="rounded-2xl border-primary/20 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-sm">
              📊 Tanner Staging
              <Badge className="rounded-full bg-primary/10 text-primary text-xs">
                性早熟
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              {!isMale && (
                <div className="space-y-2">
                  <Label>乳房發育 (B)</Label>
                  <Select value={breastStage} onValueChange={(v) => v && setBreastStage(v)}>
                    <SelectTrigger className="rounded-xl">
                      <SelectValue placeholder="選擇" />
                    </SelectTrigger>
                    <SelectContent>
                      {[1, 2, 3, 4, 5].map((s) => (
                        <SelectItem key={s} value={String(s)}>
                          B{s}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
              <div className="space-y-2">
                <Label>陰毛 (PH)</Label>
                <Select value={pubicHairStage} onValueChange={(v) => v && setPubicHairStage(v)}>
                  <SelectTrigger className="rounded-xl">
                    <SelectValue placeholder="選擇" />
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4, 5].map((s) => (
                      <SelectItem key={s} value={String(s)}>
                        PH{s}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              {isMale && (
                <>
                  <div className="space-y-2">
                    <Label>生殖器 (G)</Label>
                    <Select value={genitalStage} onValueChange={(v) => v && setGenitalStage(v)}>
                      <SelectTrigger className="rounded-xl">
                        <SelectValue placeholder="選擇" />
                      </SelectTrigger>
                      <SelectContent>
                        {[1, 2, 3, 4, 5].map((s) => (
                          <SelectItem key={s} value={String(s)}>
                            G{s}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>睾丸體積 左 (mL)</Label>
                    <Input
                      type="number"
                      step="0.5"
                      value={testicularL}
                      onChange={(e) => setTesticularL(e.target.value)}
                      className="rounded-xl"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>睾丸體積 右 (mL)</Label>
                    <Input
                      type="number"
                      step="0.5"
                      value={testicularR}
                      onChange={(e) => setTesticularR(e.target.value)}
                      className="rounded-xl"
                    />
                  </div>
                </>
              )}
            </div>
            <div className="space-y-2">
              <Label>Tanner 備註</Label>
              <Textarea
                placeholder="例：B3→B2 regression, LH suppressed..."
                value={tannerNotes}
                onChange={(e) => setTannerNotes(e.target.value)}
                className="rounded-xl"
                rows={2}
              />
            </div>
          </CardContent>
        </Card>
      )}

      {/* Clinical Assessment */}
      <Card className="rounded-2xl shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-sm">
            <FileText className="h-4 w-4 text-lavender" />
            臨床評估與計畫
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Assessment (評估)</Label>
            <Textarea
              placeholder="臨床評估..."
              value={assessment}
              onChange={(e) => setAssessment(e.target.value)}
              className="rounded-xl"
              rows={3}
            />
          </div>
          <div className="space-y-2">
            <Label>Plan (計畫)</Label>
            <Textarea
              placeholder="治療計畫..."
              value={plan}
              onChange={(e) => setPlan(e.target.value)}
              className="rounded-xl"
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      {/* Notes */}
      <Card className="rounded-2xl shadow-sm">
        <CardHeader>
          <CardTitle className="text-sm">備註</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label className="flex items-center gap-1.5">
              <Lock className="h-3.5 w-3.5 text-coral" />
              醫師內部備註
              <Badge className="rounded-full bg-coral/10 text-coral text-[10px]">
                家長不可見
              </Badge>
            </Label>
            <Textarea
              placeholder="僅醫師可見的內部備註..."
              value={doctorNotes}
              onChange={(e) => setDoctorNotes(e.target.value)}
              className="rounded-xl border-coral/20 focus-visible:ring-coral/30"
              rows={2}
            />
          </div>

          <Separator />

          <div className="space-y-2">
            <Label className="flex items-center gap-1.5">
              <Eye className="h-3.5 w-3.5 text-mint" />
              家長說明
              <Badge className="rounded-full bg-mint/10 text-mint text-[10px]">
                家長可見
              </Badge>
            </Label>
            <Textarea
              placeholder="寫給家長看的回診重點說明..."
              value={parentNotes}
              onChange={(e) => setParentNotes(e.target.value)}
              className="rounded-xl border-mint/20 focus-visible:ring-mint/30"
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      {/* Prescriptions */}
      <Card className="rounded-2xl shadow-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-sm">
              <Pill className="h-4 w-4 text-mint" />
              處方
            </CardTitle>
            <Button
              variant="outline"
              size="sm"
              onClick={addPrescription}
              className="rounded-xl text-xs"
            >
              <Plus className="mr-1 h-3.5 w-3.5" />
              新增處方
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {prescriptions.length === 0 ? (
            <p className="text-center text-sm text-muted-foreground py-4">
              尚未新增處方，點擊上方按鈕新增
            </p>
          ) : (
            prescriptions.map((rx, idx) => (
              <div
                key={rx.id}
                className="rounded-xl border border-border/50 bg-muted/20 p-4 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <Badge className="rounded-full bg-mint/10 text-mint text-xs">
                    處方 {idx + 1}
                  </Badge>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removePrescription(rx.id)}
                    className="h-8 w-8 p-0 text-coral hover:bg-coral/10"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <Label className="text-xs">藥物名稱</Label>
                    <Input
                      placeholder="Norditropin / Leuprolide..."
                      value={rx.medicationName}
                      onChange={(e) =>
                        updatePrescription(rx.id, "medicationName", e.target.value)
                      }
                      className="rounded-xl"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs">劑量</Label>
                    <Input
                      placeholder="0.6 mg"
                      value={rx.dose}
                      onChange={(e) =>
                        updatePrescription(rx.id, "dose", e.target.value)
                      }
                      className="rounded-xl"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs">頻率</Label>
                    <Input
                      placeholder="每日睡前 / 每月一次"
                      value={rx.frequency}
                      onChange={(e) =>
                        updatePrescription(rx.id, "frequency", e.target.value)
                      }
                      className="rounded-xl"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs">給藥途徑</Label>
                    <Select
                      value={rx.route}
                      onValueChange={(v) =>
                        v && updatePrescription(rx.id, "route", v)
                      }
                    >
                      <SelectTrigger className="rounded-xl">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="皮下注射">皮下注射</SelectItem>
                        <SelectItem value="肌肉注射">肌肉注射</SelectItem>
                        <SelectItem value="口服">口服</SelectItem>
                        <SelectItem value="外用">外用</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            ))
          )}
        </CardContent>
      </Card>

      {/* Submit Bar */}
      <div className="sticky bottom-4 flex justify-end gap-3">
        <Link href={`/doctor/patients/${childId}`}>
          <Button variant="outline" className="rounded-xl">
            取消
          </Button>
        </Link>
        <Button
          onClick={handleSubmit}
          className="rounded-xl bg-sky text-white hover:bg-sky/90 shadow-lg shadow-sky/20"
        >
          <Save className="mr-1.5 h-4 w-4" />
          儲存看診紀錄
        </Button>
      </div>
    </PageTransition>
  );
}
