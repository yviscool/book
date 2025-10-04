<!--
组件：FileDownload
功能：美化文件下载体验

使用示例
<FileDownload :file="file" :fileName="fileName" :fileIcon="fileIcon" :fileSize="fileSize" :showProgress="showProgress" :theme="theme" :card="card" />
<FileDownload file="/path/to/document.pdf" />
<FileDownload file="/path/to/image.jpg" theme="success" />
<FileDownload :file="{ url: '/files/document.docx', name: '报告.docx' }" :fileSize="1048576" />
<FileDownload file="/path/to/document.pdf" customTooltip="下载PDF文档" />

参数说明：
file: 文件路径或文件对象数组 必选
fileName: 下载时使用的文件名 可选 默认为原文件名
fileIcon: 自定义文件图标 可选 默认根据文件类型自动选择图标
fileSize: 文件大小(字节) 可选 默认不显示
showProgress: 是否显示下载进度 可选 默认为true
theme: 主题色 可选 默认为空字符串，表示自动根据文件类型选择
card: 是否使用卡片样式 可选 默认为true
customTooltip: 自定义提示文本 可选 默认为"点击下载"

文件类型默认配色方案：
- 图片文件(jpg,png等): 蓝色(primary)
- 文档文件(pdf,doc等): 绿色(success)
- 表格和演示文稿(xls,ppt等): 橙色(warning)
- 压缩文件(zip,rar等): 紫色(info)
- 媒体文件(mp3,mp4等): 红色(danger)
- 代码和配置文件(js,py等): 蓝色(primary)
-->
<template>
  <div :class="[
    'font-sans relative', 
    props.card ? 'max-auto rounded-lg shadow-md overflow-hidden transition-all duration-300 ease-in-out bg-white dark:bg-gray-800 my-4 hover:translate-y-[-2px] hover:shadow-lg' : ''
  ]">
    <!-- 文件卡片主体 -->
    <div class="flex items-center p-4 cursor-pointer" @click="handleDownload">
      <!-- 文件图标 -->
      <div :class="[
        'flex items-center justify-center w-12 h-12 rounded-lg mr-4 text-[28px] text-white',
        themeColorClass,
        'relative'
      ]" 
      ref="fileIconRef"
      @mouseenter="showFileTypeTooltip = true" 
      @mouseleave="showFileTypeTooltip = false">
        <div v-if="props.fileIcon" :class="props.fileIcon"></div>
        <div v-else :class="getFileIcon"></div>
      </div>
      
      <!-- 文件信息 -->
      <div class="flex-1 overflow-hidden">
        <div class="font-medium text-base mb-1 whitespace-nowrap overflow-hidden text-ellipsis relative text-gray-800 dark:text-gray-200"
             ref="fileNameRef"
             @mouseenter="showFileNameTooltip = true"
             @mouseleave="showFileNameTooltip = false">
          {{ displayFileName }}
        </div>
        <div v-if="formattedSize" class="text-sm text-gray-500 dark:text-gray-400 mb-2">{{ formattedSize }}</div>
        
        <!-- 进度条 -->
        <div v-if="props.showProgress && downloading" class="relative h-1.5 bg-gray-200 dark:bg-gray-600 rounded overflow-hidden mt-2">
          <div :class="['h-full rounded transition-all duration-200 ease-in-out', themeColorClass]" :style="{ width: `${downloadProgress}%` }"></div>
          <span class="absolute right-0 top-[-18px] text-xs text-gray-500 dark:text-gray-400">{{ downloadProgress }}%</span>
        </div>
      </div>
      
      <!-- 下载按钮 -->
      <div :class="[
        'w-10 h-10 flex items-center justify-center rounded-full text-white text-xl transition-transform duration-200 hover:scale-110',
        themeColorClass,
        'relative'
      ]"
      ref="downloadBtnRef"
      @mouseenter="showDownloadTooltip = true"
      @mouseleave="showDownloadTooltip = false">
        <div v-if="downloading" class="i-mdi-loading animate-spin"></div>
        <div v-else class="i-mdi-download"></div>
      </div>
    </div>
  </div>
  
  <!-- 使用Teleport将tooltips移动到body，避免被父容器的overflow:hidden截断 -->
  <Teleport to="body">
    <!-- 文件类型tooltip -->
    <div v-if="showFileTypeTooltip && fileIconRef" 
         class="fixed bg-gray-800 dark:bg-gray-700 text-white text-xs rounded py-1 px-2 whitespace-nowrap z-50 tooltip-transition"
         :style="getTooltipStyle(fileIconRef, 'top')">
      {{ fileTypeText }}
    </div>
    
    <!-- 下载按钮tooltip -->
    <div v-if="showDownloadTooltip && downloadBtnRef" 
         class="fixed bg-gray-800 dark:bg-gray-700 text-white text-xs rounded py-1 px-2 whitespace-nowrap z-50 tooltip-transition"
         :style="getTooltipStyle(downloadBtnRef, 'top')">
      {{ downloading ? '下载中' : (props.customTooltip || '点击下载') }}
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  // 文件路径或对象
  file: {
    type: [String, Object, Array],
    required: true
  },
  // 下载时使用的文件名
  fileName: {
    type: String,
    default: ''
  },
  // 自定义文件图标
  fileIcon: {
    type: String,
    default: ''
  },
  // 文件大小（字节）
  fileSize: {
    type: [Number, String],
    default: 0
  },
  // 是否显示下载进度
  showProgress: {
    type: Boolean,
    default: true
  },
  // 主题色
  theme: {
    type: String,
    default: '',  // 默认值改为空字符串，表示自动根据文件类型选择
    validator: (value) => ['', 'primary', 'success', 'warning', 'danger', 'info'].includes(value)
  },
  // 是否使用卡片样式
  card: {
    type: Boolean,
    default: true
  },
  // 自定义提示文本
  customTooltip: {
    type: String,
    default: ''
  }
})

