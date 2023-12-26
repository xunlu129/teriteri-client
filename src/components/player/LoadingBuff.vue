<template>
    <div class="loading-buff">
        <span style="--i: 1;"></span>
        <span style="--i: 2;"></span>
        <span style="--i: 3;"></span>
        <span style="--i: 4;"></span>
        <span style="--i: 5;"></span>
        <span style="--i: 6;"></span>
        <span style="--i: 7;"></span>
        <span style="--i: 8;"></span>
        <span style="--i: 9;"></span>
        <span style="--i: 10;"></span>
        <span style="--i: 11;"></span>
        <span style="--i: 12;"></span>
    </div>
</template>

<script>
export default {
    name: "LoadingBuff",
}
</script>

<style scoped>
.loading-buff span {
    height: 4px;
    width: 4px;
    position: absolute;
    border-radius: 50%;
    background: var(--brand_pink);
    transform: rotate(calc(var(--i) * (360deg / 12))) translateY(15px);
    animation: loading-buff 1.2s linear infinite;
    animation-delay: calc(var(--i) * 0.1s - 1.2s);
    opacity: 0;
}

@keyframes loading-buff {
    0% {
        opacity: 1;
    }
    100% {
        opacity: 0;
    }
}
</style>