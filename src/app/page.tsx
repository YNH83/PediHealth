"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { ForestScene } from "@/components/illustrations/forest-scene";
import { Heart } from "lucide-react";

export default function LandingPage() {
  const [entered, setEntered] = useState(false);
  const router = useRouter();

  function handleEnter() {
    setEntered(true);
    setTimeout(() => router.push("/login"), 1200);
  }

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-[#E0F2FE] via-[#FFF5F7] to-[#FFFBF5]">
      {/* Background decorations */}
      <div className="pointer-events-none absolute inset-0">
        <motion.div
          className="absolute left-10 top-20 h-3 w-3 rounded-full bg-primary/20"
          animate={{ y: [0, -20, 0], opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        <motion.div
          className="absolute right-20 top-40 h-2 w-2 rounded-full bg-sky/30"
          animate={{ y: [0, -15, 0], opacity: [0.2, 0.7, 0.2] }}
          transition={{ duration: 3, repeat: Infinity, delay: 1 }}
        />
        <motion.div
          className="absolute bottom-40 left-1/4 h-2.5 w-2.5 rounded-full bg-mint/30"
          animate={{ y: [0, -18, 0], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 5, repeat: Infinity, delay: 2 }}
        />
        <motion.div
          className="absolute bottom-60 right-1/4 h-2 w-2 rounded-full bg-lemon/40"
          animate={{ y: [0, -12, 0], opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 3.5, repeat: Infinity, delay: 0.5 }}
        />
      </div>

      <AnimatePresence mode="wait">
        {!entered ? (
          <motion.div
            key="forest"
            className="flex flex-col items-center gap-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{
              opacity: 0,
              scale: 1.5,
              rotateY: 90,
              z: 500,
              transition: { duration: 1, ease: "easeInOut" },
            }}
            transition={{ duration: 0.8 }}
            style={{ perspective: 1200 }}
          >
            {/* Logo */}
            <motion.div
              className="flex items-center gap-3"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 shadow-lg shadow-primary/10">
                <Heart className="h-6 w-6 text-primary" fill="currentColor" />
              </div>
              <div>
                <h1 className="font-heading text-3xl font-extrabold text-foreground">
                  PediHealth
                </h1>
                <p className="text-xs tracking-wider text-muted-foreground">
                  PEDIATRIC CARE PORTAL
                </p>
              </div>
            </motion.div>

            {/* Forest Scene */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="rounded-[32px] shadow-2xl shadow-primary/10"
              style={{ perspective: 1200 }}
            >
              <ForestScene onClick={handleEnter} />
            </motion.div>

            {/* Subtitle */}
            <motion.p
              className="max-w-sm text-center text-sm leading-relaxed text-muted-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              守護每一個孩子的成長旅程
              <br />
              <span className="text-xs">
                Growth tracking, visit records & care management
              </span>
            </motion.p>
          </motion.div>
        ) : (
          <motion.div
            key="entering"
            className="flex flex-col items-center gap-4"
            initial={{ opacity: 0, scale: 0.8, rotateY: -90 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            style={{ perspective: 1200 }}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, ease: "linear" }}
              className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10"
            >
              <Heart className="h-8 w-8 text-primary" fill="currentColor" />
            </motion.div>
            <motion.p
              className="text-lg font-bold text-primary"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              進入中...
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
