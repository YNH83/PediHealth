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
} from "lucide-react";
import {
  LottieBear,
  LottieGiraffe,
  LottieCat,
  LottieBunny,
  LottieOwl,
  LottieDoctor,
  LottieHeartbeat,
} from "@/components/illustrations/lottie-mascots";

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

export function LandingScrollSections() {
  const router = useRouter();
  const sectionsRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const trustRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero scroll indicator fade out
      gsap.to(".scroll-indicator", {
        opacity: 0,
        y: -20,
        scrollTrigger: {
          trigger: heroRef.current,
          start: "bottom 90%",
          end: "bottom 60%",
          scrub: true,
        },
      });

      // Pain points section
      gsap.from(".pain-card", {
        y: 60,
        opacity: 0,
        stagger: 0.15,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".pain-section",
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });

      // Feature cards with stagger
      gsap.from(".feature-card", {
        x: -80,
        opacity: 0,
        stagger: 0.2,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: featuresRef.current,
          start: "top 70%",
          toggleActions: "play none none reverse",
        },
      });

      // Feature mascots slide in from right
      gsap.from(".feature-mascot", {
        x: 80,
        opacity: 0,
        stagger: 0.2,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: featuresRef.current,
          start: "top 70%",
          toggleActions: "play none none reverse",
        },
      });

      // Trust numbers count up
      gsap.from(".trust-number", {
        textContent: 0,
        duration: 1.5,
        ease: "power2.out",
        snap: { textContent: 1 },
        scrollTrigger: {
          trigger: trustRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });

      // Trust cards
      gsap.from(".trust-card", {
        y: 40,
        opacity: 0,
        stagger: 0.15,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: trustRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });

      // CTA section
      gsap.from(".cta-content", {
        scale: 0.9,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ctaRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });
    }, sectionsRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionsRef}>
      {/* ── Section 1: Hero ─────────────────────── */}
      <section
        ref={heroRef}
        className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-[#E0F2FE] via-[#FFF5F7] to-[#FFFBF5] px-4"
      >
        {/* Floating particles */}
        <div className="pointer-events-none absolute inset-0">
          {[
            { left: "10%", top: "15%", size: 12, color: "bg-primary/20", dur: 4 },
            { left: "80%", top: "25%", size: 8, color: "bg-sky/30", dur: 3 },
            { left: "25%", top: "70%", size: 10, color: "bg-mint/30", dur: 5 },
            { left: "75%", top: "65%", size: 8, color: "bg-lemon/40", dur: 3.5 },
            { left: "50%", top: "10%", size: 6, color: "bg-lavender/30", dur: 4.5 },
          ].map((p, i) => (
            <motion.div
              key={i}
              className={`absolute rounded-full ${p.color}`}
              style={{ left: p.left, top: p.top, width: p.size, height: p.size }}
              animate={{ y: [0, -20, 0], opacity: [0.3, 0.8, 0.3] }}
              transition={{ duration: p.dur, repeat: Infinity, delay: i * 0.7 }}
            />
          ))}
        </div>

        {/* Logo + Title */}
        <motion.div
          className="flex flex-col items-center gap-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center gap-3">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 shadow-lg shadow-primary/10">
              <Heart className="h-7 w-7 text-primary" fill="currentColor" />
            </div>
            <div>
              <h1 className="font-heading text-4xl font-extrabold text-foreground sm:text-5xl">
                PediHealth
              </h1>
              <p className="text-xs tracking-widest text-muted-foreground">
                PEDIATRIC CARE PORTAL
              </p>
            </div>
          </div>

          {/* Lottie mascot cluster */}
          <motion.div
            className="flex items-end justify-center gap-2"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <LottieBear size={120} />
            <LottieGiraffe size={140} />
            <LottieCat size={120} />
          </motion.div>

          <motion.div
            className="max-w-lg text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <h2 className="mb-2 font-heading text-2xl font-bold text-foreground sm:text-3xl">
              守護每一個孩子的成長旅程
            </h2>
            <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
              專為兒童內分泌設計的照護平台，讓醫師與家長攜手追蹤孩子的每一步成長
            </p>
          </motion.div>

          <motion.div
            className="flex gap-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <Button
              size="lg"
              className="rounded-2xl px-8 text-base shadow-lg shadow-primary/20"
              onClick={() => router.push("/login")}
            >
              <Heart className="mr-2 h-4 w-4" fill="currentColor" />
              開始使用
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="rounded-2xl px-8 text-base"
              onClick={() => router.push("/dashboard?demo=true")}
            >
              <Sparkles className="mr-2 h-4 w-4" />
              體驗 Demo
            </Button>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="scroll-indicator absolute bottom-8 flex flex-col items-center gap-2"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <span className="text-xs text-muted-foreground">往下了解更多</span>
          <ChevronDown className="h-5 w-5 text-muted-foreground" />
        </motion.div>
      </section>

      {/* ── Section 2: Pain Points ─────────────── */}
      <section className="pain-section bg-white/80 py-20 px-4">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-4 text-center font-heading text-2xl font-bold text-foreground sm:text-3xl">
            兒童內分泌追蹤的三大困擾
          </h2>
          <p className="mb-12 text-center text-sm text-muted-foreground">
            您是否也遇到這些問題？
          </p>
          <div className="grid gap-6 sm:grid-cols-3">
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
                className="pain-card rounded-2xl border border-border/50 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="mb-3 text-3xl">{item.emoji}</div>
                <h3 className="mb-2 font-heading text-lg font-bold text-foreground">
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 3: Features ────────────────── */}
      <section
        ref={featuresRef}
        className="bg-gradient-to-b from-[#FFFBF5] to-white py-20 px-4"
      >
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-4 text-center font-heading text-2xl font-bold text-foreground sm:text-3xl">
            一個平台，解決所有追蹤需求
          </h2>
          <p className="mb-12 text-center text-sm text-muted-foreground">
            醫師與家長共同使用，資料即時同步
          </p>

          <div className="flex flex-col gap-8">
            {features.map((f, i) => (
              <div
                key={i}
                className={`flex items-center gap-6 ${i % 2 === 1 ? "flex-row-reverse" : ""}`}
              >
                <div className="feature-card flex-1 rounded-2xl border border-border/50 bg-white p-6 shadow-sm">
                  <div
                    className={`mb-3 flex h-10 w-10 items-center justify-center rounded-xl ${f.iconBg}`}
                  >
                    <f.icon className={`h-5 w-5 ${f.iconColor}`} />
                  </div>
                  <h3 className="mb-2 font-heading text-lg font-bold text-foreground">
                    {f.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {f.desc}
                  </p>
                </div>
                <div className="feature-mascot hidden sm:block">
                  {f.lottie === "giraffe" && <LottieGiraffe size={140} />}
                  {f.lottie === "cat" && <LottieCat size={140} />}
                  {f.lottie === "bunny" && <LottieBunny size={140} />}
                  {f.lottie === "owl" && <LottieOwl size={140} />}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 4: Trust / Security ────────── */}
      <section ref={trustRef} className="bg-white py-20 px-4">
        <div className="mx-auto max-w-4xl">
          <div className="mx-auto mb-2 flex justify-center">
            <LottieHeartbeat size={60} />
          </div>
          <h2 className="mb-4 text-center font-heading text-2xl font-bold text-foreground sm:text-3xl">
            <ShieldCheck className="mr-2 inline-block h-7 w-7 text-mint" />
            安全與隱私，我們最在意
          </h2>
          <p className="mb-12 text-center text-sm text-muted-foreground">
            醫療資料需要最高等級的保護
          </p>

          {/* Stats */}
          <div className="mb-12 grid grid-cols-3 gap-4">
            {trustItems.map((item, i) => (
              <div key={i} className="trust-card rounded-2xl bg-gradient-to-b from-mint/5 to-sky/5 p-6 text-center">
                <div className="flex items-baseline justify-center gap-1">
                  <span className="trust-number font-heading text-4xl font-extrabold text-foreground">
                    {item.number}
                  </span>
                  <span className="text-lg font-bold text-muted-foreground">
                    {item.suffix}
                  </span>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">{item.label}</p>
              </div>
            ))}
          </div>

          {/* Security features */}
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { title: "Row-Level Security", desc: "家長只能看到自己孩子的資料，醫師只能看到自己患者的資料" },
              { title: "醫師備註隔離", desc: "醫師內部筆記（doctor_notes）在應用層嚴格隔離，家長端永遠不可見" },
              { title: "SSL 加密傳輸", desc: "所有資料傳輸皆經過 SSL 加密，確保傳輸過程安全" },
              { title: "角色認證導向", desc: "Middleware 自動判斷角色，家長與醫師各自導向專屬介面" },
            ].map((item, i) => (
              <div key={i} className="trust-card flex items-start gap-3 rounded-xl border border-border/50 bg-white p-4">
                <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-mint/20">
                  <ShieldCheck className="h-3.5 w-3.5 text-mint" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-foreground">{item.title}</h4>
                  <p className="text-xs leading-relaxed text-muted-foreground">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 5: CTA ─────────────────────── */}
      <section
        ref={ctaRef}
        className="relative overflow-hidden bg-gradient-to-b from-[#FFF5F7] to-[#E0F2FE] py-24 px-4"
      >
        <div className="pointer-events-none absolute inset-0">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-primary/10"
              style={{
                left: `${15 + i * 15}%`,
                top: `${20 + (i % 3) * 25}%`,
                width: 40 + i * 10,
                height: 40 + i * 10,
              }}
              animate={{ y: [0, -15, 0], opacity: [0.2, 0.5, 0.2] }}
              transition={{ duration: 4 + i, repeat: Infinity, delay: i * 0.5 }}
            />
          ))}
        </div>

        <div className="cta-content relative mx-auto max-w-lg text-center">
          <div className="mx-auto mb-4 flex justify-center">
            <LottieDoctor size={140} />
          </div>
          <h2 className="mb-3 font-heading text-2xl font-bold text-foreground sm:text-3xl">
            準備好開始了嗎？
          </h2>
          <p className="mb-8 text-sm leading-relaxed text-muted-foreground">
            立即體驗 PediHealth，讓孩子的成長紀錄不再遺漏
          </p>
          <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Button
              size="lg"
              className="w-full rounded-2xl px-10 text-base shadow-lg shadow-primary/20 sm:w-auto"
              onClick={() => router.push("/register")}
            >
              免費註冊
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="w-full rounded-2xl px-10 text-base sm:w-auto"
              onClick={() => router.push("/dashboard?demo=true")}
            >
              先看看 Demo
            </Button>
          </div>
          <p className="mt-6 text-xs text-muted-foreground">
            家長與醫師皆可註冊，完全免費
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white/80 py-8 text-center text-xs text-muted-foreground">
        <p>PediHealth &copy; 2026. 守護每一個孩子的成長旅程</p>
      </footer>
    </div>
  );
}
