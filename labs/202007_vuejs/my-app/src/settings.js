const settings = {
    api: 'data.json',
    hostname: 'myhostname'
};

export default settings;

// Automatic installation if Vue has been added to the global scope.
if (typeof window !== 'undefined' && window.Vue) {
    console.log('use');
    window.Vue.use(settings);
}
