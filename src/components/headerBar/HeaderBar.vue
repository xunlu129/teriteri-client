<template>
    <div class="header-bar" :class="isFixHeaderBar ? 'slide-down' : ''">
        <!-- 左边 -->
        <div class="left-entry">
            <div class="entry-title" v-if="isFixHeaderBar" @mouseenter="isOpen = true" @mouseleave="isOpen = false">
                <picture class="logo">
                    <img src="~assets/img/teriteri-pink.png" alt="">
                </picture>
                <span>首页</span>
                <i class="iconfont icon-xiajiantou" :class="isOpen ? 'arrow-down' : ''"></i>
            </div>
            <div class="entry-title" v-else>
                <i class="iconfont icon-dianshi"></i>
                <span>首页</span>
            </div>
            <div class="default-entry">
                <span>番剧</span>
            </div>
            <div class="default-entry">
                <span>漫画</span>
            </div>
            <div class="default-entry">
                <span>直播</span>
            </div>
            <div class="default-entry">
                <span>游戏中心</span>
            </div>
            <div class="default-entry">
                <span>会员购</span>
            </div>
            <div class="download-entry">
                <i class="iconfont icon-xiazai"></i>
                <span>下载客户端</span>
            </div>
        </div>
        <!-- 中间 -->
        <div class="center-search-container" :style="isShowSearchInput ? '' : 'display: none;'">
            <div class="center-search__bar" :class="isSearchPopShow ? 'is-focus' : ''">
                <!-- 输入框 -->
                <div
                    id="nav-searchform"
                    :class="isSearchPopShow ? 'nav-searchform-active' : ''"
                    ref="searchForm"
                >
                    <div class="nav-search-content">
                        <el-input
                            class="nav-search-input"
                            :class="isSearchPopShow ? 'nav-search-input-active' : ''"
                            v-model="searchInput"
                            placeholder="请输入搜索内容"
                            @focus="searchPopShow()"
                            @keyup.enter="goSearch"
                        ></el-input>
                    </div>
                    <div
                        class="nav-search-clean"
                        :style="searchInput == '' ? 'display: none;' : ''"
                        @click.stop="searchInput = ''"
                    >
                        <i class="iconfont icon-close"></i>
                    </div>
                    <div class="nav-search-btn" @click="goSearch">
                        <i class="iconfont icon-sousuo"></i>
                    </div>
                </div>
                <!-- 气泡框 -->
                <div class="search-panel" :style="isSearchPopShow ? '' : 'display: none;'" ref="searchPop">
                    <div class="history" v-if="searchInput == ''">
                        <div class="header">
                            <div class="title">搜索历史</div>
                            <div class="clear" @click.stop="removeAllHistories">清空</div>
                        </div>
                        <div class="histories-wrap" :style="isHistoryOpen ? 'max-height: 171px;' : 'max-height: 91px;'">
                            <div class="histories">
                                <div class="history-item" v-for="(item, index) in histories" :key="index">
                                    <div class="history-text" @click.stop="clickItemToSearch(item)">
                                        {{ item }}
                                    </div>
                                    <div class="close" @click.stop="removeHistory(index)">
                                        <i class="iconfont icon-close"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="history-fold" v-if="isHistoryOpen" @click.stop="isHistoryOpen = false;">
                            <div class="fold-text">收起</div>
                            <i class="iconfont icon-xiajiantou" style="transform: rotate(180deg); /* 旋转 180 度 */"></i>
                        </div>
                        <div class="history-fold" v-else @click.stop="isHistoryOpen = true;">
                            <div class="fold-text">展开更多</div>
                            <i class="iconfont icon-xiajiantou"></i>
                        </div>
                    </div>
                    <div class="trending" v-if="searchInput == ''">
                        <div class="header">
                            <div class="title">teriteri热搜</div>
                        </div>
                        <div class="trendings-double">
                            <div class="trendings-col" :style="isFixHeaderBar ? 'max-width: 206px;' : 'max-width: 244px;'">
                                <div
                                    class="trending-item"
                                    v-for="(item, index) in trendings1"
                                    :key="index"
                                >
                                    <div class="trending-wrap"  @click.stop="clickItemToSearch(item)">
                                        <div class="trendings-rank" :class="index < 2 ? 'topThree' : ''">{{ index * 2 + 1 }}</div>
                                        <div class="trendings-text">{{ item }}</div>
                                    </div>
                                </div>
                            </div>
                            <div class="trendings-col" :style="isFixHeaderBar ? 'max-width: 206px;' : 'max-width: 244px;'">
                                <div
                                    class="trending-item"
                                    v-for="(item, index) in trendings2"
                                    :key="index"
                                >
                                    <div class="trending-wrap"  @click.stop="clickItemToSearch(item)">
                                        <div class="trendings-rank" :class="index < 1 ? 'topThree' : ''">{{ index * 2 + 2 }}</div>
                                        <div class="trendings-text">{{ item }}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="suggestions" v-if="searchInput != ''">

                    </div>
                </div>
            </div>
        </div>
        <!-- 右边 -->
        <div class="right-entry">
            <div class="header-avatar-wrap" @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave">
                <div class="header-avatar-wrap--container mini-avatar--small">
                    <picture class="v-img">
                        <img src="https://cdn.acwing.com/media/user/profile/photo/240972_md_e16c066264.jpg" alt="" />
                    </picture>
                </div>
                <div class="v-popover to-bottom">
                    <div class="avatar-panel-popover" :class="isPopoverShow ? 'popShow' : 'popHide'" :style="{ display: popoverDisplay }">
                        
                    </div>
                </div>
            </div>
            <div class="vip-wrap">
                <div class="right-entry--outside">
                    <i class="iconfont icon-huiyuan1"></i>
                    <span>大会员</span>
                </div>
            </div>
            <div class="v-popover-wrap">
                <VPopover pop-style="padding-top: 17px;">
                    <template #reference>
                        <div class="right-entry--outside">
                            <i class="iconfont icon-xinfeng"></i>
                            <span>消息</span>
                        </div>
                    </template>
                    <template #content>
                        <div style="height: 228.1px; width: 143.6px;">
                            
                        </div>
                    </template>
                </VPopover>
            </div>
            <div class="v-popover-wrap">
                <VPopover pop-style="padding-top: 17px;">
                    <template #reference>
                        <div class="right-entry--outside">
                            <i class="iconfont icon-fengche"></i>
                            <span>动态</span>
                        </div>
                    </template>
                    <template #content>
                        <div style="height: 557.3px; width: 371.6px;">
                            
                        </div>
                    </template>
                </VPopover>
            </div>
            <div class="v-popover-wrap">
                <VPopover pop-style="padding-top: 17px; margin-left: -100px;">
                    <template #reference>
                        <div class="right-entry--outside">
                            <i class="iconfont icon-shoucang"></i>
                            <span>收藏</span>
                        </div>
                    </template>
                    <template #content>
                        <div style="height: 556.6px; width: 521.6px;">
                            
                        </div>
                    </template>
                </VPopover>
            </div>
            <div class="v-popover-wrap">
                <VPopover pop-style="padding-top: 17px; margin-left: -50px;">
                    <template #reference>
                        <div class="right-entry--outside">
                            <i class="iconfont icon-lishijilu"></i>
                            <span>历史</span>
                        </div>
                    </template>
                    <template #content>
                        <div style="height: 556.6px; width: 371.6px;">
                            
                        </div>
                    </template>
                </VPopover>
            </div>
            <div class="right-entry-item">
                <div class="right-entry--outside">
                    <i class="iconfont icon-dengpao"></i>
                    <span>创作中心</span>
                </div>
            </div>
            <div class="right-entry-item right-entry-item--upload">
                <div class="upload-buttom">
                    <i class="iconfont icon-shangchuan"></i>
                    <span>投稿</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    let inTimer;  // 节流计时器
    let outTimer;
    import VPopover from '../popover/VPopover.vue';

    export default {
        name: "HeaderBarIndex",
        components: {
            VPopover,
        },
        data() {
            return {
                // 首页是否展开频道
                isOpen: false,
                // 需要搜索的内容
                searchInput: "",
                // 是否显示搜索气泡框
                isSearchPopShow: false,
                // 搜索历史
                histories: [],
                // 是否展开搜索历史
                isHistoryOpen: false,
                // 热搜列表
                trendings1:["被救博士因业绩差被转卖过", "Uzi吼退曹军", "挂科退学10年后再上大学", "秀才参加非诚勿扰加长版", "因文化水平低被诈骗团伙转卖", ],
                trendings2:["日本队上演真人版灌篮高手", "88万人打出9.1分的电影", "张子豪演出摔下台", "29岁如何赚到千万存款", "2023香港小姐三甲诞生"],
                // 头像气泡框的显隐
                popoverDisplay: "none",
                isPopoverShow: false,
            }
        },
        props: {
            // 是否是固钉导航栏
            isFixHeaderBar: {
                type: Boolean,
                default() {
                    return false;
                }
            },
            // 是否显示搜索输入框
            isShowSearchInput: {
                type: Boolean,
                default() {
                    return true;
                }
            }
        },
        methods: {
            //////// 请求 ////////

            // 前往搜索的回调
            goSearch() {
                this.searchPopHide();
                if (this.searchInput.trim() === "") {
                    // 输入空白符跳转搜索页面
                    this.searchInput = "";
                }
                const index = this.histories.indexOf(this.searchInput);
                if (index != -1) {
                    // 值已存在，移除该值
                    this.histories.splice(index, 1);
                }
                this.histories.unshift(this.searchInput);  // 在列表开头插入新记录
                this.saveToLocalStorage();
            },


            //////// 事件 ////////

            // 显示搜索气泡框
            searchPopShow() {
                this.isSearchPopShow = true;
                // console.log("显示热搜框: ", this.isSearchPopShow);
            },

            // 隐藏搜索气泡框
            searchPopHide() {
                this.isSearchPopShow = false;
                // console.log("显示热搜框: ", this.isSearchPopShow);
            },

            // 点击搜索框和气泡框外的空白处关闭气泡
            handleOutsideClick(event) {
                const formElement = this.$refs.searchForm; // 输入框元素
                const popoverElement = this.$refs.searchPop; // 气泡框元素
                if (
                    !formElement.contains(event.target)
                    &&! popoverElement.contains(event.target)
                ) {
                    this.searchPopHide();
                }
            },

            // 将搜索历史存到浏览器
            saveToLocalStorage() {
                localStorage.setItem("historiesSearch", JSON.stringify(this.histories));
            },

            // 从浏览器中加载搜索历史
            loadFromLocalStorage() {
                const storedList = localStorage.getItem("historiesSearch");
                // console.log("浏览器中的搜索历史: ", storedList);
                if (storedList) {
                    this.histories = JSON.parse(storedList);
                }
            },

            // 在输入框按下回车的回调
            onSubmit(e) {
                // console.log(e);
                if (e.key === 'Enter') {
                    this.goSearch();
                }
            },

            // 删除单个搜索历史
            removeHistory(index) {
                this.histories.splice(index, 1);
                this.saveToLocalStorage();
            },

            // 清空全部搜索历史
            removeAllHistories() {
                this.histories = [];
                localStorage.removeItem("historiesSearch");
            },

            // 点击条目搜索
            clickItemToSearch(value) {
                this.searchInput = value;
                this.goSearch();
            },

            // 悬浮头像时，气泡的显隐
            handleMouseEnter() {
                clearTimeout(outTimer);     // 这里要清除隐藏的计时器，否则在0.2秒内出入头像，会导致头像变大但气泡突然消失
                inTimer = setTimeout(() => {
                    this.popoverDisplay = "";
                    this.isPopoverShow = true;
                }, 100);
            },
            handleMouseLeave() {
                clearTimeout(inTimer);    // 清除显示计时器防止快速经过头像时的气泡闪烁
                this.isPopoverShow = false;
                outTimer = setTimeout(() => {
                    this.popoverDisplay = "none";
                }, 200);
            }
        },
        mounted() {
            // 页面渲染后创建点击事件的监听器
            window.addEventListener("click", this.handleOutsideClick);
            // 在页面加载时从本地存储中加载搜索历史
            this.loadFromLocalStorage();
        },
        beforeUnmount() {
            // 页面结束渲染前销毁点击事件的监听器
            window.removeEventListener("click", this.handleOutsideClick);
        },
    }
