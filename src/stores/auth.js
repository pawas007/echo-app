// stores/counter.js
import {defineStore} from 'pinia'
import axios from "@axios"


export const useAuthStore = defineStore('auth', () => {
    const user = ref({})

    const authUser = computed(() => user.value)
    function login(data) {
        return axios.post('/login', data).then((response) => {
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + response.data.token
            localStorage.setItem('token',response.data.token)
            getAuthUser()
        })
    }
    function logout() {
        return axios.post('/logout').then(() => {
            user.value = {}
            localStorage.removeItem('token')
            axios.defaults.headers.common['Authorization'] = ''
        })
    }
    function getAuthUser() {
        return axios.get('/user').then(response => user.value = response.data)
    }
    return {user, authUser, login,logout, getAuthUser}
})
