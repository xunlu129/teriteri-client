<template>
    <div class="message-list" id="message-list">
        <div class="message-list-content">
            <div class="msg-more">
                <span class="load-more" v-if="chat.detail.more && !loading && !error" @click="getMoreDetails">查看和ta的历史消息</span>
                <span class="no-more" v-if="!chat.detail.more">没有更多消息了</span>
                <span class="loading" v-if="loading"><MessageLoading></MessageLoading></span>
                <span class="error" v-if="error">消息加载失败，<span class="btn" @click="getMoreDetails">点击重新加载</span></span>
            </div>
            <div v-for="(item, index) in chat.detail.list" :key="index">
                <div class="msg-time" v-if="index === 0 || timeDiff(chat.detail.list[index - 1].time, item.time)">
                    <span class="time">{{ handleDateTime(item.time) }}</span>
                </div>
                <div class="msg-item" v-if="item.withdraw !== 1" :class="item.userId === user.uid ? 'is-me' : 'not-me'">
                    <a :href="`/space/${item.userId}`" target="_blank" class="avatar"
                        :style="`background-image: url('${item.userId === user.uid ? user.avatar_url : chat.user.avatar_url}');`"
                    ></a>
                    <div class="message" @contextmenu="(e) => handleContextMenu(item.id, e)">
                        <div class="message-content" v-html="emojiText(item.content)"></div>
                        <div class="context-menu" v-if="msgId === item.id" :style="`left: ${menuLeft}px; top: ${menuTop}px;`">
                            <ul>
                                <li v-if="item.userId === user.uid" @click="withdraw">撤回</li>
                                <li @click="deleteMsg">删除</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="notify-wrapper" v-else>
                    <span class="notify-text">{{ item.userId === user.uid ? '你' : '对方' }}撤回了一条消息</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import MessageLoading from './MessageLoading.vue';
import { handleDateTime, emojiText } from '@/utils/utils.js';

