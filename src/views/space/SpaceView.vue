<template>
    <div class="space">
        <HeaderBar :isFixHeaderBar="true"></HeaderBar>
        <div class="space-container">
            <!-- 头图部分 -->
            <div class="h">
                <div class="wrapper">
                    <div class="h-forbid" :style="`display: ${user.state === 1 ? '' : 'none'};`">
                        <div class="f-wrap">
                            <i class="f-icon"></i>
                            <span class="f-txt">该账号封禁中</span>
                        </div>
                    </div>
                    <div class="h-inner" :style="`background-image: url('${user.bg_url}');`">
                        <div class="h-gradient"></div>
                        <div class="h-user">
                            <div class="h-info">
                                <div class="avatar-container">
                                    <VAvatar :img="user.avatar_url" :size="60" :auth="user.auth"></VAvatar>
                                    <a v-if="user.uid === this.$store.state.user.uid" href="/account/avatar" target="_blank" class="avatar-cover">更换头像</a>
                                </div>
                                <div class="h-basic">
                                    <div class="basic-top">
                                        <span class="h-name">{{ user.nickname }}</span>
                                        <span class="icon gender" :class="user.gender === 0 ? 'female' : user.gender === 1 ? 'male' : ''"></span>
                                        <VLevel :level="handleLevel(user.exp)" :size="12"></VLevel>
                                        <div class="vip-tag" v-if="user.vip !== 0">
                                            {{ user.vip === 1 ? '月度' : user.vip === 2 ? '季度' : '年度' }}大会员
                                        </div>
                                    </div>
                                    <div class="basic-bottom">
                                        <h4 class="h-sign" :title="user.description">{{ user.description }}</h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="h-action" v-if="user.uid !== this.$store.state.user.uid">
                            <div class="h-f-btn h-follow" @click="noPage">关注</div>
                            <div class="h-f-btn h-message" @click="createChat">发消息</div>
                            <div class="be-dropdown h-add-to-black">
                                <i class="iconfont icon-gengduo"></i>
                            </div>
                        </div>
                        <div title="更换皮肤" class="space-theme-trigger icon" v-if="user.uid === this.$store.state.user.uid"
                            :style="`background-position: -${themePosX}px 0px;`"
                            @mouseenter="startTimer(true)"
                            @mouseleave="startTimer(false)"
                            @click="themeShow = !themeShow"
                        ></div>
                    </div>
                    <!-- 更换主题面板 -->
                    <div class="space-theme" :class="{'theme-show': themeShow}" v-if="user.uid === this.$store.state.user.uid">
                        <div class="theme-header">
                            <span class="theme-header-title">头图</span>
                            <div class="theme-close" @click="themeShow = false">
                                <i class="iconfont icon-close"></i>
                            </div>
                        </div>
                        <div class="theme-panel">
                            <div class="wrapper">
                                <div class="theme-list">

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 导航栏 -->
            <div class="n">
                <div class="wrapper n-wrapper">
                    <div class="n-inner">
                        <!-- 左边 -->
                        <div class="n-tab-links" @mouseleave="hoverIdx = -1">
                            <div class="n-btn n-index" :class="{'active': navIdx === 0 || navIdx === 6 || navIdx === 7}" @click="clickNavItem('')" @mouseenter="hoverIdx = 0">
                                <svg t="1711032641627" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4449" id="mx_n_1711032641627" width="20" height="20"><path d="M737.84 961.23h-82.29a42.11 42.11 0 0 1-42.07-42.07V723.7c0-38.92-23.8-65.08-59.23-65.08h-69.16c-35.43 0-59.23 26.15-59.23 65.08v195.47a42.11 42.11 0 0 1-42.07 42.07H301.5c-79.27 0-143.77-64.49-143.77-143.77V488.28H48.23a29.85 29.85 0 0 1-19.11-52.78L443.51 90.28l0.34-0.26A113.33 113.33 0 0 1 582 90l0.67 0.54L996.74 435.5a29.85 29.85 0 0 1-19.11 52.79h-96v329.17c-0.02 79.28-64.52 143.77-143.79 143.77z" fill="#00c091" p-id="4450"></path></svg>
                                <span class="n-text">主页</span>
                            </div>
                            <div class="n-btn n-dynamic" :class="{'active': navIdx === 1}" @click="clickNavItem('/dynamic')" @mouseenter="hoverIdx = 1">
                                <svg t="1711032716486" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5055" id="mx_n_1711032716487" width="20" height="20"><path d="M968.96 414.56l-129.12-163.2c-7.68-12-20.64-16.8-35.04-16.8h-223.68c-23.04 0.48-37.92 19.2-37.92 42.72v165.12c0.48 23.04 17.76 41.28 40.8 41.28h350.4c33.12-0.48 52.32-41.28 34.56-69.12zM750.56 538.88h-166.08c-23.04 0.48-41.76 19.68-41.28 43.2v351.36c0.48 33.12 44.64 53.28 72 35.04l162.24-130.56c12-9.12 14.88-21.6 14.88-36v-221.76c-0.48-23.04-18.24-41.76-41.76-41.28zM440.48 538.88H90.56c-33.12 0-53.28 36-35.52 63.84l127.2 164.64c7.68 12.48 21.12 19.2 35.52 19.2h222.72c23.04 0 41.76-18.24 41.76-41.76v-165.12c0-22.56-18.72-40.8-41.76-40.8zM416.96 55.04L250.88 187.52c-16.8 12.96-16.8 21.6-16.8 36.48v217.92c0 23.04 19.2 42.24 42.24 41.76h165.6c23.04 0 39.84-20.16 39.84-43.2v-350.4c0.48-33.12-36.48-52.8-64.8-35.04z" p-id="5056" fill="#fb7299"></path></svg>
                                <span class="n-text">动态</span>
                            </div>
                            <div class="n-btn n-video" :class="{'active': navIdx === 2 || navIdx === 3}" @click="clickNavItem('/video')" @mouseenter="hoverIdx = 2">
                                <svg t="1711032896288" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4273" width="20" height="20"><path d="M672.42666667 81.23733334c16.29866667-13.344 40.32-10.95466667 53.67466666 5.344 12.448 15.2 11.31733333 37.38666667-2.63466666 51.232l-57.952 57.89866666h154.98666666c72.62933333-0.032 132.32 57.29066667 135.232 129.856v448.36266667c0 74.72-60.56533333 135.28533333-135.28533333 135.28533333H205.68533333C130.976 909.20533334 70.4 848.64 70.4 773.93066667V331.09333334c0-74.72 60.56533333-135.28533333 135.28533333-135.28533334h130.58133334l-57.89866667-57.89866666c-14.944-14.83733333-15.04-38.98666667-0.20266667-53.93066667 13.84533333-13.952 36.032-15.09333333 51.232-2.63466667l2.88 2.656 111.81866667 111.81866667h113.52533333L669.44 84l2.98666667-2.76266666zM414.76266667 429.46133334v245.93066666c0.04266667 20.39466667 16.59733333 36.88533333 36.992 36.85333334 7.65866667-0.01066667 15.11466667-2.41066667 21.35466666-6.848l172.20266667-122.944c16.56533333-11.82933333 20.40533333-34.85866667 8.576-51.424a36.97813333 36.97813333 0 0 0-8.576-8.576L473.09866667 399.52c-16.608-11.82933333-39.65866667-7.95733333-51.488 8.65066667a36.9088 36.9088 0 0 0-6.848 21.23733333v0.05333334z" fill="#02b5da" p-id="4274"></path></svg>
                                <span class="n-text">投稿</span>
                                <span class="n-num">{{ worksCount }}</span>
                            </div>
                            <div class="n-btn n-favlist" :class="{'active': navIdx === 4}" @click="clickNavItem('/favlist')" @mouseenter="hoverIdx = 4">
                                <svg t="1711032962919" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4526" width="20" height="20"><path d="M958.0302582 397.55763037c-7.9058083-22.83900117-28.10954004-40.40746348-51.82696406-43.92115576l-234.53897256-36.01534746L570.64566377 99.77219404C560.10458604 76.93319287 537.26558487 62 511.79131513 62c-25.4742706 0-48.31327177 14.93319287-58.85434862 37.77219404L351.03988408 317.62112715 117.37933526 353.63647461c-23.71742402 3.51369229-43.92115576 20.20373174-51.82696407 43.92115576-7.9058083 22.83900117-1.75684658 49.19169463 14.93319287 65.88173408l171.29250792 176.56304678-39.52904063 245.08004942c-4.39211602 24.59584687 6.14896172 49.19169463 26.35269345 64.1248875 11.41950058 7.9058083 24.59584687 12.29792344 37.77219405 12.29792343 10.54107773 0 21.96057832-2.63526943 31.62323232-7.9058083L511.79131513 843.79657432l203.7941631 109.80288984c9.66265401 5.27053887 21.08215459 7.9058083 31.62323232 7.9058083 13.17634717 0 26.35269346-4.39211602 37.77219404-12.29792344 20.20373174-14.93319287 30.74480948-39.52904063 26.35269346-64.1248875l-39.52904063-245.08004941 172.17093076-176.56304678C959.78710479 445.87090214 965.93606651 420.39663154 958.0302582 397.55763037z" fill="#f3a034" p-id="4527"></path></svg>
                                <span class="n-text">收藏</span>
                                <span class="n-num">{{ this.$store.state.userFavList.length }}</span>
                            </div>
                            <div class="n-btn n-setting" v-if="this.$store.state.user.uid === user.uid" :class="{'active': navIdx === 5}" @click="clickNavItem('/setting')" @mouseenter="hoverIdx = 5">
                                <svg t="1711033098114" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5289" width="20" height="20"><path d="M882.34150875 504.54345955c0-49.57218555 27.61681646-93.75909188 71.66563872-110.19109768-22.09345317-77.18900202-66.14227541-148.85464074-121.23782427-203.95018957-38.52545897 27.61681646-93.62100781 33.00209567-137.80791415 11.0467266-44.04882225-27.61681646-66.14227541-71.66563872-60.61891213-121.23782427-38.52545897-11.04672658-82.7123653-16.57008987-121.23782427-16.57008988-44.04882225 0-82.7123653 5.5233633-121.23782426 16.57008988 5.5233633 44.04882225-16.57008987 93.62100781-60.61891212 121.23782427s-99.14437109 22.09345317-137.80791414-11.0467266c-55.09554883 55.09554883-99.14437109 126.76118755-121.23782426 203.95018957 44.04882225 16.57008987 71.66563872 60.61891214 71.66563872 110.19109768s-27.61681646 93.62100781-71.66563872 110.19109769c22.09345317 77.18900202 66.14227541 148.85464074 121.23782426 203.95018957 38.52545897-27.61681646 93.62100781-33.00209567 137.80791414-11.0467266 44.04882225 27.61681646 66.14227541 71.66563872 60.61891212 121.23782426 38.52545897 11.04672658 82.7123653 16.57008987 121.23782426 16.5700899 44.04882225 0 82.7123653-5.5233633 121.23782427-16.5700899-5.5233633-44.04882225 16.57008987-93.62100781 60.61891213-121.23782426s99.14437109-22.09345317 137.80791415 11.0467266c55.09554883-55.09554883 99.14437109-126.76118755 121.23782427-203.95018957-44.18690634-16.43200579-71.66563872-60.61891214-71.66563872-110.19109769zM513.10467265 686.40019595c-104.66773438 0-187.3800997-82.7123653-187.38009967-181.8567364 0-99.14437109 82.7123653-181.85673639 187.38009967-181.85673638 104.66773438 0 187.3800997 82.7123653 187.3800997 181.85673638-0.13808409 99.28245518-82.7123653 181.85673639-187.3800997 181.8567364z m0-71.66563871c60.8950803 0 110.19109769-49.29601739 110.19109769-110.19109769 0-60.8950803-49.29601739-110.19109769-110.19109769-110.19109768-60.8950803 0-110.19109769 49.29601739-110.19109768 110.19109768-0.13808409 60.8950803 49.29601739 110.19109769 110.19109768 110.19109769z m0 0" fill="#FF8CB0" p-id="5290"></path></svg>
                                <span class="n-text">设置</span>
                            </div>
                        </div>
                        <!-- 右边 -->
                        <div class="n-statistics">
                            <div class="n-data n-follow" :class="{'active': navIdx === 6}" @click="clickNavItem('/fans/follow')" :title="user.followsCount">
                                <p class="n-data-k">关注</p>
                                <p class="n-data-v">{{ handleNum(user.followsCount) }}</p>
                            </div>
                            <div class="n-data n-fans" :class="{'active': navIdx === 7}" @click="clickNavItem('/fans/fans')" :title="user.fansCount">
                                <p class="n-data-k">粉丝</p>
                                <p class="n-data-v">{{ handleNum(user.fansCount) }}</p>
                            </div>
                            <div class="n-data" :title="user.loveCount">
                                <p class="n-data-k">获赞数</p>
                                <p class="n-data-v">{{ handleNum(user.loveCount) }}</p>
                            </div>
                            <div class="n-data" :title="user.playCount">
                                <p class="n-data-k">播放数</p>
                                <p class="n-data-v">{{ handleNum(user.playCount) }}</p>
                            </div>
                        </div>
                    </div>
                    <div class="n-cursor" :style="`width: ${barWidth}px; left: ${barLeft}px;`"></div>
                </div>
            </div>
            <div class="s-space" v-if="user.uid">
                <div class="wrapper">
                    <div class="col-full" v-if="navIdx === 2 || navIdx === 3">
                        <div class="contribution-sidenav">
                            <div class="nav-container playlist-container">
                                <div class="contribution-list-container">
                                    <ul class="contribution-list">
                                        <li class="contribution-item" :class="{'cur': navIdx === 2}" @click="clickNavItem('/video')">
                                            <a class="text">视频</a>
                                            <span class="num">{{ worksCount }}</span>
                                        </li>
                                        <li class="contribution-item" :class="{'cur': navIdx === 3}" @click="clickNavItem('/article')">
                                            <a class="text">图文</a>
                                            <span class="num">{{ 0 }}</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div class="main-content">
                            <router-view></router-view>
                        </div>
                    </div>
                    <router-view v-else></router-view>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import HeaderBar from '@/components/headerBar/HeaderBar.vue';
