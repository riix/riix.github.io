$(function() {

    'use strict';

    var $document = $(document);

    var getEngNum = function(_val) { //  영문자 숫자만 반환
        var _regex = /[^a-zA-Z0-9]/g;
        var _result = _val.split('//')[1];
        _result = _result.split('.');
        var last = _result.pop(), //  확장자 제거
            prev = _result.join();
        _result = prev.replace(_regex, "");
        return _result;
    };

    var appOpener = function() {

        var $document = $document || $(document),
            $app = $('#app');

        var $switcher = $('#switcher');
        var mySwitcher = UIkit.switcher($switcher).show(0);
        var timerSwitcher = null;
        var tabIdx = 0;

        var returnList = [];
        var objIsImage = {
            sortIndex: [0, 1, 2, 3, 4, 5, 6, 7], // 정렬 인덱스
            targets: [{
                    name: '개발 PC',
                    url: 'http://stg.lghellovision.net/',
                    theme: 'uk-card-primary'
                },
                {
                    name: '상용 PC',
                    url: 'http://lghellovision.net/',
                    theme: 'uk-card-secondary'
                },
                {
                    name: '상용 PC 163:8098',
                    url: 'http://10.10.41.163:898/',
                    theme: 'uk-card-default'
                },
                {
                    name: '상용 PC 163:899',
                    url: 'http://10.10.41.163:899/',
                    theme: 'uk-card-default'
                },
                {
                    name: '상용 PC 164:898',
                    url: 'http://10.10.41.164:898/',
                    theme: 'uk-card-default'
                },
                {
                    name: '상용 PC 164:899',
                    url: 'http://10.10.41.164:899/',
                    theme: 'uk-card-default'
                },
                {
                    name: '개발 모바일',
                    url: 'http://mstg.lghellovision.net/',
                    theme: 'uk-card-primary'
                },
                {
                    name: '상용 모바일',
                    url: 'http://m.lghellovision.net/',
                    theme: 'uk-card-secondary'
                }
            ],
            pages: [{
                name: '1',
                pcHtml: '',
                mobileHtml: ''
            }, {
                name: '2',
                pcHtml: '',
                mobileHtml: ''
            }]
        };
        var timestamp = new Date().getTime();

        var getListHtml = function(_arr) { // 파일 목록 html 구하기
            var _result = '<ul class="uk-list uk-list-collapse uk-list-striped list-url">'
            for (var i = 0; i < _arr.length; i++) {
                _result += '<li><a href="' + _arr[i] + '?ts=' + timestamp + '" target="_blank">' + _arr[i] + '</a></li>';
            }
            _result += '</ul>';
            return _result;
        };

        var setHandler2 = function() {

            var onSubmit = function(e) {
                returnList = [];
                var $module = $(e.target).closest('.module'),
                    $textarea = $module.find('textarea'),
                    $links = $module.find('.links'),
                    $preview = $module.find('.preview'),
                    _path = $textarea.data('path'),
                    _values = $textarea.val();

                var checkLinks = function($el, _arr) {
                    var _html = '<ul class="uk-list uk-list-collapse uk-list-striped list-image">'
                    for (var i = 0; i < _arr.length; i++) {
                        _html += '<li><a href="' + _arr[i] + '?ts=' + timestamp + '" target="_blank"><img src="' + _arr[i] + '" alt="' + _arr[i] + '"/></a></li>';
                    }
                    _html += '</ul>';
                    $el.html(_html);
                    $el.imagesLoaded().done(function() {
                        $el.closest('.module').removeClass('error').addClass('success');
                    }).fail(function() {
                        $el.closest('.module').removeClass('success').addClass('error');
                    });
                };

                _values = _values.replace(/^\s/gm, ''); // 빈줄 제거
                _values = _values.replace(/\r\n$/g, ''); // 마지막 공백 제거

                // setCookie($textarea, _values);

                _values = _values.split('\n');
                if (_values[0].length < 1) return false;
                for (var i = 0; i < _values.length; i++) {
                    var _this = _values[i];
                    if (_this.length > 0) {
                        _this = _path + _this.split('WebContent/')[1];

                        // 이벤트
                        if (_this.match('front/mobile/event/')) _this = _this.replace('front/mobile/event/', 'event/');

                        // 이유있는 제안
                        if (_this.match('front/web/open/')) _this = _this.replace('front/web/open/', 'front/web/open/');
                        if (_this.match('front/mobile/open/')) _this = _this.replace('front/mobile/open/', 'front/mobile/open/');

                        returnList.push(_this);
                    }
                }
                $links.html(getListHtml(returnList));
                checkLinks($preview, returnList);
            };
            var onReset = function(e) {
                var $module = $(e.target).closest('.module'),
                    $textarea = $module.find('textarea'),
                    _name = $textarea.data('name');
                $textarea.val('');
            };
            var onOpen = function(e) {
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

        var getStorage = function() {
            var jsonObj = JSON.parse(localStorage.getItem('isImage'));
            if (jsonObj !== null) {
                objIsImage = jsonObj;
            };
            console.log(objIsImage);
        };

        var setStorage = function() {
            var getIndex = function() {
                var _arr = [];
                var $module = $app.find('.module');
                for (var i = 0; i < $module.length; i++) {
                    var $this = $module.eq(i);
                    _arr.push($this.data('idx') * 1);
                }
                return _arr;
            }
            objIsImage.sortIndex = getIndex(); // 정렬 순서 저장
            localStorage.setItem('isImage', JSON.stringify(objIsImage));
        };

        var ukSortable = function() {
            if (typeof UIkit !== 'function') return false;
            var $sortable = $('.uk-sortable');
            UIkit.sortable($sortable);
            $document.on('moved', $sortable, function(){
                setStorage();
            });
        };

        var setCurrentPageName = function(_idx) {
            var _active = function(_index){
                console.log(_index);
                $switcher.find('li').eq(_index).find('a').text(objIsImage.pages[_index].name);
                console.log(objIsImage.pages[_index].name);
            }
            // if (_idx !== undefined) {
            //     _active(_idx);
            // } else {
            //     for (var i = 0; i < objIsImage.pages[_idx].length; i++) {
            //         _active(i);
            //     }
            // }
        };

        var getCurrentPageHtml = function(){
            var _html = ['',
                '<div class="uk-card uk-card-default uk-card-body uk-margin">',
                '    <a href="#"><span uk-icon="close"></span></a>',
                '    <div class="uk-form-stacked">',
                '        <div class="uk-margin">',
                '            <label class="uk-form-label" for="form-stacked-text">이벤트명</label>',
                '            <div class="uk-form-controls">',
                '                <input class="uk-input pageName" type="text" placeholder="이벤트명">',
                '            </div>',
                '        </div>',
                '         <div class="uk-grid-small uk-child-width-expand@s" uk-grid>',
                '             <div>',
                '                 <label class="uk-form-label" for="form-stacked-text">PC</label>',
                '                 <div class="uk-form-controls">',
                '                     <textarea class="pc uk-textarea uk-form-small" rows="6" placeholder="PC HTML"></textarea>',
                '                 </div>',
                '             </div>',
                '             <div>',
                '                 <label class="uk-form-label" for="form-stacked-text">Mobile</label>',
                '                 <div class="uk-form-controls">',
                '                     <textarea class="mobile uk-textarea uk-form-small" rows="6" placeholder="Mobile HTML"></textarea>',
                '                 </div>',
                '             </div>',
                '        </div>',
                '        <div class="uk-margin action">',
                '            <button class="uk-button uk-button-default button reset">초기화</button>',
                '        </div>',
                '    </div>',
                '</div>',
                '<hr class="uk-divider-icon">',
                '<div class="list uk-child-width-1-2@m uk-grid-small uk-grid-match" uk-grid></div>'];
            _html = _html.join('');
            return _html;
        };

        var setCurrentList = function(_idx) {
            console.log('setCurrentList');
            var _index = objIsImage.sortIndex;
            var $list = $app.find('.list');
            var getItemHtml = function(_arr, _idx){
                var _this = _arr[_idx];
                var _html = '';
                _html += '<div class="module" data-idx="' + _idx + '" data-path="' + _this.url + '">';
                _html += '    <div class="uk-card uk-card-body ' + _this.theme + '">';
                _html += '        <h3 class="uk-card-title"><span class="uk-sortable-handle uk-margin-small-right" uk-icon="icon: table"></span>' + _this.name + '</h3>';
                _html += '        <div class="uk-margin action">';
                _html += '            <button class="uk-button uk-button-secondary button submit">확인</button>';
                _html += '        </div>';
                _html += '    </div>';
                _html += '    <div class="uk-margin links"></div>';
                _html += '    <div class="uk-margin preview"></div>';
                _html += '</div>';
                return _html;
            }
            var _html = '';
            for (var i = 0; i < _index.length; i++) {
                _html += getItemHtml(objIsImage.targets, _index[i]);
            }
            $list.empty().html(_html);
        };

        var init = function() {

            // 초기화
            getStorage();
            // setHandler();
            // ukSortable();

            // 재구성
            var reset = function(_idx){
                tabIdx = _idx;
                $('#content').children('li').eq(_idx).html(getCurrentPageHtml());
                setCurrentList(tabIdx);
                setCurrentPageName();
            };

            $document.on('keyup focusout', 'textarea', function(e) {
                console.log(tabIdx);
            });
            $document.on('keyup', '.pageName', function(e) {
                var $this = $(e.target);
                $this = ($this.is('input')) ? $this : $this.closest('input');
                var _val = $this.val();
                objIsImage.pages[tabIdx].name = _val;
                setCurrentPageName(tabIdx);
                setStorage();
            });
            $document.on('shown', mySwitcher, function(e) {
                clearTimeout(timerSwitcher);
                var $li = $(e.target);
                timerSwitcher = setTimeout(function() {
                    reset($li.index());
                }, 200);
            });

        };

        init();






    };

    appOpener();

});
