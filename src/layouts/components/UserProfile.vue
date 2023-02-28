<script setup>
import avatar1 from '@images/avatars/avatar-1.png'
import {useAuthStore} from "@/stores/auth"
import {useRouter} from 'vue-router';

const router = useRouter();
const auth = useAuthStore()
const authUser = computed(() => auth.authUser)

const logout = () => {
  auth.logout().then(() => router.push({name: 'login'}))

}

</script>

<template>

  <VBadge
    dot
    location="bottom right"
    offset-x="3"
    offset-y="3"
    bordered
    color="success"
  >
    <VAvatar
      class="cursor-pointer"
      color="primary"
      variant="tonal"
    >
      <VImg :src="avatar1"/>

      <!-- SECTION Menu -->
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
                  <VAvatar
                    color="primary"
                    variant="tonal"
                  >
                    <VImg :src="avatar1"/>
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

            <VListItemTitle>Profile</VListItemTitle>
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
