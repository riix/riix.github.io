$(function() {

    'use strict';

    var $window = $window || $(window),
        $document = $document || $(document),
        $html = $html || $('html'),
        $body = $body || $('body');

    var $container = $('#container');

    var _html = '<div class="md-overlay"></div><div class="md-indicator"><span></span><span></span><span></span><span></span></div>';
    $html.append(_html);

    var myParallax = null;
    var myInView = null;
    var smoothState = null;

    var modules = {
        off: function(){

            console.log('module off');

            // if (myParallax !== null) {
            //     myParallax.destroy();
            //     myParallax = null;
            // }

        },
        on: function(){

            console.log('module on');

            var _inViewEl = document.getElementsByClassName('container');

            if (myInView === null) {
                myInView = new InView2('.container',{
                    sceneMode: true, // isDark 등을 탐지 stickyTriggerMode
                    scrollUp: {
                        top: 0,
                        bottom: 0
                    },
                    scrollDown: {
                        top: 0,
                        bottom: 0
                    }
                });
            } else {
                myInView.refresh();
            }

            // $.inView('.js-inview');

            // $('.js-color-mask').colorMask();


            var _parallexEl = document.getElementsByClassName('js-parallax-el');

            if (_parallexEl.length) {
                if (myParallax === null) {
                    myParallax = new Rellax('.js-parallax-el', {
                        speed: -2,
                        center: true,
                        round: true,
                        vertical: true,
                        horizontal: false
                    });
                } else {
                    myParallax.refresh();
                }
            }

        }
    };

    var page = {
        visual: function(){
            if (typeof swiperVisualA == 'object') swiperVisualA.destroy();
            if (typeof swiperVisualB == 'object') swiperVisualB.destroy();
            var swiperVisualA = null,
                swiperVisualB = null;
            swiperVisualA = new Swiper('.js-visual-a', {
                allowTouchMove: true,
                autoplay: {
                    delay: 5000
                },
                speed: 1200,
                pagination: {
                  el: '.js-visual-a-paging',
                  type: 'bullets',
                  clickable: true
                }
            });
            swiperVisualB = new Swiper('.js-visual-b', {
                allowTouchMove: true,
                speed: 1200
            });
            swiperVisualA.controller.control = swiperVisualB;
            swiperVisualB.controller.control = swiperVisualA;
        },
        tilt: function(){
            $('.section-tilt .pic-wrap').tilt({
                selector: '.obj'
            });
            $('.section-tilt .pic-wrap').css('overflow', 'visible');
        },
        home: function(){ // home

            this.visual();

            var swiperC = new Swiper('.js-swiper-home-c', {
                speed: 400,
                autoplay: {
                  delay: 5000
                }
            });
            $document.on('click', '.js-swiper-home-c-prev', function(){
                swiperC.slidePrev();
            });
            $document.on('click', '.js-swiper-home-c-next', function(){
                swiperC.slideNext();
            });

        },
        brand: function(){
            this.visual();
        },
        onBefore: function(){

        },
        onStart: function(){

        },
        onReady: function(){

            modules.off();
            modules.on();

            var _class = $('#wrapper').attr('class').replace('page-','');
            console.log(_class);

            switch (_class) {
                case 'home':
                    this.home();
                    break;
                case 'brand':
                    this.brand();
                    break;
                default:
            }

        }
    };

    var isLocated = false;

    var restartCSSAnim = function(){
        if (smoothState === null) return false;
        smoothState.restartCSSAnimations(); // Restart your animation
    };

    var mount = {
        set: function(){
            var _options = {
                debug: true,
                prefetch: false,
                anchors: 'a',
                blacklist: '.no-ajax, a[href*=".jpg"], a[href*=".png"], a[href*=".jpeg"], a[href*=".pdf"]',
                scroll: true,
                cacheLength: 0,
                onBefore: function($currentTarget, $container) {
                    mount.onBefore($currentTarget, $container);
                },
                onStart: {
                    duration: 1200, // Duration of our animation
                    render: function($container) {
                        // console.log('start');
                        mount.onStart($container);
                    }
                },
                onProgress: {
                    duration: 0,
                    render: function($container) {
                        // console.log('progress');
                        mount.onProgress($container);
                    }
                },
                onReady: {
                    duration: 10,
                    render: function($container, $newContent) {
                        mount.onReady($container, $newContent);
                    }
                },
                onAfter: function(container, $newContent) {
                    // console.log('onAfter');
                    mount.onAfter($container, $newContent);
                },
            };

            smoothState = $container.smoothState(_options).data('smoothState');

        },
        onBefore: function($currentTarget, $container){
            $html.addClass('is-indicator');
            $container.addClass('is-exiting'); // Add your CSS animation reversing class
            restartCSSAnim();
            page.onBefore();
        },
        onStart: function($container, $newContent){
            $html.removeClass('is-indicator');
            restartCSSAnim();
            page.onStart();
        },
        onProgress: function($container){

        },
        onReady: function($container, $newContent){
            if ($newContent !== undefined) {
                $container.html($newContent); // Inject the new content
                $('html, body').animate({
                    'scrollTop': 0
                }, 0);
            }
            $container.removeClass('is-exiting'); // Remove your CSS animation reversing class
            restartCSSAnim();
            setTimeout(function(){
                page.onReady();
            }, 10);
        },
        onAfter: function($container, $newContent){

        },
        init: function(){ // 최초 접근 시
            this.onStart();
            setTimeout(function(){
                mount.set();
                mount.onReady($container);
            }, 1200);
        },
    };

    mount.init();

});
