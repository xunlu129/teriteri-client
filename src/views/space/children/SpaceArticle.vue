<template>
    <div class="space-article">
        图文投稿
    </div>
</template>

<script>
export default {
    name: "SpaceArticle",
    mounted() {
        this.$emit("updateNavIdx", 2);
    }
}
</script>

<style scoped>

</style>