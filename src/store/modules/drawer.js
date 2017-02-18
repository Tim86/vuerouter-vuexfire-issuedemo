
const state = {
  open: false,
  docked: true
}
const getters = {}
const mutations = {}
const actions = {
  toggle(flag) {
    this.open = !this.open
    this.docked = !flag
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
