import { DefaultTheme } from 'vitepress'

// 为章节数据定义清晰的类型
interface Chapter {
  slug: string; // 文件名 (不含 .md)
  title: string; // 显示的标题
}

// 为章节组定义类型
interface ChapterGroup {
  text: string; // 分组标题 (如 "内篇")
  collapsed?: boolean; // 是否默认折叠
  chapters: Chapter[];
}

/**
 * 创建一本书的专属侧边栏
 * @param bookTitle 书籍主标题 (如 "《庄子》")
 * @param basePath 书籍内容的基础路径 (必须以 / 结尾)
 * @param chapterGroups 章节数据分组
 * @returns {DefaultTheme.SidebarItem[]} VitePress 格式的侧边栏数组
 */
export function createBookSidebar(
  bookTitle: string,
  basePath: string,
  chapterGroups: ChapterGroup[]
): DefaultTheme.SidebarItem[] {
  // 初始化侧边栏，第一项永远是书籍标题和总览链接
  const sidebar: DefaultTheme.SidebarItem[] = [
    {
      text: bookTitle,
      items: [{ text: '总览', link: basePath }],
    },
  ];

  // 用于全局章节计数
  let chapterCounter = 1;

  // 遍历章节分组数据，生成对应的侧边栏项目
  chapterGroups.forEach(group => {
    sidebar.push({
      text: group.text,
      collapsed: group.collapsed ?? true, // 如果未指定，则默认折叠
      items: group.chapters.map(chapter => {
        const item = {
          text: `${chapterCounter}. ${chapter.title}`,
          link: `${basePath}${chapter.slug}`,
        };
        chapterCounter++; // 计数器递增
        return item;
      }),
    });
  });

  return sidebar;
}