import VAvatar from '@/components/avatar/VAvatar.vue';
import VLevel from '@/components/UserCard/VLevel.vue';
import { handleNum, handleLevel } from '@/utils/utils.js';
import { ElMessage } from 'element-plus';

export default {
    name: "SpaceView",
    components: {
        HeaderBar,
        VAvatar,
        VLevel,
    },
    data() {
        return {
            user: {},   // 用户信息
            worksCount: 0,  // 用户投稿数
            themePosX: 0,   // 右上角的样式动画效果
            timer: null,
            themeShow: false,   // 是否展开更换头图的抽屉
            hoverIdx: -1,   // 悬停导航栏
            mounted: false,
        }
    },
    computed: {
        barWidth() {
            const list = ['.n-index', '.n-dynamic', '.n-video', '.n-video', '.n-favlist', '.n-setting'];
            let target = '.n-index';
            if (this.hoverIdx >= 0) {
                target = list[this.hoverIdx];
            } else if (this.navIdx < 6) {
                target = list[this.navIdx];
            }
            if (!this.mounted) return 0;
            return document.querySelector(target).clientWidth;
        },

        barLeft() {
            const list = ['.n-index', '.n-dynamic', '.n-video', '.n-video', '.n-favlist', '.n-setting'];
            let target = '.n-index';
            if (this.hoverIdx >= 0) {
                target = list[this.hoverIdx];
            } else if (this.navIdx < 6) {
                target = list[this.navIdx];
            }
            if (!this.mounted) return 0;
            return document.querySelector(target).getBoundingClientRect().left - document.querySelector(".n-wrapper").getBoundingClientRect().left;
        },

        // 当前导航栏
        navIdx() {
            const part = this.$route.path.split('/');
            return !part[3] ? 0 :
                    part[3] === '' ? 0 :
                    part[3] === 'dynamic' ? 1 :
                    part[3] === 'video' ? 2 :
                    part[3] === 'article' ? 3 :
                    part[3] === 'favlist' ? 4 :
                    part[3] === 'setting' ? 5 :
                    part[3] === 'fans' ? part[4] === 'follow' ? 6 : 7 : 0
        }
    },
    methods: {
        // 获取用户信息
        async getUserInfo(uid) {
            const res = await this.$get("/user/info/get-one", {
                params: { uid: uid },
            });
            if (!res.data) return;
            if (!res.data.data) {
                this.$router.push('/notfound');
                return;
            } else if (res.data.data.state === 2) {
                this.$router.push('/notfound');  // 账号已注销
                return;
            }
            this.user = res.data.data;
        },

        // 获取用户的收藏夹列表
        async getUserFavList(uid) {
            let res;
            if (!localStorage.getItem("teri_token")) {
                res = await this.$get("/favorite/get-all/visitor", {
                    params: { uid: uid },
                });
            } else {
                res = await this.$get("/favorite/get-all/user", {
                    params: { uid: uid },
                    headers: { Authorization: "Bearer " + localStorage.getItem("teri_token") }
                });
            }
            if (!res.data) return;
            // 将默认置顶
            const defaultFav = res.data.data.find(item => item.type === 1);
            const list = res.data.data.filter(item => item.type !== 1);
            list.unshift(defaultFav);
            this.$store.state.userFavList = list;
            // console.log(this.$store.state.userFavList)
        },

        // 获取用户投稿数
        async getUserWorksCount(uid) {
            const res = await this.$get("/video/user-works-count", {
                params: { uid: uid }
            });
            if (!res.data) return;
            this.worksCount = res.data.data;
        },

        // 创建聊天
        createChat() {
            if (!this.$store.state.user.uid) {
                this.$store.state.openLogin = true;
                this.$nextTick(() => {
                    this.$store.state.openLogin = false;
                });
                return;
            }
            this.openNewPage(`/message/whisper/${this.user.uid}`);
        },

        // 打开新标签页
        openNewPage(route) {
            window.open(this.$router.resolve(route).href, '_blank');
        },

        // 开始计时器
        startTimer(isIncrease) {
            // 清除之前的计时器
            if (this.timer) clearInterval(this.timer);
            // 设置计时器，每 0.02 秒执行一次
            this.timer = setInterval(() => {
                // 根据移入移出状态，增加或减少 themePosX
                if (isIncrease && this.themePosX <522) {
                    this.themePosX += 58;
                } else if (!isIncrease && this.themePosX > 0) {
                    this.themePosX -= 58;
                } else {
                    // 达到最大步数或者达到最大/最小位置时停止计时器
                    clearInterval(this.timer);
                }
            }, 20);
        },

        // 点击导航栏跳转页面
        clickNavItem(path) {
            const absPath = `/space/${this.$route.params.uid}${path}`;
            if (this.$route.path === absPath) return;
            this.$router.push(absPath);
        },

        // 处理大于一万的数字
        handleNum(number) {
            return handleNum(number);
        },

        // 计算用户等级
        handleLevel(exp) {
            return handleLevel(exp);
        },

        noPage() {
            ElMessage.warning("该功能暂未开放");
        },
    },
    async created() {
        if (this.$route.path === "/space" || this.$route.path === "/space/") {
            if (localStorage.getItem("teri_token")) {
                try {
                    // 解析JWT获取当前用户uid
                    const w = localStorage.getItem("teri_token").split('.')[1];
                    const info = JSON.parse(atob(w));
                    this.$router.push(`/space/${info.sub}`);
                } catch (e) {
                    console.log("atob exception:", e)
                    this.$router.push("/");
                }
            } else {
                this.$router.push("/");
            }
        } else {
            // 判断路由参数合法性
            const uid = Number(this.$route.params.uid);
            if (uid && uid !== 0) {
                await this.getUserFavList(uid);
                await this.getUserInfo(uid);
                await this.getUserWorksCount(uid);
            } else {
                this.$router.push('/notfound');
            }
        }
    },
    mounted() {
        this.mounted = true;
    },
    watch: {
        async "$route.params.uid"(curr) {
            if (!curr) return;
            // 判断路由参数合法性
            const uid = Number(curr);
            if (uid && uid !== 0) {
                await this.getUserFavList(uid);
                await this.getUserInfo(uid);
                await this.getUserWorksCount(uid);
            } else {
                this.$router.push('/notfound');
            }
        }
    },
    beforeRouteEnter(to, from, next) {
        // 设置全局背景
        let apps = document.querySelectorAll('#app');
        apps.forEach(element => {
            element.style.cssText = 'background-color: #fafafa;';
        });
        next();
    },
}
</script>

