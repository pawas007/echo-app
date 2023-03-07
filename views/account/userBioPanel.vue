<template>
  <VRow>
    <VCol cols="12">
      <VCard v-if="authUser">
        <VCardText class="text-center pt-15">
          <VAvatar
            rounded
            :size="120"
            color="primary"
            variant="tonal">
            <VImg
              v-if="avatar"
              :src="avatar"
            />
            <span
              v-else
              class="text-5xl font-weight-semibold"
            >
              {{ avatarText(auth.user.name) }}
            </span>
          </VAvatar>

          <!-- 👉 User fullName -->
          <h6 class="text-h6 mt-4">
            {{ auth.user.name }}
          </h6>
        </VCardText>
        <VDivider/>
        <!-- 👉 Details -->
        <VCardText>
          <p class="text-sm text-uppercase text-disabled">
            Details
          </p>
          <VList class="card-list mt-2">
            <VListItem>
              <VListItemTitle>
                <h6 class="text-base font-weight-semibold">
                  Name:
                  <span class="text-body-2">
                    {{ auth.user.name }}
                  </span>
                </h6>
              </VListItemTitle>
            </VListItem>

            <VListItem>
              <VListItemTitle>
                <h6 class="text-base font-weight-semibold">
                  Email:
                  <span class="text-body-2">{{ auth.user.email }}</span>
                </h6>
              </VListItemTitle>
            </VListItem>
            <VListItem>
              <VListItemTitle>
                <h6 class="text-base font-weight-semibold">
                  Sex:
                  <span class="text-body-2">{{ auth.user.profile.sex }}</span>
                </h6>
              </VListItemTitle>
            </VListItem>
            <VListItem>
              <VListItemTitle>
                <h6 class="text-base font-weight-semibold">
                  Country:
                  <span class="text-body-2">{{ auth.user.profile.country }}</span>
                </h6>
              </VListItemTitle>
            </VListItem>
            <VListItem>
              <VListItemTitle>
                <h6 class="text-base font-weight-semibold">
                  Age:
                  <span class="text-body-2">{{ auth.user.profile.age }}</span>
                </h6>
              </VListItemTitle>
            </VListItem>
          </VList>
        </VCardText>
        <VDivider/>
        <VCardText class="d-flex justify-center">
          <VBtn
            variant="elevated"
            class="me-3"
            @click="isUserInfoEditDialogVisible = true">
            Edit
          </VBtn>
        </VCardText>
      </VCard>
    </VCol>
   <user-update-profile :is-dialog-open="isUserInfoEditDialogVisible" @close-dialog="isUserInfoEditDialogVisible = false"/>
  </VRow>
</template>
<script setup>
import {avatarText,} from '@core/utils/formatters'
import avatar from '@images/avatars/avatar-1.png'
import {useAuthStore} from "@/stores/auth";
import UserUpdateProfile from "./userUpdateProfile.vue";

const isUserInfoEditDialogVisible = ref(false)
const auth = useAuthStore()
const authUser = computed(() => auth.authUser)
</script>
<style lang="scss" scoped>
.card-list {
  --v-card-list-gap: 0.7rem;
}

.text-capitalize {
  text-transform: capitalize !important;
}
</style>
