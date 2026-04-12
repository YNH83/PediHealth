"use client";

import { motion } from "framer-motion";

const float = {
  animate: { y: [0, -8, 0] },
  transition: { duration: 3, repeat: Infinity, ease: "easeInOut" as const },
};

// Dashboard: Bear nurse with clipboard
export function BearNurse({ className = "" }: { className?: string }) {
  return (
    <motion.svg
      viewBox="0 0 120 140"
      className={`${className}`}
      {...float}
    >
      {/* Shadow */}
      <ellipse cx="60" cy="135" rx="30" ry="5" fill="rgba(0,0,0,0.06)" />
      {/* Body */}
      <ellipse cx="60" cy="100" rx="28" ry="32" fill="#C4956A" />
      <ellipse cx="60" cy="100" rx="22" ry="26" fill="#D4A87A" />
      {/* Belly */}
      <ellipse cx="60" cy="108" rx="15" ry="16" fill="#F5E6D3" />
      {/* Head */}
      <circle cx="60" cy="55" r="28" fill="#C4956A" />
      <circle cx="60" cy="55" r="22" fill="#D4A87A" />
      {/* Ears */}
      <circle cx="36" cy="38" r="10" fill="#C4956A" />
      <circle cx="36" cy="38" r="6" fill="#FFB3C6" />
      <circle cx="84" cy="38" r="10" fill="#C4956A" />
      <circle cx="84" cy="38" r="6" fill="#FFB3C6" />
      {/* Eyes */}
      <circle cx="50" cy="52" r="4" fill="#333" />
      <circle cx="70" cy="52" r="4" fill="#333" />
      <circle cx="51.5" cy="50.5" r="1.5" fill="white" />
      <circle cx="71.5" cy="50.5" r="1.5" fill="white" />
      {/* Nose */}
      <ellipse cx="60" cy="60" rx="4" ry="3" fill="#8B6F47" />
      {/* Smile */}
      <path d="M 53 65 Q 60 72 67 65" stroke="#8B6F47" fill="none" strokeWidth="1.5" strokeLinecap="round" />
      {/* Blush */}
      <ellipse cx="42" cy="60" rx="5" ry="3" fill="#FFB3C6" opacity="0.4" />
      <ellipse cx="78" cy="60" rx="5" ry="3" fill="#FFB3C6" opacity="0.4" />
      {/* Nurse cap */}
      <rect x="44" y="28" width="32" height="12" rx="3" fill="white" />
      <rect x="56" y="24" width="8" height="8" rx="1" fill="white" />
      <path d="M 58 28 L 60 26 L 62 28 L 60 30 Z" fill="#FF6B8A" />
      {/* Clipboard */}
      <rect x="78" y="85" width="20" height="26" rx="3" fill="#A0845C" />
      <rect x="80" y="90" width="16" height="18" rx="2" fill="white" />
      <rect x="83" y="93" width="10" height="2" rx="1" fill="#A8E6CF" />
      <rect x="83" y="97" width="8" height="2" rx="1" fill="#5BC0EB" />
      <rect x="83" y="101" width="10" height="2" rx="1" fill="#FFD3B6" />
    </motion.svg>
  );
}

