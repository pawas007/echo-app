<template>
  <div class="userListAvatar mr-3"  v-if="props.user">
  <VBadge
    dot
    location="bottom right"
    offset-x="3"
    offset-y="3"
    color="success"

    value=false
    v-if="user.if_online">
    <VAvatar color="primary"
             variant="tonal">
      <VImg v-if="user.profile.avatar" :src="user.profile.avatar"/>
      <span
        v-else
        class="text-1xl font-weight-semibold">
              {{ avatarText(user.name) }}
            </span>
    </VAvatar>
  </VBadge>
  <VAvatar color="primary"  v-else
           variant="tonal">
    <VImg v-if="user.profile.avatar" :src="user.profile.avatar"/>
    <span
      v-else
      class="text-1xl font-weight-semibold">
              {{ avatarText(user.name) }}
            </span>
  </VAvatar>
  </div>
</template>
<script setup>
import {avatarText} from "@core/utils/formatters";

const props = defineProps({
  user: {
    type: Object,
    required: true,
  },
})
</script>

