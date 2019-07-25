(function() {
    var FILE_LESS_JS = '../resources/js/lib/less-3.0.0.min.js'; // less.js 파일 위치
    var root = document.documentElement,
        isLocalHost = (location.protocol.indexOf('http') > -1);
    root.className = root.className.replace(/\bno-js\b/,'js');
    if (isLocalHost === true) { // localhost 구동시 less 활성화
        document.write('<script src="' + FILE_LESS_JS + '"><\/script>');
        if (typeof less !== 'undefined') {
            less.pageLoadFinished.then(function() { // less
                root.className = root.className += ' less';
                console.log('completed');
            });
            less.watch();
        }
    }
}());
