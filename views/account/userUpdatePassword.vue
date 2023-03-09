<template>
  <VCard class="mt-2">
    <VCardItem>
      <VCardTitle>Change Password</VCardTitle>
    </VCardItem>
    <VCol cols="12">
      <VForm
        ref="refVFormPasswordReset"
        @submit.prevent="onSubmit"
      >
        <VTextField
          class="my-2"
          v-model="passwords.current_password"
          :rules="[requiredValidator,lengthMoreValidator(passwords.password,8)]"
          label="Current password"
          :type="isCurrentPasswordVisible ? 'text' : 'password'"
          :append-inner-icon="isCurrentPasswordVisible  ? 'tabler-eye-off' : 'tabler-eye'"
          @click:append-inner="isCurrentPasswordVisible = !isCurrentPasswordVisible"
          :error=!!errorsPassword.current_password
          :messages=errorsPassword.current_password
        />
        <VTextField
          class="my-2"
          v-model="passwords.new_password"
          :rules="[requiredValidator,lengthMoreValidator(passwords.new_password,8)]"
          label="New password"
          :type="isPasswordVisible ? 'text' : 'password'"
          :append-inner-icon="isPasswordVisible ? 'tabler-eye-off' : 'tabler-eye'"
          @click:append-inner="isPasswordVisible = !isPasswordVisible"
          :error=!!errorsPassword.new_password
          :messages=errorsPassword.new_password
        />
        <VTextField
          v-model="passwords.new_confirm_password"
          :rules="[confirmedValidator(passwords.new_password,passwords.new_confirm_password)]"
          label="Password confirmation"
          :type="isPasswordVisibleConf ? 'text' : 'password'"
          :append-inner-icon="isPasswordVisibleConf ? 'tabler-eye-off' : 'tabler-eye'"
          @click:append-inner="isPasswordVisibleConf = !isPasswordVisibleConf"
          :error=!!errorsPassword.new_confirm_password
          :messages=errorsPassword.new_confirm_password
        />
        <v-alert
          v-if="showSuccess"
          class="my-2"
          color="success"
          icon="$success"
          title="Password updated"
        ></v-alert>
        <VBtn type="submit" class="mt-2">Save</VBtn>
      </VForm>
    </VCol>
  </VCard>
</template>
<script setup>
import {
  confirmedValidator,
  lengthMoreValidator,
  requiredValidator,
} from '@validators'
import axios from "@axios";

const props = defineProps({
  userData: {
    type: Object,
    required: true,
  },
})
const isPasswordVisible = ref(false)
const isPasswordVisibleConf = ref(false)
const isCurrentPasswordVisible = ref(false)

const refVFormPasswordReset = ref()
const errorsPassword = ref({
  current_password: '',
  new_password: '',
  new_confirm_password: '',
})
const passwords = reactive({
  current_password: '',
  new_password: '',
  new_confirm_password: '',
})
const showSuccess = ref(false)

const onSubmit = () => {
  refVFormPasswordReset.value?.validate().then(({valid: isValid}) => {
    if (isValid) {
      axios.put('user/update/password', passwords).then(() => {
        showSuccess.value = true
        passwords.password = ''
        passwords.new_password = ''
        passwords.new_confirm_password = ''
        showSuccess.value = true
        refVFormPasswordReset.value.reset()
        setTimeout(() => {
          showSuccess.value = false
        }, 2000)
      }).catch((errors) => {
        errorsPassword.value = errors.response.data.errors
      })
    }
  })
}
</script>
