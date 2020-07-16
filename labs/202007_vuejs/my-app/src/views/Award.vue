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
    created() {
        this.$route.params.pageIdx = 1; // https://mkki.github.io/vue.js/2018/06/12/start-vuejs-12.html
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
