import { defineConfig, DefaultTheme, MarkdownOptions } from 'vitepress'
import { groupIconMdPlugin } from 'vitepress-plugin-group-icons'
import { sidebar as totalSidebar } from './sidebar/index.mts'
/**
 * 导航配置
 */
const nav: DefaultTheme.NavItem[] = [
  { text: '首页', link: '/' },
  { text: '介绍', link: '/introduction' },
  {
    text: '东方',
    items: [
      {
        text: '哲学',
        link: '/eastern/philosophy/',
      },
      {
        text: '术数',
        link: '/eastern/esoterica/',
      },
    ],
    activeMatch: '^/eastern/',
  },
]

/**
 * 合并所有侧边栏配置
 */
const sidebar : DefaultTheme.Sidebar = {
  '/': [
    {
      text: '开始',
      items: [
        { text: '介绍', link: '/introduction' }
      ]
    }
  ],
  ...totalSidebar,
}

/**
 * 搜索配置
 */
const search: DefaultTheme.Config['search'] = {
  provider: 'local',
  options: {
    locales: {
      root: {
        translations: {
          button: {
            buttonText: '搜索',
            buttonAriaLabel: '搜索'
          },
          modal: {
            noResultsText: '无法找到相关结果',
            resetButtonTitle: '清除查询条件',
            footer: {
              selectText: '选择',
              navigateText: '切换',
              closeText: '关闭'
            }
          }
        }
      }
    }
  }
}


/**
 * 社交链接
 */
const socialLinks: DefaultTheme.SocialLink[] = [
  {
    icon: 'gitbook',
    link: 'https://github.com/yviscool/book'
  }
]

/**
 * markdown配置 
 */
const markdownConfig : MarkdownOptions = {
  math: true,
  lineNumbers: true,
  codeCopyButtonTitle: '复制代码',
  container: {
    tipLabel: '提示',
    warningLabel: '注意',
    dangerLabel: '危险',
    infoLabel: '简述',
    detailsLabel: '详情',
    importantLabel: '重要',
    cautionLabel: '警告',
    noteLabel: '注释',
  },
  theme: {
    light: 'github-light',
    dark: 'github-dark',
  },
  image: {
    lazyLoading: true,
  },
  config: (md) => {
    md.use(groupIconMdPlugin)
  }
}

/**
 * 配置
 * https://vitepress.dev/reference/site-config
 */
export default defineConfig({
  // 服务器路径
  base: '/',
  title: "大书书",
  description: "大书书",
  lang: 'zh-CN',
  // 忽略死链接
  ignoreDeadLinks: true,
  // https://vitepress.dev/reference/default-theme-config
  themeConfig: {
    logo: '/logo.png',
    nav,
    sidebar,
    socialLinks,
    search,
    sidebarMenuLabel: '目录',
    lightModeSwitchTitle: '切换到亮色主题',
    darkModeSwitchTitle: '切换到暗色主题',
    darkModeSwitchLabel: '切换主题',
    skipToContentLabel: '跳到内容',
    outline: {
      label: '大纲',
    },
    docFooter: {
      prev: '上一页',
      next: '下一页',
    },
    notFound: {
      title: '未找到页面，迷路了~',
      quote: '不如先去看看首页吧',
      link: '/',
      linkLabel: '返回首页',
      linkText: '返回首页',
    },
    footer: {
      message: '如有任何问题，请联系我们',
      copyright: 'Copyright © 2025 大书书'
    },
  },
  markdown: markdownConfig,
})