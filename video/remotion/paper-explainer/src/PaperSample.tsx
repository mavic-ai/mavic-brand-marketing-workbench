import React from 'react';
import {AbsoluteFill, Easing, interpolate, Sequence, useCurrentFrame} from 'remotion';
import {colors, easeOut, stageBackground, type} from './brand';
import {EndCard} from './EndCard';

const FPS = 30;
const s = (x: number) => Math.round(x * FPS);
export const STORY = 30;
export const TOTAL = s(STORY + 12);
const C = {extrapolateLeft: 'clamp' as const, extrapolateRight: 'clamp' as const};
const tw = (f: number, a: number, b: number, from: number, to: number, e: (t: number) => number = easeOut) =>
  interpolate(f, [s(a), s(b)], [from, to], {...C, easing: e});
const inOut = Easing.bezier(0.65, 0, 0.35, 1);
const drop = Easing.bezier(0.5, 0, 0.75, 0);
const hash = (n: number) => {const x = Math.sin(n * 12.9898) * 43758.5453; return x - Math.floor(x);};
// stop-motion wobble: changes every 3 frames
const jit = (f: number, seed: number, amt = 1) => (hash(Math.floor(f / 3) * 7.13 + seed * 3.7) - 0.5) * amt;
const PAPER = colors.white;
const SHADE = colors.muted;
const INK = colors.panelInk;

// ---------- paper shapes (drawn around 0,0) ----------
const Shirt: React.FC = () => (
  <path d="M -150 -130 L -55 -165 Q 0 -120 55 -165 L 150 -130 L 215 -45 L 140 -5 L 140 165 L -140 165 L -140 -5 L -215 -45 Z" fill={PAPER} />
);
const Tag: React.FC<{label: string}> = ({label}) => (
  <g>
    <path d="M -70 -36 L 50 -36 L 78 0 L 50 36 L -70 36 Z" fill={colors.teal} />
    <circle cx={46} cy={0} r={7} fill={colors.stageTop} />
    <text x={-14} y={14} textAnchor="middle" fontFamily="Inter" fontWeight={800} fontSize={38} fill={INK}>{label}</text>
  </g>
);
const Mark: React.FC = () => (
  <g>
    <circle r={50} fill={colors.pink} />
    <circle r={34} fill="none" stroke={colors.pinkDeep} strokeWidth={7} />
    <path d="M -14 -16 L 0 14 L 14 -16" fill="none" stroke={PAPER} strokeWidth={8} strokeLinecap="round" strokeLinejoin="round" />
  </g>
);
const Cow: React.FC = () => (
  <g>
    <rect x={-120} y={70} width={34} height={120} rx={8} fill={SHADE} />
    <rect x={95} y={70} width={34} height={120} rx={8} fill={SHADE} />
    <path d="M -230 -20 Q -275 30 -255 95" fill="none" stroke={PAPER} strokeWidth={12} strokeLinecap="round" />
    <rect x={-235} y={-85} width={400} height={190} rx={70} fill={PAPER} />
    <path d="M -170 -60 Q -120 -95 -80 -55 Q -60 -10 -120 0 Q -175 -5 -170 -60 Z" fill={INK} opacity={0.85} />
    <path d="M 40 40 Q 90 20 110 60 Q 95 100 50 92 Q 20 75 40 40 Z" fill={INK} opacity={0.85} />
    <rect x={-160} y={80} width={34} height={115} rx={8} fill={PAPER} />
    <rect x={55} y={80} width={34} height={115} rx={8} fill={PAPER} />
    <rect x={150} y={-150} width={135} height={150} rx={46} fill={PAPER} />
    <path d="M 160 -140 Q 130 -190 150 -205" fill="none" stroke={SHADE} strokeWidth={14} strokeLinecap="round" />
    <path d="M 275 -140 Q 305 -190 285 -205" fill="none" stroke={SHADE} strokeWidth={14} strokeLinecap="round" />
    <ellipse cx={218} cy={-25} rx={56} ry={30} fill={SHADE} />
    <circle cx={190} cy={-95} r={8} fill={INK} />
    <circle cx={246} cy={-95} r={8} fill={INK} />
  </g>
);
const Loaf: React.FC = () => (
  <g>
    <path d="M -200 70 Q -225 -50 -120 -95 Q 0 -145 120 -95 Q 225 -50 200 70 Q 0 95 -200 70 Z" fill={PAPER} />
    <path d="M -110 -60 Q -95 -25 -80 0 M -30 -80 Q -15 -45 0 -20 M 50 -78 Q 65 -45 80 -20" fill="none" stroke={SHADE} strokeWidth={10} strokeLinecap="round" />
  </g>
);
const Cask: React.FC = () => (
  <g>
    <path d="M -95 -120 Q -125 0 -95 120 L 95 120 Q 125 0 95 -120 Z" fill={PAPER} />
    <rect x={-112} y={-78} width={224} height={16} fill={colors.teal} />
    <rect x={-112} y={62} width={224} height={16} fill={colors.teal} />
  </g>
);
const Wheel: React.FC<{rot: number}> = ({rot}) => (
  <g transform={`rotate(${rot})`}>
    <circle r={48} fill={SHADE} />
    <circle r={14} fill={INK} />
    <rect x={-4} y={-46} width={8} height={92} fill={INK} />
    <rect x={-46} y={-4} width={92} height={8} fill={INK} />
  </g>
);
const House: React.FC<{roof: string}> = ({roof}) => (
  <g>
    <rect x={-80} y={-40} width={160} height={120} fill={PAPER} />
    <path d="M -105 -35 L 0 -125 L 105 -35 Z" fill={roof} />
    <rect x={-22} y={20} width={44} height={60} fill={colors.stageTop} />
  </g>
);

