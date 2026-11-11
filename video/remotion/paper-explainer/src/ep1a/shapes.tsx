import React from 'react';
import {colors} from '../brand';

export const NAVY = colors.stageGlow;
export const DEEP = colors.stageTop;
export const INK = colors.panelInk;
export const WHITE = colors.white;
export const MUTED = colors.muted;
export const PINK = colors.pink;
export const PINKD = colors.pinkDeep;
export const TEAL = colors.teal;
export const TEALD = colors.tealDeep;

const txt = (size: number, fill: string, weight = 800, ls = 0) => ({fontFamily: 'Inter', fontWeight: weight, fontSize: size, fill, letterSpacing: ls});

export const Mark = () => (
  <g>
    <circle r={50} fill={PINK} />
    <circle r={34} fill="none" stroke={PINKD} strokeWidth={7} />
    <path d="M -14 -16 L 0 14 L 14 -16" fill="none" stroke={WHITE} strokeWidth={8} strokeLinecap="round" strokeLinejoin="round" />
  </g>
);
// a print the seal leaves behind
export const Print: React.FC<{x: number; y: number; sc?: number; k?: number}> = ({x, y, sc = 0.62, k = 1}) => (
  <g transform={`translate(${x},${y}) scale(${sc * k})`} opacity={0.96}><Mark /></g>
);

export const Scribble: React.FC<{d: string; p: number; w?: number; c?: string; o?: number}> = ({d, p, w = 7, c = INK, o = 0.9}) => (
  <path d={d} pathLength={1} fill="none" stroke={c} strokeWidth={w} strokeLinecap="round" strokeLinejoin="round"
    strokeDasharray="1 1" strokeDashoffset={1 - p} opacity={p > 0.001 ? o : 0} />
);

export const Person: React.FC<{c?: string}> = ({c = NAVY}) => (
  <g>
    <circle cx={0} cy={-62} r={26} fill={c} />
    <path d="M -38 60 L -38 -8 Q -38 -30 -14 -30 L 14 -30 Q 38 -30 38 -8 L 38 60 Z" fill={c} />
  </g>
);

// ---------- today ----------
export const Shirt = () => <path d="M -150 -130 L -55 -165 Q 0 -120 55 -165 L 150 -130 L 215 -45 L 140 -5 L 140 165 L -140 165 L -140 -5 L -215 -45 Z" fill={NAVY} />;
const Coin: React.FC<{x: number}> = ({x}) => (
  <g transform={`translate(${x},0)`}>
    <circle r={19} fill={WHITE} stroke={NAVY} strokeWidth={5} />
    <circle r={8} fill="none" stroke={NAVY} strokeWidth={3} />
  </g>
);
export const Tag: React.FC<{coins: number}> = ({coins}) => (
  <g>
    <path d="M -80 -36 L 50 -36 L 78 0 L 50 36 L -80 36 Z" fill={TEAL} />
    <circle cx={46} cy={0} r={7} fill={WHITE} />
    {coins === 1 ? <Coin x={-14} /> : (<><Coin x={-38} /><Coin x={8} /></>)}
  </g>
);
export const Phone: React.FC<{w?: number; h?: number}> = ({w = 120, h = 220, children}) => (
  <g>
    <rect x={-w / 2} y={-h / 2} width={w} height={h} rx={w * 0.16} fill={DEEP} />
    <rect x={-w / 2 + w * 0.08} y={-h / 2 + w * 0.12} width={w * 0.84} height={h - w * 0.24} rx={w * 0.08} fill={WHITE} />
    {children}
  </g>
);

