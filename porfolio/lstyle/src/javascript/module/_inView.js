(function($) {

    'use strict';

    var MODULE = {
        name: 'inView',
        title: 'inView Reveal 탐지',
        desc: '윈도우 객체와 비교하여 스크롤 이벤트에 반응할 수 있음, 다양한 옵션 제공',
        version: '1.0'
    };

    var _defaults = { // defauls
        sceneMode: false, // containerSceneMode, isDark 등을 탐지
        onlyToggle: true, // 반대 상태에서만 반응 (퍼포먼스 향상)
        trigger: false, // set jquery event trigger
        triggerIn: 'in',
        triggerOut: 'out',
        scrollUp: {
            top: 0.2,
            bottom: 0
        },
        scrollDown: {
            top: 0,
            bottom: 0.2
        },
        onEnter: function(base) {
            // console.info(base);
            // console.log('onEnter', base.idx);
        },
        onExit: function(base) {
            // console.log('onExit', base.idx);
        },
        onCurrentEnter: function(base) {
            // console.log('current', base.currentIdx);
        }
    };

    MODULE.defaults = _defaults; // set default

    // window.module = (typeof window.module !== 'undefined') ? window.module : []; // global 변수에 저장
    // window.module.push(MODULE);

    var $window = $window || $(window),
        $document = $document || $(document),
        $html = $html || $('html'),
        $body = $body || $('body');

    var common = {
        addHandler: function(element, type, handler) {
            if (element.addEventListener) {
                element.addEventListener(type, handler, false);
            } else if (element.attachEvent) {
                element.attachEvent("on" + type, handler);
            } else {
                element["on" + type] = handler;
            }
        },
        removeHandler: function(element, type, handler) {
            if (element.removeEventListener) {
                element.removeEventListener(type, handler, false);
            } else if (element.detachEvent) {
                element.detachEvent("on" + type, handler);
            } else {
                element["on" + type] = handler;
            }
        },
        callFunc: function(_func, _obj, _param) { // callback 함수 호출하기
            _func = (typeof _func == 'string') ? window[_func] : _func;
            _param = (_param === null) ? '' : _param;
            if (_func && typeof _func == 'function') {
                _func.call(null, _obj, _param);
            } else {
                console.log('no exist function');
            }
        },
        isInview: function(_el, _options) {
            var _setting = $.extend({
                top: 0, // 상단 마진, 윈도우 크기에서 몇 퍼센트 (0.25);
                bottom: 0 // 하단 마진, 윈도우 크기에서 몇 퍼센트 (0.25);
            }, _options);
            var _getPercent = function(_int, _percent) { // 퍼센트 처리, _getPercent(100, 0.5);
                var _result = Math.floor(_int * _percent);
                return _result;
            };
            var $el = _el,
                $window = $window || $(window),
                _windowHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight, // 윈도우 크기
                _scrollTop = document.documentElement.scrollTop || document.body.scrollTop, // 스크롤 탑
                _scrollBottom = _scrollTop + _windowHeight,
                _elOffset = $el.offset(),
                _elementTop = _elOffset.top, // 객체 상단 위치
                _elementBottom = _elOffset.top + $el.height(), // 객체 하단 위치
                _marginTop = _getPercent(_windowHeight, _setting.top), // 상단 여백 구하기
                _marginBottom = _getPercent(_windowHeight, _setting.bottom), // 하단 여백 구하기
                _isInviewElementTop = ((_scrollBottom - _marginBottom) >= _elementTop), // 스크롤 하단에 객체 상단이 들어왔는지
                _isInviewElementBottom = ((_scrollTop + _marginTop) <= _elementBottom), // 스크롤 상단에 객체 하단이 벗어나지 않았는지
                _result = (_isInviewElementTop === true && _isInviewElementBottom === true) ? true : false;
            return _result;
        }
    };

    var InView = function(_selector, _options) { // inview plugin

        var _opts = $.extend({}, _defaults, _options);
        var base = {
            idx: 0,
            itemLength: 0, // 전체 아이템 갯수
            inviewItemLength: 0, // 전체 보여지는 아이템 갯수
            current: $(null),
            currentIdx: 0,
            scrollTop: 0,
            dir: 'down'
        };
        var $items = null,
            $stickyUpper = null, // sticky trigger, 옵션
            $stickyMiddle = null,
            $stickyDowner = null;
        var _sceneMode = _opts.sceneMode, // sceneMode
            _lastScroll = 0; // 방향 탐지에 사용

        var util = {
            toggleInviewEl: function(_el, _bool) { // toggle inview element
                if (_opts.onlyToggle === true && _el.hasClass('is-inview') === _bool) return false; // 반대 상태에서만 실행
                var _func = (_bool === true) ? _opts.onEnter : _opts.onExit;
                _el.toggleClass('is-inview', _bool);
                if (_bool === true) {
                    _el.addClass('is-inviewed');
                }
                util.toggleTrigger(_el, _bool);
                common.callFunc(_func, base);
            },
            getCurrentInviewEl: function(_el, _current, _val, _currentIdx) { // get current inview element
                var _result = _el;
                if (common.isInview(_current, _val) === true) { // is inview
                    _result = _current;
                    base.currentIdx = (_currentIdx !== undefined) ? _currentIdx : base.currentIdx; // set current idx
                }
                return _result;
            },
            setCurrent: function(_el, _idx) { // set sticky trigger
                base.current = util.getCurrentInviewEl(base.current, _el, { top: 0.3, bottom: 0.3 }, _idx);
            },
            setStickyTrigger: function(_el, _idx) { // set sticky trigger
                if (_sceneMode !== true) return false;
                $stickyUpper = util.getCurrentInviewEl($stickyUpper, _el, { top: 0, bottom: 0.9 });
                $stickyMiddle = util.getCurrentInviewEl($stickyMiddle, _el, { top: 0.5, bottom: 0.5 });
                $stickyDowner = util.getCurrentInviewEl($stickyDowner, _el, { top: 0.9, bottom: 0 });
            },
            doCurrent: function(_el) { // set sticky trigger
                if (!base.current.length) return false;
                if (_sceneMode === true) { // sceneMode 일 경우
                    base.current.addClass('is-inview-current').siblings().removeClass('is-inview-current');
                    base.elementId = base.current.attr('id'); // element id
                }
                common.callFunc(_opts.onCurrentEnter, base);
            },
            doStickyTrigger: function() { // do sticky trigger
                if (_sceneMode !== true) return false;
                var _do = function(_el, _from, _to) {
                    if (_el === null || !_el.length) return false;
                    $html.toggleClass(_to, _el.hasClass('is-dark'));
                };
                _do($stickyUpper, 'is-dark', 'is-dark-upper');
                _do($stickyMiddle, 'is-dark', 'is-dark-middle');
                _do($stickyDowner, 'is-dark', 'is-dark-downer');
            },
            toggleTrigger: function(_el, _bool) { // trigger
                if (_opts.trigger !== true && _opts.trigger !== 'true') return false;
                var _func = (_bool === true) ? _opts.triggerIn : _opts.triggerOut,
                    _hasClass = _el.hasClass('is-inview');
                if (_bool === _hasClass){
                    _el.trigger(_func);
                }
            }
        };

        var _refresh = function() { // reset
            _lastScroll = 0;
            $items = $(_selector);
            base.el = $(null);
            base.current = $(null);
            base.itemLength = $items.length;
            $html.addClass('init-inview');
            _doScroll();
        };

        var _doScroll = function() { // doScroll

            base.inviewItemLength = 0;
            base.scrollTop = $window.scrollTop(); // 방향 탐지
            base.dir = (base.scrollTop >= _lastScroll) ? 'down' : 'up';
            _lastScroll = base.scrollTop;

            var _core = function(_dir) { // 메인

                var i = 0,
                    _optsStandard = (_dir == 'up') ? _opts.scrollUp : _opts.scrollDown; // inview 기준치

                var _loopItems = function(_idx) {

                    var $this = $items.eq(_idx),
                        _boolInview = (common.isInview($this, _optsStandard) === true);

                    base.el = $this; // set global var.
                    base.idx = _idx;

                    // toggle inview element
                    // 기준치 내에 들어가는/벗어나는 모든 아이템 실행
                    util.toggleInviewEl($this, _boolInview);

                    // 기준치 내에 들어가는 해당 아이템 기준으로 실행
                    util.setCurrent($this, _idx); // set current
                    util.setStickyTrigger($this, _idx); // set sticky trigger

                };

                for (i = 0; i < base.itemLength; i++) { // up, down 에 따라 순차, 역순차 탐지
                    var _idx = (_dir == 'up') ? (base.itemLength - 1) - i : i;
                    _loopItems(_idx);
                }

                util.doCurrent(); // do current
                util.doStickyTrigger(); // do sticky trigger

            };

            _core(base.dir); // onScroll

        };

        var _init = (function() {

            common.addHandler(window, 'resize', _doScroll);
            common.addHandler(document, 'scroll', _doScroll);
            common.addHandler(document, 'touchmove', _doScroll);

            $window.on('load init', function() {
                _doScroll();
            });

        })();

        return {
            refresh: _refresh
        }

    };

    window.InView = InView;

})(window.jQuery);

$(function() {

    // $.inView('.js-inview');
    // $.inView('.js-inview-trigger', {
    //     trigger: true,
    //     scrollUp: {
    //         top: 0,
    //         bottom: 0
    //     },
    //     scrollDown: {
    //         top: 0,
    //         bottom: 0
    //     }
    // });
    //
    // $.inView('.container', {
    //     sceneMode: true, // isDark 등을 탐지 stickyTriggerMode
    //     scrollUp: {
    //         top: 0,
    //         bottom: 0
    //     },
    //     scrollDown: {
    //         top: 0,
    //         bottom: 0
    //     }
    // });

});
