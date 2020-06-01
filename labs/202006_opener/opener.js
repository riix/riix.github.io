$(function(){
    var $document = $(document),
        $app = $('#app'),
        $modules = $app.find('.module'),
        $submit = $app.find('.submit'),
        $reset = $app.find('.reset');
    var _result = [];
    var timestamp = new Date().getTime();
    var setCookie = function($el, _value) {
        var _name = $el.data('name');
        $.cookie(_name, _value, { expires: 7 });
    };
    var setLinks = function($el, _arr){
        var _html = '<ul>'
        for (var i = 0; i < _arr.length; i++) {
            _html += '<li><a href="' + _arr[i] + '?ts=' + timestamp + '" target="_blank">' + _arr[i] + '</a></li>';
        }
        _html += '</ul>';
        $el.html(_html);
    };
    var checkLinks = function($el, _arr){
        var _html = '<ul>'
        for (var i = 0; i < _arr.length; i++) {
            _html += '<li><a href="' + _arr[i] + '?ts=' + timestamp + '" target="_blank"><img src="' + _arr[i] + '" alt="' + _arr[i] + '"/></a></li>';
        }
        _html += '</ul>';
        $el.html(_html);
        $el.imagesLoaded().done(function(){
            console.log('success');
            $el.closest('.module').removeClass('error').addClass('success');
        }).fail(function(){
            console.log('error');
            $el.closest('.module').removeClass('success').addClass('error');
        });
    };
    var onSubmit = function(e){
        _result = [];
        var $module = $(e.target).closest('.module'),
            $textarea = $module.find('textarea'),
            $links = $module.find('.links'),
            $preview = $module.find('.preview'),
            _path = $textarea.data('path'),
            _values = $textarea.val();
        setCookie($textarea, _values);
        _values = _values.split('\n');
        if (_values[0].length < 1) return false;
        for (var i = 0; i < _values.length; i++) {
            var _this = _values[i];
            _this = _path + _this.split('images/')[1];
            _result.push(_this);
        }
        setLinks($links, _result);
        checkLinks($preview, _result);
    };
    var onReset = function(e){
        var $module = $(e.target).closest('.module'),
            $textarea = $module.find('textarea'),
            _name = $textarea.data('name');
        $textarea.val('');
        $.removeCookie(_name);
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
    };
    init();
    $submit.on('click', function(e){
        onSubmit(e);
    });
    $reset.on('click', function(e){
        onReset(e);
    });
    $document.on('click', 'a[target="_blank"]', function(e){
        e.preventDefault();
        var $this = $(e.target);
        $this = ($this.is('a')) ? $this : $this.closest('a');
        var $textarea = $this.closest('.module').find('textarea');
        var _href = $this.attr('href'),
            _name = _href.split('/images/')[1],
            _width = ($textarea.data('mobile') === true) ? 720 : 1160,
            _left = screen.width / 2 - (_width / 2),
            _height = screen.height - 180;
        _name = _name.split('.')[0];
        window.open(_href, _name, 'width=' + _width + ', height=' + _height + ', scrollbars=yes, top=10, left=' + _left);
    });
});
