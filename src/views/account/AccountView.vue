<template>
    <div class="account">
        <HeaderBar :isFixHeaderBar="true"></HeaderBar>
        <div class="account-layout">
            <div class="top-header">
                <div class="top-img">
                    <img src="~assets/img/teriteri-white.png" alt="">
                </div>
            </div>
            <div class="account-container">
                <div class="account-left">
                    <span class="account-title">个人中心</span>
                    <ul class="account-ul">
                        <li class="account-item" :class="{'on': activeIdx === 0}" @click="clickBarItem(navList[0].path, 0)">
                            <svg t="1710594508716" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4478" width="18" height="18"><path d="M949.1 489.8L590.4 131.1c-43.2-43.2-113.5-43.2-156.8 0L74.9 489.8c-14.6 14.6-14.6 38.3 0 52.9 14.6 14.6 38.3 14.6 52.9 0l4.9-4.9v276.7c0 61.1 49.7 110.8 110.8 110.8h536.8c61.1 0 110.8-49.7 110.8-110.8V537.8l4.9 4.9c7.3 7.3 16.9 11 26.5 11s19.2-3.7 26.5-11c14.7-14.6 14.7-38.3 0.1-52.9zM816.4 814.5c0 19.8-16.1 36-36 36H243.6c-19.8 0-36-16.1-36-36V463l279-279c14-14 36.8-14 50.9 0l278.9 279v351.5z" p-id="4479"></path><path d="M351 553.1c-9.7-18.3-32.3-25.2-50.6-15.6-18.3 9.7-25.2 32.3-15.6 50.6 47.9 90.5 132.8 144.5 227.2 144.5s179.3-54 227.2-144.5c9.7-18.3 2.7-40.9-15.6-50.6-18.3-9.7-40.9-2.7-50.6 15.6-34.7 65.5-94.9 104.7-161 104.7s-126.3-39.2-161-104.7z" p-id="4480"></path></svg>
                            <span class="item-name">首<b style="width:28px; display:inline-block"></b>页</span>
                        </li>
                        <li class="account-item" :class="{'on': activeIdx === 1}" @click="clickBarItem(navList[1].path, 1)">
                            <svg t="1710596444032" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5186" width="18" height="18"><path d="M573.05 492.78c30.32-37.9 47.09-84.97 47.09-134.53 0-119.25-97.01-216.26-216.25-216.26-119.25 0-216.26 97.01-216.26 216.26 0 50.35 17.27 98 48.46 136.17C132.1 554.52 67.1 665.05 67.1 787.51v31.91c0 34.66 28.19 62.85 62.85 62.85H682.2c34.66 0 62.85-28.19 62.85-62.85v-31.91c0-123.9-66.18-235.1-172-294.73zM682.2 817.93l-550.77 1.49v-31.91c0-112.16 67.37-212.02 171.64-254.39l51.51-20.93-43.82-34.22c-37.37-29.18-58.8-72.82-58.8-119.72 0-83.77 68.15-151.92 151.92-151.92 83.76 0 151.91 68.15 151.91 151.92 0 46.39-20.99 89.7-57.58 118.82l-43.55 34.66 51.77 20.43c105.87 41.79 174.28 142.02 174.28 255.35l1.49 30.42zM713.14 360.69h211.79c17.77 0 32.17-14.4 32.17-32.17s-14.4-32.17-32.17-32.17H713.14c-17.77 0-32.17 14.4-32.17 32.17s14.41 32.17 32.17 32.17zM924.93 449.76H713.14c-17.77 0-32.17 14.4-32.17 32.17 0 17.77 14.4 32.17 32.17 32.17h211.79c17.77 0 32.17-14.4 32.17-32.17 0-17.77-14.4-32.17-32.17-32.17zM924.93 603.16H806.41c-17.77 0-32.17 14.4-32.17 32.17s14.4 32.17 32.17 32.17h118.52c17.77 0 32.17-14.4 32.17-32.17s-14.4-32.17-32.17-32.17z" p-id="5187"></path></svg>
                            <span class="item-name">我的信息</span>
                        </li>
                        <li class="account-item" :class="{'on': activeIdx === 2}" @click="clickBarItem(navList[2].path, 2)">
                            <svg t="1710596480833" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5539" width="18" height="18"><path d="M243.05652178 782.58695644A303.33913067 303.33913067 0 0 1 512 619.60869599c114.90652177 0 217.56521778 64.48695644 268.96304355 162.97826045A380.34782578 380.34782578 0 0 0 893.52173955 512h58.69565157c0 243.11739112-197.1 440.21739112-440.21739112 440.21739112S71.78260888 755.11739112 71.78260888 512 268.88260888 71.78260888 512 71.78260888c179.13913067 0 338.34130401 108 406.29130401 270.46956534l-54.15652178 22.63695644A381.6 381.6 0 0 0 512 130.47826045C301.28260888 130.47826045 130.47826045 301.28260888 130.47826045 512a380.34782578 380.34782578 0 0 0 112.57826133 270.58695644z m46.17391289 39.16956533A379.8 379.8 0 0 0 512 893.52173955c83.15217422 0 160.08260888-26.60869599 222.76956533-71.76521778a244.66304355 244.66304355 0 0 0-445.53913066 0zM512 571.55652178a146.73913067 146.73913067 0 1 1 0-293.47826133 146.73913067 146.73913067 0 0 1 0 293.47826133z m0-58.69565245a88.04347823 88.04347823 0 1 0 0-176.08695644 88.04347823 88.04347823 0 0 0 0 176.08695645z" p-id="5540"></path></svg>
                            <span class="item-name">我的头像</span>
                        </li>
                        <li class="account-item" :class="{'on': activeIdx === 3}" @click="clickBarItem(navList[3].path, 3)">
                            <svg t="1710596501350" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5734" width="18" height="18"><path d="M889.27 274.19v315.99c0 2.37-0.17 4.81-0.57 7.12-27.02 168.99-237.79 301.29-327.12 350.36-15.6 8.48-32.62 12.72-49.58 12.72-17.13 0-34.21-4.3-49.75-12.89-88.59-49.07-297.67-181.37-324.58-350.36a228.499 228.499 0 0 1-2.94-36.47l0.06-286.64c0-47.77 32.45-88.93 78.98-100.07C297.5 154 391.91 117.02 460.21 77.44c32.11-18.6 72.03-18.43 104.2 0.45 39.86 23.35 87.24 45.34 136.99 63.55 23.46 8.59 35.51 34.6 26.91 58.06-8.59 23.41-34.6 35.51-58.06 26.91-54.73-20.07-107.14-44.44-151.58-70.5-4.18-2.43-9.05-2.49-13.12-0.17-75.36 43.7-179.11 84.35-270.76 106.18-5.6 1.36-9.55 6.33-9.55 12.1l-0.06 286.64c0 7.35 0.57 14.64 1.81 22.28 21.26 133.26 218.97 252.16 279.07 285.4 3.73 2.09 8.26 2.04 12.04 0 60.04-32.96 256.68-150.22 280.71-282.01V383.2L543.6 638.24a45.148 45.148 0 0 1-31.94 13.23c-12.04 0-23.52-4.75-32-13.23L312.82 471.4c-17.64-17.64-17.64-46.3 0-63.94 17.64-17.7 46.3-17.7 63.94 0l134.9 134.84 300.16-299.99c0.56-0.57 1.19-1.13 1.81-1.58 1.07-0.96 2.2-1.92 3.33-2.77 1.19-0.85 2.37-1.7 3.62-2.43 1.07-0.68 2.2-1.3 3.39-1.87 2.32-1.19 4.75-2.09 7.24-2.83 3.63-1.11 7.46-1.64 11.41-1.76 0.12 0 0.24-0.02 0.37-0.03 0.36-0.01 0.7-0.08 1.06-0.08 24.98 0 45.22 20.24 45.22 45.23z" p-id="5735"></path></svg>
                            <span class="item-name">账号安全</span>
                        </li>
                    </ul>
                    <ul class="account-ul">
                        <li class="account-item-jump">
                            <a :href="`/space/${this.$store.state.user.uid}`" target="_blank" class="jump-link">
                                个人空间
                                <i class="iconfont icon-youjiantou"></i>
                            </a>
                        </li>
                        <li class="account-item-jump">
                            <a :href="`/platform`" target="_blank" class="jump-link">
                                创作中心
                                <i class="iconfont icon-youjiantou"></i>
                            </a>
                        </li>
                    </ul>
                </div>
                <div class="account-right">
                    <router-view></router-view>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import HeaderBar from '@/components/headerBar/HeaderBar.vue';

