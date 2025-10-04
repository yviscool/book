<!-- 
 图片预览组件 
 通过 unplugin-vue-components 会自动注册 不需要 use

 使用方法：
 <ImgPreview :images="images" :alt="alt" :maxWidth="maxWidth" :gap="gap" :controlBar="controlBar" :closeBtn="closeBtn" :arrowBtn="arrowBtn" :keyboard="keyboard" :clickMaskClose="clickMaskClose" />

 参数说明：
 images: 图片路径或图片路径数组 必选 
 alt: 图片替代文本 可选 默认为图片预览
 maxWidth: 图片最大宽度 可选 默认为auto
 gap: 图片间距 可选 默认为1rem
 controlBar: 是否显示控制条 可选 默认为true
 closeBtn: 是否显示关闭按钮 可选 默认为true
 arrowBtn: 是否显示箭头按钮 可选 默认为true
 keyboard: 是否支持键盘控制 可选 默认为true
 clickMaskClose: 是否点击遮罩层关闭 可选 默认为true
 wheelZoom: 是否启用鼠标滚轮缩放 可选 默认为true
 -->
<template>
    <div class="flex justify-center py-2">
        <div class="flex flex-row" :style="{ gap: gap }">
            <div v-for="(image, index) in normalizedImages" :key="index"
                class="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <img :id="`img-${index}`" :src="image.src" @click="() => showPreview(image.src)"
                    class="img-preview w-full h-auto object-cover cursor-pointer" :alt="image.alt"
                    :style="{ maxWidth: maxWidth }">
            </div>
        </div>
    </div>

    <!-- 图片预览弹窗 -->
    <Teleport to="body">
        <Transition name="fade">
            <div v-if="visible" ref="previewContainer"
                class="fixed inset-0 z-9999 bg-black/75 overflow-hidden flex items-center justify-center"
                @click="handleMaskClick" @mouseup="removeMove('pc')" @touchend="removeMove('mobile')"
                @keydown="keyHandle">
                
                <!-- 加载中状态 -->
                <div v-show="imgState === 1" class="animate-spin text-white">
                    <div class="i-mdi-loading text-4xl"></div>
                </div>
                
                <!-- 图片 -->
                <img v-show="imgState === 2" ref="previewImg" :src="currentImgUrl"
                    class="bg-white rounded-lg max-w-full max-h-full transition-none"
                    :style="{
                        transform: `scale(${imgScale}) rotate(${imgRotate}deg)`,
                        marginTop: `${imgTop}px`,
                        marginLeft: `${imgLeft}px`,
                        maxWidth: isFull ? 'none' : '100%',
                        maxHeight: isFull ? 'none' : '100%'
                    }"
                    @click.stop=""
                    @mousedown="addMove"
                    @touchstart="addMoveMobile"
                    alt="预览图片"
                />
                
                <!-- 加载失败状态 -->
                <div v-show="imgState === 3" class="text-white">
                    <div class="i-mdi-alert-circle text-4xl"></div>
                </div>
                
                <!-- 关闭按钮 -->
                <div v-if="closeBtn" 
                    class="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full bg-black/40 hover:bg-black/60 cursor-pointer transition-colors group" 
                    @click.stop="close({ way: 'closeBtn' })">
                    <div class="i-mdi-close text-white text-xl"></div>
                    <div class="absolute bottom-[-30px] left-1/2 transform -translate-x-1/2 bg-black/75 text-white text-center py-1 px-2 rounded text-xs whitespace-nowrap opacity-0 invisible group-hover:visible group-hover:opacity-100 transition-opacity z-10">关闭</div>
                </div>
                
                <!-- 左箭头 -->
                <div v-if="arrowBtn && multiple && imgList.length > 1" 
                    class="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-black/40 hover:bg-black/60 cursor-pointer transition-colors group"
                    @click.stop="toggleImg(false, 'btn')">
                    <div class="i-mdi-chevron-left text-white text-2xl"></div>
                    <div class="absolute bottom-[-30px] left-1/2 transform -translate-x-1/2 bg-black/75 text-white text-center py-1 px-2 rounded text-xs whitespace-nowrap opacity-0 invisible group-hover:visible group-hover:opacity-100 transition-opacity z-10">上一张</div>
                </div>
                
                <!-- 右箭头 -->
                <div v-if="arrowBtn && multiple && imgList.length > 1" 
                    class="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-black/40 hover:bg-black/60 cursor-pointer transition-colors group"
                    @click.stop="toggleImg(true, 'btn')">
                    <div class="i-mdi-chevron-right text-white text-2xl"></div>
                    <div class="absolute bottom-[-30px] left-1/2 transform -translate-x-1/2 bg-black/75 text-white text-center py-1 px-2 rounded text-xs whitespace-nowrap opacity-0 invisible group-hover:visible group-hover:opacity-100 transition-opacity z-10">下一张</div>
                </div>
                
                <!-- 控制条 -->
                <div v-if="controlBar" 
                    class="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center bg-black/40 rounded-full px-2 py-1">
                    <!-- 缩小 -->
                    <div class="control-btn group" @click.stop="scaleFunc(-0.15)">
                        <div class="i-mdi-minus-circle text-white text-xl"></div>
                        <div class="absolute top-[-30px] left-1/2 transform -translate-x-1/2 bg-black/75 text-white text-center py-1 px-2 rounded text-xs whitespace-nowrap opacity-0 invisible group-hover:visible group-hover:opacity-100 transition-opacity z-10">缩小</div>
                    </div>
                    
                    <!-- 放大 -->
                    <div class="control-btn group" @click.stop="scaleFunc(0.15)">
                        <div class="i-mdi-plus-circle text-white text-xl"></div>
                        <div class="absolute top-[-30px] left-1/2 transform -translate-x-1/2 bg-black/75 text-white text-center py-1 px-2 rounded text-xs whitespace-nowrap opacity-0 invisible group-hover:visible group-hover:opacity-100 transition-opacity z-10">放大</div>
                    </div>
                    
                    <!-- 适应/原始尺寸切换 -->
                    <div class="control-btn group" @click.stop="imgToggle">
                        <div v-if="isFull" class="i-mdi-fit-to-screen text-white text-xl"></div>
                        <div v-else class="i-mdi-fullscreen text-white text-xl"></div>
                        <div class="absolute top-[-30px] left-1/2 transform -translate-x-1/2 bg-black/75 text-white text-center py-1 px-2 rounded text-xs whitespace-nowrap opacity-0 invisible group-hover:visible group-hover:opacity-100 transition-opacity z-10">{{ isFull ? '适应屏幕' : '原始尺寸' }}</div>
                    </div>
                    
                    <!-- 左转 -->
                    <div class="control-btn group" @click.stop="rotateFunc(-90)">
                        <div class="i-mdi-rotate-left text-white text-xl"></div>
                        <div class="absolute top-[-30px] left-1/2 transform -translate-x-1/2 bg-black/75 text-white text-center py-1 px-2 rounded text-xs whitespace-nowrap opacity-0 invisible group-hover:visible group-hover:opacity-100 transition-opacity z-10">向左旋转</div>
                    </div>
                    
                    <!-- 右转 -->
                    <div class="control-btn group" @click.stop="rotateFunc(90)">
                        <div class="i-mdi-rotate-right text-white text-xl"></div>
                        <div class="absolute top-[-30px] left-1/2 transform -translate-x-1/2 bg-black/75 text-white text-center py-1 px-2 rounded text-xs whitespace-nowrap opacity-0 invisible group-hover:visible group-hover:opacity-100 transition-opacity z-10">向右旋转</div>
                    </div>
                    
                    <!-- 下载 -->
                    <div class="control-btn group" @click.stop="downloadImage">
                        <div class="i-mdi-download text-white text-xl"></div>
                        <div class="absolute top-[-30px] left-1/2 transform -translate-x-1/2 bg-black/75 text-white text-center py-1 px-2 rounded text-xs whitespace-nowrap opacity-0 invisible group-hover:visible group-hover:opacity-100 transition-opacity z-10">下载图片</div>
                    </div>
                </div>
                
                <!-- 页码指示器 -->
                <div v-if="controlBar && multiple && imgList.length > 1" 
                    class="absolute bottom-4 right-4 bg-black/40 text-white px-2 py-1 rounded-md text-sm">
                    {{ imgIndex + 1 }} / {{ imgList.length }}
                </div>
            </div>
        </Transition>
    </Teleport>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { withBase } from 'vitepress'
