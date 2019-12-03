import Vue from 'vue'
import Vuex from 'vuex'

import domesticModule from './modules/domestic.module'
import foreignModule from './modules/foreign.module'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    domestic: domesticModule,
    foreign: foreignModule
  }
})
