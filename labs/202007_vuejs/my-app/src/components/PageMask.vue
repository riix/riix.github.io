<template>
    <div class="section-mask">
        <div class="action">
            <button @click="prev">up</button>
            <button @click="next">down</button>
        </div>
        <div class="mask mask-prev" aria-hidden="true">
            <div class="before"></div>
            <div class="after" ref="maskPrev"></div>
        </div>
        <div class="mask mask-next" aria-hidden="true">
            <div class="before"></div>
            <div class="after" ref="maskNext"></div>
        </div>
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
                _classList.remove(_class);
            }, 700);
            if (typeof _el !== 'object') return false;
            _el.addEventListener('animationend', function(){
                clearTimeout(this.timer);
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
@zIndex: 2000;
@animDuration: 600ms;
@animEasing: cubic-bezier(0.11, 0, 0.5, 0);
.action {
    position: fixed;
    z-index: 2001;
    top: 0;
    left: 0;
    margin: 10px;
}
.mask {
    .before, .after {
        content: '';
        display: block;
        position: fixed;
        z-index: @zIndex;
        top: 0;
        left: 0;
        right: 0;
        height: 150%;
        height: 150vh;
        background-color: #41B883;
        transform: translate(0, 100%);
    }
    .after {
        z-index: @zIndex - 1;
        background-color: #35495E;
    }
}
.anim-page-prev .mask {
    .before, .after {
        animation: animPagePrev @animDuration @animEasing 0s forwards;
    }
    .after {
        animation-duration: @animDuration + 50ms;
        animation-delay: 50ms;
    }
}
.anim-page-next .mask {
    .before, .after {
        animation: animPageNext @animDuration @animEasing 0s forwards;
    }
    .after {
        animation-duration: @animDuration + 50ms;
        animation-delay: 50ms;
    }
}
@keyframes animPagePrev {
    0% {
        transform: translate(0, 75%);
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