// Growth page: Giraffe with ruler
export function GiraffeRuler({ className = "" }: { className?: string }) {
  return (
    <motion.svg
      viewBox="0 0 120 160"
      className={`${className}`}
      {...float}
    >
      <ellipse cx="55" cy="155" rx="28" ry="5" fill="rgba(0,0,0,0.06)" />
      {/* Legs */}
      <rect x="40" y="120" width="8" height="30" rx="3" fill="#E8C76A" />
      <rect x="60" y="120" width="8" height="30" rx="3" fill="#E8C76A" />
      {/* Body */}
      <ellipse cx="55" cy="110" rx="24" ry="20" fill="#F5D76E" />
      {/* Spots */}
      <circle cx="45" cy="105" r="4" fill="#E8C76A" />
      <circle cx="62" cy="108" r="3.5" fill="#E8C76A" />
      <circle cx="53" cy="115" r="3" fill="#E8C76A" />
      {/* Neck */}
      <rect x="48" y="50" width="14" height="55" rx="6" fill="#F5D76E" />
      <circle cx="52" cy="65" r="2.5" fill="#E8C76A" />
      <circle cx="58" cy="78" r="2" fill="#E8C76A" />
      <circle cx="52" cy="90" r="2.5" fill="#E8C76A" />
      {/* Head */}
      <ellipse cx="55" cy="42" rx="16" ry="14" fill="#F5D76E" />
      {/* Horns */}
      <line x1="48" y1="30" x2="48" y2="22" stroke="#E8C76A" strokeWidth="3" strokeLinecap="round" />
      <circle cx="48" cy="20" r="3" fill="#FFB3C6" />
      <line x1="62" y1="30" x2="62" y2="22" stroke="#E8C76A" strokeWidth="3" strokeLinecap="round" />
      <circle cx="62" cy="20" r="3" fill="#FFB3C6" />
      {/* Eyes */}
      <circle cx="48" cy="40" r="3" fill="#333" />
      <circle cx="62" cy="40" r="3" fill="#333" />
      <circle cx="49" cy="39" r="1.2" fill="white" />
      <circle cx="63" cy="39" r="1.2" fill="white" />
      {/* Smile */}
      <path d="M 50 48 Q 55 53 60 48" stroke="#8B6F47" fill="none" strokeWidth="1.2" strokeLinecap="round" />
      {/* Blush */}
      <ellipse cx="42" cy="45" rx="4" ry="2.5" fill="#FFB3C6" opacity="0.4" />
      <ellipse cx="68" cy="45" rx="4" ry="2.5" fill="#FFB3C6" opacity="0.4" />
      {/* Ruler */}
      <rect x="85" y="30" width="10" height="115" rx="2" fill="#5BC0EB" />
      <rect x="87" y="30" width="6" height="115" rx="1" fill="#74C0FC" />
      {[40, 55, 70, 85, 100, 115, 130].map((y, i) => (
        <g key={i}>
          <line x1="85" y1={y} x2="92" y2={y} stroke="white" strokeWidth="1" />
          <text x="97" y={y + 3} fontSize="5" fill="#5BC0EB">{(145 - y)}</text>
        </g>
      ))}
    </motion.svg>
  );
}

