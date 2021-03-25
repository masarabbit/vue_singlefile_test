import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex)

// {{ $store.state.message }}


export default new Vuex.Store({
  // state: {

  // },
  // getters: {

  // },
  mutations: {
    sortTrainLines: function(_state, payload){
      console.log(payload)
      payload = payload.reverse()
    },
  },
  actions: {
    sortTrainLines(context, payload) {
      context.commit('sortTrainLines', payload)
    }
  }
})