export default {
    name: "AccountView",
    components: {
        HeaderBar,
    },
    data() {
        return {
            // 导航栏列表
            navList: [
                { name: "首    页", path: '/account/home' },
                { name: "我的信息", path: '/account/info' },
                { name: "我的头像", path: '/account/avatar' },
                { name: "账号安全", path: '/account/security' },
            ],
            activeIdx: 0,
        }
    },
    methods: {
        clickBarItem(path, index) {
            this.activeIdx = index;
            this.$router.push(path);
        }
    },
    created() {
        // 根据地址判断 activeIdx
        this.navList.forEach((item, index) => {
            if (this.$route.path.startsWith(item.path)) {
                this.activeIdx = index;
            }
        });
    },
    watch: {
        // 监听登录状态
        "$store.state.isLogin"(curr) {
            if (!curr) {
                this.$router.push('/');
            }
        },
        "$route.path"(curr) {
            this.navList.forEach((item, index) => {
                if (curr.startsWith(item.path)) {
                    this.activeIdx = index;
                }
            });
        }
    }
}
</script>

<style scoped>
.account {
    min-height: 100vh;
}

.account-layout {
    padding: 64px 0 50px;
    position: relative;
}

.top-header {
    width: 100%;
    height: 106px;
    background: url('~assets/img/account_top_bg.png') repeat-x;
}

