<script setup lang="ts">
import apiServer from "../server/startWars"
import {onMounted, ref} from "vue"
import { InfoCircleOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons-vue"
import DetailsModal from "@/components/DetailsModal.vue";
import EditModal from "@/components/EditModal.vue";

export interface Person {
  name: string,
  height: number,
  mass: number,
  hairColor: string,
  skinColor: string,
  eyeColor: string,
  birthYear: string,
  gender: string,
  films: []
}

const people = ref()
const page = ref(1)
const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Height',
      dataIndex: 'height',
      sorter: {
        compare: (a: any, b: any) => a.height - b.height
      },
    },
    {
      title: 'Mass',
      dataIndex: 'mass',
      sorter: {
        compare: (a: any, b: any) => a.mass - b.mass
      },
    },
    {
      title: 'Hair Color',
      dataIndex: 'hair_color',
      sorter: {
        compare: (a: any, b: any) => a.hair_color - b.hair_color
      },
    },
    {
      title: 'Skin Color',
      dataIndex: 'skin_color',
      sorter: {
        compare: (a: any, b: any) => a.skin_color - b.skin_color
      },
    },
    {
      title: 'Eye Color',
      dataIndex: 'eye_color',
      sorter: {
        compare: (a: any, b: any) => a.eye_color - b.eye_color
      },
    },
    {
      title: 'Birth Year',
      dataIndex: 'birth_year',
      sorter: {
        compare: (a: any, b: any) => a.birth_year - b.birth_year
      },
    },
    {
      title: 'Gender',
      dataIndex: 'gender',
      sorter: {
        compare: (a: any, b: any) => a.gender - b.gender
      },
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      key: 'actions'
    },
  ]
const data = ref<Person[]>([])
const showDetails = ref<boolean>(false)
const modalsData = ref<object>({})
const showEdition = ref<boolean>(false)

onMounted(async () => {
  data.value = []
  page.value = 1
  for (let i: number = 1; i <= 9; i++) {
    await getvalues()
    page.value++
  }
})

const getvalues = async () =>  {
  people.value = await apiServer.getPeople(page.value)
  people.value.results.forEach((person: any) => {
    data.value.push({
      name: person.name,
      height: person.height,
      mass: person.mass,
      hairColor: person.hair_color,
      skinColor: person.skin_color,
      eyeColor: person.eye_color,
      birthYear: person.birth_year,
      gender: person.gender,
      films: person.films
    })
  })
}
const viewDetails = (record: object) => {
  modalsData.value = record
  showDetails.value = true
}
const viewEdit = (record: object) => {
  modalsData.value = record
  showEdition.value = true
}
const closeDetails = () => {
  modalsData.value = {}
  showDetails.value = false
}
const closeEdit = () => {
  modalsData.value = {}
  showEdition.value = false
}
const deleteRecord = (name: string) => {
  data.value = data.value.filter(person => person.name !== name)
}
const updateValue = (person: Person) => {
  const existingItemIndex = data.value.findIndex((item) => item.name === person.name);
  if (existingItemIndex !== -1) {
    data.value.splice(existingItemIndex, 1, person)
  }else {
    console.error('Item not found in the list');
  }
  closeEdit()
}
const fromViewToEdit = (record: Person) => {
  closeDetails()
  viewEdit(record)
}
</script>

<template>
  <div>
    <div>
      <a-table :columns="columns" :data-source="data" :pagination="{ pageSize: 10 }" >
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'actions'">
            <InfoCircleOutlined @click="viewDetails(record)" /> | <EditOutlined @click="viewEdit(record)"/> | <DeleteOutlined @click="deleteRecord(record.name)" />
          </template>
        </template>
      </a-table>
      <details-modal v-show="showDetails" :show="showDetails" :data="modalsData" @edit="fromViewToEdit" @close="closeDetails" />
      <edit-modal v-show="showEdition" :show="showEdition" :data="modalsData" @close="closeEdit" @update="updateValue" />
    </div>
  </div>
</template>

<style scoped>
.btn {
  color: black;
}
</style>