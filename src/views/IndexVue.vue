<template>
    <div class="index">
        <div class="large-header">
            <HeaderBar :isFixHeaderBar="isFixHeaderBar"></HeaderBar>
            <!-- <div class="header__banner">
                <picture class="v-img banner-img">
                    <img src="~assets/img/bilibili/banner.png" alt="">
                </picture>
                <div class="header-banner__inner">
                    <div class="logo-box">
                        <img src="~assets/img/teriteri-white.png" alt="">
                    </div>
                </div>
            </div> -->
            <header>
                <!-- 动画效果头图，文件资源版权归bilibili官方所有，本项目仅用作学习，无商业用途！ -->
                <div class="view">
                    <img src="~assets/img/bilibili/bilibili-winter-view-1.jpg" class="morning" alt="">
                    <img src="~assets/img/bilibili/bilibili-winter-view-2.jpg" class="afternoon" alt="">
                    <video autoplay loop muted class="evening">
                        <source src="~assets/img/bilibili/bilibili-winter-view-3.webm" type="video/webm" />
                    </video>
                    <img src="~assets/img/bilibili/bilibili-winter-view-3-snow.png" class="window-cover" alt="">
                </div>
                <div class="tree">
                    <img src="~assets/img/bilibili/bilibili-winter-tree-1.png" class="morning" alt="">
                    <img src="~assets/img/bilibili/bilibili-winter-tree-2.png" class="afternoon" alt="">
                    <img src="~assets/img/bilibili/bilibili-winter-tree-3.png" class="evening" alt="">
                </div>
                <div class="header-banner__inner">
                    <div class="logo-box">
                        <img src="~assets/img/teriteri-white.png" alt="">
                    </div>
                </div>
                <div class="taper-line"></div>
            </header>
            <HeaderChannel></HeaderChannel>
        </div>
        <!-- 固钉频道栏 -->
        <div class="header-channel-fixed" :style="isFixChannel ? '' : 'display: none;'">
            <div class="header-channel-fixed-container" :class="isChannelDown ? 'header-channel-fixed-down' : ''"
                @mouseenter="isChannelDown = true;" @mouseleave="isChannelDown = false;">
                <div class="header-channel-fixed-left">
                    <div class="left-fixed-channel">
                        <i class="iconfont icon-fengche"></i>
                        <span>动态</span>
                    </div>
                    <div class="left-fixed-channel">
                        <i class="iconfont icon-huo"></i>
                        <span>热门</span>
                    </div>
                </div>
                <div class="header-channel-fixed-center"></div>
                <div class="header-channel-fixed-right">
                    <div class="header-channel-fixed-right-left">
                        <div class="left-top">
                            <a :href="`/v/anime`" target="_blank" class="header-channel-fixed-right-item">番剧</a>
                            <a :href="`/movie`" target="_blank" class="header-channel-fixed-right-item">电影</a>
                            <a :href="`/v/guochuang`" target="_blank" class="header-channel-fixed-right-item">国创</a>
                            <a :href="`/tv`" target="_blank" class="header-channel-fixed-right-item">电视剧</a>
                            <a :href="`/variety`" target="_blank" class="header-channel-fixed-right-item">综艺</a>
                            <a :href="`/documentary`" target="_blank" class="header-channel-fixed-right-item">纪录片</a>
                            <a :href="`/v/${item.mcId}`" target="_blank" class="header-channel-fixed-right-item"
                                v-for="(item, index) in channels.slice(2)" :key="index">
                                {{ item.mcName }}
                            </a>
                            <!-- 这里的url要在VLOG标签做出来后重新修改，目前先暂定到生活日常区 -->
                            <a :href="`/v/life/daily`" target="_blank" class="header-channel-fixed-right-item">VLOG</a>
                            <a :href="`/v/life/funny`" target="_blank" class="header-channel-fixed-right-item">搞笑</a>
                            <a :href="`/v/game/stand_alone`" target="_blank"
                                class="header-channel-fixed-right-item">单机游戏</a>
                            <a :href="`/love`" target="_blank" class="header-channel-fixed-right-item">公益</a>
                            <a :href="`/mooc`" target="_blank" class="header-channel-fixed-right-item">公开课</a>
                        </div>
                    </div>
                    <div class="header-channel-fixed-right-right">
                        <a :href="`/read/home`" target="_blank" class="header-channel-fixed-right-item">专栏</a>
                        <a :href="`/live`" target="_blank" class="header-channel-fixed-right-item">直播</a>
                        <a :href="`/activity`" target="_blank" class="header-channel-fixed-right-item">活动</a>
                        <a :href="`/cheese`" target="_blank" class="header-channel-fixed-right-item">课堂</a>
                        <a :href="`/community`" target="_blank" class="header-channel-fixed-right-item"
                            style="letter-spacing: 0px;">社区中心</a>
                        <a :href="`/song`" target="_blank" class="header-channel-fixed-right-item"
                            style="letter-spacing: 0px;">新歌热榜</a>
                    </div>
                    <div class="left-bottom">
                        <a :href="`/v/anime`" target="_blank" class="header-channel-fixed-right-item">番剧</a>
                        <a :href="`/movie`" target="_blank" class="header-channel-fixed-right-item">电影</a>
                        <a :href="`/v/guochuang`" target="_blank" class="header-channel-fixed-right-item">国创</a>
                        <a :href="`/tv`" target="_blank" class="header-channel-fixed-right-item">电视剧</a>
                        <a :href="`/variety`" target="_blank" class="header-channel-fixed-right-item">综艺</a>
                        <a :href="`/documentary`" target="_blank" class="header-channel-fixed-right-item">纪录片</a>
                        <a :href="`/v/${item.mcId}`" target="_blank" class="header-channel-fixed-right-item"
                            v-for="(item, index) in channels.slice(2)" :key="index">
                            {{ item.mcName }}
                        </a>
                        <a :href="`/v/life/daily`" target="_blank" class="header-channel-fixed-right-item">VLOG</a>
                        <a :href="`/v/life/funny`" target="_blank" class="header-channel-fixed-right-item">搞笑</a>
                        <a :href="`/v/game/stand_alone`" target="_blank" class="header-channel-fixed-right-item">单机游戏</a>
                        <a :href="`/love`" target="_blank" class="header-channel-fixed-right-item">公益</a>
                        <a :href="`/mooc`" target="_blank" class="header-channel-fixed-right-item">公开课</a>
                    </div>
                </div>
                <div class="header-channel-fixed-arrow">
                    <div class="iconfont icon-xiajiantou" :style="isChannelDown ? 'transform: rotate(180deg);' : ''"></div>
                </div>
            </div>
        </div>
        <!-- 主体布局 -->
        <div class="main__layout">
            <div class="recommended-container">
                <div class="container">
                    <!-- 轮播图 -->
                    <div class="recommended-swipe">
                        <div class="recommended-swipe-core">
                            <!-- 骨架屏 -->
                            <div class="recommended-swipe-shim">
                                <div class="video-card" v-for="index in 2" :key="index">
                                    <div class="video-card__skeleton">
                                        <div class="video-card__skeleton--cover"></div>
                                        <div class="video-card__skeleton--info">
                                            <div class="video-card__skeleton--right">
                                                <p class="video-card__skeleton--text"></p>
                                                <p class="video-card__skeleton--text short"></p>
                                                <p class="video-card__skeleton--light"></p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="shim-card"></div>
                                <div class="shim-card"></div>
                            </div>
                            <!-- 轮播图主体 -->
                            <div class="recommended-swipe-body">
                                <div class="carousel-area">
                                    <CarouselIndex></CarouselIndex>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- 随机推荐 -->
                    <div class="feed-card" v-for="index in loadingRandom ? 11 : randomVideos.length" :key="index">
                        <div class="video-card">
                            <!-- 骨架屏 -->
                            <div class="video-card__skeleton" :class="loadingRandom ? 'loading_animation' : 'hide'">
                                <div class="video-card__skeleton--cover"></div>
                                <div class="video-card__skeleton--info">
                                    <div class="video-card__skeleton--right">
                                        <p class="video-card__skeleton--text"></p>
                                        <p class="video-card__skeleton--text short"></p>
                                        <p class="video-card__skeleton--light"></p>
                                    </div>
                                </div>
                            </div>
                            <!-- 实体内容 -->
                            <div class="video-card__wrap" v-if="!loadingRandom">
                                <a :href="`/video/${randomVideos[index - 1].video.vid}`" target="_blank">
                                    <div class="video-card__image">
                                        <div class="video-card__image--wrap">
                                            <picture class="video-card__cover">
                                                <img :src="randomVideos[index - 1].video.coverUrl"
                                                    :alt="randomVideos[index - 1].video.title">
                                            </picture>
                                        </div>
                                        <div class="video-card__mask">
                                            <div class="video-card__stats">
                                                <div class="video-card__stats--left">
                                                    <span class="video-card__stats--item">
                                                        <i class="iconfont icon-bofangshu"></i>
                                                        <span class="video-card__stats--text">
                                                            {{ handleNum(randomVideos[index - 1].stats.play) }}
                                                        </span>
                                                    </span>
                                                    <span class="video-card__stats--item">
                                                        <i class="iconfont icon-danmushu"></i>
                                                        <span class="video-card__stats--text">
                                                            {{ handleNum(randomVideos[index - 1].stats.danmu) }}
                                                        </span>
                                                    </span>
                                                </div>
                                                <div class="video-card__stats__duration">
                                                    {{ handleDuration(randomVideos[index - 1].video.duration) }}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </a>
                                <div class="video-card__info">
                                    <div class="video-card__info--right">
                                        <h3 class="video-card__info--tit">
                                            <a :href="`/video/${randomVideos[index - 1].video.vid}`" target="_blank">
                                                {{ randomVideos[index - 1].video.title }}
                                            </a>
                                        </h3>
                                        <div class="video-card__info--bottom">
                                            <div class="video-card__info--icon-text" :style="'display: none;'">已关注</div>
                                            <a class="video-card__info--owner"
                                                :href="`/space/${randomVideos[index - 1].user.uid}`" target="_blank">
                                                <i class="iconfont icon-uper" :style="''"></i>
                                                <span class="video-card__info--author">{{ randomVideos[index -
                                                    1].user.nickname }}</span>
                                                <span class="video-card__info--date">
                                                    · {{ handleDate(randomVideos[index - 1].video.uploadDate) }}
                                                </span>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- 累加推荐 -->
                    <div class="video-card" v-for="(item, index) in cumulativeVideos" :key="index">
                        <!-- 骨架屏 -->
                        <div class="video-card__skeleton hide">
                            <div class="video-card__skeleton--cover"></div>
                            <div class="video-card__skeleton--info">
                                <div class="video-card__skeleton--right">
                                    <p class="video-card__skeleton--text"></p>
                                    <p class="video-card__skeleton--text short"></p>
                                    <p class="video-card__skeleton--light"></p>
                                </div>
                            </div>
                        </div>
                        <!-- 实体内容 -->
                        <div class="video-card__wrap">
                            <a :href="`/video/${item.video.vid}`" target="_blank">
                                <div class="video-card__image">
                                    <div class="video-card__image--wrap">
                                        <picture class="video-card__cover">
                                            <img :src="item.video.coverUrl" :alt="item.video.title">
                                        </picture>
                                    </div>
                                    <div class="video-card__mask">
                                        <div class="video-card__stats">
                                            <div class="video-card__stats--left">
                                                <span class="video-card__stats--item">
                                                    <i class="iconfont icon-bofangshu"></i>
                                                    <span class="video-card__stats--text">
                                                        {{ handleNum(item.stats.play) }}
                                                    </span>
                                                </span>
                                                <span class="video-card__stats--item">
                                                    <i class="iconfont icon-danmushu"></i>
                                                    <span class="video-card__stats--text">
                                                        {{ handleNum(item.stats.danmu) }}
                                                    </span>
                                                </span>
                                            </div>
                                            <div class="video-card__stats__duration">
                                                {{ handleDuration(item.video.duration) }}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </a>
                            <div class="video-card__info">
                                <div class="video-card__info--right">
                                    <h3 class="video-card__info--tit">
                                        <a :href="`/video/${item.video.vid}`" target="_blank" :title="item.video.title">
                                            {{ item.video.title }}
                                        </a>
                                    </h3>
                                    <div class="video-card__info--bottom">
                                        <div class="video-card__info--icon-text" :style="'display: none;'">已关注</div>
                                        <a class="video-card__info--owner" :href="`/space/${item.user.uid}`"
                                            target="_blank">
                                            <i class="iconfont icon-uper" :style="''"></i>
                                            <span class="video-card__info--author">{{ item.user.nickname }}</span>
                                            <span class="video-card__info--date">
                                                · {{ handleDate(item.video.uploadDate) }}
                                            </span>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- 骨架屏 -->
                    <div class="video-card" v-for="index in 10" :key="index" :style="hasMore ? '' : 'display: none;'">
                        <div class="video-card__skeleton loading_animation">
                            <div class="video-card__skeleton--cover"></div>
                            <div class="video-card__skeleton--info">
                                <div class="video-card__skeleton--right">
                                    <p class="video-card__skeleton--text"></p>
                                    <p class="video-card__skeleton--text short"></p>
                                    <p class="video-card__skeleton--light"></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="feed-roll-btn">
                    <div class="roll-btn" @click="getRandomVideos(); refreshTime++;">
                        <i class="iconfont icon-shuaxin" :style="`transform: rotate(${refreshTime * 360}deg);`"></i>
                        <span>换一换</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import HeaderBar from '@/components/headerBar/HeaderBar.vue';
