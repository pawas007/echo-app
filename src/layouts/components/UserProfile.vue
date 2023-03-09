<template>

  <VBadge
    dot
    location="bottom right"
    offset-x="3"
    offset-y="3"
    bordered
    color="success"
    v-if="authUser"
  >
    <VAvatar
      class="cursor-pointer"
      color="primary"
      variant="tonal"
    >
      <VImg v-if="authUser.profile.avatar" :src="authUser.profile.avatar"/>
      <span
        v-else
        class="text-1xl font-weight-semibold">
              {{ avatarText(authUser.name) }}
            </span>
      <VMenu
        activator="parent"
        width="230"
        location="bottom end"
        offset="14px"
      >
        <VList>
          <!-- 👉 User Avatar & Name -->
          <VListItem>
            <template #prepend>
              <VListItemAction start>
                <VBadge
                  dot
                  location="bottom right"
                  offset-x="3"
                  offset-y="3"
                  color="success"
                >
                  <VAvatar color="primary"
                           variant="tonal">
                    <VImg v-if="authUser.profile.avatar" :src="authUser.profile.avatar"/>
                    <span
                      v-else
                      class="text-1xl font-weight-semibold">
              {{ avatarText(authUser.name) }}
            </span>
                  </VAvatar>
                </VBadge>
              </VListItemAction>
            </template>

            <VListItemTitle class="font-weight-semibold" v-if="authUser">
              {{ authUser.name }}
            </VListItemTitle>
          </VListItem>

          <VDivider class="my-2"/>

          <!-- 👉 Profile -->
          <VListItem link>
            <template #prepend>
              <VIcon
                class="me-2"
                icon="tabler-user"
                size="22"
              />
            </template>
            <VListItemTitle @click="router.push('account')">Profile</VListItemTitle>
          </VListItem>
          <!-- Divider -->
          <VDivider class="my-2"/>
          <!-- 👉 Logout -->
          <VListItem @click.prevent="logout">
            <template #prepend>
              <VIcon
                class="me-2"
                icon="tabler-logout"
                size="22"
              />
            </template>
            <VListItemTitle>Logout</VListItemTitle>
          </VListItem>
        </VList>
      </VMenu>
      <!-- !SECTION -->
    </VAvatar>
  </VBadge>
</template>
<script setup>
import {useAuthStore} from "@/stores/auth"
import {useRouter} from 'vue-router';
import {avatarText} from '@core/utils/formatters'

const router = useRouter();
const auth = useAuthStore()
const authUser = computed(() => auth.authUser)

const logout = () => {
  auth.logout()

}

</script>
