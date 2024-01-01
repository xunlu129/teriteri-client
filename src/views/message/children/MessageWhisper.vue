<template>
    <div class="message-whisper">
        <div class="im">
            <div class="left">
                <div class="title">
                    <span>近期消息</span>
                </div>
                <div class="list-container" id="chat-list">
                    <div class="list">
                        <div class="list-item" :class="{'active': this.$store.state.chatId === item.user.uid}"
                            @click="changeChat(item.user.uid)"
                            v-for="(item, index) in this.$store.state.chatList" :key="index"
                        >
                            <VAvatar class="avatar" :size="40" :img="item.user.avatar_url" :auth="item.user.auth"></VAvatar>
                            <div class="name-box">
                                <div class="name">{{ item.user.nickname }}</div>
                                <div class="last-word" v-if="item.detail.list.length > 0">
                                    {{ item.detail.list[item.detail.list.length - 1].withdraw === 1 ? `${item.detail.list[item.detail.list.length - 1].userId === this.$store.state.user.uid ? '你' : '对方'}撤回了一条消息` : item.detail.list[item.detail.list.length - 1].content }}
                                </div>
                            </div>
                            <div class="close">
                                <svg @click.stop="closeChat(item.user.uid)" t="1702107603641" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7402" width="20" height="20"><path d="M791.67016602 269.61962891l-37.28979493-37.28320313L512 474.71020508l-242.3737793-242.3803711-37.28979492 37.28979493L474.71020508 512l-242.3737793 242.38037109 37.28320313 37.28979493L512 549.28979492l242.38037109 242.3803711 37.28979493-37.28979493L549.28979492 512z" p-id="7403"></path></svg>
                            </div>
                            <div class="notify notify-number" v-if="item.chat.unread > 0">{{ item.chat.unread }}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="right">
                <router-view v-if="this.$store.state.chatId > 0"></router-view>
                <div class="placeholder" v-else>
                    <div class="placeholder-img is-im"></div>
                    <div class="tip">快找小伙伴聊天吧 ( ゜- ゜)つロ</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import VAvatar from '@/components/avatar/VAvatar.vue';

export default {
    name: "MessageWhisper",
    components: {
        VAvatar,
    },
    data() {
        return {
            more: true,     // 是否还有更多聊天
            loading: false,     // 是否正在加载更多聊天
        }
    },
    methods: {
        ///////// 请求 /////////
        // 获取聊天列表
        async getChatList() {
            if (!this.more || this.loading) return;
            this.loading = true;
            const res = await this.$get("/msg/chat/recent-list", {
                params: {
                    offset: this.$store.state.chatList.length
                },
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("teri_token"),
                },
            });
            if (res.data && res.data.data) {
                this.more = res.data.data.more;
                this.$store.commit("updateChatList", res.data.data.list);
            }
            this.$nextTick(() => {
                this.loading = false;
            });
        },

        // 创建聊天
        async createChat() {
            const res = await this.$get(`/msg/chat/create/${this.$route.params.mid}`, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("teri_token"),
                },
            });
            if (res.data.code === 200) {
                if (res.data.data) {
                    // 新创建
                    this.$store.state.chatList.unshift(res.data.data);
                }
                this.$store.state.chatId = Number(this.$route.params.mid);
            } else {
                this.$store.state.chatId = -1;
            }
        },

        // 移除聊天
        async closeChat(uid) {
            let i = this.$store.state.chatList.findIndex(item => item.user.uid === uid);
            this.$store.state.chatList.splice(i, 1);    // 移除这个元素
            if (Number(this.$route.params.mid) === uid) {
                // 如果移除的是当前聊天 就打开第一个聊天
                if (this.$store.state.chatList.length > 0) {
                    this.changeChat(this.$store.state.chatList[0].chat.userId);
                } else {
                    this.$store.state.chatId = -1;
                }
            }
            await this.$get(`/msg/chat/delete/${uid}`, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("teri_token"),
                },
            });
        },


        ///////// 事件 /////////
        // 切换聊天
        changeChat(mid) {
            this.$router.push(`/message/whisper/${mid}`);
        },

        // 触底加载
        async handleScroll() {
            const scrollContainer = document.getElementById('chat-list');
            const isAtBottom = scrollContainer.scrollHeight - scrollContainer.scrollTop <= scrollContainer.clientHeight + 100;
            if (isAtBottom) {
                // console.log("触底啦")
                await this.getChatList();
            }
        },
    },
    async mounted() {
        this.$store.state.isChatPage = true;
        await this.getChatList();
        if (this.$route.path === '/message/whisper') {
            // 自动打开第一个聊天
            if (this.$store.state.chatList.length > 0) {
                this.changeChat(this.$store.state.chatList[0].chat.userId);
            }            
        } else {
            // 否则就是直接用url进入的/message/whisper/{mid}的子页面
            await this.createChat();
        }
        const scrollContainer = document.getElementById('chat-list');
        scrollContainer.addEventListener('scroll', this.handleScroll);
    },
    beforeUnmount() {
        this.$store.state.isChatPage = false;
    },
    watch: {
        // 监听路由变化打开对应聊天
        "$route.path"() {           
            if (this.$route.path.startsWith('/message/whisper/')) {
                this.$store.state.chatId = Number(this.$route.params.mid);
            } else {
                this.$store.state.chatId = -1;
            }
        }
    }
}
</script>

