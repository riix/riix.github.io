$(function(){

    var setCookie = function($el, _value) { // 쿠키 굽기
        var _name = $el.data('name');
        $.cookie(_name, _value, { expires: 7 });
    };

    var getEngNum = function(_val) { //  영문자 숫자만 반환
        var _regex = /[^a-zA-Z0-9]/g;
        var _result = _val.split('//')[1];
        _result = _result.split('.');
        var last = _result.pop(), //  확장자 제거
            prev = _result.join();
        _result = prev.replace(_regex, "");
        return _result;
    };

    var appOpener = function(){

        var $document = $(document),
            $app = $('#app');
        var returnList = [];
        var sortIndex = [0, 1, 2, 3]; // 정렬 인덱스
        var timestamp = new Date().getTime();

        var getListHtml = function(_arr){ // 파일 목록 html 구하기
            var _result = '<ul class="uk-list uk-list-collapse uk-list-striped list-url">'
            for (var i = 0; i < _arr.length; i++) {
                _result += '<li><a href="' + _arr[i] + '?ts=' + timestamp + '" target="_blank">' + _arr[i] + '</a></li>';
            }
            _result += '</ul>';
            return _result;
        };

        var setHandler = function(){
            var onSubmit = function(e){
                returnList = [];
                var $module = $(e.target).closest('.module'),
                    $textarea = $module.find('textarea'),
                    $links = $module.find('.links'),
                    $preview = $module.find('.preview'),
                    _path = $textarea.data('path'),
                    _values = $textarea.val();

                var checkLinks = function($el, _arr){
                    var _html = '<ul class="uk-list uk-list-collapse uk-list-striped list-image">'
                    for (var i = 0; i < _arr.length; i++) {
                        _html += '<li><a href="' + _arr[i] + '?ts=' + timestamp + '" target="_blank"><img src="' + _arr[i] + '" alt="' + _arr[i] + '"/></a></li>';
                    }
                    _html += '</ul>';
                    $el.html(_html);
                    $el.imagesLoaded().done(function(){
                        $el.closest('.module').removeClass('error').addClass('success');
                    }).fail(function(){
                        $el.closest('.module').removeClass('success').addClass('error');
                    });
                };

                _values = _values.replace(/^\s/gm, ''); // 빈줄 제거
                _values = _values.replace(/\r\n$/g, ''); // 마지막 공백 제거
                setCookie($textarea, _values);
                _values = _values.split('\n');
                if (_values[0].length < 1) return false;
                for (var i = 0; i < _values.length; i++) {
                    var _this = _values[i];
                    if (_this.length > 0) {
                        _this = _path + _this.split('WebContent/')[1];
                        returnList.push(_this);
                    }
                }
                $links.html(getListHtml(returnList));
                checkLinks($preview, returnList);
            };
            var onReset = function(e){
                var $module = $(e.target).closest('.module'),
                    $textarea = $module.find('textarea'),
                    _name = $textarea.data('name');
                $textarea.val('');
                $.removeCookie(_name);
            };
            var onOpen = function(e){
                e.preventDefault();
                var $this = $(e.target);
                $this = ($this.is('a')) ? $this : $this.closest('a');
                var $textarea = $this.closest('.module').find('textarea');
                var _href = $this.attr('href'),
                    _width = ($textarea.data('mobile') === true) ? 720 : 1160,
                    _left = screen.width / 2 - (_width / 2),
                    _height = screen.height - 180;
                var _name = getEngNum(_href);
                window.open(_href, _name, 'width=' + _width + ', height=' + _height + ', scrollbars=yes, top=10, left=' + _left);
            };
            $document.on('click', '.submit', onSubmit);
            $document.on('click', '.reset', onReset);
            $document.on('click', 'a[target="_blank"]', onOpen);
        };

        var doSortale = function(){
            if (typeof UIkit !=='function') return false;
            var $sortable = $('.uk-sortable');
            var readSortable = function(){
                sortIndex = JSON.parse(localStorage.getItem('openerSort'));
                if (sortIndex === null) return false;
                var $module = $app.find('.module');
                var $sandbox = [];
                $.each(sortIndex, function(i, position) {
                    $sandbox.push($module.get(position));
                });
                $app.empty().append($sandbox);
            };
            var writeSortable = function(){
                var getIndex = function(){
                    var _arr = [];
                    var $module = $app.find('.module');
                    for (var i = 0; i < $module.length; i++) {
                        var $this = $module.eq(i);
                        _arr.push($this.data('idx') * 1);
                    }
                    return _arr;
                }
                sortIndex = getIndex();
                localStorage.setItem('openerSort', JSON.stringify(sortIndex));
            };
            readSortable();
            $document.on('moved', $sortable, writeSortable);
            UIkit.sortable($sortable);
        };

        var init = function(){
            var $textareas = $app.find('textarea');
            for (var i = 0; i < $textareas.length; i++) {
                var $this = $textareas.eq(i),
                    _name = $this.data('name'),
                    _value = $.cookie(_name);
                if (_value !== undefined) {
                    $this.val(_value);
                }
            }
            setHandler();
            doSortale();
        };

        init();

    };

    appOpener();
});
