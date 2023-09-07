<template>
    <div class="index">
        <div class="large-header">
            <HeaderBar :isFixHeaderBar="isFixHeaderBar"></HeaderBar>
            <div class="header__banner">
                <picture class="v-img banner-img">
                    <img src="~assets/img/banner.png" alt="">
                </picture>
                <div class="header-banner__inner">
                    <div class="logo-box">
                        <img src="~assets/img/teriteri-white.png" alt="">
                    </div>
                </div>
            </div>
            <HeaderChannel></HeaderChannel>
        </div>
        <!-- 固钉频道栏 -->
        <div class="header-channel-fixed" :style="isFixChannel ? '' : 'display: none;'">
            <div
                class="header-channel-fixed-container"
                :class="isChannelDown ? 'header-channel-fixed-down' : ''"
                @mouseenter="isChannelDown = true;"
                @mouseleave="isChannelDown = false;"
            >
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
                            <div class="header-channel-fixed-right-item" v-for="(item, index) in channels" :key="index">
                                {{ item.mcName }}
                            </div>
                            <div class="header-channel-fixed-right-item">VLOG</div>
                            <div class="header-channel-fixed-right-item">搞笑</div>
                            <div class="header-channel-fixed-right-item">单机游戏</div>
                            <div class="header-channel-fixed-right-item">公益</div>
                            <div class="header-channel-fixed-right-item">公开课</div>
                        </div>
                    </div>
                    <div class="header-channel-fixed-right-right">
                        <div class="header-channel-fixed-right-item">专栏</div>
                        <div class="header-channel-fixed-right-item">直播</div>
                        <div class="header-channel-fixed-right-item">活动</div>
                        <div class="header-channel-fixed-right-item">课堂</div>
                        <div class="header-channel-fixed-right-item" style="letter-spacing: 0px;">社区中心</div>
                        <div class="header-channel-fixed-right-item" style="letter-spacing: 0px;">新歌热榜</div>
                    </div>
                    <div class="left-bottom">
                        <div class="header-channel-fixed-right-item" v-for="(item, index) in channels" :key="index">
                            {{ item.mcName }}
                        </div>
                        <div class="header-channel-fixed-right-item">VLOG</div>
                        <div class="header-channel-fixed-right-item">搞笑</div>
                        <div class="header-channel-fixed-right-item">单机游戏</div>
                        <div class="header-channel-fixed-right-item">公益</div>
                        <div class="header-channel-fixed-right-item">公开课</div>
                    </div>
                </div>
                <div class="header-channel-fixed-arrow">
                    <div
                        class="iconfont icon-xiajiantou"
                        :style="isChannelDown ? 'transform: rotate(180deg);' : ''"
                    ></div>
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
                            <!-- 垫片 -->
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
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import HeaderBar from '@/components/headerBar/HeaderBar.vue';
    import HeaderChannel from '@/components/headerChannel/HeaderChannel.vue';
    import CarouselIndex from '@/components/carousel/CarouselIndex.vue';

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
            }
        },
        computed: {
            // 频道列表
            channels() {
                return this.$store.state.channels;
            }
        },
        methods: {
        },
        mounted() {
            // 窗口滚动时根据高度判断是否显示固钉导航栏和固钉频道栏
            const obj = document;
            this.el = obj.documentElement;
            // 根据主体顶部的偏移量计算 hearder 的高度
            let headerHight = document.querySelector(".main__layout").offsetTop;
            obj.onscroll = () => {
                // 导航栏
                if (this.el.scrollTop >= 64 && this.isFixHeaderBar == false) {
                    this.isFixHeaderBar = true;
                } else if (this.el.scrollTop < 64 && this.isFixHeaderBar) {
                    this.isFixHeaderBar = false;
                }
                // 频道栏
                if (this.el.scrollTop >= headerHight && this.isFixChannel == false) {
                    this.isFixChannel = true;
                } else if (this.el.scrollTop < headerHight && this.isFixChannel) {
                    this.isFixChannel = false;
                }
            }
        },
    }
</script>

<style scoped>
@media (min-width: 1367px) and (max-width: 1700.9px) {
    .header-banner__inner {
        padding: 0 64px;
    }
}

