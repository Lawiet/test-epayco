import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-next/dist/bootstrap-vue-next.css'
import './assets/main.css'

import { createApp } from 'vue'
import { createBootstrap } from 'bootstrap-vue-next'
import router from './router/routes.js'
import App from './App.vue'

createApp(App)
    .use(router)
    .use(createBootstrap())
    .mount('#app')
