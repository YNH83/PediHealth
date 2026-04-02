"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart } from "lucide-react";

// ── Ghibli Forest Intro ──────────────────────────────
// A cinematic forest scene with Little Red Riding Hood walking
// through a magical forest. Click to enter the main site.

export function ForestIntro({ onEnter }: { onEnter: () => void }) {
  const [entered, setEntered] = useState(false);
  const [walkCycle, setWalkCycle] = useState(0);

  // Simple walk cycle animation
  useEffect(() => {
    const timer = setInterval(() => setWalkCycle((c) => (c + 1) % 4), 400);
    return () => clearInterval(timer);
  }, []);

  function handleClick() {
    setEntered(true);
    setTimeout(onEnter, 1400);
  }

  // Walk bobbing offset
  const bobY = [0, -2, 0, -1][walkCycle];
  const legSwing = [3, -2, -3, 2][walkCycle];

  return (
    <AnimatePresence mode="wait">
      {!entered ? (
        <motion.div
          key="forest"
          className="relative flex min-h-screen cursor-pointer flex-col items-center justify-center overflow-hidden"
          onClick={handleClick}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.1, transition: { duration: 1.2, ease: "easeInOut" } }}
          transition={{ duration: 1 }}
        >
          {/* Full-screen forest SVG */}
          <svg
            viewBox="0 0 800 600"
            className="absolute inset-0 h-full w-full"
            preserveAspectRatio="xMidYMid slice"
          >
            <defs>
              {/* Watercolor filter */}
              <filter id="f-wc" x="-5%" y="-5%" width="110%" height="110%">
                <feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves="4" seed={7} result="noise" />
                <feDisplacementMap in="SourceGraphic" in2="noise" scale="3" />
              </filter>
              <filter id="f-glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="6" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
              <filter id="f-soft" x="-5%" y="-5%" width="110%" height="110%">
                <feGaussianBlur stdDeviation="1" />
              </filter>
              {/* Sky gradient */}
              <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#C8E6F5" />
                <stop offset="40%" stopColor="#E8D5C4" />
                <stop offset="70%" stopColor="#F5E6D3" />
                <stop offset="100%" stopColor="#E8D5B0" />
              </linearGradient>
              {/* Ground gradient */}
              <linearGradient id="ground" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#8BBF6A" />
                <stop offset="100%" stopColor="#6B9F4A" />
              </linearGradient>
              {/* Sun glow */}
              <radialGradient id="sun-glow" cx="0.5" cy="0.5" r="0.5">
                <stop offset="0%" stopColor="#FFF8E0" />
                <stop offset="50%" stopColor="#FFE4A0" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#FFE4A0" stopOpacity="0" />
              </radialGradient>
              {/* Light ray */}
              <linearGradient id="ray" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#FFF8E0" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#FFF8E0" stopOpacity="0" />
              </linearGradient>
            </defs>

            {/* Sky */}
            <rect width="800" height="600" fill="url(#sky)" />

            {/* Sun with glow */}
            <motion.circle
              cx="620" cy="100" r="120"
              fill="url(#sun-glow)"
              animate={{ cy: [100, 95, 100] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.circle
              cx="620" cy="100" r="35"
              fill="#FFE4A0"
              opacity="0.8"
              animate={{ cy: [100, 95, 100] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Light rays through trees */}
            <motion.g
              animate={{ opacity: [0.15, 0.25, 0.15] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              <polygon points="500,0 540,400 480,400" fill="url(#ray)" />
              <polygon points="350,0 380,350 320,350" fill="url(#ray)" />
              <polygon points="600,30 640,380 580,380" fill="url(#ray)" />
            </motion.g>

            {/* Clouds - soft watercolor */}
            <motion.g
              filter="url(#f-soft)"
              animate={{ x: [0, 20, 0] }}
              transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            >
              <ellipse cx="150" cy="80" rx="60" ry="22" fill="white" opacity="0.5" />
              <ellipse cx="120" cy="70" rx="40" ry="16" fill="white" opacity="0.5" />
              <ellipse cx="180" cy="68" rx="45" ry="18" fill="white" opacity="0.5" />
            </motion.g>
            <motion.g
              filter="url(#f-soft)"
              animate={{ x: [0, -15, 0] }}
              transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
            >
              <ellipse cx="450" cy="55" rx="50" ry="18" fill="white" opacity="0.35" />
              <ellipse cx="425" cy="46" rx="32" ry="14" fill="white" opacity="0.35" />
            </motion.g>

            {/* Far background trees (misty) */}
            <g filter="url(#f-soft)" opacity="0.5">
              <ellipse cx="100" cy="260" rx="60" ry="90" fill="#7AAF5A" />
              <ellipse cx="200" cy="250" rx="70" ry="100" fill="#6B9F4A" />
              <ellipse cx="600" cy="260" rx="65" ry="95" fill="#7AAF5A" />
              <ellipse cx="720" cy="270" rx="55" ry="80" fill="#6B9F4A" />
            </g>

            {/* Mid-ground trees */}
            <g filter="url(#f-wc)">
              {/* Left big tree */}
              <rect x="50" y="180" width="30" height="250" rx="8" fill="#8B6F47" />
              <rect x="56" y="180" width="10" height="250" rx="4" fill="#A0845C" opacity="0.5" />
              <ellipse cx="65" cy="170" rx="80" ry="100" fill="#5AB963" />
              <ellipse cx="65" cy="140" rx="65" ry="80" fill="#6BCB77" />
              <ellipse cx="65" cy="120" rx="48" ry="60" fill="#82D98A" />

              {/* Right big tree */}
              <rect x="680" y="200" width="28" height="230" rx="8" fill="#8B6F47" />
              <rect x="686" y="200" width="10" height="230" rx="4" fill="#A0845C" opacity="0.5" />
              <ellipse cx="694" cy="185" rx="75" ry="95" fill="#5AB963" />
              <ellipse cx="694" cy="155" rx="60" ry="75" fill="#6BCB77" />
              <ellipse cx="694" cy="135" rx="45" ry="55" fill="#82D98A" />

              {/* Center-left tree */}
              <rect x="250" y="220" width="22" height="200" rx="6" fill="#8B6F47" />
              <ellipse cx="261" cy="210" rx="55" ry="70" fill="#5AB963" opacity="0.9" />
              <ellipse cx="261" cy="190" rx="42" ry="55" fill="#6BCB77" opacity="0.9" />

              {/* Center-right tree */}
              <rect x="520" y="230" width="20" height="190" rx="6" fill="#8B6F47" />
              <ellipse cx="530" cy="218" rx="50" ry="65" fill="#5AB963" opacity="0.9" />
              <ellipse cx="530" cy="200" rx="38" ry="50" fill="#6BCB77" opacity="0.9" />
            </g>

            {/* Ground - rolling hills */}
            <g filter="url(#f-wc)">
              <ellipse cx="400" cy="520" rx="500" ry="140" fill="url(#ground)" />
              <ellipse cx="200" cy="530" rx="300" ry="120" fill="#7AAF5A" opacity="0.7" />
              <ellipse cx="600" cy="540" rx="320" ry="110" fill="#7AAF5A" opacity="0.6" />
            </g>

            {/* Forest path - winding trail */}
            <path
              d="M 320 580 Q 360 480 380 440 Q 400 400 420 380 Q 440 360 450 350"
              fill="none" stroke="#D4C4A0" strokeWidth="35" strokeLinecap="round"
              opacity="0.5" filter="url(#f-wc)"
            />
            <path
              d="M 320 580 Q 360 480 380 440 Q 400 400 420 380 Q 440 360 450 350"
              fill="none" stroke="#E8D5B0" strokeWidth="20" strokeLinecap="round"
              opacity="0.4" filter="url(#f-soft)"
            />

            {/* Mushrooms on the ground */}
            <g filter="url(#f-wc)">
              <rect x="300" y="448" width="7" height="16" rx="2" fill="#F5E6D3" />
              <ellipse cx="303.5" cy="448" rx="14" ry="9" fill="#FF8FAB" opacity="0.7" />
              <circle cx="299" cy="445" r="2.5" fill="white" opacity="0.6" />
              <circle cx="308" cy="447" r="2" fill="white" opacity="0.6" />

              <rect x="510" y="438" width="6" height="14" rx="2" fill="#F5E6D3" />
              <ellipse cx="513" cy="438" rx="12" ry="8" fill="#D4A5FF" opacity="0.6" />
              <circle cx="509" cy="436" r="2" fill="white" opacity="0.5" />
              <circle cx="516" cy="437" r="1.5" fill="white" opacity="0.5" />
            </g>

            {/* Flowers scattered */}
            {[
              { x: 230, y: 470, color: "#FF8FAB" },
              { x: 340, y: 480, color: "#FFD93D" },
              { x: 460, y: 465, color: "#D4A5FF" },
              { x: 550, y: 475, color: "#5BC0EB" },
              { x: 180, y: 485, color: "#FFD93D" },
              { x: 620, y: 478, color: "#FF8FAB" },
            ].map((f, i) => (
              <motion.g
                key={i}
                animate={{ y: [0, -2, 0] }}
                transition={{ duration: 2.5, delay: i * 0.4, repeat: Infinity, ease: "easeInOut" }}
              >
                <line x1={f.x} y1={f.y} x2={f.x} y2={f.y + 12} stroke="#6BCB77" strokeWidth="1.5" />
                <circle cx={f.x} cy={f.y} r="4" fill={f.color} opacity="0.7" filter="url(#f-soft)" />
                <circle cx={f.x} cy={f.y} r="1.5" fill="#FFF3B0" opacity="0.8" />
              </motion.g>
            ))}

            {/* ─── Little Red Riding Hood ─── */}
            <motion.g
              animate={{ x: [0, 3, 0], y: [0, bobY, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            >
              <g transform="translate(380, 380)">
                {/* Shadow */}
                <ellipse cx="0" cy="60" rx="18" ry="5" fill="rgba(0,0,0,0.1)" filter="url(#f-soft)" />

                {/* Cape - flowing */}
                <motion.path
                  d="M -15 -10 Q -22 20 -20 55 L -10 52 Z"
                  fill="#E5506E" opacity="0.8"
                  animate={{ d: [
                    "M -15 -10 Q -22 20 -20 55 L -10 52 Z",
                    "M -15 -10 Q -25 20 -22 55 L -10 52 Z",
                    "M -15 -10 Q -22 20 -20 55 L -10 52 Z",
                  ]}}
                  transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.path
                  d="M 15 -10 Q 22 20 20 55 L 10 52 Z"
                  fill="#E5506E" opacity="0.8"
                  animate={{ d: [
                    "M 15 -10 Q 22 20 20 55 L 10 52 Z",
                    "M 15 -10 Q 25 20 22 55 L 10 52 Z",
                    "M 15 -10 Q 22 20 20 55 L 10 52 Z",
                  ]}}
                  transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                />
                <path d="M -15 -10 Q -22 20 -20 55 L -10 52 Z" fill="#FF6B8A" opacity="0.5" />
                <path d="M 15 -10 Q 22 20 20 55 L 10 52 Z" fill="#FF6B8A" opacity="0.5" />

                {/* Dress */}
                <path d="M -12 5 Q -14 30 -14 50 L 14 50 Q 14 30 12 5 Z" fill="#FF6B8A" filter="url(#f-wc)" />
                <path d="M -10 10 Q -12 30 -12 48 L 12 48 Q 12 30 10 10 Z" fill="#FF8FAB" opacity="0.5" />

                {/* Legs - walking */}
                <motion.g
                  animate={{ rotate: [legSwing, -legSwing] }}
                  transition={{ duration: 0.4, repeat: Infinity, repeatType: "reverse" }}
                  style={{ transformOrigin: "0px 48px" }}
                >
                  <rect x="-6" y="48" width="5" height="12" rx="2" fill="#FFD3B6" />
                  <ellipse cx="-3.5" cy="60" rx="4" ry="2.5" fill="#8B6F47" opacity="0.7" />
                </motion.g>
                <motion.g
                  animate={{ rotate: [-legSwing, legSwing] }}
                  transition={{ duration: 0.4, repeat: Infinity, repeatType: "reverse" }}
                  style={{ transformOrigin: "0px 48px" }}
                >
                  <rect x="1" y="48" width="5" height="12" rx="2" fill="#FFD3B6" />
                  <ellipse cx="3.5" cy="60" rx="4" ry="2.5" fill="#8B6F47" opacity="0.7" />
                </motion.g>

                {/* Head */}
                <circle cx="0" cy="-18" r="16" fill="#FFD3B6" filter="url(#f-wc)" />

                {/* Hood */}
                <path
                  d="M -16 -18 Q -16 -38 0 -42 Q 16 -38 16 -18 Q 10 -22 0 -24 Q -10 -22 -16 -18 Z"
                  fill="#FF6B8A" filter="url(#f-wc)"
                />
                <path
                  d="M -16 -18 Q -16 -38 0 -42 Q 16 -38 16 -18 Q 10 -22 0 -24 Q -10 -22 -16 -18 Z"
                  fill="#E5506E" opacity="0.25"
                />

                {/* Eyes - Ghibli style */}
                <circle cx="-5" cy="-18" r="2.5" fill="#4A3728" />
                <circle cx="5" cy="-18" r="2.5" fill="#4A3728" />
                <circle cx="-4" cy="-19" r="1" fill="white" opacity="0.9" />
                <circle cx="6" cy="-19" r="1" fill="white" opacity="0.9" />

                {/* Smile */}
                <path d="M -4 -12 Q 0 -9 4 -12" stroke="#4A3728" fill="none" strokeWidth="1" strokeLinecap="round" opacity="0.6" />

                {/* Blush */}
                <ellipse cx="-10" cy="-14" rx="4" ry="2.5" fill="#FFB3C6" opacity="0.4" />
                <ellipse cx="10" cy="-14" rx="4" ry="2.5" fill="#FFB3C6" opacity="0.4" />

                {/* Basket */}
                <g transform="translate(18, 20)">
                  <ellipse cx="0" cy="0" rx="10" ry="7" fill="#C4956A" opacity="0.8" filter="url(#f-wc)" />
                  <path d="M -8 0 Q 0 -12 8 0" stroke="#A0845C" fill="none" strokeWidth="2" />
                  <path d="M -2 -2 C -4 -4 -6 -2 -2 2 C 2 -2 0 -4 -2 -2" fill="#FF6B8A" opacity="0.7" />
                </g>
              </g>
            </motion.g>

            {/* Cute bunny friend following */}
            <motion.g
              animate={{ x: [0, 4, 0], y: [0, -3, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
            >
              <g transform="translate(330, 440)" filter="url(#f-wc)">
                <ellipse cx="0" cy="5" rx="7" ry="4" fill="rgba(0,0,0,0.05)" />
                <ellipse cx="0" cy="0" rx="8" ry="10" fill="white" opacity="0.9" />
                <ellipse cx="0" cy="-10" rx="6" ry="7" fill="white" opacity="0.9" />
                <ellipse cx="-3" cy="-22" rx="2.5" ry="8" fill="white" opacity="0.9" />
                <ellipse cx="-3" cy="-22" rx="1.2" ry="5.5" fill="#FFB3C6" opacity="0.4" />
                <ellipse cx="3" cy="-24" rx="2.5" ry="8" fill="white" opacity="0.9" />
                <ellipse cx="3" cy="-24" rx="1.2" ry="5.5" fill="#FFB3C6" opacity="0.4" />
                <circle cx="-2" cy="-11" r="1.2" fill="#4A3728" />
                <circle cx="3" cy="-11" r="1.2" fill="#4A3728" />
                <ellipse cx="0" cy="-8" rx="1.5" ry="1" fill="#FFB3C6" opacity="0.6" />
              </g>
            </motion.g>

            {/* Fireflies / light particles */}
            {[
              { x: 200, y: 300, d: 3, delay: 0 },
              { x: 450, y: 280, d: 4, delay: 1 },
              { x: 350, y: 350, d: 3.5, delay: 0.5 },
              { x: 550, y: 320, d: 5, delay: 2 },
              { x: 280, y: 370, d: 4, delay: 1.5 },
              { x: 500, y: 360, d: 3, delay: 0.8 },
              { x: 160, y: 340, d: 4.5, delay: 2.5 },
              { x: 640, y: 300, d: 3.5, delay: 1.2 },
            ].map((f, i) => (
              <motion.circle
                key={i}
                cx={f.x} cy={f.y} r="2.5"
                fill="#FFF8E0"
                animate={{
                  opacity: [0, 0.8, 0],
                  cy: [f.y, f.y - 15, f.y],
                  r: [2, 3.5, 2],
                }}
                transition={{ duration: f.d, delay: f.delay, repeat: Infinity, ease: "easeInOut" }}
                filter="url(#f-glow)"
              />
            ))}

            {/* Foreground grass/leaves overlay */}
            <g filter="url(#f-wc)" opacity="0.7">
              <ellipse cx="50" cy="570" rx="80" ry="50" fill="#4A8F3A" />
              <ellipse cx="750" cy="565" rx="90" ry="55" fill="#4A8F3A" />
              <ellipse cx="150" cy="580" rx="60" ry="40" fill="#5AB963" />
              <ellipse cx="650" cy="575" rx="70" ry="45" fill="#5AB963" />
            </g>
          </svg>

          {/* Logo overlay */}
          <motion.div
            className="relative z-10 flex flex-col items-center gap-3"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <div className="flex items-center gap-3 rounded-2xl bg-white/70 px-6 py-3 shadow-lg backdrop-blur-sm">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                <Heart className="h-5 w-5 text-primary" fill="currentColor" />
              </div>
              <div>
                <h1 className="font-heading text-2xl font-extrabold text-foreground sm:text-3xl">
                  PediHealth
                </h1>
                <p className="text-[10px] tracking-widest text-muted-foreground">
                  PEDIATRIC CARE PORTAL
                </p>
              </div>
            </div>
          </motion.div>

          {/* Click hint */}
          <motion.div
            className="relative z-10 mt-4"
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2.5, repeat: Infinity }}
          >
            <span className="rounded-full bg-white/60 px-4 py-2 text-sm font-medium text-foreground/70 shadow-sm backdrop-blur-sm">
              點擊進入照護森林 ✨
            </span>
          </motion.div>
        </motion.div>
      ) : (
        <motion.div
          key="entering"
          className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#E0F2FE] via-[#FFF5F7] to-[#FFFBF5]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1.2, ease: "linear" }}
            className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10"
          >
            <Heart className="h-8 w-8 text-primary" fill="currentColor" />
          </motion.div>
          <motion.p
            className="mt-4 font-heading text-lg font-bold text-primary"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            正在進入照護森林...
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