// Visits page: Cat doctor
export function CatDoctor({ className = "" }: { className?: string }) {
  return (
    <motion.svg
      viewBox="0 0 120 140"
      className={`${className}`}
      {...float}
    >
      <ellipse cx="60" cy="135" rx="28" ry="5" fill="rgba(0,0,0,0.06)" />
      {/* Body - white coat */}
      <ellipse cx="60" cy="105" rx="26" ry="28" fill="white" />
      <ellipse cx="60" cy="105" rx="24" ry="26" fill="#F8F8F8" />
      {/* Coat buttons */}
      <circle cx="60" cy="95" r="2" fill="#5BC0EB" />
      <circle cx="60" cy="105" r="2" fill="#5BC0EB" />
      <circle cx="60" cy="115" r="2" fill="#5BC0EB" />
      {/* Head */}
      <circle cx="60" cy="55" r="24" fill="#FFD3B6" />
      {/* Cat ears */}
      <polygon points="38,38 42,15 52,35" fill="#FFD3B6" />
      <polygon points="40,35 43,20 50,33" fill="#FFB3C6" />
      <polygon points="82,38 78,15 68,35" fill="#FFD3B6" />
      <polygon points="80,35 77,20 70,33" fill="#FFB3C6" />
      {/* Eyes */}
      <ellipse cx="50" cy="52" rx="4" ry="4.5" fill="#333" />
      <ellipse cx="70" cy="52" rx="4" ry="4.5" fill="#333" />
      <ellipse cx="51" cy="50.5" rx="1.5" ry="2" fill="white" />
      <ellipse cx="71" cy="50.5" rx="1.5" ry="2" fill="white" />
      {/* Nose */}
      <polygon points="58,60 60,58 62,60" fill="#FFB3C6" />
      {/* Whiskers */}
      <line x1="35" y1="58" x2="48" y2="60" stroke="#D4A87A" strokeWidth="0.8" />
      <line x1="35" y1="62" x2="48" y2="62" stroke="#D4A87A" strokeWidth="0.8" />
      <line x1="72" y1="60" x2="85" y2="58" stroke="#D4A87A" strokeWidth="0.8" />
      <line x1="72" y1="62" x2="85" y2="62" stroke="#D4A87A" strokeWidth="0.8" />
      {/* Smile */}
      <path d="M 55 64 Q 60 68 65 64" stroke="#D4A87A" fill="none" strokeWidth="1.2" strokeLinecap="round" />
      {/* Stethoscope */}
      <path d="M 48 75 Q 40 85 45 95" stroke="#5BC0EB" fill="none" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="45" cy="97" r="4" fill="#5BC0EB" />
      <circle cx="45" cy="97" r="2" fill="white" />
      {/* Head mirror */}
      <circle cx="60" cy="32" r="6" fill="#E0E0E0" />
      <circle cx="60" cy="32" r="4" fill="white" />
      <circle cx="59" cy="31" r="1.5" fill="#74C0FC" opacity="0.3" />
    </motion.svg>
  );
}

