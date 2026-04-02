"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ForestIntro } from "@/components/landing/forest-intro";
import { LandingScrollSections } from "@/components/landing/scroll-sections";

export default function LandingPage() {
  const [showForest, setShowForest] = useState(true);

  return (
    <AnimatePresence mode="wait">
      {showForest ? (
        <motion.div key="forest" exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
          <ForestIntro onEnter={() => setShowForest(false)} />
        </motion.div>
      ) : (
        <motion.div
          key="main"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <LandingScrollSections />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
