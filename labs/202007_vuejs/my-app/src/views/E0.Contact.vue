<template>
    <div id="content" class="contact">
        <div class="container">
            <div class="wrap">
                <h1 data-splitting>This is an contact page</h1>
                <p>
                    parameter : {{ param }}
                </p>
            </div>
        </div>
    </div>
</template>
<script>
import store from '@/store.js'

export default {
    name: 'Contact',
    data() {
        return { // vue component 에서는 무언가를 return 하는 함수를 넣어줘야함
            state: store.state, // global state
            pageIdx: 4, // 페이지 인덱스
        };
    },
    computed: {
        param: function() {
            return this.$route.params;
        },
        username() {
            return this.$route.params.username
        }
    },
    mounted(){
        this.$init(); // init
    },
}
</script>
