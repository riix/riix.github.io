<template>
<div id="container" class="work">
    <div class="container">
        <div class="wrap">
            <h1>This is an work page</h1>
            <p>
                parameter : {{ param }}
            </p>
            <div class="list">
                <div v-for="item in items" class="item">
                    <a href="javascript:;">
                        <div class="module">
                            <p class="number">{{ item.idx }}</p>
                            <h3 class="name">{{ item.name }}</h3>
                            <p class="client">{{ item.client }}</p>
                            <p class="date">{{ item.date }}</p>
                        </div>
                    </a>
                </div>
            </div>
        </div>
        <!-- <PageMask ref="PageMask" /> -->
    </div>
</div>
</template>
<script>
import settings from '@/settings.js' // settings
import PageMask from '@/components/PageMask.vue'

var api = settings.api || 'data.json';

export default {
    name: 'Work',
    components: {
        PageMask
    },
    data() {
        return { // vue component 에서는 무언가를 return 하는 함수를 넣어줘야함
            items: []
        };
    },
    created: function() {
        this.fetchData();
        this.$route.params.pageIdx = 2; // https://mkki.github.io/vue.js/2018/06/12/start-vuejs-12.html
    },
    mounted: function(){
        //this.prev();
    },
    computed: {
        param: function () {
            return this.$route.params;
        }
    },
    watch: {
      '$route': 'fetchData' // 라우터 객체를 감시하고 있다가 fetchData() 함수를 호출한다
    },
    methods: {
        // prev() {
        //     this.$refs.PageMask.prev();
        // },
        // next() {
        //     this.$refs.PageMask.next();
        // },
        fetchData() {
            this.axios.get(api).then((response) => {
                var _response = eval(response.data),
                    _items = _response.items;
                for (var i = 0; i < _items.length; i++) { // 인덱스 생성
                    _items[i].idx = _items.length - i;
                }
                this.items = _items;
            });
        }
    }
}
</script>

<style lang="less">
.list {
    text-align: left;
}
.item {
    margin: 0 auto;
}
.item .module {
    margin: 20px 0;
    text-align: left;
}
.item a {
    text-decoration: none;
    color: #333;
}
.item h3 {
    margin: 0;
    padding: 0;
}
.item p {
    margin: 0;
    padding: 0;
}
</style>