<style scoped>
.space-container {
    width: auto;
    padding: 64px 0px 0px;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    flex-direction: column;
    box-sizing: content-box;
    position: relative;
}

.h {
    position: relative;
    z-index: 10;
}

.wrapper {
    width: 1101px;
    margin: 0 auto;
    position: relative;
}

@media (min-width: 1420px) {
    .wrapper {
        width: 1283px !important;
    }
}


.h-forbid {
    height: 42px;
    margin: 10px 0;
    background-color: #e5e9ef;
    border-radius: 4px;
}

.h-forbid .f-wrap {
    width: 203px;
    margin: 0 auto;
}

.h-forbid .f-wrap .f-icon {
    background-image: url('~assets/img/bilibili/icons1.png');
    background-position: -664px -458px;
    display: inline-block;
    width: 80px;
    height: 42px;
    margin-right: 20px;
}

.h-forbid .f-wrap .f-txt {
    font-size: 14px;
    color: #222;
    line-height: 42px;
    display: inline-block;
    vertical-align: top;
}

.h-inner {
    background-image: url('https://tinypic.host/images/2023/11/15/69PB2Q5W9D2U7L.png');
    background-position: 50%;
    background-size: cover;
    transition: background-image .2s ease, background-size 1s ease;
    padding-top: 116px;
    position: relative;
}

