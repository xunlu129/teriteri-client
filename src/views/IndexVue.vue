<template>
    <div class="index">
        <div class="large-header">
            <HeaderBarIndex :isFixHeaderBar="isFixHeaderBar"></HeaderBarIndex>
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
        <div class="header-channel-fix">

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
                            <!-- 主体 -->
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
    import HeaderBarIndex from '@/components/headerBar/HeaderBarIndex.vue';
    import HeaderChannel from '@/components/headerChannel/HeaderChannel.vue';
    import CarouselIndex from '@/components/carousel/CarouselIndex.vue';

    export default {
        name: "IndexVue",
        components: {
            HeaderBarIndex,
            HeaderChannel,
            CarouselIndex,
        },
        data() {
            return {
                // 是否是固钉导航栏
                isFixHeaderBar: false,
            }
        },
        methods: {
        },
        mounted() {
            // 窗口滚动时根据高度判断是否显示固钉导航栏
            const obj = document;
            this.el = obj.documentElement;
            obj.onscroll = () => {
                if (this.el.scrollTop >= 64 && this.isFixHeaderBar == false) {
                    // console.log(this.el.scrollTop);
                    this.isFixHeaderBar = true;
                } else if (this.el.scrollTop < 64 && this.isFixHeaderBar) {
                    // console.log(this.el.scrollTop);
                    this.isFixHeaderBar = false;
                }
            }
        },
        beforeUnmount() {
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