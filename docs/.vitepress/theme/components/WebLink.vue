<!--
组件：WebLink
功能：网站链接预览组件，显示标题、简介和图标

使用示例：
<WebLink url="https://www.bilibili.com" />
<WebLink url="https://www.zhihu.com" title="自定义知乎标题" />
<WebLink 
  url="https://github.com" 
  title="GitHub" 
  description="全球最大的代码托管平台" 
  icon="https://github.githubassets.com/favicons/favicon.svg"
  theme="success"
/>

参数说明：
url: 网站URL 必选
title: 网站标题 可选 不提供则使用默认值
description: 网站描述 可选 不提供则使用默认值
icon: 网站图标URL 可选 不提供则使用默认值
theme: 主题色 可选 默认为primary
tooltip: 是否显示悬停提示 可选 默认为true
visitTooltip: 访问按钮的提示文本 可选 默认为"访问网站"
contentTooltip: 内容区域的提示文本 可选 默认为"点击打开网页链接"
-->

<template>
  <div class="font-sans relative my-4">
    <a :href="url" target="_blank" rel="noopener noreferrer" 
       class="flex items-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 ease-in-out hover:translate-y-[-2px] !no-underline !text-gray-800 dark:!text-gray-200">
      <!-- 左侧图标 -->
      <div class="flex items-center justify-center w-12 h-12 rounded-lg overflow-hidden bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 mr-4 relative"
           ref="iconRef"
           @mouseenter="showIconTooltip = true" 
           @mouseleave="showIconTooltip = false">
        <img v-if="computedIcon" :src="computedIcon" alt="网站图标" class="w-full h-full object-contain p-1" />
        <div v-else class="flex items-center justify-center w-full h-full bg-gray-100 dark:bg-gray-600 text-gray-500 dark:text-gray-300 text-2xl">
          <span class="i-mdi-web"></span>
        </div>
      </div>
      
      <!-- 中间内容区 -->
      <div class="flex-1 min-w-0 overflow-hidden cursor-pointer group"
           ref="contentRef"
           @mouseenter="showContentTooltip = true" 
           @mouseleave="showContentTooltip = false">
        <div class="font-medium text-base mb-1 whitespace-nowrap overflow-hidden text-ellipsis"
             ref="titleRef"
             @mouseenter="showTitleTooltip = true" 
             @mouseleave="showTitleTooltip = false">
          {{ computedTitle }}
        </div>
        <div class="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 break-words">{{ computedDescription }}</div>
      </div>
      
      <!-- 右侧访问按钮 -->
      <div :class="['w-10 h-10 flex items-center justify-center rounded-full text-white text-xl transition-transform duration-200 hover:scale-110', themeColorClass]"
           ref="visitRef"
           @mouseenter="showVisitTooltip = true" 
           @mouseleave="showVisitTooltip = false">
        <span class="i-mdi-open-in-new"></span>
      </div>
    </a>
  </div>
  
  <!-- Tooltips -->
  <Teleport to="body">
    <!-- 图标提示 -->
    <div v-if="props.tooltip && showIconTooltip && iconRef" 
         class="fixed bg-gray-800 dark:bg-gray-700 text-white text-xs rounded py-1 px-2 whitespace-nowrap z-50 tooltip-transition"
         :style="getTooltipStyle(iconRef)">
      {{ getDomain(url) }}
    </div>
    
    <!-- 标题提示（当标题被截断时） -->
    <div v-if="props.tooltip && showTitleTooltip && titleRef && isTitleTruncated" 
         class="fixed bg-gray-800 dark:bg-gray-700 text-white text-xs rounded py-1 px-2 whitespace-nowrap z-50 tooltip-transition"
         :style="getTooltipStyle(titleRef)">
      {{ computedTitle }}
    </div>
    
    <!-- 内容区域提示 -->
    <div v-if="props.tooltip && showContentTooltip && contentRef" 
         class="fixed bg-gray-800 dark:bg-gray-700 text-white text-xs rounded py-1 px-2 whitespace-nowrap z-50 tooltip-transition"
         :style="getTooltipStyle(contentRef, 'bottom')">
      {{ props.contentTooltip }}
    </div>
    
    <!-- 访问按钮提示 -->
    <div v-if="props.tooltip && showVisitTooltip && visitRef" 
         class="fixed bg-gray-800 dark:bg-gray-700 text-white text-xs rounded py-1 px-2 whitespace-nowrap z-50 tooltip-transition"
         :style="getTooltipStyle(visitRef)">
      {{ props.visitTooltip }}
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, computed, nextTick, onMounted } from 'vue'