// Injection page: Brave bunny hero
export function BraveBunny({ className = "" }: { className?: string }) {
  return (
    <motion.svg
      viewBox="0 0 120 150"
      className={`${className}`}
      {...float}
    >
      <ellipse cx="60" cy="145" rx="28" ry="5" fill="rgba(0,0,0,0.06)" />
      {/* Body */}
      <ellipse cx="60" cy="105" rx="22" ry="28" fill="white" />
      <ellipse cx="60" cy="112" rx="16" ry="16" fill="#F5E6D3" />
      {/* Cape */}
      <path d="M 42 80 Q 30 100 35 130 L 42 125 Z" fill="#FF6B8A" />
      <path d="M 78 80 Q 90 100 85 130 L 78 125 Z" fill="#FF6B8A" />
      <path d="M 42 80 Q 30 100 35 130 L 42 125 Z" fill="#E5506E" opacity="0.3" />
      {/* Head */}
      <circle cx="60" cy="55" r="22" fill="white" />
      {/* Ears */}
      <ellipse cx="46" cy="22" rx="7" ry="20" fill="white" />
      <ellipse cx="46" cy="22" rx="4" ry="15" fill="#FFB3C6" />
      <ellipse cx="74" cy="22" rx="7" ry="20" fill="white" />
      <ellipse cx="74" cy="22" rx="4" ry="15" fill="#FFB3C6" />
      {/* Eyes - determined */}
      <circle cx="52" cy="52" r="4" fill="#333" />
      <circle cx="68" cy="52" r="4" fill="#333" />
      <circle cx="53.5" cy="50.5" r="1.5" fill="white" />
      <circle cx="69.5" cy="50.5" r="1.5" fill="white" />
      {/* Determined eyebrows */}
      <line x1="47" y1="44" x2="55" y2="46" stroke="#333" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="73" y1="44" x2="65" y2="46" stroke="#333" strokeWidth="1.5" strokeLinecap="round" />
      {/* Nose */}
      <ellipse cx="60" cy="58" rx="3" ry="2" fill="#FFB3C6" />
      {/* Smile */}
      <path d="M 55 63 Q 60 67 65 63" stroke="#D4A87A" fill="none" strokeWidth="1.2" strokeLinecap="round" />
      {/* Band-aid on arm - badge of bravery */}
      <rect x="78" y="92" width="14" height="8" rx="3" fill="#FFD3B6" />
      <line x1="82" y1="92" x2="82" y2="100" stroke="#E8C76A" strokeWidth="0.5" />
      <line x1="88" y1="92" x2="88" y2="100" stroke="#E8C76A" strokeWidth="0.5" />
      {/* Star badge */}
      <motion.g
        animate={{ rotate: [0, 5, -5, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <polygon
          points="60,78 63,84 69,85 64,89 66,95 60,91 54,95 56,89 51,85 57,84"
          fill="#FFD93D"
        />
      </motion.g>
      {/* Sparkles around */}
      <motion.g
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
      >
        <text x="88" y="70" fontSize="10">✨</text>
      </motion.g>
      <motion.g
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, delay: 1 }}
      >
        <text x="28" y="60" fontSize="8">⭐</text>
      </motion.g>
    </motion.svg>
  );
}

// Prediction page: Owl with crystal ball
export function PredictionOwl({ className = "" }: { className?: string }) {
  return (
    <motion.svg
      viewBox="0 0 120 140"
      className={`${className}`}
      {...float}
    >
      <ellipse cx="60" cy="135" rx="28" ry="5" fill="rgba(0,0,0,0.06)" />
      {/* Body */}
      <ellipse cx="60" cy="105" rx="26" ry="28" fill="#C4956A" />
      <ellipse cx="60" cy="110" rx="18" ry="18" fill="#F5E6D3" />
      {/* Wings */}
      <ellipse cx="30" cy="100" rx="12" ry="22" fill="#A0845C" />
      <ellipse cx="90" cy="100" rx="12" ry="22" fill="#A0845C" />
      {/* Head */}
      <circle cx="60" cy="55" r="26" fill="#C4956A" />
      <circle cx="60" cy="58" r="20" fill="#D4A87A" />
      {/* Ear tufts */}
      <polygon points="38,35 42,18 48,38" fill="#A0845C" />
      <polygon points="82,35 78,18 72,38" fill="#A0845C" />
      {/* Eye circles */}
      <circle cx="48" cy="55" r="10" fill="white" />
      <circle cx="72" cy="55" r="10" fill="white" />
      {/* Eyes */}
      <circle cx="48" cy="55" r="6" fill="#6B3FA0" />
      <circle cx="72" cy="55" r="6" fill="#6B3FA0" />
      <circle cx="50" cy="53" r="2.5" fill="white" />
      <circle cx="74" cy="53" r="2.5" fill="white" />
      {/* Wizard hat */}
      <polygon points="60,5 45,35 75,35" fill="#6B3FA0" />
      <polygon points="60,5 63,22 56,22" fill="#8B5FD0" />
      <ellipse cx="60" cy="35" rx="18" ry="4" fill="#6B3FA0" />
      {/* Star on hat */}
      <motion.g
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <polygon
          points="60,14 61.5,18 65.5,18.5 62.5,21 63.5,25 60,22.5 56.5,25 57.5,21 54.5,18.5 58.5,18"
          fill="#FFD93D"
        />
      </motion.g>
      {/* Beak */}
      <polygon points="57,65 60,70 63,65" fill="#E8C76A" />
      {/* Crystal ball */}
      <motion.g
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        style={{ transformOrigin: "30px 118px" }}
      >
        <circle cx="30" cy="118" r="10" fill="#D4A5FF" opacity="0.3" />
        <circle cx="30" cy="118" r="8" fill="#D4A5FF" opacity="0.2" />
        <circle cx="30" cy="118" r="10" fill="none" stroke="#D4A5FF" strokeWidth="1.5" />
        <circle cx="27" cy="115" r="2" fill="white" opacity="0.5" />
      </motion.g>
      {/* Stand for crystal ball */}
      <path d="M 23 127 Q 30 130 37 127" stroke="#A0845C" fill="none" strokeWidth="2" strokeLinecap="round" />
      {/* Feet */}
      <ellipse cx="50" cy="130" rx="8" ry="4" fill="#E8C76A" />
      <ellipse cx="70" cy="130" rx="8" ry="4" fill="#E8C76A" />
      {/* Sparkles */}
      <motion.g
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
      >
        <text x="88" y="75" fontSize="8">✨</text>
      </motion.g>
      <motion.g
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 2, repeat: Infinity, delay: 1.2 }}
      >
        <text x="20" y="55" fontSize="7">🔮</text>
      </motion.g>
    </motion.svg>
  );
}

