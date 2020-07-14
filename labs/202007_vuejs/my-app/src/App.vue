<template>
    <div id="app">
        <div id="nav">
            <ul>
                <li class="d1" :class="[currentPage == '/' ? activeClass : '']">
                    <router-link to="/">Home</router-link>
                </li>
                <li class="d1" :class="[currentPage.includes('about') ? activeClass : '']">
                    <router-link to="/about">About</router-link>
                </li>
                <li class="d1" :class="[currentPage.includes('work') ? activeClass : '']">
                    <router-link to="/work" >Work</router-link>
                </li>
                <li class="d1" :class="[currentPage.includes('award') ? activeClass : '']">
                    <router-link to="/award" >Award</router-link>
                </li>
                <li class="d1" :class="[currentPage.includes('contact') ? activeClass : '']">
                    <router-link to="/contact">Contact</router-link>
                </li>
                <li class="d1" :class="[currentPage.includes('signup') ? activeClass : '']">
                    <router-link to="/signup">SignUp</router-link>
                </li>
            </ul>
        </div>
        <transition name="fade" mode="out-in">
            <router-view></router-view>
        </transition>
    </div>
</template>

<script>
import settings from '@/settings.js' // settings

export default {
    data: function(){ // vue component 에서는 무언가를 return 하는 함수를 넣어줘야함
        return {
            activeClass: 'in'
        };
    },
    computed: {
        currentPage() {
            var _path = this.$route.path;
            var _currentPage = _path;
            console.log(_path);
            console.log(settings.hostname);
            return _currentPage;
        }
    },
    created (){ // 실행
        this.init(); // 현재페이지
    },
    beforeCreate: function(){
        // console.log(this.$myAddedProperty);
        // console.log(this.myAddedProperty);
    },
    methods: { // method 정의
        init() {
            console.log('init');
        }
    }

    // watch: {
    //     $route: {
    //         handler(to, from) {
    //             // pageHandler(to, from)
    //             console.log(pageHandler);
    //         },
    //         immediate: true,
    //     }
    // },
}
</script>
<style lang="less">
html, body {
    margin: 0;
    padding: 0;
}
body { overflow-y: scroll; }
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}
#nav {
    position: absolute;
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
        &.router-link-exact-active {
            color: #42b983;
        }
    }
}

// dislay
.toggle {
    display: none;
    &.in {
        display: block;
    }
}

.container {
    width: 100%;
    align-items: center;
    text-align: center;
    &::after {
        display: table;
        content: '';
        clear: both;
        overflow: hidden;
    }
}
.container.flex {
    display: flex;
    place-items: center;
    align-items: center;
    min-height: 100%;
    min-height: 100vh;
}
.wrap {
    margin: 0 auto;
}
</style>
