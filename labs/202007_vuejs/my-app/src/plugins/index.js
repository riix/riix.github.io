import store from '@/store.js'
import EventBus from '@/eventBus.js';
import Splitting from 'splitting';

var AppPlugin = {};

AppPlugin.install = function(Vue, options) {

    // 1. 전역 메소드 또는 속성 추가
    Vue.myGlobalMethod = function() {
        // 필요한 로직 ...
        // alert('1232131213');
    }

    // 2. 전역 에셋 추가
    Vue.directive('my-directive', {
        bind(el, binding, vnode, oldVnode) {
            // 필요한 로직 ...
        }
    })

    // 3. 컴포넌트 옵션 주입
    Vue.mixin({
        created() {
            // 필요한 로직 ...
        }
    })

    // 4. 인스턴스 메소드 추가
    Vue.prototype.$myMethod = Vue.myGlobalMethod;

    // init
    Vue.prototype.$init = function(){

        var _this = this;

        var pageMask = function(){
            var getDirection = function(){
                var _current = _this.pageIdx || -1;
                var _saved = store.state.savedPageIdx;
                var _dir = (_current < _saved) ? 'prev' : 'next';
                return _dir;
            };
            var _dir = getDirection(); // get dir
            store.state.savedPageIdx = _this.pageIdx; // set prev index
            if (_dir == 'prev') {
                EventBus.$emit('pageMaskPrev');
            } else {
                EventBus.$emit('pageMaskNext');
            }
        };

        pageMask();

        Splitting({
          /* target: String selector, Element, Array of Elements, or NodeList */
          target: '[data-splitting]',
          /* by: String of the plugin name */
          by: "chars",
          /* key: Optional String to prefix the CSS variables */
          key: null
        });

    };

}


export default AppPlugin;
