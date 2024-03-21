<template>
    <div class="danmu-box" :class="{'is-open': isOpen}">
        <div class="box-header" @click="changeBoxState">
            <div class="arrow">
                <i class="iconfont icon-xiajiantou"></i>
            </div>
            <div class="title">弹幕列表</div>
        </div>
        <div class="box-body" id="danmu-box-body" style="height: 0px;">
            <div :style="`height: ${boxHeight - 44}px; overflow: hidden;`">
                <div class="table-header">
                    <div class="btn-time" @click="resort(sortType === 1 ? 2 : 1)">
                        时间
                        <span class="btn-icon" :style="sortType === 2 ? 'transform: rotate(180deg);' : ''">
                            <svg v-if="sortType === 1 || sortType === 2" t="1703521678193" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4190" id="mx_n_1703521678194" width="100%" height="100%"><path d="M513.14147073 768.58829205c-12.66872461 0-24.8085135-5.09964346-33.67662059-14.14942196L70.7988117 337.4625982c-18.22977994-18.59794446-17.92753049-48.45304726 0.67202119-66.68121997 18.59794446-18.22656391 48.45465606-17.92753049 66.68121997 0.67202117l374.98941787 382.6147692L888.13089019 271.4533994c18.22656391-18.60116048 48.08005952-18.90501713 66.68121996-0.67202117 18.60116048 18.22977994 18.90180111 48.08327553 0.67202117 66.68121997L546.81809132 754.43887009C537.94998425 763.4886486 525.81180415 768.58829205 513.14147073 768.58829205z" p-id="4191"></path></svg>
                        </span>
                    </div>
                    <div class="btn-text" @click="resort(sortType === 3 ? 4 : 3)">
                        弹幕内容
                        <span class="btn-icon" :style="sortType === 4 ? 'transform: rotate(180deg);' : ''">
                            <svg v-if="sortType === 3 || sortType === 4" t="1703521678193" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4190" id="mx_n_1703521678194" width="100%" height="100%"><path d="M513.14147073 768.58829205c-12.66872461 0-24.8085135-5.09964346-33.67662059-14.14942196L70.7988117 337.4625982c-18.22977994-18.59794446-17.92753049-48.45304726 0.67202119-66.68121997 18.59794446-18.22656391 48.45465606-17.92753049 66.68121997 0.67202117l374.98941787 382.6147692L888.13089019 271.4533994c18.22656391-18.60116048 48.08005952-18.90501713 66.68121996-0.67202117 18.60116048 18.22977994 18.90180111 48.08327553 0.67202117 66.68121997L546.81809132 754.43887009C537.94998425 763.4886486 525.81180415 768.58829205 513.14147073 768.58829205z" p-id="4191"></path></svg>
                        </span>
                    </div>
                    <div class="btn-date" @click="resort(sortType === 5 ? 6 : 5)">
                        发送时间
                        <span class="btn-icon" :style="sortType === 6 ? 'transform: rotate(180deg);' : ''">
                            <svg v-if="sortType === 5 || sortType === 6" t="1703521678193" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4190" id="mx_n_1703521678194" width="100%" height="100%"><path d="M513.14147073 768.58829205c-12.66872461 0-24.8085135-5.09964346-33.67662059-14.14942196L70.7988117 337.4625982c-18.22977994-18.59794446-17.92753049-48.45304726 0.67202119-66.68121997 18.59794446-18.22656391 48.45465606-17.92753049 66.68121997 0.67202117l374.98941787 382.6147692L888.13089019 271.4533994c18.22656391-18.60116048 48.08005952-18.90501713 66.68121996-0.67202117 18.60116048 18.22977994 18.90180111 48.08327553 0.67202117 66.68121997L546.81809132 754.43887009C537.94998425 763.4886486 525.81180415 768.58829205 513.14147073 768.58829205z" p-id="4191"></path></svg>
                        </span>
                    </div>
                </div>
                <div class="table-body" :style="`height: ${boxHeight - 115}px;`">
                    <ul class="dm-list">
                        <li class="dm-item" v-for="(item, index) in dmList" :key="index">
                            <div class="dm-info-row" @dblclick="handleDblClick(item.timePoint)">
                                <span class="dm-info-time">{{ handleTimePoint(item.timePoint) }}</span>
                                <span class="dm-info-text" :title="item.content">{{ item.content }}</span>
                                <span class="dm-info-date">{{ handleDateTime(item.createDate) }}</span>
                                <span class="dm-info-report-btn"
                                    @click.stop="noOption"
                                    @dblclick.stop="stopOption"
                                >举报</span>
                                <span class="dm-info-delete-btn"
                                    v-if="this.$store.state.user.uid && (authorId === this.$store.state.user.uid || item.uid === this.$store.state.user.uid)"
                                    @click.stop="beforeDelete(item.id)"
                                    @dblclick.stop="stopOption"
                                >删除</span>
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="table-footer">
                    <div class="btn-history" @click="noOption">
                        查看历史弹幕
                        <!-- 日历组件 -->
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ElMessage, ElMessageBox } from 'element-plus';
import { handleTime, handleDateTime2 } from '@/utils/utils.js';

