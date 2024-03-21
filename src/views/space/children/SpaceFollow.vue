<template>
    <div class="space-follow">
        我的关注
    </div>
</template>

<script>
export default {
    name: "SpaceFollow",
    mounted() {
        this.$emit("updateNavIdx", 5);
    }
}
</script>

<style scoped>

</style>