import Vue from 'vue'
import Vuex from 'vuex'
import userStore from './modules/store_user.js'
import soccerStore from './modules/store_soccer.js'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    userStore,
    soccerStore
  }
})
