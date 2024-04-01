<template>
    <div class="space-favlist clearfix">
        <div class="fav-sidenav">
            <div class="nav-container">
                <div class="favlist-title" @click="isFavnavOpen = !isFavnavOpen">
                    <p>{{ this.$store.state.user.uid === uid ? '我' : 'TA' }}的创建</p>
                    <i class="iconfont icon-xiajiantou" :style="isFavnavOpen ? 'transform: rotate(180deg);' : ''"></i>
                </div>
                <div class="fav-list-container ps">
                    <div class="nav-title nav-add" v-if="this.$store.state.user.uid === uid">
                        <svg t="1711976556258" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4395" width="20" height="20"><path d="M512 62c247.5 0 450 202.5 450 450s-202.5 450-450 450-450-202.5-450-450 202.5-450 450-450z m28.125 421.875V287c0-16.875-11.25-28.125-28.125-28.125s-28.125 11.25-28.125 28.125v196.875H287c-16.875 0-28.125 11.25-28.125 28.125s11.25 28.125 28.125 28.125h196.875V737c0 16.875 11.25 28.125 28.125 28.125s28.125-11.25 28.125-28.125V540.125H737c16.875 0 28.125-11.25 28.125-28.125s-11.25-28.125-28.125-28.125H540.125z" p-id="4396"></path></svg>
                        <div class="text">新建收藏夹</div>
                    </div>
                    <ul class="fav-list">
                        <li class="fav-item" :class="{'cur': Number(fid) === item.fid, 'owner': this.$store.state.user.uid === uid}" v-for="(item, index) in favList" :key="index">
                            <svg t="1711977711975" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4395" width="20" height="20"><path d="M865.49525114 335.25237508H158.50474886V246.87856197h706.99050228v88.37381311z m-88.37381311-265.12143802H246.87856197v88.3738118h530.24287606V70.13093706z m176.74762491 441.86906294v353.49525114c0 48.6055974-39.7682157 88.3738131-88.3738118 88.3738118H158.50474886c-48.6055974 0-88.3738131-39.7682157-88.3738118-88.3738118v-353.49525114c0-48.6055974 39.7682157-88.3738131 88.3738118-88.3738131h706.99050228c48.6055974 0 88.3738131 39.7682157 88.3738118 88.3738131z m-265.12143802 176.74762492l-265.12143802-145.8167909v287.21489161l265.12143802-141.39810071z" p-id="4396"></path></svg>
                            <a class="text" @click="changeFav(item.fid)">{{ item.title }}</a>
                            <span class="num">{{ item.count }}</span>
                            <VPopover class="more" popStyle="position: fixed; padding-top: 10px; z-index: 1000; top: auto; left: auto; transform: translate3d(-75%,0,0);">
                                <template #reference>
                                    <div class="tool-more">
                                        <i class="iconfont icon-gengduo"></i>
                                    </div>
                                </template>
                                <template #content>
                                    <ul class="be-dropdown-menu">
                                        <li class="be-dropdown-item" :class="{'be-dropdown-item-delimiter': item.type !== 1}" @click="noPage">编辑信息</li>
                                        <li class="be-dropdown-item" v-if="item.type !== 1" @click="noPage">删除</li>
                                    </ul>
                                </template>
                            </VPopover>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="fav-main">
            <div class="favList-info">
                <div class="favInfo-box">
                    <a class="favInfo-cover">
                        <img v-if="currFav && currFav.cover" :src="currFav.cover" alt="">
                        <div class="cover-icon" v-if="currFav">
                            <svg t="1711977711975" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4395" width="16" height="16"><path d="M865.49525114 335.25237508H158.50474886V246.87856197h706.99050228v88.37381311z m-88.37381311-265.12143802H246.87856197v88.3738118h530.24287606V70.13093706z m176.74762491 441.86906294v353.49525114c0 48.6055974-39.7682157 88.3738131-88.3738118 88.3738118H158.50474886c-48.6055974 0-88.3738131-39.7682157-88.3738118-88.3738118v-353.49525114c0-48.6055974 39.7682157-88.3738131 88.3738118-88.3738131h706.99050228c48.6055974 0 88.3738131 39.7682157 88.3738118 88.3738131z m-265.12143802 176.74762492l-265.12143802-145.8167909v287.21489161l265.12143802-141.39810071z" p-id="4396"></path></svg>
                        </div>
                    </a>
                    <div class="favInfo-details">
                        <a class="fav-name" v-if="currFav">{{ currFav.title }}</a>
                        <div class="fav-meta" v-if="currFav">
                            <span class="fav-desc" :title="currFav.description">{{ currFav.description }}</span>
                        </div>
                        <div class="fav-meta" v-if="currFav">
                            <span>{{ currFav.count }}个内容</span>
                            <span class="dot">·</span>
                            <span>{{ currFav.visible === 1 ? '公开' : '私密' }}</span>
                        </div>
                        <div class="fav-options">
                            <div class="play-all" @click="noPage">
                                <svg t="1711992851151" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4395" width="16" height="16"><path d="M847.52000001 429.80266667L344.50133334 101.152c-78.176-45.184-142.21866667-8.18133333-142.21866667 82.13333333v657.22666667c0 90.368 64.04266667 127.30666667 142.21866667 82.19733333L847.52000001 594.13333333c78.25066667-45.25866667 78.25066667-119.14666667 0-164.33066666z m0 0" fill="#FFFFFF" p-id="4396"></path></svg>
                                <span>播放全部</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="fav-header">
                <div class="fav-info">
                    <div class="be-tab">
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
                </div>
            </div>
            <div class="fav-content" v-if="currFav && currFav.count > 0">
                <ul class="fav-video-list clearfix">
                    <li class="small-item" v-for="(item, index) in favVideos" :key="index">
                        <a :href="`/video/${item.video.vid}`" target="_blank" class="cover" v-if="item.video.status === 1">
                            <img v-if="item.video.coverUrl" :src="item.video.coverUrl" alt="">
                            <span v-if="item.video.duration" class="length">{{ handleDuration(item.video.duration) }}</span>
                            <div class="meta-mask">
                                <div class="meta-info">
                                    <p class="view">播放：{{ handleNum(item.stats.play) }}</p>
                                    <p class="favorite">收藏：{{ handleNum(item.stats.collect) }}</p>
                                    <p class="author">UP主：{{ item.user.nickname }}</p>
                                    <p class="pubdate">投稿：{{ handleDate(item.video.uploadDate) }}</p>
                                </div>
                            </div>
                        </a>
                        <div class="disable-cover" v-else>
                            <p>视频已失效</p>
                            <div class="delete-from">{{ item.video.status === 3 ? '已被UP主删除' : '视频审核中' }}</div>
                        </div>
                        <a :href="`/video/${item.video.vid}`" target="_blank" class="title" :title="item.video.title" v-if="item.video.status === 1">{{ item.video.title }}</a>
                        <p class="title" v-else>已失效视频</p>
                        <div class="meta pubdate">收藏于：{{ handleDate(item.info.time) }}</div>
                        <VPopover class="video-edit" popStyle="position: fixed; padding-top: 10px; z-index: 1000; top: auto; left: auto; transform: translate3d(-75%,0,0);">
                            <template #reference>
                                <div class="tool-more">
                                    <i class="iconfont icon-gengduo"></i>
                                </div>
                            </template>
                            <template #content>
                                <ul class="be-dropdown-menu" v-if="this.$store.state.user.uid === currFav.uid">
                                    <li class="be-dropdown-item" @click="cancelCollect(item.info)">取消收藏</li>
                                </ul>
                            </template>
                        </VPopover>
                    </li>
                </ul>
                <div class="be-pager flex_center">
                    <el-pagination
                        background
                        layout="prev, pager, next"
                        :total="currFav.count"
                        :page-size="20"
                        :pager-count="7"
                        :current-page="page"
                        @current-change="pageChange"
                    ></el-pagination>
                </div>
            </div>
            <div class="no-more" v-else>
                <img src="~assets/img/nothing.png" alt="">
            </div>
        </div>
    </div>
