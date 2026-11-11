import React from 'react';
import {AbsoluteFill, Easing, interpolate, Sequence, useCurrentFrame} from 'remotion';
import {colors, easeOut} from './brand';
import {EndCardLight} from './EndCardLight';

const FPS = 30;
const s = (x: number) => Math.round(x * FPS);
export const STORY = 30;
export const TOTAL = s(STORY + 12);
const C = {extrapolateLeft: 'clamp' as const, extrapolateRight: 'clamp' as const};
const tw = (f: number, a: number, b: number, from: number, to: number, e: (t: number) => number = easeOut) =>
  interpolate(f, [s(a), s(b)], [from, to], {...C, easing: e});
const inOut = Easing.bezier(0.65, 0, 0.35, 1);
const flick = Easing.bezier(0.15, 0.75, 0.15, 1);
const drop = Easing.bezier(0.5, 0, 0.75, 0);
const hash = (n: number) => {const x = Math.sin(n * 12.9898) * 43758.5453; return x - Math.floor(x);};
const jit = (f: number, seed: number, amt = 1) => (hash(Math.floor(f / 3) * 7.13 + seed * 3.7) - 0.5) * amt;

const NAVY = colors.stageGlow;
const DEEP = colors.stageTop;
const INK = colors.panelInk;
const WHITE = colors.white;
const MUTED = colors.muted;
const H = 1080;

// ---------- camera: scrolling through time ----------
// panels: 0 = 2700 BCE, 1 = 1266, 2 = 1876, 3 = today
const camAt = (f: number) => {
  if (f < s(4.6)) return 3 * H;
  if (f < s(11.4)) return tw(f, 4.6, 6.9, 3 * H, 0, flick);
  if (f < s(17.0)) return tw(f, 11.4, 12.8, 0, H, flick);
  if (f < s(24.0)) return tw(f, 17.0, 18.4, H, 2 * H, flick);
  return tw(f, 24.0, 25.6, 2 * H, 3 * H, flick);
};