</script>

<style scoped>
.header-bar {
    box-sizing: border-box; /* 让内边距不增加宽度 */
    position: absolute;
    left: 0;
    top: 0;
    z-index: 1002;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 24px;
    max-width: 2560px;
    width: 100%;
    height: 64px;
    background-image: linear-gradient(to bottom, rgba(0, 0, 0, .4), rgba(255, 255, 255, 0));    /* 渐变阴影 */
}

.left-entry {
    display: flex;
    align-items: center;
    flex-shrink: 0;     /*容器空间不足时不缩小，即固定大小*/
    margin-right: 20px;
    border: 0;
    font-family: inherit;
    font-size: 100%;
    font-weight: 400;
    font-style: normal;
    line-height: 1.25;
}

.slide-down {
    position: fixed;
    top: 0;
    left: unset;
    animation: headerSlideDown .3s linear forwards;
    background: var(--bg1);
    box-shadow: 0 2px 4px rgba(0,0,0,.08);
    background: var(--bg1_float);
}

.logo {
    height: 40%;
    display: flex;
    align-items: center;
    margin-right: 10px;
}

.logo img {
    height: 100%;
}

.icon-xiajiantou {
    margin-left: 5px;
}

.entry-title {
    display: flex;
    align-items: center;
}

.entry-title .icon-xiajiantou {
    transition: transform .3s;
    transform: rotate(0);
    font-weight: 600;
}

