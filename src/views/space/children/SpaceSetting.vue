<template>
    <div class="space-setting">
        空间设置
    </div>
</template>

<script>
export default {
    name: "SpaceSetting",
    mounted() {
        this.$emit("updateNavIdx", 4);
    }
}
</script>

<style scoped>

</style>