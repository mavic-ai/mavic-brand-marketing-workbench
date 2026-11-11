import {bundle} from '@remotion/bundler';
import {renderMedia, selectComposition, openBrowser} from '@remotion/renderer';
import fs from 'fs'; import path from 'path';
const START=+process.argv[2], END=+process.argv[3], STEP=300, CONC=+(process.argv[4]||2);
const serveUrl = await bundle({entryPoint: path.resolve('src/index.ts')});
for (let a=START; a<=END; a+=STEP) {
  const b=Math.min(a+STEP-1, END);
  const out=`out/chunks/f${String(a).padStart(5,'0')}.mp4`;
  if (fs.existsSync(out+'.done')) continue;
  const browser = await openBrowser('chrome', {browserExecutable: process.env.CHROME_PATH ?? null});
  const composition = await selectComposition({serveUrl, id: 'Ep1A', puppeteerInstance: browser});
  const t0=Date.now();
  await renderMedia({serveUrl, composition, codec: 'h264', crf: 18, outputLocation: out, frameRange: [a,b], concurrency: CONC, puppeteerInstance: browser});
  await browser.close({silent: true});
  fs.writeFileSync(out+'.done', '');
  console.log('chunk', a, b, ((Date.now()-t0)/1000).toFixed(0)+'s');
}
console.log('ALLDONE');
