---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "东方智慧典籍"
  text: "探索千年智慧，传承文化精髓"
  tagline: 经典典籍阅读与研究平台
  image:
    src: /logo.png
    alt: 东方智慧典籍
    width: 220px
  actions:
    - theme: brand
      text: 开始阅读之旅
      link: /introduction
    - theme: alt
      text: 梅花易数
      link: /eastern/esoterica/meihuaishu/
    - theme: alt
      text: 道家哲学
      link: /eastern/philosophy/daodejing/
    - theme: alt
      text: 儒家经典
      link: /eastern/philosophy/lunyu/

features:
  - icon: '<span class="i-mdi-book-open-page-variant text-2xl text-orange-500"></span>'
    title: 梅花易数
    details: 探索宋代易学大师邵雍的象数哲学体系，学习占卜预测与宇宙观，领悟天人合一的智慧
  - icon: '<span class="i-mdi-feather text-2xl text-green-600"></span>'
    title: 道家哲学
    details: 从道德经到庄子，系统研读道家经典，领悟无为而治、顺应自然的处世智慧
  - icon: '<span class="i-mdi-school text-2xl text-indigo-500"></span>'
    title: 儒家经典
    details: 深入学习论语、孟子等儒家典籍，理解仁义礼智信的核心价值观，培养君子人格
  - icon: '<span class="i-mdi-meditation text-2xl text-purple-500"></span>'
    title: 东方秘术
    details: 研究古代神秘学说，探索阴阳五行、天人感应的哲学思想与实践方法
  - icon: '<span class="i-mdi-brain text-2xl text-blue-500"></span>'
    title: 智慧传承
    details: 系统整理与解读东方哲学典籍，传承千年文化智慧，启迪现代人生
  - icon: '<span class="i-mdi-rocket-launch text-2xl text-pink-500"></span>'
    title: 深度研读
    details: 从入门到精通的阅读路径，结合注释与解读，帮助读者深入理解经典要义

---

<style>
:root {
  --vp-home-hero-name-color: transparent;
  --vp-home-hero-name-background: linear-gradient(120deg, #00ffe7 10%, #1e90ff 50%, #a259ff 90%);
  
  --vp-home-hero-image-background-image: linear-gradient(135deg, rgba(0,255,231,0.25) 0%, rgba(30,144,255,0.18) 60%, rgba(162,89,255,0.15) 100%);
  --vp-home-hero-image-filter: blur(60px) brightness(1.15) saturate(1.2);
  
  /* 添加呼吸动画 */
  --animation-breath-duration: 3s;
}

/* 呼吸动画效果 */
@keyframes breath {
  0%, 100% {
    opacity: 0.8;
    transform: scale(0.98);
  }
  50% {
    opacity: 1;
    transform: scale(1);
  }
}

.VPHomeHero .name,
.VPHomeHero .image {
  animation: breath var(--animation-breath-duration) ease-in-out infinite;
}
</style>