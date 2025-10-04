// docs/.vitepress/sidebar/book/eastern/philosophy/lunyu.mts

import { createBookSidebar } from '../../../utils.mts'

// 1. 定义基础路径 (必须与内容路径完全一致)
const basePath = '/eastern/philosophy/pre-qin/confucianism/lunyu/'

// 2. 定义章节数据
const chapterGroups = [
  {
    text: '卷一',
    collapsed: false,
    chapters: [
      { slug: '01-xueer', title: '学而第一' },
      { slug: '02-weiwen', title: '为政第二' },
      { slug: '03-bayi', title: '八佾第三' },
      { slug: '04-liren', title: '里仁第四' },
    ],
  },
  {
    text: '卷二',
    collapsed: false,
    chapters: [
      { slug: '05-gongyechang', title: '公冶长第五' },
      { slug: '06-yongye', title: '雍也第六' },
      { slug: '07-shuerm', title: '述而第七' },
      { slug: '08-taibo', title: '泰伯第八' },
      { slug: '09-zihan', title: '子罕第九' },
    ],
  },
  {
    text: '卷三',
    collapsed: false,
    chapters: [
      { slug: '10-xiangdang', title: '乡党第十' },
      { slug: '11-xianjin', title: '先进第十一' },
      { slug: '12-yanyuan', title: '颜渊第十二' },
      { slug: '13-zilu', title: '子路第十三' },
      { slug: '14-xianwen', title: '宪问第十四' },
    ],
  },
  {
    text: '卷四',
    collapsed: false,
    chapters: [
      { slug: '15-weilingong', title: '卫灵公第十五' },
      { slug: '16-jishi', title: '季氏第十六' },
      { slug: '17-yanghuo', title: '阳货第十七' },
      { slug: '18-weizi', title: '微子第十八' },
      { slug: '19-ziwen', title: '子张第十九' },
      { slug: '20-yaoyue', title: '尧曰第二十' },
    ],
  }
]

// 3. 导出调用辅助函数生成的侧边栏
export const lunyuSidebar = () => createBookSidebar('《论语》', basePath, chapterGroups)