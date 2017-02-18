import Vue from 'vue'
import Vuex from 'vuex'
import VuexFire from 'vuexfire'
import drawer from './modules/drawer'
import competition from './modules/competition'

Vue.use(Vuex)
Vue.use(VuexFire)

// eslint-disable-next-line no-unused-vars
const debug = process.env.NODE_ENV !== 'production'

const state = {
  competition: null,
  competitors: null
  // competitors2: null
}
const getters = {
  competitors: state => { return state.competitors },
  // competitors: state => { return state.competitors2 },
  competition: state => { return state.competition }
}
export default new Vuex.Store({
  state,
  getters,
  modules: { drawer, competition },
  mutations: VuexFire.mutations,
  strict: false // (can not use strict mode with vuexfir) debug
})