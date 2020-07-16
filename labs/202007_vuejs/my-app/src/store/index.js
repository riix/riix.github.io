import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
      pageIdx: { // 조회 페이지 인덱스
          previous: -1,
          current: 0
      }
  },
  mutations: {

  },
  actions: {

  },
  modules: {

  }
})
