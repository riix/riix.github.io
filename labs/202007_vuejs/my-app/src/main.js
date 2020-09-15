import Vue from 'vue'
import Vuex from 'vuex'
import router from './router'

// settings
import settings from './settings.js' // settings
import vars from './variables.js' // variables
import store from './store.js'
import EventBus from './eventBus.js';

import axios from 'axios'
import VueAxios from 'vue-axios'

import firebase from 'firebase'
firebase.initializeApp(settings.firebase);

// plugins
import vueSmoothScroll from 'vue-smooth-scroll'

import 'splitting/dist/splitting.css';
import 'splitting/dist/splitting-cells.css';
import Splitting from 'splitting';

// app
import App from './App.vue'
import AppPlugin from './plugins'


Vue.use(VueAxios, axios, Vuex, router)
Vue.use(settings, vars)
Vue.use(store)
Vue.use(AppPlugin)
Vue.use(vueSmoothScroll)

Vue.config.productionTip = false

// Vue.prototype.$appName = '123';

Vue.prototype.$globalValue = 'Global Scope!';

var vm = new Vue({
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

console.info(vm);