import HeaderChannel from '@/components/headerChannel/HeaderChannel.vue';
import CarouselIndex from '@/components/carousel/CarouselIndex.vue';
import { handleTime, handleNum, handleDate } from '@/utils/utils.js';

let headerHight, bottomDistance;

export default {
    name: "IndexVue",
    components: {
        HeaderBar,
        HeaderChannel,
        CarouselIndex,
    },
    data() {
        return {
            // 是否是固钉导航栏
            isFixHeaderBar: false,
            // 是否是固钉频道栏
            isFixChannel: false,
            // 是否显示更多频道
            isChannelDown: false,
            // 随机推荐视频列表
            randomVideos: [],
            // 累加视频列表
            cumulativeVideos: [],
            // 累加视频id列表
            vids: [],
            // 是否正在加载随机推荐
            loadingRandom: true,
            // 是否还有更多累加视频
            hasMore: true,
            // 是否正在加载更多视频中
            loadingMore: false,
            // 刷新次数
            refreshTime: 0,
        }
    },
    computed: {
        // 频道列表
        channels() {
            return this.$store.state.channels;
        }
    },
    methods: {
        // 请求
        // 获取游客随机推荐
        async getRandomVideos() {
            this.loadingRandom = true;
            const res = await this.$get("/video/random/visitor");
            if (res.data.data) {
                this.randomVideos = res.data.data;
                this.loadingRandom = false;
            }
            // console.log(this.randomVideos);
        },

        // 获取游客累加推荐
        async getCumulativeVideos() {
            this.loadingMore = true;
            let ids = this.vids.join(",");  // 用逗号连接成一个字符串
            const res = await this.$get("/video/cumulative/visitor", {
                params: { vids: ids }
            });
            if (res.data.data) {
                this.cumulativeVideos.push(...res.data.data.videos);
                this.vids.push(...res.data.data.vids);
                this.hasMore = res.data.data.more;
            }
            // console.log(this.cumulativeVideos);
            this.loadingMore = false;
        },


        // 事件
        // 初始化头图效果
        initHeader() {
            let startingPoint;
            const header = document.querySelector('header');
            let isMoving = false;

            this.handleMouseMove = (e) => {
                const headerRect = header.getBoundingClientRect(); // 动态获取header的位置
                if (
                    e.clientX >= headerRect.left && e.clientX <= headerRect.right &&
                    e.clientY >= headerRect.top && e.clientY <= headerRect.bottom
                ) {
                    // 当鼠标进入头图范围就开始动态效果
                    if (!isMoving) {
                        startingPoint = e.clientX;
                        header.classList.add('moving');
                        isMoving = true;
                    }
                    let percentage = (e.clientX - startingPoint) / window.outerWidth + 0.5;
                    header.style.setProperty('--percentage', percentage);
                } else {
                    // 鼠标移出头图范围，效果复原
                    if (isMoving) {
                        header.classList.remove('moving');
                        header.style.setProperty('--percentage', 0.5);
                        isMoving = false;
                    }
                }
            }

            this.handleMouseOut = (e) => {
                if (e.relatedTarget === null) {
                    // 鼠标离开窗口时，头图回到原位
                    header.classList.remove('moving');
                    header.style.setProperty('--percentage', 0.5);
                    isMoving = false;
                }
            }

            // 监听窗口鼠标移动事件，触发头图转变效果
            document.addEventListener('mousemove', this.handleMouseMove);
            // 检测鼠标是否离开窗口
            document.addEventListener('mouseout', this.handleMouseOut);
        },


        async handleScroll() {
            // 计算页面底部距离
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight;
            bottomDistance = documentHeight - (window.scrollY + windowHeight);

            // 导航栏
            if (this.el.scrollTop >= 64 && !this.isFixHeaderBar) {
                this.isFixHeaderBar = true;
            } else if (this.el.scrollTop < 64 && this.isFixHeaderBar) {
                this.isFixHeaderBar = false;
            }

            // 频道栏
            if (this.el.scrollTop >= headerHight && !this.isFixChannel) {
                this.isFixChannel = true;
            } else if (this.el.scrollTop < headerHight && this.isFixChannel) {
                this.isFixChannel = false;
            }

            // 当距离底部小于800且有更多数据时触发加载数据的函数
            if (bottomDistance < 800 && this.hasMore && !this.loadingMore) {
                await this.getCumulativeVideos();
            }
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
    created() {
        this.getRandomVideos();
    },
    async mounted() {
        // 初始化头图的监听器
        this.initHeader();
        // 窗口滚动时根据高度判断是否显示固钉导航栏和固钉频道栏
        this.el = document.documentElement;
        // 根据主体顶部的偏移量计算 header 的高度
        headerHight = document.querySelector(".main__layout").offsetTop;
        window.addEventListener('scroll', this.handleScroll);
        // 初次挂载时执行一次，防止大屏情况下，视频数量不足以撑出滚动条
        await this.handleScroll();
        while (bottomDistance < 800 && this.hasMore) {
            await this.handleScroll();
        }
    },
    beforeUnmount() {
        document.removeEventListener('mousemove', this.handleMouseMove);
        document.removeEventListener('mouseout', this.handleMouseOut);
        window.removeEventListener('scroll', this.handleScroll);
    }
}
</script>

<style scoped>
@media (min-width: 1367px) and (max-width: 1700.9px) {
    .header-banner__inner {
        padding: 0 64px;
    }
}

.index {
    position: relative;
    margin: 0 auto;
    max-width: 2560px;
    background-color: var(--bg1);
}

.large-header {
    background-color: #fff;
    min-height: 64px;
    position: relative;
    margin: 0 auto;
    max-width: 2560px;
    width: 100%;
    color: #000;
}

.header__banner {
    position: relative;
    z-index: 0;
    display: flex;
    -ms-flex-pack: center;
    justify-content: center;
    margin: 0 auto;
    min-width: 1000px;
    min-height: 155px;
    height: 9.375vw;
    max-height: 240px;
    background-color: #e3e5e7;
    background-position: center 0;
    background-size: cover;
    background-repeat: no-repeat;
}

.v-img {
    display: inline-block;
    line-height: 1;
    width: 100%;
    height: 100%;
    vertical-align: middle;
    background-color: var(--graph_bg_regular);
}

.v-img img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: inherit;
}

.banner-img {
    position: absolute;
    object-fit: cover;
}

.banner-img img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: inherit;
}

