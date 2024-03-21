<template>
    <div class="comment-textarea">
        <div class="box-normal">
            <div class="reply-box-avatar">
                <div class="teriteri-avatar">
                    <VAvatar :img="this.$store.state.user.avatar_url" :size="isWideWindow ? 48 : 40" :auth="this.$store.state.user.auth" />
                </div>
            </div>
            <div class="reply-box-wrap">
                <div class="textarea-wrap" :class="{ 'active': isFocus }"
                    :style="this.$store.state.isLogin ? '' : 'display:none;'">
                    <textarea class="reply-box-textarea" :placeholder="placeholder" @focus="isFocus = true"
                        @blur="handleBlur" ref="textarea" v-model="content" maxlength="2000"
                        :style="{height: content === '' ? '32px': '64px', lineHeight: content === '' ? '32px' : '1.25'}" />
                </div>
                <div class="disable-mask" :style="!this.$store.state.isLogin ? '' : 'display:none;'">
                    <span>请先<span class="to-login-btn" @click="toLogin">登录</span>后发表评论 (・ω・) </span>
                </div>
            </div>
        </div>
        <div class="box-expand" :class="{ 'hide': !isFocus }" :style="this.$store.state.isLogin ? '' : 'display:none;'">
            <div class="box-left">
                <div class="reply-box-emoji">
                    <div class="emoji-btn" @click="emojiBoxShow = !emojiBoxShow">
                        <div class="emoji-btn-icon">
                            <svg t="1708693819833" class="icon" viewBox="0 0 1024 1024" version="1.1"
                                xmlns="http://www.w3.org/2000/svg" p-id="4057" width="100%" height="100%">
                                <path
                                    d="M512 989.866667C249.173333 989.866667 34.133333 776.533333 34.133333 512 34.133333 249.173333 249.173333 34.133333 512 34.133333s477.866667 215.04 477.866667 477.866667c0 264.533333-215.04 477.866667-477.866667 477.866667z m0-904.533334C276.48 85.333333 85.333333 276.48 85.333333 512s191.146667 426.666667 426.666667 426.666667 426.666667-191.146667 426.666667-426.666667S747.52 85.333333 512 85.333333z"
                                    p-id="4058"></path>
                                <path
                                    d="M512 783.75822187c-136.53333333 0-191.14666667-107.40622187-192.96711147-111.0471104-3.64088853-9.10222187-3.64088853-18.2044448 1.8204448-27.30666667 5.46133333-7.28177813 14.5635552-12.74311147 23.66577814-12.74311146h338.60266666c9.10222187 0 18.2044448 5.46133333 23.66577707 12.74311146 5.46133333 7.28177813 5.46133333 18.2044448 1.8204448 27.30666667-5.46133333 3.64088853-60.07466667 111.04711147-196.608 111.0471104z m-112.8675552-96.4835552c23.66577813 20.02488853 60.07466667 41.87022187 112.8675552 41.87022187 52.79288853 0 89.20177813-21.84533333 112.8675552-41.87022187H399.1324448zM704.96711147 494.3075552c-7.28177813 0-14.5635552-1.8204448-20.0248896-7.28177706l-72.81777707-72.81777814c-10.92266667-10.92266667-10.92266667-27.30666667 0-38.22933333l72.81777707-72.81777813c10.92266667-10.92266667 27.30666667-10.92266667 38.22933333 0 10.92266667 10.92266667 10.92266667 27.30666667 0 38.22933333l-52.79288853 52.7928896 52.79288853 52.79288853c10.92266667 10.92266667 10.92266667 27.30666667 0 38.22933334-3.64088853 7.28177813-10.92266667 9.10222187-18.20444373 9.10222186zM319.03288853 494.3075552c-7.28177813 0-14.5635552-1.8204448-20.02488853-7.28177706-10.92266667-10.92266667-10.92266667-27.30666667 0-38.22933334l52.79288853-52.7928896-52.79288853-52.79288853c-10.92266667-10.92266667-10.92266667-27.30666667 0-38.22933333 10.92266667-10.92266667 27.30666667-10.92266667 38.22933333 0l72.81777814 72.81777813c10.92266667 10.92266667 10.92266667 27.30666667 0 38.22933333l-72.81777814 72.81777707c-3.64088853 3.64088853-10.92266667 5.46133333-18.2044448 5.46133333z"
                                    p-id="4059"></path>
                            </svg>
                        </div>
                    </div>
                    <EmojiBox :style="{top: content === '' ? '-320px': '-352px', left: '0'}" v-model:show="emojiBoxShow" @insertEmoji="insertEmoji"></EmojiBox>
                </div>
                <div class="at-btn">@</div>
            </div>
            <div class="reply-box-send">
                <div class="send-text" @click="sendComment">发布</div>
            </div>
        </div>
    </div>
</template>

<script>
import { ElMessage } from 'element-plus';
import VAvatar from '../avatar/VAvatar.vue';
import EmojiBox from '../emoji/EmojiBox.vue';

