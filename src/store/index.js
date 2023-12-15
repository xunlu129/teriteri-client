import { createStore } from 'vuex'
import axios from 'axios';
import { ElMessage } from 'element-plus';

export default createStore({
    state: {
        // 是否加载中
        isLoading: false,
        // 是否登录
        isLogin: false,
        // 当前用户
        user: {},
        // 分区列表
        channels: [],
        // 轮播图列表
        carousels: [],
        // 弹幕列表
        danmuList: [],
        // 未读消息数
        msgUnread: [11, 0, 45, 1, 4],
        // 聊天列表
        chatList: [],
        // 实时通讯的socket
        ws: null,
    },
    mutations: {
        // 更新登录状态
        updateIsLogin(state, isLogin) {
            state.isLogin = isLogin;
        },
        // 更新当前用户
        updateUser(state, user) {
            state.user = user;
            console.log("更新vuex中用户信息: ", state.user);
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
            console.log("vuex中的弹幕列表: ", state.danmuList);
        },
        // 追加更新聊天列表
        updateChatList(state, chatList) {
            state.chatList.push(...chatList);
            console.log("vuex中的聊天列表: ", state.chatList);
        },

        // 处理websocket事件
        setWebSocket(state, ws) {
            state.ws = ws;
        },
        handleWsOpen() {
            console.log("实时通信websocket已建立");
        },
        handleWsClose() {
            console.log("实时通信websocket关闭,请刷新页面重试");
        },
        handleWsMessage(_, e) {
            const data = JSON.parse(e.data);
            console.log(data);
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
                // 修改当前的登录状态
                context.state.isLogin = false;
                // 清空user信息
                context.state.user = {};
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
            // 修改当前的登录状态
            context.state.isLogin = false;
            // 清空user信息
            context.state.user = {};
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
            });
            // 清除本地token缓存
            localStorage.removeItem("teri_token");
        },

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
        closeWebSocket({ commit, state }) {
            if (state.ws) {
                state.ws.close();
                commit('setWebSocket', null); // 关闭后清空 WebSocket 实例
            }
        },
    }
})