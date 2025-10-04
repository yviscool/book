// docs/.vitepress/sidebar/index.mts

import { DefaultTheme } from 'vitepress'
import { easternPhilosophySidebar } from './eastern/philosophy.mts'
import { easternEsotericaSidebar } from './eastern/esoterica.mts'
// 未来从这里导入更多模块
// import { easternClassicsSidebar } from './eastern/classics.mts'
// import { westernPhilosophySidebar } from './western/philosophy.mts'

/**
 * 聚合所有模块的侧边栏配置
 */
export const sidebar: DefaultTheme.Sidebar = {
  ...easternPhilosophySidebar,
  ...easternEsotericaSidebar,
  // ...easternClassicsSidebar,
  // ...westernPhilosophySidebar
}