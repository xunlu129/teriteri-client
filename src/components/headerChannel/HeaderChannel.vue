<template>
    <div class="header-channel">
        <!-- 左边 -->
        <div class="channel-icons">
            <div class="channel-icons__item">
                <div class="icon-bg icon-bg__dynamic">
                    <picture class="v-img icon-bg--up" v-if="dynamicPic">
                        <img src="https://cdn.acwing.com/media/user/profile/photo/240972_md_e16c066264.jpg" alt="">
                    </picture>
                    <i class="iconfont icon-fengche" v-else></i>
                </div>
                <span class="icon-title">动态</span>
            </div>
            <div class="channel-icons__item">
                <div class="icon-bg icon-bg__popular">
                    <i class="iconfont icon-huo"></i>
                </div>
                <span class="icon-title">热门</span>
            </div>
        </div>
        <!-- 右边 -->
        <div class="right-channel-container">
            <!-- 中间频道 -->
            <div class="channel-items__left" v-if="channels.length != 0">
                <!-- 番剧 -->
                <VPopover class="channel-link" placement="top" popStyle="z-index: 2000; cursor: default;">
                    <template #reference>
                        <div @click="openNewPage(`/v/${channels[0].mcId}`)">
                            <span>{{ channels[0].mcName }}</span>
                        </div>
                    </template>
                    <template #content>
                        <div class="channel-children-container">
                            <div
                                class="sub-item"
                                v-for="subIndex in Math.ceil(channels[0].scList.length / 4)" :key="subIndex"
                            >
                                <div @click="openNewPage(`/v/${child.mcId}/${child.scId}`)"
                                    class="channel-children"
                                    v-for="(child, chIndex) in channels[0].scList.slice((subIndex - 1) * 4, subIndex * 4)"
                                    :key="chIndex"
                                >
                                    {{ child.scName }}
                                </div>
                            </div>
                        </div>
                    </template>
                </VPopover>
                <div class="channel-link" @click="openNewPage(`/movie`)">
                    <span>电影</span>
                </div>
                <!-- 国创 -->
                <VPopover class="channel-link" placement="top" popStyle="z-index: 2000; cursor: default;">
                    <template #reference>
                        <div @click="openNewPage(`/v/${channels[1].mcId}`)">
                            <span>{{ channels[1].mcName }}</span>
                        </div>
                    </template>
                    <template #content>
                        <div class="channel-children-container">
                            <div
                                class="sub-item"
                                v-for="subIndex in Math.ceil(channels[1].scList.length / 4)" :key="subIndex"
                            >
                                <div @click="openNewPage(`/v/${child.mcId}/${child.scId}`)"
                                    class="channel-children"
                                    v-for="(child, chIndex) in channels[1].scList.slice((subIndex - 1) * 4, subIndex * 4)"
                                    :key="chIndex"
                                >
                                    {{ child.scName }}
                                </div>
                            </div>
                        </div>
                    </template>
                </VPopover>
                <div class="channel-link" @click="openNewPage(`/tv`)">
                    <span>电视剧</span>
                </div>
                <div class="channel-link" @click="openNewPage(`/variety`)">
                    <span>综艺</span>
                </div>
                <div class="channel-link" @click="openNewPage(`/documentary`)">
                    <span>记录片</span>
                </div>
                <!-- 将剩下的遍历出来 -->
                <VPopover class="channel-link"
                    v-for="(item, index) in channels.slice(2)"
                    :key="index"
                    :placement="index % 2 == 0 ? 'top' : 'bottom'"
                    popStyle="z-index: 2000; cursor: default;"
                >
                    <template #reference>
                        <div @click="openNewPage(`/v/${item.mcId}`)">
                            <span>{{ item.mcName }}</span>
                        </div>
                    </template>
                    <template #content>
                        <div class="channel-children-container">
                            <div
                                class="sub-item"
                                v-for="subIndex in Math.ceil(item.scList.length / 4)" :key="subIndex"
                            >
                                <div @click="openNewPage(`/v/${child.mcId}/${child.scId}`)"
                                    class="channel-children"
                                    v-for="(child, chIndex) in item.scList.slice((subIndex - 1) * 4, subIndex * 4)"
                                    :key="chIndex"
                                >
                                    {{ child.scName }}
                                </div>
                            </div>
                        </div>
                    </template>
                </VPopover>
                <div class="channel-link" @click="openNewPage(`/v/life/daily`)">
                    <span>VLOG</span>
                </div>
                <div class="channel-link" @click="openNewPage(`/v/life/funny`)">
                    <span>搞笑</span>
                </div>
                <div class="channel-link" @click="openNewPage(`/v/game/stand_alone`)">
                    <span>单机游戏</span>
                </div>
                <div class="channel-link" @click="openNewPage(`/love`)">
                    <span>公益</span>
                </div>
                <div class="channel-link" @click="openNewPage(`/mooc`)">
                    <span>公开课</span>
                </div>
                <VPopover
                    placement="bottom"
                    popStyle="z-index: 2000;"
                    @mouseenter="isOpen = true;"
                    @mouseleave="isOpen = false;"
                >
                    <template #reference>
                        <div id="channel-entry-more" class="channel-entry-more__link">
                            <span style="margin-left: -8px;">更多</span>
                            <i class="iconfont icon-xiajiantou" :class="isOpen ? 'arrow-down' : ''"></i>
                        </div>
                    </template>
                    <template #content>
                        <div class="more-channel-popover__wrap">
                            <div class="more-channel"></div>
                            <div class="more-channel"></div>
                            <div class="more-channel"></div>
                            <div class="more-channel"></div>
                            <div class="more-channel"></div>
                            <div class="more-channel"></div>
                            <!-- 前面的是占位符，反正也展示不出来的 -->
                            <div class="more-channel" v-for="(item, index) in channels.slice(2)" :key="index" @click="openNewPage(`/v/${item.mcId}`)">
                                {{ item.mcName }}
                            </div>
                            <div class="more-channel" @click="openNewPage(`/v/life/daily`)">
                                <span>VLOG</span>
                            </div>
                            <div class="more-channel" @click="openNewPage(`/v/life/funny`)">
                                <span>搞笑</span>
                            </div>
                            <div class="more-channel" @click="openNewPage(`/v/game/stand_alone`)">
                                <span>单机游戏</span>
                            </div>
                            <div class="more-channel" @click="openNewPage(`/love`)">
                                <span>公益</span>
                            </div>
                            <div class="more-channel" @click="openNewPage(`/mooc`)">
                                <span>公开课</span>
                            </div>
                        </div>
                    </template>
                </VPopover>
            </div>
            <!-- 右边 -->
            <div class="channel-items__right">
                <div class="channel-link__right" @click="openNewPage(`/read/home`)">
                    <i class="iconfont icon-zhuanlan"></i>
                    <span>专栏</span>
                </div>
                <div class="channel-link__right" @click="openNewPage(`/live`)">
                    <i class="iconfont icon-zhibo"></i>
                    <span>直播</span>
                </div>
                <div class="channel-link__right" @click="openNewPage(`/activity`)">
                    <i class="iconfont icon-huodong"></i>
                    <span>活动</span>
                </div>
                <div class="channel-link__right" @click="openNewPage(`/cheese`)">
                    <i class="iconfont icon-ketang"></i>
                    <span>课堂</span>
                </div>
                <div class="channel-link__right" @click="openNewPage(`/community`)">
                    <i class="iconfont icon-gonggao"></i>
                    <span>社区中心</span>
                </div>
                <div class="channel-link__right" @click="openNewPage(`/song`)">
                    <i class="iconfont icon-xinge"></i>
                    <span>新歌热榜</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import VPopover from '../popover/VPopover.vue';

    export default {
        name: "HeaderChannel",
        components: {
            VPopover,
        },
        data() {
            return {
                // 是否有新动态以显示其头像，后面可改成获取动态详情
                dynamicPic: false,
                // 是否展开显示更多频道
                isOpen: false,
            }
        },
        computed: {
            // 频道列表
            channels() {
                return this.$store.state.channels;
            }
        },
        methods: {
            // 打开新标签页
            openNewPage(route) {
                window.open(this.$router.resolve(route).href, '_blank');
            }
        }
    }
