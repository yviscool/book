import { DefaultTheme } from 'vitepress'
// 从专属定义文件中导入
import { zhuangziSidebar } from '../book/eastern/philosophy/zhuangzi.mts'
import { lunyuSidebar } from '../book/eastern/philosophy/lunyu.mts'
import { mengziSidebar } from '../book/eastern/philosophy/mengzi.mts'
import { daodejingSidebar } from '../book/eastern/philosophy/daodejing.mts'

/**
 * 东方哲学领域的侧边栏配置
 * 这个文件现在是“集成器”，负责将不同的书籍侧边栏注册到对应的路由上。
 */
export const easternPhilosophySidebar: DefaultTheme.Sidebar = {
  // 领域根侧边栏
  '/eastern/philosophy/': [
    {
      text: '先秦诸子',
      items: [
        {
          text: '儒家',
          items: [
            { text: '论语', link: '/eastern/philosophy/pre-qin/confucianism/lunyu/' },
            { text: '孟子', link: '/eastern/philosophy/pre-qin/confucianism/mengzi/' },
          ]
        },
        {
          text: '道家',
          items: [
            { text: '庄子', link: '/eastern/philosophy/pre-qin/daoism/zhuangzi/' },
            { text: '道德经', link: '/eastern/philosophy/pre-qin/daoism/daodejing/' },
          ]
        }
      ]
    }
  ],

  // --- 注册书籍专属侧边栏 ---
  '/eastern/philosophy/pre-qin/daoism/zhuangzi/': zhuangziSidebar(), // 只调用，不定义
  '/eastern/philosophy/pre-qin/confucianism/lunyu/': lunyuSidebar(),
  '/eastern/philosophy/pre-qin/confucianism/mengzi/': mengziSidebar(),
  '/eastern/philosophy/pre-qin/daoism/daodejing/': daodejingSidebar(),
  // '/eastern/philosophy/pre-qin/daoism/laozi/': laoziSidebar(),
}