// ---------- shapes ----------
const Shirt = () => <path d="M -150 -130 L -55 -165 Q 0 -120 55 -165 L 150 -130 L 215 -45 L 140 -5 L 140 165 L -140 165 L -140 -5 L -215 -45 Z" fill={NAVY} />;
const Tag: React.FC<{label: string}> = ({label}) => (
  <g>
    <path d="M -70 -36 L 50 -36 L 78 0 L 50 36 L -70 36 Z" fill={colors.teal} />
    <circle cx={46} cy={0} r={7} fill={WHITE} />
    <text x={-14} y={14} textAnchor="middle" fontFamily="Inter" fontWeight={800} fontSize={38} fill={INK}>{label}</text>
  </g>
);
const Mark = () => (
  <g>
    <circle r={50} fill={colors.pink} />
    <circle r={34} fill="none" stroke={colors.pinkDeep} strokeWidth={7} />
    <path d="M -14 -16 L 0 14 L 14 -16" fill="none" stroke={WHITE} strokeWidth={8} strokeLinecap="round" strokeLinejoin="round" />
  </g>
);
const Cow = () => (
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
const Loaf = () => (
  <g>
    <path d="M -200 70 Q -225 -50 -120 -95 Q 0 -145 120 -95 Q 225 -50 200 70 Q 0 95 -200 70 Z" fill={NAVY} />
    <path d="M -110 -60 Q -95 -25 -80 0 M -30 -80 Q -15 -45 0 -20 M 50 -78 Q 65 -45 80 -20" fill="none" stroke={WHITE} strokeWidth={10} strokeLinecap="round" />
  </g>
);
const Cask = () => (
  <g>
    <path d="M -95 -120 Q -125 0 -95 120 L 95 120 Q 125 0 95 -120 Z" fill={NAVY} />
    <rect x={-112} y={-78} width={224} height={16} fill={colors.teal} />
    <rect x={-112} y={62} width={224} height={16} fill={colors.teal} />
  </g>
);
const Wheel: React.FC<{rot: number}> = ({rot}) => (
  <g transform={`rotate(${rot})`}>
    <circle r={48} fill={DEEP} />
    <rect x={-4} y={-44} width={8} height={88} fill={WHITE} />
    <rect x={-44} y={-4} width={88} height={8} fill={WHITE} />
    <circle r={12} fill={WHITE} />
  </g>
);
const House: React.FC<{roof: string}> = ({roof}) => (
  <g>
    <rect x={-80} y={-40} width={160} height={120} fill={NAVY} />
    <path d="M -105 -35 L 0 -125 L 105 -35 Z" fill={roof} />
    <rect x={-22} y={20} width={44} height={60} fill={WHITE} />
  </g>
);
// years as objects
const Slab = () => (
  <g>
    <path d="M -175 -95 Q -150 -125 -60 -118 L 150 -112 Q 185 -100 178 -60 L 172 95 L -168 98 Z" fill={MUTED} />
    <text x={0} y={22} textAnchor="middle" fontFamily="Inter" fontWeight={800} fontSize={74} letterSpacing="-2" fill={NAVY}>2700</text>
    <text x={0} y={70} textAnchor="middle" fontFamily="Inter" fontWeight={800} fontSize={30} letterSpacing="8" fill={NAVY}>BCE</text>
  </g>
);
const HangingSign = () => (
  <g>
    <rect x={-170} y={-150} width={240} height={14} fill={DEEP} />
    <rect x={-176} y={-150} width={14} height={300} fill={DEEP} />
    <line x1={-110} y1={-136} x2={-110} y2={-88} stroke={DEEP} strokeWidth={5} />
    <line x1={40} y1={-136} x2={40} y2={-88} stroke={DEEP} strokeWidth={5} />
    <rect x={-150} y={-90} width={230} height={130} rx={10} fill={NAVY} />
    <text x={-35} y={-2} textAnchor="middle" fontFamily="Inter" fontWeight={800} fontSize={76} fill={WHITE}>1266</text>
  </g>
);
const PostSign = () => (
  <g>
    <rect x={-9} y={-40} width={18} height={330} fill={DEEP} />
    <rect x={-135} y={-120} width={270} height={110} rx={16} fill={colors.teal} />
    <rect x={-122} y={-107} width={244} height={84} rx={10} fill="none" stroke={NAVY} strokeWidth={5} />
    <text x={0} y={-38} textAnchor="middle" fontFamily="Inter" fontWeight={800} fontSize={66} fill={NAVY}>1876</text>
  </g>
);
// a hand-drawn arrow / circle that draws itself on
const Scribble: React.FC<{d: string; p: number; w?: number}> = ({d, p, w = 7}) => (
  <path d={d} pathLength={1} fill="none" stroke={INK} strokeWidth={w} strokeLinecap="round" strokeLinejoin="round"
    strokeDasharray="1 1" strokeDashoffset={1 - p} opacity={p > 0 ? 0.9 : 0} />
);

export const PaperLight: React.FC = () => {
  const f = useCurrentFrame();
  const boil = Math.floor(f / 4) % 6;
  const cam = camAt(f);
  const vel = Math.abs(cam - camAt(Math.max(0, f - 1)));
  const blur = Math.min(vel * 0.22, 26);

  // panel position: fg moves 1:1, bg moves 0.72 (parallax)
  const fg = (k: number) => k * H - cam;
  const bg = (k: number) => (k * H - cam) * 0.72;

  // wagon
  const wx = f < s(19.4) ? 640 : tw(f, 19.4, 23.6, 640, 1450, inOut);
  const wheelRot = (wx / (2 * Math.PI * 48)) * 360;
  const bump = f > s(19.4) && f < s(23.6) ? -Math.abs(Math.sin(f / 3)) * 6 : 0;

  // ---------- the mark (screen space) ----------
  let mx = 1210, my = 520, ms = 1;
  const hover = {x: 960, y: 400};
  const sway = (k: number) => Math.sin(f / 9 + k) * 10;
  if (f < s(1.2)) { ms = 0; }
  else if (f < s(4.6)) { mx = tw(f, 1.2, 2.0, 2000, 1210); my = tw(f, 1.2, 2.0, -120, 520, Easing.out(Easing.back(1.6))); }
  else if (f < s(7.0)) { mx = tw(f, 4.6, 5.2, 1210, hover.x, inOut) + sway(1); my = tw(f, 4.6, 5.2, 520, hover.y, inOut); ms = tw(f, 4.6, 5.2, 1, 1.15); }
  else if (f < s(11.2)) { mx = tw(f, 7.0, 7.5, hover.x, 1170); my = tw(f, 7.0, 7.5, hover.y, 630, drop); ms = tw(f, 7.0, 7.5, 1.15, 0.9); }
  else if (f < s(13.0)) { mx = tw(f, 11.2, 11.6, 1170, hover.x, inOut) + sway(2); my = tw(f, 11.2, 11.6, 630, hover.y, inOut); ms = tw(f, 11.2, 11.6, 0.9, 1.15); }
  else if (f < s(17.0)) { mx = tw(f, 13.0, 13.4, hover.x, 1250); my = tw(f, 13.0, 13.4, hover.y, 585, drop); ms = tw(f, 13.0, 13.4, 1.15, 1); }
  else if (f < s(18.6)) { mx = tw(f, 17.0, 17.4, 1250, hover.x, inOut) + sway(3); my = tw(f, 17.0, 17.4, 585, hover.y, inOut); ms = 1.1; }
  else if (f < s(24.0)) {
    if (f < s(19.1)) { mx = tw(f, 18.6, 19.1, hover.x, 640); my = tw(f, 18.6, 19.1, hover.y, 650, drop); }
    else { mx = wx; my = 650 + bump; }
    ms = 0.9;
  }
  else if (f < s(25.8)) { mx = tw(f, 24.0, 24.4, 1450, hover.x, inOut) + sway(4); my = tw(f, 24.0, 24.4, 650, hover.y, inOut); ms = 1.1; }
  else if (f < s(28.8)) { mx = tw(f, 25.8, 26.3, hover.x, 1210); my = tw(f, 25.8, 26.3, hover.y, 520, drop); ms = tw(f, 25.8, 26.3, 1.1, 1); }
  else { mx = tw(f, 28.8, 29.8, 1210, 960, inOut); my = tw(f, 28.8, 29.8, 520, 540, inOut); ms = tw(f, 28.8, 29.8, 1, 0, Easing.in(Easing.back(2.2))); }
  let squash = 0;
  for (const L of [2.0, 7.5, 13.4, 19.1, 26.3]) {
    if (f >= s(L) && f < s(L + 0.5)) squash = Math.sin(((f - s(L)) / s(0.5)) * Math.PI) * Math.exp(-(f - s(L)) / 8) * 0.28;
  }
  const markRot = jit(f, 1, 6) + (f < s(2) ? tw(f, 1.2, 2.0, -200, 0) : 0);

  // today scene
  const shirtIn = tw(f, 0.2, 1.0, -700, 0, Easing.out(Easing.back(1.1)));
  const tagDrop = tw(f, 2.2, 2.7, -300, 0, Easing.out(Easing.back(1.8)));
  const flip = tw(f, 3.0, 3.5, 0, 1, inOut);
  const puff = tw(f, 7.5, 8.5, 0, 1);
  const loafSquash = f >= s(13.4) && f < s(13.9) ? Math.sin(((f - s(13.4)) / s(0.5)) * Math.PI) * 0.12 : 0;

  const g = (x: number, y: number, rot: number, sc = 1, sx = 1, sy = 1) => `translate(${x},${y}) rotate(${rot}) scale(${sc * sx},${sc * sy})`;
  const show = (k: number) => Math.abs(fg(k)) < H * 1.05;

  return (
    <AbsoluteFill style={{background: WHITE}}>
      {f < s(STORY) ? (
        <svg width={1920} height={1080} viewBox="0 0 1920 1080" style={{position: 'absolute'}}>
          <defs>
            <filter id="cut" x="-25%" y="-25%" width="150%" height="170%">
              <feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves={2} seed={boil} result="n" />
              <feDisplacementMap in="SourceGraphic" in2="n" scale={4} xChannelSelector="R" yChannelSelector="G" result="d" />
              <feMorphology in="d" operator="dilate" radius={8} result="dil" />
              <feFlood floodColor={WHITE} result="w" />
              <feComposite in="w" in2="dil" operator="in" result="border" />
              <feDisplacementMap in="border" in2="n" scale={9} xChannelSelector="G" yChannelSelector="R" result="border2" />
              <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves={2} seed={3} result="grain" />
              <feColorMatrix in="grain" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.12 0" result="ga" />
              <feComposite in="ga" in2="d" operator="in" result="gd" />
              <feMerge result="sticker"><feMergeNode in="border2" /><feMergeNode in="d" /><feMergeNode in="gd" /></feMerge>
              <feDropShadow in="sticker" dx={0} dy={9} stdDeviation={7} floodColor={NAVY} floodOpacity={0.24} />
            </filter>
            <filter id="flat" x="-10%" y="-10%" width="120%" height="130%">
              <feTurbulence type="fractalNoise" baseFrequency="0.02" numOctaves={2} seed={boil} result="n" />
              <feDisplacementMap in="SourceGraphic" in2="n" scale={5} xChannelSelector="R" yChannelSelector="G" result="d" />
              <feDropShadow in="d" dx={0} dy={5} stdDeviation={4} floodColor={NAVY} floodOpacity={0.14} />
            </filter>
            <filter id="bggrain">
              <feTurbulence type="fractalNoise" baseFrequency="0.7" numOctaves={3} seed={7} />
              <feColorMatrix type="matrix" values="0 0 0 0 0.04  0 0 0 0 0.1  0 0 0 0 0.36  0 0 0 0.06 0" />
            </filter>
            {[0, 1, 2, 3].map((k) => <clipPath key={k} id={`clip${k}`}><rect x={0} y={fg(k)} width={1920} height={H} /></clipPath>)}
            <filter id="mblur" x="-5%" y="-20%" width="110%" height="140%"><feGaussianBlur stdDeviation={`0 ${blur}`} /></filter>
          </defs>
          <rect width={1920} height={1080} filter="url(#bggrain)" />

          <g filter={blur > 0.5 ? 'url(#mblur)' : undefined}>
            {/* ===== 2700 BCE ===== */}
            {show(0) ? (
              <>
                <g clipPath="url(#clip0)"><g transform={`translate(0,${bg(0)})`}>
                  <circle cx={560} cy={250} r={72} fill={colors.teal} opacity={0.85} filter="url(#flat)" />
                  <path d="M 120 860 L 380 430 L 640 860 Z" fill={NAVY} filter="url(#flat)" />
                  <path d="M 380 430 L 640 860 L 470 860 Z" fill={DEEP} opacity={0.9} />
                  <path d="M 0 840 Q 400 760 820 840 Q 1300 920 1920 820 L 1920 1080 L 0 1080 Z" fill={MUTED} opacity={0.45} filter="url(#flat)" />
                </g></g>
                <g clipPath="url(#clip0)"><g transform={`translate(0,${fg(0)})`}>
                  <g transform={g(470, 720, -4 + jit(f, 61, 1))} filter="url(#cut)"><Slab /></g>
                  <g transform={g(1250, 660, jit(f, 21, 1.2))} filter="url(#cut)"><Cow /></g>
                  {[0, 1, 2].map((i) => (
                    <circle key={i} cx={1170 + (i - 1) * 46} cy={590 - puff * (120 + i * 30)} r={18 + puff * 26} fill={MUTED}
                      opacity={f >= s(7.5) && f < s(11.2) ? (1 - puff) * 0.9 : 0} filter="url(#flat)" />
                  ))}
                  <Scribble d="M 1060 560 C 1020 600 1050 690 1150 700 C 1260 705 1290 620 1240 575 C 1195 535 1100 545 1080 575" p={tw(f, 8.3, 9.1, 0, 1, inOut)} />
                </g></g>
              </>
            ) : null}

            {/* ===== 1266 ===== */}
            {show(1) ? (
              <>
                <g clipPath="url(#clip1)"><g transform={`translate(0,${bg(1)})`}>
                  <path d="M 0 800 L 1920 800 L 1920 1080 L 0 1080 Z" fill={MUTED} opacity={0.35} />
                  {Array.from({length: 22}, (_, i) => <rect key={i} x={20 + i * 88} y={830 + (i % 2) * 40} width={64} height={26} rx={10} fill={MUTED} opacity={0.6} />)}
                  <g filter="url(#flat)">
                    <rect x={960} y={330} width={14} height={400} fill={DEEP} />
                    <rect x={1546} y={330} width={14} height={400} fill={DEEP} />
                    {Array.from({length: 8}, (_, i) => (
                      <path key={i} d={`M ${940 + i * 80} 320 L ${1020 + i * 80} 320 L ${1020 + i * 80} 400 Q ${980 + i * 80} 440 ${940 + i * 80} 400 Z`} fill={i % 2 ? WHITE : colors.teal} />
                    ))}
                  </g>
                </g></g>
                <g clipPath="url(#clip1)"><g transform={`translate(0,${fg(1)})`}>
                  <rect x={930} y={720} width={650} height={90} rx={8} fill={NAVY} filter="url(#flat)" />
                  <g transform={g(470, 470, Math.sin(f / 10) * 2.5)} filter="url(#cut)"><HangingSign /></g>
                  <g transform={g(1250, 650, jit(f, 31, 1.2), 1, 1 + loafSquash, 1 - loafSquash)} filter="url(#cut)"><Loaf /></g>
                  <Scribble d="M 1620 300 C 1560 320 1470 400 1330 520" p={tw(f, 14.0, 14.7, 0, 1, inOut)} />
                  <Scribble d="M 1330 520 L 1372 522 M 1330 520 L 1338 480" p={tw(f, 14.7, 14.9, 0, 1)} />
                </g></g>
              </>
            ) : null}

            {/* ===== 1876 ===== */}
            {show(2) ? (
              <>
                <g clipPath="url(#clip2)"><g transform={`translate(0,${bg(2)})`}>
                  <path d="M 0 740 Q 300 600 640 700 Q 980 800 1300 670 Q 1600 560 1920 680 L 1920 1080 L 0 1080 Z" fill={colors.teal} opacity={0.3} filter="url(#flat)" />
                </g></g>
                <g clipPath="url(#clip2)"><g transform={`translate(0,${fg(2)})`}>
                  <g transform={g(180, 640, jit(f, 41, 1.2))} filter="url(#cut)"><House roof={colors.teal} /></g>
                  <g transform={g(1780, 620, jit(f, 42, 1.2))} filter="url(#cut)"><House roof={colors.pink} /></g>
                  <g transform={g(430, 520, -3 + jit(f, 43, 0.8))} filter="url(#cut)"><PostSign /></g>
                  <path d="M 0 860 Q 480 790 960 840 Q 1440 890 1920 820 L 1920 1080 L 0 1080 Z" fill={colors.teal} opacity={0.55} filter="url(#flat)" />
                  <path d="M 80 805 L 1840 805" stroke={NAVY} strokeWidth={6} strokeDasharray="22 26" opacity={0.35} />
                  <g transform={g(wx, 700 + bump, jit(f, 51, 1))} filter="url(#cut)">
                    <rect x={-150} y={110} width={300} height={34} rx={8} fill={MUTED} />
                    <g transform="translate(0,-10)"><Cask /></g>
                    <g transform="translate(-95,160)"><Wheel rot={wheelRot} /></g>
                    <g transform="translate(95,160)"><Wheel rot={wheelRot} /></g>
                  </g>
                  <Scribble d="M 300 930 C 700 990 1200 990 1640 930" p={tw(f, 19.6, 23.4, 0, 1, inOut)} w={6} />
                  <Scribble d="M 1640 930 L 1600 908 M 1640 930 L 1606 956" p={tw(f, 23.4, 23.6, 0, 1)} w={6} />
                </g></g>
              </>
            ) : null}

            {/* ===== today ===== */}
            {show(3) ? (
              <>
                <g clipPath="url(#clip3)"><g transform={`translate(0,${bg(3)})`}>
                  <rect x={0} y={880} width={1920} height={200} fill={MUTED} opacity={0.25} />
                  <rect x={0} y={876} width={1920} height={8} fill={NAVY} opacity={0.5} />
                </g></g>
                <g clipPath="url(#clip3)"><g transform={`translate(0,${fg(3) + shirtIn})`}>
                  <rect x={500} y={300} width={920} height={14} rx={7} fill={DEEP} filter="url(#flat)" />
                  <path d="M 710 314 L 710 380 M 1210 314 L 1210 380" stroke={DEEP} strokeWidth={6} />
                  <g transform={g(710, 560, -2 + jit(f, 11, 1.2))} filter="url(#cut)"><Shirt /></g>
                  <g transform={g(1210, 560, 2 + jit(f, 12, 1.2))} filter="url(#cut)"><Shirt /></g>
                  <g transform={g(710, 800 + tagDrop, -4 + Math.sin(f / 6) * 2)} filter="url(#cut)"><Tag label="$20" /></g>
                  <g transform={g(1210, 800 + tagDrop, 3 + Math.sin(f / 6 + 1) * 2, 1, 1, Math.max(0.04, Math.abs(Math.cos(Math.PI * flip))))} filter="url(#cut)">
                    <Tag label={flip > 0.5 ? '$40' : '$20'} />
                  </g>
                  <Scribble d="M 1560 160 C 1520 300 1440 420 1290 500" p={tw(f, 2.4, 3.0, 0, 1, inOut) * tw(f, 4.4, 4.6, 1, 0)} />
                  <Scribble d="M 1290 500 L 1332 502 M 1290 500 L 1302 462" p={tw(f, 3.0, 3.2, 0, 1) * tw(f, 4.4, 4.6, 1, 0)} />
                  <Scribble d="M 1120 430 C 1080 470 1100 580 1210 590 C 1320 595 1340 500 1290 460 C 1250 425 1160 430 1140 455" p={tw(f, 26.6, 27.5, 0, 1, inOut) * tw(f, 28.6, 28.8, 1, 0)} />
                </g></g>
              </>
            ) : null}
          </g>

          {/* scroll ruler: where we are in time */}
          <g opacity={0.85}>
            <line x1={1852} y1={150} x2={1852} y2={930} stroke={NAVY} strokeWidth={4} strokeLinecap="round" opacity={0.25} />
            {[0, 1, 2, 3].map((k) => <circle key={k} cx={1852} cy={150 + (k / 3) * 780} r={7} fill={NAVY} opacity={0.35} />)}
            <circle cx={1852} cy={150 + (cam / (3 * H)) * 780} r={14} fill={colors.pink} />
          </g>

          {/* the mark: one thread through every era */}
          {ms > 0.01 ? (
            <g transform={g(mx, my, markRot, ms, 1 + squash, 1 - squash)} filter="url(#cut)"><Mark /></g>
          ) : null}
        </svg>
      ) : null}
      <Sequence from={s(STORY)}><EndCardLight /></Sequence>
    </AbsoluteFill>
  );
};
