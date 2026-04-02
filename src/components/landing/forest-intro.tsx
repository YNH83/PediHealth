"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart } from "lucide-react";

export function ForestIntro({ onEnter }: { onEnter: () => void }) {
  const [entered, setEntered] = useState(false);
  const [walkCycle, setWalkCycle] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setWalkCycle((c) => (c + 1) % 4), 400);
    return () => clearInterval(timer);
  }, []);

  function handleClick() {
    setEntered(true);
    setTimeout(onEnter, 1400);
  }

  const bobY = [0, -1.5, 0, -0.8][walkCycle];
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
          exit={{ opacity: 0, scale: 1.08, transition: { duration: 1.2, ease: "easeInOut" } }}
          transition={{ duration: 1.2 }}
        >
          <svg
            viewBox="0 0 800 600"
            className="absolute inset-0 h-full w-full"
            preserveAspectRatio="xMidYMid slice"
          >
            <defs>
              {/* ── Filters ── */}
              <filter id="wc" x="-8%" y="-8%" width="116%" height="116%">
                <feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="5" seed={7} result="n" />
                <feDisplacementMap in="SourceGraphic" in2="n" scale="4" xChannelSelector="R" yChannelSelector="G" result="d" />
                <feGaussianBlur in="d" stdDeviation="0.6" />
              </filter>
              <filter id="mist" x="-10%" y="-10%" width="120%" height="120%">
                <feGaussianBlur stdDeviation="8" />
              </filter>
              <filter id="soft" x="-5%" y="-5%" width="110%" height="110%">
                <feGaussianBlur stdDeviation="2.5" />
              </filter>
              <filter id="glow" x="-30%" y="-30%" width="160%" height="160%">
                <feGaussianBlur stdDeviation="8" result="b" />
                <feComposite in="SourceGraphic" in2="b" operator="over" />
              </filter>
              <filter id="dapple" x="-5%" y="-5%" width="110%" height="110%">
                <feTurbulence type="fractalNoise" baseFrequency="0.06" numOctaves="3" seed={12} result="n" />
                <feDisplacementMap in="SourceGraphic" in2="n" scale="6" />
              </filter>
              {/* Foreground blur (depth of field) */}
              <filter id="fg-blur" x="-5%" y="-5%" width="110%" height="110%">
                <feGaussianBlur stdDeviation="3" />
              </filter>

              {/* ── Gradients ── */}
              <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#B8D8F0" />
                <stop offset="25%" stopColor="#D4E8F0" />
                <stop offset="50%" stopColor="#EAD9C8" />
                <stop offset="75%" stopColor="#F0E0C8" />
                <stop offset="100%" stopColor="#D8CDB0" />
              </linearGradient>
              <linearGradient id="ground-main" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#7DB85A" />
                <stop offset="40%" stopColor="#6AA84A" />
                <stop offset="100%" stopColor="#5A8F3A" />
              </linearGradient>
              <radialGradient id="sun-glow" cx="0.5" cy="0.5" r="0.5">
                <stop offset="0%" stopColor="#FFFCE8" />
                <stop offset="30%" stopColor="#FFE8A0" stopOpacity="0.5" />
                <stop offset="70%" stopColor="#FFD070" stopOpacity="0.15" />
                <stop offset="100%" stopColor="#FFD070" stopOpacity="0" />
              </radialGradient>
              <linearGradient id="ray" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#FFF8E0" stopOpacity="0.35" />
                <stop offset="50%" stopColor="#FFF8E0" stopOpacity="0.12" />
                <stop offset="100%" stopColor="#FFF8E0" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="bark" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#6B5030" />
                <stop offset="30%" stopColor="#8B6F47" />
                <stop offset="70%" stopColor="#7A5E3A" />
                <stop offset="100%" stopColor="#6B5030" />
              </linearGradient>
              <linearGradient id="path-g" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#D8C8A0" />
                <stop offset="100%" stopColor="#C4B088" />
              </linearGradient>
              {/* Atmospheric haze gradient */}
              <linearGradient id="haze" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#B8D0E0" stopOpacity="0" />
                <stop offset="60%" stopColor="#C8D8E0" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#D0DDE0" stopOpacity="0.4" />
              </linearGradient>
            </defs>

            {/* ═══ Layer 0: Sky ═══ */}
            <rect width="800" height="600" fill="url(#sky)" />

            {/* Sun with multi-layer glow */}
            <motion.g animate={{ y: [0, -4, 0] }} transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}>
              <circle cx="620" cy="95" r="150" fill="url(#sun-glow)" />
              <circle cx="620" cy="95" r="60" fill="#FFF5D0" opacity="0.3" filter="url(#mist)" />
              <circle cx="620" cy="95" r="30" fill="#FFECB0" opacity="0.7" />
              <circle cx="620" cy="95" r="18" fill="#FFF8D8" opacity="0.9" />
            </motion.g>

            {/* ═══ Layer 1: Far mountains/trees (very misty) ═══ */}
            <g filter="url(#mist)" opacity="0.4">
              <path d="M 0 320 Q 80 220 160 280 Q 240 200 320 260 Q 400 200 480 250 Q 560 190 640 260 Q 720 210 800 280 L 800 420 L 0 420 Z" fill="#8AAF6A" />
              <path d="M 0 340 Q 100 260 200 300 Q 300 240 400 290 Q 500 230 600 280 Q 700 240 800 300 L 800 420 L 0 420 Z" fill="#7A9F5A" />
            </g>

            {/* Atmospheric haze between layers */}
            <rect x="0" y="200" width="800" height="250" fill="url(#haze)" />

            {/* ═══ Layer 2: Mid-far trees (slightly misty) ═══ */}
            <g filter="url(#soft)" opacity="0.6">
              {/* Organic tree shapes using paths instead of ellipses */}
              <g transform="translate(120, 180)">
                <rect x="-6" y="40" width="12" height="180" rx="5" fill="#7A5E3A" />
                <path d="M 0 -30 Q -50 0 -55 50 Q -50 100 -10 80 Q -40 60 -30 20 Q -25 -10 0 -30 Z" fill="#5A9F40" opacity="0.8" />
                <path d="M 0 -30 Q 50 0 55 50 Q 50 100 10 80 Q 40 60 30 20 Q 25 -10 0 -30 Z" fill="#5A9F40" opacity="0.7" />
                <path d="M 0 -40 Q -35 -10 -38 30 Q -30 70 0 55 Q 30 70 38 30 Q 35 -10 0 -40 Z" fill="#68AF50" opacity="0.7" />
                <path d="M 0 -45 Q -22 -15 -25 15 Q -18 45 0 35 Q 18 45 25 15 Q 22 -15 0 -45 Z" fill="#78BF60" opacity="0.6" />
              </g>
              <g transform="translate(680, 190)">
                <rect x="-6" y="40" width="12" height="170" rx="5" fill="#7A5E3A" />
                <path d="M 0 -25 Q -45 5 -50 45 Q -42 85 -5 70 Q -35 55 -28 20 Q -20 -5 0 -25 Z" fill="#5A9F40" opacity="0.8" />
                <path d="M 0 -25 Q 48 5 52 48 Q 45 90 8 72 Q 38 55 30 20 Q 22 -5 0 -25 Z" fill="#5A9F40" opacity="0.7" />
                <path d="M 0 -35 Q -30 -5 -32 28 Q -25 60 0 48 Q 25 60 32 28 Q 30 -5 0 -35 Z" fill="#68AF50" opacity="0.7" />
              </g>
            </g>

            {/* ═══ Layer 3: Light rays (god rays through canopy) ═══ */}
            <motion.g animate={{ opacity: [0.12, 0.22, 0.12] }} transition={{ duration: 5, repeat: Infinity }}>
              <polygon points="480,0 530,420 470,420" fill="url(#ray)" />
              <polygon points="340,0 375,380 305,380" fill="url(#ray)" />
              <polygon points="590,20 630,400 570,400" fill="url(#ray)" />
              <polygon points="200,0 230,350 170,350" fill="url(#ray)" opacity="0.6" />
              <polygon points="700,10 730,380 680,380" fill="url(#ray)" opacity="0.5" />
            </motion.g>

            {/* Dappled light spots on ground */}
            <motion.g
              animate={{ opacity: [0.15, 0.3, 0.15] }}
              transition={{ duration: 4, repeat: Infinity, delay: 1 }}
            >
              {[
                { x: 280, y: 430, rx: 18, ry: 8 },
                { x: 420, y: 420, rx: 22, ry: 10 },
                { x: 350, y: 460, rx: 15, ry: 7 },
                { x: 500, y: 445, rx: 20, ry: 9 },
                { x: 200, y: 455, rx: 16, ry: 7 },
                { x: 580, y: 435, rx: 14, ry: 6 },
              ].map((s, i) => (
                <ellipse key={i} cx={s.x} cy={s.y} rx={s.rx} ry={s.ry} fill="#FFF8D0" opacity="0.25" filter="url(#dapple)" />
              ))}
            </motion.g>

            {/* Clouds - multi-layer watercolor */}
            <motion.g animate={{ x: [0, 18, 0] }} transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}>
              <ellipse cx="160" cy="80" rx="65" ry="24" fill="white" opacity="0.45" filter="url(#soft)" />
              <ellipse cx="130" cy="72" rx="42" ry="18" fill="white" opacity="0.5" filter="url(#soft)" />
              <ellipse cx="190" cy="70" rx="48" ry="20" fill="#F8F8FF" opacity="0.4" filter="url(#soft)" />
              <ellipse cx="155" cy="76" rx="30" ry="12" fill="white" opacity="0.6" filter="url(#soft)" />
            </motion.g>
            <motion.g animate={{ x: [0, -12, 0] }} transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}>
              <ellipse cx="460" cy="58" rx="55" ry="20" fill="white" opacity="0.3" filter="url(#soft)" />
              <ellipse cx="435" cy="50" rx="35" ry="15" fill="white" opacity="0.35" filter="url(#soft)" />
            </motion.g>

            {/* ═══ Layer 4: Main trees (detailed) ═══ */}
            <g filter="url(#wc)">
              {/* Left main tree */}
              <g transform="translate(70, 140)">
                <path d="M -8 80 Q -12 160 -10 290 Q -8 290 0 295 Q 8 290 22 290 Q 24 160 20 80 Z" fill="url(#bark)" />
                {/* Bark texture lines */}
                <path d="M 2 100 Q 0 150 3 200 Q 1 240 4 280" stroke="#5A4228" strokeWidth="1" fill="none" opacity="0.3" />
                <path d="M 10 90 Q 8 140 11 190" stroke="#5A4228" strokeWidth="0.8" fill="none" opacity="0.25" />
                {/* Root exposed */}
                <path d="M -10 288 Q -25 292 -30 298" stroke="#7A5E3A" strokeWidth="5" fill="none" strokeLinecap="round" />
                <path d="M 22 288 Q 35 294 42 300" stroke="#7A5E3A" strokeWidth="4" fill="none" strokeLinecap="round" />
                {/* Crown - 5 layers */}
                <path d="M 0 -40 Q -85 -10 -80 60 Q -70 120 0 90 Q 70 120 80 60 Q 85 -10 0 -40 Z" fill="#468A38" />
                <path d="M 0 -50 Q -65 -20 -62 40 Q -55 90 0 68 Q 55 90 62 40 Q 65 -20 0 -50 Z" fill="#52A043" />
                <path d="M 0 -58 Q -48 -28 -45 22 Q -38 65 0 50 Q 38 65 45 22 Q 48 -28 0 -58 Z" fill="#5EAF50" />
                <path d="M 0 -62 Q -32 -35 -30 8 Q -24 42 0 34 Q 24 42 30 8 Q 32 -35 0 -62 Z" fill="#6CBF5E" />
                <path d="M 0 -60 Q -18 -42 -16 -10 Q -10 18 0 14 Q 10 18 16 -10 Q 18 -42 0 -60 Z" fill="#7CCF6E" opacity="0.7" />
                {/* Leaf clusters - small detailed blobs */}
                <circle cx="-55" cy="30" r="12" fill="#5EAF50" opacity="0.5" />
                <circle cx="50" cy="20" r="10" fill="#6CBF5E" opacity="0.5" />
                <circle cx="-30" cy="-20" r="8" fill="#7CCF6E" opacity="0.4" />
              </g>

              {/* Right main tree */}
              <g transform="translate(700, 160)">
                <path d="M -8 70 Q -12 150 -10 270 Q -6 272 4 275 Q 14 272 20 270 Q 22 150 18 70 Z" fill="url(#bark)" />
                <path d="M 4 80 Q 2 130 5 180 Q 3 220 6 260" stroke="#5A4228" strokeWidth="1" fill="none" opacity="0.3" />
                <path d="M -10 268 Q -22 274 -28 280" stroke="#7A5E3A" strokeWidth="4" fill="none" strokeLinecap="round" />
                <path d="M 20 268 Q 30 275 38 282" stroke="#7A5E3A" strokeWidth="4" fill="none" strokeLinecap="round" />
                <path d="M 0 -35 Q -78 -5 -72 55 Q -62 108 0 82 Q 62 108 72 55 Q 78 -5 0 -35 Z" fill="#468A38" />
                <path d="M 0 -45 Q -58 -15 -55 35 Q -48 80 0 62 Q 48 80 55 35 Q 58 -15 0 -45 Z" fill="#52A043" />
                <path d="M 0 -52 Q -42 -22 -40 18 Q -34 55 0 44 Q 34 55 40 18 Q 42 -22 0 -52 Z" fill="#5EAF50" />
                <path d="M 0 -55 Q -28 -30 -25 5 Q -18 35 0 28 Q 18 35 25 5 Q 28 -30 0 -55 Z" fill="#6CBF5E" />
                <circle cx="-45" cy="25" r="10" fill="#5EAF50" opacity="0.5" />
                <circle cx="42" cy="15" r="9" fill="#6CBF5E" opacity="0.5" />
              </g>

              {/* Center-left tree (medium) */}
              <g transform="translate(270, 210)">
                <path d="M -5 50 Q -8 120 -7 210 Q 0 212 7 210 Q 8 120 5 50 Z" fill="url(#bark)" />
                <path d="M 0 -20 Q -48 5 -45 40 Q -38 75 0 60 Q 38 75 45 40 Q 48 5 0 -20 Z" fill="#468A38" opacity="0.9" />
                <path d="M 0 -28 Q -35 -2 -32 28 Q -26 55 0 44 Q 26 55 32 28 Q 35 -2 0 -28 Z" fill="#52A043" opacity="0.85" />
                <path d="M 0 -32 Q -22 -8 -20 15 Q -15 38 0 30 Q 15 38 20 15 Q 22 -8 0 -32 Z" fill="#5EAF50" opacity="0.8" />
                {/* Branch */}
                <path d="M 5 60 Q 28 50 40 42" stroke="#7A5E3A" strokeWidth="3" fill="none" strokeLinecap="round" />
                <circle cx="42" cy="40" r="8" fill="#6CBF5E" opacity="0.6" />
              </g>

              {/* Center-right tree */}
              <g transform="translate(530, 220)">
                <path d="M -5 45 Q -7 110 -6 200 Q 0 202 6 200 Q 7 110 5 45 Z" fill="url(#bark)" />
                <path d="M 0 -18 Q -42 5 -40 38 Q -34 68 0 55 Q 34 68 40 38 Q 42 5 0 -18 Z" fill="#468A38" opacity="0.9" />
                <path d="M 0 -25 Q -30 -2 -28 24 Q -22 48 0 38 Q 22 48 28 24 Q 30 -2 0 -25 Z" fill="#52A043" opacity="0.85" />
                <path d="M 0 -28 Q -18 -6 -16 12 Q -12 32 0 26 Q 12 32 16 12 Q 18 -6 0 -28 Z" fill="#5EAF50" opacity="0.8" />
              </g>
            </g>

            {/* ═══ Layer 5: Ground with texture ═══ */}
            <g filter="url(#wc)">
              {/* Main rolling ground */}
              <path d="M 0 460 Q 100 430 200 445 Q 300 425 400 435 Q 500 420 600 440 Q 700 425 800 445 L 800 600 L 0 600 Z" fill="url(#ground-main)" />
              <path d="M 0 475 Q 150 455 300 465 Q 450 450 600 462 Q 750 448 800 460 L 800 600 L 0 600 Z" fill="#5E9A42" opacity="0.6" />
              <path d="M 0 490 Q 200 478 400 485 Q 600 475 800 488 L 800 600 L 0 600 Z" fill="#528A38" opacity="0.4" />
            </g>

            {/* Grass tufts scattered across ground */}
            <g opacity="0.7">
              {[
                { x: 150, y: 462 }, { x: 220, y: 455 }, { x: 310, y: 458 },
                { x: 420, y: 448 }, { x: 480, y: 452 }, { x: 560, y: 450 },
                { x: 640, y: 455 }, { x: 100, y: 475 }, { x: 350, y: 470 },
                { x: 500, y: 468 }, { x: 680, y: 465 }, { x: 250, y: 480 },
              ].map((g, i) => (
                <g key={i} transform={`translate(${g.x}, ${g.y})`}>
                  <path d={`M 0 0 Q -3 -${8 + i % 3 * 2} -1 -${12 + i % 4 * 2}`} stroke="#5A9F3A" strokeWidth="1.5" fill="none" />
                  <path d={`M 2 0 Q 5 -${7 + i % 3 * 2} 3 -${11 + i % 4 * 2}`} stroke="#68AF48" strokeWidth="1.2" fill="none" />
                  <path d={`M -1 0 Q 0 -${9 + i % 2 * 3} 1 -${14 + i % 3 * 2}`} stroke="#4A8F30" strokeWidth="1" fill="none" />
                </g>
              ))}
            </g>

            {/* Forest path with perspective */}
            <g filter="url(#wc)">
              <path d="M 340 600 Q 360 530 375 480 Q 390 440 400 420 Q 420 390 435 370" fill="none" stroke="url(#path-g)" strokeWidth="40" strokeLinecap="round" opacity="0.45" />
              <path d="M 345 600 Q 363 530 378 480 Q 392 440 402 420 Q 418 392 432 375" fill="none" stroke="#E0D0B0" strokeWidth="22" strokeLinecap="round" opacity="0.35" />
              {/* Path texture - small stones */}
              {[
                { x: 360, y: 540 }, { x: 375, y: 500 }, { x: 390, y: 465 },
                { x: 405, y: 435 }, { x: 355, y: 560 }, { x: 385, y: 478 },
              ].map((s, i) => (
                <circle key={i} cx={s.x} cy={s.y} r={1.5 + i % 2} fill="#C4B498" opacity="0.3" />
              ))}
            </g>

            {/* Mushrooms (detailed) */}
            <g filter="url(#wc)">
              {/* Pink mushroom */}
              <g transform="translate(310, 455)">
                <rect x="-3" y="0" width="6" height="14" rx="2" fill="#F0E0D0" />
                <path d="M -12 0 Q -12 -8 0 -12 Q 12 -8 12 0 Z" fill="#FF8FAB" opacity="0.75" />
                <path d="M -8 -2 Q -8 -6 0 -9 Q 8 -6 8 -2 Z" fill="#FFB3C6" opacity="0.4" />
                <circle cx="-5" cy="-5" r="2" fill="white" opacity="0.5" />
                <circle cx="4" cy="-3" r="1.5" fill="white" opacity="0.5" />
                <circle cx="0" cy="-8" r="1" fill="white" opacity="0.4" />
              </g>
              {/* Purple mushroom */}
              <g transform="translate(505, 445)">
                <rect x="-2.5" y="0" width="5" height="12" rx="2" fill="#F0E0D0" />
                <path d="M -10 0 Q -10 -7 0 -10 Q 10 -7 10 0 Z" fill="#C498E0" opacity="0.65" />
                <path d="M -7 -1 Q -7 -5 0 -7 Q 7 -5 7 -1 Z" fill="#D4B0F0" opacity="0.35" />
                <circle cx="-4" cy="-4" r="1.5" fill="white" opacity="0.4" />
                <circle cx="3" cy="-3" r="1.2" fill="white" opacity="0.4" />
              </g>
              {/* Tiny mushroom cluster */}
              <g transform="translate(445, 460)">
                <rect x="-1.5" y="0" width="3" height="8" rx="1" fill="#F0E0D0" />
                <ellipse cx="0" cy="0" rx="5" ry="4" fill="#FFD093" opacity="0.6" />
                <rect x="5" y="2" width="2.5" height="6" rx="1" fill="#F0E0D0" />
                <ellipse cx="6.2" cy="2" rx="4" ry="3" fill="#FFD093" opacity="0.5" />
              </g>
            </g>

            {/* Flowers (detailed petals) */}
            {[
              { x: 200, y: 468, c: "#FF8FAB", s: 1 },
              { x: 340, y: 478, c: "#FFD060", s: 0.8 },
              { x: 460, y: 462, c: "#C4A0E8", s: 0.9 },
              { x: 560, y: 470, c: "#80C8F0", s: 0.85 },
              { x: 160, y: 480, c: "#FFD060", s: 0.7 },
              { x: 620, y: 472, c: "#FF8FAB", s: 0.75 },
              { x: 280, y: 474, c: "#C4A0E8", s: 0.65 },
              { x: 480, y: 476, c: "#80C8F0", s: 0.7 },
              { x: 380, y: 485, c: "#FF8FAB", s: 0.6 },
            ].map((f, i) => (
              <motion.g
                key={i}
                animate={{ y: [0, -1.5, 0], rotate: [0, f.s > 0.8 ? 3 : -2, 0] }}
                transition={{ duration: 3, delay: i * 0.35, repeat: Infinity, ease: "easeInOut" }}
                style={{ transformOrigin: `${f.x}px ${f.y + 10}px` }}
              >
                <line x1={f.x} y1={f.y} x2={f.x} y2={f.y + 10 * f.s + 4} stroke="#5A9F3A" strokeWidth="1.2" />
                {/* 5 petals */}
                {[0, 72, 144, 216, 288].map((angle) => (
                  <ellipse
                    key={angle}
                    cx={f.x + Math.cos((angle * Math.PI) / 180) * 3 * f.s}
                    cy={f.y + Math.sin((angle * Math.PI) / 180) * 3 * f.s}
                    rx={2.5 * f.s}
                    ry={1.5 * f.s}
                    fill={f.c}
                    opacity="0.7"
                    transform={`rotate(${angle} ${f.x} ${f.y})`}
                  />
                ))}
                <circle cx={f.x} cy={f.y} r={1.5 * f.s} fill="#FFF3B0" opacity="0.9" />
              </motion.g>
            ))}

            {/* Fallen leaves on ground */}
            {[
              { x: 260, y: 472, r: -20, c: "#C8A050" },
              { x: 430, y: 458, r: 35, c: "#D0A848" },
              { x: 550, y: 468, r: -45, c: "#B89840" },
              { x: 180, y: 478, r: 15, c: "#C89850" },
            ].map((l, i) => (
              <g key={i} transform={`translate(${l.x}, ${l.y}) rotate(${l.r})`}>
                <path d="M 0 0 Q 4 -3 8 0 Q 4 3 0 0 Z" fill={l.c} opacity="0.35" />
              </g>
            ))}

            {/* ═══ Layer 6: Little Red Riding Hood ═══ */}
            <motion.g
              animate={{ y: [0, bobY, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            >
              <g transform="translate(395, 370)">
                {/* Ground shadow */}
                <ellipse cx="0" cy="68" rx="20" ry="5" fill="rgba(0,0,0,0.12)" filter="url(#soft)" />

                {/* Cape - layered flowing fabric */}
                <motion.g
                  animate={{ rotate: [-1, 1.5, -1] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  style={{ transformOrigin: "0px -10px" }}
                >
                  <path d="M -16 -8 Q -26 22 -24 62 L -12 58 Z" fill="#C83050" opacity="0.75" />
                  <path d="M 16 -8 Q 26 22 24 62 L 12 58 Z" fill="#C83050" opacity="0.75" />
                  <path d="M -14 -6 Q -22 20 -20 58 L -10 55 Z" fill="#E04868" opacity="0.55" />
                  <path d="M 14 -6 Q 22 20 20 58 L 10 55 Z" fill="#E04868" opacity="0.55" />
                  {/* Cape fold highlight */}
                  <path d="M -18 15 Q -20 30 -19 45" stroke="#F08098" strokeWidth="1" fill="none" opacity="0.3" />
                  <path d="M 18 15 Q 20 30 19 45" stroke="#F08098" strokeWidth="1" fill="none" opacity="0.3" />
                </motion.g>

                {/* Dress - with folds and shading */}
                <path d="M -13 6 Q -16 30 -16 56 L 16 56 Q 16 30 13 6 Z" fill="#E85078" />
                <path d="M -11 10 Q -14 30 -14 54 L 14 54 Q 14 30 11 10 Z" fill="#F0688A" opacity="0.6" />
                {/* Dress fold lines */}
                <path d="M -4 15 Q -5 35 -3 52" stroke="#D04068" strokeWidth="0.8" fill="none" opacity="0.3" />
                <path d="M 5 18 Q 6 35 4 50" stroke="#D04068" strokeWidth="0.8" fill="none" opacity="0.25" />
                {/* Apron/collar */}
                <path d="M -8 8 Q 0 12 8 8 L 6 18 Q 0 20 -6 18 Z" fill="white" opacity="0.5" />

                {/* Arms */}
                <path d="M -13 12 Q -18 20 -16 30" stroke="#FFD3B6" strokeWidth="4" fill="none" strokeLinecap="round" />
                <path d="M 13 12 Q 18 22 20 32" stroke="#FFD3B6" strokeWidth="4" fill="none" strokeLinecap="round" />

                {/* Legs with walking */}
                <motion.g
                  animate={{ rotate: [legSwing, -legSwing] }}
                  transition={{ duration: 0.4, repeat: Infinity, repeatType: "reverse" }}
                  style={{ transformOrigin: "0px 54px" }}
                >
                  <path d="M -6 54 L -6 66 Q -4 68 -2 66 L -2 54" fill="#FFD3B6" />
                  <ellipse cx="-4" cy="67" rx="5" ry="3" fill="#8B6848" opacity="0.7" />
                </motion.g>
                <motion.g
                  animate={{ rotate: [-legSwing, legSwing] }}
                  transition={{ duration: 0.4, repeat: Infinity, repeatType: "reverse" }}
                  style={{ transformOrigin: "0px 54px" }}
                >
                  <path d="M 2 54 L 2 66 Q 4 68 6 66 L 6 54" fill="#FFD3B6" />
                  <ellipse cx="4" cy="67" rx="5" ry="3" fill="#8B6848" opacity="0.7" />
                </motion.g>

                {/* Head */}
                <circle cx="0" cy="-16" r="17" fill="#FFD8C0" />
                {/* Subtle face shading */}
                <circle cx="3" cy="-12" r="14" fill="#FFE0CA" opacity="0.4" />

                {/* Hair peeking from hood */}
                <path d="M -12 -14 Q -14 -8 -10 -4" stroke="#8B5A30" strokeWidth="2.5" fill="none" opacity="0.5" strokeLinecap="round" />
                <path d="M 12 -14 Q 14 -8 10 -4" stroke="#8B5A30" strokeWidth="2.5" fill="none" opacity="0.5" strokeLinecap="round" />

                {/* Hood - layered */}
                <path d="M -17 -16 Q -17 -38 0 -42 Q 17 -38 17 -16 Q 11 -20 0 -22 Q -11 -20 -17 -16 Z" fill="#D84060" />
                <path d="M -15 -16 Q -15 -36 0 -40 Q 15 -36 15 -16 Q 10 -19 0 -21 Q -10 -19 -15 -16 Z" fill="#E85070" opacity="0.6" />
                {/* Hood highlight */}
                <path d="M -5 -38 Q 0 -40 5 -38 Q 2 -36 -2 -36 Z" fill="#F08098" opacity="0.4" />

                {/* Eyes - large expressive Ghibli style */}
                <g>
                  <ellipse cx="-5.5" cy="-17" rx="3" ry="3.5" fill="#3A2818" />
                  <ellipse cx="5.5" cy="-17" rx="3" ry="3.5" fill="#3A2818" />
                  {/* Eye highlights - crucial for Ghibli look */}
                  <circle cx="-4" cy="-18.5" r="1.5" fill="white" opacity="0.95" />
                  <circle cx="7" cy="-18.5" r="1.5" fill="white" opacity="0.95" />
                  <circle cx="-6.5" cy="-15.5" r="0.8" fill="white" opacity="0.5" />
                  <circle cx="4" cy="-15.5" r="0.8" fill="white" opacity="0.5" />
                  {/* Eyelashes hint */}
                  <path d="M -9 -18 Q -8 -20 -7 -19.5" stroke="#3A2818" strokeWidth="0.6" fill="none" opacity="0.4" />
                  <path d="M 9 -18 Q 8 -20 7 -19.5" stroke="#3A2818" strokeWidth="0.6" fill="none" opacity="0.4" />
                </g>

                {/* Nose - tiny */}
                <circle cx="0" cy="-12" r="1" fill="#E8A890" opacity="0.6" />

                {/* Mouth - gentle smile */}
                <path d="M -3.5 -8.5 Q 0 -5.5 3.5 -8.5" stroke="#C07060" fill="none" strokeWidth="1.2" strokeLinecap="round" opacity="0.55" />

                {/* Blush - soft watercolor wash */}
                <ellipse cx="-11" cy="-12" rx="5" ry="3" fill="#FFB0C0" opacity="0.35" filter="url(#soft)" />
                <ellipse cx="11" cy="-12" rx="5" ry="3" fill="#FFB0C0" opacity="0.35" filter="url(#soft)" />

                {/* Basket */}
                <g transform="translate(22, 28)">
                  <ellipse cx="0" cy="2" rx="11" ry="7" fill="#B08050" opacity="0.85" />
                  <ellipse cx="0" cy="0" rx="10" ry="6" fill="#C89060" opacity="0.7" />
                  <path d="M -9 0 Q 0 -14 9 0" stroke="#A07040" fill="none" strokeWidth="2" strokeLinecap="round" />
                  {/* Items in basket */}
                  <circle cx="-3" cy="-2" r="3" fill="#FF6B6B" opacity="0.6" />
                  <circle cx="3" cy="-1" r="2.5" fill="#FFD060" opacity="0.5" />
                  <path d="M 0 -4 C -2 -6 -4 -4 0 0 C 4 -4 2 -6 0 -4" fill="#FF6B8A" opacity="0.6" />
                </g>
              </g>
            </motion.g>

            {/* ═══ Layer 7: Bunny friend ═══ */}
            <motion.g
              animate={{ x: [0, 3, 0], y: [0, -2, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
            >
              <g transform="translate(340, 438)" filter="url(#wc)">
                <ellipse cx="0" cy="8" rx="8" ry="3.5" fill="rgba(0,0,0,0.06)" />
                {/* Body */}
                <ellipse cx="0" cy="2" rx="9" ry="11" fill="#F8F4F0" />
                <ellipse cx="0" cy="5" rx="6" ry="7" fill="white" opacity="0.5" />
                {/* Head */}
                <ellipse cx="0" cy="-10" rx="7" ry="8" fill="#F8F4F0" />
                {/* Ears */}
                <ellipse cx="-4" cy="-24" rx="3" ry="10" fill="#F8F4F0" />
                <ellipse cx="-4" cy="-24" rx="1.5" ry="7" fill="#FFB8C8" opacity="0.4" />
                <ellipse cx="4" cy="-26" rx="3" ry="10" fill="#F8F4F0" />
                <ellipse cx="4" cy="-26" rx="1.5" ry="7" fill="#FFB8C8" opacity="0.4" />
                {/* Face */}
                <circle cx="-2.5" cy="-11" r="1.5" fill="#3A2818" />
                <circle cx="3" cy="-11" r="1.5" fill="#3A2818" />
                <circle cx="-1.5" cy="-12" r="0.6" fill="white" opacity="0.9" />
                <circle cx="4" cy="-12" r="0.6" fill="white" opacity="0.9" />
                <ellipse cx="0" cy="-8" rx="2" ry="1.2" fill="#FFB0B8" opacity="0.6" />
                {/* Tail */}
                <circle cx="0" cy="12" r="4" fill="#F8F4F0" />
              </g>
            </motion.g>

            {/* ═══ Layer 8: Fireflies + dust particles ═══ */}
            {[
              { x: 200, y: 290, d: 3.5, s: 3 },
              { x: 450, y: 270, d: 4.5, s: 3.5 },
              { x: 350, y: 340, d: 3, s: 2.5 },
              { x: 550, y: 310, d: 5, s: 3 },
              { x: 280, y: 360, d: 4, s: 2.5 },
              { x: 500, y: 350, d: 3.5, s: 3 },
              { x: 150, y: 330, d: 4.5, s: 2 },
              { x: 640, y: 290, d: 4, s: 2.5 },
              { x: 400, y: 300, d: 5.5, s: 4 },
              { x: 320, y: 280, d: 3, s: 2 },
              { x: 580, y: 340, d: 4, s: 2.5 },
              { x: 240, y: 320, d: 5, s: 3 },
            ].map((f, i) => (
              <motion.g key={i}>
                <motion.circle
                  cx={f.x} cy={f.y} r={f.s}
                  fill="#FFF8D0"
                  animate={{
                    opacity: [0, 0.7, 0],
                    cy: [f.y, f.y - 12, f.y],
                  }}
                  transition={{ duration: f.d, delay: i * 0.4, repeat: Infinity, ease: "easeInOut" }}
                  filter="url(#glow)"
                />
                {/* Secondary small glow */}
                <motion.circle
                  cx={f.x + 2} cy={f.y - 2} r={f.s * 0.5}
                  fill="#FFFCE8"
                  animate={{
                    opacity: [0, 0.5, 0],
                    cy: [f.y - 2, f.y - 14, f.y - 2],
                  }}
                  transition={{ duration: f.d, delay: i * 0.4 + 0.2, repeat: Infinity, ease: "easeInOut" }}
                />
              </motion.g>
            ))}

            {/* Floating pollen / dust motes */}
            {[
              { x: 250, y: 350, dx: 15 },
              { x: 450, y: 320, dx: -12 },
              { x: 350, y: 380, dx: 10 },
              { x: 550, y: 360, dx: -8 },
              { x: 180, y: 400, dx: 12 },
              { x: 620, y: 370, dx: -10 },
            ].map((p, i) => (
              <motion.circle
                key={`p${i}`}
                cx={p.x} cy={p.y} r="1"
                fill="#FFF8E0"
                opacity="0.4"
                animate={{
                  cx: [p.x, p.x + p.dx, p.x],
                  cy: [p.y, p.y - 20, p.y],
                  opacity: [0.2, 0.5, 0.2],
                }}
                transition={{ duration: 6 + i, repeat: Infinity, ease: "easeInOut", delay: i * 0.8 }}
              />
            ))}

            {/* ═══ Layer 9: Foreground (blurred depth-of-field) ═══ */}
            <g filter="url(#fg-blur)" opacity="0.65">
              {/* Dark foreground bushes */}
              <path d="M -20 540 Q 30 490 80 510 Q 120 495 160 520 Q 180 530 180 600 L -20 600 Z" fill="#3A7828" />
              <path d="M 620 535 Q 660 500 710 515 Q 750 498 790 518 Q 820 528 820 600 L 620 600 Z" fill="#3A7828" />
              {/* Foreground flowers (blurred) */}
              <circle cx="60" cy="520" r="5" fill="#FF8FAB" opacity="0.6" />
              <circle cx="90" cy="510" r="4" fill="#FFD060" opacity="0.5" />
              <circle cx="720" cy="515" r="5" fill="#C4A0E8" opacity="0.6" />
              <circle cx="690" cy="525" r="4" fill="#FF8FAB" opacity="0.5" />
              {/* Foreground grass blades */}
              <path d="M 40 540 Q 35 510 38 490" stroke="#2A6820" strokeWidth="2" fill="none" />
              <path d="M 55 535 Q 58 505 54 488" stroke="#3A7828" strokeWidth="1.5" fill="none" />
              <path d="M 740 530 Q 745 502 742 485" stroke="#2A6820" strokeWidth="2" fill="none" />
              <path d="M 760 538 Q 755 510 758 492" stroke="#3A7828" strokeWidth="1.5" fill="none" />
            </g>
          </svg>

          {/* Logo overlay */}
          <motion.div
            className="relative z-10 flex flex-col items-center gap-3"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 1 }}
          >
            <div className="flex items-center gap-3 rounded-2xl border border-white/30 bg-white/65 px-6 py-3 shadow-xl backdrop-blur-md">
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

          <motion.div
            className="relative z-10 mt-4"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2.5, repeat: Infinity }}
          >
            <span className="rounded-full border border-white/30 bg-white/55 px-5 py-2 text-sm font-medium text-foreground/70 shadow-md backdrop-blur-md">
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
