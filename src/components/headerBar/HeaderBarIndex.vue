<template>
    <div class="header-bar">
        <div class="left-entry">
            <div class="entry-title">
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
        <div class="center-search-container">
            <div class="center-search-bar">
                <form
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
                        ></el-input>
                    </div>
                    <div class="nav-search-btn">
                        <i class="iconfont icon-sousuo"></i>
                    </div>
                </form>
            </div>
        </div>
        <div class="right-entry">
            <div class="header-avatar-wrap">
                <div class="header-avatar-wrap--container mini-avatar--small">
                    <picture class="v-img">
                        <img src="https://cdn.acwing.com/media/user/profile/photo/240972_md_e16c066264.jpg" alt="" />
                    </picture>
                </div>
            </div>
            <div class="vip-wrap">
                <div class="right-entry--outside">
                    <i class="iconfont icon-huiyuan1"></i>
                    <span>大会员</span>
                </div>
            </div>
            <div class="v-popover-wrap">
                <div class="right-entry--outside">
                    <i class="iconfont icon-xinfeng"></i>
                    <span>消息</span>
                </div>
            </div>
            <div class="v-popover-wrap">
                <div class="right-entry--outside">
                    <i class="iconfont icon-fengche"></i>
                    <span>动态</span>
                </div>
            </div>
            <div class="v-popover-wrap">
                <div class="right-entry--outside">
                    <i class="iconfont icon-shoucang"></i>
                    <span>收藏</span>
                </div>
            </div>
            <div class="v-popover-wrap">
                <div class="right-entry--outside">
                    <i class="iconfont icon-lishijilu"></i>
                    <span>历史</span>
                </div>
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
    export default {
        name: "HeaderBarIndex",
        data() {
            return {
                // 需要搜索的内容
                searchInput: "",
                // 是否显示热搜框
                isSearchPopShow: false,
            }
        },
        methods: {
            // 事件
            // 显示搜索框
            searchPopShow() {
                this.isSearchPopShow = true;
                console.log("显示热搜框: ", this.isSearchPopShow);
            },

            // 隐藏搜索框
            searchPopHide() {
                this.isSearchPopShow = false;
                console.log("显示热搜框: ", this.isSearchPopShow);
            },

            // 点击搜索框和气泡框外的空白处关闭气泡
            handleOutsideClick(event) {
                const formElement = this.$refs.searchForm; // 输入框元素
                // const popoverElement = this.$refs.searchPop; // 气泡框元素
                if (
                    !formElement.contains(event.target)
                    // &&! popoverElement.contains(event.target)
                ) {
                    this.searchPopHide();
                }
            },
        },
        mounted() {
            // 页面渲染后创建点击事件的监听器
            window.addEventListener("click", this.handleOutsideClick);
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

.entry-title {
    display: flex;
    align-items: center;
}

.default-entry span {
    display: inline-block;
    position: relative;
}

.download-entry {
    margin-left: 10px;
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
    flex: 0.8 auto;
    height: 40px;
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

.right-entry {
    display: flex;
    align-items: center;
    margin-left: 20px;
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