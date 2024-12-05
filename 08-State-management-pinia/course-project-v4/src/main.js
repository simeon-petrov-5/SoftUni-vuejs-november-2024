import { createPinia } from 'pinia';
import { createApp } from 'vue';
import App from './App.vue';
import router from './config/router';
import './styles/reset.css';

const pinia = createPinia();
const app = createApp(App);

app.use(router);
app.use(pinia);

app.mount('#app');
