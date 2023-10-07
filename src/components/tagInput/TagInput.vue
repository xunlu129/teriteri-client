<template>
    <div class="tag-input">
        <div class="tag-input-container" :class="isFocus ? 'isfocus' : ''">
            <div class="tag-pre-wrp">
                <div class="label-item-container" v-for="(item, index) in tags" :key="index" @click="removeTag(index)">
                    <p class="label-item-content">{{ item }}</p>
                    <i class="iconfont icon-close"></i>
                </div>
            </div>
            <div class="input-instance">
                <el-input
                    type="text"
                    maxlength="20"
                    placeholder="按回车键Enter创建标签"
                    class="input-val"
                    v-model="input"
                    @focus="isFocus = true;"
                    @blur="isFocus = false;"
                    @keyup.enter="addTag"
                />
            </div>
            <p class="tag-last-wrp">还可以添加{{ 10 - tags.length }}个标签</p>
        </div>
    </div>
</template>

<script>
import { ElMessage } from 'element-plus';

export default {
    name: "TagInput",
    data() {
        return {
            isFocus: false,
            input: "",
            tags: [],
        }
    },
    props: {
        // 用于接收点击添加的标签，在watch里监听变化，使用v-model:sendTag进行双向绑定
        sendTag: {
            type: String,
            default() {
                return "";
            }
        },
    },
    methods: {
        addTag() {
            const tag = this.input.trim();
            if (tag.length <= 0 || this.tags.length >= 10) return;
            if (this.tags.findIndex(curr=>curr==tag) != -1) {
                ElMessage.error("标签已存在，不能重复添加");
                return;
            }
            this.tags.push(tag);
            this.input = "";
            // console.log("添加的标签: ", this.tags);
            this.$emit("updateTags", this.tags);
        },

        removeTag(index) {
            this.tags.splice(index, 1);
            this.$emit("updateTags", this.tags);
        }
    },
    watch: {
        "sendTag"(current) {
            if (current != "") {
                if (this.tags.findIndex(curr=>curr==current) != -1) {
                    this.$emit("update:sendTag", "");
                    return;
                }
                this.tags.push(current);
                this.$emit("updateTags", this.tags);
                this.$emit("update:sendTag", "");
            }
        },
    }
}
</script>

<style scoped>
.tag-input-container {
    height: 100%;
    border: 1px solid #dcdfe6;
    border-radius: 4px;
    padding: 0 12px;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    transition: border .3s ease;
}

.tag-input-container:hover, .isfocus {
    border: 1px solid var(--brand_pink);
}

.tag-pre-wrp {
    display: flex;
    flex-wrap: wrap;
}

.label-item-container {
    margin: 4px 6px 4px 0;
    background: var(--brand_pink);
    border-radius: 4px;
    display: flex;
    align-items: center;
    padding: 0 9px 0 11px;
    cursor: pointer;
}

.label-item-content {
    line-height: 30px;
    max-width: 240px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    color: #fff;
    font-size: 12px;
}

.icon-close {
    color: #fff;
    font-size: 13px;
    width: 9px;
}

.input-instance {
    flex: 1;
    min-width: 240px;
    margin: 6px 0;
}

.input-val {
    display: block;
    width: 100%;
    color: #222;
    line-height: 22px;
    height: 22px;
    font-size: 14px;
    outline: 0;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    border: 0;
    background-color: transparent;
}

.input-val /deep/ .el-input__wrapper {
    padding: unset;
    box-shadow: none;
    width: 100%;
}

.input-val /deep/ .el-input__inner {
    height: unset;
    line-height: unset;
}

.tag-last-wrp {
    font-size: 14px;
    color: #858585;
    margin: 10px 0 10px 12px;
    cursor: default;
}
</style>