</script>

<style scoped>
.header-channel {
    position: relative;
    width: 100%;
    max-width: calc(1980px + 2 * var(--layout-padding));
    margin: 0 auto;
    padding: 0 var(--layout-padding);
    display: flex;
    align-items: center;
    background: var(--bg1);
}

@media (max-width: 1139.9px) {
    .header-channel {
        width: 1020px;
    }
}

@media (max-width: 1366.9px) {
    .header-channel {
        height: 100px;
    }
}

@media (min-width: 1367px) and (max-width: 1700.9px) {
    .header-channel {
        height: 110px;
    }
}

@media (min-width: 1701px) and (max-width: 2199.9px) {
    .header-channel {
        height: 120px;
    }
}

@media (min-width: 2200px) {
    .header-channel {
        height: 130px;
    }
}

.channel-icons {
    z-index: 0;
    display: flex;
    align-items: center;
}

@media (max-width: 1366.9px) {
    .channel-icons {
        margin-right: 4px;
    }
}

@media (min-width: 1367px) and (max-width: 1700.9px) {
    .channel-icons {
        margin-right: 8px;
    }
}

@media (min-width: 1701px) {
    .channel-icons {
        margin-right: 20px;
    }
}

.channel-icons__item {
    position: relative;
    display: flex;
    flex-direction: column;
    margin-right: 16px;
    color: var(--text1);
    cursor: pointer;
}