// 状态变量
const downloading = ref(false)
// 下载进度
const downloadProgress = ref(0)

// 引用和状态
const fileIconRef = ref(null)
// 文件名引用       
const fileNameRef = ref(null)
// 下载按钮引用
const downloadBtnRef = ref(null)
// 文件类型tooltip
const showFileTypeTooltip = ref(false)
// 文件名tooltip
const showFileNameTooltip = ref(false)
// 下载按钮tooltip
const showDownloadTooltip = ref(false)

// 文件名显示处理
const displayFileName = computed(() => {
  if (props.fileName) {
    return props.fileName
  }
  
  // 从路径或对象中获取文件名
  if (typeof props.file === 'string') {
    return props.file.split('/').pop()
  } else if (typeof props.file === 'object' && props.file !== null) {
    return props.file.name || '未命名文件'
  }
  
  return '未命名文件'
})

// 自动确定文件类型的主题
const autoTheme = computed(() => {
  const fileName = displayFileName.value.toLowerCase()
  const extension = fileName.split('.').pop() || ''
  
  // 图片文件 - 蓝色
  if (/^(jpg|jpeg|png|gif|webp|svg|bmp|tiff)$/.test(extension)) {
    return 'primary'
  }
  
  // 文档文件 - 绿色
  if (/^(pdf|doc|docx|txt|rtf|odt|pages)$/.test(extension)) {
    return 'success'
  }
  
  // 表格和演示文稿 - 橙色
  if (/^(xls|xlsx|csv|ppt|pptx|key|odp|ods)$/.test(extension)) {
    return 'warning'
  }
  
  // 压缩文件 - 紫色
  if (/^(zip|rar|7z|tar|gz|bz2)$/.test(extension)) {
    return 'info'
  }
  
  // 媒体文件 - 红色
  if (/^(mp3|wav|ogg|mp4|avi|mov|wmv|flv|mkv|webm)$/.test(extension)) {
    return 'danger'
  }
  
  // 代码和配置文件 - 蓝色
  if (/^(html|css|js|jsx|ts|tsx|json|php|py|java|c|cpp|cs|rb|xml|yaml|yml|toml|ini|md)$/.test(extension)) {
    return 'primary'
  }
  
  // 默认 - 蓝色
  return 'primary'
})