.header-banner__inner {
    position: relative;
    width: 100%;
    max-width: 2078px;
    margin: 0 auto;
    display: flex;
    align-items: flex-end;
}

@media (max-width: 1366.9px) {
    .header-banner__inner {
        padding: 0 56px;
    }
}

@media (min-width: 1367px) and (max-width: 1700.9px) {
    .header-banner__inner {
        padding: 0 64px;
    }
}

@media (min-width: 1701px) and (max-width: 2199.9px) {
    .header-banner__inner {
        padding: 0 96px;
        max-width: 2270px;
    }
}

@media (min-width: 2200px) {
    .header-banner__inner {
        max-width: 2078px;
    }
}

.logo-box {
    z-index: 1;
    display: inline-block;
    width: 150px;
    height: 50%;
}

.header-banner__inner img {
    cursor: pointer;
    position: relative;
    top: 5;
    right: 0;
    margin-bottom: 20px;
    margin-left: 15px;
    width: 150px;
    height: 50px;
    filter: drop-shadow(3px 5px 3px rgba(0, 0, 0, 0.5));
}

header {
    position: relative;
    z-index: 0;
    display: flex;
    -ms-flex-pack: center;
    justify-content: center;
    margin: 0 auto;
    min-width: 1000px;
    min-height: 155px;
    height: 9.375vw;
    max-height: 240px;
    background-color: #e3e5e7;
    background-position: center 0;
    background-size: cover;
    background-repeat: no-repeat;
    overflow: hidden;
    --percentage: 0.5;
}

