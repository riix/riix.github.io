$(function () {

  // dom
  var $window = $(window);
  var $container = $('#container');
  var $wrapper = $('#wrapper');
  var $section = $container.find('.container');
  var $sizer = $('#sizer');

  var $navigation = $('#navigation');

  var windowHeight = $window.height();
  var wrapperHeight = $wrapper.height();
  var length = $section.length;

  var idx = 0;
  var prevIdx = -1;

  // set nav item
  var setNavItem = function () {
    var i = 0;
    var navHtml = $navigation.html();
    var htmlNavigtion = '';
    while (i < length) {
      htmlNavigtion += navHtml;
      i++;
    }
    $navigation.html(htmlNavigtion);
  };
  setNavItem();

  // get nav item
  var $navWraps = $navigation.children();
  var $navInners = $navWraps.children();

  var doWrapper = function (_el, scrollTop) {
    var y = 0 - scrollTop;
    _el.css('transform', 'translateY(' + y + 'px)');
    _el.css({
      'transition-timing-function': 'ease-in-out',
      'transition-duration': '500ms' });

  };

  var doInner = function (_el, _scrollTop) {
    var j = 0;
    while (j < length) {
      var $this = _el.eq(j);
      var y = 0 - windowHeight * j + _scrollTop;
      $this.css('transform', 'translateY(' + y + 'px)');
      $this.css({
        'transition-timing-function': 'ease-in-out',
        'transition-duration': '500ms' });

      j++;
    }
  };

  // doScroll
  $window.on('load resize', function () {
    windowHeight = $window.height();
    wrapperHeight = $wrapper.height();
    $sizer.height(wrapperHeight);
  });

  $window.on('scroll', function () {
    var scrollTop = $window.scrollTop();

    // do core
    doWrapper($navWraps, scrollTop);
    doInner($navInners, scrollTop);
  });

  var timerDebounce = null; // timer debounce
  var fired = false; // fi
  var timerAnim = null;
  var isAnimating = false;
  var goTo = function (idx) {
    var y = 0 - windowHeight * idx;
    clearTimeout(timerAnim);
    isAnimating = true;

    $wrapper.off('transitionend webkitTransitionEnd oTransitionEnd');

    $wrapper.css({
      'transform': 'translateY(' + y + 'px)',
      'transition-timing-function': 'ease-in-out',
      'transition-duration': '500ms' });


    var to = windowHeight * idx;

    doWrapper($navWraps, to);
    doInner($navInners, to);

    $wrapper.one('transitionend webkitTransitionEnd oTransitionEnd', function () {
      console.log('end');
      clearTimeout(timerAnim);
      isAnimating = false;
    });
    timerAnim = setTimeout(function () {
      isAnimating = false;
    }, 400);
  };

  var moveTo = function (_dir) {
    idx += _dir;
    if (idx < 0) idx = 0;
    if (idx >= length - 1) idx = length - 1;
    if (idx != prevIdx) {
      prevIdx = idx;
      goTo(idx);
    }
  };

  $window.on('mousewheel DOMMouseScroll', function (e) {
    clearTimeout(timerDebounce);
    var _dir = 1;
    if (e.originalEvent.wheelDelta > 0 || e.originalEvent.detail < 0) {
      _dir = -1;
    }
    if (fired !== true && isAnimating !== true) {
      fired = true;
      moveTo(_dir);
    }
    timerDebounce = setTimeout(function () {
      fired = false;
    }, 100);
  });

  var init = function () {
    $container.css({
      'position': 'relative',
      'overflow': 'hidden',
      'height': '100vh' });

    $wrapper.css({
      'position': 'absolute',
      'top': '0',
      'left': '0',
      'right': '0' });

  };
  init();

});