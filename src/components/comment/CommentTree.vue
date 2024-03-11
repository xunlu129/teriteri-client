<template>
    <div class="reply-list">
        <div class="reply-item" v-for="(rootComment, index) in commentList" :key="index">
            <div class="root-reply-container" @mouseover="operationId = rootComment.id" @mouseout="operationId = -1"
                @mouseleave="showOption = false">
                <div class="root-reply-avatar">
                    <VAvatar :size="40" :img="rootComment.user.avatar_url" :auth="rootComment.user.auth"></VAvatar>
                </div>
                <div class="content-wrap">
                    <div class="user-info">
                        <div class="user-name">{{ rootComment.user.nickname }}</div>
                        <!-- 等级组件 -->
                        <a class="level">
                            <i :class="`iconfont icon-lv${handleLevel(rootComment.user.exp)}`"></i>
                        </a>
                    </div>
                    <div class="root-reply">
                        <span class="reply-content-container root-reply">
                            <span class="reply-content" v-html="emojiText(rootComment.content)"></span>
                        </span>
                        <!-- 点赞 -->
                        <div class="reply-info">
                            <span class="reply-time">{{ handleDateTime3(rootComment.createTime) }}</span>
                            <span class="reply-like">
                                <i class="svg-icon like-icon" style="width: 16px; height: 16px;">
                                    <svg t="1709473674965" class="icon"
                                        @click="likeOrDislike(rootComment.id, true, true)"
                                        v-if="!isLike(rootComment.id)" viewBox=" 0 0 1024 1024" version="1.1"
                                        xmlns="http://www.w3.org/2000/svg" p-id="4170" width="100%" height="100%">
                                        <path
                                            d="M890.908 429.534c-20.66-26.05-51.585-40.99-84.84-40.99l-189.34 0c10.34-28.83 17.18-60.165 19.615-90.48 3.785-47.147-3.465-89.02-20.955-121.095-21.53-39.46-58.18-64.072-105.997-71.177-21.662-3.22-40.292 0.945-55.377 12.372-30.495 23.102-36.092 67.065-42.575 117.97-5.182 40.692-11.055 86.817-30.79 119.877-13.172 22.065-38.807 51.397-109.092 51.397l-73.345 0c-48.842 0-88.58 39.722-88.58 88.545l0 334.754c0 48.82 39.737 88.545 88.58 88.545l534.336 0c24.33 0 48.22-8.325 67.275-23.43 19.06-15.11 32.605-36.475 38.145-60.155l73.52-314.264C919.058 489.054 911.553 455.569 890.908 429.534zM168.672 830.708 168.672 495.956c0-16.27 13.252-29.505 29.537-29.505l62.232 0 0 393.762-62.232 0C181.925 860.213 168.672 846.978 168.672 830.708zM853.998 507.956l-73.52 314.272c-5.23 22.36-24.94 37.985-47.93 37.985L319.484 860.213 319.484 462.169c49.877-9.52 87.4-34.92 111.86-75.895 26.05-43.64 32.75-96.257 38.662-142.68 2.67-20.977 5.193-40.79 9.2-55.99 4.297-16.302 8.745-21.08 10.457-22.377 1.96-1.485 5.677-1.835 11.05-1.035 29.615 4.4 50.175 17.83 62.84 41.052 25.99 47.642 14.505 128.052-10.265 182.86-5.93 13.127-4.83 28.167 2.96 40.232 7.78 12.052 21.01 19.247 35.395 19.247l214.424 0c15.125 0 29.185 6.792 38.58 18.637C854.028 478.049 857.438 493.261 853.998 507.956z"
                                            p-id="4171"></path>
                                    </svg>
                                    <svg v-else @click="likeOrDislike(rootComment.id, true, false)" t="1709989505374"
                                        class="icon-2" viewBox="0 0 1024 1024" version="1.1"
                                        xmlns="http://www.w3.org/2000/svg" p-id="4500" width="200" height="200">
                                        <path
                                            d="M866.37985173 383.35525973H669.77185173c-14.5635552-2.42725973-19.4180736-16.99081493-21.84533333-24.27259306V181.89274027c0-48.54518507-38.83614827-87.38133333-87.38133333-87.38133334-43.69066667 0-80.0995552 33.98162987-87.38133334 75.24503787-26.69985173 167.48088853-128.64474027 223.30785173-194.18074026 240.29866667 2.42725973 7.28177813 2.42725973 12.13629653 2.42725866 16.99081493v470.88829547c0 9.7090368-2.42725973 19.4180736-7.28177706 29.12711146h475.74281386c46.1179264-9.7090368 77.67229653-26.69985173 99.51762987-72.81777813l99.51762987-349.52533333c19.4180736-63.10874027-12.13629653-123.79022187-82.52681494-121.36296214zM240.1469632 900.3614816V427.0459264c0-14.5635552-19.4180736-26.69985173-41.263408-26.6998528H133.3475552c-33.98162987 0-63.10874027 29.12711147-63.10874027 63.10874133v398.0705184c0 36.40888853 26.69985173 65.536 63.10874027 65.536h65.536c21.84533333 0 41.26340693-12.13629653 41.263408-26.69985173z m0 0"
                                            p-id="4501"></path>
                                    </svg>
                                </i>
                                <span>{{ rootComment.love }}</span>
                            </span>
                            <!-- 点踩 -->
                            <span class="reply-dislike">
                                <i class="svg-icon dislike-icon" style="width: 16px; height: 16px;">
                                    <svg t="1709473802692" class="icon"
                                        @click="likeOrDislike(rootComment.id, false, true)"
                                        v-if="!isDislike(rootComment.id)" viewBox="0 0 1024 1024" version="1.1"
                                        xmlns="http://www.w3.org/2000/svg" p-id="4323" width="85%" height="85%">
                                        <path
                                            d="M618.697823 1023.904199a121.031458 121.031458 0 0 1-121.982158-91.267227s-17.697651-83.807886-26.912131-113.937772a234.01853 234.01853 0 0 0-106.624693-122.201551 607.570608 607.570608 0 0 0-143.40948-13.529196h-146.261581a70.863736 70.863736 0 0 1-73.130791-68.304158V68.377289a70.863736 70.863736 0 0 1 73.130791-68.304158h675.435981a215.297047 215.297047 0 0 1 216.979056 174.490066l56.530101 351.685972A139.972333 139.972333 0 0 1 877.653953 682.968453H711.135143a1078.386638 1078.386638 0 0 1 37.296703 205.497522 125.931221 125.931221 0 0 1-116.131696 134.706916 123.00599 123.00599 0 0 1-13.602327 0.731308zM292.607628 68.45042v548.480929a313.072914 313.072914 0 0 1 102.968153 18.721483 301.225726 301.225726 0 0 1 144.506443 164.617409c9.726395 31.885025 26.400215 110.646886 28.374746 119.861366a49.217022 49.217022 0 0 0 50.094592 35.834087h5.923594a56.018186 56.018186 0 0 0 51.191553-60.625425 1013.446496 1013.446496 0 0 0-34.517733-191.968325l-28.447877-87.756949H877.653953a74.739668 74.739668 0 0 0 55.50627-23.767507 63.989442 63.989442 0 0 0 16.893212-54.774962l-56.45697-351.685972a142.678172 142.678172 0 0 0-144.725834-116.277957z m-219.392371 0v546.287005h146.261581V68.45042z"
                                            p-id="4324"></path>
                                    </svg>
                                    <svg v-else t="1709989598205" @click="likeOrDislike(rootComment.id, false, false)"
                                        class="icon-2" viewBox="0 0 1024 1024" version="1.1"
                                        xmlns="http://www.w3.org/2000/svg" p-id="4649" width="200" height="200">
                                        <path
                                            d="M206.99 117.485c0-18.81-12.78-34.11-28.395-33.435H118.34C89.27 84.05 65.645 112.355 65.645 147.5v405.54c0 34.875 23.625 63.315 53.1 63.315h59.985c15.615 0 28.26-15.255 28.26-34.065V117.485z m61.74-9.63a24.525 24.525 0 0 1 24.615-24.39H750.5c45 0 74.61 32.94 88.65 53.505a102.915 102.915 0 0 1 12.915 26.55c14.49 45.63 72 228.24 100.935 341.73 33.345 130.5-71.64 128.655-71.64 128.655s-191.43-1.98-216 0-18.675 27.45-18.675 27.45v166.995c0 21.285-4.905 92.385-77.535 98.1s-97.11-43.335-119.61-147.285C412.46 660.5 325.25 625.58 287 615.86a24.615 24.615 0 0 1-18-23.805V107.945z"
                                            p-id="4650"></path>
                                    </svg>
                                </i>
                            </span>
                            <span class="reply-btn" @click="handleReply(rootComment)">回复</span>
                            <div class="reply-operation-wrap"
                                :style="{ opacity: operationId === rootComment.id ? 1 : 0 }">
                                <div class="reply-operation" @click="showOption = !showOption">
                                    <i class="svg-icon operation-icon" style="width:16px;height:16px">
                                        <svg t="1709522739467" class="icon" viewBox="0 0 1024 1024" version="1.1"
                                            xmlns="http://www.w3.org/2000/svg" p-id="4290" width="100%" height="100%">
                                            <path
                                                d="M413.602909 831.301818a97.000727 97.000727 0 1 0 194.094546 0 97.000727 97.000727 0 0 0-194.094546 0z m0-309.480727a97.000727 97.000727 0 1 0 194.094546 0 97.000727 97.000727 0 0 0-194.094546 0z m0-328.797091a97.000727 97.000727 0 1 0 194.094546 0 97.000727 97.000727 0 0 0-194.094546 0z"
                                                p-id="4291">
                                            </path>
                                        </svg>
                                    </i>
                                    <ul class="operation-list" :style="{ display: showOption ? '' : 'none' }">
                                        <li class="operation-option"
                                            v-if="this.$store.state.user.uid === rootComment.user.uid"
                                            @click="deleteComment(rootComment.id)">
                                            <span class="option-title">
                                                删除
                                            </span>
                                        </li>
                                        <li class="operation-option">
                                            <span class="option-title">
                                                举报
                                            </span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 子评论 -->
            <SubComment :replies="rootComment.replies" :count="rootComment.count" @sub-reply="handleReply"
                :fatherUserId="rootComment.user.uid" @get-more-comment="getMoreComment(rootComment.id)"
                ref="rootReply" />
            <div class="reply-box-container" :class="[commentInfo.root_id === rootComment.id ? '' : 'hide']">
                <div class="reply-box box-active">
                    <ReplyTextarea :placeholder="replyPlaceHolder" :commentInfo="commentInfo" ref="ReplyTextarea"
                        @get-comment="getCommentTree">
                    </ReplyTextarea>
                </div>
            </div>
            <div class="bottom-line"></div>
        </div>
    </div>
