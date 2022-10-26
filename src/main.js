import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index.js'
import vantItem from './vant/index.js'
import MyLoading from './components/MyLoading.vue'
import MyNavBar from './components/NavBar.vue'
const app = createApp(App)
app.component('MyLoading', MyLoading)
app.component('MyNavBar', MyNavBar)
app.use(router).use(vantItem).mount('#app')
