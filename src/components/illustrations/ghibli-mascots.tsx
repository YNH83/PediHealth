"use client";

import { motion } from "framer-motion";

// ── Shared watercolor SVG filter ──────────────────────
// Creates a soft, painterly watercolor effect like Studio Ghibli backgrounds
function WatercolorFilter({ id }: { id: string }) {
  return (
    <defs>
      {/* Paper texture */}
      <filter id={`${id}-watercolor`} x="-10%" y="-10%" width="120%" height="120%">
        <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="4" seed={2} result="noise" />
        <feDisplacementMap in="SourceGraphic" in2="noise" scale="3" xChannelSelector="R" yChannelSelector="G" result="displaced" />
        <feGaussianBlur in="displaced" stdDeviation="0.8" result="blurred" />
        <feComposite in="blurred" in2="SourceGraphic" operator="atop" />
      </filter>
      {/* Soft glow */}
      <filter id={`${id}-glow`} x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="4" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
      {/* Watercolor edge bleed */}
      <filter id={`${id}-bleed`} x="-5%" y="-5%" width="110%" height="110%">
        <feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves="3" seed={5} result="noise" />
        <feDisplacementMap in="SourceGraphic" in2="noise" scale="5" result="displaced" />
        <feGaussianBlur in="displaced" stdDeviation="1.2" />
      </filter>
    </defs>
  );
}

const float = {
  animate: { y: [0, -6, 0] },
  transition: { duration: 3.5, repeat: Infinity, ease: "easeInOut" as const },
};

// ── Bear Nurse (吉卜力風護士熊) ──────────────────────
export function GhibliBear({ className = "" }: { className?: string }) {
  return (
    <motion.svg viewBox="0 0 200 220" className={className} {...float}>
      <WatercolorFilter id="bear" />
      {/* Soft shadow */}
      <ellipse cx="100" cy="210" rx="50" ry="8" fill="#E8D5C4" opacity="0.4" filter="url(#bear-bleed)" />

      {/* Body - warm watercolor brown */}
      <g filter="url(#bear-watercolor)">
        <ellipse cx="100" cy="155" rx="45" ry="50" fill="#D4A574" />
        <ellipse cx="100" cy="155" rx="38" ry="42" fill="#DEB887" />
        {/* Belly - cream watercolor */}
        <ellipse cx="100" cy="165" rx="26" ry="28" fill="#FFF5E6" opacity="0.85" />
      </g>

      {/* Nurse apron */}
      <g filter="url(#bear-watercolor)">
        <path d="M 72 140 Q 72 170 80 190 L 120 190 Q 128 170 128 140 Z" fill="white" opacity="0.7" />
        <path d="M 85 145 L 115 145 L 112 150 L 88 150 Z" fill="#FFB3C6" opacity="0.6" />
        {/* Pocket with heart */}
        <rect x="88" y="160" width="24" height="18" rx="4" fill="white" opacity="0.5" />
        <path d="M 98 165 C 96 163 93 165 98 170 C 103 165 100 163 98 165" fill="#FF8FAB" opacity="0.7" />
      </g>

      {/* Head */}
      <g filter="url(#bear-watercolor)">
        <circle cx="100" cy="80" r="42" fill="#D4A574" />
        <circle cx="100" cy="80" r="35" fill="#DEB887" />
        {/* Inner face - lighter watercolor wash */}
        <circle cx="100" cy="85" r="26" fill="#F5DEB3" opacity="0.5" />
      </g>

      {/* Ears - with pink inner watercolor */}
      <g filter="url(#bear-watercolor)">
        <circle cx="62" cy="52" r="16" fill="#D4A574" />
        <circle cx="62" cy="52" r="10" fill="#FFB3C6" opacity="0.6" />
        <circle cx="138" cy="52" r="16" fill="#D4A574" />
        <circle cx="138" cy="52" r="10" fill="#FFB3C6" opacity="0.6" />
      </g>

      {/* Nurse cap - soft white with pink cross */}
      <g filter="url(#bear-watercolor)">
        <rect x="74" y="38" width="52" height="18" rx="5" fill="white" />
        <rect x="90" y="30" width="20" height="14" rx="4" fill="white" />
        {/* Cross */}
        <rect x="97" y="33" width="6" height="12" rx="1" fill="#FF8FAB" opacity="0.7" />
        <rect x="94" y="36" width="12" height="6" rx="1" fill="#FF8FAB" opacity="0.7" />
      </g>

      {/* Eyes - Ghibli style: large, simple, expressive */}
      <g>
        <ellipse cx="86" cy="78" rx="5.5" ry="6" fill="#4A3728" />
        <ellipse cx="114" cy="78" rx="5.5" ry="6" fill="#4A3728" />
        {/* Highlights */}
        <circle cx="88" cy="76" r="2.5" fill="white" opacity="0.9" />
        <circle cx="116" cy="76" r="2.5" fill="white" opacity="0.9" />
        <circle cx="85" cy="80" r="1.2" fill="white" opacity="0.5" />
        <circle cx="113" cy="80" r="1.2" fill="white" opacity="0.5" />
      </g>

      {/* Nose - small triangle */}
      <ellipse cx="100" cy="90" rx="5" ry="3.5" fill="#8B6F47" opacity="0.8" />

      {/* Smile - gentle Ghibli curve */}
      <path d="M 90 96 Q 100 104 110 96" stroke="#8B6F47" fill="none" strokeWidth="2" strokeLinecap="round" opacity="0.7" />

      {/* Blush - soft watercolor circles */}
      <ellipse cx="74" cy="90" rx="8" ry="5" fill="#FFB3C6" opacity="0.35" filter="url(#bear-bleed)" />
      <ellipse cx="126" cy="90" rx="8" ry="5" fill="#FFB3C6" opacity="0.35" filter="url(#bear-bleed)" />

      {/* Clipboard */}
      <g filter="url(#bear-watercolor)">
        <rect x="135" y="130" width="30" height="40" rx="4" fill="#C4956A" opacity="0.8" />
        <rect x="138" y="136" width="24" height="30" rx="3" fill="#FFFDF5" />
        <rect x="142" y="141" width="16" height="3" rx="1" fill="#A8E6CF" opacity="0.6" />
        <rect x="142" y="148" width="12" height="3" rx="1" fill="#5BC0EB" opacity="0.5" />
        <rect x="142" y="155" width="14" height="3" rx="1" fill="#FFD3B6" opacity="0.6" />
      </g>
    </motion.svg>
  );
}

