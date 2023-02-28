<template>
  <div>
    <VCard title="Pending Requests">
      <VList border lines="two" v-if="pendingFriendRequests.length">
        <template
          v-for="(user, index) of pendingFriendRequests"
          :key="user.name"
        >
          <VListItem>
            <template #prepend>
              <VAvatar :image="avatar"/>
            </template>
            <VListItemTitle>
              {{ user.name }}
            </VListItemTitle>
            <VListItemSubtitle class="mt-1">
              <span class="text-xs text-disabled">{{ user.email }}</span>
            </VListItemSubtitle>
            <template #append>

              <VBtn size="small" v-if="!user.status" @click="removeRequest(user.id)">
                {{ $t("Cansel request") }}
              </VBtn>
            </template>
          </VListItem>
          <VDivider v-if="index !== pendingFriendRequests.length - 1"/>
        </template>
      </VList>
      <VList v-else>
        <VCardText>
          Pending Friend Requests is empty
        </VCardText>
      </VList>
      <VPagination
        v-if="paginator.pageCount > 1"
        class="my-4"
        v-model="paginator.currentPage"
        :length="paginator.pageCount"
        :total-visible="5"
        @update:model-value="pendingList"
      />

    </VCard>
  </div>
</template>
<script>
import avatar from '@images/avatars/avatar-1.png'
import axios from "@axios";
import {onBeforeMount, reactive, ref} from "vue";

export default {
  setup() {
    const pendingFriendRequests = ref([])
    const paginator = reactive({
      currentPage: 1,
      pageCount: 0,
    })
    const removeRequest = user =>
      axios.get(`friend/pending/${user}/cansel`).then(() =>
        pendingList(paginator.currentPage)
      )
    const pendingList = async (page = 1) =>
      await axios.get(`friend/pending?page=${page}`).then(({data}) => {
        pendingFriendRequests.value = data.data
        paginator.pageCount = data.last_page
      })
    onBeforeMount(() => {
      pendingList()
    })
    return {pendingFriendRequests, removeRequest, paginator, pendingList, avatar}
  },
}
</script>
