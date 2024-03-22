<template>
    <div class="reply-list">
        <div class="reply-item" v-for="(rootComment, index) in (this.$store.state.isLogin ? commentList : commentList.slice(0,2))" :key="index">
            <!-- 第二楼特有的未登录蒙版 -->
            <div class="login-limit-mask" v-if="index === 1" :style="this.$store.state.isLogin ? '' : 'display: block;'">
                <div class="mask-top"></div>
                <div class="mask-bottom"></div>
            </div>
            <div class="root-reply-container" @mouseleave="showOption = false">
                <div class="root-reply-avatar-wrap">
                    <VPopover popStyle="z-index: 2000; cursor: default; padding-top: 20px; left: 0; transform: translate3d(0,0,0);">
                        <template #reference>
                            <a :href="`/space/${rootComment.user.uid}`" target="_blank" class="root-reply-avatar">
                                <VAvatar :size="isWideWindow ? 48 : 40" :img="rootComment.user.avatar_url" :auth="rootComment.user.auth"></VAvatar>
                            </a>
                        </template>
                        <template #content>
                            <UserCard :user="rootComment.user"></UserCard>
                        </template>
                    </VPopover>
                </div>
                <div class="content-wrap">
                    <div class="user-info">
                        <VPopover popStyle="z-index: 2000; cursor: default; padding-top: 20px; left: 0; transform: translate3d(0,0,0);">
                            <template #reference>
                                <a :href="`/space/${rootComment.user.uid}`" target="_blank" class="user-name"
                                    :class="rootComment.user.vip !== 0 ? 'vip-name' : ''"
                                >{{ rootComment.user.nickname }}</a>
                            </template>
                            <template #content>
                                <UserCard :user="rootComment.user"></UserCard>
                            </template>
                        </VPopover>
                        <!-- 等级组件 -->
                        <VLevel class="level" :level="handleLevel(rootComment.user.exp)" :size="12"></VLevel>
                        <!-- UP主标识 -->
                        <svg v-if="rootComment.user.uid === upUid" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="6" width="18" height="11.5" rx="2" fill="#FF6699"></rect><path d="M5.7 8.36V12.79C5.7 13.72 5.96 14.43 6.49 14.93C6.99 15.4 7.72 15.64 8.67 15.64C9.61 15.64 10.34 15.4 10.86 14.92C11.38 14.43 11.64 13.72 11.64 12.79V8.36H10.47V12.81C10.47 13.43 10.32 13.88 10.04 14.18C9.75 14.47 9.29 14.62 8.67 14.62C8.04 14.62 7.58 14.47 7.3 14.18C7.01 13.88 6.87 13.43 6.87 12.81V8.36H5.7ZM13.0438 8.36V15.5H14.2138V12.76H15.9838C17.7238 12.76 18.5938 12.02 18.5938 10.55C18.5938 9.09 17.7238 8.36 16.0038 8.36H13.0438ZM14.2138 9.36H15.9138C16.4238 9.36 16.8038 9.45 17.0438 9.64C17.2838 9.82 17.4138 10.12 17.4138 10.55C17.4138 10.98 17.2938 11.29 17.0538 11.48C16.8138 11.66 16.4338 11.76 15.9138 11.76H14.2138V9.36Z" fill="white"></path></svg>
                    </div>
                    <div class="root-reply">
                        <span class="reply-content-container root-reply">
                            <span class="reply-content" v-html="emojiText(rootComment.content)"></span>
                        </span>
                        <div class="reply-info">
                            <span class="reply-time">{{ handleDateTime3(rootComment.createTime) }}</span>
                            <!-- 点赞 -->
                            <span class="reply-like">
                                <i class="svg-icon like-icon" style="width: 16px; height: 16px;">
                                    <svg t="1710593669221" class="icon"
                                        @click="likeOrDislike(rootComment.id, true, true)"
                                        v-if="!isLike(rootComment.id)" viewBox="0 0 1024 1024" version="1.1"
                                        xmlns="http://www.w3.org/2000/svg" p-id="4176" width="100%" height="100%">
                                        <path
                                            d="M916.16853333 424.03626667c-22.03733333-27.78666667-55.024-43.72266667-90.496-43.72266667l-201.96266666 0c11.02933333-30.752 18.32533333-64.176 20.92266666-96.512 4.03733333-50.29013333-3.696-94.95466667-22.352-129.168-22.96533333-42.09066667-62.05866667-68.34346667-113.06346666-75.92213333-23.10613333-3.43466667-42.97813333 1.008-59.0688 13.1968-32.528 24.64213333-38.49813333 71.536-45.41333334 125.83466666-5.52746667 43.4048-11.792 92.6048-32.84266666 127.8688-14.05013333 23.536-41.39413333 54.82346667-116.3648 54.82346667l-78.23466667 0c-52.09813333 0-94.48533333 42.37013333-94.48533333 94.448l0 357.07093333c0 52.07466667 42.38613333 94.448 94.48533333 94.448l569.9584 0c25.952 0 51.43466667-8.88 71.76-24.992 20.33066667-16.11733333 34.77866667-38.90666667 40.688-64.16533333l78.42133333-335.21493333C946.1952 487.52426667 938.18986667 451.80693333 916.16853333 424.03626667zM145.78346667 851.9552L145.78346667 494.8864c0-17.35466667 14.13546667-31.472 31.50613333-31.472l66.3808 0 0 420.0128-66.3808 0C159.92 883.4272 145.78346667 869.30986667 145.78346667 851.9552zM876.79786667 507.6864l-78.42133334 335.22346667c-5.57866667 23.85066667-26.60266667 40.51733333-51.12533333 40.51733333L306.6496 883.4272 306.6496 458.84693333c53.20213333-10.15466667 93.22666667-37.248 119.31733333-80.95466666 27.78666667-46.54933333 34.93333333-102.67413333 41.23946667-152.192 2.848-22.37546667 5.5392-43.50933333 9.81333333-59.72266667 4.58346667-17.3888 9.328-22.48533333 11.15413334-23.8688 2.09066667-1.584 6.05546667-1.95733333 11.78666666-1.104 31.58933333 4.69333333 53.52 19.01866667 67.02933334 43.7888 27.72266667 50.81813333 15.472 136.5888-10.94933334 195.05066667-6.32533333 14.00213333-5.152 30.0448 3.15733334 42.91413333 8.29866667 12.85546667 22.41066667 20.53013333 37.75466666 20.53013333l228.71893334 0c16.13333333 0 31.13066667 7.2448 41.152 19.87946667C876.82986667 475.7856 880.4672 492.01173333 876.79786667 507.6864z"
                                            p-id="4177"></path>
                                    </svg>
                                    <svg v-else @click="likeOrDislike(rootComment.id, true, false)" t="1709989505374"
                                        class="icon-2" viewBox="0 0 1024 1024" version="1.1"
                                        xmlns="http://www.w3.org/2000/svg" p-id="4500" width="100%" height="100%">
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
                                    <svg t="1710593747978" class="icon"
                                        @click="likeOrDislike(rootComment.id, false, true)"
                                        v-if="!isDislike(rootComment.id)" viewBox="0 0 1024 1024" version="1.1"
                                        xmlns="http://www.w3.org/2000/svg" p-id="4329" width="100%" height="100%">
                                        <path
                                            d="M879.47946667 516.00497813l-79.09831147-333.3688896a52.90666667 52.90666667 0 0 0-51.6323552-40.43662186h-443.50577813v422.61617813c49.5616 7.3955552 93.5708448 36.864 120.26311146 80.62293333a381.65617813 381.65617813 0 0 1 41.46062187 151.30168854c2.048 20.0704 5.3475552 39.9132448 9.92142293 59.48302186 1.27431147 8.92017813 5.3475552 17.29422187 11.19573334 23.66577814 3.80017813 1.77493333 7.87342187 2.2755552 11.94666666 1.0012448a86.016 86.016 0 0 0 67.65226667-43.46311147c27.98933333-50.6083552 15.49653333-135.8051552-10.92266667-194.03662187a44.80568853 44.80568853 0 0 1 3.02648854-42.71217813 44.91946667 44.91946667 0 0 1 38.16106666-20.34346667h230.4c16.01991147 0 31.28888853-7.12248853 41.46062187-19.82008853a52.4288 52.4288 0 0 0 9.67111147-44.50986667zM142.9731552 173.73866667v355.21422186c0.50062187 17.56728853 14.49528853 31.5619552 31.78951147 31.2888896h66.90133333V142.44977813H174.76266667c-17.29422187-0.50062187-31.28888853 13.4940448-31.78951147 31.28888854z m776.1692448 425.66542186a116.736 116.736 0 0 1-91.29528853 43.48586667h-203.45742294a373.19111147 373.19111147 0 0 1 21.11715627 96.11946667 227.1232 227.1232 0 0 1-22.64177813 128.65991146 149.04888853 149.04888853 0 0 1-113.6867552 75.27537814 76.45866667 76.45866667 0 0 1-59.50577814-13.22097814c-32.81351147-24.41671147-38.912-71.20213333-45.78417813-125.1100448a338.64817813 338.64817813 0 0 0-33.04106667-127.13528853c-14.24497813-23.39271147-41.71093333-54.43128853-117.25937706-54.43128853H174.76266667c-51.3820448 0.77368853-93.84391147-41.1875552-95.11822187-94.07146667V173.73866667C80.6684448 120.8547552 123.13031147 78.89351147 174.76266667 79.6444448h574.2364448c26.1916448 0 51.3820448 8.64711147 72.22613333 24.94008853a114.61973333 114.61973333 0 0 1 40.96 63.80657814l79.0755552 333.36888853a113.32266667 113.32266667 0 0 1-22.1184 97.64408853z"
                                            p-id="4330"></path>
                                    </svg>
                                    <svg v-else t="1709989598205" @click="likeOrDislike(rootComment.id, false, false)"
                                        class="icon-2" viewBox="0 0 1024 1024" version="1.1"
                                        xmlns="http://www.w3.org/2000/svg" p-id="4649" width="100%" height="100%">
                                        <path
                                            d="M206.99 117.485c0-18.81-12.78-34.11-28.395-33.435H118.34C89.27 84.05 65.645 112.355 65.645 147.5v405.54c0 34.875 23.625 63.315 53.1 63.315h59.985c15.615 0 28.26-15.255 28.26-34.065V117.485z m61.74-9.63a24.525 24.525 0 0 1 24.615-24.39H750.5c45 0 74.61 32.94 88.65 53.505a102.915 102.915 0 0 1 12.915 26.55c14.49 45.63 72 228.24 100.935 341.73 33.345 130.5-71.64 128.655-71.64 128.655s-191.43-1.98-216 0-18.675 27.45-18.675 27.45v166.995c0 21.285-4.905 92.385-77.535 98.1s-97.11-43.335-119.61-147.285C412.46 660.5 325.25 625.58 287 615.86a24.615 24.615 0 0 1-18-23.805V107.945z"
                                            p-id="4650"></path>
                                    </svg>
                                </i>
                            </span>
                            <span class="reply-btn" @click="handleReply(rootComment)">回复</span>
                            <div class="reply-operation-wrap">
                                <div class="reply-operation">
                                    <i class="svg-icon operation-icon" style="width:16px;height:16px" @click="showOption = !showOption">
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
                                            v-if="this.$store.state.user.uid === rootComment.user.uid || this.$store.state.user.uid === upUid"
                                            @click="beforeDelete(rootComment.id)">
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
                        <div class="reply-tag-list">
                            <div class="reply-tag-item" v-if="hotCommentIdx === rootComment.id && rootComment.love - rootComment.bad + rootComment.count >= 5"
                                style="background-color: rgb(255, 236, 241); color: rgb(255, 102, 153);">
                                热评
                            </div>
                            <div class="reply-tag-item" v-if="upLike.findIndex(i => i === rootComment.id) !== -1"
                                style="background-color: rgb(244, 244, 244); color: rgb(117, 117, 117);">
                                UP主觉得很赞
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 子评论 -->
            <SubComment :replies="rootComment.replies" :count="rootComment.count" :isWideWindow="isWideWindow" :upUid="upUid"
                :rootId="rootComment.id" @sub-reply="handleReply" @get-more-comment="updateComment" @delSubComment="delSubComment"/>
            <div class="reply-box-container" :class="[commentInfo.root_id === rootComment.id ? '' : 'hide']">
                <div class="reply-box box-active">
                    <ReplyTextarea ref="ReplyTextarea" :placeholder="replyPlaceHolder" :commentInfo="commentInfo" :isWideWindow="isWideWindow" @addComment="addComment"></ReplyTextarea>
                </div>
            </div>
            <div class="bottom-line"></div>
        </div>
        <div class="reply-loading" v-show="loading">正在加载...</div>
        <div class="no-any" v-show="!hasMore && commentList.length === 0">视频还没有任何评论哦，快来抢占沙发位吧~</div>
        <div class="no-more" v-show="(this.$store.state.isLogin && !hasMore && commentList.length !== 0) || (!this.$store.state.isLogin && commentList.length === 1)">已经到底啦~</div>
        <div class="login-prompt" v-show="!this.$store.state.isLogin && commentList.length >= 2" @click="toLogin">登录后查看更多评论</div>
    </div>
