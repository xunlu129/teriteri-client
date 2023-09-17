<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
  components: {},
  methods: {
    // 获取频道列表
    async getChannels() {
      let res = await this.$get("/mc/getall");
      // console.log("频道列表: ", res);
      this.$store.commit("updateChannels", res.data.data);
    }
  },
  created() {
    this.getChannels();
  }
};
</script>

<style>
#app {
    margin: 0 auto;
    max-width: 2560px;
    background-color: var(--bg1);
}
</style>
