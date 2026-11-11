import React from 'react';
import {
  AbsoluteFill,
  Audio,
  Img,
  interpolate,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import {colors, easeOut, fit, type} from './brand';

type EndCardProps = {
  headline?: string;
  line?: string;
  cta?: string;
  audioSrc?: string;
};

const NODES = 14;

const AgentNetwork: React.FC<{t: number; collapse: number; size: number}> = ({t, collapse, size}) => {
  const r = size * 0.32 * (1 - collapse);
  const pts = Array.from({length: NODES}, (_, i) => {
    const a = (i / NODES) * Math.PI * 2 + t * 0.9 * (i % 2 ? 1 : -0.7);
    const rr = r * (i % 3 === 0 ? 0.55 : 1);
    return {x: Math.cos(a) * rr, y: Math.sin(a) * rr * 0.8, c: i % 2 ? colors.teal : colors.pink};
  });
  return (
    <svg width={size} height={size} viewBox={`${-size / 2} ${-size / 2} ${size} ${size}`} style={{position: 'absolute'}}>
      {pts.map((p, i) => {
        const q = pts[(i + 3) % NODES];
        return <line key={`l${i}`} x1={p.x} y1={p.y} x2={q.x} y2={q.y} stroke={p.c} strokeOpacity={0.35} strokeWidth={size * 0.002} />;
      })}
      {pts.map((p, i) => (
        <circle key={`c${i}`} cx={p.x} cy={p.y} r={size * (i % 3 === 0 ? 0.014 : 0.009)} fill={p.c} />
      ))}
    </svg>
  );
};

export const EndCardLight: React.FC<EndCardProps> = ({
  headline = 'Tandem',
  line = 'Now available in Mavic',
  cta = 'Start at mavic.ai',
  audioSrc,
}) => {
  const frame = useCurrentFrame();
  const {fps, width, height} = useVideoConfig();
  const s = (sec: number) => sec * fps;
  const ease = {easing: easeOut, extrapolateLeft: 'clamp' as const, extrapolateRight: 'clamp' as const};

  const collapse = interpolate(frame, [s(4), s(5.5)], [0, 1], ease);
  const netOpacity = interpolate(frame, [0, s(0.6), s(5), s(5.6)], [0, 1, 1, 0], ease);
  const headIn = interpolate(frame, [s(5), s(5.8)], [0, 1], ease);
  const lineIn = interpolate(frame, [s(5.75), s(6.4)], [0, 1], ease);
  const logoIn = interpolate(frame, [s(7.5), s(8.2)], [0, 1], ease);
  const ctaIn = interpolate(frame, [s(8.5), s(9.1)], [0, 1], ease);

  const portrait = height > width;
  const short = Math.min(width, height);
  const f = (px: number) => fit(px, width, height);

  return (
    <AbsoluteFill style={{background: colors.white, alignItems: 'center', justifyContent: 'center'}}>
      {audioSrc ? <Audio src={audioSrc} /> : null}
      <AbsoluteFill style={{alignItems: 'center', justifyContent: 'center', opacity: netOpacity}}>
        <AgentNetwork t={frame / fps} collapse={collapse} size={short * 0.95} />
      </AbsoluteFill>
      <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: f(portrait ? 36 : 22), textAlign: 'center'}}>
        <div style={{...type.headline, color: colors.panelInk, fontSize: f(150), opacity: headIn, transform: `scale(${0.92 + 0.08 * headIn})`}}>
          {headline}
        </div>
        <div style={{...type.headline, fontWeight: 700, color: colors.stageGlow, fontSize: f(46), opacity: lineIn, transform: `translateY(${(1 - lineIn) * f(24)}px)`}}>
          {line}
        </div>
        <Img
          src={staticFile('mavic-logo.svg')}
          style={{width: short * (portrait ? 0.42 : 0.34), marginTop: f(36), marginBottom: f(10), opacity: logoIn, transform: `scale(${0.94 + 0.06 * logoIn})`}}
        />
        <div style={{...type.headline, fontWeight: 700, color: colors.tealDeep, fontSize: f(44), opacity: ctaIn, transform: `translateY(${(1 - ctaIn) * f(24)}px)`}}>
          {cta}
        </div>
      </div>
    </AbsoluteFill>
  );
};