.arrow-down {
    transform: rotate(180deg) !important;
}

.default-entry span {
    display: inline-block;
    position: relative;
}

.download-entry {
    margin-left: 10px;
}

.slide-down .entry-title,
.slide-down .default-entry,
.slide-down .download-entry {
    color: var(--text1);
}

.entry-title,
.default-entry,
.download-entry {
    height: 64px;
    line-height: 64px;
    color: #fff;
    font-size: 14px;
    cursor: pointer;
    margin-right: 15px;
}

.icon-dianshi, .icon-xiazai {
    margin-right: 5px;
}

.center-search-container {
    flex: 1 auto; /* 宽度占80% 居中*/
    height: 40px;
}

.center-search-container .is-focus {
    box-shadow: 0 0 30px rgba(0,0,0,.1);
    border-radius: 8px;
}

.header-bar .center-search-container .center-search__bar {
    position: relative;
    margin: 0 auto;
    min-width: 181px;
    max-width: 500px;
}

.is-focus #nav-searchform {
    background-color: #fff;
    border-bottom: none;
}

#nav-searchform {
    display: flex;
    align-items: center;
    padding: 0 48px 0 4px;
    position: relative;
    z-index: 1;
    overflow: hidden;
    border: 1px solid var(--line_regular);
    height: 40px;
    border-radius: 8px;
    background-color: var(--graph_bg_regular);
    opacity: .9;
    transition: background-color .3s;
}