// 最终的主题，优先使用用户自定义主题，否则使用自动主题
const finalTheme = computed(() => {
  return props.theme || autoTheme.value
})

// 文件大小格式化
const formattedSize = computed(() => {
  if (!props.fileSize) return ''
  
  const size = typeof props.fileSize === 'string' ? parseInt(props.fileSize) : props.fileSize
  
  if (size < 1024) {
    return `${size} B`
  } else if (size < 1024 * 1024) {
    return `${(size / 1024).toFixed(1)} KB`
  } else if (size < 1024 * 1024 * 1024) {
    return `${(size / (1024 * 1024)).toFixed(1)} MB`
  } else {
    return `${(size / (1024 * 1024 * 1024)).toFixed(1)} GB`
  }
})

// 根据主题生成CSS类
const themeClass = computed(() => {
  return `theme-${finalTheme.value}`
})

// 根据主题获取Tailwind颜色类
const themeColorClass = computed(() => {
  switch (finalTheme.value) {
    case 'success': return 'bg-emerald-500 dark:bg-emerald-600'
    case 'warning': return 'bg-amber-500 dark:bg-amber-600'
    case 'danger': return 'bg-rose-500 dark:bg-rose-600'
    case 'info': return 'bg-violet-500 dark:bg-violet-600'
    default: return 'bg-blue-500 dark:bg-blue-600' // primary
  }
})

// 根据文件类型获取图标
const getFileIcon = computed(() => {
  const fileName = displayFileName.value.toLowerCase()
  
  // 图片文件
  if (/\.(jpg|jpeg|png|gif|webp|svg|bmp|tiff)$/.test(fileName)) {
    return 'i-mdi-file-image'
  }
  
  // PDF文件
  if (/\.pdf$/.test(fileName)) {
    return 'i-mdi-file-pdf'
  }
  
  // Word文档
  if (/\.(doc|docx|odt)$/.test(fileName)) {
    return 'i-mdi-file-word'
  }
  
  // Excel文档
  if (/\.(xls|xlsx|csv|ods)$/.test(fileName)) {
    return 'i-mdi-file-excel'
  }
  
  // PowerPoint文档
  if (/\.(ppt|pptx|key|odp)$/.test(fileName)) {
    return 'i-mdi-file-powerpoint'
  }
  
  // 文本文档
  if (/\.(txt|rtf|md)$/.test(fileName)) {
    return 'i-mdi-file-document'
  }
  
  // 压缩文件
  if (/\.(zip|rar|7z|tar|gz|bz2)$/.test(fileName)) {
    return 'i-mdi-file-compressed'
  }
  
  // 音频文件
  if (/\.(mp3|wav|flac|ogg|aac)$/.test(fileName)) {
    return 'i-mdi-file-music'
  }
  
  // 视频文件
  if (/\.(mp4|avi|mov|wmv|flv|mkv|webm)$/.test(fileName)) {
    return 'i-mdi-file-video'
  }
  
  // 代码文件
  if (/\.(html|css|js|jsx|ts|tsx|json|php|py|java|c|cpp|cs|rb|xml|yaml|yml)$/.test(fileName)) {
    return 'i-mdi-file-code'
  }
  
  // 默认文件图标
  return 'i-mdi-file'
})