export default {
    name: "DanmuBox",
    data() {
        return {
            isOpen: false,  // 是否展开
            sortType: 0,    // 排序方式 0默认日期升序 1时间升序 2时间降序 3内容升序 4内容降序 5日期升序 6日期降序
            dmList: [],     // 弹幕列表
        }
    },
    props: {
        // 盒子展开高度，绑定播放器高度
        boxHeight: {
            type: Number,
            default() {
                return 442;
            }
        },
        // 视频作者id
        authorId: {
            type: Number,
            default() {
                return 0;
            }
        }
    },
    methods: {
        // 格式化时间点
        handleTimePoint(time) {
            return handleTime(time);
        },

        // 格式化日期
        handleDateTime(time) {
            return handleDateTime2(time);
        },
        
        // 改变盒子状态
        changeBoxState() {
            this.isOpen = !this.isOpen;
            const boxBody = document.getElementById("danmu-box-body");
            if (this.isOpen) {
                boxBody.style.cssText = `height: ${this.boxHeight - 44}px;`;
                setTimeout(() => {
                    boxBody.style.cssText = '';
                }, 300);
            } else {
                boxBody.style.cssText = `height: ${this.boxHeight - 44}px;`;
                setTimeout(() => {
                    boxBody.style.cssText = 'height: 0px;';
                }, 0);
            }
        },

        // 改变排序方式
        resort(type) {
            this.sortType = type;
            switch (type) {
                case 1:
                    // 时间升序
                    this.dmList.sort((a, b) => a.timePoint - b.timePoint);
                    break;
                case 2:
                    // 时间降序
                    this.dmList.sort((a, b) => b.timePoint - a.timePoint);
                    break;
                case 3:
                    // 内容升序
                    this.dmList.sort((a, b) => {
                        const contentA = a.content;
                        const contentB = b.content;
                        return contentA.localeCompare(contentB, 'zh-Hans-CN', { sensitivity: 'accent' });
                    });
                    break;
                case 4:
                    // 内容降序
                    this.dmList.sort((a, b) => {
                        const contentA = a.content;
                        const contentB = b.content;
                        return contentB.localeCompare(contentA, 'zh-Hans-CN', { sensitivity: 'accent' });
                    });
                    break;
                case 5:
                    // 日期升序
                    this.dmList.sort((a, b) => new Date(a.createDate).getTime() - new Date(b.createDate).getTime());
                    break;
                case 6:
                    // 日期降序
                    this.dmList.sort((a, b) => new Date(b.createDate).getTime() - new Date(a.createDate).getTime());
                    break;
                default:
                    // 日期升序
                    this.dmList.sort((a, b) => new Date(a.createDate).getTime() - new Date(b.createDate).getTime());
                    break;
            }
        },

        // 更新弹幕列表
        updateDanmuList(dms) {
            this.dmList = dms;
            this.resort(this.sortType);
        },

        // 双击弹幕跳转播放
        handleDblClick(time) {
            this.$emit("jump", time > 0.5 ? time - 0.5 : 0);
        },

        // 删除弹幕前的最后通牒
        beforeDelete(id) {
            ElMessageBox.confirm(
                '是否确定删除该条弹幕?',
                {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                }
            )
            .then(() => {
                this.deleteDanmu(id);
            })
            .catch(() => {})
        },

        async deleteDanmu(id) {
            const formData = new FormData();
            formData.append("id", id);
            const res = await this.$post("/danmu/delete", formData, {
                headers: { Authorization: "Bearer " + localStorage.getItem("teri_token") }
            });
            if (!res.data) return;
            this.$store.state.danmuList = this.$store.state.danmuList.filter(item => item.id !== id);
            ElMessage.info("删除成功");
        },

        noOption() {
            ElMessage.warning("该功能暂未开放");
        },

        stopOption() {
            return;
        },
    },
    watch: {
        // 深度监听vuex中弹幕列表的变化，因为对于数组的push操作并不是总能监听到
        "$store.state.danmuList": {
            handler(curr) {
                this.updateDanmuList(curr.slice());
            },
            deep: true
        }
    }
}
</script>

<style scoped>
.danmu-box {
    width: 100%;
    margin-bottom: 18px;
    position: relative;
    min-height: 44px;
    border-radius: 6px;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
}

