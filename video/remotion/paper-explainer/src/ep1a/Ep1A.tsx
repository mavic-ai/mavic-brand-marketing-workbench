import React from 'react';
import {AbsoluteFill, Easing, staticFile, useCurrentFrame} from 'remotion';
import {easeOut} from '../brand';
import * as S from './shapes';
import {NAVY, DEEP, INK, WHITE, MUTED, PINK, PINKD, TEAL, TEALD, Print, Scribble} from './shapes';

const FPS = 30;
export const EP1A_SECONDS = 308;
export const EP1A_TOTAL = EP1A_SECONDS * FPS;
const W = 1920;
const H = 1080;

// ---------- timing helpers (seconds) ----------
type E = (x: number) => number;
const cl = (x: number, a = 0, b = 1) => Math.max(a, Math.min(b, x));
const inOut = Easing.bezier(0.65, 0, 0.35, 1);
const flick = Easing.bezier(0.15, 0.75, 0.15, 1);
const drop = Easing.bezier(0.5, 0, 0.75, 0);
const backOut = Easing.out(Easing.back(1.6));
const pop = Easing.out(Easing.back(1.8));
const backIn = Easing.in(Easing.back(2.2));
const tw = (t: number, a: number, b: number, from: number, to: number, e: E = easeOut) => from + (to - from) * e(cl((t - a) / (b - a)));
const on = (t: number, a: number, b: number) => tw(t, a, b, 0, 1, inOut);
const win = (t: number, a: number, b: number, c: number, d: number) => tw(t, a, b, 0, 1) * tw(t, c, d, 1, 0);
const pulse = (t: number, at: number, dur = 0.6) => (t >= at && t < at + dur ? Math.sin(((t - at) / dur) * Math.PI) : 0);
const hash = (n: number) => {const x = Math.sin(n * 12.9898) * 43758.5453; return x - Math.floor(x);};
const jit = (f: number, seed: number, amt = 1) => (hash(Math.floor(f / 3) * 7.13 + seed * 3.7) - 0.5) * amt;
const g = (x: number, y: number, rot = 0, sc = 1, sx = 1, sy = 1) => `translate(${x},${y}) rotate(${rot}) scale(${sc * sx},${sc * sy})`;

type K = {t: number; v: number; e?: E};
const keyed = (t: number, ks: K[]) => {
  if (t <= ks[0].t) return ks[0].v;
  for (let i = 0; i < ks.length - 1; i++) {
    const a = ks[i], b = ks[i + 1];
    if (t < b.t) {
      if (a.v === b.v) return a.v;
      return a.v + (b.v - a.v) * (b.e ?? inOut)((t - a.t) / (b.t - a.t));
    }
  }
  return ks[ks.length - 1].v;
};
const k = (t: number, v: number, e?: E): K => ({t, v, e});

// ---------- camera: scrolling through time ----------
// panels top to bottom: 0 ancient (3 screens wide), 1 1266, 2 1876, 3 1880s-1931, 4 2004/1899 (2 wide), 5 2014, 6 now, 7 the shop
const CAMY: K[] = [
  k(0, 7 * H), k(22.9, 7 * H), k(24.8, 0, flick),
  k(62.6, 0), k(64.0, H, flick),
  k(79.4, H), k(80.8, 2 * H, flick),
  k(111.6, 2 * H), k(113.0, 3 * H, flick),
  k(135.6, 3 * H), k(137.0, 4 * H, flick),
  k(171.4, 4 * H), k(172.8, 5 * H, flick),
  k(193.6, 5 * H), k(195.0, 6 * H, flick),
  // the rewind, then a step down through every mark
  k(235.0, 6 * H), k(237.2, 0, flick),
  k(239.6, 0), k(240.2, H, flick),
  k(241.3, H), k(241.9, 2 * H, flick),
  k(242.5, 2 * H), k(243.1, 5 * H, flick),
  k(243.6, 5 * H), k(244.1, 6 * H, flick),
];
const HX0: K[] = [k(0, 0), k(42.3, 0), k(43.3, W), k(46.0, W), k(47.0, 2 * W), k(235.9, 2 * W), k(236.0, 0, () => 1), k(238.6, 0), k(239.2, W)];
const HX4: K[] = [k(0, 0), k(159.2, 0), k(160.2, W)];

// ---------- the seal ----------
type MK = {t: number; x: number; y: number; s?: number; e?: E; land?: boolean; hov?: boolean};
const MKS: MK[] = [
  {t: 0, x: 2050, y: -150, s: 1}, {t: 1.2, x: 2050, y: -150},
  {t: 2.0, x: 1210, y: 520, e: backOut, land: true}, {t: 22.5, x: 1210, y: 520},
  {t: 23.0, x: 960, y: 400, s: 1.15, hov: true}, {t: 27.4, x: 960, y: 400, hov: true},
  {t: 28.1, x: 760, y: 600, s: 1.0, hov: true}, {t: 35.6, x: 760, y: 600, hov: true},
  {t: 36.2, x: 1250, y: 520, hov: true}, {t: 36.7, x: 1250, y: 735, s: 0.9, e: drop, land: true}, {t: 37.9, x: 1250, y: 735},
  {t: 38.4, x: 1250, y: 420, s: 1.1, hov: true}, {t: 42.0, x: 1250, y: 420, hov: true},
  {t: 42.8, x: 960, y: 380, hov: true}, {t: 43.7, x: 960, y: 380, hov: true},
  {t: 44.3, x: 1170, y: 630, s: 0.9, e: drop, land: true}, {t: 45.6, x: 1170, y: 630},
  {t: 46.0, x: 960, y: 380, s: 1.1, hov: true}, {t: 47.2, x: 960, y: 380, hov: true},
  {t: 47.7, x: 760, y: 715, s: 0.8, e: drop, land: true}, {t: 48.6, x: 760, y: 715},
  {t: 49.1, x: 1000, y: 380, s: 1.1, hov: true}, {t: 50.2, x: 1000, y: 380, hov: true},
  {t: 50.7, x: 1300, y: 540, s: 0.8, e: drop, land: true}, {t: 51.8, x: 1300, y: 540},
  {t: 52.3, x: 1300, y: 260, s: 1.0, hov: true}, {t: 62.1, x: 1300, y: 260, hov: true},
  {t: 62.6, x: 960, y: 380, s: 1.1, hov: true}, {t: 65.2, x: 960, y: 380, hov: true},
  {t: 65.8, x: 1250, y: 627, s: 0.85, e: drop, land: true}, {t: 67.0, x: 1250, y: 627},
  {t: 67.5, x: 1760, y: 340, s: 1.0, hov: true}, {t: 78.9, x: 1760, y: 340, hov: true},
  {t: 79.4, x: 960, y: 300, s: 1.1, hov: true}, {t: 89.8, x: 960, y: 300, hov: true},
  {t: 90.4, x: 840, y: 690, s: 0.9, e: drop, land: true}, {t: 95.4, x: 1450, y: 690},
  {t: 95.9, x: 960, y: 260, s: 1.1, hov: true}, {t: 98.7, x: 960, y: 260, hov: true},
  {t: 99.2, x: 720, y: 520, s: 0.8, e: drop, land: true}, {t: 100.2, x: 720, y: 520},
  {t: 100.7, x: 960, y: 260, s: 1.0, hov: true}, {t: 106.3, x: 960, y: 260, hov: true},
  {t: 106.8, x: 140, y: 290, s: 1.0}, {t: 108.3, x: 1780, y: 290}, {t: 109.0, x: 1780, y: 290},
  {t: 109.6, x: 720, y: 520, s: 0.8, land: true}, {t: 111.0, x: 720, y: 520},
  {t: 111.5, x: 960, y: 300, s: 1.1, hov: true}, {t: 117.8, x: 960, y: 300, hov: true},
  {t: 118.4, x: 830, y: 600, s: 0.8, e: drop, land: true}, {t: 119.6, x: 830, y: 600},
  {t: 120.1, x: 1180, y: 230, s: 1.0, hov: true}, {t: 135.1, x: 1180, y: 230, hov: true},
  {t: 135.6, x: 960, y: 330, s: 1.1, hov: true}, {t: 145.8, x: 880, y: 170, hov: true},
  {t: 146.4, x: 1180, y: 740, s: 0.7, e: drop, land: true}, {t: 147.6, x: 1180, y: 740},
  {t: 148.1, x: 880, y: 160, s: 1.0, hov: true}, {t: 158.8, x: 880, y: 160, hov: true},
  {t: 159.3, x: 960, y: 260, hov: true}, {t: 162.9, x: 960, y: 260, hov: true},
  {t: 163.5, x: 1090, y: 560, s: 0.6, e: drop, land: true}, {t: 164.6, x: 1090, y: 560},
  {t: 165.1, x: 1450, y: 230, s: 1.0, hov: true}, {t: 170.9, x: 1450, y: 230, hov: true},
  {t: 171.4, x: 960, y: 330, s: 1.1, hov: true}, {t: 172.9, x: 960, y: 330, hov: true},
  {t: 173.5, x: 960, y: 105, s: 0.9, hov: true}, {t: 188.4, x: 960, y: 105, hov: true},
  {t: 189.0, x: 1450, y: 440, s: 0.6, e: drop, land: true}, {t: 190.2, x: 1450, y: 440},
  {t: 190.7, x: 960, y: 105, s: 0.9, hov: true}, {t: 193.1, x: 960, y: 105, hov: true},
  {t: 194.4, x: 1450, y: 250, s: 1.0, hov: true}, {t: 198.0, x: 1450, y: 250, hov: true},
  {t: 198.6, x: 960, y: 600, s: 0.55, e: drop, land: true}, {t: 199.6, x: 960, y: 600},
  {t: 200.1, x: 1450, y: 190, s: 1.0, hov: true}, {t: 222.4, x: 1450, y: 190, hov: true},
  {t: 223.0, x: 1140, y: 200, s: 1.1, e: drop, land: true}, {t: 234.1, x: 1140, y: 200},
  {t: 234.5, x: 960, y: 140, s: 0.9, hov: true}, {t: 244.9, x: 960, y: 140, hov: true},
  {t: 245.9, x: 960, y: 540, s: 1.3}, {t: 269.3, x: 960, y: 540},
  {t: 270.1, x: 760, y: 790, s: 0.9, land: true}, {t: 277.3, x: 760, y: 790},
  {t: 277.9, x: 960, y: 110, s: 1.0, hov: true}, {t: 278.2, x: 960, y: 110},
  {t: 278.6, x: 960, y: 205, s: 0, e: drop}, {t: 287.3, x: 960, y: 440, s: 0},
  {t: 287.6, x: 960, y: 470, s: 1.0, e: pop}, {t: 288.3, x: 960, y: 540, s: 1.3},
  {t: 294.3, x: 960, y: 540}, {t: 295.0, x: 330, y: 175, s: 0.7, land: true},
  {t: 302.1, x: 330, y: 175}, {t: 302.6, x: 960, y: 540, s: 1.0}, {t: 303.1, x: 960, y: 540, s: 0, e: backIn},
];
for (let i = 1; i < MKS.length; i++) if (MKS[i].s === undefined) MKS[i].s = MKS[i - 1].s;

