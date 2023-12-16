<template>
    <div @mouseleave="handleMouseLeave" style="position: relative;">
        <div @mouseenter="handleMouseEnter" @click="handleClick" style="position: relative;" ref="vPopRef">
            <slot name="reference"></slot>
        </div>
        <div class="v-popover" :class="'to-' + placement" :style="popStyle">
            <div
                class="v-popover-content"
                ref="vPopCon"
                :class="isPopoverShow ? 'popShow-' + placement : 'popHide-' + placement"
                :style="{ display: popoverDisplay }"
            >
                <slot name="content"></slot>
            </div>
        </div>
    </div>
</template>

<script>
let inTimer;  // 节流计时器
// let outTimer;

    export default {
        name: "VPopover",
        props: {
            // 显示方向
            placement: {
                type: String,
                default() {
                    return "bottom";
                }
            },
            // 触发方式 目前支持悬停hover、点击click
            trigger: {
                type: String,
                default() {
                    return "hover";
                }
            },
            popStyle: {
                type: String,
                default() {
                    return "";
                }
            }
        },
        data() {
            return {
                // 气泡框的显隐
                popoverDisplay: "none",
                isPopoverShow: false,
            }
        },
        methods: {
            show() {
                this.popoverDisplay = "";
                this.isPopoverShow = true;
            },
            hide() {
                this.isPopoverShow = false;
                setTimeout(() => {
                    this.popoverDisplay = "none";
                }, 300);
            },

            handleMouseEnter() {
                if (this.trigger === "hover") {
                    inTimer = setTimeout(() => {
                        this.show();
                    }, 100);
                }
            },
            handleMouseLeave() {
                if (this.trigger === "hover") {
                    clearTimeout(inTimer);
                    this.hide();
                }
            },
            handleClick() {
                if (this.trigger === "click") {
                    if (this.isPopoverShow) {
                        this.hide();
                    } else {
                        this.show();
                    }
                }
            },
            // 点击空白处关闭气泡
            handleOutsideClick(event) {
                const vPopRef = this.$refs.vPopRef;
                const vPopCon = this.$refs.vPopCon;
                if (!vPopRef.contains(event.target) &&! vPopCon.contains(event.target)) {
                    this.hide();
                }
            },
        },
        mounted() {
            if (this.trigger === 'click') {
                window.addEventListener("click", this.handleOutsideClick);
            }
        },
        beforeUnmount() {
            if (this.trigger === 'click') {
                window.removeEventListener("click", this.handleOutsideClick);
            }
        }
    }
</script>

<style scoped>
.v-popover {
    position: absolute;
    transition: .3s;
    z-index: 1;
}

.v-popover-content {
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 0 30px rgba(0,0,0,.1);
    border: 1px solid var(--line_regular);
}

.to-bottom {
    top: 100%;
    left: 50%;
    padding-top: 5px;
}

.to-right {
    top: 50%;
    left: 100%;
    padding-left: 5px;
}

.to-top {
    bottom: 100%;
    left: 50%;
    padding-bottom: 5px;
}

.to-left {
    top: 50%;
    right: 100%;
    padding-right: 5px;
}

.to-top, .to-bottom {
    transform: translate3d(-50%,0,0);   /* 水平左移半个元素身位，使其水平与父元素居中 */
}

.to-left, .to-right {
    transform: translate3d(0,-50%,0);   /* 垂直上移半个元素身位，使其垂直与父元素居中 */
}

.popHide-bottom {
    animation: fade-out-bottom 0.2s ease-out forwards;
    transform-origin: top; /* 设置动画的旋转点为顶部 */
}

.popShow-bottom {
    animation: fade-in-bottom 0.2s ease-out forwards;
    transform-origin: top;
}

/* 淡入动画 */
@keyframes fade-in-bottom {
    0% {
        opacity: 0; /* 初始状态透明 */
        transform: translateY(-5px); /* 向上平移 10px，将元素隐藏在顶部 */
    }
    100% {
        opacity: 1; /* 最终状态不透明 */
        transform: translateY(0); /* 平移恢复到原始位置 */
    }
}

/* 淡出动画 */
@keyframes fade-out-bottom {
    0% {
        opacity: 1; /* 初始状态不透明 */
        transform: translateY(0);   /* 原始位置 */
    }
    100% {
        opacity: 0; /* 最终状态透明 */
        transform: translateY(-5px); /* 向上平移 10px，将元素隐藏在顶部 */
    }
}

.popHide-right {
    animation: fade-out-right 0.2s ease-out forwards;
    transform-origin: left;
}

.popShow-right {
    animation: fade-in-right 0.2s ease-out forwards;
    transform-origin: left;
}

/* 淡入动画 */
@keyframes fade-in-right {
    0% {
        opacity: 0;
        transform: translateX(-5px);
    }
    100% {
        opacity: 1;
        transform: translateX(0);
    }
}

/* 淡出动画 */
@keyframes fade-out-right {
    0% {
        opacity: 1;
        transform: translateX(0);
    }
    100% {
        opacity: 0;
        transform: translateX(-5px);
    }
}

.popHide-top {
    animation: fade-out-top 0.2s ease-out forwards;
    transform-origin: bottom;
}

.popShow-top {
    animation: fade-in-top 0.2s ease-out forwards;
    transform-origin: bottom;
}

/* 淡入动画 */
@keyframes fade-in-top {
    0% {
        opacity: 0;
        transform: translateY(5px);
    }
    100% {
        opacity: 1;
        transform: translateY(0);
    }
}

/* 淡出动画 */
@keyframes fade-out-top {
    0% {
        opacity: 1;
        transform: translateY(0);
    }
    100% {
        opacity: 0;
        transform: translateY(5px);
    }
}

.popHide-left {
    animation: fade-out-left 0.2s ease-out forwards;
    transform-origin: right;
}

.popShow-left {
    animation: fade-in-left 0.2s ease-out forwards;
    transform-origin: right;
}

/* 淡入动画 */
@keyframes fade-in-left {
    0% {
        opacity: 0;
        transform: translateX(5px);
    }
    100% {
        opacity: 1;
        transform: translateX(0);
    }
}

/* 淡出动画 */
@keyframes fade-out-left {
    0% {
        opacity: 1;
        transform: translateX(0);
    }
    100% {
        opacity: 0;
        transform: translateX(5px);
    }
}
</style>