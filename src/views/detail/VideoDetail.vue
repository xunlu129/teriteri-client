<template>
    <div class="videoDetail">
        <HeaderBar :isFixHeaderBar="true"></HeaderBar>
        <div class="video-container">
            <div class="left-container" :style="`width: ${playerSize.width}px;`">
                <!-- 标题 -->
                <div class="video-info-container">
                    <h1 :title="video.title" class="video-title">{{ video.title }}</h1>
                    <div class="video-info-detail">
                        <div class="video-info-detail-list">
                            <!-- 排名暂时没做，到时可能还得在数据库加一个属性 -->
                            <a href="/popular/rank/all" target="_blank" class="honor item honor-rank" v-if="video.top">
                                <i class="iconfont icon-paihang"></i>
                                <span class="honor-text">全站排行榜最高第1名</span>
                                <i class="iconfont icon-youjiantou"></i>
                            </a>
                            <span class="view item">
                                <i class="iconfont icon-bofangshu"></i>
                                &nbsp;{{ handleNum(view) }}&nbsp;
                            </span>
                            <span class="danmu item">
                                <i class="iconfont icon-danmushu"></i>
                                &nbsp;{{ handleNum(this.$store.state.danmuList.length) }}&nbsp;
                            </span>
                            <span class="date item">
                                {{ video.uploadDate }}
                            </span>
                            <span class="copyright item" v-if="video.type === 1 && video.auth === 1">
                                <i class="iconfont icon-jinzhi"></i>
                                未经作者授权，禁止转载
                            </span>
                        </div>
                    </div>
                </div>
                <!-- 播放器组件 -->
                <PlayerWrap
                    :videoUrl="video.videoUrl"
                    :title="video.title"
                    :duration="video.duration"
                    :user="user"
                    :population="population"
                    v-model:jumpTimePoint="jumpTimePoint"
                    @resize="updatePlayerSize"
                    @sendDm="sendDanmu"
                ></PlayerWrap>
                <!-- 点赞 -->
                <div class="video-toolbar-container">
                    <div class="video-toolbar-left">
                        <div class="toolbar-left-item-wrap">
                            <div class="video-toolbar-left-item">
                                <i class="iconfont icon-dianzan"></i>
                                <span class="video-toolbar-item-text">{{ handleNum(good) }}</span>
                            </div>
                        </div>
                        <div class="toolbar-left-item-wrap">
                            <div class="video-toolbar-left-item">
                                <i class="iconfont icon-diancai"></i>
                                <span class="video-toolbar-item-text">不喜欢</span>
                            </div>
                        </div>
                        <div class="toolbar-left-item-wrap">
                            <div class="video-toolbar-left-item">
                                <i class="iconfont icon-toubi"></i>
                                <span class="video-toolbar-item-text">{{ handleNum(coin) }}</span>
                            </div>
                        </div>
                        <div class="toolbar-left-item-wrap">
                            <div class="video-toolbar-left-item">
                                <i class="iconfont icon-shoucang1"></i>
                                <span class="video-toolbar-item-text">{{ handleNum(collect) }}</span>
                            </div>
                        </div>
                        <div class="toolbar-left-item-wrap">
                            <div class="video-toolbar-left-item">
                                <i class="iconfont icon-zhuanfa"></i>
                                <span class="video-toolbar-item-text">{{ handleNum(share) }}</span>
                            </div>
                        </div>
                    </div>
                    <div class="video-toolbar-right">
                        <div class="video-toolbar-right-item">
                            <VPopover placement="top" popStyle="padding-bottom: 10px; z-index: 1000;">
                                <template #reference>
                                    <div class="video-tool-more">
                                        <i class="iconfont icon-gengduo"></i>
                                    </div>                                    
                                </template>
                                <template #content>
                                    <div class="video-tool-more-dropdown">
                                        <div class="dropdown-item">
                                            <i class="iconfont icon-jubao1"></i>
                                            <span>举报稿件</span>
                                        </div>
                                    </div>
                                </template>
                            </VPopover>                            
                        </div>
                    </div>
                </div>
                <!-- 简介评论区 -->
                <div class="left-container-under-player">
                    <!-- 简介 -->
                    <div class="video-desc-container" :style="(!video.descr || video.descr === '') ? 'display: none;' : ''">
                        <div class="basic-desc-info" :style="showAllDesc ? 'height: auto;' : 'height: 84px;'">
                            <span class="desc-info-text" v-html="handleLinkify(video.descr)"></span>
                        </div>
                        <div class="toggle-btn" v-if="descTooLong">
                            <span class="toggle-btn-text" @click="showAllDesc = !showAllDesc">{{ showAllDesc ? '收起' : '展开更多' }}</span>
                        </div>
                    </div>
                    <!-- 标签 -->
                    <div class="video-tag-container">
                        <div class="tag-container">
                            <a :href="`/v/${category.mcId}`" target="_blank" class="tag-link">{{ category.mcName }}</a>
                        </div>
                        <div class="tag-container">
                            <a :href="`/v/${category.mcId}/${category.scId}`" target="_blank" class="tag-link">{{ category.scName }}</a>
                        </div>
                        <div class="tag-container" v-for="(item, index) in tags" :key="index">
                            <a :href="`/search/all?keyword=${item}`" target="_blank" class="tag-link">{{ item }}</a>
                        </div>
                    </div>
                    <!-- 评论 -->

                </div>
            </div>
            <div class="right-container">
                <div class="right-container-inner">
                    <!-- UP主信息 -->
                    <div class="up-panel-container">
                        <div class="up-info-container">
                            <div class="up-info--left">
                                <div class="up-avatar-wrap">
                                    <VPopover popStyle="z-index: 2000; cursor: default; padding-top: 30px;">
                                        <template #reference>
                                            <a :href="`/space/${user.uid}`" target="_blank" class="up-avatar">
                                                <VAvatar :img="user.avatar_url" :size="48" :auth="user.auth"></VAvatar>
                                            </a>
                                        </template>
                                        <template #content>
                                            <UserCard :user="user"></UserCard>
                                        </template>
                                    </VPopover>                                    
                                </div>
                            </div>
                            <div class="up-info--right">
                                <div class="up-info__detail">
                                    <div class="up-detail-top">
                                        <a :href="`/space/${user.uid}`" target="_blank"
                                            class="up-name" :class="user.vip !== 0 ? 'vip-name' : ''"
                                        >{{ user.nickname }}</a>
                                        <a class="send-msg" @click="createChat">
                                            <i class="iconfont icon-xinfeng1"></i>
                                            发消息
                                        </a>
                                    </div>
                                    <div class="up-description" :title="user.description">{{ user.description }}</div>
                                </div>
                                <div class="up-info__btn-panel">
                                    <div class="default-btn follow-btn not-follow" v-if="true">
                                        <i class="iconfont icon-jia"></i>
                                        关注 {{ handleNum(514000) }}
                                    </div>
                                    <VPopover popStyle="padding-top: 10px;">
                                        <template #reference>
                                            <div class="default-btn follow-btn following" v-if="false">
                                                <i class="iconfont icon-caidan"></i>
                                                已关注 {{ handleNum(514000) }}
                                            </div>
                                        </template>
                                        <template #content>
                                            <div class="following-dropdown">
                                                <div class="dropdown-item">
                                                    <span>设置分组</span>
                                                </div>
                                                <div class="dropdown-item">
                                                    <span>取消关注</span>
                                                </div>
                                            </div>
                                        </template>
                                    </VPopover>
                                    <VPopover popStyle="padding-top: 10px;">
                                        <template #reference>
                                            <div class="default-btn follow-btn following" v-if="false">
                                                <i class="iconfont icon-caidan"></i>
                                                已互粉 {{ handleNum(0) }}
                                            </div>
                                        </template>
                                        <template #content>
                                            <div class="following-dropdown">
                                                <div class="dropdown-item">
                                                    <span>设置分组</span>
                                                </div>
                                                <div class="dropdown-item">
                                                    <span>取消关注</span>
                                                </div>
                                            </div>
                                        </template>
                                    </VPopover>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- 弹幕组件 -->
                    <DanmuBox :boxHeight="playerSize.height" :authorId="user.uid" @jump="(time) => jumpTimePoint = time"></DanmuBox>
                    <!-- 相关视频列表 -->

                </div>
            </div>
        </div>
    </div>
