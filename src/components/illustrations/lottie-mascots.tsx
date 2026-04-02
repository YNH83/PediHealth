"use client";

import dynamic from "next/dynamic";

// Dynamic import to avoid SSR issues with dotlottie
const DotLottieReact = dynamic(
  () =>
    import("@lottiefiles/dotlottie-react").then((mod) => mod.DotLottieReact),
  { ssr: false }
);

// ── Lottie CDN URLs ──────────────────────────────────
const LOTTIE_URLS = {
  bear: "https://assets-v2.lottiefiles.com/a/7b36d6ac-3cb7-11ee-a573-175a0b884d98/FADcWTAHo4.lottie",
  giraffe:
    "https://assets-v2.lottiefiles.com/a/9205140a-118a-11ee-9171-cf7e359e2ee5/m2zYD1NkX3.lottie",
  cat: "https://assets-v2.lottiefiles.com/a/bdd8a8e2-1164-11ee-9844-ffe38c1424cb/kK8xXtCpxl.lottie",
  bunny:
    "https://assets-v2.lottiefiles.com/a/a82b25ee-1153-11ee-8492-534d25d9534d/MiL4OsVZSR.lottie",
  owl: "https://assets-v2.lottiefiles.com/a/1a7311d2-1165-11ee-bdc1-b7e695e8e5eb/jfHFXuWFeW.lottie",
  doctor:
    "https://assets-v2.lottiefiles.com/a/04aad548-1178-11ee-8546-db2cd1259ee8/fGLKoodtE4.lottie",
  heartbeat:
    "https://assets-v2.lottiefiles.com/a/28eb2ff4-117b-11ee-ab4d-af0f3e9153ed/v89fEUK5MO.lottie",
  syringe:
    "https://assets-v2.lottiefiles.com/a/c99a3e48-117d-11ee-9f3e-07b47f53ee0c/tDG9To20gu.lottie",
} as const;

type MascotName = keyof typeof LOTTIE_URLS;

interface LottieMascotProps {
  name: MascotName;
  className?: string;
  size?: number;
}

export function LottieMascot({
  name,
  className = "",
  size = 160,
}: LottieMascotProps) {
  return (
    <div
      className={`pointer-events-none ${className}`}
      style={{ width: size, height: size }}
    >
      <DotLottieReact src={LOTTIE_URLS[name]} loop autoplay />
    </div>
  );
}

// ── Pre-configured mascots for each page ─────────────

export function LottieBear({ className = "", size = 160 }) {
  return <LottieMascot name="bear" className={className} size={size} />;
}

export function LottieGiraffe({ className = "", size = 160 }) {
  return <LottieMascot name="giraffe" className={className} size={size} />;
}

export function LottieCat({ className = "", size = 160 }) {
  return <LottieMascot name="cat" className={className} size={size} />;
}

export function LottieBunny({ className = "", size = 160 }) {
  return <LottieMascot name="bunny" className={className} size={size} />;
}

export function LottieOwl({ className = "", size = 160 }) {
  return <LottieMascot name="owl" className={className} size={size} />;
}

export function LottieDoctor({ className = "", size = 160 }) {
  return <LottieMascot name="doctor" className={className} size={size} />;
}

export function LottieHeartbeat({ className = "", size = 80 }) {
  return <LottieMascot name="heartbeat" className={className} size={size} />;
}

export function LottieSyringe({ className = "", size = 120 }) {
  return <LottieMascot name="syringe" className={className} size={size} />;
}
