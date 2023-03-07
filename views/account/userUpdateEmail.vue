<template>
  <VCard>
    <VCardItem>
      <VCardTitle>Change Email</VCardTitle>
    </VCardItem>
    <VCol cols="12">
      <VTextField
        v-model="email"
        label="Email"
        type="email"
        :rules="[requiredValidator, emailValidator]"
        :error=!!errorsEmail
        :messages=errorsEmail
      />
      <v-alert
        v-if="showSuccess"
        class="my-2"
        color="success"
        icon="$success"
        title="Email updated"
      ></v-alert>
      <VBtn @click="changeEmail" class="mt-2">Save</VBtn>
    </VCol>
  </VCard>
</template>
<script setup>
import {
  emailValidator,
  requiredValidator,
} from '@validators'
import axios from "@axios";

const props = defineProps({
  userData: {
    type: Object,
    required: true,
  },
})
const errorsEmail = ref('')
const email = ref(props.userData.email)
const showSuccess = ref(false)

const changeEmail = () => {
  axios.put('user/update/email', {email: email.value}).then((r) => {
    email.value = r.data.email
    errorsEmail.value = ''
    showSuccess.value = true
    setTimeout(()=>{
      showSuccess.value = false
    },2000)
  }).catch((errors) => {
    errorsEmail.value = errors.response.data.message
  })
}
</script>
