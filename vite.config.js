import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/white-label-design-system/',
  plugins: [react()],
})
