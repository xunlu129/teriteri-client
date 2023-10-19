import { createRouter, createWebHistory } from 'vue-router'
const Index = () => import('views/IndexVue.vue')
const NotFound = () => import('@/views/NotFound.vue')
const Platform = () => import('@/views/platform/PlatformView.vue')
const PlatformHome = () => import('@/views/platform/children/PlatformHome.vue')
const PlatformUpload = () => import('@/views/platform/children/PlatformUpload.vue')
const PlatformManuscript = () => import('@/views/platform/children/PlatformManuscript.vue')
const PlatformAppeal = () => import('@/views/platform/children/PlatformAppeal.vue')
const PlatformData = () => import('@/views/platform/children/PlatformData.vue')
const PlatformComment = () => import('@/views/platform/children/PlatformComment.vue')
const PlatformDanmu = () => import('@/views/platform/children/PlatformDanmu.vue')
const VideoUpload = () => import('@/views/platform/children/uploadChildren/VideoUpload.vue')
const TextUpload = () => import('@/views/platform/children/uploadChildren/TextUpload.vue')



const routes = [
    { path: '/', redirect: '' },
    { path: '', name: "index", component: Index, meta: { requestAuth: false } },
    {
        path: '/platform',
        redirect: '/platform/home',
        component: Platform,
        children: [
            { path: '/platform/home', component: PlatformHome, meta: { requestAuth: true } },
            {
                path: '/platform/upload',
                component: PlatformUpload,
                redirect: '/platform/upload/video',
                children: [
                    { path: '/platform/upload/video', component: VideoUpload, meta: { requestAuth: true } },
                    { path: '/platform/upload/text', component: TextUpload, meta: { requestAuth: true } },
                ]
            },
            { path: '/platform/upload-manager', redirect: '/platform/upload-manager/manuscript' },
            { path: '/platform/upload-manager/manuscript', component: PlatformManuscript, meta: { requestAuth: true } },
            { path: '/platform/upload-manager/appeal', component: PlatformAppeal, meta: { requestAuth: true } },
            { path: '/platform/data-up', component: PlatformData, meta: { requestAuth: true } },
            { path: '/platform/comment', component: PlatformComment, meta: { requestAuth: true } },
            { path: '/platform/danmu', component: PlatformDanmu, meta: { requestAuth: true } },
        ]
    },
    { path: '/:catchAll(.*)', component: NotFound, meta: { requestAuth: false } },
]

const router = createRouter({
    history: createWebHistory(),
    routes
});

// 本地没有token就跳到登录界面
router.beforeEach((to, from, next) => {
    if (to.meta.requestAuth && !localStorage.getItem("teri_token")) {
        next({ name: "index" });
    } else {
        next();
    }
});

export default router