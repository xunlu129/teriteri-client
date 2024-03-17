<template>
    <div class="account-security">
        <div class="header">
            <span class="header-icon"></span>
            <span class="header-text">账号安全</span>
        </div>
        <div class="info-wrap">
            <div class="form-item password-input">
                <label class="form-item__label">旧密码:</label>
                <div class="form-item__content">
                    <el-input type="password" show-password placeholder="输入旧密码" v-model="password" maxlength="50" />
                </div>
            </div>
            <div class="form-item password-input">
                <label class="form-item__label">新密码:</label>
                <div class="form-item__content">
                    <el-input type="password" show-password placeholder="设置新密码" v-model="newPassword" maxlength="50" />
                </div>
            </div>
            <div class="form-item password-input">
                <label class="form-item__label">确认密码:</label>
                <div class="form-item__content">
                    <el-input type="password" show-password placeholder="确认新密码" v-model="confirmPassword" maxlength="50" />
                </div>
            </div>
            <div class="form-item submit-btn">
                <div class="form-item__content">
                    <div class="padding-dom"></div>
                    <div class="btn-wrap">
                        <div class="btn" :class="{'enable': enable}" @click="submit">重置密码</div>
                    </div>
                    <div class="delete-wrap">
                        <span class="delete" @click="noPage">注销账号</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ElMessage, ElMessageBox } from 'element-plus';

export default {
    name: "AccountSecurity",
    data() {
        return {
            password: "",
            newPassword: "",
            confirmPassword: "",
            isLoading: false,
        }
    },
    computed: {
        enable() {
            return this.password !== "" && this.newPassword !== "" && this.confirmPassword !== "";
        }
    },
    methods: {
        async submit() {
            if (!this.enable || this.isLoading) return;
            if (this.newPassword !== this.confirmPassword) {
                ElMessage.warning("两次输入的新密码不一致")
            }
            this.isLoading = true;
            const formData = new FormData();
            formData.append("pw", this.password);
            formData.append("npw", this.newPassword);
            const res = await this.$post("/user/password/update", formData, {
                headers: { Authorization: "Bearer " + localStorage.getItem("teri_token") }
            });
            if (!res.data) {
                this.isLoading = false;
                return;
            }
            if (res.data.code !== 200) {
                this.isLoading = false;
                return;
            }
            ElMessageBox.alert('你需要重新登录', '密码重置成功', {
                confirmButtonText: '确认',
                callback: () => {
                    this.$store.dispatch("logout");
                },
            })
        },

        noPage() {
            ElMessage.warning("该功能暂未开放");
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

.info-wrap {
    padding: 40px 20px 0;
    position: relative;
}

.form-item {
    margin-bottom: 22px;
}

.password-input,
.submit-btn {
    float: left;
    width: 789px;
}

.form-item__label {
    vertical-align: middle;
    font-size: 14px;
    color: #606266;
    box-sizing: border-box;
    width: 260px;
    text-align: right;
    margin-right: 20px;
    float: left;
    line-height: 30px;
    padding: 0;
}

.form-item__content {
    line-height: 30px;
    position: relative;
    font-size: 14px;
}

.el-input {
    position: relative;
    font-size: 14px;
}

.password-input .el-input {
    float: left;
    width: 225px;
    height: 30px;
    margin-right: 40px;
}

.password-input /deep/ .el-input__wrapper {
    padding: 0px 15px;
}

.padding-dom {
    width: 789px;
    height: 30px;
    border-bottom: 1px solid #e5e9ef;
    margin-bottom: 40px;
}

.btn-wrap, .delete-wrap {
    float: left;
    width: 789px;
    height: 36px;
    position: relative;
    margin-bottom: 20px;
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

.delete {
    font-size: 12px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    color: var(--Pi6);
    cursor: pointer;
}

.delete:hover {
    text-decoration: underline;
    color: var(--Pi7);
}
</style>