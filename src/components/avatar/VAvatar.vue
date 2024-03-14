<template>
    <div class="v-avatar" :style="`width: ${size}px; height: ${size}px;`">
        <img :src="img" alt="" class="avatar-img">
        <span class="avatar-icon" :class="`avatar-size-${size}`">
            <svg v-if="auth === 1" t="1700121982187" class="icon" viewBox="0 0 1024 1024" version="1.1"
                xmlns="http://www.w3.org/2000/svg" p-id="3631">
                <path d="M0 512a512 512 0 1 0 1024 0A512 512 0 1 0 0 512z" fill="#FFFFFF" p-id="3632"></path>
                <path d="M93.09 512a418.91 418.91 0 1 0 837.82 0 418.91 418.91 0 1 0-837.82 0z" fill="#FFC62E" p-id="3633">
                </path>
                <path
                    d="M474.112 763.95a33.28 33.28 0 0 1-14.057 4.05 21.039 21.039 0 0 1-21.318-20.806 19.55 19.55 0 0 1 1.21-5.865l40.495-187.438-167.657 0.326a21.225 21.225 0 0 1-21.876-20.806 20.433 20.433 0 0 1 9.495-16.85l250.182-255.767c4.608-2.793 9.542-4.747 14.662-4.794a21.132 21.132 0 0 1 21.364 20.852 19.968 19.968 0 0 1-2.792 9.775l-40.216 184.32h167.843a21.178 21.178 0 0 1 21.644 20.852 20.294 20.294 0 0 1-9.495 16.943L474.112 763.95z"
                    fill="#FFFFFF" p-id="3634"></path>
            </svg>
            <svg v-if="auth === 2" t="1700122376038" class="icon" viewBox="0 0 1024 1024" version="1.1"
                xmlns="http://www.w3.org/2000/svg" p-id="3782">
                <path d="M0 512a512 512 0 1 0 1024 0A512 512 0 1 0 0 512z" fill="#FFFFFF" p-id="3783"></path>
                <path d="M93.09 512a418.91 418.91 0 1 0 837.82 0 418.91 418.91 0 1 0-837.82 0z" fill="#4AC7FF" p-id="3784">
                </path>
                <path
                    d="M474.112 763.95a33.28 33.28 0 0 1-14.057 4.05 21.039 21.039 0 0 1-21.318-20.806 19.55 19.55 0 0 1 1.21-5.865l40.495-187.438-167.657 0.326a21.225 21.225 0 0 1-21.876-20.806 20.433 20.433 0 0 1 9.495-16.85l250.182-255.767c4.608-2.793 9.542-4.747 14.662-4.794a21.132 21.132 0 0 1 21.364 20.852 19.968 19.968 0 0 1-2.792 9.775l-40.216 184.32h167.843a21.178 21.178 0 0 1 21.644 20.852 20.294 20.294 0 0 1-9.495 16.943L474.112 763.95z"
                    fill="#FFFFFF" p-id="3785"></path>
            </svg>
        </span>
    </div>
</template>

<script>
export default {
    name: "VAvatar",
    props: {
        // 头像的大小 有效值 24 30 34 36 40 48 50 60 86
        size: {
            type: Number,
            default() {
                return 40;
            }
        },
        // 头像的url地址
        img: {
            type: String,
            default() {
                return 'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png';
            }
        },
        // 官方认证，0 无认证 1 个人认证 2 机构认证
        auth: {
            type: Number,
            default() {
                return 0;
            }
        }
    }
}
</script>

<style scoped>
.v-avatar {
    display: block;
    position: relative;
    background-image: url('https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png');
    -webkit-background-size: cover;
    background-size: cover;
    border-radius: 50%;
    margin: 0;
    padding: 0;
    user-select: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
}

.avatar-img {
    border: none;
    display: block;
    -o-object-fit: cover;
    object-fit: cover;
    image-rendering: -webkit-optimize-contrast;
    position: absolute;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
    -moz-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    -o-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    width: 100%;
    height: 100%;
    border-radius: 50%;
}

.avatar-icon {
    width: 27.5%;
    height: 27.5%;
    position: absolute;
    right: 0;
    bottom: -1px;
    -webkit-background-size: cover;
    background-size: cover;
    image-rendering: -webkit-optimize-contrast;
    display: flex;
}

.avatar-size-24,
.avatar-size-30 {
    width: 12px;
    height: 12px;
}

.avatar-size-34,
.avatar-size-36,
.avatar-size-40 {
    width: 14px;
    height: 14px;
}

.avatar-size-48,
.avatar-size-50,
.avatar-size-60 {
    width: 18px;
    height: 18px;
}

.avatar-size-86 {
    width: 30px;
    height: 30px;
}
</style>