// 获取文件类型文本
const fileTypeText = computed(() => {
  const fileName = displayFileName.value.toLowerCase()
  const extension = fileName.split('.').pop() || ''
  
  // 图片文件
  if (/^(jpg|jpeg|png|gif|webp|svg|bmp|tiff)$/.test(extension)) {
    return '图片文件'
  }
  
  // PDF文件
  if (extension === 'pdf') {
    return 'PDF文档'
  }
  
  // Word文档
  if (/^(doc|docx|odt)$/.test(extension)) {
    return 'Word文档'
  }
  
  // Excel文档
  if (/^(xls|xlsx|csv|ods)$/.test(extension)) {
    return 'Excel表格'
  }
  
  // PowerPoint文档
  if (/^(ppt|pptx|key|odp)$/.test(extension)) {
    return 'PowerPoint演示文稿'
  }
  
  // 文本文档
  if (/^(txt|rtf|md)$/.test(extension)) {
    return '文本文档'
  }
  
  // 压缩文件
  if (/^(zip|rar|7z|tar|gz|bz2)$/.test(extension)) {
    return '压缩文件'
  }
  
  // 音频文件
  if (/^(mp3|wav|flac|ogg|aac)$/.test(extension)) {
    return '音频文件'
  }
  
  // 视频文件
  if (/^(mp4|avi|mov|wmv|flv|mkv|webm)$/.test(extension)) {
    return '视频文件'
  }
  
  // 代码文件
  if (/^(html|css|js|jsx|ts|tsx|json|php|py|java|c|cpp|cs|rb|xml|yaml|yml)$/.test(extension)) {
    return '代码文件'
  }
  
  return `${extension ? extension.toUpperCase() : '未知'}格式文件`
})

// 计算tooltip的位置
function getTooltipStyle(elementRef, position = 'top') {
  if (!elementRef) return {}
  
  const rect = elementRef.getBoundingClientRect()
  const tooltipStyle = {
    left: `${rect.left + rect.width / 2}px`,
    transform: 'translateX(-50%)'
  }
  
  if (position === 'top') {
    tooltipStyle.top = `${rect.top - 8}px`
    tooltipStyle.transform += ' translateY(-100%)'
  } else if (position === 'bottom') {
    tooltipStyle.top = `${rect.bottom + 8}px`
  }
  
  return tooltipStyle
}

// 处理下载
async function handleDownload() {
  if (downloading.value) return
  
  downloading.value = true
  downloadProgress.value = 0
  
  try {
    // 获取文件URL
    let fileUrl = ''
    
    if (typeof props.file === 'string') {
      fileUrl = props.file
    } else if (typeof props.file === 'object' && props.file !== null) {
      fileUrl = props.file.url || ''
    }
    
    if (!fileUrl) {
      throw new Error('无效的文件路径')
    }
    
    // 如果是本地文件并支持Blob，使用fetch进行下载以支持进度显示
    if (props.showProgress && fileUrl.startsWith('/') || fileUrl.startsWith('http')) {
      await downloadWithProgress(fileUrl)
    } else {
      // 简单下载
      const a = document.createElement('a')
      a.href = fileUrl
      a.download = displayFileName.value
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      
      // 模拟下载进度
      simulateProgress()
    }
  } catch (error) {
    console.error('下载失败:', error)
    alert('下载失败，请重试')
    downloading.value = false
  }
}

// 使用进度显示下载
async function downloadWithProgress(url) {
  try {
    const response = await fetch(url)
    const reader = response.body.getReader()
    const contentLength = response.headers.get('Content-Length') || 0
    let receivedLength = 0
    const chunks = []
    
    while (true) {
      const { done, value } = await reader.read()
      
      if (done) {
        break
      }
      
      chunks.push(value)
      receivedLength += value.length
      
      // 更新进度
      if (contentLength > 0) {
        downloadProgress.value = Math.round((receivedLength / contentLength) * 100)
      } else {
        // 如果无法获取总大小，模拟进度
        simulateProgress()
      }
    }
    
    // 合并所有数据块并创建下载链接
    const blob = new Blob(chunks)
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = displayFileName.value
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    
    downloadProgress.value = 100
    
    // 延迟重置状态
    setTimeout(() => {
      downloading.value = false
    }, 500)
  } catch (error) {
    console.error('带进度下载失败:', error)
    throw error
  }
}

// 模拟下载进度
function simulateProgress() {
  let progress = 0
  const interval = setInterval(() => {
    progress += Math.floor(Math.random() * 10)
    
    if (progress >= 100) {
      progress = 100
      clearInterval(interval)
      
      setTimeout(() => {
        downloading.value = false
      }, 500)
    }
    
    downloadProgress.value = progress
  }, 200)
}
</script>

<style scoped>
.tooltip-transition {
  transition: opacity 0.2s ease-in-out;
}
</style> 