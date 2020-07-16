<template>
    <div id="app">
        <div id="container">
            <Navigation></Navigation>
            <transition name="fade" mode="out-in">
                <router-view name="default"></router-view>
            </transition>
        </div>
        <PageMask ref="PageMask" />
    </div>
</template>

<script>
import settings from '@/settings.js' // settings
import vars from '@/variables.js' // variables
import store from '@/store.js'

import AppPlugin from '@/plugins'

import Navigation from '@/components/Navigation.vue'
import PageMask from '@/components/PageMask.vue'

export default {
    components: {
        Navigation,
        PageMask
    },
    created(){ // 실행
        this.init(); // 현재페이지
    },
    mounted(){
        // console.log('name is: ' + this.getName());
        // this.prev();
    },
    beforeCreate: function(){
        // console.log(this.$myAddedProperty);
        // console.log(this.myAddedProperty);
    },
    methods: { // method 정의
        prev() {
            // this.$refs.PageMask.prev();
        },
        next() {
            // this.$refs.PageMask.next();
        },
        init() {
            // console.log('init');
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
#container {
    opacity: 1;
    transition: opacity 0s ease-in-out .3s;
}
.anim-page {
    #container {
        opacity: 0;
        transition: opacity 0s ease-in-out .3s;
    }
}
</style>
