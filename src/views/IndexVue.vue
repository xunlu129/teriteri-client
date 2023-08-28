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
            <div class="header__channel">

            </div>
        </div>
        <div class="main__recommend">

        </div>
    </div>
</template>

<script>
    import HeaderBarIndex from '@/components/headerBar/HeaderBarIndex.vue';

    export default {
        name: "IndexVue",
        components: {
            HeaderBarIndex,
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

/* .index {
    overflow-x: hidden;
    overflow-y: scroll;
    width: 100%;
    height: 100vh;
} */

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

.banner-img {
    position: absolute;
    object-fit: cover;
}

.banner-img img {
    height: 100%;
}

.header-banner__inner {
    position: relative;
    width: 100%;
    max-width: 2078px;
    margin: 0 auto;
}

.logo-box {
    width: 160px;
    height: 85%;
    display: flex;
    align-items: flex-end;
}

.logo-box img {
    width: 100%;
    cursor: pointer;
}

.header__channel {
    height: 110px;
    background-color: rgb(152, 225, 185);
}

.main__recommend {
    height: 5000px;
    background-color: rgb(224, 222, 126);
    position: relative;
    margin: 0 auto;
    max-width: 2560px;
    width: 100%;
}
</style>