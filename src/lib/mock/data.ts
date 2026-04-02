// ── Types ──────────────────────────────────────────────

export interface Child {
  id: string;
  name: string;
  dateOfBirth: string; // ISO
  sex: "male" | "female";
  diagnosisTags: string[];
  avatar: string; // emoji
  fatherHeightCm: number;
  motherHeightCm: number;
  targetHeightCm: number;
  gestationalAge: number;
  birthWeightKg: number;
  birthLengthCm: number;
}

export interface GrowthMeasurement {
  id: string;
  childId: string;
  measuredAt: string;
  heightCm: number;
  weightKg: number;
  bmi: number;
  heightPercentile: number;
  weightPercentile: number;
  bmiPercentile: number;
  growthVelocityCmYr: number | null;
  boneAgeYears: number | null;
  predictedAdultHeightCm: number | null;
}

export interface Visit {
  id: string;
  childId: string;
  doctorName: string;
  visitDate: string;
  visitType: "initial" | "follow_up" | "emergency";
  chiefComplaint: string;
  parentVisibleNotes: string;
  prescriptions: Prescription[];
  nextVisitDate: string | null;
}

export interface Prescription {
  id: string;
  medicationName: string;
  dose: string;
  frequency: string;
  route: string;
  isActive: boolean;
}

export interface InjectionLog {
  id: string;
  childId: string;
  injectionDate: string;
  injectionTime: string;
  doseAdministeredMg: number;
  injectionSite: string;
  painLevel: number;
  sideEffects: string[];
}

export interface GHPrescription {
  id: string;
  childId: string;
  medicationName: string;
  doseMg: number;
  frequency: string;
  startDate: string;
  isActive: boolean;
}

export interface LabReport {
  id: string;
  childId: string;
  reportDate: string;
  category: string;
  results: LabResult[];
}

export interface LabResult {
  id: string;
  testName: string;
  value: number;
  unit: string;
  referenceRangeLow: number;
  referenceRangeHigh: number;
  isAbnormal: boolean;
  flag: "normal" | "low" | "high";
}

// ── Mock Children ──────────────────────────────────────

export const mockChildren: Child[] = [
  {
    id: "child-1",
    name: "小明",
    dateOfBirth: "2018-01-15",
    sex: "male",
    diagnosisTags: ["gh_deficiency", "short_stature"],
    avatar: "🧒",
    fatherHeightCm: 170,
    motherHeightCm: 158,
    targetHeightCm: 170.5,
    gestationalAge: 39,
    birthWeightKg: 3.2,
    birthLengthCm: 49,
  },
  {
    id: "child-2",
    name: "小美",
    dateOfBirth: "2017-06-20",
    sex: "female",
    diagnosisTags: ["precocious_puberty"],
    avatar: "👧",
    fatherHeightCm: 175,
    motherHeightCm: 162,
    targetHeightCm: 162,
    gestationalAge: 38,
    birthWeightKg: 2.9,
    birthLengthCm: 48,
  },
];

// ── Mock Growth Data (小明) ────────────────────────────