.top-img {
    width: 980px;
    height: 106px;
    margin: 0 auto;
    background: url('~assets/img/account_top.png') no-repeat;
}

.top-img img {
    height: 60px;
    transform: translateY(15px);
}

.account-container {
    overflow: hidden;
    width: 980px;
    height: 100%;
    margin: 10px auto 0;
    border: 1px solid #e1e2e5;
    box-shadow: 0 2px 4px rgba(0,0,0,.14);
    background: #fafafa;
    border-radius: 4px;
    display: flex;
}

.account-left {
    float: left;
    width: 150px;
    height: 100%;
    overflow: hidden;
}

.account-title {
    display: block;
    width: 150px;
    height: 50px;
    text-align: center;
    line-height: 50px;
    font-size: 16px;
    color: #99a2aa;
    cursor: default;
}

.account-title, .account-ul {
    border-bottom: 1px solid #e1e2e5;
}

.account-ul li {
    overflow: hidden;
}

.account-item {
    width: 150px;
    height: 48px;
    line-height: 48px;
    display: flex;
    align-items: center;
    color: var(--text1);
    fill: var(--text3);
    cursor: pointer;
}

.account-item:hover, .account-item-jump:hover {
    background: #e1e4ea;
}

.account-item.on {
    background-color: #FF7DA1 !important;
    color: #fff !important;
    fill: #fff !important;
}

.account-item svg {
    vertical-align: middle;
    display: inline-block;
    width: 18px;
    height: 36px;
    margin-left: 16px;
}

.item-name {
    margin-left: 12px;
    font-size: 14px;
}

.account-item-jump {
    width: 150px;
    height: 43px;
    border-bottom: 1px solid #e1e2e5;
    position: relative;
}

.jump-link {
    color: var(--text1);
    font-size: 16px;
    text-align: center;
    line-height: 43px;
    display: block;
    height: 100%;
}

.jump-link .icon-youjiantou {
    display: inline-block;
    width: 12px;
    height: 12px;
    position: absolute;
    right: 18px;
}

.account-right {
    float: left;
    width: 829px;
    border-left: 1px solid #ddd;
    background: #fff;
    min-height: calc(100vh - 232px);
}
</style>