import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

const isGitHubPages = process.env.DEPLOY_TARGET === 'github-pages'
const base = isGitHubPages ? '/vue-todo-list/' : '/'

export default defineConfig({
  plugins: [vue()],
  base
})
