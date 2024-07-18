import { createApp } from 'vue';
import './style.css';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css'; // 确保引入了样式
import router from './router';
import App from './App.vue';

const app = createApp(App);

app.use(ElementPlus);
app.use(router);

app.mount('#app').$nextTick(() => {
  if (window.ipcRenderer) {
    window.ipcRenderer.on('main-process-message', (_event, message) => {
      console.log('Message from main process:', message);
    });
  } else {
    console.warn('ipcRenderer not available');
  }
});
