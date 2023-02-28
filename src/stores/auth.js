// stores/counter.js
import {defineStore} from 'pinia'
import axios from "@axios"


export const useAuthStore = defineStore('auth', () => {
    const user = ref({})
    const isAuth = ref(false)
    const authUser = computed(() => user.value)

    function login(data) {
        return axios.post('/login', data).then((response) => {
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + response.data.token
            localStorage.setItem('token', response.data.token)
            isAuth.value = true
            getAuthUser()
        })
    }

    function logout() {
        return axios.post('/logout').then(() => {
            isAuth.value = false
            user.value = {}
            localStorage.removeItem('token')
            axios.defaults.headers.common['Authorization'] = ''
        })
    }

    function getAuthUser() {
        return  axios.get('/user').then(response => user.value = response.data)
    }

    return {user, authUser, login, logout, getAuthUser, isAuth}
})
