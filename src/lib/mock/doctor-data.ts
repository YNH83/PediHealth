import {
  type Child,
  type Visit,
  type GrowthMeasurement,
  type LabReport,
  mockChildren,
  mockVisits,
  mockGrowthData,
  mockGrowthDataChild2,
  mockLabReports,
  mockInjectionLogs,
  mockGHPrescription,
} from "./data";

// ── Extended patient list for doctor view ──────────────

export interface PatientSummary {
  child: Child;
  lastVisitDate: string | null;
  nextVisitDate: string | null;
  latestHeightCm: number | null;
  latestWeightKg: number | null;
  growthVelocity: number | null;
  injectionCompliance: number | null; // percentage
  status: "active" | "stable" | "attention";
}

const additionalChildren: Child[] = [
  {
    id: "child-3",
    name: "小豪",
    dateOfBirth: "2016-09-10",
    sex: "male",
    diagnosisTags: ["obesity"],
    avatar: "👦",
    fatherHeightCm: 178,
    motherHeightCm: 160,
    targetHeightCm: 175.5,
    gestationalAge: 40,
    birthWeightKg: 3.8,
    birthLengthCm: 51,
  },
  {
    id: "child-4",
    name: "小雨",
    dateOfBirth: "2019-03-22",
    sex: "female",
    diagnosisTags: ["gh_deficiency", "short_stature"],
    avatar: "👧",
    fatherHeightCm: 165,
    motherHeightCm: 155,
    targetHeightCm: 153.5,
    gestationalAge: 36,
    birthWeightKg: 2.4,
    birthLengthCm: 45,
  },
  {
    id: "child-5",
    name: "小宇",
    dateOfBirth: "2017-11-05",
    sex: "male",
    diagnosisTags: ["precocious_puberty"],
    avatar: "🧒",
    fatherHeightCm: 172,
    motherHeightCm: 163,
    targetHeightCm: 174,
    gestationalAge: 39,
    birthWeightKg: 3.3,
    birthLengthCm: 50,
  },
  {
    id: "child-6",
    name: "小琳",
    dateOfBirth: "2018-07-14",
    sex: "female",
    diagnosisTags: ["precocious_puberty", "obesity"],
    avatar: "👧",
    fatherHeightCm: 170,
    motherHeightCm: 158,
    targetHeightCm: 157.5,
    gestationalAge: 38,
    birthWeightKg: 3.1,
    birthLengthCm: 49,
  },
];

export const allPatients: Child[] = [...mockChildren, ...additionalChildren];

export function getPatientSummaries(): PatientSummary[] {
  return allPatients.map((child) => {
    const visits = mockVisits.filter((v) => v.childId === child.id);
    const lastVisit = visits[0] ?? null;
    const nextVisit = visits.find((v) => v.nextVisitDate)?.nextVisitDate ?? null;

    let growth: GrowthMeasurement[] = [];
    if (child.id === "child-1") growth = mockGrowthData;
    else if (child.id === "child-2") growth = mockGrowthDataChild2;

    const latest = growth[growth.length - 1];
    const injections = mockInjectionLogs.filter(
      (i) => i.childId === child.id
    );
    const hasGH = child.diagnosisTags.includes("gh_deficiency");

    let compliance: number | null = null;
    if (hasGH && injections.length > 0) {
      const marchInj = injections.filter((i) =>
        i.injectionDate.startsWith("2026-03")
      ).length;
      compliance = Math.round((marchInj / 31) * 100);
    }

    let status: "active" | "stable" | "attention" = "stable";
    if (hasGH && compliance !== null && compliance < 80) status = "attention";
    if (child.diagnosisTags.includes("obesity")) status = "attention";
    if (latest && latest.growthVelocityCmYr && latest.growthVelocityCmYr >= 6)
      status = "active";

    return {
      child,
      lastVisitDate: lastVisit?.visitDate ?? null,
      nextVisitDate: nextVisit,
      latestHeightCm: latest?.heightCm ?? null,
      latestWeightKg: latest?.weightKg ?? null,
      growthVelocity: latest?.growthVelocityCmYr ?? null,
      injectionCompliance: compliance,
      status,
    };
  });
}

// ── Tanner Staging Records ────────────────────────────

export interface TannerRecord {
  id: string;
  childId: string;
  date: string;
  breastStage: number | null;
  pubicHairStage: number;
  genitalStage: number | null;
  testicularVolumeMlLeft: number | null;
  testicularVolumeMlRight: number | null;
  menarche: boolean;
  menarcheDate: string | null;
  notes: string;
}

export const mockTannerRecords: TannerRecord[] = [
  {
    id: "tn-1",
    childId: "child-2",
    date: "2025-06-15",
    breastStage: 3,
    pubicHairStage: 2,
    genitalStage: null,
    testicularVolumeMlLeft: null,
    testicularVolumeMlRight: null,
    menarche: false,
    menarcheDate: null,
    notes: "B3PH2, bone age advanced 2 years. Started GnRH agonist.",
  },
  {
    id: "tn-2",
    childId: "child-2",
    date: "2025-12-12",
    breastStage: 2,
    pubicHairStage: 2,
    genitalStage: null,
    testicularVolumeMlLeft: null,
    testicularVolumeMlRight: null,
    menarche: false,
    menarcheDate: null,
    notes: "Regression from B3 to B2. Good suppression with Leuprolide.",
  },
  {
    id: "tn-3",
    childId: "child-2",
    date: "2026-03-15",
    breastStage: 2,
    pubicHairStage: 1,
    genitalStage: null,
    testicularVolumeMlLeft: null,
    testicularVolumeMlRight: null,
    menarche: false,
    menarcheDate: null,
    notes: "B2PH1. Continued regression. LH suppressed <0.3. Bone age advance reduced to 1 year.",
  },
];

// ── Doctor's Today Schedule ───────────────────────────

export interface ScheduleItem {
  time: string;
  childId: string;
  childName: string;
  visitType: "follow_up" | "initial";
  reason: string;
}

export const todaySchedule: ScheduleItem[] = [
  { time: "09:00", childId: "child-1", childName: "小明", visitType: "follow_up", reason: "GH 治療追蹤 (9M)" },
  { time: "09:30", childId: "child-4", childName: "小雨", visitType: "initial", reason: "矮小症初診評估" },
  { time: "10:00", childId: "child-2", childName: "小美", visitType: "follow_up", reason: "性早熟 GnRH agonist 追蹤" },
  { time: "10:30", childId: "child-3", childName: "小豪", visitType: "follow_up", reason: "兒童肥胖代謝追蹤" },
  { time: "11:00", childId: "child-6", childName: "小琳", visitType: "follow_up", reason: "性早熟 + 體重管理" },
  { time: "11:30", childId: "child-5", childName: "小宇", visitType: "initial", reason: "男童性早熟評估" },
];
