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
        component: Home
    },
    {
        path: '/about/',
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
    // console.log('pageIdx:', vars.pageIdx.current);
    // console.log('from', from.params.pageIdx);
    // console.log('to', to.params.pageIdx);
    // console.log(from.params.pageIdx, to.params.pageIdx);
    // console.log(to.params, to.params.pageIdx);
    // console.log(typeof to.params.pageIdx);
});

export default router
