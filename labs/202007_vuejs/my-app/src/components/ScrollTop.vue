<template>
    <div id="scrollTop" :class="[ isShow ? activeClass : '' ]">
        <a href="#app" v-smooth-scroll="{ duration: 300, offset: -50 }"><span><em class="sr-only">페이지 위로</em></span></a>
    </div>
</template>

<script>
export default {
    name: 'Scrolltop',
    data: function() { // vue component 에서는 무언가를 return 하는 함수를 넣어줘야함
        return {
            activeClass: 'in',
            bodyClass: 'is-scroll-downed',
            previous: null,
            isShow: false,
            ticky: false,
            windowScrollY: 0,
            windowHeight: 0
        };
    },
    mounted() {
        this.windowHeight = window.outerHeight || window.innerHeight;
        this.onWindowScroll();
    },
    methods: {
        toggleClassBody() {
            if (this.isShow === true) {
                document.body.classList.add(this.bodyClass);
            } else {
                document.body.classList.remove(this.bodyClass);
            }
        },
        toggleClass (){
            var _boolMore = this.windowScrollY >= 50,
                _boolLonger = (this.$root.$el.clientHeight > this.windowHeight),
                _bool = (_boolLonger && _boolMore);
            this.isShow = _bool;
            if (this.previous !== this.isShow) {
                this.previous = this.isShow;
                this.toggleClassBody(); // toggle
            }
        },
        onWindowScroll (){
            var _this = this;
            window.addEventListener('scroll', function(e) {
                _this.windowScrollY = window.scrollY;
                if (!_this.ticky) {
                    window.requestAnimationFrame(function() {
                        _this.toggleClass(); // callback
                        _this.ticky = false;
                    });
                    _this.ticky = true;
                }
            });
        }
    }
}
</script>
<style lang="less">
#scrollTop {
    visibility: hidden;
    position: fixed;
    z-index: -1;
    right: 0;
    bottom: 0;
    margin: 20px;
    opacity: 0;
    transition: visibility 0s ease-in-out .3s,
                z-index 0s ease-in-out .3s,
                opacity .3s ease-in-out 0s;
    &.in {
        visibility: visible;
        z-index: 4000;
        opacity: 1;
        transition: visibility 0s ease-in-out 0s,
                    z-index 0s ease-in-out 0s,
                    opacity .3s ease-in-out 0s;
    }
    a {
        display: inline-block;
    }
    span {
        display: inline-block;
        background: #000;
        overflow: hidden;
        width: 30px;
        height: 30px;
        color: #fff;
    }
}
</style>
