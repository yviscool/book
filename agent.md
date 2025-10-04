### 知识库总分类指南 (Master Classification Guide)

**版本:** 1.0
**最后更新:** 2025年10月4日

#### 1.0 指南目的与定位

本指南旨在为您（AI）提供一个宏观的、稳定的知识分类框架。它是您在整合任何新内容之前，**必须首先参考**的“世界地图”。

  * 本指南定义了知识库的**目录结构**和**划分关系**。
  * 它负责解答“**这本书应该放在哪里？**”的战略问题。
  * 在确定书籍的正确位置后，您才应转而查阅《内容整合标准作业流程 (SOP)》来执行具体的技术操作。

**关系：本指南决定“去哪里”，SOP 指导“怎么走”。**

#### 2.0 顶层目录结构 (Top-Level Directory Structure)

知识库的根 `docs/` 目录下，有三个最顶层的分类，它们基于文明的起源和范畴，是最大、最稳定的划分。

```
docs/
├── eastern/      # 东方文明
├── western/      # 西方文明
└── comparative/  # 比较研究与全球性议题
```

  * `eastern/` (东方文明):

      * **范畴**: 涵盖源于亚洲的文明体系，主要以中华文明为核心，并辐射至日本、韩国、东南亚，以及独立的印度文明等。
      * **关键词**: 诸子百家、儒释道、唐诗宋词、二十四史、印度教、佛教。

  * `western/` (西方文明):

      * **范畴**: 涵盖源于古希腊-罗马，发展于欧洲，并延伸至北美等地区的文明体系。
      * **关键词**: 希腊哲学、罗马法、基督教、文艺复兴、启蒙运动、分析哲学。

  * `comparative/` (比较研究):

      * **范畴**: 用于存放**明确以跨文明比较为主题**的著作，或无法简单归入某一文明的全球性、现代性议题。
      * **决策标准**: 当一本书的主旨是“比较中西哲学异同”、“论全球化历史”或“现代性的多重起源”时，应放入此目录。

#### 3.0 二级领域划分 (Second-Level Domain Division)

在 `eastern/` 和 `western/` 内部，我们按学科领域进行第二次划分。这是知识的“经纬线”。

```
eastern/
├── classics/        # 经部 (Foundational Classics)
├── philosophy/      # 哲部/思部 (Philosophy)
├── history/         # 史部 (History)
├── governance/      # 政部/经世 (Governance & Statecraft)
└── literature/      # 文部/集部 (Literature)
```

*(注：`western/` 目录下也遵循类似的划分，如 `political-science` 对应 `governance`)*

  * `classics/` (经部):

      * **定位**: **元典**。存放对整个文明具有奠基性、源头性影响，其内容超越了单一学科范畴的根本性著作。
      * **决策标准**: 当一部著作本身就是后续大量哲学、历史、文学作品的引用和阐释的源头时，它属于 `classics`。
      * **示例**: 东方的《易经》、《论语》、《道德经》；西方的《圣经》、《荷马史诗》。

  * `philosophy/` (哲部):

      * **定位**: **思想与智慧**。存放探讨世界本源、知识、价值、伦理、逻辑、心灵等根本问题的著作。
      * **示例**: 《庄子》、《理想国》、《纯粹理性批判》。

  * `history/` (史部):

      * **定位**: **记录与叙事**。存放记录、考证、阐述人类过往事件、制度、社会变迁的著作。
      * **示例**: 《史记》、《罗马帝国衰亡史》。

  * `governance/` / `political-science/` (政部):

      * **定位**: **制度与权力**。存放关于国家治理、法律制度、权力结构、社会契约、国际关系等理论与实践的著作。
      * **决策标准**: 相较于 `philosophy` 的思辨性，此领域更侧重于**权力的组织和运用**。
      * **示例**: 《韩非子》、《君主论》、《社会契约论》。

  * `literature/` (文部):

      * **定位**: **审美与艺术**。存放以语言为媒介，具有高度审美价值的虚构或非虚构作品，如诗歌、小说、戏剧、散文等。
      * **示例**: 《红楼梦》、《哈姆雷特》。

#### 4.0 三级分类：时期与学派 (Third-Level Classification)