</template>

<script>
import HeaderBar from '@/components/headerBar/HeaderBar.vue';
import PlayerWrap from '@/components/player/PlayerWrapper.vue';
import VPopover from '@/components/popover/VPopover.vue';
import VAvatar from '@/components/avatar/VAvatar.vue';
import UserCard from '@/components/UserCard/UserCard.vue';
import DanmuBox from '@/components/danmu/DanmuBox.vue';
import { handleTime, handleNum, handleDate, linkify } from '@/utils/utils.js';
import { ElMessage } from 'element-plus';

export default {
    name: "VideoDetail",
    components: {
        HeaderBar,
        PlayerWrap,
        VPopover,
        VAvatar,
        UserCard,
        DanmuBox,
    },
    data() {
        return {
            socket: null,
            sessionUuid: null,
            playerSize: {
                width: 704,
                height: 442,
            },
            video: {},  // 视频信息
            view: 0,    // 播放数
            danmu: 0,   // 弹幕数
            good: 0,    // 点赞数
            coin: 0,    // 投币数
            collect: 0, // 收藏数
            share: 0,   // 分享数
            population: 0,  // 当前观看人数
            user: {
                uid: 0,
            },   // 投稿用户信息
            category: {},   // 视频分区信息
            tags: [],   // 投稿标签
            showAllDesc: true, // 是否展开简介
            descTooLong: false,   // 简介太长需要展开
            jumpTimePoint: -1,  // 双击弹幕跳转的时间点
        }
    },
    methods: {
        ////// 请求 //////
        // 获取视频详细信息
        async getVideoDetail() {
            const res = await this.$get('/video/getone', {
                params: {
                    vid: this.$route.params.vid,
                },
            });
            if (res.data.code === 404) {
                return;
            }
            if (res.data.data) {
                console.log("视频详情: ", res.data.data);
                this.video = res.data.data.video;
                this.user = res.data.data.user;
                this.category = res.data.data.category;
                this.tags = res.data.data.video.tags.split("\r\n").filter(tag => tag.trim() !== "");
                this.view = res.data.data.stats.play;
                this.danmu = res.data.data.stats.danmu;
                this.good = res.data.data.stats.good;
                this.coin = res.data.data.stats.coin;
                this.collect = res.data.data.stats.collect;
                this.share = res.data.data.stats.share;
            }
            this.isDescTooLong();
        },

        // 获取弹幕列表
        async getDanmuList() {
            const res = await this.$get(`/danmu-list/${this.$route.params.vid}`);
            if (res.data.data == null) {
                this.$store.commit("updateDanmuList", []);
            } else if (res.data.data.length > 0) {
                this.$store.commit("updateDanmuList", res.data.data);
            }
        },

        // 初始化实时弹幕的websocket
        initWebsocket() {
            this.sessionUuid = this.generateUUID();
            const socketUrl = `ws://localhost:7070/ws/danmu/${this.$route.params.vid}/${this.sessionUuid}`;
            if (this.socket != null) {
                this.socket.close();
                this.socket = null;
            }
            this.socket = new WebSocket(socketUrl);
        },

        async closeWebSocket() {
            if (this.socket != null) {
                await this.socket.close();
                this.socket = null;
            }
        },

        // 生成UUID
        generateUUID() {
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                var r = (Math.random() * 16) | 0,
                    v = c === 'x' ? r : (r & 0x3) | 0x8;
                return v.toString(16);
            });
        },

        // 创建聊天
        createChat() {
            if (!this.$store.state.user.uid) {
                ElMessage.error("登录后才能发消息哦");
                return;
            }
            this.openNewPage(`/message/whisper/${this.user.uid}`);
        },


        ////// 事件 //////
        // 处理播放时长
        handleDuration(time) {
            return handleTime(time);
        },

        // 处理大于一万的数字
        handleNum(number) {
            return handleNum(number);
        },

        // 处理投稿时间
        handleDate(date) {
            return handleDate(date);
        },

        // 处理超链接文本
        handleLinkify(text) {
            return linkify(text);
        },

        // 判断简介长度是否过长需要收起
        isDescTooLong() {
            this.$nextTick(() => {
                const desc = document.querySelector('.basic-desc-info');
                if (desc.clientHeight > 84) {
                    this.descTooLong = true;
                    this.showAllDesc = false;
                }
            });
        },

        // 打开新标签页
        openNewPage(route) {
            window.open(this.$router.resolve(route).href, '_blank');
        },

        // 处理窗口滚动触发的事件
        handleScroll() {
            const windowHeight = window.innerHeight;
            const leftPart = document.querySelector('.left-container');
            const rightPart = document.querySelector('.right-container-inner');
            if (leftPart.clientHeight <= windowHeight - 64) {
                leftPart.style.top = '64px';
            } else {
                leftPart.style.top = `-${leftPart.clientHeight - windowHeight}px`;
            }
            if (rightPart.clientHeight <= windowHeight - 64) {
                rightPart.style.top = '64px';
            } else {
                rightPart.style.top = `-${rightPart.clientHeight - windowHeight}px`;
            }
        },

        // 窗口大小变动时更新相关宽高
        updatePlayerSize(size) {
            this.playerSize.width = size.width;
            this.playerSize.height = size.height;
        },


        // 处理websocket事件
        handleWsOpen() {
            // console.log("弹幕websocket信道已建立");
        },
        
        handleWsClose() {
            console.log("弹幕websocket信道关闭,请刷新页面重试");
        },

        handleWsMessage(e) {
            if (e.data === '登录已过期') {
                ElMessage.error(e.data);
            } else if (e.data.startsWith("当前观看人数")) {
                let numberPart = e.data.substring(6).trim();
                this.population = parseInt(numberPart, 10);
                // console.log("当前观看人数: ", this.population);
            } else {
                let dm = JSON.parse(e.data);
                // console.log("ws message: ", dm);
                this.$store.state.danmuList.push(dm);
                // console.log("vuex中的弹幕列表: ", this.$store.state.danmuList);
            }
        },

        handleWsError(e) {
            console.log("弹幕websocket信道报错: ", e);
        },

        // 发送弹幕
        sendDanmu(dm) {
            if (!localStorage.getItem('teri_token')) {
                ElMessage.error("请登录后发送");
                return;
            }
            const dmJson = JSON.stringify({
                token: "Bearer " + localStorage.getItem('teri_token'),
                data: dm
            });
            this.socket.send(dmJson);
        }
    },
    async created() {
        this.initWebsocket();
        await this.getVideoDetail();
        await this.getDanmuList();
    },
    mounted() {
        window.addEventListener('scroll', this.handleScroll);
        this.handleScroll();
        this.socket.addEventListener('open', this.handleWsOpen);
        this.socket.addEventListener('close', this.handleWsClose);
        this.socket.addEventListener('message', this.handleWsMessage);
        this.socket.addEventListener('error', this.handleWsError);
        window.addEventListener('beforeunload', this.closeWebSocket);    // beforeunload 事件监听标签页关闭
    },
    async beforeUnmount() {
        await this.closeWebSocket();
        window.removeEventListener('beforeunload', this.closeWebSocket);
        window.removeEventListener('scroll', this.handleScroll);
    }
}
</script>

