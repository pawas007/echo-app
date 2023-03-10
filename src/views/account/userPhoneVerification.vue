<template>
  <VCard v-if="authUser" class="mt-2">
    <VCardItem>
      <VCardTitle>Phone verification</VCardTitle>
    </VCardItem>
    <VCol cols="12">
      <VTextField
        v-model="authUser.phone"
        label="Phone +"
        disabled
      />
      <div class="mt-4">
        <span class="text-error" v-if="error && !sendMessage">{{ error }}</span>
        <span class="text-success" v-if="sendMessage">{{ sendMessage }}</span>
        <span class="text-success" v-if="authUser.phone_verified_at">Verified</span>
      </div>
      <VBtn v-if="!sendMessage && !authUser.phone_verified_at" @click="sendVerifyPhone" class="mt-2">Verify</VBtn>
      <div class="mt-4" v-if="showCodeField">
        <VTextField
          v-model="code"
          label="Verify code"
        />
        <div><span class="text-error" v-if="errorVerifyCode">{{ errorVerifyCode }}</span></div>
        <VBtn @click="verifyPhone" class="mt-2">Send</VBtn>
      </div>
    </VCol>
  </VCard>
</template>
<script setup>
import axios from "@axios";
import {useAuthStore} from "@/stores/auth";

const auth = useAuthStore()
const authUser = computed(() => auth.authUser)
const sendMessage = ref('');
const error = ref('')
const errorVerifyCode = ref('')
const code = ref('')
const showCodeField = ref(false)
const sendVerifyPhone = () => {
  axios.post('user/send-verify/phone', {email: authUser.value.phone}).then((r) => {
    sendMessage.value = r.data.message
    error.value = ''
    showCodeField.value = true
  }).catch(e => {
    error.value = e.response.data.message;
  })
}

const verifyPhone = () => {
  axios.post('user/verify/phone', {code: code.value}).then((r) => {
    sendMessage.value = r.data.message
    showCodeField.value = false
  }).catch(e => {
    errorVerifyCode.value = e.response.data.message;
  })
}

</script>
