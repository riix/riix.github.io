$(function(){
    var $app = $('#app');
    var $modules = $app.find('.module');
    var $buttons = $app.find('.button');
    var _result = [];
    var timestamp = new Date().getTime();
    var setLinks = function($el, _arr){
        var _html = '<ul>'
        for (var i = 0; i < _arr.length; i++) {
            _html += '<li><a href="' + _arr[i] + '?ts=' + timestamp + '" target="_blank">' + _arr[i] + '</a></li>';
        }
        _html += '</ul>';
        $el.html(_html);
    }
    var onSubmit = function(e){
        _result = [];
        var $module = $(e.target).closest('.module');
        var $textarea = $module.find('textarea');
        var $links = $module.find('.links');
        var _path = $textarea.data('path');
        var _values = $textarea.val();
        _values = _values.split('\n');
        if (_values[0].length < 1) return false;
        for (var i = 0; i < _values.length; i++) {
            var _this = _values[i];
            _this = _path + _this.split('images/')[1];
            // console.log(_this);
            // window.open(_this);
            _result.push(_this);
        }
        setLinks($links, _result);
    };
    $buttons.on('click', function(e){
        onSubmit(e);
    });
});
