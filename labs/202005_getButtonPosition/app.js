$(function(){

    var $document = $(document);

    function mathRound(_val){ // 소숫점 2자리 이하 절삭
        return Math.round(_val.toFixed(3) * 100) / 100;
    };

    function getInputValue(_el){ // input 객체 값 구하기
        var $el = (typeof _el === 'string') ? $(_el) : _el ;
        var _result = $el.val();
        return (/^[0-9]*$/.test(_result)) ? _result * 1 : _result; // 숫자일 경우 숫자형 반환
    };

    function getPercentPosition(_canvas, _button){ // 퍼센트 좌표 구하기
        return {
            left: _button.left / _canvas.width * 100,
            top: _button.top / _canvas.height * 100,
            right: _button.right / _canvas.width * 100,
            bottom: _button.bottom / _canvas.height * 100
        }
    };

    function getStrInlineStyle(_styles){ // 인라인 스타일 스트링 반환
        var _result = 'left: ' + _styles.left + '; top: ' + _styles.top + '; width: ' + _styles.width + '; height: ' + _styles.height + ';';
        return _result;
    };

    var appButtonGenerator = function(){

        var imageProp = {},
            itemsProp = [];

        var defaults = {
            image: {
                src: "",
                width: 1,
                height: 1
            },
            items: [{
                left: 0,
                top: 0,
                right: 0,
                bottom: 0,
                dataAttr: "dpnm",
                dataAttrVal: "가입신청"
            }]
        }

        var $app = $('#app'),
            $items = $('#items'),
            $src = null,
            $image = null,
            $preview = null,
            $textarea = null;

        function setStorage(_name, _arr){
            localStorage.setItem(_name, JSON.stringify(_arr));
        };

        var getImageProp = function(){
            return {
                src: getInputValue($src),
                width: getInputValue('#width'),
                height: getInputValue('#height')
            }
        };

        var getItemProp = function(_idx){ // 아이템별 프로퍼티 구하기
            var _getValue = function(_idx, _selector) {
                var $this = $items.children().eq(_idx);
                return getInputValue($this.find(_selector));
            };
            return {
                top: _getValue(_idx, '.top'),
                left: _getValue(_idx, '.left'),
                right: _getValue(_idx, '.right'),
                bottom: _getValue(_idx, '.bottom'),
                dataAttr: _getValue(_idx, '.dataAttr'),
                dataAttrVal: _getValue(_idx, '.dataAttrVal')
            }
        };

        var getItemsProperties = function(){
            var _html = ''; // 초기화
            var _length = $items.children().length;
            itemsProp = [];
            for (var i = 0; i < _length; i++) {
                itemsProp[i] = getItemProp(i);
            }
            return itemsProp;
        };

        var getHtml = function(_arr){
            var _html = ''; // 초기화
            var _length = $items.children().length;
            for (var i = 0; i < _length; i++) {
                var _values = getPercentPosition(imageProp, _arr[i]);
                _values.width = _values.right - _values.left;
                _values.height = _values.bottom - _values.top;
                var _styles = {
                    left: mathRound(_values.left) + '%',
                    top: mathRound(_values.top) + '%',
                    width: mathRound(_values.width) + '%',
                    height: mathRound(_values.height) + '%'
                };
                var _position = _arr[i].left + '|' + _arr[i].top + '|' + _arr[i].right + '|' + _arr[i].bottom;
                _html += '<a class="gaip" href="javascript:;" style="' + getStrInlineStyle(_styles) + '"';
                _html += ' data-' + _arr[i].dataAttr + '="'+ _arr[i].dataAttrVal + '" data-position="' + _position + '">';
                _html += _arr[i].dataAttrVal + '</a>\n';
            }
            return _html;
        };

        var run = function(e){
            imageProp = getImageProp();
            $preview.find('a').remove(); // 버튼 재배치

            var itemsProp = getItemsProperties();
            var _html = getHtml(itemsProp);

            $preview.append($(_html));
            $textarea.val(_html); // 결과값 노출

            console.info('run', itemLength, itemsProp);
        };

        var setImage = function(e){ // 이미지 프로퍼티 처리
            imageProp.src = getInputValue($src);
            var _src = (imageProp.src == '') ? 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==' : imageProp.src;
            $image.attr('src', _src);
            $image.css('height', (imageProp.src == '') ? '30px' : 'auto');
            var _core = function(){
                var _width = $image[0].naturalWidth,
                    _height = $image[0].naturalHeight;
                imageProp.width = _width;
                imageProp.height = _height;
                $('#width').val(_width);
                $('#height').val(_height);
                setStorage('imageProp', imageProp);
            };
            $image.on('load', _core);
        };

        var setHandler = function(){ // 핸들러
            var onRemove = function(e){
                var $parent = $(e.target).closest('.module');
                if ($parent.index() > 0) {
                    $parent.remove();
                    itemLength = $items.children().length;
                    run();
                    setStorage('itemsProp', itemsProp);
                }
            };
            var onAdd = function(e){
                if (itemLength < 5) {
                    var $sandbox = $items.children().last().clone();
                    $sandbox.appendTo($('#items'));
                    run();
                    setStorage('itemsProp', itemsProp);
                } else {
                    alert('최대 5개 까지만 생성할 수 있지요');
                }
            };
            var onSample = function(e){
                setStorage('imageProp', {"src":"http://stg.lghellovision.net/event/images/tps_20200603_02.png","width":1160,"height":2538});
                setStorage('itemsProp', [
                    {"top":953,"left":381,"right":781,"bottom":1043,"dataAttr":"dpnm","dataAttrVal":"HD 이코노미 + 헬로tv WiFi(무비무비 이벤트)"},
                    {"top":2327,"left":381,"right":781,"bottom":2417,"dataAttr":"dpnm","dataAttrVal":"UHD 베이직 + 헬로tv WiFi(무비무비 이벤트)"}
                ]);
                location.reload(true);
            };
            var onReset = function(e){
                localStorage.removeItem('imageProp');
                localStorage.removeItem('itemsProp');
                location.reload(true);
            };
            $document.on('click', '.remove', onRemove);
            $document.on('click', '.add', onAdd);
            $document.on('click', '.sample', onSample);
            $document.on('click', '.reset', onReset);

            $document.on('keypress focusout', '.src', setImage);
            $document.on('keyup', '.module input', function(){
                run();
                setStorage('itemsProp', itemsProp);
            });
            $textarea.on('focus', function(e){
                $(e.target).select();
            });
        };

        var init = function(){ // 초기화

            $src = $('#src');
            $image = $('#image');
            $preview = $('#preview');
            $textarea = $('textarea');

            var readImageObj = function(_name){ // 이미지 스토리지 불러오기
                var obj = JSON.parse(localStorage.getItem(_name));
                obj = (obj !== null) ? obj : defaults.image;
                for (var prop in obj) {
                    if (obj.hasOwnProperty(prop)) {
                        $('#' + prop).val(obj[prop]);
                    }
                }
            };

            var readItemsObj = function(_name) { // 아이템 스토리지 불러오기
                var obj = JSON.parse(localStorage.getItem(_name));
                obj = (obj !== null) ? obj : defaults.items;
                var $module = $items.children();
                var $sandbox = $module.last().clone();
                $module.first().remove();
                itemLength = obj.length;
                for (var i = 0; i < itemLength; i++) {
                    var _this = obj[i];
                    var $this = $sandbox.clone();
                    $this.appendTo($items);
                    for (var prop in _this) {
                        if (_this.hasOwnProperty(prop)) {
                            $this.find('.' + prop).val(_this[prop]);
                        }
                    }
                }
            };

            readImageObj('imageProp'); // 이미지 스토리지 불러오기
            readItemsObj('itemsProp'); // 아이템 스토리지 불러오기

            setImage();
            run();
            setHandler(); // 핸들러
        };

        init();

    };

    appButtonGenerator();

});
