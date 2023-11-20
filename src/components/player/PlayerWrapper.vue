<template>
    <div id="playerWrap" class="player-wrap" :style="`height: ${wrapHeight}px; width: ${wrapWidth}px;`">
        <!-- 占位模板 -->
        <div class="player-placeholder">
            <div class="player-placeholder-top"></div>
            <div class="player-placeholder-bottom">
                <div class="player-placeholder-bottom-left"></div>
                <div class="player-placeholder-bottom-right"></div>
            </div>
        </div>
        <!-- 主体 -->
        <div class="player">
            <div class="player-primary-area">
                <!-- 视频播放区域 -->
                <div class="player-video-area">

                </div>
                <!-- 发送弹幕区域 -->
                <div class="player-sending-area">
                    <div class="player-video-info">
                        <div class="player-video-info-dm">
                            已装填 {{ 114514 }} 条弹幕
                        </div>
                    </div>
                    <div class="player-dm-root">
                        <div class="player-dm-switch" @click="changeDanmu">
                            <svg v-if="danmuOpen" t="1700487450055" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7051" width="100%" height="100%"><path d="M673.10933333 432.64H616.6755552v40.50488854h56.43377813v-40.50488854z m-106.95111146 0h-53.7031104v40.50488854h53.7031104v-40.50488854z m0 82.37511147h-53.7031104v38.22933333h53.7031104v-38.22933333z m106.95111146 0H616.6755552v38.22933333h56.43377813v-38.22933333z m-27.30666666-206.16533333l48.69688853 17.29422186c-10.0124448 23.66577813-21.39022187 44.60088853-33.67822187 63.2604448h57.344v207.0755552h-101.94488853v37.77422187h121.0595552v47.78666667l-0.45511147 0.45511146h-120.60444373l-0.45511147-0.45511146c-30.9475552-33.22311147-82.83022187-35.49866667-116.5084448-4.5511104l-5.00622186 5.00622186h-46.42133334v-48.24177813h117.41866667v-37.77422187h-99.66933333v-207.0755552h59.1644448a386.38933333 386.38933333 0 0 0-36.864-60.9848896l46.87644373-15.92888853c13.65333333 19.56977813 26.3964448 40.50488853 36.4088896 62.80533333l-30.94755627 13.65333334h68.26666667c14.5635552-24.576 26.3964448-51.88266667 37.31911147-80.0995552z m-212.08177814 21.84533333v151.552H344.97422187l-6.82666667 66.44622187h98.75911147c0 84.65066667-3.18577813 141.0844448-7.73688854 169.7564448-5.9164448 28.672-30.9475552 44.14577813-76.00355626 47.3315552-12.74311147 0-25.48622187-0.91022187-39.59466667-1.8204448l-13.19822187-47.78666667c12.74311147 1.36533333 26.8515552 2.2755552 40.50488854 2.27555627 24.576 0 38.6844448-7.73688853 41.87022293-23.66577814 3.64088853-15.92888853 5.46133333-49.60711147 5.46133333-101.94488853H285.35466667l13.65333333-154.28266667h83.28533333v-63.71555626H289.90577813v-43.69066667h143.8151104v-0.4551104z" fill="#61666D" p-id="7052"></path><path d="M792.9856 171.40622187a182.0444448 182.0444448 0 0 1 181.8624 172.94222293l0.1820448 9.10222187v113.77777813a45.51111147 45.51111147 0 0 1-90.7036448 5.27928854l-0.31857813-5.3248V353.45066667a91.02222187 91.02222187 0 0 0-84.1955552-90.7491552l-6.82666667-0.27306667H229.28497813a91.02222187 91.02222187 0 0 0-90.79466666 84.24106667l-0.22755627 6.82666667v427.30382186a91.02222187 91.02222187 0 0 0 84.19555627 90.79466667l6.82666666 0.2275552h300.55537707a45.51111147 45.51111147 0 0 1 5.3248 90.7036448l-5.3248 0.31857813H229.28497813a182.0444448 182.0444448 0 0 1-181.8168896-172.94222293l-0.2275552-9.10222187v-427.34933333a182.0444448 182.0444448 0 0 1 172.94222187-181.81688853l9.10222293-0.22755627h563.70062187z" fill="#61666D" p-id="7053"></path><path d="M286.76551147 48.2076448a45.51111147 45.51111147 0 0 1 60.07466666-3.77742293l4.27804374 3.77742293 136.53333333 136.53333334a45.51111147 45.51111147 0 0 1-60.07466667 68.17564373l-4.27804373-3.77742187-136.53333333-136.53333333a45.51111147 45.51111147 0 0 1 0-64.39822187z" fill="#61666D" p-id="7054"></path><path d="M715.20711147 48.2076448a45.51111147 45.51111147 0 0 0-60.07466667-3.77742293l-4.2780448 3.77742293-136.53333333 136.53333334a45.51111147 45.51111147 0 0 0 60.07466666 68.17564373l4.2780448-3.77742187 136.53333334-136.53333333a45.51111147 45.51111147 0 0 0 0-64.39822187z" fill="#61666D" p-id="7055"></path><path d="M896.3868448 596.02488854a45.51111147 45.51111147 0 0 1 69.95057707 57.9356448l-3.64088854 4.41457813-245.39591146 260.9152a45.51111147 45.51111147 0 0 1-61.53102187 4.36906667l-4.36906667-3.95946667-118.01031146-122.33386667a45.51111147 45.51111147 0 0 1 61.30346666-67.03786666l4.23253334 3.86844373 84.7872 87.88195627 212.67342293-226.0536896z" fill="#FF6699" p-id="7056"></path></svg>
                            <svg v-else t="1700488288201" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7204" width="100%" height="100%"><path d="M673.10933333 432.64H616.6755552v40.50488854h56.43377813v-40.50488854z m-106.95111146 0h-53.7031104v40.50488854h53.7031104v-40.50488854z m0 82.37511147h-53.7031104v38.22933333h53.7031104v-38.22933333z m106.95111146 0H616.6755552v38.22933333h56.43377813v-38.22933333z m-27.30666666-206.16533333l48.69688853 17.29422186c-10.0124448 23.66577813-21.39022187 44.60088853-33.67822187 63.2604448h57.344v207.0755552h-101.94488853v37.77422187h44.60088853l-15.01866666 48.24177813h-29.58222187l-0.45511147-0.45511146-121.51466666 0.45511146h-46.42133334v-48.24177813h117.41866667v-37.77422187h-99.66933333v-207.0755552h59.1644448a386.38933333 386.38933333 0 0 0-36.864-60.9848896l46.87644373-15.92888853c13.65333333 19.56977813 26.3964448 40.50488853 36.4088896 62.80533333l-30.94755627 13.65333334h68.26666667c14.5635552-24.576 26.3964448-51.88266667 37.31911147-80.0995552z m-212.08177814 21.84533333v151.552H344.97422187l-6.82666667 66.44622187h98.75911147c0 84.65066667-3.18577813 141.0844448-7.73688854 169.7564448-5.9164448 28.672-30.9475552 44.14577813-76.00355626 47.3315552-12.74311147 0-25.48622187-0.91022187-39.59466667-1.8204448l-13.19822187-47.78666667c12.74311147 1.36533333 26.8515552 2.2755552 40.50488854 2.27555627 24.576 0 38.6844448-7.73688853 41.87022293-23.66577814 3.64088853-15.92888853 5.46133333-49.60711147 5.46133333-101.94488853H285.35466667l13.65333333-154.28266667h83.28533333v-63.71555626H289.90577813v-43.69066667h143.8151104v-0.4551104z" fill="#61666D" p-id="7205"></path><path d="M792.9856 171.40622187a182.0444448 182.0444448 0 0 1 181.8624 172.94222293l0.1820448 9.10222187v79.18933333a45.51111147 45.51111147 0 0 1-90.7036448 5.3248l-0.31857813-5.3248v-79.18933333a91.02222187 91.02222187 0 0 0-84.1955552-90.7491552l-6.82666667-0.27306667H229.28497813a91.02222187 91.02222187 0 0 0-90.79466666 84.24106667l-0.22755627 6.82666667v427.30382186a91.02222187 91.02222187 0 0 0 84.19555627 90.79466667l6.82666666 0.2275552h300.55537707a45.51111147 45.51111147 0 0 1 5.3248 90.7036448l-5.3248 0.31857813H229.28497813a182.0444448 182.0444448 0 0 1-181.8168896-172.94222293l-0.2275552-9.10222187v-427.34933333a182.0444448 182.0444448 0 0 1 172.94222187-181.81688853l9.10222293-0.22755627h563.70062187z" fill="#61666D" p-id="7206"></path><path d="M286.76551147 48.2076448a45.51111147 45.51111147 0 0 1 60.07466666-3.77742293l4.27804374 3.77742293 136.53333333 136.53333334a45.51111147 45.51111147 0 0 1-60.07466667 68.17564373l-4.27804373-3.77742187-136.53333333-136.53333333a45.51111147 45.51111147 0 0 1 0-64.39822187z" fill="#61666D" p-id="7207"></path><path d="M715.20711147 48.2076448a45.51111147 45.51111147 0 0 0-60.07466667-3.77742293l-4.2780448 3.77742293-136.53333333 136.53333334a45.51111147 45.51111147 0 0 0 60.07466666 68.17564373l4.2780448-3.77742187 136.53333334-136.53333333a45.51111147 45.51111147 0 0 0 0-64.39822187z" fill="#61666D" p-id="7208"></path><path d="M785.06666667 490.66666667a227.5555552 227.5555552 0 1 0 0 455.11111147 227.5555552 227.5555552 0 0 0 0-455.11111147z m0 91.02222187a136.53333333 136.53333333 0 1 1 0 273.06666666 136.53333333 136.53333333 0 0 1 0-273.06666666z" fill="#61666D" p-id="7209"></path><path d="M870.94613333 571.99502187a45.51111147 45.51111147 0 0 1 66.7648 61.57653333l-3.8684448 4.18702294-229.28497706 219.31804373a45.51111147 45.51111147 0 0 1-66.7648-61.57653333l3.86844373-4.18702187 229.28497813-219.3635552z" fill="#61666D" p-id="7210"></path></svg>
                        </div>
                        <div class="player-dm-setting">
                            <svg t="1700490442936" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3841" width="100%" height="100%"><path d="M167.25546667 293.9904h-54.61333333c-40.84622222 0-73.95555555-33.10933333-73.95555555-73.95555555s33.10933333-73.95555555 73.95555555-73.95555556h54.61333333c40.84622222 0 73.95555555 33.10933333 73.95555555 73.95555556s-33.10933333 73.95555555-73.95555555 73.95555555zM732.73102222 293.9904h-366.36444444c-40.84622222 0-73.95555555-33.10933333-73.95555555-73.95555555s33.10933333-73.95555555 73.95555555-73.95555556h366.36444444c40.84622222 0 73.95555555 33.10933333 73.95555557 73.95555556s-33.10933333 73.95555555-73.95555557 73.95555555zM367.50435555 589.81262222h-254.86222221c-40.84622222 0-73.95555555-33.10933333-73.95555555-73.95555555s33.10933333-73.95555555 73.95555555-73.95555556h254.86222221c40.84622222 0 73.95555555 33.10933333 73.95555556 73.95555556s-33.10933333 73.95555555-73.95555556 73.95555555zM195.69991111 884.49706667h-83.05777777c-40.84622222 0-73.95555555-33.10933333-73.95555555-73.95555556s33.10933333-73.95555555 73.95555555-73.95555556h83.05777777c40.84622222 0 73.95555555 33.10933333 73.95555556 73.95555556s-33.10933333 73.95555555-73.95555556 73.95555556zM392.53546667 884.49706667h-1.13777778c-40.84622222 0-73.95555555-33.10933333-73.95555556-73.95555556s33.10933333-73.95555555 73.95555556-73.95555556h1.13777778c40.84622222 0 73.95555555 33.10933333 73.95555555 73.95555556s-33.10933333 73.95555555-73.95555555 73.95555556zM995.83075556 599.1424l-106.26844445-184.06968889a67.34392889 67.34392889 0 0 0-58.33386666-33.67822222h-212.5368889a67.35758222 67.35758222 0 0 0-58.33386666 33.67822222l-106.26844443 184.06968889a67.38488889 67.38488889 0 0 0 0 67.35644445l106.26844443 184.06968888a67.34392889 67.34392889 0 0 0 58.33386666 33.67822222h212.54826667c24.064 0 46.29617778-12.83413333 58.33386667-33.67822222l106.26844445-184.06968888a67.35644445 67.35644445 0 0 0-0.01137778-67.35644445z m-270.87075555 108.97635555c-41.58577778 0-75.29813333-33.71235555-75.29813334-75.29813333 0-41.58577778 33.71235555-75.29813333 75.29813334-75.29813333 41.58577778 0 75.29813333 33.71235555 75.29813332 75.29813333 0 41.58577778-33.71235555 75.29813333-75.29813332 75.29813333z" p-id="3842" fill="#61666D"></path></svg>    
                        </div>
                        <div class="player-dm-inputbar">
                            <div class="player-video-inputbar-wrap">
                                <div class="player-dm-btn-font">
                                    <svg t="1700493799646" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6734" width="20" height="20"><path d="M220.36510341 728.70570667h139.03341036l57.78818844-140.5868563h226.4147437l54.9143135 140.5868563h146.25693392L584.41515614 45.96622222H480.64496829l-260.27986488 682.73948445zM609.81399703 473.94057482H447.01286399L530.43291021 234.70990222 609.81399703 474.01824711zM166.30518518 819.65996563v136.54789689h728.17777778V819.58229333H166.30518518z" fill="#61666D" p-id="6735"></path></svg>    
                                </div>
                                <el-input
                                    type="text"
                                    maxlength="100"
                                    placeholder="发个友善的弹幕见证当下"
                                    class="player-dm-input"
                                    v-model="input"
                                />
                            </div>
                            <div class="player-dm-btn-send">发送</div>
                        </div>
                    </div>
                </div>
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
            danmuOpen: true,    // 是否开启弹幕
            input: '',  // 要发送的弹幕内容
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
            this.$emit('resize', width);
        },

        // 打开关闭弹幕
        changeDanmu() {
            if (this.danmuOpen) {
                this.danmuOpen = false;
                localStorage.setItem("danmuOpen", 'off');
            } else {
                this.danmuOpen = true;
                localStorage.setItem("danmuOpen", 'on');
            }
        }
    },
    mounted() {
        this.changeWindowSize();
        window.addEventListener('resize', this.changeWindowSize);
        if (localStorage.getItem("danmuOpen") === 'off') {
            this.danmuOpen = false;
        }
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

.player {
    position: relative;
    height: 100%;
    width: 100%;
}

.player-primary-area {
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-direction: column;
    flex-direction: column;
    -ms-flex-wrap: nowrap;
    flex-wrap: nowrap;
    height: 100%;
    width: 100%;
}

.player-video-area {
    -webkit-box-flex: 1;
    background-color: #000;
    -ms-flex: 1;
    flex: 1;
    overflow: hidden;
    position: relative;
}

.player-sending-area {
    -webkit-box-flex: 0;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    background: #fff;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    align-items: center;
    -ms-flex: none;
    flex: none;
    font-size: 12px;
    height: 46px;
    justify-content: space-between;
    padding: 0 12px;
    font-size: 13px;
}

.player-video-info {
    -ms-flex-negative: 1;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    color: var(--text2);
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    flex-shrink: 1;
    height: 16px;
    line-height: 18px;
    margin-right: 24px;
    overflow: hidden;
    position: relative;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    white-space: nowrap;
}

.player-video-info-dm {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.player-dm-root {
    -webkit-box-flex: 1;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -ms-flex: auto;
    flex: auto;
    height: 34px;
}

.player-dm-root svg:hover path {
    fill: var(--brand_pink);
}

.player-dm-switch, .player-dm-setting {
    cursor: pointer;
    height: 24px;
    line-height: 30px;
    margin-right: 12px;
    position: relative;
    width: 24px;
}

.player-dm-inputbar {
    -ms-flex-align: center;
    -ms-flex-positive: 1;
    background: #F1F2F3;
    color: #999;
    flex-grow: 1;
    -webkit-box-align: center;
    -webkit-box-flex: 1;
    align-items: center;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    position: relative;
    border-radius: 8px;
    height: 32px;
    min-width: 300px;
    width: calc(100% - 72px);
}

.player-video-inputbar-wrap {
    -webkit-box-align: center;
    -webkit-box-flex: 1;
    align-items: center;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    position: relative;
    -ms-flex-align: center;
    border-radius: 8px 0 0 8px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    -ms-flex: 1;
    flex: 1;
    height: 100%;
    width: 200px;
}

.player-dm-btn-font {
    -webkit-box-flex: 0;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    cursor: pointer;
    -ms-flex: none;
    flex: none;
    position: relative;
    text-align: center;
    height: 30px;
    width: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding-left: 6px;
}

.player-dm-btn-font:hover svg path {
    fill: var(--brand_pink);
}

.player-dm-input {
    -webkit-box-flex: 1;
    -ms-flex-positive: 1;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    flex-grow: 1;
    height: 28px;
    line-height: 28px;
    min-width: 100px;
    padding: 0 10px 0 5px;
    width: 100%;
    z-index: 12;
    outline: 0;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    border: 0;
}

.player-dm-input /deep/ .el-input__wrapper {
    padding: unset;
    box-shadow: none;
    width: 100%;
    background: none;
}

.player-dm-input /deep/ .el-input__inner {
    height: inherit;
    line-height: inherit;
    color: #18191C;
}

.player-dm-btn-send {
    border-radius: 0 8px 8px 0;
    height: 100%;
    line-height: 32px;
    min-width: 62px;
    font-size: 13px;
    overflow: hidden;
    text-align: center;
    width: 62px;
    z-index: 13;
    background-color: var(--brand_pink);
    color: #fff;
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    transition: 0.3s all;
}

.player-dm-btn-send:hover {
    background-color: var(--Pi4);
}

@media screen and (min-width: 1681px) {
    .player-placeholder-bottom {
        height: 56px;
    }

    .player-sending-area {
        font-size: 14px;
        height: 56px;
    }

    .player-video-info {
        line-height: 20px;
        margin-right: 36px;
    }

    .player-dm-switch, .player-dm-setting {
        margin-right: 18px;
    }

    .player-dm-inputbar {
        height: 40px;
        width: calc(100% - 84px);
    }
    
    .player-dm-btn-send {
        width: 64px;
        font-size: 14px;
        line-height: 40px;
    }
}
</style>