.index {
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
    box-shadow: 0 2px 4px rgba(0,0,0,.08);
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
    padding: 14px var(--layout-padding, 60px);
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

.left-fixed-channel:hover, .left-fixed-channel:hover .iconfont{
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
    grid-template-rows: repeat(2,1fr);
    position: relative;
    grid-auto-flow: column;
}

.header-channel-fixed-right-right {
    display: inline-grid;
    grid-template-columns: repeat(3,1fr);
    grid-auto-flow: column;
    grid-template-rows: var(--item_height) var(--item_height);
    grid-column: span 3;
}

.header-channel-fixed-right .left-bottom {
    display: inline-grid;
    grid-template-rows: repeat(1,1fr);
    position: relative;
}

.header-channel-fixed-right .left-bottom, .header-channel-fixed-right-right, .header-channel-fixed-right-left .left-top, .header-channel-fixed-right {
    grid-gap: 14px 10px;
}

@media (max-width: 1366.9px) {
    .header-channel-fix {
        --left_width: 128px;
        --left_width_item: 64px;
    }
    .header-channel-fixed-right {
        grid-column: span 12;
        grid-template-columns: repeat(12,1fr);
    }
    .header-channel-fixed-right-left {
        grid-column: span 9;
        grid-template-columns: repeat(9,1fr);
    }
    .header-channel-fixed-right .left-bottom {
        grid-column: span 12;
        grid-template-columns: repeat(12,1fr);
    }
    .header-channel-fixed-right-left .left-top {
        grid-column: span 9;
        grid-template-columns: repeat(9,1fr);
    }
    .header-channel-fixed-right .left-bottom, .header-channel-fixed-right-right, .header-channel-fixed-right-left .left-top, .header-channel-fixed-right {
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
        grid-template-columns: repeat(14,1fr);
    }
    .header-channel-fixed-right-left {
        grid-column: span 11;
        grid-template-columns: repeat(11,1fr);
    }
    .header-channel-fixed-right .left-bottom {
        grid-column: span 14;
        grid-template-columns: repeat(14,1fr);
    }
    .header-channel-fixed-right-left .left-top {
        grid-column: span 11;
        grid-template-columns: repeat(11,1fr);
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
        grid-template-columns: repeat(15,1fr);
    }
    .header-channel-fixed-right-left {
        grid-column: span 12;
        grid-template-columns: repeat(12,1fr);
    }
    .header-channel-fixed-right .left-bottom {
        grid-column: span 15;
        grid-template-columns: repeat(15,1fr);
    }
    .header-channel-fixed-right-left .left-top {
        grid-column: span 12;
        grid-template-columns: repeat(12,1fr);
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
        grid-template-columns: repeat(17,1fr);
    }
    .header-channel-fixed-right-left {
        grid-column: span 14;
        grid-template-columns: repeat(14,1fr);
    }
    .header-channel-fixed-right .left-bottom {
        display: none;
    }
    .header-channel-fixed-right-left .left-top {
        grid-column: span 14;
        grid-template-columns: repeat(14,1fr);
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
    height: 5000px;
    background-color: #fff;
    position: relative;
    margin: 0 auto;
    padding: 0 var(--layout-padding);
    max-width: calc(1980px + 2 * var(--layout-padding));
    width: 100%;
}

@media (max-width: 1139.9px) {
    .main__layout {
        width: 1020px;
    }
}

@media (min-width: 1300px) and (max-width: 1399.9px) {
    .main__layout {
        width: 1180px;
    }
}

.recommended-container {
    position: relative;
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
        grid-template-columns: repeat(4,1fr);
    }
}

@media (min-width: 1400px) {
    .container {
        grid-column: span 5;
        grid-template-columns: repeat(5,1fr);
    }
}

.recommended-swipe {
    position: relative;
    grid-column: 1/3;   /* 跨越从第1列到第3列，占据两个网格列的宽度，等价于 grid-column: span 2; */
    grid-row: 1/3;   /* 跨越从第1行到第3行，占据两个网格行的高度 */
}

.recommended-swipe-core {
    position: relative;
    width: 100%;
}

.recommended-swipe-shim {
    opacity: 0;
    visibility: hidden;
    user-select: none;
    pointer-events: none;
    grid-column: span 2;
    grid-row: span 2;
    grid-template-columns: repeat(2,1fr);
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
    transform: translateZ(0);   /* 没有视觉效果的平移，它可以触发 GPU 加速，以提高性能和动画平滑度 */
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
</style>