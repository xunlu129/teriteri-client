<template>
    <div class="navBarContainer">
        <div class="barItem" 
                :class="index == activeNum ? 'active' : ''"
                v-for="(item, index) in navBarItem"
                :key="index"
                @click="clickBarItem(item.path, index)">{{ item.name }}</div>
    </div>
</template>

<script>
export default {
    name: 'NavBar',
    data() {
        return {
            activeNum: 0,
        }
    },
    props: {
        navBarItem: {
            type: Array,
            default() {
                return [];
            }
        }
    },
    created() {
        // 根据地址判断 activeNum
        this.navBarItem.forEach((item, index) => {
            if (decodeURI(this.$route.path).search(item.path) != -1) {
                this.activeNum = index;
            }
        });
    },
    methods: {
        clickBarItem(path, index) {
            if (this.activeNum == index) {
                return;
            }
            // console.log(path);
            this.activeNum = index;
            this.$emit("clickBarItem", path);
        }
    }
}
</script>

<style scoped>
.navBarContainer {
    height: 64px;
    border-bottom: 1px solid #e7e7e7;
    display: flex;
    box-sizing: border-box;
}

.barItem {
    height: 64px;
    padding-bottom: 18px;
    padding-top: 26px;
    margin-left: 40px;
    font-size: 16px;
    color: #505050;
    height: 100%;
    cursor: pointer;
}

.active {
    color: var(--brand_pink);
    font-weight: 600;
    border-bottom: 3px solid var(--brand_pink);
}
</style>