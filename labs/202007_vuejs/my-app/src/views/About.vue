<template>
<div id="container" class="about" :class="username">
    <div class="container">
        <div class="wrap">
            <h1>This is an about page</h1>
            <div class="page-index">
                지난 페이지 인덱스: {{ state.pageIdx.previous }}<br />
                현재 페이지 인덱스: {{ state.pageIdx.current }}<br />
                방향: {{ pageDirection }}
            </div>
            <p>
                parameter : {{ param }}
            </p>
            <p>
                {{ message.hello }}
            </p>
            <p class="toggle" :class="{ in: show }">
                {{ message.iam }}
            </p>
            <button v-on:click="toggle"> 클릭! </button>
            <div>
                {{ value }}
            </div>
            <div>
                {{ doubleValue }}
            </div>
            <button v-on:click="plus"> 클릭! </button>
        </div>
    </div>
    <!-- <PageMask ref="PageMask" /> -->
</div>
</template>
<script>
import Vue from 'vue'
import store from '@/store'

export default {
    name: 'About',
    pageIdx: 1,
    data() {
        return { // vue component 에서는 무언가를 return 하는 함수를 넣어줘야함
            state: store.state,
            username: 'user-guest',
            value: 10,
            show: false,
            message: {
                hello: 'Hello World',
                iam: 'I am Richard'
            }
        };
    },
    methods: { // method들을 정의
        toggle: function() {
            this.show = !this.show;
        },
        plus: function() {
            this.value++
        }
    },
    computed: { // computed에서 사용하고 있는 data에 변화가 있으면 자동으로 계산되는 함수들의 모음
        doubleValue: function() {
            return this.value * 2
        },
        param: function () {
            return this.$route.params;
        },
        pageDirection: function(){
            return 'next';
        }
    },
    // lifecycle
    beforeCreate() { // 가장 먼저 실행되는 훅
        console.log('beforeCreate');
    },
    created() { // data와 events가 활성화
        console.log('created');
        console.log(this.$route.params);
    },
    mounted(){
        // Dom 삽입 후
        console.log('mounted');
    },
}
</script>