// ---------- ancient ----------
export const Slab = () => (
  <g>
    <path d="M -175 -110 Q -150 -140 -60 -133 L 150 -127 Q 185 -115 178 -75 L 172 95 L -168 98 Z" fill={MUTED} />
    <text x={-118} y={-52} style={txt(34, NAVY, 800, 2)}>c.</text>
    <text x={0} y={22} textAnchor="middle" style={txt(80, NAVY, 800, -2)}>2600</text>
    <text x={0} y={72} textAnchor="middle" style={txt(30, NAVY, 800, 8)}>BCE</text>
  </g>
);
export const Campfire: React.FC<{t: number}> = ({t}) => {
  const a = Math.sin(t * 9) * 6, b = Math.sin(t * 7 + 1) * 8;
  return (
    <g>
      <path d={`M -60 -10 Q ${-40 + a} -120 0 -170 Q ${30 + b} -110 60 -10 Z`} fill={PINK} />
      <path d={`M -30 -10 Q ${-20 - a} -80 0 -105 Q ${20 + a} -70 30 -10 Z`} fill={PINKD} />
      <rect x={-110} y={-20} width={220} height={36} rx={18} fill={NAVY} transform="rotate(-12)" />
      <rect x={-110} y={-20} width={220} height={36} rx={18} fill={DEEP} transform="rotate(12)" />
    </g>
  );
};
export const Flames: React.FC<{t: number; o: number}> = ({t, o}) => (
  <g opacity={o}>
    {[0, 1, 2, 3, 4, 5, 6].map((i) => {
      const ang = (i / 7) * Math.PI * 2;
      const fl = 1 + Math.sin(t * 14 + i * 2) * 0.25;
      return (
        <path key={i} transform={`rotate(${(ang * 180) / Math.PI}) translate(0,-58) scale(${fl})`}
          d="M -14 6 Q -12 -22 0 -40 Q 12 -22 14 6 Z" fill={i % 2 ? PINKD : PINK} />
      );
    })}
  </g>
);
export const Clay = () => (
  <g>
    <path d="M -170 -40 Q -160 -70 -120 -68 L 130 -72 Q 172 -66 168 -30 L 160 40 Q 150 62 120 60 L -140 62 Q -172 58 -168 30 Z" fill={MUTED} />
    <path d="M -130 25 L 120 22" stroke={WHITE} strokeWidth={6} strokeLinecap="round" opacity={0.6} />
  </g>
);
export const Cow = () => (
  <g>
    <rect x={-120} y={70} width={34} height={120} rx={8} fill={DEEP} />
    <rect x={95} y={70} width={34} height={120} rx={8} fill={DEEP} />
    <path d="M -230 -20 Q -275 30 -255 95" fill="none" stroke={NAVY} strokeWidth={12} strokeLinecap="round" />
    <rect x={-235} y={-85} width={400} height={190} rx={70} fill={NAVY} />
    <path d="M -170 -60 Q -120 -95 -80 -55 Q -60 -10 -120 0 Q -175 -5 -170 -60 Z" fill={WHITE} />
    <path d="M 40 40 Q 90 20 110 60 Q 95 100 50 92 Q 20 75 40 40 Z" fill={WHITE} />
    <rect x={-160} y={80} width={34} height={115} rx={8} fill={NAVY} />
    <rect x={55} y={80} width={34} height={115} rx={8} fill={NAVY} />
    <rect x={150} y={-150} width={135} height={150} rx={46} fill={NAVY} />
    <path d="M 160 -140 Q 130 -190 150 -205" fill="none" stroke={MUTED} strokeWidth={14} strokeLinecap="round" />
    <path d="M 275 -140 Q 305 -190 285 -205" fill="none" stroke={MUTED} strokeWidth={14} strokeLinecap="round" />
    <ellipse cx={218} cy={-25} rx={56} ry={30} fill={MUTED} />
    <circle cx={190} cy={-95} r={9} fill={WHITE} />
    <circle cx={246} cy={-95} r={9} fill={WHITE} />
  </g>
);
export const Bricks = () => (
  <g>
    {[0, 1, 2].map((r) => [0, 1, 2].map((c) => (
      <rect key={`${r}${c}`} x={-170 + c * 116 + (r % 2) * 30} y={-20 - r * 64} width={108} height={56} rx={6} fill={r === 2 && c === 1 ? NAVY : DEEP} opacity={r === 2 && c === 1 ? 1 : 0.92} />
    )))}
  </g>
);
export const Amphora = () => (
  <g>
    <path d="M -36 -200 L 36 -200 L 30 -150 Q 120 -110 110 10 Q 100 130 0 200 Q -100 130 -110 10 Q -120 -110 -30 -150 Z" fill={NAVY} />
    <path d="M -34 -170 Q -100 -170 -80 -100" fill="none" stroke={NAVY} strokeWidth={16} strokeLinecap="round" />
    <path d="M 34 -170 Q 100 -170 80 -100" fill="none" stroke={NAVY} strokeWidth={16} strokeLinecap="round" />
    <path d="M -100 40 Q 0 70 100 40" fill="none" stroke={TEAL} strokeWidth={10} />
  </g>
);
export const Kiln = () => (
  <g>
    <path d="M -150 120 L -150 0 Q -150 -150 0 -150 Q 150 -150 150 0 L 150 120 Z" fill={DEEP} />
    <path d="M -55 120 L -55 40 Q -55 -15 0 -15 Q 55 -15 55 40 L 55 120 Z" fill={PINK} opacity={0.85} />
    <rect x={-20} y={-215} width={40} height={75} fill={DEEP} />
  </g>
);

