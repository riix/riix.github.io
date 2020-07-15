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
    <PageMask ref="PageMask" />
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
        param: function () {
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
    created() {
        this.$route.params.pageIdx = 1; // https://mkki.github.io/vue.js/2018/06/12/start-vuejs-12.html
    }
}
</script>
