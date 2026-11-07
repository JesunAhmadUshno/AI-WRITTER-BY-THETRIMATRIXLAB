import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'node:fs';
import path from 'node:path';
import { lineCount, countBackendCalls } from './src/parse.js';
// The site reads ../frontend and ../backend source files as raw text at build time and parses them,
// so every count, timing and string on the page comes from the repo, never typed by hand.
// The line inventory is counted here so the page does not ship 66 component files just to count them.
const comp = path.resolve(__dirname, '../frontend/src/components');
const walk = (d) => fs.readdirSync(d, { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? walk(path.join(d, e.name)) : e.name.endsWith('.jsx') ? [path.join(d, e.name)] : []));
const inventory = walk(comp).map((f) => ({ path: path.relative(path.resolve(__dirname, '..'), f), lines: lineCount(fs.readFileSync(f, 'utf8')) }));
const backendCalls = countBackendCalls(walk(comp).filter((f) => !f.includes('/ui/')).map((f) => fs.readFileSync(f, 'utf8')));

export default defineConfig({
  base: '/AI-WRITTER-BY-THETRIMATRIXLAB/',
  plugins: [react()],
  define: { __INVENTORY__: JSON.stringify(inventory), __COMPONENT_BACKEND_CALLS__: backendCalls },
  server: { fs: { allow: ['..'] } },
});
