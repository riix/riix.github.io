<template>
    <div id="container" class="home">
        <div class="container flex">
            <div class="wrap">
                <img alt="Vue logo" src="../assets/logo.png">
                <HelloWorld msg="Welcome to Your Vue.js App" />
            </div>
        </div>
        <PageMask ref="PageMask" />
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
        username() {
            return this.$route.params.username
        }
    },
    beforeCreate: function(){
        console.log(this.$myAddedProperty);
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
