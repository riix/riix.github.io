<template>
    <div id="app">
        <div id="container">
            <Navigation ref="Navigation" role="navigation"></Navigation>
            <transition name="page-trainsition">
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
.page-trainsition-leave-active {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
}
.page-trainsition-leave-to {
    transition: opacity .2s ease-in-out .1s;
    opacity: 0;
}
.page-trainsition-enter-active {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    transition: opacity .2s ease-in-out .1s;
    opacity: 0;
}
.page-trainsition-enter-to {
    opacity: 0;
}
</style>
