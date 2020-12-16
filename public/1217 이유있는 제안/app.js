'use strict';

String.prototype.replaceAll = function(org, dest) { // String Prototpe 매서드 추가
    return this.split(org).join(dest);
};

$(function(){

    'use strict';

    var $document = $(document),
        $body = $('body');

    var CSS = {
        code: {
            'position': 'fixed',
            'bottom': '0',
            'right': '0',
            'padding': '10px',
            'width': '300px',
            'opacity': '.5',
            'transition': 'all .2s ease-in-out 0s'
        },
        codeOver: {
            'width': '500px',
            'opacity': '1'
        },
        textarea: {
            'width': '100%',
            'height': '150px',
            'font-size': '16px'
        }
    };

    var initCode = function(_el, _options){

        var settings = {
            wrap: true,
            imgReplace: '/event/images/'
        };

        var opts = $.extend({}, settings, _options);

        var $app = $(_el);

        var $codes = $('<div class="codes pos-fixed"><textarea row="5"></textarea></div>'),
            $textarea = $codes.children(),
            _className = $app.attr('class'),
            _html = $app.html();

        // replaceAll
        _html = _html.replaceAll('./images/', opts.imgReplace);

        if (opts.wrap === true) { // wrap
            _html = '<div class="' + _className + '">' + _html + '</div>'; // wrap
        }

        $body.append($codes);
        $codes.css(CSS.code).on('mouseover.hover', function(){
            $codes.css(CSS.codeOver);
        });
        $document.on('click', function(e){
            if ($(e.target).closest('.codes').length) return false;
            $codes.css({
                'width': '300px',
                'opacity': '1'
            });
        });
        $textarea.val(_html).css(CSS.textarea).on('click', function(e){ // copy
            $textarea.select();
        });
        // console.log(_html);
    };

    // 이벤트
    if ($('.event__iframe__wrap').length) {
        initCode('.event__iframe__wrap');
    }

    // 헬로라운지
    if ($('.content-section .image-area').length) { // 모바일
        initCode('.content-section .image-area', {
            wrap: false,
            imgReplace: '/front/mobile/images/hellolounge/'
        });
    } else if ($('.lounge-cont').length) { // pc
        initCode('.lounge-cont', {
            wrap: false,
            imgReplace: '/front/web/images/hellolounge/'
        });
    };

    // 이유있는제안
    if ($('.is-reason-offer-pc').length) {
        initCode('.suggest--new-wrap', {
            wrap: true,
            imgReplace: '/front/web/images/open/'
        });
    } else if ($('.is-reason-offer-mobile').length){
        initCode('.suggest--new-wrap', {
            wrap: true,
            imgReplace: '/front/mobile/images/open/'
        });
    }

});
