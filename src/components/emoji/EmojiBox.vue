<template>
    <div class="emoji-box" :style="`display: ${show ? 'block' : 'none'};`">
        <div class="static-popup">
            <div class="close-btn" @click="closeBox">
                <svg t="1702107603641" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7402" width="20" height="20"><path d="M791.67016602 269.61962891l-37.28979493-37.28320313L512 474.71020508l-242.3737793-242.3803711-37.28979492 37.28979493L474.71020508 512l-242.3737793 242.38037109 37.28320313 37.28979493L512 549.28979492l242.38037109 242.3803711 37.28979493-37.28979493L549.28979492 512z" p-id="7403"></path></svg>
            </div>
            <div class="title">
                <span>表情</span>
            </div>
            <div class="content-ctnr">
                <div class="emoji-page">
                    <ul class="emoji-list">
                        <li class="emoji" @click="insertEmoji(item)" v-for="(item, index) in emojis" :key="index">
                            <div :title="item.name" :style="`width: 100%; height: 100%; background-image: url('${item.url}'); background-size: cover;`"></div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import EmojiJson from '@/assets/json/emoji.json';

export default {
    name: "EmojiBox",
    data() {
        return {
            emojis: EmojiJson,
        }
    },
    props: {
        // 表情框显示的双向绑定
        show: {
            type: Boolean,
            default() {
                return true;
            }
        }
    },
    methods: {
        closeBox() {
            this.$emit("update:show", false);
        },

        insertEmoji(e) {
            this.$emit("insertEmoji", e);
        }
    }
}
</script>

<style scoped>
.emoji-box {
    position: absolute;
    top: -257px;
    left: -10px;
}

.static-popup {
    display: inline-block;
    position: relative;
    border: 1px solid #e5e9ef;
    border-radius: 8px;
    background-color: #fff;
    -webkit-box-shadow: 0 3px 5px 0 rgba(0,0,0,0.17);
    box-shadow: 0 3px 5px 0 rgba(0,0,0,0.17);
    opacity: 1;
    margin-top: 0;
    z-index: 20;
    width: 380px;
}

.close-btn {
    position: absolute;
    top: 14px;
    right: 14px;
    width: 20px;
    height: 20px;
    fill: #999;
    cursor: pointer;
}

.title {
    padding: 15px;
    font-size: 14px;
    color: #222;
    text-align: left;
}

.emoji-page {
    position: relative;
    height: 200px;
    padding: 0 7px 0 15px;
    overflow-x: hidden;
    overflow-y: auto;
}

.emoji-page::-webkit-scrollbar {
    width: 6px;
    height: 6px;
    background-color: rgba(1,1,1,0);
}

.emoji-page::-webkit-scrollbar-thumb {
    background: #aaa;
    border-radius: 4px;
}

.emoji-list {
    display: inline-block;
    list-style: none;
    padding: 0;
    margin: 0 0 0 -12px;
}

.emoji {
    margin: 0;
    padding: 0;
    width: 38px;
    height: 38px;
    padding: 3px;
    margin-left: 12px;
    margin-bottom: 12px;
    line-height: 38px;
    float: left;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    cursor: pointer;
    font-size: 12px;
    background-color: #fff;
    -webkit-transition: background-color 0.2s ease;
    transition: background-color 0.2s ease;
}
</style>