import {Easing} from 'remotion';
// Inter bundled with the project (brand skill fallback), so any machine renders the right font.
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/600.css';
import '@fontsource/inter/700.css';
import '@fontsource/inter/800.css';
export const fontFamily = 'Inter';
export const colors = {
  stageTop: '#070B1D', stageGlow: '#0B1A5C', pink: '#FF4DB3', pinkDeep: '#E81784',
  teal: '#3DE8D3', tealDeep: '#1D988B', white: '#FFFFFF', muted: '#B8B9CC',
  panel: '#FFFFFF', panelInk: '#1C1C2E', logoBlue: '#0622A4',
} as const;
export const stageBackground = `radial-gradient(ellipse at 50% 45%, ${colors.stageGlow} 0%, ${colors.stageTop} 70%)`;
export const easeOut = Easing.bezier(0.16, 1, 0.3, 1);
export const type = {
  headline: {fontFamily, fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.02},
  eyebrow: {fontFamily, fontWeight: 700, letterSpacing: '0.28em', textTransform: 'uppercase' as const},
  body: {fontFamily, fontWeight: 400},
};
export const scale = (px: number, width: number) => (px * width) / 1920;
export const fit = (px: number, width: number, height: number) => (px * Math.min(width, height)) / 1080;
