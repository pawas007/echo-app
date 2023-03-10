<template>
  <VCard class="user-tab-notification">
    <VCardItem>
      <VCardTitle>Notifications</VCardTitle>
      <p class="text-sm mt-2 mb-0">
        You will receive notification for the below selected items.
      </p>
    </VCardItem>
    <VCardText>

      <VSwitch
        v-model="settings.notifications.email"
        label="Email"
      />

      <VSwitch
        v-model="settings.notifications.sound"
        label="Sound"
      />

      <VSwitch
        v-model="settings.notifications.push"
        label="Push"
      />

    </VCardText>

    <VCardText class="d-flex flex-wrap gap-4">
      <v-alert
        v-if="showSuccess"
        color="success"
        icon="$success"
        title="Updated"
      ></v-alert>

    </VCardText>
    <VCardText class="d-flex flex-wrap gap-4">
    <VBtn @click="update">Save</VBtn>
    </VCardText>
  </VCard>
</template>
<script setup>
import axios from "@axios";
import {useAuthStore} from "@/stores/auth";

const auth = useAuthStore()
const authUser = computed(() => auth.authUser)
const settings = ref({})
const showSuccess = ref();
const initSettings = () => {
  if (authUser.value.settings) {
    settings.value = authUser.value.settings
  }
}
initSettings()


const update = () =>
  axios.post('user/settings', {settings: settings.value}).then(r => {
    showSuccess.value = true
    setTimeout(() => showSuccess.value = false, 2000)
    settings.value = r.data
  })
</script>
