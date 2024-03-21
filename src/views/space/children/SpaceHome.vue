<template>
    <div class="space-home">
        主页
    </div>
</template>

<script>
export default {
    name: "SpaceHome",
    mounted() {
        this.$emit("updateNavIdx", 0);
    }
}
</script>

<style scoped>

</style>