header .view,
header .tree {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
}

header .view img,
header .view video,
header .tree img {
    position: absolute;
    display: block;
    width: 120%;
    height: 100%;
    object-fit: cover;
}

header .morning {
    z-index: 20;
    opacity: calc(1 - (var(--percentage) - 0.25) / 0.25);
}

header .afternoon {
    z-index: 10;
    opacity: calc(1 - (var(--percentage) - 0.5) / 0.5);
}

header .view {
    transform: translatex(calc(var(--percentage) * 100px));
}

header .tree {
    transform: translatex(calc(var(--percentage) * 50px));
    filter: blur(3px);
}

header .view,
header .tree,
header .morning,
header .afternoon {
    transition: .2s all ease-in;
}

header.moving .view,
header.moving .tree,
header.moving .morning,
header.moving .afternoon {
    transition: none;
}

header .window-cover {
    opacity: calc((var(--percentage) - 0.9) / 0.1);
}

.taper-line {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 0;
    width: 100%;
    height: 100px;
    background: linear-gradient(rgba(0, 0, 0, .4), transparent);
    pointer-events: none;
}

.header-channel-fixed {
    width: 100%;
    min-width: 1100px;
    max-width: 2560px;
    display: flex;
    justify-content: center;
    background: var(--bg1_float);
    z-index: 1001;
    position: fixed;
    top: 63px;
    letter-spacing: 2px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .08);
    animation: headerSlideDown .2s linear forwards;
}

