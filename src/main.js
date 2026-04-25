import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate' // 새로고침해도 store 상태 유지
import App from './App.vue'
import router from './router'
import './assets/base.css'

const app = createApp(App)

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate) // pinia에 localStorage 자동 저장 플러그인 적용
app.use(pinia)
app.use(router)

app.mount('#app')