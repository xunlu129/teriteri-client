<template>
  <div id="app">
    <router-view></router-view>
    <div class="loading-mark" :class="isMarkShow ? 'show' : 'hide'" :style="`display: ${markDisplay};`">
      <div class="loading-box">
        <img src="~assets/img/loading.gif" alt="">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
  components: {},
  data() {
    return {
      // 加载蒙版的显隐过度
      markDisplay: "none",
      isMarkShow: false,
    }
  },
  methods: {
    // 获取频道列表
    async getChannels() {
      let res = await this.$get("/category/getall");
      // console.log("频道列表: ", res);
      this.$store.commit("updateChannels", res.data.data);
    },

    // 加载蒙版的延迟渲染效果
    show() {
      this.markDisplay = "";
      this.isMarkShow = true;
    },
    hide() {
      this.isMarkShow = false;
      setTimeout(() => {
        this.markDisplay = "none";
      }, 200);
    },

    // 开启实时通信消息服务
    async initIMServer() {
      await this.$store.dispatch("connectWebSocket");
      const connection = JSON.stringify({
        code: 100,
        content: "Bearer " + localStorage.getItem('teri_token'),
      });
      this.$store.state.ws.send(connection);
    },
  },
  async created() {
    // 如果缓存中有token，尝试获取用户数据，并建立全双工通信
    if (localStorage.getItem("teri_token")) {
      this.$store.dispatch("getPersonalInfo");
      await this.initIMServer();
    }
    this.getChannels();
  },
  watch: {
    "$store.state.isLoading"(current) {
      if (current) {
        this.show();
      } else {
        this.hide();
      }
    }
  }
};
</script>

<style>
#app {
    margin: 0 auto;
    max-width: 2560px;
    background-color: var(--bg1);
}

.loading-mark {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 50000;
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
}

.loading-box {
  display: flex;
  height: 100vh;
  width: 100vw;
  align-items: center;
  justify-content: center;
}

.loading-box img {
  max-height: 33vh;
  max-width: 33vw;
}

.hide {
  animation: fade-out 0.2s ease-out forwards;
}

.show {
  animation: fade-in 0.2s ease-out forwards;
}

/* 淡入动画 */
@keyframes fade-in {
    0% {
        opacity: 0; /* 初始状态透明 */
    }
    100% {
        opacity: 1; /* 最终状态不透明 */
    }
}

/* 淡出动画 */
@keyframes fade-out {
    0% {
        opacity: 1; /* 初始状态不透明 */
    }
    100% {
        opacity: 0; /* 最终状态透明 */
    }
}
</style>
