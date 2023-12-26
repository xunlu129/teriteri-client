<template>
    <div class="player-loading">
        <div class="loading-top">
            <div class="obj"></div>
            <div class="obj"></div>
            <div class="obj"></div>
            <div class="obj"></div>
            <div class="obj"></div>
            <div class="obj"></div>
            <div class="obj"></div>
            <div class="obj"></div>
        </div>
        <div class="loading-bottom">你感兴趣的视频都在T站</div>
    </div>
</template>

<script>
export default {
    name: "PlayerLoading",
}
</script>

<style scoped>
.player-loading {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    position: relative;
}

.loading-top {
    height: 50px;
    display: flex;
    align-items: center;
}

.obj {
    width: 6px;
    height: 20px;
    background: rgba(255, 255, 255, 0.8);
    margin: 0 4px;
    border-radius: 10px;
    animation: loading 1.6s infinite;
}

.obj:nth-child(2) {
    animation-delay: -1.4s;
}

.obj:nth-child(3) {
    animation-delay: -1.2s;
}

.obj:nth-child(4) {
    animation-delay: -1s;
}

.obj:nth-child(5) {
    animation-delay: -0.8s;
}

.obj:nth-child(6) {
    animation-delay: -0.6s;
}

.obj:nth-child(7) {
    animation-delay: -0.4s;
}

.obj:nth-child(8) {
    animation-delay: -0.2s;
}

@keyframes loading {
    0% {
        height: 20px;
    }
    50% {
        height: 50px;
    }
    100% {
        height: 20px;
    }
}

.loading-bottom {
    margin-top: 10px;
    font-size: 14px;
    line-height: 20px;
    color: rgba(255, 255, 255, 0.8);
}
</style>