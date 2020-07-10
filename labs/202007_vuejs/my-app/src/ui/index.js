// https://www.digitalocean.com/community/tutorials/vuejs-creating-custom-plugins

// Installing App-Wide Components & Directives
import MyComponent from '@/components/MyComponent.vue';
import MyDirective from '@/directives/MyDirective.js';

const UI = {
    install(Vue, options) {

        console.log('123');

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
                console.log('Mounted!');
            }
        });
    }
};

export default UI;

// Automatic installation if Vue has been added to the global scope.
if (typeof window !== 'undefined' && window.Vue) {
    console.log('use');
    window.Vue.use(UI);
}