@keyframes headerSlideDown {
    0% {
        opacity: 0;
    }

    100% {
        opacity: 1;
    }
}

.header-channel-fixed {
    --left_width: 140px;
    --left_width_item: 70px;
    --item_height: 28px;
}

.header-channel-fixed-container {
    max-height: 56px;
    overflow: hidden;
    transition: max-height .2s;
    display: flex;
    align-items: center;
    position: relative;
    width: 100%;
    padding: 14px var(--layout-padding, 60px) 14px var(--layout-padding, 30px);
}

.header-channel-fixed-down {
    max-height: 150px;
}

.header-channel-fixed-left {
    display: flex;
    min-width: var(--left_width);
    width: var(--left_width);
    flex-wrap: wrap;
    color: var(--text2);
    font-size: 14px;
    align-self: start;
}

.left-fixed-channel {
    cursor: pointer;
    display: flex;
    width: var(--left_width_item);
    height: 28px;
    margin-bottom: 14px;
    align-items: center;
}

.left-fixed-channel .iconfont {
    color: var(--text1);
    font-size: 21px;
    display: inline-block;
    position: relative;
    margin-right: 5px;
}

.left-fixed-channel:hover,
.left-fixed-channel:hover .iconfont {
    color: var(--brand_pink);
}

.header-channel-fixed-center {
    height: 14px;
    width: 1px;
    margin-right: 10px;
    background: var(--line_regular);
}

