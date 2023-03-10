<template>
  <VCard v-if="authUser">
    <VCardItem>
      <VCardTitle>Email verification</VCardTitle>
    </VCardItem>
      <VCol cols="12">
        <VTextField
          v-model="authUser.email"
          label="Email"
          type="email"
          disabled
        />
        <div class="mt-4">
          <span class="text-success" v-if="sendMessage">{{sendMessage}}</span>
          <span class="text-success" v-if="authUser.email_verified_at">Verified</span>
          <VBtn v-if="!sendMessage && !authUser.email_verified_at" @click="sendVerifyEmail" class="mt-2">Verify</VBtn>
        </div>
      </VCol>
  </VCard>
</template>
<script setup>
import {useAuthStore} from "@/stores/auth";

const auth = useAuthStore()
const authUser = computed(() => auth.authUser)
import axios from "@axios";

const sendMessage= ref('');

const sendVerifyEmail = () => {
  axios.post('user/send-verify/email',{email:authUser.value.email}).then((r) => {
    sendMessage.value = r.data.message
  })
}
</script>
