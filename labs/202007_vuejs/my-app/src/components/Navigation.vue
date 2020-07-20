<template>
    <div id="nav">
        <ul>
            <li class="d1" :class="[currentPage == '/' ? activeClass : '']">
                <router-link to="/"><span>Home</span></router-link>
            </li>
            <li class="d1" :class="[currentPage.includes('about') ? activeClass : '']">
                <router-link to="/about"><span>About</span></router-link>
            </li>
            <li class="d1" :class="[currentPage.includes('work') ? activeClass : '']">
                <router-link to="/work" ><span>Work</span></router-link>
            </li>
            <li class="d1" :class="[currentPage.includes('award') ? activeClass : '']">
                <router-link to="/award" ><span>Award</span></router-link>
            </li>
            <li class="d1" :class="[currentPage.includes('contact') ? activeClass : '']">
                <router-link to="/contact"><span>Contact</span></router-link>
            </li>
            <li class="d1" :class="[currentPage.includes('signup') ? activeClass : '']">
                <router-link to="/signup"><span>SignUp</span></router-link>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'Navigation',
    data: function(){ // vue component 에서는 무언가를 return 하는 함수를 넣어줘야함
        return {
            activeClass: 'in',
            pages: [
                {
                    name: 'Home',
                    link: '/',
                    includes: '/'
                },
                {
                    name: 'About',
                    link: '/about',
                    includes: 'about'
                },
                {
                    name: 'Work',
                    link: '/work',
                    includes: 'work'
                },
                {
                    name: 'Award',
                    link: '/award',
                    includes: 'award'
                },
                {
                    name: 'Contact',
                    link: '/contact',
                    includes: 'contact'
                },
                {
                    name: 'SignUp',
                    link: '/signup',
                    includes: 'signup'
                },
            ]
        };
    },
    computed: {
        currentPage() {
            var _path = this.$route.path;
            return _path;
        }
    }
}
</script>
<style lang="less">
#nav {
    position: fixed;
    z-index: 4000;
    top: 50%;
    right: 0;
    padding: 30px;
    transform: translate(0, -50%);
    ul {
        list-style: none;
        margin: 0;
        padding: 0;
        text-align: right;
    }
    li {
        margin: 0;
        padding: 0;
    }
    a {
        display: block;
        padding: 10px 0;
        font-weight: bold;
        color: #2c3e50;
        transition: color 0s ease-in-out 0s;
        text-decoration: none;
        &.router-link-exact-active {
            color: #42b983;
        }
    }
    .anim-page-prev &,
    .anim-page-next & {
        a {
            color: #fff;
            transition: color .1s ease-in-out .1s;
        }
    }
}
</style>
