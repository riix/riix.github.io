<template>
<div id="container" class="contact">
    <div class="container">
        <div class="wrap">
            <h1>This is an contact page</h1>
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
    name: 'Contact',
    components: {
        PageMask
    },
    computed: {
        param: function() {
            return this.$route.params;
        },
        username() {
            return this.$route.params.username
        }
    },
    methods: {
        prev() {
            this.$refs.PageMask.prev();
        },
        next() {
            this.$refs.PageMask.next();
        }
    },
    // lifecycle
    beforeCreate() { // 가장 먼저 실행되는 훅
        console.log('beforeCreate');
        this.$route.params.pageIdx = 4;
    },
    created() {
        this.$route.params.pageIdx = 4;
    }
}
</script>
