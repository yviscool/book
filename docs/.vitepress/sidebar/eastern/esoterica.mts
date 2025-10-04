import { DefaultTheme } from 'vitepress'
// 从专属定义文件中导入
import { meihuaishuSidebar } from '../book/eastern/esoterica/meihuaishu.mts'

/**
 * 东方术数领域的侧边栏配置
 * 这个文件负责术数类书籍的集成。
 */
export const easternEsotericaSidebar: DefaultTheme.Sidebar = {
  // 领域根侧边栏
  '/eastern/esoterica/': [
    {
      text: '易学占卜',
      items: [
        {
          text: '梅花易数',
          items: [
            { text: '卷一: 象数易理篇', link: '/eastern/esoterica/meihuaishu/juan1/01' },
            { text: '卷二: 体用生克篇', link: '/eastern/esoterica/meihuaishu/juan2/01' },
            { text: '卷三: 断占总诀篇', link: '/eastern/esoterica/meihuaishu/juan3/01' },
            { text: '卷四: 后天心易篇', link: '/eastern/esoterica/meihuaishu/juan4/01' },
            { text: '卷五: 五行神煞篇', link: '/eastern/esoterica/meihuaishu/juan5/01' },
          ]
        }
      ]
    }
  ],

  // --- 注册书籍专属侧边栏 ---
  '/eastern/esoterica/meihuaishu/': meihuaishuSidebar(),
}