export const mockGrowthData: GrowthMeasurement[] = [
  {
    id: "g1",
    childId: "child-1",
    measuredAt: "2024-01-20",
    heightCm: 110.2,
    weightKg: 18.5,
    bmi: 15.2,
    heightPercentile: 3,
    weightPercentile: 10,
    bmiPercentile: 25,
    growthVelocityCmYr: null,
    boneAgeYears: 4.5,
    predictedAdultHeightCm: 158,
  },
  {
    id: "g2",
    childId: "child-1",
    measuredAt: "2024-04-15",
    heightCm: 111.8,
    weightKg: 19.0,
    bmi: 15.2,
    heightPercentile: 3,
    weightPercentile: 10,
    bmiPercentile: 25,
    growthVelocityCmYr: 5.2,
    boneAgeYears: 4.8,
    predictedAdultHeightCm: 159,
  },
  {
    id: "g3",
    childId: "child-1",
    measuredAt: "2024-07-10",
    heightCm: 113.5,
    weightKg: 19.6,
    bmi: 15.2,
    heightPercentile: 5,
    weightPercentile: 12,
    bmiPercentile: 25,
    growthVelocityCmYr: 6.8,
    boneAgeYears: 5.0,
    predictedAdultHeightCm: 161,
  },
  {
    id: "g4",
    childId: "child-1",
    measuredAt: "2024-10-08",
    heightCm: 115.3,
    weightKg: 20.2,
    bmi: 15.2,
    heightPercentile: 5,
    weightPercentile: 12,
    bmiPercentile: 26,
    growthVelocityCmYr: 7.2,
    boneAgeYears: 5.2,
    predictedAdultHeightCm: 163,
  },
  {
    id: "g5",
    childId: "child-1",
    measuredAt: "2025-01-15",
    heightCm: 117.2,
    weightKg: 20.8,
    bmi: 15.1,
    heightPercentile: 8,
    weightPercentile: 15,
    bmiPercentile: 24,
    growthVelocityCmYr: 7.6,
    boneAgeYears: 5.5,
    predictedAdultHeightCm: 165,
  },
  {
    id: "g6",
    childId: "child-1",
    measuredAt: "2025-04-12",
    heightCm: 119.0,
    weightKg: 21.4,
    bmi: 15.1,
    heightPercentile: 10,
    weightPercentile: 15,
    bmiPercentile: 24,
    growthVelocityCmYr: 7.2,
    boneAgeYears: 5.8,
    predictedAdultHeightCm: 166,
  },
  {
    id: "g7",
    childId: "child-1",
    measuredAt: "2025-07-10",
    heightCm: 120.8,
    weightKg: 22.0,
    bmi: 15.1,
    heightPercentile: 12,
    weightPercentile: 18,
    bmiPercentile: 25,
    growthVelocityCmYr: 7.2,
    boneAgeYears: 6.0,
    predictedAdultHeightCm: 167,
  },
  {
    id: "g8",
    childId: "child-1",
    measuredAt: "2025-10-05",
    heightCm: 122.5,
    weightKg: 22.6,
    bmi: 15.1,
    heightPercentile: 15,
    weightPercentile: 20,
    bmiPercentile: 25,
    growthVelocityCmYr: 6.8,
    boneAgeYears: 6.3,
    predictedAdultHeightCm: 168,
  },
  {
    id: "g9",
    childId: "child-1",
    measuredAt: "2026-01-10",
    heightCm: 124.1,
    weightKg: 23.2,
    bmi: 15.1,
    heightPercentile: 15,
    weightPercentile: 20,
    bmiPercentile: 25,
    growthVelocityCmYr: 6.4,
    boneAgeYears: 6.5,
    predictedAdultHeightCm: 168.5,
  },
  {
    id: "g10",
    childId: "child-1",
    measuredAt: "2026-03-25",
    heightCm: 125.3,
    weightKg: 23.6,
    bmi: 15.0,
    heightPercentile: 18,
    weightPercentile: 22,
    bmiPercentile: 24,
    growthVelocityCmYr: 7.2,
    boneAgeYears: 6.8,
    predictedAdultHeightCm: 169,
  },
];

// ── Mock Growth Data (小美) ────────────────────────────

export const mockGrowthDataChild2: GrowthMeasurement[] = [
  {
    id: "g2-1",
    childId: "child-2",
    measuredAt: "2025-06-15",
    heightCm: 135.2,
    weightKg: 32.5,
    bmi: 17.8,
    heightPercentile: 75,
    weightPercentile: 65,
    bmiPercentile: 55,
    growthVelocityCmYr: 8.5,
    boneAgeYears: 10.5,
    predictedAdultHeightCm: 155,
  },
  {
    id: "g2-2",
    childId: "child-2",
    measuredAt: "2025-09-10",
    heightCm: 137.0,
    weightKg: 33.2,
    bmi: 17.7,
    heightPercentile: 75,
    weightPercentile: 65,
    bmiPercentile: 55,
    growthVelocityCmYr: 7.2,
    boneAgeYears: 10.8,
    predictedAdultHeightCm: 156,
  },
  {
    id: "g2-3",
    childId: "child-2",
    measuredAt: "2025-12-12",
    heightCm: 138.5,
    weightKg: 33.8,
    bmi: 17.6,
    heightPercentile: 72,
    weightPercentile: 62,
    bmiPercentile: 52,
    growthVelocityCmYr: 6.0,
    boneAgeYears: 10.5,
    predictedAdultHeightCm: 158,
  },
  {
    id: "g2-4",
    childId: "child-2",
    measuredAt: "2026-03-15",
    heightCm: 139.8,
    weightKg: 34.2,
    bmi: 17.5,
    heightPercentile: 70,
    weightPercentile: 60,
    bmiPercentile: 50,
    growthVelocityCmYr: 5.2,
    boneAgeYears: 10.2,
    predictedAdultHeightCm: 160,
  },
];

