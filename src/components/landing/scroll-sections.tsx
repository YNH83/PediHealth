"use client";

import { useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  TrendingUp,
  Syringe,
  FlaskConical,
  Stethoscope,
  ShieldCheck,
  Heart,
  ChevronDown,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import {
  GhibliBear,
  GhibliGiraffe,
  GhibliCat,
  GhibliBunny,
  GhibliOwl,
} from "@/components/illustrations/ghibli-mascots";

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    icon: TrendingUp,
    iconBg: "bg-sky/10",
    iconColor: "text-sky",
    title: "生長曲線追蹤",
    desc: "台灣衛福部標準 P3~P97 百分位，清楚掌握孩子的成長軌跡",
    lottie: "giraffe" as const,
  },
  {
    icon: Stethoscope,
    iconBg: "bg-lavender/10",
    iconColor: "text-lavender",
    title: "看診紀錄管理",
    desc: "每次回診自動彙整，醫師備註、處方、下次回診一目瞭然",
    lottie: "cat" as const,
  },
  {
    icon: Syringe,
    iconBg: "bg-primary/10",
    iconColor: "text-primary",
    title: "注射日誌",
    desc: "生長激素注射追蹤，部位輪替提醒，合規性統計",
    lottie: "bunny" as const,
  },
  {
    icon: FlaskConical,
    iconBg: "bg-mint/10",
    iconColor: "text-mint",
    title: "檢驗報告",
    desc: "荷爾蒙、代謝、甲狀腺數據視覺化，異常值即時標示",
    lottie: "owl" as const,
  },
];

const trustItems = [
  { number: "17", label: "張專業資料表", suffix: "" },
  { number: "6", label: "種敏感度分析", suffix: "" },
  { number: "100", label: "RLS 資料隔離", suffix: "%" },
];

// ── #16 Canvas Grid: decorative border line ──────────
function GridLine() {
  return <div className="h-px w-full bg-gray-950/[0.06]" />;
}

