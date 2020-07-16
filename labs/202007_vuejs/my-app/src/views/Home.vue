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
        <!-- <PageMask ref="PageMask" /> -->
    </div>
</template>

<script>
import PageMask from '@/components/PageMask.vue'
import HelloWorld from '@/components/HelloWorld.vue' // @ is an alias to /src

export default {
    name: 'Home',
    components: {
        PageMask,
        HelloWorld
    },
    data() {
        return {
            msg: 'Welcome to Your Vue.js PWA',
            email: '',
            password: ''
        }
    },
    computed: {
        param: function () {
            return this.$route.params;
        },
        username() {
            return this.$route.params.username
        }
    },
    // lifecycle
    beforeCreate() { // 가장 먼저 실행되는 훅
        console.log('beforeCreate');
        this.$route.params.pageIdx = 0;
    },
    created(){
        // console.log('created');
        this.$route.params.pageIdx = 0; // https://mkki.github.io/vue.js/2018/06/12/start-vuejs-12.html
        // this.getName();
        // https://m.blog.naver.com/PostView.nhn?blogId=psj9102&logNo=221430447361&proxyReferer=https:%2F%2Fwww.google.com%2F
    },
    methods: {
        prev() {
            this.$refs.PageMask.prev();
        },
        next() {
            this.$refs.PageMask.next();
        }
    }
}
</script>
