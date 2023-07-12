import { createRouter, createWebHistory } from 'vue-router'
const Index = () => import('views/IndexVue.vue')

const routes = [
    {path: '/', redirect: '/index'},
    {
        path: "/index",
        component: Index,
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
  })

export default router