// ---------- 1266 ----------
export const Loaf = () => (
  <g>
    <path d="M -200 70 Q -225 -50 -120 -95 Q 0 -145 120 -95 Q 225 -50 200 70 Q 0 95 -200 70 Z" fill={NAVY} />
    <path d="M -110 -60 Q -95 -25 -80 0 M -30 -80 Q -15 -45 0 -20 M 50 -78 Q 65 -45 80 -20" fill="none" stroke={WHITE} strokeWidth={10} strokeLinecap="round" />
  </g>
);
export const HangingSign = () => (
  <g>
    <rect x={-170} y={-150} width={240} height={14} fill={DEEP} />
    <rect x={-176} y={-150} width={14} height={300} fill={DEEP} />
    <line x1={-110} y1={-136} x2={-110} y2={-88} stroke={DEEP} strokeWidth={5} />
    <line x1={40} y1={-136} x2={40} y2={-88} stroke={DEEP} strokeWidth={5} />
    <rect x={-150} y={-90} width={230} height={130} rx={10} fill={NAVY} />
    <text x={-35} y={-2} textAnchor="middle" style={txt(76, WHITE)}>1266</text>
  </g>
);

// ---------- 1876 ----------
export const Cask = () => (
  <g>
    <path d="M -95 -120 Q -125 0 -95 120 L 95 120 Q 125 0 95 -120 Z" fill={NAVY} />
    <rect x={-112} y={-78} width={224} height={16} fill={TEAL} />
    <rect x={-112} y={62} width={224} height={16} fill={TEAL} />
  </g>
);
export const Wheel: React.FC<{rot: number}> = ({rot}) => (
  <g transform={`rotate(${rot})`}>
    <circle r={48} fill={DEEP} />
    <rect x={-4} y={-44} width={8} height={88} fill={WHITE} />
    <rect x={-44} y={-4} width={88} height={8} fill={WHITE} />
    <circle r={12} fill={WHITE} />
  </g>
);
export const House: React.FC<{roof: string}> = ({roof}) => (
  <g>
    <rect x={-80} y={-40} width={160} height={120} fill={NAVY} />
    <path d="M -105 -35 L 0 -125 L 105 -35 Z" fill={roof} />
    <rect x={-22} y={20} width={44} height={60} fill={WHITE} />
  </g>
);
export const Factory = () => (
  <g>
    <rect x={-100} y={-40} width={200} height={140} fill={DEEP} />
    <path d="M -100 -40 L -60 -80 L -60 -40 L -20 -80 L -20 -40 L 20 -80 L 20 -40 Z" fill={DEEP} />
    <rect x={40} y={-190} width={36} height={150} fill={NAVY} />
    <rect x={-80} y={0} width={40} height={36} fill={TEAL} />
    <rect x={-10} y={0} width={40} height={36} fill={TEAL} />
  </g>
);
export const PostSign = () => (
  <g>
    <rect x={-9} y={-40} width={18} height={330} fill={DEEP} />
    <rect x={-135} y={-120} width={270} height={110} rx={16} fill={TEAL} />
    <rect x={-122} y={-107} width={244} height={84} rx={10} fill="none" stroke={NAVY} strokeWidth={5} />
    <text x={0} y={-38} textAnchor="middle" style={txt(66, NAVY)}>1876</text>
  </g>
);
export const Ledger = () => (
  <g>
    <path d="M -390 -230 L 0 -210 L 390 -230 L 390 220 L 0 240 L -390 220 Z" fill={DEEP} />
    <path d="M -370 -215 L -6 -198 L -6 222 L -370 205 Z" fill={WHITE} />
    <path d="M 370 -215 L 6 -198 L 6 222 L 370 205 Z" fill={WHITE} />
    {[0, 1, 2, 3, 4, 5, 6].map((i) => (
      <g key={i}>
        <line x1={-340} y1={-130 + i * 50} x2={-40} y2={-120 + i * 50} stroke={MUTED} strokeWidth={4} />
        <line x1={40} y1={-120 + i * 50} x2={340} y2={-130 + i * 50} stroke={MUTED} strokeWidth={4} />
      </g>
    ))}
  </g>
);
export const StampOne = () => (
  <g>
    <circle r={52} fill="none" stroke={PINKD} strokeWidth={8} />
    <text x={0} y={24} textAnchor="middle" style={txt(70, PINKD)}>1</text>
  </g>
);