.header-channel-fixed-right {
    display: inline-grid;
    flex: 1;
    height: 100%;
    position: relative;
}

.header-channel-fixed-right-item {
    height: var(--item_height);
    line-height: var(--item_height);
    border: 1px solid var(--line_light);
    background: var(--graph_bg_thin);
    border-radius: 6px;
    text-align: center;
    cursor: pointer;
    color: var(--text2);
}

.header-channel-fixed-right-item:hover {
    background: var(--graph_bg_thick);
    transition: background 0.2s;
}

.left-top .header-channel-fixed-right-item:nth-of-type(23),
.left-top .header-channel-fixed-right-item:nth-of-type(24),
.left-top .header-channel-fixed-right-item:nth-of-type(26),
.left-bottom .header-channel-fixed-right-item:nth-of-type(23),
.left-bottom .header-channel-fixed-right-item:nth-of-type(24),
.left-bottom .header-channel-fixed-right-item:nth-of-type(26) {
    letter-spacing: 0px;
}

.header-channel-fixed-right-left {
    display: inline-grid;
    position: relative;
}

.header-channel-fixed-right-left .left-top {
    display: inline-grid;
    grid-template-rows: repeat(2, 1fr);
    position: relative;
    grid-auto-flow: column;
}

.header-channel-fixed-right-right {
    display: inline-grid;
    grid-template-columns: repeat(3, 1fr);
    grid-auto-flow: column;
    grid-template-rows: var(--item_height) var(--item_height);
    grid-column: span 3;
}