export default {
    name: "MessageList",
    components: {
        MessageLoading,
    },
    data() {
        return {
            // 当前聊天内容模板
            chat: {
                chat: {},
                detail: {
                    list: [],
                    more: true,
                },
                user: {}
            },
            loading: false,     // 正在加载中
            error: false,       // 加载更多时出错了
            isAtBottom: true,   // 是否正在底部
            msgId: -1,     // 选中消息的ID
            menuLeft: 0,    // 右键菜单左偏移量
            menuTop: 0,     // 右键菜单上偏移量
        }
    },
    computed: {
        user() {
            return this.$store.state.user;
        }
    },
    props: {
        // 聊天对象的uid
        mid: {
            type: Number,
            default() {
                return 0;
            }
        }
    },
    methods: {
        // 请求更多聊天记录
        async getMoreDetails() {
            if (!this.chat.detail.more || this.loading) return;
            this.loading = true;
            const res = await this.$get("/msg/chat-detailed/get-more", {
                params: {
                    uid: this.mid,
                    offset: this.chat.detail.list.length
                },
                headers: { Authorization: "Bearer " + localStorage.getItem("teri_token") }
            });
            // 记录DOM更新前滚动条的位置
            const scrollContainer = document.getElementById('message-list');
            const lastChild = scrollContainer.lastElementChild;
            const lastTop = scrollContainer.scrollTop;
            const lastHeight = lastChild.clientHeight;
            if (res.data && res.data.data) {
                let chat = this.$store.state.chatList.find(item => item.user.uid === this.mid);
                chat.detail.more = res.data.data.more;
                chat.detail.list.unshift(...res.data.data.list);
            } else {
                this.loading = false;
                this.error = true;
            }
            // 等新消息挂载完毕后关掉加载组件
            this.$nextTick(() => {
                this.loading = false;
                // 等加载组件关闭后 计算滚动条原来应该在的位置滚回去
                this.$nextTick(() => {
                    const currHeight = lastChild.clientHeight;
                    const currTop = currHeight - lastHeight + lastTop;
                    scrollContainer.scrollTo({
                        behavior: "auto",
                        top: currTop
                    });
                });
            });
        },

        // 处理日期时间
        handleDateTime(dateTime) {
            return handleDateTime(dateTime);
        },

        // 将普通文本转换为html文本以显示表情
        emojiText(text) {
            return emojiText(text);
        },

        // 判断两个时间是否相差超过4分钟
        timeDiff(small, big) {
            const smallTime = new Date(small).getTime();
            const bigTime = new Date(big).getTime();
            // 计算两个时间的差异（以分钟为单位）
            const timeDifferenceInMinutes = Math.floor((bigTime - smallTime) / (60 * 1000));
            return timeDifferenceInMinutes > 4;
        },

        // 滚动触底和触顶
        async handleScroll() {
            const scrollContainer = document.getElementById('message-list');
            // 判断是否触底
            const isAtBottom = scrollContainer.scrollHeight - scrollContainer.scrollTop <= scrollContainer.clientHeight + 10;
            // 判断是否距离顶部小于等于 80 像素
            const isNearTop = scrollContainer.scrollTop <= 80;
            if (isAtBottom) {
                this.isAtBottom = true;
                // console.log("触底啦");
            } else {
                this.isAtBottom = false;
                // console.log("离开底部");
            }
            if (isNearTop && this.chat.detail.more) {
                // console.log("触顶啦，该加载记录了");
                await this.getMoreDetails();
            }
        },

        // 等元素渲染完再滚
        goBottom(behavior) {
            this.$nextTick(() => {
                const scrollContainer = document.getElementById('message-list');
                const lastChild = scrollContainer.lastElementChild;
                scrollContainer.scrollTo({
                    behavior: behavior,
                    top: lastChild.clientHeight - scrollContainer.clientHeight
                });
                this.isAtBottom = true;
            });
        },

        // 右键消息菜单
        handleContextMenu(msgId, e) {
            e.preventDefault();
            this.menuLeft = e.clientX;
            this.menuTop = e.clientY;
            this.msgId = msgId;
        },

        // 点击空白处关闭菜单
        handleOutsideClick(event) {
            const msgList = document.querySelectorAll(".message");
            for (let i = 0; i < msgList.length; i++) {
                const element = msgList[i];
                if (element.contains(event.target)) return;
            }
            this.msgId = -1;
        },

        // 撤回消息
        withdraw() {
            const context = {
                code: 102,
                id: this.msgId
            }
            this.$store.state.ws.send(JSON.stringify(context));
            this.msgId = -1;
        },

        // 删除消息
        async deleteMsg() {
            const formData = new FormData();
            formData.append("id", this.msgId);
            const res = await this.$post("/msg/chat-detailed/delete", formData, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("teri_token"),
                }
            });
            if (res.data.code && res.data.code === 200) {
                let chat = this.$store.state.chatList.find(item => item.user.uid === this.mid);
                let index = chat.detail.list.findIndex(item => item.id);
                if (index !== -1) {
                    chat.detail.list.splice(index, 1);
                    this.msgId = -1;
                }
            }
        }

    },
    mounted() {
        const scrollContainer = document.getElementById('message-list');
        scrollContainer.addEventListener('scroll', this.handleScroll);
        this.goBottom("auto");
        window.addEventListener("click", this.handleOutsideClick);
        window.addEventListener("contextmenu", this.handleOutsideClick);
    },
    beforeUnmount() {
        window.removeEventListener("click", this.handleOutsideClick);
        window.removeEventListener("contextmenu", this.handleOutsideClick);
    },
    watch: {
        "mid"(curr) {
            let chat = this.$store.state.chatList.find(item => item.user.uid === curr);
            // 复制一份，防止指向同一个地址
            this.chat = JSON.parse(JSON.stringify(chat));
            // console.log("当前聊天：",this.chat);
            this.goBottom("auto");
        },
        // 深度监听vuex中聊天列表的变化
        "$store.state.chatList": {
            handler(curr) {
                this.$nextTick(() => {
                    const currChat = curr.find(item => item.user.uid === this.mid);
                    // console.log("深度监听到聊天有新消息：", currChat);
                    // 复制粘贴新的chat
                    this.chat = JSON.parse(JSON.stringify(currChat));
                    if (this.isAtBottom) {
                        // 如果原本在底部的话还要滚到底部 等元素渲染完再滚
                        this.goBottom("smooth");
                    }
                })
            },
            deep: true
        }
    }
}
</script>

