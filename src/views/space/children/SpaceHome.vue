<template>
    <div class="space-home">
        <div class="col-1">
            <!-- 视频 -->
            <div class="section video">
                <h3 class="section-title">
                    <span class="t" @click="$router.push(`/space/${uid}/video`)">{{ this.$store.state.user.uid === uid ? '我' : 'TA' }}的视频</span>
                    <span class="count">{{ videoCount }}</span>
                    <span class="more" @click="$router.push(`/space/${uid}/video`)">更多<i class="iconfont icon-youjiantou"></i></span>
                    <div class="be-tab" v-if="videoCount > 1">
                        <ul class="be-tab-inner">
                            <li class="be-tab-item" :class="{'active': rule === 1}" @click="rule = 1">
                                <span>最新发布</span>
                            </li>
                            <li class="be-tab-item" :class="{'active': rule === 2}" @click="rule = 2">
                                <span>最多播放</span>
                            </li>
                            <li class="be-tab-item" :class="{'active': rule === 3}" @click="rule = 3">
                                <span>最多点赞</span>
                            </li>
                        </ul>
                        <div class="be-tab-cursor" :style="`transform: translateX(${63 * (rule - 1)}px); width: 48px;`"></div>
                    </div>
                </h3>
                <div class="video-content">
                    <div class="small-item" v-for="(item, index) in videoList" :key="index">
                        <a :href="`/video/${item.video.vid}`" target="_blank" class="cover">
                            <img v-if="item.video.coverUrl" :src="item.video.coverUrl" alt="">
                            <span v-if="item.video.duration" class="length">{{ handleDuration(item.video.duration) }}</span>
                        </a>
                        <a :href="`/video/${item.video.vid}`" target="_blank" class="title" :title="item.video.title">{{ item.video.title }}</a>
                        <div class="meta">
                            <span class="play" v-if="item.stats">
                                <svg t="1711216187515" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4408" id="mx_n_1711216187515" width="14" height="14"><path d="M800 128H224C134.4 128 64 198.4 64 288v448c0 89.6 70.4 160 160 160h576c89.6 0 160-70.4 160-160V288c0-89.6-70.4-160-160-160z m96 608c0 54.4-41.6 96-96 96H224c-54.4 0-96-41.6-96-96V288c0-54.4 41.6-96 96-96h576c54.4 0 96 41.6 96 96v448z" p-id="4409"></path><path d="M684.8 483.2l-256-112c-22.4-9.6-44.8 6.4-44.8 28.8v224c0 22.4 22.4 38.4 44.8 28.8l256-112c25.6-9.6 25.6-48 0-57.6z" p-id="4410"></path></svg>
                                <span class="num">{{ handleNum(item.stats.play) }}</span>
                            </span>
                            <span class="time" v-if="item.stats">{{ handleDate(item.video.uploadDate) }}</span>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 专栏 -->
            <div class="section article">
                <h3 class="section-title">
                    <span class="t" @click="$router.push(`/space/${uid}/article`)">{{ this.$store.state.user.uid === uid ? '我' : 'TA' }}的专栏</span>
                    <span class="count">{{ 0 }}</span>
                </h3>
                <div class="article-content">
                    
                </div>
            </div>
            <!-- 收藏夹 -->
            <div class="section fav">
                <h3 class="section-title">
                    <span class="t" @click="$router.push(`/space/${uid}/favlist`)">{{ this.$store.state.user.uid === uid ? '我' : 'TA' }}的收藏夹</span>
                    <span class="count">{{ favList.length }}</span>
                    <span class="more" @click="$router.push(`/space/${uid}/favlist`)">更多<i class="iconfont icon-youjiantou"></i></span>
                </h3>
                <div class="fav-content">
                    <div v-for="(item, index) in favList" :key="index">
                        <div class="fav-item" v-if="item.visible === 1 || item.uid === this.$store.state.user.uid">
                            <div class="fav-covers" @click="$router.push(`/space/${uid}/favlist?fid=${item.fid}`)">
                                <img v-if="item.cover" :src="item.cover" alt="">
                            </div>
                            <span class="fav-count">{{ item.count }}</span>
                            <div class="m">
                                <span class="state">{{ item.visible === 1 ? '公开' : '私密' }}</span>
                                <a class="name" :title="item.title" @click="$router.push(`/space/${uid}/favlist?fid=${item.fid}`)">{{ item.title }}</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 点赞 -->
            <div class="section love">
                <h3 class="section-title">
                    <span class="t">最近点赞的视频</span>
                </h3>
                <div class="love-content">
                    <div class="small-item" v-for="(item, index) in loveVideos" :key="index">
                        <a :href="`/video/${item.video.vid}`" target="_blank" class="cover" v-if="item.video.status === 1">
                            <img :src="item.video.coverUrl" alt="">
                            <span class="length">{{ handleDuration(item.video.duration) }}</span>
                        </a>
                        <div class="disable-cover" v-else>
                            <p>视频已失效</p>
                            <div class="delete-from">{{ item.video.status === 3 ? '已被UP主删除' : '视频审核中' }}</div>
                        </div>
                        <a :href="`/video/${item.video.vid}`" target="_blank" class="title" :title="item.video.title" v-if="item.video.status === 1">{{ item.video.title }}</a>
                        <p class="title" v-else>已失效视频</p>
                        <div class="meta">
                            <span class="play" v-if="item.video.status === 1">
                                <svg t="1711216187515" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4408" id="mx_n_1711216187515" width="14" height="14"><path d="M800 128H224C134.4 128 64 198.4 64 288v448c0 89.6 70.4 160 160 160h576c89.6 0 160-70.4 160-160V288c0-89.6-70.4-160-160-160z m96 608c0 54.4-41.6 96-96 96H224c-54.4 0-96-41.6-96-96V288c0-54.4 41.6-96 96-96h576c54.4 0 96 41.6 96 96v448z" p-id="4409"></path><path d="M684.8 483.2l-256-112c-22.4-9.6-44.8 6.4-44.8 28.8v224c0 22.4 22.4 38.4 44.8 28.8l256-112c25.6-9.6 25.6-48 0-57.6z" p-id="4410"></path></svg>
                                <span class="num">{{ handleNum(item.stats.play) }}</span>
                            </span>
                            <span class="danmu" v-if="item.video.status === 1">
                                <svg t="1711224902593" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4273" width="14" height="14"><path d="M800 128H224C134.4 128 64 198.4 64 288v448c0 89.6 70.4 160 160 160h576c89.6 0 160-70.4 160-160V288c0-89.6-70.4-160-160-160z m96 608c0 54.4-41.6 96-96 96H224c-54.4 0-96-41.6-96-96V288c0-54.4 41.6-96 96-96h576c54.4 0 96 41.6 96 96v448z" p-id="4274"></path><path d="M240 384h64v64h-64zM368 384h384v64h-384zM432 576h352v64h-352zM304 576h64v64h-64z" p-id="4275"></path></svg>
                                <span class="num">{{ handleNum(item.stats.danmu) }}</span>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 投币 -->
            <div class="section coin">
                <h3 class="section-title">
                    <span class="t">最近投币的视频</span>
                </h3>
                <div class="coin-content">
                    
                </div>
            </div>
        </div>
        <div class="col-2">
            <div class="section user-info">
                <p class="user-info-title">
                    <span class="info-title">个人资料</span>
                    <a href="/account/info" target="_blank" v-if="uid === this.$store.state.user.uid">
                        <span class="change-info-btn">修改资料</span>
                    </a>
                </p>
                <div class="info-content">
                    <div class="info-personal">
                        <div class="info-wrap">
                            <span class="info-command">UID</span>
                            <span class="info-value">{{ uid }}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { handleTime, handleNum, handleDate } from '@/utils/utils.js';

