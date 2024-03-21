<template>
    <div class="space-fans">
        我的粉丝
    </div>
</template>

<script>
export default {
    name: "SpaceFans",
    mounted() {
        this.$emit("updateNavIdx", 6);
    }
}
</script>

<style scoped>

</style>