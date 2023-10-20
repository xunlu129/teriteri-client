<template>
    <div class="player-progress-area">
        <div class="player-progress-wrap" @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave" ref="progress">
            <div class="player-progress" :class="isActive ? 'state-active' : ''">
                <div class="player-progress-schedule-wrap">
                    <div class="player-progress-schedule">
                        <div class="player-progress-schedule-buffer" :style="`transform: scaleX(${bufferPer});`"></div>
                        <div class="player-progress-schedule-current" :style="`transform: scaleX(${currentPer});`"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
let inTimer;  // 节流计时器
let outTimer;

export default {
    name: "PlayerProgress",
    data() {
        return {
            isActive: false,    // 光标是否悬停进度条
            isDragging: false,  // 是否正在拖动
        }
    },
    props: {
        // 缓存百分比 小数0~1
        bufferPer: {
            type: Number,
            default() {
                return 0.00001;
            }
        },
        // 当前进度百分比 小数0~1
        currentPer: {
            type: Number,
            default() {
                return 0.00001;
            }
        },
        // 外部控制进度条粗细
        activing: {
            type: Boolean,
            default() {
                return false;
            }
        }
    },
    methods: {
        // 悬浮时的效果
        handleMouseEnter() {
            inTimer = setTimeout(() => {
                this.isActive = true;
            }, 200);
        },
        handleMouseLeave() {
            clearTimeout(inTimer);    // 清除显示计时器防止快速经过时的闪烁
            if (!this.isDragging) {
                outTimer = setTimeout(() => {
                    this.isActive = false;
                }, 50);                
            }            
        },

        // 初始化拖动
        initDrag() {
            const progress = this.$refs.progress;
            let offsetX, currPer;

            // 鼠标按下事件处理程序
            progress.addEventListener("mousedown", (e) => {
                this.isDragging = true;
                this.isActive = true;
                offsetX = e.clientX - progress.getBoundingClientRect().left; // 鼠标相对进度条左侧的X偏移
                currPer = offsetX / progress.getBoundingClientRect().width; // 计算进度比例
                this.$emit("changeCurrent", currPer);    // 更新
            });

            // 移动端 触碰事件处理程序
            progress.addEventListener("touchstart", (e) => {
                this.isDragging = true;
                this.isActive = true;
                offsetX = e.touches[0].clientX - progress.getBoundingClientRect().left;
                currPer = offsetX / progress.getBoundingClientRect().width; // 计算进度比例
                this.$emit("changeCurrent", currPer);    // 更新
            });

            // 鼠标移动事件处理程序
            document.addEventListener("mousemove", (e) => {
                if (!this.isDragging) return;
                offsetX = e.clientX - progress.getBoundingClientRect().left; // 鼠标相对进度条左侧的X偏移
                currPer = offsetX / progress.getBoundingClientRect().width; // 计算进度比例
                // 边界值判定
                currPer = Math.max(0.00001, currPer);
                currPer = Math.min(0.99999, currPer);
                this.$emit("changeCurrent", currPer);    // 更新
            });

            // 移动端 移动事件处理程序
            document.addEventListener("touchmove", (e) => {
                if (!this.isDragging) return;
                e.preventDefault();
                offsetX = e.touches[0].clientX - progress.getBoundingClientRect().left;
                currPer = offsetX / progress.getBoundingClientRect().width; // 计算进度比例
                // 边界值判定
                currPer = Math.max(0.00001, currPer);
                currPer = Math.min(0.99999, currPer);
                this.$emit("changeCurrent", currPer);    // 更新
            }, { passive: false });

            // 鼠标释放事件处理程序
            document.addEventListener("mouseup", () => {
                this.isDragging = false;
                this.isActive = false;
            });

            // 移动端 释放事件处理程序
            document.addEventListener("touchend", () => {
                this.isDragging = false;
                this.isActive = false;
            });
        },
    },
    mounted() {
        this.initDrag();
    },
    watch: {
        "activing"(current) {
            clearTimeout(outTimer);
            this.isDragging = current;
            this.isActive = current;
        }
    }
}
</script>

<style scoped>
.player-progress-area {
    position: relative;
    user-select: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
}

.player-progress-wrap {
    -webkit-box-align: end;
    -ms-flex-align: end;
    align-items: flex-end;
    cursor: pointer;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    height: 16px;
    padding-bottom: 6px;
}

.player-progress {
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

.state-active {
    height: 4px;
}

.player-progress-schedule-wrap {
    position: absolute;
    height: 100%;
    width: 100%;
}

.player-progress-schedule {
    background-color: hsla(0,0%,100%,.2);
    border-radius: 1.5px;
    bottom: 0;
    left: 0;
    overflow: hidden;
    position: absolute;
    right: 0;
    top: 0;
}

.player-progress-schedule-buffer {
    background-color: hsla(0,0%,100%,.3);
}

.player-progress-schedule-current {
    background-color: var(--brand_pink);
}

.player-progress-schedule-buffer, .player-progress-schedule-current {
    bottom: 0;
    left: 0;
    position: absolute;
    right: 0;
    top: 0;
    -webkit-transform: scaleX(0);
    transform: scaleX(0);
    -webkit-transform-origin: 0 0;
    transform-origin: 0 0;
}
</style>