.h-gradient {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 84px;
    background-image: url('~assets/img/bg_shadow.png');
    background-repeat: repeat-x;
}

.h-user {
    position: relative;
    z-index: 1;
}

.h-info {
    margin-left: 20px;
    padding-bottom: 16px;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-align: center;
    align-items: center;
}

.avatar-container {
    position: relative;
}

.avatar-container /deep/ .v-avatar>img {
    border: 2px solid hsla(0, 0%, 100%, .4);
    box-sizing: initial;
}

.avatar-cover {
    position: absolute;
    top: 0;
    left: 0;
    width: 60px;
    height: 60px;
    background: rgba(0, 0, 0, .6);
    font-size: 12px;
    color: #fff;
    line-height: 60px;
    text-align: center;
    opacity: 0;
    border-radius: 50%;
    transition: opacity .2s;
}

.avatar-container:hover .avatar-cover {
    opacity: 1;
}

.h-basic {
    margin-left: 22px;
}

.basic-top {
    display: inline-flex;
    align-items: center;
}

.h-name {
    display: inline-block;
    margin-right: 5px;
    font-weight: 700;
    line-height: 18px;
    font-size: 18px;
    vertical-align: middle;
    color: #fff;
}

.icon {
    vertical-align: middle;
    background-repeat: no-repeat;
    display: inline-block;
    background-image: url('~assets/img/bilibili/icons1.png');
}