// 定义组件属性
const props = defineProps({
  url: {
    type: String,
    required: true
  },
  title: {
    type: String,
    default: ''
  },
  description: {
    type: String,
    default: ''
  },
  icon: {
    type: String,
    default: ''
  },
  theme: {
    type: String,
    default: 'primary',
    validator: (value) => ['primary', 'success', 'warning', 'danger', 'info'].includes(value)
  },
  tooltip: {
    type: Boolean,
    default: true
  },
  visitTooltip: {
    type: String,
    default: '访问网站'
  },
  contentTooltip: {
    type: String,
    default: '点击打开网页链接'
  }
})

// DOM引用
const iconRef = ref(null)
const titleRef = ref(null)
const contentRef = ref(null)
const visitRef = ref(null)

// Tooltip状态
const showIconTooltip = ref(false)
const showTitleTooltip = ref(false)
const showContentTooltip = ref(false)
const showVisitTooltip = ref(false)
const isTitleTruncated = ref(false)

// 预设网站信息
const websitePresets = {
  'bilibili.com': {
    title: '哔哩哔哩 (゜-゜)つロ 干杯~-bilibili',
    description: '哔哩哔哩是国内知名的视频弹幕网站，这里有及时的动漫新番，活跃的ACG氛围，有创意的Up主。',
    icon: 'https://www.bilibili.com/favicon.ico'
  },
  'zhihu.com': {
    title: '知乎 - 有问题，就会有答案',
    description: '知乎，中文互联网高质量的问答社区和创作者聚集的原创内容平台，于 2011 年 1 月正式上线。',
    icon: 'https://static.zhihu.com/heifetz/favicon.ico'
  },
  'github.com': {
    title: 'GitHub: Where the world builds software',
    description: 'GitHub是全球最大的软件开发平台，超过1亿开发者在这里共同构建未来的软件。',
    icon: 'https://github.githubassets.com/favicons/favicon.svg'
  }
}

// 获取域名
function getDomain(url) {
  if (!url) return ''
  
  try {
    // 添加协议前缀，如果没有
    if (!url.match(/^https?:\/\//)) {
      url = 'https://' + url
    }
    
    const urlObj = new URL(url)
    let domain = urlObj.hostname
    
    // 去掉www前缀
    if (domain.startsWith('www.')) {
      domain = domain.substring(4)
    }
    
    return domain
  } catch (e) {
    return url.replace(/^https?:\/\//, '').replace(/\/.*$/, '')
  }
}

// 获取当前网站的预设信息
const currentWebsite = computed(() => {
  const domain = getDomain(props.url)
  
  // 查找匹配的预设网站
  for (const [key, value] of Object.entries(websitePresets)) {
    if (domain.includes(key)) {
      return value
    }
  }
  
  // 没有匹配的预设，返回默认值
  return {
    title: domain,
    description: '',
    icon: `https://${domain}/favicon.ico`
  }
})

// 计算最终标题、描述和图标
const computedTitle = computed(() => props.title || currentWebsite.value.title)
const computedDescription = computed(() => props.description || currentWebsite.value.description)
const computedIcon = computed(() => props.icon || currentWebsite.value.icon)

// 根据主题获取Tailwind颜色类
const themeColorClass = computed(() => {
  switch (props.theme) {
    case 'success': return 'bg-emerald-500 dark:bg-emerald-600'
    case 'warning': return 'bg-amber-500 dark:bg-amber-600'
    case 'danger': return 'bg-rose-500 dark:bg-rose-600'
    case 'info': return 'bg-violet-500 dark:bg-violet-600'
    default: return 'bg-blue-500 dark:bg-blue-600' // primary
  }
})

// 检查标题是否被截断
function checkTitleTruncation() {
  if (titleRef.value) {
    const element = titleRef.value
    isTitleTruncated.value = element.scrollWidth > element.clientWidth
  }
}

// 计算tooltip位置
function getTooltipStyle(elementRef, position = 'top') {
  if (!elementRef) return {}
  
  const rect = elementRef.getBoundingClientRect()
  const style = {
    left: `${rect.left + rect.width / 2}px`,
  }
  
  if (position === 'top') {
    style.top = `${rect.top - 8}px`
    style.transform = 'translate(-50%, -100%)'
  } else if (position === 'bottom') {
    style.top = `${rect.bottom + 8}px`
    style.transform = 'translate(-50%, 0)'
  }
  
  return style
}

// 组件挂载后检查标题是否截断
onMounted(() => {
  nextTick(() => {
    checkTitleTruncation()
    
    // 添加窗口大小变化事件以重新检查
    window.addEventListener('resize', checkTitleTruncation)
  })
})
</script>

<style scoped>
.tooltip-transition {
  transition: opacity 0.2s ease;
  animation: tooltip-fade-in 0.2s ease;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

@keyframes tooltip-fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}
</style> 