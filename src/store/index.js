import { createStore } from 'vuex'

export default createStore({
    state: {
        // 分区列表
        channels: [],
        // 轮播图列表
        carousels: [],
    },
    mutations: {
        // 更新分区列表
        updateChannels(state, channels) {
            state.channels = channels;
            // console.log("vuex中的分区: ", state.channels);
        },
        // 更新轮播图列表
        updateCarousels(state, carousels) {
            state.carousels = carousels;
            // console.log("vuex中的轮播图: ", state.carousels);
        }
    }
})