export function LandingScrollSections() {
  const router = useRouter();
  const sectionsRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const trustRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(".scroll-indicator", {
        opacity: 0, y: -20,
        scrollTrigger: { trigger: heroRef.current, start: "bottom 90%", end: "bottom 60%", scrub: true },
      });
      gsap.from(".pain-card", {
        y: 60, opacity: 0, stagger: 0.15, duration: 0.8, ease: "power2.out",
        scrollTrigger: { trigger: ".pain-section", start: "top 75%", toggleActions: "play none none reverse" },
      });
      gsap.from(".feature-card", {
        x: -80, opacity: 0, stagger: 0.2, duration: 0.8, ease: "power3.out",
        scrollTrigger: { trigger: featuresRef.current, start: "top 70%", toggleActions: "play none none reverse" },
      });
      gsap.from(".feature-mascot", {
        x: 80, opacity: 0, stagger: 0.2, duration: 0.8, ease: "power3.out",
        scrollTrigger: { trigger: featuresRef.current, start: "top 70%", toggleActions: "play none none reverse" },
      });
      gsap.from(".trust-number", {
        textContent: 0, duration: 1.5, ease: "power2.out", snap: { textContent: 1 },
        scrollTrigger: { trigger: trustRef.current, start: "top 75%", toggleActions: "play none none reverse" },
      });
      gsap.from(".trust-card", {
        y: 40, opacity: 0, stagger: 0.15, duration: 0.6, ease: "power2.out",
        scrollTrigger: { trigger: trustRef.current, start: "top 75%", toggleActions: "play none none reverse" },
      });
      gsap.from(".cta-content", {
        scale: 0.9, opacity: 0, duration: 0.8, ease: "power2.out",
        scrollTrigger: { trigger: ctaRef.current, start: "top 80%", toggleActions: "play none none reverse" },
      });
    }, sectionsRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionsRef} className="bg-white">
      {/* ════════════════════════════════════════════
          Section 1: Hero
          #9  Left alignment over center
          #5  Tight tracking for large text
          #6  Monospace eyebrow
          #12 Button: pill, 36-38px, text-sm
          #1  Ring over border on logo container
         ════════════════════════════════════════════ */}
      <section
        ref={heroRef}
        className="relative flex min-h-screen items-center overflow-hidden bg-gradient-to-b from-[#E0F2FE] via-[#FFF5F7] to-[#FFFBF5]"
      >
        <div className="pointer-events-none absolute inset-0">
          {[
            { left: "10%", top: "15%", size: 12, color: "bg-primary/15", dur: 4 },
            { left: "85%", top: "20%", size: 8, color: "bg-sky/20", dur: 3 },
            { left: "20%", top: "75%", size: 10, color: "bg-mint/20", dur: 5 },
            { left: "78%", top: "68%", size: 8, color: "bg-lemon/25", dur: 3.5 },
          ].map((p, i) => (
            <motion.div
              key={i}
              className={`absolute rounded-full ${p.color}`}
              style={{ left: p.left, top: p.top, width: p.size, height: p.size }}
              animate={{ y: [0, -20, 0], opacity: [0.3, 0.7, 0.3] }}
              transition={{ duration: p.dur, repeat: Infinity, delay: i * 0.8 }}
            />
          ))}
        </div>

        {/* #9 Split layout: left text 3/5, right mascots 2/5 */}
        <div className="relative mx-auto flex w-full max-w-5xl flex-col items-start gap-10 px-6 sm:flex-row sm:items-center sm:gap-16 sm:px-10">
          {/* Left: text content */}
          <motion.div
            className="flex-[3]"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* #6 Monospace eyebrow */}
            <p className="mb-4 font-mono text-xs uppercase tracking-wider text-gray-500">
              Pediatric Care Portal
            </p>

            {/* #1 Ring on logo icon */}
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 shadow-md shadow-primary/10 ring-1 ring-gray-950/10">
                <Heart className="h-6 w-6 text-primary" fill="currentColor" />
              </div>
              {/* #5 Tight tracking on large text */}
              <h1 className="font-heading text-4xl font-extrabold tracking-tight text-gray-950 sm:text-5xl">
                PediHealth
              </h1>
            </div>

            {/* #11 CH unit width + #8 double line-height on small text */}
            <h2 className="mb-3 max-w-[22ch] font-heading text-2xl font-bold tracking-tight text-gray-950 sm:text-3xl">
              守護每一個孩子的成長旅程
            </h2>
            <p className="mb-8 max-w-[40ch] text-sm leading-7 text-gray-600">
              專為兒童內分泌設計的照護平台，讓醫師與家長攜手追蹤孩子的每一步成長
            </p>

            {/* #12 Pill buttons, h-[38px] via py, text-sm, no icon on outline */}
            <div className="flex items-center gap-3">
              <Button
                className="h-auto rounded-full px-6 py-2.5 text-sm shadow-md shadow-primary/15 ring-1 ring-gray-950/10"
                onClick={() => router.push("/login")}
              >
                開始使用
                <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
              </Button>
              {/* #13 Ring height fix: wrap in span */}
              <span className="inline-flex rounded-full p-px ring-1 ring-gray-950/10">
                <Button
                  variant="ghost"
                  className="h-auto rounded-full px-6 py-2 text-sm text-gray-700"
                  onClick={() => router.push("/dashboard?demo=true")}
                >
                  體驗 Demo
                </Button>
              </span>
            </div>
          </motion.div>

          {/* Right: mascots 2/5 */}
          <motion.div
            className="flex flex-[2] items-end justify-center gap-0"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <GhibliBear className="h-32 w-32 sm:h-40 sm:w-40" />
            <GhibliGiraffe className="h-40 w-32 sm:h-48 sm:w-36" />
            <GhibliCat className="h-32 w-32 sm:h-40 sm:w-40" />
          </motion.div>
        </div>

        <motion.div
          className="scroll-indicator absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <span className="text-xs text-gray-400">往下了解更多</span>
          <ChevronDown className="h-4 w-4 text-gray-400" />
        </motion.div>
      </section>

      {/* #16 Canvas Grid line */}
      <GridLine />

      {/* ════════════════════════════════════════════
          Section 2: Pain Points
          #1  Ring over border
          #10 Inline section heading
          #3  Inset ring
         ════════════════════════════════════════════ */}
      <section className="pain-section py-20 px-6">
        <div className="mx-auto max-w-4xl">
          {/* #10 Inline heading: title + subtitle same line */}
          <div className="mb-12 flex flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-3">
            {/* #6 Monospace eyebrow */}
            <p className="font-mono text-xs uppercase tracking-wider text-gray-400">Problems</p>
            <h2 className="font-heading text-2xl font-bold tracking-tight text-gray-950 sm:text-3xl">
              兒童內分泌追蹤的三大困擾
            </h2>
            <p className="hidden text-sm text-gray-500 sm:block">您是否也遇到這些問題？</p>
          </div>
          <div className="grid gap-5 sm:grid-cols-3">
            {[
              {
                emoji: "📋",
                title: "紙本紀錄散落各處",
                desc: "生長數據、檢驗報告、注射紀錄分散在不同地方，回診時總是找不到",
              },
              {
                emoji: "📈",
                title: "生長趨勢難以判讀",
                desc: "只有數字沒有圖表，很難直觀了解孩子的生長是否在正常軌道上",
              },
              {
                emoji: "💉",
                title: "注射紀錄容易遺漏",
                desc: "每天打針的時間、部位、劑量靠記憶，合規性和部位輪替難以追蹤",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="pain-card rounded-2xl bg-white p-6 shadow-sm shadow-gray-950/5 ring-1 ring-gray-950/[0.06] transition-shadow hover:shadow-md"
              >
                {/* #1 Ring replaces border; #3 inset ring for subtle edge */}
                <div className="mb-3 text-3xl">{item.emoji}</div>
                <h3 className="mb-2 font-heading text-base font-bold text-gray-950">
                  {item.title}
                </h3>
                {/* #8 Double line-height for small text */}
                <p className="text-sm leading-7 text-gray-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <GridLine />

      {/* ════════════════════════════════════════════
          Section 3: Features
          #14 Well-styled container (凹陷容器)
          #1  Ring over border
          #2  Concentric radius
         ════════════════════════════════════════════ */}
      <section ref={featuresRef} className="py-20 px-6">
        <div className="mx-auto max-w-4xl">
          <div className="mb-12 flex flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-3">
            <p className="font-mono text-xs uppercase tracking-wider text-gray-400">Features</p>
            <h2 className="font-heading text-2xl font-bold tracking-tight text-gray-950 sm:text-3xl">
              一個平台，解決所有追蹤需求
            </h2>
            <p className="hidden text-sm text-gray-500 sm:block">醫師與家長共同使用，資料即時同步</p>
          </div>

          <div className="flex flex-col gap-6">
            {features.map((f, i) => (
              <div
                key={i}
                className={`flex items-center gap-6 ${i % 2 === 1 ? "flex-row-reverse" : ""}`}
              >
                {/* #14 Well-styled container: faint bg + inset ring + no border */}
                <div className="feature-card flex-1 rounded-2xl bg-gray-950/[0.025] p-6 ring-1 ring-inset ring-gray-950/[0.05]">
                  {/* #2 Concentric radius: outer 16px - padding 24px = inner uses smaller radius */}
                  <div
                    className={`mb-3 flex h-10 w-10 items-center justify-center rounded-lg ${f.iconBg} ring-1 ring-inset ring-gray-950/[0.05]`}
                  >
                    <f.icon className={`h-5 w-5 ${f.iconColor}`} />
                  </div>
                  <h3 className="mb-2 font-heading text-base font-bold tracking-tight text-gray-950">
                    {f.title}
                  </h3>
                  <p className="max-w-[40ch] text-sm leading-7 text-gray-500">{f.desc}</p>
                </div>
                <div className="feature-mascot hidden sm:block">
                  {f.lottie === "giraffe" && <GhibliGiraffe className="h-40 w-32" />}
                  {f.lottie === "cat" && <GhibliCat className="h-36 w-36" />}
                  {f.lottie === "bunny" && <GhibliBunny className="h-36 w-36" />}
                  {f.lottie === "owl" && <GhibliOwl className="h-36 w-36" />}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <GridLine />

      {/* ════════════════════════════════════════════
          Section 4: Trust / Security
          #1  Ring
          #3  Inset ring
          #10 Inline heading
         ════════════════════════════════════════════ */}
      <section ref={trustRef} className="py-20 px-6">
        <div className="mx-auto max-w-4xl">
          <div className="mb-12 flex flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-3">
            <p className="font-mono text-xs uppercase tracking-wider text-gray-400">Security</p>
            <h2 className="font-heading text-2xl font-bold tracking-tight text-gray-950 sm:text-3xl">
              <ShieldCheck className="mr-1.5 inline-block h-6 w-6 text-mint" />
              安全與隱私，我們最在意
            </h2>
            <p className="hidden text-sm text-gray-500 sm:block">醫療資料需要最高等級的保護</p>
          </div>

          {/* Stats with ring */}
          <div className="mb-10 grid grid-cols-3 gap-4">
            {trustItems.map((item, i) => (
              <div
                key={i}
                className="trust-card rounded-2xl bg-gray-950/[0.02] p-6 text-center ring-1 ring-inset ring-gray-950/[0.05]"
              >
                <div className="flex items-baseline justify-center gap-0.5">
                  {/* #5 Tight tracking on numbers */}
                  <span className="trust-number font-heading text-4xl font-extrabold tracking-tighter text-gray-950">
                    {item.number}
                  </span>
                  <span className="text-lg font-bold text-gray-400">{item.suffix}</span>
                </div>
                <p className="mt-1 text-sm text-gray-500">{item.label}</p>
              </div>
            ))}
          </div>

          {/* Security features: #1 ring, #3 inset ring */}
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              { title: "Row-Level Security", desc: "家長只能看到自己孩子的資料，醫師只能看到自己患者的資料" },
              { title: "醫師備註隔離", desc: "醫師內部筆記（doctor_notes）在應用層嚴格隔離，家長端永遠不可見" },
              { title: "SSL 加密傳輸", desc: "所有資料傳輸皆經過 SSL 加密，確保傳輸過程安全" },
              { title: "角色認證導向", desc: "Middleware 自動判斷角色，家長與醫師各自導向專屬介面" },
            ].map((item, i) => (
              <div
                key={i}
                className="trust-card flex items-start gap-3 rounded-xl bg-white p-4 ring-1 ring-gray-950/[0.06]"
              >
                <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-mint/10 ring-1 ring-inset ring-mint/20">
                  <ShieldCheck className="h-3.5 w-3.5 text-mint" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-950">{item.title}</h4>
                  <p className="text-xs leading-5 text-gray-500">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <GridLine />

      {/* ════════════════════════════════════════════
          Section 5: CTA
          #9  Left alignment
          #12 Pill buttons
         ════════════════════════════════════════════ */}
      <section
        ref={ctaRef}
        className="relative overflow-hidden bg-gradient-to-b from-gray-950/[0.02] to-white py-24 px-6"
      >
        <div className="cta-content relative mx-auto flex max-w-4xl flex-col items-center gap-8 sm:flex-row sm:items-center sm:gap-16">
          <GhibliBear className="h-36 w-36 shrink-0" />
          <div className="text-center sm:text-left">
            <p className="mb-2 font-mono text-xs uppercase tracking-wider text-gray-400">Get Started</p>
            <h2 className="mb-3 font-heading text-2xl font-bold tracking-tight text-gray-950 sm:text-3xl">
              準備好開始了嗎？
            </h2>
            <p className="mb-6 max-w-[40ch] text-sm leading-7 text-gray-500">
              立即體驗 PediHealth，讓孩子的成長紀錄不再遺漏
            </p>
            <div className="flex flex-col items-center gap-3 sm:flex-row">
              <Button
                className="h-auto w-full rounded-full px-8 py-2.5 text-sm shadow-md shadow-primary/15 ring-1 ring-gray-950/10 sm:w-auto"
                onClick={() => router.push("/register")}
              >
                免費註冊
                <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
              </Button>
              <span className="inline-flex w-full rounded-full p-px ring-1 ring-gray-950/10 sm:w-auto">
                <Button
                  variant="ghost"
                  className="h-auto w-full rounded-full px-8 py-2 text-sm text-gray-700 sm:w-auto"
                  onClick={() => router.push("/dashboard?demo=true")}
                >
                  先看看 Demo
                </Button>
              </span>
            </div>
            <p className="mt-4 text-xs text-gray-400">
              家長與醫師皆可註冊，完全免費
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <GridLine />
      <footer className="py-8 text-center">
        <p className="font-mono text-xs text-gray-400">
          PediHealth &copy; 2026
        </p>
      </footer>
    </div>
  );
}
