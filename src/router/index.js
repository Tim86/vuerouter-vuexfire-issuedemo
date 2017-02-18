import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import CompetitionList from 'components/CompetitionList.vue'
import CompetitionEntryForm from 'components/CompetitionEntryForm.vue'

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/list', name: 'CompetitionList', component: CompetitionList
    },
    {
      path: '/entry', name: 'CompetitionEntryForm', component: CompetitionEntryForm
    }
  ]
})
