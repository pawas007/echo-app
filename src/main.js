/* eslint-disable import/order */
import '@/@iconify/icons-bundle'
import App from '@/App.vue'
import layoutsPlugin from '@/plugins/layouts'
import vuetify from '@/plugins/vuetify'
import { loadFonts } from '@/plugins/webfontloader'
import router from '@/router'
import '@core/scss/template/index.scss'
import '@styles/styles.scss'
import { createPinia } from 'pinia'
import { createApp } from 'vue'
import i18n from "@/plugins/i18n"
import '@/plugins/echo.js'

loadFonts()



const app = createApp(App)
// Use plugins
app.use(i18n)
app.use(vuetify)
app.use(createPinia())
app.use(router)
app.use(layoutsPlugin)
// Mount vue app
app.mount('#app')
