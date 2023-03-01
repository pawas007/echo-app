<script setup>
import {useI18n} from "vue-i18n"
import axios from "@axios"
import moment from "moment";
import 'moment/dist/locale/uk';
import notifySound from '../../assets/audio/new_message_notice.wav'
import {useAuthStore} from "@/stores/auth";
const {getAuthUser} = useAuthStore()

const audio = new Audio(notifySound)
const momentTransform = date => {
  moment.locale(currentLang.value)
  return moment(date).format('MMMM Do YYYY, h:mm');
}

const {locale} = useI18n()
const currentLang = computed(() => locale.value)
const notificationsCount = ref(0)
const notificationsList = ref([]);
const notifyModal = ref(false)

const getNotifications = () =>
  axios.get('notifications').then(responce => {
    const {notifications, count} = responce.data
    notificationsList.value = notifications
    notificationsCount.value = count
  })

const markAsRead = id =>
  axios.get(`notifications/${id}/mark/toggle`).then(() =>
    notificationsList.value.map(obj => {
      if (obj.id === id) {
        if (obj.readAt) {
          obj.readAt = null
        } else {
          obj.readAt = Date.now()
        }
      }
      return obj;
    })
  )
const deleteNotification = id => {
  axios.get(`notifications/${id}/destroy`).then(() => {
    const findNotify = notificationsList.value.findIndex((obj) => obj.id === id);
    notificationsList.value.splice(findNotify, 1);
    notificationsCount.value--
  })
}
const subscribeToNotifications = () =>
  getAuthUser().then(user => Echo.private('push_notify.' + user.id)
    .notification((notification) => {
      let message = notification.data
        notificationsList.value.unshift({
          "id": notification.id,
          "user": {"name": message.user.name},
          "message": message.message,
          "created": message.created,
          "readAt": null

        })
        notificationsCount.value++
        audio.play().catch(error => {
          audio.play()
        })
      }
    ))

subscribeToNotifications()
getNotifications()
</script>
<template>
  <VMenu
    v-model="notifyModal"
    width="580px"
    location="bottom"
    offset="14px"
    :close-on-content-click="false">
    <template v-slot:activator="{ props }">
      <VBtn
        icon
        variant="text"
        color="default"
        size="small"
        v-bind="props">
        <VBadge
          :model-value="!!notificationsCount"
          :content="notificationsCount">
          <VIcon
            icon="tabler-bell"
            size="24"
          />
        </VBadge>
      </VBtn>
    </template>
    <VList class="py-0">
      <!-- 👉 Header -->
      <VListItem
        title="Notifications"
        class="notification-section"
        height="48px">
        <template #append v-if="!notificationsList.length">
          List empty
        </template>
      </VListItem>
      <VDivider/>
      <!-- 👉 Notifications list -->
      <template
        v-for="notification in notificationsList"
        :key="notification.title"
      >
        <VListItem
          :title="notification?.user.name"
          :subtitle="$t(notification?.message)"
          lines="one"
          min-height="66px"
          :active="!notification.readAt">

          <!-- Slot: Append -->
          <template #append>
            <div class="d-flex flex-column">
              <small class="whitespace-no-wrap text-medium-emphasis">{{
                  momentTransform(notification.created)
                }}</small>
              <div class="d-flex justify-end">
                <VBtn
                  icon
                  variant="text"
                  color="default"
                  size="x-small"
                  @click="markAsRead(notification.id)"
                >
                  <VIcon
                    icon="tabler-eye"
                    size="18"
                  />
                </VBtn>
                <VBtn
                  icon
                  variant="text"
                  color="default"
                  size="x-small"
                  @click="deleteNotification(notification.id)"
                >
                  <VIcon
                    icon="tabler-trash"
                    size="18"
                  />
                </VBtn>
              </div>
            </div>
          </template>
        </VListItem>
        <VDivider/>
      </template>
    </VList>
  </VMenu>


</template>


<style lang="scss">
.notification-section {
  padding: 14px !important;

}

</style>
