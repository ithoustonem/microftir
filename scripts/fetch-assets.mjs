// Downloads the images and intro video from the current microftir.com into public/.
// Run once: `npm run fetch-assets`. Files that already exist are skipped.
import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';

const BASE = 'https://microftir.com/';
const root = join(import.meta.dirname, '..', 'public');

const files = {
  'images/logo.jpg': 'images/banner/small%202019LogoBlackEdge.jpg',
  'images/functional-group-map.jpg': 'images/banner/Functional-group-map.jpg',
  'images/micro-ftir-analysis.jpg': 'images/banner/micro-ftir-analysis.jpg',
  'images/ftir-oil.jpg': 'images/banner/micro-FTIR-functional-group-oil.jpg',
  'images/ftir-spectroscopy.png': 'images/banner/micro-FTIR-Spectroscopy.png',
  'images/polymer-pvc.jpg': 'images/banner/polymer-pvc.jpg',
  'images/ftir-map-spectra.jpg': 'images/FTIR-mapAndSpectra.jpg',
  'images/material-identification.jpg': 'images/material-identification.jpg',
  'apple-touch-icon.png': 'apple-touch-icon.png',
  'favicon.ico': 'favicon.ico',
  'microFT-IR_intro.mp4': 'microFT-IR_intro.mp4',
};

let failed = 0;
for (const [dest, src] of Object.entries(files)) {
  const out = join(root, dest);
  if (existsSync(out) && dest !== 'favicon.ico') { console.log(`skip  ${dest}`); continue; }
  try {
    const res = await fetch(BASE + src);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    mkdirSync(dirname(out), { recursive: true });
    writeFileSync(out, Buffer.from(await res.arrayBuffer()));
    console.log(`saved ${dest}`);
  } catch (err) {
    failed++;
    console.error(`FAIL  ${dest}: ${err.message}`);
  }
}
process.exit(failed ? 1 : 0);
