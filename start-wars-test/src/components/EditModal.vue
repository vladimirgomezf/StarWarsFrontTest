<script setup lang="ts">
import {computed, onMounted, ref} from "vue";

interface Props {
  show: boolean,
  data: object
}
const props = defineProps<Props>()
const emit = defineEmits(['close'])

const viewEditModal = computed(() => props.show)
const closeModal = () => {
  emit('close')
}
</script>

<template>
  <div>
    <a-modal
      v-model:open="viewEditModal"
      title="Modal"
      centered
      width="75%"
      @ok="closeModal"
      @cancel="closeModal"
      @close="closeModal"
    >
      <p>Edit Modal...</p>
      {{data}}
    </a-modal>
  </div>
</template>

<style scoped>

</style>