<template>
    <div class="cropper">
        <canvas ref="cropperCanvas" style="display: none"></canvas>
        <img :src="imgUrl" alt="">
        <div class="showPosition" ref="showPosition"
            :style="`top: ${originHeightOffset + 1}px;
                left: ${originWidthOffset + 1}px;
                width: ${originShowWidth}px;
                height: ${originShowHeight}px;`"
        >
            <!-- 裁剪框 -->
            <div class="crop-box"
                ref="cropBox"
                :style="`width: ${boxWidth}px;
                        height: ${boxHeight}px;
                        top: ${boxTop}px;
                        left: ${boxLeft}px;`"
            >
                <!-- 中间移动块 -->
                <div
                    class="crop-box-move"
                    ref="cropBoxMove"
                ></div>
                <!-- 左上控块 -->
                <div class="cropper-point point-lt"
                    @mousedown="(e)=>startResize('lt', e)"
                    @touchstart="(e)=>startResize('lt', e.touches[0])"
                ></div>
                <!-- 右上控块 -->
                <div class="cropper-point point-rt"
                    @mousedown="(e)=>startResize('rt', e)"
                    @touchstart="(e)=>startResize('rt', e.touches[0])"
                ></div>
                <!-- 左下控块 -->
                <div class="cropper-point point-lb"
                    @mousedown="(e)=>startResize('lb', e)"
                    @touchstart="(e)=>startResize('lb', e.touches[0])"
                ></div>
                <!-- 右下控块 -->
                <div class="cropper-point point-rb"
                    @mousedown="(e)=>startResize('rb', e)"
                    @touchstart="(e)=>startResize('rb', e.touches[0])"
                ></div>
            </div>
            <!-- 上蒙版 -->
            <div
                class="marking marking-top"
                :style="`width: ${boxWidth}px;
                        height: ${boxTop}px;
                        top: 0px;
                        left: ${boxLeft}px;`"    
            ></div>
            <!-- 右蒙版 -->
            <div
                class="marking marking-right"
                :style="`width: ${originShowWidth - (boxLeft + boxWidth)}px;
                        height: ${originShowHeight}px;
                        top: 0px;
                        left: ${boxLeft + boxWidth}px;`"    
            ></div>
            <!-- 下蒙版 -->
            <div
                class="marking marking-bottom"
                :style="`width: ${boxWidth}px;
                        height: ${originShowHeight - (boxTop + boxHeight)}px;
                        top: ${boxTop + boxHeight}px;
                        left: ${boxLeft}px;`"    
            ></div>
            <!-- 左蒙版 -->
            <div
                class="marking marking-left"
                :style="`width: ${boxLeft}px;
                        height: ${originShowHeight}px;
                        top: 0px;
                        left: 0px;`"
            ></div>
        </div>
    </div>
</template>

<script>
export default {
    name: "CropperDefault",
    data() {
        return {
            cropperWidth: 0,    // 整个裁剪组件的宽，挂载时获取
            cropperHeight: 0,   // 整个裁剪组件的高，挂载时获取
            width: 1,   // 原图的宽
            height: 1,  // 原图的高
            boxWidth: 0,  // 裁剪框宽
            boxHeight: 0, // 裁剪框高
            boxTop: 0,  // 裁剪框的上偏移量 上蒙版的高度
            boxLeft: 0, // 裁剪框的左偏移量 左蒙版的宽度
            isResizing: false, // 是否正在缩放
            resizeDirection: '', // 缩放方向
            startX: 0, // 鼠标按下时的X坐标
            startBoxWidth: 0, // 鼠标按下时的裁剪框宽度
            startBoxHeight: 0, // 鼠标按下时的裁剪框高度
            startBoxLeft: 0, // 鼠标按下时的裁剪框左偏移量
            startBoxTop: 0, // 鼠标按下时的裁剪框上偏移量
        }
    },
    props: {
        imgUrl: String, // 图片映射地址
        wrapWidth: Number,  // 预览容器宽
        wrapHeight: Number, // 预览容器高
        prevWidth: Number,  // 预览图实际宽
        prevHeight: Number, // 预览图实际高
        prevOffsetX: Number, // 预览图水平偏移量
        prevOffsetY: Number, // 预览图垂直偏移量
        cutOrder: Boolean,  // 裁剪命令 由false变为true就裁剪
    },
    computed: {
        // 计算原图宽高比
        originAspectRatio() {
            return this.width / this.height;
        },

        // 计算原图呈现宽
        originShowWidth() {
            // 如果原图较高，重新计算呈现宽，否则就等于组件宽
            if (this.originAspectRatio < this.cropperWidth / this.cropperHeight) {
                return this.cropperHeight * this.originAspectRatio;
            } else {
                return this.cropperWidth;
            }
        },

        // 计算原图呈现高
        originShowHeight() {
            // 如果原图较宽，重新计算呈现高，否则就等于组件高
            if (this.originAspectRatio > this.cropperWidth / this.cropperHeight) {
                return this.cropperWidth / this.originAspectRatio;
            } else {
                return this.cropperHeight;
            }
        },

        // 计算原图相对 cropper 的宽偏移量
        originWidthOffset() {
            // 如果原图较高，计算左右偏移量，否则就0
            if (this.originAspectRatio < this.cropperWidth / this.cropperHeight) {
                // 先根据固定高计算呈现宽
                const showWidth = this.cropperHeight * this.originAspectRatio;
                return (this.cropperWidth - showWidth) / 2;
            } else {
                return 0;
            }
        },

        // 计算原图相对 cropper 的高偏移量
        originHeightOffset() {
            // 如果原图较宽，计算上下偏移量，否则就0
            if (this.originAspectRatio > this.cropperWidth / this.cropperHeight) {
                // 先根据固定宽计算呈现高
                const showHeight = this.cropperWidth / this.originAspectRatio;
                return (this.cropperHeight - showHeight) / 2;
            } else {
                return 0;
            }
        },

        // 根据裁剪框的位置和大小按比例计算裁剪后的图片信息
        // 左偏移 像素
        cutOffsetX() {
            return Math.floor((this.boxLeft / this.originShowWidth) * this.width);
        },
        // 上偏移 像素
        cutOffsetY() {
            return Math.floor((this.boxTop / this.originShowHeight) * this.height);
        },
        // 裁剪图宽 像素
        cutWidth() {
            return Math.floor((this.boxWidth / this.originShowWidth) * this.width);
        },
        // 裁剪图高 像素
        cutHeight() {
            return Math.floor((this.boxHeight / this.originShowHeight) * this.height);
        },

        // 计算 wrapWidth:wrapHeight 预览图相关
        // 实际宽度
        cPrevWidth() {
            return this.wrapWidth * (this.originShowWidth / this.boxWidth);
        },
        // 实际高度
        cPrevHeight() {
            return this.wrapHeight * (this.originShowHeight / this.boxHeight);
        },
        // 实际偏移X
        cPrevOffsetX() {
            return this.cPrevWidth * (this.boxLeft / this.originShowWidth);
        },
        // 实际偏移Y
        cPrevOffsetY() {
            return this.cPrevHeight * (this.boxTop / this.originShowHeight);
        },
    },
    methods: {
        // 图片更换时更新原图宽高值，并且更新裁剪框呈现
        updateOrigin() {
            const img = new Image();
            img.src = this.imgUrl;
            img.onload = () => {
                this.width = img.width;
                this.height = img.height;
                setTimeout(() => {
                    this.initBox();     // 初始化裁剪框
                }, 0);    // 异步等待初始值更新完
            }
        },

        // 初始化裁剪框
        initBox() {
            // 如果是较宽图片，以原图呈现高初始化
            if (this.originAspectRatio > this.cropperWidth / this.cropperHeight) {
                this.boxHeight = 0.9 * this.originShowHeight;
                this.boxWidth = this.boxHeight * (this.wrapWidth / this.wrapHeight);
                this.boxTop = (this.originShowHeight - this.boxHeight) / 2;
                this.boxLeft = (this.cropperWidth - this.boxWidth) / 2;
            }
            // 否则以原图呈现宽初始化
            else {
                this.boxWidth = 0.9 * this.originShowWidth;
                this.boxHeight = this.boxWidth / (this.wrapWidth / this.wrapHeight);
                this.boxTop = (this.cropperHeight - this.boxHeight) / 2;
                this.boxLeft = (this.originShowWidth - this.boxWidth) / 2;
            }
        },

        // 初始化拖动
        initDrag() {
            const cropBoxMove = this.$refs.cropBoxMove; // 获取crop-box-move元素
            const cropBox = this.$refs.cropBox; // 获取crop-box元素
            const showPosition = this.$refs.showPosition; // 获取showPosition元素

            let isDragging = false; // 是否正在拖动
            let offsetX, offsetY;

            // 鼠标按下事件处理程序
            cropBoxMove.addEventListener("mousedown", (e) => {
                isDragging = true;
                offsetX = e.clientX - cropBox.getBoundingClientRect().left; // 鼠标相对crop-box的X偏移
                offsetY = e.clientY - cropBox.getBoundingClientRect().top; // 鼠标相对crop-box的Y偏移
            });

            // 在移动端 触摸事件处理程序
            cropBoxMove.addEventListener("touchstart", (e) => {
                isDragging = true;
                offsetX = e.touches[0].clientX - cropBox.getBoundingClientRect().left;
                offsetY = e.touches[0].clientY - cropBox.getBoundingClientRect().top;
            });

            // 鼠标移动事件处理程序
            document.addEventListener("mousemove", (e) => {
                if (!isDragging) return;

                // 计算新的crop-box位置
                let left = e.clientX - offsetX - showPosition.getBoundingClientRect().left;
                let top = e.clientY - offsetY - showPosition.getBoundingClientRect().top;

                // 限制crop-box在showPosition内部
                left = Math.max(0, left);
                left = Math.min(showPosition.offsetWidth - cropBox.offsetWidth, left);
                top = Math.max(0, top);
                top = Math.min(showPosition.offsetHeight - cropBox.offsetHeight, top);

                // 设置新位置
                this.boxLeft = left;
                this.boxTop = top;
            });

            // 在移动端 移动事件处理程序
            document.addEventListener("touchmove", (e) => {
                if (!isDragging) return;

                // 计算新的crop-box位置
                let left = e.touches[0].clientX - offsetX - showPosition.getBoundingClientRect().left;
                let top = e.touches[0].clientY - offsetY - showPosition.getBoundingClientRect().top;

                // 限制crop-box在showPosition内部
                left = Math.max(0, left);
                left = Math.min(showPosition.offsetWidth - cropBox.offsetWidth, left);
                top = Math.max(0, top);
                top = Math.min(showPosition.offsetHeight - cropBox.offsetHeight, top);

                // 设置新位置
                this.boxLeft = left;
                this.boxTop = top;
            });

            // 鼠标释放事件处理程序
            document.addEventListener("mouseup", () => {
                isDragging = false;
            });

            // 在移动端 释放事件处理程序
            document.addEventListener("touchend", () => {
                isDragging = false;
            });
        },

        // 开始缩放
        startResize(resizeDirection, event) {
            this.isResizing = true;
            this.resizeDirection = resizeDirection;
            // 记录按下时的状态
            this.startX = event.clientX;
            this.startBoxWidth = this.boxWidth;
            this.startBoxHeight = this.boxHeight;
            this.startBoxLeft = this.boxLeft;
            this.startBoxTop = this.boxTop;
            // 添加全局事件监听器
            window.addEventListener('mousemove', this.resize);
            window.addEventListener('touchmove', this.resize);
            window.addEventListener('mouseup', this.stopResize);
            window.addEventListener('touchend', this.stopResize);
        },

        // 缩放中
        resize(event) {
            if (!this.isResizing) return;
            // 根据event值来判断是移动端还是电脑端
            const clientX = (event.touches && event.touches.length > 0) ? event.touches[0].clientX : event.clientX;
            const deltaX = clientX - this.startX;
            // 根据不同的缩放方向，计算新的尺寸和位置
            if (this.resizeDirection == 'lt') {
                // 左上缩放
                // 计算新的宽度和左偏移量
                const newWidth = this.startBoxWidth - deltaX;
                const newLeft = this.startBoxLeft + deltaX;
                // 比例缩放
                const newHeight = newWidth / (this.wrapWidth / this.wrapHeight);
                const newTop = this.startBoxTop + (this.startBoxHeight - newHeight);
                // 边界检查
                if (newHeight >= 5 && newWidth <= this.originShowWidth && newLeft >= 0 && newTop >= 0) {
                    this.boxWidth = newWidth;
                    this.boxHeight = newHeight;
                    this.boxLeft = newLeft;
                    this.boxTop = newTop;
                }
            }
            else if (this.resizeDirection == 'rt') {
                // 右上缩放
                const newWidth = this.startBoxWidth + deltaX;
                // 比例缩放
                const newHeight = newWidth / (this.wrapWidth / this.wrapHeight);
                const newTop = this.startBoxTop + (this.startBoxHeight - newHeight);
                // 边界检查
                if (newHeight >= 5 && newWidth + this.startBoxLeft <= this.originShowWidth && newTop >= 0) {
                    this.boxWidth = newWidth;
                    this.boxHeight = newHeight;
                    this.boxTop = newTop;
                }
            }
            else if (this.resizeDirection == 'lb') {
                // 左下缩放
                const newWidth = this.startBoxWidth - deltaX;
                const newLeft = this.startBoxLeft + deltaX;
                // 比例缩放
                const newHeight = newWidth / (this.wrapWidth / this.wrapHeight);
                // 边界检查
                if (newHeight >= 5 && newWidth <= this.originShowWidth && newLeft >= 0 && this.startBoxTop + newHeight <= this.originShowHeight) {
                    this.boxWidth = newWidth;
                    this.boxHeight = newHeight;
                    this.boxLeft = newLeft;
                }
            }
            else if (this.resizeDirection == 'rb') {
                // 右下缩放
                const newWidth = this.startBoxWidth + deltaX;
                // 比例缩放
                const newHeight = newWidth / (this.wrapWidth / this.wrapHeight);
                // 边界检查
                if (newHeight >= 5 && newWidth + this.startBoxLeft <= this.originShowWidth && this.startBoxTop + newHeight <= this.originShowHeight) {
                    this.boxWidth = newWidth;
                    this.boxHeight = newHeight;
                }
            }
            // 阻止默认事件
            if (!(event.touches && event.touches.length > 0)) {
                event.preventDefault();
            }            
        },

        // 停止缩放
        stopResize() {
            // 清除事件监听器
            window.removeEventListener('mousemove', this.resize);
            window.removeEventListener('touchmove', this.resize);
            window.removeEventListener('mouseup', this.stopResize);
            window.removeEventListener('touchend', this.stopResize);
            // 重置缩放状态
            this.isResizing = false;
            this.resizeDirection = '';
        },

        cut() {
            const img = new Image();
            img.src = this.imgUrl;
            const canvas = this.$refs.cropperCanvas;
            canvas.width = this.cutWidth;
            canvas.height = this.cutHeight;
            const ctx = canvas.getContext("2d");
            img.onload = () => {
                ctx.drawImage(img, this.cutOffsetX, this.cutOffsetY, this.cutWidth, this.cutHeight, 0, 0, canvas.width, canvas.height);
                this.$emit("update:cutOrder", false);   // 裁剪完改回false
                this.$emit("cut", canvas.toDataURL('image/jpeg'));
            }
        }
    },
    mounted() {
        const cropperEl = document.querySelector(".cropper");
        this.cropperWidth = cropperEl.clientWidth;  // 减去左右边线的宽度
        this.cropperHeight = cropperEl.clientHeight;    // 减去上下边线的高度
        this.updateOrigin();    // 初始化原图宽高
        this.initDrag();    // 初始化拖动，开启监听事件
    },
    watch: {
        "imgUrl"(current) {
            if (current) {
                this.updateOrigin();
            }
        },
        "cutOrder"(current) {
            if (current) {
                this.cut();   // true就开始裁剪函数
            }
        },
        "cPrevWidth"(curr) {
            this.$emit("update:prevWidth", curr);
        },
        "cPrevHeight"(curr) {
            this.$emit("update:prevHeight", curr);
        },
        "cPrevOffsetX"(curr) {
            this.$emit("update:prevOffsetX", curr);
        },
        "cPrevOffsetY"(curr) {
            this.$emit("update:prevOffsetY", curr);
        },
    }
}
</script>

<style scoped>
.cropper {
    height: 100%;
    width: 100%;
    background-color: #000;
    border-radius: 4px;
    border: 1px solid #e5e9ef;
    overflow: hidden;
    user-select: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
}

.cropper>img {
    width: 100%;
    height: 100%;
    object-fit: scale-down;
}

.showPosition {
    position: absolute;
}

.crop-box {
    position: relative;
    border: 1px solid #fff;
    box-sizing: border-box;
}

.crop-box-move {
    z-index: 9;
    position: absolute;
    cursor: move;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
}

.cropper-point {
    position: absolute;
    background-color: #f6f7f8;
    height: 12.5px;
    opacity: 1;
    width: 12.5px;
    border-radius: 50%;
    z-index: 10;
}

.point-lt {
    cursor: nwse-resize;
    left: -6px;
    top: -6px;
}

.point-rt {
    cursor: nesw-resize;
    right: -6px;
    top: -6px;
}

.point-lb {
    cursor: nesw-resize;
    left: -6px;
    bottom: -6px;
}

.point-rb {
    cursor: nwse-resize;
    right: -6px;
    bottom: -6px;
}

.marking {
    position: absolute;
    background-color: rgba(0,0,0,.5);
}
</style>