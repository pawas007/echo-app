<script setup>
import {useTheme} from 'vuetify'
import {useThemeConfig} from '@core/composable/useThemeConfig'
import {hexToRgb} from '@layouts/utils'
import {useRouter} from 'vue-router';

const router = useRouter()
import {useAuthStore} from "@/stores/auth"

const auth = useAuthStore()
auth.getAuthUser()


const {
  syncInitialLoaderTheme,
  syncVuetifyThemeWithTheme: syncConfigThemeWithVuetifyTheme,
  isAppRtl,
} = useThemeConfig()

const {global} = useTheme()

// ℹ️ Sync current theme with initial loader theme
syncInitialLoaderTheme()
syncConfigThemeWithVuetifyTheme()
</script>

<template>
  <VLocaleProvider :rtl="isAppRtl">
    <!-- ℹ️ This is required to set the background color of active nav link based on currently active global theme's primary -->
    <VApp :style="`--v-global-theme-primary: ${hexToRgb(global.current.value.colors.primary)}`">
      <RouterView/>
    </VApp>
  </VLocaleProvider>
</template>


<!--TODO CHANGE AVATAR-->
<!--TODO USER NOTIFICATION SETTINGS-->
<!--TODO CHANGE ROUTE METHODS-->
<!--TODO USER ONLINE-->
<!--TODO ADD MAIL NOTIFICATIONS-->
<!--TODO Router before each-->
<!--TODO sms verify-->
<!--TODO email verify-->
