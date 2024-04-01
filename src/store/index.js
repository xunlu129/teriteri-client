import { createStore } from 'vuex'
import axios from 'axios';
import { ElMessage } from 'element-plus';
import { get } from '@/network/request'

export default createStore({
    state: {
        // 是否加载中
        isLoading: false,
        // 是否登录
        isLogin: false,
        // 是否外部触发打开登录框
        openLogin: false,
        // 当前用户
        user: {},
        // 分区列表
        channels: [],
        // 轮播图列表
        carousels: [],
        // 弹幕列表
        danmuList: [],
        // 未读消息数 分别对应"reply"/"at"/"love"/"system"/"whisper"/"dynamic"
        msgUnread: [0, 0, 0, 0, 0, 0],
        // 聊天列表
        chatList: [],
        // 当前聊天对象的uid (不是聊天的id)
        chatId: -1,
        // 当前页面是否在聊天界面
        isChatPage: false,
        // 实时通讯的socket
        ws: null,
        // 用户与当前播放视频的互动数据 {love, unlove, coin, collect}
        attitudeToVideo: {},
        // 用户点赞的评论 id
        likeComment: [],
        // 用户点踩的评论 id
        dislikeComment: [],
        // 登录用户的收藏夹列表
        favorites: [],
        // 访问用户的收藏夹列表
        userFavList: [],
        // 热搜列表
        trendings: [],
        // 搜索到的相关数据数量 [视频, 用户]
        matchingCount: [0, 0],
    },
    mutations: {
        // 退出登录或登录过期时初始化个别数据
        initData(state) {
            state.isLogin = false;
            state.user = {};
            state.msgUnread = [0, 0, 0, 0, 0, 0];
            state.attitudeToVideo = {};
            state.favorites = [];
            state.likeComment = [];
            state.dislikeComment = [];
        },
        // 更新登录状态
        updateIsLogin(state, isLogin) {
            state.isLogin = isLogin;
        },
        // 更新当前用户
        updateUser(state, user) {
            state.user = user;
            // console.log("更新vuex中用户信息: ", state.user);
        },
        // 更新分区列表
        updateChannels(state, channels) {
            state.channels = channels;
            // console.log("vuex中的分区: ", state.channels);
        },
        // 更新轮播图列表
        updateCarousels(state, carousels) {
            state.carousels = carousels;
            // console.log("vuex中的轮播图: ", state.carousels);
        },
        // 更新弹幕列表
        updateDanmuList(state, danmuList) {
            state.danmuList = danmuList;
            // console.log("vuex中的弹幕列表: ", state.danmuList);
        },
        // 追加更新聊天列表
        updateChatList(state, chatList) {
            state.chatList.push(...chatList);
            // console.log("vuex中的聊天列表: ", state.chatList);
        },
        // 更新视频互动数据
        updateAttitudeToVideo(state, atv) {
            state.attitudeToVideo = atv;
            // console.log("vuex中的视频互动数据: ", state.attitudeToVideo);
        },
        // 更新用户点赞评论id列表
        updateLikeComment(state, lc) {
            state.likeComment = lc;
        },
        // 更新用户点踩评论id列表
        updateDislikeComment(state, dlc) {
            state.dislikeComment = dlc;
        },
        updateFavorites(state, favorites) {
            state.favorites = favorites;
            // console.log("vuex中的收藏夹列表: ", state.favorites);
        },

        updateTrendings(state, trendings) {
            state.trendings = trendings;
            // console.log("vuex中的热搜列表: ", state.trendings);
        },

        updateMatchingCount(state, matchingCount) {
            state.matchingCount = matchingCount;
        },

        // 处理websocket事件
        setWebSocket(state, ws) {
            state.ws = ws;
        },
        handleWsOpen() {
            // console.log("实时通信websocket已建立");
        },
        handleWsClose(state) {
            // ElMessage.error("实时通信websocket关闭,请刷新页面重试");
            console.log("实时通信websocket关闭,请登录并刷新页面重试");
            state.isLogin = false;
            state.user = {};
            state.msgUnread = [0, 0, 0, 0, 0, 0];
            state.attitudeToVideo = {};
            state.favorites = [];
            state.likeComment = [];
            state.dislikeComment = [];
        },
        handleWsMessage(state, e) {
            const data = JSON.parse(e.data);
            // console.log(data);
            switch (data.type) {
                case "error": {
                    // 系统错误
                    if (data.data === "登录已过期") {
                        // 由于 App.vue 那先做获取用户资料在前，所以基本上这里不会出现登录过期的情况
                        state.isLogin = false;
                        state.user = {};
                        state.msgUnread = [0, 0, 0, 0, 0, 0];
                        state.attitudeToVideo = {};
                        state.favorites = [];
                        state.likeComment = [];
                        state.dislikeComment = [];
                        // 清除本地token缓存
                        localStorage.removeItem("teri_token");
                    }
                    ElMessage.error(data.data);
                    break;
                }
                case "reply": {
                    // 回复我的
                    let content = data.data;
                    // console.log(content);
                    switch (content.type) {
                        case "全部已读": {
                            state.msgUnread[0] = 0; // 清除回复我的的未读数
                            break;
                        }
                        case "接收": {
                            state.msgUnread[0] ++;
                            break;
                        }
                    }
                    break;
                }
                case "at": {
                    // @ 我的
                    let content = data.data;
                    // console.log(content);
                    switch (content.type) {
                        case "全部已读": {
                            state.msgUnread[1] = 0; // 清除@我的的未读数
                            break;
                        }
                        case "接收": {
                            state.msgUnread[1] ++;
                            break;
                        }
                    }
                    break;
                }
                case "love": {
                    // 收到的赞
                    let content = data.data;
                    // console.log(content);
                    switch (content.type) {
                        case "全部已读": {
                            state.msgUnread[2] = 0; // 清除收到的赞的未读数
                            break;
                        }
                        case "接收": {
                            state.msgUnread[2] ++;
                            break;
                        }
                    }
                    break;
                }
                case "system": {
                    // 系统通知
                    let content = data.data;
                    // console.log(content);
                    switch (content.type) {
                        case "全部已读": {
                            state.msgUnread[3] = 0; // 清除系统通知的未读数
                            break;
                        }
                        case "接收": {
                            state.msgUnread[3] ++;
                            break;
                        }
                    }
                    break;
                }
                case "whisper": {
                    // 我的消息（私聊）
                    let content = data.data;
                    // console.log(content);
                    switch (content.type) {
                        case "全部已读": {
                            state.msgUnread[4] = 0; // 清除我的消息的未读数
                            state.chatList.forEach(item => {
                                item.chat.unread = 0;   // 将聊天列表中的全部未读清除
                            })
                            break;
                        }
                        case "已读": {
                            const chatid = content.id;  // 聊天id（不是url那个参数mid）
                            const count = content.count;
                            state.msgUnread[4] = Math.max(0, state.msgUnread[4] - count);   // 减少相应的未读数
                            let chat = state.chatList.find(item => item.chat.id === chatid);
                            if (chat) {
                                chat.chat.unread = 0;   // 清除对应聊天的未读
                            }
                            break;
                        }
                        case "移除": {
                            const chatid = content.id;  // 聊天id（不是url那个参数mid）
                            const count = content.count;
                            state.msgUnread[4] = Math.max(0, state.msgUnread[4] - count);   // 减少相应的未读数
                            let i = state.chatList.findIndex(item => item.chat.id === chatid);
                            if (i !== -1) {
                                // 如果是当前聊天先关闭窗口
                                if (state.chatList[i].user.uid === state.chatId) state.chatId = -1;
                                state.chatList.splice(i, 1);    // 再移除这个聊天
                            }
                            break;
                        }
                        case "接收": {
                            const chat = content.chat;
                            const detail = content.detail;  // 新消息详情
                            const user = content.user;
                            // 按时间从最近到最远排序
                            const sortByLatestTime = list => {
                                list.sort((a, b) => {
                                    const timeA = new Date(a.chat.latestTime).getTime();
                                    const timeB = new Date(b.chat.latestTime).getTime();
                                    return timeB - timeA;
                                });
                            }
                            if (detail.userId === state.user.uid) {
                                // 如果发送方是自己
                                let chatItem = state.chatList.find(item => item.chat.userId === detail.anotherId);
                                if (chatItem && state.isChatPage) {
                                    // 如果该聊天存在并且当前在聊天界面 就尾插新消息以及更新时间并重排序
                                    chatItem.detail.list.push(detail);
                                    chatItem.chat.latestTime = chat.latestTime;
                                    sortByLatestTime(state.chatList);
                                }
                            } else {
                                // 如果发送方是别人 需要判断当前是否有一个页面在该聊天窗口以更新全部未读数
                                if (!content.online) {
                                    state.msgUnread[4]++;
                                }
                                // 不需判断当前页面是否聊天页面了 都要更新消息
                                let chatItem = state.chatList.find(item => item.chat.userId === detail.userId);
                                if (chatItem) {
                                    // 如果原来有这个聊天就更新数据
                                    chatItem.detail.list.push(detail);
                                    chatItem.chat = chat;
                                    sortByLatestTime(state.chatList);
                                } else {
                                    // 如果没有就创建聊天
                                    chatItem = {
                                        chat: chat,
                                        user: user,
                                        detail: {
                                            more: true,
                                            list: []
                                        }
                                    };
                                    chatItem.detail.list.push(detail);
                                    state.chatList.unshift(chatItem);
                                }
                            }
                            break;
                        }
                        case "撤回": {
                            const msgId = content.id;
                            const sendId = content.sendId;
                            const acceptId = content.acceptId;
                            let chat;
                            if (sendId === state.user.uid) {
                                // 发送者是自己，找接收者的聊天
                                chat = state.chatList.find(item => item.chat.userId === acceptId);
                            } else {
                                // 发送者是对方，找发送者的聊天
                                chat = state.chatList.find(item => item.chat.userId === sendId);
                            }
                            if (chat) {
                                // 找到对应消息更改字段
                                let msg = chat.detail.list.find(item => item.id === msgId);
                                if (msg) {
                                    msg.withdraw = 1;
                                }
                            }
                            break;
                        }
                    }
                    break;
                }
                case "dynamic": {
                    // 动态
                    let content = data.content;
                    // console.log(content);
                    switch (content.type) {
                        case "全部已读": {
                            state.msgUnread[5] = 0; // 清除动态的未读数
                            break;
                        }
                        case "接收": {
                            state.msgUnread[5] ++;
                            break;
                        }
                    }
                    break;
                }
            }

        },
        handleWsError(_, e) {
            console.log("实时通信websocket报错: ", e);
        },
    },
    actions: {
        // 获取当前用户信息
        async getPersonalInfo(context) {
            // 这里为了更方便捕捉到错误后做出反应，就不使用封装的函数了
            const result = await axios.get("/api/user/personal/info", {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("teri_token"),
                },
            })
                .catch(() => {
                    // 一般这里捕抓到异常就表示token失效了，所以直接清空浏览器缓存就好了，不需要调用退出函数了
                    context.commit("initData");
                    // 关闭websocket
                    if (context.state.ws) {
                        context.state.ws.close();
                        context.commit('setWebSocket', null);
                    }
                    // 清除本地token缓存
                    localStorage.removeItem("teri_token");
                    ElMessage.error("请登录后查看");
                });
            if (!result) return;
            if (result.data.code === 200) {
                context.commit("updateUser", result.data.data);
                context.state.isLogin = true;
            }
        },

        // 退出登录
        logout(context) {
            // 先修改状态再发送请求，防止token过期导致退出失败
            context.commit("initData");
            // 关闭websocket
            if (context.state.ws) {
                context.state.ws.close();
                context.commit('setWebSocket', null);
            }
            // 发送退出请求，处理redis中的缓存信息，不能用异步，不然token过期导致退出失败，后面步骤卡死
            axios.get("/api/user/account/logout", {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("teri_token"),
                },
            })
            .catch(() => {});
            // 清除本地token缓存
            localStorage.removeItem("teri_token");
        },

        // 获取全部未读消息数
        async getMsgUnread({ state }) {
            const res = await get("/msg-unread/all", {
                headers: { Authorization: "Bearer " + localStorage.getItem('teri_token') }
            });
            const data = res.data.data;
            state.msgUnread[0] = data.reply;
            state.msgUnread[1] = data.at;
            state.msgUnread[2] = data.love;
            state.msgUnread[3] = data.system;
            state.msgUnread[4] = data.whisper;
            state.msgUnread[5] = data.dynamic;
        },

        // 初始化websocket实例
        connectWebSocket({ commit, state }) {
            return new Promise((resolve) => {
                if (state.ws) {
                    state.ws.close();
                    commit('setWebSocket', null); // 关闭后清空 WebSocket 实例
                }
                const ws = new WebSocket('ws://localhost:7071/im');
                commit('setWebSocket', ws);

                ws.addEventListener('open', () => {
                    commit('handleWsOpen');
                    resolve(); // 解决 Promise
                });

                ws.addEventListener('close', () => commit('handleWsClose'));
                ws.addEventListener('message', e => commit('handleWsMessage', e));
                ws.addEventListener('error', e => commit('handleWsError', e));
            });
        },

        // 关闭后清空 WebSocket 实例
        async closeWebSocket({ commit, state }) {
            if (state.ws) {
                await state.ws.close();
                commit('setWebSocket', null);
            }
        },
    }
})