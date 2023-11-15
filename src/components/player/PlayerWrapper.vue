<template>
    <div id="playerWrap" class="player-wrap" :style="`height: ${wrapHeight}px; width: ${wrapWidth}px;`">
        <div class="player-placeholder">
            <div class="player-placeholder-top"></div>
            <div class="player-placeholder-bottom">
                <div class="player-placeholder-bottom-left"></div>
                <div class="player-placeholder-bottom-right"></div>
            </div>
        </div>

    </div>
</template>

<script>
export default {
    name: "PlayerWrapper",
    data() {
        return {
            wrapWidth: 704,
            wrapHeight: 442,
            videoWidth: 704,
            videoHeight: 396,
        }
    },
    methods: {
        changeWindowSize() {
            const windowWidth = window.innerWidth;
            const windowHeight = window.innerHeight;
            let rightWidth, bottomHeight;   // 整体布局的right-container宽度和底部的发送弹幕栏的高度
            if (windowWidth < 1681) {
                rightWidth = 380;
                bottomHeight = 46;
            } else {
                rightWidth = 441;
                bottomHeight = 56;
            }
            
            let heigth = (windowHeight - 64) * 0.7;    // 初始使高为屏高的70%
            let width = (heigth - bottomHeight) * (16/9);    // 初始根据比例计算宽

            // 限制宽的范围
            if ((windowWidth - width - rightWidth) < 112) {
                // 表示宽度溢出了，重新计算宽并用其计算高
                width = windowWidth - rightWidth - 112;
                heigth = width * (9/16) + bottomHeight;
            }

            // 最后限制高的范围，并以最后高为准计算最后宽
            if (windowWidth < 1681) {
                heigth = Math.max(424, heigth);
            } else {
                heigth = Math.max(434, heigth);
            }
            heigth = Math.min(1010, heigth);
            width = (heigth - bottomHeight) * (16/9);

            // 更新宽高
            this.wrapWidth = width;
            this.wrapHeight = heigth;
            this.videoWidth = width;
            this.videoHeight = heigth - bottomHeight;
        }
    },
    mounted() {
        this.changeWindowSize();
        window.addEventListener('resize', this.changeWindowSize);
    },
    unmounted() {
        window.removeEventListener('resize', this.changeWindowSize);
    }
}
</script>

<style scoped>
.player-wrap {
    position: relative;
}

.player-placeholder {
    position: absolute;
    display: flex;
    z-index: 0;
    width: 100%;
    height: 100%;
    flex-direction: column;
    flex-wrap: nowrap;
    box-shadow: 0 0 8px var(--bg3);
}

.player-placeholder-top {
    flex: 1;
    overflow: hidden;
    position: relative;
    background-color: #000;
}

.player-placeholder-bottom {
    position: relative;
    display: flex;
    height: 46px;
    align-items: center;
    padding: 0 12px;
    background: var(--bg1);
}

@media screen and (min-width: 1681px) {
    .player-placeholder-bottom {
        height: 56px;
    }
}

.player-placeholder-bottom-left {
    margin-right: 10px;
    width: 176px;
    height: 22px;
    background-color: rgba(0, 0, 0, 0.04);
}

.player-placeholder-bottom-right {
    height: 22px;
    flex-grow: 1;
    background-color: rgba(0, 0, 0, 0.04);
}
</style>