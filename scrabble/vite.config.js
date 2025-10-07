import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/scrabble/',
  plugins: [react()],
  root: 'src',              // Tell Vite src is the root
  publicDir: '../public',   // Point to public folder location
  envDir: '../', 
  build: {
    outDir: '../',          // Build to parent (project root)
    emptyDir: false,        // Don't delete everything
  }
})
