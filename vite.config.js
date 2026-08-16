import path from "path"
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Security headers middleware
const securityHeadersPlugin = () => ({
  name: 'security-headers',
  configureServer(server) {
    server.middlewares.use((req, res, next) => {
      // Content Security Policy
      res.setHeader('Content-Security-Policy', [
        "default-src 'self'",
        "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://prod.spline.design",
        "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
        "font-src 'self' https://fonts.gstatic.com data:",
        "img-src 'self' data: https: blob:",
        "connect-src 'self' https://prod.spline.design",
        "frame-src 'none'",
        "object-src 'none'",
        "base-uri 'self'",
        "form-action 'self'"
      ].join('; '))

      // Security headers
      res.setHeader('X-Frame-Options', 'DENY')
      res.setHeader('X-Content-Type-Options', 'nosniff')
      res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin')
      res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=()')
      next()
    })
  }
})

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    headers: {
      "Cache-Control": "public, max-age=31536000, immutable"
    }
  },
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "./src"),
    },
  },
  build: {
    target: 'es2020',
    cssCodeSplit: true,
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes('three') || id.includes('@react-three/fiber') || id.includes('@react-three/drei')) {
            return 'three'
          }
          if (id.includes('@splinetool/react-spline') || id.includes('@splinetool/runtime')) {
            return 'spline'
          }
          if (id.includes('framer-motion') || id.includes('gsap')) {
            return 'animations'
          }
          if (id.includes('swiper') || id.includes('lucide-react') || id.includes('react-router-dom')) {
            return 'ui'
          }
          if (id.includes('react') && !id.includes('react-dom')) {
            return 'vendor'
          }
          if (id.includes('react-dom')) {
            return 'vendor'
          }
          if (id.includes('node_modules')) {
            return 'vendor'
          }
        }
      }
    }
  }
})