// 引入 Vue 渲染函数和路由组合式 API
import { h, nextTick } from 'vue'
import { useRouter } from 'vitepress'
// 引入默认主题
import DefaultTheme from 'vitepress/theme'
// 引入自定义样式
import './style.css'
// 引入 unocss 样式
import 'virtual:uno.css'
// 引入 group-icons 样式
import 'virtual:group-icons.css'


// 导出主题配置，支持自定义增强
export default {
   ...DefaultTheme,
   // 增加全局布局组件，用于路由权限判断
//    Layout() {
//       return h(DefaultTheme.Layout)
//    },
   /**
    * VitePress 应用增强钩子
    * @param {Object} param0
    * @param {import('vue').App} param0.app - Vue 应用实例
    */
   async enhanceApp({ app, router }) {
      // 设置全局属性

      // 可在此处添加全局组件、指令等自定义逻辑
   }
}