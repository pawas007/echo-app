<template>
  <VDialog
    v-model="props.isProfileDialogOpen"
    max-width="600"
    :persistent=true
    v-if="Object.keys( userDataToUpdate ).length">
    <DialogCloseBtn @click="closeDialog"/>
    <VCard title="Update Profile">
      <VCardText>
        <VRow>
          <VCol
            cols="6">
            <VTextField
              v-model="userDataToUpdate.name"
              label="Name"
              :error=!!errors.name
              :messages=errors.name
            />
          </VCol>
          <VCol
            cols="12"
            sm="6">
            <VSelect
              v-model="userDataToUpdate.profile.sex"
              :items="['Male', 'Female']"
              label="Sex"/>
          </VCol>
          <VCol
            cols="12"
            sm="6"
          >
            <VAutocomplete
              v-model="userDataToUpdate.profile.country"
              :items='["Andorra","Angola","Germany","Poland","Ukraine"]'
              label="Country"
            />
          </VCol>
          <VCol
            cols="12"
            sm="6">
            <VSelect
              v-model="userDataToUpdate.profile.age"
              :items="['0-17', '18-29', '30-54', '54+']"
              label="Age"
            />
          </VCol>
          <VCol
            cols="12"
            sm="6">
            <VTextField
              type="number"
              v-model="userDataToUpdate.phone"
              label="Phone +"
              :error=!!errors.phone
              :messages=errors.phone
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
        </VRow>
      </VCardText>
      <VCardText class="d-flex justify-end flex-wrap gap-3">
        <VBtn @click="update">
          Save
        </VBtn>
      </VCardText>
    </VCard>
  </VDialog>
</template>
<script setup>
import axios from "@axios";
import {useAuthStore} from "@/stores/auth";

const emit = defineEmits(['close-profile-dialog'])
const props = defineProps({
  isProfileDialogOpen: {
    type: Boolean,
    required: true,
  },
})

const showSuccess = ref(false)
const errors = ref({})

const auth = useAuthStore()
const authUser = computed(() => auth.authUser)
const userDataToUpdate = ref(JSON.parse(JSON.stringify(authUser.value)))

const closeDialog = () => {
  userDataToUpdate.value = JSON.parse(JSON.stringify(authUser.value))
  emit('close-profile-dialog')
}
const update = () => {
  axios.put('user/profile', userDataToUpdate.value).then(r => {
    auth.user = r.data
    errors.value.name = ''
    errors.value.phone = ''
    showSuccess.value = true
    setTimeout(() => {
      showSuccess.value = false
      emit('close-profile-dialog')
    }, 1500)

  }).catch((e) => {
    errors.value = e.response.data.errors

  })
}
</script>
