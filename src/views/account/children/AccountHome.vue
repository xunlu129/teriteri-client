<template>
    <div class="account-home">
        <div class="index-info">
            <div class="home-head">
                <img :src="user.avatar_url" alt="">
                <a :href="`/space/${user.uid}`" target="_blank" class="gotoSpace">个人空间</a>
            </div>
            <div class="home-right">
                <div class="home-top-msg">
                    <span class="home-top-msg-name" :class="user.vip !== 0 ? 'vip-name' : ''">{{ user.nickname }}</span>
                    <span class="home-user-spec"  v-if="user.vip !== 0">
                        {{ user.vip === 1 ? '月度' : user.vip === 2 ? '季度' : '年度' }}大会员
                    </span>
                    <span class="home-userstatus">正式会员</span>
                </div>
                <div class="home-top-level">
                    <span class="home-top-level-all">
                        <div class="home-top-progress-wrap">
                            <span class="home-top-level-head home-top-level-head-active">LV{{ handleLevel(user.exp) }}</span>
                            <span class="home-top-level-up">
                                <span class="home-top-level-upgo" :style="`width: ${user.exp > 28800 ? 100 : (user.exp / 288)}%;`"></span>
                            </span>
                            <div class="home-top-level-mask-warp">
                                <span class="home-level-mask-icon"></span>
                                <span class="home-level-mask-top"></span>
                            </div>
                        </div>
                        <span class="home-top-level-number">
                            <span class="now-num">{{ user.exp }}</span>
                            <span class="num-icon">/</span>
                            <span class="max-num">28800</span>
                        </span>
                        <span class="home-to-update" @click="$router.push('/account/info')">修改资料</span>
                        <a :href="`/space/${user.uid}`" target="_blank" class="home-to-space">
                            个人空间
                            <i class="iconfont icon-youjiantou"></i>
                        </a>
                    </span>
                </div>
                <div class="home-top-bp">
                    <svg t="1710611952926" class="coin" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5929" width="20" height="20"><path d="M512 977.455C254.93 977.455 46.545 769.07 46.545 512S254.93 46.545 512 46.545 977.455 254.93 977.455 512A465.455 465.455 0 0 1 512 977.455zM367.942 246.039a33.233 33.233 0 0 0 0 66.467h288.116a33.233 33.233 0 0 0 0-66.467H367.942zM545.28 369.245v-56.739h-66.56v56.786a210.106 210.106 0 0 0-199.447 209.175v44.311a33.233 33.233 0 0 0 66.513 0v-44.311a143.64 143.64 0 0 1 132.98-142.755v310.319a33.233 33.233 0 1 0 66.467 0V435.759a143.64 143.64 0 0 1 132.98 142.754v44.312a33.233 33.233 0 0 0 66.514 0v-44.312a210.106 210.106 0 0 0-199.494-209.268z" p-id="5930"></path></svg>
                    <span class="curren-b-num">{{ user.coin }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { handleLevel } from '@/utils/utils.js';

export default {
    name: "AccountHome",
    computed: {
        user() {
            return this.$store.state.user;
        }
    },
    methods: {
        // 计算用户等级
        handleLevel(exp) {
            return handleLevel(exp);
        },
    }
}
</script>

<style scoped>
.account-home {
    padding: 50px 20px 0;
    width: 829px;
}

.index-info {
    border-bottom: 1px solid #e5e9ef;
    padding-bottom: 40px;
    position: relative;
}

.home-head {
    display: inline-block;
    vertical-align: top;
    position: relative;
    cursor: pointer;
    width: 64px;
    height: 64px;
    border-radius: 50%;
    overflow: hidden;
}

.home-head img {
    width: 100%;
    height: 100%;
}

.gotoSpace {
    position: absolute;
    text-align: center;
    width: 64px;
    height: 64px;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, .66);
    font-size: 12px;
    color: #fff;
    border-radius: 64px;
    line-height: 64px;
    cursor: pointer;
    display: none;
}

.home-head:hover .gotoSpace {
    display: block;
}

.home-right {
    display: inline-block;
    margin-left: 16px;
    width: 684px;
}

.home-top-msg {
    display: flex;
    align-items: center;
}

.home-top-msg-name {
    display: inline-block;
    font-size: 18px;
    font-weight: 700;
    color: var(--text1);
    margin-right: 8px;
    cursor: default;
}

.home-user-spec {
    background-color: #fb7299;
    color: #fff;
    border-radius: 4px;
    display: inline-block;
    cursor: pointer;
}

.home-userstatus {
    border: 1px solid #99a2aa;
    margin: 0 8px;
    color: #99a2aa;
    border-radius: 4px;
    cursor: default;
}

.home-user-spec, .home-userstatus {
    font-size: 12px;
    box-sizing: border-box;
    padding: 2px 4px;
}

.home-top-level {
    position: relative;
}

.home-top-level-all {
    display: inline-flex;
    align-items: center;
    width: 684px;
    margin-top: 10px;
    height: 24px;
}

.home-top-progress-wrap {
    display: inline-flex;
    position: relative;
}

.home-top-level-head {
    width: 62px;
    height: 24px;
    font-weight: 700;
    color: #fff;
    padding-left: 10px;
    font-size: 12px;
    line-height: 24px;
    cursor: default;
    display: inline-block;
    background: url('~assets/img/bilibili/icons.png') no-repeat;
}

.home-top-level-head-active {
    background-position: -264px -852px;
}

.home-top-level-up {
    width: 280px;
    height: 24px;
    line-height: 24px;
    background-color: #e5e9ef;
    margin-left: -15px;
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
    display: inline-block;
    position: relative;
    text-indent: -9999px;
    text-align: center;
}

.home-top-level-upgo {
    position: absolute;
    top: 0;
    left: 0;
    background-color: #ff905a;
    width: 0;
    height: 24px;
    transition: all .3s ease-in-out;
    transition-delay: .3s;
    border-radius: 0 4px 4px 0;
}

.home-top-level-number {
    height: 24px;
    color: #99a2aa;
    margin-left: 8px;
    font-size: 12px;
    line-height: 24px;
    cursor: default;
}

.now-num {
    color: var(--text1);
}

.num-icon {
    margin: 0 2px;
}

.home-to-update {
    right: 90px;
    line-height: 20px;
    font-size: 12px;
}

.home-to-space {
    right: 0;
    display: inline-flex;
    justify-content: center;
}

.home-to-space .icon-youjiantou {
    font-size: 12px;
}

.home-to-space, .home-to-update {
    position: absolute;
    top: 8px;
    width: 84px;
    height: 24px;
    display: inline-block;
    border-radius: 4px;
    border: 1px solid #ced3db;
    color: #6d757a;
    text-align: center;
    cursor: pointer;
    line-height: 23px;
    font-size: 12px;
}

.home-to-space:hover, .home-to-update:hover {
    border: 1px solid var(--brand_pink);
    color: var(--brand_pink);
}

.home-top-bp {
    margin-top: 15px;
}

.coin {
    display: inline-block;
    width: 20px;
    height: 20px;
    margin-right: 8px;
    fill: var(--brand_pink);
}

.curren-b-num {
    display: inline-block;
    height: 20px;
    margin-right: 12px;
    line-height: 20px;
    font-size: 14px;
    color: var(--text1);
    cursor: default;
    vertical-align: top;
}
</style>