<template>
    <div class="dialog">
        {{ path }}
    </div>
</template>

<script>
export default {
    name: 'WhisperDialog',
    data() {
        return {
            path: 1,
        }
    },
    methods: {
        ///////// 请求 /////////
        // 清除红点
        clearRed() {
            let i = this.$store.state.chatList.findIndex(item => item.chat.userId === this.path);
            if (i !== -1) {
                this.$store.state.chatList[i].chat.unread = 0;
            }
        }
    },
    mounted() {
        this.path = Number(this.$route.params.mid);
        this.clearRed();
    },
    watch: {
        // 监听路由变化打开对应聊天
        "$route.path"() {            
            this.path = Number(this.$route.params.mid);
            this.clearRed();
        }
    }
}
</script>

<style scoped>

</style>