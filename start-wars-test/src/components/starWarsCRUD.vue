<script setup lang="ts">
import apiServer from "../server/startWars"
import {onMounted, ref} from "vue"
import { InfoCircleOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons-vue"

interface Person {
  name: string,
  height: number,
  mass: number,
  hairColor: string,
  skinColor: string,
  eyeColor: string,
  birthYear: string,
  gender: string,
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

onMounted(async () => {
  for (let i: number = 1; i <= 9; i++) {
    await getvalues()
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
      gender: person.gender
    })
  })
}
const viewDetails = () => {}
</script>

<template>
  <div>
    <div>
<!--      {{ people }}-->
      <a-table :columns="columns" :data-source="data" :pagination="{ pageSize: 10 }">
        <template #bodyCell="{ column }">
          <template v-if="column.key === 'actions'">
            <InfoCircleOutlined /> | <EditOutlined /> | <DeleteOutlined />
          </template>
        </template>
      </a-table>
    </div>
  </div>
</template>

<style scoped>
.btn {
  color: black;
}
</style>