在二级领域内部，我们按“历史时期”和“学派/流派”进行更精细的划分。这部分是动态扩展的，但应遵循既定模式。

  * **哲学领域示例**:

      * `eastern/philosophy/`: `pre-qin` (先秦), `han-tang` (汉唐), `song-ming` (宋明), `modern` (近现代) ...
          * `pre-qin/`: `confucianism`, `daoism`, `legalism`, `mohism` ...
      * `western/philosophy/`: `ancient-greek`, `roman`, `medieval`, `enlightenment`, `modern` ...
          * `ancient-greek/`: `platonism`, `aristotelianism` ...

  * **历史领域示例**:

      * `eastern/history/`: 按朝代划分，如 `qin-han` (秦汉), `tang` (唐), `song` (宋) ...
      * `western/history/`: 按时期划分，如 `ancient-rome`, `middle-ages`, `20th-century` ...

#### 5.0 分类决策流程

在拿到一本新书时，请严格按照以下顺序进行提问和决策：

1.  **【全球性议题？】** -\> 这本书的核心是跨文明比较或全球性议题吗？

      * 是 -\> 放入 `comparative/`。**流程结束**。
      * 否 -\> 进入下一步。

2.  **【文明归属？】** -\> 这本书起源于哪个主要文明体系？

      * 答案 -\> `eastern` 或 `western`。**确定一级目录**。

3.  **【核心领域？】** -\> (参照 3.0 定义) 这本书是元典、哲学思辨、历史叙事、政治制度还是文学艺术？

      * 答案 -\> `classics`, `philosophy`, `history`, `governance`, `literature`。**确定二级目录**。

4.  **【时代与流派？】** -\> (参照 4.0 模式) 这本书属于哪个具体的历史时期？哪个思想流派或学派？

      * 答案 -\> 如 `pre-qin/confucianism`。**确定三级及以下目录**。

5.  **【最终路径确认】** -\> 组合以上答案，得到最终的“内容路径”。

6.  **【转至SOP】** -\> 现在，您已完成战略定位，请打开《内容整合标准作业流程 (SOP)》，从第一步“路径规划”开始，执行具体的技术操作。

**本指南结束。**


 **AI 标准作业流程 (SOP)**。

这份指南将是您未来添加任何新书籍时，都必须严格遵守的唯一准则。

-----

### AI 知识库内容整合标准作业流程 (SOP)

**版本:** 2.0
**最后更新:** 2025年10月4日

#### 1.0 核心原则

本知识库的架构基于以下三大核心原则，您的所有操作都必须体现这些原则：

