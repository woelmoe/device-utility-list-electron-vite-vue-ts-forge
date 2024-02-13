import { resolve } from 'path'
import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
import { fileURLToPath } from 'node:url'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  main: {
    build: {
      outDir: 'dist/main-process',
      rollupOptions: {
        input: resolve(__dirname, 'main-process')
      }
    },
    plugins: [externalizeDepsPlugin()]
  },
  preload: {
    build: {
      outDir: 'dist/preload'
    },
    plugins: [externalizeDepsPlugin()]
  },
  renderer: {
    build: {
      outDir: 'dist/renderer',
      rollupOptions: {
        moduleContext: (id) => {
          if (id.includes('pdfmake/build/vfs_fonts.js')) {
            return 'window'
          }
          return 'this'
        }
      }
    },
    resolve: {
      alias: [
        {
          find: '@',
          replacement: fileURLToPath(new URL('./src/renderer', import.meta.url))
        },
        {
          find: '@lib',
          replacement: fileURLToPath(
            new URL(
              './src/renderer',
              import.meta.url
            )
          )
        }
      ]
    },
    plugins: [
      vue()
      // eslint()
    ],
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
            @import "./src/renderer/assets/css/_variables.scss";
          `
        }
      }
    }
  }
})
