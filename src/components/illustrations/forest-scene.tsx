"use client";

import { motion } from "framer-motion";

export function ForestScene({ onClick }: { onClick: () => void }) {
  return (
    <motion.div
      className="relative cursor-pointer select-none"
      style={{ width: "100%", maxWidth: 480, height: "auto", aspectRatio: "480/420", perspective: 1200 }}
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <svg viewBox="0 0 480 420" className="w-full h-full">
        {/* Sky gradient */}
        <defs>
          <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#E0F2FE" />
            <stop offset="100%" stopColor="#FFF5F7" />
          </linearGradient>
          <linearGradient id="ground" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#A8E6CF" />
            <stop offset="100%" stopColor="#7BC8A4" />
          </linearGradient>
          <radialGradient id="sun" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0%" stopColor="#FFF3B0" />
            <stop offset="100%" stopColor="#FFD93D" stopOpacity="0.3" />
          </radialGradient>
          <filter id="shadow" x="-10%" y="-10%" width="120%" height="130%">
            <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#000" floodOpacity="0.1" />
          </filter>
          <filter id="softShadow" x="-5%" y="-5%" width="110%" height="115%">
            <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#000" floodOpacity="0.08" />
          </filter>
        </defs>

        {/* Sky */}
        <rect width="480" height="420" fill="url(#sky)" rx="32" />

        {/* Sun */}
        <motion.circle
          cx="380" cy="70" r="45"
          fill="url(#sun)"
          animate={{ cy: [70, 65, 70] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.circle
          cx="380" cy="70" r="22"
          fill="#FFD93D"
          animate={{ cy: [70, 65, 70] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Clouds */}
        <motion.g
          animate={{ x: [0, 15, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        >
          <ellipse cx="100" cy="60" rx="40" ry="18" fill="white" opacity="0.8" />
          <ellipse cx="80" cy="52" rx="25" ry="14" fill="white" opacity="0.8" />
          <ellipse cx="120" cy="50" rx="28" ry="15" fill="white" opacity="0.8" />
        </motion.g>
        <motion.g
          animate={{ x: [0, -12, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        >
          <ellipse cx="280" cy="45" rx="35" ry="15" fill="white" opacity="0.6" />
          <ellipse cx="265" cy="38" rx="22" ry="12" fill="white" opacity="0.6" />
          <ellipse cx="298" cy="36" rx="24" ry="13" fill="white" opacity="0.6" />
        </motion.g>

        {/* Ground */}
        <ellipse cx="240" cy="380" rx="260" ry="80" fill="url(#ground)" />

        {/* Background trees */}
        <g filter="url(#softShadow)">
          {/* Far left tree */}
          <rect x="40" y="180" width="16" height="120" rx="4" fill="#8B6F47" />
          <ellipse cx="48" cy="170" rx="38" ry="50" fill="#6BCB77" opacity="0.7" />
          <ellipse cx="48" cy="155" rx="30" ry="40" fill="#82D98A" opacity="0.7" />

          {/* Far right tree */}
          <rect x="410" y="190" width="14" height="110" rx="4" fill="#8B6F47" />
          <ellipse cx="417" cy="180" rx="35" ry="48" fill="#6BCB77" opacity="0.7" />
          <ellipse cx="417" cy="165" rx="28" ry="38" fill="#82D98A" opacity="0.7" />
        </g>

        {/* Big center tree */}
        <g filter="url(#shadow)">
          <rect x="200" y="140" width="28" height="170" rx="6" fill="#A0845C" />
          <rect x="205" y="140" width="8" height="170" rx="3" fill="#B8976A" opacity="0.5" />
          <ellipse cx="214" cy="125" rx="65" ry="75" fill="#5AB963" />
          <ellipse cx="214" cy="105" rx="52" ry="60" fill="#6BCB77" />
          <ellipse cx="214" cy="90" rx="38" ry="45" fill="#82D98A" />
          {/* Apples */}
          <circle cx="180" cy="120" r="6" fill="#FF6B6B" />
          <circle cx="245" cy="130" r="5" fill="#FF6B6B" />
          <circle cx="200" cy="100" r="5.5" fill="#FF6B6B" />
        </g>

        {/* Mushrooms */}
        <g>
          <rect x="120" y="325" width="6" height="16" rx="2" fill="#F5E6D3" />
          <ellipse cx="123" cy="325" rx="12" ry="8" fill="#FF6B8A" />
          <circle cx="119" cy="322" r="2" fill="white" opacity="0.8" />
          <circle cx="127" cy="324" r="1.5" fill="white" opacity="0.8" />

          <rect x="340" y="320" width="5" height="14" rx="2" fill="#F5E6D3" />
          <ellipse cx="342.5" cy="320" rx="10" ry="7" fill="#D4A5FF" />
          <circle cx="339" cy="318" r="1.5" fill="white" opacity="0.8" />
          <circle cx="346" cy="319" r="1.2" fill="white" opacity="0.8" />
        </g>

        {/* Flowers */}
        {[
          { cx: 90, cy: 350, color: "#FF6B8A" },
          { cx: 160, cy: 360, color: "#FFD93D" },
          { cx: 300, cy: 355, color: "#D4A5FF" },
          { cx: 370, cy: 348, color: "#5BC0EB" },
          { cx: 430, cy: 358, color: "#FF6B8A" },
        ].map((f, i) => (
          <motion.g
            key={i}
            animate={{ y: [0, -3, 0] }}
            transition={{ duration: 2, delay: i * 0.3, repeat: Infinity, ease: "easeInOut" }}
          >
            <line x1={f.cx} y1={f.cy} x2={f.cx} y2={f.cy + 15} stroke="#6BCB77" strokeWidth="2" />
            <circle cx={f.cx} cy={f.cy} r="5" fill={f.color} />
            <circle cx={f.cx} cy={f.cy} r="2" fill="#FFF3B0" />
          </motion.g>
        ))}

        {/* Path / road */}
        <path
          d="M 180 400 Q 220 350 240 340 Q 260 330 280 340 Q 320 360 340 400"
          fill="#E8D5B7"
          opacity="0.6"
        />

        {/* Little Red Riding Hood */}
        <motion.g
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          filter="url(#shadow)"
        >
          {/* Body */}
          <ellipse cx="240" cy="320" rx="18" ry="6" fill="rgba(0,0,0,0.08)" />
          {/* Dress */}
          <path d="M 228 280 Q 225 310 225 318 L 255 318 Q 255 310 252 280 Z" fill="#FF6B8A" />
          {/* Cape */}
          <path
            d="M 224 260 Q 218 290 215 320 L 228 318 L 228 260 Z"
            fill="#E5506E"
          />
          <path
            d="M 256 260 Q 262 290 265 320 L 252 318 L 252 260 Z"
            fill="#E5506E"
          />
          {/* Head */}
          <circle cx="240" cy="255" r="16" fill="#FFD3B6" />
          {/* Hood */}
          <path
            d="M 222 255 Q 222 235 240 228 Q 258 235 258 255 Q 252 250 240 248 Q 228 250 222 255 Z"
            fill="#FF6B8A"
          />
          <path
            d="M 222 255 Q 222 235 240 228 Q 258 235 258 255 Q 252 250 240 248 Q 228 250 222 255 Z"
            fill="#E5506E"
            opacity="0.3"
          />
          {/* Eyes */}
          <circle cx="234" cy="256" r="2.5" fill="#333" />
          <circle cx="246" cy="256" r="2.5" fill="#333" />
          <circle cx="235" cy="255" r="1" fill="white" />
          <circle cx="247" cy="255" r="1" fill="white" />
          {/* Smile */}
          <path d="M 235 262 Q 240 267 245 262" stroke="#333" fill="none" strokeWidth="1.2" strokeLinecap="round" />
          {/* Blush */}
          <ellipse cx="229" cy="261" rx="4" ry="2.5" fill="#FFB3C6" opacity="0.5" />
          <ellipse cx="251" cy="261" rx="4" ry="2.5" fill="#FFB3C6" opacity="0.5" />
          {/* Basket */}
          <ellipse cx="265" cy="300" rx="10" ry="7" fill="#C4956A" />
          <path d="M 256 300 Q 265 288 274 300" stroke="#A0845C" fill="none" strokeWidth="2" />
          {/* Tiny heart in basket */}
          <path d="M 263 298 C 261 296 259 298 263 302 C 267 298 265 296 263 298" fill="#FF6B8A" />
        </motion.g>

        {/* Cute bunny */}
        <motion.g
          animate={{ x: [0, 5, 0], y: [0, -3, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        >
          <ellipse cx="155" cy="335" rx="8" ry="5" fill="rgba(0,0,0,0.05)" />
          <ellipse cx="155" cy="325" rx="9" ry="11" fill="white" />
          <ellipse cx="155" cy="314" rx="7" ry="8" fill="white" />
          {/* Ears */}
          <ellipse cx="150" cy="300" rx="3" ry="10" fill="white" />
          <ellipse cx="150" cy="300" rx="1.5" ry="7" fill="#FFB3C6" />
          <ellipse cx="160" cy="298" rx="3" ry="10" fill="white" />
          <ellipse cx="160" cy="298" rx="1.5" ry="7" fill="#FFB3C6" />
          {/* Face */}
          <circle cx="152" cy="312" r="1.5" fill="#333" />
          <circle cx="158" cy="312" r="1.5" fill="#333" />
          <ellipse cx="155" cy="316" rx="2" ry="1.2" fill="#FFB3C6" />
        </motion.g>

        {/* Butterfly */}
        <motion.g
          animate={{
            x: [0, 30, 60, 30, 0],
            y: [0, -20, 0, 20, 0],
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
          <ellipse cx="300" cy="200" rx="8" ry="5" fill="#D4A5FF" opacity="0.7" />
          <ellipse cx="314" cy="200" rx="8" ry="5" fill="#D4A5FF" opacity="0.7" />
          <ellipse cx="300" cy="205" rx="6" ry="3.5" fill="#FFB3C6" opacity="0.6" />
          <ellipse cx="314" cy="205" rx="6" ry="3.5" fill="#FFB3C6" opacity="0.6" />
          <rect x="306" y="196" width="2" height="12" rx="1" fill="#8B6F47" />
        </motion.g>

        {/* Sparkles */}
        {[
          { x: 140, y: 200, delay: 0 },
          { x: 320, y: 160, delay: 1.5 },
          { x: 70, y: 130, delay: 3 },
          { x: 400, y: 110, delay: 0.8 },
        ].map((s, i) => (
          <motion.g
            key={i}
            animate={{ opacity: [0, 1, 0], scale: [0.5, 1, 0.5] }}
            transition={{ duration: 2, delay: s.delay, repeat: Infinity }}
          >
            <line x1={s.x - 5} y1={s.y} x2={s.x + 5} y2={s.y} stroke="#FFD93D" strokeWidth="1.5" />
            <line x1={s.x} y1={s.y - 5} x2={s.x} y2={s.y + 5} stroke="#FFD93D" strokeWidth="1.5" />
          </motion.g>
        ))}

        {/* Click hint text */}
        <motion.text
          x="240" y="405"
          textAnchor="middle"
          fontSize="12"
          fill="#A0845C"
          fontWeight="600"
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          點擊進入照護入口 ✨
        </motion.text>
      </svg>
    </motion.div>
  );
}
