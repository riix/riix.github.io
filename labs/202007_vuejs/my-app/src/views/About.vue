<template>
  <div class="about" :class="username">
    <h1>This is an about page</h1>
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
</template>
<script>
export default {
    name: 'About',
    data(){
        return {  // vue component 에서는 무언가를 return 하는 함수를 넣어줘야함
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
        toggle: function(){
            this.show = !this.show;
            console.log('toggle', this.show);
        },
        plus: function() {
          this.value ++
        }
    },
    computed: { // computed에서 사용하고 있는 data에 변화가 있으면 자동으로 계산되는 함수들의 모음
        doubleValue: function() {
            return this.value * 2
        }
    },
    created (){
        console.log('created about.vue');
    }
}
</script>