// 定义组件属性
const props = defineProps({
    // 支持单个图片或图片数组
    images: {
        type: [String, Array, Object],
        required: true
    },
    // 单个图片时的替代文本
    alt: {
        type: String,
        default: '图片预览'
    },
    // 控制每个图片的最大宽度
    maxWidth: {
        type: String,
        default: 'auto'
    },
    // 图片间距
    gap: {
        type: String,
        default: '1rem'
    },
    // 以下为预览配置选项
    controlBar: {
        type: Boolean,
        default: true
    },
    // 关闭按钮
    closeBtn: {
        type: Boolean,
        default: true
    },
    // 箭头按钮
    arrowBtn: {
        type: Boolean,
        default: true
    },
    // 键盘控制
    keyboard: {
        type: Boolean,
        default: true
    },
    // 点击遮罩层关闭
    clickMaskClose: {
        type: Boolean,
        default: true
    },
    // 是否启用鼠标滚轮缩放
    wheelZoom: {
        type: Boolean,
        default: true
    }
})

// 将不同格式的输入标准化为图片数组
const normalizedImages = computed(() => {
    // 如果是字符串，视为单个图片的路径
    if (typeof props.images === 'string') {
        return [{
            src: withBase(props.images),
            alt: props.alt
        }]
    }

    // 如果是数组，处理每个元素
    if (Array.isArray(props.images)) {
        return props.images.map(item => {
            // 如果数组元素是字符串，视为图片路径
            if (typeof item === 'string') {
                return {
                    src: withBase(item),
                    alt: props.alt
                }
            }
            // 如果是对象，确保有src属性
            if (typeof item === 'object' && item !== null) {
                return {
                    src: withBase(item.src),
                    alt: item.alt || props.alt
                }
            }
            return null
        }).filter(Boolean) // 过滤掉无效项
    }

    // 如果是单个对象，视为单个图片的配置
    if (typeof props.images === 'object' && props.images !== null) {
        return [{
            src: withBase(props.images.src),
            alt: props.images.alt || props.alt
        }]
    }

    return []
})

