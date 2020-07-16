import Vue from 'vue'
import Vuex from 'vuex'
import router from './router'

// settings
import settings from './settings.js' // settings
import vars from './variables.js' // variables
import store from './store.js'

import axios from 'axios'
import VueAxios from 'vue-axios'

import firebase from 'firebase'
firebase.initializeApp(settings.firebase);

// app
import App from './App.vue'
import AppPlugin from './plugins'

Vue.use(VueAxios, axios, Vuex, router)
Vue.use(settings, vars)
Vue.use(AppPlugin)

Vue.config.productionTip = false

// Vue.prototype.$appName = '123';

Vue.prototype.$globalValue = 'Global Scope!';

new Vue({
    router,
    Vuex,
    axios,
    VueAxios,
    store,
    settings,
    vars,
    AppPlugin,
    render: h => h(App)
}).$mount('#app')
