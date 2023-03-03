<template>
  <VRow v-if="authUser">
    <VCol
      cols="12"
      md="5"
      lg="4"
    >
      <user-bio-panel :userData="authUser"/>
    </VCol>

    <VCol
      cols="12"
      md="7"
      lg="8"
    >
      <VTabs
        v-model="userTab"
        class="v-tabs-pill"
      >
        <VTab
          v-for="tab in tabs"
          :key="tab.icon"
        >
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
        :touch="false"
      >
        <VWindowItem>
          <user-tab-notifications :userData="authUser"/>
        </VWindowItem>
        <VWindowItem>
          <user-chage-password :userData="authUser"/>
        </VWindowItem>
        <VWindowItem>
          <user-chage-email :userData="authUser"/>
        </VWindowItem>
      </VWindow>
    </VCol>
  </VRow>
</template>

<script setup>
import UserBioPanel from "../../../views/account/userBioPanel.vue";
import {useAuthStore} from "@/stores/auth";
import UserTabNotifications from "../../../views/account/userTabNotifications.vue";
import UserChagePassword from "../../../views/account/userChagePassword.vue";
import UserChageEmail from "../../../views/account/userChageEmail.vue";

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
    title: 'Change password',
  },
  {
    icon: 'tabler-at',
    title: 'Change Email',
  },

]


</script>

