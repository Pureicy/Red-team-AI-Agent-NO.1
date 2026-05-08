import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  base: process.env.GITHUB_PAGES === 'true' ? '/Red-team-AI-Agent-NO.1/' : '/',
  plugins: [vue()],
  server: {
    host: '0.0.0.0',
    port: 5173
  }
})
