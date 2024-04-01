<template>
    <div class="comment">
        <div class="teriteri-comment browser-pc">
            <div class="comment-container">
                <div class="reply-header">
                    <!-- 加载 -->
                    <!-- 导航栏 -->
                    <div class="reply-navigation">
                        <ul class="nav-bar">
                            <li class="nav-title">
                                <span class="nav-title-text">评论</span>
                                <span class="total-reply">{{ count }}</span>
                            </li>
                            <li class="nav-sort">
                                <div class="sort-item" :class="{'active': type === 1}" @click="changeCommentSort(1)">最热</div>
                                <div class="part-symbol"></div>
                                <div class="sort-item" :class="{'active': type === 2}" @click="changeCommentSort(2)">最新</div>
                            </li>
                        </ul>
                    </div>
                </div>
                <!-- 评论区 -->
                <div class="reply-wrap">
                    <div class="main-reply-box">
                        <div class="reply-box">
                            <ReplyTextarea :commentInfo="commentInfo" ref="rootReply" @addComment="addComment" :isWideWindow="isWideWindow"></ReplyTextarea>
                        </div>
                    </div>
                    <CommentTree ref="CommentTree" :type="type" :upUid="uid" :isWideWindow="isWideWindow"></CommentTree>
                    <div class="fixed-reply-box" :class="isHideReplyBox ? 'reply-box-hide' : 'reply-box-show'"
                        :style="`--left: ${left}px; --width: ${width}px; display: ${replyBoxDisplay};`">
                        <i class="reply-box-shadow"></i>
                        <div class="reply-box fixed-box">
                            <ReplyTextarea ref="FixReplyBox" :commentInfo="commentInfo" @addComment="addComment" :isWideWindow="isWideWindow"></ReplyTextarea>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import CommentTree from './CommentTree.vue';
import ReplyTextarea from './ReplyTextarea.vue';

export default {
    name: "CommentVue",
    components: {
        CommentTree,
        ReplyTextarea,
    },
    props: {
        uid: {
            type: Number,
            default: 0
        },
        count: {
            type: Number,
            default: 0
        }
    },
    data() {
        return {
            type: 1,    // 评论排序方式 1最热 2最新
            content: "",
            parentId: null,
            toUserId: null,
            rooId: null,
            newCommentText: "",
            commentInfo: {
                root_id: 0,
                parent_id: 0,
                to_user_id: this.uid,
                vid: this.$route.params.vid,
            },
            isWideWindow: false,    // 是否是宽屏
            left: 0,    // 固钉评论框左偏移量
            width: 0,   // 固钉评论框宽度
            // 是否隐藏回复框
            isHideReplyBox: true,
            replyBoxDisplay: "none",
        }
    },
    methods: {
        addComment(comment) {
            this.$refs.CommentTree.addComment(comment);
        },

        changeCommentSort(type) {
            if (this.type === type) return;
            this.type = type;
            this.$refs.CommentTree.clearCommentList();
            this.$nextTick(() => {
                this.$refs.CommentTree.getCommentTree();
            });
        },

        // 点击空白处关闭回复框
        handleOutSideClick(event) {
            const text = document.querySelectorAll(".textarea-wrap");
            const emoji = document.querySelectorAll(".reply-box-emoji");
            const at = document.querySelectorAll(".at-btn");
            const sendComment = document.querySelectorAll(".reply-box-send");
            const replyBtn = document.querySelectorAll(".reply-btn");
            const subReplyBtn = document.querySelectorAll(".sub-reply-btn");
            const emojibox = document.querySelectorAll(".emoji-box");

            const elements = [...text, ...emoji, ...at, ...sendComment, ...replyBtn, ...subReplyBtn, ...emojibox];

            // console.log("elements:", elements)

            for (let i = 0; i < elements.length; i++) {
                if (elements[i].contains(event.target)) return;
            }

            this.$nextTick(() => {
                this.$refs.rootReply.cancelFocus();
                this.$refs.CommentTree.cancelFocus();
                this.$refs.FixReplyBox.cancelFocus();
            });
        },

        // 窗口大小变动时的回调
        resize() {
            this.isWideWindow = window.innerWidth >= 1620;
            this.width = document.querySelector(".reply-wrap").clientWidth;
            this.left = document.querySelector(".reply-wrap").getBoundingClientRect().left;
        },
        
        // 回复框滚动隐藏效果
        async handleScroll() {
            const inputElement = document.querySelector(".main-reply-box");
            const offsetButtom = inputElement.getBoundingClientRect().bottom;
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
    },
    mounted() {
        this.$nextTick(() => {
            this.resize();
            this.handleScroll();
        });
        window.addEventListener("click", this.handleOutSideClick);
        window.addEventListener('resize', this.resize);
        window.addEventListener("scroll", this.handleScroll);
    },
    beforeUnmount() {
        window.removeEventListener("click", this.handleOutSideClick);
        window.removeEventListener('resize', this.resize);
        window.removeEventListener("scroll", this.handleScroll);
    },
    watch: {
        "uid"(curr) {
            this.commentInfo.to_user_id = curr;
        },
        "$route.params.vid"(curr) {
            this.commentInfo.vid = curr;
        }
    }

}
</script>

<style scoped>
.comment {
    margin-top: 24px;
    z-index: 0;
    position: relative;
}

.teriteri-comment .browser-pc {
    background-color: #FFFFFF;
}

.comment-container {
    animation-name: enterAnimation-commentContainer;
    animation-duration: 1s;
    animation-fill-mode: forwards;
}



.reply-navigation {
    margin-bottom: 22px;
}

.nav-bar {
    display: flex;
    align-items: center;
    list-style: none;
    margin: 0;
    padding: 0;
}

.nav-title {
    display: flex;
    align-items: center;
    justify-content: center;
}

.nav-title .nav-title-text {
    color: black;
    font-size: 20px;
    font-weight: 500;
}

.total-reply {
    margin: 0 36px 0 6px;
    font-weight: 400;
    color: #9499A0;

}

@media screen and (max-width: 1681px) {
    .total-reply {
        font-size: 13px;
    }
}

@media screen and (min-width: 1681px) {
    .total-reply {
        font-size: 14px;
    }
}

.nav-sort {
    display: flex;
    align-items: center;
}

.sort-item {
    color: var(--text3);
    cursor: pointer;
}

.sort-item:hover {
    color: var(--brand_pink);
}

.sort-item.active {
    color: var(--text1) !important;
}

.part-symbol {
    height: 11px;
    margin: 0 12px;
    border-left: solid 1px;
}

.reply-wrap {
    position: relative;
}

.reply-box {
    display: flex;
    flex-direction: column;
}

.fixed-reply-box {
    position: fixed;
    bottom: 0;
    left: var(--left);
    z-index: 10;
    width: var(--width);
}

.reply-box-hide {
    animation: fade-out-bottom 0.3s ease-out forwards;
    transform-origin: bottom;
}

.reply-box-show {
    animation: fade-in-bottom 0.3s ease-out forwards;
    transform-origin: bottom;
}

@keyframes fade-in-bottom {
    0% {
        opacity: 0;
        transform: translateY(5px);
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
        transform: translateY(5x);
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