
const state = {
  date: null,
  location: null,
  startTime: null
}
const getters = {
  date: state => { return state.date },
  location: state => { return state.location },
  startTime: state => { return state.startTime }
}
const mutations = {
  setLocation(state, value) {
    state.location = value
  },
  setDate(state, date) {
    state.date = date
  },
  setStartTime(state, time) {
    state.startTime = time
  }
}
const actions = {
  setLocation(context, value) {
    context.commit('setLocation', value)
  },
  setDate(context, date) {
    context.commit('setDate', date)
  },
  setStartTime(context, time) {
    context.commit('setStartTime', time)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}