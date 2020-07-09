<template>
  <div class="award">
    <h1>This is an award page</h1>
  </div>
</template>
<script>
export default {
    name: 'Award',
    computed: {
        username() {
            return this.$route.params.username
        }
    }
}
</script>
