(function($){
    $.fn.splitWords = function(){
        this.each(function(){
            var $this = $(this);
            var doSplit = function() {
                var fadeInWords = function(_items) {
                    var $items = _items;
                    var _length = $items.length;
                    for (var i = 0; i < _length; i++) {
                        var $item = $items.eq(i),
                            _delay = 200 + (80 * i);
                        $item.css({
                            opacity: getRandom(0.5, 1),
                            filter: 'blur(0px)',
                            transitionDelay: _delay + 'ms'
                        });
                    }
                }
                var splitWords = function(_group) {
                    let group = _group[0];
                    group.innerText.replace(/(<([^>]+)>)/ig, "");
                    var words = group.innerText.split(" "),
                        length = words.length;
                    group.innerHTML = '';
                    for (let i = 0; i < length; i++) {
                        group.innerHTML += "<span>" + words[i] + "</span>";
                        if (i < words.length - 1) {
                            group.innerHTML += " ";
                        }
                        if (i >= length - 1) {
                            setTimeout(function(){
                                fadeInWords($('#app').find('span'));
                            }, 1);
                        }
                    }
                }
                splitWords($this.find('q').eq(0));
            };
            doSplit();
        });
        return this;
    }
})(window.jQuery);
