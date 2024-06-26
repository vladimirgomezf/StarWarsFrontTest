<script setup lang="ts">
import apiServer from "../server/startWars"
import {h, onMounted, ref} from "vue"
import {InfoCircleOutlined, EditOutlined, DeleteOutlined, PlusOutlined} from "@ant-design/icons-vue"
import DetailsModal from "@/components/DetailsModal.vue";
import EditModal from "@/components/EditModal.vue";
import AddModal from "@/components/AddModal.vue";

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
      dataIndex: 'hairColor',
      sorter: {
        compare: (a: any, b: any) => a.hairColor.localeCompare(b.hairColor)
      },
    },
    {
      title: 'Skin Color',
      dataIndex: 'skinColor',
      sorter: {
        compare: (a: any, b: any) => a.skinColor.localeCompare(b.skinColor)
      },
    },
    {
      title: 'Eye Color',
      dataIndex: 'eyeColor',
      sorter: {
        compare: (a: any, b: any) => a.eyeColor.localeCompare(b.eyeColor)
      },
    },
    {
      title: 'Birth Year',
      dataIndex: 'birthYear',
      sorter: {
        compare: (a: any, b: any) => a.birthYear.localeCompare(b.birthYear)
      },
    },
    {
      title: 'Gender',
      dataIndex: 'gender',
      sorter: {
        compare: (a: any, b: any) => a.gender.localeCompare(b.gender)
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
const showAddition = ref<boolean>(false)

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
const viewAdd = () => {
  showAddition.value = true
}
const closeDetails = () => {
  modalsData.value = {}
  showDetails.value = false
}
const closeEdit = () => {
  modalsData.value = {}
  showEdition.value = false
}
const closeAdd = () => {
  showAddition.value = false
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
const addValue = (person: Person) => {
  data.value.push(person)
  closeAdd()
}
const fromViewToEdit = (record: Person) => {
  closeDetails()
  viewEdit(record)
}
</script>

<template>
  <div>
    <div class="imageBanner"></div>
    <div>
      <div class="addRegion">
        <a-tooltip title="Add Character">
          <a-button type="primary" :icon="h(PlusOutlined)" @click="viewAdd">Add</a-button>
        </a-tooltip>
      </div>
      <a-table :columns="columns" :data-source="data" :pagination="{ pageSize: 10 }" >
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'actions'">
            <InfoCircleOutlined @click="viewDetails(record)" /> | <EditOutlined @click="viewEdit(record)"/> | <DeleteOutlined @click="deleteRecord(record.name)" />
          </template>
        </template>
      </a-table>
      <details-modal v-show="showDetails" :show="showDetails" :data="modalsData" @edit="fromViewToEdit" @close="closeDetails" />
      <edit-modal v-show="showEdition" :show="showEdition" :data="modalsData" @close="closeEdit" @update="updateValue" />
      <add-modal v-show="showAddition" :show="showAddition" @close="closeAdd" @add="addValue" />
    </div>
  </div>
</template>

<style scoped>
.addRegion {
  display: flex;
  width: auto;
  justify-content: right;
  margin-bottom: 1em;
}
.imageBanner {
  display: flex;
  width: auto;
  height: auto;
  margin-bottom: 1em;
  background-image: url("@/assets/banner.jpg");
}
</style>