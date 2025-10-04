import { createBookSidebar } from '../../../utils.mts'

// 1. 定义本书内容的基础路径
const basePath = '/eastern/philosophy/pre-qin/daoism/zhuangzi/'

// 2. 定义本书的章节数据
const chapterGroups = [
  {
    text: '内篇',
    collapsed: false,
    chapters: [
      { slug: '01-xiaoyaoyou', title: '逍遥游' },
      { slug: '02-qiwlun', title: '齐物论' },
      { slug: '03-yangshengzhu', title: '养生主' },
      { slug: '04-renjianshi', title: '人间世' },
      { slug: '05-dechongfu', title: '德充符' },
      { slug: '06-dazongshi', title: '大宗师' },
      { slug: '07-yingdiwang', title: '应帝王' },
    ],
  },
  {
    text: '外篇',
    collapsed: true,
    chapters: [
      { slug: '08-pianmu', title: '骈拇' },
      { slug: '09-mati', title: '马蹄' },
      { slug: '10-quqie', title: '胠箧' },
      { slug: '11-zaiyou', title: '在宥' },
      { slug: '12-tiandi', title: '天地' },
      { slug: '13-tiandao', title: '天道' },
      { slug: '14-tianyun', title: '天运' },
      { slug: '15-keyi', title: '刻意' },
      { slug: '16-shanxing', title: '缮性' },
      { slug: '17-qiushui', title: '秋水' },
      { slug: '18-zhile', title: '至乐' },
      { slug: '19-dasheng', title: '达生' },
      { slug: '20-shanmu', title: '山木' },
      { slug: '21-tianzifang', title: '田子方' },
      { slug: '22-zhibeiyou', title: '知北游' },
    ],
  },
  {
    text: '杂篇',
    collapsed: true,
    chapters: [
      { slug: '23-gengsangchu', title: '庚桑楚' },
      { slug: '24-xuwugui', title: '徐无鬼' },
      { slug: '25-zeiyang', title: '则阳' },
      { slug: '26-waiwu', title: '外物' },
      { slug: '27-yuyan', title: '寓言' },
      { slug: '28-rangwang', title: '让王' },
      { slug: '29-daozhi', title: '盗跖' },
      { slug: '30-shuojian', title: '说剑' },
      { slug: '31-yufu', title: '渔父' },
      { slug: '32-lieyukou', title: '列御寇' },
      { slug: '33-tianxia', title: '天下' },
    ],
  },
]

// 3. 导出调用辅助函数生成的侧边栏
export const zhuangziSidebar = () => createBookSidebar('《庄子》', basePath, chapterGroups)