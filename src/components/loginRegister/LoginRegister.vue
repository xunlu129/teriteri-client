<template>
    <div class="login-register">
        <div class="canvas-wrapper">
            <div class="video-wrapper">
                <video
                    src="~assets/video/BadApple.mp4"
                    id="login-video" ref="loginVideo"
                    muted autoplay loop
                ></video>
            </div>
            <canvas id="cvs" width="360" height="360"></canvas>
            <canvas id="cvs2" width="360" height="360" @click="playVideo" loop></canvas>
        </div>
        <div class="login-register-container">
            <el-tabs stretch class="login-tabs" @tab-click="handleClick">
                <el-tab-pane label="登录" lazy>
                    <div class="login-box">
                        <el-input type="text" class="input" v-model="usernameLogin" placeholder="请输入账号" />
                        <el-input type="password" show-password class="input" v-model="passwordLogin" placeholder="请输入密码" />
                        <div class="submit" @click="submitLogin">登&nbsp;录</div>
                        <div class="tips">登录即代表你同意我们的<span class="agreement">用户协议</span></div>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="注册" lazy>
                    <div class="register-box">
                        <el-input type="text" class="input" v-model="usernameRegister" placeholder="请输入账号" maxlength="50" />
                        <el-input type="password" show-password class="input" v-model="passwordRegister" placeholder="请输入密码" />
                        <el-input type="password" show-password class="input" v-model="confirmedPassword" placeholder="再次确认密码" />
                        <div class="submit" @click="submitRegister">注&nbsp;册</div>
                    </div>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<script>
import { ElMessage } from 'element-plus';
import axios from 'axios';

export default {
    name: "LoginRegister",
    data() {
        return {
            videoElement: null,
            usernameLogin: "",
            passwordLogin: "",
            usernameRegister: "",
            passwordRegister: "",
            confirmedPassword: "",
            type: 1,    // 1登录 2注册
        }
    },
    mounted() {
        this.videoElement = this.$refs.loginVideo;
        this.init();
        document.addEventListener('keydown', (e) => this.handleKeyboard(e));
    },
    beforeUnmount() {
        document.removeEventListener('keydown', (e) => this.handleKeyboard(e));
    },
    methods: {

        // canvas 动画
        init() {
            const ctx = document.getElementById("cvs").getContext("2d");
            const ctx2 = document.getElementById("cvs2").getContext("2d");

            this.videoElement.crossOrigin = "anonymous";    // 允许在不同域之间共享资源

            const playVideo = () => {
                requestAnimationFrame(playVideo);   // 每一帧之间调用 playVideo 函数，实现连续播放
                const { width, height } = ctx.canvas;
                ctx.drawImage(this.videoElement, 0, 0, width, height);   // 从视频元素中绘制图像数据到画布上
                const data = ctx.getImageData(0, 0, width, height).data;
                ctx2.clearRect(0, 0, width, height);    // 清除第二个画布，以便在每一帧之间重新绘制像素数据
                const bl = 12;
                // 计算 x 和 y 坐标的最大值
                const maxX = Math.ceil(width / bl);
                const maxY = Math.ceil(height / bl);
                ctx.font = "5px serif";
                for (let x = 0; x < maxX; x++) {
                    for (let y = 0; y < maxY; y++) {
                        const i = (y * bl * width + x * bl) * 4;
                        const g = parseInt(
                            (data[i] + data[i + 1] + data[i + 2]) / 1.5
                        );  // 计算当前像素的灰度值
                        ctx2.fillStyle = `rgba(${g}, ${g}, ${g}, ${data[i + 3]})`;  // 绘制文本的颜色，透明度取自当前像素
                        ctx2.fillText("0", x * bl, y * bl);   // 文本填充
                    }
                }
            };
            playVideo();
        },
        playVideo() {
            this.videoElement.play();
        },

        // 点击标签页触发的事件
        handleClick(tab) {
            if (tab.props.label === '登录') {
                this.type = 1;
            } else {
                this.type = 2;
            }
        },

        // 监听键盘回车触发登录
        handleKeyboard(event) {
            if (event.keyCode === 13 && this.type === 1) {
                this.submitLogin();
            }
        },

        // 登录的回调
        async submitLogin() {
            // 前端先做判断，减轻服务器负担
            if (this.usernameLogin.trim() == "") {
                ElMessage.error("请输入账号");
                return;
            }
            if (this.passwordLogin == "") {
                ElMessage.error("请输入密码");
                return;
            }
            this.$store.state.isLoading = true;
            // 这里为了更方便捕捉到错误后给出提示，就不使用封装的函数了
            const result = await axios.post("/api/user/account/login", {
                username: this.usernameLogin.toString(),
                password: this.passwordLogin.toString(),
            }).catch(() => {
                ElMessage.error("特丽丽被玩坏了");
                this.$store.state.isLoading = false;
            });
            if (!result) {
                this.$store.state.isLoading = false;
                return;
            }
            if (result.data.code !== 200) {
                ElMessage.error(result.data.message);
                this.$store.state.isLoading = false;
            }
            if (result.data.code === 200) {
                localStorage.setItem("teri_token", result.data.data.token); // 浏览器缓存token
                this.$store.commit("updateUser", result.data.data.user);    // 更新vuex中当前用户信息
                await this.$store.dispatch("getMsgUnread");
                await this.initIMServer();  // 开启即时通信websocket
                await this.getFavorites();
                await this.getLikeAndDisLikeComment();
                ElMessage.success(result.data.message);
                this.$store.commit("updateIsLogin", true);  // 修改在线状态
                this.$emit("loginSuccess"); // 触发父组件关闭登录框的回调
                this.$store.state.isLoading = false;
            }
        },

        async submitRegister() {
            // 前端先做判断，减轻服务器负担
            if (this.usernameRegister.trim() == "") {
                ElMessage.error("账号不能为空");
                return;
            }
            if (this.passwordRegister == "" || this.confirmedPassword == "") {
                ElMessage.error("密码不能为空");
                return;
            }
            if (this.passwordRegister != this.confirmedPassword) {
                ElMessage.error("两次输入的密码不一致");
                return;
            }

            const result = await this.$post("/user/account/register", {
                username: this.usernameRegister.toString(),
                password: this.passwordRegister.toString(),
                confirmedPassword: this.confirmedPassword.toString(),
            });
            if (!result) return;
            if (result.data.code === 200) {
                ElMessage.success(result.data.message);
                this.usernameRegister = "";
                this.passwordRegister = "";
                this.confirmedPassword = "";
            }
        },

        
        // 开启实时通信消息服务
        async initIMServer() {
            await this.$store.dispatch("connectWebSocket");
            const connection = JSON.stringify({
                code: 100,
                content: "Bearer " + localStorage.getItem('teri_token'),
            });
            this.$store.state.ws.send(connection);
        },

        // 获取当前用户的收藏夹列表
        async getFavorites() {
            const res = await this.$get("/favorite/get-all/user", {
                params: { uid: this.$store.state.user.uid },
                headers: { Authorization: "Bearer " + localStorage.getItem("teri_token") }
            });
            if (!res.data.data) return;
            // 将默认置顶
            const defaultFav = res.data.data.find(item => item.type === 1);
            const list = res.data.data.filter(item => item.type !== 1);
            list.unshift(defaultFav);
            this.$store.commit("updateFavorites", list);
        },

        // 获取用户赞踩的评论集合
        async getLikeAndDisLikeComment() {
            const res = await this.$get("/comment/get-like-and-dislike", {
                params: { uid: this.$store.state.user.uid },
                headers: { Authorization: "Bearer " + localStorage.getItem("teri_token") }
            });
            if (!res.data) return;
            this.$store.commit("updateLikeComment", res.data.data.userLike);
            this.$store.commit("updateDislikeComment", res.data.data.userDislike);
        }
    }
}
</script>