.gender {
    display: none;
    width: 21px;
    height: 18px;
    margin-right: 5px;
    vertical-align: middle;
    background-position: -212px -922px;
}

.gender.male {
    display: inline-block;
    background-position: -212px -472px;
}

.gender.female {
    display: inline-block;
    background-position: -211px -404px;
}

.vip-tag {
    display: inline-block;
    box-sizing: border-box;
    max-width: 58px;
    height: 16px;
    color: #fff;
    background: var(--brand_pink);
    border-radius: 2px;
    line-height: 16px;
    font-size: 10px;
    padding: 0 3px;
    margin-left: 10px;
    overflow: hidden;
    white-space: nowrap;
    cursor: pointer;
}

.basic-bottom {
    margin-top: 6px;
}

.h-sign {
    background: transparent;
    border-radius: 4px;
    border: none;
    box-shadow: none;
    color: hsla(0, 0%, 100%, .8);
    font-size: 12px;
    font-family: Microsoft Yahei;
    line-height: 26px;
    height: 26px;
    margin-left: -5px;
    padding: 0 5px;
    position: relative;
    top: -1px;
    width: 730px;
    font-weight: 400;
}

.h-action {
    position: absolute;
    bottom: 0;
    right: 0;
    z-index: 1;
}

.be-dropdown {
    position: relative;
    display: inline-block;
    cursor: pointer;
}