// Labs page: Owl scientist
export function OwlScientist({ className = "" }: { className?: string }) {
  return (
    <motion.svg
      viewBox="0 0 120 140"
      className={`${className}`}
      {...float}
    >
      <ellipse cx="60" cy="135" rx="28" ry="5" fill="rgba(0,0,0,0.06)" />
      {/* Body */}
      <ellipse cx="60" cy="105" rx="26" ry="28" fill="#C4956A" />
      <ellipse cx="60" cy="110" rx="18" ry="18" fill="#F5E6D3" />
      {/* Wings */}
      <ellipse cx="30" cy="100" rx="12" ry="22" fill="#A0845C" />
      <ellipse cx="90" cy="100" rx="12" ry="22" fill="#A0845C" />
      {/* Head */}
      <circle cx="60" cy="55" r="26" fill="#C4956A" />
      {/* Face disc */}
      <circle cx="60" cy="58" r="20" fill="#D4A87A" />
      {/* Ear tufts */}
      <polygon points="38,35 42,18 48,38" fill="#A0845C" />
      <polygon points="82,35 78,18 72,38" fill="#A0845C" />
      {/* Eye circles */}
      <circle cx="48" cy="55" r="10" fill="white" />
      <circle cx="72" cy="55" r="10" fill="white" />
      {/* Eyes */}
      <circle cx="48" cy="55" r="6" fill="#333" />
      <circle cx="72" cy="55" r="6" fill="#333" />
      <circle cx="50" cy="53" r="2.5" fill="white" />
      <circle cx="74" cy="53" r="2.5" fill="white" />
      {/* Glasses */}
      <circle cx="48" cy="55" r="11" fill="none" stroke="#5BC0EB" strokeWidth="1.5" />
      <circle cx="72" cy="55" r="11" fill="none" stroke="#5BC0EB" strokeWidth="1.5" />
      <line x1="59" y1="55" x2="61" y2="55" stroke="#5BC0EB" strokeWidth="1.5" />
      {/* Beak */}
      <polygon points="57,65 60,70 63,65" fill="#E8C76A" />
      {/* Lab flask */}
      <motion.g
        animate={{ rotate: [-5, 5, -5] }}
        transition={{ duration: 2, repeat: Infinity }}
        style={{ transformOrigin: "95px 90px" }}
      >
        <rect x="90" y="78" width="10" height="5" rx="1" fill="#E0E0E0" />
        <path d="M 88 83 L 85 100 Q 85 106 95 106 Q 105 106 105 100 L 102 83 Z" fill="#E0E0E0" />
        <path d="M 86 95 Q 86 105 95 105 Q 104 105 104 95 Z" fill="#A8E6CF" opacity="0.6" />
        {/* Bubbles */}
        <circle cx="93" cy="92" r="2" fill="#A8E6CF" opacity="0.5" />
        <circle cx="97" cy="88" r="1.5" fill="#A8E6CF" opacity="0.5" />
      </motion.g>
      {/* Feet */}
      <ellipse cx="50" cy="130" rx="8" ry="4" fill="#E8C76A" />
      <ellipse cx="70" cy="130" rx="8" ry="4" fill="#E8C76A" />
    </motion.svg>
  );
}
