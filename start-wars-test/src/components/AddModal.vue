<script setup lang="ts">
import {computed, ref} from "vue";
import type {Person} from "@/components/starWarsCRUD.vue";

interface Props {
  show: boolean
}
const props = defineProps<Props>()
const emit = defineEmits(['close', 'add'])

const labelCol = { style: { width: '150px' } };
const wrapperCol = { span: 14 };
const person = ref<Person>({
  name: "",
  height: 0,
  mass: 0,
  hairColor: "",
  skinColor: "",
  eyeColor: "",
  birthYear: "",
  gender: "",
  films: []
})

const viewAddModal = computed(() => props.show)
const closeModal = () => {
  emit('close')
}
const saveModal = () => {
  emit('add', person.value)
}
</script>

<template>
  <div>
    <a-modal
      v-model:open="viewAddModal"
      title="Add New Character"
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
      <a-form
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
        layout="horizontal"
        style="max-width: 600px"
      >
        <a-form-item label="Name">
          <a-input v-model:value="person.name"/>
        </a-form-item>
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