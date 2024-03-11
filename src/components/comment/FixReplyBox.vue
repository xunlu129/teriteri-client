<template>
    <div class="fixed-reply-box" :class="isHideReplyBox ? 'reply-box-hide' : 'is-box-show'"
        :style="`--left: ${left}px; --width: ${width}px; display: ${replyBoxDisplay};`">
        <i class="reply-box-shadow"></i>
        <div class="reply-box fixed-box">
            <ReplyTextarea ref="ReplyTextarea"></ReplyTextarea>
        </div>
    </div>
</template>

<script>
import { setTimeout } from 'core-js';
import ReplyTextarea from './ReplyTextarea.vue';

export default {
    name: "FixReplyBox",
    components: {
        ReplyTextarea,
    },
    data() {
        return {
            left: 0,
            width: 0,
            // 是否隐藏回复框
            isHideReplyBox: true,
            replyBoxDisplay: "none",
        }
    },
    methods: {
        // 回复框的 resize
        resize() {
            const _width = document.querySelector(".reply-wrap").clientWidth;
            const _left = document.querySelector(".reply-wrap").getBoundingClientRect().left;

            this.left = _left;
            this.width = _width;
        },
        // 回复框滚动隐藏效果
        async handleScroll() {
            const inputElement = document.querySelector(".main-reply-box");
            const offsetButtom = inputElement.getBoundingClientRect().bottom;

            // console.log("offsetButtom", offsetButtom)

            if (offsetButtom < 0 && this.isHideReplyBox) {
                this.replyBoxDisplay = "";
                this.isHideReplyBox = false;
            } else if (offsetButtom >= 0 && !this.isHideReplyBox) {
                this.isHideReplyBox = true;
                setTimeout(() => {
                    this.replyBoxDisplay = "none";
                }, 300);
            }
        },
        async handleFocus(value) {
            this.$refs.ReplyTextarea.handleFocus(value);
        },

    },
    mounted() {
        this.resize();
        window.addEventListener("resize", this.resize);
        window.addEventListener("scroll", this.handleScroll);
        this.handleScroll();
    },
    unmounted() {
        window.removeEventListener("resize", this.resize);
        window.removeEventListener("scroll", this.resize);
    }
}
</script>

<style scoped>
.fixed-reply-box {
    position: fixed;
    bottom: 0;
    left: var(--left);
    z-index: 10;
    width: var(--width);
}

.reply-box-hide {
    animation: fade-out-bottom 0.3s ease-out forwards;
    transform-origin: top;
}

.reply-box-show {
    animation: fade-in-bottom 0.3s ease-out forwards;
    transform-origin: top;
}

@keyframes fade-in-bottom {
    0% {
        opacity: 0;
        transform: translateY(-5px);
    }

    100% {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes fade-out-bottom {
    0% {
        opacity: 1;
        transform: translateY(0);
    }

    100% {
        opacity: 0;
        transform: translateY(-5x);
    }
}

.reply-box-shadow {
    position: absolute;
    top: -10px;
    z-index: 1;
    width: 100%;
    height: 36px;
    border-radius: 50%;
    background-color: #00000014;
    filter: blur(10px);
}

.reply-box.fixed-box {
    position: relative;
    z-index: 2;
    padding: 15px 0;
    border-top: 0.5px solid #E3E5E7;
    background-color: #FFFFFF;
}

.reply-box {
    display: flex;
    flex-direction: column;
}
</style>