.h-f-btn {
    background: rgba(0, 0, 0, .45);
    box-shadow: 0 0 0 2px hsla(0,0%,100%,.3);
    border-radius: 4px;
    color: #fff;
    cursor: pointer;
    font-size: 14px;
    float: left;
    text-align: center;
    margin: 0 20px 17px 0;
    width: 76px;
    line-height: 30px;
}

.h-f-btn:hover {
    background: rgba(0, 0, 0, .5);
}

.h-follow {
    background: #f25d8e;
    box-shadow: 0 0 0 2px #fff;
    color: #fff;
}

.h-follow:hover {
    background: #ff85ad;
}

.h-add-to-black {
    float: left;
    height: 30px;
    width: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.h-add-to-black .icon-gengduo {
    color: #fff;
    font-size: 20px;
}

.space-theme-trigger {
    background-image: url('~assets/img/bilibili/theme-trigger-new.png');
    background-position: 0px 0px;
    cursor: pointer;
    width: 58px;
    height: 49px;
    transition: opacity .2s ease;
    position: absolute;
    top: 0;
    right: 0;
}

.space-theme {
    transition: bottom .4s ease;
    position: fixed;
    left: 0;
    bottom: -600px;
    width: 100%;
    z-index: 1000;
    background: rgba(0, 0, 0, .8);
    color: #fff;
}

.space-theme.theme-show {
    bottom: 0;
}

.theme-header {
    line-height: 52px;
    height: 52px;
}

.theme-header-title {
    font-size: 18px;
    margin-left: 130px;
}

.theme-close {
    position: absolute;
    width: 25px;
    height: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    right: 120px;
    top: 14px;
    cursor: pointer;
}

.theme-close .icon-close {
    font-size: 25px;
}

.theme-panel {
    background: #111;
    padding: 25px 0 15px;
    position: relative;
}

.theme-list {
    position: relative;
    height: 280px;
    overflow: hidden;
}

.n {
    margin-bottom: 10px;
}

.n-inner {
    height: 66px;
    background: #fff;
    box-shadow: 0 0 0 1px #eee;
    border-radius: 0 0 4px 4px;
    padding: 0 20px;
    font-size: 0;
    font-family: PingFang SC, Helvetica Neue, Microsoft YaHei, sans-serif;
}

.n-tab-links {
    display: inline-block;
    vertical-align: middle;
}

.n-btn {
    display: inline-flex;
    align-items: center;
    font-size: 0;
    line-height: 66px;
    margin-right: 20px;
    position: relative;
    transition: color .2s ease, background-color .2s ease;
    cursor: pointer;
}

.n-btn svg {
    margin-right: 3px;
}

.n-btn.active, .n-btn:hover {
    color: #ff76a2;
}

.n-text {
    font-size: 13px;
}

.n-num {
    margin-left: 5px;
    font-size: 12px;
    color: #99a2aa;
    font-family: Arial;
}

.n-num, .n-text {
    vertical-align: middle;
}

.n-statistics {
    float: right;
    height: 66px;
}

.n-data {
    display: -ms-flexbox;
    display: flex;
    -ms-flex-direction: column;
    flex-direction: column;
    -ms-flex-pack: center;
    justify-content: center;
    float: left;
    height: 66px;
    padding: 10px 5px;
    text-align: center;
    box-sizing: border-box;
}

.n-data .n-data-k {
    line-height: 14px;
    font-size: 12px;
    color: #99a2aa;
}

.n-data .n-data-v {
    line-height: 16px;
    margin-top: 5px;
    color: #222;
    font-size: 12px;
}

.n-data.active .n-data-k, .n-data.active .n-data-v {
    color: #ff76a2;
}

.n-follow, .n-fans {
    cursor: pointer;
}

.n-follow:hover p, .n-fans:hover p {
    color: #ff76a2;
}

.n-cursor {
    background: #ff76a2;
    width: 0;
    height: 3px;
    transition: all .2s ease;
    position: absolute;
    bottom: -1px;
    left: 0;
}

.col-full {
    background: #fff;
    box-shadow: 0 0 0 1px #eee;
    border-radius: 4px;
    position: absolute;
}

.contribution-sidenav {
    position: relative;
    float: left;
    width: 180px;
    margin-right: -1px;
    font-size: 14px;
    color: #222;
    border-right: 1px solid #eee;
    box-sizing: border-box;
}

.contribution-list-container {
    position: relative;
    max-height: 420px;
    margin: 10px 0 20px;
    overflow: hidden;
}

ol, ul {
    list-style: none;
}

.contribution-item {
    position: relative;
    padding-left: 30px;
    transition: background-color .3s ease;
    white-space: nowrap;
    font-size: 0;
    overflow: hidden;
    cursor: pointer;
}

.contribution-item:hover {
    background-color: #f4f5f7;
}

.contribution-item.cur {
    background-color: #FF7DA1;
}

.contribution-sidenav .text {
    display: inline-block;
    line-height: 44px;
    width: 100px;
    margin-right: 5px;
    font-size: 14px;
    vertical-align: middle;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.contribution-sidenav .num {
    display: inline-block;
    width: 32px;
    font-size: 12px;
    color: #99a2aa;
    vertical-align: middle;
    text-align: center;
    font-family: Arial;
}

.contribution-item.cur .num, .contribution-item.cur .text {
    color: #fff;
}

.main-content {
    float: left;
    width: 921px;
    padding: 20px;
    box-sizing: border-box;
    border-left: 1px solid #eee;
    min-height: 600px;
}

@media (min-width: 1420px) {
    .contribution-sidenav {
        width: 210px;
    }

    .contribution-item .text {
        width: 130px;
    }

    .main-content {
        width: 1071px;
    }
}
</style>