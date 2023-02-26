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
              <VAvatar :image="user.avatar"/>
            </template>
            <VListItemTitle>
              {{ user.name }}
            </VListItemTitle>
            <VListItemSubtitle class="mt-1">
              <!--              <VBadge-->
              <!--                dot-->
              <!--                location="start center"-->
              <!--                offset-x="2"-->
              <!--                :color="resolveStatusColor[user.status]"-->
              <!--                class="me-3"-->
              <!--              >-->
              <!--                <span class="ms-4">{{ user.status }}</span>-->
              <!--              </VBadge>-->

              <span class="text-xs text-disabled">{{ user.lastVisited }}</span>
            </VListItemSubtitle>

            <template #append>
              <VBtn size="small">
                Add
              </VBtn>
            </template>
          </VListItem>
          <VDivider v-if="index !== users.length - 1"/>
        </template>
      </VList>
    </VCard>
  </div>
</template>

<script>
import avatar1 from "@images/avatars/avatar-1.png"
import avatar2 from "@images/avatars/avatar-2.png"
import avatar3 from "@images/avatars/avatar-3.png"
import avatar4 from "@images/avatars/avatar-4.png"
import axios from "@axios"
import {onBeforeMount, ref, reactive} from "vue"


export default {
  name: "Peoples",

  setup() {

    // const users = ref([])

    // const paginator = reactive({
    //   currentPage: 1,
    //   pageCount: 0,
    // })

    // const addFriend = id =>
    //   @axios.get(`friend/${id}/add`).then(responce  => {
    //     usersList(paginator.currentPage)
    //
    //   })


    // const removeRequest = user =>
    //   axios.get(`friend/pending/${user}/cansel`).then(() =>
    //     usersList(paginator.currentPage),
    //   )


    // const removeFriend = user =>
    //   axios.get(`friend/${user}/delete`).then(() => {
    //     usersList(paginator.currentPage)
    //   })

    const usersList = (page = 1) => {
      axios.get(`users?page=${page}`).then(responce => {
        console.log('as')
      })
    }

    onBeforeMount(() => {
      usersList()
    })

    const users = ref([
      {
        avatar: avatar1,
        name: 'Caroline Black',
        status: 'Online',
        lastVisited: '13 minutes ago',
      },
      {
        avatar: avatar2,
        name: 'Alfred Copeland',
        status: 'Away',
        lastVisited: '11 minutes ago',
      },
      {
        avatar: avatar3,
        name: 'Celia Schneider',
        status: 'Offline',
        lastVisited: '9 minutes ago',
      },
      {
        avatar: avatar4,
        name: 'Max Rogan',
        status: 'In Meeting',
        lastVisited: '28 minutes ago',
      },
    ])


    return {users}
  },
}
</script>
