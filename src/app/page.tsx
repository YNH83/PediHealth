"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ScrollFrameIntro } from "@/components/landing/scroll-frames";
import { LandingScrollSections } from "@/components/landing/scroll-sections";

export default function LandingPage() {
  const [showIntro, setShowIntro] = useState(true);

  return (
    <>
      {showIntro ? (
        <ScrollFrameIntro onComplete={() => setShowIntro(false)} />
      ) : (
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <LandingScrollSections />
          </motion.div>
        </AnimatePresence>
      )}
    </>
  );
}