.header-channel-fixed-right .left-bottom {
    display: inline-grid;
    grid-template-rows: repeat(1, 1fr);
    position: relative;
}

.header-channel-fixed-right .left-bottom,
.header-channel-fixed-right-right,
.header-channel-fixed-right-left .left-top,
.header-channel-fixed-right {
    grid-gap: 14px 10px;
}

@media (max-width: 1366.9px) {
    .header-channel-fix {
        --left_width: 128px;
        --left_width_item: 64px;
    }

    .header-channel-fixed-right {
        grid-column: span 12;
        grid-template-columns: repeat(12, 1fr);
    }

    .header-channel-fixed-right-left {
        grid-column: span 9;
        grid-template-columns: repeat(9, 1fr);
    }

    .header-channel-fixed-right .left-bottom {
        grid-column: span 12;
        grid-template-columns: repeat(12, 1fr);
    }

    .header-channel-fixed-right-left .left-top {
        grid-column: span 9;
        grid-template-columns: repeat(9, 1fr);
    }

    .header-channel-fixed-right .left-bottom,
    .header-channel-fixed-right-right,
    .header-channel-fixed-right-left .left-top,
    .header-channel-fixed-right {
        font-size: 13px;
        grid-gap: 14px 8px;
    }

    .left-top .header-channel-fixed-right-item:nth-of-type(1n + 19) {
        display: none !important;
    }

    .left-bottom .header-channel-fixed-right-item:nth-of-type(-1n + 18) {
        display: none !important;
    }
}

@media (min-width: 1367px) and (max-width: 1700.9px) {
    .header-channel-fixed-right {
        grid-column: span 14;
        grid-template-columns: repeat(14, 1fr);
    }

    .header-channel-fixed-right-left {
        grid-column: span 11;
        grid-template-columns: repeat(11, 1fr);
    }

    .header-channel-fixed-right .left-bottom {
        grid-column: span 14;
        grid-template-columns: repeat(14, 1fr);
    }

    .header-channel-fixed-right-left .left-top {
        grid-column: span 11;
        grid-template-columns: repeat(11, 1fr);
    }

    .left-top .header-channel-fixed-right-item:nth-of-type(1n + 23) {
        display: none !important;
    }

    .left-bottom .header-channel-fixed-right-item:nth-of-type(-1n + 22) {
        display: none !important;
    }
}

@media (min-width: 1701px) and (max-width: 2199.9px) {
    .header-channel-fix {
        --left_width: 160px;
        --left_width_item: 80px;
    }

    .header-channel-fixed-right {
        grid-column: span 15;
        grid-template-columns: repeat(15, 1fr);
    }

    .header-channel-fixed-right-left {
        grid-column: span 12;
        grid-template-columns: repeat(12, 1fr);
    }

    .header-channel-fixed-right .left-bottom {
        grid-column: span 15;
        grid-template-columns: repeat(15, 1fr);
    }

    .header-channel-fixed-right-left .left-top {
        grid-column: span 12;
        grid-template-columns: repeat(12, 1fr);
    }

    .left-top .header-channel-fixed-right-item:nth-of-type(1n + 25) {
        display: none !important;
    }

    .left-bottom .header-channel-fixed-right-item:nth-of-type(-1n + 24) {
        display: none !important;
    }
}