// ── Giraffe (吉卜力風長頸鹿) ──────────────────────────
export function GhibliGiraffe({ className = "" }: { className?: string }) {
  return (
    <motion.svg viewBox="0 0 200 260" className={className} {...float}>
      <WatercolorFilter id="giraffe" />
      <ellipse cx="90" cy="250" rx="45" ry="8" fill="#E8D5C4" opacity="0.4" filter="url(#giraffe-bleed)" />

      {/* Legs */}
      <g filter="url(#giraffe-watercolor)">
        <rect x="60" y="200" width="14" height="44" rx="5" fill="#F0C75E" />
        <rect x="95" y="200" width="14" height="44" rx="5" fill="#F0C75E" />
        {/* Hooves */}
        <ellipse cx="67" cy="244" rx="9" ry="4" fill="#D4A040" opacity="0.6" />
        <ellipse cx="102" cy="244" rx="9" ry="4" fill="#D4A040" opacity="0.6" />
      </g>

      {/* Body */}
      <g filter="url(#giraffe-watercolor)">
        <ellipse cx="85" cy="190" rx="40" ry="30" fill="#F5D76E" />
        {/* Watercolor spots */}
        <circle cx="70" cy="185" r="6" fill="#E8C040" opacity="0.5" />
        <circle cx="95" cy="188" r="5" fill="#E8C040" opacity="0.5" />
        <circle cx="82" cy="198" r="4.5" fill="#E8C040" opacity="0.5" />
        <circle cx="105" cy="180" r="4" fill="#E8C040" opacity="0.4" />
      </g>

      {/* Neck - long, elegant */}
      <g filter="url(#giraffe-watercolor)">
        <rect x="72" y="70" width="22" height="110" rx="10" fill="#F5D76E" />
        {/* Neck spots */}
        <circle cx="80" cy="100" r="4" fill="#E8C040" opacity="0.5" />
        <circle cx="88" cy="125" r="3.5" fill="#E8C040" opacity="0.4" />
        <circle cx="78" cy="150" r="4" fill="#E8C040" opacity="0.5" />
      </g>

      {/* Head */}
      <g filter="url(#giraffe-watercolor)">
        <ellipse cx="83" cy="55" rx="24" ry="22" fill="#F5D76E" />
        <ellipse cx="83" cy="60" rx="16" ry="14" fill="#FFF3B0" opacity="0.4" />
      </g>

      {/* Ossicones (horns) */}
      <g filter="url(#giraffe-watercolor)">
        <line x1="72" y1="38" x2="72" y2="24" stroke="#E8C040" strokeWidth="4" strokeLinecap="round" />
        <circle cx="72" cy="22" r="4.5" fill="#FFB3C6" opacity="0.7" />
        <line x1="94" y1="38" x2="94" y2="24" stroke="#E8C040" strokeWidth="4" strokeLinecap="round" />
        <circle cx="94" cy="22" r="4.5" fill="#FFB3C6" opacity="0.7" />
      </g>

      {/* Eyes */}
      <g>
        <ellipse cx="74" cy="52" rx="4.5" ry="5" fill="#4A3728" />
        <ellipse cx="92" cy="52" rx="4.5" ry="5" fill="#4A3728" />
        <circle cx="75.5" cy="50" r="2" fill="white" opacity="0.9" />
        <circle cx="93.5" cy="50" r="2" fill="white" opacity="0.9" />
      </g>

      {/* Smile */}
      <path d="M 76 62 Q 83 68 90 62" stroke="#C4956A" fill="none" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />

      {/* Blush */}
      <ellipse cx="66" cy="58" rx="6" ry="3.5" fill="#FFB3C6" opacity="0.35" filter="url(#giraffe-bleed)" />
      <ellipse cx="100" cy="58" rx="6" ry="3.5" fill="#FFB3C6" opacity="0.35" filter="url(#giraffe-bleed)" />

      {/* Ruler beside giraffe */}
      <g filter="url(#giraffe-watercolor)">
        <rect x="140" y="40" width="14" height="180" rx="3" fill="#5BC0EB" opacity="0.6" />
        {[60, 85, 110, 135, 160, 185].map((y, i) => (
          <g key={i}>
            <line x1="140" y1={y} x2="150" y2={y} stroke="white" strokeWidth="1.5" opacity="0.7" />
            <text x="156" y={y + 3} fontSize="7" fill="#5BC0EB" opacity="0.6">{220 - y}</text>
          </g>
        ))}
      </g>

      {/* Small butterfly friend */}
      <motion.g
        animate={{ x: [0, 8, 0], y: [0, -5, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <ellipse cx="125" cy="60" rx="5" ry="3" fill="#D4A5FF" opacity="0.6" />
        <ellipse cx="133" cy="60" rx="5" ry="3" fill="#D4A5FF" opacity="0.6" />
        <ellipse cx="125" cy="63" rx="3.5" ry="2" fill="#FFB3C6" opacity="0.5" />
        <ellipse cx="133" cy="63" rx="3.5" ry="2" fill="#FFB3C6" opacity="0.5" />
        <rect x="128" y="57" width="2" height="8" rx="1" fill="#8B6F47" opacity="0.5" />
      </motion.g>
    </motion.svg>
  );
}

// ── Cat Doctor (吉卜力風貓醫師) ────────────────────────
export function GhibliCat({ className = "" }: { className?: string }) {
  return (
    <motion.svg viewBox="0 0 200 220" className={className} {...float}>
      <WatercolorFilter id="cat" />
      <ellipse cx="100" cy="210" rx="48" ry="8" fill="#E8D5C4" opacity="0.4" filter="url(#cat-bleed)" />

      {/* Body - white coat */}
      <g filter="url(#cat-watercolor)">
        <ellipse cx="100" cy="158" rx="42" ry="46" fill="white" opacity="0.9" />
        <ellipse cx="100" cy="158" rx="38" ry="42" fill="#F8F5F0" />
        {/* Coat buttons */}
        <circle cx="100" cy="140" r="3" fill="#5BC0EB" opacity="0.5" />
        <circle cx="100" cy="155" r="3" fill="#5BC0EB" opacity="0.5" />
        <circle cx="100" cy="170" r="3" fill="#5BC0EB" opacity="0.5" />
      </g>

      {/* Head */}
      <g filter="url(#cat-watercolor)">
        <circle cx="100" cy="75" r="38" fill="#FFD3B6" opacity="0.9" />
        <circle cx="100" cy="78" r="28" fill="#FFE4CC" opacity="0.5" />
      </g>

      {/* Cat ears - triangular with pink inner */}
      <g filter="url(#cat-watercolor)">
        <polygon points="64,55 70,20 82,52" fill="#FFD3B6" />
        <polygon points="67,50 71,28 79,48" fill="#FFB3C6" opacity="0.5" />
        <polygon points="136,55 130,20 118,52" fill="#FFD3B6" />
        <polygon points="133,50 129,28 121,48" fill="#FFB3C6" opacity="0.5" />
      </g>

      {/* Eyes - large Ghibli style */}
      <g>
        <ellipse cx="86" cy="72" rx="6" ry="7" fill="#4A3728" />
        <ellipse cx="114" cy="72" rx="6" ry="7" fill="#4A3728" />
        <circle cx="88" cy="70" r="2.5" fill="white" opacity="0.9" />
        <circle cx="116" cy="70" r="2.5" fill="white" opacity="0.9" />
        <circle cx="85" cy="74" r="1.5" fill="white" opacity="0.5" />
        <circle cx="113" cy="74" r="1.5" fill="white" opacity="0.5" />
      </g>

      {/* Triangle nose */}
      <polygon points="97,84 100,80 103,84" fill="#FFB3C6" opacity="0.7" />

      {/* Whiskers - delicate watercolor lines */}
      <g opacity="0.4">
        <line x1="56" y1="78" x2="80" y2="82" stroke="#C4956A" strokeWidth="1" />
        <line x1="56" y1="84" x2="80" y2="85" stroke="#C4956A" strokeWidth="1" />
        <line x1="120" y1="82" x2="144" y2="78" stroke="#C4956A" strokeWidth="1" />
        <line x1="120" y1="85" x2="144" y2="84" stroke="#C4956A" strokeWidth="1" />
      </g>

      {/* Smile */}
      <path d="M 92 90 Q 100 96 108 90" stroke="#C4956A" fill="none" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />

      {/* Blush */}
      <ellipse cx="72" cy="84" rx="8" ry="4.5" fill="#FFB3C6" opacity="0.3" filter="url(#cat-bleed)" />
      <ellipse cx="128" cy="84" rx="8" ry="4.5" fill="#FFB3C6" opacity="0.3" filter="url(#cat-bleed)" />

      {/* Stethoscope */}
      <g filter="url(#cat-watercolor)">
        <path d="M 78 105 Q 65 125 72 150" stroke="#5BC0EB" fill="none" strokeWidth="3.5" strokeLinecap="round" opacity="0.7" />
        <circle cx="72" cy="153" r="6" fill="#5BC0EB" opacity="0.6" />
        <circle cx="72" cy="153" r="3" fill="white" opacity="0.7" />
      </g>

      {/* Head mirror */}
      <g filter="url(#cat-watercolor)">
        <circle cx="100" cy="42" r="8" fill="#E8E8E8" opacity="0.7" />
        <circle cx="100" cy="42" r="5.5" fill="white" opacity="0.8" />
        <circle cx="98" cy="40" r="2" fill="#B8D4E8" opacity="0.3" />
      </g>
    </motion.svg>
  );
}

// ── Brave Bunny (吉卜力風勇敢兔) ──────────────────────
export function GhibliBunny({ className = "" }: { className?: string }) {
  return (
    <motion.svg viewBox="0 0 200 230" className={className} {...float}>
      <WatercolorFilter id="bunny" />
      <ellipse cx="100" cy="220" rx="45" ry="7" fill="#E8D5C4" opacity="0.4" filter="url(#bunny-bleed)" />

      {/* Cape - flowing watercolor red */}
      <g filter="url(#bunny-watercolor)">
        <path d="M 68 115 Q 45 150 52 200 L 68 195 Z" fill="#FF8FAB" opacity="0.7" />
        <path d="M 132 115 Q 155 150 148 200 L 132 195 Z" fill="#FF8FAB" opacity="0.7" />
        <path d="M 68 115 Q 50 150 55 195 L 65 190 Z" fill="#E5506E" opacity="0.25" />
        <path d="M 132 115 Q 150 150 145 195 L 135 190 Z" fill="#E5506E" opacity="0.25" />
      </g>

      {/* Body */}
      <g filter="url(#bunny-watercolor)">
        <ellipse cx="100" cy="160" rx="36" ry="42" fill="white" opacity="0.95" />
        <ellipse cx="100" cy="168" rx="24" ry="24" fill="#FFF5F0" opacity="0.6" />
      </g>

      {/* Head */}
      <g filter="url(#bunny-watercolor)">
        <circle cx="100" cy="85" r="36" fill="white" opacity="0.95" />
        <circle cx="100" cy="88" r="26" fill="#FFFAF5" opacity="0.4" />
      </g>

      {/* Ears - long, soft, with pink inner */}
      <g filter="url(#bunny-watercolor)">
        <ellipse cx="78" cy="32" rx="10" ry="32" fill="white" opacity="0.95" />
        <ellipse cx="78" cy="32" rx="5.5" ry="24" fill="#FFB3C6" opacity="0.4" />
        <ellipse cx="122" cy="28" rx="10" ry="32" fill="white" opacity="0.95" />
        <ellipse cx="122" cy="28" rx="5.5" ry="24" fill="#FFB3C6" opacity="0.4" />
      </g>

      {/* Eyes - big, determined Ghibli eyes */}
      <g>
        <ellipse cx="86" cy="82" rx="6" ry="7" fill="#4A3728" />
        <ellipse cx="114" cy="82" rx="6" ry="7" fill="#4A3728" />
        <circle cx="88" cy="80" r="2.5" fill="white" opacity="0.9" />
        <circle cx="116" cy="80" r="2.5" fill="white" opacity="0.9" />
        {/* Determined eyebrows */}
        <line x1="78" y1="72" x2="90" y2="74" stroke="#4A3728" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
        <line x1="122" y1="72" x2="110" y2="74" stroke="#4A3728" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
      </g>

      {/* Nose */}
      <ellipse cx="100" cy="92" rx="4" ry="2.5" fill="#FFB3C6" opacity="0.7" />

      {/* Smile - brave */}
      <path d="M 92 98 Q 100 104 108 98" stroke="#C4956A" fill="none" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />

      {/* Blush */}
      <ellipse cx="74" cy="92" rx="7" ry="4" fill="#FFB3C6" opacity="0.3" filter="url(#bunny-bleed)" />
      <ellipse cx="126" cy="92" rx="7" ry="4" fill="#FFB3C6" opacity="0.3" filter="url(#bunny-bleed)" />

      {/* Star badge */}
      <motion.g
        animate={{ rotate: [0, 5, -5, 0], scale: [1, 1.05, 1] }}
        transition={{ duration: 3, repeat: Infinity }}
        style={{ transformOrigin: "100px 130px" }}
      >
        <polygon
          points="100,118 104,126 113,127 106,133 108,142 100,137 92,142 94,133 87,127 96,126"
          fill="#FFD93D" opacity="0.8" filter="url(#bunny-watercolor)"
        />
      </motion.g>

      {/* Sparkles */}
      <motion.g
        animate={{ opacity: [0, 0.7, 0] }}
        transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
      >
        <g transform="translate(145,65)" opacity="0.6">
          <line x1="-4" y1="0" x2="4" y2="0" stroke="#FFD93D" strokeWidth="1.5" />
          <line x1="0" y1="-4" x2="0" y2="4" stroke="#FFD93D" strokeWidth="1.5" />
        </g>
      </motion.g>
      <motion.g
        animate={{ opacity: [0, 0.6, 0] }}
        transition={{ duration: 2, repeat: Infinity, delay: 1.2 }}
      >
        <g transform="translate(50,50)" opacity="0.5">
          <line x1="-3" y1="0" x2="3" y2="0" stroke="#FFD93D" strokeWidth="1.2" />
          <line x1="0" y1="-3" x2="0" y2="3" stroke="#FFD93D" strokeWidth="1.2" />
        </g>
      </motion.g>
    </motion.svg>
  );
}

// ── Owl Scientist (吉卜力風博士貓頭鷹) ────────────────
export function GhibliOwl({ className = "" }: { className?: string }) {
  return (
    <motion.svg viewBox="0 0 200 220" className={className} {...float}>
      <WatercolorFilter id="owl" />
      <ellipse cx="100" cy="210" rx="48" ry="8" fill="#E8D5C4" opacity="0.4" filter="url(#owl-bleed)" />

      {/* Body */}
      <g filter="url(#owl-watercolor)">
        <ellipse cx="100" cy="158" rx="42" ry="46" fill="#C4956A" opacity="0.85" />
        <ellipse cx="100" cy="165" rx="28" ry="28" fill="#F5E6D3" opacity="0.7" />
      </g>

      {/* Wings */}
      <g filter="url(#owl-watercolor)">
        <ellipse cx="52" cy="150" rx="18" ry="35" fill="#A0845C" opacity="0.6" />
        <ellipse cx="148" cy="150" rx="18" ry="35" fill="#A0845C" opacity="0.6" />
      </g>

      {/* Head */}
      <g filter="url(#owl-watercolor)">
        <circle cx="100" cy="78" r="40" fill="#C4956A" opacity="0.85" />
        {/* Face disc */}
        <circle cx="100" cy="82" r="30" fill="#DEB887" opacity="0.7" />
      </g>

      {/* Ear tufts */}
      <g filter="url(#owl-watercolor)">
        <polygon points="62,48 68,22 78,52" fill="#A0845C" opacity="0.7" />
        <polygon points="138,48 132,22 122,52" fill="#A0845C" opacity="0.7" />
      </g>

      {/* Glasses frames */}
      <g opacity="0.6">
        <circle cx="82" cy="78" r="16" fill="none" stroke="#5BC0EB" strokeWidth="2" />
        <circle cx="118" cy="78" r="16" fill="none" stroke="#5BC0EB" strokeWidth="2" />
        <line x1="98" y1="78" x2="102" y2="78" stroke="#5BC0EB" strokeWidth="2" />
      </g>

      {/* Eyes - big owl eyes behind glasses */}
      <g>
        <circle cx="82" cy="78" r="12" fill="white" opacity="0.9" />
        <circle cx="118" cy="78" r="12" fill="white" opacity="0.9" />
        <circle cx="82" cy="78" r="8" fill="#4A3728" />
        <circle cx="118" cy="78" r="8" fill="#4A3728" />
        <circle cx="84" cy="75" r="3.5" fill="white" opacity="0.9" />
        <circle cx="120" cy="75" r="3.5" fill="white" opacity="0.9" />
        <circle cx="80" cy="80" r="1.5" fill="white" opacity="0.5" />
        <circle cx="116" cy="80" r="1.5" fill="white" opacity="0.5" />
      </g>

      {/* Beak */}
      <polygon points="96,92 100,99 104,92" fill="#E8C76A" opacity="0.8" />

      {/* Blush */}
      <ellipse cx="66" cy="88" rx="7" ry="4" fill="#FFB3C6" opacity="0.3" filter="url(#owl-bleed)" />
      <ellipse cx="134" cy="88" rx="7" ry="4" fill="#FFB3C6" opacity="0.3" filter="url(#owl-bleed)" />

      {/* Lab flask - rotating gently */}
      <motion.g
        animate={{ rotate: [-3, 3, -3] }}
        transition={{ duration: 2.5, repeat: Infinity }}
        style={{ transformOrigin: "155px 135px" }}
        filter="url(#owl-watercolor)"
      >
        <rect x="150" y="118" width="14" height="8" rx="2" fill="#E0E0E0" opacity="0.7" />
        <path d="M 147 126 L 143 148 Q 143 156 157 156 Q 171 156 171 148 L 167 126 Z" fill="#E8E8E8" opacity="0.6" />
        <path d="M 144 145 Q 144 155 157 155 Q 170 155 170 145 Z" fill="#A8E6CF" opacity="0.5" />
        {/* Bubbles */}
        <motion.circle
          cx="155" cy="140" r="2.5"
          fill="#A8E6CF" opacity="0.5"
          animate={{ cy: [140, 134, 140] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <motion.circle
          cx="160" cy="136" r="1.5"
          fill="#A8E6CF" opacity="0.4"
          animate={{ cy: [136, 130, 136] }}
          transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
        />
      </motion.g>

      {/* Feet */}
      <g filter="url(#owl-watercolor)">
        <ellipse cx="82" cy="202" rx="12" ry="5" fill="#E8C76A" opacity="0.6" />
        <ellipse cx="118" cy="202" rx="12" ry="5" fill="#E8C76A" opacity="0.6" />
      </g>
    </motion.svg>
  );
}