// ---------- 1880s to 1931 ----------
export const Calendar: React.FC<{tear: number}> = ({tear}) => (
  <g>
    <rect x={-125} y={-150} width={250} height={300} rx={14} fill={NAVY} />
    <circle cx={-60} cy={-150} r={12} fill={DEEP} />
    <circle cx={60} cy={-150} r={12} fill={DEEP} />
    <rect x={-105} y={-100} width={210} height={230} rx={6} fill={WHITE} />
    <text x={0} y={36} textAnchor="middle" style={txt(66, INK, 800, -2)}>1880s</text>
    {tear < 1 ? (
      <g transform={`translate(${tear * 160},${tear * tear * 520}) rotate(${tear * 50})`} opacity={1 - tear * 0.4}>
        <rect x={-105} y={-100} width={210} height={230} rx={6} fill={WHITE} stroke={MUTED} strokeWidth={3} />
        <text x={0} y={36} textAnchor="middle" style={txt(72, INK, 800, -2)}>1876</text>
      </g>
    ) : null}
  </g>
);
export const Box: React.FC<{face: number}> = ({face}) => (
  <g>
    <rect x={-60} y={-80} width={120} height={160} rx={8} fill={face > 0.5 ? TEAL : MUTED} />
    <rect x={-60} y={-80} width={120} height={30} rx={8} fill={face > 0.5 ? TEALD : NAVY} opacity={face > 0.5 ? 1 : 0.35} />
    {face > 0.5 ? (
      <g>
        <circle cx={-22} cy={0} r={12} fill={WHITE} /><circle cx={-20} cy={2} r={6} fill={DEEP} />
        <circle cx={22} cy={0} r={12} fill={WHITE} /><circle cx={24} cy={2} r={6} fill={DEEP} />
        <path d="M -24 34 Q 0 56 24 34" fill="none" stroke={DEEP} strokeWidth={7} strokeLinecap="round" />
      </g>
    ) : null}
  </g>
);
export const Typewriter = () => (
  <g>
    <rect x={-150} y={-120} width={300} height={34} rx={17} fill={TEAL} />
    <path d="M -200 100 L -160 -80 L 160 -80 L 200 100 Z" fill={NAVY} />
    {[0, 1, 2].map((r) => Array.from({length: 8 - r}, (_, i) => (
      <circle key={`${r}-${i}`} cx={-118 + r * 16 + i * 34} cy={-30 + r * 38} r={11} fill={WHITE} />
    )))}
  </g>
);

