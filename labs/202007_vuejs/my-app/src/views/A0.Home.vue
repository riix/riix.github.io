<template>
    <div id="container" class="home">
        <div class="container flex">
            <div class="wrap">
                <img alt="Vue logo" src="../assets/logo.png">
                <p>
                    parameter : {{ param }}
                </p>
                <HelloWorld msg="Welcome to Your Vue.js App" />
            </div>
        </div>
    </div>
</template>

<script>
import store from '@/store.js'
import HelloWorld from '@/components/HelloWorld.vue' // @ is an alias to /src

export default {
    name: 'Home',
    components: {
        HelloWorld
    },
    data() {
        return { // vue component 에서는 무언가를 return 하는 함수를 넣어줘야함
            state: store.state, // global state
            pageIdx: 0, // 페이지 인덱스
            // local
            msg: 'Welcome to Your Vue.js PWA',
            email: '',
            password: ''
        };
    },
    computed: {
        param: function () {
            return this.$route.params;
        },
        username() {
            return this.$route.params.username
        }
    },
    mounted(){
        this.$init(); // init
    }
}
</script>
