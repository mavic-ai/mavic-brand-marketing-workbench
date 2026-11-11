import {bundle} from '@remotion/bundler';
import {renderMedia, selectComposition} from '@remotion/renderer';
import path from 'path';
const W=[[14.2,19.6],[55.2,61.8],[73.9,78.6],[90.6,95.6],[164.2,170.4],[194.8,200.2],[248.4,260.8],[263.2,268.6]];
const serveUrl = await bundle({entryPoint: path.resolve('src/index.ts')});
const composition = await selectComposition({serveUrl, id: 'Ep1ASupers', browserExecutable: process.env.CHROME_PATH ?? null});
for (const [i,[a,b]] of W.entries()) {
  const fa=Math.floor(a*30), fb=Math.ceil(b*30);
  await renderMedia({serveUrl, composition, codec: 'prores', proResProfile: '4444', pixelFormat: 'yuva444p10le', imageFormat: 'png', outputLocation: `out/sup/s${i}.mov`, frameRange: [fa, fb], concurrency: 2, browserExecutable: process.env.CHROME_PATH ?? null});
  console.log('sup', i, fa, fb);
}
console.log('SUPDONE');