export default {
    name: "SpaceHome",
    data() {
        return {
            rule: 1,    // 视频列表排序方式
            videoList: [],  // 用户投稿视频列表
            videoCount: 0,  // 用户视频投稿数量
            favList: [],    // 用户收藏夹列表
            loveVideos: [], // 用户最近点赞视频列表
        }
    },
    computed: {
        // 空间主人的uid
        uid() {
            return Number(this.$route.params.uid);
        }
    },
    methods: {
        // 获取用户的投稿视频
        async getVideoList() {
            const res = await this.$get("/video/user-works", {
                params: {
                    uid: this.uid,
                    rule: this.rule,
                    page: 1,
                    quantity: 20
                }
            });
            if (!res.data) return;
            this.videoCount = res.data.data.count;
            this.videoList = res.data.data.list;
            // console.log(this.videoList)
        },

        // 获取用户收藏夹
        async getFavList() {
            let res;
            if (!localStorage.getItem("teri_token")) {
                res = await this.$get("/favorite/get-all/visitor", {
                    params: { uid: this.uid },
                });
            } else {
                res = await this.$get("/favorite/get-all/user", {
                    params: { uid: this.uid },
                    headers: { Authorization: "Bearer " + localStorage.getItem("teri_token") }
                });
            }
            if (!res.data) return;
            // 将默认置顶
            const defaultFav = res.data.data.find(item => item.type === 1);
            const list = res.data.data.filter(item => item.type !== 1);
            list.unshift(defaultFav);
            this.favList = list;
            // console.log(this.favList)
        },

        // 获取用户最近点赞的视频
        async getLoveVideos() {
            const res = await this.$get("/video/user-love", {
                params: {
                    uid: this.uid,
                    offset: 0,
                    quantity: 20
                }
            });
            if (!res.data) return;
            this.loveVideos = res.data.data;
            // console.log(this.loveVideos)
        },


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
    },
    mounted() {
        this.getVideoList();
        this.getFavList();
        this.getLoveVideos();
    },
    watch: {
        "rule"() {
            const item = {
                video: {title: ''},
                user: {},
            }
            this.videoList.forEach((el, index) => this.videoList[index] = item);
            this.getVideoList();
        }
    }
}
</script>