<style scoped>
.message-whisper {
    height: calc(100vh - 138px);
}

.im {
    font-size: 12px;
    color: #666;
    background-color: #fff;
    -webkit-box-shadow: 0 2px 4px 0 rgba(121,146,185,0.54);
    box-shadow: 0 2px 4px 0 rgba(121,146,185,0.54);
    border-radius: 4px;
    height: 100%;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    position: relative;
}

.left {
    width: 240px;
    border-right: 1px solid #e9eaec;
    position: relative;
}

.left .title {
    padding-left: 24px;
    line-height: 35px;
    height: 36px;
    border-bottom: 1px solid #e9eaec;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    overflow: hidden;
}

.left .list-container {
    height: calc(100% - 36px);
    position: relative;
    overflow-x: hidden;
    overflow-y: auto;
}

.left .list-container::-webkit-scrollbar {
    width: 4px;
}

.left .list-container::-webkit-scrollbar-thumb {
    border-radius: 4px;
    background-color: #ddd;
}

.list-item {
    width: 100%;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: horizontal;
    -webkit-box-direction: normal;
    -ms-flex-direction: row;
    flex-direction: row;
    padding: 19px 24px;
    position: relative;
    overflow: hidden;
    cursor: pointer;
}

.active {
    background-color: #e4e5e6;
}

.list-item:hover {
    background-color: #e4e5e6;
}

.list-item .avatar {
    width: 40px;
    height: 40px;
    margin-right: 8px;
    -ms-flex-negative: 0;
    flex-shrink: 0;
    position: relative;
}

.list-item .name-box {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
}

.list-item .last-word, .list-item .name {
    overflow: hidden;
    width: 155px;
    white-space: nowrap;
    text-overflow: ellipsis;
}

.list-item .name {
    color: #333;
    font-size: 14px;
    min-height: 16px;
    line-height: 1;
}

.list-item .last-word {
    color: #999;
    padding: 8px 0;
    margin-bottom: -6px;
}

.list-item .close {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    width: 24px;
    -webkit-transform: translateX(-100%);
    transform: translateX(-100%);
    opacity: 0;
    -webkit-transition: 300ms;
    transition: 300ms;
    fill: #999;
}

.list-item:hover .close {
    -webkit-transform: translateX(0);
    transform: translateX(0);
    opacity: 1;
}

.notify {
    text-align: center;
    position: absolute;
    background-color: var(--stress_red);
}

.notify-number {
    color: #fff;
    line-height: 16px;
    font-size: 12px;
    border-radius: 8px;
    height: 16px;
    min-width: 16px;
    top: 20px;
    right: 8px;
    padding: 0 4px;
}

.right {
    width: calc(100% - 240px);
    -webkit-box-flex: 1;
    -ms-flex: 1;
    flex: 1;
}

.placeholder {
    width: 100%;
    height: 100%;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
    overflow: hidden;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
}

.placeholder .placeholder-img {
    width: 402px;
    height: 304px;
}

.placeholder .is-im {
    background-image: url('~assets/img/bilibili/no_message.png');
    background-size: 402px 204px;
    margin-bottom: 32px;
    height: 204px;
}

.placeholder .tip {
    color: #8896b8;
    font-size: 14px;
    line-height: 1.5em;
}
</style>