// ── Mock Visits ────────────────────────────────────────

export const mockVisits: Visit[] = [
  {
    id: "v1",
    childId: "child-1",
    doctorName: "蘇本華 醫師",
    visitDate: "2026-03-25",
    visitType: "follow_up",
    chiefComplaint: "生長激素治療追蹤（第 6 個月）",
    parentVisibleNotes:
      "小明身高成長良好，生長速率維持在 7.2 cm/year。IGF-1 正常。繼續目前 GH 劑量。下次回診請帶骨齡 X 光。",
    prescriptions: [
      {
        id: "rx1",
        medicationName: "Norditropin (GH)",
        dose: "0.6 mg",
        frequency: "每日睡前",
        route: "皮下注射",
        isActive: true,
      },
    ],
    nextVisitDate: "2026-06-25",
  },
  {
    id: "v2",
    childId: "child-1",
    doctorName: "蘇本華 醫師",
    visitDate: "2026-01-10",
    visitType: "follow_up",
    chiefComplaint: "生長激素治療追蹤（第 3 個月）",
    parentVisibleNotes:
      "GH 治療反應良好，身高增加 1.6 cm。注射順從性佳（98%）。建議繼續目前劑量。抽血追蹤 IGF-1 及甲狀腺功能。",
    prescriptions: [
      {
        id: "rx2",
        medicationName: "Norditropin (GH)",
        dose: "0.6 mg",
        frequency: "每日睡前",
        route: "皮下注射",
        isActive: true,
      },
    ],
    nextVisitDate: "2026-03-25",
  },
  {
    id: "v3",
    childId: "child-1",
    doctorName: "蘇本華 醫師",
    visitDate: "2025-10-05",
    visitType: "initial",
    chiefComplaint: "身材矮小評估，疑似生長激素缺乏",
    parentVisibleNotes:
      "GH 刺激試驗確認 GH 缺乏（peak GH 5.2 ng/mL）。骨齡落後實際年齡 1.5 年。建議開始生長激素治療。已說明注射方式及副作用。",
    prescriptions: [
      {
        id: "rx3",
        medicationName: "Norditropin (GH)",
        dose: "0.6 mg",
        frequency: "每日睡前",
        route: "皮下注射",
        isActive: true,
      },
    ],
    nextVisitDate: "2026-01-10",
  },
  {
    id: "v4",
    childId: "child-2",
    doctorName: "蘇本華 醫師",
    visitDate: "2026-03-15",
    visitType: "follow_up",
    chiefComplaint: "性早熟 GnRH agonist 治療追蹤",
    parentVisibleNotes:
      "Tanner B3 -> B2（退縮良好）。LH 抑制至 <0.3。骨齡延遲已見效，從超前 2 年降至超前 1 年。繼續 Leuprolide 治療。",
    prescriptions: [
      {
        id: "rx4",
        medicationName: "Leuprolide (GnRH agonist)",
        dose: "3.75 mg",
        frequency: "每月一次",
        route: "肌肉注射",
        isActive: true,
      },
    ],
    nextVisitDate: "2026-06-15",
  },
];

// ── Mock GH Prescription ──────────────────────────────

export const mockGHPrescription: GHPrescription = {
  id: "ghp-1",
  childId: "child-1",
  medicationName: "Norditropin FlexPro",
  doseMg: 0.6,
  frequency: "每日睡前",
  startDate: "2025-10-10",
  isActive: true,
};

// ── Mock Injection Logs (March 2026) ──────────────────

function generateInjectionLogs(): InjectionLog[] {
  const sites = [
    "left_thigh",
    "right_thigh",
    "left_abdomen",
    "right_abdomen",
    "left_arm",
    "right_arm",
  ];
  const logs: InjectionLog[] = [];
  for (let day = 1; day <= 31; day++) {
    const dateStr = `2026-03-${String(day).padStart(2, "0")}`;
    const missed = day === 12 || day === 23; // 2 missed days
    if (!missed) {
      logs.push({
        id: `inj-${day}`,
        childId: "child-1",
        injectionDate: dateStr,
        injectionTime: "21:00",
        doseAdministeredMg: 0.6,
        injectionSite: sites[(day - 1) % sites.length],
        painLevel: Math.floor(Math.random() * 3),
        sideEffects: day === 5 ? ["注射部位輕微紅腫"] : [],
      });
    }
  }
  return logs;
}

