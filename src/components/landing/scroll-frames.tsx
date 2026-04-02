"use client";

import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import { Heart, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

gsap.registerPlugin(ScrollTrigger);

// ── Config ──────────────────────────────────────────
// Frame images should be placed in /public/images/frames/
// Named: frame-001.webp, frame-002.webp, ... frame-NNN.webp
const FRAME_COUNT = 64;
const FRAME_PATH = "/images/frames/frame-";
const FRAME_EXT = ".webp";

// Generate frame paths
function getFramePath(index: number): string {
  const padded = String(index + 1).padStart(3, "0");
  return `${FRAME_PATH}${padded}${FRAME_EXT}`;
}

export function ScrollFrameIntro({ onComplete }: { onComplete: () => void }) {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [loaded, setLoaded] = useState(false);
  const [progress, setProgress] = useState(0);
  const imagesRef = useRef<HTMLImageElement[]>([]);

  // Preload all frames
  useEffect(() => {
    const images: HTMLImageElement[] = [];
    let loadedCount = 0;

    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image();
      img.src = getFramePath(i);
      img.onload = () => {
        loadedCount++;
        if (loadedCount === FRAME_COUNT) {
          imagesRef.current = images;
          setLoaded(true);
        }
      };
      img.onerror = () => {
        loadedCount++;
        if (loadedCount === FRAME_COUNT) {
          imagesRef.current = images;
          setLoaded(true);
        }
      };
      images.push(img);
    }
  }, []);

  // Setup ScrollTrigger once images are loaded
  useEffect(() => {
    if (!loaded || !canvasRef.current || !containerRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      drawFrame(0);
    };

    function drawFrame(index: number) {
      if (!ctx || !canvas) return;
      const img = imagesRef.current[Math.min(index, FRAME_COUNT - 1)];
      if (!img || !img.complete) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Cover fit (like object-fit: cover)
      const imgRatio = img.width / img.height;
      const canvasRatio = canvas.width / canvas.height;
      let drawW, drawH, drawX, drawY;

      if (canvasRatio > imgRatio) {
        drawW = canvas.width;
        drawH = canvas.width / imgRatio;
        drawX = 0;
        drawY = (canvas.height - drawH) / 2;
      } else {
        drawH = canvas.height;
        drawW = canvas.height * imgRatio;
        drawX = (canvas.width - drawW) / 2;
        drawY = 0;
      }

      ctx.drawImage(img, drawX, drawY, drawW, drawH);
    }

    resize();
    window.addEventListener("resize", resize);

    // ScrollTrigger animation
    const frameObj = { value: 0 };
    const tl = gsap.to(frameObj, {
      value: FRAME_COUNT - 1,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.5,
        onUpdate: (self) => {
          setProgress(self.progress);
          const idx = Math.round(frameObj.value);
          drawFrame(idx);
        },
      },
    });

    return () => {
      tl.kill();
      window.removeEventListener("resize", resize);
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [loaded]);

  return (
    <div ref={containerRef} className="relative" style={{ height: `${FRAME_COUNT * 15}vh` }}>
      {/* Fixed canvas */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 h-screen w-screen"
        style={{ zIndex: 1 }}
      />

      {/* Overlay UI (fixed on top of canvas) */}
      <div className="fixed inset-0 z-10 pointer-events-none">
        {/* Logo - fade out as scroll progresses */}
        <motion.div
          className="absolute left-1/2 top-8 -translate-x-1/2"
          style={{ opacity: Math.max(0, 1 - progress * 3) }}
        >
          <div className="pointer-events-auto flex items-center gap-3 rounded-2xl border border-white/30 bg-white/60 px-5 py-2.5 shadow-lg backdrop-blur-md">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10">
              <Heart className="h-4 w-4 text-primary" fill="currentColor" />
            </div>
            <div>
              <h1 className="font-heading text-xl font-extrabold text-foreground">PediHealth</h1>
              <p className="text-[9px] tracking-widest text-muted-foreground">PEDIATRIC CARE PORTAL</p>
            </div>
          </div>
        </motion.div>

        {/* Scroll hint - show at beginning */}
        {progress < 0.1 && (
          <motion.div
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
            animate={{ y: [0, 8, 0], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <div className="flex flex-col items-center gap-1 rounded-full border border-white/30 bg-white/50 px-4 py-2 backdrop-blur-sm">
              <span className="text-xs text-foreground/60">往下滾動探索</span>
              <ChevronDown className="h-4 w-4 text-foreground/60" />
            </div>
          </motion.div>
        )}

        {/* CTA - show at end */}
        {progress > 0.85 && (
          <motion.div
            className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-3 pointer-events-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Button
              size="lg"
              className="rounded-2xl px-8 shadow-lg shadow-primary/20"
              onClick={onComplete}
            >
              <Heart className="mr-2 h-4 w-4" fill="currentColor" />
              進入 PediHealth
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="rounded-2xl bg-white/70 px-8 backdrop-blur-sm"
              onClick={() => router.push("/dashboard?demo=true")}
            >
              體驗 Demo
            </Button>
          </motion.div>
        )}

        {/* Progress bar */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
          <div
            className="h-full bg-primary/60 transition-all duration-100"
            style={{ width: `${progress * 100}%` }}
          />
        </div>
      </div>

      {/* Loading overlay */}
      {!loaded && (
        <div className="fixed inset-0 z-20 flex flex-col items-center justify-center bg-gradient-to-b from-[#C8E6F5] to-[#E8D5C4]">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          >
            <Heart className="h-10 w-10 text-primary" fill="currentColor" />
          </motion.div>
          <p className="mt-3 text-sm text-muted-foreground">載入森林場景...</p>
        </div>
      )}
    </div>
  );
}