// 预览状态
const visible = ref(false) // 是否显示预览
const imgState = ref(1) // 1:加载中 2:加载成功 3:加载失败
const currentImgUrl = ref('') // 当前图片地址
const imgScale = ref(1) // 图片缩放比例
const imgRotate = ref(0) // 图片旋转角度
const imgTop = ref(0) // 图片顶部位置
const imgLeft = ref(0) // 图片左侧位置
const isFull = ref(false) // 是否全屏
const multiple = ref(false) // 是否多图
const imgList = ref([]) // 图片列表
const imgIndex = ref(0) // 当前图片索引
const clientX = ref(0) // 鼠标X坐标
const clientY = ref(0) // 鼠标Y坐标
const canRun = ref(true) // 是否可以运行
const mobileScale = ref(1) // 移动端缩放比例
const start = ref([{}, {}]) // 触摸开始坐标

// DOM引用
const previewContainer = ref(null) // 预览容器
const previewImg = ref(null) // 预览图片    

// 事件回调
const emit = defineEmits(['close', 'change']) // 关闭和改变事件

// 显示预览
function showPreview(src) {
    initImg()
    
    // 禁用body滚动
    disableBodyScroll()
    
    // 判断是否为多图预览
    const images = normalizedImages.value.map(img => img.src)
    if (images.length > 1) {
        multiple.value = true
        imgList.value = images
        imgIndex.value = images.findIndex(img => img === src) || 0
    } else {
        multiple.value = false
        currentImgUrl.value = src
    }
    
    visible.value = true
    
    // 加载图片
    if (multiple.value) {
        changeUrl(imgList.value[imgIndex.value], imgIndex.value)
    } else {
        changeUrl(src)
    }
    
    // 在DOM更新后添加滚轮事件
    setTimeout(() => {
        if (previewContainer.value && props.wheelZoom) {
            previewContainer.value.addEventListener('wheel', scrollFunc, { passive: false })
            previewContainer.value.addEventListener('mousewheel', scrollFunc, { passive: false })
            previewContainer.value.addEventListener('DOMMouseScroll', scrollFunc, { passive: false })
        }
    }, 100)
}

// 关闭预览
function close(data) {
    initImg()
    visible.value = false
    
    // 移除滚轮事件
    removeWheelEvents()
    
    // 恢复body滚动
    enableBodyScroll()
    
    emit('close', data)
}

// 初始化图片状态
function initImg() {
    mobileScale.value = 1
    imgScale.value = 1
    imgRotate.value = 0
    imgTop.value = 0
    imgLeft.value = 0
    isFull.value = false
}

