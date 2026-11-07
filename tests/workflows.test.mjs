// Checks every GitHub workflow against the repo layout: each npm/yarn/grunt step must run in a folder that
// has the files it needs, and each setup-node cache must point at a lockfile that exists.
// Run: node --test tests/workflows.test.mjs
// Limit: line-based YAML reading, enough for these flat workflows; switch to a YAML parser if they grow nesting.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const wfDir = path.join(root, '.github/workflows');
const has = (dir, f) => fs.existsSync(path.join(root, dir, f));

// Split each `steps:` list into item texts.
function steps(src) {
  const lines = src.split('\n');
  const out = [];
  for (let i = 0; i < lines.length; i++) {
    if (!/^\s*steps:\s*$/.test(lines[i])) continue;
    const first = lines.slice(i + 1).find((l) => l.trim());
    const indent = first.match(/^(\s*)-/)[1].length;
    let cur = null;
    for (let j = i + 1; j < lines.length; j++) {
      const l = lines[j];
      if (!l.trim()) continue;
      const ind = l.match(/^(\s*)/)[1].length;
      if (ind < indent || (ind === indent && !l.trimStart().startsWith('-'))) break;
      if (ind === indent) { cur = []; out.push(cur); }
      cur.push(l);
    }
  }
  return out.map((s) => s.join('\n'));
}

const field = (step, key) => step.match(new RegExp(`^\\s*-?\\s*${key}:\\s*(.+)$`, 'm'))?.[1].trim().replace(/^['"]|['"]$/g, '');

function problems(file) {
  const out = [];
  for (const step of steps(fs.readFileSync(path.join(wfDir, file), 'utf8'))) {
    // A step guarded by hashFiles(...) != '' only runs when one of those files exists.
    const guard = field(step, 'if');
    if (guard && /hashFiles\(/.test(guard)) {
      const files = [...guard.matchAll(/'([^']+)'/g)].map((m) => m[1]).filter((f) => f !== '');
      if (!files.some((f) => has('.', f))) continue;
    }
    const dir = field(step, 'working-directory') || '.';
    const cache = field(step, 'cache');
    if (cache) {
      const lock = field(step, 'cache-dependency-path') || (cache === 'yarn' ? 'yarn.lock' : 'package-lock.json');
      if (!has('.', lock)) out.push(`${file}: cache '${cache}' needs ${lock}`);
    }
    const run = step.replace(/^[\s\S]*?run:\s*\|?/m, '');
    if (!/run:/.test(step)) continue;
    if (/\b(npm|yarn)\b/.test(run) && !has(dir, 'package.json')) out.push(`${file}: npm/yarn in ${dir} needs package.json`);
    if (/\bnpm ci\b/.test(run) && !has(dir, 'package-lock.json')) out.push(`${file}: npm ci in ${dir} needs package-lock.json`);
    if (/--frozen-lockfile/.test(run) && !has(dir, 'yarn.lock')) out.push(`${file}: frozen yarn install in ${dir} needs yarn.lock`);
    if (/^\s*grunt\b/m.test(run) && !has(dir, 'Gruntfile.js')) out.push(`${file}: grunt in ${dir} needs Gruntfile.js`);
  }
  return out;
}

for (const file of fs.readdirSync(wfDir).filter((f) => /\.ya?ml$/.test(f))) {
  test(`${file} matches the repo layout`, () => assert.deepEqual(problems(file), []));
}
