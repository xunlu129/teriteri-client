<template>
    <div class="message-loading">
        <div style="--i: 1;"></div>
        <div style="--i: 2;"></div>
        <div style="--i: 3;"></div>
        <div style="--i: 4;"></div>
        <div style="--i: 5;"></div>
        <div style="--i: 6;"></div>
        <div style="--i: 7;"></div>
        <div style="--i: 8;"></div>
        <div style="--i: 9;"></div>
        <div style="--i: 10;"></div>
        <div style="--i: 11;"></div>
        <div style="--i: 12;"></div>
    </div>
</template>

<script>
export default {
    name: "MessageLoading",
}
</script>

<style scoped>
.message-loading {
    display: inline-block;
    position: relative;
    width: 64px;
    height: 64px;
    -webkit-transform: scale(0.3);
    transform: scale(0.3);
}

.message-loading div {
    -webkit-transform-origin: 32px 32px;
    transform-origin: 32px 32px;
    -webkit-animation: lds-spinner 1.2s linear infinite;
    animation: lds-spinner 1.2s linear infinite;
    -webkit-transform: rotate(calc(var(--i) * (360deg / 12)));
    transform: rotate(calc(var(--i) * (360deg / 12)));
    -webkit-animation-delay: calc(var(--i) * 0.1s - 1.2s);
    animation-delay: calc(var(--i) * 0.1s - 1.2s);
}

.message-loading div:after {
    content: ' ';
    display: block;
    position: absolute;
    top: 3px;
    left: 29px;
    width: 5px;
    height: 14px;
    border-radius: 20%;
    background: #333;
}

@keyframes lds-spinner {
    0% {
        opacity: 1;
    }
    100% {
        opacity: 0;
    }
}
</style>