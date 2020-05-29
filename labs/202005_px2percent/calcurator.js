$(function(){
    var $app = $('#app');
    var $input = $('input[type="number"], input[type="text"]');
    var $textarea = $('textarea').eq(0);
    var _values = {};
    function getValue(_el){
        var _result = $(_el).val();
        return _result;
    };
    function setValue(_val){
        _val = Math.round(_val.toFixed(3) * 100) / 100; // 소숫점 2자리 이하 절삭
        return _val;
    };
    var result = function(e){
        var _width = getValue('#width');
        var _height = getValue('#height');
        var _top = getValue('#top');
        var _left = getValue('#left');
        var _right = getValue('#right');
        var _bottom = getValue('#bottom');
        var _result = '<a class="gaip" href="javascript:;" style="';
        var _position = _left + '|' + _top + '|' + _right + '|' + _bottom;
        _values.left = _left / _width * 100;
        _values.top = _top / _height * 100;
        _values.right = _right / _width * 100;
        _values.bottom = _bottom / _height * 100;
        _values.width = _values.right - _values.left;
        _values.height = _values.bottom - _values.top;
        _result += 'left:' + setValue(_values.left) + '%; ';
        _result += 'top:' + setValue(_values.top) + '%; ';
        _result += 'width:' + setValue(_values.width) + '%; ';
        _result += 'height:' + setValue(_values.height) + '%;';
        _result += '" ';
        _result += 'data-dpnm="' + $('#dataVal').val() + '" ';
        _result += 'data-position="' + _position + '"';
        _result += '>' + $('#dataVal').val() +'</a>';
        $textarea.val(_result);
        $app.find('a').remove();
        $app.append($(_result));
    };
    $input.on('keyup', function(e){
        result(e);
    });
    result();
    $('textarea').on('focus', function(e){
        $(e.target).select();
    });
    $('#file').on('change', function(e){
        var _file = $(e.target)[0].files[0].name;
        $('#image').attr('src', _file);
    });
});
