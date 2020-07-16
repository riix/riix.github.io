<template>
    <div class="section-mask">
        <div class="action">
            <button @click="prev">up</button>
            <button @click="next">down</button>
        </div>
        <div ref="maskPrev" class="mask mask-prev" aria-hidden="true"></div>
        <div ref="maskNext" class="mask mask-next" aria-hidden="true"></div>
    </div>
</template>

<script>
export default {
    name: 'PageMask',
    methods: {
        prev() {
            console.log('prev');
            document.body.classList.add('anim-page-prev');
            this.$refs.maskPrev.addEventListener('animationend', function(){
                document.body.classList.remove('anim-page-prev');
            });
        },
        next() {
            console.log('next');
            document.body.classList.add('anim-page-next');
            this.$refs.maskNext.addEventListener('animationend', function(){
                document.body.classList.remove('anim-page-next');
            });
        }
    }
}
</script>

<style scoped lang="less">
.action {
    position: fixed;
    z-index: 2001;
    top: 0;
    left: 0;
    margin: 10px;
}
.mask {
    &, &::after {
        content: '';
        display: block;
        position: fixed;
        z-index: 2000;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #000;
        transform: translate(0, 100%);
    }
}
.anim-page-prev .mask {
    &, &::after {
        animation: animPagePrev .6s ease-in-out 0s forwards;
    }
}
.anim-page-next .mask {
    &, &::after {
        animation: animPageNext .6s ease-in-out 0s forwards;
    }
}
@keyframes animPagePrev {
    0% {
        transform: translate(0, 100%);
    }
    100% {
        transform: translate(0, -100%);
    }
}
@keyframes animPageNext {
    0% {
        transform: translate(0, -100%);
    }
    100% {
        transform: translate(0, 100%);
    }
}
</style>
