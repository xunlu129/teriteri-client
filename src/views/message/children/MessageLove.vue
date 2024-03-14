<template>
    <div class="message-love">

    </div>
</template>

<script>
export default {
    name: "MessageLove",
    methods: {
        async clearUnread() {
            const formData = new FormData();
            formData.append("column", "love");
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