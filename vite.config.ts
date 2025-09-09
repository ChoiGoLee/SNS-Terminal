import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'

export default defineConfig({
  plugins: [
    react(),
    svgr({
      svgrOptions: {
        replaceAttrValues: {
          '#71767B': 'currentColor',
          '#000': 'currentColor',
          '#000000': 'currentColor',
          '#333': 'currentColor',
          '#666': 'currentColor',
          '#999': 'currentColor',
          '#fff': 'currentColor',
          '#ffffff': 'currentColor',
        },
        ref: true,
        titleProp: true,
      },
    }),
  ],
})