.nav-searchform-active {
    transition: background-color 0s !important;
    border-radius: 8px 8px 0 0 !important;
}

#nav-searchform:hover {
    background-color: #fff;
    opacity: 1;
}

.nav-search-content {
    flex: 1;
}

.nav-search-input /deep/ .el-input__wrapper {
    background-color: #FFFFFF00;
    border-radius: 6px;
    box-shadow: none;
    padding: 1px 30px 1px 11px;
}

.nav-search-input-active /deep/ .el-input__wrapper {
    background-color: #0000001A;
}

.nav-search-input /deep/ .el-input__inner {
    color: var(--text2);
}

.nav-search-input /deep/ .el-input__inner:focus {
    color: var(--text1);
}

.nav-search-clean {
    position: absolute;
    width: 16px;
    height: 16px;
    right: 55px;
    cursor: pointer;
    background-color: var(--graph_weak);
    border-radius: 50%;
    color: #fff;
}

.nav-search-clean:hover {
    background-color: var(--graph_icon);
}

.nav-search-clean i {
    position: relative;
    bottom: 2px;
    left: 0.5px;
    font-size: 14px;
}

.nav-search-btn {
    position: absolute;
    right: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    border-radius: 6px;
    color: var(--text1);
    line-height: 32px;
    cursor: pointer;
    transition: background-color .3s;
}

