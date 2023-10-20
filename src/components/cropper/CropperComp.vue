<template>
    <div class="cropper">
        <div class="cropper-body">
            <div class="cropper-body-left">
                <div class="img-wrp">
                    <img :src="imgURL" alt="" ref="originImage">
                    <div
                        class="showPosition"
                        ref="showPosition"
                        :style="`top: ${originHeightOffset}px;
                                left: ${originWidthOffset}px;
                                width: ${originShowWidth}px;
                                height: ${originShowHeight}px;`"
                    >
                        <!-- 裁剪框 -->
                        <div
                            class="crop-box"
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
                            <!-- 内侧左蒙版 -->
                            <div
                                class="crop-box-marking-left"
                            ></div>
                            <!-- 内侧右蒙版 -->
                            <div
                                class="crop-box-marking-right"
                            ></div>
                            <!-- 内侧上蒙版 不可见 -->
                            <div
                                class="crop-box-marking-top"
                            ></div>
                            <!-- 内侧下蒙版 不可见 -->
                            <div
                                class="crop-box-marking-bottom"
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
                <div class="tips-wrp">
                    <div>当前分辨率 {{ cutWidth }}*{{ cutHeight }}</div>
                    <div>*部分情况下您的封面将以4:3比例展示</div>
                </div>
            </div>
            <div class="cropper-body-right">
                <div class="preview-item">
                    <div class="preview-title">16:9效果预览</div>
                    <div class="preview-card">
                        <div class="pic169">
                            <img
                                :src="imgURL" alt=""
                                :style="`width: ${prev169Width}px;
                                        height: ${prev169Height}px;
                                        transform: translateX(-${prev169OffsetX}px) translateY(-${prev169OffsetY}px);`"
                            >
                        </div>
                        <div class="title"><span>{{ title }}</span></div>
                    </div>
                </div>
                <div class="preview-item">
                    <div class="preview-title">4:3效果预览</div>
                    <div class="preview-card">
                        <div class="pic43">
                            <img
                                :src="imgURL" alt=""
                                :style="`width: ${prev43Width}px;
                                        height: ${prev43Height}px;
                                        transform: translateX(-${prev43OffsetX}px) translateY(-${prev43OffsetY}px);`"
                            >
                        </div>
                        <div class="title"><span>{{ title }}</span></div>
                    </div>
                </div>
            </div>
        </div>
        <canvas ref="cropperCanvas" style="display: none"></canvas>
    </div>
</template>

<script>
export default {
    name: "CropperComp",
    data() {
        return {
            width: 0,   // 原图的宽
            height: 0,  // 原图的高
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
        // 被裁剪的图片原图，watch监听变化
        imgURL: {
            type: String,
            default() {
                return null;
            }
        },
        // 开始裁剪命令 v-model进行双向绑定 在watch里监听变化，由false变为true时就触发裁剪
        cutOrder: {
            type: Boolean,
            default() {
                return false;
            }
        },
        // 预览标题
        title: {
            type: String,
            default() {
                return "title";
            }
        }
    },
    computed: {
        // 计算原图宽高比
        originAspectRatio() {
            return this.width / this.height;
        },

        // 计算原图呈现宽
        originShowWidth() {
            // 如果原图较高，重新计算呈现宽，否则就480
            if (this.originAspectRatio < 16/9) {
                return 270 * this.originAspectRatio;
            } else {
                return 480;
            }
        },

        // 计算原图呈现高
        originShowHeight() {
            // 如果原图较宽，重新计算呈现高，否则就270
            if (this.originAspectRatio > 16/9) {
                return 480 / this.originAspectRatio;
            } else {
                return 270;
            }
        },

        // 计算原图相对 img-wrp 的宽偏移量
        originWidthOffset() {
            // 如果原图较高，计算左右偏移量，否则就0
            if (this.originAspectRatio < 16/9) {
                // 先根据固定高计算呈现宽
                const showWidth = 270 * this.originAspectRatio;
                return (480 - showWidth) / 2;
            } else {
                return 0;
            }
        },

        // 计算原图相对 img-wrp 的高偏移量
        originHeightOffset() {
            // 如果原图较宽，计算上下偏移量，否则就0
            if (this.originAspectRatio > 16/9) {
                // 先根据固定宽计算呈现高
                const showHeight = 480 / this.originAspectRatio;
                return (270 - showHeight) / 2;
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

        // 计算16:9预览图相关
        // 实际宽度
        prev169Width() {
            return 224 * (this.originShowWidth / this.boxWidth);
        },
        // 实际高度
        prev169Height() {
            return 126 * (this.originShowHeight / this.boxHeight);
        },
        // 实际偏移X
        prev169OffsetX() {
            return this.prev169Width * (this.boxLeft / this.originShowWidth);
        },
        // 实际偏移Y
        prev169OffsetY() {
            return this.prev169Height * (this.boxTop / this.originShowHeight);
        },

        // 计算4:3预览图相关
        // 实际宽度
        prev43Width() {
            return 224 * (this.originShowWidth / (this.boxWidth * 0.75));
        },
        // 实际高度
        prev43Height() {
            return 168 * (this.originShowHeight / this.boxHeight);
        },
        // 实际偏移X
        prev43OffsetX() {
            return this.prev43Width * ((this.boxWidth * 0.125 + this.boxLeft) / this.originShowWidth);
        },
        // 实际偏移Y
        prev43OffsetY() {
            return this.prev43Height * (this.boxTop / this.originShowHeight);
        }
    },
    methods: {
        // 初始化裁剪框
        initBox() {
            // console.log("初始化裁剪框");
            // 如果是较宽图片，以原图呈现高初始化
            if (this.originAspectRatio > 16/9) {
                this.boxHeight = 0.9 * this.originShowHeight;
                this.boxWidth = this.boxHeight * 16/9;
                this.boxTop = (this.originShowHeight - this.boxHeight) / 2;
                this.boxLeft = (480 - this.boxWidth) / 2;
            }
            // 否则以原图呈现宽初始化
            else {
                this.boxWidth = 0.9 * this.originShowWidth;
                this.boxHeight = this.boxWidth / (16/9);
                this.boxTop = (270 - this.boxHeight) / 2;
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

        // 图片更换时更新原图宽高值，并且更新裁剪框呈现
        updateOrigin() {
            const img = new Image();
            img.src = this.imgURL;
            img.onload = () => {
                this.width = img.width;
                this.height = img.height;
                // console.log(this.width + "*" + this.height);
                setTimeout(() => {
                    this.initBox();     // 初始化裁剪框
                }, 1);    // 异步延时等待初始值更新完
            }
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
                const newHeight = newWidth / (16/9);
                const newTop = this.startBoxTop + (this.startBoxHeight - newHeight);
                // 边界检查
                if (newWidth >= 64 && newWidth <= this.originShowWidth && newLeft >= 0 && newTop >= 0) {
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
                const newHeight = newWidth / (16/9);
                const newTop = this.startBoxTop + (this.startBoxHeight - newHeight);
                // 边界检查
                if (newWidth >= 64 && newWidth + this.startBoxLeft <= this.originShowWidth && newTop >= 0) {
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
                const newHeight = newWidth / (16/9);
                // 边界检查
                if (newWidth >= 64 && newWidth <= this.originShowWidth && newLeft >= 0 && this.startBoxTop + newHeight <= this.originShowHeight) {
                    this.boxWidth = newWidth;
                    this.boxHeight = newHeight;
                    this.boxLeft = newLeft;
                }
            }
            else if (this.resizeDirection == 'rb') {
                // 右下缩放
                const newWidth = this.startBoxWidth + deltaX;
                // 比例缩放
                const newHeight = newWidth / (16/9);
                // 边界检查
                if (newWidth >= 64 && newWidth + this.startBoxLeft <= this.originShowWidth && this.startBoxTop + newHeight <= this.originShowHeight) {
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
            img.src = this.imgURL;
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
        this.updateOrigin();    // 初始化原图宽高
        this.initDrag();    // 初始化拖动，开启监听事件
    },
    watch: {
        "imgURL"(current) {
            if (current) {
                this.updateOrigin();
            }
        },
        "cutOrder"(current) {
            if (current) {
                this.cut();     // true就开始裁剪函数
            }
        }
    }
}
</script>

<style scoped>
.cropper {
    user-select: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
}

.cropper-body {
    display: flex;
    position: relative;
}

.cropper-body-left {
    padding-top: 22px;
    width: 480px;
}

.img-wrp {
    height: 270px;
    width: 100%;
    border-radius: 4px;
    background-color: #000;
    overflow: hidden;
    text-align: center;
    position: relative;
}

.img-wrp>img {
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

.crop-box-marking-left {
    z-index: 8;
    position: absolute;
    width: 12.5%;
    height: 100%;
    background: rgba(0,0,0,.2);
    border-right: 1px dashed rgba(255,111,111,.6);
    left: 0;
    top: 0;
}

.crop-box-marking-right {
    z-index: 8;
    position: absolute;
    width: 12.5%;
    height: 100%;
    background: rgba(0,0,0,.2);
    border-left: 1px dashed rgba(255,111,111,.6);
    right: 0;
    top: 0;
}

.crop-box-marking-top {
    z-index: 7;
    position: absolute;
    height: 12.5%;
    width: 100%;
    left: 0;
    top: 0;
}

.crop-box-marking-bottom {
    z-index: 7;
    position: absolute;
    height: 12.5%;
    width: 100%;
    left: 0;
    bottom: 0;
}

.cropper-point {
    position: absolute;
    background-color: #fff;
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

.tips-wrp {
    font-weight: 400;
    font-size: 12px;
    line-height: 20px;
    color: var(--text2);
    margin-top: 12px;
}

.cropper-body-right {
    position: absolute;
    right: 0;
    transform: scale(.62);
    transform-origin: right 0;
    padding-right: 50px;
}

.preview-item {
    margin-top: 18px;
}

.preview-title {
    margin-bottom: 10px;
    position: relative;
    font-weight: 400;
    text-align: left;
    font-size: 20px;
    color: #19181c;
}

.preview-card {
    width: 224px;
    background: #fff;
    box-shadow: 0 2px 5px rgba(0,0,0,.1);
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
}

.pic169 {
    position: relative;
    overflow: hidden;
    height: 126px;
    width: 100%;
    border-radius: 8px 8px 0 0;
    background-color: var(--graph_bg_regular);
}

.pic43 {
    position: relative;
    overflow: hidden;
    height: 168px;
    width: 100%;
    border-radius: 8px 8px 0 0;
    background-color: var(--graph_bg_regular);
}

.title {
    height: 65px;
    width: 100%;
}

.title span {
    margin: 8px 12px;
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
    color: #212121;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    overflow: hidden;
    -webkit-line-clamp: 2;
    word-break: break-all;
}
</style>