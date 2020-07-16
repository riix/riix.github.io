import Vue from 'vue'

// settings
import settings from './settings.js' // settings
import vars from './variables.js' // variables

// core logic
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import store from './store'
import firebase from 'firebase'
firebase.initializeApp(settings.firebase);

// app
import App from './App.vue'
import UI from './ui';

Vue.use(VueAxios, axios, router);
Vue.use(settings, vars);
Vue.use(UI);

Vue.config.productionTip = false


Vue.prototype.$appName = '123';

new Vue({
    router,
    axios,
    VueAxios,
    store,
    settings,
    vars,
    render: h => h(App)
}).$mount('#app')
