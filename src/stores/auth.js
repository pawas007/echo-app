// stores/counter.js
import {defineStore} from 'pinia'
import axios from "@axios"


export const useAuthStore = defineStore('auth', () => {
    const user = ref(null)
    const isAuth = ref(false)
    const authUser = computed(() => user.value)

    function login(data) {
        return axios.post('/login', data).then((response) => {
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + response.data.token
            localStorage.setItem('token', response.data.token)
            isAuth.value = true
        })
    }

    function logout() {
        return axios.post('/logout').then(() => {
            isAuth.value = false
            user.value = {}
            localStorage.removeItem('token')
            axios.defaults.headers.common['Authorization'] = ''
            window.location.href = 'login'

        })
    }

    function getAuthUser() {
        return axios.get('/user/auth').then(response => user.value = response.data).catch(() => {
            localStorage.removeItem('token')
            isAuth.value = false
        })
    }

    return {user, authUser, login, logout, getAuthUser, isAuth}
})