</template>

<script>
import VAvatar from '../avatar/VAvatar.vue';
import SubComment from './SubComment.vue';
import ReplyTextarea from './ReplyTextarea.vue';
import { ElMessage } from 'element-plus';

import { handleNum, handleLevel, handleDateTime3, emojiText } from '@/utils/utils.js';


export default {
    name: "CommentTree",
    components: {
        VAvatar,
        SubComment,
        ReplyTextarea,
    },
    data() {
        return {
            commentList: [], // 当前视频的所有回复
            replyPlaceHolder: "", // 控制 回复@用户名：
            operationId: -1, // 当前鼠标悬停在哪条评论上
            showOption: false, // 点前点击的哪条评论的展开操作栏按钮

            // 回复评论的基础信息
            commentInfo: {
                root_id: -1, // 回复评论的楼层 id
                parent_id: -1, // 回复的评论的 id
                to_user_id: -1, // 回复的评论的所属者的 id
                vid: -1 // 当前视频的id
            },
        }
    },
    methods: {
        async getCommentTree(offset) {
            const response = await this.$get("/comment/get", {
                params: {
                    vid: this.$route.params.vid,
                    offset: offset,
                    type: 1,
                }
            });
            if (!response.data) return;

            this.commentList.push(...response.data);

        },

        async getMoreComment(id) {
            const response = await this.$get("/comment/reply/get-more", {
                params: {
                    id: id
                }
            });

            let index = this.commentList.findIndex(comment => comment.id === id)
            if (index != -1) {
                this.commentList[index] = response.data
            }
        },

        async deleteComment(cid) {
            const formData = new FormData();
            formData.append("id", cid);

            const res = await this.$post("/comment/delete", formData,
                { headers: { Authorization: "Bearer " + localStorage.getItem("teri_token") } })

            if (!res.data) return;

            this.commentList = this.commentList.filter(comment => comment.id !== cid)
            ElMessage.info("删除成功");
        },

        async getLikeAndDislike() {
            if (!this.$store.state.user.uid) {
                ElMessage.error("当前用户未登入");
                return;
            }

            const res = await this.$get("/comment/get-like-and-dislike", {
                headers: { Authorization: "Bearer " + localStorage.getItem("teri_token") }
            });

            if (!res.data) return;
            this.$store.commit("updateLikeComment", res.data.data.userLike);
            this.$store.commit("updateDislikeComment", res.data.data.userDislike);
        },

        async likeOrDislike(id, isLike, isSet) {
            if (!this.$store.state.user.uid) {
                ElMessage.error("请登入");
                return;
            }
            if (!id) {
                ElMessage.error("该评论不存在");
                return;
            }

            const formData = new FormData();
            formData.append("id", Number(id));
            formData.append("isLike", isLike);
            formData.append("isSet", isSet);

            await this.$post("/comment/love-or-not", formData, {
                headers: { Authorization: "Bearer " + localStorage.getItem("teri_token") }
            });


            // 更新store中的列表
            let likeExist = this.isLike(id);
            let dislikeExist = this.isDislike(id);
            let index = this.commentList.findIndex(comment => comment.id === id)
            if (index === -1) {
                ElMessage.error("该评论不存在");
                return;
            }
            let comment = this.commentList[index]

            // 点赞
            if (isLike && isSet) {
                // 原本就点了赞直接返回
                if (likeExist) {
                    return;
                }

                if (dislikeExist) {
                    // 原本点了踩，取消踩
                    this.subDislikeComment(id);
                }
                // 原本没点踩，只需要点赞
                this.addLikeComment(id);
                comment.love += 1;

            } else if (isLike) {
                // 取消点赞
                if (!likeExist) {
                    // 原本就没有点赞
                    return;
                }
                // 取消点赞
                this.subLikeComment(id);
                comment.love -= 1;
            } else if (isSet) {
                // 点踩
                if (dislikeExist) {
                    // 原本就点了踩
                    return;
                }

                if (likeExist) {
                    // 原本点了赞，要取消赞，然后更新点踩
                    this.subLikeComment(id);
                    comment.love -= 1;
                }
                // 原本没有点赞直接点踩
                this.addDislikeComment(id);

            } else {
                // 取消点踩
                if (!dislikeExist) {
                    // 原本就没有点踩
                    return;
                }

                // 取消点踩
                this.subDislikeComment(id);
            }
        },

        // 判断用户是否对当前评论点赞
        isLike(id) {
            let i = this.$store.state.likeComment.findIndex(item => item === id);
            return i !== -1;
        },
        // 判断用户是否对当前评论点踩
        isDislike(id) {
            let i = this.$store.state.dislikeComment.findIndex(item => item === id);
            return i !== -1;
        },
        // 取消点赞
        subLikeComment(id) {
            let lc = this.$store.state.likeComment.filter(item => item !== id)
            this.$store.commit("updateLikeComment", lc);
        },
        // 点赞
        addLikeComment(id) {

            this.$store.state.likeComment.push(id);
        },
        // 取消点踩
        subDislikeComment(id) {
            let dlc = this.$store.state.dislikeComment.filter(item => item !== id);
            this.$store.commit("updateDislikeComment", dlc);
        },
        // 点踩
        addDislikeComment(id) {
            this.$store.state.dislikeComment.push(id);
        },


        // 计算用户等级
        handleLevel(exp) {
            return handleLevel(exp);
        },
        // 渲染评论中的表情包
        emojiText(text) {
            return emojiText(text);
        },
        // 处理大于1万的数字
        handleNum(number) {
            return handleNum(number);
        },
        // 处理评论的时间
        handleDateTime3(_time) {
            return handleDateTime3(_time);
        },

        // 控制回复框的聚焦；事件
        handleFocus(value) {
            if (!this.$refs.ReplyTextarea) return;
            this.$refs.ReplyTextarea.forEach(el => {
                el.handleFocus(value);
            })
        },

        async handleScroll() {
            const replyList = document.querySelector(".reply-list");
            const divHeight = replyList.clientHeight;
            const page = window.pageYOffset;
            if (page > divHeight + 200) await this.getCommentTree(this.commentList.length + 1)
        },

        // 处理评论的commentInfo
        handleReply(comment) {
            if (comment.id === this.commentInfo.parent_id) {
                this.commentInfo = {
                    root_id: -1,
                    parent_id: -1,
                    to_user_id: -1,
                    vid: -1
                }
                return;
            }
            this.replyPlaceHolder = "回复@ " + comment.user.nickname

            // 填充commentInfo
            if (comment.rootId === 0) {
                this.commentInfo.root_id = comment.id
            } else {
                this.commentInfo.root_id = comment.rootId;
            }

            this.commentInfo.parent_id = comment.id
            this.commentInfo.to_user_id = comment.user.uid
            this.commentInfo.vid = comment.vid;

            this.$nextTick(() => {
                this.$refs.ReplyTextarea.forEach(el => {
                    el.focusTextarea();
                })
            });
        },
    },
    mounted() {
        this.getCommentTree(0);
        window.addEventListener("scroll", this.handleScroll);
    },
    beforemounted() {
        window.removeEventListener("scorll", this.handleScroll);
    },
    watch: {
        "$route.params.vid"(curr) {
            this.commentInfo.vid = curr
        },
    },
    computed: {
    }
}
</script>

