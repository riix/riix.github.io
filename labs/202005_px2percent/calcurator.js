$(function(){
    var $app = $('#app');
    var $input = $('input[type="number"], input[type="text"]');
    var $textarea = $('textarea').eq(0);
    var _props = {
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

    function getValue(_el){
        var _result = $(_el).val();
        return _result;
    };
    function setValue(_val){
        _val = Math.round(_val.toFixed(3) * 100) / 100; // 소숫점 2자리 이하 절삭
        return _val;
    };
    var setStorage = function(_arr){
        localStorage.setItem('calc', JSON.stringify(_arr));
    };
    var getStorage = function(){
        var _arr = JSON.parse(localStorage.getItem('calc'));
        if (_arr == null) return false;
        for (var property in _arr) {
            if (_arr.hasOwnProperty(property)) {
                $('#' + property).val(_arr[property]);
            }
        }
    };

    var result = function(e){

        _props.width = getValue('#width');
        _props.height = getValue('#height');
        _props.top = getValue('#top');
        _props.left = getValue('#left');
        _props.right = getValue('#right');
        _props.bottom = getValue('#bottom');
        _props.dataAttr = $('#dataAttr').val();
        _props.dataAttrVal = $('#dataAttrVal').val();

        var _result = '<a class="gaip" href="javascript:;" style="';
        var _position = _props.left + '|' + _props.top + '|' + _props.right + '|' + _props.bottom;

        _values.left = _props.left / _props.width * 100;
        _values.top = _props.top / _props.height * 100;
        _values.right = _props.right / _props.width * 100;
        _values.bottom = _props.bottom / _props.height * 100;
        _values.width = _values.right - _values.left;
        _values.height = _values.bottom - _values.top;

        _result += 'left:' + setValue(_values.left) + '%; ';
        _result += 'top:' + setValue(_values.top) + '%; ';
        _result += 'width:' + setValue(_values.width) + '%; ';
        _result += 'height:' + setValue(_values.height) + '%;';
        _result += '" ';
        _result += 'data-' + _props.dataAttr + '="' + _props.dataAttrVal + '" ';
        _result += 'data-position="' + _position + '"';
        _result += '>' + _props.dataAttrVal +'</a>';

        setStorage(_props);

        $textarea.val(_result);
        $app.find('a').remove();
        $app.append($(_result));
    };
    $input.on('focusout', function(e){
        result(e);
    });
    $('textarea').on('focus', function(e){
        $(e.target).select();
    });
    $('#file').on('change', function(e){
        var _file = $(e.target)[0].files[0].name;
        $('#image').attr('src', _file);
    });
    getStorage();
    result();
});
