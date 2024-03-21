<template>
    <div class="search-user">
        <div class="search-page i_wrapper">
            <div class="container">
                <div class="user-card" v-for="(item, index) in userList" :key="index">
                    <div class="user-info-card flex_start">
                        <a :href="`/space/${item.uid}`" target="_blank" class="user-info-left">
                            <VAvatar :img="item.avatar_url" :size="86" :auth="item.auth"></VAvatar>
                        </a>
                        <div class="user-content">
                            <h2 class="card-title">
                                <a :href="`/space/${item.uid}`" target="_blank" class="user-name" :title="item.nickname">
                                    {{ item.nickname }}
                                </a>
                                <VLevel class="level" :level="handleLevel(item.exp)" :size="16"></VLevel>
                            </h2>
                            <p class="card-center">
                                {{ handleNum(item.fansCount) }}粉丝 · {{ handleNum(item.videoCount) }}个视频
                                <span style="margin-left: 3px;">{{ item.auth > 0 ? item.authMsg : item.description }}</span>
                            </p>
                            <div class="card-buttom">
                                <button class="not-follow" v-if="true">+ 关注</button>
                                <button class="following" v-else>已关注</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="search-bottom flex_center">
                <el-pagination
                    background
                    layout="prev, pager, next"
                    :total="this.$store.state.matchingCount[1]"
                    :page-size="30"
                    :pager-count="7"
                    :current-page="page"
                    @current-change="pageChange"
                ></el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
import VAvatar from '@/components/avatar/VAvatar.vue';
import VLevel from '@/components/UserCard/VLevel.vue';
import { handleNum, handleLevel } from '@/utils/utils.js';

export default {
    name: "SearchUser",
    components: {
        VAvatar,
        VLevel,
    },
    data() {
        return {
            page: 1, // 当前页码
            userList: [],  // 查询到的相关视频
            loading: true,  // 正在查询中
        }
    },
    props: {
        // 从路由参数获取的关键词
        keyword: String,
    },
    methods: {
        // 查询相关视频
        async searchUsers() {
            this.userList = [];
            this.loading = true;
            const keyword = encodeURIComponent(this.keyword); // 对特殊字符进行编译
            const res = await this.$get("/search/user", {
                params: {
                    keyword: keyword,
                    page: this.page
                }
            });
            if (!res.data) return;
            this.userList = res.data.data;
            this.loading = false;
            // console.log("查询到的相关用户列表：", this.userList);
        },

        // 换页
        pageChange(page) {
            this.page = page;
            this.searchUsers();
        },

        // 计算用户等级
        handleLevel(exp) {
            return handleLevel(exp);
        },

        // 处理大于一万的数字
        handleNum(number) {
            return handleNum(number);
        },
    },
    created() {
        if (this.keyword) {
            this.searchUsers();
        }
    },
    watch: {
        "keyword"(curr) {
            if (curr) {
                this.page = 1;
                this.searchUsers();
            }
        }
    }
}
</script>

<style scoped>
.search-page {
    padding-bottom: 30px !important;
    margin-top: 30px !important;
    position: relative;
}

.container {
    grid-gap: 0px;
    display: grid;
    position: relative;
    width: 100%;
}

@media (max-width: 1699.9px) {
    .container {
        grid-column: span 2;
        grid-template-columns: repeat(2,1fr);
    }
}

@media (min-width: 1700px) {
    .container {
        grid-column: span 3;
        grid-template-columns: repeat(3,1fr);
    }
}

.user-card {
    margin-bottom: 60px;
    padding: 0px 8px;
}

.user-info-left {
    margin-right: 15px;
}

.user-content {
    width: calc(100% - 101px);
    padding-right: 15px;
}

.card-title {
    margin-bottom: 5px;
    font-size: 18px;
    font-weight: 600;
    color: var(--text1);
    line-height: 1.25;
    display: flex;
    align-items: center;
}

.user-name {
    font-size: 18px;
    font-weight: 600;
    transition: color .2s;
    max-width: 100%;
    display: block;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    display: inline-block;
    color: var(--text1);
}

.user-name:hover {
    color: var(--brand_pink);
}

.level {
    margin-left: 10px;
}

.card-center {
    line-height: 1.35;
    margin: 5px 0;
    color: var(--text2);
    width: auto;
    max-width: 100%;
    display: block;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}

.card-buttom button {
    height: 32px;
    padding: 0;
    width: 100px;
    border-radius: 6px;
    font-size: 14px;
    line-height: 1;
    white-space: nowrap;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    cursor: pointer;
    -webkit-transition-duration: .2s;
    transition-duration: .2s;
}

.not-follow {
    color: #fff;
    background: var(--brand_pink);
    border: 1px solid var(--brand_pink);
}

.not-follow:hover {
    color: #fff;
    background: var(--Pi4);
    border: 1px solid var(--Pi4);
}

.following {
    color: var(--text2);
    background: var(--graph_bg_regular);
    border: none;
}

.following:hover {
    background: var(--graph_bg_thick);
}

.search-bottom {
    margin: 50px 0 20px;
}
</style>