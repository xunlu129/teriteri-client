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
                <PlayerWrap :videoUrl="video.videoUrl" :title="video.title" :duration="video.duration" :user="user"
                    :population="population" v-model:jumpTimePoint="jumpTimePoint" v-model:autonext="autonext"
                    @resize="updatePlayerSize" @sendDm="sendDanmu" @next="next"></PlayerWrap>
                <!-- 三连转发 -->
                <div class="video-toolbar-container">
                    <div class="video-toolbar-left">
                        <div class="toolbar-left-item-wrap">
                            <div class="video-toolbar-left-item"
                                :class="{ 'on': this.$store.state.attitudeToVideo.love }"
                                @click="loveOrNot(true, !this.$store.state.attitudeToVideo.love)">
                                <i class="iconfont icon-dianzan"></i>
                                <span class="video-toolbar-item-text">{{ handleNum(good) }}</span>
                                <div class="dianzan-gif" :class="isGifShow ? 'gif-show' : 'gif-hide'">
                                    <img src="~assets/img/dianzan.gif" alt="" v-if="gifDisplay">
                                </div>
                            </div>
                        </div>
                        <div class="toolbar-left-item-wrap">
                            <div class="video-toolbar-left-item"
                                :class="{ 'on': this.$store.state.attitudeToVideo.unlove }"
                                @click="loveOrNot(false, !this.$store.state.attitudeToVideo.unlove)">
                                <i class="iconfont icon-diancai"></i>
                                <span class="video-toolbar-item-text">不喜欢</span>
                            </div>
                        </div>
                        <div class="toolbar-left-item-wrap">
                            <div class="video-toolbar-left-item"
                                :class="{ 'on': this.$store.state.attitudeToVideo.coin > 0 }" @click="noPage">
                                <i class="iconfont icon-toubi"></i>
                                <span class="video-toolbar-item-text">{{ handleNum(coin) }}</span>
                            </div>
                        </div>
                        <div class="toolbar-left-item-wrap">
                            <div class="video-toolbar-left-item"
                                :class="{ 'on': this.$store.state.attitudeToVideo.collect }" @click="openCollectDialog">
                                <i class="iconfont icon-shoucang1"></i>
                                <span class="video-toolbar-item-text">{{ handleNum(collect) }}</span>
                            </div>
                        </div>
                        <div class="toolbar-left-item-wrap">
                            <div class="video-toolbar-left-item" @click="noPage">
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
                    <div class="video-desc-container"
                        :style="(!video.descr || video.descr === '') ? 'display: none;' : ''">
                        <div class="basic-desc-info" :style="showAllDesc ? 'height: auto;' : 'height: 84px;'">
                            <span class="desc-info-text" v-html="handleLinkify(video.descr)"></span>
                        </div>
                        <div class="toggle-btn" v-if="descTooLong">
                            <span class="toggle-btn-text" @click="showAllDesc = !showAllDesc">
                                {{ showAllDesc ? '收起' : '展开更多' }}
                            </span>
                        </div>
                    </div>
                    <!-- 标签 -->
                    <div class="video-tag-container">
                        <div class="tag-container">
                            <a :href="`/v/${category.mcId}`" target="_blank" class="tag-link">{{ category.mcName }}</a>
                        </div>
                        <div class="tag-container">
                            <a :href="`/v/${category.mcId}/${category.scId}`" target="_blank" class="tag-link">
                                {{ category.scName }}</a>
                        </div>
                        <div class="tag-container" v-for="(item, index) in tags" :key="index">
                            <a :href="`/search/video?keyword=${item}`" target="_blank" class="tag-link">{{ item }}</a>
                        </div>
                    </div>
                    <!-- 评论 -->
                    <CommentVue :uid="user.uid" :count="comment"></CommentVue>

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
                                        <a :href="`/space/${user.uid}`" target="_blank" class="up-name"
                                            :class="user.vip !== 0 ? 'vip-name' : ''">{{ user.nickname }}</a>
                                        <a class="send-msg" @click="createChat">
                                            <i class="iconfont icon-xinfeng1"></i>
                                            发消息
                                        </a>
                                    </div>
                                    <div class="up-description" :title="user.description">{{ user.description }}</div>
                                </div>
                                <div class="up-info__btn-panel">
                                    <div class="default-btn follow-btn not-follow" v-if="true" @click="noPage">
                                        <i class="iconfont icon-jia"></i>
                                        关注 {{ handleNum(user.fansCount) }}
                                    </div>
                                    <VPopover popStyle="padding-top: 10px;">

                                        <template #reference>
                                            <div class="default-btn follow-btn following" v-if="false">
                                                <i class="iconfont icon-caidan"></i>
                                                已关注 {{ handleNum(user.fansCount) }}
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
                                                已互粉 {{ handleNum(user.fansCount) }}
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
                    <DanmuBox :boxHeight="playerSize.height" :authorId="user.uid"
                        @jump="(time) => jumpTimePoint = time">
                    </DanmuBox>
                    <!-- 相关视频列表 -->
                    <div class="recommend-list">
                        <div class="next-play">
                            <p class="rec-title">
                                接下来播放
                                <span class="next-button" @click="autonext = !autonext">
                                    <span class="txt">自动连播</span>
                                    <span class="switch-button" :class="{ 'on': autonext }"></span>
                                </span>
                            </p>
                            <!-- 视频卡片 -->
                            <div class="video-page-card-small" v-if="recommendVideos.length > 0">
                                <div class="card-box">
                                    <div class="pic-box">
                                        <div class="pic" @click="changeVideo(recommendVideos[0].video.vid)">
                                            <img :src="recommendVideos[0].video.coverUrl" alt="">
                                            <span class="duration">
                                                {{ handleDuration(recommendVideos[0].video.duration) }}
                                            </span>
                                        </div>
                                    </div>
                                    <div class="info">
                                        <p class="title" @click="changeVideo(recommendVideos[0].video.vid)">
                                            {{ recommendVideos[0].video.title }}
                                        </p>
                                        <a :href="`/space/${recommendVideos[0].user.uid}`" target="_blank"
                                            class="upname">
                                            <svg t="1703614018039" class="icon" viewBox="0 0 1024 1024" version="1.1"
                                                xmlns="http://www.w3.org/2000/svg" p-id="4221" width="18" height="18">
                                                <path
                                                    d="M800 128H224C134.4 128 64 198.4 64 288v448c0 89.6 70.4 160 160 160h576c89.6 0 160-70.4 160-160V288c0-89.6-70.4-160-160-160z m96 608c0 54.4-41.6 96-96 96H224c-54.4 0-96-41.6-96-96V288c0-54.4 41.6-96 96-96h576c54.4 0 96 41.6 96 96v448z"
                                                    p-id="4222"></path>
                                                <path
                                                    d="M419.2 544c0 51.2-3.2 108.8-83.2 108.8S252.8 595.2 252.8 544v-217.6H192v243.2c0 96 51.2 140.8 140.8 140.8 89.6 0 147.2-48 147.2-144v-240h-60.8V544zM710.4 326.4h-156.8V704h60.8v-147.2h96c102.4 0 121.6-67.2 121.6-115.2 0-44.8-19.2-115.2-121.6-115.2z m-3.2 179.2h-92.8V384h92.8c32 0 60.8 12.8 60.8 60.8 0 44.8-32 60.8-60.8 60.8z"
                                                    p-id="4223"></path>
                                            </svg>
                                            <span class="name">{{ recommendVideos[0].user.nickname }}</span>
                                        </a>
                                        <div class="playinfo">
                                            <svg t="1703614610134" class="playinfo-play" viewBox="0 0 1024 1024"
                                                version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4864" width="18"
                                                height="18">
                                                <path
                                                    d="M800 128H224C134.4 128 64 198.4 64 288v448c0 89.6 70.4 160 160 160h576c89.6 0 160-70.4 160-160V288c0-89.6-70.4-160-160-160z m96 608c0 54.4-41.6 96-96 96H224c-54.4 0-96-41.6-96-96V288c0-54.4 41.6-96 96-96h576c54.4 0 96 41.6 96 96v448z"
                                                    p-id="4865" fill="#aaaaaa"></path>
                                                <path
                                                    d="M684.8 483.2l-256-112c-22.4-9.6-44.8 6.4-44.8 28.8v224c0 22.4 22.4 38.4 44.8 28.8l256-112c25.6-9.6 25.6-48 0-57.6z"
                                                    p-id="4866"></path>
                                            </svg>
                                            {{ handleNum(recommendVideos[0].stats.play) }}
                                            <svg t="1703614725224" class="playinfo-dm" viewBox="0 0 1024 1024"
                                                version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5601"
                                                id="mx_n_1703614725225" width="18" height="18">
                                                <path
                                                    d="M800 128H224C134.4 128 64 198.4 64 288v448c0 89.6 70.4 160 160 160h576c89.6 0 160-70.4 160-160V288c0-89.6-70.4-160-160-160z m96 608c0 54.4-41.6 96-96 96H224c-54.4 0-96-41.6-96-96V288c0-54.4 41.6-96 96-96h576c54.4 0 96 41.6 96 96v448z"
                                                    p-id="5602"></path>
                                                <path
                                                    d="M240 384h64v64h-64zM368 384h384v64h-384zM432 576h352v64h-352zM304 576h64v64h-64z"
                                                    p-id="5603"></path>
                                            </svg>
                                            {{ handleNum(recommendVideos[0].stats.danmu) }}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!-- 分隔线 -->
                            <div class="split-line"></div>
                        </div>
                        <div class="rec-list" v-if="recommendVideos.length > 1">
                            <!-- 视频卡片 -->
                            <div class="video-page-card-small" v-for="(item, index) in recommendVideos.slice(1,)"
                                :key="index">
                                <div class="card-box">
                                    <div class="pic-box">
                                        <div class="pic" @click="changeVideo(item.video.vid)">
                                            <img :src="item.video.coverUrl" alt="">
                                            <span class="duration">{{ handleDuration(item.video.duration) }}</span>
                                        </div>
                                    </div>
                                    <div class="info">
                                        <p class="title" @click="changeVideo(item.video.vid)">{{ item.video.title }}</p>
                                        <a :href="`/space/${item.user.uid}`" target="_blank" class="upname">
                                            <svg t="1703614018039" class="icon" viewBox="0 0 1024 1024" version="1.1"
                                                xmlns="http://www.w3.org/2000/svg" p-id="4221" width="18" height="18">
                                                <path
                                                    d="M800 128H224C134.4 128 64 198.4 64 288v448c0 89.6 70.4 160 160 160h576c89.6 0 160-70.4 160-160V288c0-89.6-70.4-160-160-160z m96 608c0 54.4-41.6 96-96 96H224c-54.4 0-96-41.6-96-96V288c0-54.4 41.6-96 96-96h576c54.4 0 96 41.6 96 96v448z"
                                                    p-id="4222"></path>
                                                <path
                                                    d="M419.2 544c0 51.2-3.2 108.8-83.2 108.8S252.8 595.2 252.8 544v-217.6H192v243.2c0 96 51.2 140.8 140.8 140.8 89.6 0 147.2-48 147.2-144v-240h-60.8V544zM710.4 326.4h-156.8V704h60.8v-147.2h96c102.4 0 121.6-67.2 121.6-115.2 0-44.8-19.2-115.2-121.6-115.2z m-3.2 179.2h-92.8V384h92.8c32 0 60.8 12.8 60.8 60.8 0 44.8-32 60.8-60.8 60.8z"
                                                    p-id="4223"></path>
                                            </svg>
                                            <span class="name">{{ item.user.nickname }}</span>
                                        </a>
                                        <div class="playinfo">
                                            <svg t="1703614610134" class="playinfo-play" viewBox="0 0 1024 1024"
                                                version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4864" width="18"
                                                height="18">
                                                <path
                                                    d="M800 128H224C134.4 128 64 198.4 64 288v448c0 89.6 70.4 160 160 160h576c89.6 0 160-70.4 160-160V288c0-89.6-70.4-160-160-160z m96 608c0 54.4-41.6 96-96 96H224c-54.4 0-96-41.6-96-96V288c0-54.4 41.6-96 96-96h576c54.4 0 96 41.6 96 96v448z"
                                                    p-id="4865" fill="#aaaaaa"></path>
                                                <path
                                                    d="M684.8 483.2l-256-112c-22.4-9.6-44.8 6.4-44.8 28.8v224c0 22.4 22.4 38.4 44.8 28.8l256-112c25.6-9.6 25.6-48 0-57.6z"
                                                    p-id="4866"></path>
                                            </svg>
                                            {{ handleNum(item.stats.play) }}
                                            <svg t="1703614725224" class="playinfo-dm" viewBox="0 0 1024 1024"
                                                version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5601"
                                                id="mx_n_1703614725225" width="18" height="18">
                                                <path
                                                    d="M800 128H224C134.4 128 64 198.4 64 288v448c0 89.6 70.4 160 160 160h576c89.6 0 160-70.4 160-160V288c0-89.6-70.4-160-160-160z m96 608c0 54.4-41.6 96-96 96H224c-54.4 0-96-41.6-96-96V288c0-54.4 41.6-96 96-96h576c54.4 0 96 41.6 96 96v448z"
                                                    p-id="5602"></path>
                                                <path
                                                    d="M240 384h64v64h-64zM368 384h384v64h-384zM432 576h352v64h-352zM304 576h64v64h-64z"
                                                    p-id="5603"></path>
                                            </svg>
                                            {{ handleNum(item.stats.danmu) }}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- 收藏框 -->
        <el-dialog v-model="collectVisible" :close-on-click-modal="false" destroy-on-close align-center>
            <AddToFavorite :lastSelected="collectedFids" :vid="video.vid ? video.vid : 0" @collected="updateCollect">
            </AddToFavorite>
        </el-dialog>
    </div>