export const mockInjectionLogs: InjectionLog[] = generateInjectionLogs();

// ── Mock Lab Reports ──────────────────────────────────

export const mockLabReports: LabReport[] = [
  {
    id: "lab-1",
    childId: "child-1",
    reportDate: "2026-03-20",
    category: "hormone",
    results: [
      {
        id: "lr1",
        testName: "IGF-1",
        value: 285,
        unit: "ng/mL",
        referenceRangeLow: 100,
        referenceRangeHigh: 400,
        isAbnormal: false,
        flag: "normal",
      },
      {
        id: "lr2",
        testName: "IGFBP-3",
        value: 3.8,
        unit: "mg/L",
        referenceRangeLow: 2.0,
        referenceRangeHigh: 5.0,
        isAbnormal: false,
        flag: "normal",
      },
    ],
  },
  {
    id: "lab-2",
    childId: "child-1",
    reportDate: "2026-03-20",
    category: "thyroid",
    results: [
      {
        id: "lr3",
        testName: "TSH",
        value: 2.5,
        unit: "mIU/L",
        referenceRangeLow: 0.4,
        referenceRangeHigh: 4.0,
        isAbnormal: false,
        flag: "normal",
      },
      {
        id: "lr4",
        testName: "Free T4",
        value: 1.2,
        unit: "ng/dL",
        referenceRangeLow: 0.8,
        referenceRangeHigh: 1.8,
        isAbnormal: false,
        flag: "normal",
      },
    ],
  },
  {
    id: "lab-3",
    childId: "child-1",
    reportDate: "2026-01-08",
    category: "hormone",
    results: [
      {
        id: "lr5",
        testName: "IGF-1",
        value: 220,
        unit: "ng/mL",
        referenceRangeLow: 100,
        referenceRangeHigh: 400,
        isAbnormal: false,
        flag: "normal",
      },
      {
        id: "lr6",
        testName: "IGFBP-3",
        value: 3.2,
        unit: "mg/L",
        referenceRangeLow: 2.0,
        referenceRangeHigh: 5.0,
        isAbnormal: false,
        flag: "normal",
      },
    ],
  },
  {
    id: "lab-4",
    childId: "child-1",
    reportDate: "2025-10-01",
    category: "hormone",
    results: [
      {
        id: "lr7",
        testName: "IGF-1",
        value: 85,
        unit: "ng/mL",
        referenceRangeLow: 100,
        referenceRangeHigh: 400,
        isAbnormal: true,
        flag: "low",
      },
      {
        id: "lr8",
        testName: "GH Peak (Stimulation)",
        value: 5.2,
        unit: "ng/mL",
        referenceRangeLow: 10,
        referenceRangeHigh: 40,
        isAbnormal: true,
        flag: "low",
      },
    ],
  },
  {
    id: "lab-5",
    childId: "child-2",
    reportDate: "2026-03-10",
    category: "hormone",
    results: [
      {
        id: "lr9",
        testName: "LH (suppressed)",
        value: 0.2,
        unit: "mIU/mL",
        referenceRangeLow: 0,
        referenceRangeHigh: 0.5,
        isAbnormal: false,
        flag: "normal",
      },
      {
        id: "lr10",
        testName: "FSH",
        value: 1.1,
        unit: "mIU/mL",
        referenceRangeLow: 0.5,
        referenceRangeHigh: 5.0,
        isAbnormal: false,
        flag: "normal",
      },
      {
        id: "lr11",
        testName: "Estradiol",
        value: 12,
        unit: "pg/mL",
        referenceRangeLow: 0,
        referenceRangeHigh: 20,
        isAbnormal: false,
        flag: "normal",
      },
    ],
  },
];

// ── Taiwan Growth Standards (simplified percentiles) ───
// Boys height-for-age (cm), selected ages in months

