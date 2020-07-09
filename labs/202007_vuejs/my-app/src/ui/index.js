import Vue from 'vue'

var ui = {
    init: function(){
        console.log('init');
    },
    reset: function(){
        console.log('reset');
    },
    destory: function(){
        console.log('destory');
    }
}
Vue.prototype.$uiInit = ui.init
