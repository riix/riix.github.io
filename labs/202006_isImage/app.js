$(function() {

    'use strict';

    var $document = $(document);

    var isImage = function(){

        var tabIdx = 0;

        var defaults = {
            sortIdx: [0, 1, 2, 3, 4, 5, 6, 7], // 정렬 인덱스
            targets: [{
                    name: '개발 PC',
                    url: 'http://stg.lghellovision.net/',
                    theme: 'uk-card-primary'
                },
                {
                    name: '개발 모바일',
                    url: 'http://mstg.lghellovision.net/',
                    theme: 'uk-card-primary'
                },
                {
                    name: '상용 PC',
                    url: 'http://lghellovision.net/',
                    theme: 'uk-card-secondary'
                },
                {
                    name: '상용 모바일',
                    url: 'http://m.lghellovision.net/',
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
                }
            ],
            pages: [{
                name: '이벤트 1',
                pc: '',
                mobile: ''
            }]
        };

        var opts = $.extend({}, defaults);

        var $document = $document || $(document),
            $content = $('#content'),
            $tab = $('#tab');

        var mySwitcher = null;

        var timerActiveTab = null,
            timerShown = null;

        var getEngNum = function(_val) { //  영문자 숫자만 반환
            var _regex = /[^a-zA-Z0-9]/g;
            var _result = _val.split('//')[1];
            _result = _result.split('.');
            var last = _result.pop(), //  확장자 제거
                prev = _result.join();
            _result = prev.replace(_regex, "");
            return _result;
        };

        var getHtml = {
            tab: function(_idx) {
                var _this = opts.pages[_idx];
                var _name = _this.name;
                _name = (_name.length <= 0) ? '&nbsp;' : _name;
                var _html = '<a href="javascript:;" aria-expanded="false">' + _name + '</a><span class="js-remove" uk-icon="icon: close; ratio: 0.8"></span>';
                return _html;
            },
            page: function(_idx){
                var _pages = opts.pages[_idx];
                var _targets = opts.targets;
                var _html = '';
                    _html += '<div class="uk-card uk-card-default uk-card-body uk-margin">';
                    _html += '    <div class="uk-form-stacked">';
                    _html += '        <div class="uk-margin">';
                    _html += '            <label class="uk-form-label" for="form-stacked-text">이벤트명</label>';
                    _html += '            <div class="uk-form-controls">';
                    _html += '                <input name="name" class="js-input uk-input name" type="text" placeholder="이벤트명" value="' + _pages.name + '">';
                    _html += '            </div>';
                    _html += '        </div>';
                    _html += '         <div class="uk-grid-small uk-child-width-expand@s" uk-grid>';
                    _html += '             <div>';
                    _html += '                 <label class="uk-form-label" for="form-stacked-text">PC</label>';
                    _html += '                 <div class="uk-form-controls">';
                    _html += '                     <textarea name="pc" class="pc js-input uk-textarea uk-form-small" rows="8" placeholder="PC Files">' + _pages.pc + '</textarea>';
                    _html += '                     <strong class="item-count"><span>0</span> items</strong>';
                    _html += '                 </div>';
                    _html += '             </div>';
                    _html += '             <div>';
                    _html += '                 <label class="uk-form-label" for="form-stacked-text">Mobile</label>';
                    _html += '                 <div class="uk-form-controls">';
                    _html += '                     <textarea name="mobile" class="mobile js-input uk-textarea uk-form-small" rows="8" placeholder="Mobile Files">' + _pages.mobile + '</textarea>';
                    _html += '                     <strong class="item-count"><span>0</span> items</strong>';
                    _html += '                 </div>';
                    _html += '             </div>';
                    _html += '        </div>';
                    _html += '        <div class="uk-margin action">';
                    _html += '            <button class="uk-button uk-button-small uk-button-default button clear">초기화</button>';
                    _html += '        </div>';
                    _html += '    </div>';
                    _html += '</div>';
                    _html += '<hr class="uk-divider-icon">';
                    _html += '<div class="list uk-child-width-1-2@m uk-grid-small uk-grid-match" uk-grid>';

                    for (var i = 0; i < _targets.length; i++) {
                        var _this = _targets[i];
                        var _type = (_this.name.indexOf('모바일') > -1) ? 'mobile' : 'pc';
                        _html += '<div class="module" data-idx="' + i + '" data-type="' + _type + '" data-url="' + _this.url + '">';
                        _html += '    <div class="uk-card uk-card-small uk-card-hover uk-card-body ' + _this.theme + '">';
                        _html += '        <h3 class="uk-card-title">' + _this.name + '</h3>';
                        _html += '        <div class="action">';
                        _html += '            <button class="uk-button uk-button-primary button submit js-submit">확인</button>';
                        _html += '        </div>';
                        _html += '    </div>';
                        _html += '    <div class="uk-margin links"></div>';
                        _html += '    <div class="uk-margin preview"></div>';
                        _html += '</div>';
                    }

                return _html;
            }
        };

        var storage = {
            set: function(){
                opts.tabIdx = tabIdx;
                localStorage.setItem('isImage', JSON.stringify(opts));
                console.info('set storage', opts);
            },
            get: function(){
                var obj = JSON.parse(localStorage.getItem('isImage'));
                if (obj !== null) {
                    opts = obj;
                    tabIdx = opts.tabIdx;
                };
                console.log(obj);
                // console.info('get storage', opts);
            }
        };



        var build = {
            tab: function(){
                var _arr = opts.pages;
                var _html = '';
                $tab.empty();
                for (var i = 0; i < _arr.length; i++) {
                    _html += '<li>' + getHtml.tab(i) + '</li>';
                }
                $tab.html(_html);
            },
            content: function(){
                var _arr = opts.pages;
                var _html = '';
                $content.empty();
                for (var i = 0; i < _arr.length; i++) {
                    _html += '<li>' + getHtml.page(i) + '</li>';
                }
                $content.html(_html);
            },
            tabText: function(_idx){
                var _arr = opts.pages;
                var _i = 0,
                    _length = _arr.length;
                if (_idx !== undefined) { // _idx 있을때는 한번만 실행
                    _i = _idx;
                    _length = _idx + 1;
                }
                for (var i = _i; i < _length; i++) {
                    var _str = _arr[i].name;
                    var $a = $tab.children().eq(i).find('a');
                    if (_arr[i].name.length <= 0) {
                        $a.html('&nbsp;');
                    } else {
                        $a.text(_str);
                    }

                }
            },
            form: function(_el, _idx){
                var _arr = opts.pages[_idx];
                for (var _prop in _arr) {
                    if (_arr.hasOwnProperty(_prop)) {
                        var $target = _el.find('.' + _prop );
                        $target.val(_arr[_prop]);
                    }
                }
            }
        };

        var handler = {
            set: function(){

                var onOpen = function(e){
                    e.preventDefault();
                    var $this = $(e.target);
                    $this = ($this.is('a')) ? $this : $this.closest('a');
                    var _type = $this.closest('.module').data('type');
                    var _href = $this.attr('href'),
                        _width = (_type == 'mobile') ? 720 : 1160,
                        _left = screen.width / 2 - (_width / 2),
                        _height = screen.height - 180;
                    var _name = getEngNum(_href);
                    window.open(_href, _name, 'width=' + _width + ', height=' + _height + ', scrollbars=yes, top=10, left=' + _left);
                };

                var countItems = function(_el){ // 아이탬 갯수 반환
                    var _val = _el.val().replace(/\n$/gm, ''); // 빈줄 삭제
                    var _length = _val.split('\n').length;
                    if (_val == '') _length = 0;
                    _el.next().children().text(_length);
                };

                $document.on('keyup focusout', '.js-input', function(e){
                    var $this = $(e.target);
                    $this = ($this.is('.js-input')) ? $this : $this.closest('.js-input');
                    var _name = $this.attr('name');
                    opts.pages[tabIdx][_name] = $this.val();
                    if (_name.match('name')) { // 이벤트명일때
                        build.tabText(tabIdx);
                    }
                    if (_name.match('pc') || _name.match('mobile')) { // 이벤트명일때
                        countItems($this);
                    }
                    storage.set();
                });
                $document.on('click', '.clear', function(e){
                    var _idx = tabIdx;
                    var $current = $content.children().eq(_idx);
                    var _clear = function(_idx){
                        var _arr = opts.pages[_idx];
                        for (var _prop in _arr) {
                            _arr[_prop] = '';
                        }
                    };
                    _clear(_idx);
                    $current.html(getHtml.page(_idx));
                    build.form($current, _idx);
                    storage.set();
                });
                $document.on('click', '.js-remove', function(e){
                    var $this = $(e.target);
                    var _idx = $this.closest('li').index(),
                        _lastIdx = opts.pages.length - 1,
                        _to = tabIdx; // 마지막 탭으로

                    if (_lastIdx < 1) {
                        alert('마지막');
                    } else {
                        opts.pages.splice(_idx, 1);
                        build.tab();
                        build.content();
                        _to = (_idx == tabIdx) ? _idx - 1 : _to; // 같은 탭일때
                        _to = (_idx < tabIdx) ? tabIdx - 1 : _to; // 이전 탭일때
                        activeTab(_to);
                    }
                });
                $document.on('click', '.js-add', function(e){
                    var $this = $(e.target);
                    var _idx = (opts.pages.length);
                    var _arr = {
                        name: '이벤트 ' + (_idx + 1),
                        pc: '',
                        mobile: ''
                    };
                    if (opts.pages.length >= 5) {
                        alert('최대 5개 까지만');
                    } else {
                        opts.pages.push(_arr);
                        build.tab();
                        build.content();
                        tabIdx = _idx;
                        activeTab(_idx);
                    }
                });
                $document.on('click', 'a[target="_blank"]', onOpen);

                $document.on('click', '.js-submit', function(e){
                    var $this = $(e.target);

                    var $module = $this.closest('.module'),
                        _url = $module.data('url'),
                        _type = $module.data('type');

                    var $textarea = $this.closest('li').find('textarea.' + _type),
                        $preview = $module.find('.preview'),
                        $links = $module.find('.links');

                    var returnList = [];
                    var timestamp = new Date().getTime();

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

                    var _values = $textarea.val();
                    _values = _values.replace(/^\s/gm, ''); // 빈줄 제거
                    _values = _values.replace(/\r\n$/g, ''); // 마지막 공백 제거
                    _values = _values.split('\n');
                    if (_values[0].length < 1) return false;
                    for (var i = 0; i < _values.length; i++) {
                        var _this = _values[i];
                        if (_this.length > 0) {
                            _this = _url + _this.split('WebContent/')[1];

                            // 이벤트
                            if (_this.match('front/mobile/event/')) _this = _this.replace('front/mobile/event/','event/');

                            // 이유있는 제안
                            if (_this.match('front/web/open/')) _this = _this.replace('front/web/open/','front/web/open/');
                            if (_this.match('front/mobile/open/')) _this = _this.replace('front/mobile/open/','front/mobile/open/');

                            returnList.push(_this);
                        }
                    }

                    var getListHtml = function(_arr){ // 파일 목록 html 구하기
                        var _result = '<ul class="uk-list uk-list-collapse uk-list-striped list-url">'
                        for (var i = 0; i < _arr.length; i++) {
                            _result += '<li><a href="' + _arr[i] + '?ts=' + timestamp + '" target="_blank">' + _arr[i] + '</a></li>';
                        }
                        _result += '</ul>';
                        return _result;
                    };

                    $links.html(getListHtml(returnList));
                    checkLinks($preview, returnList);

                });
            }
        };

        var activeTab = function(_idx){
            clearTimeout(timerActiveTab);
            timerActiveTab = setTimeout(function(){
                mySwitcher.show(_idx);
            }, 100)
        };

        var onComplete = function(_idx){
            tabIdx = _idx;
            storage.set();
        };

        var init = function(){

            storage.get();
            handler.set();

            build.tab();
            build.content();

            mySwitcher = UIkit.switcher('#tab', {
                duration: 0
            });

            mySwitcher.show(tabIdx);

            UIkit.util.on('#content', 'shown', function(e){
                var _idx = $(e.target).index();
                clearTimeout(timerShown);
                timerShown = setTimeout(function(){
                    onComplete(_idx);
                }, 150);
            });

        };

        init();

    };

    isImage();

});
