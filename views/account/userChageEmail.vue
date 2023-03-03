<template>
  <VCard >
    <VCardItem>
      <VCardTitle>Change Email</VCardTitle>
    </VCardItem>
    <VCardText>
    </VCardText>
    <VCardText class="d-flex flex-wrap gap-4">
      <VBtn>Save changes</VBtn>
      <VBtn
        color="secondary"
        variant="tonal"
      >
        Discard
      </VBtn>
    </VCardText>
  </VCard>
</template>
<script setup>
const props = defineProps({
  userData: {
    type: Object,
    required: true,
  },
})
</script>
