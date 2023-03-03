import Echo from "laravel-echo"
import Pusher from "pusher-js"

window.Pusher = Pusher

window.Echo = new Echo({
    authEndpoint: import.meta.env.VITE_API_DEFAULT_URL + "broadcasting/auth",
    broadcaster: 'pusher',
    key: 'secret',
    wsHost: '127.0.0.1',
    wsPort: import.meta.env.VITE_SOCKETS_PORT,
    enabledTransports: ['ws'],
    disableStats: true,
    forceTLS: false,
    cluster: 'mt1',
    auth: {
        headers: {
            Authorization: "Bearer " + localStorage.token,
            Accept: "application/json"
        }
    },

})