1.  **模块化 (Modularity):** 每本书的内容和侧边栏配置都是独立的模块。内容、定义、集成三者分离。
2.  **约定优于配置 (Convention over Configuration):** 我们约定了文件和侧边栏的生成规则，您只需提供最核心的“数据”，而不是重复编写“配置”。
3.  **DRY (Don't Repeat Yourself):** 杜绝重复。通过 `utils.mts` 中的辅助函数，避免在配置文件中重复书写冗长的路径。

#### 2.0 必备文件结构认知

在开始操作前，您必须理解三个关键目录之间的“镜像”关系：

1.  **内容目录 (Content):** 存放书籍 `.md` 文件的位置。

      * `docs/`
          * `└── eastern/`
              * `└── philosophy/`
                  * `└── .../`
                      * `└── zhuangzi/`

2.  **侧边栏定义目录 (Sidebar Definitions):** 存放书籍专属侧边栏“数据”的位置。

      * `docs/.vitepress/sidebar/`
          * `└── book/`
              * `└── eastern/`
                  * `└── philosophy/`
                      * `└── zhuangzi.mts`

3.  **侧边栏集成目录 (Sidebar Integrators):** 存放领域侧边栏“集成配置”的位置。

      * `docs/.vitepress/sidebar/`
          * `└── eastern/`
              * `└── philosophy.mts`

**核心关系：** `book` 目录下的结构，精确地镜像了 `docs` 目录下的内容结构。`eastern`, `western` 等目录下的文件，则是对应领域的“集成器”。

-----

#### 3.0 标准作业流程 (Standard Operating Procedure)

我们将以添加一本新书 **《孟子》** 为例，完整演示五个步骤。

##### **第一步：定位与路径规划 (Positioning and Path Planning)**

这是操作前的思考步骤，必须明确三个核心路径。

1.  **分析书籍:**

      * 书名: 《孟子》(Mencius)
      * 文明: `eastern`
      * 领域: `philosophy`
      * 时期/学派: `pre-qin` / `confucianism` (儒家)

2.  **规划路径:**

      * **内容路径:** `/eastern/philosophy/pre-qin/confucianism/mencius/`
      * **定义文件路径:** `docs/.vitepress/sidebar/book/eastern/philosophy/mencius.mts`
      * **集成文件路径:** `docs/.vitepress/sidebar/eastern/philosophy.mts`

##### **第二步：创建内容文件与目录 (Create Content Files & Directory)**

1.  根据“内容路径”创建目录： `docs/eastern/philosophy/pre-qin/confucianism/mencius`。
2.  在该目录下，创建书籍的 `index.md`（总览页）和所有章节的 `.md` 文件。
    ```
    mencius/
    ├── index.md
    ├── 01-lianghuiwang-shang.md
    ├── 02-lianghuiwang-xia.md
    ├── 03-gongsun-chou-shang.md
    ├── 04-gongsun-chou-xia.md
    ├── 05-tengwen-gong-shang.md
    ├── 06-tengwen-gong-xia.md
    ├── 07-li-lou-shang.md
    ├── 08-li-lou-xia.md
    ├── 09-wan-zhang-shang.md
    ├── 10-wan-zhang-xia.md
    ├── 11-gaozi-shang.md
    ├── 12-gaozi-xia.md
    ├── 13-jinxin-shang.md
    └── 14-jinxin-xia.md
    ```
3.  为每个 `.md` 文件（包括 `index.md`）添加标准的 Frontmatter 元数据。

index.md  示例

```md
---
title: '庄子 (Zhuangzi)'
---

# 《庄子》

## 目录

### 内篇

- [逍遥游](./01-xiaoyaoyou.md)
- [齐物论](./02-qiwlun.md)
- [养生主](./03-yangshengzhu.md)
- [人间世](./04-renjianshi.md)
- [德充符](./05-dechongfu.md)
- [大宗师](./06-dazongshi.md)
- [应帝王](./07-yingdiwang.md)

### 外篇

- [骈拇](./08-pianmu.md)
- [马蹄](./09-mati.md)
- [胠箧](./10-quqie.md)
- [在宥](./11-zaiyou.md)
- [天地](./12-tiandi.md)
- [天道](./13-tiandao.md)
- [天运](./14-tianyun.md)
- [刻意](./15-keyi.md)
- [缮性](./16-shanxing.md)
- [秋水](./17-qiushui.md)
- [至乐](./18-zhile.md)
- [达生](./19-dasheng.md)
- [山木](./20-shanmu.md)
- [田子方](./21-tianzifang.md)
- [知北游](./22-zhibeiyou.md)

### 杂篇

- [庚桑楚](./23-gengsangchu.md)
- [徐无鬼](./24-xuwugui.md)
- [则阳](./25-zeiyang.md)
- [外物](./26-waiwu.md)
- [寓言](./27-yuyan.md)
- [让王](./28-rangwang.md)
- [盗跖](./29-daozhi.md)
- [说剑](./30-shuojian.md)
- [渔父](./31-yufu.md)
- [列御寇](./32-lieyukou.md)
- [天下](./33-tianxia.md)
```

01-xiaoyaoyou.md 内容示例
```md
---
title: "逍遥游 (Free and Easy Wandering)"
description: 关于自由自在的境界和无为的思想
outline: deep
---
```


##### **第三步：创建“侧边栏定义”文件 (Create "Sidebar Definition" File)**

这是您的**核心任务**。您需要将书籍的目录结构，转化为纯粹的“数据”。

1.  根据“定义文件路径”，创建 `docs/.vitepress/sidebar/book/eastern/philosophy/mencius.mts`。
2.  使用以下模板填充内容。您的工作是准确填写 `basePath` 和 `chapterGroups`。

<!-- end list -->

```typescript
// docs/.vitepress/sidebar/book/eastern/philosophy/mencius.mts

import { createBookSidebar } from '../../../utils.mts'

// 1. 定义基础路径 (必须与内容路径完全一致)
const basePath = '/eastern/philosophy/pre-qin/confucianism/mencius/'

// 2. 定义章节数据
const chapterGroups = [
  {
    text: '卷一', // 《孟子》通常按篇章分，这里可灵活处理
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
  // ... 以此类推，完成所有14个章节的数据定义
  {
    text: '卷七',
    collapsed: false,
    chapters: [
       { slug: '13-jinxin-shang', title: '尽心上' },
       { slug: '14-jinxin-xia', title: '尽心下' },
    ]
  }
]

// 3. 导出调用辅助函数生成的侧边栏
export const menciusSidebar = () => createBookSidebar('《孟子》', basePath, chapterGroups)

```

##### **第四步：更新“侧边栏集成”文件 (Update "Sidebar Integration" File)**

1.  根据“集成文件路径”，打开 `docs/.vitepress/sidebar/eastern/philosophy.mts`。
2.  **导入** 新创建的侧边栏定义。
3.  **注册** 新书的侧边栏。

**修改示例 `philosophy.mts`:**

```typescript
import { DefaultTheme } from 'vitepress'
import { zhuangziSidebar } from '../../book/eastern/philosophy/zhuangzi.mts'
import { menciusSidebar } from '../../book/eastern/philosophy/mencius.mts' // <--- 1. 导入

export const easternPhilosophySidebar: DefaultTheme.Sidebar = {
  '/eastern/philosophy/': [
    {
      text: '先秦诸子',
      items: [
        {
          text: '儒家', // 如果“儒家”不存在，则创建
          items: [
            // { text: '论语', link: '...' },
            { text: '孟子', link: '/eastern/philosophy/pre-qin/confucianism/mencius/' }, // <--- 2. 在学派下添加入口
          ]
        },
        {
          text: '道家',
          items: [
            { text: '庄子', link: '/eastern/philosophy/pre-qin/daoism/zhuangzi/' },
          ]
        }
      ]
    }
  ],
  
  // --- 注册书籍专属侧边栏 ---
  '/eastern/philosophy/pre-qin/daoism/zhuangzi/': zhuangziSidebar(),
  '/eastern/philosophy/pre-qin/confucianism/mencius/': menciusSidebar(), // <--- 3. 注册专属侧边栏
}
```

**注意:** 如果 `philosophy.mts` 或 `儒家` 条目尚不存在，您的任务也包括创建它们。如果创建了全新的集成文件（如 `history.mts`），请记得在顶层聚合器 `index.mts` 中导入并注册它。

##### **第五步：最终验证 (Final Verification)**

执行一个快速的检查清单，确保所有操作正确无误：

  - [ ] **路径一致性**: `basePath` 是否与 `index.md` 所在目录的 URL 路径完全匹配？
  - [ ] **链接正确性**: 侧边栏中的章节链接，点击后能否正确导航到对应的 `.md` 文件？
  - [ ] **导入无误**: “集成文件”是否正确 `import` 了“定义文件”？
  - [ ] **注册无误**: “集成文件”是否已将新书的专属侧边栏注册到正确的 URL Key 下？

-----

#### 4.0 附录：`utils.mts` 辅助函数参考

此文件是本架构的基石，除非有新的功能需求，否则不应改动。

`docs/.vitepress/sidebar/utils.mts`

```typescript
import { DefaultTheme } from 'vitepress'

interface Chapter {
  slug: string;
  title: string;
}

interface ChapterGroup {
  text: string;
  collapsed?: boolean;
  chapters: Chapter[];
}

export function createBookSidebar(
  bookTitle: string,
  basePath: string,
  chapterGroups: ChapterGroup[]
): DefaultTheme.SidebarItem[] {
  const sidebar: DefaultTheme.SidebarItem[] = [
    {
      text: bookTitle,
      items: [{ text: '总览', link: basePath }],
    },
  ];

  let chapterCounter = 1;

  chapterGroups.forEach(group => {
    sidebar.push({
      text: group.text,
      collapsed: group.collapsed ?? true,
      items: group.chapters.map(chapter => {
        const item = {
          text: `${chapterCounter}. ${chapter.title}`,
          link: `${basePath}${chapter.slug}`,
        };
        chapterCounter++;
        return item;
      }),
    });
  });

  return sidebar;
}
```

**本 SOP 指南结束。请严格遵照此流程执行所有未来的内容整合任务。**