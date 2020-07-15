import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import Home from '@/views/Home.vue';
import About from '@/views/About.vue';
import Work from '@/views/Work.vue';
import Award from '@/views/Award.vue';
import Contact from '@/views/Contact.vue';
import SignUp from '@/views/SignUp.vue';

function dynamicPropsFn (route) {
  const now = new Date()
  console.log(now);
  return {
    name: (now.getFullYear() + parseInt(route.params.years)) + '!'
  }
}

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
// router.afterEach((to, from) => {
//     // console.log(to, from);
//     // console.log('page', route.params.pageIdx);
//     console.log(router);
// });

export default router
