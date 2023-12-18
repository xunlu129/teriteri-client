<template>
    <div class="message-view">
        <HeaderBar :isFixHeaderBar="true"></HeaderBar>
        <div class="message-container">
            <div class="message-layout">
                <div class="space-left">
                    <div class="side-bar">
                        <div class="side-header">
                            <svg t="1701870232458" class="icon" viewBox="0 0 1365 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4331" id="mx_n_1701870232459" width="16" height="16"><path d="M89.09123487 374.73827276c-61.1227081 17.17435635 0.37498623 68.09744619 0.37498622 68.09744618l207.21722871 151.19433018 644.97581368-333.58749082s-435.73365967 293.23900371-568.62867656 383.98560029l449.08315927 296.98886339c71.02233633 40.87346748 89.5466417 8.24969092 89.54664258 8.24969091l31.19882959-64.87256777L1259.49734492 114.87301719c11.92455263-26.77399629-21.52419258-57.37284844-57.44784638-52.34803682L89.09123487 374.73827276z m404.53483007 406.70974774a14.99943779 14.99943779 0 0 0-0.4499833-23.99909941l-112.49578125-81.37194872a14.99943779 14.99943779 0 0 0-23.77410908 12.59952714l5.39979785 164.84381807a14.99943779 14.99943779 0 0 0 24.14909443 11.32457607l107.17098135-83.39687315z" fill="#515151" p-id="4332"></path></svg>
                            <div>消息中心</div>
                        </div>
                        <ul class="side-list">
                            <li class="item" :class="{'active': routerIndex === index}" 
                                v-for="(item, index) in router" :key="index"
                                @click="this.$router.push(item.path)"
                            >
                                <div class="text">
                                    {{ item.name }}
                                    <span class="notify notify-number" v-if="this.$store.state.user.uid && this.$store.state.msgUnread[index] > 0">
                                        {{ this.$store.state.msgUnread[index] <= 99 ? this.$store.state.msgUnread[index] : '99+' }}
                                    </span>
                                </div>
                            </li>
                        </ul>
                        <div class="divided-line"></div>
                        <div class="setting">
                            <div class="item" :class="{'active': routerIndex === 5}" @click="this.$router.push('/message/config')">
                                <svg t="1701876122651" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4545" width="12" height="12"><path d="M882.34150875 504.54345955c0-49.57218555 27.61681646-93.75909188 71.66563872-110.19109768-22.09345317-77.18900202-66.14227541-148.85464074-121.23782427-203.95018957-38.52545897 27.61681646-93.62100781 33.00209567-137.80791415 11.0467266-44.04882225-27.61681646-66.14227541-71.66563872-60.61891213-121.23782427-38.52545897-11.04672658-82.7123653-16.57008987-121.23782427-16.57008988-44.04882225 0-82.7123653 5.5233633-121.23782426 16.57008988 5.5233633 44.04882225-16.57008987 93.62100781-60.61891212 121.23782427s-99.14437109 22.09345317-137.80791414-11.0467266c-55.09554883 55.09554883-99.14437109 126.76118755-121.23782426 203.95018957 44.04882225 16.57008987 71.66563872 60.61891214 71.66563872 110.19109768s-27.61681646 93.62100781-71.66563872 110.19109769c22.09345317 77.18900202 66.14227541 148.85464074 121.23782426 203.95018957 38.52545897-27.61681646 93.62100781-33.00209567 137.80791414-11.0467266 44.04882225 27.61681646 66.14227541 71.66563872 60.61891212 121.23782426 38.52545897 11.04672658 82.7123653 16.57008987 121.23782426 16.5700899 44.04882225 0 82.7123653-5.5233633 121.23782427-16.5700899-5.5233633-44.04882225 16.57008987-93.62100781 60.61891213-121.23782426s99.14437109-22.09345317 137.80791415 11.0467266c55.09554883-55.09554883 99.14437109-126.76118755 121.23782427-203.95018957-44.18690634-16.43200579-71.66563872-60.61891214-71.66563872-110.19109769zM513.10467265 686.40019595c-104.66773438 0-187.3800997-82.7123653-187.38009967-181.8567364 0-99.14437109 82.7123653-181.85673639 187.38009967-181.85673638 104.66773438 0 187.3800997 82.7123653 187.3800997 181.85673638-0.13808409 99.28245518-82.7123653 181.85673639-187.3800997 181.8567364z m0-71.66563871c60.8950803 0 110.19109769-49.29601739 110.19109769-110.19109769 0-60.8950803-49.29601739-110.19109769-110.19109769-110.19109768-60.8950803 0-110.19109769 49.29601739-110.19109768 110.19109768-0.13808409 60.8950803 49.29601739 110.19109769 110.19109768 110.19109769z m0 0" p-id="4546"></path></svg>
                                消息设置
                            </div>
                        </div>
                    </div>
                </div>
                <div class="space-right">
                    <div class="space-right-top">
                        <div class="title">
                            <span>{{ router[routerIndex] ? router[routerIndex].name : "消息设置" }}</span>
                        </div>
                    </div>
                    <div class="space-right-bottom">
                        <div class="message-router-view">
                            <router-view></router-view>
                        </div>                        
                    </div>
                </div>                
            </div>            
        </div>
    </div>
