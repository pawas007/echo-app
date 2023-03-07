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
    <VDialog
      v-model="isUserInfoEditDialogVisible"
      max-width="600"
      :persistent=true
      v-if="Object.keys( userDataToUpdate ).length">
      <DialogCloseBtn @click="closeDialog"/>
      <VCard title="Update Profile">
        <VCardText>
          <VRow>
            <VCol
              cols="6">
              <VTextField
                v-model="userDataToUpdate.name"
                label="Name"
                :error=!!errors.name
                :messages=errors.name
              />
            </VCol>
            <VCol
              cols="12"
              sm="6">
              <VSelect
                v-model="userDataToUpdate.profile.sex"
                :items="['Male', 'Female']"
                label="Sex"/>
            </VCol><VCol
              cols="12"
              sm="6"
            >
              <VAutocomplete
                v-model="userDataToUpdate.profile.country"
                :items='["Andorra","Angola","Germany","Poland","Ukraine"]'
                label="Country"
              />
            </VCol>
            <VCol
              cols="12"
              sm="6">
              <VSelect
                v-model="userDataToUpdate.profile.age"
                :items="['0-17', '18-29', '30-54', '54+']"
                label="Age"
              />
            </VCol>
            <VCol
              cols="12">
              <v-alert
                v-if="showSuccess"
                class="my-2"
                color="success"
                icon="$success"
                title="Updated"
              ></v-alert>
            </VCol>
          </VRow>
        </VCardText>
        <VCardText class="d-flex justify-end flex-wrap gap-3">
          <VBtn @click="update">
            Save
          </VBtn>
        </VCardText>
      </VCard>
    </VDialog>
    {{ userDataToUpdate }}
  </VRow>
</template>
<script setup>
import {avatarText,} from '@core/utils/formatters'
import avatar from '@images/avatars/avatar-1.png'
import {useAuthStore} from "@/stores/auth";
import axios from "@axios";
const showSuccess = ref(false)
const errors = ref({
  name: ''
})
const isUserInfoEditDialogVisible = ref(false)
const auth = useAuthStore()
const authUser = computed(() => auth.authUser)
const userDataToUpdate = ref(JSON.parse(JSON.stringify(authUser.value)))
const closeDialog = () => {
  isUserInfoEditDialogVisible.value = false
  userDataToUpdate.value = JSON.parse(JSON.stringify(authUser.value))
}
const update = () => {
  axios.put('user/profile', userDataToUpdate.value).then(r => {
    auth.user = r.data
    errors.value.name = ''
    showSuccess.value = true
    setTimeout(() => {
      showSuccess.value = false
      isUserInfoEditDialogVisible.value = false
    }, 1500)

  }).catch((e) => {
    errors.value.name = e.response.data.message
  })
}

</script>
<style lang="scss" scoped>
.card-list {
  --v-card-list-gap: 0.7rem;
}

.text-capitalize {
  text-transform: capitalize !important;
}
</style>