// 切换图片（上一张/下一张）
function toggleImg(isNext, way) {
    const fromIndex = imgIndex.value
    
    if (isNext) {
        imgIndex.value++
        if (imgIndex.value > imgList.value.length - 1) {
            imgIndex.value = 0
        }
    } else {
        imgIndex.value--
        if (imgIndex.value < 0) {
            imgIndex.value = imgList.value.length - 1
        }
    }
    
    const data = {
        type: isNext ? 'next' : 'prev',
        fromImgIndex: fromIndex,
        fromImgUrl: imgList.value[fromIndex],
        toImgIndex: imgIndex.value,
        toImgUrl: imgList.value[imgIndex.value],
        way
    }
    
    emit('change', data)
    changeUrl(imgList.value[imgIndex.value], imgIndex.value)
}

// 改变图片地址
function changeUrl(url, index) {
    imgState.value = 1
    const img = new Image()
    img.src = url
    
    img.onload = () => {
        if ((index !== undefined && index === imgIndex.value) || index === undefined) {
            imgState.value = 2
            currentImgUrl.value = url
        }
    }
    
    img.onerror = () => {
        if ((index !== undefined && index === imgIndex.value) || index === undefined) {
            imgState.value = 3
        }
    }
}

// 旋转图片
function rotateFunc(deg) {
    imgRotate.value += deg
}

// 缩放图片
function scaleFunc(num, bool) {
    if (imgScale.value <= 0.2 && num < 0) return
    
    if (bool) {
        imgScale.value = num
    } else {
        imgScale.value += num
    }
}

// 图片原尺寸切换
function imgToggle() {
    initImg()
    isFull.value = !isFull.value
}

// 鼠标滚轮缩放
function scrollFunc(e) {
    // 如果滚轮缩放被禁用，则不处理滚轮事件
    if (!props.wheelZoom) return true;
    
    e = e || window.event
    
    // 阻止默认行为和冒泡
    e.preventDefault()
    e.stopPropagation()
    
    // 兼容不同浏览器的滚轮事件
    let delta = 0
    
    if (e.wheelDelta) {
        // IE/Opera/Chrome
        delta = e.wheelDelta / 120
    } else if (e.detail) {
        // Firefox
        delta = -e.detail / 3
    } else if (e.deltaY) {
        // 标准wheel事件
        delta = -e.deltaY / 100
    }
    
    // 向上滚动为正，向下为负
    if (delta > 0) {
        scaleFunc(0.1)
    } else {
        scaleFunc(-0.1)
    }
    
    return false
}

// 鼠标拖动相关
function addMove(e) {
    e = e || window.event
    clientX.value = e.clientX
    clientY.value = e.clientY
    
    if (previewContainer.value) {
        previewContainer.value.onmousemove = moveFunc
    }
}

// 鼠标拖动
function moveFunc(e) {
    e = e || window.event
    e.preventDefault()
    
    const movementX = e.clientX - clientX.value
    const movementY = e.clientY - clientY.value
    
    imgLeft.value += movementX * 2
    imgTop.value += movementY * 2
    
    clientX.value = e.clientX
    clientY.value = e.clientY
}

// 触摸拖动相关
function addMoveMobile(e) {
    e.preventDefault()
    e = e || window.event
    
    if (e.touches.length > 1) {
        start.value = e.touches
    } else {
        clientX.value = e.touches[0].pageX
        clientY.value = e.touches[0].pageY
    }
    
    if (previewContainer.value) {
        previewContainer.value.ontouchmove = moveFuncMobile
    }
}

// 触摸拖动
function moveFuncMobile(e) {
    e = e || window.event
    
    if (e.touches.length > 1) {
        const now = e.touches
        const scale = getDistance(now[0], now[1]) / getDistance(start.value[0], start.value[1])
        
        if (mobileScale.value) {
            if (scale > 1) {
                scaleFunc(scale + mobileScale.value - 1, true)
            } else {
                scaleFunc(scale * mobileScale.value, true)
            }
        } else {
            scaleFunc(scale, true)
        }
    } else {
        const touch = e.touches[0]
        e.preventDefault()
        
        const movementX = touch.pageX - clientX.value
        const movementY = touch.pageY - clientY.value
        
        imgLeft.value += movementX * 2
        imgTop.value += movementY * 2
        
        clientX.value = touch.pageX
        clientY.value = touch.pageY
    }
}

// 移除拖动事件
function removeMove(type) {
    if (previewContainer.value) {
        if (type === 'pc') {
            previewContainer.value.onmousemove = null
        } else {
            mobileScale.value = imgScale.value
            previewContainer.value.ontouchmove = null
        }
    }
}

