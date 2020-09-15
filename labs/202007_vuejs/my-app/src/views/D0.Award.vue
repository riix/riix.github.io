<template>
    <div id="content" class="award">
        <div class="container">
            <div class="wrap">
                <h1 data-splitting>This is an vue.js award page</h1>
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
    name: 'Award',
    data() {
        return { // vue component 에서는 무언가를 return 하는 함수를 넣어줘야함
            state: store.state, // global state
            pageIdx: 3, // 페이지 인덱스
            // local
            username: 'user-guest',
            value: 10,
            show: false,
            message: {
                hello: 'Hello World',
                iam: 'I am Richard'
            }
        };
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
        prev() {
            this.$refs.PageMask.prev();
        },
        next() {
            this.$refs.PageMask.next();
        }
    }
}
</script>
