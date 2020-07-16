var MyMixin = {
    created: function () {
        // console.log('this is mixin2')
    },
    methods:{
        getName(){
            return this.name;
        }
    }
};

export default MyMixin;
