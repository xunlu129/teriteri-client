<template>
    <div class="account-avatar">
        <div class="header">
            <span class="header-icon"></span>
            <span class="header-text">我的头像</span>
        </div>
    </div>
</template>

<script>
export default {
    name: "AccountAvatar",
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
</style>