.nav-search-btn:hover {
    background-color: var(--graph_bg_thick);
}

.icon-sousuo {
    font-size: 18px;
}

.header-bar .search-panel {
    width: 100%;
    max-height: 612px;
    overflow-y: auto;
    background: var(--bg1);
    border: 1px solid var(--line_regular);
    border-top: none;
    border-radius: 0 0 8px 8px;
    padding: 13px 0 16px;
    -webkit-font-smoothing: antialiased;
}

.header-bar .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 16px;
}

.header-bar .header .title {
    height: 24px;
    font-size: 16px;
    line-height: 24px;
}

.header-bar .header .clear {
    font-size: 12px;
    line-height: 15px;
    height: 15px;
    color: var(--text3);
    cursor: pointer;
}

.header-bar .header .clear:hover {
    color: var(--text2);
}

.header-bar .histories-wrap {
    padding: 0 16px;
    overflow: hidden;
}

.header-bar .histories {
    display: flex;
    flex-wrap: wrap;
    margin-top: 12px;
    margin-right: -10px;
    margin-bottom: 4px;
}

.header-bar .histories .history-item {
    position: relative;
    box-sizing: border-box;
    height: 30px;
    padding: 7px 10px 8px;
    font-size: 12px;
    line-height: 15px;
    background: var(--graph_bg_thin);
    border-radius: 4px;
    margin-right: 10px;
    margin-bottom: 10px;
    cursor: pointer;
}

.header-bar .histories .history-item .history-text {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 96px;
    color: var(--text2);
}

.header-bar .histories .history-item .history-text:hover {
    color: var(--brand_pink);
}

.header-bar .histories .history-item .close {
    display: none;
    box-sizing: border-box;
    position: absolute;
    width: 13px;
    height: 13px;
    top: -6px;
    right: -3px;
    padding: 2px;
}

.header-bar .histories .history-item:hover .close {
    display: block;
}

.header-bar .histories .history-item .close i {
    font-size: 10px;
    color: #fff;
    background-color: #ccc;
    border-radius: 50%;
}

.header-bar .history-fold {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 70px;
    margin: 0 auto 14px;
    color: var(--text3);
    cursor: pointer;
}

.header-bar .history-fold:hover {
    color: var(--brand_pink);
}

.header-bar .fold-text {
    font-size: 12px;
    line-height: 15px;
    height: 15px;
}

.header-bar .trendings-double {
    display: flex;
}

.header-bar .trendings-double .trendings-col {
    flex: 1;
}

.header-bar .trendings-double .trendings-col:first-child {
    margin-right: 10px;
}

.header-bar .trending-wrap {
    box-sizing: border-box;
    height: 38px;
    display: flex;
    align-items: center;
    cursor: pointer;
    padding-left: 16px;
}

.header-bar .trending-item:hover {
    background-color: var(--graph_bg_thick);
}

.header-bar .trending-item .trendings-rank {
    margin-right: 10px;
    color: var(--text3);
}

.header-bar .trending-item .topThree {
    color: var(--text2) !important;
}

.header-bar .trending-item .trendings-text {
    font-size: 14px;
    line-height: 17px;
    height: 17px;
    margin-right: 6px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    letter-spacing: 0;
    color: var(--text2);
}

.right-entry {
    display: flex;
    align-items: center;
    margin-left: 20px;
    flex-shrink: 0;     /*容器空间不足时不缩小，即固定大小*/
}

.header-avatar-wrap {
    position: relative;
    box-sizing: content-box;
    padding-right: 10px;
    width: 50px;
    height: 50px;
    cursor: pointer;
}

.header-avatar-wrap--container {
    position: relative;
    z-index: 2;
}

