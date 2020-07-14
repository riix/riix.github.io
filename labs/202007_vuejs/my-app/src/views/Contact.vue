<template>
<div id="container" class="contact">
    <div class="container">
        <div class="wrap">
            <h1>This is an contact page</h1>
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
    }
}
</script>
