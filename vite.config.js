import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
const path = require('path')
import styleImport, { VantResolve } from 'vite-plugin-style-import'
export default defineConfig({
  base:'/docs/',
  plugins: [vue(), styleImport({ resolves: [VantResolve()] })],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@/assets/common.scss";` //记得这里要写分号
      }
    }
  },
  resolve: {
    alias: {
      '@': path.join(__dirname, 'src')
    },
    extensions: ['.js', '.vue']
  }
})