<style scoped>
.video-container {
    width: auto;
    padding: 64px 10px 0px;
    max-width: 2540px;
    min-width: 1080px;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    box-sizing: content-box;
    position: relative;
}

.left-container {
    position: sticky;
    height: fit-content;
}

.video-info-container {
    height: 104px;
    box-sizing: border-box;
    padding-top: 22px;
}

.video-title {
    font-size: 20px;
    font-weight: 500;
    -webkit-font-smoothing: antialiased;
    color: var(--text1);
    line-height: 28px;
    margin-bottom: 6px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}

.video-info-detail {
    font-size: 13px;
    color: var(--text3);
    display: flex;
    align-items: center;
    height: 24px;
    line-height: 18px;
    position: relative;
    overflow: hidden;
}

.video-info-detail-list {
    display: flex;
    align-items: center;
    overflow: hidden;
    box-sizing: border-box;
}

.video-info-detail-list .item {
    flex-shrink: 0;
    margin-right: 12px;
    overflow: hidden;
}

.video-info-detail-list .item:last-child {
    margin-right: 0;
}

.view, .danmu, .copyright {
    display: inline-flex;
    align-items: center;
}

.icon-bofangshu .icon-danmushu {
    font-size: 18px;
}

.honor {
    display: inline-flex;
    align-items: center;
    font-size: 13px;
    height: 24px;
    border-radius: 2px;
    padding: 0px 6px;
}

