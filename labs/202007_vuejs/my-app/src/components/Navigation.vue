<template>
    <div id="nav">
        <ul>
            <li class="d1" :class="[currentPage == '/' ? activeClass : '']">
                <router-link to="/">Home</router-link>
            </li>
            <li class="d1" :class="[currentPage.includes('about') ? activeClass : '']">
                <router-link to="/about">About</router-link>
            </li>
            <li class="d1" :class="[currentPage.includes('work') ? activeClass : '']">
                <router-link to="/work" >Work</router-link>
            </li>
            <li class="d1" :class="[currentPage.includes('award') ? activeClass : '']">
                <router-link to="/award" >Award</router-link>
            </li>
            <li class="d1" :class="[currentPage.includes('contact') ? activeClass : '']">
                <router-link to="/contact">Contact</router-link>
            </li>
            <li class="d1" :class="[currentPage.includes('signup') ? activeClass : '']">
                <router-link to="/signup">SignUp</router-link>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'Navigation',
    data: function(){ // vue component 에서는 무언가를 return 하는 함수를 넣어줘야함
        return {
            activeClass: 'in'
        };
    },
    computed: {
        currentPage() {
            var _path = this.$route.path;
            console.log('currentPage:', _path);
            return _path;
        }
    }
}
</script>
<style lang="less">
#nav {
    position: absolute;
    top: 50%;
    right: 0;
    padding: 30px;
    transform: translate(0, -50%);
    ul {
        list-style: none;
        margin: 0;
        padding: 0;
        text-align: right;
    }
    li {
        margin: 0;
        padding: 0;
    }
    a {
        display: block;
        padding: 10px 0;
        font-weight: bold;
        color: #2c3e50;
        &.router-link-exact-active {
            color: #42b983;
        }
    }
}
</style>