</template>

<script>
import VPopover from '@/components/popover/VPopover.vue';
import { handleTime, handleNum, handleDate } from '@/utils/utils.js';
import { ElMessage } from 'element-plus';

export default {
    name: "SpaceFavlist",
    components: {
        VPopover,
    },
    data() {
        return {
            isFavnavOpen: true,
            rule: 1,    // 排序规则 1 最近收藏 2 最多播放 3 最新投稿
            page: 1,    // 当前分页
            favVideos: [],  // 当前收藏夹的视频列表
        }
    },
    props: {
        // 从路由获取参数
        fid: String,
    },
    computed: {
        // 空间主人的uid
        uid() {
            return Number(this.$route.params.uid);
        },

        // 收藏夹列表
        favList() {
            return this.$store.state.userFavList;
        },

        // 当前收藏夹
        currFav() {
            const fav = this.favList.find(item => item.fid === Number(this.fid));
            if (!fav || (fav.uid !== this.$store.state.user.uid && fav.visible === 0)) {
                return null;
            } else {
                return fav;
            }
        }
    },
    methods: {
        // 获取收藏夹视频
        async getFavVideos() {
            this.favVideos = [];
            if (!this.currFav) return;
            const res = await this.$get("/video/user-collect", {
                params: {
                    fid: this.currFav.fid,
                    rule: this.rule,
                    page: this.page,
                    quantity: 20
                }
            });
            if (!res.data) return;
            this.favVideos = res.data.data;
            // console.log(this.favVideos);
        },

        // 取消收藏
        async cancelCollect(info) {
            const formData = new FormData();
            formData.append("vid", info.vid);
            formData.append("fid", info.fid);
            const res = await this.$post("/video/cancel-collect", formData, {
                headers: { Authorization: "Bearer " + localStorage.getItem("teri_token") }
            });
            if (!res.data || res.data.code !== 200) return;
            this.favVideos = this.favVideos.filter(item => item.video.vid !== info.vid);
        },

        changeFav(fid) {
            this.$router.push(`/space/${this.uid}/favlist?fid=${fid}`);
        },

        // 换页
        pageChange(page) {
            this.page = page;
            this.getFavVideos();
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

        noPage() {
            ElMessage.warning("该功能暂未开放")
        }
    },
    mounted() {
        if (!this.fid) {
            const fav = this.favList.find(item => item.type === 1);
            this.$router.push(`/space/${this.uid}/favlist?fid=${fav.fid}`);
        } else {
            this.getFavVideos();
        }
    },
    watch: {
        "fid"() {
            this.page = 1;
            this.getFavVideos();
        },
        "rule"() {
            this.page = 1;
            this.getFavVideos();
        }
    }
}
</script>

<style scoped>
ol, ul {
    list-style: none;
}

.space-favlist * {
    box-sizing: initial;
}

.space-favlist {
    background: #fff;
    box-shadow: 0 0 0 1px #eee;
    border-radius: 4px;
    font-family: PingFang SC, Helvetica Neue, Microsoft YaHei, sans-serif;
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

.fav-sidenav {
    position: relative;
    float: left;
    width: 180px;
    margin-right: -1px;
    font-size: 14px;
    color: #222;
    box-sizing: border-box;
    border-right: 1px solid #fff
}

.nav-container {
    border-bottom: 1px solid #eee;
}

.favlist-title {
    padding-right: 11px;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-pack: justify;
    justify-content: space-between;
    -ms-flex-align: center;
    align-items: center;
    cursor: pointer;
    height: 54px;
    padding-left: 19px;
    line-height: 54px;
    font-size: 14px;
    color: #99a2aa;
}

.ps {
    overflow: hidden !important;
    overflow-anchor: none;
    -ms-overflow-style: none;
    touch-action: auto;
    -ms-touch-action: auto;
}

.fav-list-container {
    position: relative;
    max-height: 420px;
    margin-bottom: 10px;
    overflow: hidden;
}

.nav-title {
    position: relative;
    height: 44px;
    padding-left: 20px;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-align: center;
    align-items: center;
    cursor: pointer;
}

.nav-add .icon {
    fill: #cbd0d8;
    margin-right: 10px;
}

.nav-add .icon:hover {
    fill: #97a2ab;
}

.fav-sidenav .text {
    display: inline-block;
    line-height: 44px;
    width: 86px;
    margin-right: 5px;
    font-size: 14px;
    vertical-align: middle;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    cursor: pointer;
}

.nav-title .text {
    display: block;
    line-height: 24px;
    color: #222;
}

.fav-item {
    position: relative;
    padding-left: 20px;
    transition: background-color .3s ease;
    white-space: nowrap;
    font-size: 0;
    overflow: hidden;
    display: flex;
    align-items: center;
}

.fav-item:hover {
    background-color: #f4f5f7;
}

.fav-item.cur {
    background-color: #FF7DA1;
}

.fav-item.cur .icon-gengduo, .fav-item.cur svg, .fav-item.cur .num, .fav-item.cur .text {
    color: #fff;
    fill: #fff;
}

.fav-item .icon {
    fill: #999;
    margin-right: 10px;
}

.fav-sidenav .num {
    display: inline-block;
    width: 32px;
    font-size: 12px;
    color: #99a2aa;
    vertical-align: middle;
    text-align: center;
    font-family: Arial;
}

.owner:hover .num {
    display: none;
}

.fav-item .more {
    display: none;
}

.owner:hover .more {
    display: inline-block;
    margin-left: 8px;
}

.tool-more {
    cursor: pointer;
}

.icon-gengduo {
    color: #999;
}

.be-dropdown-menu {
    padding: 6px 0;
}

.be-dropdown-item {
    height: 40px;
    padding: 0 20px;
    line-height: 40px;
    text-align: center;
    font-size: 14px;
    color: #222;
    box-sizing: border-box;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    transition: background-color .2s ease;
    cursor: pointer;
}

.be-dropdown-item:hover {
    color: var(--Pi4);
    background-color: #f0f0f0;
}

.be-dropdown-item.be-dropdown-item-delimiter {
    border-bottom: 1px solid #e5e9ef;
}

.fav-main {
    float: left;
    width: 920px;
    min-height: 600px;
    border-left: 1px solid #eee;
    position: relative;
    display: flex;
    flex-direction: column;
}

.favList-info {
    padding: 20px 0;
    margin: 0 20px;
    box-sizing: border-box;
    border-bottom: 1px solid #e5e9ef;
}

.favInfo-box {
    height: 119px;
    display: -ms-flexbox;
    display: flex;
}

.favInfo-cover {
    background: url('~assets/img/bilibili/video-placeholder.png') 50%;
    background-size: cover;
    width: 190px;
    height: 119px;
    overflow: hidden;
    position: relative;
    border-radius: 4px;
    display: block;
    cursor: pointer;
}

.favInfo-cover img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    image-rendering: crisp-edges;
}

.cover-icon {
    position: absolute;
    right: 5px;
    bottom: 5px;
    border-radius: 2px;
    background-color: rgba(0, 0, 0, 0.5);
    fill: #fff;
    height: 20px;
    width: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.favInfo-details {
    margin-left: 18px;
}

.fav-name {
    display: block;
    font-family: PingFangSC-Medium;
    font-size: 14px;
    color: #212121;
    line-height: 17px;
    margin-bottom: 14px;
    width: 368px;
    height: 17px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.fav-meta {
    display: block;
    color: #99a2aa;
    font-size: 0;
    letter-spacing: 0;
    line-height: 16px;
    margin-bottom: 6px;
}

.fav-meta span {
    display: inline-block;
    font-size: 12px;
    vertical-align: middle;
}

.fav-desc {
    width: 368px;
    height: 16px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.fav-meta .dot {
    margin: 0 8px;
}

.fav-options {
    display: -ms-flexbox;
    display: flex;
    -ms-flex-align: center;
    align-items: center;
    margin-top: 16px;
}

.play-all {
    height: 32px;
    width: 120px;
    line-height: 32px;
    display: inline-flex;
    align-items: center;
    font-size: 14px;
    color: #fff;
    background-color: #FF7DA1;
    border-radius: 4px;
    transition: all .2s;
    cursor: pointer;
}

.play-all:hover {
    background-color: var(--Pi4);
}

.play-all svg {
    margin-left: 16px;
    margin-right: 6px;
}

.fav-header {
    margin: 20px 20px 0;
}

.fav-info {
    height: 30px;
    margin-top: 15px;
}

.be-tab {
    display: inline-block;
    line-height: 18px;
    vertical-align: middle;
    margin-left: 20px;
    position: relative;
}

.be-tab-item {
    float: left;
    font-size: 14px;
    margin-right: 20px;
    line-height: 27px;
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

.fav-content {
    position: relative;
    font-size: 12px;
}

.fav-video-list {
    margin: 20px 20px 50px;
}

.small-item {
    display: block;
    float: left;
    width: 160px;
    position: relative;
    padding: 0;
    margin: 0 20px 20px 0;
    border-radius: 4px;
    border: 1px solid #fff;
    box-sizing: border-box;
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
    border-radius: 5px 0 0 0;
    color: #fff;
    line-height: 20px;
    transition: opacity .2s ease;
    padding: 0 6px;
    position: absolute;
    right: 0;
    bottom: 0;
    opacity: 1;
}

.cover:hover .length {
    opacity: 0;
}

.meta-mask {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 4;
    width: 100%;
    height: 100%;
    opacity: 0;
    background-color: rgba(0, 0, 0, .45);
    color: #e5e9ef;
    transition: opacity .2s ease;
}

.cover:hover .meta-mask {
    opacity: 1;
}

.meta-info {
    position: absolute;
    top: 50%;
    left: 15px;
    transform: translateY(-50%);
}

.meta-info p {
    line-height: 1.7em;
}

.meta-info .author, .meta-info .ep_title {
    width: 125px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.disable-cover {
    border-radius: 4px;
    display: block;
    width: 160px;
    height: 100px;
    overflow: hidden;
    position: relative;
    background-color: #e5e9ef;
    color: #99a2aa;
}

.disable-cover p {
    position: absolute;
    top: 50%;
    width: 100%;
    height: 20px;
    line-height: 20px;
    margin-top: -10px;
    text-align: center;
    font-size: 16px;
}

.delete-from {
    background: rgba(0, 0, 0, .5);
    border-radius: 5px 0 0 0;
    line-height: 20px;
    transition: top .2s ease;
    padding: 0 6px;
    position: absolute;
    right: 0;
    bottom: 0;
    font-family: HYQiHei-EZS;
    font-size: 12px;
    color: #fff;
}

.delete-from:before {
    content: "";
    display: inline-block;
    width: 10px;
    height: 10px;
    background: url('~assets/img/video-delete.svg') no-repeat;
    margin-right: 3px;
    position: relative;
    top: 1px;
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
}

.meta.pubdate {
    font-size: 12px;
    overflow: hidden;
    text-overflow: ellipsis;
}

.video-edit {
    position: absolute !important;
    bottom: 0px;
    right: -5px;
    width: 16px;
}

.video-edit .icon-gengduo {
    font-size: 14px;
}

.be-pager {
    margin: 15px 0;
}

.no-more {
    position: relative;
    width: 100%;
    height: calc(100% - 210px);
    flex: 1;
}

.no-more img {
    width: 20%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

@media (min-width: 1420px) {
    .fav-sidenav {
        width: 210px;
    }

    .fav-main {
        width: 1070px;
    }

    .fav-sidenav .text {
        width: 111px;
        margin-right: 10px;
    }

    .small-item {
        width: 190px;
    }

    .small-item .cover, .disable-cover {
        width: 190px;
        height: 119px;
    }
}

</style>