</template>

<script>
import HeaderBar from '@/components/headerBar/HeaderBar.vue';

export default {
    name: "MessageView",
    components: {
        HeaderBar,
    },
    data() {
        return {
            router: [
                { path: '/message/reply', name: '回复我的' },
                { path: '/message/at', name: '@ 我的' },
                { path: '/message/love', name: '收到的赞' },
                { path: '/message/system', name: '系统通知' },
                { path: '/message/whisper', name: '我的消息' },
            ],
        }
    },
    computed: {
        // 根据当前路由计算路由列表下标
        routerIndex() {
            let i = this.router.findIndex(item => this.$route.path.startsWith(item.path));
            if (i === -1) {
                return 5;
            } else {
                return i;
            }
        }
    },
    beforeRouteEnter(to, from, next) {
        // 设置全局背景
        const backgroundImage = require('@/assets/img/message-bg.png');
        document.body.style.cssText = `background: url(${backgroundImage}) top/cover no-repeat fixed;`;
        // document.documentElement.style.overflow = 'hidden';
        let apps = document.querySelectorAll('#app');
        apps.forEach(element => {
            element.style.cssText = 'background-color: transparent;';
        });
        next();
    },
    beforeRouteLeave(to, from, next) {
        // 检查是否是进入子页面
        if (to.path.startsWith(this.$route.path)) {
            // 如果是进入子页面，不移除背景图
            next(false);
        } else {
            // 如果是离开 MessageView.vue 页面，移除背景图
            document.body.style.cssText = "";
            next();
        }
    },
    watch: {
        // 监听登录状态
        "$store.state.isLogin"(curr) {
            if (!curr) {
                this.$router.push('/');
            }
        }
    }
}
</script>

<style scoped>
.message-container {
    height: calc(100vh - 64px);
    width: 1143px;
    max-width: 1143px;
    display: flex;
    -webkit-box-orient: horizontal;
    -webkit-box-direction: normal;
    flex-direction: row;
    -webkit-box-align: stretch;
    align-items: stretch;
    margin: 64px auto 0px;
}

.message-layout {
    margin: 0 auto;
    max-width: 1143px;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: horizontal;
    -webkit-box-direction: normal;
    -ms-flex-direction: row;
    flex-direction: row;
    -webkit-box-align: stretch;
    -ms-flex-align: stretch;
    align-items: stretch;
    width: 100%;
}

.space-left {
    width: 140px;
    min-width: 140px;
    background-color: rgba(255,255,255,0.8);
}

.side-bar {
    width: 100%;
    font-size: 14px;
    font-weight: 600;
    color: #666;
}

.side-header {
    height: 62px;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    color: #333;
    fill: #333;
}

.side-header .icon {
    margin-right: 10px;
}

.side-list {
    margin: 0;
    padding: 0 0 0 20px;
}

.item {
    height: 40px;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    position: relative;
    color: #6b757b;
    fill: #6b757b;
    cursor: pointer;
}

.item::before {
    width: 10px;
    height: 20px;
    text-align: center;
}

.item:hover, .item.active,.item:hover .text, .item.active .text {
    color: var(--brand_pink);
    fill: var(--brand_pink);
}

li::before {
    content: "\25cf";
    line-height: 20px;
    font-size: 9px;
}

.item .text {
    padding-left: 10px;
    line-height: 40px;
    -webkit-box-flex: 1;
    -ms-flex: 1;
    flex: 1;
    color: #6b757b;
    font-weight: 600;
}

.divided-line {
    border-top: 1px solid #fff;
    margin: 10px 0;
}

.setting {
    padding-left: 20px;
    position: relative;
}
.notify {
    text-align: center;
    color: #fff;
    position: absolute;
    -webkit-transition: width 200ms, height 200ms, top 200ms, right 200ms;
    transition: width 200ms, height 200ms, top 200ms, right 200ms;
}

.notify-number {
    background-color: var(--stress_red);
    line-height: 16px;
    height: 16px;
    font-size: 12px;
    border-radius: 10px;
    width: 28px;
    top: 12px;
    right: 11px;
    font-weight: 500;
}

.setting .icon {
    margin-right: 8px;
}

.space-right {
    width: calc(100% - 140px);
    -webkit-box-flex: 1;
    -ms-flex: 1;
    flex: 1;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
    background-color: rgba(255,255,255,0.5);
}

.space-right-top {
    padding: 10px 10px 0;
    z-index: 11;
}

.title {
    height: 42px;
    background-color: #fff;
    -webkit-box-shadow: 0 2px 4px 0 rgba(121,146,185,0.54);
    box-shadow: 0 2px 4px 0 rgba(121,146,185,0.54);
    -ms-flex-negative: 0;
    flex-shrink: 0;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;
    padding: 0 16px;
    font-size: 15px;
    color: #666;
    border-radius: 4px;
}

.space-right-bottom {
    padding: 10px;
    position: relative;
    -webkit-box-flex: 1;
    -ms-flex: 1;
    flex: 1;
    height: calc(100% - 66px);
    overflow: hidden;
}

@media screen and (max-width: 1400px) {
    .message-container, .message-layout {
        width: 980px;
    }
}
</style>