@media (max-width: 1099.9px) {
    .channel-icons__item {
        margin-right: 10px;
    }
}

@media (min-width: 1100px) and (max-width: 1366.9px) {
    .channel-icons__item {
        margin-right: 16px;
    }
}

@media (min-width: 1367px) and (max-width: 2199.9px) {
    .channel-icons__item {
        margin-right: 24px;
    }
}

@media (min-width: 2200px) {
    .channel-icons__item {
        margin-right: 32px;
    }
}

.icon-bg {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 6px;
    border-radius: 50%;
    transition: background-color .3s;
    color: #fff;
}

@media (min-width: 1367px) {
    .icon-bg {
        width: 46px;
        height: 46px;
    }
}

@media (max-width: 1366.9px) {
    .icon-bg {
        width: 40px;
        height: 40px;
    }
}

.icon-bg__dynamic {
    background: #48cc69;
}

.icon-bg__dynamic:hover {
    background: #6eda89;
}

.v-img {
    position: relative;
    display: inline-block;
    line-height: 1;
    width: 100%;
    height: 100%;
    vertical-align: middle;
    background-color: var(--graph_bg_regular);
}

.icon-bg--up {
    overflow: hidden;
    border-radius: 50%;
}

.icon-bg--up>img {
    border-radius: 50%;
}

.v-img img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: inherit;
}

.icon-title {
    text-align: center;
    font-size: 13px;
    line-height: 18px;
}

@media (min-width: 1367px) and (max-width: 2199.9px) {
    .icon-title {
        font-size: 14px;
        line-height: 20px;
    }
}

@media (min-width: 2200px) {
    .icon-title {
        font-size: 15px;
        line-height: 20px;
    }
}

.icon-bg__popular {
    background: #f07775;
}

.icon-bg__popular:hover {
    background: #eb908f;
}

.icon-bg .iconfont {
    width: 25px;
    height: 25px;
    font-size: 24px;
    line-height: 25px;
    margin-left: 2px;
}

.right-channel-container {
    width: 100%;
    display: flex;
    justify-content: space-between;
}

.channel-items__left {
    position: relative;
    display: grid;     /* 网格布局 */
    width: 100%;
    grid-auto-flow: column;     
    grid-column: span 4;    /* 元素应该跨越4个网格列 */
    grid-gap: 10px;     /* 子元素之间的间隔 */
    grid-template-rows: repeat(2,1fr);      /* 有两行，每行的高度是 1fr，表示等分可用高度 */
    border-right: 1px solid var(--line_regular);
}

@media (max-width: 1366.9px) {
    .channel-items__left {
        padding-right: 20px;
        grid-template-columns: repeat(9,1fr);
    }
}

@media (min-width: 1367px) and (max-width: 1700.9px) {
    .channel-items__left {
        padding-right: 30px;
        grid-template-columns: repeat(11,1fr);
    }
}

@media (min-width: 1701px) and (max-width: 2199.9px) {
    .channel-items__left {
        padding-right: 30px;
        grid-template-columns: repeat(12,1fr);
    }
}

@media (min-width: 2200px) {
    .channel-items__left {
        padding-right: 30px;
        grid-template-columns: repeat(14,1fr);
    }
}

.channel-link:not(:nth-of-type(23)):not(:nth-of-type(24)):not(:nth-of-type(26)) {
    letter-spacing: 2px;
}

.channel-link {
    cursor: pointer;
}

.channel-link, .channel-entry-more__link {
    display: inline-block;
    box-sizing: content-box;
    width: 100%;
    height: 100%;
    border: 1px solid var(--line_light);
    border-radius: 6px;
    background-color: var(--graph_bg_thin);
    color: var(--text2);
    text-align: center;
    font-weight: 400;
    transition: background-color .3s, color .3s;
}

.channel-link:hover, .channel-entry-more__link:hover {
    color: var(--text1);
    background-color: var(--graph_bg_thick);
}

.channel-entry-more__link {
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: default;
    transition: color .3s,background-color .3s;
}

.icon-xiajiantou {
    position: absolute;
    transition: transform .3s;
    transform: rotate(0);
}

.arrow-down {
    transform: rotate(180deg) !important;
}

@media (max-width: 2199.9px) {
    #channel-entry-more {
        display: inline-block;
    }
}

@media (min-width: 2200px) {
    #channel-entry-more {
        display: none;
    }
}