.honor.honor-rank {
    color: var(--brand_pink);
    background-color: rgba(255, 102, 153, 0.1);
}

.honor .icon-paihang {
    font-size: 14px;
    margin: 0 5px 0 3px;
}

.honor .icon-youjiantou {
    font-size: 14px;
}

.date {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    line-height: 24px;
    font-size: 13px;
    height: 100%;
    display: inline-block;
    vertical-align: middle;
}

.icon-jinzhi {
    font-size: 12px;
    margin-right: 4px;
    color: var(--stress_red);
}

.video-toolbar-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-top: 16px;
    padding-bottom: 12px;
    line-height: 28px;
    border-bottom: 1px solid var(--line_regular);
}

.video-toolbar-left {
    position: relative;
    display: flex;
    align-items: center;
    -webkit-user-select: none;
    user-select: none;
}

.toolbar-left-item-wrap {
    position: relative;
    margin-right: 8px;
}

.video-toolbar-left-item {
    position: relative;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-align: center;
    align-items: center;
    width: 92px;
    white-space: nowrap;
    transition: all .3s;
    font-size: 13px;
    color: var(--text2);
    font-weight: 500;
    cursor: pointer;
}

.video-toolbar-left-item.on, .video-toolbar-left-item:hover {
    color: var(--brand_pink);
}

