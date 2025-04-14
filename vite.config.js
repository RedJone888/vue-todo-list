import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

const isGitHubPages = process.env.DEPLOY_TARGET === 'github-pages';
const base = isGitHubPages ? '/vue-todo-list/' : '/';
// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  base
})