<style scoped>
.reply-list {
    margin-top: 14px;
    padding-bottom: 100px;
}

.reply-item {
    position: relative;
}

.root-reply-container {
    padding: 22px 0 0 80px;
}

.root-reply-avatar {
    display: flex;
    justify-content: center;
    position: absolute;
    left: 0;
    width: 80px;
    cursor: pointer;
}

.content-wrap {
    flex: 1;
    position: relative;
}

.user-info {
    display: flex;
    align-items: center;
    margin-bottom: 4px;
}

/* @media screen and (max-width:1681px) {
    .user-info {
        font-size: 13px;
    }
} */


.user-name {
    font-family: PingFang SC, HarmonyOS_Medium, Helvetica Neue, Microsoft YaHei, sans-serif;
    font-weight: 500;
    margin-right: 5px;
    color: var(--v_text2);
    cursor: pointer;
}

.level .iconfont {
    font-size: 12px;
    line-height: 20px;
}

.root-reply {
    position: relative;
    padding: 2px 0;
}

@media screen and (max-width: 1681px) {
    .root-reply {
        font-size: 15px;
        line-height: 24px;
    }
}

.reply-content-container {
    display: block;
    overflow: hidden;
    width: 100%;
}

@media screen and (max-width: 1681px) {
    .root-reply {
        font-size: 15px;
        line-height: 24px;
    }
}