// ---------- 2004 / 1899 ----------
export const Scanner = () => (
  <g>
    <rect x={-470} y={150} width={620} height={46} rx={14} fill={DEEP} />
    <rect x={-430} y={196} width={30} height={110} fill={DEEP} />
    <rect x={60} y={196} width={30} height={110} fill={DEEP} />
    <g transform="translate(-300,120)"><circle cx={-110} cy={-10} r={34} fill={NAVY} /><rect x={-80} y={-34} width={300} height={62} rx={30} fill={NAVY} /></g>
    <circle cx={0} cy={0} r={270} fill="none" stroke={MUTED} strokeWidth={110} />
    <circle cx={0} cy={0} r={270} fill="none" stroke={WHITE} strokeWidth={8} strokeDasharray="6 22" opacity={0.6} />
  </g>
);
export const Monitor = () => (
  <g>
    <rect x={-150} y={-100} width={300} height={190} rx={14} fill={DEEP} />
    <rect x={-128} y={-80} width={256} height={150} rx={6} fill={NAVY} />
    <text x={0} y={22} textAnchor="middle" style={{...txt(78, TEAL, 800, 4), fontFamily: 'Inter'}}>2004</text>
    <rect x={-14} y={90} width={28} height={50} fill={DEEP} />
    <rect x={-70} y={136} width={140} height={14} rx={7} fill={DEEP} />
  </g>
);
export const Cup = () => (
  <g>
    <path d="M -55 -80 L 55 -80 L 42 80 L -42 80 Z" fill={NAVY} />
    <rect x={-62} y={-92} width={124} height={18} rx={9} fill={DEEP} />
  </g>
);
export const Brain: React.FC<{a: number; b: number}> = ({a, b}) => (
  <g>
    <path d="M -150 20 C -170 -60 -110 -120 -40 -110 C 0 -150 80 -140 110 -100 C 170 -90 180 -10 150 30 C 160 80 100 110 50 95 C 10 120 -60 115 -90 85 C -140 90 -160 60 -150 20 Z"
      fill="none" stroke={INK} strokeWidth={8} strokeLinejoin="round" />
    <path d="M -10 -105 C -20 -60 20 -40 0 0 C -20 40 20 60 10 100" fill="none" stroke={INK} strokeWidth={6} opacity={0.6} />
    <circle cx={-70} cy={-20} r={30 + a * 10} fill={TEAL} opacity={a * 0.9} />
    <circle cx={70} cy={20} r={26 + b * 10} fill={TEAL} opacity={b * 0.9} />
  </g>
);
export const CoatStand = () => (
  <g>
    <rect x={-10} y={-320} width={20} height={640} rx={8} fill={DEEP} />
    <path d="M -110 320 L 0 250 L 110 320" fill="none" stroke={DEEP} strokeWidth={18} strokeLinecap="round" />
    <path d="M 0 -270 Q -60 -280 -80 -240 M 0 -270 Q 60 -280 90 -240" fill="none" stroke={DEEP} strokeWidth={12} strokeLinecap="round" />
  </g>
);
export const TopHat = () => (
  <g>
    <rect x={-60} y={-130} width={120} height={130} rx={8} fill={NAVY} />
    <rect x={-60} y={-40} width={120} height={22} fill={PINK} />
    <rect x={-100} y={-6} width={200} height={20} rx={10} fill={NAVY} />
  </g>
);
export const Watch = () => (
  <g>
    <rect x={-12} y={-82} width={24} height={30} rx={6} fill={TEALD} />
    <circle r={58} fill={TEAL} />
    <circle r={44} fill={WHITE} />
    <path d="M 0 0 L 0 -30 M 0 0 L 22 10" stroke={DEEP} strokeWidth={6} strokeLinecap="round" />
  </g>
);
export const Book = () => (
  <g>
    <rect x={-190} y={-40} width={380} height={80} rx={8} fill={NAVY} />
    <rect x={-150} y={-40} width={22} height={80} fill={TEAL} />
    <rect x={128} y={-40} width={22} height={80} fill={TEAL} />
    <text x={0} y={18} textAnchor="middle" style={txt(48, WHITE, 800, 6)}>1899</text>
  </g>
);

