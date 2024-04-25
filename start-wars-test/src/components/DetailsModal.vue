<script setup lang="ts">
import {computed, onUpdated, ref} from "vue";
import type {Person} from "@/components/starWarsCRUD.vue";
import {EditOutlined} from "@ant-design/icons-vue";

interface Props {
  show: boolean,
  data: Person
}
const props = defineProps<Props>()
const emit = defineEmits(['close', 'edit'])

const person = ref<Person>()

onUpdated(async () => {
  person.value = {
    name: props.data.name,
    height: props.data.height,
    mass: props.data.mass,
    hairColor: props.data.hairColor,
    skinColor: props.data.skinColor,
    eyeColor: props.data.eyeColor,
    birthYear: props.data.birthYear,
    gender: props.data.gender,
    films: props.data.films
  }
})
const viewModal = computed( () => props.show)
const closeModal = () => {
  emit('close')
}
const changeToEdit = (person: Person) => {
  emit('edit', person)
}
</script>

<template>
  <div>
    <a-modal
      v-model:open="viewModal"
      title="Show Character Information"
      centered
      width="35%"
      @cancel="closeModal"
      @close="closeModal"
    >
      <template #footer>
        <a-button key="submit" type="default" @click="closeModal">Close</a-button>
      </template>
      <a-card hoverable>
        <h1>{{person.name ?? ""}}</h1>
        <div class="inlineData">
          <div class="column">
            <div>Height: {{ person.height }}</div>
            <div>Mass: {{ person.mass }}</div>
            <div>Hair Color: {{ person.hairColor }}</div>
            <div>Skin Color: {{ person.skinColor }}</div>
          </div>
          <div class="column">
            <div>Eye Color: {{ person.eyeColor }}</div>
            <div>Birth Year: {{ person.birthYear }}</div>
            <div>Gender: {{ person.gender }}</div>
          </div>
        </div>
        <template #actions>
          <EditOutlined key="edit" @click="changeToEdit(person)"/>
        </template>
      </a-card>
    </a-modal>
  </div>
</template>

<style scoped>
.inlineData {
  display: flex;
  flex-wrap: wrap;
}

.column {
  flex: 0 0 50%;
}
</style>