<template>
    <div id="container" class="hello">
        <div class="wrap">
            <h4>아이디</h4>
            <input type="text" v-model="email"></input>
            <h4>패스워드</h4>
            <input type="password" v-model="password"></input>
            <div>
                <button v-on:click="SignUp()">가입하기</button>
            </div>
        </div>
        <PageMask ref="PageMask" />
    </div>
</template>

<script>
import PageMask from '@/components/PageMask.vue'
import HelloWorld from '@/components/HelloWorld.vue'
import firebase from 'firebase'

export default {
    name: 'SignUp',
    components: {
        PageMask
    },
    data() {
        return {
            msg: 'Welcome to Your Vue.js PWA',
            email: '',
            password: ''
        }
    },
    methods: {
        SignUp() {
            console.log('email:', this.email)
            console.log('password:', this.password)
            firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
                .then((user) => {
                    console.log(user)
                })
                .catch((error) => {
                    console.log(error)
                })
        },
        prev() {
            this.$refs.PageMask.prev();
        },
        next() {
            this.$refs.PageMask.next();
        }
    }
}
</script>