<style scoped>
.message-list {
    -webkit-box-flex: 1;
    -ms-flex: 1;
    flex: 1;
    position: relative;
    overflow-x: hidden;
    overflow-y: scroll;
    background-color: #f4f5f7;
}

.message-list::-webkit-scrollbar {
    width: 8px;
    height: 8px;
    background-color: rgba(1,1,1,0);
}

.message-list::-webkit-scrollbar-thumb {
    background: #aaa;
    border-radius: 4px;
}

.message-list-content {
    overflow: auto;
    min-height: 100% !important;
}

.msg-more {
    padding: 16px 0 0;
    text-align: center;
    min-height: 38px;
}

.load-more {
    color: #ff91b9;
    cursor: pointer;
}

.no-more, .error {
    color: #999;
}

.error .btn {
    color: #e36f90;
    cursor: pointer;
}

.msg-time {
    padding: 16px 0 16px;
    text-align: center;
}

.msg-time .time {
    color: #999;
    font-size: 12px;
    line-height: 22px;
    margin: 0 10px;
}

.msg-item {
    min-height: 48px;
    padding: 0 16px 16px;
    overflow: hidden;
    position: relative;
}

.avatar {
    display: block;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    -ms-flex-negative: 0;
    flex-shrink: 0;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    background-image: url('https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png');
    float: left;
}

.is-me .avatar {
    float: right;
}

.message {
    float: left;
    max-width: 480px;
    margin: 0 10px;
    position: relative;
    overflow: hidden;
    color: #333;
}

.is-me .message {
    position: relative;
    float: right;
    color: #fff;
}

.message-content {
    line-height: 1.5;
    font-size: 14px;
    min-height: 37px;
    padding: 8px 16px;
    word-wrap: break-word;
    word-break: break-word;
    border-radius: 0 16px 16px 16px;
    overflow: hidden;
    background: #fff;
}

.is-me .message-content {
    background: #ffa7c2;
    border-radius: 16px 0 16px 16px;
}

.message-content:not(.is-img) {
    position: relative;
    z-index: 1;
}

.context-menu {
    position: fixed;
    width: 120px;
    z-index: 12;
    background: #eeeff1;
    color: #6c6c6c;
    border-radius: 6px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    -webkit-box-shadow: 0 2px 4px 0 rgb(167,111,132,33%);
    box-shadow: 0 2px 4px 0 rgb(167,111,132,33%);
    font-size: 13px;
    line-height: 1.5;
    overflow: visible;
}

.context-menu ul {
    margin: 0;
    padding: 0;
    list-style: none;
    border-radius: 6px;
    overflow: hidden;
}

.context-menu ul li {
    padding: 3px 12px 3px 12px;
    cursor: pointer;
}

.context-menu ul li:first-child {
    padding-top: 6px;
}

.context-menu ul li:last-child {
    padding-bottom: 6px;
}

.context-menu ul li:hover {
    background: rgba(0,0,0,0.05);
}

.notify-wrapper {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    padding: 0 10px;
    color: #b2b2b2;
    font-size: 12px;
    line-height: 16px;
    min-height: 30px;
}

.notify-wrapper .notify-text {
    padding: 2px 20px;
    background-color: #eaeaea;
    border-radius: 10px;
    line-height: 16px;
    height: 20px;
}
</style>