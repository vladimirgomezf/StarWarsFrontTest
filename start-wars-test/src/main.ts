import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import Antd from 'ant-design-vue';
import App from './App.vue'
import router from "./router"
import 'ant-design-vue/dist/reset.css';

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

const app = createApp(App)

app.component('font-awesome-icon', FontAwesomeIcon)

app.use(createPinia())
app.use(router)
app.use(Antd)

router.isReady().then(() => {
  app.mount("#app")
})
