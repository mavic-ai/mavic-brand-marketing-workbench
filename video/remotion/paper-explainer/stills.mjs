import {bundle} from '@remotion/bundler';
import {renderStill, selectComposition} from '@remotion/renderer';
import path from 'path';
const out = process.argv[2];
const secs = process.argv.slice(3).map(Number);
const serveUrl = await bundle({entryPoint: path.resolve('src/index.ts')});
const comp = await selectComposition({serveUrl, id: 'Ep1A', browserExecutable: process.env.CHROME_PATH ?? null});
for (const s of secs) {
  const frame = Math.round(s * 30);
  await renderStill({serveUrl, composition: comp, frame, output: `${out}/s${String(s).padStart(6,'0')}.png`, browserExecutable: process.env.CHROME_PATH ?? null, scale: 0.5});
  console.log('ok', s);
}
