<template>
  <div>
    <VCard title="Users">
      <VList
        lines="two"
        border
      >
        <template
          v-for="(user, index) of users"
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
              <div class="col align-self-center d-flex justify-content-end">
                <VBtn size="small" v-if="!user.status"  @click="addFriend(user.id)">
                  {{ $t("Add friend") }}
                </VBtn>
                <VBtn size="small" v-if="user.status === 'pending'"
                        @click="removeRequest(user.id)"> {{ $t("Cansel request") }}
                </VBtn>
                <VBtn size="small" v-if="user.status === 'friend'"
                        @click="removeFriend(user.id)"> {{ $t("Remove friend") }}
                </VBtn>
              </div>
            </template>
          </VListItem>
          <VDivider v-if="index !== users.length - 1"/>
        </template>
      </VList>
      <VPagination
        class="my-4"
        v-model="paginator.currentPage"
        :length="paginator.pageCount"
        :total-visible="5"
        @update:model-value="usersList"
      />
    </VCard>
  </div>
</template>

<script>
import avatar from '@images/avatars/avatar-1.png'
import axios from "@axios"
import {onBeforeMount, ref, reactive} from "vue"
import {getRandomAvatar} from "@/plugins/helpers";

export default {
  name: "Peoples",
  setup() {
    const users = ref([])
    const paginator = reactive({
      currentPage: 1,
      pageCount: 5,
    })

    const addFriend = id =>
      axios.get(`friend/${id}/add`).then(responce  => {
        usersList(paginator.currentPage)

      })

    const removeRequest = user =>
      axios.get(`friend/pending/${user}/cansel`).then(() =>
        usersList(paginator.currentPage),
      )
    const removeFriend = user =>
      axios.get(`friend/${user}/delete`).then(() => {
        usersList(paginator.currentPage)
      })

    const usersList = (page = 1) => {
      axios.get(`users?page=${page}`).then(responce => {
        users.value = responce.data.data
        paginator.pageCount = responce.data.meta.last_page
      })
    }
    onBeforeMount(() => {
      usersList()
    })

    return {users,getRandomAvatar,addFriend,usersList,paginator,removeRequest,removeFriend,avatar }
  },
}
</script>