.root-reply {
    position: relative;
    padding: 2px 0;
}

.reply-content-container .reply-content {
    color: var(--text1);
    overflow: hidden;
    word-wrap: break-word;
    word-break: break-word;
    white-space: pre-wrap;
    line-height: 24px;
    vertical-align: baseline;
}

.content-wrap .root-reply .reply-info {
    display: flex;
    align-items: center;
    position: relative;
    margin-top: 2px;
    font-size: 13px;
    color: var(--text3);
}

.root-reply .reply-info .reply-time {
    margin-right: 20px;
}

.root-reply .reply-info .reply-like {
    display: flex;
    align-items: center;
    margin-right: 19px;
    cursor: pointer;
}

.svg-icon {
    display: inline-flex;
    justify-content: center;
    align-items: center;
}

.like-icon {
    margin-right: 5px;
    color: #9499a0;

    fill: #9499a0;
    width: 100%;
    height: 100%;
}

.like-icon:hover {
    fill: var(--brand_pink);
}

.icon-2 {
    fill: var(--brand_pink);
}

.root-reply .reply-info .reply-dislike {
    display: flex;
    align-items: center;
    margin-right: 19px;
}

.dislike-icon {
    color: #9499a0;
    cursor: pointer;

    fill: #9499a0;
    width: 100%;
    height: 100%;
}

