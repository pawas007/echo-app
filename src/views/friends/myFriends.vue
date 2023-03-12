<template>
  <div>
    <VCard title="Friends">
      <VList border lines="two" v-if="friends.length">
        <template
          v-for="(user, index) of friends"
          :key="user.name">
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
              <VBtn size="small" class="mr-2" @click="removeFriend(user.id)">
                {{ $t("Remove friend") }}
                </VBtn>
            </template>
          </VListItem>
          <VDivider v-if="index !== friends.length - 1"/>
        </template>
      </VList>
      <VList v-else>
        <VCardText>
          Friends list is empty
        </VCardText>
      </VList>
      <VPagination
        v-if="paginator.pageCount > 1"
        class="my-4"
        v-model="paginator.currentPage"
        :length="paginator.pageCount"
        :total-visible="5"
        @update:model-value="friendslist"
      />
    </VCard>
  </div>
</template>

<script>
import {avatarText} from "@core/utils/formatters";
import axios from "@axios";
import {onBeforeMount, reactive, ref} from "vue";
import UserListAvatar from "@/views/components/userListAvatar.vue";
export default {
  name: "MyFriends",
  components: {UserListAvatar},
  setup() {
    const friends = ref([])
    const paginator = reactive({
      currentPage: 1,
      pageCount: 0,
    })
    const removeFriend = user =>
      axios.delete(`friend/${user}/delete`).then(() => {
        friendslist(paginator.currentPage)
      })
    const friendslist = async (page = 1) =>
      await axios.get(`friend?page=${page}`).then(({data}) => {
        friends.value = data.data
        paginator.pageCount = data.last_page
      })
    onBeforeMount(() => {
      friendslist()
    })
    return {friendslist, removeFriend, friends, paginator,avatarText}
  },
}
</script>
