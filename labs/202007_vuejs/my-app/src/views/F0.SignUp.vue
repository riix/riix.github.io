<template>
    <div id="content" class="hello">
        <div class="container">
            <div class="wrap">
                <p>
                    parameter : {{ param }}
                </p>
                <h4>아이디</h4>
                <input type="text" v-model="email"></input>
                <h4>패스워드</h4>
                <input type="password" v-model="password"></input>
                <div>
                    <button v-on:click="SignUp()">가입하기</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import store from '@/store.js'
import firebase from 'firebase'

export default {
    name: 'SignUp',
    data() {
        return { // vue component 에서는 무언가를 return 하는 함수를 넣어줘야함
            state: store.state, // global state
            pageIdx: 5, // 페이지 인덱스
            // local
            msg: 'Welcome to Your Vue.js PWA',
            email: '',
            password: ''
        }
    },
    computed: {
        param: function () {
            return this.$route.params;
        }
    },
    mounted(){
        this.$init(); // init
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
        }
    }
}
</script>
