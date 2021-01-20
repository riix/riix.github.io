// https://www.freesoundslibrary.com/
var MP3 = {
    keydown: './mp3/keydown.mp3',
    fail: './mp3/ding.mp3',
    success: './mp3/dingdong.mp3'
};

$(function() {

    'use strict';

    var $html = $('html');

    function getRandomInArray(_arr) {
        var _result = ['blue', 'red', 'green', 'orange', 'pink'];
        _result = (typeof _arr === 'object') ? _arr : _result;
        _result = _result[Math.floor(Math.random() * _result.length)];
        return _result;
    };

    function isMobile(){
        return (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
    };

    var initTypingGame = function(){

        var $form = $('#form'),
            $submit = $('#submit'),
            $question = $('#question'),
            $answer = $('#answer'),
            $result = $('#result');

        var $anim = $('#anim .module'),
            $animSuccess = $anim.eq(0),
            $animFail = $anim.eq(1);

        var arrQuestion = null,
            sound = null,
            question = '',
            answer = '';

        var boolMobile = isMobile();

        $html.addClass((boolMobile === true) ? 'is-mobile' : 'is-classic');

        var playSound = function(_case) {
            switch (_case) {
                case 'success':
                    sound = new Audio(MP3.success);
                    break;
                case 'fail':
                    sound = new Audio(MP3.fail);
                    break;
                default:
                    if (boolMobile !== true) { // 모바일 일땐 생략
                        sound = new Audio(MP3.keydown);
                    }
            }
            sound.play();
        };

        var reset = function() {
            question = getRandomInArray(arrQuestion);
            $question.val(question);
            $answer.val('').focus();
        };

        var removeAnim = function(){
            setTimeout(function(){
                $anim.removeClass('in');
            }, 1000);
        };

        var onComplete = {
            common: function(){
                $anim.removeClass('in');
                $result.removeClass('uk-form-danger uk-form-danger');
                var _dataIdx = $animSuccess.parent().attr('data-idx') * 1;
                _dataIdx = _dataIdx + 1;
                if (_dataIdx >= 2) _dataIdx = 0;
                $animSuccess.parent().attr('data-idx', _dataIdx);
                removeAnim();
            },
            success: function(){
                this.common();
                console.log('success');
                $animSuccess.addClass('in');
                $result.addClass('uk-form-success');
                $result.val('O 정답:' + question + ' / ' + answer).addClass('correct').removeClass('incorrect');
                playSound('success');
            },
            fail: function(){
                this.common();
                console.log('fail');
                $animFail.addClass('in');
                $result.addClass('uk-form-danger');
                $result.val('X 오답:' + question + ' / ' + answer).addClass('incorrect').removeClass('correct');
                playSound('fail');
            }
        };

        var onSubmit = function() {
            answer = $answer.val();
            if (question == answer) {
                onComplete.success();
            } else {
                onComplete.fail();
            }
            reset();
        };

        var setHandler = function(){
            $answer.on('keydown', function(e) {
                playSound();
            });
            $form.on('submit', function(e) {
                e.preventDefault();
                onSubmit();
                return false;
            });
        };

        var init = function(){
            $.getJSON('./js/data.json', function(data) {
                arrQuestion = data.words;
                setHandler();
                reset();
            });
        };

        init();

    };

    initTypingGame();

});
