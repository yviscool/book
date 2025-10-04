import { defineConfig } from 'vite'
import unoCSSPlugin from 'unocss/vite'
import vueComponentsPlugin from 'unplugin-vue-components/vite'
import llmstxt from 'vitepress-plugin-llms'
import viteCompression from 'vite-plugin-compression'
import { groupIconVitePlugin } from 'vitepress-plugin-group-icons'


const isProduction = process.env.NODE_ENV === 'production'


export default defineConfig({
  // 由于部分浏览器环境不支持顶层 await，这里通过 build.target 配置为更高的 ES 版本以支持顶层 await
  build: {
    target: 'esnext',
  },
  // 优化依赖配置，排除 vitepress，避免重复打包
  optimizeDeps: {
    exclude: ['vitepress'],
  },
  // 本地开发服务器配置
  server: {
    host: true, // 允许在局域网内访问
    port: 3000, // 默认开发服务器端口
    strictPort: false, // 如果端口被占用，尝试下一个可用端口
    open: false, // 启动时不自动打开浏览器
    hmr: {
      overlay: false, // 关闭 HMR 错误遮罩，避免影响体验
    },
  },
  // 插件配置，根据是否启用 DaisyUI 动态选择
  plugins: [
    // DaisyUI 模式下仅启用 TailwindCSS
    viteCompression({
      verbose: true,
      disable: false,
      threshold: 10240,
      algorithm: 'gzip',
      ext: '.gz',
    }),
    isProduction ? llmstxt() : [],
    unoCSSPlugin(),
    vueComponentsPlugin({
      // 自动扫描组件目录
      dirs: ['.vitepress/theme/components'],
      // 支持的文件类型
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
    }),
    groupIconVitePlugin({
      customIcon: {
        postcss: 'vscode-icons:file-type-postcss',
      },
    }),
  ],
})