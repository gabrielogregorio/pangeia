import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  root: '.',
  base: './docs',
  build: {
    outDir: 'build',
  },
  resolve: {
    alias: {
      // FIXME: some automatic solution
      '@/layout': resolve(__dirname, './src/components/layout'),
      '@/widgets': resolve(__dirname, './src/components/widgets'),
      '@/components': resolve(__dirname, './src/components'),
      '@/contexts': resolve(__dirname, './src/core/contexts'),
      '@/helpers': resolve(__dirname, './src/core/helpers'),
      '@/hooks': resolve(__dirname, './src/core/hooks'),
      '@/interfaces': resolve(__dirname, './src/core/interfaces'),
      '@/normalizers': resolve(__dirname, './src/core/normalizers'),
      '@/shared': resolve(__dirname, './src/core/shared'),
      '@/icons': resolve(__dirname, './src/icons'),
    },
  },
  // @ts-ignore
  test: {
    css: false,
    coverage: {
      reporter: ['text', 'json', 'html', 'lcov'],
    },
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./tests/setup.ts'],
  },
  envPrefix: 'REACT_APP_',
  plugins: [react()],
});