// ---------- 2014 ----------
export const Laptop = () => (
  <g>
    <rect x={-330} y={-230} width={660} height={420} rx={22} fill={DEEP} />
    <rect x={-300} y={-205} width={600} height={370} rx={8} fill={WHITE} />
    <rect x={-270} y={-180} width={540} height={36} rx={6} fill={MUTED} opacity={0.5} />
    {[0, 1, 2, 3, 4].map((i) => <rect key={i} x={-270} y={-110 + i * 44} width={i === 4 ? 300 : 540} height={16} rx={8} fill={MUTED} opacity={0.45} />)}
    <path d="M -400 190 L 400 190 L 360 230 L -360 230 Z" fill={NAVY} />
    <g transform="translate(250,135) rotate(-10)">
      <circle r={52} fill={PINK} />
      <text x={0} y={14} textAnchor="middle" style={txt(36, WHITE, 800, -1)}>2014</text>
    </g>
  </g>
);
export const Bubble: React.FC<{c?: string}> = ({c = NAVY}) => (
  <g>
    <path d="M -70 -46 Q -70 -60 -56 -60 L 56 -60 Q 70 -60 70 -46 L 70 26 Q 70 40 56 40 L -10 40 L -34 64 L -32 40 L -56 40 Q -70 40 -70 26 Z" fill={c} />
    <rect x={-46} y={-34} width={92} height={10} rx={5} fill={WHITE} opacity={0.5} />
    <rect x={-46} y={-10} width={60} height={10} rx={5} fill={WHITE} opacity={0.5} />
  </g>
);
export const Card: React.FC<{c?: string; grey?: boolean}> = ({c = TEAL, grey}) => (
  <g>
    <rect x={-60} y={-80} width={120} height={160} rx={10} fill={WHITE} />
    <rect x={-48} y={-68} width={96} height={80} rx={6} fill={grey ? MUTED : c} />
    <rect x={-48} y={26} width={96} height={12} rx={6} fill={grey ? MUTED : NAVY} opacity={grey ? 0.6 : 0.8} />
    <rect x={-48} y={48} width={60} height={12} rx={6} fill={grey ? MUTED : NAVY} opacity={grey ? 0.4 : 0.5} />
  </g>
);
export const Heart = () => <path d="M 0 22 C -40 -6 -30 -36 -12 -34 C -4 -33 0 -26 0 -20 C 0 -26 4 -33 12 -34 C 30 -36 40 -6 0 22 Z" fill={PINK} />;

// ---------- the first principle and beyond ----------
export const Shield = () => (
  <g>
    <path d="M 0 -120 L 100 -80 Q 100 60 0 120 Q -100 60 -100 -80 Z" fill={NAVY} />
    <path d="M -40 0 L -10 30 L 45 -30" fill="none" stroke={TEAL} strokeWidth={16} strokeLinecap="round" strokeLinejoin="round" />
  </g>
);
export const PriceTag = () => (
  <g transform="rotate(-12)">
    <path d="M -70 -36 L 50 -36 L 78 0 L 50 36 L -70 36 Z" fill={TEAL} />
    <circle cx={46} cy={0} r={7} fill={WHITE} />
    <circle cx={-14} cy={0} r={19} fill={WHITE} stroke={NAVY} strokeWidth={5} />
  </g>
);
export const Target = () => (
  <g>
    <circle r={62} fill={NAVY} /><circle r={42} fill={WHITE} /><circle r={22} fill={PINK} />
  </g>
);
export const Eye = () => (
  <g>
    <path d="M -80 0 Q 0 -70 80 0 Q 0 70 -80 0 Z" fill={WHITE} stroke={NAVY} strokeWidth={8} />
    <circle r={26} fill={TEAL} /><circle r={12} fill={DEEP} />
  </g>
);
export const CalPage = () => (
  <g>
    <rect x={-58} y={-66} width={116} height={132} rx={10} fill={WHITE} stroke={NAVY} strokeWidth={6} />
    <rect x={-58} y={-66} width={116} height={30} rx={8} fill={TEAL} />
    {[0, 1, 2].map((r) => [0, 1, 2].map((c) => <rect key={`${r}${c}`} x={-40 + c * 30} y={-22 + r * 26} width={20} height={16} rx={3} fill={MUTED} />))}
  </g>
);
export const Cog: React.FC<{r: number; rot: number; c: string}> = ({r, rot, c}) => (
  <g transform={`rotate(${rot})`}>
    {Array.from({length: 10}, (_, i) => <rect key={i} x={-r * 0.16} y={-r * 1.18} width={r * 0.32} height={r * 0.4} rx={4} fill={c} transform={`rotate(${i * 36})`} />)}
    <circle r={r} fill={c} />
    <circle r={r * 0.35} fill={WHITE} />
  </g>
);
