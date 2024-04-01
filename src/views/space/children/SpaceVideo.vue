<template>
    <div class="space-video">
        <h3 class="page-head">
            <span class="t">{{ this.$store.state.user.uid === uid ? '我' : 'TA' }}的视频</span>
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
            <div class="page-head__right">
                <div class="item">
                    <svg t="1711895089920" class="icon" :class="{'active': type === 1}" @click="type = 1" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4335" width="18" height="18"><path d="M625.77777742 624.26074075H398.22222222V396.70518555h227.5555552z m0 318.57777813v-273.06666667H398.22222222v273.06666667z m45.51111147-273.06666667v273.06666667h216.17777813a56.95288853 56.95288853 0 0 0 56.88888853-56.8888896v-216.17777707zM398.22222222 78.12740741v273.06666667h227.5555552V78.12740741z m-45.51111147 318.57777814H79.64444409v227.5555552h273.06666666z m591.6444448 0H671.28888889v227.5555552h273.06666666z m-591.6444448-45.51111147V78.12740741H136.53333369a56.95288853 56.95288853 0 0 0-56.8888896 56.88888854v216.17777813z m0 318.57777813H79.64444409v216.17777707a56.95288853 56.95288853 0 0 0 56.8888896 56.8888896h216.17777706z m318.57777814-318.57777813h273.06666666V135.01629595a56.95288853 56.95288853 0 0 0-56.88888853-56.88888854H671.28888889z" p-id="4336"></path></svg>
                    <svg t="1711895113397" class="icon" :class="{'active': type === 2}" @click="type = 2" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4542" width="18" height="18"><path d="M206.92357428 322.6003941H39.07034557a35.44726567 35.44726567 0 0 1-35.44726569-35.44726569V119.29989969a35.44726567 35.44726567 0 0 1 35.44726569-35.44726571h167.85322871a35.44726567 35.44726567 0 0 1 35.44726571 35.44726571v167.85322872a35.44726567 35.44726567 0 0 1-35.44726571 35.44726569zM985.02580846 322.6003941H348.08709707a35.51677012 35.51677012 0 0 1-35.51677013-35.44726569V119.29989969a35.44726567 35.44726567 0 0 1 35.51677013-35.44726571h636.93871139a35.44726567 35.44726567 0 0 1 35.44726568 35.44726571v167.85322872a35.44726567 35.44726567 0 0 1-35.44726568 35.44726569zM985.02580846 631.40863228H348.08709707a35.51677012 35.51677012 0 0 1-35.51677013-35.51677014V428.10813786a35.51677012 35.51677012 0 0 1 35.51677013-35.51677014h636.93871139a35.44726567 35.44726567 0 0 1 35.44726568 35.51677014v167.78372428a35.44726567 35.44726567 0 0 1-35.44726568 35.51677014zM985.02580846 940.42538378H348.08709707a35.51677012 35.51677012 0 0 1-35.51677013-35.51677014v-167.78372426a35.44726567 35.44726567 0 0 1 35.51677013-35.44726571h636.93871139a35.44726567 35.44726567 0 0 1 35.44726568 35.44726571v167.78372426a35.44726567 35.44726567 0 0 1-35.44726568 35.51677014zM206.92357428 631.40863228H39.07034557a35.44726567 35.44726567 0 0 1-35.44726569-35.51677014V428.10813786a35.44726567 35.44726567 0 0 1 35.44726569-35.51677014h167.85322871a35.44726567 35.44726567 0 0 1 35.44726571 35.51677014v167.78372428a35.44726567 35.44726567 0 0 1-35.44726571 35.51677014zM206.92357428 940.14736602H39.07034557a35.44726567 35.44726567 0 0 1-35.44726569-35.44726571v-167.85322872a35.44726567 35.44726567 0 0 1 35.44726569-35.44726569h167.85322871a35.44726567 35.44726567 0 0 1 35.44726571 35.44726569v167.85322872a35.44726567 35.44726567 0 0 1-35.44726571 35.44726571z" p-id="4543"></path></svg>
                </div>
            </div>
        </h3>
        <div class="section">
            <div class="content">
                <ul class="cube-list clearfix" :style="type === 1 ? '' : 'display: none;'">
                    <li class="small-item" v-for="(item, index) in videoList" :key="index">
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
                    </li>
                </ul>
                <ul class="list-list" :style="type === 2 ? '' : 'display: none;'">
                    <li class="list-item clearfix" v-for="(item, index) in videoList" :key="index">
                        <a :href="`/video/${item.video.vid}`" target="_blank" class="cover">
                            <img v-if="item.video.coverUrl" :src="item.video.coverUrl" alt="">
                            <span v-if="item.video.duration" class="length">{{ handleDuration(item.video.duration) }}</span>
                        </a>
                        <div class="c">
                            <div class="title-row">
                                <a :href="`/video/${item.video.vid}`" target="_blank" class="title" :title="item.video.title">{{ item.video.title }}</a>
                            </div>
                            <div class="desc" :title="item.video.descr">{{ item.video.descr }}</div>
                            <div class="meta clearfix">
                                <span class="play" title="播放数" v-if="item.stats">
                                    <svg t="1711216187515" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4408" id="mx_n_1711216187515" width="14" height="14"><path d="M800 128H224C134.4 128 64 198.4 64 288v448c0 89.6 70.4 160 160 160h576c89.6 0 160-70.4 160-160V288c0-89.6-70.4-160-160-160z m96 608c0 54.4-41.6 96-96 96H224c-54.4 0-96-41.6-96-96V288c0-54.4 41.6-96 96-96h576c54.4 0 96 41.6 96 96v448z" p-id="4409"></path><path d="M684.8 483.2l-256-112c-22.4-9.6-44.8 6.4-44.8 28.8v224c0 22.4 22.4 38.4 44.8 28.8l256-112c25.6-9.6 25.6-48 0-57.6z" p-id="4410"></path></svg>
                                    <span class="num">{{ handleNum(item.stats.play) }}</span>
                                </span>
                                <span class="danmu" title="弹幕数" v-if="item.stats">
                                    <svg t="1711906685043" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4335" width="14" height="14"><path d="M800 128H224C134.4 128 64 198.4 64 288v448c0 89.6 70.4 160 160 160h576c89.6 0 160-70.4 160-160V288c0-89.6-70.4-160-160-160z m96 608c0 54.4-41.6 96-96 96H224c-54.4 0-96-41.6-96-96V288c0-54.4 41.6-96 96-96h576c54.4 0 96 41.6 96 96v448z" p-id="4336"></path><path d="M240 384h64v64h-64zM368 384h384v64h-384zM432 576h352v64h-352zM304 576h64v64h-64z" p-id="4337"></path></svg>
                                    <span class="num">{{ handleNum(item.stats.danmu) }}</span>
                                </span>
                                <span class="time" title="投稿时间" v-if="item.stats">{{ handleDate(item.video.uploadDate) }}</span>
                            </div>
                        </div>
                    </li>
                </ul>
                <div class="be-pager flex_center">
                    <el-pagination
                        background
                        layout="prev, pager, next"
                        :total="videoCount"
                        :page-size="30"
                        :pager-count="7"
                        :current-page="page"
                        @current-change="pageChange"
                    ></el-pagination>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { handleTime, handleNum, handleDate } from '@/utils/utils.js';

