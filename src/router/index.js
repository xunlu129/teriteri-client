import { createRouter, createWebHistory } from 'vue-router'
const Index = () => import('views/IndexVue.vue')
const NotFound = () => import('@/views/NotFound.vue')

const routes = [
    {path: '/', redirect: ''},
    {
        path: "",
        component: Index,
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