// ---------- text ----------
const Line: React.FC<{f: number; at: number; out: number; color?: string; size: number; weight?: number; eyebrow?: boolean; children: React.ReactNode}> =
  ({f, at, out, color = colors.white, size, weight, eyebrow, children}) => {
  const a = tw(f, at, at + 0.5, 0, 1) * tw(f, out, out + 0.35, 1, 0);
  const st = eyebrow ? type.eyebrow : type.headline;
  return (
    <div style={{...st, fontWeight: weight ?? (st as any).fontWeight, color, fontSize: size, opacity: a,
      transform: `translateY(${(1 - tw(f, at, at + 0.5, 0, 1)) * 24}px) rotate(${jit(f, size + at, 0.6)}deg)`,
      textShadow: eyebrow ? 'none' : '0 6px 0 rgba(0,0,0,0.35)', marginBottom: eyebrow ? 22 : 10}}>
      {children}
    </div>
  );
};
const TextBlock: React.FC<{children: React.ReactNode; centered?: boolean; width?: number}> = ({children, centered, width = 760}) => (
  <div style={{position: 'absolute', left: centered ? 0 : 115, right: centered ? 0 : undefined, top: centered ? 640 : 150, width: centered ? undefined : width,
    textAlign: centered ? 'center' : 'left'}}>{children}</div>
);

