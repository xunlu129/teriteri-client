<template>
    <div class="space">
        <HeaderBar :isFixHeaderBar="true"></HeaderBar>
        <div class="space-container">
            个人空间
        </div>
    </div>
</template>

<script>
import HeaderBar from '@/components/headerBar/HeaderBar.vue';

export default {
    name: "SpaceView",
    components: {
        HeaderBar,
    },
}
</script>

<style scoped>
.space-container {
    width: auto;
    padding: 64px 10px 0px;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    box-sizing: content-box;
    position: relative;
}
</style>