<template>
    <div class="add-to-favorite">
        <div class="title">添加到收藏夹</div>
        <div class="content">
            <div class="group-list">
                <ul>
                    <li :class="currSelected.has(item.fid) ? 'selected' : ''" @click="selectOrCancel(item.fid)" v-for="(item, index) in favorites" :key="index">
                        <label>
                            <span class="select-box">
                                <i class="iconfont icon-gou"></i>
                            </span>
                            <span :title="item.title" class="fav-title">{{ item.title }}</span>
                            <span class="count">{{ item.count }}{{ item.type === 1 ? "" : "/1000" }}</span>
                        </label>
                    </li>
                    <div class="collection-mask" v-if="isCreating"></div>
                </ul>
                <div class="add-group">
                    <div class="add-btn" v-if="!isCreating" @click="(e) => startCreating(e)"><i class="iconfont icon-jia"></i>新建收藏夹</div>
                    <div class="input-group" v-else>
                        <input type="text" v-model="input" maxlength="20" placeholder="最多输入20个字">
                        <button class="create-btn" @click="create">新建</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="bottom">
            <button class="submit" :class="{'disable': isCreating || areSetsEqual}" @click="submit">确定</button>
        </div>
    </div>
</template>

<script>
import { ElMessage } from 'element-plus';

export default {
    name: "AddToFavorite",
    data() {
        return {
            favorites: [], // 收藏夹列表 vuex中的副本 方便修改收藏数
            currSelected: new Set(),   // 当前选中的收藏夹ID
            isCreating: false,  // 是否正在创建收藏夹
            input: "",  // 新建收藏夹名字
        }
    },
    props: {
        // 原本已经收藏了的收藏夹ID 方便比较新添加和移除
        lastSelected: {
            type: Set,
            default() {
                return new Set();
            }
        },
        vid: {
            type: Number,
            default() {
                return 0;
            }
        }
    },
    computed: {
        // 判断勾选的收藏夹ID集合是否跟之前有变化
        areSetsEqual() {
            if (this.lastSelected.size !== this.currSelected.size) {
                return false;
            }
            return Array.from(this.lastSelected).every(value => this.currSelected.has(value));
        }
    },
    methods: {
        ///////// 请求 ///////////
        // 创建新收藏夹
        async create() {
            if (this.input.length === 0) {
                ElMessage.error("请输入收藏夹名字");
                return;
            }
            const formData = new FormData();
            formData.append("title", this.input);
            formData.append("desc", "");
            formData.append("visible", 1);
            const res = await this.$post("/favorite/create", formData, {
                headers: { Authorization: "Bearer " + localStorage.getItem("teri_token") }
            });
            if (!res.data) {
                ElMessage.error("特丽丽被玩坏了QAQ");
                return;
            }
            this.currSelected = new Set([...this.lastSelected]);    // 初始化已选的，防止出现收藏数量偏差
            this.$store.state.favorites.splice(1, 0, res.data.data);    // 在第二个位置插入新收藏夹，即默认收藏夹后面
            this.input = "";
            this.isCreating = false;
        },

        // 添加收藏夹提交
        async submit() {
            if (this.areSetsEqual) return;
            if (this.vid === 0) {
                ElMessage.error("视频不存在");
                return;
            }
            const remove = Array.from(this.lastSelected).filter(value => !this.currSelected.has(value));
            const add = Array.from(this.currSelected).filter(value => !this.lastSelected.has(value));
            // 如果之前没有收藏，现在有新加入的收藏夹，就标记为收藏
            const isCollect = this.lastSelected.size === 0 && add.length > 0;
            // 如果没有要新加入的收藏夹，且之前有收藏，并且现在要移除的收藏夹与之前的全部一样，就标记为需要取消收藏
            const isCancel = add.length === 0 && this.lastSelected.size > 0 && this.lastSelected.size === remove.length && remove.every(value => this.lastSelected.has(value));
            const formData = new FormData();
            formData.append("vid", Number(this.vid));
            formData.append("adds", add.join(','));
            formData.append("removes", remove.join(','));
            const res = await this.$post("/video/collect", formData, {
                headers: { Authorization: "Bearer " + localStorage.getItem("teri_token") }
            })
            if (!res.data) return;
            if (isCollect) {
                this.$store.state.attitudeToVideo.collect = true;
            } else if (isCancel) {
                this.$store.state.attitudeToVideo.collect = false;
            }
            const info = {
                fids: this.currSelected,
                num: isCollect ? 1 : isCancel ? -1 : 0
            }
            this.$store.commit("updateFavorites", this.favorites);
            this.$emit("collected", info);
        },
        

        ///////// 事件 ///////////
        // 选择或者取消选择
        selectOrCancel(fid) {
            let favItem = this.favorites.find(item => item.fid === fid);
            if (this.currSelected.has(fid)) {
                this.currSelected.delete(fid);
                favItem.count --;
            } else {
                this.currSelected.add(fid);
                favItem.count ++;
            }
        },

        // 开始创建收藏夹
        startCreating(event) {
            this.isCreating = true;
            event.stopPropagation();
        },

        // 点击空白处关闭创建输入框
        handleOutsideClick(event) {
            const addGroup = document.querySelector(".add-group");
            const submitBtn = document.querySelector(".submit");
            if (!addGroup.contains(event.target) && !submitBtn.contains(event.target)) {
                this.isCreating = false;
            }
        },

    },
    created() {
        this.favorites = JSON.parse(JSON.stringify(this.$store.state.favorites));
        this.currSelected = new Set([...this.lastSelected]);    // 将 lastSelected 中的元素添加到新的 Set 中
    },
    mounted() {
        window.addEventListener("click", this.handleOutsideClick);
    },
    beforeUnmount() {
        window.removeEventListener("click", this.handleOutsideClick);
    },
    watch: {
        "$store.state.favorites": {
            handler(curr) {
                this.favorites = JSON.parse(JSON.stringify(curr));
                // console.log("监听到vuex的收藏夹列表变化: ", this.favorites);
            },
            deep: true
        }
    }
}
</script>

