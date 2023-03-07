import {setupLayouts} from 'virtual:generated-layouts'
import {createRouter, createWebHistory} from 'vue-router'
import routes from '~pages'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL), routes: [...setupLayouts(routes),],
})
router.beforeEach((to, from, next) => {
    const token = localStorage.getItem('token');
    if (to.matched.some(record => record.meta.requiresAuth) && !token)
        return next({name: 'login'})
    if (token && to.meta.redirectIfLoggedIn)
        return next({name: 'index'})
    next()

})

export default router

