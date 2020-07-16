import Vue from 'vue'
import VueRouter from 'vue-router'

import settings from '@/settings.js' // settings
import vars from '@/variables.js' // variables

Vue.use(VueRouter)

import Home from '@/views/A0.Home.vue'
import About from '@/views/B0.About.vue'
import Work from '@/views/C0.Work.vue'
import Award from '@/views/D0.Award.vue'
import Contact from '@/views/E0.Contact.vue'
import SignUp from '@/views/F0.SignUp.vue'

const routes = [{
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/about',
        name: 'About',
        component: About
    },
    {
        path: '/work',
        name: 'Work',
        component: Work
    },
    {
        path: '/award',
        name: 'Award',
        component: Award
    },
    {
        path: '/contact',
        name: 'Contact',
        component: Contact
    },
    {
        path: '/signup',
        name: 'SignUp',
        component: SignUp
    }
];

const router = new VueRouter({
    // mode: 'history',
    base: process.env.BASE_URL,
    routes: routes
});

// router.beforeEach((to, from, next) => {
// });
router.afterEach((to, from) => {
    // console.log(router);
});

export default router
