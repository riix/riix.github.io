import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import store from './store'

import settings from './settings.js' // settings

import UI from './ui';

Vue.use(VueAxios, axios, router);

Vue.use(settings);

Vue.use(UI);

Vue.config.productionTip = false

new Vue({
    router,
    axios,
    VueAxios,
    store,
    settings,
    render: h => h(App)
}).$mount('#app')
