import { createWebHistory, createRouter } from 'vue-router'

import Register from '@/pages/register/Index.vue'
import Actions from '@/pages/actions/Index.vue'
import ErrorNotFound from '@/pages/ErrorNotFound.vue'

const routes = [
    {
        path: '/',
        name: 'Register',
        component: Register
    },
    {
        path: '/actions',
        name: 'Actions',
        component: Actions
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: ErrorNotFound
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
    strict: true,
})

export default router