export default {
    name: "SpaceVideo",
    data() {
        return {
            rule: 1,    // 视频列表排序方式
            videoList: [],  // 用户投稿视频列表
            videoCount: 0,  // 用户视频投稿数量
            page: 1,    // 当前页码
            type: 1,    // 展示方式
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
                    page: this.page,
                    quantity: 30
                }
            });
            if (!res.data) return;
            this.videoCount = res.data.data.count;
            this.videoList = res.data.data.list;
            // console.log(this.videoList)
        },

        // 换页
        pageChange(page) {
            this.page = page;
            // 清空数据
            this.videoList = [];
            this.getVideoList();
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
    },
    watch: {
        "rule"() {
            this.page = 1;
            // 清空数据，保留骨架
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

.space-video * {
    box-sizing: initial;
}

.page-head {
    position: relative;
}

.t {
    display: inline-block;
    vertical-align: middle;
    font-size: 20px;
    line-height: 26px;
    height: 26px;
    color: #222;
}

.be-tab, .be-tab-item {
    position: relative;
    font-family: PingFang SC, Helvetica Neue, Microsoft YaHei, sans-serif;
}

.be-tab {
    display: inline-block;
    line-height: 18px;
    vertical-align: middle;
    margin-left: 20px;
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

.be-tab-item {
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

.page-head__right {
    position: absolute;
    top: 6px;

    right: 0;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-align: center;
    align-items: center;
}

.page-head__right .item {
    display: flex;
}

.page-head__right .icon {
    fill: var(--text2);
    margin-left: 15px;
    cursor: pointer;
}

.page-head__right .icon:hover {
    fill: #FF7DA1;
}

.page-head__right .icon.active {
    fill: #FF7DA1;
}

.section {
    position: relative;
}

.content {
    margin-left: -10px;
}

.cube-list {
    display: block;
    width: 900px;
    margin-top: 10px;
}

.clearfix:after, .clearfix:before {
    content: " ";
    display: table;
}

.clearfix:after {
    content: ".";
    display: block;
    height: 0;
    clear: both;
    visibility: hidden;
    font-size: 0;
}

.small-item {
    display: block;
    float: left;
    width: 160px;
    position: relative;
    margin: 0 0 3px;
    padding: 10px;
    font-family: PingFang SC, Helvetica Neue, Microsoft YaHei, sans-serif;
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

.list-item {
    border-bottom: 1px solid #eee;
    display: block;
    padding: 20px 0;
    position: relative;
    line-height: 1;
    margin: 0 10px;
}

.list-item .cover {
    background: url('~assets/img/bilibili/video-placeholder.png') 50%;
    background-size: cover;
    border-radius: 4px;
    width: 160px;
    height: 100px;
    display: block;
    float: left;
    overflow: hidden;
    position: relative;
}

.list-item .cover .length {
    position: absolute;
    background: rgba(0, 0, 0, .5);
    color: #fff;
    line-height: 20px;
    padding: 0 6px;
    z-index: 5;
    transition: background .2s ease;
    right: 4px;
    bottom: 6px;
    border-radius: 2px;
}

.list-item .c {
    margin-left: 180px;
    margin-right: 10px;
    font-family: PingFang SC, Helvetica Neue, Microsoft YaHei, sans-serif;
}

.list-item .title {
    font-size: 18px;
    height: 20px;
    margin-bottom: 10px;
    display: inline-block;
    max-width: 680px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.list-item .desc {
    color: #777;
    line-height: 20px;
    overflow: hidden;
    height: 40px;
    margin-bottom: 17px;
    font-size: 12px;
}

.list-item .meta {
    height: 18px;
    line-height: 18px;
    fill: #aaa;
    color: #aaa;
}

.list-item .meta {
    display: -ms-flexbox;
    display: flex;
    -ms-flex-align: center;
    align-items: center;
}

.list-item .meta>span {
    display: inline-block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 100px;
    line-height: 18px;
}

.list-item .meta .danmu, .list-item .meta .play, .list-item .meta .time {
    display: -ms-inline-flexbox;
    display: inline-flex;
    -ms-flex-align: center;
    align-items: center;
    font-size: 12px;
}

.list-item .meta .num {
    margin-left: 3px;
}

.be-pager {
    margin: 15px 0;
}

@media (min-width: 1420px) {
    .cube-list {
        width: 1070px;
    }

    .small-item {
        width: 190px;
    }

    .small-item .cover, .list-item .cover {
        width: 190px;
        height: 119px;
    }

    .list-item .c {
        margin-left: 210px;
    }

    .title-row .title {
        max-width: 800px;
    }

    .list-item .desc {
        height: 60px;
    }
}

</style>