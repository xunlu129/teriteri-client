<template>
    <div class="space-favlist">
        我的收藏
    </div>
</template>

<script>
export default {
    name: "SpaceFavlist",
    mounted() {
        this.$emit("updateNavIdx", 3);
    }
}
</script>

<style scoped>

</style>