<template>
    <div class="account-info">
        <div class="header">
            <span class="header-icon"></span>
            <span class="header-text">我的信息</span>
        </div>
        <div class="info-wrap">
            <div class="form-item user-nick-name">
                <label class="form-item__label">昵称:</label>
                <div class="form-item__content">
                    <el-input type="text" placeholder="你的昵称" v-model="nickname" maxlength="24" />
                </div>
            </div>
            <div class="form-item user-uid">
                <label class="form-item__label">UID:</label>
                <div class="form-item__content">
                    <span class="user-uid-text">{{ this.$store.state.user.uid }}</span>
                </div>
            </div>
            <div class="form-item user-my-sign">
                <label class="form-item__label">我的签名:</label>
                <div class="form-item__content">
                    <el-input type="textarea" placeholder="设置您的签名- ( ゜- ゜)つロ" v-model="description" maxlength="100" resize="none" rows="2" />
                </div>
            </div>
            <div class="form-item user-my-sex">
                <label class="form-item__label">性别:</label>
                <div class="form-item__content">
                    <div class="radio-group">
                        <span class="radio-item" :class="{'check': gender === 1}" @click="gender = 1">男</span>
                        <span class="radio-item" :class="{'check': gender === 0}" @click="gender = 0">女</span>
                        <span class="radio-item" :class="{'check': gender === 2}" @click="gender = 2">保密</span>
                    </div>
                </div>
            </div>
            <div class="form-item submit-btn">
                <div class="form-item__content">
                    <div class="padding-dom"></div>
                    <div class="btn-wrap">
                        <div class="btn" :class="{'enable': hadChanged}" @click="submit">保存</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ElMessage } from 'element-plus';
import { getNicknameLength } from '@/utils/utils';

export default {
    name: "AccountInfo",
    data() {
        return {
            nickname: "",
            description: "",
            gender: 2,
            isLoading: false,
        }
    },
    computed: {
        hadChanged() {
            return this.nickname !== this.$store.state.user.nickname ||
                    this.description !== this.$store.state.user.description ||
                    this.gender !== this.$store.state.user.gender;
        }
    },
    methods: {
        async submit() {
            if (!this.hadChanged || this.isLoading) return;
            this.nickname = this.nickname.trim();
            if (this.nickname.length === 0) {
                ElMessage.warning("昵称不能为空白");
                return;
            }
            if (this.getNicknameLength(this.nickname) > 32) {
                ElMessage.warning("昵称过长");
                return;
            }
            this.isLoading = true;
            const formData = new FormData();
            formData.append("nickname", this.nickname);
            formData.append("description", this.description);
            formData.append("gender", this.gender);
            const res = await this.$post("/user/info/update", formData, {
                headers: { Authorization: "Bearer " + localStorage.getItem("teri_token") }
            });
            if (!res.data || res.data.code !== 200) {
                this.isLoading = false;
                return;
            }
            this.$store.state.user.nickname = this.nickname;
            this.$store.state.user.description = this.description;
            this.$store.state.user.gender = this.gender;
            this.isLoading = false;
            ElMessage.success("信息更新成功")
        },

        getNicknameLength(name) {
            return getNicknameLength(name);
        }
    },
    mounted() {
        if (this.$store.state.user.nickname) {
            this.nickname = this.$store.state.user.nickname;
            this.description = this.$store.state.user.description;
            this.gender = this.$store.state.user.gender;
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

.user-my-sex,
.user-my-sign,
.user-nick-name,
.user-uid,
.submit-btn {
    float: left;
    width: 789px;
}

.form-item__label {
    vertical-align: middle;
    font-size: 14px;
    color: #606266;
    box-sizing: border-box;
    width: 95px;
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

.user-nick-name .el-input {
    float: left;
    width: 225px;
    height: 30px;
    margin-right: 40px;
}

.user-nick-name /deep/ .el-input__wrapper {
    padding: 0px 15px;
}

.user-uid-text {
    color: var(--text3);
}

.user-my-sign .el-textarea {
    float: left;
    width: 618px;
    height: 88px;
    resize: none;
}

.user-my-sign /deep/ .el-textarea__inner {
    height: 88px;
    padding: 5px 15px;
}

.el-textarea /deep/ .el-textarea__inner::-webkit-scrollbar {
    width: 8px;
    height: 8px;
}

.el-textarea /deep/ .el-textarea__inner::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: #ccc;
}

.radio-item {
    margin-right: 20px;
    padding: 5px 8px;
    border: 1px solid #bfcbd9;
    border-radius: 5px;
    background: #f4f4f4;
    color: #717171;
    cursor: pointer;
    transition: all .3s cubic-bezier(.645,.045,.355,1);
    text-align: center;
}

.radio-item.check {
    background-color: #FF7DA1;
    border-color: #FF7DA1;
    color: #fff;
}

.padding-dom {
    width: 789px;
    height: 39px;
    border-bottom: 1px solid #e5e9ef;
    margin-bottom: 40px;
}

.btn-wrap {
    float: left;
    width: 789px;
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