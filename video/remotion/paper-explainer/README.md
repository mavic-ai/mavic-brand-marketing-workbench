# Paper-collage explainer (Remotion)

The source of Mavic's Ep 1A, "What is a brand?", shared as a working template for the explainer format (`video/formats/explainer.md`). It uses Mavic's colours and logo as the example theme: swap `src/brand.ts` and the files in `public/` for your own brand.

- `src/ep1a/Ep1A.tsx`: the whole film: camera scroll through eras, the travelling seal, paper objects with sticker edges and stop-motion jitter, hand-drawn scribbles.
- `src/ep1a/shapes.tsx`: every paper object.
- `src/ep1a/Supers.tsx`: short paper-strip titles as a transparent overlay.

`npm i`, then render in chunks: `node render2.mjs <startFrame> <endFrame> <concurrency>`. Set `CHROME_PATH` to use your own Chrome; otherwise Remotion downloads its own.

The Mavic logo files in `public/` are trademarks and are not covered by the repo's licence: replace them with your own.

Licence note: Remotion is free for individuals and small teams; companies above its size threshold need a paid company licence. Check remotion.dev/license before reusing this commercially.
