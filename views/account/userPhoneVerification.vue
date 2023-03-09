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
const sendVerifyPhone = () => {
  axios.post('user/send-verify/phone', {email: authUser.value.phone}).then((r) => {
    sendMessage.value = r.data.message
    error.value = ''
  }).catch(e => {
    error.value = e.response.data.message;
  })
}
</script>
