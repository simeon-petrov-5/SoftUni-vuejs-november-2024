import { createApp } from 'vue';
import App from './App.vue';
import router from './config/router';
import './styles/reset.css';

const app = createApp(App);

app.use(router);

app.mount('#app');
