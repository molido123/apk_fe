import { createApp } from 'vue'
import './style.css'
import ElementPlus from 'element-plus'

import App from './App.vue'

const app = createApp(App)
app.use(ElementPlus)
app.mount('#app').$nextTick(() => {
  // Use contextBridge
  window.ipcRenderer.on('main-process-message', (_event, message) => {
    console.log(message)
  })
})
