import React from 'react';
import {AbsoluteFill, Easing, useCurrentFrame} from 'remotion';
import {easeOut} from '../brand';
import {NAVY, WHITE, PINK, PINKD, INK, TEALD} from './shapes';

const FPS = 30;
export type Super = {a: number; b: number; text: string; sub?: {at: number; text: string}[]; pos: 'tl' | 'bc'};
export const SUPERS: Super[] = [
  {a: 14.2, b: 19.6, text: 'The story of a brand', pos: 'tl'},
  {a: 55.2, b: 61.8, text: 'First job: say who made it', pos: 'tl'},
  {a: 73.9, b: 78.6, text: 'A promise you can hold someone to', pos: 'tl'},
  {a: 90.6, b: 95.6, text: 'The mark carries the trust', pos: 'tl'},
  {a: 164.2, b: 170.4, text: 'Conspicuous consumption', pos: 'tl'},
  {a: 194.8, b: 200.2, text: 'A new reader: AI', pos: 'tl'},
  {a: 248.4, b: 260.8, text: 'Why brands exist', pos: 'tl', sub: [{at: 250.4, text: '1. Choosing is risky'}, {at: 254.6, text: '2. People want to belong'}]},
  {a: 263.2, b: 268.6, text: 'A brand is a promise, made distinctive, kept consistently.', pos: 'bc'},
];

const cl = (x: number) => Math.max(0, Math.min(1, x));
const hash = (n: number) => {const x = Math.sin(n * 12.9898) * 43758.5453; return x - Math.floor(x);};

const Strip: React.FC<{t: number; s: Super; i: number; f: number}> = ({t, s, i, f}) => {
  const inP = easeOut(cl((t - s.a) / 0.45));
  const outP = Easing.in(Easing.quad)(cl((t - (s.b - 0.35)) / 0.35));
  if (inP <= 0 || outP >= 1) return null;
  const big = s.pos === 'bc';
  const size = big ? 54 : 50;
  const w = s.text.length * size * (big ? 0.5 : 0.53) + 110;
  const h = size + 46;
  const jit = (hash(Math.floor(f / 3) * 3.1 + i) - 0.5) * 0.8;
  const x = big ? 960 - w / 2 : 110;
  const y = big ? 860 : 84;
  const dx = big ? 0 : (1 - inP) * -60 + outP * -60;
  const dy = big ? (1 - inP) * 40 + outP * 40 : 0;
  const rot = (big ? -0.6 : -1.4) + jit + (1 - inP) * -4;
  return (
    <g opacity={inP * (1 - outP)} transform={`translate(${x + dx},${y + dy}) rotate(${rot})`}>
      <g filter="url(#scut)">
        <rect x={0} y={0} width={w} height={h} rx={10} fill={WHITE} />
        <rect x={0} y={0} width={18} height={h} rx={6} fill={PINK} />
        <rect x={0} y={0} width={18} height={h * 0.35} rx={6} fill={PINKD} />
      </g>
      <text x={48} y={h / 2 + size * 0.35} style={{fontFamily: 'Inter', fontWeight: 800, fontSize: size, letterSpacing: -1.2, fill: NAVY}}>{s.text}</text>
      {(s.sub ?? []).map((sb, k) => {
        const p = easeOut(cl((t - sb.at) / 0.4));
        if (p <= 0) return null;
        return (
          <g key={k} opacity={p} transform={`translate(${30 + (1 - p) * -30},${h + 22 + k * 74})`}>
            <g filter="url(#scut)"><rect x={0} y={0} width={sb.text.length * 21 + 70} height={58} rx={8} fill={WHITE} /></g>
            <text x={30} y={40} style={{fontFamily: 'Inter', fontWeight: 700, fontSize: 36, letterSpacing: -0.6, fill: k ? TEALD : INK}}>{sb.text}</text>
          </g>
        );
      })}
    </g>
  );
};

export const Ep1ASupers: React.FC = () => {
  const f = useCurrentFrame();
  const t = f / FPS;
  const boil = Math.floor(f / 4) % 6;
  return (
    <AbsoluteFill style={{background: 'transparent'}}>
      <svg width={1920} height={1080} viewBox="0 0 1920 1080" style={{position: 'absolute'}}>
        <defs>
          <filter id="scut" x="-10%" y="-40%" width="120%" height="200%">
            <feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves={2} seed={boil} result="n" />
            <feDisplacementMap in="SourceGraphic" in2="n" scale={4} xChannelSelector="R" yChannelSelector="G" result="d" />
            <feDropShadow in="d" dx={0} dy={8} stdDeviation={7} floodColor={NAVY} floodOpacity={0.22} />
          </filter>
        </defs>
        {SUPERS.map((s, i) => <Strip key={i} t={t} s={s} i={i} f={f} />)}
      </svg>
    </AbsoluteFill>
  );
};