</template>

<script>
import VAvatar from '../avatar/VAvatar.vue';
import VPopover from '@/components/popover/VPopover.vue';
import UserCard from '@/components/UserCard/UserCard.vue';
import SubComment from './SubComment.vue';
import ReplyTextarea from './ReplyTextarea.vue';
import VLevel from '@/components/UserCard/VLevel.vue';
import { ElMessage, ElMessageBox } from 'element-plus';

import { handleNum, handleLevel, handleDateTime3, emojiText } from '@/utils/utils.js';


export default {
    name: "CommentTree",
    components: {
        VAvatar,
        VPopover,
        UserCard,
        SubComment,
        ReplyTextarea,
        VLevel,
    },
    data() {
        return {
            commentList: [], // 当前视频的所有回复
            hasMore: true,  // 是否还有更多评论树
            loading: false, // 是否正在加载评论
            upLike: [],     // UP主觉得很赞
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
            hotCommentIdx: 0,   // 热评id
        }
    },
    props: {
        // 评论排序方式 1最热 2最新
        type: {
            type: Number,
            default: 1
        },
        // 视频UP主uid
        upUid: {
            type: Number,
            default: 0
        },
        // 是否是宽屏
        isWideWindow: {
            type: Boolean,
            default() {
                return false;
            }
        },
    },
    methods: {
        // 获取评论树
        async getCommentTree() {
            if (!this.hasMore || this.loading || (!this.$store.state.isLogin && this.commentList.length > 0)) return;
            this.loading = true;
            const res = await this.$get("/comment/get", {
                params: {
                    vid: this.$route.params.vid,
                    offset: this.commentList.length,
                    type: this.type,
                }
            });
            if (!res.data) {
                this.loading = false;
                return;
            }
            this.hasMore = res.data.data.more;
            this.commentList.push(...res.data.data.comments);
            if (this.type === 1 && this.commentList.length > 0) {
                this.hotCommentIdx = this.commentList[0].id;
            }
            // console.log("评论列表: ", this.commentList);
            this.loading = false;
        },

        // 删除评论前的最后通牒
        beforeDelete(id) {
            ElMessageBox.confirm(
                '删除评论后，评论下所有回复都会被删除是否继续?',
                {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                }
            )
            .then(() => {
                this.deleteComment(id);
            })
            .catch(() => {})
        },

        // 删除评论
        async deleteComment(cid) {
            const formData = new FormData();
            formData.append("id", cid);

            const res = await this.$post("/comment/delete", formData,
                { headers: { Authorization: "Bearer " + localStorage.getItem("teri_token") } })

            if (!res.data) return;

            this.commentList = this.commentList.filter(comment => comment.id !== cid)
            ElMessage.info("删除成功");
        },

        // 删除子评论
        delSubComment(comment) {
            const rootComment = this.commentList.find(item => item.id === comment.rootId);
            rootComment.replies = rootComment.replies.filter(cmt => cmt.id !== comment.id);
        },

        // 获取UP主觉得很赞
        async getUpLike() {
            const res = await this.$get("/comment/get-up-like", {
                params: {
                    uid: this.upUid
                }
            });
            if (!res.data) return;
            this.upLike = res.data.data;
        },

        // 清空评论列表
        clearCommentList() {
            this.commentList = [];
            this.hasMore = true;
        },

        // 新插入评论的回调
        addComment(comment) {
            if (comment.rootId === 0) {
                // 根评论头插
                this.commentList.unshift(comment);
            } else {
                // 回复评论尾插
                let root = this.commentList.find(item => item.id === comment.rootId);
                if (root) root.replies.push(comment);
            }
        },

        // 点赞或点踩某条评论
        async likeOrDislike(id, isLike, isSet) {
            if (!this.$store.state.user.uid) {
                ElMessage.error("请登入");
                return;
            }

            const formData = new FormData();
            formData.append("id", Number(id));
            formData.append("isLike", isLike);
            formData.append("isSet", isSet);

            const res = await this.$post("/comment/love-or-not", formData, {
                headers: { Authorization: "Bearer " + localStorage.getItem("teri_token") }
            });
            if (!res.data) return;

            // 更新store中的列表
            let likeExist = this.isLike(id);
            let dislikeExist = this.isDislike(id);
            let comment = this.commentList.find(comment => comment.id === id)

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

        // 更新获取到的全部子评论
        updateComment(comment) {
            const i = this.commentList.findIndex(item => item.id === comment.id);
            if (i !== -1) {
                this.commentList[i].replies = comment.replies;
            }
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
        cancelFocus() {
            if (!this.$refs.ReplyTextarea) return;
            this.$refs.ReplyTextarea.forEach(el => {
                el.cancelFocus();
            })
        },

        // 触底加载
        async handleScroll() {
            const commentBottom = document.querySelector(".reply-list").getBoundingClientRect().bottom;
            const windowHeight = window.innerHeight;
            if (commentBottom - windowHeight <= 300) await this.getCommentTree();
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

        // 触发登录
        toLogin() {
            this.$store.state.openLogin = true;
            this.$nextTick(() => {
                this.$store.state.openLogin = false;
            })
        }
    },
    mounted() {
        this.getCommentTree();
        window.addEventListener("scroll", this.handleScroll);
    },
    beforeUnmount() {
        window.removeEventListener("scroll", this.handleScroll);
    },
    watch: {
        "$route.params.vid"(curr) {
            this.commentInfo.vid = curr
            this.clearCommentList();
            this.getCommentTree();
        },
        "upUid"() {
            this.getUpLike();
        }
    },
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

.login-limit-mask {
    display: none;
    position: absolute;
    top: 0;
    right: 0;
    width: 100%;
    height: 100%;
    z-index: 10;
    pointer-events: none;
}

.mask-top {
    height: 80%;
    background: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, var(--bg1) 100%);
}

.mask-bottom {
    height: 20%;
    background: var(--bg1);
    pointer-events: initial;
}

.root-reply-avatar-wrap {
    display: flex;
    justify-content: center;
    position: absolute;
    left: 0;
    width: 80px;
}

.root-reply-avatar {
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
    font-weight: 500;
    margin-right: 7px;
    color: var(--text2);
    cursor: pointer;
}

.level {
    margin-right: 8px;
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

@media screen and (min-width: 1681px) {
    .root-reply {
        font-size: 16px;
        line-height: 26px;
    }
}

.reply-content-container {
    display: block;
    overflow: hidden;
    width: 100%;
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

.root-reply-container:hover .reply-operation-wrap {
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

.reply-tag-list {
    display: flex;
    align-items: center;
    margin-top: 6px;
    font-size: 12px;
    line-height: 17px;
}

.reply-tag-item {
    padding: 2px 6px;
    border-radius: 2px;
    margin-right: 10px;
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

.reply-loading, .no-any, .no-more {
    margin-top: 20px;
    font-size: 13px;
    color: var(--text3);
    text-align: center;
}

.login-prompt {
    display: flex;
    align-items: center;
    justify-content: center;
    width: calc(100% - 80px);
    height: 50px;
    margin: 16px 0 0 auto;
    border-radius: 6px;
    font-size: 14px;
    color: var(--brand_pink);
    background-color: var(--brand_pink_thin);
    transition: .2s;
    cursor: pointer;
}
</style>