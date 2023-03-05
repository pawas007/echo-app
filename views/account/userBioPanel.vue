<template>
  <VRow>
    <VCol cols="12">
      <VCard v-if="props.userData">
        <VCardText class="text-center pt-15">
          <!-- 👉 Avatar -->
          <VAvatar
            rounded
            :size="120"
            color="primary"
            variant="tonal"
          >
            <VImg
              v-if="avatar"
              :src="avatar"
            />
            <span
              v-else
              class="text-5xl font-weight-semibold"
            >
              {{ avatarText(props.userData.name) }}
            </span>
          </VAvatar>

          <!-- 👉 User fullName -->
          <h6 class="text-h6 mt-4">
            {{ props.userData.name }}
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
                    {{ props.userData.name }}
                  </span>
                </h6>
              </VListItemTitle>
            </VListItem>

            <VListItem>
              <VListItemTitle>
                <h6 class="text-base font-weight-semibold">
                  Email:
                  <span class="text-body-2">{{ props.userData.email }}</span>
                </h6>
              </VListItemTitle>
            </VListItem>
            <VListItem>
              <VListItemTitle>
                <h6 class="text-base font-weight-semibold">
                  Language:
                  <span class="text-body-2">Ukraine</span>
                </h6>
              </VListItemTitle>
            </VListItem>

            <VListItem>
              <VListItemTitle>
                <h6 class="text-base font-weight-semibold">
                  Country:
                  <span class="text-body-2">Poland</span>
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
  </VRow>

<!--    &lt;!&ndash; 👉 Edit user info dialog &ndash;&gt;-->
<!--    <UserInfoEditDialog-->
<!--      v-model:isDialogVisible="isUserInfoEditDialogVisible"-->
<!--      :user-data="props.userData"-->
<!--    />-->

</template>
<script setup>
import {
  avatarText,
} from '@core/utils/formatters'
import avatar from '@images/avatars/avatar-1.png'

const props = defineProps({
  userData: {
    type: Object,
    required: true,
  },
})


const isUserInfoEditDialogVisible = ref(false)

</script>
<style lang="scss" scoped>
.card-list {
  --v-card-list-gap: 0.7rem;
}

.text-capitalize {
  text-transform: capitalize !important;
}
</style>
