<script setup>
import {useTheme} from 'vuetify'
import {useThemeConfig} from '@core/composable/useThemeConfig'
import {hexToRgb} from '@layouts/utils'
import {useRouter} from 'vue-router';
import {useAuthStore} from "@/stores/auth"
const auth = useAuthStore()
const router = useRouter()

useAuthStore().getAuthUser()

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