export default {
    name: "ReplyTextarea",
    components: {
        VAvatar,
        EmojiBox
    },
    props: {
        placeholder: {
            type: String,
            default: "进来和UP唠会嗑呗"
        },
        root_id: {
            type: Number,
            default() {
                return -1;
            }
        },
        commentInfo: {
            type: Object,
            default() {
                return {
                    root_id: -1,
                    parent_id: -1,
                    to_user_id: -1,
                    vid: -1,
                }
            }
        },
        // 是否是宽屏
        isWideWindow: {
            type: Boolean,
            default() {
                return false;
            }
        },
    },
    data() {
        return {
            emojiBoxShow: false,
            isFocus: false,
            content: "",
            cursorStart: 0,
            cursorEnd: 0,
        }
    },
    methods: {
        // 点击空白处隐藏发布栏
        cancelFocus() {
            this.isFocus = false;
            this.emojiBoxShow = false;
        },
        handleBlur() {
            this.cursorStart = this.$refs.textarea.selectionStart;
            this.cursorEnd = this.$refs.textarea.selectionEnd;
        },

        insertEmoji(emoji) {
            const textarea = this.$refs.textarea;

            this.content = this.content.substring(0, this.cursorStart) + emoji.name + this.content.substring(this.cursorEnd);
            this.$nextTick(() => {
                textarea.selectionStart = this.cursorStart + emoji.name.length;
                textarea.selectionEnd = textarea.selectionStart;
                this.cursorStart = textarea.selectionStart;
                this.cursorEnd = textarea.selectionEnd;
                textarea.focus();
            });
        },

        // 发送
        async sendComment() {
            if (this.content === "") {
                ElMessage.warning("你还没输入内容");
                return;
            }

            if (this.commentInfo.vid === -1) {
                ElMessage.error("发送评论失败，请刷新页面后重试");
                return;
            }

            const formData = new FormData();
            formData.append("vid", this.commentInfo.vid);
            formData.append("root_id", this.commentInfo.root_id);
            formData.append("parent_id", this.commentInfo.parent_id);
            formData.append("to_user_id", this.commentInfo.to_user_id);
            formData.append("content", this.content);

            const response = await this.$post("/comment/add", formData, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("teri_token"),
                }
            });
            if (!response.data) return;

            this.isFocus = false
            this.content = "";

            this.$emit("addComment", response.data.data);

        },

        focusTextarea() {
            this.isFocus = true;
            this.$refs.textarea.focus();
        },

        // 清空输入框
        cleanInput() {
            this.content = "";
        },

        // 触发登录
        toLogin() {
            this.$store.state.openLogin = true;
            this.$nextTick(() => {
                this.$store.state.openLogin = false;
            })
        }
    },
}
</script>

<style scoped>
.box-normal {
    display: flex;
    z-index: 2;
}


.reply-box-avatar {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 80px;
    height: 48px;
}

.teriteri-avatar {
    display: block;
    position: relative;
    background-size: cover;
    border-radius: 50%;
    margin: 0;
    padding: 0;
    image-rendering: -webkit-optimize-contrast;
}

.reply-box-wrap {
    position: relative;
    flex: 1;
    transition: .2s;
    border: 1px solid #E3E5E7;
    border-radius: 6px;
    background-color: var(--bg3);
    overflow-x: hidden;
}

.textarea-wrap {
    padding: 8px 0;
    display: flex;
    flex-direction: column;
    width: 100%;
    border-radius: 6px;
    cursor: text;
    overflow: hidden;
    transition: background-color 0.5s ease;
}

.textarea-wrap.active,
.textarea-wrap:hover {
    background-color: var(--bg1);
}

.disable-mask {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
    width: 100%;
    height: 100%;
    border-radius: 6px;
    font-size: 12px;
    color: var(--text3);
    background-color: var(--bg3);
}

.to-login-btn {
    padding: 3px 5px;
    border-radius: 4px;
    background-color: var(--brand_pink);
    color: #fff;
    margin: 0 3px;
    cursor: pointer;
}

.reply-box-textarea {
    padding: 0 8px;
    width: 100%;
    height: 32px;
    border: none;
    border-radius: 6px;
    background-color: transparent;
    font-family: inherit;
    font-size: 14px;
    line-height: 32px;
    color: #18191C;
    resize: none;
    outline: none;
}

.reply-box-textarea::-webkit-scrollbar {
    width: 6px;
    height: 6px;
}

.reply-box-textarea::-webkit-scrollbar-thumb {
    border-radius: 3px;
    background-color: #ccc;
}

.box-expand {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-left: 80px;
    margin-top: 10px;
    z-index: 1;
    height: 32px;
    transition: all .2s ease-in-out;
}

.box-expand.hide {
    margin-top: 0;
    height: 0;
    overflow: hidden;
    transition: all .2s ease-in-out;
}

.box-left {
    display: flex;
    align-items: center;
}

.reply-box-emoji {
    width: 32px;
    height: 26px;
    margin-right: 6px;
    position: relative;
}

.emoji-btn {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    border: 1px solid #E7E7E7;
    border-radius: 4px;
    color: var(--text3);
    cursor: pointer;


}

.emoji-btn-icon {
    fill: var(--text2);
    width: 60%;
    height: 60%;
}

/* .reply-box-emoji /deep/ .emoji-box {
    top: -320px;
    left: 0px;
} */

.at-btn {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    width: 32px;
    height: 26px;
    margin-right: 6px;
    border: 1px solid #E7E7E7;
    border-radius: 4px;
    color: var(--text3);
    cursor: pointer;
}

.reply-box-send {
    float: right;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    width: 70px;
    height: 32px;
    border-radius: 6px;
    cursor: pointer;
    background-color: var(--brand_pink);
}


.send-text {
    position: absolute;
    z-index: 1;
    font-size: 16px;
    color: var(--text_white);
}
</style>