<style scoped>
ol, ul {
    list-style: none;
}

.space-home * {
    box-sizing: initial;
}

.col-1 {
    background: #fff;
    border: 1px solid #eee;
    border-radius: 4px;
    float: left;
    padding: 15px 20px;
    width: 700px;
}

.section {
    border-bottom: 1px solid #eee;
    margin-bottom: 17px;
    position: relative;
}

.section-title {
    color: var(--text1);
    font-size: 20px;
    font-weight: 400;
    line-height: 33px;
    padding: 0 0 15px;
    position: relative;
}

.section-title .t {
    display: inline-block;
    vertical-align: middle;
    transition: color .2s ease, background-color .2s ease;
}

.video .t:hover, .article .t:hover, .fav .t:hover {
    cursor: pointer;
    color: var(--brand_pink);
}

.section .count {
    background: #f6fafb;
    border: 1px solid #ddd;
    border-radius: 3px;
    color: #777;
    display: inline-block;
    font-size: 12px;
    line-height: 18px;
    height: 18px;
    margin-left: 11px;
    padding: 0 5px;
    position: relative;
    vertical-align: middle;
}

.section .count:before {
    background-position: -215px -340px;
    content: "";
    display: block;
    left: -7px;
    top: -3px;
    height: 22px;
    width: 10px;
}

.section .count:before {
    background-image: url('~assets/img/bilibili/icons1.png');
    position: absolute;
}

.section .more {
    border: 1px solid #b8c0cc;
    border-radius: 4px;
    color: #6d757a;
    font-size: 12px;
    line-height: 22px;
    transition: border .2s ease;
    padding: 0 6px 0 10px;
    top: 6px;
    right: 0;
    position: absolute;
    cursor: pointer;
}

.more .icon-youjiantou {
    font-size: 12px;
}

.section .more:hover {
    border-color: var(--Pi4);
    color: var(--Pi4);
}

.be-tab, .be-tab-item {
    position: relative;
    font-family: PingFang SC, Helvetica Neue, Microsoft YaHei, sans-serif;
}

.video .be-tab {
    display: inline-block;
    line-height: 18px;
    vertical-align: middle;
    margin-left: 10px;
}

.be-tab-item {
    float: left;
    font-size: 14px;
    margin-right: 20px;
    line-height: 28px;
    vertical-align: top;
    cursor: pointer;
}

.be-tab-item.active {
    color: var(--brand_pink);
}

.video .be-tab-item {
    padding: 0 0 3px;
    margin-right: 15px;
    font-size: 12px;
}

.be-tab-cursor {
    left: 0;
    border-bottom: 1px solid var(--brand_pink);
    transform: translateX(0);
    transition: width .2s ease, transform .2s ease;
}

.be-tab-cursor, .be-tab-cursor:after {
    position: absolute;
    bottom: 0;
    height: 0;
    width: 0;
}

.be-tab-cursor:after {
    content: "";
    left: 50%;
    transform: translateX(-50%);
    border-bottom: 3px solid var(--brand_pink);
    border-top: 0;
    border-left: 3px solid transparent;
    border-right: 3px solid transparent;
}

.video-content {
    max-height: 935px;
    overflow: hidden;
    font-family: PingFang SC, Helvetica Neue, Microsoft YaHei, sans-serif;
}

.fav-content {
    max-height: 430px;
    overflow: hidden;
    font-family: PingFang SC, Helvetica Neue, Microsoft YaHei, sans-serif;
}

.love-content, .coin-content {
    max-height: 380px;
    overflow: hidden;
    font-family: PingFang SC, Helvetica Neue, Microsoft YaHei, sans-serif;
}

.small-item {
    display: block;
    float: left;
    width: 160px;
    position: relative;
    margin: 0 0 3px;
    padding: 10px;
}

.video-content .small-item:nth-child(4n+1), .love-content .small-item:nth-child(4n+1), .coin-content .small-item:nth-child(4n+1) {
    padding-left: 0;
}

.video-content .small-item:nth-child(4n+4), .love-content .small-item:nth-child(4n+4), .coin-content .small-item:nth-child(4n+4) {
    padding-right: 0;
}

.small-item .cover {
    background: url('~assets/img/bilibili/video-placeholder.png') 50%;
    background-size: cover;
    border-radius: 4px;
    display: block;
    width: 160px;
    height: 100px;
    overflow: hidden;
    position: relative;
}

