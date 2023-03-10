<template>
  <VRow
    class="auth-wrapper"
    no-gutters
  >
    <VCol
      md="8"
      class="d-none d-md-flex"
    >
      <div class="position-relative auth-bg rounded-lg w-100 ma-8 me-0">
        <div class="d-flex align-center justify-center w-100 h-100">
          <VImg
            max-width="418"
            :src="authThemeImg"
            class="auth-illustration mt-16 mb-2"
          />
        </div>

        <VImg
          class="auth-footer-mask"
          :src="authThemeMask"
        />
      </div>
    </VCol>

    <VCol
      cols="12"
      md="4"
      class="auth-card-v2 d-flex align-center justify-center"
    >
      <VCard
        flat
        :max-width="500"
        class="mt-12 mt-sm-0 pa-4"
      >
        <VCardText>
          <h5 class="text-h5 font-weight-semibold mb-1">
            Verify your email ✉️
          </h5>
          <div v-if="message" class="d-flex align-center justify-center flex-column">
            <div><span class="me-1">{{ message }}</span></div>
            <a
              class="v-btn v-btn--block v-btn--elevated v-theme--dark bg-primary v-btn--density-default v-btn--size-default v-btn--variant-elevated mb-6 mt-2"
              href="/">Go home</a>
          </div>
          <a
            v-if="!form.token && !form.email"
            class="v-btn v-btn--block v-btn--elevated v-theme--dark bg-primary v-btn--density-default v-btn--size-default v-btn--variant-elevated mb-6 mt-2"
            href="/">Skip for now</a>
        </VCardText>
      </VCard>
    </VCol>
  </VRow>
</template>

<style lang="scss">
@use "@core/scss/template/pages/page-auth.scss";
</style>

<script setup>
import authV2ForgotPasswordIllustrationDark from '@images/pages/auth-v2-verify-email-illustration-dark.png'
import authV2ForgotPasswordIllustrationLight from '@images/pages/auth-v2-verify-email-illustration-light.png'
import authV2MaskDark from '@images/pages/misc-mask-dark.png'
import authV2MaskLight from '@images/pages/misc-mask-light.png'
import {useGenerateImageVariant} from '@core/composable/useGenerateImageVariant'
import {useRouter} from "vue-router";
import axios from "@axios";
import {useAuthStore} from "@/stores/auth";

const authThemeImg = useGenerateImageVariant(authV2ForgotPasswordIllustrationLight, authV2ForgotPasswordIllustrationDark)
const authThemeMask = useGenerateImageVariant(authV2MaskLight, authV2MaskDark)
const route = useRouter();

const form = ref({
  email: null,
  token: null
})
const message = ref('');

form.value.email = route.currentRoute?.value?.query?.email || null
form.value.token = route.currentRoute?.value?.query?.token || null


const verify = () =>
  axios.post('verify/email', form.value).then(r => {
    message.value = r.data.message
  }).catch(e => {
    message.value = e.response.data.message
  })

verify()
</script>

<route lang="yaml">
meta:
  layout: blank
</route>
