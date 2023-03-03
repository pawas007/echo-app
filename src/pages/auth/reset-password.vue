<template>
  <VRow
    no-gutters
    class="auth-wrapper"
  >
    <VCol
      md="8"
      class="d-none d-md-flex"
    >
      <div class="position-relative auth-bg rounded-lg w-100 ma-8 me-0">
        <div class="d-flex align-center justify-center w-100 h-100">
          <VImg
            max-width="400"
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
            Reset Password 🔒
          </h5>
          <p class="mb-0" v-if="form.email">
            for <span class="font-weight-bold">{{ form.email }}</span>
          </p>
        </VCardText>
        <VCardText>
          <VForm @submit.prevent="reset">
            <VRow>
              <!-- password -->
              <VCol cols="12">
                <VTextField
                  v-model="form.password"
                  label="New Password"
                  :type="isPasswordVisible ? 'text' : 'password'"
                  :append-inner-icon="isPasswordVisible ? 'tabler-eye-off' : 'tabler-eye'"
                  @click:append-inner="isPasswordVisible = !isPasswordVisible"
                  :error=!!passwordError
                  :messages=passwordError
                />
              </VCol>
              <!-- Confirm Password -->
              <VCol cols="12">
                <VTextField
                  v-model="form.password_confirmation"
                  label="Confirm Password"
                  :type="isConfirmPasswordVisible ? 'text' : 'password'"
                  :append-inner-icon="isConfirmPasswordVisible ? 'tabler-eye-off' : 'tabler-eye'"
                  @click:append-inner="isConfirmPasswordVisible = !isConfirmPasswordVisible"
                />
              </VCol>
              <p v-if="!!successMessage" class="px-3">
                {{ successMessage }}
              </p>
              <!-- Set password -->
              <VCol cols="12" v-if="!successMessage">
                <VBtn
                  block
                  type="submit"
                >
                  Set New Password
                </VBtn>
              </VCol>

              <!-- back to login -->
              <VCol cols="12">
                <RouterLink
                  class="d-flex align-center justify-center"
                  :to="{ name: 'login' }"
                >
                  <VIcon
                    icon="tabler-chevron-left"
                    class="flip-in-rtl"
                  />
                  <span>Back to login</span>
                </RouterLink>
              </VCol>
            </VRow>
          </VForm>
        </VCardText>
      </VCard>
    </VCol>
  </VRow>
</template>
<script setup>
import {useGenerateImageVariant} from '@core/composable/useGenerateImageVariant'
import authV2ResetPasswordIllustrationDark from '@images/pages/auth-v2-reset-password-illustration-dark.png'
import authV2ResetPasswordIllustrationLight from '@images/pages/auth-v2-reset-password-illustration-light.png'
import authV2MaskDark from '@images/pages/misc-mask-dark.png'
import authV2MaskLight from '@images/pages/misc-mask-light.png'
import axios from "@axios";
import {useRouter} from "vue-router";

const form = ref({
  password: '',
  password_confirmation: '',
  email: '',
  token: ''
})

const passwordError = ref('')
const successMessage = ref('')
const authThemeImg = useGenerateImageVariant(authV2ResetPasswordIllustrationLight, authV2ResetPasswordIllustrationDark)
const authThemeMask = useGenerateImageVariant(authV2MaskLight, authV2MaskDark)
const isPasswordVisible = ref(false)
const isConfirmPasswordVisible = ref(false)

const route = useRouter();
form.value.email = route.currentRoute.value.query.email || null
form.value.token = route.currentRoute.value.query.token || null
const reset = () => {
  axios.post('reset-password', form.value).then(r => {
    passwordError.value = ''
    form.value.password = ''
    form.value.password_confirmation = ''
    successMessage.value = 'Password changed'
  }).catch(e => {
    passwordError.value = e.response.data?.errors?.password[0] || e.response.data.message
  })
}

</script>
<style lang="scss">
@use "@core/scss/template/pages/page-auth.scss";
</style>

<route lang="yaml">
meta:
  layout: blank
  redirectIfLoggedIn: true
</route>
