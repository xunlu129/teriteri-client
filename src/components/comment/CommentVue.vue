<template>
    <div class="comment">
        <div>
            <div class="teriteri-comment browser-pc">
                <div class="comment-container">
                    <div class="reply-header">
                        <!-- 加载 -->
                        <!-- 导航栏 -->
                        <div class="reply-navigation">
                            <ul class="nav-bar">
                                <li class="nav-title">
                                    <span class="nav-title-text"> 评论 </span>
                                    <span class="total-reply">{{ count }}</span>
                                </li>
                                <li class="nav-sort hot">
                                    <div class="hot-sort" @click="hotComment">最热</div>
                                    <div class="part-symbol"></div>
                                    <div class="time-sort" @click="timeComment">最新</div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <!-- 评论区 -->
                    <div class="reply-wrap">
                        <div class="main-reply-box">
                            <div class="reply-box">
                                <ReplyTextarea :commentInfo="commentInfo" ref="rootReply" @get-comment="getCommentTree">
                                </ReplyTextarea>
                            </div>
                        </div>
                        <CommentTree ref="CommentTree"></CommentTree>
                        <FixReplyBox ref="FixReplyBox"></FixReplyBox>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import CommentTree from './CommentTree.vue';
import ReplyTextarea from './ReplyTextarea.vue';
import FixReplyBox from './FixReplyBox.vue';

export default {
    name: "CommentVue",
    components: {
        CommentTree,
        ReplyTextarea,
        FixReplyBox
    },
    props: {
        uid: {
            type: Number,
            default: -1
        },
        count: {
            type: Number,
            default: 0
        }
    },
    data() {
        return {
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
            }
        }
    },
    methods: {
        async getCommentTree() {
            this.$refs.CommentTree.getCommentTree();
        },

        debugSendComment() {
            console.log("SendCommentButton clicked!");
        },

        deleteComment(index) {
            this.commentList.splice(index, 1);
        },

        hotComment() {
            this.$refs.CommentTree.getCommentTree2(1);
        },

        timeComment() {
            this.$refs.CommentTree.getCommentTree2(2);
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
                this.$refs.rootReply.handleFocus(false);
                this.$refs.CommentTree.handleFocus(false);
                this.$refs.FixReplyBox.handleFocus(false);
            });
        }
    },
    mounted() {
        window.addEventListener("click", this.handleOutSideClick);
    },
    beforeMount() {
        window.removeEventListener("click", this.handleOutSideClick);
    },
    watch: {
        "uid"(curr) {
            this.commentInfo.to_user_id = curr;
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

.nav-title .nav-title-text {
    color: black;
    font-size: 20px;
    font-family: PingFang SC, HarmonyOS_Medium, Helvetica Neue, Microsoft YaHei, sans-serif;
    font-weight: 500;
    ;
}

.total-reply {
    font-size: 13px;
    margin: 0 36px 0 6px;
    font-weight: 400;
    color: #9499A0;

}

.hot-sort {
    color: black
}

.time-sort {
    cursor: pointer;
}


.reply-wrap {
    position: relative;
}

.reply-box {
    display: flex;
    flex-direction: column;
}



.part-symbol {
    height: 11px;
    margin: 0 12px;
    border-left: solid 1px;
}

.nav-sort {
    display: flex;
    align-items: center;
    color: darkgrey;
}
</style>