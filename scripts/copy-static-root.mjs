// After `npm run build`, copy the prerendered site from dist/microftir/browser to the top of dist/.
// Hosts that serve dist/ as static files (e.g. PocketBay) expect dist/index.html.
// The Node server (npm start) keeps using dist/microftir/browser.
import { cpSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const dist = join(import.meta.dirname, '..', 'dist');
const browser = join(dist, 'microftir', 'browser');
if (!existsSync(join(browser, 'index.html'))) {
  console.error('copy-static-root: dist/microftir/browser/index.html not found; run ng build first');
  process.exit(1);
}
cpSync(browser, dist, { recursive: true });
console.log('copy-static-root: copied prerendered site to dist/');
