import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
// The site reads ../frontend and ../backend source files as raw text at build time and parses them,
// so every count, timing and string on the page comes from the repo, never typed by hand.
export default defineConfig({
  base: '/AI-WRITTER-BY-THETRIMATRIXLAB/',
  plugins: [react()],
  server: { fs: { allow: ['..'] } },
});
