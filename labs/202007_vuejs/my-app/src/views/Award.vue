<template>
<div id="container" class="award">
    <div class="container">
        <div class="wrap">
            <h1>This is an vue.js award page</h1>
        </div>
        <div class="action">
            <button v-on:click="prev">up</button>
            <button v-on:click="next">down</button>
        </div>
    </div>
    <PageMask ref="PageMask" />
</div>
</template>


<script>
import PageMask from '@/components/PageMask.vue'

export default {
    name: 'Award',
    components: {
        PageMask
    },
    created (){
        console.log('created');
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
