<template>
    <div class="color-picker v-ui v-ui-dark">
        <div class="v-ui-area">
            <div class="color-picker-wrap" style="width: 176px;">
                <div class="color-picker-result">
                    <span class="color-picker-input v-ui v-ui-input">
                        <div class="v-ui-area">
                            <div class="v-ui-input-wrap">
                                <input v-model="hexColor" @input="validateColor" class="v-ui-input-input" type="text" placeholder="限制'#FFFFFF'格式">
                            </div>
                        </div>
                    </span>
                    <span class="color-picker-display" :style="`background: ${color};`"></span>
                </div>
                <ul class="color-picker-options">
                    <li class="color-picker-option" :class="{'active': color === '#FE0302'}" style="background: #FE0302;" @click="selectColor('#FE0302')"></li>
                    <li class="color-picker-option" :class="{'active': color === '#FF7204'}" style="background: #FF7204;" @click="selectColor('#FF7204')"></li>
                    <li class="color-picker-option" :class="{'active': color === '#FFAA02'}" style="background: #FFAA02;" @click="selectColor('#FFAA02')"></li>
                    <li class="color-picker-option" :class="{'active': color === '#FFD302'}" style="background: #FFD302;" @click="selectColor('#FFD302')"></li>
                    <li class="color-picker-option" :class="{'active': color === '#FFFF00'}" style="background: #FFFF00;" @click="selectColor('#FFFF00')"></li>
                    <li class="color-picker-option" :class="{'active': color === '#A0EE00'}" style="background: #A0EE00;" @click="selectColor('#A0EE00')"></li>
                    <li class="color-picker-option" :class="{'active': color === '#00CD00'}" style="background: #00CD00;" @click="selectColor('#00CD00')"></li>
                    <li class="color-picker-option" :class="{'active': color === '#019899'}" style="background: #019899;" @click="selectColor('#019899')"></li>
                    <li class="color-picker-option" :class="{'active': color === '#4266BE'}" style="background: #4266BE;" @click="selectColor('#4266BE')"></li>
                    <li class="color-picker-option" :class="{'active': color === '#89D5FF'}" style="background: #89D5FF;" @click="selectColor('#89D5FF')"></li>
                    <li class="color-picker-option" :class="{'active': color === '#CC0273'}" style="background: #CC0273;" @click="selectColor('#CC0273')"></li>
                    <li class="color-picker-option" :class="{'active': color === '#222222'}" style="background: #222222;" @click="selectColor('#222222')"></li>
                    <li class="color-picker-option" :class="{'active': color === '#9B9B9B'}" style="background: #9B9B9B;" @click="selectColor('#9B9B9B')"></li>
                    <li class="color-picker-option" :class="{'active': color === '#FFFFFF'}" style="background: #FFFFFF;" @click="selectColor('#FFFFFF')"></li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "ColorPicker",
    props: {
        color: {
            type: String,
            default() {
                return '#FFFFFF';
            }
        }
    },
    data() {
        return {
            hexColor: this.color,
        };
    },
    methods: {
        validateColor() {
            // 使用正则表达式验证颜色格式
            const hexRegex = /^#[0-9A-Fa-f]{6}$/;
            if (hexRegex.test(this.hexColor)) {
                // 如果格式正确，更新color属性
                this.$emit("update:color", this.hexColor);
            }
        },
        selectColor(color) {
            this.$emit("update:color", color);
        }
    },
    watch: {
        "color"(curr) {
            this.hexColor = curr;
        }
    }
}
</script>

<style scoped>
.color-picker-result {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    height: 22px;
    margin-bottom: 6px;
    vertical-align: middle;
}

.color-picker-input {
    margin-right: 6px;
    width: auto;
    flex: 1;
}

.v-ui-input-input {
    background-color: transparent;
    border: 1px solid hsla(0,0%,100%,.2);
    color: #fff;
    -webkit-transition: none;
    transition: none;
}

.color-picker-display {
    border: 1px solid rgba(0,0,0,.3);
    border-radius: 2px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    display: inline-block;
    -webkit-transform: translateZ(0);
    transform: translateZ(0);
    -webkit-transition: background .2s;
    transition: background .2s;
    vertical-align: middle;
    width: 50px;
}

.v-ui-dark .color-picker-display {
    border: 1px solid hsla(0,0%,100%,.2);
}

.color-picker-options {
    font-size: 0;
    line-height: 0;
    list-style-type: none;
    margin: 0 -6px 0 0;
    padding: 0;
    white-space: normal;
    margin-right: -10.666666666666666px;
}

.color-picker-option {
    border: 1px solid rgba(0,0,0,.3);
    border-radius: 2px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    cursor: pointer;
    display: inline-block;
    height: 16px;
    margin-bottom: 4px;
    margin-right: 10.666666666666666px;
    width: 16px;
}

.color-picker-option.active {
    -webkit-box-shadow: 0 0 1px 1px #fff;
    box-shadow: 0 0 1px 1px #fff;
}

.v-ui-dark .color-picker-option.active {
    border-color: #000
}
</style>