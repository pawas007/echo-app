<template>
  <div>
    <VCard title="Friend Requests">
      <VList border lines="two" v-if="friendRequests.length">
        <template
          v-for="(user, index) of friendRequests"
          :key="user.name"
        >
          <VListItem>
            <template #prepend>
              <user-list-avatar :user="user"/>
            </template>
            <VListItemTitle>
              {{ user.name }}
            </VListItemTitle>
            <VListItemSubtitle class="mt-1">
              <span class="text-xs text-disabled">{{ user.email }}</span>
            </VListItemSubtitle>
            <template #append>
              <div class="col align-self-center d-flex justify-content-end">
                <VBtn size="small" class="mr-2" @click="acceptFriend(user.id)">{{
                    $t("Accept")
                  }}
                </VBtn>
                <VBtn size="small" @click="declineFriend(user.id)">{{
                    $t("Decline")
                  }}
                </VBtn>
              </div>
            </template>
          </VListItem>
          <VDivider v-if="index !== friendRequests.length - 1"/>
        </template>
      </VList>
      <VList v-else>
        <VCardText>
          Friend Requests is empty
        </VCardText>
      </VList>
      <VPagination
        v-if="paginator.pageCount > 1"
        class="my-4"
        v-model="paginator.currentPage"
        :length="paginator.pageCount"
        :total-visible="5"
        @update:model-value="requestList"
      />

    </VCard>
  </div>
</template>
<script>

import axios from "@axios";
import {onBeforeMount, reactive, ref} from "vue";
import {avatarText} from "@core/utils/formatters";
import UserListAvatar from "@/views/components/userListAvatar.vue";

export default {
  components: {UserListAvatar},
  setup() {
    const friendRequests = ref([])
    const paginator = reactive({
      currentPage: 1,
      pageCount: 0,
    })
    const requestList = (page = 1) =>
      axios.get(`friend/request?page=${page}`).then(({data}) => {
        friendRequests.value = data.data
        paginator.pageCount = data.last_page
      })
    const acceptFriend = user =>
      axios.post(`friend/request/${user}/accept`).then(() =>
        requestList(paginator.currentPage)
      )
    const declineFriend = id =>
      axios.delete(`friend/request/${id}/decline`).then(() =>
        requestList(paginator.currentPage)
      )
    onBeforeMount(() => {
      requestList()
    })
    return {requestList, declineFriend, acceptFriend, friendRequests, paginator, avatarText}
  },
}
</script>
