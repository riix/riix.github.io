<template>
  <div class="work">
    <h1>This is an work page</h1>

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
</template>
<script>
var api = 'data.json';

export default {
    name: 'Work',
    data(){
        return {  // vue component 에서는 무언가를 return 하는 함수를 넣어줘야함
            items: []
        };
    },
    created: function(){
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
</script>
<style lang="less">
.list { text-align: left; }
.item { margin: 0 auto; }
.item .module { margin: 20px 0; text-align: left; }
.item a { text-decoration: none; color: #333; }
.item h3 { margin: 0; padding: 0; }
.item p { margin: 0; padding: 0; }
</style>
