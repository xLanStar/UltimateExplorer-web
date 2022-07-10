import { createApp } from 'vue'
import App from './App.vue'
import vueaxios from 'vue-axios'
import axios from 'axios'

let app = createApp(App);

app.use(vueaxios, axios);
app.mount('#app');