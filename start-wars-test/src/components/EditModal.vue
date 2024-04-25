<script setup lang="ts">
import {computed, onMounted, onUpdated, ref} from "vue";
import type {Person} from "@/components/starWarsCRUD.vue";

interface Props {
  show: boolean,
  data: Person
}
const props = defineProps<Props>()
const emit = defineEmits(['close'])

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
</script>

<template>
  <div>
    <a-modal
      v-model:open="viewEditModal"
      title="Edit Character Data"
      centered
      width="500px"
      @ok="closeModal"
      @cancel="closeModal"
      @close="closeModal"
    >
      <h1>{{person.name ?? ""}}</h1>
      <a-form
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
        layout="horizontal"
        style="max-width: 600px"
      >
        <a-form-item label="Height">
          <a-input v-model="person.height" :value="person.height" />
        </a-form-item>
        <a-form-item label="Mass">
          <a-input v-model="person.mass" :value="person.mass" />
        </a-form-item>
        <a-form-item label="Hair Color">
          <a-input v-model="person.hairColor" :value="person.hairColor" />
        </a-form-item>
        <a-form-item label="Skin Color">
          <a-input v-model="person.skinColor" :value="person.skinColor" />
        </a-form-item>
        <a-form-item label="Eye Color">
          <a-input v-model="person.eyeColor" :value="person.eyeColor" />
        </a-form-item>
        <a-form-item label="Birth Year">
          <a-input v-model="person.birthYear" :value="person.birthYear" />
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