.cover img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    image-rendering: crisp-edges;
}

.small-item .length {
    background: rgba(0, 0, 0, .5);
    color: #fff;
    line-height: 18px;
    font-size: 12px;
    padding: 0 4px;
    position: absolute;
    z-index: 5;
    transition: background .2s ease;
    right: 4px;
    bottom: 6px;
    border-radius: 2px;
}

.small-item .title {
    display: block;
    line-height: 20px;
    height: 38px;
    margin-top: 6px;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    text-overflow: ellipsis;
    word-break: break-word;
    line-break: anywhere;
    font-size: 12px;
}

.small-item .meta {
    color: #999;
    white-space: nowrap;
    font-size: 0;
    margin-top: 5px;
    height: 16px;
    line-height: 16px;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-align: center;
    align-items: center;
}

.small-item .meta>span {
    display: inline-block;
    white-space: nowrap;
    height: 16px;
    line-height: 18px;
    font-size: 12px;
    overflow: hidden;
}

.small-item .meta>span:first-child {
    width: 92px;
}

.small-item .meta .play, .small-item .meta .time, .small-item .meta .danmu {
    display: -ms-inline-flexbox;
    display: inline-flex;
    -ms-flex-align: center;
    align-items: center;
}

.small-item .meta .num {
    margin-left: 3px;
}

.small-item .meta svg {
    fill: #999;
}

.fav-item {
    position: relative;
    float: left;
    margin: 0 20px 28px 0;
}

.fav-covers {
    border: 1px solid #ccd0d7;
    border-radius: 4px;
    display: block;
    width: 152px;
    height: 152px;
    margin-bottom: 11px;
    overflow: hidden;
    position: relative;
    background: url('~assets/img/bilibili/video-placeholder.png') 50%;
    background-size: cover;
    cursor: pointer;
}

.fav-covers img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    image-rendering: crisp-edges;
}

.fav-count {
    position: absolute;
    top: 10px;
    right: 10px;
    min-width: 12px;
    padding: 0 9px;
    line-height: 18px;
    text-align: center;
    font-family: Arial;
    color: #fff;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    background: rgba(0, 0, 0, .5);
    border-radius: 9px;
}

.fav-item .state {
    color: #99a2aa;
    float: right;
    line-height: 24px;
}

.fav-item .name {
    display: block;
    font-size: 18px;
    font-family: Microsoft Yahei UI Light, Microsoft Yahei Light;
    line-height: 24px;
    width: 7em;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    cursor: pointer;
}

.col-2 {
    float: right;
    width: 350px;
}

.col-2 .section {
    background: #fff;
    border: 1px solid #eee;
    border-radius: 4px;
    padding: 15px 20px 18px;
    margin-bottom: 10px;
}

.user-info .user-info-title {
    display: -ms-flexbox;
    display: flex;
    -ms-flex-pack: justify;
    justify-content: space-between;
    box-sizing: border-box;
    padding-bottom: 18px;
    border-bottom: 1px solid #e5e9ef;
    margin-bottom: 10px;
}

.info-title {
    line-height: 23px;
    font-size: 14px;
    color: #222;
    font-family: Microsoft YaHei;
}

.change-info-btn {
    display: inline-block;
    width: 56px;
    height: 22px;
    color: #9499a0;
    border: .5px solid #c0c9d4;
    text-align: center;
    font-size: 12px;
    line-height: 22px;
    border-radius: 4px;
    font-family: Microsoft YaHei;
}

.info-personal {
    display: -ms-flexbox;
    display: flex;
    -ms-flex-pack: justify;
    justify-content: space-between;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
    width: 100%;
}

.info-wrap {
    -ms-flex-negative: 0;
    flex-shrink: 0;
    width: 139px;
    margin: 10px 0;
    white-space: nowrap;
}

.info-command {
    display: inline-block;
    min-width: 24px;
    font-size: 12px;
    font-family: Microsoft YaHei;
    line-height: 16px;
    color: #9499a0;
    margin-right: 6px;
}

.info-value {
    color: #6d757a;
    font-family: Microsoft YaHei;
    font-size: 12px;
    line-height: 16px;
    padding-right: 6px;
}

@media (min-width: 1420px) {
    .col-1 {
        width: 880px;
    }

    .video-content .small-item:nth-child(4n+1), .love-content .small-item:nth-child(4n+1), .coin-content .small-item:nth-child(4n+1) {
        padding-left: 10px;
    }

    .video-content .small-item:nth-child(5n+1), .love-content .small-item:nth-child(5n+1), .coin-content .small-item:nth-child(5n+1) {
        padding-left: 0;
    }

    .video-content .small-item:nth-child(5n+5), .love-content .small-item:nth-child(5n+5), .coin-content .small-item:nth-child(5n+5) {
        padding-right: 0;
    }
}
</style>