<style scoped>
.add-to-favorite {
    width: 420px;
    border-radius: 4px;
    background: #FFFFFF;
    overflow: hidden;
}

.title {
    position: relative;
    padding: 0 20px;
    height: 50px;
    line-height: 50px;
    font-size: 16px;
    color: var(--text1);
    border-bottom: var(--line_regular);
    text-align: center;
}

.content {
    padding: 0 36px;
    height: 300px;
    overflow: auto;
}

.group-list {
    max-height: 300px;
    padding-bottom: 14px;
}

ol, ul {
    list-style: none;
}

.group-list ul {
    position: relative;
    margin-top: 24px;
    min-height: 210px;
}

.group-list li {
    padding-bottom: 24px;
    font-size: 14px;
    color: var(--text1);
    cursor: pointer;
}

.group-list li:hover {
    color: var(--brand_pink);
}

.group-list li label {
    cursor: pointer;
    display: block;
}
.group-list li .select-box {
    position: relative;
    display: inline-flex;
    width: 20px;
    height: 20px;
    border: 2px solid #ccc;
    border-radius: 3px;
    align-items: center;
    justify-content: center;
    margin-right: 18px;
    vertical-align: middle;
}

.group-list li:hover .select-box {
    border: 2px solid var(--brand_pink);
}

.selected .select-box {
    background-color: var(--brand_pink);
    border: 1px solid var(--brand_pink) !important;
}

.icon-gou {
    color: #fff;
    font-size: 25px;
    transform: translateX(0.5px);
}

.fav-title {
    max-width: 220px;
    display: inline-block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    vertical-align: middle;
    line-height: 20px;
}

.selected .fav-title {
    color: var(--brand_pink);
}

.count {
    float: right;
    color: var(--text2);
    font-size: 12px;
    line-height: 18px;
}

.collection-mask {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    opacity: 0.5;
    background: #FFFFFF;
    background: var(--bg1_float);
}

.add-group {
    margin-bottom: 5px;
    width: 348px;
}

.add-btn {
    height: 34px;
    line-height: 34px;
    border: 1px solid var(--text3);
    border-radius: 4px;
    font-size: 12px;
    color: var(--text2);
    cursor: pointer;
    box-sizing: unset;
}

.add-btn:hover {
    border: 1px solid var(--brand_pink);
}

.icon-jia {
    margin: 0 10px;
}

.input-group {
    height: 34px;
    line-height: 34px;
    border: 1px solid var(--brand_pink);
    border-radius: 4px;
    position: relative;
    box-sizing: unset;
}

.input-group input {
    border: none;
    font-size: 12px;
    width: 200px;
    margin-left: 10px;
    padding: 0;
    box-shadow: none;
    height: 100%;
    background: transparent;
    color: var(--text1);
    outline: none;
}

.input-group .create-btn {
    float: right;
    height: 34px;
    width: 90px;
    background: var(--Pi1);
    border: none;
    border-left: 1px solid var(--brand_pink);
    border-radius: 0 4px 4px 0;
    font-size: 14px;
    color: var(--brand_pink);
    cursor: pointer;
}

.bottom {
    height: 76px;
    text-align: center;
    margin: 0 36px;
    border-top: 1px solid var(--line_regular);
}

.submit {
    font-size: 14px;
    width: 160px;
    height: 40px;
    margin-top: 18px;
    background: var(--brand_pink);
    border: none;
    border-radius: 4px;
    color: #fff;
    cursor: pointer;
}

.submit:hover {
    background: var(--Pi4);
}

.submit.disable {
    background-color: var(--graph_bg_thick);
    color: var(--text3);
}
</style>