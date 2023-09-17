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



const routes = [
    {path: '/', redirect: ''},
    {
        path: '',
        component: Index,
    },
    {
        path: '/platform',
        redirect: '/platform/home',
        component: Platform,
        children: [
            { path: '/platform/home', component: PlatformHome },
            { path: '/platform/upload', component: PlatformUpload },
            { path: '/platform/upload-manager', redirect: '/platform/upload-manager/manuscript' },
            { path: '/platform/upload-manager/manuscript', component: PlatformManuscript },
            { path: '/platform/upload-manager/appeal', component: PlatformAppeal },
            { path: '/platform/data-up', component: PlatformData },
            { path: '/platform/comment', component: PlatformComment },
            { path: '/platform/danmu', component: PlatformDanmu },
        ]
    },
    {
        path: '/:catchAll(.*)', // 在Vue Router 4中，需要使用自定义正则表达式来定义通配符路由
        component: NotFound
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes
  })

export default router