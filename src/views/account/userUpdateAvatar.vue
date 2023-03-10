<template>
  <VDialog
    v-model="props.isAvatarDialogOpen"
    max-width="600"
    :persistent=true>
    <DialogCloseBtn @click="closeDialog"/>
    <VCard title="Update Profile">


      <VRow>
        <VCol
          class="mt-2 d-flex justify-center"
          cols="12">
          <VAvatar
            v-if="authUser"
            rounded
            :size="120"
            color="primary"
            variant="tonal">
            <VImg
              v-if="authUser.profile.avatar && !previewAvatarUrl"
              :src="authUser.profile.avatar"
            />
            <VImg
              v-if="previewAvatarUrl"
              :src="previewAvatarUrl"
            />
            <span
              v-if="!previewAvatarUrl && !authUser.profile.avatar"
              class="text-5xl font-weight-semibold"
            >
              {{ avatarText(authUser.name) }}
            </span>
          </VAvatar>
        </VCol>


        <VCol
          class="mt-2"
          cols="12">
          <VFileInput
            accept=".jpg, .png, .gif .jpeg,"
            class="ml-4"
            label="Avatar"
            prepend-icon="tabler-camera"
            @change="inputImageRenderer"
            @click:clear="clearAvatarToUpload"
            :error=!!error
            :messages=error
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
        <VCardText class="d-flex justify-end flex-wrap gap-3">
          <VBtn @click="update">
            Save
          </VBtn>
        </VCardText>
      </VRow>
    </VCard>
  </VDialog>
</template>
<script setup>
import {useAuthStore} from "@/stores/auth";
import {avatarText} from '@core/utils/formatters'
import axios from "@axios";

const emit = defineEmits(['close-avatar-dialog'])
const props = defineProps({
  isAvatarDialogOpen: {
    type: Boolean,
    required: true,
  },
})
const showSuccess = ref(false)
const error = ref('')

const auth = useAuthStore()
const authUser = computed(() => auth.authUser)


const clearAvatarToUpload = () => {
  previewAvatarUrl.value = null
  avatarToUpload.value = null
}

const closeDialog = () => {
  emit('close-avatar-dialog')
  clearAvatarToUpload()
}

const previewAvatarUrl = ref(null);
const avatarToUpload = ref(null);

const inputImageRenderer = (e) => {
  let input = e.target;
  if (input.files) {
    let reader = new FileReader();
    reader.onload = (e) => {
      previewAvatarUrl.value = e.target.result;
    }
    avatarToUpload.value = input.files[0];
    reader.readAsDataURL(input.files[0]);
  }
}


const update = () => {
  const config = {
    headers: {'content-type': 'multipart/form-data'}
  }
  let formData = new FormData();
  formData.append('avatar', avatarToUpload.value);
  axios.post('user/avatar', formData, config).then(r => {
    error.value = ''
    showSuccess.value = true
    auth.getAuthUser()
    setTimeout(() => {
      showSuccess.value = false
      emit('close-avatar-dialog')
    }, 1500)

  }).catch((e) => {
    error.value = e.response.data.message
  })

}
</script>
