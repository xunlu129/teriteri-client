import { createStore } from 'vuex'

export default createStore({
    state: {
        // 轮播图列表
        carousels: [],
    },
    mutations: {
        // 更新轮播图列表
        updateCarousels(state, carousels) {
            state.carousels = carousels;
            // console.log("vuex中的轮播图: ", state.carousels);
        }
    }
})