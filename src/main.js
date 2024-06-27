
import { createApp } from 'vue'
import { createPinia } from 'pinia'

//pinia持久化
import PiniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import App from './App.vue'
import router from './router'
//引入初始化样式文件
import '@/assets/styles/common.scss'
//注册图标主件
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
const pinia = createPinia()

app.use(pinia)
pinia.use(PiniaPluginPersistedstate)
app.use(router)
// app.config.globalProperties.$http = {
//   headers: {
//     'X-Frame-Options': 'SAMEORIGIN'
//   }
// }
app.mount('#app')
