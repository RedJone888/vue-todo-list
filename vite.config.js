import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  base: '/' //vercel
  // base: '/vue-todo-list/' //为GitHub Pages设置基础路径
})
