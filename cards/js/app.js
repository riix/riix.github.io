$(function(){
    var myElastiStack = null;
    var $app = $('#stack');
    document.getElementById('body').style.background = getRandomGradient();
    $.getJSON('./js/test.json', function(_response){
        var values = _response["values"];
        var _length = values.length;
        var _html = '';
        var _class = '';
        var _strLength = 0;
        for (var i = 1; i < _length; i++) {
            var _this = values[i];
            var _bgColor = 'background-image: ' + getRandomGradient(.15) + ';';
            _class = '';
            _strLength = _this[3].length;
            if (_strLength >= 300) {
                _class = 'is-xxsmall';
            } else if (_strLength >= 200) {
                _class = 'is-xsmall';
            } else if (_strLength >= 180) {
                _class = 'is-small';
            } else if (_strLength >= 150) {
                _class = 'is-medium';
            } else if (_strLength >= 100) {
                _class = 'is-large';
            } else if (_strLength >= 50) {
                _class = 'is-xlarge';
            } else {
                _class = 'is-xxlarge';
            }
            _class = _class + ' length-' + _strLength;
            _html += '<li style="' + _bgColor + '"><blockquote class="module ' + _class + '"><q>' + _this[3] +'</q><cite><span class="from">' + _this[1] +'</span><span class="author">' + _this[2] +'</span></cite></blockquote></li>';
        }
        $app.html(_html);
        myElastiStack = new ElastiStack( document.getElementById( 'stack' ), {
            isRandom: true,
            distDragBack: 40,
            distDragMax: 240,
        });
    });
});
