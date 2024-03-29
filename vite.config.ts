import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default ({ mode }) => {
  // Load app-level env vars to node-level env vars.
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) }

  return defineConfig({
    esbuild: {
      define: {
        this: 'window',
      },
    },
    server: {
      host: true,
      port: 3006,
      hmr: {
        overlay: false
      }
    },
    plugins: [react()],
    optimizeDeps: {
      exclude: ['@vite/client', '@vite/env'],
    },
  })
}