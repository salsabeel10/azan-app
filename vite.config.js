import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),

    // === PWA plugin ===
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: [
        'favicon.ico',
        'apple-touch-icon.png',
        'mask-icon.svg',
      ],
      manifest: {
        name: 'Prayer Times',
        short_name: 'Azan',
        start_url: '/',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#0f172a',
        icons: [
          {
            src: '/pwa-192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/pwa-512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },

      // Optional: cache API responses as backup
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}'],

        runtimeCaching: [
          {
            urlPattern: ({ url }) => url.origin === 'https://api.aladhan.com',
            handler: 'NetworkFirst',
            options: {
              cacheName: 'prayer-api-cache',
              expiration: {
                maxEntries: 20,
                maxAgeSeconds: 24 * 60 * 60, // 1 day
              },
            },
          },
        ],
      },
    }),
  ],
})