export const twGrowthStandardsBoyHeight = [
  { ageMonths: 72, p3: 107.5, p10: 110.0, p25: 112.5, p50: 115.5, p75: 118.5, p90: 121.0, p97: 123.5 },
  { ageMonths: 78, p3: 110.0, p10: 112.5, p25: 115.0, p50: 118.0, p75: 121.0, p90: 123.5, p97: 126.0 },
  { ageMonths: 84, p3: 112.5, p10: 115.0, p25: 117.5, p50: 120.5, p75: 123.5, p90: 126.0, p97: 128.5 },
  { ageMonths: 90, p3: 115.0, p10: 117.5, p25: 120.0, p50: 123.0, p75: 126.0, p90: 128.5, p97: 131.0 },
  { ageMonths: 96, p3: 117.5, p10: 120.0, p25: 122.5, p50: 125.5, p75: 128.5, p90: 131.0, p97: 133.5 },
  { ageMonths: 102, p3: 119.5, p10: 122.0, p25: 124.5, p50: 127.5, p75: 130.5, p90: 133.5, p97: 136.0 },
  { ageMonths: 108, p3: 121.5, p10: 124.0, p25: 127.0, p50: 130.0, p75: 133.0, p90: 136.0, p97: 138.5 },
  { ageMonths: 114, p3: 123.5, p10: 126.0, p25: 129.0, p50: 132.0, p75: 135.5, p90: 138.5, p97: 141.0 },
  { ageMonths: 120, p3: 125.5, p10: 128.0, p25: 131.0, p50: 134.5, p75: 137.5, p90: 140.5, p97: 143.5 },
];

export const twGrowthStandardsGirlHeight = [
  { ageMonths: 72, p3: 106.5, p10: 109.0, p25: 111.5, p50: 114.5, p75: 117.5, p90: 120.0, p97: 122.5 },
  { ageMonths: 78, p3: 109.0, p10: 111.5, p25: 114.0, p50: 117.0, p75: 120.0, p90: 122.5, p97: 125.0 },
  { ageMonths: 84, p3: 111.5, p10: 114.0, p25: 116.5, p50: 119.5, p75: 122.5, p90: 125.0, p97: 127.5 },
  { ageMonths: 90, p3: 114.0, p10: 116.5, p25: 119.0, p50: 122.0, p75: 125.0, p90: 127.5, p97: 130.0 },
  { ageMonths: 96, p3: 116.0, p10: 118.5, p25: 121.5, p50: 124.5, p75: 127.5, p90: 130.0, p97: 132.5 },
  { ageMonths: 102, p3: 118.5, p10: 121.0, p25: 123.5, p50: 127.0, p75: 130.0, p90: 133.0, p97: 135.5 },
  { ageMonths: 108, p3: 120.5, p10: 123.0, p25: 126.0, p50: 129.0, p75: 132.5, p90: 135.5, p97: 138.0 },
  { ageMonths: 114, p3: 123.0, p10: 125.5, p25: 128.5, p50: 131.5, p75: 135.0, p90: 138.0, p97: 140.5 },
  { ageMonths: 120, p3: 125.0, p10: 127.5, p25: 130.5, p50: 134.0, p75: 137.5, p90: 140.5, p97: 143.5 },
];

// ── Helper functions ──────────────────────────────────

export function getChildAge(dob: string): { years: number; months: number } {
  const birth = new Date(dob);
  const now = new Date();
  let years = now.getFullYear() - birth.getFullYear();
  let months = now.getMonth() - birth.getMonth();
  if (months < 0) {
    years--;
    months += 12;
  }
  return { years, months };
}

export function getChildAgeMonths(dob: string): number {
  const { years, months } = getChildAge(dob);
  return years * 12 + months;
}

export function formatAge(dob: string, locale: string): string {
  const { years, months } = getChildAge(dob);
  if (locale === "zh-TW") return `${years} 歲 ${months} 個月`;
  return `${years}y ${months}m`;
}

export function daysUntil(dateStr: string): number {
  const target = new Date(dateStr);
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  target.setHours(0, 0, 0, 0);
  return Math.ceil((target.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
}

export function getGrowthDataForChild(childId: string): GrowthMeasurement[] {
  if (childId === "child-2") return mockGrowthDataChild2;
  return mockGrowthData;
}

export function getVisitsForChild(childId: string): Visit[] {
  return mockVisits.filter((v) => v.childId === childId);
}

export function getLabReportsForChild(childId: string): LabReport[] {
  return mockLabReports.filter((l) => l.childId === childId);
}

export function getInjectionsForChild(childId: string): InjectionLog[] {
  return mockInjectionLogs.filter((i) => i.childId === childId);
}
