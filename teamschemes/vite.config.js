import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/teamschemes/',
  plugins: [react()],
  root: 'src',
  publicDir: '../public',
  build: {
    outDir: '../',  // Build directly to teamschemes root
    emptyDir: false, // Don't delete everything
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern', // or "modern", "legacy"
      }
    }
  }
})