.mini-avatar--small {
    position: absolute;
    top: 5px;
    left: 10px;
    z-index: 2;
    display: block;
    width: 38px;
    height: 38px;
    border-radius: 50%;
    box-sizing: border-box;  /* 让内边距不增加宽度 */
    border: 2px solid #fff;
    transition: width 0.3s ease, height 0.3s ease, top 0.3s ease, left 0.3s ease; /* 添加平滑过渡效果 */
}

.v-img {
    position: relative;
    display: inline-block;
    line-height: 1;
    width: 100%;
    height: 100%;
    vertical-align: middle;
    border-radius: 50%;
    background-color: transparent;
}

/* 放大头像 */
.header-avatar-wrap:hover .mini-avatar--small {
    top: 15px;
    left: -35px;
    width: 90px;
    height: 90px;
}

.header-avatar-wrap:hover .mini-avatar--small.shrink {
    animation: shrink 0.3s both; /* 初始状态为缩小 */
}

@keyframes shrink {
  to {
    transform: scale(1); /* 缩小到原始大小 */
  }
}

.v-img img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: inherit;
    border-radius: 50%;
    image-rendering: -webkit-optimize-contrast;
}

.v-popover {
    position: absolute;
    z-index: 1;
    padding-top: 20px;
    margin-left: -20px;
}

.to-bottom {
    top: 100%;
    left: 50%;
    transform: translate3d(-50%,0,0);   /* 水平左移半个元素身位，使其水平与父元素居中 */
}

.avatar-panel-popover {
    width: 300px;
    height: 450px;
    background-color: #fff;
    border-radius: 8px;
    padding: 0 24px 18px;
    box-shadow: 0 0 30px rgba(0,0,0,.1);
    border: 1px solid var(--line_regular);
}

.popHide {
    animation: fade-out 0.2s ease-out forwards;
    transform-origin: top; /* 设置动画的旋转点为顶部 */
}

.popShow {
    animation: fade-in 0.2s ease-out forwards;
    transform-origin: top; /* 设置动画的旋转点为顶部 */
}

/* 淡入动画 */
@keyframes fade-in {
    0% {
        opacity: 0; /* 初始状态透明 */
        transform: translateY(-10px); /* 向上平移 10px，将元素隐藏在顶部 */
    }
    100% {
        opacity: 1; /* 最终状态不透明 */
        transform: translateY(0); /* 平移恢复到原始位置 */
    }
}

/* 淡出动画 */
@keyframes fade-out {
    0% {
        opacity: 1; /* 初始状态不透明 */
        transform: translateY(0);   /* 原始位置 */
    }
    100% {
        opacity: 0; /* 最终状态透明 */
        transform: translateY(-10px); /* 向上平移 10px，将元素隐藏在顶部 */
    }
}

.slide-down .right-entry--outside .iconfont {
    color: var(--text1);
}

.slide-down .right-entry--outside {
    color: var(--text2);
}

.right-entry--outside {
    display: flex;
    align-items: center;
    flex-direction: column;
    flex-shrink: 0;
    margin-right: 0;
    min-width: 50px;
    text-align: center;
    font-size: 13px;
    color: #fff;
    cursor: pointer;
}

.right-entry--outside .iconfont {
    font-size: 20px;
    display: inline-block;
    position: relative;
}

.right-entry-item--upload {
    margin-left: 15px;
}

.upload-buttom {
    background-color: #fb7299;
    color: #fff;
    border-radius: 8px;
    padding: 8px 20px;
    cursor: pointer;
    font-size: 14px;
    transition: background-color .3s;
}

.upload-buttom:hover {
    background-color: #f992af;
}

.icon-shangchuan {
    margin-right: 5px;
}

/* 跳动效果 */
@keyframes jump {
  0%, 100% {
    transform: translateY(0); /* 起始和结束状态，图标回到原位 */
  }
  50% {
    transform: translateY(-5px); /* 中间状态，图标向上跳动 20px */
  }
}

.default-entry:hover span, .right-entry--outside:hover .iconfont {
    animation: jump 0.3s; /* 应用跳动动画效果 */
}
</style>