<template>
    <div class="search">
        <HeaderBar :isFixHeaderBar="true" :isShowSearchInput="false"></HeaderBar>
        <div class="search-layout">
            <div class="search-entry-page" v-if="routerIndex === -1 || !keyword">
                <div class="search-center">
                    <h1 class="search-center-title">
                        <img src="~assets/img/teriteri-pink.png" alt="">
                        <span class="center-title-text">搜索</span>
                    </h1>
                    <SearchInput style="margin-top: 30px;" :keyword="keyword ? keyword : ''"></SearchInput>
                </div>
            </div>
            <div v-else>
                <div class="search-header">
                    <div class="search-input">
                        <SearchInput :keyword="keyword ? keyword : ''"></SearchInput>
                        <div class="search-tabs i_wrapper">
                            <nav class="navbar">
                                <ul class="nav">
                                    <li class="nav-item" :class="{'active': index === routerIndex}"
                                        v-for="(item, index) in router" :key="index"
                                        @click="changeNav(item.path)"
                                    >
                                        <div class="nav-text">
                                            {{ item.name }}
                                            <div class="nav-slider" v-if="index === routerIndex"></div>
                                        </div>
                                        <span class="nav-num">{{ this.$store.state.matchingCount[index] }}</span>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                        <hr class="search-line">
                    </div>
                </div>
                <div class="search-content">
                    <router-view></router-view>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import HeaderBar from '@/components/headerBar/HeaderBar.vue';
import SearchInput from '@/components/search/SearchInput.vue';

export default {
    name: "SearchView",
    components: {
        HeaderBar,
        SearchInput,
    },
    data() {
        return {
            router: [
                { path: '/search/video', name: '视频' },
                { path: '/search/user', name: '用户' },
            ],
        }
    },
    props: {
        // 从路由参数获取
        keyword: String,
    },
    computed: {
        // 根据当前路由计算路由列表下标
        routerIndex() {
            return this.router.findIndex(item => this.$route.path.startsWith(item.path));
        }
    },
    methods: {
        // 添加搜索词条
        addSearchWord() {
            const formdata = new FormData();
            formdata.append("keyword", this.keyword);
            this.$post("/search/word/add", formdata);
            this.getCount();
        },

        // 获取个分类相关数量
        async getCount() {
            const keyword = encodeURIComponent(this.keyword); // 对特殊字符进行编译
            const res = await this.$get("/search/count", {params: {keyword: keyword}});
            this.$store.commit("updateMatchingCount", res.data.data);
        },

        // 跳转对应类型
        changeNav(path) {
            if (this.$route.path.startsWith(path)) return;
            this.$router.push(`${path}?keyword=${this.keyword}`);
        }
    },
    created() {
        if (this.keyword) {
            this.addSearchWord();
        }
    },
    watch: {
        "keyword"(curr) {
            if (curr) {
                this.addSearchWord();
            }
        }
    }
}
</script>

<style scoped>
.search-layout {
    padding-top: 64px;
}

.search-entry-page {
    height: calc(100vh - 64px);
    z-index: 2;
    position: relative
}

.search-center {
    top: 40%;
    position: absolute;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%,-50%);
}

.search-center-title {
    display: flex;
    justify-content: center;
    align-items: flex-end;
    font-size: 40px;
}

.search-center-title img {
    height: 60px;
    transform: translateY(4px);
    margin-right: 12px;
}

.center-title-text {
    position: relative;
    line-height: 1;
    padding-left: 25px;
    color: var(--brand_pink);
}

.center-title-text::before {
    content: "";
    position: absolute;
    left: 0;
    width: 2px;
    height: 100%;
    background: var(--brand_pink);
}

.search-input {
    margin: 30px 0 20px;
}

.navbar::after {
    content: "";
    display: block;
    height: 4px;
}

.nav {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: start;
    -ms-flex-pack: start;
    justify-content: flex-start;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    list-style: none;
    position: relative;
}

.nav-item {
    display: inline-block;
    padding: var(--v_sm) 24px;
    font-size: var(--v_fs_3);
    cursor: pointer;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: start;
    -ms-flex-pack: start;
    justify-content: flex-start;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
}

.nav-item:first-child {
    padding-left: 0 !important;
}

.nav-text {
    color: var(--v_text2);
    white-space: nowrap;
    margin-right: var(--v_xsx);
    -webkit-transition: color .2s;
    transition: color .2s;
    position: relative;
}

.nav-item:hover .nav-text, .nav-item.active .nav-text {
    color: var(--brand_pink) !important;
}

.nav-slider {
    position: absolute;
    width: 100%;
    height: 3px;
    background-color: var(--brand_pink);
    top: 30px;
}

.nav-num {
    padding: 1px var(--v_xxs);
    border-radius: var(--v_smx);
    font-size: var(--v_fs_6);
    color: var(--v_text2);
    background: var(--v_graph_bg_regular);
}

.search-line {
    margin-top: 3px;
    border: none;
    border-top: 1px solid var(--line_light);
}

.search-content {
    min-height: 200px;
}
</style>