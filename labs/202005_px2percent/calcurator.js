$(function(){

    var $document = $(document),
        $app = $('#app'),
        $input = $('fieldset input[type="number"], fieldset input[type="text"]'),
        $textarea = $('textarea').eq(0),
        $imageSrc = $('#imageSrc'),
        $image = $('#image');

    var _props = {
        imageSrc: '',
        width: 0,
        height: 0,
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        dataAttr: '',
        dataAttrVal: ''
    };

    var _values = {};

    function getInputValue(_el){ // input 객체 값 구하기
        var _result = $(_el).val();
        return _result;
    };
    function returnRound(_val){ // 소숫점 2자리 이하 절삭
        var _result = Math.round(_val.toFixed(3) * 100) / 100;
        return _result;
    };
    function setStorage(_arr){
        console.info(_arr);
        localStorage.setItem('calc', JSON.stringify(_arr));
    };
    function getStorage(){
        var obj = JSON.parse(localStorage.getItem('calc'));
        if (obj == null) return false;
        for (var prop in obj) {
            if (obj.hasOwnProperty(prop)) {
                $('#' + prop).val(obj[prop]);
            }
        }
    };

    var onInputImage = function(e){
        _props.imageSrc = getInputValue('#imageSrc');
        $image.attr('src', _props.imageSrc);
        setStorage(_props);
        $image.on('load', function(){
            var _width = $image[0].naturalWidth;
            var _height = $image[0].naturalHeight;
            _props.width = _width;
            _props.height = _height;
            $('#width').val(_width);
            $('#height').val(_height);
            setStorage(_props);
        });
    };
    $imageSrc.on('keypress focusout', function(e){
        onInputImage();
    });

    var getProperties = function(){
        var _result = {
            imageSrc: getInputValue('#imageSrc'),
            width: getInputValue('#width'),
            height: getInputValue('#height'),
            top: getInputValue('#top'),
            left: getInputValue('#left'),
            right: getInputValue('#right'),
            bottom: getInputValue('#bottom'),
            dataAttr: getInputValue('#dataAttr'),
            dataAttrVal: getInputValue('#dataAttrVal')
        };
        return _result;
    };

    var getCalcuratedValue = function(_arrProps){
        var _result = {
            width: 0,
            height: 0,
            left: _arrProps.left / _arrProps.width * 100,
            top: _arrProps.top / _arrProps.height * 100,
            right: _arrProps.right / _arrProps.width * 100,
            bottom: _arrProps.bottom / _arrProps.height * 100
        };
        _result.width = _result.right - _result.left;
        _result.height = _result.bottom - _result.top;
        return _result;
    };

    var getInlineStyle = function(_styles){
        var _result = 'left: ' + _styles.left + '; top: ' + _styles.top + '; width: ' + _styles.width + '; height: ' + _styles.height + ';';
        return _result;
    };

    var result = function(e){

        _props = getProperties();
        _values = getCalcuratedValue(_props);

        var _styles = {
            left: returnRound(_values.left) + '%',
            top: returnRound(_values.top) + '%',
            width: returnRound(_values.width) + '%',
            height: returnRound(_values.height) + '%'
        };

        var _position = _props.left + '|' + _props.top + '|' + _props.right + '|' + _props.bottom;

        var _html = [
            '<a class="gaip" href="javascript:;" style="' + getInlineStyle(_styles) + '"',
            ' data-' + _props.dataAttr + '="'+ _props.dataAttrVal + '" data-position="' + _position + '">',
            _props.dataAttrVal + '</a>'
        ];
        _html = _html.join('');

        $app.find('a').remove(); // 버튼 재배치
        $app.append($(_html));

        $textarea.val(_html); // 결과값 노출

        setStorage(_props);

    };

    var setHandler = function(){
        $input.on('keyup', function(e){
            result();
        });
        $('textarea').on('focus', function(e){
            $(e.target).select();
        });
    };

    var init = function(){
        getStorage();
        result();
        setHandler();
        $image.attr('src', _props.imageSrc);
    };

    init();

});