// wagon in 1876
const wagonX = (t: number) => tw(t, 90.9, 95.2, 840, 1450, inOut);
const wagonBump = (t: number) => (t > 90.9 && t < 95.2 ? -Math.abs(Math.sin(t * 10)) * 6 : 0);

const markAt = (t: number) => {
  if (t >= 90.4 && t < 95.4) return {x: wagonX(t), y: 690 + wagonBump(t), s: 0.9};
  let i = 0;
  while (i < MKS.length - 1 && t >= MKS[i + 1].t) i++;
  const a = MKS[i], b = MKS[Math.min(i + 1, MKS.length - 1)];
  if (a === b || t <= a.t) return {x: a.x, y: a.y, s: a.s as number};
  const p = (b.e ?? inOut)(cl((t - a.t) / (b.t - a.t)));
  let x = a.x + (b.x - a.x) * p, y = a.y + (b.y - a.y) * p;
  const s = (a.s as number) + ((b.s as number) - (a.s as number)) * p;
  if (a.hov && a.x === b.x && a.y === b.y) {
    const ramp = cl((t - a.t) / 0.4) * cl((b.t - t) / 0.4);
    x += Math.sin(t * 3.3) * 10 * ramp;
    y += Math.sin(t * 2.1 + 1) * 8 * ramp;
  }
  return {x, y, s};
};
const LANDS = MKS.filter((m) => m.land).map((m) => m.t);
const HOT: [number, number][] = [[28.3, 33.6], [43.2, 44.4]];

// rewind flashes (t at which each print pulses)
const FL = {clay: 238.2, cow: 239.3, loaf: 240.4, ledger: 242.0, card: 243.2, chat: 244.3};

const PanelG: React.FC<{n: number; hx?: number; cam: number; back?: React.ReactNode; front: React.ReactNode}> = ({n, hx = 0, cam, back, front}) => {
  const fgv = n * H - cam;
  if (Math.abs(fgv) >= H * 1.05) return null;
  return (
    <>
      <g clipPath={`url(#clip${n})`}><g transform={`translate(${-hx},${fgv * 0.72})`}>{back}</g></g>
      <g clipPath={`url(#clip${n})`}><g transform={`translate(${-hx},${fgv})`}>{front}</g></g>
    </>
  );
};

