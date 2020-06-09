$(function() {

    'use strict';

    var $document = $(document);

    var isImage = function(){

        var defaults = {
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
                name: '샘플 이벤트',
                pcFile: '',
                mobileFile: ''
            }]
        };

        var opts = $.extend({}, defaults);

        var $document = $document || $(document);

        var index = 0;

        var getHtml = {
            page: function(_idx){
                var _this = opts.pages[_idx];
                var _html = '';
                    _html += '<div class="uk-card uk-card-default uk-card-body uk-margin">';
                    _html += '    <a href="#"><span uk-icon="close"></span></a>';
                    _html += '    <div class="uk-form-stacked">';
                    _html += '        <div class="uk-margin">';
                    _html += '            <label class="uk-form-label" for="form-stacked-text">이벤트명</label>';
                    _html += '            <div class="uk-form-controls">';
                    _html += '                <input class="uk-input name" type="text" placeholder="이벤트명" value="' + _this.name + '">';
                    _html += '            </div>';
                    _html += '        </div>';
                    _html += '         <div class="uk-grid-small uk-child-width-expand@s" uk-grid>';
                    _html += '             <div>';
                    _html += '                 <label class="uk-form-label" for="form-stacked-text">PC</label>';
                    _html += '                 <div class="uk-form-controls">';
                    _html += '                     <textarea class="pcFile uk-textarea uk-form-small" rows="6" placeholder="PC Files">' + _this.pcFile + '</textarea>';
                    _html += '                 </div>';
                    _html += '             </div>';
                    _html += '             <div>';
                    _html += '                 <label class="uk-form-label" for="form-stacked-text">Mobile</label>';
                    _html += '                 <div class="uk-form-controls">';
                    _html += '                     <textarea class="mobileFile uk-textarea uk-form-small" rows="6" placeholder="Mobile Files">' + _this.mobileFile + '</textarea>';
                    _html += '                 </div>';
                    _html += '             </div>';
                    _html += '        </div>';
                    _html += '        <div class="uk-margin action">';
                    _html += '            <button class="uk-button uk-button-default button reset">초기화</button>';
                    _html += '        </div>';
                    _html += '    </div>';
                    _html += '</div>';
                    _html += '<hr class="uk-divider-icon">';
                    _html += '<div class="list uk-child-width-1-2@m uk-grid-small uk-grid-match" uk-grid></div>';
                return _html;
            }
        };

        var storage = {
            set: function(){
                localStorage.setItem('isImage', JSON.stringify(opts));
                console.log(opts);
            },
            get: function(){
                var obj = JSON.parse(localStorage.getItem('isImage'));
                if (obj !== null) {
                    opts = obj;
                };
                console.log(opts);
            }
        };

        var handler = {
            set: function(){
                $document.on('keyup focusout', 'textarea', function(e){
                    var $this = $(e.target);
                    $this = ($this.is('textarea')) ? $this : $this.closest('textarea');
                    var _val = $this.val();

                    ///////////////////////////////
                    console.log(opts);
                    storage.set();
                });
            },
            reset: function(){
                console.log('reset handler');
            }
        };

        var reset = function(){
            console.info(opts.pages[index]);
            var $current = $('#content').children().eq(index);
            $current.html(getHtml.page(index));
            handler.reset();
        };

        var init = function(){
            storage.get();
            handler.set();
            reset();
        };

        init();

    };

    isImage();

});