@media (max-width: 1099.9px) {
    .channel-link, .channel-entry-more__link {
        font-size: 13px;
        height: 22px;
        line-height: 22px;
    }

    .channel-link:nth-of-type(1n + 18) {
        display: none !important;    /* 第18个元素及之后的隐藏 */
    }
}

@media (min-width: 1100px) and (max-width: 1366.9px) {
    .channel-link, .channel-entry-more__link {
        font-size: 13px;
        height: 26px;
        line-height: 26px;
    }

    .channel-link:nth-of-type(1n + 18) {
        display: none !important;    /* 第18个元素及之后的隐藏 */
    }
}

@media (min-width: 1367px) and (max-width: 1700.9px) {
    .channel-link, .channel-entry-more__link {
        font-size: 14px;
        height: 26px;
        line-height: 26px;
    }

    .channel-link:nth-of-type(1n + 22) {
        display: none !important;    /* 第22个元素及之后的隐藏 */
    }
}

@media (min-width: 1701px) and (max-width: 2199.9px) {
    .channel-link, .channel-entry-more__link {
        font-size: 14px;
        height: 30px;
        line-height: 30px;
    }

    .channel-link:nth-of-type(1n + 24) {
        display: none !important;    /* 第24个元素及之后的隐藏 */
    }
}

@media (min-width: 2200px) {
    .channel-link, .channel-entry-more__link {
        font-size: 15px;
        height: 30px;
        line-height: 30px;
    }
}

.channel-children-container {
    display: flex;
    padding: 8px 16px;
    justify-items: flex-start;
    letter-spacing: normal;
}

.sub-item {
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    margin-right: 8px;
    max-height: 148px;
}

.sub-item:last-child {
    margin-right: 0;
}

.channel-children, .more-channel {
    display: block;
    padding: 0 6px;
    height: 32px;
    border-radius: 4px;
    color: var(--text1);
    text-align: left;
    white-space: nowrap;
    font-size: 13px;
    line-height: 32px;
    cursor: pointer;
    transition: background-color .3s;
}

.channel-children:hover, .more-channel:hover {
    background-color: var(--graph_bg_thick);
}

.more-channel-popover__wrap {
    padding: 8px 16px;
}

@media (min-width: 1701px) and (max-width: 2199.9px) {
    .more-channel-popover__wrap {
        display: grid;
        grid-auto-flow: column;
        grid-template-rows: repeat(3,1fr);
    }
}

@media (max-width: 1700.9px) {
    .more-channel-popover__wrap {
        display: grid;
        grid-auto-flow: column;
        grid-template-rows: repeat(4,1fr);
    }
}

@media (max-width: 1366.9px) {
    .more-channel-popover__wrap>*:nth-of-type(-1n + 17) {
        display: none !important;   /* 前17个隐藏 */
    }
}

@media (min-width: 1367px) and (max-width: 1700.9px) {
    .more-channel-popover__wrap>*:nth-of-type(-1n + 21) {
        display: none !important;   /* 前21个隐藏 */
    }
}

@media (min-width: 1701px) and (max-width: 2199.9px) {
    .more-channel-popover__wrap>*:nth-of-type(-1n + 23) {
        display: none !important;   /* 前23个隐藏 */
    }
}

@media (min-width: 2200px) {
    .more-channel-popover__wrap>* {
        display: none !important;   /* 全部隐藏 */
    }
}

.channel-items__right {
    grid-column: span 1;
    grid-row-gap: 10px;
    grid-auto-flow: column;
    display: grid;
    grid-template-rows: repeat(2,1fr);
    flex-shrink: 0;
}

@media (max-width: 1099.9px) {
    .channel-items__right {
        width: 210px;
    }
}

@media (min-width: 1100px) and (max-width: 1366.9px) {
    .channel-items__right {
        width: 230px;
    }
}

@media (min-width: 1367px) and (max-width: 1700.9px) {
    .channel-items__right {
        width: 240px;
    }
}

@media (min-width: 1701px) {
    .channel-items__right {
        width: 258px;
    }
}

.channel-link__right {
    letter-spacing: 2px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    width: 100%;
    height: 100%;
    color: var(--text2);
    text-align: center;
    font-weight: 400;
    transition: color .3s;
    cursor: pointer;
}

.channel-link__right:hover {
    color: var(--brand_pink);
}

@media (max-width: 1366.9px) {
    .channel-link__right {
        font-size: 13px;
        height: 28px;
    }
}

@media (min-width: 1367px) and (max-width: 1700.9px) {
    .channel-link__right {
        font-size: 14px;
        height: 28px;
    }
}

@media (min-width: 1701px) and (max-width: 2199.9px) {
    .channel-link__right {
        font-size: 14px;
        height: 32px;
    }
}

@media (min-width: 2200px) {
    .channel-link__right {
        font-size: 15px;
        height: 32px;
    }
}
</style>