.video-toolbar-left-item .iconfont {
    margin-right: 8px;
    font-size: 26px;
}

.video-toolbar-left-item .icon-diancai {
    transform: translateY(2px);
}

.video-toolbar-item-text {
    overflow: hidden;
    text-overflow: ellipsis;
    word-break: break-word;
    white-space: nowrap;
}

.video-toolbar-right {
    display: flex;
    align-items: center;
    -webkit-user-select: none;
    user-select: none;
}

.video-toolbar-right-item {
    display: -ms-inline-flexbox;
    display: inline-flex;
    -ms-flex-align: center;
    align-items: center;
    font-size: 13px;
    color: var(--text2);
    transition: all .3s;
    cursor: pointer;
}

.video-toolbar-right-item:hover {
    color: var(--brand_pink);
}

.video-tool-more {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 30px;
}

.icon-gengduo {
    font-size: 18px;
}

.video-tool-more-dropdown {
    padding: 12px 0px;
    cursor: auto;
}

.dropdown-item {
    position: relative;
    display: flex;
    align-items: center;
    height: 40px;
    width: 120px;
    padding: 0 20px;
    color: var(--text1);
    cursor: pointer;
}

.dropdown-item:hover {
    background-color: var(--Ga1);
}

.icon-jubao1 {
    margin-right: 10px;
}

.video-desc-container {
    margin: 16px 0;
}

