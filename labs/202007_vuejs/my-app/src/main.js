import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'

import store from './store'
import ui from './ui'

Vue.use(VueAxios, axios, router);

Vue.config.productionTip = false

new Vue({
    router,
    axios,
    VueAxios,
    store,
    ui,
    render: h => h(App)
}).$mount('#app')