export const PaperSample: React.FC = () => {
  const f = useCurrentFrame();
  const boil = Math.floor(f / 4) % 6;

  // ---- mark path through every scene (the continuity thread) ----
  let mx = 0, my = 0, ms = 1;
  if (f < s(4.6)) {
    mx = tw(f, 1.2, 2.0, 2000, 1530);
    my = tw(f, 1.2, 2.0, -120, 515, Easing.out(Easing.back(1.6)));
  } else if (f < s(6.3)) {
    mx = tw(f, 4.6, 5.6, 1530, 1250, inOut); my = tw(f, 4.6, 5.6, 515, 300, inOut); ms = tw(f, 4.6, 5.6, 1, 1.15, inOut);
  } else if (f < s(10.8)) {
    mx = tw(f, 6.3, 6.8, 1250, 1170); my = tw(f, 6.3, 6.8, 300, 600, drop); ms = tw(f, 6.3, 6.8, 1.15, 0.9, drop);
  } else if (f < s(12.4)) {
    mx = tw(f, 10.8, 11.6, 1170, 1250, inOut); my = tw(f, 10.8, 11.6, 600, 300, inOut); ms = tw(f, 10.8, 11.6, 0.9, 1.15, inOut);
  } else if (f < s(16.8)) {
    mx = 1250; my = tw(f, 12.4, 12.8, 300, 585, drop); ms = tw(f, 12.4, 12.8, 1.15, 1, drop);
  } else if (f < s(18.4)) {
    mx = tw(f, 16.8, 17.8, 1250, 560, inOut); my = tw(f, 16.8, 17.8, 585, 300, inOut) - Math.sin(tw(f, 16.8, 17.8, 0, Math.PI, inOut)) * 80;
  }
  // wagon
  const wx = f < s(19.2) ? tw(f, 17.6, 18.5, -350, 560) : f < s(24) ? tw(f, 19.2, 23.8, 560, 1480, inOut) : tw(f, 24.0, 25.0, 1480, 2400, Easing.in(Easing.cubic));
  const wy = 690;
  if (f >= s(18.4) && f < s(24.0)) {
    if (f < s(18.9)) {mx = tw(f, 18.4, 18.9, 560, wx); my = tw(f, 18.4, 18.9, 300, wy - 40, drop);} else {mx = wx; my = wy - 40;}
    ms = 0.9;
  } else if (f >= s(24.0)) {
    mx = tw(f, 24.0, 25.0, 1480, 960, inOut); my = tw(f, 24.0, 25.0, wy - 40, 330, inOut); ms = tw(f, 24.0, 25.0, 0.9, 2.1, inOut);
    if (f >= s(29.0)) {ms = tw(f, 29.0, 29.9, 2.1, 0, Easing.in(Easing.back(2))); my = tw(f, 29.0, 29.9, 330, 540, inOut);}
  }
  // landing squash
  const landings = [2.0, 6.8, 12.8, 18.9];
  let squash = 0;
  for (const L of landings) {if (f >= s(L) && f < s(L + 0.5)) squash = Math.sin(((f - s(L)) / s(0.5)) * Math.PI) * Math.exp(-(f - s(L)) / 8) * 0.28;}
  const markRot = jit(f, 1, 6) + (f < s(2) ? tw(f, 1.2, 2.0, -200, 0) : 0);

  // ---- scene 1: shirts ----
  const shirtY = tw(f, 0.2, 1.0, 1350, 590, Easing.out(Easing.back(1.1))) + tw(f, 4.6, 5.4, 0, 800, drop);
  const tagDrop = tw(f, 2.2, 2.7, -400, 0, Easing.out(Easing.back(1.8)));
  const flip = tw(f, 3.0, 3.5, 0, 1, inOut);
  const tagLabel = flip > 0.5 ? '$40' : '$20';
  // ---- scene 2: cow ----
  const cowX = tw(f, 5.4, 6.3, 2350, 1250, Easing.out(Easing.back(1.05))) + tw(f, 11.0, 11.8, 0, -1800, Easing.in(Easing.cubic));
  const puff = tw(f, 6.8, 7.8, 0, 1);
  // ---- scene 3: loaf ----
  const loafY = tw(f, 11.6, 12.4, 1350, 660, Easing.out(Easing.back(1.1))) + tw(f, 17.0, 17.8, 0, 800, drop);
  const loafSquash = f >= s(12.8) && f < s(13.3) ? Math.sin(((f - s(12.8)) / s(0.5)) * Math.PI) * 0.12 : 0;
  // ---- scene 4: hills and houses ----
  const hillY = tw(f, 17.4, 18.3, 500, 0, Easing.out(Easing.back(1.05))) + tw(f, 24.4, 25.2, 0, 600, drop);
  const wheelRot = (wx / (2 * Math.PI * 48)) * 360;
  const bump = f > s(19.2) && f < s(23.8) ? Math.abs(Math.sin(f / 3)) * -6 : 0;

  const g = (x: number, y: number, rot: number, sc = 1, sx = 1, sy = 1) => `translate(${x},${y}) rotate(${rot}) scale(${sc * sx},${sc * sy})`;

  return (
    <AbsoluteFill style={{background: stageBackground}}>
      {f < s(STORY) ? (
        <>
          <svg width={1920} height={1080} viewBox="0 0 1920 1080" style={{position: 'absolute'}}>
            <defs>
              <filter id="paper" x="-20%" y="-20%" width="140%" height="160%">
                <feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves={2} seed={boil} result="n" />
                <feDisplacementMap in="SourceGraphic" in2="n" scale={6} xChannelSelector="R" yChannelSelector="G" result="d" />
                <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves={2} seed={3} result="grain" />
                <feColorMatrix in="grain" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.10 0" result="ga" />
                <feComposite in="ga" in2="d" operator="in" result="gd" />
                <feMerge result="m"><feMergeNode in="d" /><feMergeNode in="gd" /></feMerge>
                <feDropShadow in="m" dx={0} dy={9} stdDeviation={1.5} floodColor="#000" floodOpacity={0.38} />
              </filter>
              <filter id="bggrain">
                <feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves={2} seed={7} />
                <feColorMatrix type="matrix" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.035 0" />
              </filter>
            </defs>
            <rect width={1920} height={1080} filter="url(#bggrain)" />

            {/* scene 4 background: layered paper hills, houses, road */}
            {f > s(17.2) && f < s(25.3) ? (
              <g transform={`translate(0,${hillY})`}>
                <path d="M 0 760 Q 300 620 640 720 Q 980 820 1300 690 Q 1600 580 1920 700 L 1920 1080 L 0 1080 Z" fill={colors.stageGlow} filter="url(#paper)" />
                <g transform={g(260, 640, jit(f, 41, 1.2))} filter="url(#paper)"><House roof={colors.teal} /></g>
                <g transform={g(1785, 620, jit(f, 42, 1.2))} filter="url(#paper)"><House roof={colors.pink} /></g>
                <path d="M 0 860 Q 480 790 960 840 Q 1440 890 1920 820 L 1920 1080 L 0 1080 Z" fill="#14247A" filter="url(#paper)" />
                <path d="M 120 802 L 1800 802" stroke={colors.muted} strokeWidth={6} strokeDasharray="22 26" opacity={0.6} />
                <text x={960} y={960} textAnchor="middle" fontFamily="Inter" fontWeight={700} fontSize={30} letterSpacing="0.2em" fill={colors.muted}
                  opacity={tw(f, 19.6, 20.2, 0, 1) * tw(f, 24.0, 24.4, 1, 0)}>MAKER  ·  HUNDREDS OF MILES  ·  BUYER</text>
              </g>
            ) : null}

            {/* scene 1: shirts and tags */}
            {f < s(5.5) ? (
              <>
                <g transform={g(1030, shirtY, -3 + jit(f, 11, 1.5) - tw(f, 4.6, 5.4, 0, 18))} filter="url(#paper)"><Shirt /></g>
                <g transform={g(1530, shirtY, 2 + jit(f, 12, 1.5) + tw(f, 4.6, 5.4, 0, 14))} filter="url(#paper)"><Shirt /></g>
                <g transform={g(1030, shirtY + 240 + tagDrop, -4 + Math.sin(f / 6) * 2)} filter="url(#paper)"><Tag label="$20" /></g>
                <g transform={g(1530, shirtY + 240 + tagDrop, 3 + Math.sin(f / 6 + 1) * 2, 1, 1, Math.max(0.04, Math.abs(Math.cos(Math.PI * flip))))} filter="url(#paper)"><Tag label={tagLabel} /></g>
              </>
            ) : null}

            {/* scene 2: cow and smoke */}
            {f > s(5.3) && f < s(11.9) ? (
              <>
                <g transform={g(cowX, 640, jit(f, 21, 1.2))} filter="url(#paper)"><Cow /></g>
                {[0, 1, 2].map((i) => (
                  <circle key={i} cx={1170 + (i - 1) * 46} cy={560 - puff * (120 + i * 30)} r={18 + puff * 26} fill={colors.muted}
                    opacity={f >= s(6.8) ? (1 - puff) * 0.8 : 0} filter="url(#paper)" />
                ))}
              </>
            ) : null}

            {/* scene 3: loaf */}
            {f > s(11.5) && f < s(17.9) ? (
              <g transform={g(1250, loafY, jit(f, 31, 1.2), 1, 1 + loafSquash, 1 - loafSquash)} filter="url(#paper)"><Loaf /></g>
            ) : null}

            {/* scene 4: wagon and cask */}
            {f > s(17.5) && f < s(25.1) ? (
              <g transform={g(wx, wy + bump, jit(f, 51, 1))} filter="url(#paper)">
                <rect x={-150} y={110} width={300} height={34} rx={8} fill={colors.muted} />
                <g transform="translate(0,-10)"><Cask /></g>
                <g transform="translate(-95,160)"><Wheel rot={wheelRot} /></g>
                <g transform="translate(95,160)"><Wheel rot={wheelRot} /></g>
              </g>
            ) : null}

            {/* the mark: the thread through every scene */}
            {f >= s(1.2) && ms > 0.01 ? (
              <g transform={g(mx, my, markRot, ms, 1 + squash, 1 - squash)} filter="url(#paper)"><Mark /></g>
            ) : null}
          </svg>

          {/* text */}
          <TextBlock>
            <Line f={f} at={0.5} out={4.6} size={88}>Same shirt.</Line>
            <Line f={f} at={1.3} out={4.6} size={88}>Different name.</Line>
            <Line f={f} at={3.3} out={4.6} size={88} color={colors.teal}>Double the price.</Line>
            <Line f={f} at={3.6} out={4.6} size={26} color={colors.muted} weight={600}>Illustrative</Line>
          </TextBlock>
          <TextBlock>
            <Line f={f} at={6.0} out={10.8} size={26} color={colors.pink} eyebrow>Around 2,700 BCE</Line>
            <Line f={f} at={6.3} out={10.8} size={120}>Brand.</Line>
            <Line f={f} at={7.0} out={10.8} size={56} color={colors.teal}>From the Old Norse brandr: to burn.</Line>
            <Line f={f} at={8.2} out={10.8} size={36} color={colors.muted} weight={600}>The first job: say who this belongs to.</Line>
          </TextBlock>
          <TextBlock>
            <Line f={f} at={12.6} out={16.8} size={26} color={colors.pink} eyebrow>1266, England</Line>
            <Line f={f} at={12.9} out={16.8} size={88}>A mark became</Line>
            <Line f={f} at={13.4} out={16.8} size={88} color={colors.teal}>a promise.</Line>
            <Line f={f} at={14.4} out={16.8} size={36} color={colors.muted} weight={600}>Short loaf? You could find the baker.</Line>
          </TextBlock>
          <TextBlock width={1300}>
            <Line f={f} at={18.6} out={24.0} size={26} color={colors.pink} eyebrow>1876, Britain</Line>
            <Line f={f} at={18.9} out={24.0} size={66}>When the maker is a stranger,</Line>
            <Line f={f} at={19.7} out={24.0} size={66} color={colors.teal}>the mark is all you have.</Line>
          </TextBlock>
          <TextBlock centered>
            <Line f={f} at={25.6} out={29.0} size={110}>A brand is a promise.</Line>
            <Line f={f} at={26.6} out={29.0} size={56} color={colors.teal}>Made distinctive. Kept consistently.</Line>
          </TextBlock>
          <div style={{position: 'absolute', right: 60, bottom: 40, ...type.eyebrow, fontSize: 18, color: colors.muted, opacity: 0.7}}>Sample · Episode 1A</div>
        </>
      ) : null}
      <Sequence from={s(STORY)}><EndCard /></Sequence>
    </AbsoluteFill>
  );
};
