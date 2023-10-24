<template>
    <div class="category-select">
        <div
            class="select-controller"
            ref="categorySelectController"
            :class="isShowPop ? 'select-controller-selecting' : ''"
            @click="isShowPop = !isShowPop"
        >
            <p class="select-item-inserted">{{ category[0].name }} → {{ category[1].name }}</p>
            <i class="iconfont icon-xiajiantou" :class="isShowPop ? 'selecting-icon' : ''"></i>
        </div>
        <div class="drop-container" ref="categoryPop" :style="isShowPop ? '' : 'display: none;'">
            <div class="drop-main">
                <div v-if="categoryList.length != 0">
                    <div
                        class="drop-main-item"
                        :class="main == index ? 'drop-main-item-selected' : ''"
                        v-for="(item, index) in categoryList"
                        :key="index"
                        @click="selectMain(index)"
                    >{{ item.mcName }}</div>
                </div>
                
            </div>
            <div class="drop-sub" v-if="categoryList.length != 0">
                <div
                    class="drop-sub-item"
                    v-for="(item, index) in categoryList[main].scList"
                    :key="index"
                    @click="changeCategory(index)"
                >
                    <p class="item-name"
                        :class="category[0].id == item.mcId && category[1].id == item.scId ? 'drop-sub-item-selected' : ''"
                    >{{ item.scName }}</p>
                    <p class="item-descr" v-if="item.descr">{{ item.descr }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "CategorySelect",
    data() {
        return {
            isShowPop: false,
            main: 0,    // 选中主分区在categoryList中的index 控制pop的显示
            sub: 0,      // 选中子分区在categoryList中的index 控制pop的显示
        }
    },
    computed: {
        // 分区列表
        categoryList() {
            return this.$store.state.channels;
        }
    },
    props: {
        category: {
            type: Array,
            default() {
                return [{id: "anime", name: "番剧"}, {id: "finish", name: "完结动画"}];
            }
        }
    },
    methods: {
        // 点击空白处关闭气泡
        handleOutsideClick(event) {
            const csc = this.$refs.categorySelectController;
            const cp = this.$refs.categoryPop;
            if (
                !csc.contains(event.target)
                && !cp.contains(event.target)
            ) {
                this.isShowPop = false;
            }
        },

        // 点击主分类的回调
        selectMain(mainIndex) {
            this.main = mainIndex;
            let dm = document.querySelector('.drop-main');
            let dmis = document.querySelector('.drop-main-item');
            dm.scrollTo({
                behavior: "smooth",
                top: dmis.clientHeight * mainIndex,     // 滚动mainIndex个元素高度
            })
        },

        // 点击子分类的回调
        changeCategory(subIndex) {
            this.sub = subIndex;
            const main = {id: this.categoryList[this.main].mcId, name: this.categoryList[this.main].mcName};
            const sub = {id: this.categoryList[this.main].scList[this.sub].scId, name: this.categoryList[this.main].scList[this.sub].scName};
            this.$emit("update:Category", [main, sub]);     // 将分区更新回父组件
            this.isShowPop = false;
        }
    },
    mounted() {      
        // 页面渲染后创建点击事件的监听器
        window.addEventListener("click", this.handleOutsideClick);
    },
    beforeUnmount() {
        // 关闭页面前清除点击事件的监听器
        window.removeEventListener("click", this.handleOutsideClick);
    }
}
</script>

<style scoped>
.category-select {
    position: relative;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
}

*::-webkit-scrollbar {
    width: 8px;
    height: 8px;
}

*::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: #ccc;
}

.select-controller {
    padding: 7px 12px;
    border: 1px solid #dcdfe6;
    border-radius: 4px;
    min-width: 200px;
    display: inline-flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    color: #99a2aa;
    transition: border .3s ease;
    background: #fff;
}

.select-controller:hover {
    border-color: var(--brand_pink);
}

.select-controller-selecting {
    border-color: var(--brand_pink);
}

.icon-xiajiantou {
    transition: transform 0.3s;
}

.selecting-icon {
    transform: rotate(180deg);
}

.select-item-inserted {
    color: #222;
    line-height: 22px;
    height: 22px;
    font-size: 14px;
    display: inline-block;
    white-space: nowrap;
}

.drop-container {
    background: #fff;
    border: 1px solid #e5e9ef;
    box-shadow: 0 2px 4px 0 rgba(0,0,0,.14);
    border-radius: 4px;
    position: absolute;
    left: 0;
    top: 46px;
    z-index: 10;
    display: flex;
}

.drop-main {
    padding: 12px 0;
    width: 128px;
    height: 264px;
    overflow-x: hidden;
    overflow-y: auto;
}

.drop-main-item {
    padding: 12px 24px;
    width: 128px;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.drop-sub {
    border-left: 1px solid #e5e9ef;
    padding-top: 12px;
    min-width: 256px;
    height: 264px;
    overflow-x: hidden;
    overflow-y: auto;
}

.drop-sub-item {
    padding: 12px 24px;
    display: flex;
    align-items: center;
    cursor: pointer;
    min-width: 128px;
}

.item-name {
    font-size: 14px;
    color: #212121;
    margin-right: 18px;
    white-space: nowrap;
}

.item-descr {
    font-size: 12px;
    color: #999;
    white-space: nowrap;
}

.drop-main-item:hover, .drop-sub-item:hover {
    background-color: #f4f5f7;
}

.drop-main-item-selected, .drop-sub-item-selected {
    color: var(--brand_pink);
}
</style>