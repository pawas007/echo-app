<template>
  <VCard title="Account">
    <VRow v-if="authUser">
      <VCol
        cols="12"
        md="5"
        lg="4">
        <user-bio-panel v-if="authUser" :userData="authUser"/>
      </VCol>
      <VCol
        cols="12"
        md="7"
        lg="8">
        <VTabs
          v-model="userTab"
          class="v-tabs-pill">
          <VTab
            v-for="tab in tabs"
            :key="tab.icon">
            <VIcon
              :size="18"
              :icon="tab.icon"
              class="me-1"
            />
            <span>{{ tab.title }}</span>
          </VTab>
        </VTabs>
        <VWindow
          v-model="userTab"
          class="mt-6 disable-tab-transition"
          :touch="false">
          <VWindowItem>
            <user-tab-notifications/>
          </VWindowItem>
          <VWindowItem>
            <user-update-email :userData="authUser"/>
            <user-update-password :userData="authUser"/>
          </VWindowItem>
          <VWindowItem>
           <user-email-verification/>
          </VWindowItem>
        </VWindow>
      </VCol>
    </VRow>
  </VCard>
</template>

<script setup>
import UserBioPanel from "../../../views/account/userBioPanel.vue";
import {useAuthStore} from "@/stores/auth";
import UserTabNotifications from "../../../views/account/userTabNotifications.vue";
import UserUpdatePassword from "../../../views/account/userUpdatePassword.vue";
import UserUpdateEmail from "../../../views/account/userUpdateEmail.vue";
import UserEmailVerification from "../../../views/account/userEmailVerification.vue";

const auth = useAuthStore()
const authUser = computed(() => auth.authUser)
const userTab = ref(null)
const tabs = [
  {
    icon: 'tabler-bell',
    title: 'Notifications',
  },
  {
    icon: 'tabler-lock',
    title: 'Change password & email',
  },
  {
    icon: 'tabler-checks',
    title: 'Verification',
  },
]

</script>