export const Ep1A: React.FC = () => {
  const f = useCurrentFrame();
  const t = f / FPS;
  const boil = Math.floor(f / 4) % 6;
  const cam = keyed(t, CAMY);
  const vy = Math.abs(cam - keyed(Math.max(0, t - 1 / FPS), CAMY));
  const hx0 = keyed(t, HX0), hx4 = keyed(t, HX4);
  const vx = Math.max(Math.abs(hx0 - keyed(Math.max(0, t - 1 / FPS), HX0)), Math.abs(hx4 - keyed(Math.max(0, t - 1 / FPS), HX4)));
  const by = Math.min(vy * 0.22, 26), bx = Math.min(vx * 0.22, 26);
  const fg = (n: number) => n * H - cam;
  const bg = (n: number) => (n * H - cam) * 0.72;
  const show = (n: number) => Math.abs(fg(n)) < H * 1.05;
  const fl = (at: number) => 1 + pulse(t, at, 0.6) * 0.45;
  const page = tw(t, 244.9, 245.9, H, 0, inOut); // the white page that ends the timeline
  const pageUp = t >= 244.9;

  // the seal
  const M = markAt(t);
  let squash = 0;
  for (const L of LANDS) if (t >= L && t < L + 0.5) squash = Math.sin(((t - L) / 0.5) * Math.PI) * Math.exp(-(t - L) * 3.6) * 0.28;
  const hot = HOT.reduce((acc, [a, b]) => Math.max(acc, win(t, a, a + 0.4, b - 0.4, b)), 0);
  const sealPulse = 1 + pulse(t, 265.0, 0.7) * 0.18;

  // panel wrappers
  const cut = 'url(#cut)';
  const flat = 'url(#flat)';

  // ===================== panel 7: the shop (today) =====================
  const shirtIn = tw(t, 0.2, 1.0, -700, 0, Easing.out(Easing.back(1.1)));
  const tagDrop = tw(t, 2.2, 2.7, -300, 0, pop);
  const flip = tw(t, 3.0, 3.5, 0, 1, inOut);
  const phoneIn = tw(t, 14.2, 14.9, 500, 0, backOut);
  const shop = (
    <PanelG cam={cam} n={7}
      back={<>
        <rect x={0} y={880} width={1920} height={200} fill={MUTED} opacity={0.25} />
        <rect x={0} y={876} width={1920} height={8} fill={NAVY} opacity={0.5} />
      </>}
      front={<g transform={`translate(0,${shirtIn})`}>
        <rect x={500} y={300} width={920} height={14} rx={7} fill={DEEP} filter={flat} />
        <path d="M 710 314 L 710 380 M 1210 314 L 1210 380" stroke={DEEP} strokeWidth={6} />
        <g transform={g(710, 560, -2 + jit(f, 11, 1.2))} filter={cut}><S.Shirt /></g>
        <g transform={g(1210, 560, 2 + jit(f, 12, 1.2))} filter={cut}><S.Shirt />{t >= 22.5 ? <Print x={0} y={-40} /> : null}</g>
        <g transform={g(710, 800 + tagDrop, -4 + Math.sin(t * 5) * 2)} filter={cut}><S.Tag coins={1} /></g>
        <g transform={g(1210, 800 + tagDrop, 3 + Math.sin(t * 5 + 1) * 2, 1, 1, Math.max(0.04, Math.abs(Math.cos(Math.PI * flip))))} filter={cut}>
          <S.Tag coins={flip > 0.5 ? 2 : 1} />
        </g>
        <Scribble d="M 1560 160 C 1520 300 1440 420 1290 500" p={on(t, 2.4, 3.0) * tw(t, 5.3, 5.6, 1, 0)} />
        <Scribble d="M 1290 500 L 1332 502 M 1290 500 L 1302 462" p={on(t, 3.0, 3.2) * tw(t, 5.3, 5.6, 1, 0)} />
        {/* why do we pay for that? */}
        <Scribble d="M 925 150 C 925 95 1005 85 1008 140 C 1010 182 962 188 962 236" p={on(t, 6.0, 6.8) * tw(t, 12.6, 13.0, 1, 0)} w={9} />
        <circle cx={962} cy={274} r={9} fill={INK} opacity={t > 6.8 ? 0.9 * tw(t, 12.6, 13.0, 1, 0) : 0} />
        {/* what AI is changing now */}
        <g transform={g(300, 790 + phoneIn, -6 + jit(f, 13, 1))} filter={cut}>
          <S.Phone>
            {[0, 1, 2].map((i) => <circle key={i} cx={-26 + i * 26} cy={Math.sin(t * 8 + i) * 5 * (t > 18.3 ? 1 : 0)} r={9} fill={i === 1 ? PINK : NAVY} opacity={t > 18.3 ? 1 : 0.25} />)}
          </S.Phone>
        </g>
      </g>}
    />
  );

  // ===================== panel 0: c. 2600 BCE, Egypt, Rome =====================
  const smoke = tw(t, 44.3, 45.5, 0, 1);
  const ancient = (
    <PanelG cam={cam} n={0} hx={hx0}
      back={<>
        <path d="M 0 840 Q 400 760 820 840 Q 1300 920 1920 820 Q 2400 760 2900 840 Q 3400 900 3840 820 Q 4400 760 5760 840 L 5760 1080 L 0 1080 Z" fill={MUTED} opacity={0.45} filter={flat} />
        <path d="M 0 905 Q 500 870 1000 905 Q 1500 940 1920 900" fill="none" stroke={TEAL} strokeWidth={22} opacity={0.5} />
        <circle cx={W + 560} cy={250} r={72} fill={TEAL} opacity={0.85} filter={flat} />
        <path d={`M ${W + 120} 860 L ${W + 380} 430 L ${W + 640} 860 Z`} fill={NAVY} filter={flat} />
        <path d={`M ${W + 380} 430 L ${W + 640} 860 L ${W + 470} 860 Z`} fill={DEEP} opacity={0.9} />
        {[0, 1, 2].map((i) => (
          <path key={i} d={`M ${2 * W + 1450 + i * 150} 860 L ${2 * W + 1450 + i * 150} 560 Q ${2 * W + 1515 + i * 150} 480 ${2 * W + 1580 + i * 150} 560 L ${2 * W + 1580 + i * 150} 860`}
            fill="none" stroke={MUTED} strokeWidth={26} opacity={0.6} />
        ))}
      </>}
      front={<>
        {/* the Indus Valley */}
        <g transform={g(330, 690, -4 + jit(f, 61, 1))} filter={cut}><S.Slab /></g>
        <g transform={g(760, 820, jit(f, 62, 1))} filter={cut}><S.Campfire t={t} /></g>
        <g transform={g(1250, 770, jit(f, 63, 1))} filter={cut}><S.Clay />{t >= 36.7 ? <Print x={0} y={-35} sc={0.5} k={fl(FL.clay)} /> : null}</g>
        {/* Egypt */}
        <g transform={g(W + 1250, 660, jit(f, 21, 1.2))} filter={cut}><S.Cow />{t >= 44.3 ? <Print x={-80} y={-30} sc={0.55} k={fl(FL.cow)} /> : null}</g>
        {[0, 1, 2].map((i) => (
          <circle key={i} cx={W + 1170 + (i - 1) * 46} cy={590 - smoke * (120 + i * 30)} r={18 + smoke * 26} fill={MUTED}
            opacity={t >= 44.3 && t < 45.6 ? (1 - smoke) * 0.9 : 0} filter={flat} />
        ))}
        <Scribble d={`M ${W + 1060} 560 C ${W + 1020} 600 ${W + 1050} 690 ${W + 1150} 700 C ${W + 1260} 705 ${W + 1290} 620 ${W + 1240} 575 C ${W + 1195} 535 ${W + 1100} 545 ${W + 1080} 575`}
          p={on(t, 44.8, 45.6) * tw(t, 46.0, 46.3, 1, 0)} />
        {/* Rome */}
        <g transform={g(2 * W + 420, 730, jit(f, 64, 1))} filter={cut}><S.Kiln /></g>
        <g transform={g(2 * W + 760, 860, jit(f, 65, 1))} filter={cut}><S.Bricks />{t >= 47.7 ? <Print x={0} y={-145} sc={0.42} /> : null}</g>
        <g transform={g(2 * W + 1300, 650, jit(f, 66, 1.2))} filter={cut}><S.Amphora />{t >= 50.7 ? <Print x={0} y={-110} sc={0.5} /> : null}</g>
        <g transform={g(2 * W + 1690, 760, jit(f, 67, 1), 1.1)} filter={cut}><S.Person /></g>
        <Scribble d={`M ${2 * W + 1380} 520 C ${2 * W + 1480} 470 ${2 * W + 1580} 560 ${2 * W + 1630} 640`} p={on(t, 55.5, 56.4)} />
        <Scribble d={`M ${2 * W + 1630} 640 L ${2 * W + 1596} 622 M ${2 * W + 1630} 640 L ${2 * W + 1632} 602`} p={on(t, 56.4, 56.6)} />
        <Scribble d={`M ${2 * W + 1220} 470 C ${2 * W + 1000} 400 ${2 * W + 700} 470 ${2 * W + 560} 600`} p={on(t, 57.6, 58.6)} />
        <Scribble d={`M ${2 * W + 560} 600 L ${2 * W + 568} 562 M ${2 * W + 560} 600 L ${2 * W + 598} 590`} p={on(t, 58.6, 58.8)} />
      </>}
    />
  );

  // ===================== panel 1: 1266 =====================
  const balIn = tw(t, 69.9, 70.4, 0, 1, pop);
  const tilt = tw(t, 71.4, 72.2, 0, 9, backOut);
  const piv = {x: 1300, y: 330}, L = 230;
  const ang = (tilt * Math.PI) / 180;
  const leftEnd = {x: piv.x - L * Math.cos(ang), y: piv.y - L * Math.sin(ang)};
  const rightEnd = {x: piv.x + L * Math.cos(ang), y: piv.y + L * Math.sin(ang)};
  const toPan = tw(t, 70.4, 71.0, 0, 1, inOut);
  const loafX = 1250 + (leftEnd.x - 1250) * toPan;
  const loafY = 650 + (leftEnd.y + 125 - 650) * toPan;
  const loafSc = 0.75 - 0.15 * toPan;
  const y1266 = (
    <PanelG cam={cam} n={1}
      back={<>
        <path d="M 0 800 L 1920 800 L 1920 1080 L 0 1080 Z" fill={MUTED} opacity={0.35} />
        {Array.from({length: 22}, (_, i) => <rect key={i} x={20 + i * 88} y={830 + (i % 2) * 40} width={64} height={26} rx={10} fill={MUTED} opacity={0.6} />)}
        <g filter={flat}>
          <rect x={860} y={160} width={14} height={570} fill={DEEP} />
          <rect x={1646} y={160} width={14} height={570} fill={DEEP} />
          {Array.from({length: 10}, (_, i) => (
            <path key={i} d={`M ${840 + i * 84} 150 L ${924 + i * 84} 150 L ${924 + i * 84} 220 Q ${882 + i * 84} 260 ${840 + i * 84} 220 Z`} fill={i % 2 ? WHITE : TEAL} />
          ))}
        </g>
      </>}
      front={<>
        <rect x={830} y={720} width={850} height={90} rx={8} fill={NAVY} filter={flat} />
        <g transform={g(470, 470, Math.sin(t * 3) * 2.5)} filter={cut}><S.HangingSign /></g>
        {balIn > 0.01 ? (
          <g filter={cut}>
            <g transform={`translate(${piv.x},${piv.y}) scale(${balIn})`}>
              <rect x={-10} y={0} width={20} height={390} fill={DEEP} />
              <rect x={-70} y={380} width={140} height={20} rx={8} fill={DEEP} />
              <rect x={-L - 10} y={-8} width={2 * L + 20} height={16} rx={8} fill={DEEP} transform={`rotate(${tilt})`} />
              <circle r={16} fill={TEAL} />
            </g>
            {[leftEnd, rightEnd].map((e, i) => (
              <g key={i} transform={`translate(${piv.x + (e.x - piv.x) * balIn},${piv.y + (e.y - piv.y) * balIn}) scale(${balIn})`}>
                <path d="M 0 0 L -70 160 M 0 0 L 70 160" stroke={DEEP} strokeWidth={4} />
                <path d="M -95 160 L 95 160 Q 80 195 0 195 Q -80 195 -95 160 Z" fill={TEAL} />
                {i === 1 ? <rect x={-38} y={96} width={76} height={64} rx={8} fill={DEEP} /> : null}
              </g>
            ))}
          </g>
        ) : null}
        <g transform={g(loafX, loafY, jit(f, 31, 1.2), loafSc)} filter={cut}><S.Loaf />{t >= 65.8 ? <Print x={0} y={-30} sc={0.8} k={fl(FL.loaf)} /> : null}</g>
        <Scribble d="M 1000 440 C 920 380 800 380 690 430" p={on(t, 73.5, 74.4)} />
        <Scribble d="M 690 430 L 722 404 M 690 430 L 728 444" p={on(t, 74.4, 74.6)} />
        <Scribble d={`M ${loafX - 150} ${loafY - 40} C ${loafX - 170} ${loafY + 60} ${loafX + 60} ${loafY + 90} ${loafX + 150} ${loafY + 20} C ${loafX + 200} ${loafY - 60} ${loafX + 40} ${loafY - 130} ${loafX - 110} ${loafY - 80}`}
          p={on(t, 76.0, 77.0) * tw(t, 79.0, 79.3, 1, 0)} />
      </>}
    />
  );

  // ===================== panel 2: 1876 =====================
  const wx = wagonX(t);
  const wheelRot = (wx / (2 * Math.PI * 48)) * 360;
  const gap = tw(t, 83.0, 83.6, 0, 0.26, inOut);
  const ledgerY = tw(t, 96.0, 96.8, 900, 0, backOut);
  const sketchO = (i: number) => tw(t, 103.0 + i * 0.35, 103.5 + i * 0.35, 0, 0.85);
  const wipeX = t < 106.8 ? 0 : t < 108.3 ? markAt(t).x : 1920;
  const y1876 = (
    <PanelG cam={cam} n={2}
      back={<path d="M 0 740 Q 300 600 640 700 Q 980 800 1300 670 Q 1600 560 1920 680 L 1920 1080 L 0 1080 Z" fill={TEAL} opacity={0.3} filter={flat} />}
      front={<>
        <g transform={g(150, 620, jit(f, 40, 1.2))} filter={cut}><S.Factory /></g>
        {[0, 1, 2].map((i) => (
          <circle key={i} cx={208 + Math.sin(t * 2 + i) * 10} cy={410 - ((t * 40 + i * 50) % 150)} r={20 + ((t * 40 + i * 50) % 150) / 8} fill={MUTED}
            opacity={0.6 * (1 - ((t * 40 + i * 50) % 150) / 150)} />
        ))}
        <g transform={g(350, 640, jit(f, 41, 1.2))} filter={cut}><S.House roof={TEAL} /></g>
        <g transform={g(1780, 620, jit(f, 42, 1.2))} filter={cut}><S.House roof={PINK} /></g>
        <g transform={g(560, 520, -3 + jit(f, 43, 0.8))} filter={cut}><S.PostSign /></g>
        <path d="M 0 860 Q 480 790 960 840 Q 1440 890 1920 820 L 1920 1080 L 0 1080 Z" fill={TEAL} opacity={0.55} filter={flat} />
        <path d="M 80 805 L 1840 805" stroke={NAVY} strokeWidth={6} strokeDasharray="22 26" opacity={0.35} />
        {/* the link between maker and buyer, then the break */}
        <path d="M 350 500 C 700 260 1400 260 1780 470" pathLength={1} fill="none" stroke={INK} strokeWidth={7} strokeLinecap="round"
          strokeDasharray={t < 83 ? '1 1' : `${0.5 - gap / 2} ${gap} 1`} strokeDashoffset={t < 83 ? 1 - on(t, 80.9, 82.0) : 0}
          opacity={t > 80.9 ? 0.9 * tw(t, 88.6, 89.3, 1, 0) : 0} />
        <Scribble d="M 1745 330 C 1745 285 1815 278 1818 322 C 1820 352 1782 356 1782 392" p={on(t, 87.0, 87.7) * tw(t, 88.6, 89.3, 1, 0)} w={8} />
        <circle cx={1782} cy={420} r={8} fill={INK} opacity={t > 87.7 ? 0.9 * tw(t, 88.6, 89.3, 1, 0) : 0} />
        <g transform={g(wx, 700 + wagonBump(t), jit(f, 51, 1))} filter={cut}>
          <rect x={-150} y={110} width={300} height={34} rx={8} fill={MUTED} />
          <g transform="translate(0,-10)"><S.Cask />{t >= 95.4 ? <Print x={0} y={0} sc={0.55} /> : null}</g>
          <g transform="translate(-95,160)"><S.Wheel rot={wheelRot} /></g>
          <g transform="translate(95,160)"><S.Wheel rot={wheelRot} /></g>
        </g>
        <Scribble d="M 780 935 C 1000 975 1250 975 1500 935" p={on(t, 91.0, 95.0)} w={6} />
        {/* the rumour, sketched in pencil, then rubbed out */}
        <g clipPath="url(#wipe)" opacity={t < 103 ? 0 : 1}>
          <g fill="none" stroke={MUTED} strokeWidth={5} strokeDasharray="10 9" strokeLinecap="round">
            <path d="M 330 110 A 70 70 0 1 0 400 230 A 54 54 0 1 1 330 110 Z" opacity={sketchO(0)} />
            <rect x={1450} y={180} width={130} height={220} rx={6} opacity={sketchO(1)} />
            <circle cx={1550} cy={290} r={8} opacity={sketchO(1)} />
            {[0, 1, 2, 3, 4].map((i) => (
              <g key={i} opacity={sketchO(2 + i * 0.5)} transform={`translate(${1370 - i * 90},${330})`}>
                <circle cx={0} cy={-40} r={20} /><path d="M -28 70 L -28 0 Q -28 -16 -10 -16 L 10 -16 Q 28 -16 28 0 L 28 70" />
              </g>
            ))}
            {[0, 1, 2, 3].map((i) => <path key={`st${i}`} d={`M ${700 + i * 160} ${110 + (i % 2) * 40} l 10 0 m -5 -5 l 0 10`} opacity={sketchO(1.5)} />)}
          </g>
        </g>
        <g transform={`translate(960,${650 + ledgerY}) rotate(${-1 + jit(f, 52, 0.6)})`} filter={cut}>
          <S.Ledger />
          {t >= 99.2 ? <Print x={-240} y={-130} sc={0.5} k={fl(FL.ledger)} /> : null}
          {t >= 99.8 ? <g transform={g(-110, -130, -12, tw(t, 99.8, 100.2, 2, 1, pop))} opacity={tw(t, 99.8, 100.0, 0, 0.92)}><S.StampOne /></g> : null}
        </g>
        <Scribble d="M 640 480 C 600 520 640 590 730 585 C 810 580 820 500 770 470 C 730 445 670 455 655 480" p={on(t, 110.0, 110.8)} />
      </>}
    />
  );

  // ===================== panel 3: the 1880s to 1931 =====================
  const boxX = [550, 690, 830, 970, 1110];
  const memo = '13 May 1931';
  const typed = memo.slice(0, Math.floor(cl((t - 123.0) / 2.4) * memo.length));
  const paperH = tw(t, 121.8, 123.0, 0, 300, inOut);
  const twIn = tw(t, 121.3, 122.0, 700, 0, backOut);
  const y1880 = (
    <PanelG cam={cam} n={3}
      back={<>
        <rect x={0} y={0} width={1920} height={1080} fill={TEAL} opacity={0.08} />
        <rect x={0} y={880} width={1920} height={200} fill={MUTED} opacity={0.3} />
      </>}
      front={<>
        <g transform={g(230, 340, -2 + jit(f, 70, 0.8))} filter={cut}><S.Calendar tear={tw(t, 112.6, 113.6, 0, 1, Easing.in(Easing.quad))} /></g>
        <rect x={460} y={690} width={740} height={22} rx={6} fill={DEEP} filter={flat} />
        <rect x={480} y={712} width={18} height={170} fill={DEEP} /><rect x={1162} y={712} width={18} height={170} fill={DEEP} />
        {boxX.map((x, i) => {
          const fp = tw(t, 114.4 + i * 0.6, 114.9 + i * 0.6, 0, 1, inOut);
          return (
            <g key={i} transform={g(x, 610, jit(f, 71 + i, 1), 1, Math.max(0.05, Math.abs(Math.cos(Math.PI * fp))), 1)} filter={cut}>
              <S.Box face={fp} />{i === 2 && t >= 118.4 ? <Print x={0} y={-10} sc={0.45} /> : null}
            </g>
          );
        })}
        {[0, 1, 2].map((i) => (
          <g key={i} transform={g(750 + i * 80 + tw(t, 127.4 + i * 0.3, 128.2 + i * 0.3, i === 1 ? 0 : (i === 0 ? -500 : 500), 0, backOut), 850 + (i === 1 ? 20 : 0), jit(f, 80 + i, 1), 0.6)} filter={cut}>
            <S.Person c={i === 1 ? TEALD : NAVY} />
          </g>
        )).filter((_, i) => t > 127.4 + i * 0.3)}
        <Scribble d="M 600 600 C 560 820 700 960 860 950 C 1040 940 1080 760 1040 620 C 1000 510 760 500 640 560" p={on(t, 131.5, 132.6)} />
        <g transform={`translate(${1540 + twIn},780)`}>
          <g filter={cut}>
            <rect x={-140} y={-80 - paperH} width={280} height={paperH} fill={WHITE} stroke={MUTED} strokeWidth={3} />
            {paperH > 60 ? <text x={-112} y={-80 - paperH + 54} style={{fontFamily: 'Inter', fontWeight: 600, fontSize: 34, fill: INK}}>{typed}</text> : null}
            {[0, 1, 2, 3].map((i) => (
              <rect key={i} x={-112} y={-80 - paperH + 100 + i * 40} width={tw(t, 125.6 + i * 0.4, 126.0 + i * 0.4, 0, i === 3 ? 140 : 224)} height={10} rx={5} fill={MUTED} opacity={paperH > 200 ? 0.8 : 0} />
            ))}
          </g>
          <g transform={g(0, 0, jit(f, 79, 0.8))} filter={cut}><S.Typewriter /></g>
        </g>
      </>}
    />
  );

  // ===================== panel 4: 2004, then 1899 =====================
  const sip = tw(t, 148.5, 149.2, 0, 1, inOut) * tw(t, 150.2, 150.8, 1, 0, inOut);
  const swing = t < 164.8 ? 0 : Math.sin((t - 164.8) * 2.4) * 9 * Math.exp(-(t - 164.8) * 0.15);
  const sw = (swing * Math.PI) / 180;
  const watch = {x: W + 1090 + Math.sin(sw) * 230, y: 330 + Math.cos(sw) * 230};
  const y2004 = (
    <PanelG cam={cam} n={4} hx={hx4}
      back={<>
        <rect x={0} y={900} width={2 * W} height={180} fill={MUTED} opacity={0.25} />
        <rect x={W + 300} y={160} width={300} height={400} rx={8} fill={TEAL} opacity={0.12} />
        <rect x={W + 1350} y={160} width={300} height={400} rx={8} fill={TEAL} opacity={0.12} />
      </>}
      front={<>
        {hx4 < W - 1 ? (<>
        <g transform={g(560, 560, jit(f, 90, 0.8))} filter={cut}><S.Scanner /></g>
        <g transform={g(1640, 330, jit(f, 91, 0.8))} filter={cut}><S.Monitor /></g>
        <g transform={g(1180, 300, 0, 0.9)}><S.Brain a={tw(t, 151.4, 151.9, 0, 1, pop) * (1 + pulse(t, 154, 1) * 0.3)} b={tw(t, 152.2, 152.7, 0, 1, pop)} /></g>
        <rect x={1060} y={860} width={480} height={22} rx={10} fill={DEEP} filter={flat} />
        <g transform={g(1180, 780 - sip * 40, jit(f, 92, 1) - sip * 8)} filter={cut}><S.Cup />{t >= 146.4 ? <Print x={0} y={-20} sc={0.42} /> : null}</g>
        <g transform={g(1400, 780, jit(f, 93, 1))} filter={cut}><S.Cup /></g>
        {t > 149.4 ? <g transform={g(1180, 650 - tw(t, 149.4, 150.4, 0, 60), 0, tw(t, 149.4, 149.8, 0, 1, pop))} opacity={tw(t, 155.5, 156, 1, 0)}><S.Heart /></g> : null}
        <Scribble d="M 1150 700 C 1080 620 1080 480 1130 410" p={on(t, 154.5, 155.4) * tw(t, 158.4, 158.8, 1, 0)} />
        <Scribble d="M 1130 410 L 1100 432 M 1130 410 L 1142 446" p={on(t, 155.4, 155.6) * tw(t, 158.4, 158.8, 1, 0)} />
        </>) : null}
        {hx4 > 1 ? (<>
        {/* 1899 */}
        <g transform={g(W + 1000, 580, jit(f, 94, 0.6))} filter={cut}><S.CoatStand /></g>
        <g transform={g(W + 900, 360, -8 + jit(f, 95, 1))} filter={cut}><S.TopHat /></g>
        <g transform={`translate(${W + 1090},330)`}><line x1={0} y1={0} x2={watch.x - W - 1090} y2={watch.y - 330 - 60} stroke={TEALD} strokeWidth={5} /></g>
        <g transform={g(watch.x, watch.y, swing)} filter={cut}><S.Watch />{t >= 163.5 ? <Print x={0} y={0} sc={0.55} /> : null}</g>
        <path d={`M ${W + 1050} 900 L ${W + 1180} 470`} stroke={DEEP} strokeWidth={16} strokeLinecap="round" />
        <path d={`M ${W + 1180} 470 Q ${W + 1200} 420 ${W + 1240} 440`} fill="none" stroke={DEEP} strokeWidth={16} strokeLinecap="round" />
        <g transform={g(W + 600, 860, -2 + jit(f, 96, 0.6))} filter={cut}><S.Book /></g>
        {[0, 1].map((i) => <g key={i} transform={g(W + 1520 + i * 130, 790, jit(f, 97 + i, 1), 0.85)} filter={cut}><S.Person c={i ? NAVY : DEEP} /></g>)}
        {[[-90, -60], [90, -70], [-80, 70], [95, 60]].map(([dx, dy], i) => (
          <Scribble key={i} d={`M ${watch.x + dx} ${watch.y + dy} l ${dx * 0.3} ${dy * 0.3}`} p={on(t, 166.5 + i * 0.15, 166.9 + i * 0.15) * tw(t, 170.4, 170.8, 1, 0)} w={6} />
        ))}
        <path d={`M ${W + 1480} 720 Q ${W + 1300} 600 ${watch.x + 70} ${watch.y + 10}`} fill="none" stroke={INK} strokeWidth={5} strokeDasharray="12 12"
          opacity={tw(t, 168.0, 168.6, 0, 0.7) * tw(t, 170.4, 170.8, 1, 0)} />
        </>) : null}
      </>}
    />
  );

  // ===================== panel 5: 2014 =====================
  const BUB: [number, number][] = [[330, 330], [480, 480], [330, 630], [480, 780], [1450, 290], [1590, 440], [1450, 590], [1590, 760], [700, 900], [960, 920], [1220, 900], [330, 900]];
  const fold = (i: number) => tw(t, 186.4 + i * 0.12, 186.9 + i * 0.12, 0, 1, inOut);
  const y2014 = (
    <PanelG cam={cam} n={5}
      back={<rect x={0} y={0} width={1920} height={1080} fill={PINK} opacity={0.05} />}
      front={<>
        <g transform={g(960, 590, jit(f, 100, 0.6), 0.95)} filter={cut}><S.Laptop /></g>
        {[0, 1, 2].map((i) => {
          const r = 380 + ((t - 173.4 - i * 0.4) * 320);
          const o = t > 173.4 + i * 0.4 && t < 175.6 + i * 0.4 ? 0.8 * (1 - (r - 380) / 700) : 0;
          return <circle key={i} cx={960} cy={590} r={Math.max(0, r)} fill="none" stroke={NAVY} strokeWidth={7} opacity={Math.max(0, o)} strokeDasharray="40 30" />;
        })}
        {[0, 1, 2].map((i) => {
          const r = 1100 - ((t - 175.6 - i * 0.4) * 340);
          const o = t > 175.6 + i * 0.4 && t < 177.7 + i * 0.4 ? 0.8 * cl((1100 - r) / 300) : 0;
          return <circle key={`in${i}`} cx={960} cy={590} r={Math.max(380, r)} fill="none" stroke={PINK} strokeWidth={7} opacity={o} strokeDasharray="20 22" />;
        })}
        {t > 179.4 ? (
          <g transform={g(960, tw(t, 179.4, 180.4, 520, 260, backOut), jit(f, 101, 1), tw(t, 179.4, 179.9, 0.3, 1.1, pop))} filter={cut}
            opacity={tw(t, 186.0, 186.4, 1, 0)}><S.Bubble c={PINK} /></g>
        ) : null}
        {BUB.map(([x, y], i) => {
          const a = 181.4 + i * 0.25;
          if (t < a) return null;
          const fp = fold(i);
          const sc = tw(t, a, a + 0.35, 0, 1, pop);
          return (
            <g key={i} transform={g(x, y, jit(f, 110 + i, 2) + (i % 2 ? 4 : -4), sc, Math.max(0.05, Math.abs(Math.cos(Math.PI * fp))), 1)} filter={cut}>
              {fp < 0.5 ? <S.Bubble c={i % 3 === 0 ? TEAL : NAVY} /> : <S.Card c={i % 2 ? TEAL : PINK} />}
              {i === 6 && t >= 189.0 && fp >= 0.5 ? <Print x={0} y={-28} sc={0.5} k={fl(FL.card)} /> : null}
            </g>
          );
        })}
        {[0, 1, 2, 3].map((i) => {
          const a = 189.5 + i * 0.4;
          if (t < a) return null;
          const p = (t - a) / 2.2;
          return <g key={i} transform={g(1450 + Math.sin(p * 6 + i) * 30 + (i - 1.5) * 30, 540 - p * 300, 0, 1.2)} opacity={cl(1 - p)}><S.Heart /></g>;
        })}
      </>}
    />
  );

  // ===================== panel 6: now =====================
  const reset = t >= 236.0;
  const phA = reset ? {x: 960, y: 560, s: 1} : {x: tw(t, 200.6, 201.4, 960, 260, inOut), y: 560, s: tw(t, 200.6, 201.4, 1, 0.7, inOut)};
  const phoneOut = reset ? 0 : tw(t, 212.6, 213.2, 0, 1, Easing.in(Easing.quad));
  const peopleX = (i: number) => 640 + i * 125;
  const peopleOut = tw(t, 206.2, 206.8, 0, 700, Easing.in(Easing.quad));
  const phonesOut = tw(t, 212.4, 213.0, 0, 700, Easing.in(Easing.quad));
  const wallN = Math.floor(cl((t - 213.8) / 6.4) * 40);
  const extraN = Math.floor(cl((t - 223.0) / 8.4) * 32);
  const fall = (i: number) => (t < 234.1 ? 0 : (t - 234.1 - (i % 5) * 0.03) ** 2 * 2400);
  const yNow = (
    <PanelG cam={cam} n={6}
      back={<rect x={0} y={880} width={1920} height={200} fill={TEAL} opacity={0.12} />}
      front={<>
        {phoneOut < 1 ? (
          <g transform={g(phA.x, phA.y + phoneOut * 800, jit(f, 120, 0.6), phA.s)} filter={cut}>
            <S.Phone w={360} h={680}>
              <rect x={20} y={-270} width={120} height={46} rx={20} fill={TEAL} />
              {[0, 1, 2].map((i) => <circle key={i} cx={-110 + i * 30} cy={-180 + Math.sin(t * 9 + i) * 5} r={10} fill={NAVY}
                opacity={t > 195.6 && t < 197.3 && !reset ? 1 : 0} />)}
              {[0, 1, 2].map((i) => {
                const a = 197.3 + i * 0.2;
                const o = reset ? 1 : tw(t, a, a + 0.3, 0, 1);
                return (
                  <g key={`c${i}`} transform={`translate(0,${-120 + i * 150})`} opacity={o}>
                    <rect x={-140} y={-62} width={280} height={124} rx={14} fill={i === 1 ? PINK : MUTED} opacity={i === 1 ? 0.25 : 0.35} />
                    <rect x={-124} y={-46} width={92} height={92} rx={10} fill={i === 1 ? TEAL : NAVY} />
                    <rect x={-16} y={-30} width={130} height={14} rx={7} fill={NAVY} opacity={0.7} />
                    <rect x={-16} y={0} width={90} height={14} rx={7} fill={NAVY} opacity={0.4} />
                  </g>
                );
              })}
              {t >= 198.6 ? <Print x={0} y={30} sc={0.5 / phA.s} k={fl(FL.chat)} /> : null}
            </S.Phone>
          </g>
        ) : null}
        {!reset && t > 201.4 && t < 207 ? Array.from({length: 10}, (_, i) => {
          const a = 201.4 + i * 0.1;
          const teal = i === 2 || i === 5 || i === 8 ? tw(t, 203.2 + (i / 3) * 0.3, 203.5 + (i / 3) * 0.3, 0, 1) : 0;
          return (
            <g key={i} transform={g(peopleX(i), 640 + peopleOut + jit(f, 130 + i, 2), jit(f, 140 + i, 2), tw(t, a, a + 0.3, 0, 0.9, pop))} filter={cut}>
              <S.Person c={teal > 0.5 ? TEAL : NAVY} />
            </g>
          );
        }) : null}
        {!reset && t > 206.8 && t < 213.2 ? Array.from({length: 10}, (_, i) => {
          const a = 206.8 + i * 0.08;
          const lit = [0, 2, 3, 5, 7, 9].indexOf(i);
          const lo = lit >= 0 ? tw(t, 208.5 + lit * 0.32, 208.8 + lit * 0.32, 0, 1) : 0;
          return (
            <g key={`p${i}`} transform={g(peopleX(i), 620 + phonesOut, jit(f, 150 + i, 2), tw(t, a, a + 0.3, 0, 0.8, pop))} filter={cut}>
              <S.Phone w={90} h={170}>{lo > 0 ? <g opacity={lo} transform={`scale(${0.42 * lo})`}><S.Mark /></g> : null}</S.Phone>
            </g>
          );
        }) : null}
        {!reset && t > 213.2 ? (
          <>
            {[0, 1, 2].map((i) => <g key={`tm${i}`} transform={g(230 + i * 110, 830 + fall(i) * 0, jit(f, 160 + i, 1), tw(t, 213.2 + i * 0.15, 213.6 + i * 0.15, 0, 0.7, pop))} filter={cut}><S.Person c={i === 1 ? TEALD : NAVY} /></g>)}
            <g filter={cut}>
              {Array.from({length: wallN}, (_, i) => {
                const c = i % 8, r = 4 - Math.floor(i / 8);
                return <g key={`w${i}`} transform={g(720 + c * 125, 300 + r * 140 + fall(i), jit(f, 200 + i, 3) + (t > 234.1 ? (i % 7 - 3) * (t - 234.1) * 60 : 0), 0.95)}><S.Card c={i % 3 === 0 ? PINK : i % 3 === 1 ? TEAL : NAVY} /></g>;
              })}
              {Array.from({length: extraN}, (_, i) => (
                <g key={`x${i}`} transform={g(720 + hash(i * 3.1) * 880, 260 + hash(i * 7.7) * 620 + fall(i), (hash(i * 5.3) - 0.5) * 50, 0.75 + hash(i) * 0.3)}><S.Card grey /></g>
              ))}
            </g>
          </>
        ) : null}
        <Scribble d="M 1040 170 C 1010 230 1060 300 1150 300 C 1250 298 1270 210 1220 160 C 1180 120 1080 120 1060 160" p={on(t, 229.4, 230.4) * tw(t, 233.8, 234.1, 1, 0)} />
      </>}
    />
  );

  // ===================== the white page: first principle, why follow, sources, close =====================
  const shieldS = tw(t, 252.3, 252.8, 0, 1, pop) * tw(t, 262.2, 262.9, 1, 0, backIn);
  const ringS = tw(t, 256.3, 256.8, 0, 1, pop) * tw(t, 262.2, 262.9, 1, 0, backIn);
  const arrowsO = tw(t, 262.0, 262.5, 1, 0);
  const ringA = on(t, 262.6, 263.8) * tw(t, 269.0, 269.4, 1, 0);
  const ringB = on(t, 289.0, 290.4) * tw(t, 294.0, 294.3, 1, 0);
  const s11 = t >= 268.8 && t < 294.6;
  const timeO = tw(t, 287.6, 288.6, 1, 0);
  const NOTCH = [960, 1120, 1280, 1440, 1600];
  const OBJ = [S.PriceTag, S.Target, S.Bubble, S.Eye, S.CalPage];
  const machY = tw(t, 276.9, 277.6, -500, 0, backOut);
  const cogRot = t < 278.3 ? 0 : (t - 278.3) * (t < 284 ? 160 : 60);
  const card = tw(t, 294.0, 294.8, 1100, 0, backOut) + tw(t, 302.0, 302.6, 0, 1100, Easing.in(Easing.quad));
  const SOURCES = [
    'Online Etymology Dictionary, "brand"',
    'Wikipedia, "Indus script"',
    'Live Science, "Ancient Egyptians may have used branding irons on human slaves" (2022)',
    'Wikipedia, "Mark (sign)", citing F. Schechter (1925)',
    'Wikipedia, "Brand"',
    'Federation of Bakers, "History of bread: medieval times"',
    'Brookston Beer Bulletin, "Bass red triangle"',
    'Branding Strategy Insider, "Neil McElroy memo"',
    'McClure et al., Neuron 44(2), 2004',
    'T. Veblen, The Theory of the Leisure Class (1899)',
    'Quartz, on Glossier and Into the Gloss (2016)',
    'Exploding Topics survey via Semrush (Sep 2026)',
  ];
  const logoIn = tw(t, 302.9, 303.6, 0, 1);
  const urlIn = tw(t, 303.7, 304.3, 0, 1);

  const whitePage = pageUp ? (
    <g transform={`translate(0,${page})`}>
      <rect x={-20} y={0} width={1960} height={1100} fill={WHITE} filter="url(#sheet)" />
      <rect width={1920} height={1080} filter="url(#bggrain)" />
      {/* scene 10 */}
      {t < 269.5 ? (
        <>
          <g opacity={arrowsO}>
            <Scribble d="M 860 520 C 780 470 690 480 650 540" p={on(t, 251.6, 252.4)} />
            <Scribble d="M 650 540 L 656 502 M 650 540 L 688 532" p={on(t, 252.4, 252.6)} />
            <Scribble d="M 1060 520 C 1140 470 1230 480 1270 540" p={on(t, 255.6, 256.4)} />
            <Scribble d="M 1270 540 L 1232 532 M 1270 540 L 1264 502" p={on(t, 256.4, 256.6)} />
          </g>
          {shieldS > 0.01 ? <g transform={g(520 + (1 - shieldS) * 440 * (t > 262 ? 1 : 0), 600, jit(f, 300, 1), shieldS)} filter={cut}><S.Shield /></g> : null}
          {ringS > 0.01 ? (
            <g transform={g(1400 - (1 - ringS) * 440 * (t > 262 ? 1 : 0), 600, 0, ringS)} filter={cut}>
              {Array.from({length: 6}, (_, i) => {
                const a = (i / 6) * Math.PI * 2 - Math.PI / 2;
                return <g key={i} transform={g(Math.cos(a) * 140, Math.sin(a) * 120, jit(f, 310 + i, 2), 0.55)}><S.Person c={i % 2 ? TEALD : NAVY} /></g>;
              })}
            </g>
          ) : null}
          <Scribble d="M 960 405 C 870 400 820 470 825 545 C 830 640 900 680 975 676 C 1060 672 1100 610 1098 535 C 1096 455 1040 410 950 412" p={ringA} w={8} />
        </>
      ) : null}
      {/* scene 11 */}
      {s11 ? (
        <g opacity={timeO}>
          <Scribble d="M 160 860 L 760 860" p={on(t, 269.4, 270.0)} w={8} c={NAVY} />
          <path d={`M 760 860 L ${760 + 1020 * on(t, 270.0, 270.9)} 860`} stroke={NAVY} strokeWidth={8} strokeLinecap="round" strokeDasharray="4 22" opacity={t > 270 ? 0.8 : 0} />
          <rect x={754} y={828} width={12} height={64} rx={6} fill={NAVY} opacity={on(t, 269.6, 269.9)} />
          {NOTCH.map((x, i) => <rect key={i} x={x - 4} y={842} width={8} height={36} rx={4} fill={NAVY} opacity={0.6 * on(t, 270.0 + i * 0.15, 270.3 + i * 0.15)} />)}
          {NOTCH.map((x, i) => {
            const a = 271.2 + i * 0.7;
            if (t < a) return null;
            const O = OBJ[i];
            return <g key={`o${i}`} transform={g(x + tw(t, a, a + 0.5, 420, 0, backOut), 760, jit(f, 320 + i, 2), 0.8)} filter={cut} opacity={tw(t, a, a + 0.2, 0, 1)}><O /></g>;
          })}
          {/* the machine */}
          {t > 276.9 ? (
            <g transform={`translate(960,${330 + machY})`}>
              <g filter={cut}>
                <path d="M -110 -170 L 110 -170 L 70 -110 L -70 -110 Z" fill={TEAL} />
                <rect x={-230} y={-112} width={460} height={230} rx={22} fill={NAVY} />
                <g transform={`translate(-140,10)`}><S.Cog r={46} rot={cogRot} c={TEAL} /></g>
                <g transform={`translate(-62,52)`}><S.Cog r={30} rot={-cogRot * 1.5 + 18} c={PINK} /></g>
                <rect x={-80} y={118} width={160} height={16} rx={8} fill={DEEP} />
                <rect x={10} y={-66} width={190} height={100} rx={12} fill={WHITE} />
              </g>
              <image href={staticFile('mavic-logo.svg')} x={30} y={-46} width={150} height={60} preserveAspectRatio="xMidYMid meet" />
            </g>
          ) : null}
          {/* the fan of cards */}
          {Array.from({length: 6}, (_, i) => {
            const a0 = 280.0 + i * 0.35;
            const out = tw(t, a0, a0 + 0.55, 0, 1, backOut) * tw(t, 286.2 + (5 - i) * 0.12, 286.7 + (5 - i) * 0.12, 1, 0, inOut);
            if (out <= 0.01) return null;
            const angD = -25 + i * 10;
            const an = (angD * Math.PI) / 180;
            const tx = 960 + Math.sin(an) * 900, ty = 1480 - Math.cos(an) * 900;
            return (
              <g key={`fan${i}`} transform={g(960 + (tx - 960) * out, 470 + (ty - 470) * out, angD * out, 0.3 + 0.7 * out)} filter={cut}>
                <S.Card c={i % 2 ? TEAL : NAVY} /><Print x={0} y={-28} sc={0.45} />
              </g>
            );
          })}
        </g>
      ) : null}
      <Scribble d="M 960 405 C 870 400 820 470 825 545 C 830 640 900 680 975 676 C 1060 672 1100 610 1098 535 C 1096 455 1040 410 950 412" p={ringB} w={8} />
      {/* scene 12: sources */}
      {t >= 294.0 && t < 302.7 ? (
        <g transform={`translate(960,${540 + card}) rotate(-1)`}>
          <g filter={flat}>
            <rect x={-640} y={-400} width={1280} height={800} rx={14} fill={WHITE} stroke={MUTED} strokeWidth={3} />
            {Array.from({length: 14}, (_, i) => <line key={i} x1={-600} x2={600} y1={-240 + (i - 1) * 46} y2={-240 + (i - 1) * 46} stroke={TEAL} strokeWidth={2} opacity={0.35} />)}
            <line x1={-520} x2={-520} y1={-380} y2={380} stroke={PINK} strokeWidth={3} opacity={0.5} />
          </g>
          <text x={-490} y={-300} style={{fontFamily: 'Inter', fontWeight: 800, fontSize: 44, fill: INK, letterSpacing: -1}}>Sources</text>
          {SOURCES.map((line, i) => (
            <text key={i} x={-490} y={-248 + i * 46} style={{fontFamily: 'Inter', fontWeight: 500, fontSize: 25, fill: INK}}>{line}</text>
          ))}
          <text x={-490} y={-248 + 12 * 46 + 14} style={{fontFamily: 'Inter', fontWeight: 700, fontSize: 25, fill: TEALD}}>Full links in the description</text>
        </g>
      ) : null}
      {/* scene 13: close */}
      {t >= 302.8 ? (
        <>
          <image href={staticFile('mavic-logo.svg')} x={960 - 200 * (0.94 + 0.06 * logoIn)} y={420} width={400 * (0.94 + 0.06 * logoIn)} height={140} opacity={logoIn} preserveAspectRatio="xMidYMid meet" />
          <text x={960} y={650 + (1 - urlIn) * 24} textAnchor="middle" opacity={urlIn} style={{fontFamily: 'Inter', fontWeight: 700, fontSize: 46, fill: TEALD, letterSpacing: -1}}>mavic.ai</text>
        </>
      ) : null}
    </g>
  ) : null;

  // ruler: where we are in time
  const rulerO = 0.85 * tw(t, 244.9, 245.4, 1, 0);
  const rulerArrow = on(t, 10.0, 11.0) * tw(t, 13.0, 13.3, 1, 0);

  return (
    <AbsoluteFill style={{background: WHITE}}>
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
          <filter id="sheet" x="-5%" y="-10%" width="110%" height="120%">
            <feDropShadow dx={0} dy={-10} stdDeviation={14} floodColor={NAVY} floodOpacity={0.25} />
          </filter>
          <filter id="bggrain">
            <feTurbulence type="fractalNoise" baseFrequency="0.7" numOctaves={3} seed={7} />
            <feColorMatrix type="matrix" values="0 0 0 0 0.04  0 0 0 0 0.1  0 0 0 0 0.36  0 0 0 0.06 0" />
          </filter>
          {[0, 1, 2, 3, 4, 5, 6, 7].map((n) => <clipPath key={n} id={`clip${n}`}><rect x={0} y={fg(n)} width={1920} height={H} /></clipPath>)}
          <clipPath id="wipe"><rect x={wipeX} y={0} width={1920} height={1080} /></clipPath>
          <filter id="mblur" x="-10%" y="-20%" width="120%" height="140%"><feGaussianBlur stdDeviation={`${bx} ${by}`} /></filter>
        </defs>
        <rect width={1920} height={1080} filter="url(#bggrain)" />

        {t < 246 ? (
          <g filter={bx + by > 0.5 ? 'url(#mblur)' : undefined}>
            {ancient}{y1266}{y1876}{y1880}{y2004}{y2014}{yNow}{shop}
          </g>
        ) : null}

        {rulerO > 0.01 ? (
          <g opacity={rulerO}>
            <line x1={1852} y1={150} x2={1852} y2={930} stroke={NAVY} strokeWidth={4} strokeLinecap="round" opacity={0.25} />
            {Array.from({length: 8}, (_, n) => <circle key={n} cx={1852} cy={150 + (n / 7) * 780} r={7} fill={NAVY} opacity={0.35} />)}
            <circle cx={1852} cy={150 + (cam / (7 * H)) * 780} r={14 * (1 + pulse(t, 9.4, 0.8) * 0.5 + pulse(t, 11.2, 0.8) * 0.5)} fill={PINK} />
            <Scribble d="M 1800 900 L 1800 190" p={rulerArrow} w={6} />
            <Scribble d="M 1800 190 L 1782 222 M 1800 190 L 1818 222" p={rulerArrow > 0.95 ? rulerArrow : 0} w={6} />
          </g>
        ) : null}

        {whitePage}

        {/* the seal: one thread through every era */}
        {M.s > 0.01 ? (
          <g transform={g(M.x, M.y, jit(f, 1, 6) + (t < 2 ? tw(t, 1.2, 2.0, -200, 0) : 0), M.s * sealPulse, 1 + squash, 1 - squash)} filter={cut}>
            {hot > 0.01 ? <S.Flames t={t} o={hot} /> : null}
            <S.Mark />
          </g>
        ) : null}
      </svg>
    </AbsoluteFill>
  );
};
