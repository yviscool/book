// docs/.vitepress/sidebar/book/eastern/philosophy/mengzi.mts

import { createBookSidebar } from '../../../utils.mts'

// 1. 定义基础路径 (必须与内容路径完全一致)
const basePath = '/eastern/philosophy/pre-qin/confucianism/mengzi/'

// 2. 定义章节数据
const chapterGroups = [
  {
    text: '卷一',
    collapsed: false,
    chapters: [
      { slug: '01-lianghuiwang-shang', title: '梁惠王上' },
      { slug: '02-lianghuiwang-xia', title: '梁惠王下' },
    ],
  },
  {
    text: '卷二',
    collapsed: false,
    chapters: [
      { slug: '03-gongsun-chou-shang', title: '公孙丑上' },
      { slug: '04-gongsun-chou-xia', title: '公孙丑下' },
    ],
  },
  {
    text: '卷三',
    collapsed: false,
    chapters: [
      { slug: '05-tengwen-gong-shang', title: '滕文公上' },
      { slug: '06-tengwen-gong-xia', title: '滕文公下' },
    ],
  },
  {
    text: '卷四',
    collapsed: false,
    chapters: [
      { slug: '07-li-lou-shang', title: '离娄上' },
      { slug: '08-li-lou-xia', title: '离娄下' },
    ],
  },
  {
    text: '卷五',
    collapsed: false,
    chapters: [
      { slug: '09-wan-zhang-shang', title: '万章上' },
      { slug: '10-wan-zhang-xia', title: '万章下' },
    ],
  },
  {
    text: '卷六',
    collapsed: false,
    chapters: [
      { slug: '11-gaozi-shang', title: '告子上' },
      { slug: '12-gaozi-xia', title: '告子下' },
    ],
  },
  {
    text: '卷七',
    collapsed: false,
    chapters: [
      { slug: '13-jinxin-shang', title: '尽心上' },
      { slug: '14-jinxin-xia', title: '尽心下' },
    ],
  }
]

// 3. 导出调用辅助函数生成的侧边栏
export const mengziSidebar = () => createBookSidebar('《孟子》', basePath, chapterGroups)