<template>
    <div class="message-reply">
        
    </div>
</template>

<script>
export default {
    name: "MessageReply",
    methods: {
        async clearUnread() {
            const formData = new FormData();
            formData.append("column", "reply");
            await this.$post("/msg-unread/clear", formData, {
                headers: { Authorization: "Bearer " + localStorage.getItem("teri_token") }
            })
        }
    },
    created() {
        this.clearUnread();
    }
}
</script>

<style scoped>

</style>