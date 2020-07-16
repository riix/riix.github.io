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
import EventBus from '@/eventBus.js';

export default {
    name: 'PageMask',
    data() {
        return {
            timer: null
        }
    },
    created() {
        var _this = this;
        EventBus.$on('pageMaskPrev', function(){
            _this.prev();
        });
        EventBus.$on('pageMaskNext', function(){
            _this.next();
        })
    },
    methods: {
        trigger(_el, _class) {
            clearTimeout(this.timer);
            var _classList = document.body.classList;
            _classList.add('anim-page');
            _classList.add(_class);
            this.timer = setTimeout(function(){
                _classList.remove('anim-page');
            }, 1000);
            _el.addEventListener('animationend', function(){
                _classList.remove(_class);
            }, {
                once: true
            });
        },
        prev() {
            var _el = this.$refs.maskPrev,
                _class = 'anim-page-prev';
            this.trigger(_el, _class);
        },
        next() {
            var _el = this.$refs.maskNext,
                _class = 'anim-page-next';
            this.trigger(_el, _class);
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
        height: 200%;
        height: 200vh;
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
