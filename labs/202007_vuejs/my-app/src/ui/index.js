// https://www.digitalocean.com/community/tutorials/vuejs-creating-custom-plugins

const UI = {
    install(Vue, options) {

        // console.log('123');

        // Installing App-Wide Components & Directives
        // Vue.component(MyComponent.name, MyComponent)
        // Vue.directive(MyDirective.name, MyDirective)

        // Modifying the Global Vue Object
        Vue.myAddedProperty = 'Example Property'
        Vue.myAddedMethod = function() {
          return Vue.myAddedProperty
        }

        // Modifying Vue Instances
        Vue.prototype.$myAddedProperty = 'Example Property'
        Vue.prototype.$myAddedMethod = function() {
          return this.$myAddedProperty
        }

        // Adding component lifecycle hooks or properties.
        Vue.mixin({
            mounted() {
                // console.log('UI Mounted!');
            }
        });
    }
};

export default UI;

// Automatic installation if Vue has been added to the global scope.
// 소용없음
// if (typeof window !== 'undefined' && window.Vue) {
//     console.log('use');
//     window.Vue.use(UI);
// }
