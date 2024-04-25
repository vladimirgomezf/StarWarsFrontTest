<script setup lang="ts">
import {computed, ref} from "vue";

interface Props {
  show: boolean,
  data: object
}
const props = defineProps<Props>()
const emit = defineEmits(['close'])

const viewModal = computed( () => props.show)
const closeModal = () => {
  emit('close')
}
</script>

<template>
  <div>
    <a-modal
      v-model:open="viewModal"
      title="Modal"
      centered
      width="75%"
      @ok="closeModal"
      @cancel="closeModal"
      @close="closeModal"
    >
      <p>Details Modal...</p>
      {{data}}
    </a-modal>
  </div>
</template>

<style scoped>

</style>