.basic-desc-info {
    white-space: pre-line;
    letter-spacing: 0;
    color: var(--text1);
    font-size: 15px;
    line-height: 24px;
    overflow: hidden;
}

.toggle-btn {
    margin-top: 10px;
    font-size: 13px;
    line-height: 18px;
}

.toggle-btn-text {
    cursor: pointer;
    color: var(--text2);
}

.toggle-btn-text:hover {
    color: var(--brand_pink);
}

.video-tag-container {
    padding-bottom: 6px;
    margin: 16px 0 20px 0;
    border-bottom: 1px solid var(--line_regular);
    display: flex;
    flex-wrap: wrap;
}

.tag-container {
    margin: 0px 12px 8px 0;
}

.tag-link {
    color: var(--text2);
    background: var(--graph_bg_regular);
    height: 28px;
    line-height: 28px;
    border-radius: 14px;
    font-size: 13px;
    padding: 0 12px;
    box-sizing: border-box;
    transition: all .3s;
    display: -ms-inline-flexbox;
    display: inline-flex;
    -ms-flex-align: center;
    align-items: center;
    cursor: pointer;
}

.right-container {
    width: 350px;
    flex: none;
    margin-left: 30px;
    position: relative;
    pointer-events: none;
}

.right-container-inner {
    padding-bottom: 250px;
    position: sticky;
}

.right-container-inner * {
    pointer-events: all;
}

.up-info-container {
    box-sizing: border-box;
    height: 104px;
    display: flex;
    align-items: center;
}

.up-avatar-wrap {
    width: 48px;
    height: 48px;
    flex-shrink: 0;
    display: flex;
    justify-content: center;
    align-items: center;
}

.up-avatar {
    display: block;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: var(--graph_weak);
}

.up-info--right {
    margin-left: 12px;
    flex: 1;
}

.up-info__detail {
    margin-bottom: 5px;
}

.up-detail-top {
    display: flex;
    align-items: center;
}

.up-name {
    font-size: 15px;
    color: var(--text1);
    font-weight: 500;
    position: relative;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    margin-right: 12px;
    max-width: calc(100% - 12px - 56px);
}

.send-msg {
    color: var(--text2);
    font-size: 13px;
    transition: color 0.3s;
    flex-shrink: 0;
    cursor: pointer;
}

.send-msg:hover {
    color: var(--brand_pink);
}

.up-description {
    margin-top: 2px;
    font-size: 13px;
    line-height: 16px;
    height: 16px;
    color: var(--text3);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.up-info__btn-panel {
    clear: both;
    display: flex;
    margin-top: 5px;
    white-space: nowrap;
}

.up-info__btn-panel .default-btn {
    box-sizing: border-box;
    padding: 0;
    line-height: 30px;
    height: 30px;
    border-radius: 6px;
    font-size: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    background: var(--graph_weak);
    position: relative;
    transition: 0.3s all;
}

.follow-btn {
    width: 200px;
}

.follow-btn.following {
    color: var(--text3);
    background-color: var(--graph_bg_thick);
}

.follow-btn.following:hover {
    background-color: var(--graph_bg_regular);
}

.follow-btn.not-follow {
    background: var(--brand_pink);
    color: var(--text_white);
}

.follow-btn.not-follow:hover {
    background: var(--Pi4);
}

.follow-btn .iconfont {
    font-size: 14px;
    margin-right: 2px;
}

.following-dropdown {
    padding: 8px 0px;
}

.following-dropdown .dropdown-item:hover {
    color: var(--brand_pink);
}

@media (min-width: 1681px) {
    .video-info-container {
        height: 108px;
    }

    .up-info-container {
        height: 108px;
    }

    .video-info-container .video-title {
        font-size: 22px;
        line-height: 34px;
    }

    .right-container {
        width: 411px;
    }

    .up-name {
        font-size: 16px;
        max-width: calc(100% - 12px - 60px);
    }

    .send-msg {
        font-size: 14px;
    }

    .up-description {
        font-size: 14px;
    }

    .follow-btn {
        width: 230px;
    }
}
</style>