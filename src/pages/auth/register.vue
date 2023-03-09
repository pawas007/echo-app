<template>
  <VRow
    no-gutters
    class="auth-wrapper"
  >
    <VCol
      lg="8"
      class="d-none d-lg-flex"
    >
      <div class="position-relative auth-bg rounded-lg w-100 ma-8 me-0">
        <div class="d-flex align-center justify-center w-100 h-100">
          <VImg
            max-width="341"
            :src="imageVariant"
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
      lg="4"
      class="d-flex align-center justify-center"
    >
      <VCard
        flat
        :max-width="500"
        class="mt-12 mt-sm-0 pa-4"
      >
        <VCardText>
          <h5 class="text-h5 font-weight-semibold mb-1">
            Adventure starts here 🚀
          </h5>

        </VCardText>

        <VCardText>
          <VForm
            ref="refVForm"
            @submit.prevent="onSubmit"
          >
            <VRow>
              <!-- Username -->
              <VCol cols="12">
                <VTextField
                  v-model="name"
                  :rules="[requiredValidator, alphaDashValidator]"
                  label="name"
                  :error=!!errors.name
                  :messages=errors.name
                />
              </VCol>

              <!-- email -->
              <VCol cols="12">
                <VTextField
                  v-model="email"
                  :rules="[requiredValidator, emailValidator]"
                  label="Email"
                  type="email"
                  :error=!!errors.email
                  :messages=errors.email
                />
              </VCol>

              <!-- password -->
              <VCol cols="12">
                <VTextField
                  v-model="password"
                  :rules="[requiredValidator,lengthMoreValidator(password,8)]"
                  label="Password"
                  :type="isPasswordVisible ? 'text' : 'password'"
                  :append-inner-icon="isPasswordVisible ? 'tabler-eye-off' : 'tabler-eye'"
                  @click:append-inner="isPasswordVisible = !isPasswordVisible"
                  :error=!!errors.password
                  :messages=errors.password
                />


              </VCol>

              <VCol cols="12">
                <VTextField
                  v-model="password_confirmation"
                  :rules="[confirmedValidator(password,password_confirmation)]"
                  label="Password confirmation"
                  :type="isPasswordVisibleConf ? 'text' : 'password'"
                  :append-inner-icon="isPasswordVisibleConf ? 'tabler-eye-off' : 'tabler-eye'"
                  @click:append-inner="isPasswordVisibleConf = !isPasswordVisibleConf"
                  :error=!!errors.password_confirmation
                  :messages=errors.password_confirmation
                />
              </VCol>
              <!-- create account -->
              <VCol cols="12">
                <VBtn
                  block
                  type="submit"
                  class="mt-2"
                >
                  Sign up
                </VBtn>
              </VCol>
              <VCol
                cols="12"
                class="text-center text-base"
              >
                <span>Already have an account?</span>
                <RouterLink
                  class="text-primary ms-2"
                  :to="{ name: 'login' }"
                >
                  Sign in instead
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
import {VForm} from 'vuetify/components'
import authV2RegisterIllustrationBorderedDark from '@images/pages/auth-v2-forgot-password-illustration-light.png'
import authV2RegisterIllustrationBorderedLight from '@images/pages/auth-v2-forgot-password-illustration-light.png'
import authV2RegisterIllustrationDark from '@images/pages/auth-v2-forgot-password-illustration-light.png'
import authV2RegisterIllustrationLight from '@images/pages/auth-v2-forgot-password-illustration-light.png'
import authV2MaskDark from '@images/pages/misc-mask-dark.png'
import authV2MaskLight from '@images/pages/misc-mask-light.png'

import axios from '@axios'
import {useGenerateImageVariant} from '@core/composable/useGenerateImageVariant'

import {
  alphaDashValidator, confirmedValidator,
  emailValidator, lengthMoreValidator,
  requiredValidator,
} from '@validators'

const refVForm = ref()
const name = ref('AsdaA')
const email = ref('asdasdaw@gmail.com')
const password = ref('asdasdasdasd')
const password_confirmation = ref('asdasdasdasd')


const privacyPolicies = ref(true)

// Router
const route = useRoute()
const router = useRouter()


// Form Errors
const errors = ref({
  name: '',
  email: '',
  password: '',
  password_confirmation:''
})

const register = () => {
  axios.post('/register', {
    name: name.value,
    email: email.value,
    password: password.value,
    password_confirmation: password_confirmation.value
  }).then(r => {
    router.push({name: 'login'})
  }).catch(e => {
    errors.value = e.response.data.errors
  })
}

const imageVariant = useGenerateImageVariant(authV2RegisterIllustrationLight, authV2RegisterIllustrationDark, authV2RegisterIllustrationBorderedLight, authV2RegisterIllustrationBorderedDark, true)
const authThemeMask = useGenerateImageVariant(authV2MaskLight, authV2MaskDark)
const isPasswordVisible = ref(false)
const isPasswordVisibleConf = ref(false)
const onSubmit = () => {
  refVForm.value?.validate().then(({valid: isValid}) => {
    if (isValid)
      register()
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
