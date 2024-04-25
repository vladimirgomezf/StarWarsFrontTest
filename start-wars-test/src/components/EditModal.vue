<script setup lang="ts">
import {computed, onUpdated, ref} from "vue";
import type {Person} from "@/components/starWarsCRUD.vue";

interface Props {
  show: boolean,
  data: Person
}
const props = defineProps<Props>()
const emit = defineEmits(['close', 'update'])

const labelCol = { style: { width: '150px' } };
const wrapperCol = { span: 14 };
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

const viewEditModal = computed(() => props.show)
const closeModal = () => {
  emit('close')
}
const saveModal = () => {
  emit('update', person.value)
}
</script>

<template>
  <div>
    <a-modal
      v-model:open="viewEditModal"
      title="Edit Character Data"
      centered
      width="500px"
      @ok="saveModal"
      @cancel="closeModal"
      @close="closeModal"
    >
      <template #footer>
        <a-button key="cancel" @click="closeModal">Cancel</a-button>
        <a-button key="submit" type="primary" @click="saveModal">Save</a-button>
      </template>
      <h1>{{person.name ?? ""}}</h1>
      <a-form
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
        layout="horizontal"
        style="max-width: 600px"
      >
        <a-form-item label="Height">
          <a-input v-model:value="person.height"/>
        </a-form-item>
        <a-form-item label="Mass">
          <a-input v-model:value="person.mass" />
        </a-form-item>
        <a-form-item label="Hair Color">
          <a-input v-model:value="person.hairColor" />
        </a-form-item>
        <a-form-item label="Skin Color">
          <a-input v-model:value="person.skinColor" />
        </a-form-item>
        <a-form-item label="Eye Color">
          <a-input v-model:value="person.eyeColor" />
        </a-form-item>
        <a-form-item label="Birth Year">
          <a-input v-model:value="person.birthYear" />
        </a-form-item>
        <a-form-item label="Gender">
          <a-select v-model:value="person.gender">
            <a-select-option value="male">Male</a-select-option>
            <a-select-option value="female">Female</a-select-option>
            <a-select-option value="n/a">N/A</a-select-option>
            <a-select-option value="hermaphrodite">Hermaphrodite</a-select-option>
            <a-select-option value="none">None</a-select-option>
          </a-select>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<style scoped>

</style>