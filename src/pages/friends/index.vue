<template>
  <div>
    <VTabs
      v-model="currentTab"
      class="v-tabs-pill">
      <VTab>Friends <span class="ml-2 bg-amber">{{ friendsCount.friends }}</span></VTab>
      <VTab>Requests <span class="ml-2 bg-amber">{{ friendsCount.request }}</span></VTab>
      <VTab>Pending Requests <span class="ml-2 bg-amber">{{ friendsCount.pending }}</span></VTab>
    </VTabs>
    <VCard class="mt-5">
      <VWindow v-model="currentTab">
        <VWindowItem>
          <my-friends/>
        </VWindowItem>
        <VWindowItem>
          <friend-requests/>
        </VWindowItem>
        <VWindowItem>
          <pending-requests/>
        </VWindowItem>
      </VWindow>
    </VCard>
  </div>
</template>
<script setup>
import axios from "@axios";
import PendingRequests from "../../views/friends/pendingRequests.vue";
import FriendRequests from "../../views/friends/friendRequests.vue";
import MyFriends from "../../views/friends/myFriends.vue";

const currentTab = ref(0)
const friendsCount = ref({})
axios.get('friend/counts').then(responce =>
  friendsCount.value = responce.data
)

</script>
<route lang="yaml">
meta:
requiresAuth: true
</route>
