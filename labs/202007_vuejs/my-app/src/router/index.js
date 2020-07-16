import Vue from 'vue'
import VueRouter from 'vue-router'

import settings from '@/settings.js' // settings
import vars from '@/variables.js' // variables

Vue.use(VueRouter)

import Home from '@/views/Home.vue';
import About from '@/views/About.vue';
import Work from '@/views/Work.vue';
import Award from '@/views/Award.vue';
import Contact from '@/views/Contact.vue';
import SignUp from '@/views/SignUp.vue';

const routes = [{
        path: '/',
        name: 'Home',
        pageIdx: 0,
        component: Home
    },
    {
        path: '/about',
        name: 'About',
        params: {
            pageIdx: 1
        },
        component: About
    },
    {
        path: '/work',
        name: 'Work',
        pageIdx: 2,
        component: Work
    },
    {
        path: '/award',
        name: 'Award',
        pageIdx: 3,
        component: Award
    },
    {
        path: '/contact',
        name: 'Contact',
        pageIdx: 4,
        component: Contact
    },
    {
        path: '/signup',
        name: 'SignUp',
        pageIdx: 5,
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
