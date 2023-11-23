<template>
    <div class="slider-column v-ui">
        <div class="v-ui-area">
            <div class="track track-vertical">
                <div class="bar-wrap">
                    <div class="bar" :style="`transform: scaleY(${barScaleY});`"></div>
                </div>
                <div class="thumb" :style="`transform: translateY(-${thumbOffsetY}px);`">
                    <div class="thumb-dot"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "SliderColumn",
    data() {
        return {
            isDragging: false,  // 是否正在拖动
            barScaleY: 0,   // 滑动条的Y轴缩放百分比 0~1
            thumbOffsetY: 0,    // 滑块Y轴的向上偏移量 单位px
        }
    },
    props: {
        // 当前进度百分比 小数0~1
        currentPer: {
            type: Number,
            default() {
                return 0;
            }
        },
        // 滑块总高度
        sliderHeight: {
            type: Number,
            default() {
                return 12;
            }
        },
        // 更新信号
        order: {
            type: Boolean,
            default() {
                return false;
            }
        },
    },
    methods: {
        // 初始化滑块位置
        initPosition() {
            this.barScaleY = this.currentPer;
            this.thumbOffsetY = (this.sliderHeight - 12) * this.currentPer;
            this.$emit("update:order", false);
        },

        // 初始化拖动
        initDrag() {
            const slider = document.querySelector('.slider-column');
            let offsetY, currPer;

            // 鼠标按下事件处理程序
            slider.addEventListener("mousedown", (e) => {
                this.isDragging = true;
                offsetY = slider.getBoundingClientRect().bottom - e.clientY;
                currPer = offsetY / slider.getBoundingClientRect().height; // 计算进度比例
                this.barScaleY = currPer;
                this.thumbOffsetY = (slider.getBoundingClientRect().height - 12) * currPer;
                this.$emit("changeCurrent", currPer);    // 更新
            });

            // 移动端 触碰事件处理程序
            slider.addEventListener("touchstart", (e) => {
                this.isDragging = true;
                offsetY = slider.getBoundingClientRect().bottom - e.touches[0].clientY;
                currPer = offsetY / slider.getBoundingClientRect().height; // 计算进度比例
                this.barScaleY = currPer;
                this.thumbOffsetY = (slider.getBoundingClientRect().height - 12) * currPer;
                this.$emit("changeCurrent", currPer);    // 更新
            });

            // 鼠标移动事件处理程序
            document.addEventListener("mousemove", (e) => {
                if (!this.isDragging) return;
                offsetY = slider.getBoundingClientRect().bottom - e.clientY;
                currPer = offsetY / slider.getBoundingClientRect().height; // 计算进度比例
                // 边界值判定
                currPer = Math.max(0, currPer);
                currPer = Math.min(1, currPer);
                this.barScaleY = currPer;
                this.thumbOffsetY = (slider.getBoundingClientRect().height - 12) * currPer;
                this.$emit("changeCurrent", currPer);    // 更新
            });

            // 移动端 移动事件处理程序
            document.addEventListener("touchmove", (e) => {
                if (!this.isDragging) return;
                e.preventDefault();
                offsetY = slider.getBoundingClientRect().bottom - e.touches[0].clientY;
                currPer = offsetY / slider.getBoundingClientRect().height; // 计算进度比例
                // 边界值判定
                currPer = Math.max(0, currPer);
                currPer = Math.min(1, currPer);
                this.barScaleY = currPer;
                this.thumbOffsetY = (slider.getBoundingClientRect().height - 12) * currPer;
                this.$emit("changeCurrent", currPer);    // 更新
            }, { passive: false });

            // 鼠标释放事件处理程序
            document.addEventListener("mouseup", () => {
                this.isDragging = false;
            });

            // 移动端 释放事件处理程序
            document.addEventListener("touchend", () => {
                this.isDragging = false;
            });
        },
    },
    mounted() {
        this.initPosition();
        this.initDrag();
    },
    watch: {
        "order"(curr) {
            if (curr) {
                this.initPosition();
            }
        }
    }
}
</script>

<style scoped>
.slider-column {
    cursor: pointer;
    height: 12px;
}

.slider-column .track {
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    height: 2px;
    position: relative;
    width: 100%;
}

.slider-column .track.track-vertical {
    -webkit-box-align: end;
    -ms-flex-align: end;
    align-items: flex-end;
    height: 100%;
    width: 2px;
}

.bar-wrap {
    background: #e7e7e7;
    border-radius: 1.5px;
    bottom: 0;
    left: 0;
    overflow: hidden;
    position: absolute;
    right: 0;
    top: 0;
}

.bar {
    background: var(--brand_pink);
    bottom: 0;
    left: 0;
    position: absolute;
    right: 0;
    top: 0;
    -webkit-transform-origin: 0 100%;
    transform-origin: 0 100%;
}

.thumb {
    bottom: 0;
    position: relative;
    top: auto;
    cursor: pointer;
    left: -5px;
}

.thumb-dot {
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    background-color: var(--brand_pink);
    border-radius: 50%;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-transform: translateZ(0);
    transform: translateZ(0);
    -webkit-transition: all .2s;
    transition: all .2s;
    vertical-align: middle;
    height: 12px;
    width: 12px;
}
</style>