<template>
<div id="container" class="award">
    <div class="container">
        <div class="wrap">
            <h1>This is an vue.js award page</h1>
            <p>
                parameter : {{ param }}
            </p>
        </div>
    </div>
    <!-- <PageMask ref="PageMask" /> -->
</div>
</template>


<script>
import PageMask from '@/components/PageMask.vue'

export default {
    name: 'Award',
    components: {
        PageMask
    },
    computed: {
        param: function () {
            return this.$route.params;
        }
    },
    // lifecycle
    beforeCreate() { // 가장 먼저 실행되는 훅
        console.log('beforeCreate');
        this.$route.params.pageIdx = 3;
    },
    created() {
        this.$route.params.pageIdx = 3;
    },
    // watch: {
    //     '$route': 'prev'
    // },
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
