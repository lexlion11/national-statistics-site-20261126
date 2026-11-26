// main.ts — the hand-in program (Node 22, standard library only).
// It copies the site (app/) and the screenshots (screenshots/) next to this file into the output directory and
// writes dossier.json there, the summary the judge reads: the screenshots, the files the first load fetches with
// their bytes, and the site's own source.
//
// vendor/makefun-frontend.ts is the kit's copy and must stay byte for byte as it is: the scorer rebuilds the
// dossier with its own copy of that library and compares the two byte for byte.
//
// Outside the grader's container, MAKEFUN_OUTPUT_DIR stands in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { cpSync, existsSync, mkdirSync, readdirSync, statSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildDossier } from './vendor/makefun-frontend.ts';

const here = fileURLToPath(new URL('.', import.meta.url));
const out = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

mkdirSync(out, { recursive: true });
cpSync(join(here, 'app'), join(out, 'app'), { recursive: true });

mkdirSync(join(out, 'screenshots'), { recursive: true });
const shotDir = join(here, 'screenshots');
if (existsSync(shotDir)) cpSync(shotDir, join(out, 'screenshots'), { recursive: true });

// The scorer's own caps (reference/gate.json). Only text_max_bytes shapes the bytes; the rest refuse an entry
// the scorer would refuse: more than four screenshots or one over 256 KiB, more than 993 files and directories in
// app/ or more than 16 MiB of app files. app/ shares the output directory's 1,000-entry cap with screenshots/
// and dossier.json, so these are the numbers to keep.
const CAPS = {
  text_max_bytes: 163840,
  screenshots: { max: 4, max_bytes: 262144 },
  app_max_files: 993,
  app_max_bytes: 16777216,
};

writeFileSync(join(out, 'dossier.json'), buildDossier(out, CAPS));

// A short note of what was written, so a local run says what it produced.
const written = readdirSync(out).sort();
const appBytes = statSync(join(out, 'app')).isDirectory() ? '' : '';
const shots = readdirSync(join(out, 'screenshots')).sort();
console.log(`output: ${out}`);
console.log(`contents: ${written.join(', ')}`);
console.log(`screenshots: ${shots.length ? shots.join(', ') : 'none'}${appBytes}`);
