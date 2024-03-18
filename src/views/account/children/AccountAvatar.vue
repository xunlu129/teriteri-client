<template>
    <div class="account-avatar">
        <div class="header">
            <span class="header-icon"></span>
            <span class="header-text">我的头像</span>
        </div>
        <div class="avatar-content">
            <!-- 裁剪器 -->
            <div class="img-clip-wrap">
                <input type="file" accept="image/png, image/jpg, image/jpeg" ref="picInput" @change="handlePicChange" style="display: none;">
                <div class="choose-box" v-show="isCurrAvatar"
                    @dragover.prevent
                    @dragenter.prevent
                    @dragleave.prevent
                    @drop.prevent
                    @drop="handlePicDrop"
                    @click="selectPic"
                >
                    <img src="~assets/img/icon_add_img.png" alt="">
                    <span>选择本地图片</span>
                </div>
                <CropperDefault v-if="!isCurrAvatar"
                    :imgUrl="imgUrl"
                    :wrapWidth="wrapWidth"
                    :wrapHeight="wrapHeight"
                    v-model:prevWidth="prevWidth"
                    v-model:prevHeight="prevHeight"
                    v-model:prevOffsetX="prevOffsetX"
                    v-model:prevOffsetY="prevOffsetY"
                    v-model:cutOrder="cutOrder"
                    @cut="send"
                ></CropperDefault>
                <div class="reset-img" v-show="!isCurrAvatar" @click="selectPic">
                    <svg t="1710752071995" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4266" width="14" height="14"><path d="M264.26481778 266.05795555c130.55317333-130.54407111 337.08259555-139.81923555 478.53112889-27.97112888l-83.01226667 0.08192 0.08192 81.92 181.4528-0.17294222a40.96 40.96 0 0 0 40.91448889-40.31374223l2.82168889-177.41141333-81.91089778-1.30161778-1.26520889 79.62624c-173.71591111-144.33393778-432.74695111-135.17710222-595.54019556 27.62524444-83.95889778 83.95889778-129.98883555 195.57034667-129.63384888 314.30883556l81.92-0.24576c-0.30037333-96.75662222 37.22808889-187.72423111 105.64039111-256.14563556zM865.37557333 501.55064889c0.30037333 96.76572445-37.21898667 187.72423111-105.64039111 256.14563556-68.12103111 68.12103111-158.69724445 105.64949333-255.04426667 105.64949333-83.79505778 0-163.20284445-28.40803555-227.2915911-80.61838223l87.6179911-0.08192-0.08192-81.92-181.4528 0.17294223a40.96 40.96 0 0 0-40.91448888 40.31374222l-2.83079112 177.41141333 81.91089778 1.30161778 1.21059556-75.97624889c79.15292445 65.59971555 177.72999111 101.32593778 281.82300444 101.32593778 118.22876445 0 229.376-46.03904 312.97080889-129.63384889 83.95889778-83.95889778 129.99793778-195.57944889 129.63384889-314.31793778l-81.91089778 0.22755556zM223.82364445 783.51018667l0.00910222-0.74638222h0.72817778l-0.73728 0.74638222z" p-id="4267"></path></svg>
                    <span>重新选择</span>
                </div>
            </div>
            <div class="border-line"></div>
            <!-- 预览 -->
            <div class="img-preview-wrap">
                <div class="pre-container" :style="`width: ${wrapWidth}px; height: ${wrapHeight}px;`">
                    <img v-show="imgUrl" :src="imgUrl" alt=""
                        :style="`width: ${prevWidth}px;
                                height: ${prevHeight}px;
                                transform: translateX(-${prevOffsetX}px) translateY(-${prevOffsetY}px);`">
                </div>
                <div class="pre-info">{{ isCurrAvatar ? '当前头像' : '预览头像' }}</div>
            </div>
        </div>
        <p class="descript">请选择图片上传：大小180 * 180像素以上，支持JPG、PNG等格式，图片需小于5M</p>
        <div class="footer">
            <div class="btn" :class="{'enable': !isCurrAvatar}" @click="submit">更新</div>
        </div>
    </div>
</template>

<script>
import { ElMessage } from 'element-plus';
import CropperDefault from '@/components/cropper/CropperDefault.vue';

export default {
    name: "AccountAvatar",
    components: {
        CropperDefault
    },
    data() {
        return {
            imgUrl: null,   // 预览图地址
            wrapWidth: 96,  // 预览容器宽   手动设置
            wrapHeight: 96, // 预览容器高   手动设置
            prevWidth: 96,  // 预览图实际宽 初始值设为和上面一致
            prevHeight: 96, // 预览图实际高 初始值设为和上面一致
            prevOffsetX: 0, // 预览图水平偏移量
            prevOffsetY: 0, // 预览图垂直偏移量
            cutOrder: false,    // 裁剪命令 由false变为true就裁剪
            loading: false, // 正在裁剪并上传
        }
    },
    computed: {
        isCurrAvatar() {
            return !this.imgUrl || this.imgUrl === this.$store.state.user.avatar_url || !this.$store.state.user.uid;
        }
    },
    methods: {
        // 初始化
        init() {
            this.prevWidth = this.wrapWidth;
            this.prevHeight = this.wrapHeight;
            this.prevOffsetX = 0;
            this.prevOffsetY = 0;
        },

        // 触发图片选择对话框
        selectPic() {
            this.$refs.picInput.click();
        },

        // 处理图片选择事件
        handlePicChange(event) {
            const file = event.target.files[0];
            const maxSizeInBytes = 5 * 1024 * 1024; // 5MB
            if (!file) {
                return;
            }
            if (file.size <= maxSizeInBytes) {
                // 文件大小符合要求，可以继续处理上传逻辑
                const reader = new FileReader();
                reader.onload = (e) => {
                    this.imgUrl = e.target.result;
                }
                reader.readAsDataURL(file);
            } else {
                // 文件大小超出限制
                ElMessage.error("只能上传5M的图片哦")
            }
        },

        // 处理拖拽事件
        handlePicDrop(event) {
            event.preventDefault();
            const file = event.dataTransfer.files[0];
            const maxSizeInBytes = 5 * 1024 * 1024; // 5MB
            if (!file) {
                return;
            }
            if (file.type != "image/png" && file.type !="image/jpeg") {
                ElMessage.error("图片只接收jpg或png格式哦");
                return;
            }
            if (file.size <= maxSizeInBytes) {
                // 文件大小符合要求，可以继续处理上传逻辑
                const reader = new FileReader();
                reader.onload = (e) => {
                    this.imgUrl = e.target.result;
                }
                reader.readAsDataURL(file);
            } else {
                // 文件大小超出限制
                ElMessage.error("只能上传5M的图片哦")
            }
        },

        // 发送裁剪指令
        submit() {
            if (this.loading || this.isCurrAvatar) return;
            this.loading = true;
            this.cutOrder = true;
        },

        // 将收到的裁剪好的图片发送后端
        send(img) {
            // console.log(img);
            fetch(img)
            .then(response => response.blob())
            .then(blob => {
                const avatar = new File([blob], '新头像.jpg', { type: 'image/jpeg' });  // 名字不重要，后端会重命名
                // console.log("新头像: ", avatar);
                const formData = new FormData();
                formData.append('file', avatar);
                // 发送请求
                this.$post("/user/avatar/update", formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: "Bearer " + localStorage.getItem("teri_token"),
                    }
                })
                .then(res => {
                    if (res.data.code === 200) {
                        ElMessage.success("头像更新成功");
                        this.$store.state.user.avatar_url = res.data.data;
                    }
                })
            })
            .catch(() => {
                ElMessage.error('特丽丽被玩坏了(¯﹃¯)');
            })
            .finally(() => {
                this.loading = false;
            })
        },
    },
    mounted() {
        if (this.$store.state.user.avatar_url) {
            this.imgUrl = this.$store.state.user.avatar_url;
        }
    },
    watch: {
        "$store.state.user": {
            handler(curr) {
                this.imgUrl = curr.avatar_url;
                this.init();
            },
            deep: true
        }
    }
}
</script>

<style scoped>
.header {
    height: 50px;
    padding-left: 30px;
    border-bottom: 1px solid #ddd;
}

.header-icon {
    float: left;
    width: 4px;
    height: 16px;
    margin-top: 17px;
    background-color: #FF7DA1;
    border-radius: 4px;
}

.header-text {
    float: left;
    margin: 17px 0 0 5px;
    color: #FF7DA1;
    font-size: 14px;
    cursor: default;
}

.avatar-content {
    padding: 80px 20px 56px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.img-clip-wrap {
    height: 182px;
    width: 182px;
    position: relative;
    margin-right: 40px;
}

.choose-box {
    width: 182px;
    height: 84px;
    background: #f1f2f5;
    border: 1px solid #e5e9ef;
    cursor: pointer;
    border-radius: 4px;
    transition: all .6s ease;
    display: flex;
    align-items: center;
    padding-left: 23px;
    position: absolute;
    top: 49px;
}

.choose-box:hover {
    background: #e5e9ef;
}

.choose-box img {
    height: 36px;
    width: 36px;
}

.choose-box span {
    display: block;
    font-size: 14px;
    color: #5a6267;
    line-height: 20px;
    margin-left: 6px;
}

.reset-img {
    position: absolute;
    bottom: -28px;
    left: 50%;
    transform: translate(-50%);
    display: flex;
    font-size: 12px;
    color: #6d757a;
    fill: #6d757a;
    cursor: pointer;
}

.reset-img:hover {
    color: var(--Pi4);
    fill: var(--Pi4);
}

.reset-img svg {
    margin-right: 4px;
}

.border-line {
    height: 182px;
    width: 1px;
    background: #e5e9ef;
    float: left;
}

.img-preview-wrap {
    margin-left: 40px;
}

.pre-container {
    overflow: hidden;
    border-radius: 50%;
    border: 1px solid #e6eaf0;
    position: relative;
    box-sizing: initial;
    background: #f1f2f5;
}

.pre-info {
    margin-top: 20px;
    font-size: 12px;
    color: #99a2aa;
    text-align: center;
}

.descript {
    line-height: 16px;
    color: #99a2aa;
    text-align: center;
}

.footer {
    text-align: center;
    margin-top: 40px;
    height: 36px;
    position: relative;
}

.btn {
    height: 36px;
    width: 110px;
    border-radius: 4px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    color: var(--text2);
    background: #ddd;
    text-align: center;
    line-height: 36px;
    cursor: default;
}

.btn.enable {
    cursor: pointer;
    background: #FF7DA1;
    color: #fff;
}
</style>