@media (min-width: 2200px) {
    .header-channel-fix {
        --left_width: 160px;
        --left_width_item: 80px;
    }

    .header-channel-fixed-right {
        grid-column: span 17;
        grid-template-columns: repeat(17, 1fr);
    }

    .header-channel-fixed-right-left {
        grid-column: span 14;
        grid-template-columns: repeat(14, 1fr);
    }

    .header-channel-fixed-right .left-bottom {
        display: none;
    }

    .header-channel-fixed-right-left .left-top {
        grid-column: span 14;
        grid-template-columns: repeat(14, 1fr);
    }
}

.header-channel-fixed-arrow {
    position: absolute;
    right: calc(var(--layout-padding, 60px) - 40px);
    width: 28px;
    height: 28px;
    padding: 6px;
    margin-left: 10px;
    align-self: start;
    cursor: pointer;
    display: flex;
    align-items: center;
    border-radius: 4px;
    transition: .2s;
}

.header-channel-fixed-arrow:hover {
    background-color: var(--graph_bg_thick);
}

.icon-xiajiantou {
    font-weight: 600;
    width: 100%;
    height: 100%;
    transition: .2s;
}

.main__layout {
    background-color: #fff;
    margin: 0 auto;
    padding: 0 var(--layout-padding);
    max-width: calc(1980px + 2 * var(--layout-padding));
    width: 100%;
}

@media (max-width: 1139.9px) {
    .main__layout {
        width: 1020px;
    }

    .feed-roll-btn {
        left: initial !important;
        right: 10px;
        top: 255px !important;
        transform: initial !important;
    }
}

@media (min-width: 1140px) {
    .main__layout {
        position: relative;
    }

    .recommended-container {
        position: relative;
    }
}

.recommended-container {
    padding-bottom: 60px;
}

.container {
    grid-gap: 20px;
    display: grid;
    position: relative;
    width: 100%;
}

@media (max-width: 1399.9px) {
    .container {
        grid-column: span 4;
        grid-template-columns: repeat(4, 1fr);
    }

    .container>*:nth-of-type(n + 6) {
        margin-top: 40px;
    }

    .container .feed-card:nth-of-type(n + 10) {
        display: none;
    }
}

@media (min-width: 1400px) {
    .container {
        grid-column: span 5;
        grid-template-columns: repeat(5, 1fr);
    }

    .container>*:nth-of-type(n + 8) {
        margin-top: 40px;
    }
}

.recommended-swipe {
    position: relative;
    grid-column: 1/3;
    /* 跨越从第1列到第3列，占据两个网格列的宽度，等价于 grid-column: span 2; */
    grid-row: 1/3;
    /* 跨越从第1行到第3行，占据两个网格行的高度 */
}

.recommended-swipe-core {
    position: relative;
    width: 100%;
}

.recommended-swipe-shim {
    opacity: 0;
    visibility: hidden;
    user-select: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    pointer-events: none;
    grid-column: span 2;
    grid-row: span 2;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 20px;
    width: 100%;
    display: grid;
}

.shim-card {
    width: 100%;
    height: 0;
    padding-top: 56.25%;
}

.recommended-swipe-body {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    flex-direction: column;
    transform: translateZ(0);
    /* 没有视觉效果的平移，它可以触发 GPU 加速，以提高性能和动画平滑度 */
    border-radius: 6px;
    overflow: hidden;
    background-color: var(--graph_bg_regular);
}

.carousel-area {
    position: relative;
    width: 100%;
    height: 100%;
    flex-shrink: 0;
    z-index: 0;
}

.feed-roll-btn {
    position: absolute;
    left: 100%;
    top: 0;
    z-index: 2;
    transform: translate(10px);
}

.feed-roll-btn .roll-btn {
    flex-direction: column;
    margin-left: 0;
    height: auto;
    width: 40px;
    padding: 9px;
    background-color: #fff;
    color: var(--text1);
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    border-radius: 8px;
    font-size: 12px;
    border: 1px solid var(--line_regular);
    transform-origin: center;
    transition: .2s;
    cursor: pointer;
    line-height: 1.15;
}

.feed-roll-btn .roll-btn:hover {
    background-color: var(--graph_bg_thick);
}

.feed-roll-btn .roll-btn .iconfont {
    line-height: 16px;
    margin-bottom: 6px;
    transition: transform .5s ease;
}

@media (max-width: 1120px) {
    .feed-roll-btn {
        opacity: 0.8;
    }
}</style>