.box-header {
    background: #F1F2F3;
    border-radius: 6px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    color: var(--text1);
    cursor: pointer;
    height: 100%;
    position: relative;
    width: 100%;
}

.box-header, .arrow {
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    vertical-align: middle;
}

.arrow {
    bottom: 0;
    height: 14px;
    margin: auto;
    position: absolute;
    right: 16px;
    top: 0;
}

.arrow .icon-xiajiantou {
    transition: transform .3s;
    transform: rotate(0);
    font-weight: 600;
}

.is-open .arrow .icon-xiajiantou {
    transform: rotate(180deg);
}

.title {
    font-size: 15px;
    font-weight: 500;
    height: 44px;
    line-height: 44px;
    padding: 0 10px 0 16px;
    position: relative;
}

.box-body {
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    overflow: hidden;
    -webkit-transform: translateZ(0);
    transform: translateZ(0);
    -webkit-transition: height .3s;
    transition: height .3s;
    width: 100%;
    background-color: #fff;
    position: relative;
}

.table-header {
    background-color: #fff;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    overflow: hidden;
    position: relative;
    z-index: 1;
}

.btn-time, .btn-text, .btn-date {
    border: 0;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    color: var(--text2);
    fill: var(--text2);
    cursor: pointer;
    display: inline-block;
    font-size: 12px;
    height: 32px;
    line-height: 32px;
    padding: 0 6px;
    position: relative;
}

.btn-time {
    padding-left: 16px;
    padding-right: 0;
    text-align: left;
    width: 60px;
}

.btn-text {
    -webkit-box-flex: 1;
    -ms-flex: auto;
    flex: auto;
    text-align: left;
}

.btn-date {
    text-align: left;
    width: 88px;
}

.btn-icon {
    display: inline-block;
    font-size: 0;
    height: 10px;
    line-height: 0;
    position: absolute;
    right: 5px;
    top: 11px;
    -webkit-transform-origin: center;
    transform-origin: center;
    width: 10px;
}

.btn-date .btn-icon {
    right: 16px;
}

.table-body {
    position: relative;
    overflow-y: scroll;
    overflow-x: hidden;
    background-color: #fff;
}

.table-body::-webkit-scrollbar {
    width: 6px;
}

.table-body::-webkit-scrollbar-thumb {
    border-radius: 3px;
    background-color: #ccc;
}

.dm-list {
    width: 100%;
}

ul {
    list-style: none;
    outline: none;
}

.dm-item {
    height: 24px;
}

.dm-info-row {
    color: var(--text2);
    cursor: pointer;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    font-size: 12px;
    height: 24px;
    line-height: 24px;
    position: relative;
}

.dm-info-row span {
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    display: inline-block;
    padding: 0 6px;
    pointer-events: none;
    vertical-align: top;
}

.dm-info-time {
    -webkit-box-flex: 0;
    -ms-flex: none;
    flex: none;
    overflow: hidden;
    padding-left: 16px !important;
    position: relative;
    text-align: left;
    width: 66px;
}

.dm-info-text {
    -webkit-box-flex: 1;
    color: var(--text2);
    -ms-flex: auto;
    flex: auto;
    overflow: hidden;
    pointer-events: auto !important;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.dm-info-date {
    -webkit-box-flex: 0;
    -ms-flex: none;
    flex: none;
    overflow: hidden;
    white-space: nowrap;
    width: 82px;
    padding-right: 0 !important;
}

.dm-info-row:hover .dm-info-date {
    display: none;
}

.dm-info-report-btn, .dm-info-delete-btn {
    background: #fff;
    border: 1px solid var(--brand_pink);
    border-radius: 2px;
    color: var(--brand_pink);
    display: none !important;
    height: 20px;
    line-height: 20px;
    margin-left: 10px;
    pointer-events: auto !important;
    position: absolute;
    right: 10px;
    text-align: center;
    top: 1px;
    -webkit-transition: background-color .3s;
    transition: background-color .3s;
    width: 70px;
}

.dm-info-delete-btn {
    right: 90px;
}

.dm-info-row:hover .dm-info-report-btn, .dm-info-row:hover .dm-info-delete-btn {
    display: inline-block !important;
}

.dm-info-report-btn:hover, .dm-info-delete-btn:hover {
    background-color: var(--brand_pink);
    color: #fff;
}

.table-footer {
    cursor: not-allowed;
    height: 31px;
    margin-top: 8px;
    position: relative;
    width: auto;
    z-index: 2;
}

.btn-history {
    background-color: #F1F2F3;
    border-radius: 6px;
    color: var(--text2);
    cursor: pointer;
    height: 31px;
    line-height: 31px;
    text-align: center;
    width: 100%;
}
</style>