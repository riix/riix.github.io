// document.getElementById("container").style.background = getRandomGradient();
function getRandomGradient(_alpha) {
    var alpha = _alpha || .2;
    var rgba = function() {
        var get255 = function(){
            return Math.round(Math.random() * 256); // 1 to 255
        };
        var _rgba = 'rgba(' + get255() + ', ' + get255() + ', ' + get255() + ', ' + alpha + ')';
        return _rgba;
    };
    var angle = Math.round(Math.random() * 361); // 0 to 360
    var gradient = "linear-gradient(" + angle + "deg, " + rgba() + ", " + rgba() + ")";
    return gradient;
}
