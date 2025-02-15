import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from "vite-plugin-svgr"

// https://vite.dev/config/
export default defineConfig({
  base: 'my-weather-app',
  plugins: [react(), svgr()], // 將兩個插件放在同一個陣列中
})