.dislike-icon:hover {
    fill: var(--brand_pink)
}

.root-reply .reply-info .reply-btn {
    cursor: pointer;
}

.root-reply .reply-info .reply-btn:hover {
    color: var(--brand_pink)
}

.reply-operation-wrap {
    position: absolute;
    right: 20px;
    opacity: 0;
}

.reply-operation-wrap:hover {
    opacity: 1;
}


.icon {
    fill: #9499a0;
}

.icon:hover {
    fill: var(--brand_pink);
    cursor: pointer;
}

.reply-operation {
    display: inline-flex;
    position: relative;
}

.svg-icon {
    display: inline-flex;
    justify-content: center;
    align-items: center;
}

.reply-operation .operation-icon {
    color: #9499a0;
    cursor: pointer;
}

.operation-list {
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 20px;
    right: 0;
    z-index: 10;
    width: 120px;
    border-radius: 4px;
    font-size: 14px;
    color: var(--v_text1);
    background-color: var(--bg1);
    box-shadow: 0 0 5px #0003;
}

.operation-list .operation-option {
    display: flex;
    align-items: center;
    height: 36px;
    padding: 0 15px;
    cursor: pointer;
}

.operation-list .operation-option:hover {
    background-color: var(--bg3);
    color: var(--brand_pink)
}



.reply-item .reply-box-container {
    padding: 25px 0 10px 80px
}

.reply-box {
    display: flex;
    flex-direction: column;
}

.hide {
    display: none;
}

.bottom-line {
    margin-left: 80px;
    border-bottom: 1px solid var(--v_graph_bg_thick);
    margin-top: 14px;
}
</style>