<style scoped>
.login-register {
    position: relative;
    display: flex;
    width: 100%;
    height: 100%;
}
.canvas-wrapper {
    position: relative;
    width: 360px;
    height: 360px;
}

.video-wrapper {
    visibility: hidden;
    position: absolute;
    width: 360px;
    height: 360px;
}

.video-wrapper video {
    object-fit: fill;
    display: block;
}

#cvs {
    visibility: hidden;
    position: absolute;
}

#cvs2 {
    position: absolute;
    top: 4px;
    left: 5px;
}

.login-register-container {
    display: block;
    width: 360px;
    height: 360px;
    padding: 30px 40px;
}

.login-tabs {
    width: 80%;
    margin: 0 auto;
}

.login-box, .register-box {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.login-box .input, .login-box .submit, .login-box .tips {
    margin-top: 30px;
    width: 100%;
}

.register-box .input, .register-box .submit, .register-box .tips {
    margin-top: 20px;
    width: 100%;
}

.submit {
    color: #fff;
    border-radius: 4px;
    background-color: var(--brand_pink);
    text-align: center;
    padding: 10px 15px;
    cursor: pointer;
}

.submit:hover {
    background-color: #f992af;
}

.tips {
    color: var(--text2);
    font-size: 12px;
    text-align: center;
}

.tips .agreement {
    color: var(--brand_blue);
    margin-left: 4px;
    cursor: pointer;
}

/* element 元素 */
.el-input {
    --el-input-focus-border: #ccc;
    --el-input-focus-border-color: #ccc;
    --el-input-border-radius: 10px;
    --el-input-height: 40px;
}

.el-input /deep/ .el-input__inner {
    padding: 8px 15px;
}

.el-input /deep/ .el-input__icon {
    margin-right: 8px;
}

.login-register-container /deep/ .el-tabs__active-bar {
    height: 3px;
}

.login-register-container /deep/ .el-tabs__nav-wrap::after {
    height: 0;
}

.login-register-container /deep/ .el-tabs__item {
    font-size: 17px;
}
</style>