// 下载图片
function downloadImage() {
    let url = ''
    if (multiple.value) {
        url = imgList.value[imgIndex.value]
    } else {
        url = currentImgUrl.value
    }
    
    const image = new Image()
    // 解决跨域 Canvas 污染问题
    image.setAttribute('crossOrigin', 'anonymous')
    
    image.onload = function() {
        const canvas = document.createElement('canvas')
        canvas.width = image.width
        canvas.height = image.height
        const context = canvas.getContext('2d')
        context.drawImage(image, 0, 0, image.width, image.height)
        
        try {
            // 尝试使用 toDataURL 获取图片数据
            const dataUrl = canvas.toDataURL('image/png')
            const a = document.createElement('a')
            a.href = dataUrl
            a.download = `image-${Date.now()}.png`
            document.body.appendChild(a)
            a.click()
            document.body.removeChild(a)
        } catch (e) {
            // 如果出现跨域问题，尝试直接下载原图片
            console.error('Canvas 污染错误，尝试直接下载:', e)
            const a = document.createElement('a')
            a.href = url
            a.download = url.split('/').pop() || `image-${Date.now()}.png`
            document.body.appendChild(a)
            a.click()
            document.body.removeChild(a)
        }
    }
    
    image.onerror = function() {
        console.error('图片加载失败，尝试直接下载')
        const a = document.createElement('a')
        a.href = url
        a.download = url.split('/').pop() || `image-${Date.now()}.png`
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
    }
    
    image.src = url
}

// 按键处理
function keyHandle(e) {
    if (!props.keyboard || !canRun.value) return
    
    e = e || window.event
    const key = e.keyCode || e.which || e.charCode
    
    canRun.value = false
    setTimeout(() => {
        canRun.value = true
    }, 300)
    
    switch (key) {
        case 27: // ESC
            close({ way: 'esc' })
            break
        case 65: // A键-上一张
            if (multiple.value) {
                toggleImg(false, 'key-a')
            }
            break
        case 68: // D键-下一张
            if (multiple.value) {
                toggleImg(true, 'key-d')
            }
            break
        case 87: // W键-放大
            scaleFunc(0.15)
            break
        case 83: // S键-缩小
            scaleFunc(-0.15)
            break
        case 81: // Q键-逆时针旋转
            rotateFunc(-90)
            break
        case 69: // E键-顺时针旋转
            rotateFunc(90)
            break
        case 82: // R键-复位
            initImg()
            break
        case 70: // F键-下载
            downloadImage()
            break
    }
}

// 点击遮罩层
function handleMaskClick() {
    if (props.clickMaskClose) {
        close({ way: 'mask' })
    }
}

// 计算两点之间的距离（用于移动端缩放）
function getDistance(p1, p2) {
    const x = p2.pageX - p1.pageX
    const y = p2.pageY - p1.pageY
    return Math.sqrt(x * x + y * y)
}

// 生命周期钩子
onMounted(() => {
    if (props.keyboard) {
        document.addEventListener('keydown', keyHandle)
    }
    
    // 禁止拖拽默认行为
    document.ondragstart = () => false
})

onUnmounted(() => {
    if (props.keyboard) {
        document.removeEventListener('keydown', keyHandle)
    }
    
    // 移除滚轮事件
    removeWheelEvents()
    
    // 恢复拖拽默认行为
    document.ondragstart = null
    
    // 确保关闭预览时恢复body滚动
    enableBodyScroll()
})

// 禁用body滚动
function disableBodyScroll() {
    const scrollY = window.scrollY
    document.body.style.position = 'fixed'
    document.body.style.width = '100%'
    document.body.style.top = `-${scrollY}px`
    document.body.style.overflow = 'hidden'
    document.body.dataset.scrollY = scrollY
}

// 恢复body滚动
function enableBodyScroll() {
    document.body.style.position = ''
    document.body.style.width = ''
    document.body.style.top = ''
    document.body.style.overflow = ''
    
    // 恢复滚动位置
    if (document.body.dataset.scrollY) {
        window.scrollTo(0, parseInt(document.body.dataset.scrollY))
        delete document.body.dataset.scrollY
    }
}

// 移除滚轮事件
function removeWheelEvents() {
    if (previewContainer.value) {
        previewContainer.value.removeEventListener('wheel', scrollFunc)
        previewContainer.value.removeEventListener('mousewheel', scrollFunc)
        previewContainer.value.removeEventListener('DOMMouseScroll', scrollFunc)
    }
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

.control-btn {
    width: 2.5rem;
    height: 2.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    margin-left: 0.25rem;
    margin-right: 0.25rem;
    border-radius: 9999px;
    position: relative;
}

.control-btn:hover {
    background-color: rgba(255, 255, 255, 0.2);
    transition-property: background-color;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 300ms;
}
</style>