</template>

<script>
import CommentVue from '@/components/comment/CommentVue.vue';
import HeaderBar from '@/components/headerBar/HeaderBar.vue';
import PlayerWrap from '@/components/player/PlayerWrapper.vue';
import VPopover from '@/components/popover/VPopover.vue';
import VAvatar from '@/components/avatar/VAvatar.vue';
import UserCard from '@/components/UserCard/UserCard.vue';
import DanmuBox from '@/components/danmu/DanmuBox.vue';
import AddToFavorite from '@/components/favorite/AddToFavorite.vue';
import { handleTime, handleNum, handleDate, linkify } from '@/utils/utils.js';
import { ElMessage } from 'element-plus';

export default {
    name: "VideoDetail",
    components: {
        CommentVue,
        HeaderBar,
        PlayerWrap,
        VPopover,
        VAvatar,
        UserCard,
        DanmuBox,
        AddToFavorite,
    },
    data() {
        return {
            socket: null,
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
            comment: 0, // 评论数
            population: 0,  // 当前观看人数
            user: {
                uid: 0,
            },   // 投稿用户信息
            category: {},   // 视频分区信息
            tags: [],   // 投稿标签
            showAllDesc: true, // 是否展开简介
            descTooLong: false,   // 简介太长需要展开
            jumpTimePoint: -1,  // 双击弹幕跳转的时间点
            autonext: false,    // 是否自动连播
            recommendVideos: [],    // 推荐视频
            vids: [],   // 存放本视频和已推荐的视频id
            isGifShow: false,
            gifDisplay: false,
            collectVisible: false,  // 收藏框的显隐
            collectedFids: new Set(),   // 收藏了该视频的收藏夹ID集合
            isMounted: false,
            loveLoading: false, // 点赞防抖
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
                this.$router.push("/notfound");
                return false;
            }
            if (res.data.data) {
                // console.log("视频详情: ", res.data.data);
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
                this.comment = res.data.data.stats.comment;
            }
            this.isDescTooLong();
            if (localStorage.getItem("teri_token")) {
                this.getCollectedFids();
            }
            return true;
        },

        // 获取推荐视频
        async getRecommendVideos() {
            this.recommendVideos = [];
            this.vids = [];
            this.vids.push(Number(this.$route.params.vid));
            let ids = this.vids.join(",");  // 用逗号连接成一个字符串
            const res = await this.$get("/video/cumulative/visitor", {
                params: { vids: ids }
            });
            if (res.data.data) {
                this.recommendVideos.push(...res.data.data.videos);
                this.vids.push(...res.data.data.vids);
                // 默认一次只能查10条，这里再请求一次，总共查20条
                ids = this.vids.join(",");
                const res2 = await this.$get("/video/cumulative/visitor", {
                    params: { vids: ids }
                });
                if (res2.data.data) {
                    this.recommendVideos.push(...res2.data.data.videos);
                    this.vids.push(...res2.data.data.vids);
                }
            }
        },

        // 获取弹幕列表
        async getDanmuList() {
            const res = await this.$get(`/danmu-list/${this.$route.params.vid}`);
            if (res.data.data == null || res.data.data.length === 0) {
                this.$store.commit("updateDanmuList", []);
            } else if (res.data.data.length > 0) {
                this.$store.commit("updateDanmuList", res.data.data);
            }
        },

        // 初始化实时弹幕的websocket
        async initWebsocket() {
            const wsBaseUrl = process.env.VUE_APP_WS_DANMU_URL;
            const socketUrl = `${wsBaseUrl}/ws/danmu/${this.$route.params.vid}`;
            if (this.socket != null) {
                await this.socket.close();
                this.socket = null;
            }
            this.socket = new WebSocket(socketUrl);
            // 开启监听
            this.socket.addEventListener('close', this.handleWsClose);
            this.socket.addEventListener('message', this.handleWsMessage);
            this.socket.addEventListener('error', this.handleWsError);
        },

        async closeWebSocket() {
            if (this.socket != null) {
                await this.socket.close();
                this.socket = null;
            }
        },

        // 点赞或取消点赞
        async loveOrNot(isLove, isSet) {
            if (this.loveLoading) return;
            if (!this.$store.state.user.uid) {
                this.$store.state.openLogin = true;
                this.$nextTick(() => {
                    this.$store.state.openLogin = false;
                });
                return;
            }
            if (!this.video.vid) {
                ElMessage.error("视频不存在");
                return;
            }
            this.loveLoading = true;
            const originalLove = this.$store.state.attitudeToVideo.love;
            const formData = new FormData();
            formData.append("vid", Number(this.video.vid));
            formData.append("isLove", isLove);
            formData.append("isSet", isSet);
            const res = await this.$post("/video/love-or-not", formData, {
                headers: { Authorization: "Bearer " + localStorage.getItem("teri_token") }
            });
            if (!res.data.data) {
                this.loveLoading = false;
                return;
            }
            const data = res.data.data;
            const atv = {
                love: data.love === 1 ? true : false,
                unlove: data.unlove === 1 ? true : false,
                coin: data.coin,
                collect: data.collect === 1 ? true : false
            };
            this.$store.commit("updateAttitudeToVideo", atv);
            if (isLove && isSet) {
                this.good++;   // 点赞 点赞数加一
                this.gifShow();
                setTimeout(() => {
                    this.gifHide();
                }, 3000);
            } else if (isLove || (!isLove && isSet && originalLove)) {
                this.good = this.good - 1 < 0 ? 0 : this.good - 1;   // 取消点赞或者原来是赞但是点踩了 点赞数减一
            }
            this.loveLoading = false;
        },

        // 获取收藏了该视频的收藏夹ID列表
        async getCollectedFids() {
            const res = await this.$get("/video/collected-fids", {
                params: { vid: Number(this.video.vid) },
                headers: { Authorization: "Bearer " + localStorage.getItem("teri_token") }
            });
            if (!res.data) return;
            this.collectedFids = new Set(res.data.data);
            // console.log("该用户收藏了该视频的收藏夹ID集合: ", this.collectedFids);
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

        // 创建聊天
        createChat() {
            if (!this.$store.state.user.uid) {
                this.$store.state.openLogin = true;
                this.$nextTick(() => {
                    this.$store.state.openLogin = false;
                });
                return;
            }
            this.openNewPage(`/message/whisper/${this.user.uid}`);
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
        handleWsClose() {
            // console.log("弹幕websocket信道关闭,请刷新页面重试");
            setTimeout(() => {
                if (!this.socket) {
                    this.initWebsocket();    // 如果两秒后还未重连就手动重连
                }
            }, 2000);
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
                this.$store.state.openLogin = true;
                this.$nextTick(() => {
                    this.$store.state.openLogin = false;
                });
                return;
            }
            const dmJson = JSON.stringify({
                token: "Bearer " + localStorage.getItem('teri_token'),
                data: dm
            });
            this.socket.send(dmJson);
        },

        // 切换视频
        async changeVideo(vid) {
            await this.$router.push(`/video/${vid}`);
            await this.initWebsocket();
            if (await this.getVideoDetail()) {
                await this.getDanmuList();
                await this.getRecommendVideos();
            }
        },

        // 视频播放结束自动连播
        next() {
            if (this.recommendVideos[0]) {
                this.changeVideo(this.recommendVideos[0].video.vid);
            }
        },

        // 点赞的动画效果
        gifShow() {
            this.gifDisplay = true;
            this.isGifShow = true;
        },

        gifHide() {
            this.isGifShow = false;
            setTimeout(() => {
                this.gifDisplay = false;
            }, 300);
        },

        // 打开收藏对话框
        openCollectDialog() {
            if (!this.$store.state.user.uid) {
                this.$store.state.openLogin = true;
                this.$nextTick(() => {
                    this.$store.state.openLogin = false;
                });
                return;
            }
            if (!this.video.vid) {
                ElMessage.error("视频不存在");
                return;
            }
            this.collectVisible = true;
        },

        // 更新收藏
        updateCollect(info) {
            this.collectedFids = info.fids;
            this.collect += info.num;
            this.collectVisible = false;
        },

        noPage() {
            ElMessage.warning("该功能暂未开放");
        }
    },
    async created() {
        // 同步自动连播
        if (localStorage.getItem("playerSetting")) {
            let setting = JSON.parse(localStorage.getItem("playerSetting"));
            this.autonext = setting.autonext;
        }
        await this.initWebsocket();
        if (await this.getVideoDetail()) {
            await this.getDanmuList();
            await this.getRecommendVideos();
        }
    },
    mounted() {
        window.addEventListener('scroll', this.handleScroll);
        this.handleScroll();
        window.addEventListener('beforeunload', this.closeWebSocket);    // beforeunload 事件监听标签页关闭
        setTimeout(() => {
            this.isMounted = true;
        }, 3000);
    },
    async beforeUnmount() {
        await this.closeWebSocket();
        window.removeEventListener('beforeunload', this.closeWebSocket);
        window.removeEventListener('scroll', this.handleScroll);
    },
    watch: {
        // 路由变化要关闭收藏对话框
        "$route.path"() {
            this.collectVisible = false;
        },
        // 当前页面下重新登录要重新获取收藏夹ID 退出登录要清空收藏夹ID
        "$store.state.isLogin"(curr) {
            if (this.isMounted && curr) {
                this.getCollectedFids();
            } else if (!curr) {
                this.collectedFids = new Set();
            }
        }
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

.view,
.danmu,
.copyright {
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

.video-toolbar-left-item.on,
.video-toolbar-left-item:hover {
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

.dianzan-gif {
    position: absolute;
    top: -50px;
    left: -10px;
    height: 40px;

}

.dianzan-gif img {
    height: 100%;
}

.gif-hide {
    animation: disappear 0.2s ease-out forwards;
    transform-origin: bottom;
}

.gif-show {
    animation: appear 0.2s ease-out forwards;
    transform-origin: bottom;
}

@keyframes appear {
    0% {
        opacity: 0;
        transform: translateY(5px) scale(0);
    }

    100% {
        opacity: 1;
        transform: translateY(0) scale(1);
    }
}

@keyframes disappear {
    0% {
        opacity: 1;
        transform: translateY(0) scale(1);
    }

    100% {
        opacity: 0;
        transform: translateY(5px) scale(0);
    }
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

.recommend-list {
    margin-top: 18px;
}

.rec-title {
    font-size: 15px;
    -webkit-font-smoothing: antialiased;
    color: var(--text1);
    display: flex;
    justify-content: space-between;
    margin-bottom: 12px;
    line-height: 20px;
}

.next-button {
    color: var(--text3);
    font-size: 13px;
    line-height: 16px;
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
}

.next-button .txt {
    margin-right: 4px;
    vertical-align: middle;
}

.next-button .switch-button {
    margin: 0;
    display: inline-block;
    position: relative;
    width: 30px;
    height: 20px;
    outline: none;
    border-radius: 10px;
    box-sizing: border-box;
    cursor: pointer;
    transition: border-color .2s, background-color .2s;
    vertical-align: middle;
    background: var(--text3);
    border: 1px solid var(--text3);
}

.next-button .switch-button.on {
    background: var(--brand_pink);
    border: 1px solid var(--brand_pink);
}

.next-button .switch-button:after {
    content: "";
    position: absolute;
    top: 1px;
    left: 1px;
    border-radius: 100%;
    width: 16px;
    height: 16px;
    background-color: #fff;
    transition: all .2s;
}

.next-button .switch-button.on:after {
    left: 11px;
}

.split-line {
    width: 100%;
    height: 1px;
    background: var(--line_regular);
}

.rec-list {
    margin-top: 18px;
}

.video-page-card-small {
    margin-bottom: 12px;
}

.video-page-card-small a {
    color: #222;
    background-color: transparent;
    text-decoration: none;
    outline: none;
    cursor: pointer;
    transition: color .3s;
    -webkit-text-decoration-skip: objects;
}

.video-page-card-small .card-box {
    display: flex;
}

.video-page-card-small .card-box .pic-box {
    position: relative;
    width: 141px;
    height: 80px;
    border-radius: 6px;
    background: var(--graph_weak);
    flex: 0 0 auto;
}

.video-page-card-small .card-box .pic-box .pic {
    position: relative;
    overflow: hidden;
    border-radius: 6px;
    width: 100%;
    height: 100%;
    cursor: pointer;
}

.video-page-card-small .card-box .pic-box .pic img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    image-rendering: crisp-edges;
}

.video-page-card-small .card-box .pic-box .pic .duration {
    position: absolute;
    bottom: 6px;
    right: 6px;
    color: #fff;
    height: 20px;
    line-height: 20px;
    transition: opacity 0.3s;
    z-index: 5;
    font-size: 13px;
    background-color: rgba(0, 0, 0, 0.4);
    border-radius: 2px;
    padding: 0 4px;
}

.video-page-card-small .card-box .info {
    margin-left: 10px;
    flex: 1;
    font-size: 13px;
    line-height: 15px;
}

.video-page-card-small .card-box .info .title {
    cursor: pointer;
    color: var(--text1);
    display: block;
    font-size: 15px;
    line-height: 19px;
    transition: color 0.3s;
    display: -webkit-box;
    overflow: hidden;
    -webkit-box-orient: vertical;
    text-overflow: -o-ellipsis-lastline;
    text-overflow: ellipsis;
    word-break: break-word;
    -webkit-line-clamp: 2;
    -webkit-font-smoothing: antialiased;
}

.video-page-card-small .card-box .info .title:hover {
    color: var(--brand_pink);
}

.video-page-card-small .card-box .info .upname {
    cursor: pointer;
    margin: 2px 0;
    height: 20px;
    color: var(--text3);
    transition: color 0.3s;
    display: flex;
    align-items: center;
}

.video-page-card-small .card-box .info .upname:hover {
    color: var(--brand_pink);
}

.video-page-card-small .card-box .info .upname svg {
    margin-right: 4px;
    fill: var(--text3);
    transition: fill 0.3s;
}

.video-page-card-small .card-box .info .upname:hover svg {
    fill: var(--brand_pink);
}

.video-page-card-small .card-box .info .upname .name {
    display: -webkit-box;
    overflow: hidden;
    -webkit-box-orient: vertical;
    text-overflow: -o-ellipsis-lastline;
    text-overflow: ellipsis;
    word-break: break-word;
    -webkit-line-clamp: 1;
}

.video-page-card-small .card-box .info .playinfo {
    color: var(--text3);
    fill: var(--text3);
    display: inline-flex;
    align-items: center;
}

.video-page-card-small .card-box .info .playinfo svg {
    margin-right: 4px;
}

.playinfo-dm {
    margin-left: 8px;
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