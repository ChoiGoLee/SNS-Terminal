import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import svgr from 'vite-plugin-svgr'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
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
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    server: {
      proxy: {
        '/api': {
          target: env.VITE_APP_BASE_URL,
          // ||
          // 'https://dev.wenivops.co.kr/services/mandarin',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''), // /api 제거
          configure: (proxy) => {
            proxy.on('error', (err) => {
              console.log('프록시 에러:', err)
            })
            proxy.on('proxyReq', (proxyReq, req) => {
              console.log(
                '프록시 요청:',
                req.method,
                req.url,
                '→',
                proxyReq.getHeader('host') + proxyReq.path
              )
            })
          },
        },
      },
    },
  }
})
